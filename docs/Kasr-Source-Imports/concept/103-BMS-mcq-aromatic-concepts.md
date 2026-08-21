<!--
  103 BMS · Biochemistry · the seven concepts the aromatic and heterocyclic amino
  acid MCQs test, where nothing already authored covers them.

  SEVEN NEW CONCEPTS. Four for phenylalanine and tyrosine, three for tryptophan
  and histidine. They exist because the department question book
  (src_07f0a0ff41addf826c7f) examines the "Individual Amino Acid Metabolism"
  chapter at a depth the 2025 end-of-year paper never reached: that paper's
  Case (1) was a phenylketonuria infant and nothing else in this chapter.

  WHAT WAS MAPPED RATHER THAN MINTED. The four phenylketonuria concepts already
  authored in ./103-BMS-biochemistry-concepts.md are pointed at and are NOT
  re-authored here:

    CON-FND-D7BB8C3AFB54CC  PKU is deficiency of phenylalanine hydroxylase
    CON-FND-587B0A39D3C0BD  the neurological mechanism of PKU
    CON-FND-1DF6B985CB77A1  the two causes of PKU hypopigmentation
    CON-FND-81A4F3A9C51B7B  dietary treatment of PKU

  No second phenylketonuria concept is written. Each of the four concepts on this
  side of the chapter that stands next to one of them names it in
  related_concept_ids and records the near miss in rejected_merge_candidate_ids
  with the reason it was not merged.

  LIVE STATE WAS SEARCHED BY LABEL TEXT, NEVER BY SUBJECT, because 736 of the
  1,718 live concepts carry a legacy subject and `fnd`, `neu` and `gi` report zero
  while their namespaces are full. Ten live records came back across the searches
  for serotonin, catecholamines, histamine, melanin, tyrosine, carcinoid and
  dopamine. Every one was read against 00-START-HERE §4 and none teaches the
  biochemistry of a precursor — they are the platelet granule, the mast cell
  granule, the sinoatrial node, the adrenal medulla, the melanocyte in a tumour
  and the argentaffin cell under a silver stain. All are recorded in
  rejected_merge_candidate_ids on the concept each nearly matched. Searches for
  "melatonin", "alkaptonuria", "tetrahydrobiopterin" and "5-HIAA" returned nothing
  at all.

  EVIDENCE. atomic_claim_ids is [clear] on every record with a field_notes reason.
  This lane was scoped to an article file and a concept file; the evidence chain is
  a separate scope and is owed. No claim ID was invented to fill the column.

  THE SOURCE IS ONE BOOK: src_300847a5fa64809d6c07, Dpt book Biochemistry 103.pdf,
  chapter "Individual Amino Acid Metabolism", printed pages 100 to 105. Where the
  book does not support something the question book examines, it is recorded in
  evidence_gaps rather than invented — tyrosinaemia and the name
  fumarylacetoacetate hydrolase, the steps from DOPA to adrenaline, and the
  convergence of three hydroxylases on one coenzyme are all flagged that way.

  ONE CANCELLED TOPIC. The department orientation for 2025-2026 cancels
  "Histidine & proline (p105)" from both the end-of-module and the final exam.
  CON-FND-82BFCE60217493 is that material. It is authored anyway, because the item
  is still in the question book and a student may still meet it, but its weights
  claim no examination and the cancellation is recorded in its field_notes.

  Import: Admin › Concepts › Import. Order: article → concept.
-->

# Item

## label
Phenylalanine hydroxylase runs on tetrahydrobiopterin, and the same coenzyme stands at the head of tyrosine and tryptophan hydroxylation too

## id
CON-FND-A6E502DCE4232F

## canonical_key
phenylalanine.hydroxylase.tetrahydrobiopterin

## aliases
Phenylalanine hydroxylase
Tetrahydrobiopterin
BH4
Hydroxylation of phenylalanine to tyrosine
Coenzyme of phenylalanine hydroxylase
BH4-dependent hydroxylases

## arabic_label
إنزيم هيدروكسيلاز الفينيل ألانين ومساعده رباعي هيدرو البيوبترين

## arabic_aliases
رباعي هيدرو البيوبترين
تحويل الفينيل ألانين إلى تيروسين
مانح الهيدروجين للإنزيم

## definition
Phenylalanine is an essential amino acid and tyrosine is not, because phenylalanine hydroxylase (PAH) makes tyrosine from it. The enzyme requires tetrahydrobiopterin (BH4) as its coenzyme and hydrogen donor: molecular oxygen supplies the hydroxyl group that goes onto the ring, BH4 is oxidised to BH2 as it gives up its hydrogen, and NADPH reduces BH2 back to BH4 so the coenzyme cycles rather than being consumed. The book gives tyrosine hydroxylase, which begins catecholamine synthesis, "the same factors as those for phenylalanine hydroxylase", and makes tryptophan hydroxylase BH4-dependent as well.

## explicit_objective
Name tetrahydrobiopterin as the coenzyme of phenylalanine hydroxylase, say what molecular oxygen and NADPH each contribute to the reaction, and name the two other hydroxylases the book gives the same coenzyme.

## pitfalls
Answering SAM, glutathione or Cu²⁺. SAM is the methyl donor of transmethylation and adds a methyl group, not a hydroxyl. Glutathione is the antioxidant tripeptide and belongs to methionine's chapter. Cu²⁺, with vitamin C, is the cofactor of p-hydroxyphenylpyruvate hydroxylase one step into tyrosine catabolism, and vitamin C with Fe²⁺ belongs to homogentisate oxidase one step further on — three hydroxylases within two printed pages with three different cofactor sets.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-FND-T02 | SYS-NEU-T02

## topic
Amino acids and proteins

## subtopic
Aromatic Amino Acids

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Aromatic Amino Acids (Phenylalanine and Tyrosine)

## article_ids
ART-103-BIO-PHENYLALANINE-AND-TYROSINE

## related_article_ids
ART-103-BIO-PHENYLKETONURIA | ART-103-BIO-TRYPTOPHAN-AND-HISTIDINE

## related_concept_ids
CON-FND-D7BB8C3AFB54CC | CON-FND-FA4D15805B9D02 | CON-NEU-6C4A6BDA725F0E

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.6

## exam_weight_by_year
KAU_Y1=0.6

## clinical_relevance
0.7

## academic_relevance
0.95

## weight_confidence
0.5

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Aromatic Amino Acids (Phenylalanine and Tyrosine)

## exam_signal
src_07f0a0ff41addf826c7f | department_questions | undated | p122 q17; p123 q22 | 103 BMS

## confidence
0.95

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Tyrosine is a non-essential amino acid, synthesized from phenylalanine, by phenylalanine hydroxylase (PAH) enzyme which requires tetrahydrobiopterin (BH4) as a coenzyme (hydrogen donor)."
"Tyrosine is hydroxylated to dihydroxyphenylalanine (DOPA) by tyrosine hydroxylase that needs the same factors as those for phenylalanine hydroxylase."
"Tryptophan undergoes hydroxylation by BH4-dependent tryptophan hydroxylase, then decarboxylated to form serotonin (5-hydroxytryptamine)."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-FND-D7BB8C3AFB54CC

## conflicts
[clear]

## uncertainty
The book writes the coenzyme three different ways in three figures — "BH4" in the phenylalanine scheme, "Biopterin-H4" in the tyrosine scheme and "biopterin" in the tryptophan scheme. They are treated here as one compound, which is what the text's own naming implies, but the book never says so.

## evidence_gaps
Evidence must be attached before publication.
Supported by the department book and the department question book only; no independent biochemistry reference has been attached.
The convergence of three hydroxylations on one coenzyme is assembled from three sentences on three separate pages. The book never states it as a single fact, and never says what a defect of BH4 does to all three pathways at once — it says only that BH4 deficiency causes about 1–2 per cent of phenylketonuria and that those cases need BH4 supplementation as well as diet.
The book gives BH4 no structure, no route of synthesis and no regenerating enzyme; dihydrobiopterin reductase is named nowhere in it.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_needs_evidence_chain

## exclusion_reason

## field_notes
microtopicId: The overlay tree records no child below "Aromatic Amino Acids", so the path stops there and the book's own section name is carried by module_subject instead. The four pending phenylketonuria concepts use the same placement and this concept is deliberately filed beside them.
nanotopicId: No nanotopic level exists below the microtopic anywhere under DIS-BIO in this module's tree.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
sourceCandidateIds: Searched live state by label text for "tetrahydrobiopterin", "phenylalanine" and "tyrosine". "Tetrahydrobiopterin" returns nothing at all; "phenylalanine" returns only the four pending phenylketonuria concepts and the question titles; "tyrosine" returns CON-END-2A7BECE1524359, which is the insulin receptor's tyrosine kinase and is a different word rather than a near miss. No corpus candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: No claim in the evidence store asserts this, and this lane was scoped to an article file and a concept file only, so no claim was authored. The evidence chain is a separate scope, is owed, and is named in the hand-off; an ID was not invented to fill the field.
exclusionReason: Not excluded. Printed pages 100 to 102 of the department book are not on the department's cancelled-items list.
rejectedMergeCandidateIds: CON-FND-D7BB8C3AFB54CC states that PKU is a deficiency of phenylalanine hydroxylase and names BH4 in passing as the enzyme's coenzyme and as the minority cause. Not merged, and cross-linked instead. That record's objective is to diagnose a disease from a mousy odour and a raised metabolite; this one's is to name a coenzyme and say what oxygen and NADPH do in the normal reaction. Question 17 of the chapter tests this without mentioning PKU at all, and question 22 tests that one without mentioning BH4, so a student can hold either without the other.
relationships: Walked the four pending phenylketonuria concepts, the eight pending general-protein-metabolism concepts under DIS-BIO-T05, the six minted beside this one and the ten live records the label searches returned. Three loose neighbours are in related_concept_ids. No typed edges are written: this lane authors no relations file, and a prerequisite_of edge from this concept to CON-FND-D7BB8C3AFB54CC and to CON-FND-FA4D15805B9D02 is owed.

---

# Item

## label
Tyrosine is non-essential and mixed: its catabolism ends in fumarate, which is glucogenic, and acetoacetate, which is ketogenic

## id
CON-FND-634036621EB132

## canonical_key
tyrosine.catabolism.fumarate-acetoacetate

## aliases
Tyrosine
Catabolic fate of tyrosine
Mixed amino acid
Glucogenic and ketogenic amino acid
Non-essential amino acid
Fumarate and acetoacetate
Tyrosine aminotransferase

## arabic_label
التيروسين حمض أميني مختلط غير أساسي

## arabic_aliases
المصير الهدمي للتيروسين
الفومارات والأسيتوأسيتات
حمض أميني مولد للجلوكوز ومولد للكيتونات

## definition
Tyrosine is non-essential because phenylalanine hydroxylase makes it from phenylalanine, and it is a mixed amino acid because its catabolism ends in two different kinds of product. Tyrosine aminotransferase, a PLP enzyme, transaminates it with α-ketoglutarate to p-hydroxyphenylpyruvate; p-hydroxyphenylpyruvate hydroxylase, needing vitamin C and Cu²⁺, converts that to homogentisate and releases CO2; homogentisate oxidase, needing vitamin C and Fe²⁺, opens the ring to maleylacetoacetate; an isomerase and then a hydrolase split it into fumarate, which is glucogenic, and acetoacetate, which is ketogenic. The book's summary table lists tyrosine as mixed and non-essential, and phenylalanine as mixed and essential.

## explicit_objective
Classify tyrosine as non-essential and mixed, name fumarate and acetoacetate as its two catabolic end products, and explain why phenylalanine's carbon enters the citric acid cycle as fumarate.

## pitfalls
Calling tyrosine essential because a phenylketonuric child must be given it. The book's table lists it as non-essential, and the dietary requirement in PKU follows from the missing enzyme rather than from any property of the amino acid. The second slip is looking for a catabolic route of phenylalanine's own: there is none in this book, because phenylalanine is catabolised only after it has been converted to tyrosine.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-FND-T06 | DIS-BIO-T03

## topic
Amino acids and proteins

## subtopic
Aromatic Amino Acids

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Aromatic Amino Acids (Phenylalanine and Tyrosine)

## article_ids
ART-103-BIO-PHENYLALANINE-AND-TYROSINE

## related_article_ids
ART-103-BIO-PHENYLKETONURIA | ART-103-BIO-CITRIC-ACID-CYCLE

## related_concept_ids
CON-FND-A6E502DCE4232F | CON-FND-49155E4E08617B | CON-FND-81A4F3A9C51B7B

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.7

## exam_weight_by_year
KAU_Y1=0.7

## clinical_relevance
0.5

## academic_relevance
0.9

## weight_confidence
0.55

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Aromatic Amino Acids (Phenylalanine and Tyrosine)

## exam_signal
src_07f0a0ff41addf826c7f | department_questions | undated | p122 q18 and q19; p123 q26 | 103 BMS

## confidence
0.95

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Tyrosine is a mixed amino acid; the catabolic products are fumarate (glucogenic), and acetoacetate (ketogenic)."
"Tyrosine    Mixed    Non-essential    - Synthesis of catecholamines, thyroid hormones & melanin."
"Phenylalanine    Mixed    Essential    - Synthesis of tyrosine and its derivatives"

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-FND-81A4F3A9C51B7B

## conflicts
[clear]

## uncertainty
The book classifies tyrosine as non-essential in its summary table and, four pages earlier, prescribes tyrosine supplementation as part of the treatment of classic PKU. It never bridges those two statements, and the word "conditionally essential" appears nowhere in it. The classification is recorded here as the book gives it, and the tension is flagged rather than resolved.

## evidence_gaps
Evidence must be attached before publication.
Supported by the department book and the department question book only; no independent biochemistry reference has been attached.
The book prints the last two enzymes of the pathway only as "Isomerase" and "Hydrolase", with no names. Fumarylacetoacetate hydrolase, which the question book uses as a distractor, is not named in this textbook.
The book gives no ATP or energy yield for tyrosine catabolism and does not say in which tissue it runs.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_needs_evidence_chain

## exclusion_reason

## field_notes
microtopicId: The overlay tree records no child below "Aromatic Amino Acids", so the path stops there and the book's own section name is carried by module_subject.
nanotopicId: No nanotopic level exists below the microtopic anywhere under DIS-BIO in this module's tree.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; no corpus extraction record exists.
sourceCandidateIds: Searched live state by label text for "tyrosine", "glucogenic", "ketogenic" and "mixed amino acid". The only live hit on any of them is CON-END-2A7BECE1524359, the insulin receptor tyrosine kinase, which shares a word and nothing else. No corpus candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: No claim in the evidence store asserts this. The lane was scoped to an article file and a concept file, so no claim was authored; the evidence chain is a separate scope and is owed rather than filled with an invented ID.
exclusionReason: Not excluded. Printed pages 100 and 107 of the department book are not on the department's cancelled-items list.
rejectedMergeCandidateIds: CON-FND-81A4F3A9C51B7B is the pending PKU treatment concept — restrict phenylalanine, supplement tyrosine, start early. Not merged, and cross-linked instead. It is a management concept about a disease; this is a classification concept about a molecule, and question 18 asks for the classification with no disease in the stem. They also disagree in emphasis about the same word, which is recorded in uncertainty above and is the reason a reviewer should read them together.
relationships: Walked the four pending phenylketonuria concepts, the pending citric acid cycle set that fumarate feeds, and the six minted beside this one. Three loose neighbours are in related_concept_ids. No typed edges are written: this lane authors no relations file, and a mechanism_step_before edge from this concept to CON-FND-49155E4E08617B is owed.

---

# Item

## label
Tyrosine is the precursor of the catecholamines, melanin and the thyroid hormones, and DOPA is where the first two part company

## id
CON-FND-FA4D15805B9D02

## canonical_key
tyrosine.derivatives.catecholamines-melanin-thyroid

## aliases
Derivatives of tyrosine
Catecholamine synthesis
Tyrosine hydroxylase
DOPA
Dihydroxyphenylalanine
Melanin synthesis
Tyrosinase
Thyroid hormone synthesis

## arabic_label
مشتقات التيروسين: الكاتيكولامينات والميلانين وهرمونات الغدة الدرقية

## arabic_aliases
تخليق الكاتيكولامينات
ثنائي هيدروكسي فينيل ألانين
تخليق الميلانين

## definition
Tyrosine is hydroxylated to dihydroxyphenylalanine (DOPA) by tyrosine hydroxylase, which needs the same factors as phenylalanine hydroxylase, and DOPA is the precursor of the catecholamines — dopamine, noradrenaline and adrenaline. DOPA produced in melanocytes is used instead for the synthesis of melanin by tyrosinase, so the same intermediate serves the transmitter pathway in one tissue and the pigment pathway in another. The third derivative bypasses DOPA altogether: tyrosine residues of thyroglobulin are iodinated to monoiodotyrosine and diiodotyrosine, and two diiodotyrosine couple to give T4 while one of each gives T3.

## explicit_objective
Name tyrosine as the precursor of the catecholamines, melanin and the thyroid hormones; place DOPA as the branch point between the catecholamine and melanin routes; and name the enzyme that makes DOPA and the one that consumes it.

## pitfalls
Assigning serotonin or melatonin to tyrosine. Both come from tryptophan, and melanin and melatonin are two letters apart — the most reliable confusion in the chapter. GABA is not on the list either; that is decarboxylated from glutamate. The other error is routing the thyroid hormones through DOPA: they are built on tyrosine residues still bound in thyroglobulin, and no hydroxylase is involved.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-NEU-T02 | SYS-END-T03

## topic
Amino acids and proteins

## subtopic
Aromatic Amino Acids

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Aromatic Amino Acids (Phenylalanine and Tyrosine)

## article_ids
ART-103-BIO-PHENYLALANINE-AND-TYROSINE

## related_article_ids
ART-103-BIO-PHENYLKETONURIA | ART-103-BIO-TRYPTOPHAN-AND-HISTIDINE

## related_concept_ids
CON-FND-634036621EB132 | CON-FND-1DF6B985CB77A1 | CON-DER-6665EA8EA687C3

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.8

## exam_weight_by_year
KAU_Y1=0.8

## clinical_relevance
0.55

## academic_relevance
0.9

## weight_confidence
0.6

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Aromatic Amino Acids (Phenylalanine and Tyrosine)

## exam_signal
src_07f0a0ff41addf826c7f | department_questions | undated | p123 q20, q21, q23 and q25; p122 q18; p124 q27 | 103 BMS

## confidence
0.95

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"DOPA is the precursor of catecholamines (dopamine, noradrenaline and adrenaline)."
"DOPA produced in melanocytes is used for synthesis of melanin pigment by tyrosinase enzyme."
"Tyrosine residue of thyroglobulin (protein molecule in thyroid gland) is iodinated to form monoiodotyrosine (MIT), then diiodotyrosine (DIT)."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-FND-AEED54B4151525 | CON-REN-1CF1475C5DD060 | CON-DER-6665EA8EA687C3

## conflicts
[clear]

## uncertainty
The book calls DOPA "the precursor of catecholamines" and lists the three, without saying whether dopamine, noradrenaline and adrenaline are made in that order or in that one tissue. Nothing about the sequence is asserted here beyond what the book prints.

## evidence_gaps
Evidence must be attached before publication.
Supported by the department book and the department question book only; no independent biochemistry reference has been attached.
The book prints no step between DOPA and adrenaline — no dopamine β-hydroxylase, and no SAM-dependent N-methylation of noradrenaline, which the question book's explanations use. Neither is taught here.
The book names tyrosinase as the enzyme of melanin synthesis and gives no intermediate between DOPA and melanin.
It does not say where in the thyroid gland the coupling reaction happens, nor which enzyme performs the iodination.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_needs_evidence_chain

## exclusion_reason

## field_notes
microtopicId: The overlay tree records no child below "Aromatic Amino Acids", so the path stops there and the book's own section name is carried by module_subject.
nanotopicId: No nanotopic level exists below the microtopic anywhere under DIS-BIO in this module's tree.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; no corpus extraction record exists.
sourceCandidateIds: Searched live state by label text for "catecholamine", "dopamine", "melanin", "DOPA" and "adrenaline" — never by subject, because 736 of the 1,718 live concepts carry a legacy subject and the aromatic namespace reports zero under it. Seven live records came back and are dealt with in rejectedMergeCandidateIds below. No corpus candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: No claim in the evidence store asserts this. The lane was scoped to an article file and a concept file, so no claim was authored; the evidence chain is a separate scope and is owed rather than filled with an invented ID.
exclusionReason: Not excluded. Printed page 101 of the department book is not on the department's cancelled-items list.
rejectedMergeCandidateIds: Three live records were read and none merged. CON-FND-AEED54B4151525, "Catecholamines increase metabolic rate", is a physiological effect of the finished hormones and says nothing about where they come from. CON-REN-1CF1475C5DD060 says the adrenal medulla secretes catecholamines and enkephalins — an anatomical statement about a gland, not a biosynthetic one about a precursor. CON-DER-6665EA8EA687C3, "Albinism is absent melanin production caused by a genetic defect in tyrosinase synthesis", is the closest of the three and is cross-linked in related_concept_ids: it names the same enzyme, but it is a disease record and this is the normal pathway that disease interrupts; question 20 asks which amino acid the catecholamines come from and could not be answered from it. Two further live records — CON-CVS-8452EED3F9CFB2 on sinoatrial firing and CON-END-2A7BECE1524359 on the insulin receptor's tyrosine kinase — were read and are too distant to record.
relationships: Walked the four pending phenylketonuria concepts, the six minted beside this one, and the seven live records the label searches returned. Three loose neighbours are in related_concept_ids. No typed edges are written: this lane authors no relations file, and a prerequisite_of edge from this concept to CON-DER-6665EA8EA687C3 and to CON-FND-1DF6B985CB77A1 is owed.

---

# Item

## label
Alkaptonuria is deficiency of homogentisate oxidase: the urine is normal when passed and blackens as it stands, and the same quinones stain bone and cartilage

## id
CON-FND-49155E4E08617B

## canonical_key
alkaptonuria.homogentisate-oxidase.black-urine

## aliases
Alkaptonuria
Homogentisate oxidase
Homogentisate oxidase deficiency
Black urine
Ochronosis
Homogentisic acid
Alcaptonuria

## arabic_label
البيلة السوداء ونقص إنزيم أكسيديز الهوموجنتيسات

## arabic_aliases
نقص أكسيديز الهوموجنتيسات
البول الأسود
الداء الأوكروني

## definition
Alkaptonuria is caused by deficiency of homogentisate oxidase, the vitamin C and Fe²⁺ dependent enzyme that opens the ring of homogentisate to maleylacetoacetate on the catabolic branch of tyrosine. Homogentisate accumulates in the tissues and is excreted in the urine, where it undergoes auto-oxidation into quinones, which are deep brown. The child voids urine of normal colour and it soon darkens to black, because the oxidation happens in air rather than in the bladder. The same quinones give the tissues — particularly bone and cartilage — a brown colour, a condition called ochronosis, and the patient suffers arthritis.

## explicit_objective
Identify alkaptonuria from a history of urine that is normal when passed and darkens on standing, name homogentisate oxidase as the deficient enzyme, and place the block relative to phenylketonuria and albinism on the same pathway.

## pitfalls
Reaching for tyrosinase because the word "pigment" is in the stem: tyrosinase deficiency is albinism, which is too little pigment of a different kind, and the enzyme is on the synthetic branch rather than the catabolic one. The second is picking the enzyme one step too late — a block at the hydrolase after homogentisate oxidase lets no homogentisate accumulate and gives no black urine. The third is tyrosine aminotransferase, which is one step too early: a block there raises tyrosine and produces no homogentisate at all.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-FND-T02 | SYS-MSK-T04

## topic
Amino acids and proteins

## subtopic
Aromatic Amino Acids

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Aromatic Amino Acids (Phenylalanine and Tyrosine)

## article_ids
ART-103-BIO-PHENYLALANINE-AND-TYROSINE

## related_article_ids
ART-103-BIO-PHENYLKETONURIA

## related_concept_ids
CON-FND-634036621EB132 | CON-FND-D7BB8C3AFB54CC | CON-DER-6665EA8EA687C3

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
kau

## blueprint_weight
0.6

## exam_weight_by_year
KAU_Y1=0.6

## clinical_relevance
0.8

## academic_relevance
0.85

## weight_confidence
0.5

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Aromatic Amino Acids (Phenylalanine and Tyrosine)

## exam_signal
src_07f0a0ff41addf826c7f | department_questions | undated | p123 q26; p123 q25 | 103 BMS

## confidence
0.95

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Alkaptonuria: Cause: deficiency of homogentisate oxidase."
"Homogentisate accumulates in tissues and is excreted in urine. It undergoes auto-oxidation into quinones (deep brown). Quinones give the tissues, particularly bone and cartilage, the brown color. This condition is called ochronosis. The patient suffers from arthritis (joint pains)."
"The child void urine of normal color, but soon it darkens to black."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-DER-6665EA8EA687C3

## conflicts
[clear]

## uncertainty
The book says the quinones colour the tissues brown and separately that the patient suffers arthritis, without saying that the deposition is what causes the joint disease. The causal step is not printed and is not asserted here.

## evidence_gaps
Evidence must be attached before publication.
Supported by the department book and the department question book only; no independent biochemistry reference has been attached.
The book gives alkaptonuria no inheritance pattern, no incidence, no age of onset and no treatment.
It never names tyrosinaemia, and prints the enzyme after homogentisate oxidase only as "Hydrolase". Fumarylacetoacetate hydrolase, which the question book offers as the nearest distractor, is not in this textbook — the pitfall above says only what a block there would fail to produce and asserts nothing about the disease that enzyme belongs to.

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## last_reviewed

## review_due

## publication_status
needs_evidence

## editorial_review_status
drafted_needs_evidence_chain

## exclusion_reason

## field_notes
microtopicId: The overlay tree records no child below "Aromatic Amino Acids", so the path stops there and the book's own section name is carried by module_subject.
nanotopicId: No nanotopic level exists below the microtopic anywhere under DIS-BIO in this module's tree.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; no corpus extraction record exists.
sourceCandidateIds: Searched live state by label text for "alkaptonuria", "ochronosis", "black urine" and "homogentisate". Every one returns nothing at all. No corpus candidate record exists.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: No claim in the evidence store asserts this. The lane was scoped to an article file and a concept file, so no claim was authored; the evidence chain is a separate scope and is owed rather than filled with an invented ID.
exclusionReason: Not excluded. Printed page 102 of the department book is not on the department's cancelled-items list.
rejectedMergeCandidateIds: CON-DER-6665EA8EA687C3, "Albinism is absent melanin production caused by a genetic defect in tyrosinase synthesis", is live and is the nearest record in the graph — the same pathway, the same chapter and the same shape of question. Not merged, and cross-linked instead: it is a block on the synthetic branch producing too little pigment, and this is a block on the catabolic branch producing too much of a different one. Question 26 sets the two against each other as options C and D, which is only possible because they are two concepts.
relationships: Walked the four pending phenylketonuria concepts, the six minted beside this one, and the live dermatology records the melanin search returned. Three loose neighbours are in related_concept_ids. No typed edges are written: this lane authors no relations file, and a contrasts_with edge to CON-DER-6665EA8EA687C3 and to CON-FND-D7BB8C3AFB54CC is owed.

---
