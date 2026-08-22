<!--
  103 BMS · Biochemistry · the eight concepts the individual amino acid
  metabolism MCQs test, across two library articles.

  EIGHT CONCEPTS. Four for glycine, glutamate and the branched-chain amino
  acids; four for the sulfur amino acids. Each already has a finished question
  pointing at it as its main_concept in
  ../question/103-BMS-MCQ-protein-heme.md, and each names its article in
  article_ids while that article names it back in related_concepts. The IDs were
  not chosen here — they were fixed by the questions that were written first.

    CON-FND-38F3A09255526F  glycine's functions and derivatives
    CON-REN-339CFAB4C81D12  a defect of glycine degradation and oxalate stones
    CON-FND-58FAD64EEA965B  branched-chain amino acids and maple syrup urine disease
    CON-NEU-46F59E9C3EA406  glutamate's functions and derivatives
      → ART-103-BIO-GLYCINE-GLUTAMATE-AND-BRANCHED-CHAIN

    CON-FND-11F38A2B3E9B67  cysteine's six derivatives
    CON-FND-3622E11F05032C  S-adenosylmethionine and the transmethylation reactions
    CON-FND-E8A570D41E7B8F  homocystinuria and raised plasma homocysteine
    CON-REN-3DD1CADB68BB1B  cystinuria, a defect of dibasic amino acid transport
      → ART-103-BIO-SULFUR-AMINO-ACIDS

  NOTHING HERE ALREADY EXISTS LIVE. find-existing.mjs was run for glycine, maple
  syrup, branched chain, glutamic acid, cysteine, taurine, methionine,
  homocysteine, cystinuria, oxalate, S-adenosylmethionine and transmethylation.
  The only live hits are unrelated: four acetylcysteine pharmacology concepts
  (CON-RES-6F7E169B8BE108, CON-RES-9DA5B3FB92BC7A, CON-RES-80300BAF6E1772,
  CON-RES-04CD9047E73472) and CON-HEM-09A2A0430050D6 on oxalate as an in-vitro
  anticoagulant. None of them covers any of the eight, and none is merged.

  EVIDENCE. One book: src_300847a5fa64809d6c07, Dpt book Biochemistry 103.pdf,
  chapter VI "Individual Amino Acid Metabolism", printed pages 91 to 99 (file
  pages 93 to 101). The department question book (src_07f0a0ff41addf826c7f)
  establishes what is asked and is recorded in exam_signal only; a question book
  is evidence about what a faculty examines, never evidence that something is
  medically true.

  TWO CLAIMS THE BOOK DOES NOT CARRY, and both are recorded in evidence_gaps
  rather than dressed up as its teaching. The glycine-to-glyoxylate-to-oxalate
  route behind CON-REN-339CFAB4C81D12 appears nowhere in the book — the words
  "oxalate" and "glyoxylate" are absent from all 160 pages, and the Summary of
  Amino Acid Metabolism on printed page 106 prints a dash in glycine's Metabolic
  Error column. And guanidinoacetate, the SAM acceptor the question key names for
  creatine in CON-FND-3622E11F05032C, is absent too: the book's transmethylation
  list is ethanolamine, noradrenaline and N-acetylserotonin, and it says only
  that glycine and arginine "share in creatine synthesis".

  CANCELLED GROUND. The department's 2025-2026 orientation cancels Alanine and
  Serine (printed p92), Threonine (p93), Aspartic acid (p95), Arginine and
  Lysine (p96) and Histidine and Proline (p105) from both the end-of-module and
  the final exam. No concept here sits on a cancelled section — glycine, the
  branched-chain group, glutamic acid, cysteine and methionine are all still
  taught and examined — but four of them list a derivative or a precursor that
  does: glycine to serine, glutamate to arginine and proline, cysteine from
  serine, and creatine from arginine and glycine. Those four are kept, because
  the question book still asks them, and each carries a low weight_confidence and
  a field note saying which arm of it the exam will not reach.

  atomic_claim_ids is [clear] on every record. The claim, citation and span
  chain for this material is a separate scope and is not authored in this batch.

  Import: Admin › Bulk import. Order: article → concept.
-->

# Item

## label
Glycine is required for the synthesis of serine, glutathione, heme, purines, creatine and bile salts, and it feeds the one-carbon pool

## id
CON-FND-38F3A09255526F

## canonical_key
amino-acids.glycine.functions-and-derivatives

## aliases
Glycine
Functions and derivatives of glycine
What glycine is required to synthesise
Glycine cleavage system
Glycine as an inhibitory neurotransmitter

## arabic_label
وظائف الجليسين ومشتقاته

## arabic_aliases
مشتقات الجليسين
نظام انشطار الجليسين

## definition
Glycine is the smallest amino acid, non-essential and glucogenic, made mainly from serine by serine hydroxymethyl transferase. The department book gives it one structural role and one list. Structurally it is an essential component of some proteins, collagen among them. The list is what it is required to synthesise: serine, by serine hydroxymethyl transferase; glutathione; heme; purines; creatine; and bile salts, which it forms by conjugating with bile acids so they are excreted in bile. It also gives formyl-tetrahydrofolate and methylene-tetrahydrofolate to one-carbon metabolism, and it is an inhibitory chemical transmitter in its own right. Its main catabolic route is the glycine cleavage system, which splits it to ammonia, carbon dioxide and methylene-THF; the alternative route converts it to serine, which serine dehydratase then deaminates to pyruvate, which is what makes glycine glucogenic.

## explicit_objective
List the compounds glycine is required to synthesise, and assign each common distractor compound — lecithin, GABA, melatonin, glutamine — to the amino acid that actually makes it.

## pitfalls
Confusing glycine's list with glutamate's. The two overlap on glutathione, which is a tripeptide of both plus cysteine, and on purines, to which both contribute — so the discrimination has to be exact rather than approximate. Heme is glycine's and not glutamate's; GABA is glutamate's and not glycine's, and it is a tempting wrong answer because GABA and glycine are both inhibitory transmitters. Glutamine is glutamate's, and is easily misread as glutathione. Answering that glycine is ketogenic: the book's summary table lists it as glucogenic.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-FND-T06 | DIS-BIO-T01

## topic
Amino acids and proteins

## subtopic
Glycine

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Glycine

## article_ids
ART-103-BIO-GLYCINE-GLUTAMATE-AND-BRANCHED-CHAIN

## related_article_ids
ART-103-BIO-SULFUR-AMINO-ACIDS

## related_concept_ids
CON-NEU-46F59E9C3EA406 | CON-REN-339CFAB4C81D12

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
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.85

## weight_confidence
0.25

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | printed p120 q1 and q2, and q6 by contrast | 103 BMS

## atomic_claim_ids
CLM-1675546C5D91
CLM-355D769F24EC
CLM-145DF72E15C6
CLM-E3529E9409DE
CLM-BBF534CDCB84
CLM-DEBABF06C9DC

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"It is involved in many synthetic processes as the following: • Serine synthesis: by serine hydroxymethyl transferase. • Glutathione synthesis. • Heme synthesis. • Purine synthesis. • Creatine synthesis. • Bile salts formation: glycine conjugates with bile acids and excreted as bile salts. • It gives formyl-THF and methylene-THF, which joins the metabolism of one carbon unit."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book lists glycine's synthetic roles as bullets and cross-references each to a later chapter rather than giving the reaction here, so the depth at which any one of them is examinable has to be read off the question book rather than off this page. Two of the six point at chapters the orientation cancels — heme synthesis outright, and creatine partly, through arginine.

## evidence_gaps
Supported by the department book alone, printed page 91 and the Summary of Amino Acid Metabolism on printed page 106. No independent verification against an international biochemistry reference has been attached. The book does not state which of the six roles is quantitatively the largest use of glycine, and nothing here should be read as ranking them.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
microtopicId: The department book's own section is already the leaf named in module_subject; the canonical tree has no node finer than DIS-BIO-T05 for individual amino acid metabolism.
nanotopicId: No nanotopic exists below the microtopic level for this material.
canonicalKey: This key does not hash to this concept's ID. The ID was fixed first, by questions already authored against it, and the key was written afterwards to describe the concept. Do NOT re-mint an ID from this key — mint-concept-id.mjs would return a different one and fork the record. The ID is the identity; the key is the de-duplication label. (This is the norm rather than the exception: none of the 1,718 live concepts has a key that reproduces its own ID.)
microtopic: The canonical overlay stops at DIS-BIO-T05, whose only children are Core principles, Applied / clinical correlations and Practical and assessment. The book's own chapter and section names are finer than anything the tree offers and are carried by module_subject instead.
nanotopic: No nanotopic exists below the microtopic level in this branch, and inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The claim, citation and span chain for the Individual Amino Acid Metabolism chapter is a separate scope and is not authored in this batch; naming a claim ID here would point at a record nothing creates.
resourceOccurrenceIds: Hand-authored from the department textbook and question book; this concept has no corpus extraction record.
sourceCandidateIds: Searched live state by label text for "glycine", "glutathione", "bile salts" and "one carbon". Nothing live covers glycine's derivatives. Searching by subject would have reported nothing regardless — 736 of 1,718 live concepts carry a legacy subject, so the fnd namespace does not answer a subject query.
mergeIds: Nothing live to merge with.
rejectedMergeCandidateIds: find-existing.mjs returned no live concept about glycine at all, so there was no candidate to reject.
conflicts: The book's page 91 list and its page 106 summary table agree on every item.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
CANCELLATION: Glycine itself, printed page 91, is not cancelled and the question book examines it. Two arms of its list reach ground the exam will not: heme synthesis, because Biosynthesis of Heme and Porphyria are cancelled outright, and creatine, because it is assembled with arginine, whose section on printed page 96 is cancelled with lysine. blueprint_weight and weight_confidence are held down for that reason and exam_signal cites the question book only — no exam paper is claimed.

---

# Item

## label
A defect in glycine degradation diverts glycine to oxalate, and calcium oxalate stones cause nephrocalcinosis and renal failure

## id
CON-REN-339CFAB4C81D12

## canonical_key
amino-acids.glycine.oxalate-stone-disease

## aliases
Urinary oxalate from glycine
Hyperoxaluria
Calcium oxalate stones
Glycine degradation disorder
Oxalate nephropathy

## arabic_label
اضطراب هدم الجليسين وحصوات أوكسالات الكالسيوم

## arabic_aliases
فرط أوكسالات البول
حصوات الكلى الأوكسالاتية

## definition
A genetic defect in the degradation of glycine diverts it towards glyoxylate, which is oxidised to oxalate and excreted in the urine. Calcium oxalate is poorly soluble, so the excess crystallises in the renal tubules, forms recurrent stones, and produces nephrocalcinosis and progressive renal impairment that can end in renal failure. The mechanism is overproduction of a poorly soluble excretion product — the same logic that makes urate stones form in gout — and it is the opposite of the mechanism behind cystine stones, which form because a normally soluble amino acid is not reabsorbed.

## explicit_objective
Attribute urinary oxalate and oxalate stone disease to a disorder of glycine degradation, and distinguish an overproduction stone from the transport-defect stone of cystinuria.

## pitfalls
Reaching for methionine, because homocystinuria is the other amino acid disorder taught nearby — but its manifestations are vascular, skeletal, ocular and neurological, not renal. Reaching for cystinuria because it also makes stones: cystinuria is a defect of transport and its stones are cystine, not oxalate. Reaching for phenylalanine or tyrosine, whose disorders are neurological or pigmentary and make no stone at all.

## concept_type
mechanism

## status
under review

## support_mode
inference

## subject
renal

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
SYS-REN-T06 | DIS-BIO-T05

## topic
Clinical biochemistry

## subtopic
Glycine

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Glycine

## article_ids
ART-103-BIO-GLYCINE-GLUTAMATE-AND-BRANCHED-CHAIN

## related_article_ids
ART-103-BIO-SULFUR-AMINO-ACIDS

## related_concept_ids
CON-FND-38F3A09255526F | CON-REN-3DD1CADB68BB1B

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
0.25

## exam_weight_by_year
KAU_Y1=0.45

## clinical_relevance
0.8

## academic_relevance
0.6

## weight_confidence
0.2

## confidence
0.4

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | printed p120 q3 and q4 | 103 BMS

## atomic_claim_ids
CLM-F4B2FE471780
CLM-FAAE753F3991
CLM-B47573C76EC7

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Which of the following amino acid degradation pathway disorders would lead to renal failure due to stone formation? a) Phenylalanine b) Tyrosine c) Methionine d) Glycine" — key: d

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-HEM-09A2A0430050D6

## conflicts
[clear]

## uncertainty
The department question book asserts the glycine-to-oxalate link twice and the department textbook asserts it nowhere. The book's Glycine section names the glycine cleavage system, the serine interconversion and the six derivatives and stops, and its Summary of Amino Acid Metabolism prints a dash in glycine's Metabolic Error column. Which enzyme is deficient, whether the disorder is primary hyperoxaluria type 1 or type 2, and how the stone is managed are all outside anything this course supplies. The claim is recorded as the department's own examined position, not as the book's teaching.

## evidence_gaps
Not supported by the department book at all. The strings "oxalate" and "glyoxylate" do not occur on any of its 160 pages, and printed page 106 records no metabolic error for glycine. The concept rests on the department question book (src_07f0a0ff41addf826c7f, printed p120 questions 3 and 4) and on standard external biochemistry references that are not attached here. A faculty reviewer should decide whether the item and this concept survive, or whether the department intends to teach the link and the book is simply silent.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
originalWording: The department textbook states nothing here to quote — "oxalate" and "glyoxylate" occur on none of its 160 pages. The wording is the question book's, which is the source this concept was authored from and the only source that asserts it. Kept as the source's own words rather than left empty, with support_mode `inference` and the textbook silence recorded in evidence_gaps.
microtopicId: The department book's own section is already the leaf named in module_subject; the canonical tree has no node finer than DIS-BIO-T05 for individual amino acid metabolism.
nanotopicId: No nanotopic exists below the microtopic level for this material.
canonicalKey: This key does not hash to this concept's ID. The ID was fixed first, by questions already authored against it, and the key was written afterwards to describe the concept. Do NOT re-mint an ID from this key — mint-concept-id.mjs would return a different one and fork the record. The ID is the identity; the key is the de-duplication label. (This is the norm rather than the exception: none of the 1,718 live concepts has a key that reproduces its own ID.)
microtopic: The canonical overlay stops at DIS-BIO-T07 for clinical biochemistry, and the renal placement is carried as a secondary node. The book's section name is carried by module_subject.
nanotopic: No nanotopic exists below the microtopic level in this branch.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The evidence chain for this chapter is a separate scope; and this concept in particular has nothing in the department book to cite, so a claim minted now would have no citation to carry it.
resourceOccurrenceIds: Hand-authored; no corpus extraction record.
sourceCandidateIds: Searched live state by label text for "oxalate", "stone", "nephrocalcinosis" and "glycine". Nothing live covers this.
originalWording: Deliberately empty. There is no wording to quote — the book does not print this material anywhere, and quoting the question book here would present an examiner's key as though it were the textbook's statement.
mergeIds: Nothing live to merge with.
rejectedMergeCandidateIds: CON-HEM-09A2A0430050D6 says oxalate precipitates calcium and citrate chelates calcium to prevent in-vitro clotting. Not merged — that is a haematology-tube observation about an anticoagulant additive, and this is a renal stone disorder of amino acid metabolism. The word is the only thing they share.
supportMode: inference rather than direct_statement, and it is the only such record in the batch. Every other concept here quotes the book; this one is reconstructed from the question book's two items and their key.
conflicts: No conflict — the book is silent rather than contradictory, which is recorded in evidence_gaps instead.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
CANCELLATION: Glycine, printed page 91, is not on the department's cancelled list, so this concept is not cancelled ground. Its weights are low for the separate reason that the book does not carry the claim.

---

# Item

## label
Maple syrup urine disease is a deficiency of branched-chain alpha-keto acid dehydrogenase, so valine, leucine and isoleucine and their keto acids accumulate and are excreted

## id
CON-FND-58FAD64EEA965B

## canonical_key
amino-acids.branched-chain.maple-syrup-urine-disease

## aliases
Maple syrup urine disease
Branched chain alpha-keto acid dehydrogenase deficiency
Branched chain amino acids
Valine leucine isoleucine
Burnt sugar urine odour

## arabic_label
داء البول القيقبي ونقص نازعة هيدروجين الأحماض الكيتونية متفرعة السلسلة

## arabic_aliases
الأحماض الأمينية متفرعة السلسلة
فالين ليوسين آيزوليوسين

## definition
Valine, leucine and isoleucine are the branched-chain amino acids, all three essential. They are catabolised in two steps: transamination to the corresponding alpha-keto acid, then oxidative decarboxylation of that keto acid by branched-chain alpha-keto acid dehydrogenase, which needs the same five factors as the other alpha-keto acid dehydrogenases — thiamine pyrophosphate, FAD, lipoate, NAD+ and coenzyme A — and yields the corresponding lower-chain acyl-CoA. Maple syrup urine disease is a genetic deficiency of that single dehydrogenase. Because one enzyme serves all three amino acids, all three and all three of their branched-chain alpha-keto acids accumulate in the body fluids and are excreted in urine, giving it the characteristic odour of maple syrup or burnt sugar. The keto acids are neurotoxic and cause mental retardation, and treatment is a diet restricted in branched-chain amino acids.

## explicit_objective
Name branched-chain alpha-keto acid dehydrogenase as the enzyme deficient in maple syrup urine disease, state which class of amino acids accumulates, and give the five cofactors the enzyme shares with pyruvate dehydrogenase.

## pitfalls
Placing the block at the transamination step. It is the second step that fails, which is why the amino acids themselves rise alongside their keto acids rather than only the keto acids. Answering "basic" because the dibasic amino acids do appear in the urine in cystinuria — but cystinuria is a transport defect with no odour and hexagonal cystine crystals. Answering "neutral", which is the Hartnup transport defect and again odourless. Forgetting which of the three is which fate: valine gives succinyl-CoA and is glucogenic, leucine gives acetyl-CoA and acetoacetate and is ketogenic, isoleucine gives both and is mixed.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
DIS-BIO-T05 | SYS-FND-T06

## topic
Clinical biochemistry

## subtopic
Branched Chain Amino Acids (Valine-Leucine-Isoleucine)

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Branched Chain Amino Acids (Valine-Leucine-Isoleucine)

## article_ids
ART-103-BIO-GLYCINE-GLUTAMATE-AND-BRANCHED-CHAIN

## related_article_ids
ART-103-BIO-SULFUR-AMINO-ACIDS

## related_concept_ids
CON-REN-3DD1CADB68BB1B | CON-FND-E8A570D41E7B8F

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
KAU_Y1=0.65

## clinical_relevance
0.85

## academic_relevance
0.85

## weight_confidence
0.5

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | printed p120 q5 | 103 BMS

## atomic_claim_ids
CLM-6AB7956E7FC3
CLM-A7AD1F939B08
CLM-4913EB2C56DD
CLM-B4AC57A835AF
CLM-B8A3C9B66FD8

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Cause: It is a genetic disease caused by deficiency of branched chain α-keto acid dehydrogenase. Manifestations: Accumulation of branched-chain amino acids and their corresponding branched-chain α-keto acids occurs in different body fluids, their excretion in urine giving it the characteristic odor of maple syrup or burnt sugar."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book gives no incidence, no age of presentation, no inheritance pattern and no biochemical variant classification for maple syrup urine disease, and names no acute management beyond the restricted diet. The clinical picture a student meets in later years — the neonatal encephalopathic crisis, the thiamine-responsive variant — is outside what this source supports.

## evidence_gaps
Supported by the department book alone, printed pages 93 and 94. No independent verification against an international reference has been attached. The book does not say which of the three amino acids contributes most to the odour, nor which keto acid is the neurotoxic one, so neither is asserted here.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
microtopicId: The department book's own section is already the leaf named in module_subject; the canonical tree has no node finer than DIS-BIO-T05 for individual amino acid metabolism.
nanotopicId: No nanotopic exists below the microtopic level for this material.
canonicalKey: This key does not hash to this concept's ID. The ID was fixed first, by questions already authored against it, and the key was written afterwards to describe the concept. Do NOT re-mint an ID from this key — mint-concept-id.mjs would return a different one and fork the record. The ID is the identity; the key is the de-duplication label. (This is the norm rather than the exception: none of the 1,718 live concepts has a key that reproduces its own ID.)
microtopic: The canonical overlay stops at DIS-BIO-T07 for clinical biochemistry; the book's own section name is carried by module_subject, which is finer than any microtopic the tree offers.
nanotopic: No nanotopic exists below the microtopic level in this branch.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The claim, citation and span chain for this chapter is a separate scope and is not authored in this batch.
resourceOccurrenceIds: Hand-authored; no corpus extraction record.
sourceCandidateIds: Searched live state by label text for "maple syrup", "branched chain", "valine", "leucine". find-existing.mjs returned nothing live for any of them.
mergeIds: Nothing live to merge with.
rejectedMergeCandidateIds: No live candidate was returned, so there was none to reject.
conflicts: None. The book's page 93 pathway and its page 94 disorder entry agree.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
CANCELLATION: The orientation cancels Threonine, which the book prints on the same printed page 93 that the Branched Chain Amino Acids section begins on. The cancellation names Threonine as an item, not the page, so the branched-chain pathway and Maple Syrup Urine Disease on printed page 94 are not cancelled. This is the one concept in the batch whose weights are not held down, and weight_confidence is still only 0.5 because the shared page makes the boundary a reading rather than a certainty.

---

# Item

## label
Glutamic acid gives GABA, glutamine, glutathione, arginine and proline, and is gamma-carboxylated for clotting factors — but not heme

## id
CON-NEU-46F59E9C3EA406

## canonical_key
amino-acids.glutamate.functions-and-derivatives

## aliases
Glutamic acid
Derivatives of glutamate
GABA synthesis
Glutamate decarboxylase
Glutamine synthetase

## arabic_label
وظائف حمض الجلوتاميك ومشتقاته

## arabic_aliases
مشتقات الجلوتامات
حمض جاما أمينوبيوتيريك

## definition
Glutamic acid is a non-essential, glucogenic amino acid made by the reversal of oxidative deamination, by the transamination reactions of ALT and AST, and from the catabolism of proline, arginine and histidine. Its derivatives are a fixed list: GABA, formed by glutamate decarboxylase with pyridoxal phosphate; glutathione, the tripeptide it forms with cysteine and glycine; arginine and proline, built from its carbon skeleton; and glutamine, formed by glutamine synthetase adding ammonia as an amide, which is the major mechanism for removing ammonia in the brain and whose amide group then supplies asparagine, purines, pyrimidines, amino sugars and nicotinamide. Glutamate is also gamma-carboxylated, and that carboxylation is what activates the vitamin K-dependent clotting factors and the osteocalcin of bone. Heme is not on the list: heme comes from glycine condensed with succinyl-CoA.

## explicit_objective
List the derivatives of glutamic acid and separate them from the derivatives of glycine, naming heme as glycine's and GABA as glutamate's.

## pitfalls
The overlap with glycine is the whole difficulty. Glutathione contains both, purines receive a contribution from both, and glycine makes heme while glutamate does not — so a student pattern-matching on "small amino acid that builds things" picks heme. Confusing glutamine with glutathione under time pressure. Assuming that because GABA and glycine are both inhibitory transmitters, glycine must make GABA; glutamate decarboxylase makes it, from glutamate.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-NEU-T01 | DIS-BIO-T01

## topic
Amino acids and proteins

## subtopic
Glutamic Acid

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Glutamic Acid

## article_ids
ART-103-BIO-GLYCINE-GLUTAMATE-AND-BRANCHED-CHAIN

## related_article_ids
ART-103-BIO-SULFUR-AMINO-ACIDS

## related_concept_ids
CON-FND-38F3A09255526F | CON-FND-11F38A2B3E9B67

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
0.45

## exam_weight_by_year
KAU_Y1=0.65

## clinical_relevance
0.3

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | printed p120 q6 | 103 BMS

## atomic_claim_ids
CLM-4DBC92CEAAEE
CLM-3E2F285E3ED0
CLM-A36C5D597C32
CLM-985ADCD1CA34

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"III- Functions and Derivatives: 1) Synthesis of γ-aminobutyric acid (GABA) by decarboxylase. 2) Synthesis of Glutathione. 3) Synthesis of arginine and proline."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book prints glutamate's derivative list across two pages, and the numbering restarts at item 4 on the second, so whether glutamine and the gamma-carboxylation entry are meant as members of the same list or as separate remarks is a typographic reading rather than a stated fact. Both are treated here as derivatives, which is how the question book uses them. The book also does not say that glutamate is itself an excitatory neurotransmitter, and that is not asserted here even though it is standard teaching.

## evidence_gaps
Supported by the department book alone, printed pages 94 and 95. No independent verification against an international reference has been attached. The book gives no reaction for the conversion of glutamate to arginine or to proline, only that it happens, so the mechanism is not asserted.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
microtopicId: The department book's own section is already the leaf named in module_subject; the canonical tree has no node finer than DIS-BIO-T05 for individual amino acid metabolism.
nanotopicId: No nanotopic exists below the microtopic level for this material.
canonicalKey: This key does not hash to this concept's ID. The ID was fixed first, by questions already authored against it, and the key was written afterwards to describe the concept. Do NOT re-mint an ID from this key — mint-concept-id.mjs would return a different one and fork the record. The ID is the identity; the key is the de-duplication label. (This is the norm rather than the exception: none of the 1,718 live concepts has a key that reproduces its own ID.)
microtopic: The canonical overlay stops at DIS-BIO-T05 and its three generic children; the book's section name is carried by module_subject.
nanotopic: No nanotopic exists below the microtopic level in this branch.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The evidence chain for this chapter is a separate scope and is not authored in this batch.
resourceOccurrenceIds: Hand-authored; no corpus extraction record.
sourceCandidateIds: Searched live state by label text for "glutamic acid", "glutamate", "GABA" and "glutathione". Nothing live covers glutamate's derivative list. A subject search would have been useless here in any case: 736 of 1,718 live concepts carry a legacy subject, so the neu namespace reports zero while it is full.
mergeIds: Nothing live to merge with.
rejectedMergeCandidateIds: No live candidate was returned.
subject: neu rather than fnd because the ID minted by the question fixes it, and because GABA and the brain's glutamine trap are what the record is mostly used for. The secondary node SYS-NEU-T01 carries that; the primary stays in biochemistry, where the material is taught.
conflicts: None.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
CANCELLATION: Glutamic Acid, printed pages 94 to 95, is not cancelled and the question book examines it. Two entries on its own derivative list do reach cancelled ground — arginine and proline, whose sections on printed pages 96 and 105 are both cancelled from the end-of-module and the final exam. weight_confidence is held at 0.3 for that reason, and exam_signal cites the question book only, with no exam paper claimed.

---

# Item

## label
Cysteine gives cystine, enzyme thiol groups, the sulfate of PAPS, thioethanolamine of coenzyme A, taurine and glutathione

## id
CON-FND-11F38A2B3E9B67

## canonical_key
amino-acids.cysteine.functions-and-derivatives

## aliases
Cysteine
Derivatives of cysteine
Taurine synthesis
PAPS active sulfate
Glutathione
Trans-sulfuration pathway

## arabic_label
وظائف السيستئين ومشتقاته

## arabic_aliases
مشتقات السيستئين
التورين
الجلوتاثيون

## definition
Cysteine is the non-essential sulfur amino acid, synthesised by the trans-sulfuration pathway in which cystathionine synthase condenses homocysteine with serine to give cystathionine, and cystathionase then splits cystathionine into homoserine and cysteine; both enzymes need pyridoxal phosphate. It is glucogenic, being converted to pyruvate. The department book gives it six derivatives, and every one of them is a different use of the same sulfur atom. Two molecules of cysteine are oxidised to cystine, joined by a disulfide bond. The thiol group is a component of the active site of many enzymes. Cysteine provides the sulfate group of phosphoadenosyl-phosphosulfate, PAPS or active sulfate, the sulfate donor for glycosaminoglycans, sulfolipids and detoxification. It makes thioethanolamine, a component of coenzyme A. It makes taurine, mainly in liver cells, which is conjugated with bile acids like glycine and excreted in bile as bile salts. And it is one of the three amino acids of glutathione, with glycine and glutamic acid.

## explicit_objective
List the six derivatives of cysteine, name taurine's role in bile salt formation, and assign melatonin, melanin and heme to the amino acids that actually make them.

## pitfalls
Assuming that because a synthesis starts with a small amino acid it must be cysteine's: heme is glycine's and melanin is tyrosine's. Following methionine's thread to melatonin — SAM does methylate N-acetylserotonin, but the molecule comes from tryptophan and no sulfur amino acid is a precursor. Missing that glycine appears twice in cysteine's neighbourhood: it conjugates bile acids as taurine does, and it is in glutathione as cysteine is, which is exactly the overlap the distractors exploit. Forgetting that cysteine's carbon skeleton comes from serine while only its sulfur comes from homocysteine.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
SYS-FND-T06 | DIS-BIO-T01

## topic
Amino acids and proteins

## subtopic
Cysteine

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Cysteine

## article_ids
ART-103-BIO-SULFUR-AMINO-ACIDS

## related_article_ids
ART-103-BIO-GLYCINE-GLUTAMATE-AND-BRANCHED-CHAIN

## related_concept_ids
CON-FND-E8A570D41E7B8F | CON-REN-3DD1CADB68BB1B

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
0.45

## exam_weight_by_year
KAU_Y1=0.6

## clinical_relevance
0.35

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | printed p121 q8 | 103 BMS

## atomic_claim_ids
CLM-0F2556CCC91B
CLM-941B05037BC6
CLM-0E163C385986
CLM-B3701CFBE9A3
CLM-E6E05ADC1ABE
CLM-FF6E8C03C35D
CLM-0078256F177E
CLM-AE027C92A37E
CLM-3FC31E8ECCC9

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"5) Synthesis of taurine, mainly in liver cells. Taurine is conjugated (like glycine) with bile acids and excreted in bile in the form of bile salts. 6) Synthesis of glutathione. Glutathione is made up of three amino acids (glycine, cysteine, and glutamic acid)."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-RES-6F7E169B8BE108 | CON-RES-9DA5B3FB92BC7A | CON-RES-80300BAF6E1772 | CON-RES-04CD9047E73472

## conflicts
[clear]

## uncertainty
The book says taurine is made from cysteine "mainly in liver cells" and gives no reaction and no other tissue, so how it is made and where else is outside what this source supports. It also does not say which of the six derivative routes takes the largest share of cysteine, and nothing here should be read as ranking them.

## evidence_gaps
Supported by the department book alone, printed pages 96 and 97. No independent verification against an international biochemistry reference has been attached. The book prints the trans-sulfuration diagram with serine and homocysteine as substrates but does not state in words which atom of cysteine comes from which precursor; that attribution is standard teaching and is flagged rather than asserted as the book's.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
microtopicId: The department book's own section is already the leaf named in module_subject; the canonical tree has no node finer than DIS-BIO-T05 for individual amino acid metabolism.
nanotopicId: No nanotopic exists below the microtopic level for this material.
canonicalKey: This key does not hash to this concept's ID. The ID was fixed first, by questions already authored against it, and the key was written afterwards to describe the concept. Do NOT re-mint an ID from this key — mint-concept-id.mjs would return a different one and fork the record. The ID is the identity; the key is the de-duplication label. (This is the norm rather than the exception: none of the 1,718 live concepts has a key that reproduces its own ID.)
microtopic: The canonical overlay stops at DIS-BIO-T05 and its three generic children; the book's own section name is carried by module_subject.
nanotopic: No nanotopic exists below the microtopic level in this branch.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The claim, citation and span chain for this chapter is a separate scope and is not authored in this batch.
resourceOccurrenceIds: Hand-authored; no corpus extraction record.
sourceCandidateIds: Searched live state by label text for "cysteine", "taurine", "glutathione" and "PAPS". The only live hits are the four acetylcysteine pharmacology concepts named in rejectedMergeCandidateIds. Searching by subject would have reported nothing regardless — 736 of 1,718 live concepts carry a legacy subject, so fnd answers a subject query with zero while the namespace is full.
mergeIds: Nothing live to merge with.
rejectedMergeCandidateIds: CON-RES-6F7E169B8BE108, CON-RES-9DA5B3FB92BC7A, CON-RES-80300BAF6E1772 and CON-RES-04CD9047E73472 are all about acetylcysteine as a drug — mucolytic, antioxidant, antidote in paracetamol poisoning. Not merged: those are respiratory and toxicology pharmacology facts about a derivative given as a medicine, and this is the amino acid's own biosynthetic output list. A question could test either without the other. CON-RES-9DA5B3FB92BC7A is the nearest, because it turns on restoring hepatic glutathione, and a reviewer may want a relation between the two rather than a merge.
conflicts: None.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
CANCELLATION: Cysteine, printed pages 96 to 97, is not on the department's cancelled list and the question book examines it. One arm reaches cancelled ground: cysteine's carbon skeleton is supplied by serine, whose section on printed page 92 is cancelled with alanine. weight_confidence is held at 0.3 for that reason, and exam_signal cites the question book only, with no exam paper claimed.

---

# Item

## label
S-adenosylmethionine is the body's methyl donor: it methylates ethanolamine to choline, noradrenaline to adrenaline and N-acetylserotonin to melatonin, and becomes homocysteine

## id
CON-FND-3622E11F05032C

## canonical_key
amino-acids.methionine.sam-transmethylation

## aliases
S-adenosylmethionine
SAM
Transmethylation reactions
Methionine as methyl donor
Methionine synthase
Methyl transferases

## arabic_label
إس-أدينوزيل ميثيونين كواهب لمجموعة الميثيل وتفاعلات نقل الميثيل

## arabic_aliases
تفاعلات نقل الميثيل
واهب الميثيل

## definition
Methionine is an essential, glucogenic amino acid, and its active form S-adenosylmethionine is used as the body's methyl donor. Methionine adenosyl transferase makes SAM from methionine and ATP, with glutathione as a cofactor. Different methyl transferases then hand SAM's methyl group to an acceptor, and the acceptor becomes the methylated product: the department book's transmethylation examples are ethanolamine to choline, noradrenaline to adrenaline, and N-acetylserotonin to melatonin. Having given up its methyl group SAM becomes S-adenosylhomocysteine, which a hydrolase splits, releasing adenosine and homocysteine. Methionine synthase then regenerates methionine from homocysteine using methylcobalamin and methyl-tetrahydrofolate, which is why deficiency of vitamin B12 or of folate raises homocysteine. Methionine is also involved in the synthesis of protein and of the polyamines spermine and spermidine, which stabilise DNA and RNA by their multiple positive charges, act in gene expression, and behave as growth factors in cell culture.

## explicit_objective
Name the acceptor rather than the product in a SAM reaction, list the department book's three transmethylation examples, and trace the cycle from methionine through SAM and homocysteine back to methionine.

## pitfalls
Naming a product where the question asks for a precursor. Adrenaline, melatonin and choline are what come out; noradrenaline, N-acetylserotonin and ethanolamine are what go in, and a distractor list mixing the two catches a student who reads only the first word. Naming phosphatidylcholine as choline's precursor, which reverses the order — phosphatidylcholine is downstream. Forgetting that the methyl group of creatine comes from SAM while the rest of the molecule does not: the skeleton is assembled from glycine and arginine.

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
SYS-FND-T06 | DIS-BIO-T01

## topic
Amino acids and proteins

## subtopic
Methionine

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Methionine

## article_ids
ART-103-BIO-SULFUR-AMINO-ACIDS

## related_article_ids
ART-103-BIO-GLYCINE-GLUTAMATE-AND-BRANCHED-CHAIN

## related_concept_ids
CON-FND-E8A570D41E7B8F | CON-FND-11F38A2B3E9B67

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
0.45

## exam_weight_by_year
KAU_Y1=0.6

## clinical_relevance
0.35

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | printed p121 q9 and q10 | 103 BMS

## atomic_claim_ids
CLM-803CCD9B55A2
CLM-3618370460EA
CLM-31238480CBEA
CLM-8416A6D7AADF
CLM-53FCA94FBEB7
CLM-D4FA465857ED

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"The active form of methionine, S-adenosyl methionine (SAM), is used as methyl donor. Trans-methylation reactions are catalyzed by different methyl transferases. SAM is used in many transmethylation reactions, e.g.: - Ethanolamine → Choline - Nor-epinephrine → Epinephrine - N-acetyl serotonin → Melatonin"

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The department question book names guanidinoacetate as the SAM acceptor that becomes creatine and treats it as examinable. The department textbook does not print guanidinoacetate anywhere, and its transmethylation list stops at three examples, none of which is creatine. The book does say, under Glycine and under Arginine, that both amino acids share in creatine synthesis — so creatine is taught as an amino acid derivative but its methylation step is not. The step is carried here because the examiner asks it, and the gap is recorded rather than papered over.

## evidence_gaps
Supported by the department book, printed page 98 and its "Role of Methionine as Methyl Donor" diagram, except for the guanidinoacetate-to-creatine methylation, which the book does not carry at all: the string "guanidino" occurs on none of its 160 pages. That step rests on the department question book (printed p121 question 9) and on standard external references not attached here. No independent verification of any part of this concept against an international biochemistry reference has been attached.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
microtopicId: The department book's own section is already the leaf named in module_subject; the canonical tree has no node finer than DIS-BIO-T05 for individual amino acid metabolism.
nanotopicId: No nanotopic exists below the microtopic level for this material.
canonicalKey: This key does not hash to this concept's ID. The ID was fixed first, by questions already authored against it, and the key was written afterwards to describe the concept. Do NOT re-mint an ID from this key — mint-concept-id.mjs would return a different one and fork the record. The ID is the identity; the key is the de-duplication label. (This is the norm rather than the exception: none of the 1,718 live concepts has a key that reproduces its own ID.)
microtopic: The canonical overlay stops at DIS-BIO-T05 and its three generic children; the book's own section name is carried by module_subject.
nanotopic: No nanotopic exists below the microtopic level in this branch.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The claim, citation and span chain for this chapter is a separate scope and is not authored in this batch.
resourceOccurrenceIds: Hand-authored; no corpus extraction record.
sourceCandidateIds: Searched live state by label text for "S-adenosylmethionine", "transmethylation", "methionine" and "methyl donor". find-existing.mjs returned nothing live for any of them.
mergeIds: Nothing live to merge with.
rejectedMergeCandidateIds: No live candidate was returned, so there was none to reject.
definition: The definition deliberately omits guanidinoacetate, which the question book's key requires and the book does not print. It is recorded in uncertainty and evidence_gaps instead, so that a reviewer decides whether to teach it rather than finding it already asserted as the department's own.
conflicts: Not a conflict — the book is silent on guanidinoacetate rather than contradicting the question book, so the disagreement is recorded in uncertainty and evidence_gaps.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
CANCELLATION: Methionine, printed pages 98 to 99, is not cancelled and the question book examines it. The creatine arm of this concept reaches cancelled ground twice over — creatine's skeleton comes from glycine and arginine, and Arginine and Lysine on printed page 96 are cancelled from both exams. weight_confidence is held at 0.3 for that reason and for the guanidinoacetate gap, and exam_signal cites the question book only.

---

# Item

## label
Homocystinuria is most often a cystathionine synthase defect, which raises both homocysteine and methionine; a methionine synthase defect raises homocysteine with normal methionine

## id
CON-FND-E8A570D41E7B8F

## canonical_key
amino-acids.methionine.homocystinuria

## aliases
Homocystinuria
Homocysteinaemia
Cystathionine synthase deficiency
Raised plasma homocysteine
Methionine synthase defect

## arabic_label
بيلة الهوموسيستين وارتفاع الهوموسيستين في الدم

## arabic_aliases
نقص إنزيم سينثاز السيستاثيونين
ارتفاع الهوموسيستين

## definition
Homocystinuria is a group of autosomal recessive diseases involving defects in the metabolism of homocysteine. The commonest cause is a defect in cystathionine synthase, the pyridoxal phosphate-dependent enzyme that converts homocysteine to cystathionine; a defect of the enzyme or of vitamin B6 gives high plasma homocysteine and high plasma methionine, low plasma cysteine — which becomes an essential amino acid in these patients — and excretion of large amounts of homocystine, two homocysteine molecules joined by a disulfide linkage. The other cause is a defect in methionine synthase, which converts homocysteine to methionine using vitamin B12 and tetrahydrofolate; a defect of the enzyme, of folate or of B12 gives high homocysteine with normal methionine, and the same homocystinuria. Raised homocysteine modifies LDL and collagen, producing endothelial injury, atherogenesis, coronary artery disease, thromboembolic disorders and hypertension, together with osteoporosis, mental retardation, and dislocation or complete detachment of the lens. Treatment is restriction of methionine intake and a diet rich in cysteine with vitamins B6, B12 and folate.

## explicit_objective
Name cystathionine synthase as the commonest deficient enzyme in raised plasma homocysteine, and use the plasma methionine level to separate a cystathionine synthase defect from a methionine synthase defect.

## pitfalls
Confusing homocystinuria with cystinuria. The names are close and the mechanisms are opposite: homocystinuria is a metabolic defect with an abnormal plasma, cystinuria is a transport defect with a normal plasma. Forgetting that methionine rises only in the cystathionine synthase form — that single value is what the examiner uses to separate the two causes. Choosing glutathione reductase because glutathione contains cysteine, which is downstream of homocysteine; reducing glutathione consumes no homocysteine. Expecting renal stones: the damage here is vascular, skeletal, ocular and neurological.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
DIS-BIO-T05 | SYS-FND-T06

## topic
Clinical biochemistry

## subtopic
Methionine

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Methionine

## article_ids
ART-103-BIO-SULFUR-AMINO-ACIDS

## related_article_ids
ART-103-BIO-GLYCINE-GLUTAMATE-AND-BRANCHED-CHAIN

## related_concept_ids
CON-FND-3622E11F05032C | CON-REN-3DD1CADB68BB1B

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
0.85

## academic_relevance
0.9

## weight_confidence
0.6

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | printed p121 q11 and q12, printed p122 q13 and q14 | 103 BMS

## atomic_claim_ids
CLM-088857341956
CLM-092C300FB29A
CLM-4AA3093EAA30
CLM-1F514D96DF5D
CLM-3F6A09665415

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"The most common cause is a defect in the enzyme cystathionine synthase, which converts homocysteine to cystathionine, and requires PLP as coenzyme. In this condition (defect of the enzyme or vitamin B6), the disease is characterized by: High plasma levels of homocysteine and methionine. Low plasma levels of cysteine which is considered essential amino acid."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book presents homocystinuria as a group of autosomal recessive diseases but gives no incidence, no age of presentation and no genetic detail beyond the inheritance pattern. It also does not distinguish the severe inherited disease from the mild raised homocysteine of dietary B12 or folate deficiency, and treats the same two enzyme defects as the explanation for both, which is a simplification a reviewer may want to flag for later years.

## evidence_gaps
Supported by the department book alone, printed page 99 and the Summary of Amino Acid Metabolism on printed page 107. No independent verification against an international biochemistry reference has been attached. The book gives no target plasma homocysteine, no dose for the vitamin supplementation it recommends, and no evidence that lowering homocysteine changes the vascular outcome — the causal claim about atherogenesis is stated, not evidenced, on the page.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
microtopicId: The department book's own section is already the leaf named in module_subject; the canonical tree has no node finer than DIS-BIO-T05 for individual amino acid metabolism.
nanotopicId: No nanotopic exists below the microtopic level for this material.
canonicalKey: This key does not hash to this concept's ID. The ID was fixed first, by questions already authored against it, and the key was written afterwards to describe the concept. Do NOT re-mint an ID from this key — mint-concept-id.mjs would return a different one and fork the record. The ID is the identity; the key is the de-duplication label. (This is the norm rather than the exception: none of the 1,718 live concepts has a key that reproduces its own ID.)
microtopic: The canonical overlay stops at DIS-BIO-T07 for clinical biochemistry; the book's section name is carried by module_subject.
nanotopic: No nanotopic exists below the microtopic level in this branch.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The claim, citation and span chain for this chapter is a separate scope and is not authored in this batch.
resourceOccurrenceIds: Hand-authored; no corpus extraction record.
sourceCandidateIds: Searched live state by label text for "homocysteine", "homocystinuria" and "cystathionine". The only pending hits are the questions in this lane; nothing live covers the disorder.
mergeIds: Nothing live to merge with.
rejectedMergeCandidateIds: No live candidate was returned.
spelling: British throughout — homocysteinaemia and hyperhomocysteinaemia where the condition is named by its plasma level, homocystinuria where the book names the urinary finding. The book itself prints the American "hyperammonemia" elsewhere; the record follows house style, not the book's orthography.
conflicts: None. The book's page 99 account and its page 107 summary table agree.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
CANCELLATION: Methionine and its metabolic disorder, printed pages 98 to 99, are NOT on the department's cancelled list, and no arm of this concept reaches cancelled ground. This is one of the two records in the batch whose weights are set on the examined evidence alone; the question book asks it four times.

---

# Item

## label
Cystinuria is a genetic defect in the dibasic amino acid transporter, so cystine, arginine, ornithine and lysine are not reabsorbed and cystine forms stones

## id
CON-REN-3DD1CADB68BB1B

## canonical_key
amino-acids.cysteine.cystinuria

## aliases
Cystinuria
Dibasic amino acid transport defect
Cystine stones
Hexagonal cystine crystals
Most common genetic error of amino acid transport

## arabic_label
البيلة السيستينية وخلل نقل الأحماض الأمينية ثنائية القاعدة

## arabic_aliases
حصوات السيستين
خلل ناقل الأحماض الأمينية ثنائية القاعدة

## definition
Cystinuria is the most common genetic error of amino acid transport. A genetic defect in the transporter of the dibasic amino acids causes failure to transport cystine, arginine, ornithine and lysine across the renal proximal tubules, so all four are excreted in the urine. Cystine is the least soluble of the four; it precipitates in the renal tubules, crystallises as the characteristic hexagonal crystals seen in urine, and forms cystine stones. Treatment follows directly from the mechanism — alkalinisation of the urine and ingestion of plenty of fluids make cystine more soluble so that it is washed out of the urinary tract rather than deposited in it.

## explicit_objective
Identify cystinuria as a defect of dibasic amino acid transport rather than of synthesis or degradation, name the four amino acids that appear in the urine, and justify alkalinisation and fluids from the mechanism.

## pitfalls
Answering that the defect is in synthesis, when plasma amino acids are normal and only the urine is abnormal — that pattern is the signature of a transport problem. Answering acidic amino acid transport: glutamate and aspartate do not appear. Including methionine among the four: it is a neutral sulfur amino acid handled by a different transporter, and it is tempting only because it is upstream of cysteine in a pathway the transporter knows nothing about. Answering that disulfide bond formation fails — cystine is two cysteines joined by a disulfide, but making that bond is normal here. Confusing cystinuria with homocystinuria, whose plasma is abnormal and whose damage is vascular and ocular rather than renal.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
renal

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
SYS-REN-T06 | DIS-BIO-T05

## topic
Clinical biochemistry

## subtopic
Cysteine

## microtopic


## nanotopic


## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Individual amino acid Metabolism > Cysteine

## article_ids
ART-103-BIO-SULFUR-AMINO-ACIDS

## related_article_ids
ART-103-BIO-GLYCINE-GLUTAMATE-AND-BRANCHED-CHAIN

## related_concept_ids
CON-FND-11F38A2B3E9B67 | CON-REN-339CFAB4C81D12

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
0.65

## exam_weight_by_year
KAU_Y1=0.65

## clinical_relevance
0.75

## academic_relevance
0.85

## weight_confidence
0.6

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | department_question_book | undated | printed p122 q15 and q16 | 103 BMS

## atomic_claim_ids
CLM-A9FB2AEFB489
CLM-A2495401D5A5
CLM-0B756281F6E1
CLM-1AA99D0A7E9E

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Cystinuria: It is the most common genetic error of amino acid transport. Cause and manifestations: a genetic defect in the transporter of dibasic amino acids leading to failure of transport of these amino acids (cystine, arginine, ornithine, and lysine) across the renal proximal tubules and are excreted in urine."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The book names the transporter only as "the transporter of dibasic amino acids" and gives no gene, no protein name and no inheritance pattern. It also does not say whether the same transporter is affected in the intestine, which is standard teaching elsewhere and is not asserted here. Whether the plasma cystine is normal is implied by calling the defect one of transport but is not stated on the page.

## evidence_gaps
Supported by the department book alone, printed page 97, "Metabolic Disorder of Cysteine Metabolism — Cystinuria". No independent verification against an international reference has been attached. The book gives no incidence figure for a disorder it calls the most common of its class, and offers no second-line treatment beyond alkalinisation and fluids.

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
authored_needs_independent_evidence

## exclusion_reason


## field_notes
microtopicId: The department book's own section is already the leaf named in module_subject; the canonical tree has no node finer than DIS-BIO-T05 for individual amino acid metabolism.
nanotopicId: No nanotopic exists below the microtopic level for this material.
canonicalKey: This key does not hash to this concept's ID. The ID was fixed first, by questions already authored against it, and the key was written afterwards to describe the concept. Do NOT re-mint an ID from this key — mint-concept-id.mjs would return a different one and fork the record. The ID is the identity; the key is the de-duplication label. (This is the norm rather than the exception: none of the 1,718 live concepts has a key that reproduces its own ID.)
microtopic: The canonical overlay stops at DIS-BIO-T07 for clinical biochemistry, and the renal placement is carried as a secondary node on SYS-REN-T06. The book's section name is carried by module_subject.
nanotopic: No nanotopic exists below the microtopic level in this branch.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
atomicClaimIds: Deliberately empty. The claim, citation and span chain for this chapter is a separate scope and is not authored in this batch.
resourceOccurrenceIds: Hand-authored; no corpus extraction record.
sourceCandidateIds: Searched live state by label text for "cystinuria", "cystine", "hexagonal crystals" and "renal stone". Nothing live covers it. Searching by subject would have been useless — 736 of 1,718 live concepts carry a legacy subject, so the ren namespace answers a subject query with zero.
mergeIds: Nothing live to merge with.
rejectedMergeCandidateIds: No live candidate was returned.
spelling: British — cystinuria, alkalinisation, crystallises.
conflicts: None.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
CANCELLATION: Cysteine and its metabolic disorder, printed pages 96 to 97, are NOT on the department's cancelled list. Arginine and lysine appear in this record only as two of the four amino acids the transporter carries, not as the cancelled sections' own content, so this concept does not stand on cancelled ground and its weights are set on the examined evidence.
