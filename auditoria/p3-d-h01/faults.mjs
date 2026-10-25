import fs from 'node:fs';import assert from 'node:assert/strict';
const root='auditoria/p3-d-h01';const pages=await fetch('http://127.0.0.1:9224/json').then(r=>r.json());const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0;const pending=new Map(),held=[],results=[];let mode='delay';
ws.addEventListener('message',e=>{const d=JSON.parse(e.data);if(d.id){const p=pending.get(d.id);pending.delete(d.id);d.error?p.reject(d.error):p.resolve(d.result);}else if(d.method==='Fetch.requestPaused'){
 if(mode==='delay')held.push(d.params.requestId);
 else call('Fetch.fulfillRequest',{requestId:d.params.requestId,responseCode:mode==='404'?404:200,responseHeaders:[{name:'Content-Type',value:'image/webp'}],body:Buffer.from('invalid image bytes for controlled fault test').toString('base64')}).catch(()=>{});
}});
function call(method,params={}){return new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});ws.send(JSON.stringify({id:key,method,params}));});}
async function ev(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function state(){return ev(`(()=>{const w=document.querySelector('.w1');return{ready:w.classList.contains('has-h01-asset'),children:w.children.length,background:getComputedStyle(w).backgroundImage,orbitTime,index:heroIndex,height:document.querySelector('.hero-composition').offsetHeight,overflow:document.documentElement.scrollWidth>innerWidth}})()`);}
async function shot(name){const s=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync(`${root}/capturas/${name}.png`,Buffer.from(s.data,'base64'));}
await call('Page.enable');await call('Runtime.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});await call('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:3,mobile:false});await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});await call('Fetch.enable',{patterns:[{urlPattern:'*minhoca-a-view01-v02*',requestStage:'Request'}]});
for(mode of ['delay','404','corrupt']){
 await call('Page.navigate',{url:'http://127.0.0.1:8003/'});
 for(let n=0;n<150;n++){if(await ev(`typeof orbitTime==='number'`))break;await wait(80);}
 for(let n=0;n<150;n++){if(await ev(`document.readyState==='complete'`))break;await wait(80);}
 if(mode==='delay')for(let n=0;n<100&&!held.length;n++)await wait(50);
 await wait(100);const before=await state();assert.equal(before.ready,false);assert.notEqual(before.background,'none');assert.equal(before.children,0);await shot(`fallback-${mode}`);
 if(mode==='delay'){
  assert.ok(held.length);await wait(600);assert.ok((await state()).orbitTime>before.orbitTime);
  // Also reduce while loading; decoded surface must not restart any motion.
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await wait(100);
  for(const requestId of held.splice(0))await call('Fetch.continueRequest',{requestId});
  for(let n=0;n<60;n++){if((await state()).ready)break;await wait(60);}
  const after=await state();assert.equal(after.ready,true);assert.equal(after.height,before.height);await wait(200);assert.equal((await state()).orbitTime,after.orbitTime);await shot('delayed-image-ready-reduced');results.push({mode,before,after});
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
 }else{
  await ev(`document.querySelector('#hero-next').click()`);await wait(1200);const after=await state();assert.equal(after.index,1);assert.equal(after.ready,false);assert.equal(after.overflow,false);assert.ok(after.orbitTime>before.orbitTime);results.push({mode,before,after});
 }
}
await call('Fetch.disable');fs.writeFileSync(`${root}/fault-results.json`,JSON.stringify(results,null,2));console.log('Delayed decode, HTTP404 and corrupt image fallback: passed');ws.close();
