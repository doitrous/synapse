#!/usr/bin/env python3
"""Transcribe the two module 108 INT department question books into a private ledger.

The Pathology and Pharmacology "Medical Question Book" excerpts for module 108 INT
have no text layer at all, so everything downstream of them starts from OCR. The
question pages were OCR'd once already and cached in
`scripts/kasr/extract/pagetext/<sourceId>.json`; this script reads that cache rather
than re-running OCR over prose. Three things about these books shape the design.

**The question pages are printed in two columns.** A thin vertical rule separates
them and the OCR read straight across it, so one cached line holds the left column,
a junk glyph where the rule was, and the right column. Nothing parses until that
line is cut back in two. The cut is made by looking for a short, letterless token
near the position where the unambiguous `|` rules landed on the same page, then
reading the left column top to bottom followed by the right column. Where OCR
dropped the rule entirely the cut falls in the wrong place and a fragment lands in
the wrong column. That is this script's main failure mode; it shows up as a stem
with a foreign clause glued into it, and it is why every question keeps `rawStem`
and every damaged question keeps `rawBlock`, the reconstructed column lines it was
built from, so a human can repair it without re-running anything.

**The answer keys are printed pages, and they are readable — but only as images.**
Each book ends its MCQ section with an "Answers" grid: the question number in a
filled brand-coloured circle, the correct letter in a white circle beside it, laid
out in columns of ten. Prose OCR turns that into an undifferentiable soup of `@`,
`©`, `8` and `pd`, which is why the cached page text records nothing usable. So this
script re-renders those two pages and reads them geometrically: it separates the
dark letter glyphs from the coloured circles by colour, finds each glyph as a
connected component, groups the glyphs into grid rows, and OCRs a row at a time with
`--psm 7` and a whitelist. The question numbers are read independently from the same
page (bright glyphs inside the coloured discs) and used purely as a check on the
column-major numbering — they are never the source of a number. An answer is only
recorded if the grid is rectangular, its glyph count equals the highest question
number parsed from the question pages, and enough of the independently-read numbers
agree. If any of that fails the whole key is discarded rather than partially
believed, and `answer` stays null with the reason attached.

**Each book also carries a short-essay section with model answers.** Those are
captured as `questionType: "short-essay"` and counted under the option-less rows
rather than pretended to be MCQs. Essay questions are recognised by the imperative
verb they open with (Define, Enumerate, Discuss, ...) because their numbering is
interleaved with the numbered sub-lists inside the model answers and monotonicity
alone cannot separate the two. An essay question phrased without one of those verbs
is missed and silently becomes part of the previous question's model answer.

Nothing here is authored, completed or corrected. Option labels the OCR mangled are
relabelled by their position in the sequence, never by what the option says, and
every relabelling keeps the raw glyph beside it in `optionLabelRepairs`.

Licensing: both books carry "For personal use only, No other uses without
permission. Copyright (c) 2025. All rights reserved" on their front matter. They are
student compilations. This output is the private preserved original that §6 of
docs/medical-library-program/KASR-SOURCE-EXTRACTION-PLAN.md asks for. It is not
clearance to publish, and the notice is stamped onto every record so that whoever
builds a student-facing batch from this file cannot miss it.

Deterministic and re-runnable:

    python3 scripts/kasr/extract/108-INT/mcq.py

Writes scripts/kasr/extract/108-INT/mcq.json. The answer-grid read is cached in
mcq-answer-grid.json; delete that file to force a re-read (needs pdftoppm, tesseract
and Pillow). Everything else needs only the manifest, the cached page text, and — if
it exists — the sibling eoy.json for the exam cross-check.
"""
import collections
import hashlib
import json
import os
import re
import subprocess
import tempfile
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
EXTRACT = os.path.dirname(HERE)
REPO = os.path.abspath(os.path.join(EXTRACT, "..", "..", ".."))
MANIFEST = os.path.join(REPO, "docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json")
TEXTCACHE = os.path.join(EXTRACT, "pagetext")
EOY = os.path.join(HERE, "eoy.json")
GRID_CACHE = os.path.join(HERE, "mcq-answer-grid.json")
OUT = os.path.join(HERE, "mcq.json")

MODULE_ID = "108 INT"
SOURCE_IDS = ["src_3f8527b376185eb3c2eb", "src_ec50845c4498e17b9b6b"]
GRID_DPI = 130

LICENCE_NOTICE = ("For personal use only, No other uses without permission. "
                  "Copyright © 2025. All rights reserved")
LICENCE_STAMP = {
    "notice": LICENCE_NOTICE,
    "publicationStatus": "not-cleared",
    "effect": "May not be republished verbatim, in whole or in part, without the "
              "rights holders' permission.",
}
COMPILERS = ["Mohamed Ramadan", "Mayada Aziz", "Nour Mohamed", "Mahmoud Abubakr"]
SUPERVISOR = "Omar Elazab"

# ---------------------------------------------------------------------------
# text hygiene
# ---------------------------------------------------------------------------
BIDI = "‎‏‪‫‬‭‮⁦⁧⁨⁩"
NOISE_OK = set(" \t.,;:!?()[]{}'\"-/%+&*#=<>|_–’“”…")


def strip_bidi(s):
    return "".join(c for c in s if c not in BIDI)


def alnum_count(s):
    return len(re.findall(r"[A-Za-z0-9]", s))


def clean(s):
    s = strip_bidi(s).replace(" ", " ")
    s = re.sub(r"\s+", " ", s).strip()
    return s.strip(" .–-—")


def noise_ratio(s):
    if not s:
        return 1.0
    bad = 0
    for ch in s:
        if ch.isalnum() or ch in NOISE_OK:
            continue
        cat = unicodedata.category(ch)
        if cat.startswith("L") or cat.startswith("N"):
            continue
        bad += 1
    return bad / len(s)


def non_latin_ratio(s):
    letters = [c for c in s if unicodedata.category(c).startswith("L")]
    if not letters:
        return 0.0
    return sum(1 for c in letters if not ("a" <= c.lower() <= "z")) / len(letters)


# ---------------------------------------------------------------------------
# column splitting
# ---------------------------------------------------------------------------
# Weights for the glyphs the vertical rule between the two columns OCRs into.
# `|` is the rule read correctly; the rest are the shapes it collapses to.
DIV_WEIGHT = {"|": 6, "١": 5, "ظ": 5, ":": 4, "!": 4,
              "ا": 3, "'": 3, ";": 3, "ل": 2, "ز": 2,
              "م": 2, "و": 2, "ع": 2}
BAR = re.compile(r"(?<=\s)\|(?=\s)")


def divider_ratio(page):
    """Where on the line the unambiguous `|` rules sit, as a fraction of line length."""
    ratios = []
    for line in page.splitlines():
        if len(line) < 20:
            continue
        for m in BAR.finditer(line):
            ratios.append(m.start() / len(line))
    if not ratios:
        return None
    ratios.sort()
    return ratios[len(ratios) // 2]


def divider_candidates(line):
    out = []
    for m in re.finditer(r"\S+", line):
        tok = strip_bidi(m.group(0))
        if not tok or len(tok) > 3:
            continue
        if re.search(r"[A-Za-z]", tok):
            continue
        if re.fullmatch(r"[0-9]{1,3}[.):\]]", tok):
            # `3.` / `10)` are option or question markers, not the rule
            continue
        out.append((m.start(), m.end(), tok))
    return out


def split_columns(line, target):
    """Cut one OCR line back into (left column, right column)."""
    if not line.strip():
        return "", ""
    cands = divider_candidates(line)
    if not cands:
        return line.strip(), ""
    best = None
    length = max(1, len(line))
    for start, end, tok in cands:
        score = max(DIV_WEIGHT.get(ch, 1) for ch in tok)
        if re.fullmatch(r"[0-9]{1,3}", tok):
            score = 0.5
        score -= 6 * abs(start / length - target)
        if best is None or score > best[0]:
            best = (score, start, end)
    _, start, end = best
    return line[:start].strip(), line[end:].strip()


# ---------------------------------------------------------------------------
# page furniture and classification
# ---------------------------------------------------------------------------
FOOTER = re.compile(r"INT\s*Module\s*[-–]\s*108", re.I)
FURNITURE = [
    FOOTER,
    re.compile(r"^\s*Section\b", re.I),
    re.compile(r"Join\s+Our\s+Group", re.I),
    re.compile(r"^[\s|\[\]<>=/]*\d{1,3}[\s|\[\]<>=/]*$"),
    re.compile(r"^[\s|\[\]<>=/]*NER[DR>=]?[\s|\[\]<>=/]*$", re.I),
]
BOOKPAGE = re.compile(r"[|\[\]]\s*(\d{1,3})\s*[|\[\]]")
BULLET_CHARS = "•·●■٭∙*»›♦▪٠۰"
OPT_CLEAN = re.compile(r"^\s*([a-eA-E])\s*[.)\]]\s+(\S.*)$")
OPT_DIGIT = re.compile(r"^\s*([0-9])\s*[.)\]]\s+(\S.*)$")
NUMBERED = re.compile(r"^\s*(\d{1,3})\s*[.)\]:]\s*(.*)$")
ESSAY_CUE = re.compile(
    r"^(define|enumerate|discuss|mention|give|compare|list|describe|explain|state|"
    r"name|outline|what\s+is|what\s+are|how\s+is|how\s+to|how\s+are)\b", re.I)


def is_furniture(line):
    s = strip_bidi(line).strip()
    if alnum_count(s) < 2:
        return True
    return any(p.search(s) for p in FURNITURE)


def book_page_of(page):
    for line in page.splitlines():
        if FOOTER.search(line):
            m = BOOKPAGE.search(strip_bidi(line))
            if m:
                return int(m.group(1))
            m = re.search(r"(\d{1,3})", strip_bidi(line).replace("108", "", 1))
            if m:
                return int(m.group(1))
    return None


def page_kind(page):
    """Cover / front-matter / contents / divider / answer-grid / mcq / short-essay.

    MCQ pages and essay pages both carry numbered items and lettered lines, because
    the essay model answers contain lettered sub-lists. What separates them is the
    ratio: on an MCQ page almost every numbered item is followed by four option
    labels, on an essay page it is followed by prose bullets.
    """
    txt = strip_bidi(page)
    lines = [l for l in txt.splitlines() if l.strip()]
    if not lines:
        return "blank"
    if re.search(r"Medical\s+Question\s+Book", txt, re.I):
        return "cover"
    if re.search(r"Collected\s+By", txt, re.I) or re.search(r"All\s+rights\s+reserved", txt, re.I):
        return "front-matter"
    if re.search(r"^\s*\|?\s*Contents", txt, re.I | re.M):
        return "contents"
    if len(re.findall(r"[@©®]", txt)) >= 5 and len(txt) < 700 and len(lines) >= 5:
        return "answer-grid"
    if re.search(r"Section\b.{0,12}Short\s*Essay", txt, re.I):
        return "short-essay"
    if re.search(r"Section\b.{0,12}(MCQ|McQ)", txt, re.I):
        return "mcq"

    opt = sum(1 for l in lines if OPT_CLEAN.match(l) or OPT_DIGIT.match(l))
    bullets = sum(1 for l in lines if l.lstrip()[:1] in BULLET_CHARS)
    numbered = 0
    cues = 0
    for l in lines:
        m = NUMBERED.match(l)
        if not m:
            continue
        numbered += 1
        rest = re.sub(r"^[\W\d_]{1,3}\s*", "", clean(m.group(2)))
        if ESSAY_CUE.match(rest):
            cues += 1
    if numbered < 2 and opt < 2:
        return "divider"
    if numbered and opt >= 2.2 * numbered:
        return "mcq"
    if cues >= 3 or bullets >= 3:
        return "short-essay"
    if opt >= 4:
        return "mcq"
    return "divider"


def chapter_title(page):
    for line in page.splitlines():
        s = clean(line)
        if not s or is_furniture(line):
            continue
        s = re.sub(r"^[\W\d_]{1,3}\s*", "", s).strip()
        if len(s) < 4 or NUMBERED.match(s):
            return None
        return s
    return None


# ---------------------------------------------------------------------------
# answer grid: read the printed "Answers" page as a grid, not as prose
# ---------------------------------------------------------------------------
# Glyph shapes the sibling lanes see the OCR confuse option labels with. These are
# only ever used to CORROBORATE the label the sequence already implies -- a
# substitution is never allowed to override position, so a wrong entry here cannot
# put a wrong label on an option.
LABEL_SUBSTITUTIONS = {
    "0": "D", "O": "D", "Q": "D", "o": "D",
    "¢": "C", "©": "C", "€": "C", "6": "C", "<": "C", "~": "C",
    "8": "B", "5": "B", "S": "B", "K": "B",
    "4": "A", "@": "A",
}


def _blobs(mask):
    """4-connected components of an L-mode mask (255 = ink). [(x0,y0,x1,y1,area)]."""
    bbox = mask.getbbox()
    if not bbox:
        return []
    ox, oy = bbox[0], bbox[1]
    sub = mask.crop(bbox)
    w, h = sub.size
    data = sub.tobytes()
    seen = bytearray(w * h)
    out = []
    for i in range(w * h):
        if not data[i] or seen[i]:
            continue
        stack = [i]
        seen[i] = 1
        x0 = x1 = i % w
        y0 = y1 = i // w
        area = 0
        while stack:
            j = stack.pop()
            area += 1
            x, y = j % w, j // w
            if x < x0: x0 = x
            if x > x1: x1 = x
            if y < y0: y0 = y
            if y > y1: y1 = y
            if x + 1 < w and data[j + 1] and not seen[j + 1]:
                seen[j + 1] = 1; stack.append(j + 1)
            if x > 0 and data[j - 1] and not seen[j - 1]:
                seen[j - 1] = 1; stack.append(j - 1)
            if y + 1 < h and data[j + w] and not seen[j + w]:
                seen[j + w] = 1; stack.append(j + w)
            if y > 0 and data[j - w] and not seen[j - w]:
                seen[j - w] = 1; stack.append(j - w)
        out.append((x0 + ox, y0 + oy, x1 + ox, y1 + oy, area))
    return out


def _tess(image, whitelist, psm):
    with tempfile.TemporaryDirectory() as td:
        path = os.path.join(td, "g.png")
        image.save(path)
        r = subprocess.run(["tesseract", path, "stdout", "-l", "eng", "--psm", str(psm),
                            "-c", "tessedit_char_whitelist=" + whitelist],
                           capture_output=True, timeout=120)
    return r.stdout.decode("utf-8", "replace").replace(" ", "").replace("\n", "").strip()


def _ocr_row(mask, boxes, whitelist, psm=7, up=3, gap=40, pad=40):
    """Paste one grid row's glyphs onto a wide white canvas and read it as a line.

    Tesseract is far more reliable on a line of well-spaced characters than on a
    single isolated glyph or on the original crowded grid.
    """
    from PIL import Image, ImageOps
    crops = []
    for x0, y0, x1, y1 in boxes:
        c = ImageOps.invert(mask.crop((x0, y0, x1 + 1, y1 + 1)))
        c = c.resize((c.width * up, c.height * up), Image.LANCZOS)
        crops.append(c.point(lambda v: 0 if v < 128 else 255))
    height = max(c.height for c in crops)
    width = sum(c.width for c in crops) + gap * (len(crops) + 1)
    canvas = Image.new("L", (width + 2 * pad, height + 2 * pad), 255)
    x = pad + gap
    for c in crops:
        canvas.paste(c, (x, pad + (height - c.height) // 2))
        x += c.width + gap
    return _tess(canvas, whitelist, psm)


def _cluster(values, tol):
    """Group sorted scalars into clusters, returning the cluster centre per value."""
    order = sorted(range(len(values)), key=lambda i: values[i])
    centres = []
    assign = [None] * len(values)
    for i in order:
        if centres and abs(values[i] - centres[-1][0]) <= tol:
            centres[-1][1].append(i)
            centres[-1][0] = sum(values[j] for j in centres[-1][1]) / len(centres[-1][1])
        else:
            centres.append([values[i], [i]])
    for idx, (_c, members) in enumerate(centres):
        for j in members:
            assign[j] = idx
    return assign, len(centres)


def read_answer_grid(pdf_path, page_no, expected_count):
    """Read one printed answer-key page. Returns a dict; `answers` only when trusted."""
    result = {"pdfPage": page_no, "dpi": GRID_DPI, "method":
              "render page, split dark letter glyphs from coloured number discs by "
              "colour, connected-component the glyphs, OCR one grid row at a time "
              "with --psm 7 and a whitelist, number column-major",
              "answers": {}, "ok": False, "checks": {}, "rows": []}
    try:
        from PIL import Image, ImageChops, ImageFilter, ImageOps
    except Exception as exc:
        result["error"] = f"Pillow unavailable: {exc}"
        return result
    if not os.path.exists(pdf_path):
        result["error"] = "pdf not found at the manifest absolutePath"
        return result
    try:
        with tempfile.TemporaryDirectory() as td:
            stub = os.path.join(td, "p")
            subprocess.run(["pdftoppm", "-f", str(page_no), "-l", str(page_no),
                            "-r", str(GRID_DPI), "-png", "-singlefile", pdf_path, stub],
                           capture_output=True, timeout=300, check=True)
            im = Image.open(stub + ".png").convert("RGB")
            im.load()
    except Exception as exc:
        result["error"] = f"render failed: {type(exc).__name__}: {exc}"
        return result

    r, g, b = im.split()
    mx = ImageChops.lighter(ImageChops.lighter(r, g), b)
    mn = ImageChops.darker(ImageChops.darker(r, g), b)

    # The answer letters are the only near-black ink on the page.
    letters_mask = Image.eval(mx, lambda v: 255 if v < 120 else 0)
    blobs = [x for x in _blobs(letters_mask) if x[4] >= 25]
    if not blobs:
        result["error"] = "no letter glyphs found on the page"
        return result
    heights = sorted(x[3] - x[1] for x in blobs)
    med = heights[len(heights) // 2]
    if med < 6:
        result["error"] = "letter glyphs too small to read at this dpi"
        return result
    cells = [x[:4] for x in blobs if 0.7 * med <= x[3] - x[1] <= 1.45 * med]

    cys = [(c[1] + c[3]) / 2 for c in cells]
    cxs = [(c[0] + c[2]) / 2 for c in cells]
    row_of, nrows = _cluster(cys, med * 0.6)
    col_of, ncols = _cluster(cxs, med * 3.0)

    # column-major numbering: column c, row r -> c * rows + r + 1
    grid = {}
    for i, cell in enumerate(cells):
        grid[(col_of[i], row_of[i])] = i
    counts = collections.Counter(col_of)
    full = [counts[c] for c in range(ncols)]
    rectangular = all(n == nrows for n in full[:-1]) and full[-1] <= nrows
    numbers = {}
    for i in range(len(cells)):
        numbers[i] = col_of[i] * nrows + row_of[i] + 1

    # read the letters, one grid row at a time
    by_row = collections.defaultdict(list)
    for i in range(len(cells)):
        by_row[row_of[i]].append(i)
    letters = {}
    for rix in sorted(by_row):
        idxs = sorted(by_row[rix], key=lambda i: cells[i][0])
        text = _ocr_row(letters_mask, [cells[i] for i in idxs], "ABCDE", psm=7)
        if len(text) != len(idxs):
            text = "".join((_ocr_row(letters_mask, [cells[i]], "ABCDE", psm=10) or "?")[:1]
                           for i in idxs)
        result["rows"].append(text)
        for i, ch in zip(idxs, text.ljust(len(idxs), "?")):
            letters[i] = ch

    # read the question numbers independently, purely as a check on the numbering
    def odd(n):
        return n if n % 2 else n + 1

    brand = Image.eval(ImageChops.difference(mx, mn), lambda v: 255 if v > 60 else 0)
    k = odd(max(3, int(med * 0.9)))
    disc = brand.filter(ImageFilter.MaxFilter(k)).filter(ImageFilter.MinFilter(k))
    digit_mask = ImageChops.multiply(disc, Image.eval(im.convert("L"),
                                                      lambda v: 255 if v > 185 else 0))
    dblobs = [x for x in _blobs(digit_mask)
              if x[4] >= 20 and 0.5 * med <= x[3] - x[1] <= 1.45 * med
              and (x[2] - x[0] + 1) <= 1.3 * med]
    groups = []
    for blob in sorted(dblobs, key=lambda d: (round(d[1] / max(1, med * 0.6)), d[0])):
        if groups:
            p = groups[-1]
            if (blob[0] - p[2] <= med * 0.45 and
                    min(p[3], blob[3]) - max(p[1], blob[1]) > 0.4 * min(p[3] - p[1], blob[3] - blob[1])):
                groups[-1] = (min(p[0], blob[0]), min(p[1], blob[1]),
                              max(p[2], blob[2]), max(p[3], blob[3]))
                continue
        groups.append(blob[:4])
    confirmed = mismatched = 0
    for grp in groups:
        text = _ocr_row(digit_mask, [grp], "0123456789", psm=7)
        if not text.isdigit():
            continue
        gy = (grp[1] + grp[3]) / 2
        best = None
        for i, cell in enumerate(cells):
            cy = (cell[1] + cell[3]) / 2
            if abs(cy - gy) > med * 0.6 or cell[0] <= grp[2]:
                continue
            d = cell[0] - grp[2]
            if best is None or d < best[0]:
                best = (d, i)
        if best is None or best[0] > med * 6:
            continue
        if int(text) == numbers[best[1]]:
            confirmed += 1
        else:
            mismatched += 1

    unreadable = [i for i in range(len(cells)) if letters.get(i, "?") not in "ABCDE"]
    checks = {
        "letterGlyphsFound": len(cells),
        "expectedFromQuestionPages": expected_count,
        "countMatchesQuestionPages": len(cells) == expected_count,
        "gridRows": nrows,
        "gridColumns": ncols,
        "gridRectangular": rectangular,
        "unreadableLetters": len(unreadable),
        "numbersIndependentlyConfirmed": confirmed,
        "numbersIndependentlyMismatched": mismatched,
        "numberConfirmationRate": round(confirmed / len(cells), 3) if cells else 0.0,
    }
    result["checks"] = checks
    ok = (checks["countMatchesQuestionPages"] and rectangular and not unreadable
          and mismatched == 0 and confirmed >= 0.5 * len(cells))
    result["ok"] = bool(ok)
    if not ok:
        result["rejectedBecause"] = [name for name, good in (
            ("glyph count does not match the questions parsed from the question pages",
             checks["countMatchesQuestionPages"]),
            ("grid is not rectangular", rectangular),
            ("some answer letters were unreadable", not unreadable),
            ("an independently read question number disagreed with the column-major "
             "numbering", mismatched == 0),
            ("too few question numbers could be independently confirmed",
             confirmed >= 0.5 * len(cells))) if not good]
        return result
    result["answers"] = {str(numbers[i]): letters[i] for i in range(len(cells))}
    return result


def load_answer_grids(sources, expected):
    """Cached read of both answer-key pages. Delete mcq-answer-grid.json to redo."""
    cache = {}
    if os.path.exists(GRID_CACHE):
        try:
            with open(GRID_CACHE, encoding="utf-8") as fh:
                cache = json.load(fh)
        except Exception:
            cache = {}
    out = {}
    dirty = False
    for source_id, (pdf_path, page_no) in sources.items():
        key = f"{source_id}:p{page_no}"
        got = cache.get(key)
        if not got or got.get("expectedFromQuestionPages") != expected.get(source_id):
            got = read_answer_grid(pdf_path, page_no, expected.get(source_id))
            got["expectedFromQuestionPages"] = expected.get(source_id)
            cache[key] = got
            dirty = True
        out[source_id] = got
    if dirty:
        tmp = GRID_CACHE + ".tmp"
        with open(tmp, "w", encoding="utf-8") as fh:
            json.dump(cache, fh, ensure_ascii=False, indent=1)
        os.replace(tmp, GRID_CACHE)
    return out


# ---------------------------------------------------------------------------
# question parsing
# ---------------------------------------------------------------------------
LETTERS = "ABCDE"
EMPHASIS = re.compile(r"^([0-9©®*~^_•●]{1,2})\s+(?=[A-Z])")


def looks_like_item_start(line, prev_line):
    """Is this reconstructed line plausibly the start of a new option?"""
    s = strip_bidi(line).strip()
    if not s:
        return False
    m = re.match(r"^(\S{1,3})\s+(.*)$", s)
    if m and alnum_count(m.group(1)) <= 2 and m.group(2)[:1].isupper():
        return True
    if prev_line and strip_bidi(prev_line).strip()[-1:] in ".:?" and len(s) < 55:
        return True
    return False


def new_question(ctx, number, raw_number):
    return {
        "sourceId": ctx["sourceId"], "file": ctx["file"], "subject": ctx["subject"],
        "chapter": ctx["chapter"], "page": ctx["page"], "bookPage": ctx["bookPage"],
        "column": ctx["column"], "number": number, "numberRaw": raw_number,
        "numberSource": "printed in the book" if number is not None else None,
        "stemLines": [], "optionSegments": [], "answerLines": [],
        "rawBlock": [], "flags": [],
    }


def parse_stream(stream, ctx_base, section):
    """Walk the reconstructed single-column line stream and pull out questions."""
    questions = []
    cur = None
    expected = 1
    matching_latch = False

    def close():
        nonlocal cur
        if cur is not None:
            questions.append(cur)
            cur = None

    for page, bookpage, column, line in stream:
        s = strip_bidi(line).strip()
        if not s:
            continue
        ctx = dict(ctx_base, page=page, bookPage=bookpage, column=column)

        if re.search(r"\bMatch\b.{0,40}\bwith\b", s, re.I):
            close()
            matching_latch = True
            cur = new_question(ctx, None, None)
            cur["stemLines"].append(s)
            cur["rawBlock"].append(s)
            cur["flags"].append("matching-instruction")
            close()
            continue

        mnum = NUMBERED.match(s)
        is_question_start = False
        if mnum:
            num = int(mnum.group(1))
            rest = mnum.group(2)
            if section == "short-essay":
                stripped = re.sub(r"^[\W\d_]{1,3}\s*", "", clean(rest))
                is_question_start = bool(ESSAY_CUE.match(clean(rest)) or ESSAY_CUE.match(stripped))
            else:
                # In an MCQ section a numbered line is a question when its number is
                # the one we are waiting for (or close after it); otherwise it is an
                # option whose label the OCR turned into a digit.
                is_question_start = (cur is None) or (expected <= num <= expected + 4)
            if is_question_start and num > 250:
                is_question_start = False

        if is_question_start:
            close()
            num = int(mnum.group(1))
            rest = clean(mnum.group(2))
            cur = new_question(ctx, num, mnum.group(1))
            cur["rawBlock"].append(s)
            m = EMPHASIS.match(rest)
            if m:
                cur["emphasisGlyph"] = m.group(1)
                rest = rest[m.end():]
            if rest:
                cur["stemLines"].append(rest)
            if section != "short-essay":
                if matching_latch:
                    cur["flags"].append("matching-item")
                expected = num + 1
            continue

        if cur is None:
            continue
        cur["rawBlock"].append(s)

        if section == "short-essay":
            cur["answerLines"].append(s)
            continue

        mo = OPT_CLEAN.match(s) or OPT_DIGIT.match(s)
        if mo:
            raw_label = strip_bidi(mo.group(1)).upper()
            text = mo.group(2)
            taken = [seg["letter"] for seg in cur["optionSegments"] if seg["letter"]]
            if raw_label in LETTERS and raw_label in taken:
                # The same label twice means the OCR lost a question boundary. Start
                # an orphan block and carry the unclaimed trailing lines into it.
                carried = []
                if cur["optionSegments"]:
                    last = cur["optionSegments"][-1]
                    while len(last["lines"]) > 1 and looks_like_item_start(
                            last["lines"][-1], last["lines"][-2]):
                        carried.insert(0, last["lines"].pop())
                close()
                cur = new_question(ctx, None, None)
                cur["flags"].append("orphan-option-block")
                cur["rawBlock"].extend(carried + [s])
                for c in carried:
                    cur["optionSegments"].append({"letter": None, "lines": [c],
                                                  "raw": None})
            if raw_label in LETTERS:
                cur["optionSegments"].append({"letter": raw_label, "lines": [text],
                                              "raw": raw_label})
            else:
                cur["optionSegments"].append({"letter": None, "lines": [text],
                                              "raw": raw_label})
            matching_latch = False
            continue

        if cur["optionSegments"]:
            cur["optionSegments"][-1]["lines"].append(s)
        else:
            cur["stemLines"].append(s)
    close()
    return questions


def resolve_options(q, repair_counter):
    """Turn the raw option segments into a letter -> text map, honestly.

    Labels the OCR read cleanly anchor the sequence. Anything else is relabelled by
    its POSITION in that sequence, never by what the option says. Where a known OCR
    substitution agrees with the position it is recorded as corroboration; where it
    disagrees, position wins and the disagreement is counted.
    """
    segs = q["optionSegments"]
    if not segs:
        return {}, {}, []

    labels = []
    nxt = 0
    for seg in segs:
        if seg["letter"]:
            labels.append(seg["letter"])
            nxt = LETTERS.index(seg["letter"]) + 1
        else:
            labels.append(LETTERS[nxt] if nxt < len(LETTERS) else None)
            nxt += 1

    # A one-letter hole usually means a label was lost and its text is sitting at the
    # tail of the previous option. Promote that trailing run.
    promoted = []
    for i in range(1, len(segs)):
        a, b = labels[i - 1], labels[i]
        if not a or not b or LETTERS.index(b) - LETTERS.index(a) != 2:
            continue
        prev = segs[i - 1]["lines"]
        cut = None
        for j in range(len(prev) - 1, 0, -1):
            if looks_like_item_start(prev[j], prev[j - 1]):
                cut = j
        if cut is None:
            continue
        missing = LETTERS[LETTERS.index(a) + 1]
        segs.insert(i, {"letter": missing, "lines": prev[cut:], "raw": None})
        del prev[cut:]
        labels.insert(i, missing)
        promoted.append(missing)
        break

    options, repairs = {}, []
    for seg, letter in zip(segs, labels):
        text = clean(" ".join(seg["lines"]))
        if not text or letter is None or letter in options:
            continue
        options[letter] = text
        if seg["raw"] == letter and letter not in promoted:
            continue
        raw = seg["raw"]
        if raw is None:
            method = "recovered-from-run-on-text" if letter in promoted else "position-in-sequence"
        elif LABEL_SUBSTITUTIONS.get(raw) == letter:
            method = "position-in-sequence, corroborated by known OCR substitution"
            repair_counter["substitutionAgreed:" + raw] += 1
        elif raw in LABEL_SUBSTITUTIONS:
            method = "position-in-sequence, known OCR substitution disagreed and was ignored"
            repair_counter["substitutionDisagreed:" + raw] += 1
        else:
            method = "position-in-sequence"
        if raw is not None:
            repair_counter["rawLabel:" + raw] += 1
        repairs.append({"letter": letter, "rawOcrLabel": raw, "method": method,
                        "rawOcrText": " / ".join(seg["lines"])})
    return options, repairs, promoted


# ---------------------------------------------------------------------------
# per-source extraction
# ---------------------------------------------------------------------------
def load_manifest():
    with open(MANIFEST, encoding="utf-8") as fh:
        return {s["sourceId"]: s for s in json.load(fh)["sources"]}


def blank_cause(row, section):
    if "matching-item" in row["ocrFlags"] or "matching-instruction" in row["ocrFlags"]:
        return "matching-item"
    if section == "short-essay":
        return "short-answer"
    if re.search(r"\.{3,}|_{3,}|…|-{3,}", row["rawStem"] or row["stem"]):
        return "fill-in-the-blank"
    return "ocr-failure"


def parse_source(source_id, entry):
    """Everything that comes out of the cached page text, before answers are joined."""
    with open(os.path.join(TEXTCACHE, source_id + ".json"), encoding="utf-8") as fh:
        cache = json.load(fh)
    pages = cache["pages"]
    subject = entry.get("subject") or "unknown"
    file_name = entry["fileName"]

    ratios = sorted(r for r in (divider_ratio(p) for p in pages) if r is not None)
    file_ratio = ratios[len(ratios) // 2] if ratios else 0.5
    kinds = [page_kind(p) for p in pages]

    sections = []
    for i, kind in enumerate(kinds):
        if kind not in ("mcq", "short-essay"):
            continue
        if sections and sections[-1]["kind"] == kind and sections[-1]["pages"][-1] == i:
            sections[-1]["pages"].append(i + 1)
        else:
            sections.append({"kind": kind, "pages": [i + 1]})

    rows = []
    dropped = 0
    repair_counter = collections.Counter()
    page_yield = collections.Counter()

    for sec in sections:
        chapter = chapter_title(pages[sec["pages"][0] - 1])
        stream = []
        for pno in sec["pages"]:
            page = pages[pno - 1]
            target = divider_ratio(page)
            if target is None:
                target = file_ratio
            bookpage = book_page_of(page)
            left, right = [], []
            for line in page.splitlines():
                a, b = split_columns(line, target)
                if a:
                    left.append(a)
                if b:
                    right.append(b)
            for column, lines in (("left", left), ("right", right)):
                for line in lines:
                    if is_furniture(line):
                        dropped += 1
                        continue
                    stream.append((pno, bookpage, column, line))

        ctx_base = {"sourceId": source_id, "file": file_name, "subject": subject,
                    "chapter": chapter, "column": None}
        parsed = parse_stream(stream, ctx_base, sec["kind"])

        # Questions whose number the OCR ate sit between two numbered neighbours, and
        # the books number strictly 1..N with no repeats, so the missing number is
        # forced. Only fill a hole exactly one wide.
        if sec["kind"] != "short-essay":
            for i, q in enumerate(parsed):
                if q["number"] is not None:
                    continue
                prev = next((parsed[j]["number"] for j in range(i - 1, -1, -1)
                             if parsed[j]["number"] is not None), None)
                nxt = next((parsed[j]["number"] for j in range(i + 1, len(parsed))
                            if parsed[j]["number"] is not None), None)
                if prev is not None and nxt is not None and nxt - prev == 2:
                    q["number"] = prev + 1
                    q["numberSource"] = "inferred: the only number missing between its neighbours"
                    q["flags"].append("question-number-inferred-from-sequence")

        for q in parsed:
            options, repairs, promoted = ({}, [], [])
            if sec["kind"] != "short-essay":
                options, repairs, promoted = resolve_options(q, repair_counter)
            raw_stem = clean(" ".join(q["stemLines"]))
            flags = list(q["flags"])
            model_answer = clean(" ".join(q["answerLines"])) or None

            if sec["kind"] == "short-essay":
                qtype = "short-essay"
            elif len(options) >= 2:
                qtype = "mcq"
            elif "matching-item" in flags or "matching-instruction" in flags:
                qtype = "matching-item"
            else:
                qtype = "no-options"

            damaged = []
            if q["number"] is None:
                damaged.append("question-number-lost-in-ocr")
            if not raw_stem and qtype != "short-essay":
                damaged.append("stem-not-recovered")
            if qtype == "mcq":
                have = sorted(options)
                missing = [l for l in LETTERS[:LETTERS.index(have[-1]) + 1] if l not in options]
                if missing:
                    damaged.append("option-labels-missing:" + "".join(missing))
                if len(options) < 4:
                    damaged.append("fewer-than-four-options")
            body = raw_stem + " " + " ".join(options.values())
            if noise_ratio(body) > 0.04:
                damaged.append("unreadable-runs-in-text")
            if non_latin_ratio(body) > 0.05:
                damaged.append("non-latin-ocr-residue")
            if raw_stem and len(raw_stem) < 15 and qtype in ("mcq", "no-options"):
                damaged.append("very-short-stem")
            if repairs:
                flags.append("option-labels-repaired:" + "".join(r["letter"] for r in repairs))
            flags.extend(damaged)

            if damaged:
                severity = "damaged"
            elif repairs or "question-number-inferred-from-sequence" in flags:
                severity = "repaired"
            else:
                severity = "clean"

            row = {
                "sourceId": source_id, "file": file_name, "subject": subject,
                "moduleId": MODULE_ID, "section": sec["kind"], "chapter": q["chapter"],
                "page": q["page"], "bookPage": q["bookPage"], "column": q["column"],
                "number": q["number"], "numberRaw": q["numberRaw"],
                "numberSource": q["numberSource"],
                "questionType": qtype,
                "stem": raw_stem, "rawStem": raw_stem,
                "options": options,
                "optionLabelRepairs": repairs,
                "answer": None, "answerSource": "none", "answerUnavailableReason": None,
                "ocrSeverity": severity,
                "ocrUncertain": severity == "damaged",
                "ocrFlags": flags,
                "licence": dict(LICENCE_STAMP),
            }
            if q.get("emphasisGlyph"):
                row["emphasisGlyph"] = q["emphasisGlyph"]
                row["emphasisGlyphNote"] = ("a glyph precedes this stem in the book; most "
                                            "likely an emphasis/repeat icon, unverified")
            if model_answer:
                row["modelAnswer"] = model_answer
            if qtype != "mcq":
                row["noOptionCause"] = blank_cause(row, sec["kind"])
            if severity == "damaged":
                row["rawBlock"] = q["rawBlock"]
            rows.append(row)
            page_yield[q["page"]] += 1

    return {"cache": cache, "pages": pages, "kinds": kinds, "sections": sections,
            "rows": rows, "dropped": dropped, "repairs": repair_counter,
            "pageYield": page_yield, "subject": subject, "file": file_name}


def summarise(source_id, entry, parsed, grid):
    rows = parsed["rows"]
    pages, kinds = parsed["pages"], parsed["kinds"]
    grid_pages = [i + 1 for i, k in enumerate(kinds) if k == "answer-grid"]
    licence_page = next((i + 1 for i, p in enumerate(pages)
                         if re.search(r"All\s+rights\s+reserved", strip_bidi(p), re.I)), None)

    empty_pages = []
    for i, page in enumerate(pages, start=1):
        if parsed["pageYield"].get(i):
            continue
        empty_pages.append({"page": i, "kind": kinds[i - 1],
                            "chars": len(page),
                            "textSample": clean(" ".join(page.splitlines()[:4]))[:160]})

    numbers = collections.defaultdict(list)
    for r in rows:
        if r["number"] is not None:
            numbers[r["section"]].append(r["number"])
    gaps = {}
    for sec, nums in numbers.items():
        nums = sorted(nums)
        gaps[sec] = [n for n in range(nums[0], nums[-1] + 1) if n not in nums]

    causes = collections.Counter(r["noOptionCause"] for r in rows if r.get("noOptionCause"))
    sev = collections.Counter(r["ocrSeverity"] for r in rows)
    mcq_rows = [r for r in rows if r["questionType"] == "mcq"]
    return {
        "sourceId": source_id,
        "file": parsed["file"],
        "corpusRelativePath": entry.get("corpusRelativePath"),
        "subject": parsed["subject"],
        "sourceCategory": entry.get("sourceCategory"),
        "sourceTier": entry.get("sourceTier"),
        "manifestProcessingStatus": entry.get("processingStatus"),
        "textMode": parsed["cache"].get("mode"),
        "pagesInPdf": entry.get("pageCount"),
        "pagesRead": len(pages),
        "pageKinds": {str(i + 1): k for i, k in enumerate(kinds)},
        "sections": [{"kind": s["kind"], "pdfPages": s["pages"],
                      "chapter": chapter_title(pages[s["pages"][0] - 1])}
                     for s in parsed["sections"]],
        "answerKey": {
            "kind": "printed answer-key page (numbered grid of filled circles)",
            "pdfPages": grid_pages,
            "readable": bool(grid and grid.get("ok")),
            "readFrom": "re-rendered page image, not the cached prose OCR",
            "method": grid.get("method") if grid else None,
            "checks": grid.get("checks") if grid else None,
            "rowsAsRead": grid.get("rows") if grid else None,
            "rejectedBecause": grid.get("rejectedBecause") if grid else None,
            "error": grid.get("error") if grid else None,
            "answersRecorded": sum(1 for r in mcq_rows if r["answer"]),
        },
        "questionsFound": len(rows),
        "mcqRows": len(mcq_rows),
        "noOptionRows": sum(1 for r in rows if r["questionType"] != "mcq"),
        "noOptionRowsByCause": dict(causes),
        "withAnswer": sum(1 for r in rows if r["answer"]),
        "ocrSeverityCounts": dict(sev),
        "optionLabelRepairCounts": dict(parsed["repairs"]),
        "numberGapsBySection": gaps,
        "pagesThatYieldedNothing": empty_pages,
        "furnitureLinesDropped": parsed["dropped"],
        "licence": dict(LICENCE_STAMP, noticeFoundOnPdfPage=licence_page,
                        noticeMatchesExpected=licence_page is not None,
                        compiledBy=COMPILERS, supervisedBy=SUPERVISOR,
                        edition="1st Edition, INT (108) Module"),
    }


# ---------------------------------------------------------------------------
# bank: dedupe, variants, answer conflicts
# ---------------------------------------------------------------------------
def norm(s):
    s = re.sub(r"[^a-z0-9 ]", " ", (s or "").lower())
    return re.sub(r"\s+", " ", s).strip()


def option_sig(options):
    return "|".join(sorted(norm(v) for v in options.values() if norm(v)))


def bank_key(stem, salt):
    base = re.sub(r"[^a-z0-9]+", "-", norm(stem))[:60].strip("-")
    return f"{base or 'q'}-{hashlib.sha1((norm(stem) + salt).encode()).hexdigest()[:8]}"


def build_bank(rows):
    mcqs = [r for r in rows if r["questionType"] == "mcq"]
    stemless = [r for r in mcqs if not norm(r["stem"])]
    stems = collections.defaultdict(lambda: collections.defaultdict(list))
    for r in mcqs:
        n = norm(r["stem"])
        if n:
            stems[n][option_sig(r["options"])].append(r)

    bank, conflicts = [], []
    for _nstem, groups in stems.items():
        ordered = sorted(groups.items(), key=lambda kv: (-len(kv[1]), kv[0]))
        main_sig, main_rows = ordered[0]
        variants = [{
            "sourceId": v["sourceId"], "file": v["file"], "page": v["page"],
            "number": v["number"], "stem": v["stem"], "options": v["options"],
            "answer": v["answer"],
            "reason": "same stem, different option set - kept, not collapsed",
        } for _sig, orows in ordered[1:] for v in [orows[0]]]
        rep = sorted(main_rows, key=lambda r: (r["ocrSeverity"] == "clean",
                                               len(r["options"]), len(r["stem"])))[-1]

        # answers compared by option TEXT, so a reordered list is not a fake conflict
        seen = collections.defaultdict(list)
        for r in main_rows:
            if r["answer"]:
                seen[norm(r["options"].get(r["answer"], "")) or "letter:" + r["answer"]].append(r)
        answer, confidence, conflicting = None, "none", None
        if len(seen) == 1:
            text = next(iter(seen))
            answer = next((l for l, v in rep["options"].items() if norm(v) == text), None)
            if answer is None and text.startswith("letter:"):
                answer = text.split(":", 1)[1]
            confidence = "marked-in-book"
        elif len(seen) > 1:
            confidence = "conflicting"
            conflicting = [{"answer": r["answer"], "answerText": r["options"].get(r["answer"], ""),
                            "sourceId": r["sourceId"], "file": r["file"],
                            "page": r["page"], "number": r["number"]}
                           for rs in seen.values() for r in rs]

        item = {
            "key": bank_key(rep["stem"], main_sig),
            "moduleId": MODULE_ID, "subject": rep["subject"], "chapter": rep["chapter"],
            "stem": rep["stem"], "options": rep["options"],
            "answer": answer, "answerConfidence": confidence,
            "timesAsked": len(main_rows),
            "occurrences": [{"sourceId": r["sourceId"], "file": r["file"], "page": r["page"],
                             "bookPage": r["bookPage"], "number": r["number"]}
                            for r in main_rows],
            "variants": variants,
            "ocrSeverity": max((r["ocrSeverity"] for r in main_rows),
                               key=lambda s: {"clean": 0, "repaired": 1, "damaged": 2}[s]),
            "licence": dict(LICENCE_STAMP),
        }
        if conflicting:
            item["conflictingAnswers"] = conflicting
            conflicts.append(item)
        bank.append(item)

    bank.sort(key=lambda r: (-r["timesAsked"], r["key"]))
    return {
        "distinctQuestions": len(bank),
        "fromMcqRows": len(mcqs),
        "duplicateRowsCollapsed": len(mcqs) - len(stemless) - len(bank),
        "rowsExcludedNoStemRecovered": len(stemless),
        "rowsExcludedNoStemRecoveredDetail": [
            {"sourceId": r["sourceId"], "page": r["page"], "number": r["number"],
             "options": r["options"], "answer": r["answer"]} for r in stemless],
        "variantsKept": sum(len(r["variants"]) for r in bank),
        "answerConflicts": len(conflicts),
        "withAnswer": sum(1 for r in bank if r["answer"]),
        "note": "Same stem AND same option set = one question. Same stem, different "
                "option set = a variant kept on the parent. No answer is ever inferred "
                "from plausibility; answers come only from the books' own answer pages.",
        "questions": bank,
    }


# ---------------------------------------------------------------------------
# EOY cross-check
# ---------------------------------------------------------------------------
def eoy_rows(doc):
    if isinstance(doc, list):
        return [r for r in doc if isinstance(r, dict) and r.get("stem")]
    out = []
    if isinstance(doc, dict):
        for value in doc.values():
            if isinstance(value, list):
                out.extend(r for r in value if isinstance(r, dict) and r.get("stem"))
            elif isinstance(value, dict):
                out.extend(eoy_rows(value))
    return out


def cross_check(bank):
    if not os.path.exists(EOY):
        return {"status": "skipped",
                "reason": f"{os.path.relpath(EOY, REPO)} does not exist yet; re-run this "
                          "script once the EOY lane lands it."}
    try:
        with open(EOY, encoding="utf-8") as fh:
            doc = json.load(fh)
    except Exception as exc:
        return {"status": "error", "reason": f"{type(exc).__name__}: {exc}"}
    rows = eoy_rows(doc)
    exact = collections.defaultdict(list)
    tokens = []
    for r in rows:
        exact[norm(r["stem"])].append(r)
        tokens.append((set(norm(r["stem"]).split()), r))

    def describe(h):
        return {k: h.get(k) for k in ("file", "page", "number", "examSittingYear",
                                      "solvedStatus", "subject", "answer")
                if h.get(k) is not None}

    matches = []
    for q in bank["questions"]:
        n = norm(q["stem"])
        hits, kind = exact.get(n), "exact"
        if not hits:
            qt = set(n.split())
            if len(qt) < 5:
                continue
            scored = []
            for rt, r in tokens:
                if not rt:
                    continue
                jac = len(qt & rt) / len(qt | rt)
                if jac >= 0.75:
                    scored.append((round(jac, 3), r))
            if not scored:
                continue
            scored.sort(key=lambda x: -x[0])
            hits, kind = [r for _s, r in scored], "near"
        matches.append({
            "bankKey": q["key"], "stem": q["stem"], "subject": q["subject"],
            "match": kind, "deptBankAnswer": q["answer"],
            "eoyOccurrences": [describe(h) for h in hits],
        })
    by_subject = collections.Counter(m["subject"] for m in matches)
    return {
        "status": "computed",
        "eoyFile": os.path.relpath(EOY, REPO),
        "eoyQuestionsCompared": len(rows),
        "deptBankQuestions": bank["distinctQuestions"],
        "overlap": len(matches),
        "overlapBySubject": dict(by_subject),
        "matchRule": "identical normalised stem, or >=0.75 Jaccard overlap of stem "
                     "tokens for stems of five words or more",
        "note": "A department-bank question that has appeared in a real EOY paper is a "
                "much stronger blueprint signal than one that has not.",
        "matches": matches,
    }


# ---------------------------------------------------------------------------
def main():
    manifest = load_manifest()
    parsed, entries = {}, {}
    for source_id in SOURCE_IDS:
        entry = manifest.get(source_id)
        if entry is None:
            print(f"MANIFEST-MISS {source_id}")
            continue
        entries[source_id] = entry
        parsed[source_id] = parse_source(source_id, entry)

    # ---- answer keys -------------------------------------------------------
    grid_sources, expected = {}, {}
    for source_id, p in parsed.items():
        grid_page = next((i + 1 for i, k in enumerate(p["kinds"]) if k == "answer-grid"), None)
        if grid_page is None:
            continue
        nums = [r["number"] for r in p["rows"]
                if r["section"] == "mcq" and r["number"] is not None]
        expected[source_id] = max(nums) if nums else 0
        grid_sources[source_id] = (entries[source_id]["absolutePath"], grid_page)
    grids = load_answer_grids(grid_sources, expected)

    for source_id, p in parsed.items():
        grid = grids.get(source_id) or {}
        answers = grid.get("answers") or {}
        for row in p["rows"]:
            if row["section"] == "short-essay":
                row["answerUnavailableReason"] = (
                    "short-essay item: the book gives a model answer, not a lettered key")
                continue
            letter = answers.get(str(row["number"])) if row["number"] is not None else None
            if letter:
                row["answer"] = letter
                row["answerSource"] = "book answer-key page (pdf page %d)" % grid["pdfPage"]
                if row["options"] and letter not in row["options"]:
                    row["answerLetterNotInParsedOptions"] = True
                    if "answer-letter-has-no-parsed-option" not in row["ocrFlags"]:
                        row["ocrFlags"].append("answer-letter-has-no-parsed-option")
            elif not grid.get("ok"):
                row["answerUnavailableReason"] = (
                    "the book's answer-key page could not be read: "
                    + "; ".join(grid.get("rejectedBecause") or [grid.get("error", "unknown")]))
            elif row["number"] is None:
                row["answerUnavailableReason"] = (
                    "the answer key is readable but this question's number was lost in "
                    "OCR, so its answer cannot be joined")
            else:
                row["answerUnavailableReason"] = (
                    "the answer key does not list this question number")

    files = [summarise(sid, entries[sid], parsed[sid], grids.get(sid) or {})
             for sid in parsed]
    rows = [r for sid in parsed for r in parsed[sid]["rows"]]

    bank = build_bank(rows)
    causes = collections.Counter(r["noOptionCause"] for r in rows if r.get("noOptionCause"))
    sev = collections.Counter(r["ocrSeverity"] for r in rows)
    repairs = collections.Counter()
    for p in parsed.values():
        repairs.update(p["repairs"])
    mcq_rows = [r for r in rows if r["questionType"] == "mcq"]

    doc = {
        "generatedBy": "scripts/kasr/extract/108-INT/mcq.py",
        "generatedFrom": "cached OCR page text in scripts/kasr/extract/pagetext/ for the two "
                         "'Department Questions' sources of Kasr Al Ainy module 108 INT, plus "
                         "a targeted re-render of each book's printed answer-key page "
                         "(paths via docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json)",
        "moduleId": MODULE_ID,
        "transcriptionOnly": "Nothing here was authored, completed or corrected. Option "
                             "labels the OCR mangled are relabelled by their position in "
                             "the sequence, never by what the option says, and every "
                             "relabelling keeps the raw glyph in optionLabelRepairs. "
                             "Answers come only from the books' own answer-key pages.",
        "licence": {
            "notice": LICENCE_NOTICE,
            "appliesTo": [{"sourceId": f["sourceId"], "file": f["file"],
                           "subject": f["subject"],
                           "noticeFoundOnPdfPage": f["licence"]["noticeFoundOnPdfPage"]}
                          for f in files],
            "compiledBy": COMPILERS,
            "supervisedBy": SUPERVISOR,
            "edition": "1st Edition, INT (108) Module",
            "effect": "The notice forbids republication or any use beyond personal use "
                      "without the rights holders' permission. This file is the private "
                      "preserved original required by §6 of "
                      "docs/medical-library-program/KASR-SOURCE-EXTRACTION-PLAN.md. It is "
                      "not clearance to publish.",
            "publicationStatus": "NOT CLEARED FOR PUBLICATION",
            "requiredAction": "No question from these two sources may reach a student, "
                              "verbatim or lightly reworded, until the user makes an "
                              "explicit rights decision.",
        },
        "totals": {
            "sources": len(files),
            "pagesRead": sum(f["pagesRead"] for f in files),
            "questionsFound": len(rows),
            "mcqRows": len(mcq_rows),
            "noOptionRows": sum(1 for r in rows if r["questionType"] != "mcq"),
            "noOptionRowsByCause": dict(causes),
            "withAnswer": sum(1 for r in rows if r["answer"]),
            "answerKeyCoverage": "%d of %d MCQ rows carry an answer taken from the book's "
                                 "own answer-key page" % (
                                     sum(1 for r in mcq_rows if r["answer"]), len(mcq_rows)),
            "ocrSeverityCounts": dict(sev),
            "optionLabelRepairCounts": dict(repairs),
        },
        "eoyCrossCheck": cross_check(bank),
        "files": files,
        "bank": bank,
        "questions": rows,
    }
    tmp = OUT + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(doc, fh, ensure_ascii=False, indent=1)
    os.replace(tmp, OUT)

    for f in files:
        print(f"{f['file']}: {f['questionsFound']} rows "
              f"({f['mcqRows']} mcq / {f['noOptionRows']} no-options), "
              f"key p{f['answerKey']['pdfPages']} readable={f['answerKey']['readable']} "
              f"answers={f['answerKey']['answersRecorded']}, "
              f"severity={f['ocrSeverityCounts']}, gaps={f['numberGapsBySection']}")
    print(f"wrote {os.path.relpath(OUT, REPO)}: {len(rows)} rows, "
          f"{doc['totals']['withAnswer']} answered, "
          f"{bank['distinctQuestions']} distinct, "
          f"{bank['answerConflicts']} answer conflicts, "
          f"EOY overlap {doc['eoyCrossCheck'].get('overlap')}")


if __name__ == "__main__":
    main()
