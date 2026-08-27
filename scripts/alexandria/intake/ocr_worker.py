#!/usr/bin/env python3
"""Background OCR worker for pdfs with no native text layer.

Not one of the five ported Kasr scripts — this is new, split out of probe.py
specifically so a slow OCR pass never blocks manifest.py. The brief requires
"OCR (tesseract eng+ara) ONLY for files with no text layer, first 2 pages, and
run it in the background with a log so a slow OCR does not block the manifest."

Consumes ocr_queue.json (written by probe.py). Writes ocr_results.json
incrementally (so a partial run is still usable) and appends one line per file
to ocr.log. Safe to re-run: skips shas already present in ocr_results.json.

    nohup python3 scripts/alexandria/intake/ocr_worker.py \
        > scripts/alexandria/intake/ocr.log 2>&1 &
"""
import json
import os
import subprocess
import sys
import tempfile
import time

HERE = os.path.dirname(os.path.abspath(__file__))
INV = os.path.join(HERE, "inventory.json")
QUEUE = os.path.join(HERE, "ocr_queue.json")
OUT = os.path.join(HERE, "ocr_results.json")
PAGETEXT = os.path.join(HERE, "..", "pagetext")
os.makedirs(PAGETEXT, exist_ok=True)


def ocr_text(path, last=2):
    out = []
    with tempfile.TemporaryDirectory(dir=PAGETEXT) as td:
        stem = os.path.join(td, "pg")
        try:
            subprocess.run(["pdftoppm", "-r", "150", "-f", "1", "-l", str(last),
                            "-png", path, stem],
                           capture_output=True, timeout=300)
        except Exception as e:
            return "", f"pdftoppm failed: {e}"
        pngs = sorted(f for f in os.listdir(td) if f.endswith(".png"))
        if not pngs:
            return "", "pdftoppm produced no pages (possibly corrupt/encrypted pdf)"
        for png in pngs:
            try:
                r = subprocess.run(
                    ["tesseract", os.path.join(td, png), "stdout", "-l", "eng+ara", "--psm", "6"],
                    capture_output=True, text=True, timeout=300)
                out.append(r.stdout)
            except Exception as e:
                out.append("")
    return "\n".join(out), None


def main():
    root = json.load(open(INV))["root"]
    queue = json.load(open(QUEUE))
    done = {}
    if os.path.exists(OUT):
        try:
            done = {x["sha256"]: x for x in json.load(open(OUT))}
        except Exception:
            done = {}

    results = list(done.values())
    remaining = [q for q in queue if q["sha256"] not in done]
    print(f"{len(queue)} queued, {len(done)} already done, {len(remaining)} remaining",
          file=sys.stderr, flush=True)

    t0 = time.time()
    for i, item in enumerate(remaining, 1):
        full = os.path.join(root, item["rel"])
        text, err = ocr_text(full)
        row = {
            "rel": item["rel"], "sha256": item["sha256"],
            "ocrText": " ".join(text.split())[:6000] if text else "",
            "ocrError": err,
            "ocrChars": len(text.strip()) if text else 0,
        }
        results.append(row)
        elapsed = time.time() - t0
        rate = i / elapsed if elapsed > 0 else 0
        eta_min = (len(remaining) - i) / rate / 60 if rate > 0 else float("nan")
        print(f"[{i}/{len(remaining)}] {item['rel']} "
              f"({row['ocrChars']} chars) elapsed={elapsed:.0f}s eta={eta_min:.0f}min",
              file=sys.stderr, flush=True)
        if i % 10 == 0 or i == len(remaining):
            json.dump(results, open(OUT, "w"), indent=1, ensure_ascii=False)

    json.dump(results, open(OUT, "w"), indent=1, ensure_ascii=False)
    print(f"\ndone: {len(results)} ocr rows -> {OUT}")


if __name__ == "__main__":
    main()
