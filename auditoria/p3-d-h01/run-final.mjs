import fs from 'node:fs';import {spawnSync} from 'node:child_process';
for(const name of ['test-h01.mjs','faults.mjs','performance.mjs','run-existing.mjs']){
 console.log('Starting final',name);
 const r=spawnSync(process.execPath,[`auditoria/p3-d-h01/${name}`],{encoding:'utf8',timeout:240000});
 fs.writeFileSync(`auditoria/p3-d-h01/${name}.final.log`,`${r.stdout||''}\n${r.stderr||''}\nExit: ${r.status}\n${r.error||''}`);
 console.log(r.stdout);console.error(r.stderr);
 if(r.status!==0)process.exit(r.status??1);
 console.log('Passed',name);
}
