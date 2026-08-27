#!/usr/bin/env python3
"""Extract text from an Ain Shams module's practical-exam sources, one file at a time.

    python3 scripts/asu/extract/practical.py --module "ASU-CVS" [<slug> ...]

Copied from `scripts/kasr/extract/practical.py`. `--module` is required —
Ain Shams has no default module or hand-named file list to fall back to.
`files_for()` already handled "any module but the default" by resolving
practical sources from the manifest's own `Practical` category, keyed by
`sourceId` so the slug cannot drift with a rename; that is now the only
path, since there is no `FILES_101`-equivalent hand-named list here.

Writes raw text per file to extract/<module-slug>/raw/<slug>.txt and a status
record to extract/<module-slug>/status-<slug>.json after each file, so an
interrupted run never costs more than the file in flight.
Native pdftotext -layout first; per-page OCR fallback when a page is empty.
"""
import json, os, subprocess, sys, tempfile, time

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import asu_module  # noqa: E402

# Set from --module in main().
MODULE = None
OUT = None
RAW = None

# >>> Hand-name entries here only for a file the manifest cannot resolve on
# its own (a wrong category, an ambiguous title) — see Kasr's FILES_101 for
# the shape: (slug, sourceId, absolutePath, pages, cap).
FILES_BY_MODULE: dict[str, list[tuple[str, str, str, int, int | None]]] = {}
FILES: list[tuple[str, str, str, int, int | None]] = []


def files_for(module):
    """A hand-named entry if one exists for this module; otherwise every
    manifest row filed under category "Practical" for it."""
    if module in FILES_BY_MODULE:
        return FILES_BY_MODULE[module]
    return [(s["sourceId"], s["sourceId"], s["absolutePath"], s.get("pageCount") or 0, None)
            for s in asu_module.module_sources(module, category="Practical", file_type="pdf")]


def textlayer_for(module):
    return {s["sourceId"]: s for s in asu_module.module_sources(module)}


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
        asu_module.report_textlayer_fallback(manifest[sid],
                                  "native" if status["method"] == "native" else "ocr")

def main(argv):
    global MODULE, OUT, RAW, FILES
    if "--help" in argv or "-h" in argv:
        print(__doc__)
        return
    MODULE, argv = asu_module.parse_module(argv)
    OUT = asu_module.out_dir(MODULE)
    RAW = asu_module.out_path(MODULE, "raw")
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
