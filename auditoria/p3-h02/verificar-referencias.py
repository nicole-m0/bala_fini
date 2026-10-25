"""Registra integridade e monta pacote de evidências; não produz doces."""
from pathlib import Path
import hashlib,json
from zipfile import ZipFile,ZIP_DEFLATED

root=Path(__file__).resolve().parents[2]
out=Path(__file__).resolve().parent
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
protected=[root/p for p in ['index.html','css/style.css','js/script.js','PLANO-P3-FINI.md','vercel.json','.vercelignore']]
protected+=list((root/'assets/images').glob('*.webp'))
protected+=list((root/'assets/images/candies/minhocas-azedinhas').glob('*.webp'))
protected+=list((root/'design/p3-candies/masters').glob('*.png'))
protected+=list((root/'design/p3-candies/referencias/oficial').glob('*'))
protected=[p for p in protected if p.is_file()]
baseline=out/'integridade-inicial.json'
now={p.relative_to(root).as_posix():sha(p) for p in protected}
if not baseline.exists():
    baseline.write_text(json.dumps(now,indent=2),encoding='utf-8')
    print(f'{len(now)} arquivos registrados; nenhuma imagem alterada.')
else:
    before=json.loads(baseline.read_text(encoding='utf-8'))
    changed=[p for p,h in before.items() if now.get(p)!=h]
    assert not changed,changed
    result={'checked':len(before),'changed':changed,'h02_generated':False,'reason':'No second complete individual silhouette identifiable in R06/R07.'}
    (out/'verificacao-final.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
    sources={
      'referencias/R06-MINHOCACITRICA_U3_1000X1000.jpg':root/'design/p3-candies/referencias/oficial/MINHOCACITRICA_U3_1000X1000.jpg',
      'referencias/R07-MINHOCACITRICA_C_1000X1000.jpg':root/'design/p3-candies/referencias/oficial/MINHOCACITRICA_C_1000X1000.jpg',
      'referencias/ORIGEM.json':root/'design/p3-candies/referencias/oficial/ORIGEM.json',
      'comparacao-disponivel/H01-v02-contexto-apenas.png':root/'design/p3-candies/masters/minhoca-a-view01-v02.png',
      'RELATORIO-P3-H02-FINI.md':root/'RELATORIO-P3-H02-FINI.md',
      'documentacao/verificacao-final.json':out/'verificacao-final.json',
      'documentacao/inspecao-referencias.json':out/'inspecao-referencias.json'
    }
    manifest={n:{'bytes':p.stat().st_size,'sha256':sha(p)} for n,p in sources.items()}
    archive=root/'REVISAO-VISUAL-FINI-P3-H02.zip'
    with archive.open('xb') as stream:
        with ZipFile(stream,'w',compression=ZIP_DEFLATED) as z:
            for n,p in sources.items():z.write(p,n)
            z.writestr('LEIA-ME.txt','P3-C / H02: pacote de referencias e impedimento de producao.\nH02 NAO foi gerada: R06/R07 nao mostram uma segunda unidade com silhueta completa.\nNao ha mestre H02, WebPs, provas ou comparacao H01/H02.\nH01-v02 foi incluida somente como contexto, sem modificacao.\nLeia RELATORIO-P3-H02-FINI.md para a imagem adicional necessaria.\n')
            z.writestr('manifesto-sha256.json',json.dumps(manifest,indent=2))
    with ZipFile(archive) as z:
        assert z.testzip() is None
        for n,p in sources.items():assert z.read(n)==p.read_bytes()
    print(json.dumps({'archive':str(archive),'bytes':archive.stat().st_size,'protected_files_unchanged':len(before),'h02_generated':False}))
