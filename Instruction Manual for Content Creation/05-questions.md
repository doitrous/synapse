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

## §A · The law of priority, for questions

A question exists so a student can rehearse an exam their university actually sets. That
sets a strict order:

1. **Real papers and department banks first** — transcribed from an actual exam paper (EOM,
   EOY, resit/Baqoon, end-of-rotation) or a department's own question bank / MCQ book, not
   composed to illustrate a concept.
2. **Invented items fill a named gap, and say so** in `derived_from` and `author_notes` —
   never a silent substitute for a real paper's question.
3. **Answers come only from an official key or the department book, page cited** in
   `source_citation`, never reconciled by hand. A questionable printed key is recorded **as
   printed**, key error and all.
4. **A garbled key is rendered by eye, method recorded in `author_notes`, or left unkeyed
   and not authored.** Guessing a key from context authors a fact nobody printed.
5. **An image-dependent item gets a required `media_recommendations` block, never a prose
   rewrite** that describes the image away.
6. **Another university's paper is never this university's signal.** It tags that
   university in `universities`; it does not stand in for a paper this one never sat.

See `00-START-HERE.md` for the full law of priority and the staged pipeline it drives.

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

**A question may name more than one main concept.** It used to be forced to name
exactly one, which is right for most single-best-answer items and wrong as soon
as a question genuinely assesses two things at once — a written question asking
a student to compare two structures, or a matching item pairing five. Forcing
one there meant everything else the question tested earned no mastery evidence,
so a student who kept failing the second half of such questions was never told.

Name every concept the question really tests. Concepts it merely mentions go in
`contextual_concept_ids`, which earns no mastery — that distinction is what
keeps the profile honest, not the count.

**A question may only test a concept that at least one article covers.** If no article
teaches it, write the article first, or do not write the question.

### There is no import column for the overall worked explanation

`fields.Explanation` — the worked explanation a student reads after answering — is
**silently taken from the correct answer's explanation**. There is no `explanation` column
that sets it independently.

So `explanation_<correct letter>` is doing two jobs, and both are hard rules:

- **`explanation_<correct>` is at least three sentences**: why the right answer is right,
  the mechanism behind it, and the thing worth remembering. Fewer than three sentences is
  not a shorter version of the explanation bar — it is short of it.
- **Every distractor's explanation says why it is wrong, in one sentence**, and names the
  specific misconception that picks it. Not "this is wrong" — the one sentence has to do
  the work of catching a nameable student.
- **Write in the authoritative voice of a professional question bank, never a study guide
  narrating its source.** Student-facing text — every stem, option, and explanation — states
  the medicine on its own authority and NEVER refers to the study material: no "the
  department book says", "according to the textbook", "the lecture notes state", "as per the
  source/handout", "the book's table gives", "the department book's own worked example", or
  any variant. State the fact and its mechanism directly. Source provenance is metadata: it
  lives in `field_notes`, `evidence`, and `citations`, never in a sentence a student reads.
  When a real paper's printed key is being corrected or a convention named, say it about the
  answer ("the exam's printed key marks X, but Y is correct because…"), never about the book.

The worked example below is held to this bar too: if it does not clear it, extend it rather
than treat the bar as aspirational. Mechanical enrichment of an explanation — expanding the
mechanism from what an already-verified evidence claim states — is allowed. There is no
`claim_ids` column on a question; that field lives on the article (`04-library-articles.md`).
An enriched explanation stays traceable by keeping the article carrying those claims in
`library_ids` — enrichment is not licence to assert anything beyond what the cited article's
claims already carry.

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
- Authoritative voice: state the medicine directly. NEVER write "the department book says",
  "according to the textbook", "the lecture notes state", "the book's table gives", or any
  reference to the study material in student-facing text. Provenance goes in field_notes, not
  the explanation.
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
| `answer_a` … `answer_f` | Answer A–F | **4 or 5** | Option text. The importer accepts 2; `medical:batch` rejects anything outside **4–5**, so write 4 or 5. |
| `explanation_a` … `explanation_f` | Explanation A–F | **yes, every filled option** | Why that option is correct or incorrect. A filled option with no explanation is an error. |
| `attached_image` | Attached image | no | A single image URL shown with the stem. **Only a real URL.** If you need one, file a media request. |
| `attachments` | Attachments | no | `### image\|audio\|video · URL` blocks, then `Name:` and optionally `Mime:`. Real assets only. |
| `id` | Canonical ID | no | Supply to update an existing question. |
| `subject` | Subject ID | **yes** | One of the 20 curriculum subjects in `src/data/curriculumCatalog.ts` — `cvs`, `resp`, `renal`, `gi`, `neuro`, `endo`, `msk`, `pharm`, `fnd`, `dev`, `haem`, `imm`, `inf`, `obs`, `gyn`, `androl`, `psy`, `derm`, `mul`, `pop`. See `01-subjects-and-topics.md`. |
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
| `format` | Question format | `single best answer` (default) · `multiple response` · `true or false` · `matching` · `completion` · `labelling` · `image-based` · `short answer` · `structured written` · `essay` · `comparison table` · `multipart written` | `single best answer` |
| `written_parts` | Written parts | The marked subparts of a written question. **Required on a written format, refused on any other.** | `[]` |
| `matching_options` | Matching options | The option bank, one per line as `A \| text`. **Required on `matching`, refused on any other.** | `[]` |
| `matching_prompts` | Matching prompts | The prompts, one per line as `prompt = A`. | `[]` |
| `correct_answers` | Correct answers | For `mcq_multi`: every correct option, as `A \| C`. Two or more. | `[]` |
| `labeling_image` | Labelling image | Image URL. **Required on `labeling`.** | — |
| `labeling_alt` | Labelling alt text | What the image shows. **Required on `labeling`.** | — |
| `labeling_points` | Labelling points | One per line as `1 @ 34,58 = Answer \| Also accepted`. | `[]` |
| `completion_text` | Completion sentence | The sentence with blanks inline as `[[answer\|also accepted]]`. | — |
| `derived_from` | Derived from | What this was derived from, when it was derived rather than transcribed. | — |
| `main_concept` | Main concept(s) | **At least one concept ID.** Name every concept the question genuinely tests — each one earns mastery evidence. Zero is an error. | — |
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
| `exam_weight_by_year` | Exam weight by year | Keyed values only — `OMS_Y2=0.7 \| OMS_Y3=0.5`. No `+` directive on this column. | `{}` |
| `years` | Relevant years | Canonical year IDs only — `KAU_Y1`, `AU_Y1`… (exact case). **Never the bare label `Year 1`; a lower-case id is also wrong.** | `[]` |
| `universities` | Relevant universities | University IDs. **Must be non-empty — see below.** | `[]` |
| `module` | Module ID(s) | Every module this applies to. **Non-Kasr modules carry that university's prefix — see below.** | `[]` |
| `module_subject` | Module subject path(s) | Where inside each module it sits — `101 ISK > Anatomy > Upper Limb`. One per line. | `[]` |
| `question_only_for` | Restrict to years/universities | If set, the question applies **only** to these, regardless of subject scope | `[]` |

`difficulty` and `inferred_difficulty` are different axes and both matter. `difficulty` is
what you intended; `inferred_difficulty` is how many students you expect to get it right.
`Hard` and `Challenging` both mean "expect most to miss this" — `Hard` is a concept a strong
student gets right, `Challenging` needs several steps held at once.

**`years` is ids only (ruling 2026-08-23).** Production `years` currently holds three
shapes — the canonical id (`KAU_Y1` 539 rows, `kau_y3` 114 rows), and the bare label
(`Year 1`, 2,469 rows across 41 files). A label names no university, so it can never be
checked per university the way an id can — ruled ids-only. Write the canonical id, exact
case (`buildYears`, `src/data/universities.ts:63-75`, mints `${CODE}_Y${n}` in upper case
for every university); `kau_y3` and `Year 1` are both wrong. Kasr's own records get
normalised to ids in its sitting-year sweep — that is a Kasr-side cleanup, not licence to
write a label or the wrong case yourself.

### Catalogue placement is a hard gate (S3), not a courtesy

`medical:batch` runs a catalogue check (`scripts/validate-content-batch.mjs`,
`catalogueErrors`) against `src/data/universities.ts` and `src/data/curriculumCatalog.ts`.
Hard errors, not style notes:

- **`universities` empty is an error, not "every university."** An empty list *does* mean
  every university at runtime, which is the danger: a record an author forgot to scope
  reaches every student instead of none, silently — so the gate refuses it.
- Every university ID must be in the catalogue, or the row is refused by name.
- **A non-Kasr module ID carries its university's prefix**: `ASU-`, `AU-`, `HU-` — e.g.
  `AU-MED-102`. **Kasr keeps its bare IDs**, e.g. `101 ISK`.
- `module_subject`'s first segment must be a module this record declares in `module`, or
  the row is refused.
- `subject` must be one of the 20 (field table above) — an unrecognised one is
  placeholdered at runtime rather than refused there, which is why the batch gate checks it.

There is no `exam_signal` column on a question — that field lives on the **concept**
(`02-concepts.md`), recording how many independent sources examine it. A question's own
provenance is `derived_from` and `source_citation`.

**Kasr sitting year, for `years` and `exam_weight_by_year`:** the batch number is not the
sitting year — EOM = batch + 1825 + year; EOY / Baqoon = batch + 1826 + year; a printed date
on the paper always wins over either formula.

### `module_subject` — where inside a module this belongs

A module ID alone is too coarse to revise by: a module runs for a term and
covers two or more disciplines, so "this belongs to `101 ISK`" does not tell a
student working on the brachial plexus whether it is theirs.

Write the way down, one path per line:

```
101 ISK > Anatomy > Upper Limb > Brachial Plexus
101 ISK > Histology > Epithelium
```

- **Newlines separate paths — not `|` or `;`.** Every other list column in the
  importer accepts those, and this one must not: a faculty's own subject name
  may contain either, and splitting on them would cut it in half.
- The **first segment may name the module**, by ID or by name, and is optional.
- Segments are matched against the module's subject tree by name, ignoring case
  and padding. A path that stops matching partway resolves to **nothing** and
  reports the segment it failed on — it does not fall back to the last segment
  that did match, because that files the item a level above where it was meant
  to go.
- The path is stored **as written**, not as a resolved ID. The subject tree gets
  reorganised as department books change, and a path that stops resolving can be
  reported and repaired, where a stale ID just points at nothing.

**A question shared by several universities needs all four of `universities`, `years`,
`module`, and `exam_weight_by_year` filled in for each one** — `universities`, `years` and
`module` are true id lists (`+HU`, `+HU_Y3`, `+HU-GIT-301` append safely), but
`module_subject` re-parses the whole cell on every write with no `+` form, so a second
university's path means retyping every path already there plus the new one.
`exam_weight_by_year` merges per `YEAR_ID=weight` key, so writing only your own year's entry
is safe — but a key on the wrong year id contributes nothing to anyone's blueprint. See
[00-START-HERE §3, "Per-university
traceability"](00-START-HERE.md#per-university-traceability-on-shared-records). Questions
have no `university_notes` column today (it is landing); a university-specific aside goes in
`author_notes` (internal only) or on the covering article's own `university_notes` until it
ships.

Build the tree first, with an indented outline in **Academic Setup › Import**.
See `01-subjects-and-topics.md`.

## Fields · evidence and editorial

| Key | Rule |
|---|---|
| `library_ids` | **Required.** The article teaching the tested concept. Empty is an error — *"nothing teaches this question's answer"* — and the `main_concept` must be listed in one of these articles' `related_concepts`. |
| `resource_ids` | Canonical resource IDs. |
| `learning_objective` | **Required.** What a correct response demonstrates. Held back until the answer is revealed. |
| `source_citation` | **Required.** Guideline, book, paper, or source URL. This is where a textbook or past paper is named. |
| `author_notes` | Internal. Never shown to a student. |
| `estimated_seconds` | How long it should take. Defaults 90, clamped 5–3600. |
| `randomise_answers` | `yes` / `no`. Defaults `yes`. |
| `media_recommendations` | Assets this question still needs. See below. |

---

---

## What `medical:batch` enforces

The importer is permissive; the batch validator is not. These are hard errors, and
several are stricter than the field table's own defaults suggest:

| Rule | Error you get |
|---|---|
| 4 or 5 filled options | `N options — the contract is 4 to 5` |
| every filled option has an explanation | `option X has no explanation` |
| the correct letter is one of the filled options | `correct answer X is not one of the filled options` |
| **at least one** `main_concept` | `no main_concept — name what this question tests` |
| every concept ID exists in live state | `main_concept X is not a concept that exists` |
| no concept is both assessed and contextual | `X is both assessed and contextual` |
| `library_ids` is non-empty | `no library_ids — nothing teaches this question's answer` |
| the main concept is covered by one of those articles | `main concept X is not covered by any article in library_ids` |
| `status` is `Draft` | `status is Published — assessment content lands as Draft` |
| `learning_objective` is non-empty | `no learning objective` |
| `source_citation` is non-empty | `no source citation` |
| `difficulty` is one of the four bands | `difficulty "Medium" is not one of Easy, Moderate, Hard, Challenging` |
| `universities` is non-empty | `universities is empty — an empty list means EVERY university, not none, so this record reaches students it was never written for` |
| every university ID is in the catalogue | `university "X" is not in the catalogue` |
| a non-Kasr module carries its university's prefix | `module "X" is under <uni>, whose module IDs carry the "<prefix>" prefix` |
| `module_subject`'s first segment names a module this record declares | `module_subject starts with "X", which is not a module this record declares` |
| `subject` is one of the 20 curriculum subjects | `subject "X" is not one of the 20 curriculum subjects` |
| an update row (`id` set, `question`/`title` blank) points at a live ID | `X is not a question that exists — not in live state, and no full record in this batch folder or a --with sibling authors it` |

**Coverage, precisely:** "the main concept is covered by one of those articles" means the
concept's `article_ids` **union** every article whose `related_concepts` names it back — a
link authored from either side counts. The check runs against **live state plus whatever
`--with` named**, never the whole repository. A question batch validated without the sibling
concept batch that mints its `main_concept` will report that concept as missing — not
silently: the error names the concept and, since daf0d4d, ends with a hint to pass the
concept batch with `--with`. Always name every sibling concept and article batch on `--with`,
or a "not a concept that exists" error may be an artefact of an incomplete command, not a
real defect.

There is also a note, not an error, when the concept you are testing has not passed
the evidence gate: *"main concept X has not passed the evidence gate — promote the
concept and the question together"*. That is a sequencing reminder, not a defect.

That union rule passes on the concept side alone, and the concept side is not always earned:
`scripts/kasr/build-article-links.ts` writes `article_ids` onto generated concept rows by term
overlap, not by anyone confirming the article teaches the concept, so a clean `medical:batch`
run can still mean no article actually names the concept. For hand-over, treat coverage as
real only after the coverage-verification pass — reading each linked article and confirming or
fixing the back-link — has run for the module (13-orchestration.md §4, §10).

## Media

A question is the **only** student-facing item that can carry all three media types
directly — image, audio and video. Take advantage of that: this is where a heart sound, a
murmur, a breath sound or a short clinical clip belongs, because no practical format can
hold one.

### Real media you have — `## attachments`

One `### medium · URL` block per asset, then `Name:` and optionally `Mime:`.

```markdown
## attachments
### audio · https://example.org/audio/mid-systolic-murmur.mp3
Name: Mid-systolic ejection murmur at the aortic area
Mime: audio/mpeg

### video · https://example.org/video/jvp-waveform.mp4
Name: Elevated JVP with a prominent v wave
Mime: video/mp4
```

- The heading medium must be exactly `image`, `audio` or `video`. A block with **no URL is
  dropped**.
- `Mime:` is optional but worth writing — uploaded files play more reliably when the type
  is declared.
- `## attached_image` is a separate, single-image shortcut shown with the stem. Use
  `attachments` for anything that is not one plain image.
- Uploaded files are stored outside the question record, so audio and video are not
  truncated. A URL you paste is used as-is.

**Only ever a real, working URL.** If you do not have the asset, leave `attachments` empty
and file a request instead.

### Media you need — `## media_recommendations`

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

`attachments` and `attached_image` are present but empty because no rights-cleared asset
exists for this question yet — the two things it needs are requested instead. Had this been
an auscultation question, the recording would have gone in `attachments` as an `audio`
block, and no request would have been needed.

---

## Redundancy: search before you author

Before writing a question, search for it: `node "Instruction Manual for Content Creation/
tools/find-existing.mjs" <a phrase from the stem>` — it searches question and practical
titles and aliases, live and every pending batch. A hit on the stem means a question that may
already exist, not a fresh one to mint.

**The same printed question sat in two exam sittings is one record, not two.** Add the second
sitting to that question's `exam_weight_by_year` and `years` rather than authoring a
duplicate with a new ID — two records for one idea is what `medical:duplicate-keys` and S7
exist to catch.

---

## Stages for a question

Not finished at `medical:batch` green; finished at S7. In order (`00-START-HERE.md`,
`13-orchestration.md`):

- **S1 Triage** — which concept it tests; live / pending / new; wait for approval before S2.
- **S2 Build** — write against an article that already covers that concept.
- **S3 Tag & place** — placement, universities, module/module_subject, weights ("Catalogue placement" above).
- **S4 Relate** — `main_concept` sits in `library_ids`' coverage (concept `article_ids` ∪ article `related_concepts`).
- **S6 Media** — every image-dependent stem or option gets a `media_recommendations` block, never a prose rewrite.
- **S7 Completeness** — `fieldsUsed` ≥ 46, the explanation bar met, redundancy scan clean. Below the floor or short of the bar is not finished, whatever `medical:batch` says.
- **S8 Hand-over** — carried by the import-order INDEX, not by this file.

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

**`medical:simulate` has no `--with` flag, unlike `medical:batch`.** Naming your sibling
concept/article batches with repeated `--with <file>` — the pattern the `--with` hint above
trains you to reach for — silently drops every one of those files from the simulate run
(its parser reads the token right after any `--flag` as that flag's value) and still exits
0 with `errors: []`, because a dropped file was never read, not rejected. Pass every
sibling file positionally, in apply order, with no flag: `medical:simulate --
concepts.md articles.md your-questions.md --emit …`.

**A bare `---` line anywhere inside a multi-line field — `written_parts`,
`matching_options`, `media_recommendations`, even a long `vignette` copied from a source
PDF — ends the record early**, because the importer splits one file into records on any
line that is only `---` (`/^\s*---\s*$/m`), the same separator between `# Item` blocks. A
horizontal rule or a stray row of dashes carried over from source formatting silently
truncates everything after it into a broken second record. Strip any bare `---` line out
of pasted source text before you save the batch.

- [ ] Every question names at least one `main_concept`
- [ ] Every `main_concept` is covered by an article, and that article is in `library_ids`
- [ ] Nothing merely mentioned by the vignette is in `main_concept` — it is in `contextual_concept_ids`
- [ ] Every option has an explanation, including the correct one
- [ ] Every distractor's explanation names the specific misconception that picks it
- [ ] The correct answer's explanation works as the full worked explanation
- [ ] No option says "both A and C" or "none of the above"
- [ ] Images I need are request blocks; no invented URLs
- [ ] `fieldsUsed` ≥ **46** (the worked example scores 48)
- [ ] `explanation_<correct>` is at least three sentences; every distractor's is one
- [ ] `universities` is non-empty; module IDs carry the right university prefix (Kasr excepted)
- [ ] Searched with `find-existing.mjs` first; a second sitting of the same printed question is a weight, not a new record
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
| A generated/extracted `labeling` row rejects even though it looked fine in the source | It has no `labeling_image` — this format has no Draft bypass; see "Labelling" below |
| `medical:simulate` reports `errors: []`, but a sibling file never seemed to apply | You passed it after `--with`; `medical:simulate` has no such flag and silently dropped it — list files positionally |
| A record after a long prose or mark-scheme field is missing or garbled | A bare `---` line inside that field ended the record early — strip stray horizontal rules from pasted source text |
| An option/answer value extracted from a source paper comes out wrong or unmatched (e.g. a numeric value that should read `+5 mmHg`) | The leading `+` was read as a list-append directive somewhere in the pipeline rather than kept as literal text — see `02-concepts.md`'s "Append to a list field" note; clean the seed/extraction input, do not drop a real value just to clear the gate |

---

## Formats other than single best answer

The bank was built around one shape — a stem, four to six lettered options, one
correct letter. That is the commonest thing a faculty sets and it is not the
only thing. Kasr Al Ainy's own Year 1 papers carry matching blocks (one EPE
paper is twenty matching items out of thirty-two), true/false, completion,
labelling, and written questions with several marked subparts.

A source question in a format the product did not support used to leave two
options: rewrite it as an MCQ, which loses what it was actually testing, or skip
it — which lets the importer decide what students get taught. **Neither is
acceptable.** Record the question as the thing it is.

Leave `format` blank and you get `single best answer`, so nothing authored
before formats existed needs changing. A format nobody recognises is an error,
never a silent fallback.

### Written questions

A written format carries `written_parts` instead of lettered answers, and
`correct_answer` is not required:

```
## written_parts
### (a) 5 marks
Enumerate the contents of the femoral triangle.
Expects: Femoral nerve
Expects: Femoral artery
Expects: Femoral vein
Concept: CON-MSK-0001

### (b) 5 marks
Summarise the ligaments of the hip joint.
Expects: Iliofemoral ligament
Concept: CON-MSK-0002
Depends on: a
```

`Expects:` lines are a **mark scheme, not a model answer** — the components an
answer must contain to earn the marks. A part whose mark scheme the paper never
printed is kept rather than dropped; losing the question because its answer is
unknown is the wrong trade.

Name every concept the parts assess in `main_concept`. A question asking a
student to compare two structures assesses both, and both should earn mastery.

### The two derivation restrictions

These are absolute, and the importer enforces them.

1. **A written question may only be derived from an existing written question.**
   Not from an MCQ, not from a true/false item, not from a textbook passage, not
   from a concept.
2. **A practical question may only be derived from an existing practical.**

A written question is not an MCQ with the options removed. What a faculty asks a
student to write, how many marks each part carries, and which components earn
them are conventions of that faculty's papers — they cannot be inferred from a
question that never had them. Invent one from an MCQ and you produce something
that looks right and trains a student for an exam nobody sets.

Everything else is free. An MCQ may become a matching item; a concept taken from
a department book may become a true/false item; a written source question may
inspire a non-written one — as long as the written original is captured too.

### Matching questions

Not a niche format here: one Kasr Al Ainy EPE paper is twenty matching items out
of thirty-two, and the department question books use them throughout.

```
## matching_options
A | Open-ended question
B | Showing empathy
C | Closed question

## matching_prompts
"Tell me more about that" = A
The best way to deal with a patient's pain = B
```

An option may answer **several** prompts, and some options answer **none** —
the unused ones are the distractors, and they must survive import. Nothing
requires a one-to-one pairing.

Do not split a matching block into one single-best-answer question per prompt.
It changes what is being tested: a matching block asks a student to tell several
near neighbours apart *against each other*, and splitting it hands them a fresh
set of distractors each time.

Options may be written `A | text`, `A. text` or `A) text`, and prompts may use
`=`, `->` or `:`. Any line that cannot be read is an error naming how many were
lost — a block must never arrive half-imported in silence. A letter written
twice is reported as the repeat it is, since only the first is ever reachable.

### Which formats can be shown to a student today

A format is refused at import until something can run and mark it. That refusal
is deliberate: the alternative failures are silent. `mcq_multi` would go through
the single-best-answer path, where the correct answer is one letter — a question
with three right options would mark two of them wrong and tell the student so.
`completion` and `labeling` have no payload and no runner, so they would arrive
as an empty question or not at all.

| Format | Where a student meets it |
|---|---|
| `mcq_single_best` · `true_false` · `image_based` | Question Bank |
| `matching` | Essay questions → Matching questions |
| `short_answer` · `structured_written` · `essay` · `comparison_table` · `multipart_written` | Essay questions → Exam questions |
| `mcq_multi` | Essay questions → Select all that apply |
| `labeling` | Essay questions → Labelling |
| `completion` | Essay questions → Completion |

Every format now has a runner, so nothing is currently refused. The check stays
because it is what stops a format being imported ahead of the surface that shows
it — if a new one is added tomorrow, it is refused until something can run it.

Never rewrite a source question into a format it was not set in to get it
imported. That changes what it tests, which is the whole thing this is here to
prevent.

### Select all that apply

`correct_answers` holds every correct option, and `correct_answer` is not used —
it is one letter and cannot say that three options are right. Two or more, or it
is a single best answer question. Marking every option correct is refused: there
is nothing left to tell apart.

```
## correct_answers
A | C
```

A student's result is reported as **what they chose wrongly** and **what they
left out**, kept apart. Those are different mistakes — one is a misconception
about an option, the other is not knowing it belonged — and a single fraction
hides which was made.

### Labelling

How anatomy and histology are actually examined here: identify the structure at
the arrow.

```
## labeling_image
https://…/anterior-arm.png

## labeling_alt
Anterior compartment of the arm, three structures arrowed

## labeling_points
1 @ 34,58 = Biceps brachii | Biceps | Biceps m.
2 @ 61,42 = Brachialis
3 @ 22,77 = Median nerve | Median n. | N. medianus
```

Coordinates are **percentages** of the image, so a pin holds wherever the image
is rendered. Everything after the first `|` is another wording that counts as
right.

**This is a hard gate with no Draft bypass, unlike every other media-needed pattern in
this manual.** `labelingErrors()` (`src/data/labelingQuestion.ts`) unconditionally refuses
a `labeling` item with no `labeling_image` — there is no equivalent of importing a
concept or article as Draft with a `media_recommendations` block held for later. A
labelling item with no image today does not import as Draft-pending-media; it does not
import at all. If you do not have the image yet, do not force the row through: keep it
out of the batch (or note it in `field_notes`/the module's coverage ledger as
"media-blocked, needs image"), and add it once the image exists rather than inventing a
URL or waiting on a bypass that does not exist.

**Alt text is required**, not encouraged: the image *is* the question, so
without it a student using a screen reader is told nothing at all.

Answers are typed, not chosen from a list — recognising a name among four
options is a different and much easier task than producing it, and producing it
is what the paper asks.

Marking is lenient about wording and strict about structure. Case, punctuation,
articles and the abbreviations a student writes are all ignored, so "the biceps
brachii muscle" and "Biceps brachii" are one answer, and so are "median n." and
"Median nerve". But the class word is never discarded: **"median nerve" and
"median artery" are not the same answer**, and treating them as one would credit
a student for naming a different structure.

### Completion

The department books set these constantly. A blank asks a student to *produce*
the term; the same item as four lettered options asks them to *recognise* it,
which is a different and much easier thing — so do not convert one into the
other.

```
## completion_text
The sinoatrial node is supplied by the [[right coronary artery|RCA]] in about
60% of hearts, and lies in the [[right atrium]].
```

Blanks are written **inline, in the sentence**, not as a numbered list beneath
it. A separate list is one more thing to keep in step: renumber the sentence and
the answers stop lining up, silently, and every blank after the mistake is
marked against the wrong word.

Everything after the first `|` is another wording that counts. An unclosed `[[`
is an error rather than a blank that quietly swallows the rest of the sentence.

Marked with the same rules as labelling — lenient about wording, strict about
structure. "the Right Coronary A." is accepted; "right coronary vein" is not.
