# SYS-OBS — Pregnancy, Childbirth & Puerperium

**System 13 of 19** in the locked execution order (LD-09). Previous: [SYS-INF](SYS-INF.md). Next: [SYS-GYN](SYS-GYN.md).
Parent plan: [MASTER-PLAN.md](../MASTER-PLAN.md).

| | |
|---|---|
| **Status** | Not started |
| **Blocked by** | `GATE-TAX-001`. `GATE-PLATFORM-001` **passed** 2026-08-12 |
| **Active task** | `SYS-OBS-INVENTORY-001` (Not started) |
| **Baseline date** | 2026-08-12 at commit `2df5853` |

---

## 1. Scope, learner years, prerequisites and cross-system dependencies

**In scope.** Normal pregnancy, early-pregnancy problems, medical disorders in pregnancy, labour and delivery, obstetric emergencies, and postpartum care.

**Out of scope.** Gynaecological disease (SYS-GYN). Neonatal care beyond immediate postnatal (SYS-DEV and the relevant organ system).

**Learner years.** Years 3–4

**Prerequisites.** SYS-GYN (reproductive physiology), SYS-END (reproductive axis), SYS-DEV (fetal development).

**Cross-system dependencies.** SYS-GYN (shared anatomy and physiology), SYS-CVS/SYS-REN/SYS-END (medical disorders in pregnancy), SYS-HEM (anaemia, rhesus, thromboembolism), SYS-INF (congenital infection), SYS-MUL (obstetric haemorrhage as an emergency).

**Runtime tree.** No runtime subject maps to SYS-OBS.

---

## 2. Current canonical and runtime taxonomy inventory

| Level | Count |
|---|---:|
| Topics | 6 |
| Subtopics | 12 |
| Microtopics | 36 |
| **Total descendants** | **54** |

| Topic ID | Title | Template | Subtopics | Microtopics | Initial classification |
|---|---|---|---:|---:|---|
| `SYS-OBS-T01` | Normal pregnancy | `TPL-CONDITION` | 2 | 7 | Hub (confirm in inventory) |
| `SYS-OBS-T02` | Early-pregnancy problems | `TPL-CONDITION` | 2 | 4 | Hub (confirm in inventory) |
| `SYS-OBS-T03` | Medical disorders in pregnancy | `TPL-CONDITION` | 2 | 6 | Hub (confirm in inventory) |
| `SYS-OBS-T04` | Labor and delivery | `TPL-CONDITION` | 2 | 5 | Hub (confirm in inventory) |
| `SYS-OBS-T05` | Obstetric emergencies | `TPL-EMERGENCY` | 2 | 7 | Hub (confirm in inventory) |
| `SYS-OBS-T06` | Postpartum care | `TPL-CONDITION` | 2 | 7 | Hub (confirm in inventory) |

<details>
<summary>Full node tree (54 nodes)</summary>

- `SYS-OBS-T01` **Normal pregnancy** *(TPL-CONDITION)*
  - `SYS-OBS-T01-S01` **Antenatal physiology and care** — `Maternal adaptation` · `Dating` · `Screening` · `Nutrition`
  - `SYS-OBS-T01-S02` **Fetal development and surveillance** — `Placenta` · `Growth` · `Fetal monitoring`
- `SYS-OBS-T02` **Early-pregnancy problems** *(TPL-CONDITION)*
  - `SYS-OBS-T02-S01` **Pregnancy loss and ectopic pregnancy** — `Miscarriage` · `Ectopic pregnancy`
  - `SYS-OBS-T02-S02` **Gestational trophoblastic disease** — `Molar pregnancy` · `Choriocarcinoma`
- `SYS-OBS-T03` **Medical disorders in pregnancy** *(TPL-CONDITION)*
  - `SYS-OBS-T03-S01` **Hypertensive disease** — `Gestational hypertension` · `Preeclampsia` · `Eclampsia`
  - `SYS-OBS-T03-S02` **Metabolic and hematologic disease** — `Gestational diabetes` · `Anemia` · `Thrombosis`
- `SYS-OBS-T04` **Labor and delivery** *(TPL-CONDITION)*
  - `SYS-OBS-T04-S01` **Normal labor** — `Stages` · `Monitoring` · `Analgesia`
  - `SYS-OBS-T04-S02` **Operative delivery** — `Instrumental delivery` · `Cesarean section`
- `SYS-OBS-T05` **Obstetric emergencies** *(TPL-EMERGENCY)*
  - `SYS-OBS-T05-S01` **Hemorrhage** — `Placental abruption` · `Placenta previa` · `Postpartum hemorrhage`
  - `SYS-OBS-T05-S02` **Maternal and fetal compromise** — `Shoulder dystocia` · `Cord prolapse` · `Uterine rupture` · `Fetal distress`
- `SYS-OBS-T06` **Postpartum care** *(TPL-CONDITION)*
  - `SYS-OBS-T06-S01` **Maternal puerperium** — `Infection` · `Thrombosis` · `Mental health` · `Lactation`
  - `SYS-OBS-T06-S02` **Newborn transition** — `Resuscitation` · `Feeding` · `Screening`

</details>

*Initial classification is a placeholder. `SYS-OBS-INVENTORY-001` replaces every
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
| `Pregnancy, childbirth, and the puerperium` (By system) | `already covered under a different Synapse label` | Direct match. |
| `Obstetrics/gynecology` (Clinical knowledge, 12 groups) | `secondary placement or cross-reference` | DIS-OBG is the discipline route covering both SYS-OBS and SYS-GYN. |

Full per-node dispositions are produced by `TAX-COMPARE-001` in Phase 1. The
rows above are the system-level judgements that shape this plan; they are not a
substitute for that ledger.

---

## 4. Local university-source coverage and readiness

No processed local source. Ain Shams 3rd Year (1,409 files, 0 processed) and Helwan `Files & MCQs` are the likely carriers. Egyptian obstetric practice and national maternal-health programmes require deliberate regional sourcing.

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

None proposed. Confirm the SYS-OBS/SYS-GYN split survives Phase 1 — AMBOSS keeps them as two systems too, which supports the current structure.

No taxonomy change is made outside Phase 1, and none is made without: the
existing node, the proposed change, the rationale, the source(s), the affected
IDs/records, a migration plan, the crosswalk impact, the student-navigation
impact, and a rollback strategy (LD-06).

---

## 6. Existing content disposition ledger

No canonical article or concept. 9 articles and 87 concepts secondary — the lowest secondary count of the reproductive systems.

**Measured baseline for `SYS-OBS`:**

| Metric | Canonical home here | Any placement here |
|---|---:|---:|
| Articles | 0 | 9 |
| Concepts | 0 | 87 |
| Relations touching these concepts | — | 1 |
| Published articles | 0 | 0 |
| Articles with annotations | 0 | 0 |
| Articles with image recommendations | 0 (no model exists) | 0 |

| Article ID | Title | Status | Gate | Template | Disposition and why |
|---|---|---|---|---|---|
| — | *No article has `SYS-OBS` as its canonical home* | — | — | — | Every article in this system is new, or is a `move of canonical home` decision on a discipline-rooted record (DEC-005) |

Allowed dispositions: `keep` · `enrich` · `correct` · `merge` · `split` ·
`redirect` · `deprecate` · `exclude`. Every row states why. Stable IDs are
preserved (LD-06).

**`BLK-09` check for this system.** 62 articles and 736 concepts across the
repository carry `subjectId: "medical"`, which is not one of the eight valid
subject IDs and makes them unreachable in the student library.
`SYS-OBS-INVENTORY-001` must count how many of them belong to this system and
plan their repair under a documented migration — never a deletion.

---

## 7. Planned article catalogue

**Estimated scale (range, with assumptions).**

| Kind | Estimate | Assumption |
|---|---|---|
| Navigation-only hubs | 6–12 | topics are hubs by default; roughly half the subtopics stay hubs under LD-04 |
| Overview articles | 2–6 | only where an overview adds real teaching value beyond its children |
| Atomic articles | 25–47 | ≈0.7–1.3 per microtopic: some microtopics merge into one studiable unit, others split |
| **Total articles** | **27–53** | |

These are ranges derived from node counts, not commitments. `SYS-OBS-INVENTORY-001`
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

**Baseline to improve on honestly:** 87 concepts currently touch this
system; 0 are canonically homed here; 1 relations touch
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
having):** SYS-GYN (shared anatomy and physiology), SYS-CVS/SYS-REN/SYS-END (medical disorders in pregnancy), SYS-HEM (anaemia, rhesus, thromboembolism), SYS-INF (congenital infection), SYS-MUL (obstetric haemorrhage as an emergency).

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

- **Almost the entire system is high-risk.** Obstetric emergencies (postpartum haemorrhage, eclampsia, shoulder dystocia, cord prolapse) are time-critical with specific drug doses. Absolute faculty review.
- Medication safety in pregnancy — teratogenicity and dosing; every statement needs current, jurisdiction-aware sourcing.
- Labour management protocols and partogram use — practice varies by faculty; use `universityNotes`.

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

- Fetal lie, presentation and position diagrams — spatial content.
- Partogram example with interpretation.
- Stages-of-labour and mechanism-of-normal-labour sequence diagrams.
- Placental circulation diagram.
- Obstetric ultrasound examples — rights-sensitive.
- Perineal tear classification comparison plate — handle with clinical restraint.

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

Moderate Qbank density. High OSCE relevance: obstetric history, abdominal palpation, partogram interpretation, obstetric emergency drills. Substantial practical targets to record.

Recorded intent for this system: target concepts are the atomic-article concepts
identified in §8; proposed formats follow from the archetypes in §7; the
dependency is that a question may only target a concept that is published and
reciprocally linked to a published article.

---

## 14. Batch sequence, dependencies, risk and validation

| # | Task ID | Objective | Batch boundary | Depends on |
|---:|---|---|---|---|
| 1 | `SYS-OBS-INVENTORY-001` | Classify every one of the 54 nodes; build the existing-content disposition ledger; count `BLK-09` records | Classification + ledger only. No content written | `GATE-TAX-001` |
| 2 | `SYS-OBS-SOURCE-001` | Build the source plan: local corpus records with state, authoritative web sources per topic, conflicts to resolve | Source plan only | task 1 |
| 3 | `SYS-OBS-CONCEPT-001..n` | Concept batches, one topic each, ≤60 concepts | One topic per batch | task 2 |
| 4 | `SYS-OBS-ARTICLE-001..n` | Article batches, one topic each, ≤10 articles | One topic per batch | task 3 |
| 5 | `SYS-OBS-RELATION-001..n` | Relation batches, one family each, ≤80 edges | One family per batch | task 4 |
| 6 | `SYS-OBS-ANNOT-001` | Statement annotations across the system's atomic articles | ≤50 annotations | task 4 |
| 7 | `SYS-OBS-IMAGE-001` | Image recommendation inventory | All recommendations, no media fulfilment | task 4 |
| 8 | `SYS-OBS-PUBLISH-001` | Apply publication gates; enumerate the faculty-review queue | No high-risk publication without a named reviewer | tasks 4–7, `OQ-02` |
| 9 | `GATE-SYS-OBS` | System completion | — | tasks 1–8 |

**Validation commands for every batch:**

```bash
npm run medical:validate:authoring
npm run medical:validate:taxonomy
npm run medical:build && npm run medical:audit
npm test
```

**Risks specific to this system:**

- The highest concentration of faculty-review-blocked content of any system. Sequence normal pregnancy and physiology first.
- Content must be written with clinical restraint and respect; this is a system where tone matters to the reader.

**Completion criteria (`GATE-SYS-OBS`).** All 54
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

> **`SYS-OBS-INVENTORY-001` — Classify every node and build the disposition ledger.**

**Do not start this task until `GATE-TAX-001` has passed and its evidence is
linked in the master plan.** `GATE-PLATFORM-001` passed on 2026-08-12.

- **Objective.** Assign every one of the 54 `SYS-OBS` nodes
  exactly one classification (`navigation-only hub` · `overview article` ·
  `atomic article home` · `secondary placement only` ·
  `empty but legitimate planned destination`), and record a disposition for
  every one of the 9 articles and 87 concepts that
  currently touch this system.
- **Non-goals.** Do not author any article, concept or relation. Do not change
  the taxonomy. Do not publish anything.
- **Files to read.** This plan · [MASTER-PLAN.md](../MASTER-PLAN.md) ·
  `src/data/medicalLibraryTaxonomy.ts` · `src/data/articleTemplates.ts` ·
  `server/data/medical-library-v1.json` ·
  `docs/authoring/library-article-archetypes.md`
- **Files to write.**
  `docs/medical-library-program/evidence/SYS-OBS-node-classification.json` and
  `docs/medical-library-program/evidence/SYS-OBS-disposition-ledger.json`
- **Acceptance.** Every node has exactly one classification with a one-line
  rationale. Every existing article and concept has a disposition with a reason.
  `BLK-09` records belonging to this system are counted. No content changed —
  `git status` shows only the two new evidence files and this plan's updates.
- **Validation.** `npm run medical:audit` still passes unchanged.
- **Stop condition.** Both evidence files exist and §2, §6 and §7 of this plan
  have been updated with the decided figures. Then set
  `SYS-OBS-INVENTORY-001` to `Done`, record the commit, and set the active task
  to `SYS-OBS-SOURCE-001`.
