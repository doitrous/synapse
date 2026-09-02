<!--
  MU-MED104 · pending-live sparse CONCEPT overlay for the 9 questions in the
  sibling file MU-MED104-questions.md (kept apart because detectKind reads
  only the first record in a file, per the ASU-IBM precedent).

  Every ## id below targets a concept that already exists in an unimported
  batch from another lane — not yet in server/data/medical-library-v1.json in
  this checkout, checked via find-existing.mjs plus a canonical-key grep sweep
  of docs/*-Source-Imports/concept/ and docs/import-ready/concept/ (LANE-CARD
  §2 rule 4). Six source files are involved, all Kasr/Alexandria Year-1
  batches whose facts recur, unprompted, in this Menoufia MSK1 exam:

    A. docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md — desmosine/
       collagen-elastin (CON-FND-31F96EC2F609C9).
    B. docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-metabolism-concepts.md
       — ascorbic acid / glucuronic acid pathway (CON-FND-6394F7DBD17F80).
    C. docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md —
       smooth muscle action potential (CON-MSK-A10AC6BAF27F00).
    D. docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md
       — nerve excitability factors (CON-NEU-77596C8A899A7E).
    E. docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md — collagen
       types and where each is found (CON-FND-A635150A3F245D).
    F. docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md — four
       ids: elastic-vs-fibrocartilage (CON-MSK-0F4870E557FAF4), chondroblast
       (CON-MSK-E198B099DCA0C0), bone ossification two methods
       (CON-MSK-092F6F14307DB9), chondrocyte/isogenous groups
       (CON-MSK-CB0E0F665E200B).

  Per LANE-BRIEF rule 6 and the concepts manual (`## module_subject` fully
  replaces on every write — no `+` form): every row restates the target's
  existing `module_subject` line(s) plus MU's own. `## universities`,
  `## learner_years` and `## modules` are true ID-list columns and take
  `+mu` / `+MU_Y1` / `+MU-MED104`. Concepts have no `university_notes`
  column — the MU source note goes in `field_notes` instead, per the manual.

  Every fact below is tested by "MFM42Support - END MODULE MSK1.pdf" /
  "MFM42Support - Answers of MSK1 END.pdf" only (sourceId mu_2b2ae5ff3599e526123e
  per manifest/y1-sources.json), Biochemistry/Physiology/Histology sections,
  Q1/Q3/Q7/Q8/Q23/Q25/Q26/Q27/Q28. Key convention: red font colour on the
  correct option line, confirmed by rendering pages 1, 2, 7 and 8 — the text
  layer itself carries no key marking (LANE-CARD.md §7).

  Simulate together with each target source file, e.g.:
    npm run medical:simulate -- \
      docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md \
      docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-metabolism-concepts.md \
      docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md \
      docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md \
      docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
      docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md \
      docs/Menoufia-Source-Imports/pending-live/MU-MED104-concepts-overlay.md \
      --emit /tmp/sim-MU-MED104-concepts-overlay.json

  --- lane-2 addition (6 more sparse rows below) ---
  Six more concept ids overlaid, all confirmed unique via find-existing.mjs
  (no live/pending hit already carrying +mu): CON-MSK-8E4BB62A579068 and
  CON-MSK-02A831DFEBC439 from docs/Alexandria-Source-Imports/concept/
  AU-MED-105-anatomy-concepts.md (pectoral girdle osteology; anterior
  interosseous nerve); CON-MSK-EE022A2043C10F and CON-MSK-B640E3E982A149 from
  docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md (axillary nerve
  injury; ulnar nerve/claw hand); CON-MSK-F12505C48037BB and
  CON-MSK-9180242FA01B58, also from AU-MED-105-anatomy-concepts.md (gluteus
  maximus action/nerve; posterior leg compartment). Gate these four rows
  --with the two source files above alongside the six from lane 1.
-->

# Item

## id
CON-FND-31F96EC2F609C9

## label
Collagen and elastin share hydroxyproline residues, but differ in nearly everything else — collagen is a glycoprotein built from a three-chain tropocollagen stabilized by hydrogen bonds and covalent cross-links, while elastin is a non-glycoprotein built from a one-chain tropoelastin stabilized by desmosine cross-links

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED104

## module_subject
102 INT > Biochemistry > Proteins of Extracellular Matrix
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Biochemistry

## field_notes
mu: Tested as Q1, "Which amino acid is not present in collagen?" (answer: Desmosine), MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, red-text key on p1.

---

# Item

## id
CON-FND-6394F7DBD17F80

## label
The glucuronic acid pathway conjugates bilirubin and xenobiotics but cannot make ascorbic acid in the human body

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED104

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Glucuronic acid pathway
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Biochemistry

## field_notes
mu: Tested as Q3, "Which of the following statements is false about ascorbic acid?" (false statement: "It can be synthesized in the body"), MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, red-text key on p1.

---

# Item

## id
CON-MSK-A10AC6BAF27F00

## label
Smooth muscle action potentials occur as brief spikes or as plateaus, and their slow rise reflects voltage-gated calcium rather than sodium channels

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED104

## module_subject
103 BMS > Physiology > Electrical Activity of Smooth Muscle
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Physiology

## field_notes
mu: Tested as Q7, "Which of the following is the type of depolarization in the muscle of the uterus?" (answer: Action potential with plateau), MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, red-text key on p2.

---

# Item

## id
CON-NEU-77596C8A899A7E

## label
Sodium permeability sets nerve excitability and extracellular potassium sets the resting potential, which is why local anaesthetics silence a nerve and hypokalaemia paralyses a patient

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED104

## module_subject
103 BMS > Physiology > Nerve Excitability
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Physiology

## field_notes
mu: Tested as Q8, "Decrease the extracellular concentration of which of the following ions to 50% of normal ... results in Tetany?" (answer: Calcium), MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, red-text key on p2.

---

# Item

## id
CON-FND-A635150A3F245D

## label
The collagen types are told apart by the form they take and the site they take it in, not by any difference visible in one fibre

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED104

## module_subject
101 ISK > Histology > Connective Tissue Fibres
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Histology

## field_notes
mu: Tested as Q23, "The following type of CT Fibers is ossified during bone formation" (answer: Collagen type I), MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, red-text key on p7.

---

# Item

## id
CON-MSK-0F4870E557FAF4

## label
Yellow elastic cartilage is flexible and perichondrium-covered; white fibrocartilage is tough, uncovered, and attaches bone to bone

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED104

## module_subject
103 BMS > Histology > Cartilage Types
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Histology

## field_notes
mu: Tested as Q25, "Which of the following types of cartilage contains collagen type I?" (answer: White Fibrocartilage), MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, red-text key on p8.

---

# Item

## id
CON-MSK-E198B099DCA0C0

## label
The chondroblast arises from mesenchymal cells, sits on the cartilage surface, and secretes matrix for appositional growth

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED104

## module_subject
103 BMS > Histology > Cartilage Cells
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Histology

## field_notes
mu: Tested as Q26, "At electron microscope level (E/M), chondroblasts show all the features of" (answer: Protein Synthesis), MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, red-text key on p8.

---

# Item

## id
CON-MSK-092F6F14307DB9

## label
Bone forms by one of two methods, intramembranous or intracartilaginous ossification, and its remodelling is hormonally balanced

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED104

## module_subject
103 BMS > Histology > Bone Ossification
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Histology

## field_notes
mu: Tested as Q27, "One of the following connective tissues converts into spongy bone" (answer: Mesenchymal), MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, red-text key on p8.

---

# Item

## id
CON-MSK-CB0E0F665E200B

## label
The chondrocyte develops from the chondroblast, lies imprisoned in a lacuna, and divides into isogenous groups for interstitial growth

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED104

## module_subject
103 BMS > Histology > Cartilage Cells
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Histology

## field_notes
mu: Tested as Q28, "Isogenous groups are made of group of cells up to 8 cells of" (answer: Chondrocytes), MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, red-text key on p8.

---

# Item

## id
CON-MSK-8E4BB62A579068

## label
The clavicle is the first bone to begin ossifying and articulates only with the sternum and acromion (not the coracoid process); its named surfaces carry set muscle and ligament attachments, the coracoid process gives attachment to pectoralis minor, and the scapular spine continues laterally as the acromion

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED104

## module_subject
AU-MED-105 > Anatomy > Upper Limb > Pectoral region and shoulder girdle
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Anatomy

## field_notes
mu: Tested as Q10, "Which one of the following bony parts is the insertion of the muscle that divides the axillary artery into three parts?" (answer: Coracoid process), MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, red-text key on p3.

---

# Item

## id
CON-MSK-EE022A2043C10F

## label
Shoulder dislocation endangers the axillary nerve, costing deltoid and teres minor

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED104

## module_subject
101 ISK > Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Anatomy

## field_notes
mu: Tested as Q11, "A patient presented with surgical neck humerus fracture; he has weakness in rotating his arm laterally. Which pair of muscles are paralyzed?" (answer: Teres Minor and Deltoid), MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, red-text key on p3.

---

# Item

## id
CON-MSK-02A831DFEBC439

## label
The anterior interosseous nerve, a branch of the median nerve given off just below the elbow, supplies flexor pollicis longus, the lateral half of flexor digitorum profundus, and pronator quadratus, and its isolated injury causes a pinch weakness with no sensory loss

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED104

## module_subject
AU-MED-105 > Anatomy > Upper Limb > Forearm
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Anatomy

## field_notes
mu: Tested as Q13, "A 29-year-old patient complained of inability to flex the distal interphalangeal joint of the index finger as a result of supracondylar fracture of the humerus, which of the following is the root value of the affected nerve?" (answer: C5,6,7,8,T1), MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, red-text key on p3.

---

# Item

## id
CON-MSK-B640E3E982A149

## label
The ulnar nerve behind the medial epicondyle, and why a high injury claws the hand less

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED104

## module_subject
101 ISK > Anatomy > Upper Limb > Nerve Supply of Upper Limb & Nerve Injuries
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Anatomy

## field_notes
mu: Tested as Q20, "Fracture of which one of the following bony parts is most likely to cause partial claw hand?" (answer: Medial Epicondyle), MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, red-text key on p6.

---

# Item

## id
CON-MSK-F12505C48037BB

## label
Gluteus maximus extends and laterally rotates the hip, is supplied by the inferior gluteal nerve, and inserts mostly into the iliotibial tract with only a minority of fibres reaching the gluteal tuberosity

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED104

## module_subject
AU-MED-105 > Anatomy > Lower Limb > Gluteal region
MU-MED104 > 00 Module-wide > 07 EOY Exams > Final 41 > Anatomy

## field_notes
mu: Tested as "Final 41.pdf" Q9, "A 70 year old woman ... fracture of the greater trochanter of her femur. Which of the following muscles would continue to function normally?" (answer: Gluteus maximus), grey-highlight key, rendered p1 (the "Make Watermark" phone-photo OCR-defeats trap).

---

# Item

## id
CON-MSK-9180242FA01B58

## label
The posterior compartment of the leg has a superficial group (gastrocnemius, soleus, plantaris) and a deep group (tibialis posterior, flexor digitorum longus, flexor hallucis longus, popliteus), all supplied by the tibial nerve, and together they plantarflex and invert the foot

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED104

## module_subject
AU-MED-105 > Anatomy > Leg > Posterior compartment
MU-MED104 > 00 Module-wide > 07 EOY Exams > Final 41 > Anatomy

## field_notes
mu: Tested as "Final 41.pdf" Q10, "A 36 years old worker is hit on the leg ... unable to plantar flex and invert his foot. Which of the following muscles is most likely affected?" (answer: Tibialis posterior), grey-highlight key, rendered p1 (the "Make Watermark" phone-photo OCR-defeats trap).
