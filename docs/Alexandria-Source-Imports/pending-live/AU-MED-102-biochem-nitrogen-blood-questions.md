<!--
  AU-MED-102 · Biochemistry · sub-lane C. 12 MCQs whose main_concept is a HIT-PENDING Kasr
  concept (not live, only in an unimported docs/Kasr-Source-Imports/concept/*.md batch).
  Per LANE-BRIEF.md §19.2 (an update-shaped row for an id neither live nor in the same batch
  folder is an ERROR) and the orchestrator's binding note that questions on HIT-PENDING
  concepts are authored here, in pending-live, alongside the concept updates they depend on
  — never in the regular question/ import root, where they would fail against live state.

  Never import this file until every Kasr file named in each question's own author_notes is
  live (docs/Alexandria-Source-Imports/pending-live/INDEX.md carries the same dependency).
  Six Kasr CONCEPT files and six Kasr ARTICLE files are the full dependency set (a question's
  library_ids cites the article that teaches its main_concept, not just the concept itself):
    concept/103-BMS-mcq-heme-concepts.md      + article/103-BMS-mcq-heme.md
    concept/103-BMS-biochemistry-concepts.md  + article/103-BMS-biochemistry.md
    concept/101-ISK-mcq-concepts.md           + article/101-ISK-histology-2.md
    concept/103-BMS-mcq-aminoacid-concepts.md + article/103-BMS-mcq-aminoacid.md
    concept/103-BMS-mcq-aromatic-concepts.md  + article/103-BMS-mcq-aromatic.md
    concept/108-INT-concepts-pathology.md     + article/108-INT-pathology.md
  (all six paths under docs/Kasr-Source-Imports/). Confirmed clean: `medical:simulate` run with
  all twelve Kasr files + this lane's own pending-live concept file + this question file reports
  `created: 12, updated: 0, 0 errors` for this file — every one of the 12 resolves as a genuine
  new record once its dependencies are live, none rejected.

  Validation order proved for this file:
  1. `medical:simulate` with ONLY the named Kasr concept file(s) as plain args — confirms they
     parse and their concepts exist, before this file is added to the mix.
  2. `medical:simulate` with the Kasr concept file(s) + this question file together — the real
     gate; expect 0 errors, all 12 questions created.
  3. `medical:batch -- <this file> --with <Kasr concept file>` — batch is directory-scoped and
     is not the gate, but --with widens what counts as an existing concept for its own checks.

  The remaining 20 questions in this hand-over, whose main_concept is either a concept this
  lane minted or the one live update (light chain), are in the regular
  question/AU-MED-102-biochem-nitrogen-blood-mcq.md.
-->

# Item

## id
QST-AU102-HEM-BLOOD-Q07

## title
Folic acid is inhibited by:

## question
Folic acid is inhibited by:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
B

## answer_a
Isoniazid (INH)

## explanation_a
Incorrect. Isoniazid is an antitubercular drug that interferes with vitamin B6 (pyridoxine) metabolism, not folate.

## answer_b
Methotrexate

## explanation_b
Correct. Methotrexate is a competitive inhibitor of dihydrofolate reductase, so folic acid is not activated to its tetrahydrofolate form and DNA synthesis stops — which is exactly why methotrexate treatment is itself a recognised cause of folate deficiency, alongside its use as an anticancer and anti-inflammatory drug.

## answer_c
Dicoumarol

## explanation_c
Incorrect. Dicoumarol is a vitamin K antagonist used as an anticoagulant; it has no action on folate metabolism.

## answer_d
Avidin

## explanation_d
Incorrect. Avidin (found in raw egg white) binds biotin, not folate, and is the classic cause of biotin deficiency when large quantities of raw egg white are eaten.

## topic
Nutrition

## subtopic
Vitamin B9 (Folic Acid)

## main_concept
CON-FND-1A4A49607783A9

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Pharmacology

## cognitive_effort
Medium

## cognitive_effort_score
0.5

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## clinical_relevance
0.6

## academic_relevance
0.7

## exam_weight_by_year
AU_Y1=0.1

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Vitamins > Vitamin B9 (Folic Acid)

## question_only_for

## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name methotrexate as a folate antagonist and state which enzyme it inhibits.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q7.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Tests CON-FND-1A4A49607783A9, HIT-PENDING against docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md and its article ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS — this question validates only when simulated together with that Kasr file (see pending-live/AU-MED-102-biochem-nitrogen-blood.md).

---

# Item

## id
QST-AU102-HEM-BLOOD-Q08

## title
Deficiency of folic acid leads to:

## question
Deficiency of folic acid leads to:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Night blindness

## explanation_a
Incorrect. Night blindness is caused by vitamin A deficiency, which impairs rhodopsin regeneration in the retina, not by folate deficiency.

## answer_b
Rickets

## explanation_b
Incorrect. Rickets is caused by vitamin D deficiency impairing bone mineralisation, not by folate deficiency.

## answer_c
Macrocytic anemia

## explanation_c
Correct. Folate is required, as tetrahydrofolate, to carry one-carbon units for purine and thymidylate synthesis; without it, DNA synthesis in the rapidly dividing bone-marrow precursor cells is impaired, producing large, immature red cells — a macrocytic (megaloblastic) anaemia. This is the same category of anaemia B12 deficiency produces, since B12 also feeds into one-carbon/DNA-synthesis metabolism, which is why the two are distinguished by a separate marker (methylmalonic acid, specific to B12) rather than by the blood picture alone.

## answer_d
Microcytic anemia

## explanation_d
Incorrect. A microcytic anaemia (small red cells) points toward impaired haemoglobin synthesis — classically iron deficiency, thalassaemia or lead poisoning — the opposite direction from folate's macrocytic picture.

## topic
Nutrition

## subtopic
Vitamin B9 (Folic Acid)

## main_concept
CON-FND-1A4A49607783A9

## concept_ids
CON-FND-C9E5128193029E

## contextual_concept_ids

## difficulty
Easy

## question_type
Pathophysiology

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
1

## inferred_difficulty
70

## exam_relevance
6

## clinical_relevance
0.7

## academic_relevance
0.7

## exam_weight_by_year
AU_Y1=0.15

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Vitamins > Vitamin B9 (Folic Acid)

## question_only_for

## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
State that folate deficiency produces a macrocytic anaemia, through impaired DNA synthesis.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q8.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
Tests CON-FND-1A4A49607783A9 (HIT-PENDING, same dependency as Q7/Q10) as main_concept, since that Kasr record's own definition already states this fact ("the conversion of dUMP to dTMP needs methylene-THF"). CON-FND-C9E5128193029E (also HIT-PENDING, same Kasr file) is tagged as a secondary concept_id since its own definition also names "folic acid... deficiency gives megaloblastic anaemia and neural tube defects."

---

# Item

## id
QST-AU102-HEM-BLOOD-Q10

## title
Defective synthesis of thymidylic acid occurs in deficiency of:

## question
Defective synthesis of thymidylic acid occurs in deficiency of:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Folic acid

## explanation_a
Correct. Thymidylate synthase converts dUMP to dTMP using methylene-tetrahydrofolate (a folate derivative) as the methyl donor; without adequate folate, this step slows, DNA synthesis in dividing cells is impaired, and the same macrocytic anaemia mechanism follows. This is the same underlying fact as "folate deficiency causes macrocytic anaemia" — thymidylate synthesis is specifically the DNA-synthesis step folate deficiency interrupts.

## answer_b
Vitamin B6

## explanation_b
Incorrect. Vitamin B6 (pyridoxal phosphate) is a coenzyme for amino-acid metabolism (transamination, decarboxylation), not for thymidylate synthesis.

## answer_c
Niacin

## explanation_c
Incorrect. Niacin, as NAD+/NADP+, is a hydrogen-carrier coenzyme in oxidation-reduction reactions; it plays no role in thymidylate synthesis.

## answer_d
Pyridoxal phosphate

## explanation_d
Incorrect, and it repeats option B's vitamin under its active-coenzyme name — pyridoxal phosphate is the active form of vitamin B6, which is not the vitamin thymidylate synthase depends on.

## topic
Nutrition

## subtopic
Vitamin B9 (Folic Acid)

## main_concept
CON-FND-1A4A49607783A9

## concept_ids

## contextual_concept_ids

## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.65

## setting
Academic

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
5

## clinical_relevance
0.5

## academic_relevance
0.8

## exam_weight_by_year
AU_Y1=0.15

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Vitamins > Vitamin B9 (Folic Acid)

## question_only_for

## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
State that thymidylate synthesis requires folate (as methylene-THF), and explain the mechanism.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q10.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
Tests CON-FND-1A4A49607783A9 (HIT-PENDING, same dependency as Q7/Q8) — this Kasr concept's own definition already states "the conversion of dUMP to dTMP needs methylene-THF."

---

# Item

## id
QST-AU102-HEM-BLOOD-Q12

## title
Pernicious anemia is caused by:

## question
Pernicious anemia is caused by:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Inadequate intake of vitamin B12

## explanation_a
Incorrect. Pernicious anaemia is specifically an autoimmune/absorptive disease, not a dietary-intake problem — most patients eat adequate B12, but cannot absorb it.

## answer_b
Absence of hydrochloric acid in gastric juice

## explanation_b
Incorrect. Achlorhydria affects the release of B12 from dietary protein, but pernicious anaemia's defining defect is the loss of intrinsic factor, not acid secretion alone.

## answer_c
Absence of intrinsic factor of the gastric juice

## explanation_c
Correct. Pernicious anaemia is a deficiency of vitamin B12 caused specifically by the stomach's failure to produce intrinsic factor, the glycoprotein from gastric parietal cells that B12 must bind to be absorbed in the terminal ileum. Without intrinsic factor, dietary B12 passes through the gut unabsorbed regardless of how much is eaten, which is why this is classed as an absorptive disease rather than a dietary deficiency.

## answer_d
Over-production of extrinsic factor

## explanation_d
Incorrect. "Extrinsic factor" is an older name for dietary vitamin B12 itself, not a separate substance that could be over-produced; this option does not describe a real mechanism.

## topic
Clinical biochemistry

## subtopic
Anaemias

## main_concept
CON-HEM-C79EA8644C0C9C

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Pathophysiology

## cognitive_effort
Medium

## cognitive_effort_score
0.45

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
6

## clinical_relevance
0.8

## academic_relevance
0.7

## exam_weight_by_year
AU_Y1=0.15

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Blood > Anaemias

## question_only_for

## library_ids
ART-101-HIS-RED-BLOOD-CORPUSCLES

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name intrinsic-factor deficiency as the cause of pernicious anaemia.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q12.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Tests CON-HEM-C79EA8644C0C9C, HIT-PENDING against docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md and its article ART-101-HIS-RED-BLOOD-CORPUSCLES — this question validates only when simulated together with that Kasr file.

---

# Item

## id
QST-AU102-HEM-BLOOD-Q26

## title
If iron exceeds the capacity of the body to store it as ferritin, it accumulates as:

## question
If the iron exceeds the capacity of the body to store it as ferritin it accumulates as:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Ceruloplasmin

## explanation_a
Incorrect. Ceruloplasmin is a copper-transport protein, not an iron-storage form.

## answer_b
Transferrin

## explanation_b
Incorrect. Transferrin is iron's plasma TRANSPORT protein, carrying it between sites, not the form it accumulates as when storage capacity is exceeded.

## answer_c
Hemosiderin

## explanation_c
Correct. When iron exceeds the capacity of ferritin (its normal soluble storage form) to hold it, it aggregates into haemosiderin — a golden-brown, granular, insoluble iron-storage pigment visible by light microscopy — whether locally, after haemorrhage into tissue, or systemically, in states of iron overload.

## answer_d
Apoferritin

## explanation_d
Incorrect. Apoferritin is the iron-free protein shell that combines with iron to form ferritin; it is not itself a storage form of excess iron.

## topic
Clinical biochemistry

## subtopic
Iron

## main_concept
CON-FND-5DBC795B58DC74

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Classification

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
4

## clinical_relevance
0.5

## academic_relevance
0.5

## exam_weight_by_year
AU_Y1=0.1

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Blood > Iron

## question_only_for

## library_ids
ART-108-PAT-PATHOLOGICAL-PIGMENTS

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name haemosiderin as the form iron takes when it exceeds ferritin's storage capacity.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q26.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
Tests CON-FND-5DBC795B58DC74, HIT-PENDING against docs/Kasr-Source-Imports/concept/108-INT-concepts-pathology.md and its article ART-108-PAT-PATHOLOGICAL-PIGMENTS — this question validates only when simulated together with that Kasr file.

---

# Item

## id
QST-AU102-PROT-Q59

## title
All the following are manifestations of scurvy EXCEPT:

## question
All the following are manifestations of scurvy EXCEPT:

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Bleeding gums

## explanation_a
Incorrect as the answer to "except" — bleeding gums are a classic manifestation of scurvy, from defective collagen in the gum's vascular supporting tissue.

## answer_b
Defect in bone formation

## explanation_b
Incorrect as the answer to "except" — scurvy genuinely impairs bone formation, since osteoid matrix depends on properly synthesised collagen.

## answer_c
Red spots around hair follicles

## explanation_c
Incorrect as the answer to "except" — perifollicular haemorrhagic red spots are a classic scurvy sign, from fragile, poorly collagen-supported small vessels around hair follicles.

## answer_d
Diarrhea

## explanation_d
Correct. Diarrhoea is not a manifestation of scurvy — vitamin C deficiency's effects follow from defective collagen synthesis (bleeding, poor wound healing, bone and vessel-wall weakness), not from a gastrointestinal mechanism, which is why this is the option that does not belong with the other three.

## topic
Nutrition

## subtopic
Vitamin C

## main_concept
CON-FND-46C9A4425362B0

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Classification

## cognitive_effort
Medium

## cognitive_effort_score
0.45

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
5

## clinical_relevance
0.6

## academic_relevance
0.6

## exam_weight_by_year
AU_Y1=0.1

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Vitamins > Vitamin C

## question_only_for

## library_ids
ART-101-HIS-CONNECTIVE-TISSUE-FIBRES

## resource_ids
src_4852d425a88297af190e

## learning_objective
List scurvy's true manifestations (collagen-related) and exclude diarrhoea as unrelated.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, Protein MCQ bank, Q59.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Tests CON-FND-46C9A4425362B0, HIT-PENDING against docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md — validates only when simulated together with that Kasr file. Q1 of 2 in this bank testing this concept (see also Q60 below). Sub-lane C's C37 (Protein-Chemistry exception reassigned per triage §9).

---

# Item

## id
QST-AU102-PROT-Q60

## title
Which of the following may cause bleeding while brushing teeth?

## question
Which of the following may be a cause of bleeding while brushing teeth?

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Vitamin C deficiency

## explanation_a
Correct. Vitamin C deficiency (scurvy) causes defective collagen synthesis in the gum's supporting vasculature and connective tissue, producing the friable, bleeding gums classically triggered even by ordinary tooth-brushing.

## answer_b
Sickle cell anemia

## explanation_b
Incorrect. Sickle cell anaemia causes vaso-occlusive crises, haemolysis and infarction, not gum bleeding from a collagen defect.

## answer_c
Protein denaturation

## explanation_c
Incorrect. Protein denaturation is a loss of higher-order structure (by heat, pH, or agents) and is not a clinical cause of bleeding gums.

## answer_d
Alzheimer's disease

## explanation_d
Incorrect. Alzheimer's disease is a neurodegenerative condition and has no mechanism producing gum bleeding.

## topic
Nutrition

## subtopic
Vitamin C

## main_concept
CON-FND-46C9A4425362B0

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Pathophysiology

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
70

## exam_relevance
5

## clinical_relevance
0.6

## academic_relevance
0.6

## exam_weight_by_year
AU_Y1=0.1

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Vitamins > Vitamin C

## question_only_for

## library_ids
ART-101-HIS-CONNECTIVE-TISSUE-FIBRES

## resource_ids
src_4852d425a88297af190e

## learning_objective
Attribute bleeding gums on brushing to vitamin C deficiency (scurvy).

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, Protein MCQ bank, Q60.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
35

## randomise_answers
yes

## author_notes
Q2 of 2 in this bank testing CON-FND-46C9A4425362B0 (see also Q59 above).

---

# Item

## id
QST-AU102-PROT-Q64

## title
Which amino acid is a precursor of gamma amino butyric acid (GABA)?

## question
Which amino acid is a precursor of gamma amino butyric acid?

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Phenylalanine

## explanation_a
Incorrect. Phenylalanine's own products are tyrosine and, downstream, the catecholamines and thyroid hormones — not GABA.

## answer_b
Glycine

## explanation_b
Incorrect. Glycine is itself an inhibitory neurotransmitter (particularly in the spinal cord) but is not GABA's amino-acid precursor.

## answer_c
Tyrosine

## explanation_c
Incorrect. Tyrosine is the precursor of the catecholamines, melanin and the thyroid hormones (via DOPA) — a different amino-acid family from the one that gives GABA.

## answer_d
Glutamic acid

## explanation_d
Correct. Glutamic acid, decarboxylated by glutamate decarboxylase, is the direct precursor of GABA — alongside its other products glutamine, glutathione, arginine and proline (and its role, gamma-carboxylated, in clotting factors, though notably not in haem). GABA's synthesis from glutamate is the reaction this question tests.

## topic
Clinical biochemistry

## subtopic
Individual Amino Acid Metabolism

## main_concept
CON-NEU-46F59E9C3EA406

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.45

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
5

## clinical_relevance
0.4

## academic_relevance
0.7

## exam_weight_by_year
AU_Y1=0.1

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Individual Amino Acid Metabolism > Glutamic Acid

## question_only_for

## library_ids
ART-103-BIO-GLYCINE-GLUTAMATE-AND-BRANCHED-CHAIN

## resource_ids
src_4852d425a88297af190e

## learning_objective
Name glutamic acid as the amino-acid precursor of GABA.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, Protein MCQ bank, Q64.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
Tests CON-NEU-46F59E9C3EA406, HIT-PENDING against docs/Kasr-Source-Imports/concept/103-BMS-mcq-aminoacid-concepts.md — validates only when simulated together with that Kasr file. Q1 of 2 in this bank testing this concept (see also Q71 below). Sub-lane C's C38 (Protein-Chemistry exception reassigned per triage §9).

---

# Item

## id
QST-AU102-PROT-Q67

## title
Adrenaline and Noradrenaline are hormones of the adrenal medulla; what is their precursor?

## question
Adrenaline and Noradrenaline are hormones of Adrenal Medulla. Which of the following is their precursor?

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
GABA

## explanation_a
Incorrect. GABA is a product of glutamic acid decarboxylation, an inhibitory neurotransmitter, unrelated to catecholamine synthesis.

## answer_b
CoA

## explanation_b
Incorrect. Coenzyme A is a general acyl-group carrier used throughout metabolism; it is not a biosynthetic precursor of the catecholamines.

## answer_c
DOPA

## explanation_c
Correct. Tyrosine is hydroxylated to DOPA (dihydroxyphenylalanine), which is then decarboxylated to dopamine and further converted to noradrenaline and adrenaline — DOPA is the branch point where the catecholamine pathway separates from tyrosine's other fates (melanin, thyroid hormone).

## answer_d
Vitamin C

## explanation_d
Incorrect as the named precursor, though vitamin C is genuinely a required cofactor later in the pathway (for the dopamine-beta-hydroxylase step converting dopamine to noradrenaline) — it is a cofactor, not the carbon-skeleton precursor the question asks for.

## topic
Clinical biochemistry

## subtopic
Individual Amino Acid Metabolism

## main_concept
CON-FND-FA4D15805B9D02

## concept_ids

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
0.5

## academic_relevance
0.7

## exam_weight_by_year
AU_Y1=0.1

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Individual Amino Acid Metabolism > Aromatic Amino Acids (Phenylalanine and Tyrosine)

## question_only_for

## library_ids
ART-103-BIO-PHENYLALANINE-AND-TYROSINE

## resource_ids
src_4852d425a88297af190e

## learning_objective
Name DOPA as the immediate precursor of the catecholamines.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, Protein MCQ bank, Q67.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Tests CON-FND-FA4D15805B9D02, HIT-PENDING against docs/Kasr-Source-Imports/concept/103-BMS-mcq-aromatic-concepts.md — validates only when simulated together with that Kasr file. Sub-lane C's C39 (Protein-Chemistry exception reassigned per triage §9).

---

# Item

## id
QST-AU102-PROT-Q71

## title
What type of amino acid is gamma amino butyric acid (GABA)?

## question
Which type of amino acid is Gamma Amino Butyric Acid?

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Primary Amino acid

## explanation_a
Incorrect. "Primary amino acid" is not the standard classification this question is testing; GABA's defining classification is that it is not one of the 20 protein-coding amino acids.

## answer_b
Non Primary Amino Acid

## explanation_b
Incorrect for the same reason — this is not the classification the source's key selects.

## answer_c
Non Protein Amino acid

## explanation_c
Correct. GABA is classed as a non-protein amino acid: it is never incorporated into a polypeptide chain during translation, unlike the 20 standard amino acids. It functions purely as a neurotransmitter, made by decarboxylating glutamic acid (itself a genuine protein amino acid).

## answer_d
All of the Above

## explanation_d
Incorrect. Since only one of the preceding descriptions is the classification this bank's key selects, "all of the above" cannot be correct.

## topic
Clinical biochemistry

## subtopic
Individual Amino Acid Metabolism

## main_concept
CON-NEU-46F59E9C3EA406

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Classification

## cognitive_effort
Medium

## cognitive_effort_score
0.45

## setting
Academic

## reasoning_level
2

## inferred_difficulty
55

## exam_relevance
4

## clinical_relevance
0.3

## academic_relevance
0.6

## exam_weight_by_year
AU_Y1=0.1

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Individual Amino Acid Metabolism > Glutamic Acid

## question_only_for

## library_ids
ART-103-BIO-GLYCINE-GLUTAMATE-AND-BRANCHED-CHAIN

## resource_ids
src_4852d425a88297af190e

## learning_objective
Classify GABA as a non-protein amino acid.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, Protein MCQ bank, Q71.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
Q2 of 2 in this bank testing CON-NEU-46F59E9C3EA406 (see also Q64 above).

---

# Item

## id
QST-AU102-HEM-ENZ-Q51

## title
Lead poisoning inhibits ferrochelatase — what type of inhibition is this?

## question
Lead poisoning leads to anemia by inhibiting ferrochelatase enzyme. Which of the following describes this type of inhibition?

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
Addition of lead will lower the Km and the Vmax of the enzyme

## explanation_a
Incorrect. This kinetic pattern does not describe lead's action on ferrochelatase according to the source's own key.

## answer_b
Addition of lead will increase the Km and not affect the Vmax

## explanation_b
Incorrect. This is the classic pattern of a purely competitive inhibitor, which is not how the source describes lead's action here.

## answer_c
Addition of lead will increase the Km and will lower the Vmax of the enzyme

## explanation_c
Incorrect. This mixed-inhibition pattern is not the description the source's own key selects for lead's action on ferrochelatase.

## answer_d
Lead combines with the enzyme reversibly forming the enzyme-substrate-inhibitor complex

## explanation_d
Correct, per the source's own printed key. The source frames lead's inhibition of ferrochelatase as a reversible binding of lead to the enzyme (forming an enzyme-substrate-inhibitor complex) rather than describing it through the Km/Vmax vocabulary of the other three options — which is exactly why this is the correct choice among four otherwise kinetics-flavoured distractors.

## topic
Clinical biochemistry

## subtopic
Biosynthesis of Heme

## main_concept
CON-HEM-4C0C6A97CA8788

## concept_ids

## contextual_concept_ids

## difficulty
Hard

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.65

## setting
Academic

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
5

## clinical_relevance
0.6

## academic_relevance
0.6

## exam_weight_by_year
AU_Y1=0.15

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Enzymology > Enzyme Inhibition

## question_only_for

## library_ids
ART-103-BIO-HEME-BIOSYNTHESIS-AND-PORPHYRIA

## resource_ids
src_9929d079ddfd6e073223

## learning_objective
Describe the source's own account of how lead inhibits ferrochelatase, distinct from a classic competitive/noncompetitive Km-Vmax framing.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, Enzymes MCQ bank (Dr Mohamed Agha), Q51.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
Tests CON-HEM-4C0C6A97CA8788, HIT-PENDING against docs/Kasr-Source-Imports/concept/103-BMS-mcq-heme-concepts.md — validates only when simulated together with that Kasr file. Sub-lane C's D35 (Enzymology exception reassigned per triage §9).

---

# Item

## id
QST-AU102-HEM-ENZ-Q60

## title
Which vitamin-coenzyme/enzyme pairing is correct?

## question
The following vitamin works as coenzyme with the corresponding enzyme. Which of the following is true?

## subject
haem

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
Biotin and Carboxylases

## explanation_a
Correct. Biotin is the coenzyme for carboxylase reactions — CO2 fixation onto a substrate, as in pyruvate carboxylase and acetyl-CoA carboxylase — which is the one genuinely correct pairing among the four offered.

## answer_b
Thiamin and Ligases

## explanation_b
Incorrect. Thiamine (as thiamine pyrophosphate) is the coenzyme for oxidative decarboxylation reactions and transketolase, not for ligases.

## answer_c
Retinol with Lyases

## explanation_c
Incorrect. Retinol (vitamin A) functions in vision (as retinal) and gene transcription (as retinoic acid); it is not a coenzyme for lyase reactions.

## answer_d
Cobalamin with isomerases

## explanation_d
Incorrect. Cobalamin (vitamin B12) is the coenzyme for methylmalonyl-CoA mutase and methionine synthase — a mutase and a transferase-type reaction respectively, not the isomerase class named here.

## topic
Nutrition

## subtopic
Water-Soluble Vitamins

## main_concept
CON-FND-C9E5128193029E

## concept_ids

## contextual_concept_ids

## difficulty
Hard

## question_type
Classification

## cognitive_effort
High

## cognitive_effort_score
0.6

## setting
Academic

## reasoning_level
3

## inferred_difficulty
40

## exam_relevance
5

## clinical_relevance
0.4

## academic_relevance
0.7

## exam_weight_by_year
AU_Y1=0.15

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Vitamins > Water-Soluble Vitamins

## question_only_for

## library_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## resource_ids
src_9929d079ddfd6e073223

## learning_objective
Identify biotin's coenzyme role with carboxylases as the one correct vitamin-enzyme pairing among four options.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, Enzymes MCQ bank (Dr Mohamed Agha), Q60.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
Tests CON-FND-C9E5128193029E, HIT-PENDING against docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md — validates only when simulated together with that Kasr file. Sub-lane C's D37 (Enzymology exception reassigned per triage §9).
