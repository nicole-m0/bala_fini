import fs from 'node:fs';
import assert from 'node:assert/strict';
const out='auditoria/p3-d-h01';fs.mkdirSync(`${out}/capturas`,{recursive:true});fs.mkdirSync(`${out}/sequencias`,{recursive:true});
const pages=await fetch('http://127.0.0.1:9224/json').then(r=>r.json());const page=pages.find(p=>p.type==='page');
const ws=new WebSocket(page.webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0,mode='normal';const pending=new Map(),errors=[],network=[],requests=new Map(),checks=[],comparisons=[],sequences=[];
ws.addEventListener('message',e=>{const d=JSON.parse(e.data);if(d.id){const p=pending.get(d.id);pending.delete(d.id);d.error?p.reject(d.error):p.resolve(d.result);return;}
 if(d.method==='Runtime.exceptionThrown')errors.push({mode,error:d.params.exceptionDetails.text});
 if(d.method==='Runtime.consoleAPICalled'&&d.params.type==='error')errors.push({mode,console:d.params.args.map(a=>a.value||a.description)});
 if(d.method==='Network.requestWillBeSent')requests.set(d.params.requestId,{url:d.params.request.url,mode});
 if(d.method==='Network.loadingFinished'){const r=requests.get(d.params.requestId);if(r&&r.url.includes('minhoca-a-'))network.push({...r,bytes:d.params.encodedDataLength});}
 if(d.method==='Network.loadingFailed'){const r=requests.get(d.params.requestId);errors.push({mode,network:d.params.errorText,url:r?.url});}
});
function call(method,params={}){return new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});ws.send(JSON.stringify({id:key,method,params}));});}
async function ev(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function until(expr){for(let i=0;i<100;i++){if(await ev(expr))return;await wait(60);}throw Error('Timeout '+expr);}
async function fresh(w=1440,h=900,dpr=1,version='p3',reduce=false){
 await call('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:dpr,mobile:w<768});
 await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:reduce?'reduce':'no-preference'}]});
 await call('Page.navigate',{url:`http://127.0.0.1:8003/${version==='p2'?'auditoria/p3-d-h01/backup-p2/':''}`});
 await until(`typeof orbitTime==='number'&&document.readyState==='complete'`);await ev('document.fonts.ready');await wait(150);
 if(version==='p3'&&mode==='normal')await until(`document.querySelector('.w1').classList.contains('has-h01-asset')`);
}
async function shot(name){const r=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(`${out}/capturas/${name}.png`,Buffer.from(r.data,'base64'));}
async function state(){return ev(`(()=>{const w=document.querySelector('.hero-art .w1.satellite'),i=w.querySelector('img'),s=getComputedStyle(w),r=w.getBoundingClientRect();return{width:innerWidth,height:innerHeight,dpr:devicePixelRatio,overflow:document.documentElement.scrollWidth>innerWidth,box:[w.offsetWidth,w.offsetHeight],rect:[r.x,r.y,r.width,r.height],transform:s.transform,opacity:s.opacity,z:s.zIndex,background:s.backgroundImage,shadow:s.boxShadow,filter:s.filter,outline:s.outlineStyle,ready:w.classList.contains('has-h01-asset'),children:w.children.length,src:i?.currentSrc,natural:i?[i.naturalWidth,i.naturalHeight]:null,imageFit:i?getComputedStyle(i).objectFit:null,imageFilter:i?getComputedStyle(i).filter:null,attrs:[w.dataset.period,w.dataset.phase,w.dataset.track],orbitTime,heroIndex,heroSlides:document.querySelectorAll('.hero-slide').length,heroChanging,jobs:motionJobs.size,ghosts:document.querySelectorAll('.motion-ghost').length,shifts:window.auditShifts||[],resources:performance.getEntriesByType('resource').filter(e=>e.name.includes('minhoca-a-')).map(e=>({url:e.name,transferSize:e.transferSize,encoded:e.encodedBodySize,duration:e.duration})),nonH01:[...document.querySelectorAll('.candy:not(.w1)')].map(e=>({class:e.className,children:e.children.length,background:getComputedStyle(e).backgroundImage,shadow:getComputedStyle(e).boxShadow}))}})()`);}
async function freeze(){await ev(`heroUserPaused=true;clearTimeout(heroTimer);syncMotionPlayback();`);await wait(70);}
function timeForTheta(theta){let lo=0,hi=1;for(let i=0;i<50;i++){const p=(lo+hi)/2;if(p*p*(3-2*p)<theta/(2*Math.PI))lo=p;else hi=p;}let fraction=((lo+hi)/2)*.84;return ((fraction-3.8/(2*Math.PI)+1)%1)*12;}
async function phase(theta){const t=timeForTheta(theta);await ev(`orbitTime=${t};measureOrbit();drawOrbits();`);return state();}
async function record(name,w,product){
 await fresh(w,900);await freeze();if(product)await ev(`presentHero(${product})`);
 await ev(`heroUserPaused=false;heroFocusPaused=true;scheduleHero();requestMotion();`);
 const start=await ev('orbitTime');const frames=[];const folder=`${out}/sequencias/${name}`;fs.mkdirSync(folder,{recursive:true});
 for(let n=0;n<90;n++){
  const s=await state();const shot=await call('Page.captureScreenshot',{format:'jpeg',quality:85,captureBeyondViewport:false});
  const file=`${String(n).padStart(3,'0')}.jpg`;fs.writeFileSync(`${folder}/${file}`,Buffer.from(shot.data,'base64'));
  frames.push({file,time:s.orbitTime,scaleOpacity:s.opacity,z:s.z,transform:s.transform,product:s.heroIndex});
  if(s.orbitTime-start>=12.2)break;await wait(350);
 }
 sequences.push({name,width:w,product,frames});fs.writeFileSync(`${folder}/frames.json`,JSON.stringify(frames,null,2));
 assert.ok(frames.some(f=>f.z==='2')&&frames.some(f=>f.z==='5'));
 console.log('Sequence',name,frames.length,'frames',frames.at(-1).time-start,'orbital seconds');
}
await call('Page.enable');await call('Runtime.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});
await call('Page.addScriptToEvaluateOnNewDocument',{source:`window.auditShifts=[];new PerformanceObserver(l=>l.getEntries().forEach(e=>{if(!e.hadRecentInput)window.auditShifts.push({value:e.value,sources:e.sources.map(s=>s.node?.className||s.node?.nodeName)})})).observe({type:'layout-shift',buffered:true});`});
let failure;
try{
 for(const [w,h,dpr] of [[1440,900,1],[1920,1080,2],[768,900,2],[1024,900,1],[320,900,3],[375,900,3],[430,900,2],[667,375,2]]){
  await fresh(w,h,dpr);await freeze();const s=await state();assert.ok(s.ready);assert.equal(s.overflow,false);assert.deepEqual(s.attrs,['12','3.8','0']);assert.equal(s.children,1);assert.equal(s.imageFit,'contain');assert.equal(s.imageFilter,'none');assert.equal(s.background,'none');assert.equal(s.shadow,'none');assert.equal(s.outline,'none');assert.ok(s.nonH01.every(x=>x.children===0));
  checks.push({viewport:[w,h,dpr],state:s});await shot(`p3-${w}x${h}-dpr${dpr}`);console.log('Viewport',w,h,dpr,s.src);
 }
 // Same phases, same package and same viewport. Time override exists in the test only.
 for(const [w,h,products] of [[1440,900,[0,1,2,3,4]],[375,900,[0,4]]]){
  for(const version of ['p2','p3']){
   await fresh(w,h,1,version);await freeze();
   for(const product of products){await ev(`presentHero(${product})`);await until('!heroChanging');
    for(const [label,theta] of [['front-max',Math.PI/2],['back-min',3*Math.PI/2],['cross-front',.13],['cross-back',Math.PI+.13]]){
     const s=await phase(theta);comparisons.push({version,viewport:[w,h],product,phase:label,state:s});await shot(`${version}-${w}-product${product}-${label}`);
    }
   }
  }
 }
 for(const a of comparisons.filter(c=>c.version==='p2')){const b=comparisons.find(c=>c.version==='p3'&&c.viewport[0]===a.viewport[0]&&c.product===a.product&&c.phase===a.phase);for(const k of ['box','transform','opacity','z','attrs','nonH01'])assert.deepEqual(b.state[k],a.state[k],k);}
 checks.push({matchedPhasePairs:comparisons.length/2,geometryAndNonH01Identical:true});console.log('Same-phase comparisons passed');
 // Actual controls: pause mid-transition, hold, resume, rapid queue, reduced motion.
 await fresh();await ev(`document.querySelector('#hero-next').click()`);await wait(160);await ev(`document.querySelector('#hero-pause').click()`);await wait(30);
 const pause=await ev(`({orbit:orbitTime,t:[...motionJobs.keys()].filter(a=>motionJobs.get(a).hero).map(a=>a.currentTime)})`);await wait(300);assert.deepEqual(await ev(`({orbit:orbitTime,t:[...motionJobs.keys()].filter(a=>motionJobs.get(a).hero).map(a=>a.currentTime)})`),pause);
 await shot('pause-mid-transition');await ev(`document.querySelector('#hero-pause').click();document.activeElement.blur()`);await wait(1200);assert.ok((await state()).orbitTime>pause.orbit);
 const initial=await ev('heroIndex');await ev(`for(let i=0;i<7;i++)document.querySelector('#hero-next').click()`);await wait(2500);assert.equal(await ev('heroIndex'),(initial+7)%5);assert.equal((await state()).heroSlides,1);checks.push({pauseResumeAndRapidHero:true});
 await fresh(375,900,2,'p3',true);const reduced=await state();await wait(300);assert.equal((await state()).transform,reduced.transform);await ev(`document.querySelector('#hero-next').click()`);await wait(150);assert.equal(await ev('heroIndex'),1);await shot('mobile-reduced-motion');
 await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});await ev(`document.querySelector('#hero-next').click()`);await wait(100);await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await wait(160);assert.equal((await state()).jobs,0);checks.push({reducedInitialAndDuringTransition:true});
 // Resize keeps the actual node and phase, and makes responsive source selection automatic.
 await fresh(375,900,3);await freeze();await ev(`window.auditWrapper=document.querySelector('.w1');`);const beforeResize=await state();await call('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:3,mobile:false});await wait(300);await until(`document.querySelector('.w1').classList.contains('has-h01-asset')`);assert.equal(await ev(`window.auditWrapper===document.querySelector('.w1')`),true);assert.equal((await state()).orbitTime,beforeResize.orbitTime);checks.push({resizeSameWrapperAndClock:true,after:await state()});
 // Delay and blocked requests are controlled failure tests, not normal network failures.
 mode='blocked';await call('Network.setBlockedURLs',{urls:['*minhoca-a-view01-v02*']});await fresh(375,900,1);await wait(300);let failed=await state();assert.equal(failed.ready,false);assert.equal(failed.children,0);assert.notEqual(failed.background,'none');assert.equal(failed.overflow,false);await shot('fallback-network-blocked');await ev(`document.querySelector('#hero-next').click()`);await wait(1200);assert.equal(await ev('heroIndex'),1);assert.ok((await state()).orbitTime>failed.orbitTime);checks.push({blockedFallback:failed,heroStillFunctional:true});await call('Network.setBlockedURLs',{urls:[]});
 mode='normal';await fresh();await ev(`document.querySelector('.h01-asset').srcset='';document.querySelector('.h01-asset').src='assets/images/invalid-h01-for-audit.webp'`);await wait(200);failed=await state();assert.equal(failed.ready,false);assert.equal(failed.children,0);await shot('fallback-after-ready-error');checks.push({fallbackAfterReadyError:true});
 // Existing interaction families remain functional, no new image outside H01.
 await fresh();for(const k of ['doce','tubes','classicos','azedo'])await ev(`document.querySelector('[data-vibe="${k}"]').click()`);await wait(900);assert.equal(await ev('vibeShown'),'azedo');assert.equal((await state()).ghosts,0);
 for(let n=0;n<8;n++)await ev(`document.querySelector('#classic-next').click()`);await wait(900);assert.equal((await state()).ghosts,0);checks.push({rapidVibesAndClassics:true});
 await fresh(667,375);await ev(`document.querySelector('.menu-toggle').click()`);await wait(400);await shot('menu-landscape');checks.push({menuLandscape:await ev(`(()=>{const a=[...document.querySelectorAll('.header nav>a')].map(e=>e.getBoundingClientRect());return{first:a[0].top,last:a.at(-1).bottom,height:innerHeight,inert:document.querySelector('main').inert}})()`)});
 await record('desktop-minhocas-full-orbit',1440,0);
 await record('desktop-tubes-full-orbit',1440,4);
 await record('mobile-tubes-full-orbit',375,4);
 assert.deepEqual(errors.filter(e=>e.error||e.console),[]);
}catch(e){failure=String(e.stack||e);console.error(failure);}
fs.writeFileSync(`${out}/results.json`,JSON.stringify({checks,comparisons,sequences,network,errors,failure},null,2));
ws.close();if(failure)process.exitCode=1;console.log('Finished',checks.length,'checks',comparisons.length,'comparison frames',sequences.length,'sequences');
