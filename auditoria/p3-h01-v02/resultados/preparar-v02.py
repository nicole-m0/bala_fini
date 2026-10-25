"""Enquadramento, derivados e provas determinísticas; não redesenha o doce."""
from pathlib import Path
import hashlib,json
from PIL import Image,ImageDraw,ImageFont,ImageOps

R=Path(__file__).resolve().parents[3]
O=Path(__file__).resolve().parent
P=R/'design/p3-candies/provas/h01-v02'
M=R/'design/p3-candies/masters'
raw=Image.open(M/'minhoca-a-view01-v02-gerado-original.png').convert('RGBA')
# Alfa 1 (1/255) fora da silhueta é ruído do gerador, não açúcar observável.
b=raw.getchannel('A').point(lambda a:255 if a>1 else 0).getbbox()
px=round((b[2]-b[0])*.05); py=round((b[3]-b[1])*.05)
box=(b[0]-px,b[1]-py,b[2]+px,b[3]+py)
im=raw.crop(box)
im.save(M/'minhoca-a-view01-v02.png')
old=Image.open(M/'minhoca-a-view01-v01.png').convert('RGBA')
ref=Image.open(R/'design/p3-candies/referencias/oficial/MINHOCACITRICA_U3_1000X1000.jpg').convert('RGBA')
F='C:/Windows/Fonts/arial.ttf'
font=ImageFont.truetype(F,22); small=ImageFont.truetype(F,18); title=ImageFont.truetype(F,32)
def hash(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def describe(p):
    a=Image.open(p); a.load()
    d={'path':p.relative_to(R).as_posix(),'width':a.width,'height':a.height,'bytes':p.stat().st_size,'sha256':hash(p),'mode':a.mode}
    if 'A' in a.getbands():
        alpha=a.getchannel('A'); hist=alpha.histogram()
        d.update(alpha_zero=hist[0],alpha_partial=sum(hist[1:255]),alpha_opaque=hist[255],bbox_alpha_gt_1=alpha.point(lambda x:255 if x>1 else 0).getbbox())
    return d
files=[]
for w in (256,512):
    p=R/f'assets/images/candies/minhocas-azedinhas/minhoca-a-view01-v02-{w}.webp'
    im.resize((w,round(w*im.height/im.width)),Image.Resampling.LANCZOS).save(p,'WEBP',quality=90,method=6)
    files.append(describe(p))
def put(c,s,xy,size,angle=0,opacity=1):
    a=ImageOps.contain(s,size,Image.Resampling.LANCZOS)
    if opacity!=1:a.putalpha(a.getchannel('A').point(lambda v:round(v*opacity)))
    if angle:a=a.rotate(-angle,Image.Resampling.BICUBIC,expand=True)
    c.alpha_composite(a,xy)
def actual(c,d,s,x,y,ink):
    for j,(label,w,h) in enumerate([('Desktop 100x33',100,33),('Max 116x38',116,38),('Min 68x22',68,22),('Mobile 65x23',65,23),('Max 75x27',75,27),('Min 44x16',44,16)]):
        xx=x+j*240
        d.text((xx,y),label,font=small,fill=ink)
        d.rectangle((xx,y+32,xx+w,y+32+h),outline=ink,width=1)
        put(c,s,(xx,y+32),(w,h))
for name,bg,ink in [('creme','#fbf6e9','#292074'),('azul','#292074','#fbf6e9'),('rosa','#eb3477','#fbf6e9')]:
    c=Image.new('RGBA',(1600,1200),bg);d=ImageDraw.Draw(c)
    d.text((40,25),f'H01-v02 / {name.upper()} {bg} / PILOTO EM REVISAO',font=title,fill=ink)
    d.text((40,75),f'PNG {im.width}x{im.height} RGBA / recorte proporcional, sem esticar / origem R06 + R07',font=font,fill=ink)
    d.text((40,110),'Edicao generativa: correspondencia exata com o produto ainda nao aprovada.',font=small,fill=ink)
    put(c,im,(80,170),(1440,420))
    d.text((40,620),'Balanco / 240 px de largura / opacidade 1',font=font,fill=ink)
    for x,angle in [(70,-40),(570,-12),(1080,16)]:
        put(c,im,(x,665),(240,150),angle)
        d.text((x,900),f'{angle:+} graus',font=small,fill=ink)
    d.text((40,950),'Caixas reais do hero / DPR 1 / contencao proporcional / contorno indica a caixa CSS',font=font,fill=ink)
    actual(c,d,im,40,990,ink)
    d.text((40,1100),'Plano traseiro / opacidade 0,62',font=small,fill=ink)
    put(c,im,(500,1080),(240,85),opacity=.62)
    d.text((40,1165),'Mestre SHA-256: '+hash(M/'minhoca-a-view01-v02.png'),font=small,fill=ink)
    c.convert('RGB').save(P/f'h01-v02-{name}.png')

c=Image.new('RGBA',(1800,1300),'#fbf6e9');d=ImageDraw.Draw(c)
d.text((40,25),'R06 / H01-v01 / H01-v02 - comparacao de referencia e pilotos',font=title,fill='#292074')
d.text((40,75),'R06 integral, sem reconstruir/recortar o doce. Pilotos abaixo mantem seus proprios canvases.',font=font,fill='#292074')
for x,label in [(40,'R06 oficial / alvo verde-laranja em primeiro plano'),(640,'v01 / original preservado'),(1240,'v02 / enquadramento ajustado')]:
    d.text((x,130),label,font=small,fill='#292074')
put(c,ref,(40,170),(520,520))
put(c,old,(640,330),(520,300))
put(c,im,(1240,330),(520,300))
d.text((40,740),'Mesma caixa de apresentacao: 100x33 desktop e 65x23 mobile (DPR 1)',font=font,fill='#292074')
for x,s,label in [(640,old,'v01'),(1240,im,'v02')]:
    d.text((x,810),label,font=font,fill='#292074')
    for xx,w,h in [(x,100,33),(x+220,65,23)]:
        d.rectangle((xx,860,xx+w,860+h),outline='#292074')
        put(c,s,(xx,860),(w,h))
d.text((40,980),'Revisar: curva, pontas assimetricas, distribuicao do acucar e ocupacao optica.',font=font,fill='#292074')
d.text((40,1020),'A v02 ainda e uma interpretacao generativa, nao um recorte fotografico exato.',font=font,fill='#292074')
d.text((40,1060),'R07 e a macro de apoio; ambas as fotografias originais acompanham o pacote de revisao.',font=font,fill='#292074')
d.text((40,1150),'Nenhuma versao integrada ao site. Sem H02, sem alteracao de argolas ou animacoes.',font=font,fill='#292074')
c.convert('RGB').save(P/'comparacao-r06-v01-v02.png')
baseline=json.loads((O/'integridade-inicial.json').read_text())
changed=[p for p,h in baseline.items() if hash(R/p)!=h]
assert not changed,changed
result={'raw':describe(M/'minhoca-a-view01-v02-gerado-original.png'),'master':describe(M/'minhoca-a-view01-v02.png'),'crop_box_raw':box,'crop_rule':'bbox alpha>1 + 5% por eixo; sem alteracao do alfa no interior, sem deformacao','files':files,'proofs':[describe(p) for p in sorted(P.glob('*.png'))],'preservation':{'checked':len(baseline),'changed':changed}}
(O/'h01-v02-arquivos.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result))
