# 108 INT — publish checklist

This is the ordered import checklist for module 108 INT specifically, plus the
ids this module's batches assume are already live, and what is still open.
`INDEX.md` (the shared, all-module index) is unedited — read it first for the
general import-order rules and hazards; this file is the 108-specific
instantiation of them, current as of the publish-gate run recorded in
`D3-108-publish.md`.

`docs/Kasr-Source-Imports/academic/108-int-structure.md` is reference prose
(zero `# Item` records) reproducing the department book's own chapter
headings — it is not an importable batch and is not a checklist step. It is
what `module_subject` paths below are checked against by eye, not by the
importer.

## Ordered import checklist

Counts are the `created`/`updated` delta from a chained
`npm run medical:simulate` sequence, run **one kind at a time**, each step's
`--source` the previous step's `--emit`, against the 12-Aug live snapshot
(`server/data/medical-library-v1.json`). `errors: []` at every step, zero
rejects, zero "does not exist" ordering surprises. Re-run simulate before
actually importing — the live snapshot this checklist was built against ages
the moment anyone else's batch lands on `main`.

| # | File | Admin page | Created | Updated | "Update matching items" |
|---|---|---|--:|--:|---|
| 1 | `evidence/108-INT-resources.md` | Admin › Content Setup › Bulk import evidence · Resource (`/admin/library/evidence/import`, kind = Resource) | 11 | 0 | Evidence import always upserts by id — no separate toggle; equivalent to "on". |
| 2 | `article/108-INT-pathology.md` | Admin › Content Setup › Bulk Import › Library (`/admin/import/library`) | 8 | 0 | On (harmless here — nothing collides) |
| 3 | `article/108-INT-pharmacology.md` | same | 9 | 0 | On |
| 4 | `concept/108-INT-concepts-pathology.md` | Admin › Concepts › Import (`/admin/concepts/import`) | 49 | 0 | On |
| 5 | `concept/108-INT-concepts-pharmacology.md` | same | 40 | 0 | On |
| 6 | `concept/108-INT-concepts-pharmacology-updates.md` | same | 0 | 9 | **Must be On.** Every one of its 9 rows targets a concept id that was already live *before this whole bundle started* (not a same-run collision like 101's mcq/practical concept files) — see "Ids this module's batches assume already live" below. With "Create only" these 9 rows would be silently skipped, not merged. |
| 7 | `evidence/108-INT-claims.md` | Admin › Content Setup › Bulk import evidence · Claim | 89 | 0 | On (upserts) |
| 8 | `evidence/108-INT-citations.md` | Admin › Content Setup › Bulk import evidence · Citation | 159 | 0 | On (upserts) |
| 9 | `evidence/108-INT-spans.md` | Admin › Content Setup › Bulk import evidence · Span | 16 | 0 | On (upserts) |
| 10 | `relations/108-INT-relations.md` | Admin › Relationships › Import (`/admin/relationships/import`) | 156 | 0 | On — all 156 currently carry `verification_status: needs_evidence` (a claim named, no citation yet on the relation record itself); none are `verified` yet. `id` is never written; it is derived as `rel-<source>-<type>-<target>`, so re-import is idempotent either way. `medical:batch` run directory-scoped on this file alone falsely reports up to 448 "does not exist" errors for concept ids/claims/citations that are real but sit outside the directory — confirmed live (see §"medical:batch is not the gate" below); `medical:simulate` against the chained live-plus-bundle state is the only check that means anything here, and it is clean. |
| 11 | `practical/108-INT-practical.md` | Admin › Content Setup › Bulk Import › Practical (`/admin/import/practical`) | 10 | 0 | On |
| 12 | `question/108-INT-EOY-mcq.md` | Admin › Content Setup › Bulk Import › Questions (`/admin/import/questions`) | 47 | 0 | On |
| 13 | `written/108-INT-EOY-written.md` | same (written papers import as `kind: question`, format `written`, same page as MCQs) | 28 | 0 | On |
| 14 | `glossary/108-INT-glossary.md` | Admin › Glossary Import (`/admin/glossary/import`) | 79 | 0 | Glossary import always upserts by id (a matching ID updates in place; `GlossaryImportPage.tsx:12,56`) — no separate toggle, equivalent to "on". Not covered by `medical:batch`/`simulate`/`audit` at all — the only check is `node docs/import-ready/glossary/check-glossary.mjs docs/Kasr-Source-Imports/glossary/108-INT-glossary.md`, which reports `79 rows, 7 columns → clean; total problems: 0`. |

Totals: 11 resources, 17 articles (8 pathology + 9 pharmacology), 89 concepts
newly authored (49 pathology + 40 pharmacology) plus 9 already-live concepts
enriched by the updates row, 89 claims (one per new concept), 159 citations,
16 spans, 156 relations, 10 practical items, 75 questions (47 MCQ + 28
written — matches the coverage ledger's "75 distinct exam questions" exactly),
79 glossary terms. Every per-row count above was read directly off this
session's own `medical:simulate` run (`batches[].created`/`updated`), not
hand-added, and cross-checked against `grep -c '^# Item' <file>` for every
file, which matches in all 14 rows.

## `medical:batch` is not the gate, same as 101's precedent

`npm run medical:batch` was run for every file above with `--with` every
sibling concept/article file (concept-pathology, concept-pharmacology,
concept-pharmacology-updates, article-pathology, article-pharmacology). Result:
**13 of 14 files `errors: []`** (glossary has no batch branch to run). The one
exception is `relations/108-INT-relations.md`, which is directory-scoped and
cannot see `evidence/` or `concept/` siblings for its own kind:

- With no `--with` at all: 442 errors, all `Claim ... does not exist` /
  `Citation ... does not exist` — every relation's claim and citation are
  authored in `evidence/108-INT-claims.md` and `-citations.md`, files
  `medical:batch` does not scope to for a relations kind.
- Adding `--with` for both evidence files and all three concept files drops
  this to exactly **6 errors**, all `Target/Source concept ... does not
  exist`, naming three ids: `CON-IMM-7EC2CFBC19A9E9`, `CON-DER-6665EA8EA687C3`,
  `CON-NEU-7AE49F0DB2D418` (each appears twice, once per direction of a
  `contrasts_with` pair). **All three are confirmed live** — read directly out
  of `server/data/medical-library-v1.json`'s 1,718-concept graph: `CON-IMM-
  7EC2CFBC19A9E9` is "Apoptosis is a clean self-destructive death involving
  cellular shrinkage and degradation", `CON-DER-6665EA8EA687C3` is "Albinism is
  absent melanin production...", `CON-NEU-7AE49F0DB2D418` is "Amyloid is AB
  protein". `medical:batch` for a relations kind is directory-scoped, not
  live-state-scoped, and cannot resolve a real live endpoint outside its
  `--with` list — documented in `P1-gates-hazards.md` §2 as a known false
  alarm for this kind.
- The real check, `medical:simulate` chained on top of the concept/article/
  evidence steps already applied (step 10 in the table above), reports
  `created: 156, updated: 0, rejected: 0, errors: []` — every one of the 156
  relations resolves cleanly against the combined live-plus-bundle state.

## Publish gate — verbatim results

All commands run from repo root, today (2026-08-22), against HEAD `ce9ae4a`.

| Gate | Result |
|---|---|
| `npm run medical:concept-ids -- <3 concept files>` | `no rival ids`, exit 0 (the scan itself covers the whole `concept/` tree and reports rival canonical keys in 101/102/104 batches — none mention a 108 file, so the exit code is clean) |
| `npm run medical:id-stability` | `committed concept IDs unchanged for 5 modules: 101 ISK, 102 INT, 103 BMS, 104 CPS, 108 INT`, exit 0 |
| `npm run medical:presence` (108 lines) | all five `108-INT-*.md` concept/article files: `both questions answered for every field`; the run's overall exit 1 belongs to `104-CPS-mcq-concepts.md` and `102-INT-biochemistry.md`, not this module |
| `npm run medical:citations` | `10920 manifest citations..., all resolving to one of 401 sources`, exit 0 |
| `npm run medical:batch` on all 13 batch-able `108-INT-*` files, each `--with` every sibling concept/article file | 13/13 `errors: []` for every kind except relations, which is the documented directory-scope false alarm above — resolved by `medical:simulate` |
| `check-column-parsers.ts` on all 5 concept/article files | `sentinelInTextColumn: 0, blankInListColumn: 0` on every file |
| literal `"[clear]"` string grep across all 14 files | 0 hits anywhere |
| `check-glossary.mjs` on the glossary file | `79 rows, 7 columns → clean; total problems: 0` |
| `medical:simulate`, chained one kind at a time, resources → articles → concepts (pathology, pharmacology, then the 9 update rows) → claims → citations → spans → relations → practical → question → written, 10 steps, `--emit` chained | `errors: []` at every single step; 0 rejects anywhere; the concepts-pharmacology-updates step (step 6) reports exactly `created: 0, updated: 9, delta: {concepts: 0}` |
| `medical:audit -- --source <final chained emit>` | **3 total error lines, all `108`, none blocking** — see below |

### `concept/108-INT-concepts-pharmacology-updates.md` — the fix this session made

The file's nine update rows each carried a `## source_candidate_ids` block
copied forward from the live record they update. `validate-content-batch.mjs`
(since the `1014`-area corpus-candidate check landed) treats every row —
update or not — as a new concept and checks each `source_candidate_ids` entry
against `scripts/kasr/extract/108-INT/concept-candidates.json` (or wherever
the corpus candidate index for this module lives); none of the nine
`concept_<hash>` ids the update rows carried are in that index, because they
were read out of the *live* record's already-resolved candidates, not out of
a corpus scan run against this batch. Result: 11 lines of `... is not a
concept candidate the corpus contains`.

Fix: removed the `## source_candidate_ids` heading and its one value line from
all nine records — nothing else. A sparse update row carries only changed
fields; `source_candidate_ids` was not a changed field (per the file's own
comment header, the live record's candidates are untouched by any of the nine
rows), so it should never have been restated. Re-ran:

```
npm run medical:batch -- docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology-updates.md \
  --with docs/Kasr-Source-Imports/concept/108-INT-concepts-pathology.md \
  --with docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md \
  --with docs/Kasr-Source-Imports/article/108-INT-pathology.md \
  --with docs/Kasr-Source-Imports/article/108-INT-pharmacology.md
```
→ `errors: []`, `items: 9`, `fieldsUsed: 42`. Then:
```
node --experimental-strip-types scripts/simulate-content-import.mjs \
  docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology-updates.md \
  --emit /tmp/sim-108-pharm-updates.json
```
→ `created: 0, updated: 9`, `delta.concepts: 0`, `errors: []` — the correct
result; a `delta` of 9 would have meant an id failed to match and nine
duplicates were created instead.

## Audit findings — classified

Filtered to the 3 `108`-touching lines out of the whole-library audit run
against the final chained `--emit`. Classification method follows D1's: a
finding **blocks import** only if `validate-content-batch.mjs` or
`simulate-content-import.mjs` reject the record for it (neither does, for any
of these three); a finding **blocks visibility** only if the field is read by
`server/src/studentLedger.js`'s `redactItem` or the client's
`useLiveLibrary.ts` gate, both of which check exactly one thing —
`item.status === 'Published'` — and nothing else. Every 108 article currently
carries `## status\nDraft`, so **none of the three findings below change
whether a student can see anything**; visibility is a separate, deliberate
admin action (flipping `status`) untouched by this lane.

| Error class | Articles affected | Blocks import? | Blocks visibility? | Classification |
|---|--:|---|---|---|
| `article.articleData.resourceIds missing` | 17 (all — 9 pharmacology + 8 pathology) | No — not `required: true` in `IMPORT_SCHEMAS.article.fields`, never checked by `validate-content-batch.mjs` | No — not read by `publishReadiness.ts`, not in the visibility gate | **Editorial / genuine content gap.** `resourceIds` is on the audit's non-excusable `articlePopulated` list, so a `field_notes.resourceIds` note (which all 17 already carry, explaining the Kasr sources aren't in `corpus-source-index.json` and are named on the article's own `evidence_basis` prose instead) documents the gap but cannot clear the audit line — same non-excusable mechanism as 101's identical finding. Left as-is; not invented here. |
| `article.articleData.claimIds missing` | 11 (8 pharmacology + `ART-108-PAT-PATHOLOGICAL-CALCIFICATION`, `-APOPTOSIS`, `-INTRODUCTION-TO-PATHOLOGY`) | No, same reasoning | No, same reasoning | **Editorial / genuine content gap.** The other 6 pathology articles already carry real `claim_ids` (e.g. `ART-108-PAT-INTRACELLULAR-ACCUMULATIONS` carries 5) — these 11 are the ones the evidence pass (`evidence/108-INT-claims.md`, 89 claims covering the 89 *concepts*) has not yet been walked back into the *article* record. Not fabricated here. |
| `article.articleData.spanIds missing` | Same 11 as claimIds | No, same reasoning | No, same reasoning | **Editorial / genuine content gap**, same root cause and same 11 ids. |

No other audit class appears for 108 at all: `fields.Reviewer`/`fields.
Publisher`/`articleData.reviewer`/`articleData.finalPublisher` are populated
on every 108 article (`Medical team, Admin team` / `Admin team`, unlike
101 before its own fix); `microtopicId`/`nanotopicId`/`lastReviewed`/
`reviewDue`/`arabicTitle`/`aliases`/`questionIds`/`moduleIds`/`media` all
either carry a value or a correctly camelCase-keyed `field_notes` reason on
every record; `evidenceGaps` is present as an array (never omitted) on all 17
articles; no concept carries a blank `conceptIntentionalBlanks` field without
a reason. **Nothing mechanical was found to fix beyond the
`source_candidate_ids` removal above** — no stray `[clear]` sentinel, no
mis-cased `field_notes` key, no missing `evidence_gaps` array anywhere in the
108 bundle.

## Ids this module's batches assume already live

Checked the same two ways as 101: (a) sparse update-shaped records — only
`concept/108-INT-concepts-pharmacology-updates.md` qualifies, by design (see
above); (b) every concept id *referenced but not defined* across the module's
concept/article/relations files, diffed against the 89 ids the module's own
two new-concept files define and the 9 ids the updates file targets.

| id(s) | assumed live via | status |
|---|---|---|
| `CON-FND-3CC86CC26BF549`, `CON-FND-7F59EAD61B05E0`, `CON-FND-CBA2A73AE9A6D8`, `CON-FND-0D3254CF812B1A`, `CON-FND-FD53CFAE6AAC72`, `CON-FND-43BED56FA9D1E9`, `CON-FND-87C323BB0CE321`, `CON-FND-01E59D0FD26046`, `CON-FND-9D89A82094F8AA` | `concept/108-INT-concepts-pharmacology-updates.md` — the 9 update rows' `## id` | **Confirmed live** — `medical:simulate` on this file alone against the untouched live snapshot reports `created: 0, updated: 9`; a `created` count above 0 would mean any of these had drifted off-live. |
| 42 further `CON-*` ids (`CON-CVS-1A060C49C5C0C1`, `CON-DER-3076014D01EA15`, `CON-DER-6665EA8EA687C3`, `CON-DER-AE64BA2838BC30`, `CON-DEV-3C7BA246934ACE`, `CON-END-907406BCFC6CE7`, `CON-END-D6A4BA9B54463D`, `CON-END-F5DE310BFC53C5`, and 34 more across `CON-FND-`, `CON-GIT-`, `CON-GYN-`, `CON-HEM-`, `CON-IMM-`, `CON-INF-`, `CON-NEU-`, `CON-RES-` — full list in the working notes) | `related_concept_ids` on concept records, `related_concepts` on article records, and `contrasts_with`/`often_confused_with` relation endpoints in `relations/108-INT-relations.md` | **Confirmed live** — every one read directly out of `server/data/medical-library-v1.json`'s 1,718-concept graph by id. The 6 relations-batch-flagged ones (`CON-IMM-7EC2CFBC19A9E9`, `CON-DER-6665EA8EA687C3`, `CON-NEU-7AE49F0DB2D418`, each twice) are the same three named in the `medical:batch` false-alarm above. |
| `CON-FND-7650D31963FEBD` | `rejected_merge_candidate_ids` on two `108-INT-concepts-pathology.md` records ("Glycogen storage disease excess" and the fatty-liver-adjacent record), each record's own `field_notes` prose ("authored for 101 ISK... the nearest record in the repository"), and a header comment in `relations/108-INT-relations.md` naming it "live 101 ISK" | **NOT live.** It does not exist anywhere in the 1,718-concept live graph. It *does* exist, verbatim label and definition ("Glycogen is identified as red granules in liver cells after Best's carmine or PAS"), inside `concept/101-ISK-practical-concepts.md` — a batch 101's own lane has authored but which, per 101's publish-gate report, has not yet been imported. This is the same "live is a 10-day-old snapshot" hazard the operating manual warns about (§12), one layer further out: 108 assumed a *sibling module's still-pending batch* was already live. **Not a gate failure** — `rejected_merge_candidate_ids` is never checked for existence by `validate-content-batch.mjs`, `simulate-content-import.mjs`, or `audit-medical-content-fields.mjs`, so this passed every gate silently. It resolves itself the moment 101 ISK's `practical-concepts.md` is imported (which the checklist for that module already schedules before 108's concept steps in a combined import run); if 108 is imported to production *before* 101, this reference points at nothing until 101 catches up. Flagged for the orchestrator's ordering call, not fixed here — the field carries no functional weight (it only suppresses a future re-merge suggestion) and inventing a different id would be worse than leaving a forward reference. |

## What remains open

- **Images — 72 requests, none fulfilled.** Per `coverage/108-INT-coverage.md`
  (regenerated by `scripts/kasr/extract/108-INT/coverage.py`, not re-run by
  this lane): 56 of the 72 are `required` (the item cannot publish without
  one), the rest `strongly helpful`/`optional`. Counted directly off the
  batch files this session: 28 media requests embedded in
  `article/108-INT-pathology.md`, 18 in `article/108-INT-pharmacology.md`,
  10 in `practical/108-INT-practical.md` (mirrored in the standalone
  `media-requests/108-INT-practical-media-requests.md`) — 56 distinct
  `Priority:` blocks found by direct grep, matching the ledger's "56
  required" figure; the ledger's full 72 total was not independently
  re-derived here (its own generator counts differently, likely against the
  pre-triage extraction catalogue rather than the final batch files) and is
  cited from the ledger as-is. Sourcing rights-cleared images is out of scope
  for every Kasr authoring lane (agents cannot do it) per
  `docs/superpowers/specs/2026-08-22-kasr-y1-completion-design.md`
  §"Out of scope".
- **The pharmacogenomics MCQ, held back.** The 2025 paper's printed Q22 tests
  pharmacogenomics; no concept or article in this module covers it, because
  the department book itself has no section on the subject (only orientation
  ILOs 51/52 examine it — taught nowhere, tested somewhere). Its answer is
  recovered at confidence 1.00 and is not published because tagging it to a
  neighbouring concept would award mastery for material the question does not
  test. This is a faculty curriculum gap, not a programme gap — authoring a
  pharmacogenomics concept from a foreign textbook would be inventing
  curriculum the department itself doesn't teach.
- **126 department-bank questions, extracted but not clearable.** Both
  department question-bank PDFs print "For personal use only... Copyright ©
  2025. All rights reserved" — extraction is not clearance, and no stem,
  option or distractor from either file may reach a student, verbatim or
  reworded, until the rights question is settled. They remain useful only as
  private evidence of exam emphasis (which is how the 89 concepts' `exam_signal`
  fields already use them) — 0 of the 126 overlap with the four real EOY
  papers already authored, so they carry no redundant signal, only exclusive
  and currently unusable signal.
- **Typed relations — done, not open.** Listed here only to confirm it is
  *not* a gap: all 156 relations in `relations/108-INT-relations.md` carry one
  of 9 real types (`prerequisite_of` ×46, `contrasts_with` ×22, `part_of`
  ×19, `often_confused_with` ×18, `causes` ×17, `mechanism_step_before` ×12,
  `is_a` ×9, `diagnosed_by` ×7, `associated_with` ×6) — no generic
  placeholder type anywhere, and every one carries an `evidence_claim_ids`
  entry (all currently `needs_evidence` rather than `verified`, since none
  yet also names a `citation_ids` entry on the relation record itself — a
  further-evidencing pass, not a typing gap).
- **The practical atlas — 10 of at least 44 items, and the gap is real.**
  `evidence/108-INT-resources.md`'s `src_a2ffe25e8362fe840ceb`
  (`DPT BOOK Pathology Practical [INT-108].pdf`) is shelved twice in the
  manifest under two file names sharing one `sha256` — both 12 pages, printed
  page numbers 1–4 then jumping to 22–24, meaning pages 5–21 are missing
  outright and the book continues past 24 by an unknown amount. Checked the
  Telegram study-group library
  (`/Users/doitrous/Desktop/Uni Telegram Data - Organized`) and
  `scripts/telegram-library/discovery.json` per lane protocol before treating
  this as a bare fetch request: `discovery.json`'s own `199-108` record
  ("108 INT module data", `t.me/FUTUREDOCTORS_199/14`) is still marked
  `pending_discovery` — nobody has confirmed what that channel post actually
  contains. A direct filename search of the organised Telegram folder for
  `INT-108`/`INT108` finds only the two already-catalogued EOY exam PDFs
  (`Exam {INT-108} 198.pdf`, `Exam {INT-108} 198 (Solved).pdf`); no
  pathology-practical file under any `108`/`INT-108` naming was found there.
  **The gap is real and unresolved** — this is a fetch request against
  Telegram batch 199 post 14 (still `pending_discovery`), and against the
  department directly for printed pages 5–21 and everything after 24, not
  something this lane can source. Until it arrives, `practical/108-INT-practical.md`
  is a 23% sample and must not be published or counted as the module's
  practical syllabus (the ledger's own words).
- **17 articles have no `resourceIds`/`claimIds`/`spanIds` article-level
  columns filled** (see the audit table above for exactly which 11 of the 17
  are also missing `claimIds`/`spanIds`) — the 89 *concepts* all carry real
  claims and citations from the evidence pass; the *article* records were
  authored before that pass and have not been walked back through
  `apply-article-evidence.ts` (or its equivalent) the way 101's addendum did.
  Not attempted in this lane — it is a real authoring pass on 17 records, not
  a mechanical fix, and doing it without matching claim/span content per
  article risks inventing links the book text doesn't specifically support
  for that leaf.
