<!--
  SCU-FBS103 S2 minting lane, second author (scu-fbs103-author2). 14 questions reusing an existing concept (1 already live, 13 pending in other lanes' or this same lane's own unimported batches). Keys and stems read from the FOMSCU own-source quiz-app JSON; explanations rewritten in house voice, never pasted from the source JSON's own (FOMNINU-sourced) Arabic explanation field. Continues the cluster 'fbs103b' numbering from the sibling fbs103b-mints.json (q01-q27) at q28. Apply after docs/FOMSCU-Source-Imports/pending-live/SCU-FBS103-overlay-concepts.md (BATCH 4, appended by this lane) and, for the pending-concept rows, after their named source files are live — see that overlay file's own header for the exact gate command.

  Import: Admin › Bulk import → question.
-->

# Item

## id
QST-SCUFBS103-S2-A2-EMBRYO-CLOACALMEMBRANE

## title
Bilaminar caudal membrane of the embryonic disc

## question
The bilaminar area located at the most caudal part of the embryonic disc, consisting only of tightly adherent ectoderm and endoderm without intervening mesoderm, is the:

## subject
dev

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Cloacal membrane

## explanation_a
Correct. The embryonic disc has two bilaminar (mesoderm-free) membranes: the oropharyngeal membrane at the cranial end and the cloacal membrane at the caudal end. The cloacal membrane forms where ectoderm and endoderm come into direct contact with no mesoderm intervening between them, closing off the cloaca until it later ruptures to establish the definitive anal and urogenital openings.

## answer_b
Primitive streak

## explanation_b
Incorrect. The primitive streak is a linear thickening of the epiblast in the midline of the disc that marks the start of gastrulation, not a bilaminar membrane at the disc's caudal margin.

## answer_c
Oropharyngeal membrane

## explanation_c
Incorrect. The oropharyngeal membrane is the bilaminar disc's CRANIAL bilaminar membrane, not the caudal one the stem describes; the two are mirror-image structures at opposite ends of the disc.

## answer_d
Notochord

## explanation_d
Incorrect. The notochord is a solid, rod-shaped midline structure derived from the primitive node, running the length of the disc; it is neither bilaminar nor located specifically at the disc's caudal margin.

## topic
Embryology

## subtopic
Third week: the cloacal membrane

## main_concept
CON-DEV-1AAC12ECDA6AE2

## concept_ids
CON-DEV-1AAC12ECDA6AE2

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

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
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-DEV-WEEK3-4-COELOM-MESODERM

## resource_ids

## learning_objective
State that the cloacal membrane is the bilaminar (ectoderm+endoderm, no mesoderm) membrane at the caudal end of the embryonic disc, mirroring the oropharyngeal membrane at the cranial end.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q31

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer "Cloacal membrane", FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q31 (repeated verbatim as EOY Final 2026 Q31); source-JSON extraction.
reuse: CON-DEV-1AAC12ECDA6AE2 is a pending concept in docs/Assiut-Source-Imports/concept/AUN-PMS-102-concepts.md, whose own label/definition ('The cloacal membrane is derived from both ectoderm and endoderm, at the site where these two layers meet without intervening mesoderm') is the same fact this stem tests; found via find-existing.mjs "cloacal membrane" and read in full before reuse.

---

# Item

## id
QST-SCUFBS103-S2-A2-EMBRYO-FORTYSPERMCELLS

## title
Sperm yield from ten primary spermatocytes

## question
How many mature sperm cells will eventually form from 10 primary spermatocyte cells?

## subject
dev

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
10 sperm cells

## explanation_a
Incorrect. 10 sperm cells would mean each primary spermatocyte yielded only one sperm, which describes oogenesis (where polar bodies are discarded and only one functional gamete survives per primary oocyte), not spermatogenesis, where every meiotic product survives as a functional gamete.

## answer_b
20 sperm cells

## explanation_b
Incorrect. 20 sperm cells would mean each primary spermatocyte yielded two sperm, accounting for only the first meiotic division (which produces two secondary spermatocytes); it omits the second meiotic division, which doubles that number again.

## answer_c
30 sperm cells

## explanation_c
Incorrect. 30 is not a multiple that matches spermatogenesis's fixed 1-to-4 ratio between primary spermatocyte and mature sperm; it does not correspond to any single, complete meiotic step being counted or omitted.

## answer_d
40 sperm cells

## explanation_d
Correct. Spermatogenesis is symmetric at every division: a primary spermatocyte completes the first meiotic division to yield two secondary spermatocytes, and each secondary spermatocyte completes the second meiotic division to yield two spermatids, for four spermatids (and, after spermiogenesis, four mature sperm) per original primary spermatocyte. Ten primary spermatocytes therefore yield 10 x 4 = 40 mature sperm cells.

## topic
Embryology

## subtopic
Spermatogenesis: sperm yield per primary spermatocyte

## main_concept
CON-DEV-B8D22B244F1E15

## concept_ids
CON-DEV-B8D22B244F1E15

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

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
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-DEV-WEEK1-2-CLEAVAGE-BILAMINAR

## resource_ids

## learning_objective
Calculate mature sperm yield from a given number of primary spermatocytes, using the fixed 1-to-4 ratio that follows from spermatogenesis being symmetric at both meiotic divisions.

## source_citation
FOMSCU Foundation 2, Formative 2025, Q8

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer "40 sperm cells", FOMSCU Foundation 2 QBank
fomscu: Formative 2025 Q8; source-JSON extraction.
reuse: CON-DEV-B8D22B244F1E15 is a pending concept in this lane's own docs/FOMSCU-Source-Imports/concept/SCU-FBS102-s2-author5-mint-concepts.md (FOMSCU Foundation 1, first author lane), whose label 'A single primary spermatocyte gives rise to four spermatids (and ultimately four sperm) after completing meiosis' is the exact fact behind this arithmetic; found via find-existing.mjs "primary spermatocyte" and read in full before reuse. Already universities: scu — only the SCU-FBS103 module tag is added here.

---

# Item

## id
QST-SCUFBS103-S2-A2-EMBRYO-INTRAEMBRYONICCOELOMSPLIT

## title
Cavity enclosed by the split lateral plate mesoderm

## question
After differentiation, the lateral plate mesoderm splits to enclose which of the following cavities?

## subject
dev

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
The amniotic cavity

## explanation_a
Incorrect. The amniotic cavity forms by cavitation within the epiblast during the second week, well before lateral plate mesoderm splits during the third week; it is not the cavity created by that splitting.

## answer_b
The intraembryonic coelom

## explanation_b
Correct. During the third week, isolated spaces appear within the lateral plate mesoderm and coalesce, splitting it into two layers: a somatic (parietal) layer continuous with the amnion's mesoderm, and a splanchnic (visceral) layer continuous with the yolk sac's mesoderm. The horseshoe-shaped space enclosed between these two split layers is the intraembryonic coelom, which later gives rise to the pericardial, pleural and peritoneal cavities.

## answer_c
The primary yolk sac

## explanation_c
Incorrect. The primary yolk sac forms earlier and by a different mechanism, when Heuser's membrane lines the blastocyst cavity directly, not by the lateral plate mesoderm splitting.

## answer_d
The neural tube

## explanation_d
Incorrect. The neural tube forms by the neural folds fusing dorsally, a process in the ectoderm/neuroectoderm, unrelated to the lateral plate mesoderm splitting that creates the intraembryonic coelom.

## topic
Embryology

## subtopic
Third week: intraembryonic coelom from split lateral plate mesoderm

## main_concept
CON-DEV-65C2AEF8C5DB47

## concept_ids
CON-DEV-65C2AEF8C5DB47

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

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
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-DEV-WEEK3-4-COELOM-MESODERM

## resource_ids

## learning_objective
State that lateral plate mesoderm splits into somatic and splanchnic layers, enclosing the intraembryonic coelom between them.

## source_citation
FOMSCU Foundation 2, EOY Final 2025, Q14

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer "The intraembryonic coelom", FOMSCU Foundation 2 QBank
fomscu: EOY Final 2025 Q14; source-JSON extraction.
reuse: CON-DEV-65C2AEF8C5DB47 (live, kau) label 'Coelom splits lateral-plate mesoderm' is the exact fact this stem tests; found via find-existing.mjs "lateral plate mesoderm splits intraembryonic coelom" phrasing miss, then confirmed directly in the live concept graph JSON and read in full before reuse. universityIds currently ['kau'] only — this is the first scu tag onto this record.

---

# Item

## id
QST-SCUFBS103-S2-A2-HIST-PSEUDOUNIPOLARLOCATION

## title
Location of pseudounipolar nerve cells

## question
Where could the pseudounipolar nerve cells be typically found in the nervous system?

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
Cerebellar cortex layers

## explanation_a
Incorrect. The cerebellar cortex is populated by other cell types entirely, most notably the large multipolar Purkinje cells, not the pseudounipolar cell type this stem asks about.

## answer_b
Retina of the human eye

## explanation_b
Incorrect. The retina's bipolar cells (a distinct morphological class with two processes, one at each pole) relay signals from photoreceptors to ganglion cells; pseudounipolar cells are not the type found there.

## answer_c
Anterior horn of the spinal cord

## explanation_c
Incorrect. The anterior (ventral) horn of the spinal cord contains large multipolar motor neurons, with one axon and many dendrites, a different morphological class from the pseudounipolar cell.

## answer_d
Dorsal root spinal ganglion

## explanation_d
Correct. Nerve cell shape follows from the number of processes leaving the cell body, and human sensory ganglion cells — including those of the spinal (dorsal root) ganglia — have a single process that divides at once into two branches, making them strictly pseudounipolar. This is exactly why pseudounipolar cells are the type characteristically found in the dorsal root spinal ganglion.

## topic
Histology

## subtopic
Nerve cell classification: pseudounipolar neurons of the dorsal root ganglion

## main_concept
CON-FND-14D80DE53DE835

## concept_ids
CON-FND-14D80DE53DE835

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

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
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-HIS-NEUROGLIA-NERVE-SHEATHS

## resource_ids

## learning_objective
State that pseudounipolar neurons, whose single process divides into two branches, are characteristically found in the dorsal root (spinal) sensory ganglia.

## source_citation
FOMSCU Foundation 2, Formative 2025, Q11

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer "Dorsal root spinal ganglion", FOMSCU Foundation 2 QBank
fomscu: Formative 2025 Q11; source-JSON extraction.
reuse: CON-FND-14D80DE53DE835 (Kasr docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md, pending) states that spinal and cranial sensory ganglion cells are strictly pseudounipolar, the exact fact this stem tests; found via find-existing.mjs "pseudounipolar" and read in full. Two Alexandria hits (CON-NEU-198D75A4CF7391 oval cell shape, CON-NEU-1BC546A68F8A0F central nucleus position) were also read and rejected as testing a different, narrower morphological detail, not this location fact.

---

# Item

## id
QST-SCUFBS103-S2-A2-HIST-PSEUDOUNIPOLARDRGTYPEA

## title
Neuron type found in the dorsal root ganglia (phrasing A)

## question
Which specific type of neurons is characteristically found in the dorsal root ganglia?

## subject
neuro

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Bipolar neurons

## explanation_a
Incorrect. Bipolar neurons, with one process at each end of the cell body, are the type found in the retina, and in the vestibular and cochlear (auditory) ganglia, not the dorsal root ganglia.

## answer_b
Multipolar neurons

## explanation_b
Incorrect. Multipolar neurons, with one axon and many dendrites, are the commonest neuron shape overall (as in spinal motor neurons and Purkinje cells) but are not the type populating the dorsal root ganglia.

## answer_c
Pseudounipolar neurons

## explanation_c
Correct. Dorsal root (spinal) ganglion cell bodies have a single process leaving the cell body that splits immediately into two branches — one peripheral, one central — making them, strictly speaking, pseudounipolar rather than truly unipolar. This pseudounipolar shape is the classification specifically taught for sensory (dorsal root and cranial) ganglion neurons.

## answer_d
Unipolar neurons

## explanation_d
Incorrect. "Unipolar" as a strict, single-undivided-process cell is essentially not seen in the adult human; the human sensory ganglion cell that develops from an originally bipolar precursor ends up pseudounipolar, not truly unipolar, which is why the more precise term is used for this option to be wrong.

## topic
Histology

## subtopic
Nerve cell classification: pseudounipolar neurons of the dorsal root ganglion

## main_concept
CON-FND-14D80DE53DE835

## concept_ids
CON-FND-14D80DE53DE835

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

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
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-HIS-NEUROGLIA-NERVE-SHEATHS

## resource_ids

## learning_objective
State that pseudounipolar neurons are characteristically found in the dorsal root ganglia, distinguishing pseudounipolar from truly unipolar, bipolar and multipolar shapes.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q21

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer "Pseudounipolar neurons", FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q21 (repeated verbatim as EOY Final 2026 Q21); source-JSON extraction.
reuse: Same CON-FND-14D80DE53DE835 as fbs103b-q31 — the converse framing of the same pseudounipolar/dorsal-root-ganglion fact; triage-keys.txt logs 2 distinct source questions sharing the auto-generated key 'histology-pseudounipolar-neurons' (this one and fbs103b-q33), split here by the pure-numeric -qNN cluster convention.

---

# Item

## id
QST-SCUFBS103-S2-A2-HIST-PSEUDOUNIPOLARDRGTYPEB

## title
Neuron type composing the dorsal root ganglia (phrasing B)

## question
Which of the following neurons are composing the dorsal root ganglia?

## subject
neuro

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Unipolar neurons

## explanation_a
Incorrect. A strictly unipolar cell (a single process that never divides) is essentially not the pattern seen in the human dorsal root ganglion; the human sensory ganglion cell's single process divides into two branches, which is what makes the correct classification pseudounipolar rather than unipolar.

## answer_b
Bipolar neurons

## explanation_b
Incorrect. Bipolar neurons (two separate processes, one at each pole of the cell body) populate the retina and the vestibulocochlear ganglia, not the dorsal root ganglia.

## answer_c
Pseudounipolar neurons

## explanation_c
Correct. Dorsal root ganglion cell bodies each have a single process that divides immediately into a peripheral branch (running toward the sensory receptor) and a central branch (running into the spinal cord), which is the defining pseudounipolar shape. This shape is a specialisation from an originally bipolar embryonic precursor, whose two processes fused close to the cell body during development.

## answer_d
Multipolar neurons

## explanation_d
Incorrect. Multipolar neurons, with many dendrites and a single axon, are the commonest shape in the nervous system generally (motor neurons, Purkinje cells) but are not the shape composing the dorsal root ganglia.

## topic
Histology

## subtopic
Nerve cell classification: pseudounipolar neurons of the dorsal root ganglion

## main_concept
CON-FND-14D80DE53DE835

## concept_ids
CON-FND-14D80DE53DE835

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

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
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-HIS-NEUROGLIA-NERVE-SHEATHS

## resource_ids

## learning_objective
State that pseudounipolar neurons compose the dorsal root ganglia, developing from an originally bipolar precursor whose processes fused close to the cell body.

## source_citation
FOMSCU Foundation 2, EOY Final 2025, Q21

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer "Pseudounipolar neurons", FOMSCU Foundation 2 QBank
fomscu: EOY Final 2025 Q21; source-JSON extraction.
reuse: Same CON-FND-14D80DE53DE835 as fbs103b-q31/q32 — second of 2 distinct source questions sharing the auto-generated triage key 'histology-pseudounipolar-neurons'.

---

# Item

## id
QST-SCUFBS103-S2-A2-HIST-MULTIPOLARSYMPATHETICGANGLIA

## title
Neuron classification in autonomic sympathetic ganglia

## question
The neurons that make up the autonomic sympathetic ganglia are classified morphologically as:

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
Unipolar neurons

## explanation_a
Incorrect. Unipolar (or strictly, pseudounipolar) neurons are the sensory ganglion pattern (dorsal root and cranial sensory ganglia), a morphology built for relaying one sensory line, not the pattern seen in autonomic motor ganglia.

## answer_b
Bipolar neurons

## explanation_b
Incorrect. Bipolar neurons, with one process at each end of the cell body, populate special-sense pathways such as the retina and the vestibulocochlear ganglia, not the autonomic sympathetic ganglia.

## answer_c
Pseudounipolar neurons

## explanation_c
Incorrect. Pseudounipolar is the sensory ganglion shape, not the autonomic ganglion shape; autonomic ganglion cells are postganglionic motor neurons with an irregular, stellate cell body and multiple processes, morphologically closer to other multipolar neurons than to sensory ganglion cells.

## answer_d
Multipolar neurons

## explanation_d
Correct. Nerve cell shape follows the number of processes leaving the cell body, and a multipolar cell — with one axon and many dendrites — is the pattern used wherever many inputs must be integrated and a motor output produced, which includes both the motor cells of the spinal cord's ventral horn and the postganglionic neurons of the autonomic (including sympathetic) ganglia. The autonomic sympathetic ganglion neuron's irregular, multipolar shape reflects this same general classification rule, extended from the spinal-cord example to the peripheral autonomic ganglion.

## topic
Histology

## subtopic
Nerve cell classification: multipolar neurons of the autonomic sympathetic ganglia

## main_concept
CON-FND-14D80DE53DE835

## concept_ids
CON-FND-14D80DE53DE835

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

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
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-HIS-NEUROGLIA-NERVE-SHEATHS

## resource_ids

## learning_objective
Classify autonomic (sympathetic) ganglion neurons as multipolar, extending the same process-count classification rule used for spinal motor neurons.

## source_citation
FOMSCU Foundation 2, EOY Final 2025, Q15

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer "Multipolar neurons", FOMSCU Foundation 2 QBank
fomscu: EOY Final 2025 Q15; source-JSON extraction.
reuse: Same CON-FND-14D80DE53DE835 as fbs103b-q31-q33/q35 — its own definition names the ventral-horn motor neuron and Purkinje cell as multipolar examples, not autonomic ganglion cells by name, so this reuse extends the concept's own worked example set to autonomic ganglia rather than restating an already-named instance; recorded as a lower-confidence extension in the overlay row's own field_notes.

---

# Item

## id
QST-SCUFBS103-S2-A2-HIST-MULTIPOLARAXONCOUNT

## title
Axon count of a typical multipolar neuron

## question
How many axons does a typical multipolar neuron possess?

## subject
neuro

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Two

## explanation_a
Incorrect. A multipolar neuron does not have two axons; two is not the number that names any of the standard morphological neuron classes on the axon side of the count.

## answer_b
One

## explanation_b
Correct. A multipolar neuron is defined by having more than two processes leaving the cell body, but the multiplicity applies only to its dendrites, not its axon: like every other neuron shape, it has exactly one axon and, in the multipolar type specifically, many dendrites. This single-axon rule holds across essentially all neuron morphologies (unipolar, bipolar, pseudounipolar and multipolar alike); what varies between the classes is dendrite number, not axon number.

## answer_c
Three

## explanation_c
Incorrect. Three axons is not a real neuron pattern; regardless of how many dendrites a neuron has, it possesses a single axon, so the axon count itself is never three.

## answer_d
Multiple

## explanation_d
Incorrect. "Multiple" describes the multipolar neuron's DENDRITE count correctly, but this stem specifically asks about axons, and every neuron — multipolar included — has only one axon, not multiple.

## topic
Histology

## subtopic
Nerve cell classification: single-axon rule in the multipolar neuron

## main_concept
CON-FND-14D80DE53DE835

## concept_ids
CON-FND-14D80DE53DE835

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

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
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-HIS-NEUROGLIA-NERVE-SHEATHS

## resource_ids

## learning_objective
State that a multipolar neuron, though it has many dendrites, possesses only one axon, matching the single-axon rule that holds across all neuron morphologies.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q52

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer "One", FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q52; source-JSON extraction.
reuse: Same CON-FND-14D80DE53DE835 as fbs103b-q31-q34 — its own definition states the multipolar cell has 'one axon and many dendrites', directly supplying this stem's answer. Automated find-existing pass during S3 triage hit unrelated ECG-lead/cardiac-cycle-timing records on the bare answer word 'one' (per coverage/SCU-FBS103-triage.md); this reuse instead follows the multipolar-classification concept read in full, not the bare-word match.

---

# Item

## id
QST-SCUFBS103-S2-A2-HIST-MICROGLIAPHAGOCYTICROLE

## title
Functional role of microglial cells

## question
Microglial cells in the central nervous system are primarily recognized for their role as:

## subject
neuro

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Myelin-forming cells

## explanation_a
Incorrect. Myelination of central axons is the job of oligodendrocytes, a neuroectoderm-derived glial cell entirely separate from microglia, which are of mesodermal (monocyte-precursor) origin.

## answer_b
Phagocytic cells

## explanation_b
Correct. Unlike the other neuroglia, which are neuroectodermal, microglia derive from monocyte/macrophage precursors, making them members of the mononuclear phagocytic system and the CNS's resident phagocytes and immune cells. This phagocytic, immune-surveillance role is the feature that defines microglia and sets them apart functionally from the other three glial cell types.

## answer_c
Cerebrospinal fluid-producing cells

## explanation_c
Incorrect. Cerebrospinal fluid is produced by choroid plexus epithelium and circulated with the help of ciliated ependymal cells lining the ventricles, not by microglia.

## answer_d
Neurotransmitter-secreting cells

## explanation_d
Incorrect. Secreting neurotransmitters is the job of neurons at their synapses, not of microglia, which are a supporting immune/phagocytic cell type rather than a signal-transmitting one.

## topic
Histology

## subtopic
Neuroglia: microglia as the CNS's resident phagocytes

## main_concept
CON-NEU-93CD087BDE3F7B

## concept_ids
CON-NEU-93CD087BDE3F7B

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

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
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-HIS-NEUROGLIA-NERVE-SHEATHS

## resource_ids

## learning_objective
State that microglia, derived from monocyte/macrophage precursors, are the CNS's resident phagocytes, distinguishing their role from astrocytes, oligodendrocytes and ependymal cells.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q22

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer "Phagocytic cells", FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q22 (repeated verbatim as EOY Final 2026 Q22); source-JSON extraction.
reuse: CON-NEU-93CD087BDE3F7B (docs/Alexandria-Source-Imports/concept/AU-MED-105-histology-concepts.md, also mirrored in docs/import-ready/concept/AU-MED-105-histology-concepts.md, pending) covers exactly this fact in its explicit_objective ('Assign each of the four neuroglial cell types to its distinguishing function... phagocytosis...'); found via find-existing.mjs "astrocyte" and read in full before reuse.

---

# Item

## id
QST-SCUFBS103-S2-A2-HIST-MICROGLIADEBRISREMOVAL

## title
Microglial function: removing cellular debris

## question
Which of the following statements best describes the function of microglia in the central nervous system?

## subject
neuro

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
They form the myelin sheath around central axons

## explanation_a
Incorrect. Central myelination is performed by oligodendrocytes, not microglia; each oligodendrocyte can myelinate multiple axon segments, a job entirely separate from microglia's immune surveillance role.

## answer_b
They secrete cerebrospinal fluid

## explanation_b
Incorrect. CSF secretion is performed by the choroid plexus (specialised ependymal epithelium), not by microglia, which have no secretory role in CSF production.

## answer_c
They act as phagocytic cells to remove cellular debris

## explanation_c
Correct. As the CNS's resident monocyte/macrophage-derived cells, microglia continuously survey the neural tissue and, on detecting injury, infection or dying cells, become activated phagocytes that engulf and remove cellular debris, dead cells and pathogens. This ongoing phagocytic surveillance and clean-up role is the defining function of microglia.

## answer_d
They provide structural support to the blood-brain barrier

## explanation_d
Incorrect. Structural support to the blood-brain barrier is provided by astrocyte end-feet inducing and maintaining the tight junctions of capillary endothelium, not by microglia, whose role is immune/phagocytic rather than structural.

## topic
Histology

## subtopic
Neuroglia: microglial phagocytosis of cellular debris

## main_concept
CON-NEU-93CD087BDE3F7B

## concept_ids
CON-NEU-93CD087BDE3F7B

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

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
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-HIS-NEUROGLIA-NERVE-SHEATHS

## resource_ids

## learning_objective
State that microglia act as phagocytic cells removing cellular debris, distinguishing this role from astrocyte, oligodendrocyte and ependymal/choroid-plexus functions.

## source_citation
FOMSCU Foundation 2, EOY Final 2025, Q13

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer "They act as phagocytic cells to remove cellular debris", FOMSCU Foundation 2 QBank
fomscu: EOY Final 2025 Q13; source-JSON extraction.
reuse: Same CON-NEU-93CD087BDE3F7B as fbs103b-q36 — the converse framing (function description vs role label) of the same microglia-phagocytosis fact.

---

# Item

## id
QST-SCUFBS103-S2-A2-PARA-HETEROPHYESFISHTRANSMISSION

## title
Transmission route of Heterophyes heterophyes

## question
Heterophyes heterophyes is transmitted to humans by:

## subject
inf

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Skin penetration by cercariae

## explanation_a
Incorrect. Skin penetration by cercariae is the transmission route for Schistosoma species, not Heterophyes heterophyes, whose infective stage for humans is instead an encysted metacercaria taken in by mouth, not through the skin.

## answer_b
Eating undercooked infected fish

## explanation_b
Correct. Heterophyes heterophyes is transmitted to humans by eating raw or undercooked fresh-water or brackish-water fish carrying the parasite's encysted metacercarial stage, most notably mullet (Mugil species) as its second intermediate host. It belongs to a small group of fish-borne trematodes, alongside Metagonimus yokogawi and Diphyllobothrium latum, that share this same fish-ingestion route of transmission.

## answer_c
Bite of an infected mosquito

## explanation_c
Incorrect. Mosquito bite transmission is the route for vector-borne diseases such as malaria or filariasis, not for Heterophyes heterophyes, which is acquired orally rather than through an insect bite.

## answer_d
Inhalation of infectious droplets

## explanation_d
Incorrect. Inhalation of infectious droplets is a respiratory transmission route relevant to airborne pathogens, not to a food-borne intestinal trematode like Heterophyes heterophyes, which infects via ingestion, not inhalation.

## topic
Parasitology

## subtopic
Trematodes: fish-borne transmission of Heterophyes heterophyes

## main_concept
CON-GIT-E20B95815074E4

## concept_ids
CON-GIT-E20B95815074E4

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

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
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-PAR-LIFE-CYCLES-TERMINOLOGY

## resource_ids

## learning_objective
State that Heterophyes heterophyes is transmitted by eating undercooked fish carrying encysted metacercariae, grouping it with the other fish-borne helminths.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q36

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer "Eating undercooked infected fish", FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q36; source-JSON extraction.
reuse: CON-GIT-E20B95815074E4 (docs/Helwan-Source-Imports/concept/HU-GIT-301-parasitology-concepts.md, pending) explicit_objective is 'List the helminths transmitted to man through eating fish', naming Heterophyes heterophyes first; found via find-existing.mjs "heterophyes" and read in full before reuse.

---

# Item

## id
QST-SCUFBS103-S2-A2-PARA-HYMENOLEPISNANASKINPENETRATION

## title
Incorrect infection mode for Hymenolepis nana's direct cycle

## question
In the direct life cycle of Hymenolepis nana, which of the following represents an incorrect mode of infection in humans?

## subject
inf

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Skin penetration by larva

## explanation_a
Correct. Hymenolepis nana completes its entire life cycle within a single human host: an ingested egg hatches in the small intestine, releases an oncosphere that penetrates a villus and develops there into a cysticercoid larva, which then emerges and matures into an adult worm. Every recognised route of human infection in this direct cycle is oral (ingestion), so skin penetration by a larva — the route used by Strongyloides stercoralis and hookworms, not Hymenolepis nana — is the one mode that does NOT belong to this species' cycle.

## answer_b
Internal autoinfection

## explanation_b
Incorrect. Internal autoinfection is a genuine, well-recognised route for Hymenolepis nana: eggs released by an adult worm can hatch and re-infect the same host internally, within the intestine, without ever leaving the body — this is exactly why H. nana can reach very high worm burdens in a single untreated host.

## answer_c
External autoinfection

## explanation_c
Incorrect. External autoinfection is also a genuine route: eggs passed in the stool can be ingested by the same individual (via faecal-oral contamination, common in children), re-infecting the original host after briefly leaving the body.

## answer_d
Ingestion of embryonated eggs

## explanation_d
Incorrect. Ingestion of embryonated eggs (from a contaminated source, or another infected person's stool) is the standard, most common route of infection for Hymenolepis nana, and is a genuine part of its direct cycle, not the incorrect option the stem is asking for.

## topic
Parasitology

## subtopic
Cestodes: Hymenolepis nana's direct life cycle and autoinfection

## main_concept
CON-GIT-2FCF45AE17574F

## concept_ids
CON-GIT-2FCF45AE17574F

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

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
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-PAR-LIFE-CYCLES-TERMINOLOGY

## resource_ids

## learning_objective
State that Hymenolepis nana's direct cycle infects only by ingestion (of eggs, or via internal/external autoinfection), never by skin penetration.

## source_citation
FOMSCU Foundation 2, EOM MID 2026, Q3

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer "Skin penetration by larva", FOMSCU Foundation 2 QBank
fomscu: EOM MID 2026 Q3 (repeated verbatim as EOY Final 2026 Q3); source-JSON extraction.
reuse: CON-GIT-2FCF45AE17574F (docs/Helwan-Source-Imports/concept/HU-GIT-301-parasitology-concepts.md, pending) explains H. nana's direct, no-intermediate-host cycle with its cysticercoid larval stage enabling autoinfection — the exact mechanism underlying this stem's correct/incorrect infection-mode judgement; found via find-existing.mjs "hymenolepis nana" and read in full before reuse.

---

# Item

## id
QST-SCUFBS103-S2-A2-PHARM-FULLAGONISTMAXIMALEFFECT

## title
Ligand producing maximal effect with high efficacy

## question
Which of the following represents the effect of a drug that produces maximal effects and has high efficacy?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Partial agonist

## explanation_a
Incorrect. A partial agonist binds with affinity but produces only a submaximal response however much drug is given, the opposite of the maximal-effect, high-efficacy pattern this stem describes.

## answer_b
Competitive antagonist

## explanation_b
Incorrect. A competitive antagonist binds with affinity but has no efficacy of its own; it produces no effect by itself and instead works only by competing with an agonist for the same receptor.

## answer_c
Full agonist

## explanation_c
Correct. A full agonist binds a receptor and produces the maximum response the receptor is capable of giving. This is described as high, or maximal, efficacy. It stands in contrast to a partial agonist's fixed submaximal ceiling and to an antagonist's complete lack of intrinsic effect.

## answer_d
Irreversible antagonist

## explanation_d
Incorrect. An irreversible antagonist binds the receptor essentially permanently (often covalently) and, like a competitive antagonist, has no efficacy of its own; its distinguishing feature is the non-reversible nature of its binding, not any maximal effect of its own.

## topic
Pharmacology

## subtopic
Receptor pharmacology: full agonist efficacy

## main_concept
CON-FND-4388E0D8A75FD4

## concept_ids
CON-FND-4388E0D8A75FD4

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

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
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-PHARM-RECEPTORS-ADR-CLASSIFICATION

## resource_ids

## learning_objective
State that a full agonist produces the maximum response the receptor can give (high efficacy), distinguishing it from a partial agonist's submaximal ceiling and an antagonist's zero efficacy.

## source_citation
FOMSCU Foundation 2, EOY Final 2025, Q27

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer "Full agonist", FOMSCU Foundation 2 QBank
fomscu: EOY Final 2025 Q27; source-JSON extraction.
reuse: CON-FND-4388E0D8A75FD4 (docs/Kasr-Source-Imports/concept/108-INT-concepts-pharmacology.md, pending) already carries a +scu overlay row in pending-live/SCU-FBS103-overlay-concepts.md from this lane's first author's Q47 question (fbs103b's sibling MID 2026 phrasing was already authored in SCU-FBS103-questions.md per coverage/SCU-FBS103-triage-keys.txt); this is the second, distinct EOY 2025 Q27 phrasing sharing the same 'pharmacology-full-agonist' triage key, reusing the SAME concept id and the SAME existing overlay row — no new overlay row added for this id.

---

# Item

## id
QST-SCUFBS103-S2-A2-PHARM-PARTIALAGONISTSUBMAXIMAL

## title
Ligand producing a submaximal, dose-independent effect

## question
Which of the following drugs binds to a receptor and produces a submaximal effect, exhibiting moderate efficacy regardless of the dose?

## subject
pharm

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Partial agonist

## explanation_a
Correct. A partial agonist binds a receptor with affinity but produces only a submaximal response, however much of the drug is given — its efficacy ceiling is fixed below the maximum the receptor can give, which is why increasing the dose further cannot push the effect any higher. In the presence of a full agonist, a partial agonist actually behaves as a functional antagonist, since it occupies receptors without triggering the full response the full agonist would otherwise produce.

## answer_b
Full agonist

## explanation_b
Incorrect. A full agonist produces the maximum response the receptor can give (high efficacy), the opposite of the submaximal, dose-independent ceiling this stem describes for a partial agonist.

## answer_c
Competitive antagonist

## explanation_c
Incorrect. A competitive antagonist has no efficacy of its own at all — it produces no response by itself, however much is given — rather than the moderate, submaximal-but-nonzero response a partial agonist produces.

## answer_d
Inverse agonist

## explanation_d
Incorrect. An inverse agonist does not merely fail to reach maximal effect; it actively produces the OPPOSITE of the agonist's effect by reducing the receptor's baseline constitutive activity, a qualitatively different action from a partial agonist's submaximal-but-same-direction effect.

## topic
Pharmacology

## subtopic
Receptor pharmacology: partial agonist efficacy

## main_concept
CON-FND-4388E0D8A75FD4

## concept_ids
CON-FND-4388E0D8A75FD4

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

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
SCU_Y1

## universities
scu

## module
SCU-FBS103

## module_subject

## question_only_for

## library_ids
ART-SCU-FBS103-PHARM-RECEPTORS-ADR-CLASSIFICATION

## resource_ids

## learning_objective
State that a partial agonist produces a fixed submaximal response regardless of dose, and behaves as a functional antagonist when a full agonist is also present.

## source_citation
FOMSCU Foundation 2, EOY Final 2025, Q3

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer "Partial agonist", FOMSCU Foundation 2 QBank
fomscu: EOY Final 2025 Q3; source-JSON extraction.
reuse: Same CON-FND-4388E0D8A75FD4 and same existing overlay row as fbs103b-q40 — find-existing.mjs "partial agonist" surfaced this same id directly; no new overlay row needed, matching the standing rule to extend rather than duplicate an existing +scu row for the same id.
