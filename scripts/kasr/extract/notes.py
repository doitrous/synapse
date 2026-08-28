#!/usr/bin/env python3
"""Text-extraction helpers for the 101 ISK Notes / Important & Summaries /
Orientation batch.

Two modes:
  native <pdf> <outdir>            -- pdftotext -layout, one .txt per page
  ocr    <pdf> <outdir> [langs] [cap]
                                   -- pdftoppm -r 150 -png then tesseract --psm 6

Images rendered for OCR are written to a scratch dir and deleted as soon as the
page's text is produced; nothing image-shaped is kept or copied into the repo.
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
# The VIP Academy notes tile the string "VIP Academy" across every page as a
# diagonal watermark; pdftotext interleaves its fragments with the real text.
WM = {"vi", "ip", "p", "ac", "ad", "em", "e", "m", "y", "vip", "academy",
      "iP", "e m", "de", "ca"}


def clean(text):
    out = []
    for line in text.splitlines():
        toks = line.split()
        keep = [t for t in toks if t.lower().strip(".,") not in WM]
        # a line that was nothing but watermark fragments disappears
        if not keep:
            continue
        # drop lines where the surviving tokens are all 1-2 chars (noise)
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
