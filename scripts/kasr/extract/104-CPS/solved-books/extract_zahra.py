#!/usr/bin/env python3
"""Extract Q+A from Histo MCQ by Dr.Zahra [104].pdf.

Convention: native text layer, typed "answer x" (lowercase letter, no
parens) right-aligned after each question's options (verified against
pdftotext -layout and rendered page images p1-3; no highlight/pen marks).
"""
import json, re, hashlib
import fitz

SRC = "/Users/doitrous/Desktop/Kasr Alainy/y1/104 CPS/Doctors/Dr. Zahra Histology/Histo MCQ by Dr.Zahra [104].pdf"
OUT = "/private/tmp/claude-501/-Users-doitrous-Documents-CodexGPT-Codex-Synapse-continue-on-Claude-ClaudeSynapse--claude-worktrees-chief-of-staff-9b6557/801629ae-b701-4a98-b5e6-0043f4372e62/scratchpad/kasr-104-keys/scripts/kasr/extract/104-CPS/solved-books/zahra-histo-mcq.json"

sha = hashlib.sha256(open(SRC, "rb").read()).hexdigest()
source_id = "src_" + sha[:20]

doc = fitz.open(SRC)
n_pages = doc.page_count

NOISE_RE = re.compile(r"^\s*(HISTOLOGY\s+DR\. AHMED ZAHRA\s+MCQ|\d+)\s*$")
Q_START_RE = re.compile(r"^\s*(\d+)\.\s*(.*)$")
OPT_RE = re.compile(r"^\s*([a-e])[\.\)]\s*(.*)$")
ANS_RE = re.compile(r"^\s*[Aa]nswer\s+([a-eA-E])\s*$")

stream = []
for pno in range(n_pages):
    text = doc[pno].get_text("text")
    for l in text.split("\n"):
        l = l.rstrip()
        if l.strip() and not NOISE_RE.match(l):
            stream.append((l, pno + 1))

lines = [l for l, _ in stream]
pages = [p for _, p in stream]

questions = []
skipped = []
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
    while i < len(lines):
        line = lines[i]
        am = ANS_RE.match(line)
        if am:
            answer = am.group(1).upper()
            block_raw.append(line)
            i += 1
            break
        om = OPT_RE.match(line)
        if om:
            cur_opt = om.group(1).upper()
            options[cur_opt] = om.group(2).strip()
            block_raw.append(line)
            i += 1
            continue
        if Q_START_RE.match(line) and cur_opt is not None:
            break
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
            "confidence": "high",
            "rawBlockText": " ".join(block_raw),
        })
    elif options:
        skipped.append({"page": start_page, "q": qnum, "stem": stem, "options": options, "reason": "no 'answer x' line found before next question start"})

# Second convention found mid-book (Respiratory chapter, ~pages 18-24): no
# per-question "answer x" line -- instead a grid answer-key table
# ("1 C  6 D  11 D ...") appears once at the end of the chapter. Detect any
# such grid rows and use them to patch in answers for the immediately
# preceding same-numbered skipped questions.
import subprocess
GRID_ROW_RE = re.compile(r"(\d+)\s+([A-E])\b")
grid_map = {}  # qnum -> letter, only used for the single grid block found
# PyMuPDF's plain get_text('text') does not preserve the column spacing that
# this answer-key table depends on (columns collapse); pdftotext -layout
# does, so use that just for grid detection.
layout_text = subprocess.run(
    ["pdftotext", "-layout", SRC, "-"], capture_output=True, text=True
).stdout
for l in layout_text.split("\n"):
    pairs = GRID_ROW_RE.findall(l)
    # a real grid row has several pairs walking upward in roughly steady
    # steps (e.g. 1,6,11,16... or 2,7,12,17...); plain prose rarely does.
    if len(pairs) >= 4:
        nums = [int(a) for a, b in pairs]
        if all(b - a > 0 for a, b in zip(nums, nums[1:])):
            for a, b in pairs:
                grid_map[int(a)] = b

if grid_map:
    # Find which physical page the grid table itself sits on, so the map is
    # only applied to skipped questions from *that* chapter -- question
    # numbers restart at 1 per chapter in this book, so blindly applying a
    # 1..42 map doc-wide would wrongly answer unrelated q1..q42 elsewhere
    # (e.g. the Lymphatic chapter's own q22/q39/q42).
    grid_page = None
    for pno in range(n_pages):
        ptext = subprocess.run(
            ["pdftotext", "-layout", "-f", str(pno + 1), "-l", str(pno + 1), SRC, "-"],
            capture_output=True, text=True,
        ).stdout
        if GRID_ROW_RE.findall(ptext.split("\n")[0] if False else ptext):
            rows_here = [l for l in ptext.split("\n") if len(GRID_ROW_RE.findall(l)) >= 4]
            if rows_here:
                grid_page = pno + 1
                break
    still_skipped = []
    recovered_from_grid = 0
    for s in skipped:
        qn = s["q"]
        in_chapter_window = grid_page is not None and (grid_page - 10) <= s["page"] <= grid_page
        if qn in grid_map and in_chapter_window:
            # re-find the original block's stem/options from the raw stream
            # (we only stored the truncated stem in the skip record, so pull
            # the full parsed question back out is unnecessary -- rebuild by
            # rerunning the same block scan is overkill; instead keep the
            # stored stem/options captured at skip time by re-deriving them
            # is avoided: we already have "stem" (may be truncated) -- so we
            # just attach the recovered letter as answer with medium
            # confidence and flag the source explicitly).
            questions.append({
                "q": qn,
                "page": s["page"],
                "stem": s["stem"],
                "options": s["options"],
                "answer": grid_map[qn],
                "confidence": "medium",
                "answerSource": "chapter-end grid answer key (e.g. '1 C  6 D  11 D ...'), not a per-question inline marker",
                "rawBlockText": None,
            })
            recovered_from_grid += 1
        else:
            still_skipped.append(s)
    skipped = still_skipped
    print(f"Zahra: +{recovered_from_grid} answers recovered from chapter-end grid key")

out = {
    "sourceId": source_id,
    "sha256": sha,
    "file": "Histo MCQ by Dr.Zahra [104].pdf",
    "corpusRelativePath": "y1/104 CPS/Doctors/Dr. Zahra Histology/Histo MCQ by Dr.Zahra [104].pdf",
    "book": "Histology MCQ by Dr. Ahmed Zahra [104]",
    "subject": "Histology",
    "module": "104 CPS",
    "pages": n_pages,
    "markConvention": "typed 'answer x' (or 'Answer x') line, right-aligned after each question's options, native text layer. Verified against pdftoppm renders of pages 1-3: no highlight/pen marks -- the printed answer line is the sole key.",
    "extractionMethod": "PyMuPDF get_text('text'), regex block parse (scripts/kasr/extract/104-CPS/solved-books/extract_zahra.py)",
    "stats": {
        "questionsExtracted": len(questions),
        "keysRecovered": sum(1 for q in questions if q["answer"]),
        "pagesSkipped": skipped,
    },
    "questions": questions,
}

with open(OUT, "w") as f:
    json.dump(out, f, indent=2, ensure_ascii=False)

print(f"Zahra: {len(questions)} questions extracted, {len(skipped)} skips, source={source_id}")
