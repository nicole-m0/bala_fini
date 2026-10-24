import fs from 'node:fs';
const out='auditoria/p0-20261024-01';
const pages=await fetch('http://127.0.0.1:9223/json').then(r=>r.json());
const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0;const pending=new Map();const issues=[];
ws.addEventListener('message',e=>{const d=JSON.parse(e.data);if(d.id){const p=pending.get(d.id);pending.delete(d.id);d.error?p.reject(d.error):p.resolve(d.result);}else if(d.method==='Runtime.exceptionThrown'||d.method==='Network.loadingFailed')issues.push(d);});
function call(method,params={}){return new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});ws.send(JSON.stringify({id:key,method,params}));});}
async function ev(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function shot(name,clip){const r=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,...(clip?{clip}: {})});fs.writeFileSync(`${out}/screenshots/${name}.png`,Buffer.from(r.data,'base64'),{flag:'wx'});}
await call('Page.enable');await call('Runtime.enable');await call('Network.enable');
const reports=[];
for(const width of [1440,375,320]){
 await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});
 await call('Page.navigate',{url:'http://127.0.0.1:8000/'});await wait(1800);
 await ev('document.fonts.ready');
 reports.push(await ev(`({width:innerWidth,fonts:document.fonts.status,fredoka:document.fonts.check('600 24px Fredoka'),dm:document.fonts.check('400 16px "DM Sans"'),heroBottom:document.querySelector('#inicio').getBoundingClientRect().bottom,cta:document.querySelector('.hero-copy .button').getBoundingClientRect().toJSON()})`));
 await ev('heroUserPaused=true;scheduleHero()');
 for(const section of ['inicio','vibes','classicos','mundo','sobre','final']){
  await ev(`document.querySelector('#${section}').scrollIntoView({behavior:'instant',block:'start'})`);await wait(1700);
  await ev(`Promise.all([...document.querySelectorAll('#${section} img')].map(i=>i.decode().catch(()=>{})))`);
  const clip=await ev(`(()=>{const r=document.querySelector('#${section}').getBoundingClientRect();return{x:0,y:Math.max(0,r.top+scrollY),width:document.documentElement.clientWidth,height:Math.ceil(r.height),scale:1}})()`);
  await shot(`${width}-${section}`,clip);
 }
 if(width===375){await ev(`scrollTo({top:0,behavior:'instant'});document.querySelector('.menu-toggle').click()`);await wait(800);await shot('375-menu-detail');await ev('closeMenu()');}
 if(width===1440||width===375){
  for(const [selector,name] of [['[data-vibe="tubes"]','vibes-tubes'],['[data-classic="4"]','classics-tubes']]){
   await ev(`document.querySelector('${selector}').click();document.querySelector('#${name.startsWith('vibes')?'vibes':'classicos'}').scrollIntoView({behavior:'instant'})`);await wait(1400);await shot(`${width}-${name}`);
  }
 }
}
await call('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
await call('Page.navigate',{url:'http://127.0.0.1:8000/'});await wait(1500);await ev('heroUserPaused=true;scheduleHero()');
await shot('motion-hero-before');await ev('presentHero(1)');await wait(300);await shot('motion-hero-300ms');await wait(800);await shot('motion-hero-after');
await ev(`document.querySelector('#vibes').scrollIntoView({behavior:'instant'})`);await wait(1200);await ev(`chooseVibe(document.querySelector('[data-vibe="doce"]'))`);await wait(350);await shot('motion-vibes-350ms');await wait(900);await shot('motion-vibes-after');
const pause=await ev(`({ticker:getComputedStyle(document.querySelector('.ticker>div')).animationPlayState,heroPaused:heroUserPaused})`);
await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await wait(100);
const reduced=await ev(`({ticker:getComputedStyle(document.querySelector('.ticker>div')).animationName,animations:document.getAnimations().map(a=>({target:a.effect.target.className,state:a.playState}))})`);
await call('Emulation.setDeviceMetricsOverride',{width:667,height:375,deviceScaleFactor:1,mobile:true});await ev(`scrollTo({top:0,behavior:'instant'});document.querySelector('.menu-toggle').click()`);await wait(500);await shot('667x375-menu');
const landscape=await ev(`({links:[...document.querySelectorAll('#navigation a')].map(a=>({text:a.textContent,rect:a.getBoundingClientRect().toJSON()})),height:innerHeight,navScroll:document.querySelector('#navigation').scrollHeight})`);
fs.writeFileSync(`${out}/inspection.json`,JSON.stringify({reports,pause,reduced,landscape,issues},null,2),{flag:'wx'});
console.log(JSON.stringify({reports,pause,reduced,landscape,issues},null,2));
await call('Browser.close');ws.close();
