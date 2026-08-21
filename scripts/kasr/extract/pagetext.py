#!/usr/bin/env python3
"""Per-page text for any manifest source, native or OCR, cached on disk.

The 101 pass grew a text extractor per file kind. This is the one the rest of
the corpus uses: it takes manifest source IDs, decides native-vs-OCR from the
manifest's own `textLayer` (falling back to whether pdftotext actually returned
anything), and writes `pagetext/<sourceId>.json`.

    python3 scripts/kasr/extract/pagetext.py <sourceId> [<sourceId> ...]
    python3 scripts/kasr/extract/pagetext.py --module "102 INT" [--tier-max 5]

A page that OCRs to nothing is written as an empty string and counted, because
a paper that extracted to nothing is not a paper without questions — the count
is what tells a later reader the difference.
"""
import json
import os
import subprocess
import sys
import tempfile
from concurrent.futures import ThreadPoolExecutor

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
MANIFEST = os.path.join(REPO, "docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json")
CACHE = os.path.join(HERE, "pagetext")


def sources():
    with open(MANIFEST, encoding="utf-8") as fh:
        return {s["sourceId"]: s for s in json.load(fh)["sources"]}


def native_page(pdf, page):
    r = subprocess.run(["pdftotext", "-layout", "-f", str(page), "-l", str(page), pdf, "-"],
                       capture_output=True, timeout=180)
    return r.stdout.decode("utf-8", "replace")


def ocr_page(pdf, page, dpi=200, psm="6"):
    with tempfile.TemporaryDirectory() as td:
        stub = os.path.join(td, "p")
        try:
            r = subprocess.run(["pdftoppm", "-f", str(page), "-l", str(page), "-r", str(dpi),
                                "-png", "-singlefile", pdf, stub],
                               capture_output=True, timeout=300)
            png = stub + ".png"
            if r.returncode != 0 or not os.path.exists(png):
                return ""
            r = subprocess.run(["tesseract", png, "stdout", "-l", "eng+ara", "--psm", psm],
                               capture_output=True, timeout=420)
            return r.stdout.decode("utf-8", "replace")
        except subprocess.TimeoutExpired:
            return ""


def extract(entry, force=False, workers=6):
    sid, pdf = entry["sourceId"], entry["absolutePath"]
    out = os.path.join(CACHE, sid + ".json")
    if os.path.exists(out) and not force:
        return json.load(open(out, encoding="utf-8"))
    n = entry.get("pageCount") or 0
    if not n or not os.path.exists(pdf):
        return None

    # The manifest's textLayer is a claim about the file; a first page that
    # comes back empty is the file disagreeing, and the file wins.
    mode = "native" if entry.get("textLayer") == "native" else "ocr"
    if mode == "native" and len(native_page(pdf, 1).strip()) < 20:
        mode = "ocr"

    fn = native_page if mode == "native" else ocr_page
    with ThreadPoolExecutor(max_workers=1 if mode == "native" else workers) as pool:
        pages = list(pool.map(lambda p: fn(pdf, p), range(1, n + 1)))

    doc = {
        "sourceId": sid,
        "file": entry["corpusRelativePath"],
        "mode": mode,
        "pages": pages,
        "emptyPages": [i + 1 for i, t in enumerate(pages) if not t.strip()],
    }
    os.makedirs(CACHE, exist_ok=True)
    with open(out, "w", encoding="utf-8") as fh:
        json.dump(doc, fh, ensure_ascii=False)
    return doc


def main(argv):
    by_id = sources()
    force = "--force" in argv
    argv = [a for a in argv if a != "--force"]
    if argv and argv[0] == "--module":
        module = argv[1]
        tier_max = int(argv[argv.index("--tier-max") + 1]) if "--tier-max" in argv else 9
        wanted = [s for s in by_id.values()
                  if (s.get("moduleId") == module or s.get("secondaryModule") == module)
                  and not s.get("exclusionReason")
                  and (s.get("sourceTier") or 9) <= tier_max
                  and s.get("fileType") == "pdf"]
        # Smallest first: a fast pass over the short papers tells you the
        # extractor is working before a 200-page book has finished.
        wanted.sort(key=lambda s: s.get("pageCount") or 0)
    else:
        wanted = [by_id[a] for a in argv]

    for entry in wanted:
        doc = extract(entry, force=force)
        if doc is None:
            print("SKIP  %s (no pages or missing file) %s" % (entry["sourceId"], entry["fileName"]),
                  flush=True)
            continue
        print("%-6s %s %3dp %2d empty  %s"
              % (doc["mode"], doc["sourceId"], len(doc["pages"]), len(doc["emptyPages"]),
                 entry["corpusRelativePath"]), flush=True)


if __name__ == "__main__":
    main(sys.argv[1:])
