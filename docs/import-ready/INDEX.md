# Ready to import

Everything here has been validated and is waiting for a human to apply it through the admin
import pages. **Nothing here has been imported.**

Each file is already in its importer's format. Open the page named in the table below,
choose the file, review the preview, and commit.

Authoring rules live in
[`Instruction Manual for Content Creation/`](../../Instruction%20Manual%20for%20Content%20Creation/00-START-HERE.md).

---

## One folder per import page

The folder tells you which admin page to open. That is the whole point of the split — a
filename alone never did.

| Folder | Admin page | Files | Records |
|---|---|---:|---:|
| [`academic/`](academic/) | Academic setup › Import | 2 | 54 |
| [`concept/`](concept/) | Concepts › Import | 31 | 1111 |
| [`article/`](article/) | Bulk import → **article** | 29 | 220 |
| [`question/`](question/) | Bulk import → **question** | 35 | 2704 |
| [`practical/`](practical/) | Bulk import → **practical** | 36 | 200 |
| [`relations/`](relations/) | Relationships › Import | 3 | 500 |
| [`evidence/`](evidence/) | Bulk import evidence · Resource/Claim/Citation/Span | 47 | 2981 |
| [`subjects/`](subjects/) | Taxonomy › Import | — | — |
| [`glossary/`](glossary/) | Glossary › Import | 7 | 480 |
| [`resource/`](resource/) | Bulk import → **resource** | — | — |

The empty folders are not oversights — they are the shape of the work that has not been
done yet. The relationship graph in particular holds 1,718 concepts and only 47 edges.

---

## Import order

Apply the folders in this order. Later kinds reference earlier ones, and importing out of
order leaves records pointing at things that do not exist yet.

```
academic → resource → article → concept → evidence (claims, then citations, then spans)
                   → relations → practical → question
```

`academic` comes first because it creates the modules everything else can be scoped to. It
is also the only folder here that is not medical content, so it does not go through
`medical:simulate` — see below.

Within a folder, file order does not matter.

---

## What is here now

### Kasr Al Ainy modules — `academic/`, 1 file, 31 modules

Years 1 to 5, as the faculty lists them. Apply at **Academic setup › Import** with **KAU**
selected as the target university; the importer merges into whatever that university already
has rather than replacing it, so applying it twice would create a second copy of every
module.

Module names are the faculty's own labels — `104 CPS`, `PEDS` — not expansions of them.
Guessing at what the letters stand for would put a title on a student's screen that nobody
at the school wrote, and Academic Setup can rename any of them once the full titles are to
hand. `314` and `319` arrived without a subject code; their titles — Community Medicine and
Forensic Medicine — were supplied by the faculty and are recorded under those codes.

Module IDs in years 4 and 5 carry a year suffix (`SURG 4`, `SURG 5`) because those years
repeat SURG, IM and FM between them and a module ID is unique across the whole university.
Without the suffix the importer silently renames the second one to `SURG-2`, which is an ID
no student would recognise.

Terms are all `Term 1`, which is the importer's default and means "no term was recorded" —
not a claim that every module runs in the first term.

This folder is **not** covered by `medical:simulate` or `medical:audit`; those read medical
content batches. Review it in the import wizard's own preview instead.

### Alexandria University modules — `academic/`, 1 file, 23 modules

Years 1 to 3, taken from the corpus folder names under `y1/`, `y2/`, `y3/`
(`/Users/doitrous/Desktop/Alexandria University/`). Apply at **Academic setup › Import**
with **AU** selected as the target university; the importer merges into whatever that
university already has rather than replacing it, so applying it twice would create a
second copy of every module — the same hazard the Kasr Al Ainy folder above documents.

**Module id scheme (ruled 2026-08-22, chief of staff):** module ids are global bare strings
in this codebase — nothing cross-checks a `module_id` against which university it belongs
to — so a bare faculty code like `MED 102` could collide with any other university that
prints the same one. Every id here is `AU-<CODE>`, uppercase with hyphens and no spaces
(`AU-MED-102`, `AU-UNI-104`, `AU-E-304`); the faculty's own code stays visible in the module
*name* instead, as `"<CODE> — <title>"` (e.g. `"MED 102 — Foundation of Basic Medical
Sciences & Medical Terminology"`). See `docs/Alexandria-Source-Imports/academic/au-modules.md`'s
leading comment for the full rationale.

Unlike the Kasr Al Ainy file, every row here carries a real term. The faculty's 2023
bylaws (`اللائحة الداخلية برنامج بكالوريوس الطب و الجراحة2023.pdf`, transcribed in
`docs/Alexandria-Source-Imports/academic/bylaws-2023-extract.md`) state a semester for
every module in Years 1–3, so `Term 1`/`Term 2` here means the bylaws' own first or second
semester of that year (Level I–III, Semesters 1–6) — not the importer's silent default.

Titles are the corpus's own label — where the bylaws spell a module differently (a `&`
where the corpus has `and`, a capitalisation difference, "Endocrines" vs "Endocrine"), the
corpus form is what this batch carries; the bylaws title is recorded as evidence in the
same source doc, not substituted in. No module code disagrees between the two sources.

This folder is **not** covered by `medical:simulate` or `medical:audit` either; it was
dry-run against the importer's own parser instead (`ImportWizard.tsx`'s `parseMarkdown` +
`AcademicImportPage.tsx`'s field list) — see
`docs/Alexandria-Source-Imports/academic/README.md` for the check and its result.

### Cardiovascular practical bank — `practical/`, 34 files

| Type | Items |
|---|---:|
| OSCE station, with actor briefs | 12 |
| Skills checklist | 8 |
| Clinical case | 21 |
| Lab interpretation | 12 |
| Imaging interpretation | 12 |

Lands as `Draft`. Nothing reaches a student until you publish it. Renal and respiratory
banks are in the same folder, prefixed `SYS-REN-` and `SYS-RES-`.

**Around 85 media requests arrive with these**, and they appear at
**Library Setup → Media requests** classified by medium and genre. Roughly two-thirds are
`required`, meaning the item cannot publish until the asset exists.

### Cardiovascular concepts — `concept/`, 13 files

Topics 2–9, plus renal and respiratory dedup, move and repair batches.

> **IDs rewritten to `CON-` on 2026-08-15.** These records previously carried
> `med.concept.*` IDs, which matched nothing in live state and would have opened a second ID
> namespace inside one graph. All 226 pending concept IDs — 128 here plus 98 in
> `docs/medical-library-program/batches/` — were rewritten to
> `CON-<SYSTEM>-<14 hex>`, derived deterministically from each record's `canonical_key`, with
> every reference in every article, question, practical, relation and claim batch updated to
> match. 1,076 occurrences across 62 files. Verified: 0 collisions against live state, 0
> broken references, every batch validates clean, and `medical:simulate` applies all of them
> with 0 errors and 0 rejected.

**`field_notes` completed on 2026-08-15.** Every one of the 128 new cardiovascular concepts
now carries a stated reason for each field it leaves blank — `moduleIds`, `microtopicId`,
`nanotopicId`, `approvedFileResourceIds`, `approvedVideoResourceIds` and
`sourceCandidateIds`, **768 entries** added across the eight `SYS-CVS-CONCEPT-T0*.md` files.
Auditing the simulated set fell from **942 errors to 174**, and
**zero blank-without-reason errors remain on any new record.**

### What is still outstanding, and why

| Count | What | Owner |
|---:|---|---|
| 188 | Fields on the **REN/RES update records** reported blank or emptied | a code bug, not authoring |
| 1,314 | Fields on **new** records that need a real value, not a note | authoring |
| **0** | broken references | — |

**The 188 are not an authoring gap and were deliberately left alone.** The five
`SYS-REN-*` / `SYS-RES-*` concept files are *updates* to concepts that are already live, and
those live records **do** carry the values the audit reports as missing. They are being
destroyed on import by `materialiseNewConcept`, which runs over update rows and nulls
whatever the row does not restate:

```
CON-REN-29ED086AF129A6
  lastReviewed           live "2026-08-11"              -> null
  resourceOccurrenceIds  live ["OCC-387066FDBD7410"]    -> null
```

Writing a `field_notes` entry saying "no review date exists" would be false, and would hide
real data loss behind a green audit. The fix belongs in the importer.

**Values filled on 2026-08-15 — 621 of the 1,314.** Everything derivable without inventing
data now carries a value:

| Filled | Field | How it was derived |
|---:|---|---|
| 128 | `blueprintWeight` | mean of that record's own hand-authored `exam_weight_by_year` (0.75–0.95) |
| 128 | `clinicalRelevance` | rubric by `concept_type` — see below |
| 128 | `academicRelevance` | rubric by `concept_type` |
| 128 | `confidence` | `0.7` — authored from authoritative texts, not independently verified |
| 43 | `concept.relatedArticleIds` | articles whose prose actually contains the concept's label or an alias |
| 8 | `article.relatedArticles` | articles sharing at least one concept |
| 58 | `article.notes` | internal note recording the deferred evidence pass |

The relevance rubric, which is an editorial default and easy to override:

| `concept_type` | clinical | academic |
|---|---:|---:|
| `clinical_principle`, `clinical_consequence` | 0.90 | 0.85 |
| `classification` | 0.75 | 0.95 |
| `definition` | 0.70 | 0.95 |
| `pathophysiological_mechanism` | 0.70 | 0.90 |

`blueprintWeight` deliberately uses the per-year weights already authored on each record
rather than a fresh judgement, so it reflects the original author's intent. Note the result
(0.75–0.95) sits above every live concept (0.58–0.76), because live values are uniform
pipeline defaults on T01 anatomy while these are hand-weighted clinical topics.

### The remaining 693 cannot be filled from anything in this repo

| Count | Field | Why not |
|---:|---|---|
| 128 | `concept.resourceIds` | no source in the evidence store teaches these nodes |
| 128 | `concept.atomicClaimIds` | the claims do not exist — deferred evidence pass |
| 128 | `concept.originalWording` | "the source's own words", and there is no source to quote |
| 58 | `article.resourceIds` · `claimIds` · `spanIds` (×3) | same evidence chain |
| 85 | `concept.relatedArticleIds` | no article mentions the concept |
| 50 | `article.relatedArticles` | shares no concept with any other article |

**The corpus was checked and does not cover this material.** All 44,454 extracted statements
across the 20 cardiovascular corpus sources were compared against the 128 concepts: **zero
strong matches, four moderate.** The concepts' own `field_notes` were right — *"No processed
corpus source teaches this node; authored from authoritative texts under LD-14."*

Filling those fields therefore needs one of:

1. **New sources** ingested as resources, then a real claim/citation/span pass against them.
2. **A contract change** — `resourceIds`, `atomicClaimIds`, `originalWording` and
   `relatedArticleIds` sit in the audit's *must carry a value* list (`conceptPopulated` in
   `scripts/audit-medical-content-fields.mjs`). For content authored before its evidence pass,
   three of those four cannot exist by definition. Moving them to *must be present, may be
   blank with a reason* would let an honest pre-evidence concept pass.

Guessing them would be fabricated provenance, which is the one failure the manuals exist to
prevent. Nothing here blocks import: all batches validate clean and `medical:simulate`
applies the whole set — 128 concepts, 58 articles — with 0 errors and 0 rejected.

### Cardiovascular articles — `article/`, 8 files
### Cardiovascular questions — `question/`, 10 files

Topics 2–9. Questions reference the concepts in `concept/`, so that folder goes first.

---

### Kasr Al Ainy 108 INT (Pathology + Pharmacology) — 14 files across 7 folders

Staged 2026-08-27, first Kasr Al Ainy module content to reach this folder (the
`academic/kau-modules.md` row for `108 INT` was already here). Copied verbatim
from `docs/Kasr-Source-Imports/{evidence,article,concept,relations,practical,
question,written,glossary}/108-INT-*` — no hand edits, per lane protocol.
Full detail — commit-by-commit history, the `medical:batch` relations
false-alarm, the audit's 3 editorial findings, ids this module assumes are
already live, and what remains open — is in
`docs/Kasr-Source-Imports/INDEX-108-INT.md` and
`docs/Kasr-Source-Imports/coverage/108-INT-GATES.md`; this entry states only
the apply order and current status.

**Apply in this order** (each step's ids are referenced by the next; the
generic order above already matches this):

| # | File | Admin page | Records | "Update matching items" |
|---|---|---|--:|---|
| 1 | `evidence/108-INT-resources.md` | Bulk import evidence · Resource | 11 | on (evidence always upserts) |
| 2 | `article/108-INT-pathology.md` | Bulk import → article | 8 | On |
| 3 | `article/108-INT-pharmacology.md` | Bulk import → article | 9 | On |
| 4 | `concept/108-INT-concepts-pathology.md` | Concepts › Import | 49 | On |
| 5 | `concept/108-INT-concepts-pharmacology.md` | Concepts › Import | 40 | On |
| 6 | `concept/108-INT-concepts-pharmacology-updates.md` | Concepts › Import | 9 | **Must be On** — every row targets a concept id already live before this bundle; with "Create only" these 9 rows are silently skipped, not merged |
| 7 | `evidence/108-INT-claims.md` | Bulk import evidence · Claim | 89 | On |
| 8 | `evidence/108-INT-citations.md` | Bulk import evidence · Citation | 159 | On |
| 9 | `evidence/108-INT-spans.md` | Bulk import evidence · Span | 16 | On |
| 10 | `relations/108-INT-relations.md` | Relationships › Import | 156 | On — `medical:batch` run directory-scoped on this file alone falsely flags 3 concept ids (×2 directions) as missing; confirmed live in `server/data/medical-library-v1.json`, and `medical:simulate` chained on top of the concept/evidence steps above resolves clean |
| 11 | `practical/108-INT-practical.md` | Bulk import → practical | 10 | On |
| 12 | `question/108-INT-EOY-mcq.md` | Bulk import → question | 47 | On |
| 13 | `question/108-INT-EOY-written.md` | Bulk import → question (format: written, same page) | 28 | On |
| 14 | `glossary/108-INT-glossary.md` | Glossary › Import | 79 | Glossary import always upserts by id |

**Gate status, re-run 2026-08-27 against this staged copy plus the rest of
`docs/import-ready/`:** `medical:simulate` chained one kind at a time,
resources → articles → concepts (pathology, pharmacology, then the 9 update
rows) → claims → citations → spans → relations → practical → question →
written — `errors: []` at every step, 0 rejected, the updates step reporting
exactly `created: 0, updated: 9`. `npm run medical:simulate -- "docs/import-
ready/"*/*.md --emit ...` over the **whole combined folder** (108 INT plus
every pre-existing CVS/REN/RES batch) also comes back `errors: []`, 84
batches applied. `medical:batch` on all 12 batch-able files (`--with` every
108 sibling concept/article file) is 12/12 `errors: []`; relations shows the
same documented directory-scope false alarm, resolved by simulate.
`medical:audit` against the combined emit: only the same 3 pre-existing
editorial-gap classes fire for 108 (`articleData.resourceIds` missing on all
17 articles, `claimIds`/`spanIds` missing on 11 of them) — none block import
or visibility (every 108 article carries `status: Draft`); no reviewer or
publisher finding appears — every 108 article already carries `reviewer:
Medical team, Admin team` and `final_publisher: Admin team`.

**Two items recorded as open blockers before this staging turned out to
already be resolved in the batch content itself:**

- *Practical "scope columns."* `docs/chief-of-staff/BOARD.md`'s "needs" note
  predates commit `101954f` ("Scope all 52 practical stations to Kasr Al
  Ainy Year 1", 2026-08-22 21:04), which already added `universities: kau`,
  `years: KAU_Y1` and `module: 108 INT` to all 10 stations. Verified present
  and correct on every station in this copy; the board note is stale, not a
  real gap.
- *Reviewer/publisher names.* Every article already carries `reviewer:
  Medical team, Admin team` and `final_publisher: Admin team` (added before
  `b5f9e6d`, the gate-clean commit); `medical:audit` raises no reviewer or
  publisher finding for 108. **Still owed to Omar:** whether "Medical team,
  Admin team" / "Admin team" are the actual names to carry when status
  flips Draft → Published, or placeholders he wants replaced with real
  people — this is logged as an open ruling in
  `docs/Kasr-Source-Imports/HANDOFF.md` ("Open rulings / needs Omar") and is
  a publish-policy decision, not a gate failure; nothing here was changed
  to guess at it.

**What remains genuinely open** (unchanged from `INDEX-108-INT.md`, not
addressed by this staging pass): 56 of 72 image requests are `required` and
unfulfilled (sourcing is out of scope for this lane); the practical atlas is
a confirmed 23% sample (10 of at least 44 stations — pages 5–21 of the
source PDF are missing and a Telegram fetch request is still
`pending_discovery`) and must not be counted as the module's full practical
syllabus; the 2025 paper's pharmacogenomics question is held back (no
concept/article covers a topic the department book itself doesn't teach);
126 department-bank questions are extracted but not rights-cleared for
publication. None of these block the 14 files above from being applied —
they are content-completeness gaps the module already discloses, not
import-time errors.

---

---

### Kasr Al Ainy 101 ISK (Histology + Anatomy) — 24 files across 7 folders

Staged 2026-08-27, same pass and same layout as 108 INT above. Copied
verbatim from `docs/Kasr-Source-Imports/{evidence,article,concept,relations,
practical,question,written,glossary}/101-ISK-*` — no hand edits except the
practical file's floor/media repair (below), which happened in
`docs/Kasr-Source-Imports/` before this copy, per lane protocol. Full
detail — the `medical:batch` false-alarm on the question step, the audit
findings, ids this module assumes are already live, and what remains
open — is in `docs/Kasr-Source-Imports/INDEX-101-ISK.md` and
`docs/Kasr-Source-Imports/coverage/101-ISK-GATES.md`; this entry states only
the apply order and current status.

**Apply in this order** (each step's ids are referenced by the next; the
generic order above already matches this):

| # | File | Admin page | Records | "Update matching items" |
|---|---|---|--:|---|
| 1 | `evidence/101-ISK-resources.md` | Bulk import evidence · Resource | 75 | on (evidence always upserts) |
| 2 | `article/101-ISK-anatomy.md` | Bulk import → article | 39 | On |
| 3 | `article/101-ISK-anatomy-2.md` | Bulk import → article | 9 | On |
| 4 | `article/101-ISK-histology.md` | Bulk import → article | 6 | On |
| 5 | `article/101-ISK-histology-2.md` | Bulk import → article | 12 | On |
| 6 | `article/101-ISK-histology-3.md` | Bulk import → article | 3 | On |
| 7 | `article/101-ISK-identification.md` | Bulk import → article | 6 | On |
| 8 | `concept/101-ISK-concepts.md` | Concepts › Import | 75 | On |
| 9 | `concept/101-ISK-mcq-concepts.md` | Concepts › Import | 207 new + 53 updates | **Must be On** — 53 of its 260 rows share an id with a concept `concepts.md` (step 8) just created; "Create only" silently skips them |
| 10 | `concept/101-ISK-practical-concepts.md` | Concepts › Import | 37 new + 6 updates | **Must be On**, same reason — 6 of 43 share an id with a concept imported in steps 8–9 |
| 11 | `evidence/101-ISK-claims.md` | Bulk import evidence · Claim | 1148 | On |
| 12 | `evidence/101-ISK-citations.md` | Bulk import evidence · Citation | 330 | On |
| 13 | `evidence/101-ISK-spans.md` | Bulk import evidence · Span | 266 | On |
| 14 | `relations/101-ISK-relations.md` | Relationships › Import | 194 | On — 68 carry `verification_status: verified`, the other 126 `needs_evidence` (a claim named, no citation on the relation yet) — expected, not an error |
| 15 | `practical/101-ISK-histology-practical.md` | Bulk import → practical | 38 | On — **import but keep Draft until media added**: all 38 stations carry `media_recommendations` with `Priority: required` and 0 images exist; Omar publishes after adding media via the Media Requests page (`/admin/library/media`) |
| 16 | `question/101-ISK-mcq.md` | Bulk import → question | 1661 | On |
| 17–23 | `question/101-ISK-{BAQOON-2022,BAQOON-2023,BAQOON-2024,EOY-2022,EOY-2024,EOY-2025,FORMATIVE-2025}-written.md` | Bulk import → question (format: written, same page) | 14+13+16+14+17+16+10 = 100 | On |
| 24 | `glossary/101-ISK-glossary.md` | Glossary › Import | 104 | Glossary import always upserts by id |

**Gate status, re-run 2026-08-27 against this staged copy plus the rest of
`docs/import-ready/`:** `medical:simulate` chained one kind at a time,
resources → articles → concepts (3 files) → claims → citations → spans →
relations → practical → question → written → glossary — `errors: []` at
every one of the 11 steps, 0 rejected. `npm run medical:simulate -- "docs/
import-ready/"*/*.md --emit ...` over the whole combined folder (101 ISK
plus 108 INT plus every pre-existing CVS/REN/RES batch) also comes back
`errors: []`, 108 batches applied, only the 3 pre-existing `academic/`+
`glossary/INDEX.md` non-batch files skipped (unrelated to 101). `medical:
batch` on 101's 16 batch-able files (`--with` every 101 sibling concept/
article file) is 15/16 `errors: []`; the one exception is `question/101-
ISK-mcq.md` standalone, which the same class of false alarm 108's relations
file hit — `--with`'s `foldInSiblings` merge does not strip the `+` prefix
off a sparse concept-update row's `article_ids`, so a coverage check
comparing `"+ART-…"` to a plain `"ART-…"` never matches; resolved by
`medical:simulate`, which uses the real importer logic and reports
`errors: []` for all 1661 questions. Full mechanism in `INDEX-101-ISK.md`.
**Reviewer / final publisher, closed this pass.** The chief-of-staff's
standing ruling — `reviewer: Medical team, Admin team` /
`final_publisher: Admin team` are FINAL, same values as 108 INT — was
applied to all 75 articles in both `docs/Kasr-Source-Imports/article/` and
this staged copy (byte-identical), replacing the absent field and dropping
the now-contradictory `reviewer:`/`finalPublisher:` `field_notes` lines.
`medical:batch` stays `errors: []` on every article file after the edit.

`medical:audit` against the combined emit (post-reviewer-fix): 5 aggregate
editorial-gap lines fire for 101 (`resourceIds`/`claimIds`/`spanIds`/
`evidenceBasis`/`notes` missing on the 31 articles with no claim/span
evidence pass yet) plus the 126 already-known `needs_evidence` relations
(row 14 above) — `Reviewer`/`Publisher` no longer appear anywhere in the
audit's findings. None of this blocks import (every 101 record is
`status: Draft`) or visibility (`status === 'Published'` is the only gate,
and nothing here is Published).

**Practical repair, done before this staging.** `practical/101-ISK-
histology-practical.md`'s 38 "Lab interpretation" stations were below the
format's 17-column floor and all 38 set `media_needed` with no
`media_recommendations` (Validator E, `dcc6929`). Fixed by hand in
`docs/Kasr-Source-Imports/` (the file carries no `Generated by` header): added
`status`/`owner`/`duration` to every station and renamed `media_needed` to
`media_recommendations` (same content, the field `bulkImport.ts` actually
checks for). `medical:batch` on the file now reports `"warnings": []`. All
38 stations' `media_recommendations` are `Priority: required` with 0 images
in the repository — **import, but keep every one of these 38 records
`status: Draft` until Omar adds the media via the Media Requests page**
(`/admin/library/media`); see row 15 above.

**Explanation enrichment — checked, not re-done.** Sized before touching
anything: 0 of 1661 questions have no correct-answer explanation, 0% are
under 3 sentences, only 16 (1%) are under 200 characters and every one of
those 16 still clears the 3-sentence floor. This matches the enrichment
pass BOARD.md already recorded as landed (2026-08-23). Well under the
60-record threshold for a fresh pass, so none was done.

**What remains genuinely open**: 3 concepts (`CON-FND-0D6F0DC6CBAD60`,
`CON-FND-25C25E4FA62811`, `CON-FND-14D80DE53DE835`) confirmed page-by-page
absent from the assigned histology source book, pending a ruling on sourcing
from elsewhere or staying concept-side-only permanently; 729 untriaged MCQ
bank rows; the EOY 2023 written paper (`src_ef2104d4eaede4fa1356`) whose
11-record ledger entry cannot be found in any current written batch; 31
articles with no claim/span evidence pass; zero medical images anywhere in
the repository (the 38 practical stations above need it most acutely — see
row 15). Reviewer/final publisher is now closed (standing ruling applied,
see above). None of these block the 24 files above from being applied.

### Alexandria University AU-MED-102 (Foundation of Basic Medical Sciences & Medical Terminology) — 59 files across 4 folders

Staged 2026-08-27 by the Alexandria Y1 finisher lane. Copied verbatim from
`docs/Alexandria-Source-Imports/{concept,article,question,evidence}/AU-MED-102-*`
across 9 department sub-lanes (Anatomy, Biochemistry ×4 — structural,
metabolism, molecular, nitrogen/blood — Embryology, Histology, Physiology,
Terminology). `docs/Alexandria-Source-Imports/coverage/00-publish-plan-year1.md`
is the plan this staging closes out; `pending-live/INDEX.md` is the
companion apply-order for everything below that overlays a Kasr Year 1 id
instead of standing alone.

**Apply in this order** (`academic/au-modules.md` — AU selected — must
already be applied so `AU-MED-102` exists; see the Alexandria academic
section above):

| # | File(s) | Admin page | Records | "Update matching items" |
|---|---|--:|---|---|
| 1 | `evidence/AU-MED-102-anatomy-sources.md`, `-biochem-metabolism-resource.md`, `-biochemistry-resources.md`, `-embryology-resources.md`, `-histology-resources.md`, `-terminology-resources.md` (6 files) | Bulk import evidence · Resource | 125 (39 new to this module; the rest re-declare ids already carried by a sibling department file, content-identical, same shared exam sittings) | On |
| 2 | `article/AU-MED-102-{anatomy,biochem-metabolism,biochem-molecular,biochem-nitrogen-blood,biochem-structural,embryology,histology,physiology,terminology}-articles.md` (9 files) | Bulk import → article | 29 | On |
| 3 | `concept/AU-MED-102-{anatomy,biochem-metabolism,biochem-molecular,biochem-nitrogen-blood,biochem-structural,embryology,histology,physiology,terminology}-concepts.md` (9 files) | Concepts › Import | 175 (163 new + 12 sparse updates onto ids already live in production) | **Must be On** — the 12 update rows share an id with a live concept |
| 4 | `evidence/AU-MED-102-*-claims.md` / `*-generated-claims.md` (9 files) | Bulk import evidence · Claim | 175 | On |
| 5 | `evidence/AU-MED-102-*-citations.md` (8 files) | Bulk import evidence · Citation | 162 | On |
| 6 | `evidence/AU-MED-102-*-spans.md` (9 files) | Bulk import evidence · Span | 77 | On |
| 7 | `question/AU-MED-102-{anatomy,biochem-metabolism,biochem-molecular,biochem-nitrogen-blood,biochem-structural,embryology,histology,physiology,terminology}-mcq.md` (9 files) | Bulk import → question | 135 | On |

**Gate status.** `medical:batch` per file: 0 errors on every concept/article
file standalone; every question file needs `--with` its own concept +
article + the relevant evidence resource file(s) (some sub-lanes cite a
resource declared under a sibling department's file) — 0 errors on all 9
once given the right `--with` set. Combined `medical:simulate` over all 59
staged files: `errors: []`, 0 rejected, delta `{concepts:175 (163 created +
12 updated), articles:29, claims:175, citations:162, spans:77, resources:39
new, questions:135 created}`. `medical:audit` against that emit: 1 line —
`ART-FND-AU-MED-102-PROTEIN-CHEMISTRY references unknown concept
CON-FND-2414B3639FD4D3`, expected and not a defect: that concept is a
sparse update sitting in `pending-live/AU-MED-102-biochem-structural.md`
against a Kasr id not yet live, so it resolves once that pending-live step
applies (§ below), not before. Re-running the whole `docs/import-ready/`
tree together (170 files, this module plus everything already staged):
`errors: []`, only the 2 `academic/*.md` files and `glossary/INDEX.md`
skipped as non-batch content.

**Reviewer / final publisher, closed this pass.** One file
(`article/AU-MED-102-terminology-articles.md`) carried `reviewer: Dr. Omar`
/ `final_publisher: Dr. Omar` on both its records instead of the
chief-of-staff's standing ruling (`Medical team, Admin team` /
`Admin team`, same values as every Kasr article) — fixed before staging;
`medical:batch` stays `errors: []` after the edit. Every other AU-MED-102
article already carried the ruled values.

**Two-sided coverage and question traceability — the real completeness
picture, not just the gate line.** Every article names in
`related_concepts` every concept it teaches (checked file by file, not
assumed from a heuristic link). Of the 175 own-lane concepts staged here:

| Sub-lane | Concepts | Questions (own file) | Untested concepts | Why |
|---|--:|--:|--:|---|
| Anatomy | 6 | 3 | 1 | `CON-MSK-9E9BBA40F75CE3` — OWED, no MCQ authored yet |
| Biochem — metabolism | 8 | 13 | 0 | fully covered |
| Biochem — molecular | 43 | 38 | 5 | OWED — concepts minted from the department book, no matching MCQ authored yet |
| Biochem — nitrogen/blood | 14 | 20 | 0 | fully covered |
| Biochem — structural | 69 | 32 | 39 | **largest gap** — most of these carry a department-book `exam_signal` (primary source, page-cited) but no MCQ; some are the 17+22 "unkeyed item left alone" concepts named in the department's own commit history, the rest are OWED authoring |
| Embryology | 5 | 4 | 0 (closed this pass — see below) | |
| Histology | 13 | 11 | 2 | OWED |
| Physiology | 13 | 10 | 3 | OWED |
| Terminology | 4 | 4 | 0 | fully covered |
| **Total** | **175** | **135** | **50** | **71% of own-lane concepts trace to an authored question** |

**Closed this pass:** Embryology's 5 own-lane concepts (4 NEW + 1 sparse
update onto a live Kasr id, `CON-REN-CB7041F0D25574`) had **no** question
record at all — `question/AU-MED-102-embryology-mcq.md` did not exist.
Authored 4 keyed MCQs from the department's own EOM paper
(`src_3bf4527b51de57464e14`, p17 Q80 and p18 Q83–85; coverage triage rows
4, 13, 14, 15), wired each article's `question_ids` and each concept's
`field_notes.questionIds` to the new records, and fixed a `difficulty:
Medium` value (not a valid enum — corrected to `Moderate`) the new items
introduced. The 5th idea in that same group, zona pellucida function
(`CON-DEV-642BA9E28AC8B6`), stays untested on purpose: its only source
(`src_29f02a5a4d6a273dea76` p6 Q22) is unkeyed and no second sitting was
found — per the corpus-hazard rule an unkeyed item is not authored as a
graded MCQ; recorded in the concept's own `field_notes`, not silently
dropped.

**Not closed — reported, not fixed.** The other 46 untested concepts
(Anatomy 1, Biochem-molecular 5, Biochem-structural 39, Histology 2,
Physiology 3) are a real authoring backlog, not a "small gap": closing them
needs fresh corpus verification per item (page-by-page textbook or MCQ-bank
reading) to avoid inventing a fact or a key, which is out of scope for a
finishing pass. They do not fail any validator gate — `medical:batch` only
checks a question against its concept/article, never the reverse — so
nothing here is mechanically broken; the module is import-clean but not
scope-test-complete. Flagged for a dedicated authoring lane.

**Pending-live — apply only after the named Kasr Year 1 files are live**
(see `pending-live/INDEX.md` for the full per-row detail; nothing in
`pending-live/` is staged here or anywhere in `docs/import-ready/`, by
design — Omar applies it separately once its dependency lands):

| Kasr Year 1 file this depends on | Status right now | AU pending-live file(s) |
|---|---|---|
| `102-INT-concepts.md`, `108-INT-concepts-pharmacology.md` | not yet live | `AU-MED-102-biochem-structural.md`, `-biochem-molecular.md` (+ its `-questions.md`), `-biochem-metabolism.md` (+ `-questions.md`), `-terminology.md` (+ `-questions.md`), `-physiology.md` |
| `103-BMS-*-concepts.md` (5 files), `108-INT-concepts-pathology.md` | not yet live | `AU-MED-102-biochem-nitrogen-blood.md` (+ `-questions.md`), `-biochem-metabolism.md` (+ `-questions.md`), `-biochem-structural-questions.md` |
| `101-ISK-concepts.md`, `101-ISK-mcq-concepts.md`, `101-ISK-practical-concepts.md` | not yet live | `AU-MED-102-anatomy.md` (+ `-questions.md`), `-embryology.md` (+ `-questions.md`), `-histology.md`, `-terminology.md` (+ `-questions.md`) |

**Verdict on 108 INT / 101 ISK / 103 BMS specifically** (asked of this
lane): 108 INT and 101 ISK are reported in progress on this same import
pass — this staging does not itself confirm they are live, only that the
sparse-update rows above resolve as soon as they are; 103 BMS is confirmed
not yet imported, so every row depending on it stays blocked regardless.
**`pending-live/AU-MED-102-histology.md`'s 31 sparse Kasr-overlay updates
have zero matching questions anywhere** — unlike anatomy/embryology/
terminology, which each have a paired `-questions.md`, no
`AU-MED-102-histology-questions.md` exists. Per LANE-BRIEF §21 ("a bank
with its questions deferred is not publishable") this specific pending-live
batch is not publish-ready even once its Kasr dependency lands; it does not
block anything staged in this section since it sits outside every import
root already, but it is the single largest OWED item in the module and
should be the next authoring lane's first target.

---

### Kasr Al Ainy 102 INT (Biochemistry + Physiology) — 21 files across 5 folders

Staged 2026-08-27, same pass and layout as 101 ISK/108 INT above. Copied
verbatim from `docs/Kasr-Source-Imports/{evidence,article,concept,relations,
question,written}/102-INT-*` — the only edits happened in
`docs/Kasr-Source-Imports/` before this copy: 19 concept-side `article_ids`
additions (via `scripts/kasr/seeds/articles.ts` + a `build-batches.ts "102
INT"` regeneration, not a hand edit to the generated file) and a reviewer/
publisher fix on the two hand-authored physiology article files. Full
detail is in `docs/Kasr-Source-Imports/coverage/102-INT-GATES.md`; this
entry states only the apply order and current status. 102 has no
`practical/` or `glossary/` batch yet (both remain genuinely empty for this
module — see "What remains genuinely open" below).

**Two-sided coverage — the publish gate — closed this pass: 147/164 → 164/164.**
`check-two-sided-coverage.py "102 INT"` reported 17 concepts "article-side
only" (minted by the 2022-sitting batch with no `article_ids`, even though
`article/102-INT-coverage.md`'s eight supplement articles already named them
back in `related_concepts`) plus 2 more whose MCQ-route `library_ids` was
stale. Fix: 19 `CON-* -> ART-102-*` entries added to
`scripts/kasr/seeds/articles.ts` (the written route's article-lookup map —
concept files here all carry `Generated by scripts/kasr/build-batches.ts`,
so the fix goes in generator input, never a hand edit), then
`node --experimental-strip-types scripts/kasr/build-batches.ts "102 INT"`
regenerated `concept/102-INT-concepts.md` and the 2 written batches that
reference those ids. Diff was exactly the added `## article_ids` /
`## library_ids` lines and their derived `## related_article_ids` further-
reading lines — nothing else moved. `check-two-sided-coverage.py "102 INT"`
now reports `tested 164 | two-sided 164 | concept-side only 0 | article-side
only 0 | no link 0`.

**Apply in this order** (each step's ids are referenced by the next; the
generic order above already matches this):

| # | File | Admin page | Records | "Update matching items" |
|---|---|---|--:|---|
| 1 | `evidence/102-INT-sources.md` | Bulk import evidence · Resource | 69 | on (evidence always upserts) |
| 2 | `article/102-INT-biochemistry.md` | Bulk import → article | 13 | On |
| 3 | `article/102-INT-coverage.md` | Bulk import → article | 9 | On |
| 4 | `article/102-INT-physiology.md` | Bulk import → article | 8 | On |
| 5 | `article/102-INT-physiology-blood-ans.md` | Bulk import → article | 11 | On |
| 6 | `concept/102-INT-concepts.md` | Concepts › Import | 57 | On |
| 7 | `concept/102-INT-physiology-concepts.md` | Concepts › Import | 25 new + 32 updates | **Must be On** — 32 rows share an id with a concept created in step 6 or already live |
| 8 | `concept/102-INT-mcq-concepts.md` | Concepts › Import | 98 new + 40 updates | **Must be On**, same reason |
| 9 | `evidence/102-INT-claims.md` | Bulk import evidence · Claim | 38 | On |
| 10 | `evidence/102-INT-generated-claims.md` | Bulk import evidence · Claim | 100 | On |
| 11 | `evidence/102-INT-citations.md` | Bulk import evidence · Citation | 38 | On |
| 12 | `evidence/102-INT-generated-citations.md` | Bulk import evidence · Citation | 75 | On |
| 13 | `evidence/102-INT-spans.md` | Bulk import evidence · Span | 37 | On |
| 14 | `evidence/102-INT-generated-spans.md` | Bulk import evidence · Span | 77 | On |
| 15 | `relations/102-INT-relations.md` | Relationships › Import | 150 | On — typed (9 real types), ~130 carry `verification_status: verified`, the rest `needs_evidence` (a claim named, no citation on the relation record itself yet) |
| 16 | `question/102-INT-MCQ-bank.md` | Bulk import → question | 22 | On |
| 17 | `question/102-INT-mcq.md` | Bulk import → question | 421 | On |
| 18–21 | `question/102-INT-{EOY-2025,EOY-2024,EOY-2022,BAQOON-2022}-written.md` | Bulk import → question (format: written, same page) | 19+15+19+18 = 71 | On |

Totals: 69 resources, 41 articles, 180 new concepts + 72 updates, 138 claims,
113 citations, 114 spans, 150 relations, 514 questions (443 MCQ + 71
written) — every count above read directly off this session's own
`medical:simulate` `batches[].created`/`updated`, not hand-added.

**Gate status, re-run 2026-08-27 against this staged copy plus the rest of
`docs/import-ready/`:** `medical:simulate` chained one kind at a time,
resources → articles → concepts (3 files) → claims → citations → spans →
relations → question (MCQ-bank, mcq) → written (4 papers) — `errors: []` at
every one of the 10 steps, 0 rejected. The combined-folder run —
101 ISK + 108 INT + 102 INT + every pre-existing CVS/REN/RES batch, one
`medical:simulate` call in per-kind order — reports 129 batches, 7,184
created, **0 rejected, `errors: []`**; the only two files skipped are
`academic/kau-modules.md` and `academic/au-modules.md`, both by design (not
a medical-content kind). `medical:batch` per 102 file (`--with` every
sibling concept/article file) is clean except two pre-existing, documented
items, neither introduced by this pass: (a) one written item
(`QW-102-D023A1E0F54A`, "Compare LDH and CK isoenzymes") whose part (a) has
no `Expects` lines because the assigned department book does not cover the
topic anywhere in its 167 pages — recorded in `coverage/102-INT-OWED.md` §4
as needing a faculty ruling, not authored around; (b) 10 further MCQ rows
whose `library_ids` names only one of two teaching articles (same class as
the 2 fixed above, on MCQ leaves whose `articleId` is a single string) —
concept-level two-sided coverage is unaffected (164/164 holds either way),
left as a known leaf-regeneration item rather than a shared-toolchain change
for 10 rows.

`medical:audit` against the combined emit: the 102-specific findings are all
the same editorial classes 101/108 already carry — `relatedArticleIds`/
`claimIds`/`spanIds` missing on the 9 supplement/coverage articles (the
evidence pass has not walked claims back into the *article* records yet,
same root cause as 108's 11 and 101's 31), plus `microtopicId`/`nanotopicId`/
`media`/`lastReviewed`/`reviewDue` blank-without-reason on those same 9
articles. None block import (every 102 record is `status: Draft`) or
visibility (`status === 'Published'` is the only gate). No reviewer or
publisher finding: `article/102-INT-physiology.md` and
`-physiology-blood-ans.md` carried a placeholder `Dr. Omar` in both fields
on all 19 of their articles (not the standing ruling's values) — replaced
with `reviewer: Medical team, Admin team` / `final_publisher: Admin team`,
same as 101/108, in both `docs/Kasr-Source-Imports/article/` and this staged
copy. `biochemistry.md` and `coverage.md`'s 22 articles already carried the
correct values.

**What remains genuinely open** (none of it blocks the 21 files above from
being applied): **504 of 1,102 banked MCQ rows are unauthored** (614 tagged
`102 INT`, 526 printed-key-and-not-suspect, only 22 authored by hand into
`102-INT-MCQ-bank.md` before the 421-row generated batch was cut short) —
authoring one is not transcription, each option needs an explanation naming
the misconception it catches, so this is a multi-session programme, not a
chunk this pass could close (well over the ~1,500-line ceiling; split plan:
roughly 3–4 authoring passes of 120–150 questions each, one per source
department book, is the natural cut). **9 sittings read but not seeded**
(EOM 2024/2023/2021, 3 Baqoon second-sittings, EOY 2021 physiology, EOY
2022 physiology re-check, 2 "GATHERED" compilations) — reading the 2024
paper on top of 2025 alone took the module from 21 to 38 concepts and
produced 7 repeat-tested concepts, the strongest blueprint-weight evidence
this corpus holds; each further sitting is real authoring (a paper at a
time), not something to batch. No `practical/` or `glossary/` batch exists
for 102 yet — the practical manuals (Physio Practical 1st Year, two Zaytuna
biochemistry practical books, All Practical slides 102) are extracted and
cached, nothing authored from them. 76 media requests outstanding (52
`required`), 10 questions on the two EOY papers cannot be sat at all without
their diagram. Two chapters the question book has and the textbook does not
("Introduction to Biochemistry and Nutrition"; 4+3 banked items carry no
`modulePathGuess`) await a faculty ruling on whether they are taught. Three
question columns (`concept_ids`, `contextual_concept_ids`,
`exam_weight_by_year`) are deliberately withheld from the written batches —
emitting them would rewrite all seven of 101's already-committed written
batches, which is 101's call and commit, not smuggled in here.

---

### Kasr Al Ainy 103 BMS (Anatomy + Biochemistry + Histology + Physiology) — 61 files across 6 folders

Staged 2026-08-27, same pass and layout as 101 ISK/102 INT/108 INT above.
Copied verbatim from `docs/Kasr-Source-Imports/{evidence,article,concept,
relations,question,glossary}/103-BMS-*` — no hand edits in this copy. 103
has no `INDEX-103-BMS.md` or `103-BMS-GATES.md` companion the way 101/108
do; the closest full detail is `docs/Kasr-Source-Imports/coverage/103-BMS-
coverage.md` (generated source-read ledger) and `coverage/103-BMS-OWED.md`
(hand-authored, what is still owed); this entry states the apply order and
current status. 103 has no `practical/` batch (no practical corpus authored
yet — see "What remains genuinely open" below); it does carry a `glossary/`
batch, unlike 102.

**Correction to this branch's own prior checkpoint.** The commit that staged
these 61 files recorded in `PROGRESS.md` that "0 QM-103-* ids are currently
live in `server/data/medical-library-v1.json`, so the 5 MCQ question batches
need no 'Update matching items' note yet." That is wrong on the fact it
matters on: `server/data/medical-library-v1.json` is a stale build fixture,
**not** production — production routing is Express (`server/src/index.js`),
never a static JSON snapshot, so that file was never the right place to
check liveness. **Production is live with 65 `QM-103-*` questions today**
(Foundations 50, Blood/lymphoreticular 12, Renal 3), imported by Omar from
an earlier snapshot of these same five MCQ batches. This is also consistent
with what the staged files themselves say: `article/103-BMS-mcq-vitamins-
nerve.md`'s fourth record is a sparse update to the already-live
`ART-103-PHY-NERVE-ACTION-POTENTIAL` that appends 13 already-live `QM-103-*`
ids to `question_ids`, and three of the thirteen `canonical_key` rows fixed
per `coverage/103-BMS-OWED.md` §1 resolve to live `CON-HEM-*`/`CON-REN-*`
concept ids (heme/renal — the same categories the 65 live questions sit
under).

**Apply in this order** (each step's ids are referenced by the next; the
generic order above already matches this):

| # | File | Admin page | Records | "Update matching items" |
|---|---|---|--:|---|
| 1 | `evidence/103-BMS-sources.md` | Bulk import evidence · Resource | 9 | on (evidence always upserts) |
| 2 | `article/103-BMS-anatomy.md` | Bulk import → article | 21 | On |
| 3 | `article/103-BMS-biochemistry.md` | Bulk import → article | 16 | On |
| 4 | `article/103-BMS-histology.md` | Bulk import → article | 19 | On |
| 5 | `article/103-BMS-physiology.md` | Bulk import → article | 16 | On |
| 6 | `article/103-BMS-mcq-aminoacid.md` | Bulk import → article | 2 | On |
| 7 | `article/103-BMS-mcq-aromatic.md` | Bulk import → article | 2 | On |
| 8 | `article/103-BMS-mcq-carbohydrate.md` | Bulk import → article | 7 | On |
| 9 | `article/103-BMS-mcq-heme.md` | Bulk import → article | 3 | On |
| 10 | `article/103-BMS-mcq-lipid.md` | Bulk import → article | 8 | On |
| 11 | `article/103-BMS-mcq-nitrogen.md` | Bulk import → article | 4 | On |
| 12 | `article/103-BMS-mcq-purine.md` | Bulk import → article | 2 | On |
| 13 | `article/103-BMS-mcq-vitamins-nerve.md` | Bulk import → article | 3 new + 1 update | **Must be On** — record 4 is a sparse update to the already-live `ART-103-PHY-NERVE-ACTION-POTENTIAL`; with "Create only" it is silently skipped, not merged |
| 14 | `concept/103-BMS-anatomy-concepts.md` | Concepts › Import | 51, 5 of them updates | **Must be On** — 5 rows (the adductor-canal/acetabulum relations) share an id already live; see `coverage/103-BMS-OWED.md` §1 |
| 15 | `concept/103-BMS-biochemistry-concepts.md` | Concepts › Import | 43, 5 of them updates | **Must be On**, same reason — G6PD/haemolytic-anaemia/gout rows |
| 16 | `concept/103-BMS-histology-concepts.md` | Concepts › Import | 65, 3 of them updates | **Must be On**, same reason — bone-cells/myofibril/arrector-pili rows |
| 17 | `concept/103-BMS-physiology-concepts.md` | Concepts › Import | 46 | On |
| 18 | `concept/103-BMS-mcq-aminoacid-concepts.md` | Concepts › Import | 8 | On |
| 19 | `concept/103-BMS-mcq-aromatic-concepts.md` | Concepts › Import | 7 | On |
| 20 | `concept/103-BMS-mcq-carbohydrate-concepts.md` | Concepts › Import | 36 | On |
| 21 | `concept/103-BMS-mcq-heme-concepts.md` | Concepts › Import | 9 | On |
| 22 | `concept/103-BMS-mcq-lipid-concepts.md` | Concepts › Import | 27 | On |
| 23 | `concept/103-BMS-mcq-nitrogen-concepts.md` | Concepts › Import | 3 | On |
| 24 | `concept/103-BMS-mcq-protein-concepts.md` | Concepts › Import | 8 | On |
| 25 | `concept/103-BMS-mcq-purine-concepts.md` | Concepts › Import | 7 | On |
| 26 | `concept/103-BMS-mcq-vitamins-nerve-concepts.md` | Concepts › Import | 12 | On |
| 27 | `evidence/103-BMS-claims.md` | Bulk import evidence · Claim | 29 | On |
| 28 | `evidence/103-BMS-biochemistry-claims.md` | Bulk import evidence · Claim | 28 | On |
| 29 | `evidence/103-BMS-generated-claims.md` | Bulk import evidence · Claim | 754 | On |
| 30 | `evidence/103-BMS-mcq-claims.md` | Bulk import evidence · Claim | 12 | On |
| 31 | `evidence/103-BMS-mcq-carbohydrate-claims.md` | Bulk import evidence · Claim | 36 | On |
| 32 | `evidence/103-BMS-citations.md` | Bulk import evidence · Citation | 29 | On |
| 33 | `evidence/103-BMS-biochemistry-citations.md` | Bulk import evidence · Citation | 28 | On |
| 34 | `evidence/103-BMS-generated-citations.md` | Bulk import evidence · Citation | 164 | On |
| 35 | `evidence/103-BMS-mcq-citations.md` | Bulk import evidence · Citation | 12 | On |
| 36 | `evidence/103-BMS-mcq-carbohydrate-citations.md` | Bulk import evidence · Citation | 36 | On |
| 37 | `evidence/103-BMS-spans.md` | Bulk import evidence · Span | 18 | On |
| 38 | `evidence/103-BMS-biochemistry-spans.md` | Bulk import evidence · Span | 19 | On |
| 39 | `evidence/103-BMS-generated-spans.md` | Bulk import evidence · Span | 238 | On |
| 40 | `evidence/103-BMS-mcq-carbohydrate-spans.md` | Bulk import evidence · Span | 36 | On |
| 41 | `relations/103-BMS-relations.md` | Relationships › Import | 324 | On — typed (16 real types), 179 carry `verification_status: verified`, the other 145 `needs_evidence` |
| 42 | `question/103-BMS-MCQ-carbohydrate-bioenergetics.md` | Bulk import → question | 116 | **Must be On** — 65 `QM-103-*` ids across these 5 MCQ files are already live in production (Foundations 50, Blood/lymphoreticular 12, Renal 3, imported by Omar from an earlier snapshot of these same batches) and will update in place, not duplicate |
| 43 | `question/103-BMS-MCQ-lipid-diabetes.md` | Bulk import → question | 79 | Same note as row 42 |
| 44 | `question/103-BMS-MCQ-nerve-muscle.md` | Bulk import → question | 56 | Same note as row 42 |
| 45 | `question/103-BMS-MCQ-protein-heme.md` | Bulk import → question | 101 | Same note as row 42 |
| 46 | `question/103-BMS-MCQ-vitamins.md` | Bulk import → question | 46 | Same note as row 42 |
| 47–60 | `question/103-BMS-{BAQOON-2023-biochemistry,BAQOON-2024-biochemistry,EOY-2021-anatomy,EOY-2022-anatomy,EOY-2023-biochemistry,EOY-2024-biochemistry,EOY-2025-anatomy,EOY-2025-anatomy-2,EOY-2025-biochemistry,EOY-2025-biochemistry-matching,EOY-2025-histology,EOY-2025-physiology,histology-department,physiology-department}-written.md` | Bulk import → question (format: written, same page) | 3+5+7+7+5+5+6+7+7+1+4+4+33+34 = 128 | On |
| 61 | `glossary/103-BMS-glossary.md` | Glossary › Import | 116 | Glossary import always upserts by id |

Totals: 9 resources, 104 articles (103 new + 1 sparse update), 322 concepts
(309 new + 13 updates to already-live ids), 859 claims, 269 citations, 311
spans, 324 relations, 526 questions (398 MCQ + 128 written), 116 glossary
terms — every count above read directly off `grep -c "^# Item"` against this
staged copy, cross-checked against `coverage/103-BMS-coverage.md`'s
generated "Authored so far" table, which matches exactly file-for-file.

All 12 article files carry `status: Draft` uniformly (Draft-until-media
convention holds — all 12 carry `media_recommendations` with at least one
`Priority: required` line, 136 required-media requests in total, 0 images in
the repository) and `reviewer: Medical team, Admin team` /
`final_publisher: Admin team` per the standing ruling.

**Gate status, re-run 2026-08-27 against this staged copy plus the rest of
`docs/import-ready/`:** `medical:simulate` chained one kind at a time,
resources → articles → concepts (13 files) → claims (5) → citations (5) →
spans (4) → relations → question (MCQ, 5 files) → written (14 papers) →
glossary — `errors: []` at every one of the 10 steps, 0 rejected. The
combined-folder run — 108 INT + 101 ISK + 102 INT + 103 BMS + every
pre-existing CVS/REN/RES batch, one `medical:simulate` call in per-kind
order — reports 190 batches applied, **0 rejected, `errors: []`**; the only
three files skipped are `academic/kau-modules.md`, `academic/au-modules.md`
and `glossary/INDEX.md`, all by design (not a medical-content kind).
`medical:audit` on the resulting state reports 291 "no evidence chain"
relation notes — exactly the 145 declared `needs_evidence` rows in 103's own
relations file (verified one-for-one by source/type/target) plus 146
pre-existing from other modules — and 55 field-completeness notes, all on
non-103 ids (CVS/101/102); zero new errors trace to 103 BMS.

Per-file `medical:batch` (`--with` sibling concept/article files for id
resolution) results are recorded in `PROGRESS.md` for this stage; the 6
evidence files' "is not a source the corpus contains" lines are a
pre-existing shared-toolchain gap (see `PROGRESS.md`), not a 103 defect, and
do not affect `medical:simulate` or `medical:audit` above — neither script
reads `corpus-source-index.json`.

**What remains genuinely open** (none of it blocks the 61 files above from
being applied): 29 of 51 source files are not yet read per `coverage/103-
BMS-coverage.md`, including four EOY papers with answers, two Baqoon
second-sitting papers, one orientation sheet, and 22 instructor-material /
practical-slide files (the reason no `practical/` batch exists yet for 103);
136 media requests outstanding (all `required`) across the 12 article files,
0 images in the repository; the 5 relations/concept "untaught" starred
entries in `coverage/101-ISK-untaught-concepts.md` (cross-module file,
misnamed) are all 103 BMS per `coverage/103-BMS-OWED.md` §3, still needing a
faculty ruling on sourcing; `103-BMS-anatomy-concepts.md`'s field_notes
records two owed edges (`often_confused_with` to a not-yet-live tibial-nerve
deformity concept, `complication_of` to `CON-MSK-AB5318A9255811`) that no
relations batch in this pass claims.

---

## Before applying anything

```bash
npm run medical:simulate -- "docs/import-ready/"*/*.md --emit /tmp/synapse-sim.json
npm run medical:audit -- --source /tmp/synapse-sim.json
```

The first applies every pending batch to a copy of live state and reports the delta. The
second audits the state that would result. Neither touches the real data.

Per file:

```bash
npm run medical:batch -- "docs/import-ready/<folder>/<file>.md"
```

`medical:batch` is directory-scoped — it resolves IDs against sibling files, not live state.
A relation or citation pointing at something already live will report "does not exist" there
and simulate clean. Trust the simulator.
