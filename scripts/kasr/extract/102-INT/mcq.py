#!/usr/bin/env python3
"""Pull the MCQs out of the five 102 INT department question books.

    python3 scripts/kasr/extract/102-INT/mcq.py ocr      # re-OCR at 400dpi --psm 4
    python3 scripts/kasr/extract/102-INT/mcq.py keys     # multi-pass OCR of the key tables
    python3 scripts/kasr/extract/102-INT/mcq.py build    # parse -> mcq-bank.json
    python3 scripts/kasr/extract/102-INT/mcq.py show <sid> <first> [last]

Three things this file exists to get right.

**The shared 200dpi `--psm 6` cache is not good enough for these books.** It is
fine for prose, and it destroys two things that matter here. The physiology
scans carry the shadow of the book's gutter down one margin, and at `--psm 6`
tesseract reads that shadow as a column of `i`, `|` and `0` glyphs interleaved
line-by-line with the text, which turns an option into `‎d- 15 associated with‏ ا`.
And every answer key in this corpus is a *grid table*: at 200dpi `--psm 6` the
whole of the biochemistry book's key for carbohydrates comes out as
`ee [ike Para [aia [ab [sts [ote`. Re-rendered at 400dpi and read with `--psm 4`
— one column of variable-width text — the same table reads `1.b 11.b |21.d |31.a`
and the gutter noise is gone. So this script keeps its own cache and does not
touch the shared one.

**Option labels corrupt in ways that silently drop an option**, and the label
that goes missing is disproportionately `d` — `d.` scans as `0.`, `c.` as `¢.`
or `6.`. A parser keyed on `[a-d]` loses the option and, because `d` is a common
key in these books, quietly skews the answer distribution with no error. So the
parser here is driven by the *expected* label: sitting on option `c` it will
accept any of `c ¢ 6 e ( <` for the next one, and sitting on `d` any of
`d 0 O o 4 cl`. Accepting a confusable set is only safe because the expectation
narrows it — a bare `0.` is read as `d` when `d` is what is due next and as
nothing at all otherwise. Every question then gets its options counted, and
anything short of four is banked with `suspect: "option count"` rather than
shipped as a clean three-option MCQ.

**A key is only worth having if the book printed it.** Every key here comes from
a grid table that OCR reads imperfectly, so each key page is read four times —
two resolutions by two page-segmentation modes — and a cell is accepted only
where the passes that saw it agree. A cell no pass read, or one they disagree
about, yields `correct: null`. Guessing would be worse than nothing: an invented
key teaches the wrong answer in the department's own voice.
"""
import json
import os
import re
import subprocess
import sys
import tempfile
from concurrent.futures import ThreadPoolExecutor

try:
    from PIL import Image
except ImportError:                                   # grid splitting is optional
    Image = None

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
MANIFEST = os.path.join(REPO, "docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json")
CACHE = os.path.join(HERE, "pagetext-400")
KEYS = os.path.join(HERE, "answer-keys.json")
BANK = os.path.join(HERE, "mcq-bank.json")

# Rendered pages are large and short-lived. `MCQ_TMP` exists because this
# machine's sandbox does not let tesseract read `/tmp`, which is where
# `tempfile` would otherwise put them — the failure looks like tesseract
# returning nothing at all, on every page, silently.
tempfile.tempdir = os.environ.get("MCQ_TMP") or os.path.join(HERE, ".ocr-tmp")
os.makedirs(tempfile.tempdir, exist_ok=True)

BIO_BOOK = "src_07f0a0ff41addf826c7f"      # 154p OCR, Biochemistry, 102 + 103
BIO_SOLVED = "src_62ce633e85fb73732e35"    # 44p native, Biochemistry, solved
PHYSIO_YEAR = "src_2093c80b1f9c25f9c0a4"   # 72p OCR, whole first year
PHYSIO_BLOOD = "src_439c87aadd2a449415d2"  # 15p OCR, Blood
PHYSIO_ANS = "src_b21bbb801aed8c932206"    # 10p OCR, Autonomic

SOURCES = [BIO_BOOK, BIO_SOLVED, PHYSIO_YEAR, PHYSIO_BLOOD, PHYSIO_ANS]
OCR_SOURCES = [BIO_BOOK, PHYSIO_YEAR, PHYSIO_BLOOD, PHYSIO_ANS]


def manifest():
    with open(MANIFEST, encoding="utf-8") as fh:
        return {s["sourceId"]: s for s in json.load(fh)["sources"]}


# ---------------------------------------------------------------- OCR


def render(pdf, page, dpi, out_stub):
    subprocess.run(["pdftoppm", "-f", str(page), "-l", str(page), "-r", str(dpi),
                    "-png", "-singlefile", pdf, out_stub],
                   capture_output=True, timeout=300)
    return out_stub + ".png"


def tess(png, psm):
    if not os.path.exists(png):
        return ""
    r = subprocess.run(["tesseract", png, "stdout", "-l", "eng", "--psm", str(psm)],
                       capture_output=True, timeout=420)
    return r.stdout.decode("utf-8", "replace")


def ocr_page(pdf, page, dpi=400, psm=4):
    with tempfile.TemporaryDirectory(dir=os.environ.get("MCQ_TMP") or None) as td:
        return tess(render(pdf, page, dpi, os.path.join(td, "p")), psm)


def cmd_ocr(argv):
    """Re-render every OCR source at 400dpi and read it with --psm 4."""
    by_id = manifest()
    force = "--force" in argv
    os.makedirs(CACHE, exist_ok=True)
    for sid in OCR_SOURCES:
        out = os.path.join(CACHE, sid + ".json")
        if os.path.exists(out) and not force:
            print("cached %s" % sid, flush=True)
            continue
        entry = by_id[sid]
        pdf, n = entry["absolutePath"], entry["pageCount"]
        with ThreadPoolExecutor(max_workers=6) as pool:
            pages = list(pool.map(lambda p: ocr_page(pdf, p), range(1, n + 1)))
        doc = {"sourceId": sid, "file": entry["corpusRelativePath"],
               "mode": "ocr", "dpi": 400, "psm": 4, "pages": pages,
               "emptyPages": [i + 1 for i, t in enumerate(pages) if not t.strip()]}
        with open(out, "w", encoding="utf-8") as fh:
            json.dump(doc, fh, ensure_ascii=False)
        print("ocr %s %dp  %d empty" % (sid, n, len(doc["emptyPages"])), flush=True)


def pages_of(sid):
    """400dpi text where we made it, the shared cache for the native book."""
    local = os.path.join(CACHE, sid + ".json")
    if os.path.exists(local):
        return json.load(open(local, encoding="utf-8"))["pages"]
    shared = os.path.join(HERE, "..", "pagetext", sid + ".json")
    return json.load(open(shared, encoding="utf-8"))["pages"]


def cmd_show(argv):
    sid = argv[0]
    pages = pages_of(sid)
    first = int(argv[1]) if len(argv) > 1 else 1
    last = int(argv[2]) if len(argv) > 2 else len(pages)
    for i in range(first, min(last, len(pages)) + 1):
        print("\n===== p%d =====" % i)
        print(pages[i - 1].rstrip())


# ---------------------------------------------------------------- answer keys

# The 400dpi `--psm 4` render is already in the cache, so the extra passes are
# the ones it does not already cover: a second resolution, and the segmentation
# mode that reads a row the other one drops.
KEY_PASSES = [(600, 4), (600, 6), (400, 6), (400, "grid"), (600, "grid")]

# `1.b`, `1. b`, `1-b`, `21.d`, `6.c}`. The letter must be followed by a cell
# boundary or end of line, so `3. Fibrinogen has` is not read as `3-f`.
KEY_CELL = re.compile(r"(?<![\d.])(\d{1,3})\s*[.\-,:]?\s*([a-eA-E])(?![\w])")


def parse_key_text(text):
    """Every `<number><letter>` cell this pass could see.

    `l` and `I` are folded to `1` first. In these tables the digit 1 scans as a
    lower-case L about as often as it scans as itself — `ll.c`, `3l.a`, `S5l.c`
    are all real cells from one page — and the fold is safe because no answer
    letter is `l` or `I`: only the number half of a cell can contain one.
    """
    out = {}
    for line in text.split("\n"):
        line = line.replace("l", "1").replace("I", "1").replace("|", " ")
        for m in KEY_CELL.finditer(line):
            n, letter = int(m.group(1)), m.group(2).lower()
            if 1 <= n <= 300:
                out.setdefault(n, []).append(letter)
    # Within one pass a number should appear once. If it appeared twice with
    # different letters, that pass is confused about this row; drop the cell.
    return {n: v[0] for n, v in out.items() if len(set(v)) == 1}


# What follows the key in the biochemistry book: `II- Enumerate:`, `II- Mention:`,
# `III- On biochemical basis explain:`. Left in the region, its numbered list
# donates false cells — `1. A 45-year-old man` parses as question 1, answer a.
AFTER_KEY = re.compile(r"^\s*\(?(?:I{2,}|11|1I|V|IV)\s*[-.)]|enumerate|mention|compare|"
                       r"on\s+biochemical|give\s+short|match\b|short\s+answer", re.I)


def key_region(text):
    """The grid under the last `Answer Key` heading, and nothing after it."""
    m = None
    for m in re.finditer(r"answer\s*key.*", text, re.I):
        pass
    if not m:
        return ""
    # `Answer Key (Match)` on page 67 keys a matching exercise, not the MCQs.
    # It numbers from 1 like everything else, so merged into the chapter's key it
    # would quietly overwrite the answers to that chapter's first four MCQs with
    # the answers to a different exercise.
    if re.search(r"match", m.group(0), re.I):
        return ""
    tail = []
    for line in text[m.end():].split("\n"):
        if AFTER_KEY.search(line):
            break
        tail.append(line)
    return "\n".join(tail)


# ------------------------------------------------- ruled key grids, column-wise

def profile(img, axis):
    """Mean brightness per column (axis=0) or per row (axis=1)."""
    w, h = img.size
    if axis == 0:
        return list(img.resize((w, 1), Image.BOX).get_flattened_data())
    return list(img.resize((1, h), Image.BOX).get_flattened_data())


def runs(indices, gap=3):
    out = []
    for i in indices:
        if out and i - out[-1][-1] <= gap:
            out[-1].append(i)
        else:
            out.append([i])
    return out


def grid_columns(png):
    """The x-ranges between the vertical rules of a ruled table, if there is one.

    `--psm 4` reads a seven-column key grid as one column of text and silently
    drops whole columns of it: the Blood key's answers for questions 11-20 and
    51-70 are perfectly legible on the page and appear in no whole-page pass at
    all. Cut along the printed rules first and each strip is what tesseract is
    actually good at — a short single column — and those cells come back.
    """
    try:
        from PIL import Image as _I
    except ImportError:
        return None, None
    img = _I.open(png).convert("L")
    w, h = img.size
    rows = [i for i, v in enumerate(profile(img, 1)) if v < 235]
    if not rows:
        return None, None
    top, bot = rows[0], rows[-1]
    band = img.crop((0, top, w, bot))
    cols = profile(band, 0)
    floor = min(cols)
    rules = [(g[0] + g[-1]) // 2
             for g in runs([i for i, v in enumerate(cols)
                            if v < floor + (255 - floor) * 0.35])]
    # Evenly spaced, at least five of them: a table of four or more columns.
    if len(rules) < 5:
        return None, None
    gaps = [b - a for a, b in zip(rules, rules[1:])]
    if max(gaps) > 1.6 * min(gaps) or min(gaps) < w // 20:
        return None, None
    return [(a, b) for a, b in zip(rules, rules[1:])], (top, bot)


def grid_rows(img, columns, band):
    """How many rows the ruled grid has, counted from its own horizontal rules.

    The alternative — infer it from whichever column reads `1, 2, 3 …` — fails
    on exactly the pages that need this most: on the Blood key not one column
    reads its full run, so there is nothing to infer from. The printed rules are
    there whether or not the text under them survived the scan.
    """
    x0, x1 = columns[0][0], columns[-1][1]
    top, bot = band
    sub = img.crop((x0, top, x1, bot))
    prof = profile(sub, 1)
    floor = min(prof)
    hits = [i for i, v in enumerate(prof) if v < floor + (255 - floor) * 0.35]
    lines = runs(hits, gap=4)
    if len(lines) < 4:
        return 0
    gaps = [b[0] - a[0] for a, b in zip(lines, lines[1:])]
    if max(gaps) > 1.6 * min(gaps):
        return 0
    return len(lines) - 1


def read_grid(png):
    """Cells read column by column, numbered by where they sit, not by OCR.

    The number in a cell is checked against the number that cell's position
    demands: a grid of R rows and C columns is filled column-major, so the k-th
    strip holds k*R+1 to (k+1)*R and nothing else. The guard is not "do these
    numbers increase" but "is this the strip that holds 11 to 20" — because a
    strip cut a few pixels wrong reads `21. a` as `1. a` all the way down, and a
    column of those is internally consistent enough to pass any test that only
    looks at the numbers on their own. A strip where most of what was read falls
    outside its own range is misaligned, and is dropped whole.
    """
    if Image is None:
        return {}
    columns, band = grid_columns(png)
    if not columns:
        return {}
    img = Image.open(png).convert("L")
    rows = grid_rows(img, columns, band)
    if rows < 3 or rows > 40:
        return {}
    top, bot = band
    out = {}
    for k, (a, b) in enumerate(columns):
        crop = img.crop((a + 4, top, b - 4, bot))
        with tempfile.TemporaryDirectory() as td:
            path = os.path.join(td, "col.png")
            crop.save(path)
            cells = parse_key_text(tess(path, 6))
        if not cells:
            continue
        lo, hi = k * rows + 1, (k + 1) * rows
        inside = {n: v for n, v in cells.items() if lo <= n <= hi}
        if len(inside) * 2 < len(cells):
            continue
        out.update(inside)
    return out


def cmd_keys(argv):
    """Read every answer-key page four ways and keep only what agrees."""
    by_id = manifest()
    force = "--force" in argv
    if os.path.exists(KEYS) and not force:
        print("cached %s" % KEYS)
        return
    out = {}
    for sid in OCR_SOURCES:
        pages = pages_of(sid)
        pdf = by_id[sid]["absolutePath"]
        targets = [i + 1 for i, p in enumerate(pages) if re.search(r"answer\s*key", p, re.I)]
        # The physiology books print the key as an unlabelled grid at the foot of
        # the last page of a section, so the heading search misses it. A page
        # whose tail is mostly `<number><letter>` cells is a key page too.
        for i, p in enumerate(pages):
            if (i + 1) not in targets and len(parse_key_text(p[-900:])) >= 8:
                targets.append(i + 1)
        targets.sort()
        out[sid] = {}
        def cells_in(txt):
            """A pass only votes where it actually saw a grid.

            Half the key pages print no `Answer Key` heading — the physiology
            books just set the grid at the foot of the section's last page — so
            the fallback is the page's tail. That tail is prose as often as it is
            a table, and prose donates cells: `1. A 45-year-old man` reads as
            `1-a`. Requiring six cells before the fallback counts is what keeps
            a paragraph from voting on an answer key.
            """
            region = key_region(txt)
            if region.strip():
                return parse_key_text(region)
            got = parse_key_text(txt[-900:])
            return got if len(got) >= 6 else {}

        def one_pass(job):
            page, dpi, psm = job
            with tempfile.TemporaryDirectory() as td:
                png = render(pdf, page, dpi, os.path.join(td, "p"))
                if psm == "grid":
                    return page, read_grid(png)
                txt = tess(png, psm)
            return page, cells_in(txt)

        jobs = [(page, dpi, psm) for page in targets for dpi, psm in KEY_PASSES]
        by_page = {page: dict() for page in targets}
        for page in targets:
            # The cached 400dpi `--psm 4` read counts as a pass; it is the one
            # that produced these page choices and it reads several grids
            # outright.
            for n, letter in cells_in(pages[page - 1]).items():
                by_page[page].setdefault(n, []).append(letter)
        with ThreadPoolExecutor(max_workers=5) as pool:
            for page, cells in pool.map(one_pass, jobs):
                for n, letter in cells.items():
                    by_page[page].setdefault(n, []).append(letter)

        for page in targets:
            votes = by_page[page]
            # Cells numbered past the end of the section are left in rather than
            # trimmed. They are noise — a page number, a stray `1.d` below the
            # grid — but they are harmless noise, because a key is only ever
            # consulted by the number of a question that was actually parsed.
            # Trimming them on a density rule cost far more than it saved: the
            # Blood key legitimately has holes in it, and the rule that removed
            # a spurious "question 149" also removed two thirds of the real
            # grid around it.
            cells, conflicts = {}, {}
            for n, vs in votes.items():
                if len(set(vs)) == 1:
                    cells[n] = {"letter": vs[0], "votes": len(vs)}
                else:
                    conflicts[n] = sorted(set(vs))
            out[sid][str(page)] = {"cells": cells, "conflicts": conflicts}
            print("key %s p%-4d %3d agreed  %2d conflicted"
                  % (sid, page, len(cells), len(conflicts)), flush=True)
    with open(KEYS, "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=1)


# ---------------------------------------------------------------- parsing

# What the *expected* label is allowed to have scanned as. Narrow on purpose:
# each set holds only glyphs actually observed standing in for that letter in
# these five files, and is only ever consulted for the one label due next.
CONFUSABLE = {
    "a": "aA@",
    "b": "bB6h5",
    "c": "cC¢6e(<",
    "d": "dD0Oo4",
    "e": "eE6c",
}
# `a)`, `a-`, `a.`, `a `, `(a)`, `a~`, `a+`, and the RTL-mangled `a-` the Arabic
# language pack leaves behind. Two of them in a row, because the scans produce
# `27/- lron absorption:` and `c~- Is a passive process` — a stroke of the
# original hyphen picked up as a second character. One `-` short of allowing that
# costs the whole question, since a stem the parser cannot see is a stem the next
# question's options get appended to.
DELIM = r"[\)\.\-\–\—~+:,/\\]{1,2}"


# What the scanner leaves in the left margin before a label: the shadow of the
# book's gutter, the tail of the previous line's rule, a stray tilde. `43- Which
# of the following…` is lost outright because its first option scans as
# `~ a- Gastrointestinal disease`, and a question whose option `a` is never seen
# collects no options at all and is dropped without a word.
JUNK = " \t|iI!¡[]{}()*.,'\"“”‘’~_-—–=+\u200f\u200e\u202b\u202c"


def option_line(line, label):
    """`(text)` if this line opens the option `label`, else None."""
    body = line.lstrip(JUNK)
    for ch in CONFUSABLE[label]:
        m = re.match(r"%s\s*%s\s*(.*)$" % (re.escape(ch), DELIM), body)
        if m and m.group(1).strip():
            return m.group(1).strip()
        # `a Count is increased` — the delimiter itself dropped out. Only
        # accepted for a single-character label followed by a capital, which is
        # what an option looks like and what a word does not.
        m = re.match(r"%s\s+([A-Z].*)$" % re.escape(ch), body)
        if m:
            return m.group(1).strip()
    return None


# Digits corrupt as reliably as option labels do, and a question number that
# fails to match costs the whole question and pollutes the one before it. These
# are the substitutions actually seen in these five scans.
DIGIT_FIX = str.maketrans({"O": "0", "o": "0", "Q": "0", "D": "0",
                           "l": "1", "I": "1", "i": "1", "|": "1", "!": "1",
                           "S": "5", "s": "5", "Z": "2", "z": "2",
                           "/": "7", "T": "7", "B": "8", "g": "9", "q": "9"})
NUMBERISH = re.compile(r"([0-9OoQDlIi|!SsZz/TBgq]{1,3})\s*%s\s*(.*)$" % DELIM)


def question_line(line, number, fuzzy=False):
    """`(text)` if this line opens question `number`, else None.

    With `fuzzy` on, a leading token of the right length that differs from the
    number in one character also counts. That is what recovers `20- Iron:` for
    question 26 and `2/- iron absorption:` for question 27 — two consecutive
    questions the Blood extract loses outright to a `6` read as `0` and a `7`
    read as a slash, taking the rest of the book's numbering with them. The
    caller only turns it on for the question due immediately next, and only
    confirms it by reading ahead for an option `a`.
    """
    body = line.lstrip(JUNK)
    m = re.match(r"\(?%d\s*%s\s*(.*)$" % (number, DELIM), body)
    if m and m.group(1).strip():
        return m.group(1).strip()
    if not fuzzy:
        return None
    m = NUMBERISH.match(body)
    if not m or not m.group(2).strip():
        return None
    token = m.group(1).translate(DIGIT_FIX)
    want = str(number)
    if len(token) != len(want):
        return None
    if sum(1 for x, y in zip(token, want) if x != y) != 1:
        return None
    return m.group(2).strip()


NOISE = re.compile(r"^[\s|iI!¡\[\]{}()*.,_\-=~'`\\/0-9؀-ۿ‏‎]*$")
STOP = re.compile(r"answer\s*key|key\s*answer|^\s*I?I+\s*[\-\.\)]\s*(enumerate|compare|mention|match|on\s|give|match)"
                  r"|short\s+answer\s+questions|^\s*I?I+\s*-\s*$", re.I)


DOT_LEADER = re.compile(r"\.{3,}|\.\s\.\s\.")
LABELS = ["a", "b", "c", "d", "e"]


def looks_like_new_question(lines, i, due):
    """Tie-break a line that reads as both `<n+1>-` and as the option due next.

    It happens because the glyph sets overlap: `b` scans as `6`, `c` as `6`,
    `d` as `0` — so on question 5 with only two options read so far, the line
    `6- The a- adrenergic receptors produce:` is a candidate for option `c` and
    for question 6 at the same time. Resolve it by reading ahead: if the next
    labelled line is an `a`, this was a stem; if it is the label that follows
    `due`, this was an option.
    """
    after = LABELS[LABELS.index(due) + 1] if due and due != "e" else None
    seen = 0
    for line in lines[i + 1:]:
        if NOISE.match(line):
            continue
        if option_line(line, "a"):
            return True
        if after and option_line(line, after):
            return False
        seen += 1
        if seen >= 8:
            break
    return True


def parse_block(lines, first_number=1):
    """Walk a run of lines as `N. stem / a) .. / b) .. / ...`.

    Driven by what is due next rather than by a general regex, because that is
    the only way to accept `0.` as `d.` without also accepting it as a stray
    line number in the middle of a stem.

    Blank lines carry information here and are not merely skipped. `--psm 4`
    keeps a wrapped line hard against the line it wraps and puts a blank line
    between blocks, so a line with a blank before it is a new block rather than
    a continuation. That is what separates a genuine second line of an option
    from the fragment a fill-in-the-blank stem sheds: the book prints
    `DNA replication occurs in ......... of cell cycle.` and OCR emits the tail
    `of cell cycle.` as its own block *after* option d. Appending that to option
    d would invent an option the book never printed, so a blank-separated
    orphan is returned to the stem whenever the stem carries a dot leader —
    which is the only place this reordering has been observed.
    """
    items, cur, n = [], None, first_number
    blank = False

    def close():
        if cur and cur["options"]:
            items.append(cur)

    def start(text, number, gap, at):
        return {"number": number, "stemLines": [text], "options": {}, "gap": gap,
                "_last": None, "line": at}

    for i, raw in enumerate(lines):
        line = raw.rstrip()
        if STOP.search(line):
            close()
            return items, i
        if not line.strip():
            blank = True
            continue

        if cur is None:
            if NOISE.match(line):
                continue
            text = question_line(line, n)
            if text is None and n == first_number:
                # Tolerate the section's first question being unreadable rather
                # than losing the whole section behind it.
                text = question_line(line, n + 1)
                if text is not None:
                    n += 1
            if text is not None:
                cur = start(text, n, False, i)
            blank = False
            continue

        due = LABELS[len(cur["options"])] if len(cur["options"]) < 5 else None
        opt = option_line(line, due) if due else None
        ahead, nxt, guessed = 0, None, False
        for step in (1, 2, 3):
            nxt = question_line(line, n + step)
            if nxt is not None:
                ahead = step
                break
        if nxt is None and len(cur["options"]) >= 3:
            # Only once the current question is finished, and only for the very
            # next number: a misread digit anywhere else is not worth the risk of
            # cutting a question in half.
            nxt = question_line(line, n + 1, fuzzy=True)
            ahead, guessed = 1, nxt is not None

        if nxt is not None and (opt is not None or guessed):
            if not looks_like_new_question(lines, i, due):
                nxt = None
        # Four options in hand and the next number in sight: the question is
        # finished. Only a five-option question can still be taking options,
        # and `e` shares no glyph with a digit, so there is no contest here.
        if nxt is not None:
            close()
            n += ahead
            cur = start(nxt, n, ahead > 1, i)
            cur["fuzzyNumber"] = guessed
            blank = False
            continue
        if opt is not None:
            cur["options"][due] = opt
            cur["_last"] = due
            blank = False
            continue

        # The noise test comes *after* the option test, not before it. `6) 22`
        # is an option — `c)` misread — and it is also nothing but digits,
        # brackets and space, which is exactly what the margin noise looks like.
        # Tested first, the noise rule eats it, and the option after it is then
        # appended to the previous option's text. Every numeric-answer question
        # in the biochemistry book was losing an option this way.
        if NOISE.match(line):
            blank = True
            continue

        if cur["_last"] and not (blank and DOT_LEADER.search(" ".join(cur["stemLines"]))):
            cur["options"][cur["_last"]] += " " + line.strip()
        else:
            cur["stemLines"].append(line.strip())
        blank = False

    close()
    return items, len(lines)


def clean(text):
    """Join wrapped lines. Nothing else — the stem is banked as OCR read it."""
    return re.sub(r"\s+", " ", text).strip(" \t|_.")


# ---------------------------------------------------------------- books

BIO_CHAPTERS = {
    "introduction to biochemistry": None,   # not a chapter of the 102 subject tree
    "carbohydrates of biological importance": "Carbohydrates of Biological Importance",
    "lipids of biological importance": "Lipids of Biological Importance",
    "amino acids of biological importance": "Amino Acids of Biological Importance",
    "proteins of biological importance": "Proteins of Biological Importance",
    "proteins of extracellular matrix": "Proteins of Extracellular Matrix",
    "chemistry of hemoproteins": "Chemistry of Hemoproteins",
    "hemoproteins": "Chemistry of Hemoproteins",
    "enzymes": "Enzymes",
    "chemistry of nucleotides": "Chemistry of Free Nucleotides",
    "nucleotides": "Chemistry of Free Nucleotides",
    "chemistry of nucleic acids": "Chemistry of Nucleic Acids",
    "nucleic acids": "Chemistry of Nucleic Acids",
    "dna synthesis": "DNA Synthesis (Replication) and Repair",
    "rna synthesis": "RNA Synthesis (Transcription)",
    "protein synthesis": "Protein Synthesis (Translation)",
    "regulation of gene expression": "Regulation of Gene Expression",
    "cell cycle": "Cell Cycle, Apoptosis, and Tumor Suppressor Genes",
}

BLOOD_CHAPTERS = [
    (r"plasma protein|albumin|globulin", "Plasma proteins"),
    (r"erythropoiet", "Erythropoiesis"),
    (r"erythropoiesis", "Erythropoiesis"),
    (r"\biron\b|ferrit|transferr|ferrous|ferric", "Iron"),
    # `B12` is a subscript in print and comes back as `By2`, `Bj2`, `B,2`,
    # `B42`, `Biz` — matching only the literal files half this chapter's
    # questions under RBCs and haemoglobin instead, on the strength of the words
    # "red blood cells" in the distractors.
    (r"vitamin\s*b\s*[,.]?\s*[1iIl|yjJ4t]\s*[2zZ]|\bb\s*12\b|cobalamin|intrinsic factor|"
     r"folic|pernicious", "Vitamin B12 and folic acid"),
    (r"anemia|anaemia|polycythemia|thalass|sickle", "Anaemia"),
    (r"platelet|thromboxane|haemostas|hemostas|bleeding time|aspirin", "Platelets and haemostasis"),
    (r"heparin|warfarin|citrate|oxalate|anticoagul", "Anticoagulants"),
    (r"protein c\b|protein s\b|thrombomodulin|antithrombin|plasmin|fibrinolys",
     "Physiological limitations of blood coagulation"),
    (r"haemophil|hemophil|purpura|von willebrand|disseminated", "Abnormalities of haemostasis"),
    (r"blood group|transfus|rh\b|agglutin|abo", "Blood groups and blood transfusion"),
    (r"coagulat|clot|factor [ivx]+|prothrombin|fibrinogen|thrombin|vitamin k",
     "Platelets and haemostasis"),
    (r"erythrocyte|red blood cell|\brbc|h(a)?emoglobin|\bhb\b", "RBCs and haemoglobin"),
    (r"leucocyte|leukocyte|wbc|neutrophil|lymphocyte|immun", "General functions and blood components"),
    (r"plasma|blood volume|viscosity|haematocrit|hematocrit",
     "General functions and blood components"),
]

ANS_CHAPTERS = [
    # `\b` before `gangli` is doing real work: without it, `preganglionic` and
    # `postganglionic` match, and every question about where a fibre relays gets
    # filed under Autonomic ganglia — 32 of 94 on the first pass, against a
    # chapter that the book covers in about six.
    (r"\bgangli(?:on|a|onic)\b", "Autonomic ganglia"),
    (r"receptor|adrenergic|cholinergic|muscarinic|nicotinic|acetylcholine|noradrenalin|"
     r"norepinephrin|adrenalin|epinephrin|catecholamin|monoamine|dopamine|transmitter",
     "Chemical transmission at autonomic junctions and autonomic receptors"),
    (r"parasympath|vagus|oculomotor|cranial nerve", "Parasympathetic nervous system"),
    (r"sympath|splanchnic|adrenal medulla|horner", "Sympathetic nervous system"),
    (r"autonomic", "Organisation of autonomic nervous system"),
]


def chapter_for(text, table):
    low = text.lower()
    for pattern, name in table:
        if re.search(pattern, low):
            return name
    return None


def bio_chapter(page_text):
    """The running header printed at the top of every page of the biochem book."""
    for line in page_text.split("\n")[:4]:
        m = re.match(r"\s*=+\s*(.+?)\s*$", line)
        if not m:
            continue
        name = m.group(1).strip()
        low = name.lower()
        for probe, canonical in BIO_CHAPTERS.items():
            if probe in low:
                return name, canonical
        return name, None
    return None, None


def short(sid):
    return sid.replace("src_", "")[:8]


def make_item(sid, page, number, ordinal, stem, options, module, subject,
              path, correct, correct_source, suspect, chapter=None):
    return {
        # Position in the source, not a running counter: page plus the number the
        # book itself printed. Drop a question from the middle of a rerun and every
        # other id is unchanged, which a counter could not promise.
        "id": "MCQ-102-%s-%s" % (short(sid), ordinal),
        "sourceId": sid,
        "page": page,
        "module": module,
        "subject": subject,
        "modulePathGuess": path,
        "stem": stem,
        "options": options,
        "correct": correct,
        "correctSource": correct_source,
        "suspect": suspect,
        "printedNumber": number,
        "chapter": chapter,
    }


def suspect_for(options):
    """What is visibly wrong with this question's options, if anything.

    Four is the floor: three options is almost always an option that scanned
    away, and the brief for this corpus is that the one that scans away is
    disproportionately `d`. A short option is *not* by itself suspicious —
    half the biochemistry book's numeric questions answer `a) 2 b) 3 c) 4 d) 5`
    — so the text test asks whether an option holds any letter or digit at all.
    """
    if len(options) < 4:
        return "option count"
    if any(not re.search(r"[0-9A-Za-z]", v) for v in options.values()):
        return "option text"
    # An option that swallowed the question after it. When a stem's number is
    # destroyed beyond rescue, its text and its options are appended to whatever
    # option was open, and the result has four well-formed options and one that
    # is three questions long. Nothing else in the record shows it.
    #
    # Two giveaways, because neither catches both halves of the problem. An
    # embedded option label must be followed by a *capital* — the biochemistry
    # book writes the alpha helix as `a- helix`, and a rule that only looked for
    # `a-` called every one of those a run-on. And an option that absorbed an
    # answer-key grid carries no capitals at all, so length carries that half.
    if any(re.search(r"[\s.](?:[a-e][\-\)]\s|\d{1,2}[\-\.]\s?)[A-Z]", v)
           for v in options.values()):
        return "option ran on"
    lengths = sorted(len(v) for v in options.values())
    median = lengths[len(lengths) // 2]
    if lengths[-1] > 120 and lengths[-1] > 2.5 * max(median, 1):
        return "option ran on"
    return None


# ---------------------------------------------------------------- biochem book


# The book is not consistent about how it opens an MCQ section: eleven chapters
# print `I- Multiple Choice Questions:`, two print it in the singular, and
# `10) NUCLEIC ACIDS` opens with `I- Choose the correct answer:` instead.
# Matching only the plural silently drops three whole chapters — nucleotides,
# nucleic acids and translation — with no error anywhere.
MCQ_MARK = re.compile(r"multiple\s*choice\s*questions?|choose\s+the\s+correct\s+answer", re.I)


def bio_sections(pages):
    """Split the biochemistry book into its per-chapter MCQ sections.

    Each chapter prints `I- Multiple Choice Questions:`, numbers its questions
    from 1, and closes with its own `Answer Key`. Sectioning on that marker
    rather than on the running header matters because the header is the thing
    OCR loses: page 77's reads `‎Cell Cycle and Apoptosis‏ حب`, right-to-left
    marks and all, and pages 41, 50 and 116 lose it entirely. Grouping pages by
    header would start a fresh chapter — and so restart question numbering at 1
    — every time a header failed to scan, which silently re-indexes every
    question after it against the wrong answer key.
    """
    marks = []
    for i, text in enumerate(pages, 1):
        for line in text.split("\n"):
            if MCQ_MARK.search(line):
                marks.append(i)
                break
    out = []
    for j, page in enumerate(marks):
        last = (marks[j + 1] - 1) if j + 1 < len(marks) else len(pages)
        out.append((page, last))
    return out


def bio_title(pages, first, last):
    """The chapter's own printed title, then its running header, then nothing.

    Titles wrap: `15) CELL CYCLE, APOPTOSIS, AND TUMOR` / `SUPPRESSOR GENES`.
    Taking only the first line files that chapter under a name that matches
    nothing in the subject tree, so a continuation line in the same all-capitals
    setting is joined on.
    """
    for p in range(first, min(last, len(pages)) + 1):
        lines = pages[p - 1].split("\n")
        for j, line in enumerate(lines):
            m = re.match(r"\s*\(?(\d{1,2})\)\s*([A-Z][A-Z0-9 ,()\-&/']{6,})\s*$", line)
            if m:
                title = m.group(2).strip()
                for tail in lines[j + 1:j + 3]:
                    if re.match(r"\s*[A-Z][A-Z0-9 ,()\-&/']{4,}\s*$", tail):
                        title += " " + tail.strip()
                    elif tail.strip():
                        break
                return title.title()
        if p > first:
            break
    for p in range(first, min(last, len(pages)) + 1):
        name, _ = bio_chapter(pages[p - 1])
        if name:
            return name
    return None


def bio_canonical(title):
    if not title:
        return None
    low = title.lower()
    for probe, canonical in BIO_CHAPTERS.items():
        if probe in low:
            return canonical
    return None


# Page 81 is the divider leaf between the two halves of the book: chapters 1-15
# before it are the 102 syllabus, and the chapter numbering restarts at
# `(1) BIOENERGETICS` on page 83 for the 103 half. The divider itself scans as
# `)103(` reversed and broken, so the split is taken from the numbering restart
# and the syllabus, not from reading the divider.
BIO_MODULE_SPLIT = 81


def build_bio(keys):
    """`DPT BOOK MCQ D book bio 102&103 mcq` — 154 pages, two modules."""
    pages = pages_of(BIO_BOOK)
    items, blank = [], [i + 1 for i, t in enumerate(pages) if not t.strip()]
    key_pages = keys.get(BIO_BOOK, {})

    for first, last in bio_sections(pages):
        title = bio_title(pages, first, last)
        canonical = bio_canonical(title)
        module = "102 INT" if first < BIO_MODULE_SPLIT else "103 BMS"
        path = ("102 INT > Biochemistry > " + canonical) if (module == "102 INT" and canonical) else None

        span = list(range(first, min(last, len(pages)) + 1))
        # The running header repeats the chapter name at the top of every page,
        # wrapped in whatever the scanner's rule line degraded into — `= Cell
        # Cycle and Apoptosis 7S om` on one page, `uaz Cell Cycle and Apoptosis
        # Se` on the next. Left in, it lands mid-question and is appended to
        # whichever option was open across the page break. Matching on the
        # chapter title itself catches every dressing of it.
        probe = re.sub(r"[^a-z0-9]+", "", (title or "").lower())

        def is_running_header(line):
            if re.match(r"\s*=+\s*\S", line):
                return True
            flat = re.sub(r"[^a-z0-9]+", "", line.lower())
            return len(probe) >= 8 and probe in flat and len(flat) < len(probe) + 12

        lines, where = section_lines(pages, span, is_running_header)
        start = 0
        for j, line in enumerate(lines):
            if MCQ_MARK.search(line):
                start = j + 1
                break
        parsed, _ = parse_block(lines[start:], first_number=1)
        where = where[start:]

        cells, conflicts, key_at = {}, {}, "?"
        for p in span:
            entry = key_pages.get(str(p))
            if entry:
                cells.update({int(k): v for k, v in entry["cells"].items()})
                conflicts.update({int(k): v for k, v in entry["conflicts"].items()})
                key_at = "p%d" % p

        for q in parsed:
            n = q["number"]
            stem = clean(" ".join(q["stemLines"]))
            page = where[q["line"]] if q["line"] < len(where) else first
            cell = cells.get(n)
            correct = cell["letter"] if cell and cell["letter"] in q["options"] else None
            if correct:
                source = "printed key (%s)" % key_at
            elif cell:
                source = ("printed key (%s) names option %s, which this question does not "
                          "have" % (key_at, cell["letter"]))
            elif n in conflicts:
                source = "printed key (%s) read differently by different OCR passes (%s)" % (
                    key_at, "/".join(conflicts[n]))
            else:
                source = "none"
            susp = suspect_for(q["options"])
            if correct is None and cell:
                susp = susp or "key letter absent from options"
            items.append(make_item(
                BIO_BOOK, page, n, "p%d-q%d" % (page, n), stem, q["options"],
                module, "Biochemistry", path, correct, source, susp,
                chapter=title))
    return items, blank


def section_lines(pages, span, drop=None):
    """A section's lines, and the page each one came off.

    Carrying the page alongside the line is the whole point. The first version
    of this looked the stem back up in the page text instead, and filed
    `Which of the following is an epimer of glucose?` on page 6 — because its
    first 28 characters are `Which of the following is an`, which is also how
    `Which of the following is an aldotriose?` starts, two pages earlier. A page
    number is a citation; a citation that points at the wrong page is worse than
    no citation, so it is recorded rather than reconstructed.
    """
    lines, where = [], []
    for p in span:
        for line in pages[p - 1].split("\n"):
            if drop and drop(line):
                continue
            lines.append(line)
            where.append(p)
    return lines, where


# ---------------------------------------------------------------- physiology


PHYSIO_SECTIONS = {
    # sourceId: [(label, first page, last page, module, subject, tree root, chapter table)]
    PHYSIO_YEAR: [
        ("Blood", 7, 21, "102 INT", "Physiology",
         "102 INT > Physiology > Blood > ", BLOOD_CHAPTERS),
        ("Autonomic Nervous System", 22, 31, "102 INT", "Physiology",
         "102 INT > Physiology > Autonomic nervous system > ", ANS_CHAPTERS),
        ("Nerve and Muscle", 33, 46, "103 BMS", "Physiology", None, None),
        # Module 104 is two sections, not one. `Cardiovascular` (p49, key p58)
        # and `Respiration` (p61, key p70) each number from 1 and each print
        # their own key, so running them together merges two unrelated keys and
        # every question in the first section inherits a second, contradictory
        # answer — 20 of the section's 48 items came out as OCR "conflicts" that
        # were nothing of the kind.
        ("Cardiovascular", 49, 58, "104 CPS", "Physiology", None, None),
        ("Respiration", 61, 70, "104 CPS", "Physiology", None, None),
    ],
    PHYSIO_BLOOD: [
        ("Blood", 1, 15, "102 INT", "Physiology",
         "102 INT > Physiology > Blood > ", BLOOD_CHAPTERS),
    ],
    PHYSIO_ANS: [
        ("Autonomic Nervous System", 1, 10, "102 INT", "Physiology",
         "102 INT > Physiology > Autonomic nervous system > ", ANS_CHAPTERS),
    ],
}


def section_keys(keys):
    """One merged key per physiology section, across the books that print it.

    `Physio MCQ First Year` and the two 2023 extracts are the same typesetting of
    the same questions, numbered identically, each with its own scan of the same
    key grid. Reading two scans of one table recovers cells that are faint in
    one of them — the year book's Blood key loses whole columns to a pale
    printing that the 2023 extract renders cleanly. So the cells are pooled by
    section, and a number the two scans *disagree* about is thrown away rather
    than arbitrated: two independent readings that differ is exactly the case
    where a guess would be indistinguishable from a fact.
    """
    merged = {}
    for sid, sections in PHYSIO_SECTIONS.items():
        for label, first, last, _m, _s, _r, _t in sections:
            slot = merged.setdefault(label, {"votes": {}, "pages": []})
            for p in range(first, last + 1):
                entry = keys.get(sid, {}).get(str(p))
                if not entry:
                    continue
                slot["pages"].append("p%d of %s" % (p, short(sid)))
                for n, cell in entry["cells"].items():
                    slot["votes"].setdefault(int(n), set()).add(cell["letter"])
                for n, letters in entry["conflicts"].items():
                    slot["votes"].setdefault(int(n), set()).update(letters)
    out = {}
    for label, slot in merged.items():
        cells = {n: list(v)[0] for n, v in slot["votes"].items() if len(v) == 1}
        conflicts = {n: sorted(v) for n, v in slot["votes"].items() if len(v) > 1}
        out[label] = {"cells": cells, "conflicts": conflicts,
                      "where": ", ".join(sorted(set(slot["pages"]))) or "?"}
    return out


def build_physio(sid, keys, sect_keys):
    pages = pages_of(sid)
    items, unreadable = [], []
    for label, first, last, module, subject, root, table in PHYSIO_SECTIONS[sid]:
        span = list(range(first, min(last, len(pages)) + 1))
        for p in span:
            if not pages[p - 1].strip() and p not in unreadable:
                unreadable.append(p)
        lines, where = section_lines(pages, span)
        parsed, _ = parse_block(lines, first_number=1)

        slot = sect_keys.get(label, {"cells": {}, "conflicts": {}, "where": "?"})
        cells = {n: {"letter": v} for n, v in slot["cells"].items()}
        conflicts, kp = slot["conflicts"], slot["where"]

        for q in parsed:
            n = q["number"]
            stem = clean(" ".join(q["stemLines"]))
            page = where[q["line"]] if q["line"] < len(where) else first
            chapter = chapter_for(stem + " " + " ".join(q["options"].values()), table) if table else None
            path = (root + chapter) if (root and chapter) else None
            cell = cells.get(n)
            correct = cell["letter"] if cell and cell["letter"] in q["options"] else None
            if correct:
                source = "printed key (%s)" % kp
            elif cell:
                source = ("printed key (%s) names option %s, which this question does not "
                          "have" % (kp, cell["letter"]))
            elif n in conflicts:
                source = "printed key (%s) read differently by different OCR passes (%s)" % (
                    kp, "/".join(conflicts[n]))
            else:
                source = "none"
            susp = suspect_for(q["options"])
            if correct is None and cell:
                susp = susp or "key letter absent from options"
            items.append(make_item(
                sid, page, n, "p%d-q%d" % (page, n), stem, q["options"],
                module, subject, path, correct, source, susp, chapter=label))
    return items, unreadable


# ---------------------------------------------------------------- duplicates


def norm(stem):
    return re.sub(r"[^a-z0-9]+", "", stem.lower())[:60]


def mark_duplicates(items):
    """The two 2023 physiology extracts are the 102 half of the year book.

    Same typesetting, same numbering, same wording — so a stem that appears in
    both is one question printed twice, not two questions. The year book is
    treated as the original because it is the complete one; the extract carries
    `duplicateOf`. Nothing is dropped: a later pass choosing what to import
    wants to know both printings exist.
    """
    canonical = {}
    for item in items:
        if item["sourceId"] == PHYSIO_YEAR:
            canonical.setdefault(norm(item["stem"]), item["id"])
    for item in items:
        if item["sourceId"] in (PHYSIO_BLOOD, PHYSIO_ANS):
            item["duplicateOf"] = canonical.get(norm(item["stem"]))
        else:
            item["duplicateOf"] = None


# ---------------------------------------------------------------- build


def not_extracted(items):
    """Questions the books print that this parser did not get.

    A section numbers its questions from 1 without gaps, so a hole in the
    numbering is a question that was lost rather than one that never existed.
    Naming them is the difference between a bank that is 98% of a book and a
    bank that claims to be a book.
    """
    seen = {}
    for item in items:
        seen.setdefault((item["sourceId"], item["chapter"]), set()).add(item["printedNumber"])
    out = []
    for (sid, chapter), numbers in sorted(seen.items()):
        gaps = sorted(set(range(1, max(numbers) + 1)) - numbers)
        if gaps:
            out.append({"sourceId": sid, "chapter": chapter,
                        "printedNumbers": gaps, "of": max(numbers)})
    return out


def cmd_build(argv):
    keys = json.load(open(KEYS, encoding="utf-8")) if os.path.exists(KEYS) else {}
    items, unreadable = [], []

    bio_items, bio_blank = build_bio(keys)
    items += bio_items
    if bio_blank:
        unreadable.append({
            "sourceId": BIO_BOOK, "pages": bio_blank,
            "why": "OCR returned nothing — blank leaf or section divider"})

    sect_keys = section_keys(keys)
    for sid in (PHYSIO_YEAR, PHYSIO_BLOOD, PHYSIO_ANS):
        got, blank = build_physio(sid, keys, sect_keys)
        items += got
        if blank:
            unreadable.append({"sourceId": sid, "pages": blank,
                               "why": "OCR returned nothing for this page"})

    unreadable.append({
        "sourceId": BIO_SOLVED, "pages": list(range(1, 45)),
        "why": ("no MCQs in this file. It is the solved companion to the biochemistry "
                "department book and it prints only the enumerate / explain / compare "
                "sections — every chapter starts at section III or IV, and section I "
                "(Multiple Choice Questions) is omitted throughout. The words "
                "\"choose\" and \"multiple choice\" do not appear on any of its 44 "
                "pages. Nothing was lost to extraction; there was nothing to extract.")})

    mark_duplicates(items)
    doc = {
        "generatedFrom": SOURCES,
        "generatedBy": "scripts/kasr/extract/102-INT/mcq.py",
        "items": items,
        "notExtracted": not_extracted(items),
        "unreadable": unreadable,
    }
    with open(BANK, "w", encoding="utf-8") as fh:
        json.dump(doc, fh, ensure_ascii=False, indent=1)
    print("%d items -> %s" % (len(items), BANK))


def main(argv):
    if not argv:
        print(__doc__)
        return
    {"ocr": cmd_ocr, "keys": cmd_keys, "build": cmd_build,
     "show": cmd_show}[argv[0]](argv[1:])


if __name__ == "__main__":
    main(sys.argv[1:])
