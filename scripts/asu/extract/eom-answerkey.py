#!/usr/bin/env python3
"""End-of-module answers, recovered from the ink rather than the text.

Copied from `scripts/kasr/extract/eom-answerkey.py`, retrofitted for
`--module` (required — no default) and with `PAPERS` emptied: Kasr's five
entries are HSV colour thresholds measured off five specific Kasr scans
against their own unsolved twins, and guessing a threshold for an
uncalibrated scan is the same failure `repair-options.py`'s watermark
warning describes, applied to colour. Run `--calibrate` against an Ain Shams
paper's own render first, then add its entry here — see the module's own
docstring section 2 below for what that calibration measures and why it
cannot be skipped.

Kasr's six end-of-module papers were scans with no text layer at all:
`pdftotext` returns zero characters from all six, so the OCR pass that built
`mcq.json` had nothing to read an answer from and correctly banked every
question as unanswered. The answers were never in a text layer. They are pink
highlight bands, one blue correction, and — on the 2024 paper — grey pencil.

This script is adapted from `108-INT/answerkey.py`, which solved the same
problem for a different module (48/48, zero false positives on its controls).
Its method is kept: render at a known DPI, classify pixels in HSV rather than by
any hardcoded RGB triple, group them into regions, intersect the regions with
option boxes, and attribute to the largest overlap share. Three things had to
change, and each is a measurement rather than a preference:

1.  **Option boxes come from OCR, not from `pdftotext -bbox-layout`.** There is
    no text layer to ask. `tesseract --psm 6 tsv` gives per-word boxes in the
    pixels of the render itself, so the points-to-pixels scale that 108 needed
    disappears — everything is one coordinate space. The cost is that option
    boxes are now a guess that can be wrong, so the *letter* is taken from the
    line structure and the OCR word text is treated as advisory only.

2.  **The HSV thresholds are calibrated per paper against that paper's own
    unsolved twin.** 108 warned that its two sittings needed different numbers;
    here the gap is wider still. The 2022 highlight is a saturated pink that
    clears any sane bar; the 2021 highlight renders at (252,240,241) — a
    saturation of 0.048, one twentieth of 108's floor. A detector tuned on 2022
    finds nothing on 2021 and reports it as a clean unsolved copy. `--calibrate`
    prints the grid the thresholds below were read off.

3.  **Stroke marks get their own rule.** A pencil circle or tick is hollow. It
    groups as two thin bands with the option's text sitting in the gap between
    them, so scoring "mark pixels landing on the option box" gives the marked
    option the *lowest* score. Those marks are scored by containment — does the
    bounding box of a cluster of strokes contain an option box — on a separate
    code path, and every answer records which rule fired.

The failure mode to distrust is a false mark: a coloured figure, a heading, or
JPEG chroma ringing along a black rule. The guard is the unsolved twins. Three
of the six papers are unsolved copies of sittings whose solved copy is also
here, and the detector must find nothing on them. Those counts are written into
the JSON as `controlHighlightPixels` and they are the only reason to believe any
of the rest.

    python3 scripts/asu/extract/eom-answerkey.py             # all six papers
    python3 scripts/asu/extract/eom-answerkey.py --calibrate # threshold grids
    python3 scripts/asu/extract/eom-answerkey.py --force     # ignore caches
"""
import argparse
import gzip
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import asu_module  # noqa: E402

MODULE, _ARGV = asu_module.parse_module(sys.argv[1:])
CACHE = asu_module.out_path(MODULE, "eom-renders")
OUT = asu_module.out_path(MODULE, "eom-answers.json")
CATEGORY = "EOM"

# --------------------------------------------------------------- paper config
#
# `hue` windows are in degrees and may wrap past 360. `sat` is (max-min)/max and
# `val` is the max channel, 0-255. Every number below was read off the
# `--calibrate` grid for that paper's page 2 against its unsolved twin's page 2,
# and the choice in each case is the loosest cell whose control count is zero or
# whose margin over the control is at least fifty-fold.
#
# The value floor is high here, unlike 108's, and for a reason that is the
# opposite of 108's: these are JPEG scans, not clean digital pages, and their
# chroma ringing lives on the dark edges of glyphs. On the 2023 control 209,024
# pixels pass a hue-and-saturation test at any brightness and exactly zero pass
# it at value >= 180. 108's marks were translucent ink over black glyphs and
# needed a floor near black; these marks are highlighter bands over white paper
# and are the brightest coloured thing on the page. Same reasoning, opposite
# answer, because the mark is a different physical object.
PINK = (310.0, 20.0)     # wraps through 360
BLUE = (190.0, 250.0)
# The blue correction ink is a fully saturated marker, not a pale highlighter,
# and it needs its own floor. At the pink paper's saturation of 0.03 the blue
# window catches 15,000 pixels a page of scan cast on the *unsolved* 2021 twin —
# more, page for page, than it catches on the solved copy — which is the
# signature of noise rather than ink. The real blue mark measures saturation
# 0.26-0.29, so the floor is set at 0.20 and the control falls to nothing.
BLUE_SAT = 0.20

# >>> FILL IN PER SOURCE, only after running `--calibrate` against that
# specific paper's rendered page and reading the true colour of its marks —
# see the module docstring above and the shared manual's "Recovering an
# answer key: one decision procedure". Kasr's own calibrated entries are not
# copied here: `sat`/`val`/`hue` thresholds are measured off Kasr's specific
# scans (JPEG compression artefacts, a particular highlighter's pink, a
# particular scanner's white point) and have no reason to hold for a
# different scan batch. Guessing them is exactly the "assume a watermark
# without checking" failure the manual documents for `repair-options.py`,
# applied to colour instead of text.
PAPERS: dict[str, dict] = {}

# ------------------------------------------------------------ shape filtering
# Scaled off 108's numbers, which were set at 150 dpi, for a 200 dpi render.
MIN_RUN = 16          # px: shortest horizontal run of mark pixels kept
MIN_W, MIN_H = 40, 10 # px: widest run, and rows, a region must reach
MIN_AREA = 1000       # px: total mark pixels in a region
CORE = 0.70           # fraction of an OCR word box treated as its ink core
CLOSE_IN = 0.08       # inches: the widest gap between mark pixels bridged in a row

# ------------------------------------------------------------- attribution
MIN_FRAC = 0.12       # an option must be this covered to count as marked
MIN_SHARE = 0.70      # ...and hold this share of all coverage on its question

# ------------------------------------------------------ stroke (annulus) rule
STROKE_VAL = 150      # px darker than this, and near-neutral, are candidate ink
STROKE_SAT = 0.35     # ...and no more saturated than this
STROKE_PAD = 4        # px a word box is dilated by before ink inside it is cut
STROKE_JOIN = 40      # px: two stroke fragments this close belong to one mark
STROKE_MIN_PX = 120   # px: total ink in a stroke cluster worth considering
CONTAIN_FRAC = 0.75   # fraction of an option box that must fall inside the hull
CONTAIN_SLACK = 3.0   # the hull may be at most this many option-boxes in area

RULE_FINGERPRINT = "v3-run%d-w%d-h%d-a%d-core%g" % (
    MIN_RUN, MIN_W, MIN_H, MIN_AREA, CORE)


# ------------------------------------------------------------------- rasters
def _ppm_path(sid, page, dpi, annots):
    return os.path.join(CACHE, "%s-p%02d-r%d-%s.ppm" % (
        sid, page, dpi, "on" if annots else "off"))


def render(sid, pdf, page, dpi, annots=True, force=False):
    """One page as a PPM on disk. `pdftoppm` draws annotations; ghostscript is
    used only for the annotations-off reference render, because it is the only
    one of the two that can be told to leave them out."""
    os.makedirs(CACHE, exist_ok=True)
    path = _ppm_path(sid, page, dpi, annots)
    if os.path.exists(path) and not force:
        return path
    if annots:
        stub = path[:-4]
        subprocess.run(["pdftoppm", "-f", str(page), "-l", str(page), "-r", str(dpi),
                        "-singlefile", pdf, stub], check=True, capture_output=True)
    else:
        subprocess.run(["gs", "-q", "-dNOPAUSE", "-dBATCH", "-dShowAnnots=false",
                        "-sDEVICE=ppmraw", "-r%d" % dpi,
                        "-dFirstPage=%d" % page, "-dLastPage=%d" % page,
                        "-sOutputFile=" + path, pdf], check=True, capture_output=True)
    return path


def read_ppm(path):
    with open(path, "rb") as fh:
        data = fh.read()
    assert data[:2] == b"P6", path
    pos, fields = 2, []
    while len(fields) < 3:
        while data[pos:pos + 1].isspace():
            pos += 1
        if data[pos:pos + 1] == b"#":
            while data[pos:pos + 1] not in (b"\n", b"\r"):
                pos += 1
            continue
        start = pos
        while not data[pos:pos + 1].isspace():
            pos += 1
        fields.append(int(data[start:pos]))
    pos += 1
    w, h, _ = fields
    return w, h, data[pos:pos + w * h * 3]


def hue(r, g, b):
    mx, mn = max(r, g, b), min(r, g, b)
    c = mx - mn
    if c == 0:
        return None
    if mx == r:
        return 60.0 * (((g - b) / c) % 6.0)
    if mx == g:
        return 60.0 * (((b - r) / c) + 2.0)
    return 60.0 * (((r - g) / c) + 4.0)


def in_window(h, window):
    lo, hi = window
    if lo <= hi:
        return lo <= h < hi
    return h >= lo or h < hi          # wraps past 360


# --------------------------------------------------------------- OCR: boxes
_NUMBER = re.compile(r"^(\d{1,3})\s*[-.)]$")
_LETTER = re.compile(r"^([a-dA-D])\s*[.)]$")


PSMS = (4, 6, 11)


def ocr_words(sid, pdf, page, dpi, psm=6, force=False):
    """Every OCR word on one page, boxed in the pixels of the render itself.

    Run against the annotations-off render where one exists: a highlight band
    drawn over a line of text lowers the contrast tesseract sees, and the point
    of this pass is the geometry of the *printed* option, not of the mark.
    """
    os.makedirs(CACHE, exist_ok=True)
    tsv = os.path.join(CACHE, "%s-p%02d-r%d-psm%d.tsv" % (sid, page, dpi, psm))
    if not os.path.exists(tsv) or force:
        png = os.path.join(CACHE, "%s-p%02d-r%d-ocr.png" % (sid, page, dpi))
        if not os.path.exists(png) or force:
            subprocess.run(["gs", "-q", "-dNOPAUSE", "-dBATCH", "-dShowAnnots=false",
                            "-sDEVICE=png16m", "-r%d" % dpi,
                            "-dFirstPage=%d" % page, "-dLastPage=%d" % page,
                            "-sOutputFile=" + png, pdf], check=True, capture_output=True)
        subprocess.run(["tesseract", png, tsv[:-4], "--psm", str(psm),
                        "-c", "preserve_interword_spaces=1", "tsv"],
                       check=True, capture_output=True)
    words = []
    with open(tsv, encoding="utf-8", errors="replace") as fh:
        head = fh.readline().rstrip("\n").split("\t")
        col = {name: i for i, name in enumerate(head)}
        for row in fh:
            f = row.rstrip("\n").split("\t")
            if len(f) < len(head) or f[col["level"]] != "5":
                continue
            text = f[col["text"]].strip()
            if not text:
                continue
            try:
                conf = float(f[col["conf"]])
            except ValueError:
                conf = -1.0
            x, y = int(f[col["left"]]), int(f[col["top"]])
            w, h = int(f[col["width"]]), int(f[col["height"]])
            words.append({"text": text, "conf": conf,
                          "row": (int(f[col["block_num"]]), int(f[col["par_num"]]),
                                  int(f[col["line_num"]])),
                          "x0": x, "y0": y, "x1": x + w, "y1": y + h})
    return words


def reading_order(words):
    """Words sorted into rows, then left to right inside each row.

    The rows are tesseract's own (block, paragraph, line) grouping rather than a
    re-clustering by y. Two attempts at re-clustering both failed on these
    papers and for opposite reasons: a fixed vertical band splits the 2022 scan,
    which is skewed by enough that one printed row drifts most of a line-height
    across the page, and a band that grows to fit its members welds each printed
    row to the one below it, which merged options c and d of half the questions
    on the 2021 paper into a single option. tesseract already solves layout
    analysis under skew, and a row it got wrong is visible as a merged option
    rather than as a silently wrong answer.
    """
    rows = {}
    for w in words:
        rows.setdefault(w["row"], []).append(w)
    out = []
    for _key, row in sorted(rows.items(),
                            key=lambda kv: (min(w["y0"] for w in kv[1]),
                                            min(w["x0"] for w in kv[1]))):
        out.extend(sorted(row, key=lambda c: c["x0"]))
    return out


def mcq_blocks(words):
    """Group OCR words into numbered questions with lettered options.

    A state machine over reading order rather than 108's line-prefix match,
    because these papers set two and sometimes four options on a single printed
    row, so a row is not an option and cannot be tested as one. A token that is
    a bare number and sits at the left margin opens a question; a token that is
    a bare letter opens an option; anything else joins whatever is open. That
    handles a wrapped option for free — its continuation is just more words
    before the next letter — and it never lets a figure caption become option d,
    because a caption is not preceded by a letter token.
    """
    ordered = reading_order(words)
    if not ordered:
        return []
    margin = min(w["x0"] for w in ordered) + 0.06 * (
        max(w["x1"] for w in ordered) - min(w["x0"] for w in ordered))
    blocks, cur, open_opt = [], None, None
    for w in ordered:
        mn = _NUMBER.match(w["text"])
        ml = _LETTER.match(w["text"])
        if mn and w["x0"] <= margin:
            number = int(mn.group(1))
            if 1 <= number <= 200:
                cur = {"number": number, "numberBox": [w["x0"], w["y0"], w["x1"], w["y1"]],
                       "stem": [], "options": []}
                blocks.append(cur)
                open_opt = None
                continue
        if ml and cur is not None:
            letter = ml.group(1).lower()
            cur["options"].append({"letter": letter, "words": [],
                                   "markerBox": [w["x0"], w["y0"], w["x1"], w["y1"]]})
            open_opt = cur["options"][-1]
            continue
        if cur is None:
            continue
        (open_opt["words"] if open_opt is not None else cur["stem"]).append(w)
    keep = []
    for b in blocks:
        opts = [o for o in b["options"] if o["words"]]
        if len(opts) < 2:
            continue
        seen, uniq = set(), []
        for o in opts:                      # a repeated letter means OCR noise
            if o["letter"] in seen:
                continue
            seen.add(o["letter"])
            o["box"] = [min(w["x0"] for w in o["words"]),
                        min(w["y0"] for w in o["words"]),
                        max(w["x1"] for w in o["words"]),
                        max(w["y1"] for w in o["words"])]
            o["text"] = " ".join(w["text"] for w in o["words"])
            uniq.append(o)
        b["options"] = uniq
        b["stemText"] = " ".join(w["text"] for w in b["stem"])
        b["merged"] = [o["letter"] for o in uniq if _MERGED.search(o["text"])]
        keep.append(b)
    return keep


# An option whose OCR text still carries another option's marker inside it is a
# box that spans two options. Scoring it would hand the mark on the second
# option to the first, with a confident-looking share, which is the worst thing
# this script could do. Those questions are refused rather than scored.
_MERGED = re.compile(r"(?:^|[\s.,])(?:[a-d]|[¢©])\s*[.)]{1,2}\s*[A-Za-z]")


def best_parse(sid, pdf, page, dpi, force):
    """Question blocks from whichever OCR mode read the page best.

    The 2022 and 2023 scans are skewed by roughly a degree, and tesseract's
    `--psm 6` (one uniform block) drifts across a printed row on them and welds
    two options into one box; `--psm 11` (sparse text) does not, but on the
    unskewed papers it fragments a wrapped option instead. Neither is right for
    all six, so both are run and each question keeps the parse that recovered
    more distinct, unmerged options. The mode that won is recorded per page.
    """
    parses = {}
    for psm in PSMS:
        words = ocr_words(sid, pdf, page, dpi, psm, force)
        parses[psm] = (words, mcq_blocks(words))
    merged, chosen = {}, {}
    for psm, (_words, blocks) in parses.items():
        for b in blocks:
            score = (len(b["options"]) - 2 * len(b["merged"]), -abs(4 - len(b["options"])))
            if b["number"] not in merged or score > merged[b["number"]][0]:
                merged[b["number"]] = (score, b)
                chosen[b["number"]] = psm
    out = []
    for number in sorted(merged):
        block = merged[number][1]
        block["ocrMode"] = "psm%d" % chosen[number]
        out.append(block)
    out.sort(key=lambda b: (min(o["box"][1] for o in b["options"]), b["number"]))
    words = max((p[0] for p in parses.values()), key=len)
    return out, words


def text_column(words):
    """The rectangle the printed text occupies, as a guard against figures and
    page borders. 108 constrained detection to the text column for the same
    reason and logged what it rejected; that log is `regionsOutsideColumn`."""
    if not words:
        return None
    xs0 = sorted(w["x0"] for w in words)
    xs1 = sorted(w["x1"] for w in words)
    ys0 = sorted(w["y0"] for w in words)
    ys1 = sorted(w["y1"] for w in words)
    return [xs0[0] - 30, ys0[0] - 20, xs1[-1] + 30, ys1[-1] + 20]


# ------------------------------------------------------------------- regions
def runs_from_flags(flags, w, h, min_run, close=0):
    """Row runs of set pixels, after closing gaps of up to `close` pixels.

    The closing is not cosmetic and it is what 108 did not need. Its papers were
    digital pages where the highlight was painted over the glyphs; here every
    paper is a scan, the value floor that keeps JPEG chroma ringing out also
    removes the dark glyph pixels, and a highlight band therefore arrives as a
    line of short fragments with a hole at every letter. Measured on page 3 of
    the 2021 paper: without closing, eleven bands that a reader sees at a glance
    survive the shape filter as sixteen fragments and only six of the eleven
    answers are recoverable. Closing the letter-width gaps first makes each band
    one region again. It is also the annulus fix from the other direction — a
    hand-drawn circle's arcs are joined by the same operation.
    """
    runs = []
    for y in range(h):
        row = y * w
        x = 0
        while x < w:
            if flags[row + x]:
                start = x
                end = x
                while x < w:
                    if flags[row + x]:
                        end = x + 1
                        x += 1
                        continue
                    gap = x
                    while gap < w and not flags[row + gap]:
                        gap += 1
                    if gap - x <= close and gap < w:
                        x = gap
                        continue
                    break
                if end - start >= min_run:
                    runs.append((y, start, end))
                x = max(x, end)
            else:
                x += 1
    return runs


def regions(runs, min_h=MIN_H, min_w=MIN_W, min_area=MIN_AREA):
    """Group row runs into connected regions, then drop the specks.

    Union-find, as in 108: two runs join when they sit on consecutive rows and
    overlap in x. A running merge welds every band on the page into one region.
    Kept verbatim in spirit because it is also what makes the stroke path work —
    the top and bottom arcs of a hand-drawn circle stay two separate regions
    here, and are only brought together later, deliberately, by the hull.
    """
    runs = sorted(tuple(r) for r in runs)
    n = len(runs)
    parent = list(range(n))

    def find(i):
        while parent[i] != i:
            parent[i] = parent[parent[i]]
            i = parent[i]
        return i

    by_row = {}
    for i, (y, _a, _b) in enumerate(runs):
        by_row.setdefault(y, []).append(i)
    for y, idxs in by_row.items():
        above = by_row.get(y - 1, ())
        for i in idxs:
            _, x0, x1 = runs[i]
            for j in above:
                _, ax0, ax1 = runs[j]
                if not (x1 <= ax0 or x0 >= ax1):
                    ri, rj = find(i), find(j)
                    if ri != rj:
                        parent[rj] = ri

    groups = {}
    for i, run in enumerate(runs):
        groups.setdefault(find(i), []).append(run)

    kept, dropped, dropped_px = [], 0, 0
    for members in groups.values():
        rows = {}
        for y, x0, x1 in members:
            lo, hi = rows.get(y, (x0, x1))
            rows[y] = (min(lo, x0), max(hi, x1))
        px = sum(x1 - x0 for _y, x0, x1 in members)
        widest = max(hi - lo for lo, hi in rows.values())
        if len(rows) < min_h or widest < min_w or px < min_area:
            dropped += 1
            dropped_px += px
            continue
        kept.append({"x0": min(lo for lo, _h in rows.values()),
                     "x1": max(hi for _l, hi in rows.values()),
                     "y0": min(rows), "y1": max(rows),
                     "px": px, "rows": rows})
    kept.sort(key=lambda c: (c["y0"], c["x0"]))
    return kept, dropped, dropped_px


# ----------------------------------------------------------- the fill detector
def colour_mask(path, sat_min, val_min, window):
    """Pixels of one hue family bright and coloured enough to be highlighter."""
    w, h, px = read_ppm(path)
    flags = bytearray(w * h)
    red, blu = px[0::3], px[2::3]
    n = 0
    hues = []
    # R == B is achromatic and is most of any page; skipping it first is what
    # keeps a pure-Python scan of four million pixels under two seconds.
    for i in (i for i, (r, b) in enumerate(zip(red, blu)) if r != b):
        r, g, b = px[3 * i], px[3 * i + 1], px[3 * i + 2]
        mx = r if r >= g and r >= b else (g if g >= b else b)
        if mx < val_min:
            continue
        mn = r if r <= g and r <= b else (g if g <= b else b)
        if (mx - mn) / mx < sat_min:
            continue
        hh = hue(r, g, b)
        if hh is None or not in_window(hh, window):
            continue
        flags[i] = 1
        n += 1
        if len(hues) < 40000:
            hues.append(hh)
    return w, h, flags, n, hues


def fill_page(sid, pdf, page, cfg, force):
    """Mark regions on one page of a highlighted paper, by hue family."""
    on = render(sid, pdf, page, cfg["dpi"], True, force)
    off = render(sid, pdf, page, cfg["dpi"], False, force)
    out = {"families": {}, "noise": {}}
    for name, window in (("pink", PINK), ("blue", BLUE)):
        sat = cfg["sat"] if name == "pink" else max(cfg["sat"], BLUE_SAT)
        w, h, flags, npx, hues = colour_mask(on, sat, cfg["val"], window)
        close = int(round(cfg["dpi"] * CLOSE_IN))
        runs = runs_from_flags(flags, w, h, MIN_RUN, close)
        regs, dropped, dropped_px = regions(runs)
        _w2, _h2, _f2, nref, _hu = colour_mask(off, sat, cfg["val"], window)
        out["families"][name] = {
            "regions": regs, "pixels": npx, "referencePixels": nref,
            "regionsDroppedAsTooSmall": dropped, "pixelsDroppedAsTooSmall": dropped_px,
            "hueMin": round(min(hues), 1) if hues else None,
            "hueMax": round(max(hues), 1) if hues else None,
        }
        out["noise"][name] = {
            "annotationsOnPixels": npx,
            "annotationsOffPixels": nref,
            "marginRatio": round(npx / nref, 2) if nref else None,
        }
        out["width"], out["height"] = w, h
    return out


# --------------------------------------------------------- the stroke detector
def stroke_page(sid, pdf, page, cfg, words, force):
    """Non-text ink on one page: dark, near-neutral, and outside every word box.

    This is the part 108 had no case for. Its papers are all filled highlights,
    where the mark and the option box overlap and intersection scores them. A
    pencil circle does not overlap the text it marks — it surrounds it — and a
    tick sits beside the option rather than on it, so the pixels that identify
    the answer are precisely the pixels that fall *outside* every word box.

    So the sign is flipped: printed glyphs are cut out, dilated by a few pixels
    to take their antialiasing with them, and whatever dark ink remains inside
    the text column is a candidate stroke. That also removes the printed rules
    and page furniture, since those sit outside the column.
    """
    on = render(sid, pdf, page, cfg["dpi"], True, force)
    w, h, px = read_ppm(on)
    col = text_column(words)
    flags = bytearray(w * h)
    if col is None:
        return {"regions": [], "pixels": 0, "width": w, "height": h,
                "regionsOutsideColumn": 0}
    cx0, cy0, cx1, cy1 = (max(0, int(col[0])), max(0, int(col[1])),
                          min(w, int(col[2])), min(h, int(col[3])))
    blocked = bytearray(w * h)
    for word in words:
        for y in range(max(cy0, word["y0"] - STROKE_PAD), min(cy1, word["y1"] + STROKE_PAD)):
            row = y * w
            for x in range(max(cx0, word["x0"] - STROKE_PAD),
                           min(cx1, word["x1"] + STROKE_PAD)):
                blocked[row + x] = 1
    n = 0
    for y in range(cy0, cy1):
        row = y * w
        for x in range(cx0, cx1):
            i = row + x
            if blocked[i]:
                continue
            r, g, b = px[3 * i], px[3 * i + 1], px[3 * i + 2]
            mx = r if r >= g and r >= b else (g if g >= b else b)
            if mx > STROKE_VAL:
                continue
            mn = r if r <= g and r <= b else (g if g <= b else b)
            if mx and (mx - mn) / mx > STROKE_SAT:
                continue
            flags[i] = 1
            n += 1
    runs = runs_from_flags(flags, w, h, 3, int(round(cfg["dpi"] * CLOSE_IN)))
    regs, dropped, dropped_px = regions(runs, min_h=3, min_w=6, min_area=40)
    return {"regions": regs, "pixels": n, "width": w, "height": h,
            "regionsDroppedAsTooSmall": dropped,
            "column": [cx0, cy0, cx1, cy1]}


def stroke_clusters(regs):
    """Bring the fragments of one hand mark back together.

    `regions` deliberately keeps the top and bottom arcs of a circle apart —
    they are not connected in any row — so a hollow mark arrives here as two or
    four thin pieces with a hole where the answer is. Fragments whose bounding
    boxes come within STROKE_JOIN pixels of each other are one mark, and the
    cluster's hull is what gets scored. This is the whole of the annulus fix.
    """
    items = list(regs)
    parent = list(range(len(items)))

    def find(i):
        while parent[i] != i:
            parent[i] = parent[parent[i]]
            i = parent[i]
        return i

    for i in range(len(items)):
        for j in range(i + 1, len(items)):
            a, b = items[i], items[j]
            dx = max(0, max(a["x0"], b["x0"]) - min(a["x1"], b["x1"]))
            dy = max(0, max(a["y0"], b["y0"]) - min(a["y1"], b["y1"]))
            if dx <= STROKE_JOIN and dy <= STROKE_JOIN:
                ri, rj = find(i), find(j)
                if ri != rj:
                    parent[rj] = ri
    out = {}
    for i, reg in enumerate(items):
        out.setdefault(find(i), []).append(reg)
    hulls = []
    for members in out.values():
        px = sum(m["px"] for m in members)
        if px < STROKE_MIN_PX:
            continue
        hulls.append({"x0": min(m["x0"] for m in members),
                      "y0": min(m["y0"] for m in members),
                      "x1": max(m["x1"] for m in members),
                      "y1": max(m["y1"] for m in members),
                      "px": px, "fragments": len(members)})
    hulls.sort(key=lambda c: (c["y0"], c["x0"]))
    return hulls


# ------------------------------------------------------------------ scoring
def core_box(box):
    x0, y0, x1, y1 = box
    pad = (y1 - y0) * (1.0 - CORE) / 2.0
    return x0, y0 + pad, x1, y1 - pad


def covered(regs, box):
    """Mark area inside one option's ink core, measured row by row so that a
    wrapped, L-shaped band contributes only the rows it actually reaches."""
    x0, y0, x1, y1 = core_box(box)
    total = 0.0
    for c in regs:
        if c["y1"] + 1 <= y0 or c["y0"] >= y1 or c["x1"] <= x0 or c["x0"] >= x1:
            continue
        for y, (lo, hi) in c["rows"].items():
            if not (y0 <= y + 0.5 <= y1):
                continue
            ix = min(x1, hi) - max(x0, lo)
            if ix > 0:
                total += ix
    return total, max((x1 - x0) * (y1 - y0), 1.0)


def score_fill(block, regs):
    """108's rule, unchanged: intersection of mark and option, largest share wins."""
    per_option, claimed = [], 0.0
    for opt in block["options"]:
        num, den = covered(regs, opt["box"])
        claimed += num
        per_option.append({"optionLetter": opt["letter"],
                           "overlapFraction": round(num / den, 4),
                           "overlapPixels": round(num, 1)})
    ranked = sorted(per_option, key=lambda o: -o["overlapFraction"])
    total = sum(o["overlapFraction"] for o in per_option)
    if not ranked or ranked[0]["overlapFraction"] < MIN_FRAC:
        return None, 0.0, per_option, ("no mark region covers any option box by at "
                                       "least %.0f%% of its area" % (MIN_FRAC * 100))
    share = ranked[0]["overlapFraction"] / total if total else 0.0
    if share < MIN_SHARE:
        return None, round(share, 4), per_option, (
            "the mark spans more than one option: "
            + ", ".join("%s=%.2f" % (o["optionLetter"], o["overlapFraction"])
                        for o in ranked if o["overlapFraction"] > 0))
    return ranked[0]["optionLetter"], round(share, 4), per_option, None


def score_stroke(block, hulls):
    """Containment, not intersection: which option box falls inside the hull.

    A hull that swallows two options is not resolved to the nearer one. It is
    exactly the loosely drawn circle around two answers that the brief asked to
    be caught, and it comes back null with the geometry that made it so. A hull
    far larger than an option box is a scribble or a margin stroke, not a
    circle, and is refused by CONTAIN_SLACK before it can claim anything.
    """
    per_option, best_hull = [], None
    for opt in block["options"]:
        x0, y0, x1, y1 = opt["box"]
        area = max((x1 - x0) * (y1 - y0), 1.0)
        best = 0.0
        for hull in hulls:
            ix = min(x1, hull["x1"]) - max(x0, hull["x0"])
            iy = min(y1, hull["y1"]) - max(y0, hull["y0"])
            if ix <= 0 or iy <= 0:
                continue
            hull_area = (hull["x1"] - hull["x0"]) * (hull["y1"] - hull["y0"])
            if hull_area > area * CONTAIN_SLACK:
                continue
            frac = (ix * iy) / area
            if frac > best:
                best, best_hull = frac, hull
        per_option.append({"optionLetter": opt["letter"],
                           "containedFraction": round(best, 4)})
    ranked = sorted(per_option, key=lambda o: -o["containedFraction"])
    inside = [o for o in per_option if o["containedFraction"] >= CONTAIN_FRAC]
    if not inside:
        return None, 0.0, per_option, None, (
            "no stroke hull contains an option box by at least %.0f%% of its area"
            % (CONTAIN_FRAC * 100))
    if len(inside) > 1:
        return None, 0.0, per_option, best_hull, (
            "one stroke encloses more than one option: "
            + ", ".join("%s=%.2f" % (o["optionLetter"], o["containedFraction"])
                        for o in inside))
    runner = ranked[1]["containedFraction"] if len(ranked) > 1 else 0.0
    conf = round(ranked[0]["containedFraction"] - runner, 4)
    return ranked[0]["optionLetter"], conf, per_option, best_hull, None


def confidence_word(x):
    return "high" if x >= 0.9 else ("medium" if x >= 0.7 else "low")



# ------------------------------------------------------- what a mark means
#
# A marked option is not automatically the answer. On a negative stem — "all of
# the following EXCEPT", "which is NOT" — an examiner may instead tick the true
# distractors and leave the odd one out bare, and keying on "marked means
# correct" inverts every such question without erroring. So the polarity of each
# stem is recorded, and the convention a paper uses is *inferred from that
# paper's own marks* rather than assumed: if no negative stem on the paper
# carries more than one mark, the paper marks answers; if negative stems
# routinely carry several marks, it marks distractors. A paper that does both is
# reported as mixed and its negative stems are refused rather than resolved by
# majority.
_NEGATIVE = re.compile(r"\b(except|not\b|isn'?t|aren'?t|false|incorrect|untrue|"
                       r"wrong|least likely)\b", re.I)


def stem_polarity(stem):
    return "negative" if _NEGATIVE.search(stem or "") else "positive"


def mark_convention(rows):
    """Which convention this paper's marks follow, read off its own marks.

    The test is not "do negative stems carry several marks" on its own — a paper
    where a fifth of *every* question carries two overlapping bands would fail
    that test for a reason that has nothing to do with polarity. It is whether
    negative stems carry several marks *at a materially higher rate than
    positive ones do*. On the 2022 paper the two rates are 13% and 11%, which is
    no signal at all, so its double marks are double marks and not a distractor
    convention; on the 2021 paper they are 0% and 1%. A paper where the negative
    rate genuinely runs away from the positive rate is reported as marking
    distractors, and one in between is reported unknown and its negative stems
    refused rather than settled by a majority vote.
    """
    neg = [r for r in rows if r["stemPolarity"] == "negative"]
    pos = [r for r in rows if r["stemPolarity"] == "positive"]
    if not neg:
        return ("marks-answer" if pos else "unknown",
                "no negative stem on this paper; %d positive stems" % len(pos))
    neg_rate = sum(1 for r in neg if r["marksOnQuestion"] > 1) / len(neg)
    pos_rate = (sum(1 for r in pos if r["marksOnQuestion"] > 1) / len(pos)
                if pos else 0.0)
    basis = ("%.0f%% of the %d negative stems carry more than one mark against "
             "%.0f%% of the %d positive stems" % (
                 neg_rate * 100, len(neg), pos_rate * 100, len(pos)))
    if neg_rate >= 0.5 and neg_rate >= 2 * max(pos_rate, 0.05):
        return "marks-distractors", basis
    if neg_rate <= max(2 * pos_rate, pos_rate + 0.10):
        return "marks-answer", basis
    return "unknown", basis + "; the gap is too large to call one convention and "\
                              "too small to call the other"


def annot_diff(sid, pdf, page, dpi, force):
    """How many pixels the page's annotations put on it — a diagnostic, not the
    extractor. Ghostscript renders these files deterministically: on an unsolved
    copy the annotations-on and annotations-off renders come out byte-identical,
    so this number is an exact count of annotation ink rather than an estimate
    of it, and it is the per-page margin that separates "this page carries no
    marks" from "my colour threshold slipped". A flattened mark contributes
    nothing to it, which is exactly why it cannot be the extractor.
    """
    on = os.path.join(CACHE, "%s-p%02d-r%d-gson.ppm" % (sid, page, dpi))
    if not os.path.exists(on) or force:
        subprocess.run(["gs", "-q", "-dNOPAUSE", "-dBATCH", "-sDEVICE=ppmraw",
                        "-r%d" % dpi, "-dFirstPage=%d" % page, "-dLastPage=%d" % page,
                        "-sOutputFile=" + on, pdf], check=True, capture_output=True)
    off = render(sid, pdf, page, dpi, False, force)
    _w, _h, a = read_ppm(on)
    _w2, _h2, b = read_ppm(off)
    if len(a) != len(b):
        return None
    if a == b:
        return 0
    return sum(1 for i in range(0, len(a), 3)
               if a[i] != b[i] or a[i + 1] != b[i + 1] or a[i + 2] != b[i + 2])


# ------------------------------------------------------------------ assembly
def sources():
    return [s for s in asu_module.manifest_sources()
            if s.get("moduleId") == MODULE and s.get("sourceCategory") == CATEGORY]


def pages_of(pdf):
    raw = subprocess.run(["pdfinfo", pdf], capture_output=True, check=True).stdout
    for line in raw.decode("utf-8", "replace").splitlines():
        if line.startswith("Pages:"):
            return int(line.split()[1])
    return 0


def run_source(src, force):
    sid, pdf = src["sourceId"], src["absolutePath"]
    cfg = PAPERS[sid]
    npages = pages_of(pdf)
    answers, page_stats = [], []
    position = 0
    for page in range(1, npages + 1):
        blocks, words = best_parse(sid, pdf, page, cfg["dpi"], force)
        col = text_column(words)
        stat = {"page": page, "questionsFound": len(blocks), "ocrWords": len(words),
                "ocrModes": sorted({b["ocrMode"] for b in blocks}),
                "questionsWithMergedOptionBox": sum(1 for b in blocks if b["merged"]),
                "annotationDiffPixels": annot_diff(sid, pdf, page, cfg["dpi"], force)}
        if cfg["markPath"] == "fill":
            found = fill_page(sid, pdf, page, cfg, force)
            regs, offside = [], []
            for name, fam in found["families"].items():
                for r in fam["regions"]:
                    inside = col and (r["x0"] >= col[0] and r["x1"] <= col[2]
                                      and r["y0"] >= col[1] and r["y1"] <= col[3])
                    r["family"] = name
                    (regs if inside else offside).append(r)
            stat["markPixels"] = sum(f["pixels"] for f in found["families"].values())
            stat["markRegions"] = len(regs)
            stat["regionsOutsideColumn"] = len(offside)
            stat["regionsOutsideColumnGeometry"] = [
                {"box": [r["x0"], r["y0"], r["x1"], r["y1"]], "pixels": r["px"],
                 "family": r["family"]} for r in offside]
            stat["noise"] = found["noise"]
            hulls = None
        else:
            found = stroke_page(sid, pdf, page, cfg, words, force)
            hulls = stroke_clusters(found["regions"])
            regs = found["regions"]
            stat["markPixels"] = found["pixels"]
            stat["strokeFragments"] = len(found["regions"])
            stat["strokeHulls"] = len(hulls)
        page_stats.append(stat)

        for block in blocks:
            position += 1
            note, geometry = "", None
            if cfg["markPath"] == "fill":
                letter, share, per_option, reason = score_fill(block, regs)
                rule = "intersection"
                families = sorted({r["family"] for r in regs
                                   if _overlaps(r, block)})
                if len(families) > 1:
                    letter, reason = None, (
                        "two ink colours on one question (%s); a later correction "
                        "cannot be ranked against the original by geometry"
                        % ", ".join(families))
                if families:
                    note = "ink colour: " + ", ".join(families)
            else:
                letter, share, per_option, hull, reason = score_stroke(block, hulls)
                rule = "containment"
                if hull:
                    geometry = {"strokeHull": [hull["x0"], hull["y0"],
                                               hull["x1"], hull["y1"]],
                                "fragments": hull["fragments"], "inkPixels": hull["px"]}
            if block["merged"] and letter:
                letter, reason = None, (
                    "OCR read options %s as one box, so a mark on either would be "
                    "credited to the first; refused rather than scored"
                    % ", ".join(block["merged"]))
            if len(block["options"]) < 4 and letter is None and reason:
                reason += ("; OCR recovered only %d of the option boxes on this "
                           "question" % len(block["options"]))
            row = {
                "joinKey": "%s:s1:p%03d" % (sid, position),
                "sourceId": sid,
                "page": page,
                "printedNumber": block["number"],
                "positionInSection": position,
                "answer": letter.upper() if letter else None,
                "overlapShare": share,
                "confidence": confidence_word(share) if letter else "low",
                "ambiguous": letter is None,
                "rule": rule,
                "note": note,
                "optionsFound": len(block["options"]),
                "stemPolarity": stem_polarity(block["stemText"]),
                "marksOnQuestion": sum(1 for o in per_option
                                       if o.get("overlapFraction",
                                                o.get("containedFraction", 0.0))
                                       >= MIN_FRAC),
                "markConvention": "unknown",
                "ocrMode": block["ocrMode"],
                "unresolvedReason": reason,
                "optionScores": per_option,
                "optionBoxes": {o["letter"]: o["box"] for o in block["options"]},
                "stemOcr": block["stemText"],
            }
            if geometry:
                row["geometry"] = geometry
            answers.append(row)

    convention, basis = mark_convention(answers)
    for row in answers:
        row["markConvention"] = convention
        row["markConventionBasis"] = basis
        if row["answer"] is None:
            continue
        if convention == "marks-answer":
            continue
        if convention == "marks-distractors" and row["stemPolarity"] == "negative":
            row["note"] = (row["note"] + "; " if row["note"] else "") + (
                "this paper marks the distractors on negative stems, so the "
                "marked option is not the answer")
            row["answer"], row["ambiguous"] = None, True
            row["unresolvedReason"] = (
                "negative stem on a paper whose marks indicate distractors; the "
                "unmarked option is not identifiable from one mark")
        elif convention == "unknown" and row["stemPolarity"] == "negative":
            row["answer"], row["ambiguous"] = None, True
            row["unresolvedReason"] = (
                "negative stem on a paper that does not use one convention "
                "consistently (%s); refused rather than resolved by majority"
                % basis)
    return answers, page_stats, npages


def _overlaps(reg, block):
    for opt in block["options"]:
        x0, y0, x1, y1 = core_box(opt["box"])
        if reg["x1"] > x0 and reg["x0"] < x1 and reg["y1"] + 1 > y0 and reg["y0"] < y1:
            return True
    return False


def calibrate(srcs):
    """The grid the thresholds in PAPERS were read off, page 2 of every paper."""
    sats = [0.03, 0.04, 0.05, 0.06, 0.08, 0.10, 0.15, 0.20, 0.25]
    vals = [24, 128, 180, 200, 220, 235]
    for src in srcs:
        sid, pdf = src["sourceId"], src["absolutePath"]
        cfg = PAPERS.get(sid)
        if not cfg:
            continue
        path = render(sid, pdf, 2, cfg["dpi"], True, False)
        w, h, px = read_ppm(path)
        grid = {(s, v): 0 for s in sats for v in vals}
        for i in range(0, len(px), 3):
            r, g, b = px[i], px[i + 1], px[i + 2]
            mx, mn = max(r, g, b), min(r, g, b)
            if mx < 24 or mx == mn:
                continue
            s = (mx - mn) / mx
            if s < sats[0]:
                continue
            hh = hue(r, g, b)
            if not in_window(hh, PINK):
                continue
            for S in sats:
                if s < S:
                    break
                for V in vals:
                    if mx >= V:
                        grid[(S, V)] += 1
        print("== %s  %s  (%s)" % (sid, os.path.basename(pdf), cfg["role"]))
        print("   sat\\val " + " ".join("%8d" % v for v in vals))
        for S in sats:
            print("   %.2f    " % S + " ".join("%8d" % grid[(S, v)] for v in vals))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--calibrate", action="store_true")
    ap.add_argument("--only", help="one sourceId")
    # Parse from the args left over after asu_module.parse_module() already
    # pulled `--module X` out at import time (see MODULE, _ARGV above) —
    # argparse does not know that flag and would refuse it otherwise.
    args = ap.parse_args(_ARGV)

    srcs = [s for s in sources() if s["sourceId"] in PAPERS]
    srcs.sort(key=lambda s: s["absolutePath"])
    if args.calibrate:
        calibrate(srcs)
        return
    if args.only:
        srcs = [s for s in srcs if s["sourceId"] == args.only]

    doc = {"moduleId": MODULE, "universityId": "asu", "sourceCategory": CATEGORY,
           "generatedBy": "scripts/asu/extract/eom-answerkey.py",
           "files": [], "answers": []}
    if os.path.exists(OUT):
        try:
            with open(OUT, encoding="utf-8") as fh:
                prev = json.load(fh)
            keep = {s["sourceId"] for s in srcs}
            doc["files"] = [f for f in prev.get("files", [])
                            if f["sourceId"] not in keep]
            doc["answers"] = [a for a in prev.get("answers", [])
                              if a["sourceId"] not in keep]
        except (ValueError, KeyError):
            pass

    for src in srcs:
        sid = src["sourceId"]
        cfg = PAPERS[sid]
        rows, stats, npages = run_source(src, args.force)
        control = cfg["role"] == "control"
        entry = {
            "file": os.path.basename(src["absolutePath"]),
            "sourceId": sid,
            "role": cfg["role"],
            "pages": npages,
            "mechanism": "raster",
            "markPath": cfg["markPath"],
            "dpi": cfg["dpi"],
            "hsv": {"hue": list(PINK), "sat": cfg["sat"], "val": cfg["val"]},
            "hsvNote": ("hue window wraps past 360; a second window %s is scanned "
                        "for the blue correction ink" % (list(BLUE),)),
            "sampledFrom": cfg.get("sampledFrom"),
            "isControl": control,
            "controlHighlightPixels": (sum(s.get("markPixels", 0) for s in stats)
                                       if control else 0),
            "controlMarkRegions": (sum(s.get("markRegions", 0) or 0 for s in stats)
                                   if control else 0),
            "controlStrokeHulls": (sum(s.get("strokeHulls", 0) or 0 for s in stats)
                                   if control else 0),
            "controlAnswersAttributed": (sum(1 for r in rows if r["answer"])
                                         if control else 0),
            "annotationInkPixels": sum(s.get("annotationDiffPixels") or 0
                                       for s in stats),
            "colourReferencePixels": sum(
                (s.get("noise") or {}).get(fam, {}).get("annotationsOffPixels") or 0
                for s in stats for fam in ("pink", "blue")),
            "questions": len(rows),
            "recovered": sum(1 for r in rows if r["answer"]),
            "ambiguous": sum(1 for r in rows if r["ambiguous"]),
            "markConvention": rows[0]["markConvention"] if rows else "unknown",
            "markConventionBasis": rows[0].get("markConventionBasis") if rows else None,
            "negativeStems": sum(1 for r in rows if r["stemPolarity"] == "negative"),
            "recoveredByRule": {
                "intersection": sum(1 for r in rows
                                    if r["answer"] and r["rule"] == "intersection"),
                "containment": sum(1 for r in rows
                                   if r["answer"] and r["rule"] == "containment")},
            "pageStatistics": stats,
        }
        doc["files"].append(entry)
        doc["answers"].extend([] if control else rows)
        if control:
            entry["controlRows"] = [
                {"joinKey": r["joinKey"], "page": r["page"],
                 "printedNumber": r["printedNumber"], "answer": r["answer"]}
                for r in rows if r["answer"]]
        doc["files"].sort(key=lambda f: f["file"])
        with open(OUT, "w", encoding="utf-8") as fh:
            json.dump(doc, fh, indent=1, ensure_ascii=False)
            fh.write("\n")
        sys.stderr.write("%-46s %-8s pages %2d  q %3d  recovered %3d  ambiguous %2d"
                         "  markPx %d\n" % (
                             os.path.basename(src["absolutePath"]), cfg["role"],
                             npages, len(rows), entry["recovered"],
                             entry["ambiguous"],
                             sum(s.get("markPixels", 0) for s in stats)))


if __name__ == "__main__":
    main()
