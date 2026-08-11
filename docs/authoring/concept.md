# Template · Concept

A concept is the **smallest assessable objective** — one thing a student can be
right or wrong about. Concepts are what mastery is tracked against, what
questions are tagged to, and what articles are made of.

Source of truth: `src/data/conceptGraph.ts:Concept`, relation types in
`CONCEPT_RELATIONS`, field requirements in
`scripts/audit-medical-content-fields.mjs`.

---

## Prompt

```
You are writing concept records for Synapse, a study platform for undergraduate
medical students in Egypt.

Read docs/authoring/README.md first, then this file.

Produce concept records in the YAML-ish block format shown in the "Skeleton"
section below, one per concept, and nothing else.

A concept is the SMALLEST ASSESSABLE OBJECTIVE — one thing a student can be
right or wrong about. Before writing each one, test it:

- Could a single exam question have this as its answer? If it would take three
  questions, it is three concepts.
- Could a student "know" this without knowing anything else in the record? If
  not, split it.
- Is the definition a claim, or a topic heading? "The Frank-Starling mechanism
  relates sarcomere stretch to stroke volume" is a concept. "Cardiac physiology"
  is not.

Rules:
- The definition is ONE sentence stating what is true. Not a paragraph, not an
  article summary, not a list.
- `pitfalls` records a specific misconception students actually hold. If no
  source documents one, leave it empty and give a fieldNotes reason. Do not
  invent a plausible-sounding trap.
- Aliases are alternative NAMES for the same concept (including British/American
  spellings). They never justify a second concept record.
- Every concept must be discussed by at least one article, and that article must
  list this concept back.
- Typed relations must come from the CONCEPT_RELATIONS list in this file. A
  relation without evidence is `needs_evidence`, not `verified`.
- Never invent an ID, a weight, or a source.

British spelling. No hedging.
```

---

## What is and is not a concept

| This | Is it a concept? | Why |
|---|---|---|
| "Preload is the ventricular wall stress at end-diastole" | Yes | One statement, one thing to be right about |
| "Cardiac physiology" | No | A topic. Concepts live *under* topics |
| "Heart failure" | Yes, as a named entity | It has a definition, relations, and can be tested |
| "Everything about beta-blockers" | No | Split: mechanism, indications, adverse effects, contraindications |
| "Beta-blockers reduce mortality in HFrEF" | Yes | A single testable claim |
| "Oedema" (as a symptom label) | Yes | Named entity with mechanisms and relations |

## Fields

### Required

| Field | Source of truth | Rule |
|---|---|---|
| `id` | `Concept.id` | `med.concept.<kebab-case>`. Stable forever — it is referenced by articles, questions, and claims. |
| `label` | `Concept.label` | The concept's name. Sentence case. |
| `definition` | `Concept.definition` | **One sentence** stating what is true. |
| `status` | `Concept.status` | `active`, `inactive`, or `under review`. New concepts start `under review`. |
| `subjectId` | `Concept.subjectId` | One of the eight subject IDs. |
| `primaryNodeId` | `Concept.primaryNodeId` | Canonical taxonomy home. |
| `articleIds` | `Concept.articleIds` | Articles that discuss this concept. Must not be empty. |
| `conceptType` | `Concept.conceptType` | What kind of thing it is — mechanism, structure, condition, drug class, sign, investigation, principle. |
| `explicitObjective` | `Concept.explicitObjective` | What a student who has mastered this can do. |

### Weighting — how much this matters

| Field | Source of truth | Rule |
|---|---|---|
| `blueprintWeight` | `Concept.blueprintWeight` | 0–1 overall exam-blueprint weight. |
| `examWeightByYear` | `Concept.examWeightByYear` | Per-year, `{ OMS_Y2: 0.7 }`. Each 0–1. |
| `clinicalRelevance` | `Concept.clinicalRelevance` | 0–1. How much it matters at the bedside. |
| `academicRelevance` | `Concept.academicRelevance` | 0–1. How much it matters in the exam. |
| `weightConfidence` | `Concept.weightConfidence` | 0–1. How sure you are of the weights above. Low is honest. |
| `learnerYears` | `Concept.learnerYears` | Years this is taught in, e.g. `[2, 3]`. |

These are **estimates, not measurements**. A low `weightConfidence` with an
honest weight beats a confident guess.

### Placement and scope

| Field | Source of truth | Rule |
|---|---|---|
| `secondaryNodeIds` | `Concept.secondaryNodeIds` | Other genuine placements across the four views. |
| `systemId` / `topicTagId` / `subtopicId` / `microtopicId` / `nanotopicId` | `Concept.*` | Optional curriculum overlay IDs. Blank + `fieldNotes` reason is fine. |
| `universityIds`, `moduleIds` | `Concept.*` | Scope. Leave `moduleIds` empty rather than guessing. |

### Teaching value

| Field | Source of truth | Rule |
|---|---|---|
| `aliases` | `Concept.aliases` | Alternative names and spelling variants. Never a reason for a second concept. |
| `arabicLabel`, `arabicAliases` | `Concept.*` | Only from reviewed Arabic terminology. Otherwise empty + reason. |
| `pitfalls` | `Concept.pitfalls` | A specific documented misconception. Empty + reason if none is sourced. |
| `relatedConceptIds` | `Concept.relatedConceptIds` | Untyped "see also". Typed relations are separate. |
| `relatedArticleIds`, `resourceIds` | `Concept.*` | Where it is taught. |

### Evidence and governance

| Field | Source of truth | Rule |
|---|---|---|
| `atomicClaimIds` | `Concept.atomicClaimIds` | Claims supporting this concept. |
| `supportMode`, `confidence` | `Concept.*` | How it is supported and how strongly (0–1). |
| `conflicts`, `uncertainty`, `evidenceGaps` | `Concept.*` | State them. An empty array means "checked, none", not "did not look". |
| `owner`, `reviewer`, `finalPublisher` | `Concept.*` | Accountability chain. |
| `publicationStatus`, `editorialReviewStatus` | `Concept.*` | Governance state. |
| `fieldNotes` | `Concept.fieldNotes` | Why any applicable field is empty. |

## Typed relations

Relations are what turn a list of concepts into a graph. Use the exact type
strings from `CONCEPT_RELATIONS`:

| Group | Types |
|---|---|
| Hierarchy | `is_a`, `part_of`, `contains`, `composed_of` |
| Sequence | `prerequisite_of`, `mechanism_step_before` |
| Causal | `causes`, `increases`, `decreases`, `regulates`, `complication_of` |
| Clinical | `presents_as`, `diagnosed_by`, `investigated_by`, `treated_by`, `contraindicates`, `differential_of` |
| Spatial | `located_in`, `supplies`, `drains_into`, `connects_to`, `accompanies` |
| Comparative | `contrasts_with`, `often_confused_with`, `associated_with`, `related_concepts` |

`often_confused_with` is the most under-used and most valuable of these — it is
what lets the app surface the distinction a student is about to get wrong.

Every relation carries `verificationStatus`: `needs_evidence` (default),
`verified` (has a claim + citation chain), or `conflicted`. Never write
`verified` without the evidence.

## Skeleton

```yaml
- id: med.concept.<kebab-case>
  label: <Name>
  definition: <One sentence stating what is true.>
  status: under review
  conceptType: <mechanism | structure | condition | drug class | sign | investigation | principle>
  explicitObjective: <What a student who has mastered this can do.>

  subjectId: <cvs | resp | renal | gi | neuro | endo | msk | pharm>
  primaryNodeId: <SYS-XXX-TNN>
  secondaryNodeIds: [<DIS-XXX>]

  articleIds: [<article id>]
  relatedConceptIds: [med.concept.<slug>]
  resourceIds: [<resource id>]

  aliases: [<alternative name>]
  pitfalls: <A specific documented misconception, or empty.>

  learnerYears: [2, 3]
  universityIds: [<HU>]
  blueprintWeight: 0.0
  examWeightByYear: { OMS_Y2: 0.0 }
  clinicalRelevance: 0.0
  academicRelevance: 0.0
  weightConfidence: 0.0

  owner: <team>
  reviewer: <team>
  publicationStatus: under review
  editorialReviewStatus: pending
  conflicts: []
  uncertainty: []
  evidenceGaps: []
  fieldNotes:
    arabicLabel: <why it is empty>
    moduleIds: <why it is empty>

  relations:
    - type: <from CONCEPT_RELATIONS>
      targetId: med.concept.<slug>
      verificationStatus: needs_evidence
```

## Worked example

```yaml
- id: med.concept.frank-starling-mechanism
  label: Frank–Starling mechanism
  definition: Increasing ventricular end-diastolic volume stretches sarcomeres toward optimal actin–myosin overlap, raising stroke volume without any change in contractility.
  status: under review
  conceptType: mechanism
  explicitObjective: Predict how a change in preload alters stroke volume, and explain why a failing ventricle gains little output from rising filling pressures.

  subjectId: cvs
  primaryNodeId: SYS-CVS-T01
  secondaryNodeIds: [DIS-PHY]

  articleIds: [ART-CVS-CARDIAC-OUTPUT]
  relatedConceptIds: [med.concept.preload, med.concept.stroke-volume, med.concept.contractility]

  aliases: [Starling's law of the heart, Frank-Starling law]
  pitfalls: Students attribute a rise in stroke volume with increased preload to increased contractility; contractility is unchanged, the length–tension relationship has shifted the operating point.

  relations:
    - type: increases
      targetId: med.concept.stroke-volume
      verificationStatus: needs_evidence
    - type: often_confused_with
      targetId: med.concept.contractility
      verificationStatus: needs_evidence
```

## Reject if

- The definition is longer than one sentence, or is a topic heading rather than
  a claim.
- The concept could be split into two things a student could get separately
  right or wrong.
- `articleIds` is empty — the concept is an orphan.
- An article listed in `articleIds` does not list this concept in its
  `related_concepts`.
- A relation type is not in `CONCEPT_RELATIONS`, or is marked `verified` without
  a claim and citation.
- `pitfalls` contains a plausible-sounding trap you invented rather than one a
  source documents.
- A weight is stated confidently with no basis. Lower `weightConfidence` instead.

## Self-check

- [ ] One sentence, one assessable thing.
- [ ] `id` is `med.concept.<kebab-case>` and does not already exist.
- [ ] `primaryNodeId` exists in the canonical taxonomy.
- [ ] Reciprocity holds in both directions with every article.
- [ ] Every relation type is from `CONCEPT_RELATIONS`; none claims `verified`
      without evidence.
- [ ] Every intentionally blank field has a `fieldNotes` reason.

```bash
npm run medical:audit
```
