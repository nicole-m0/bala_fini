import fs from 'node:fs';
import assert from 'node:assert/strict';
const root='auditoria/p2-20261024-01';
const run=process.argv[2]||'motion';
const out=`${root}/${run}`;fs.mkdirSync(out,{recursive:true});
const pages=await fetch('http://127.0.0.1:9223/json').then(r=>r.json());
const page=pages.find(p=>p.type==='page');
const ws=new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0,recording=null;const pending=new Map(),errors=[],checks=[],clips=[];
ws.addEventListener('message',e=>{
 const d=JSON.parse(e.data);
 if(d.id){const p=pending.get(d.id);pending.delete(d.id);d.error?p.reject(d.error):p.resolve(d.result);}
 else if(d.method==='Runtime.exceptionThrown')errors.push(d.params);
 else if(d.method==='Network.loadingFailed')errors.push({network:d.params.errorText,urlType:d.params.type});
 else if(d.method==='Page.screencastFrame'){
  if(recording){const name=`${String(recording.frames.length).padStart(4,'0')}.jpg`;fs.writeFileSync(`${out}/${recording.name}/${name}`,Buffer.from(d.params.data,'base64'),{flag:'wx'});recording.frames.push({name,timestamp:d.params.metadata.timestamp});}
  call('Page.screencastFrameAck',{sessionId:d.params.sessionId}).catch(()=>{});
 }
});
function call(method,params={}){return new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});ws.send(JSON.stringify({id:key,method,params}));});}
async function ev(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function click(selector){const p=await ev(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()`);assert.ok(p.y>=0&&p.y<=900,`Click outside viewport ${selector}`);await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,...p});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,...p});}
async function fresh(width=1440,height=900,path=''){
 await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<768});
 await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
 await call('Page.navigate',{url:`http://127.0.0.1:8002/${path}`});await wait(950);await ev('document.fonts.ready');
}
async function shot(name){const r=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(`${out}/${name}.png`,Buffer.from(r.data,'base64'),{flag:'wx'});}
async function record(name,action,duration=1400){
 fs.mkdirSync(`${out}/${name}`,{recursive:false});recording={name,frames:[]};
 await call('Page.startScreencast',{format:'jpeg',quality:82,maxWidth:1100,maxHeight:900,everyNthFrame:2});
 await action();await wait(duration);await call('Page.stopScreencast');await wait(80);
 clips.push(recording);fs.writeFileSync(`${out}/${name}/frames.json`,JSON.stringify(recording,null,2),{flag:'wx'});recording=null;
}
async function state(){return ev(`({overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),ghosts:document.querySelectorAll('.motion-ghost').length,jobs:motionJobs.size,heroSlides:document.querySelectorAll('.hero-slide').length,heroIndex,heroChanging,selected:document.querySelector('[aria-selected="true"]').dataset.vibe,classic:classicIndex})`);}
await call('Page.enable');await call('Runtime.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});
let failure=null;
try{
 await fresh(1440,900,`${root}/backup-p1/`);
 await record('p1-hero-reference',()=>click('#hero-next'));
 await fresh();await shot('1440-hero-rest');
 for(let n=1;n<=5;n++)await record(`1440-hero-${n}`,async()=>{
  await click('#hero-next');
  if(n===4){
   for(let sample=0;sample<30;sample++){await wait(40);if(await ev(`document.querySelectorAll('.hero-slide').length===1`))break;}
   assert.equal(await ev(`document.querySelectorAll('.hero-slide').length`),1);
   checks.push({outgoingRemoved:true,incomingStillSettling:await ev('heroChanging')});
  }
 },1250);
 // Pause an actual in-flight transition, compare times and transforms, then step while paused.
 await click('#hero-next');await wait(130);await click('#hero-pause');await wait(30);
 const paused=await ev(`({t:[...motionJobs.keys()].filter(a=>motionJobs.get(a).hero).map(a=>a.currentTime),images:[...document.querySelectorAll('.hero-slide')].map(i=>getComputedStyle(i).transform),orbit:getComputedStyle(document.querySelector('.satellite')).transform})`);
 await wait(300);
 const held=await ev(`({t:[...motionJobs.keys()].filter(a=>motionJobs.get(a).hero).map(a=>a.currentTime),images:[...document.querySelectorAll('.hero-slide')].map(i=>getComputedStyle(i).transform),orbit:getComputedStyle(document.querySelector('.satellite')).transform})`);
 assert.deepEqual(held,paused);checks.push({pauseDuringTransition:true,paused});await shot('hero-paused-transition');
 await click('#hero-next');await wait(250);assert.equal(await ev('heroChanging'),false);assert.equal(await ev('heroUserPaused'),true);
 await click('#hero-pause');
 // Queue all rapid advances; newest destination wins without leaking layers.
 const initial=await ev('heroIndex');for(let n=0;n<7;n++){await click('#hero-next');await wait(18);}await wait(2500);
 assert.equal(await ev('heroIndex'),(initial+7)%5);assert.equal((await state()).heroSlides,1);checks.push({rapidHero:true});
 await ev(`document.querySelector('#vibes').scrollIntoView({behavior:'instant'})`);await wait(750);
 for(const key of ['doce','tubes','classicos','azedo'])await record(`1440-vibes-${key}`,()=>click(`[data-vibe="${key}"]`),1000);
 await click('[data-vibe="doce"]');await wait(80);await click('[data-vibe="tubes"]');await wait(45);await click('[data-vibe="classicos"]');
 assert.equal(await ev(`document.querySelector('[aria-selected="true"]').dataset.vibe`),'classicos');await wait(800);assert.equal((await state()).ghosts,0);checks.push({immediateTabsAndRapidVibes:true});
 await ev(`document.querySelector('#classicos').scrollIntoView({behavior:'instant'})`);await wait(750);
 await record('1440-classics-pack-to-display',()=>click('#classic-next'),1000);
 await record('1440-classics-display-to-pack',()=>click('#classic-next'),1000);
 for(let n=0;n<8;n++){await click('#classic-next');await wait(35);}await wait(900);assert.equal((await state()).ghosts,0);checks.push({rapidClassics:true});
 await ev(`document.querySelector('#mundo').scrollIntoView({behavior:'instant'})`);await wait(800);
 const depthBefore=await ev(`getComputedStyle(document.querySelector('.wp1')).transform`);
 await record('1440-world-depth',async()=>{for(let n=0;n<4;n++){await call('Input.dispatchMouseEvent',{type:'mouseWheel',x:900,y:650,deltaX:0,deltaY:90});await wait(130);}},900);
 assert.notEqual(await ev(`getComputedStyle(document.querySelector('.wp1')).transform`),depthBefore);checks.push({worldParallax:true});await shot('1440-world-rest');
 // A real second browser target tests actual visibilitychange, not a forged DOM event.
 await fresh();await click('#hero-next');await wait(120);
 const other=await call('Target.createTarget',{url:'about:blank',background:false});await call('Target.activateTarget',{targetId:other.targetId});await wait(180);
 const hidden=await ev('document.hidden');
 if(hidden){const t=await ev(`({index:heroIndex,t:[...motionJobs.keys()].map(a=>a.currentTime),orbit:orbitTime})`);await wait(500);assert.deepEqual(await ev(`({index:heroIndex,t:[...motionJobs.keys()].map(a=>a.currentTime),orbit:orbitTime})`),t);checks.push({realTabHiddenPause:true});}
 else checks.push({realTabHiddenPause:'not observable in this headless session'});
 await call('Target.closeTarget',{targetId:other.targetId});await call('Target.activateTarget',{targetId:page.id});
 // Creating another headless target can reset the emulated viewport to the native window.
 // Restore the test viewport so an offscreen hero is not mistaken for a stuck transition.
 await call('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
 await wait(1200);assert.equal(await ev('heroChanging'),false);
 // Reduced motion during simultaneous running finite jobs must settle, never strand a ghost.
 await click('#hero-next');await wait(100);await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await wait(150);
 assert.equal(await ev('heroChanging'),false);assert.equal((await state()).jobs,0);assert.equal((await state()).heroSlides,1);
 const still=await ev(`({hero:heroIndex,orbit:getComputedStyle(document.querySelector('.satellite')).transform})`);await wait(350);assert.deepEqual(await ev(`({hero:heroIndex,orbit:getComputedStyle(document.querySelector('.satellite')).transform})`),still);
 await click('#hero-next');await wait(100);assert.notEqual(await ev('heroIndex'),still.hero);checks.push({reducedDuringHero:true,manualReducedAdvance:true});
 await ev(`document.querySelector('#vibes').scrollIntoView({behavior:'instant'})`);await wait(250);await click('[data-vibe="tubes"]');await wait(100);assert.equal((await state()).ghosts,0);
 // Re-enable motion, then reduce during a sensory change as well.
 await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});await click('[data-vibe="doce"]');await wait(100);await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await wait(130);assert.equal((await state()).ghosts,0);assert.equal((await state()).jobs,0);checks.push({reducedDuringVibes:true});
 for(const width of [320,375,430]){
  await fresh(width);await shot(`${width}-hero-rest`);
  await record(`${width}-hero-transition`,()=>click('#hero-next'),1250);
  await ev(`document.querySelector('#vibes').scrollIntoView({behavior:'instant'})`);await wait(700);
  await record(`${width}-vibes-tubes`,()=>click('[data-vibe="tubes"]'),1000);
  await ev(`document.querySelector('#classicos').scrollIntoView({behavior:'instant'})`);await wait(600);
  await record(`${width}-classics-transition`,()=>click('#classic-next'),1000);
  const s=await state();assert.equal(s.overflow,false);assert.deepEqual(s.broken,[]);assert.equal(s.ghosts,0);checks.push({width,state:s});
  await ev(`document.querySelector('#mundo').scrollIntoView({behavior:'instant'})`);await wait(200);const depth=await ev(`getComputedStyle(document.querySelector('.wp1')).transform`);await ev(`scrollBy({top:100,behavior:'instant'})`);await wait(250);assert.equal(await ev(`getComputedStyle(document.querySelector('.wp1')).transform`),depth);
 }
 await fresh(667,375);await click('.menu-toggle');await wait(500);await shot('667x375-menu');
 const menu=await ev(`({logo:document.querySelector('.logo').getBoundingClientRect().bottom,links:[...document.querySelectorAll('#navigation a')].map(a=>({top:a.getBoundingClientRect().top,bottom:a.getBoundingClientRect().bottom}))})`);
 assert.ok(menu.links[0].top>menu.logo);assert.ok(menu.links.every(a=>a.bottom<=375));checks.push({menuLandscapePreserved:true});
 assert.deepEqual(errors,[]);
}catch(error){failure=String(error.stack||error);console.error(failure);process.exitCode=1;}
finally{
 fs.writeFileSync(`${out}/results.json`,JSON.stringify({checks,errors,failure,clips:clips.map(c=>({name:c.name,frames:c.frames.length}))},null,2),{flag:'wx'});
 console.log(JSON.stringify({checks,errors,failure,clips:clips.map(c=>({name:c.name,frames:c.frames.length}))},null,2));ws.close();
}
