<!--
  103 BMS · Biochemistry · three concepts the nitrogen-handling MCQs test that
  nothing already authored covers.

  THREE CONCEPTS, ALL IDs FIXED. Each already has a question pointing at it as its
  main_concept in ../question/103-BMS-MCQ-protein-heme.md, so the IDs are not
  chosen here — they are honoured:

    CON-FND-3806EF570B0A1C  the overall equation of the urea cycle   → UREA-CYCLE
    CON-FND-129A247205D4D0  fumarate as the link between two cycles  → UREA-CYCLE
    CON-REN-744E6E6F75BEFA  uraemia is an excretion failure          → AMMONIA-METABOLISM

  WHAT IS NOT RE-AUTHORED HERE. Eight concepts covering the same chapter already
  exist in ./103-BMS-mcq-protein-concepts.md and are pointed at, not duplicated —
  above all CON-FND-6A2CCA2892E78C, which owns the five enzymes and the two
  compartments of the urea cycle, and CON-FND-880D165894A5EC, which owns ammonia
  transport and brain toxicity. Each of the three below is a different question:
  what the overall equation says, where the carbon goes, and which organ has failed.
  CON-FND-6A2CCA2892E78C already names all three of these IDs in its own
  related_concept_ids, so that half of the link is already written.

  EVIDENCE. atomic_claim_ids is [clear] on all three. No claim in the evidence store
  asserts this material and this batch authors no evidence file; the chain is a
  separate scope and is named as owed in the hand-off report. Every statement is
  drawn from one book:

    src_300847a5fa64809d6c07  Dpt book Biochemistry 103.pdf  160 pp
                              chapter V, "General Aspects of Protein Metabolism",
                              file pages 83 to 92 (printed 81 to 90)

  The 391-item department question book (src_07f0a0ff41addf826c7f) says what is
  examined and appears in exam_signal only. A question book is evidence about what
  a faculty asks, never evidence that something is medically true.

  ONE CANCELLATION TOUCHES THIS FILE. The department cancels the hyperammonaemia
  types table, except type 1, from both the end-of-module and the final exam. The
  hereditary forms are still taught in CON-REN-744E6E6F75BEFA because a student
  cannot otherwise see why hepatic and renal failure move urea in opposite
  directions — but that record's blueprint_weight is set from the examined part
  only, and the reason is written on the record.

  Import: Admin › Bulk import. Order: article → concept.
-->

# Item

## label
Ammonia and aspartate donate the two nitrogen atoms of urea, three ATP pay for one turn, and N-acetylglutamate is what commits carbamoyl phosphate synthetase I

## id
CON-FND-3806EF570B0A1C

## canonical_key
urea.overall-equation.nitrogen-donors-cost-and-activation

## aliases
Overall reaction of the urea cycle
Nitrogen donors of urea
ATP cost of the urea cycle
Regulation of the urea cycle
N-acetylglutamate
Carbamoyl phosphate synthetase I
Rate limiting step of urea synthesis

## arabic_label
المعادلة الإجمالية لدورة اليوريا: مصدرا النيتروجين وتكلفة الطاقة والمنظِّم

## arabic_aliases
مانحا النيتروجين في اليوريا
ن-أسيتيل جلوتامات
إنزيم تخليق الكارباميل فوسفات 1
تكلفة دورة اليوريا من ATP

## definition
The book prints the whole cycle as a single equation — aspartate + NH3 + CO2 + 3 ATP → urea + fumarate + 2 ADP + 2 Pi + AMP + PPi — and every term in it is examined. The two nitrogen atoms of urea come from two different donors entering in two different compartments. The first is free ammonia, condensed with bicarbonate at the expense of 2 ATP by carbamoyl phosphate synthetase I in the mitochondrial matrix. The second is the amino group of aspartate, joined to citrulline by argininosuccinate synthetase in the cytosol, which is why aspartate is the amino acid the cycle needs alongside CO2, NH3 and ATP. The price is three molecules of ATP but four high-energy phosphate bonds, because the third is hydrolysed to AMP and PPi rather than to ADP. Carbamoyl phosphate synthetase I is the rate-limiting enzyme and is absolutely dependent on N-acetylglutamate, which is made from acetyl-CoA and glutamate in a reaction arginine activates — so a protein-rich meal supplies both the substrate and the regulator, and the rate of urea synthesis follows protein intake.

## explicit_objective
Read the overall equation of the urea cycle back: name the two nitrogen donors and the compartment each enters in, state the cost as both molecules of ATP and high-energy bonds, and name the enzyme and the activator that set the rate.

## pitfalls
Answering "glutamate" for the second nitrogen donor. Glutamate is the collector of nitrogen from every amino acid and is upstream of both donors, but it enters the cycle either as free ammonia after deamination or as aspartate after transamination, never as glutamate itself. The second slip is answering four ATP because four high-energy bonds are broken: the book's figure for molecules of ATP consumed is three.

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
DIS-BIO-T02 | DIS-BIO-T07

## topic
Amino acids and proteins

## subtopic
Urea Cycle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > General protein Metabolism > Urea Cycle

## article_ids
ART-103-BIO-UREA-CYCLE

## related_article_ids
ART-103-BIO-AMMONIA-METABOLISM

## related_concept_ids
CON-FND-6A2CCA2892E78C | CON-FND-129A247205D4D0 | CON-FND-880D165894A5EC

## resource_ids
src_300847a5fa64809d6c07 | src_07f0a0ff41addf826c7f

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
0.45

## academic_relevance
0.95

## weight_confidence
0.55

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | department_questions | undated | p123 | 103 BMS
src_07f0a0ff41addf826c7f | department_questions | undated | p124 | 103 BMS
src_07f0a0ff41addf826c7f | department_questions | undated | p125 | 103 BMS

## atomic_claim_ids
CLM-89A887347268
CLM-E52B9EA8E00F
CLM-B93AE5409D0A
CLM-C421816B0F88
CLM-2C56C66FDEED
CLM-BA063FEC8ED6

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"The overall reactions of urea cycle are as follows: Aspartate + NH3 + CO2 + 3ATP → Urea + fumarate + 2ADP + 2 Pi +AMP + PPi"
"Formation of argininosuccinate is catalyzed by argininosuccinate synthetase, which requires hydrolysis of ATP to AMP and PPi (the equivalent of hydrolysis of two molecules of ATP)."
"N-acetylglutamate is an essential activator for CPSI (the rate-limiting step in the urea cycle)."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-FND-6A2CCA2892E78C

## conflicts
[clear]

## uncertainty
The book gives 3 ATP in the overall equation and separately says the third hydrolysis is "the equivalent of hydrolysis of two molecules of ATP". Read strictly, one turn breaks four high-energy bonds while consuming three ATP molecules, and the book never reconciles the two sentences. The department key takes three, and three is what is asserted; the four-bond reading is recorded rather than dismissed.

## evidence_gaps
Evidence must be attached before publication; no claim or citation is authored by this batch.
Supported by the department book and the department question book only. No independent verification against an international biochemistry reference has been attached.
The book calls arginine an activator of N-acetylglutamate synthase without giving any kinetic detail, and says nothing about what happens to the regulation when arginine itself is deficient.

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
canonicalKey: This key does not hash to this concept's ID. The ID was fixed first, by questions already authored against it, and the key was written afterwards to describe the concept. Do NOT re-mint an ID from this key — mint-concept-id.mjs would return a different one and fork the record. The ID is the identity; the key is the de-duplication label. (This is the norm rather than the exception: none of the 1,718 live concepts has a key that reproduces its own ID.)
microtopicId: "Urea Cycle" is the academic tree's own child node and is carried by module_subject; nothing sits below it in this branch.
nanotopicId: No nanotopic level exists below this node.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book and the department question book; no corpus extraction record exists for this concept.
sourceCandidateIds: Searched live and pending state by label text for "urea", "aspartate", "ornithine" and "argininosuccinate". The live "urea" records are renal-function and placental-transfer concepts from other courses; the only close pending record is CON-FND-6A2CCA2892E78C in ./103-BMS-mcq-protein-concepts.md. No corpus candidate rows were carried forward.
atomicClaimIds: [clear] deliberately. No claim in the evidence store asserts this, and the evidence chain is a separate scope this batch does not author. The claim and citation are owed and are named in the hand-off report.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. The Urea Cycle item on printed pages 87 to 89 is absent from the department's cancelled list, and the question book examines six items against it.
rejectedMergeCandidateIds: CON-FND-6A2CCA2892E78C, pending in ./103-BMS-mcq-protein-concepts.md, gives the site of urea synthesis, the five enzymes and the two compartments. Deliberately not merged: that record answers "where and by what", this one answers "what goes in, what it costs and what turns it on". A question can test either without the other, and six of the question book's items test this one alone.
relationships: Walked the eight pending concepts in ./103-BMS-mcq-protein-concepts.md, the twenty-eight in ./103-BMS-biochemistry-concepts.md and the live records returned by label search on DIS-BIO-T05. The loose neighbours are in related_concept_ids. No typed edges are written: this batch authors no relations file, and the prerequisite_of edge from CON-FND-6A2CCA2892E78C into this record is named as owed.

---

# Item

## label
Fumarate is where the urea cycle meets the citric acid cycle, and the aspartate–argininosuccinate shunt hands the carbon back

## id
CON-FND-129A247205D4D0

## canonical_key
urea.aspartate-argininosuccinate-shunt.fumarate-link

## aliases
Aspartate-argininosuccinate shunt
Link between urea cycle and citric acid cycle
Fumarate
Argininosuccinase
Argininosuccinate lyase
Fate of the carbon skeleton of aspartate

## arabic_label
الفومارات كحلقة الوصل بين دورة اليوريا ودورة حمض الستريك

## arabic_aliases
مسار الأسبارتات-أرجينينوسكسينات
إنزيم تكسير الأرجينينوسكسينات
مصير الهيكل الكربوني للأسبارتات

## definition
Aspartate enters the cytosolic arm of the urea cycle and is joined to citrulline to form argininosuccinate. Argininosuccinase then cleaves that molecule in two: arginine keeps the nitrogen and goes on to yield urea, while the four carbons aspartate brought in leave as fumarate. Fumarate is an intermediate of the citric acid cycle, so it is the compound at which the two cycles meet. From there the citric acid cycle's own reactions carry the carbon round and back: fumarase hydrates fumarate to malate, malate dehydrogenase oxidises malate to oxaloacetate, and AST transaminates oxaloacetate to aspartate, which re-enters the urea cycle. The urea cycle therefore borrows a carbon skeleton and returns it, and malate sits one step past the junction rather than at it.

## explicit_objective
Name fumarate as the compound linking the urea cycle to the citric acid cycle, and trace the carbon of aspartate out of the urea cycle and back into it.

## pitfalls
Answering malate. Malate is what actually crosses back to rejoin the citric acid cycle, but it is made by fumarase after the link has been formed; the compound the urea cycle itself releases is fumarate. The other slip is choosing citrate by matching "citr-" to "citrulline", which is a spelling coincidence and not a chemical relationship.

## concept_type
mechanism

## status
under review

## support_mode
inferred_from_figure

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
DIS-BIO-T03 | DIS-BIO-T01

## topic
Amino acids and proteins

## subtopic
Urea Cycle

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > General protein Metabolism > Urea Cycle

## article_ids
ART-103-BIO-UREA-CYCLE

## related_article_ids
ART-103-BIO-CITRIC-ACID-CYCLE

## related_concept_ids
CON-FND-3806EF570B0A1C | CON-FND-6A2CCA2892E78C | CON-FND-037BF052DDFC0D

## resource_ids
src_300847a5fa64809d6c07 | src_07f0a0ff41addf826c7f

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
KAU_Y1=0.65

## clinical_relevance
0.2

## academic_relevance
0.95

## weight_confidence
0.45

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_questions | undated | p125 | 103 BMS

## atomic_claim_ids
CLM-ABAAD0A05407
CLM-8DC9C7CC955B
CLM-02D0408FD50F
CLM-EFA6042BD865
CLM-9096FB1167D1

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Cleavage of argininosuccinate by argininosuccinate lyase produces fumarate and arginine."
"Aspartate + NH3 + CO2 + 3ATP → Urea + fumarate + 2ADP + 2 Pi +AMP + PPi"

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book never uses the phrase "aspartate–argininosuccinate shunt" and nowhere states in a sentence that the two cycles are linked. What it prints is the arc itself, drawn on the urea cycle figure: fumarate, fumarase, L-malate, malate dehydrogenase, oxaloacetate and AST, closing back onto aspartate. The link is therefore read off a figure rather than off prose, which is why support_mode is inferred_from_figure — and the question book asks for it directly, so it is examined even though the sentence is not printed.

## evidence_gaps
Evidence must be attached before publication; no claim or citation is authored by this batch.
Supported by the department book and the department question book only. No independent verification against an international biochemistry reference has been attached.
The NADH generated at the malate dehydrogenase step of the returning arc is not credited anywhere in the book, so no claim is made here that it offsets the cycle's ATP cost.

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
canonicalKey: This key does not hash to this concept's ID. The ID was fixed first, by questions already authored against it, and the key was written afterwards to describe the concept. Do NOT re-mint an ID from this key — mint-concept-id.mjs would return a different one and fork the record. The ID is the identity; the key is the de-duplication label. (This is the norm rather than the exception: none of the 1,718 live concepts has a key that reproduces its own ID.)
microtopicId: "Urea Cycle" is the academic tree's own child node and is carried by module_subject; nothing sits below it in this branch.
nanotopicId: No nanotopic level exists below this node.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book's urea cycle figure and the department question book; no corpus extraction record exists.
sourceCandidateIds: Searched live and pending state by label text for "fumarate", "aspartate" and "argininosuccinate". All three return nothing at all, live or pending — no record anywhere in the graph names the junction between the two cycles.
atomicClaimIds: [clear] deliberately. No claim in the evidence store asserts this, and the evidence chain is a separate scope this batch does not author. The claim and citation are owed and are named in the hand-off report.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. The Urea Cycle item on printed pages 87 to 89 is absent from the department's cancelled list.
rejectedMergeCandidateIds: [clear]. Label search returned no candidate to reject; the nearest records are the pending urea cycle and Krebs cycle concepts, and both are cross-linked in related_concept_ids rather than considered for merge.
relationships: Walked the eight pending concepts in ./103-BMS-mcq-protein-concepts.md, the citric acid cycle concepts in ./103-BMS-biochemistry-concepts.md and ./103-BMS-mcq-carbohydrate-concepts.md, and the live records returned by label search. CON-FND-037BF052DDFC0D, the key enzymes of the Krebs cycle, is the neighbour on the citric acid side. No typed edges are written: this batch authors no relations file, and the mechanism_step_after edge from CON-FND-3806EF570B0A1C is named as owed.

---

# Item

## label
Uraemia is failure to excrete urea, not failure to make it: renal failure raises plasma urea, while hepatic failure lowers it and raises ammonia

## id
CON-REN-744E6E6F75BEFA

## canonical_key
urea.uraemia.renal-versus-hepatic-failure

## aliases
Uraemia
Uremia
Blood urea
Plasma urea level
Hyperammonaemia
Ammonia intoxication
Renal failure and blood urea

## arabic_label
اليوريميا: فشل في الإخراج لا في التصنيع

## arabic_aliases
ارتفاع يوريا الدم
فرط أمونيا الدم
تسمم الأمونيا

## definition
Urea is synthesised only in the liver and travels in the blood, at a normal plasma level of 10 to 50 mg/dL, to the kidneys, where it passes into the urine. Production and excretion are therefore the jobs of two different organs, and they fail in opposite directions. In renal failure the liver goes on making urea normally but the product cannot leave, so plasma urea rises: that is uraemia, and it is why blood urea is a marker of renal and not of hepatic function. In hepatic failure the cycle itself fails, so ammonia remains in the blood as hyperammonaemia, or ammonia intoxication, while the plasma urea level falls; normal blood ammonia is below 0.05 mg/dL. Acquired hyperammonaemia occurs in liver cirrhosis, which may follow hepatitis, biliary obstruction or alcoholism, and the hereditary forms are rare deficiencies of the urea cycle enzymes, most severe when one of the first two reactions is affected.

## explicit_objective
Predict what happens to plasma urea and to plasma ammonia in renal failure and in hepatic failure, and say which of the two failures is uraemia.

## pitfalls
Reasoning that liver disease is serious, so urea must be high. Cirrhosis damages the organ that makes urea, so plasma urea falls and what rises is ammonia. The second trap is diabetes mellitus: it raises protein catabolism and so raises urea production, but healthy kidneys excrete the surplus, and uraemia follows only once diabetic nephropathy has damaged the kidney — at which point the cause is the renal failure.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
renal

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-REN-T06 | DIS-BIO-T07

## topic
Clinical biochemistry

## subtopic
Metabolism of Ammonia

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > General protein Metabolism > Metabolism of Ammonia

## article_ids
ART-103-BIO-AMMONIA-METABOLISM

## related_article_ids
ART-103-BIO-UREA-CYCLE

## related_concept_ids
CON-FND-880D165894A5EC | CON-FND-6A2CCA2892E78C | CON-FND-3806EF570B0A1C

## resource_ids
src_300847a5fa64809d6c07 | src_07f0a0ff41addf826c7f

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
KAU_Y1=0.7

## clinical_relevance
0.9

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | department_questions | undated | p124 | 103 BMS

## atomic_claim_ids
CLM-DB3FBEA6CB19
CLM-B3F99E28A3D8
CLM-C3D0475EA27B
CLM-6110E6FA44D9
CLM-52648DB81488

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"The urea formed by the liver goes, via the blood (plasma level 10-50 mg/dL), to the kidneys to be excreted in the urine."
"In renal failure, the plasma level of urea increases. In hepatic failure, ammonia remains in the blood, leading to hyperammonemia (ammonia intoxication) with decrease of plasma urea level."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-REN-8E47567E9AC240

## conflicts
[clear]

## uncertainty
The book gives one plasma urea range, 10 to 50 mg/dL, without naming an assay, a population or a unit conversion, and gives no threshold above which the word uraemia applies. It also does not say whether "renal failure" here means acute, chronic or either. Nothing beyond the direction of change is asserted.

## evidence_gaps
Evidence must be attached before publication; no claim or citation is authored by this batch.
Supported by the department book and the department question book only. No independent clinical chemistry reference range has been attached, and the department range is not converted to SI units anywhere.
The book never states that blood urea is used clinically as a test of renal function; that is the inference this record draws from the two failure directions it does state, and a reviewer may wish to source it separately.

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
canonicalKey: This key does not hash to this concept's ID. The ID was fixed first, by questions already authored against it, and the key was written afterwards to describe the concept. Do NOT re-mint an ID from this key — mint-concept-id.mjs would return a different one and fork the record. The ID is the identity; the key is the de-duplication label. (This is the norm rather than the exception: none of the 1,718 live concepts has a key that reproduces its own ID.)
microtopicId: "Metabolism of Ammonia" is the academic tree's own child node and is carried by module_subject; nothing sits below it in this branch.
nanotopicId: No nanotopic level exists below this node.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department book and the department question book; no corpus extraction record exists.
sourceCandidateIds: Searched live and pending state by label text for "uraemia", "uremia", "urea" and "ammonia". "uraemia" returns only a pending word-parts glossary entry, "uremia" only the question this record serves. The live "ammonia" records are renal clearance physiology and the live "urea" records are renal-function and placental concepts from other courses.
atomicClaimIds: [clear] deliberately. No claim in the evidence store asserts this, and the evidence chain is a separate scope this batch does not author. The claim and citation are owed and are named in the hand-off report.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
blueprintWeight: Set from the examined part only. The renal-versus-hepatic contrast on printed page 90 is examined and carries the weight; the hyperammonaemia types table on the same page is cancelled from both exams except type 1, so it is taught in the definition for understanding but contributes nothing to this figure. Without the cancellation the weight would sit nearer 0.75.
exclusionReason: Not excluded. What the department cancels on printed page 90 is the hyperammonaemia types table except type 1 — a different item on the same page. The renal and hepatic failure contrast this record teaches is not on the cancelled list, and the question book examines it directly.
rejectedMergeCandidateIds: CON-REN-8E47567E9AC240 is live and says blood urea nitrogen and plasma creatinine rise as GFR falls. Deliberately not merged: that is renal physiology stated in terms of GFR, from a different course and a different source, and it says nothing about where urea is made or what hepatic failure does to it — which is the whole of the distinction examined here. Cross-linking the two is worth a reviewer's attention.
relationships: Walked the eight pending concepts in ./103-BMS-mcq-protein-concepts.md, the four live CON-REN- records returned by label search, and the twenty-eight concepts in ./103-BMS-biochemistry-concepts.md. CON-FND-880D165894A5EC already names this record in its own related_concept_ids, so that neighbour link is written in both directions. No typed edges: this batch authors no relations file, and the caused_by edge from renal failure is named as owed.
