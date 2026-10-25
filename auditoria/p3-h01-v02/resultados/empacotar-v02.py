from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
import hashlib,json

R=Path(__file__).resolve().parents[3]
O=Path(__file__).resolve().parent
pairs=[]
for n in ['MINHOCACITRICA_U3_1000X1000.jpg','MINHOCACITRICA_C_1000X1000.jpg','ORIGEM.json']:
    pairs.append((R/'design/p3-candies/referencias/oficial'/n,'referencias/'+n))
for v in ['v01','v02']:
    names=[f'minhoca-a-view01-{v}.png']
    if v=='v02':names.append('minhoca-a-view01-v02-gerado-original.png')
    for n in names:pairs.append((R/'design/p3-candies/masters'/n,f'piloto/{v}/{n}'))
    for w in [256,512]:
        n=f'minhoca-a-view01-{v}-{w}.webp'
        pairs.append((R/'assets/images/candies/minhocas-azedinhas'/n,f'piloto/{v}/{n}'))
    folder='fundos-creme-azul-rosa' if v=='v01' else 'h01-v02'
    for bg in ['creme','azul','rosa']:
        n=f'h01-{v}-{bg}.png'
        pairs.append((R/f'design/p3-candies/provas/{folder}'/n,f'provas/{v}/{n}'))
pairs.append((R/'design/p3-candies/provas/h01-v02/comparacao-r06-v01-v02.png','comparacao/comparacao-r06-v01-v02.png'))
for p in [R/'RELATORIO-P3-H01-V02-FINI.md',R/'design/p3-candies/H01-V02-PROMPT.txt',O/'h01-v02-arquivos.json']:
    pairs.append((p,'documentacao/'+p.name))
readme='H01-v02: piloto em revisao, nao aprovado nem integrado.\nComece por comparacao/comparacao-r06-v01-v02.png.\nAs provas incluem caixas reais do hero; abra a 100% para conferir pixels.\nA v01 foi preservada. A v02 e uma edicao generativa com reenquadramento, nao recorte fotografico exato.\nLeia documentacao/RELATORIO-P3-H01-V02-FINI.md para diferencas e limites.\n'
archive=R/'REVISAO-VISUAL-FINI-P3-H01-V02.zip'
with archive.open('xb') as stream:
    with ZipFile(stream,'w',compression=ZIP_DEFLATED) as z:
        for p,n in pairs:z.write(p,n)
        z.writestr('documentacao/LEIA-ME.txt',readme.encode('utf-8'))
with ZipFile(archive) as z:
    assert z.testzip() is None
    for p,n in pairs:assert z.read(n)==p.read_bytes(),n
    count=len(z.namelist())
baseline=json.loads((O/'integridade-inicial.json').read_text())
changed=[p for p,h in baseline.items() if hashlib.sha256((R/p).read_bytes()).hexdigest()!=h]
assert not changed,changed
result={'archive':str(archive),'bytes':archive.stat().st_size,'entries':count,'contents_identical':True,'preserved_files':len(baseline),'changed':changed}
(O/'verificacao-final.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result))
