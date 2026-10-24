import fs from 'node:fs';
const phase=process.argv[2]||'before';
const out=`auditoria/p1-20261024-01/${phase}`;
fs.mkdirSync(out,{recursive:true});
const pages=await fetch('http://127.0.0.1:9223/json').then(r=>r.json());
const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0;const pending=new Map(),errors=[];
ws.addEventListener('message',e=>{const d=JSON.parse(e.data);if(d.id){const p=pending.get(d.id);pending.delete(d.id);d.error?p.reject(d.error):p.resolve(d.result);}else if(d.method==='Runtime.exceptionThrown')errors.push(d.params);});
function call(method,params={}){return new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});ws.send(JSON.stringify({id:key,method,params}));});}
async function ev(expression){const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function shot(name,clip){const r=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:!!clip,...(clip?{clip}: {})});fs.writeFileSync(`${out}/${name}.png`,Buffer.from(r.data,'base64'),{flag:'wx'});}
async function click(selector){const point=await ev(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,...point});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,...point});}
async function fresh(width,height){await call('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<768});await call('Page.navigate',{url:process.argv[3]||'http://127.0.0.1:8001/'});await wait(1200);await ev('document.fonts.ready');}
await call('Page.enable');await call('Runtime.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});
const results=[];
for(const [width,height] of [[1440,900],[320,900],[375,900],[430,900],[667,375]]){
 await fresh(width,height);
 await shot(`${width}x${height}-hero`);
 if(width<768){await click('.menu-toggle');await wait(700);await shot(`${width}x${height}-menu`);}
 await click('#navigation a[href="#vibes"]');await wait(1800);
 const anchor=await ev(`(()=>{const e=document.querySelector('.vibes .section-heading');return {hash:location.hash,visible:e.classList.contains('visible'),clip:getComputedStyle(e).clipPath,rect:e.getBoundingClientRect().toJSON()}})()`);
 await shot(`${width}x${height}-anchor-vibes`);
 const menuGeometry=width<768?await (async()=>{
  await click('.menu-toggle');await wait(350);
  const r=await ev(`({logo:document.querySelector('.logo').getBoundingClientRect().toJSON(),links:[...document.querySelectorAll('#navigation a')].map(e=>({text:e.textContent,rect:e.getBoundingClientRect().toJSON()})),nav:document.querySelector('#navigation').getBoundingClientRect().toJSON(),scrollHeight:document.querySelector('#navigation').scrollHeight})`);
  await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});return r;
 })():null;
 const dimensions=await ev(`({hero:document.querySelector('#inicio').offsetHeight,vibes:document.querySelector('#vibes').offsetHeight,panel:document.querySelector('.vibe-panel').offsetHeight,final:document.querySelector('#final').offsetHeight,overflow:document.documentElement.scrollWidth>innerWidth})`);
 if(height===900){
  await click('[data-vibe="tubes"]');await wait(1200);await shot(`${width}-vibes-tubes`);
  await click('[data-vibe="azedo"]');await wait(1100);
  // Wheel input reveals each section naturally. No forced visible classes.
  for(let n=0;n<18;n++){await call('Input.dispatchMouseEvent',{type:'mouseWheel',x:width/2,y:height/2,deltaX:0,deltaY:550});await wait(110);}
  await wait(1600);
  await ev('scrollTo({top:0,behavior:"instant"});document.activeElement.blur()');await wait(600);
  const layout=await call('Page.getLayoutMetrics');await shot(`${width}-full`,{x:0,y:0,width:layout.cssContentSize.width,height:layout.cssContentSize.height,scale:1});
  if(width===1440||width===375){
   for(const section of ['vibes','classicos','mundo','sobre','final']){const clip=await ev(`(()=>{const r=document.querySelector('#${section}').getBoundingClientRect();return{x:0,y:r.y+scrollY,width:document.documentElement.clientWidth,height:Math.ceil(r.height),scale:1}})()`);await shot(`${width}-${section}`,clip);}
  }
 }
 results.push({width,height,anchor,dimensions,menuGeometry});console.log(JSON.stringify(results.at(-1)));
}
fs.writeFileSync(`${out}/results.json`,JSON.stringify({results,errors},null,2),{flag:'wx'});
ws.close();
