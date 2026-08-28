#!/usr/bin/env python3
# Copied from scripts/corpus-intake/probe.py @ 5d26054 (Kasr Alainy corpus-intake
# lane). Changed for the Helwan lane:
#   - ROOT/cache paths point at the Helwan corpus and scripts/helwan/intake/cache/.
#   - Runs over every file in the corpus, not a LOOSE_DIRS allowlist, because the
#     Helwan corpus is already organised by module/subject/category and every
#     row still needs a textLayer verdict.
#   - Adds the word-forming-character ratio guard: a text layer can be present
#     and still be undecodable (e.g. all U+0001), so length alone is not
#     trusted. Ratio = count of [A-Za-z + Arabic block] over non-space chars;
#     only above 0.6 counts as "native".
#   - OCRs only the first page of a file that fails the ratio guard (never
#     whole books), per the Helwan lane brief.
#   - Adds handling for .doc/.docx (textutil), .pptx (zip+xml, best effort),
#     .apkg/.csv (notes, textLayer n/a), .md (already text).
"""Read the front of every Helwan file, OCRing when there is no usable text layer.

A scanned exam paper extracts to nothing, and a text layer can also be present
but undecodable garbage (U+0001 runs) that passes a length check while failing
a human read. Concluding "empty" from either is how a module's past papers get
filed as unknown, so anything failing the ratio guard is rendered and OCR'd
instead.

Read-only with respect to the corpus: renders go to a temp dir.
"""
import json
import os
import re
import subprocess
import sys
import tempfile
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = "/Users/doitrous/Desktop/helwan"
INV = os.path.join(HERE, "cache", "inventory.json")
OUT = os.path.join(HERE, "cache", "probe.json")

WORD_CHAR_RX = re.compile(r"[A-Za-z؀-ۿ]")
RATIO_THRESHOLD = 0.6


def word_ratio(text):
    """Word-forming characters over non-space characters. None if no text."""
    non_space = re.sub(r"\s+", "", text or "")
    if not non_space:
        return 0.0
    hits = len(WORD_CHAR_RX.findall(non_space))
    return hits / len(non_space)


def native_text_first_page(path):
    try:
        r = subprocess.run(["pdftotext", "-f", "1", "-l", "1", "-q", path, "-"],
                           capture_output=True, text=True, timeout=180)
        return r.stdout
    except Exception:
        return ""


def ocr_first_page(path):
    """Render page 1 only and OCR it in English + Arabic."""
    with tempfile.TemporaryDirectory() as td:
        stem = os.path.join(td, "pg")
        try:
            subprocess.run(["pdftoppm", "-r", "150", "-f", "1", "-l", "1",
                            "-png", path, stem],
                           capture_output=True, timeout=300)
        except Exception:
            return ""
        pngs = sorted(f for f in os.listdir(td) if f.endswith(".png"))
        if not pngs:
            return ""
        try:
            r = subprocess.run(
                ["tesseract", os.path.join(td, pngs[0]), "stdout", "-l", "eng+ara", "--psm", "6"],
                capture_output=True, text=True, timeout=300)
            return r.stdout
        except Exception:
            return ""


def ocr_image(path):
    try:
        r = subprocess.run(["tesseract", path, "stdout", "-l", "eng+ara", "--psm", "6"],
                           capture_output=True, text=True, timeout=300)
        return r.stdout
    except Exception:
        return ""


def doc_text(path):
    try:
        r = subprocess.run(["textutil", "-convert", "txt", "-stdout", path],
                           capture_output=True, text=True, timeout=120)
        return r.stdout
    except Exception:
        return ""


def pptx_text(path):
    """Best-effort text pull straight out of the slide XML, tags stripped."""
    out = []
    try:
        with zipfile.ZipFile(path) as z:
            slide_names = sorted(
                n for n in z.namelist()
                if n.startswith("ppt/slides/slide") and n.endswith(".xml")
            )
            for n in slide_names:
                xml = z.read(n).decode("utf-8", errors="ignore")
                # Pull the run text nodes only; strip every other tag.
                runs = re.findall(r"<a:t>(.*?)</a:t>", xml, re.S)
                out.append(" ".join(runs))
    except Exception:
        return ""
    return "\n".join(out)


def csv_text(path):
    try:
        with open(path, "r", encoding="utf-8", errors="ignore") as fh:
            return fh.read(6000)
    except Exception:
        return ""


def md_text(path):
    try:
        with open(path, "r", encoding="utf-8", errors="ignore") as fh:
            return fh.read(6000)
    except Exception:
        return ""


def main():
    inv = json.load(open(INV))
    rows = inv["files"]
    results = []
    for i, row in enumerate(rows, 1):
        full = os.path.join(ROOT, row["rel"])
        print(f"[{i}/{len(rows)}] {row['rel']}", file=sys.stderr, flush=True)
        text, how, ratio, layer = "", "none", None, "n/a"
        ext = row["ext"]

        if ext == ".pdf":
            text = native_text_first_page(full)
            ratio = word_ratio(text)
            how = "native"
            if ratio <= RATIO_THRESHOLD:
                ocr = ocr_first_page(full)
                if ocr.strip():
                    text = ocr
                    how = "ocr"
                    ratio = word_ratio(text)
                layer = "ocr-needed"
            else:
                layer = "native"
        elif ext in (".jpg", ".jpeg", ".png"):
            text = ocr_image(full)
            how = "ocr-image"
            ratio = word_ratio(text)
            layer = "none"  # images carry no text layer by definition
        elif ext in (".doc", ".docx"):
            text = doc_text(full)
            how = "doc-converted"
            ratio = word_ratio(text)
            layer = "native" if ratio > RATIO_THRESHOLD else "ocr-needed"
        elif ext == ".pptx":
            text = pptx_text(full)
            how = "pptx-converted"
            ratio = word_ratio(text)
            layer = "native" if ratio > RATIO_THRESHOLD else "ocr-needed"
        elif ext == ".csv":
            text = csv_text(full)
            how = "csv"
            ratio = word_ratio(text)
            layer = "n/a"
        elif ext == ".apkg":
            text = ""
            how = "apkg-not-extracted"
            ratio = None
            layer = "n/a"
        elif ext == ".md":
            text = md_text(full)
            how = "md"
            ratio = word_ratio(text)
            layer = "native"
        else:
            text, how, ratio, layer = "", "unhandled-ext", None, "unknown"

        results.append({
            "rel": row["rel"], "dir": row["dir"], "name": row["name"],
            "ext": ext, "pages": row["pages"], "sha256": row["sha256"],
            "size": row["size"], "how": how, "wordCharRatio": ratio,
            "textLayerVerdict": layer,
            "text": " ".join(text.split())[:6000],
        })
        with open(OUT, "w") as fh:
            json.dump(results, fh, indent=1, ensure_ascii=False)
    print(f"\n{len(results)} probed -> {OUT}")


if __name__ == "__main__":
    main()
