#!/usr/bin/env python3
# Copied from scripts/corpus-intake/inventory.py @ 5d26054 (Kasr Alainy corpus-intake
# lane). Changed for the Helwan lane: ROOT points at the Helwan corpus and the
# output lands under scripts/helwan/intake/cache/. Logic otherwise unchanged.
"""Walk the Helwan corpus and record what every file physically is.

Read-only. Produces cache/inventory.json: one row per file with identity
(sha256), shape (pages), and whether a text layer exists at all — which decides
whether classification can read the document or has to OCR it.
"""
import hashlib
import json
import os
import subprocess
import sys

ROOT = "/Users/doitrous/Desktop/helwan"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "cache", "inventory.json")


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


def text_probe(path, pages=4):
    """Characters of extractable text in the first few pages.

    Near-zero means the PDF is page images: classification must OCR it rather
    than conclude the document is empty.
    """
    try:
        out = subprocess.run(
            ["pdftotext", "-f", "1", "-l", str(pages), "-q", path, "-"],
            capture_output=True, text=True, timeout=120,
        )
        txt = out.stdout
        return len(txt.strip()), txt[:4000]
    except Exception:
        return 0, ""


def main():
    rows = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames.sort()
        for name in sorted(filenames):
            full = os.path.join(dirpath, name)
            rel = os.path.relpath(full, ROOT)
            if name == ".DS_Store":
                continue
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
                "head": "",
            }
            if ext == ".pdf":
                row["pages"] = pdf_pages(full)
                chars, head = text_probe(full)
                row["text_chars"] = chars
                row["head"] = head
            rows.append(row)
            print(f"  {rel}", file=sys.stderr)

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as fh:
        json.dump({"root": ROOT, "count": len(rows), "files": rows}, fh, indent=1)
    print(f"\n{len(rows)} files -> {OUT}")


if __name__ == "__main__":
    main()
