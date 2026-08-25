# 08 · Skills checklists

> You must have read [00-START-HERE.md](00-START-HERE.md) before using this file.

A **skills checklist** is a procedure broken into observable steps, each worth marks. It is
what a student uses to practise a procedure alone, and what an examiner uses to score it.
No simulated patient, no actor brief — just the steps, in order.

| | |
|---|---|
| **Imports at** | Admin › Bulk import → **practical** (`/admin/import/practical`) |
| **Goes in** | `docs/import-ready/practical/` |
| **`type` value** | `Skills checklist` |
| **Recognised by** | `type` plus `mark_scheme` |
| **Required blocks** | `mark_scheme` — **by this manual's contract, not by the importer.** See the warning below. |
| **Columns you should use** | **16** of the 25 |

---

## Read this first: two things about this format are unusual

### 1 · You cannot author a checklist in the admin UI

Every other practical format opens the practical editor. A checklist does not. When
`fields.Type === 'Skills checklist'`, the admin dashboard routes to the **generic** content
editor, whose entire form is eight scalar fields:

> Title · Subject · Workflow status · Content owner · Practical format · Duration ·
> Available marks · Difficulty

The steps are not on that form. They live in the same `markSections` structure an OSCE
station uses, and **import is the only way to author them**. If a human later opens your
checklist in admin to fix a typo in a step, they cannot — they will see the eight fields
above and nothing else.

That makes this batch file the only source of the checklist's content. Write it as though
nobody can correct it afterwards, because in practice nobody can.

> The generic editor's **Practical format** field is a free-text input with no enum guard.
> A human typo there silently reclassifies the item into a different format. Nothing you
> can do about it from here, but it is worth knowing when a checklist mysteriously stops
> behaving like one.

### 2 · The importer does not require your steps

`mark_scheme` is only *enforced* when `type` is exactly `OSCE station`. A skills checklist
imports happily with **zero steps** and still appears in the student catalogue as an empty
item.

So there is no safety net here. `mark_scheme` is required by this manual, and the only
thing checking it is you. Confirm `markSchemeItems` in the validator output matches the
number of steps you wrote.

---

## Shared practical fields

| Key | Label | Required | Rule |
|---|---|---|---|
| `type` | Practical format | **yes** | `Skills checklist`. Exact string — a typo silently makes it an OSCE station. |
| `title` | Title | **yes** | The procedure. |
| `subject` | Subject ID | **yes** | One of the 20 in `src/data/curriculumCatalog.ts` (00 §3) — not just the eight with live concepts. |
| `status` | Workflow status | no | `Draft` · `In review` · `Published` · `Archived`. Write `Draft`. |
| `owner` | Content owner | no | Author or team responsible for review. |
| `duration` | Duration | no | Expected minutes. |
| `marks` | Available marks | no | Recomputed as the sum of section marks. |
| `difficulty` | Difficulty | no | `Easy` · `Moderate` · `Hard` · `Challenging`. |
| `id` | Canonical ID | no | Supply to update an existing item. |
| `mark_scheme` | Mark scheme | **by contract** | The steps. One `Section (marks): step` per line. |
| `station_image` | Station media URL | no | A real working managed-media URL for an image, recording, or clip the checklist uses. |
| `station_media_type` | Station media type | no | `image`, `audio`, or `video`. Required for audio/video; defaults to `image` for legacy rows. |
| `station_media_mime_type` | Station media MIME type | no | The verified MIME type, e.g. `video/mp4` or `audio/mpeg`. |
| `module_subject` | Module subject path(s) | — | Where inside each module it sits — `101 ISK > Anatomy > Upper Limb`. One path per line. |
| `universities` | University IDs | — | Canonical university IDs, `\|`/`;`/newline separated. **Empty means EVERY university.** |
| `years` | Year IDs | — | Year IDs this checklist is used in, e.g. `KAU_Y1 \| KAU_Y2`. |
| `module` | Module ID(s) | — | Module ID(s) this checklist sits under (Kasr `101 ISK`; other universities prefixed, e.g. `AU-MED-102`). |
| `main_concept` | Main concept(s) | — | What the checklist is **for**. Awards mastery. |
| `concept_ids` | Also assessed | — | Awards mastery. |
| `contextual_concept_ids` | Mentioned only | — | **No mastery.** |
| `learning_objective` | Learning objective | — | What a student who completes this has demonstrated. |
| `references` | Read around it | — | **Prose list — newlines only.** |
| `media_recommendations` | Media requests | — | See below. |

The five fields a checklist does not use: `candidate_instructions`, `actor_opening`,
`actor_sections`, `actor_flags` (there is no actor), and `decisions` / `debrief` /
`lab_subtype` / `lab_questions` (wrong format).

> A checklist is stored as an OSCE station with no actor brief — the two share the
> mark-scheme shape. That is why the field table above looks like manual 06 with the actor
> fields removed.

---

## Priority of sources

Highest first (00 §A): this department's own practical atlas / skills-lab manual / station
sheets, then other official files for the same module, then doctor/student/academy notes
(tier ≤5, never sole source), then a standard textbook only where the corpus has none.
**Another university's checklist never stands for this university's signal** — procedure
order and mark weighting are department-specific.

## Media (S6 of the pipeline)

A step that depends on a photograph, diagram or recording to be checkable carries
`media_recommendations` and is **marked as a request, never rewritten into prose**. This is
stage S6 ([13-orchestration.md](13-orchestration.md) §4).

## Scope: universities and module

A practical checklist is scoped exactly as a question is: by `universities`, `years` and
`module` — ID lists with the standard rules (`\|`, `;` or newline; leading `+` appends; an
absent column leaves the existing value untouched). The record has always carried
`universityIds`/`yearIds`/`moduleIds`, but a checklist cannot be corrected in admin
afterwards either (see above), so getting this right at import time matters more here than
anywhere else. Until 2026-08-22 the importer had no column to read, so every imported
checklist arrived unscoped. An empty `universities` list means EVERY university. Scope is
separate from concept tagging and `module_subject`.

## Stages and completeness

Finished per [13-orchestration.md](13-orchestration.md) §4 once `markSchemeItems` meets this
type's floor, S6 requests are tracked, and `medical:audit` is clean — not at the first green
`medical:batch`.

---

## The prompt

```
You are writing skills checklists for Synapse, a study platform for undergraduate medical
students in Egypt.

Read, in this order:
1. Instruction Manual for Content Creation/00-START-HERE.md
2. Instruction Manual for Content Creation/08-skills-checklists.md

Produce ONLY practical records with type "Skills checklist", in the importer markdown
format defined in that manual, with no commentary before or after.

Non-negotiable:
- A checklist CANNOT be edited in the admin UI. This file is the only source of its
  steps. Write it as though nobody can correct it later, because nobody can.
- mark_scheme is required by contract even though the importer does not enforce it for
  this type. A checklist with no steps imports silently and appears empty to students.
- Mark scheme lines are "Section title (marks): the observable step", one per line,
  section title repeated on every line of that section.
- Every step must be something an examiner can SEE or HEAR. "Washes hands before
  touching the patient", not "Maintains asepsis".
- The steps must be in the order they are performed. A student practises alone from this.
- Never write a dose, a device setting, or a safety step you cannot cite.
- Media you need is a request block. Never invent a URL.
- British spelling. status: Draft.

Validate with `npm run medical:batch`. Confirm markSchemeItems equals the number of steps.
```

---

## Writing the steps

**One line per step**, in the form `Section title (marks): observable step`. Section titles
repeat on every line of that section; the `(marks)` figure is the **section total**.

```markdown
## mark_scheme
Preparation (15): Washes hands
Preparation (15): Introduces self by name and role, and confirms the patient's identity
Preparation (15): Explains the examination and gains verbal consent
Preparation (15): Positions the patient at 45 degrees and exposes the chest adequately
```

### Steps must be observable and in order

| Write this | Not this |
|---|---|
| Washes hands before touching the patient | Maintains asepsis |
| Palpates the apex beat and states its position | Assesses the apex beat correctly |
| Times the murmur against the carotid pulse | Understands murmur timing |
| States the JVP height in centimetres above the sternal angle | Interprets the JVP |

Two tests before you commit a step:

1. **Could an examiner tick it without asking the candidate what they were thinking?** If
   not, it is an internal state, not a step.
2. **Could a student practising alone follow it?** They have no examiner and no actor. If
   the step depends on something only an examiner knows, rewrite it.

Order matters more here than in an OSCE station, because a checklist is also a set of
instructions. Sections should run in the sequence they are performed — preparation, then
the procedure, then completion.

---

---

## What `medical:batch` enforces

The importer is permissive; the batch validator is not. Every practical format must
satisfy these, and two of them are stricter than the importer's own help text:

| Rule | Error you get |
|---|---|
| `status` is `Draft` | `status is Published — assessment content lands as Draft` |
| `main_concept` names at least one concept | `no main_concept — name what this item teaches` |
| every concept ID exists in live state | `X is not a concept that exists` |
| no concept is both assessed and contextual | `X is both assessed and contextual` |
| `learning_objective` is non-empty | `no learning objective` |
| every media request carries `Purpose:` | `media request "…" has no Purpose` |

**Mark scheme:** an item that parses to an empty scoring point is an error —
`an empty mark-scheme item in "Section title"`. A line with a section and marks but
no behaviour after the colon produces one.

## Media

A fulfilled checklist can render an image, recording, or clip through `station_image` (the
legacy key name), `station_media_type`, and `station_media_mime_type`. Use only a real,
rights-cleared managed-media URL. Until that asset exists, omit those fields and keep the
need in `media_recommendations`; required unresolved requests block publication.

Checklists often want a photograph of correct hand position, a diagram of landmarks, or a
recording of a sound the student must recognise.

```markdown
## media_recommendations
### clinical photograph · station
Brief: Correct hand and stethoscope position for auscultating the mitral area, with the
patient rolled into the left lateral position
Kind: clinical photograph
Purpose: The step asks the student to roll the patient and auscultate the apex. Position is
the part everyone gets wrong and the part prose describes worst.
Priority: strongly helpful
Status: needed
Source direction: clinical skills teaching photograph, model consented
Rights: must be CC-BY or cleared for teaching use
```

**`Section:` must be the literal `station`, or omitted.** A checklist has no `###` blocks,
so naming anything else fails with
`Media request "…" names "…", which is not a question in this item`.

Full syntax in [00-START-HERE.md](00-START-HERE.md) §6.

---

## Worked example

```markdown
# Item

## id
PRC-CVS-CHECKLIST-001

## title
Cardiovascular examination

## subject
cvs

## type
Skills checklist

## status
Draft

## owner
Dr. Omar

## duration
8

## marks
100

## difficulty
Moderate

## mark_scheme
Preparation (15): Washes hands
Preparation (15): Introduces self by name and role, and confirms the patient's identity
Preparation (15): Explains the examination and gains verbal consent
Preparation (15): Positions the patient at 45 degrees and exposes the chest adequately
General inspection (10): Inspects from the end of the bed and comments on comfort, colour and breathing
General inspection (10): Looks for and names any visible scars, pacemaker box or oedema
Hands and pulse (20): Inspects the hands for clubbing, splinter haemorrhages and peripheral cyanosis
Hands and pulse (20): Palpates the radial pulse and states rate and rhythm
Hands and pulse (20): Assesses for a collapsing pulse after asking about shoulder pain
Hands and pulse (20): Checks for a radio-radial delay
Face and neck (20): Inspects the eyes for conjunctival pallor and the mouth for central cyanosis
Face and neck (20): Positions the patient and measures the JVP, stating its height above the sternal angle
Face and neck (20): Palpates the carotid pulse on one side only and states its character
Praecordium (25): Palpates for the apex beat and states its position by intercostal space and line
Praecordium (25): Palpates for heaves and thrills at the appropriate positions
Praecordium (25): Auscultates all four valve areas with the diaphragm
Praecordium (25): Auscultates the mitral area with the bell, patient rolled to the left lateral position
Praecordium (25): Times any murmur against the carotid pulse
Completion (10): Auscultates the lung bases and palpates for sacral and ankle oedema
Completion (10): Thanks the patient, restores their clothing, and washes hands
Completion (10): Offers to complete the examination with blood pressure, an ECG and a fundoscopy

## main_concept
CON-CVS-AD0D9E76B568F0

## concept_ids
CON-CVS-AE28ABD8CE2B0B

## contextual_concept_ids

## learning_objective
Perform a complete cardiovascular examination in the conventional sequence, stating the
findings at each stage, and offer the appropriate completing investigations.

## references
Kasr Alainy, ANATOMY CARDIOVASCULAR SYSTEM — surface anatomy of the heart and valve areas.

## media_recommendations
### clinical photograph · station
Brief: Correct hand and stethoscope position for auscultating the mitral area with the
patient rolled into the left lateral position
Kind: clinical photograph
Purpose: Position is the part of this step students most often get wrong and the part prose
describes worst. A student practising alone has nothing to check themselves against.
Priority: strongly helpful
Status: needed
Source direction: clinical skills teaching photograph, model consented
Rights: must be CC-BY or cleared for teaching use

### anatomy plate · station
Brief: Surface markings of the four valve areas on the anterior chest wall, with rib and
intercostal space numbering
Kind: anatomy plate
Purpose: Two praecordium steps depend on locating the areas by surface landmark. The
checklist can name them; it cannot show where they are.
Priority: required
Status: needed
Source direction: openly licensed anatomy atlas
Rights: must be CC-BY or public domain
```

Twenty-one steps across six sections, summing to 100 marks, in the order they are
performed.

---

## Before you hand off

```bash
npm run medical:batch -- "docs/import-ready/practical/<your-file>.md"
npm run medical:simulate -- "docs/import-ready/practical/"*.md --emit /tmp/sim-$SCOPE.json
npm run medical:audit -- --source /tmp/sim-$SCOPE.json
```

- [ ] `type` is exactly `Skills checklist`
- [ ] `mark_scheme` is present and **`markSchemeItems` matches the number of steps I wrote** — nothing else checks this
- [ ] Every step is observable — an examiner could tick it without asking what the candidate was thinking
- [ ] A student practising alone could follow every step
- [ ] Sections run in the order the procedure is performed
- [ ] Section titles repeat on every line of that section
- [ ] Section marks sum to `marks`
- [ ] Every `Section:` in a media request is `station` or omitted
- [ ] I have written this as the only source of the checklist's steps, because it is

### The failures specific to skills checklists

| Symptom | Cause |
|---|---|
| Checklist imports with no steps, no error | `mark_scheme` missing. Only enforced for `OSCE station` — nothing catches this but you. |
| A step vanished | The line had no `(marks)` or no `:` — dropped silently |
| Sections merged unexpectedly | Two sections share a title |
| A section's marks are wrong | Marks come from the **first** line bearing that title |
| The item behaves like an OSCE station | `type` is misspelled, or a human retyped it in the generic editor's free-text format field |
| `Media request "…" names "…", which is not a question in this item` | `Section:` is anything other than `station` |
| A typo in a step cannot be fixed in admin | Expected. Re-import a corrected file with the same `id`. |
