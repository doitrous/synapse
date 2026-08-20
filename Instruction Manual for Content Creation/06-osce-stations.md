# 06 · OSCE stations

> You must have read [00-START-HERE.md](00-START-HERE.md) before using this file.

An **OSCE station** is a timed encounter with a simulated patient, scored against a mark
scheme by an examiner. Three people have to be able to use what you write: the candidate,
the actor, and the examiner. If any one of them is missing something, the station does not run.

| | |
|---|---|
| **Imports at** | Admin › Bulk import → **practical** (`/admin/import/practical`) |
| **Goes in** | `docs/import-ready/practical/` |
| **`type` value** | `OSCE station` |
| **Recognised by** | `type` plus one of `mark_scheme` / `candidate_instructions` |
| **Required blocks** | `candidate_instructions` **and** `mark_scheme` |
| **Columns you should use** | **20** of the 25 — all but `decisions`, `debrief`, `lab_subtype`, `lab_questions`, `media_needed` |

Practicals do **not** report `fieldsUsed`. `npm run medical:batch` gives you `byType`,
`markSchemeItems`, `conceptsTaught`, `itemDifficulty` and `mediaNeeded` instead. Check
those numbers match what you wrote — `markSchemeItems: 18` when you wrote eighteen scoring
points is the confirmation that none were silently dropped.

One file may mix all five practical formats. Keeping one format per file is easier to
review, and the folder's `INDEX.md` should say which is which either way.

---

## Shared practical fields

Every practical format carries these. They are restated in each of manuals 06–10 so you
can work from one file.

| Key | Label | Required | Rule |
|---|---|---|---|
| `type` | Practical format | **yes** | `OSCE station` here. Exact string — see the box above. |
| `title` | Title | **yes** | What the station is. |
| `subject` | Subject ID | **yes** | One of `cvs resp renal gi neuro endo msk pharm`. |
| `id` | Canonical ID | no | Supply to update an existing item. |
| `status` | Status | no | Write `Draft`. |
| `owner` | Owner | no | Author or team responsible for review. |
| `duration` | Duration | no | Expected minutes. |
| `marks` | Marks / decisions | no | Recomputed on save as the sum of your mark-section marks — write it anyway for the human reading the batch. |
| `difficulty` | Difficulty | no | `Easy` · `Moderate` · `Hard` · `Challenging`. Whole-item difficulty. |
| `module_subject` | Module subject path(s) | — | Where inside each module it sits — `101 ISK > Anatomy > Upper Limb`. One path per line. |
| `main_concept` | Main concept(s) | — | What this station is **for**. Awards mastery. |
| `concept_ids` | Also assessed | — | What it also genuinely assesses. Awards mastery. |
| `contextual_concept_ids` | Mentioned only | — | What the scenario needs but never tests. **Awards no mastery.** |
| `learning_objective` | Learning objective | — | What a student who passes this has demonstrated. |
| `references` | Read around it | — | Resources shown after the station. **Prose list — newlines only.** |
| `media_recommendations` | Media requests | — | Assets the station needs. See below. |
| `media_needed` | Media needed | — | The older name for the same field. Use `media_recommendations`. |

### The three concept buckets

Same distinction the MCQ manual draws, for the same reason. A station set in a patient with
COPD that assesses the JVP tags **JVP** as `main_concept` and **COPD** as
`contextual_concept_ids`. Putting a merely-mentioned concept in `main_concept` silently
credits the student with mastery they have not shown.

---

## The prompt

```
You are writing OSCE stations for Synapse, a study platform for undergraduate medical
students in Egypt.

Read, in this order:
1. Instruction Manual for Content Creation/00-START-HERE.md
2. Instruction Manual for Content Creation/06-osce-stations.md

Produce ONLY practical records with type "OSCE station", in the importer markdown format
defined in that manual, with no commentary before or after.

Non-negotiable:
- The micro-syntax is parsed literally. Mark scheme lines are
  "Section title (marks): the observable behaviour", one per line. Actor brief lines are
  "Label: content", one per line.
- Every mark-scheme item must describe an OBSERVABLE behaviour an examiner can tick, not
  an internal state. "Asks about radiation of the pain", not "Understands the pain".
- The actor brief must answer everything the mark scheme rewards asking about. If the
  mark scheme gives marks for asking about radiation, the actor brief must say where it
  radiates.
- Name the concepts in main_concept / concept_ids / contextual_concept_ids correctly.
  A merely-mentioned concept in main_concept corrupts the student's mastery profile.
- Never write a treatment, dose, or emergency action you cannot cite.
- Media you need is a request block. Never invent a URL.
- British spelling. status: Draft.

Validate with `npm run medical:batch`. Confirm markSchemeItems matches the number of
scoring points you wrote — a mismatch means lines were silently dropped.
```

---

## Candidate instructions

What the candidate reads before the timer starts. It must state the setting, the role, the
task, and the time — and nothing that gives away the mark scheme.

```markdown
## candidate_instructions
You are the house officer in the medical assessment unit. Mr Daniel Rossi, 54, has been
referred by his GP with chest pain that began this morning. Take a focused history and
present your differential diagnosis to the examiner. You have eight minutes.
```

Do not put examination findings, results, or the diagnosis here. If the candidate needs a
result partway through, that belongs in the actor brief as something the actor hands over
when asked.

---

## The actor brief

Three fields, and the station fails without all three.

### `actor_opening` — "open with this, then stop"

The single line the actor says when the candidate starts, after which they answer only what
is asked. This is what makes the station discriminate: a candidate who asks good questions
gets more than a candidate who does not.

```markdown
## actor_opening
It came on when I was carrying shopping upstairs.
```

Keep it to one sentence, in the patient's own words. An opening that volunteers the site,
character and radiation hands the candidate the history for free.

### `actor_sections` — one `Label: content` per line

Everything the actor needs in order to answer. **Parsed literally**: any line without both a
label and content is dropped silently.

```markdown
## actor_sections
Who you are: Daniel Rossi, 54, self-employed builder. Married, two children.
Site: Central, across the front of my chest.
Character: A heavy pressure, like someone sitting on me.
Radiation: Down my left arm and into my jaw.
Onset and duration: Started this morning carrying shopping upstairs, about two hours ago. It has not gone away.
Aggravating and relieving: Worse walking, a bit better sitting still. Nothing else helps.
Associated symptoms: Sweaty and a bit sick. Not short of breath at rest.
Past medical history: High blood pressure, on tablets. No diabetes. No previous heart trouble.
Drug history: Amlodipine. No allergies.
Family history: My father had a heart attack at 58.
Social history: 20 cigarettes a day for 30 years. Six pints at the weekend. Builder, still working.
Ideas concerns expectations: I think it might be my heart. I am frightened it is a heart attack. I want to know if I need to stay in.
If asked something not covered: Answer plausibly and briefly, and do not volunteer anything new.
```

**The completeness rule: the actor brief must answer everything the mark scheme rewards.**
Write the mark scheme and the actor brief together and check them against each other. A
mark for "asks about radiation" with no `Radiation:` line is a mark no candidate can earn
and no actor can award.

> The admin form has an optional **Group** on each actor section — "Only if asked", and so
> on. The importer cannot set it (`parseActorSections` reads only `Label: content`), so an
> imported brief loses that grouping. Fold the condition into the label instead:
> `If asked about smoking: …`.

### `actor_flags` — behavioural triggers

Conditional behaviour, one per line. **Prose list — newlines only.** Phrase each as
"If the candidate…, then…".

```markdown
## actor_flags
If the candidate does not introduce themselves, stay guarded and give short answers until they do.
If the candidate asks an open question, give two symptoms; if they ask a closed question, answer only that.
If the candidate mentions a heart attack, become visibly anxious and ask whether you are going to die.
If the candidate has not asked about smoking by six minutes, mention that you are trying to cut down.
```

Flags are what make the station reproducible between actors. Without them, two candidates
sit two different stations.

---

## The mark scheme

**One line per scoring point**, in the form `Section title (marks): observable behaviour`.

```markdown
## mark_scheme
Opening and structure (15): Introduces self by name and role
Opening and structure (15): Confirms the patient's identity and gains consent
Opening and structure (15): Signposts the structure of the consultation
Pain characterisation (25): Establishes the site of the pain
Pain characterisation (25): Establishes the character of the pain in the patient's own words
Pain characterisation (25): Establishes radiation
Pain characterisation (25): Establishes onset, timing and duration
Pain characterisation (25): Establishes aggravating and relieving factors
Risk factors (20): Asks about smoking, quantified
Risk factors (20): Asks about hypertension, diabetes and cholesterol
Risk factors (20): Asks about family history of premature cardiac death
Red flags and differential (25): Asks about associated sweating, nausea or breathlessness
Red flags and differential (25): Screens for tearing pain radiating to the back
Red flags and differential (25): Screens for pleuritic character and calf pain
Red flags and differential (25): Presents a differential naming ACS, dissection and PE
Communication (15): Elicits the patient's ideas, concerns and expectations
Communication (15): Responds to the patient's fear without dismissing it
Communication (15): Avoids jargon and checks understanding
```

- **Repeat the section title on every line.** Lines with the same title are grouped into one
  section, and the marks are taken from the first occurrence.
- The `(marks)` figure is the **section total**, not the value of that one line. Above,
  "Opening and structure" is worth 15 across its three items.
- `marks` on the record recomputes to the sum of section marks — 100 here.

### Every item must be observable

An examiner ticks a box. They cannot see understanding.

| Write this | Not this |
|---|---|
| Asks about radiation of the pain | Understands the pain |
| Quantifies smoking in pack-years | Takes a good social history |
| Presents a differential naming ACS, dissection and PE | Reaches the right diagnosis |
| Responds to the patient's fear without dismissing it | Shows empathy |

If you cannot say what the examiner would *see or hear*, the item is not ready.

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

**An OSCE station must have an actor brief.** `an OSCE station needs an actor brief,
or the mark scheme cannot be answered` — the validator refuses a station whose mark
scheme rewards asking questions nobody can answer. This is the completeness rule
above, enforced.

## Media

> **This format has no field for real media.** `OsceAuthoringData` — which backs both OSCE
> stations and skills checklists — carries no media URL of any kind, and neither does a
> clinical case decision. The only media a practical can hold is a **request**, which is an
> instruction to a human and never renders to a student.
>
> So you cannot attach an ECG, a photograph, a heart sound or a clip here at all. Your
> options are: request it and let a human place it once real media exists, or, if the item
> genuinely turns on the asset, write it as an MCQ instead — a question's `## attachments`
> takes `image`, `audio` and `video`, and is the only student-facing item that does. See
> [05-questions.md](05-questions.md) §Media.

Stations often need an ECG, a radiograph, or a heart-sound recording to hand the candidate.
Never invent a URL.

```markdown
## media_recommendations
### image · station
Brief: 12-lead ECG showing 2 mm ST elevation in leads II, III and aVF, to be handed to the
candidate if they request an ECG
Kind: graph
Purpose: The final mark-scheme item asks the candidate to present a differential. Without
the ECG the station cannot discriminate between a candidate who reads it and one who does not.
Priority: required
Status: needed
Source direction: openly licensed ECG teaching library
Rights: must be CC-BY or public domain
```

**`Section:` must name a real block.** For a station, that means the literal `station` — or
omit it. Naming a block that does not exist fails with
`Media request "…" names "…", which is not a question in this item`. Full syntax in
[00-START-HERE.md](00-START-HERE.md) §6.

---

## Worked example

```markdown
# Item

## id
PRC-CVS-OSCE-001

## title
History: chest pain in a 54-year-old builder

## subject
cvs

## type
OSCE station

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

## candidate_instructions
You are the house officer in the medical assessment unit. Mr Daniel Rossi, 54, has been
referred by his GP with chest pain that began this morning. Take a focused history and
present your differential diagnosis to the examiner. You have eight minutes.

## actor_opening
It came on when I was carrying shopping upstairs.

## actor_sections
Who you are: Daniel Rossi, 54, self-employed builder. Married, two children.
Site: Central, across the front of my chest.
Character: A heavy pressure, like someone sitting on me.
Radiation: Down my left arm and into my jaw.
Onset and duration: Started this morning carrying shopping upstairs, about two hours ago. It has not gone away.
Aggravating and relieving: Worse walking, a bit better sitting still. Nothing else helps.
Associated symptoms: Sweaty and a bit sick. Not short of breath at rest.
Not the answer: No tearing pain, nothing going through to my back, no calf pain, no cough.
Past medical history: High blood pressure, on tablets. No diabetes. No previous heart trouble.
Drug history: Amlodipine. No allergies.
Family history: My father had a heart attack at 58.
Social history: 20 cigarettes a day for 30 years. Six pints at the weekend. Builder, still working.
Ideas concerns expectations: I think it might be my heart. I am frightened it is a heart attack. I want to know if I need to stay in.
If asked something not covered: Answer plausibly and briefly, and do not volunteer anything new.

## actor_flags
If the candidate does not introduce themselves, stay guarded and give short answers until they do.
If the candidate asks an open question, give two symptoms; if they ask a closed question, answer only that.
If the candidate mentions a heart attack, become visibly anxious and ask whether you are going to die.
If the candidate has not asked about smoking by six minutes, mention that you are trying to cut down.

## mark_scheme
Opening and structure (15): Introduces self by name and role
Opening and structure (15): Confirms the patient's identity and gains consent
Opening and structure (15): Signposts the structure of the consultation
Pain characterisation (25): Establishes the site of the pain
Pain characterisation (25): Establishes the character of the pain in the patient's own words
Pain characterisation (25): Establishes radiation
Pain characterisation (25): Establishes onset, timing and duration
Pain characterisation (25): Establishes aggravating and relieving factors
Risk factors (20): Asks about smoking and quantifies it
Risk factors (20): Asks about hypertension, diabetes and cholesterol
Risk factors (20): Asks about family history of premature cardiac death
Red flags and differential (25): Asks about associated sweating, nausea or breathlessness
Red flags and differential (25): Screens for tearing pain radiating to the back
Red flags and differential (25): Screens for pleuritic character and calf pain
Red flags and differential (25): Presents a differential naming ACS, aortic dissection and PE
Communication (15): Elicits the patient's ideas, concerns and expectations
Communication (15): Responds to the patient's fear without dismissing it
Communication (15): Avoids jargon and checks understanding

## main_concept
CON-CVS-7C9D59D257AC65

## concept_ids

## contextual_concept_ids

## learning_objective
Take a focused cardiac chest-pain history that characterises the pain, quantifies
cardiovascular risk, screens for the immediately life-threatening differentials, and
addresses the patient's stated fear.

## references
Kasr Alainy, ANATOMY CARDIOVASCULAR SYSTEM — pericardium and cardiac pain referral.

## media_recommendations
### image · station
Brief: 12-lead ECG showing 2 mm ST elevation in leads II, III and aVF, to be handed to the
candidate if they request an ECG
Kind: graph
Purpose: The differential item cannot discriminate between a candidate who reads an ECG and
one who does not unless there is an ECG to read.
Priority: required
Status: needed
Source direction: openly licensed ECG teaching library
Rights: must be CC-BY or public domain
```

Check the example against itself: every mark-scheme item that rewards asking about
something has a matching `actor_sections` line that answers it, including the negatives —
the `Not the answer:` line exists so the actor can rule out dissection and PE when asked.

---

## Before you hand off

```bash
npm run medical:batch -- "docs/import-ready/practical/<your-file>.md"
npm run medical:simulate -- "docs/import-ready/practical/"*.md --emit /tmp/sim-$SCOPE.json
npm run medical:audit -- --source /tmp/sim-$SCOPE.json
```

- [ ] `type` is exactly `OSCE station`
- [ ] `candidate_instructions` states setting, role, task and time, and gives nothing away
- [ ] `actor_opening` is one line and volunteers nothing
- [ ] **Every mark-scheme item that rewards asking about something is answered in the actor brief**
- [ ] Every mark-scheme item is an observable behaviour, not an internal state
- [ ] Section titles repeat on every line of that section
- [ ] Section marks sum to the `marks` figure
- [ ] `actor_flags` make the station reproducible between two different actors
- [ ] Concepts are in the right bucket
- [ ] Media is a request block; no invented URLs
- [ ] `markSchemeItems` in the validator output equals the number of scoring points I wrote
- [ ] `conceptsTaught` equals the number of concepts I named in `main_concept`

### The failures specific to OSCE stations

| Symptom | Cause |
|---|---|
| `OSCE station needs a mark scheme as "Section (marks): item" lines` | Missing or malformed `mark_scheme` |
| A mark-scheme item vanished | The line had no `(marks)` or no `:` — it is dropped silently |
| An actor-brief line vanished | The line had no `Label:` or no content after it |
| Sections merged unexpectedly | Two sections share a title |
| A section's marks are wrong | Marks come from the **first** line bearing that title |
| `Media request "…" names "…", which is not a question in this item` | `Section:` names a block that does not exist. For a station, use `station` or omit it. |
| The actor cannot answer a question the mark scheme rewards | You wrote the mark scheme and the brief separately |
