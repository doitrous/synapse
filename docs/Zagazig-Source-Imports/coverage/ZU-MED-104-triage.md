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
- Summer paper and OSPE stations are real remaining scope, not a gap hidden by this table
  (see above).
