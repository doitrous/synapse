#!/usr/bin/env python3
"""Per-page text for any manifest source, native or OCR, cached on disk.

Copied from `scripts/kasr/extract/pagetext.py` at commit
cb8284729d36ba786bcd3c25cef4079e4f310f97, then changed for this corpus.

This takes manifest source IDs, decides native-vs-OCR from the manifest's own
`textLayer` (falling back to whether pdftotext actually returned anything), and
writes `pagetext/<sourceId>.json`.

    python3 scripts/helwan/extract/pagetext.py <sourceId> [<sourceId> ...]
    python3 scripts/helwan/extract/pagetext.py --module "GIT 301" [--tier-max 5]
    python3 scripts/helwan/extract/pagetext.py --reprobe        # audit what is already cached

A page that OCRs to nothing is written as an empty string and counted, because
a paper that extracted to nothing is not a paper without questions — the count
is what tells a later reader the difference.

Each cache file records `mode` and `modeReason`, so which files fell back to OCR
and why is auditable across lanes rather than re-derived by each of them.

The one change from the Kasr version that matters: this corpus is bilingual,
Arabic and English, and Kasr's readability guard measured "word-forming" with
`unicodedata.category` — anything that is not a control or symbol character
counts, which includes digits, combining marks and punctuation categories that
say nothing about whether a page holds actual words. That is loose enough to
wave through a page of stray diacritics or table-of-contents dot leaders as
"readable". Here `wordChars` is a ratio over exactly the two alphabets this
corpus is written in: ASCII letters and the Arabic block `؀`–`ۿ`
(U+0600–U+06FF, which covers the Arabic letters, tashkeel/diacritics, and
Arabic-Indic digits). A page of real Arabic or English prose scores high on
that; a page of broken-encoding bytes, bare numerals or table furniture does
not.
"""
import json
import os
import re
import subprocess
import sys
import tempfile
import unicodedata
from concurrent.futures import ThreadPoolExecutor

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
MANIFEST = os.path.join(REPO, "docs/Helwan-Source-Imports/manifest/helwan-y1-3-sources.json")
CACHE = os.path.join(HERE, "pagetext")


def sources():
    with open(MANIFEST, encoding="utf-8") as fh:
        return {s["sourceId"]: s for s in json.load(fh)["sources"]}


# A word-forming character: an ASCII letter or a character in the Arabic block
# (U+0600–U+06FF — Arabic letters, tashkeel, and Arabic-Indic digits). This is
# the alphabet this corpus is actually written in, unlike a general Unicode
# "is this a letter" test, which would also pass Cyrillic look-alikes, stray
# symbol-font glyphs, and other bytes that are not this corpus's language.
WORD_CHAR = re.compile(r"[A-Za-z؀-ۿ]")

# A word: three or more word-forming characters in a row, by the same
# definition. Counting these rather than counting characters is the whole
# point — see `readability`.
WORD = re.compile(r"[A-Za-z؀-ۿ]{3,}")


def readability(text):
    """How much of this looks like language, rather than merely like bytes.

    The first version of this guard (Kasr's) asked whether page 1 held at
    least twenty non-whitespace characters. That is a test of length, and a
    broken font encoding passes it comfortably: a pathology practical book in
    that corpus extracts 6,075 non-whitespace characters that are *every one*
    U+0001, so a page measures 144 characters and reads as healthy native
    text. Nothing downstream could tell that from a real page — `emptyPages`
    stays empty, because no page is empty — and a lane reading the shared
    cache concludes the book is 12 pages of unusable text and skips it. OCR of
    the same pages returns the captions; the content was there all along.

    So the question is a ratio, not a length, and it must be measured against
    the alphabets this corpus is actually written in — ASCII and Arabic — not
    "any Unicode letter", which a broken encoding can satisfy by accident.
    """
    stripped = [c for c in text if not c.isspace()]
    if not stripped:
        return {"chars": 0, "wordChars": 0.0, "control": 0.0, "words": 0}
    word_chars = sum(1 for c in stripped if WORD_CHAR.match(c))
    control = sum(1 for c in stripped if unicodedata.category(c) == "Cc")
    return {
        "chars": len(stripped),
        "wordChars": round(word_chars / len(stripped), 3),
        "control": round(control / len(stripped), 3),
        "words": len(WORD.findall(text)),
    }


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

    # The manifest's textLayer is a claim about the file, and the file wins.
    #
    # Probed on three pages rather than one, spread through the document: page 1
    # is often a cover or a scanned title page even where the body is native,
    # and judging a 167-page book on it gets the answer wrong in both
    # directions.
    mode = "native" if entry.get("textLayer") == "native" else "ocr"
    reason = "manifest textLayer=%s" % entry.get("textLayer")
    if mode == "native":
        probes = sorted({1, max(1, n // 2), max(1, n - 1)})
        best = max((readability(native_page(pdf, p)) for p in probes),
                   key=lambda r: (r["words"], r["wordChars"]))
        # Twelve words is deliberately low: a legitimately sparse page — a
        # section divider, a full-page plate — should not condemn the file.
        # What it catches is a page with no words at all, which is what a
        # broken encoding produces and what a length test cannot see.
        if best["words"] < 12 or best["wordChars"] < 0.5:
            mode, reason = "ocr", (
                "manifest said native, but the best of pages %s has %d words and "
                "%.0f%% word-forming characters (%.0f%% control) — not readable text"
                % (probes, best["words"], best["wordChars"] * 100, best["control"] * 100))
        else:
            reason = ("manifest textLayer=native, confirmed: %d words on the best of pages %s"
                      % (best["words"], probes))

    fn = native_page if mode == "native" else ocr_page
    with ThreadPoolExecutor(max_workers=1 if mode == "native" else workers) as pool:
        pages = list(pool.map(lambda p: fn(pdf, p), range(1, n + 1)))

    whole = readability("".join(pages))
    doc = {
        "sourceId": sid,
        "file": entry["corpusRelativePath"],
        "mode": mode,
        "modeReason": reason,
        "manifestTextLayer": entry.get("textLayer"),
        "readability": whole,
        "pages": pages,
        "emptyPages": [i + 1 for i, t in enumerate(pages) if not t.strip()],
        # A page holding characters but no words. Distinct from an empty page:
        # empty means nothing extracted, this means something did and it is not
        # language. Both are findings; conflating them hides the second one.
        "unreadablePages": [i + 1 for i, t in enumerate(pages)
                            if t.strip() and readability(t)["words"] < 3],
    }
    os.makedirs(CACHE, exist_ok=True)
    with open(out, "w", encoding="utf-8") as fh:
        json.dump(doc, fh, ensure_ascii=False)
    return doc


def reprobe():
    """Audit every cached file for the failure the length guard used to miss."""
    names = [n for n in sorted(os.listdir(CACHE)) if n.endswith(".json")]
    suspect = 0
    for name in names:
        doc = json.load(open(os.path.join(CACHE, name), encoding="utf-8"))
        r = doc.get("readability") or readability("".join(doc["pages"]))
        broken = r["words"] < 12 or r["control"] > 0.2
        suspect += broken
        print("%-8s %-6s words=%-7d word-chars=%-6s control=%-6s %s%s"
              % ("SUSPECT" if broken else "ok", doc["mode"], r["words"], r["wordChars"],
                 r["control"], doc["file"],
                 "  <-- re-extract with --force" if broken else ""), flush=True)
    print("\n%d suspect of %d cached." % (suspect, len(names)))
    return suspect


def main(argv):
    if "--reprobe" in argv:
        sys.exit(1 if reprobe() else 0)
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
        print("%-6s %s %3dp %2d empty %2d unreadable  %s\n         %s"
              % (doc["mode"], doc["sourceId"], len(doc["pages"]), len(doc["emptyPages"]),
                 len(doc.get("unreadablePages", [])), entry["corpusRelativePath"],
                 doc.get("modeReason", "")), flush=True)


if __name__ == "__main__":
    main(sys.argv[1:])
