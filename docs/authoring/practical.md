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
  then options as `* option` with the correct one as `*= option`, then
  `Rationale:` (cases) or `Explanation:` (interpretation).
- EVERY decision and EVERY interpretation question needs exactly one `*=` line.
  The importer rejects the record otherwise.

Content rules:
- Mark-scheme items must describe an OBSERVABLE behaviour an examiner can tick,
  not an internal state. "Asks about radiation of the pain", not "Understands
  the pain".
- The actor brief must answer what a real patient would be asked. If the mark
  scheme rewards asking about radiation, the actor brief must say where it
  radiates.
- Case decisions must have consequences that follow from the choice. A decision
  where every option leads to the same place is not a decision.
- Never write a treatment, dose, or emergency action you cannot cite.

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
| `difficulty` | no | `fields.Difficulty` | `Easy`, `Moderate`, or `Hard`. |
| `references` | no | `*.references` | Read-around resources, one per line. |

---

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

## references
NICE CG95 · Chest pain of recent onset
```

---

## Type 2 · Clinical case

| Field key | Required? | Source of truth | Rule |
|---|---|---|---|
| `decisions` | yes | `CaseAuthoringData.decisions` | `### title`, `Q:`, `*` options with one `*=`, `Rationale:`. |
| `debrief` | no | `CaseAuthoringData.debrief` | What the case was teaching, shown at the end. |

Any line inside a decision block that is not `Q:`, `Rationale:`, or an option
becomes that decision's **context** — use it to advance the story between steps.

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
Q: What is your first step?
*= Give aspirin and arrange an immediate ECG
* Send home with analgesia and a routine outpatient appointment
* Request an outpatient exercise tolerance test
* Wait for troponin before doing anything else
Rationale: An ECG within 10 minutes and aspirin are both time-critical in
suspected acute coronary syndrome. Waiting for troponin delays reperfusion.

### Interpreting the ECG
The ECG shows 2 mm ST elevation in leads II, III and aVF.
Q: Which territory is affected, and what does it imply?
*= Inferior — check a right-sided ECG before giving nitrates
* Anterior — start high-dose nitrates immediately
* Lateral — no additional precaution is needed
* The changes are non-specific
Rationale: Inferior STEMI may involve the right ventricle, which is
preload-dependent; nitrates can cause profound hypotension.

## debrief
The case rewards recognising the time-critical actions before the diagnosis is
confirmed, and knowing why an inferior territory changes what is safe to give.

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
| `lab_questions` | yes | `LabAuthoringData.questions` | `### stem`, `Q:`, `*` options with one `*=`, `Explanation:`. |
| `lab_subtype` | no | `LabAuthoringData.subtype` | `Lab` or `Imaging`. Inferred from `type` when omitted. |

An optional `Media: <url>` line inside a block attaches the image or trace.

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
Q: A blunted costophrenic angle with an upward-sloping meniscus indicates what?
*= A pleural effusion
* Lobar consolidation
* A pneumothorax
* Hyperinflation
Explanation: Fluid tracks up the chest wall and produces a meniscus. Consolidation
follows lobar anatomy and characteristically contains an air bronchogram.

### Assessing the film before reading it
Q: The medial ends of both clavicles are asymmetrical about the spinous processes.
What does this mean for your interpretation?
*= The film is rotated, so mediastinal width and hilar position cannot be assessed reliably
* The patient has a scoliosis that needs investigating
* The film is under-penetrated
* Nothing — rotation does not affect interpretation
Explanation: Rotation displaces mediastinal structures and is the commonest reason
for falsely reporting a widened mediastinum.

## references
Royal College of Radiologists · Chest radiograph interpretation
```

---

## Reject if

- The type's required block is missing: no `mark_scheme` on an OSCE station or
  checklist, no `decisions` on a case, no `lab_questions` on an interpretation set.
- Any decision or interpretation question has no `*=` line, or has more than one.
- A mark-scheme item describes an internal state rather than an observable
  behaviour.
- The mark scheme rewards asking something the actor brief cannot answer.
- Every option in a decision leads to the same outcome — it is not a decision.
- A rationale or explanation is missing.
- The record states a dose, treatment, or emergency action you cannot cite.

## Self-check

- [ ] Every `## key` matches a key in `IMPORT_SCHEMAS.practical`.
- [ ] `type` is one of the five exact strings.
- [ ] Mark-scheme lines are `Section (marks): item`; repeated titles group as
      intended.
- [ ] Actor brief lines are `Label: content`.
- [ ] Each `###` block has a `Q:` line, exactly one `*=`, and a
      `Rationale:`/`Explanation:`.
- [ ] Every mark-scheme item is answerable from the actor brief.
- [ ] `status` is `Draft`.

Then confirm it actually runs: import the file on the Bulk Import page and open
each item in the practical runner. An item that imports but does not run means
the micro-syntax did not parse.
