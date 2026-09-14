"""Orientační hledání nevyužitých top-level deklarací (jednorázová pomůcka)."""
import collections
import pathlib
import re
import sys

# Konzole na Windows jinak používá cp1250 a český výstup se rozsype.
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

root = pathlib.Path(__file__).resolve().parent.parent
files = sorted(list(root.glob('*.js')) + list(root.glob('js/*.js')))
if (root / 'index.html').exists():
    files.append(root / 'index.html')

word = re.compile(r'[A-Za-z_$][\w$]*')
decl = re.compile(r'^\s*(?:function\s+([A-Za-z_$][\w$]*)|(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=)', re.M)

declared = collections.defaultdict(list)
uses = collections.Counter()
for p in files:
    t = p.read_text(encoding='utf-8', errors='ignore')
    uses.update(word.findall(t))
    for m in decl.finditer(t):
        declared[m.group(1) or m.group(2)].append(p.name)

dead = [(n, w[0], uses[n]) for n, w in declared.items() if len(w) == 1 and uses[n] <= 1]
for name, where, total in sorted(dead):
    print(f'{name:40} {where:24} (výskytů: {total})')
print('celkem podezřelých:', len(dead))
