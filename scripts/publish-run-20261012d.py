import json, datetime, os, sys, base64

sys.path.insert(0, os.path.join(os.path.expanduser('~/workspace/newsveria'), 'scripts'))
NOW = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
PROJECT = os.path.expanduser('~/workspace/newsveria')

import importlib.util
def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m

b = load('b', os.path.join(PROJECT, 'scripts', 'publish-run-20261012b.py'))
c = load('c', os.path.join(PROJECT, 'scripts', 'publish-run-20261012c.py'))
articles = b.articles + c.articles
assert len(articles) == 6, len(articles)

# dedupe check on slugs
ap = os.path.join(PROJECT, 'content', 'articles.json')
arr = json.load(open(ap))
existing_ids = {a['id'] for a in arr}
existing_slugs = {a['slug'] for a in arr}
new = []
for a in articles:
    assert a['id'] not in existing_ids, 'dup id ' + a['id']
    assert a['slug'] not in existing_slugs, 'dup slug ' + a['slug']
    img = os.path.join(PROJECT, 'public', 'images', a['image']['src'].split('/')[-1])
    assert os.path.exists(img), 'missing image ' + img
    new.append(a)
arr.extend(new)
json.dump(arr, open(ap, 'w'), ensure_ascii=False, indent=1)
print(f'appended {len(new)} articles; total {len(arr)}')

# image -> b64 parts
for a in new:
    imgfile = a['image']['src'].split('/')[-1]
    src = os.path.join(PROJECT, 'public', 'images', imgfile)
    with open(src, 'rb') as f:
        b64 = base64.b64encode(f.read()).decode('ascii')
    parts = [b64[i:i+90000] for i in range(0, len(b64), 90000)]
    for j, chunk in enumerate(parts, 1):
        dest = os.path.join(PROJECT, 'assets', f'{imgfile}.b64.part-{j:02d}')
        open(dest, 'w').write(chunk)
    print(f'{imgfile}: {len(parts)} parts')

# pipeline.json statuses
pp = os.path.join(PROJECT, 'data', 'pipeline.json')
p = json.load(open(pp))
cands = {x['id']: x for x in p['candidates']}
status_map = {
    'cand-cc8c36ed1f1d': ('PUBLISHED', 'Verified; published as art-0042 (Brewers 2, Dodgers 1 NLCS G1)'),
    'cand-0ba5064af28b': ('PUBLISHED', 'Verified; published as art-0043 (Ravens 30, Falcons 23 OT) — merged with cand-1870f3b271ac, same game'),
    'cand-1870f3b271ac': ('PUBLISHED', 'Verified; merged into art-0043 (same Ravens-Falcons game as cand-0ba5064af28b)'),
    'cand-8698804b1da0': ('PUBLISHED', 'Verified; published as art-0044 (Trump energy-ceasefire claim, oil falls; strict claim framing)'),
    'cand-85b9a835d737': ('PUBLISHED', 'Verified; published as art-0045 (7-country Saudi travel warnings)'),
    'cand-c689170425a4': ('PUBLISHED', 'Verified; published as art-0046 (China sanctions Paraguay/Belize ministers)'),
    'cand-d3e94ad7b072': ('PUBLISHED', 'Verified; published as art-0047 (Hurricane Simon Cat 3)'),
}
for cid, (st, reason) in status_map.items():
    cands[cid]['status'] = st
    cands[cid]['decision'] = reason
    cands[cid]['reviewedAt'] = NOW
p['meta']['lastPublishedAt'] = NOW
json.dump(p, open(pp, 'w'), ensure_ascii=False, indent=1)
print('pipeline.json updated; lastPublishedAt =', NOW)
