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

---

<!--
  UPDATE. Live record, id copied verbatim from find-existing.mjs. Only the fields
  below are being changed; every key omitted here keeps its live value. Validate
  with medical:simulate and expect created: 0, updated: 1.
-->

# Item

## id
CON-HEM-A1EF4D20C85878

## label
G6PD catalyzes an initial glucose-oxidation pathway step that generates NADPH

## definition
Glucose 6-phosphate dehydrogenase (G6PD) catalyses the first and rate-limiting step of the oxidative phase of the hexose monophosphate pathway, dehydrogenating glucose 6-phosphate to 6-phosphogluconolactone and generating the first NADPH+H⁺. It is the key enzyme of that pathway. NADPH is a feedback inhibitor of it, and insulin induces its synthesis.

## explicit_objective
Name the key enzyme of the pathway that supplies NADPH, and state where in the pathway it acts and what regulates it.

## aliases
Glucose 6-phosphate dehydrogenase
G6PD
Key enzyme of the HMP pathway
G-6-phosphate dehydrogenase
Key enzyme of the pentose phosphate pathway

## arabic_label
إنزيم نازعة هيدروجين الجلوكوز-6-فوسفات

## arabic_aliases
الإنزيم المفتاحي لمسار أحادي فوسفات الهكسوز

## pitfalls
Naming 6-phosphogluconate dehydrogenase as the key enzyme because it is the step that releases the CO₂. G6PD is the first step and the regulated one, and it is the step blocked in favism.

## concept_type
mechanism

## subject
haem

## secondary_node_ids
DIS-BIO-T03 | SYS-FND-T06

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Hexose Monophosphate Pathway (HMP) / Pentose Phosphate Pathway (PPP)

## article_ids
ART-HEM-TOP-B697DE3AAD | ART-103-BIO-HMP-PATHWAY-AND-G6PD

## related_concept_ids
CON-FND-B928DE79E08882 | CON-HEM-4F64967BBFBB6F | CON-FND-D8A41B5C23B148

## resource_ids
src_f92622aebf5fd2f72b11 | src_300847a5fa64809d6c07

## atomic_claim_ids
CLM-HEM-A1EF4D20C85878 | CLM-HEM-G6PD-HMP-KEY-ENZYME-01

## learner_years
1

## universities
kau

## blueprint_weight
0.6

## exam_weight_by_year
KAU_Y1=0.6

## weight_confidence
0.3

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p2 | 103 BMS

## original_wording
[Biochemistry II, Diagram (1) b, 0.5 marks] Mention the key enzyme of this pathway.
"NADPH is a feedback inhibitor of glucose 6-phosphate dehydrogenase."

## field_notes
relationships: Updated rather than duplicated after "G6PD", "NADPH" and "pentose" each returned this record. Walked its two SYS-HEM-T02 siblings and the 25 concepts under DIS-BIO-T03; CON-HEM-4F64967BBFBB6F is the only typed neighbour and the causes edge from a deficiency of this enzyme to that haemolysis is owed to a relations file this batch does not author.

---

<!--
  UPDATE. Live record, id copied verbatim from find-existing.mjs.
-->

# Item

## id
CON-HEM-4F64967BBFBB6F

## label
G6PD deficiency increases RBC susceptibility to oxidant-induced hemolysis

## definition
Favism is a genetic deficiency of glucose 6-phosphate dehydrogenase and the commonest human enzymopathy. Red cells are already exposed to oxidative damage because they carry oxygen, and hydrogen peroxide peroxidises their membrane lipids and raises membrane fragility. Without G6PD there is too little NADPH for glutathione reductase to regenerate reduced glutathione, so glutathione peroxidase cannot clear the peroxide. Exposure to an oxidant — primaquine, aspirin, sulfonamides, or fava beans — then lyses the fragile cells, producing haemolytic anaemia and jaundice.

## explicit_objective
Explain, in the order the mechanism runs, how deficiency of G6PD leaves a red cell unable to survive an oxidant challenge, and name the trigger drugs and food the book gives.

## aliases
Favism
G6PD deficiency
Glucose 6-phosphate dehydrogenase deficiency
Fava bean haemolysis
Primaquine-induced haemolysis

## arabic_label
أنيميا الفول (نقص إنزيم نازعة هيدروجين الجلوكوز-6-فوسفات)

## arabic_aliases
نقص إنزيم G6PD
فقر الدم الانحلالي بعد تناول الفول

## pitfalls
Saying the red cell dies because it cannot make ATP. G6PD is not an ATP-producing step; the red cell's ATP comes from glycolysis, which is intact. What is lost is NADPH, and with it the ability to keep glutathione reduced — an antioxidant failure, not an energy failure.

## concept_type
mechanism

## subject
haem

## secondary_node_ids
DIS-BIO-T03 | SYS-FND-T02

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Hexose Monophosphate Pathway (HMP) / Pentose Phosphate Pathway (PPP)

## article_ids
ART-HEM-TOP-B697DE3AAD | ART-103-BIO-HMP-PATHWAY-AND-G6PD

## related_concept_ids
CON-HEM-A1EF4D20C85878 | CON-FND-B928DE79E08882 | CON-FND-D8A41B5C23B148 | CON-HEM-F2B664C215C912

## resource_ids
src_f92622aebf5fd2f72b11 | src_300847a5fa64809d6c07

## atomic_claim_ids
CLM-HEM-4F64967BBFBB6F | CLM-HEM-FAVISM-HAEMOLYSIS-01

## learner_years
1

## universities
kau

## blueprint_weight
0.75

## exam_weight_by_year
KAU_Y1=0.75

## weight_confidence
0.35

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p2 | 103 BMS

## uncertainty
The book says G6PD deficiency is "the most common human enzymopathy" but gives no prevalence figure, and none is supplied here. Favism is common enough in Egypt to matter clinically, and a local figure should be attached before this record is published rather than a Western one imported.

## original_wording
[Biochemistry II, Diagram (1) c, 0.5 marks] Name the disease in case of deficiency of this enzyme.
[Biochemistry II, Diagram (1) d, 2 marks] Explain how this disease named above can affect RBCs.
"The red cell capacity to protect itself from oxidative damage is markedly decreased due to decreased concentration of NADPH which is required by glutathione reductase for the regeneration of reduced glutathione (GSH) for removal of H2O2 (by glutathione peroxidase)."

## field_notes
relationships: Updated rather than duplicated after "G6PD", "hemolysis" and "favism" searches; "favism" returns nothing, but "G6PD" returns this record, which is why the short query mattered. Walked the SYS-HEM-T02 siblings — CON-HEM-F2B664C215C912, CON-HEM-CDF561308A4D25 and CON-HEM-2F0FB0B040A268 are all haemolysis records and are loose neighbours. The is_a edge to haemolytic anaemia and the causes edge from this to jaundice are owed to a relations file this batch does not author.

---

# Item

## label
Glycolysis is the only source of ATP in the red cell, because the red cell has no mitochondria

## id
CON-HEM-095C9C97B56CCA

## canonical_key
erythrocyte.glycolysis.only-atp-source

## aliases
Importance of glycolysis for RBCs
Importance of glycolysis in erythrocytes
Substrate level phosphorylation in red cells
Why red cells depend on glycolysis
Methaemoglobin and the glyceraldehyde 3-phosphate dehydrogenase step

## arabic_label
أهمية تحلل الجلوكوز لكرات الدم الحمراء

## arabic_aliases
مصدر الطاقة الوحيد في كرة الدم الحمراء
الفسفرة على مستوى الركيزة في كرات الدم الحمراء

## definition
Red cells have no mitochondria, so they cannot use the electron transport chain and glycolysis is their only source of ATP, produced by substrate-level phosphorylation. Glycolysis does a second job for them as well: the NADH+H⁺ made at the glyceraldehyde 3-phosphate dehydrogenase step keeps the iron of haemoglobin in the ferrous state, because ferric haem makes methaemoglobin, which cannot carry oxygen.

## explicit_objective
State the two reasons the book gives for why glycolysis matters to a red cell, and explain why a red cell cannot fall back on any other pathway for ATP.

## pitfalls
Answering only "for energy". The book gives two points and the mark scheme follows it: ATP by substrate-level phosphorylation, and NADH to keep haemoglobin iron ferrous. Leaving out the methaemoglobin half is the usual way to lose half of this mark.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
SYS-HEM-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## article_ids
ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT

## related_article_ids
ART-HEM-TOP-B697DE3AAD

## related_concept_ids
CON-HEM-7FBB4829A4A4EC | CON-HEM-6B557A065A8D90 | CON-HEM-864915F7ADB3AE | CON-MSK-CC13A748326880

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
kau

## blueprint_weight
0.6

## exam_weight_by_year
KAU_Y1=0.6

## clinical_relevance
0.5

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.95

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p3 | 103 BMS

## atomic_claim_ids
CLM-HEM-RBC-GLYCOLYSIS-ATP-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
[Biochemistry II, Diagram (2) b, 1 mark] Mention importance of glycolysis for RBCs.
"As RBCs lack mitochondria, glycolysis is the only source of ATP through substrate level phosphorylation."

## merge_ids

## rejected_merge_candidate_ids
CON-HEM-864915F7ADB3AE

## conflicts

## uncertainty
The book does not say how much of the red cell's glucose goes down glycolysis rather than into the HMP pathway or the BPG shunt, so the three cannot be weighted against each other from this source.

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
microtopicId: The book's own heading, "Importance in RBCs", sits inside Glycolysis and is carried by module_subject; the canonical tree has no node finer than DIS-BIO-T03.
nanotopicId: No nanotopic exists below the microtopic level for carbohydrate metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the exam paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "glycolysis", "erythrocyte", "substrate level" and "mitochondria" — the glycolysis hit is a muscle-exercise record and the erythrocyte hits are histology and blood-count records; no candidate exists for this idea.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. Glycolysis is not in the Biochemistry department's cancelled-items table, and "BPG Shunt in Red Blood Cells (26)" is one of the twenty-two diagrams named as examinable.
rejectedMergeCandidateIds: CON-HEM-864915F7ADB3AE states that the absence of erythrocyte nuclei and organelles leaves more room for haemoglobin. Not merged — it is a histology record whose objective is about structure and haemoglobin content; this one is about where the cell's ATP comes from as a consequence.
relationships: Walked the 122 concepts in the CON-HEM- namespace and the 25 under DIS-BIO-T03. The live haematology set is morphology, counts and anaemia classification; nothing states the metabolic consequence of having no mitochondria. Four loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file.

---

# Item

## label
The BPG shunt yields no net ATP because it bypasses the phosphoglycerate kinase step

## id
CON-HEM-7FBB4829A4A4EC

## canonical_key
erythrocyte.bpg-shunt.no-net-atp

## aliases
BPG shunt
Rapoport-Luebering shunt
2,3-bisphosphoglycerate mutase
Why RBCs make no net ATP from the BPG shunt
Bisphosphoglycerate shunt in red blood cells

## arabic_label
تحويلة ثنائي فوسفوجليسيرات في كرات الدم الحمراء

## arabic_aliases
تحويلة رابابورت-لوبرينج
عدم إنتاج ATP من تحويلة BPG

## definition
In the red cell, 2,3-bisphosphoglycerate mutase converts 1,3-bisphosphoglycerate into 2,3-bisphosphoglycerate, and 2,3-bisphosphoglycerate phosphatase then hydrolyses that to 3-phosphoglycerate. The shunt rejoins glycolysis below phosphoglycerate kinase, which is the step where glycolysis would have made ATP from 1,3-bisphosphoglycerate. Any molecule that takes the shunt therefore skips the site of ATP yield, and the cell gains no net ATP from it.

## explicit_objective
Using the BPG shunt diagram, explain why a red cell gains no net ATP from the shunt, naming the enzyme that is bypassed and the enzyme that starts the bypass.

## pitfalls
Saying the shunt consumes ATP. It does not — it makes none. The phosphatase step releases inorganic phosphate rather than transferring it to ADP, so the shunt is neutral, not costly. Naming pyruvate kinase as the bypassed enzyme is the other common error; the bypassed step is phosphoglycerate kinase, which is where the diagram's own ADP → ATP arrow sits.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
SYS-HEM-T01 | SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## article_ids
ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT

## related_article_ids
ART-HEM-TOP-B697DE3AAD

## related_concept_ids
CON-HEM-095C9C97B56CCA | CON-HEM-6B557A065A8D90

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
0.4

## academic_relevance
0.95

## weight_confidence
0.35

## confidence
0.95

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p3 | 103 BMS

## atomic_claim_ids
CLM-HEM-BPG-SHUNT-NO-ATP-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
[Biochemistry II, Diagram (2) a, 2 marks] Using the diagram, explain why RBCs don't produce any net ATP from this shunt.
"2,3-bisphosphoglycerate mutase catalyzes the conversion of 1,3-bisphosphoglycerate into 2,3-bisphosphoglycerate (2,3-BPG) bypassing the reaction catalyzed by phosphoglycerate kinase (site of ATP yield)."

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
The book's diagram shows the shunt without saying what proportion of glycolytic flux takes it, so the size of the ATP the red cell forgoes cannot be stated from this source.

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
microtopicId: The book prints this as a labelled diagram inside "Importance of Glycolysis" rather than as a named section, so module_subject stops at Glycolysis.
nanotopicId: No nanotopic exists below the microtopic level for carbohydrate metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the exam paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "BPG", "bisphosphoglycerate", "2,3-BPG" and "shunt" — no candidate record exists for this idea.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. "BPG Shunt in Red Blood Cells (26)" is named in the Biochemistry orientation's list of diagrams to be studied.
rejectedMergeCandidateIds: Nothing in live state mentions the shunt; "bisphosphoglycerate" and "2,3-BPG" both return no existing record.
relationships: Walked the 122 CON-HEM- concepts and the 25 under DIS-BIO-T03. Nothing there names a glycolytic enzyme. Two loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file, and the mechanism_step_before edge from this concept to CON-HEM-6B557A065A8D90 is owed.

---

# Item

## label
2,3-BPG binds haemoglobin and lowers its oxygen affinity, which is what makes the shunt worth running

## id
CON-HEM-6B557A065A8D90

## canonical_key
erythrocyte.bpg.oxygen-affinity

## aliases
Importance of 2,3-BPG
2,3-bisphosphoglycerate and oxygen delivery
Effect of 2,3-BPG on haemoglobin
Right shift of the oxygen dissociation curve
BPG and oxygen affinity

## arabic_label
تأثير ثنائي فوسفوجليسيرات على ألفة الهيموجلوبين للأكسجين

## arabic_aliases
أهمية 2,3-BPG
تسهيل توصيل الأكسجين للأنسجة

## definition
2,3-bisphosphoglycerate, the product of the BPG shunt, binds to haemoglobin and decreases its affinity for oxygen. Haemoglobin therefore gives oxygen up more readily, and delivery of oxygen to the tissues is favoured. This is the return the red cell gets for a shunt that yields it no ATP.

## explicit_objective
State what 2,3-BPG does to haemoglobin and to oxygen delivery, and use that to justify why a red cell runs a shunt that costs it ATP yield.

## pitfalls
Saying 2,3-BPG helps haemoglobin pick up oxygen. It does the opposite: it lowers affinity, so oxygen is released. A student who has the direction backwards will also get the compensations of anaemia and altitude backwards later.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
haem

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
SYS-HEM-T01 | SYS-RES-T01

## topic
Carbohydrate metabolism

## subtopic
Glycolysis

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Carbohydrate Metabolism > Glycolysis

## article_ids
ART-103-BIO-RBC-GLYCOLYSIS-AND-BPG-SHUNT

## related_article_ids
ART-HEM-TOP-B697DE3AAD

## related_concept_ids
CON-HEM-7FBB4829A4A4EC | CON-HEM-095C9C97B56CCA | CON-OBS-A94183DB543092

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
kau

## blueprint_weight
0.6

## exam_weight_by_year
KAU_Y1=0.6

## clinical_relevance
0.6

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.95

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p3 | 103 BMS

## atomic_claim_ids
CLM-HEM-BPG-OXYGEN-AFFINITY-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
[Biochemistry II, Diagram (2) c, 1 mark] Mention the importance of the product produced.
"2,3-BPG binds to hemoglobin and decreases its affinity to oxygen, favoring delivery of oxygen to tissues."

## merge_ids

## rejected_merge_candidate_ids
CON-OBS-A94183DB543092

## conflicts

## uncertainty
The Biochemistry book states the effect without giving the mechanism of binding or the conditions that raise 2,3-BPG, and this module's Physiology book does not cover the oxygen dissociation curve, so neither the binding site nor the size of the shift can be sourced here.

## evidence_gaps
Supported by the department book only. The physiological consequences — the position of the oxygen dissociation curve, and the rise in 2,3-BPG in anaemia and at altitude — are not stated in any 103 BMS source and are deliberately not asserted.

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
microtopicId: The book prints this inside "Importance of Glycolysis" rather than as a named section, so module_subject stops at Glycolysis.
nanotopicId: No nanotopic exists below the microtopic level for carbohydrate metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the exam paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "2,3-BPG", "bisphosphoglycerate", "oxygen affinity" and "hemoglobin" — the oxygen-affinity hits are carboxyhaemoglobin and fetal haemoglobin records, neither of which is a candidate for this idea.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. The shunt and its product are part of a diagram the Biochemistry orientation names as examinable.
rejectedMergeCandidateIds: CON-OBS-A94183DB543092 states that fetal haemoglobin has a 20–30% higher oxygen affinity than maternal adult haemoglobin. Not merged — it is an obstetric record about a different haemoglobin, and its objective is the maternal-fetal gradient rather than the effect of a metabolite.
relationships: Walked the 122 CON-HEM- concepts and the six records returned for "oxygen affinity". Nothing states what 2,3-BPG does. Three loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file.

---

# Item

## label
Chylomicrons carry dietary triacylglycerol out of the gut; VLDL carries hepatic triacylglycerol out of the liver

## id
CON-GIT-33EAF87333AAD5

## canonical_key
lipoprotein.chylomicron-vldl.transport-function

## aliases
Function of VLDL and chylomicrons
Chylomicron function
VLDL function
Transport of triacylglycerol in plasma
Very low density lipoprotein

## arabic_label
وظيفة الكيلوميكرونات والبروتينات الدهنية منخفضة الكثافة جداً

## arabic_aliases
نقل الدهون الثلاثية في البلازما
وظيفة VLDL

## definition
Both particles carry triacylglycerol, and the difference between them is where the triacylglycerol came from. Chylomicrons are formed by intestinal cells and transport absorbed dietary lipids to the lymphatics and then to the systemic circulation; they are 98 per cent lipid, mainly triacylglycerol, with apo B-48 and apo A in the nascent particle. VLDL is formed by liver cells and transports triacylglycerol from the liver to extrahepatic tissues; it is 90 per cent lipid, mainly triacylglycerol, with apo B-100 in the nascent particle. Lipoprotein lipase hydrolyses about 90 per cent of the chylomicron's triacylglycerol and about 50 per cent of the VLDL's.

## explicit_objective
State the source, the cargo and the destination of a chylomicron and of a VLDL particle, and say which apolipoprotein identifies each.

## pitfalls
Answering "they transport fat" for both and stopping. The two marks are for the two directions: dietary lipid from gut to circulation, and hepatic triacylglycerol from liver to tissues. Mixing up apo B-48 and apo B-100 is the other reliable way to lose marks here — B-48 is intestinal, B-100 is hepatic and is what the LDL receptor recognises.

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
SYS-END-T07 | SYS-GIT-T04

## topic
Lipid metabolism

## subtopic
Plasma Lipids and Lipoproteins

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## article_ids
ART-103-BIO-PLASMA-LIPOPROTEINS

## related_article_ids
ART-GIT-TOP-E391F29EBF

## related_concept_ids
CON-GIT-8C5125A491B189 | CON-GIT-38CC5CC7716DB7 | CON-GIT-5F1EF15328CC86 | CON-FND-6C2C52E862B410

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
0.6

## academic_relevance
0.9

## weight_confidence
0.35

## confidence
0.95

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p4 | 103 BMS

## atomic_claim_ids
CLM-GIT-CHYLOMICRON-VLDL-FUNCTION-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
[Biochemistry II, Diagram (3) a, 2 marks] Mention the Function of VLDL and Chylomicrons.
"VLDLs transport TAG from liver to extrahepatic tissues."
"Chylomicrons transport absorbed dietary lipids to lymphatics then to systemic circulation."

## merge_ids

## rejected_merge_candidate_ids
CON-FND-6C2C52E862B410

## conflicts

## uncertainty
The book gives the percentage of triacylglycerol hydrolysed by lipoprotein lipase for chylomicrons and for VLDL but does not say over what time or in which vascular beds, so those figures are quoted as the book gives them and not interpreted.

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
microtopicId: The book's own section is already the value of module_subject; the canonical tree has no node finer than DIS-BIO-T04.
nanotopicId: No nanotopic exists below the microtopic level for lipid metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the exam paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "chylomicron", "VLDL", "lipoprotein" and "apo" — "chylomicron" returns nothing, and the VLDL hits are the two fatty-liver records under DIS-BIO-T04, neither of which states what these particles transport.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. The Biochemistry orientation names "Metabolism of chylomicron (77)" and "Metabolism of VLDL (78)" among the diagrams to be studied.
rejectedMergeCandidateIds: CON-FND-6C2C52E862B410 lists what a standard lipid profile contains. Not merged — that is a laboratory-panel record under DIS-BIO-T07 and names no transport function; a question could test either without the other.
relationships: Walked the 10 concepts under DIS-BIO-T04. They are the fatty-liver and lipotropic-factor set extracted from another book, and none defines a lipoprotein class. Four loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file, and the mechanism_step_before chain VLDL → IDL → LDL is owed.

---

# Item

## label
Familial hypercholesterolaemia is a defect of the LDL receptor, so LDL cannot be taken up and accumulates in blood

## id
CON-GIT-8C5125A491B189

## canonical_key
lipoprotein.ldl-receptor.familial-hypercholesterolaemia

## aliases
Familial hypercholesterolemia
Disease resulting from defect in LDL uptake
LDL receptor defect
Hyperlipoproteinaemia type II
Apo B-100 receptor defect

## arabic_label
فرط كوليسترول الدم العائلي

## arabic_aliases
عيب مستقبلات البروتين الدهني منخفض الكثافة
فرط البروتينات الدهنية في الدم

## definition
LDL is cleared by binding to specific apo B-100 receptors, 70 per cent of them in the liver and 30 per cent in extrahepatic tissues, after which the particle is endocytosed and its cholesterol released for biosynthesis. Familial hypercholesterolaemia is a hyperlipoproteinaemia caused by a defect in those LDL receptors in the liver and other tissues, and it produces a marked increase in blood LDL. Because LDL carries cholesterol and high LDL forms arterial plaque, the untreated consequence is atherosclerosis.

## explicit_objective
Name the disease that follows a defect in LDL uptake, and explain in one step why the defect raises plasma LDL.

## pitfalls
Answering "atherosclerosis". Atherosclerosis is the consequence of the raised LDL, not the disease the defect produces; the half-mark is for naming familial hypercholesterolaemia, or the family it belongs to, hyperlipoproteinaemia. Confusing it with abetalipoproteinaemia — a failure to make apo B, which lowers lipoproteins — is the other trap, and the two sit in adjacent paragraphs of the book.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
SYS-END-T07 | SYS-FND-T02

## topic
Lipid metabolism

## subtopic
Plasma Lipids and Lipoproteins

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## article_ids
ART-103-BIO-PLASMA-LIPOPROTEINS

## related_article_ids
ART-GIT-TOP-E391F29EBF

## related_concept_ids
CON-GIT-33EAF87333AAD5 | CON-GIT-38CC5CC7716DB7 | CON-FND-6C2C52E862B410

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
0.8

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p4 | 103 BMS

## atomic_claim_ids
CLM-GIT-LDL-RECEPTOR-DEFECT-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
[Biochemistry II, Diagram (3) b, 0.5 marks] Mention the Disease resulting from defect in LDL uptake.
"Familial Hypercholesterolemia: It is due to defect in LDL receptors in liver and other tissues, which produces marked increase in LDL in blood."

## merge_ids

## rejected_merge_candidate_ids
CON-GIT-5F1EF15328CC86

## conflicts

## uncertainty
The book does not state the inheritance pattern, the prevalence, or whether the receptor defect is in number or in function, so none of that is asserted here. It also gives no Egyptian prevalence figure, and no foreign figure is substituted.

## evidence_gaps
Supported by the department book only. Treatment is deliberately absent: the book's lipoprotein chapter names no drug for this disease, so none is written.

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
microtopicId: The book's own section is already the value of module_subject; the canonical tree has no node finer than DIS-BIO-T04.
nanotopicId: No nanotopic exists below the microtopic level for lipid metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the exam paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "hypercholesterol", "LDL", "receptor" and "lipoprotein" — "hypercholesterol" returns nothing, and the LDL hits are a lipid-profile record and the two abetalipoproteinaemia and fatty-liver records.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. Plasma lipids and lipoproteins is not in the Biochemistry department's cancelled-items table.
rejectedMergeCandidateIds: CON-GIT-5F1EF15328CC86 states that reduced apo B-100 synthesis in abetalipoproteinaemia decreases VLDL synthesis. Not merged — it is the opposite disorder, a failure to build the particle rather than a failure to clear it, and the book prints them as two examples on opposite sides of the same page.
relationships: Walked the 10 concepts under DIS-BIO-T04. Three loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file, and the contrasts_with edge to CON-GIT-5F1EF15328CC86 is the one most worth writing.

---

# Item

## label
A low plasma VLDL leaves triacylglycerol stranded in the liver, and the result is a fatty liver

## id
CON-GIT-38CC5CC7716DB7

## canonical_key
lipoprotein.vldl-deficiency.fatty-liver

## aliases
Effect of low VLDL in plasma
Hypolipoproteinaemia
Abetalipoproteinaemia
Fatty liver from defective VLDL formation
Low VLDL and hepatic steatosis

## arabic_label
أثر انخفاض البروتين الدهني منخفض الكثافة جداً في البلازما

## arabic_aliases
الكبد الدهني الناتج عن نقص VLDL
نقص البروتينات الدهنية في الدم

## definition
VLDL is the only vehicle the liver has for exporting the triacylglycerol it makes. When plasma VLDL is low, that export fails and triacylglycerol accumulates in hepatocytes as a fatty liver. The book's worked example is abetalipoproteinaemia, a hypolipoproteinaemia in which apo-B is not synthesised: chylomicron formation fails, which gives fatty diarrhoea, and VLDL formation fails, which gives fatty liver.

## explicit_objective
Predict what happens in the liver when plasma VLDL falls, and name the disorder the book uses to illustrate it.

## pitfalls
Reading a low VLDL as harmless because low blood lipids sound healthy. The lipid has not gone away — it is sitting in the liver instead of in the blood. Students who have learnt "high LDL is bad" as the whole story have no place to put this.

## concept_type
mechanism

## status
under review

## support_mode
inferred

## subject
gi

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
SYS-GIT-T06 | SYS-END-T07

## topic
Lipid metabolism

## subtopic
Plasma Lipids and Lipoproteins

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Plasma Lipids and Lipoproteins

## article_ids
ART-103-BIO-PLASMA-LIPOPROTEINS

## related_article_ids
ART-GIT-TOP-E391F29EBF

## related_concept_ids
CON-GIT-5F1EF15328CC86 | CON-GIT-2D2709CD4D9A17 | CON-GIT-5E17AE710409A4 | CON-GIT-33EAF87333AAD5

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
0.6

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p4 | 103 BMS

## atomic_claim_ids
CLM-GIT-LOW-VLDL-FATTY-LIVER-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
[Biochemistry II, Diagram (3) c, 1.5 marks] What is the effect of low VLDL in plasma.
"Abetalipoproteinemia: It is due to failure of synthesis of apo-B, defective formation of chylomicrons (leads to fatty diarrhea), defective formation of VLDL (leads to fatty liver) and LDL."

## merge_ids

## rejected_merge_candidate_ids
CON-GIT-5E17AE710409A4 | CON-GIT-2D2709CD4D9A17

## conflicts

## uncertainty
`support_mode` is `inferred` rather than `direct_statement` because the book states the link inside one worked example — abetalipoproteinaemia — and never writes the general sentence "low plasma VLDL causes fatty liver". The generalisation is sound from its own account of what VLDL is for, but it is assembled from two places rather than quoted from one.

## evidence_gaps
Supported by the department book only, and the general form of the statement is inferred rather than quoted. A citation should quote both the VLDL function sentence and the abetalipoproteinaemia sentence.

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
microtopicId: The book's own section is already the value of module_subject; the canonical tree has no node finer than DIS-BIO-T04.
nanotopicId: No nanotopic exists below the microtopic level for lipid metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the exam paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "VLDL", "fatty liver", "abetalipoprotein" and "steatosis" — three live records came back and are recorded as neighbours or as rejected merges rather than as candidates for this idea.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. Plasma lipids and lipoproteins is not in the Biochemistry department's cancelled-items table.
rejectedMergeCandidateIds: CON-GIT-5E17AE710409A4 says over-mobilisation of adipose fat can exceed hepatic VLDL-synthesis capacity and cause fatty liver — the same endpoint by the opposite route, too much substrate rather than too few particles. CON-GIT-2D2709CD4D9A17 defines fatty liver itself. Both are neighbours worth linking and neither answers the examiner's question, which is about the effect of low plasma VLDL.
relationships: Walked the 10 concepts under DIS-BIO-T04 and the eight records returned for "fatty liver". This is the densest live neighbourhood in the batch. Four loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file, and a causes edge from this concept to CON-GIT-2D2709CD4D9A17 is owed.

---

# Item

## label
Ketosis is what happens when ketogenesis outruns ketolysis, and every cause is a state of high anti-insulin to insulin ratio

## id
CON-END-CC450A236ABF50

## canonical_key
ketogenesis.ketosis.causes

## aliases
Causes of ketosis
Ketonemia and ketonuria
Ketoacidosis
Diabetic ketoacidosis
Starvation ketosis

## arabic_label
أسباب الكيتوزية

## arabic_aliases
ارتفاع الأجسام الكيتونية في الدم
الكيتوزية في السكري غير المنضبط

## definition
Ketosis is raised ketone bodies in blood (ketonaemia) and in urine (ketonuria); normal blood levels are 0.5–3 mg/dL and urinary output is under 15 mg/day. It occurs whenever the rate of ketogenesis exceeds the rate of ketolysis. The book lists five causes: starvation; a low-carbohydrate, high-fat diet; severe uncontrolled diabetes mellitus; prolonged administration of anti-insulin hormones; and prolonged, severe muscular exercise. Raised 3-hydroxybutyrate and acetoacetate cause acidosis and may lead to coma and death.

## explicit_objective
List the causes of ketosis, and state the single condition — a raised anti-insulin to insulin ratio — that all of them share.

## pitfalls
Listing "diabetes" without the qualifier. The book says severe *uncontrolled* diabetes mellitus; a controlled diabetic is not in ketosis. The other frequent loss is writing "high fat diet" alone: the cause is a diet low in carbohydrate *and* high in fat, because carbohydrate is anti-ketogenic and it is its absence that matters.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
endo

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
SYS-END-T06 | DIS-BIO-T07

## topic
Lipid metabolism

## subtopic
Metabolism of Ketone Bodies

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Lipid Metabolism > Metabolism of Ketone Bodies (Ketogenesis and Ketolysis)

## article_ids
ART-103-BIO-KETOSIS

## related_article_ids
ART-103-BIO-TCA-KEY-ENZYMES

## related_concept_ids
CON-FND-037BF052DDFC0D | CON-END-3EA6071BAE8130 | CON-END-3DCCBF7739DD59

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
0.85

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.95

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p1 | 103 BMS

## atomic_claim_ids
CLM-END-KETOSIS-CAUSES-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
[Biochemistry I-5, 2 marks] Causes for Ketosis.
"Ketosis occurs in conditions where the rate of ketogenesis exceeds the rate of ketolysis"

## merge_ids

## rejected_merge_candidate_ids
CON-END-3EA6071BAE8130

## conflicts

## uncertainty
The book gives "prolonged and severe muscular exercise" as a cause without saying how long or how severe, and it gives no threshold blood level at which ketonaemia becomes ketoacidosis. Neither is inferred here.

## evidence_gaps
Supported by the department book only. Management of diabetic ketoacidosis is not in any 103 BMS source and is deliberately absent from this record.

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
microtopicId: The book's own chapter section is already the value of module_subject; the canonical tree has no node finer than DIS-BIO-T04.
nanotopicId: No nanotopic exists below the microtopic level for lipid metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the exam paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "ketosis", "ketone", "ketogenesis" and "acetoacetate" — the first three return no existing record at all, which is why this concept is minted rather than merged.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. Ketone-body metabolism is not in the cancelled-items table, and three of its diagrams — Ketogenesis (67), Ketolysis (68) and Metabolism of Ketone Bodies (70) — are named as examinable.
rejectedMergeCandidateIds: CON-END-3EA6071BAE8130 states that a reduced insulin-to-anti-insulin ratio decreases glucose uptake and raises hepatic glycogenolysis and gluconeogenesis. Not merged — it is the hormonal state and says nothing about ketone bodies; this concept is the list of clinical conditions in which ketosis appears.
relationships: Walked the 10 concepts under DIS-BIO-T04 and the 11 insulin and diabetes records under DIS-BIO-T03. None mentions a ketone body. Three loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file, and a causes edge from CON-END-3EA6071BAE8130 to this concept is owed.

---

# Item

## label
Negative nitrogen balance has three causes: too little protein in, too much protein lost, too much protein broken down

## id
CON-FND-B320D24EC35D30

## canonical_key
protein.nitrogen-balance.negative-causes

## aliases
Reasons for negative protein balance
Negative nitrogen balance
Causes of negative nitrogen balance
Nitrogen balance
Protein balance

## arabic_label
أسباب الميزان النيتروجيني السالب

## arabic_aliases
الميزان النيتروجيني
الرصيد البروتيني السالب

## definition
Nitrogen forms about 16 per cent of protein, so the difference between nitrogen intake and nitrogen output measures the balance between protein anabolism and catabolism. Negative nitrogen balance exists when output exceeds intake, and the book gives three causes. Inadequate protein intake, in starvation, malnutrition, deficiency of an essential amino acid, and gastrointestinal disease. Loss of protein, in chronic haemorrhage, albuminuria, and lactation on an inadequate diet. Increased protein catabolism, in diabetes mellitus, Cushing's syndrome, hyperthyroidism, and infectious fevers.

## explicit_objective
Give the three causes of negative nitrogen balance and place at least one clinical example under each.

## pitfalls
Answering with examples instead of causes — "starvation, bleeding, fever" — which is a list of six things in no order rather than the three headings the book uses. The mark scheme follows the book's structure, and a student who gives two of the three headings has two marks whatever examples they add.

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
DIS-BIO-T08 | SYS-FND-T06

## topic
Amino acids and proteins

## subtopic
General protein Metabolism

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > General protein Metabolism

## article_ids
ART-103-BIO-NITROGEN-BALANCE

## related_article_ids
ART-103-BIO-KETOSIS

## related_concept_ids
CON-END-CC450A236ABF50 | CON-GIT-BAD3B42A1B0EFF | CON-FND-46B9F239340ED9

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
0.7

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.95

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p1 | 103 BMS

## atomic_claim_ids
CLM-FND-NEGATIVE-NITROGEN-BALANCE-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
[Biochemistry I-3, 2 marks] Reasons for negative protein balance.
"It exists when output exceeds intake. This may be due to one of the following causes: a) Inadequate protein intake. b) Loss of protein. c) Increased protein catabolism."

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
The book lists lactation under loss of protein and also under positive nitrogen balance's opposite, convalescence, without reconciling the two, and it gives no figure for what counts as an adequate intake. Neither point is resolved here.

## evidence_gaps
Supported by the department book only. No independent verification against an international biochemistry or nutrition reference has been attached, and no Egyptian intake reference value is available in the corpus.

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
microtopicId: The book's own heading, "Nitrogen Balance", sits inside the General protein Metabolism chapter, which the subject tree records without children below it, so module_subject stops at the chapter.
nanotopicId: No nanotopic exists below the microtopic level for protein metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the exam paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "nitrogen balance", "protein balance", "catabolism" and "albuminuria" — the first two return no existing record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. The cancelled-items table cancels the hyperammonaemia table on page 90 except type 1, but nothing on pages 81 to 82 where this sits.
rejectedMergeCandidateIds: Nothing in live state states nitrogen balance; both "nitrogen balance" and "protein balance" return no existing record.
relationships: Walked the 13 concepts under DIS-BIO-T05. They are the protein-digestion set — pepsin, enteropeptidase, aminopeptidases — extracted from a gastrointestinal source, and none is about balance. Three loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file.

---

# Item

## label
Phenylketonuria is deficiency of phenylalanine hydroxylase, and the mousy odour comes from the metabolites phenylalanine is diverted into

## id
CON-FND-D7BB8C3AFB54CC

## canonical_key
phenylalanine.phenylketonuria.enzyme-defect

## aliases
Phenylketonuria
PKU
Phenylalanine hydroxylase deficiency
PAH deficiency
Mousy urine odour
Musty urine odor

## arabic_label
بيلة الفينيل كيتون

## arabic_aliases
نقص إنزيم هيدروكسيلاز الفينيل ألانين
رائحة البول الفأرية

## definition
Phenylalanine is an essential amino acid converted to tyrosine by phenylalanine hydroxylase (PAH), which needs tetrahydrobiopterin (BH4) as its hydrogen donor. Most cases of phenylketonuria are a deficiency of PAH itself; about 1–2 per cent are a deficiency of BH4. Phenylalanine that cannot become tyrosine is metabolised instead to phenylpyruvate, phenyl-lactate and phenylacetate, and these rise in tissues, plasma and urine. They are what give the urine its characteristic musty, mousy odour.

## explicit_objective
Given an infant with a mousy urine odour and raised phenylpyruvate, name the diagnosis and the deficient enzyme, and say what the raised metabolites are made from.

## pitfalls
Naming tyrosinase as the deficient enzyme because the child is pale. Tyrosinase deficiency is albinism, a different disease in the same chapter; in PKU tyrosinase is present and merely inhibited. The other error is forgetting the BH4 minority, which matters because those 1–2 per cent do not respond to diet alone.

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
ART-103-BIO-PHENYLKETONURIA

## related_article_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## related_concept_ids
CON-FND-587B0A39D3C0BD | CON-FND-1DF6B985CB77A1 | CON-FND-81A4F3A9C51B7B | CON-DER-6665EA8EA687C3

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
0.85

## academic_relevance
0.9

## weight_confidence
0.35

## confidence
0.95

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p5 | 103 BMS

## atomic_claim_ids
CLM-FND-PKU-ENZYME-DEFECT-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
[Biochemistry III, Case (1) a, 1 mark] Diagnosis:
[Biochemistry III, Case (1) b, 1 mark] Name of the deficient enzyme:
"An infant presents with hypopigmented skin compared to siblings, with a mousy urine odor, elevated phenylpyruvate and phenylacetate and mental retardation."
"Most of the cases of PKU are due to the deficiency of the enzyme phenylalanine hydroxylase (PAH)."

## merge_ids

## rejected_merge_candidate_ids
CON-DER-6665EA8EA687C3

## conflicts

## uncertainty
The exam stem names phenylacetate among the raised metabolites while the book's list of what phenylalanine is diverted into is phenylpyruvate and phenyl-lactate, with phenylacetate shown only on the pathway diagram. The two agree in substance; the difference is which metabolites each chooses to name in prose.

## evidence_gaps
Supported by the department book only. The book gives no incidence for PKU and no statement about newborn screening in Egypt, and neither is supplied.

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
microtopicId: The book's section, "Metabolic Disorder of Phenylalanine and Tyrosine Metabolism", sits below the subject tree's leaf for Aromatic Amino Acids, which module_subject already names.
nanotopicId: No nanotopic exists below the microtopic level for individual amino acid metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the exam paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "phenylalan", "phenylketon", "PKU" and "tyrosine" — the first three return no existing record and the tyrosine hit is an insulin-receptor kinase record.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
authorNotes: The paper letters this case a, b, b, c, d — the letter "b" appears twice, on the deficient enzyme and again on the neurological manifestations, and there is no "e". Recorded here because it is a question-file concern: whoever writes the written question for Case (1) must decide whether to reproduce the mislettering or renumber, and must not silently assume five clean subparts.
exclusionReason: Not excluded. The cancelled-items table cancels Alanine, Serine, Threonine, Aspartic acid, Arginine, Lysine, Histidine and Proline from the individual amino acid chapter, but not the aromatic amino acids.
rejectedMergeCandidateIds: CON-DER-6665EA8EA687C3 states that albinism is absent melanin production from a genetic defect in tyrosinase synthesis. Not merged — it is the disease PKU is confused with, not the same disease, and the pair is exactly the often_confused_with edge worth writing later.
relationships: Walked the 13 concepts under DIS-BIO-T05 and the seven records returned for "melanin". Nothing states PKU. Four loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file, and an often_confused_with edge to CON-DER-6665EA8EA687C3 plus causes edges to the two manifestation concepts are owed.

---

# Item

## label
The mental retardation of PKU comes from what phenylalanine keeps out of the brain, not from phenylalanine itself

## id
CON-FND-587B0A39D3C0BD

## canonical_key
phenylalanine.phenylketonuria.neurological-mechanism

## aliases
Causes for neurological manifestation in PKU
CNS manifestations of phenylketonuria
Mental retardation in PKU
Neurotransmitter deficiency in PKU
Amino acid transport competition at the blood-brain barrier

## arabic_label
سبب المظاهر العصبية في بيلة الفينيل كيتون

## arabic_aliases
التخلف العقلي في بيلة الفينيل كيتون
نقص النواقل العصبية

## definition
Two things happen at once. Raised phenylalanine and its metabolites interfere with the transport of tyrosine and tryptophan into the brain, so the brain is short of both. And because phenylalanine cannot be hydroxylated, tyrosine is low to begin with, which impairs synthesis of the neurotransmitters derived from it — DOPA and the catecholamines dopamine, noradrenaline and adrenaline. The book gives this as the explanation for why an untreated patient shows mental retardation, manifest by the age of one year.

## explicit_objective
Explain the cause of the neurological manifestations of PKU in two steps, naming the amino acids kept out of the brain and the neurotransmitters that are consequently not made.

## pitfalls
Saying phenylalanine is directly toxic to neurones. The book's mechanism is competition and deprivation: phenylalanine blocks tyrosine and tryptophan from entering the brain, and the missing tyrosine means missing neurotransmitters. Answering "high phenylalanine damages the brain" restates the finding instead of explaining it and earns nothing.

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
SYS-NEU-T02 | SYS-FND-T02

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
ART-103-BIO-PHENYLKETONURIA

## related_article_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## related_concept_ids
CON-FND-D7BB8C3AFB54CC | CON-FND-1DF6B985CB77A1 | CON-FND-81A4F3A9C51B7B

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids

## approved_video_resource_ids

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
0.9

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p5 | 103 BMS

## atomic_claim_ids
CLM-FND-PKU-NEUROLOGICAL-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
[Biochemistry III, Case (1) b (second occurrence of the letter b), 1 mark] Causes for neurological manifestation:
"The elevated phenylalanine and its metabolites will interfere with the transport of tyrosine and tryptophan to the brain leading to their deficiency. Also decreased tyrosine leads to impaired neurotransmitters synthesis in the brain; and this may explain why untreated patient shows mental retardation that manifest by the age of one year."

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
The book itself hedges — "this may explain why untreated patient shows mental retardation" — so the mechanism is offered as an explanation rather than as an established one, and it is written here with the same hedge. What tryptophan deficiency contributes, as against tyrosine deficiency, is not separated in the source.

## evidence_gaps
Supported by the department book only, and the book states the mechanism tentatively. Nothing here should be published as settled without a second source.

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
microtopicId: The book's section title is finer than any node in the canonical tree; module_subject carries the curriculum position instead.
nanotopicId: No nanotopic exists below the microtopic level for individual amino acid metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the exam paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "phenylalan", "mental retardation", "neurotransmitter" and "tryptophan" — no candidate record exists for this idea.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
authorNotes: This is the second subpart the paper letters "b". See CON-FND-D7BB8C3AFB54CC for the note on the mislettering; the question file must handle it.
exclusionReason: Not excluded; the aromatic amino acids are not in the cancelled-items table.
rejectedMergeCandidateIds: Nothing in live state states this mechanism; "phenylalan" returns no existing record at all.
relationships: Walked the 13 concepts under DIS-BIO-T05 and the SYS-NEU-T02 set. Nothing there concerns inborn errors. Three loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file, and a causes edge from CON-FND-D7BB8C3AFB54CC to this concept is owed.

---

# Item

## label
PKU pale skin has two causes at once: there is too little tyrosine to make melanin from, and too much phenylalanine inhibiting the enzyme that would

## id
CON-FND-1DF6B985CB77A1

## canonical_key
phenylalanine.phenylketonuria.hypopigmentation-mechanism

## aliases
Causes for hypopigmentation in PKU
Hypopigmentation in phenylketonuria
Pale skin and hair in PKU
Tyrosinase inhibition by phenylalanine
Melanin deficiency in PKU

## arabic_label
سبب نقص التصبغ في بيلة الفينيل كيتون

## arabic_aliases
شحوب الجلد والشعر في بيلة الفينيل كيتون
تثبيط إنزيم التيروزيناز

## definition
Melanin is made from DOPA in melanocytes by tyrosinase, and DOPA is made from tyrosine. In PKU tyrosine is deficient because phenylalanine cannot be hydroxylated to it, so the substrate for melanin is short. On top of that, the high level of phenylalanine competitively inhibits tyrosinase itself. Hair, skin and the iris of the eye are therefore hypopigmented — which is why the infant in the case is paler than the siblings.

## explicit_objective
Give both mechanisms behind the hypopigmentation of PKU — substrate deficiency and competitive enzyme inhibition — and name the enzyme and the pigment involved.

## pitfalls
Giving only the tyrosine-deficiency half. The book gives two mechanisms and the mark is written for both. Calling the condition albinism is the other error: albinism is absence of tyrosinase, PKU is inhibition of it, and the child in PKU is hypopigmented rather than devoid of pigment.

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
SYS-DER-T01 | SYS-FND-T02

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
ART-103-BIO-PHENYLKETONURIA

## related_article_ids
ART-103-BIO-VITAMINS-AND-FOLATE-ANTAGONISTS

## related_concept_ids
CON-FND-D7BB8C3AFB54CC | CON-FND-587B0A39D3C0BD | CON-DER-6665EA8EA687C3

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids

## approved_video_resource_ids

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
0.9

## weight_confidence
0.3

## confidence
0.95

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p5 | 103 BMS

## atomic_claim_ids
CLM-FND-PKU-HYPOPIGMENTATION-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
[Biochemistry III, Case (1) c, 1 mark] Causes for hypopigmentation:
"Hypopigmentation of hair, skin, and iris of the eye due to deficiency of tyrosine. High levels of phenylalanine also competitively inhibit tyrosinase enzyme."

## merge_ids

## rejected_merge_candidate_ids
CON-DER-6665EA8EA687C3

## conflicts

## uncertainty
The book does not say which of the two mechanisms contributes more, and it gives no account of how far pigmentation recovers on treatment.

## evidence_gaps
Supported by the department book only. No independent verification against a dermatology or biochemistry reference has been attached.

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
microtopicId: The book's section title is finer than any node in the canonical tree; module_subject carries the curriculum position instead.
nanotopicId: No nanotopic exists below the microtopic level for individual amino acid metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the exam paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "hypopigment", "melanin", "tyrosinase" and "phenylalan" — "hypopigment" and "phenylalan" return nothing, and the melanin hits are dermatology records.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; the aromatic amino acids are not in the cancelled-items table.
rejectedMergeCandidateIds: CON-DER-6665EA8EA687C3 is albinism — absent melanin from a tyrosinase defect. Not merged, and deliberately linked: this concept exists partly to keep the two apart, since the mechanisms differ and the book prints them a page apart.
relationships: Walked the 13 concepts under DIS-BIO-T05 and the seven melanin records under SYS-DER. Three loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file, and an often_confused_with edge to CON-DER-6665EA8EA687C3 is owed.

---

# Item

## label
PKU is treated by removing phenylalanine from the diet and putting tyrosine back, and it must start before the damage is done

## id
CON-FND-81A4F3A9C51B7B

## canonical_key
phenylalanine.phenylketonuria.dietary-treatment

## aliases
Treatment of phenylketonuria
Dietary restriction of phenylalanine
Phenylalanine-free milk formula
Tyrosine supplementation
BH4 supplementation in PKU

## arabic_label
علاج بيلة الفينيل كيتون

## arabic_aliases
الحمية الخالية من الفينيل ألانين
تعويض التيروزين

## definition
The book states that PKU is treatable by dietary means and that early diagnosis is what avoids the mental retardation. Treatment of classic PKU is dietary restriction of phenylalanine, using a phenylalanine-free milk formula, together with tyrosine supplementation — tyrosine has become an essential amino acid for this patient because they cannot make it. In the rare cases caused by BH4 deficiency rather than by PAH deficiency, the treatment is both dietary and supplementation of BH4.

## explicit_objective
State the treatment of classic PKU and of the BH4-deficient variant, and explain why tyrosine has to be supplied rather than merely allowed.

## pitfalls
Writing "a protein-free diet". Phenylalanine is restricted, not eliminated and not extended to all protein — it is an essential amino acid and a growing infant still needs some. Forgetting the tyrosine supplement is the other half-answer, and it is the half that explains why the treatment works.

## concept_type
management

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
DIS-BIO-T08 | SYS-FND-T02

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
ART-103-BIO-PHENYLKETONURIA

## related_article_ids
ART-103-BIO-NITROGEN-BALANCE

## related_concept_ids
CON-FND-D7BB8C3AFB54CC | CON-FND-587B0A39D3C0BD | CON-FND-1DF6B985CB77A1

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
0.9

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p5 | 103 BMS

## atomic_claim_ids
CLM-FND-PKU-DIETARY-TREATMENT-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
[Biochemistry III, Case (1) d, 1 mark] Treatment:
"The treatment of classic PKU consists of dietary restriction of phenylalanine (phenylalanine-free milk formula) with tyrosine supplementation."

## merge_ids

## rejected_merge_candidate_ids

## conflicts

## uncertainty
The book gives no target blood phenylalanine, no age at which the diet may be relaxed, and no statement about diet in pregnancy. None of that is supplied here, and none should be added from a foreign source without a local review.

## evidence_gaps
This record states a treatment and must not auto-publish. Its claim is to be written with risk_class treatment_or_action. It rests on the department book alone, quantifies nothing, and names no proprietary product; the availability and cost of a phenylalanine-free formula in Egypt is not stated in any source in this corpus and is deliberately left unwritten.

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
treatment_content_awaiting_faculty_review

## exclusion_reason

## field_notes
microtopicId: The book's section title is finer than any node in the canonical tree; module_subject carries the curriculum position instead.
nanotopicId: No nanotopic exists below the microtopic level for individual amino acid metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the exam paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "phenylalan", "PKU", "formula" and "tyrosine" — no candidate record exists for this idea.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; the aromatic amino acids are not in the cancelled-items table.
rejectedMergeCandidateIds: Nothing in live state states the treatment of PKU.
relationships: Walked the 13 concepts under DIS-BIO-T05. Three loose neighbours are in related_concept_ids, all of them the other PKU records in this batch. No typed edges are written — this batch authors no relations file, and a treated_by edge from CON-FND-D7BB8C3AFB54CC to this concept is owed.

---

# Item

## label
In obstructive jaundice the stool is clay coloured because no stercobilin reaches it, and the urine is dark because conjugated bilirubin does

## id
CON-GIT-A265DD7A7CC8EF

## canonical_key
bilirubin.obstructive-jaundice.clay-stool-dark-urine

## aliases
Obstructive jaundice
Conjugated hyperbilirubinaemia
Clay coloured stool
Dark urine in jaundice
Cholestatic jaundice
Post-hepatic jaundice

## arabic_label
اليرقان الانسدادي

## arabic_aliases
البراز الفاتح اللون والبول الداكن
فرط البيليروبين المقترن

## definition
Obstruction of the biliary passages — by gallstones, by cancer of the head of the pancreas, or by inflammation of the pancreas or of the passages themselves — stops conjugated bilirubin reaching the intestine and forces it back into the blood. Two consequences follow directly. Stercobilin, which is what makes stool brown, disappears from the faeces, so the stool is clay coloured. Conjugated bilirubin is water-soluble and not bound to albumin, so the kidney excretes it and the urine becomes dark brown. The urine also contains bile salts, and serum alkaline phosphatase is raised.

## explicit_objective
Explain, from what happens to bilirubin, why the stool is pale and the urine is dark in obstructive jaundice, naming the pigment missing from each.

## pitfalls
Saying the urine is dark because of unconjugated bilirubin. Unconjugated bilirubin is bound to albumin and cannot be filtered — that is why haemolytic jaundice is called acholuric. Only conjugated bilirubin appears in urine, and it is the one that rises when the duct is blocked.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
SYS-GIT-T07 | SYS-GIT-T06

## topic
Clinical biochemistry

## subtopic
Jaundice

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Heme Metabolism > Jaundice (Icterus or Hyperbilirubinemia)

## article_ids
ART-103-BIO-JAUNDICE-AND-BILIRUBIN

## related_article_ids
ART-HEM-TOP-B697DE3AAD

## related_concept_ids
CON-GIT-4A2A86832F1FF2 | CON-HEM-F2B664C215C912 | CON-HEM-881E8EA781D8E2

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids

## approved_video_resource_ids

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
0.9

## weight_confidence
0.35

## confidence
0.95

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p7 | 103 BMS

## atomic_claim_ids
CLM-GIT-OBSTRUCTIVE-JAUNDICE-STOOL-URINE-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
[Biochemistry III, Case (3) a, 1 mark] Diagnosis:
[Biochemistry III, Case (3) b, 1 mark] Explain why stool is clay colored and the urine is dark:
"Stercobilin disappears from the feces leading to clay colored stool. Conjugated bilirubin becomes excreted in the urine, which becomes dark brown in color."

## merge_ids

## rejected_merge_candidate_ids
CON-HEM-881E8EA781D8E2

## conflicts

## uncertainty
The book defines jaundice as visible yellowing above a serum bilirubin of 2 mg/dL but does not say how quickly stool colour changes after an obstruction, or whether a partial obstruction pales the stool at all.

## evidence_gaps
Supported by the department book only. Gallstone disease is the commonest cause in the case as written, but the book gives no Egyptian epidemiology for biliary obstruction and none is imported.

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
microtopicId: The book's own section, "Jaundice (Icterus or Hyperbilirubinemia)", is already the leaf named in module_subject; the canonical tree has no node finer than DIS-BIO-T07.
nanotopicId: No nanotopic exists below the microtopic level for clinical biochemistry.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the exam paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "bilirubin", "jaundice", "stercobilin" and "gallstone" — "bilirubin" returns no existing record, and the jaundice hits are the haemolytic-anaemia and blackwater-fever records, neither of which is about obstruction.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded. The cancelled-items table cancels "Biosynthesis of heme & Porphyria" on pages 115 to 118, which is the first half of the Heme Metabolism chapter; heme catabolism, blood bilirubin and jaundice on pages 119 to 123 are not cancelled, and "Different stages of heme catabolism (120)" is named among the examinable diagrams.
rejectedMergeCandidateIds: CON-HEM-881E8EA781D8E2 says erythrocyte breakdown yields excreted bile pigments while iron is reused. Not merged — it is a histology-level statement of normal turnover and does not distinguish conjugated from unconjugated bilirubin, which is the whole of this concept.
relationships: Walked the CON-HEM- namespace for bile and bilirubin records and the DIS-BIO-T07 set. Three loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file, and a part_of edge from this concept to CON-GIT-4A2A86832F1FF2 is owed.

---

# Item

## label
The three jaundices are told apart by which bilirubin rises and which enzyme rises with it

## id
CON-GIT-4A2A86832F1FF2

## canonical_key
bilirubin.jaundice.classification-by-bilirubin-and-enzymes

## aliases
Classification of jaundice
Types of jaundice
Haemolytic obstructive and hepatocellular jaundice
Direct and indirect bilirubin
Van den Bergh reaction
Enzymatic changes in jaundice

## arabic_label
تصنيف اليرقان حسب نوع البيليروبين وتغيرات الإنزيمات

## arabic_aliases
أنواع اليرقان
البيليروبين المباشر وغير المباشر

## definition
Jaundice is classified by which form of bilirubin predominates in serum. In haemolytic jaundice bilirubin production outruns the liver's capacity to excrete it, so unconjugated (indirect) bilirubin rises while the conjugated fraction stays normal; the book records no enzyme change for it. In obstructive jaundice conjugated (direct) bilirubin regurgitates into blood and alkaline phosphatase is raised. In hepatocellular jaundice both fractions rise — the damaged liver conjugates less, and swollen cells block the canaliculi — and ALT and AST are raised because liver cells are being destroyed.

## explicit_objective
Complete a three-by-three table of haemolytic, obstructive and hepatocellular jaundice against the bilirubin fraction elevated and the serum enzyme change in each.

## pitfalls
Filling the enzyme column for haemolytic jaundice with something. The book gives no enzyme change there, because nothing is obstructed and no hepatocyte is damaged — the abnormality is upstream of the liver. Writing "ALP" in every row that involves the biliary tree is the other error; ALP marks obstruction, and ALT and AST mark hepatocyte damage.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
gi

## primary_node_id
DIS-BIO-T07

## secondary_node_ids
SYS-GIT-T06 | SYS-HEM-T02

## topic
Clinical biochemistry

## subtopic
Blood Bilirubin

## microtopic

## nanotopic

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Heme Metabolism > Blood Bilirubin
103 BMS > Biochemistry > Heme Metabolism > Jaundice (Icterus or Hyperbilirubinemia)

## article_ids
ART-103-BIO-JAUNDICE-AND-BILIRUBIN

## related_article_ids
ART-HEM-TOP-B697DE3AAD

## related_concept_ids
CON-GIT-A265DD7A7CC8EF | CON-HEM-F2B664C215C912 | CON-HEM-4F64967BBFBB6F | CON-HEM-CDF561308A4D25

## resource_ids
src_300847a5fa64809d6c07

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
kau

## blueprint_weight
0.8

## exam_weight_by_year
KAU_Y1=0.8

## clinical_relevance
0.95

## academic_relevance
0.95

## weight_confidence
0.35

## confidence
0.95

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p7 | 103 BMS

## atomic_claim_ids
CLM-GIT-JAUNDICE-CLASSIFICATION-01

## resource_occurrence_ids

## source_candidate_ids

## original_wording
[Biochemistry III, Case (3) c, 3 marks] Complete the table: rows "Hemolytic jaundice", "Obstructive juandice", "Hepatocelluler juandice"; columns "Type of bilirubin elevated", "Enzymatic changes in blood".
"Due to biliary obstruction, the serum level of the enzyme alkaline phosphatase (ALP) is elevated."
"Due to liver cell damage, the serum levels of the enzymes ALT and AST are elevated."

## merge_ids

## rejected_merge_candidate_ids
CON-HEM-CDF561308A4D25

## conflicts
The book's summary table on page 123 labels the third row "Hepatotoxic Jaundice" while its prose on page 122 calls the same thing "hepatocellular jaundice" and "toxic hyperbilirubinemia", and the exam paper prints "Hepatocelluler juandice". All three name one entity; the difference is wording, and the exam's spelling is what a student will meet.

## uncertainty
The book leaves the enzyme cell for haemolytic jaundice empty rather than writing "no change", so whether a marker wants a blank, "normal", or a raised LDH is not settled by this source. Nothing is invented to fill it.

## evidence_gaps
Supported by the department book only. The book gives serum bilirubin reference ranges but no reference range for ALP, ALT or AST, so no numeric threshold is asserted.

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
microtopicId: The book's two sections, "Blood Bilirubin" and "Jaundice", are both named in module_subject, which is finer than any node the canonical tree offers below DIS-BIO-T07.
nanotopicId: No nanotopic exists below the microtopic level for clinical biochemistry.
approvedFileResourceIds: No file resource has been rights-cleared for this concept; the department book is cited by locator only.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the exam paper and the department book; this concept has no corpus extraction record.
sourceCandidateIds: Searched the corpus for "bilirubin", "jaundice", "alkaline phosphatase" and "conjugated" — "bilirubin" returns no existing record, so no candidate exists for the classification itself.
lastReviewed: New record; it has not been reviewed yet.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded; only the heme biosynthesis and porphyria half of the chapter is cancelled.
rejectedMergeCandidateIds: CON-HEM-CDF561308A4D25 says haemolytic anaemia may result from intrinsic or extrinsic disorders. Not merged — it classifies the anaemia by cause, while this concept classifies the jaundice by laboratory pattern; the two answer different questions.
relationships: Walked the 13 records returned for "hemolysis" and the DIS-BIO-T07 set. The haematology side of live state is well populated and the biochemistry side is empty. Four loose neighbours are in related_concept_ids. No typed edges are written — this batch authors no relations file, and diagnosed_by edges from each jaundice type to its enzyme pattern are the ones worth writing.

---

<!--
  UPDATE. Live record, id copied verbatim from find-existing.mjs. This is the first
  row of the Case (3) table: haemolytic jaundice and the bilirubin fraction it raises.
-->

# Item

## id
CON-HEM-F2B664C215C912

## label
Hemolytic anemia is excessive RBC hemolysis and often has jaundice

## definition
Haemolytic anaemia is anaemia from excessive destruction of red cells, and it is often accompanied by jaundice. The jaundice is unconjugated: haemolysis produces bilirubin faster than the liver can excrete it, so serum unconjugated bilirubin rises while the conjugated fraction stays normal. Because unconjugated bilirubin is bound to plasma albumin it cannot be excreted in urine, which is why the book calls this "acholuric jaundice". Stercobilin increases in the faeces, so the stool is dark brown rather than pale.

## explicit_objective
State which bilirubin fraction rises in haemolytic jaundice, and explain why the urine stays clear while the stool darkens.

## aliases
Haemolytic anaemia
Haemolytic jaundice
Acholuric jaundice
Unconjugated hyperbilirubinaemia
Prehepatic jaundice

## arabic_label
فقر الدم الانحلالي واليرقان الانحلالي

## arabic_aliases
اليرقان غير المصحوب ببيلة صفراوية
فرط البيليروبين غير المقترن

## pitfalls
Expecting dark urine because the patient is jaundiced. In haemolytic jaundice the urine is normal — the raised bilirubin is albumin-bound and unfilterable. Dark urine points to the conjugated fraction and therefore to obstruction or to liver-cell damage.

## concept_type
mechanism

## subject
haem

## secondary_node_ids
DIS-BIO-T07 | SYS-GIT-T06

## modules
103 BMS

## module_subject
103 BMS > Biochemistry > Heme Metabolism > Jaundice (Icterus or Hyperbilirubinemia)

## article_ids
ART-HEM-TOP-B697DE3AAD | ART-103-BIO-JAUNDICE-AND-BILIRUBIN

## related_concept_ids
CON-GIT-4A2A86832F1FF2 | CON-GIT-A265DD7A7CC8EF | CON-HEM-4F64967BBFBB6F | CON-HEM-CDF561308A4D25

## resource_ids
src_f92622aebf5fd2f72b11 | src_300847a5fa64809d6c07

## atomic_claim_ids
CLM-HEM-F2B664C215C912 | CLM-HEM-HAEMOLYTIC-JAUNDICE-BILIRUBIN-01

## learner_years
1

## universities
kau

## blueprint_weight
0.7

## exam_weight_by_year
KAU_Y1=0.7

## weight_confidence
0.35

## exam_signal
src_37f6c0daf3436096af19 | end_of_year | 2025 | p7 | 103 BMS

## original_wording
[Biochemistry III, Case (3) c, 3 marks — first row of the table] Hemolytic jaundice · Type of bilirubin elevated · Enzymatic changes in blood.
"Serum bilirubin increases, mainly unconjugated bilirubin."
"Since unconjugated bilirubin is bound to the plasma albumin, it cannot be excreted in the urine, and hence the name 'acholuric jaundice'."

## field_notes
relationships: Updated rather than duplicated after "jaundice", "hemolysis" and "haemolytic" all returned this record. The Biochemistry book's own list of causes of haemolytic jaundice includes G6PD deficiency, which is CON-HEM-4F64967BBFBB6F in this same batch, so the causes edge between them is now writable and is owed to a relations file this batch does not author.
