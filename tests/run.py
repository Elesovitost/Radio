#!/usr/bin/env python3
"""
Golden master runner (headless Chrome + fixtures).

Spouští tests/golden.html, který v prohlížeči sestaví stavy z tests/fixtures.js,
nechá aplikaci vykreslit findings/impression a výsledek (spolu s raw bloky
z region.compile()) vrátí jako base64 v DOM.

Použití (z kořene repozitáře):
    python tests/run.py                     porovná aktuální výstup se snapshotem
    python tests/run.py --update            zapíše/aktualizuje snapshot
    python tests/run.py --list              přehled fixture (délky, prázdné regiony)
    python tests/run.py --show ID [ID...]   vypíše findings + impression
    python tests/run.py --raw ID            vypíše raw bloky z compile()
    python tests/run.py --mode ids --out F  inventura všech ID tlačítek do F
    python tests/run.py --mode validate      kontrola jednoslovných vět (Corrections.validate)
    python tests/run.py --keep              uloží vygenerovaný DOM do tests/.last-dom.html

Návratový kód je 1 při regresi (diff) nebo chybě ve fixture.
"""

import base64
import difflib
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TESTS = os.path.join(ROOT, "tests")
SNAP_DIR = os.path.join(TESTS, "snapshot")
MARK = re.compile(r"GOLDEN_BEGIN(.*?)GOLDEN_END", re.S)

# Konzole na Windows jinak používá cp1250 a český výstup se rozsype.
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

CHROME_CANDIDATES = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"),
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
]


def find_browser():
    for path in CHROME_CANDIDATES:
        if path and os.path.isfile(path):
            return path
    from shutil import which
    for name in ("chrome", "google-chrome", "chromium", "msedge"):
        found = which(name)
        if found:
            return found
    sys.exit("CHYBA: nenašel jsem Chrome/Edge. Doplň cestu do CHROME_CANDIDATES.")


def run_page(browser, url, keep):
    cmd = [
        browser,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--allow-file-access-from-files",
        "--virtual-time-budget=20000",
        "--dump-dom",
        url,
    ]
    proc = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    dom = proc.stdout or ""
    if keep:
        with open(os.path.join(TESTS, ".last-dom.html"), "w", encoding="utf-8") as fh:
            fh.write(dom)

    match = MARK.search(dom)
    if not match:
        sys.exit(
            "CHYBA: stránka nevyprodukovala snapshot.\n"
            f"stderr:\n{(proc.stderr or '')[:4000]}\n"
            f"stdout (prvních 2000 znaků):\n{dom[:2000]}"
        )
    return json.loads(base64.b64decode(match.group(1).strip()).decode("utf-8"))


def fixture_summary(fid, fx):
    blocks = fx.get("blocks", {})
    empty = [r for r, b in blocks.items() if not (b["report"] or b["main"] or b["incidental"])]
    line = (
        f"{fid:<34} findings={len(fx['findings']):>5}  impression={len(fx['impression']):>5}"
        f"  regiony={','.join(blocks)}"
    )
    return line + (f"  PRAZDNE={','.join(empty)}" if empty else "")


def report_issues(data):
    problems = data.get("problems") or []
    issues = data.get("issues") or []
    errors = data.get("errors") or []
    if problems:
        print(f"\nVAROVÁNÍ - {len(problems)} neznámých ID/stavů:")
        for p in problems[:60]:
            print("  " + p)
    if issues:
        print(f"\nK OPRÁVĚNÍ - {len(issues)} nálezů v textu:")
        for i in issues[:80]:
            print("  " + i)
        if len(issues) > 80:
            print(f"  ... a dalších {len(issues) - 80}")
    if errors:
        print(f"\nCHYBY ve fixtures ({len(errors)}):")
        for e in errors:
            print(f"  {e['id']}: {e['error'].splitlines()[0]}")
    return 1 if errors else 0


def char_diff(label, old, new, out):
    """Vypíše první rozdíl dvou dlouhých textů (řádkové i znakové vodítko)."""
    if old == new:
        return 0
    i = next((k for k, (a, b) in enumerate(zip(old, new)) if a != b), min(len(old), len(new)))
    line_no = old[:i].count("\n") + 1
    out.append(f"{label}: řádek {line_no}, znak {i} (délka {len(old)} -> {len(new)})")
    out.append("   snapshot: ..." + old[max(0, i - 70):i + 70].replace("\n", "⏎") + "...")
    out.append("   aktuální: ..." + new[max(0, i - 70):i + 70].replace("\n", "⏎") + "...")
    return 1


def list_diff(name, old_list, new_list, out):
    """U seznamu (problems/issues/errors) vypíše jen přidané a odebrané položky."""
    old_set, new_set = set(old_list or []), set(new_list or [])
    if old_set == new_set:
        return 0
    out.append(f"[{name}] +{len(new_set - old_set)} / -{len(old_set - new_set)}")
    for item in sorted(new_set - old_set):
        out.append("   + " + item)
    for item in sorted(old_set - new_set):
        out.append("   - " + item)
    return 1


def compare_json(old, new, out):
    """Obecné porovnání strukturovaných snapshotů (režimy bez fixtures)."""
    ab = json.dumps(old, ensure_ascii=False, indent=1, sort_keys=True)
    bb = json.dumps(new, ensure_ascii=False, indent=1, sort_keys=True)
    if ab == bb:
        return 0
    diff = list(difflib.unified_diff(
        ab.splitlines(), bb.splitlines(),
        fromfile="snapshot", tofile="aktuální", lineterm=""))
    out.extend(diff[:200])
    if len(diff) > 200:
        out.append(f"... a dalších {len(diff) - 200} řádků")
    return 1


def compare(old, new):
    """Porovná dva snapshoty; vrátí (počet rozdílů, výpis)."""
    out = []
    count = 0

    if old.get("fixtureCount") != new.get("fixtureCount"):
        count += 1
        out.append(f"[fixtureCount] {old.get('fixtureCount')} -> {new.get('fixtureCount')}")
    count += list_diff("problems", old.get("problems"), new.get("problems"), out)
    count += list_diff("issues", old.get("issues"), new.get("issues"), out)
    count += list_diff(
        "errors",
        [e.get("id") for e in old.get("errors") or []],
        [e.get("id") for e in new.get("errors") or []],
        out,
    )

    old_fx = old.get("fixtures", {})
    new_fx = new.get("fixtures", {})
    for fid in sorted(set(old_fx) | set(new_fx)):
        if fid not in old_fx:
            count += 1
            out.append(f"[{fid}] nová fixture")
            continue
        if fid not in new_fx:
            count += 1
            out.append(f"[{fid}] fixture zmizela")
            continue
        a, b = old_fx[fid], new_fx[fid]
        for key in sorted(set(a) | set(b)):
            if key == "blocks":
                for region in sorted(set(a.get(key, {})) | set(b.get(key, {}))):
                    ab = json.dumps(a.get(key, {}).get(region), ensure_ascii=False, indent=1, sort_keys=True)
                    bb = json.dumps(b.get(key, {}).get(region), ensure_ascii=False, indent=1, sort_keys=True)
                    if ab != bb:
                        count += 1
                        out.append(f"[{fid}] bloky {region}:")
                        out.extend("   " + l for l in list(difflib.unified_diff(
                            ab.splitlines(), bb.splitlines(),
                            fromfile="snapshot", tofile="aktuální", lineterm=""))[:30])
                continue

            old_val, new_val = a.get(key), b.get(key)
            if isinstance(old_val, str) and isinstance(new_val, str):
                count += char_diff(f"[{fid}] {key}", old_val, new_val, out)
            elif old_val != new_val:
                count += 1
                out.append(f"[{fid}] {key}: "
                           + json.dumps(old_val, ensure_ascii=False)
                           + " -> " + json.dumps(new_val, ensure_ascii=False))
    return count, out


def main():
    args = sys.argv[1:]

    def value_of(flag, default=None):
        return args[args.index(flag) + 1] if flag in args else default

    def values_of(flag):
        return [args[i + 1] for i, a in enumerate(args) if a == flag and i + 1 < len(args)]

    if "--help" in args or "-h" in args:
        print(__doc__)
        return 0

    mode = value_of("--mode", "golden")
    keep = "--keep" in args
    show = values_of("--show")
    raw = value_of("--raw")

    url = "file:///" + os.path.join(TESTS, "golden.html").replace("\\", "/").lstrip("/")
    if mode != "golden":
        url += f"?mode={mode}"

    data = run_page(find_browser(), url, keep)
    pretty = json.dumps(data, ensure_ascii=False, indent=2, sort_keys=True)

    if mode == "ids":
        out = value_of("--out")
        if out:
            with open(out, "w", encoding="utf-8") as fh:
                fh.write(pretty)
            print(f"ID dump zapsán: {out}")
            return 0

    if "--emit-json" in args:
        print(pretty)
        return 0

    if "fatal" in data:
        print("FATAL: " + data["fatal"])
        return 1

    fixtures = data.get("fixtures")

    if fixtures and "--list" in args:
        print(f"fixtures: {data['fixtureCount']}\n")
        for fid in sorted(fixtures):
            print(fixture_summary(fid, fixtures[fid]))
        return report_issues(data)

    if fixtures and (show or raw):
        for fid in show:
            fx = fixtures[fid]
            print("#" * 70)
            print("#", fid)
            print("--- FINDINGS ---")
            print(fx["findings"])
            print("--- IMPRESSION ---")
            print(fx["impression"])
            print("--- REPORT (výstup 3) ---")
            print(fx.get("report", ""))
        if raw:
            print(json.dumps(fixtures[raw]["blocks"], ensure_ascii=False, indent=2))
        return report_issues(data)

    snap_path = os.path.join(SNAP_DIR, f"{mode}.json")
    old = None
    if os.path.isfile(snap_path):
        with open(snap_path, "r", encoding="utf-8") as fh:
            old = fh.read()

    os.makedirs(SNAP_DIR, exist_ok=True)
    regressed = False
    if "--update" in args or old is None:
        with open(snap_path, "w", encoding="utf-8") as fh:
            fh.write(pretty)
        print(f"Snapshot zapsán: {os.path.relpath(snap_path, ROOT)}")
    else:
        old_data = json.loads(old)
        if "fixtures" in data:
            count, out = compare(old_data, data)
        else:
            out = []
            count = compare_json(old_data, data, out)

        if count:
            regressed = True
            label = f"z {data['fixtureCount']} fixture" if "fixtureCount" in data else f"režim {mode}"
            print(f"ODLIŠNÉ - {count} rozdílů ({label}):\n")
            for line in out[:300]:
                print(line)
            if len(out) > 300:
                print(f"... a dalších {len(out) - 300} řádků")
        else:
            print(f"OK - snapshot beze změny ({os.path.relpath(snap_path, ROOT)})")

    return report_issues(data) or (1 if regressed else 0)


if __name__ == "__main__":
    sys.exit(main())
