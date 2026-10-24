import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const root='auditoria/p1-20261024-01';
const status=execFileSync('git',['status','--porcelain=v1'],{encoding:'utf8'});
const head=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
fs.mkdirSync(`${root}/backup`,{recursive:true});
const files=['index.html','css/style.css','js/script.js','README.md','vercel.json','AUDITORIA-VISUAL-FINI.md','tools/check_site.mjs','tools/validate_files.py','tools/prepare_assets.py'];
const hashes={};
for(const file of files){fs.mkdirSync(`${root}/backup/${file.split('/').slice(0,-1).join('/')}`,{recursive:true});fs.copyFileSync(file,`${root}/backup/${file}`,fs.constants.COPYFILE_EXCL);hashes[file]=createHash('sha256').update(fs.readFileSync(file)).digest('hex');}
fs.cpSync('assets',`${root}/backup/assets`,{recursive:true,errorOnExist:true,force:false});
fs.writeFileSync(`${root}/git-inicial.txt`,`HEAD: ${head}\n\n${status}`,{flag:'wx'});
fs.writeFileSync(`${root}/hashes-iniciais.json`,JSON.stringify(hashes,null,2),{flag:'wx'});
console.log({head,status,backup:`${root}/backup`});
