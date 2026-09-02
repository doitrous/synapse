<!--
  ZU-MED-104 (Musculoskeletal & Integumentary) — 16 sparse PENDING-LIVE
  concept overlays.

  Every ## id below targets a concept that exists ONLY in another lane's
  unimported batch (all under `docs/import-ready/concept/…`, mirrored under
  each source lane's own `-Source-Imports/concept/…` path) — none is in
  server/data/medical-library-v1.json yet (checked directly against the live
  JSON, 0 hits for every id below). Apply this file ONLY after the named
  source file is live.

  `## label` restates the target's own current label verbatim (required
  discriminator). `## universities`/`## modules` are true ID-list columns —
  `+zu`/`+ZU-MED-104`, safe appends. `## module_subject` is a
  full-replacement path list (00-START-HERE.md §3) — every row restates the
  target's existing path plus ZU's own new line, **ZU's own line listed
  first** (same reasoning as the ZU-MED-106 worked example: `gate.mjs batch`
  only checks the first segment of `module_subject`'s very first line
  against the modules this row locally declares). 11 of the 16 targets
  (marked `kau` below) are Kasr 101-ISK/102-INT/103-BMS concepts; 5 (marked
  `au`) are Alexandria AU-MED-105 concepts — this lane's own `## universities`
  stays sparse (`zu` only) on every row, never restating `kau`/`au`, for the
  same module-id-cross-multiplication reason the ZU-MED-106 worked example
  notes for a two-university row.

  A find-existing.mjs quirk this pass confirmed: compound multi-word queries
  ("sarcomere Z line", "isotonic isometric contraction") frequently miss
  real hits that a short 1-2 word query ("sarcomere", "isometric
  contraction") finds — the tool appears to need its search string to occur
  close to verbatim, not per-word. Every "no existing record" verdict a
  later lane sees from this tool should be re-tried with shorter, more
  literal phrasing before trusting it, the same caution the ZU-MED-106
  worked example logs for its own tool traps.
-->

# Item

## id
CON-MSK-24A0858459A59D

## label
The lumbricals and interossei flex the metacarpophalangeal joints and extend the interphalangeal joints, and their nerve supply splits at the third finger

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Hand intrinsic muscles
101 ISK > Anatomy > Upper Limb > Hand

## field_notes
zu: Fakous MSK Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q1, "A 16-year-old patient is unable to adduct the metacarpophalangeal joint of the ring finger which of the following muscles is most likely to be paralyzed?" (answer: palmar interossei, hand-drawn-ink key, confirmed by render --force). Direct match — the live-pending concept's own definition already states that the (three) palmar interossei adduct the fingers toward the axis of the middle finger and are all ulnar-supplied, exactly the fact this question tests. Found by `find-existing.mjs "palmar interossei"` — a compound query ("palmar interossei adduction") missed it; retried short and found it. (kau, docs/import-ready/concept/101-ISK-mcq-concepts.md)

---

# Item

## id
CON-MSK-1FC89E36FFD98E

## label
At the level of the lateral epicondyle the radial nerve divides into two terminal branches with entirely separate jobs

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Forearm nerve injuries
101 ISK > Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries

## field_notes
zu: Fakous MSK Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q4, "A 38-year-old male with deep penetrating stab wound to back of forearm that causes severe damage to posterior interosseous nerve. Which of the following muscle is normally functioning?" (answer: extensor carpi radialis longus, hand-drawn-ink key, confirmed by render --force). Direct match — the live-pending concept's own definition states that extensor carpi radialis longus is supplied by the radial nerve proper above the point where it divides into the (motor-only) posterior interosseous nerve, so it is spared by an isolated PIN injury — exactly the fact this question tests. Found by `find-existing.mjs "posterior interosseous nerve"`. (kau, docs/import-ready/concept/101-ISK-mcq-concepts.md)

---

# Item

## id
CON-MSK-2A322BCDAEBFFD

## label
Pronator teres, flexor carpi radialis, palmaris longus and flexor carpi ulnaris form the superficial group of the forearm's anterior compartment, with the median nerve running between the two heads of pronator teres and supplying every muscle in the compartment except flexor carpi ulnaris and the medial half of flexor digitorum profundus, which the ulnar nerve takes instead

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Forearm anterior compartment
AU-MED-105 > Anatomy > Upper Limb > Forearm

## field_notes
zu: Fakous MSK Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q6, "Which of the following muscles in the forearm has double nerve supply?" (answer: flexor digitorum profundus, hand-drawn-ink key, confirmed by render --force). Direct match — the live-pending concept's own definition states flexor digitorum profundus is the anterior-compartment exception with a dual median/ulnar supply, exactly the fact this question tests. Found by `find-existing.mjs "flexor digitorum profundus"`. (au, docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md)

---

# Item

## id
CON-MSK-1B2BD8EC2B44B8

## label
The anatomical snuff box is bounded by three tendons, floored by the scaphoid, and crossed by the radial artery

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Wrist and hand vasculature
101 ISK > Anatomy > Upper Limb > Axilla

## field_notes
zu: Fakous MSK Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q7, "A 20-year-old boy fall on his outstretched hand and subsequently fractures of his scaphoid bone. The fracture was accompanied by injury of which of the following arteries?" (answer: radial, hand-drawn-ink key, confirmed by render --force). Direct match — the live-pending concept's own definition states the radial artery crosses the snuff box floored by the scaphoid, exactly the vessel-at-risk fact this question tests. This is NOT the same id as the "live anatomical-snuff-box concept CON-MSK-1424177E093253" a note inside docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md describes — that id has 0 hits in medical-library-v1.json today (checked directly); this pass's own direct-JSON check found the real (still-pending) snuffbox concept instead. Found by `find-existing.mjs "anatomical snuff box"` after "radial artery scaphoid fracture" (compound) missed it. (kau, docs/import-ready/concept/101-ISK-concepts.md)

---

# Item

## id
CON-MSK-E04D8A31AEAC23

## label
The posterior (extensor) compartment of the forearm holds twelve muscles in two groups

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Forearm posterior compartment
101 ISK > Anatomy > Upper Limb > Forearm

## field_notes
zu: Fakous MSK Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q8, "A 51-year-old man presents with inability to put his forearm in the mid-prone position. Which of the following bony attachments is related to the affected muscle?" (answer: lateral supracondylar humeral ridge, hand-drawn-ink key, confirmed by render --force). Direct match — the live-pending concept's own definition states brachioradialis (the mid-prone-position muscle) arises from the upper part of the lateral supracondylar ridge, above the epicondyle, distinct from the common extensor origin — exactly the attachment fact this question tests. Found by `find-existing.mjs "extensor digiti minimi"` (a neighbouring hit in the same record) and confirmed by reading the full concept text. (kau, docs/import-ready/concept/101-ISK-mcq-concepts.md)

---

# Item

## id
CON-MSK-F12505C48037BB

## label
Gluteus maximus extends and laterally rotates the hip, is supplied by the inferior gluteal nerve, and inserts mostly into the iliotibial tract with only a minority of fibres reaching the gluteal tuberosity

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Gluteal region
AU-MED-105 > Anatomy > Lower Limb > Gluteal region

## field_notes
zu: Fakous MSK Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q12, "An elderly female patient complains of difficulty in walking upstairs due to disc prolapse that affects the nerve root of L5, S1, S2. Tests by her doctor reveal weakness in hip extension with normal flexion. Which of the following muscles is most likely be affected?" (answer: gluteus maximus, hand-drawn-ink key, confirmed by render --force). Direct match — the live-pending concept's own definition states gluteus maximus is the chief extensor of the flexed hip, supplied by the inferior gluteal nerve (L5, S1, S2), exactly the nerve-root and action fact this question tests. Found by `find-existing.mjs "gluteus maximus hip extension"` after retrying with the shorter query "gluteus maximus". (au, docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md)

---

# Item

## id
CON-MSK-8D5275EEE05F98

## label
Gluteus medius and minimus abduct the hip and stabilise the pelvis in single-leg stance through the superior gluteal nerve; their weakness produces a Trendelenburg gait with the pelvis dropping to the unsupported side

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Gluteal region
AU-MED-105 > Anatomy > Lower Limb > Gluteal region

## field_notes
zu: Fakous MSK Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q14, "A patient with a stab wound in his gluteal region that affects the nerve passes above piriformis muscle which of the following actions on hip joint is affected?" (answer: abduction, hand-drawn-ink key, confirmed by render --force). Direct match — the live-pending concept's own definition states the superior gluteal nerve (which leaves the pelvis above piriformis) supplies gluteus medius/minimus, the hip abductors, exactly the fact this question tests from the nerve-course direction. Found by `find-existing.mjs "superior gluteal nerve abduction"` after retrying with the shorter query "superior gluteal nerve". (au, docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md)

---

# Item

## id
CON-MSK-583524B3AE47F7

## label
The skin of the leg and foot is parcelled among the saphenous nerve (medial leg to the medial malleolus), the superficial peroneal nerve (anterolateral leg and most of the dorsum of the foot), the sural nerve (lower posterolateral leg and the lateral foot to the little toe), the deep peroneal nerve (only the first web space), and the tibial nerve's plantar branches (the whole sole)

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Leg and foot cutaneous nerves
AU-MED-105 > Anatomy > Leg > Cutaneous nerves

## field_notes
zu: Fakous MSK Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q18, "On examination, the doctor revealed injury to upper lateral angle of popliteal fossa. Which of the following conditions may occur secondary to this injury?" (answer: loss of sensation on the 1st web between big and second toe, hand-drawn-ink key, confirmed by render --force). Direct match — the common peroneal nerve crosses the upper lateral angle of the popliteal fossa, and the live-pending concept's own definition states its deep peroneal branch is reduced, sensorially, to exactly the first web space — the fact this question tests. Found by `find-existing.mjs "common peroneal nerve first web space"` after retrying with a shorter query. (au, docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md)

---

# Item

## id
CON-FND-E6C216AED80ED8

## label
Osteocalcin | Bone collagen type I | Cartilage collagen type II

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Cartilage biochemistry
102 INT > Biochemistry > Proteins of Extracellular Matrix

## field_notes
zu: Fakous MSK Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q19, "Which of the following types of collagen fiber form a network found in hyaline cartilage?" (answer: Type II, hand-drawn-ink key, confirmed by render --force). Direct match — the live-pending concept's own aliases already list "Cartilage collagen type II" alongside bone's type I and the osteocalcin marker, exactly the type-II/hyaline-cartilage fact this question tests. Found by `find-existing.mjs "collagen type II"`. (kau, docs/import-ready/concept/102-INT-mcq-concepts.md)

---

# Item

## id
CON-MSK-0824FE988ADA00

## label
The sarcomere, the segment between two Z lines, is the functional contractile unit of striated muscle

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Skeletal muscle histology
103 BMS > Histology > Muscle Tissue > Skeletal Muscle

## field_notes
zu: Fakous MSK Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q21, "Sarcomere is the basic contractile unit of skeletal muscle. It lies between which of the following successive structures in myofibrils?" (answer: Z lines, hand-drawn-ink key, confirmed by render --force). Direct match — the live-pending concept's own definition states the sarcomere is exactly "the segment between two Z lines", the fact this question tests. Found by `find-existing.mjs "Z line"` after "sarcomere Z line" (compound) missed it. (kau, docs/import-ready/concept/103-BMS-histology-concepts.md)

---

# Item

## id
CON-MSK-813357B2DDE44E

## label
Sharpey's fibres are bundles of periosteal collagen that penetrate the outer circumferential lamellae and anchor the periosteum to the underlying bone

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Bone histology

## field_notes
zu: Fakous MSK Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q23, "What is Sharpey's fibers represent in bone structure?" (answer: periosteal fibers in the outer fibrous layer of periosteum, hand-drawn-ink key, confirmed by render --force). Direct match — the live-pending concept's own definition states exactly this (periosteal collagen anchoring periosteum to bone). The target record carries no `## module_subject` field at all today (checked directly — the record goes straight from `## modules` to `## article_ids`), so this row's own new line is the only content; there is no existing path to restate. Found by `find-existing.mjs "Sharpey"`. (au, docs/Alexandria-Source-Imports/concept/AU-MED-105-histology-concepts.md)

---

# Item

## id
CON-NEU-449C26E1F64F74

## label
Peripheral nerves are functionally afferent (sensory) fibres, which carry impulses from peripheral receptors to the CNS

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Nerve fibre classification
102 INT > Physiology > Autonomic nervous system > The nervous system

## field_notes
zu: Fakous MSK Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q27, "Regarding efferent neuron which of the following is best describe it?" (answer: carries nerve orders from CNS to the tissue, hand-drawn-ink key, confirmed by render --force). Partial match — the live-pending concept's own definition states the afferent/efferent functional classification in full (afferent carries impulses to the CNS; by the same classification, efferent carries impulses from the CNS to effectors), covering the general fact this question's correct option restates. Close enough in scope to overlay rather than fork a new concept. Found by `find-existing.mjs "efferent neuron"`. (kau, docs/import-ready/concept/102-INT-physiology-concepts.md)

---

# Item

## id
CON-NEU-5664D7AB68AD8D

## label
Saltatory conduction regenerates the impulse only at the nodes, which buys both speed and economy

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Nerve conduction
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > Types of nerve fibers regarding myelination
103 BMS > Physiology > Nerve and Muscle > Physiology of the Nerve > The Neuron

## field_notes
zu: Fakous MSK Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q28, "Which of the following best describes nerve conduction?" (answer: in myelinated nerve the impulses jump through node of Ranvier's, hand-drawn-ink key, confirmed by render --force). Direct match — the live-pending concept's own definition states saltatory conduction regenerates the impulse only at the nodes of Ranvier, exactly the fact this question tests. Found by `find-existing.mjs "saltatory conduction"`. The target record's own `module_subject` already carries two lines (multi-topic tagging on the source side); both are restated here, with ZU's own line listed first. (kau, docs/import-ready/concept/103-BMS-mcq-vitamins-nerve-concepts.md)

---

# Item

## id
CON-MSK-7253D390093A21

## label
Denervated muscle passes through atrophy, then visible fasciculation from the dying nerve, then fibrillation from the muscle's own denervation hypersensitivity to acetylcholine

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Muscle response to denervation
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Muscular hypertrophy

## field_notes
zu: Fakous MSK Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q30, "During nerve denervation, which of the following is happen in the skeletal muscle?" (answer: atrophy of muscle within 2-4 months, hand-drawn-ink key, confirmed by render --force). Direct match — the live-pending concept's own definition states denervated muscle passes through atrophy first, exactly the fact this question's correct option states (this row's own question adds the specific 2-4 month timeframe, which the target's text does not itself state — held as the ZU-side question's own explanation content, not written into the shared concept body). Found by `find-existing.mjs "denervation"`. (kau, docs/import-ready/concept/103-BMS-physiology-concepts.md)

---

# Item

## id
CON-MSK-1030B9F3A5996A

## label
Rigor mortis is the total, permanent contracture of every muscle after death from loss of the ATP needed to separate actin and myosin, and it is used to help estimate time of death

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Muscle physiology of death
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > Reaction of muscle to denervation

## field_notes
zu: Fakous MSK Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q32, "Which of the following is characteristics of muscle rigors?" (answer: rigor mortis starts 5 hours after death due to depletion in ATP, hand-drawn-ink key, confirmed by render --force). Direct match — the live-pending concept's own definition states rigor mortis results from ATP loss preventing actin-myosin separation, exactly the mechanism this question's correct option restates (this row's own question adds the specific 5-hour onset timing, held as the ZU-side question's own explanation content, not written into the shared concept body). Found by `find-existing.mjs "rigor mortis"`. (kau, docs/import-ready/concept/103-BMS-physiology-concepts.md)

---

# Item

## id
CON-MSK-242998842BE25C

## label
In isometric contraction the muscle's length is held fixed while tension rises; in isotonic contraction tension is held fixed once threshold is reached

## universities
+zu

## modules
+ZU-MED-104

## module_subject
ZU-MED-104 > Musculoskeletal & Integumentary > Skeletal muscle contraction types
103 BMS > Physiology > Nerve and Muscle > Physiology of the Muscle > The Muscle Twitch

## field_notes
zu: Fakous MSK Final 2024.pdf (Zagazig, Fakous campus — LANE-CARD.md §7), Q35, "Concerning the differences between isotonic and isometric contractions, which of the following best describes these differences?" (answer: muscle tension is increased in isometric contraction, hand-drawn-ink key, confirmed by render --force). Direct match — the live-pending concept's own definition states both halves of exactly this isotonic/isometric contrast (length fixed/tension rises vs tension fixed/length changes), covering the correct option and refuting the three distractors in one place. Found by `find-existing.mjs "isometric contraction"` after "isotonic isometric contraction" (compound) missed it. A live concept (CON-MSK-9EA962E7584693, "against a heavy load an isometric contraction cannot shorten whole muscle") also exists but states a narrower, different specific claim; this pending concept's fuller, closer-matching text was preferred for the overlay. (kau, docs/import-ready/concept/103-BMS-physiology-concepts.md)
