import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..'), out=path.join(root,'dist');
const files=JSON.parse(fs.readFileSync(path.join(root,'tools/publication-allowlist.json'),'utf8'));
if(new Set(files).size!==files.length)throw Error('Duplicate allowlist entry');
for(const file of files){
 if(!/^(index\.html|css\/style\.css|js\/script\.js|assets\/images\/[a-zA-Z0-9/-]+\.webp)$/.test(file)||file.includes('..'))throw Error('Unsafe entry: '+file);
 let current=root;
 for(const part of file.split('/')){current=path.join(current,part);if(fs.lstatSync(current).isSymbolicLink())throw Error('Symlink forbidden: '+file);}
 if(!fs.statSync(current).isFile())throw Error('Missing source: '+file);
}
function walk(dir,prefix=''){
 if(!fs.existsSync(dir))return [];
 if(fs.lstatSync(dir).isSymbolicLink())throw Error('Symlink forbidden: '+dir);
 return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const p=prefix+e.name;if(e.isSymbolicLink())throw Error('Symlink forbidden: '+p);return e.isDirectory()?walk(path.join(dir,e.name),p+'/'):[p];});
}
const extras=walk(out).filter(f=>!files.includes(f));
if(extras.length)throw Error('Unexpected dist files; review manually: '+extras.join(', '));
const inventory=files.map(file=>{
 const data=fs.readFileSync(path.join(root,file)), target=path.join(out,file);
 fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,data);
 const sha256=crypto.createHash('sha256').update(data).digest('hex');
 if(crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex')!==sha256)throw Error('Copy mismatch');
 return {path:file,bytes:data.length,sha256};
});
fs.mkdirSync(path.join(root,'auditoria/p5-a-20261026'),{recursive:true});
fs.writeFileSync(path.join(root,'auditoria/p5-a-20261026/distribution-inventory.json'),JSON.stringify(inventory,null,2)+'\n');
console.log('Verified distribution:',inventory.length,'files,',inventory.reduce((n,f)=>n+f.bytes,0),'bytes');
