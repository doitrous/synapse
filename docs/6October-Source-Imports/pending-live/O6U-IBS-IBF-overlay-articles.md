<!--
  O6U-IBS-101 + O6U-IBF-102 -- pending-live sparse ARTICLE overlay
  (sibling overlay-concepts.md carries the concept half).

  Apply each row ONLY after its named source article file is live. Every row restates
  ## title verbatim. universities/years/module are true ID-list columns; module_subject and
  university_notes fully replace on every write, so each restates the source's existing
  path/note plus O6U's own.

  Source files:
    A. docs/Kasr-Source-Imports/article/101-ISK-histology.md
    B. docs/Kasr-Source-Imports/article/101-ISK-anatomy-2.md
    C. docs/Kasr-Source-Imports/article/103-BMS-histology.md
    D. docs/Alexandria-Source-Imports/article/AU-MED-102-biochem-structural-articles.md
    E. docs/Alexandria-Source-Imports/article/AU-MED-102-physiology-articles.md
    F. docs/Kasr-Source-Imports/article/102-INT-physiology-blood-ans.md
    G. docs/Kasr-Source-Imports/article/102-INT-physiology.md
    H. docs/Kasr-Source-Imports/article/101-ISK-histology-2.md

  Simulate together with the source file each block targets, e.g.:
  npm run medical:simulate -- docs/6October-Source-Imports/pending-live/O6U-IBS-IBF-overlay-articles.md \
    --with docs/Kasr-Source-Imports/article/101-ISK-histology.md \
    --with docs/Kasr-Source-Imports/article/101-ISK-anatomy-2.md \
    --with docs/Kasr-Source-Imports/article/103-BMS-histology.md \
    --with docs/Alexandria-Source-Imports/article/AU-MED-102-biochem-structural-articles.md \
    --with docs/Alexandria-Source-Imports/article/AU-MED-102-physiology-articles.md \
    --with docs/Kasr-Source-Imports/article/102-INT-physiology-blood-ans.md \
    --with docs/Kasr-Source-Imports/article/102-INT-physiology.md \
    --with docs/Kasr-Source-Imports/article/101-ISK-histology-2.md \
    --emit /tmp/sim-O6U-IBS-IBF-pending-articles.json
-->

# Item

## id
ART-101-HIS-CONNECTIVE-TISSUE-CELLS

## title
Connective tissue cells

## subject
fnd

## topic
Connective tissue

## summary
Connective tissue proper holds nine named cell types, seven resident and two transient, and the identification exam turns on telling apart the two that look most alike. The mast cell and the plasma cell are both large and both basophilic. Only one has metachromatic granules, and only one has a cart-wheel nucleus, and that pair of features is what an answer has to reach.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Cytology and connective tissue
101 ISK > Histology > Introduction > Microtechniques

## university_notes
o6u: Reused for M2 Q10 (reticular fibre staining), mid module BOS 101 module 2.pdf p4. Target A.

---

# Item

## id
ART-101-HIS-CYTOPLASMIC-ORGANELLES

## title
The cytoplasm: organelles and inclusions

## subject
fnd

## topic
Cytology

## summary
The cytoplasm is sorted twice before anything is described: living organelles against non-living inclusions, then membranous organelles against non-membranous ones. After that the chapter is a series of organelles, and the exam asks each of them the same three questions -- what it looks like by light microscopy, what it looks like by electron microscopy, and what it does. Three of the answers to the first question are the same: the smooth endoplasmic reticulum, the Golgi and the cytoskeleton are all invisible in themselves and are known by something else -- an acidophilia, a pale unstained area, and immunofluorescence.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Cytology and connective tissue
101 ISK > Histology > Cytology > Cytoplasm

## university_notes
o6u: Reused for M1 Q4/Q5 (residual bodies, smooth ER detox) and M2 Q13/Q14 (pinocytosis, RER basophilia/ribosomes). Target A.

---

# Item

## id
ART-101-ANA-LYMPHATIC-SYSTEM

## title
The lymphatic system

## subject
msk

## topic
Basis of anatomy

## summary
The lymphatic system is three parts -- vessels, lymphoid tissue and free cells -- and one drainage map with a lopsided split: the right lymphatic duct takes one quadrant of the body and the thoracic duct takes the other three. Everything else on this leaf is short closed lists: four characters of a lymph vessel, four places lymph vessels do not exist, four forces that move lymph, three functions of a lymph node, four functions of the spleen. The one sentence to carry away is the book's own: lymph nodes filter lymph, the spleen filters blood.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Anatomical terms and systems
101 ISK > Anatomy > Basis of Anatomy > Lymphatic system

## university_notes
o6u: Reused for M2 Q8 (right lymphatic duct), mid module BOS 101 module 2.pdf p3. Target B.

---

# Item

## id
ART-101-ANA-SKELETAL-SYSTEM

## title
The skeletal system: bone and cartilage

## subject
msk

## topic
Basis of anatomy

## summary
Three closed lists carry this leaf and each is asked as a separate five-mark question: eight functions of the skeleton, three ways of classifying bones -- by position, by ossification, by shape -- and four arteries of a long bone. The growth of a long bone is the thread that ties them together, because length comes from the epiphyseal plate, width comes from the periosteum, and the nutrient artery runs away from the growing end. Cartilage is a fourth list of three types, and the type is what a joint is named from.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Anatomical terms and systems
101 ISK > Anatomy > Basis of Anatomy > Skeletal system

## university_notes
o6u: Reused for M1 Q14 (metaphysis), mid module BOS 101 module 1 october.pdf p4-5. Target B.

---

# Item

## id
ART-103-HIS-CARTILAGE-TYPES

## title
The three cartilage types and the intervertebral disc

## subject
msk

## topic
Basic tissues

## summary
Hyaline, yellow elastic and white fibrocartilage are the same basic tissue tuned three different ways for three different jobs: a flexible airway skeleton, a springy ear that recovers its shape, and a tough bone-to-bone attachment that resists tearing. The intervertebral disc, built from two of these three types stacked concentrically, is where that engineering logic becomes a single clinically important structure.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Anatomical terms and systems
103 BMS > Histology > Cartilage > Hyaline Cartilage

## university_notes
o6u: Reused for M1 Q15 (hyaline cartilage covers articular surfaces), mid module BOS 101 module 1 october.pdf p5. Target C.

---

# Item

## id
ART-103-HIS-BONE-OSSIFICATION

## title
How bone is formed: ossification

## subject
msk

## topic
Basic tissues

## summary
Every bone in the body is made by one of two routes: intramembranous ossification, which turns a mesenchymal membrane directly into bone for flat bones, or intracartilaginous ossification, which destroys and replaces a cartilage model piece by piece for long, short and irregular bones. The second route is the more elaborate of the two, and it is also the one that explains why a growing child's long bones can lengthen at all.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Anatomical terms and systems
103 BMS > Histology > Bone > Intracartilagenous Ossification

## university_notes
o6u: Reused for M2 Q3 (epiphysis develops from secondary ossification centres), mid module BOS 101 module 2.pdf p1. Target C.

---

# Item

## id
ART-FND-AU-MED-102-PROTEIN-CHEMISTRY

## title
Protein chemistry: amino acids to quaternary structure

## subject
fnd

## topic
Biomolecules

## summary
Alexandria's Biochemistry department examines amino acids as a set of overlapping classification axes held at once -- chemical group, charge, essentiality, ring type -- and tests each axis with its own exception (glutamine among the basic amino acids, threonine among the branched-chain ones, tyrosine among the essential ones). The second half of the chapter moves from single amino acids to structure: which bonds hold which level of a protein together, what denaturation does and does not touch, and the specific amino-acid substitution behind sickle cell disease.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IBF-102

## module_subject
O6U-IBF-102 > BOS 101 mid-module exam > Biochemistry (amino acids and pH)
AU-MED-102 > Biochemistry > Protein Chemistry

## university_notes
o6u: Reused for M1 Q9/Q10 and M2 Q17/Q18 (branched-chain amino acid, glutathione composition). Target D.

---

# Item

## id
ART-FND-PHYSIO-HOMEOSTASIS-TRANSPORT

## title
Foundation physiology: membrane transport, fluid compartments and homeostasis

## subject
fnd

## topic
Physiology

## summary
The Foundation physiology course opens with the ionic basis of the membrane potential, the definition of osmosis, the electrolyte differences between the extracellular and intracellular compartments, the relative sizes of the body-fluid compartments, and homeostasis itself -- defined through its negative-feedback loop and contrasted with the rarer positive-feedback pattern. Every later fact about a specific organ's regulation assumes this vocabulary is already secure.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IBF-102

## module_subject
O6U-IBF-102 > BOS 101 mid-module exam > Cell physiology (osmosis, membrane)
AU-MED-102 > Physiology > Homeostasis and Transport

## university_notes
o6u: Reused for M1 Q20 / M2 Q20 (osmosis moves water toward the more concentrated solution). Target E.

---

# Item

## id
ART-102-PHY-ORGANISATION-OF-THE-AUTONOMIC-NERVOUS-SYSTEM

## title
Organisation of the autonomic nervous system

## subject
neuro

## topic
Autonomic nervous system

## summary
One architectural fact organises everything the book teaches about the ANS from here on: the autonomic efferent pathway is always two neurons, never one. This short chapter states that fact and the book's own five-row comparison against the somatic system, and every later ANS chapter (ganglia, sympathetic, parasympathetic, chemical transmission) is built as a further specification of the same two-neuron chain.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IBF-102

## module_subject
O6U-IBF-102 > BOS 101 mid-module exam > Autonomic pharmacology and physiology
102 INT > Physiology > Autonomic nervous system

## university_notes
o6u: Reused for M1 Q22 / M2 Q22 (parasympathetic pelvic supply). Target F.

---

# Item

## id
ART-102-PHY-PARASYMPATHETIC-NERVOUS-SYSTEM

## title
Parasympathetic nervous system

## subject
neuro

## topic
Autonomic nervous system

## summary
The parasympathetic system is cranio-sacral, anabolic and energy-preserving -- rest, digest, reading. It leaves the brain in four cranial nerves and the cord in the second, third and fourth sacral segments, and one of those nerves does most of the work: the vagus carries about 75% of all parasympathetic fibres and supplies the entire thoracic and abdominal viscera. Its effects run organ by organ, and one of them is a negative: the vagus does not supply the ventricles at all.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IBF-102

## module_subject
O6U-IBF-102 > BOS 101 mid-module exam > Autonomic pharmacology and physiology
102 INT > Physiology > Autonomic nervous system > Parasympathetic nervous system

## university_notes
o6u: Reused for M1 Q22 / M2 Q22 (parasympathetic pelvic supply), second of two articles the pending concept lists in article_ids. Target G.

---

# Item

## id
ART-101-HIS-MEMBRANOUS-SPECIALISATIONS

## title
Cell polarity and membranous specialisations

## subject
fnd

## topic
Epithelial tissues

## summary
An epithelial cell is polarised, and the book takes its specialisations in three groups by surface: apical, lateral and basal. The apical group is where cilia sit, and the examinable point about a cilium is that it is a microtubular structure with a stated ancestry -- a centriole becomes a basal body, the basal body migrates to the apex, and the shaft it grows has a countable number of microtubules that a microvillus does not have at all.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Cytology and connective tissue
101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations

## university_notes
o6u: Reused for M2 Q12 (gap junctions), mid module BOS 101 module 2.pdf p4. Target A.

---

# Item

## id
ART-101-ANA-INTRODUCTION

## title
Anatomical position, planes and terms

## subject
msk

## topic
Basis of anatomy

## summary
Every anatomical description in the module is written from one starting posture, and if the posture changes the words change with it. Anatomical erect position fixes the palms facing forwards, which is why the radius is lateral and the ulna medial in every sentence you will read this year. Four planes, fourteen terms of position and six terms of number -- a short closed list that is asked directly in the single-best-answer paper and used silently in every other question on it.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Anatomical terms and systems
101 ISK > Anatomy > Basis of Anatomy > Introduction

## university_notes
o6u: Reused for M2 Q4 (lateral = away from the median plane), mid module BOS 101 module 2.pdf p2. Target B.

---

# Item

## id
ART-101-HIS-MICROTECHNIQUES

## title
Microtechniques

## subject
fnd

## topic
Introduction

## summary
Three ways of turning a piece of tissue into a section, and each is best at exactly one thing: paraffin is the most common, celloidin the most perfect, freezing the most rapid. The stains that follow are asked as pairs -- dye against what it binds -- and every one of those pairs turns on a single idea: a basic dye binds an acidic component, so the nucleus is always basophilic, and an acidic dye binds a basic one.

## sections

## universities
+o6u

## years
+O6U_Y1

## module
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Cytology and connective tissue
101 ISK > Histology > Introduction > Microtechniques

## university_notes
o6u: Reused for M2 Q14 (RER basophilia due to ribosomes), mid module BOS 101 module 2.pdf p5. Target H.

---
