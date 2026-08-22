#!/usr/bin/env python3
"""Read the front of every file, OCRing when there is no text layer.

    python3 scripts/corpus-intake/probe.py            # y1, unchanged
    python3 scripts/corpus-intake/probe.py --year y2

A scanned exam paper extracts to nothing. Concluding from that that the file
is empty is how a whole module's past papers end up filed as "unknown", so
anything without a usable text layer is rendered and run through tesseract
instead.

Read-only with respect to the corpus: renders go to a temp dir.

Two different jobs live behind one `--year` flag:

**y1 (default)** probes only the files that were still *loose* — sitting
directly in the pre-organisation intake folders — because that is the set
`classify.py`'s module/type detector was built to read, and reproducing that
exact set is what keeps the default output unchanged. This is the historical
behaviour, unedited.

**y2 and later** have no loose/organised split — the owner delivered the
corpus already organised, so every file needs reading, not just a "loose"
subset. Two things make that affordable: this probes by unique `sha256`
rather than by path, so a file that is byte-identical to one already probed
(190 of Year 2's files are archived exact duplicates) costs nothing extra;
and OCR is capped at the *first* page per file rather than the two or three
pages y1 reads, because a first page is enough to classify a paper and this
runs against several times as many candidate files.
"""
import argparse
import json
import os
import subprocess
import sys
import tempfile

from year_config import ROOT, year_cfg, needs_ocr

HERE = os.path.dirname(os.path.abspath(__file__))

# y1's original loose-file set — every folder a file could still be sitting
# in before classify.py/move.py placed it. Unchanged from before --year
# existed; only used when cfg["grammar"] == "y1-legacy".
Y1_LOOSE_DIRS = {
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


def ocr_text(path, first=1, last=None):
    """Render pages [first, last] and OCR them in English + Arabic.

    `last=None` means "just `first`" — Year 2's one-page cap. y1 keeps
    passing an explicit `last` for its historical two-page OCR.
    """
    if last is None:
        last = first
    out = []
    with tempfile.TemporaryDirectory() as td:
        stem = os.path.join(td, "pg")
        try:
            subprocess.run(["pdftoppm", "-r", "150", "-f", str(first), "-l", str(last),
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


def probe_one(full, ext):
    """(text, how) for one file, y1's original per-extension logic."""
    text, how = "", "none"
    if ext == ".pdf":
        text = native_text(full)
        how = "native"
        if len(text.strip()) < 60:
            text = ocr_text(full, first=1, last=2)
            how = "ocr"
    elif ext in (".jpeg", ".jpg", ".png"):
        try:
            r = subprocess.run(["tesseract", full, "stdout", "-l", "eng+ara", "--psm", "6"],
                               capture_output=True, text=True, timeout=300)
            text, how = r.stdout, "ocr-image"
        except Exception:
            pass
    elif ext == ".rtf":
        try:
            r = subprocess.run(["textutil", "-convert", "txt", "-stdout", full],
                               capture_output=True, text=True, timeout=120)
            text, how = r.stdout, "rtf"
        except Exception:
            pass
    return text, how


def run_y1(cfg, inv):
    rows = [x for x in inv["files"]
            if x["name"] != ".DS_Store" and x["dir"] in Y1_LOOSE_DIRS]
    results = []
    out = os.path.join(HERE, cfg["probeName"])
    for i, row in enumerate(rows, 1):
        full = os.path.join(cfg["corpusRoot"], row["rel"])
        print(f"[{i}/{len(rows)}] {row['rel']}", file=sys.stderr, flush=True)
        text, how = probe_one(full, row["ext"])
        results.append({
            "rel": row["rel"], "dir": row["dir"], "name": row["name"],
            "ext": row["ext"], "pages": row["pages"], "sha256": row["sha256"],
            "size": row["size"], "how": how,
            "text": " ".join(text.split())[:6000],
        })
        with open(out, "w") as fh:
            json.dump(results, fh, indent=1)
    print(f"\n{len(results)} probed -> {out}")


def run_priority_folder(cfg, inv):
    """y2+ — probe by unique sha256, OCR capped at page 1, every file covered."""
    rows = [x for x in inv["files"] if x["name"] != ".DS_Store"]
    by_sha = {}
    for row in rows:
        by_sha.setdefault(row["sha256"], []).append(row)

    out = os.path.join(HERE, cfg["probeName"])
    text_by_sha = {}
    total = len(by_sha)
    for i, (sha, group) in enumerate(sorted(by_sha.items()), 1):
        row = group[0]  # any path with this sha256 will do — same bytes
        full = os.path.join(cfg["corpusRoot"], row["rel"])
        ext = row["ext"]
        print(f"[{i}/{total}] {row['rel']}  ({len(group)} path(s) share these bytes)",
              file=sys.stderr, flush=True)
        text, how = "", "none"
        if ext == ".pdf":
            # inventory.py already read pages 1-4 natively; only OCR if that
            # was not usable text, and cap OCR at page 1.
            usable = not needs_ocr(row.get("text_chars"), row.get("text_wordforming_ratio"))
            if usable:
                text, how = row.get("head") or "", "native-from-inventory"
            else:
                text = ocr_text(full, first=1, last=None)
                how = "ocr"
        elif ext in (".jpeg", ".jpg", ".png"):
            try:
                r = subprocess.run(["tesseract", full, "stdout", "-l", "eng+ara", "--psm", "6"],
                                   capture_output=True, text=True, timeout=300)
                text, how = r.stdout, "ocr-image"
            except Exception:
                pass
        elif ext == ".rtf":
            try:
                r = subprocess.run(["textutil", "-convert", "txt", "-stdout", full],
                                   capture_output=True, text=True, timeout=120)
                text, how = r.stdout, "rtf"
            except Exception:
                pass
        # .md/.csv/.json (the _Catalog files) are read directly, no OCR needed.
        elif ext in (".md", ".csv", ".json", ".txt"):
            try:
                with open(full, encoding="utf-8", errors="replace") as fh:
                    text = fh.read()
                how = "text-file"
            except Exception:
                pass
        text_by_sha[sha] = (text, how)
        # Flush progress after every unique file, same reasoning as y1: a
        # long OCR run should not lose everything already done if it dies.
        results = []
        for s, g in by_sha.items():
            if s not in text_by_sha:
                continue
            t, h = text_by_sha[s]
            for r in g:
                results.append({
                    "rel": r["rel"], "dir": r["dir"], "name": r["name"],
                    "ext": r["ext"], "pages": r["pages"], "sha256": r["sha256"],
                    "size": r["size"], "how": h,
                    "text": " ".join(t.split())[:6000],
                })
        with open(out, "w") as fh:
            json.dump(sorted(results, key=lambda x: x["rel"]), fh, indent=1)
    print(f"\n{len(by_sha)} unique files ({len(rows)} paths) probed -> {out}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--year", default="y1", help="y1 (default) | y2 | y3 | y4 | y5")
    ap.add_argument("--university", default="kau", help="kau (default)")
    args = ap.parse_args()
    cfg = year_cfg(args.year, args.university)
    inv = json.load(open(os.path.join(HERE, cfg["inventoryName"])))

    if cfg["grammar"] == "y1-legacy":
        run_y1(cfg, inv)
    elif cfg["grammar"] == "priority-folder":
        run_priority_folder(cfg, inv)
    else:
        raise SystemExit(f'probe.py has no strategy for grammar "{cfg["grammar"]}" ({cfg["yearId"]})')


if __name__ == "__main__":
    main()
