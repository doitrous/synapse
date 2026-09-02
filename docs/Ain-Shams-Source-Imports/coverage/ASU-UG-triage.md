# ASU-UG (Urogenital) triage — Step 1

Corpus root (live tree): `/Users/doitrous/Desktop/Universities/Ain Shams/Year 3/Term 2/Urogenital
System/All Subjects/Assessments/` (+ `Combined Subjects/` subfolder). Manifest `asu-y3-sources.json`
`corpusRoot` still says the retired `/Users/doitrous/Desktop/ain shams/Year 3`; `corpusRelativePath`
resolves unchanged against the new tree (per LANE-CARD-Y2-3 §2). All 9 target files verified present
and native-text (`pagetext.mjs status`: words>0 on every page, `garbled=no`, no OCR needed).

Format confirmed for every file below: **embedded-answer, no printed options** — either
`N- <stem>?\n<answer>` or `N.<answer>\n<stem/description>` order, sometimes with Arabic connective
text mixed into an otherwise-English stem. This is the CNS-3 §4 trap ("source ships a key by default
but not real distractors") — every file here needs the authoring lane to write its own plausible,
cited distractors. `pagetext.mjs keys` reports 0 keyed/124 unmarked on the richest file (checked on
`EOM MCQs - UG Final 2 MCQ Collection.pdf`) because it only detects visually-marked keys
(highlight/checkbox) — expected and consistent with the embedded-answer format, not a contradiction;
confirmed the real key by eye on every page shown below.

## Per-paper table

| Paper | Pages | Items (nominal) | Items usable | Key method | Real stems? | Notes |
|---|---|---|---|---|---|---|
| `EOM - UG Final 1 (2023-2024).pdf` | 3 | 19 | 19 | embedded, stem-then-answer | yes | fully read; clean by-subject sections (Anatomy/Pharma/Bio/Histo/Physio/Patho/Micro/Community) |
| `EOM - UG Final 2 (2023-2024).pdf` | 3 | 23 | 23 | embedded, stem-then-answer | yes | fully read; incl. real vignette stems (SLE case, PCO case, breast cancer LN) |
| `EOM - FINAL UG 1- 2020.pdf` | 3 | 20 | 19 | embedded, **answer-then-stem** (`N.<answer>\n<stem>`) | yes | fully read; item 20 (21-alpha-hydroxylase) cut off at EOF; some stems in Arabic-English mix |
| `FIRST ASSESSMENT UG 2024.pdf` | 3 | 25 | 24 | embedded, stem-then-answer | yes | fully read; item 22 ("JGA") has no stem/answer text, drop it |
| `ASS 1 UG - 2020.pdf` | 3 | 26 | 26 | embedded (mostly answer-then-stem); **item 1 is a real 5-option MCQ with a printed checkmark key** | yes | fully read; content overlaps ~1:1 with `MCQs - paper one urogenital mcq for 2020.pdf` items 1-26 (see dup note) |
| `MCQs - paper one urogenital mcq for 2020.pdf` (Combined Subjects) | 19 | ~26 dup + more | not fully sampled past p3 | embedded | items 1-26 verbatim-identical to `ASS 1 UG - 2020.pdf`; p3+ continues as "Reset assessment one Exam UG part 1 2020" — messier Arabic-paraphrase notes, not yet triaged in full |
| `EOM MCQs - UG Final 2 MCQ Collection.pdf` (Assessments) / `...Collection-1.pdf` (Combined Subjects, byte-identical per manifest `duplicateOf`) | 13 | ~128 | ~128 | embedded, stem-then-answer | yes, incl. many full clinical vignettes | fully read all 13 pages; richest single source — Anatomy 33, Pharma 9 (printed numbering repeats "2" once — Q2 fenestride MOA and a second, distinct "Q2" on parenteral testosterone hepatotoxicity are both real, separate items), Histo 12, Physio 21, Patho 28, Micro 21, Para 4; numbering has small gaps elsewhere (a couple items skipped, not blank). STEP 2 authored 40 of these (Anatomy 31 mints + Pharma 9 mints; Anatomy Q18/Q23 updated existing live concepts by overlay instead of minting) — see coverage/ASU-UG-LEDGER.md. |
| `MCQs - Urogenital Assessment 1 MCQ.pdf` | 12 | ~110-120 (est.) | sampled pp.1-6 of 12 (~62 items), all keyed/real | embedded, stem-then-answer | yes | not fully read (pp.7-12 unsampled); Anatomy/Pharma/Bio/Histo content is a **different** item set than the Collection file (e.g. "Morris rectangle", "ureter length 25cm" vs Collection's "deep perineal pouch" opener) |
| `MCQs - Urogenital Assessment 2 MCQ-1.pdf` | 11 | not fully sampled | pp.1-2 sampled (21 items) | embedded, stem-then-answer | yes | Anatomy section (items 1-21) is **verbatim-identical** to `EOM MCQs - UG Final 2 MCQ Collection.pdf`'s Anatomy section — cross-file recycling confirmed again, same as CNS-3 |

## Condition check (TRIAGE APPROVED gate)

Best two papers by item count + keyed rate + real stems: **`EOM MCQs - UG Final 2 MCQ Collection.pdf`**
(~127 items, fully read, ~100% keyed with real stems — richest, dated 2018/19/20 sitting) and
**`MCQs - Urogenital Assessment 1 MCQ.pdf`** (~110-120 est., sampled portion 100% keyed with real
stems). Both are effectively 100% keyed with real stems in the portions read — **well above the 60%
bar**. Condition met.

## Cross-file duplicate/recycling map (LANE-CARD §4 trap, confirmed again here)

- `ASS 1 UG - 2020.pdf` items 1-26 == `MCQs - paper one urogenital mcq for 2020.pdf` items 1-26
  (verbatim).
- `EOM MCQs - UG Final 2 MCQ Collection.pdf` Anatomy items 1-21 == `MCQs - Urogenital Assessment 2
  MCQ-1.pdf` Anatomy items 1-21 (verbatim).
- `EOM MCQs - UG Final 2 MCQ Collection.pdf` and `...Collection-1.pdf` are byte-identical per manifest
  (`duplicateOf` cross-reference) — same file filed twice under different folders.
- Budget real dedup time before minting per module; a manual skim across these files already caught
  three separate recyclings before authoring starts.

## Concept search sample (search-before-mint, `find-existing.mjs`, scans live + every
`docs/*-Source-Imports/pending-live/` recursively)

| Term | Result |
|---|---|
| `genitofemoral nerve` | 5 hits (live) — `CON-DER-A12AE15E4F43CD` femoral territory, `CON-AND-B7456D9FBF8AD6` cremasteric nerve — related but not the exact "not a spermatic cord content" fact; check before minting |
| `spermatic cord` | 13 hits (live) — extent/contents concepts exist; specific "which nerve is/isn't a content" facts likely still new, verify per-item |
| `sarcoma botryoides` | 0 hits — safe to mint |
| `granulosa cell tumor` | 0 hits — safe to mint |
| `leydig cell tumor` | 0 hits — safe to mint |
| `gardnerella` | 0 hits — safe to mint |

Pattern matches CNS-3: broad anatomical-structure terms have partial live coverage, specific
pathology/clinical-vignette facts are largely uncovered. Run the four-query search per concept during
authoring, don't assume cluster-wide novelty or overlap from this sample alone.

## Skipped per brief

Essay papers (`EOM - essay paper 1 - 2020.pdf`, `EOM - final UG 2 essay- 2024*.pdf`, `EOM - final
paper 2 - 2019.pdf`, `essay.pdf`, etc.), practical/OSCE files (`EOM - Practical UG Exam 2024.pdf`,
`practical 2018-2020.pdf`), and `.jpg` items (`ESSAY 2022.jpg`, `UG 2 essay 2019/2020.jpg`, `essay
2023.jpg`) catalogued only, not opened — matches the priority-sources listing, all correctly labelled
"All Subjects" essay/practical rows.
