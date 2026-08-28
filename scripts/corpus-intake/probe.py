#!/usr/bin/env python3
"""Read the front of every loose file, OCRing when there is no text layer.

A scanned exam paper extracts to nothing. Concluding from that that the file is
empty is how a whole module's past papers get filed as "unknown", so anything
without a text layer is rendered and run through tesseract instead.

Read-only with respect to the corpus: renders go to a temp dir.
"""
import json
import os
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = "/Users/doitrous/Desktop/Kasr Alainy"
INV = os.path.join(HERE, "inventory.json")
OUT = os.path.join(HERE, "probe.json")

LOOSE_DIRS = {
    "y1", "y1/101 ISK", "y1/102 INT", "y1/103 BMS", "y1/104 CPS",
    "y1/108 INT", "y1/2ry Modules", "y1/PRACTICAL FIRST YEAR",
}


def native_text(path, last=3):
    try:
        r = subprocess.run(["pdftotext", "-f", "1", "-l", str(last), "-q", path, "-"],
                           capture_output=True, text=True, timeout=180)
        return r.stdout
    except Exception:
        return ""


def ocr_text(path, last=2):
    """Render the first pages and OCR them in English + Arabic."""
    out = []
    with tempfile.TemporaryDirectory() as td:
        stem = os.path.join(td, "pg")
        try:
            subprocess.run(["pdftoppm", "-r", "150", "-f", "1", "-l", str(last),
                            "-png", path, stem],
                           capture_output=True, timeout=300)
        except Exception:
            return ""
        for png in sorted(os.listdir(td)):
            if not png.endswith(".png"):
                continue
            try:
                r = subprocess.run(
                    ["tesseract", os.path.join(td, png), "stdout", "-l", "eng+ara", "--psm", "6"],
                    capture_output=True, text=True, timeout=300)
                out.append(r.stdout)
            except Exception:
                pass
    return "\n".join(out)


def main():
    inv = json.load(open(INV))
    rows = [x for x in inv["files"]
            if x["name"] != ".DS_Store" and x["dir"] in LOOSE_DIRS]
    results = []
    for i, row in enumerate(rows, 1):
        full = os.path.join(ROOT, row["rel"])
        print(f"[{i}/{len(rows)}] {row['rel']}", file=sys.stderr, flush=True)
        text, how = "", "none"
        if row["ext"] == ".pdf":
            text = native_text(full)
            how = "native"
            if len(text.strip()) < 60:
                text = ocr_text(full)
                how = "ocr"
        elif row["ext"] in (".jpeg", ".jpg", ".png"):
            try:
                r = subprocess.run(["tesseract", full, "stdout", "-l", "eng+ara", "--psm", "6"],
                                   capture_output=True, text=True, timeout=300)
                text, how = r.stdout, "ocr-image"
            except Exception:
                pass
        elif row["ext"] == ".rtf":
            try:
                r = subprocess.run(["textutil", "-convert", "txt", "-stdout", full],
                                   capture_output=True, text=True, timeout=120)
                text, how = r.stdout, "rtf"
            except Exception:
                pass
        results.append({
            "rel": row["rel"], "dir": row["dir"], "name": row["name"],
            "ext": row["ext"], "pages": row["pages"], "sha256": row["sha256"],
            "size": row["size"], "how": how,
            "text": " ".join(text.split())[:6000],
        })
        with open(OUT, "w") as fh:
            json.dump(results, fh, indent=1)
    print(f"\n{len(results)} probed -> {OUT}")


if __name__ == "__main__":
    main()
