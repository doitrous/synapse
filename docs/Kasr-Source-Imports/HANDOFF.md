# HANDOFF — Kasr Al Ainy Year 1, orchestrator checkpoint

Written 2026-08-23 00:40 Cairo by the Year-1 orchestrator session. A fresh session
continues from this file + `scratchpad/LANE-BRIEF.md` (copy at the bottom of this
file's history if the scratchpad is gone) + `Instruction Manual for Content Creation/00-START-HERE.md` + `13-orchestration.md`.
Branch: `claude/kasr-alainy-content-report-e0ee59` (worktree `.claude/worktrees/media-library-user-hierarchy-42f2c5`). Never pushed; merge to `main` is Omar's call. Chain of command: report to the "Chief of staff — content lanes" session (address `synapse-chief-of-staff-aefa71-11`), deltas only.

## Goal
Year 1 (101 ISK, 102 INT, 103 BMS, 104 CPS, 108 INT) publishable: every banked MCQ/written item's main concept covered by an article; batch + simulate + audit + concept-ids + presence + id-stability green; per-record field floors (concept 50 / question 46 / article 49, explanation ≥ 3 sentences); 30-row sitting-year correction applied; per-module INDEX-<module>.md (click-order checklist, "Update matching items" flags, assumed-live ids, S-stage per record) and coverage/<module>-GATES.md; chained click-order simulate proven.

## Committed (HEAD 7ab418f, all on this branch)
- 101 ISK: publish gate b3e7893 + 9637c93; INDEX-101-ISK.md; relations 194/68 verified (e22c9e4, 9b5b962); spans 266; twins merged 73ef214. Coverage 258/258 under the union rule.
- 108 INT: publish gate b5f9e6d (ten-step chained simulate clean); INDEX-108-INT.md; coverage/108-INT-GATES.md; relations 156 (fcac58d).
- 102 INT: physiology concepts/articles 3ece25d; evidence 989b16e; sittings 2022 16d40c0; MCQ triage 422 MCQs 2f0e8ed; relations 150 54bd1ce.
- 103 BMS: anatomy+physiology d905b50, biochemistry 88c7550, histology 7b432ef; evidence 8107e81; written 77fa72c, e293d81; relations 324 3e683a2.
- 104 CPS: anatomy 0c87e45, histology ecb6621, physiology 1ce0d20; evidence ce09de1 + 73ce312; Baqoon-2024 0f4ed91 (HELD — not gate-clean); 64 chapter-less rows ce9ae4a; relations 305 54e8467; question/104-CPS-mcq-authored.md = the hand 40 (below per-record floor, 4 lack explanations — repair owed).
- Tooling: build-evidence per module c0a3709; build-spans 4033bde; per-module MCQ pipeline bec5510, 601b2c1, sparse updates + module books 7ab418f; gate fixes a4449a8 (merged with main's); glossary 514 terms d84d68a + ARABIC-REVIEW.md; practicals scoped 101954f (green after d82dd36).
- main merged up to d82dd36 (validator: per-record floors, `+` rules, update-row checks, practical columns, revised manual 0e08ac1).

## Landed after the first checkpoint (2026-08-23, in order)
86244b9 HANDOFF + LANE-BRIEF in tree; 7b93d83 / b885078 / ea6b17d main merges (validator 2d3c6c6, dcc6929, c255322, manual 1a9f190); 4ad6755 check-two-sided-coverage.py; a3c77f6 104 pipeline 120 MCQs / 30 concepts (0 overlap with the hand 40); 8f00ae3 presence judges sparse rows on named fields only. Stalls: every subagent died on the API stream watchdog ~00:40–01:40 (platform-wide); dispatch resumed at ≤5 concurrent once a long lane completed end-to-end.

## Running at checkpoint (uncommitted files on disk; resume = re-dispatch one task from these files, not from a transcript)
| Lane | Files on disk | Finish with |
|---|---|---|
| E1 enrichment | scripts/kasr/emit.ts (claims index in mcqBlock), src/data test | measurements before/after for 101/102/104, gates, hand-repair list |
| A2b 103 anatomy demand | concept/103-BMS-anatomy-concepts.md 51, article/103-BMS-anatomy.md 21, written/103-BMS-EOY-2025-anatomy-written-2.md 7, -2021- 7, -2022- 4 | gates; report question-backed vs chapter sets separately |
| A3b 103 histology demand | concept/103-BMS-histology-concepts.md 65, article 19, written/103-BMS-histology-department-written.md 33 | gates, report |
| B7b2 103 biochemistry papers | written/103-BMS-{EOY-2023,EOY-2024,BAQOON-2023,BAQOON-2024}-biochemistry-written.md (5/5/3/5); MCQ sections not yet; 22-row diabetes module_subject fix | remaining papers, MCQ files, gates |
| B8 104 triage | 21 leaves seeds/mcq/104-CPS/ (15 modified + 6 new); generated question/104-CPS-mcq.md, concept/104-CPS-mcq-concepts.md | rebuild, gates, addendum with full numbers |
| A1b 102 coverage | article/102-INT-coverage.md 9 articles | finish articles, coverage script → 0 uncovered, gates |

## Next, in order
1. Commit each lane's result with gate lines in the body (commit only the lane's files).
2. 104 hand-40 repair (question/104-CPS-mcq-authored.md: ≥ 3-sentence explanations, 4 missing ones, reach 46 fields) — after B8 releases the file.
3. D2 sitting-year sweep: 30 manifest rows +1 (EOY/Baqoon = batch+1827, EOM = batch+1826), rename written/question files, exam_signal/source_citation/registry/seeds/coverage lines (~600), register scripts/kasr/extract/104-CPS/eoy-2025-198.json after the collision clears; plan in scratchpad B2-sitting-years.md + CSV.
4. D4/D5/D6: INDEX-102-INT.md, INDEX-103-BMS.md, INDEX-104-CPS.md + coverage/<module>-GATES.md in the 108 template; chained click-order simulate per module; 104 Baqoon-2024 marked held until green; assumed-live ids; S-stage per record.
5. Master docs/Kasr-Source-Imports/INDEX.md: one ordered checklist (academic kau-modules.md first, then 101 → 108 → 102 → 103 → 104, glossary last); ledger per module: banked → covered by article → authored; final plain-language report to Omar (artifact "Kasr Al Ainy Year 1 Ledger", redeploy same file).
6. Telegram queue when the browser returns (order T3 solved 104 books, T5 102 Baqoon 198/199, T6 104 Baqoon 199, T4 101 EOY 197, T7 undated papers, T1 residual 108 links).

## Open rulings / needs Omar
Arabic review (glossary/ARABIC-REVIEW.md); reviewer/publisher names before status → Published; images for 52 practical stations (114 requests); which import-ready batches are already applied (for assumed-live lists); 102 "EOY 2021 physiology" treated as mistagged (upheld); the 729 untriaged 101 bank rows and the 101 EOY 2023 paper are post-publish.

## Two-sided coverage rule (2026-08-23 01:30, chief of staff)
A tested concept is covered only when the article names it in `related_concepts` AND a reader agrees it teaches it; a concept-side `article_ids` written by build-article-links.ts heuristics is not coverage. Measure with `python3 scripts/kasr/check-two-sided-coverage.py [module] [--list]`. At the time of the rule: 101 ISK 155/282 concept-side only; 102 INT 99/164; 103 BMS 2 (+14 no link, in-flight demand rows); 104 CPS 8/61; 108 INT 0/60. Two on-their-face wrong links to fix first: CON-MSK-4D7492BC85C03D, CON-MSK-888467E7C45479. Each module's verification pass reports heuristic-only → verified (back-link added) → rewired → new articles, and goes into GATES.md + INDEX as a stated check.

## Per-university traceability rule (2026-08-23 02:30, Omar via chief of staff)
Every record says it belongs to each university and year: universities `kau`, years `KAU_Y1`, module, Kasr `module_subject`, `exam_weight_by_year` keyed `KAU_Yn=`, and a `university_notes` line `kau: <paper or bank, page>` (concept + article columns; questions carry it in author_notes unless the schema gains the column). Measure with `python3 scripts/kasr/check-university-tags.py [--list]` (1b586d9). At the rule: universities/years/module/path complete except 3 rows (103) + 9 update rows (108); `university_notes kau:` missing on every generated concept/question/written record → generator change in emit.ts (queued behind enrichment) + hand-file passes per module. Correction 02:50: `university_notes` is an ARTICLE column only; concepts carry the line in `field_notes` (`universityNotes: kau: <paper or bank, page>`) until validator H3 adds the column to concept/question/practical. A sparse update row on an article/question/practical must restate `module_subject` (bulkImport computes it unconditionally; scan found 0 such rows on 2026-08-23). Importer fact: `module_subject` on an update is REPLACE-only (conceptImport.ts:194, no listDirective) — a second university must restate the full union of paths.

## Hazards learned today (all in memory + SHARED-TOOLCHAIN.md)
`+` only on list columns; an update row must restate `label` (importer blanks it otherwise); sparse rows never restate source_candidate_ids; "live" = bundle; coverage = union rule; never run build-batches without a module, never --sweep; validator skips an unknown main concept silently — always `--with` every concept file.

## Resume message to send the chief of staff
"Year-1 orchestrator resumed from HANDOFF.md at <hash>; lanes re-dispatched from checkpoint: <list>; next: <first item of 'Next'>."
