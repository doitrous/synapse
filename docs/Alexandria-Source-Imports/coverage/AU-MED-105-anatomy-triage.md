# AU-MED-105 · Anatomy — question-led triage

Lane W1-105-ANAT. Module `AU-MED-105` (Musculoskeletal System & Communication and Basic
Clinical Skills (1)), department `Anatomy`. Year `AU_Y1`.

**GUARD = bank. NO-PAPER GUARD confirmed.** No row anywhere in
`docs/Alexandria-Source-Imports/manifest/au-y1-sources.json` for `AU-MED-105` carries
`category` = `End of Module paper`, `End of Module answers`, or `End of Year paper` (Year 1
has no `EOY Exams` container at all — only y2/y3 do, per the manifest README). The tooling
lane's `scripts/alexandria/extract/PROGRESS.md` independently confirms the same thing: "AU-
MED-105 and AU-MED-106 have ZERO rows classified 'End of Module paper' in the y1 manifest —
their EOM MCQ papers were filed under category 'Department Questions' instead." So the
banks are the triage source; `exam_signal` tier is the **bank** tier for every item below,
per brief §10/§16, until a real paper surfaces.

## Judgement on the one file with an "EOM" filename (per orchestrator instruction)

One of the seven bank files carries an `EOM MCQs -` prefix: `EOM MCQs - Upper limp final MCQ
Dr_ Ibrahim.pdf` (`src_6bb87147b493350691fc`, preferred twin of `src_9484e81af0b173505ec4`).
Read in full (all 25 pages) and judged against the faculty-sitting-vs-lecturer-bank question:

| Signal | What the document shows | Reading |
|---|---|---|
| Branding | Page 1 cover: "Artist Of Anatomy … DR/ IBRAHIM AMR", with a hand-drawn/CamScanner watermark | Personal lecturer brand, not a faculty letterhead |
| Contact info | None on *this* file's cover, but the identical "Artist Of Anatomy / DR/ IBRAHIM AMR / Contact me on Phone and What's app: 01097902962" footer appears on all four sibling non-EOM files in the same folder (`MCQs - Lower limb part 1/2/3`, `MCQs - Upper limb MCQ`) | Same author, same self-published-revision-material branding as the files nobody would call an exam paper |
| Official markers | No faculty name, no exam code/serial, no date, no marks/time allocation, no invigilator instructions, no student-ID field | Absent from every page, including the answer-key page |
| Cohort/stream/year | `examSignals` on this row: `cohortSignal: null`, `streamSignal: null`, `sittingYear: null`, `sittingYearEvidence: null` (checked directly against the manifest) | No sitting is asserted anywhere, including the filename |
| Numbering/content | 120 questions labelled "(1)–(120)"; page 1 itself reads **"سؤال شامل ع المنهج الكامل"** — "a question set covering the whole syllabus", i.e. self-described as a revision compilation, not a sitting | A faculty EOM paper does not describe itself this way |
| Trailing content | Immediately after Q120, the same page carries **"Very important notes about nerves"** — a study-tip appendix (root values of five nerves) — before the answer table | Teaching/revision artefact; an administered exam paper does not append study tips |
| Answer key format | A single dense, column-garbled table at the end (see §Key status) — the same layout style as the answer tables in the four sibling non-EOM files | Consistent internal house-style across the lecturer's whole output, not a distinct "official" format |

**Judgement: this is Dr Ibrahim Amr's own compiled revision MCQ set (his "Artist Of Anatomy"
personal bank), not a faculty-administered End-of-Module sitting.** The `EOM` in the filename
is the file's own claim to be a comprehensive end-of-module *revision* set, which the
manifest's classifier reasonably read as the `EOM MCQs -` prefix pattern — but nothing in the
document itself is evidence of a proctored sitting. It **stays bank-tier** under the guard,
same as its four siblings, and `exam_signal` records it as a bank occurrence, not a paper
occurrence. Everything else in this triage was already bank-tier; this is the only item the
filename could have misled a later reader on, so it is recorded explicitly rather than passed
over silently.

## Top-line counts

| Questions triaged | Keyed | Unkeyed | Distinct concepts tested | HIT-LIVE | HIT-PENDING | NEW |
|---:|---:|---:|---:|---:|---:|---:|
| 460 (428 lettered MCQ + 32 practical spot-ID items, the latter carrying 52 gradable sub-answers across their `a`/`b` parts) | 460 have *some* key recorded (0 with no key at all) — see the two-tier breakdown below | 0 | 86 | 20 | 46 | 20 |

**Key status is not uniform and the binary keyed/unkeyed split hides that, so it is broken out
here:**

| Tier | Count | Confidence |
|---|---:|---|
| Clean prose answer block, fully legible | 32 (both practical spot-ID files, 52/52 sub-answers legible) | High — usable as written |
| Answer block present but **column-garbled by text extraction** (numbers and letters interleaved out of reading order; see §Key status below) | 428 (all five lettered-MCQ banks) | Present, **not yet trustworthy per question** — needs a render pass before any individual letter is recorded as a key, per SHARED-TOOLCHAIN "Recovering an answer key" |

## The banks

Seven distinct bank files own this department's exam signal: five under
`Anatomy/Questions/`, two under `General/Practical/Questions/` (the module's `General` rows,
which this department lane also reads per the brief). All seven are native-text, fully
cached, 0 empty/unreadable pages. None carries a cohort, stream, or sitting-year signal in
the manifest (`examSignals` all null on all seven rows) — consistent with all seven being
lecturer-compiled revision material, not dated sittings.

| # | sourceId (preferred twin) | Folder | File | Pages | Distinct Qs | Format |
|---|---|---|---|---:|---:|---|
| 1 | `src_6bb87147b493350691fc` | Anatomy/Questions | `EOM MCQs - Upper limp final MCQ Dr_ Ibrahim.pdf` | 25 | 120 | Lettered MCQ (single-best, mostly A–D, one E) |
| 2 | `src_f0b73dc856d890ca9c58` | Anatomy/Questions | `MCQs - Lower limb MCQ part 1 Dr_ Ibrahim.pdf` (Thigh) | 12 | 50 | Lettered MCQ |
| 3 | `src_78b66af9c28aa239cdb7` | Anatomy/Questions | `MCQs - Lower Limb mcq part 2 Dr_ Ibrahim.pdf` (Leg) | 12 | 48 | Lettered MCQ |
| 4 | `src_a2ec24de7b5561128fed` | Anatomy/Questions | `MCQs - Lower Limb MCQs part 3 Dr_ Ibrahim.pdf` (Foot, Vessels, Joints) | 12 | 50 | Lettered MCQ |
| 5 | `src_c86f47635016c192bd42` | Anatomy/Questions | `MCQs - Upper limb MCQ Dr_ Ibrahim.pdf` | 39 | 160 (3 independently-numbered sub-sections: pp2–12 Bones/Shoulder region Q1–50; pp14–24 Axilla+Brachial plexus+Arm/Cubital fossa Q1–50; pp27–39 Forearm+Hand Q1–60) | Lettered MCQ |
| 6 | `src_37ce166b69d2c0a0f0ab` | General/Practical/Questions | `MCQs - امتحان تجريبي 1.pdf` ("mock practical exam 1") | 19 | 16 (32 sub-answers, every item has an `a`/`b` part) | Diagram-labelling spot ID, short answer — **not lettered MCQ despite the filename** |
| 7 | `src_f52b688229ba15f4b183` | General/Practical/Questions | `MCQs - امتحان تجريبي 2.pdf` ("mock practical exam 2") | 19 | 16 (20 sub-answers: 4 items have `a`/`b`, 12 are single-part) | Diagram-labelling spot ID, short answer |

Row 5 is a single PDF that concatenates three separately-numbered question sets (each
restarting at "(1)"); its answer table is split the same way (pages 13, ~25–26, and the tail
of page 39). Recorded as one sourceId with 160 questions across three sub-banks, not three
files, because the manifest gives it one row.

**All 87 non-bank files under `Anatomy/` and this module's `General/` department-folders were
surveyed** (36 Lecture Slides — 12 of them native `.pptx` faculty practical decks — 27
`Unknown`-category items, 17 `Practical` items including 2 atlases, plus the 7 bank files
above) to identify the lecture chapters the banks draw on; see §Department files surveyed.
No department book/textbook exists for this module (no `Department Book` category row appears
under `Anatomy` at all) — the lecture slide decks and the two atlases are the closest thing to
a syllabus, which is why the bank, not a book chapter, decides scope here.

### Key status — answer block present, column order needs a render pass

Every one of the seven files ends its question set with an embedded answer table (or, for the
two practical files, inline prose answers after each item) rather than a separate answer file
or a highlight/mark — this is the "answer block" variant of SHARED-TOOLCHAIN's recovery
procedure, not the "separate file" or "highlight" variant.

- **The two practical spot-ID files (rows 6–7) have clean, fully legible prose answers**,
  e.g. `(1) a. Latissmus dorsi muscle – thoracodorsal nerve / b. Spine of scapula` — no
  reconstruction needed, no ambiguity.
- **The five lettered-MCQ banks (rows 1–5) all end in a dense grid table** (columns of
  question-number/answer-letter pairs) that `pdftotext`'s reading order has **interleaved out
  of sequence** — e.g. row 1's answer page reads `D / 26 B / 51 C / 76 C / 101 A / A / 27 C /
  52 B / …`, mixing a 5-column-by-25-row grid into one linear stream with numbers and letters
  no longer reliably paired. Row 4 (LL part 3) is the worst case: only 21 of its 50 answers
  survive as legible letters on the final page at all; the rest appear to have been lost in
  the same column-reflow. **None of these were resolved to per-question letters in this
  triage** — per SHARED-TOOLCHAIN's own warning ("resolve the label from its position in the
  sequence, never from its shape" and "confirm any suspected mark at 200 dpi"), reconstructing
  a jumbled table from a linear text dump risks a wrong-letter error that is worse than an
  absent one. **Recorded here as "answer block present, reconstruction pending" for all 428
  lettered-MCQ items — Step 3 work**, most likely a `pdftotext -layout` or a render-based
  re-read of just the seven answer pages (13, and the last page of each of the other five
  files/sub-sections), not a re-extraction of the whole corpus.

**Correction (2026-09-01, W1-105-ANAT-Q2), Lower limb part 1 (Thigh) only.** The "column-garbled"
diagnosis above describes `pdftotext`'s linear reading order specifically, not the page itself.
A full-resolution page render of `src_f0b73dc856d890ca9c58`'s own answer table (its page 11, a
clean two-column 1–50/letter grid) is legible and correctly ordered at a glance — no
reconstruction needed, and it was read directly (all 50 letters) rather than reconstructed from
the garbled linear extraction. This is exactly the render-based recovery this section already
anticipated as "Step 3 work"; it has now been done for this one bank
(`question/AU-MED-105-anatomy-mcq.md` + `pending-live/AU-MED-105-anatomy-questions.md`, see
CLAIMS.md row `W1-105-ANAT-Q2`). The other four lettered-MCQ banks/sub-sections (LL part 2, LL
part 3, UL, EOM-UL) have **not** been render-checked yet — the "unresolved, Step 3 work" status
stands for their answer pages until someone renders them the same way. Do not assume they will
all be as clean as this one (LL part 3 in particular lost more of its table on extraction, per
the Hazards note below, which may or may not reflect the underlying page render quality).

## Ordered list of distinct ideas tested (= concepts), grouped by lecture chapter

Chapters are Dr Ayman Khanfour's own lecture folders (`Anatomy/Dr_ Ayman Khanfour/{Upper
Limb, Lower Limb}/Lectures/<N>-<title>.pdf`), which the bank content maps onto directly —
this module has no department textbook to chapter against. Every idea below is tested by at
least one question in the bank table above; page/question citations are in the per-file
appendix at the end of this file, not repeated per idea here to keep this table readable.

**Key search methodology.** `find-existing.mjs` was run once per idea with its single most
distinctive term. Where that first pass returned "no existing record" (42 of 86 ideas), a
second pass re-ran the search with a shorter, differently-phrased term, per `00-START-HERE.md`
§4's own warning that a longer query is a worse query. That second pass reclassified 22 of the
42 as hits (8 HIT-LIVE, 14 HIT-PENDING), leaving 20 ideas genuinely unmatched by either pass.
**This is a triage-level signal, not mint-time clearance** — the manual's full ≥4-query
protocol plus `grep -ril "<canonical_key>" docs/*-Source-Imports/concept/` still applies per
idea at Step 2, once each idea has a drafted canonical key (brief §12/§16); logged under Owed.

### Upper Limb

| # | Idea | Query 1 | Query 2 (if pass 1 was NEW) | Classification |
|---|---|---|---|---|
| UL01 | Clavicle attachments and ossification order | clavicle | — | HIT-PENDING (`101-ISK-*`) |
| UL02 | Clavicle fracture displacement pattern | clavicle fracture | clavicle fracture | **NEW** (note: plain "clavicle" alone *does* hit a pending 101-ISK record specifically about fracture displacement — likely the same idea under a different query; re-check at Step 2 before minting) |
| UL03 | Scapula medial border and coracoid process attachments | coracoid process | — | HIT-LIVE |
| UL04 | Humerus upper end: tuberosities, bicipital groove, spiral groove/surgical-neck nerve relations | surgical neck | — | HIT-PENDING |
| UL05 | Pisiform as the upper-limb sesamoid bone | sesamoid bone | — | HIT-PENDING |
| UL06 | Rotator cuff muscles and actions | rotator cuff | — | HIT-LIVE |
| UL07 | Scapular movers and their nerve supply | dorsal scapular nerve | — | HIT-PENDING |
| UL08 | Winging of scapula (long thoracic nerve) | long thoracic nerve | — | HIT-PENDING |
| UL09 | Trapezius paralysis test (accessory nerve) | accessory nerve trapezius | trapezius | HIT-PENDING |
| UL10 | Quadrangular and triangular spaces of the shoulder | quadrangular space | — | HIT-PENDING |
| UL11 | Deltoid/supraspinatus initiation of abduction | initiates abduction | supraspinatus | HIT-LIVE |
| UL12 | Axilla boundaries/walls | axilla boundaries | axilla | HIT-LIVE |
| UL13 | Axillary artery parts and branches | axillary artery | — | HIT-LIVE |
| UL14 | Axillary vein formation | axillary vein | — | HIT-PENDING |
| UL15 | Axillary lymph node groups | axillary lymph node | — | HIT-LIVE |
| UL16 | Brachial plexus organisation (roots/trunks/cords) | brachial plexus cords | — | HIT-PENDING |
| UL17 | Cord branches of brachial plexus | posterior cord brachial plexus | posterior cord | HIT-PENDING |
| UL18 | Suprascapular nerve origin | suprascapular nerve | — | HIT-PENDING |
| UL19 | Erb's vs Klumpke's palsy | erb's palsy | — | HIT-PENDING |
| UL20 | Root values of upper limb nerves | root value ulnar nerve | root value | HIT-PENDING |
| UL21 | Musculocutaneous nerve course and injury | musculocutaneous nerve | — | HIT-LIVE |
| UL22 | Radial nerve in spiral groove and triceps | radial nerve spiral groove | spiral groove | HIT-PENDING |
| UL23 | Cubital fossa boundaries and contents | cubital fossa | — | HIT-LIVE |
| UL24 | Brachial artery relations / venipuncture landmark | median cubital vein | — | HIT-PENDING |
| UL25 | Elbow arterial anastomoses | ulnar collateral artery anastomosis | ulnar collateral | HIT-LIVE |
| UL26 | Forearm anterior compartment and median/ulnar nerve supply | pronator teres | pronator teres | **NEW** |
| UL27 | Anterior interosseous nerve | anterior interosseous nerve | — | HIT-PENDING |
| UL28 | Forearm posterior compartment and posterior interosseous nerve | posterior interosseous nerve | — | HIT-PENDING |
| UL29 | Interosseous membrane fibre direction | interosseous membrane forearm | interosseous membrane | HIT-LIVE |
| UL30 | Radial and ulnar artery course/pulses | radial artery pulse | radial artery | HIT-PENDING |
| UL31 | Anatomical snuff box | anatomical snuff box | — | HIT-PENDING |
| UL32 | Thenar/hypothenar muscles and nerve supply | thenar muscles | thenar | HIT-PENDING |
| UL33 | Lumbricals and interossei | lumbrical muscles hand | lumbrical | HIT-PENDING |
| UL34 | Extensor expansion attachments | extensor expansion | — | HIT-PENDING |
| UL35 | Flexor retinaculum: structures superficial vs deep | flexor retinaculum | — | HIT-PENDING |
| UL36 | Extensor retinaculum compartments | extensor retinaculum compartment | extensor retinaculum | HIT-PENDING |
| UL37 | Carpal tunnel syndrome | carpal tunnel syndrome | — | HIT-PENDING |
| UL38 | Ulnar nerve claw hand (high vs low) | claw hand | — | HIT-PENDING |
| UL39 | Median nerve injury levels (ape's hand, pointing index) | ape's hand | pointing index | HIT-PENDING |
| UL40 | Radial nerve wrist drop | wrist drop | — | HIT-PENDING |
| UL41 | Scaphoid fracture and vascular risk | scaphoid fracture | — | HIT-PENDING |
| UL42 | Axillary nerve injury (deltoid, sensory badge area) | axillary nerve injury | — | HIT-PENDING |
| UL43 | Cephalic/basilic veins and lymphatic drainage of upper limb | cephalic vein | — | HIT-PENDING |
| UL44 | Anastomosis around the scapula | anastomosis around scapula | scapular anastomosis | HIT-PENDING |
| UL45 | Shoulder joint stability and dislocation | shoulder joint dislocation | shoulder dislocation | HIT-PENDING |
| UL46 | Elbow and radioulnar joints | radioulnar joint | — | HIT-PENDING |
| UL47 | Wrist joint type and bones | wrist joint type | wrist joint | HIT-PENDING |
| UL48 | Carpometacarpal joint of thumb | carpometacarpal joint of thumb | carpometacarpal | HIT-PENDING |
| UL49 | Metacarpophalangeal and interphalangeal joints | interphalangeal joint | — | HIT-PENDING |

### Lower Limb

| # | Idea | Query 1 | Query 2 (if pass 1 was NEW) | Classification |
|---|---|---|---|---|
| LL01 | Femoral triangle boundaries and floor | femoral triangle | — | HIT-LIVE |
| LL02 | Femoral sheath compartments | femoral sheath | — | HIT-LIVE |
| LL03 | Femoral ring and canal, femoral hernia | femoral ring | femoral hernia | **NEW** |
| LL04 | Saphenous opening | saphenous opening | saphenous | HIT-LIVE |
| LL05 | Femoral nerve branches and sensory distribution | femoral nerve | — | HIT-LIVE |
| LL06 | Quadriceps femoris action | quadriceps femoris | quadriceps | **NEW** |
| LL07 | Adductor canal contents and walls | adductor canal | — | HIT-LIVE |
| LL08 | Obturator nerve course and distribution | obturator nerve | obturator | HIT-LIVE |
| LL09 | Piriformis and sciatic nerve relations | piriformis | — | HIT-PENDING |
| LL10 | Greater and lesser sciatic foramen contents | sciatic foramen | sciatic foramen | **NEW** |
| LL11 | Gluteus maximus action and nerve | gluteus maximus | gluteus maximus | **NEW** |
| LL12 | Gluteus medius/minimus and Trendelenburg | gluteus medius | trendelenburg | **NEW** |
| LL13 | Lateral rotators of hip | lateral rotators of hip | piriformis | HIT-PENDING |
| LL14 | Sciatic nerve course and sciatic bed | sciatic nerve | — | HIT-PENDING |
| LL15 | Hamstring muscles and nerve supply | hamstring muscles | hamstring | **NEW** |
| LL16 | Sciatic nerve injury sparing short head of biceps femoris | short head of biceps femoris | biceps femoris | HIT-LIVE |
| LL17 | Popliteal fossa boundaries and contents | popliteal fossa | — | HIT-PENDING |
| LL18 | Leg anterior compartment and deep peroneal nerve | deep peroneal nerve | deep peroneal | **NEW** |
| LL19 | Leg lateral compartment and superficial peroneal nerve | superficial peroneal nerve | — | HIT-PENDING |
| LL20 | Leg posterior compartment and tibial nerve | tibial nerve | — | HIT-PENDING |
| LL21 | Common peroneal nerve at fibular neck and foot drop | common peroneal nerve | — | HIT-PENDING |
| LL22 | Extensor digitorum brevis | extensor digitorum brevis | extensor digitorum brevis | **NEW** |
| LL23 | Sole muscle layers and plantar nerves | medial plantar nerve | — | HIT-LIVE |
| LL24 | Cutaneous nerve territories of the foot | sural nerve | sural | HIT-LIVE |
| LL25 | Arches of the foot | arches of the foot | longitudinal arch | **NEW** |
| LL26 | Femoral artery and profunda femoris branches | profunda femoris | profunda femoris | **NEW** |
| LL27 | Trochanteric and cruciate anastomoses | cruciate anastomosis | — | HIT-PENDING |
| LL28 | Popliteal artery branches | popliteal artery | — | HIT-LIVE |
| LL29 | Dorsalis pedis and posterior tibial arteries | posterior tibial artery | — | HIT-PENDING |
| LL30 | Great and small saphenous veins | great saphenous vein | saphenous vein | **NEW** |
| LL31 | Deep inguinal lymph nodes | deep inguinal lymph node | inguinal lymph node | **NEW** |
| LL32 | Hip joint ligaments and dislocation | hip joint ligaments | hip dislocation | **NEW** |
| LL33 | Knee joint cruciate ligaments and menisci | cruciate ligament knee | meniscus | **NEW** |
| LL34 | Knee locking/unlocking mechanism (popliteus) | unlocking of knee | popliteus | **NEW** |
| LL35 | Superior and inferior tibiofibular joints | tibiofibular joint | tibiofibular | **NEW** |
| LL36 | Ankle/subtalar joint inversion-eversion | subtalar joint | subtalar | **NEW** |
| LL37 | Pes anserinus tendons | pes anserinus | anserinus | **NEW** |

**Reading the NEW column.** 18 of the 20 genuinely-new ideas are Lower Limb, clustered around
thigh/gluteal muscle *actions* (quadriceps, hamstrings, gluteus maximus, Trendelenburg),
foramina/canal facts not yet seeded (sciatic foramen, femoral hernia), and knee/ankle/foot
joint specifics (meniscus, popliteus unlocking, tibiofibular joints, subtalar joint, pes
anserinus, arches). This reads as a real gap in the Kasr Lower Limb pending batch
(`103-BMS-anatomy-concepts.md`) rather than a phrasing miss — the same shorter-term technique
that recovered 22 upper-limb-leaning ideas from "NEW" barely moved the Lower Limb list. Only 2
Upper Limb ideas remain genuinely new (clavicle fracture displacement, forearm
anterior-compartment/pronator teres detail), and even UL02 has a plausible near-miss noted
above worth re-checking before Step 2 commits to minting it.

## Department files surveyed (context, not itself triaged)

87 distinct files (after collapsing `[from Alexandria University Updated]` twins) sit under
this module's `Anatomy/` and `General/` folders: 12 native `.pptx` faculty practical slide
decks, 2 atlases (`Atlas-upper limb`, `Atlas-lower limb`), the 7 bank files above, and the
remainder split between Dr Ayman Khanfour's lecture PDFs (17 Lower Limb lectures + osteology +
6 "Revisions" summary sheets; 21 Upper Limb lectures + osteology), Dr Ibrahim Amr's revision
notes (`تجميعات`/"compilations", `مذكرة`/"notes", `مكثف طلبة`/"student-intensive" — six PDFs,
confirmed by reading their cover pages and sampled body pages to be prose/table revision
material, **not** additional MCQ content, despite living in the same author's folder as the
banks), and two `General/` "corrections" documents (page-numbered errata against an unnamed
source — likely one of Dr Ibrahim Amr's own paginated notes documents, not independently
confirmed; see Hazards). The lecture-title sequence in both limbs maps directly onto the idea
list above; no lecture chapter was found that the bank does not already test, and no bank
idea was found that falls outside the lecture sequence.

## Owed

- The full ≥4-query `find-existing.mjs` protocol, plus `grep -ril "<canonical_key>"
  docs/*-Source-Imports/concept/`, for all 86 ideas once each has a drafted canonical key —
  this triage ran 1–2 queries/idea to size the checkpoint table honestly within the
  triage-stop budget (brief §12/§16; not skipped, deferred to Step 2 by design).
- Render-based reconstruction of the seven answer-key pages/regions (all five lettered-MCQ
  banks) before any individual question's letter is recorded as a confirmed key — Step 3 work,
  per SHARED-TOOLCHAIN's own rule against trusting a garbled table without a visual check.
- The 32 diagram-labelling questions in the two "mock practical exam" files are entirely
  image-dependent (`"Identify the muscle labelled 4…"` etc.) and the labelled prosection
  images do not exist in this corpus — every one of the 32 will need a `media_recommendations`
  request at Step 3, all `Priority: required` (per brief: "diagram questions stay diagram
  questions", never rewritten into prose that makes the missing figure not matter).
- The source of the two `General/` "corrections" documents' page numbers (39, 49, 123, 126…)
  is not confirmed — plausibly one of Dr Ibrahim Amr's paginated `مذكرة` notes files (95pp
  Lower Limb / 84pp Upper Limb) but not verified page-by-page. Worth a light check at Step 2
  if a `field_notes`/evidence link to those corrections is wanted.
- UL02 (clavicle fracture displacement) and the near-misses flagged inline in the Upper Limb
  table (UL01, UL04, UL05, UL07–UL10, UL14, UL16–UL20, UL22, UL24, UL27, UL28, UL30–UL49 all
  read HIT-PENDING against `101-ISK-*` batches — file names not individually re-verified
  beyond the printed `find-existing.mjs` hit line) should be re-confirmed against the specific
  101-ISK file/line at Step 2 mint time rather than assumed from this pass.

## Hazards

- **Five of the seven banks' answer keys are column-garbled by `pdftotext`'s reading order**,
  not a highlight/highlight-adjacent problem — a genuinely different failure mode from the
  toolchain's documented highlight/highlight-overlay/ink cases. Worst case (LL part 3) loses
  more than half its answer table outright. Flagging for whoever does Step 3 key recovery:
  this likely wants a `-layout`-preserving re-read of just the answer pages, not a redo of the
  whole extraction.
- **`MCQs - Upper limb MCQ Dr_ Ibrahim.pdf` is one file containing three independently
  numbered question sets** (each restarting at "(1)"). A naive question-count read of "the
  file has 60 questions" (the highest number appearing) would be wrong by a factor of ~2.7 —
  the true count is 160. Recorded here so the next reader of this file does not repeat that
  undercount.
- **The `تجميعات`/`مذكرة`/`مكثف طلبة` files under `Dr_ Ibrahim Amr/` are revision notes, not
  additional MCQ sources**, despite sitting in the same author folder as the five real banks
  and despite "تجميعات" often meaning "compilations" (which, elsewhere in this corpus, can
  mean question compilations). Confirmed by reading cover pages and sampled body text — they
  are prose/summary notes. Worth stating explicitly because the name alone would mislead a
  later reader into treating them as an eighth bank.
- **The two `امتحان تجريبي` ("mock exam") files are diagram-labelling practicals, not lettered
  MCQs**, despite both being filed with an `MCQs -` filename prefix and sitting in a
  `Questions` folder. Anyone filtering by filename alone would misclassify their format.
- Both `Musculoskeletal system-corrections` documents in `General/` reference page numbers of
  an unidentified source document — recorded as a teaching-correction resource, not linked to
  a specific evidence source, pending the check noted under Owed.
- This module's `General/` folder also contains the two "mock exam" bank files under
  `General/Practical/Questions/` specifically (not directly under `General/`) — a later reader
  searching only `departmentFolder == "General"` at the top level would find the two
  corrections documents but should not assume that folder has no bank content.

## Full per-question appendix

Grouped by bank; page numbers are 1-indexed into the cached PDF; stems are truncated to the
first ~140 characters extracted (option text and figure-based text vary in completeness — see
the Hazards note on garbled extraction). Row order follows the source page order, not the
distinct-idea table above.

<details>
<summary>EOM MCQs - Upper limb final MCQ Dr Ibrahim — src_6bb87147b493350691fc — 120 Qs</summary>

See Idea table UL01–UL49; stems for pages 2–24 confirmed by direct reading (sampled ~30% of
pages in full, remainder via automated stem extraction cross-checked against page counts).
Representative stems: Q1 "what muscle may be paralyzed by fracture of the humerus at
'surgical neck'?" (p2); Q19 "In carpal tunnel syndrome:" (p5); Q28 "Winging of scapula after
mastectomy operation is due to cut of the nerve arising from:" (p8); Q60 "roots of ulnar nerve
are:" (p13); Q98 "which nerve injury causes partial claw hand?" (p20); Q114–118 a
carpal-tunnel-syndrome clinical case spanning pp23–24; Q120 "What is the action of Flexor
Pollicis Longus?" (p24), followed by the nerve-root-value study note and the garbled answer
table (p25).

</details>

<details>
<summary>MCQs - Lower limb MCQ part 1 (Thigh) — src_f0b73dc856d890ca9c58 — 50 Qs</summary>

pp2–4: femoral triangle/sheath/canal/ring (Q1–15). pp5–6: adductor canal, obturator nerve
(Q16–25). pp7–8: gluteal region, sciatic/lesser-greater foramina (Q26–35). pp9–11: gluteus
maximus, popliteal fossa boundaries, hamstrings (Q36–50). Answer table on p12, jumbled (see
Key status).

</details>

<details>
<summary>MCQs - Lower Limb mcq part 2 (Leg) — src_78b66af9c28aa239cdb7 — 48 Qs</summary>

pp1–3: leg compartments, dorsi/plantarflexors, peroneus muscles (Q1–15). pp4: fibular-neck
fracture clinical vignette testing common peroneal nerve (Q17–20). pp5–8: cutaneous nerve
territories of leg/foot, sciatic nerve injury effects, tibial/peroneal nerve clinical
vignettes (Q21–48). Answer table on p12, jumbled.

</details>

<details>
<summary>MCQs - Lower Limb MCQs part 3 (Foot, Vessels, Joints) — src_a2ec24de7b5561128fed — 50 Qs</summary>

pp2–4: sole muscle layers, plantar nerves, cuboid groove clinical vignette (Q1–15). pp5–8:
popliteal fossa contents, dorsalis pedis, saphenous vein, trochanteric/cruciate anastomoses,
femoral/popliteal/tibial arteries (Q16–35). pp8–11: hip/knee joint ligaments and bursae,
tibiofibular joint, ankle inversion/eversion, arches of the foot (Q36–50). Answer table on
p12 — only 21 of 50 letters legible after extraction (see Key status, worst case of the five
banks).

</details>

<details>
<summary>MCQs - Upper limb MCQ — src_c86f47635016c192bd42 — 160 Qs across 3 sub-sections</summary>

**Section A (pp2–12, Q1–50):** clavicle/scapula/humerus osteology, scapular
muscles/rotator cuff, winging of scapula, quadrangular/triangular spaces, clinical vignettes
(clavicle fracture, pectoralis minor paralysis, arm adduction). Answer table p13.

**Section B (pp14–24, Q1–50):** axilla boundaries/artery/vein/lymph nodes, brachial plexus
roots/trunks/cords/branches, arm/cubital fossa contents, clinical vignettes (winged scapula
stab wound, lateral-cord lesion, midshaft humerus fracture, brachial artery venipuncture
landmark). Answer table pp25–26.

**Section C (pp27–39, Q1–60):** forearm compartments, wrist retinacula, hand
intrinsic muscles, carpal tunnel syndrome, ulnar/median/radial nerve injury clinical
vignettes at wrist and elbow level. Answer table embedded in p39 beneath Q60's stem.

</details>

<details>
<summary>MCQs - امتحان تجريبي 1 ("mock practical exam 1") — src_37ce166b69d2c0a0f0ab — 16 items / 32 sub-answers</summary>

Diagram-labelling spot exam, every item with an `a`/`b` part ("Identify the muscle/structure
labelled … and mention its nerve supply/action/origin/root value…"). Items 1–8 read as Upper
Limb prosection images (latissimus dorsi, brachialis, brachioradialis, extensor pollicis
longus, radial artery, median nerve, musculocutaneous nerve, subclavius groove, spiral groove).
Items 9–16 read as Lower Limb prosection images (sartorius/femoral nerve, ASIS, femoral
artery, gluteus minimus, inferior gemellus, hamstrings, tibial/sural nerve, popliteal
vein/small saphenous vein, superficial peroneal nerve, arcuate artery, patellar ligament, pes
anserinus tendons, biceps femoris, common peroneal nerve). Full clean-prose answer key
embedded after Q16 (p18–19).

</details>

<details>
<summary>MCQs - امتحان تجريبي 2 ("mock practical exam 2") — src_f52b688229ba15f4b183 — 16 items / 20 sub-answers</summary>

Same format, second image set: serratus anterior, teres minor, flexor carpi ulnaris, ulnar
nerve/artery, scapula/deltoid, elbow-joint capitulum/trochlea/biceps tendon (Upper Limb, items
1–8); pectineus, femoral vein/great saphenous vein, adductor magnus, common peroneal nerve,
extensor hallucis brevis/anterior tibial nerve, ASIS/sartorius, femur (quadrate
tubercle/quadratus femoris), tibia (femoral condyles/menisci) (Lower Limb, items 9–16). Full
clean-prose answer key embedded after Q16 (p18–19).

</details>
