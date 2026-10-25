from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
import hashlib,json,difflib
root=Path.cwd();r=root/'auditoria/p3-d-h01'
results=json.loads((r/'results.json').read_text())
assert not results.get('failure')
assert 'Exit 0' in (r/'run-existing.mjs.final.log').read_text(encoding='utf-8')
assert 'passed' in (r/'faults.mjs.final.log').read_text(encoding='utf-8')
patch=''
for name in ['css/style.css','js/script.js']:
    patch+=''.join(difflib.unified_diff((r/'backup-p2'/name).read_text(encoding='utf-8').splitlines(True),(root/name).read_text(encoding='utf-8').splitlines(True),fromfile='P2/'+name,tofile='P3/'+name))
(r/'alteracoes-p2-p3.patch').write_text(patch,encoding='utf-8')
files={}
for folder in ['capturas','revisao','tests-existing/screenshots']:
    for p in (r/folder).rglob('*'):
        if p.is_file():files[p.relative_to(r).as_posix()]=p
for seq in results['sequences']:
    folder=r/'sequencias'/seq['name']
    for n in ['frames.json']+[f['file'] for f in seq['frames']]:
        p=folder/n;files[p.relative_to(r).as_posix()]=p
for n in ['results.json','fault-results.json','performance-results.json','delivery-verification.json','backup-sha256.json','alteracoes-p2-p3.patch','test-h01.mjs.final.log','faults.mjs.final.log','performance.mjs.final.log','run-existing.mjs.final.log','tests-existing/log.txt']:
    files['resultados/'+n.replace('/','-')]=r/n
files['RELATORIO-P3-D-H01-FINI.md']=root/'RELATORIO-P3-D-H01-FINI.md'
for w in [256,512]:
    n=f'minhoca-a-view01-v02-{w}.webp';files['asset-h01/'+n]=root/'assets/images/candies/minhocas-azedinhas'/n
readme='REVISAO EXTERNA P3-D / H01-v02\n\nExtraia o ZIP e abra revisao/index.html. Nao requer servidor ou internet.\nO visualizador permite comparar P2/P3 na mesma fase e percorrer 3 sequencias reais.\nLeia RELATORIO-P3-D-H01-FINI.md para escopo, testes e limites.\nOs estados front-max/back-min sao fases fixadas SOMENTE pelo teste.\nAs sequencias tem orbitas naturais; amostragem de captura nao comprova FPS.\nA falha de rede registrada no modo blocked foi injetada intencionalmente.\nCapturas completas da suite forcam reveal; nao sao prova de disparo natural.\nSem autorizacao de publicacao ou aprovacao definitiva de fidelidade comercial.\nNao inclui perfil de navegador nem arquivos pessoais.\n'
manifest={n:{'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for n,p in files.items()}
archive=root/'REVISAO-VISUAL-FINI-P3-D-H01.zip'
with archive.open('xb') as stream:
    with ZipFile(stream,'w',compression=ZIP_DEFLATED) as z:
        for n,p in sorted(files.items()):z.write(p,n)
        z.writestr('LEIA-ME.txt',readme.encode('utf-8'))
        z.writestr('manifesto-sha256.json',json.dumps(manifest,indent=2))
with ZipFile(archive) as z:
    assert z.testzip() is None
    for n,m in manifest.items():assert hashlib.sha256(z.read(n)).hexdigest()==m['sha256']
    count=len(z.namelist())
summary={'path':str(archive),'bytes':archive.stat().st_size,'entries':count,'verified':True}
(r/'zip-verification.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
print(json.dumps(summary))
