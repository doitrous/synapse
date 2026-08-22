<!--
  103 BMS · Histology department-bank written questions, from the department's own
  revision set "103 HISTOLOGY ASSESSMENT MSK - Written", manifest src_7272bde5a8d524835d9b,
  41 pages, PDF text layer clean and complete (no visual read needed).

  NOT A SITTING. This is a department question collection carrying no printed exam
  date, batch code or marks — a running set of "Q<n>"-headed model answers spanning
  four chapters (Cartilage, Bone, Skeletal/Cardiac/Smooth Muscle histology, Skin), not
  one paper. Every item's source_citation and author_notes name it explicitly as a
  department-bank item, never as a sitting, per the lane instruction. Marks per part are
  not printed in this source; they are estimated from answer depth, by analogy with the
  marks the department DOES print for the same-topic questions on the 103 BMS EOY 2025
  paper (see written/103-BMS-EOY-2025-histology-written.md) — stated in each item's
  author_notes.

  Filename says "MSK" but the content is not limited to MSK histology; it runs Cartilage
  through Bone, Muscle and Skin as printed.

  29 records, grouped Cartilage (5) > Bone (9) > Muscle (5) > Skin (10). Every
  main_concept is an existing, live-pending concept from concept/103-BMS-histology-concepts.md
  and every library_ids entry an existing article from article/103-BMS-histology.md —
  no new concept or article was minted for this file.

  NOT AUTHORED — genuinely uncovered by any existing concept+article pair, listed under
  MISSING CONCEPT in the lane report:
    - General cardiac muscle fibre histological structure (LM/EM, sarcoplasm inclusions,
      atrial granules) — p23-24. Only its intercalated-disc sub-feature has a concept.
    - Purkinje fibre histological characteristics — p25-26.
    - The three-way skeletal/smooth/cardiac muscle comparison table — p28.
    - Triad tubular system + the steps and before/during-contraction changes of skeletal
      muscle contraction — p21-22. CON-MSK-BD54A250111D42 (T-tubule/triad) and
      CON-MSK-70448A9B07D24A (contraction band changes) exist but neither is covered by
      any article in article/103-BMS-histology.md.

  Status Draft throughout; these need a faculty reviewer. Import: Admin > Bulk import >
  question, after the histology concept and article files.

  Validate with:
    npm run medical:batch -- docs/Kasr-Source-Imports/written/103-BMS-histology-department-written.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md \
      --with docs/Kasr-Source-Imports/article/103-BMS-histology.md
-->

# Item

## id
QW-103-2B5743098D5F

## title
The perichondrium: structure and functions

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the structure and functions of the perichondrium.

## format
structured_written

## written_parts
### (a) 3 marks
Describe the structure and functions of the perichondrium.
Expects: The perichondrium is a capsule-like structure formed of dense irregular fibrous connective tissue that surrounds hyaline cartilage, except at the articular surface of joints
Expects: The outer fibrous layer is dense irregular fibrous connective tissue formed of fibroblasts and type I collagen fibres, rich in blood vessels — the source of blood supply to the cartilage — and nerves
Expects: The inner chondrogenic (cellular) layer contains chondroblasts
Expects: Function: nutrition of the non-vascular cartilage, by diffusion
Expects: Function: formation of new cartilage cells during growth and repair
Expects: Function: provides attachment for muscles
Concept: CON-MSK-FB07A439E2B324

## derived_from


## topic
Cartilage

## subtopic
Perichondrium

## difficulty
Easy

## question_type
Anatomy

## main_concept
CON-MSK-FB07A439E2B324

## module
103 BMS

## module_subject
103 BMS > Histology > Cartilage > Hyaline Cartilage

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.5

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
5

## contextual_concept_ids


## library_ids
ART-103-HIS-CARTILAGE-CELLS

## resource_ids


## learning_objective
State the two layers of the perichondrium and give a function of each, including why articular cartilage alone has none.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p1.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p1 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-EC54E2C8BA14

## title
Cartilage cells: chondroblasts against chondrocytes

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Compare chondroblasts and chondrocytes by origin, site, light-microscopic appearance and function.

## format
comparison_table

## written_parts
### (a) 6 marks
Compare chondroblasts and chondrocytes by origin, site, light-microscopic appearance and function.
Expects: Chondroblasts arise from undifferentiated mesenchymal cells and sit on the surface of the cartilage, at the inner aspect of the perichondrium, in rows parallel to the surface and not in lacunae; they are flat to oval or spindle-shaped with deep basophilic cytoplasm and a single central pale nucleus with a prominent nucleolus, and they can divide
Expects: Chondrocytes arise from chondroblasts and lie inside lacunae surrounded by a dark capsule of matrix; superficial cells are small, oval, single in their lacunae and parallel to the surface, while older, deeper cells are rounded or triangular with pale basophilic cytoplasm rich in fat and glycogen
Expects: Chondrocytes can divide to give cell nests (isogenous groups) of 4 to 8 triangular cells inside one lacuna surrounded by a darkly stained capsule
Expects: Chondroblasts secrete cartilage matrix and collagen type II and change into chondrocytes, and drive appositional growth (new layers added on the surface)
Expects: Chondrocytes maintain the cartilage matrix by continuous secretion of new matrix, and drive interstitial growth (new matrix added from within) by dividing
Concept: CON-MSK-E198B099DCA0C0 | CON-MSK-CB0E0F665E200B

## derived_from


## topic
Cartilage

## subtopic
Cartilage cells

## difficulty
Moderate

## question_type
Classification

## main_concept
CON-MSK-E198B099DCA0C0 | CON-MSK-CB0E0F665E200B

## module
103 BMS

## module_subject
103 BMS > Histology > Cartilage > Hyaline Cartilage

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.7

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## contextual_concept_ids


## library_ids
ART-103-HIS-CARTILAGE-CELLS

## resource_ids


## learning_objective
Distinguish chondroblasts from chondrocytes by site (surface versus lacuna), light-microscopic appearance and the type of growth each drives.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p2.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p2 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-33078B15715A

## title
The three types of cartilage: fibres and ground substance

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Name the three types of cartilage and describe the fibres and ground substance of hyaline cartilage.

## format
structured_written

## written_parts
### (a) 6 marks
Name the three types of cartilage and describe the fibres and ground substance of hyaline cartilage.
Expects: The three types are hyaline cartilage (mainly type II collagen fibres), yellow elastic cartilage (abundant elastic fibres and some type II collagen) and white fibrocartilage (abundant type I and some type II collagen)
Expects: Hyaline cartilage has the typical structure of cartilage, and the other two types are variants of its basic structure
Expects: All types contain collagen type II except white fibrocartilage, which contains collagen type I
Expects: All types are covered by perichondrium except white fibrocartilage, and articular cartilage is also not covered by perichondrium
Expects: The type II collagen fibres cannot be seen by light microscopy — the matrix appears homogeneous and transparent — because the fibres are very thin and have the same refractive index as the ground substance; they become visible surrounding the matrix only after the matrix is digested by enzymes
Expects: The ground substance is produced by chondroblasts and chondrocytes; it is rubbery, homogeneous, transparent and deeply basophilic (sulfated glycosaminoglycans, chondroitin sulphate) and stains metachromatically with some basic stains, and is formed of proteoglycans, glycoproteins and water
Concept: CON-MSK-842FCAD0B94A8F

## derived_from


## topic
Cartilage

## subtopic
Types of cartilage

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-842FCAD0B94A8F

## module
103 BMS

## module_subject
103 BMS > Histology > Cartilage > Cartilage

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-HIS-CARTILAGE-CELLS

## resource_ids


## learning_objective
Name the three cartilage types by their fibre content and explain why the type II collagen of hyaline cartilage is not visible by light microscopy.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p4.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p4 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-CE9208280C5F

## title
Hyaline cartilage sites, and yellow elastic cartilage against white fibrocartilage

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Give the sites of hyaline cartilage, then compare yellow elastic cartilage and white fibrocartilage by structure, sites and function.

## format
comparison_table

## written_parts
### (a) 8 marks
Give the sites of hyaline cartilage, then compare yellow elastic cartilage and white fibrocartilage by structure, sites and function.
Expects: Hyaline cartilage is the most common type; it appears translucent with a glassy, bluish-white appearance. Sites: fetal skeleton, epiphyseal plate, costal cartilage, the articular surface of bones, and the respiratory passages (nose, larynx, trachea and bronchi)
Expects: Yellow elastic cartilage is yellow in the fresh state, opaquer and more flexible; it is covered by perichondrium and has the structure of hyaline cartilage but with large numbers of branching elastic fibres and few collagen (type II) fibres; chondrocytes lie singly or as small cell nests of two. Sites: ear pinna, epiglottis and some laryngeal cartilage, external auditory canal, and the Eustachian tube. It is very flexible and recovers its shape after deformation
Expects: White fibrocartilage appears white in the fresh state and is a tough type important in bone-to-bone attachment, with intermediate character between hyaline cartilage and dense regular white fibrous connective tissue; no perichondrium is present; it is formed of dense type I collagen fibres in parallel thick bundles, with cartilage cells inside lacunae arranged in rows between the collagen bundles and very scanty matrix
Expects: White fibrocartilage sites: intervertebral disc, sternoclavicular joint, mandibular joint, cartilage around the hip (acetabulum) and shoulder (glenoid cavity), semilunar cartilages of the knee joints, and the symphysis pubis
Expects: White fibrocartilage is a strong, tough type that resists great tensile stretch and attaches bone to bone with limited mobility
Concept: CON-MSK-0EA979EBF9D434 | CON-MSK-0F4870E557FAF4

## derived_from


## topic
Cartilage

## subtopic
Hyaline, elastic and fibrocartilage

## difficulty
Moderate

## question_type
Classification

## main_concept
CON-MSK-0EA979EBF9D434 | CON-MSK-0F4870E557FAF4

## module
103 BMS

## module_subject
103 BMS > Histology > Cartilage > Hyaline Cartilage
103 BMS > Histology > Cartilage > Yellow Elastic Cartilage

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.7

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## contextual_concept_ids


## library_ids
ART-103-HIS-CARTILAGE-TYPES

## resource_ids


## learning_objective
List two sites each of hyaline, yellow elastic and white fibrocartilage, and give the structural feature that lets white fibrocartilage resist tensile stretch.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p5.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p5 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-80288F502BE1

## title
The structure of the intervertebral disc

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the structure of the intervertebral disc.

## format
structured_written

## written_parts
### (a) 4 marks
Describe the structure of the intervertebral disc.
Expects: The intervertebral disc lies between the bodies of two adjacent vertebrae
Expects: It is formed of an outer fibrous ring of white fibrocartilage (type I collagen), called the annulus fibrosus
Expects: It has an inner, soft, jelly-like mass containing type II collagen, called the nucleus pulposus
Concept: CON-MSK-9C7E37FE296254

## derived_from


## topic
Cartilage

## subtopic
Intervertebral disc

## difficulty
Moderate

## question_type
Anatomy

## main_concept
CON-MSK-9C7E37FE296254

## module
103 BMS

## module_subject
103 BMS > Histology > Cartilage > Structure of the Intervertebral Disc

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-HIS-CARTILAGE-TYPES

## resource_ids


## learning_objective
Name the two parts of the intervertebral disc, their collagen type, and which one herniates to compress a nerve root.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p7.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p7 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-646DA93F0301

## title
Bone matrix: organic and inorganic composition

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the composition of bone matrix.

## format
structured_written

## written_parts
### (a) 6 marks
Describe the composition of bone matrix.
Expects: Bone matrix is 25% water and 75% hard substances
Expects: The organic part (osteoid tissue, 35%) is made of fibres — mainly type I collagen fibres (90%), arranged as thick bundles and responsible for the pink colour of bone matrix in H&E-stained sections — and ground substance (glycosaminoglycans and glycoprotein)
Expects: The inorganic part (65%) is mainly calcium phosphate carbonate, present on the surface of the collagen bundles and within the ground substance, and causes the hardness of bone
Expects: Bone matrix is arranged as lamellae of calcified collagen bundles embedded in calcified ground substance
Expects: Osteoporosis is a common bone disease of progressive loss of normal bone density that increases fracture risk, caused by increased bone resorption over bone formation (raised osteoclast activity)
Concept: CON-MSK-89674D65B2316B

## derived_from


## topic
Bone

## subtopic
Bone matrix

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-89674D65B2316B

## module
103 BMS

## module_subject
103 BMS > Histology > Bone > Bone Matrix: Ground substance & Fibers

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-HIS-BONE-MATRIX-CLASSIFICATION

## resource_ids


## learning_objective
Give the organic and inorganic percentages of bone matrix, name the dominant fibre and mineral, and state the cause of osteoporosis.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p9.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p9 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-869722D3D5DA

## title
Osteogenic cells against osteoblasts

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Compare osteogenic cells and osteoblasts by origin, site, light and electron microscopy, and function.

## format
comparison_table

## written_parts
### (a) 8 marks
Compare osteogenic cells and osteoblasts by origin, site, light and electron microscopy, and function.
Expects: Osteogenic cells arise from undifferentiated mesenchymal cells and pericytes and sit in the inner osteogenic layer of the periosteum and endosteum; they are flat with flat nuclei and pale basophilic cytoplasm, and by electron microscopy show signs of immature cells with free ribosomes
Expects: Osteogenic cells are stem cells: in areas of high vascularity they divide and give rise to osteoblasts; in areas of poor vasculature they can give rise to chondroblasts; they are numerous in fractures and in young age
Expects: Osteoblasts arise from osteogenic cells and sit immediately under the periosteum and endosteum, not inside lacunae; they are oval with few processes, an eccentric round pale nucleus and deep basophilic cytoplasm with a negative Golgi image, and are rich in alkaline phosphatase; by electron microscopy they show the features of protein-forming cells (abundant ribosomes, rough endoplasmic reticulum, Golgi, secretory vesicles, mitochondria)
Expects: Osteoblasts are bone-forming cells: they secrete the organic part of the matrix, including type I collagen, called osteoid, and release alkaline phosphatase, which calcifies the osteoid (ossification); once surrounded by calcified matrix they differentiate into osteocytes
Concept: CON-MSK-E2291B6BD6BBDF | CON-MSK-D137ADEEC56243

## derived_from


## topic
Bone

## subtopic
bone.cells.osteogenic-osteoblast

## difficulty
Moderate

## question_type
Classification

## main_concept
CON-MSK-D137ADEEC56243 | CON-MSK-E2291B6BD6BBDF

## module
103 BMS

## module_subject
103 BMS > Histology > Bone > Bone Cells

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-HIS-BONE-COVERINGS-CELLS
ART-103-HIS-BONE-CELLS

## resource_ids


## learning_objective
Distinguish the osteogenic cell from the osteoblast by site relative to the periosteum, ultrastructure, and what each becomes.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p10.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p10 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-6F463D2BBA22

## title
Osteocytes against osteoclasts

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Compare osteocytes and osteoclasts by origin, site, light and electron microscopy, and function.

## format
comparison_table

## written_parts
### (a) 8 marks
Compare osteocytes and osteoclasts by origin, site, light and electron microscopy, and function.
Expects: Osteocytes arise from osteoblasts and lie singly in lacunae, connected to one another through canaliculi — important for the exchange of nutrients and waste since the matrix is calcified and no tissue fluid can pass through it; they are oval with a few minute processes and a central, oval, dark nucleus, and by electron microscopy have less rough endoplasmic reticulum and ribosome content than osteoblasts
Expects: Osteocytes are bone-maintaining cells: they form the organic part of the matrix and calcify it by continuous deposition of calcium salts; healthy osteocytes are important for the viability of the matrix
Expects: Osteoclasts arise by fusion of blood monocytes and sit on bone surfaces near the bone marrow, within a cavity called Howship's lacuna; they are large, irregular, motile, multinucleated cells (6 to 12 nuclei) with a brush border facing the bony surface and foamy acidophilic cytoplasm
Expects: By electron microscopy osteoclasts show four zones: a ruffled border of irregular projections and microvilli, a clear zone of actin, a vesicular zone of lysosomes, and a basal zone with multiple nuclei and organelles
Expects: Osteoclasts resorb bone in two steps: carbonic anhydrase releases H+ through the ruffled border, acidifying and dissolving calcium salts, and lysosomal (osteolytic) enzymes digest the organic part of the matrix; they are also responsible for bone remodelling
Concept: CON-MSK-6C87364F2CE942 | CON-MSK-CAFCD73A40E6DC

## derived_from


## topic
Bone

## subtopic
bone.cells.osteocyte-osteoclast

## difficulty
Moderate

## question_type
Classification

## main_concept
CON-MSK-6C87364F2CE942 | CON-MSK-CAFCD73A40E6DC

## module
103 BMS

## module_subject
103 BMS > Histology > Bone > Bone Cells

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-HIS-BONE-COVERINGS-CELLS
ART-103-HIS-BONE-MATRIX-CLASSIFICATION

## resource_ids


## learning_objective
Distinguish the osteocyte from the osteoclast by origin (osteoblast versus monocyte fusion), site (lacuna versus Howship lacuna) and function.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p11.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p11 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-AB0E6BA73B5C

## title
Periosteum and endosteum

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the structure and functions of the periosteum and the endosteum.

## format
structured_written

## written_parts
### (a) 6 marks
Describe the structure and functions of the periosteum and the endosteum.
Expects: The periosteum is the layer covering the outer surface of bone. It has two layers: an outer fibrous layer of dense type I collagen, fibroblasts and blood capillaries, and an inner osteogenic layer of osteogenic cells, which thickens greatly during growth and fracture as osteogenic cells multiply and differentiate into osteoblasts
Expects: Functions of the periosteum: protection of bone (its collagen), attachment for muscles and tendons, nutrition of the bone (its blood capillaries), and appositional bone growth as osteogenic cells differentiate to osteoblasts, which form bone matrix and become osteocytes
Expects: The endosteum is a delicate, vascular connective-tissue layer lining the marrow cavity, containing a single layer of osteogenic cells
Expects: Functions of the endosteum: protection of the bone surface, and bone growth by adding bone from inside
Concept: CON-MSK-295AEB5D72F8D0

## derived_from


## topic
Bone

## subtopic
Bone coverings

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-295AEB5D72F8D0

## module
103 BMS

## module_subject
103 BMS > Histology > Bone > Bone Coverings (Periosteum & Endosteum)

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-HIS-BONE-COVERINGS-CELLS

## resource_ids


## learning_objective
State the two layers of the periosteum, and give one function each of the periosteum and the endosteum.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p12.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p12 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-D1F4104B66C0

## title
General components of compact bone

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
List the components of compact bone and describe the Haversian system.

## format
structured_written

## written_parts
### (a) 6 marks
List the components of compact bone and describe the Haversian system.
Expects: Compact bone is found in the shaft of long bones and as the covering plate over the surface of spongy bone
Expects: It is formed of the periosteum (covering the outer surface), the external circumferential lamellae (under the periosteum, formed of osteocytes in lamellae parallel to the bone surface), the Haversian systems (osteons), the interstitial lamellae (irregularly arranged lamellae and osteocytes between Haversian systems), the internal circumferential lamellae (parallel to the inner circumference, surrounding the marrow cavity), and the endosteum (lining the marrow cavity)
Expects: Each Haversian system (osteon) is a cylindrical structure running longitudinally parallel to the long axis of the bone, formed of a central Haversian canal — carrying blood vessels, lymphatics and nerves — surrounded by 5 to 20 concentrically arranged circular bony lamellae with osteocytes in lacunae between them
Expects: Volkmann's canals are transverse or oblique canals that connect the Haversian canals to each other and to the periosteum or the bone marrow cavity
Concept: CON-MSK-A67054CAEEE89E

## derived_from


## topic
Bone

## subtopic
Compact bone

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-A67054CAEEE89E

## module
103 BMS

## module_subject
103 BMS > Histology > Bone > Compact Bone

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.7

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## contextual_concept_ids


## library_ids
ART-103-HIS-COMPACT-SPONGY-BONE

## resource_ids


## learning_objective
Name the six components of compact bone in order from outside in, and describe what a Haversian canal contains and how Volkmann canals connect Haversian systems.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p13.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p13 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-0DF7E1224C31

## title
General components of cancellous (spongy) bone

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the sites and structure of cancellous (spongy) bone.

## format
structured_written

## written_parts
### (a) 5 marks
Describe the sites and structure of cancellous (spongy) bone.
Expects: Cancellous (spongy) bone is found in the centre of flat, short and irregular bones, and at the epiphyses of long bones
Expects: It is formed of irregular, branching bony trabeculae enclosing irregular bone marrow cavities between them
Expects: Each trabeculum is formed of irregularly arranged bony lamellae and osteocytes, with no Haversian system
Expects: The bone surface is covered by periosteum, and the marrow cavities are lined by endosteum
Concept: CON-MSK-0403FC429F118B

## derived_from


## topic
Bone

## subtopic
Spongy bone

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-0403FC429F118B

## module
103 BMS

## module_subject
103 BMS > Histology > Bone > Cancellous (Spongy) Bone

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-HIS-COMPACT-SPONGY-BONE

## resource_ids


## learning_objective
State two sites of cancellous bone and the structural feature that distinguishes it from compact bone.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p14.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p14 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-0CF733E1ED15

## title
Postnatal growth of long bones: the epiphyseal cartilage zones

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the changes at the epiphyseal cartilage during the postnatal growth of long bones.

## format
structured_written

## written_parts
### (a) 8 marks
Describe the changes at the epiphyseal cartilage during the postnatal growth of long bones.
Expects: Zone of resting hyaline cartilage: formed of cartilage cells
Expects: Proliferative zone: cartilage cells increase in number and become arranged in parallel rows
Expects: Zone of hypertrophy: cells increase in size from accumulation of glycogen and alkaline phosphatase
Expects: Zone of calcification: chondrocytes deposit calcium in the surrounding matrix and under the periosteum, so the cartilage cells die, leaving empty spaces
Expects: Zone of invasion: a vascular bud of blood capillaries and undifferentiated mesenchymal cells enters through holes formed by osteoclasts in the periosteal collar
Expects: Zone of ossification: mesenchymal cells and pericytes change into osteogenic cells, which differentiate to osteoblasts that deposit matrix and form irregular trabeculae of spongy bone
Expects: Remodelling stage: the cancellous bone is gradually transformed to compact bone, by resorption from certain areas by osteoclasts and deposition of new bone in other areas by osteoblasts, resulting in a single bone marrow cavity
Expects: Stage of compact bone formation: the Haversian system develops and there is only one central bone marrow cavity
Concept: CON-MSK-EBA37D8401180C

## derived_from


## topic
Bone

## subtopic
Postnatal bone growth

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-EBA37D8401180C

## module
103 BMS

## module_subject
103 BMS > Histology > Bone > Intracartilagenous Ossification

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-HIS-BONE-OSSIFICATION

## resource_ids


## learning_objective
List the eight zones of postnatal long-bone growth at the epiphyseal cartilage, in order from resting cartilage to compact bone.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p15.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p15 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-D520BD4D1D69

## title
Intramembranous ossification

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the steps of intramembranous ossification.

## format
structured_written

## written_parts
### (a) 6 marks
Describe the steps of intramembranous ossification.
Expects: Intramembranous ossification starts in a membrane of connective tissue and ends by forming spongy bone; it occurs in flat bones
Expects: Undifferentiated mesenchymal cells condense in the central vascular part, rich in blood capillaries — the ossification centre
Expects: Mesenchymal cells change into osteogenic cells that differentiate into osteoblasts, which form bone matrix and become imprisoned, changing to osteocytes
Expects: Numerous ossification centres form and join together to form spongy bone
Expects: The spaces between trabeculae are occupied by blood vessels and mesenchymal cells, which form bone marrow cells
Expects: At either side, bone remodelling forms compact bone, around which the periosteum then develops
Concept: CON-MSK-C2EFE3D04B945A

## derived_from


## topic
Bone

## subtopic
Intramembranous ossification

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-C2EFE3D04B945A

## module
103 BMS

## module_subject
103 BMS > Histology > Bone > Intramembranous Ossification

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.7

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## contextual_concept_ids


## library_ids
ART-103-HIS-BONE-OSSIFICATION

## resource_ids


## learning_objective
List the steps of intramembranous ossification, from mesenchymal condensation to compact bone, and name a bone type it forms.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p16.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p16 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-59AB3E70339E

## title
Intracartilaginous ossification: the primary centre

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the primary ossification centre in intracartilaginous ossification.

## format
structured_written

## written_parts
### (a) 7 marks
Describe the primary ossification centre in intracartilaginous ossification.
Expects: Intracartilaginous ossification is the replacement of a cartilage model by compact or spongy bone; it occurs in long, short and irregular bones
Expects: The primary ossification centre forms in the middle of the diaphysis of the cartilage model: increased vascularity of the perichondrium turns chondrogenic cells into osteogenic cells, which differentiate into osteoblasts, so the perichondrium changes to periosteum
Expects: Osteoblasts form a layer of bone around the cartilage model, under the periosteum, called the periosteal bone collar
Expects: Chondrocytes in the centre of the cartilage model increase in size and deposit calcium; calcification of the cartilage matrix kills the chondrocytes, leaving irregular cavities
Expects: Osteoclasts form holes in the bone collar so a vascular core of mesenchymal cells and blood vessels invades the irregular cavities within the model, and the surrounding mesenchymal cells differentiate into osteoblasts that deposit spongy bone
Expects: Osteoclasts change the irregular bone marrow cavities into one regular cavity, and the bony lamellae become regularly and concentrically arranged, forming the Haversian system and compact bone
Concept: CON-MSK-745C364E5BDA5D

## derived_from


## topic
Bone

## subtopic
Intracartilaginous ossification

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-745C364E5BDA5D

## module
103 BMS

## module_subject
103 BMS > Histology > Bone > Intracartilagenous Ossification

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.7

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## contextual_concept_ids


## library_ids
ART-103-HIS-BONE-OSSIFICATION

## resource_ids


## learning_objective
Describe how the primary ossification centre converts the cartilage model into a periosteal bone collar, then spongy and compact bone.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p17.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p17 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-641BBCD7928A

## title
The histological structure of the skeletal muscle fibre

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the light- and electron-microscopic structure of the skeletal muscle fibre.

## format
structured_written

## written_parts
### (a) 6 marks
Describe the light- and electron-microscopic structure of the skeletal muscle fibre.
Expects: By light microscopy each skeletal muscle fibre is a long cell: the sarcolemma is thick from fusion with the surrounding basal lamina and endomysium
Expects: The nuclei are multiple, oval and peripheral, their number corresponding to the number of fused mononucleated myoblasts
Expects: The sarcoplasm is deeply acidophilic, containing mitochondria, smooth endoplasmic reticulum and myofibrils, with uniformly placed transverse striations that appear clearly in longitudinal section
Expects: By electron microscopy the fibre shows myofibrils, a T-tubular system, sarcoplasmic reticulum, and sarcoplasm
Concept: CON-MSK-2493DDAE4798CE

## derived_from


## topic
Muscle

## subtopic
Skeletal muscle fibre

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-2493DDAE4798CE

## module
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Skeletal Muscle

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## resource_ids


## learning_objective
List the LM features of a skeletal muscle fibre (sarcolemma, nuclei, sarcoplasm) and the four components seen by EM.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p19.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p19 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-A97C00CB5B34

## title
Myofibrils, the sarcomere, and the band pattern

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Define the sarcomere and describe the bands of the myofibril and the accessory proteins of the Z line.

## format
structured_written

## written_parts
### (a) 8 marks
Define the sarcomere and describe the bands of the myofibril and the accessory proteins of the Z line.
Expects: A sarcomere is the portion of a myofibril between two adjacent Z lines; it is the basic contractile unit of striated muscle and the functional unit of contraction
Expects: Each myofibril shows alternating dark A bands and light I bands, which explain the transverse striations and give the term striated muscle
Expects: The thick myosin filaments are restricted to the A band; the I band appears light, formed only of actin, and is bisected by the Z line; the A band appears dark, formed of both myosin and actin, and is bisected by the H zone, which appears paler, formed only of myosin filaments, and is bisected by the M line, produced by interconnections of adjacent myosin filaments
Expects: The Z line is dense from condensed actin filaments, matrix material and accessory proteins that keep the thick and thin filaments precisely aligned: titin anchors the thick myosin filaments to the Z lines, preventing excessive stretching of the sarcomere, and dystrophin, a large protein, links the external lamina of the muscle cell to the actin filaments — its absence causes progressive muscular weakness (muscular dystrophy)
Concept: CON-MSK-0824FE988ADA00 | CON-MSK-E36936D62038BF

## derived_from


## topic
Muscle

## subtopic
Sarcomere and band pattern

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-0824FE988ADA00 | CON-MSK-E36936D62038BF

## module
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Skeletal Muscle

## clinical_relevance
0.4

## academic_relevance
0.95

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.8

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
8

## contextual_concept_ids


## library_ids
ART-103-HIS-SKELETAL-MUSCLE-STRUCTURE

## resource_ids


## learning_objective
Define a sarcomere by its Z-line boundaries, name the five sarcomere bands/lines with their filament content, and state which Z-line protein's loss causes muscular dystrophy.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p20.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p20 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-432F9D46F472

## title
Red fibres against white fibres

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Compare red and white skeletal muscle fibres by colour, site, myoglobin, mitochondria, vascularity, glycogen, size, contraction and energy source.

## format
comparison_table

## written_parts
### (a) 8 marks
Compare red and white skeletal muscle fibres by colour, site, myoglobin, mitochondria, vascularity, glycogen, size, contraction and energy source.
Expects: Colour and site: red (dark) fibres predominate in muscles such as the long back muscles (adapted to erect posture), muscles of great-endurance athletes and the chest muscles of flying birds; white (pale) fibres predominate in muscles such as the extraocular muscles and short-distance sprinter muscles
Expects: Red fibres are rich in myoglobin with large, numerous mitochondria, rich capillary supply and less glycogen; white fibres are poor in myoglobin with fewer, less numerous mitochondria, poorer vascularity and more glycogen
Expects: Red fibres are small, contract slowly with prolonged, maintained contraction and are highly resistant to fatigue, using aerobic respiration; white fibres are large, contract rapidly for short periods and fatigue easily, using anaerobic respiration
Expects: Intermediate fibres have characteristics between red and white fibres
Expects: With ageing, muscle mass falls, fast fibres are lost, and there is a relative rise in the proportion of slow fibres
Concept: CON-MSK-3FC22F6080FD06

## derived_from


## topic
Muscle

## subtopic
Muscle fibre types

## difficulty
Moderate

## question_type
Classification

## main_concept
CON-MSK-3FC22F6080FD06

## module
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Skeletal Muscle

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.7

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## contextual_concept_ids


## library_ids
ART-103-HIS-SKELETAL-MUSCLE-FIBRE-TYPES-CLINICAL

## resource_ids


## learning_objective
Compare red and white skeletal muscle fibres by myoglobin content, mitochondrial number, fatigue resistance and typical site.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p23.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p23 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-0543CC19D538

## title
The intercalated disc

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Define the intercalated disc and describe its ultrastructure and the cell junctions it carries.

## format
structured_written

## written_parts
### (a) 6 marks
Define the intercalated disc and describe its ultrastructure and the cell junctions it carries.
Expects: The intercalated disc is the site of junctions between the sarcolemma of adjacent cardiac myocytes, forming the cardiac muscle fibre
Expects: By light microscopy it is seen as densely stained transverse clear lines along the length of cardiac myofibres
Expects: By electron microscopy it has a stairway shape, with a transverse component at right angles to the fibres (like the risers of a stairway) and a lateral component parallel to the myofibres (like the steps)
Expects: Desmosomes and adherent junctions (fascia adherens) sit in the transverse region and bind the cardiac myocytes firmly together, preventing their separation during repetitive contractions
Expects: Gap junctions sit in the lateral segment and allow the contraction signal to pass from one cell to the next
Concept: CON-MSK-0DEAF126DF8F2E

## derived_from


## topic
Muscle

## subtopic
Cardiac muscle

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-0DEAF126DF8F2E

## module
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Cardiac Muscle

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-HIS-CARDIAC-INTERCALATED-DISC

## resource_ids


## learning_objective
Describe the two components of the intercalated disc by orientation and name the junction type each carries.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p25.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p25 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-4E13E4D2AB66

## title
Smooth muscle: light- and electron-microscopic structure

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the light- and electron-microscopic structure of smooth muscle.

## format
structured_written

## written_parts
### (a) 6 marks
Describe the light- and electron-microscopic structure of smooth muscle.
Expects: By light microscopy the sarcolemma is thin, surrounded by a basal lamina; the nucleus is single, oval and central, becoming corkscrew-shaped during contraction; the sarcoplasm is acidophilic
Expects: By electron microscopy the thick myosin and thin actin filaments are irregularly arranged, so no striations appear; actin filaments insert into sarcoplasmic and sarcolemma-associated dense bodies (corresponding to the Z line of striated muscle) and interact with myosin filaments, and abundant intermediate desmin filaments also insert into the dense bodies, so contractile force transmits to adjacent smooth muscle cells
Expects: There is no T-tubule system; instead, invaginations along the cell surface called caveolae control calcium release and contraction
Expects: The sarcoplasmic reticulum is less developed than in skeletal muscle; sarcoplasmic organelles are concentrated in the perinuclear region and include numerous mitochondria, sarcoplasmic reticulum, free ribosomes and a small Golgi apparatus, with glycogen granule inclusions
Concept: CON-MSK-888DFA3AA4E974

## derived_from


## topic
Muscle

## subtopic
Smooth muscle

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-MSK-888DFA3AA4E974

## module
103 BMS

## module_subject
103 BMS > Histology > Muscle Tissue > Smooth Muscle

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-HIS-SMOOTH-MUSCLE

## resource_ids


## learning_objective
Name the structure smooth muscle uses instead of Z lines and instead of T-tubules, and state what each does.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p26.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p26 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-52DA95BB8665

## title
The four cell types of the epidermis

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Name the four cell types of the epidermis and give a brief description of each.

## format
structured_written

## written_parts
### (a) 4 marks
Name the four cell types of the epidermis and give a brief description of each.
Expects: Keratinocytes form about 85% of epidermal cells; they are derived from ectoderm, form the five epidermal layers, are continually shed at the top layer, and deeper layers divide, differentiate and accumulate keratin filaments as they progress upwards
Expects: Melanocytes are melanin-forming cells
Expects: Langerhans cells act as antigen-presenting cells
Expects: Merkel's cells are sensory receptor cells
Concept: CON-DER-B60DAF01451E85

## derived_from


## topic
Skin

## subtopic
Epidermis overview

## difficulty
Easy

## question_type
Classification

## main_concept
CON-DER-B60DAF01451E85

## module
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > The Epidermis

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-HIS-EPIDERMIS-LAYERS

## resource_ids


## learning_objective
Name the four epidermal cell types and state which one makes up about 85% of the total.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p30.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p30 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-2E5E0A0DE606

## title
The Malpighian layer: stratum basale and stratum spinosum

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the light- and electron-microscopic structure of the stratum basale and the stratum spinosum, and state what forms the Malpighian layer.

## format
structured_written

## written_parts
### (a) 8 marks
Describe the light- and electron-microscopic structure of the stratum basale and the stratum spinosum, and state what forms the Malpighian layer.
Expects: The Malpighian layer consists mainly of the cells of the stratum basale and the stratum spinosum, which show active mitotic division
Expects: The stratum basale is a single layer of columnar cells resting on a clear wavy basement membrane, with oval basal nuclei and basophilic cytoplasm; its nuclei show mitotic figures, as these cells are responsible for regenerating the epidermis, renewed every 2 to 4 weeks; melanocytes and Merkel's cells are found in this layer
Expects: By electron microscopy stratum basale cells are attached to each other and to the prickle-cell layer by desmosomes, and to the basement membrane by hemidesmosomes; they are rich in free ribosomes and polysomes and show keratin intermediate filaments about 10 nm in diameter, ending in desmosomes
Expects: The stratum spinosum has multiple layers of polyhedral cells with single, central, rounded nuclei and basophilic cytoplasm; cell borders appear separated by small spaces traversed by fine spine-like processes, giving the prickly appearance (the spaces are shrinkage artefacts, and the spines mark desmosomes); Langerhans cells are present in this layer
Expects: By electron microscopy the stratum spinosum's cytoplasm shows bundles of tonofilaments condensed around spot desmosomes, which accounts for the spinous appearance seen by light microscopy
Concept: CON-DER-743AA0CD69B8A4 | CON-DER-1138A6D64D53B3

## derived_from


## topic
Skin

## subtopic
Malpighian layer

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-DER-743AA0CD69B8A4 | CON-DER-1138A6D64D53B3

## module
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > The Epidermis

## clinical_relevance
0.4

## academic_relevance
0.95

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.8

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
8

## contextual_concept_ids


## library_ids
ART-103-HIS-EPIDERMIS-LAYERS

## resource_ids


## learning_objective
Name the two layers that make up the Malpighian layer, state which non-keratinocyte cells each carries, and give the LM feature that explains the prickly look of the stratum spinosum.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p31.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p31 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-2F9804BB79FF

## title
The stratum granulosum

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the stratum granulosum and its two types of granule.

## format
structured_written

## written_parts
### (a) 5 marks
Describe the stratum granulosum and its two types of granule.
Expects: The stratum granulosum (granular layer) consists of 3 to 5 layers of flattened cells with flat nuclei; the cytoplasm is deeply basophilic and granular
Expects: Keratohyaline granules are irregular, large bodies, not surrounded by membranes; they contain proteins rich in phosphate groups (filaggrin and trichohyalin) that account for the intense basophilia seen by light microscopy and that promote the aggregation of keratin filaments — keratinisation
Expects: Lamellar granules are membrane-bound granules containing lamellar discs of lipids; they are exocytosed into the intercellular space, forming lipid-rich sheets around the keratinocytes that provide the epidermal water barrier and, together with keratin, a barrier against penetration by foreign materials
Concept: CON-DER-867BD073CDD6D5

## derived_from


## topic
Skin

## subtopic
Stratum granulosum

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-DER-867BD073CDD6D5

## module
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > The Epidermis

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-HIS-EPIDERMIS-LAYERS

## resource_ids


## learning_objective
Name the two granule types of the stratum granulosum and state what each does — keratinisation, or the water barrier.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p32.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p32 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-FDD64E01FF26

## title
Melanocytes

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the origin, site, light- and electron-microscopic features and function of melanocytes.

## format
structured_written

## written_parts
### (a) 6 marks
Describe the origin, site, light- and electron-microscopic features and function of melanocytes.
Expects: Melanocytes originate from neural crest cells (ectoderm) and sit between the cells of the stratum basale
Expects: By light microscopy they are large, branched cells with rounded cell bodies from which long, irregular cytoplasmic processes extend between the keratinocytes of the stratum basale and stratum spinosum; the nucleus is central, rounded and pale; H&E-stained skin sections do not demonstrate melanocytes
Expects: By electron microscopy they show the features of active protein-synthesising cells (abundant rough endoplasmic reticulum, prominent Golgi, mitochondria), granules called melanosomes, and euchromatin with a prominent nucleolus; there are no desmosomes between melanocytes and keratinocytes, but hemidesmosomes bind melanocytes to the basal lamina
Expects: Function: melanocytes form melanin pigment, synthesising the enzyme tyrosinase, essential for melanin synthesis; ultraviolet light speeds tyrosinase synthesis, increasing melanin production
Concept: CON-DER-71C980D8864B73

## derived_from


## topic
Skin

## subtopic
Melanocytes

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-DER-71C980D8864B73

## module
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > The Epidermis

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.7

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## contextual_concept_ids


## library_ids
ART-103-HIS-EPIDERMIS-NON-KERATINOCYTES

## resource_ids


## learning_objective
State the origin and site of melanocytes, the enzyme responsible for melanin synthesis, and why H&E does not show them.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p33.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p33 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-E370FBF4AC23

## title
Langerhans cells

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the origin, light- and electron-microscopic features and function of Langerhans cells.

## format
structured_written

## written_parts
### (a) 6 marks
Describe the origin, light- and electron-microscopic features and function of Langerhans cells.
Expects: Langerhans cells originate in the bone marrow, migrate via the blood to the dermis, then the epidermis, and represent 3 to 8% of epidermal cells
Expects: By light microscopy they are stellate-shaped cells found between the cells of the stratum spinosum; in H&E sections they appear with a dark nucleus and pale, clear cytoplasm, and can be identified using vital stains
Expects: By electron microscopy the cytoplasm is of low density and contains a prominent Golgi complex, lysosomes, and special tennis-racquet-shaped granules (Birbeck granules); the nucleus is highly irregular, and desmosomes, keratin filaments and melanin granules are all absent
Expects: Function: Langerhans cells protect the skin as antigen-presenting cells, giving them a significant role in skin immunological reactions such as allergic dermatitis
Concept: CON-DER-0A867D7DC2BEFC

## derived_from


## topic
Skin

## subtopic
Langerhans cells

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-DER-0A867D7DC2BEFC

## module
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > The Epidermis

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-HIS-EPIDERMIS-NON-KERATINOCYTES

## resource_ids


## learning_objective
Give the origin of Langerhans cells, the layer they occupy, their diagnostic EM granule, and their immunological function.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p34.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p34 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-C81237AB1B2D

## title
Merkel's cells

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the origin, site, light- and electron-microscopic features and function of Merkel's cells.

## format
structured_written

## written_parts
### (a) 5 marks
Describe the origin, site, light- and electron-microscopic features and function of Merkel's cells.
Expects: Merkel's cells are ectodermal in origin — modified epithelial cells
Expects: By light microscopy they resemble epidermal cells, present in the basal cell layer, abundant in highly sensitive skin such as the fingertips and at the bases of some hair follicles; naked sensory nerve fibres traverse the basal lamina and terminate as disc-shaped expansions beneath the cell, forming the Merkel cell-neurite complex
Expects: By electron microscopy they are attached to epidermal cells by desmosomes, the nucleus shows deep invaginations, and the cytoplasm contains electron-dense granules resembling those of neuroendocrine (APUD) cells
Expects: Function: Merkel's cells are modified sensory receptor cells, regarded as mechanoreceptors for touch, and they have a neurosecretory function through their granules
Concept: CON-DER-34D2463B0EAFFE

## derived_from


## topic
Skin

## subtopic
Merkel's cells

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-DER-34D2463B0EAFFE

## module
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > The Epidermis

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-HIS-EPIDERMIS-NON-KERATINOCYTES

## resource_ids


## learning_objective
Name the structure formed by a sensory nerve fibre and a Merkel cell, and state Merkel cell's two functions.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p35.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p35 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-7E8716DE19CA

## title
The papillary layer against the reticular layer of the dermis, and what fixes epidermis to dermis

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Compare the papillary and reticular layers of the dermis, and state the factors that fix the epidermis to the dermis.

## format
comparison_table

## written_parts
### (a) 6 marks
Compare the papillary and reticular layers of the dermis, and state the factors that fix the epidermis to the dermis.
Expects: The papillary layer is the thinner, superficial layer, forming the dermal papillae; it consists of loose connective tissue with type III collagen and elastic fibres, is more cellular (fibroblasts and other connective-tissue cells) and is very rich in blood capillaries that nourish the avascular epidermis; it contains Meissner's tactile corpuscles for touch
Expects: The reticular layer is the thicker, deeper layer of dense connective tissue with thick bundles of type I collagen and thick bundles of elastic fibres; it is more fibrous, less cellular, and less vascular than the papillary layer, and contains nerve receptors such as Pacinian corpuscles, Ruffini's end organs and Krause's end bulbs
Expects: The epidermis is fixed to the dermis by the basement membrane of the epidermis and by hemidesmosomes between the basal epidermal cells and the basement membrane
Concept: CON-DER-56784AB396C13E | CON-DER-0CE4E701A394EC

## derived_from


## topic
Skin

## subtopic
Papillary and reticular layers

## difficulty
Moderate

## question_type
Classification

## main_concept
CON-DER-56784AB396C13E

## module
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > The Dermis

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.7

## question_only_for


## concept_ids
CON-DER-0CE4E701A394EC

## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## contextual_concept_ids


## library_ids
ART-103-HIS-DERMIS-LAYERS
ART-103-HIS-SKIN-THICK-THIN-JUNCTION

## resource_ids


## learning_objective
Compare the papillary and reticular dermal layers by vascularity and sensory receptor, and name the two structures fixing epidermis to dermis.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p36.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p36 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-0B39E75651DB

## title
Eccrine and apocrine sweat glands

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Compare the eccrine and apocrine sweat glands by site, histological structure, mechanism and function.

## format
comparison_table

## written_parts
### (a) 8 marks
Compare the eccrine and apocrine sweat glands by site, histological structure, mechanism and function.
Expects: Sweat glands are simple coiled tubular glands present deep in the dermis all over the body except a few sites (lips, nail beds, glans penis)
Expects: Eccrine sweat glands: sited all over the body except the glans penis and nail beds, most numerous and more frequent in thick skin; the secretory part is small, with a narrow lumen, formed of pale cells (broad base, narrow apex, glycogen-containing cytoplasm, secreting a watery electrolyte-rich fluid), dark cells (narrow base, expanded apex, secreting mucous-rich glycoprotein) and myoepithelial cells; the excretory duct is lined by two layers of small cuboidal cells; nerve supply is cholinergic; the secretion is a clear, watery fluid of low protein content whose main function is body-temperature regulation
Expects: Apocrine sweat glands: less numerous, present in the axilla, pubic region, groin and areola, and not present in thick skin; the secretory part is larger with a wider lumen, formed of simple cuboidal cells with eosinophilic cytoplasm that discharge apical granules by exocytosis, plus myoepithelial cells; the duct has a spiral course in the dermis and opens into hair follicles, lined by two layers of cuboidal cells; secretion is by exocytosis (merocrine), nerve supply is adrenergic, and secretion starts at puberty as a viscous, initially odourless fluid that becomes offensive through bacterial action
Concept: CON-DER-9D049A8C76F844

## derived_from


## topic
Skin

## subtopic
Sweat glands

## difficulty
Moderate

## question_type
Classification

## main_concept
CON-DER-9D049A8C76F844

## module
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > Sweat Glands

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids
CON-DER-F4F6AA9BEAB1B6
CON-DER-6C82312DEBED0A
CON-DER-8F25CCE084AF16
CON-DER-D09D3742DF2B67

## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-HIS-SWEAT-GLANDS

## resource_ids


## learning_objective
Compare eccrine and apocrine sweat glands by site, nerve supply and secretion, and state which one is not present in thick skin.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p37.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p37 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-F7E8A80562F4

## title
Sebaceous glands

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Describe the site, structure, mode of secretion and function of the sebaceous gland.

## format
structured_written

## written_parts
### (a) 6 marks
Describe the site, structure, mode of secretion and function of the sebaceous gland.
Expects: The sebaceous gland is a simple branched alveolar gland of the holocrine type; it develops from the upper third of the hair follicle, as an outgrowth of the outer root sheath, and its duct opens into the upper third of the follicle
Expects: Site: dermis of thin skin, usually associated with hairs, rarely without hairs (eyelids)
Expects: The secretory part is formed of alveoli lined by basal flattened germinal cells (which produce large polyhedral cells by mitosis) and large polyhedral vacuolated cells (which gradually fill with lipids)
Expects: Secretion is holocrine: the whole cell is shed by apoptosis, and both the secretory product and the cell debris are discharged through the short ducts
Expects: The excretory duct is short and wide, opening into the upper third of the hair follicle, lined by stratified squamous epithelium
Expects: Function: secretes sebum, keeping thin skin and its hairs soft (preventing cracking), and it is antifungal and antibacterial
Concept: CON-DER-406696F770DA63

## derived_from


## topic
Skin

## subtopic
Sebaceous glands

## difficulty
Moderate

## question_type
Mechanism

## main_concept
CON-DER-406696F770DA63

## module
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > Sebaceous Glands

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.6

## question_only_for


## concept_ids


## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## contextual_concept_ids


## library_ids
ART-103-HIS-SEBACEOUS-GLANDS

## resource_ids


## learning_objective
State where the sebaceous gland develops from, its mode of secretion, and two functions of sebum.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p39.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p39 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no

---

# Item

## id
QW-103-5DF8FFFC82C1

## title
Thick skin against thin skin

## subject
msk

## status
Draft

## owner
Claude

## vignette


## question
Compare thick skin and thin skin by site, epidermal thickness, epidermal layers, and dermal appendages.

## format
comparison_table

## written_parts
### (a) 6 marks
Compare thick skin and thin skin by site, epidermal thickness, epidermal layers, and dermal appendages.
Expects: Thick skin covers the palms of the hands and soles of the feet; thin skin covers the rest of the body
Expects: The epidermis of thick skin is thick (400 to 600 micrometres); the epidermis of thin skin is thin (75 to 150 micrometres)
Expects: In thick skin the Malpighian layer is thicker, the stratum granulosum is thick (3 to 5 layers), the stratum lucidum is present, and the stratum corneum is very thick; in thin skin the Malpighian layer is thinner, the stratum granulosum is one layer, the stratum lucidum is absent, and the stratum corneum is very thin
Expects: The dermal papillae of thick skin are numerous, large and regular; those of thin skin are few, small and irregular
Expects: Sweat glands are more numerous (merocrine) in thick skin and fewer (merocrine and apocrine) in thin skin; sebaceous glands, hair follicles and the arrector pili muscle are absent in thick skin and present in thin skin
Concept: CON-DER-ACDEAF318B290B

## derived_from


## topic
Skin

## subtopic
Thick skin and thin skin

## difficulty
Moderate

## question_type
Classification

## main_concept
CON-DER-ACDEAF318B290B

## module
103 BMS

## module_subject
103 BMS > Histology > Integumentary System > Thin (Hairy) Skin

## clinical_relevance
0.4

## academic_relevance
0.9

## cognitive_effort_score
0.5

## exam_weight_by_year
KAU_Y1=0.7

## question_only_for


## concept_ids
CON-DER-AB2A559A79ACB3

## years
KAU_Y1

## universities
kau

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
7

## contextual_concept_ids


## library_ids
ART-103-HIS-SKIN-THICK-THIN-JUNCTION

## resource_ids


## learning_objective
State which of the stratum lucidum, sebaceous glands and hair follicles are present in thick skin, and give the epidermal thickness range of each skin type.

## media_recommendations


## source_citation
103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set), manifest src_7272bde5a8d524835d9b, p40.

## attachments


## attached_image


## author_notes
From the department's own Histology revision set (not a sitting; a printed page range, not an exam paper). 103 HISTOLOGY ASSESSMENT MSK - Written (Kasr Al Ainy Histology department revision set) groups this content under its own printed heading; the model answer on p40 is transcribed as the Expects list.

## estimated_seconds
240

## randomise_answers
no
