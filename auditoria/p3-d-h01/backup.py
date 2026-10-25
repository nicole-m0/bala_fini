from pathlib import Path
import hashlib,json,shutil,subprocess
r=Path.cwd(); out=r/'auditoria/p3-d-h01'; backup=out/'backup-p2'
backup.mkdir()
files=[r/p for p in ['index.html','css/style.css','js/script.js','vercel.json','.vercelignore','tools/check_site.mjs','tools/validate_files.py','RELATORIO-P2-FINI.md','PLANO-P3-FINI.md']]
files+=list((r/'assets/images').glob('*.webp'))
files+=list((r/'assets/images/candies/minhocas-azedinhas').glob('*v02*.webp'))
hashes={}
for p in files:
    rel=p.relative_to(r); target=backup/rel; target.parent.mkdir(parents=True,exist_ok=True)
    shutil.copy2(p,target)
    h=hashlib.sha256(p.read_bytes()).hexdigest()
    assert hashlib.sha256(target.read_bytes()).hexdigest()==h
    hashes[rel.as_posix()]=h
(out/'backup-sha256.json').write_text(json.dumps(hashes,indent=2),encoding='utf-8')
(out/'git-inicial.txt').write_bytes(subprocess.check_output(['git','status','--short']))
print(f'Backup P2 verificado: {len(hashes)} arquivos em {backup}')
