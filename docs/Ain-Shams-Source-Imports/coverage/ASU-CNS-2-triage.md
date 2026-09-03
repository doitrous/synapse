# ASU-CNS-2 triage

Module: `ASU-CNS-2` (Central Nervous System, Ain Shams Year 2, year token `ASU_Y2`).
Confirmed against `manifest/asu-y2-sources.json` (moduleId, yearId) and
`LANE-CARD-Y2-3.md` §1 — do not confuse with `ASU-CNS-3` (Year 3), a
different module id and year token that shares the same "Central Nervous
System" folder name and, per the board's curriculum-move ruling, some of the
same past-exam PDFs (see "Cross-module note" below).

Before this batch, ASU-CNS-2 had 0 authored questions. Two concepts/one
article-pair existed from an earlier, unrelated "motor exam foundations"
slice (`concept/ASU-CNS-2-motor-exam-foundations-concepts.md`, clinical
medicine source, already landed per `INDEX.md`'s production-batches table)
— that slice is untouched by this batch.

## Cross-module note (read before picking a second ASU-CNS-2 paper)

`asu-y2-sources.json` vs `asu-y3-sources.json`: of ASU-CNS-2's 131 manifest
rows, 29 share an identical sha256 with an ASU-CNS-3 row — i.e. the exact
same PDF file is duplicated across both years' corpus folders (the board's
"CNS moves Y2T2↔Y3 across cohorts" ruling in `LANE-CARD-Y2-3.md` §1). The
first candidate paper tried here, "EOM - CNS FINAL PAPER 1 2024.pdf"
(`src_a5a15b69f093397250ab`), turned out to be one of these 29 — it was
**already fully authored** as ASU-CNS-3's `final2024-mcq` cluster (20
concepts, `resource/ASU-CNS-3-final2024-mcq-resources.md`). Re-authoring it
under ASU-CNS-2 would have duplicated live CNS-3 content under a different
module/year without knowing which cohort actually sat it (a year sourced
from a filename/folder is not the examiner's date, per `SHARED-TOOLCHAIN.md`).
**Before authoring any further ASU-CNS-2 paper, sha256-check it against
`asu-y3-sources.json` first** (`python3` one-liner: load both manifests,
compare `sha256` for `moduleId=='ASU-CNS-2'` vs `moduleId=='ASU-CNS-3'`) —
skip anything that lands in the 29-row overlap list unless you intend to
retag the year of the existing CNS-3 batch instead of minting new content.

## This batch: "MCQs - cerebellar tumlors & CNS infection.pdf"

`src_9682eaa7991b4f5b8dc0`, Pathology subject, 11 pages, native text, 58
items — NOT in the Y2/Y3 sha256 overlap list (confirmed unique to
ASU-CNS-2). Real 4-option clinical-vignette MCQs with a printed "Answer: X"
key on every item (unlike CNS-3's embedded-answer papers) — options are
transcribed from the source, not authored from scratch.

### Authored (cerebellar-tumors-mcq cluster, 11 items — see coverage/seeds/ASU-CNS-2/cerebellar-tumors-mcq.json)
Items 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 41 (all medulloblastoma/hemangioblastoma
facts from the paper's "cerebellar tumors" section, p1-3 + p8). 11 new
concepts minted under `SYS-NEU-T06-S02-M03` (Brain tumours), all checked via
`find-existing.mjs` with 0 overlap against ASU-CNS-3's own pathology
concepts at authoring time.

### Held — within-file duplicates (2 items)
- Item 12 — restates item 1's Homer Wright rosettes → medulloblastoma fact.
- Item 13 — restates item 6's reddish vermian mass → hemangioblastoma fact.

### Authored (infections-mcq cluster, 39 items — see coverage/seeds/ASU-CNS-2/infections-mcq.json)
Items 14-58 minus item 41 (already in cerebellar-tumors-mcq) and minus the 6
holds below, plus one unnumbered item printed between source items 20 and 21
(HIV dementia / HIV-1 meningoencephalitis). 39 new concepts minted under
`SYS-NEU-T06-S02-M01` (Meningitis — used as the general bacterial/route-of-
entry leaf, the only fit under this subtopic besides Encephalitis/Brain
tumors) and `SYS-NEU-T06-S02-M02` (Encephalitis, for the HSV/rabies/viral-
encephalitis items), all checked via `find-existing.mjs` at authoring time.
Two near-identical facts turned up in ASU-CNS-3's own pending
`finalpaper2-2024` batch (viral meningitis CSF glucose) and one in ASU-INF's
pending `microbiology` batch (rabies/Negri bodies) — both cross-module
pending (not-live) batches, so this cluster mints its own record rather than
creating a cross-module `--with` dependency; left as a note on those items'
`field_notes` for a later human dedup pass.

### Held — within-file duplicates + one key-conflict (6 items)
- Item 38 — key-conflict HOLD: printed key (C, Toxoplasmosis) contradicts
  standard knowledge that toxoplasmosis IS a common CNS complication of
  AIDS; the stem's own "directly mentioned in the text" phrasing suggests a
  source textbook this batch does not have. NEEDS-OMAR.
- Item 43 — duplicate of item 25 (Cowdry A bodies → HSV encephalitis).
- Item 50 — duplicate of item 20 (tuberculoma gross description).
- Item 52 — duplicate of item 39 (viral meningitis CSF glucose normal).
- Item 54 — duplicate of item 31 (TB meningitis CSF protein elevation).
- Item 55 — duplicate of item 28 (perivascular infiltrates → viral encephalitis).

Gates: `medical:batch` 0 errors on all three files (concept/article/question,
question gated `--with` its concept, article and the existing cerebellar
resources sibling); `medical:simulate` positional on all three,
`created=117 updated=0 rejected=0 errors=0`.

## This batch: "MCQs - Neurodegenerative_Diseases.pdf"

`src_180b13dc70178e87fc74` (manifest names it `...(1).pdf`; the live Desktop
tree copy is `MCQs - Neurodegenerative_Diseases.pdf`, no `(1)` — sha256
confirmed identical, `180b13dc70178e87fc74d76c94a97b1c65d2e9b59f839f2cd5f1db644ec1b230`,
same file), Pathology subject, 11 pages, native text, 57 questions (56
numbered + 1 unnumbered item between 28/29 on cerebral amyloid angiopathy,
plus 1 more unnumbered item between 49/50 on MZ-twin concordance — 58
printed items total once both unnumbered ones are counted). Confirmed NOT in
the Y2/Y3 sha256 overlap list (unique to ASU-CNS-2, checked against
`asu-y3-sources.json` per the cross-module rule above).

Every item carries a printed "Answer: X" key, but the raw `pdftotext
-layout` extraction order is jumbled by a diagonal watermark ("Hegazy
Pathology") overlapping the answer box — `pagetext.mjs keys` reports nearly
every question as "multiple" (false positive: the watermark's stray glyphs
trip the colour/style-based option-marking heuristic, not a real multi-mark
key). The real key is the plain "Answer: X" text; **rendering pages 1 and 2
as images and reading them visually confirmed the correct rule: read
"Answer: X" tokens in top-to-bottom document order and assign them 1:1,
sequentially, to questions in that same order** — the box's exact
interposition point (before vs after the following stem) varies by page
layout but the sequential assignment is reliable throughout (cross-checked
against standard neuropathology/neurology teaching, fact by fact, for every
one of the 58 items — no medical inconsistency found once mapped this way).

### Authored (neurodegenerative-diseases-mcq cluster, 56 items — see coverage/seeds/ASU-CNS-2/neurodegenerative-diseases-mcq.json)
Items 1-9, 11-22, 24-56 plus both unnumbered items, minus the 2 within-file
duplicates below. Grouped into 8 thematic articles/concept clusters:
neurodegenerative disease classification (7), movement disorder categories
incl. ALS/ataxia (5), Alzheimer disease pathogenesis (9), Alzheimer disease
pathology (10), reversible causes of dementia (2), demyelinating disease
general pathology (8), multiple sclerosis epidemiology/clinical course (8),
multiple sclerosis pathology (7). 56 new concepts minted under
`SYS-NEU-T05-S01-M01/M03` (Parkinsonism/Chorea), `SYS-NEU-T05-S02-M01/M02/M03`
(Dementia/Motor neuron disease/Ataxia) and `SYS-NEU-T06-S01-M01` (Multiple
sclerosis) — all checked via `find-existing.mjs` at authoring time; hits
found only against other universities' *pending* (not-live) batches (e.g.
ASU-CNS-3's own pending MS/PML concepts), left as a note for a later human
dedup pass per this module's established pattern, not a cross-module
`--with` dependency.

### Held — within-file duplicates (2 items)
- Item 10 — restates item 1's "neurons related by function not physical
  location" classification fact.
- Item 23 — restates item 15's alpha-secretase/non-amyloidogenic-APP-pathway
  fact (different distractor set, same tested fact).

Gates: `medical:batch` 0 errors on concept (56 items standalone), article (8
items, `--with` the concept file — each article's `annotations` block quotes
its member concepts' own `definition` field verbatim, appended into the
article's own `## sections` body so the quote-must-appear-in-body check
passes), question (56 items, `--with` concept + article + resource); full
4-file `medical:simulate` positional in apply order (resource → concept →
article → question), `created=121 updated=0 rejected=0 errors=0`.

### NOT yet triaged — next frontier
Both papers this lane has triaged so far ("MCQs - cerebellar tumlors & CNS
infection.pdf" and this one) are now fully authored (125 authored, 10 held
combined). Move to the next ASU-CNS-2 source: 21 other unscreened papers
remain (see below). Recommended next pick: `MCQs - ALAA opioids and
Antiparkinson.pdf` (Pharmacology, tier3 bank) — thematically adjacent to
this batch's Parkinsonism content and untried. Remember the sha256
cross-module check against `asu-y3-sources.json` before authoring it (see
"Cross-module note" above), and check for a real printed/visual key before
committing to the paper (this batch's watermark-jumbled-but-real key and the
Motor/Sensory banks' genuinely-absent key are both real traps in this
module's corpus).

## Other unscreened ASU-CNS-2 papers (22 total, 2 triaged so far)
Per `coverage/ASU-Y2-priority-sources.md` "ASU-CNS-2" section — 21 papers +
24 more banks remain fully unscreened. `MCQs - Motor Questions- 1/2/3.pdf`
and `MCQs - Sensory Questions- 1/2/3.pdf` (Physiology, tier3 banks) —
checked at triage time and found to have **no printed answer key at all**
(`pagetext.mjs keys` → 0 marked on every item, confirmed by reading the raw
text) — HOLD the whole file per the "no/unreadable key" rule unless Omar can
supply an answer key. Other untried Pathology/Pharmacology banks worth a
look next: `MCQs - ALAA opioids and Antiparkinson.pdf`, `MCQs - CNS Part-1/2
Dr. Omar Nasser.pdf` (Biochemistry), and the `EOM MCQs - <SUBJECT> CNS PAPER
1 MCQ.pdf` bank set (Anatomy/Biochemistry/Histology/Physiology).
