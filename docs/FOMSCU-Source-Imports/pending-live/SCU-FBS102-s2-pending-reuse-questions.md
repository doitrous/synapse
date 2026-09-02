<!--
  SCU-FBS102 S2 minting — third author lane (scu-fbs102-author3). 10 questions whose 'new' triage tag did not survive a closer grep pass past find-existing.mjs's first-line-only pending-batch scan — each overlays an existing concept from another module's own pending batch (sparse SCU tags in the sibling overlay-concepts.md, not a full record). Apply each question only after both docs/FOMSCU-Source-Imports/pending-live/SCU-FBS102-overlay-concepts.md and, per question, the specific source module concept file named in its own field_notes 'apply after' line.

  Import: Admin › Bulk import → question.
-->

# Item

## id
QST-SCUFBS102-S2-PENDING-BIOCHEMISTRY-ACYL-COA-SYNTHETASE

## title
The enzyme that activates fatty acids for beta oxidation

## question
In the beta oxidation process the initial activation of fatty acids takes place by the action of which specific enzyme?

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
The highly specific initial acyl CoA dehydrogenase enzyme

## explanation_a
Incorrect. Acyl-CoA dehydrogenase acts later, inside the mitochondrion, catalysing the first oxidation step of the beta-oxidation spiral itself — not the initial activation step in the cytosol.

## answer_b
The primary active carnitine acyltransferase one

## explanation_b
Incorrect. Carnitine palmitoyltransferase I (CPT-I) acts after activation, exchanging CoA for carnitine on the outer mitochondrial membrane to begin transport, not activation itself.

## answer_c
Acyl CoA synthetase

## explanation_c
Correct. Before a fatty acid can be oxidised it must be activated: acyl-CoA synthetase (thiokinase) joins it to coenzyme A in the cytosol, spending one ATP (converted to AMP and pyrophosphate) so that two high-energy bonds are consumed. Only after this activation step can the carnitine shuttle carry the resulting acyl-CoA into the mitochondrion for beta oxidation.

## answer_d
The secondary specialized carnitine acyltransferase two

## explanation_d
Incorrect. Carnitine palmitoyltransferase II (CPT-II) acts even later, regenerating acyl-CoA inside the mitochondrial matrix once the carnitine shuttle has finished transport — not the initial cytosolic activation step.

## topic
Biochemistry

## subtopic
Lipid metabolism

## main_concept
CON-FND-177A829022AC8F

## concept_ids
CON-FND-177A829022AC8F

## contextual_concept_ids

## difficulty
Moderate

## question_type
Recall

## cognitive_effort
Medium

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
4

## clinical_relevance
0.3

## academic_relevance
0.85

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Lipid Metabolism

## question_only_for

## library_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## resource_ids

## learning_objective
Name acyl-CoA synthetase as the enzyme that activates fatty acids in the cytosol before beta oxidation.

## source_citation
FOMSCU Foundation 1 Formative and Past Exams 2021, Q55 (also 2022 Q35)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: Formative 2021 Q55 / 2022 Q35; source-JSON extraction. Re-verification note: this candidate was originally triaged 'new', but a grep pass past find-existing.mjs's first-line-only pending-batch scan found the answer stated in CON-FND-177A829022AC8F's own definition (Kasr 103-BMS-mcq-lipid-concepts.md / docs/import-ready) — overlaid here rather than minted twin. Apply after docs/Kasr-Source-Imports/concept/103-BMS-mcq-lipid-concepts.md.

---

# Item

## id
QST-SCUFBS102-S2-PENDING-BIOCHEMISTRY-ACTIVE-SITE-FITS

## title
Fischer's lock and key model of enzyme action

## question
What does Fischers classic lock and key model of the specific enzyme action scientifically imply?

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
Substrates radically and totally change conformation prior to active site interaction

## explanation_a
Incorrect. A substrate changing conformation before binding describes neither the lock-and-key nor the induced-fit model; in the induced-fit model it is the ENZYME's active site, not the substrate, that adapts, and it does so DURING binding.

## answer_b
Active site fits

## explanation_b
Correct. The lock-and-key model, Fischer's original proposal, holds that the enzyme's active site has a fixed shape that is already complementary to its substrate, fitting together the way a specific key fits a specific lock, with no conformational change required on binding. This contrasts with the newer induced-fit model, in which the active site's shape changes as the substrate binds.

## answer_c
The active site is fully complementary in shape only absolutely after interaction

## explanation_c
Incorrect. Saying the site becomes complementary only AFTER interaction describes an induced-fit-style adaptation, the opposite of the lock-and-key model's fixed, pre-existing complementarity.

## answer_d
The active site is completely entirely flexible and adjusts perfectly to substrate

## explanation_d
Incorrect. Describing the active site as flexible and adjusting to the substrate is the induced-fit model, not lock-and-key, which assumes a rigid, unchanging site shape.

## topic
Biochemistry

## subtopic
Enzyme kinetics

## main_concept
CON-FND-BCF22EBBACF9E8

## concept_ids
CON-FND-BCF22EBBACF9E8

## contextual_concept_ids

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
4

## clinical_relevance
0.2

## academic_relevance
0.85

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Enzymes

## question_only_for

## library_ids
ART-FND-AU-MED-102-ENZYMOLOGY

## resource_ids

## learning_objective
State that the lock-and-key model holds the active site's shape is fixed and pre-complementary to the substrate, contrasted with induced fit.

## source_citation
FOMSCU Foundation 1 Formative and Past Exams 2021, Q70 (also 2022 Q49)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: Formative 2021 Q70 / 2022 Q49; source-JSON extraction. Re-verification note: originally triaged 'new'; a grep pass found CON-FND-BCF22EBBACF9E8 (Alexandria AU-MED-102-biochem-structural-concepts.md / docs/import-ready) explicitly contrasts lock-and-key with induced-fit in both its explicit_objective and pitfalls fields — overlaid here rather than minted twin. Apply after docs/Alexandria-Source-Imports/concept/AU-MED-102-biochem-structural-concepts.md.

---

# Item

## id
QST-SCUFBS102-S2-PENDING-BIOCHEMISTRY-ALPHA-GLUCOSE

## title
The monosaccharide unit of starch

## question
Starch is a polysaccharide composed entirely of which of the following repeating monosaccharide units?

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
The beta one four linked glucose

## explanation_a
Incorrect. Beta 1,4 linkages join glucose units in cellulose, a structural plant polysaccharide humans cannot digest — not starch.

## answer_b
Alpha glucose

## explanation_b
Correct. Starch is a homopolysaccharide (glucan) built of D-glucose, occurring as amylose (a linear, unbranched chain with alpha-1,4-glucosidic bonds) and amylopectin (branched, with alpha-1,4 bonds within branches and alpha-1,6 bonds at branch points). Its main digestion product, via amylase, is maltose.

## answer_c
The beta one six linked glucose

## explanation_c
Incorrect. Beta 1,6 linkages are not the bond type found in starch; starch's branch points use alpha-1,6 bonds, and its backbone uses alpha-1,4 bonds — both alpha, not beta.

## answer_d
The alpha one two linked fructose

## explanation_d
Incorrect. Fructose is the monosaccharide of fructans (like inulin), not of starch, which is built entirely of glucose.

## topic
Biochemistry

## subtopic
Carbohydrate biochemistry

## main_concept
CON-FND-4706C1246E4B76

## concept_ids
CON-FND-4706C1246E4B76

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
55

## exam_relevance
4

## clinical_relevance
0.2

## academic_relevance
0.85

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Carbohydrates

## question_only_for

## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE

## resource_ids

## learning_objective
State that starch is built of D-glucose in alpha-1,4 (and, at branch points, alpha-1,6) glucosidic linkages.

## source_citation
FOMSCU Foundation 1 Formative and Past Exams 2021, Q25 (also 2022 Q5)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: Formative 2021 Q25 / 2022 Q5; source-JSON extraction. Re-verification note: originally triaged 'new'; a grep pass found CON-FND-4706C1246E4B76 ('starch-and-glycogen-as-storage-polysaccharides', Kasr 102-INT-mcq-concepts.md / docs/import-ready) states the alpha-1,4/alpha-1,6 linkage fact explicitly — overlaid here rather than minted twin. Same concept as biochemistry-glucose-alpha-linkages. Apply after docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md.

---

# Item

## id
QST-SCUFBS102-S2-PENDING-BIOCHEMISTRY-GLUCOSE-ALPHA-LINKAGES

## title
The monomer and linkage of amylose

## question
The structural monosaccharides residues that make up the amylose chain are exactly which of the following?

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
The entirely repeating simple fructose units in alpha linkages

## explanation_a
Incorrect. Fructose is not amylose's building block; amylose is built entirely of glucose.

## answer_b
The completely identical single galactose units in alpha linkages

## explanation_b
Incorrect. Galactose is not amylose's building block either — it is a component of lactose and some glycolipids, not of starch.

## answer_c
Glucose alpha linkages

## explanation_c
Correct. Amylose is the linear, unbranched part of starch, built from D-glucose units joined by alpha-1,4-glucosidic bonds with no branching. This is the same backbone linkage amylopectin uses, but amylose lacks amylopectin's added alpha-1,6 branch points. Glucose in alpha linkages is therefore the correct description of amylose's residues.

## answer_d
The entirely repeating simple mannose units in alpha linkages

## explanation_d
Incorrect. Mannose is not amylose's building block; it appears in other glycoconjugates, not in starch.

## topic
Biochemistry

## subtopic
Carbohydrate biochemistry

## main_concept
CON-FND-4706C1246E4B76

## concept_ids
CON-FND-4706C1246E4B76

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
55

## exam_relevance
4

## clinical_relevance
0.2

## academic_relevance
0.85

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Carbohydrates

## question_only_for

## library_ids
ART-102-BIO-CARBOHYDRATES-OF-BIOLOGICAL-IMPORTANCE

## resource_ids

## learning_objective
State that amylose is built of glucose joined by alpha-1,4 linkages, with no branching.

## source_citation
FOMSCU Foundation 1 Formative and Past Exams 2021, Q59 (also 2022 Q39)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: Formative 2021 Q59 / 2022 Q39; source-JSON extraction. Re-verification note: same reclassification and same concept as biochemistry-alpha-glucose above (CON-FND-4706C1246E4B76). Apply after docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md.

---

# Item

## id
QST-SCUFBS102-S2-PENDING-BIOCHEMISTRY-MEMBRANE-COMPOSITION

## title
The molecular composition of the cell membrane

## question
What is the main molecular structure comprising the biological cellular membrane?

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
Exclusively composed of cholesterol

## explanation_a
Incorrect. Cholesterol is an important membrane constituent that modulates fluidity, but the membrane is not exclusively cholesterol — phospholipids form its structural bulk.

## answer_b
An impenetrable wall entirely made of simple triglycerides

## explanation_b
Incorrect. Triglycerides are the body's storage fat, found in adipocytes, not a structural component of the cell membrane's bilayer.

## answer_c
Phospholipids proteins glycolipids and glycoprotein

## explanation_c
Correct. The cell membrane is a phospholipid bilayer, with cholesterol sitting among the phospholipid tails to modulate fluidity. Peripheral and integral proteins are embedded in or attached to this bilayer, some acting as channels or carriers. Carbohydrate, in the form of glycolipid and glycoprotein, decorates the outer face only — the combination this option names.

## answer_d
Only a single layer of various structural lipids

## explanation_d
Incorrect. The membrane is a BIlayer, not a single layer — hydrophilic phospholipid heads face outward on both sides with hydrophobic tails meeting in the middle.

## topic
Biochemistry

## subtopic
Cell membranes

## main_concept
CON-FND-85CC08A33D0A88

## concept_ids
CON-FND-85CC08A33D0A88

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
60

## exam_relevance
4

## clinical_relevance
0.2

## academic_relevance
0.85

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Cell Membranes

## question_only_for

## library_ids
ART-101-HIS-THE-CELL

## resource_ids

## learning_objective
Name phospholipids, proteins and surface carbohydrate (glycolipid/glycoprotein) as the cell membrane's main components.

## source_citation
FOMSCU Foundation 1 EOY Final 2026, Q53

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: EOY Final 2026 Q53; source-JSON extraction. Re-verification note: originally triaged 'new'; a grep pass found CON-FND-85CC08A33D0A88 ('the cell membrane is a phospholipid bilayer with cholesterol, peripheral and integral proteins, and carbohydrate on its outer face', Kasr 101-ISK-mcq-concepts.md / docs/import-ready, alias 'Fluid mosaic model') states this fact — overlaid here rather than minted twin. Apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
QST-SCUFBS102-S2-PENDING-BIOCHEMISTRY-KM-DEFINITION

## title
Defining the Michaelis constant

## question
Which of the following descriptions best defines the Michaelis Menten constant?

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
The substrate concentration at half Vmax

## explanation_a
Correct. As substrate concentration increases, reaction velocity rises toward a maximum, Vmax, at which the enzyme is saturated. The substrate concentration that produces half of that maximal velocity is termed the Michaelis constant, Km — a smaller Km reflects higher enzyme-substrate affinity, and Km is used to compare the catalytic efficiency of different enzymes for their substrates.

## answer_b
The maximum velocity of the chemical reaction

## explanation_b
Incorrect. Vmax itself is the maximum reaction velocity, a separate quantity from Km, which is a substrate concentration, not a velocity.

## answer_c
The minimum energy required for the reaction

## explanation_c
Incorrect. Activation energy is the minimum energy needed for a reaction to proceed, an unrelated quantity to Km.

## answer_d
The inhibitor concentration exactly at the Vmax

## explanation_d
Incorrect. Km is defined for the uninhibited reaction; an inhibitor concentration at some reference velocity is not what the Michaelis constant measures, even though a competitive inhibitor does raise the APPARENT Km.

## topic
Biochemistry

## subtopic
Enzyme kinetics

## main_concept
CON-FND-028C50A610B2A2

## concept_ids
CON-FND-028C50A610B2A2

## contextual_concept_ids

## difficulty
Moderate

## question_type
Definition

## cognitive_effort
Low

## cognitive_effort_score
0.2

## setting
Academic

## reasoning_level
1

## inferred_difficulty
60

## exam_relevance
5

## clinical_relevance
0.3

## academic_relevance
0.85

## exam_weight_by_year
SCU_Y1=high

## years
SCU_Y1

## universities
scu

## module
SCU-FBS102

## module_subject
SCU-FBS102 > Biochemistry > Enzymes

## question_only_for

## library_ids
ART-102-BIO-ENZYMES

## resource_ids

## learning_objective
Define Km as the substrate concentration producing half of Vmax.

## source_citation
FOMSCU Foundation 1 EOY Final 2026, Q50

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: EOY Final 2026 Q50; source-JSON extraction. Re-verification note: originally triaged 'new'; a grep pass found CON-FND-028C50A610B2A2 ('michaelis-constant-km-definition-and-affinity-meaning', Kasr 102-INT-mcq-concepts.md / docs/import-ready) states this exact definition — overlaid here rather than minted twin. Apply after docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md.

---

# Item

## id
QST-SCUFBS102-S2-PENDING-HISTOLOGY-EPINEURIUM

## title
The covering of an entire peripheral nerve trunk

## question
Which of the following connective tissue sheaths specifically surrounds an entire peripheral nerve trunk?

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
Perineurium

## explanation_a
Incorrect. The perineurium surrounds each individual FASCICLE (bundle of nerve fibres) within the nerve, not the whole trunk, and is the layer whose tight junctions form the blood-nerve barrier.

## answer_b
The highly delicate endoneurium

## explanation_b
Incorrect. The endoneurium is the finest layer, surrounding each individual nerve FIBRE within a fascicle — the smallest scale of the three coverings, not the whole trunk.

## answer_c
Epineurium

## explanation_c
Correct. A peripheral nerve trunk is wrapped, from outside in, by the epineurium (dense connective tissue around the whole trunk), the perineurium (around each individual fascicle), and the endoneurium (around each individual nerve fibre within a fascicle). The epineurium is the outermost covering, specifically the one surrounding the entire trunk.

## answer_d
The thick muscular epimysium

## explanation_d
Incorrect. Epimysium is the connective tissue sheath of a MUSCLE, not a nerve — an unrelated structure named as a distractor by analogy.

## topic
Histology

## subtopic
Nervous tissue histology

## main_concept
CON-NEU-7C20A38BB4B865

## concept_ids
CON-NEU-7C20A38BB4B865

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
55

## exam_relevance
4

## clinical_relevance
0.25

## academic_relevance
0.8

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Nervous Tissue

## question_only_for

## library_ids
ART-NEU-AU105-NEUROGLIA-NERVE-INJURY-HISTOLOGY

## resource_ids

## learning_objective
Name the epineurium as the connective tissue sheath surrounding an entire peripheral nerve trunk.

## source_citation
FOMSCU Foundation 1 Formative and Past Exams 2021, Q22 (also 2022 Q2)

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: Formative 2021 Q22 / 2022 Q2; source-JSON extraction. Re-verification note: originally triaged 'new'; a grep pass found CON-NEU-7C20A38BB4B865 (Alexandria AU-MED-105-histology-concepts.md / docs/import-ready), whose own explicit_objective is 'name the three connective-tissue coverings of a peripheral nerve and identify which one forms the blood-nerve barrier' — directly covers this fact. Overlaid here rather than minted twin. Apply after docs/Alexandria-Source-Imports/concept/AU-MED-105-histology-concepts.md.

---

# Item

## id
QST-SCUFBS102-S2-PENDING-HISTOLOGY-GOLGI-SACCULES

## title
The Golgi apparatus's defining structural feature

## question
Which of the following structural features is uniquely characteristic of the Golgi apparatus?

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
Detectable by Janus Green stain

## explanation_a
Incorrect. Janus Green is the classic supravital stain for MITOCHONDRIA, not the Golgi apparatus.

## answer_b
Presence of stacked saccules

## explanation_b
Correct. The Golgi apparatus is structurally a stack of flat saccules with an entry (cis) and an exit (trans) face; everything the Golgi packages and buds off leaves from the exit face. This stacked-saccule architecture is the feature that structurally distinguishes it from other membranous organelles.

## answer_c
Composed of large and small functional subunits

## explanation_c
Incorrect. Large and small subunits describe the RIBOSOME (large and small ribosomal subunits), not the Golgi apparatus.

## answer_d
Outer smooth and inner rough cellular membranes

## explanation_d
Incorrect. An outer smooth, inner rough membrane arrangement describes the nuclear envelope (whose outer membrane is continuous with rough ER), not the Golgi apparatus.

## topic
Histology

## subtopic
Cytoplasmic organelles

## main_concept
CON-FND-405BB5EA3C359E

## concept_ids
CON-FND-405BB5EA3C359E

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
55

## exam_relevance
4

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Cytoplasmic Organelles

## question_only_for

## library_ids
ART-101-HIS-CYTOPLASMIC-ORGANELLES

## resource_ids

## learning_objective
Name the stack of flat saccules with entry and exit faces as the Golgi apparatus's defining EM structure.

## source_citation
FOMSCU Foundation 1 EOM Mid 2026, Q15

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: EOM Mid 2026 Q15; source-JSON extraction. Re-verification note: originally triaged 'new'; a grep pass found CON-FND-405BB5EA3C359E ('golgi-apparatus-em-structure-products-and-functions', Kasr 101-ISK-mcq-concepts.md / docs/import-ready) states this exact fact — overlaid here rather than minted twin. Apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
QST-SCUFBS102-S2-PENDING-HISTOLOGY-UNICELLULAR-EXOCRINE

## title
The flask-shaped unicellular exocrine gland cell

## question
Which cells are scattered among epithelial cells flask shaped with basal organelles and apical secretory granules?

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
Unicellular exocrine glands

## explanation_a
Correct. By number of cells, an exocrine gland is unicellular (a single secretory cell) or multicellular. The goblet cell is the unicellular example: a single flask-shaped cell that secretes mucus onto a free surface, with its organelles concentrated basally and secretory granules apically, scattered within the epithelium of the respiratory tract and intestine. It needs no duct because it already sits on the free surface.

## answer_b
Multicellular endocrine glands

## explanation_b
Incorrect. Endocrine glands secrete internally into the bloodstream via ductless multicellular arrangements (like follicles or cords), not scattered single flask-shaped surface cells.

## answer_c
Simple branched alveolar glands

## explanation_c
Incorrect. A simple branched alveolar gland describes a multicellular gland shape classified by duct branching and secretory-unit shape, not a single scattered flask-shaped cell.

## answer_d
Compound tubular exocrine glands

## explanation_d
Incorrect. A compound tubular gland is a multicellular gland with a branched duct system, the opposite structural scale from a single scattered unicellular gland cell.

## topic
Histology

## subtopic
Glandular epithelium

## main_concept
CON-FND-B22A5E7A56EC8F

## concept_ids
CON-FND-B22A5E7A56EC8F

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
55

## exam_relevance
4

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Glandular Epithelium

## question_only_for

## library_ids
ART-101-HIS-GLANDULAR-EPITHELIUM

## resource_ids

## learning_objective
Name the goblet cell as the unicellular exocrine gland example, flask-shaped with basal organelles and apical granules.

## source_citation
FOMSCU Foundation 1 EOY Final 2026, Q28

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: EOY Final 2026 Q28; source-JSON extraction. Re-verification note: originally triaged 'new'; a grep pass found CON-FND-B22A5E7A56EC8F ('the goblet cell is a unicellular exocrine gland: one flask-shaped mucous-secreting cell', Kasr 101-ISK-mcq-concepts.md / docs/import-ready) states this exact fact — overlaid here rather than minted twin. Apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.

---

# Item

## id
QST-SCUFBS102-S2-PENDING-HISTOLOGY-RER-FUNCTION

## title
Rough endoplasmic reticulum's role in protein export

## question
Rough endoplasmic reticulum plays an important role in which of the following processes?

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
Synthesizing proteins that secreted outside the cell

## explanation_a
Correct. Rough endoplasmic reticulum is flattened cisternae studded on the outside with ribosomes bound to receptor proteins. It makes and segregates protein for export — that is, protein destined to be secreted outside the cell. A protein-secreting gland cell, such as a plasma cell or a pancreatic acinar cell, is rich in rough ER for exactly this reason.

## answer_b
Producing and secreting massive amounts of lipid molecules

## explanation_b
Incorrect. Lipid synthesis is chiefly the role of SMOOTH endoplasmic reticulum, not the ribosome-studded rough ER.

## answer_c
Synthesizing proteins that used inside the cell

## explanation_c
Incorrect. Proteins used INSIDE the cell (cytosolic proteins) are typically made on FREE ribosomes in the cytoplasm, not on the rough ER, which is dedicated to proteins destined for export, the membrane, or organelles of the secretory pathway.

## answer_d
Digesting old cellular organelles

## explanation_d
Incorrect. Digesting old organelles is the lysosome's role (via autophagy), not the rough ER's.

## topic
Histology

## subtopic
Cytoplasmic organelles

## main_concept
CON-FND-0E38E21957DB05

## concept_ids
CON-FND-0E38E21957DB05

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
55

## exam_relevance
4

## clinical_relevance
0.2

## academic_relevance
0.8

## exam_weight_by_year
SCU_Y1=moderate

## years
SCU_Y1

## universities
scu

## module
SCU-FBS102

## module_subject
SCU-FBS102 > Histology > Cytoplasmic Organelles

## question_only_for

## library_ids
ART-101-HIS-CYTOPLASMIC-ORGANELLES

## resource_ids

## learning_objective
State that rough endoplasmic reticulum synthesises and segregates protein destined for export.

## source_citation
FOMSCU Foundation 1 EOY Final 2026, Q25

## attached_image

## attachments

## media_recommendations

## estimated_seconds
60

## randomise_answers
yes

## author_notes
keySource: printed answer, FOMSCU Foundation 1 QBank
fomscu: EOY Final 2026 Q25; source-JSON extraction. Re-verification note: originally triaged 'new'; a grep pass found CON-FND-0E38E21957DB05 ('rough-endoplasmic-reticulum-structure-and-protein-export', Kasr 101-ISK-mcq-concepts.md / docs/import-ready) states this exact fact — overlaid here rather than minted twin. Apply after docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md.
