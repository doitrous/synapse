# 319 Nutrition (NTR, Year 3) — triage / EXCLUSION note (module NOT opened)

Status: **BLOCKED — no keyed 4-option MCQ bank exists in the 319 corpus.**
Surveyed 2026-09-06 (text-first, no OCR grind per anti-stall). No manifest row added,
no content authored. This note exists so no future session re-runs the same survey.

Source tree: `/Users/doitrous/Desktop/Universities/Kasr Alainy/y3/319 Nutrition/Nutrition/`

## Why the module cannot be opened as an MCQ lane

The 319 exam format is itself not a pure MCQ bank. `Questions & MCQs/Nutrition Examples
Questions.pdf` (native text) states the exam = 24 mixed items (MCQ + True/False + Matching)
plus a written final (short questions). The question corpus is dominated by **written /
short-answer** material, not keyed 4-option MCQs.

## Candidates surveyed (all EXCLUDED for an MCQ lane)

| File (under Questions & MCQs/ unless noted) | Text layer | Verdict |
|---|---|---|
| Old System (NTR) [3-1-2026].pdf | image, no text | image-only; would need full OCR |
| NTR WR, MCQ & PR PY.pdf (sha 6259c855…) | garbled custom-font (words≈4-9/page); "MCQ" hits are only the repeated page header | undecodable text; full-OCR grind — forbidden by anti-stall |
| Unsolved NTR.pdf | native | written questions, unsolved (no keys) |
| Minute NTR.pdf | native | written short-answer (Arabic), no MCQ |
| Nutrition_Written_by_Dr_Ameen.pdf | native | written revision Q&A |
| Nutrition_By_Dr_Marwa_+_Answered_written_questions… | native (notes) | concept maps + answered **written** Qs, not MCQ |
| Nutritional Assessment.pdf / Nutritional assessment 2.pdf | image, no text | image-only |
| Nutrition Examples Questions.pdf | native | exam-format description + sample short Qs |
| EOM/EOM - Nutrition EOM+practical 2025 (1).pdf | image, no text | image-only |
| EOY/EOY - Nutrition final [197].pdf | native | **written model-answer** doc; inline "(MCQ)" tags mark topics, not a 4-option bank |
| Department Book - NUTRITION 2023 / CLINICAL 2023.pdf | image, no text | textbook, image-only |

Grep sweep across all 10 text-layer files (410 pages): no `answer key`, no 4-option MCQ
stems with a marked correct letter. The only "MCQ"-tagged native text is either the
`NTR WR, MCQ & PR PY` page header or annotations inside the written EOY model-answer doc.

## Recommendation

Skip 319 as an MCQ authoring lane. If 319 is ever opened, it must be a **written/short-answer**
lane (different contract), sourced from the EOY [197] model answers + Dr Ameen/Minute written
sets — not the MCQ pipeline.

Most tractable fresh Y3 MCQ target instead: **327 MPE Ethics.**
`327 MPE Ethics/MPE Ethics/Questions & MCQs/MPE 327 PY Answered.pdf` is native text with clean
4-option MCQ sections (per-topic "1) MCQs" headers on p3/9/20/25/29/35/44/45…), per-question
year tags (e.g. `[196 1st]`, `[194 1st]`, `[Dep Revision]`), interleaved with T/F items that
are easy to filter out. Caveat for that lane: the plain text layer shows no answer marker, so
the correct option is likely a highlight/color/bold — verify the key source (render one page)
before authoring; the "Answered" branding implies keys are present in some visual form.
