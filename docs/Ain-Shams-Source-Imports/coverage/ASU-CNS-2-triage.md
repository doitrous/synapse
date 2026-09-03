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

### NOT yet triaged — next frontier
Both papers from `MCQs - cerebellar tumlors & CNS infection.pdf` are now
fully triaged/authored (69 authored, 8 held). Move to the next ASU-CNS-2
source: 22 other unscreened papers remain (see below) — resume-first is
`MCQs - Neurodegenerative_Diseases(1).pdf` per the recommendation already on
file. Remember the sha256 cross-module check against `asu-y3-sources.json`
before authoring any of them (see "Cross-module note" above).

## Other unscreened ASU-CNS-2 papers (23 total, only 1 triaged so far)
Per `coverage/ASU-Y2-priority-sources.md` "ASU-CNS-2" section — 22 papers +
24 more banks remain fully unscreened. Recommended next picks after the
infections block above: `MCQs - Motor Questions- 1/2/3.pdf` and
`MCQs - Sensory Questions- 1/2/3.pdf` (Physiology, tier3 banks) — checked at
triage time and found to have **no printed answer key at all**
(`pagetext.mjs keys` → 0 marked on every item, confirmed by reading the raw
text) — HOLD the whole file per the "no/unreadable key" rule unless Omar can
supply an answer key. `MCQs - Neurodegenerative_Diseases(1).pdf` (Pathology)
is untried and worth a first look next given this batch's Pathology bank
paid off well.
