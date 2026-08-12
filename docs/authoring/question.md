# Template · Question creation

A question tests **one concept**, decisively. Everything else in the record —
tags, weights, scoping — exists so the app can put that question in front of the
right student at the right time.

Source of truth: `src/data/bulkImport.ts:IMPORT_SCHEMAS.question`,
`src/data/contentControl.ts:QuestionTags` and `QuestionAuthoringData`.

---

## Prompt

```
You are writing multiple-choice questions for Synapse, a study platform for
undergraduate medical students in Egypt.

Read docs/authoring/README.md first, then this file.

Produce question records in the importer markdown format shown in the "Skeleton"
section below, separated by `---`, and nothing else.

Before writing each question, name the ONE concept it tests. If you cannot name
it, or the concept has no article covering it, do not write the question.

Structure:
- `vignette` is the clinical or academic context. `question` is the actual
  question. Keep them in separate fields — the app shows them separately.
- Write 4-5 options. Every option gets an explanation, including the correct one.
- Distractors must be plausible to a student who has a specific, nameable
  misconception. "Obviously wrong" options test nothing. Write down which
  misconception each distractor catches, in that option's explanation.
- The correct answer must be defensible from a qualified source, and unarguably
  better than every other option. If two options are defensible, rewrite.

Do not:
- Use "All of the above", "None of the above", or "Both A and C".
- Write negative stems ("Which is NOT...") unless the clinical task genuinely is
  exclusion.
- Make the correct answer the longest or most qualified option.
- Cue the answer with grammatical agreement in the stem.
- Test recall of a number that a clinician would look up.
- State a dose, treatment, or emergency action you cannot cite.

Scoring fields (difficulty, relevance, weights) are ESTIMATES. Set them honestly;
do not inflate them to make a question look important.

British spelling. Set status to Draft.
```

---

## Fields

### Required

| Field key | Source of truth | Rule |
|---|---|---|
| `title` | `ManagedContentItem.title` | Short label for admin lists. Falls back to `question` if omitted. |
| `subject` | `ManagedContentItem.subjectId` | One of the eight subject IDs. |
| `question` | importer `question` | The actual question, kept separate from its context. |
| `correct_answer` | `questionData.correctAnswer` | A single letter, `A`–`F`. The matching `answer_*` must have text. |
| `answer_a` … `answer_f` | `questionData.answers[].text` | Options. Blank ones are dropped — 4–5 is the usual range. |

### The teaching content

| Field key | Source of truth | Rule |
|---|---|---|
| `vignette` | `fields.Vignette` | The clinical or academic context. Every detail should matter; cut anything decorative. |
| `explanation_a` … `explanation_f` | `questionData.answers[].explanation` | Why each option is right or wrong. For a distractor, name the misconception it catches. |
| `learning_objective` | `questionData.learningObjective` | What a correct response demonstrates. |
| `source_citation` | `questionData.sourceCitation` | Guideline, book, or paper supporting the key. |

### Concept tagging — this drives mastery tracking

| Field key | Source of truth | Rule |
|---|---|---|
| `main_concept` | `tags.mainConceptIds` | The concept(s) this question **primarily** tests. Usually exactly one. Mastery evidence goes here. |
| `concept_ids` | `tags.conceptIds` | Concepts the question also assesses. |
| `contextual_concept_ids` | `tags.contextualConceptIds` | Concepts the question *mentions* but does not assess. **These receive no mastery evidence** — use this for anything the vignette needs but is not testing. |
| `library_ids` | `questionData.libraryIds` | Articles that teach the answer. |
| `resource_ids` | `questionData.resourceIds` | Resources that teach it. |

Getting `main_concept` vs `contextual_concept_ids` wrong is the most damaging
error in this template: it silently corrupts a student's mastery profile.

### Difficulty — two different things

| Field key | Source of truth | Rule |
|---|---|---|
| `difficulty` | `tags.intendedDifficulty` | What you *intended*: `Easy`, `Moderate`, `Hard`. |
| `inferred_difficulty` | `tags.inferredDifficulty` | Estimated **percent who answer correctly**, 0–100. Higher = easier. |
| `cognitive_effort` | `tags.cognitiveEffort` | `Low`, `Medium`, `High`. |
| `cognitive_effort_score` | `tags.cognitiveEffortScore` | Finer 0–1 version of the same. |
| `reasoning_level` | `tags.clinicalReasoningLevel` | 0–5. 0 = pure recall, 5 = multi-step reasoning under uncertainty. |

### Relevance and blueprint weight

| Field key | Source of truth | Rule |
|---|---|---|
| `question_type` | `tags.questionType` | What it tests: Pathophysiology, Diagnosis, Investigation, Treatment, Mechanism. |
| `setting` | `tags.setting` | `Academic`, `Clinical`, or `Both`. |
| `clinical_relevance` | `tags.clinicalRelevance` | 0–1. |
| `academic_relevance` | `tags.academicRelevance` | 0–1. |
| `exam_relevance` | `tags.examRelevance` | 0–10 blueprint relevance. |
| `exam_weight_by_year` | `tags.examWeightByYear` | `OMS_Y2=0.7 \| OMS_Y3=0.5`. Each 0–1. |

### Scoping

| Field key | Source of truth | Rule |
|---|---|---|
| `topic`, `subtopic` | `tags.topic`, `tags.subtopic` | Curriculum location. |
| `module` | `tags.moduleIds` | Every module this applies to. |
| `years`, `universities` | `tags.years`, `tags.universityIds` | Where it applies. |
| `question_only_for` | `tags.questionOnlyFor` | **Restrictive.** If set, the question applies ONLY to these year/university IDs, overriding subject scope. Use sparingly. |

### Identity, attachments and behaviour

| Field key | Source of truth | Rule |
|---|---|---|
| `id` | `ManagedContentItem.id` | Existing canonical ID to update. Omit to create. |
| `owner` | `ManagedContentItem.owner` | Author or team responsible for review. |
| `attachments` | `questionData.attachments` | One `### image\|audio\|video · URL` block per item, then `Name:` and optionally `Mime:`. |
| `attached_image` | `questionData.attachedImage` | A single image URL shown with the stem. |
| `author_notes` | `questionData.authorNotes` | Internal notes. Never shown to a student. |
| `estimated_seconds` | `questionData.estimatedSeconds` | How long the item should take. Defaults to 90. |
| `randomise_answers` | `questionData.randomiseAnswers` | `yes` or `no`. Defaults to yes. |

## Writing a distractor that works

A distractor earns its place by catching a **specific, nameable** error.

| Weak distractor | Why it fails | Strong replacement |
|---|---|---|
| An unrelated drug class | No student would pick it | The drug a student picks if they confuse the mechanism |
| A condition from another system | Not in the differential | The condition that shares the presenting feature |
| The right answer, worded worse | Two defensible options | A genuinely different management step |

Then say so in the explanation: *"This is chosen by students who remember that
beta-blockers reduce mortality but assume the benefit comes from increased
contractility."*

## Skeleton

```markdown
# Item

## title
<Short admin label>

## subject
<cvs | resp | renal | gi | neuro | endo | msk | pharm>

## status
Draft

## vignette
<Clinical or academic context. Every detail must matter.>

## question
<The actual question.>

## correct_answer
A

## answer_a
<Correct option>

## explanation_a
<Why this is right, and what principle it demonstrates.>

## answer_b
<Distractor>

## explanation_b
<Why this is wrong, and which specific misconception picks it.>

## answer_c
<Distractor>

## explanation_c
<Why this is wrong, and which specific misconception picks it.>

## answer_d
<Distractor>

## explanation_d
<Why this is wrong, and which specific misconception picks it.>

## main_concept
med.concept.<slug>

## concept_ids
med.concept.<slug>

## contextual_concept_ids
med.concept.<slug>

## library_ids
<article id>

## topic
<Curriculum topic title>

## subtopic
<SUB_*>

## question_type
<Pathophysiology | Diagnosis | Investigation | Treatment | Mechanism>

## difficulty
Moderate

## inferred_difficulty
55

## cognitive_effort
Medium

## reasoning_level
3

## setting
Clinical

## clinical_relevance
0.8

## academic_relevance
0.6

## exam_relevance
7

## exam_weight_by_year
OMS_Y2=0.6 | OMS_Y3=0.4

## years
Year 3

## universities
HU | ASU

## module
<module id>

## learning_objective
<What a correct response demonstrates.>

## source_citation
<Guideline, book, or paper>

---

# Item
...
```

## Reject if

- You cannot name the single concept the question tests.
- The concept it tests has no article covering it.
- More than one option is defensible.
- A distractor exists only to fill a slot — no student with a real misconception
  would choose it.
- Any explanation is missing, including the correct option's.
- The stem grammatically cues the answer, or the correct option is conspicuously
  the longest.
- It uses "All of the above" / "None of the above".
- It tests recall of a number a clinician would look up.
- A concept the question merely mentions is in `main_concept` rather than
  `contextual_concept_ids`.
- It states a dose or treatment you cannot cite.

## Self-check

- [ ] Every `## key` matches a key in `IMPORT_SCHEMAS.question`.
- [ ] `correct_answer` is `A`–`F` and its `answer_*` has text.
- [ ] Every non-empty option has an explanation.
- [ ] `main_concept` holds only what is genuinely assessed; everything mentioned
      but not tested is in `contextual_concept_ids`.
- [ ] Every concept and article ID exists.
- [ ] Weights and difficulty reflect your honest estimate.
- [ ] `status` is `Draft`.
