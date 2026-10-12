#!/usr/bin/env python3
"""Re-split data/pipeline.json and content/articles.json into push-sized parts.

pipeline.json -> data/pipeline.json.part-01..0N (minified, <=90k bytes each)
articles.json -> content/articles.json.part-01..0N (minified, <=90k bytes each)
Removes stale part files first. Run AFTER all local updates, BEFORE pushing.
"""
import json, os, glob

PROJECT = os.path.expanduser('~/workspace/newsveria')
MAX = 90_000

def split(src_rel, part_prefix):
    src = os.path.join(PROJECT, src_rel)
    with open(src) as f:
        obj = json.load(f)
    mini = json.dumps(obj, ensure_ascii=False, separators=(',', ':'))
    data = mini.encode('utf-8')
    n = max(1, (len(data) + MAX - 1) // MAX)
    chunk = (len(data) + n - 1) // n
    # remove stale parts
    for old in glob.glob(os.path.join(PROJECT, part_prefix + '*')):
        os.remove(old)
    paths = []
    for i in range(n):
        piece = data[i * chunk:(i + 1) * chunk].decode('utf-8')
        dest = os.path.join(PROJECT, f'{part_prefix}{i + 1:02d}')
        with open(dest, 'w') as f:
            f.write(piece)
        paths.append(dest)
    # sanity: join == mini
    joined = ''.join(open(p).read() for p in paths)
    assert joined == mini, 'part join mismatch!'
    print(f'{src_rel}: {len(data)} bytes -> {n} part(s); join verified OK')
    return paths

if __name__ == '__main__':
    split('data/pipeline.json', 'data/pipeline.json.part-')
    split('content/articles.json', 'content/articles.json.part-')
