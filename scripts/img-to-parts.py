#!/usr/bin/env python3
"""Convert public/images/<name>.webp into assets/<name>.webp.b64.part-NN (90k chars each)."""
import base64, os, sys

PROJECT = os.path.expanduser('~/workspace/newsveria')
CHUNK = 90_000

def main():
    made = []
    for img in sys.argv[1:]:
        src = os.path.join(PROJECT, 'public', 'images', img) if not os.path.isabs(img) else img
        name = os.path.basename(src)
        with open(src, 'rb') as f:
            b64 = base64.b64encode(f.read()).decode('ascii')
        parts = [b64[i:i + CHUNK] for i in range(0, len(b64), CHUNK)] or ['']
        for j, chunk in enumerate(parts, 1):
            dest = os.path.join(PROJECT, 'assets', f'{name}.b64.part-{j:02d}')
            with open(dest, 'w') as f:
                f.write(chunk)
            made.append(dest)
        print(f'{name}: {len(parts)} part(s), {len(b64)} b64 chars')
    print('MADE:', made)

if __name__ == '__main__':
    main()
