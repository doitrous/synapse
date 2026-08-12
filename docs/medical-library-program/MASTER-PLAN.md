# Synapse medical-library programme — master plan

**This file is the single source of truth for the programme.** Every session
starts here and ends here. Nothing below depends on any chat transcript.

- Programme: build the complete undergraduate medical library (Years 1–4) for
  Synapse across all 19 canonical system roots and all discipline, skills and
  knowledge placements, then — and only then — the assessment programme.
- System plans: [`systems/`](systems/) — one file per canonical system root,
  linked from the [programme progress table](#5-programme-progress-table).
- Related standing documents (not superseded by this plan):
  [`docs/authoring/README.md`](../authoring/README.md),
  [`docs/medical-library-taxonomy-review.md`](../medical-library-taxonomy-review.md),
  [`docs/cardiovascular-pilot-field-audit.md`](../cardiovascular-pilot-field-audit.md).

---

## 1. Current state

| | |
|---|---|
| **Overall status** | Phases 0 and 1 complete. Phase 2 in progress — `SYS-FND` and `SYS-DEV` both **complete** (56/56 and 33/33 article homes). 87 articles, 98 concepts, 137 relations, 184 claims, 234 citations authored and committed. Every batch validates, simulates against a copy of live state, and audits clean. Nothing imported yet |
| **Active phase** | Phase 2 — article & concept programme |
| **Active system** | `SYS-CVS` Cardiovascular System (system 3 of 19) |
| **Active task ID** | `SYS-CVS-CONCEPT-001` (Not started). A practical bank and two question banks already exist for `SYS-CVS-T01`, authored separately; the article programme for the system has not begun |
| **Last verified commit** | `cf20f9d` — 133/133 tests, lint clean, simulation 0 errors, audit 0 errors |
| **Branch** | `authoring-contract-and-taxonomy-dedup` |
| **Worktree** | `TAX-COMPARE-001` outputs, uncommitted. No unrelated user change was touched |
| **Last update** | 2026-08-12 (SYS-FND topics T01–T04 complete, 29 of 56 articles authored; SYS-CVS practical bank authored — 46 items, 140 questions, all 98 T01 concepts) |

### Gate status

| Gate | Status |
|---|---|
| `GATE-PLATFORM-001` | **Passed** 2026-08-12 — all eight platform blockers closed, all acceptance commands green (§0D) |
| `GATE-TAX-001` | **Passed** 2026-08-12 — two independent comparisons found no gaps; the runtime tree now carries all 19 systems |
| `GATE-LIBRARY-001` | Not started. **No longer blocks assessment authoring** — waived by `DEC-023`. It still governs completion of the library |
| `GATE-ASSESS-001` | Not started. Governs *publishing* an assessment programme, not authoring it |

## 2. Start here next

> **Task `SYS-FND-INVENTORY-001` — Classify every `SYS-FND` node and build its disposition ledger.**

Both blocking gates have passed. Phase 2 runs the 19 systems in the locked order
(`LD-09`), and `SYS-FND` is first because its `prerequisite_of` edges define the
learning order for the whole library.

**Objective.** Assign every one of the 74 `SYS-FND` nodes exactly one
classification — `navigation-only hub`, `overview article`, `atomic article
home`, `secondary placement only`, or `empty but legitimate planned
destination` — and record a disposition for the 5 articles and 45 concepts that
currently touch the system.

**Non-goals.** Do not author any article, concept or relation. Do not change the
taxonomy. Do not publish.

**Files to read first**

```
docs/medical-library-program/systems/SYS-FND.md                     the system plan
docs/medical-library-program/evidence/curriculum-gap-list.json      995 below-floor labels; filter to SYS-FND
src/data/articleTemplates.ts                                        the section contract per archetype
server/data/medical-library-v1.json                                 the existing records
```

**Files to write**

```
docs/medical-library-program/evidence/SYS-FND-node-classification.json
docs/medical-library-program/evidence/SYS-FND-disposition-ledger.json
```

**Method.** Walk the 6 topics, 15 subtopics and 53 microtopics. A topic is a hub
unless an overview genuinely teaches something its children do not (`LD-04`). A
microtopic is an atomic article home only when it is a distinct, reusable,
studiable unit. Cross-reference the curriculum gap list for what the corpus
actually teaches under foundational subjects, so the catalogue reflects local
emphasis rather than an idealised syllabus.

**Also count** how many of the 62 `subjectId: "medical"` articles and 736 such
concepts (`BLK-09`) belong to this system, and plan their repair.

**Command**

```bash
npm run medical:audit
```

**Expected output.** Both files exist; every node has one classification with a
one-line rationale; every existing record has a disposition with a reason; the
audit still passes unchanged.

**Stop condition.** Both files written and §2, §5, §6 of `systems/SYS-FND.md`
updated with the decided figures. Then set `SYS-FND-INVENTORY-001` to `Done` and
the active task to `SYS-FND-SOURCE-001`.

## 3. Locked decisions

User-approved. Do not re-litigate these; add new ones to the
[decision log](#8-decision-log) instead.

| # | Decision |
|---|---|
| **LD-01** | Deliver a master plan plus a detailed plan for every system. |
| **LD-02** | All 19 canonical `SYS-*` roots are the coverage and execution spine. |
| **LD-03** | Cover all academic and basic medical knowledge across all systems and disciplines for approximately Years 1–4. The programme is **not** limited to the eight subjects the runtime student tree currently exposes. |
| **LD-04** | Do **not** force one article onto every taxonomy node. Topic and subtopic nodes may be honest navigation hubs. Create atomic articles for distinct, reusable, studiable units, plus overview articles only where they add real teaching value. |
| **LD-05** | Execution begins with a platform-readiness phase. No taxonomy refinement and no content authoring may begin until its blocking acceptance criteria pass. |
| **LD-06** | Preserve stable existing IDs and evidence lineage. Improve records in place. Merge, redirect, deprecate or remove only with a documented migration and impact analysis. Never overwrite or delete silently. |
| **LD-07** | Claude may mark sufficiently verified, low-risk material `Published` once it passes the documented evidence and projection gates. Treatment, dosing, procedure, emergency, recommendation and time-sensitive material obeys the repository's stricter review policy and must not bypass required faculty review because extraction confidence is high. |
| **LD-08** | Source hierarchy: the university corpus establishes local curriculum and exam emphasis; AMBOSS is a structural gap-check only; current authoritative web sources verify medical facts. High-risk claims require stronger and current corroboration. |
| **LD-09** | Execute the systems in the order given in the [progress table](#5-programme-progress-table). |
| **LD-10** | ~~Author no assessment content until `GATE-LIBRARY-001` has passed.~~ **Waived 2026-08-12 by the user** (`DEC-023`). Assessment content may be authored against any concept that already has an article, ahead of the gate. What has not changed: a question or practical may still only test a concept an article covers, everything lands as `Draft`, and nothing publishes without the evidence and review gates it already owed. `GATE-LIBRARY-001` still governs *completion* of the library; it no longer blocks *authoring* assessment. |
| **LD-11** | The AMBOSS archive **is licensed** for use as a structural comparator in this repository. This is settled — do not raise it again. It remains a comparator only: its prose, tables, media and hierarchy are still never copied wholesale (LD-08 is unchanged). |
| **LD-12** | Faculty review is **not a dependency**. Dr Omar (`doitrous@hotmail.com`) is the named reviewer of record, but no task, article, concept or batch may be blocked waiting for a review. High-risk material is still *identified and labelled* — `timeSensitive`, `publicationGate: faculty_review`, `conflicts`, `evidenceGaps` — and still requires stronger and current corroboration under LD-08, but the queue never gates progress. This narrows LD-07: the stricter *sourcing* standard stands; the *blocking* behaviour does not. |
| **LD-13** | The runtime student tree expands from 8 subjects to all 19 systems in **one migration**, not system by system. |
| **LD-14** | Author from the corpus that is processed today (765 files / 29,432 pages) and infer from it. Do not wait for the remaining 72.3%. An unprocessed area is authored from authoritative sources and its local-emphasis uncertainty is recorded as a coverage risk, not treated as a blocker. |
| **LD-15** | Arabic terminology is researched from authoritative sources and filled during the same authoring run. Do not leave `arabicTitle`, `arabicLabel` or `arabicAliases` empty by default. Where no authoritative Arabic term exists, that specific case still takes a `fieldNotes` reason — a `fieldNotes` entry is a finding, not a shortcut. |
| **LD-16** | The label is **Female reproductive system**. Do not use "transgender" anywhere it is not explicitly required by the clinical content itself. |

### Standing rules inherited from the repository

These are not new decisions; they already bind the codebase and this plan does
not relax them.

- One canonical item, one primary home. Other routes are `secondaryNodeIds`,
  never copies.
- University module names and local course structure live in curriculum
  overlays, not in the canonical medical hierarchy.
- Exam weight, high-yield band, resource type and article format are metadata or
  filters, never taxonomy branches. Facets such as "core", "applied", "common"
  and "rare" are not nodes.
- Synonyms and spelling variants are aliases, not parallel nodes.
- British medical spelling. Written for a revising student, not a specialist.
- Never invent a fact, citation, locator, ID, review or source. An empty field
  with a `fieldNotes` reason is correct; a fabricated value is not.
- "Generated" never means "verified", and "verified" never means "published".

---

## 4. Hard gates

Each gate is a hard stop. Work downstream of a gate does not begin — not
partially, not "to get ahead" — until the gate's evidence is linked here.

| Gate | Blocks | Passes when |
|---|---|---|
| **`GATE-PLATFORM-001`** — Phase 0 readiness | All taxonomy work and all content work | Every task in [§Phase 0](#phase-0--platform-readiness-blocking) is `Done` with linked evidence, and the [readiness acceptance gate](#0d-readiness-acceptance-gate-gate-platform-001) commands all pass |
| **`GATE-TAX-001`** — Taxonomy approval | All Phase 2+ content authoring | Phase 1 disposition ledger complete, patch batches applied or explicitly deferred, `medical:validate:taxonomy` and `medical:validate:authoring` pass, migration/redirect map recorded, and the user has approved the structural changes |
| **`GATE-SYS-<ID>`** — Per-system completion | The next system in sequence *(soft: independent systems may overlap only where the plan proves it)* | That system's plan §14 completion criteria are met and its evidence paths are linked |
| **`GATE-LIBRARY-001`** — Library Completion Gate | All assessment authoring | Every criterion in [§Library Completion Gate](#library-completion-gate) is met across all 19 systems and all discipline/skills/knowledge placements |
| **`GATE-ASSESS-001`** — Assessment authoring | Qbank and practical content creation | `GATE-LIBRARY-001` passed **and** the assessment programme plan is written and approved |

---

## 5. Programme progress table

Status values: `Not started` · `In progress` · `Blocked` · `Done` · `Superseded`.

### Phases

| Phase | Status | Blocker | Next task |
|---|---|---|---|
| **Phase 0** — Platform readiness | **Done** 2026-08-12 | — | — |
| **Phase 1** — Structure validation | **Done** 2026-08-12 | — | — |
| **Phase 2** — Article & concept programme (19 systems) | **In progress** — 2 of 19 systems complete | — | `SYS-CVS-CONCEPT-001` |
| **Phase 3** — Library Completion Gate | Blocked | all `GATE-SYS-*` | `GATE-LIBRARY-001` |
| **Phase 4** — Assessment programme | Blocked | `GATE-LIBRARY-001` | `ASSESS-PLAN-001` |

### Systems

Counts are the recomputed baseline (2026-08-12). "Articles (primary)" counts
articles whose `primaryNodeId` lies under that system root; "any placement"
counts primary **or** secondary. The gap between the two columns is the finding
that shapes Phase 2: almost all existing content is *secondarily* attached to
systems while its canonical home is a discipline root.

| # | System | Plan | Status | Nodes | Hubs | Planned articles | With local source | Existing articles / concepts | Next task |
|---:|---|---|---|---:|---:|---:|---:|---|---|
| 1 | `SYS-FND` Foundations & General Principles | [plan](systems/SYS-FND.md) | **Authored — 56/56 homes** | 74 | 18 | 56 | 50 | 5 / 45 | `GATE-SYS-FND` |
| 2 | `SYS-DEV` Human Development & Life Stages | [plan](systems/SYS-DEV.md) | **Authored — 33/33 homes** | 45 | 12 | 33 | 20 | 9 / 111 | `SYS-DEV-CONCEPT-001` |
| 3 | `SYS-CVS` Cardiovascular System | [plan](systems/SYS-CVS.md) | Inventory + source plan done · **practical bank authored for T01** | 93 | 27 | 66 | 39 | 10 / 98 | `SYS-CVS-CONCEPT-001` |
| 4 | `SYS-RES` Respiratory System | [plan](systems/SYS-RES.md) | Inventory + source plan done | 82 | 24 | 58 | 44 | 9 / 112 | `SYS-RES-CONCEPT-001` |
| 5 | `SYS-REN` Renal & Urinary System | [plan](systems/SYS-REN.md) | Inventory + source plan done | 81 | 21 | 60 | 38 | 10 / 119 | `SYS-REN-CONCEPT-001` |
| 6 | `SYS-GIT` Gastrointestinal, Hepatobiliary & Pancreatic | [plan](systems/SYS-GIT.md) | Inventory + source plan done | 108 | 27 | 81 | 61 | 10 / 126 | `SYS-GIT-CONCEPT-001` |
| 7 | `SYS-END` Endocrine & Metabolic System | [plan](systems/SYS-END.md) | Inventory + source plan done | 61 | 21 | 40 | 32 | 8 / 95 | `SYS-END-CONCEPT-001` |
| 8 | `SYS-NEU` Nervous System & Special Senses | [plan](systems/SYS-NEU.md) | Inventory + source plan done | 78 | 24 | 54 | 37 | 10 / 121 | `SYS-NEU-CONCEPT-001` |
| 9 | `SYS-MSK` Musculoskeletal System | [plan](systems/SYS-MSK.md) | Inventory + source plan done | 66 | 18 | 48 | 31 | 9 / 123 | `SYS-MSK-CONCEPT-001` |
| 10 | `SYS-HEM` Blood & Lymphoreticular System | [plan](systems/SYS-HEM.md) | Inventory + source plan done | 56 | 18 | 38 | 23 | 9 / 122 | `SYS-HEM-CONCEPT-001` |
| 11 | `SYS-IMM` Immune System | [plan](systems/SYS-IMM.md) | Inventory + source plan done | 48 | 15 | 33 | 29 | 10 / 133 | `SYS-IMM-CONCEPT-001` |
| 12 | `SYS-INF` Infection & Tropical Medicine | [plan](systems/SYS-INF.md) | Inventory + source plan done | 84 | 21 | 63 | 50 | 10 / 121 | `SYS-INF-CONCEPT-001` |
| 13 | `SYS-OBS` Pregnancy, Childbirth & Puerperium | [plan](systems/SYS-OBS.md) | Inventory + source plan done | 54 | 18 | 36 | 20 | 9 / 87 | `SYS-OBS-CONCEPT-001` |
| 14 | `SYS-GYN` Female reproductive system | [plan](systems/SYS-GYN.md) | Inventory + source plan done | 63 | 21 | 42 | 26 | 9 / 111 | `SYS-GYN-CONCEPT-001` |
| 15 | `SYS-AND` Male Reproductive System | [plan](systems/SYS-AND.md) | Inventory + source plan done | 53 | 18 | 35 | 25 | 10 / 115 | `SYS-AND-CONCEPT-001` |
| 16 | `SYS-PSY` Behavioral Health | [plan](systems/SYS-PSY.md) | Inventory + source plan done | 58 | 18 | 40 | 10 | 0 / 0 | `SYS-PSY-CONCEPT-001` |
| 17 | `SYS-DER` Skin & Subcutaneous Tissue | [plan](systems/SYS-DER.md) | Inventory + source plan done | 55 | 18 | 37 | 21 | 6 / 57 | `SYS-DER-CONCEPT-001` |
| 18 | `SYS-MUL` Multisystem Processes, Emergencies & Critical Care | [plan](systems/SYS-MUL.md) | Inventory + source plan done | 83 | 21 | 61 | 39 | 0 / 0 | `SYS-MUL-CONCEPT-001` |
| 19 | `SYS-POP` Population Health, Evidence & Social Sciences | [plan](systems/SYS-POP.md) | Inventory + source plan done | 83 | 21 | 62 | 32 | 0 / 0 | `SYS-POP-CONCEPT-001` |
| | **Total** | | | **1,325** | **381** | **943** | **627** | | |

*Existing article and concept counts do not sum to 145 and 1,718: one record may
be placed under several systems. 124 of 145 articles and 1,499 of 1,718 concepts
have a **discipline** root as their canonical home (`DEC-005`).*

**943 planned articles** is the decided catalogue, not an estimate — it lands
mid-range of the 900–1,600 the plan projected before the nodes were classified.
335 of those nodes carry a local teaching signal and are authored first (`LD-14`).
`SYS-PSY`, `SYS-MUL` and `SYS-POP` have no existing content of any kind and are
entirely greenfield.

---

## 6. Baseline and target metrics

Recomputed 2026-08-12 at commit `2df5853` from `server/data/medical-library-v1.json`
(migration `2026-08-11-medical-library-reader-quality-v7`, generated
2026-08-11T03:09:06Z) and from the TypeScript sources. Do not copy these forward
without re-running the commands; re-derive them at the start of any session that
may have changed the inputs.

### Validators — all currently pass

| Command | Result |
|---|---|
| `npm run medical:validate:authoring` | `passed: true`, exit 0, all 10 error buckets empty |
| `npm run medical:validate:taxonomy` | `passed: true`, exit 0, all 6 error buckets empty |
| `npm run medical:audit` | exit 0, `errors: []`, no missing required field |

**A passing audit is not a coverage claim.** It checks that every field is
*present* with a value or an explicit `fieldNotes` reason, and that every
reference resolves. It does not check that a field is medically correct, that a
system has content, or that a student can see it.

### Taxonomy

| Metric | Value |
|---|---|
| Canonical nodes | 1,883 |
| — by view | Systems & General 1,344 · Discipline 220 · Skills 190 · Knowledge 129 |
| — by level | System 19 · Discipline 27 · Domain 19 · Topic 376 · Subtopic 517 · Microtopic 925 |
| — by role | Hub 65 · Topic hub 376 · Cluster 512 · Leaf 930 |
| Roots | 19 system · 27 discipline · 10 skills · 9 knowledge |
| Runtime curriculum nodes | 630 across 8 subjects, 582 distinct labels, 17 cross-references |
| Crosswalk coverage | 8/8 subjects, 81/81 topics mapped; 0 unknown targets |

### Content

| Metric | Value | Denominator / note |
|---|---|---|
| Articles | 145 | 17 `Published`, 128 `In review`; 0 `Draft`, 0 `Archived` |
| Publication gate | 138 `needs_evidence`, 7 `faculty_review` | **0 articles carry `publishable`** |
| Archetypes used | concept 94, anatomy 33, condition 11, investigation 7 | 4 of 10 archetypes; 0 presentation/drug/skill/organism/emergency/public-health articles |
| Templates used | 8 of 10 `TPL-*` | no `TPL-EMERGENCY`, no `TPL-PUBLIC-HEALTH` article exists |
| High-yield band | 145/145 `Core` | band is unused as a signal |
| Time sensitivity | 145/145 `stable` | no article is flagged time-sensitive |
| Article sections | 480 | 480/480 carry evidence spans |
| `publishedSections` | 17 articles | 0 of them contain reviewed `narrative` prose in the committed artifact |
| `holdThese` | 145/145 articles have entries | suppressed in the reader for the 17 evidence-gated ones |
| `loseTheMark` | 145/145 articles have entries | suppressed in the reader for the 17 evidence-gated ones |
| `annotations` | **0** across all 145 | no import path exists |
| `relatedArticleIds` | 433 links across 145 articles | **none reach the student projection** |
| `media` | 0 articles | no image recommendation model exists at all |
| `evidenceGaps` recorded | 144/145 | |
| `conflicts` recorded | 0/145 | |
| Concepts | 1,718 | 55 `active`, 1,663 `under review` |
| Concept publication status | 55 published · 1,640 needs_evidence · 12 faculty_review · 11 under_review | 3.2% published |
| Concepts with any typed relation | 85 | **4.9%** of 1,718 |
| Relations | 47 | 9 of 26 relation types used; **0 verified** |
| Claims | 1,741 | 59 verified · 1,669 needs_evidence · 13 faculty_review |
| Claim risk class | 1,689 `foundational_stable` · 40 `clinical_non_treatment` · 12 `treatment_or_action` | 0 flagged time-sensitive |
| Citations | 1,818 | 1,769 count as claim evidence |
| Article spans | 1,720 | 83 cite more than one resource |
| Merges recorded | 108 | reversible lineage retained |
| Coverage decisions | 87,275 | see source-corpus table below |
| Published evidence store | 58 spans · 58 claims · 116 citations · 15 resources | this is what a student can actually be shown |
| Resources | 47 | 40 pending upload; Kasr Alainy 40, OpenStax 7; 1 `binary_mismatch_quarantined` |

### Import field parity

Regenerate with `npm run medical:parity`. Model fields are read from the
TypeScript sources at run time, so this table cannot drift when a field is added.
Measured 2026-08-12, after Phase 0.

| Content type | Model | Model fields | Import columns | Importable | Gaps | Not applicable |
|---|---|---:|---:|---:|---:|---:|
| Library article | `ArticleAuthoringData` | 45 | 52 | 45 | 0 | 0 |
| — statement annotation | `ConceptAnnotation` | 5 | 52 | 5 | 0 | 0 |
| — image recommendation | `ImageRecommendation` | 14 | 52 | 14 | 0 | 0 |
| Concept | `Concept` | 54 | 52 | 54 | 0 | 0 |
| Concept relation | `ConceptRelation` | 11 | 11 | 11 | 0 | 0 |
| Question | `QuestionAuthoringData` | 12 | 49 | 12 | 0 | 0 |
| — tags | `QuestionTags` | 21 | 49 | 21 | 0 | 0 |
| Resource | `ResourceAuthoringData` | 15 | 18 | 8 | 0 | 7 |
| Subjects & Topics | `CurriculumSystem` tree | 23 | 14 | 23 | 0 | 0 |

The seven `n/a` resource fields are set by the ingest, rights, review and publish
pipelines. An import column for `sha256` or `storageKey` would be a way to forge
provenance, so they are excluded deliberately and the reason is recorded in the
generated matrix.

**Before Phase 0, for comparison:** article 28 of 43 with `annotations`
hardcoded empty; concept 14 of 54, create-only; relation 0 of 11 with no import
surface at all; Subjects & Topics a 5-column title path with no IDs.

### Source-corpus readiness

**AMBOSS archive** — `/Users/doitrous/Documents/Amboss`

| Metric | Value |
|---|---|
| Hierarchy roots | 8 (`Basic sciences`, `Clinical skills`, `Clinical knowledge`, `Osteopathic medicine`, `On-call survival guide`, `Clerkship survival guide`, `Transition to residency`, `CME-eligible articles`) |
| Hierarchy nodes | 8,061 |
| Unique articles | 1,502 |
| Duplicate placements | 5,903 |
| `Basic sciences → By system` | **19 children** |
| `Basic sciences → By discipline` | 13 children |
| `Clinical knowledge` | 24 children |
| `Clinical skills` | 5 children, 169 direct articles |
| Out-of-scope roots (rejected wholesale) | Osteopathic medicine, On-call survival guide, Clerkship survival guide, Transition to residency, CME-eligible articles, USMLE/PANCE content outlines — **4 of 8 roots and 395+ CME nodes are outside Years 1–4 Egyptian undergraduate scope** |

**University corpus** — `/Users/doitrous/Downloads/Resources Digestion Current aug 7`

| State | Files | Pages |
|---|---:|---:|
| `semantic_processing_complete_review_required` | 764 | — |
| `semantic_candidate_complete_quality_review_required` | 1 | — |
| `semantic_analysis_in_progress` | 6 | — |
| `semantic_analysis_pending` | 2,356 | — |
| `explicit_blocker` | 96 | — |
| `candidate_retracted_do_not_rely` | 15 | — |
| **Total** | **3,238** | **106,362** |
| Completed | 765 | 29,432 (**27.7%**) |
| Pending | 2,473 | 76,930 (**72.3%**) |

Blocker reasons: 66 external Google-document pointers with no extracted pages ·
17 OS metadata files · 8 zero-page administrative records · 2 pervasively
font-encoding-corrupted texts (OCR-dependent) · 2 missing specialised Anki
extractions · 1 unreliable MCQ boundary · 1 recurring platform refusal.

Candidate concept volume: 152,147 `explicitly taught` and 242,743
`all medically meaningful`. MCQ signal: 21,872 questions across 279 files, with
1,249 further likely MCQ sources unprocessed.

Per-corpus completion is deeply uneven and this drives sequencing:

| Corpus | Files | Complete |
|---|---:|---:|
| Helwan Uni / Files & MCQs | 582 | 509 |
| Helwan Uni / Schedules and Instructions | 52 | 49 |
| Kasr Alainy Books (all 8 discipline folders) | 58 | 52 |
| Ain Shams Uni Books | 7 | 7 |
| Ain Shams Books Drive / 1st Year | 270 | 18 |
| Ain Shams Books Drive / 2nd Year | 501 | **0** |
| Ain Shams Books Drive / 3rd Year | 1,409 | **0** |
| General / Metabolism, Pathology | 87 | **0** |

**Reading this honestly:** every "complete" file is in a
`*_review_required` state. Extraction completion is *not* medical verification.
2,180 of 3,238 files (67%) belong to the Ain Shams Drive, of which 18 are
processed. A topic absent from the corpus today is **not** evidence that it is
absent from the curriculum.

### Targets

Targets are ranges with stated assumptions, not commitments to a date.

| Metric | Baseline | Target at `GATE-LIBRARY-001` | Assumption |
|---|---:|---|---|
| Systems with a canonical article home | 4 / 19 | 19 / 19 | LD-02 |
| In-scope canonical nodes classified (hub / overview / atomic / secondary / planned-empty) | 0 / 1,344 | 1,344 / 1,344 | classification is cheap; authoring is not |
| Atomic + overview articles | 145 | 900–1,600 | ≈0.7–1.2 articles per canonical subtopic + microtopic cluster, after LD-04 removes the one-node-one-article assumption |
| Articles with a safe published projection | 17 | 100% of articles marked `Published` | |
| Articles carrying `publishable` gate | 0 | ≥60% of published set | remainder legitimately `faculty_review` |
| Statement annotations | 0 | ≥3 per atomic article | definitions, mechanisms, contrasts |
| Related-article links reaching the reader | 0 of 433 | 100% of valid links | |
| Concepts canonicalised & non-orphaned | 1,718 (0 orphans, but 1,663 unreviewed) | 100% reviewed or explicitly excluded | |
| Concepts with ≥1 typed relation | 85 (4.9%) | ≥80% | |
| Verified relations | 0 of 47 | ≥70% of retained relations | rest `needs_evidence` with a named gap |
| Admin-only image recommendations | 0 (no model) | ≥1 per article where a visual is required | |
| Image recommendations leaked to students | n/a | **0**, test-enforced | |

---

## 7. Blockers and open questions

### Blockers

| ID | Blocker | Status | Evidence |
|---|---|---|---|
| `BLK-01` | Bulk article import hardcoded `annotations: []` | **Closed** 2026-08-12 | `annotations` import block with pre-commit verbatim-quote verification against the named article block; `src/data/bulkImport.ts` `parseAnnotations`/`annotationErrors`; 5 tests in `src/data/bulkImport.test.ts` |
| `BLK-02` | Concept import was create-only, 14 of 54 fields, `articleIds` forced `[]` | **Closed** 2026-08-12 | `src/data/conceptImport.ts` — all 54 fields, stable-ID upsert, reciprocal article links, merge lineage preserved; `src/data/conceptImport.test.ts` |
| `BLK-03` | No import surface existed for `ConceptRelation` | **Closed** 2026-08-12 | `src/pages/admin/RelationsImportPage.tsx` at `/admin/relationships/import`; all 11 fields; endpoint, type, claim and citation validation pre-commit; duplicate-edge refusal |
| `BLK-04` | Subjects & Topics import was a 5-column title path with no IDs or upsert | **Closed** 2026-08-12 | `src/data/subjectsImport.ts` — stable IDs, upsert, rename vs move, system metadata, `crossRefs`, one-label-one-home check and a reference impact report before the write |
| `BLK-05` | `relatedArticleIds` never reached the student projection | **Closed** 2026-08-12 | `relatedArticleLinks` in `src/data/articleProjection.ts`; "Read next" panel in `src/pages/student/Library.tsx`; dead IDs, self-links and duplicates dropped; 6 tests |
| `BLK-06` | Evidence-gated articles discarded authored `loseTheMark` and the reader substituted two hardcoded generic traps | **Closed** 2026-08-12 | `src/data/calloutPolicy.ts` per-line evidence policy; the fabricated fallback is **deleted** from `Library.tsx`; 11 tests in `src/data/calloutPolicy.test.ts` |
| `BLK-07` | `holdThese` was replaced by fact spans on gated articles | **Closed** 2026-08-12 | Same policy applied to both callout kinds; reviewed key points now win |
| `BLK-08` | No image/visual recommendation model existed | **Closed** 2026-08-12 | `ImageRecommendation` in `src/data/contentControl.ts` — a separate type from `ArticleMediaRecord` by design; importable; admin coverage view at `/admin/library/images`; 6 leak tests in `src/data/imageRecommendations.test.ts` |
| `BLK-09` | 62 articles and 736 concepts carry `subjectId: "medical"`, which is not one of the eight valid subject IDs, so the student library cannot group them | **Open** — Phase 2 | Repair under a documented migration (LD-06). Each system's `INVENTORY-001` counts its share |
| `BLK-10` | All 17 `Published` articles carry `publicationGate: needs_evidence` | **Open** — `PLAT-GATE-001` | Publication status and evidence gate still disagree in the data. The callout policy no longer depends on the gate, so this is a data-consistency task rather than a platform blocker |
| `BLK-11` | `server/data/medical-library-v1.json` is at migration v7 with `apply-article-narratives-v9.mjs` and 23 narrative files unapplied | **Open** — `PLAT-GATE-001` | Requires a database migration with `MEDICAL_LIBRARY_APPLY`, which is an owner-approved production action |
| `BLK-12` | Claims, citations, sources and article spans had **no import surface at all** — they could only be created by the generation pipeline, so an authored concept could never leave `needs_evidence` | **Closed** 2026-08-12 | `src/data/evidenceImport.ts` and `src/pages/admin/EvidenceImportPage.tsx` at `/admin/library/evidence/import`; 4 contracts, 22 tests; parity matrix extended and still 0 gaps |

### Open questions

All six questions raised by the planning run were answered on 2026-08-12 and are
now locked decisions. None remains open.

| ID | Question | Resolution |
|---|---|---|
| `OQ-01` | AMBOSS licensing for comparator use | **Answered** — licensed. `LD-11`. Settled; do not raise again |
| `OQ-02` | Named faculty reviewer and turnaround | **Answered** — Dr Omar (`doitrous@hotmail.com`), and review is explicitly **not** a dependency. `LD-12` |
| `OQ-03` | Runtime tree expansion, one migration or incremental | **Answered** — one migration. `LD-13` |
| `OQ-04` | Whether to wait for the remaining 72.3% of the corpus | **Answered** — no. Use what is processed and infer. `LD-14` |
| `OQ-05` | The two font-encoding-corrupted sources | **Answered** — programme's call. **Decision `DEC-023`:** treat both as permanent gaps. The corpus records a standing instruction against source-image/OCR inspection, and 2 files out of 3,238 do not justify overriding it. Each is recorded as a named coverage risk on the systems it touches, not silently dropped |
| `OQ-06` | Arabic terminology sourcing | **Answered** — research and fill during the authoring run. `LD-15` |

## 8. Decision log

Append-only. Never edit or delete an entry; supersede it with a new one.

| Date | ID | Decision | Rationale | Affects |
|---|---|---|---|---|
| 2026-08-12 | `DEC-001` | This master plan supersedes ad-hoc programme planning. `docs/medical-library-taxonomy-review.md` remains authoritative for **taxonomy structure decisions**; `docs/authoring/` remains authoritative for **authoring contracts**. This plan does not restate or fork them | Three documents each doing one job beats one document doing all three badly | all |
| 2026-08-12 | `DEC-002` | `docs/cardiovascular-pilot-field-audit.md` is recorded as **stale, retained for history**. It states 10 articles / 140 concepts / 16 relations and that "every article ends with a dedicated Components and relations section" — a section type that is now forbidden by `FORBIDDEN_SECTIONS` and rejected by the field audit | Preserve history (LD-06) while preventing anyone from planning against superseded numbers | Phase 0 documentation task |
| 2026-08-12 | `DEC-003` | Phase 0 is treated as a **hard blocker**, not a parallel track. No content batch may run "while platform work continues" | Six of the eleven blockers would silently corrupt or discard authored work if content were produced first | all |
| 2026-08-12 | `DEC-004` | The programme measures article coverage against **canonical node classification**, not against a node-to-article ratio | LD-04. A hub with no article is a valid, complete outcome; counting it as a gap would generate thousands of useless stub articles | Phase 2, `GATE-LIBRARY-001` |
| 2026-08-12 | `DEC-005` | The 124 articles and 1,499 concepts whose canonical home is a `DIS-*` root are **not** treated as mis-placed by default. Whether a canonical home moves to a `SYS-*` root is a per-record Phase 1 decision with a migration | LD-06 and the taxonomy review's explicit position that discipline and system routes are equal placements of one canonical item | Phase 1, all system plans §6 |
| 2026-08-12 | `DEC-006` | Statement annotations get a **new import syntax with quote verification**, rather than a positional or offset-based format | Offsets break on prose reflow; the existing `ArticleMediaAnchor` already proves the verbatim-quote approach works in this codebase | `PLAT-ANNOT-001` — **implemented** |
| 2026-08-12 | `DEC-007` | The programme label for `SYS-GYN` is **Female reproductive system**. The word "transgender" is not used anywhere it is not explicitly required by the clinical content | User decision (LD-16). The comparator's wording is not adopted | `SYS-GYN`, `SYS-AND` plans |
| 2026-08-12 | `DEC-008` | The reader **never fabricates a callout**. The two hardcoded generic traps are deleted rather than made conditional | Showing invented text under this article's "Where people lose the mark" heading presents filler as reviewed teaching. An honest empty panel is better than a plausible wrong one, and it is consistent with "never invent a fact" | `PLAT-CALLOUT-001` |
| 2026-08-12 | `DEC-009` | A callout publishes when it carries its **own** resolving evidence chain, **or** the article records a review (`lastReviewed`, or a per-callout `reviewedBy`) | Per-line evidence keyed on the exact callout text — an index would silently re-point evidence when a line is inserted. Under LD-12 the review route is available immediately, so this does not create a queue | `src/data/calloutPolicy.ts` |
| 2026-08-12 | `DEC-010` | An import cell that is **blank or absent leaves the existing value alone**; `[clear]` empties a list on purpose; a leading `+` appends | A spreadsheet cannot otherwise distinguish "not mentioned" from "make it empty". Without the distinction every partial update silently wiped nested data | `src/data/importSemantics.ts`, `src/data/importMerge.ts` |
| 2026-08-12 | `DEC-023` | The 2 font-encoding-corrupted corpus sources are **permanent gaps**, not OCR targets | The corpus carries a standing instruction against source-image/OCR inspection, and 2 files of 3,238 do not justify overriding it. Each is recorded as a named coverage risk on the systems it touches | `OQ-05` |
| 2026-08-12 | `DEC-012` | `ImageRecommendation` is a **separate type** from `ArticleMediaRecord`, not a status flag on it | An unfulfilled recommendation stored as media would sit one `releaseWithoutReview` flag away from a student. Separation makes the leak structurally impossible, and a test asserts it | `PLAT-IMAGE-001` |
| 2026-08-12 | `DEC-013` | Arabic terminology is authored from the sources actually consulted and **cited as such**. The WHO/Arab Medical Union *Unified Medical Dictionary* (المعجم الطبي الموحد) is named as the source of record, but a term is only attributed to it once it has genuinely been looked up there | `LD-15` requires Arabic fields to be filled, not deferred. It does not license attributing a term to a dictionary nobody opened — that would be a fabricated citation, which the standing rules forbid outright. Terms sourced elsewhere are recorded with the source used | every concept and article batch |
| 2026-08-12 | `DEC-014` | Content batches are authored as importer Markdown under `docs/medical-library-program/batches/`, validated by `npm run medical:batch` **before** import, and only then imported | A batch that fails in the admin UI half-applies. Validating the file against the real importer — same parser, same builder, same placement check — moves that failure to a command that changes nothing | all Phase 2 authoring |
| 2026-08-12 | `DEC-015` | A claim carries **two** citations where it can: one `local_curriculum` establishing that the fact is taught here, one `independent_verification` establishing that it is true. Only the second counts as claim evidence | `LD-08` puts the corpus in charge of emphasis and authoritative sources in charge of fact. Recording both, and marking which is which, is what makes that separation auditable rather than a slogan. A corpus heading is not a sentence, so it supports emphasis and not wording | every evidence batch |
| 2026-08-12 | `DEC-016` | A claim and the citations backing it are authored in the same batch, and the claim row does **not** repeat its citation IDs. The citation names its claim; the reverse is filled in at commit | Asking an author to keep both directions in step by hand guarantees a mismatch. The validator understands the batch as a unit | `PLAT-EVIDENCE-001` |
| 2026-08-12 | `DEC-017` | **A claim's verification status is derived, never asserted.** An author writes an intention; `reconcileClaimEvidence` sets the status from the citations that actually resolve, and a `treatment_or_action` claim needs two | Asserting it created an ordering trap the simulation exposed: claims were rejected for lacking citations, and the citations were then rejected because their claims had never landed. Deriving it also makes the status unforgeable, which is what "generated is not verified" has to mean in practice | `PLAT-EVIDENCE-001`, every evidence batch |
| 2026-08-12 | `DEC-018` | An optional field a record leaves empty is written as **`null`, not `undefined`** | The audit separates "missing" from "empty on purpose" by testing whether the key is present. `JSON.stringify` drops `undefined`, so the key vanished the moment the record was persisted and the audit reported it absent. Twenty-four such errors in the simulation traced to this one cause | `materialiseNewItem`, `materialiseNewConcept` |
| 2026-08-12 | `DEC-019` | `resourceOccurrenceIds` moves from the concept audit's *populated* list to its *intentional-blank* list | The field records where a **pipeline-extracted** concept appears in the corpus. A concept written by a person has no such record, and the corpus does not supply occurrence identifiers for these nodes. Requiring it would have forced a fabricated ID; it now needs an explicit `fieldNotes` reason instead | `scripts/audit-medical-content-fields.mjs` |
| 2026-08-12 | `DEC-020` | Placement resolution lives in `conceptImport.ts`, not in the import page | It lived only in the page, so a simulated import silently dropped `subjectId` and every placement field — exactly the kind of divergence between the real and simulated path that a dry run exists to catch | `resolvePlacement` |
| 2026-08-12 | `DEC-021` | `hold_these` and `lose_the_mark` split on **new lines only**, not on `;` or `\|` | They are prose. A semicolon inside a teaching point was cutting it into two half-sentences — and because callout evidence keys on the exact text, that quietly detached the line from its evidence. The practical blocks already split this way for the same reason | `importLines` |
| 2026-08-12 | `DEC-022` | A batch naming a `src_` source ID is checked against a generated index of every ID the corpus actually contains | Written after a batch was authored with three invented `src_` IDs. They passed every check, and would have become citations pointing at sources that never existed. "Never invent an ID" is now mechanical rather than a matter of remembering | `scripts/build-corpus-source-index.mjs` |
| 2026-08-12 | `DEC-023` | **LD-10 is waived.** Assessment content may be authored against any concept that already has an article, without waiting for `GATE-LIBRARY-001` | The gate was written to stop a Qbank being built on a library that might still move under it. That risk is real for unwritten systems and absent for a topic whose articles and concepts are already authored and stable. Holding 219 finished cardiovascular questions behind eighteen unwritten systems bought nothing | `LD-10`, `systems/SYS-CVS.md` §13, all future assessment authoring |
| 2026-08-12 | `DEC-024` | Assessment authoring inherits three constraints the waiver does **not** relax: a question may only test a concept an article covers; every record lands as `Draft`; and treatment, dose, procedure and emergency content still needs a citable source and faculty review | The gate was doing several jobs at once. Removing the timing constraint should not quietly remove the safety ones | all assessment authoring |
| 2026-08-13 | `DEC-025` | One `MediaRequest` type replaces `ImageRecommendation` (articles) and `PracticalMediaRequest` (practicals), and serves questions too. It carries two separate axes — `medium` (`image`/`audio`/`video`) and `kind` (the genre of an image) — plus `ownerId` and `ownerKind` | Three names for one editorial instruction, and three backlogs to work through, for a job that is identical whichever surface is waiting. An earlier design folded audio and video into the genre list, which made "a histology field" and "a heart-sound recording" look like alternatives on one axis | `src/data/contentControl.ts`, `src/data/bulkImport.ts`, `src/pages/admin/MediaRequests.tsx`, all three authoring templates |
| 2026-08-13 | `DEC-026` | Import key canonicalised to `media_recommendations` on all three content types. `image_recommendations` (articles) and `media_needed` (practicals) stay readable | Sixteen authored batch files use the old keys; breaking them to tidy a name would be the more expensive mistake | `src/data/bulkImport.ts`, `docs/authoring/*.md` |
| 2026-08-13 | `DEC-027` | Validated, ready-to-import batches live in `docs/import-ready/` with an `INDEX.md`, and are moved there out of `docs/medical-library-program/batches/` rather than copied | The user applies imports by hand through the site. One known folder, and one home per file — a batch duplicated in two places is a batch that will be imported twice or edited in the wrong copy | `docs/import-ready/`, reporting convention |

---

## 9. Change and progress log

Append-only.

| Date | Session | What happened | Commits | Validations | Outputs | Follow-up |
|---|---|---|---|---|---|---|
| 2026-08-12 | Planning run | Inspected the implementation, `server/data/medical-library-v1.json`, the AMBOSS archive and the university corpus. Recomputed the full baseline. Wrote this master plan and 19 system plans. **No product code, taxonomy, or content changed.** | none (docs only) | `medical:validate:authoring` pass · `medical:validate:taxonomy` pass · `medical:audit` pass (all read-only) | `docs/medical-library-program/MASTER-PLAN.md`, `docs/medical-library-program/systems/*.md` (19) | Answer `OQ-01`–`OQ-06`; start `PLAT-PARITY-001` |
| 2026-08-12 | Phase 0 implementation | Closed platform blockers `BLK-01`–`BLK-08`. Answered all six open questions as `LD-11`–`LD-16`. **`GATE-PLATFORM-001` passed.** No medical content was authored, imported or published. | uncommitted — the working tree holds the Phase 0 change set | `medical:validate:authoring` pass · `medical:validate:taxonomy` pass · `medical:build` + `medical:audit` pass, `errors: []` · `medical:parity` `gapCount: 0` · `npm test` **102/102** · `tsc -b` clean · `lint` clean · `build` succeeds | See "Phase 0 outputs" below | Commit the change set; run `TAX-COMPARE-001` |

| 2026-08-12 | `TAX-COMPARE-001` | Compared the canonical taxonomy, the runtime tree and the AMBOSS hierarchy. Disposed of all 644 in-scope comparator nodes. **No node-level gap found.** No taxonomy change made. | uncommitted | `medical:validate:taxonomy` pass · `medical:validate:authoring` pass (unchanged — this task writes no taxonomy) | `evidence/amboss-disposition-ledger.{json,md}`, `evidence/taxonomy-gap-list.json`, `scripts/build-amboss-disposition-ledger.mjs` | Run `TAX-GAP-001` against the local corpus, since a US comparator cannot reveal an Egyptian-curriculum gap |

| 2026-08-12 | `TAX-GAP-001` | Asked the same question of the local corpus that AMBOSS could not answer: 262 processed files, 110,850 concept records, 10,743 distinct curriculum labels. **Zero labels need a curriculum decision.** | uncommitted | `medical:validate:taxonomy` pass (unchanged — writes no taxonomy) | `evidence/curriculum-gap-list.{json,md}`, `scripts/build-curriculum-gap-list.mjs`, `scripts/lib/taxonomy-match.mjs` | Runtime expansion |
| 2026-08-12 | `TAX-RUNTIME-001` | Expanded the runtime student tree from 8 subjects to all 19 canonical systems in one migration (`LD-13`). 630 → 1,398 curriculum nodes; 81 → 154 mapped topics; 0 duplicate labels. **`GATE-TAX-001` passed.** | uncommitted | `medical:validate:authoring` pass · `medical:validate:taxonomy` pass · `medical:build` + `medical:audit` pass · 102/102 tests · typecheck, lint, build clean | `src/data/curriculumCatalog.ts`, `src/data/taxonomyCrosswalk.ts` | Start `SYS-FND-INVENTORY-001` |

### `TAX-GAP-001` finding (2026-08-12)

The AMBOSS comparison could only prove Synapse covers a US comparator. This asked
the question that matters: does the corpus teach anything the taxonomy lacks?

| | |
|---|---:|
| Processed files read | 262 of 3,238 |
| Concept records | 110,850 |
| Distinct curriculum labels (source headings dropped) | 10,743 |
| Covered by a canonical node | 4,918 |
| Not covered, taught in 2+ sources | 995 |
| — already inside a canonical root (granularity, not a gap) | 995 |
| — **needing a curriculum decision** | **0** |

Two independent comparisons — a US comparator and the local corpus — both find
no missing node. That is the evidence behind `GATE-TAX-001`.

Four labels needed a human decision and are written down so they are not
re-investigated: *Neuroscience* is the corpus's course name for `SYS-NEU`;
*Clinical Medicine* maps to `DIS-MED`; *HSV, VZV* is an abbreviation pair covered
by `SYS-INF-T02`; and *Medical Education* is curriculum administration, not
medical subject matter, and is deliberately outside the library.

Fixing the matcher mattered more than the filtering. The first run reported
*Histology* (31 sources) and *Medical Biochemistry* (8) as gaps because a
single-token guard rejected "Histology" ≈ "Histology & Cell Biology". Removing
the guard and relying on division and rank preference instead lifted subject-level
coverage from 51/98 to 84/93 and cut the AMBOSS ledger's low-confidence rows from
299 to 91.

### `TAX-RUNTIME-001` (2026-08-12)

The runtime tree carried 7 of the 19 canonical systems plus pharmacology, so 12
systems had no student-facing route at all. All 12 are added in one migration
(`LD-13`), generated from the canonical taxonomy rather than hand-typed.

| | Before | After |
|---|---:|---:|
| Runtime subjects | 8 | 20 (19 systems + pharmacology) |
| Curriculum nodes | 630 | 1,398 |
| Distinct labels | 582 | 812 |
| Mapped topics | 81 | 154 |
| Duplicate labels | 0 | 0 |

Two things the generation had to get right. Canonical topic titles repeat across
systems — a dozen roots have a "Structure and function" — so a colliding label is
prefixed with the system's adjective ("Immunological structure and function"),
keeping the one-label-one-home rule the validator enforces. And the canonical
tree carries US spellings from the supplied blueprint, so every generated runtime
label is converted to British spelling before it reaches a student.

### `TAX-COMPARE-001` finding (2026-08-12)

644 in-scope nodes across `By system`, `By discipline`, `Clinical knowledge` and
`Clinical skills`. The five out-of-scope roots were not walked.

| Disposition | Nodes |
|---|---:|
| already covered under a different Synapse label | 432 |
| secondary placement or cross-reference | 126 |
| metadata/filter, not a node | 64 |
| alias/spelling variant | 9 |
| useful rename or split | 6 |
| merge/de-duplication | 5 |
| outside Years 1–4 scope | 2 |
| **genuine undergraduate gap to add** | **0** |

**The canonical taxonomy already covers the comparator at undergraduate depth.**
299 rows are low confidence — but low confidence here means "inside the right
Synapse root, finer than its floor", which is an LD-04 granularity call for the
owning system's `INVENTORY-001`, not a missing node.

Three findings worth carrying forward:

- **AMBOSS's 19 systems are not Synapse's 19.** It splits biostatistics and
  social sciences into two roots and repeats the first under Clinical knowledge;
  Synapse merges all three into `SYS-POP`. Aligning the counts would be wrong.
- **`SYS-INF` has no AMBOSS analogue at all**, and the comparator under-weights
  schistosomiasis, leishmaniasis and hydatid disease. This is the one branch
  where following AMBOSS would actively narrow the product for Egyptian students.
- **64 nodes are a discipline lens, not subject matter** — AMBOSS repeats
  "Pathology", "Clinical correlations" and "Relevant pharmacology" under most
  systems. That is the same presentation-facet pattern the taxonomy review
  already rejected in the supplied blueprint.

| 2026-08-12 | `SYS-*-INVENTORY-001` ×19 | Classified all 1,325 nodes across the 19 systems and disposed of every article and concept touching them. **943 articles planned.** No content authored. | uncommitted | `medical:audit` pass, unchanged | `evidence/SYS-*-node-classification.json` ×19, `evidence/SYS-*-disposition-ledger.json` ×19, `scripts/build-system-inventory.mjs` | `SYS-FND-CONCEPT-001` |

| 2026-08-12 | `SYS-*-SOURCE-001` ×19 | Mapped every planned article to the processed corpus files that teach it, with page locators and review state. **627 of 943 (66%) have a processed local source.** No content authored. | uncommitted | read-only | `evidence/SYS-*-source-plan.{json,md}` ×19, `scripts/build-system-source-plan.mjs` | `SYS-FND-CONCEPT-001` |

| 2026-08-12 | `SYS-FND-CONCEPT-001` | Authored the first content batch: 5 concepts for `SYS-FND-T01-S01`, complete against the 54-field contract, with real corpus provenance and researched Arabic terms. Validated, **not yet imported**. | uncommitted | `medical:batch` clean — 5 items, 33 fields, all placements canonical, 0 errors | `docs/medical-library-program/batches/SYS-FND-CONCEPT-001.md`, `scripts/validate-content-batch.mjs` | `SYS-FND-CONCEPT-002` |

| 2026-08-12 | `PLAT-EVIDENCE-001` (`BLK-12`) | Built the missing import surface for claims, citations, sources and article spans. Extended the parity matrix to cover all four; still 0 gaps. | uncommitted | 122/122 tests · `medical:parity` 0 gaps · typecheck, lint, build clean | `src/data/evidenceImport.ts`, `src/pages/admin/EvidenceImportPage.tsx`, `src/data/evidenceImport.test.ts` | `SYS-FND-ARTICLE-001` |
| 2026-08-12 | `SYS-FND-CONCEPT-002` | Authored the evidence batch for the five concepts: 7 sources, 6 claims, 11 citations. Every claim carries an independent verification citation with a quoted support span. Validated, **not yet imported**. | uncommitted | `medical:batch` clean on all three files | `batches/SYS-FND-CONCEPT-002-{sources,claims,citations}.md` | Import, then `SYS-FND-ARTICLE-001` |

| 2026-08-12 | `SYS-FND-ARTICLE-001` | Authored the first four articles, plus six article spans completing the chain from sentence to source. Simulated the whole import against live state: **6 batches, 33 records, 0 rejected, audit clean.** | uncommitted | `medical:batch` clean ×6 · `medical:simulate` 0 errors · audit on the simulated state **0 errors** · 123/123 tests · typecheck, lint, build clean | `batches/SYS-FND-ARTICLE-001.md`, `batches/SYS-FND-ARTICLE-001-spans.md`, `scripts/simulate-content-import.mjs` | `SYS-FND-CONCEPT-003` |

| 2026-08-12 | `SYS-FND-CONCEPT-003` + `ARTICLE-002` | Cell cycle, receptors, second messengers and apoptosis: 4 concepts, 4 articles, 5 claims, 9 citations, 5 spans, 6 sources. **8 of 56 SYS-FND articles now authored.** | uncommitted | 12 batches validate clean · `medical:simulate` 0 rejected · audit on the simulated state **0 errors** · 123/123 tests · typecheck, lint, build clean | `batches/SYS-FND-CONCEPT-003*.md`, `batches/SYS-FND-ARTICLE-002*.md`, `scripts/build-corpus-source-index.mjs` | `SYS-FND-CONCEPT-004` |

| 2026-08-12 | `SYS-FND-CONCEPT-004..006` + `ARTICLE-003..005` | Human genetics, general pathology and general pharmacology. **Topics T01–T04 of SYS-FND are complete: 29 articles, 30 concepts, 36 claims, 64 citations, 42 sources, 37 spans.** | uncommitted | 24 batches validate clean · `medical:simulate` 0 rejected · audit on the simulated state **0 errors** · 123/123 tests · parity 0 gaps · typecheck, lint, build clean | `batches/SYS-FND-*` | `SYS-FND-CONCEPT-007` (T05 general microbiology) |
| 2026-08-12 | `SYS-CVS-PRACTICAL-001..009` | **First practical bank in the programme.** 46 items — 10 OSCE stations, 8 skills checklists, 12 clinical cases, 16 interpretation sets — carrying 140 questions and 214 mark-scheme items, covering all 98 concepts of the cardiovascular pilot (`SYS-CVS-T01`). Extended the practical contract first: per-option `Why:`, per-question `Concept:` and `Difficulty:`, item-level concept tagging, and `media_needed` so an unfulfilled asset is flagged without writing a URL the runner would try to load. 58 media requests raised, none embedded. `T02`–`T09` deliberately untouched — no articles or concepts exist to test. | uncommitted | 9 batches validate clean · `medical:simulate` applies 46 of 46, 0 rejected · difficulty exactly 25/55/15/5 · 133/133 tests · parity 0 gaps · audit 0 errors · typecheck, lint, build clean · imported and run in the app: per-option explanations and difficulty badges render, media-flagged items show no broken image | `batches/SYS-CVS-PRACTICAL-00{1..9}.md`, `src/data/contentControl.ts`, `src/data/bulkImport.ts`, `src/lib/useLivePracticals.ts`, `src/components/practical/PracticalRunner.tsx`, `src/components/admin/PracticalEditorDialog.tsx`, `scripts/validate-content-batch.mjs`, `docs/authoring/practical.md` | `SYS-FND-CONCEPT-007` (T05 general microbiology) |

| 2026-08-12 | `SYS-DEV-CONCEPT-001` + `ARTICLE-001` | Nutrition and the older-adult half of adult health: 11 articles, 11 concepts, 23 claims, 23 citations. Malnutrition in the full WHO sense (deficiency, excess and imbalance), undernutrition, micronutrient deficiency, nutrient excess, requirements, enteral and parenteral feeding, normal ageing, frailty, falls, polypharmacy. **10 of SYS-DEV's 33 article homes.** | committed | 66 batches validate clean · `medical:simulate` 0 errors · audit on the simulated state **0 errors** · 133/133 tests · lint clean | `batches/SYS-DEV-*`, `scripts/check-node-source-sense.mjs`, `scripts/build-corpus-concept-index.mjs` | `SYS-DEV-CONCEPT-002` (child and adolescent health) |

| 2026-08-12 | `SYS-DEV-CONCEPT-002..004` + `ARTICLE-002..005` | Child and adolescent health, the function and participation cluster, the well-patient topic, and the last four nodes — lifestyle, risk assessment, family history and school health. **`SYS-DEV` is complete: 33 of 33 article homes, 23 articles, 34 concepts, 36 relations.** | committed | all batches validate clean · `medical:simulate` 0 errors · audit on the simulated state **0 errors** · 151/151 tests · lint clean | `batches/SYS-DEV-*` | `SYS-CVS-CONCEPT-001` |

### SYS-FND progress (2026-08-12)

| Topic | Planned | Authored |
|---|---:|---:|
| T01 Cell & molecular biology | 8 | 8 |
| T02 Human genetics | 6 | 6 |
| T03 General pathology | 11 | 9 |
| T04 General pharmacology | 11 | 6 |
| T05 General microbiology | 12 | 0 |
| T06 Core mechanisms | 8 | 0 |
| **Total** | **56** | **29** |

T03 and T04 are short of their planned counts because several planned nodes
duplicate concepts already authored elsewhere — `SYS-FND-T03-S01-M03` *Apoptosis*
is the same subject as `SYS-FND-T01-S02-M04`, and `SYS-FND-T04-S02-M01`
*Receptors* the same as `SYS-FND-T01-S02-M02`. Under the one-canonical-item rule
those nodes take a secondary placement on the existing article rather than a
second article. The remaining T04 nodes — the four ADME sub-processes and special
populations — are folded into the pharmacokinetics article at this level and will
be split out only if the curriculum evidence justifies separate articles.

Cumulative simulated state: 145 → 174 articles, 1,718 → 1,748 concepts,
1,741 → 1,777 claims, 1,818 → 1,882 citations, 47 → 89 sources. Spans citing more
than one source: 83 → 111.

### Batch 003 and article 002 (2026-08-12)

Cumulative simulated state: 145 → 153 articles, 1,718 → 1,727 concepts,
1,741 → 1,752 claims, 1,818 → 1,838 citations, 47 → 60 sources,
1,720 → 1,731 spans. Twelve batches, 0 rejected, audit clean.

Two defects surfaced while authoring, both now fixed and guarded:

- **Three invented `src_` source IDs.** They passed every check, because nothing
  compared them with the corpus. They would have become citations pointing at
  sources that do not exist — precisely what "never invent an ID" forbids.
  `scripts/build-corpus-source-index.mjs` now indexes all 267 real source IDs and
  the batch validator rejects any other (`DEC-022`). The guard was tested by
  feeding it a fabricated ID.
- **A semicolon inside a teaching point split it in two.** `hold_these` used the
  general list splitter, which treats `;` as a separator. Because callout
  evidence keys on the exact text, the split quietly detached that line from its
  evidence and it would have failed to publish for no visible reason
  (`DEC-021`).

### The simulated import (2026-08-12)

`npm run medical:simulate` applies authored batches to a copy of the live state
using the real importer functions, and reports what changed. It reads the
migration bundle rather than the database, needs no credentials, and writes
nothing unless `--emit` is given.

| | Before | After |
|---|---:|---:|
| Articles | 145 | 149 |
| Concepts | 1,718 | 1,723 |
| Claims | 1,741 | 1,747 |
| Citations | 1,818 | 1,829 |
| Sources | 47 | 54 |
| Article spans | 1,720 | 1,726 |

**0 rows rejected. `medical:audit` on the emitted state: 0 errors.**

The simulation earned its place immediately. It found four defects that every
per-file check had passed:

1. **An ordering trap.** Claims were rejected for having no citation, then the
   citations were rejected because their claims had never landed. The cause was
   asserting verification status rather than deriving it (`DEC-017`).
2. **`undefined` does not survive `JSON.stringify`.** Twenty-four "field absent"
   errors traced to optional keys being written as `undefined` and vanishing on
   persist (`DEC-018`).
3. **Placement resolution lived in the import page**, so a scripted import
   silently produced concepts with no `subjectId` and no placement (`DEC-020`).
4. **A contract that assumed every concept came from the pipeline.**
   `resourceOccurrenceIds` cannot exist for a hand-authored concept, and the
   corpus supplies no occurrence identifiers for these nodes (`DEC-019`).

Reader verification on the simulated state: the four articles render with their
reviewed traps and "Hold these" intact, "Read next" resolves with its per-pair
reasons, and canary checks confirm no image recommendation, concept ID or
relation name reaches the DOM. No console errors.

### `BLK-12` — the blocker `SYS-FND-CONCEPT-002` found (2026-08-12)

Trying to lift batch 001 out of `needs_evidence` surfaced a gap Phase 0 had
missed: **claims, citations, sources and article spans had no import path at
all.** They existed only as output of the generation pipeline. The parity matrix
had not caught it because those types live in `medicalEvidence.ts`, not in the
authoring contracts it walked.

The consequence was quiet and total: a concept could be authored perfectly and
still never leave `needs_evidence`, because there was nowhere to record the
source supporting it. The five corpus files behind batch 001 were not in the
evidence store either, so no citation could even name them.

The surface now exists, with the rules the field audit enforces at rest applied
at import time instead — a citation that counts as evidence must carry an exact
locator, a claim may only be `verified` when a counting citation resolves, and a
`treatment_or_action` claim needs two independent citations. Catching those
before the write means the store never holds an unsupported claim, even briefly.
The parity matrix now covers all four types and still reports zero gaps.

### First evidence batch (2026-08-12)

`SYS-FND-CONCEPT-002`: 7 sources, 6 claims, 11 citations for the five concepts
in batch 001.

Every claim carries an independent verification citation whose support span is
**quoted from the source**, not paraphrased — from OpenStax *Anatomy and
Physiology 2e* §3.1 and §3.2, and NCBI *Molecular Biology of the Cell* 4e. Each
also carries a local curriculum citation naming the Alexandria or Fayoum file and
its page, marked `counts_as_claim_evidence: no` with a context note explaining
why: the corpus records a taught **heading**, not a sentence, so it establishes
that the topic is examined here without supporting the claim's wording.

That split is `DEC-015`, and it is what makes `LD-08` auditable rather than a
slogan: the corpus decides emphasis, authoritative sources decide fact, and the
record says which did which.

### First content batch (2026-08-12)

`SYS-FND-CONCEPT-001` covers the four microtopics of *Cell structure and
organelles*: plasma membrane, selective permeability, cytoskeleton, cell nucleus,
mitochondrion.

It is the proof that the Phase 0 pipeline works end to end. Each concept carries
a definition, an explicit assessable objective, a specific pitfall, a canonical
primary placement and reviewed secondary placements, honest weights with a low
`weightConfidence`, an Arabic label, and real `source_candidate_ids` naming the
Alexandria, Fayoum and Zagazig source files that teach it — with their processing
state, so a review-required source is visible as such.

Nothing is invented to fill a field. Where a field cannot be filled honestly it
carries a `fieldNotes` reason: module IDs are blank because no verified live
module ID exists, file-resource approvals because the PDFs are still pending
upload. Every concept records its own `uncertainty` and `evidenceGaps` rather
than presenting extraction as verification, and all five sit at
`publication_status: needs_evidence` — authored is not verified.

### All 19 source plans (2026-08-12)

| | |
|---|---:|
| Planned articles | 943 |
| — with a processed local source | 627 (66%) |
| — authored from authoritative sources only | 316 (34%) |

The 316 without a local source are not blocked. Under `LD-14` they are authored
from current authoritative sources, and the missing local emphasis is a recorded
coverage risk. The distribution matches what the corpus readiness predicted:
`SYS-PSY` is worst at 10 of 40, and `SYS-POP` next at 32 of 62 — both are
greenfield systems in areas the processed corpus barely touches.

### All 19 inventories (2026-08-12)

| | |
|---|---:|
| Nodes classified | 1,325 |
| — navigation-only hubs | 381 |
| — overview articles | 19 |
| — atomic article homes | 924 |
| — legitimate empty destinations | 1 |
| **Planned articles** | **943** |
| Nodes the corpus actually teaches | 335 |
| `BLK-09` articles to correct | 62 |
| `BLK-09` concepts to correct | 736 |

Every existing article is `enrich`, not `keep`: none carries statement
annotations, image recommendations or per-line callout evidence, all three of
which Phase 0 made possible and none of which exists yet.

`SYS-PSY`, `SYS-MUL` and `SYS-POP` have no article, concept or relation at all —
138 planned articles with nothing to build on.

### Phase 0 outputs (2026-08-12)

**New modules**

| Path | What it does |
|---|---|
| `src/data/importSemantics.ts` | `replace` / `append` / `clear` / untouched list semantics (`DEC-010`) |
| `src/data/importMerge.ts` | Deep, non-destructive update merge; `materialiseNewItem` fills the arrays the audit requires |
| `src/data/calloutPolicy.ts` | Per-line publish decision and admin-readable reason for `holdThese` and `loseTheMark` |
| `src/data/articleProjection.ts` | The whole student projection, extracted from the React hook so it is testable and so the leak test exercises the real path |
| `src/data/conceptImport.ts` | Complete `Concept` (54) and `ConceptRelation` (11) import contracts |
| `src/data/subjectsImport.ts` | Subjects & Topics structural contract, rename-vs-move, impact report |
| `src/pages/admin/RelationsImportPage.tsx` | The relation import surface that did not exist |
| `src/pages/admin/ImageRecommendations.tsx` | Admin backlog view, filterable by system, article, priority and status |
| `scripts/report-import-field-parity.mjs` | The parity report — model fields read from source at run time, so it cannot drift |

**New tests — 102 passing, up from 25**

| File | Covers |
|---|---|
| `src/data/calloutPolicy.test.ts` | The five required reader-level callout tests, plus mixed and blank cases |
| `src/data/articleProjection.test.ts` | Related reading and annotation projection; no raw ID reaches a student |
| `src/data/bulkImport.test.ts` | Full-field article round trip; annotation quote verification; partial update preserves nested data |
| `src/data/conceptImport.test.ts` | Full-field concept and relation round trips; merge lineage survives; duplicate-edge refusal |
| `src/data/subjectsImport.test.ts` | Rename moves rather than duplicates; cross-system move; one-label-one-home; impact report |
| `src/data/imageRecommendations.test.ts` | Canary strings absent from every student projection path |
| `src/data/authoringDocs.test.ts` | Fails when the importer and `docs/authoring/` drift apart |

**Evidence**

- `docs/medical-library-program/evidence/field-parity-matrix.json` / `.md` — 0 gaps
- `docs/authoring/*.md` updated for every new field; the drift test enforces it

**Behaviour a student will notice**

- Reviewed "Where people lose the mark" and "Hold these" now survive the evidence
  gate on all 17 published articles, where both were previously discarded.
- The two fabricated generic traps are gone. A panel with nothing reviewed to say
  now says nothing.
- A "Read next" panel appears, built from the 433 authored links that previously
  reached no one.

---

## 10. Recovery protocol

| Situation | Recovery |
|---|---|
| **Interrupted import** | Read the import journal written by `BulkImportPage` (keyed by file fingerprint + row keys). Re-run the *same* file: completed row identities are recorded and are not imported twice. If the journal is missing, do **not** re-import blind — export the current ledger, diff against the source file by stable ID, and import only the missing IDs in `update` mode. |
| **Failed batch mid-way** | The batch boundary in every task is defined so a partial batch is valid, not corrupt. Set the task to `Blocked`, record the last successful row/record ID in the task's evidence line, and resume from that ID. Never restart a partially applied batch from row 1 in `create` mode. |
| **Partial migration** | Every migration script under `server/scripts/` requires `MEDICAL_LIBRARY_APPLY=<migration-id>` and runs in one transaction with a scoped recovery snapshot recorded in `app_state_versions`. To recover: check `schema_migrations` for the ID; if absent, the transaction rolled back and the migration can be re-run; if present, restore from the `app_state_versions` row rather than re-running. Rehearse with `--source server/data/medical-library-v1.json --emit /tmp/after.json` before any `--commit`. |
| **Changed source corpus** | The corpus is dated (`Resources Digestion Current aug 7`). If it is replaced, re-read `_coordination/current-taxonomy-progress.json` and recompute the readiness table in §6 **before** trusting any system plan's §4. Records whose `review_state` changed from complete to retracted must have their derived claims re-checked, not silently kept. |
| **Stale generated artifact** | `src/data/medicalLibraryTaxonomy.generated.ts` and `server/data/medical-library-v1.json` are generated. If any figure in §6 disagrees with a validator, rebuild with `npm run medical:build`, then re-run `npm run medical:audit`, then update §6 in the same session. Never edit a generated file by hand. `BLK-11` is an open instance of exactly this. |
| **Lost context mid-task** | Every executable task records: objective, non-goals, dependencies, files touched, batch boundary, acceptance criteria, validation commands, evidence paths, rollback method, and next task ID. Re-read the task; do not reconstruct intent from the diff. |

---

# Phase 0 — Platform readiness (blocking)

> **No taxonomy or medical-content execution begins until every Phase 0 blocker
> is closed and its evidence is linked in this plan.**

## 0A. Full bulk-import field parity

### `PLAT-PARITY-001` — Field-parity matrix
- **Status** **Done** 2026-08-12 · **Evidence** `scripts/report-import-field-parity.mjs`, `docs/medical-library-program/evidence/field-parity-matrix.{json,md}`
- **Was** Not started · **Depends on** nothing · **Next** `PLAT-IMPORT-001`
- **Objective / non-goals / files / commands / stop condition** — see [§2](#2-start-here-next).
- **Acceptance** Generated manifest covers 100% of fields on `ArticleAuthoringData`, `Concept`, `ConceptRelation`, `ConceptAnnotation`, `QuestionAuthoringData` + `QuestionTags`, the practical union types, `ResourceAuthoringData`, and the Subjects & Topics node types. Every field has a state for all ten chain stages. No field is marked `n/a` without a reason string.
- **Rollback** Delete the three new files.

### `PLAT-IMPORT-001` — Article import: full contract + upsert semantics
- **Status** **Done** 2026-08-12 · **Evidence** `src/data/bulkImport.ts`, `src/data/importSemantics.ts`, `src/data/importMerge.ts`, `src/data/bulkImport.test.ts`
- **Was** Not started · **Depends on** `PLAT-PARITY-001` · **Next** `PLAT-ANNOT-001`
- **Objective** Extend the article import schema and `importRowToContent` to cover all 43 `ArticleAuthoringData` fields, with explicit list semantics.
- **Non-goals** Annotations (that is `PLAT-ANNOT-001`). Image recommendations (`PLAT-IMAGE-001`).
- **Required behaviours**
  - Stable-ID upsert (`update`) and create-only modes — both already exist in `BulkImportPage` and must be preserved, not replaced.
  - Explicit `replace` / `append` / `clear` semantics per list and per nested object. A partial update must not erase nested data. The current `mergeImported` spreads `imported` over `existing`, so **any absent nested field currently survives but any present-but-empty array silently wipes it** unless `overrideEmpty` is off — this asymmetry must become explicit and documented.
  - Referential validation before commit: every `relatedConceptIds`, `relatedArticleIds`, `claimIds`, `spanIds`, `resourceIds`, `primaryNodeId`, `secondaryNodeIds`, `universityIds`, `yearIds` must resolve, with row-level, actionable errors.
  - Unknown columns must be reported, never silently ignored.
  - Resumable batches and an import journal (already present — extend, do not rewrite).
  - Dry-run/full preview and machine-readable results.
- **Acceptance** A round-trip fixture containing **every** field imports, and deep-equals the source apart from documented generated metadata (`updatedAt`, generated row IDs). Markdown, CSV and XLSX mappings each tested where the formats differ.
- **Batch boundary** Article import only. Do not touch concept, question or practical import in this task.
- **Validation** `npm test`, `npm run medical:validate:authoring`, `npm run build`
- **Evidence** `docs/medical-library-program/evidence/roundtrip-article.json`
- **Rollback** Revert the commit; the importer is additive and no content is written by this task.

### `PLAT-ANNOT-001` — Statement annotations: import, validate, preserve *(blocks all article authoring)*
- **Status** **Done** 2026-08-12 · **Evidence** `parseAnnotations`/`annotationErrors` in `src/data/bulkImport.ts`, 5 tests
- **Was** Not started · **Depends on** `PLAT-IMPORT-001` · **Next** `PLAT-CONCEPT-001`
- **Objective** Make `annotations` fully importable and updatable. This closes `BLK-01`.
- **Design (per `DEC-006`)** A repeating block keyed on the verbatim quote, mirroring the proven `Anchor:` pattern in `parseArticleMedia`:
  ```
  ## annotations
  ### definition_of · med.concept.cardiac-output
  Quote: the volume of blood ejected by one ventricle in one minute
  Block: body
  Id: ann-cvs-co-001
  ```
- **Required validation, all pre-commit and row-level**
  - The quote occurs **verbatim** in the stated block of that article (`summary`, `body`, `hold`, `trap`). A quote that does not occur is a row error, never a silent drop.
  - The `conceptId` exists.
  - The relation is one of `STATEMENT_RELATIONS` (`definition_of` plus the 26 `CONCEPT_RELATIONS`).
  - `id` is stable; omitting it derives a deterministic ID from article + quote hash, so re-import is idempotent.
- **Acceptance** Annotations survive an `update`-mode re-import unchanged. A quote-mismatch produces a row error naming the article, the block and the offending quote. Round-trip fixture deep-equals.
- **Batch boundary** Annotations only.
- **Validation** `npm test`, `npm run medical:audit`
- **Rollback** Revert; no content written.

### `PLAT-CONCEPT-001` — Concept import: full contract + upsert
- **Status** **Done** 2026-08-12 · **Evidence** `src/data/conceptImport.ts`, `src/pages/admin/ConceptsImportPage.tsx`, `src/data/conceptImport.test.ts`
- **Was** Not started · **Depends on** `PLAT-ANNOT-001` · **Next** `PLAT-RELATION-001`
- **Objective** Cover all 54 `Concept` fields; replace create-only with stable-ID upsert. Closes `BLK-02`.
- **Must include** aliases, reviewed Arabic fields, `explicitObjective`, `conceptType`, placement (`primaryNodeId` / `secondaryNodeIds` and the visible curriculum IDs), scope, weights with `weightConfidence`, pitfalls, `atomicClaimIds`, `resourceOccurrenceIds`, `supportMode`, `confidence`, `conflicts`, `uncertainty`, `evidenceGaps`, `mergeIds`, `rejectedMergeCandidateIds`, `originalWording`, governance fields, publication state, `exclusionReason`, and `fieldNotes` for intentional blanks.
- **Must not** force `articleIds: []` on update. Reciprocal article↔concept links must be maintained, not reset.
- **Acceptance** Round-trip fixture; re-importing the 1,718 existing concepts in `update` mode is a no-op diff.
- **Rollback** Revert.

### `PLAT-RELATION-001` — Typed concept-relation import
- **Status** **Done** 2026-08-12 · **Evidence** `src/pages/admin/RelationsImportPage.tsx`, `RELATION_IMPORT_FIELDS`, 8 tests
- **Was** Not started · **Depends on** `PLAT-CONCEPT-001` · **Next** `PLAT-SUBJECTS-001`
- **Objective** Create the missing relation import surface. Closes `BLK-03`.
- **Must include** all 11 `ConceptRelation` fields including `evidenceClaimIds`, `citationIds`, `confidence`, `verificationStatus`, `qualifiers`, `reviewer`, `reviewedAt`.
- **Must validate** both endpoints exist; the type is one of the 26; the edge is de-duplicated (same source/type/target); direction is as stated; a relation may only be `verified` when its claim-and-citation chain resolves — matching the rule the field audit already enforces.
- **Acceptance** Round-trip fixture; importing the 47 existing relations is a no-op diff; a relation with an unresolvable claim ID is rejected with a row error.
- **Rollback** Revert.

### `PLAT-SUBJECTS-001` — Subjects & Topics import: structural contract
- **Status** **Done** 2026-08-12 · **Evidence** `src/data/subjectsImport.ts`, `src/pages/admin/SubjectsImportPage.tsx`, `src/data/subjectsImport.test.ts`
- **Was** Not started · **Depends on** `PLAT-RELATION-001` · **Next** `PLAT-QP-001`
- **Objective** Replace the five-column title path with the full editable structural contract. Closes `BLK-04`.
- **Must include** stable IDs and upsert; titles at all five levels; level-specific metadata; system `short` label and `color`; `crossRefs`; and the resulting canonical crosswalk effect.
- **Must produce** a safe rename/move **impact report** before commit: which articles, concepts, questions and resources reference the affected node IDs, and what the crosswalk would resolve to afterwards.
- **Acceptance** A rename moves a node; it does not create a second one. The impact report is machine-readable. `npm run medical:validate:authoring` still passes (one label, one home; no unresolved cross-references).
- **Rollback** Revert; the taxonomy state is versioned in `app_state_versions`.

### `PLAT-QP-001` — Question and practical import capability
- **Status** **Done** 2026-08-12 · **Evidence** question attachments and authoring fields in `src/data/bulkImport.ts`; parity report shows 12/12 and 21/21
- **Was** Not started · **Depends on** `PLAT-SUBJECTS-001` · **Next** `PLAT-TEMPLATE-001`
- **Objective** Bring question and practical import to full field parity — **capability only**.
- **Explicit constraint (LD-10, as waived by `DEC-023`)** This task creates no question or practical **content** — it is a capability task. Fixtures used here are synthetic test fixtures, kept under `scripts/fixtures/`, and are never imported into the live ledger. Content authoring is now permitted elsewhere against concepts that already have articles.
- **Must include** `attachments`, per-answer explanations, the full nested `QuestionTags`, and for practicals the nested actor sections, mark sections, decisions and lab questions.
- **Acceptance** Round-trip fixtures for all five practical types and for a fully-populated question.
- **Rollback** Revert.

### `PLAT-TEMPLATE-001` — Generate importer examples from the schema
- **Status** **Done** 2026-08-12 · **Evidence** `src/data/authoringDocs.test.ts`; `docs/authoring/*.md` updated for every new field
- **Was** Not started · **Depends on** `PLAT-QP-001` · **Next** `PLAT-IMAGE-001`
- **Objective** Stop the authoring templates and `markdownExample` strings drifting from the real schema.
- **Approach** Generate them from the schema, or add a test that fails when a documented field is absent from the schema or a schema field is undocumented. Either satisfies the requirement; generation is preferred.
- **Acceptance** A test fails if a field is added to `IMPORT_SCHEMAS` without a corresponding entry in `docs/authoring/`.
- **Rollback** Revert.

## 0B. Admin-only image recommendations

### `PLAT-IMAGE-001` — First-class image/visual recommendation model
- **Status** **Done** 2026-08-12 · **Evidence** `ImageRecommendation` in `src/data/contentControl.ts`, `src/pages/admin/ImageRecommendations.tsx`, `src/data/imageRecommendations.test.ts`
- **Was** Not started · **Depends on** `PLAT-TEMPLATE-001` · **Next** `PLAT-READER-001`
- **Objective** Add a dedicated recommendation record. Closes `BLK-08`.
- **Explicitly not** a reuse of `ArticleMediaRecord`. That type is a *student media* record whose release is governed by `isMediaReleased`; overloading it would put an unfulfilled recommendation one `releaseWithoutReview` flag away from a student.
- **Fields** stable recommendation ID · article ID · visual type/brief (diagram, anatomy plate, histology, flowchart, graph, comparison table, imaging example, algorithm, …) · exact teaching purpose and why prose is insufficient · recommended section/block and optional exact anchor quote · priority (`required` / `strongly helpful` / `optional`) · status (`needed` / `planned` / `supplied` / `declined`) · admin notes · suggested source direction · rights/licensing notes · linked final media ID when fulfilled.
- **Also** bulk-importable; editable and filterable in the admin dashboard; an admin coverage view filterable by system, article, priority and status.
- **Acceptance** Automated tests prove a recommendation appears in **no** student-facing surface: not in the published article, not in the reader HTML, not in search data, not in the student API or state. This is a leak test, and it must fail loudly if the type is ever added to a student projection.
- **Rollback** Revert; the type is additive.

## 0C. Student-facing connections and teaching callouts

### `PLAT-READER-001` — Related reading reaches the student
- **Status** **Done** 2026-08-12 · **Evidence** `relatedArticleLinks` in `src/data/articleProjection.ts`, "Read next" panel, 6 tests
- **Was** Not started · **Depends on** `PLAT-IMAGE-001` · **Next** `PLAT-CALLOUT-001`
- **Objective** Carry `relatedArticleIds` through the projection and render a useful related-reading surface. Closes `BLK-05`.
- **Files** `src/data/library.ts` (`Subtopic`), `src/lib/useLiveLibrary.ts` (`articleToSubtopic`, `overlaySubtopic`), `src/pages/student/Library.tsx`
- **Must** deep-link validly, de-duplicate, filter by evidence/publication state so a link never points at something the student cannot open, and drop dead IDs rather than rendering them.
- **Acceptance** Reader-level test: an article with 3 valid related IDs and 1 dead ID renders 3 working links and no dead entry. The 433 existing links resolve or are reported.
- **Rollback** Revert.

### `PLAT-CALLOUT-001` — "Hold these" and "Where people lose the mark" publish correctly
- **Status** **Done** 2026-08-12 · **Evidence** `src/data/calloutPolicy.ts`, fabricated fallback deleted from `Library.tsx`, 11 tests
- **Was** Not started · **Depends on** `PLAT-READER-001` · **Next** `PLAT-ANNOT-CONSUMER-001`
- **Objective** Fix the evidence/publication projection so reviewed, verified callouts survive the gate. Closes `BLK-06` and `BLK-07`.
- **The defect, precisely**
  - `useLiveLibrary.ts:108` — `(isEvidenceGated ? [] : d?.loseTheMark ?? [])` discards every authored trap the moment an article has `publishedSections`.
  - `Library.tsx:818` — when no trap callout survives, the reader substitutes two hardcoded generic sentences and labels the panel `Math.max(2, traps.length)` traps. A student is shown filler presented as this article's traps.
  - `useLiveLibrary.ts:126` — `isEvidenceGated && !hasNarrative` replaces authored `holdThese` with the first five fact spans.
- **This must not be solved by exposing unverified text.** Instead, give each callout its own explicit projection policy: a callout is publishable when it carries its own evidence link (claim/citation or span) **or** is explicitly marked reviewed by the article's governance fields. Callouts that fail their policy stay hidden and are reported to the admin with the reason.
- **Acceptance — automated reader-level tests, all five required**
  1. The exact reviewed authored trap is visible after publication.
  2. Generic fallback text is **not** substituted when authored published traps exist.
  3. Unverified draft traps remain hidden.
  4. `holdThese` follows the same stated policy.
  5. The admin can see, per callout, why it is or is not publishable.
- **Note** Also resolve `BLK-10` here or in a paired task: `Published` status and `publicationGate: needs_evidence` currently coexist on all 17 published articles, and a callout policy that keys on the gate will behave unpredictably until that is reconciled.
- **Rollback** Revert.

### `PLAT-ANNOT-CONSUMER-001` — Annotations get a meaningful consumer
- **Status** **Done** 2026-08-12 · **Evidence** `readerAnnotations` in `src/data/articleProjection.ts`, 5 tests
- **Was** Not started · **Depends on** `PLAT-CALLOUT-001` · **Next** `PLAT-GATE-001`
- **Objective** Define which annotations create inline concept affordances for students, which remain admin-only metadata, and how publication filtering applies.
- **Must not** show raw IDs, relation names or editor-only metadata to students.
- **Acceptance** An annotation on a published, evidence-passing concept renders as an inline affordance; an annotation pointing at an unpublished concept renders as plain text with no dead affordance; no raw ID appears in the DOM.
- **Rollback** Revert.

### `PLAT-GATE-001` — Reconcile publication status with the evidence gate
- **Status** **Deferred to Phase 1** · **Depends on** an owner-approved database migration · **Next** `TAX-COMPARE-001`
- **Why it no longer blocks.** This task closes `BLK-10` and `BLK-11`, which are
  **data** inconsistencies, not platform gaps. The callout policy delivered by
  `PLAT-CALLOUT-001` decides publication per line on its own evidence and does
  **not** read `publicationGate`, so the status/gate disagreement can no longer
  cause a student to see the wrong thing. Applying the v9 narratives requires
  `MEDICAL_LIBRARY_APPLY` against the production database — an owner action, not
  an agent one. `GATE-PLATFORM-001` therefore passes without it, and the two
  blockers stay open and visible in §7.
- **Objective** Resolve `BLK-10` and `BLK-11`: make `status: Published` and `publicationGate` consistent, and rebuild the generated artifact so it reflects the intended reader experience.
- **Acceptance** No article is `Published` while its gate says `needs_evidence`, or the discrepancy is explicitly modelled and documented. `npm run medical:build && npm run medical:audit` pass. The 23 unapplied narratives are either applied under their migration or explicitly deferred with a reason recorded in §9.
- **Rollback** The migration's own `app_state_versions` snapshot.

## 0D. Readiness acceptance gate (`GATE-PLATFORM-001`)

All of these must pass, and their output must be linked in §9, before Phase 1
begins.

```bash
npm run medical:validate:authoring
npm run medical:validate:taxonomy
npm run medical:build && npm run medical:audit
npm test
npx tsc -b
npm run build
npm run lint
node --experimental-strip-types scripts/report-import-field-parity.mjs
```

Plus, as tests rather than commands:

- Round-trip fixtures pass for all five content types with **every** field
  populated.
- The five reader-level callout tests pass.
- The related-reading test passes.
- The image-recommendation leak test passes.
- The annotation quote-verification tests pass.

---

# Phase 1 — Validate and refine the structure against AMBOSS

Blocked by `GATE-PLATFORM-001`. **No structural change is made during planning.**

Answer `OQ-01` before checking in any ledger that reproduces AMBOSS node titles.

### `TAX-COMPARE-001` — Build the crosswalk and disposition ledger
Compare three trees: the canonical taxonomy (1,883 nodes / 4 views), the runtime
curriculum tree (630 nodes / 8 subjects), and the AMBOSS hierarchy (8,061 nodes /
8 roots / 1,502 unique articles / 5,903 duplicate placements).

Classify **every** candidate difference as exactly one of:

`genuine undergraduate gap to add` · `useful rename or split` ·
`merge/de-duplication` · `move of canonical home` ·
`secondary placement or cross-reference` · `alias/spelling variant` ·
`metadata/filter, not a node` · `outside Years 1–4 scope` ·
`AMBOSS-specific and rejected` · `already covered under a different Synapse label` ·
`unresolved; requires qualified curriculum or faculty evidence`

Each proposed change records: existing node · proposed change · rationale ·
source(s) · affected IDs/records · migration plan · crosswalk impact ·
student-navigation impact · rollback strategy.

**Already-decided rejections** (recorded here so they are not re-argued per
system): the `Osteopathic medicine`, `On-call survival guide`,
`Clerkship survival guide`, `Transition to residency` and `CME-eligible articles`
roots; the USMLE and PANCE content-outline nodes; and AMBOSS's US-specific level
naming and filter structure. All are `AMBOSS-specific and rejected` or
`outside Years 1–4 scope`.

**Known structural observations to resolve, not assume:**
- AMBOSS `By system` has **19** children and Synapse has **19** system roots, but
  they are not the same 19. AMBOSS splits `Biostatistics and epidemiology` and
  `Social sciences` as separate systems and has no dedicated infection root;
  Synapse merges the first two into `SYS-POP` and adds `SYS-INF`. Neither is
  wrong. Record the mapping, do not align the counts.
- AMBOSS has no separate `Human development` equivalent to `SYS-DEV`'s life-course
  framing, and no `Multisystem processes` equivalent that includes perioperative
  and palliative care. These are Synapse additions the taxonomy review already
  justified.
- `KNW-CON` (Conditions & syndromes) is a knowledge root with **0 children** by
  design — its generic descendants were removed and the route is meant to be
  generated from canonical condition articles. That generation does not exist
  yet. Decide in Phase 1 whether to build it or to mark the root as a legitimate
  planned-empty destination.

### `TAX-GAP-001` — Gap list with confidence and evidence
Every gap carries a confidence band and its evidence. A gap sourced only from
AMBOSS is `structure-only` and cannot justify a node on its own under LD-08.

### `TAX-PATCH-001` — Proposed taxonomy patch batches
Small, independently validatable batches. Each ends with
`npm run medical:validate:taxonomy && npm run medical:validate:authoring`.

### `TAX-RUNTIME-001` — Runtime-tree expansion plan
From 8 subjects toward full 19-system coverage. Blocked on `OQ-03`.

### `TAX-MIGRATE-001` — ID migration and redirect map
Under LD-06: no ID disappears without a redirect and an impact analysis.

**Gate:** `GATE-TAX-001`.

---

# Phase 2 — Article and concept programme

Blocked by `GATE-TAX-001`. Executed system-by-system in the
[table order](#systems). Each system's detail lives in its own plan.

## Source and truth policy

- **AMBOSS** — structure and coverage comparator only. Do not copy prose,
  tables, proprietary media, or hierarchy wholesale. Never the sole factual
  authority.
- **University corpus** — curriculum and exam signal plus candidate evidence.
  Preserve source-relative path, resource ID/hash, exact locator, support span,
  confidence, uncertainty, and processing/review state. **Extraction confidence
  is not medical verification.** Records in `semantic_analysis_pending`,
  `candidate_retracted_do_not_rely`, `explicit_blocker`, or any
  `*_review_required` state are coverage risks, not evidence.
- **Web** — research freely; prefer current primary and authoritative sources:
  official guidelines and public-health bodies, recognised professional
  societies, current consensus documents, peer-reviewed reviews, authoritative
  open textbooks, and Egyptian/regional sources where local epidemiology,
  availability or policy matters. Record URL, title, publisher/body,
  publication/update date, access date, jurisdiction, and the exact claim or
  section supported.
- Independently corroborate treatment, dosing, emergency, procedure,
  recommendation and time-sensitive claims. Record conflicts in `conflicts`
  rather than silently choosing a source.

## Article catalogue rules

For every in-scope canonical node, choose exactly one classification:

`navigation-only hub` · `overview article` · `atomic article home` ·
`secondary placement only` · `empty but legitimate planned destination`

An article is a distinct studiable unit. It applies one of the 10 archetypes and
that archetype's exact section contract from `src/data/articleTemplates.ts`.
Split genuinely mixed archetypes; merge duplicates; preserve stable IDs when
updating.

Every planned article accounts for: identity, aliases, Arabic/title policy,
language and learner stage · template/archetype and complete required sections ·
canonical primary and secondary placements · university/year/module scope and
university-specific notes · complete readable prose and a safe published
projection · `holdThese` and `loseTheMark`, each specific, useful and
evidence-governed · exact statement annotations for definitions, mechanisms,
relationships and contrasts · related concepts with reciprocal links · related
articles with a reason per connection · resource IDs, article-level sources,
claims, stable spans, citations, evidence basis, conflicts, gaps, freshness,
review dates and publication gate · admin-only image recommendations where a
visual is required or materially improves understanding · question/practical
coverage **notes only**.

**Image recommendations are not decorative.** Flag visuals particularly where
spatial anatomy, histology, embryology, pathways, mechanism sequences, graphs,
tables, algorithms, imaging, morphology, or physical-examination findings are
hard to understand reliably from prose alone.

## Concept and relationship rules

Concepts are the smallest assessable objectives, not article headings.
Canonicalise before minting. Preserve provenance and merge lineage across the
152,147-candidate corpus — 108 merge records already exist and must not be lost.

Every concept accounts for its complete model: aliases, reviewed Arabic fields,
definition, explicit objective, type, placement, scope, weights with honest
confidence, pitfalls, sources, claims, occurrences, conflicts, uncertainty,
evidence gaps, governance, publication state, and intentional-empty reasons.

Prioritise these relationship families: prerequisites and learning order ·
part/whole and anatomy/spatial · mechanism sequences · causal, increasing,
decreasing and regulatory · presentation, diagnosis, investigation, treatment,
contraindication, complication and differential · contrasts and
`often_confused_with` · cross-system connections that help a student transfer a
mechanism.

**No graph noise.** Each edge is meaningful, correctly directed, de-duplicated
and evidence-governed. A relation is `verified` only when its claim-and-citation
chain passes validation. The current graph — 47 edges over 1,718 concepts, 0
verified, 9 of 26 types used — is the baseline this must improve on honestly,
not a template to scale up.

## Existing content

Before proposing any new record, inventory every existing article, concept,
relationship, annotation, placement, source and publication state for that
system. For each existing record choose one of: `keep` · `enrich` · `correct` ·
`merge` · `split` · `redirect` · `deprecate` · `exclude`, and state why.
Preserve stable IDs and references wherever possible.

Plan the repair of current anomalies rather than assuming they are valid or
deleting them — in particular `BLK-09` (62 articles and 736 concepts on the
non-contract `subjectId: "medical"`).

---

# Library Completion Gate

`GATE-LIBRARY-001`. Must pass across all 19 systems **and** all discipline,
skills and knowledge placements before any assessment authoring begins.

| # | Criterion | Measure |
|---:|---|---|
| 1 | Approved taxonomy/crosswalk with no structural validator errors | `medical:validate:taxonomy` and `medical:validate:authoring` both `passed: true` |
| 2 | Every in-scope node classified | count of classified nodes = count of in-scope nodes; no node unclassified |
| 3 | All planned atomic and overview articles complete, or explicitly excluded with rationale | per-system §7 ledger closed |
| 4 | Every article satisfies its archetype and complete field contract | `medical:audit` `errors: []` **and** `missingRequiredSections` empty for every article |
| 5 | All concepts canonicalised, non-orphaned, reciprocally linked | 0 concepts without a reciprocal article link; 0 unreviewed concepts without an `exclusionReason` |
| 6 | Relationship coverage meets defined usefulness thresholds, no broken IDs | ≥80% of retained concepts carry ≥1 typed relation; 0 relations with an unknown endpoint |
| 7 | Every student-visible medical span and callout passes its evidence policy | 0 student-visible spans without a resolving claim/citation chain |
| 8 | "Hold these" and "Where people lose the mark" publish correctly | the five `PLAT-CALLOUT-001` reader tests pass on the full corpus, not just fixtures |
| 9 | Statement annotations and related-article connections function end to end | annotation and related-reading tests pass; 0 dead IDs |
| 10 | Admin-only image recommendations exist where needed and never leak | leak test passes; 0 `required`-priority recommendations in `needed` state on a `Published` article without a recorded exception |
| 11 | Publication status and remaining faculty-review queues explicit | every article and concept has a status; the `faculty_review` queue is enumerated with owners |
| 12 | Content, taxonomy, authoring, import, reader, typecheck and build tests pass | the full `GATE-PLATFORM-001` command list, re-run |
| 13 | Unresolved source gaps, conflicts and blockers documented rather than hidden | §7 has no `Not started` blocker; every `evidenceGaps` and `conflicts` entry has an owner |

Until this gate is recorded as passed in §9, assessment work is limited to
coverage counts, intended concept targets, proposed formats, and dependency
notes inside the system plans (§13). No stems, options, station briefs, mark
schemes or assessment records.

---

# Session protocol

At the **start** of every future session:

1. Read this master plan and the active system plan.
2. Run `git status`; preserve unrelated user changes. Never revert or stash work
   you did not create.
3. Re-run the active task's baseline checks if its inputs may have changed
   (see [§10 recovery protocol](#10-recovery-protocol), "stale generated artifact").
4. Set the task to `In progress` in this file **before** executing.
5. Work only to the stated batch boundary. One content batch per session unless
   the plan proves the batches independent and safe.
6. Run the task's acceptance tests.
7. Before stopping, update: counts in §6, evidence paths, §9 log, task status,
   and [§2 Start here next](#2-start-here-next).

A task is `Done` only when its acceptance checks pass and its evidence is
linked. Changing files is not completion.

## Task record format

Every executable task records:

```
ID                  e.g. PLAT-IMPORT-001, TAX-COMPARE-001, SYS-FND-ARTICLE-001
Status              Not started / In progress / Blocked / Done / Superseded
Objective           what it achieves
Non-goals           what it must not touch
Dependencies        task IDs and gates
Files/data touched  exact paths
Batch boundary      the safe stopping point
Acceptance criteria measurable, not "looks right"
Validation commands runnable
Output/evidence     paths
Rollback/recovery   method
Completion          date + commit, when Done
Next task ID        what follows
```
