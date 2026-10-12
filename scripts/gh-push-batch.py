#!/usr/bin/env python3
"""Push the staged NewsVeria stories (art-0024..0035) to GitHub via push_files.

Follows the durable pipeline rule: EXACTLY ONE file per push_files call,
sequentially, in this order:
  (a) image base64 parts (assets/*.b64.part-*), small parts may be skipped
      only if already on remote — the resume logic checks list_commits;
  (b) script + pipeline data files;
  (c) content/articles.json.part-01..N (articles.json travels as parts since
      2026-10-11; the build joins them via scripts/restore-binaries.mjs);
  (d) DELETE the stale whole content/articles.json from the repo (23-article
      version) so future agents never misread it.

Stops on the first failure (approval card / wedge) so the next run can
resume with the same script — already-pushed files are skipped via
list_commits. Never claim "live" without an HTTP 200 check on Vercel.
"""
import json, subprocess, os, sys

PROJECT = os.path.expanduser('~/workspace/newsveria')
OWNER, REPO, BRANCH = 'trymini98-design', 'newsveria', 'main'
BASE = 'ef0b8d3'  # remote HEAD when art-0001..0023 went live (2026-10-11 morning)


def call(name, args):
    r = subprocess.run(['github', 'call-tool', '--name', name,
                        '--arguments-json', json.dumps(args, ensure_ascii=False)],
                       capture_output=True, text=True, timeout=240, cwd=PROJECT)
    return r.returncode == 0, (r.stderr or r.stdout)[-300:]


def remote_has(path):
    ok, out = call('get_file_contents', {'owner': OWNER, 'repo': REPO,
                                         'branch': BRANCH, 'path': path})
    return ok


def ordered_files():
    r = subprocess.run(['git', 'diff', f'{BASE}..HEAD', '--name-only'],
                       capture_output=True, text=True, cwd=PROJECT)
    names = [n for n in r.stdout.split() if not n.endswith('.webp')]
    img = sorted(n for n in names if '.b64.part-' in n)
    scripts = [n for n in names if n.startswith('scripts/') and n != 'scripts/gh-push-batch.py']
    pipe = sorted(n for n in names if n.startswith('data/pipeline.json.part'))
    rest = [n for n in names if n == 'data/pipeline-RESTORE.txt']
    arts = sorted(n for n in names if n.startswith('content/articles.json.part'))
    return img + scripts + pipe + rest + arts


def push_one(path):
    with open(os.path.join(PROJECT, path)) as f:
        content = f.read()
    args = {'owner': OWNER, 'repo': REPO, 'branch': BRANCH,
            'files': [{'path': path, 'content': content}],
            'message': f'NewsVeria: publish staged file {path} (art-0024..0047 batch)'}
    if len(json.dumps(args, ensure_ascii=False).encode()) > 128_000:
        return False, 'payload exceeds argv limit'
    return call('push_files', args)


def main():
    files = ordered_files()
    total, pushed, skipped = len(files), 0, 0
    for i, path in enumerate(files, 1):
        if remote_has(path):
            skipped += 1
            print(f'[{i}/{total}] SKIP (already on remote): {path}', flush=True)
            continue
        ok, err = push_one(path)
        print(f'[{i}/{total}] {"OK" if ok else "FAIL"}: {path}', flush=True)
        if not ok:
            print('ERROR:', err, flush=True)
            print(f'STOPPED. pushed={pushed} skipped={skipped}. Resume with this script.', flush=True)
            return 1
        pushed += 1
    # Last: remove the stale whole articles.json (23-article version) so the
    # repo never carries a misleading copy alongside the parts.
    if remote_has('content/articles.json'):
        ok, err = call('delete_file', {'owner': OWNER, 'repo': REPO, 'branch': BRANCH,
                                       'path': 'content/articles.json',
                                       'message': 'articles.json now travels as .part-* (see restore-binaries.mjs)'})
        print('delete whole articles.json:', 'OK' if ok else f'FAIL {err}', flush=True)
        if not ok:
            return 1
    print(f'DONE. pushed={pushed} skipped={skipped} of {total}.', flush=True)
    return 0


if __name__ == '__main__':
    sys.exit(main())
