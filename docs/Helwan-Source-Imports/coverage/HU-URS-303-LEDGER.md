<!--
  Hand-maintained ledger for HU-URS-303 (URS-303 lane 1, branch
  hu-urs303-author1). See HU-URS-303-triage.md for the full corpus analysis.
-->

## Triage pass (this commit) — TRIAGE NOT APPROVED, held whole-module

Every countable item in the corpus was reviewed: 99 `urs303-gur-qNNNN` +
100 `urs303-phase-qNNNN` (`❀`-bulleted fact/inline-answer items, programmatic
count from full-page extraction) + a 4-page OCR sample of the 25-page
`urs303-final-*` scanned final-exam compilation. Full detail, per-file
breakdown and the join-rate substitute table: `HU-URS-303-triage.md`.

| source | items | status | reason |
|---|--:|---|---|
| GUR questions.pdf | 99 | held | inline answer, no lettered option set — not a real MCQ stem |
| phase questions.pdf | 100 | held | inline answer, no option set, **and** ~92% off-module (re-confirms `HU-Y3-priority-sources.md`'s old-triage figure) |
| final exam Batch 2021.pdf | 25 pages, ~12 items in a 4-page OCR sample | held | no answer key anywhere in the file (p25 is source links, not a key); option lists inconsistent/incomplete across the multiple student recollections stitched into the file |

**0 authored, 0 concepts minted, 0 mints of any kind.** 199/199 GUR+phase
items held; final-exam file's remaining 21 pages left un-OCR'd (4 of the
render-cap-14 budget spent on the sample that settled the "is there a key"
question — negative).

| cluster | authored | held | remaining/untriaged | total |
|---|---:|---:|---:|---:|
| GUR questions (all subjects) | 0 | 99 | 0 | 99 |
| phase questions (all subjects) | 0 | 100 | 0 | 100 |
| final exam (OCR sample, 4pp) | 0 | ~12 | — | ~12 |
| final exam (un-OCR'd, 21pp) | 0 | 0 | 21 pages | 21 pages |
| **total (countable items)** | **0** | **199** | **21 pages untriaged** | **199 + 25pp** |

## Why this lane did not proceed to STEP 2

The dispatch's gate is "≥60% of items are keyed with real stems." This
corpus is categorically different from HU-GIT-301-B (302/302 keyed) and
HU-ORL-305 (959/980 joined against a separate printed answer key) — URS 303
has no department bank and no answer-key file at all. The two `❀`-format
files carry an answer for every item (100% "keyed" in the loosest sense) but
zero real MCQ stems (no lettered option sets to test against — a bare "fact:
answer" line is not an authorable SBA item without inventing the entire
distractor set, which is a materially different kind of authoring than
transcribing/joining a printed exam). The one file with genuine stem+option
shape (the final exam) has no key to verify any answer against. Net: **0% of
the corpus meets the conjunction of "keyed" and "real stems."** Held per the
dispatch's own instruction ("If not, stop, commit, push, report needs Omar
sources / ruling").

## Rejected-merge-candidate / concept work

None performed — no authoring reached the mint stage. The triage doc's
concept-reuse spot check (6 terms against `find-existing.mjs` + a
`docs/*/concept|pending-live` grep) is informational only, confirming the
LANE-BRIEF's expectation of ASU-UG `CON-REN-*` reuse for whoever authors this
module once real source material exists — no ids recorded here since nothing
was minted or overlaid.

## Remaining / walls

Everything (199 items + 25-page final-exam file). See
`HU-URS-303-triage.md` §Recommendation/walls for the three paths forward:
(1) a real bank+key from another Telegram source (needs Omar — the module's
own channel search already came back empty), (2) a ruling on whether the
GUR file's 99 inline fact/answer pairs are authorable as a non-MCQ content
shape, (3) a scoped OCR pass on the final exam's remaining 21 pages *if* a
matching key ever surfaces (OCR alone will not change the outcome without a
key).

HANDOFF: hu-urs303-author1 · next chapter/item = none — module held at
triage; next action is Omar sourcing a real bank+key or a ruling on the
inline-fact-file's content shape (see `HU-URS-303-triage.md`
§Recommendation/walls), not a resume-from-item.
