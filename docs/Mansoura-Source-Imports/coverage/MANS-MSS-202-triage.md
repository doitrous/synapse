# MANS-MSS-202 — Priority-4 triage (Phase-0 sample)

**Scope note, read first:** this is a representative sample of the three
Priority-4 MSS sources (00-START-HERE.md §4's fuller S1 triage is a later,
more-resourced pass), following the same method as `MANS-HIS-203-triage.md`.
`MSS Past Years.pdf` was read across 15 of its 42 pages (pp.1-6, 20-22, 30-32,
41-42 — front, middle and tail, to check the convention holds throughout);
`Most important MCQ (continuous).pdf` across 9 of its 48 (pp.1-3, 24-26,
46-48 — physio, pharma-NSAID and pharma-DMARD sections); `تجميعات MSK
للامتحان.pdf` was read in full (8 pages). The MSS Lecures & Practical.pdf
(tier 3, not Priority-4) was not opened this pass — catalogued only, per the
brief's tier-3 instruction.

## Per-source summary

| Source | sourceId | Pages read | Items sampled | Keyed | Method | Image-dependent |
|---|---|---|--:|--:|---|---|
| `MSS Past Years.pdf` (paper, tier 1) | `src_5cef175343fd761b8c9f` | 1-6, 20-22, 30-32, 41-42 (15/42) | ~85 | ~84 (99%) | printed answer letter/number positioned at the right margin beside the question number, not bold/colour — `pagetext.mjs keys`'s auto-detector (bold/red/underline) found 0/30 here, a **new key convention this lane hasn't hit yet**; eyeball reading recovered essentially all of them | 1 item (p.34 Q42, "see photo" on a scaphoid-fracture vignette) — stem is fully answerable from the text alone (classic FOOSH + snuffbox tenderness), held as low-risk, not a blocker |
| `Most important MCQ (continuous).pdf` (bank, tier 2) | `src_9fa49f3f0021440fcce7` | 1-3, 24-26, 46-48 (9/48) | ~35 | ~35 (100%) | **bold key letter** — `pagetext.mjs keys` auto-detected 173/186 questions across the full 48 pages this way (93%, `bold-flag`), confirming the method mechanically, not just by eye | 0 in the sampled pages |
| `تجميعات MSK للامتحان.pdf` (paper, tier 1 by manifest label) | `src_11d5f76e2bad748a1538` | 1-8 (all) | 0 MCQ items | n/a | **not an MCQ source** — a pathology fact-compilation (bulleted disease facts: bone dysplasias, osteomyelitis, arthritis, bone/soft-tissue tumours, IHC panel), no stems or options anywhere in its 8 pages | n/a — useful as concept/article background reading, not an item source |

`pagetext.mjs grep` for `figure|diagram|shown below|labeled|as shown|arrow
points|picture` returned **0 hits** across both MCQ files (42 + 48 pages) — no
numbered-diagram-anatomy pattern found in the sampled range, contrary to the
brief's general "expect many" warning for MSK content; a second targeted grep
for `numbered structure|lettered structure|indicated by|point [A-E0-9]|image
below|X-ray shown|radiograph` found the single p.34 item above plus one
`radiographic examination reveals...` vignette (p.19) that is fully described
in text (fracture site named in the stem, no image needed to answer).

## Condition check

Best source is `MSS Past Years.pdf`: ~99% keyed, 100% text-based (not
image-dependent), all real exam stems (mostly USMLE-style upper/lower-limb
anatomy vignettes plus straight recall, spanning at least four cohort
sittings — "63", "Summer 63", "Lectures 59", and an undated block). This
clears the ≥60% bar comfortably, so **TRIAGE APPROVED** applies per the
chief-of-staff's advance grant (LANE-CARD §1/§6) — proceeding straight to
authoring rather than stopping for a separate grant.

## Per-concept search sample

`find-existing.mjs` run per anatomy fact below, narrow-then-broad per this
lane's own established method (a narrow multi-word query under-hits; the bare
noun phrase surfaces the real hit rate):

| # | Fact | Status | Evidence |
|--:|---|---|---|
| 1 | Long thoracic nerve injury → winging of scapula (mastectomy) | **pending** | `Kasr-Source-Imports/concept/101-ISK-concepts.md` `CON-MSK-24E318F2E3F18E` |
| 2 | Axillary nerve → deltoid + teres minor (shoulder dislocation) | **pending** | same file `CON-MSK-EE022A2043C10F` |
| 3 | Carpal tunnel syndrome / median nerve / ape hand deformity | **pending** | same file `CON-MSK-9B52018C4649BD` |
| 4 | Musculocutaneous nerve — lateral cord, pierces coracobrachialis | **pending** | same file `CON-MSK-F125616F7ED37A` |
| 5 | Scaphoid fracture (FOOSH, snuff-box tenderness) | **pending** | `Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md` `CON-MSK-77C8DFCB26299F` |
| 6 | Rotator cuff muscles (SITS) — which is NOT one | **live/pending mix** | `AU-MED-105-anatomy-questions-ul.md` has the question but no standalone concept found this pass — treated as new mint |
| 7 | Piriformis syndrome / sciatic nerve compression | **not found** (general piriformis-landmark concepts exist in AU-MED-105/103-BMS, not this specific vignette) | new mint |
| 8 | Glenoid labrum deepens the glenoid cavity | **live** | `CON-MSK-F17F226A520EC5` (+ claim `CLM-MSK-F17F226A520EC5`) |
| 9 | Ape hand deformity (glossary term only, not a full concept on its own) | folded into #3 | `Kasr-Source-Imports/glossary/101-ISK-glossary.md` |

Search method note: `"gluteus maximus extensor hip"`, `"radial artery
origin"`, `"extensor carpi radialis longus"`, `"adductor pollicis ulnar
nerve"`, `"ischial tuberosity greater trochanter"`, `"popliteus muscle"`,
`"sciatic nerve gluteal region landmark"` all returned "safe to create one"
on both a narrow and a broadened query — these are genuinely new for this
corpus, unlike #1-5 which needed the broadened form to surface. Physiology
(skin/vitamin D/melanin) and pharmacology (NSAID/DMARD) facts from the second
source were not pre-searched individually before this table was written —
searched at mint time in the authoring pass instead, same as HIS-203's
practice for its own later sections.

## Needs Omar / needs a second pass

- `تجميعات MSK للامتحان.pdf` triaged as a non-MCQ source — flagged so a later
  pass doesn't re-open it expecting question items; it remains useful as
  concept-article background (pathology facts on osteogenesis imperfecta,
  Paget disease, osteomyelitis, bone/soft-tissue tumours).
- `MSS Past Years.pdf`'s key convention (plain-text positional, not
  bold/colour) is not caught by `pagetext.mjs keys`'s auto-detector — flagged
  for whichever session next touches a Mansoura source that shares this
  layout, so eyeball confirmation isn't skipped in favour of a false "0
  keyed" reading.
- Remaining ~27 of 42 pages of `MSS Past Years.pdf` and ~39 of 48 pages of
  `Most important MCQ (continuous).pdf` are catalogued but not yet triaged —
  next pass's starting point (this session's author cluster below draws only
  from the sampled pages).
- `MSS Lecures & Practical.pdf` (tier 3) untouched this pass — catalogue only
  per the brief.

## Checkpoint table

| Module | Items sampled | Keyed | Distinct concepts tested (this sample) | Live-hit | Pending-hit | New | Image-dependent |
|---|--:|--:|--:|--:|--:|--:|--:|
| MANS-MSS-202 (Phase-0 sample) | ~120 (85 + 35, `تجميعات` excluded — 0 items) | ~119 (99%) | 9 | 1 | 4 | 4 | 1 (low-risk, held) |
