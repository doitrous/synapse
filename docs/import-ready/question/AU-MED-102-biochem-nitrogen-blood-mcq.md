<!--
  AU-MED-102 · Biochemistry · sub-lane C. 32 MCQs — every Blood-section question this
  sub-lane owns (25 of the AFM bank's 26, Q4 excluded as a duplicate of sub-lane A's C35),
  plus the three Protein-Chemistry exceptions (C37 x2, C38 x2, C39) and the two
  Enzymology exceptions (D35, D37) that triage §9 reassigned here. Every question's
  main_concept is either a concept this lane minted (concept/AU-MED-102-biochem-
  nitrogen-blood-concepts.md) or a Kasr concept this lane's pending-live file updates
  (pending-live/AU-MED-102-biochem-nitrogen-blood.md) — the latter validate only when
  simulated together with the named Kasr concept file, exactly as that file's own header
  states.

  Every key was read directly from the source's own printed answer block
  (scripts/alexandria/pagetext/<sourceId>.json), never from the triage's paraphrase alone —
  see this file's own header comment in the sibling concept file for the one place a
  paraphrase and the source disagreed (H14/Q19).

  Import: Admin › Bulk import → question.
-->

# Item

## id
QST-AU102-HEM-BLOOD-Q01

## title
What is the rate-limiting enzyme of haem synthesis?

## question
What is the rate-limiting enzyme of haem synthesis?

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
Heme synthase

## explanation_a
Incorrect. There is no single enzyme called "haem synthase" in this pathway — the enzyme that performs the final iron-insertion step is ferrochelatase (sometimes loosely called haem synthase in older texts), but that final step is not the rate-limiting one. This option catches a student who has memorised "an enzyme called synthase must be the key one" without checking which step actually controls the pathway's rate.

## answer_b
ALA dehydrase

## explanation_b
Incorrect. ALA dehydratase catalyses the second step (condensing two ALA molecules into porphobilinogen), not the first and rate-limiting one. It is a real enzyme in this pathway — and the one lead also inhibits, alongside ferrochelatase — but it is downstream of the committed step.

## answer_c
Uroporphyrinogen synthase

## explanation_c
Incorrect. This enzyme acts further down the pathway, converting a linear tetrapyrrole to the cyclic uroporphyrinogen. It is a real pathway enzyme but plays no role in setting the overall rate.

## answer_d
ALA synthase

## explanation_d
Correct. ALA synthase catalyses the first and rate-limiting step of haem biosynthesis: condensing glycine with succinyl-CoA to form delta-aminolevulinic acid (ALA), using pyridoxal phosphate as its obligatory coenzyme. Because this is the committed step, the whole pathway's output rises and falls with this one enzyme's activity — which is exactly why exam questions on this chapter focus on naming its substrates and coenzyme rather than any later step. Remembering "ALA synthase, first and slowest" is the single fact this whole chapter's exam questions are built around.

## topic
Clinical biochemistry

## subtopic
Biosynthesis of Heme

## main_concept
CON-HEM-6BA5D04F841FBA

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Mechanism

## cognitive_effort
Low

## cognitive_effort_score
0.25

## setting
Academic

## reasoning_level
1

## inferred_difficulty
75

## exam_relevance
6

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
AU-MED-102 > Biochemistry > Heme Metabolism > Biosynthesis of Heme

## question_only_for

## library_ids
ART-HEM-AU102-HEME-BIOSYNTHESIS

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name the rate-limiting enzyme of haem biosynthesis.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q1.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
Q1 of 3 in this bank testing CON-HEM-6BA5D04F841FBA (see also Q15, Q16 below).

---

# Item

## id
QST-AU102-HEM-BLOOD-Q02

## title
Which of the following is NOT a precursor of haem?

## question
Which of the following is NOT a precursor of haem?

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
Porphobilinogen

## explanation_a
Incorrect as the answer to "except" — porphobilinogen genuinely is a haem precursor, formed when two ALA molecules condense.

## answer_b
Urobilinogen

## explanation_b
Correct. Urobilinogen is not a precursor of haem — it is a product of haem's later catabolism, formed in the gut from bilirubin after haem has already been made, used and broken down. It shares the "-ogen" ending with the true biosynthetic intermediates, which is exactly why it is the option students misclassify: the family resemblance in the name is a trap, not a clue to its chemistry.

## answer_c
Uroporphyrinogen

## explanation_c
Incorrect as the answer to "except" — uroporphyrinogen genuinely is a haem precursor, formed several steps after porphobilinogen on the same pathway.

## answer_d
Protoporphyrinogen

## explanation_d
Incorrect as the answer to "except" — protoporphyrinogen genuinely is a haem precursor, the intermediate that ferrochelatase acts on (after oxidation to protoporphyrin) to insert iron and complete haem.

## topic
Clinical biochemistry

## subtopic
Biosynthesis of Heme

## main_concept
CON-HEM-E37BFF798CC937

## concept_ids

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
AU-MED-102 > Biochemistry > Heme Metabolism > Biosynthesis of Heme

## question_only_for

## library_ids
ART-HEM-AU102-HEME-BIOSYNTHESIS

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Distinguish urobilinogen (a haem catabolic product) from the genuine haem biosynthetic intermediates.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q2.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes


---

# Item

## id
QST-AU102-HEM-BLOOD-Q03

## title
HbA differs from HbF in that:

## question
HbA differs from HbF in that:

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
HbA has only alpha chains

## explanation_a
Incorrect. HbA is α2β2 — it has alpha chains and beta chains, not alpha chains alone.

## answer_b
HbF cannot bind to 2,3-BPG

## explanation_b
Correct. HbF's gamma chain lacks the specific residues the beta chain offers for binding 2,3-bisphosphoglycerate (2,3-BPG), the red-cell metabolite that normally lowers haemoglobin's oxygen affinity by stabilising its low-affinity state. Because HbF cannot bind 2,3-BPG as effectively as HbA can, it is not pulled toward that low-affinity conformation, and so it holds oxygen more tightly at the same partial pressure — the mechanism that lets the fetal circulation draw oxygen across the placenta from the maternal side. This is the one fact in the option list that correctly separates HbA from HbF at the molecular level.

## answer_c
HbF can bind only 2 molecules of oxygen

## explanation_c
Incorrect. Like HbA, HbF is a tetramer that binds up to four oxygen molecules, one per haem group; the number of oxygen-binding sites is not what distinguishes the two.

## answer_d
HbA contains y- chains

## explanation_d
Incorrect, and it names the wrong molecule's composition. Gamma (y/γ) chains belong to HbF (α2γ2), not HbA, which is α2β2.

## topic
Clinical biochemistry

## subtopic
Haemoglobin structure and function

## main_concept
CON-HEM-25332F0339A5B2

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Mechanism

## cognitive_effort
Medium

## cognitive_effort_score
0.55

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

## exam_relevance
6

## clinical_relevance
0.6

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
AU-MED-102 > Biochemistry > Haemoglobin > Fetal versus Adult Haemoglobin

## question_only_for

## library_ids
ART-HEM-AU102-HEMOGLOBIN-TYPES

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Explain why HbF has higher oxygen affinity than HbA in terms of 2,3-BPG binding.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q3.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
Q1 of 2 in this bank testing CON-HEM-25332F0339A5B2 (see also Q14 below).

---

# Item

## id
QST-AU102-HEM-BLOOD-Q05

## title
Deficiency of vitamin K can occur in all the following conditions EXCEPT:

## question
Deficiency of vitamin K can occur in all the following conditions EXCEPT:

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
Following gastrectomy

## explanation_a
Correct, per this bank's own printed key — the source presents gastrectomy as the condition that does NOT typically cause vitamin K deficiency, in contrast with the three options that follow. This lane records the answer as printed; it sits uneasily beside wider clinical teaching that any major upper-GI surgery can impair fat-soluble-vitamin absorption generally, and that tension is recorded rather than silently resolved (see this question's main concept's own uncertainty note).

## answer_b
Prolonged antibiotic therapy

## explanation_b
Incorrect as the answer to "except" — prolonged broad-spectrum antibiotics suppress the gut flora that normally synthesise a meaningful share of the body's vitamin K, so this genuinely is a recognised cause of deficiency.

## answer_c
Obstructive jaundice

## explanation_c
Incorrect as the answer to "except" — vitamin K is fat-soluble and needs bile salts for intestinal absorption; obstructive jaundice removes bile from the gut and so impairs vitamin K absorption.

## answer_d
Administration of dicoumarol

## explanation_d
Incorrect as the answer to "except" — dicoumarol is a vitamin K antagonist, so administering it produces a functional vitamin K deficiency state even though the vitamin itself may be present.

## topic
Nutrition

## subtopic
Vitamin K

## main_concept
CON-HEM-A8349B0F9F93BF

## concept_ids

## contextual_concept_ids

## difficulty
Hard

## question_type
Pathophysiology

## cognitive_effort
High

## cognitive_effort_score
0.7

## setting
Academic

## reasoning_level
3

## inferred_difficulty
35

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
AU-MED-102 > Biochemistry > Vitamins > Vitamin K

## question_only_for

## library_ids
ART-HEM-AU102-BLOOD-VITAMINS-IRON

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Recognise the causes of vitamin K deficiency the source names, and record its own printed exception rather than the more general clinical teaching.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q5.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes
The printed key's own answer (gastrectomy as the exception) is recorded as printed and flagged for a reviewer, per LANE-BRIEF's "record the questionable printed keys exactly as the triage did" — see this question's main concept's uncertainty field.

---

# Item

## id
QST-AU102-HEM-BLOOD-Q06

## title
What is the biochemical function of vitamin K?

## question
What is the biochemical function of vitamin K?

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
Converting proline to hydroxyproline

## explanation_a
Incorrect. Proline hydroxylation is a step in collagen synthesis and requires vitamin C, not vitamin K.

## answer_b
Conversion of prothrombin to thrombin

## explanation_b
Incorrect. That conversion is a proteolytic step in the coagulation cascade itself (performed by activated Factor X in the prothrombinase complex); vitamin K acts earlier, during the synthesis of prothrombin and the other factors, not at their activation.

## answer_c
Gamma carboxylation of glutamate in clotting factors

## explanation_c
Correct. Vitamin K is the cofactor for gamma-carboxylation of specific glutamate residues on clotting factors II, VII, IX and X, converting them to Gla residues that can chelate calcium and anchor the factors to phospholipid surfaces during coagulation. This post-translational modification, not any step in the cascade's activation sequence, is vitamin K's actual biochemical job — and it is why deficiency produces factors that exist but cannot function.

## answer_d
Inhibition of lipid peroxidation in biomembranes

## explanation_d
Incorrect. Preventing lipid peroxidation in membranes is a function of vitamin E, not vitamin K.

## topic
Nutrition

## subtopic
Vitamin K

## main_concept
CON-HEM-A8349B0F9F93BF

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
55

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
AU-MED-102 > Biochemistry > Vitamins > Vitamin K

## question_only_for

## library_ids
ART-HEM-AU102-BLOOD-VITAMINS-IRON

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
State vitamin K's biochemical function as gamma-carboxylation of clotting-factor glutamate residues.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q6.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Q1 of 2 in this bank testing CON-HEM-A8349B0F9F93BF (see also Q17 below).

---

# Item

## id
QST-AU102-HEM-BLOOD-Q09

## title
Which compound is excreted in urine in vitamin B12 deficiency?

## question
Which compound is excreted in urine in vitamin B12 deficiency?

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
FIGLU (formimino glutamic acid)

## explanation_a
Incorrect. FIGLU accumulates in histidine catabolism when tetrahydrofolate (not B12) is deficient — the FIGLU excretion test is classically used to diagnose folate deficiency, which is exactly why it is offered here as a distractor for the B12 question.

## answer_b
Homocysteine

## explanation_b
Incorrect as the single best answer. Homocysteine does rise in both B12 and folate deficiency (both vitamins are needed to remethylate it to methionine), so it is not the marker that specifically distinguishes the two — methylmalonic acid is.

## answer_c
Xanthurenic acid

## explanation_c
Incorrect. Xanthurenic acid accumulates in tryptophan metabolism when vitamin B6 is deficient, not B12.

## answer_d
Methyl malonic acid

## explanation_d
Correct. B12 deficiency blocks methylmalonyl-CoA mutase, the B12-dependent enzyme that converts methylmalonyl-CoA to succinyl-CoA, so methylmalonic acid (and the propionate upstream of it) accumulates and is excreted in urine. This is the specific biochemical marker that distinguishes B12 deficiency from folate deficiency: both impair DNA synthesis and cause the same macrocytic anaemia, but only B12 deficiency raises methylmalonic acid, because folate plays no part in this particular reaction.

## topic
Nutrition

## subtopic
Vitamin B12

## main_concept
CON-HEM-6BB1F814D007D1

## concept_ids

## contextual_concept_ids

## difficulty
Hard

## question_type
Pathophysiology

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
6

## clinical_relevance
0.7

## academic_relevance
0.75

## exam_weight_by_year
AU_Y1=0.15

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Vitamins > Vitamin B12

## question_only_for

## library_ids
ART-HEM-AU102-BLOOD-VITAMINS-IRON

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name methylmalonic acid as the urinary marker of B12 deficiency, and explain why it is specific to B12 rather than folate.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q9.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
55

## randomise_answers
yes

## author_notes
Q1 of 2 in this bank testing CON-HEM-6BB1F814D007D1 (see also Q19 below).

---

# Item

## id
QST-AU102-HEM-BLOOD-Q11

## title
What metal is present in vitamin B12?

## question
What metal is present in vitamin B12?

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
Copper

## explanation_a
Incorrect. Copper is a cofactor for enzymes such as cytochrome oxidase and ceruloplasmin, not a structural component of vitamin B12.

## answer_b
Cobalt

## explanation_b
Correct. Vitamin B12's chemical name, cobalamin, is drawn directly from the cobalt ion held at the centre of its corrin ring — the feature that distinguishes it structurally from every other vitamin, none of which is metal-centred this way.

## answer_c
Chromium

## explanation_c
Incorrect. Chromium is associated with glucose-tolerance-factor activity, not with vitamin B12's structure.

## answer_d
Manganese

## explanation_d
Incorrect. Manganese is a cofactor for enzymes such as pyruvate carboxylase and superoxide dismutase, not a component of vitamin B12.

## topic
Nutrition

## subtopic
Vitamin B12

## main_concept
CON-HEM-351861BC9102DA

## concept_ids

## contextual_concept_ids

## difficulty
Easy

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
80

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
AU-MED-102 > Biochemistry > Vitamins > Vitamin B12

## question_only_for

## library_ids
ART-HEM-AU102-BLOOD-VITAMINS-IRON

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name cobalt as the metal at the centre of vitamin B12's structure.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q11.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
30

## randomise_answers
yes

## author_notes


---

# Item

## id
QST-AU102-HEM-BLOOD-Q13

## title
HbA2 contains which types of chains?

## question
HbA2 contains which types of chains?

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
α2, β2

## explanation_a
Incorrect. α2β2 is the composition of the major adult haemoglobin, HbA, not the minor form HbA2.

## answer_b
α2, δ2

## explanation_b
Correct. HbA2, the minor adult haemoglobin (roughly 2.5% of adult haemoglobin), pairs the same two alpha chains with delta chains: α2δ2 — distinct from HbA's beta chains and HbF's gamma chains.

## answer_c
α2, γ2

## explanation_c
Incorrect. α2γ2 is the composition of fetal haemoglobin, HbF, not HbA2.

## answer_d
δ2, β2 (no alpha chains)

## explanation_d
Incorrect. Every normal adult and fetal human haemoglobin variant in this comparison retains the two alpha chains; a haemoglobin with no alpha chains at all is not one of the three variants this chapter compares.

## topic
Clinical biochemistry

## subtopic
Haemoglobin structure and function

## main_concept
CON-HEM-799C0064D0EB21

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Classification

## cognitive_effort_score
0.5

## cognitive_effort
Medium

## setting
Academic

## reasoning_level
2

## inferred_difficulty
50

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
AU-MED-102 > Biochemistry > Haemoglobin > Haemoglobin Variants

## question_only_for

## library_ids
ART-HEM-AU102-HEMOGLOBIN-TYPES

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
State the chain composition of HbA2 (α2δ2) and distinguish it from HbA and HbF.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q13.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
The source's own OCR renders Greek letters as digits; option text reconstructed by sequence position against the printed key and cross-checked against standard biochemistry, per this question's main concept's own uncertainty note.

---

# Item

## id
QST-AU102-HEM-BLOOD-Q14

## title
Fetal Hb is characterized by:

## question
Fetal Hb is characterized by:

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
Contains α2, γ2 chains

## explanation_a
Correct. Fetal haemoglobin (HbF) is α2γ2 — the same two alpha chains as HbA, paired with gamma chains instead of beta chains. This composition is what underlies HbF's poor 2,3-BPG binding and therefore its higher oxygen affinity relative to HbA.

## answer_b
Has lower affinity for O2 than HbA

## explanation_b
Incorrect — the direction is reversed. HbF has HIGHER oxygen affinity than HbA, precisely because its gamma chains bind 2,3-BPG poorly.

## answer_c
Appears after birth

## explanation_c
Incorrect. HbF predominates BEFORE birth (in fetal life) and is progressively replaced by HbA over the first months after birth, not the other way round.

## answer_d
Contains α2, β2 chains

## explanation_d
Incorrect. α2β2 is HbA's composition, not HbF's.

## topic
Clinical biochemistry

## subtopic
Haemoglobin structure and function

## main_concept
CON-HEM-25332F0339A5B2

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Classification

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
1

## inferred_difficulty
65

## exam_relevance
6

## clinical_relevance
0.6

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
AU-MED-102 > Biochemistry > Haemoglobin > Fetal versus Adult Haemoglobin

## question_only_for

## library_ids
ART-HEM-AU102-HEMOGLOBIN-TYPES

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
State the chain composition of HbF (α2γ2) and its oxygen-affinity relationship to HbA.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q14.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
Q2 of 2 in this bank testing CON-HEM-25332F0339A5B2 (see also Q3 above).

---

# Item

## id
QST-AU102-HEM-BLOOD-Q15

## title
ALA synthase requires:

## question
ALA synthase requires:

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
TPP

## explanation_a
Incorrect. Thiamine pyrophosphate (TPP) is the coenzyme for oxidative decarboxylations such as the pyruvate dehydrogenase reaction, not for ALA synthase — a common substitution error since both reaction types involve a condensation/decarboxylation-like chemistry.

## answer_b
ATP

## explanation_b
Incorrect. ATP is not the coenzyme this reaction requires; the condensation of glycine with succinyl-CoA does not consume ATP directly.

## answer_c
PABA

## explanation_c
Incorrect. Para-aminobenzoic acid (PABA) is a precursor bacteria use to synthesise folic acid; it has no role in haem synthesis.

## answer_d
PLP

## explanation_d
Correct. ALA synthase absolutely requires pyridoxal phosphate (PLP, the active form of vitamin B6) as its coenzyme, proceeding through a PLP-glycine Schiff base intermediate exactly as in other amino-acid-handling PLP enzymes. This is why vitamin B6 deficiency or isoniazid therapy (which depletes B6) can produce a sideroblastic-type anaemia through impaired haem synthesis.

## topic
Clinical biochemistry

## subtopic
Biosynthesis of Heme

## main_concept
CON-HEM-6BA5D04F841FBA

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
6

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
AU-MED-102 > Biochemistry > Heme Metabolism > Biosynthesis of Heme

## question_only_for

## library_ids
ART-HEM-AU102-HEME-BIOSYNTHESIS

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name pyridoxal phosphate as ALA synthase's obligatory coenzyme.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q15.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
Q2 of 3 in this bank testing CON-HEM-6BA5D04F841FBA (see also Q1, Q16).

---

# Item

## id
QST-AU102-HEM-BLOOD-Q16

## title
ALA synthase catalyzes condensation of succinyl-CoA with:

## question
ALA synthase catalyzes condensation of succinyl-CoA with:

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
Alanine

## explanation_a
Incorrect. Alanine is not ALA synthase's substrate, despite the similarity of its name to "ALA" — this is precisely the confusion the option is testing.

## answer_b
Cysteine

## explanation_b
Incorrect. Cysteine is not a substrate of this reaction.

## answer_c
Serine

## explanation_c
Incorrect. Serine is not a substrate of this reaction, though it is a PLP-dependent substrate in other pathways (such as sphingolipid synthesis), which is likely why it appears as a distractor here.

## answer_d
None of the above

## explanation_d
Correct. ALA synthase condenses succinyl-CoA specifically with glycine — an option deliberately left off this list — to form delta-aminolevulinic acid. Because none of the three named amino acids (alanine, cysteine, serine) is the true substrate, "none of the above" is correct, and recognising that requires knowing the real answer (glycine) well enough to notice its absence rather than picking the most glycine-sounding wrong option.

## topic
Clinical biochemistry

## subtopic
Biosynthesis of Heme

## main_concept
CON-HEM-6BA5D04F841FBA

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
6

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
AU-MED-102 > Biochemistry > Heme Metabolism > Biosynthesis of Heme

## question_only_for

## library_ids
ART-HEM-AU102-HEME-BIOSYNTHESIS

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Name glycine as ALA synthase's true amino-acid substrate, recognising it may be omitted from an option list.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q16.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Q3 of 3 in this bank testing CON-HEM-6BA5D04F841FBA (see also Q1, Q15). "None of the above" is the source's own printed correct option and is preserved as written, per 05-questions.md's warning against rewriting a source item's own option wording — the "never write 'none of the above'" rule in that manual guides new authoring, not transcription of a source that already used it.

---

# Item

## id
QST-AU102-HEM-BLOOD-Q17

## title
Vitamin K deficiency is manifested by:

## question
Vitamin K deficiency is manifested by:

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
Macrocytic anemia

## explanation_a
Incorrect. Macrocytic anaemia points toward folate or B12 deficiency, not vitamin K — vitamin K's effects are on coagulation, not on red-cell size.

## answer_b
Decreased blood coagulation time

## explanation_b
Incorrect, and it names the wrong direction. Vitamin K deficiency leaves clotting factors un-carboxylated and unable to function, which lengthens coagulation time; it does not shorten it.

## answer_c
Prolonged coagulation time

## explanation_c
Correct. Vitamin K deficiency prevents gamma-carboxylation of clotting factors II, VII, IX and X, so these factors cannot bind calcium or function properly, and coagulation time is prolonged — the clinical manifestation that follows directly from vitamin K's actual biochemical role.

## answer_d
Hemolytic anemia

## explanation_d
Incorrect. Haemolytic anaemia results from accelerated red-cell destruction (for example G6PD deficiency or immune haemolysis), not from a clotting-factor carboxylation defect.

## topic
Nutrition

## subtopic
Vitamin K

## main_concept
CON-HEM-A8349B0F9F93BF

## concept_ids

## contextual_concept_ids

## difficulty
Moderate

## question_type
Pathophysiology

## cognitive_effort
Medium

## cognitive_effort_score
0.4

## setting
Academic

## reasoning_level
2

## inferred_difficulty
60

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
AU-MED-102 > Biochemistry > Vitamins > Vitamin K

## question_only_for

## library_ids
ART-HEM-AU102-BLOOD-VITAMINS-IRON

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
State that vitamin K deficiency manifests as prolonged coagulation time.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q17.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
Q2 of 2 in this bank testing CON-HEM-A8349B0F9F93BF (see also Q6 above).

---

# Item

## id
QST-AU102-IMM-BLOOD-Q18

## title
Each heavy chain of Ig has how many variable and constant domains?

## question
Each heavy chain of an immunoglobulin has ___ variable domain(s) (VH) and ___ constant domain(s) (CH).

## subject
imm

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
2 variable; 2 constant

## explanation_a
Incorrect. Neither the variable nor the constant domain count is doubled on the heavy chain in this way.

## answer_b
1 variable; 1 constant

## explanation_b
Incorrect — this is the LIGHT chain's domain count (1 variable, 1 constant), not the heavy chain's. The heavy chain carries extra constant domains the light chain does not.

## answer_c
1 variable; 2 constant

## explanation_c
Incorrect. The heavy chain's variable-domain count (1) is right, but it carries three constant domains, not two.

## answer_d
1 variable; 3 constant

## explanation_d
Correct. Each immunoglobulin heavy chain carries one variable domain (VH), which together with the light chain's own variable domain forms the antigen-binding site, and three constant domains (CH1-CH3 — a fourth, CH4, replaces the hinge in IgM and IgE), which determine the antibody's class and effector functions. This is the asymmetry that distinguishes the heavy chain from the light chain's simpler 1-variable/1-constant arrangement.

## topic
Immunology

## subtopic
Immunoglobulin structure

## main_concept
CON-IMM-7B24522E4AA746

## concept_ids
CON-IMM-8F37F8822F1157

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
AU-MED-102 > Biochemistry > Blood > Immunoglobulins

## question_only_for

## library_ids
ART-IMM-AU102-IMMUNOGLOBULIN-CLASSES

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
State the heavy chain's domain count (1 variable, 3 constant) and distinguish it from the light chain's.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q18.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
40

## randomise_answers
yes

## author_notes
CON-IMM-8F37F8822F1157 (light chain, live) tagged as a secondary concept_id since option B directly names its domain count as the point of contrast.

---

# Item

## id
QST-AU102-HEM-BLOOD-Q19

## title
Propionic acid accumulation from amino acid degradation results from a deficiency of which vitamin?

## question
Propionic acid accumulation from amino acid degradation would result from a deficiency of which of the following vitamins?

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
Vitamin B6

## explanation_a
Incorrect. Vitamin B6 supports transamination and decarboxylation reactions broadly; it is not the specific vitamin whose deficiency blocks this step of propionate clearance.

## answer_b
Biotin

## explanation_b
Incorrect for this question, though it is a genuinely adjacent fact and the option most likely to mislead. Biotin is the coenzyme for propionyl-CoA carboxylase, the step immediately BEFORE the one this question tests — it converts propionyl-CoA to methylmalonyl-CoA. This question, per the source's own printed key, asks about the step after that one.

## answer_c
Folic acid

## explanation_c
Incorrect. Folate's role is in one-carbon transfer for DNA synthesis, not in propionate/methylmalonate clearance.

## answer_d
Vitamin B12

## explanation_d
Correct, per the source's own printed key. Vitamin B12, as adenosylcobalamin, is the coenzyme for methylmalonyl-CoA mutase, which converts methylmalonyl-CoA to succinyl-CoA. When B12 is deficient this step is blocked, propionyl-CoA and methylmalonyl-CoA accumulate, and propionic-acid-pathway metabolites build up — the same underlying mechanism as the methylmalonic-acid-excretion fact tested elsewhere in this bank.

## topic
Nutrition

## subtopic
Vitamin B12

## main_concept
CON-HEM-6BB1F814D007D1

## concept_ids

## contextual_concept_ids

## difficulty
Challenging

## question_type
Mechanism

## cognitive_effort
High

## cognitive_effort_score
0.8

## setting
Academic

## reasoning_level
4

## inferred_difficulty
25

## exam_relevance
5

## clinical_relevance
0.6

## academic_relevance
0.75

## exam_weight_by_year
AU_Y1=0.15

## years
AU_Y1

## universities
au

## module
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Vitamins > Vitamin B12

## question_only_for

## library_ids
ART-HEM-AU102-BLOOD-VITAMINS-IRON

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Distinguish the biotin-dependent carboxylase step from the B12-dependent mutase step in propionate clearance, and correctly identify which one this question tests.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q19.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
70

## randomise_answers
yes

## author_notes
Q2 of 2 in this bank testing CON-HEM-6BB1F814D007D1 (see also Q9 above). This lane's own module-102 triage originally paraphrased this item as testing biotin; direct verification against the printed key (19=d) shows the correct answer is vitamin B12, not biotin — see this concept's own field_notes for the correction record. Flagged Challenging/high-effort because the correct discrimination requires knowing there are two sequential, differently-cofactored steps, not one.

---

# Item

## id
QST-AU102-IMM-BLOOD-Q20

## title
All of the following are true about IgM antibodies EXCEPT:

## question
All of the following are true with respect to IgM antibodies EXCEPT:

## subject
imm

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
They occur as pentamer

## explanation_a
Incorrect as the answer to "except" — IgM genuinely is assembled as a pentamer, joined at a J chain, which gives it high avidity despite modest per-site affinity.

## answer_b
They predominate in the primary response to antigen

## explanation_b
Incorrect as the answer to "except" — IgM genuinely does predominate early in a primary immune response, before class switching produces IgG.

## answer_c
They are glycoproteins

## explanation_c
Incorrect as the answer to "except" — like every immunoglobulin, IgM genuinely is a glycoprotein.

## answer_d
They mediate allergic reaction

## explanation_d
Correct as the false statement (the "except"). IgM does not mediate allergic (type I hypersensitivity) reactions — that role belongs to IgE, which binds high-affinity Fc receptors on mast cells and basophils so that allergen cross-linking triggers degranulation. Confusing this with IgM is the specific error this question is built to catch.

## topic
Immunology

## subtopic
Immunoglobulin classes

## main_concept
CON-IMM-C654630EE8FAC7

## concept_ids

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
55

## exam_relevance
6

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
AU-MED-102 > Biochemistry > Blood > Immunoglobulins

## question_only_for

## library_ids
ART-IMM-AU102-IMMUNOGLOBULIN-CLASSES

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
List IgM's structural and functional properties, correctly excluding an allergy-mediating role.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q20.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes


---

# Item

## id
QST-AU102-IMM-BLOOD-Q21

## title
Which immunoglobulin is present normally in plasma at the highest concentration?

## question
Which of the following immunoglobulins is present normally in plasma at the highest concentration?

## subject
imm

## status
Draft

## owner
Claude

## vignette

## correct_answer
A

## answer_a
IgG

## explanation_a
Correct. Of the five immunoglobulin classes, IgG is present in plasma at the highest concentration (roughly 70-75% of total serum immunoglobulin) — the class most relied upon for passive immunity across the placenta and for a durable secondary-response antibody titre.

## answer_b
IgM

## explanation_b
Incorrect. IgM predominates early in the primary response and is assembled as a pentamer, but it is not the class present at the highest total plasma concentration.

## answer_c
IgA

## explanation_c
Incorrect. IgA is the principal immunoglobulin in secretions (milk, saliva, mucus), not the one at the highest concentration in plasma.

## answer_d
IgD

## explanation_d
Incorrect. IgD is present at very low concentration in serum; its main role is as a B-cell surface receptor rather than a secreted plasma antibody.

## topic
Immunology

## subtopic
Immunoglobulin classes

## main_concept
CON-IMM-6EFE000F60C739

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Classification

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
AU-MED-102 > Biochemistry > Blood > Immunoglobulins

## question_only_for

## library_ids
ART-IMM-AU102-IMMUNOGLOBULIN-CLASSES

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Rank IgG as the immunoglobulin present at the highest plasma concentration.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q21.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
35

## randomise_answers
yes

## author_notes


---

# Item

## id
QST-AU102-IMM-BLOOD-Q22

## title
Which immunoglobulin is the principal one found in secretions such as milk?

## question
Which immunoglobulin is the principal one found in secretions such as milk?

## subject
imm

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
IgG

## explanation_a
Incorrect. IgG dominates plasma, not secretions — this is the option a student picks by reflexively naming "the main antibody" without noticing the question specifies a secretion.

## answer_b
IgM

## explanation_b
Incorrect. IgM is the primary-response, pentameric antibody in plasma; it is not the antibody of milk and mucosal secretions.

## answer_c
IgA

## explanation_c
Correct. IgA is exported into secretions — milk, saliva, tears, respiratory and gut mucus — as a dimer linked by a secretory component that protects it from proteolytic digestion, which is why it, not IgG, is the antibody found in milk and confers passive mucosal immunity to a breastfeeding infant.

## answer_d
IgD

## explanation_d
Incorrect. IgD functions mainly as a B-cell surface receptor, not as a secretory antibody.

## topic
Immunology

## subtopic
Immunoglobulin classes

## main_concept
CON-IMM-88E230DE36ABFA

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Classification

## cognitive_effort
Low

## cognitive_effort_score
0.3

## setting
Academic

## reasoning_level
1

## inferred_difficulty
65

## exam_relevance
5

## clinical_relevance
0.4

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
AU-MED-102 > Biochemistry > Blood > Immunoglobulins

## question_only_for

## library_ids
ART-IMM-AU102-IMMUNOGLOBULIN-CLASSES

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Identify IgA as the principal immunoglobulin in secretions such as milk.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q22.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
35

## randomise_answers
yes

## author_notes


---

# Item

## id
QST-AU102-IMM-BLOOD-Q23

## title
Light chains of immunoglobulins are:

## question
Light chains of immunoglobulins are:

## subject
imm

## status
Draft

## owner
Claude

## vignette

## correct_answer
C

## answer_a
Specific for each class of antibody

## explanation_a
Incorrect. Light chains are shared across immunoglobulin classes (kappa or lambda type), rather than being unique markers of a particular class — it is the heavy chain that determines the class.

## answer_b
There are five types of light chains

## explanation_b
Incorrect. There are two types of light chain, kappa and lambda, not five.

## answer_c
Contains antigen binding site

## explanation_c
Correct. The light chain's variable domain, together with the heavy chain's variable domain, forms the antigen-binding site (the Fab region's business end) — so the light chain genuinely does contribute to antigen recognition, alongside its single constant domain.

## answer_d
Have only a constant region

## explanation_d
Incorrect. A light chain has both a variable domain and a constant domain (one of each) — not a constant region alone.

## topic
Immunology

## subtopic
Immunoglobulin structure

## main_concept
CON-IMM-8F37F8822F1157

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
AU-MED-102 > Biochemistry > Blood > Immunoglobulins

## question_only_for

## library_ids
ART-IMM-TOP-988457F417

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
State that the immunoglobulin light chain contributes to the antigen-binding site.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q23.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
45

## randomise_answers
yes

## author_notes
Tests CON-IMM-8F37F8822F1157, a LIVE concept (already published) updated via a sparse record in this hand-over's own concept file, not pending-live — library_ids cites its existing live teaching article, ART-IMM-TOP-988457F417.

---

# Item

## id
QST-AU102-IMM-BLOOD-Q24

## title
Which of the following is NOT TRUE about IgE?

## question
Which of the following is NOT TRUE about IgE?

## subject
imm

## status
Draft

## owner
Claude

## vignette

## correct_answer
D

## answer_a
An allergy associated immunoglobulin

## explanation_a
Incorrect as the answer to "NOT TRUE" — IgE genuinely is the immunoglobulin associated with allergic (type I hypersensitivity) reactions.

## answer_b
The least abundant immunoglobulin in the plasma

## explanation_b
Incorrect as the answer to "NOT TRUE" — IgE genuinely is the least abundant of the five immunoglobulin classes by plasma concentration.

## answer_c
Binds to mast cells

## explanation_c
Incorrect as the answer to "NOT TRUE" — IgE genuinely binds high-affinity Fc receptors on mast cells (and basophils), which is the basis of the allergic response it mediates.

## answer_d
Can cross the placental barrier

## explanation_d
Correct as the false statement. IgE does NOT cross the placental barrier — unlike IgG, which does. A fetus is therefore not passively sensitised (or protected) by maternal IgE the way it can be by maternal IgG, which is exactly the property this question isolates by asking which statement is false.

## topic
Immunology

## subtopic
Immunoglobulin classes

## main_concept
CON-IMM-3A081F9C7FBB9D

## concept_ids

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
AU-MED-102 > Biochemistry > Blood > Immunoglobulins

## question_only_for

## library_ids
ART-IMM-AU102-IMMUNOGLOBULIN-CLASSES

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
List IgE's defining properties and correctly state that it does not cross the placenta.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q24.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
50

## randomise_answers
yes

## author_notes


---

# Item

## id
QST-AU102-HEM-BLOOD-Q25

## title
Iron is deficient in:

## question
Iron is deficient in:

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
Cereals (rice, wheat)

## explanation_a
Incorrect. Cereals are a meaningful dietary source of iron, not a poor one.

## answer_b
Maize and corn

## explanation_b
Incorrect for this question's intended answer — maize and corn are not the food this bank's key highlights as iron-poor.

## answer_c
Pulses (bengal gram, etc.)

## explanation_c
Incorrect. Pulses (legumes such as bengal gram) are a meaningful dietary source of iron, not a poor one.

## answer_d
Milk

## explanation_d
Correct. Milk is a notably poor source of dietary iron compared with cereals and pulses — part of why prolonged, exclusive milk feeding without iron-fortified weaning foods is a recognised route to iron-deficiency anaemia in infants.

## topic
Nutrition

## subtopic
Iron

## main_concept
CON-HEM-9E0A054961D86A

## concept_ids

## contextual_concept_ids

## difficulty
Easy

## question_type
Classification

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
ART-HEM-AU102-BLOOD-VITAMINS-IRON

## resource_ids
src_01ab4268402d32d4d111

## learning_objective
Identify milk as a poor dietary source of iron relative to cereals and pulses.

## source_citation
Alexandria University Faculty of Medicine Biochemistry Department, AFM Question Bank, Blood section, Q25.

## attached_image

## attachments

## media_recommendations

## estimated_seconds
35

## randomise_answers
yes

## author_notes

