#!/usr/bin/env python3
"""Extract Q+A from Physio MCQ Dr.Shebl 104.pdf.

Convention: native text layer, typed "Correct Answer: X) ..." line after
each question (verified against pdftotext -layout and rendered page images
p1-3; matches visually -- no highlight/pen marks needed).
"""
import json, re, subprocess, hashlib, sys

SRC = "/Users/doitrous/Desktop/Kasr Alainy/y1/104 CPS/Doctors/Dr. Shebl Physiology/Physio MCQ Dr.Shebl 104.pdf"
OUT = "/private/tmp/claude-501/-Users-doitrous-Documents-CodexGPT-Codex-Synapse-continue-on-Claude-ClaudeSynapse--claude-worktrees-chief-of-staff-9b6557/801629ae-b701-4a98-b5e6-0043f4372e62/scratchpad/kasr-104-keys/scripts/kasr/extract/104-CPS/solved-books/shebl-physio-mcq.json"

sha = hashlib.sha256(open(SRC, "rb").read()).hexdigest()
source_id = "src_" + sha[:20]

# Get per-page text so we can tag page numbers.
import fitz
doc = fitz.open(SRC)
n_pages = doc.page_count

questions = []
skipped_pages = []

# Chapter header line to strip out of stems
NOISE_RE = re.compile(r"^\s*(Dr\. Shebl CPS MCQs|104 CPS|MCQs|Color Code:.*|Chapter \d+:.*|.*MCQ Practice Questions.*|Dr\. Ahmed Shebl.*|Cardiovascular & Respiratory Physiology)\s*$")
Q_START_RE = re.compile(r"^\s*(\d+)[\.\-]\s+(.*)$")
OPT_RE = re.compile(r"^\s*([A-Ea-e])[\)\.\-]\s*(.*)$")
ANS_RE = re.compile(r"^\s*(?:✓\s*)?Correct Answer:\s*([A-Ea-e])[\)\.\-]?\s*(.*)$")

# Build one continuous (line, page) stream across the whole document so a
# question block that straddles a page break (options end on page N, the
# "Correct Answer:" line starts page N+1) is not lost.
stream = []  # list of (line, page_number_1_based)
for pno in range(n_pages):
    text = doc[pno].get_text("text")
    for l in text.split("\n"):
        l = l.rstrip()
        if l.strip() and not NOISE_RE.match(l):
            stream.append((l, pno + 1))

if True:
    lines = [l for l, _ in stream]
    pages = [p for _, p in stream]

    i = 0
    while i < len(lines):
        m = Q_START_RE.match(lines[i])
        if not m:
            i += 1
            continue
        qnum = int(m.group(1))
        start_page = pages[i]
        stem_parts = [m.group(2)]
        block_raw = [lines[i]]
        i += 1
        options = {}
        cur_opt = None
        answer = None
        answer_text = None
        while i < len(lines):
            line = lines[i]
            am = ANS_RE.match(line)
            if am:
                answer = am.group(1).upper()
                answer_text = am.group(2).strip()
                block_raw.append(line)
                i += 1
                # swallow continuation lines of the answer (wrapped) until next Q or option
                while i < len(lines) and not Q_START_RE.match(lines[i]) and not OPT_RE.match(lines[i]):
                    answer_text += " " + lines[i].strip()
                    block_raw.append(lines[i])
                    i += 1
                break
            om = OPT_RE.match(line)
            if om:
                cur_opt = om.group(1).upper()
                options[cur_opt] = om.group(2).strip()
                block_raw.append(line)
                i += 1
                continue
            # next question begins (no answer found -> block over, unanswered)
            if Q_START_RE.match(line) and cur_opt is not None:
                break
            # continuation line: attach to current option or stem
            if cur_opt is not None:
                options[cur_opt] += " " + line.strip()
            else:
                stem_parts.append(line.strip())
            block_raw.append(line)
            i += 1

        stem = " ".join(stem_parts).strip()
        if answer and options:
            questions.append({
                "q": qnum,
                "page": start_page,
                "stem": stem,
                "options": options,
                "answer": answer,
                "answerText": answer_text,
                "confidence": "high",
                "rawBlockText": " ".join(block_raw),
            })
        elif options:
            # question with options but no answer line found anywhere before the next question
            skipped_pages.append({"page": start_page, "q": qnum, "stem": stem[:80], "reason": "no Correct Answer line found before next question start"})

out = {
    "sourceId": source_id,
    "sha256": sha,
    "file": "Physio MCQ Dr.Shebl 104.pdf",
    "corpusRelativePath": "y1/104 CPS/Doctors/Dr. Shebl Physiology/Physio MCQ Dr.Shebl 104.pdf",
    "book": "Dr. Shebl CPS MCQs (Cardiovascular & Respiratory Physiology, 30 Q/chapter)",
    "subject": "Physiology",
    "module": "104 CPS",
    "pages": n_pages,
    "markConvention": "typed 'Correct Answer: X) ...' line after every question, native text layer (color-coded blue in rendered PDF, plain text in extraction). Verified against pdftoppm renders of pages 1-3: text-layer answers match the rendered blue-highlighted 'Correct Answer' lines exactly.",
    "extractionMethod": "PyMuPDF get_text('text') per page, regex block parse (scripts/kasr/extract/104-CPS/solved-books/extract_shebl.py)",
    "stats": {
        "questionsExtracted": len(questions),
        "keysRecovered": sum(1 for q in questions if q["answer"]),
        "pagesSkipped": skipped_pages,
    },
    "questions": questions,
}

with open(OUT, "w") as f:
    json.dump(out, f, indent=2, ensure_ascii=False)

print(f"Shebl: {len(questions)} questions extracted, {len(skipped_pages)} split-block skips, source={source_id}")
