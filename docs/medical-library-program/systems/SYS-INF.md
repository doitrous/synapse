# SYS-INF — Infection & Tropical Medicine

**System 12 of 19** in the locked execution order (LD-09). Previous: [SYS-IMM](SYS-IMM.md). Next: [SYS-OBS](SYS-OBS.md).
Parent plan: [MASTER-PLAN.md](../MASTER-PLAN.md).

| | |
|---|---|
| **Status** | Not started |
| **Blocked by** | `GATE-TAX-001`. `GATE-PLATFORM-001` **passed** 2026-08-12 |
| **Active task** | `SYS-INF-INVENTORY-001` (Not started) |
| **Baseline date** | 2026-08-12 at commit `2df5853` |

---

## 1. Scope, learner years, prerequisites and cross-system dependencies

**In scope.** Bacterial, viral, fungal and parasitic disease; syndromic infectious disease; antimicrobials and stewardship; and infection prevention with explicit Egyptian context.

**Out of scope.** Organ-specific infection syndromes have their canonical home in the organ system (pneumonia in SYS-RES, meningitis in SYS-NEU); SYS-INF owns the organism and the cross-system syndromic view.

**Learner years.** Years 2–4

**Prerequisites.** SYS-FND (general microbiology), SYS-IMM (host defence).

**Cross-system dependencies.** Every organ system. Also SYS-POP (surveillance, outbreak), SYS-OBS (congenital and perinatal infection), SYS-MUL (sepsis).

**Runtime tree.** No runtime subject maps to SYS-INF. `pharm-antimicrobial-pharmacology` crosswalks to SYS-INF as a secondary placement.

---

## 2. Current canonical and runtime taxonomy inventory

| Level | Count |
|---|---:|
| Topics | 7 |
| Subtopics | 17 |
| Microtopics | 60 |
| **Total descendants** | **84** |

| Topic ID | Title | Template | Subtopics | Microtopics | Initial classification |
|---|---|---|---:|---:|---|
| `SYS-INF-T01` | Bacterial disease | `TPL-ORGANISM` | 3 | 9 | Hub (confirm in inventory) |
| `SYS-INF-T02` | Viral disease | `TPL-ORGANISM` | 3 | 12 | Hub (confirm in inventory) |
| `SYS-INF-T03` | Fungal disease | `TPL-ORGANISM` | 2 | 5 | Hub (confirm in inventory) |
| `SYS-INF-T04` | Parasitology | `TPL-ORGANISM` | 2 | 8 | Hub (confirm in inventory) |
| `SYS-INF-T05` | Syndromic infectious disease | `TPL-CONDITION` | 2 | 8 | Hub (confirm in inventory) |
| `SYS-INF-T06` | Antimicrobials and stewardship | `TPL-DRUG` | 3 | 10 | Hub (confirm in inventory) |
| `SYS-INF-T07` | Infection prevention and Egyptian context | `TPL-CONDITION` | 2 | 8 | Hub (confirm in inventory) |

<details>
<summary>Full node tree (84 nodes)</summary>

- `SYS-INF-T01` **Bacterial disease** *(TPL-ORGANISM)*
  - `SYS-INF-T01-S01` **Gram-positive infection** — `Staphylococci` · `Streptococci` · `Clostridia`
  - `SYS-INF-T01-S02` **Gram-negative infection** — `Enteric bacteria` · `Neisseria` · `Pseudomonas`
  - `SYS-INF-T01-S03` **Mycobacterial disease** — `Tuberculosis` · `Leprosy` · `Nontuberculous mycobacteria`
- `SYS-INF-T02` **Viral disease** *(TPL-ORGANISM)*
  - `SYS-INF-T02-S01` **Respiratory and exanthem viruses** — `Influenza` · `Coronaviruses` · `Measles` · `Mumps` · `Rubella`
  - `SYS-INF-T02-S02` **Blood-borne and chronic viruses** — `HIV` · `HBV` · `HCV`
  - `SYS-INF-T02-S03` **Herpes and neurotropic viruses** — `HSV` · `VZV` · `CMV` · `Rabies`
- `SYS-INF-T03` **Fungal disease** *(TPL-ORGANISM)*
  - `SYS-INF-T03-S01` **Superficial and mucosal mycoses** — `Dermatophytes` · `Candida`
  - `SYS-INF-T03-S02` **Systemic and opportunistic mycoses** — `Aspergillus` · `Cryptococcus` · `Mucor`
- `SYS-INF-T04` **Parasitology** *(TPL-ORGANISM)*
  - `SYS-INF-T04-S01` **Protozoal disease** — `Malaria` · `Amoebiasis` · `Giardiasis` · `Toxoplasmosis`
  - `SYS-INF-T04-S02` **Helminthic disease** — `Schistosomiasis` · `Filaria` · `Cestodes` · `Nematodes`
- `SYS-INF-T05` **Syndromic infectious disease** *(TPL-CONDITION)*
  - `SYS-INF-T05-S01` **Fever syndromes** — `Fever of unknown origin` · `Sepsis` · `Febrile traveler`
  - `SYS-INF-T05-S02` **Organ-based infection** — `Meningitis` · `Endocarditis` · `Pneumonia` · `Gastroenteritis` · `UTI`
- `SYS-INF-T06` **Antimicrobials and stewardship** *(TPL-DRUG)*
  - `SYS-INF-T06-S01` **Antibacterial therapy** — `Drug classes` · `Empiric choice` · `Resistance`
  - `SYS-INF-T06-S02` **Antiviral, antifungal and antiparasitic therapy** — `Indications` · `Toxicity` · `Interactions`
  - `SYS-INF-T06-S03` **Stewardship** — `Specimens` · `De-escalation` · `Duration` · `Prophylaxis`
- `SYS-INF-T07` **Infection prevention and Egyptian context** *(TPL-CONDITION)*
  - `SYS-INF-T07-S01` **Prevention and control** — `Isolation` · `Vaccination` · `Needlestick injury` · `Outbreaks`
  - `SYS-INF-T07-S02` **Locally important infections** — `Schistosomiasis` · `Viral hepatitis` · `Tuberculosis` · `Food- and water-borne disease`

</details>

### Decided classification (`SYS-INF-INVENTORY-001`, 2026-08-12)

All 84 nodes are classified. Evidence:
[`SYS-INF-node-classification.json`](../evidence/SYS-INF-node-classification.json).

| Classification | Nodes |
|---|---:|
| navigation-only hub | 21 |
| overview article | 3 |
| atomic article home | 60 |
| empty but legitimate planned destination | 0 |
| **Planned articles** | **63** |

27 of these nodes carry a local teaching signal — the corpus teaches
them in two or more processed sources — and are the ones to author first (`LD-14`).

*Initial classification is a placeholder. `SYS-INF-INVENTORY-001` replaces every
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
| **No AMBOSS system root for infection** | `genuine undergraduate gap to add` — already added by Synapse | AMBOSS distributes infection across organ systems and `Microbiology`. SYS-INF is a deliberate Synapse addition justified by Egyptian tropical-medicine teaching. **Do not delete it to match AMBOSS.** |
| `Microbiology` (By discipline) | `secondary placement or cross-reference` | DIS-MIC and DIS-PAR are the discipline routes. |
| AMBOSS tropical/parasitic coverage | `genuine undergraduate gap to add` | AMBOSS is US-oriented and under-weights schistosomiasis, leishmaniasis, brucellosis and hydatid disease relative to Egyptian curricula. This is a case where AMBOSS is the *weaker* comparator and must not narrow Synapse scope. |

Full per-node dispositions are produced by `TAX-COMPARE-001` in Phase 1. The
rows above are the system-level judgements that shape this plan; they are not a
substitute for that ledger.

---

## 4. Local university-source coverage and readiness

Kasr Alainy `6. Microbiology` (4 of 5 complete) and `7. Parasitology` (3 of 3 complete) — parasitology is the only fully-complete Kasr Alainy folder. This is a genuine local strength and directly supports SYS-INF-T04 and SYS-INF-T07.

### Decided source plan (`SYS-INF-SOURCE-001`, 2026-08-12)

Evidence: [`SYS-INF-source-plan.md`](../evidence/SYS-INF-source-plan.md) ·
[`SYS-INF-source-plan.json`](../evidence/SYS-INF-source-plan.json).

| | |
|---|---:|
| Planned articles | 63 |
| — with a processed local source | 50 |
| — authored from authoritative sources only | 13 |
| Distinct corpus files touching this system | 94 |

The 13 without a local source are **not** blocked. Under `LD-14` they are
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

SYS-INF-T07 `Infection prevention and Egyptian context` is a Synapse-specific topic with no AMBOSS analogue. Confirm it survives Phase 1 and is not treated as a gap because the comparator lacks it.

No taxonomy change is made outside Phase 1, and none is made without: the
existing node, the proposed change, the rationale, the source(s), the affected
IDs/records, a migration plan, the crosswalk impact, the student-navigation
impact, and a rollback strategy (LD-06).

---

## 6. Existing content disposition ledger

No canonical article or concept under SYS-INF. 10 articles and 121 concepts secondary — 79 concepts canonically in DIS-MIC and 19 in DIS-PAR. Same canonical-home question as SYS-IMM (DEC-005).

**Measured baseline for `SYS-INF`:**

| Metric | Canonical home here | Any placement here |
|---|---:|---:|
| Articles | 0 | 10 |
| Concepts | 0 | 121 |
| Relations touching these concepts | — | 0 |
| Published articles | 0 | 0 |
| Articles with annotations | 0 | 0 |
| Articles with image recommendations | 0 (no model exists) | 0 |

| Article ID | Title | Status | Gate | Template | Disposition and why |
|---|---|---|---|---|---|
| — | *No article has `SYS-INF` as its canonical home* | — | — | — | Every article in this system is new, or is a `move of canonical home` decision on a discipline-rooted record (DEC-005) |

### Decided dispositions (`SYS-INF-INVENTORY-001`, 2026-08-12)

Evidence: [`SYS-INF-disposition-ledger.json`](../evidence/SYS-INF-disposition-ledger.json).

| | Articles | Concepts |
|---|---:|---:|
| Touching this system | 10 | 121 |
| Canonically homed here | 0 | 0 |
| `enrich` | 10 | 121 |
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
`SYS-INF-INVENTORY-001` must count how many of them belong to this system and
plan their repair under a documented migration — never a deletion.

---

## 7. Planned article catalogue

**Estimated scale (range, with assumptions).**

| Kind | Estimate | Assumption |
|---|---|---|
| Navigation-only hubs | 7–16 | topics are hubs by default; roughly half the subtopics stay hubs under LD-04 |
| Overview articles | 2–7 | only where an overview adds real teaching value beyond its children |
| Atomic articles | 42–78 | ≈0.7–1.3 per microtopic: some microtopics merge into one studiable unit, others split |
| **Total articles** | **44–85** | |

These are ranges derived from node counts, not commitments. `SYS-INF-INVENTORY-001`
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

**Baseline to improve on honestly:** 121 concepts currently touch this
system; 0 are canonically homed here; 0 relations touch
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
having):** Every organ system. Also SYS-POP (surveillance, outbreak), SYS-OBS (congenital and perinatal infection), SYS-MUL (sepsis).

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

- **Every antimicrobial regimen is `treatment_or_action` and time-sensitive.** Resistance patterns are jurisdiction-specific; an international regimen may be actively wrong in Egypt. Faculty review mandatory, plus explicit local sourcing.
- Antituberculous and antiretroviral therapy — dosing and duration.
- Antiparasitic dosing (praziquantel, artemisinin combinations).
- Post-exposure prophylaxis protocols.

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

- Bacterial classification decision tree (Gram, morphology, oxygen requirement) — an algorithm that prose cannot replace.
- Parasite life-cycle diagrams — mandatory; schistosomiasis, malaria, leishmaniasis, hydatid. Life cycles are unlearnable from prose.
- Virus structure and replication cycle diagrams.
- Stain and culture appearance plates.
- Antimicrobial mechanism-of-action target diagram mapped to the bacterial cell.
- Notifiable disease and outbreak-response flowchart (Egyptian).

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

Very high Qbank density. Moderate OSCE relevance (infection-control technique, hand hygiene, sharps). **High laboratory-interpretation relevance** — stain and culture identification items.

Recorded intent for this system: target concepts are the atomic-article concepts
identified in §8; proposed formats follow from the archetypes in §7; the
dependency is that a question may only target a concept that is published and
reciprocally linked to a published article.

---

## 14. Batch sequence, dependencies, risk and validation

| # | Task ID | Objective | Batch boundary | Depends on |
|---:|---|---|---|---|
| 1 | `SYS-INF-INVENTORY-001` | Classify every one of the 84 nodes; build the existing-content disposition ledger; count `BLK-09` records | Classification + ledger only. No content written | `GATE-TAX-001` |
| 2 | `SYS-INF-SOURCE-001` | Build the source plan: local corpus records with state, authoritative web sources per topic, conflicts to resolve | Source plan only | task 1 |
| 3 | `SYS-INF-CONCEPT-001..n` | Concept batches, one topic each, ≤60 concepts | One topic per batch | task 2 |
| 4 | `SYS-INF-ARTICLE-001..n` | Article batches, one topic each, ≤10 articles | One topic per batch | task 3 |
| 5 | `SYS-INF-RELATION-001..n` | Relation batches, one family each, ≤80 edges | One family per batch | task 4 |
| 6 | `SYS-INF-ANNOT-001` | Statement annotations across the system's atomic articles | ≤50 annotations | task 4 |
| 7 | `SYS-INF-IMAGE-001` | Image recommendation inventory | All recommendations, no media fulfilment | task 4 |
| 8 | `SYS-INF-PUBLISH-001` | Apply publication gates; enumerate the faculty-review queue | No high-risk publication without a named reviewer | tasks 4–7, `OQ-02` |
| 9 | `GATE-SYS-INF` | System completion | — | tasks 1–8 |

**Validation commands for every batch:**

```bash
npm run medical:validate:authoring
npm run medical:validate:taxonomy
npm run medical:build && npm run medical:audit
npm test
```

**Risks specific to this system:**

- The single system where using AMBOSS as the coverage yardstick would actively harm the product. Guard LD-08 explicitly here.
- Antimicrobial content will sit in the faculty-review queue; sequence the organism and life-cycle articles first so the system is not blocked behind therapy.

**Completion criteria (`GATE-SYS-INF`).** All 84
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

> **`SYS-INF-INVENTORY-001` — Classify every node and build the disposition ledger.**

**Do not start this task until `GATE-TAX-001` has passed and its evidence is
linked in the master plan.** `GATE-PLATFORM-001` passed on 2026-08-12.

- **Objective.** Assign every one of the 84 `SYS-INF` nodes
  exactly one classification (`navigation-only hub` · `overview article` ·
  `atomic article home` · `secondary placement only` ·
  `empty but legitimate planned destination`), and record a disposition for
  every one of the 10 articles and 121 concepts that
  currently touch this system.
- **Non-goals.** Do not author any article, concept or relation. Do not change
  the taxonomy. Do not publish anything.
- **Files to read.** This plan · [MASTER-PLAN.md](../MASTER-PLAN.md) ·
  `src/data/medicalLibraryTaxonomy.ts` · `src/data/articleTemplates.ts` ·
  `server/data/medical-library-v1.json` ·
  `docs/authoring/library-article-archetypes.md`
- **Files to write.**
  `docs/medical-library-program/evidence/SYS-INF-node-classification.json` and
  `docs/medical-library-program/evidence/SYS-INF-disposition-ledger.json`
- **Acceptance.** Every node has exactly one classification with a one-line
  rationale. Every existing article and concept has a disposition with a reason.
  `BLK-09` records belonging to this system are counted. No content changed —
  `git status` shows only the two new evidence files and this plan's updates.
- **Validation.** `npm run medical:audit` still passes unchanged.
- **Stop condition.** Both evidence files exist and §2, §6 and §7 of this plan
  have been updated with the decided figures. Then set
  `SYS-INF-INVENTORY-001` to `Done`, record the commit, and set the active task
  to `SYS-INF-SOURCE-001`.
