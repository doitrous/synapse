# 05 · Questions (MCQ)

> You must have read [00-START-HERE.md](00-START-HERE.md) before using this file.

A question tests **one concept**. Everything else about it — the vignette, the distractors,
the explanations — exists to make that test fair and to teach the student something when
they get it wrong.

There are **50 columns**. This manual covers all of them.

| | |
|---|---|
| **Imports at** | Admin › Bulk import → **question** (`/admin/import/question`) |
| **Goes in** | `docs/import-ready/question/` |
| **Recognised by** | `correct_answer` **and** `answer_a` both present |
| **`fieldsUsed` floor** | **46** of 50 — the worked example scores **48** |

The only columns a complete five-option question legitimately omits are `answer_f` and
`explanation_f`. A six-option question uses all 50.

---

## Two rules that decide whether the question is any good

### The three concept buckets

Getting these wrong is the most damaging error in this manual, because it silently corrupts
a student's mastery profile — and nothing errors.

| Field | Label in admin | Meaning | Awards mastery? |
|---|---|---|---|
| `main_concept` | Main concept(s) · what this question primarily tests | What the question is **for** | **yes** |
| `concept_ids` | Related concepts · mastery evidence | What it also genuinely assesses on the way | **yes** |
| `contextual_concept_ids` | Contextual concepts · no mastery evidence | What the scenario needs but never tests | **no** |

A question set in a patient with COPD that tests the jugular venous pulse tags **JVP** as
`main_concept` and **COPD** as `contextual_concept_ids`. Put COPD in `main_concept` and the
platform records that the student has demonstrated understanding of COPD, which they have
not.

The student projection drops `contextual_concept_ids` entirely — that is the whole point of
the third bucket.

**A question may only test a concept that at least one article covers.** If no article
teaches it, write the article first, or do not write the question.

### There is no import column for the overall worked explanation

`fields.Explanation` — the worked explanation a student reads after answering — is
**silently taken from the correct answer's explanation**. There is no `explanation` column
that sets it independently.

So `explanation_<correct letter>` must carry the full reasoning: why the right answer is
right, the mechanism behind it, and the thing worth remembering. It is doing two jobs.
Write it as the teaching moment, not as a one-line justification.

---

## The prompt

```
You are writing MCQs for Synapse, a study platform for undergraduate medical students in
Egypt.

Read, in this order:
1. Instruction Manual for Content Creation/00-START-HERE.md
2. Instruction Manual for Content Creation/05-questions.md

Produce ONLY question records in the importer markdown format defined in that manual,
with no commentary before or after.

Non-negotiable:
- Name the ONE concept the question tests in main_concept. If you cannot name it, or no
  article covers it, do not write the question.
- Concepts the vignette needs but does not test go in contextual_concept_ids. Putting
  them in main_concept corrupts the student's mastery profile.
- EVERY option gets an explanation, including the correct one. Each wrong option's
  explanation must name the specific misconception that picks it.
- The correct answer's explanation is also the overall worked explanation — there is no
  separate column for it. Write it as the full teaching moment.
- Never invent a fact, a dose, a citation, a URL, or an ID. Images you need are media
  request blocks.
- British spelling. status: Draft.

Validate with `npm run medical:batch` and report fieldsUsed. It must be 46 or more.
```

---

## Fields · the question itself

| Key | Label | Required | Rule |
|---|---|---|---|
| `title` | Question | **yes** | Confusingly, `title` **is the stem** — the main question. `question` overrides it. Write both; keep them identical. |
| `question` | Question | **yes** | The main question, kept separate from its context. |
| `vignette` | Question context / vignette | no | Clinical or academic context shown **before** the question. Keep the scenario here and the actual ask in `question`. |
| `correct_answer` | Correct answer | **yes** | A single letter, `A`–`F`. |
| `answer_a` … `answer_f` | Answer A–F | ≥2 | Option text. A–B are required slots; C–F optional. Blank ones are omitted. |
| `explanation_a` … `explanation_f` | Explanation A–F | **write all of them** | Why that option is correct or incorrect. |
| `attached_image` | Attached image | no | A single image URL shown with the stem. **Only a real URL.** If you need one, file a media request. |
| `attachments` | Attachments | no | `### image\|audio\|video · URL` blocks, then `Name:` and optionally `Mime:`. Real assets only. |
| `id` | Canonical ID | no | Supply to update an existing question. |
| `subject` | Subject ID | **yes** | One of the eight. |
| `status` | Status | no | Write `Draft`. |
| `owner` | Owner | no | Defaults to `Import queue`. Set it to a real owner. |

### Writing options that teach

- **Every option needs an explanation, including the correct one.**
- **Each distractor must catch a specific, nameable misconception**, and its explanation
  must say which one. "This is wrong" teaches nothing. "This picks the answer of a student
  who is reading end-diastolic *pressure* as end-diastolic *volume*, forgetting compliance
  sits between them" teaches the thing the question exists for.
- Options should be similar in length and grammatical form. A conspicuously long correct
  answer is a giveaway that tests test-craft, not medicine.
- `randomise_answers` defaults to `yes`, and the key follows its answer through the shuffle
   — so never write "both A and C" or "none of the above".

---

## Fields · tagging and blueprint

| Key | Label | Values | Default |
|---|---|---|---|
| `main_concept` | Main concept(s) | Concept IDs. **At least one is expected.** | — |
| `concept_ids` | Concept IDs | Also-assessed concepts | `[]` |
| `contextual_concept_ids` | Contextual concept IDs | Needed by the scenario, never assessed | `[]` |
| `topic` | Topic | Canonical topic or blueprint heading | `''` |
| `subtopic` | Subtopic | More specific curriculum location | `''` |
| `difficulty` | Intended difficulty | `Easy` · `Moderate` · `Hard` · `Challenging` | `Moderate` |
| `question_type` | Question type | `Pathophysiology` · `Diagnosis` · `Investigation` · `Treatment` · `Management` · `Mechanism` · `Classification` · `Pharmacology` · `Anatomy` · `Other` | `''` |
| `cognitive_effort` | Cognitive effort | `Low` · `Medium` · `High` | `Medium` |
| `cognitive_effort_score` | Cognitive effort (0–1) | Finer-grained than the band above | `0.5` |
| `setting` | Academic / clinical | `Academic` · `Clinical` · `Both` | `Both` |
| `reasoning_level` | Clinical reasoning level | Integer 0–5 | `2` |
| `inferred_difficulty` | Psychometric difficulty | Integer 0–100. **Estimated percent correct — higher means easier.** | `50` |
| `exam_relevance` | Exam relevance | Integer 0–10 | `5` |
| `clinical_relevance` | Clinical relevance | 0–1 | `0.5` |
| `academic_relevance` | Academic relevance | 0–1 | `0.5` |
| `exam_weight_by_year` | Exam weight by year | `OMS_Y2=0.7 \| OMS_Y3=0.5` | `{}` |
| `years` | Relevant years | Year IDs | `[]` |
| `universities` | Relevant universities | University IDs | `[]` |
| `module` | Module ID(s) | Every module this applies to | `[]` |
| `question_only_for` | Restrict to years/universities | If set, the question applies **only** to these, regardless of subject scope | `[]` |

`difficulty` and `inferred_difficulty` are different axes and both matter. `difficulty` is
what you intended; `inferred_difficulty` is how many students you expect to get it right.
`Hard` and `Challenging` both mean "expect most to miss this" — `Hard` is a concept a strong
student gets right, `Challenging` needs several steps held at once.

## Fields · evidence and editorial

| Key | Rule |
|---|---|
| `library_ids` | Related article IDs. **The article that teaches the tested concept belongs here.** |
| `resource_ids` | Canonical resource IDs. |
| `learning_objective` | What a correct response demonstrates. Held back from the student until the answer is revealed. |
| `source_citation` | Guideline, book, paper, or source URL. |
| `author_notes` | Internal. Never shown to a student. |
| `estimated_seconds` | How long it should take. Defaults 90, clamped 5–3600. |
| `randomise_answers` | `yes` / `no`. Defaults `yes`. |
| `media_recommendations` | Assets this question still needs. See below. |

---

## Media

A question commonly needs an image it does not have — an ECG, a radiograph, a histology
field. **Never invent a URL and never write "see the ECG below" when there is no ECG.**

One question can need media in more than one place: the stem, and one or more options.
Write one `###` block per asset and use `Section:` to say where it belongs.

```markdown
## media_recommendations
### image · Question stem
Brief: 12-lead ECG showing 2 mm ST elevation in leads II, III and aVF with reciprocal
change in aVL
Purpose: The question asks the candidate to localise the infarct. Naming the territory in
prose would give the answer away, so the ECG has to be shown.
Priority: required
Status: needed
Source direction: openly licensed ECG teaching library
Rights: must be CC-BY or public domain

### diagram · Explanation for option C
Brief: Coronary artery territories mapped onto the 12 leads
Purpose: Option C is picked by students who confuse the inferior and lateral territories.
The explanation needs the map to correct that, not just to assert it.
Priority: strongly helpful
Status: needed
```

`Priority: required` means the question cannot publish without it. Use it when the question
is unanswerable without the asset — which, for an ECG-reading question, it is.

Full block syntax in [00-START-HERE.md](00-START-HERE.md) §6.

---

## Worked example

This one validates clean — it tests `CON-CVS-7C9D59D257AC65` and cites
`ART-CVS-HEART-ORIENTATION`, both of which are live.

```markdown
# Item

## id
QST-CVS-PERICARDIUM-001

## title
How many layers enclose the heart, and what are they?

## question
How many layers enclose the heart, and what are they?

## subject
cvs

## status
Draft

## owner
Dr. Omar

## vignette
A second-year student is asked to describe the coverings of the heart during a cadaveric
demonstration. They correctly identify a tough outer sac, a smooth membrane lining its
inner surface, and a glistening layer adherent to the myocardium itself, which the
demonstrator refers to as the epicardium.

## correct_answer
C

## answer_a
Three: fibrous pericardium, serous pericardium, and epicardium

## explanation_a
Incorrect, and this is the misconception the question exists to catch. It counts the
epicardium as a layer separate from the serous pericardium. The epicardium *is* the
visceral sheet of the serous pericardium — one structure with two names, not two
structures. A student who holds this will also mis-answer any question about where the
pericardial cavity lies.

## answer_b
One: a single fibroserous membrane

## explanation_b
Incorrect. This collapses a real distinction. The fibrous and serous layers differ in
structure and in function: the fibrous layer is dense connective tissue that limits acute
distension, while the serous layer is a mesothelial membrane that secretes the fluid
allowing the heart to move without friction.

## answer_c
Two: the fibrous pericardium, and the serous pericardium with its parietal and visceral sheets

## explanation_c
Correct. The heart is enclosed by two pericardial layers. The outer **fibrous pericardium**
is tough, inelastic connective tissue; because it will not stretch acutely, a rapid
accumulation of fluid inside it produces tamponade, while a slow one may not. Inside it
lies the **serous pericardium**, a single mesothelial membrane folded on itself into two
continuous sheets: the parietal sheet lining the fibrous layer, and the visceral sheet
adherent to the myocardium — the layer commonly called the epicardium. The potential space
between those two sheets is the pericardial cavity, and it holds a small volume of
serous fluid that lets the heart move without friction. The point to hold is that
"epicardium" names a sheet of the serous layer, not a third layer.

## answer_d
Two: the parietal pericardium and the visceral pericardium

## explanation_d
Incorrect. Parietal and visceral are the two *sheets of the serous layer*, so this answer
names one layer twice and omits the fibrous pericardium entirely. It picks the student who
has learned the serous arrangement well but has forgotten what encloses it.

## answer_e
Three: endocardium, myocardium, and epicardium

## explanation_e
Incorrect. Those are the three layers of the heart *wall*, not the coverings that enclose
the heart. Only the epicardium belongs to both lists, which is exactly why the two get
confused.

## topic
Cardiac anatomy

## subtopic

## main_concept
CON-CVS-7C9D59D257AC65

## concept_ids
CON-CVS-AE28ABD8CE2B0B

## contextual_concept_ids

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.45

## setting
Academic

## reasoning_level
2

## inferred_difficulty
62

## exam_relevance
8

## clinical_relevance
0.6

## academic_relevance
0.95

## exam_weight_by_year
OMS_Y2=0.7 | OMS_Y3=0.4

## years
OMS_Y2

## universities
OMS

## module

## question_only_for

## library_ids
ART-CVS-HEART-ORIENTATION

## resource_ids
src_3cbca0e699baf9104cb9

## learning_objective
State the two pericardial layers, and explain why the epicardium is a sheet of the serous
pericardium rather than a third layer.

## source_citation
Kasr Alainy, ANATOMY CARDIOVASCULAR SYSTEM, pericardium.

## attached_image

## attachments

## media_recommendations
### anatomy plate · Question stem
Brief: Coronal section through the pericardium showing the fibrous layer, both serous
sheets, and the pericardial cavity between them
Purpose: The relationship between the two serous sheets is spatial, and the reason the
epicardium is not a third layer only becomes obvious when the fold is visible. Prose can
assert it; only the section shows it.
Priority: required
Status: needed
Source direction: openly licensed anatomy atlas
Rights: must be CC-BY or public domain

### diagram · Explanation for answer E
Brief: Side-by-side comparison of the three layers of the heart wall against the two
pericardial coverings, with the epicardium marked as belonging to both
Purpose: Option E is picked by students who conflate the wall with the coverings. The
overlap at the epicardium is the whole reason for the confusion and needs to be shown.
Priority: strongly helpful
Status: needed
Section: Explanation E

## estimated_seconds
70

## randomise_answers
yes

## author_notes
Distractor A is the target misconception named in the concept's pitfalls field. D and E
catch the two adjacent confusions — naming one layer twice, and confusing the wall with
the coverings.
```

Note what is doing the work. `explanation_c` carries the full teaching moment, because it
is also the overall worked explanation and there is no separate column for one. Every
distractor names the specific student it catches, and distractor A is lifted directly from
the `pitfalls` field of the concept being tested — which is where good distractors come
from.

---

## Before you hand off

```bash
npm run medical:batch -- "docs/import-ready/question/<your-file>.md"
npm run medical:simulate -- "docs/import-ready/question/"*.md --emit /tmp/sim-$SCOPE.json
npm run medical:audit -- --source /tmp/sim-$SCOPE.json
```

Question batches resolve their concept and article references against **live state**, not
the batch directory — so `medical:batch` will tell you honestly if the concept you are
testing does not exist.

- [ ] Every question names at least one `main_concept`
- [ ] Every `main_concept` is covered by an article, and that article is in `library_ids`
- [ ] Nothing merely mentioned by the vignette is in `main_concept` — it is in `contextual_concept_ids`
- [ ] Every option has an explanation, including the correct one
- [ ] Every distractor's explanation names the specific misconception that picks it
- [ ] The correct answer's explanation works as the full worked explanation
- [ ] No option says "both A and C" or "none of the above"
- [ ] Images I need are request blocks; no invented URLs
- [ ] `fieldsUsed` ≥ **46** (the worked example scores 48)
- [ ] All three commands return zero errors

### The failures specific to questions

| Symptom | Cause |
|---|---|
| `kind` is not `question` | The file lacks `correct_answer` or `answer_a` |
| `Correct answer must be A–F` | Malformed `correct_answer` |
| `Answer X is marked correct but has no text` | `correct_answer` points at an empty option |
| A concept gains mastery the student never earned | You put a contextual concept in `main_concept` |
| The worked explanation reads thin | You wrote `explanation_<correct>` as a justification rather than the teaching moment |
| Question references a concept nobody authored | Author the concept first, or drop the question |
