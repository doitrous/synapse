#!/usr/bin/env python3
"""The 108 INT end-of-year answers, recovered from the ink rather than the text.

Every EOY sitting in this module exists twice, as a solved and an unsolved PDF,
and the solved copy marks the right option by drawing a pink highlight over it.
Drawing is not text. `pdftotext` returns byte-identical output for the two
copies, so `eoy.py` — which reads only text — correctly recorded every answer as
null. It was not failing; the answers were never in the layer it reads. This
script reads the other layer.

It renders each MCQ page to pixels at a known DPI, classifies pixels as
highlight by hue/saturation/value rather than by any hardcoded RGB triple (the
2025 paper's highlight and the 2024 paper's are different colours, and the 2024
one is an Apple Markup ink stroke with alpha, so its rendered colour varies),
groups them into rectangles, and intersects those rectangles with the option
line boxes that `pdftotext -bbox-layout` reports in PDF points. The option whose
boxes the highlight covers is the answer.

    python3 scripts/kasr/extract/108-INT/answerkey.py            # all four EOY sources
    python3 scripts/kasr/extract/108-INT/answerkey.py --force    # ignore the mask cache
    python3 scripts/kasr/extract/108-INT/answerkey.py --report   # print the summary only

Output is `answerkey.json`, keyed by sourceId, page and the paper's own printed
question number, and carrying the `sourceId:sN:n` questionId that `eoy.json`
assigns to the same question, so the two join on that field alone. It is a
separate file on purpose: `eoy.py` and `eoy.json` belong to another pass and are
not touched here.

The failure mode to distrust is a false highlight. Anything pink and bright
enough — a histology micrograph, a coloured heading, JPEG ringing along a black
rule — can be mistaken for a mark, and a detector that hallucinates one answer
has silently poisoned all of them. The guard is the unsolved copies: the same
detector, the same pages, the same option boxes, and it must return zero. That
count is written into the JSON as `control` on every run and is the only reason
to believe the solved-copy numbers. The second failure mode is a real highlight
that straddles two options or misses them all; those are never resolved by
guessing. They are written with `optionLetter: null`, the reason, and the
per-option overlap fractions that made them ambiguous.
"""
import argparse
import gzip
import html
import json
import os
import re
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
MANIFEST = os.path.join(REPO, "docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json")
EOY = os.path.join(HERE, "eoy.json")
RENDERS = os.path.join(HERE, "renders")
OUT = os.path.join(HERE, "answerkey.json")

# ---------------------------------------------------------------- colour rule
#
# Sampled from the rendered pages rather than assumed. The modal highlight
# colour is (255,167,230) on the 2025 paper and (233,196,211)/(247,189,211) on
# the 2024 one — H 317 and H 336-338. Nothing else on an MCQ page of either
# paper is both this bright and this coloured: the body text, the rules and the
# printed border are pure greys (R==G==B), so they fail the saturation floor
# outright. The window below is deliberately wider than the two observed hues in
# both directions, to survive anti-aliasing and the ink stroke's varying alpha,
# and still narrow enough to exclude the purple (H 264-283) and blue (H 193-220)
# that appear in the figures further into both papers.
#
# The value floor is deliberately near the black point rather than near white.
# The 2024 mark is a translucent Apple Markup ink stroke, so where it crosses a
# glyph it composites to a dark maroon — (58,21,36), the same H336 at S0.64 —
# and a floor set up at V>=200 punches the band full of glyph-shaped holes,
# shatters it into runs too short to survive the shape filter, and loses the
# answer. Ink over paper and ink over letters are the same ink. Dropping the
# floor to 24 costs nothing: on the MCQ pages of both unsolved copies the count
# of pixels passing this rule is zero either way.
DPI = 150
HUE_MIN, HUE_MAX = 295.0, 355.0   # degrees; magenta/pink band
SAT_MIN = 0.10                    # (max-min)/max
VAL_MIN = 24                      # max channel, 0-255; below this the 8-bit hue is noise

# ------------------------------------------------------------ shape filtering
MIN_RUN = 12         # px: shortest horizontal run of highlight kept, ~0.08in
MIN_W, MIN_H = 30, 8 # px: widest run, and number of rows, a region must reach
MIN_AREA = 600       # px: total highlight pixels in a region
CORE = 0.60          # the fraction of a text line box treated as its ink core

# ------------------------------------------------------------ attribution
MIN_FRAC = 0.12     # an option must be this covered to count as marked at all
MIN_SHARE = 0.70    # ...and hold this share of all coverage on its question

# Stamped into every cached mask so that changing any of the above silently
# re-renders instead of quietly serving geometry built under the old rule.
RULE_FINGERPRINT = "dpi%d-h%g_%g-s%g-v%d-run%d" % (
    DPI, HUE_MIN, HUE_MAX, SAT_MIN, VAL_MIN, MIN_RUN)


# --------------------------------------------------------------------- layout
_PAGE = re.compile(r'<page width="([\d.]+)" height="([\d.]+)">')
_LINE = re.compile(r'<line xMin="([\d.eE+-]+)" yMin="([\d.eE+-]+)" '
                   r'xMax="([\d.eE+-]+)" yMax="([\d.eE+-]+)">(.*?)</line>', re.S)
_WORD = re.compile(r'<word xMin="([\d.eE+-]+)" yMin="([\d.eE+-]+)" '
                   r'xMax="([\d.eE+-]+)" yMax="([\d.eE+-]+)">(.*?)</word>', re.S)
_NUM = re.compile(r'^(\d{1,2})\s*[.)]\s*(.*)$')
_OPT = re.compile(r'^([a-eA-E])\s*[.)]\s*(.*)$')


def page_layout(pdf, page):
    """Every text line on one page, with its bounding box in PDF points."""
    raw = subprocess.run(
        ["pdftotext", "-bbox-layout", "-f", str(page), "-l", str(page), pdf, "-"],
        capture_output=True, check=True).stdout.decode("utf-8", "replace")
    m = _PAGE.search(raw)
    width, height = float(m.group(1)), float(m.group(2))
    lines = []
    for lm in _LINE.finditer(raw):
        words = [html.unescape(w.group(5)) for w in _WORD.finditer(lm.group(5))]
        if not words:
            continue
        lines.append({
            "x0": float(lm.group(1)), "y0": float(lm.group(2)),
            "x1": float(lm.group(3)), "y1": float(lm.group(4)),
            "text": " ".join(words).strip(),
        })
    lines.sort(key=lambda l: (round(l["y0"], 1), l["x0"]))
    return width, height, lines


def mcq_blocks(lines):
    """Group page lines into numbered questions with lettered options.

    Both stems and options wrap, so a line that is neither a new number nor a
    new letter continues whatever came last, provided it sits on the next line
    of the same left margin. Anything further down the page than one line pitch
    ends the block rather than being swallowed into option d.
    """
    pitches = sorted(round(b["y0"] - a["y0"], 1)
                     for a, b in zip(lines, lines[1:]) if b["y0"] > a["y0"])
    pitch = pitches[len(pitches) // 2] if pitches else 18.0
    blocks, cur, last = [], None, None
    for line in lines:
        text = line["text"]
        box = (line["x0"], line["y0"], line["x1"], line["y1"])
        mo, mn = _OPT.match(text), _NUM.match(text)
        if mn and not mo:
            cur = {"number": mn.group(1), "stemLines": [dict(text=mn.group(2), box=box)],
                   "options": []}
            blocks.append(cur)
            last = cur["stemLines"]
            continue
        if mo and cur is not None:
            cur["options"].append({"letter": mo.group(1).lower(),
                                   "lines": [dict(text=mo.group(2), box=box)]})
            last = cur["options"][-1]["lines"]
            continue
        if cur is not None and last is not None:
            prev = last[-1]["box"]
            same_margin = line["x0"] <= prev[0] + 4.0
            next_line = 0 < line["y0"] - prev[1] <= pitch * 1.6
            if same_margin and next_line:
                last.append(dict(text=text, box=box))
                continue
        cur, last = None, None
    return [b for b in blocks if b["options"]]


# ---------------------------------------------------------------------- pixels
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
        return (60.0 * (((g - b) / c) % 6.0))
    if mx == g:
        return 60.0 * (((b - r) / c) + 2.0)
    return 60.0 * (((r - g) / c) + 4.0)


def highlight_runs(pdf, page):
    """Row-wise runs of highlight pixels, plus the colour sample behind them.

    Returns (width, height, runs, sample) where runs is [(y, x0, x1), ...] with
    x1 exclusive, and sample is a hue/sat/val histogram of the pixels that
    passed, so the JSON can carry the evidence for the colour rule.
    """
    with tempfile.TemporaryDirectory() as td:
        stub = os.path.join(td, "p")
        subprocess.run(["pdftoppm", "-f", str(page), "-l", str(page), "-r", str(DPI),
                        "-singlefile", pdf, stub], check=True, capture_output=True)
        w, h, px = read_ppm(stub + ".ppm")
    runs, hues, sats, vals = [], [], [], []
    red, blue = px[0::3], px[2::3]
    # Grey is the overwhelming majority of every page and always has R == B;
    # skipping it here is what keeps a pure-Python scan of 2.2M pixels cheap.
    candidates = [i for i, (r, b) in enumerate(zip(red, blue)) if r != b]
    flags = bytearray(w * h)
    for i in candidates:
        r, g, b = px[3 * i], px[3 * i + 1], px[3 * i + 2]
        mx, mn = max(r, g, b), min(r, g, b)
        if mx < VAL_MIN:
            continue
        if (mx - mn) / mx < SAT_MIN:
            continue
        hh = hue(r, g, b)
        if hh is None or not (HUE_MIN <= hh <= HUE_MAX):
            continue
        flags[i] = 1
        hues.append(hh)
        sats.append((mx - mn) / mx)
        vals.append(mx)
    for y in range(h):
        row = y * w
        x = 0
        while x < w:
            if flags[row + x]:
                start = x
                while x < w and flags[row + x]:
                    x += 1
                if x - start >= MIN_RUN:
                    runs.append((y, start, x))
            else:
                x += 1
    return w, h, runs, {"hues": hues, "sats": sats, "vals": vals}


def regions(runs):
    """Group row runs into connected regions, then drop the specks.

    Two runs join when they sit on consecutive rows and overlap in x. Union-find
    rather than a running merge, because a single highlight band is a stack of
    twenty-odd rows and a naive scan happily welds every band on the page into
    one region spanning the whole text column.

    The size test is on the region's own pixels, not on how well it fills its
    bounding box. A highlight over a wrapped option is L-shaped — a long first
    line and a short second — and half its bounding box is bare paper, so a
    bounding-box fill test throws exactly those answers away. A density test
    against each row's own extent fails for a subtler reason and is not used
    either: on the 2025 paper the text is drawn over the mark rather than under
    it, so every letter is a hole in the band and a fully highlighted option
    measures barely half full. Both tests were guarding against scattered
    speckle in a figure, and the minimum run length, row count, width and pixel
    count already do that. Density is still computed and reported per region, as
    evidence, but nothing is rejected on it.
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
    for i, (y, _x0, _x1) in enumerate(runs):
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

    kept, dropped = [], 0
    for members in groups.values():
        rows = {}
        for y, x0, x1 in members:
            lo, hi = rows.get(y, (x0, x1))
            rows[y] = (min(lo, x0), max(hi, x1))
        px = sum(x1 - x0 for _y, x0, x1 in members)
        extent = sum(hi - lo for lo, hi in rows.values())
        widest = max(hi - lo for lo, hi in rows.values())
        if len(rows) < MIN_H or widest < MIN_W or px < MIN_AREA:
            dropped += 1
            continue
        kept.append({"x0": min(lo for lo, _hi in rows.values()),
                     "x1": max(hi for _lo, hi in rows.values()),
                     "y0": min(rows), "y1": max(rows),
                     "px": px, "extent": extent,
                     "density": round(px / max(extent, 1), 3),
                     "rows": rows})
    kept.sort(key=lambda c: (c["y0"], c["x0"]))
    return kept, dropped


def mask_for(sid, pdf, page, force):
    """Cached highlight geometry for one page. The cache holds the runs, not the
    raster: the render is cheap and the pixel scan is not, and a few kilobytes
    of run-length beats a 6MB PPM per page on disk."""
    os.makedirs(RENDERS, exist_ok=True)
    path = os.path.join(RENDERS, "%s-p%02d.runs.json.gz" % (sid, page))
    if os.path.exists(path) and not force:
        with gzip.open(path, "rt", encoding="utf-8") as fh:
            blob = json.load(fh)
        if blob.get("rule") == RULE_FINGERPRINT:
            return blob
    w, h, runs, sample = highlight_runs(pdf, page)
    blob = {"rule": RULE_FINGERPRINT, "dpi": DPI, "rasterWidth": w, "rasterHeight": h, "runs": runs,
            "hueMin": min(sample["hues"]) if sample["hues"] else None,
            "hueMax": max(sample["hues"]) if sample["hues"] else None,
            "satMin": min(sample["sats"]) if sample["sats"] else None,
            "satMax": max(sample["sats"]) if sample["sats"] else None,
            "valMin": min(sample["vals"]) if sample["vals"] else None,
            "pixels": len(sample["hues"]),
            "hueHistogram": _histogram(sample["hues"], 5.0)}
    with gzip.open(path, "wt", encoding="utf-8") as fh:
        json.dump(blob, fh)
    return blob


def _histogram(values, width):
    out = {}
    for v in values:
        k = "%d" % (int(v // width) * width)
        out[k] = out.get(k, 0) + 1
    return dict(sorted(out.items(), key=lambda kv: int(kv[0])))


def core_box(box, scale):
    """A text line's ink core in raster pixels, in place of its full line box.

    pdftotext reports a line box that includes the leading above and below the
    glyphs, so consecutive option boxes touch with no gap between them. A
    highlight is a rounded band a little taller than the letters it covers, and
    against full line boxes its bottom edge reliably spills into the box of the
    option underneath — which is how a clean, unambiguous mark on option b comes
    to look like a mark shared with option c. Keeping the middle %d%% of the box
    puts the boundary in the whitespace where it belongs.
    """ % int(CORE * 100)
    x0, x1 = box[0] * scale, box[2] * scale
    y0, y1 = box[1] * scale, box[3] * scale
    pad = (y1 - y0) * (1.0 - CORE) / 2.0
    return x0, y0 + pad, x1, y1 - pad


def covered(regs, box, scale):
    """Highlighted area inside one option line's ink core, in raster pixels.

    Measured row by row against the region's own horizontal extent rather than
    against its bounding box, so a wrapped, L-shaped highlight contributes only
    the rows it actually reaches, and a band riddled with glyph holes still
    counts as having covered the line it sits on.
    """
    x0, y0, x1, y1 = core_box(box, scale)
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


def touches_any_option(reg, blocks, scale):
    """Whether an accepted region lands on any option's ink core on this page.

    Regions that do not are reported rather than dropped in silence: a coloured
    patch inside a histology plate or a dosage-form photograph is the obvious
    way this detector could invent an answer, and the count of what it refused
    is the only way to audit that it did not.
    """
    for block in blocks:
        for opt in block["options"]:
            for ln in opt["lines"]:
                x0, y0, x1, y1 = core_box(ln["box"], scale)
                if (reg["x1"] > x0 and reg["x0"] < x1
                        and reg["y1"] + 1 > y0 and reg["y0"] < y1):
                    return True
    return False


# ------------------------------------------------------------------- assembly
def sources():
    with open(MANIFEST, encoding="utf-8") as fh:
        rows = json.load(fh)["sources"]
    return [s for s in rows
            if s.get("moduleId") == "108 INT" and s.get("sourceCategory") == "EOY"]


def eoy_questions():
    with open(EOY, encoding="utf-8") as fh:
        rows = json.load(fh)["questions"]
    by_source = {}
    for q in rows:
        if q.get("format") != "mcq_single_best":
            continue
        by_source.setdefault(q["sourceId"], []).append(q)
    for qs in by_source.values():
        qs.sort(key=lambda q: q["sequentialIndex"])
    return by_source


def norm(text):
    return re.sub(r"[^a-z0-9]+", "", (text or "").lower())


def mcq_pages(questions):
    return sorted({q["page"] for q in questions})


def run_source(src, eoy_by_source, force):
    sid, pdf = src["sourceId"], src["absolutePath"]
    known = eoy_by_source.get(sid, [])
    results, page_stats = [], []
    blocks_all = []
    for page in mcq_pages(known):
        width, _height, lines = page_layout(pdf, page)
        blob = mask_for(sid, pdf, page, force)
        scale = blob["rasterWidth"] / width
        regs, dropped = regions(blob["runs"])
        blocks = mcq_blocks(lines)
        offside = [r for r in regs if not touches_any_option(r, blocks, scale)]
        page_stats.append({
            "page": page, "highlightPixels": blob["pixels"],
            "regionsKept": len(regs), "regionsDroppedAsTooSmall": dropped,
            "regionsOnNoOptionBox": len(offside),
            "regionsOnNoOptionBoxGeometry": [
                {"rasterBox": [r["x0"], r["y0"], r["x1"], r["y1"]], "pixels": r["px"]}
                for r in offside],
            "hueRange": [blob["hueMin"], blob["hueMax"]],
            "saturationRange": [blob["satMin"], blob["satMax"]],
            "hueHistogram": blob["hueHistogram"],
        })
        for pos, block in enumerate(blocks):
            blocks_all.append((page, pos, block, regs, scale))

    for index, (page, pos, block, regs, scale) in enumerate(blocks_all):
        per_option, claimed = [], 0.0
        for opt in block["options"]:
            num = den = 0.0
            for ln in opt["lines"]:
                a, b = covered(regs, ln["box"], scale)
                num += a
                den += b
            frac = num / den
            claimed += num
            per_option.append({
                "optionLetter": opt["letter"],
                "optionText": " ".join(l["text"] for l in opt["lines"]).strip(),
                "overlapFraction": round(frac, 4),
                "overlapPixels": round(num, 1),
                "optionCorePixels": round(den, 1),
            })
        ranked = sorted(per_option, key=lambda o: -o["overlapFraction"])
        total_frac = sum(o["overlapFraction"] for o in per_option)
        letter = None
        text = None
        confidence = 0.0
        reason = None
        if not ranked or ranked[0]["overlapFraction"] < MIN_FRAC:
            reason = ("no highlight rectangle overlaps any option box by at least "
                      "%.0f%% of its area" % (MIN_FRAC * 100))
        else:
            share = ranked[0]["overlapFraction"] / total_frac if total_frac else 0.0
            if share < MIN_SHARE:
                reason = ("the highlight spans more than one option: %s"
                          % ", ".join("%s=%.2f" % (o["optionLetter"], o["overlapFraction"])
                                      for o in ranked if o["overlapFraction"] > 0))
            else:
                letter = ranked[0]["optionLetter"]
                text = ranked[0]["optionText"]
                confidence = round(share, 4)

        joined = known[index] if index < len(known) else None
        join_basis = None
        if joined is not None:
            stem_printed = norm(" ".join(l["text"] for l in block["stemLines"]))
            stem_eoy = norm(joined["stem"])
            agree = stem_eoy[:40] in stem_printed or stem_printed[:40] in stem_eoy
            join_basis = ("position %d of %d mcq_single_best questions in eoy.json, "
                          "printed number %s vs %s, stem text %s"
                          % (index + 1, len(known), block["number"], joined["number"],
                             "agrees" if agree else "DISAGREES"))
            if joined["page"] != page:
                join_basis += "; page disagrees (eoy.json says %d)" % joined["page"]

        results.append({
            "sourceId": sid,
            "page": page,
            "pageIndexOnPage": pos,
            "sequentialIndex": index + 1,
            "questionNumberPrinted": block["number"],
            "questionId": joined["questionId"] if joined else None,
            "questionIdBasis": join_basis,
            "stem": " ".join(l["text"] for l in block["stemLines"]).strip(),
            "optionLetter": letter,
            "optionText": text,
            "confidence": confidence,
            "confidenceBasis": ("share of all highlight overlap on this question held "
                                "by the winning option"),
            "method": "pixel-highlight-over-option-box",
            "unresolvedReason": reason,
            "options": per_option,
            "highlightPixelsOnQuestion": round(claimed, 1),
        })
    return results, page_stats


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--force", action="store_true", help="ignore the cached page masks")
    ap.add_argument("--report", action="store_true", help="print the summary and stop")
    args = ap.parse_args()

    eoy_by_source = eoy_questions()
    srcs = sources()
    by_id = {s["sourceId"]: s for s in srcs}
    solved = [s for s in srcs if "solved" in os.path.basename(s["absolutePath"]).lower()
              and "unsolved" not in os.path.basename(s["absolutePath"]).lower()]
    solved_ids = {s["sourceId"] for s in solved}

    answers, pages, control = [], {}, []
    for src in sorted(srcs, key=lambda s: s["absolutePath"]):
        sid = src["sourceId"]
        rows, stats = run_source(src, eoy_by_source, args.force)
        pages[sid] = stats
        if sid in solved_ids:
            answers.extend(rows)
        else:
            found = [r for r in rows if r["optionLetter"] or r["unresolvedReason"] is None
                     or r["highlightPixelsOnQuestion"] > 0]
            control.append({
                "sourceId": sid,
                "file": os.path.basename(src["absolutePath"]),
                "role": "unsolved control copy",
                "mcqPagesScanned": [s["page"] for s in stats],
                "questionsScanned": len(rows),
                "highlightPixelsFound": sum(s["highlightPixels"] for s in stats),
                "highlightRegionsFound": sum(s["regionsKept"] for s in stats),
                "highlightRegionsOnNoOptionBox": sum(s["regionsOnNoOptionBox"] for s in stats),
                "answersAttributed": sum(1 for r in rows if r["optionLetter"]),
                "questionsWithAnyOverlap": len(found),
            })
        sys.stderr.write("%s  %s  %d questions, %d answered\n" % (
            sid, os.path.basename(src["absolutePath"]), len(rows),
            sum(1 for r in rows if r["optionLetter"])))

    buckets = {"1.00": 0, "0.95-0.99": 0, "0.90-0.94": 0,
               "0.80-0.89": 0, "0.70-0.79": 0, "unresolved": 0}
    for r in answers:
        c = r["confidence"]
        if not r["optionLetter"]:
            buckets["unresolved"] += 1
        elif c >= 0.9995:
            buckets["1.00"] += 1
        elif c >= 0.95:
            buckets["0.95-0.99"] += 1
        elif c >= 0.90:
            buckets["0.90-0.94"] += 1
        elif c >= 0.80:
            buckets["0.80-0.89"] += 1
        else:
            buckets["0.70-0.79"] += 1

    per_paper = {}
    for r in answers:
        p = per_paper.setdefault(r["sourceId"], {"questions": 0, "answered": 0,
                                                 "unresolved": 0})
        p["questions"] += 1
        p["answered" if r["optionLetter"] else "unresolved"] += 1
    for sid, p in per_paper.items():
        p["file"] = os.path.basename(by_id[sid]["absolutePath"])

    doc = {
        "moduleId": "108 INT",
        "universityId": "kau",
        "sourceCategory": "EOY",
        "generatedBy": "scripts/kasr/extract/108-INT/answerkey.py",
        "generatedFrom": ("pixels: each MCQ page of the four EOY sources rendered at "
                          "%d dpi and intersected with the option line boxes that "
                          "pdftotext -bbox-layout reports" % DPI),
        "joinsTo": ("scripts/kasr/extract/108-INT/eoy.json on questionId; eoy.py and "
                    "eoy.json are not modified by this script"),
        "colourRule": {
            "space": "HSV over the 8-bit sRGB render",
            "hueDegrees": [HUE_MIN, HUE_MAX],
            "saturationMin": SAT_MIN,
            "valueMin255": VAL_MIN,
            "valueFloorNote": ("set near black, not near white: the 2024 mark is "
                               "translucent and renders as dark maroon of the same "
                               "hue where it crosses a glyph"),
            "why": ("sampled, not assumed: the 2025 highlight renders at H317 S0.35 "
                    "V1.00 and the 2024 one at H336-338 S0.16-0.24 V0.91-0.97, while "
                    "every non-highlight mark on an MCQ page of either paper is "
                    "neutral grey (R==G==B, saturation 0) and fails the floor"),
        },
        "shapeRule": {
            "minHorizontalRunPx": MIN_RUN, "minWidthPx": MIN_W, "minHeightPx": MIN_H,
            "minTotalPixels": MIN_AREA, "optionCoreFraction": CORE,
        },
        "attributionRule": {
            "minOverlapFraction": MIN_FRAC, "minShare": MIN_SHARE,
            "note": ("a question whose best option falls short of either threshold is "
                     "written with optionLetter null and the geometry that made it "
                     "ambiguous; no answer is ever inferred from the text"),
        },
        "control": control,
        "totals": {
            "answersRecovered": sum(1 for r in answers if r["optionLetter"]),
            "questionsScanned": len(answers),
            "unresolved": sum(1 for r in answers if not r["optionLetter"]),
            "byPaper": per_paper,
            "confidenceDistribution": buckets,
        },
        "pageStatistics": pages,
        "answers": answers,
    }
    if not args.report:
        with open(OUT, "w", encoding="utf-8") as fh:
            json.dump(doc, fh, indent=1, ensure_ascii=False)
            fh.write("\n")
    print(json.dumps({"totals": doc["totals"], "control": control}, indent=1))


if __name__ == "__main__":
    main()
