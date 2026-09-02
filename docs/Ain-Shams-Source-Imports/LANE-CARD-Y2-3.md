# LANE-CARD — Ain Shams University Years 2–3 (asu)

Companion to `LANE-CARD.md` (Year 1) — read that card's §2–4 (ten rules, read-text-not-pictures,
seed→emit→gate) first; this card only states what differs for Years 2–3.

## 1. Identity and ids

Year ids `ASU_Y2`/`ASU_Y3`. Module ids (the 26-module catalogue, already registered — see
`academic/asu-y2-structure.md`/`asu-y3-structure.md`): Y2 = `ASU-BLOOD`, `ASU-CVS`, `ASU-RESP`,
`ASU-CNS-2`, `ASU-ENDO-2`, `ASU-RES-METH-2`, `ASU-SENSES-2`. Y3 = `ASU-CLIN-NSS`, `ASU-CNS-3`,
`ASU-COMM`, `ASU-RES-METH-3`, `ASU-SENSES-3`, `ASU-ENDO-3`, `ASU-CLIN-ENDO`, `ASU-UG`,
`ASU-CLIN-UG`. **Curriculum-move ruling (board, standing)**: CNS moves Y2T2↔Y3 across cohorts —
treat as **one concept/article with both year/module paths**, individual questions keep the year
they were actually sat, never split into two concepts.

## 2. Corpus root moved

Manifests (`manifest/asu-y2-sources.json`, `asu-y3-sources.json`, built 2026-08-22) still carry
`absolutePath`/`corpusRoot` under the retired `/Users/doitrous/Desktop/ain shams/Year N` — that path
no longer exists. The live tree is `/Users/doitrous/Desktop/Universities/Ain Shams/Year N/` (per
`desktop-university-trees-canonical`). `corpusRelativePath` on every row is unaffected; resolve
against the new root. Re-verified 2026-09-02 (`manifest/INDEX.md`): **both manifests are clean, zero
drift** — every one of 501 (Y2) / 1,403 (Y3) rows reconciles by sha256 against the current tree
(active + `_Exact Duplicates/` + `_Needs Review/Zero Byte Files/`), which is itself a post-manifest
dedup quarantine, not a corpus change.

## 3. First module: ASU-CNS-3

Chosen over ASU-UG (higher raw Assessments+Questions count, 164 vs 133) because most of UG's volume
is LMS "Attempt review" formative-quiz exports, not compiled past-exam material. CNS-3 has ~22–23
named/dated past-exam papers (confirms the board's prior "22 papers" note) and 82 subject/dept
question banks (board said ~70), the highest paper density of any Y2/Y3 module — see
`coverage/ASU-CNS-3-triage.md` for the full evidence chain. **Sample triage done** (129 q from 2 of
the ~23 papers, both native-text, already-keyed compilations, 0 OCR/render needed): ~95 distinct
concepts, only 1 live hit (`cavernous-sinus` / abducens relation — update, don't re-mint). CNS-3
neuroanatomy/physiology is essentially uncovered by anything live or pending — a real catalogue gap,
not just an ASU finding. Placement for new concepts: `neuro` (confirmed valid subject code, no
open-question ambiguity like ASU-IBM's biochemistry-of-metabolism cluster had in Year 1).

## 4. This lane's Y2–3 traps

- **Embedded-answer compilation format**: CNS-3's subject MCQ banks (and at least one raw "paper 1
  cns 2018" file) state the answer/topic *before* the stem ("N- <answer>\n<description>"), not a
  4–5-option MCQ with a hidden key. **The source ships a key by default but not real distractors** —
  the authoring lane must write its own plausible distractors with citations, not transcribe options
  that were never printed.
- **Cross-file content recycling**: the same fact appears near-verbatim across different "papers"
  and subject banks (e.g. "facial n. → nucleus solitarius" showed up in both the Anatomy MCQ
  compilation and a raw dated paper) — budget real dedup time before minting, `find-existing.mjs` +
  `medical:duplicate-keys` are necessary but a manual cross-source skim caught it first here.
- **`find-existing.mjs` is raw substring matching, no word boundaries** — short queries produce false
  positives (`PICA` hit inside "apical", `Broca` hit inside "fibrocaseous"). Read the hit row before
  trusting a "N existing record(s)" count; don't treat every non-zero count as a real duplicate.
- **Within-file duplicate questions are common**: the CNS-3 Anatomy MCQ sample re-asked the same fact
  twice in one 81-question file (inferior alveolar nerve motor division, C1 nerve rami, lateral
  pterygoid plate) — collapse before authoring, don't emit two questions for one fact.
- Y2's `asu-y2-coverage.md`/`asu-y3-coverage.md` (built by the older `scripts/asu/build-foundation.mjs`,
  pre-dating the shared `pagetext.mjs` toolchain) already name every blocked/no-text-layer file
  per module — read those before re-discovering the same blockers via `pagetext.mjs status`.
- **`DIS-ANA`/`DIS-PHY` secondary_node_ids: topic-level only, no `-S0N` facet suffix** (e.g. `DIS-PHY-T07`
  Neurophysiology) — facet nodes get filtered as redundant; place on the topic node only.
- **`difficulty` enum is exactly `Easy`/`Moderate`/`Hard`/`Challenging`** — any other spelling imports
  silently as `Moderate`, no error.
- **No emit tool exists for concept/article records** (only MCQs have one, `00-START-HERE.md` §0.5.3)
  — cluster 1 hand-typed them. `177ad476` touches only `LEDGER.md`/a seed rename, **no generator
  script exists anywhere in this repo** — an earlier draft of this note was wrong. Cluster 2 wrote its
  own throwaway generator (uncommitted) to move faster; a committed, reusable one is still a gap.

## 5. Readability

`coverage/ASU-Y2-readability-index.md`: 483 sources, 16,114 pages, 904,795 words, 4,726 garbled
pages (29.3%) across 233 files. `coverage/ASU-Y3-readability-index.md` in progress as of this card
(1,381 sources — background job, larger corpus). No OCR run yet at Phase-0; garbled pages are named
for a later priority-OCR pass, not resolved here.

## 6. Walls → where the answer lives

Everything not repeated here is identical to `LANE-CARD.md` §2–4, §8 (same ten rules, same
seed→emit→gate pipeline, same gate/tool shape in `SHARED-TOOLCHAIN.md`). Priority-source ordering:
`coverage/ASU-Y2-priority-sources.md` / `ASU-Y3-priority-sources.md` (papers → banks → dept files,
tier ≤5, sitting year filename-derived and **unverified** — SHARED-TOOLCHAIN's "a year sourced from
a filename is not the examiner's date" applies here too, none of these years have been confirmed by
opening the page).
