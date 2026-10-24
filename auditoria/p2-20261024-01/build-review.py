from pathlib import Path
import sys
import json
from PIL import Image, ImageDraw

root = Path('auditoria/p2-20261024-01')
run = sys.argv[1] if len(sys.argv) > 1 else 'motion-delivery'
source = root / run
results = json.loads((source / 'results.json').read_text(encoding='utf-8'))
assert results['failure'] is None, results['failure']
review = root / 'revisao-final'
review.mkdir(exist_ok=False)
clips = []
for entry in results['clips']:
    clip = json.loads((source / entry['name'] / 'frames.json').read_text(encoding='utf-8'))
    assert len(clip['frames']) > 1, clip['name']
    start = clip['frames'][0]['timestamp']
    for frame in clip['frames']:
        frame['url'] = f"../{run}/{clip['name']}/{frame['name']}"
        frame['ms'] = round((frame['timestamp'] - start) * 1000)
    clips.append(clip)
    count = min(6, len(clip['frames']))
    indexes = [round(i * (len(clip['frames']) - 1) / (count - 1)) for i in range(count)]
    sheet = Image.new('RGB', (1320, 680), '#eeeae3')
    draw = ImageDraw.Draw(sheet)
    for position, index in enumerate(indexes):
        frame = clip['frames'][index]
        image = Image.open(source / clip['name'] / frame['name']).convert('RGB')
        image.thumbnail((430, 300))
        x = (position % 3) * 440 + (440 - image.width) // 2
        y = (position // 3) * 340 + 24
        sheet.paste(image, (x, y))
        draw.text(((position % 3) * 440 + 10, (position // 3) * 340 + 6), f"{clip['name']} | frame {index} | {frame['ms']} ms", fill='#292074')
    sheet.save(review / f"{clip['name']}-sequencia.jpg", quality=90)

data = json.dumps(clips, ensure_ascii=False).replace('</', '<\\/')
html = '''<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Revisão de movimento — Fini P2</title>
<style>body{margin:0;padding:24px;background:#f3efe8;color:#292074;font:16px system-ui}main{max-width:1150px;margin:auto}h1{font-size:26px}p{line-height:1.6;max-width:900px}select,button{font:inherit;padding:10px;border:1px solid #29207455;border-radius:8px;background:white;color:inherit}select{max-width:100%}.controls{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin:16px 0}input{flex:1;min-width:180px}img{display:block;max-width:100%;max-height:75vh;margin:auto;object-fit:contain}.screen{background:#dedad3;padding:12px;border-radius:12px}a{color:inherit}:focus-visible{outline:3px solid #eb3477;outline-offset:4px}small{display:block;margin-top:14px}</style>
<main><h1>Revisão de movimento — Fini P2</h1><p>Sequências reais do screencast do Chrome, com intervalos registrados pelo navegador. O primeiro clipe é a referência P1. Os demais mostram P2. Não é um vídeo de 60 fps: a captura tem amostragem variável e não mede desempenho do site.</p>
<label for="clip">Sequência</label> <select id="clip"></select><div class="controls"><button id="play">Reproduzir</button><button id="previous" aria-label="Frame anterior">←</button><input id="scrub" type="range" min="0" value="0" aria-label="Frame da sequência"><button id="next" aria-label="Próximo frame">→</button><output id="time" aria-live="off"></output></div>
<div class="screen"><img id="frame" alt="Frame da animação capturado no navegador"></div><small><a id="sheet">Abrir sequência de comparação em uma imagem</a>. Nenhum asset do site foi substituído. Use o seletor para comparar ritmos, enquadramento e passagem entre planos.</small></main>
<script>const clips=__DATA__;const select=document.querySelector('#clip'),scrub=document.querySelector('#scrub'),image=document.querySelector('#frame'),play=document.querySelector('#play');let current=0,timer=null;clips.forEach((c,i)=>select.add(new Option(c.name,i)));function stop(){clearTimeout(timer);timer=null;play.textContent='Reproduzir'}function show(i){const c=clips[Number(select.value)];current=Math.max(0,Math.min(c.frames.length-1,i));image.src=c.frames[current].url;scrub.value=current;document.querySelector('#time').textContent=`${current+1}/${c.frames.length} · ${c.frames[current].ms} ms`;}function load(){stop();scrub.max=clips[Number(select.value)].frames.length-1;document.querySelector('#sheet').href=clips[Number(select.value)].name+'-sequencia.jpg';show(0)}function tick(){const c=clips[Number(select.value)];if(current===c.frames.length-1){stop();return}const delay=Math.max(25,c.frames[current+1].ms-c.frames[current].ms);timer=setTimeout(()=>{show(current+1);tick()},delay)}select.onchange=load;scrub.oninput=()=>{stop();show(Number(scrub.value))};document.querySelector('#previous').onclick=()=>{stop();show(current-1)};document.querySelector('#next').onclick=()=>{stop();show(current+1)};play.onclick=()=>{if(timer){stop();return}if(current===clips[Number(select.value)].frames.length-1)show(0);play.textContent='Pausar';tick()};load();</script></html>'''.replace('__DATA__', data)
(review / 'index.html').write_text(html, encoding='utf-8')
print(json.dumps({'clips':len(clips), 'frames':sum(len(c['frames']) for c in clips), 'player':str(review / 'index.html')}, ensure_ascii=False))
