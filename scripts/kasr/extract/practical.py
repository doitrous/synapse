#!/usr/bin/env python3
"""Extract text from a Kasr module's practical-exam sources, one file at a time.

    python3 scripts/kasr/extract/practical.py [--module "104 CPS"] [<slug> ...]

Defaults to module 101 ISK and its named file list. Any other module resolves
its practical sources from the manifest and writes under extract/<module-slug>/,
so two lanes cannot overwrite each other's raw text or status records.

Writes raw text per file to scripts/kasr/extract/raw/<slug>.txt and a status
record to scripts/kasr/extract/status-<slug>.json after each file, so an
interrupted run never costs more than the file in flight.
Native pdftotext -layout first; per-page OCR fallback when a page is empty.
"""
import json, os, subprocess, sys, tempfile, time

from kasr_module import DEFAULT_MODULE, module_sources, out_dir, out_path, parse_module, \
    report_textlayer_fallback

# Set from --module in main().
MODULE = DEFAULT_MODULE
OUT = out_dir(MODULE)
RAW = out_path(MODULE, "raw")

FILES_101 = [
    # slug, sourceId, absolutePath, pages, cap
    ("radiology", "src_177a341938732f599a47",
     "/Users/doitrous/Desktop/Kasr Alainy/y1/101 ISK/Practical /Radiology (X-Ray) Orientation  (1).pdf", 30, None),
    ("histo-written-zahra", "src_f8f2a1993403c9ee07b0",
     "/Users/doitrous/Desktop/Kasr Alainy/y1/101 ISK/Doctors/Dr. Zahra Histology/EOY HISTOLOGY WRITTEN 101 histo written Dr.Zahra 2025 (1).pdf", 42, None),
    ("dpt1-final-revision", "src_05a0b0c29acc94017b8f",
     "/Users/doitrous/Desktop/Kasr Alainy/y1/PRACTICAL FIRST YEAR/HISTOLOGY /DPT 1- ISK 101 - Final Revision (1).pdf", 68, None),
    ("galal-final-revision", "src_fc7ea5960363431009ed",
     "/Users/doitrous/Desktop/Kasr Alainy/y1/101 ISK/Anatomy Dr. Galal Anatomy [3rd Priority]/NOTE this is Dr. Galal's final revision pdf use it accordingly NOTE 101  final revision last all-1(3)-نسخ (1).pdf", 77, None),
    ("dpt-practical-histo-101", "src_b4cb8bf9f0c7a6584b4b",
     "/Users/doitrous/Desktop/Kasr Alainy/y1/PRACTICAL FIRST YEAR/HISTOLOGY /DPT Practical Histo 101 (1).pdf", 210, 80),
]

FILES_BY_MODULE = {DEFAULT_MODULE: FILES_101}
FILES = FILES_101


def files_for(module):
    """101's list was named by hand. Another module takes its practical sources
    from the manifest, keyed by sourceId so the slug cannot drift with a rename."""
    if module in FILES_BY_MODULE:
        return FILES_BY_MODULE[module]
    return [(s["sourceId"], s["sourceId"], s["absolutePath"], s.get("pageCount") or 0, None)
            for s in module_sources(module, category="Practical", file_type="pdf")]


def textlayer_for(module):
    return {s["sourceId"]: s for s in module_sources(module)}


def log(msg):
    print("[%s] %s" % (time.strftime("%H:%M:%S"), msg), flush=True)

def native_page(path, p):
    try:
        r = subprocess.run(["pdftotext", "-layout", "-f", str(p), "-l", str(p), path, "-"],
                           capture_output=True, timeout=60)
        return r.stdout.decode("utf-8", "replace")
    except Exception as e:
        log("  native page %d failed: %r" % (p, e))
        return ""

def ocr_page(path, p, tmpd):
    prefix = os.path.join(tmpd, "pg")
    try:
        subprocess.run(["pdftoppm", "-r", "120", "-f", str(p), "-l", str(p), "-png", path, prefix],
                       capture_output=True, timeout=180)
    except Exception as e:
        log("  pdftoppm page %d failed: %r" % (p, e))
        return ""
    pngs = sorted(f for f in os.listdir(tmpd) if f.endswith(".png"))
    text = ""
    for f in pngs:
        fp = os.path.join(tmpd, f)
        try:
            r = subprocess.run(["tesseract", fp, "stdout", "-l", "eng+ara", "--psm", "6"],
                               capture_output=True, timeout=180)
            text += r.stdout.decode("utf-8", "replace")
        except Exception as e:
            log("  tesseract page %d failed: %r" % (p, e))
        finally:
            try: os.remove(fp)
            except OSError: pass
    return text

def run_file(slug, sid, path, pages, cap, manifest=None):
    log("START %s (%d pages, cap=%s)" % (slug, pages, cap))
    status = {"file": os.path.basename(path), "sourceId": sid, "pages": pages,
              "pagesRead": 0, "method": "native", "capped": False,
              "pagesRemaining": 0, "illegiblePages": [], "ocrPages": []}
    if not os.path.exists(path):
        status["error"] = "missing file"
        json.dump(status, open(os.path.join(OUT, "status-%s.json" % slug), "w"), indent=1)
        log("MISSING %s" % path)
        return
    last = min(pages, cap) if cap else pages
    status["capped"] = bool(cap and pages > cap)
    status["pagesRemaining"] = pages - last if status["capped"] else 0
    ocr_count = 0
    tmpd = tempfile.mkdtemp()
    with open(os.path.join(RAW, slug + ".txt"), "w") as fh:
        for p in range(1, last + 1):
            t = native_page(path, p)
            if len(t.strip()) < 20:
                t2 = ocr_page(path, p, tmpd)
                if len(t2.strip()) >= 5:
                    t = t2
                    ocr_count += 1
                    status["ocrPages"].append(p)
                else:
                    status["illegiblePages"].append(p)
                    t = t2
            fh.write("\n===== PAGE %d =====\n" % p)
            fh.write(t)
            fh.flush()
            status["pagesRead"] = p
            if p % 5 == 0 or p == last:
                log("  %s page %d/%d (ocr so far %d)" % (slug, p, last, ocr_count))
                json.dump(status, open(os.path.join(OUT, "status-%s.json" % slug), "w"), indent=1)
    try: os.rmdir(tmpd)
    except OSError: pass
    if ocr_count > last * 0.5:
        status["method"] = "ocr"
    elif ocr_count:
        status["method"] = "native+ocr"
    json.dump(status, open(os.path.join(OUT, "status-%s.json" % slug), "w"), indent=1)
    log("DONE %s pagesRead=%d method=%s ocr=%d illegible=%d" %
        (slug, status["pagesRead"], status["method"], ocr_count, len(status["illegiblePages"])))
    if manifest and sid in manifest:
        report_textlayer_fallback(manifest[sid],
                                  "native" if status["method"] == "native" else "ocr")

def main(argv):
    global MODULE, OUT, RAW, FILES
    if "--help" in argv or "-h" in argv:
        print(__doc__)
        return
    MODULE, argv = parse_module(argv)
    OUT = out_dir(MODULE)
    RAW = out_path(MODULE, "raw")
    os.makedirs(RAW, exist_ok=True)
    FILES = files_for(MODULE)
    manifest = textlayer_for(MODULE)
    log("module %s -> %s" % (MODULE, OUT))
    only = argv or None
    for slug, sid, path, pages, cap in FILES:
        if only and slug not in only:
            continue
        try:
            run_file(slug, sid, path, pages, cap, manifest)
        except Exception as e:
            log("FILE FAILED %s: %r" % (slug, e))
    log("ALL DONE")

if __name__ == "__main__":
    main(sys.argv[1:])
