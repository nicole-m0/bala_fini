import fs from 'node:fs';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const root='auditoria/p1-20261024-01';
const before=JSON.parse(fs.readFileSync(`${root}/before/results.json`));
const after=JSON.parse(fs.readFileSync(`${root}/final/results.json`));
assert.deepEqual(after.errors,[]);
for(const row of after.results){assert.equal(row.anchor.visible,true);assert.equal(row.dimensions.overflow,false);}
const menu=after.results.find(r=>r.width===667).menuGeometry;
assert.ok(menu.links[0].rect.top>menu.logo.bottom);
assert.ok(menu.links.every(l=>l.rect.top>=0&&l.rect.bottom<=375));
assert.equal(menu.scrollHeight,375);
assert.ok(before.results.every(r=>r.anchor.visible===false));
const tests=fs.readFileSync(`${root}/tests/existing-tests.log`,'utf8');assert.match(tests,/Exit: 0/);
const hash=file=>createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const initial=JSON.parse(fs.readFileSync(`${root}/hashes-iniciais.json`));
for(const file of ['README.md','vercel.json','AUDITORIA-VISUAL-FINI.md','tools/check_site.mjs','tools/validate_files.py','tools/prepare_assets.py'])assert.equal(hash(file),initial[file]);
for(const name of fs.readdirSync('assets/images'))assert.equal(hash(`assets/images/${name}`),hash(`${root}/backup/assets/images/${name}`));
const checks=[['python',['-B','tools/validate_files.py']],['node',['--check','js/script.js']],['git',['diff','--check']]];
let log='';for(const [cmd,args] of checks){log+=`> ${cmd} ${args.join(' ')}\n${execFileSync(cmd,args,{encoding:'utf8'})}\n`;}
fs.writeFileSync(`${root}/checks.log`,log,{flag:'wx'});
fs.writeFileSync(`${root}/git-final.txt`,execFileSync('git',['status','--short'],{encoding:'utf8'}),{flag:'wx'});
const rows=after.results.map(a=>({viewport:`${a.width}x${a.height}`,before:before.results.find(b=>b.width===a.width).dimensions,after:a.dimensions}));
fs.writeFileSync(`${root}/comparison.json`,JSON.stringify({rows,unchangedAssets:true,unchangedOriginalTest:true,menuPassed:true,anchorPassed:true},null,2),{flag:'wx'});
console.log(JSON.stringify(rows,null,2));console.log('Evidence, menu, anchor, asset integrity and existing tests: OK');
