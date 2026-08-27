# 101 ISK — publish checklist

This is the ordered import checklist for module 101 ISK specifically, plus the
ids this module's batches assume are already live, and what is still open.
`INDEX.md` (the shared, all-module index) is unedited — read it first for the
general import-order rules and hazards; this file is the 101-specific
instantiation of them, current as of the publish-gate run recorded in
`D1-101-publish.md`, refreshed 2026-08-27 (glossary step added, 38-station
practical repair, `medical:batch` false-alarm note, gate re-run — see the
dated sections below).

`docs/Kasr-Source-Imports/academic/101-isk-structure.md` is reference prose
(zero `# Item` records) reproducing the department book's own chapter
headings — it is not an importable batch and is not a checklist step. It is
what `module_subject` paths below are checked against by eye, not by the
importer.

## Ordered import checklist

Counts are the `created`/`updated` delta from
`npm run medical:simulate -- <files> --emit /tmp/sim-101-publish.json` run in
this exact order against the 12-Aug live snapshot
(`server/data/medical-library-v1.json`). `errors: []` for every row. Re-run
simulate before actually importing — the "live" snapshot this checklist was
built against ages the moment anyone else's batch lands on `main`.

| # | File | Admin page | Created | Updated | "Update matching items" |
|---|---|---|--:|--:|---|
| 1 | `evidence/101-ISK-resources.md` | Admin › Content Setup › Bulk import evidence · Resource (`/admin/library/evidence/import`, kind = Resource) | 75 | 0 | Evidence import always upserts by id — no separate toggle; equivalent to "on". |
| 2 | `article/101-ISK-anatomy.md` | Admin › Content Setup › Bulk Import › Library (`/admin/import/library`) | 39 | 0 | On (harmless here — nothing collides) |
| 3 | `article/101-ISK-anatomy-2.md` | same | 9 | 0 | On |
| 4 | `article/101-ISK-histology.md` | same | 6 | 0 | On |
| 5 | `article/101-ISK-histology-2.md` | same | 12 | 0 | On |
| 6 | `article/101-ISK-histology-3.md` | same | 3 | 0 | On |
| 7 | `article/101-ISK-identification.md` | same | 6 | 0 | On |
| 8 | `concept/101-ISK-concepts.md` | Admin › Concepts › Import (`/admin/concepts/import`) | 75 | 0 | On |
| 9 | `concept/101-ISK-mcq-concepts.md` | same | 207 | 53 | **Must be On.** 53 of its 260 records share an id with a concept `concepts.md` (step 8) just created in this same run — with "Create only" those 53 rows are silently skipped instead of enriching the record. |
| 10 | `concept/101-ISK-practical-concepts.md` | same | 37 | 6 | **Must be On**, same reason — 6 of its 43 records share an id with an already-imported concept from steps 8–9. |
| 11 | `evidence/101-ISK-claims.md` | Admin › Content Setup › Bulk import evidence · Claim | 1148 | 0 | On (upserts) |
| 12 | `evidence/101-ISK-citations.md` | Admin › Content Setup › Bulk import evidence · Citation | 330 | 0 | On (upserts) |
| 13 | `evidence/101-ISK-spans.md` | Admin › Content Setup › Bulk import evidence · Span | 266 | 0 | On (upserts) |
| 14 | `relations/101-ISK-relations.md` | Admin › Relationships › Import (`/admin/relationships/import`) | 194 | 0 | On — 68 of the 194 carry `verification_status: verified` (a claim and a citation each); the other 126 are `needs_evidence` (a claim only, no citation yet) and are expected, not an error. `id` is never written; it is derived as `rel-<source>-<type>-<target>` so re-import is idempotent either way. |
| 15 | `practical/101-ISK-histology-practical.md` | Admin › Content Setup › Bulk Import › Practical (`/admin/import/practical`) | 38 | 0 | On |
| 16 | `question/101-ISK-mcq.md` | Admin › Content Setup › Bulk Import › Questions (`/admin/import/questions`) | 1661 | 0 | On |
| 17 | `written/101-ISK-BAQOON-2022-written.md` | same (written papers import as `kind: question`, format `written`, same page as MCQs) | 14 | 0 | On |
| 18 | `written/101-ISK-BAQOON-2023-written.md` | same | 13 | 0 | On |
| 19 | `written/101-ISK-BAQOON-2024-written.md` | same | 16 | 0 | On |
| 20 | `written/101-ISK-EOY-2022-written.md` | same | 14 | 0 | On |
| 21 | `written/101-ISK-EOY-2024-written.md` | same | 17 | 0 | On |
| 22 | `written/101-ISK-EOY-2025-written.md` | same | 16 | 0 | On |
| 23 | `written/101-ISK-FORMATIVE-2025-written.md` | same | 10 | 0 | On |
| 24 | `glossary/101-ISK-glossary.md` | Admin › Glossary Import (`/admin/glossary/import`) | 104 | 0 | Glossary import always upserts by id (a matching ID updates in place; `GlossaryImportPage.tsx:12,56`) — no separate toggle, equivalent to "on". Not covered by `medical:batch`/`simulate`/`audit` at all — the only check is `node docs/import-ready/glossary/check-glossary.mjs docs/Kasr-Source-Imports/glossary/101-ISK-glossary.md`, which reports `104 rows, 7 columns → clean; total problems: 0`. |

Totals: 75 resources, 75 articles, 319 concepts (of which 59 are
update-in-place against this module's own earlier steps, not against
anything outside the bundle — see below), 1148 claims, 330 citations, 266
spans, 194 relations, 38 practical items, 1761 questions (1661 MCQ + 100
written across 7 papers), 104 glossary terms. Every figure in this
paragraph and in the per-row table above was re-verified this pass by a
chained `medical:simulate` run, one kind at a time, each step's `--source`
the previous step's `--emit`, against the current tree — `errors: []` and
zero rejects at every one of the 11 steps (articles run together, the three
concept files run together, the seven written files run together; every
other kind is its own step) — cross-checked against
`grep -c '^# Item$' <file>` (one universal record delimiter across every
kind including relations, which omits `## id`), which matches on every row.
The glossary row was added to this checklist in this pass — it existed on
disk before but had never been added to the ordered import list.

`medical:audit` (steps' cumulative field-presence check) is **not** wired
into the import wizard or into CI (`.github/workflows/content.yml` never
calls it, `server/src` never calls it) — a red audit does not block any step
above. See `D1-101-publish.md` §6 for exactly which of its ~305 (now 10)
open findings are cosmetic and which one was a real data bug.

**Addendum**: all 75 articles now carry `## resource_ids` / `## claim_ids` /
`## span_ids` columns (previously absent as columns entirely, not just
blank — the root cause of `apply-article-evidence.ts` filling nothing).
44 of the 75, the ones named in `scripts/kasr/extract/101-ISK/article-evidence.json`,
now carry real values: `resource_ids` = `src_b1e6dc481eaf337268d0` (the
department book — every one of this module's 330 citations resolves to
that single resource, so "an article's claims/spans cite the book" and "an
article's claims/spans exist at all" are the same condition here) and
`claim_ids`/`span_ids` filled by re-running `apply-article-evidence.ts`.
The other 31 stay `[clear]` on all three, honestly — they have no evidence
pass yet. This dropped the audit's `resourceIds`/`claimIds`/`spanIds`
missing-lines from 75 each to 31 each (see `D1-101-publish.md` §8); the
totals and delta counts in the table above are unchanged (no records were
added or removed — this was a column addition and fill, not a re-import
shape change).

## `medical:batch` is not the gate, same as 108's precedent

Re-verified this pass. `question/101-ISK-mcq.md` run standalone with
`medical:batch --with` the three concept files reports 19 `main concept X is
not covered by any article in library_ids` errors, all against six concepts
whose `article_ids` are set by a `+`-append sparse update row in
`concept/101-ISK-mcq-concepts.md` (e.g. `## article_ids` / `+ART-101-HIS-
CONNECTIVE-TISSUE-FIBRES | +ART-101-HIS-MICROTECHNIQUES`). The batch
validator's `foldInSiblings` helper merges that column with a plain
`.split('|').trim()` and does not strip the leading `+`, so the concept's
simulated `articleIds` array in this standalone check literally contains
`"+ART-101-HIS-CONNECTIVE-TISSUE-FIBRES"` — which never matches a question's
plain `library_ids` value naming the same article without the `+`. Confirmed
by instrumenting a scratch copy of the validator (not committed): the article
really is linked (`concept.articleIds` in the real chained state is fully
resolved), and the chained `medical:simulate` run for the question step
(after concepts have actually been imported through the real importer, which
does strip `+`) reports `errors: []` for all 1661 records, 0 rejects. Same
class of false alarm as 108's directory-scoped relations file — a
`--with`-based standalone check approximates real import order and can be
wrong where a sparse update row's `+`-append syntax is involved;
`medical:simulate` chained is the check that means anything.

## Practical repair — 38/38 stations, done this pass

`practical/101-ISK-histology-practical.md`'s 38 "Lab interpretation" stations
were below the format's 17-column floor (thinnest 14) and all 38 set
`media_needed` with no `media_recommendations`, per Validator E (`dcc6929`).
Fixed by hand (this file carries no `Generated by` header — it is not
generator output): added `status: Draft`, `owner: Claude` and `duration: 5`
to every station (14/15 → 17/18 columns), and renamed every `## media_needed`
heading to `## media_recommendations` — same block content, the canonical
field name `bulkImport.ts` aliases for practicals (`media_recommendations ||
media_needed`) and the one `completenessWarnings` actually checks for.
Re-validated: `medical:batch` on the file (`--with` the three concept files)
now reports `"warnings": []` (previously two warnings, both above) with
`"errors": []` unchanged, `items: 38`, `questions: 74`.

**Media flag, per the chief-of-staff's standing ruling.** All 38 stations
carry `media_recommendations` with `Priority: required` (the histology
plates each station is built around) and the repository holds zero images.
Import the file — the gates above are clean and nothing here blocks
import — but every one of these 38 records must stay `status: Draft` after
import until Omar adds the media via the Media Requests page
(`/admin/library/media`); do not flip any of the 38 to `Published` on the
strength of these gates alone. Flagged in the import-ready INDEX's 101 ISK
section as "import but keep Draft until media added".

## Ids this module's batches assume already live

Checked two ways: (a) grepped every 101 concept/article/evidence/relations/
question/practical/written file for a sparse update-shaped record — `## id`
plus five or fewer other fields, the shape a targeted update row takes.
**None exist anywhere in the 101 bundle** — every record in every file is a
full, freshly-authored record, not a partial patch against something
assumed to already be on the server. (b) collected every concept id
*referenced* (not defined) across the module's articles, evidence and
relations, and diffed it against the 319 ids the module's own three concept
files define.

| id | assumed live via | how it's used |
|---|---|---|
| `CON-HEM-7EBD069E615270` | `concept/101-ISK-practical-concepts.md` (its `conflicts` field) and `article/101-ISK-identification.md` (its `conflicts` field) | Named in prose only — "CON-HEM-7EBD069E615270 in the live concept graph states that fat cells are the largest cells in bone marrow" — flagging a disagreement with a megakaryocyte-identification concept this module does author. `conflicts` is a text column, not an id-list column, so nothing resolves or fails against it at import time; it is a human-readable cross-reference. Confirmed live in the 12-Aug snapshot (`status: under review`, `id: CON-HEM-7EBD069E615270`, label "Fat cells are the largest cells in bone marrow"). |

No sparse concept-graph dependency beyond that one prose mention.

**The 47 live-but-unindexed legacy resources** (`scripts/kasr/check-citations.ts`'s
documented false-alarm list) are **not** touched by this module at all — checked
every `src_…` cited anywhere under the six kinds above (75 distinct ids) against
both the 101 manifest and the legacy-live set: all 75 resolve to 101's own 76-row
manifest (`manifest/kasr-y1-sources.json`), zero resolve only via the legacy list.
This module doesn't inherit anyone else's orphaned resource id.

## Explanation enrichment — verified done, not re-done

Sized before touching anything: `medical:batch` on `question/101-ISK-mcq.md`
reports, across all 1661 records, correct-answer explanation `shortest 150
chars, median 402; 1% under 200 chars, 0% under 3 sentences`, and 0 questions
with no correct-answer explanation at all. Only 16 records sit under 200
chars, and every one of those 16 still clears the 3-sentence floor (checked
individually). This matches the enrichment pass already landed for 101
(BOARD.md, 2026-08-23 ~05:25: median 145→402 chars, ≤2-sentence 92%→0.8%,
none empty) — well under the 60-record threshold for a fresh enrichment pass,
so none was done this pass; there is nothing left to enrich.

## Gate run — this pass (2026-08-27)

`medical:concept-ids`, `medical:id-stability`, `medical:citations`,
`medical:presence` (concept+article files), `check-column-parsers.ts` (all 24
101 batch files, run individually — 0 `sentinelInTextColumn` / 0
`blankInListColumn` on every one), and `check-glossary.mjs` all clean. The
chained `medical:simulate` (11 steps, order above) is `errors: []` throughout,
0 rejects.

**Reviewer / final publisher, closed this pass.** The chief-of-staff's
standing ruling — `reviewer: Medical team, Admin team` /
`final_publisher: Admin team` are the FINAL values, same as 108 INT — was
applied to all 75 articles (all six `article/101-ISK-*.md` files), replacing
the absent field with the ruled value and dropping the now-contradictory
`reviewer:`/`finalPublisher:` `field_notes` excuse lines (74+1, one file's
first record needed a second pass after an off-by-one in the batch script).
Re-verified: `## reviewer` / `## final_publisher` present on all 75 records
in both `docs/Kasr-Source-Imports/article/` and the staged
`docs/import-ready/article/` copies (byte-identical), 0 leftover
`reviewer:`/`finalPublisher:` field_notes lines, `medical:batch` still
`errors: []` on every file. `status` stays `Draft` regardless — this closes
the *reviewer/publisher* gate only; Omar still flips `Published` by hand.

`medical:audit` against the final chained `--emit` (post-reviewer-fix): 131
error lines (down from 135), all pre-existing and already documented
elsewhere in this file or in `coverage/101-ISK-GATES.md` — 126 are the
already-known 126/194 `needs_evidence` relations (row 14 above), 5 are
aggregate lines naming the 31 articles still missing
`resourceIds`/`claimIds`/`spanIds`/`evidenceBasis`/`notes` (the unstarted
claim/span evidence pass, listed below). `Reviewer`/`Publisher` no longer
appear anywhere in `articleMissing` — confirmed by inspecting the audit JSON
directly. `conceptMissing` and `conceptFieldsAbsent` are both empty — 0
concept-level audit findings. None of these 131 lines are rejected by
`validate-content-batch.mjs` or `simulate-content-import.mjs` (the two
together are the actual import gate), and none are read by the visibility
gate (`status === 'Published'`, and every 101 record is `Draft`) — same
classification method 108's gate ledger used.

## What remains open

- **3 concepts, permanently concept-side-only, pending an Omar ruling.**
  `check-two-sided-coverage.py "101 ISK"` reports 279/282 two-sided, 3
  concept-side-only (`CON-FND-0D6F0DC6CBAD60` proteasome vs lysosome,
  `CON-FND-25C25E4FA62811` necrosis vs apoptosis,
  `CON-FND-14D80DE53DE835` neuron classification) — see
  `coverage/101-ISK-GATES.md`'s BLOCKED section for the full page-by-page
  confirmation that the assigned histology source book does not teach any
  of the three. Needs either a pointer to a different department book/page
  range, or a ruling to leave them concept-side-only permanently as
  MCQ-bank-only material.
- **Images.** The repository holds zero medical images. Every 101 article
  carries its plates as `image_recommendations` blocks (a human sourcing
  queue), not as attached media — `field_notes.media` on every record says so
  explicitly. Sourcing rights-cleared images was scoped out of every Kasr
  authoring lane as work agents cannot do (`docs/superpowers/specs/2026-08-22-kasr-y1-completion-design.md`
  §"Out of scope"). 114+ media requests are logged in
  `media-requests/media-audit.md` across the whole programme; this module's
  share has not been separately counted here.
- **729 untriaged MCQ bank rows.** The 30 department MCQ books were
  deduplicated to 2,947 distinct questions by the extraction pipeline, then
  hand-triaged leaf by leaf into `scripts/kasr/seeds/mcq/*.ts` (43 leaf
  files, 737 answer-key overrides, each with a written reason). 729 of the
  bank's rows were never triaged that way — a gap the generated file's own
  header does not surface. They are not represented in
  `question/101-ISK-mcq.md`'s 1661 records. (Source: `docs/superpowers/specs/2026-08-22-kasr-y1-completion-design.md`, "The diagnosis".)
- **The EOY 2023 paper.** `EOY 196 ISK 101 - WRITTEN 2023 (3) (1).pdf`
  (`src_ef2104d4eaede4fa1356`, manifest `examType: EOY`, `examSittingYear:
  2023`) was read in full — the coverage ledger records "10 written, 11
  authored records" against it — but no written batch in
  `written/101-ISK-*.md` cites `src_ef2104d4eaede4fa1356` anywhere (checked
  by grep across all seven files: zero hits). The eleven records the ledger
  claims are not findable in any current 101 batch under this source id.
  Either they were folded into another paper's file under a different
  citation (unverified) or the ledger figure is stale and the paper was
  never actually authored. This needs a human decision: re-author the
  EOY 2023 paper as its own `written/101-ISK-EOY-2023-written.md`, or
  correct the ledger if the eleven records genuinely live elsewhere.
- **Telegram study-group material.** Per the lane protocol
  (`P1-gates-hazards.md` §"Missing source material"), a gap in the manifest
  or page cache should first be checked against
  `/Users/doitrous/Desktop/Uni Telegram Data - Organized` and
  `scripts/telegram-library/discovery.json` before being logged as a fetch
  request. **101 ISK's own manifest coverage is already complete** — the
  coverage ledger reports 75 of 75 source files read in full, with none
  capped and none unread — so there is currently no known Telegram-sourced
  gap specific to this module. This bucket is listed for completeness
  against the general protocol, not because a specific 101 shortfall was
  found.
- **`relatedConceptIds` on 11 articles.** Genuine content gap, not
  mechanical: `ART-101-HIS-CONNECTIVE-TISSUE-FIBRES`, `-MICROTECHNIQUES`,
  `-MICROSCOPES`, `-HAEMOPOIESIS`, `-NON-GRANULAR-LEUKOCYTES`,
  `-RED-BLOOD-CORPUSCLES`, `ART-101-ANA-NERVOUS-SYSTEM`,
  `-LYMPHATIC-SYSTEM`, `-CARDIOVASCULAR-SYSTEM`, `-SKELETAL-SYSTEM`,
  `-INTRODUCTION` carry no related-concept links (five are survey/overview
  leaves that may genuinely have none; six of the histology ones plausibly
  should). Needs a person to check each against the book and either link
  real concept ids or record why none apply — not invented here, per the
  "never fill from model knowledge" rule. See `D1-101-publish.md` §6 for the
  full audit accounting.
- **`ART-101-ANA-AXILLA-BREAST`'s `evidence_basis` and `notes`.** The only
  article record missing these two columns outright (every other 101
  article has them). Needs the same page-cited authoring the other 74
  records already carry — not fabricated here.
- **31 articles have no claim/span evidence pass yet** (`resource_ids`,
  `claim_ids`, `span_ids` all honestly `[clear]`): `ART-101-ANA-FOREARM`,
  `-INTRODUCTION`, `-SKELETAL-SYSTEM`, `-CARDIOVASCULAR-SYSTEM`,
  `-LYMPHATIC-SYSTEM`, `-NERVOUS-SYSTEM`, `-CARTILAGINOUS-JOINTS`,
  `-DECIDUA`, `-HAND-ARTERIES`, `-CHORIONIC-VILLI-PLACENTA`,
  `-IMPLANTATION`, `-UMBILICAL-CORD`, `-CLAVICLE`, `-BRACHIAL-ARTERY`,
  `-BRACHIAL-PLEXUS-INJURIES`, `-FOREARM-RETINACULUM-ROTATION`,
  `-SYNOVIAL-JOINTS`, `-PARAXIAL-MESODERM`, `-AMNIOTIC-FLUID`,
  `-CUBITAL-FOSSA`, `-SCAPULAR-ANASTOMOSIS`,
  `ART-101-HIS-RED-BLOOD-CORPUSCLES`, `-NON-GRANULAR-LEUKOCYTES`,
  `-HAEMOPOIESIS`, `-MICROSCOPES`, `-MICROTECHNIQUES`,
  `-CONNECTIVE-TISSUE-FIBRES`, `-MEMBRANOUS-SPECIALISATIONS`,
  `ART-101-HIS-ID-NUCLEUS`, `-ID-LYMPHOCYTE-VERSUS-MONOCYTE`,
  `-ID-CONNECTIVE-TISSUE-FIBRES`. Needs a `build-evidence.ts`/
  `build-spans.ts` pass that actually finds citable department-book text
  for these leaves (or a `field_notes` reason per field if the book
  genuinely doesn't support one) — not something to fill with `[clear]`
  reasons invented here.
