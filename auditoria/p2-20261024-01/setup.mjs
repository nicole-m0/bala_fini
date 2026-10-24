import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const root='auditoria/p2-20261024-01';
const status=execFileSync('git',['status','--short'],{encoding:'utf8'});
fs.mkdirSync(`${root}/backup-p1`,{recursive:true});
const files=['index.html','css/style.css','js/script.js','tools/check_site.mjs','tools/validate_files.py','AUDITORIA-VISUAL-FINI.md','RELATORIO-P1-FINI.md'];
const hashes={};
for(const file of files){fs.mkdirSync(`${root}/backup-p1/${file.split('/').slice(0,-1).join('/')}`,{recursive:true});fs.copyFileSync(file,`${root}/backup-p1/${file}`,fs.constants.COPYFILE_EXCL);hashes[file]=createHash('sha256').update(fs.readFileSync(file)).digest('hex');}
fs.cpSync('assets',`${root}/backup-p1/assets`,{recursive:true,errorOnExist:true,force:false});
fs.writeFileSync(`${root}/git-inicial.txt`,execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'})+status,{flag:'wx'});
fs.writeFileSync(`${root}/hashes-p1.json`,JSON.stringify(hashes,null,2),{flag:'wx'});
console.log('P1 backup and Git state saved:',root);
