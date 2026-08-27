#!/usr/bin/env python3
"""Walk one Ain Shams year and record what every file physically is.

Read-only. Produces inventory-<year>.json: one row per file with identity
(sha256), shape (pages for PDFs), path decomposition (term/module/subject/
kind/subfolder) and a text-layer verdict decided by the word-forming-
character ratio of the first 4 pages, per
docs/Ain-Shams-Source-Imports/LANE-BRIEF.md and the SHARED-TOOLCHAIN findings
"The manifest's textLayer is wrong at least once" and "Probing readability:
count words, not characters" — a *character* ratio scores a dotted answer
sheet or a run of U+0001 as high as real prose; only counting actual letters
catches both.

Usage: python3 inventory.py --year y1|y2|y3
"""
import argparse
import hashlib
import json
import os
import re
import subprocess
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from asu_config import ROOT, YEARS, HERE, decompose, sniff_is_pdf

WORD_RX = re.compile(r"[^\W\d_]", re.UNICODE)
NATIVE_RATIO_THRESHOLD = 0.15
MIN_TEXT_CHARS_FOR_RATIO = 20  # below this, treat as no text rather than compute a noisy ratio


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
    """First `pages` pages of extractable text, word-forming ratio, and
    whether a U+0001 control character run is present (the known false-
    "native" case from SHARED-TOOLCHAIN)."""
    try:
        out = subprocess.run(
            ["pdftotext", "-f", "1", "-l", str(pages), "-q", path, "-"],
            capture_output=True, text=True, timeout=120,
        )
        txt = out.stdout
    except Exception:
        txt = ""
    stripped = txt.strip()
    has_control = "\x01" in txt
    total = len(stripped)
    word_chars = len(WORD_RX.findall(stripped))
    ratio = (word_chars / total) if total else 0.0
    return {
        "textChars": total,
        "wordChars": word_chars,
        "wordRatio": round(ratio, 4),
        "hasControlChar": has_control,
        "headSample": stripped[:800],
    }


def classify_ext(name):
    """Normalised file type. Falls back to magic-byte sniffing for files
    with no usable extension token — found by hand to be PDFs missing their
    extension entirely (e.g. '...Dr.Omar', '...dr.Alaa')."""
    ext = os.path.splitext(name)[1].lower().lstrip(".")
    if ext == "pdf_":
        return "pdf", ".pdf_"
    if ext in ("pdf", "pptx", "docx", "ppt", "jpg", "jpeg", "mov", "mp4", "png"):
        return ext, "." + ext
    return None, ("." + ext if ext else "")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--year", required=True, choices=["y1", "y2", "y3"])
    args = ap.parse_args()

    cfg = YEARS[args.year]
    walk_root = os.path.join(ROOT, cfg["walkRoot"])
    out_path = os.path.join(HERE, f"inventory-{args.year}.json")

    rows = []
    t0 = time.time()
    n = 0
    for dirpath, dirnames, filenames in os.walk(walk_root):
        dirnames.sort()
        for name in sorted(filenames):
            if name == ".DS_Store":
                continue
            full = os.path.join(dirpath, name)
            rel = os.path.relpath(full, walk_root)
            rel_dir = os.path.dirname(rel)
            dir_parts = [] if rel_dir == "." else rel_dir.split(os.sep)
            try:
                size = os.path.getsize(full)
            except OSError:
                continue

            file_type, ext_raw = classify_ext(name)
            sniffed = False
            if file_type is None and sniff_is_pdf(full):
                file_type = "pdf"
                sniffed = True

            row = {
                "rel": rel,
                "dirParts": dir_parts,
                "name": name,
                "extRaw": ext_raw,
                "fileType": file_type or "unknown",
                "extensionSniffed": sniffed,
                "size": size,
                "sha256": sha256(full),
                "pages": None,
                "textChars": None,
                "wordChars": None,
                "wordRatio": None,
                "hasControlChar": False,
                "headSample": "",
                "textLayer": "n/a",
            }
            row.update(decompose(dir_parts))

            if file_type == "pdf":
                row["pages"] = pdf_pages(full)
                probe = text_probe(full)
                row.update(probe)
                if probe["textChars"] < MIN_TEXT_CHARS_FOR_RATIO:
                    row["textLayer"] = "none"
                elif probe["wordRatio"] >= NATIVE_RATIO_THRESHOLD:
                    row["textLayer"] = "native"
                else:
                    row["textLayer"] = "none"

            rows.append(row)
            n += 1
            if n % 20 == 0 or n == 1:
                elapsed = time.time() - t0
                print(f"[{args.year}] {n} files, {elapsed:.0f}s elapsed, {elapsed/n:.2f}s/file avg :: {rel}",
                      file=sys.stderr, flush=True)
                with open(out_path, "w") as fh:
                    json.dump({"walkRoot": walk_root, "yearId": cfg["yearId"], "count": len(rows), "files": rows},
                               fh, indent=1, ensure_ascii=False)
            if n == 100:
                elapsed = time.time() - t0
                per_file = elapsed / n
                print(f"[{args.year}] ESTIMATE after 100 files: {per_file:.2f}s/file avg, "
                      f"elapsed {elapsed:.0f}s", file=sys.stderr, flush=True)

    with open(out_path, "w") as fh:
        json.dump({"walkRoot": walk_root, "yearId": cfg["yearId"], "count": len(rows), "files": rows},
                   fh, indent=1, ensure_ascii=False)
    elapsed = time.time() - t0
    print(f"[{args.year}] DONE: {len(rows)} files -> {out_path} in {elapsed:.0f}s", file=sys.stderr, flush=True)


if __name__ == "__main__":
    main()
