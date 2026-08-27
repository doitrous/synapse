#!/usr/bin/env python3
"""Text-extraction helpers for a Notes / Important & Summaries / Orientation batch.

Copied from `scripts/kasr/extract/notes.py`. Two modes:
  native <pdf> <outdir>            -- pdftotext -layout, one .txt per page
  ocr    <pdf> <outdir> [langs] [cap]
                                   -- pdftoppm -r 150 -png then tesseract --psm 6

Images rendered for OCR are written to a scratch dir and deleted as soon as the
page's text is produced; nothing image-shaped is kept or copied into the repo.

ORDER CHANGE — the watermark table below (`WM`) is emptied, not copied.
Kasr's `WM` strips the token fragments of "VIP Academy", the publisher whose
notes tile that phrase diagonally across every page. Applying it to any other
corpus is the exact failure the shared manual documents at length for
`repair-options.py`'s watermark regex: `WM` includes single- and two-letter
tokens — "p", "y", "ac", "ad", "em", "vi", "ip" — that are ordinary medical
abbreviations elsewhere (AC = acromioclavicular, AD = right ear, EM =
electron microscope, IP = intraperitoneal). Run blind against Ain Shams
text, `clean()` would delete real content and look like nothing happened —
no error, a page that still reads as English, silently missing every line
that happened to be mostly short tokens. `clean()` is called by nothing else
in this file or automatically by any other script; it is opt-in exactly so a
caller must decide, per publisher, whether a watermark exists at all.
`WM = set()` here means "no watermark for this corpus" until proven
otherwise, per the manual's own prescribed fix.
"""
import os
import subprocess
import sys
import tempfile

OCR_PAGE_CAP = 60


def page_count(pdf):
    out = subprocess.run(["pdfinfo", pdf], capture_output=True, text=True).stdout
    for line in out.splitlines():
        if line.startswith("Pages:"):
            return int(line.split(":", 1)[1].strip())
    return 0


def native(pdf, outdir):
    n = page_count(pdf)
    os.makedirs(outdir, exist_ok=True)
    for p in range(1, n + 1):
        txt = subprocess.run(
            ["pdftotext", "-layout", "-f", str(p), "-l", str(p), pdf, "-"],
            capture_output=True, text=True).stdout
        with open(os.path.join(outdir, "p%03d.txt" % p), "w") as fh:
            fh.write(txt)
    print("native %s pages=%d" % (os.path.basename(pdf), n))
    return n


def ocr(pdf, outdir, langs="eng+ara", cap=OCR_PAGE_CAP):
    n = page_count(pdf)
    last = min(n, cap)
    os.makedirs(outdir, exist_ok=True)
    for p in range(1, last + 1):
        dest = os.path.join(outdir, "p%03d.txt" % p)
        if os.path.exists(dest) and os.path.getsize(dest) > 0:
            continue
        with tempfile.TemporaryDirectory() as tmp:
            stem = os.path.join(tmp, "pg")
            subprocess.run(["pdftoppm", "-r", "150", "-png",
                            "-f", str(p), "-l", str(p), pdf, stem], check=True)
            pngs = sorted(f for f in os.listdir(tmp) if f.endswith(".png"))
            if not pngs:
                continue
            txt = subprocess.run(
                ["tesseract", os.path.join(tmp, pngs[0]), "stdout",
                 "-l", langs, "--psm", "6"],
                capture_output=True, text=True).stdout
        with open(dest, "w") as fh:
            fh.write(txt)
        sys.stderr.write("ocr %s p%d/%d\n" % (os.path.basename(pdf), p, last))
        sys.stderr.flush()
    print("ocr %s done pages=%d of %d capped=%s"
          % (os.path.basename(pdf), last, n, last < n))
    return last, n


if __name__ == "__main__":
    mode, pdf, outdir = sys.argv[1], sys.argv[2], sys.argv[3]
    if mode == "native":
        native(pdf, outdir)
    else:
        langs = sys.argv[4] if len(sys.argv) > 4 else "eng+ara"
        cap = int(sys.argv[5]) if len(sys.argv) > 5 else OCR_PAGE_CAP
        ocr(pdf, outdir, langs, cap)


# --- watermark cleaning -------------------------------------------------
# >>> FILL IN PER PUBLISHER, only after confirming a watermark actually
# renders on the page — do not assume one exists. See the module docstring.
WM: set[str] = set()


def clean(text):
    if not WM:
        return text
    out = []
    for line in text.splitlines():
        toks = line.split()
        keep = [t for t in toks if t.lower().strip(".,") not in WM]
        if not keep:
            continue
        if all(len(t) <= 2 for t in keep) and len(keep) < 3:
            continue
        out.append(" ".join(keep))
    return "\n".join(out)


def clean_dir(d):
    for f in sorted(os.listdir(d)):
        if not f.endswith(".txt"):
            continue
        p = os.path.join(d, f)
        with open(p) as fh:
            t = fh.read()
        print("=== %s" % f)
        print(clean(t))
