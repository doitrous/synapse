<!--
  SCU-FBS102 · Foundation 1 — sparse CONCEPT overlay for the 13 questions in
  the sibling SCU-FBS102-questions.md (batch 1). Every question below reuses
  an existing concept rather than minting a new one, per LANE-CARD.md §7's
  corrected split (a manual re-read of each "confirmed" hit found 4 of the
  original 9 do not actually match the FOMSCU question's specific fact; the
  5 below are the ones that do). This file only adds SCU's own tags — it
  never retypes a full record, so it can never evict another university.

  Two groups:

  LIVE (5) — already in server/data/medical-library-v1.json. No apply-after
  needed; these rows are safe to import as soon as this file is imported.
  None of the five carry an existing `universities`/`learner_years`/
  `modules`/`module_subject` value (checked directly against the live JSON,
  not just find-existing.mjs), so the overlay below is a first tag, not an
  append onto another university's path.

  PENDING (8) — exist only in Kasr's own unimported batches (checked
  directly against the live JSON: none of the 8 ids below are in it).
  Apply this file's pending rows only after the named Kasr source file is
  itself live, per 02-concepts.md Step 1 ("A hit only in another lane's
  unimported batch ... is still a hit. Write your update as a sparse record
  ... with an INDEX line reading 'apply after <the other lane's file>'"):

    A. docs/Kasr-Source-Imports/concept/101-ISK-practical-concepts.md
    B. docs/Kasr-Source-Imports/concept/101-ISK-concepts.md
    C. docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md
    D. docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md

  Gate together with the source file each block targets, e.g.:
  node scripts/content/gate.mjs batch docs/FOMSCU-Source-Imports/pending-live/SCU-FBS102-questions.md \
    --with docs/FOMSCU-Source-Imports/pending-live/SCU-FBS102-overlay-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-practical-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/article/101-ISK-histology-2.md \
    --with docs/Kasr-Source-Imports/article/101-ISK-anatomy-2.md \
    --with docs/Kasr-Source-Imports/article/101-ISK-anatomy.md \
    --with docs/Kasr-Source-Imports/article/102-INT-coverage.md \
    --with docs/Kasr-Source-Imports/article/102-INT-biochemistry.md
-->

# Item

## id
CON-FND-B5B2112BF2CADE

## label
lacI repressor in the lac operon

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Molecular Biology > Gene Regulation

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2022 Q46 (also 2021 Q66) — tests that the operator must be free of the repressor for transcription. Target: live, no apply-after.

---

# Item

## id
CON-MSK-0E3AE8E79060E1

## label
Endomysial reticular fibers surround individual fibers and carry small vessels/fine nerves

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Muscle Tissue > Connective Tissue Coats

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2022 Q3 (also 2021 Q23) — tests endomysium as the coat around one muscle fibre. Target: live, no apply-after.

---

# Item

## id
CON-HEM-1975918ED45C76

## label
Mast cells and basophils produce heparin

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Connective Tissue > Cells of Connective Tissue

## field_notes
scu: FOMSCU Foundation 1 EOY 2026 Q34 — tests mast cells as the connective-tissue cell secreting heparin and histamine. Target: live, no apply-after.

---

# Item

## id
CON-IMM-DD6187AD53D304

## label
Activated B cells differentiate into plasma cells that secrete antibodies

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Connective Tissue > Cells of Connective Tissue

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2022 Q31 (also 2021 Q51) — tests plasma cells as the connective-tissue antibody producer. Target: live, no apply-after.

---

# Item

## id
CON-FND-DEAE7971A31FB0

## label
Primary active transport

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Physiology > Cell Physiology > Membrane Transport

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2022 Q21 (also 2021 Q41) — tests active transport as the mechanism requiring direct energy. Target: live, no apply-after.

---

# Item

## id
CON-FND-49D5829AC3DCA1

## label
Reticular connective tissue is the silver-stained network that forms the stroma of an organ

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Connective Tissue > Types of Connective Tissue Proper
101 ISK > Histology > Connective Tissue > Types of Connective Tissue Proper

## field_notes
scu: FOMSCU Foundation 1 EOY 2026 Q35 — tests reticular connective tissue as the stroma of liver/spleen/lymph nodes. Target A — apply after docs/Kasr-Source-Imports/concept/101-ISK-practical-concepts.md.

---

# Item

## id
CON-MSK-8863ACD7E8D790

## label
Primary cartilaginous joints are hyaline and temporary; secondary ones are fibrocartilaginous and midline

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Articular System
101 ISK > Anatomy > Basis of Anatomy > Articular system

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2022 Q1 (also 2021 Q21) — tests the epiphyseal plate as a primary cartilaginous joint. Target B — apply after docs/Kasr-Source-Imports/concept/101-ISK-concepts.md.

---

# Item

## id
CON-FND-30D2E317144DDF

## label
Lipids are classified by composition into simple lipids (fatty acid + alcohol only, e.g. triacylglycerol), compound lipids (fatty acid + alcohol + another group), and derived lipids (hydrolysis products such as free fatty acids and steroids, or substances associated with lipids in nature)

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Lipids of Biological Importance
102 INT > Biochemistry > Lipids of Biological Importance

## field_notes
scu: FOMSCU Foundation 1 EOY 2026 Q51 — tests phospholipids as compound lipids. Target D — apply after docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md.

---

# Item

## id
CON-MSK-E10403A4189B45

## label
Supination is supinator and biceps, and biceps is the powerful one

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Anatomy > Upper Limb > Forearm
101 ISK > Anatomy > Upper Limb > Forearm

## field_notes
scu: FOMSCU Foundation 1 EOY 2026 Q5 — tests pronation as the opposite forearm rotation to supination. Target B — apply after docs/Kasr-Source-Imports/concept/101-ISK-concepts.md.

---

# Item

## id
CON-MSK-2C78EFB16CA67F

## label
A bone forms either directly in a connective tissue membrane or by replacing a cartilage model, and which one it did is fixed for each bone

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Skeletal System
101 ISK > Anatomy > Basis of Anatomy > Skeletal system

## field_notes
scu: FOMSCU Foundation 1 EOY 2026 Q7 — tests the clavicle as the intramembranous-ossification exception. Target C — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
CON-FND-FF40DB9ED068F9

## label
Growth-factor binding starts the cell cycle by inducing cyclins, which complex with specific CDKs to drive the cell past the late-G1 restriction point and through each subsequent transition

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Genetics > Cell Cycle
102 INT > Biochemistry > Cell Cycle, Apoptosis, and Tumor Suppressor Genes

## field_notes
scu: FOMSCU Foundation 1 EOM 2026 Q17 — tests cyclins as the substance whose quantity oscillates through the cell cycle. Target D — apply after docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md.

---

# Item

## id
CON-NEU-C3D7B209FB3260

## label
The vagus carries the whole parasympathetic supply of the thoracic and abdominal viscera, slowing the atria, constricting bronchi, driving gut motility and secretion, and emptying the gall bladder

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Physiology > Autonomic Nervous System > Parasympathetic Nervous System
102 INT > Physiology > Autonomic nervous system > Parasympathetic nervous system

## field_notes
scu: FOMSCU Foundation 1 EOY 2026 Q15 — tests the vagus (CN X) as the nerve regulating heartbeat via the atria. Target D — apply after docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md.

---

# Item

## id
CON-FND-9EBFBDE42AC100

## label
The Golgi apparatus is invisible in H&E except as a pale negative image, and its position follows the direction the cell secretes

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Cytology > Cytoplasmic Organelles
101 ISK > Histology > Cytology > Cytoplasm

## field_notes
scu: FOMSCU Foundation 1 EOM 2026 Q10 — tests the Golgi apparatus as the organelle that modifies and packages protein for secretion. Target C — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---
