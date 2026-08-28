# AU-MED-103 untested-concept backlog — CLOSED 2026-08-28

Chief-of-staff dispatched this lane to close AU-MED-103's untested-concept
backlog the same question-led way as AU-MED-102: for each own-lane concept
with no authored question, check the module's own exam papers / MCQ and
practical-spot banks for real demand before writing anything. Never invent
a question for chapter coverage the module doesn't examine.

## Result: 7 tested-but-unauthored, 5 already covered by a sibling's question — 0 chapter-only-no-demand

Own-lane traceability at staging was 60/72 concepts (12 untested), all 12
in the CON-HEM- (haematology) namespace. Diffing every concept id in the
module's three concept files against every `main_concept` referenced across
`question/AU-MED-103-*.md` plus the still-pending `pending-live/AU-MED-103-*`
files (the same method AU-102 used) found exactly those 12. All 12 were
investigated individually against the concept's own `exam_signal` /
`field_notes` and, where absent, against the module's own source PDFs.
**0 were chapter-coverage with no demand anywhere.** Every one of the 12
either already carried real recorded exam demand not yet turned into a
question (7 — authored below) or was itself the field-noted "sibling" of an
exam item whose real demand is already carried by a different, already-
authored concept's question (5 — logged below, not re-authored, because
authoring a separate question for each would multiply one exam appearance
into several banked items).

## Split

| Category | Count | Concepts |
|---|---:|---|
| Tested, not yet authored → authored | 7 | B12-deficiency macrocytic anaemia causes; hemolytic anaemia intrinsic/extrinsic; bleeding time; coagulation time; MCV/MCH/MCHC; leukocytosis; ESR |
| Tested only as part of an already-authored sibling's question → logged, not re-authored | 5 | RBC glycocalyx (distractor); anaemia decreases viscosity; heparin/antithrombin mechanism; heparin naturally occurring; mast cells/basophils produce heparin |
| Chapter-coverage, no exam demand | 0 | — |
| **Total** | **12** | |

## The 7 authored

All 7 concepts already carried real, recorded exam demand — either the
concept's own `exam_signal` (five full records: bleeding time, coagulation
time, MCV/MCH/MCHC, leukocytosis, ESR, each with the printed spot-exam
wording already quoted in `original_wording`) or a `field_notes` line
naming the exact banked item (the two anaemia-classification concepts,
sparse overlays on a live Kasr-origin concept, citing "Forms-bank item 53"
and "Physiology Spot 7 / Forms-bank item 54"). Two source banks:

- **"MCQs - Blood practical.pdf"** (`src_3e62e4d388493af88dbe`, an MS-Forms
  results export, native text layer, 29 pages) — items 53 and 54. Item 54's
  correct option was confirmed by a direct visual read of the rendered page
  (a green tick beside option D), not the OCR text layer, because this
  export format is known to place incorrect-selection marks unreliably in
  extracted text (`docs/chief-of-staff` PDF-extraction-traps note applies
  to this source family too, not only Kasr's).
- **"MCQs - Practical Blood Questions_20240329_051349_0000.pdf"**
  (`src_4b9b0c4cf94fde15b14a`, native text layer, 18 pages) — a Physiology
  "spot" bank with a printed answer key (Spot 2, 5, 6, 7, 8, 9 used here).
  Several spot items have an image-dependent sub-part ("identify this
  test/arrow/abnormality from the picture"); those sub-parts are dropped
  rather than guessed at in every record that uses this bank, noted in that
  record's `author_notes`, and only the image-independent sub-parts
  (normal values, mechanisms, causes) are transcribed.

Neither source had ever been staged as a `resource` record for this
module — only cited inside `exam_signal` strings, which does not require
one — so both were added to
`evidence/AU-MED-103-physiology-sources.md` (12-resources.md schema) before
the new questions' `resource_ids` could resolve.

1 clean MCQ (`QST-HEM-AU103-FORMS-Q54`, single best answer, printed key)
into `question/AU-MED-103-physiology-mcq.md`. The remaining 6 are open
short-answer/spot items in the source, never lettered options — per
05-questions.md's "never rewrite a source question into a format it was
not set in", these are authored as `structured written` items with
`written_parts`, into a new file, `question/AU-MED-103-physiology-written.md`.

## The 5 logged, not re-authored

Each of these five concepts' own `field_notes` already states that its
real exam demand is the *same single exam appearance* as a named sibling
concept, recorded there instead to avoid counting one appearance five
times. Verified against the actual question bank (not just trusted from the
note):

- **RBC glycocalyx** (`CON-HEM-9D43F05669BB37`): field_notes say it is
  "tested only as a distractor on MED 103's EOM… rejected in favour of the
  biconcave-shape mechanism" concept. Confirmed:
  `question/AU-MED-103-histology-mcq.md` already carries
  `CON-HEM-9D43F05669BB37` as `contextual_concept_ids` on the question
  whose `main_concept` is the sibling `CON-HEM-23E454BD997B29`
  (biconcave-shape flexibility). Already wired in; nothing to author.
- **Anaemia decreases blood viscosity** (`CON-HEM-1CA767E86D9C3A`):
  field_notes name the real signal (EOM1 Q22 / EOM2 Q67) as already
  recorded on sibling `CON-HEM-C8B9CD41563B5B` "to avoid double-counting".
  Confirmed: `CON-HEM-C8B9CD41563B5B` is `main_concept` on an already-live
  question in `question/AU-MED-103-physiology-mcq.md` (line ~471).
- **Heparin facilitates antithrombin III inhibition** / **Heparin is
  naturally occurring anticoagulant** / **Mast cells and basophils produce
  heparin** (`CON-HEM-FF26A3D7EE6DB7`, `CON-HEM-2BF99442385474`,
  `CON-HEM-1975918ED45C76`): field_notes name one shared signal (EOM1 Q26 /
  EOM2 Q61) recorded once, on sibling `CON-HEM-ABF3EABEDD7170`, "to avoid
  double-counting one appearance across five sibling records". Confirmed:
  `CON-HEM-ABF3EABEDD7170` is `main_concept` on two already-live questions
  in `question/AU-MED-103-physiology-mcq.md`.

Authoring a separate question for each of these five would invent demand
the exam papers never contained — one printed item cannot become five
banked questions.

## Traceability

Own-lane AU-MED-103 concepts now reaching a question via `main_concept`:
**67 of 72** (up from 60/72 at staging), the 5 remainder all logged above
as covered through an already-authored sibling's question rather than
untested. New questions: 7 (`QST-HEM-AU103-FORMS-Q53`,
`QST-HEM-AU103-FORMS-Q54`, `QST-HEM-AU103-SPOT-Q8`,
`QST-HEM-AU103-SPOT-Q5-6`, `QST-HEM-AU103-SPOT-Q6-7`,
`QST-HEM-AU103-SPOT-Q9`, `QST-HEM-AU103-SPOT-Q2`). Every one carries
`library_ids` resolving to an existing covering article (no new articles
minted), `main_concept` an existing concept in this module's own concept
files (no new concepts minted), and a `source_citation` naming the real
paper/bank, item/spot number and page.

## Gates run

- `medical:batch` on `question/AU-MED-103-physiology-mcq.md`, `--with` the
  physiology concept, article and (newly updated) evidence files: 0 errors,
  50 items, fieldsUsed 46.
- `medical:batch` on the new `question/AU-MED-103-physiology-written.md`,
  same `--with` set: 0 errors, 6 items, fieldsUsed 41 (matches the existing
  Kasr `structured written` precedent's own fieldsUsed, both below the
  46-field MCQ floor because a written record has no lettered
  answers/explanations to fill it with — expected for this format, not a
  gap).
- `medical:batch` on `evidence/AU-MED-103-physiology-sources.md`: covered
  implicitly by the two runs above (both resolve `resource_ids` against it
  cleanly).
- Full-tree `medical:simulate` and `medical:audit`: see
  `docs/chief-of-staff/BOARD.md` / this lane's own report for the pasted
  whole-tree gate lines run after AU-MED-105's half of this same dispatch.

## Commits (this checkout's branch)

1. `c74429d7` — 7 questions (1 MCQ + 6 structured-written) + the two
   missing resource records their `resource_ids` needed.
