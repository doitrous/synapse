# SCU-FBS104 (Foundation 3) — S3 triage

Foundation 3 (biochemistry / microbiology / pharmacology / physiology, plus
Anatomy/Histology/Pathology/Parasitology per the actual exam content) has **no
own-source keyed JSON** unlike FBS102/FBS103 — confirmed by `find` against the
Desktop corpus (`Year 1/Semester 2/Foundation 3/`): only PDFs exist, no sibling
`.json`/`.md` pair in `03 Questions and QBank/` or `06 EOM Exams/`. Per
`SCU-Y1-priority-sources.md` this module has exactly one tier-1 paper and one
tier-2 bank recovered; no lecture-folder content exists (`01 University Material`
subject folders are empty — confirmed gap, not a scan miss).

## Sources triaged

Both are native-text PDFs (`pagetext.mjs status`: 0 garbled pages across both
files, no OCR needed).

| Source | Tier | Pages | Method |
|---|---|--:|---|
| `06 EOM Exams/EOM - Foundation 3 2026 - FOMSCU MID.pdf` | 1 | 43 | `pagetext.mjs keys` (found 0 marked — this source uses a plain-text "Ans is X" convention, not red/bold/underline/highlight, so `keys` correctly reports 0 formatted marks); every page then read via `pagetext.mjs show` |
| `03 Questions and QBank/MEQ Book - Foundation 3 2026 - Dr Amer Elsharkawy.pdf` | 2 | 144 | `pagetext.mjs show` sampled across the full range (p1-8, 20, 60, 100-102, 140-144, all four subject sections) + two full-document `pagetext.mjs grep` sweeps |

## Source A — EOM Foundation 3 2026 MID (tier 1, 43 pages)

Not a standard MCQ paper. It is a one-item-per-page revision deck: 9 pages are
pure section headers ("Parasitology", "Physiology", "Biochemistry", "Pathology",
"Pharmacology", "Microbiology", "Histology", "Anatomy") or the title page — not
counted as items. The remaining **34 content pages** split into three formats:

| Format | Count | % of 34 | Example |
|---|--:|--:|---|
| Genuine MCQ, >=4 options, marked key ("Ans is X") | 4 | 11.8% | p7 (receptor saturation, 4 options A-D, Ans is A) |
| MCQ, 2-3 options, marked key | 7 | 20.6% | p12 (glycolysis ATP yield, 2 options, Ans is a) |
| Declarative recall statement, zero options ("X is Y") | 22 | 64.7% | p10 ("The form of energy storage in animals / Is Glycogen") |
| Incomplete/ambiguous (1 option shown, no key marker) | 1 | 2.9% | p42 (inversion muscle — only "A. tibialis anterior" shown, no "Ans is") |

The 22 declarative items are not MCQ at all — no stem-with-choices, just a
prompt and a stated answer (this looks like flashcard/spaced-repetition export
material, not exam questions). The 7 sub-4-option items are held per the
standing "<4 options held" rule. Net: **4/34 (11.8%) are usable-4opt-keyed
real SBA stems.**

## Source B — MEQ Book Foundation 3 2026, Dr Amer Elsharkawy (tier 2, 144 pages)

Pure Modified Essay Question format throughout, confirmed by sampling across
the full page range and every subject section (Anatomy p1-26, Immunology/
Microbiology p60-102ish, Biochemistry p60, Parasitology p140-144) plus two
full-document greps:

- `grep "^\s*Q\d+[:.]"` → **57 top-level "Q<n>:" essay prompts** ("Discuss
  Femoral nerve its origin...", "Describe the adaptive immune response to
  viral infections", "Enumerate types of metamorphosis"), each followed by a
  free-text model answer (bulleted outline / structured paragraphs, often
  spanning 1-3 pages).
- A broad choice-marker sweep (`grep -i "(choose|select|following is|which
  of the|options?[:.]|A\)|A\.)"`) returned 20 hits, all of which are
  outline-letter bullets *inside* essay answers ("A. On the hip bone, it is
  attached...", "a) Motor effects:", "a) Tibial (medial popliteal) portion")
  — not multiple-choice options on a question stem.

**0/57 (0%) of this source's items contain a genuine one-best-answer
sub-question with >=4 options.** Per the standing rule ("MEQ items are out of
the SBA format unless a sub-question is a genuine one-best-answer with >=4
options"), this entire source is out of scope for SBA authoring.

## Checkpoint table

| Module | Items triaged | Usable-4opt-keyed | Held (lt4opt/no-options/ambiguous/MEQ) | % keyed with real stems |
|---|--:|--:|--:|--:|
| SCU-FBS104 Source A (EOM MID) | 34 | 4 | 30 | 11.8% |
| SCU-FBS104 Source B (MEQ Book) | 57 | 0 | 57 | 0% |
| **Combined** | **91** | **4** | **87** | **4.4%** |

## Verdict — TRIAGE NOT APPROVED

Both sources fall far short of the LANE-CARD's 60% bar (Source A: 11.8%,
Source B: 0%, combined: 4.4%). This is not a marginal call: the EOM paper is
mostly a declarative flashcard deck with no answer choices at all (not an
exam-format MCQ source), and the MEQ book is, as its name states, a pure
essay-question bank with zero multiple-choice sub-items across a full sample
of every subject section. Per STEP 1's instruction ("If <60% on both sources,
stop after triage... report 'needs Omar sources / ruling'"), this lane stops
here without authoring.

**Needs Omar**: FBS104 has no own-source keyed JSON (unlike FBS102/FBS103)
and no recovered lecture-folder content (`01 University Material` empty for
all four subject folders — confirmed prior to this triage). The only two
recovered sources are format-mismatched for SBA (flashcard-style EOM deck,
essay-only MEQ bank). Options for Omar to weigh: (a) source new FBS104
material (a real keyed MCQ exam paper, if one exists elsewhere / can be
requested), (b) rule that this module proceeds via pure-reuse from the heavy
subject overlap with Kasr 103-BMS / Ain Shams IBM-INF / Assiut INI-105 /
Alexandria 102 concept sets without a native FOMSCU source to anchor new
mints, or (c) fold in the unsorted `_Staging/Telegram Year 1/` backlog
(395 files, sha256'd but not module-classified) on the chance it holds
FBS104-specific keyed material — this needs an explicit Omar ruling per the
LANE-CARD's standing note on that backlog, and Telegram-live fetching stays
retired regardless.

## Files

- `coverage/SCU-FBS104-triage-keys.txt` — all 34 Source-A items individually
  annotated (slug, judgment, page, excerpt), plus a one-line summary entry
  for Source B (not enumerated per-question — none contain atomic MCQ
  candidates to key).
- `coverage/SCU-FBS104-LEDGER.md` — progress ledger; all triage keys show as
  `remaining` since no seed was authored (nothing cleared the 60% gate).
