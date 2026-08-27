#!/usr/bin/env python3
"""Extract Q+A from Doctors/Dr. Galal Anatomy/Anatomy MCQ Dr.Jalal [Explained] (Solved).pdf.

Convention: no answer marker in the text layer at all (pdftotext shows plain
option text; another trap instance). Rendered page images (p1-3, 150dpi)
show the correct option's text highlighted in yellow. There is no PDF
annotation object for this (page.annots() is empty) -- the highlight is a
yellow-filled vector rectangle (rg 1 1 0 ... re f*) painted directly into
the content stream underneath the text, detected here via
PyMuPDF get_drawings().
"""
import json, re, hashlib
import fitz

SRC = "/Users/doitrous/Desktop/Kasr Alainy/y1/104 CPS/Doctors/Dr. Galal Anatomy/Anatomy MCQ Dr.Jalal [Explained] (Solved).pdf"
OUT = "/private/tmp/claude-501/-Users-doitrous-Documents-CodexGPT-Codex-Synapse-continue-on-Claude-ClaudeSynapse--claude-worktrees-chief-of-staff-9b6557/801629ae-b701-4a98-b5e6-0043f4372e62/scratchpad/kasr-104-keys/scripts/kasr/extract/104-CPS/solved-books/jalal-anatomy-explained-mcq.json"

sha = hashlib.sha256(open(SRC, "rb").read()).hexdigest()
source_id = "src_" + sha[:20]

doc = fitz.open(SRC)
n_pages = doc.page_count

Q_START_RE = re.compile(r"^\s*(\d+)[\.\)]\s*(.*)$")
OPT_RE = re.compile(r"^\s*([A-Ea-e])[\.\)\-]\s*(.*)$")

questions = []
skipped = []

for pno in range(n_pages):
    page = doc[pno]
    d = page.get_text("dict")
    line_recs = []
    for block in d["blocks"]:
        for line in block.get("lines", []):
            spans = line["spans"]
            if not spans:
                continue
            text = "".join(s["text"] for s in spans).strip()
            if not text:
                continue
            line_recs.append({"text": text, "bbox": line["bbox"]})

    highlights = [dr["rect"] for dr in page.get_drawings() if dr.get("fill") == (1.0, 1.0, 0.0)]
    for lr in line_recs:
        lb = lr["bbox"]
        lr["highlighted"] = any(
            lb[1] < r[3] and lb[3] > r[1] and not (lb[2] < r[0] - 3 or lb[0] > r[2] + 3)
            for r in highlights
        )

    i = 0
    while i < len(line_recs):
        text = line_recs[i]["text"]
        m = Q_START_RE.match(text)
        if m:
            qnum = int(m.group(1))
            stem_parts = [m.group(2)]
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
                    if line_recs[i]["highlighted"]:
                        marked_opts.append(cur_letter)
                    i += 1
                    continue
                if Q_START_RE.match(t2) and options:
                    break
                if cur_letter is not None:
                    options[cur_letter] += " " + t2.strip()
                    if line_recs[i]["highlighted"] and cur_letter not in marked_opts:
                        marked_opts.append(cur_letter)
                else:
                    stem_parts.append(t2.strip())
                i += 1
            stem = " ".join(p for p in stem_parts if p).strip()
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
                        "answerSource": "yellow highlight rect (vector fill 1,1,0), not a PDF annotation",
                    })
                elif len(uniq) == 0:
                    skipped.append({"page": pno + 1, "q": qnum, "stem": stem, "options": options, "reason": "no highlighted option found -- unanswered in source"})
                else:
                    skipped.append({"page": pno + 1, "q": qnum, "stem": stem, "options": options, "reason": f"multiple highlighted options found ({uniq}) -- ambiguous, not auto-resolved"})
            continue
        i += 1

out = {
    "sourceId": source_id,
    "sha256": sha,
    "file": "Anatomy MCQ Dr.Jalal [Explained] (Solved).pdf",
    "corpusRelativePath": "y1/104 CPS/Doctors/Dr. Galal Anatomy/Anatomy MCQ Dr.Jalal [Explained] (Solved).pdf",
    "book": "Anatomy MCQ by Dr. Ahmed Galal (Jalal) [Explained] (Solved)",
    "subject": "Anatomy",
    "module": "104 CPS",
    "pages": n_pages,
    "markConvention": "TRAP CONFIRMED: pdftotext text layer has no answer marker despite the '(Solved)' filename. Rendered page images (p1-3, 150dpi) show the correct option's text highlighted yellow, same convention as the Department Anatomy [Thorax] book. page.annots() returns 0 -- this is not a PDF highlight annotation but a yellow-filled vector rectangle painted into the content stream. Detected via PyMuPDF get_drawings() fill-color match, not OCR. This book interleaves explanatory paragraphs after each question's options (hence '[Explained]'); those paragraphs are not options and are not counted, but continuation lines glued onto the nearest preceding option can pick up incidental text.",
    "extractionMethod": "PyMuPDF get_text('dict') + get_drawings(), positional match of yellow rect to option line (scripts/kasr/extract/104-CPS/solved-books/extract_jalal.py)",
    "stats": {
        "questionsExtracted": len(questions),
        "keysRecovered": sum(1 for q in questions if q["answer"]),
        "pagesSkipped": skipped,
    },
    "questions": questions,
}

with open(OUT, "w") as f:
    json.dump(out, f, indent=2, ensure_ascii=False)

print(f"Jalal Explained: {len(questions)} questions extracted, {len(skipped)} skips, source={source_id}")
