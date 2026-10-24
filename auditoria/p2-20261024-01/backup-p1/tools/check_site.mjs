import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const endpoint = await fetch('http://127.0.0.1:9223/json').then(r => r.json());
const page = endpoint.find(p => p.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(resolve => ws.addEventListener('open', resolve, {once: true}));
let id = 0;
const pending = new Map(), errors = [];
ws.addEventListener('message', event => {
  const data = JSON.parse(event.data);
  if (data.id) { const job = pending.get(data.id); pending.delete(data.id); data.error ? job.reject(data.error) : job.resolve(data.result); }
  if (data.method === 'Runtime.exceptionThrown') errors.push(data.params.exceptionDetails.text);
});
ws.addEventListener('close', () => { for (const job of pending.values()) job.resolve({}); pending.clear(); });
function call(method, params = {}) { return new Promise((resolve, reject) => { const key = ++id; pending.set(key, {resolve,reject}); ws.send(JSON.stringify({id:key,method,params})); }); }
async function evaluate(expression) { const result = await call('Runtime.evaluate', {expression, returnByValue:true, awaitPromise:true}); if (result.exceptionDetails) throw result.exceptionDetails; return result.result.value; }
await call('Runtime.enable');
await call('Page.enable');
await call('Page.navigate', {url: 'file:///' + path.resolve('index.html').replaceAll('\\','/')});
await evaluate('new Promise(r => setTimeout(r, 1500))');
if (process.argv.includes('--focus-only')) {
  await evaluate(`document.querySelector('#hero-pause').focus();document.querySelector('#hero-pause').click()`);
  assert.equal(await evaluate(`document.querySelector('#hero-pause').getAttribute('aria-pressed')`),'true');
  const before = await evaluate(`document.querySelector('#hero-caption').textContent`);
  await evaluate(`document.querySelector('#hero-pause').click()`);
  await evaluate('new Promise(r=>setTimeout(r,250))');
  console.log('Resume readiness', await evaluate(`({heroVisible,hidden:document.hidden,heroUserPaused,heroFocusPaused,reduced:reducedMotion.matches})`));
  assert.equal(await evaluate(`canRotateHero()`),true);
  await evaluate('new Promise(r=>setTimeout(r,5400))');
  assert.notEqual(await evaluate(`document.querySelector('#hero-caption').textContent`),before);
  assert.equal(await evaluate(`document.activeElement.id`),'hero-pause');
  assert.deepEqual(errors,[]);
  console.log('Explicit resume while button remains focused: OK. Runtime errors: none.');
  await call('Browser.close'); ws.close(); process.exit(0);
}
fs.mkdirSync('tools/screenshots', {recursive:true});
for (const width of [320,375,430,768,1024,1440,1920]) {
  await call('Emulation.setDeviceMetricsOverride', {width,height:900,deviceScaleFactor:1,mobile:width<768});
  await evaluate('new Promise(r => setTimeout(r, 200))');
  const report = await evaluate(`(() => ({width:innerWidth, document:document.documentElement.scrollWidth, broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src')),sections:[...document.querySelectorAll('main section')].map(e=>({id:e.id,width:Math.round(e.getBoundingClientRect().width)}))}))()`);
  console.log(JSON.stringify(report));
  assert.ok(report.document <= report.width, `Overflow at ${width}`);
  assert.deepEqual(report.broken, []);
  if ([320,375,430,768,1440].includes(width)) {
    await evaluate(`(async () => {for(let y=0;y<document.documentElement.scrollHeight;y+=650){scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,80))}await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));scrollTo({top:0,behavior:'instant'})})()`);
    await evaluate(`document.querySelectorAll('.reveal, .final-section').forEach(e=>e.classList.add('visible'))`);
    await evaluate('new Promise(r => setTimeout(r, 900))');
    const layout = await call('Page.getLayoutMetrics');
    const shot = await call('Page.captureScreenshot', {format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width,height:Math.ceil(layout.cssContentSize.height),scale:1}});
    fs.writeFileSync(`tools/screenshots/${width}.png`, Buffer.from(shot.data,'base64'));
  }
}
await evaluate(`document.querySelector('[data-vibe="tubes"]').click();document.querySelector('#classic-next').click()`);
await evaluate('new Promise(r => setTimeout(r, 500))');
console.log('Interactions', await evaluate(`({vibe:document.querySelector('#vibe-name').innerText,classic:document.querySelector('#classic-name').textContent,selected:document.querySelector('[aria-selected="true"]').dataset.vibe})`));
await call('Emulation.setDeviceMetricsOverride', {width:375,height:900,deviceScaleFactor:1,mobile:true});
console.log('Menu', await evaluate(`(() => {document.querySelector('.menu-toggle').click();const open=document.querySelector('.menu-toggle').getAttribute('aria-expanded');document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));return {open,closed:document.querySelector('.menu-toggle').getAttribute('aria-expanded')}})()`));
// Test every dynamic state and local asset, not only the initial images.
const names = fs.readdirSync('assets/images').filter(n => n.endsWith('.webp'));
const assets = await evaluate(`Promise.all(${JSON.stringify(names)}.map(async name => {const image=new Image();image.src='assets/images/'+name;try{await image.decode();return {name,ok:image.naturalWidth>0}}catch{return {name,ok:false}}}))`);
assert.ok(assets.every(asset => asset.ok));
console.log('All image decodes:', assets.length);
await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
for (const width of [320,375,430,768,1440]) {
  await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});
  for (const vibe of ['azedo','doce','tubes','classicos']) {
    await evaluate(`document.querySelector('[data-vibe="${vibe}"]').click()`);
    await evaluate('new Promise(r=>setTimeout(r,80))');
    const state = await evaluate(`({selected:document.querySelector('[aria-selected="true"]').dataset.vibe,overflow:document.documentElement.scrollWidth>innerWidth,valid:document.querySelector('#vibe-image').naturalWidth>0,height:document.querySelector('.vibe-panel').offsetHeight})`);
    assert.equal(state.selected,vibe); assert.equal(state.overflow,false); assert.equal(state.valid,true);
    console.log('Vibe',width,vibe,state.height);
  }
  for (let index=0;index<5;index++) {
    await evaluate(`document.querySelector('[data-classic="${index}"]').click()`);
    await evaluate('new Promise(r=>setTimeout(r,80))');
    const state = await evaluate(`({index:document.querySelector('[aria-pressed="true"][data-classic]').dataset.classic,overflow:document.documentElement.scrollWidth>innerWidth,valid:document.querySelector('#classic-image').naturalWidth>0})`);
    assert.equal(state.index,String(index)); assert.equal(state.overflow,false); assert.equal(state.valid,true);
  }
}
const still = await evaluate(`({orbit:getComputedStyle(document.querySelector('.satellite')).transform,hero:document.querySelector('#hero-caption').textContent})`);
await evaluate('new Promise(r=>setTimeout(r,350))');
assert.deepEqual(await evaluate(`({orbit:getComputedStyle(document.querySelector('.satellite')).transform,hero:document.querySelector('#hero-caption').textContent})`),still);
console.log('Reduced motion: stationary orbit and hero');
await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
await evaluate(`scrollTo({top:0,behavior:'instant'});document.activeElement.blur()`);
await evaluate('new Promise(r=>setTimeout(r,400))');
const heroBefore = await evaluate(`document.querySelector('#hero-caption').textContent`);
const orbitBefore = await evaluate(`getComputedStyle(document.querySelector('.satellite')).transform`);
await evaluate('new Promise(r=>setTimeout(r,5400))');
const heroAfter = await evaluate(`document.querySelector('#hero-caption').textContent`);
assert.notEqual(heroBefore,heroAfter);
assert.notEqual(orbitBefore,await evaluate(`getComputedStyle(document.querySelector('.satellite')).transform`));
console.log('Auto hero:',heroBefore,'→',heroAfter);
await evaluate(`document.querySelector('#hero-pause').click()`);
const paused = await evaluate(`getComputedStyle(document.querySelector('.satellite')).transform`);
await evaluate('new Promise(r=>setTimeout(r,250))');
assert.equal(paused,await evaluate(`getComputedStyle(document.querySelector('.satellite')).transform`));
console.log('Orbit pause: OK');
const depths = await evaluate(`[...document.querySelectorAll('.satellite')].map(e=>getComputedStyle(e).zIndex)`);
assert.ok(depths.includes('2') && depths.includes('5'));
console.log('Orbit foreground/background:',depths);
const fixedHeroHeight = await evaluate(`document.querySelector('.hero-composition').offsetHeight`);
for(let i=0;i<5;i++) {
  await evaluate(`document.querySelector('#hero-next').click()`);
  await evaluate('new Promise(r=>setTimeout(r,1100))');
  assert.equal(await evaluate(`document.querySelector('.hero-slide.is-current').naturalWidth>0`),true);
  assert.equal(await evaluate(`document.querySelector('.hero-composition').offsetHeight`),fixedHeroHeight);
}
await evaluate(`document.querySelector('[data-classic="4"]').click();document.querySelector('#classicos').scrollIntoView({behavior:'instant'})`);
await evaluate('new Promise(r=>setTimeout(r,1100))');
console.log('Tubes loaded:', await evaluate(`document.querySelector('#classic-image').currentSrc`));
const tubesShot = await call('Page.captureScreenshot',{format:'png'});
fs.writeFileSync('tools/screenshots/tubes.png',Buffer.from(tubesShot.data,'base64'));
await evaluate(`document.querySelector('.classic-stage').focus();document.querySelector('.classic-stage').dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}))`);
await evaluate('new Promise(r=>setTimeout(r,1100))');
assert.equal(await evaluate(`document.querySelector('#classic-name').textContent`),'Dentaduras');
await evaluate(`document.querySelector('.classic-stage').dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowLeft',bubbles:true}))`);
await evaluate('new Promise(r=>setTimeout(r,1100))');
assert.equal(await evaluate(`document.querySelector('#classic-name').textContent`),'Tubes');
console.log('Classic keyboard: OK');
await evaluate(`document.querySelector('#mundo').scrollIntoView({behavior:'instant'})`);
await evaluate('new Promise(r=>setTimeout(r,100))');
const depthBefore=await evaluate(`getComputedStyle(document.querySelector('.wp1')).transform`);
await evaluate(`scrollBy({top:250,behavior:'instant'})`);
await evaluate('new Promise(r=>setTimeout(r,100))');
assert.notEqual(depthBefore,await evaluate(`getComputedStyle(document.querySelector('.wp1')).transform`));
console.log('World parallax: OK');
await call('Emulation.setDeviceMetricsOverride',{width:375,height:900,deviceScaleFactor:1,mobile:true});
await evaluate('new Promise(r=>setTimeout(r,150))');
await evaluate(`(() => {const stage=document.querySelector('.classic-stage');const start=new Event('touchstart');Object.defineProperty(start,'touches',{value:[{clientX:230,clientY:400}]});stage.dispatchEvent(start);const end=new Event('touchend');Object.defineProperty(end,'changedTouches',{value:[{clientX:100,clientY:405}]});stage.dispatchEvent(end)})()`);
await evaluate('new Promise(r=>setTimeout(r,1100))');
assert.equal(await evaluate(`document.querySelector('#classic-name').textContent`),'Dentaduras');
console.log('Classic swipe: OK');
await call('Emulation.setDeviceMetricsOverride',{width:320,height:900,deviceScaleFactor:1,mobile:true});
await evaluate('new Promise(r=>setTimeout(r,150))');
await evaluate(`document.querySelector('[data-classic="4"]').click()`);
for(let sample=0;sample<10;sample++) {
  await evaluate('new Promise(r=>setTimeout(r,120))');
  assert.equal(await evaluate(`document.documentElement.scrollWidth>innerWidth`),false,'Overflow during classic animation');
}
console.log('Animated overflow at 320px: OK');
await call('Emulation.setDeviceMetricsOverride',{width:375,height:900,deviceScaleFactor:1,mobile:true});
await evaluate('new Promise(r=>setTimeout(r,150))');
const mobileDepth=await evaluate(`getComputedStyle(document.querySelector('.wp1')).transform`);
await evaluate(`scrollBy({top:100,behavior:'instant'})`);
await evaluate('new Promise(r=>setTimeout(r,150))');
assert.equal(mobileDepth,await evaluate(`getComputedStyle(document.querySelector('.wp1')).transform`));
console.log('Mobile parallax simplified: OK');
await evaluate(`scrollTo({top:0,behavior:'instant'});document.querySelector('.menu-toggle').click()`);
await evaluate('new Promise(r=>setTimeout(r,750))');
const menuShot = await call('Page.captureScreenshot',{format:'png'});
fs.writeFileSync('tools/screenshots/menu.png',Buffer.from(menuShot.data,'base64'));
assert.equal(await evaluate(`document.querySelector('main').inert`),true);
assert.equal(await evaluate(`(() => {const button=document.querySelector('.menu-toggle');button.focus();button.dispatchEvent(new KeyboardEvent('keydown',{key:'Tab',bubbles:true,cancelable:true}));return document.activeElement.classList.contains('logo')})()`),true);
await evaluate(`document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}))`);
assert.equal(await evaluate(`document.querySelector('main').inert`),false);
assert.deepEqual(errors,[]);
console.log('Runtime errors:', errors);
await call('Browser.close');
ws.close();
