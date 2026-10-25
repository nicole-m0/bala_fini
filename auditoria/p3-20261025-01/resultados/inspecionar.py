"""Inventário local de referências e integridade; não transforma imagens."""
from pathlib import Path
import hashlib
import json
import os
import zipfile

ROOT = Path(__file__).resolve().parents[3]
OUT = Path(__file__).resolve().parent
SKIP = {'.git', '.vercel', 'chrome-profile', 'browser-profile', 'node_modules'}
EXT = {'.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg', '.gif', '.heic', '.tif', '.tiff', '.bmp'}

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

images = []
for folder, dirs, files in os.walk(ROOT):
    dirs[:] = sorted(d for d in dirs if d not in SKIP)
    for name in sorted(files):
        path = Path(folder) / name
        if path.suffix.lower() in EXT:
            images.append({'path': path.relative_to(ROOT).as_posix(), 'bytes': path.stat().st_size, 'sha256': digest(path)})
archives = []
for path in sorted(ROOT.glob('*.zip')):
    with zipfile.ZipFile(path) as archive:
        archives.append({'path': path.name, 'entries': archive.namelist()})
protected = [ROOT / p for p in ('index.html', 'css/style.css', 'js/script.js', 'PLANO-P3-FINI.md', 'vercel.json', '.vercelignore')]
protected += sorted((ROOT / 'assets/images').glob('*.webp'))
baseline = OUT / 'integridade-inicial.json'
current = {p.relative_to(ROOT).as_posix(): digest(p) for p in protected}
if not baseline.exists():
    baseline.write_text(json.dumps(current, indent=2), encoding='utf-8')
    (OUT / 'inventario-imagens.json').write_text(json.dumps({'excluded_directories': sorted(SKIP), 'images': images, 'archives': archives}, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'Inventário: {len(images)} imagens, {len(archives)} arquivos ZIP; baseline: {len(current)} arquivos.')
else:
    original = json.loads(baseline.read_text(encoding='utf-8'))
    changed = [p for p in original if current.get(p) != original[p]]
    result = {'checked': len(original), 'changed': changed, 'unchanged': not changed}
    (OUT / 'integridade-final.json').write_text(json.dumps(result, indent=2), encoding='utf-8')
    print(json.dumps(result))
    if changed:
        raise SystemExit(1)
