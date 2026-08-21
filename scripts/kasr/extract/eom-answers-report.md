# 101 ISK end-of-module answer keys, recovered from the ink

`scripts/kasr/extract/eom-answerkey.py` → `scripts/kasr/extract/eom-answers.json`

Six files carry `sourceCategory: "EOM"` under `101 ISK` in the manifest. They are
**four sittings, not six**: two of the six are unsolved second scans of sittings
whose solved copy is also present. Of the four sittings, **two carry an answer
key and two do not**, and one of the two that does not carries hand marks that
are a candidate's working rather than a key. The brief's premise — "coloured
highlights and hand-circles" — held for the highlights and did not hold for the
circles: there is not one circled option anywhere in these six files.

| file | sourceId | sitting | role | mechanism | questions parsed | recovered | ambiguous |
|---|---|---|---|---|---|---|---|
| `EOM ISK End 101– 2021 (answers).pdf` | `src_17bf088a37f1ab6540a3` | 18/12/2021 | solved | raster, pink + blue annotation ink | 116 of 120 | **109** | 7 |
| `EOM ISK End 101 — 2022.pdf` | `src_a54bbf7a625ba2b172fc` | 10/12/2022 | solved | raster, pink annotation ink | 115 of 120 | **102** | 13 |
| `EOM ISK 101 195 Answers.pdf` | `src_9e6aad6c6af097e473d6` | 18/12/2021 | **control** | none | 117 | 0 | — |
| `EOM ISK 101 - 2023.pdf` | `src_ce4292e31edea7517e7b` | 10/12/2022 | **control** | none | 119 | 0 | — |
| `EOM first 2021 101 INT end of module.pdf` | `src_9487fd713153c573087f` | 24/12/2020 | **control** | none | 37 of 48 | 0 | — |
| `EOM ISK EOM exam 2024.pdf` | `src_16f747e1171423933757` | 5/12/2024 | hand marks, no key | raster stroke | 15 of 120 | 0 | — |

**211 answers recovered across the two solved papers, with zero false positives
on three control copies and zero wrong answers against 44 hand-read questions.**

---

## Mechanism, per file

`qpdf --qdf --object-streams=disable … | grep /Subtype` over all six:

```
EOM ISK End 101– 2021 (answers).pdf   21 /Stamp  + 21 /Form  + 65 /Image
EOM ISK End 101 — 2022.pdf            22 /Square + 22 /Form  + 57 /Image
EOM ISK 101 195 Answers.pdf                                    11 /Image
EOM ISK 101 - 2023.pdf                                         33 /Image
EOM ISK EOM exam 2024.pdf                                      11 /Image
EOM first 2021 101 INT end of module.pdf                        6 /Image
```

There is **no `/Highlight` annotation anywhere**, so the cheap exact route — read
the text under the quads — does not exist here. Every page of every file is a
scanned JPEG, and `pdftotext` returns zero characters from all six. Both of 108's
inputs were therefore unavailable: no highlight annotations to read, and no text
layer to box options with. Everything below is the raster path.

The `/Stamp` objects on the 2021 paper are Apple Markup ink (`com.apple.ink.marker`
appears in their `/PPK` blob) and the `/Square` objects on the 2022 paper are
Preview rectangles; in both cases one object holds a page's worth of marks in its
`/AP /N` appearance stream, so **the object count is not a mark count** — 21 stamps
against 120 answers is not evidence of a flattened layer.

**Are any marks flattened into the page rather than annotation-borne?** No. Both
solved papers were rendered with `gs -dShowAnnots=false` and read by eye: page 3 of
the 2021 paper and page 3 of the 2022 paper come out completely bare, with none of
the eleven pink bands each carries with annotations on. Measured across all pages,
`annotationInkPixels` (the exact ghostscript on/off diff) is 2,680,083 on the 2021
paper and 2,164,444 on the 2022 paper, non-zero on every page, and **exactly 0 on
every page of all three controls** — ghostscript renders these files
deterministically, so an unsolved copy diffs to nothing byte for byte.

The extractor nonetheless thresholds the **annotations-on** render in HSV rather
than reading the diff. The diff is exact for these two papers and would have been
easier, but it is blind to a flattened mark by construction, and one code path
that handles both kinds cannot fail silently on a paper that turns out mixed. The
diff is kept as a per-page diagnostic, written to `annotationDiffPixels`.

## The colour rule, sampled per paper

108 warned that its own two sittings needed different numbers. Here the gap is far
wider, and a threshold carried across would have failed silently.

**2021 paper.** Sampled from the pink band over option c of question 10 on page 2:
modal pixel `(252, 240, 241)` — hue 355°, **saturation 0.048**, value 252. That is
one twentieth of 108's saturation floor. A second, unrelated ink appears once: the
blue band over option a of question 17 on the same page, modal `(157, 182, 220)` —
hue 216°, saturation 0.29.

**2022 paper.** Sampled from the band over option a of question 11 on page 2: hue
350–360°, saturation 0.20–0.26, value 224–255.

**2024 paper.** Nothing to sample. Fewer than 100 pixels on page 2 pass any
saturation floor at all, and every one of them is below value 180. Its marks are
grey ink.

Chosen thresholds, hue window 310°–20° (wrapping through 360°):

| paper | saturation | value | page-2 mark pixels | its control's page 2 | margin |
|---|---|---|---|---|---|
| 2021 pair | **0.03** | **220** | 135,956 | 3,368 | 40× |
| 2022 pair | **0.15** | **200** | 190,980 | **0** | ∞ |
| blue ink | **0.20** | 220 | — | 14 across 11 pages | — |

The value floor is set **near white**, which is the opposite of 108's choice and
for the mirror-image reason. 108's marks were translucent ink composited over
black glyphs, so its floor had to sit near black or the band filled with
glyph-shaped holes. These marks are highlighter over white paper and are the
brightest coloured thing on the page, while the thing that has to be excluded —
JPEG chroma ringing — lives on the *dark* edges of glyphs. On the 2023 control,
209,024 pixels pass a hue-and-saturation test at any brightness and **zero** pass
it at value ≥ 180. Same reasoning, opposite answer, because the mark is a
different physical object.

The blue window needed its own, much higher floor. At the 2021 paper's saturation
of 0.03 it collects roughly 15,000 pixels a page of scan cast — *more* on the
unsolved twin than on the solved copy, which is the signature of noise, not ink.
At 0.20 the control falls to 14 pixels across 11 pages and the one real blue mark
still registers.

## Morphological closing — the change that mattered most

The first honest run on the 2021 paper found 6 of 11 marks on page 3 and looked
entirely plausible doing it. The cause was not the threshold. It was that a value
floor near white removes the dark glyph pixels, so **a highlight band over a line
of text arrives as a row of short fragments with a hole at every letter**, and
108's run-length and area filters discard them as speckle.

Closing gaps of up to 0.08 inches within each row before grouping fixes it. On
page 3 of the 2021 paper, against eleven marks counted by eye:

| closing | regions kept | correct | wrong | unresolved |
|---|---|---|---|---|
| none | 16 | 6 | 0 | 4 |
| 10 px | 11 | 9 | 0 | 1 |
| **16 px** | **11** | **9** | **0** | **1** |
| 24 px | 11 | 9 | 0 | 1 |

Eleven regions against eleven marks read by eye. The control gives zero regions at
every one of those settings.

## The acceptance test — control copies

All three controls, over every page:

| control | path | annotation ink px | mark pixels passing the detector | regions surviving shape filter | stroke hulls | **answers attributed** |
|---|---|---|---|---|---|---|
| `EOM ISK 101 - 2023.pdf` (10/12/2022 twin) | colour | **0** | 1,790 | 1 | — | **0** |
| `EOM ISK 101 195 Answers.pdf` (18/12/2021 twin) | colour | **0** | 34,884 | 1 | — | **0** |
| `EOM first 2021 101 INT end of module.pdf` (24/12/2020) | stroke | **0** | 0 coloured / 85,828 dark non-text | 0 | 97 | **0** |

**Two of the three numbers the brief asked for are exactly zero and one is not, so
here is what the non-zero one is.** A pixel-level zero is not reachable on the
2021 pair: those are JPEG scans and their chroma ringing is real, coloured, and
present on a paper with no marks at all. What is reachable, and what the run
achieves, is **zero regions that survive the shape filter and zero answers
attributed** — 34,884 scattered pixels over 11 pages, none of which forms a run
long enough or an area large enough to be a mark. The single region on page 1 of
each of the two twins is the coloured Cairo University crest on the cover, and it
overlaps no option box.

The margin that makes this believable is per-page and exact, because ghostscript's
annotations-off render shares the identical base image: **2021 solved 1,375,071
pink pixels against 40,679 in its own reference render and 34,870 on the unsolved
twin — a 34× margin; 2022 solved 1,471,369 against 1,687 and 0 — a 870× margin.**
Both are in `eom-answers.json` per page as `noise.pink.annotationsOnPixels` and
`annotationsOffPixels`.

The stroke path has its own control: the 24/12/2020 formative reads clean at both
110 dpi and 200 dpi, carries **zero** coloured pixels at any threshold, and the
stroke detector finds 85,828 px of dark non-text ink on it — scan speckle, page
creases and the grey page-number footer — which cluster into 97 hulls, of which
it attributes **zero** to an option. That is the containment rule's false-positive
test, and it passes.

## Verification against hand-read ground truth

Four pages were read by eye at 110 dpi before any number was trusted, and every
mark on them recorded by hand: pages 1 and 3 of the 2021 paper (20 questions) and
pages 1 and 2 of the 2022 paper (24 questions).

| paper | correct | **wrong** | refused as ambiguous | not parsed by OCR |
|---|---|---|---|---|
| 2021 | 18 / 20 | **0** | 1 | 1 |
| 2022 | 19 / 24 | **0** | 5 | 0 |
| **total** | **37 / 44** | **0** | 6 | 1 |

Zero wrong answers. Every failure is a refusal or an OCR miss, never a
misattribution.

## Where the missing answers went

Nothing was lost to the colour detector. On the 2022 paper it finds 122 mark
regions against 120 printed questions and on the 2021 paper 123; all of the
shortfall is upstream, in reading the option boxes.

**Option boxes come from OCR, and that is the real work item here.** With no text
layer, `tesseract --psm N tsv` supplies per-word boxes in the pixels of the render
itself, so the points-to-pixels mapping 108 needed disappears — mark geometry and
option geometry are already in one coordinate space. The price is that a box can
be wrong, and a wrong box turns a correct mark into a confident wrong answer. Two
guards:

- Three OCR modes are run per page (`--psm 4`, `6`, `11`) and each question keeps
  whichever parse recovered more distinct, unmerged options. `--psm 6` drifts
  across a printed row on the skewed 2022 scan and welds options together;
  `--psm 11` fragments wrapped options on the unskewed papers. Neither alone is
  right for all six. Adding the third mode took the 2022 paper from 108 parsed
  questions to 115.
- An option whose OCR text still carries another option's marker inside it spans
  two options, and the question is **refused rather than scored**. This fires 8
  times on the 2022 paper and twice on the 2021 paper, and each of those would
  otherwise have been a wrong answer at a confident-looking share.

**The 2022 watermark.** The scan carries a "DOCTOR HOUSE" wordmark and a dome
graphic printed across the option text. It is page content, not an annotation, so
`-dShowAnnots=false` does not remove it. It is neutral grey and produces no colour
false positives, but it sits on top of the text and is the main reason that paper
parses 115 questions where its unsolved twin — the same exam, a cleaner scan —
parses 119. `repair-options.py` was not run on any of these files.

## Stem polarity and what a mark means

A marked option is not automatically the answer: on a negative stem an examiner
may tick the true distractors instead. Every row records `stemPolarity` and
`markConvention`.

The convention is inferred from each paper's own marks, and the test is **not**
"do negative stems carry several marks" — a paper where a fifth of *every*
question carries two bands would fail that test for reasons unrelated to polarity.
It is whether negative stems carry several marks *at a materially higher rate than
positive ones*:

| paper | negative stems | multi-marked | positive stems | multi-marked | verdict |
|---|---|---|---|---|---|
| 2021 | 21 | 0 (0%) | 95 | 1 (1%) | `marks-answer` |
| 2022 | 30 | 4 (13%) | 85 | 9 (11%) | `marks-answer` |

Both papers mark the answer. The 2022 paper's double marks are double marks — they
occur at the same rate on positive stems — not a distractor convention, and they
are refused individually by the share test rather than by polarity. The negative
stems themselves are read correctly: all 51 detected are genuine ("select the
false answer", "…all of the following except", "which does NOT abduct the hand").
The first pass, which asked only whether negative stems were multi-marked, called
the 2022 paper mixed and refused 29 answers that were fine.

## The hand-circle rule — what it needed, and what this corpus gave it

The rule asked for was built and is on its own code path, recorded as
`rule: "containment"` on every row. What it needed beyond 108's method, in order:

1. **Invert the pixel test.** 108 classifies mark pixels by colour. A pencil
   stroke is the same grey as the print, so colour cannot separate them. What
   separates them is position: **printed glyphs are cut out** — every OCR word box
   dilated by 4 px is masked off — and dark, near-neutral ink surviving inside the
   text column is a candidate stroke. That also removes page rules and furniture,
   which sit outside the column.
2. **Group, then regroup.** The union-find grouping is deliberately left as 108
   wrote it, so a circle's top and bottom arcs stay two regions — they share no
   row. A second pass joins fragments whose bounding boxes come within 40 px into
   one hull. That is the annulus fix: the hull of a circle contains the option
   its arcs surround, which the arcs themselves never overlap.
3. **Score containment, not intersection.** An option counts as marked when 75% of
   its box falls inside a hull. Scoring intersection would give the circled option
   the *lowest* score on the page, because the ink is around the text and not on
   it.
4. **Two refusals the intersection rule does not need.** A hull larger than three
   times an option's area is a scribble or a margin stroke, not a circle, and is
   rejected before it can claim anything (`CONTAIN_SLACK`). A hull that contains
   two option boxes returns `null` with the hull geometry rather than the nearer
   option — the loose circle around two answers.

**And the honest part: this corpus contains no hand-circled option, so the rule is
implemented and exercised but not validated on a positive case.** Both hand-marked
files were read page by page:

- The **24/12/2020 formative** carries no mark of any kind. It is a control, and it
  is the rule's negative test: 97 hulls of non-text ink, zero attributions.
- The **5/12/2024 paper** is marked throughout, and none of it is a key. At 1200
  dpi the mark on each option letter is unmistakably a hand-drawn diagonal pen
  stroke — tapered, lighter grey than the printed glyph — and **it is present on
  every option of every question**, so it carries no information about which one
  is right. On top of that there are scattered `X` eliminations, circled `?`
  marks, handwritten notes ("Lateral", "Medial half"), and strike-throughs: a
  candidate's working copy. It is also the reason that paper parses only 15 of its
  120 questions — the stroke through each `a.` `b.` `c.` `d.` merges with the
  glyph and tesseract reads the letters as `-`, `*-`, `6`, `A`. **No answers are
  banked from it**, and none should be.

If another lane wants to inherit the annulus rule, points 1–4 are the whole of it,
in `stroke_page`, `stroke_clusters` and `score_stroke`. Point 2 is the one that is
easy to get wrong, and note that the closing operation added for the highlight
bands (`runs_from_flags(..., close=)`) does the same job from the other direction
and can substitute for it on a tightly drawn circle.

## Ambiguous cases

20 across the two solved papers; all carry the geometry that made them ambiguous
in `eom-answers.json` under `optionScores` and `optionBoxes`.

| paper | page | printed q | reason |
|---|---|---|---|
| 2021 | 2 | 17 | **two ink colours on one question.** Pink over option b at 0.73, blue over option a at 0.20, and a heavy black `X` struck through options b and d. A later correction cannot be ranked against the original by geometry, so the question is refused. Read by eye, the examiner appears to have crossed out the pink b and re-marked a in blue — but that is a reading of intent, not a measurement, and it is not banked. |
| 2021 | 1, 4, 4, 6, 11 | 7, 34, 36, 61, 120 | no mark region covers any option box by 12% — bad OCR boxes (q7's option d box is 1,452 px wide, spanning the page) |
| 2021 | 10 | 107 | OCR read two options as one box |
| 2022 | 2, 3 | 15, 26, 28 | mark spans more than one option (q15: d=0.93 **and** b=0.49 — two bands) |
| 2022 | 1 | 2 | mark spans more than one option (d=0.33, b=0.18) |
| 2022 | 2, 2, 4, 5, 6, 8, 8 | 17, 19, 41, 58, 68, 85, 89 | OCR read two options as one box; each would have been a wrong answer if scored |
| 2022 | 1, 11 | 4, 113 | no mark region reaches 12% of an option box |

## Cover dates — the corrections held

Every cover was rendered and read. All three manifest corrections are confirmed,
and no further disagreement was found.

| file | filename says | cover says | verdict |
|---|---|---|---|
| `EOM ISK 101 - 2023.pdf` | 2023 | `Module Code: ISK-101`, `Date: 10/12/2022`, 72 marks, 120 MCQs, 11 pages | **correction confirmed**; and it is the unsolved twin of `EOM ISK End 101 — 2022.pdf`, page for page |
| `EOM ISK End 101 — 2022.pdf` | 2022 | `Date: 10/12/2022` | agrees |
| `EOM ISK End 101– 2021 (answers).pdf` | 2021 | `Date: 18/12/2021` | agrees; and it does carry answers |
| `EOM ISK 101 195 Answers.pdf` | "Answers" | `Date: 18/12/2021` | **correction confirmed**: zero annotations, zero marks, byte-identical with and without annotations on all 11 pages. It is the unsolved twin, not an answer key. |
| `EOM ISK EOM exam 2024.pdf` | 2024 | `Module Code: ISK-101`, `Date: 5/12/2024`, 72 marks, 120 MCQs, 11 pages | agrees |
| `EOM first 2021 101 INT end of module.pdf` | 2021 | `END Module: INT-101`, `Total Marks: 24`, `Time allowed: 60 min`, `Date: 24/12/2020`, `48 Multiple Choices questions (½ mark for each question) in 6 pages` | **correction confirmed**, verbatim, including the `INT-101` module code that disagrees with the `ISK-101` on every other cover here. Not resolved; see below. |

**`src_9487fd713153c573087f` — reported, not acted on.** Its cover reads
`END Module: INT-101` where all five other covers read `Module Code: ISK-101`, and
its shape (48 MCQs, 24 marks, 60 minutes, 6 pages) is nothing like the 120-MCQ,
72-mark, 120-minute, 11-page shape of the ISK papers. Its content is histology and
cytology — iron hematoxylin, mitochondria, centrioles, kinetochores, epithelium —
which is 101 ISK material. Code and content disagree. It carries no answers in any
case, so nothing is banked from it either way, and the disagreement is left for a
faculty reader.

## What to bank

Four sittings, two with keys. Bank answers from **`src_17bf088a37f1ab6540a3`**
(18/12/2021) and **`src_a54bbf7a625ba2b172fc`** (10/12/2022) only. The other four
files contribute no answers: `src_9e6aad6c6af097e473d6` and
`src_ce4292e31edea7517e7b` are unsolved second scans of those same two sittings —
distinct sha256s, so neither byte dedup nor stem clustering will collapse them and
the drop has to happen at the target filter — `src_9487fd713153c573087f` is
unmarked, and `src_16f747e1171423933757` carries working, not a key.

`joinKey` is `<sourceId>:s1:p<NNN>` where `NNN` is the question's position in the
paper, not its printed number. The printed number is kept alongside as
`printedNumber` but is not the key: it is read by OCR from a scan and cannot be
trusted to be unique or even correct.

## Reproducing this

```
python3 scripts/kasr/extract/eom-answerkey.py                 # all six, ~15 min cold
python3 scripts/kasr/extract/eom-answerkey.py --only <sid>    # one paper
python3 scripts/kasr/extract/eom-answerkey.py --calibrate     # the threshold grids
python3 scripts/kasr/extract/eom-answerkey.py --force         # ignore every cache
```

Results are written after each paper, so a run that dies part-way keeps what it
had. `eom-renders/` holds the page rasters and the per-page tesseract TSV; both
are caches, both regenerate from the PDFs, and both are gitignored — the TSVs
were added to the index by a concurrent session before that ignore rule existed
and should be dropped from it. Everything is pure standard-library Python plus
`pdftoppm`, `gs`, `qpdf`, `pdfinfo` and `tesseract`; there is no numpy, PIL or
PyMuPDF on this machine and none is needed.

`repair-options.py` was not run on any file here, per instruction.
