# SYS-GIT — Gastrointestinal, Hepatobiliary & Pancreatic

**System 6 of 19** in the locked execution order (LD-09). Previous: [SYS-REN](SYS-REN.md). Next: [SYS-END](SYS-END.md).
Parent plan: [MASTER-PLAN.md](../MASTER-PLAN.md).

| | |
|---|---|
| **Status** | Not started |
| **Blocked by** | `GATE-TAX-001`. `GATE-PLATFORM-001` **passed** 2026-08-12 |
| **Active task** | `SYS-GIT-INVENTORY-001` (Not started) |
| **Baseline date** | 2026-08-12 at commit `2df5853` |

---

## 1. Scope, learner years, prerequisites and cross-system dependencies

**In scope.** GI structure and function, GI presentations, oesophageal/gastroduodenal disease, small-bowel and nutritional disease, colorectal and anorectal disease, liver disease, biliary and pancreatic disease, GI investigations and procedures, and oral cavity and salivary glands.

**Out of scope.** GI drug classes (DIS-PHA). Nutrition across the life course (SYS-DEV) — SYS-GIT owns malabsorption and nutritional *disease*.

**Learner years.** Years 1–2 structure/function; Years 3–4 disease, investigation and procedures

**Prerequisites.** SYS-FND, DIS-ANA, DIS-PHY, DIS-BIO (metabolism).

**Cross-system dependencies.** SYS-INF (viral hepatitis, schistosomiasis — very high Egyptian relevance), SYS-HEM (portal hypertension, varices), SYS-FND (metabolism), SYS-MUL (GI bleeding as an emergency).

**Runtime tree.** Runtime subject `gi` — 8 topics, fully crosswalked.

---

## 2. Current canonical and runtime taxonomy inventory

| Level | Count |
|---|---:|
| Topics | 9 |
| Subtopics | 21 |
| Microtopics | 78 |
| **Total descendants** | **108** |

| Topic ID | Title | Template | Subtopics | Microtopics | Initial classification |
|---|---|---|---:|---:|---|
| `SYS-GIT-T01` | Structure and function | `TPL-CONCEPT` | 2 | 11 | Hub (confirm in inventory) |
| `SYS-GIT-T02` | Gastrointestinal presentations | `TPL-PRESENTATION` | 3 | 12 | Hub (confirm in inventory) |
| `SYS-GIT-T03` | Esophageal and gastroduodenal disease | `TPL-CONDITION` | 2 | 8 | Hub (confirm in inventory) |
| `SYS-GIT-T04` | Small-bowel and nutritional disease | `TPL-CONDITION` | 2 | 6 | Hub (confirm in inventory) |
| `SYS-GIT-T05` | Colorectal and anorectal disease | `TPL-CONDITION` | 3 | 10 | Hub (confirm in inventory) |
| `SYS-GIT-T06` | Liver disease | `TPL-CONDITION` | 3 | 9 | Hub (confirm in inventory) |
| `SYS-GIT-T07` | Biliary and pancreatic disease | `TPL-CONDITION` | 2 | 7 | Hub (confirm in inventory) |
| `SYS-GIT-T08` | GI investigations and procedures | `TPL-INVESTIGATION` | 2 | 8 | Hub (confirm in inventory) |
| `SYS-GIT-T09` | Oral cavity and salivary glands | `TPL-CONDITION` | 2 | 7 | Hub (confirm in inventory) |

<details>
<summary>Full node tree (108 nodes)</summary>

- `SYS-GIT-T01` **Structure and function** *(TPL-CONCEPT)*
  - `SYS-GIT-T01-S01` **GI anatomy and histology** — `Oral cavity` · `Esophagus` · `Stomach` · `Intestine` · `Liver` · `Pancreas`
  - `SYS-GIT-T01-S02` **GI physiology and biochemistry** — `Motility` · `Secretion` · `Digestion` · `Absorption` · `Bile`
- `SYS-GIT-T02` **Gastrointestinal presentations** *(TPL-PRESENTATION)*
  - `SYS-GIT-T02-S01` **Upper GI symptoms** — `Dysphagia` · `Dyspepsia` · `Nausea` · `Vomiting` · `Hematemesis`
  - `SYS-GIT-T02-S02` **Lower GI symptoms** — `Abdominal pain` · `Diarrhea` · `Constipation` · `Rectal bleeding`
  - `SYS-GIT-T02-S03` **Hepatobiliary symptoms** — `Jaundice` · `Ascites` · `Pruritus`
- `SYS-GIT-T03` **Esophageal and gastroduodenal disease** *(TPL-CONDITION)*
  - `SYS-GIT-T03-S01` **Esophageal disease** — `GERD` · `Achalasia` · `Esophagitis` · `Cancer`
  - `SYS-GIT-T03-S02` **Stomach and duodenum** — `Gastritis` · `Peptic ulcer` · `Gastric cancer` · `Upper GI bleeding`
- `SYS-GIT-T04` **Small-bowel and nutritional disease** *(TPL-CONDITION)*
  - `SYS-GIT-T04-S01` **Malabsorption and intolerance** — `Celiac disease` · `Lactose intolerance` · `Short bowel`
  - `SYS-GIT-T04-S02` **Obstruction and ischemia** — `Small-bowel obstruction` · `Mesenteric ischemia` · `Intussusception`
- `SYS-GIT-T05` **Colorectal and anorectal disease** *(TPL-CONDITION)*
  - `SYS-GIT-T05-S01` **Inflammatory and functional disease** — `IBD` · `IBS` · `Diverticular disease`
  - `SYS-GIT-T05-S02` **Colorectal emergencies and cancer** — `Appendicitis` · `Obstruction` · `Colorectal cancer`
  - `SYS-GIT-T05-S03` **Anorectal disease** — `Hemorrhoids` · `Fissure` · `Fistula` · `Abscess`
- `SYS-GIT-T06` **Liver disease** *(TPL-CONDITION)*
  - `SYS-GIT-T06-S01` **Hepatitis and fatty liver** — `Viral hepatitis` · `Alcohol-related disease` · `MASLD`
  - `SYS-GIT-T06-S02` **Cirrhosis and portal hypertension** — `Ascites` · `Varices` · `Encephalopathy` · `HRS`
  - `SYS-GIT-T06-S03` **Liver tumors** — `HCC` · `Metastatic disease`
- `SYS-GIT-T07` **Biliary and pancreatic disease** *(TPL-CONDITION)*
  - `SYS-GIT-T07-S01` **Biliary disease** — `Gallstones` · `Cholecystitis` · `Cholangitis` · `Cholestasis`
  - `SYS-GIT-T07-S02` **Pancreatic disease** — `Acute pancreatitis` · `Chronic pancreatitis` · `Pancreatic cancer`
- `SYS-GIT-T08` **GI investigations and procedures** *(TPL-INVESTIGATION)*
  - `SYS-GIT-T08-S01` **Diagnostic tests** — `Liver profile` · `Stool tests` · `Endoscopy` · `Abdominal imaging`
  - `SYS-GIT-T08-S02` **Procedures and surgery** — `NG tube` · `Paracentesis` · `Endoscopy` · `Stoma care`
- `SYS-GIT-T09` **Oral cavity and salivary glands** *(TPL-CONDITION)*
  - `SYS-GIT-T09-S01` **Oral and dental presentations** — `Oral ulceration` · `Dental infection` · `Oral lesions and cancer` · `Dry mouth`
  - `SYS-GIT-T09-S02` **Salivary gland disease** — `Sialadenitis` · `Salivary stones` · `Salivary gland tumors`

</details>

*Initial classification is a placeholder. `SYS-GIT-INVENTORY-001` replaces every
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
| `Gastrointestinal system and nutrition` (By system) | `useful rename or split` | AMBOSS bundles nutrition here; Synapse places nutrition-across-the-life-course in SYS-DEV and nutritional *disease* in SYS-GIT-T04. Keep the Synapse split and record the mapping. |
| `Surgery → General/GI surgery` | `secondary placement or cross-reference` |  |
| `Ear, nose, and throat` | `already covered under a different Synapse label` | Oral cavity is SYS-GIT-T09 (added by the taxonomy review); the ENT view is SYS-NEU-T08 and DIS-ENT. |

Full per-node dispositions are produced by `TAX-COMPARE-001` in Phase 1. The
rows above are the system-level judgements that shape this plan; they are not a
substitute for that ledger.

---

## 4. Local university-source coverage and readiness

The corpus root directory is literally named "Resources Digestion" — this refers to *document digestion*, not gastroenterology, and must not be misread as GI-specific evidence. No dedicated GI folder exists. Ain Shams 3rd Year (1,409 files, 0 processed) is the likely carrier.

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

None proposed. SYS-GIT-T09 `Oral cavity and salivary glands` was an explicit taxonomy-review addition to close an undergraduate gap; confirm it is not silently dropped.

No taxonomy change is made outside Phase 1, and none is made without: the
existing node, the proposed change, the rationale, the source(s), the affected
IDs/records, a migration plan, the crosswalk impact, the student-navigation
impact, and a rollback strategy (LD-06).

---

## 6. Existing content disposition ledger

No canonical article or concept. 10 articles and 126 concepts reach in secondarily. 1 article `Published` (`ART-GIT-TOP-B1C6D362AA`), affected by BLK-06/BLK-07.

**Measured baseline for `SYS-GIT`:**

| Metric | Canonical home here | Any placement here |
|---|---:|---:|
| Articles | 0 | 10 |
| Concepts | 0 | 126 |
| Relations touching these concepts | — | 3 |
| Published articles | 0 | 1 |
| Articles with annotations | 0 | 0 |
| Articles with image recommendations | 0 (no model exists) | 0 |

| Article ID | Title | Status | Gate | Template | Disposition and why |
|---|---|---|---|---|---|
| — | *No article has `SYS-GIT` as its canonical home* | — | — | — | Every article in this system is new, or is a `move of canonical home` decision on a discipline-rooted record (DEC-005) |

Allowed dispositions: `keep` · `enrich` · `correct` · `merge` · `split` ·
`redirect` · `deprecate` · `exclude`. Every row states why. Stable IDs are
preserved (LD-06).

**`BLK-09` check for this system.** 62 articles and 736 concepts across the
repository carry `subjectId: "medical"`, which is not one of the eight valid
subject IDs and makes them unreachable in the student library.
`SYS-GIT-INVENTORY-001` must count how many of them belong to this system and
plan their repair under a documented migration — never a deletion.

---

## 7. Planned article catalogue

**Estimated scale (range, with assumptions).**

| Kind | Estimate | Assumption |
|---|---|---|
| Navigation-only hubs | 9–20 | topics are hubs by default; roughly half the subtopics stay hubs under LD-04 |
| Overview articles | 3–9 | only where an overview adds real teaching value beyond its children |
| Atomic articles | 55–101 | ≈0.7–1.3 per microtopic: some microtopics merge into one studiable unit, others split |
| **Total articles** | **58–110** | |

These are ranges derived from node counts, not commitments. `SYS-GIT-INVENTORY-001`
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

**Baseline to improve on honestly:** 126 concepts currently touch this
system; 0 are canonically homed here; 3 relations touch
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
having):** SYS-INF (viral hepatitis, schistosomiasis — very high Egyptian relevance), SYS-HEM (portal hypertension, varices), SYS-FND (metabolism), SYS-MUL (GI bleeding as an emergency).

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

- Variceal bleeding and acute upper GI haemorrhage management — emergency, `treatment_or_action`, faculty review.
- Hepatitis B and C antiviral therapy — changes rapidly and Egypt has a nationally significant HCV programme; time-sensitive with mandatory local sourcing.
- Acute pancreatitis fluid management — dosing-adjacent.

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

- Foregut/midgut/hindgut blood supply and embryological derivation diagram.
- Liver lobule / acinus histology plate with zonation.
- Biliary tree anatomy with obstruction levels.
- Jaundice classification comparison table (pre-/intra-/post-hepatic).
- Endoscopy and abdominal imaging examples — rights-sensitive.
- Inguinal canal and hernia anatomy plate.

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

High Qbank density. High OSCE relevance: abdominal examination, jaundice history, hernia examination. Strong laboratory-interpretation relevance (LFT patterns).

Recorded intent for this system: target concepts are the atomic-article concepts
identified in §8; proposed formats follow from the archetypes in §7; the
dependency is that a question may only target a concept that is published and
reciprocally linked to a published article.

---

## 14. Batch sequence, dependencies, risk and validation

| # | Task ID | Objective | Batch boundary | Depends on |
|---:|---|---|---|---|
| 1 | `SYS-GIT-INVENTORY-001` | Classify every one of the 108 nodes; build the existing-content disposition ledger; count `BLK-09` records | Classification + ledger only. No content written | `GATE-TAX-001` |
| 2 | `SYS-GIT-SOURCE-001` | Build the source plan: local corpus records with state, authoritative web sources per topic, conflicts to resolve | Source plan only | task 1 |
| 3 | `SYS-GIT-CONCEPT-001..n` | Concept batches, one topic each, ≤60 concepts | One topic per batch | task 2 |
| 4 | `SYS-GIT-ARTICLE-001..n` | Article batches, one topic each, ≤10 articles | One topic per batch | task 3 |
| 5 | `SYS-GIT-RELATION-001..n` | Relation batches, one family each, ≤80 edges | One family per batch | task 4 |
| 6 | `SYS-GIT-ANNOT-001` | Statement annotations across the system's atomic articles | ≤50 annotations | task 4 |
| 7 | `SYS-GIT-IMAGE-001` | Image recommendation inventory | All recommendations, no media fulfilment | task 4 |
| 8 | `SYS-GIT-PUBLISH-001` | Apply publication gates; enumerate the faculty-review queue | No high-risk publication without a named reviewer | tasks 4–7, `OQ-02` |
| 9 | `GATE-SYS-GIT` | System completion | — | tasks 1–8 |

**Validation commands for every batch:**

```bash
npm run medical:validate:authoring
npm run medical:validate:taxonomy
npm run medical:build && npm run medical:audit
npm test
```

**Risks specific to this system:**

- Egyptian hepatology (HCV, schistosomiasis) is a genuine local-emphasis area that generic international sources will under-weight. Requires deliberate regional sourcing.

**Completion criteria (`GATE-SYS-GIT`).** All 108
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

> **`SYS-GIT-INVENTORY-001` — Classify every node and build the disposition ledger.**

**Do not start this task until `GATE-TAX-001` has passed and its evidence is
linked in the master plan.** `GATE-PLATFORM-001` passed on 2026-08-12.

- **Objective.** Assign every one of the 108 `SYS-GIT` nodes
  exactly one classification (`navigation-only hub` · `overview article` ·
  `atomic article home` · `secondary placement only` ·
  `empty but legitimate planned destination`), and record a disposition for
  every one of the 10 articles and 126 concepts that
  currently touch this system.
- **Non-goals.** Do not author any article, concept or relation. Do not change
  the taxonomy. Do not publish anything.
- **Files to read.** This plan · [MASTER-PLAN.md](../MASTER-PLAN.md) ·
  `src/data/medicalLibraryTaxonomy.ts` · `src/data/articleTemplates.ts` ·
  `server/data/medical-library-v1.json` ·
  `docs/authoring/library-article-archetypes.md`
- **Files to write.**
  `docs/medical-library-program/evidence/SYS-GIT-node-classification.json` and
  `docs/medical-library-program/evidence/SYS-GIT-disposition-ledger.json`
- **Acceptance.** Every node has exactly one classification with a one-line
  rationale. Every existing article and concept has a disposition with a reason.
  `BLK-09` records belonging to this system are counted. No content changed —
  `git status` shows only the two new evidence files and this plan's updates.
- **Validation.** `npm run medical:audit` still passes unchanged.
- **Stop condition.** Both evidence files exist and §2, §6 and §7 of this plan
  have been updated with the decided figures. Then set
  `SYS-GIT-INVENTORY-001` to `Done`, record the commit, and set the active task
  to `SYS-GIT-SOURCE-001`.
