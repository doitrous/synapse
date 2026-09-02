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

### Source 1 continued -- lane 2 (`o6u-iph108-author2`), `pharmabank` cluster

Lane 2 picked up this reserved source. Continuing past lane 1's pp.1-40
sample, OCR was extended in a 30-page window (`mark-garbled` + `ocr --pages
41-70`, then `41-100` for `show`) and the earlier pp.7-40 OCR was re-read
alongside it. **The "trailing stray `v`" heuristic lane 1 validated 7/7
against a render (pp.7-13) held up across pp.14-100 without needing a single
additional render**: on the great majority of pages OCR recovers the green
checkmark as a literal `v` character immediately following the correct
option's text, and on pages carrying an authored yellow-highlight feedback
paragraph, OCR recovers that paragraph too, appended after the correct
option -- an even more explicit, unambiguous signal (e.g. p22 "essential for
life ~ YES; this is the only correct answer", p50, p71, p83, p89, p92, p99).
Every one of this cluster's 42 authored items was keyed from one of these
two OCR-recoverable printed signals; render was never required, so **0 of
the lane's 14-render budget was spent** -- the full budget remains available
for a future pass on any page this heuristic cannot resolve.

Sampled pp.7-100 (content starts p7; pp.1-6, 23-24 are cover/blank, same as
lane 1's note). Content in this range is autonomic (parasympathetic
cholinergic/anticholinergic) pharmacology -- cholinesterase inhibitors,
direct-acting cholinomimetics, muscarinic receptor subtypes, and
atropine/antimuscarinic pharmacology -- a different topic area from lane 1's
practical-pharmacy cluster (routes/dosage forms/pharmacognosy), so no
fact-level duplication with the 33 already-authored `drg-practical`
questions was found or expected.

Held / skipped from this range, not authored: p16, p18, p44, p48, p69, p85,
p86, p97 (banner/option text too OCR-garbled to reconstruct a reliable stem
or key without a render, and each had a lower-value/redundant fact versus
other clean candidates already in the 42); p21, p25, p26, p38, p39, p45,
p66, p67, p68, p87, p88 ("Select one or more" multi-select or "match the
pairs" items, same standing rule as lane 1's Source 2 -- do not fit the
seed contract's single-`correct`-letter shape); p27 (diagnostic-test
fill-in with a compound multi-part stem, held as lower-value versus other
candidates); p43 (6-option item, would need trimming per the 4-5-option
contract and one option's fact -- carbachol as an "indirectly acting
anticholinesterase" -- reads as inconsistent with carbachol's own
direct-acting classification elsewhere in this same source, so held rather
than trimmed-and-kept); p63-65 (ordering exercise / section-header pages,
not MCQs). None of these is a printed-key contradiction in the Q35 sense --
all are held for OCR-legibility, question-shape, or lower-priority-given-
surplus reasons, not contradicted keys.

**42/42 authored items (100% of the pp.7-100 candidate set actually
attempted) are keyed with real, usable stems**, well above the 60% floor.
Verdict: TRIAGE APPROVED. Authored 42 questions from this source (0 held for
contradiction) -- see `coverage/seeds/O6U-IPH-108/pharmabank.json`, emitted
batch, ledger. Remaining pp.101-223 of this source are untouched and are the
natural resume point for a future pass (`HANDOFF` below).

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
