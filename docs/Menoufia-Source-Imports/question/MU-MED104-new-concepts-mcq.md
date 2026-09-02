<!--
  MU-MED104 (Musculoskeletal) - lane-2 authored batch: six questions whose
  main concept is one of the six genuinely new MU-MED104 concepts minted this
  pass (Menkes disease CON-FND-C634004C7B9069, calcium-pH solubility
  CON-FND-21CA469838BAA3, vitamin-D-as-hormone criteria CON-FND-31131EDB3C9C2A,
  voltage-gated axon channels CON-NEU-95192B889B38A3 - all four from MFM42Support
  END MODULE MSK1.pdf; giant cell tumour of bone CON-MSK-80E36FA26C910A and
  sequestrum CON-MSK-5428B9231C2794 - both from MSK2 endmodule exam group 1.
  
  Apply after concept/MU-MED104-concepts.md, article/MU-MED104-articles.md and
  evidence/MU-MED104-{claims,citations,resources}.md are live.
  
  Simulate together:
    npm run medical:simulate -- \
      docs/Menoufia-Source-Imports/concept/MU-MED104-concepts.md \
      docs/Menoufia-Source-Imports/article/MU-MED104-articles.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED104-resources.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED104-claims.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED104-citations.md \
      docs/Menoufia-Source-Imports/question/MU-MED104-new-concepts-mcq.md \
      --emit /tmp/sim-MU-MED104-new-concepts.json

  Import: Admin › Bulk import → question.
-->

# Item

## id
QST-MUMED104-MFM42MSK1-Q02

## title
Mechanism of Menkes disease

## question
Menkes disease is due to which one of the following?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Deficiency of Ascorbic Acid (vitamin C)

## explanation_a
Incorrect. A deficiency of ascorbic acid produces scurvy, not Menkes disease, and it acts at an earlier step: vitamin C is a cofactor for prolyl and lysyl hydroxylase, the enzymes that hydroxylate collagen before it is secreted from the cell. Menkes disease instead knocks out a step that happens after secretion, so the two conditions weaken collagen by entirely different mechanisms. Ascorbic acid deficiency is also readily distinguished clinically by bleeding gums, poor wound healing and perifollicular haemorrhages, none of which are the hallmark of Menkes disease.

## answer_b
Abnormal fragility of bones

## explanation_b
Incorrect. Abnormal fragility of bones describes osteogenesis imperfecta, a disorder of collagen synthesis (usually a mutated COL1A1/COL1A2 gene reducing type I collagen quantity or quality), not a disorder of the copper-dependent cross-linking enzyme lysyl oxidase. Menkes disease affects a post-translational cross-linking step common to collagen and elastin together, rather than causing brittle bones as its defining feature. Its presenting features are instead kinky, brittle hair, lax skin and progressive neurological decline from copper-dependent enzyme failure throughout the body.

## answer_c
Defective synthesis of fibrillin

## explanation_c
Incorrect. Defective synthesis of fibrillin describes Marfan syndrome, a disorder of the fibrillin-1 microfibril scaffold that anchors elastin fibres, not a disorder of the enzyme that cross-links elastin itself. Menkes disease does not touch fibrillin synthesis at all; its lesion is copper deficiency starving lysyl oxidase, the enzyme that comes after both collagen and elastin have already been made. Marfan syndrome instead produces tall stature, joint laxity, lens dislocation and aortic root dilation, a clinical picture unrelated to Menkes disease.

## answer_d
Defective cross-linking of collagen and elastin

## explanation_d
Correct. Menkes disease is an X-linked defect of intestinal copper absorption and transport, so tissue copper runs short and every copper-dependent enzyme, including lysyl oxidase, cannot function. Lysyl oxidase is the enzyme that oxidatively deaminates lysine and hydroxylysine residues in collagen and lysine residues in elastin to form the covalent cross-links that give both proteins their mechanical strength, so its failure produces defective cross-linking of collagen and elastin together. This is why Menkes disease presents with connective-tissue fragility (kinky hair, lax skin and vessels) alongside the neurological features of systemic copper deficiency.

## answer_e
Defective synthesis of elastin

## explanation_e
Incorrect. Defective synthesis of elastin would mean the protein itself is never made in adequate amount, but Menkes disease does not block elastin synthesis — tropoelastin is produced normally and secreted, and it is only the subsequent copper-dependent cross-linking step, shared with collagen, that fails. Naming elastin synthesis alone also misses that collagen is affected identically by the same copper-dependent enzyme defect, which is the point the correct answer captures and this option does not.

## topic
Extracellular matrix proteins

## subtopic
Collagen and elastin cross-linking disorders

## main_concept
CON-FND-C634004C7B9069

## concept_ids
CON-FND-C634004C7B9069

## contextual_concept_ids

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
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year

## years
MU_Y1

## universities
mu

## module
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Biochemistry

## question_only_for

## library_ids
ART-FND-MU104-COLLAGEN-MINERAL-VITD

## resource_ids
src_57f44dcc809b58a1a81f

## learning_objective
Identify Menkes disease as a copper-transport defect that starves lysyl oxidase, producing defective cross-linking of collagen and elastin together.

## source_citation
MFM42Support - END MODULE MSK1 / Answers of MSK1 END, Q2 (Menoufia MED104 MSK1 end-module exam, Biochemistry section); MED104 Biochemistry department book (MSK-main book 2024), p.69

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text render of MFM42Support - Answers of MSK1 END.pdf p1 (Q2)
mu: MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, Q2, Biochemistry section

---

# Item

## id
QST-MUMED104-MFM42MSK1-Q04

## title
What favours intestinal calcium solubility

## question
Which of the following increases the solubility of Ca+2 in the intestines?

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
High pH

## explanation_a
Incorrect. A high, more alkaline intraluminal pH does the opposite of favouring calcium solubility: it promotes precipitation of calcium as insoluble salts, reducing the ionised, absorbable fraction. This is the reverse of the correct relationship, and it is also why conditions of relative achlorhydria (reduced gastric acid, raising luminal pH) are associated with impaired calcium absorption rather than improved absorption.

## answer_b
Low pH

## explanation_b
Correct. Calcium must remain in an ionised, soluble form in the gut lumen to be absorbed, and a low (acidic) pH keeps calcium salts in solution rather than allowing them to precipitate. This is why gastric acid secretion supports calcium absorption and why achlorhydria impairs it, and it is one of several factors — alongside dietary calcium load, vitamin D and parathyroid hormone — that the department's own factors-affecting-calcium-absorption list names.

## answer_c
Excess oxalate

## explanation_c
Incorrect. Excess oxalate binds calcium to form insoluble calcium oxalate, precipitating it out of solution rather than increasing its solubility. This is the same chemistry behind the advice to limit oxalate-rich foods in patients prone to calcium oxalate kidney stones, and it demonstrates the opposite effect to the one this question asks for.

## answer_d
Excess phytic acid

## explanation_d
Incorrect. Excess phytic acid, found in the bran and husks of cereals and legumes, chelates calcium (and other divalent cations such as zinc and iron) into insoluble calcium phytate complexes, reducing rather than increasing the calcium available for absorption. This is part of why diets very high in unrefined cereal fibre can be associated with reduced mineral bioavailability despite adequate dietary calcium content.

## answer_e
Excess unabsorbed fatty acids

## explanation_e
Incorrect. Excess unabsorbed dietary fatty acids, as occurs in fat malabsorption states (for example pancreatic insufficiency or bile-salt deficiency), bind calcium to form insoluble calcium soaps in the gut lumen, which are then lost in the stool rather than absorbed. This lowers calcium solubility and absorption, the opposite of the effect the question describes, and is one mechanism behind the bone disease seen in chronic fat-malabsorption disorders.

## topic
Mineral metabolism

## subtopic
Calcium absorption and blood levels

## main_concept
CON-FND-21CA469838BAA3

## concept_ids
CON-FND-21CA469838BAA3

## contextual_concept_ids

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
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year

## years
MU_Y1

## universities
mu

## module
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Biochemistry

## question_only_for

## library_ids
ART-FND-MU104-COLLAGEN-MINERAL-VITD

## resource_ids
src_13d5611eaa0e1504ff10

## learning_objective
State that a low (acidic) pH, not oxalate, phytate or unabsorbed fatty acids, favours calcium solubility and intestinal absorption.

## source_citation
MFM42Support - END MODULE MSK1 / Answers of MSK1 END, Q4 (Menoufia MED104 MSK1 end-module exam, Biochemistry section); MED104 Biochemistry department "Support 43" macrominerals notes, p.3

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text render of MFM42Support - Answers of MSK1 END.pdf p1 (Q4)
mu: MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, Q4, Biochemistry section

---

# Item

## id
QST-MUMED104-MFM42MSK1-Q05

## title
Not a reason vitamin D counts as a hormone

## question
One of the following is not a cause of considering VIT D as a hormone:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
It has a cyclo-pentanoperhydrophenanthrene ring like steroids

## explanation_a
Incorrect (i.e. this genuinely IS a reason). Vitamin D's active form shares the cyclopentanoperhydrophenanthrene steroid ring system with the classical steroid hormones, and this structural resemblance underlies its steroid-hormone-like nuclear receptor mechanism. Because this structural criterion is one of the department's own stated grounds for calling vitamin D a hormone, it is not the exception this question is asking for.

## answer_b
The formation of the biological active forms is subject to "feedback" inhibition

## explanation_b
Incorrect (i.e. this genuinely IS a reason). Both of vitamin D's biologically active forms — 25-hydroxyvitamin D3 and 1,25-dihydroxyvitamin D3 — have their formation subject to feedback regulation, matching how classical endocrine hormone synthesis is controlled by feedback loops rather than proceeding unchecked. Because feedback-regulated activation is one of the department's own stated grounds for the hormone classification, it is not the exception being asked for here.

## answer_c
It is found in dietary food

## explanation_c
Correct. Being found in dietary food is not one of the criteria the department's own list uses to justify calling vitamin D a hormone; if anything, vitamin D's defining hormone-like property is the opposite — it is synthesised endogenously in the skin from 7-dehydrocholesterol under ultraviolet light, so the body is not dependent on a dietary source for it the way it is for a true vitamin. A substance being obtainable from the diet says nothing for or against a nuclear-receptor mechanism, feedback regulation, or distant target-organ action, so this is the property that does not belong on the list.

## answer_d
Its action has definite target organs

## explanation_d
Incorrect (i.e. this genuinely IS a reason). Calcitriol, the active form of vitamin D, has definite distant target organs — the small intestine, bone and kidney — meaning it is produced in one site (skin, then liver and kidney) and acts at a distance on others, the classic "produced here, acts there" pattern that defines endocrine hormone action. Because definite target-organ action is one of the department's own stated grounds, it is not the exception this question is asking for.

## answer_e
It's made of nuclear action

## explanation_e
Incorrect (i.e. this genuinely IS a reason). Calcitriol acts through nuclear receptor binding, the same mode of action used by classical steroid hormones to alter gene transcription in target cells, rather than acting only at the cell-surface the way most vitamins' cofactor roles do. Because a nuclear mode of action is one of the department's own stated grounds for the hormone classification, it is not the exception being asked for here.

## topic
Vitamin D biochemistry

## subtopic
Vitamin D as a hormone

## main_concept
CON-FND-31131EDB3C9C2A

## concept_ids
CON-FND-31131EDB3C9C2A

## contextual_concept_ids

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
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year

## years
MU_Y1

## universities
mu

## module
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Biochemistry

## question_only_for

## library_ids
ART-FND-MU104-COLLAGEN-MINERAL-VITD

## resource_ids
src_57f44dcc809b58a1a81f

## learning_objective
List the department's own criteria for classifying vitamin D as a hormone and identify dietary presence as not one of them.

## source_citation
MFM42Support - END MODULE MSK1 / Answers of MSK1 END, Q5 (Menoufia MED104 MSK1 end-module exam, Biochemistry section); MED104 Biochemistry department book (MSK-main book 2024), p.12

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text render of MFM42Support - Answers of MSK1 END.pdf p1 (Q5)
mu: MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, Q5, Biochemistry section

---

# Item

## id
QST-MUMED104-MFM42MSK1-Q06

## title
Channel type located on the nerve axon

## question
Which of the following channel types are located on nerve axon?

## subject
neuro

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Leakage channels

## explanation_a
Incorrect. Leakage (non-gated) channels are always open at a low rate and are what sets the resting membrane potential of the axon, but they are not the channel class that generates and conducts the action potential itself, which is what this question is asking about. They contribute background permeability rather than the threshold-dependent opening this question is testing.

## answer_b
Passive channels

## explanation_b
Incorrect. "Passive channels" is not a distinct gating class taught alongside leakage, ligand-gated, mechanically-gated and voltage-gated channels; it describes the same always-open, non-gated behaviour as a leakage channel rather than the impulse-generating channel type asked for here. Naming it does not identify the channel responsible for the axon's action potential.

## answer_c
Mechanically gated channels

## explanation_c
Incorrect. Mechanically-gated channels open in response to physical deformation of the membrane, as at a mechanoreceptor nerve ending, not in response to a change in membrane voltage along the axon shaft. They are the correct answer for a stretch- or pressure-sensing ending, not for the impulse-conducting axon membrane this question describes.

## answer_d
Voltage-gated channels

## explanation_d
Correct. The axon membrane is dominated by voltage-gated channels: once the membrane depolarises past threshold, voltage-gated sodium channels open to drive the rising phase of the action potential, and voltage-gated potassium channels then open to drive repolarisation, propagating the impulse the length of the axon. This voltage-dependent gating, rather than a chemical or mechanical stimulus, is exactly what conducting an all-or-none impulse along an axon requires.

## answer_e
Ligand-gated channels

## explanation_e
Incorrect. Ligand-gated channels open when a chemical ligand, such as a neurotransmitter, binds a receptor — this describes a synaptic (postsynaptic membrane) event, not the conduction of an impulse along the axon itself. A ligand-gated channel answers to a chemical signal rather than to the membrane-potential change the axon's own action potential creates.

## topic
Nerve physiology

## subtopic
Action potential generation

## main_concept
CON-NEU-95192B889B38A3

## concept_ids
CON-NEU-95192B889B38A3

## contextual_concept_ids
CON-NEU-77596C8A899A7E

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
50

## exam_relevance
5

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year

## years
MU_Y1

## universities
mu

## module
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Physiology

## question_only_for

## library_ids
ART-NEU-MU104-AXON-CHANNELS

## resource_ids
src_a552e2f85e495977a8d8

## learning_objective
Identify voltage-gated channels as the class located on the nerve axon that generates and conducts the action potential, distinct from ligand-gated and mechanically-gated channels.

## source_citation
MFM42Support - END MODULE MSK1 / Answers of MSK1 END, Q6 (Menoufia MED104 MSK1 end-module exam, Physiology section); MED104 Physiology department lecture (Nerve 1), pp.19-20

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text render of MFM42Support - Answers of MSK1 END.pdf p2 (Q6)
mu: MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, Q6, Physiology section

---

# Item

## id
QST-MUMED104-MSK2G1-Q01

## title
Nature of an osteolytic epiphyseal lesion with giant cells

## question
Male patient 25 years presented with osteolytic mass at the epiphysis of right tibia. The biopsy showed many osteoclastic giant cells. Which one of the following represents the nature of the lesion?

## subject
msk

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Benign process

## explanation_a
Incorrect. Calling this lesion simply benign understates its behaviour: the department's own primary-bone-tumour classification table places giant cell tumour in a separate "locally malignant" column, distinct from the benign tumours (such as osteoid osteoma) in the same table, because it is prone to local recurrence after curettage in a way a straightforwardly benign lesion is not.

## answer_b
Granulomatous inflammatory process

## explanation_b
Incorrect. A granulomatous inflammatory process (such as tuberculous osteomyelitis) can also show giant cells, but they would be Langhans-type giant cells within granulomas containing epithelioid histiocytes and caseation, not the numerous, evenly distributed osteoclast-type giant cells against a background of plump mononuclear cells that characterise a giant cell tumour; the age, epiphyseal site and clean osteolytic appearance described here fit a neoplasm, not an inflammatory granuloma.

## answer_c
Hyperplastic process

## explanation_c
Incorrect. "Hyperplastic process" describes an increase in normal cell number without the distinct neoplastic architecture (numerous multinucleated giant cells evenly distributed on a mononuclear background) or the destructive, expansile epiphyseal growth described in the stem; it does not capture the tumour's own classification.

## answer_d
Locally malignant process

## explanation_d
Correct. This presentation — an osteolytic epiphyseal mass in a young adult with numerous osteoclast-type giant cells on biopsy — is classic for giant cell tumour of bone (osteoclastoma). The department's own classification table places this tumour in a distinct "locally malignant" category, separate from both the benign and the frankly malignant primary bone tumours listed alongside it. It is locally aggressive and prone to recurrence after curettage, but it does not metastasise the way a frankly malignant sarcoma does.

## answer_e
Malignant process

## explanation_e
Incorrect. Calling the lesion outright malignant overstates it: giant cell tumour does not behave like the true primary bone sarcomas (such as osteosarcoma) in the malignant column of the same classification table, which typically show anaplastic malignant cells and metastasise; giant cell tumour is instead placed in its own intermediate, locally malignant category.

## topic
Bone tumours

## subtopic
Tumours of unknown origin

## main_concept
CON-MSK-80E36FA26C910A

## concept_ids
CON-MSK-80E36FA26C910A

## contextual_concept_ids

## difficulty
Moderate

## question_type
Diagnosis

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Clinical

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
5

## clinical_relevance
0.8

## academic_relevance
0.2

## exam_weight_by_year

## years
MU_Y1

## universities
mu

## module
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MSK2 Endmodule Group 1 > Pathology

## question_only_for

## library_ids
ART-MSK-MU104-BONE-INFECTION-TUMOR

## resource_ids
src_202ac924ca2292a7190c

## learning_objective
Recognise an osteolytic epiphyseal mass with numerous giant cells as giant cell tumour of bone and classify its behaviour as locally malignant.

## source_citation
MSK2 endmodule exam group 1 - model answer.pdf, Q1 (Menoufia MED104 MSK2 end-module exam, Pathology section); MED104 Pathology department lecture (Bone tumors, Dr Noha Elkady), p.12 and pp.44-46

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: underline, read from cached native text, MSK2 endmodule exam group 1- model answer.pdf p1, Q1
mu: MSK2 endmodule exam group 1- model answer.pdf, Q1, Pathology section

---

# Item

## id
QST-MUMED104-MSK2G1-Q03

## title
Definition of a sequestrum

## question
Sequestrum is considered which one of the following?

## subject
msk

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Dead soft tissue

## explanation_a
Incorrect. A sequestrum is specifically dead bone, not dead soft tissue; in osteomyelitis it is the bony cortex whose blood supply has been cut off by a subperiosteal abscess, and the term is reserved for that necrotic bony fragment rather than any necrotic soft tissue nearby.

## answer_b
Dead bone

## explanation_b
Correct. A sequestrum is a dead (avascular) fragment of bone, produced in osteomyelitis when a subperiosteal abscess impairs the blood supply to the underlying cortex. It is gradually separated from surrounding living bone by granulation tissue. Because it has no blood supply of its own, it appears denser (more radio-opaque) than living bone on X-ray.

## answer_c
Granulation tissue

## explanation_c
Incorrect. Granulation tissue is the vascular repair tissue that gradually separates the dead sequestrum from the surrounding living bone; it is a living, reparative structure, the functional opposite of the dead bone the sequestrum itself is defined as.

## answer_d
Newly formed bone

## explanation_d
Incorrect. Newly formed bone describes the involucrum, the sleeve of living bone the elevated periosteum lays down around the area of infection — the opposite of the sequestrum, which is dead, not newly formed.

## answer_e
Newly formed soft tissue

## explanation_e
Incorrect. "Newly formed soft tissue" fits neither the sequestrum (which is dead, not newly formed, and is bone, not soft tissue) nor the involucrum (which is newly formed bone, not soft tissue); it does not describe any of the standard osteomyelitis structures.

## topic
Osteomyelitis

## subtopic
Bone necrosis and repair in osteomyelitis

## main_concept
CON-MSK-5428B9231C2794

## concept_ids
CON-MSK-5428B9231C2794

## contextual_concept_ids

## difficulty
Easy

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Clinical

## reasoning_level
1

## inferred_difficulty
75

## exam_relevance
5

## clinical_relevance
0.8

## academic_relevance
0.2

## exam_weight_by_year

## years
MU_Y1

## universities
mu

## module
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MSK2 Endmodule Group 1 > Pathology

## question_only_for

## library_ids
ART-MSK-MU104-BONE-INFECTION-TUMOR

## resource_ids
src_60e27edc756c95033873

## learning_objective
Define a sequestrum as a dead (avascular) fragment of bone in osteomyelitis, distinct from granulation tissue and the newly formed involucrum.

## source_citation
MSK2 endmodule exam group 1 - model answer.pdf, Q3 (Menoufia MED104 MSK2 end-module exam, Pathology section); MED104 Pathology department book (Pathology of Musculoskeletal system 2), p.10

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
keySource: underline, read from cached native text, MSK2 endmodule exam group 1- model answer.pdf p1, Q3
mu: MSK2 endmodule exam group 1- model answer.pdf, Q3, Pathology section
