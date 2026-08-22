<!--
  103 BMS · Biochemistry · the 27 concepts the MCQ batch
  ../question/103-BMS-MCQ-lipid-diabetes.md needs and which did not already
  exist. Nothing here is a duplicate: every label was searched before it was
  minted, and where an existing record covered the idea the question points at
  that record instead and no concept was written.

  WHAT WAS REUSED RATHER THAN MINTED. Twenty-two of the 79 MCQs are answered by
  concepts that already exist, so this file is 27 records and not 34:

   · CON-END-CC450A236ABF50  Ketosis and its causes            (pending, 103)
   · CON-GIT-8C5125A491B189  Familial hypercholesterolaemia    (pending, 103)
   · CON-GIT-33EAF87333AAD5  Chylomicron and VLDL function     (pending, 103)
   · CON-GIT-38CC5CC7716DB7  Low plasma VLDL and fatty liver   (pending, 103)
   · CON-END-73242F18F11E58  Insulin structure, 51 aa          (live)
   · CON-END-8E70A34402E8B7  Insulin catabolism, short half-life (live)
   · CON-END-2A7BECE1524359  Insulin receptor and signalling   (live)
   · CON-END-FB7FB91A0697C0  Insulin resistance across tissues (live)
   · CON-END-BCCD5E0C1920B1  Insulin resistance, definition    (live)
   · CON-END-2ED4BD533EA0E3  Insulin secretagogues incl. GLP-1 (live)
   · CON-END-3EA6071BAE8130  Reduced insulin-to-anti-insulin ratio (live)
   · CON-END-3DCCBF7739DD59  Diabetes mellitus, definition     (live)

  Three live records were examined and deliberately NOT merged; each is written
  into the rejected_merge_candidate_ids of the concept that considered it, with
  the reason: CON-GIT-BCE06666AFD9D3, CON-GIT-5E17AE710409A4 and
  CON-FND-6C2C52E862B410.

  IDs. Every `id` came from tools/mint-concept-id.mjs, from the canonical key
  printed in the record. None was hand-written and none was derived for a
  concept that already exists.

  ── THE ONE FIELD THIS FILE CANNOT FILL ──────────────────────────────────────

  `atomic_claim_ids` is on the must-carry-a-value list and every record here
  writes it as `[clear]`. That is a real gap and it is stated rather than
  papered over. All 28 claims in ../evidence/103-BMS-biochemistry-claims.md were
  read and none asserts any of these 27 concepts — they were authored for the
  eleven concepts taken from the 2025 end-of-year paper. §3 of the shared law
  forbids inventing an ID, and this lane was scoped to three files (question,
  concept, article) and mints no claim or citation IDs. So the evidence chain
  for all 27 is owed. It is named in the hand-off report, with the department
  book page each claim would quote, and it is a known audit failure for the lead
  to close, not an oversight.

  `[clear]` VERSUS AN EMPTY BLOCK. `[clear]` is a list directive and is parsed
  only by parseList; on a text column it would be stored verbatim as four
  characters and would pass every gate while holding a wrong value. So in this
  file every deliberately empty LIST column is written `[clear]`, and every
  deliberately empty TEXT column is written as the key with an empty body:

    LIST  aliases arabic_aliases secondary_node_ids universities modules
          article_ids related_article_ids related_concept_ids resource_ids
          approved_file_resource_ids approved_video_resource_ids
          atomic_claim_ids resource_occurrence_ids source_candidate_ids
          original_wording merge_ids rejected_merge_candidate_ids conflicts
          uncertainty evidence_gaps exam_signal
    TEXT  label id canonical_key arabic_label definition explicit_objective
          pitfalls concept_type primary_node_id module_subject support_mode
          owner reviewer final_publisher last_reviewed review_due
          publication_status editorial_review_status exclusion_reason

  ── SOURCES, AND WHERE THE TEXTBOOK IS SILENT ────────────────────────────────

    src_300847a5fa64809d6c07  Dpt book Biochemistry 103.pdf         160 pp
    src_07f0a0ff41addf826c7f  DPT BOOK MCQ D book bio 102&103 mcq   154 pp
    src_90b75d63a73cfc7649b9  BIO ORIENTATION EOM AND EOY             4 pp

  Seven concepts rest on material the department TEXTBOOK does not contain, and
  each says so in its own `conflicts` field with the terms that were searched:
  the eicosanoids, Lp(a), LCAT and CETP, Refsum and Zellweger, heparin and
  lipoprotein lipase, and — for the whole diabetes group — HbA1c, the polyol
  pathway, the diagnostic thresholds, ketoacidosis and the hyperosmolar state.
  The department's own QUESTION book examines all of them and its orientation
  sets written questions on several. That is a gap between two department
  sources, recorded rather than resolved.

  ── PLACEMENT ───────────────────────────────────────────────────────────────

  Lipid concepts sit on DIS-BIO-T04, feed-starve on DIS-BIO-T03 and diabetes on
  DIS-BIO-T07. The finer subtopic nodes DIS-BIO-T04-S01/-S02, -T03-S01 and
  -T07-S02 do exist in src/data/medicalLibraryTaxonomy.generated.ts, and were
  tried first, but `medical:batch` rejects every one of them as "not a canonical
  node" — the validator's canonical set stops at topic level under DIS-BIO. The
  topic node is therefore the finest placement that resolves, and it matches the
  earlier 103 batch. The discrepancy between the generated taxonomy and the
  validator's node set is worth a look and is named in the hand-off report.

  The ten diabetes and feed-starve concepts carry `module_subject`
  "103 BMS > Biochemistry" and stop there, because the subject tree — built from
  the department textbook's contents page — has no diabetes node and that book
  has no diabetes chapter. No node was invented. Full reasoning is in each
  record's field_notes under `moduleSubject`.

  The two metabolic-integration concepts carry low weights on purpose: the
  department orientation cancels "Metabolic integration — 109-114" from BOTH
  exams. Their `exclusionReason` field_note says so and their
  `weight_confidence` is 0.15.

  Import order: resource → article → concept → claim → citation → span →
  relation → practical → question. This file lands after
  ../article/103-BMS-mcq-lipid.md and before the question batch.
-->


# Item

## label
A fatty acid is activated to acyl-CoA in the cytosol, and only carnitine can carry it across the inner mitochondrial membrane

## id
CON-FND-177A829022AC8F

## canonical_key
carnitine.shuttle.fatty-acid-activation-and-transport

## aliases
Carnitine shuttle
Activation of fatty acids
Acyl-CoA synthetase
Thiokinase
CPT-I and CPT-II
Carnitine palmitoyl transferase
Transport of fatty acyl CoA into mitochondria

## arabic_label
تنشيط الأحماض الدهنية ومكوك الكارنيتين

## arabic_aliases
مكوك الكارنيتين
إنزيم أسيل كو-أيه سينثيتيز
ناقلة أسيل الكارنيتين

## definition
Before a fatty acid can be oxidised it must be activated: acyl-CoA synthetase (thiokinase) joins it to coenzyme A in the cytosol, spending one ATP that goes to AMP and pyrophosphate, so two high-energy bonds are consumed. Fatty acids of fewer than 12 carbons then cross the mitochondrial membranes freely, but long-chain acyl-CoA cannot. It is carried in by the carnitine shuttle: CPT-I on the outer membrane exchanges CoA for carnitine, carnitine acyl-carnitine translocase moves the acyl-carnitine across the inner membrane against outgoing free carnitine, and CPT-II regenerates acyl-CoA in the matrix. Carnitine is made from lysine and methionine in liver and kidney and is stored in skeletal muscle, heart and brain.

## explicit_objective
Separate activation from transport, naming the molecule and the enzyme used at each step, and explain why the two-carbon cost of activation is subtracted from the ATP yield.

## pitfalls
Saying that acetyl-CoA activates the fatty acid, or that citrate carries it into the mitochondrion. Coenzyme A activates and carnitine transports; acetyl-CoA is a product of oxidation and citrate carries acetyl units out for synthesis, in the opposite direction. A student holding either substitution cannot explain why carnitine deficiency causes disease.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T07

## topic
Lipid metabolism

## subtopic
Oxidation of fatty acids

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## article_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## related_article_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## related_concept_ids
CON-FND-84BDACCA71AF45 | CON-FND-A0F07BE6AD30A5

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
0.75

## exam_weight_by_year
KAU_Y1=0.75

## clinical_relevance
0.5

## academic_relevance
0.95

## weight_confidence
0.6

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p107-114 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Fatty acids are first activated to form acyl-CoA by acyl-CoA synthetase before oxidation."
"Long chain fatty acids (≥ 12 carbons) cannot cross the outer mitochondrial membrane, they form acyl-CoA in the cytosol then transported across the outer mitochondrial membrane by the help of carnitine shuttle"

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-GIT-BCE06666AFD9D3

## conflicts
[clear]

## uncertainty
The department book says long-chain acyl-CoA is transported "across the outer mitochondrial membrane" by the carnitine shuttle, while its own diagram shows the translocase in the inner membrane and CPT-I and CPT-II on the outer and inner membranes respectively. The diagram is the accurate reading and is what this concept states.

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "carnitine", "acyl-CoA synthetase" and "thiokinase". The only hit is the live concept CON-GIT-BCE06666AFD9D3, which is recorded in rejectedMergeCandidateIds rather than as a candidate record.
rejectedMergeCandidateIds: CON-GIT-BCE06666AFD9D3 is "Pantothenate deficiency, carnitine-shuttle abnormalities, and alcoholism can decrease fatty-acid oxidation" — a list of causes of reduced oxidation, not a description of how the shuttle works. A question could test either without the other, so it is cross-referenced rather than merged.
relationships: Walked the 46 concepts already authored for 103 BMS and the DIS-BIO-T03/T04 live concepts. Loose neighbours are recorded in related_concept_ids. No typed edges are written — this lane authors no relations file — and the mechanism_step_before chain across the fatty-acid oxidation and lipogenesis concepts is owed.

---

# Item

## label
Beta-oxidation removes two carbons per turn in the mitochondrial matrix, and that fixes the turn count, the yield per turn, and what an odd-chain fatty acid leaves behind

## id
CON-FND-84BDACCA71AF45

## canonical_key
oxidation.beta.two-carbon-cycle-yield

## aliases
Beta oxidation
β-oxidation
Steps of beta oxidation
Energy yield of fatty acid oxidation
Odd chain fatty acids
Propionyl-CoA
Acyl-CoA dehydrogenase

## arabic_label
أكسدة بيتا للأحماض الدهنية

## arabic_aliases
أكسدة الأحماض الدهنية
ناتج الطاقة من أكسدة بيتا

## definition
Beta-oxidation runs in the mitochondrial matrix, beside the citric acid cycle and the electron transport chain. Each turn performs four reactions — oxidation, hydration, oxidation, thiolytic cleavage — releasing one acetyl-CoA and reducing one FAD and one NAD+. Because two carbons leave per turn and the last turn splits a four-carbon acyl-CoA into two acetyl-CoA at once, a chain of n carbons needs (n/2)-1 turns and gives n/2 acetyl-CoA: palmitate takes 7 turns for 8 acetyl-CoA and yields 108 ATP, a net 106 after the two high-energy bonds spent on activation. An odd-chain fatty acid ends instead with three-carbon propionyl-CoA, which propionyl-CoA carboxylase converts to methylmalonyl-CoA and then to succinyl-CoA, the one part of a fatty acid that can become glucose.

## explicit_objective
Calculate the turns, acetyl-CoA, FADH2 and NADH produced from a fatty acid of a given chain length, and state what an odd-chain fatty acid leaves behind and where it goes.

## pitfalls
Counting n/2 turns rather than (n/2)-1, because the final four-carbon unit yields two acetyl-CoA in one cut and needs no turn of its own. The related error is importing the citric acid cycle yield into a single beta-oxidation turn and answering "1 FADH2 and 3 NADH"; the turn itself makes one of each, and everything more happens later, in Krebs.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T07

## topic
Lipid metabolism

## subtopic
Oxidation of fatty acids

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## article_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## related_article_ids
ART-103-BIO-KETONE-BODY-METABOLISM

## related_concept_ids
CON-FND-177A829022AC8F | CON-FND-4C05D459E80AEF | CON-END-2E748A37DA660A

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
0.3

## academic_relevance
0.95

## weight_confidence
0.6

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p107-114 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Each cycle will release one acetyl-CoA molecule (i.e., shortens acyl-CoA by two carbons), with the formation of one FADH2 and one NADH+H+."
"Since 2 high energy phosphates are used in the activation of fatty acid, the net gain is 108 – 2 = 106 ATP molecules"
"Odd chain fatty acid oxidation produces multiple molecules of acetyl CoA and one molecule of propionyl-CoA, which is converted to succinyl-CoA then to glucose (uncommon in humans)."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "beta-oxidation", "β-oxidation" and "oxidation of fatty" — no candidate record exists in any namespace.
relationships: Walked the 46 concepts already authored for 103 BMS and the DIS-BIO-T03/T04 live concepts. Loose neighbours are recorded in related_concept_ids. No typed edges are written — this lane authors no relations file — and the mechanism_step_before chain across the fatty-acid oxidation and lipogenesis concepts is owed.

---

# Item

## label
Fatty acid oxidation reduces FAD and NAD+, fatty acid synthesis spends NADPH, and keeping the two currencies apart is what lets both run in one cell

## id
CON-FND-4C05D459E80AEF

## canonical_key
lipid.redox-cofactors.oxidation-versus-synthesis

## aliases
NADPH in fatty acid synthesis
FAD in beta oxidation
Riboflavin and fatty acid oxidation
Malic enzyme
Sources of NADPH
Redox cofactors of lipid metabolism

## arabic_label
حاملات الاختزال في أكسدة وبناء الأحماض الدهنية

## arabic_aliases
نادف هيدروجين في بناء الدهون
الإنزيم الماليكي

## definition
The two halves of fatty acid metabolism use different reducing currencies, and that separation is what allows a cell to hold both pathways without a futile cycle. Oxidation reduces FAD, at acyl-CoA dehydrogenase, and NAD+, at 3-hydroxyacyl-CoA dehydrogenase — so riboflavin yields a cofactor used in oxidation and not in synthesis. Synthesis reduces its growing chain twice per cycle and both reductions consume NADPH; making palmitate takes 14 NADPH. The department book names two sources: the hexose monophosphate pathway, and malic enzyme, which decarboxylates malate to pyruvate as the citrate shuttle returns carbon to the mitochondrion. Insulin stimulates the HMP dehydrogenases along with the rest of lipogenesis, so supply and demand are switched on together.

## explicit_objective
State which reduced cofactor belongs to oxidation and which to synthesis, name two sources of NADPH, and explain why the cell keeps NADH oxidised and NADPH reduced.

## pitfalls
Treating NADH and NADPH as interchangeable because they differ by one phosphate. They are held at opposite redox ratios on purpose: NADH is kept oxidised so catabolism can run, NADPH kept reduced so biosynthesis can. Answering "NADH" for the reductant of fatty acid synthesis is the commonest single-letter error in this chapter. The second trap is malate dehydrogenase, which acts on the same substrate as malic enzyme and uses NAD+, not NADP+.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T03 | DIS-BIO-T08

## topic
Lipid metabolism

## subtopic
Cofactors of lipid metabolism

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Synthesis of Triacylglycerol

## article_ids
ART-103-BIO-FATTY-ACID-OXIDATION | ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## related_article_ids
ART-103-BIO-HMP-PATHWAY-AND-G6PD

## related_concept_ids
CON-FND-84BDACCA71AF45 | CON-FND-2F3A652B8E3104 | CON-FND-B928DE79E08882

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
KAU_Y1=0.6

## clinical_relevance
0.3

## academic_relevance
0.95

## weight_confidence
0.5

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p107-114 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Synthesis of palmitic acid requires 8 molecules of acetyl CoA and 14 NADPH."
"Sources of NADPH are mainly HMP and malic enzyme."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "NADPH", "malic enzyme" and "riboflavin" — no candidate record covers the oxidation-versus-synthesis contrast.
relationships: Walked the 46 concepts already authored for 103 BMS and the DIS-BIO-T03/T04 live concepts. Loose neighbours are recorded in related_concept_ids. No typed edges are written — this lane authors no relations file — and the mechanism_step_before chain across the fatty-acid oxidation and lipogenesis concepts is owed.

---

# Item

## label
Alpha-oxidation handles fatty acids that are too branched for beta-oxidation and peroxisomal oxidation handles those that are too long

## id
CON-FND-F8FE239D334F4F

## canonical_key
oxidation.alpha-and-peroxisomal.branched-and-very-long-chain

## aliases
Alpha oxidation
Peroxisomal beta oxidation
Refsum disease
Zellweger syndrome
Phytanic acid
Very long chain fatty acids
Omega oxidation

## arabic_label
أكسدة ألفا والأكسدة البيروكسيسومية للأحماض الدهنية

## arabic_aliases
مرض ريفسم
متلازمة زلويجر
حمض الفيتانيك

## definition
Mitochondrial beta-oxidation attacks the beta-carbon, so a fatty acid carrying a methyl group there is blocked. Alpha-oxidation, a peroxisomal route, removes one carbon from the carboxyl end and shifts the methyl group off the beta position so beta-oxidation can proceed; losing it causes phytanic acid to accumulate, which is Refsum disease. Peroxisomal beta-oxidation is a separate function, trimming very-long-chain fatty acids down to a length the mitochondrion can take; losing the peroxisome itself, as in Zellweger syndrome, causes long-chain fatty acids to accumulate in tissues. Omega-oxidation, a minor microsomal route acting on the terminal methyl carbon, becomes more prominent when beta-oxidation is blocked.

## explicit_objective
Match each alternative oxidation route to the shape of fatty acid it exists for, and say which substance accumulates when each one fails.

## pitfalls
Swapping the two accumulating substances, because Refsum and Zellweger are peroxisomal, are taught together, and both present with neurological damage. The discriminator is the shape of the molecule, not the organelle: Refsum has a methyl group in the way so alpha-oxidation is the defect, Zellweger has chains that are simply too long so the trimming function is the defect.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T07

## topic
Lipid metabolism

## subtopic
Oxidation of fatty acids

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## article_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## related_article_ids
ART-103-BIO-KETONE-BODY-METABOLISM | ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT | ART-103-BIO-FEED-STARVE-CYCLE

## related_concept_ids
CON-FND-84BDACCA71AF45 | CON-FND-A0F07BE6AD30A5

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
0.4

## exam_weight_by_year
KAU_Y1=0.4

## clinical_relevance
0.55

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.85

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p107-114 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Peroxisomal Beta oxidation: It is mainly for the trimming of very long-chain fatty acids."
"Alpha oxidation: It is important for oxidation of fatty acids with a methyl group on the β-carbon (so-called branched chain fatty acids) which blocks β-oxidation."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
conflicts: Searched the department biochemistry book (src_300847a5fa64809d6c07, 160 pages) in the cached page text for "Zellweger", "Refsum" and "phytanic". The term does not appear anywhere in it. The department QUESTION book (src_07f0a0ff41addf826c7f) examines this material. That is a gap between the two department sources, recorded rather than resolved: a faculty reviewer must decide whether the textbook or the question book defines the syllabus here.

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
relatedArticleIds: Derived from the `related_articles` cross-references the teaching article's own author wrote, each with a stated reason. An article that says it is related to this concept's article genuinely discusses this concept without owning it, which is exactly what this field means.
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "Refsum", "Zellweger", "phytanic" and "peroxisomal" — no candidate record exists.
relatedArticleIds: No other 103 article discusses the peroxisomal or alpha routes; ART-103-BIO-FATTY-ACID-OXIDATION is the only one and it is in articleIds.
relationships: Walked the 46 concepts already authored for 103 BMS and the DIS-BIO-T03/T04 live concepts. Loose neighbours are recorded in related_concept_ids. No typed edges are written — this lane authors no relations file — and the mechanism_step_before chain across the fatty-acid oxidation and lipogenesis concepts is owed.

---

# Item

## label
Any block in fatty acid oxidation produces fasting hypoglycaemia with LOW ketone bodies, and that combination is the diagnosis

## id
CON-FND-A0F07BE6AD30A5

## canonical_key
oxidation.defects.hypoketotic-hypoglycaemia

## aliases
MCAD deficiency
Medium chain acyl-CoA dehydrogenase deficiency
Carnitine deficiency
CPT-I deficiency
CPT-II deficiency
Non-ketotic hypoglycaemia
Hypoketotic hypoglycaemia
Metabolic disorders of beta oxidation

## arabic_label
نقص سكر الدم غير الكيتوني الناتج عن خلل أكسدة الأحماض الدهنية

## arabic_aliases
نقص إنزيم نازعة هيدروجين أسيل كو-أيه متوسط السلسلة
نقص الكارنيتين

## definition
MCAD deficiency, carnitine deficiency and CPT-I or CPT-II deficiency all stop fatty acids being oxidised, and they produce one syndrome. Hepatic fatty acid oxidation normally supplies the ATP gluconeogenesis runs on, so gluconeogenesis fails; the body falls back on glucose, so liver glycogen is stripped; and because the liver generates no acetyl-CoA there is nothing to make ketone bodies from, so ketones are LOW rather than high. Muscle weakness, myoglobinuria and cardiomyopathy follow from the ATP deficit, hyperammonaemia from increased protein catabolism, and fatty liver especially in CPT-I deficiency. Treatment is avoidance of fasting and strenuous exercise, a high-carbohydrate low-fat diet, and oral carnitine where carnitine is the deficiency.

## explicit_objective
Explain why a block in fatty acid oxidation gives hypoglycaemia with low ketones, and use that combination to separate it from other causes of fasting hypoglycaemia.

## pitfalls
Reasoning that the patient is effectively fasting, that fasting raises ketones, and therefore that ketones must be high. It is exactly backwards: the acetyl-CoA that ketone bodies are built from comes from the beta-oxidation that is blocked. A student who holds this will miss the diagnosis in a hypoglycaemic infant, because the low ketone level is the finding that makes it.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T04 | DIS-BIO-T07

## topic
Lipid metabolism

## subtopic
Metabolic disorders of beta-oxidation

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## article_ids
ART-103-BIO-FATTY-ACID-OXIDATION

## related_article_ids
ART-103-BIO-KETONE-BODY-METABOLISM | ART-103-BIO-KETOSIS

## related_concept_ids
CON-FND-177A829022AC8F | CON-END-2E748A37DA660A | CON-END-CC450A236ABF50

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
0.65

## exam_weight_by_year
KAU_Y1=0.65

## clinical_relevance
0.9

## academic_relevance
0.85

## weight_confidence
0.55

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p107-114 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"All these conditions lead to decreased fatty acid oxidation and hence decreased ATP generation"
"The decrease in hepatic fatty acid oxidation results in less acetyl-CoA for ketone body synthesis, and consequently, a non-ketotic hypoglycemia develops."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-GIT-BCE06666AFD9D3

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "MCAD", "carnitine deficiency" and "hypoglycemia" — the live records returned are about hypoglycaemia in other contexts, none about fatty acid oxidation defects.
rejectedMergeCandidateIds: CON-GIT-BCE06666AFD9D3 lists causes of decreased fatty-acid oxidation but says nothing about the resulting syndrome. Not merged; cross-referenced.
relationships: Walked the 46 concepts already authored for 103 BMS and the DIS-BIO-T03/T04 live concepts. Loose neighbours are recorded in related_concept_ids. No typed edges are written — this lane authors no relations file — and the mechanism_step_before chain across the fatty-acid oxidation and lipogenesis concepts is owed.

---

# Item

## label
Acetyl-CoA carboxylase is the key enzyme of lipogenesis: it needs biotin, it makes malonyl-CoA, and every control signal converges on it

## id
CON-FND-2F3A652B8E3104

## canonical_key
lipogenesis.acetyl-coa-carboxylase.biotin-malonyl-coa

## aliases
Acetyl-CoA carboxylase
ACC
Malonyl-CoA
Biotin and carboxylases
Key enzyme of fatty acid synthesis
Regulation of lipogenesis
Fatty acid synthase

## arabic_label
إنزيم كربوكسيلاز أسيتيل كو-أيه، الإنزيم المفتاحي لبناء الأحماض الدهنية

## arabic_aliases
مالونيل كو-أيه
فيتامين ب7 البيوتين

## definition
Acetyl-CoA carboxylase catalyses the first committed and rate-limiting reaction of fatty acid synthesis, adding CO2 to acetyl-CoA to form malonyl-CoA, and it carries biotin as the prosthetic group that ferries the CO2. Malonyl-CoA is the two-carbon donor for every elongation step, so palmitate needs seven malonyl-CoA and one acetyl-CoA. The enzyme is active when dephosphorylated and inactive when phosphorylated; insulin activates it in the fed state, glucagon and adrenaline inactivate it in fasting, and its own products malonyl-CoA and palmityl-CoA inhibit it allosterically. Fatty acid synthase, the multienzyme complex of two identical chains bearing seven activities, does the chemistry downstream but is not the regulated step. The same biotin serves pyruvate carboxylase and propionyl-CoA carboxylase.

## explicit_objective
Identify the rate-limiting enzyme of lipogenesis, name its cofactor, and explain why the busiest enzyme in a pathway is not usually the regulated one.

## pitfalls
Answering "fatty acid synthase" because it does most of the work. Doing the most chemistry is not the same as setting the rate; the key enzyme is the first committed and most heavily regulated step. The second trap is naming acyl carrier protein as the biotin-dependent component — its prosthetic group is phosphopantetheine, derived from pantothenic acid, a different vitamin in the same pathway.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T04 | DIS-BIO-T08

## topic
Lipid metabolism

## subtopic
Synthesis of fatty acids

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Synthesis of Triacylglycerol

## article_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## related_article_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## related_concept_ids
CON-FND-4C05D459E80AEF | CON-FND-FCFC1B5A95695E | CON-FND-1C668119B3C0BB

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
0.35

## academic_relevance
0.95

## weight_confidence
0.6

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p107-114 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"It is the key enzyme in lipogenesis that converts acetyl-CoA to malonyl-CoA."
"Acetyl-CoA Carboxylase is activated by dephosphorylation and inactivated by phosphorylation."
"2- Acetyl-CoA carboxylase: adds CO2 to acetyl CoA producing malonyl-CoA for FA synthesis."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "acetyl-CoA carboxylase", "malonyl" and "lipogenesis" — no candidate record exists in any namespace.
relationships: Walked the 46 concepts already authored for 103 BMS and the DIS-BIO-T03/T04 live concepts. Loose neighbours are recorded in related_concept_ids. No typed edges are written — this lane authors no relations file — and the mechanism_step_before chain across the fatty-acid oxidation and lipogenesis concepts is owed.

---

# Item

## label
Acetyl-CoA reaches the cytosol as citrate, and ATP-citrate lyase is what releases it there

## id
CON-FND-FCFC1B5A95695E

## canonical_key
lipogenesis.citrate-shuttle.atp-citrate-lyase

## aliases
Citrate shuttle
ATP-citrate lyase
Citrate lyase
Conversion of glucose to fatty acids
Transport of acetyl-CoA to cytosol

## arabic_label
مكوك السترات ونقل أسيتيل كو-أيه إلى السيتوبلازم

## arabic_aliases
إنزيم سترات ليز
نقل الأسيتيل إلى خارج الميتوكوندريا

## definition
Acetyl-CoA is made by pyruvate dehydrogenase inside the mitochondrion but cannot cross the inner membrane, while fatty acid synthesis is cytosolic. The citrate shuttle solves this: citrate synthase condenses acetyl-CoA with oxaloacetate to form citrate, a specific transporter carries citrate to the cytosol, and ATP-citrate lyase splits it back to acetyl-CoA and oxaloacetate. The oxaloacetate returns as malate or pyruvate, and malic enzyme generates NADPH on the way. Insulin activates the shuttle along with glycolysis, pyruvate dehydrogenase, acetyl-CoA carboxylase and fatty acid synthase expression.

## explicit_objective
Describe how acetyl units reach the cytosol for lipogenesis, name the enzyme that releases them, and say what the returning limb of the shuttle contributes.

## pitfalls
Naming citrate synthase instead of citrate lyase. The synthase loads the shuttle inside the mitochondrion and the lyase unloads it in the cytosol; only the second releases the acetyl-CoA the question asks about. The other trap is thiolase, which does produce acetyl-CoA but in the mitochondrion, from beta-oxidation, in the opposite direction.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T03 | DIS-BIO-T04

## topic
Lipid metabolism

## subtopic
Synthesis of fatty acids

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Synthesis of Triacylglycerol

## article_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## related_article_ids
ART-103-BIO-TCA-KEY-ENZYMES

## related_concept_ids
CON-FND-2F3A652B8E3104 | CON-FND-4C05D459E80AEF | CON-FND-037BF052DDFC0D

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
0.65

## exam_weight_by_year
KAU_Y1=0.65

## clinical_relevance
0.25

## academic_relevance
0.95

## weight_confidence
0.5

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p107-114 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"In the cytosol, citrate is broken back to oxaloacetate and acetyl-CoA by ATP citrate lyase."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "citrate shuttle", "citrate lyase" and "ATP-citrate" — no candidate record exists.
relationships: Walked the 46 concepts already authored for 103 BMS and the DIS-BIO-T03/T04 live concepts. Loose neighbours are recorded in related_concept_ids. No typed edges are written — this lane authors no relations file — and the mechanism_step_before chain across the fatty-acid oxidation and lipogenesis concepts is owed.

---

# Item

## label
Adipose tissue lacks glycerol kinase, so it can only build triacylglycerol when glucose is available and cannot reuse the glycerol it releases

## id
CON-FND-6B469645AE7DBC

## canonical_key
adipose.glycerol-3-phosphate.glycerol-kinase-deficiency

## aliases
Glycerol kinase
Glycerol-3-phosphate synthesis
Adipose tissue and glucose
Glycerol-3-phosphate dehydrogenase
Why adipose tissue needs glucose

## arabic_label
نقص إنزيم جليسرول كيناز في النسيج الدهني

## arabic_aliases
تخليق جلسرول-3-فوسفات
اعتماد النسيج الدهني على الجلوكوز

## definition
Esterifying a fatty acid requires glycerol-3-phosphate. Liver, kidney and intestinal mucosa make it directly from free glycerol using glycerol kinase; adipose tissue lacks that enzyme and must instead reduce dihydroxyacetone phosphate from glycolysis. Adipose triacylglycerol synthesis is therefore dependent on a supply of glucose and on the insulin that admits it through GLUT-4. The same missing enzyme explains the other direction: when adipose triacylglycerol is broken down the glycerol released cannot be reused locally, so it leaves the fat cell for the liver, which is why plasma glycerol is a marker of lipolysis and why glycerol is a gluconeogenic substrate.

## explicit_objective
Explain from one missing enzyme both why adipose tissue needs glucose to store fat and why the glycerol it releases travels to the liver.

## pitfalls
Naming glycerol-3-phosphate dehydrogenase as the missing enzyme. That is the enzyme adipose tissue actually uses; if it were absent the tissue could not make triacylglycerol from glucose either, and the glucose dependence the concept describes would not exist.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T03 | DIS-BIO-T04

## topic
Lipid metabolism

## subtopic
Synthesis of triacylglycerol

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Synthesis of Triacylglycerol

## article_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## related_article_ids
ART-103-BIO-FATTY-ACID-OXIDATION | ART-103-BIO-PLASMA-LIPOPROTEINS | ART-103-BIO-CHOLESTEROL-METABOLISM

## related_concept_ids
CON-FND-69437CF1F5CCC0 | CON-FND-1C668119B3C0BB

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
KAU_Y1=0.6

## clinical_relevance
0.35

## academic_relevance
0.9

## weight_confidence
0.5

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p107-114 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Other tissues, as adipose tissue, are deficient in glycerol kinase; glycerol 3-phosphate is synthesized from reduction of dihydroxyacetone phosphate produced during glycolysis."
"Glycerol cannot be utilized by adipose tissue due to deficiency of glycerol kinase. Glycerol passes to the blood where it is mostly taken up by the liver."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
relatedArticleIds: Derived from the `related_articles` cross-references the teaching article's own author wrote, each with a stated reason. An article that says it is related to this concept's article genuinely discusses this concept without owning it, which is exactly what this field means.
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "glycerol kinase" and "glycerol-3-phosphate" — no candidate record exists.
relatedArticleIds: No other 103 article discusses glycerol-3-phosphate supply; the one that does is in articleIds.
relationships: Walked the 46 concepts already authored for 103 BMS and the DIS-BIO-T03/T04 live concepts. Loose neighbours are recorded in related_concept_ids. No typed edges are written — this lane authors no relations file — and the mechanism_step_before chain across the fatty-acid oxidation and lipogenesis concepts is owed.

---

# Item

## label
Depot fat is triacylglycerol stored in adipose tissue, distinct from the structural tissue fat in every cell, and the liver is the primary site of its synthesis

## id
CON-FND-69437CF1F5CCC0

## canonical_key
triacylglycerol.depot-fat.storage-and-synthesis-site

## aliases
Depot fat
Tissue fat
Triacylglycerol storage
Site of TAG synthesis
Tissue fat and depot fat

## arabic_label
الدهن المخزن والدهن النسيجي

## arabic_aliases
ثلاثي أسيل الجليسرول المخزن
موضع تخليق الدهون الثلاثية

## definition
Triacylglycerol is stored as depot fat in adipose tissue, and it differs from the tissue fat present in every cell on four counts the department book tabulates: site, function, composition and response to diet. Tissue fat is mainly phospholipid, glycolipid and cholesterol, rich in unsaturated fatty acids, constant in amount and never used for energy; depot fat is mainly triacylglycerol, rich in saturated fatty acids, variable, and increases with overfeeding and falls with fasting. Triacylglycerol suits storage because it is anhydrous and highly reduced — one gram yields about 9.3 kcal. The liver is the primary site of triacylglycerol synthesis and exports it as VLDL, which is why a failure of VLDL formation strands the triacylglycerol and produces a fatty liver.

## explicit_objective
Contrast depot fat with tissue fat on site, function, composition and response to diet, and name the primary site of triacylglycerol synthesis with its export route.

## pitfalls
Treating all body fat as one pool, so that starvation is imagined to consume cell membranes. Tissue fat is structural and is not drawn on for energy at all; only depot fat is mobilised, which is why its amount is variable and tissue fat's is constant.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T04 | DIS-BIO-T08

## topic
Lipid metabolism

## subtopic
Tissue fat and depot fat

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Introduction to Lipid Metabolism

## article_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## related_article_ids
ART-103-BIO-PLASMA-LIPOPROTEINS

## related_concept_ids
CON-FND-6B469645AE7DBC | CON-GIT-33EAF87333AAD5 | CON-GIT-38CC5CC7716DB7

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
0.55

## exam_weight_by_year
KAU_Y1=0.55

## clinical_relevance
0.4

## academic_relevance
0.85

## weight_confidence
0.45

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p107-114 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Triacylglycerol is stored as depot fat in adipose tissue. It is different from tissue fat present in every cell"
"Lipids are a rich source of energy as 1 gram yields 9.3 kilo calories."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-GIT-5E17AE710409A4

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "depot fat", "tissue fat" and "triacylglycerol" — the nearest live record is CON-GIT-5E17AE710409A4 on fatty liver, recorded in rejectedMergeCandidateIds.
rejectedMergeCandidateIds: CON-GIT-5E17AE710409A4 states that overmobilisation of adipose fat can exceed hepatic VLDL capacity and cause fatty liver. That is a consequence of failed export, not a description of what depot fat is; the pending concept CON-GIT-38CC5CC7716DB7 already covers it for 103. Not merged.
relationships: Walked the 46 concepts already authored for 103 BMS and the DIS-BIO-T03/T04 live concepts. Loose neighbours are recorded in related_concept_ids. No typed edges are written — this lane authors no relations file — and the mechanism_step_before chain across the fatty-acid oxidation and lipogenesis concepts is owed.

---

# Item

## label
Insulin and the anti-insulin hormones pull one switch in opposite directions: the phosphorylation state of hormone-sensitive lipase and of acetyl-CoA carboxylase

## id
CON-FND-1C668119B3C0BB

## canonical_key
lipid.hormonal-control.lipogenesis-versus-lipolysis

## aliases
Regulation of lipolysis
Hormone-sensitive lipase
Regulation of lipogenesis
Insulin and lipid metabolism
Anti-insulin hormones
Lipase phosphatase

## arabic_label
التنظيم الهرموني لبناء وتكسير الدهون

## arabic_aliases
الليباز الحساس للهرمونات
هرمونات مضادة الأنسولين

## definition
Hormone-sensitive lipase is the key enzyme of lipolysis and exists in an active phosphorylated and an inactive dephosphorylated form. Glucagon and adrenaline activate adenylyl cyclase, raising cAMP and activating protein kinase A, which phosphorylates and activates it; thyroxine and growth hormone activate protein kinase A directly, and glucocorticoids increase synthesis of the enzyme. Insulin, the only hormone that inhibits lipolysis, stimulates phosphodiesterase so cAMP is destroyed, and activates lipase phosphatase so the enzyme is dephosphorylated. The same hormones move acetyl-CoA carboxylase the opposite way, insulin activating and the anti-insulin hormones inactivating it, so lipogenesis and lipolysis are never on together. Caffeine increases lipolysis by inhibiting phosphodiesterase.

## explicit_objective
Predict the direction lipolysis and lipogenesis move under a named hormone, and state the two mechanisms by which insulin inhibits lipolysis.

## pitfalls
Assuming exercise or stress inhibits lipolysis because those states "burn fat". Both raise adrenaline and lower insulin, so both stimulate lipolysis; the only condition that inhibits it is a high insulin state, which means carbohydrate feeding.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T03 | DIS-BIO-T04

## topic
Lipid metabolism

## subtopic
Regulation of lipolysis and lipogenesis

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Catabolism of Depot Fat

## article_ids
ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## related_article_ids
ART-103-BIO-CHOLESTEROL-METABOLISM | ART-103-BIO-KETOSIS

## related_concept_ids
CON-FND-2F3A652B8E3104 | CON-GIT-3A348EEAF118BD | CON-END-CC450A236ABF50

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
0.75

## exam_weight_by_year
KAU_Y1=0.75

## clinical_relevance
0.55

## academic_relevance
0.9

## weight_confidence
0.55

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p107-114 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Insulin inhibits lipolysis and thus decreases the release of FFA through: - Stimulation of phosphodiesterase which hydrolyzes cAMP ... - Activation of lipase phosphatase"
"N.B. Caffeine increases lipolysis through inhibiting phosphodiesterase, thus increasing cAMP."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "lipolysis", "hormone-sensitive lipase" and "lipase phosphatase" — the only live hit is CON-END-FB7FB91A0697C0 on insulin resistance, which is a different idea and is used as a main concept elsewhere in this batch rather than merged here.
relationships: Walked the 46 concepts already authored for 103 BMS and the DIS-BIO-T03/T04 live concepts. Loose neighbours are recorded in related_concept_ids. No typed edges are written — this lane authors no relations file — and the mechanism_step_before chain across the fatty-acid oxidation and lipogenesis concepts is owed.

---

# Item

## label
Lipoprotein lipase empties triacylglycerol-rich particles at the capillary wall; apo C-II activates it, insulin induces it, and heparin displaces it

## id
CON-GIT-6CB618DBA50596

## canonical_key
lipase.lipoprotein-lipase.apo-c2-insulin-heparin

## aliases
Lipoprotein lipase
LPL
Apo C-II
Post-heparin lipolytic activity
Clearance of chylomicrons
Degradation of lipoprotein TAG

## arabic_label
إنزيم ليباز البروتين الدهني

## arabic_aliases
أبو سي-2 المنشط لليباز
تطهير الكيلومكرونات من الدم

## definition
Lipoprotein lipase is anchored to the vascular endothelium of extrahepatic tissues — adipose tissue above all, and also skeletal and cardiac muscle — facing the blood, because a lipoprotein particle is far too large to enter a cell whole. It hydrolyses the triacylglycerol carried in chylomicrons and VLDL into free fatty acids and glycerol, removing about 90% of a chylomicron's load and about 50% of VLDL's. Its activator is apo C-II, lent to the particle by HDL, and its synthesis is induced by insulin, so a meal both fills the fat stores and clears the plasma. Heparin displaces it from its endothelial anchor into the circulation, which is the basis of post-heparin lipolytic activity. Insulin deficiency lowers its activity and plasma triacylglycerol rises.

## explicit_objective
State where lipoprotein lipase sits, what activates and induces it, and predict what happens to plasma triacylglycerol when insulin falls.

## pitfalls
Confusing lipoprotein lipase with hormone-sensitive lipase. Lipoprotein lipase faces the blood on the capillary endothelium, is activated by apo C-II and induced by insulin; hormone-sensitive lipase works inside the adipocyte, is controlled by phosphorylation, and is inhibited by insulin. Insulin moves the two in opposite directions, so getting them the wrong way round inverts the answer to every fed-state question.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T04 | DIS-BIO-T07

## topic
Lipid metabolism

## subtopic
Plasma lipids and lipoproteins

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## article_ids
ART-103-BIO-LIPOPROTEIN-MACHINERY

## related_article_ids
ART-103-BIO-PLASMA-LIPOPROTEINS | ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## related_concept_ids
CON-GIT-99EF5E989B0C65 | CON-GIT-33EAF87333AAD5 | CON-FND-1C668119B3C0BB

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
0.65

## academic_relevance
0.9

## weight_confidence
0.6

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p107-114 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Lipoprotein lipase is present in the vascular endothelial cells of extrahepatic tissues."
"Activators for enzymes e.g. apo CII is an activator for lipoprotein lipase."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
conflicts: Searched the department biochemistry book (src_300847a5fa64809d6c07, 160 pages) in the cached page text for "heparin" as it relates to lipoprotein lipase. The term does not appear anywhere in it. The department QUESTION book (src_07f0a0ff41addf826c7f) examines this material. That is a gap between the two department sources, recorded rather than resolved: a faculty reviewer must decide whether the textbook or the question book defines the syllabus here.

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "lipoprotein lipase" and "LPL" — no candidate record exists in any namespace.
relationships: Walked the 46 concepts already authored for 103 BMS and the DIS-BIO-T03/T04 live concepts. Loose neighbours are recorded in related_concept_ids. No typed edges are written — this lane authors no relations file — and the mechanism_step_before chain across the fatty-acid oxidation and lipogenesis concepts is owed.

---

# Item

## label
The plasma lipoproteins form one series ordered by protein content, and that order is the order of density

## id
CON-GIT-ECB3C2F56DC72D

## canonical_key
lipoprotein.composition.protein-content-density-series

## aliases
Types of plasma lipoproteins
Chylomicron
VLDL
IDL
LDL
HDL
Lipoprotein density
Ultracentrifugation of lipoproteins
Lipoprotein a
Lp(a)

## arabic_label
أنواع البروتينات الدهنية في البلازما وترتيبها بالكثافة

## arabic_aliases
الكيلومكرونات
البروتين الدهني منخفض الكثافة
البروتين الدهني عالي الكثافة

## definition
Plasma lipoproteins are separated by ultracentrifugation according to density, and because protein is the densest component and lipid the least dense, the series runs by protein content: chylomicrons 2% protein and 98% lipid, mainly triacylglycerol; VLDL 10% and 90%, mainly triacylglycerol; IDL 10% and 90%, cholesteryl ester and triacylglycerol; LDL 20% and 80%, mainly cholesteryl ester; HDL 45% and 55%, mainly phospholipid and cholesteryl ester. Source and function follow the same order: chylomicrons from intestinal cells carry dietary lipid, VLDL from the liver carries hepatic triacylglycerol out, LDL delivers cholesterol to tissues and is the bad cholesterol, and HDL returns cholesterol to the liver and is the good one. Lipoprotein(a) is a modified LDL carrying apolipoprotein(a), which resembles plasminogen and slows fibrinolysis.

## explicit_objective
Order the lipoproteins by protein content, density and dominant lipid, and derive each particle's source and function from its position in the series.

## pitfalls
Learning the five particles as five unrelated lists of percentages. They are one ordered series, and the ordering principle — more protein means denser — generates the answer to any question about relative density, size or composition. The other trap is treating free fatty acid bound to albumin as a lipoprotein; it is separated in the same run but is a different transport form.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T04 | DIS-BIO-T07

## topic
Lipid metabolism

## subtopic
Plasma lipids and lipoproteins

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## article_ids
ART-103-BIO-LIPOPROTEIN-MACHINERY

## related_article_ids
ART-103-BIO-PLASMA-LIPOPROTEINS

## related_concept_ids
CON-GIT-33EAF87333AAD5 | CON-GIT-99EF5E989B0C65 | CON-GIT-8C5125A491B189

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
0.85

## exam_weight_by_year
KAU_Y1=0.85

## clinical_relevance
0.55

## academic_relevance
0.95

## weight_confidence
0.65

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p107-114 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Different lipoproteins can be separated by Ultracentrifugation according to their density, the higher the fat content the less dense the lipoprotein particle."
"HDL (45%) Apo A, C, E & D (55%) (Mainly PL &CE) Formed by liver and intestinal cells"

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
conflicts: Searched the department biochemistry book (src_300847a5fa64809d6c07, 160 pages) in the cached page text for "Lp(a)" and "lipoprotein a". The term does not appear anywhere in it. The department QUESTION book (src_07f0a0ff41addf826c7f) examines this material. That is a gap between the two department sources, recorded rather than resolved: a faculty reviewer must decide whether the textbook or the question book defines the syllabus here.

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "HDL", "LDL" and "lipoprotein" — the live record CON-FND-6C2C52E862B410 is about what a lipid profile reports, not about particle composition, and is not a candidate for this idea.
relationships: Walked the 46 concepts already authored for 103 BMS and the DIS-BIO-T03/T04 live concepts. Loose neighbours are recorded in related_concept_ids. No typed edges are written — this lane authors no relations file — and the mechanism_step_before chain across the fatty-acid oxidation and lipogenesis concepts is owed.

---

# Item

## label
The proteins on a lipoprotein do four jobs — structure, enzyme activation, receptor binding and lipid transfer — and LCAT is the enzyme that traps cholesterol in the core

## id
CON-GIT-99EF5E989B0C65

## canonical_key
apolipoprotein.functions.structure-activator-ligand-transfer

## aliases
Apolipoproteins
Function of apolipoproteins
Apo B-100
Apo A-I
Apo E
Apo C-II
Apo D
LCAT
Lecithin cholesterol acyl transferase
Reverse cholesterol transport
CETP

## arabic_label
وظائف البروتينات الدهنية الظاهرية وإنزيم LCAT

## arabic_aliases
أبوليبوبروتين
النقل العكسي للكوليسترول

## definition
The department book gives apolipoproteins four functions. They are structural elements of the particle; they activate enzymes, as apo C-II activates lipoprotein lipase; they bind cell-surface receptors to direct the particle to its target, apo B-100 to the LDL receptor, apo A-I to the hepatic HDL receptor, apo E for remnant and IDL uptake; and they transfer lipid between particles, exchanging triacylglycerol for cholesteryl esters. Integral apolipoproteins such as apo B cannot be removed; peripheral ones such as apo C and apo E can, and their loss is what converts VLDL to IDL and IDL to LDL. Alongside them, LCAT esterifies the free cholesterol HDL collects into cholesteryl ester, which is hydrophobic and sinks into the core — trapping it there and converting discoidal HDL into spherical HDL, which is what keeps reverse cholesterol transport running.

## explicit_objective
Assign each named apolipoprotein to its function, and explain why esterifying cholesterol is what allows HDL to keep collecting it.

## pitfalls
Knowing that apo E is present on HDL and concluding that apo E binds the HDL receptor. Being on a particle is not the same as being the ligand for that particle's uptake: apo A-I binds the HDL receptor, and apo E binds the hepatic receptor that clears remnants and IDL.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T04 | DIS-BIO-T07

## topic
Lipid metabolism

## subtopic
Plasma lipids and lipoproteins

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## article_ids
ART-103-BIO-LIPOPROTEIN-MACHINERY

## related_article_ids
ART-103-BIO-PLASMA-LIPOPROTEINS | ART-103-BIO-CHOLESTEROL-METABOLISM

## related_concept_ids
CON-GIT-ECB3C2F56DC72D | CON-GIT-6CB618DBA50596 | CON-GIT-8C5125A491B189

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
0.55

## academic_relevance
0.9

## weight_confidence
0.6

## confidence
0.85

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p107-114 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"1) A structural element in the lipoprotein particles. 2) Activators for enzymes e.g. apo CII is an activator for lipoprotein lipase. 3) Interact with cell-surface receptors to direct the lipoproteins to their target organs and tissues. e.g., Apo B-100 in LDL is specific for the uptake of LDL by the LDL-receptors. 4) Transfer of lipid between lipoproteins e.g., Apo D transfers TAG in exchange with cholesterol esters between different lipoproteins."
"HDLs are endocytosed by liver cells through apo A1 receptors."
"Cholesterol taken is esterified to form cholesterol ester which forms a central hydrophobic core converting the discoidal HDL into the spherical HDL."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
conflicts: Searched the department biochemistry book (src_300847a5fa64809d6c07, 160 pages) in the cached page text for "LCAT", "lecithin" and "CETP". The term does not appear anywhere in it. The department QUESTION book (src_07f0a0ff41addf826c7f) examines this material. That is a gap between the two department sources, recorded rather than resolved: a faculty reviewer must decide whether the textbook or the question book defines the syllabus here. The book attributes the triacylglycerol-for-cholesteryl-ester exchange to apo D, where the question book attributes it to CETP; both describe the same exchange and the concept states the exchange rather than adjudicating the name.

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "apolipoprotein", "apo B", "LCAT" and "reverse cholesterol" — no candidate record exists.
relationships: Walked the 46 concepts already authored for 103 BMS and the DIS-BIO-T03/T04 live concepts. Loose neighbours are recorded in related_concept_ids. No typed edges are written — this lane authors no relations file — and the mechanism_step_before chain across the fatty-acid oxidation and lipogenesis concepts is owed.

---

# Item

## label
The liver makes ketone bodies it cannot itself use, because it has HMG-CoA synthase and lyase and lacks thiophorase

## id
CON-END-2E748A37DA660A

## canonical_key
ketogenesis.ketolysis.hepatic-versus-extrahepatic

## aliases
Ketogenesis
Ketolysis
Ketone bodies
HMG-CoA synthase
HMG-CoA lyase
Thiophorase
Acetoacetate
3-hydroxybutyrate
Acetone
Metabolism of ketone bodies

## arabic_label
تخليق الأجسام الكيتونية في الكبد واستهلاكها خارجه

## arabic_aliases
الأجسام الكيتونية
أسيتو أسيتات
بيتا هيدروكسي بيوتيرات

## definition
Ketogenesis occurs in the mitochondria of the liver because HMG-CoA synthase and HMG-CoA lyase are found chiefly there: two acetyl-CoA condense to acetoacetyl-CoA, a third is added to give HMG-CoA, and the lyase releases acetoacetate, which is reduced to 3-hydroxybutyrate or decarboxylates spontaneously to acetone. Ketolysis occurs in the mitochondria of extrahepatic tissues, because thiophorase — succinyl-CoA acetoacetate CoA-transferase — is active there and deficient in the liver, so the liver cannot activate the ketone bodies it makes. Ketone bodies are water-soluble and travel without albumin or a lipoprotein, so tissues use them more easily than fatty acids; the brain, which cannot take up albumin-bound fatty acids at all, adapts to them after five to six days of starvation. Acetoacetate yields 19 ATP and 3-hydroxybutyrate 21.5.

## explicit_objective
Name the enzymes that confine ketogenesis to the liver and ketolysis to extrahepatic tissues, and explain why the brain can use ketone bodies but not fatty acids.

## pitfalls
Calling acetyl-CoA a ketone body. It is the raw material the three ketone bodies are built from, and it is neither small enough nor water-soluble enough to do their job. The second error is assuming the liver burns what it makes; it cannot, because it lacks thiophorase, and that division of labour is the whole point of the pathway.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
endo

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T04 | DIS-BIO-T03

## topic
Lipid metabolism

## subtopic
Metabolism of ketone bodies

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Metabolism of Ketone Bodies (Ketogenesis and Ketolysis)

## article_ids
ART-103-BIO-KETONE-BODY-METABOLISM

## related_article_ids
ART-103-BIO-KETOSIS | ART-103-BIO-FATTY-ACID-OXIDATION

## related_concept_ids
CON-END-CC450A236ABF50 | CON-FND-84BDACCA71AF45 | CON-FND-A0F07BE6AD30A5 | CON-FND-85583A59349A47

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
0.6

## academic_relevance
0.95

## weight_confidence
0.65

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p107-114 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"ketogenesis occurs in the mitochondria of the liver because of the presence of HMG-CoA synthase and HMG-CoA lyase chiefly in the liver."
"This is due to the high activity of thiophorase (succinyl-CoA acetoacetate CoA-transferase) in the extrahepatic tissues and its deficiency in the liver."
"During starvation (5-6 days), the brain cells adapts to utilize ketone bodies as it cannot utilize fatty acids"

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-END-CC450A236ABF50

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "ketone", "ketogenesis" and "thiophorase" — the only hit is the pending 103 concept CON-END-CC450A236ABF50, recorded in rejectedMergeCandidateIds.
rejectedMergeCandidateIds: CON-END-CC450A236ABF50 is "Ketosis is what happens when ketogenesis outruns ketolysis, and every cause is a state of high anti-insulin to insulin ratio" — a concept about the causes of a pathological state. This one is about where each half of the pathway runs and why. One objective is "list the causes of ketosis", the other is "explain why the liver cannot use its own ketone bodies"; a question can test either without the other, so they are cross-linked rather than merged. That concept is taught by ART-103-BIO-KETOSIS, which is a pending batch file this lane does not own — the back-link from it to this concept is owed and is named in the hand-off report.
relationships: Walked the 46 concepts already authored for 103 BMS and the DIS-BIO-T03/T04 live concepts. Loose neighbours are recorded in related_concept_ids. No typed edges are written — this lane authors no relations file — and the mechanism_step_before chain across the fatty-acid oxidation and lipogenesis concepts is owed.

---

# Item

## label
HMG-CoA reductase is the rate-limiting step of cholesterol synthesis, active when dephosphorylated, and the branch point that decides whether HMG-CoA becomes a sterol or a ketone body is the compartment

## id
CON-GIT-3A348EEAF118BD

## canonical_key
cholesterol.hmg-coa-reductase.rate-limiting-regulation

## aliases
HMG-CoA reductase
Mevalonate
Regulation of cholesterol synthesis
Biosynthesis of cholesterol
Statins
Rate limiting step of cholesterol synthesis

## arabic_label
إنزيم اختزال HMG-CoA، الخطوة المحددة لمعدل تخليق الكوليسترول

## arabic_aliases
الميفالونات
تنظيم تخليق الكوليسترول

## definition
Cholesterol is synthesised in the cytosol and endoplasmic reticulum of all nucleated cells from acetyl-CoA, and the pathway begins exactly as ketogenesis does, through HMG-CoA — but in the cytosol rather than the mitochondrion, and that compartment is what decides the fate. The rate-limiting reaction is the reduction of HMG-CoA to mevalonate by HMG-CoA reductase, consuming two NADPH. The enzyme is active when dephosphorylated and inactive when phosphorylated, with AMP-activated protein kinase doing the phosphorylating; insulin induces the gene and activates the protein phosphatase that dephosphorylates it, glucagon represses the gene, and cholesterol itself both allosterically inhibits and represses the enzyme. Statins inhibit it competitively as structural analogues of HMG-CoA.

## explicit_objective
Identify the rate-limiting step of cholesterol synthesis, predict the effect of insulin, glucagon and cholesterol on it, and explain why the step before it is not the committed one.

## pitfalls
Naming the formation of HMG-CoA as the regulatory step. HMG-CoA is a branch point — it can become mevalonate or acetoacetate — and a molecule at a branch point cannot be the commitment; the commitment is the reaction that takes it down one branch. The mirror error is putting HMG-CoA reductase into the mitochondrial ketogenesis pathway, where the enzyme after the lyase is not a reductase at all.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T04 | DIS-BIO-T07

## topic
Lipid metabolism

## subtopic
Cholesterol metabolism

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Cholesterol Metabolism

## article_ids
ART-103-BIO-CHOLESTEROL-METABOLISM

## related_article_ids
ART-103-BIO-KETONE-BODY-METABOLISM

## related_concept_ids
CON-END-2E748A37DA660A | CON-GIT-E6AEB25F31B529 | CON-FND-1C668119B3C0BB

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
0.6

## academic_relevance
0.95

## weight_confidence
0.6

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p107-114 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"This is followed by the rate limiting reaction, where HMG-CoA is reduced to mevalonate in a reaction catalyzed by HMG-CoA reductase and requiring two NADPH."
"Insulin dephosphorylates (i.e. activates) HMG-CoA reductase through activation of protein phosphatase."
"Cholesterol synthesis starts with the formation of HMG-CoA in the same way as in ketogenesis except that it is in the cytosol (ketogenesis in mitochondria)."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "HMG-CoA", "mevalonate" and "cholesterol" — the live hits are about lipid profiles and corpus luteum pigment, neither a candidate for this idea.
relatedArticleIds: ART-103-BIO-KETOSIS also touches HMG-CoA but from the ketone body side; the ketogenesis article in this batch is the closer neighbour and is named.
relationships: Walked the 46 concepts already authored for 103 BMS and the DIS-BIO-T03/T04 live concepts. Loose neighbours are recorded in related_concept_ids. No typed edges are written — this lane authors no relations file — and the mechanism_step_before chain across the fatty-acid oxidation and lipogenesis concepts is owed.

---

# Item

## label
Plasma cholesterol runs 120-200 mg/dL, hypercholesterolaemia means the LDL fraction is high, and thyroid status moves it in both directions

## id
CON-GIT-E6AEB25F31B529

## canonical_key
cholesterol.plasma-level.hyper-and-hypocholesterolaemia

## aliases
Plasma cholesterol
Hypercholesterolaemia
Hypocholesterolaemia
Causes of hypercholesterolemia
Hyperthyroidism and cholesterol
Statins

## arabic_label
مستوى الكوليسترول في البلازما وأسباب ارتفاعه وانخفاضه

## arabic_aliases
فرط كوليسترول الدم
نقص كوليسترول الدم

## definition
Total plasma cholesterol ranges from 120 to 200 mg/dL, about two thirds as cholesteryl ester and one third free, and hypercholesterolaemia means a level above 200 mg/dL. The fraction that carries it is LDL, which is 80% lipid and mainly cholesteryl ester and delivers cholesterol from liver to tissues; a high LDL forms arterial plaques, which is why it is called the bad cholesterol. The department book names six causes: a diet rich in saturated fat, carbohydrate and cholesterol; obesity; diabetes mellitus, through three mechanisms at once; hypothyroidism, because thyroid hormone drives the conversion of cholesterol to bile acids; obstructive jaundice, which blocks the only exit; and the familial hyperlipoproteinaemias. Hyperthyroidism runs that conversion fast and therefore lowers plasma cholesterol. Statins lower it by competitively inhibiting HMG-CoA reductase.

## explicit_objective
Name the lipoprotein fraction that rises in hypercholesterolaemia, list the causes, and explain in both directions why thyroid status changes the plasma level.

## pitfalls
Assuming cholesterol can be broken down. There is no pathway that degrades the sterol ring in humans; cholesterol leaves only as bile acids or in bile, which is why obstructive jaundice raises it and why the thyroid, by controlling the rate of bile acid formation, controls the level.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T04 | DIS-BIO-T07

## topic
Lipid metabolism

## subtopic
Plasma cholesterol

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Cholesterol Metabolism

## article_ids
ART-103-BIO-CHOLESTEROL-METABOLISM

## related_article_ids
ART-103-BIO-PLASMA-LIPOPROTEINS | ART-103-BIO-LIPOPROTEIN-MACHINERY

## related_concept_ids
CON-GIT-3A348EEAF118BD | CON-GIT-8C5125A491B189 | CON-GIT-ECB3C2F56DC72D | CON-END-B41C6D0DFACFE4

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
0.7

## exam_weight_by_year
KAU_Y1=0.7

## clinical_relevance
0.8

## academic_relevance
0.85

## weight_confidence
0.55

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p107-114 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Hypercholesterolemia means a plasma cholesterol level higher than 200 mg/dL."
"4) Hypothyroidism: as thyroid hormone stimulates the oxidation of cholesterol and its conversion to bile acids."
"N.B. Statins are a group of drugs used for treatment of hypercholesterolemia. They act through competitive inhibition of HMG-CoA reductase"

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-FND-6C2C52E862B410

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "hypercholesterolemia", "plasma cholesterol" and "hyperthyroidism" — the nearest is CON-FND-6C2C52E862B410, recorded in rejectedMergeCandidateIds.
rejectedMergeCandidateIds: CON-FND-6C2C52E862B410 states what a standard lipid profile reports. That is a description of a laboratory panel, not of the normal range and the causes of its abnormality; a question could test either alone. Not merged.
relationships: Walked the 46 concepts already authored for 103 BMS and the DIS-BIO-T03/T04 live concepts. Loose neighbours are recorded in related_concept_ids. No typed edges are written — this lane authors no relations file — and the mechanism_step_before chain across the fatty-acid oxidation and lipogenesis concepts is owed.

---

# Item

## label
Eicosanoids are twenty-carbon signalling lipids made from arachidonic acid down two branches, and aspirin blocks the cyclooxygenase branch

## id
CON-FND-90496D64322904

## canonical_key
eicosanoids.arachidonic-acid.cyclooxygenase-pathway

## aliases
Eicosanoids
Arachidonic acid
Prostaglandins
Thromboxane
Leukotrienes
Cyclooxygenase
Aspirin
Lipoxygenase
Prostacyclin

## arabic_label
الإيكوسانويدات ومسار إنزيم سيكلوأوكسيجيناز

## arabic_aliases
البروستاجلاندينات
الثرومبوكسان
حمض الأراكيدونيك

## definition
Eicosanoids are twenty-carbon signalling lipids — the name is from the Greek for twenty — derived from arachidonic acid released from membrane phospholipid by phospholipase A2. Arachidonic acid then takes one of two branches: the cyclooxygenase branch yields prostaglandins, thromboxanes and prostacyclin, and the lipoxygenase branch yields leukotrienes. Thromboxane, made by platelets, promotes platelet aggregation and vasoconstriction. Aspirin inhibits cyclooxygenase, so it blocks the first branch and leaves the second intact; glucocorticoids act further upstream on phospholipase A2 and shut down both; and a leukotriene receptor antagonist such as montelukast acts on the second branch, downstream of synthesis.

## explicit_objective
Name the precursor and the two branches of eicosanoid synthesis, and place aspirin, a glucocorticoid and a leukotriene antagonist on the correct branch or step.

## pitfalls
Sorting these molecules by whether they "sound like a lipid" rather than by carbon skeleton. Gangliosides and ceramide are sphingolipids and structural; choline is a phospholipid head group. Only a twenty-carbon derivative of arachidonic acid is an eicosanoid.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
DIS-BIO-T07

## topic
Lipid metabolism

## subtopic
Eicosanoids

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism

## article_ids
ART-103-BIO-EICOSANOIDS

## related_article_ids
ART-103-BIO-LIPOPROTEIN-MACHINERY

## related_concept_ids
CON-GIT-ECB3C2F56DC72D

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
0.35

## exam_weight_by_year
KAU_Y1=0.35

## clinical_relevance
0.75

## academic_relevance
0.7

## weight_confidence
0.25

## confidence
0.85

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p107-114 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Question book, Lipid Metabolism, printed p104, q28] "One of the following is an inhibitor of cyclooxygenase enzyme:"
[Question book, Lipid Metabolism, printed p104, q29] "Eicosanoids include the following compound:"

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
conflicts: Searched the department biochemistry book (src_300847a5fa64809d6c07, 160 pages) in the cached page text for "eicosanoid", "prostaglandin", "thromboxane" and "cyclooxygenase". The term does not appear anywhere in it. The department QUESTION book (src_07f0a0ff41addf826c7f) examines this material. That is a gap between the two department sources, recorded rather than resolved: a faculty reviewer must decide whether the textbook or the question book defines the syllabus here.

## uncertainty
Because the department textbook carries no eicosanoid material, there is no departmental statement of how much detail is expected. The definition is held to what the two question-book items actually test — the precursor, the two branches, and where aspirin acts — and goes no further.

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
relatedArticleIds: Derived from the `related_articles` cross-references the teaching article's own author wrote, each with a stated reason. An article that says it is related to this concept's article genuinely discusses this concept without owning it, which is exactly what this field means.
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "eicosanoid", "prostaglandin", "thromboxane" and "cyclooxygenase" — no candidate record exists in any namespace, and no page of the department book contains any of the four.
relatedArticleIds: No other 103 article touches eicosanoids; the one authored for them is in articleIds.
moduleSubject: Stops at "Lipid Metabolism" deliberately. The department book's Lipid Metabolism chapter has six sections and none of them covers eicosanoids, so naming one would file the concept under a section that does not contain it.
relationships: Walked the 46 concepts already authored for 103 BMS and the DIS-BIO-T03/T04 live concepts. Loose neighbours are recorded in related_concept_ids. No typed edges are written — this lane authors no relations file — and the mechanism_step_before chain across the fatty-acid oxidation and lipogenesis concepts is owed.

---

# Item

## label
Insulin is secreted in two phases, and loss of the first is one of the earliest abnormalities in type 2 diabetes

## id
CON-END-83E98BC1F9E93E

## canonical_key
insulin.secretion.biphasic-response

## aliases
Biphasic insulin secretion
Two phases of insulin secretion
First phase insulin release
Secretion of insulin

## arabic_label
إفراز الأنسولين على مرحلتين

## arabic_aliases
المرحلة الأولى من إفراز الأنسولين

## definition
Insulin secretion in response to a glucose load is biphasic. The first phase is a sharp spike within minutes, released from hormone already synthesised and stored in granules docked at the membrane, and it limits the immediate post-meal rise in glucose. The second phase is slower, smaller and sustained, drawing on the reserve pool and on newly synthesised hormone, and it lasts as long as the stimulus does. Loss of the first phase is one of the earliest detectable abnormalities in type 2 diabetes, appearing before the fasting glucose becomes abnormal, which is why a person can have a normal fasting sugar and a clearly abnormal response to a glucose load.

## explicit_objective
State that insulin secretion is biphasic, say what each phase contributes, and explain why first-phase loss shows up before a fasting glucose does.

## pitfalls
Assuming a single smooth release would do the same job. It could not both blunt the immediate glucose peak and cover the hours of digestion, which is why two pools exist; and a student who does not know the pattern cannot explain why an oral glucose tolerance test detects disease that a fasting sample misses.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
endo

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
DIS-BIO-T03 | DIS-BIO-T07

## topic
Insulin and diabetes mellitus

## subtopic
Secretion of insulin

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry

## article_ids
ART-103-BIO-DIABETES-MELLITUS

## related_article_ids
ART-END-TOP-8B80E93DAE

## related_concept_ids
CON-END-2ED4BD533EA0E3 | CON-END-06B9ECE929275F | CON-END-AC5B11BA2F2BCA

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
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.6

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p116-119 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Question book, Biochemistry of Diabetes Mellitus, printed p109, q2] "Secretion of insulin occurs in: ... Two phases"

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-END-2ED4BD533EA0E3

## conflicts
conflicts: Searched the department biochemistry book (src_300847a5fa64809d6c07, 160 pages) in the cached page text for "biphasic" and "phases of insulin secretion". The term does not appear anywhere in it, and that book has no diabetes chapter at all — its diabetes material is confined to the Blood Glucose section of the carbohydrate chapter, file pages 53 to 57. The department QUESTION book (src_07f0a0ff41addf826c7f) examines this material and the department orientation (src_90b75d63a73cfc7649b9) sets written questions on it. That is a gap between the department's own sources, recorded rather than resolved.

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "insulin", "secretion" and "biphasic". Ten live concepts on insulin exist under ART-END-TOP-8B80E93DAE; none describes the secretory phases, and the nearest is recorded in rejectedMergeCandidateIds.
rejectedMergeCandidateIds: CON-END-2ED4BD533EA0E3 names the secretagogues that stimulate insulin release but not the time course of the release. A question could test either without the other. Not merged; used as the main concept for the two secretagogue MCQs in this batch instead.
moduleSubject: Written as "103 BMS > Biochemistry" and stopped there. The subject tree in docs/Kasr-Source-Imports/academic/103-BMS-structure.md was built from the department TEXTBOOK's contents page and that book has no diabetes chapter; the department QUESTION book has its own eleven-chapter structure and does. No node was invented and this concept was not filed under Carbohydrate Metabolism or Lipid Metabolism to make it fit. A path that stops matching partway resolves to nothing, so stopping at the subject is the only honest option available. This is a decision owed to a faculty reviewer: either the tree gains a node the textbook does not name, or these items stay at subject level.
relationships: Walked the ten live concepts on DIS-BIO-T03 taught by ART-END-TOP-8B80E93DAE and the 46 concepts already authored for 103 BMS. Loose neighbours are in related_concept_ids. No typed edges are written — this lane authors no relations file — and the causes edges from insulin deficiency to each complication are owed.

---

# Item

## label
Type 1 diabetes is a problem of insulin supply and type 2 a problem of insulin action, and every other difference between them follows from that

## id
CON-END-85750744126501

## canonical_key
diabetes.classification.type-1-versus-type-2

## aliases
Type 1 diabetes
Type 2 diabetes
IDDM
NIDDM
Classification of diabetes mellitus
Absolute insulin deficiency
Comparison of type 1 and type 2 DM
Treatment of type 1 diabetes

## arabic_label
السكري من النوع الأول مقابل النوع الثاني

## arabic_aliases
داء السكري المعتمد على الأنسولين
داء السكري غير المعتمد على الأنسولين

## definition
Type 1 diabetes follows destruction of the pancreatic beta cells, so the deficiency of insulin is absolute; it characteristically presents young, carries a high incidence of ketoacidosis because nothing restrains lipolysis, and is treated by replacing the hormone by injection, since insulin is a 51-amino-acid protein and would be digested if swallowed. Type 2 diabetes is insulin resistance with a relative and progressive secretory failure; it characteristically presents in middle age, rarely produces ketoacidosis because residual insulin holds lipolysis partly in check, and responds initially to weight loss and exercise because there is insulin present to become more sensitive to. Oral secretagogues such as the sulphonylureas cannot work in type 1, because they act on beta cells that no longer exist.

## explicit_objective
Distinguish type 1 from type 2 diabetes on mechanism, onset, ketoacidosis risk and treatment, and derive each difference from the supply-versus-action distinction.

## pitfalls
Answering "impaired insulin secretion" as the characteristic feature of type 1. Secretion is impaired in both — partially and progressively in type 2, completely in type 1 — so a statement true of both cannot characterise one. The word that does the work is "absolute".

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
endo

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
DIS-BIO-T03 | DIS-BIO-T07

## topic
Insulin and diabetes mellitus

## subtopic
Classification of diabetes mellitus

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry

## article_ids
ART-103-BIO-DIABETES-MELLITUS

## related_article_ids
ART-END-TOP-8B80E93DAE | ART-103-BIO-KETOSIS

## related_concept_ids
CON-END-3DCCBF7739DD59 | CON-END-BCCD5E0C1920B1 | CON-END-CC450A236ABF50 | CON-END-68CC8CA610DF37

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
0.9

## academic_relevance
0.85

## weight_confidence
0.45

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p116-119 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Question book, printed p109, q6] "Type I DM is characterized by: ... High incidence of DKA"
[Question book, printed p111, q15] "Type 1 diabetes mellitus is characterized by: It is caused by an absolute deficiency of insulin"
[Department orientation, IV- Compare, item 1] "Type 1 and type 2 DM."

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-END-3DCCBF7739DD59

## conflicts
conflicts: Searched the department biochemistry book (src_300847a5fa64809d6c07, 160 pages) in the cached page text for "type 1", "type 2" and "insulin resistance". The term does not appear anywhere in it, and that book has no diabetes chapter at all — its diabetes material is confined to the Blood Glucose section of the carbohydrate chapter, file pages 53 to 57. The department QUESTION book (src_07f0a0ff41addf826c7f) examines this material and the department orientation (src_90b75d63a73cfc7649b9) sets written questions on it. That is a gap between the department's own sources, recorded rather than resolved.

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "diabetes", "type 1" and "type 2". CON-END-3DCCBF7739DD59 defines diabetes mellitus but does not separate the types; it is recorded in rejectedMergeCandidateIds.
rejectedMergeCandidateIds: CON-END-3DCCBF7739DD59 is "Diabetes mellitus is hyperglycemia and reduced glucose tolerance caused by impaired insulin secretion, action, or both" — a definition that deliberately covers both types at once. The comparison between them is a separate objective, and the department orientation sets it as its own written question. Not merged; cross-linked.
moduleSubject: Written as "103 BMS > Biochemistry" and stopped there. The subject tree in docs/Kasr-Source-Imports/academic/103-BMS-structure.md was built from the department TEXTBOOK's contents page and that book has no diabetes chapter; the department QUESTION book has its own eleven-chapter structure and does. No node was invented and this concept was not filed under Carbohydrate Metabolism or Lipid Metabolism to make it fit. A path that stops matching partway resolves to nothing, so stopping at the subject is the only honest option available. This is a decision owed to a faculty reviewer: either the tree gains a node the textbook does not name, or these items stay at subject level.
relationships: Walked the ten live concepts on DIS-BIO-T03 taught by ART-END-TOP-8B80E93DAE and the 46 concepts already authored for 103 BMS. Loose neighbours are in related_concept_ids. No typed edges are written — this lane authors no relations file — and the causes edges from insulin deficiency to each complication are owed.

---

# Item

## label
Diabetes is diagnosed by four thresholds, and the band between normal and diabetic has its own name

## id
CON-END-AC5B11BA2F2BCA

## canonical_key
diabetes.diagnosis.glycaemic-thresholds

## aliases
Diagnosis of diabetes mellitus
Diagnostic criteria for diabetes
Prediabetes
Impaired fasting glucose
Fasting blood glucose
Oral glucose tolerance test
126 mg/dl

## arabic_label
معايير تشخيص داء السكري

## arabic_aliases
ما قبل السكري
اختبار تحمل الجلوكوز الفموي

## definition
The department book gives the normal fasting plasma glucose, after 8 to 12 hours of fasting, as 70 to under 100 mg/dL, returning to under 140 mg/dL two hours after feeding. Diabetes is diagnosed by any one of four criteria: fasting plasma glucose 126 mg/dL or above, a 2-hour value of 200 mg/dL or above on an oral glucose tolerance test, HbA1c of 6.5% or above, or a random glucose of 200 mg/dL or above in a patient with the classical symptoms. A fasting glucose of 100 to 125 mg/dL is impaired fasting glucose, or pre-diabetes: not diabetic, but carrying a substantially raised risk of becoming so and of cardiovascular disease, and the stage at which lifestyle change can still return the value to normal.

## explicit_objective
Place a fasting, post-prandial, random or HbA1c value in the normal, pre-diabetic or diabetic band, and state the four diagnostic criteria with their thresholds.

## pitfalls
Confusing the 126 mg/dL diagnostic threshold with the 100 mg/dL upper limit of normal, so that the 100-125 band is called diabetes. The second confusion is with the renal threshold of 180 mg/dL, which is the level above which glucose appears in the urine and is not a diagnostic criterion at all.

## concept_type
investigation

## status
under review

## support_mode
direct_statement

## subject
endo

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
DIS-BIO-T03 | DIS-BIO-T07

## topic
Insulin and diabetes mellitus

## subtopic
Diagnosis of diabetes mellitus

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry

## article_ids
ART-103-BIO-DIABETES-MELLITUS

## related_article_ids
ART-END-TOP-8B80E93DAE

## related_concept_ids
CON-END-839E4F7D92FBEF | CON-END-3DCCBF7739DD59 | CON-END-48522F734B1789 | CON-END-85750744126501

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
0.9

## academic_relevance
0.8

## weight_confidence
0.45

## confidence
0.85

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p116-119 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"The normal fasting plasma glucose level (after 8-12 hours fasting) is between 70 to less than 100 mg/dL, increases after meal and returns to <140 mg/dL at two hours after feeding (2 hour postprandial or 2h PP)."
[Department orientation, II- Mention, items 1-2] "The normal fasting plasma glucose level." / "The normal 2 hr. post prandial plasma glucose level."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
conflicts: Searched the department biochemistry book (src_300847a5fa64809d6c07, 160 pages) in the cached page text for "prediabetes", "126" as a diagnostic threshold and "diagnostic criteria". The term does not appear anywhere in it, and that book has no diabetes chapter at all — its diabetes material is confined to the Blood Glucose section of the carbohydrate chapter, file pages 53 to 57. The department QUESTION book (src_07f0a0ff41addf826c7f) examines this material and the department orientation (src_90b75d63a73cfc7649b9) sets written questions on it. That is a gap between the department's own sources, recorded rather than resolved.

## uncertainty
The normal ranges are the department book's own. The 126 mg/dL, 200 mg/dL and 6.5% diagnostic thresholds and the 100-125 mg/dL pre-diabetes band appear only in the question book; the textbook states none of them. A faculty reviewer should confirm which set of thresholds the department expects to be reproduced.

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "prediabetes", "fasting glucose" and "glucose tolerance" — no candidate record covers the diagnostic bands.
moduleSubject: Written as "103 BMS > Biochemistry" and stopped there. The subject tree in docs/Kasr-Source-Imports/academic/103-BMS-structure.md was built from the department TEXTBOOK's contents page and that book has no diabetes chapter; the department QUESTION book has its own eleven-chapter structure and does. No node was invented and this concept was not filed under Carbohydrate Metabolism or Lipid Metabolism to make it fit. A path that stops matching partway resolves to nothing, so stopping at the subject is the only honest option available. This is a decision owed to a faculty reviewer: either the tree gains a node the textbook does not name, or these items stay at subject level.
relationships: Walked the ten live concepts on DIS-BIO-T03 taught by ART-END-TOP-8B80E93DAE and the 46 concepts already authored for 103 BMS. Loose neighbours are in related_concept_ids. No typed edges are written — this lane authors no relations file — and the causes edges from insulin deficiency to each complication are owed.

---

# Item

## label
HbA1c is non-enzymatic and irreversible, so the red cell lifespan is what sets the two-to-three-month window it reports

## id
CON-END-839E4F7D92FBEF

## canonical_key
diabetes.hba1c.glycated-haemoglobin-monitoring

## aliases
HbA1c
Haemoglobin A1c
Glycated haemoglobin
Glycosylated haemoglobin
Fructosamine
Monitoring of diabetes

## arabic_label
الهيموجلوبين السكري

## arabic_aliases
الهيموغلوبين الغلوكوزي
متابعة التحكم في السكري

## definition
Glucose attaches non-enzymatically to the N-terminal valine of the haemoglobin beta chain at a rate that depends only on how much glucose is present and for how long. Because no enzyme regulates the reaction and it is irreversible, the label is carried for the remaining life of that red cell, and HbA1c therefore reports a weighted average of glucose exposure over roughly the preceding 8 to 12 weeks. It is used both to diagnose diabetes, at 6.5% or above, and to follow it up, because it is unaffected by whether the patient has just eaten or is acutely unwell. Anything that shortens red cell survival falsely lowers it, and fructosamine — glycated serum albumin, reporting on 2 to 3 weeks — is the alternative in that situation.

## explicit_objective
State what HbA1c measures and over what period, explain why the red cell lifespan sets that period, and say when it is unreliable.

## pitfalls
Calling the glycation enzymatic. It is spontaneous, and that is exactly why the value works as a record of average exposure — nothing can regulate or compensate for it. The related error is not knowing that a shortened red cell lifespan falsely lowers the result, which is how a haemolytic anaemia can hide poor control.

## concept_type
investigation

## status
under review

## support_mode
direct_statement

## subject
endo

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
DIS-BIO-T03 | DIS-BIO-T07

## topic
Insulin and diabetes mellitus

## subtopic
Glycated haemoglobin

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry

## article_ids
ART-103-BIO-DIABETES-MELLITUS

## related_article_ids
ART-END-TOP-8B80E93DAE | ART-103-BIO-HMP-PATHWAY-AND-G6PD

## related_concept_ids
CON-END-AC5B11BA2F2BCA | CON-END-F0182CA8A56EA7 | CON-HEM-4F64967BBFBB6F

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
0.75

## exam_weight_by_year
KAU_Y1=0.75

## clinical_relevance
0.9

## academic_relevance
0.8

## weight_confidence
0.45

## confidence
0.85

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p116-119 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Question book, printed p110, q10] "It is used for diagnosis and follow up of DM"
[Question book, printed p111, q18] "The test for checking mean plasma glucose concentration over the previous 8 - 10 weeks is: Hemoglobin A1C"
[Department orientation, III- On biochemical basis explain, item 2] "HbA1c is used to diagnose and follow up diabetic cases."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
conflicts: Searched the department biochemistry book (src_300847a5fa64809d6c07, 160 pages) in the cached page text for "HbA1c", "A1c", "glycated" and "glycosylated". The term does not appear anywhere in it, and that book has no diabetes chapter at all — its diabetes material is confined to the Blood Glucose section of the carbohydrate chapter, file pages 53 to 57. The department QUESTION book (src_07f0a0ff41addf826c7f) examines this material and the department orientation (src_90b75d63a73cfc7649b9) sets written questions on it. That is a gap between the department's own sources, recorded rather than resolved. The question book is also internally inconsistent: its item 10 offers "4 weeks" as a wrong option while its item 18 states "8 - 10 weeks" in the stem. Neither figure is in the textbook.

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "HbA1c", "A1c" and "glycated" — the only hit is a pending glossary term, not a concept candidate.
moduleSubject: Written as "103 BMS > Biochemistry" and stopped there. The subject tree in docs/Kasr-Source-Imports/academic/103-BMS-structure.md was built from the department TEXTBOOK's contents page and that book has no diabetes chapter; the department QUESTION book has its own eleven-chapter structure and does. No node was invented and this concept was not filed under Carbohydrate Metabolism or Lipid Metabolism to make it fit. A path that stops matching partway resolves to nothing, so stopping at the subject is the only honest option available. This is a decision owed to a faculty reviewer: either the tree gains a node the textbook does not name, or these items stay at subject level.
relationships: Walked the ten live concepts on DIS-BIO-T03 taught by ART-END-TOP-8B80E93DAE and the 46 concepts already authored for 103 BMS. Loose neighbours are in related_concept_ids. No typed edges are written — this lane authors no relations file — and the causes edges from insulin deficiency to each complication are owed.

---

# Item

## label
Diabetic dyslipidaemia is production up and clearance down at once: lipolysis floods the liver while insulin-induced lipoprotein lipase falls

## id
CON-END-B41C6D0DFACFE4

## canonical_key
diabetes.dyslipidaemia.lipoprotein-lipase-activity

## aliases
Diabetic dyslipidaemia
Diabetes and hypercholesterolemia
Lipoprotein lipase in diabetes
Hypertriglyceridaemia in diabetes

## arabic_label
اضطراب دهون الدم في مرض السكري

## arabic_aliases
ارتفاع الدهون الثلاثية في السكري

## definition
The department book gives three mechanisms by which diabetes raises plasma lipids, and they act together. Increased lipolysis and increased fatty acid oxidation leave excess acetyl-CoA, and more cholesterol is synthesised from it. The rise in plasma fatty acids drives triacylglycerol synthesis in liver cells, so plasma VLDL and cholesterol rise. And the activity of plasma lipoprotein lipase, which insulin induces, falls, so the clearance of triacylglycerol-rich lipoproteins is reduced. Production rises and clearance falls simultaneously, which is why the characteristic picture is a raised triacylglycerol with a low HDL.

## explicit_objective
Explain why plasma triacylglycerol and cholesterol both rise in insulin deficiency, naming the enzyme insulin normally induces and the two production mechanisms that accompany its loss.

## pitfalls
Naming hormone-sensitive lipase as the enzyme whose activity falls. It is the other lipase and it moves the other way: insulin inhibits it, so insulin deficiency makes it more active, and that is what floods the liver with fatty acids in the first place. The enzyme insulin induces, and which therefore falls, is lipoprotein lipase.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
endo

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
DIS-BIO-T03 | DIS-BIO-T07

## topic
Insulin and diabetes mellitus

## subtopic
Diabetic dyslipidaemia

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry

## article_ids
ART-103-BIO-DIABETES-MELLITUS

## related_article_ids
ART-103-BIO-LIPOPROTEIN-MACHINERY | ART-103-BIO-CHOLESTEROL-METABOLISM

## related_concept_ids
CON-GIT-6CB618DBA50596 | CON-GIT-E6AEB25F31B529 | CON-END-FB7FB91A0697C0

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
0.7

## exam_weight_by_year
KAU_Y1=0.7

## clinical_relevance
0.85

## academic_relevance
0.85

## weight_confidence
0.5

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p116-119 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"3) Diabetes mellitus: due to many factors, which include: a) Increased lipolysis and increased oxidation of fatty acids, lead to excess acetyl-CoA and thus more synthesis of cholesterol. b) The increase in plasma fatty acids leads to increase in triacylglycerol synthesis in liver cells. This leads to increase in plasma VLDL and cholesterol. c) There is decrease in the activity of plasma lipoprotein lipase (induced by insulin), leading to decreased clearance of plasma lipoproteins."
[Department orientation, III- On biochemical basis explain, item 1] "Diabetes mellitus is associated with hypercholesterolemia."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "dyslipidaemia", "lipoprotein lipase" and "diabetes" — no candidate record covers this mechanism.
moduleSubject: Written as "103 BMS > Biochemistry" and stopped there. The subject tree in docs/Kasr-Source-Imports/academic/103-BMS-structure.md was built from the department TEXTBOOK's contents page and that book has no diabetes chapter; the department QUESTION book has its own eleven-chapter structure and does. No node was invented and this concept was not filed under Carbohydrate Metabolism or Lipid Metabolism to make it fit. A path that stops matching partway resolves to nothing, so stopping at the subject is the only honest option available. This is a decision owed to a faculty reviewer: either the tree gains a node the textbook does not name, or these items stay at subject level.
relationships: Walked the ten live concepts on DIS-BIO-T03 taught by ART-END-TOP-8B80E93DAE and the 46 concepts already authored for 103 BMS. Loose neighbours are in related_concept_ids. No typed edges are written — this lane authors no relations file — and the causes edges from insulin deficiency to each complication are owed.

---

# Item

## label
The chronic complications of diabetes are vascular complications, sorted by the calibre of the vessel

## id
CON-END-F0182CA8A56EA7

## canonical_key
diabetes.complications.microvascular-versus-macrovascular

## aliases
Complications of diabetes mellitus
Microvascular complications
Macrovascular complications
Diabetic retinopathy
Diabetic nephropathy
Diabetic neuropathy
Long term complications of diabetes

## arabic_label
مضاعفات السكري الوعائية الدقيقة والكبيرة

## arabic_aliases
اعتلال الشبكية السكري
اعتلال الكلية السكري

## definition
The chronic complications of diabetes divide by the calibre of vessel involved. Microvascular disease affects capillaries and small vessels — retinopathy, nephropathy and peripheral neuropathy — and its severity tracks the duration and degree of hyperglycaemia most closely, so it responds most to tightening glucose control. Macrovascular disease is accelerated atherosclerosis of the large arteries — coronary heart disease, cerebrovascular disease and peripheral arterial disease — driven additionally by the diabetic dyslipidaemia and by glycation of vessel wall proteins, so it requires the blood pressure and the lipids to be treated as well. Nephropathy is detected first as microalbuminuria and progresses to end-stage renal disease.

## explicit_objective
Sort a named diabetic complication into the microvascular or macrovascular group and say what each group implies for treatment.

## pitfalls
Reading "renal" as macrovascular because the kidney is a large organ. The vessels that fail are the glomerular capillaries, so nephropathy is microvascular; and acute renal failure is not a chronic complication of anything, whatever the vessel.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
endo

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
DIS-BIO-T03 | DIS-BIO-T07

## topic
Insulin and diabetes mellitus

## subtopic
Complications of diabetes mellitus

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry

## article_ids
ART-103-BIO-DIABETES-MELLITUS

## related_article_ids
ART-END-TOP-8B80E93DAE | ART-103-BIO-CHOLESTEROL-METABOLISM

## related_concept_ids
CON-END-5D8DA0351D0C94 | CON-END-839E4F7D92FBEF | CON-END-B41C6D0DFACFE4 | CON-REN-02A832B899B605

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
0.75

## exam_weight_by_year
KAU_Y1=0.75

## clinical_relevance
0.95

## academic_relevance
0.8

## weight_confidence
0.45

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p116-119 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Question book, printed p110, q8] "Macrovascular complications of DM include: ... Coronary heart disease"
[Question book, printed p111, q21] "Long term complications of diabetes mellitus: ... Nephropathy"

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
conflicts: Searched the department biochemistry book (src_300847a5fa64809d6c07, 160 pages) in the cached page text for "retinopathy", "nephropathy" and "macrovascular". The term does not appear anywhere in it, and that book has no diabetes chapter at all — its diabetes material is confined to the Blood Glucose section of the carbohydrate chapter, file pages 53 to 57. The department QUESTION book (src_07f0a0ff41addf826c7f) examines this material and the department orientation (src_90b75d63a73cfc7649b9) sets written questions on it. That is a gap between the department's own sources, recorded rather than resolved.

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "retinopathy", "nephropathy" and "diabetes". CON-REN-02A832B899B605, on reduced glomerular capillary number in chronic uncontrolled diabetes, is a live renal-physiology record describing one mechanism within nephropathy; it is cross-linked in related_concept_ids rather than merged, because this concept is the classification and that one is a single mechanism inside it.
moduleSubject: Written as "103 BMS > Biochemistry" and stopped there. The subject tree in docs/Kasr-Source-Imports/academic/103-BMS-structure.md was built from the department TEXTBOOK's contents page and that book has no diabetes chapter; the department QUESTION book has its own eleven-chapter structure and does. No node was invented and this concept was not filed under Carbohydrate Metabolism or Lipid Metabolism to make it fit. A path that stops matching partway resolves to nothing, so stopping at the subject is the only honest option available. This is a decision owed to a faculty reviewer: either the tree gains a node the textbook does not name, or these items stay at subject level.
relationships: Walked the ten live concepts on DIS-BIO-T03 taught by ART-END-TOP-8B80E93DAE and the 46 concepts already authored for 103 BMS. Loose neighbours are in related_concept_ids. No typed edges are written — this lane authors no relations file — and the causes edges from insulin deficiency to each complication are owed.

---

# Item

## label
Aldose reductase traps glucose as sorbitol in exactly the tissues that cannot refuse it, which is why the lens and the nerve are damaged

## id
CON-END-5D8DA0351D0C94

## canonical_key
diabetes.polyol-pathway.aldose-reductase-sorbitol

## aliases
Polyol pathway
Sorbitol
Aldose reductase
Sorbitol dehydrogenase
Diabetic cataract
Galactitol
Sorbitol pathway

## arabic_label
مسار البوليول وتراكم السوربيتول

## arabic_aliases
اختزال الألدوز
إعتام عدسة العين السكري

## definition
Aldose reductase reduces glucose to sorbitol using NADPH, and sorbitol dehydrogenase then oxidises sorbitol to fructose. The enzyme has a high Km, so it handles significant amounts of glucose only when glucose is high, and it operates in tissues whose glucose uptake is insulin-independent: lens, retina, kidney, Schwann cells and peripheral nerve. Those tissues cannot protect themselves by reducing uptake, so intracellular glucose rises with the plasma level. Sorbitol is polar and crosses membranes poorly, so it is trapped, accumulates, and draws water in osmotically; the pathway also consumes NADPH, weakening glutathione-dependent antioxidant defence. The result is cataract, retinopathy and peripheral neuropathy in poorly controlled diabetes. The same enzyme forms galactitol in galactosaemia, which is why cataract is prominent there too.

## explicit_objective
Name the enzymes of the polyol pathway and explain why sorbitol accumulation damages the lens and the peripheral nerve specifically.

## pitfalls
Thinking the damaged tissues are the ones taking up the most glucose. They are the ones that cannot regulate uptake at all, because they do not depend on insulin — that inability, not appetite, is what exposes them.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
endo

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
DIS-BIO-T03 | DIS-BIO-T07

## topic
Insulin and diabetes mellitus

## subtopic
Polyol pathway

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry

## article_ids
ART-103-BIO-DIABETES-MELLITUS

## related_article_ids
ART-103-BIO-HMP-PATHWAY-AND-G6PD

## related_concept_ids
CON-END-F0182CA8A56EA7 | CON-FND-B928DE79E08882 | CON-FND-5F0DC4407DEC51

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
KAU_Y1=0.6

## clinical_relevance
0.85

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.85

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p116-119 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[Question book, printed p111, q20] "One of the following enzymes is involved in the conversion of glucose to sorbitol: ... Aldose reductase"
[Department orientation, III- On biochemical basis explain, item 3] "Uncontrolled diabetes can cause cataract."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
conflicts: Searched the department biochemistry book (src_300847a5fa64809d6c07, 160 pages) in the cached page text for "sorbitol", "aldose reductase" and "polyol". The term does not appear anywhere in it, and that book has no diabetes chapter at all — its diabetes material is confined to the Blood Glucose section of the carbohydrate chapter, file pages 53 to 57. The department QUESTION book (src_07f0a0ff41addf826c7f) examines this material and the department orientation (src_90b75d63a73cfc7649b9) sets written questions on it. That is a gap between the department's own sources, recorded rather than resolved.

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "sorbitol", "aldose reductase" and "polyol" — nothing at all is returned, in any namespace.
moduleSubject: Written as "103 BMS > Biochemistry" and stopped there. The subject tree in docs/Kasr-Source-Imports/academic/103-BMS-structure.md was built from the department TEXTBOOK's contents page and that book has no diabetes chapter; the department QUESTION book has its own eleven-chapter structure and does. No node was invented and this concept was not filed under Carbohydrate Metabolism or Lipid Metabolism to make it fit. A path that stops matching partway resolves to nothing, so stopping at the subject is the only honest option available. This is a decision owed to a faculty reviewer: either the tree gains a node the textbook does not name, or these items stay at subject level.
relationships: Walked the ten live concepts on DIS-BIO-T03 taught by ART-END-TOP-8B80E93DAE and the 46 concepts already authored for 103 BMS. Loose neighbours are in related_concept_ids. No typed edges are written — this lane authors no relations file — and the causes edges from insulin deficiency to each complication are owed.

---

# Item

## label
Wet skin means hypoglycaemia and dry skin means a hyperglycaemic coma, and the two hyperglycaemic comas differ by whether the problem is acid or water

## id
CON-END-68CC8CA610DF37

## canonical_key
diabetes.acute-comas.hypoglycaemic-ketoacidotic-hyperosmolar

## aliases
Hypoglycaemic coma
Diabetic ketoacidosis
DKA
Hyperosmolar coma
Hyperglycaemic hyperosmolar state
Diabetic coma
Kussmaul breathing
Hypoglycaemia

## arabic_label
الغيبوبة السكرية: نقص السكر والحماض الكيتوني وفرط الأسمولية

## arabic_aliases
الحماض الكيتوني السكري
غيبوبة فرط الأسمولية

## definition
Three acute crises must be told apart. Hypoglycaemia provokes a sympatho-adrenal discharge, so the skin is wet and cool with tremor, tachycardia, hunger and confusion, and it develops over minutes; the department book gives the normal fasting range as 70 to under 100 mg/dL and notes that a fall below about 45 to 50 mg/dL may be fatal. Diabetic ketoacidosis develops over hours to days in absolute insulin deficiency: unrestrained lipolysis and ketogenesis produce an acidosis, with Kussmaul breathing, ketonuria, a fruity breath, and dry skin from the osmotic diuresis. Hyperosmolar coma occurs with extreme hyperglycaemia and enough residual insulin to prevent ketosis; consciousness is depressed by hyperosmolarity and cellular dehydration rather than by acid, and the skin is dry.

## explicit_objective
Distinguish the three acute diabetic comas on skin, breathing, ketones, speed of onset and the mechanism that depresses consciousness.

## pitfalls
Expecting a sweating, clammy patient to be hyperglycaemic. Sweating belongs to hypoglycaemia, because it is part of the adrenaline response; both hyperglycaemic comas dehydrate the patient through an osmotic diuresis and leave the skin dry, which is the sign the department asks students to explain on a biochemical basis.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
endo

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
DIS-BIO-T03 | DIS-BIO-T07

## topic
Insulin and diabetes mellitus

## subtopic
Acute complications of diabetes mellitus

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry

## article_ids
ART-103-BIO-DIABETES-MELLITUS

## related_article_ids
ART-103-BIO-KETOSIS | ART-END-TOP-8B80E93DAE

## related_concept_ids
CON-END-CC450A236ABF50 | CON-END-85750744126501 | CON-END-3EA6071BAE8130

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
0.75

## exam_weight_by_year
KAU_Y1=0.75

## clinical_relevance
0.95

## academic_relevance
0.8

## weight_confidence
0.45

## confidence
0.85

## exam_signal
src_07f0a0ff41addf826c7f | end_of_module | 2026 | p116-119 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"It is the drop of blood glucose level below the normal fasting levels. The marked drop of blood glucose (below 45-50 mg/dL) may be fatal."
[Department orientation, IV- Compare, items 2-3] "Hypoglycemic and hyperglycemic coma." / "DKA and hyperosmolar coma."
[Department orientation, III- On biochemical basis explain, item 4] "Diabetic ketoacidosis is manifested by dry skin."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
conflicts: Searched the department biochemistry book (src_300847a5fa64809d6c07, 160 pages) in the cached page text for "ketoacidosis", "DKA" and "hyperosmolar". The term does not appear anywhere in it, and that book has no diabetes chapter at all — its diabetes material is confined to the Blood Glucose section of the carbohydrate chapter, file pages 53 to 57. The department QUESTION book (src_07f0a0ff41addf826c7f) examines this material and the department orientation (src_90b75d63a73cfc7649b9) sets written questions on it. That is a gap between the department's own sources, recorded rather than resolved.

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "ketoacidosis", "hyperosmolar" and "coma" — no candidate record exists.
moduleSubject: Written as "103 BMS > Biochemistry" and stopped there. The subject tree in docs/Kasr-Source-Imports/academic/103-BMS-structure.md was built from the department TEXTBOOK's contents page and that book has no diabetes chapter; the department QUESTION book has its own eleven-chapter structure and does. No node was invented and this concept was not filed under Carbohydrate Metabolism or Lipid Metabolism to make it fit. A path that stops matching partway resolves to nothing, so stopping at the subject is the only honest option available. This is a decision owed to a faculty reviewer: either the tree gains a node the textbook does not name, or these items stay at subject level.
relationships: Walked the ten live concepts on DIS-BIO-T03 taught by ART-END-TOP-8B80E93DAE and the 46 concepts already authored for 103 BMS. Loose neighbours are in related_concept_ids. No typed edges are written — this lane authors no relations file — and the causes edges from insulin deficiency to each complication are owed.

---

# Item

## label
The feed-starve cycle has four stages and each runs on a different fuel: dietary glucose, then hepatic glycogen, then fatty acids, then ketone bodies

## id
CON-FND-85583A59349A47

## canonical_key
metabolism.feed-starve-cycle.four-stages-and-fuels

## aliases
Feed-starve cycle
Metabolic integration
Well-fed state
Early fasting state
Late fasting state
Starvation state
Metabolism in starvation

## arabic_label
دورة الشبع والصيام ووقود كل مرحلة

## arabic_aliases
التكامل الأيضي
حالة الصيام المتأخر

## definition
The department book divides the feed-starve cycle into four stages. In the well-fed state, 0 to 4 hours, the main fuel is glucose from the meal and insulin predominates; liver, muscle and adipose tissue all take glucose up and store the surplus. In early fasting, 4 to 18 hours, insulin falls and glucagon rises, and blood glucose is supplied mainly by hepatic glycogenolysis. In late fasting, 18 to 48 hours, glycogen is significantly depleted, anti-insulin hormones predominate, gluconeogenesis maintains blood glucose, and the body switches to fat-burning, so the main fuel is fatty acids from adipose lipolysis. In starvation, beyond 48 hours, the liver makes large amounts of ketone bodies; after 2 to 5 days the brain takes about a third of its energy from them and after several weeks they are its major fuel. Muscle glycogenolysis cannot contribute directly to plasma glucose, and the brain is never affected by falling insulin because its uptake is insulin-independent.

## explicit_objective
Name the main fuel, the dominant hormone and the source of blood glucose at each of the four stages, and place a stated number of hours into the right stage.

## pitfalls
Believing that fatty acids supply carbon for gluconeogenesis. Acetyl-CoA can never become glucose, because pyruvate dehydrogenase is irreversible; fatty acid oxidation supports gluconeogenesis energetically by supplying ATP, and the only gluconeogenic parts of a fat molecule are the glycerol backbone and the propionyl-CoA of an odd-chain fatty acid.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T03 | DIS-BIO-T04

## topic
Metabolic integration

## subtopic
Feed-starve cycle

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolic Integrations

## article_ids
ART-103-BIO-FEED-STARVE-CYCLE

## related_article_ids
ART-103-BIO-KETONE-BODY-METABOLISM | ART-103-BIO-FATTY-ACID-OXIDATION | ART-103-BIO-LIPOGENESIS-AND-DEPOT-FAT

## related_concept_ids
CON-END-2E748A37DA660A | CON-FND-1B027502822320 | CON-FND-1C668119B3C0BB | CON-END-CC450A236ABF50

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
0.15

## exam_weight_by_year
KAU_Y1=0.15

## clinical_relevance
0.45

## academic_relevance
0.75

## weight_confidence
0.15

## confidence
0.95

## exam_signal
src_07f0a0ff41addf826c7f | cancelled_topic | 2026 | p135-136 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"In this phase the main fuel source is glucose supplied mainly by hepatic glycogenolysis, and the predominant hormones is glucagon"
"In this phase the main fuel source is fatty acids supplied mainly by adipose tissue lipolysis, and the predominant hormones are anti-insulin hormones (mainly glucagon and catecholamines)"
"After several weeks of starvation: Ketone bodies become the major fuel of the brain."
"Muscle glycogenolysis cannot contribute directly to plasma glucose and occurs mainly during exercise not fasting"

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "feed-starve", "starvation" and "fasting state" — no candidate record covers the staged cycle.
exclusionReason: Not excluded, but flagged. Row 10 of the Biochemistry department's cancelled-items table in src_90b75d63a73cfc7649b9 reads "Metabolic integration — 109-114", cancelled from BOTH the end-of-module and the final exam, and those printed pages are exactly this chapter of the department book. The concept is kept because a cancelled topic still appears in the question book and a student may still meet it, but blueprintWeight, examWeightByYear and weightConfidence are all written low and do not claim the material is examined.
relationships: Walked the ten live concepts on DIS-BIO-T03 taught by ART-END-TOP-8B80E93DAE and the 46 concepts already authored for 103 BMS. Loose neighbours are in related_concept_ids. No typed edges are written — this lane authors no relations file — and the causes edges from insulin deficiency to each complication are owed.

---

# Item

## label
Alanine is the major glucogenic amino acid because the glucose-alanine cycle moves carbon and waste nitrogen out of muscle in one carrier

## id
CON-FND-1B027502822320

## canonical_key
metabolism.starvation.glucose-alanine-cycle

## aliases
Glucose-alanine cycle
Alanine
Glucogenic amino acids
Protein sparing in starvation
Cori cycle
Gluconeogenesis from amino acids

## arabic_label
دورة الجلوكوز والألانين

## arabic_aliases
الأحماض الأمينية المولدة للجلوكوز
الحفاظ على البروتين أثناء الصيام

## definition
In fasting, muscle protein is broken down and the amino groups released are transferred by transamination onto pyruvate from glycolysis, forming alanine. Alanine travels to the liver, where it is transaminated back to pyruvate and rebuilt into glucose while its nitrogen enters the urea cycle — so one carrier performs two jobs at once, exporting gluconeogenic carbon and disposing of waste nitrogen without releasing free ammonia into the blood. That dual role is why alanine dominates among the glucogenic amino acids. Lactate returns from muscle and red cells by the parallel Cori cycle. Gluconeogenesis from protein is deliberately restrained during prolonged starvation, because the brain's switch to ketone bodies reduces the demand for glucose; once the triacylglycerol stores are exhausted the only remaining fuel is protein, degradation accelerates, and death follows from organ failure.

## explicit_objective
Name the major glucogenic amino acid of fasting, describe the two jobs the glucose-alanine cycle performs, and explain what determines survival time in starvation.

## pitfalls
Believing that muscle converts amino acids into blood glucose. Muscle has no glucose-6-phosphatase and cannot release free glucose at all; it exports alanine, and the conversion to glucose happens in the liver. The other error is treating lysine or leucine as glucogenic — they are the only two purely ketogenic amino acids.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
DIS-BIO-T03 | DIS-BIO-T04

## topic
Metabolic integration

## subtopic
Glucose-alanine cycle

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Metabolic Integrations

## article_ids
ART-103-BIO-FEED-STARVE-CYCLE

## related_article_ids
ART-103-BIO-NITROGEN-BALANCE | ART-103-BIO-KETONE-BODY-METABOLISM

## related_concept_ids
CON-FND-85583A59349A47 | CON-FND-B320D24EC35D30 | CON-END-2E748A37DA660A

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
0.15

## exam_weight_by_year
KAU_Y1=0.15

## clinical_relevance
0.4

## academic_relevance
0.75

## weight_confidence
0.15

## confidence
0.9

## exam_signal
src_07f0a0ff41addf826c7f | cancelled_topic | 2026 | p135-136 | 103 BMS

## atomic_claim_ids
[clear]

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
"Also, the amino acids released from muscles (especially alanine) are utilized as substrates for gluconeogenesis in the liver (glucose – alanine cycle)."
"Pyruvate is transaminated to alanine → liver (glucose alanine cycle)"
"After depletion of TAGs stores, the only source of fuel remains is proteins."

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
[clear]

## evidence_gaps
Evidence must be attached before publication: no atomic claim or citation exists for this concept yet.

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
drafted_not_reviewed

## exclusion_reason

## field_notes
microtopicId: The canonical tree has no node finer than the DIS-BIO-T04/T03/T07 subtopics, and the department book's own section name is carried by module_subject instead.
nanotopicId: No nanotopic level exists anywhere under DIS-BIO; inventing one would place this concept where nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the sources are cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the department question book and the department textbook; this concept has no corpus extraction record of its own.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
atomicClaimIds: Written [clear] — considered and none attached. Every claim in docs/Kasr-Source-Imports/evidence/103-BMS-biochemistry-claims.md was checked and none asserts this concept; they were authored for the eleven concepts taken from the 2025 end-of-year paper. This lane was scoped to three files (question, concept, article) and mints no claim or citation IDs, so the evidence chain for this concept is owed and is named in the hand-off report. This is a known audit failure to be closed by the lead, not an omission.
sourceCandidateIds: Searched the corpus for "alanine", "glucose-alanine" and "glucogenic" — no candidate record exists.
exclusionReason: Not excluded, but flagged. Row 10 of the Biochemistry department's cancelled-items table in src_90b75d63a73cfc7649b9 reads "Metabolic integration — 109-114", cancelled from BOTH the end-of-module and the final exam, and those printed pages are exactly this chapter of the department book. The concept is kept because a cancelled topic still appears in the question book and a student may still meet it, but blueprintWeight, examWeightByYear and weightConfidence are all written low and do not claim the material is examined.
relationships: Walked the ten live concepts on DIS-BIO-T03 taught by ART-END-TOP-8B80E93DAE and the 46 concepts already authored for 103 BMS. Loose neighbours are in related_concept_ids. No typed edges are written — this lane authors no relations file — and the causes edges from insulin deficiency to each complication are owed.
