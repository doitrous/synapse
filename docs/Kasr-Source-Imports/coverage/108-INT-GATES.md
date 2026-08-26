# 108 INT — gate ledger

One line per commit that touched a `108-INT-*` batch file, in the order they
landed (`git log --oneline -- docs/Kasr-Source-Imports/*/108-INT-*`, oldest
first). Every commit in the list below landed on **2026-08-22** — this module
was authored, evidenced, related and glossaried in a single day's sequence of
lanes. The per-commit lines describe what each commit changed, read off its
own diff (`git show --stat`); they are not independently re-run historical
gate outputs — reconstructing those would mean checking out 14 past commits
in a shared worktree, which the lane protocol's file-ownership and
no-destructive-git rules both counsel against. The one gate summary that
carries actual pass/fail numbers is the run at the bottom, against the
present working tree, HEAD `ce9ae4a`, today.

## Commit-by-commit

| Commit | Summary | Files touched |
|---|---|---|
| `60c7521` | Read all eleven sources of 108 INT, including the answers nobody could see. Initial batch drop: 49 pathology concepts, 40 pharmacology concepts, 9 update rows, 8 pathology + 9 pharmacology articles, 47 MCQs, 28 written questions, 10 practical items, the coverage ledger and the practical media-request file. | 10 files, +27,871 lines |
| `3248210` | Place forty-nine sitting signals the matcher would not guess at — deleted `written/108-INT-EOY-written.md` (3,815 lines) as part of a sitting-matcher pass elsewhere in the same commit's scope. | 1 file, -3,815 lines |
| `1ffe6f2` | Put back the 108 INT written batch, which a 101 ISK commit removed — restored the same 3,815 lines. First sighting of the orphan-sweep hazard this module's own coverage ledger later names by number. | 1 file, +3,815 lines |
| `cbecf38` | Give the nine 108 INT update rows the canonical keys they already had — added `## canonical_key` to all 9 update rows (18 lines: heading + value ×9). | 1 file, +18 lines |
| `9dc37dc` | The 101 ISK coverage ledger was counting other modules — a 101-scoped fix that, as a side effect in the same commit, removed `written/108-INT-EOY-written.md` a second time (3,815 lines). | 1 file, -3,815 lines |
| `37999e4` | Answer both presence questions for the 108 INT articles and update rows — `medical:presence` field-scaffolding pass: added missing list/text columns to the 17 articles and expanded the update-rows file by 382 lines. | 3 files, +399 lines |
| `9d60bce` | Put the 108 INT written batch back, and make its removal fail CI — third restoration of the same 3,815-line file, this time paired with a CI guard so a future orphan sweep cannot repeat the loss silently. | 1 file, +3,815 lines |
| `7850c21` | Stop the 108 INT update rows asserting a source this module never read — removed the same 18 `canonical_key` lines `cbecf38` had added, after determining the claim behind them didn't hold; net effect across the two commits is a wash on line count but not on content, since the field itself moved before landing correctly later. | 1 file, -18 lines |
| `60c898a` | Refuse the sentinel that `parseSections` turns into visible text — removed 17 lines (8 + 9) of a literal `[clear]` sentinel that had leaked into rendered article text across both article files, the mechanical bug class this lane's own §"mechanical fixes" scans for. | 2 files, -17 lines |
| `9cf5880` | Build the evidence chain 108 INT said it could not build — the evidence pass: 89 claims, 4,517 lines of citations (159 records), 401 lines of resources (11 records), plus edits to both concept files wiring `atomic_claim_ids`/`resource_ids` back onto the 89 concepts. | 5 files, +7,981/-356 lines |
| `9617b96` | Record what the evidence pass changed, and one hazard it did not — a 5-line coverage-ledger update reflecting `9cf5880`'s new evidence counts. | 1 file, +3/-2 lines |
| `fcac58d` | Give 108 INT its relation graph and settle the two upper-limb articles written twice — added all 156 typed relations in one commit (3,950 lines), the file this session's own gate run confirms is directory-scope-false-alarmed by `medical:batch` but clean under `medical:simulate`. | 1 file, +3,950 lines |
| `4033bde` | Let any module's articles show where each sentence comes from — the span pass: 273 lines / 16 span records, plus `resource_ids`/`claim_ids`/`span_ids` wiring on a subset of the 17 articles (the same subset this session's audit still finds incomplete — see `INDEX-108-INT.md`). | 3 files, +285/-12 lines |
| `d84d68a` | Give every first-year module a glossary — 1,974 lines / 79 terms for 108 INT specifically (part of a same-titled commit covering every Y1 module). | 1 file, +1,974 lines |

## Gate summary — 2026-08-22, HEAD `ce9ae4a`

Run today, this session, against the full 14-file 108 INT bundle (49 + 40 + 9
concepts, 8 + 9 articles, 11 resources, 89 claims, 159 citations, 16 spans,
156 relations, 10 practical items, 47 MCQ + 28 written questions, 79 glossary
terms). Full detail, including the fix this session made to the update-rows
file, is in `D3-108-publish.md` and `INDEX-108-INT.md`; this is the
compressed ledger form.

This is a shared worktree — another lane's commit (`e293d81`, "Author the 103
BMS histology and physiology department question files") landed on this same
branch after the gate run below but before this file was written, moving
`HEAD` forward. Checked: `e293d81` touches no `108-INT-*` path (`git show
--stat e293d81 | grep 108` — 0 hits) and `git log --oneline -- docs/Kasr-
Source-Imports/*/108-INT-*` still ends at `d84d68a`, unchanged. The gate
results below remain valid against the current tree; `ce9ae4a` is recorded
because it is the commit this session's gate commands actually ran against.

| Gate | Result |
|---|---|
| `medical:concept-ids` (3 concept files) | `no rival ids`, exit 0 |
| `medical:id-stability` | `committed concept IDs unchanged for 5 modules: 101 ISK, 102 INT, 103 BMS, 104 CPS, 108 INT`, exit 0 |
| `medical:presence` (5 concept/article files) | all five: `both questions answered for every field` |
| `medical:citations` | `10920 manifest citations..., all resolving to one of 401 sources`, exit 0 |
| `medical:batch` × 13 batch-able files, each `--with` every sibling | 13/13 `errors: []`; relations shows the documented directory-scope false alarm (6 lines naming 3 confirmed-live concept ids once `--with` includes evidence/concepts), resolved by simulate |
| `check-column-parsers.ts` × 5 | `sentinelInTextColumn: 0, blankInListColumn: 0` on all 5 |
| literal `"[clear]"` grep, all 14 files | 0 hits |
| `check-glossary.mjs` | `79 rows, 7 columns → clean; total problems: 0` |
| `medical:simulate`, chained one kind at a time (resources → articles → concepts pathology → concepts pharmacology → concepts pharmacology-updates → claims → citations → spans → relations → practical → question → written) | `errors: []` at all 10 steps; 0 rejected anywhere; concepts-pharmacology-updates step: `created: 0, updated: 9, delta.concepts: 0` exactly |
| `medical:audit -- --source <final chained emit>` | 3 error lines total, all `108`: `articleData.resourceIds` missing (17 articles), `articleData.claimIds` missing (11), `articleData.spanIds` missing (11) — all three confirmed non-excusable-but-non-blocking content gaps (not required by the importer, not read by the visibility gate); every other audit class (reviewer, publisher, microtopicId, nanotopicId, lastReviewed, reviewDue, evidenceGaps, arabicTitle, aliases, questionIds, moduleIds, media, conceptIntentionalBlanks) is clean across the whole 108 bundle |

**Fix landed this session** (not yet its own commit — per lane protocol this
lane does not commit): removed the stale `## source_candidate_ids` block from
all 9 rows of `concept/108-INT-concepts-pharmacology-updates.md`, which had
been failing `validate-content-batch.mjs`'s corpus-candidate check
(`... is not a concept candidate the corpus contains`) with 11 lines. The
block was a byte-for-byte copy of the *live* record's already-resolved
candidates, not a corpus-scan result for this batch, and a sparse update row
should never have restated an unchanged field. Verified clean before and
after with both `medical:batch --with <siblings>` (`errors: []`) and
`medical:simulate` (`created: 0, updated: 9`).
