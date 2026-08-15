# 07 · Clinical cases

> You must have read [00-START-HERE.md](00-START-HERE.md) before using this file.

A **clinical case** is a sequence of decisions with consequences. The student is walked
through a patient and asked, at each point, what they would do — and each choice is
explained. It is the format that teaches clinical reasoning rather than recall.

| | |
|---|---|
| **Imports at** | Admin › Bulk import → **practical** (`/admin/import/practical`) |
| **Goes in** | `docs/import-ready/practical/` |
| **`type` value** | `Clinical case` |
| **Recognised by** | `type` plus `decisions` |
| **Required blocks** | `decisions` — at least one, each with exactly one correct option |
| **Columns you should use** | **19** of the 25 — all but `candidate_instructions`, `actor_opening`, `actor_sections`, `actor_flags`, `mark_scheme`, `lab_subtype`, `lab_questions` |

Practicals do **not** report `fieldsUsed`. `npm run medical:batch` gives you `questions`,
`conceptsTaught`, `questionDifficulty` and `mediaNeeded`. Check `questions` equals the
number of decisions you wrote.

---

## Shared practical fields

| Key | Label | Required | Rule |
|---|---|---|---|
| `type` | Practical format | **yes** | `Clinical case`. Exact string. |
| `title` | Title | **yes** | What the case is about. |
| `subject` | Subject ID | **yes** | One of `cvs resp renal gi neuro endo msk pharm`. |
| `id` | Canonical ID | no | Supply to update an existing item. |
| `status` | Status | no | Write `Draft`. |
| `owner` | Owner | no | Author or team responsible for review. |
| `duration` | Duration | no | Expected minutes. |
| `marks` | Marks / decisions | no | Recomputed as the **number of decisions**. |
| `difficulty` | Difficulty | no | `Easy` · `Moderate` · `Hard` · `Challenging`. Whole-item difficulty; each decision may also set its own. |
| `main_concept` | Main concept(s) | — | What the case as a whole is **for**. Awards mastery. |
| `concept_ids` | Also assessed | — | What it also assesses. Awards mastery. |
| `contextual_concept_ids` | Mentioned only | — | Needed by the scenario, never assessed. **No mastery.** |
| `learning_objective` | Learning objective | — | What a student who completes the case has demonstrated. |
| `references` | Read around it | — | Shown after the case. **Prose list — newlines only.** |
| `debrief` | Case debrief | — | Shown after the final decision. |
| `media_recommendations` | Media requests | — | See below. |

Use the item-level concept fields for what the **case as a whole** is about, and the
per-decision `Concept:` / `Also:` lines for what **one decision** is about.

---

## The prompt

```
You are writing clinical cases for Synapse, a study platform for undergraduate medical
students in Egypt.

Read, in this order:
1. Instruction Manual for Content Creation/00-START-HERE.md
2. Instruction Manual for Content Creation/07-clinical-cases.md

Produce ONLY practical records with type "Clinical case", in the importer markdown format
defined in that manual, with no commentary before or after.

Non-negotiable:
- The micro-syntax is parsed literally. Each decision starts "### Decision title", then
  optionally "Concept:", "Also:", "Difficulty:", then "Q: question", then options as
  "* option" with the correct one as "*= option", each followed by "Why: …", then
  "Rationale: …".
- EVERY decision needs exactly one "*=" line. Zero or two is rejected.
- EVERY option needs a "Why:" line, including the correct one.
- A decision where every option leads to the same place is not a decision. The choice
  must have consequences that follow from it.
- Each distractor must catch a specific, nameable misconception, and its "Why:" must say
  which one.
- Name the ONE concept each decision teaches in its "Concept:" line.
- Never write a treatment, dose, or emergency action you cannot cite.
- Media you need is a request block. Never invent a URL.
- British spelling. status: Draft.

Validate with `npm run medical:batch`. Confirm `questions` equals the number of decisions.
```

---

## The decision block

This is the whole format. Get the micro-syntax exactly right — it is parsed literally.

```markdown
## decisions
### Immediate action
Concept: CON-CVS-7C9D59D257AC65
Also: CON-CVS-AE28ABD8CE2B0B
Difficulty: Moderate
He is 54, sweating, and describes central chest pressure that began two hours ago while
carrying shopping upstairs. His blood pressure is 138/84, pulse 96 and regular, and he is
not short of breath at rest.
Q: What is your first step?
*= Give aspirin 300 mg and arrange a 12-lead ECG within ten minutes
Why: Both are time-critical and neither waits on a confirmed diagnosis. The ECG decides
whether this is a STEMI needing immediate reperfusion, and aspirin is given on suspicion.
* Wait for the troponin result before doing anything
Why: Picked by students who treat troponin as the diagnostic gate. A first troponin can be
normal within two hours of symptom onset, and waiting for it delays reperfusion in exactly
the patient who cannot afford the delay.
* Send home with analgesia and a GP follow-up
Why: Picked by students reassured by a normal blood pressure and a regular pulse. Neither
excludes an acute coronary syndrome, and this is the error that kills.
* Arrange an urgent outpatient exercise test
Why: Picked by students recognising cardiac risk but pattern-matching to stable angina. An
exercise test in ongoing chest pain is contraindicated.
Rationale: Aspirin and an early ECG are the two time-critical steps in suspected ACS. Both
happen before any result is back, because the cost of waiting is myocardium.
```

### The rules the parser enforces

| Line | Rule |
|---|---|
| `### Title` | Opens a decision. This is the **decision label**. |
| unlabelled prose | Everything not on a labelled line becomes the **case text / clinical context** for that decision. |
| `Q:` | The **main question**. Kept separate from the context on purpose. |
| `* option` | An option. Two to six per decision; padded to four in the editor, capped at six. |
| `*= option` | The **correct** option. **Exactly one per decision.** |
| `Why:` | Attaches to the option **above it**. Required on every option. |
| `Rationale:` | The decision rationale, shown after the choice. |
| `Concept:` | The ONE concept this decision teaches. |
| `Also:` | Concepts it also assesses, `\|`-separated. |
| `Difficulty:` | This decision's intended difficulty. |

`Concept:`, `Also:`, `Difficulty:` and `Media:` are **scalar labels** — they take their own
line and then the parser reverts to context. This exists because letting `Difficulty:`
swallow the next line produced values like `"Moderate He tells you he is thirsty"`, which
matched no band and went silently untagged. Keep each on its own line.

### What makes a decision worth writing

- **The choice must have consequences.** If every option leads to the same next step, it is
  a quiz question wearing a case's clothes. Order the decisions so that each one changes
  what the student faces next.
- **Every distractor is a named misconception.** Not "wrong", but *who* picks this and
  *why*. The examples above name four different students.
- **The correct option's `Why:` still has to earn its place.** It is not "this is correct";
  it is the reasoning that makes it correct.
- **`Rationale:` is the wider lesson**, above the individual options — what the student
  should carry to the next patient.

---

## The debrief

Shown after the final decision. This is where the case becomes teaching rather than
assessment: what the case was really about, what the common path through it looks like,
and what to read next.

```markdown
## debrief
This case rewards acting on suspicion rather than waiting for confirmation. The two
decisions that separate a safe candidate from an unsafe one are both early: giving aspirin
before the diagnosis is confirmed, and reading the ECG within ten minutes. A normal first
troponin was the trap — it is a rule-out test only when repeated at the right interval, and
it never overrides an ECG showing ST elevation. Students who chose to wait were not being
careless; they were applying a rule they had learned without its timing caveat.
```

---

## Media

> **This format has no field for real media.** `ClinicalDecisionDraft` carries no media URL
> — and neither does `OsceAuthoringData`, behind stations and checklists. The only media any
> practical can hold is a **request**, which is an instruction to a human and never renders
> to a student.
>
> So you cannot attach an ECG, a photograph, a heart sound or a clip here at all. Your
> options are: request it and let a human place it once real media exists, or, if the item
> genuinely turns on the asset, write it as an MCQ instead — a question's `## attachments`
> takes `image`, `audio` and `video`, and is the only student-facing item that does. See
> [05-questions.md](05-questions.md) §Media.
> A `Media:` line inside a `### decision` block is **silently discarded**. The parser
> recognises the label — it does not even fall through into the decision's context — but
> `ClinicalDecisionDraft` has no media field to put it in, so it vanishes without an error.
> Only lab and imaging questions have a `Media:` that goes anywhere.

A case commonly needs an ECG, a radiograph or a photograph at one particular decision.

**`Section:` must name a decision's `###` heading exactly**, or the literal `station`.
Anything else fails with `Media request "…" names "…", which is not a question in this item`.

```markdown
## media_recommendations
### image · Immediate action
Brief: 12-lead ECG showing 2 mm ST elevation in leads II, III and aVF with reciprocal
change in aVL
Kind: graph
Purpose: The decision asks what to do first, and the answer changes if the ECG shows ST
elevation. Describing the ECG in the case text would give the decision away.
Priority: required
Status: needed
Source direction: openly licensed ECG teaching library
Rights: must be CC-BY or public domain
```

One case may request several assets — one per decision that needs one. Write one `###`
block each. Full syntax in [00-START-HERE.md](00-START-HERE.md) §6.

---

## Worked example

```markdown
# Item

## id
PRC-CVS-CASE-001

## title
Acute central chest pain in a 54-year-old builder

## subject
cvs

## type
Clinical case

## status
Draft

## owner
Dr. Omar

## duration
12

## marks
3

## difficulty
Moderate

## decisions
### Immediate action
Concept: CON-CVS-7C9D59D257AC65
Difficulty: Moderate
Mr Rossi is 54, sweating, and describes central chest pressure that began two hours ago
while carrying shopping upstairs. His blood pressure is 138/84, pulse 96 and regular, and
he is not short of breath at rest.
Q: What is your first step?
*= Give aspirin 300 mg and arrange a 12-lead ECG within ten minutes
Why: Both are time-critical and neither waits on a confirmed diagnosis. The ECG decides
whether this is a STEMI needing immediate reperfusion, and aspirin is given on suspicion.
* Wait for the troponin result before doing anything
Why: Picked by students who treat troponin as the diagnostic gate. A first troponin can be
normal within two hours of symptom onset, and waiting for it delays reperfusion in exactly
the patient who cannot afford the delay.
* Send home with analgesia and GP follow-up
Why: Picked by students reassured by a normal blood pressure and a regular pulse. Neither
excludes an acute coronary syndrome.
* Arrange an urgent outpatient exercise test
Why: Picked by students recognising cardiac risk but pattern-matching to stable angina. An
exercise test during ongoing chest pain is contraindicated.
Rationale: Aspirin and an early ECG are the two time-critical steps in suspected ACS. Both
happen before any result is back, because the cost of waiting is myocardium.

### Reading the ECG
Concept: CON-CVS-AE28ABD8CE2B0B
Difficulty: Moderate
The ECG shows 2 mm ST elevation in leads II, III and aVF, with reciprocal ST depression in
aVL. The first troponin, taken on arrival, is within the normal range.
Q: How do you interpret this combination?
*= Inferior STEMI — the normal troponin does not change the diagnosis or the plan
Why: ST elevation in the inferior leads with reciprocal change is diagnostic on its own.
Troponin rises over hours, so a normal value two hours from onset is expected and carries
no reassurance.
* Non-cardiac chest pain, because the troponin is normal
Why: Picked by students who rank a blood test above an ECG. This is the single most
dangerous inversion in the case: the ECG is the time-critical test and the troponin is not.
* Unstable angina, because there is no troponin rise
Why: Picked by students who remember that unstable angina is troponin-negative but forget
that it is also, by definition, without ST elevation.
* Pericarditis, because of the ST elevation
Why: Picked by students who associate any ST elevation with pericarditis. Pericarditis
gives widespread saddle-shaped elevation without reciprocal change, not a territory with a
reciprocal lead.
Rationale: An ECG showing ST elevation with reciprocal change is diagnostic of STEMI
regardless of the first troponin. Troponin confirms and quantifies afterwards; it never
gates reperfusion.

### Where the occlusion is
Concept: CON-CVS-AD0D9E76B568F0
Difficulty: Hard
Q: Which artery is most likely occluded?
*= The right coronary artery
Why: Leads II, III and aVF look at the inferior surface, which is supplied by the right
coronary artery in about 85% of people.
* The left anterior descending artery
Why: Picked by students who default to the commonest culprit overall. The LAD supplies the
anterior wall, which is V1 to V4 — a different territory entirely.
* The left circumflex artery
Why: Picked by students who know the circumflex can supply the inferior wall in
left-dominant circulation. It can, but that is the minority, and the question asks what is
most likely.
* The left main stem
Why: Picked by students who equate severity with proximality. A left main occlusion
presents with widespread changes and cardiogenic shock, not an isolated inferior territory.
Rationale: Lead groups map to territories, and territories map to arteries. Inferior
leads II, III and aVF point to the right coronary artery in most people.

## debrief
This case rewards acting on suspicion rather than waiting for confirmation. The decision
that separates a safe candidate from an unsafe one is the second: a normal first troponin
alongside diagnostic ST elevation. Troponin is a rule-out test only when repeated at the
right interval, and it never overrides an ECG. Students who chose to wait were not being
careless — they were applying a rule they had learned without its timing caveat, which is
exactly the kind of error worth meeting in a case rather than on a ward.

## main_concept
CON-CVS-7C9D59D257AC65

## concept_ids
CON-CVS-AE28ABD8CE2B0B | CON-CVS-AD0D9E76B568F0

## contextual_concept_ids

## learning_objective
Manage suspected acute coronary syndrome from first contact: give aspirin and obtain an
early ECG on suspicion, interpret ST elevation with reciprocal change independently of the
first troponin, and localise the culprit artery from the affected lead group.

## references
Kasr Alainy, ANATOMY CARDIOVASCULAR SYSTEM — coronary arterial supply and territories.

## media_recommendations
### image · Reading the ECG
Brief: 12-lead ECG showing 2 mm ST elevation in leads II, III and aVF with reciprocal ST
depression in aVL
Kind: graph
Purpose: The decision asks the student to interpret the ECG. Describing the findings in the
case text gives the answer away, so the trace has to be shown.
Priority: required
Status: needed
Source direction: openly licensed ECG teaching library
Rights: must be CC-BY or public domain

### diagram · Where the occlusion is
Brief: Coronary artery territories mapped onto the 12 ECG leads
Kind: anatomy plate
Purpose: The third decision is a mapping task. Students who picked the LAD need to see the
lead-to-territory map to correct the error, not just be told it.
Priority: strongly helpful
Status: needed
```

Three decisions, each with exactly one `*=`, every option carrying a `Why:` that names a
specific student. `marks` is 3, matching the decision count.

---

## Before you hand off

```bash
npm run medical:batch -- "docs/import-ready/practical/<your-file>.md"
npm run medical:simulate -- "docs/import-ready/practical/"*.md --emit /tmp/sim-$SCOPE.json
npm run medical:audit -- --source /tmp/sim-$SCOPE.json
```

- [ ] `type` is exactly `Clinical case`
- [ ] `questions` in the validator output equals the number of decisions I wrote
- [ ] Every decision has **exactly one** `*=` line
- [ ] Every option has a `Why:`, including the correct one
- [ ] Every distractor's `Why:` names the specific misconception that picks it
- [ ] Every decision changes what the student faces next
- [ ] `Concept:`, `Also:` and `Difficulty:` each sit on their own line
- [ ] Every decision names the one concept it teaches
- [ ] `debrief` is written, and says what the case was really about
- [ ] Every `Section:` in a media request matches a `###` decision heading exactly
- [ ] `marks` equals the decision count

### The failures specific to clinical cases

| Symptom | Cause |
|---|---|
| `Clinical case needs at least one decision with a "Q:" line and "*" options` | `decisions` missing or malformed |
| `Decision N (…) has no correct option marked with "*="` | You wrote `*` where you meant `*=` |
| `Decision N (…) marks N options with "*=" — exactly one must be correct` | Two correct options |
| `… has N option(s) with no "Why:" line explaining the choice` | A missing `Why:` — including on the correct option |
| `Media request "…" names "…", which is not a question in this item` | `Section:` does not match a `###` heading |
| A difficulty came out as `"Moderate He tells you…"` | `Difficulty:` was not on its own line |
| The case text vanished | It was on the same line as a labelled field |
