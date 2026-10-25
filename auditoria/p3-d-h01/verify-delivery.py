from pathlib import Path
import json,hashlib
r=Path.cwd();a=r/'auditoria/p3-d-h01';backup=a/'backup-p2'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
hashes=json.loads((a/'backup-sha256.json').read_text())
assert all(sha(backup/p)==h for p,h in hashes.items())
unchanged=[p for p,h in hashes.items() if sha(r/p)==h]
changed=[p for p,h in hashes.items() if sha(r/p)!=h]
assert changed==['css/style.css','js/script.js'],changed
old=(backup/'js/script.js').read_text(encoding='utf-8');new=(r/'js/script.js').read_text(encoding='utf-8')
assert old[old.index('const motionEase = {'):]==new[new.index('const motionEase = {'):]
assert old[:old.index('const motionEase = {')]==new[:new.index('// P3-D local experiment:')]
css=(r/'css/style.css').read_text(encoding='utf-8');start=css.index('/* P3-D — H01 only:');end=css.index('/* P2 — Local depth,',start)
assert css[:start]+css[end:]==(backup/'css/style.css').read_text(encoding='utf-8')
assert '.png' not in new[new.index('// P3-D local experiment:'):new.index('const motionEase = {')]
result={'backup_files_verified':len(hashes),'site_files_changed':changed,'unchanged_backup_files':unchanged,'html_unchanged':True,'original_motion_js_unchanged':True,'original_css_unchanged_except_h01_block':True,'png_not_in_h01_loader':True,'files':{p:sha(r/p) for p in ['index.html','css/style.css','js/script.js']}}
(a/'delivery-verification.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result))
