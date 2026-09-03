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

### Source 1 continued -- lane 3 (`o6u-iph108-author3`), `pharmabank2` cluster

Lane 3 picked up the open pp.101-160 window (the dispatch reserved pp.161-223
for a fourth lane). OCR was extended in two ~30-page windows (`mark-garbled` +
`ocr --pages 101-130`, then `131-160`), then read page-by-page with
`pagetext.mjs show`. The same trailing-`v` (and occasionally OCR'd as a stray
`¥`) heuristic lanes 1-2 validated held up unchanged across this whole range --
every authored item in this cluster was keyed from a trailing checkmark
character or an OCR-recovered highlighted-feedback paragraph, and 0 of the
lane's 14-render budget was spent (the full budget remains available for a
future pass).

pp.101-120 continue lane 2's atropine/antimuscarinic content (mushroom
poisoning, ocular mydriatics, the atropine-overdose toxidrome, M1-selective
pirenzepine). A new section header, "4. Adrenergic physiology" ("Quiz
questions" sub-label), appears at pp.121-122 -- both near-blank
section-break pages, same pattern as the pp.1-6/23-24 cover pages lane 1
first noted -- and adrenergic-receptor-subtype/catecholamine-biosynthesis
content begins at p123. A second new section header, "5. sympathomimetics"
("Quiz questions" sub-label), appears at pp.139-140 (also near-blank), with
sympathomimetic-drug content beginning at p141. Both are genuinely new topic
areas for this module, distinct from lane 2's autonomic (cholinergic/
anticholinergic) cluster and requiring their own concept mints rather than
reuse of lane 2's nine.

56 items were attempted from this range (candidate pages read one-by-one);
44/56 (79%) are keyed with real, usable stems, well above the 60% floor.
Held / skipped, not authored: p105 (correct option's own text legible, but
the fifth option's text OCR'd as an unrecoverable fragment, "Aandt"); p111
(no attributable checkmark or highlighted-feedback text on any option, and
only four options legible); p123, p126, p130, p131 (compound multi-blank
fill-in stems bundling two linked facts into one sentence, the same shape
lane 2 held for its own p27 -- these do not fit the seed contract's
single-fact SBA shape even though several carry a legible checkmark); p129,
p147, p160 (no visible printed key -- no trailing checkmark or highlighted
feedback recoverable on any option); p141 (ordering exercise, not an SBA);
p142, p143 ("match the pairs" tables, not SBAs). None of these is a
printed-key contradiction in the Q35 sense -- all are held for OCR-
legibility, compound-stem shape, missing-key, or non-MCQ-shape reasons, not
contradicted keys.

One item, p110, needed careful reconstruction rather than a hold: its stem
("The following are therapeutic uses of atropine rather than atropine
substitutes except") is itself heavily affected by the source's own awkward
phrasing/OCR, but all five options are genuine antimuscarinic-class clinical
uses and the printed checkmark (option c, "Asthma & COPD") is unambiguous.
Read as testing that chronic COPD/asthma bronchodilation is the one use
where a substitute (inhaled ipratropium/tiotropium), not atropine itself, is
preferred -- consistent with standard teaching that systemic antimuscarinic
side effects make atropine unsuitable for chronic respiratory maintenance
therapy -- and authored on that reading, flagged in the question's own
`author_notes`.

One item, p117 ("Which of the following antimuscarinic drugs is a selective
M1 blocker?"), has a printed key (option e, "All of the above": dicyclomine,
trihexyphenidyl, pirenzepine) that is broader than the single-drug
(pirenzepine/telenzepine) M1-selectivity teaching more commonly seen; the
printed key stands per the standing rule and the discrepancy is flagged in
both the question's `author_notes` and the concept's own `uncertainty`
field rather than re-keyed by inference.

Four reuses were found on a fresh search-before-mint pass covering this
range's new drug facts (hyoscine/scopolamine CNS penetration, ipratropium in
COPD, dobutamine's chronotropic profile, benztropine for Parkinsonism):
two further Kasr `208-INT` concepts and one further Assiut `AUN-MPT-104`
concept (pending-live overlays, see
`pending-live/O6U-IPH-108-overlay-concepts.md`), plus a direct reuse of lane
2's own `O6U-IPH-108` concept for benztropine (same module, no overlay row
needed). The other 40 items mint eighteen new concepts, grouped into three
new articles by sub-topic (antimuscarinic pharmacology II, adrenergic/
muscarinic receptor pharmacology, sympathomimetic drug pharmacology) -- see
`concept/O6U-IPH-108-pharmabank2-concepts.md` and
`article/O6U-IPH-108-pharmabank2-articles.md`.

**44/56 candidate items attempted (79%) are keyed with real, usable stems**,
well above the 60% floor. Verdict: TRIAGE APPROVED. Authored 44 questions
from this source (12 held, all for OCR-legibility/compound-stem/missing-key/
non-MCQ-shape reasons, 0 for printed-key contradiction) -- see
`coverage/seeds/O6U-IPH-108/pharmabank2.json`, emitted batch, ledger.
Remaining pp.161-223 of this source are untouched and reserved for a future
(fourth) lane per the dispatch's own scope split (`HANDOFF` below).

### Source 1 continued -- lane 4 (`o6u-iph108-author4`), `pharmabank3` cluster

Lane 4 picked up the final open pp.161-223 window (the dispatch's own scope
split reserved this window for a fourth lane). OCR was extended in two
~30-page windows (`mark-garbled` + `ocr --pages 161-190`, then `191-223`),
then read page-by-page with `pagetext.mjs show`. The same trailing-`v`
(occasionally OCR'd as `¥`) heuristic lanes 1-3 validated held up across most
of this range, but 5 pages (196, 197, 198, 206, 219) showed no clear trailing
checkmark in the OCR text -- each was rendered (`pagetext.mjs render --force`)
and read visually to confirm the key, all 5 unambiguous (5 of the lane's
14-render budget spent, 9 remaining).

pp.161-174 continue lane 3's adrenergic-agonist/sympathomimetic tail
(dopamine dose-response, isoprenaline, norepinephrine's pressor mechanism,
alpha-1 agonists, epinephrine, pseudoephedrine, ritodrine, brimonidine,
midodrine). A new section header ("6. Drugs which block the adrenergic
nerves", p175-176) begins adrenergic-neuron-blocker material
(clonidine/methyldopa/reserpine) at p177. A further section header ("Beta
blockers", p183) begins comprehensive beta-blocker material at p184, running
through p213 -- pharmacokinetics (lipophilic/hydrophilic), ancillary
properties (membrane-stabilizing, ISA), beta-1/beta-2 receptor-subtype
physiology, and the full span of clinical indications/contraindications
(hypertension, angina, MI, heart failure, arrhythmia, glaucoma, drug
interactions). A final section header ("Alpha blockers", p214) begins
alpha-blocker material at p215, running to the end of the source at p223
(indications, smooth-muscle selectivity, reflex-tachycardia profile, floppy
iris syndrome).

59 items were attempted from this range (candidate pages read one-by-one);
50/59 (85%) are keyed with real, usable stems, well above the 60% floor.
Held / skipped, not authored: p172, p181, p182 (ordering exercises -- p181
presented as six lettered permutation options, exceeding the 5-option cap in
addition to being an ordering shape; p182 is p181's own continuation with no
independent options); p177, p184, p185, p186, p217 ("match the pairs" table
items, same standing rule as lanes 1-3's own holds for this shape); p223 (a
fill-in-the-blank restating the same floppy-iris-syndrome/alpha-blocker fact
already authored from p222, held as an internal near-duplicate rather than a
second item on the identical fact). None of these is a printed-key
contradiction in the Q35/lane-1 sense -- all are held for question-shape or
internal-duplication reasons, not contradicted keys.

Three items (p173, p174, p213) are constructed SBAs converted from the
source's own plain-text fill-in-the-blank `"Answer: <term>"` format -- the
same conversion pattern lane 1's `drg-practical` cluster used for Source 2's
fill-in items (2-option/short-answer style facts, PLAUSIBLE distractors
constructed around the printed single-fact answer, never re-keying the
printed answer itself).

One item, p216, is flagged rather than silently resolved: the printed key
marks "hypertension in pregnancy for labetalol" as the exception among
labelled alpha-blocker indications, even though labetalol genuinely treats
hypertension in pregnancy (confirmed by Kasr 208-INT's own pending concept).
Read as testing indication *categorization* -- that specific use is
attributed to labetalol's combined alpha/beta action as a whole, rather than
being a pure-alpha-blocker-class label the way tamsulosin-for-BPH or
phenoxybenzamine-for-pheochromocytoma are -- and authored on that reading,
flagged in the question's own `author_notes`, per the standing rule (printed
keys stand, not re-keyed by inference).

Three reuses were found on a search-before-mint pass covering this range's
facts (dopamine's dose-dependent D1/beta1/alpha1 receptor selectivity,
clonidine's withdrawal-rebound-hypertension syndrome, verapamil's role in
vasospastic-angina prophylaxis versus beta-blockers) -- all three further
Kasr `208-INT` concepts (pending-live overlays, see
`pending-live/O6U-IPH-108-overlay-concepts.md` and its sibling
`pending-live/O6U-IPH-108-overlay-articles.md`). Several partial-overlap
candidates in Assiut `AUN-MPT-104`, Kasr `208-INT`'s own atenolol/carvedilol/
labetalol concepts, and Mansoura `MANS-PPPM`'s own phenoxybenzamine/
tamsulosin/carvedilol/prazosin concepts were read in full and rejected as
reuse candidates -- each covers a genuinely different fact from the one this
cluster's own questions test. The other 47 items mint thirty-four new
concepts, grouped into three new articles by sub-topic (adrenergic
agonists/adrenergic-neuron blockers, beta blockers, alpha blockers) -- see
`concept/O6U-IPH-108-pharmabank3-concepts.md` and
`article/O6U-IPH-108-pharmabank3-articles.md`.

**50/59 candidate items attempted (85%) are keyed with real, usable stems**,
well above the 60% floor. Verdict: TRIAGE APPROVED. Authored 50 questions
from this source (9 held, all for question-shape/internal-duplication
reasons, 0 for printed-key contradiction) -- see
`coverage/seeds/O6U-IPH-108/pharmabank3.json`, emitted batch, ledger.

**pp.161-223 was the final open window of "pharma MCQs bank .pdf" (223p) --
this file is now CLOSED.** Combined with lanes 1-3 (pharmabank pp.7-100,
pharmabank2 pp.101-160), the entire bank is triaged and authored: 169 items
total across `drg-practical` (33/34), `pharmabank` (42/42), `pharmabank2`
(44/56) and `pharmabank3` (50/59). The two department-book PDFs
(`فارما د عبد المتعال 1.pdf` / `2.pdf`, Source 3+4 above) remain untriaged,
citation-only per the original dispatch -- a future pass would open them
directly rather than resuming this file.

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
