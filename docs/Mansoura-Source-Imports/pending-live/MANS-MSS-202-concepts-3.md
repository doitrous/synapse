<!--
  Sparse updates only, sibling to MANS-MSS-202-concepts.md and
  MANS-MSS-202-concepts-2.md (lane 1 and lane 2's own overlay files, both left
  untouched). Every `## id` below targets a concept that exists ONLY in an
  unimported Kasr Year 1 or Alexandria Year 1 batch -- confirmed directly
  against server/data/medical-library-v1.json (grepped 2026-09-02, zero hits
  for any id below). Apply each record ONLY after its target file (named per
  row) is live.

  `## label` and `## canonical_key` are written on every row (a filled label
  makes the batch validator's stub-create check treat the row as a full
  authoring attempt rather than an update, and an update row silent on
  `## label` blanks the live concept's real label on merge).

  `## module_subject` is DELIBERATELY OMITTED from every row here, per lane
  1's own verified finding (MANS-MSS-202-concepts.md's pending-live header):
  module_subject validates against the fields THIS ROW declares, not the
  merge target's, so both restating the original line and restating only the
  new line either fail or erase the live record's placement on merge.
  Omitting it leaves the live record's existing module_subject untouched --
  the field_notes below say which pages test each concept in its place.

  `## universities`, `## modules` and `## learner_years` are append-safe list
  columns (optionalList/importList): `+mans`, `+MANS-MSS-202`, `+1` add
  without disturbing the existing kau/au tags, modules or learner years.

  All twenty questions in the sibling msspast3-reuse.json cluster reuse an
  existing concept -- broad greps for every root term (per the lane brief's
  "expect mostly reuse" warning) found a pre-existing match in every case, in
  Kasr 101-ISK, 101-ISK-mcq, 103-BMS-anatomy or Alexandria AU-MED-105-anatomy.
  Two of the twenty reuse concepts already carry an overlay row from lane
  1/2 (cephalic vein CON-MSK-66A2E56C00F3A7, radial nerve
  CON-MSK-712EBE5936F7E4, both in MANS-MSS-202-concepts-2.md) and are
  extended there with a second universityNotes line rather than duplicated
  here. The seventeen concepts below are new to this module's overlay.

  Lane MANS-MSS-202-author3. Gate is `medical:batch` with every target file
  named via --with -- run once without --with (expect the "does not exist"
  refusal) and once with (expect a clean pass); these `## id`s are not live,
  so `medical:simulate` cannot resolve them yet and is not the gate here:

  node scripts/validate-content-batch.mjs "docs/Mansoura-Source-Imports/pending-live/MANS-MSS-202-concepts-3.md" \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md \
    --with docs/Kasr-Source-Imports/concept/103-BMS-anatomy-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-concepts.md
-->

# Item

## id
CON-MSK-C7BC26EBAF066B

## canonical_key
peroneal.common.motor-loss-dorsiflexion-eversion

## label
Common peroneal palsy abolishes dorsiflexion and eversion because it denervates both the anterior and the lateral compartment of the leg

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.35 tests "effects of common peroneal nerve injury include" (keyed B, foot drop and eversion of the foot), authored directly against this concept.
sourceFile: docs/Kasr-Source-Imports/concept/103-BMS-anatomy-concepts.md

---

# Item

## id
CON-MSK-8D5275EEE05F98

## canonical_key
hip.gluteus-medius-minimus-trendelenburg

## label
Gluteus medius and minimus abduct the hip and stabilise the pelvis in single-leg stance through the superior gluteal nerve; their weakness produces a Trendelenburg gait with the pelvis dropping to the unsupported side

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.24 tests "the superior gluteal nerve supplies one of the following muscles" (keyed A, gluteus medius), authored directly against this concept.
sourceFile: docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md

---

# Item

## id
CON-MSK-F12505C48037BB

## canonical_key
hip.gluteus-maximus-action-nerve

## label
Gluteus maximus extends and laterally rotates the hip, is supplied by the inferior gluteal nerve, and inserts mostly into the iliotibial tract with only a minority of fibres reaching the gluteal tuberosity

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.24 tests "the inferior gluteal nerve supplies one of the following muscles" (keyed B, gluteus maximus), authored directly against this concept.
sourceFile: docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md

---

# Item

## id
CON-MSK-3F2004E89BDB84

## canonical_key
sole.muscle-layers-plantar-nerves

## label
The sole of the foot has four muscle layers, the medial plantar nerve supplies only abductor hallucis, flexor digitorum brevis, flexor hallucis brevis and the first lumbrical, and the lateral plantar nerve supplies every other intrinsic muscle, including quadratus plantae (flexor digitorum accessorius) and adductor hallucis

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf tests this concept twice: p.23's glass-cut vignette (keyed D, abductor hallucis, first layer) and p.25's "damage to the lateral plantar nerve would affect" (keyed A, adductor hallucis), both authored directly against this concept.
sourceFile: docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md

---

# Item

## id
CON-MSK-9B1204D74AF4FF

## canonical_key
joints.knee.movements-locking-mechanism

## label
The knee locks into a rigid column on full extension by lateral rotation of the tibia, and unlocks by popliteus rotating the femur laterally on the tibia

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.41 tests "the action of popliteus muscle" (keyed A, medial rotation of the tibia), authored directly against this concept.
sourceFile: docs/Kasr-Source-Imports/concept/103-BMS-anatomy-concepts.md

---

# Item

## id
CON-MSK-79E3831EA7CB4F

## canonical_key
leg.anterior-compartment-deep-peroneal-nerve

## label
The anterior compartment of the leg — tibialis anterior, extensor hallucis longus, extensor digitorum longus and peroneus tertius — dorsiflexes the ankle and extends the toes, and is supplied throughout by the deep peroneal nerve

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.41 tests "dorsiflexors of the ankle are supplied by….. nerve" (keyed A, deep peroneal), authored directly against this concept.
sourceFile: docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md

---

# Item

## id
CON-MSK-C608D59631E713

## canonical_key
axillary-artery-parts-relations-and-branches

## label
Pectoralis minor divides the axillary artery into three parts, and each part gives its own branches

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.29 tests "axillary artery" (keyed C, is divided into three parts by pectoralis minor), authored directly against this concept.
sourceFile: docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md

---

# Item

## id
CON-MSK-A4A49A26BA10E7

## canonical_key
profunda-brachii-and-the-anastomosis-around-the-elbow

## label
The profunda brachii accompanies the radial nerve into the spiral groove and feeds the anastomosis around the elbow

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.29 tests "which artery is the main supply of triceps" (keyed D, profunda brachii artery), authored directly against this concept.
sourceFile: docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md

---

# Item

## id
CON-MSK-8FB16415EFF905

## canonical_key
small-muscles-of-the-hand-groups-and-their-nerves

## label
The thenar eminence is three muscles on the median nerve, and everything else in the hand but two lumbricals is ulnar

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.38 tests "which of the following muscles is part of thenar eminence" (keyed A, flexor pollicis brevis), authored directly against this concept.
sourceFile: docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md

---

# Item

## id
CON-MSK-1F14D98DCE111B

## canonical_key
median-cubital-vein-connections-and-venepuncture

## label
The median cubital vein links cephalic to basilic across the cubital fossa, lying on the bicipital aponeurosis that protects the brachial artery

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.38 tests a median-cubital-vein venepuncture vignette, "which structure protects the brachial artery" (keyed C, bicipital aponeurosis), authored directly against this concept.
sourceFile: docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md

---

# Item

## id
CON-MSK-798DE81B6EE665

## canonical_key
brachial-artery-origin-course-end-branches

## label
The brachial artery runs the whole arm superficially, from teres major to the neck of the radius

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.29 tests "the brachial artery" (keyed B, gives off the nutrient artery to the humerus), authored directly against this concept.
sourceFile: docs/Kasr-Source-Imports/concept/101-ISK-concepts.md

---

# Item

## id
CON-MSK-02A831DFEBC439

## canonical_key
forearm.anterior-interosseous-nerve

## label
The anterior interosseous nerve, a branch of the median nerve given off just below the elbow, supplies flexor pollicis longus, the lateral half of flexor digitorum profundus, and pronator quadratus, and its isolated injury causes a pinch weakness with no sensory loss

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.33 tests a forearm stab-wound vignette naming a lesion of the anterior interosseous nerve (keyed C, flexor digitorum profundus and pronator quadratus paralysed), authored directly against this concept.
sourceFile: docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md

---

# Item

## id
CON-MSK-24A0858459A59D

## canonical_key
lumbricals-and-interossei-attachments-actions-and-nerves

## label
The lumbricals and interossei flex the metacarpophalangeal joints and extend the interphalangeal joints, and their nerve supply splits at the third finger

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.27 tests a finger-spreading examination vignette (keyed C, dorsal interosseous muscles), authored directly against this concept.
sourceFile: docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md

---

# Item

## id
CON-MSK-653EBFBF7DB21C

## canonical_key
hip.joint-ligaments-dislocation-direction

## label
The hip joint is stabilised by the iliofemoral, pubofemoral and ischiofemoral ligaments (all winding to tighten in extension) and the intracapsular ligamentum teres, so it dislocates far less often than the shoulder and almost always posteriorly

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.41 tests "which ligament prevents hyperabduction of the hip joint" (keyed B, pubofemoral), authored directly against this concept.
sourceFile: docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md

---

# Item

## id
CON-MSK-25C6698A72A982

## canonical_key
ulnar-artery-course-relations-branches

## label
The ulnar artery is the larger terminal branch of the brachial, and it ends as the superficial palmar arch

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.40 tests "at which anatomical landmark does the ulnar artery originate" (keyed B, opposite the neck of the radius), authored directly against this concept.
sourceFile: docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md

---

# Item

## id
CON-MSK-AB846B50993763

## canonical_key
shoulder.suprascapular-nerve-origin-distribution

## label
The suprascapular nerve arises from the upper trunk of the brachial plexus, passes through the suprascapular notch under the superior transverse scapular ligament, and supplies supraspinatus and infraspinatus with no cutaneous branch of its own

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.39 tests "suprascapular nerve is branch from" (keyed 2, upper trunk), authored directly against this concept.
sourceFile: docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md

---

# Item

## id
CON-MSK-0415214C935D2D

## canonical_key
leg.dorsalis-pedis-posterior-tibial-arteries

## label
The anterior tibial artery becomes the dorsalis pedis artery in front of the ankle midway between the malleoli and ends by diving into the sole to complete the deep plantar arch, while the posterior tibial artery — the tibial nerve's arterial companion — descends behind the medial malleolus

## universities
+mans

## modules
+MANS-MSS-202

## learner_years
+1

## field_notes
universityNotes: mans: MSS Past Years.pdf p.42 tests "dorsalis pedis artery begins" (keyed 2, midway between the two malleoli), authored directly against this concept.
sourceFile: docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md
