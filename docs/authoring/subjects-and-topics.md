# Template · Subjects & Topics

The blueprint every article, concept, question, and practical is placed against.
Changing it is a structural decision, not content work — a rename ripples into
every record that references the node.

Source of truth: `src/data/curriculumCatalog.ts` (runtime view) bound to
`src/data/medicalLibraryTaxonomy.ts` (blueprint) via
`src/data/taxonomyCrosswalk.ts`.

---

## Prompt

```
You are refining the Subjects & Topics blueprint for Synapse, a study platform
for undergraduate medical students in Egypt.

Read docs/authoring/README.md first, then this file.

You are NOT writing medical content. You are deciding what a branch is called
and where it sits. Produce a change proposal in the "Change proposal" format at
the end of this file — do not edit source files unless you were explicitly asked
to.

Rules that decide every case:

1. ONE LABEL, ONE HOME. Before proposing a new label, search the whole tree for
   it. If it exists, the answer is a cross-reference, not a new node.
2. A node is a SUBJECT, not a presentation facet. "Core principles", "Applied
   correlations", "High-yield", "Common vs rare" are filters or metadata — never
   branches. 546 such nodes were deleted from this taxonomy once already.
3. A node earns a new level only when a qualified source supplies a meaningful,
   reusable label for it. Do not split a subtopic into microtopics just to make
   the tree look complete.
4. Drug and therapeutic-class labels belong to the `pharm` subject. System
   subjects cross-reference them.
5. If two subjects mean genuinely different things by the same words,
   disambiguate the label ("Cardiac developmental anomalies") rather than
   forcing a cross-reference.
6. University module names, exam weights, high-yield status, and resource
   formats are overlays or metadata. They never become branches.
7. British spelling. Sentence case. No abbreviations in titles unless the
   abbreviation is the accepted name (ECG, HIV, NSAIDs).

Every proposal must state which of rules 1–7 justifies it, and what it breaks.
```

---

## The five levels

| Level | ID shape | What belongs here | Typical count |
|---|---|---|---|
| System (subject) | `SYS_CVS` | An organ system or a discipline students take as a course | 8 |
| Topic | `TPC_*` | A coherent block of teaching within it | 8–14 per subject |
| Subtopic | `SUB_*` | A single studiable unit — the usual home of an article | 4–10 per topic |
| Microtopic | `MIC_*` | A named part of that unit, when the source names one | 0–6 per subtopic |
| Nanotopic | `NAN_*` | The finest addressable label | 0–5 per microtopic |

Microtopics and nanotopics are **optional**. Most subtopics have none, and that
is correct. An empty level is honest; a fabricated one is not.

## Field reference

| Field | Required? | Source of truth | Rule |
|---|---|---|---|
| `id` | yes (derived) | `curriculumCatalog.ts:buildSystem` | Slug of the title, prefixed by its parent's ID. Never hand-written. |
| `title` / `name` | yes | `CurriculumTopic.title` | Sentence case, British spelling, unique across the whole tree. |
| `short` | systems only | `CurriculumSystem.short` | Uppercase abbreviation, e.g. `CVS`. |
| `color` | systems only | `CurriculumSystem.color` | Hex. Used for the subject dot. |
| `sysId` / `tpcId` / `subId` / `micId` / `nanId` | yes (derived) | `curriculumCatalog.ts` | `SYS_*`/`TPC_*`/… form of the node ID. Never hand-written. |
| `crossRefs` | no | `CurriculumTopic.crossRefs` | Node IDs owned elsewhere that also belong here. A link, never a node. |

Canonical placement is **not** stored on the node. It comes from
`CURRICULUM_TOPIC_CROSSWALK` in `taxonomyCrosswalk.ts`, so every new topic needs
a crosswalk entry — the validator fails without one.

## Naming rules

**Do**

- Name the subject matter: `Coronary circulation`, `Tubular transport`.
- Keep parallel siblings parallel: if one is `Renal pathology`, the next is
  `Renal presentations`, not `Presenting complaints in renal medicine`.
- Prefer the term a student will search for.

**Don't**

- Use a presentation facet: `Core principles`, `Applied / clinical correlations`,
  `Practical and assessment`.
- Use a difficulty or frequency filter: `Common conditions`, `Rare / classic`.
  These change meaning by setting and learner stage, so they are filters.
- Restate the parent: under `Cardiac anatomy`, write `Coronary circulation`, not
  `Cardiac coronary circulation anatomy`.
- Encode a university's module name.

## When to cross-reference instead of adding

Ask: **does this label already exist anywhere in the tree?**

| Situation | Do this |
|---|---|
| Same label, same meaning, different subject | Cross-reference the owner |
| Same label, genuinely different meaning | Disambiguate both labels |
| A drug class inside a system subject | Cross-reference `pharm` |
| A presentation shared by two systems | One owner + cross-reference |
| Truly new subject matter | Add the node, and add a crosswalk entry |

## Change proposal

Use this format. One block per change.

```
### <Add | Rename | Move | Cross-reference | Remove>: <label>

Level:        <System | Topic | Subtopic | Microtopic | Nanotopic>
Parent:       <parent node ID, or subject ID for a topic>
Node ID:      <derived slug, or the existing ID for a rename/move>
Canonical:    <primary canonical node ID> [+ <secondary IDs>]
Justified by: <rule 1–7 from the prompt, and why>
Source:       <the qualified source that supplies this label, if adding>
Breaks:       <records referencing the old ID, or "nothing — new node">
```

**Worked example**

```
### Cross-reference: Chest pain

Level:        Subtopic
Parent:       resp-respiratory-presentations
Node ID:      cvs-cardiovascular-presentations-chest-pain (owner)
Canonical:    SYS-RES-T02 + SYS-CVS-T02, KNW-PRS
Justified by: Rule 1. "Chest pain" was declared in both cvs and resp. It is one
              symptom with one differential; the cardiac and respiratory causes
              are entries in that differential, not two separate symptoms.
Source:       n/a — de-duplication of an existing label.
Breaks:       nothing. Articles placed on the resp node move to the cvs node;
              the resp topic gains a cross-reference so browsing is unchanged.
```

## Reject if

- The label already exists and you are proposing a second node for it.
- The label is a filter, a difficulty band, an exam weight, or a resource format.
- You cannot name a qualified source for a new label.
- A new topic has no canonical crosswalk entry.
- The change renames a node that published records reference, and you have not
  listed them under **Breaks**.

## Self-check

```bash
npm run medical:validate:authoring
```

This fails on: a label declared twice, a cross-reference pointing at a node that
does not exist, a cross-reference pointing into its own subtree, a topic with no
crosswalk entry, and a crosswalk entry pointing at a canonical node that does not
exist.

Then confirm the blueprint itself is still sound:

```bash
npm run medical:validate:taxonomy
```
