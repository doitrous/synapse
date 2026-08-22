# 09 · Lab interpretation

> You must have read [00-START-HERE.md](00-START-HERE.md) before using this file.

A **lab interpretation set** gives the student a set of results and asks them to read it.
Each question presents values, asks one thing, and explains every option. It is the format
that turns "knows the reference range" into "knows what this patient has".

| | |
|---|---|
| **Imports at** | Admin › Bulk import → **practical** (`/admin/import/practical`) |
| **Goes in** | `docs/import-ready/practical/` |
| **`type` value** | `Lab interpretation` |
| **`lab_subtype`** | `Lab` |
| **Recognised by** | `type` plus `lab_questions` |
| **Required blocks** | `lab_questions` — at least one, each with exactly one correct option |
| **Columns you should use** | **17** of the 25 |

Lab and imaging interpretation are **the same model** with one flag. See
[10-imaging-interpretation.md](10-imaging-interpretation.md) for the imaging variant; the
micro-syntax below is identical.

---

## There is no structured value model

This surprises people, so it is worth stating plainly. There are **no reference-range
fields, no units fields, and no value tables**. Everything — the analyte, the value, the
unit and the reference range — is free prose in the question's context.

That means the formatting is entirely your responsibility, and it must be consistent across
the set or the student spends their effort parsing your layout instead of reading the
results. Use this shape:

```
Analyte  value unit  (reference range)
```

```markdown
### Arterial blood gas on room air
pH 7.28 (7.35–7.45) · PaCO₂ 3.4 kPa (4.7–6.0) · PaO₂ 11.8 kPa (10.0–13.0)
HCO₃⁻ 12 mmol/L (22–26) · Base excess −13 mmol/L (−2 to +2) · Lactate 4.1 mmol/L (<2.0)
```

- **Always give the reference range.** A student who has not memorised it is being tested on
  recall, not interpretation, and that is a different question.
- Group related analytes on one line, separated by `·`.
- Keep units and significant figures consistent across the whole set.
- Use the units the local laboratory reports in. Where Egyptian practice differs from a
  Western textbook, follow local practice and say so in `references`.

---

## Shared practical fields

| Key | Label | Required | Rule |
|---|---|---|---|
| `type` | Practical format | **yes** | `Lab interpretation`. Exact string. |
| `lab_subtype` | Lab / Imaging | **yes** in practice | `Lab`. |
| `title` | Title | **yes** | What the set covers. |
| `subject` | Subject ID | **yes** | One of the 20 in `src/data/curriculumCatalog.ts` (00 §3) — not just the eight with live concepts. |
| `id` | Canonical ID | no | Supply to update an existing item. |
| `status` | Status | no | Write `Draft`. |
| `owner` | Owner | no | Author or team responsible for review. |
| `duration` | Duration | no | Expected minutes. |
| `marks` | Marks / decisions | no | Recomputed as the **number of questions**. |
| `difficulty` | Difficulty | no | Whole-item difficulty; each question may set its own. |
| `lab_questions` | Interpretation questions | **yes** | The questions. Syntax below. |
| `module_subject` | Module subject path(s) | — | Where inside each module it sits — `101 ISK > Anatomy > Upper Limb`. One path per line. |
| `universities` | University IDs | — | Canonical university IDs, `\|`/`;`/newline separated. **Empty means EVERY university.** |
| `years` | Year IDs | — | Year IDs this set is used in, e.g. `KAU_Y1 \| KAU_Y2`. |
| `module` | Module ID(s) | — | Module ID(s) this set sits under (Kasr `101 ISK`; other universities prefixed, e.g. `AU-MED-102`). |
| `main_concept` | Main concept(s) | — | What the set as a whole is **for**. Awards mastery. |
| `concept_ids` | Also assessed | — | Awards mastery. |
| `contextual_concept_ids` | Mentioned only | — | **No mastery.** |
| `learning_objective` | Learning objective | — | What a student who completes the set has demonstrated. |
| `references` | Read around it | — | **Prose list — newlines only.** |
| `media_recommendations` | Media requests | — | See below. |

---

## Priority of sources

Highest first (00 §A): this department's own practical atlas / lab-interpretation bank /
station sheets, then other official files for the same module, then doctor/student/academy
notes (tier ≤5, never sole source), then a standard textbook only where the corpus has none.
**Another university's set never stands for this university's signal** — reference ranges and
local reporting units differ.

## Media (S6 of the pipeline)

`Media:` inside a question is a real, working URL only. Anything you do not have yet is a
`media_recommendations` request block, **marked as a request, never rewritten into prose**
that describes the missing asset. This is stage S6
([13-orchestration.md](13-orchestration.md) §4).

## Scope: universities and module

A practical set is scoped exactly as a question is: by `universities`, `years` and
`module` — ID lists with the standard rules (`\|`, `;` or newline; leading `+` appends; an
absent column leaves the existing value untouched). The record has always carried
`universityIds`/`yearIds`/`moduleIds` and the Practical editor could set them; until
2026-08-22 the importer had no column to read, so every imported set arrived unscoped. An
empty `universities` list means EVERY university. Scope is separate from concept tagging and
`module_subject`.

## Stages and completeness

Finished per [13-orchestration.md](13-orchestration.md) §4 once `questions` meets this type's
floor, S6 requests are tracked, and `medical:audit` is clean — not at the first green
`medical:batch`.

---

## The prompt

```
You are writing lab interpretation sets for Synapse, a study platform for undergraduate
medical students in Egypt.

Read, in this order:
1. Instruction Manual for Content Creation/00-START-HERE.md
2. Instruction Manual for Content Creation/09-lab-interpretation.md

Produce ONLY practical records with type "Lab interpretation" and lab_subtype "Lab", in
the importer markdown format defined in that manual, with no commentary before or after.

Non-negotiable:
- The micro-syntax is parsed literally. Each question starts "### Stem", then "Concept:" and
  "Difficulty:" (both REQUIRED by the validator), optionally "Also:" and "Media:", then the values as prose, then
  "Q: question", options as "* option" with the correct one as "*= option", each followed
  by "Why: …", then "Explanation: …".
- EVERY question needs exactly one "*=" line.
- EVERY option needs a "Why:" line, including the correct one.
- There is no structured value model. Always give the reference range next to the value,
  as "Analyte value unit (range)". A student who has to recall the range is being tested
  on the wrong thing.
- Keep units and formatting identical across every question in the set.
- Each distractor must catch a specific, nameable misconception, named in its "Why:".
- Never invent a value, a reference range, or a unit you cannot source.
- Media you need is a request block. Never invent a URL.
- British spelling. status: Draft.

Validate with `npm run medical:batch`. Confirm `questions` equals the number you wrote.
```

---

## The question block

```markdown
## lab_questions
### Arterial blood gas in a breathless diabetic
Concept: CON-CVS-7C9D59D257AC65
Also: CON-CVS-AE28ABD8CE2B0B
Difficulty: Moderate
A 24-year-old with type 1 diabetes is admitted vomiting and breathing deeply.
pH 7.18 (7.35–7.45) · PaCO₂ 2.9 kPa (4.7–6.0) · PaO₂ 13.1 kPa (10.0–13.0)
HCO₃⁻ 8 mmol/L (22–26) · Base excess −19 mmol/L (−2 to +2)
Na⁺ 133 mmol/L (135–145) · K⁺ 5.4 mmol/L (3.5–5.0) · Cl⁻ 97 mmol/L (98–107)
Q: How do you describe this acid–base disturbance?
*= A partially compensated high-anion-gap metabolic acidosis
Why: The low pH with a low bicarbonate is a metabolic acidosis; the low PaCO₂ is
respiratory compensation, and it is partial because the pH has not returned to normal. The
anion gap is 33, which is high.
* An uncompensated metabolic acidosis
Why: Picked by students who see the abnormal pH and stop. The PaCO₂ is 2.9, well below the
reference range — compensation is present, it is simply incomplete.
* A respiratory alkalosis
Why: Picked by students reading the low PaCO₂ first and treating it as the primary
disturbance. In a respiratory alkalosis the pH would be high, not 7.18.
* A normal-anion-gap metabolic acidosis
Why: Picked by students who correctly identify the metabolic acidosis but do not calculate
the gap. Na⁺ − (Cl⁻ + HCO₃⁻) = 133 − 105 = 28, which is raised.
Explanation: Read a gas in a fixed order: pH first to name the direction, then the value
that explains it, then the other value to judge compensation, then the anion gap. Here the
pH is acidotic, the bicarbonate explains it, the PaCO₂ shows partial compensation, and the
raised gap points to ketoacidosis.
```

### The rules the parser enforces

| Line | Rule |
|---|---|
| `### Stem` | Opens a question. The heading is the stem title. |
| unlabelled prose | Becomes the **clinical context / investigation values** for that question. |
| `Q:` | The **main question**. |
| `* option` | An option. Two to six per question. |
| `*= option` | The **correct** option. **Exactly one per question.** |
| `Why:` | Attaches to the option **above it**. Required on every option. |
| `Explanation:` | The overall explanation for the question. |
| `Concept:` | The ONE concept this question teaches. |
| `Also:` | Concepts it also assesses, `\|`-separated. |
| `Difficulty:` | This question's intended difficulty. |
| `Media:` | A **real image** URL for this question. Leave it out unless you have one. See the warning below — it is not a general media field. |

> **`Media:` is image-only, whatever the admin form says.** The student runner renders it
> through `ZoomableImage` — an `<img>` — so an audio or video URL produces a broken image,
> silently. The admin field's own placeholder invites "ECG, X-ray, CT, waveform, **or audio
> URL**", and the last of those does not work.
>
> **There is nowhere in a practical to attach a heart sound, a murmur or a breath sound.**
> If you need one, write it as an MCQ instead — a question's `## attachments` takes `audio`
> and `video` blocks, and is the only student-facing item that does. See
> [05-questions.md](05-questions.md) §Media.

`Concept:`, `Also:`, `Difficulty:` and `Media:` are **scalar labels** — each takes its own
line, then the parser reverts to context. Putting a value on the same line as
`Difficulty:` produced `"Moderate He tells you he is thirsty"`, which matched no band and
went silently untagged.

> Note the difference from a clinical case: interpretation questions end with
> `Explanation:`, cases end with `Rationale:`. Using the wrong one loses the field.

### Writing questions that teach interpretation

- **Ask one thing.** "Describe the disturbance" and "what is the cause" are two questions.
- **Distractors should be the readings a real student produces**, not implausible ones. The
  four above are: stopped at the pH, read the wrong value as primary, forgot the gap, and
  got it right.
- **`Explanation:` should give a method, not just the answer.** A student who can follow
  "pH, then the value that explains it, then compensation, then the gap" can read the next
  gas too.
- Build the set so the questions escalate — describe the abnormality, then explain it, then
  act on it.

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

**Per block, and this is the part the importer does not require but the validator
does:** every `###` block needs its own `Concept:` line and its own `Difficulty:`
line. The importer treats both as optional — the validator does not.

| Rule | Error you get |
|---|---|
| each block has `Concept:` | `no "Concept:" line — name the one concept it teaches` |
| that concept exists | `concept X is not a concept that exists` |
| each `Also:` concept exists | `also-assessed concept X is not a concept that exists` |
| each block has `Difficulty:` | `no "Difficulty:" line` |
| each block has its closing line | `no `Explanation:` line` |

## Media

`Media:` inside a question takes a **real URL only**. If the asset does not exist, do not
put a placeholder there — a broken image is shown to the student. File a request instead.

**`Section:` must match a `###` question heading exactly**, or be the literal `station`.

```markdown
## media_recommendations
### comparison table · Arterial blood gas in a breathless diabetic
Brief: Reference ranges for arterial blood gas analytes in both kPa and mmHg, as reported
by Egyptian hospital laboratories
Kind: comparison table
Purpose: The set gives ranges inline, but students revising need one place to check the
unit conversion. Egyptian labs report in kPa while several standard textbooks use mmHg.
Priority: strongly helpful
Status: needed
Source direction: local laboratory handbook
```

Full syntax in [00-START-HERE.md](00-START-HERE.md) §6.

---

## Worked example

```markdown
# Item

## id
PRC-CVS-LAB-001

## title
Reading an arterial blood gas

## subject
cvs

## type
Lab interpretation

## lab_subtype
Lab

## status
Draft

## owner
Dr. Omar

## duration
10

## marks
2

## difficulty
Moderate

## lab_questions
### Arterial blood gas in a breathless diabetic
Concept: CON-CVS-7C9D59D257AC65
Difficulty: Moderate
A 24-year-old with type 1 diabetes is admitted vomiting and breathing deeply.
pH 7.18 (7.35–7.45) · PaCO₂ 2.9 kPa (4.7–6.0) · PaO₂ 13.1 kPa (10.0–13.0)
HCO₃⁻ 8 mmol/L (22–26) · Base excess −19 mmol/L (−2 to +2)
Na⁺ 133 mmol/L (135–145) · K⁺ 5.4 mmol/L (3.5–5.0) · Cl⁻ 97 mmol/L (98–107)
Q: How do you describe this acid–base disturbance?
*= A partially compensated high-anion-gap metabolic acidosis
Why: The low pH with a low bicarbonate is a metabolic acidosis; the low PaCO₂ is
respiratory compensation, and it is partial because the pH has not returned to normal. The
anion gap is 28, which is raised.
* An uncompensated metabolic acidosis
Why: Picked by students who see the abnormal pH and stop reading. The PaCO₂ is 2.9, well
below the reference range — compensation is present, it is simply incomplete.
* A respiratory alkalosis
Why: Picked by students reading the low PaCO₂ first and treating it as the primary
disturbance. In a respiratory alkalosis the pH would be high, not 7.18.
* A normal-anion-gap metabolic acidosis
Why: Picked by students who correctly identify the metabolic acidosis but do not calculate
the gap. Na⁺ − (Cl⁻ + HCO₃⁻) = 133 − 105 = 28, which is raised.
Explanation: Read a gas in a fixed order: pH first to name the direction, then the value
that explains it, then the other value to judge compensation, then the anion gap. Here the
pH is acidotic, the bicarbonate explains it, the PaCO₂ shows partial compensation, and the
raised gap points to ketoacidosis.

### Potassium in the same patient
Concept: CON-CVS-AE28ABD8CE2B0B
Difficulty: Hard
The same patient's potassium is 5.4 mmol/L (3.5–5.0). An insulin infusion is started.
Q: What happens to the potassium over the next few hours, and why?
*= It falls, often steeply, because insulin drives potassium into cells and the total body
store is already depleted
Why: The measured potassium is high because acidosis and insulin deficiency have shifted it
out of cells, but urinary losses mean the total body store is low. Correcting the insulin
deficiency reverses the shift and unmasks the true deficit.
* It stays the same, because the potassium was measured accurately
Why: Picked by students who read a serum value as a whole-body value. Serum potassium
reflects distribution as much as total store.
* It rises further, because acidosis continues to push potassium out of cells
Why: Picked by students who remember the acidosis–potassium shift but not that treatment
reverses it. The insulin infusion is the intervention that changes the direction.
* It falls slowly and predictably, so it needs checking once a day
Why: Picked by students who know the direction but not the pace. This is the dangerous
version of the right answer — the fall can be steep enough to need hourly monitoring.
Explanation: A serum potassium in diabetic ketoacidosis tells you about distribution, not
total store. Insulin moves potassium into cells, so a value at the top of the range before
treatment usually means a substantial whole-body deficit, and the level must be monitored
frequently once the infusion starts.

## main_concept
CON-CVS-7C9D59D257AC65

## concept_ids
CON-CVS-AE28ABD8CE2B0B

## contextual_concept_ids

## learning_objective
Read an arterial blood gas in a fixed order to name the disturbance, judge compensation and
calculate the anion gap, and predict how treatment changes a serum potassium that reflects
distribution rather than total body store.

## references
Kasr Alainy, Experimental PHYSIOLOGY 2nd Year — acid–base balance and compensation.

## media_recommendations
### comparison table · station
Brief: Arterial blood gas reference ranges in both kPa and mmHg, as reported by Egyptian
hospital laboratories
Kind: comparison table
Purpose: The set gives ranges inline, but students revising need one place to check the
unit conversion — Egyptian labs report in kPa while several standard textbooks use mmHg.
Priority: strongly helpful
Status: needed
Source direction: local laboratory handbook
```

Every value carries its reference range, the units are consistent, and each distractor is
a reading a real student produces.

---

## Before you hand off

```bash
npm run medical:batch -- "docs/import-ready/practical/<your-file>.md"
npm run medical:simulate -- "docs/import-ready/practical/"*.md --emit /tmp/sim-$SCOPE.json
npm run medical:audit -- --source /tmp/sim-$SCOPE.json
```

- [ ] `type` is `Lab interpretation` and `lab_subtype` is `Lab`
- [ ] `questions` in the validator output equals the number I wrote
- [ ] Every question has **exactly one** `*=` line
- [ ] Every option has a `Why:`, including the correct one
- [ ] **Every value carries its reference range**
- [ ] Units and formatting are identical across the whole set
- [ ] Each question ends with `Explanation:`, not `Rationale:`
- [ ] `Concept:`, `Also:`, `Difficulty:` and `Media:` each sit on their own line
- [ ] No `Media:` line holds a placeholder URL
- [ ] Every `Section:` in a media request matches a `###` heading or is `station`
- [ ] The difficulty mix is defensible across the batch (00-START-HERE §8)

### The failures specific to interpretation sets

| Symptom | Cause |
|---|---|
| `Interpretation set needs at least one question with a "Q:" line and "*" options` | `lab_questions` missing or malformed |
| `Interpretation question N … has no correct option marked with "*="` | You wrote `*` where you meant `*=` |
| `Interpretation question N … marks N options with "*=" — exactly one must be correct` | Two correct options |
| `… has N option(s) with no "Why:" line` | A missing `Why:` — including on the correct option |
| The overall explanation is empty | You wrote `Rationale:` instead of `Explanation:` |
| A difficulty came out as `"Moderate A 24-year-old…"` | `Difficulty:` was not on its own line |
| A student sees a broken image | A `Media:` line held a placeholder instead of a real URL |
| The values vanished | They were on the same line as a labelled field |
