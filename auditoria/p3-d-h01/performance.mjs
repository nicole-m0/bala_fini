import fs from 'node:fs';import assert from 'node:assert/strict';
const pages=await fetch('http://127.0.0.1:9224/json').then(r=>r.json());const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r,{once:true}));let id=0;const pending=new Map();
ws.addEventListener('message',e=>{const d=JSON.parse(e.data);if(d.id){const p=pending.get(d.id);pending.delete(d.id);d.error?p.reject(d.error):p.resolve(d.result);}});
function call(method,params={}){return new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});ws.send(JSON.stringify({id:key,method,params}));});}
async function ev(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
await call('Page.enable');await call('Runtime.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});await call('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
await call('Page.addScriptToEvaluateOnNewDocument',{source:`window.auditShifts=[];window.auditLongTasks=[];new PerformanceObserver(l=>l.getEntries().forEach(e=>{if(!e.hadRecentInput)window.auditShifts.push({value:e.value,sources:e.sources.map(s=>s.node?.className||s.node?.nodeName)})})).observe({type:'layout-shift',buffered:true});new PerformanceObserver(l=>l.getEntries().forEach(e=>window.auditLongTasks.push(e.duration))).observe({type:'longtask',buffered:true});`});
const results=[];
for(let run=0;run<3;run++)for(const version of ['p2','p3']){
 await call('Page.navigate',{url:`http://127.0.0.1:8003/${version==='p2'?'auditoria/p3-d-h01/backup-p2/':''}`});
 for(let i=0;i<150;i++){if(await ev(`typeof orbitTime==='number'&&document.readyState==='complete'`))break;await wait(70);}
 await ev('document.fonts.ready');
 if(version==='p3')for(let i=0;i<100;i++){if(await ev(`document.querySelector('.w1').classList.contains('has-h01-asset')`))break;await wait(60);}
 const r=await ev(`new Promise(resolve=>{const samples=[],start=performance.now();let previous=0;function tick(t){if(previous)samples.push(t-previous);previous=t;if(t-start<2200)requestAnimationFrame(tick);else{const sorted=[...samples].sort((a,b)=>a-b);const nav=performance.getEntriesByType('navigation')[0];const w=document.querySelector('.w1');resolve({samples:samples.length,meanFrameMs:samples.reduce((a,b)=>a+b,0)/samples.length,p95FrameMs:sorted[Math.floor(sorted.length*.95)],framesOver50:samples.filter(t=>t>50).length,longTasks:window.auditLongTasks,domContentLoaded:nav.domContentLoadedEventEnd,load:nav.loadEventEnd,shifts:window.auditShifts,box:[w.offsetWidth,w.offsetHeight],resources:performance.getEntriesByType('resource').map(e=>({url:e.name,bytes:e.encodedBodySize,transfer:e.transferSize})),ready:w.classList.contains('has-h01-asset')})}}requestAnimationFrame(tick)})`);
 assert.deepEqual(r.box,[100,33]);assert.ok(!r.shifts.some(s=>s.sources.some(x=>typeof x==='string'&&(x.includes('h01')||x.includes('satellite')))));assert.ok(!r.resources.some(s=>s.url.includes('masters/')||s.url.endsWith('.png')));
 results.push({version,run,...r});console.log(version,run,'mean',r.meanFrameMs,'p95',r.p95FrameMs,'load',r.load);
}
fs.writeFileSync('auditoria/p3-d-h01/performance-results.json',JSON.stringify(results,null,2));ws.close();
