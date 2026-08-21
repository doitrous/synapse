<!--
  Concepts for 103 BMS · Biochemistry, from Section 1 of the 2025 end-of-year paper.

    EOY (BMS - 103) 199 (2).pdf — src_37f6c0daf3436096af19, Section 1: Biochemistry,
    pages 1–8. Four question groups: I Enumerate (five items, two to be answered),
    II Diagrams (three), III Cases (three), IV Extended matching (ten vitamins
    against twelve functions). Solved twin src_a2e23ffc50b6b2e24897.

  Twenty-three new concepts and five updates to concepts that already exist in live
  state. Every medical statement comes from `Dpt book Biochemistry 103.pdf`
  (src_300847a5fa64809d6c07). The exam paper says what was asked; the book says what
  is true, and only the book is cited as evidence.

  ── The five updates, and why they are updates ──────────────────────────────
  Searching by short distinctive words turned up live records that already state
  four of the ideas this section examines. Per 00-START-HERE §4 they are updated in
  place, with their live `## id` copied verbatim from find-existing.mjs:

    CON-HEM-A1EF4D20C85878  G6PD and NADPH               ← Diagram (1) b
    CON-HEM-4F64967BBFBB6F  G6PD deficiency and haemolysis ← Diagram (1) c and d
    CON-HEM-F2B664C215C912  haemolytic anaemia and jaundice ← Case (3) c, first row
    CON-REN-31708150F8B722  tophaceous gout               ← Case (2) a
    CON-REN-E5BAEF03791C8F  allopurinol lowers uric acid  ← Case (2) d

  All five are pipeline extractions with an empty `moduleIds`, no alias, no pitfall
  and a generic objective. Attaching the module, the Kasr subject path, the exam
  signal and the examiner's own wording is real new information, which is why these
  are worth updating rather than leaving alone. Validate them with
  `npm run medical:simulate` — `medical:batch` judges every record as new and will
  report a missing objective and a missing Arabic label for each of the five. That is
  the documented false alarm, not a defect in this file.

  ── The ROS tension ─────────────────────────────────────────────────────────
  Question I-1 asks for substances that protect against ROS, while the Biochemistry
  department's own orientation cancels "(Groups -Generation) of ROS — 11 &12" from
  both the end-of-module and the final exam. These do not collide. The cancelled
  item is the taxonomy of radicals and non-radicals and the four generation routes,
  printed on pages 11 and 12. What the paper asks for is on page 13, under
  "Mechanisms of combating free radicals", which the orientation does not cancel;
  and the same orientation lists "Fate of Hydrogen Peroxide (12/36)" among the
  twenty-two diagrams to be studied, so the one diagram on the cancelled page is
  explicitly examinable. The cancellation is of an item, not of a page range.
  Recorded per concept under `exclusionReason` in `field_notes`.

  ── The drug question ───────────────────────────────────────────────────────
  Case (2) d asks which drugs lower blood uric acid and how. Two concepts carry it —
  CON-REN-E5BAEF03791C8F (allopurinol, updated) and CON-REN-38B4BED80BC671
  (uricosuric drugs, new) — and CON-FND-81A4F3A9C51B7B carries the treatment of PKU.
  All three are `publication_status: needs_evidence` and their claims are named for
  the claims agent to write with `risk_class: treatment_or_action`. The class and
  mechanism are taken from the department book and nowhere else. The book names
  allopurinol and no other urate-lowering drug: its third heading is the bare
  "Drugs increasing the excretion of uric acid (Uricosuric drugs)" with no member
  named, so no member is supplied here. No brand name appears anywhere in this file,
  because local availability in Egypt could not be verified from any source in the
  corpus.

  Weights are inferred from a single sitting, so `weight_confidence` is 0.25–0.35
  throughout. One paper is weak evidence and the numbers say so.

  Import: Admin › Concepts › Import, with "Update matching items" on.
-->

# Item

## label
The body meets reactive oxygen species with scavenger enzymes and with metabolic end products that are themselves antioxidants

## id
CON-FND-5F0DC4407DEC51

## canonical_key
bioenergetics.ros.antioxidant-defences

## aliases
Substances that protect against ROS
Mechanisms of combating free radicals
Antioxidant defence
Scavenger antioxidants
Bilirubin and uric acid as antioxidants
Superoxide dismutase

## arabic_label
مضادات الأكسدة التي تحمي من أنواع الأكسجين التفاعلية

## arabic_aliases
آليات مقاومة الشوارد الحرة
إنزيم ديسميوتاز الفائق أكسيد
البيليروبين وحمض البوليك كمضادات أكسدة

## definition
The body combats free radicals in two ways. It prevents their generation, by chelating copper and iron on ceruloplasmin, transferrin and albumin, and by the enzymes catalase, peroxidases and glutathione peroxidase. It also scavenges the ROS already present, using vitamins C, E, provitamin A and B6; the enzyme superoxide dismutase, which is widely distributed in tissues; thiol-containing proteins and cysteine itself; and two metabolic end products, bilirubin and uric acid, which act as antioxidants and are oxidised to biliverdin and allantoin respectively.

## explicit_objective
Name one antioxidant enzyme and one metabolic end product that protects against reactive oxygen species, and state what each is oxidised to or what reaction it runs.

## pitfalls
Answering "vitamin C" when the question asks for an enzyme, or "glutathione" when it asks for a metabolic end product. The paper asks for one of each. The metabolic end products the book names are only two — bilirubin and uric acid — and both are waste products that happen to be useful, not molecules made for the purpose. Students who have learnt bilirubin as nothing but a marker of jaundice never think of it here.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
SYS-FND-T06 | DIS-BIO-T08

## topic
Biomolecules

## subtopic
Bioenergetics

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Reactive Oxygen Species (ROS)

## article_ids
ART-103-BIO-ROS-ANTIOXIDANT-DEFENCE

## related_article_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## related_concept_ids
CON-FND-D8A41B5C23B148 | CON-FND-B928DE79E08882 | CON-HEM-4F64967BBFBB6F | CON-RES-6F7E169B8BE108

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
kau

## blueprint_weight
0.5

## exam_weight_by_year
KAU_Y1=0.5

## clinical_relevance
0.45

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p1 | 103 BMS

## atomic_claim_ids
CLM-FND-ROS-ANTIOXIDANT-DEFENCE-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
[Biochemistry I-1, 2 marks] Substance that can protect against ROS (one enzyme & one metabolic end product).
"Metabolic end-products: bilirubin and uric acid function as antioxidants. They are oxidized into biliverdin and allantoin respectively."

## merge_ids

## rejected_merge_candidate_ids
CON-RES-6F7E169B8BE108

## conflicts

## uncertainty
The book lists catalase, peroxidases and glutathione peroxidase under "prevention of generation" and superoxide dismutase under "scavengers", which is a division by mechanism rather than by chemistry, and it does not say which side of the line a marker expects. Either answer names an enzyme the book prints, so both should score.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The book's own section, "Mechanisms of combating free radicals", is carried by module_subject; the canonical tree has no node finer than DIS-BIO-T01 to hold it.
nanotopicId: No nanotopic exists below the microtopic level for bioenergetics, and inventing one would place this concept somewhere nothing else lives.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the exam paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "ROS", "antioxidant", "superoxide" and "catalase" — only CON-RES-6F7E169B8BE108 on acetylcysteine came back, and it is a drug record, not a candidate for this idea.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Checked against the Biochemistry department's "Cancelled items for end of module and final exams". The cancelled row is "(Groups -Generation) of ROS — 11 &12", which is the radical/non-radical taxonomy and the four generation routes. This concept is "Mechanisms of combating free radicals" on page 13, which is not cancelled, and the paper set it.
rejectedMergeCandidateIds: CON-RES-6F7E169B8BE108 states that acetylcysteine has an antioxidant effect. Not merged — that record is about one drug used therapeutically, while this one enumerates the body's own defences; a question could test either without the other.
relationships: Walked the 84 concepts under DIS-BIO and the 6 under SYS-FND-T06. Nothing there enumerates antioxidant defences; the nearest live records are acetylcysteine (respiratory) and the glutathione transport concepts under DIS-BIO-T05. Four loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file, and the mechanism_step_before edge from this concept to the hydrogen-peroxide disposal concept is owed.

---

# Item

## label
Hydrogen peroxide is disposed of by catalase and by glutathione peroxidase, and the glutathione route runs on NADPH

## id
CON-FND-D8A41B5C23B148

## canonical_key
bioenergetics.hydrogen-peroxide.catalase-glutathione-peroxidase

## aliases
Fate of hydrogen peroxide
Fate of H2O2
Glutathione peroxidase and glutathione reductase
Catalase
Selenium and glutathione peroxidase

## arabic_label
مصير بيروكسيد الهيدروجين

## arabic_aliases
إنزيم بيروكسيديز الجلوتاثيون
إنزيم الكاتالاز

## definition
Hydrogen peroxide is a normal metabolite, produced either by flavoprotein oxidases or by the superoxide dismutase reaction. It is removed by two routes. Catalase splits it into water and oxygen. Glutathione peroxidase, a selenium enzyme, reduces it to two molecules of water while oxidising two reduced glutathione (G–SH) to the disulphide G-S–S-G; glutathione reductase, an FAD enzyme, then reduces that disulphide back to G–SH using NADPH+H⁺. The peroxide is therefore only disposed of for as long as NADPH keeps arriving.

## explicit_objective
Label the two enzymes on the "Fate of H₂O₂" diagram, and explain why the glutathione arm of it stops working when NADPH runs short.

## pitfalls
Naming glutathione reductase as the enzyme that removes the peroxide. It does not touch hydrogen peroxide at all — glutathione peroxidase does that, and reductase only regenerates the reduced glutathione afterwards. Getting the two the wrong way round on the diagram is the commonest way to lose both label marks.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
DIS-BIO-T03 | SYS-FND-T06

## topic
Biomolecules

## subtopic
Bioenergetics

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Bioenergetics > Reactive Oxygen Species (ROS)
103 BMS > Biochemistry > Carbohydrate Metabolism > Hexose Monophosphate Pathway (HMP) / Pentose Phosphate Pathway (PPP)

## article_ids
ART-103-BIO-ROS-ANTIOXIDANT-DEFENCE

## related_article_ids
ART-103-BIO-HMP-PATHWAY-AND-G6PD

## related_concept_ids
CON-FND-5F0DC4407DEC51 | CON-FND-B928DE79E08882 | CON-HEM-A1EF4D20C85878 | CON-HEM-4F64967BBFBB6F

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids

## approved_video_resource_ids

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
0.95

## weight_confidence
0.35

## confidence
0.95

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p2 | 103 BMS

## atomic_claim_ids
CLM-FND-H2O2-DISPOSAL-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
[Biochemistry II, Diagram (1) {Fate of H₂O₂}, labels 1 and 2, 0.5 marks each]
"Hydrogen peroxide is metabolized in more physiological fashion by catalase and peroxidases e.g. glutathione peroxidase."

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
The book prints the same diagram twice, on page 12 under bioenergetics and again on page 36 under the HMP pathway, and the two copies differ: the page 12 version shows the catalase branch and the page 36 version does not. Which version a marker has in mind for the two label marks is a local convention rather than a settled question, and the department's diagram list cites both pages.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The book's own section title, "Fate of Hydrogen Peroxide", is carried by module_subject; the canonical tree has no node finer than DIS-BIO-T01 to hold it.
nanotopicId: No nanotopic exists below the microtopic level for bioenergetics.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the exam paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "H2O2", "peroxide", "catalase" and "glutathione" — the four glutathione hits are about acetylcysteine and about intestinal amino-acid transport, and none is a candidate for this idea.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. The Biochemistry orientation lists "Fate of Hydrogen Peroxide (12/36)" among the twenty-two "Diagrams to be studied", so this diagram is named as examinable even though the cancelled ROS item shares page 12 with it.
rejectedMergeCandidateIds: Nothing in live state states the fate of hydrogen peroxide; "peroxide" and "catalase" both return no existing record.
relationships: Walked the 84 concepts under DIS-BIO. The HMP and G6PD records are the only genuine neighbours and are in related_concept_ids. No typed edges are written — this batch authors no relations file. The prerequisite_of edge from CON-FND-B928DE79E08882 (HMP supplies the NADPH) to this concept is owed.

---

# Item

## label
Three irreversible steps make citrate synthase, isocitrate dehydrogenase and α-ketoglutarate dehydrogenase the key enzymes of the Krebs cycle

## id
CON-FND-037BF052DDFC0D

## canonical_key
krebs.regulation.key-enzymes

## aliases
Key enzymes for Krebs cycle
Rate-controlling enzymes of the citric acid cycle
Regulation of the TCA cycle
Citrate synthase
Isocitrate dehydrogenase
Alpha-ketoglutarate dehydrogenase

## arabic_label
الإنزيمات المفتاحية لدورة كريبس

## arabic_aliases
الإنزيمات المنظمة لدورة حمض الستريك
إنزيم سينثاز الستريت

## definition
The citric acid cycle has three irreversible steps, catalysed by citrate synthase, isocitrate dehydrogenase and α-ketoglutarate dehydrogenase. These are the rate-controlling key enzymes of the cycle. All three are inhibited by a high ATP/ADP ratio; the two dehydrogenases are also inhibited by a high NADH/NAD⁺ ratio, which is why the cycle runs only when the electron transport chain is reoxidising NADH. Succinyl-CoA feeds back on citrate synthase and α-ketoglutarate dehydrogenase, and calcium released during muscle contraction activates all three.

## explicit_objective
Name the three key enzymes of the Krebs cycle and state, for each regulator the book gives, whether it turns the cycle up or down.

## pitfalls
Listing every enzyme of the cycle, or naming succinate dehydrogenase because it is the memorable one that sits in the inner membrane. The question asks for key enzymes, and "key" here means rate-controlling: exactly the three that catalyse the irreversible steps. Aconitase and the rest are not regulatory.

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
DIS-BIO-T02 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Citric acid cycle

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Citric acid cycle

## article_ids
ART-103-BIO-TCA-KEY-ENZYMES

## related_article_ids
ART-103-BIO-KETOSIS

## related_concept_ids
CON-MSK-75C26AA26AB152 | CON-END-CC450A236ABF50 | CON-FND-B928DE79E08882

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
kau

## blueprint_weight
0.55

## exam_weight_by_year
KAU_Y1=0.55

## clinical_relevance
0.2

## academic_relevance
0.95

## weight_confidence
0.3

## confidence
0.95

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p1 | 103 BMS

## atomic_claim_ids
CLM-FND-KREBS-KEY-ENZYMES-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
[Biochemistry I-2, 2 marks] Key enzymes for Krebs Cycle.
"In the Krebs' cycle there are three irreversible steps. They are catalyzed by citrate synthase, isocitrate dehydrogenase and α-ketoglutarate dehydrogenase, which are the rate-controlling key enzymes of the cycle."

## merge_ids

## rejected_merge_candidate_ids
CON-MSK-75C26AA26AB152

## conflicts

## uncertainty
The book's own regulation diagram marks ADP and calcium as activators of citrate synthase, while its prose gives the ATP/ADP ratio rather than ADP alone. Whether a marker wants "low ATP/ADP" or "ADP" as the activator is not settled by the text.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The Citric acid cycle chapter of the department book prints no section headings at all, so there is no finer curriculum level to record; module_subject stops at the chapter deliberately.
nanotopicId: No nanotopic exists below the microtopic level for this chapter.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the exam paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "krebs", "citric", "TCA" and "isocitrate" — the only hit is CON-MSK-75C26AA26AB152 on calcium activating PDH and the TCA cycle, which is a muscle-exercise record, not a candidate for this idea.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. No row of the Biochemistry department's cancelled-items table names the citric acid cycle, and the final exam covers "All chapters from Bioenergetics to vitamins".
rejectedMergeCandidateIds: CON-MSK-75C26AA26AB152 states that calcium activates phosphorylase kinase, PDH and the TCA cycle. Not merged — that record's objective is about fuel supply during exercise and it names no cycle enzyme; this one is the identity and regulation of the three key enzymes.
relationships: Walked the 25 concepts under DIS-BIO-T03. They are almost all insulin and exercise records extracted from other books; none names a cycle enzyme. Three loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file.

---

# Item

## label
The hexose monophosphate pathway is the main source of NADPH, and its oxidative phase is irreversible

## id
CON-FND-B928DE79E08882

## canonical_key
hmp.nadph.main-source

## aliases
Main source of NADPH
Hexose monophosphate pathway
Pentose phosphate pathway
HMP
PPP
Importance of HMP pathway

## arabic_label
مسار أحادي فوسفات الهكسوز كمصدر رئيسي للنادفH

## arabic_aliases
مسار فوسفات البنتوز
أهمية مسار أحادي فوسفات الهكسوز

## definition
The pentose phosphate pathway is a second route for oxidising glucose, running in the cytosol of liver, thyroid, adrenal cortex, adipose tissue, gonads, retina, lactating mammary gland and red cells. Its oxidative phase is irreversible: glucose 6-phosphate is dehydrogenated and decarboxylated to ribose 5-phosphate, yielding NADPH+H⁺ at two steps. It is the main source of NADPH, which fatty acid synthesis, steroid synthesis, vision, NADPH oxidase and the regeneration of reduced glutathione all depend on; it also supplies the ribose 5-phosphate for nucleotides and nucleic acids.

## explicit_objective
Name the pathway that supplies most of the body's NADPH, state its two products, and list the reactions that consume the NADPH it makes.

## pitfalls
Confusing NADPH with NADH. NADH is the electron-transport-chain currency made by glycolysis and the Krebs cycle; NADPH is the reducing power for biosynthesis and for keeping glutathione reduced, and the HMP pathway is where it comes from. A student who writes "glycolysis" as the source of NADPH loses the mark and then cannot explain favism.

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
DIS-BIO-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Hexose Monophosphate Pathway

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Hexose Monophosphate Pathway (HMP) / Pentose Phosphate Pathway (PPP)

## article_ids
ART-103-BIO-HMP-PATHWAY-AND-G6PD

## related_article_ids
ART-103-BIO-ROS-ANTIOXIDANT-DEFENCE

## related_concept_ids
CON-HEM-A1EF4D20C85878 | CON-HEM-4F64967BBFBB6F | CON-FND-D8A41B5C23B148 | CON-HEM-095C9C97B56CCA

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids

## approved_video_resource_ids

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
0.95

## weight_confidence
0.35

## confidence
0.95

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p2 | 103 BMS

## atomic_claim_ids
CLM-FND-HMP-NADPH-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
[Biochemistry II, Diagram (1) a, 1 mark] Mention the main source of NADPH+H⁺.
"It is the main source of NADPH, which is required for the reaction of many reductases and hydroxylases catalyzing several important biochemical reactions"

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
The book calls the pathway "another route for glucose oxidation" and gives no figure for the fraction of glucose that takes it, or for how much of total body NADPH it supplies, so "main source" is a qualitative claim in this source and is not quantified here.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry reference has been attached.

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
microtopicId: The book's own chapter section is already the value of module_subject; the canonical tree has no node finer than DIS-BIO-T03.
nanotopicId: No nanotopic exists below the microtopic level for carbohydrate metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the exam paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "pentose", "NADPH", "HMP" and "G6PD" — the NADPH and G6PD hits are the two live G6PD concepts, which this batch updates rather than duplicates, and no candidate record exists for the pathway itself.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. The cancelled-items table cancels the Uronic Acid Pathway on page 38, which is the chapter section immediately after this one, but not the HMP pathway itself.
rejectedMergeCandidateIds: Nothing in live state states what the HMP pathway is or does; "pentose" returns no existing record.
relationships: Walked the 25 concepts under DIS-BIO-T03 and the two live G6PD records under SYS-HEM-T02. The G6PD pair are the genuine neighbours and are in related_concept_ids. No typed edges are written — this batch authors no relations file, and the part_of edge from CON-HEM-A1EF4D20C85878 to this concept is owed.
