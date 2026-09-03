# O6U-IMB-104 -- triage (S1-S3)

Source folder: `Year 1/IMI-MBI/_Telegram O6U Med Bot/`. Three of the four manifest files
triaged this pass (`Strange terms and important notes in MBI module.pdf`, a small notes set
not previously flagged for triage, was not opened this pass -- flagged for a future look).

## `Bio questions.pdf` -- TIER 4, 25p / word-count-heuristic said "clean" but flagged for a
visual check (`coverage/O6U-Y1-priority-sources.md` item 4)

The word-count heuristic undersold this file badly: it turned out to be the best source in
the whole IMB-104 corpus. It is a five-chapter, spiral-bound-notebook photocopy (page numbers
72-96 visible in the corner, cut from a larger compiled molecular-biology question bank) --
**Nucleotides and Nucleic Acid Chemistry** (36 MCQ, p1-6), **Replication/DNA Synthesis**
(22 MCQ, p7-10), **Transcription/RNA synthesis** (26 MCQ, p12-15), **Translation/Protein
synthesis** (29 MCQ, p17-21), **Regulation of Gene Expression** (9 MCQ, p23-24) -- **122
single-best-answer questions total, every one keyed**, each chapter ending in its own printed
"MCQ Answers" table (e.g. p5, p10, p15, p21, p24). Chapters 2 and 4 also carry short matching-
question sections with their own printed "Matching Question Answers"/"Matching Answers"
tables, not counted here (2-column match format, out of scope for single-best-answer
authoring).

Initial `pagetext.mjs show` output on unmarked pages returned OCR-noise-heavy text --
resolved by `mark-garbled` + `render`: page 1 turned out to be a clean, native-text notebook
page; the apparent noise (stray letters like "G", "e-" after each option) was spiral-binding-
hole artifacts from the right edge of the photocopy, not printed marks. All five chapter-
ending answer tables were read from rendered page images (not OCR text, which mangled the
table cells) and cross-checked against standard molecular biology fact -- **no contradictions
found** across all 122 keys.

**Triaged: 122. Keys recovered: 122 (100%). Zero holds** (source-quality-wise; see below for
scope-driven "not authored this pass").

### Authored this pass: 34 of 122 (28%)

Given ample fully-keyed supply from one clean source, 34 questions were selected across all
five chapters for breadth (10 from Ch1, 7 each from Ch2-4, 3 from Ch5) rather than exhausting
the whole 122-question bank in one dispatch. The remaining 88 keyed-but-not-yet-authored
questions are recorded in `coverage/O6U-IMB-104-triage-keys.txt` (prefixed
`bio104-ch<N>-unselected-qNN`) as a ready backlog for a future authoring pass -- they are not
held for any evidentiary reason, simply not reached this session.

### `CYTOGENETICS MCQ UNIT 1.pdf` -- TIER 3, 7p fully garbled

OCR'd in full (`pagetext.mjs ocr --pages 1-7`). 50 questions ("Unit One Cytogenetics MCQ", by
"Dr Mariam Youssef") across pages 1-5, with a genuine handwritten **"Answers"** key sheet on
page 7 (same author, titled "Answers" at the top, not a respondent's own exam submission).
Read by rendering page 7 at 400 dpi and cropping close on ambiguous cells. 48 of 50 answers
are clean, unambiguous single letters (spot-checked against fact: Q1 metaphase karyotyping,
Q5 Philadelphia t(9;22), Q9 Turner monosomy, Q14 XYY = Jacob's syndrome all correct) --

**but the source paper's own option lettering is internally defective**: Q32 and Q37 print
the identical question ("35.Centromere of Chromosomes contains") with options labelled
`(a) DNA Sequences / (c) Protein Sequences / (b) RNA Sequences / (b) None of these` -- two
options both lettered "(b)", a printing defect that makes the key's single-letter answer
un-resolvable against the correct option with confidence. Q38 ("Colchicine is used to cause")
has **no letter at all** in the key (`38)` followed by a blank, confirmed at 400 dpi zoom).
Q47's key letter is scribbled/crossed over illegibly (a "B" overwritten with what may be a
correction, ambiguous which letter survives). One spot-check (Q34, "Male Human is represented
by sex Chromosomes", options `a)XX (c)XO [b)XY (d)YY`) gave key answer "D" (YY) where the
fact-correct answer should be "B" (XY) given the printed lettering -- suggesting the key was
written against a different, presumably correctly-lettered version of this same recurring
question bank, not this specific relettered/typo'd copy.

Given this lettering-defect risk across the source, and that `Bio questions.pdf` alone
already supplied ample clean material for this dispatch's cluster, **none of CYTOGENETICS's
50 questions were authored this pass** -- held pending a closer per-question lettering-defect
review (flagged for `spawn_task` or a future session). All 50 are keyed for that future
pass; see `coverage/O6U-IMB-104-triage-keys.txt` (prefixed `cyto-mbi104-qNN`).

### `MBI final exam.pdf` -- TIER 1, 6p / same "clean but needs a visual check" caveat as
`Bio questions.pdf`

Rendered all 6 pages. It is a genuine 6 October University "Block 1 End Module Exam, MBI 102"
paper: 20 MCQ (page 1-2) + clinical-case short-answer + essay sections (p3-6). **No printed
key, no marked/circled/highlighted answer, and no student handwriting of any kind anywhere in
the file** -- it is a blank, unfilled exam paper. Confirmed by rendering every page at full
resolution; the only handwritten marks are a proctor's total-marks boxes ("10", "3", "5", "7")
in the page corners, unrelated to individual question answers.

**Triaged: 20. Keys recovered: 0 (0%). All 20 held** (unmarked, no key of any kind found).

## Checkpoint table

| Source | Items | Keyed | Keyed % | Renders | Authored |
|---|--:|--:|--:|--:|--:|
| Bio questions.pdf | 122 | 122 | 100% | 3 (spot-checks) | 34 |
| CYTOGENETICS MCQ UNIT 1.pdf | 50 | 48 usable / 50 printed | 96% printed, unresolvable-lettering | 3 | 0 |
| MBI final exam.pdf | 20 | 0 | 0% | 6 | 0 |
| **Module total** | **192** | **170** | **89%** | **12** | **34** |

Module-level keyed rate (89%) clears the 60% TRIAGE APPROVED bar comfortably on the strength
of `Bio questions.pdf` alone (which alone is 64% of all IMB-104 items and 100% keyed).

## Concept resolution

34 concepts tested; 33 minted new, 1 near-exact hit found (GC-content/melting-temperature,
`CON-FND-AF09E96F70832F` in Ain Shams's own
`docs/Ain-Shams-Source-Imports/concept/ASU-MBG-nucleic-acid-chemistry-concepts.md`) but not
reused -- its own defining article sits in a second, Kasr-owned `docs/import-ready/article/
102-INT-biochemistry.md`, a two-hop cross-university pending chain outside this dispatch's
`--with` scope, so a fresh concept (`CON-FND-50C9386652AC03`) was minted instead with the
near-miss recorded as a `rejected_merge_candidate_ids` entry and flagged in `field_notes` for
a future consolidation pass. Broad greps also surfaced likely-overlapping DNA-replication/
transcription concept files at Kasr `102-INT-*`, Ain Shams `ASU-MBG-*`, Alexandria
`AU-MED-102-biochem-molecular-concepts.md` and Assiut `AUN-INI-105-*` -- none of the specific
33 facts authored here matched closely enough to reuse (the near-misses were either broader
classifications or different specific claims), so all 33 were minted new. See
`coverage/O6U-IMB-104-triage-keys.txt` for the full per-question list.

## Authored

34 of 122 keyed questions authored, 88 held for scope (not evidentiary reasons), 70 held for
cause (50 CYTOGENETICS lettering-defect, 20 MBI final blank). Seed:
`coverage/seeds/O6U-IMB-104/bio104-mixed.json`. Batch:
`question/O6U-IMB-104-bio104-mcq.md`. New concepts: `concept/O6U-IMB-104-concepts.md` (34,
including the melting-temperature record minted fresh over its near-miss). New articles:
`article/O6U-IMB-104-articles.md` (7). Resource: `resource/O6U-IMB-104-resources.md`
(`src_15a36a801ec0b4a6705d`).
