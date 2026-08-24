# 01 · Subjects and topics

> You must have read [00-START-HERE.md](00-START-HERE.md) before using this file.

Subjects and topics are the **shelves**, not the books. Changing them moves every article,
concept, question and practical that sits underneath. This is the highest-blast-radius
manual in the folder, and the one where the right answer is most often *do nothing*.

| | |
|---|---|
| **Imports at** | Admin › Taxonomy › Import (`/admin/taxonomy/import`) |
| **Goes in** | `docs/import-ready/subjects/` |
| **Recognised by** | `system` (required) plus `topic` / `subtopic` / `microtopic` / `nanotopic` |
| **`fieldsUsed` floor** | **12** of 14 |

---

## There are two trees, and confusing them is the classic error

**The canonical medical taxonomy** — `src/data/medicalLibraryTaxonomy.ts`, 1,883 reviewed
nodes — is the **blueprint of record**. It has four views:

| View | Root prefix | Answers | Its root level is called |
|---|---|---|---|
| Systems & General | `SYS-` | "Where does this sit in the body?" | **System or domain** |
| By Discipline | `DIS-` | "Which course teaches this?" | **Discipline** |
| Clinical Skills | `SKL-` | "What must I be able to do?" | **Domain** |
| Clinical Knowledge | `KNW-` | "What do I need for this task?" | **Domain** |

These are **placements, not copies**. One article or concept has one `primaryNodeId` and
any number of `secondaryNodeIds` across the four views. The "Library view" dropdown you see
in the admin forms is exactly this list of four.

**This tree is generated and structurally read-only.** It comes from
`UniNect-Medical-Library-Blueprint.xlsx` via `scripts/import-medical-taxonomy.mjs`. From the
admin UI only **Title**, **Priority** and **Review note** are editable. You cannot add,
move or delete a canonical node from a batch file. If a canonical node is wrong or missing,
say so in your report — do not attempt it.

**The curriculum catalog** — `src/data/curriculumCatalog.ts` — is the **student runtime
view**: the tree a learner actually browses. It is what this manual edits. It is bound to
the blueprint by `src/data/taxonomyCrosswalk.ts`, so a canonical placement is derived from
where you already placed the item rather than typed twice.

Five levels, each with a stable ID prefix:

```
System      SYS_*    ← the twenty subjects
  Topic       TPC_*
    Subtopic    SUB_*
      Microtopic  MIC_*
        Nanotopic   NAN_*
```

Subject IDs are exactly these twenty, from `src/data/curriculumCatalog.ts` (see 00 §3):

```
cvs    resp   renal  gi     neuro  endo   msk    pharm  fnd    dev
haem   imm    inf    obs    gyn    androl psy    derm   mul    pop
```

Nothing else is valid in a `subject` field. Twelve of the twenty have no live concept yet;
that is not a reason to avoid them.

### Placement for a subject without an obvious home

Some source material does not name one of the twenty directly. Placement (00 §3, ruled
2026-08-22):

| Source names | Goes to |
|---|---|
| Community medicine | `pop` |
| Psychology | `psy` |
| Microbiology or parasitology | `inf` |
| Forensic medicine, toxicology, ENT, ophthalmology | the body system of the mechanism or target organ — asphyxia → `resp`; otitis / conjunctivitis → `inf`; visual pathway, pupil, audiovestibular → `neuro`; ocular embryology → `dev`; organophosphates → `mul` |
| Umbrella forensic/toxicology principles with no single organ | `mul` |
| Pharmacology concepts | take `FND` or `INF` as the `CON-` system code (`pharm` cannot pick its own prefix — see 00 §3) |

`oph` and `ent` as subjects are pending Omar; do not mint them.

---

## Module IDs

A module ID is a **global bare string**, not namespaced by university in the ID itself.
Kasr keeps its existing bare form — `101 ISK`. A new university's module carries the
university short as a prefix instead, uppercase, spaces to hyphens: `ASU-CVS`, `AU-MED-102`,
`HU-GIT-301`. Every record's `universities` field must be non-empty regardless — an empty
`universities` list is visible to every university, which is almost never what you want, and
the catalogue check enforces it.

Academic structure (year → term → module → subject) imports through **Admin › Academic
Import**, which reads an outline (`# Year N` / `## Term N` / `- Module name [ID]`, subjects
indented beneath), not the `# Item` blocks this manual otherwise uses. Today only
`docs/import-ready/academic/kau-modules.md` exists — no other university has an academic
batch yet. `withModules()` in `src/data/universities.ts` takes each module as a `[name,
moduleId]` pair; it does **not** carry a term, whatever else you may have heard — every
course it builds is hard-set to `Term 1`. If a module genuinely sits in a later term, say so
in your report; do not invent a third tuple element.

---

## Before you change anything

Adding a node is cheap. **Renaming, moving or removing one is not**, because stable IDs are
referenced by every article and concept placed under them.

| You want to | Do this |
|---|---|
| Add a topic that genuinely does not exist | Fine. Follow this manual. |
| Rename a node | Supply its existing `*_id` and the new name. The ID stays; every reference survives. **Never** create a new node with the new name. |
| Move content between subjects | Almost always wrong. See *one label, one home* below. |
| Remove a node | You cannot, from a batch. The admin UI refuses if any article or concept references it: *"cannot be removed because N taxonomy IDs are used by articles or concepts. Reassign those records first."* |
| Split one topic into two | Add the second, then a human reassigns. Say clearly in your report what needs reassigning. |

The importer runs an **impact report** before writing, naming every referencing article and
concept. Read it. And there is a global gate: if your import would declare one label in two
places, **nothing is imported at all**.

### One label, one home

A label exists once. When a topic genuinely belongs to more than one subject, the owning
subject keeps it and the others carry a **cross-reference** — a link, never a second node.

- **Drug and therapeutic-class labels belong to `pharm`.** There is no "Cardiovascular
  pharmacology" node inside `cvs`; `cvs` cross-references the `pharm` one.
- **A shared presentation has one home:** chest pain → `cvs`; dyspnoea → `resp`;
  oedema → `cvs`; cyanosis → `resp`.
- **Where two subjects mean genuinely different things by the same words, disambiguate the
  label** — "Cardiac excitation–contraction coupling" and "Skeletal muscle
  excitation–contraction coupling", not one shared node.

`npm run medical:validate:authoring` fails the whole batch on a duplicate label. That is the
gate, and it is not negotiable.

---

## Search first

```bash
node "Instruction Manual for Content Creation/tools/find-existing.mjs" "<the topic name>"
```

Then look at the tree itself, because a node with a slightly different name is still the
same shelf:

```bash
node --experimental-strip-types -e "
import('./src/data/curriculumCatalog.ts').then(({ CURRICULUM_CATALOG }) => {
  for (const s of CURRICULUM_CATALOG) {
    console.log(s.id, s.name);
    for (const t of s.topics) console.log('   ', t.tpcId, t.title);
  }
  console.log('systems:', CURRICULUM_CATALOG.length);
});"
```

Real output, abbreviated:

```
cvs Cardiovascular
    TPC_CVS_CARDIAC_ANATOMY Cardiac anatomy
    TPC_CVS_CARDIAC_HISTOLOGY_AND_DEVELOPMENT Cardiac histology and development
    TPC_CVS_CARDIAC_ELECTROPHYSIOLOGY Cardiac electrophysiology
resp Respiratory
    TPC_RESP_RESPIRATORY_ANATOMY Respiratory anatomy
    …
systems: 20
```

If the shelf exists under any name, rename it rather than adding a sibling.

> The catalogue holds **20** systems, matching the 20 subject IDs valid in a `subject` field
> (00 §3). Check the tree before assuming a system is missing.

---

## The prompt

```
You are editing the Subjects & Topics blueprint for Synapse, a study platform for
undergraduate medical students in Egypt.

Read, in this order:
1. Instruction Manual for Content Creation/00-START-HERE.md
2. Instruction Manual for Content Creation/01-subjects-and-topics.md

Produce ONLY subject/topic records in the importer markdown format defined in that
manual, with no commentary before or after.

Non-negotiable:
- This is the highest-blast-radius content type. Prefer doing nothing.
- You may not add, move or delete a CANONICAL taxonomy node (SYS-/DIS-/SKL-/KNW-).
  That tree is generated. Report the problem instead.
- To rename, supply the existing *_id and the new name. Never mint a new ID for an
  existing shelf.
- One label, one home. A topic that belongs to two subjects is a cross-reference from
  one to the other, never a second node. A duplicate label fails the entire batch.
- Every row must be a complete path from system down to the deepest level you are
  touching. Rows are hierarchical, not independent.

Validate with `npm run medical:validate:authoring` and `npm run medical:validate:taxonomy`.
```

---

## How rows work

**Each row is a full path**, from system down to the deepest level it touches. The importer
walks the path and reuses anything that already exists at that level, so repeating the
system and topic across rows is correct — it does not create duplicates.

```markdown
# Item
## system
Cardiovascular
## topic
Cardiac physiology
## subtopic
Cardiac output

---

# Item
## system
Cardiovascular
## topic
Cardiac physiology
## subtopic
Cardiac output
## microtopic
Preload
```

Two rows, one shelf hierarchy: `Cardiovascular › Cardiac physiology › Cardiac output ›
Preload`. The second row does not create a second "Cardiac output".

`A topic ID with no topic name and no child does nothing` is the error for a row that
names an ID but neither renames it nor hangs anything beneath it.

---

## All 14 fields

| Key | Label | Required | Rule |
|---|---|---|---|
| `system` | System | **yes** | Top-level system name — `Cardiovascular`. Required on **every** row, even when you are only adding a microtopic. |
| `system_id` | System node ID | no | The existing subject to update — `cvs`. **Supply this to rename.** Omit to match by name or create. |
| `system_short` | System short label | no | Two or three letters for the badge — `CVS`. |
| `system_color` | System colour | no | Hex — `#b4442f`. Validated as `/^#[0-9a-f]{3,8}$/i`; anything else fails with `System colour must be a hex value such as #b4442f`. |
| `system_cross_refs` | System cross-references | no | Topic node IDs owned by **another** system that also belong here. This is how "one label, one home" is honoured without duplicating. Renders to students as **"Also relevant here"**. |
| `topic` | Topic | no | Topic name under the system. |
| `topic_id` | Topic node ID | no | `TPC_*`. Supply to rename an existing topic. |
| `topic_cross_refs` | Topic cross-references | no | Subtopic node IDs owned elsewhere that are also relevant here. |
| `subtopic` | Subtopic | no | Name under the topic. |
| `subtopic_id` | Subtopic node ID | no | `SUB_*`. Supply to rename. |
| `microtopic` | Microtopic | no | Name under the subtopic. |
| `microtopic_id` | Microtopic node ID | no | `MIC_*`. Supply to rename. |
| `nanotopic` | Nanotopic | no | Name under the microtopic. |
| `nanotopic_id` | Nanotopic node ID | no | `NAN_*`. Supply to rename. |

Every `*_id` is an **ID list** field in the cross-ref cases (splits on newline, `|`, `;`)
and a single value elsewhere.

### The rename pattern

Supplying an ID plus a different name is a rename. This is the only safe way to change a
label, because the ID — and therefore every article and concept pointing at it — survives:

```markdown
# Item
## system_id
cvs
## system
Cardiovascular
## topic_id
TPC_CVS_CARDIAC_PHYS
## topic
Cardiac physiology and haemodynamics
```

Writing the new name **without** `topic_id` creates a second topic and orphans everything
under the first. There is no undo for that in a batch.

---

## Worked example

Adding a subtopic and a microtopic under an existing topic, and cross-referencing the
`pharm` node that also belongs here.

```markdown
# Item

## system_id
cvs

## system
Cardiovascular

## system_short
CVS

## system_color
#b4442f

## system_cross_refs
TPC_PHARM_CARDIOVASCULAR_DRUGS

## topic_id
TPC_CVS_CARDIAC_PHYSIOLOGY

## topic
Cardiac physiology

## topic_cross_refs
SUB_PHARM_INOTROPES

## subtopic
Cardiac output

## microtopic
Preload

## nanotopic
Frank–Starling relationship
```

One row, one complete path. The two cross-reference fields are what stop this becoming a
duplicate of the `pharm` drug nodes — those labels stay owned by `pharm` and appear here as
links.

---

## What this type owes the rest of the library

Adding a shelf is only half the job. A topic with nothing on it is worse than no topic,
because it reads to a student as missing content rather than as scope you have not reached.

| You added | You should also |
|---|---|
| A topic or subtopic | Say in your report which articles and concepts should be placed under it, or author them |
| A cross-reference | Confirm the target node ID actually exists — a broken cross-ref renders as a dead link |
| A rename | List every article and concept the impact report named, so Omar can check the labels still read correctly |

---

## Before you hand off

```bash
npm run medical:validate:authoring
npm run medical:validate:taxonomy
npm run medical:audit
```

**Do not run `npm run medical:batch` on a subjects file.** It has no branch for this kind,
falls through to `unknown` and refuses the file:

```
… matches no contract this validator knows.
Recognised kinds: article, question, practical, concept, relation, claim, citation, span, resource.
```

That refusal means "wrong tool", not "bad file". (It used to be a `TypeError` from inside
the validator, which said the same thing without saying it.) The two `validate:` commands
above are your check, and the import wizard's own preview and impact report are the real
gate.

- [ ] I did not add, move or delete a canonical `SYS-`/`DIS-`/`SKL-`/`KNW-` node
- [ ] Every rename supplies the existing `*_id`
- [ ] Every row is a complete path from `system` down
- [ ] No label I introduced already exists elsewhere in the tree
- [ ] Anything belonging to two subjects is a cross-reference, not a second node
- [ ] Every cross-referenced node ID exists
- [ ] `system_color` is valid hex
- [ ] `validate:authoring` and `validate:taxonomy` both return zero errors
- [ ] My report names every article and concept affected by a rename or move

### The failures specific to subjects and topics

| Symptom | Cause |
|---|---|
| Nothing imported, whole batch refused | A label you introduced is already declared somewhere else |
| `System is required` | A row omitted `system` — it is required on every row, not just the first |
| `System colour must be a hex value such as #b4442f` | Malformed `system_color` |
| `A topic ID with no topic name and no child does nothing` | A row that neither renames nor hangs anything beneath |
| A duplicate shelf appears | You wrote a new name without its `*_id` — that is a create, not a rename |
| `… matches no contract this validator knows` | You ran `medical:batch` on a subjects file. It has no branch for this kind. Use the `validate:` commands. |
