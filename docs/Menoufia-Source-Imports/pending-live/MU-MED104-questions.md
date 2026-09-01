<!--
  MU-MED104 pending-live · questions whose main concept is a Kasr/Alexandria overlay id
  (docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md,
  docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md,
  docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md,
  docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md,
  docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md,
  docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-metabolism-concepts.md).
  All 9 records are from the same MFM 42 Support end-module MSK1 exam
  (Biochemistry Q1/Q3, Physiology Q7/Q8, Histology Q23/Q25/Q26/Q27/Q28),
  keyed from the paired "MFM42Support - Answers of MSK1 END.pdf" — red-text
  visual key, confirmed by render (pages 1, 2, 7, 8; text layer carries no key
  marking at all, per LANE-CARD.md §7). Apply after:

    1. The concept-overlay rows in
       pending-live/MU-MED104-concepts-overlay.md land on the six source files
       above (adds +mu / +MU_Y1 / +MU-MED104 to each targeted concept id).
    2. Every teaching article named in each record's library_ids is live
       (103-BMS-histology.md, 103-BMS-physiology.md, 103-BMS-mcq-vitamins-nerve.md,
       101-ISK-histology-2.md, 102-INT-biochemistry.md,
       AU-MED-102-biochem-metabolism-articles.md).

  Simulate together with the six concept files + the overlay file, e.g.:
    npm run medical:simulate -- \
      docs/Kasr-Source-Imports/concept/103-BMS-histology-concepts.md \
      docs/Kasr-Source-Imports/concept/103-BMS-physiology-concepts.md \
      docs/Kasr-Source-Imports/concept/103-BMS-mcq-vitamins-nerve-concepts.md \
      docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
      docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md \
      docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-metabolism-concepts.md \
      docs/Menoufia-Source-Imports/pending-live/MU-MED104-concepts-overlay.md \
      docs/Menoufia-Source-Imports/pending-live/MU-MED104-questions.md \
      --emit /tmp/sim-MU-MED104-pending.json

  Import: Admin › Bulk import → question.
-->

# Item

## id
QST-MUMED104-MFM42MSK1-Q01

## title
Amino acid not present in collagen

## question
Which amino acid is not present in collagen?

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
Proline

## explanation_a
Incorrect. Proline is one of collagen's two signature amino acids, present at roughly one in three residues in its characteristic Gly-X-Y repeating sequence, so it is a normal constituent of collagen rather than an absent one. Its five-membered ring restricts rotation of the polypeptide backbone, which helps the triple helix hold its shape. It is therefore a defining amino acid of collagen, not the answer being sought here.

## answer_b
Hydroxyproline

## explanation_b
Incorrect. Hydroxyproline is formed by post-translational hydroxylation of proline residues within the growing collagen chain and is present in far higher amounts in collagen than in almost any other protein in the body. Its hydroxyl group forms hydrogen bonds that stabilise the assembled triple helix, which is why a deficiency of vitamin C (needed for this hydroxylation) weakens collagen. Because it is a hallmark constituent of collagen, it cannot be the missing amino acid.

## answer_c
Glycine

## explanation_c
Incorrect. Glycine occupies every third position of collagen's repeating Gly-X-Y sequence because its small side chain, a single hydrogen atom, is the only one that fits inside the crowded core of the triple helix. Without glycine at every third residue the three chains could not pack tightly enough to form the helix at all, making it collagen's most essential amino acid by proportion. It is present in the highest amount of any amino acid in collagen, not absent from it.

## answer_d
Desmosine

## explanation_d
Correct. Desmosine is not one of the twenty standard proteinogenic amino acids incorporated during translation; it is a unique cross-linking amino acid formed after synthesis from four lysine-derived side chains, and it occurs exclusively in elastin. This cross-link gives elastin its rubber-like, reversible stretch, a property collagen does not share, since collagen is instead stabilised by different, non-desmosine cross-links. Because desmosine is elastin-specific and never appears in collagen's amino acid composition, it is the correct answer.

## answer_e
Lysine

## explanation_e
Incorrect. Lysine is present in collagen and, like proline, undergoes post-translational hydroxylation to hydroxylysine, whose hydroxyl group is a site for the carbohydrate side chains that make collagen a glycoprotein. Some of collagen's lysine and hydroxylysine residues are also enzymatically converted to aldehydes that form the cross-links stabilising collagen fibrils, a different chemistry from elastin's desmosine cross-links. It is therefore a genuine collagen constituent, not the missing amino acid.

## topic
Biochemistry

## subtopic
Collagen and elastin structure

## main_concept
CON-FND-31F96EC2F609C9

## concept_ids
CON-FND-31F96EC2F609C9

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
MU_Y1=moderate

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
ART-102-BIO-PROTEINS-OF-EXTRACELLULAR-MATRIX

## resource_ids

## learning_objective
Identify desmosine as an elastin-specific cross-linking amino acid absent from collagen, and distinguish it from collagen's own signature amino acids.

## source_citation
MFM42Support - END MODULE MSK1 / Answers of MSK1 END, Q1 (Menoufia MED104 MSK1 end-module exam, Biochemistry section)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text render of MFM42Support - Answers of MSK1 END.pdf p1 (Q1)
mu: MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, Q1, Biochemistry section

---

# Item

## id
QST-MUMED104-MFM42MSK1-Q03

## title
False statement about ascorbic acid

## question
Which of the following statements is false about ascorbic acid?

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
It shows antioxidant activity

## explanation_a
Incorrect — this statement is true. Ascorbic acid does show genuine antioxidant activity: it readily donates electrons to neutralise reactive oxygen species and regenerates other antioxidants such as vitamin E, protecting cells from oxidative damage. Because this statement correctly describes ascorbic acid, it is not the false one the question asks for.

## answer_b
It is a strong reducing agent

## explanation_b
Incorrect — this statement is true. Ascorbic acid is a strong reducing agent, the same electron-donating property that gives it its antioxidant role, which is also why it can keep the iron ion in prolyl and lysyl hydroxylase in its active, reduced (Fe2+) state. Since this is an accurate statement about ascorbic acid, it is not the false statement being asked for.

## answer_c
It can be synthesized in the body

## explanation_c
Correct — this is the false statement. Humans, along with other primates and guinea pigs, lack a functional L-gulonolactone oxidase, the terminal enzyme of the glucuronic acid pathway that in most other mammals converts glucuronate onward to L-ascorbic acid. Because that one step is missing, ascorbic acid cannot be synthesised in the human body at all and must be obtained entirely from the diet, which is exactly why it is classified as a vitamin. This makes 'it can be synthesized in the body' the false statement, and so the correct answer to this EXCEPT-style question.

## answer_d
Involved in hydroxylation of poly- and lysyl- residues of collagen

## explanation_d
Incorrect — this statement is true. Ascorbic acid is an essential cofactor for prolyl hydroxylase and lysyl hydroxylase, the enzymes that hydroxylate proline and lysine residues in newly formed collagen chains; without it these hydroxylations fail, producing the unstable, poorly cross-linked collagen seen in scurvy. Because this correctly describes a real function of ascorbic acid, it is not the false statement.

## answer_e
It converted to oxalic acid

## explanation_e
Incorrect — this statement is true. A portion of ascorbic acid is catabolised through oxidative pathways that ultimately yield oxalic acid (oxalate) as an end product, which is one reason very high-dose vitamin C supplementation has been linked to a modestly increased risk of oxalate kidney stones in susceptible individuals. Since this is an accurate statement about ascorbic acid's fate in the body, it is not the false one.

## topic
Biochemistry

## subtopic
Vitamins — Ascorbic acid

## main_concept
CON-FND-6394F7DBD17F80

## concept_ids
CON-FND-6394F7DBD17F80

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

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
MU_Y1=moderate

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
ART-FND-GLUCURONIC-ACID-PATHWAY

## resource_ids

## learning_objective
State that humans cannot synthesise ascorbic acid because the terminal enzyme of the glucuronic acid pathway (L-gulonolactone oxidase) is absent, and distinguish this from ascorbic acid's genuine roles.

## source_citation
MFM42Support - END MODULE MSK1 / Answers of MSK1 END, Q3 (Menoufia MED104 MSK1 end-module exam, Biochemistry section)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text render of MFM42Support - Answers of MSK1 END.pdf p1 (Q3)
mu: MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, Q3, Biochemistry section

---

# Item

## id
QST-MUMED104-MFM42MSK1-Q07

## title
Depolarization type in uterine smooth muscle

## question
Which of the following is the type of depolarization in the muscle of the uterus?

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
Spike potential

## explanation_a
Incorrect. A spike potential is the brief (roughly 50-millisecond) smooth-muscle action potential that resembles the skeletal-muscle spike or rides on top of a slow wave, and it is the pattern typical of tissues such as the ureter and some gut segments, not the uterus. Uterine smooth muscle instead shows a much more prolonged depolarisation, so this brief spike form does not describe it.

## answer_b
Action potential with plateau

## explanation_b
Correct. Uterine smooth muscle generates an action potential with a plateau: it depolarises similarly to a spike, but its repolarisation is delayed for several hundred to several thousand milliseconds, and this prolonged plateau sustains the forceful, sustained contraction needed during labour. The plateau reflects the smooth-muscle membrane's abundant voltage-gated calcium channels and comparatively few voltage-gated sodium channels, so it is this calcium-dependent plateau form, not a brief spike, that characterises the uterus.

## answer_c
Slow-wave potential

## explanation_c
Incorrect. A slow wave is a rhythmic, sub-threshold oscillation of the resting membrane potential seen in some visceral smooth muscle such as the gut, which only triggers an action potential — usually a spike — if it reaches threshold; it is not itself an action potential and is not the uterus's own depolarisation pattern.

## answer_d
Depolarization without action potential

## explanation_d
Incorrect. Depolarisation without a propagated action potential describes a graded, local response rather than a regenerative electrical event, and it is not how uterine smooth muscle depolarises when it contracts during labour, since the uterus relies on genuine, propagating action potentials with a plateau.

## answer_e
Junctional potential

## explanation_e
Incorrect. A junctional (end-plate) potential is the graded depolarisation produced at a chemical synapse, such as the skeletal neuromuscular junction, by neurotransmitter binding; it is not a term used for uterine smooth muscle's own myogenic electrical activity, which arises intrinsically rather than from a discrete synaptic junction.

## topic
Physiology

## subtopic
Smooth muscle electrophysiology

## main_concept
CON-MSK-A10AC6BAF27F00

## concept_ids
CON-MSK-A10AC6BAF27F00

## contextual_concept_ids

## difficulty
Moderate

## question_type
Application

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
MU_Y1=moderate

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
ART-103-PHY-SMOOTH-ELECTRICAL

## resource_ids

## learning_objective
Identify the action potential with a plateau as the depolarisation form used by uterine smooth muscle, and explain why its calcium-channel basis produces the plateau.

## source_citation
MFM42Support - END MODULE MSK1 / Answers of MSK1 END, Q7 (Menoufia MED104 MSK1 end-module exam, Physiology section)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text render of MFM42Support - Answers of MSK1 END.pdf p2 (Q7)
mu: MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, Q7, Physiology section

---

# Item

## id
QST-MUMED104-MFM42MSK1-Q08

## title
Ion whose extracellular fall causes tetany

## question
Decrease the extracellular concentration of which of the following ions to 50% of normal affects the discharge in the peripheral nerves and results in Tetany?

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
Sodium

## explanation_a
Incorrect. A fall in extracellular sodium mainly shrinks the size of the action potential, since sodium influx drives its upstroke, with comparatively little effect on the resting membrane potential; it is not the classic cause of tetany and does not raise membrane excitability the way low calcium does.

## answer_b
Potassium

## explanation_b
Incorrect. Potassium governs the resting membrane potential rather than sodium permeability: a fall in extracellular potassium hyperpolarises the resting membrane and lowers excitability, producing weakness or paralysis (as in familial periodic paralysis), which is essentially the opposite clinical picture from the hyperexcitable tetany caused by low calcium.

## answer_c
Calcium

## explanation_c
Correct. Extracellular calcium normally stabilises the nerve membrane by limiting its permeability to sodium; when extracellular calcium falls, sodium permeability rises, the membrane depolarises more easily toward the firing level, and nerves become hyperexcitable. This is precisely the mechanism of hypocalcaemic tetany — spontaneous, repetitive discharge in peripheral nerves producing the involuntary muscle spasms, such as carpopedal spasm, seen clinically.

## answer_d
Magnesium

## explanation_d
Incorrect. Magnesium does influence neuromuscular excitability, but it is not the ion whose membrane-stabilising, sodium-permeability-limiting mechanism this question describes; that role, and the hyperexcitability produced when the ion falls, is classically attributed to calcium in this system.

## answer_e
Chloride

## explanation_e
Incorrect. Chloride conductance mainly affects membrane stability through its own permeability pathways rather than through the sodium-permeability mechanism described here, and a fall in extracellular chloride is not the textbook cause of tetany — that clinical picture is specifically tied to low extracellular calcium.

## topic
Physiology

## subtopic
Nerve excitability

## main_concept
CON-NEU-77596C8A899A7E

## concept_ids
CON-NEU-77596C8A899A7E

## contextual_concept_ids

## difficulty
Moderate

## question_type
Application

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
MU_Y1=moderate

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
ART-103-PHY-NERVE-ACTION-POTENTIAL

## resource_ids

## learning_objective
Explain how a fall in extracellular calcium raises nerve sodium permeability and produces hyperexcitability, and apply this to hypocalcaemic tetany.

## source_citation
MFM42Support - END MODULE MSK1 / Answers of MSK1 END, Q8 (Menoufia MED104 MSK1 end-module exam, Physiology section)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text render of MFM42Support - Answers of MSK1 END.pdf p2 (Q8)
mu: MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, Q8, Physiology section

---

# Item

## id
QST-MUMED104-MFM42MSK1-Q23

## title
Collagen fibre type ossified during bone formation

## question
The following type of CT Fibers is ossified during bone formation:

## subject
fnd

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Collagen type I

## explanation_a
Correct. Type I collagen is the commonest and strongest collagen type, arranged in thick bundles, and it is the type found in connective tissue proper, tendon and — critically here — bone, where it forms the organic (osteoid) matrix that is subsequently mineralised with calcium hydroxyapatite during ossification. Because bone's collagenous scaffold is built from type I fibres, it is this type, made by osteoblasts as well as fibroblasts elsewhere, that becomes ossified during bone formation.

## answer_b
Collagen type II

## explanation_b
Incorrect. Type II collagen forms the fine fibres of cartilage matrix, made by chondroblasts, and cartilage is avascular tissue that is not itself mineralised the way bone's type I matrix is; even where cartilage acts as a template for endochondral ossification, it is replaced by newly deposited type I collagen-containing bone rather than the type II fibres themselves becoming ossified.

## answer_c
Collagen type VI

## explanation_c
Incorrect. Type VI collagen is a minor, microfibrillar collagen that helps anchor cells within connective tissue matrix rather than forming the bulk structural fibres of bone; it is not the fibre type whose bundles are mineralised to form bony matrix.

## answer_d
Elastic fibers

## explanation_d
Incorrect. Elastic fibres give tissues such as ligament, lung and blood vessel walls their reversible stretch and recoil, a property fundamentally different from bone's rigid mineralised matrix; elastic fibres are not the substrate ossified during bone formation.

## answer_e
Reticular fibers

## explanation_e
Incorrect. Reticular fibres are fine, type III collagen fibres that form delicate supporting networks in the stroma of organs such as lymphoid tissue and liver; they are not the fibre type that is laid down and mineralised to build bone.

## topic
Histology

## subtopic
Connective tissue fibres

## main_concept
CON-FND-A635150A3F245D

## concept_ids
CON-FND-A635150A3F245D

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Histology

## question_only_for

## library_ids
ART-101-HIS-CONNECTIVE-TISSUE-FIBRES

## resource_ids

## learning_objective
State that bone's organic matrix is built from type I collagen, and distinguish it from the collagen and fibre types found in cartilage and other connective tissues.

## source_citation
MFM42Support - END MODULE MSK1 / Answers of MSK1 END, Q23 (Menoufia MED104 MSK1 end-module exam, Histology section)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text render of MFM42Support - Answers of MSK1 END.pdf p7 (Q23)
mu: MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, Q23, Histology section

---

# Item

## id
QST-MUMED104-MFM42MSK1-Q25

## title
Cartilage type containing collagen type I

## question
Which of the following types of cartilage contains collagen type I?

## subject
msk

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Hyaline cartilage

## explanation_a
Incorrect. Hyaline cartilage's matrix is built from fine type II collagen fibrils, not visible as bundles under the light microscope, together with an abundant, glassy ground substance — the same collagen type as articular and costal cartilage, not type I.

## answer_b
Elastic cartilage

## explanation_b
Incorrect. Elastic cartilage has the same basic structure as hyaline cartilage, chiefly type II collagen, but with numerous additional branching elastic fibres embedded in its matrix, which is what gives the ear pinna and epiglottis their flexibility; it is not built from type I collagen.

## answer_c
White Fibrocartilage

## explanation_c
Correct. White fibrocartilage is a tough type of cartilage, intermediate in character between hyaline cartilage and dense regular connective tissue, formed of dense type I collagen fibres arranged in thick parallel bundles with scanty ground substance. It sits at sites needing tensile strength with limited mobility — the intervertebral discs, the pubic symphysis and the menisci among them — and it is the one cartilage type built on type I rather than type II collagen.

## answer_d
Articular cartilage

## explanation_d
Incorrect. Articular cartilage is a form of hyaline cartilage covering the ends of bones at synovial joints, and like other hyaline cartilage its matrix is built on type II collagen, not type I.

## answer_e
Costal cartilage

## explanation_e
Incorrect. Costal cartilage, connecting the ribs to the sternum, is also a hyaline cartilage and so is built on type II collagen fibres, not the type I collagen bundles that characterise white fibrocartilage.

## topic
Histology

## subtopic
Cartilage types

## main_concept
CON-MSK-0F4870E557FAF4

## concept_ids
CON-MSK-0F4870E557FAF4

## contextual_concept_ids

## difficulty
Moderate

## question_type
Classification

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Histology

## question_only_for

## library_ids
ART-103-HIS-CARTILAGE-TYPES

## resource_ids

## learning_objective
Identify white fibrocartilage as the cartilage type built on type I collagen, and distinguish it from the type II collagen matrix of hyaline and elastic cartilage.

## source_citation
MFM42Support - END MODULE MSK1 / Answers of MSK1 END, Q25 (Menoufia MED104 MSK1 end-module exam, Histology section)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text render of MFM42Support - Answers of MSK1 END.pdf p8 (Q25)
mu: MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, Q25, Histology section

---

# Item

## id
QST-MUMED104-MFM42MSK1-Q26

## title
Chondroblast electron-microscope features

## question
At electron microscope level (E/M), chondroblasts show all the features of:

## subject
msk

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Absorption

## explanation_a
Incorrect. Absorption is not the electron-microscopic signature of the chondroblast; the chondroblast is a matrix-secreting cell, not one specialised for taking up and absorbing extracellular material.

## answer_b
Phagocytosis

## explanation_b
Incorrect. Phagocytosis is a feature of scavenging cells such as macrophages, which show abundant lysosomes and phagosomes; the chondroblast's ultrastructure instead reflects active synthesis and secretion, not phagocytic activity.

## answer_c
Protein Synthesis

## explanation_c
Correct. By electron microscopy the chondroblast shows all the classic features of a protein-forming cell: a euchromatic nucleus, abundant ribosomes and rough endoplasmic reticulum, a prominent Golgi apparatus, and numerous mitochondria to power this synthetic activity. This machinery matches its job, secreting the type II collagen and ground substance of cartilage matrix as it drives appositional growth from the cartilage surface.

## answer_d
Lipid Synthesis

## explanation_d
Incorrect. Lipid synthesis is not the chondroblast's defining ultrastructural feature; that description fits cells such as adipocytes or steroid-secreting cells, which show abundant smooth endoplasmic reticulum and lipid droplets, not the rough-ER-and-ribosome-dominated profile of a chondroblast.

## answer_e
Inactive cells

## explanation_e
Incorrect. Far from being inactive, the chondroblast is one of the most metabolically active cells in cartilage, its abundant rough endoplasmic reticulum, ribosomes and Golgi apparatus all pointing to vigorous ongoing protein synthesis and secretion rather than quiescence.

## topic
Histology

## subtopic
Cartilage cells

## main_concept
CON-MSK-E198B099DCA0C0

## concept_ids
CON-MSK-E198B099DCA0C0

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Histology

## question_only_for

## library_ids
ART-103-HIS-CARTILAGE-CELLS

## resource_ids

## learning_objective
State that the chondroblast's electron-microscopic features are those of a protein-forming cell (rough ER, ribosomes, Golgi, mitochondria), matching its matrix-secreting function.

## source_citation
MFM42Support - END MODULE MSK1 / Answers of MSK1 END, Menoufia MED104 MSK1 end-module exam, Histology section

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text render of MFM42Support - Answers of MSK1 END.pdf p8 (Q26)
mu: MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, Q26, Histology section

---

# Item

## id
QST-MUMED104-MFM42MSK1-Q28

## title
Cell type forming isogenous groups

## question
Isogenous groups are made of group of cells up to 8 cells of:

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
Fibrocytes

## explanation_a
Incorrect. Fibrocytes are the mature, relatively inactive cells of fibrous connective tissue and do not divide within a shared lacuna to form isogenous groups; that clustering pattern is specific to cartilage's chondrocytes.

## answer_b
Lymphocytes

## explanation_b
Incorrect. Lymphocytes are free cells of the immune system, not resident matrix-forming cells of a supporting tissue, and they play no part in forming isogenous groups.

## answer_c
Osteocytes

## explanation_c
Incorrect. Osteocytes are the mature cells of bone, each occupying its own individual lacuna within the mineralised matrix and connected to neighbours by canaliculi rather than by shared-lacuna clustering; they do not form isogenous groups the way chondrocytes do.

## answer_d
Chondrocytes

## explanation_d
Correct. Older, deeper chondrocytes divide once or twice within their lacuna to give clusters of 2 up to 8 cells, called isogenous groups (or cell nests), enclosed by a shared capsule of matrix. This clonal clustering is how cartilage achieves interstitial growth from within, as each chondrocyte in the nest continues secreting new matrix around itself.

## answer_e
Adipocytes

## explanation_e
Incorrect. Adipocytes are fat-storing cells of adipose tissue and do not cluster into isogenous groups within a cartilage lacuna; that pattern of division and clustering is, among these choices, unique to the chondrocyte.

## topic
Histology

## subtopic
Cartilage cells

## main_concept
CON-MSK-CB0E0F665E200B

## concept_ids
CON-MSK-CB0E0F665E200B

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Histology

## question_only_for

## library_ids
ART-103-HIS-CARTILAGE-CELLS

## resource_ids

## learning_objective
State that isogenous groups (cell nests of 2 to 8 cells sharing a lacuna) are formed by dividing chondrocytes, and explain their role in interstitial cartilage growth.

## source_citation
MFM42Support - END MODULE MSK1 / Answers of MSK1 END, Menoufia MED104 MSK1 end-module exam, Histology section

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text render of MFM42Support - Answers of MSK1 END.pdf p8 (Q28)
mu: MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, Q28, Histology section

---

# Item

## id
QST-MUMED104-MFM42MSK1-Q27

## title
Connective tissue that converts into spongy bone

## question
One of the following connective tissues converts into spongy bone:

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
Adipose

## explanation_a
Incorrect. Adipose tissue is specialised fat-storage connective tissue and is not a precursor tissue that ossifies into bone; it plays no role in either intramembranous or endochondral ossification.

## answer_b
Loose

## explanation_b
Incorrect. Loose (areolar) connective tissue is a general packing and support tissue found throughout the body, but it is not the specific embryonic tissue from which intramembranous ossification begins; that role belongs to mesenchymal connective tissue.

## answer_c
Mucoid

## explanation_c
Incorrect. Mucoid connective tissue, as in Wharton's jelly of the umbilical cord, is a jelly-like embryonic connective tissue adapted for cushioning and protection, not a tissue that undergoes ossification into spongy bone.

## answer_d
Mesenchymal

## explanation_d
Correct. Flat bones form by intramembranous ossification, in which mesenchymal connective tissue cells differentiate directly into osteoblasts that lay down bone matrix without a cartilage intermediate, producing spongy and ultimately compact bone. This mesenchymal-to-bone route is one of the two recognised methods of ossification, the other being endochondral ossification from a cartilage model.

## answer_e
White fibrous

## explanation_e
Incorrect. White fibrous (dense regular) connective tissue, as in tendons and ligaments, is built for tensile strength and is not the tissue that converts into bone; ossification from a soft connective tissue precursor proceeds specifically from mesenchymal tissue, not this mature fibrous type.

## topic
Histology

## subtopic
Bone ossification

## main_concept
CON-MSK-092F6F14307DB9

## concept_ids
CON-MSK-092F6F14307DB9

## contextual_concept_ids

## difficulty
Moderate

## question_type
Application

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
MU_Y1=moderate

## years
MU_Y1

## universities
mu

## module
MU-MED104

## module_subject
MU-MED104 > 00 Module-wide > 06 EOM Exams > MFM 42 Support > Histology

## question_only_for

## library_ids
ART-103-HIS-BONE-OSSIFICATION

## resource_ids

## learning_objective
State that mesenchymal connective tissue converts directly into bone by intramembranous ossification, and distinguish it from the endochondral route and from non-osteogenic connective tissues.

## source_citation
MFM42Support - END MODULE MSK1 / Answers of MSK1 END, Q27 (Menoufia MED104 MSK1 end-module exam, Histology section)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
keySource: red-text render of MFM42Support - Answers of MSK1 END.pdf p8 (Q27)
mu: MFM42Support - END MODULE MSK1.pdf / Answers of MSK1 END.pdf, Q27, Histology section
