#!/usr/bin/env python3
"""Second OCR pass: retry specific poorly-scanned pages at a different dpi/psm.

Copied from `scripts/kasr/extract/rescan.py` as a shape, emptied of Kasr's
`JOBS` dict — those four entries name specific Kasr instructor PDFs by exact
filename and mean nothing for this corpus. Fill `JOBS` in per file, once a
first `pagetext.py` pass has identified a source worth a second, slower OCR
attempt (see `pagetext.py --reprobe`).

Rewrites pagetext/<sourceId>.json in place; re-run the module's own extractor
afterwards to reparse.

    python3 scripts/asu/extract/rescan.py --module "ASU-CVS"
"""
import json
import os
import re
import subprocess
import sys
import tempfile
from concurrent.futures import ThreadPoolExecutor

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import asu_module  # noqa: E402

CACHE = os.path.join(HERE, "pagetext")

# file -> (dpi, [psm modes to try], page limit or None for all)
# >>> FILL IN PER FILE, once pagetext.py --reprobe has flagged a source <<<
JOBS: dict[str, tuple[int, list[str], int | None]] = {}

OPT_LINE = re.compile(r"^\s*[\(\[]?\*?\s*([a-eA-E])\s*[\)\].:\-–]\s+", re.M)
OPT_ANY = re.compile(r"(?:(?<=\s)|^)[\(\[]?\*?([a-eA-E])[\)\].:]\s+")


def log(m):
    print(m, flush=True)


def ocr(path, page, dpi, psm):
    with tempfile.TemporaryDirectory() as td:
        stub = os.path.join(td, "p")
        try:
            r = subprocess.run(["pdftoppm", "-f", str(page), "-l", str(page), "-r", str(dpi),
                                "-png", "-singlefile", path, stub],
                               capture_output=True, timeout=300)
            png = stub + ".png"
            if r.returncode != 0 or not os.path.exists(png):
                return ""
            r = subprocess.run(["tesseract", png, "stdout", "-l", "eng+ara", "--psm", psm],
                               capture_output=True, timeout=420)
            return r.stdout.decode("utf-8", "replace")
        except subprocess.TimeoutExpired:
            return ""
        except Exception:
            return ""


def score(text):
    """Prefer the variant that recovers more complete option sets."""
    if not text:
        return -1
    opts = len(OPT_LINE.findall(text)) + len(OPT_ANY.findall(text))
    words = len(re.findall(r"[A-Za-z]{3,}", text))
    return opts * 8 + words


def do_page(path, page, dpi, psms):
    best, best_s, best_psm = "", -1, None
    for psm in psms:
        t = ocr(path, page, dpi, psm)
        s = score(t)
        if s > best_s:
            best, best_s, best_psm = t, s, psm
    return page, best, best_psm


def main(argv):
    module, _ = asu_module.parse_module(argv)
    if not JOBS:
        log("JOBS is empty — nothing to rescan. Fill it in per file; see the module docstring.")
        return
    by_name = {s["fileName"]: s for s in asu_module.module_sources(module)}

    for name, (dpi, psms, limit) in JOBS.items():
        entry = by_name[name]
        path, sid = entry["absolutePath"], entry["sourceId"]
        n = limit or entry.get("pageCount") or 0
        cpath = os.path.join(CACHE, sid + ".json")
        if os.path.exists(cpath) and not os.path.exists(cpath + ".bak"):
            os.replace(cpath, cpath + ".bak")
        log(f"START {name} pages={n} dpi={dpi} psm={psms}")

        pages = [""] * n
        chosen = {}
        with ThreadPoolExecutor(max_workers=4) as ex:
            for page, text, psm in ex.map(lambda p: do_page(path, p, dpi, psms), range(1, n + 1)):
                pages[page - 1] = text
                chosen[psm] = chosen.get(psm, 0) + 1

        with open(cpath, "w", encoding="utf-8") as fh:
            json.dump({"pages": pages, "method": "ocr", "pagesRead": n,
                       "capped": False, "pagesRemaining": None, "error": None,
                       "ocrDpi": dpi, "ocrPsmTried": psms, "ocrPsmChosen": chosen}, fh,
                      ensure_ascii=False)
        chars = sum(len(p) for p in pages)
        log(f"DONE  {name} pages={n} chars={chars} psmChosen={chosen}")
    log("RESCAN COMPLETE")


if __name__ == "__main__":
    main(sys.argv[1:])
