import fs from 'node:fs';import {spawnSync} from 'node:child_process';
const root='auditoria/p3-d-h01/tests-existing';fs.mkdirSync(root,{recursive:true});
let source=fs.readFileSync('tools/check_site.mjs','utf8').replaceAll('127.0.0.1:9223','127.0.0.1:9224').replaceAll('tools/screenshots',`${root}/screenshots`);
source=source.replace(/await call\('Page.navigate', \{url: .*?\}\);/,"await call('Page.navigate', {url:'http://127.0.0.1:8003/'});");
source=source.replace("await call('Page.enable');","await call('Page.enable');\nawait call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});");
fs.writeFileSync(`${root}/check_site.audit.mjs`,source);
const r=spawnSync(process.execPath,[`${root}/check_site.audit.mjs`],{encoding:'utf8',timeout:180000});
fs.writeFileSync(`${root}/log.txt`,`${r.stdout||''}\n${r.stderr||''}\nExit: ${r.status}\n${r.error||''}`);console.log(r.stdout);console.error(r.stderr);console.log('Exit',r.status);process.exitCode=r.status??1;
