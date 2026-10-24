from html.parser import HTMLParser
from pathlib import Path
import re
from PIL import Image

class Audit(HTMLParser):
    def __init__(self):
        super().__init__()
        self.paths=[]; self.ids=[]; self.images=[]
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        for key in ('src','href'):
            value=attrs.get(key,'')
            if value and not value.startswith(('http','#')): self.paths.append(value)
        if 'id' in attrs: self.ids.append(attrs['id'])
        if tag=='img': self.images.append(attrs)

audit=Audit()
audit.feed(Path('index.html').read_text(encoding='utf-8'))
missing=[p for p in audit.paths if not Path(p).is_file()]
js=Path('js/script.js').read_text(encoding='utf-8')
dynamic=re.findall(r"image: '(\w+)'",js)
missing.extend(name for name in dynamic if not Path(f'assets/images/{name}.webp').is_file())
css=Path('css/style.css').read_text(encoding='utf-8')
assert not missing, missing
assert len(audit.ids)==len(set(audit.ids)), 'Duplicate IDs'
assert all('alt' in image for image in audit.images), 'Missing alt'
assert css.count('{')==css.count('}'), 'Unbalanced CSS braces'
for asset in Path('assets/images').glob('*.webp'):
    with Image.open(asset) as image:
        image.load()
print('Local paths, dynamic assets, IDs, image alt attributes and CSS braces: OK')
print('All WebP assets decode successfully')
print('WebP assets:',len(list(Path('assets/images').glob('*.webp'))))
