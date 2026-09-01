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
"""
import json
import re
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


def span_reasons(span, page_dominant_bold, underline_rules, annots_by_type):
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
    # de-dup while keeping order
    seen = set()
    out = []
    for r in reasons:
        if r not in seen:
            seen.add(r)
            out.append(r)
    return out


def analyze_page(page):
    result = {"page": page.number + 1, "noTextLayer": False, "questions": []}
    lines = collect_lines(page)
    all_words = sum(len(l["text"].split()) for l in lines)
    if all_words == 0:
        result["noTextLayer"] = True
        return result

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

    # Walk lines top-to-bottom, tracking the current question and option so
    # every line (including wrapped continuation lines) is attributed to the
    # right enclosing option purely by vertical order.
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
                        span_reasons(span, page_dominant_bold, underline_rules, annots_by_type)
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
    pages_out = []
    for n in page_nums:
        if n < 1 or n > doc.page_count:
            continue
        page = doc[n - 1]
        pages_out.append(analyze_page(page))
    print(json.dumps({"pages": pages_out}))


if __name__ == "__main__":
    main()
