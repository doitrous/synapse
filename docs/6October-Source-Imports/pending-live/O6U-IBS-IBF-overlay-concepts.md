<!--
  O6U-IBS-101 + O6U-IBF-102 -- pending-live sparse CONCEPT overlay.
  Per the chief-of-staff's TRIAGE APPROVED note on coverage/O6U-IBS-IBF-triage.md:
  "'pending' Kasr/AU hits are LIVE in production" -- these ids are ahead of this checkout's
  local server/data/medical-library-v1.json snapshot (not refreshed via
  medical:snapshot-live since these Kasr/Alexandria batches landed), so find-existing.mjs
  and medical:simulate see them only in the sibling lane's own unimported batch files named
  below. Apply this file ONLY after the named source concept file for each id is live.

  Sibling overlay-articles.md carries the article half (detectKind reads only the first
  record in a file). Every row restates ## label verbatim; universities/learner_years/modules
  are true ID-list columns (+o6u/+1/+O6U-<CODE> -- learner_years is numeric on concepts, not
  the O6U_Y1 id form questions/articles use); module_subject fully replaces on every write, so
  each restates the source's existing path plus O6U's own.

  Two ids below correct the source triage's own "live" classification (see the sibling
  live-overlay-concepts.md header for detail): the triage's live glutathione and gap-junction
  candidates turned out to be different facts on inspection; the real matches are these two
  pending ones instead.

  Source files:
    A. docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md -- university kau, module 101 ISK
    B. docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md -- university kau, module 103 BMS
    C. docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-structural-concepts.md -- university au, module AU-MED-102
    D. docs/Alexandria-Source-Imports/concept/AU-MED-102-physiology-concepts.md -- university au, module AU-MED-102
    E. docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md -- university kau, module 102 INT

  Simulate together with the source file each block targets, e.g.:
  npm run medical:simulate -- docs/6October-Source-Imports/pending-live/O6U-IBS-IBF-overlay-concepts.md \
    --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
    --with docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-structural-concepts.md \
    --with docs/Alexandria-Source-Imports/concept/AU-MED-102-physiology-concepts.md \
    --with docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md \
    --emit /tmp/sim-O6U-IBS-IBF-pending-concepts.json
-->

# Item

## id
CON-FND-0B3CC0A79F9150

## label
Smooth endoplasmic reticulum is invisible in itself and known by the acidophilia it causes and its ribosome-free tubules

## universities
+o6u

## learner_years
+1

## modules
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Cytology and connective tissue
101 ISK > Histology > Cytology > Cytoplasm

## field_notes
o6u: Tested as M1 Q5 ("enzymes used for detoxification of some drugs are attached to...", answer: smooth endoplasmic reticulum), mid module BOS 101 module 1 october.pdf p2 -- 52% of respondents (116/221). Target A.

---

# Item

## id
CON-FND-9D325B98FC59A0

## label
A secondary lysosome is named by what the primary lysosome fused with, and all end as residual bodies

## universities
+o6u

## learner_years
+1

## modules
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Cytology and connective tissue
101 ISK > Histology > Cytology > Cytoplasm

## field_notes
o6u: Tested as M1 Q4 ("...fusion of 1ry lysosomes with undigested remnants", answer: residual bodies), mid module BOS 101 module 1 october.pdf p1-2 -- 67% of respondents (146/218). Target A.

---

# Item

## id
CON-FND-471B49C03F8BF8

## label
Reticular fibres are branching, argyrophilic and PAS-positive, invisible in H&E, and the reticular cells that make them are modified fibroblasts of the organ stroma

## universities
+o6u

## learner_years
+1

## modules
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Cytology and connective tissue
101 ISK > Histology > Introduction > Microtechniques

## field_notes
o6u: Tested as M2 Q10 ("which of the following is used to stain reticular fibers?", answer: Silver & PAS), mid module BOS 101 module 2.pdf p4 -- 47% of respondents (90/193), a plurality only. Argyrophilic = takes a silver stain, matching the printed key. Target A. Not the same fact as CON-MSK-0E3AE8E79060E1 (endomysial reticular fibres in muscle, a different specific claim) -- see live-overlay-concepts.md header.

---

# Item

## id
CON-FND-E66C68C0B80D16

## label
The membrane takes material in by phagocytosis, pinocytosis or receptor-mediated endocytosis, and puts it out by exocytosis

## universities
+o6u

## learner_years
+1

## modules
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Cytology and connective tissue
101 ISK > Histology > Cytology > Cytoplasm

## field_notes
o6u: Tested as M2 Q13 ("...taken by the cell membrane by the process of pinocytosis?", answer: fluid particles), mid module BOS 101 module 2.pdf p5 -- 86% of respondents (168/196). Target A.

---

# Item

## id
CON-MSK-BF3670E27D6F12

## label
The right lymphatic duct drains one quadrant of the body and the thoracic duct drains the other three

## universities
+o6u

## learner_years
+1

## modules
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Anatomical terms and systems
101 ISK > Anatomy > Basis of Anatomy > Lymphatic system

## field_notes
o6u: Tested as M2 Q8 ("the right lymphatic duct drains lymph from which of the following parts?", answer: right side of the thorax), mid module BOS 101 module 2.pdf p3 -- 87% of respondents (170/195). Target A.

---

# Item

## id
CON-MSK-EFD497A9922A4D

## label
A long bone is an epiphysis at each end, a diaphysis between them, and a metaphysis where the two meet

## universities
+o6u

## learner_years
+1

## modules
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Anatomical terms and systems
101 ISK > Anatomy > Basis of Anatomy > Skeletal system

## field_notes
o6u: Tested as M1 Q14 ("...the newly formed bone at the end of diaphysis", answer: metaphysis), mid module BOS 101 module 1 october.pdf p4-5 -- 60% of respondents (133/222). Target A.

---

# Item

## id
CON-MSK-0EA979EBF9D434

## label
Hyaline cartilage is the most common, glassy-translucent cartilage and the structural template for the other two types

## universities
+o6u

## learner_years
+1

## modules
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Anatomical terms and systems
103 BMS > Histology > Cartilage > Hyaline Cartilage

## field_notes
o6u: Tested as M1 Q15 ("by which of the following is the articular surface of a long bone covered?", answer: hyaline cartilage), mid module BOS 101 module 1 october.pdf p5 -- 68% of respondents (152/222). Target B.

---

# Item

## id
CON-MSK-EBA37D8401180C

## label
The secondary ossification centre in the epiphysis leaves an epiphyseal plate of six zones and articular cartilage as the only cartilage not replaced by bone

## universities
+o6u

## learner_years
+1

## modules
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Anatomical terms and systems
103 BMS > Histology > Bone > Intracartilagenous Ossification

## field_notes
o6u: Tested as M2 Q3 ("the epiphysis of bone develops from...", answer: secondary centers), mid module BOS 101 module 2.pdf p1 -- 66% of respondents (130/197). Target B.

---

# Item

## id
CON-FND-4F4C3943A3D7D6

## label
Valine, leucine and isoleucine are the branched-chain amino acids; threonine is not

## universities
+o6u

## learner_years
+1

## modules
+O6U-IBF-102

## module_subject
O6U-IBF-102 > BOS 101 mid-module exam > Biochemistry (amino acids and pH)
AU-MED-102 > Biochemistry > Protein Chemistry

## field_notes
o6u: Tested as M1 Q9 / M2 Q17 ("which of the following is a branched amino acid?", answer: valine), mid module BOS 101 module 1 october.pdf p3 -- 78% of respondents (170/219); recurs at M2 Q17, 81% (159/196). Target C.

---

# Item

## id
CON-FND-E2CB20749CB547

## label
Glutathione is the tripeptide glutamate-cysteine-glycine, and its active group is cysteine's sulfhydryl

## universities
+o6u

## learner_years
+1

## modules
+O6U-IBF-102

## module_subject
O6U-IBF-102 > BOS 101 mid-module exam > Biochemistry (amino acids and pH)
AU-MED-102 > Biochemistry > Protein Chemistry

## field_notes
o6u: Tested as M1 Q10 / M2 Q18 ("which group of amino acids contribute in glutathione structure?", answer: glutamic, cysteine and glycine), mid module BOS 101 module 1 october.pdf p3-4 -- 77% of respondents (168/218); recurs at M2 Q18, 76% (148/196). Target C. Not CON-RES-9DA5B3FB92BC7A (the triage's original live candidate, which is about acetylcysteine/paracetamol overdose, a different fact) -- see live-overlay-concepts.md header.

---

# Item

## id
CON-FND-80B7C9250A379D

## label
Osmosis is solvent (water) movement across a semipermeable membrane toward the higher-solute side

## universities
+o6u

## learner_years
+1

## modules
+O6U-IBF-102

## module_subject
O6U-IBF-102 > BOS 101 mid-module exam > Cell physiology (osmosis, membrane)
AU-MED-102 > Physiology > Homeostasis and Transport

## field_notes
o6u: Tested as M1 Q20 / M2 Q20 ("solution A is more concentrated than solution B...", answer: water passes from B to A by osmosis, i.e. toward the more concentrated/higher-solute side), mid module BOS 101 module 1 october.pdf p7 -- 61% of respondents (134/221); recurs at M2 Q20, 61% (121/197). Target D.

---

# Item

## id
CON-NEU-6CC8F7E6DC2871

## label
Parasympathetic outflow to the pelvis leaves the cord as the pelvic splanchnic nerves from S2-S4, relays in terminal ganglia near the organs, and produces defecation, micturition, erection and female genital vasodilatation

## universities
+o6u

## learner_years
+1

## modules
+O6U-IBF-102

## module_subject
O6U-IBF-102 > BOS 101 mid-module exam > Autonomic pharmacology and physiology
102 INT > Physiology > Autonomic nervous system > Parasympathetic nervous system

## field_notes
o6u: Tested as M1 Q22 / M2 Q22 ("the parasympathetic supply to the pelvis may lead to...", answer: contract wall of urinary bladder and rectum -- micturition/defecation, matching this concept's stated effects), mid module BOS 101 module 1 october.pdf p8 -- 70% of respondents (155/222); recurs at M2 Q22, 70% (137/197). Target E.

---

# Item

## id
CON-FND-ACB35745EC9A5D

## label
The gap junction is the only junction material passes through: paired channels of six subunits each carry ions, small molecules and impulses between cells

## universities
+o6u

## learner_years
+1

## modules
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Cytology and connective tissue
101 ISK > Histology > Epithelial Tissues > Polarity and Membranous Specializations

## field_notes
o6u: Tested as M2 Q12 ("...the type of cell junction that allows the passage of molecules between adjacent epithelial cells?", answer: gap junction), mid module BOS 101 module 2.pdf p4 -- 71% of respondents (137/194). Target A. Not CON-GYN-AFE8962308CA70 (the triage's original live candidate, a corona-radiata/oocyte-specific fact) -- see live-overlay-concepts.md header.

---

# Item

## id
CON-MSK-A0C1F50FABDC0F

## label
Medial and lateral are measured from the median plane; proximal and distal from the root of the limb

## universities
+o6u

## learner_years
+1

## modules
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Anatomical terms and systems
101 ISK > Anatomy > Basis of Anatomy > Introduction

## field_notes
o6u: Tested as M2 Q4 ("...the meaning of (Lateral)?", answer: away from the medial plane), mid module BOS 101 module 2.pdf p2 -- 95% of respondents (187/197). Target A.

---

# Item

## id
CON-FND-60953640114635

## label
Free ribosomes make protein the cell keeps; attached ribosomes make protein it exports -- and both together are why cytoplasm is basophilic

## universities
+o6u

## learner_years
+1

## modules
+O6U-IBS-101

## module_subject
O6U-IBS-101 > BOS 101 mid-module exam > Cytology and connective tissue
101 ISK > Histology > Cytology > Cytoplasm

## field_notes
o6u: Tested as M2 Q14 ("rough endoplasmic reticulum is basophilic due to presence of...", answer: ribosomes), mid module BOS 101 module 2.pdf p5 -- 80% of respondents (156/196). Target A.

---
