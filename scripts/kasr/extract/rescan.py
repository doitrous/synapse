#!/usr/bin/env python3
"""Second OCR pass: finish the page-capped books and retry the two poor scans.

Rewrites pagetext/<sourceId>.json in place; re-run mcq.py afterwards to reparse.
"""
import json, os, re, subprocess, tempfile
from concurrent.futures import ThreadPoolExecutor

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
MANIFEST = os.path.join(REPO, "docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json")
CACHE = os.path.join(HERE, "pagetext")

# file -> (dpi, [psm modes to try], page limit or None for all)
JOBS = {
    "Anatomy MCQ Book [2025] [first priority].pdf": (120, ["6"], None),
    "Upper MCQ Dr.jalal (1).pdf":                   (120, ["6"], None),
    "Basis MCQ by Dr.Jalal (1).pdf":                (300, ["6", "4"], None),
    "Dpt Book MCQ histo 101 .NEW (1).pdf":          (300, ["6", "4"], None),
}

OPT_LINE = re.compile(r"^\s*[\(\[]?\s*\*?\s*([a-eA-E])\s*[\)\].:\-–]\s+", re.M)
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


def main():
    with open(MANIFEST, encoding="utf-8") as fh:
        data = json.load(fh)
    by_name = {s["fileName"]: s for s in data["sources"]
               if s.get("moduleId") == "101 ISK" and s.get("sourceCategory") == "Instructor material"}

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
    main()
