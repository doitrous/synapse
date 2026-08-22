# 102 INT — what is not done

The companion to [`102-INT-coverage.md`](102-INT-coverage.md). That file says which
source files were read; this one says what has **not** been made from them, so the
gap is a written record rather than something a later reader has to infer from an
absence.

Every batch under the import root validates clean. That is not the same as the
module being finished, and the difference is what follows.

---

## 1 · Fifty-seven of sixty-nine sources are read but unused

The coverage ledger's own numbers: **69 files read, 12 cited by a content batch,
57 read but not yet used.** Nothing is unread.

"Unused" is not "worthless". The 57 are mostly instructor revision material —
folders the faculty itself labels `[2nd priority]` through `[4th priority]` — plus
the practical manuals and the Baqoon papers. They are extracted, cached and
available; no content has been authored from them.

**The ledger counts "cited by a content batch" and deliberately excludes the
evidence-source and catalogue-resource batches**, which name every file in the
module by construction. Counting those reported 69 of 69 and made the ledger
incapable of reporting a gap. A metric that cannot fail is not a check.

## 2 · Three sittings read but not seeded

Two end-of-year papers are authored end to end: **EOY 2025 (199)** and
**EOY 2024 (198)**. The end-of-module sittings are extracted and cached and have
**no seed file**:

| sitting | sources | state |
|---|---|---|
| EOM 2024 (198) | `src_53e3b36fa1402b04bfe5`, `src_694d465ee07e776a73de` | text cached, not read into seeds |
| EOM 2023 (197) | `src_cb4e1c8f2b6215c7e8e5`, `src_aa69bb3b549517fbd6d9` | as above |
| EOM 2021 (196) | `src_0a38f29ffce829755dd2`, `src_0210fe49baedc57d233d`, `src_d6b0a2e395dcd5e7110d` | as above |

Also unseeded: the three Baqoon (second-sitting) papers, EOY 2022, EOY 2021
physiology, and the two "GATHERED" compilations.

**These matter more than their count suggests.** Reading the 2024 paper on top of
the 2025 one took the module from 21 concepts to 38 and produced **seven concepts
examined on both sittings** — and a repeat is the strongest blueprint evidence
this corpus holds. It is what lifts `weight_confidence` from 0.7 to 0.9. Each
further sitting read is more of that, and it cannot be recovered any other way.

An agent was part-way through the three EOM papers when it was interrupted; it
produced no files, so there is nothing half-written to clean up.

## 3 · The MCQ bank is extracted and mostly unauthored

**1,102 questions** are banked in `scripts/kasr/extract/102-INT/mcq-bank.json`
from the five department question books, with the correct-answer distribution
measured (a 28.7 / b 23.5 / c 23.4 / d 24.5) to show options are not being
dropped, and 24 items plus 140 key cells hand-checked against rendered page
images.

| | count |
|---|--:|
| tagged `102 INT` | 614 |
| of those, printed key and not suspect | 526 |
| **authored into `question/102-INT-MCQ-bank.md`** | **22** |

So **504 usable 102 questions are banked and unauthored.** The batch was cut short
mid-run; what exists validates clean at `fieldsUsed` 45.

Authoring one is not transcription. Every option needs an explanation naming the
specific misconception it catches, and the question needs a `main_concept` that
exists and an article that teaches it. That is the work, and 504 of them is a
programme rather than a session.

## 4 · Two chapters the question book has and the textbook does not

The question book opens with **"Introduction to Biochemistry and Nutrition"** —
chemical bonding, water, electrostatic interactions. It is not a chapter of the
department textbook: Part I's contents page (physical p3) lists fourteen chapters
and this is not among them.

So **the question book's chapter structure is its own and does not mirror the
textbook**, and the subject tree — built from the textbook, as it should be — has
no node for it. **Four banked items carry no `modulePathGuess` for this reason**
and three more physiology items carry none.

Recorded rather than resolved. Inventing a subject node to hold them would put a
chapter in the tree that the department's own book does not have. The honest fix
is a faculty ruling on whether that chapter is taught.

*(103 reports the same shape in its half of the same book — a 22-item
"Biochemistry Of Diabetes Mellitus" chapter absent from its textbook.)*

## 5 · Seventy-six media requests outstanding, ten questions blocked

Nothing has been supplied. Counted from the batches rather than asserted, and
cross-checked against what `medical:batch` itself parses:

| batch | requests | of those, `required` |
|---|--:|--:|
| `article/102-INT-biochemistry.md` | 44 | 29 |
| `article/102-INT-physiology.md` | 27 | 18 |
| `media-requests/102-INT-media-requests.md` (question-attached) | 5 | 5 |
| **total** | **76** | **52** |

The validator reports `mediaRequests: 44` and `27` for the two article batches,
which matches the count above — the number is checkable rather than claimed.
*(An earlier version of this section said "five", counting only the
question-attached ones and silently omitting the articles' 71. A count in a
document whose whole argument is that counts should be checkable is worth
checking.)*

**Ten questions cannot be sat at all without an asset** — three diagram questions
on the 2025 paper, two on 2024, and the sub-parts hanging off them.

No URL was invented, no image was described as though it were present, and **no
diagram question was rewritten into prose**. That third one is the tempting move
and it is the one that quietly destroys the question: "name the enzyme that
converts arachidonic acid to PGH2" is answerable without the figure, but it hands
the student the pathway position the original made them read off the diagram.

How much is recoverable differs per diagram and the requests say which. Diagram
(2)'s numbering is fully determined by its own sub-questions; **Diagram (3)'s
blanks 1 and 2 carry identical sub-questions and cannot be told apart from the
text at all** — that ordering is recorded as unverified rather than asserted.

## 6 · No typed relations

`relations/` holds nothing for this module. The concepts carry
`related_concept_ids` as `[clear]` with a stated reason: an untyped neighbour
list carries almost no information, and the relationship pass types the edges
properly. `prerequisite_of` and `often_confused_with` are the two that would earn
their keep here — the module is a chain of metabolic and molecular steps, and
which idea a student must hold before another is exactly what a revision
sequencer needs.

## 7 · No practicals, no glossary

Both `practical/` and `glossary/` are empty for 102. The practical manuals are
read and cached — `Dpt book Physio Practical 1st Year` (138 pages), the Zaytuna
biochemistry practical books (175 pages each), `All Practical slides 102` (56
pages) — and nothing has been made from them.

## 8 · Three question columns owed, blocked on 101

102's written batches score `fieldsUsed` **34 and 35** against a ceiling of 41.
Three of the seven-column gap is deliberate and belongs here rather than in a
commit message.

`concept_ids`, `contextual_concept_ids` and `exam_weight_by_year` are
unconditional in the emitter and fully derivable for **both** modules — so
emitting them rewrites all seven of module 101's committed written batches. The
gate on the toolchain merge was that 101's bytes must not move, and a content
change to another lane's already-applied batches is not something to smuggle
inside a generator port.

They land when 101 next regenerates, which is its call and its commit.

*(A fourth, `resource_ids`, is not owed: a question's `resource_ids` resolves
against the catalogue store, and this module's catalogue batch cannot be
imported yet — see §9. The remaining three, `vignette`, `derived_from` and
`attachments`, genuinely do not apply.)*

## 9 · Smaller things, named

- **One claim has a citation but no span.** `CLM-FND-MEMBRANE-FLUIDITY-DETERMINANTS-01`
  is supported by the book (physical p34) and quoted by its citation, but no
  sentence in the lipids article teaches it, so there is nothing for a span to
  attach to. It is deliberately **not** listed in `claims-without-a-span.txt` —
  listing it would strip a real, cited claim off its concept.
- **Five single-best-answer questions on the 2024 paper are excluded from the
  written batch.** The paper prints lettered options and no mark value; they
  belong in the MCQ route, and what is owed is four option explanations each.
  Recorded in the seed file's `unsat`.
- **The catalogue-resource batch is staged outside the import root**
  (`scripts/kasr/extract/102-INT/102-INT-catalogue-resources.md`, 69 records).
  `medical:batch` has no contract for a catalogue resource and reports the file
  as `kind: "unknown"`, which fails CI for every lane. It waits on the validator
  learning the contract, or the workflow skipping `resource/`. Nothing depends on
  it: a concept's `resource_ids` resolves against the *evidence* store, which is
  authored.
- **`arabic_label` is blank on all 38 concepts**, with a stated reason. Teaching
  at this faculty is in English and the department book prints no Arabic term.
  Transliterating one is not the same as researching a reviewed term.
- **Seven of the year book's chapters conflict with the module book's**, recorded
  on each record in `physio-chapters.json` as `conflict` and resolved nowhere.
  The sharpest is that the module book has no `Leucocytes` chapter at all while
  the year book does, and the orientation is silent — so no record claims those
  pages.
