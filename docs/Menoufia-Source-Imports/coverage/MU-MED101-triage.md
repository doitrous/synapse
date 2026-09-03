# MU-MED101 (Foundation 1) — S3 tier-1 triage

## Tier-1 inventory sampled

| sourceId | File | Pages | Kind | Key convention | Disposition |
|---|---|--:|---|---|---|
| `mu_34ff78aabb8bfd729922` | EOM Practice - Foundation 1 - Support 43 - With Answers.pdf | 46 | full exam, compound (5 subject sub-blocks, each restarting Q-numbering) | red text on the correct option (Embryology sub-block also colours the whole stem red) | **chosen — authored from this round** |
| `mu_191aaaeeff88f7bfd219` | EOM Practice - Foundation 1 - Anatomy Embryology Histology - Answer-Labeled.pdf | 13 | full exam, ~37 raw items | yellow highlight on the correct option, `pagetext.mjs keys` reports only 3/38 (same trap as MED105/MED104) | confirmed keyed (1 render, p1: 4/4 keyed b/d/d/c) — **not authored this round, next resume-first** |

Both papers clear the 60% bar; Support 43 was picked first because its dominant key
convention (red text) is read directly by `pagetext.mjs keys` for most sub-blocks, needing
far fewer renders per authored question than the Answer-Labeled paper's highlight-only
convention.

## Support 43 — With Answers: structure and per-section keying

The file is one exam compiled from five subject sub-blocks, each restarting its own Q1:

| Sub-block | Pages | Raw items | Auto-keyed (`pagetext.mjs keys`) | Note |
|---|--:|--:|--:|---|
| Embryology | p3-11 | 36 (Q1-36) | 0/36 reported | **tool gap, not a true 0% — see finding below** |
| Biochemistry/Physiology (acid-base, ANS) | p13-22 | 38 (Q1-38) | ~34/38 | clean red-text-on-option, ordinary case |
| Anatomy (movements, bones, joints) | p25-31 | 24 (Q1-24) | 23/24 | **authored this round, see below** |
| Histology (cytology/genetics) | p33-38 | 22 (Q1-22, with a source-side duplicate "11." misnumbering that the render resolves) | 17/22 auto+render | **authored this round, see below** |
| p23, p46 | — | — | no text layer | scanned/blank pages, not part of any sub-block |

## Critical finding: the Embryology sub-block's key convention defeats `pagetext.mjs keys`

Unlike the later sub-blocks (correct option only turns red), Embryology colours **both the
question stem and the correct option** red. `pagetext.mjs keys` reported 0/36 marked for
this whole sub-block. One render (p3, Q1-4) confirms this is a tool gap, not an unkeyed
section: all 4 items visibly keyed (b/a/d/a), including one item (Q2, Turner syndrome
karyotype) whose apparently-wrong-looking key ("44+X") is actually correct once the paper's
own autosome+sex-chromosome notation is read literally (44 autosomes + 1 X = 45 total =
monosomy X). Embryology was not authored this round — flagged for the next resume so a
future pass does not re-spend a render confirming what this triage already confirmed.

## Anatomy sub-block (p25-31, Q1-24) — authored this round

23/24 auto-keyed by `pagetext.mjs keys` (all red-text-on-option, ordinary case). The one
unmarked item (Q8, "type of the first carpometacarpal joint") was resolved by render (p26-27
boundary): key = C, Saddle — the tool's silence here is a page-boundary split, not a missing
mark. **One separate tool-mismarking was caught by render**: `pagetext.mjs keys` reported Q15
("all of the following are typical long bones except") as key C (Ulna); the p28 render shows
the actual highlighted option is **D (Metacarpal)**, not C — Ulna would have been a
scientifically wrong key (ulna has two epiphyses, metacarpal has one), so the render also
serves as a sanity check the tool result did not survive. Rendered pages: p26, p27, p28 (3
renders, confirming Q8, Q12-15 as a block). Zero image-dependent items in this sub-block; 0
held.

## Histology sub-block (p33-38, Q1-22) — authored this round

17 keyed and authored, 5 held:
- Q17, Q18, Q20 — image-dependent (an "attached photo", a lettered mitosis-phase diagram
  A-D, and a lettered EM micrograph A-D respectively) — rule 3/9.
- Q21 — only 3 options printed in the source (a/b/c, no d/e) — below the 4-option floor.
- Q15 ("which statement is describing the opposite process?") — the stem itself refers to
  an antecedent question/process that is not printed on this page or the one before it; the
  key (B, "needs energy") cannot be safely bound to a reconstructable stem — held for stem
  ambiguity rather than guessed.

Renders: p33 (Q1-4, resolved Q3/Q4 which the tool reported unmarked — both textbook-correct:
axoneme = 20 microtubules, PAS does not stain fat), p35 (Q9-12, and resolved a text-layer
numbering glitch — the extracted text shows two consecutive "11."s, but the render shows the
source itself is correctly numbered 9/10/11/12; `pagetext.mjs`'s text layer, not the PDF, has
the duplicate), p37 (Q17-21, confirmed the three image-dependent holds and the <4-option
hold).

## Condition check (chief-of-staff standing order)

**≥60% of the best paper's items keyed, text-based, real stems: MET**, comfortably, on
Support 43 — With Answers: Anatomy alone is 23/24 auto+render keyed (96%), Histology is
17/22 authored + 5 explicitly-reasoned holds (77% keyed, none of the holds are "unmarked and
unexplained"), and even the worst-case sub-block (Embryology) is a tool-detection gap rather
than a true low-key-rate, confirmed keyed on its sampled page. Proceeding per the
chief-of-staff's conditional-approval rule (LANE-CARD's "mint nothing until TRIAGE APPROVED"
line is superseded — this lane applies the ≥60% bar itself).

## Concept search sample

`node "Instruction Manual for Content Creation/tools/find-existing.mjs"` and a bulk index of
`docs/Kasr-Source-Imports/concept/101-ISK*.md` + `103-BMS-{anatomy,histology,physiology}-
concepts.md` (540 concepts) were searched for every fact before minting (LANE-CARD's expected
reuse family: Kasr 101-ISK/103-BMS, Alexandria AU-102/103, Ain Shams AE/IBM, Assiut
PMS-102/CBF-103, FOMSCU FBS102/103, Mansoura HIS-203/AEP/HBG). Two categories of result:

- **Strong, exact-fact reuse** (2 Kasr 101-ISK-mcq-concepts.md pending concepts, used as
  sparse overlays): `CON-FND-5097CA5BAB2E51` ("named syndromes follow from a specific extra
  chromosome, missing sex chromosome or deleted arm" — covers both Turner-monosomy-X and
  Klinefelter-XXY in one record) and `CON-FND-0FAE59E00B748E` ("a cilium arises from a basal
  body and is built on a 9+2 axoneme" — exact match for the axoneme-microtubule-count fact).
  Both are in the same Kasr file, so reusing both costs one extra gate/simulate dependency
  file, not two.
- **No match, genuine new mint** — basic movement terminology (protraction, opposition,
  supination-as-lateral-rotation, eversion, abduction, wrist movements), most joint-type
  facts (saddle CMC, hinge elbow, modified-hinge knee, condyloid MCP, synchondrosis,
  ball-and-socket shoulder, synovial-joint-except), bone-growth/classification facts
  (intramembranous ossification, tarsal short bones, typical/miniature/modified long bone),
  and most of the histology cell-biology facts (inclusions vs organelles, fat-cell stains,
  pigments, organelle functions, cell-cycle timing, membrane fluidity) were searched and came
  back "safe to create" — Kasr's own 101-ISK/103-BMS material tests applied muscle/joint
  anatomy and named histology structures, not this first-week terminology layer, so the
  absence of a hit is a real gap rather than a missed search term. Portal circulation and the
  long-bone-growth (periosteum=width / epiphyseal-plate=length) fact also have strong Kasr
  101-ISK-mcq-concepts.md matches (`CON-MSK-A12FB50E90A64B`, `CON-MSK-C30E73A5353ABB`) that
  were considered but minted fresh instead this round, to keep this lane's first cluster
  self-contained (one extra dependency file was already committed to for the two reuses
  above); a future pass may convert these two to overlays.

## Method

`pagetext.mjs status` (both files) → `show` per section (stem reading, 3 pages/call) →
`pagetext.mjs keys` (key-recovery, ~85% direct hit rate on Support 43 outside Embryology) →
9 renders total (`--force`, since sub-blocks read cleanly as "not garbled" by the tool's own
definition) confirming the Answer-Labeled paper's convention (1) and resolving every
unmarked/questionable item in the two authored sub-blocks (8: p26, p27, p28, p33, p35, p37,
plus the Answer-Labeled p2 sample) — 9 of the lane's 14-render budget spent, 5 remaining.

## Needs Omar / open items

None — no Telegram-only gap encountered, no missing source. Remaining work for the next
resume: author the Biochemistry/Physiology sub-block (p13-22, ~34/38 auto-keyed) and the
Embryology sub-block (p3-11, tool-gap but confirmed keyed) of this same paper, then move to
the Answer-Labeled paper (highlight-convention, render-budget-heavy) and the Biochemistry
First Module Exam 2019 paper (not yet opened this round).

## Lane-2 addendum (this round)

Both remaining sub-blocks of Support 43 are now authored: Biochemistry/Physiology
(37/38, q02 held for <4 options) and Embryology (35/36, q29 held for <4 options) — see
coverage/seeds/MU-MED101/f1supp43-{biochemphys,embryo}.json. Both sub-blocks' "tool gap"
(pagetext.mjs keys under-reading them) turned out to share one root cause: the source's
`a-text`/`8.text` option and question punctuation carries no space, which the tool's
QUESTION_RE/OPTION_RE regexes require. Resolved for every item in both sub-blocks by reading
the PDF's own per-span colour data directly with a one-off diagnostic script (same
colour-distance-from-black threshold pagetext.mjs's own `keys` command uses) rather than by
rendering — 0 of the lane's remaining 5-render budget spent this round (14-render lane total
still at 9 used). Support 43 — With Answers is now fully authored (4/4 sub-blocks, 113
authored + 7 held across anat/histo/biochemphys/embryo). Resume-first for the next round:
`mu_191aaaeeff88f7bfd219` (EOM Practice - Foundation 1 - Anatomy Embryology Histology -
Answer-Labeled.pdf, 13pp, yellow-highlight key convention, confirmed keyed 4/4 on a 1-render
sample — see the tier-1 inventory table above).

## Lane-3 addendum (this round)

The Answer-Labeled paper (`mu_191aaaeeff88f7bfd219`) is now fully authored: 27 authored, 11
held out of 38 question-instances (37 raw Q-numbers, minus a genuine source-side gap at Q26,
plus a genuine source-side reuse of question numbers 22 and 23 a second time on p9 for a
different figure -- confirmed by the extracted text itself, not a text-layer artifact). Zero
of the lane's remaining 5-render budget spent (14-render lane total still at 9 used).

**Key convention correction**: the tier-1 inventory's "yellow highlight" note was right, but
`pagetext.mjs keys`' 3/38 auto-read was not merely under-counting -- the 3 hits it did report
(p2 Q3 underline-flag, p7 Q19/p8 Q21 red-text) were partly spurious. This document colours
every question STEM red as a heading style, unrelated to the answer key; `keys`' red-text
heuristic occasionally misattributes that stem colour to a nearby option line. The true and
apparently sole key marker is a yellow-fill vector rectangle (PyMuPDF `page.get_drawings()`,
fill ≈ (1,1,0)) drawn behind the correct option's text. Resolved for every item by reading the
PDF's own per-drawing fill colour directly (a one-off script matching yellow rects to the
option line they vertically/horizontally overlap, tracking the open question number the same
way `pdf_visual_keys.py` does) -- confirmed against the triage-verified p2 Q1-4 sample (b/d/d/c)
before trusting the method for the rest of the paper, and cross-checked against the `keys`
tool's spurious hits (its Q19=E and Q21=E did not survive; both are correctly C by yellow fill,
and both are held anyway as image-dependent so the discrepancy is moot for authoring).

**Holds**: 3 single image-dependent items (q06 muscle-diagram, q13/q14 a numbered-structure
figure), 2 exact duplicates of q16 (the source prints the identical spermatogenesis question
three times verbatim, q16/q17/q18, same key each time), and 6 further image-dependent items
across two "marked structure" figure groups (q20/q21, and the p8+p9 double occurrence of
q22/q23 -- two different figures reusing the same two question numbers, both held).

**One editorial fix, field-noted not silently corrected**: q27's fifth printed option is
labelled "a) Glycocalyx is its protein component" (repeating option A's letter) rather than
"e" -- confirmed in the PDF's own text spans, not an extraction artifact. Read as option E by
position; noted in the question's field_notes and in its distractor explanation.

**Search-before-mint**: every fact searched via find-existing.mjs against live state and every
pending batch before minting. 9 exact-fact reuses found as sparse overlays (pending-live/
MU-MED101-concepts-overlay.md) from 6October/Kasr-101-ISK/FOMSCU/Alexandria pending concept
files; 3 further exact-fact reuses were already-mu-tagged concepts from this lane's own lane-1
concepts.md (eversion, short-long-bone/phalanges, periosteum-width-growth), needing no overlay
at all; 13 new mints (concept/MU-MED101-concepts-3.md). Teaching: one new article
(ART-MU101-GENTERMS-C37B82A5, general anatomical terminology/fascia/vascular basics) plus six
of this lane's existing articles (JOINTS, ORGANELLES1, ORGANELLES2, GENETICS, GAMETOMC,
FERTIMPLANT, GERMLAYERS) extended with new related_concepts and teaching paragraphs.

**Needs Omar / open items**: none -- no Telegram-only gap, no missing source. Both tier-1
papers in this module's inventory are now fully authored. Resume-first for the next round:
the Biochemistry First Module Exam 2019 paper, named in the lane-2 addendum above as "not yet
opened this round" and still unopened -- confirm it is in-tree before triaging further, and
re-survey the module folder for any tier-1 papers not yet in the manifest sample.
