<!--
  SCU-MS105 · Musculoskeletal — sparse CONCEPT overlay for 8 of the 31
  questions in the sibling question seeds (docs/FOMSCU-Source-Imports/
  question/SCU-MS105-mskmid26-mcq.md and SCU-MS105-mskarm-mcq.md). Every
  question below reuses an existing concept rather than minting a new one,
  found by running `find-existing.mjs` on each candidate's answer text and
  then reading the actual hit body against the FOMSCU source question —
  never trusted at the tool's own truncated single line. The rejected
  matches from the same searches (homonym/substring collisions, e.g.
  "brachialis" hitting musculocutaneous-nerve-course records via the
  substring inside "coracobrachialis") are documented per-record in the
  sibling concept file's own field_notes, not concealed.

  This file only adds SCU's own tags — it never retypes a full record, so
  it can never evict another university's data. Per LANE-CARD.md §7, an
  overlay row here carries tag additions only
  (`universities`/`learner_years`/`modules`, all `+`-prefixed and additive)
  and no `module_subject` line — that field belongs to whichever lane
  authored the concept's own record.

  Two groups:

  LIVE (3) — already in server/data/medical-library-v1.json (checked
  directly against the live JSON, not just find-existing.mjs's own label).
  No apply-after needed:

    CON-DER-1DE5C5192978EF  (kau, learnerYears [1,2,3]) — musculocutaneous nerve → lateral cutaneous nerve of forearm
    CON-DER-5AF796E0F2C0D3  (kau, learnerYears [1,2,3]) — musculocutaneous nerve supplies coracobrachialis/biceps/large medial part of brachialis
    CON-MSK-70448A9B07D24A  (kau, learnerYears [1,2,3]) — contraction abolishes H zone, preserves A band

  PENDING (5) — exist only in other lanes' own unimported batches (checked
  directly against the live JSON: none of the 5 ids below are in it).
  Apply each pending row only after its own named source file is itself
  live, per 02-concepts.md Step 1:

    A. docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md        (bone matrix, 35% organic type I collagen)
    B. docs/Alexandria-Source-Imports/concept/AU-MED-105-histology-concepts.md (osteoblasts secrete alkaline phosphatase → mineralisation)
    C. docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md      (isometric contraction: length fixed, tension rises)
    D. docs/Ain-Shams-Source-Imports/concept/ASU-LOCO-msk-new-concepts.md   (vitamin D → intestinal calcium absorption)
    E. docs/MUST-Source-Imports/concept/FHB-102-2-microbiology-introduction-concepts.md (ceftaroline, fifth-gen cephalosporin, MRSA)

  Gate together with the sibling question files and every source file named
  above, e.g.:
  node scripts/content/gate.mjs batch docs/FOMSCU-Source-Imports/question/SCU-MS105-mskmid26-mcq.md \
    docs/FOMSCU-Source-Imports/question/SCU-MS105-mskarm-mcq.md \
    --with docs/FOMSCU-Source-Imports/pending-live/SCU-MS105-author1-overlay-concepts.md \
    --with docs/FOMSCU-Source-Imports/concept/SCU-MS105-author1-mint-concepts.md \
    --with docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-105-histology-concepts.md \
    --with docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md \
    --with docs/Ain-Shams-Source-Imports/concept/ASU-LOCO-msk-new-concepts.md \
    --with docs/MUST-Source-Imports/concept/FHB-102-2-microbiology-introduction-concepts.md
-->

# Item

## id
CON-DER-1DE5C5192978EF

## label
Terminal continuation of the musculocutaneous nerve

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu: FOMSCU Musculoskeletal, EOM MID 2026 Q1 (Anatomy) and MCQ - Arm.pdf item 3 — tests that the musculocutaneous nerve continues as the lateral cutaneous nerve of the forearm, so its injury causes lateral forearm sensory loss. Target: live, no apply-after.
scu (lane 2, scu-ms105-author2): also reused by mskarm-q10 (MCQ - Arm.pdf item 10) — same continuation fact, "lateral cutaneous nerve of the forearm is a continuation of which nerve" tested from the direct-recall angle rather than the injury-vignette angle.

---

# Item

## id
CON-DER-5AF796E0F2C0D3

## label
Muscular supply by the musculocutaneous nerve

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu: FOMSCU Musculoskeletal, MCQ - Arm.pdf item 4 — tests that the musculocutaneous nerve supplies coracobrachialis, biceps brachii, and only the large medial part of brachialis (the lateral half receiving a radial-nerve contribution), which is exactly the fact the "EXCEPT: lateral half of brachialis" stem is built on. Target: live, no apply-after.
scu (lane 2, scu-ms105-author2): also reused by mskkhanfour-q08 (MCQ - Lecture 2 - Dr Khanfour.pdf, sub-deck A item 9) — lateral cord/musculocutaneous nerve injury weakens elbow flexion, the same muscular-supply fact from the injury-effect angle.

---

# Item

## id
CON-MSK-70448A9B07D24A

## label
Contraction shortens I band, abolishes H zone, preserves A band, and shortens sarcomere/fiber without filament shortening

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu: FOMSCU Musculoskeletal, EOM MID 2026 Q2 (Physiology) — tests that the H zone narrows/is abolished as actin filaments slide further over myosin during shortening (the stem's leg-flexion scenario), the same sliding-filament mechanism this live record already states. Target: live, no apply-after.

---

# Item

## id
CON-MSK-89674D65B2316B

## label
Bone matrix is 35% organic type I collagen and ground substance and 65% inorganic calcium salts that harden it

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu: FOMSCU Musculoskeletal, EOM MID 2026 Q2 (Histology) — tests that type I collagen is the predominant organic collagen of bone matrix, the same composition fact this record already states. Target: pending — apply after docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md.

---

# Item

## id
CON-MSK-F90183A40E9B5E

## label
Osteoblasts secrete alkaline phosphatase to raise local phosphate concentration and trigger mineralisation of the osteoid they have just laid down

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu: FOMSCU Musculoskeletal, EOM MID 2026 Q3 (Histology) — tests that osteoblasts are the cell directly responsible for bone matrix mineralisation/calcification, an exact match to this record's own claim. Target: pending — apply after docs/Alexandria-Source-Imports/concept/AU-MED-105-histology-concepts.md.

---

# Item

## id
CON-MSK-87D5C5A48AB5D9

## label
In isometric contraction the muscle's length is held fixed while tension rises; in isotonic contraction tension is held fixed once threshold is reached and the muscle shortens

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu: FOMSCU Musculoskeletal, EOM MID 2026 Q1 (Physiology) — tests the definition of isometric contraction (high/increased tension at constant muscle length), an exact match to this record's own definition. Target: pending — apply after docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md.

---

# Item

## id
CON-FND-49D9C172607D9A

## label
Vitamin required for intestinal calcium absorption

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu: FOMSCU Musculoskeletal, EOM MID 2026 Q2 (Biochemistry) — tests that active Vitamin D (calcitriol) increases intestinal calcium absorption via calbindin synthesis, an exact match to this record's own fact. Target: pending — apply after docs/Ain-Shams-Source-Imports/concept/ASU-LOCO-msk-new-concepts.md.

---

# Item

## id
CON-INF-71B43C95050406

## label
Ceftaroline is a fifth-generation cephalosporin active against MRSA

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu: FOMSCU Musculoskeletal, EOM MID 2026 Q2 (Pharmacology) — tests that ceftaroline is classified as a fifth-generation cephalosporin with MRSA/VRSA activity, an exact match to this record's own fact. Target: pending — apply after docs/MUST-Source-Imports/concept/FHB-102-2-microbiology-introduction-concepts.md.

---

<!--
  ADDENDUM — lane 2 (scu-ms105-author2), S3 pass on the remaining 45 keyed
  items: cluster 'mskaxsh' (MCQ - Axilla and Shoulder - Nadwat.pdf, 15 of 16
  authored), the remaining 9 of cluster 'mskarm' (MCQ - Arm.pdf), and
  cluster 'mskkhanfour' (11 OCR-recovered Khanfour items). 14 further
  reused concepts below, found the same way as lane 1's own (find-existing.mjs
  on the candidate fact, then the hit body read in full against the FOMSCU
  source question). All 14 are PENDING — none is in server/data/
  medical-library-v1.json (checked directly) — sourced from KAU's own
  101-ISK pending batches (docs/Kasr-Source-Imports/concept/101-ISK-concepts.md
  and .../101-ISK-mcq-concepts.md). Apply each row only after its own named
  source file is itself live, per 02-concepts.md Step 1. Several of these
  concepts are reused by more than one question in this lane's own seeds;
  each reuse is named on its own field_notes line rather than repeating the
  row.

  Gate together with the sibling question files and every source file named
  below, e.g.:
  node scripts/content/gate.mjs batch docs/FOMSCU-Source-Imports/question/SCU-MS105-mskaxsh-mcq.md \
    docs/FOMSCU-Source-Imports/question/SCU-MS105-mskarm-mcq.md \
    docs/FOMSCU-Source-Imports/question/SCU-MS105-mskkhanfour-mcq.md \
    --with docs/FOMSCU-Source-Imports/pending-live/SCU-MS105-author1-overlay-concepts.md \
    --with docs/FOMSCU-Source-Imports/concept/SCU-MS105-author1-mint-concepts.md \
    --with docs/FOMSCU-Source-Imports/concept/SCU-MS105-concepts-2.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md
-->

# Item

## id
CON-MSK-36F854FD651912

## label
Boundaries and contents of the cervico-axillary canal (apex of the axilla)

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu (lane 2): FOMSCU Musculoskeletal, MCQ - Axilla and Shoulder - Nadwat.pdf item 1 — tests the same three boundaries (clavicle, first rib, superior border of scapula) this record already states for the cervico-axillary canal (the axilla's apex). Target: pending — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
CON-MSK-F602D13792F66F

## label
The axilla has four walls, and the two folds a hand can grip are the lower borders of the anterior and posterior ones

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu (lane 2): FOMSCU Musculoskeletal, MCQ - Axilla and Shoulder - Nadwat.pdf item 3 — tests that the anterior wall of the axilla is pectoralis major and pectoralis minor, an exact match to this record's own anterior-wall clause. Target: pending — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
CON-MSK-C608D59631E713

## label
Pectoralis minor divides the axillary artery into three parts, and each part gives its own branches

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu (lane 2): FOMSCU Musculoskeletal, MCQ - Axilla and Shoulder - Nadwat.pdf items 6, 11, 12 and 13 — this one record covers four of this lane's questions: item 6 (cords of the brachial plexus are named for their position around the axillary artery's second part), item 11 (the second part's own branch, the lateral thoracic artery), item 12 (the largest branch of the whole artery, the subscapular), and item 13 (pectoralis minor is the muscle landmark dividing the artery into three parts) — all stated directly in this record's own definition. Target: pending — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
CON-MSK-A49B57B03A3610

## label
The radial nerve arises from the posterior cord, C5–T1, and branches in axilla and arm

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu (lane 2): FOMSCU Musculoskeletal, MCQ - Axilla and Shoulder - Nadwat.pdf item 7 (which nerve originates from the posterior cord — radial) and MCQ - Lecture 1 - Dr Khanfour.pdf item 10 (crutch pressure on the posterior cord — the terminal nerve most likely affected is the radial, its direct continuation), both exact matches to this record's own "largest branch of the posterior cord" fact. Target: pending — apply after docs/Kasr-Source-Imports/concept/101-ISK-concepts.md.

---

# Item

## id
CON-MSK-FD238B6D305E22

## label
Traction on the head at delivery tears the upper trunk and gives the porter's tip posture

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu (lane 2): FOMSCU Musculoskeletal, MCQ - Axilla and Shoulder - Nadwat.pdf item 9 — tests that injury to the upper trunk of the brachial plexus is Erb's palsy, an exact match to this record's own diagnosis. Target: pending — apply after docs/Kasr-Source-Imports/concept/101-ISK-concepts.md.

---

# Item

## id
CON-MSK-528AA0580391C0

## label
Falling while clutching an object avulses the lower trunk of the brachial plexus and claws the hand

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu (lane 2): FOMSCU Musculoskeletal, MCQ - Axilla and Shoulder - Nadwat.pdf item 10 — tests that Klumpke's palsy involves the lower trunk, an exact match to this record's own diagnosis. Target: pending — apply after docs/Kasr-Source-Imports/concept/101-ISK-concepts.md.

---

# Item

## id
CON-MSK-EE022A2043C10F

## label
Shoulder dislocation endangers the axillary nerve, costing deltoid and teres minor

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu (lane 2): FOMSCU Musculoskeletal, MCQ - Axilla and Shoulder - Nadwat.pdf item 15 — tests that the axillary nerve is the nerve most commonly injured in anterior shoulder dislocation, an exact match to this record's own "dislocation of the shoulder ... endangers it" fact. Target: pending — apply after docs/Kasr-Source-Imports/concept/101-ISK-concepts.md.

---

# Item

## id
CON-MSK-34E34E10280236

## label
Triceps has a long, a lateral and a medial head, inserts into the olecranon, and is wholly radial

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu (lane 2): FOMSCU Musculoskeletal, MCQ - Arm.pdf items 9 and 12 — item 9 (triceps' insertion, the olecranon process) and item 12 (the long head's origin, the infraglenoid tubercle) are both stated directly in this record's own definition. Target: pending — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
CON-MSK-A4A49A26BA10E7

## label
The profunda brachii accompanies the radial nerve into the spiral groove and feeds the anastomosis around the elbow

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu (lane 2): FOMSCU Musculoskeletal, MCQ - Arm.pdf item 16 — tests that the radial nerve is the nerve accompanying the profunda brachii artery through the spiral groove, an exact match to this record's own course description. Target: pending — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
CON-MSK-66A2E56C00F3A7

## label
The cephalic vein starts laterally and ends in the axillary vein; the basilic starts medially and helps form it

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu (lane 2): FOMSCU Musculoskeletal, MCQ - Arm.pdf item 11 (the basilic vein's course up the medial/anterior arm makes it the main vein of the arm's anterior compartment) and MCQ - Lecture 2 - Dr Khanfour.pdf sub-deck B item 7 (the cephalic vein is the vein found in the deltopectoral groove, stated directly in this record's own "runs in the deltopectoral groove" clause). Target: pending — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
CON-MSK-1F14D98DCE111B

## label
The median cubital vein links cephalic to basilic across the cubital fossa, lying on the bicipital aponeurosis that protects the brachial artery

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu (lane 2): FOMSCU Musculoskeletal, MCQ - Lecture 2 - Dr Khanfour.pdf sub-deck B item 8 — tests that the brachial artery lies deep to the median cubital vein in the cubital fossa, an exact match to this record's own "lying on the bicipital aponeurosis ... beneath" fact. Target: pending — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
CON-MSK-712EBE5936F7E4

## label
A fracture of the humeral shaft catches the radial nerve in the spiral groove and drops the wrist

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu (lane 2): FOMSCU Musculoskeletal, MCQ - Arm.pdf item 15 — tests the same radial-nerve-at-the-spiral-groove clinical syndrome (inability to extend elbow and wrist, posterior forearm sensory loss) this record already documents as wrist/finger drop with impaired elbow extension, from the lesion-localisation angle rather than the fracture-mechanism angle. Target: pending — apply after docs/Kasr-Source-Imports/concept/101-ISK-concepts.md.

---

# Item

## id
CON-MSK-24E318F2E3F18E

## label
Injury to the long thoracic nerve at mastectomy paralyses serratus anterior, winging the scapula

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu (lane 2): FOMSCU Musculoskeletal, MCQ - Lecture 1 - Dr Khanfour.pdf item 7 — tests that the nerve responsible for scapula winging after mastectomy arises directly from the roots of the brachial plexus (C5-C7, as this record's own definition states), not from a trunk or cord. Target: pending — apply after docs/Kasr-Source-Imports/concept/101-ISK-concepts.md.

---

# Item

## id
CON-MSK-CF723B5FB24D70

## label
The brachial plexus is roots, trunks, divisions and cords, and its branches sort flexor from extensor

## universities
+scu

## learner_years
+1

## modules
+SCU-MS105

## field_notes
scu (lane 2): FOMSCU Musculoskeletal, MCQ - Arm.pdf item 14 (a posterior-cord lesion in the axilla spares supination by biceps brachii, since biceps is a flexor-side, musculocutaneous-supplied muscle and not a posterior-cord one — the flexor/extensor split this record states directly), MCQ - Lecture 1 - Dr Khanfour.pdf item 6 (deltoid's nerve, the axillary, is named among this record's own posterior-cord branches) and item 8 (the medial cord's "usual number of branches" is five — ulnar nerve, medial root of median, medial pectoral nerve, and the medial cutaneous nerves of arm and forearm — an exact count of this record's own medial-cord branch list). Target: pending — apply after docs/Kasr-Source-Imports/concept/101-ISK-concepts.md.
