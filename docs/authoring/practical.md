# Template · Practical question creation

Practicals are the four things a student *does* rather than reads: an OSCE
station, a clinical case, a skills checklist, and an interpretation set. Each has
its own required blocks and its own parsing micro-syntax.

Source of truth: `src/data/bulkImport.ts:IMPORT_SCHEMAS.practical` and
`practicalDataFrom`, shapes in `src/data/contentControl.ts`
(`OsceAuthoringData`, `CaseAuthoringData`, `LabAuthoringData`), consumed by
`src/components/practical/PracticalRunner.tsx`.

---

## Prompt

```
You are writing practical assessment items for Synapse, a study platform for
undergraduate medical students in Egypt.

Read docs/authoring/README.md first, then this file.

Produce practical records in the importer markdown format shown in this file,
separated by `---`, and nothing else. One file may mix all four types.

First choose the type, because it determines which blocks are REQUIRED:

  OSCE station          -> a timed encounter with a simulated patient.
                           Requires candidate_instructions + mark_scheme.
  Clinical case         -> sequential decisions with consequences.
                           Requires decisions (each with a correct option).
  Skills checklist      -> a procedure scored against observable steps.
                           Requires mark_scheme.
  Lab interpretation    -> reading results.  Requires lab_questions.
  Imaging interpretation-> reading images.   Requires lab_questions.

The micro-syntax is parsed literally. Get it exactly right:
- Mark scheme lines:  `Section title (marks): the observable behaviour`
- Actor brief lines:  `Label: content`
- Decisions and interpretation questions use `### heading`, then `Q: question`,
  then options as `* option` with the correct one as `*= option`, each followed
  by `Why:`, then `Rationale:` (cases) or `Explanation:` (interpretation).
- EVERY decision and EVERY interpretation question needs exactly one `*=` line.
  The importer rejects the record otherwise.
- EVERY option needs a `Why:` line, including the correct one.

Content rules:
- Name the ONE concept each question teaches, in its `Concept:` line. If you
  cannot name it, or no article covers it, do not write the question.
- Mark-scheme items must describe an OBSERVABLE behaviour an examiner can tick,
  not an internal state. "Asks about radiation of the pain", not "Understands
  the pain".
- The actor brief must answer what a real patient would be asked. If the mark
  scheme rewards asking about radiation, the actor brief must say where it
  radiates.
- Case decisions must have consequences that follow from the choice. A decision
  where every option leads to the same place is not a decision.
- Distractors must catch a specific, nameable misconception, and that option's
  `Why:` must say which one.
- Never write a treatment, dose, or emergency action you cannot cite.
- Flag media you need in `media_needed`. Never invent a URL.

British spelling. Set status to Draft.
```

---

## Common fields

| Field key | Required? | Source of truth | Rule |
|---|---|---|---|
| `title` | yes | `ManagedContentItem.title` | What the station is. |
| `subject` | yes | `ManagedContentItem.subjectId` | One of the eight subject IDs. |
| `type` | yes | `fields.Type` | `OSCE station`, `Clinical case`, `Skills checklist`, `Lab interpretation`, `Imaging interpretation`. |
| `status` | no | `ManagedContentItem.status` | `Draft`. |
| `duration` | no | `fields.Duration` | Expected minutes. |
| `marks` | no | `fields.Marks` | Total marks or number of decisions. |
| `difficulty` | no | `fields.Difficulty` | `Easy`, `Moderate`, `Hard`, or `Challenging`. Whole-item difficulty. |
| `references` | no | `*.references` | Read-around resources, one per line. |

---

### Identity

| Field key | Source of truth | Rule |
|---|---|---|
| `id` | `ManagedContentItem.id` | Existing canonical ID to update. Omit to create. |
| `owner` | `ManagedContentItem.owner` | Author or team responsible for review. |

---

### Concept tagging — this is what the item is *for*

| Field key | Source of truth | Rule |
|---|---|---|
| `main_concept` | `conceptTags.mainConceptIds` | The concept(s) this item primarily teaches. |
| `concept_ids` | `conceptTags.conceptIds` | Concepts it also assesses. |
| `contextual_concept_ids` | `conceptTags.contextualConceptIds` | Concepts the scenario needs but does not assess. **These receive no mastery evidence.** |
| `learning_objective` | `PracticalCommon.learningObjective` | What a student who passes this item has demonstrated. |

The same distinction the MCQ template draws, for the same reason: putting a
merely-mentioned concept in `main_concept` silently corrupts a student's mastery
profile. A case set in a patient with COPD that teaches the jugular venous pulse
tags the JVP concept as main and COPD as contextual.

Cases and interpretation sets tag each question individually as well, with
`Concept:` and `Also:` inside the `###` block. Use the item-level fields for what
the item as a whole is about; use the block-level lines for what one question is
about.

---

### Media you need but do not have

| Field key | Source of truth | Rule |
|---|---|---|
| `media_needed` | `PracticalCommon.mediaRequests` | Admin-only. Assets this item still needs, one `### kind · target` block each. Never shown to a student. |

```
### image · Which territory is infarcted
Brief: 12-lead ECG showing 2 mm ST elevation in II, III and aVF
Purpose: The question cannot be answered from the text alone.
Priority: required
Status: needed
Source direction: openly licensed ECG teaching library
```

- `kind` is `image`, `audio`, or `video`.
- `target` is the exact `###` heading of the question the asset belongs to, or
  `station` for the item as a whole. A target that matches no question is
  rejected — it would be fulfilled against a question that does not exist.
- `Priority` is `required`, `strongly helpful`, or `optional`; `Status` is
  `needed`, `planned`, `supplied`, or `declined`.
- **Never put a placeholder in a `Media:` line.** `Media:` holds a real URL and
  the runner renders whatever is there as an image, so a placeholder shows the
  student a broken asset. That is what `media_needed` exists to avoid.

---

### Difficulty

Two levels, and they answer different questions.

| Where | What it means |
|---|---|
| `## difficulty` | How demanding the whole station, case or set is. |
| `Difficulty:` inside a `###` block | How demanding that one question is. |

Both use `Easy`, `Moderate`, `Hard`, `Challenging` — the same four bands as the
question bank, so a practical marked `Hard` means what an MCQ marked `Hard`
means. `Hard` is a concept a strong student still gets right; `Challenging` needs
several steps held at once.

A bank should be mostly middle: roughly **25% Easy, 55% Moderate, 15% Hard, 5%
Challenging**. A set that is nearly all `Hard` does not teach, it filters.

## Type 1 · OSCE station

| Field key | Required? | Source of truth | Rule |
|---|---|---|---|
| `candidate_instructions` | yes | `OsceAuthoringData.candidateInstructions` | The brief the student reads at the door. States the task and the time. |
| `mark_scheme` | yes | `OsceAuthoringData.markSections` | `Section (marks): item` per line. Repeat the section title to add items to it. |
| `actor_opening` | yes for encounters | `OsceAuthoringData.actorOpening` | The first thing the patient says, unprompted. |
| `actor_sections` | yes for encounters | `OsceAuthoringData.actorSections` | `Label: content` per line. |
| `actor_flags` | no | `OsceAuthoringData.actorFlags` | Behavioural instructions, one per line. |

**Mark-scheme syntax.** Lines sharing a section title are grouped; the marks in
brackets are read from the first occurrence.

```
Opening and structure (15): Introduces self and confirms patient identity
Opening and structure (15): Explains the purpose of the consultation
Pain characterisation (25): Establishes site, onset and character
Pain characterisation (25): Asks specifically about radiation
```

That parses to two sections worth 15 and 25 marks, with two items each.

```markdown
# Item

## title
History: chest pain in a 54-year-old

## subject
cvs

## type
OSCE station

## status
Draft

## duration
8

## marks
40

## difficulty
Moderate

## candidate_instructions
Mr Rossi is 54 and has come to the emergency department with chest pain. Take a
focused history and present your differential diagnosis. You have eight minutes.

## actor_opening
It came on when I was carrying the shopping upstairs.

## actor_sections
Who you are: Daniel Rossi, 54, self-employed builder.
Site: Central, behind the breastbone.
Character: Heavy and tight, like a band.
Radiation: Down my left arm and into my jaw.
Timing: Came on with exertion, lasted about twenty minutes.
Associated symptoms: Sweaty and a bit sick with it.
Past history: High blood pressure, treated for six years.
Ideas and concerns: My father died of a heart attack at 58.

## actor_flags
Look uncomfortable and shift position when asked to sit forward.
If asked directly about smoking, admit to 20 a day for 30 years.

## mark_scheme
Opening and structure (15): Introduces self and confirms patient identity
Opening and structure (15): Explains the purpose of the consultation
Pain characterisation (25): Establishes site, onset and character
Pain characterisation (25): Asks specifically about radiation
Pain characterisation (25): Establishes timing and relation to exertion
Risk assessment (20): Asks about smoking, hypertension and family history
Closing (10): Summarises accurately and checks understanding

## main_concept
CON-CVS-1A060C49C5C0C1

## learning_objective
Take a chest-pain history that separates cardiac from non-cardiac causes on the
features that actually discriminate.

## media_needed
### audio · station
Brief: Recording of the actor's opening line, for candidates practising alone
Purpose: Lets a student run the station without a partner.
Priority: optional
Status: needed

## references
NICE CG95 · Chest pain of recent onset
```

---

## Type 2 · Clinical case

| Field key | Required? | Source of truth | Rule |
|---|---|---|---|
| `decisions` | yes | `CaseAuthoringData.decisions` | `### title`, `Concept:`, `Difficulty:`, `Q:`, `*` options with one `*=` and a `Why:` each, `Rationale:`. |
| `debrief` | no | `CaseAuthoringData.debrief` | What the case was teaching, shown at the end. |

Any line inside a decision block that is not a label or an option becomes that
decision's **context** — use it to advance the story between steps.

**The labels a block understands.** Each runs until the next label or option, so
any of them may wrap across several lines.

| Label | What it does |
|---|---|
| `Concept:` | The one concept this question teaches. |
| `Also:` | Concepts it also assesses, separated by `\|`. |
| `Difficulty:` | `Easy`, `Moderate`, `Hard`, or `Challenging`. |
| `Q:` | The question itself. |
| `Why:` | Belongs to the option **above** it — why that option is right, or which misconception picks it. |
| `Rationale:` / `Explanation:` | The whole question's teaching point, shown after the answer. |
| `Media:` | A real asset URL. For an asset you do not have yet, use `media_needed`. |

A `Why:` with no option above it has nothing to attach to and is dropped, which
the validator reports as an option missing its explanation.

```markdown
# Item

## title
Acute central chest pain

## subject
cvs

## type
Clinical case

## status
Draft

## decisions
### Immediate action
A 54-year-old man arrives with 20 minutes of central crushing chest pain. He is
sweaty, pulse 96, blood pressure 148/88.
Concept: CON-CVS-1A060C49C5C0C1
Difficulty: Easy
Q: What is your first step?
*= Give aspirin and arrange an immediate ECG
Why: Both are time-critical, and neither waits on a confirmed diagnosis.
* Send home with analgesia and a routine outpatient appointment
Why: Chosen by students who weight a normal examination over the history. The
history alone is enough to make this unsafe.
* Request an outpatient exercise tolerance test
Why: Catches the student who reaches for the test that diagnoses stable angina.
Provoking ischaemia during an acute presentation is dangerous.
* Wait for troponin before doing anything else
Why: The misconception that a diagnosis must be confirmed before anything is
given. Troponin may be normal in the first hours.
Rationale: An ECG within 10 minutes and aspirin are both time-critical in
suspected acute coronary syndrome. Waiting for troponin delays reperfusion.

### Interpreting the ECG
The ECG shows 2 mm ST elevation in leads II, III and aVF.
Concept: CON-CVS-7FEAA20AB5CBD0
Also: CON-CVS-2480077C89FDC3
Difficulty: Hard
Q: Which territory is affected, and what does it imply?
*= Inferior — check a right-sided ECG before giving nitrates
Why: II, III and aVF face the inferior surface, which the right coronary artery
usually supplies.
* Anterior — start high-dose nitrates immediately
Why: The student who maps every ST elevation to the LAD. Anterior infarction
shows in V1–V4.
* Lateral — no additional precaution is needed
Why: Confuses aVF with aVL. Lateral changes appear in I, aVL, V5 and V6.
* The changes are non-specific
Why: Picked by students who expect a territory to need more than three leads.
Rationale: Inferior STEMI may involve the right ventricle, which is
preload-dependent; nitrates can cause profound hypotension.

## debrief
The case rewards recognising the time-critical actions before the diagnosis is
confirmed, and knowing why an inferior territory changes what is safe to give.

## main_concept
CON-CVS-1A060C49C5C0C1

## contextual_concept_ids
CON-CVS-22A9DCDEA41021

## learning_objective
Act on a time-critical presentation before the diagnosis is confirmed, and read
an ECG territory back to the artery that supplies it.

## media_needed
### image · Interpreting the ECG
Brief: 12-lead ECG showing 2 mm ST elevation in II, III and aVF
Purpose: The territory cannot be identified from a text description alone.
Priority: required
Status: needed
Source direction: openly licensed ECG teaching library

## references
NICE NG185 · Acute coronary syndromes
```

---

## Type 3 · Skills checklist

A procedure scored against observable steps. Same shape as an OSCE station but
with no actor brief.

| Field key | Required? | Source of truth | Rule |
|---|---|---|---|
| `mark_scheme` | yes | `OsceAuthoringData.markSections` | Same syntax. Each item is one observable step. |

```markdown
# Item

## title
Cardiovascular examination

## subject
cvs

## type
Skills checklist

## status
Draft

## duration
8

## marks
20

## candidate_instructions
Perform a cardiovascular examination on this patient and present your findings.

## mark_scheme
Preparation (4): Washes hands and introduces self
Preparation (4): Positions the patient at 45 degrees and exposes appropriately
Peripheral examination (6): Examines hands, pulse and blood pressure
Peripheral examination (6): Assesses the jugular venous pressure
Praecordium (8): Palpates the apex beat and locates it accurately
Praecordium (8): Auscultates all four areas with the correct bell/diaphragm use
Completion (2): Offers to examine the lung bases and peripheral oedema
```

---

## Type 4 · Lab and imaging interpretation

| Field key | Required? | Source of truth | Rule |
|---|---|---|---|
| `lab_questions` | yes | `LabAuthoringData.questions` | `### stem`, `Concept:`, `Difficulty:`, `Q:`, `*` options with one `*=` and a `Why:` each, `Explanation:`. |
| `lab_subtype` | no | `LabAuthoringData.subtype` | `Lab` or `Imaging`. Inferred from `type` when omitted. |

An optional `Media: <url>` line inside a block attaches the image or trace. It
must be a real URL — for an asset that does not exist yet, write a `media_needed`
block instead. The block labels are the same as a case decision's.

```markdown
# Item

## title
Chest X-ray: basic interpretation

## subject
resp

## type
Imaging interpretation

## lab_subtype
Imaging

## status
Draft

## lab_questions
### Consolidation versus effusion
Concept: CON-RES-EXAMPLE-EFFUSION
Difficulty: Easy
Q: A blunted costophrenic angle with an upward-sloping meniscus indicates what?
*= A pleural effusion
Why: Fluid is free to track up the chest wall, which is what produces the
meniscus.
* Lobar consolidation
Why: The student who reads any lower-zone opacity as consolidation.
Consolidation follows lobar anatomy and usually contains an air bronchogram.
* A pneumothorax
Why: Confuses a lucent abnormality with an opaque one — a pneumothorax removes
lung markings rather than adding density.
* Hyperinflation
Why: Picked by students who associate any costophrenic change with COPD.
Hyperinflation flattens the diaphragm rather than blunting the angle.
Explanation: Fluid tracks up the chest wall and produces a meniscus. Consolidation
follows lobar anatomy and characteristically contains an air bronchogram.

### Assessing the film before reading it
Concept: CON-RES-EXAMPLE-ROTATION
Difficulty: Moderate
Q: The medial ends of both clavicles are asymmetrical about the spinous processes.
What does this mean for your interpretation?
*= The film is rotated, so mediastinal width and hilar position cannot be assessed reliably
Why: Rotation is a technical fault, and knowing which readings it invalidates is
the point of checking before reading.
* The patient has a scoliosis that needs investigating
Why: The student who treats every asymmetry as a patient finding rather than a
film one.
* The film is under-penetrated
Why: Confuses two quality checks. Penetration is judged on whether vertebral
bodies are visible behind the heart.
* Nothing — rotation does not affect interpretation
Why: The commonest error — reading a rotated film as if it were straight, then
reporting a widened mediastinum that is not there.
Explanation: Rotation displaces mediastinal structures and is the commonest reason
for falsely reporting a widened mediastinum.

## media_needed
### image · Assessing the film before reading it
Brief: PA chest radiograph rotated to the left, clavicles clearly asymmetrical
Purpose: Rotation has to be seen to be recognised.
Priority: required
Status: needed

## references
Royal College of Radiologists · Chest radiograph interpretation
```

---

## Reject if

- The type's required block is missing: no `mark_scheme` on an OSCE station or
  checklist, no `decisions` on a case, no `lab_questions` on an interpretation set.
- Any decision or interpretation question has no `*=` line, or has more than one.
- Any option has no `Why:` line — including the correct one.
- A mark-scheme item describes an internal state rather than an observable
  behaviour.
- The mark scheme rewards asking something the actor brief cannot answer.
- Every option in a decision leads to the same outcome — it is not a decision.
- A rationale or explanation is missing.
- A distractor exists only to fill a slot; no student with a real misconception
  would choose it.
- The concept in `Concept:` or `main_concept` does not exist, or no article
  covers it.
- A concept the scenario merely mentions is in `main_concept` rather than
  `contextual_concept_ids`.
- A `media_needed` target names no question in the item.
- A `Media:` line holds a placeholder rather than a real URL.
- The record states a dose, treatment, or emergency action you cannot cite.

## Self-check

- [ ] Every `## key` matches a key in `IMPORT_SCHEMAS.practical`.
- [ ] `type` is one of the five exact strings.
- [ ] Mark-scheme lines are `Section (marks): item`; repeated titles group as
      intended.
- [ ] Actor brief lines are `Label: content`.
- [ ] Each `###` block has a `Q:` line, exactly one `*=`, a `Why:` on every
      option, and a `Rationale:`/`Explanation:`.
- [ ] Every mark-scheme item is answerable from the actor brief.
- [ ] Every concept ID exists; `main_concept` holds only what is assessed.
- [ ] Difficulty across the file is roughly 25/55/15/5.
- [ ] Every asset you do not have is in `media_needed`, not in `Media:`.
- [ ] `status` is `Draft`.

Then confirm it actually runs: import the file on the Bulk Import page and open
each item in the practical runner. An item that imports but does not run means
the micro-syntax did not parse.
