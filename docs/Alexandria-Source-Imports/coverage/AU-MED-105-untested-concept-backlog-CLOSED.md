# AU-MED-105 untested-concept backlog — CLOSED 2026-08-28

Chief-of-staff dispatched this lane to close AU-MED-105's untested-concept
backlog the same question-led way as AU-MED-102/103: for each own-lane
concept with no authored question, check the module's own exam papers / MCQ
banks for real demand before writing anything. Never invent a question for
chapter coverage the module doesn't examine.

## Result: 15 tested-but-unauthored, 2 left unauthored (not "no demand") — 0 chapter-only-no-demand

Own-lane traceability at staging was 50/67 concepts (17 untested), all 17 in
the CON-MSK- (musculoskeletal) namespace: 16 anatomy, 1 histology. Diffing
every concept id in the module's three concept files against every
`main_concept` referenced across `question/AU-MED-105-*.md` plus the
still-pending `pending-live/AU-MED-105-*` files (the same method AU-102/103
used) found exactly those 17. **All 17 already carried real, page-cited exam
demand** — every one's `exam_signal` names a real department revision-bank
source and page range, and 16 of the 17 already had the printed stem(s)
verbatim in `original_wording`. **0 were chapter-coverage with no demand.**

## The 15 authored

All 16 anatomy concepts trace to one four-file department revision bank
(Dr Ibrahim Amr — "MCQs - Lower limb MCQ part 1/2/3" and "MCQs - Upper limb
MCQ"; `src_f0b73dc856d890ca9c58`, `src_78b66af9c28aa239cdb7`,
`src_a2ec24de7b5561128fed`, `src_c86f47635016c192bd42`). **This whole bank
family prints questions only — no answer key anywhere in any of the four
files**, checked page-by-page (unlike this same module's Histology bank,
which does carry a printed answer-key page). This is a different situation
from AU-102/103's garbled-or-highlighted keys: here there is no key to read
at all, garbled or otherwise.

Per the chief-of-staff's brief and 05-questions.md's own ruling ("a garbled
key is rendered by eye... or, failing that, the question is left unkeyed and
unauthored" — and the task brief's explicit allowance to "key editorially
per the answer-key ruling with a field_note" when a key is missing), 15 of
the 16 were keyed **editorially**: each correct answer rests on the same
medical fact already stated on that concept's own `definition` — independently
authored and reviewed before this pass, not derived from this unkeyed bank —
never on a guess. Every record's `author_notes` states the bank has no
printed key and names the specific fact the key rests on. All distractors
are the bank's own real printed wrong options; none is invented.

15 single-best-answer MCQs authored into a new
`question/AU-MED-105-anatomy-mcq.md` (this module previously had anatomy
questions only in the labelling-format `anatomy-practical-mcq.md`, a
different question type for a different source). Two pairs of sibling items
in the source bank test the same concept from two angles (hip
ligaments/dislocation direction; clavicle fracture's medial and lateral
fragment) — only one question authored per concept in each case, the second
fact folded into that question's own explanations, to avoid inventing two
banked appearances from one exam signal.

## The 2 left unauthored — not "no demand", genuinely unresolvable without more

Neither of these is chapter-coverage with no demand — both have real,
page-cited exam appearances. Neither could be safely keyed.

- **Inversion/eversion joint** (`CON-MSK-D8D5A545B71CEC`): the printed
  stem ("Inversion and eversion of foot occurs at level of which joint?")
  offers four options — ankle / subtalar / inferior tibiofibular /
  talo-calcaneo-navicular — of which **two** (subtalar, and
  talo-calcaneo-navicular) are anatomically defensible against the
  concept's own definition, which names both the subtalar joint and the
  transverse tarsal joint as sharing this movement and even calls the
  combination "the talocalcaneonavicular complex." With no printed key to
  break the tie, and genuine ambiguity about which single option the
  question intended, this is left unkeyed and unauthored rather than
  guessed — the same disposition AU-102's closure gave its one truly
  self-contradicting source item.
- **Endomysial reticular fibres** (`CON-MSK-0E3AE8E79060E1`): its
  `exam_signal` cites the Histology bank's own page 15 — which does have a
  printed answer key (page 17, "Smooth muscles" section, verified
  visually). But every item on that page is a diagram-letter-identification
  question ("which letter refers to the epimysium?", "which statement is
  NOT true of the fibres in the opposite diagram?"), and none of them tests
  this concept's own fact (endomysial reticular fibres carrying small
  vessels/nerves) as its own main point even once the key is read — the
  nearest item (Q3) tests a different, broader smooth-muscle-fibre property
  with "covered externally by epimysium" as one wrong option among several,
  not endomysium as the main concept. Authoring a labelling item without the
  source image would be exactly the "prose rewrite of what the image would
  have shown" the manual forbids; left unauthored.

## Traceability

Own-lane AU-MED-105 concepts now reaching a question via `main_concept`:
**65 of 67** (up from 50/67 at staging). New questions: 15
(`QST-MSK-AU105-ANAT-FEMSHEATH`, `-SAPHOPENING`, `-SCIATICFORAMEN`,
`-ANTLEG`, `-FOOTARCH`, `-PROFUNDA`, `-TROCHANTERIC`, `-DEEPINGUINAL`,
`-HIPLIG`, `-POPLITEUS`, `-SUPTIBFIB`, `-CLAVFX`, `-DORSALSCAP`,
`-SUPRASCAP`, `-AIN`). Every one carries `library_ids` resolving to an
existing covering article (no new articles minted), `main_concept` an
existing concept in this module's own concept files (no new concepts
minted), and a `source_citation` naming the real bank, item number and page.

## Gates run

- `medical:batch` on the new `question/AU-MED-105-anatomy-mcq.md`, `--with`
  the anatomy concept, article and evidence files: 0 errors, 15 items,
  fieldsUsed 61, all 15 correct-answer explanations ≥3 sentences.
- Full-tree `medical:simulate` and `medical:audit`: see this lane's own
  chief-of-staff report for the pasted whole-tree gate lines, run once
  across both AU-103's and AU-105's halves of this dispatch together.

## Commits (this checkout's branch)

1. `60d5c570` — 15 questions (single-best-answer MCQs, new anatomy-mcq file).
