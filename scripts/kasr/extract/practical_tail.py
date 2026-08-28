#!/usr/bin/env python3
"""Pages 81-210 of DPT Practical Histo 101, plus a high-res retry of pp.69/77/79/80."""
import json, os, subprocess, tempfile, time

OUT = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(OUT, "raw")
PDF = "/Users/doitrous/Desktop/Kasr Alainy/y1/PRACTICAL FIRST YEAR/HISTOLOGY /DPT Practical Histo 101 (1).pdf"

def log(m): print("[%s] %s" % (time.strftime("%H:%M:%S"), m), flush=True)

def native(p):
    try:
        return subprocess.run(["pdftotext","-layout","-f",str(p),"-l",str(p),PDF,"-"],
                              capture_output=True, timeout=60).stdout.decode("utf-8","replace")
    except Exception as e:
        log("  native %d: %r" % (p, e)); return ""

def ocr(p, dpi=120, psms=("6",)):
    tmpd = tempfile.mkdtemp(); pre = os.path.join(tmpd,"pg"); best = ""
    try:
        subprocess.run(["pdftoppm","-r",str(dpi),"-f",str(p),"-l",str(p),"-png",PDF,pre],
                       capture_output=True, timeout=300)
    except Exception as e:
        log("  ppm %d: %r" % (p, e)); return ""
    for f in sorted(x for x in os.listdir(tmpd) if x.endswith(".png")):
        fp = os.path.join(tmpd, f)
        for psm in psms:
            try:
                t = subprocess.run(["tesseract",fp,"stdout","-l","eng+ara","--psm",psm],
                                   capture_output=True, timeout=300).stdout.decode("utf-8","replace")
                if len(t.strip()) > len(best.strip()): best = t
            except Exception as e:
                log("  tess %d psm%s: %r" % (p, psm, e))
        try: os.remove(fp)
        except OSError: pass
    try: os.rmdir(tmpd)
    except OSError: pass
    return best

# --- part 1: retry the four silent pages at 300 dpi, psm 4 and 6 ---
retry = {}
for p in (69, 77, 79, 80):
    t = ocr(p, 300, ("4","6"))
    retry[p] = t
    log("RETRY page %d -> %d chars" % (p, len(t.strip())))
    json.dump(retry, open(os.path.join(OUT,"retry-silent-pages.json"),"w"), indent=1, ensure_ascii=False)
log("RETRY DONE")

# --- part 2: pages 81-210 ---
st = {"pagesRead": 80, "ocrPages": [], "illegiblePages": []}
path = os.path.join(RAW, "dpt-practical-histo-101-tail.txt")
ocrn = 0
with open(path, "w") as fh:
    for p in range(81, 211):
        t = native(p)
        if len(t.strip()) < 20:
            t2 = ocr(p, 120, ("6",))
            if len(t2.strip()) >= 5:
                t = t2; ocrn += 1; st["ocrPages"].append(p)
            else:
                st["illegiblePages"].append(p); t = t2
        fh.write("\n===== PAGE %d =====\n" % p); fh.write(t); fh.flush()
        st["pagesRead"] = p
        if p % 5 == 0 or p == 210:
            log("  tail page %d/210 (ocr %d, silent %d)" % (p, ocrn, len(st["illegiblePages"])))
            json.dump(st, open(os.path.join(OUT,"status-dpt-practical-histo-101-tail.json"),"w"), indent=1)
json.dump(st, open(os.path.join(OUT,"status-dpt-practical-histo-101-tail.json"),"w"), indent=1)
log("TAIL DONE ocr=%d silent=%d" % (ocrn, len(st["illegiblePages"])))
