# SVU Year 1 — priority source set (S2)

Per module: real exam papers first, then question banks, then department lecture
material (00-START-HERE.md §"law of priority"). Tier follows
`manifest/y1-sources.json`'s `sourceTier` (1 = paper, 2 = bank, 3 = lecture, 9 =
administrative).

**Tier 1 (papers) and tier 2 (banks) are empty for every SVU Year 1 module.** Nothing in
this corpus carries a printed question with a key. This is the wall this lane hits at
S3 — see `coverage/SVU-Y1-triage.md`.

A Desktop curation note already exists at `Year 1/_Catalog/Year 1 Priority 4.md`
(not part of this manifest) picking up to 4 files per subject folder by hand; every file
it names is reproduced below with `[Priority 4]`, cross-checked against this lane's own
manifest — all 19 of its picks are the corpus's entire Year 1 file set (there is nothing
left over to pick from).

## SVU-PMM101 — Principles of microscopic and macroscopic structures (Semester 1)

**Tier 1 — papers:** none.
**Tier 2 — banks:** none.

**Tier 3 — lecture material (11 files)**

| File | Readability | Notes |
|---|---|---|
| `Anatomy/Cardiovascular System.pdf` | 81pp, 1844 words, 9 garbled | `[Priority 4]` |
| `Anatomy/Skeletal System.pdf` | 78pp, 2379 words, 6 garbled | `[Priority 4]` |
| `Anatomy/Digestive System.pdf` | 21pp, 916 words, 3 garbled | `[Priority 4]` |
| `Anatomy/Nervous System Summary.pdf` | 22pp, 651 words, 3 garbled | `[Priority 4]` |
| `Histology/هستولوجى أولى طب قنا (1).pdf` | 23pp, 6390 words, 0 garbled | Preferred twin — `[Priority 4]` |
| `Histology/هستولوجى أولى طب قنا.pdf` | 16pp, 4378 words, 0 garbled | Discard twin (partial re-download) |
| `Histology/Q1 Cell Cycle.pdf` | 37pp, 1385 words, 1 garbled | `[Priority 4]` |
| `Embryology/01 Spermatogenesis.pptx` | not yet read | `[Priority 4]` |
| `Embryology/02 Oogenesis.pptx` | not yet read | `[Priority 4]` |
| `Embryology/03 Menstrual Cycle.pptx` | not yet read | `[Priority 4]` |
| `Embryology/04 Bilaminar Embryo.pptx` | not yet read | `[Priority 4]` |

This is the richer of the two modules by readable native text (Anatomy + Histology: 262
pages, ~13,900 words of clean text, only 22 garbled pages total). **This lane's
first-module candidate for S2 authoring once TRIAGE APPROVED** — not because it has
keyed exam material (it has none), but because it is the only module with a substantial
directly-readable text corpus.

## SVU-CBF101 — Cell biology and function (Semester 1)

**Tier 1 — papers:** none.
**Tier 2 — banks:** none.

**Tier 3 — lecture material (8 files, mostly image-only scans)**

| File | Readability | Notes |
|---|---|---|
| `Biochemistry/Lecture 1.pdf` | 15pp, 45 words — CamScanner image scan | `[Priority 4]`, needs OCR |
| `Biochemistry/Lecture 2.pdf` | 7pp, 21 words — CamScanner image scan | `[Priority 4]`, needs OCR |
| `Biochemistry/Lecture 3.pdf` | 14pp, 42 words — CamScanner image scan | `[Priority 4]`, needs OCR |
| `Biochemistry/Lecture 4.pdf` | 9pp, 27 words — CamScanner image scan | `[Priority 4]`, needs OCR |
| `Physiology/Cell Biology.pdf` | 16pp, 48 words — CamScanner image scan | `[Priority 4]`, needs OCR |
| `Physiology/Lecture 1.pdf` | 13pp, 39 words — CamScanner image scan | `[Priority 4]`, needs OCR |
| `Physiology/Lec1.pdf` | 5pp, 15 words — CamScanner image scan | `[Priority 4]`, needs OCR |
| `Physiology/Lecture 2.pdf` | 7pp, 1078878 bytes native text (only file in this module not a scan) | `[Priority 4]` |

All four Biochemistry files and three of four Physiology files are CamScanner
photo-scans with no usable text layer (~3 words/page, all "Scanned with/by CamScanner"
watermark) — **8 of 8 Biochemistry+Physiology PDFs bar one need OCR before a single
sentence can be read.** Per the lane brief, OCR is reserved for priority scanned
papers/banks — since this module has none, OCR here is deferred, not run, pending a
ruling on whether image-only lecture slides are worth the OCR spend when no exam/bank
material exists to anchor authoring against.

## OCR status

Not run. Nothing in either module qualifies as a "priority scanned paper/bank" (no
papers or banks exist at all). Flagged for a scope decision rather than defaulted:
should this lane OCR the 8 scanned Physiology/Biochemistry files as lecture-tier source
material, given no better source exists for `SVU-CBF101`? **Needs Omar / chief-of-staff
ruling** before spending the OCR budget.

## Verification performed

- Readability figures copied verbatim from `coverage/SVU-Y1-readability-index.md`
  (`pagetext.mjs index` output), not estimated.
- Every file in `Year 1/_Catalog/Year 1 Priority 4.md`'s hand-picked shortlist confirmed
  present in `manifest/y1-sources.json` by filename + folder (19/19).
