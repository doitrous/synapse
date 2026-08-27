#!/usr/bin/env python3
"""OCR probe for files inventory.py found to have no usable text layer.

Per docs/Ain-Shams-Source-Imports/LANE-BRIEF.md: no full OCR pass in this
intake step. Only the FIRST page of each scanned/no-text-layer file is
rendered (150 dpi) and OCR'd (English + Arabic), capped at 30s per file
end-to-end; a file that blows the cap is recorded as
`probeStatus: "skipped_timeout"` and left for a later extraction pass, never
silently treated as empty.

This probe exists to confirm a `textLayer: none` verdict is real (not, say,
a corrupt render) and to leave a short sample for a human to spot-check —
NOT to extract classification signal. classify.py derives module/type from
path and filename tokens only, per the lane brief.

Usage: python3 probe.py --year y1|y2|y3
"""
import argparse
import json
import os
import subprocess
import sys
import tempfile
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from asu_config import ROOT, YEARS, HERE

BUDGET_S = 30
IMAGE_EXTS = {"jpg", "jpeg", "png"}


def ocr_first_page_pdf(path, budget_s=BUDGET_S):
    start = time.time()
    with tempfile.TemporaryDirectory() as td:
        stem = os.path.join(td, "pg")
        remaining = budget_s - (time.time() - start)
        if remaining <= 0:
            return None, "skipped_timeout"
        try:
            subprocess.run(["pdftoppm", "-r", "150", "-f", "1", "-l", "1", "-png", path, stem],
                            capture_output=True, timeout=remaining)
        except subprocess.TimeoutExpired:
            return None, "skipped_timeout"
        except Exception:
            return None, "error"
        pngs = sorted(f for f in os.listdir(td) if f.endswith(".png"))
        if not pngs:
            return "", "error"
        remaining = budget_s - (time.time() - start)
        if remaining <= 0:
            return None, "skipped_timeout"
        try:
            r = subprocess.run(
                ["tesseract", os.path.join(td, pngs[0]), "stdout", "-l", "eng+ara", "--psm", "6"],
                capture_output=True, text=True, timeout=remaining)
            return r.stdout, "ok"
        except subprocess.TimeoutExpired:
            return None, "skipped_timeout"
        except Exception:
            return None, "error"


def ocr_image(path, budget_s=BUDGET_S):
    try:
        r = subprocess.run(["tesseract", path, "stdout", "-l", "eng+ara", "--psm", "6"],
                            capture_output=True, text=True, timeout=budget_s)
        return r.stdout, "ok"
    except subprocess.TimeoutExpired:
        return None, "skipped_timeout"
    except Exception:
        return None, "error"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--year", required=True, choices=["y1", "y2", "y3"])
    args = ap.parse_args()

    cfg = YEARS[args.year]
    walk_root = os.path.join(ROOT, cfg["walkRoot"])
    inv_path = os.path.join(HERE, f"inventory-{args.year}.json")
    out_path = os.path.join(HERE, f"probe-{args.year}.json")

    inv = json.load(open(inv_path))
    candidates = [r for r in inv["files"]
                  if r["textLayer"] == "none" or r["fileType"] in IMAGE_EXTS]

    results = []
    t0 = time.time()
    for i, row in enumerate(candidates, 1):
        full = os.path.join(walk_root, row["rel"])
        print(f"[{args.year}] probe {i}/{len(candidates)} {row['rel']}", file=sys.stderr, flush=True)
        if row["fileType"] == "pdf":
            text, status = ocr_first_page_pdf(full)
        elif row["fileType"] in IMAGE_EXTS:
            text, status = ocr_image(full)
        else:
            text, status = None, "not_applicable"
        text = text or ""
        results.append({
            "rel": row["rel"], "sha256": row["sha256"], "fileType": row["fileType"],
            "probeStatus": status,
            "ocrChars": len(text.strip()),
            "ocrSample": " ".join(text.split())[:500],
        })
        with open(out_path, "w") as fh:
            json.dump({"yearId": cfg["yearId"], "count": len(results), "probed": results},
                       fh, indent=1, ensure_ascii=False)

    elapsed = time.time() - t0
    n_timeout = sum(1 for r in results if r["probeStatus"] == "skipped_timeout")
    print(f"[{args.year}] DONE: {len(results)} probed ({n_timeout} skipped_timeout) -> {out_path} "
          f"in {elapsed:.0f}s", file=sys.stderr, flush=True)


if __name__ == "__main__":
    main()
