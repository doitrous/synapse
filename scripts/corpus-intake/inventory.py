#!/usr/bin/env python3
"""Walk one year of the Kasr Alainy corpus and record what every file physically is.

Read-only. Produces `inventory.json` (y1) / `inventory-y<N>.json` (other
years): one row per file with identity (sha256), shape (pages), and whether a
text layer exists at all — which decides whether classification can read the
document or has to OCR it.

    python3 scripts/corpus-intake/inventory.py            # y1, unchanged
    python3 scripts/corpus-intake/inventory.py --year y2

`--year` defaults to `y1` and, for y1, walks exactly the two folders the
committed manifest was built from (`y1/` and the sibling `Marks/`) — not
every folder now sitting under ROOT, which today also holds `y2/`..`y5/`.
That scoping is the one change y1's own walk needed to keep meaning what it
meant: this file used to `os.walk(ROOT)` when `y1/` (plus `Marks/`) were the
only things under ROOT, and sweeping in siblings that did not exist yet would
silently start indexing another year's files as this year's. See
year_config.py's `Y1["walkRoots"]`.
"""
import argparse
import hashlib
import json
import os
import re
import subprocess
import sys
import unicodedata

from year_config import ROOT, year_cfg

HERE = os.path.dirname(os.path.abspath(__file__))


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def pdf_pages(path):
    try:
        out = subprocess.run(["pdfinfo", path], capture_output=True, text=True, timeout=60)
        for line in out.stdout.splitlines():
            if line.startswith("Pages:"):
                return int(line.split(":", 1)[1].strip())
    except Exception:
        pass
    return None


# A character "forms a word" if it is a letter or digit in any script —
# Arabic included. A PDF whose declared text layer is page after page of a
# single control glyph (U+0001 has been seen in this corpus) has a nonzero
# character count and zero word-forming ones; counting characters alone
# reads that as a usable text layer, and it is not one.
def _word_forming_ratio(text):
    stripped = "".join(ch for ch in text if not ch.isspace())
    if not stripped:
        return 0.0
    forming = sum(1 for ch in stripped if unicodedata.category(ch)[0] in ("L", "N"))
    return forming / len(stripped)


def text_probe(path, pages=4):
    """Characters of extractable text in the first few pages, and how many of
    them are letters/digits rather than control glyphs or other junk.

    Near-zero length, or a near-zero word-forming ratio despite a nonzero
    length, both mean the PDF is effectively page images: classification
    must OCR it rather than conclude the document is empty or readable.
    """
    try:
        out = subprocess.run(
            ["pdftotext", "-f", "1", "-l", str(pages), "-q", path, "-"],
            capture_output=True, text=True, timeout=120,
        )
        txt = out.stdout
        stripped = txt.strip()
        return len(stripped), _word_forming_ratio(txt), txt[:4000]
    except Exception:
        return 0, 0.0, ""


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--year", default="y1", help="y1 (default) | y2 | y3 | y4 | y5")
    ap.add_argument("--university", default="kau", help="kau (default)")
    args = ap.parse_args()
    cfg = year_cfg(args.year, args.university)

    rows = []
    walk_dirs = [os.path.join(ROOT, w) for w in cfg["walkRoots"]]
    for walk_dir in walk_dirs:
        if not os.path.isdir(walk_dir):
            print(f"  (skipping {walk_dir} — not a directory)", file=sys.stderr)
            continue
        for dirpath, dirnames, filenames in os.walk(walk_dir):
            dirnames.sort()
            for name in sorted(filenames):
                full = os.path.join(dirpath, name)
                rel = os.path.relpath(full, cfg["corpusRoot"])
                ext = os.path.splitext(name)[1].lower()
                try:
                    size = os.path.getsize(full)
                except OSError:
                    continue
                row = {
                    "rel": rel,
                    "dir": os.path.dirname(rel),
                    "name": name,
                    "ext": ext,
                    "size": size,
                    "sha256": sha256(full),
                    "pages": None,
                    "text_chars": None,
                    "text_wordforming_ratio": None,
                    "head": "",
                }
                if ext == ".pdf":
                    row["pages"] = pdf_pages(full)
                    chars, ratio, head = text_probe(full)
                    row["text_chars"] = chars
                    row["text_wordforming_ratio"] = round(ratio, 3)
                    row["head"] = head
                rows.append(row)
                print(f"  {rel}", file=sys.stderr)

    out = os.path.join(HERE, cfg["inventoryName"])
    with open(out, "w") as fh:
        json.dump({"root": cfg["corpusRoot"], "yearId": cfg["yearId"], "count": len(rows), "files": rows}, fh, indent=1)
    print(f"\n{len(rows)} files -> {out}")


if __name__ == "__main__":
    main()
