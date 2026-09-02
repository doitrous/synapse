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

  ---------------------------------------------------------------------------
  BATCH 2 (second author lane, fomscu-fbs102-author2) — appended below the
  batch-1 divider above. Covers the 35 questions in the sibling
  SCU-FBS102-questions-batch2.md. One row is LIVE (CON-MSK-12504AAE2403E8,
  checked directly against server/data/medical-library-v1.json's snapshot of
  the concept graph); the other 28 rows are PENDING against 11 source files
  across Kasr and Alexandria (named in each row's own field_notes "apply
  after" line, since there are too many distinct targets for a short letter
  key here — grep each row's field_notes for its own file). Same rule as
  batch 1: this file only adds SCU's own tags onto an id that already
  exists elsewhere, never a full record, so it can never evict another
  university's data. Four originally-"pending" candidates this lane
  triaged (anatomy-flexion x2, biochemistry-monosaccharides,
  genetics-second-meiotic-division) found no concept whose own definition
  actually matches the FOMSCU question on a close read and are NOT in this
  file — they stay in the ledger's remaining bucket for the S2 minting pass.

  Gate batch 2 together with every file named in this batch's field_notes:
  node scripts/content/gate.mjs batch docs/FOMSCU-Source-Imports/pending-live/SCU-FBS102-questions-batch2.md \
    --with docs/FOMSCU-Source-Imports/pending-live/SCU-FBS102-overlay-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-practical-concepts.md \
    --with docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/concept/102-INT-physiology-concepts.md \
    --with docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md \
    --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md \
    --with docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md \
    --with docs/Kasr-Source-Imports/concept/104-CPS-histology-concepts.md \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-structural-concepts.md \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-102-anatomy-concepts.md \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-105-histology-concepts.md
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

# Item

## id
CON-MSK-12504AAE2403E8

## label
Anatomical bone classification by shape includes long, short, flat, and irregular bones

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Anatomy > Lower Limb > Foot

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q48 (also 2022 Q28) — tests the cuboid as a tarsal (short) bone. Target: live, no apply-after.

---

# Item

## id
CON-MSK-888467E7C45479

## label
Skeletal muscles are classified by the direction of their fibres, from strap-like to multipennate

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Muscular System

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q39 (also 2022 Q19) — tests rectus femoris as bipennate. Target — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
CON-MSK-EE7CDEF8ACA587

## label
The three anatomical planes are named by the two parts each one leaves behind

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Anatomical Terminology

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q64 (also 2022 Q44) — tests the coronal plane as anterior/posterior divider. Target — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
CON-MSK-782A87EC05EF74

## label
The elbow is a synovial hinge between humerus, ulna and radius, held by collateral ligaments

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Anatomy > Upper Limb > Elbow

## field_notes
scu: FOMSCU Foundation 1 QBank, EOY 2026 Q9 — tests the elbow as the typical hinge joint. Target — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
CON-FND-14D80DE53DE835

## label
Nerve cells are classed by how many processes leave the cell body: one, two, or more than two

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Nervous Tissue

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q37+38 (also 2022 Q17+18) — one concept covers both the pseudounipolar dorsal-root-ganglion cell and the multipolar motor-neuron shape. Target — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
CON-MSK-B080975D6171CF

## label
Skeletal, cardiac and smooth muscle differ across site, size, fibre composition, shape, branching, sarcolemma, striation, nuclei, sarcomeres, tubular system, cell junctions, regeneration, action and innervation

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Anatomy > Basis of Anatomy > Muscular System

## field_notes
scu: FOMSCU Foundation 1 QBank, EOY 2026 Q10 — tests smooth muscle as the visceral muscle type. Target — apply after docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md.

---

# Item

## id
CON-NEU-D28EA156B57AB0

## label
The autonomic efferent pathway to the viscera is a two-neuron chain - preganglionic then postganglionic - unlike the single-neuron somatic motor pathway to skeletal muscle

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Physiology > Autonomic Nervous System

## field_notes
scu: FOMSCU Foundation 1 QBank, EOY 2026 Q12 — tests the ANS's two divisions. Target — apply after docs/Kasr-Source-Imports/concept/102-INT-physiology-concepts.md.

---

# Item

## id
CON-NEU-42BB9566BBF6CF

## label
Cells signal each other directly through gap junctions, or at a distance through neural and hormonal communication

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Physiology > Cell Physiology > Intercellular Communication

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q32 (also 2022 Q12) — tests the synaptic cleft. Target — apply after docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md.

---

# Item

## id
CON-FND-D10E79C01B3345

## label
Adenylate cyclase synthesises cAMP from ATP, and phosphodiesterase degrades cAMP back down, so the balance of the two enzymes sets the second messenger's level

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Enzymes and Cell Signalling

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q12 — tests ATP as cAMP's precursor. Target — apply after docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-molecular-concepts.md.

---

# Item

## id
CON-FND-DABC4FFBD58B80

## label
Arginine and histidine are the semi-essential amino acids — synthesised by the body but not fast enough to meet demand during growth

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Amino Acids and Proteins

## field_notes
scu: FOMSCU Foundation 1 QBank, EOM 2026 Q1 — tests arginine as (semi-)essential. Target — apply after docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-structural-concepts.md.

---

# Item

## id
CON-FND-853096A349FFBD

## label
Glycolysis has three irreversible steps, and the committed one is PFK-1 making fructose 1,6-bisphosphate

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Carbohydrate Metabolism > Glycolysis

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q19+27 (also 2022 Q7, 2023 Q19) — one concept covers glyceraldehyde 3-phosphate as the preparatory-phase product, asked from two angles. Target — apply after docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md.

---

# Item

## id
CON-FND-3FF9CA93465562

## label
Glycine is the one amino acid with no asymmetric carbon, making it optically inactive and the shortest amino acid

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Amino Acids and Proteins

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q5 — tests glycine as optically inactive. Target — apply after docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-structural-concepts.md.

---

# Item

## id
CON-FND-99CEF760A9D2CC

## label
Secondary structure is mainly α-helix or β-pleated sheet; the α-helix coils the chain along its long axis and is held by intra-chain hydrogen bonds between NH and C=O of different peptide bonds, with R-groups projecting outward, and is disrupted by ionic-bond-forming or ring-structure side chains — while collagen forms its own left-handed helix rather than the ordinary right-handed one

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Protein Structure

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q73 (also 2022 Q52) and EOM 2026 Q4 — same secondary-structure hydrogen-bond fact, paraphrased twice. Target — apply after docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md.

---

# Item

## id
CON-FND-42EE1863F04920

## label
Irreversible inhibitors permanently disable an enzyme, either by blocking its cofactor or by denaturing or chemically blocking groups on the apoenzyme — heavy-metal salts such as mercury inhibit by combining with the free sulfhydryl group

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Enzymes

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q14 — tests irreversible (covalent) enzyme inhibition. Target — apply after docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md.

---

# Item

## id
CON-FND-85CC08A33D0A88

## label
The cell membrane is a phospholipid bilayer with cholesterol, peripheral and integral proteins, and carbohydrate on its outer face

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Cytology > Cell Membrane

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q30 (also 2022 Q10) — tests phospholipids as the membrane-forming component. Target — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.
scu2: (lane 3, scu-fbs102-author3) EOY Final 2026 Q53 — same concept, different question: tests the membrane's full phospholipid/protein/glycolipid/glycoprotein composition, stated in this concept's own definition.

---

# Item

## id
CON-FND-21029C98FEA19F

## label
Hydrolysis breaks a nucleotide down to a nucleoside plus phosphate, and a nucleoside down to its nitrogenous base plus pentose; named each base, nucleoside and nucleotide by a fixed table (Adenine→Adenosine→AMP, Uracil→Uridine→UMP, and so on)

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Nucleic Acids > Nucleotide Structure

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q13 (also 2023 Q13) — tests guanine (in GTP) as a purine. Target — apply after docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md.

---

# Item

## id
CON-FND-2BD334DFDAE34C

## label
Monosaccharides form five kinds of derivative — sugar acids, sugar alcohols, deoxy sugars, amino sugars and glycosides — each made by a different modification of the parent sugar

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Carbohydrates > Monosaccharide Derivatives

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q58 (also 2022 Q38) — tests ribitol as a sugar alcohol. Target — apply after docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md.

---

# Item

## id
CON-FND-9F8AE7C57AFBA8

## label
Tertiary structure folds a polypeptide chain into a specific 3D globular shape, held by hydrophobic interactions between nonpolar side chains, electrostatic bonds between oppositely charged side chains, disulfide bonds between cysteines, hydrogen bonds involving hydroxyl/amide/carboxylic/ring-nitrogen groups, and weak Van der Waals interactions

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Protein Structure

## field_notes
scu: FOMSCU Foundation 1 QBank, EOY 2026 Q49 — tests tertiary structure as stabilised by R-group interactions. Target — apply after docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md.

---

# Item

## id
CON-FND-A5CFD23270ACE3

## label
DNA replication is semi-conservative: each daughter molecule keeps one original parental strand and gains one newly synthesized strand

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Genetics > Cell Cycle

## field_notes
scu: FOMSCU Foundation 1 QBank, EOY 2026 Q39 — tests DNA replication as semi-conservative and S-phase-confined. Target — apply after docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md.

---

# Item

## id
CON-DEV-215BD7E9E58872

## label
Gastrulation makes the trilaminar disc in the third week, and all three of its layers come from the epiblast

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Embryology > Gastrulation

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q33 (also 2022 Q13) — tests the epiblast origin of the trilaminar disc. Target — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
CON-FND-9C205E44C3404D

## label
The cell cycle is mitosis plus a three-phase interphase, with a G0 stable phase for cells that have left the cycle

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Genetics > Cell Cycle

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q15+40 (also 2022 Q20, 2023 Q15) — one cell-cycle-phases concept covers both the 'interphase' and 'S/synthesis phase' framings of the same DNA-replication-timing fact. Target — apply after docs/Kasr-Source-Imports/concept/104-CPS-histology-concepts.md.

---

# Item

## id
CON-FND-F5627F4531F391

## label
Three checkpoints police the cell cycle: the G1 checkpoint checks cell size, nutrients, growth factors and DNA damage; the G2 checkpoint checks cell size and DNA damage; and the spindle-assembly checkpoint checks that chromosomes are properly attached to the spindle

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Genetics > Cell Cycle

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q52 (also 2022 Q32) — tests the spindle-assembly checkpoint controlling M phase. Target — apply after docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md.

---

# Item

## id
CON-MSK-0824FE988ADA00

## label
The sarcomere, the segment between two Z lines, is the functional contractile unit of striated muscle

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Muscle Tissue > Sarcomere

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q16 (also 2023 Q16) — tests the myosin-containing A band as the dark sarcomere band. Target — apply after docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md.

---

# Item

## id
CON-FND-405BB5EA3C359E

## label
The Golgi is a stack of flat saccules with an entry and an exit face, and everything it buds off leaves from the exit face

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Cytology > Cytoplasmic Organelles

## field_notes
scu: FOMSCU Foundation 1 QBank, EOM 2026 Q10 and EOY 2026 Q23 — same Golgi packaging/modification function, asked from two source papers. Target — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.
scu2: (lane 3, scu-fbs102-author3) EOM Mid 2026 Q15 — same concept, different question: tests the Golgi's stacked-saccule EM structure directly, rather than its packaging function.

---

# Item

## id
CON-FND-4284C6B8667CD6

## label
A ribosome is a non-membranous particle of rRNA and protein, assembled as two unequal subunits in the nucleolus

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Cytology > Nucleus

## field_notes
scu: FOMSCU Foundation 1 QBank, EOM 2026 Q2 and Formative and Past Exams 2021 Q77 (also 2022 Q56) — same ribosome-biogenesis fact (rRNA made in the nucleolus, unites with protein), asked from two angles. Target — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
CON-NEU-7C20A38BB4B865

## label
The perineurium, a sleeve of layered flattened cells joined by tight junctions around each nerve fascicle, forms the blood-nerve barrier

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Nervous Tissue > Peripheral Nerve Coverings

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q46 (also 2022 Q26) — tests the perineurium as the per-fascicle covering. Target — apply after docs/Alexandria-Source-Imports/concept/AU-MED-105-histology-concepts.md.
scu2: (lane 3, scu-fbs102-author3) Formative and Past Exams 2021 Q22 (also 2022 Q2) — same concept, different question: tests the epineurium as the whole-trunk covering, the other of the three coverings this concept's own explicit_objective names.

---

# Item

## id
CON-FND-8EEA6972B77898

## label
Keratinized and non-keratinized stratified squamous epithelium differ in what lies on the surface

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Histology > General Histology > Epithelial Tissue

## field_notes
scu: FOMSCU Foundation 1 QBank, EOY 2026 Q27 — tests keratinized stratified squamous epithelium as the epidermis lining. Target — apply after docs/Kasr-Source-Imports/concept/101-ISK-practical-concepts.md.

---

# Item

## id
CON-FND-7FB8290199B237

## label
Yellow elastic connective tissue is a dense field of thin, single, zigzag elastic fibres, yellow in the fresh state

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Connective Tissue > Types of Connective Tissue Proper

## field_notes
scu: FOMSCU Foundation 1 QBank, EOY 2026 Q36 — tests yellow elastic CT in the aorta wall. Target — apply after docs/Kasr-Source-Imports/concept/101-ISK-practical-concepts.md.

---

# Item

## id
CON-FND-E66C68C0B80D16

## label
The membrane takes material in by phagocytosis, pinocytosis or receptor-mediated endocytosis, and puts it out by exocytosis

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Physiology > Cell Physiology > Membrane Transport

## field_notes
scu: FOMSCU Foundation 1 QBank, EOY 2026 Q57 — tests receptor-mediated endocytosis as the route lipoproteins take into cells. Target — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---------------------------------------------------------------------------
BATCH 3 (third author lane, scu-fbs102-author3) — the S2 minting pass's own
9 pending-reuse rows. These 9 concepts started this lane's "new" bucket
(from the Anatomy/Histology/Biochemistry triage clusters), but a closer
find-existing.mjs + grep pass found each one already stated in another
module's own pending concept batch — a gap in find-existing.mjs itself
(its pending-batch scanner reads only a `##` heading's first line; a fact
sitting past line 1 of a multi-line `aliases` or `definition` block is
invisible to it). Sparse SCU tags only, never a full record, so this can
never evict another university's data. 10 FOMSCU questions cover these 9
concepts (alpha-glucose and glucose-alpha-linkages share one concept, the
starch/glycogen record) — see docs/FOMSCU-Source-Imports/pending-live/
SCU-FBS102-s2-pending-reuse-questions.md.

Gate batch 3's questions together with each row's own source file (named in
its field_notes) plus this overlay file:
node scripts/content/gate.mjs batch docs/FOMSCU-Source-Imports/pending-live/SCU-FBS102-s2-pending-reuse-questions.md \
  --with docs/FOMSCU-Source-Imports/pending-live/SCU-FBS102-overlay-concepts.md \
  --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-lipid-concepts.md \
  --with docs/Kasr-Source-Imports/article/103-BMS-mcq-lipid.md \
  --with docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-structural-concepts.md \
  --with docs/Alexandria-Source-Imports/article/AU-MED-102-biochem-structural-articles.md \
  --with docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md \
  --with docs/Kasr-Source-Imports/article/102-INT-coverage.md \
  --with docs/Kasr-Source-Imports/article/102-INT-biochemistry.md \
  --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
  --with docs/Kasr-Source-Imports/article/101-ISK-histology.md \
  --with docs/Kasr-Source-Imports/article/101-ISK-histology-2.md \
  --with docs/Kasr-Source-Imports/article/101-ISK-histology-3.md \
  --with docs/Alexandria-Source-Imports/concept/AU-MED-105-histology-concepts.md \
  --with docs/Alexandria-Source-Imports/article/AU-MED-105-histology-articles.md

---

# Item

## id
CON-FND-177A829022AC8F

## label
A fatty acid is activated to acyl-CoA in the cytosol, and only carnitine can carry it across the inner mitochondrial membrane

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Lipid Metabolism

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q55 (also 2022 Q35) — tests acyl-CoA synthetase as the fatty-acid-activating enzyme, stated in this concept's own definition. Target — apply after docs/Kasr-Source-Imports/concept/103-BMS-mcq-lipid-concepts.md.

---

# Item

## id
CON-FND-BCF22EBBACF9E8

## label
The induced-fit model describes an enzyme's active site as flexible, reshaping around the substrate as it binds -- lipase is a textbook example of this flexible catalytic-site behaviour, contrasted with the older, rigid lock-and-key model

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Enzymes

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q70 (also 2022 Q49) — tests Fischer's lock-and-key model, stated in this concept's own pitfalls field as the contrasted rigid model. Target — apply after docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-structural-concepts.md.

---

# Item

## id
CON-FND-4706C1246E4B76

## label
Starch is the storage polysaccharide of chlorophyll-containing plants and glycogen the storage polysaccharide of animals, both branched or unbranched polymers of D-glucose linked by alpha1,4 (and, where branched, alpha1,6) glucosidic bonds

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Carbohydrates

## field_notes
scu: FOMSCU Foundation 1 QBank, Formative and Past Exams 2021 Q25 and Q59 (also 2022 Q5 and Q39) — two FOMSCU questions on this one concept: starch's alpha-glucose composition, and amylose's alpha-1,4 linkage specifically. Target — apply after docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md.

---

# Item

## id
CON-FND-028C50A610B2A2

## label
Km is the substrate concentration that gives half the maximal velocity, and a smaller Km means higher enzyme-substrate affinity

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Enzymes

## field_notes
scu: FOMSCU Foundation 1 QBank, EOY Final 2026 Q50 — tests the Michaelis constant's definition directly. Target — apply after docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md.

---

# Item

## id
CON-FND-B22A5E7A56EC8F

## label
The goblet cell is a unicellular exocrine gland: one flask-shaped mucous-secreting cell sitting within a surface epithelium

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Glandular Epithelium

## field_notes
scu: FOMSCU Foundation 1 QBank, EOY Final 2026 Q28 — tests the goblet cell as the unicellular exocrine gland example directly. Target — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
CON-FND-0E38E21957DB05

## label
Rough endoplasmic reticulum is flattened cisternae studded on the outside with ribosomes, and it makes and segregates protein for export

## universities
+scu

## learner_years
+1

## modules
+SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Cytoplasmic Organelles

## field_notes
scu: FOMSCU Foundation 1 QBank, EOY Final 2026 Q25 — tests rough ER's role in synthesising protein for export directly. Target — apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.
