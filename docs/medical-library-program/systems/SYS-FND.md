# SYS-FND — Foundations & General Principles

**System 1 of 19** in the locked execution order (LD-09). Next: [SYS-DEV](SYS-DEV.md).
Parent plan: [MASTER-PLAN.md](../MASTER-PLAN.md).

| | |
|---|---|
| **Status** | Not started |
| **Blocked by** | `GATE-TAX-001`. `GATE-PLATFORM-001` **passed** 2026-08-12 |
| **Active task** | `SYS-FND-CONCEPT-004` (Not started) |
| **Done** | `INVENTORY-001` · `SOURCE-001` · `CONCEPT-001` · `CONCEPT-002` · `ARTICLE-001` · `CONCEPT-003` · `ARTICLE-002` — twelve batches, simulated clean; **8 of 56 planned articles** |
| **Baseline date** | 2026-08-12 at commit `2df5853` |

---

## 1. Scope, learner years, prerequisites and cross-system dependencies

**In scope.** The shared vocabulary every other system borrows: cell and molecular biology, human genetics, the general pathology of injury/inflammation/neoplasia, general pharmacological principles, general microbiology, and the core mechanisms (hypoxia, oedema, shock physiology at principle level) that later systems apply.

**Out of scope.** Organ-specific applications of any of the above. Diabetes belongs to SYS-END; sepsis to SYS-MUL; a named organism's disease to SYS-INF. Foundations owns the principle, not its instances.

**Learner years.** Years 1–2, revisited throughout

**Prerequisites.** None. This is the root of the learning order for the whole library.

**Cross-system dependencies.** Everything. `prerequisite_of` edges from SYS-FND concepts are the single highest-value relationship batch in the programme, because they define the order in which the library can be studied at all.

**Runtime tree.** No runtime subject maps to SYS-FND. Its content currently reaches students only through `pharm` (general pharmacology) and through discipline-rooted articles.

---

## 2. Current canonical and runtime taxonomy inventory

| Level | Count |
|---|---:|
| Topics | 6 |
| Subtopics | 15 |
| Microtopics | 53 |
| **Total descendants** | **74** |

| Topic ID | Title | Template | Subtopics | Microtopics | Initial classification |
|---|---|---|---:|---:|---|
| `SYS-FND-T01` | Cell & molecular biology | `TPL-CONCEPT` | 2 | 8 | Hub (confirm in inventory) |
| `SYS-FND-T02` | Human genetics | `TPL-CONCEPT` | 2 | 6 | Hub (confirm in inventory) |
| `SYS-FND-T03` | General pathology | `TPL-CONDITION` | 3 | 10 | Hub (confirm in inventory) |
| `SYS-FND-T04` | General pharmacology | `TPL-DRUG` | 3 | 10 | Hub (confirm in inventory) |
| `SYS-FND-T05` | General microbiology | `TPL-CONDITION` | 3 | 11 | Hub (confirm in inventory) |
| `SYS-FND-T06` | Core mechanisms | `TPL-CONDITION` | 2 | 8 | Hub (confirm in inventory) |

<details>
<summary>Full node tree (74 nodes)</summary>

- `SYS-FND-T01` **Cell & molecular biology** *(TPL-CONCEPT)*
  - `SYS-FND-T01-S01` **Cell structure and organelles** — `Membranes` · `Cytoskeleton` · `Nucleus` · `Mitochondria`
  - `SYS-FND-T01-S02` **Cell cycle and signaling** — `Cell cycle` · `Receptors` · `Second messengers` · `Apoptosis`
- `SYS-FND-T02` **Human genetics** *(TPL-CONCEPT)*
  - `SYS-FND-T02-S01` **Inheritance and variation** — `Mendelian inheritance` · `Chromosomal disorders` · `Mitochondrial inheritance`
  - `SYS-FND-T02-S02` **Genomic methods and counseling** — `Pedigrees` · `Genetic testing` · `Counseling principles`
- `SYS-FND-T03` **General pathology** *(TPL-CONDITION)*
  - `SYS-FND-T03-S01` **Cell injury and adaptation** — `Reversible injury` · `Necrosis` · `Apoptosis` · `Adaptations`
  - `SYS-FND-T03-S02` **Inflammation and repair** — `Acute inflammation` · `Chronic inflammation` · `Wound healing`
  - `SYS-FND-T03-S03` **Neoplasia** — `Carcinogenesis` · `Tumor biology` · `Grading and staging`
- `SYS-FND-T04` **General pharmacology** *(TPL-DRUG)*
  - `SYS-FND-T04-S01` **Pharmacokinetics** — `Absorption` · `Distribution` · `Metabolism` · `Excretion`
  - `SYS-FND-T04-S02` **Pharmacodynamics** — `Receptors` · `Dose-response` · `Therapeutic index`
  - `SYS-FND-T04-S03` **Safe medicines use** — `Adverse reactions` · `Interactions` · `Special populations`
- `SYS-FND-T05` **General microbiology** *(TPL-CONDITION)*
  - `SYS-FND-T05-S01` **Microbial structure and classification** — `Bacteria` · `Viruses` · `Fungi` · `Parasites`
  - `SYS-FND-T05-S02` **Host-pathogen interaction** — `Virulence` · `Transmission` · `Colonization`
  - `SYS-FND-T05-S03` **Diagnostics and control** — `Specimen collection` · `Culture` · `Molecular tests` · `Sterilization`
- `SYS-FND-T06` **Core mechanisms** *(TPL-CONDITION)*
  - `SYS-FND-T06-S01` **Hemodynamics and thrombosis** — `Edema` · `Thrombosis` · `Embolism` · `Infarction`
  - `SYS-FND-T06-S02` **Fluid, electrolyte and acid-base principles** — `Volume` · `Sodium` · `Potassium` · `Acid-base`

</details>

### Decided classification (`SYS-FND-INVENTORY-001`, 2026-08-12)

All 74 nodes are classified. Evidence:
[`SYS-FND-node-classification.json`](../evidence/SYS-FND-node-classification.json).

| Classification | Nodes |
|---|---:|
| navigation-only hub | 18 |
| overview article | 3 |
| atomic article home | 53 |
| empty but legitimate planned destination | 0 |
| **Planned articles** | **56** |

36 of these nodes carry a local teaching signal — the corpus teaches
them in two or more processed sources — and are the ones to author first (`LD-14`).

*Initial classification is a placeholder. `SYS-FND-INVENTORY-001` replaces every
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
| `General principles of foundational science` | `already covered under a different Synapse label` | Maps to SYS-FND as a whole. No structural change. |
| `Biochemistry`, `Genetics` (By discipline) | `secondary placement or cross-reference` | Synapse owns these as DIS-BIO and DIS-GEN; SYS-FND-T01/T02 are the system-route placements of the same canonical items. |
| `Physics`, `Chemistry` (By discipline) | `outside Years 1–4 scope` | AMBOSS carries these for USMLE Step 1 pre-med recall. Egyptian undergraduate curricula teach them in a pre-clinical year outside this library's remit. Reject unless OQ-04 surfaces local curriculum evidence. |
| `Important risk factors for medical conditions` | `metadata/filter, not a node` | This is a cross-cutting index, not subject matter. |

Full per-node dispositions are produced by `TAX-COMPARE-001` in Phase 1. The
rows above are the system-level judgements that shape this plan; they are not a
substitute for that ledger.

---

## 4. Local university-source coverage and readiness

Kasr Alainy `4. Biochemistry` (5 files, 4 complete) and `5. Pathology` (7 files, 6 complete) are the strongest local signals. `0. General/Pathology` (25 files) and `0. General/Metabolism` (62 files) are **entirely unprocessed** — 87 files that plausibly carry the bulk of local foundational teaching. Treat foundational coverage as under-evidenced locally and lean on authoritative open textbooks.

### Decided source plan (`SYS-FND-SOURCE-001`, 2026-08-12)

Evidence: [`SYS-FND-source-plan.md`](../evidence/SYS-FND-source-plan.md) ·
[`SYS-FND-source-plan.json`](../evidence/SYS-FND-source-plan.json).

| | |
|---|---:|
| Planned articles | 56 |
| — with a processed local source | 50 |
| — authored from authoritative sources only | 6 |
| Distinct corpus files touching this system | 174 |

The 6 without a local source are **not** blocked. Under `LD-14` they are
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

None proposed. SYS-FND-T06 `Core mechanisms` overlaps conceptually with SYS-MUL-T01 `Acute deterioration`; confirm in Phase 1 that the split is principle-vs-management and record it, rather than merging.

No taxonomy change is made outside Phase 1, and none is made without: the
existing node, the proposed change, the rationale, the source(s), the affected
IDs/records, a migration plan, the crosswalk impact, the student-navigation
impact, and a rollback strategy (LD-06).

---

## 6. Existing content disposition ledger

3 articles and 22 concepts have SYS-FND as their canonical home. A further 2 articles and 23 concepts are placed here secondarily. `ART-FND-TOP-EC5A247500` is `Published` with 2 published sections and is one of the 17 articles affected by BLK-06/BLK-07.

**Measured baseline for `SYS-FND`:**

| Metric | Canonical home here | Any placement here |
|---|---:|---:|
| Articles | 3 | 5 |
| Concepts | 22 | 45 |
| Relations touching these concepts | — | 11 |
| Published articles | 0 | 0 |
| Articles with annotations | 0 | 0 |
| Articles with image recommendations | 0 (no model exists) | 0 |

| Article ID | Title | Status | Gate | Template | Disposition and why |
|---|---|---|---|---|---|
| `ART-FND-TOP-9E1180D1D1` | Membrane Transport | In review | `needs_evidence` | `TPL-CONCEPT` | **enrich** — annotations (0), related-reading projection, image recommendations, archetype-contract completion |
| `ART-FND-TOP-770778D86F` | Pharmacokinetics: Distribution, Dosing, and Clearance | In review | `faculty_review` | `TPL-DRUG` | **enrich** — annotations (0), related-reading projection, image recommendations, archetype-contract completion |
| `ART-FND-TOP-008C54089F` | Acids, Bases, and pH | In review | `needs_evidence` | `TPL-CONCEPT` | **enrich** — annotations (0), related-reading projection, image recommendations, archetype-contract completion |

### Decided dispositions (`SYS-FND-INVENTORY-001`, 2026-08-12)

Evidence: [`SYS-FND-disposition-ledger.json`](../evidence/SYS-FND-disposition-ledger.json).

| | Articles | Concepts |
|---|---:|---:|
| Touching this system | 5 | 45 |
| Canonically homed here | 3 | 22 |
| `enrich` | 5 | 45 |
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
`SYS-FND-INVENTORY-001` must count how many of them belong to this system and
plan their repair under a documented migration — never a deletion.

---

## 7. Planned article catalogue

**Estimated scale (range, with assumptions).**

| Kind | Estimate | Assumption |
|---|---|---|
| Navigation-only hubs | 6–14 | topics are hubs by default; roughly half the subtopics stay hubs under LD-04 |
| Overview articles | 2–6 | only where an overview adds real teaching value beyond its children |
| Atomic articles | 37–69 | ≈0.7–1.3 per microtopic: some microtopics merge into one studiable unit, others split |
| **Total articles** | **39–75** | |

These are ranges derived from node counts, not commitments. `SYS-FND-INVENTORY-001`
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

**Baseline to improve on honestly:** 45 concepts currently touch this
system; 22 are canonically homed here; 11 relations touch
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
having):** Everything. `prerequisite_of` edges from SYS-FND concepts are the single highest-value relationship batch in the programme, because they define the order in which the library can be studied at all.

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

- General pharmacology dosing principles (SYS-FND-T04) — any worked dose calculation is `treatment_or_action` and needs faculty review.
- Antimicrobial principles in SYS-FND-T05 overlap SYS-INF-T06 stewardship; resistance guidance is time-sensitive.

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

- Cell-signalling pathway diagrams (SYS-FND-T01) — mechanism sequences that prose cannot hold.
- Inheritance pattern pedigrees (SYS-FND-T02).
- Inflammation cascade flowchart and cell-injury/necrosis-vs-apoptosis comparison table (SYS-FND-T03).
- Dose–response and pharmacokinetic curves (SYS-FND-T04) — graphs are the content.
- Gram stain and bacterial morphology plates (SYS-FND-T05).

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

Highest concept-per-question density in the library: foundational principles are the standard distractor material for every clinical system. Expect the largest single Qbank blueprint share. Practical relevance is low (few OSCE stations), except laboratory-interpretation items.

Recorded intent for this system: target concepts are the atomic-article concepts
identified in §8; proposed formats follow from the archetypes in §7; the
dependency is that a question may only target a concept that is published and
reciprocally linked to a published article.

---

## 14. Batch sequence, dependencies, risk and validation

| # | Task ID | Objective | Batch boundary | Depends on |
|---:|---|---|---|---|
| 1 | `SYS-FND-INVENTORY-001` | Classify every one of the 74 nodes; build the existing-content disposition ledger; count `BLK-09` records | Classification + ledger only. No content written | `GATE-TAX-001` |
| 2 | `SYS-FND-SOURCE-001` | Build the source plan: local corpus records with state, authoritative web sources per topic, conflicts to resolve | Source plan only | task 1 |
| 3 | `SYS-FND-CONCEPT-001..n` | Concept batches, one topic each, ≤60 concepts | One topic per batch | task 2 |
| 4 | `SYS-FND-ARTICLE-001..n` | Article batches, one topic each, ≤10 articles | One topic per batch | task 3 |
| 5 | `SYS-FND-RELATION-001..n` | Relation batches, one family each, ≤80 edges | One family per batch | task 4 |
| 6 | `SYS-FND-ANNOT-001` | Statement annotations across the system's atomic articles | ≤50 annotations | task 4 |
| 7 | `SYS-FND-IMAGE-001` | Image recommendation inventory | All recommendations, no media fulfilment | task 4 |
| 8 | `SYS-FND-PUBLISH-001` | Apply publication gates; enumerate the faculty-review queue | No high-risk publication without a named reviewer | tasks 4–7, `OQ-02` |
| 9 | `GATE-SYS-FND` | System completion | — | tasks 1–8 |

**Validation commands for every batch:**

```bash
npm run medical:validate:authoring
npm run medical:validate:taxonomy
npm run medical:build && npm run medical:audit
npm test
```

**Risks specific to this system:**

- 87 unprocessed local General/ files mean the local curriculum emphasis for foundations is currently unknown (OQ-04).
- Over-authoring: foundations can absorb unlimited depth. The `Years 1–4` boundary must be enforced per article, not per topic.

**Completion criteria (`GATE-SYS-FND`).** All 74
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

> **`SYS-FND-INVENTORY-001` — Classify every node and build the disposition ledger.**

**Do not start this task until `GATE-TAX-001` has passed and its evidence is
linked in the master plan.** `GATE-PLATFORM-001` passed on 2026-08-12.

- **Objective.** Assign every one of the 74 `SYS-FND` nodes
  exactly one classification (`navigation-only hub` · `overview article` ·
  `atomic article home` · `secondary placement only` ·
  `empty but legitimate planned destination`), and record a disposition for
  every one of the 5 articles and 45 concepts that
  currently touch this system.
- **Non-goals.** Do not author any article, concept or relation. Do not change
  the taxonomy. Do not publish anything.
- **Files to read.** This plan · [MASTER-PLAN.md](../MASTER-PLAN.md) ·
  `src/data/medicalLibraryTaxonomy.ts` · `src/data/articleTemplates.ts` ·
  `server/data/medical-library-v1.json` ·
  `docs/authoring/library-article-archetypes.md`
- **Files to write.**
  `docs/medical-library-program/evidence/SYS-FND-node-classification.json` and
  `docs/medical-library-program/evidence/SYS-FND-disposition-ledger.json`
- **Acceptance.** Every node has exactly one classification with a one-line
  rationale. Every existing article and concept has a disposition with a reason.
  `BLK-09` records belonging to this system are counted. No content changed —
  `git status` shows only the two new evidence files and this plan's updates.
- **Validation.** `npm run medical:audit` still passes unchanged.
- **Stop condition.** Both evidence files exist and §2, §6 and §7 of this plan
  have been updated with the decided figures. Then set
  `SYS-FND-INVENTORY-001` to `Done`, record the commit, and set the active task
  to `SYS-FND-SOURCE-001`.
