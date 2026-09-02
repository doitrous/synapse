# ZU-MED-104 (Musculoskeletal & Integumentary) — S3 first-source triage

Fakous campus MSK Final 2024 (`Fakous MSK Final 2024.pdf`), the priority paper named in
this lane's dispatch, chosen as the first source per the same worked-example scope as
the ZU-MED-106 Cardiopulmonary lane: one complete source, fully triaged, keyed and
authored as this pass's deliverable.

## Source: `Fakous MSK Final 2024.pdf`

5 pages, **scanned image with no PDF text layer at all** (`pagetext.mjs status` reported
`words=0 garbled=yes ocr=no` on every page — a Microsoft Lens scan, not the native-text
case the ZU-MED-106 CPS paper turned out to be). `pagetext.mjs ocr --pages 1-5` recovered
readable text (186–460 words/page). Header states "Total Number of Questions: (36) Single
best answer (SBA) & (9) Short essay question". All 36 SBA MCQs and all 9 structured-essay
questions were read in full via `pagetext.mjs show` (post-OCR) and confirmed against the
scanned image via `pagetext.mjs render --force` (pages 2–5, one render per page, all 36
SBAs individually verified against the rendered image — see "Key-recovery method" below).

### Key-recovery method (same trap as ZU-MED-106, via a different mechanism)

`pagetext.mjs keys` reports **0 keyed / 0 ambiguous / 0 unmarked across 0 pages** on this
file — not because the detector missed a marked-up page (as on the CPS paper), but because
this file's text layer *is* the OCR layer: `keys` requires a native PDF text layer to look
for colour/bold/underline/annotation flags, and after `pagetext.mjs ocr` the file still has
no native text layer (OCR output lives in a side cache, not embedded back into the PDF), so
`keys` correctly reports it cannot check anything. This is the same underlying trap the
LANE-CARD's §7 note describes (`0 keyed` from a real, corpus-wide hand-drawn-ink answer key)
but arrived at via OCR-on-an-image-scan rather than a native-text-with-ink-mark PDF.

The OCR text itself carries the same tell the CPS lane found: the correct option's letter
marker is corrupted or replaced by an unrelated stray character (`c) Palmar interossei` →
`4% Palmar interossei`; `b) Middle` → `75 Middle`; `d) Weakness of flexion` → `#5 Weakness
of flexion`, etc.) — the visual diagonal ink stroke through the printed letter, read by
Tesseract as a nonsense glyph. **Every one of the 36 SBA questions carries this signature**,
and every one of the 36 recovered answers is independently defensible on medical/anatomical
grounds (radial artery crossing the scaphoid-floored snuff box; ECRL spared by an isolated
PIN lesion because it is supplied by the radial nerve proper; type II collagen in hyaline
cartilage; calcium influx in the cardiac plateau phase; etc. — see
`coverage/ZU-MED-104-triage-keys.txt` and the seed's own `field_notes.keySource` per
question) — a strong internal-consistency check independent of the visual confirmation.

**Confirmed, not just inferred.** Pages 2–5 (all 36 SBA questions) were each rendered with
`pagetext.mjs render --force` and visually inspected: every rendered page shows a diagonal
pen stroke through the correct option's letter, exactly matching the text-corruption
pattern predicted from the OCR output, with zero mismatches across all 36 questions.

### Checkpoint table

| Source | Questions triaged | Keys recovered | Distinct concepts tested | Live-hit | Pending-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| `Fakous MSK Final 2024.pdf` | 45 (36 SBA + 9 structured essay) | 36/36 SBA (essay = written, graded by rubric/department book, no single-letter key) | 36 (no duplicate pair, unlike CPS's Q14/Q17) | 3 | 16 | 17 | `msk` (upper/lower limb anatomy and muscle/bone histology, majority), `neuro` (nerve physiology, myasthenia gravis), `derm` (hair follicle, skin histology), `cvs` (cardiac action potential), `fnd` (cartilage collagen biochemistry) — not asserted as final, an S3/authoring-time call |

Full per-question rollup: `coverage/ZU-MED-104-triage-keys.txt`.

### Concept search sample and reuse pattern

`Instruction Manual for Content Creation/tools/find-existing.mjs` was run for every one of
the 36 questions' topics (this lane's own `scripts/content/find-existing.mjs` does not
exist in this checkout — the manual's copy is the one that works). A corpus-wide quirk
this pass confirmed: **compound multi-word queries frequently miss real hits that a short
1-2 word query finds** — `"sarcomere Z line"` and `"isotonic isometric contraction"` both
returned "no existing record", while `"sarcomere"` / `"Z line"` and `"isometric
contraction"` each turned up the real match. Every "no existing record" verdict from this
tool should be re-tried with shorter, more literal phrasing before being trusted.

Kasr's `101-ISK` (upper/lower limb anatomy MCQ bank), `102-INT` (biochemistry/physiology),
`103-BMS` (histology/physiology) and Alexandria's `AU-MED-105` (anatomy/histology) modules
— all pending, not yet imported — turned out to be the dominant reuse families for this
module, exactly as the LANE-CARD predicted for the sibling ZU-MED-106 lane's own reuse
families (Kasr 103-BMS, ASU-LOCO, AU-102 anatomy). 19 of the 36 questions' concepts hit an
existing record: **3 live** (`dorsalis pedis`, `osteoblasts`/bone-cell roster, `endomysium`
— all confirmed directly against `server/data/medical-library-v1.json`, not just via
`find-existing.mjs`) and **16 pending** (11 Kasr, 5 Alexandria). One near-miss is worth
flagging explicitly: a note inside `docs/Alexandria-Source-Imports/concept/AU-MED-105-
anatomy-concepts.md` describes `CON-MSK-1424177E093253` as "the live anatomical-snuff-box
concept" — a direct grep of `medical-library-v1.json` found **0 hits** for that id today
(not live). The real (still-pending) snuffbox concept the radial-artery/scaphoid-fracture
question (Q7) overlays onto is `CON-MSK-1B2BD8EC2B44B8`, in
`docs/import-ready/concept/101-ISK-concepts.md` — a lesson for any future lane: verify a
"live concept" claim found inside another lane's own file comment directly against the
live JSON, don't take the comment's word for it.

Full concept-by-concept resolution (new vs live overlay vs pending overlay, with the
target id and source file for every reused concept) is in
`coverage/ZU-MED-104-LEDGER.md`.

## The Summer resit paper and the OSPE file (not authored this pass)

- **`Fakous MSK Summer 2024.pdf`** (5 pages, same Microsoft Lens/CamScanner-style scan,
  OCR'd this pass — `pagetext.mjs ocr --pages 1-5`, 236–433 words/page) is a **different**
  36-SBA question set (a resit paper, not a duplicate of the Final), confirmed by reading
  its first 2 pages (8 essay questions + the start of a differently-worded SBA section:
  "16-year-old boy… superficial peroneal nerve", "axis of… line passes through which of
  the following toes", etc. — distinct stems and a different injury-vignette style from
  the Final). Genuinely triaged only as far as confirming it is real, distinct, likely-keyed
  content (same OCR + hand-drawn-ink pattern expected) — **not yet fully read, keyed, or
  authored**, real remaining scope for the next pass, per LANE-CARD.md §4 ("Final first,
  then Summer").
- **`1st role FAKOS OSPE MSK exam cr 2024-2025.pdf`** (checked per LANE-CARD.md's own
  instruction) is a genuine OSPE exam but in **image-identification station format**
  ("1-Identify the Bone. 2-Identify the marked muscle. 3-Mention its nerve supply.",
  confirmed on stations 1 and 2, `pagetext.mjs show --pages 1-3`) — no letter-option MCQs
  exist to key. Catalogued, not authored, per LANE-CARD.md §1: "image-identification
  stations are catalogued, not authored."
- The remaining ~140 non-priority Musculoskeletal files (lecture PDFs, PPTX practical
  handouts, revision banks, Arabic-titled MCQ collections) are visible in the source
  folder listing but not individually triaged this pass.

## Source: `Fakous MSK Summer 2024.pdf` (resit paper, this pass's own deliverable)

5 pages, same Microsoft Lens/CamScanner-style scan as the Final paper (no
native PDF text layer, `pagetext.mjs status` reported `words=0 garbled=yes
ocr=no` on every page before OCR — already OCR'd in the shared cache by the
sibling `zagazig-104-author1` pass, `pagetext.mjs status` now reports
`ocr=yes` with 236–433 words/page, not re-OCR'd this pass). Header states
"Total Number of Questions: 9 (SEQ) & 36 (SBA), Total Marks: 72 Marks, Final
written Exam (Academic year 2023-2024)". All 36 SBA MCQs and 9
structured-essay questions were read in full via `pagetext.mjs show`
(post-OCR).

### Key-recovery method (same trap as the Final paper, plus a second mark type)

`pagetext.mjs keys` reports **0 keyed / 0 ambiguous / 0 unmarked across 0
pages** on this file, for the identical reason documented for the Final
paper: the OCR text layer is not a native PDF text layer, so `keys` cannot
check anything.

This paper's own marking convention differs slightly from the Final's: most
correct options carry a **circled letter** (a clean oval around the option
letter and/or its text) rather than the Final's diagonal-ink-stroke
corrupting the glyph, though the same corrupted-glyph signature (`c) Radial
collateral` → filled dot/blob replacing "c)") appears on roughly a third of
the 36 questions. A **second, independent mark type** also appears on this
paper and was not present on the Final: a **single handwritten letter in the
right margin**, at roughly the vertical height of the question (not
necessarily aligned to any one option row), confirmed on renders to be an
answer-key mark in its own right — used alone on some questions (Q15, Q17,
where no option is circled) and alongside a circled option on others
(matching it exactly on Q9/Q14, **conflicting with it on Q18**).

**Confirmed, not just inferred.** Pages 2–5 (all 36 SBA questions) were each
rendered with `pagetext.mjs render --force` (4 renders total, within the
LANE-CARD's own ≤6 budget) and visually inspected against both the circled
marks and the margin-letter marks.

### Checkpoint table

| Source | Questions triaged | Keys recovered | Held | Distinct concepts tested | Reuse-hit | New | Placement for new |
|---|--:|--:|--:|--:|--:|--:|---|
| `Fakous MSK Summer 2024.pdf` | 45 (36 SBA + 9 structured essay) | 30/36 SBA authored, 6 held (essay = written, no letter key, not triaged to a key) | 6 (see below) | 30 (30 authored questions, no duplicate pair within this cluster) | 10 | 20 | `msk` (majority — limb anatomy, muscle/bone/skin histology), `neuro` (nerve/muscle spindle physiology), `derm` (skin glands, nail), `fnd` (cartilage/calcium biochemistry) — S3/authoring-time call, same caveat as the Final paper |

Full per-question rollup: `coverage/ZU-MED-104-triage-keys.txt`.

### Held items (6 of 36)

Unlike the Final paper (0 held of 36), this resit paper needed 6 holds:

- **msk-summer24-q06** — `held-no-printed-key`. No circle, corrupted glyph, or
  margin letter found on any of the 4 options for "Which of the following
  nerve roots is damaged in positive Trendelenburg sign?", confirmed by
  render --force.
- **msk-summer24-q10** — `duplicate-of msk-final24-q15`. Same
  fibula-fracture/spared-muscle fact the Final paper's own
  `CON-MSK-03F3DA894D0C4D` already covers (tibialis anterior spared because
  it originates from the tibia, not the fibula); this paper's own key names
  extensor digitorum longus instead, which directly conflicts with the
  Final's already-authored answer to the identical underlying fact.
- **msk-summer24-q18** — `held-indefensible-key`. Two independent marks
  disagree: a clean circle around option (b) "Subscapular", and a separate
  margin "c" note (matching this paper's own margin-letter convention seen
  clearly elsewhere, e.g. Q9, Q14, Q17). Both confirmed by render --force; no
  way to tell which is the paper's real key, and neither option is itself
  anatomically defensible for "which branch of the third part of the
  axillary artery is normally patent when that part is occluded" (the
  textbook answer, superior thoracic, arises from the first part and is not
  one of the two marked options).
- **msk-summer24-q31** — `duplicate-of msk-final24-q36`. Identical
  cardiac-action-potential-plateau-ion question (same stem structure, same 4
  options) already authored from the Final paper as `CON-CVS-C6E888D47E1254`
  (answer: Ca2+ only).
- **msk-summer24-q32** — `duplicate-of msk-final24-q35`. Same
  isotonic/isometric-contraction-tension concept the Final paper already
  authored as `CON-MSK-242998842BE25C` ("tension increased" is an isometric,
  not isotonic, property); this paper's own stem asks about isotonic
  contraction specifically and marks "muscle tension is increased" as
  correct, the direct inverse of the Final's own already-authored fact.
- **msk-summer24-q35** — `held-indefensible-key`. Asserts the skeletal muscle
  triad is "two transverse tubules and two terminal cisternae", directly
  contradicting this same cluster's own `msk-summer24-q22` (marked correct,
  "a pair of terminal cisternae with a transverse tubule" — the standard,
  textbook-consistent triad definition) on the identical underlying fact,
  within the same paper.

### Uncertain-but-authored items (single mark, conflicts with standard teaching)

15 of the 30 authored questions carry a marked key that conflicts with
standard anatomy/physiology teaching (a much higher rate than the Final
paper's own 2 minor uncertainty flags out of 36) — each was checked for a
*second, conflicting* mark (which would trigger a hold per the rule above)
and found to carry only the one, unambiguous mark, so each stands per
LANE-CARD.md §7's printed-key-stands rule. Every one of these 15 concepts
carries its own `## uncertainty` field documenting the specific conflict for
reviewer attention (`concept/ZU-MED-104-msk-summer-concepts.md`): msk-q01
(superficial vs deep peroneal/inversion), q08 (PIN/mid-prone position), q09
(radial vs ulnar collateral ligament laterality), q12 (6th compartment
flexion vs extension), q19 (tendo-achillis inversion vs plantarflexion), q20
(ulnar vs radial artery for the deep palmar arch), q21 (merocrine vs
sebaceous gland), q23 (gamma vs alpha motor fibers in the spindle), q24
(collagen type I vs II in hyaline cartilage), q26 (osteoclast basal vs clear
zone), q28 (calcitonin raises vs lowers calcium), q29 (Na+ influx vs Cl-
permeability in presynaptic inhibition), q33 (troponin T's tropomyosin- vs
myosin-binding role), q34 (ATP vs free fatty acid as the "unlimited"
recovery-period fuel), q36 (chronaxie "variable" vs specifically "longer"
than its nerve's). The other 15 authored questions (q02, q03, q04, q05, q07,
q11, q13, q14, q15, q16, q17, q22, q25, q27, q30) checked out cleanly against
standard teaching, no flag needed. This split is flagged here as a
corpus-wide pattern worth Omar's attention: this resit paper's own answer
key appears to carry materially more errors than the Final paper's, a
plausible real-world consequence of a resit being drafted faster/less
carefully — not a triage-method artifact, since the same render-confirmation
method was used throughout and found the same clean single-mark pattern on
both papers.

### Concept search sample and reuse pattern

Same `find-existing.mjs` short-literal-query approach as the Final paper. 10
of the 30 authored questions' concepts hit an existing pending record
(non-conflicting reuse, sparse pending-live overlay): Ain Shams `ASU-AE`
(1 — toe-axis terminology), Alexandria `AU-MED-105` (2 — leg arteries, knee),
Kasr `101-ISK` (3 — musculocutaneous nerve, cephalic vein, and, per q17's own
anatomical cross-check, the obturator nerve), Kasr `103-BMS` (4 — hamstrings,
common peroneal/fibular neck, epiphyseal plate, excitation-contraction
coupling). 20 of the 30 needed a fresh mint — either because no existing
record covers the fact tested, or (the majority of the 20) because the
question's own marked key conflicts with an already-correct existing
live/pending concept from this same corpus, and overlaying would have
corrupted that existing record; each such fresh mint is cross-linked via
`related_concept_ids`/`contextual_concept_ids` to the existing correct
concept it conflicts with, rather than silently ignoring it.

## The OSPE file (not authored this pass)

`1st role FAKOS OSPE MSK exam cr 2024-2025.pdf` was already catalogued (not
authored) by the sibling Final-paper pass — see the "not authored this pass"
section above. With 30 SBA authored from the Summer paper (comfortably over
the LANE-CARD's own "~35 authored" catalogue-instead-of-author-more-OSPE
threshold), this pass did not re-open the OSPE file.

## Needs Omar / next-pass flags

- **Subject placement defaults** used this pass (msk for anatomy/histology/muscle-nerve
  physiology, `neuro` for nerve-excitability/myasthenia items, `derm` for hair-follicle/
  skin-histology items, `cvs` for the one cardiac-action-potential item, `fnd` for the one
  collagen-biochemistry item) are S3/authoring-time judgment calls, not asserted as final
  curriculum placement — same flag pattern the ZU-MED-106 triage used for its own `resp`/
  `cvs`/`fnd` defaults.
- Q9 and Q32's `uncertainty` notes (distal-ulna-sparing mechanism not explicitly stated by
  the paper; heat-rigor option D's wording not fully matching a textbook heat-denaturation
  phrasing) are flagged in the concept/seed `field_notes` rather than resolved — printed/
  hand-drawn keys stand as printed per LANE-CARD.md §7, no `held-indefensible-key` was
  needed on any of the 36.
- Summer paper is now authored (30/36 SBA, 6 held — see above); the OSPE
  image-identification station file remains catalogued, not authored, per
  LANE-CARD.md §1.
- **Flag for Omar: the Summer resit paper's answer key is materially less reliable than
  the Final paper's own key.** The Final paper: 0 held of 36, 2 minor uncertainty notes.
  The Summer paper: 6 held of 36 (1 unmarked, 2 indefensible-two-mark conflicts, 3
  duplicate-of-Final conflicts), plus 15 of the 30 authored questions carrying a marked
  key that conflicts with standard anatomy/physiology teaching on a single, unambiguous
  mark (author_notes on each — see the "Uncertain-but-authored items" section above).
  This was checked against the possibility of a triage-method error (same
  render-confirmation approach used on both papers, found the same clean single-mark
  pattern) before being logged here as a property of the source paper itself, not this
  pass's own method. All 15 uncertain items and the 6 held items would benefit from a
  department-book cross-check before publication.
