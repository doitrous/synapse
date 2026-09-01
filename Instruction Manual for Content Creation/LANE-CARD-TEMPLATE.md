# LANE-CARD — <University> <Year> (<lane id>)
Read this card first. Open the full manual only when you hit a wall; name the wall in your report.

## 1. Identity and ids
university id · year id(s) · module id prefix · concept id shape · question id shape · where the lane's files live (concept/ article/ question/ evidence/ coverage/ pending-live/).

## 2. The ten rules that cannot bend
1. Printed keys stand as printed; a conflict is a hold, never an inference.
2. `explanation_<correct>` ≥ 3 sentences; one explanation per distractor.
3. Law of voice: state the medicine; provenance only in field_notes / citations.
4. Search before mint: `Instruction Manual for Content Creation/tools/find-existing.mjs` + `grep -ril <canonical_key> docs/*-Source-Imports/concept/`; a hit → sparse overlay, never a full-record overwrite (full records evict other universities' tags).
5. Teach before test: a question's main concept must have an article that names it in `related_concepts` and teaches it.
6. Six per-university tags on every record (list them for this lane): `universities`, `years`/`learner_years`, `module`/`modules`, `module_subject`, `exam_weight_by_year`, `university_notes` (article-only today).
7. Reviewer/publisher = "Medical team, Admin team" / "Admin team".
8. Never hand-edit a generated batch; fix the seed and re-emit.
9. Media: describe nothing in prose that the image shows; `media_recommendations: required` → record imports as Draft; labelling questions HARD-reject without an image.
10. Missing key (nothing printed, nothing recoverable) → key editorially + field note; garbled key → hold + mark the page garbled.

## 3. Read text, don't look at pictures
`node scripts/content/pagetext.mjs show "<pdf>" --pages a-b` (≤ 3 pages per call). `status` first. Only a page marked garbled may be rendered (`mark-garbled` then `render`). The lane's readability index: `<path>`.

## 4. Author: seed → emit → gate
seed dir: `<path>` · `node scripts/content/emit-mcq.mjs <seed.json> --out <batch.md>` · `node scripts/content/gate.mjs batch <batch.md> --with <the lane's concept + article files, listed>` · `node scripts/content/gate.mjs simulate <files in apply order>` (positional only, simulate has no `--with`) · never read the `.gates/` log unless the summary shows errors.

## 5. Progress ledger
`node scripts/content/ledger.mjs <seed dir> --triage coverage/<lane>-triage-keys.txt --out coverage/<lane>-LEDGER.md` after every commit. The ledger is the only progress record; the brief you were given is a delta of it.

## 6. Commit rhythm
First commit within minutes; commit + push every 5–10 questions; branch/land rule for this lane; report format (≤ 20 lines, ends with `HANDOFF: <branch>@<sha> · resume-first: <next>`).

## 7. This lane's known traps
≤ 8 bullets, lane-specific only (twins, garbled banks, importer quirks, id collisions).

## 8. Walls → where the answer lives
wall type → manual section (00 §n / 05 §n / SHARED-TOOLCHAIN §n / LANE-BRIEF §n).
