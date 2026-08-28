<!--
  14 MCQs whose main_concept is one of the 6 ids held in
  pending-live/AU-MED-105-histology.md (Kasr Year 1's unimported batches).

  Validate with:
    npm run medical:batch -- docs/Alexandria-Source-Imports/pending-live/AU-MED-105-histology-questions.md \
      --with docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
      --with docs/Kasr-Source-Imports/concept/101-ISK-practical-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md \
      --with docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md \
      --with docs/Alexandria-Source-Imports/article/AU-MED-105-histology-articles.md \
      --with docs/Alexandria-Source-Imports/evidence/AU-MED-105-histology-sources.md

  That run reports "main concept ... is not covered by any article in
  library_ids" for all 14 items — expected, not a defect. LANE-BRIEF.md §22:
  a Kasr concept is covered only when a VERIFIED article names it in
  related_concepts; none of these six ids' Kasr-side coverage has been
  verified here (Kasr Y1's own verification pass is in progress, per the
  chief of staff). Proven instead by medical:simulate, which does not apply
  that stricter batch-only check and reports created:14, updated:0, errors:0
  when the four Kasr concept files above and this lane's own article file
  are passed as plain arguments alongside this file.

  Do not apply this file until every id it depends on (named in
  pending-live/AU-MED-105-histology.md and pending-live/INDEX.md) is live,
  AND its owning Kasr article's coverage of that id has been verified.
-->

# Item

## id
QST-MSK-AU105-HIST-01

## title
Regarding the opposite photomicrograph, which statement correctly matches this type of cartilage with its site?

## question
Regarding the opposite photomicrograph, which statement correctly matches this type of cartilage with its site?

## subject
msk

## status
Draft

## owner
Admin team

## vignette


## correct_answer
D

## answer_a
Hyaline cartilage — epiphyseal plate

## explanation_a
Wrong pairing: the epiphyseal plate is hyaline cartilage, but this option is a distractor pairing designed to look right while the type shown in the photo is not hyaline.

## answer_b
Fibrocartilage — costal cartilage

## explanation_b
Fibrocartilage is correctly named but the costal cartilages are hyaline, not fibrocartilage — this swaps the site of a true fibrocartilage fact onto the wrong tissue.

## answer_c
Hyaline cartilage — epiglottis

## explanation_c
The epiglottis is the one exception in the larynx: it is yellow elastic cartilage, not hyaline, which is exactly the trap this option sets.

## answer_d
Fibrocartilage — intervertebral discs

## explanation_d
Correct. White fibrocartilage has an opaque, collagen-rich matrix with few cells and no perichondrium, and its classic site in this curriculum is the intervertebral disc. Recognising the matrix first (collagen-heavy, few cells) and only then recalling the site list is what stops a student guessing from the site alone. The pairing intervertebral disc = fibrocartilage is one of the highest-yield facts in this bank.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-MSK-AEB62E99182AEE

## concept_ids

## contextual_concept_ids

## topic
Basic tissues

## subtopic
Core principles

## difficulty
Moderate

## question_type
Classification

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.35

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Histology > Cartilage

## question_only_for

## library_ids
ART-MSK-AU105-CARTILAGE-HISTOLOGY

## resource_ids
src_fc2b7922f6377d572f37

## learning_objective
Match each of the three cartilage types to a site it is actually found at, from the appearance of its matrix.

## source_citation
Alexandria University Faculty of Medicine, Musculoskeletal System module (MED 105), Histology department question bank (Dr Iman Nabil), p1.

## author_notes
Diagram-dependent item transcribed from src_fc2b7922f6377d572f37; the letters A-D restate the printed option order 1-4. Correct answer taken from the bank's own printed answer key (page 17, answer block).

## estimated_seconds
75

## randomise_answers
yes

## media_recommendations
### anatomy plate · Question stem
Brief: Cartilage type identification from a photomicrograph
Purpose: The question is entirely a photo-to-site matching task; no amount of prose substitutes for seeing the matrix that the four options are built around.
Priority: required
Status: needed
Source direction: openly licensed histology atlas or the department's own practical slide set
Rights: must be CC-BY, public domain, or the department's own cleared teaching image

---

# Item

## id
QST-MSK-AU105-HIST-02

## title
What is the correct statement describing the type of cartilage in the opposite diagram?

## question
What is the correct statement describing the type of cartilage in the opposite diagram?

## subject
msk

## status
Draft

## owner
Admin team

## vignette


## correct_answer
C

## answer_a
Its matrix contains collagen types I and II

## explanation_a
Hyaline cartilage's matrix is essentially collagen type II; naming type I as well describes fibrocartilage's matrix, not this one.

## answer_b
It is always covered by a perichondrium

## explanation_b
Not always — hyaline cartilage covering a joint surface (articular cartilage) carries no perichondrium at all, which this absolute statement misses.

## answer_c
It is the main type of cartilage in the respiratory system

## explanation_c
Correct. Hyaline cartilage is the most widespread type and forms almost the whole respiratory tree's cartilaginous support — the tracheal rings and bronchial cartilages are hyaline, with the epiglottis the one laryngeal exception. Recognising hyaline cartilage's translucent, glass-like matrix with numerous small rounded chondrocytes is what identifies the diagram. This is the fact that separates hyaline from the two other cartilage types by distribution, not just by matrix.

## answer_d
Its outer fibrous capsule contains 1–8 cells

## explanation_d
Cell counts of 1–8 per capsule/group describe isogenous groups seen in elastic and hyaline cartilage's interstitial growth, not a defining feature stated this way for the tissue shown.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-MSK-AEB62E99182AEE

## concept_ids

## contextual_concept_ids

## topic
Basic tissues

## subtopic
Core principles

## difficulty
Moderate

## question_type
Classification

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.35

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Histology > Cartilage

## question_only_for

## library_ids
ART-MSK-AU105-CARTILAGE-HISTOLOGY

## resource_ids
src_fc2b7922f6377d572f37

## learning_objective
State which cartilage type predominates in the respiratory tree and why its matrix appearance identifies it.

## source_citation
Alexandria University Faculty of Medicine, Musculoskeletal System module (MED 105), Histology department question bank (Dr Iman Nabil), p1.

## author_notes
Diagram-dependent item transcribed from src_fc2b7922f6377d572f37; the letters A-D restate the printed option order 1-4. Correct answer taken from the bank's own printed answer key (page 17, answer block).

## estimated_seconds
75

## randomise_answers
yes

## media_recommendations
### histology · Question stem
Brief: Hyaline cartilage matrix at high power
Purpose: Distinguishing 'contains type I and II collagen' from 'is essentially type II' requires seeing the matrix, not reading a description of it.
Priority: required
Status: needed
Source direction: openly licensed histology atlas or the department's own practical slide set
Rights: must be CC-BY, public domain, or the department's own cleared teaching image

---

# Item

## id
QST-MSK-AU105-HIST-05

## title
Following on from the type of cartilage shown in the preceding diagram, where else is this same type of cartilage found?

## question
Following on from the type of cartilage shown in the preceding diagram, where else is this same type of cartilage found?

## subject
msk

## status
Draft

## owner
Admin team

## vignette


## correct_answer
B

## answer_a
Symphysis pubis

## explanation_a
The symphysis pubis is a secondary cartilaginous joint whose disc is fibrocartilage, not the type shown here.

## answer_b
Shoulder joint

## explanation_b
Correct. If the preceding diagram showed hyaline cartilage, its other classic site in this curriculum is a synovial joint's articular surface — the shoulder (glenohumeral) joint's cartilage is hyaline. This is the same matrix type covering most joint surfaces, the epiphyseal plates, the costal cartilages and most of the respiratory tree. The pattern to hold is: joint surfaces and growth plates are hyaline unless the question is specifically about a fibrocartilaginous joint.

## answer_c
Ear pinna

## explanation_c
The ear pinna's cartilage is yellow elastic cartilage, a distinct type with an elastic-fibre-rich matrix, not the hyaline type asked about here.

## answer_d
Menisci of the knee joint

## explanation_d
The menisci of the knee are fibrocartilage, chosen for their tensile strength under load, not the type in question.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-MSK-AEB62E99182AEE

## concept_ids

## contextual_concept_ids

## topic
Basic tissues

## subtopic
Core principles

## difficulty
Moderate

## question_type
Classification

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.35

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Histology > Cartilage

## question_only_for

## library_ids
ART-MSK-AU105-CARTILAGE-HISTOLOGY

## resource_ids
src_fc2b7922f6377d572f37

## learning_objective
Name a further site of hyaline cartilage beyond the ones already listed for it.

## source_citation
Alexandria University Faculty of Medicine, Musculoskeletal System module (MED 105), Histology department question bank (Dr Iman Nabil), p2.

## author_notes
Diagram-dependent item transcribed from src_fc2b7922f6377d572f37; the letters A-D restate the printed option order 1-4. Correct answer taken from the bank's own printed answer key (page 17, answer block).

## estimated_seconds
75

## randomise_answers
yes

## media_recommendations
### anatomy plate · Question stem
Brief: Hyaline cartilage at a synovial joint surface
Purpose: Confirming that the 'preceding diagram' actually showed hyaline cartilage — the premise the whole question rests on — requires seeing that image.
Priority: required
Status: needed
Source direction: openly licensed histology atlas or the department's own practical slide set
Rights: must be CC-BY, public domain, or the department's own cleared teaching image

---

# Item

## id
QST-MSK-AU105-HIST-07

## title
Which type of fibres predominates in this type of cartilage (shown in the opposite diagram)?

## question
Which type of fibres predominates in this type of cartilage (shown in the opposite diagram)?

## subject
msk

## status
Draft

## owner
Admin team

## vignette


## correct_answer
D

## answer_a
Collagen types I and II

## explanation_a
Mixing collagen I with II describes neither elastic cartilage nor fibrocartilage cleanly and is not the composition tested here.

## answer_b
Collagen type II only

## explanation_b
Collagen type II alone describes hyaline cartilage's matrix, not the elastic-fibre-rich tissue the diagram is asking about.

## answer_c
Collagen type I and elastic fibres

## explanation_c
Collagen type I belongs to fibrocartilage's matrix, not to the elastic-fibre-containing tissue in this diagram — this option mixes the two non-hyaline types together.

## answer_d
Collagen type II and elastic fibres

## explanation_d
Correct. Yellow elastic fibrocartilage has a matrix built on the same collagen type II background as hyaline cartilage, but additionally rich in elastic fibres, which is what gives it its yellow colour and pliability. Its abundant cells and elastic-fibre content are what a stained section is showing here. This is the type found in the ear pinna and the epiglottis.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-MSK-AEB62E99182AEE

## concept_ids

## contextual_concept_ids

## topic
Basic tissues

## subtopic
Core principles

## difficulty
Moderate

## question_type
Classification

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.35

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Histology > Cartilage

## question_only_for

## library_ids
ART-MSK-AU105-CARTILAGE-HISTOLOGY

## resource_ids
src_fc2b7922f6377d572f37

## learning_objective
State the fibre composition that identifies elastic cartilage on a stained section.

## source_citation
Alexandria University Faculty of Medicine, Musculoskeletal System module (MED 105), Histology department question bank (Dr Iman Nabil), p3.

## author_notes
Diagram-dependent item transcribed from src_fc2b7922f6377d572f37; the letters A-D restate the printed option order 1-4. Correct answer taken from the bank's own printed answer key (page 17, answer block).

## estimated_seconds
75

## randomise_answers
yes

## media_recommendations
### histology · Question stem
Brief: Elastic cartilage stained to show elastic fibres
Purpose: The fibre type only shows on a special stain (e.g. orcein/Verhoeff); a student cannot infer it from a plain description.
Priority: required
Status: needed
Source direction: openly licensed histology atlas or the department's own practical slide set
Rights: must be CC-BY, public domain, or the department's own cleared teaching image

---

# Item

## id
QST-NEU-AU105-HIST-25

## title
What is the true statement characterising the structure labelled B in the opposite photomicrograph?

## question
What is the true statement characterising the structure labelled B in the opposite photomicrograph?

## subject
neuro

## status
Draft

## owner
Admin team

## vignette


## correct_answer
B

## answer_a
It contains a Golgi apparatus

## explanation_a
A Golgi apparatus is present in the neuron's cell body generally, but it is not the specific feature labelled B is being credited with on this printed key.

## answer_b
It may contain Nissl bodies

## explanation_b
Correct. Nissl bodies (Nissl's granules) are basophilic clumps of rough endoplasmic reticulum found in the neuron's cell body (perikaryon) — they are a defining light-microscopic feature of the neuronal soma, present because a neuron's high protein-synthetic demand for maintaining a long axon requires abundant ribosomal machinery, and their presence (or, after axotomy, their dispersal as chromatolysis) is a classic marker examined again and again in this bank. Their dispersal after axonal injury (chromatolysis) is the same fact read in reverse, and is tested just as often.

## answer_c
It is sometimes multiple

## explanation_c
Being 'sometimes multiple' does not describe the cell body (a neuron has one cell body); it more plausibly describes a dendrite, which is not what B is labelled as here.

## answer_d
It may be covered by a sheath

## explanation_d
Being covered by a sheath describes an axon (which may be myelinated), not the structure labelled B on this printed key.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-FND-4AE74C678A6F64

## concept_ids

## contextual_concept_ids

## topic
Basic tissues

## subtopic
Core principles

## difficulty
Moderate

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.35

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Histology > Nerve1

## question_only_for

## library_ids
ART-NEU-AU105-NEURONS-NERVE-FIBRES-HISTOLOGY

## resource_ids
src_fc2b7922f6377d572f37

## learning_objective
Identify Nissl bodies as a defining feature of the neuronal cell body.

## source_citation
Alexandria University Faculty of Medicine, Musculoskeletal System module (MED 105), Histology department question bank (Dr Iman Nabil), p9.

## author_notes
Diagram-dependent item transcribed from src_fc2b7922f6377d572f37; the letters A-D restate the printed option order 1-4. Correct answer taken from the bank's own printed answer key (page 17, answer block).

## estimated_seconds
75

## randomise_answers
yes

## media_recommendations
### histology · Question stem
Brief: Neuron cell body with Nissl bodies stained (e.g. cresyl violet)
Purpose: Nissl bodies are only visible with a specific stain highlighting rough ER in the perikaryon, which no verbal description substitutes for.
Priority: required
Status: needed
Source direction: openly licensed histology atlas or the department's own practical slide set
Rights: must be CC-BY, public domain, or the department's own cleared teaching image

---

# Item

## id
QST-NEU-AU105-HIST-29

## title
Where are the cells labelled (1) in the opposite photograph located?

## question
Where are the cells labelled (1) in the opposite photograph located?

## subject
neuro

## status
Draft

## owner
Admin team

## vignette


## correct_answer
D

## answer_a
Cerebral cortex

## explanation_a
The cerebral cortex is populated mainly by multipolar neurons (pyramidal and other types), not the specific neuron type shown here.

## answer_b
Autonomic ganglia

## explanation_b
Autonomic ganglia contain multipolar (and some pseudounipolar-like) autonomic neurons, a different type from the one shown in this photograph.

## answer_c
Olfactory mucosa

## explanation_c
The olfactory mucosa's receptor cells are bipolar neurons, a different shape from the one this photograph is showing.

## answer_d
Cerebellar cortex

## explanation_d
Correct. Nerve cells are classed by how many processes leave the cell body — unipolar (including the pseudounipolar sensory-ganglion type), bipolar, or multipolar — and a distinctive, densely branching cell of a shape specific to one site points to the cerebellar cortex, home of the Purkinje cell, whose enormous, flattened dendritic arbor is one of the most recognisable neuron morphologies in histology. Recognising a neuron's shape as diagnostic of its location is a skill this bank returns to across every nervous-tissue chapter.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-FND-14D80DE53DE835

## concept_ids

## contextual_concept_ids

## topic
Basic tissues

## subtopic
Core principles

## difficulty
Moderate

## question_type
Classification

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.35

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Histology > Nerve1

## question_only_for

## library_ids
ART-NEU-AU105-NEURONS-NERVE-FIBRES-HISTOLOGY

## resource_ids
src_fc2b7922f6377d572f37

## learning_objective
Locate a distinctively shaped neuron type to the cerebellar cortex.

## source_citation
Alexandria University Faculty of Medicine, Musculoskeletal System module (MED 105), Histology department question bank (Dr Iman Nabil), p10.

## author_notes
Diagram-dependent item transcribed from src_fc2b7922f6377d572f37; the letters A-D restate the printed option order 1-4. Correct answer taken from the bank's own printed answer key (page 17, answer block).

## estimated_seconds
75

## randomise_answers
yes

## media_recommendations
### histology · Question stem
Brief: Purkinje-type neuron with its dendritic arbor, cerebellar cortex
Purpose: Neuron shape identification is inherently visual; a description of 'a highly branched neuron' cannot substitute for seeing the arbor.
Priority: required
Status: needed
Source direction: openly licensed histology atlas or the department's own practical slide set
Rights: must be CC-BY, public domain, or the department's own cleared teaching image

---

# Item

## id
QST-NEU-AU105-HIST-30

## title
Where is this type of nerve cell located?

## question
Where is this type of nerve cell located?

## subject
neuro

## status
Draft

## owner
Admin team

## vignette


## correct_answer
D

## answer_a
Olfactory mucosa

## explanation_a
The olfactory mucosa's receptor neurons are bipolar, a different shape class from the one shown here.

## answer_b
Cerebral cortex

## explanation_b
The cerebral cortex is dominated by multipolar neurons, not the shape shown in this photograph.

## answer_c
Retina

## explanation_c
The retina contains bipolar (and other) neuron types in its relay pathway, a different shape from the one shown here.

## answer_d
Sensory ganglia

## explanation_d
Correct. Sensory (dorsal root) ganglion neurons are pseudounipolar: a single process leaves the cell body and then splits into a peripheral and a central branch, a shape unique among the neuron classes and one of the most frequently tested distinguishing facts in basic neurohistology. This single-process, pseudounipolar shape is unique among the neuron classes and is not shared with any other neuron type in this bank.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-FND-14D80DE53DE835

## concept_ids

## contextual_concept_ids

## topic
Basic tissues

## subtopic
Core principles

## difficulty
Moderate

## question_type
Classification

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.35

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Histology > Nerve2

## question_only_for

## library_ids
ART-NEU-AU105-NEUROGLIA-NERVE-INJURY-HISTOLOGY

## resource_ids
src_fc2b7922f6377d572f37

## learning_objective
Locate the pseudounipolar neuron to sensory ganglia.

## source_citation
Alexandria University Faculty of Medicine, Musculoskeletal System module (MED 105), Histology department question bank (Dr Iman Nabil), p11.

## author_notes
Diagram-dependent item transcribed from src_fc2b7922f6377d572f37; the letters A-D restate the printed option order 1-4. Correct answer taken from the bank's own printed answer key (page 17, answer block).

## estimated_seconds
75

## randomise_answers
yes

## media_recommendations
### histology · Question stem
Brief: Pseudounipolar neuron of a dorsal root ganglion
Purpose: Recognising the single-process, pseudounipolar shape (versus true unipolar, bipolar or multipolar) requires seeing the cell, not reading its description.
Priority: required
Status: needed
Source direction: openly licensed histology atlas or the department's own practical slide set
Rights: must be CC-BY, public domain, or the department's own cleared teaching image

---

# Item

## id
QST-NEU-AU105-HIST-31

## title
Which statement is NOT a character of the pointed structure (the axon)?

## question
Which statement is NOT a character of the pointed structure (the axon)?

## subject
neuro

## status
Draft

## owner
Admin team

## vignette


## correct_answer
B

## answer_a
It is never covered by a sheath

## explanation_a
An axon can indeed be unmyelinated (surrounded only by a Schwann cell with no compact myelin, or in the CNS running bare between oligodendrocyte internodes), so 'never covered by a sheath' can genuinely apply and is not the false statement being sought.

## answer_b
It contains Nissl bodies

## explanation_b
Correct — this is the false statement. Nissl bodies (basophilic rough endoplasmic reticulum) are a perikaryal (cell body) feature; the axon, once it leaves the axon hillock, characteristically lacks Nissl substance and free ribosomes, which is exactly why chromatolysis (Nissl dispersal) is scored in the cell body after axonal injury, not in the axon itself. This is the same fact tested from the opposite direction elsewhere in this bank, where a photograph of the cell body is shown instead.

## answer_c
It contains a Golgi apparatus

## explanation_c
A Golgi apparatus is likewise a perikaryal organelle; its stated absence from the axon is consistent with the axon's known ultrastructure, so this is not the intended false statement either — though by the same logic as B, both describe organelles absent from the axon; the printed key credits B as the answer.

## answer_d
It is sometimes single

## explanation_d
A neuron has a single axon (unlike its potentially multiple dendrites), so 'sometimes single' can genuinely describe the axon and is not the false statement.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-FND-4AE74C678A6F64

## concept_ids

## contextual_concept_ids

## topic
Basic tissues

## subtopic
Core principles

## difficulty
Hard

## question_type
Anatomy

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
40

## exam_relevance
6

## clinical_relevance
0.35

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Histology > Nerve2

## question_only_for

## library_ids
ART-NEU-AU105-NEUROGLIA-NERVE-INJURY-HISTOLOGY

## resource_ids
src_fc2b7922f6377d572f37

## learning_objective
Identify that Nissl bodies belong to the perikaryon, not the axon, as the false statement about the axon.

## source_citation
Alexandria University Faculty of Medicine, Musculoskeletal System module (MED 105), Histology department question bank (Dr Iman Nabil), p11.

## author_notes
Diagram-dependent item transcribed from src_fc2b7922f6377d572f37; the letters A-D restate the printed option order 1-4. Correct answer taken from the bank's own printed answer key (page 17, answer block).

## estimated_seconds
75

## randomise_answers
yes

## media_recommendations
### diagram · Question stem
Brief: Axon versus cell body, Nissl substance distribution shown
Purpose: The absence of Nissl substance specifically from the axon (versus its presence in the cell body) is a distributional fact only an image contrasting the two compartments can carry.
Priority: required
Status: needed
Source direction: openly licensed histology atlas or the department's own practical slide set
Rights: must be CC-BY, public domain, or the department's own cleared teaching image

---

# Item

## id
QST-MSK-AU105-HIST-38

## title
What is the function of the structure labelled A (the sarcoplasmic reticulum)?

## question
What is the function of the structure labelled A (the sarcoplasmic reticulum)?

## subject
msk

## status
Draft

## owner
Admin team

## vignette


## correct_answer
D

## answer_a
Release of energy during contraction

## explanation_a
Energy release during contraction is a mitochondrial function (ATP production), not the job of the structure labelled A here.

## answer_b
Contains acetylcholine receptors

## explanation_b
Acetylcholine receptors sit on the sarcolemma at the motor end plate, not on the internal membrane system labelled A.

## answer_c
Conducts the wave of depolarisation deep within the myofibrils

## explanation_c
Conducting the depolarisation wave deep into the fibre is the T-tubule's job; the T-tubule and the sarcoplasmic reticulum are adjacent but distinct structures, and this question's labelled structure is the latter.

## answer_d
Regulation of calcium ion concentration within the myofibrils

## explanation_d
Correct. The sarcoplasmic reticulum stores and releases calcium ions in response to the T-tubule's depolarisation signal, and it is this calcium release — binding troponin C and displacing tropomyosin off the actin-myosin binding site — that triggers cross-bridge cycling. Regulating cytosolic calcium concentration around the myofibrils is the sarcoplasmic reticulum's defining role in excitation–contraction coupling, distinct from the T-tubule's separate job of carrying the depolarisation signal inward.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-MSK-3013AA61E917B7

## concept_ids

## contextual_concept_ids

## topic
Basic tissues

## subtopic
Core principles

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.35

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Histology > Skeletal

## question_only_for

## library_ids
ART-MSK-AU105-SKELETAL-MUSCLE-HISTOLOGY

## resource_ids
src_fc2b7922f6377d572f37

## learning_objective
State the sarcoplasmic reticulum's role in calcium regulation, distinct from the T-tubule's role in depolarisation conduction.

## source_citation
Alexandria University Faculty of Medicine, Musculoskeletal System module (MED 105), Histology department question bank (Dr Iman Nabil), p13.

## author_notes
Diagram-dependent item transcribed from src_fc2b7922f6377d572f37; the letters A-D restate the printed option order 1-4. Correct answer taken from the bank's own printed answer key (page 17, answer block).

## estimated_seconds
75

## randomise_answers
yes

## media_recommendations
### diagram · Question stem
Brief: T-tubule and sarcoplasmic reticulum at the triad, labelled
Purpose: The T-tubule and sarcoplasmic reticulum sit immediately next to each other at the triad; only a labelled diagram lets a student tell which structure (A) is being asked about.
Priority: required
Status: needed
Source direction: openly licensed histology atlas or the department's own practical slide set
Rights: must be CC-BY, public domain, or the department's own cleared teaching image

---

# Item

## id
QST-MSK-AU105-HIST-42

## title
Where is the enzyme choline esterase (acetylcholinesterase) found?

## question
Where is the enzyme choline esterase (acetylcholinesterase) found?

## subject
msk

## status
Draft

## owner
Admin team

## vignette


## correct_answer
C

## answer_a
Structure D

## explanation_a
Structure D on this diagram is not the site the printed key credits for acetylcholinesterase location.

## answer_b
Structure A

## explanation_b
Structure A is not where the printed key locates the enzyme on this diagram.

## answer_c
Structure B

## explanation_c
Correct. Neuromuscular transmission runs presynaptic calcium entry, acetylcholine exocytosis, opening of a cation channel on the motor end plate, generation of the end-plate potential, and finally hydrolysis of acetylcholine by acetylcholinesterase — an enzyme positioned in the synaptic cleft/motor end plate region (labelled B here) so that it can terminate the signal promptly after each release of transmitter, allowing the junction to reset for the next impulse. Losing this enzyme's activity, as anticholinesterase drugs do, prolongs transmission rather than blocking it outright.

## answer_d
Structure C

## explanation_d
Structure C is not the labelled location the printed key credits for this enzyme.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-MSK-77D955AAB4D0FA

## concept_ids

## contextual_concept_ids

## topic
Basic tissues

## subtopic
Core principles

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.35

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Histology > Skeletal

## question_only_for

## library_ids
ART-MSK-AU105-SKELETAL-MUSCLE-HISTOLOGY

## resource_ids
src_fc2b7922f6377d572f37

## learning_objective
Locate acetylcholinesterase at the motor end plate as the final step of neuromuscular transmission.

## source_citation
Alexandria University Faculty of Medicine, Musculoskeletal System module (MED 105), Histology department question bank (Dr Iman Nabil), p14.

## author_notes
Diagram-dependent item transcribed from src_fc2b7922f6377d572f37; the letters A-D restate the printed option order 1-4. Correct answer taken from the bank's own printed answer key (page 17, answer block).

## estimated_seconds
75

## randomise_answers
yes

## media_recommendations
### diagram · Question stem
Brief: Motor end plate with the synaptic cleft and acetylcholinesterase site labelled
Purpose: The enzyme's location relative to the presynaptic terminal and postsynaptic membrane is a spatial fact only the labelled diagram can settle.
Priority: required
Status: needed
Source direction: openly licensed histology atlas or the department's own practical slide set
Rights: must be CC-BY, public domain, or the department's own cleared teaching image

---

# Item

## id
QST-MSK-AU105-HIST-43

## title
Which labelled letter represents the structure that directly covers the myosin-binding sites?

## question
Which labelled letter represents the structure that directly covers the myosin-binding sites?

## subject
msk

## status
Draft

## owner
Admin team

## vignette


## correct_answer
C

## answer_a
Letter B

## explanation_a
Letter B on this diagram is not the thin-filament regulatory protein being asked about here.

## answer_b
Letter C

## explanation_b
Letter C is not the structure that covers the myosin-binding site on this diagram.

## answer_c
Letter A

## explanation_c
Correct. Tropomyosin is the thin-filament protein that lies along the actin filament and covers the myosin-binding site at rest; when calcium binds troponin C during excitation–contraction coupling, troponin displaces tropomyosin off that site, exposing it so myosin cross-bridges can form. On this diagram tropomyosin is labelled A.

## answer_d
Letter D

## explanation_d
Letter D is not the labelled tropomyosin on this diagram.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-MSK-3013AA61E917B7

## concept_ids

## contextual_concept_ids

## topic
Basic tissues

## subtopic
Core principles

## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
40

## exam_relevance
6

## clinical_relevance
0.35

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Histology > Smooth

## question_only_for

## library_ids
ART-MSK-AU105-SMOOTH-MUSCLE-HISTOLOGY

## resource_ids
src_fc2b7922f6377d572f37

## learning_objective
Identify tropomyosin as the thin-filament protein covering the myosin-binding site at rest.

## source_citation
Alexandria University Faculty of Medicine, Musculoskeletal System module (MED 105), Histology department question bank (Dr Iman Nabil), p15.

## author_notes
Diagram-dependent item transcribed from src_fc2b7922f6377d572f37; the letters A-D restate the printed option order 1-4. Correct answer taken from the bank's own printed answer key (page 17, answer block).

## estimated_seconds
75

## randomise_answers
yes

## media_recommendations
### diagram · Question stem
Brief: Thin filament with troponin and tropomyosin labelled relative to the myosin-binding site
Purpose: The precise position of tropomyosin relative to the actin binding site can only be shown, not adequately described, on a labelled diagram.
Priority: required
Status: needed
Source direction: openly licensed histology atlas or the department's own practical slide set
Rights: must be CC-BY, public domain, or the department's own cleared teaching image

---

# Item

## id
QST-MSK-AU105-HIST-45

## title
Which statement does NOT describe the muscle fibres in the opposite diagram (smooth muscle)?

## question
Which statement does NOT describe the muscle fibres in the opposite diagram (smooth muscle)?

## subject
msk

## status
Draft

## owner
Admin team

## vignette


## correct_answer
D

## answer_a
They are rounded in transverse section with unequal size

## explanation_a
Smooth muscle fibres do appear rounded and of unequal size in transverse section, because their broad middle portions and narrow tapering ends lie at different levels along neighbouring fibres — this is a true statement, not the answer.

## answer_b
They lack a troponin complex

## explanation_b
Smooth muscle's thin filaments genuinely lack troponin complexes (regulation instead runs through calcium–calmodulin acting on myosin light-chain kinase), so this is a true statement, not the answer.

## answer_c
They contain desmin filaments

## explanation_c
Desmin intermediate filaments genuinely connect smooth muscle's dense bodies, so this is a true statement, not the answer.

## answer_d
It is covered externally by epimysium

## explanation_d
Correct — this is the false statement. Epimysium, perimysium and endomysium are the named connective-tissue coverings of skeletal muscle; smooth muscle has no such named layers, only bundles of fibres surrounded by connective tissue carrying collagen and elastic fibres, with fine reticular fibres around each individual fibre — so describing smooth muscle as 'covered externally by epimysium' misapplies skeletal muscle's terminology to a tissue that does not have that structure. Recognising which named skeletal-muscle term does not belong in a smooth-muscle description is exactly what this question is testing.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-MSK-888DFA3AA4E974

## concept_ids

## contextual_concept_ids

## topic
Basic tissues

## subtopic
Core principles

## difficulty
Moderate

## question_type
Classification

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.35

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Histology > Smooth

## question_only_for

## library_ids
ART-MSK-AU105-SMOOTH-MUSCLE-HISTOLOGY

## resource_ids
src_fc2b7922f6377d572f37

## learning_objective
Identify that smooth muscle has no epimysium, unlike skeletal muscle, as the false statement.

## source_citation
Alexandria University Faculty of Medicine, Musculoskeletal System module (MED 105), Histology department question bank (Dr Iman Nabil), p15.

## author_notes
Diagram-dependent item transcribed from src_fc2b7922f6377d572f37; the letters A-D restate the printed option order 1-4. Correct answer taken from the bank's own printed answer key (page 17, answer block).

## estimated_seconds
75

## randomise_answers
yes

## media_recommendations
### histology · Question stem
Brief: Smooth muscle bundle with its connective-tissue wrapping, no epimysium present
Purpose: Confirming the absence of a named epimysium layer requires seeing the actual connective-tissue arrangement around a smooth-muscle bundle.
Priority: required
Status: needed
Source direction: openly licensed histology atlas or the department's own practical slide set
Rights: must be CC-BY, public domain, or the department's own cleared teaching image

---

# Item

## id
QST-MSK-AU105-HIST-46

## title
Why are smooth muscles unstriated?

## question
Why are smooth muscles unstriated?

## subject
msk

## status
Draft

## owner
Admin team

## vignette


## correct_answer
C

## answer_a
Due to absence of thin filaments

## explanation_a
Smooth muscle does have thin (actin) filaments; their absence is not why the tissue lacks striations.

## answer_b
Due to the higher proportion of actin to myosin than in striated muscle

## explanation_b
A higher actin-to-myosin ratio is a true structural difference from striated muscle, but by itself it does not explain the absence of visible cross-striations.

## answer_c
Due to absence of parallel myofibrils

## explanation_c
Correct. Smooth muscle's thick and thin filaments are not organised into parallel myofibrils arranged in registered sarcomeres the way skeletal muscle's are; instead they run obliquely in loosely arranged bundles anchored to scattered dense bodies rather than aligned Z lines. Because there is no repeating, in-register sarcomeric pattern across the fibre, no alternating light/dark banding is visible — striations require the filaments to be aligned in register across the width of the fibre, which smooth muscle's architecture does not provide.

## answer_d
Because they are grouped into bundles

## explanation_d
Being grouped into bundles is true of both smooth and skeletal muscle at a higher level of organisation and does not explain the absence of striations at the level of the individual fibre's own filaments.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-MSK-888DFA3AA4E974

## concept_ids

## contextual_concept_ids

## topic
Basic tissues

## subtopic
Core principles

## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
40

## exam_relevance
6

## clinical_relevance
0.35

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Histology > Smooth

## question_only_for

## library_ids
ART-MSK-AU105-SMOOTH-MUSCLE-HISTOLOGY

## resource_ids
src_fc2b7922f6377d572f37

## learning_objective
Explain the absence of striations in smooth muscle by its lack of registered, parallel myofibrils.

## source_citation
Alexandria University Faculty of Medicine, Musculoskeletal System module (MED 105), Histology department question bank (Dr Iman Nabil), p16.

## author_notes
Diagram-dependent item transcribed from src_fc2b7922f6377d572f37; the letters A-D restate the printed option order 1-4. Correct answer taken from the bank's own printed answer key (page 17, answer block).

## estimated_seconds
75

## randomise_answers
yes

## media_recommendations
### diagram · Question stem
Brief: Smooth muscle myofilaments running obliquely, contrasted with skeletal muscle's registered sarcomeres
Purpose: The oblique, non-registered filament arrangement that explains the absence of striations is a spatial fact only a comparative diagram can show.
Priority: required
Status: needed
Source direction: openly licensed histology atlas or the department's own practical slide set
Rights: must be CC-BY, public domain, or the department's own cleared teaching image

---

# Item

## id
QST-MSK-AU105-HIST-47

## title
What is the correct statement describing caveolae in smooth muscle?

## question
What is the correct statement describing caveolae in smooth muscle?

## subject
msk

## status
Draft

## owner
Admin team

## vignette


## correct_answer
B

## answer_a
The site of storage of calcium ions

## explanation_a
Calcium storage is chiefly the job of the sarcoplasmic reticulum, not the caveolae themselves, even though caveolae sit close to sites of calcium signalling at the membrane.

## answer_b
The equivalent part to the transverse tubules

## explanation_b
Correct. Caveolae are small flask-shaped invaginations of the smooth-muscle sarcolemma that serve as the functional equivalent of the T-tubules of skeletal muscle, helping couple membrane depolarisation to the internal calcium-release machinery in a cell that has no true transverse tubule system of its own. Losing sight of this substitution is what makes students mismatch caveolae with the wrong skeletal-muscle counterpart on this bank's questions.

## answer_c
The counterpart of the Z line

## explanation_c
Dense bodies, not caveolae, are the functional counterpart of the Z line in smooth muscle — this option swaps the two smooth-muscle-specific substitute structures.

## answer_d
The site of rapid conduction of nerve impulses between adjacent muscle fibres

## explanation_d
Rapid impulse conduction between adjacent smooth-muscle fibres is the job of gap junctions (nexuses), not caveolae.

## answer_e


## explanation_e


## answer_f


## explanation_f


## attached_image


## attachments


## format


## written_parts


## matching_options


## matching_prompts


## correct_answers


## labeling_image


## labeling_alt


## labeling_points


## completion_text


## derived_from


## main_concept
CON-MSK-888DFA3AA4E974

## concept_ids

## contextual_concept_ids

## topic
Basic tissues

## subtopic
Core principles

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

## exam_relevance
6

## clinical_relevance
0.35

## academic_relevance
0.85

## exam_weight_by_year
AU_Y1=0.3

## years
AU_Y1

## universities
au

## module
AU-MED-105

## module_subject
AU-MED-105 > Histology > Smooth

## question_only_for

## library_ids
ART-MSK-AU105-SMOOTH-MUSCLE-HISTOLOGY

## resource_ids
src_fc2b7922f6377d572f37

## learning_objective
State that caveolae are the T-tubule equivalent in smooth muscle, distinct from dense bodies (the Z-line equivalent).

## source_citation
Alexandria University Faculty of Medicine, Musculoskeletal System module (MED 105), Histology department question bank (Dr Iman Nabil), p16.

## author_notes
Diagram-dependent item transcribed from src_fc2b7922f6377d572f37; the letters A-D restate the printed option order 1-4. Correct answer taken from the bank's own printed answer key (page 17, answer block).

## estimated_seconds
75

## randomise_answers
yes

## media_recommendations
### diagram · Question stem
Brief: Caveolae on the smooth-muscle sarcolemma, compared with skeletal-muscle T-tubules
Purpose: The structural equivalence between caveolae and T-tubules is best shown side by side, since neither term explains itself from the name alone.
Priority: required
Status: needed
Source direction: openly licensed histology atlas or the department's own practical slide set
Rights: must be CC-BY, public domain, or the department's own cleared teaching image

---
