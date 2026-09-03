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

### NOT yet triaged — next frontier (items 14-58, ~44 items, "Infectious diseases of CNS")
Deliberately deferred for context-budget reasons in this authoring pass, not
screened item-by-item. On first read-through: rich but has substantial
internal near-duplication (many items re-test the same CSF-finding or
route-of-entry fact from different clinical-vignette angles — expect
significant within-file holds, following this lane's own precedent of
holding near-identical restatements). One item (originally #38, "which of
the following is NOT a common CNS complication of HIV... Answer: C
[Toxoplasmosis]") is flagged as a HOLD candidate on first read — the key
appears to contradict standard medical knowledge (toxoplasmosis is in fact a
common CNS complication of AIDS) and the stem's own phrase "directly
mentioned in the text" suggests it is scoped to an unprovided source
textbook — needs Omar/source verification before keying, do not key
editorially. Resume-first: triage items 14-58 against `find-existing.mjs`
(many CSF/route-of-entry facts likely overlap with existing Kasr/Alexandria
neuro-infection concepts — check before minting), then repeat the
seed → emit → gate → simulate → ledger cycle for a second
`docs/Ain-Shams-Source-Imports/coverage/seeds/ASU-CNS-2/` cluster.

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
