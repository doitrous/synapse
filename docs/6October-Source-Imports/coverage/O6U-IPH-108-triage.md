# O6U-IPH-108 (`DRG` folder) -- triage

Sources: `docs/6October-Source-Imports/manifest/y1-sources.json` (`O6U-IPH-108`,
`topFolder: DRG`). Corpus root `/Users/doitrous/Desktop/Universities/6 October
University/Faculty of Medicine`. Sha256 of both PDFs opened this pass verified
against the manifest before use (`shasum -a 256`) -- both match exactly.

## Sample method (per dispatch)

`pagetext.mjs status` -> `mark-garbled` -> `pagetext.mjs ocr --pages a-b` in
windows of ~30 pages -> `pagetext.mjs show`. Sampled `pharma MCQs bank .pdf`
pp.1-40 and `all Practical pharma questions _compressed.pdf` pp.1-90 (dispatch
said sample pp.1-30 of the practical file; extended to 90 once the format
proved reliable and text-based, to reach a 30-50 item cluster from one source
without also having to lean on the render-heavy bank).

## Source 1 -- `pharma MCQs bank .pdf` (223p, 208/223 pages marked garbled)

A scanned Moodle "quiz preview/review" export, one question per page-image, no
text layer (OCR words=0 on nearly every page pre-mark). OCR recovers most stems
and options as plain text, but **the printed key is a small green checkmark
icon next to the correct option** -- sometimes paired with an authored
yellow-highlighted feedback paragraph, sometimes bare. OCR text alone is
**not reliable** for either the stem or the key on this file:
- The blue question-title banner is dropped from the OCR text entirely on some
  pages (e.g. p11, "Activation of muscarinic receptors does not result in" is
  present in the render but absent from `pagetext.mjs show` output) --
  confirms the LANE-CARD's character-spacing/dropped-content OCR trap.
- The checkmark sometimes survives OCR as a trailing stray `v` after the
  correct option's line (7 of 7 pages checked: p7, p8, p11, p12, p13 all
  matched between the OCR "v" heuristic and the rendered checkmark), but on
  pages with a highlighted feedback box the correct-option's OCR line can be
  garbled into nonsense instead (e.g. p9's option d, "All the above", OCR'd as
  a stray "a re").

7 pages (7, 8, 9, 10, 11, 12, 13) were rendered (`pagetext.mjs render --force`,
since OCR success flips `garbled` to `no` and the tool otherwise blocks
rendering a "clean" page) and read visually to confirm the key. All 7 had an
unambiguous single green checkmark on one option, matching a real
pharmacology fact in every case (acetylcholine synthesis site, Ca2+-dependent
vesicle fusion, ACh vasodilation via endothelial NO, ACh negative
chrono/dromotropy, muscarinic-receptor-blockade-sparing of the ventricle,
atropine-class mydriasis, decreased atrial excitability under muscarinic
blockade). This is a genuine printed/system-graded key (the green check is
Moodle's own review-mode grading mark, not a respondent's tick -- confirmed
because several of the 7 pages show the respondent's own radio selection was
WRONG for one page yet the checkmark still correctly flagged the different,
factually-correct option). **7/7 sampled = 100% keyed, real stems, printed
system key.** Readability index's "0 garbled" note for pp1-3,23-24 was itself
misleading (those are near-blank cover/section-break pages, not content).

**Verdict: TRIAGE APPROVED** (well above the 60% floor), but **not used for
this cluster** -- reading every item needs a render (no reliable OCR
shortcut), which is far more expensive per question than Source 2 below.
Reserved as a second cluster for a future pass; 7 items are already
render-confirmed and could seed it directly (see `field_notes` on none of
this cluster's authored items -- they are untouched this pass).

## Source 2 -- `all Practical pharma questions _compressed.pdf` (246p, 244/246 marked garbled) -- CHOSEN SOURCE

Also a scanned Moodle export, but a materially different and far more
reliable layout: **every question is a paired attempt+review page**, and the
review page prints its key as **plain, OCR-legible text**: `The correct
answer is: <exact option text>` (single-answer) or `The correct answers are:
<comma-separated option texts>` (multi-select). The header banner on every
page reads `IPH 108 / Practical sources of drugs-dosage forms-routes of
administration`, independently confirming this file is O6U-IPH-108 content
matching the manifest's module tag.

Sampled Questions 1-44 (pp.1-90; pp.1-2 are an Arabic cover scan and a title
slide, not content). Breakdown by answer format:
- **27 clean single-best-answer** ("Select one:", 4-5 options, one correct):
  Q3, Q5, Q6, Q7, Q8, Q9, Q11, Q12, Q14, Q16, Q18, Q19, Q21, Q23, Q25, Q27,
  Q29, Q30, Q31, Q32, Q33, Q34, Q35, Q36, Q39, Q41, Q44.
- **7 fill-in-the-blank, directly convertible to SBA** (the printed short
  answer becomes the correct option, 3 author-constructed distractors added
  around it, same pattern the IPA-107 cluster used to convert 2-option T/F
  into 4-option SBA): Q2 (astringent), Q4 (MDI), Q10 (aconitine/death), Q17
  (IM = depot route), Q38 (IV = irritant/large-volume route), Q40 (4 weeks),
  Q42 (atropine sulfate/water).
- 5 "match the pairs" items (Q13, Q20, Q28, Q37, Q43) and 4 multi-select
  "select one or more" items (Q1, Q22, Q26 -- Q22/Q26 skipped; Q1 also
  skipped) do not fit the seed contract's single-`correct`-letter shape and
  are held, not force-converted (Q1/Q22/Q26's "which is NOT correct" recast
  would have flipped the source's own intent rather than just reformatting
  it, so left alone rather than risk an inference).
- 2 True/False items (Q15, Q24, both "bioavailability of oral drugs is
  high/low") held rather than expanded to 4-option SBA -- the printed fact
  alone ("False") does not by itself supply four defensible, source-grounded
  options the way IPA-107's T/F statements did (those had a whole paragraph
  of adjacent facts in the same block to build distractors from; here there
  is no adjacent block of related printed facts).

34/44 sampled items (77%) are keyed with real, usable stems -- **well above
the 60% floor.** All keys read from the plain `The correct answer(s) is/are:`
text line, never from which option carries a `*` (that mark is the
respondent's own answer, frequently wrong -- e.g. Q29, respondent picked
"Morphine", printed key is "Dopamine"; Q31, respondent picked "Ouabain",
printed key is "Insulin"). Cross-checked every key against standard
pharmacology/pharmaceutics fact before authoring; one printed key uses loose
phrasing kept as-is (Q11 "the dose should be written alphabetically" for
narcotic prescriptions -- read as "written out in words," a real anti-forgery
convention, flagged in `author_notes`).

One of the 34, **Q35, was held rather than authored** on a closer render-based
check (p71-72): the question asks which statement about alkaloids is the
false EXCEPT-item, and its printed "correct answer" is "Alkaloid's name ends
with in" -- but the same review page's own explanatory paragraph, printed
directly beneath the options, affirms in full "Their names end with 'ine' e.g.
atropine, morphine" as a true fact. The printed key contradicts the source's
own printed explanation on the same page. Held per the standing rule
(contradictory items are held, not re-keyed by inference or fact-checked into
agreement) -- see `concept/O6U-IPH-108-new-concepts.md`'s alkaloid concept
`field_notes` for the full note. The underlying naming-convention fact
(alkaloid names end in "-ine") remains valid, independently well-established
pharmacology corroborated by that same paragraph; only Q35's own answer key
is unusable.

**Verdict: TRIAGE APPROVED.** Authored 33 questions from this source, held 1
(Q35, contradictory key) -- see `coverage/seeds/O6U-IPH-108/drg-practical.json`,
emitted batch, ledger.

## Source 3+4 -- department books (`فارما د عبد المتعال 1.pdf` / `2.pdf`)

Not opened this pass -- dispatch marks these citation-only (not exam banks),
and Source 2 alone supplied a full cluster. Left for a future pass as
`library_ids`/citation support once a second question cluster needs them.

## `pagetext.mjs keys` note

`keys` mode reported "no text layer -- keys need ocr+render" on every sampled
page of Source 1 and was not run on Source 2 (its key is plain post-OCR text,
not a visual mark, so `keys` mode does not apply). No red/bold/underline
detection was relevant to either source this pass.
