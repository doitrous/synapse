# 10 · Imaging interpretation

> You must have read [00-START-HERE.md](00-START-HERE.md) before using this file.

An **imaging interpretation set** shows the student a radiograph, CT, echo or ultrasound
and asks them to read it. Each question presents an image, asks one thing, and explains
every option.

| | |
|---|---|
| **Imports at** | Admin › Bulk import → **practical** (`/admin/import/practical`) |
| **Goes in** | `docs/import-ready/practical/` |
| **`type` value** | `Imaging interpretation` |
| **`lab_subtype`** | `Imaging` |
| **Recognised by** | `type` plus `lab_questions` |
| **Required blocks** | `lab_questions` — at least one, each with exactly one correct option |
| **Columns you should use** | **17** of the 25 |

---

## The one thing that makes this format different

**An imaging question without an image is not a question.**

Lab interpretation degrades gracefully — you can print the values as text and the question
still works. Imaging does not. If the student cannot see the film, there is nothing to
interpret, and a question that *describes* the findings in prose has already given away the
answer.

So almost every question you write here will carry a **`Priority: required` media request**,
and the set cannot publish until a human supplies the images. That is expected and correct.
Plan for it: write the request as carefully as you write the question, because the person
sourcing the image has only your brief to work from.

**Never put a placeholder in `Media:`.** That field takes a real, working URL. A made-up one
shows the student a broken image; an empty one is honest. If you do not have the asset, the
`Media:` line is omitted and a request block goes in `media_recommendations`.

### Writing a media brief someone else can act on

A brief is a sourcing instruction, not a description of what you imagined. It needs the
modality, the projection, the finding, and anything that must **not** be in the image.

| Weak | Usable |
|---|---|
| Chest X-ray showing pneumonia | PA chest radiograph showing dense right lower lobe consolidation with air bronchograms and a preserved right heart border. No pleural effusion, no annotations or arrows on the image. |
| An ECG with AF | 12-lead ECG in atrial fibrillation, rate 130–150, showing an irregularly irregular rhythm with absent P waves. No ST changes. Unlabelled. |
| Echo of aortic stenosis | Parasternal long-axis echocardiogram still, showing a calcified trileaflet aortic valve with restricted opening and left ventricular hypertrophy. Include the scale bar; no measurement callipers on screen. |

"Unlabelled" and "no arrows" matter more than authors expect — a teaching image with the
finding already circled cannot be used to test whether the student can find it.

---

## Shared practical fields

| Key | Label | Required | Rule |
|---|---|---|---|
| `type` | Practical format | **yes** | `Imaging interpretation`. Exact string. |
| `lab_subtype` | Lab / Imaging | **yes** in practice | `Imaging`. |
| `title` | Title | **yes** | What the set covers. |
| `subject` | Subject ID | **yes** | Valid live curriculum subject/system ID from `src/data/curriculumCatalog.ts` / `src/data/subjects.ts` — for example `cvs`, `fnd`, `haem`, or `pop`. Do not use legacy `medical`. |
| `id` | Canonical ID | no | Supply to update an existing item. |
| `status` | Status | no | Write `Draft`. |
| `owner` | Owner | no | Author or team responsible for review. |
| `duration` | Duration | no | Expected minutes. |
| `marks` | Marks / decisions | no | Recomputed as the **number of questions**. |
| `difficulty` | Difficulty | no | Whole-item difficulty; each question may set its own. |
| `lab_questions` | Interpretation questions | **yes** | The questions. Syntax below. |
| `module_subject` | Module subject path(s) | — | Where inside each module it sits — `101 ISK > Anatomy > Upper Limb`. One path per line. |
| `main_concept` | Main concept(s) | — | What the set as a whole is **for**. Awards mastery. |
| `concept_ids` | Also assessed | — | Awards mastery. |
| `contextual_concept_ids` | Mentioned only | — | **No mastery.** |
| `learning_objective` | Learning objective | — | What a student who completes the set has demonstrated. |
| `references` | Read around it | — | **Prose list — newlines only.** |
| `media_recommendations` | Media requests | — | See above and below. |

Lab and imaging share one model — `LabAuthoringData` with a `subtype` flag. The only
differences are the flag, the `type` string, and the fact that imaging genuinely needs the
asset.

---

## The prompt

```
You are writing imaging interpretation sets for Synapse, a study platform for
undergraduate medical students in Egypt.

Read, in this order:
1. Instruction Manual for Content Creation/00-START-HERE.md
2. Instruction Manual for Content Creation/10-imaging-interpretation.md

Produce ONLY practical records with type "Imaging interpretation" and lab_subtype
"Imaging", in the importer markdown format defined in that manual, with no commentary
before or after.

Non-negotiable:
- The micro-syntax is parsed literally. Each question starts "### Stem", then "Concept:" and
  "Difficulty:" (both REQUIRED by the validator), optionally "Also:" and "Media:", then the clinical context as prose, then
  "Q: question", options as "* option" with the correct one as "*= option", each followed
  by "Why: …", then "Explanation: …".
- EVERY question needs exactly one "*=" line, and EVERY option needs a "Why:".
- NEVER put a placeholder in "Media:". It takes a real working URL or nothing. Every
  image you do not have is a media request with Priority: required.
- The clinical context must NOT describe the findings you are asking the student to
  identify. Give the history, not the report.
- Each media brief must name the modality, the projection, the finding, and what must NOT
  be in the image — especially arrows, labels and callipers.
- Each distractor must catch a specific, nameable misreading, named in its "Why:".
- Never invent a finding you cannot source.
- British spelling. status: Draft.

Validate with `npm run medical:batch`. Confirm `questions` equals the number you wrote.
```

---

## The question block

Identical to lab interpretation.

| Line | Rule |
|---|---|
| `### Stem` | Opens a question. The heading is the stem title. |
| unlabelled prose | The **clinical context** for that question. Give the history, not the report. |
| `Q:` | The **main question**. |
| `* option` | An option. Two to six per question. |
| `*= option` | The **correct** option. **Exactly one per question.** |
| `Why:` | Attaches to the option **above it**. Required on every option. |
| `Explanation:` | The overall explanation for the question. |
| `Concept:` | The ONE concept this question teaches. |
| `Also:` | Concepts it also assesses, `\|`-separated. |
| `Difficulty:` | This question's intended difficulty. |
| `Media:` | A **real** image URL. Omit unless you have one. |

> **`Media:` is image-only, whatever the admin form says.** The student runner renders it
> through `ZoomableImage` — an `<img>` — so an audio or video URL produces a broken image,
> silently. The admin field's own placeholder invites "ECG, X-ray, CT, waveform, **or audio
> URL**", and the last of those does not work.
>
> **There is nowhere in a practical to attach a heart sound, a murmur or a breath sound.**
> If you need one, write it as an MCQ instead — a question's `## attachments` takes `audio`
> and `video` blocks, and is the only student-facing item that does. See
> [05-questions.md](05-questions.md) §Media.

`Concept:`, `Also:`, `Difficulty:` and `Media:` are **scalar labels** — each on its own
line, then the parser reverts to context.

> Interpretation questions end with `Explanation:`. Clinical cases end with `Rationale:`.
> Using the wrong one loses the field silently.

### The context must not give the answer away

This is the trap specific to imaging. Compare:

```
✗  A 68-year-old smoker with a three-week cough. The chest radiograph shows a 3 cm
   spiculated mass in the right upper lobe with hilar lymphadenopathy.
   Q: What is the most likely diagnosis?
```

The student never looks at the image; they answer from the sentence. Instead:

```
✓  A 68-year-old smoker presents with a three-week cough and 6 kg of weight loss.
   Q: What does the chest radiograph show, and what is the most likely diagnosis?
```

Give the history that a clinician would have before looking at the film. The findings are
what you are testing.

### Building a set that escalates

Order the questions so they walk the student up:

1. **Identify** — what modality and projection is this, and is it adequate?
2. **Describe** — what is abnormal, in radiological language?
3. **Interpret** — what does that abnormality mean?
4. **Act** — what would you do next?

A set that asks "what is the diagnosis" four times tests pattern recognition. A set that
walks these four steps teaches a system the student can apply to a film they have never seen.

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


## Media requests

`Section:` must match a `###` question heading **exactly**, or be the literal `station`.
Anything else fails with
`Media request "…" names "…", which is not a question in this item`.

```markdown
## media_recommendations
### imaging example · Cough and weight loss in a smoker
Brief: PA chest radiograph showing a 3 cm spiculated mass in the right upper zone with
ipsilateral hilar lymphadenopathy. Adequate inspiration and no rotation. Unlabelled — no
arrows, circles or annotations, because the question asks the student to find the lesion.
Kind: imaging example
Purpose: The question asks what the film shows. Describing it in the stem would answer the
question, so the radiograph is the question.
Priority: required
Status: needed
Source direction: openly licensed radiology teaching collection, e.g. a case repository
with CC-BY images
Rights: must be CC-BY or public domain, and must be de-identified
```

Note `must be de-identified` — imaging carries patient identifiers in a way a diagram does
not. Say it every time.

Full syntax in [00-START-HERE.md](00-START-HERE.md) §6.

---

## Worked example

```markdown
# Item

## id
PRC-CVS-IMAGING-001

## title
Reading the chest radiograph in heart failure

## subject
cvs

## type
Imaging interpretation

## lab_subtype
Imaging

## status
Draft

## owner
Dr. Omar

## duration
10

## marks
3

## difficulty
Moderate

## lab_questions
### Adequacy before interpretation
Concept: CON-CVS-AD0D9E76B568F0
Difficulty: Easy
A 71-year-old is admitted overnight with breathlessness. A chest radiograph is taken on the
ward with a portable machine.
Q: Before interpreting the film, what limitation of this radiograph most affects how you
read the heart size?
*= It is an AP projection, which magnifies the cardiac silhouette
Why: In an AP film the heart sits further from the detector, so it projects larger. The
cardiothoracic ratio cannot be assessed reliably, and calling cardiomegaly on a portable AP
film is a standard error.
* It is underexposed, so the lung fields cannot be assessed
Why: Picked by students who reach for exposure whenever a film looks unusual. Exposure
affects lung detail, not the geometry of the cardiac silhouette.
* The patient is rotated, so the mediastinum is displaced
Why: Picked by students who know rotation matters but not what it does. Rotation shifts the
mediastinum and alters apparent hilar position; it is not the dominant effect on heart size.
* Nothing — a portable film is read the same way as a departmental one
Why: Picked by students who have not been taught to check the projection first. This is the
habit the question exists to build.
Explanation: Check adequacy before you interpret anything: projection, rotation, inspiration
and exposure. Projection comes first here because an AP film magnifies the heart, so the
single most commonly reported abnormality — cardiomegaly — is the one you cannot call.

### What the lung fields show
Concept: CON-CVS-AE28ABD8CE2B0B
Difficulty: Moderate
The same patient. Oxygen saturation is 88% on air and the jugular venous pressure is raised.
Q: What does the radiograph show in the lung fields?
*= Upper lobe venous diversion with septal lines and small bilateral effusions
Why: These are the radiographic features of raised pulmonary venous pressure, in the order
they appear as it rises: diversion first, then interstitial oedema as septal lines, then
alveolar oedema and effusions.
* Bilateral lower zone consolidation with air bronchograms
Why: Picked by students who read any bilateral lower-zone opacity as infection. Air
bronchograms and a focal distribution point to consolidation; the pattern here is
interstitial and gravity-dependent.
* A large left pneumothorax
Why: Picked by students who mistake a skin fold or the edge of the scapula for a pleural
line. A pneumothorax has no lung markings beyond the line.
* Normal lung fields for the patient's age
Why: Picked by students who cannot yet see septal lines, which are subtle. The saturation
of 88% and raised JVP should already have raised the expectation of finding something.
Explanation: Raised pulmonary venous pressure shows on a film in a predictable sequence:
upper lobe venous diversion, then interstitial oedema as Kerley B septal lines at the
costophrenic angles, then alveolar oedema and pleural effusions. Reading them in that order
lets you estimate how high the pressure has climbed.

### What to do with it
Concept: CON-CVS-7C9D59D257AC65
Difficulty: Moderate
Q: The film supports the clinical impression of acute pulmonary oedema. What does this
change about your immediate management?
*= Nothing about the immediate treatment, which is driven by the clinical state — but it
supports the diagnosis and gives a baseline for comparison
Why: Treatment in acute pulmonary oedema starts on the clinical picture: sit the patient up,
give oxygen, and treat congestion. The film confirms and documents; it does not gate.
* It confirms the diagnosis, so treatment can now begin
Why: Picked by students who treat imaging as the diagnostic gate. Waiting for a portable
film before sitting the patient up and giving oxygen delays treatment in a patient who is
hypoxic now.
* It excludes pneumonia, so antibiotics can be stopped
Why: Picked by students who read a radiological pattern as a complete answer. Oedema and
infection coexist often, and a film cannot exclude infection in a breathless elderly patient.
* It shows cardiomegaly, so an echocardiogram is needed before treatment
Why: Picked by students who both call cardiomegaly on an AP film — the error from the first
question — and treat an echo as a prerequisite. Neither holds.
Explanation: Imaging in acute pulmonary oedema confirms, documents and gives a baseline. It
does not decide the immediate treatment, which is clinical. The question closes the loop
with the first: a student who called cardiomegaly on the AP film will find that error waiting
for them here.

## main_concept
CON-CVS-AD0D9E76B568F0

## concept_ids
CON-CVS-AE28ABD8CE2B0B | CON-CVS-7C9D59D257AC65

## contextual_concept_ids

## learning_objective
Assess a chest radiograph for adequacy before interpreting it, recognise the sequence of
radiographic features of raised pulmonary venous pressure, and state what imaging does and
does not change about immediate management in acute pulmonary oedema.

## references
Kasr Alainy, ANATOMY CARDIOVASCULAR SYSTEM — surface anatomy and the cardiac silhouette.

## media_recommendations
### imaging example · Adequacy before interpretation
Brief: Portable AP chest radiograph of an elderly patient, adequate inspiration, no
rotation, with a visibly enlarged cardiac silhouette that is a projection artefact rather
than true cardiomegaly. Unlabelled — no arrows, annotations or markers other than the
standard AP/portable marker.
Kind: imaging example
Purpose: The question asks the student to identify the projection and its effect on heart
size. Stating the projection in the stem would answer the question.
Priority: required
Status: needed
Source direction: openly licensed radiology teaching collection with CC-BY images
Rights: must be CC-BY or public domain, and must be de-identified

### imaging example · What the lung fields show
Brief: The same portable AP chest radiograph, showing upper lobe venous diversion, Kerley B
septal lines at both costophrenic angles, and small bilateral pleural effusions. Unlabelled
— the septal lines must NOT be arrowed, because finding them is the task.
Kind: imaging example
Purpose: The question asks what the lung fields show. Every feature named in the correct
answer has to be visible and unmarked for the question to discriminate.
Priority: required
Status: needed
Source direction: openly licensed radiology teaching collection with CC-BY images
Rights: must be CC-BY or public domain, and must be de-identified

### diagram · What the lung fields show
Brief: Schematic of the radiographic sequence of raised pulmonary venous pressure — upper
lobe diversion, then interstitial oedema, then alveolar oedema and effusions — against
rising wedge pressure
Kind: diagram
Purpose: The explanation gives a sequence. A student who missed the septal lines needs to
see where they sit in that progression, which prose can list but not show.
Priority: strongly helpful
Status: needed
Source direction: openly licensed cardiology or radiology text
Rights: must be CC-BY or public domain
```

Three questions escalating from adequacy to description to action, four media requests
across them, no `Media:` line anywhere because none of the assets exist yet.

---

## Before you hand off

```bash
npm run medical:batch -- "docs/import-ready/practical/<your-file>.md"
npm run medical:simulate -- "docs/import-ready/practical/"*.md --emit /tmp/sim-$SCOPE.json
npm run medical:audit -- --source /tmp/sim-$SCOPE.json
```

- [ ] `type` is `Imaging interpretation` and `lab_subtype` is `Imaging`
- [ ] `questions` in the validator output equals the number I wrote
- [ ] Every question has **exactly one** `*=` line
- [ ] Every option has a `Why:`, including the correct one
- [ ] **No `Media:` line contains a placeholder** — real URL or nothing
- [ ] Every image I do not have is a request with `Priority: required`
- [ ] Every brief names modality, projection, finding, and what must **not** be in the image
- [ ] Every brief says the image must be de-identified
- [ ] No clinical context describes the findings the question asks for
- [ ] Each question ends with `Explanation:`, not `Rationale:`
- [ ] `Concept:`, `Also:`, `Difficulty:` and `Media:` each sit on their own line
- [ ] Every `Section:` matches a `###` heading exactly, or is `station`
- [ ] `mediaNeeded` in the validator output lists what I expected

### The failures specific to imaging interpretation

| Symptom | Cause |
|---|---|
| `Interpretation set needs at least one question with a "Q:" line and "*" options` | `lab_questions` missing or malformed |
| `Interpretation question N … has no correct option marked with "*="` | You wrote `*` where you meant `*=` |
| `… marks N options with "*=" — exactly one must be correct` | Two correct options |
| `… has N option(s) with no "Why:" line` | A missing `Why:` |
| A student sees a broken image | A `Media:` line held a placeholder |
| The question is answerable without the image | The context describes the findings |
| The image arrives with the finding arrowed | The brief did not say "unlabelled" |
| `Media request "…" names "…", which is not a question in this item` | `Section:` does not match a `###` heading |
| The overall explanation is empty | You wrote `Rationale:` instead of `Explanation:` |
