"""Exporta derivados e compõe provas estáticas do mesmo piloto, sem retoque."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import hashlib
import json

root = Path(__file__).resolve().parents[3]
master = root / 'design/p3-candies/masters/minhoca-a-view01-v01.png'
sprite = Image.open(master).convert('RGBA')
sha = hashlib.sha256(master.read_bytes()).hexdigest()
dest = root / 'assets/images/candies/minhocas-azedinhas'
proofs = root / 'design/p3-candies/provas/fundos-creme-azul-rosa'
font_path = 'C:/Windows/Fonts/arial.ttf'
font = ImageFont.truetype(font_path, 22)
small = ImageFont.truetype(font_path, 17)
title = ImageFont.truetype(font_path, 30)
files = []
for width in (256, 512):
    im = sprite.resize((width, round(width*sprite.height/sprite.width)), Image.Resampling.LANCZOS)
    p = dest / f'minhoca-a-view01-v01-{width}.webp'
    im.save(p, 'WEBP', quality=90, method=6)
    files.append({'path': p.relative_to(root).as_posix(), 'width': im.width, 'height': im.height, 'bytes': p.stat().st_size, 'sha256': hashlib.sha256(p.read_bytes()).hexdigest()})

def paste(canvas, width, xy, angle=0, opacity=1):
    im = sprite.resize((width, round(width*sprite.height/sprite.width)), Image.Resampling.LANCZOS)
    if opacity != 1:
        im.putalpha(im.getchannel('A').point(lambda a: round(a*opacity)))
    if angle:
        im = im.rotate(-angle, Image.Resampling.BICUBIC, expand=True)
    canvas.alpha_composite(im, xy)

for name, color, ink in [('creme','#fbf6e9','#292074'),('azul','#292074','#fbf6e9'),('rosa','#eb3477','#fbf6e9')]:
    canvas = Image.new('RGBA', (1600,1000), color)
    draw = ImageDraw.Draw(canvas)
    draw.text((40,25), f'H01 / PILOTO v01 / {name.upper()} {color}', font=title, fill=ink)
    draw.text((40,70), 'Referencia: FiniStore / unidade verde com pontas laranja. Edicao generativa: fidelidade pendente.', font=small, fill=ink)
    draw.text((40,98), f'Mestre {sprite.width}x{sprite.height} RGBA | SHA-256 {sha}', font=small, fill=ink)
    draw.text((40,140), 'Ampliacao para inspecao de material e recorte / opacidade 1', font=font, fill=ink)
    paste(canvas, 1320, (100,180))
    draw.text((40,635), 'Balanco de H01 / 240 px de canvas por amostra / opacidade 1', font=font, fill=ink)
    for x, angle in [(60,-40),(550,-12),(1050,16)]:
        paste(canvas, 240, (x,670), angle)
        draw.text((x,875), f'{angle:+} graus', font=small, fill=ink)
    draw.text((40,905), 'Tamanho de uso a DPR 1: desktop 100 / 116 / 68 px; mobile 65 / 75 / 44 px', font=small, fill=ink)
    x=50
    for width in (100,116,68,65,75,44):
        paste(canvas,width,(x,945))
        x += width+24
    draw.text((920,905), 'Plano traseiro / opacidade 0,62 / 180 px', font=small, fill=ink)
    paste(canvas,180,(930,930),opacity=.62)
    canvas.convert('RGB').save(proofs/f'h01-v01-{name}.png')

alpha = sprite.getchannel('A')
hist = alpha.histogram()
result={'master':{'path':master.relative_to(root).as_posix(),'width':sprite.width,'height':sprite.height,'bytes':master.stat().st_size,'sha256':sha,'mode':sprite.mode,'alpha_zero_pixels':hist[0],'alpha_partial_pixels':sum(hist[1:255]),'alpha_opaque_pixels':hist[255],'bbox_alpha_gt_0':alpha.getbbox(),'bbox_alpha_gt_16':alpha.point(lambda a:255 if a>16 else 0).getbbox()},'files':files,'proofs':[f'design/p3-candies/provas/fundos-creme-azul-rosa/h01-v01-{n}.png' for n in ('creme','azul','rosa')]}
(Path(__file__).parent/'h01-arquivos.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result))
