# MANS-HBG — first-cluster triage (Phase-0 sample)

**Scope note, read first:** the HBG Telegram group holds 8 papers and 31 banks (see
`coverage/MANS-Y1-priority-sources.md` §HBG). This is a representative first-cluster
sample, not an exhaustive triage of the group — the same "Phase-0 sample" scope as
`MANS-HIS-203-triage.md`. What follows: the first 40 of `Histo Previous MCQ Exams
Final.pdf`'s ~180-190 questions read and keyed in full (render), the file's later pages
spot-checked for format consistency, and the second priority-4 bank
(`Histo MCQ Formatives + Exams Final.pdf`) status-checked but not yet opened.

## Both priority-4 banks are fully scanned — no embedded text layer

`pagetext.mjs status` on both files: **38/38 pages** of `Histo Previous MCQ Exams
Final.pdf` (`src_168d0f3dc020c263b89d`) and **36/36 pages** of `Histo MCQ Formatives +
Exams Final.pdf` (`src_75e3a10915ca69686e11`) read `garbled=yes, ocr=no` — no text layer
at all, every page a scanned image. `pagetext.mjs keys` cannot recover anything from
either file for this reason (`keys` reads the PDF's own embedded text runs for
bold/red/printed markup — with zero embedded text there is nothing for it to read,
regardless of how the printed page itself looks): every page returns `no text layer —
keys need ocr+render`.

**This is not the highlight-only trap the task brief anticipated — it is stronger
evidence, just not machine-readable by the `keys` tool.** OCR (`pagetext.mjs ocr`)
recovers the question stems and options cleanly (128-210 words/page, no garbled pages
after OCR) but the printed answer sits in a separate right-hand column that tesseract's
`psm 6` whole-page read does not associate correctly with the OCR'd question text (see
"OCR limitation" below) — so `mark-garbled` + `render` was used to read the key column
directly, same fallback the task brief specified for the highlight-only case, at a
render budget of 10 pages this pass (cap 14 per the task brief's guidance for this
fallback path).

## `Histo Previous MCQ Exams Final.pdf` (`src_168d0f3dc020c263b89d`) — p.1-9 read in full

- **Format**: a printed, typeset answer-key column to the right of each question block
  — not a highlight, not hand ink. One capital letter (A-E) per question, clean and
  unambiguous, confirmed by direct visual render of p.2-9 (Q1-40).
- **Items**: 40 questions read and keyed this pass (Q1-40, the "دفعة 63 Exams" block).
  All are single-best-answer, 5-option (a-e) MCQs with real stems — basic Histology,
  cell biology and Genetics content (organelles, cell junctions, epithelium
  classification, connective tissue cells/fibers, skin, nervous tissue, cell
  division/chromosome genetics). **Zero** True/False items, **zero** diagram-only items,
  **zero** junk items in the sample.
- **Keyed %**: **40/40 = 100%** on this sample (see `MANS-HBG-triage-keys.txt`).
- **Key evidence type**: printed answer-key column, recovered by render (OCR text alone
  mis-locates the letter — see below), not highlight and not hand ink. This is the
  strongest key-evidence tier this lane has seen, stronger than the HIS-203 lane's
  printed-key baseline since there is no ambiguity about which letter belongs to which
  question (one clean cell per row).
- **Beyond p.9 (not individually rendered/keyed this pass)**: `pagetext.mjs ocr`
  confirms every one of the file's 38 pages OCRs cleanly (128-210 words/page). `show`
  spot-checks of p.20-22 and p.36-38 (a second "دفعة 61 Exams" block starts mid-file, at
  p.20) confirm the same 5-option format and the same right-hand key-column layout holds
  throughout — no format break, no True/False, no diagrams seen in the spot-check. At
  ~5 questions/page and ~36 content pages, the file likely holds on the order of 175-185
  distinct questions total; only the first 40 are individually keyed so far.

## `Histo MCQ Formatives + Exams Final.pdf` (`src_75e3a10915ca69686e11`) — status only

Confirmed fully scanned (36/36 pages, no text layer), same file-level profile as the
first bank. Not OCR'd or rendered this pass — the first bank alone supplied enough
100%-keyed, real-stem items for this cluster's target (30-50 authored). Flagged as the
next pass's starting point alongside `src_168d0f3dc020c263b89d` p.10 onward.

## OCR limitation, confirmed here (a new instance of the source's key-recovery trap)

Tesseract's `psm 6` whole-page OCR reads the page as one raster-ordered block. On this
layout (question+options in a wide left column, one printed key letter per row in a
narrow right-hand column, each row a different height), the key letters are still
extracted as characters but land at whichever left-column line the OCR's ordering pass
associates with that vertical position — not reliably the correct-answer's own option
line. Spot-check: p.20 Q1's key (`C`) appears appended to option (b) in the OCR text,
not option (c); p.36 Q35's key (`A`) appears appended to option (c). **The letter itself
is usually read correctly by OCR; its line placement in the flattened text is not
trustworthy.** Render (full-page image, key column visually distinct) is the reliable
recovery method for this file's layout — confirmed against the render evidence for
Q1-40, where every OCR-adjacent letter matched the rendered key exactly, just on the
wrong printed line in the OCR text. Noted for whichever pass next opens this file or the
second HBG bank, in case the same layout repeats.

## TRIAGE VERDICT: APPROVED

40/40 = 100% keyed by a printed, unambiguous answer-key column with real stems — well
above the ≥60% bar. Proceeding to Step 2 authoring from this 40-question sample.

## Module id — the HBG split is real at the item level, not just at the file level

Per `academic/MANS-Y1-modules.md`, `PAEHC` = *Principles of Anatomy, Embryology,
General Histology and Cell Biology*, `PBBG` = *Principles of Biochemistry and Basis of
Genetics*. This sample confirms the LANE-CARD's flagged ambiguity is real per-item, not
just per-file: of the 40 questions, ~30 are Histology/cell-biology facts (organelles,
junctions, epithelium, CT, skin, nervous tissue — `PAEHC` territory) and ~10 are Genetics
facts (meiosis stages, chromosome/chromatid counts, karyotype syndromes — `PBBG`
territory), interleaved question-by-question within the same exam block, not separated
by section. No dated S1 timetable exists locally to resolve which questions the faculty
itself assigns to which module (per LANE-CARD §7). Per the task brief's instruction,
file prefix `MANS-HBG` is used (LANE-CARD does not prescribe one module id for this
group), with each question's `module_subject` set to its actual topic (`Histology` or
`Genetics`) so a future split is a filter, not a re-read.
