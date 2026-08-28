# 102 INT — what is not done

Written so the gaps are a list somebody can pick up, not something a reader has
to infer from what is missing. Every item here was reached and stopped at for a
stated reason; none was overlooked.

## Papers read but not yet turned into content

| Sitting | Sources | Why it stopped |
|---|---|---|
| EOM 2024 (198), EOM 2023 (197), EOM 2021 (196) | `src_53e3b36fa1402b04bfe5` `src_694d465ee07e776a73de` `src_cb4e1c8f2b6215c7e8e5` `src_aa69bb3b549517fbd6d9` `src_0a38f29ffce829755dd2` `src_0210fe49baedc57d233d` `src_d6b0a2e395dcd5e7110d` | The extraction pass was interrupted before it produced a seed file. All seven are read and cached; nothing was written, so there is no half-written state to undo. |
| EOY 2022, EOY 2021, EOY 2019, the three Baqoon sittings, the two gathered collections | see the coverage ledger | Not started. Lower blueprint weight than the two end-of-year sittings that were done, which is why they were sequenced last. |

An end-of-module paper carries less blueprint weight than an end-of-year one and
the generator already weights it so. These are worth doing and are not urgent.

Adding one is a seed file plus one line in `PAPERS` in `build-batches.ts`, then
`build-plans.ts` to extend the article and claim assignments — which reuses every
existing ID rather than re-deriving it, so a rerun cannot mint a second article
for a chapter that already has one.

## The MCQ bank

**1,102 questions extracted, 22 authored.**

- `scripts/kasr/extract/102-INT/mcq-bank.json` holds all of them, each with its
  stem, options, printed key, source, page and module tag.
- `docs/Kasr-Source-Imports/question/102-INT-MCQ-bank.md` holds the 22 authored
  to the full contract — four or five options, each with an explanation naming
  the misconception it catches.

The gap is deliberate and is about the explanations rather than the questions.
Authoring the remaining 592 of 102's 614 means writing roughly 2,400 option
explanations, every one defensible from the department book. That is real work
and cannot be shortcut: an explanation reading "this is wrong" is the failure
the format exists to prevent.

**Owed to other lanes**, already filed as Wanted rows in `CLAIMS.md`:

| Lane | Items | Where |
|---|--:|---|
| `103 BMS` | 391 | `mcq-bank.json`, `module: "103 BMS"` |
| `104 CPS` | 97 | `mcq-bank.json`, `module: "104 CPS"` |

Both come from two books whose single manifest row belongs to `102 INT`, so 102
read them once and tagged every item with the module that *teaches* it. Neither
lane needs to re-read two OCR-only PDFs.

## The question book's chapters are its own, not the textbook's

`DPT BOOK MCQ D book bio 102&103 mcq` opens, on physical p5, with:

```
1) INTRODUCTION TO BIOCHEMISTRY AND NUTRITION
```

**The department textbook has no such chapter.** Its Part I contents on physical
p3 lists exactly fourteen, beginning at `I. Amino Acids of Biological Importance`,
and the subject tree in `academic/102-int-structure.md` is built from that list.
So the question book is not an index into the textbook; it has a structure of its
own, and the two do not correspond chapter for chapter.

The cost to 102 is small and bounded: **seven of the module's 614 banked items
carry no `modulePathGuess`**, four of them these opening bonding questions, and
**zero carry a guess that fails to resolve** against the tree. Nothing was filed
under an invented node — a path that stops matching partway resolves to nothing
and files the item nowhere, which is worse than an honest blank.

What is owed is a decision, not a fix: either the tree gains a node the
department book does not name, or those items stay unplaced. That is a faculty
question about what module 102 teaches, and this pass deliberately did not answer
it.

*(103 hit the same thing harder — a 22-item "Biochemistry Of Diabetes Mellitus"
chapter absent from its textbook's ten. Any lane reading a department question
book should check its chapter list against the textbook's before mapping.)*

## Evidence

- **136 MCQ answers exist on the page and five OCR passes could not agree.**
  Each item names its key page. A human with the PDF open could clear most in an
  hour.
- **`CLM-FND-MEMBRANE-FLUIDITY-DETERMINANTS-01` has a citation but no span.** The
  book supports it and the claim quotes the page; what is missing is a sentence
  in `ART-102-BIO-LIPIDS-OF-BIOLOGICAL-IMPORTANCE` that teaches it. It is
  deliberately **not** listed in `claims-without-a-span.txt` — see that file's
  own note, which explains why listing it would strip a real, cited claim off its
  concept.
- **Three claims want a second span**, where the article asserts a claim's two
  halves in two non-contiguous sections: HbA1c, amino acid classification, and
  post-translational modification.

## Blocked on an asset

Five questions across the two end-of-year papers depend on a figure the corpus
does not contain. Each carries a `media_recommendations` block marked
`Priority: required` and appears in
`docs/Kasr-Source-Imports/media-requests/102-INT-media-requests.md`. **No
question was rewritten into prose to route around a missing figure** — doing so
hands the student the answer the diagram was asking them to read off it.

For Diagram (3) of the 2025 paper, blanks 1 and 2 carry identical sub-questions
and cannot be told apart from the text at all. That ordering is recorded as
unverified rather than asserted.

## Five single-best-answer questions on the 2024 paper

`P4`–`P8` print lettered options in the stem and no mark value. They are recorded
in that paper's seed file as `mcq_single_best` and **skipped by the written
batch**, which has no column for an option; the build says so on stdout each run.
The stem, options and correct answer are all captured. What is owed is the four
explanations each.

## Not this module's to fix

- **`mcqConceptBlock` does not emit the nineteen must-be-present columns.**
  `101-ISK-mcq-concepts.md` scores `fieldsUsed: 34` and will fail
  `medical:audit` on all nineteen — the same gap `conceptBlock` had until this
  module's pass, and the same one-line fix: a call to `conceptPresence()`. The
  MCQ lane owns that emitter.
- **101's own concept batch is at `fieldsUsed: 35` and would now regenerate at
  54**, zero errors, because the widening is in the shared emitter. Its committed
  bytes were deliberately left untouched; all it needs is a rerun.
- **The catalogue-resource contract has no validator branch.**
  `102-INT-catalogue-resources.md` — 69 records, complete — is staged in this
  folder rather than in `docs/Kasr-Source-Imports/resource/`, because
  `medical:batch` reports it `kind: "unknown"`, which fails CI for every lane. It
  moves the day `detectBatchKind` learns the contract. Nothing depends on it: a
  concept's `resource_ids` resolves against the *evidence* store, which is
  `evidence/102-INT-sources.md` and is complete.
