from PIL import Image
from pathlib import Path
from collections import deque
import sys
from io import BytesIO

source = Path('C:/Users/Nicole/Pictures')
target = Path('assets/images')
names = [f'balafini{i}' for i in range(1,14)] + [f'caixafini{i}' for i in range(2,8)] + ['iconfini','mascotefini']
if len(sys.argv) > 1:
    names = sys.argv[1:]
for name in names:
    path = source / (name + '.png')
    output = target / (name + '.webp')
    if output.exists() and len(sys.argv) == 1:
        try:
            with Image.open(output) as existing:
                existing.load()
            continue
        except (OSError, ValueError):
            pass
    if not path.exists():
        continue
    im = Image.open(path).convert('RGBA')
    if name == 'iconfini':
        im = im.crop((0, 2, im.width, im.height))
    elif name.startswith(('balafini', 'caixafini')):
        # The supplied screenshots sometimes include a dark 1–3 px outer border.
        # It is disconnected from the packaging and prevents a correct alpha crop.
        im = im.crop((4, 4, im.width - 4, im.height - 4))
    # Remove only the neutral background connected to the image edges.
    pix = im.load(); w,h = im.size
    seen = bytearray(w*h); q = deque()
    def enqueue(x,y):
        idx=y*w+x
        if seen[idx]: return
        seen[idx]=1
        r,g,b,a=pix[x,y]
        threshold = 215 if name == 'mascotefini' else 235
        if min(r,g,b)>threshold and max(r,g,b)-min(r,g,b)<12:
            q.append((x,y)); pix[x,y]=(r,g,b,0)
    for x in range(w): enqueue(x,0); enqueue(x,h-1)
    for y in range(h): enqueue(0,y); enqueue(w-1,y)
    while q:
        x,y=q.popleft()
        if x: enqueue(x-1,y)
        if x<w-1: enqueue(x+1,y)
        if y: enqueue(x,y-1)
        if y<h-1: enqueue(x,y+1)
    if name == 'mascotefini':
        # Exclude the stray page label above the supplied character.
        for y in range(8):
            for x in range(w//3, 2*w//3):
                pix[x,y]=(0,0,0,0)
    box=im.getbbox()
    if box: im=im.crop(box)
    im.thumbnail((700,900))
    buffer = BytesIO()
    im.save(buffer, 'WEBP', quality=88, method=6)
    temporary = output.with_suffix('.tmp')
    temporary.write_bytes(buffer.getvalue())
    temporary.replace(output)
    print(name, im.size)
