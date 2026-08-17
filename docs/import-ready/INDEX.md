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
| [`concept/`](concept/) | Concepts › Import | 13 | 208 |
| [`article/`](article/) | Bulk import → **article** | 8 | 58 |
| [`question/`](question/) | Bulk import → **question** | 21 | 281 |
| [`practical/`](practical/) | Bulk import → **practical** | 34 | 152 |
| [`relations/`](relations/) | Relationships › Import | — | — |
| [`evidence/`](evidence/) | Evidence › Import | — | — |
| [`subjects/`](subjects/) | Taxonomy › Import | — | — |
| [`glossary/`](glossary/) | Glossary › Import | — | — |
| [`resource/`](resource/) | Bulk import → **resource** | — | — |

The empty folders are not oversights — they are the shape of the work that has not been
done yet. The relationship graph in particular holds 1,718 concepts and only 47 edges.

---

## Import order

Apply the folders in this order. Later kinds reference earlier ones, and importing out of
order leaves records pointing at things that do not exist yet.

```
resource → article → concept → evidence (claims, then citations, then spans)
        → relations → practical → question
```

Within a folder, file order does not matter.

---

## What is here now

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

### Kasr Alainy Year 1 questions — `question/`, 11 files, 62 records

Re-expressed from Kasr Alainy past papers and doctor question banks for two Year 1 modules.
Every record tests a concept that is **already live**, so these eleven files depend on nothing
else in `docs/import-ready/` and may be applied on their own, in any order.

| File | Module | Records | Topic area |
|---|---|---:|---|
| `SYS-CVS-QUESTION-011.md` | 104 CPS | 6 | Cardiac cycle, valve phases, filling, JVP |
| `SYS-CVS-QUESTION-012.md` | 104 CPS | 5 | Cardiac output, afterload, baroreceptors, venous reservoir |
| `SYS-CVS-QUESTION-013.md` | 104 CPS | 7 | Conduction system, ECG vectors, afterdepolarisations |
| `SYS-CVS-QUESTION-014.md` | 104 CPS | 6 | Valve anatomy, coronary sinus, vessel and capillary histology |
| `SYS-RES-QUESTION-001.md` | 104 CPS | 5 | Alveolar pressure, airway resistance, surfactant, compliance |
| `SYS-RES-QUESTION-002.md` | 104 CPS | 5 | Lung volumes, spirometry limits, CO poisoning, anaemic hypoxia |
| `SYS-RES-QUESTION-003.md` | 104 CPS | 6 | Pneumocytes, airway transitions, bronchial circulation |
| `SYS-PHA-QUESTION-001.md` | 108 INT | 5 | Volume of distribution, loading and maintenance dose |
| `SYS-PHA-QUESTION-002.md` | 108 INT | 5 | Membrane transport, carrier saturation, channels |
| `SYS-PHA-QUESTION-003.md` | 108 INT | 6 | pKa, ionisation ratio, pH and pOH |
| `SYS-PHA-QUESTION-004.md` | 108 INT | 6 | Clearance, tubular secretion, active transport |

**Module coverage.** `104 CPS` is complete at **40 questions**. `108 INT` holds **22**, against a
ceiling of about 30 — see below.

All 62 land as `Draft` with `fieldsUsed` 48, and every one carries at least one media request:
**62 requests, 34 of them `Priority: required`**. Those 34 cannot publish until the asset exists,
so expect them in **Library Setup → Media requests** after importing.

**Two limits worth knowing before asking for more.**

`108 INT` is capped by live concepts, not by sources. Year 1's module examines general
pharmacology (8 sections, intro through posology) and general pathology (cell injury, necrosis,
apoptosis). The library has **no article for general pathology, drug metabolism, absorption or
pharmacodynamics**, so only pharmacokinetics, membrane transport and acid–base chemistry are
writable — about 30 concepts. Eight remain unused: `CON-FND-7A13EADDDC6F2B`,
`CON-FND-0E928D053BCD48`, `CON-FND-A8A72BC2005748`, `CON-FND-ADD586E767E034`,
`CON-FND-48E1C0E33B1DD3`, `CON-FND-FBAA90D61BE8AB`, `CON-FND-2EDA697071E588`,
`CON-FND-DF7D6BE0B98F86`.

`101 ISK`, `102 INT` and `103 BMS` have **no questions at all**, and cannot until the taxonomy
changes. Their content is general histology, biochemistry, embryology and haematology; the live
articles covering it (Erythrocytes, Hematopoiesis, Gene Expression, Embryology — 62 articles)
all sit under `subjectId: "medical"`, which 00-START-HERE §3 forbids in a `subject` field, and
none of the eight valid subjects has a home for them.

`module` carries the university's own module code (`104 CPS`, `108 INT`) as a plain tag. No
module record exists in Academic Setup for Kasr Alainy Year 1 — `KAU_Y1.courses` is empty — so
nothing resolves these strings yet. Creating the five Year 1 courses would let them link up,
and is also the prerequisite for any Year 1 timetable, since module schedules are keyed
`kau:Year 1:<courseId>`.

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
