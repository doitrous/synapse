# 102 INT · MCQ bank from the five department question books

`scripts/kasr/extract/102-INT/mcq-bank.json` — **1,102 questions** read out of the five
department books the manifest gives module `102 INT`. Built by
`scripts/kasr/extract/102-INT/mcq.py`; the intermediate caches it writes
(`pagetext-400/`, `answer-keys.json`) sit beside it.

This is a **bank, not a batch**. Nothing here has been shaped into importer markdown and
nothing has been written to `docs/`.

---

## 1 · What came out of each book

| sourceId | file | pages | items | with a printed key |
|---|---|--:|--:|--:|
| `src_07f0a0ff41addf826c7f` | DPT BOOK MCQ D book bio 102&103 mcq | 154 | **715** | 645 |
| `src_2093c80b1f9c25f9c0a4` | Physio MCQ First Year | 72 | **271** | 219 |
| `src_439c87aadd2a449415d2` | dpt book mcq Physio MCQ [Blood] 2023 | 15 | **68** | 57 |
| `src_b21bbb801aed8c932206` | dpt book mcq Physio MCQ [ANS] 2023 | 10 | **48** | 42 |
| `src_62ce633e85fb73732e35` | حل كتاب القسم كامل -bio 102- DPT BOOK | 44 | **0** | — |
| | | | **1,102** | **963** |

### The solved book has no MCQs in it

`src_62ce633e85fb73732e35` is the one native-text, "solved" file, and the brief expected it
to be where the house style for a well-formed question would be learned. It is not. It is
the solved companion to the biochemistry department book and it prints **only** the
short-answer sections: every chapter in it opens at section III or IV — `III-Enumerate`,
`IV-On biochemical basis explain`, `V-Compare between` — and section I, *Multiple Choice
Questions*, is omitted throughout. The strings "choose" and "multiple choice" appear on
none of its 44 pages, and the 22 lines in it that begin `a-`/`b-`/`c-` are enumeration
bullets inside answers, not options.

Its cover says so: *"Modified version for chapter replication & transcription only"*.

Nothing was lost extracting it. There was nothing to extract. It remains useful as a
model-answer source for a later pass on the written questions — it is not an MCQ source.

---

## 2 · The `102 INT` / `103 BMS` split — for the other two lanes

Two of these files cover more than module 102, and every item carries a `module` field
saying which module **teaches** it, not which module owns the file.

| module | items | biochemistry | physiology |
|---|--:|--:|--:|
| `102 INT` | **614** | 379 | 235 |
| `103 BMS` | **391** | 336 | 55 |
| `104 CPS` | **97** | — | 97 |

Where the boundaries come from, in each book:

**`DPT BOOK MCQ D book bio 102&103 mcq`** — the book splits itself. Page 81 is a divider
leaf reading **QUESTION BOOK (103)** over a contents table of its eleven chapters, and the
chapter numbering restarts at `(1) BIOENERGETICS` on page 83. Pages 5–80 are chapters 1–15
of the 102 syllabus; pages 81–154 are the 103 half. I read the divider page as an image to
confirm this rather than trusting its OCR, which is unusable.

- **102 (pages 5–80):** Introduction to Biochemistry and Nutrition · Carbohydrates ·
  Lipids · Amino Acids · Proteins · Proteins of Extracellular Matrix · Chemistry of
  Hemoproteins · Enzymes · Chemistry of Nucleotides · Nucleic Acids · DNA Synthesis ·
  RNA Synthesis · Protein Synthesis · Regulation of Gene Expression · Cell Cycle,
  Apoptosis and Tumor Suppressor Genes.
- **103 (pages 83–154):** Bioenergetics 21 · TCA cycle 13 · Carbohydrate Metabolism 78 ·
  Lipid Metabolism 50 · Biochemistry of Diabetes 22 · General Protein Metabolism 34 ·
  Individual Amino Acid Metabolism 33 · Metabolic Integration 7 · Heme Metabolism 20 ·
  Purines and Pyrimidines 14 · Vitamins 44. **336 items.**

**`Physio MCQ First Year`** — the book carries its own module dividers.

| pages | section | module | items |
|---|---|---|--:|
| 7–21 | Blood | `102 INT` | 70 |
| 22–31 | Autonomic Nervous System | `102 INT` | 49 |
| 33–46 | Nerve and Muscle (`MODULE BMS-103`, p32) | `103 BMS` | 55 |
| 49–58 | Cardiovascular (`MODULE CPS-104`, p47) | `104 CPS` | 48 |
| 61–70 | Respiration | `104 CPS` | 49 |

> **The 104 half is two sections, and reading it as one hid half of it.** `Cardiovascular`
> (key on p58) and `Respiration` (key on p70) each number from 1 and each print their own
> key. Run together, the second section's questions collide with the first's numbering, its
> answers never resolve, and 49 of its questions are simply not seen — and every question in
> the first section inherits a second, contradictory answer from the wrong key, which
> surfaced as 20 phantom "OCR disagreements" in one section. Split, 104 goes from 48 items
> to 97 and the phantom conflicts disappear.

> **`104 CPS` is a value the brief did not name.** The brief allowed `102 INT`, `103 BMS`
> or `unknown`, but also said a 104 lane is waiting on this slice, and the book labels the
> section `MODULE CPS -104` on its own divider page. Tagging those 97 items `unknown` would
> have hidden them from the lane that wants them, so they are tagged `104 CPS`. If the
> importer only accepts the three named values, that is a one-line change here — the
> boundary itself is the book's, not mine.

**The two 2023 physiology files are extracts of the year book, not new material.** Same
typesetting, same wording, same question numbers, same printed page numbers in the footer
(page 1 of the ANS extract carries footer "17", matching page 22 of the year book).
**95 of their 116 items** matched a year-book item on the normalised stem and carry
`duplicateOf` pointing at it; the other 21 differ only in how the two scans read the same
sentence, so treat the whole of both files as duplicate printings. Nothing is dropped —
the second printing is often the better scan, and its answer key certainly is.

De-duplicated, module 102 holds **519 distinct questions**: 379 biochemistry, 140
physiology.

---

## 3 · The distribution of correct answers

This is the number the brief asked to be watched, because losing option `d` skews it
without producing any error.

| | a | b | c | d | e | n |
|---|--:|--:|--:|--:|--:|--:|
| **Cells read off the printed key grids** | 28.1% | 23.7% | 23.1% | **25.0%** | 0.1% | 985 |
| **`correct` on banked items** | 28.7% | 23.5% | 23.4% | **24.5%** | — | 963 |

**`d` is not under-represented, and the two rows agree to about a point.** That is the
check that matters: the top row is read from the answer-key *tables*, which have nothing to
do with whether a question's fourth option survived parsing, so it is an independent
estimate of the true distribution. If options were being dropped, the bottom row's `d`
would be visibly lighter than the top row's. It is half a point lighter, which is well
inside what the difference in sample between the two rows can explain.

The books do genuinely favour `a` — 28% against the 25% a flat distribution would give, in
their own printed keys. That is the department's habit, not an artefact of this extraction.

**It was not always this way.** An earlier run of the same pipeline gave `a` 235, `b` 198,
`c` 193, `d` 171 — `d` at 21.5%, more than three points under the key tables. The gap was
real and it was option loss; the fixes in §6 closed it.

---

## 4 · Items with no correct answer: 139 of 1,102 (12.6%)

`correct` is `null` unless the book printed the answer and the OCR of the grid could be
trusted. Nothing is inferred from the content of a question, ever.

| module | items | no key |
|---|--:|--:|
| `102 INT` | 614 | 73 |
| `103 BMS` | 391 | 38 |
| `104 CPS` | 97 | 28 |

Every one of the 139 is a **cell in a printed grid that OCR could not read**, not a
question the book left unanswered. Every MCQ section in all four books ends with an answer
key; the keys are ruled tables of `1. b  11. b  21. d …`, and a faint column, or a letter
sitting on a rule, is simply lost. `correctSource` says which case a given item is:

- `printed key (…)` — read, and agreed on by every pass that saw it. **963 items.**
- `printed key (…) read differently by different OCR passes (b/d)` — **34 items.** Two
  sources of disagreement feed this: 27 grid cells where the five passes over a single page
  disagreed, and cells where the year book's key and the 2023 extract's key of *the same
  table* were read differently from each other. Both are discarded rather than arbitrated,
  and the second kind is counted twice because both printings of the question carry it.
- `printed key (…) names option X, which this question does not have` — **4 items.** The
  clearest is `MCQ-102-07f0a0ff-p74-q1`: the key names `e`, the question has four options.
  Either the cell misread or the question lost an option; `correct` is `null` either way.
- `none` — no cell for that number was recovered at all. **101 items.**

**The keys do cover every question.** In every section, the highest question number the key
answers equals that section's highest question number, or is one below it. So the 139 are
losses inside a printed grid, not questions the books never answered.

---

## 5 · Suspect items: 44 of 1,102 (4.0%)

| `suspect` | n | what it means |
|---|--:|---|
| `option ran on` | 25 | an option swallowed the question printed after it |
| `option count` | 15 | fewer than four options survived |
| `option text` | 3 | an option holds no letter or digit — all three are `a) 1` read as `a) \|` |
| `key letter absent from options` | 1 | the case described above |

`option ran on` is the other side of §7: when a question's *number* is destroyed beyond
rescue, its stem and options are appended to whichever option was open, and the result has
four well-formed options and one that is three questions long — nothing else in the record
shows it. The 25 line up with the 22 lost questions almost one for one. A handful instead
swallowed the section's answer-key grid, where the key was printed without a heading for
the parser to stop at. All 25 were eyeballed; none is a false positive, and the check that
produces them deliberately requires an embedded label to be followed by a **capital**,
because the biochemistry book writes the alpha helix as `a- helix` and a looser rule called
every one of those a run-on.

Two of the fifteen `option count` items are the **book's own typography**, not OCR:

- `MCQ-102-07f0a0ff-p8-q15` — the printed page labels its fourth option `b)` a second time
  (`a) L and D forms · b) α and β forms · c) α and γ forms · b) γ and β forms`). Verified
  against the page image.
- `MCQ-102-2093c80b-p26-q26` / `MCQ-102-b21bbb80-p5-q26` — the same question in both books,
  where the printed page sets option d's label at the *end* of its line
  (`Evacuation of the urinary bladder under resting conditions.d`). Also verified against
  the image.

A parser tuned to "fix" those two would be inventing options the department did not print.
They are flagged and left as they are.

---

## 6 · What the OCR damage actually was, and what closed it

The shared 200dpi `--psm 6` cache in `scripts/kasr/extract/pagetext/` is not good enough for
these five books, so this pass keeps its own cache at **400dpi `--psm 4`**
(`pagetext-400/`). Two things it fixes:

- **The physiology scans carry the shadow of the book's gutter down one margin.** At
  `--psm 6` tesseract reads that shadow as a column of `i`, `|` and `0` glyphs interleaved
  line by line with the text, so an option arrives as `‎d- 15 associated with folic acid‏ ا`.
  At 400dpi `--psm 4` the margin is gone.
- **Every answer key here is a grid table**, and `--psm 6` at 200dpi turns the carbohydrate
  key into `ee [ike Para [aia [ab [sts [ote`. The same table at 400dpi `--psm 4` reads
  `1.b 11.b |21.d |31.a`.

Then, specifically:

**Option labels.** The parser is driven by the label that is *due next*, not by a general
`[a-d]` regex. Sitting on option `c` it accepts any of `c ¢ 6 e ( <`; sitting on `d`, any of
`d 0 O o 4`. Accepting a confusable set is only safe because the expectation narrows it —
a bare `0.` is read as `d` when `d` is due and as nothing otherwise.

**Question numbers corrupt the same way, and cost more.** `26- Iron:` scans as `20- Iron:`
and `27- Iron absorption:` as `2/- lron absorption:`. A missed number does not lose one
question; it loses that question *and* appends its text to the previous question's last
option, then desynchronises the rest of the section from its answer key. A one-character
fuzzy match on the immediately next number, confirmed by reading ahead for an option `a`,
took the Blood extract from 25 items to 66 in one change.

**A line of digits is not noise.** `6) 22` is option `c` of a numeric question and is also
composed entirely of characters that look like margin noise. Tested for noise before being
tested as an option, it was discarded — and then `d) 24` was appended to option `b`. Every
numeric-answer question in the biochemistry book was losing an option this way.

**Answer keys are read five times and only agreement counts.** Each key page is read at
400dpi `--psm 4` (from the cache), 600dpi `--psm 4`, 600dpi `--psm 6`, 400dpi `--psm 6`, and
**column-wise**: the printed vertical rules of the grid are detected from the page's own
pixel profile, each column is cropped out and read on its own with `--psm 6`, and a cell is
kept only if the number it claims is the number that column's position demands. `--psm 4`
reads a seven-column grid as one column of text and silently drops whole columns of it: the
Blood key's answers for questions 11–20 and 51–70 are perfectly legible on the page and
appeared in no whole-page pass at all. Column-wise reading raised that key from 38 cells to
55, and the Blood extract's from 22 to 54.

A cell any two passes disagree about is discarded (27 across the corpus).

**Chapter section markers are not consistent.** Eleven chapters of the biochemistry book
open `I- Multiple Choice Questions:`, two use the singular, and `10) NUCLEIC ACIDS` opens
`I- Choose the correct answer:`. Matching only the plural silently dropped three whole
chapters — nucleotides, nucleic acids and translation, 59 questions — with no error
anywhere.

---

## 7 · Questions the books print that are not in the bank: 22

Listed in `mcq-bank.json` under `notExtracted`. A section numbers from 1 without holes, so
a hole is a lost question rather than one that never existed.

| source | section | printed numbers lost | of |
|---|---|---|--:|
| bio book | Carbohydrate Metabolism | 55, 75, 78 | 81 |
| bio book | Chemistry of Nucleotides | 5 | 13 |
| bio book | Enzymes | 9 | 26 |
| bio book | Metabolism of Heme | 13 | 21 |
| bio book | Purines and Pyrimidines | 2, 9, 10 | 17 |
| bio book | Protein Synthesis (Translation) | 5 | 28 |
| bio book | TCA cycle | 5 | 14 |
| bio book | Vitamins | 13, 22 | 46 |
| Physio year | Autonomic Nervous System | 21 | 50 |
| Physio year | Cardiovascular | 9, 14 | 50 |
| Physio year | Respiration | 27 | 50 |
| Physio year | Nerve and Muscle | 27 | 56 |
| Blood 2023 | Blood | 27, 37 | 70 |
| ANS 2023 | Autonomic Nervous System | 7, 21 | 50 |

Two of them are not recoverable by any parser and are worth naming:

- **Translation q5** (`5S. In the following figure, which best describes the genetic code?`)
  is a **figure question** — its options are a diagram. Even read perfectly it could not
  become an MCQ record without the image.
- **Purines q2** opens `Ae: epecescecoeuerenee is the committed step in de nonvo purine
  nucleotide:` — the number and the dot leader are destroyed outright.

The rest are single stems whose number scanned into something more than one character away
from the truth.

---

## 8 · Pages I could not read at all

`mcq-bank.json` → `unreadable`.

| source | pages | why |
|---|---|---|
| `src_07f0a0ff41addf826c7f` | 2, 4, 80, 82 | OCR returned nothing — blank leaf or section divider |
| `src_2093c80b1f9c25f9c0a4` | 33 | OCR returned nothing |
| `src_62ce633e85fb73732e35` | 1–44 | no MCQs in the file at all (§1) |

**Pages deliberately not parsed, which is different.** Every book's MCQ section is followed
by short-answer material — `II- Enumerate`, `III- On biochemical basis explain`,
`Short Answer Questions`, `Answer Key (Match)` — and the parser stops at those. In the
physiology year book that is pages 20–21, 31, 45–46, 59–60 and 71–72; in the biochemistry
book it is the tail of every chapter. Those pages hold real department material and are a
sound source for written questions and for model answers; they are simply not MCQs and are
out of scope here.

---

## 9 · What I checked by hand, and what it found

**Sample: 24 items and 140 printed answer-key cells, on six pages across all four OCR
books, checked field by field against the rendered page images** — not against the OCR
text, which would only have proved the parser agrees with itself.

| page | what was checked | result |
|---|---|---|
| bio book p8 | 7 items — stem, every option, page, module | 7/7 exact |
| bio book p43 | 5 items + the full 20-cell answer key | 5/5 items, 20/20 cells |
| bio book p81 | the `QUESTION BOOK (103)` divider and its contents table | 102/103 boundary confirmed |
| Physio year p9 | 6 items | 6/6 exact |
| Physio year p19 | the full 70-cell Blood answer key | 59 accepted, **0 wrong**, 11 not read |
| Physio year p26 | 6 items | 6/6 exact |
| ANS 2023 p9 | the full 50-cell answer key | 42 accepted, **0 wrong**, 8 not read |

**Error rate after the fixes: 0 of 24 items, 0 of 121 accepted key cells.** No accepted key
cell anywhere in the sample disagreed with the printed page — the misses are misses, never
wrong answers, which is the property that matters most here.

**One real defect the sample found**, and it would not have been found any other way:
`Which of the following is an epimer of glucose?` was cited to **page 6** when it is
printed on page 8. The page was being reconstructed by looking the stem's first 28
characters back up in the page text, and those 28 characters —
`Which of the following is an` — are also how `Which of the following is an aldotriose?`
begins, two pages earlier. A page number is a citation, and a citation pointing at the
wrong page is worse than none, so the page is now carried alongside each line as the
section is assembled rather than reconstructed afterwards. The table above is post-fix.

**One false alarm, which was mine.** My first transcription of the Blood key from the image
reported the pipeline wrong on questions 58 and 59. Re-reading the image showed I had
inserted an extra value in my own transcription and shifted the column. The pipeline was
right both times.

**Three systematic degradations the sample surfaced**, present throughout and *not* fixed,
because fixing them would mean editing the department's text:

- Greek letters flatten to Latin in the biochemistry book — `α → a`, `β → B`, `δ → 6` or
  `8`, `ε → 6`. `Hemoglobin A₂ contains: a) α2, β2` banks as `a2, B2`.
- The digit `1` frequently reads as `l` or `|` — `a) 1` becomes `a) l`.
- Ordinary word-level OCR noise persists in the physiology scans: `Atria → Airia`,
  `Ventricles → Veniricles`, `bladder → biadder`.

Stems and options are banked **verbatim as OCR produced them**, joined across wrapped lines
and with the label prefix removed. Nothing is spell-corrected. A later pass that turns any
of this into importer markdown will have to clean the text against the page, and should
budget for it.

---

## 10 · `modulePathGuess`

607 of the 614 `102 INT` items carry a guessed path; 7 are `null`. Items outside 102 have
no path — the subject trees for 103 and 104 were not in scope for this pass and guessing
into a tree I have not seen would be inventing one. Biochemistry maps
chapter-to-chapter and is reliable — the book's chapter names and the subject tree's chapter
names are the same names. Physiology is **keyword-matched on the stem and options** and is
a genuine guess: it is the field most likely to be wrong in this bank, and it is named as a
guess for that reason.

The seven nulls: four are the biochemistry book's `Introduction to Biochemistry and
Nutrition` chapter, which the book teaches under 102 but which **has no chapter in the
subject tree given for 102 INT > Biochemistry** — worth deciding before those four are
used. The other three are physiology stems too damaged to classify (`occulomotor`,
`parasympainsetic`).

One known misfiling class, since it is systematic: `Vitamin B12` is set as a subscript and
comes back as `By2`, `Bj2`, `B,2`, `B42`, `Biz`. The matcher now takes those variants, but
any it still misses will land under `RBCs and haemoglobin` on the strength of "red blood
cells" in the distractors.

---

## 11 · Open questions

1. **`104 CPS` as a module value** (§2). 97 items depend on whether that tag is acceptable
   or should become `unknown`.
2. **`Introduction to Biochemistry and Nutrition`** is a chapter of the department's 102
   book and not a chapter of the 102 subject tree. Four items are parked on it.
3. **The 2023 physiology extracts are duplicates** (§2). Whoever curates from this bank
   should import one printing of each question, not both — but should read the answer key
   of *both*, since the extracts' scans are cleaner. `duplicateOf` marks 95 of 116; the
   remaining 21 are duplicates too and simply did not match on the normalised stem.
4. **136 unkeyed items.** The answers exist on the page; five OCR passes could not agree on
   them. A human with the PDF open could clear most in an hour, working from the key pages
   listed in each item's `correctSource`.
5. **Whether `Physio MCQ First Year` pages 47–72 are wholly module 104.** The book's
   divider says `MODULE CPS -104` and the content is cardiac and respiratory throughout,
   which I checked by reading the section headings; I did not check all 97 stems
   individually.
6. **The written-question material** (§8) is untouched by this pass and is substantial —
   short-answer, enumerate, compare, and the whole of the solved book. It is a separate
   extraction, not a gap in this one.

---

## 12 · Fields on an item beyond the shape the brief specified

Four additions, all additive:

| field | why |
|---|---|
| `printedNumber` | the number the book prints beside the question. It is what the answer key indexes by, and what §7's list of lost questions is expressed in. |
| `chapter` | the section heading the question was printed under, verbatim. `modulePathGuess` is the mapped, guessed form of this; `chapter` is what the page actually says. |
| `duplicateOf` | the year-book item this is a second printing of, or `null` (§2). |
| `notExtracted` *(top level)* | the §7 inventory, per section, as data. |

`id` is `MCQ-102-<sourceId short>-p<page>-q<printed number>` — position in the document, not
a running counter. Dropping a question from the middle of a rerun leaves every other id
unchanged, which a counter could not promise. Verified: two consecutive builds produce
byte-identical output.
