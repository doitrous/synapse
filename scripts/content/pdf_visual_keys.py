#!/usr/bin/env python3
"""pdf_visual_keys.py — find MCQ answer keys marked only by visual styling
(coloured text, bold/underline, or a highlight/underline/strikeout/square
annotation) in a NATIVE-TEXT pdf, without rendering any page to an image.

Invocation (spawned by scripts/content/pagetext.mjs's `keys` command):

    python3 pdf_visual_keys.py <pdf-path> <comma-separated 1-based page numbers>

Prints one JSON object to stdout:

    {"pages": [
        {"page": 1, "noTextLayer": false, "questions": [
            {"number": "1", "options": [{"letter": "C", "reasons": ["red-text"]}]},
            ...
        ]}
    ]}

`options` lists every option on that question's lines whose text carries a
visual mark; an unmarked question has an empty list. The caller (pagetext.mjs)
turns this into the `keyed / ambiguous / unmarked` rows and summary line —
this script never guesses which option is correct when 0 or >=2 are marked.

Lines are attributed to options purely by vertical order, so the two things
that must NOT be swallowed by the last option on a page are page furniture
(a "N | Page" footer, a signature line, a running header — Word exports set
these in gray, which reads as "red-text") and anything after a large vertical
gap. Furniture is recognised by repetition: the same digit-normalised text at
the same y on most pages. A gap wider than CONTINUATION_MAX_GAP_FACTOR line
heights closes the open option (the fallback for single-page pdfs).
"""
import json
import math
import re
import statistics
import sys

import pymupdf as fitz  # PyMuPDF — `import pymupdf` avoids the `fitz` deprecation
# warning, which PyMuPDF prints to stdout and would otherwise corrupt this
# script's JSON output.

QUESTION_RE = re.compile(r"^\s*[Qq]?(\d{1,3})[\).:\-]\s")
OPTION_RE = re.compile(r"^\s*\(?([A-Ea-e])[\).:\-]\s")

BOLD_BIT = 1 << 4  # fitz span flags bit 4 = bold
COLOR_DIST_THRESHOLD = 60.0  # out of a max possible 441.7 (0,0,0)-(255,255,255)
UNDERLINE_GAP = 3.0  # pt: how close a drawn line/rect must sit under a span to count
UNDERLINE_MAX_HEIGHT = 3.0  # pt: how thin a drawing must be to read as a rule, not a box
CONTINUATION_MAX_GAP_FACTOR = 2.0  # × median line height: a wider gap below the open option closes it
FURNITURE_MIN_PAGE_FRACTION = 0.5  # a line repeating (same text, same y) on this share of pages is furniture
FURNITURE_Y_BUCKET = 4.0  # pt: y tolerance when matching repeated lines across pages
FURNITURE_SCAN_MAX_PAGES = 40  # cap on pages read to find repeats (requested pages always included)

# Word/PowerPoint-exported "highlighter" marks (grey and yellow are the two
# conventions authoring lanes report) are usually NOT real PDF Highlight
# annotations — they're a plain filled rectangle drawn into the page content
# behind (or over) the option's text, sized to roughly one text line. These
# bounds are relative to the page's own median line height so they hold
# across font sizes, rather than a fixed point size tuned to one fixture.
HIGHLIGHT_FILL_MIN_HEIGHT_FACTOR = 0.5  # × median line height
HIGHLIGHT_FILL_MAX_HEIGHT_FACTOR = 2.5  # × median line height
HIGHLIGHT_FILL_MIN_OVERLAP_FRACTION = 0.5  # of the span's own area that must sit under the fill
HIGHLIGHT_FILL_NEAR_WHITE = 0.92  # skip page-background fills (white boxes, table shading)
HIGHLIGHT_FILL_NEAR_BLACK = 0.15  # skip vector-drawn glyph fills (bold text rendered as paths)

ANNOT_REASON = {
    "Highlight": "highlight-annot",
    "Underline": "underline-annot",
    "StrikeOut": "strikeout-annot",
    "Square": "square-annot",
    "Ink": "ink-annot",
}


def int_to_rgb(color_int):
    return ((color_int >> 16) & 255, (color_int >> 8) & 255, color_int & 255)


def color_distance_from_black(color_int):
    r, g, b = int_to_rgb(color_int)
    return (r * r + g * g + b * b) ** 0.5


def rects_overlap(a, b):
    ax0, ay0, ax1, ay1 = a
    bx0, by0, bx1, by1 = b
    return ax0 < bx1 and bx0 < ax1 and ay0 < by1 and by0 < ay1


def rect_overlap_fraction(rect, span_bbox):
    """Share of span_bbox's own area that rect covers — used (instead of the
    boolean rects_overlap above) so a page-wide table-shading rect that only
    grazes a span's corner does not count as a highlight."""
    ax0, ay0, ax1, ay1 = rect
    bx0, by0, bx1, by1 = span_bbox
    iw = max(0.0, min(ax1, bx1) - max(ax0, bx0))
    ih = max(0.0, min(ay1, by1) - max(ay0, by0))
    area = max(1e-6, (bx1 - bx0) * (by1 - by0))
    return (iw * ih) / area


def classify_fill_color(rgb):
    """Best-effort colour name for a highlight fill, for provenance — not
    exact colour science, just enough for a lane to tell grey from yellow
    from 'something else was used here'."""
    r, g, b = rgb
    if max(abs(r - g), abs(g - b), abs(r - b)) < 0.08:
        return "grey"
    if r > 0.7 and g > 0.7 and b < 0.55:
        return "yellow"
    if g >= r and g >= b and g > 0.55:
        return "green"
    if b >= r and b >= g and b > 0.55:
        return "blue"
    if r >= g and r >= b and r > 0.55:
        return "red"
    return "other"


def collect_highlight_fills(page, min_height, max_height, exclude_rects=()):
    """Filled vector rectangles shaped and sized like a one-line highlighter
    mark: not a real PDF annotation, just a coloured rect drawn into the page
    content (the shape a Word/PowerPoint "Save as PDF" export produces for a
    highlighted run, as opposed to a highlight applied by a PDF editor).
    exclude_rects skips anything already covered by a real annotation, whose
    own appearance stream can itself contain a matching filled quad."""
    fills = []
    try:
        drawings = page.get_drawings()
    except Exception:
        drawings = []
    for d in drawings:
        fill = d.get("fill")
        rect = d.get("rect")
        if fill is None or rect is None:
            continue
        r, g, b = fill
        if min(r, g, b) > HIGHLIGHT_FILL_NEAR_WHITE or max(r, g, b) < HIGHLIGHT_FILL_NEAR_BLACK:
            continue
        x0, y0, x1, y1 = rect
        height = y1 - y0
        width = x1 - x0
        if width <= 2 or not (min_height <= height <= max_height):
            continue
        if any(rect_overlap_fraction(er, (x0, y0, x1, y1)) >= HIGHLIGHT_FILL_MIN_OVERLAP_FRACTION for er in exclude_rects):
            continue
        fills.append(((x0, y0, x1, y1), (r, g, b)))
    return fills


def collect_lines(page):
    """Flatten get_text('dict') into a reading-order list of lines, each with
    its bbox and constituent spans."""
    lines = []
    info = page.get_text("dict")
    for block in info.get("blocks", []):
        if block.get("type") != 0:  # skip images
            continue
        for line in block.get("lines", []):
            spans = line.get("spans", [])
            text = "".join(s.get("text", "") for s in spans)
            if not text.strip():
                continue
            lines.append({"text": text, "bbox": line["bbox"], "spans": spans})
    lines.sort(key=lambda l: (round(l["bbox"][1], 1), l["bbox"][0]))
    return lines


def furniture_key(line):
    """(digit-normalised text, y bucket) — equal for a footer like '2 | Page'
    on every page regardless of the page number it carries."""
    norm = re.sub(r"\d+", "#", line["text"])
    norm = re.sub(r"\s+", " ", norm).strip()
    return (norm, round(line["bbox"][1] / FURNITURE_Y_BUCKET))


def collect_furniture(doc, page_nums):
    """Keys of lines that repeat at the same position on most scanned pages:
    headers, footers, signature lines. Question/option marker lines are never
    furniture, even in a rigid template that puts 'd- None of the above' at
    the same y on every page."""
    if doc.page_count < 2:
        return frozenset()
    scan = [n - 1 for n in page_nums if 1 <= n <= doc.page_count]
    for pno in range(doc.page_count):
        if len(scan) >= FURNITURE_SCAN_MAX_PAGES:
            break
        if pno not in scan:
            scan.append(pno)
    pages_by_key = {}
    for pno in scan:
        for line in collect_lines(doc[pno]):
            text = line["text"].strip()
            if QUESTION_RE.match(text) or OPTION_RE.match(text):
                continue
            pages_by_key.setdefault(furniture_key(line), set()).add(pno)
    need = max(2, math.ceil(len(scan) * FURNITURE_MIN_PAGE_FRACTION))
    return frozenset(k for k, pages in pages_by_key.items() if len(pages) >= need)


def collect_underline_drawings(page):
    """Vector-drawn underlines (a thin filled rect or stroked line under a run
    of text) — PyMuPDF's span 'flags' has no underline bit (verified against
    fitz's own font-flag bits: superscript/italic/serif/mono/bold only), so a
    manually drawn rule is the only way a native PDF can mark an option
    underlined without an annotation."""
    rules = []
    try:
        drawings = page.get_drawings()
    except Exception:
        drawings = []
    for d in drawings:
        rect = d.get("rect")
        if rect is None:
            continue
        x0, y0, x1, y1 = rect
        height = y1 - y0
        width = x1 - x0
        if 0 <= height <= UNDERLINE_MAX_HEIGHT and width > 2:
            rules.append((x0, y0, x1, y1))
    return rules


def span_reasons(span, page_dominant_bold, underline_rules, annots_by_type, highlight_fills):
    reasons = []
    color_int = span.get("color", 0)
    if color_distance_from_black(color_int) > COLOR_DIST_THRESHOLD:
        reasons.append("red-text")
    flags = span.get("flags", 0)
    is_bold = bool(flags & BOLD_BIT)
    if is_bold and not page_dominant_bold:
        reasons.append("bold-flag")
    sx0, sy0, sx1, sy1 = span["bbox"]
    for rx0, ry0, rx1, ry1 in underline_rules:
        # a rule sitting just under (or slightly overlapping) the span's
        # baseline, spanning roughly the same x-range
        if rx0 < sx1 and sx0 < rx1 and (sy1 - UNDERLINE_GAP) <= ry0 <= (sy1 + UNDERLINE_GAP):
            reasons.append("underline-flag")
            break
    span_rect = (sx0, sy0, sx1, sy1)
    for annot_type, rects in annots_by_type.items():
        reason = ANNOT_REASON.get(annot_type)
        if not reason:
            continue
        if any(rects_overlap(span_rect, r) for r in rects):
            reasons.append(reason)
    for fill_rect, color in highlight_fills:
        if rect_overlap_fraction(fill_rect, span_rect) >= HIGHLIGHT_FILL_MIN_OVERLAP_FRACTION:
            reasons.append(f"highlight-fill-{classify_fill_color(color)}")
    # de-dup while keeping order
    seen = set()
    out = []
    for r in reasons:
        if r not in seen:
            seen.add(r)
            out.append(r)
    return out


def analyze_page(page, furniture=frozenset()):
    result = {"page": page.number + 1, "noTextLayer": False, "questions": []}
    lines = collect_lines(page)
    all_words = sum(len(l["text"].split()) for l in lines)
    if all_words == 0:
        result["noTextLayer"] = True
        # Scanned-image page: no text layer means no annotation, colour, or
        # fill data to read either — a highlighted key here is only
        # recoverable by rendering the page, not from this text-layer pass.
        result["reason"] = "highlight-not-recoverable-from-text-layer"
        return result
    lines = [l for l in lines if furniture_key(l) not in furniture]
    median_line_height = statistics.median(l["bbox"][3] - l["bbox"][1] for l in lines)
    max_continuation_gap = CONTINUATION_MAX_GAP_FACTOR * median_line_height

    # dominant bold-ness of the page: if most spans are bold, being bold is
    # not a mark of anything.
    total_spans = 0
    bold_spans = 0
    for line in lines:
        for span in line["spans"]:
            if not span.get("text", "").strip():
                continue
            total_spans += 1
            if span.get("flags", 0) & BOLD_BIT:
                bold_spans += 1
    page_dominant_bold = total_spans > 0 and bold_spans / total_spans > 0.5

    underline_rules = collect_underline_drawings(page)

    annots_by_type = {}
    try:
        annots = list(page.annots() or [])
    except Exception:
        annots = []
    for a in annots:
        try:
            type_name = a.type[1]
        except Exception:
            continue
        if type_name not in ANNOT_REASON:
            continue
        annots_by_type.setdefault(type_name, []).append(tuple(a.rect))

    # A real annotation's own appearance stream can itself contain a filled
    # quad that get_drawings() picks up — exclude anything already explained
    # by an annotation so a genuine Highlight annot doesn't also come back
    # as a redundant "highlight-fill-*" reason for the same mark.
    annot_rects = [r for rects in annots_by_type.values() for r in rects]
    highlight_fills = collect_highlight_fills(
        page,
        HIGHLIGHT_FILL_MIN_HEIGHT_FACTOR * median_line_height,
        HIGHLIGHT_FILL_MAX_HEIGHT_FACTOR * median_line_height,
        exclude_rects=annot_rects,
    )

    # Walk lines top-to-bottom, tracking the current question and option so
    # every line (including wrapped continuation lines) is attributed to the
    # right enclosing option purely by vertical order. A line that starts more
    # than max_continuation_gap below the open option's last line is not a
    # continuation: it closes the option (nothing else would, for the last
    # option on the page) and is attributed to nobody.
    questions = []
    cur_q = None
    cur_opt = None

    def close_opt(end_y):
        if cur_opt is not None:
            cur_opt["_end_y"] = end_y

    for line in lines:
        text = line["text"].strip()
        y0 = line["bbox"][1]
        qm = QUESTION_RE.match(text)
        om = OPTION_RE.match(text)
        if qm:
            close_opt(y0)
            number = qm.group(1)
            cur_q = {"number": number, "options": [], "_marked": {}}
            questions.append(cur_q)
            cur_opt = None
            continue
        if om and cur_q is not None:
            close_opt(y0)
            letter = om.group(1).upper()
            cur_opt = {"letter": letter, "_lines": [line]}
            cur_q["_marked"].setdefault(letter, [])
            cur_q.setdefault("_opts", []).append(cur_opt)
            continue
        if cur_opt is not None:
            prev_y1 = cur_opt["_lines"][-1]["bbox"][3]
            if y0 - prev_y1 > max_continuation_gap:
                close_opt(y0)
                cur_opt = None
                continue
            cur_opt["_lines"].append(line)

    # second pass: for every span on every line that belongs to an option,
    # collect visual-mark reasons, per option.
    for q in questions:
        for opt in q.get("_opts", []):
            reasons_for_opt = []
            for line in opt["_lines"]:
                for span in line["spans"]:
                    if not span.get("text", "").strip():
                        continue
                    reasons_for_opt.extend(
                        span_reasons(span, page_dominant_bold, underline_rules, annots_by_type, highlight_fills)
                    )
            if reasons_for_opt:
                seen = set()
                dedup = [r for r in reasons_for_opt if not (r in seen or seen.add(r))]
                q["_marked"][opt["letter"]] = dedup

        marked_options = [
            {"letter": letter, "reasons": reasons}
            for letter, reasons in q["_marked"].items()
            if reasons
        ]
        result["questions"].append({"number": q["number"], "options": marked_options})

    return result


def main():
    if len(sys.argv) < 3:
        print("usage: pdf_visual_keys.py <pdf> <comma-separated-page-numbers>", file=sys.stderr)
        sys.exit(2)
    pdf_path = sys.argv[1]
    page_nums = [int(x) for x in sys.argv[2].split(",") if x.strip()]
    doc = fitz.open(pdf_path)
    furniture = collect_furniture(doc, page_nums)
    pages_out = []
    for n in page_nums:
        if n < 1 or n > doc.page_count:
            continue
        page = doc[n - 1]
        pages_out.append(analyze_page(page, furniture))
    print(json.dumps({"pages": pages_out}))


if __name__ == "__main__":
    main()
