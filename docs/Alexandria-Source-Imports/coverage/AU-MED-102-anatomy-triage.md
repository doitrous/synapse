# AU-MED-102 · Anatomy — question-led triage

Lane W1-102-ANAT. Module `AU-MED-102` (`MED 102 - Foundation of Basic Medical Sciences &
Medical Terminology`), department `Anatomy`, year `AU_Y1`. GUARD = paper (5 End of Module
rows in `Exams`, cohort 2030, both streams — `مصريين`/Egyptian and `وافدين`/wafdeen — 3 of
the 5 also carry the filename's `EOM MCQs -` naming). Step 1 only — no concepts, articles or
questions authored below. Ends at the LANE-BRIEF §8 checkpoint.

## Counts

| questions triaged | keyed | unkeyed | distinct concepts tested (Anatomy) | hit-live | hit-pending | new |
|---:|---:|---:|---:|---:|---:|---:|
| 177 (28 EOM-paper items + 139 department-bank items + 10 tutorial items) | 129 | 48 | 31 | 3 | 22 | 6 |

Of the 177 raw items, only the Anatomy-taught ones are counted at all — every EOM paper and
every department-book MCQ bank in this module also carries Biochemistry, Histology,
Physiology and Embryology items, which are other lanes' scope and are not listed below except
where a single file mixes departments and the boundary needs a note (see HAZARDS). The 139
department-bank figure is **raw**, not deduplicated: two of the three Anatomy/Questions banks
(`Nebras` and `Alpha Team`/`Questions Anatomy`) draw on the same underlying item pool with
heavy item-level overlap — see HAZARDS. Every row below traces to a specific question.

## Sources read

### Papers and banks (pre-cached by the tooling lane; I did not extract these myself)

| sourceId | file | category | mode | key status found |
|---|---|---|---|---|
| `src_8d6ddf874f8984be8217` | `Exams/EOM - End foundation 2030.pdf` | End of Module paper | native, 12p | answer block at foot of each department section; cohort 2030 |
| `src_3bf4527b51de57464e14` | `Exams/EOM - Final foundation 2030.pdf` | End of Module paper | native, 24p | answer block on last page (Q1–112); cohort 2030 |
| `src_413115a28d7dc9914c91` | `Exams/EOM - Foundation Final Egyptian.pdf` | Department Questions | native, 24p | **content- and key-identical to `src_3bf4527b51de57464e14`** — same 112 questions, same answer block; this is the Egyptian-stream twin of the "Final" paper, filed a second time under the stream-labelled name |
| `src_7d031a45baeadc973a00` | `Exams/EOM - end foundation مصريين 222 1.pdf` | Department Questions | native, 11p | **content- and key-identical to `src_8d6ddf874f8984be8217`** — same per-department question set and answer blocks; the Egyptian-stream twin of the "End" paper |
| `src_29f02a5a4d6a273dea76` | `Exams/EOM - End Foundation wafdeen-1.pdf` | Department Questions | native, 15p | **no answer block anywhere in the file** — 60 questions end at page 15 with no key page. Distinct question set from both "End" and "Final" (different stems throughout), so this is a third, unkeyed exam, not an unkeyed twin of the other two. |
| `src_84b91e011582f2b53494` | `Anatomy/Questions/MCQs - Dr. Wagih Anatomy MCQ (1-7).pdf` | Department Questions | native (OCR-derived from a CamScanner capture) | answer letters are present but printed as a loose cluster after each ~4-question block (e.g. `2\na\nb\na\nC`), not aligned one-per-line to a question number. **Recorded as unkeyed pending recovery** — resolving the letter-to-question mapping needs the source render, not just the cached text (see HAZARDS). |
| `src_2df3b7f9b3b393dc1d8f` | `Anatomy/Questions/MCQs - Foundation Anatomy & Embryology mcqs Nebras.pdf` | Department Questions | native, clean typed | dedicated "Anatomy Answers" block after the Anatomy section, **keyed 1–55**; questions 56–59 (spleen/vertebra image items) have no corresponding answer — the key block stops at 55. Embryology 1 and 2 sections (out of this department's scope) are separately and fully keyed. |
| `src_98e8ccbfb3fe73a8c8e3` | `Anatomy/Questions/MCQs - Questions Anatomy.pdf` | Department Questions | native (OCR-derived, "ALPHA TEAM" watermark) | numbered 116–165 (continuing some larger shared bank's numbering), dedicated answer block at the end, **all 50 keyed**. |

### Department files (Anatomy, non-bank; extracted myself via `scripts/alexandria/extract/pagetext.py` — not a paper or bank, so this was mine to run)

| sourceId | file | pages | role |
|---|---|---|---|
| `src_bfb1aee3422c7577592c` (twinPreferred) | `Anatomy/Anatomy Summaries [from Alexandria University Updated].pdf` | 15 | Condensed revision sheet covering every chapter below in table form — the single best department-book stand-in for chapter/topic grouping |
| `src_f583b6307cd9eae9396e` (twinPreferred) | `Anatomy/Anatomy Tutorial (AFM).pdf` | 27 | Case-based teaching tutorial, 10 clinical-vignette MCQs (planes, integument layers, retinacula, joint types, muscle action terms, splenic injury, lymphatics) — **no answer key printed in the extracted text** (teaching format; answers likely given verbally/on a hidden slide element) |
| `src_92732176de913f13d67b` (twinPreferred) | `Anatomy/Practical/Practical Anatomy Tutorial (AFM).pdf` | 54 | Not read in detail this pass — cached and available; flagged under OWED |
| `src_424c2febb118e907961b`, `src_17e9372cf9a77c5415c6`, `src_aa961e792bb808bf99d8`§, `src_f0a56ea1239aac521f5c`, `src_124d50615124de8347ba`, `src_6ec5cca310bb4d73f8cd`, `src_da42baad3ca04c362456` | `Anatomy/Dr_ Ayman Khanfour/1–7 - *.pdf` | 34/31/50/23/49/32/44 | The seven numbered lecture files: (1) Anatomical position & movement, (2) Layers of the body, (3) Skeletal system, (4) Vertebral column, (5) Joints, (6) Muscular system, (7) Lymphatic system. Titles alone confirm the chapter breakdown used below; not read page-by-page this pass (Anatomy Summaries already condenses them and the questions are the scope driver per brief §10) |

§ `src_aa961e792bb808bf99d8` is the `twinPreferred` copy of lecture 3 (Skeletal system) despite carrying `textLayer: none` in the manifest — the non-preferred twin (`src_6dd7185932ebccaad38e`) is native. Both are now cached; a later lane citing this lecture should sanity-check which twin actually reads better rather than trusting `twinPreferred` blindly here.

## Questions this department teaches, grouped by department-book chapter

Chapter headings follow the seven Dr. Ayman Khanfour lecture files, in the order the Anatomy
Summaries sheet presents them.

### Anatomical position, planes, directional terms, movements

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_29f02a5a4d6a273dea76` | p2 | Plane dividing body into upper/lower parts | unkeyed (file has no key) | stream: wafdeen (filename) |
| `src_2df3b7f9b3b393dc1d8f` | p2 | Plane dividing superior/inferior (Q4); plane dividing right/left (Q5); anatomical-position criteria, true statement (Q6) | keyed (C, B, B) | — |
| `src_98e8ccbfb3fe73a8c8e3` | p1–2 | Same three items renumbered 119–121, plus superior≠caudal (116), median=near midline (117), flexion≠straightening (118), inferior≠cranial (122), radius/ulna non-parallel (123), plantar surface=sole (124) | keyed (all) | duplicate pool of the Nebras Anatomy section |
| `src_3bf4527b51de57464e14` / `src_413115a28d7dc9914c91` | p22 (Q107) | Moving toward the midline = adduction | keyed (B) | cohort 2030 / Egyptian |
| `src_f583b6307cd9eae9396e` | p3 | Sectioning plane parallel to both scapulae (frontal/coronal) | unkeyed (tutorial, no printed key) | clinical vignette |
| `src_f583b6307cd9eae9396e` | p5–6 | Order of tissue layers pierced by an IM injection to the shoulder | unkeyed (tutorial) | clinical vignette |

### Skin, superficial and deep fascia

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_8d6ddf874f8984be8217` / `src_7d031a45baeadc973a00` | p1 | Fatty connective tissue just under the skin = superficial fascia | keyed (d) | cohort 2030 / Egyptian |
| `src_3bf4527b51de57464e14` / `src_413115a28d7dc9914c91` | p16 (Q76) | Best description of deep fascia (forms intermuscular septa) | keyed (A) | cohort 2030 / Egyptian |
| `src_f583b6307cd9eae9396e` | p8–10 | Sunburn's effect on integument function; structure cut in a wrist laceration (retinaculum, "bowstringing" tendons) | unkeyed (tutorial) | clinical vignette |

### Skeletal system general (classification, functions, ossification, long-bone structure)

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_8d6ddf874f8984be8217` / `src_7d031a45baeadc973a00` | p1 | Growing end of long bones — which bone has a growing upper end | keyed (b, humerus) | cohort 2030 / Egyptian |
| `src_29f02a5a4d6a273dea76` | p3 | Appendicular-skeleton bone (humerus vs sternum/ribs/skull) | unkeyed | wafdeen |
| `src_29f02a5a4d6a273dea76` | p3 | Synovial uniaxial joint (elbow) — placed here because the stem tests bone/joint classification jointly | unkeyed | wafdeen |
| `src_3bf4527b51de57464e14` / `src_413115a28d7dc9914c91` | p1 (Q6) | Growing end of a bone (upper end of humerus) | keyed (A) | cohort 2030 / Egyptian |
| `src_98e8ccbfb3fe73a8c8e3` (=`src_2df3b7f9b3b393dc1d8f` Q9–20) | p2–4 | Axial-skeleton exceptions; long-bone exceptions; sesamoid bone; long-bone parts; growing ends of humerus/radius-ulna and femur/tibia-fibula; nutrient-artery direction; epiphysis/diaphysis/metaphysis; epiphysis-diaphysis separator; sex differences in bone; osteoporosis risk factors | keyed (all, both twin banks) | — |
| `src_84b91e011582f2b53494` | p4–5 | Upper-limb bone exception; non-function-of-bone (false statement); pneumatic-bone rationale; largest sesamoid bone (patella); skull-cap bone class (flat); bone-false-statement (lymphatics); pneumatic-bone function exception | key present but unkeyed pending recovery (see Sources) | Wagih bank |

### Vertebral column

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_3bf4527b51de57464e14` / `src_413115a28d7dc9914c91` | p1 (Q3) | Number of cervical vertebrae (seven) | keyed (C) | cohort 2030 / Egyptian |
| `src_2df3b7f9b3b393dc1d8f` / `src_98e8ccbfb3fe73a8c8e3` | p4–5 | Vertebral-body location; muscle/ligament attachment site (processes); bone-marrow function; vertebral column protects spinal cord; vertebrae classified as irregular bones | keyed (both twin banks) | — |
| `src_2df3b7f9b3b393dc1d8f` | p8–9 | Vertebra-type identification from an image (Q57); vertebral-process labelling from an image (Q58) | **unkeyed** (past the Q55 key cutoff) | image/diagram questions |
| `src_3bf4527b51de57464e14` / `src_413115a28d7dc9914c91` | p23 (Q112) | Sympathetic centre in the CNS (lateral thoracolumbar horn cell) — kept out of this department's scope; it is an ANS/Physiology item that happens to sit beside the Anatomy-relevant Q107 in the same paper | n/a — not this department | flagged, not triaged here |

### Joints

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_8d6ddf874f8984be8217` / `src_7d031a45baeadc973a00` | p1 | Synovial plane joint (intercarpal) | keyed (d) | cohort 2030 / Egyptian |
| `src_3bf4527b51de57464e14` / `src_413115a28d7dc9914c91` | p16 (Q75) | Joint type found in the midline (secondary cartilaginous) | keyed (D) | cohort 2030 / Egyptian |
| `src_2df3b7f9b3b393dc1d8f` / `src_98e8ccbfb3fe73a8c8e3` | p5–8 | Sutures/gomphosis/syndesmosis identification; most-fixed joint type; pivot-joint axis; hinge-joint locations; intercarpal-joint axis; commonest joint type in the body; synovial-joint cartilage covering (true); joints permitting movement; joint-surface roughness by fibrous-joint type; joints of limited movement; elbow = hinge; triceps role in elbow extension; peg-and-socket joints (gomphosis); temporary-cartilage claim (secondary cartilaginous, false); uniaxial-synovial-joint exception (saddle); ball-and-socket = polyaxial; ellipsoid-joint example (wrist); joint innervation = supplies the muscles acting on it (Hilton's law) | keyed (both twin banks, 1–55 range) | — |
| `src_84b91e011582f2b53494` | p2–3, p8 | Synovial-joint definition; elbow = hinge; skull sutures = fibrous; temporary joint (primary cartilaginous); intervertebral disc = secondary cartilaginous; most-fixed joint (sutures); movements allowed by ball-and-socket; xiphisternal joint type; synovial-membrane function; foot inversion; circumduction; ear cartilage type; hinge-joint movements; pivot-joint example | key present but unkeyed pending recovery | Wagih bank |
| `src_f583b6307cd9eae9396e` | p12–20 | Uniaxial joint on radiograph (ankle); joint type at a herniated L3–4 disc (secondary cartilaginous) | unkeyed (tutorial) | clinical vignette |

### Muscular system

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_3bf4527b51de57464e14` / `src_413115a28d7dc9914c91` | p16 (Q77) | Muscle-fibre arrangement with the widest range of movement (parallel) | keyed (B) | cohort 2030 / Egyptian |
| `src_2df3b7f9b3b393dc1d8f` / `src_98e8ccbfb3fe73a8c8e3` | p6, p7 | Cardiac-muscle control/structure; alimentary-canal muscle type (smooth) | keyed (both twin banks) | — |
| `src_84b91e011582f2b53494` | p6–8 | Prime mover (definition); triceps' role in elbow extension; aponeurosis definition; appendicular-skeleton bone count; voluntary-muscle identification; smooth-muscle locations | key present but unkeyed pending recovery | Wagih bank |
| `src_f583b6307cd9eae9396e` | p22 | Term for the muscle that performs the desired action during elbow flexion (agonist) | unkeyed (tutorial) | clinical vignette |

### Lymphatic system and spleen

| sourceId | page | stem (short) | key status | signals |
|---|---|---|---|---|
| `src_8d6ddf874f8984be8217` / `src_7d031a45baeadc973a00` | p1 | Territory drained by the thoracic duct (right lower limb) | keyed (a) | cohort 2030 / Egyptian |
| `src_29f02a5a4d6a273dea76` | p5 | Ribs related to the diaphragmatic surface of the spleen | unkeyed | wafdeen |
| `src_3bf4527b51de57464e14` / `src_413115a28d7dc9914c91` | p17 (Q78–79) | Impression above the splenic hilum (gastric); ribs at risk in a splenic injury (left 9–11) | keyed (A, D) | cohort 2030 / Egyptian |
| `src_2df3b7f9b3b393dc1d8f` | p8 | Organ related to the spleen (left kidney, Q54); vessel in the lienorenal ligament before the hilum (splenic vein, Q55) | keyed (C, A) | — |
| `src_f583b6307cd9eae9396e` | p24–26 | Ribs injured with the spleen in blunt trauma (8th–10th); organ most likely injured with those ribs; chyle-richest lymphatics (small intestine) | unkeyed (tutorial) | clinical vignette |

## Unkeyed / unresolved

| sourceId | page(s) | item(s) | why unkeyed |
|---|---|---|---|
| `src_29f02a5a4d6a273dea76` | p1–15 | All 60 questions (4 Anatomy-relevant: Q8, 9, 10, 21) | No answer block anywhere in the 15-page file — the paper simply ends after Q60. Not a highlight/annotation case (no colour, no marks visible in the extracted text); may still hide a mark on the source render, which this triage did not open (no OCR of a paper performed per brief). Flagged for the recovery procedure in Step 3, not guessed here. |
| `src_2df3b7f9b3b393dc1d8f` | p8–9 | Anatomy Q56–59 (spleen-related-organ image item onward: Q57 vertebra ID, Q58 process ID, Q59 plane ID) | The file's own "Anatomy Answers" block stops at item 55; items 56–59 have no corresponding key entry — the examiner's answer sheet itself is incomplete, not a extraction gap (the block is present and complete for 1–55). |
| `src_84b91e011582f2b53494` | p2–8 (~30 items) | The whole General-Anatomy section of the Wagih bank | Answer letters are printed (e.g. `b\nb\nb\n‫[ك‬:٤٢`) but not aligned one-per-question; this is a scanned/CamScanner capture and the OCR has evidently collapsed a per-question answer column into a loose cluster after each block of ~4 questions. Per `SHARED-TOOLCHAIN.md`'s "MCQ option labels go missing" finding, resolving this needs the position of each mark relative to its question on the source render, not just the cached text — recorded as unkeyed pending recovery rather than guessed from apparent order. |
| `src_f583b6307cd9eae9396e` | all 27p | All 10 Anatomy Tutorial (AFM) case items | No answer key of any kind appears in the extracted text for any of the 10 vignettes — this is a teaching/discussion tutorial (title slide names an instructor, ends "Any Questions? THANK YOU"), so the correct answer may have been given verbally in the session rather than printed on a slide. Recorded as unkeyed; not a candidate for the highlight/annotation recovery procedure since there is no key of any kind to recover. |

## Cohort / stream signals

Manifest `examSignals` for the five `Exams` rows: `EOM - End foundation 2030.pdf` and
`EOM - Final foundation 2030.pdf` both carry `cohortSignal: ["2030"]`, `streamSignal: null`;
`EOM - end foundation مصريين 222 1.pdf` carries `streamSignal: "egyptian"`,
`cohortSignal: null`; the other two (`End Foundation wafdeen-1.pdf`,
`Foundation Final Egyptian.pdf`) carry both signals `null` despite the filename stating the
stream outright (`wafdeen`, `Egyptian`) — the same class of manifest gap the AU-MED-103
triage already flagged for `streamSignal`. No page in any of the five files carries a dated
header, so `sittingYear` correctly stays empty everywhere; cohort 2030 is recorded as a
graduating-batch signal only, per brief §5, never as a sitting year.

## Ordered list of distinct ideas tested → concept candidates

In department-book chapter order. Key search run per idea: `find-existing.mjs` with ≥4
queries (short, single/two-word terms — compound phrases under-match this tool's plain
substring search) plus `grep -ril "<term>" docs/*-Source-Imports/concept/`.

| # | Idea (as tested) | Classification | Evidence |
|---|---|---|---|
| 1 | Anatomical position (definition/criteria) | **HIT-PENDING** | `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md` (aliased "Anatomical position"); also a `## term` in `docs/import-ready/glossary/GLOSSARY-ANATOMY-001.md` (different content type) |
| 2 | Anatomical planes (median/sagittal, coronal, transverse/horizontal) | **HIT-PENDING** | `101-ISK-mcq-concepts.md` "The three anatomical planes are named by the two parts each one leaves behind" |
| 3 | Directional terms (superior/inferior, medial/lateral, proximal/distal) | **HIT-PENDING** | extensive hits across `101-ISK-mcq-concepts.md` and `101-ISK-mcq.md` (regional, not as one dedicated "terms of relation" concept — Step 2 should check whether a single dedicated record exists or whether this is scattered field_notes on regional concepts) |
| 4 | Movements terminology (flexion/extension, abduction/adduction, circumduction, inversion/eversion, pronation/supination) | **HIT-LIVE** (circumduction only) + **HIT-PENDING** (the rest) | live `CON-MSK-9E9BBA40F75CE3` "shoulder circumduction" (grain: shoulder-specific, not the general term); `101-ISK-mcq-concepts.md` / `101-ISK-mcq.md` for flexion, abduction, eversion in regional contexts |
| 5 | Skin structure (epidermis, dermis) | **HIT-PENDING** | `101-ISK-mcq-concepts.md` "Epidermis" / "Ectoderm makes the nervous system and the epidermis"; `103-BMS-histology-concepts.md` for dermis papillary layer (different grain — histology, not gross) |
| 6 | Superficial fascia (composition, function) | **HIT-PENDING** | `101-ISK-concepts.md` / `101-ISK-mcq-concepts.md` "Superficial fascia insulates, smooths, mobilises, conducts, and carries muscles and glands" — extensive (article + concept + question + 2 written batches) |
| 7 | Deep fascia (structure, function, retinacula, intermuscular septa) | **HIT-PENDING** | `101-ISK-concepts.md` "Deep fascia is one non-elastic collagen membrane that takes five different forms" — extensive; intermuscular septa specifically in `101-ISK-mcq-concepts.md` |
| 8 | Axial vs appendicular skeleton | **HIT-PENDING** | `101-ISK-mcq-concepts.md` "The axial skeleton is the skull, hyoid, sternum, ribs and vertebral column" / "the appendicular skeleton is the limbs and their girdles" |
| 9 | Bone classification by shape (long/short/flat/irregular/pneumatic/sesamoid) | **HIT-LIVE** + **HIT-PENDING** | live `CON-MSK-12504AAE2403E8` "Anatomical bone classification by shape includes long, short, flat, and irregular bones"; pending `101-ISK-mcq-concepts.md` carries the fuller six-class version (adds pneumatic, sesamoid) — Step 2 should update the live record rather than duplicate |
| 10 | Bone functions incl. hematopoiesis | **HIT-LIVE** + **HIT-PENDING** | live `CON-HEM-F4A6018FB59FDD` "Hematopoiesis is blood-cell formation in bone marrow and lymphatic organs"; pending `101-ISK-mcq.md` bone-marrow question set |
| 11 | Long bone structure, growing end, nutrient-artery direction | **HIT-PENDING** | `101-ISK-mcq-concepts.md` "A long bone is an epiphysis at each end, a diaphysis between them, and a metaphysis..."; "the end that ossifies later is the growing end"; "nutrient artery inside, periosteal arteries outside" |
| 12 | Ossification (membranous/intramembranous vs endochondral; primary/secondary centres) | **HIT-PENDING** | `101-ISK-mcq-concepts.md` "In intra-membranous ossification... In intra-cartilaginous (endochondral) ossification..." |
| 13 | Sex differences in bone / osteoporosis risk factors | **NEW** | no hit under `sex difference bone`, `osteoporosis` (checked against the bone-marrow and hematopoiesis hits above, which are a different idea) |
| 14 | Typical vertebra structure (body, pedicle, lamina, transverse/spinous process, vertebral foramen) | **NEW** | no hit under `vertebral body`, `pedicle`, `vertebral foramen`; `grep -ril vertebra docs/*-Source-Imports/concept/` returns 4 files (`101-ISK-mcq-concepts.md`, `101-ISK-concepts.md`, `102-INT-concepts.md`, `104-CPS-concepts.md`) but every hit on inspection is a passing mention (embryological origin of vertebrae, spinal-cord segment counts, "irregular bone such as a vertebra") — none describes the typical vertebra's own parts |
| 15 | Regional vertebrae differences (cervical/thoracic/lumbar/sacral/coccygeal counts and distinguishing features) | **NEW** | no hit under `cervical vertebrae`, `sacrum`, `coccyx` that describes vertebral counts/features (the `sacrum`/`coccyx` hits found are unrelated live concepts — gluteal dermatome, uterosacral ligament) |
| 16 | Vertebral column protects the spinal cord (as a stated function) | **NEW** | no dedicated hit; `101-ISK-mcq-concepts.md` describes the spinal cord's own structure (31 segments, grey/white matter) but not the column-as-protection statement |
| 17 | Joint classification overview (fibrous/cartilaginous/synovial) | **HIT-PENDING** | `101-ISK-mcq.md` "Regarding the types of joints of the upper limb..." (regional grain; a general three-way classification record may or may not already exist as its own entry — Step 2 to confirm) |
| 18 | Fibrous joints (sutures, gomphosis, syndesmosis) | **HIT-PENDING** | `101-ISK-anatomy.md` article "Fibrous joints" |
| 19 | Cartilaginous joints (primary/secondary) | **HIT-PENDING** | `101-ISK-concepts.md` / `101-ISK-mcq-concepts.md` "Primary cartilaginous joints are hyaline and temporary. A secondary cartilaginous joint (symphysis) unites bones by fibrocartilage..." |
| 20 | Synovial joint structure (capsule, membrane, cavity, articular cartilage) | **HIT-PENDING** | `101-ISK-concepts.md` "A synovial joint is seven named components around a potential cavity"; article "Structure of a synovial joint" |
| 21 | Synovial joint classification by axis (uniaxial/biaxial/polyaxial: hinge, pivot, saddle, condylar, ellipsoid, ball-and-socket) | **HIT-PENDING** | `101-ISK-anatomy.md` article "Types of synovial joint"; `101-ISK-concepts.md` sternoclavicular-saddle-joint record — ellipsoid/condylar/ball-and-socket as standalone terms did not individually hit, but sit inside the same "types of synovial joint" article per the grep |
| 22 | Joint innervation (Hilton's law) | **HIT-PENDING** | `101-ISK-mcq-concepts.md` "Hilton's law" |
| 23 | Muscle types (skeletal/smooth/cardiac — structure and control) | **HIT-PENDING** (general classification) — cardiac and smooth muscle *specific facts* are separately **HIT-LIVE** at a different grain | `101-ISK-mcq-concepts.md` "Types of muscle"; live `CON-DEV-2CB0B170DE78F1` (cardiac muscle embryological origin), `CON-CVS-AD0881F8B57C91` (afterload) — neither is the general three-type classification, so pending record is the one to update |
| 24 | Skeletal muscle parts (belly, tendon, aponeurosis) | **HIT-PENDING** | `101-ISK-concepts.md` "A muscle attaches either directly to bone or through a tendon or an aponeurosis" |
| 25 | Muscle fibre architecture (parallel vs pennate; range of movement vs strength trade-off) | **HIT-PENDING** | `101-ISK-mcq-concepts.md` "Skeletal muscles are classified by the direction of their fibres, from strap-like to multipennate" |
| 26 | Muscle action roles (prime mover/agonist, antagonist, fixator, synergist) | **HIT-PENDING** | `101-ISK-mcq-concepts.md` — "Prime mover", "Fixator", "Synergist" each aliased individually; "antagonist" alone did not hit as a standalone alias (checked) but is very likely covered inside the same concept cluster — Step 2 to confirm before treating as new |
| 27 | Lymphatic system components (vessels, nodes — general structure) | **HIT-PENDING** (regional: axillary nodes) — general vessel/node structure grain **not separately confirmed** | `101-ISK-mcq.md` axillary-lymph-node questions; `104-CPS-practical-concepts.md` covers node histology (different grain, histological not gross) |
| 28 | Lymphatic ducts (thoracic duct vs right lymphatic duct — drainage territories) | **HIT-PENDING** | `101-ISK-mcq-concepts.md` "The right lymphatic duct drains one quadrant of the body and the thoracic duct drains the other three" |
| 29 | Spleen gross anatomy (borders, ends, impressions — gastric/colic/renal/pancreatic, rib relations) | **NEW** | no hit under `spleen`, `splenic` that describes gross/topographic anatomy — every existing spleen hit (`104-CPS-*`) is histological (white/red pulp, T-dependent zone, sinusoids) or functional (RBC/platelet destruction); `101-ISK-mcq-concepts.md`'s own note says its spleen coverage is "sites and... four functions," not gross anatomy |
| 30 | Spleen attachments (gastrosplenic and lienorenal ligaments) and vascular path | **NEW** | no hit under `lienorenal ligament`, `gastrosplenic ligament` anywhere (find-existing and grep both empty) |
| 31 | Spleen function (general, e.g. RBC/platelet destruction, immune) | **HIT-PENDING** | `101-ISK-mcq-concepts.md`'s own field_notes name "the spleen with its four functions" as part of that chapter (exact wording not yet isolated as its own record — Step 2 to locate before treating as new) |

**Table total: 31 distinct ideas** — 3 HIT-LIVE (rows 4, 9, 10 — each also has a HIT-PENDING
record at a different or fuller grain that Step 2 should reconcile rather than duplicate), 22
HIT-PENDING (rows 1, 2, 3, 5, 6, 7, 8, 11, 12, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
31), 6 NEW (rows 13, 14, 15, 16, 29, 30).

**The dominant finding of this search: nearly every fundamental idea this department teaches
already exists, in full authored form, in `docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md`**
(and its sibling `101-ISK-concepts.md` / `101-ISK-anatomy.md` / `101-ISK-anatomy-2.md`
articles) — the Kasr Year-1 "Integumentary Skeletal" module teaches the same foundational
gross anatomy Alexandria's Foundation module does. Step 2 for this lane will be almost
entirely **sparse update** work (`+au`, `+AU_Y1`, `+AU-MED-102`, `university_notes` where
Alexandria's wording differs) into `pending-live/AU-MED-102-anatomy.md` per LANE-BRIEF §16
rule 1 (the 101-ISK batch is itself unimported), not minting. The two genuinely new pockets
are (a) vertebral-column osteology proper (typical vertebra, regional differences — 101-ISK
only touches vertebrae in passing, via embryology and spinal-cord segmentation) and (b) spleen
gross/topographic anatomy (101-ISK and 104-CPS both stop at spleen function/histology).

## HAZARDS

- **`streamSignal`/`cohortSignal` manifest gaps**, same class already flagged by the
  AU-MED-103 triage: `EOM - End Foundation wafdeen-1.pdf` and `EOM - Foundation Final
  Egyptian.pdf` both name their stream in the filename but carry `streamSignal: null` in the
  manifest. Worth the manifest-owning lane's attention across the rest of `au-y1-sources.json`.
- **Two exam-content pairs are true content-duplicates under different filenames, not
  independent papers**: `EOM - Final foundation 2030.pdf` ≡ `EOM - Foundation Final
  Egyptian.pdf` (112/112 questions, identical stems and key); `EOM - End foundation 2030.pdf`
  ≡ `EOM - end foundation مصريين 222 1.pdf` (56/56 questions, identical). Authoring should cite
  one of each pair and record the other as the twin, not author both as independent evidence.
- **`EOM - End Foundation wafdeen-1.pdf` is a genuinely distinct third exam**, not a wafdeen
  twin of either of the above (compared stem-by-stem; no overlap with either paper's Q1). It
  is also the only fully unkeyed EOM-family file in this module.
- **The Wagih bank (`src_84b91e011582f2b53494`) is a CamScanner capture whose OCR has
  collapsed the answer column** — this is a variant of the "MCQ option labels go missing"
  finding in `SHARED-TOOLCHAIN.md`, but on the *key* rather than the option labels. Recovery
  needs the render (position of each mark relative to its question), which is Step 3 work,
  not something to guess from apparent list order.
- **Two of the three Anatomy/Questions banks overlap heavily.** `MCQs - Foundation Anatomy &
  Embryology mcqs Nebras.pdf`'s Anatomy section (59 items, numbered 1–59) and `MCQs -
  Questions Anatomy.pdf` (50 items, numbered 116–165) test the same underlying pool — e.g.
  Nebras Q9 ("Planter surface of the foot & dorsum") = Alpha Q124 verbatim. Both were kept in
  the sources-read table and the per-question table above lists them together rather than as
  177 independent facts; Step 2 should treat matching items as one question, not two, when
  deciding how many distinct MCQ records this bank actually yields.
- **`MCQs - Dr. Wagih Anatomy MCQ (1-7).pdf` and `MCQs - Foundation Anatomy & Embryology mcqs
  Nebras.pdf` both mix Anatomy with Embryology content**, despite being filed under the
  `Anatomy` department folder. Only the Anatomy-labelled sections are triaged above; the
  Embryology sections (extensive — fertilization through placenta/umbilical cord in the Wagih
  bank, three full Embryology sub-banks in Nebras) are out of this lane's scope and should be
  flagged to whichever lane owns AU-MED-102's Embryology department, since they will not
  otherwise know these two files exist under the Anatomy folder.
- **`src_3bf4527b51de57464e14` / `src_413115a28d7dc9914c91` Q112** (sympathetic centre,
  lateral thoracolumbar horn cell) sits directly beside the Anatomy-relevant Q107 in the same
  109-question block with no department header in this paper (unlike the "End" exam, which
  does print department headers) — kept out of this triage as a Physiology/ANS item, but the
  boundary is soft and worth the Physiology lane's confirmation.
- **`Anatomy Tutorial (AFM).pdf` has no printed answer key for any of its 10 items** — every
  other Anatomy source in this module has at least a partial key. If a later lane needs these
  10 keyed, it will have to come from outside this corpus (the lecturer's own notes, a
  parallel recording) rather than from anything cached here.
- **`src_aa961e792bb808bf99d8`** (lecture 3, Skeletal system) is marked `twinPreferred: true`
  in the manifest despite `textLayer: none`, while its non-preferred twin
  (`src_6dd7185932ebccaad38e`) is native. Both are now cached in `scripts/alexandria/pagetext/`;
  whoever cites this lecture in Step 2 should read both and use whichever the cache actually
  extracted usable text from, rather than trusting `twinPreferred` on this one pair.

## OWED

- **Embryology content inside two Anatomy-folder MCQ banks** (see HAZARDS) — needs a note to
  the AU-MED-102 Embryology lane; not authored here.
- **`Practical Anatomy Tutorial (AFM).pdf`** (`src_92732176de913f13d67b`, 54p, cached) — not
  read this pass; likely the source for a later practical/diagram-question lane.
- **Seven numbered lecture files (Dr. Ayman Khanfour)** were used only by title for chapter
  grouping, not read page-by-page — the Anatomy Summaries sheet already condenses their
  content and the scope test is question-led (brief §10), so this was not needed for triage,
  but Step 2's article authoring should read them directly rather than citing the summary
  sheet alone.
- **Row 3 (directional terms), row 17 (joint classification overview), row 21 (synovial
  joint classification), row 26 ("antagonist" specifically), row 27 (general lymphatic
  vessel/node structure) and row 31 (spleen function)** are recorded HIT-PENDING on a
  reasonable match but the exact existing record was not pinned down to a single `## id` —
  Step 2 must open `101-ISK-mcq-concepts.md` directly for each before writing the sparse
  update, rather than re-running the same searches.
- **Wagih bank key recovery** (see HAZARDS) — needed before any of its ~30 Anatomy items can
  be authored with a key; until then they can only be recorded unkeyed.

## BLOCKED

none — every source needed for this department's triage was either pre-cached by the tooling
lane (`scripts/alexandria/extract/PROGRESS.md` confirms AU-MED-102's five EOM/bank rows are
now in `scripts/alexandria/pagetext/`) or safely self-extractable (the department lecture
files, not a shared paper).
