# SYS-CVS — Cardiovascular System

**System 3 of 19** in the locked execution order (LD-09). Previous: [SYS-DEV](SYS-DEV.md). Next: [SYS-RES](SYS-RES.md).
Parent plan: [MASTER-PLAN.md](../MASTER-PLAN.md).

| | |
|---|---|
| **Status** | Not started |
| **Blocked by** | `GATE-TAX-001`. `GATE-PLATFORM-001` **passed** 2026-08-12 |
| **Active task** | `SYS-CVS-INVENTORY-001` (Not started) |
| **Baseline date** | 2026-08-12 at commit `2df5853` |

---

## 1. Scope, learner years, prerequisites and cross-system dependencies

**In scope.** Cardiac and vascular structure and function, cardiovascular presentations, ischaemic heart disease, heart failure and cardiomyopathy, rhythm and conduction, valvular and pericardial disease, hypertension and vascular disease, congenital and inflammatory disease, and cardiovascular investigations and procedures.

**Out of scope.** Cardiovascular drug classes — DIS-PHA owns these by the de-duplication decision of 2026-08-12, with SYS-CVS as a cross-reference. Shock as a multisystem syndrome belongs to SYS-MUL.

**Learner years.** Years 1–2 structure/function; Years 3–4 disease, investigation and emergencies

**Prerequisites.** SYS-FND (cell injury, general pharmacology), DIS-ANA, DIS-PHY.

**Cross-system dependencies.** SYS-RES (shared dyspnoea and cyanosis presentations; the de-duplication decision gives chest pain and oedema to `cvs` and dyspnoea and cyanosis to `resp`), SYS-REN (RAAS, fluid balance), SYS-HEM (thrombosis), SYS-MUL (shock, resuscitation), SYS-END (metabolic risk).

**Runtime tree.** Runtime subject `cvs` — 9 topics, fully crosswalked to SYS-CVS.

---

## 2. Current canonical and runtime taxonomy inventory

| Level | Count |
|---|---:|
| Topics | 9 |
| Subtopics | 18 |
| Microtopics | 66 |
| **Total descendants** | **93** |

| Topic ID | Title | Template | Subtopics | Microtopics | Initial classification |
|---|---|---|---:|---:|---|
| `SYS-CVS-T01` | Structure and function | `TPL-CONCEPT` | 2 | 7 | Hub (confirm in inventory) |
| `SYS-CVS-T02` | Cardiovascular presentations | `TPL-PRESENTATION` | 2 | 6 | Hub (confirm in inventory) |
| `SYS-CVS-T03` | Ischemic heart disease | `TPL-CONDITION` | 2 | 6 | Hub (confirm in inventory) |
| `SYS-CVS-T04` | Heart failure and cardiomyopathy | `TPL-CONDITION` | 2 | 8 | Hub (confirm in inventory) |
| `SYS-CVS-T05` | Rhythm and conduction | `TPL-CONDITION` | 2 | 7 | Hub (confirm in inventory) |
| `SYS-CVS-T06` | Valvular and pericardial disease | `TPL-CONDITION` | 2 | 8 | Hub (confirm in inventory) |
| `SYS-CVS-T07` | Hypertension and vascular disease | `TPL-CONDITION` | 2 | 8 | Hub (confirm in inventory) |
| `SYS-CVS-T08` | Congenital and inflammatory disease | `TPL-CONDITION` | 2 | 8 | Hub (confirm in inventory) |
| `SYS-CVS-T09` | Cardiovascular investigations and procedures | `TPL-INVESTIGATION` | 2 | 8 | Hub (confirm in inventory) |

<details>
<summary>Full node tree (93 nodes)</summary>

- `SYS-CVS-T01` **Structure and function** *(TPL-CONCEPT)*
  - `SYS-CVS-T01-S01` **Cardiac anatomy and histology** — `Chambers` · `Valves` · `Coronary circulation` · `Conduction`
  - `SYS-CVS-T01-S02` **Cardiovascular physiology** — `Cardiac cycle` · `Hemodynamics` · `Blood pressure regulation`
- `SYS-CVS-T02` **Cardiovascular presentations** *(TPL-PRESENTATION)*
  - `SYS-CVS-T02-S01` **Chest symptoms** — `Chest pain` · `Palpitations` · `Dyspnea`
  - `SYS-CVS-T02-S02` **Perfusion and volume symptoms** — `Syncope` · `Edema` · `Claudication`
- `SYS-CVS-T03` **Ischemic heart disease** *(TPL-CONDITION)*
  - `SYS-CVS-T03-S01` **Chronic coronary syndromes** — `Stable angina` · `Silent ischemia`
  - `SYS-CVS-T03-S02` **Acute coronary syndromes** — `Unstable angina` · `NSTEMI` · `STEMI` · `Post-MI complications`
- `SYS-CVS-T04` **Heart failure and cardiomyopathy** *(TPL-CONDITION)*
  - `SYS-CVS-T04-S01` **Heart failure syndromes** — `HFrEF` · `HFpEF` · `Acute heart failure` · `Right heart failure`
  - `SYS-CVS-T04-S02` **Cardiomyopathy** — `Dilated` · `Hypertrophic` · `Restrictive` · `Myocarditis`
- `SYS-CVS-T05` **Rhythm and conduction** *(TPL-CONDITION)*
  - `SYS-CVS-T05-S01` **Bradyarrhythmia** — `Sinus node disease` · `AV block`
  - `SYS-CVS-T05-S02` **Tachyarrhythmia** — `AF` · `SVT` · `VT` · `VF` · `Long-QT syndromes`
- `SYS-CVS-T06` **Valvular and pericardial disease** *(TPL-CONDITION)*
  - `SYS-CVS-T06-S01` **Valve disease** — `Aortic` · `Mitral` · `Tricuspid` · `Pulmonary`
  - `SYS-CVS-T06-S02` **Pericardial disease** — `Pericarditis` · `Effusion` · `Tamponade` · `Constrictive disease`
- `SYS-CVS-T07` **Hypertension and vascular disease** *(TPL-CONDITION)*
  - `SYS-CVS-T07-S01` **Blood-pressure disorders** — `Primary hypertension` · `Secondary hypertension` · `Hypertensive emergency`
  - `SYS-CVS-T07-S02` **Arterial and venous disease** — `Aortic aneurysm` · `Dissection` · `PAD` · `DVT` · `Venous insufficiency`
- `SYS-CVS-T08` **Congenital and inflammatory disease** *(TPL-CONDITION)*
  - `SYS-CVS-T08-S01` **Congenital heart disease** — `ASD` · `VSD` · `PDA` · `Tetralogy` · `Coarctation`
  - `SYS-CVS-T08-S02` **Infection and inflammation** — `Endocarditis` · `Rheumatic heart disease` · `Vasculitis`
- `SYS-CVS-T09` **Cardiovascular investigations and procedures** *(TPL-INVESTIGATION)*
  - `SYS-CVS-T09-S01` **Diagnostic tests** — `ECG` · `Echocardiography` · `Cardiac biomarkers` · `Stress testing`
  - `SYS-CVS-T09-S02` **Procedures** — `CPR` · `Cardioversion` · `Pacing` · `Catheterization`

</details>

### Decided classification (`SYS-CVS-INVENTORY-001`, 2026-08-12)

All 93 nodes are classified. Evidence:
[`SYS-CVS-node-classification.json`](../evidence/SYS-CVS-node-classification.json).

| Classification | Nodes |
|---|---:|
| navigation-only hub | 27 |
| overview article | 0 |
| atomic article home | 66 |
| empty but legitimate planned destination | 0 |
| **Planned articles** | **66** |

22 of these nodes carry a local teaching signal — the corpus teaches
them in two or more processed sources — and are the ones to author first (`LD-14`).

*Initial classification is a placeholder. `SYS-CVS-INVENTORY-001` replaces every
row with a decided classification from the five allowed values in the master
plan's article catalogue rules.*

---

## 3. AMBOSS comparison dispositions

AMBOSS is a **structural comparator only** (LD-08). It is never the factual
authority and its prose, tables, media and hierarchy are not copied.
The archive is licensed for this use (`LD-11`); reproducing node titles in the
disposition ledger is settled and needs no further confirmation.

| AMBOSS node | Disposition | Note |
|---|---|---|
| `Cardiovascular system` (By system) | `already covered under a different Synapse label` | Direct match. |
| `Internal medicine → Cardiology` | `secondary placement or cross-reference` | DIS-MED placement of the same canonical items. |
| `Surgery → Cardiothoracic` | `secondary placement or cross-reference` | Cardiac surgery relevant to Years 1–4 is limited to indications and complications; do not import a surgical sub-tree. |

Full per-node dispositions are produced by `TAX-COMPARE-001` in Phase 1. The
rows above are the system-level judgements that shape this plan; they are not a
substitute for that ledger.

---

## 4. Local university-source coverage and readiness

The strongest-evidenced system in the repository. Kasr Alainy `ANATOMY CARDIOVASCULAR SYSTEM.pdf` is `taxonomy_complete` and is the source behind the 10 canonical CVS articles and 98 concepts. Kasr Alainy `2. Physiology` (13 of 14 complete) covers cardiac mechanics. This is the only system where local curriculum signal is genuinely strong today.

### Decided source plan (`SYS-CVS-SOURCE-001`, 2026-08-12)

Evidence: [`SYS-CVS-source-plan.md`](../evidence/SYS-CVS-source-plan.md) ·
[`SYS-CVS-source-plan.json`](../evidence/SYS-CVS-source-plan.json).

| | |
|---|---:|
| Planned articles | 66 |
| — with a processed local source | 39 |
| — authored from authoritative sources only | 27 |
| Distinct corpus files touching this system | 78 |

The 27 without a local source are **not** blocked. Under `LD-14` they are
authored from current authoritative sources, and their local curriculum emphasis
is recorded as a coverage risk rather than hidden. Local material establishes
emphasis; it never substitutes for medical verification (`LD-08`).

**Corpus-wide readiness (2026-08-12):** 765 of 3,238 files complete
(29,432 of 106,362 pages, 27.7%); 2,356 pending; 96 blocked; 15 retracted.
Every "complete" file is in a `*_review_required` state.

**Rules that bind this system's source plan:**

- A source in `semantic_analysis_pending`, `explicit_blocker`, or
  `candidate_retracted_do_not_rely` is **not evidence**. Record it as a
  coverage risk.
- Extraction confidence is not medical verification (LD-08).
- A topic absent from the processed corpus is **not** evidence that it is absent
  from the Egyptian curriculum. Do not narrow scope on that basis.
- **Author from what is processed and infer from it (`LD-14`).** Do not wait for
  the remaining 72.3%. An unprocessed area is authored from authoritative
  sources, and its local-emphasis uncertainty is recorded as a named coverage
  risk in §14 — not treated as a blocker.
- Preserve source-relative path, resource ID/hash, exact locator, support span,
  confidence, uncertainty and processing/review state on every derived claim.

---

## 5. Taxonomy changes and migrations

None proposed. This is the pilot system and its 9-topic structure has already survived review.

No taxonomy change is made outside Phase 1, and none is made without: the
existing node, the proposed change, the rationale, the source(s), the affected
IDs/records, a migration plan, the crosswalk impact, the student-navigation
impact, and a rollback strategy (LD-06).

---

## 6. Existing content disposition ledger

**This is the only system with a real canonical inventory: 10 articles and 98 concepts, all canonically homed here.** 5 of the 10 articles are `Published`. Every one of them is affected by BLK-06 and BLK-07 — their authored `holdThese` and `loseTheMark` are currently suppressed and replaced with generic filler. The disposition for all 10 is `enrich`, not `keep`: they need annotations (0 today), related-reading projection, image recommendations, and archetype-contract completion.

**Measured baseline for `SYS-CVS`:**

| Metric | Canonical home here | Any placement here |
|---|---:|---:|
| Articles | 10 | 10 |
| Concepts | 98 | 98 |
| Relations touching these concepts | — | 25 |
| Published articles | 5 | 5 |
| Articles with annotations | 0 | 0 |
| Articles with image recommendations | 0 (no model exists) | 0 |

| Article ID | Title | Status | Gate | Template | Disposition and why |
|---|---|---|---|---|---|
| `ART-CVS-HEART-ORIENTATION` | Heart orientation and pericardium | Published | `needs_evidence` | `TPL-ANATOMY` | **enrich** — annotations (0), related-reading projection, image recommendations, archetype-contract completion |
| `ART-CVS-CHAMBERS-VALVES` | Cardiac chambers, septa and valves | Published | `needs_evidence` | `TPL-ANATOMY` | **enrich** — annotations (0), related-reading projection, image recommendations, archetype-contract completion |
| `ART-CVS-CORONARY-CIRCULATION` | Coronary arterial supply and venous drainage | Published | `needs_evidence` | `TPL-ANATOMY` | **enrich** — annotations (0), related-reading projection, image recommendations, archetype-contract completion |
| `ART-CVS-CONDUCTION` | Cardiac conduction system | In review | `needs_evidence` | `TPL-CONCEPT` | **enrich** — annotations (0), related-reading projection, image recommendations, archetype-contract completion |
| `ART-CVS-CARDIAC-HISTOLOGY` | Cardiac muscle and vessel histology | Published | `needs_evidence` | `TPL-CONCEPT` | **enrich** — annotations (0), related-reading projection, image recommendations, archetype-contract completion |
| `ART-CVS-CARDIAC-CYCLE` | Cardiac cycle and heart sounds | In review | `needs_evidence` | `TPL-CONCEPT` | **enrich** — annotations (0), related-reading projection, image recommendations, archetype-contract completion |
| `ART-CVS-CARDIAC-OUTPUT` | Cardiac output, preload and afterload | In review | `needs_evidence` | `TPL-CONCEPT` | **enrich** — annotations (0), related-reading projection, image recommendations, archetype-contract completion |
| `ART-CVS-CARDIAC-ELECTRICAL` | Cardiac electrical activity and ECG foundations | Published | `needs_evidence` | `TPL-INVESTIGATION` | **enrich** — annotations (0), related-reading projection, image recommendations, archetype-contract completion |
| `ART-CVS-BLOOD-PRESSURE` | Arterial pressure and its regulation | In review | `needs_evidence` | `TPL-CONCEPT` | **enrich** — annotations (0), related-reading projection, image recommendations, archetype-contract completion |
| `ART-CVS-VASCULAR-FLOW` | Blood vessels, flow and microcirculation | In review | `needs_evidence` | `TPL-CONCEPT` | **enrich** — annotations (0), related-reading projection, image recommendations, archetype-contract completion |

### Decided dispositions (`SYS-CVS-INVENTORY-001`, 2026-08-12)

Evidence: [`SYS-CVS-disposition-ledger.json`](../evidence/SYS-CVS-disposition-ledger.json).

| | Articles | Concepts |
|---|---:|---:|
| Touching this system | 10 | 98 |
| Canonically homed here | 10 | 98 |
| `enrich` | 10 | 98 |
| `correct` (BLK-09) | 0 | 0 |
| Outside the subject-ID contract | 0 | 0 |

No record is `keep` on sight. Every existing article lacks statement
annotations, image recommendations and per-line callout evidence — all three
became possible in Phase 0 and none exists yet — so `enrich` is the honest
default rather than a judgement that the record is poor.

Allowed dispositions: `keep` · `enrich` · `correct` · `merge` · `split` ·
`redirect` · `deprecate` · `exclude`. Every row states why. Stable IDs are
preserved (LD-06).

**`BLK-09` check for this system.** 62 articles and 736 concepts across the
repository carry `subjectId: "medical"`, which is not one of the eight valid
subject IDs and makes them unreachable in the student library.
`SYS-CVS-INVENTORY-001` must count how many of them belong to this system and
plan their repair under a documented migration — never a deletion.

---

## 7. Planned article catalogue

**Estimated scale (range, with assumptions).**

| Kind | Estimate | Assumption |
|---|---|---|
| Navigation-only hubs | 9–18 | topics are hubs by default; roughly half the subtopics stay hubs under LD-04 |
| Overview articles | 3–9 | only where an overview adds real teaching value beyond its children |
| Atomic articles | 46–86 | ≈0.7–1.3 per microtopic: some microtopics merge into one studiable unit, others split |
| **Total articles** | **49–95** | |

These are ranges derived from node counts, not commitments. `SYS-CVS-INVENTORY-001`
replaces them with a decided catalogue.

**Arabic terminology (`LD-15`).** `arabicTitle`, `arabicLabel` and
`arabicAliases` are researched from authoritative sources and filled during the
same authoring run — not deferred. Where no authoritative Arabic term exists for
a specific item, that item takes a `fieldNotes` reason; a blanket "awaiting
reviewed terminology" across the system is not acceptable.

**Per-article contract.** Every planned article records: identity, aliases,
Arabic/title policy, language and learner stage · template/archetype and the
complete required sections from `src/data/articleTemplates.ts` · canonical
primary and secondary placements · university/year/module scope and
university-specific notes · complete readable prose and a safe published
projection · `holdThese` and `loseTheMark`, each specific and
evidence-governed · exact statement annotations · related concepts with
reciprocal links · related articles with a reason per connection · resource IDs,
article-level sources, claims, stable spans, citations, evidence basis,
conflicts, gaps, freshness, review dates and publication gate · admin-only image
recommendations · question/practical coverage **notes only**.

**Acceptance criteria per article.** `missingRequiredSections` is empty for its
template · every student-visible span resolves to a claim and citation ·
`holdThese` and `loseTheMark` pass the callout evidence policy from
`PLAT-CALLOUT-001` · every `relatedArticleIds` entry resolves and renders ·
every annotation quote occurs verbatim in its stated block · every `required`
image recommendation exists · `npm run medical:audit` reports no error for the
article.

---

## 8. Planned concept batches and canonicalisation

Concepts are the smallest assessable objectives, not article headings.

**Canonicalisation before minting.** The corpus holds 152,147 explicitly-taught
candidates and 242,743 medically-meaningful candidates; the repository already
holds 1,718 concepts and 108 reversible merge records. Before creating a
concept, search the existing set by label, alias and `canonicalKey`. A new
concept is justified only when no existing record covers the objective.

**Batch shape.** One topic per batch, ≤60 concepts. Each batch: canonicalise
against existing records → mint only the genuinely new → attach reciprocal
article links → record provenance (`sourceCandidateIds`,
`resourceOccurrenceIds`, `atomicClaimIds`, `supportMode`, `confidence`) →
record `conflicts`, `uncertainty`, `evidenceGaps` and any
`exclusionReason` → set governance and publication state honestly.

**Merge lineage is never lost.** `mergeIds` and
`rejectedMergeCandidateIds` are preserved on every touched record (LD-06).

**Baseline to improve on honestly:** 98 concepts currently touch this
system; 98 are canonically homed here; 25 relations touch
them. Repository-wide, 3.2% of concepts are published and 4.9% carry any typed
relation.

---

## 9. Planned relationship batches

**Within-system priorities.** `prerequisite_of` (learning order) ·
`part_of` / `located_in` / `supplies` / `drains_into` / `contains` /
`composed_of` (structure) · `mechanism_step_before` (sequences) ·
`causes` / `increases` / `decreases` / `regulates` ·
`presents_as` / `diagnosed_by` / `investigated_by` / `treated_by` /
`contraindicates` / `complication_of` / `differential_of` ·
`contrasts_with` and `often_confused_with`.

**Cross-system edges to build (the transfer edges that make the graph worth
having):** SYS-RES (shared dyspnoea and cyanosis presentations; the de-duplication decision gives chest pain and oedema to `cvs` and dyspnoea and cyanosis to `resp`), SYS-REN (RAAS, fluid balance), SYS-HEM (thrombosis), SYS-MUL (shock, resuscitation), SYS-END (metabolic risk).

**No graph noise.** Each edge must be meaningful, correctly directed,
de-duplicated against the existing set, and evidence-governed. A relation is
`verified` only when its claim-and-citation chain passes validation — the
field audit already enforces that a relation without an evidence chain is an
error. **0 of the 47 existing relations are verified**; this system must not add
to that number without evidence.

**Batch shape.** One relation family per batch, ≤80 edges, each with
`evidenceClaimIds` and `citationIds` or an explicit `needs_evidence` status
and a named gap.

---

## 10. Statement-annotation and article-relationship plan

**Annotations** (blocked by `PLAT-ANNOT-001`; `BLK-01`). Target ≥3 per atomic
article:

- `definition_of` — the sentence that defines the article's central concept.
- `mechanism_step_before` — sentences that carry a step in a sequence.
- `contrasts_with` / `often_confused_with` — the sentence that separates two
  things students conflate. Highest teaching value per annotation.
- Structural and causal relations where the sentence *is* the relationship.

Every annotation quote must occur **verbatim** in its stated block
(`summary` / `body` / `hold` / `trap`). Import validates this pre-commit.

**Related articles** (blocked by `PLAT-READER-001`; `BLK-05`). Each link
carries a reason. Prefer: prerequisite → dependent; mechanism → clinical
consequence; contrast pairs; investigation → the conditions it discriminates.
Links are de-duplicated, resolve to a publishable article, and never render as a
dead ID.

---

## 11. Evidence and publication strategy

**Low-risk, publishable by Claude after the gates (LD-07).** Structure,
normal function, definitions, classification and mechanism, where the claim
chain resolves and the projection tests pass.

**High-risk — faculty review mandatory, no exception for extraction
confidence:**

- ACS management, reperfusion timing, and antiplatelet/anticoagulant choice — `treatment_or_action`, time-sensitive, faculty review mandatory.
- Heart-failure pharmacotherapy sequencing — guidelines shifted materially in recent years; requires current corroboration and a review date.
- Hypertension thresholds and targets — jurisdiction-dependent; record which guideline and its date.

**Rules.** Independently corroborate every treatment, dosing, emergency,
procedure, recommendation and time-sensitive claim. Record `conflicts` rather
than silently choosing a source. Set `timeSensitive: time_sensitive` and a
`reviewDue` date on anything that will go stale — **note that 145/145 existing
articles are marked `stable`, which is not credible for clinical content and
must not be copied as a pattern.** Record URL, title, publisher/body,
publication/update date, access date, jurisdiction and the exact claim supported.

**Review is not a dependency (`LD-12`).** Dr Omar is the reviewer of record, but
no batch waits on a review. High-risk material is still *identified and
labelled* — `timeSensitive`, `publicationGate: faculty_review`, `conflicts`,
`evidenceGaps` — and still requires stronger, current, independently corroborated
sourcing under `LD-08`. What changed is only that the queue never blocks
progress. Sequence low-risk batches first for coherence, not because the
high-risk ones are stuck.

---

## 12. Admin-only image recommendation inventory

Blocked by `PLAT-IMAGE-001` (`BLK-08`). Recommendations are **admin-only** and
must never reach a student projection until an admin supplies approved media —
this is test-enforced.

Identified needs for this system:

- Cardiac chamber and valve orientation plate (already an article; currently no visual).
- Coronary artery territory diagram mapped to ECG leads — a comparison object prose handles badly.
- Conduction system diagram and the action-potential phase graph.
- Frank–Starling and pressure–volume loop graphs.
- Cardiac cycle Wiggers diagram.
- Murmur timing comparison table.
- ECG example strips for each named rhythm — rights-sensitive; prefer openly licensed sources.

Each recommendation records: visual type/brief · exact teaching purpose and why
prose is insufficient · recommended section/block and optional anchor quote ·
priority (`required` / `strongly helpful` / `optional`) · status
(`needed` / `planned` / `supplied` / `declined`) · suggested source
direction · rights/licensing notes.

**No decorative recommendations.** A visual is justified where spatial anatomy,
histology, embryology, pathways, mechanism sequences, graphs, tables,
algorithms, imaging, morphology, or physical-examination findings cannot be
conveyed reliably in prose.

---

## 13. Future Qbank and practical coverage notes

> **Notes only.** No stem, option, explanation, station brief, actor script,
> mark scheme or assessment record may be authored before `GATE-LIBRARY-001`
> (LD-10). This section records intent and dependencies, nothing else.

Highest expected Qbank density of any clinical system. Very high OSCE relevance: cardiovascular examination, chest-pain history, ECG interpretation stations. Record targets only; author nothing before GATE-LIBRARY-001.

Recorded intent for this system: target concepts are the atomic-article concepts
identified in §8; proposed formats follow from the archetypes in §7; the
dependency is that a question may only target a concept that is published and
reciprocally linked to a published article.

---

## 14. Batch sequence, dependencies, risk and validation

| # | Task ID | Objective | Batch boundary | Depends on |
|---:|---|---|---|---|
| 1 | `SYS-CVS-INVENTORY-001` | Classify every one of the 93 nodes; build the existing-content disposition ledger; count `BLK-09` records | Classification + ledger only. No content written | `GATE-TAX-001` |
| 2 | `SYS-CVS-SOURCE-001` | Build the source plan: local corpus records with state, authoritative web sources per topic, conflicts to resolve | Source plan only | task 1 |
| 3 | `SYS-CVS-CONCEPT-001..n` | Concept batches, one topic each, ≤60 concepts | One topic per batch | task 2 |
| 4 | `SYS-CVS-ARTICLE-001..n` | Article batches, one topic each, ≤10 articles | One topic per batch | task 3 |
| 5 | `SYS-CVS-RELATION-001..n` | Relation batches, one family each, ≤80 edges | One family per batch | task 4 |
| 6 | `SYS-CVS-ANNOT-001` | Statement annotations across the system's atomic articles | ≤50 annotations | task 4 |
| 7 | `SYS-CVS-IMAGE-001` | Image recommendation inventory | All recommendations, no media fulfilment | task 4 |
| 8 | `SYS-CVS-PUBLISH-001` | Apply publication gates; enumerate the faculty-review queue | No high-risk publication without a named reviewer | tasks 4–7, `OQ-02` |
| 9 | `GATE-SYS-CVS` | System completion | — | tasks 1–8 |

**Validation commands for every batch:**

```bash
npm run medical:validate:authoring
npm run medical:validate:taxonomy
npm run medical:build && npm run medical:audit
npm test
```

**Risks specific to this system:**

- The 5 published CVS articles are the live proof of BLK-06/BLK-07. Fixing the projection will visibly change what students see; coordinate with the user before it ships.
- Pharmacology cross-reference discipline must hold: it is easy to re-introduce the drug duplicates that the 2026-08-12 de-duplication removed.

**Completion criteria (`GATE-SYS-CVS`).** All 93
nodes classified · every planned atomic and overview article complete or
explicitly excluded with a rationale · every article satisfies its archetype and
field contract · concepts canonicalised, non-orphaned and reciprocally linked ·
relation coverage meets the ≥80% threshold with no broken IDs · every
student-visible span and callout passes its evidence policy · annotations and
related-article links function end to end · image recommendations exist where
needed and leak nowhere · publication status and the faculty-review queue are
explicit · all validation commands pass · unresolved gaps and conflicts are
documented, not hidden.

**Rollback and recovery.** Every batch is resumable from its last committed
record ID via the import journal. Content batches are additive or in-place
`update` imports; no batch deletes a record. See the master plan's
[recovery protocol](../MASTER-PLAN.md#10-recovery-protocol).

---

## 15. Start here next

> **`SYS-CVS-INVENTORY-001` — Classify every node and build the disposition ledger.**

**Do not start this task until `GATE-TAX-001` has passed and its evidence is
linked in the master plan.** `GATE-PLATFORM-001` passed on 2026-08-12.

- **Objective.** Assign every one of the 93 `SYS-CVS` nodes
  exactly one classification (`navigation-only hub` · `overview article` ·
  `atomic article home` · `secondary placement only` ·
  `empty but legitimate planned destination`), and record a disposition for
  every one of the 10 articles and 98 concepts that
  currently touch this system.
- **Non-goals.** Do not author any article, concept or relation. Do not change
  the taxonomy. Do not publish anything.
- **Files to read.** This plan · [MASTER-PLAN.md](../MASTER-PLAN.md) ·
  `src/data/medicalLibraryTaxonomy.ts` · `src/data/articleTemplates.ts` ·
  `server/data/medical-library-v1.json` ·
  `docs/authoring/library-article-archetypes.md`
- **Files to write.**
  `docs/medical-library-program/evidence/SYS-CVS-node-classification.json` and
  `docs/medical-library-program/evidence/SYS-CVS-disposition-ledger.json`
- **Acceptance.** Every node has exactly one classification with a one-line
  rationale. Every existing article and concept has a disposition with a reason.
  `BLK-09` records belonging to this system are counted. No content changed —
  `git status` shows only the two new evidence files and this plan's updates.
- **Validation.** `npm run medical:audit` still passes unchanged.
- **Stop condition.** Both evidence files exist and §2, §6 and §7 of this plan
  have been updated with the decided figures. Then set
  `SYS-CVS-INVENTORY-001` to `Done`, record the commit, and set the active task
  to `SYS-CVS-SOURCE-001`.
