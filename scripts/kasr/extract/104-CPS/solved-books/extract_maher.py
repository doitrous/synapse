#!/usr/bin/env python3
"""Extract Q+A from Physio MCQ Dr.Maher [Cardio] (Solved).pdf.

Convention: NOT in the text layer as a marker string (a trap -- the file is
named "(Solved)" but pdftotext shows plain option text with no answer word
anywhere). Verified against rendered page images p1-3: the correct option is
marked either by (a) the whole option line set in bold (Arial-BoldMT vs
ArialMT, pages 1 and a few others), or, more commonly, (b) a thin black
underline bar drawn beneath the option's text (a vector rect ~1.2pt tall,
not a font attribute). Both are real, deterministic PDF content -- not OCR,
not a raster highlight, not a pen mark -- so both are detected here from the
PDF object model directly.
"""
import json, re, hashlib
import fitz

SRC = "/Users/doitrous/Desktop/Kasr Alainy/y1/104 CPS/Doctors/Dr. Maher Physiology/Physio MCQ Dr.Maher [Cardio] (Solved).pdf"
OUT = "/private/tmp/claude-501/-Users-doitrous-Documents-CodexGPT-Codex-Synapse-continue-on-Claude-ClaudeSynapse--claude-worktrees-chief-of-staff-9b6557/801629ae-b701-4a98-b5e6-0043f4372e62/scratchpad/kasr-104-keys/scripts/kasr/extract/104-CPS/solved-books/maher-physio-mcq-cardio.json"

sha = hashlib.sha256(open(SRC, "rb").read()).hexdigest()
source_id = "src_" + sha[:20]

doc = fitz.open(SRC)
n_pages = doc.page_count

Q_START_RE = re.compile(r"^\s*(\d+)[\.\)]\s*(.*)$")
OPT_RE = re.compile(r"^\s*([a-e])[\.\)\-]\s*(.*)$")

questions = []
skipped = []

for pno in range(n_pages):
    page = doc[pno]
    d = page.get_text("dict")

    # Flat list of (text, bold, bbox) per line, reading order.
    line_recs = []
    for block in d["blocks"]:
        for line in block.get("lines", []):
            spans = line["spans"]
            if not spans:
                continue
            text = "".join(s["text"] for s in spans).strip()
            if not text:
                continue
            is_bold = any("Bold" in s["font"] for s in spans)
            line_recs.append({"text": text, "bold": is_bold, "bbox": line["bbox"]})

    # Underline bars: thin (<3pt tall) solid-black filled rects.
    bars = [dr["rect"] for dr in page.get_drawings()
            if dr.get("fill") == (0.0, 0.0, 0.0) and (dr["rect"][3] - dr["rect"][1]) < 3]

    # Tag each option line as underlined if a bar sits directly beneath it
    # (bar top within 2pt of the line's bottom, x-ranges overlap).
    for lr in line_recs:
        lb = lr["bbox"]
        lr["underlined"] = any(
            abs(lb[3] - r[1]) < 2 and not (lb[2] < r[0] - 3 or lb[0] > r[2] + 3)
            for r in bars
        )

    i = 0
    while i < len(line_recs):
        text = line_recs[i]["text"]
        m = Q_START_RE.match(text)
        if m:
            qnum = int(m.group(1))
            stem = m.group(2)
            i += 1
            options = {}
            marked_opts = []
            cur_letter = None
            while i < len(line_recs):
                t2 = line_recs[i]["text"]
                om = OPT_RE.match(t2)
                if om:
                    cur_letter = om.group(1).upper()
                    options[cur_letter] = om.group(2).strip()
                    if line_recs[i]["bold"] or line_recs[i]["underlined"]:
                        marked_opts.append(cur_letter)
                    i += 1
                    continue
                if Q_START_RE.match(t2) and options:
                    break
                # continuation line of the current option (wrapped text) --
                # still check it for an underline bar of its own.
                if cur_letter is not None and (line_recs[i]["bold"] or line_recs[i]["underlined"]):
                    if cur_letter not in marked_opts:
                        marked_opts.append(cur_letter)
                i += 1
            if options:
                uniq = sorted(set(marked_opts))
                if len(uniq) == 1:
                    questions.append({
                        "q": qnum,
                        "page": pno + 1,
                        "stem": stem,
                        "options": options,
                        "answer": uniq[0],
                        "confidence": "high",
                        "answerSource": "bold-font or underline-bar option (font-name / vector-rect signal, not OCR)",
                    })
                elif len(uniq) == 0:
                    skipped.append({"page": pno + 1, "q": qnum, "stem": stem, "options": options, "reason": "no bold/underline option found -- unanswered in source"})
                else:
                    skipped.append({"page": pno + 1, "q": qnum, "stem": stem, "options": options, "reason": f"multiple marked options found ({uniq}) -- ambiguous, not auto-resolved"})
            continue
        i += 1

out = {
    "sourceId": source_id,
    "sha256": sha,
    "file": "Physio MCQ Dr.Maher [Cardio] (Solved).pdf",
    "corpusRelativePath": "y1/104 CPS/Doctors/Dr. Maher Physiology/Physio MCQ Dr.Maher [Cardio] (Solved).pdf",
    "book": "Dr. Maher Physiology MCQ [Cardio] (Solved)",
    "subject": "Physiology",
    "module": "104 CPS",
    "pages": n_pages,
    "markConvention": "TRAP CONFIRMED: pdftotext text layer has no answer marker at all despite the '(Solved)' filename. Rendered page images (p1-3, 150dpi) show two overlapping conventions used inconsistently through the document: the correct option's line is either set in bold (Arial-BoldMT vs ArialMT, mostly page 1) or has a thin black underline bar drawn beneath it (a ~1.2pt-tall vector rect, most of the rest of the document). Both are real PDF content -- font name / vector graphics -- not a raster highlight or handwritten mark, so both are machine-detectable without OCR.",
    "extractionMethod": "PyMuPDF get_text('dict') for text+font per line, get_drawings() for thin black underline bars, positional match of bar-to-line (scripts/kasr/extract/104-CPS/solved-books/extract_maher.py)",
    "stats": {
        "questionsExtracted": len(questions),
        "keysRecovered": sum(1 for q in questions if q["answer"]),
        "pagesSkipped": skipped,
    },
    "questions": questions,
}

with open(OUT, "w") as f:
    json.dump(out, f, indent=2, ensure_ascii=False)

print(f"Maher: {len(questions)} questions extracted, {len(skipped)} skips, source={source_id}")
