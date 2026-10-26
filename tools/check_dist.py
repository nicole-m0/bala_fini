"""Verify only the isolated localhost distribution; never reads secret contents."""
from pathlib import Path
import hashlib
import json
import re
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'dist'
BASE = 'http://127.0.0.1:8015/'
allowed = json.loads((ROOT / 'tools/publication-allowlist.json').read_text())
actual = sorted(p.relative_to(OUT).as_posix() for p in OUT.rglob('*') if p.is_file())
assert actual == sorted(allowed)
positive = []
for file in allowed:
    with urllib.request.urlopen(BASE + file) as response:
        body = response.read()
        assert response.status == 200 and body == (ROOT / file).read_bytes()
        positive.append(dict(path=file, status=200, sha256=hashlib.sha256(body).hexdigest()))
negative = [
    'RELATORIO-P4-D-FINI.md', 'RELATORIO-P5-A-FINI.md', 'README.md',
    'REVISAO-FINAL-FINI-P4-D.zip', 'vercel.json', '.env.local', '.git/config',
    '.vercel/project.json', 'tools/check_site.mjs', 'tools/build_dist.mjs',
    'tools/publication-allowlist.json',
    'auditoria/p4-d-20261026/publication-inventory.json',
    'design/p3-candies/masters/minhoca-a-view01-v02.png',
    'design/p3-candies/referencias/oficial/ORIGEM.json',
    'assets/images/candies/manifest.json', 'assets/images/candies/README.md',
    'assets/images/candies/minhocas-azedinhas/minhoca-a-view01-v01-256.webp',
    'assets/images/balafini9.webp', '../RELATORIO-P4-D-FINI.md',
    '%2e%2e/RELATORIO-P4-D-FINI.md',
]
backups = sorted((ROOT / 'auditoria').glob('**/index.html'))
# A clean checkout need not contain historical audit backups.
negative.append(backups[0].relative_to(ROOT).as_posix() if backups
                else 'auditoria/backup/index.html')
results = []
for file in negative:
    try:
        with urllib.request.urlopen(BASE + file) as response:
            status = response.status
    except urllib.error.HTTPError as error:
        status = error.code
    assert status == 404, (file, status)
    results.append(dict(path=file, status=status))
html = (ROOT / 'index.html').read_text(encoding='utf8')
refs = {x for x in re.findall(r'(?:src|href)="([^"#]+)"', html)
        if not x.startswith(('http:', 'https:'))}
js = (ROOT / 'js/script.js').read_text(encoding='utf8')
refs |= {'assets/images/' + n + '.webp' for n in re.findall(r"image:\s*'([^']+)'", js)}
refs |= set(re.findall(r'assets/images/[a-zA-Z0-9/-]+\.webp', js))
assert refs | {'index.html'} == set(allowed)
report = dict(positive=positive, negative=results, relativeReferences=sorted(refs), exactAllowlist=True)
evidence = ROOT / 'auditoria/p5-a-20261026'
evidence.mkdir(parents=True, exist_ok=True)
(evidence / 'isolation-tests.json').write_text(json.dumps(report, indent=2) + '\n')
print(f'OK: {len(positive)} resources, {len(results)} internal requests returned 404; exact reference coverage')
