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
