<!--
  Lane W1-102-BIOC-B (sub-lane of W1-102-BIOC), AU-MED-102 Biochemistry ·
  bioenergetics + carbohydrate metabolism + lipid metabolism (triage topics
  G, I, J — docs/Alexandria-Source-Imports/coverage/AU-MED-102-biochemistry-triage.md).

  Eight NEW concepts. Every other idea in this sub-lane's scope hit an existing
  concept — live or in an unimported Kasr batch — and is a sparse update in
  pending-live/AU-MED-102-biochem-metabolism.md instead. These eight are the ones
  the >=4-query find-existing.mjs + grep sweep found nowhere: not in
  server/data/medical-library-v1.json, not in any docs/*-Source-Imports/concept
  batch. Mint freeze fully lifted (LANE-BRIEF Sec16); ids from
  tools/mint-concept-id.mjs, checked against 2353 existing ids, no collision.

  All eight test topics the triage's Sec5 gap note names: Carbohydrate Metabolism,
  Lipid Metabolism and Bioenergetics have no department lecture/book text anywhere
  in the AU-MED-102 Biochemistry corpus (confirmed again by this sub-lane: the two
  "CHO lec." files sub-lane A spot-checked, and the AFM tutorial's own two
  PowerPoints, are all structural chemistry, never metabolism). Per the chief of
  staff's order for the 132 such questions, each concept below is authored against
  one catalogued standard biochemistry textbook resource instead of a department
  source: RES-WEB-BIOCHEM-AHERN-FREEFORALL ("Biochemistry Free For All", Ahern,
  Rajagopal & Tan, Oregon State University, via Biology LibreTexts, CC BY-NC-SA 4.0
  — catalogued by this lane in
  evidence/AU-MED-102-biochem-metabolism-resource.md, since sub-lane A's
  evidence/AU-MED-102-biochemistry-resources.md only catalogues the 13 exam/bank
  sources, not a teaching textbook). field_notes on every record below states this
  plainly, per the standing instruction.

  Every question_id named in field_notes is authored in
  question/AU-MED-102-biochem-metabolism-mcq.md.

  npm run medical:concept-ids run after writing; see Sec8 report.
-->

# Item

## label
The glucuronic acid pathway conjugates bilirubin and xenobiotics but cannot make ascorbic acid in the human body

## id
CON-FND-6394F7DBD17F80

## canonical_key
glucuronate.pathway.no-human-ascorbate-synthesis

## aliases
Glucuronic acid pathway
Uronic acid pathway
UDP-glucuronic acid
Glucuronidation
Why humans cannot synthesise vitamin C

## arabic_label
مسار حمض الجلوكورونيك

## arabic_aliases
مسار حمض اليورونيك
عدم قدرة الإنسان على تصنيع فيتامين سي

## definition
The glucuronic acid pathway is a minor branch of glucose oxidation running from glucose 6-phosphate through UDP-glucose to UDP-glucuronic acid, an activated form of glucuronic acid. In most mammals the pathway continues one further step to L-ascorbic acid (vitamin C); humans, other primates and guinea pigs lack the terminal enzyme, L-gulonolactone oxidase, so vitamin C cannot be synthesised and is dietary-essential for exactly this reason. What the pathway still does in humans is supply UDP-glucuronic acid for two excretory jobs: conjugating bilirubin in the liver so it becomes water-soluble for biliary excretion, and glucuronidating a wide range of xenobiotics and endogenous compounds — including benzoate — so they can be excreted in bile or urine.

## explicit_objective
State what the glucuronic acid pathway is used for in humans, and explain specifically why it cannot supply ascorbic acid the way the same pathway does in most other mammals.

## pitfalls
Assuming that because the pathway is active in humans it must still make some vitamin C. The pathway is not switched off — conjugation and detoxification continue normally — only the one extra enzymatic step to ascorbate is missing, because humans never inherited (or lost) a working copy of L-gulonolactone oxidase.

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
SYS-FND-T06 | DIS-BIO-T07

## topic
Carbohydrate metabolism

## subtopic
Glucuronic acid pathway

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Glucuronic acid pathway

## article_ids
ART-FND-GLUCURONIC-ACID-PATHWAY

## related_article_ids
ART-FND-GLUCONEOGENESIS-MALATE-SHUTTLE-AND-ATP-COST

## related_concept_ids
CON-HEM-7A26AE75471EF8

## resource_ids
RES-WEB-BIOCHEM-AHERN-FREEFORALL

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.4

## exam_weight_by_year
AU_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p25 | MED 102

## atomic_claim_ids
CLM-FND-GLUCURONIC-ACID-PATHWAY-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[AFM Biochemistry Questions, Carbohydrate Metabolism Q1] The following statements on glucuronic acid pathway are true EXCEPT: a- It can be synthesized in the human body from active glucose. b- It can be used in the synthesis of L-ascorbic acid in human body. c- It is used in detoxication of benzoate. d- It conjugates with bilirubin in the liver. [Key: b]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The AFM bank's own key implies the pathway is otherwise entirely correct as stated (synthesised from active glucose; detoxifies benzoate; conjugates bilirubin) — a claim this record follows, since no AU-MED-102 source contradicts it, though benzoate detoxification in humans runs mainly through glycine conjugation to hippurate, with glucuronidation as a minor accessory route; the department's own question does not distinguish the two, so this record states the pathway's general xenobiotic-conjugation role rather than asserting benzoate is its main substrate.

## evidence_gaps
No AU-MED-102 department lecture or book text covers this pathway at all — confirmed directly by this lane and by the department triage (Sec5): the two "CHO lec." files and the AFM tutorial's own PowerPoints are structural chemistry only. Authored against RES-WEB-BIOCHEM-AHERN-FREEFORALL (LibreTexts "Biochemistry Free For All," Ch. 6.1, Metabolism – Sugars) as the one catalogued standard-textbook reference, per the chief of staff's standing order for this gap.

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
microtopicId: The AFM bank frames this as one self-contained question on the pathway as a whole; the canonical tree has no node finer than DIS-BIO-T03 to hold it.
nanotopicId: No nanotopic exists below the microtopic level for carbohydrate metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored from the AFM bank question and RES-WEB-BIOCHEM-AHERN-FREEFORALL; no corpus extraction record exists for either.
sourceCandidateIds: find-existing.mjs run for "glucuronic", "glucuronidation", "ascorbic acid pathway" and "L-gulonolactone" — only CON-HEM-7A26AE75471EF8 (bilirubin conjugation) returned, a related but narrower record (see related_concept_ids); grep -ril "glucuronate.pathway" docs/*-Source-Imports/concept/ returns only this file.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded — nothing in the corpus cancels this topic, and it is the AFM bank's own Q1 of Carbohydrate Metabolism.
rejectedMergeCandidateIds: Not merged with CON-HEM-7A26AE75471EF8 — that record is specifically bilirubin's own hepatic conjugation mechanism (glucuronyl transferase); this one is the pathway overview including the human ascorbate-synthesis exception, which CON-HEM-7A26AE75471EF8 does not state.
relationships: related_concept_ids names the one genuine neighbour found. No typed edges are written — this lane authors no relations file.
questionIds: AFM Carbohydrate Metabolism Q1 (src_01ab4268402d32d4d111) — authored as QST-FND-GLUCURONIC-PATHWAY-001 in question/AU-MED-102-biochem-metabolism-mcq.md.

---

# Item

## label
Gluconeogenesis moves cytosolic oxaloacetate to the cytosol as malate, because oxaloacetate itself has no mitochondrial transporter

## id
CON-FND-95805B0745D091

## canonical_key
gluconeogenesis.malate-shuttle.oxaloacetate-transport

## aliases
Malate shuttle in gluconeogenesis
Why gluconeogenesis needs the malate shuttle
Mitochondrial oxaloacetate export
Malate-aspartate shuttle (gluconeogenic direction)

## arabic_label
تحويلة المالات في تكوين الجلوكوز

## arabic_aliases
نقل الأوكسالوأسيتات من الميتوكوندريا
أهمية تحويلة المالات في بناء الجلوكوز

## definition
Pyruvate carboxylase converts pyruvate to oxaloacetate inside the mitochondrion, but oxaloacetate has no transporter of its own across the inner mitochondrial membrane and gluconeogenesis needs it in the cytosol, where phosphoenolpyruvate carboxykinase acts next. The cell solves this by reducing oxaloacetate to malate with mitochondrial malate dehydrogenase; malate crosses on the malate-α-ketoglutarate transporter, and cytosolic malate dehydrogenase then re-oxidises it back to oxaloacetate, generating a cytosolic NADH that gluconeogenesis' own glyceraldehyde-3-phosphate dehydrogenase step needs. The malate shuttle is therefore necessary for gluconeogenesis specifically because it is the only route oxaloacetate's carbon skeleton has out of the mitochondrion.

## explicit_objective
State why gluconeogenesis cannot simply export mitochondrial oxaloacetate directly, and name the two-enzyme shuttle that gets its carbons to the cytosol instead.

## pitfalls
Confusing this with the malate-aspartate shuttle's usual job of carrying cytosolic NADH into the mitochondrion during glycolysis — here the traffic runs the opposite way, moving a mitochondrial four-carbon skeleton out, and the NADH it produces in the cytosol is consumed by gluconeogenesis, not generated for the electron transport chain.

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
SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## article_ids
ART-FND-GLUCONEOGENESIS-MALATE-SHUTTLE-AND-ATP-COST

## related_article_ids
ART-FND-GLUCURONIC-ACID-PATHWAY

## related_concept_ids
CON-FND-C2C88203E4A918 | CON-FND-089E2C3E01031C | CON-FND-FA3952AF2C99EA

## resource_ids
RES-WEB-BIOCHEM-AHERN-FREEFORALL

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.15

## academic_relevance
0.9

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p26 | MED 102

## atomic_claim_ids
CLM-FND-GLUCONEOGENESIS-MALATE-SHUTTLE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[AFM Biochemistry Questions, Carbohydrate Metabolism Q17] Malate shuttle is necessary for: a- Gluconeogenesis. b- Providing NADPH. c- ATP generation. d- Glycogenolysis. [Key: a]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
None recorded — the mechanism is standard and uncontested across sources.

## evidence_gaps
No AU-MED-102 department lecture or book text covers gluconeogenesis at all. Authored against RES-WEB-BIOCHEM-AHERN-FREEFORALL, Ch. 6.1, per the standing order for this gap.

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
microtopicId: The AFM bank tests this as one question inside its Gluconeogenesis run (Q15-Q21); the canonical tree has no node finer than DIS-BIO-T03.
nanotopicId: No nanotopic exists below the microtopic level for carbohydrate metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored; no corpus extraction record.
sourceCandidateIds: find-existing.mjs run for "malate shuttle", "malate", "oxaloacetate transport" and "malate dehydrogenase" — no existing concept named the shuttle itself; grep -ril "malate-shuttle" docs/*-Source-Imports/concept/ returns only this file.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded.
rejectedMergeCandidateIds: None found — no live or pending concept states this mechanism.
relationships: related_concept_ids links the two neighbouring gluconeogenesis concepts already pending (key enzymes; substrates) and this same file's ATP-cost concept, which shares the pathway. No typed edges are written — this lane authors no relations file.
questionIds: AFM Carbohydrate Metabolism Q17 (src_01ab4268402d32d4d111) — authored as QST-FND-GLUCONEOGENESIS-MALATE-SHUTTLE-001.

---

# Item

## label
Converting two pyruvate to one glucose by gluconeogenesis costs six high-energy phosphate bonds, not two

## id
CON-FND-FA3952AF2C99EA

## canonical_key
gluconeogenesis.atp-cost.six-atp-per-two-pyruvate

## aliases
ATP cost of gluconeogenesis
Energy cost of making glucose from pyruvate
Six ATP equivalents in gluconeogenesis

## arabic_label
التكلفة الطاقية لتكوين الجلوكوز من البيروفات

## arabic_aliases
عدد جزيئات ATP اللازمة لتكوين الجلوكوز
تكلفة تكوين السكر الجديد

## definition
Building one molecule of glucose from two molecules of pyruvate is energetically expensive because gluconeogenesis reverses glycolysis's energetically favourable direction. Six high-energy phosphate bonds are spent per glucose made: two ATP and one GTP at the pyruvate carboxylase and PEP carboxykinase steps (one of each per pyruvate, so two of each in total for two pyruvates), and two further ATP at the two phosphoglycerate kinase reactions run in reverse. This is why gluconeogenesis only proceeds when the cell's energy state allows it — a fasting liver, running on fatty acid oxidation, has the ATP to spend.

## explicit_objective
State how many ATP-equivalent high-energy phosphate bonds gluconeogenesis spends to make one glucose from two pyruvate, and name which steps spend them.

## pitfalls
Counting only the two ATP spent at pyruvate carboxylase and forgetting the two GTP at PEP carboxykinase and the two ATP at the reversed phosphoglycerate kinase step — all three steps are doubled because two pyruvate molecules, not one, are needed to make one six-carbon glucose.

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
SYS-FND-T06

## topic
Carbohydrate metabolism

## subtopic
Gluconeogenesis

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Gluconeogenesis

## article_ids
ART-FND-GLUCONEOGENESIS-MALATE-SHUTTLE-AND-ATP-COST

## related_article_ids
ART-FND-GLUCURONIC-ACID-PATHWAY

## related_concept_ids
CON-FND-C2C88203E4A918 | CON-FND-95805B0745D091

## resource_ids
RES-WEB-BIOCHEM-AHERN-FREEFORALL

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.15

## academic_relevance
0.85

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p27 | MED 102

## atomic_claim_ids
CLM-FND-GLUCONEOGENESIS-ATP-COST-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[AFM Biochemistry Questions, Carbohydrate Metabolism Q20] How many ATP molecules are required to convert 2 molecules of pyruvate into glucose? a- Two. b- Three. c- Six. d- Eight. [Key: c]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The question asks for "ATP molecules" and the standard count of six includes two GTP (chemically equivalent to ATP at the PEP carboxykinase step) — this record follows the conventional teaching that treats GTP and ATP as interchangeable high-energy phosphate currency for this count, which is what the printed key (six) requires.

## evidence_gaps
No AU-MED-102 department lecture or book text covers gluconeogenesis. Authored against RES-WEB-BIOCHEM-AHERN-FREEFORALL, Ch. 6.1, per the standing order for this gap.

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
microtopicId: The AFM bank tests this inside its Gluconeogenesis run; the canonical tree has no node finer than DIS-BIO-T03.
nanotopicId: No nanotopic exists below the microtopic level for carbohydrate metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored; no corpus extraction record.
sourceCandidateIds: find-existing.mjs run for "ATP cost gluconeogenesis", "six ATP", "pyruvate carboxylase ATP" and "PEP carboxykinase GTP" — no existing concept states the specific cost; grep -ril "atp-cost" docs/*-Source-Imports/concept/ returns only this file.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded.
rejectedMergeCandidateIds: None found.
relationships: related_concept_ids links the pending gluconeogenesis key-enzymes concept and this file's malate-shuttle concept, which share the same pathway and the same new article. No typed edges are written — this lane authors no relations file.
questionIds: AFM Carbohydrate Metabolism Q20 (src_01ab4268402d32d4d111) — authored as QST-FND-GLUCONEOGENESIS-ATP-COST-001.

---

# Item

## label
Hereditary fructose intolerance is aldolase B deficiency, and fructose-1-phosphate accumulation is what makes it dangerous

## id
CON-FND-031381BCC0ACC5

## canonical_key
fructose.hereditary-intolerance.aldolase-b-deficiency

## aliases
Hereditary fructose intolerance
Aldolase B deficiency
Fructose-1-phosphate accumulation
Fructose intolerance

## arabic_label
عدم تحمل الفركتوز الوراثي

## arabic_aliases
نقص إنزيم الألدولاز ب
تراكم فركتوز-1-فوسفات

## definition
Hereditary fructose intolerance is a deficiency of aldolase B, the liver enzyme that splits fructose 1-phosphate in the fructokinase pathway of fructose metabolism. Fructokinase itself is intact, so ingested fructose is still phosphorylated to fructose 1-phosphate, but with aldolase B missing that intermediate cannot be split further and accumulates in the liver. The trapped fructose 1-phosphate sequesters inorganic phosphate and, indirectly, depletes ATP, which inhibits glycogenolysis and gluconeogenesis and produces severe hypoglycaemia after fructose ingestion — the opposite of glycogen phosphorylase being inhibited by the disease itself, which is the false statement the AFM bank's question turns on. Urine tests positive for fructose because it cannot be metabolised past this block, which the question's fourth option gets backwards.

## explicit_objective
Name the enzyme deficient in hereditary fructose intolerance, state which intermediate accumulates, and explain the mechanism that produces hypoglycaemia after fructose is eaten.

## pitfalls
Believing the accumulated fructose 1-phosphate inhibits glycogen phosphorylase directly, or that urine is fructose-free — the AFM bank's own "EXCEPT" question is built on exactly these two false statements, and the disease in fact causes fructosuria, not its absence.

## concept_type
condition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
SYS-FND-T06 | SYS-GIT-T04

## topic
Carbohydrate metabolism

## subtopic
Disorders of fructose metabolism

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Fructose and galactose disorders

## article_ids
ART-FND-FRUCTOSE-AND-GALACTOSE-DISORDERS

## related_article_ids
ART-FND-ORAL-GLUCOSE-TOLERANCE-TEST

## related_concept_ids
CON-FND-C4459ABD69361C

## resource_ids
RES-WEB-BIOCHEM-AHERN-FREEFORALL

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.5

## exam_weight_by_year
AU_Y1=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## weight_confidence
0.35

## confidence
0.9

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p27-28 | MED 102

## atomic_claim_ids
CLM-FND-FRUCTOSE-INTOLERANCE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[AFM Biochemistry Questions, Carbohydrate Metabolism Q27] All are true as regards fructose intolerance EXCEPT: a- Defective enzyme is aldolase-B. b- Fructose-1-phosphate accumulates. c- Glycogen phosphorylase is inhibited. d- Urine is free from fructose. [Key: d] (Also Q65, keyed independently: Hereditary fructose intolerance is a condition caused by a deficiency of: a- Phosphofructokinase. b- Fructokinase. c- Aldolase B. d- Fructose 6-phosphatase. [Key: c])

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
Q27 is an "EXCEPT" item and its printed key (d) marks "urine is free from fructose" as the false statement, which is consistent with standard teaching (fructosuria is a feature). Whether option c ("glycogen phosphorylase is inhibited") is also considered false by the department, or accepted as a secondary true statement, is not resolvable from the single-letter key on an EXCEPT item with two plausible false statements; this record follows the printed key exactly and does not adjudicate between the two.

## evidence_gaps
No AU-MED-102 department lecture or book text covers this condition. Authored against RES-WEB-BIOCHEM-AHERN-FREEFORALL, Ch. 6.1, per the standing order for this gap.

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
microtopicId: The AFM bank tests this as two separate questions (Q27, Q65) inside its Carbohydrate Metabolism run; the canonical tree has no node finer than DIS-BIO-T03.
nanotopicId: No nanotopic exists below the microtopic level for carbohydrate metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored; no corpus extraction record.
sourceCandidateIds: find-existing.mjs run for "fructose intolerance", "aldolase B", "fructokinase" and "fructose-1-phosphate" — no existing concept states this condition; grep -ril "fructose" docs/*-Source-Imports/concept/ returns only unrelated glycolysis/fructose-numbering mentions, not this condition.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded.
rejectedMergeCandidateIds: None found.
relationships: related_concept_ids links this file's galactosemia concept, its natural teaching pair (both inherited monosaccharide-trapping disorders, same new article). No typed edges are written — this lane authors no relations file.
questionIds: AFM Carbohydrate Metabolism Q27 and Q65 (src_01ab4268402d32d4d111) — authored as QST-FND-FRUCTOSE-INTOLERANCE-001 and QST-FND-FRUCTOSE-INTOLERANCE-002.

---

# Item

## label
Classic galactosemia is galactose-1-phosphate uridyltransferase deficiency, and every feature follows from trapped galactose-1-phosphate and galactitol

## id
CON-FND-C4459ABD69361C

## canonical_key
galactosemia.galt-deficiency.classic-type

## aliases
Galactosemia
Galactose-1-phosphate uridyltransferase deficiency
GALT deficiency
Classic galactosemia

## arabic_label
مرض الجالاكتوزيميا

## arabic_aliases
نقص إنزيم يوريديل ترانسفيراز الجالاكتوز-1-فوسفات
الجالاكتوزيميا الكلاسيكية

## definition
Classic galactosemia is deficiency of galactose-1-phosphate uridyltransferase, the enzyme that normally exchanges galactose-1-phosphate's phosphate group with UDP-glucose to make UDP-galactose and glucose-1-phosphate. Without it, galactose-1-phosphate accumulates in the liver, lens, kidney and brain, and galactose is diverted by aldose reductase into galactitol, an osmotically active sugar alcohol that accumulates in the lens and causes cataracts. Clinical features follow directly: hepatosplenomegaly and jaundice from hepatocyte injury, mental retardation from cerebral galactitol and galactose-1-phosphate accumulation, and cataracts from lens galactitol; haemolytic anaemia is not a recognised feature of galactosemia and is the false statement the AFM bank's question is built on.

## explicit_objective
Name the enzyme deficient in classic galactosemia, state which two metabolites accumulate, and explain the mechanism behind the cataracts.

## pitfalls
Listing haemolytic anaemia as a feature of galactosemia — it is not; the disease's blood-related complication, when present, is more often a bleeding tendency or sepsis risk from hepatic and immune dysfunction, not haemolysis, and this is precisely the distractor the AFM bank's question tests.

## concept_type
condition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
SYS-FND-T06 | SYS-GIT-T04

## topic
Carbohydrate metabolism

## subtopic
Disorders of galactose metabolism

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Fructose and galactose disorders

## article_ids
ART-FND-FRUCTOSE-AND-GALACTOSE-DISORDERS

## related_article_ids
ART-FND-ORAL-GLUCOSE-TOLERANCE-TEST

## related_concept_ids
CON-FND-031381BCC0ACC5

## resource_ids
RES-WEB-BIOCHEM-AHERN-FREEFORALL

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.5

## exam_weight_by_year
AU_Y1=0.5

## clinical_relevance
0.6

## academic_relevance
0.85

## weight_confidence
0.35

## confidence
0.9

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p27-32 | MED 102

## atomic_claim_ids
CLM-FND-GALACTOSEMIA-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[AFM Biochemistry Questions, Carbohydrate Metabolism Q28] Features of galactosemia include the following EXCEPT: a- Cataract. b- Hepatospleenomegaly. c- Mental retardation. d- Hemolytic anemia. [Key: d] (Also Q61, keyed independently: The commonest deficient enzyme in Galactosemia is: a- Galactokinase. b- Galactose-1-P uridyl transferase. c- UDP transferase. d- Galactose-1-phosphatase. [Key: b])

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
None recorded — both AFM items key cleanly and consistently with standard teaching.

## evidence_gaps
No AU-MED-102 department lecture or book text covers this condition. Authored against RES-WEB-BIOCHEM-AHERN-FREEFORALL, Ch. 6.1, per the standing order for this gap.

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
microtopicId: The AFM bank tests this as two separate questions (Q28, Q61); the canonical tree has no node finer than DIS-BIO-T03.
nanotopicId: No nanotopic exists below the microtopic level for carbohydrate metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored; no corpus extraction record.
sourceCandidateIds: find-existing.mjs run for "galactosemia", "galactose-1-phosphate", "GALT" and "galactitol" — no existing concept states this condition; grep -ril "galactosemia" docs/*-Source-Imports/concept/ returns only this file.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded.
rejectedMergeCandidateIds: None found.
relationships: related_concept_ids links this file's fructose-intolerance concept, its natural teaching pair. No typed edges are written — this lane authors no relations file.
questionIds: AFM Carbohydrate Metabolism Q28 and Q61 (src_01ab4268402d32d4d111) — authored as QST-FND-GALACTOSEMIA-001 and QST-FND-GALACTOSEMIA-002.

---

# Item

## label
A standard oral glucose tolerance test is read from four named bands, and the two-hour value is what separates impaired tolerance from diabetes

## id
CON-FND-73897FD5BF1C3D

## canonical_key
glucose.oral-tolerance-test.impaired-glucose-tolerance

## aliases
Oral glucose tolerance test
OGTT interpretation
Impaired glucose tolerance
Diagnosis by OGTT

## arabic_label
اختبار تحمل الجلوكوز الفموي

## arabic_aliases
تفسير نتائج اختبار تحمل الجلوكوز
ضعف تحمل الجلوكوز

## definition
A standard oral glucose tolerance test gives a 75 g glucose load and samples plasma glucose fasting and at fixed intervals afterwards, most decisively at two hours. Normal glucose tolerance is a fasting value under 100-110 mg/dL and a two-hour value under 140 mg/dL; impaired glucose tolerance is a two-hour value of 140-199 mg/dL with a fasting value still below the diabetic threshold; and a two-hour value of 200 mg/dL or above, or a fasting value of 126 mg/dL or above, is diagnostic of diabetes mellitus. A patient whose glucose rises from a mildly elevated fasting value, peaks, and comes part-way back down by two hours but is still above 140 mg/dL sits in the impaired-tolerance band rather than the normal or diabetic ones.

## explicit_objective
Given fasting, one-hour and two-hour OGTT values, classify the result as normal, impaired glucose tolerance, or diabetes mellitus using the two-hour threshold.

## pitfalls
Diagnosing diabetes from a raised fasting value alone without checking whether it clears the 126 mg/dL diabetic threshold, or reading the peak (often at one hour) instead of the two-hour value that the test's interpretation actually turns on.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
endo

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
SYS-END-T01

## topic
Carbohydrate metabolism

## subtopic
Blood glucose regulation

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Carbohydrate Metabolism > Oral glucose tolerance test

## article_ids
ART-FND-ORAL-GLUCOSE-TOLERANCE-TEST

## related_article_ids
ART-FND-FRUCTOSE-AND-GALACTOSE-DISORDERS

## related_concept_ids
CON-END-AC5B11BA2F2BCA | CON-END-853A9833B36C99

## resource_ids
RES-WEB-BIOCHEM-AHERN-FREEFORALL

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.4

## exam_weight_by_year
AU_Y1=0.4

## clinical_relevance
0.7

## academic_relevance
0.75

## weight_confidence
0.3

## confidence
0.85

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p36 | MED 102

## atomic_claim_ids
CLM-FND-OGTT-INTERPRETATION-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[AFM Biochemistry Questions, Carbohydrate Metabolism Q79] When a standard oral glucose tolerance test is done, the blood glucose levels of the patient were found to be as follows: 0 min (fasting) = 120 mg/dl; 60 min = 170 mg/dl; 120 min = 150 mg/dl. The patient has: a- Normal glucose tolerance. b- Impaired glucose tolerance. c- Mild diabetes mellitus. d- Severe diabetes mellitus. [Key: b]

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
The vignette's fasting value (120 mg/dL) already exceeds the commonly taught upper-normal fasting cutoff (100-110 mg/dL) that would itself suggest impaired fasting glucose; the department's key nonetheless classifies the whole picture by the two-hour value (150 mg/dL, within the 140-199 mg/dL impaired-tolerance band) rather than flagging the fasting value separately, which this record follows.

## evidence_gaps
No AU-MED-102 department lecture or book text covers OGTT interpretation. Authored against RES-WEB-BIOCHEM-AHERN-FREEFORALL, Ch. 6.1, per the standing order for this gap.

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
microtopicId: The AFM bank tags this item "Practical" inside its Carbohydrate Metabolism run; the canonical tree has no node finer than DIS-BIO-T03.
nanotopicId: No nanotopic exists below the microtopic level for carbohydrate metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored; no corpus extraction record.
sourceCandidateIds: find-existing.mjs run for "oral glucose tolerance", "OGTT", "impaired glucose tolerance" and "glucose tolerance test" — no existing concept states the interpretation thresholds directly (the nearest live/pending neighbours, CON-END-AC5B11BA2F2BCA and CON-END-853A9833B36C99, cover diabetes diagnosis thresholds and hypoglycaemia causes respectively, not the OGTT procedure and its impaired-tolerance band); grep -ril "oral-tolerance-test" docs/*-Source-Imports/concept/ returns only this file.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded.
rejectedMergeCandidateIds: CON-END-AC5B11BA2F2BCA states the four diagnostic glycaemic thresholds generally; not merged because that record does not walk through an OGTT time-course reading, which is what this AFM question specifically tests.
relationships: related_concept_ids links the two Kasr pending diabetes-diagnosis concepts. No typed edges are written — this lane authors no relations file.
questionIds: AFM Carbohydrate Metabolism Q79 (src_01ab4268402d32d4d111) — authored as QST-FND-OGTT-001.

---

# Item

## label
Lecithin is built by combining diacylglycerol with activated choline carried on CDP-choline

## id
CON-FND-50158600E60C1C

## canonical_key
lecithin.synthesis.cdp-choline-pathway

## aliases
CDP-choline pathway
Lecithin synthesis
Phosphatidylcholine synthesis
Kennedy pathway (choline branch)

## arabic_label
تخليق الليسيثين عن طريق CDP-كولين

## arabic_aliases
مسار CDP-كولين
تخليق الفوسفاتيديل كولين

## definition
Lecithin, or phosphatidylcholine, is synthesised by transferring phosphocholine from CDP-choline onto diacylglycerol, releasing CMP. Choline is first phosphorylated by choline kinase to phosphocholine, which is then activated by CTP to form CDP-choline; the enzyme phosphocholine transferase then joins the activated choline head group to diacylglycerol to make lecithin. This route — the choline branch of the Kennedy pathway — is the major route of lecithin synthesis in most tissues and is distinct from methylating phosphatidylethanolamine, a minor liver-only alternative.

## explicit_objective
Name the activated intermediate that donates the choline head group in lecithin synthesis, and state which precursor it combines with.

## pitfalls
Naming UDP-choline, GDP-choline or ATP-choline as the activated donor — the nucleotide carrier for choline activation is specifically CDP-choline, formed from CTP, not from UTP, GTP or ATP; confusing the nucleotide is the exact distractor the AFM bank tests.

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
SYS-FND-T06

## topic
Lipid metabolism

## subtopic
Phospholipid synthesis

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Lipid Metabolism > Phospholipid synthesis

## article_ids
ART-FND-LECITHIN-SYNTHESIS-CDP-CHOLINE

## related_article_ids
ART-FND-CYANIDE-POISONING-COMPLEX-IV

## related_concept_ids
CON-FND-6B469645AE7DBC

## resource_ids
RES-WEB-BIOCHEM-AHERN-FREEFORALL

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.35

## exam_weight_by_year
AU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.3

## confidence
0.9

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p44,49 | MED 102

## atomic_claim_ids
CLM-FND-LECITHIN-CDP-CHOLINE-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[AFM Biochemistry Questions, Lipid Metabolism Q8] CDP-choline is used for synthesis of: a- Cholesterol. b- Lecithin. c- Ketone bodies. d- Acetyl-choline. [Key: b] (Also Q49, keyed independently: Phosphatidyl choline is synthesized by combining diacylglycerol with activated choline. Which derivative of choline is used for this reaction? a- UDP-choline. b- GDP-choline. c- ATP-choline. d- CDP-choline. [Key: d]) (Also Q63: For the direct synthesis of lecithin from diacyglycerol, the following compound is required: a- CDP-inositol. b- UDP-G. c- CDP-choline. d- ATP. [Key: c])

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
None recorded — all three AFM items key consistently with each other and with standard teaching.

## evidence_gaps
No AU-MED-102 department lecture or book text covers lipid metabolism, including phospholipid synthesis. Authored against RES-WEB-BIOCHEM-AHERN-FREEFORALL, Ch. 6.3-6.4, per the standing order for this gap.

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
microtopicId: The AFM bank tests this as three separate questions inside its Lipid Metabolism run; the canonical tree has no node finer than DIS-BIO-T04.
nanotopicId: No nanotopic exists below the microtopic level for lipid metabolism.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored; no corpus extraction record.
sourceCandidateIds: find-existing.mjs run for "CDP-choline", "lecithin synthesis", "phosphatidylcholine" and "Kennedy pathway" — no existing concept names this synthesis route; grep -ril "cdp-choline" docs/*-Source-Imports/concept/ returns only this file.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded.
rejectedMergeCandidateIds: None found.
relationships: related_concept_ids links the pending adipose glycerol-3-phosphate/triacylglycerol-synthesis concept, since phosphatidic acid sits at the same glycerolipid branch point this concept's diacylglycerol precursor comes from. No typed edges are written — this lane authors no relations file.
questionIds: AFM Lipid Metabolism Q8, Q49 and Q63 (src_01ab4268402d32d4d111) — authored as QST-FND-LECITHIN-CDP-CHOLINE-001, -002 and -003.

---

# Item

## label
Cyanide poisoning is fatal because it blocks cytochrome oxidase (Complex IV), stopping oxidative phosphorylation despite normal oxygen delivery

## id
CON-FND-CFB54F33867C57

## canonical_key
cyanide.poisoning.complex-iv-cytochrome-oxidase-inhibition

## aliases
Cyanide poisoning mechanism
Complex IV inhibition
Cytochrome oxidase inhibition
Cyanide and cytochrome c oxidase

## arabic_label
تسمم السيانيد وتثبيط أوكسيديز السيتوكروم

## arabic_aliases
تثبيط المركب الرابع
تثبيط إنزيم أوكسيديز السيتوكروم سي

## definition
Cyanide binds the ferric iron of cytochrome a3 within cytochrome c oxidase, Complex IV of the electron transport chain, and blocks the transfer of electrons to molecular oxygen at the chain's final step. Oxygen delivery and haemoglobin's oxygen-carrying capacity are unaffected — cyanide does not form a haemoglobin complex and does not block oxygen transport in blood — but with Complex IV inhibited, the whole electron transport chain backs up, oxidative phosphorylation stops, and cells switch to anaerobic glycolysis and lactate production despite oxygen being present in the tissues (histotoxic hypoxia). Death follows rapidly because the tissues most dependent on oxidative ATP production — brain and heart — fail first.

## explicit_objective
Name the specific complex and cofactor cyanide inhibits, and explain why the resulting hypoxia occurs despite normal blood oxygen content and delivery.

## pitfalls
Attributing cyanide toxicity to a cyanide-haemoglobin complex or to blocked oxygen transport in blood — cyanide's lethal action is intracellular and enzymatic, at Complex IV, not at the level of oxygen carriage; this is the specific distractor pair the AFM bank tests across its two questions on the topic.

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
SYS-FND-T06

## topic
Biomolecules

## subtopic
Bioenergetics

## microtopic

## nanotopic

## modules
AU-MED-102

## module_subject
AU-MED-102 > Biochemistry > Bioenergetics > Electron transport chain inhibitors

## article_ids
ART-FND-CYANIDE-POISONING-COMPLEX-IV

## related_article_ids
ART-FND-LECITHIN-SYNTHESIS-CDP-CHOLINE

## related_concept_ids
CON-FND-0CA8047810DF78 | CON-FND-A3BC299ED2C7C9 | CON-FND-8771AB893CA4C3

## resource_ids
RES-WEB-BIOCHEM-AHERN-FREEFORALL

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
au

## blueprint_weight
0.45

## exam_weight_by_year
AU_Y1=0.45

## clinical_relevance
0.75

## academic_relevance
0.8

## weight_confidence
0.35

## confidence
0.9

## exam_signal
src_01ab4268402d32d4d111 | dept_bank | | p54-55 | MED 102

## atomic_claim_ids
CLM-FND-CYANIDE-COMPLEX-IV-01

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
[AFM Biochemistry Questions, Bioenergetics Q3] Death due to cyanide poisoning is a result of: a- Cyanide hemoglobin complex formation. b- Cyanide inhibiting complex I of respiratory chain. c- Cyanide inhibiting cytochrome oxidase. d- Cyanide blocking oxygen transport in blood. [Key: c] (Also Q12, keyed independently: Cyanide poisoning inhibits cytochrome oxidation at which of the following locations in the electron transport chain? a- Complex I. b- Complex II. c- Complex III. d- Complex IV. [Key: d])

## merge_ids
[clear]

## rejected_merge_candidate_ids
[clear]

## conflicts
[clear]

## uncertainty
None recorded — both AFM items key consistently with standard teaching (cytochrome oxidase is Complex IV).

## evidence_gaps
No AU-MED-102 department lecture or book text covers bioenergetics or the electron transport chain at all. Authored against RES-WEB-BIOCHEM-AHERN-FREEFORALL, Ch. 5 (Energy), per the standing order for this gap.

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
microtopicId: The AFM bank tests this as two separate questions inside its twelve-question Bioenergetics run; the canonical tree has no node finer than DIS-BIO-T01.
nanotopicId: No nanotopic exists below the microtopic level for bioenergetics.
approvedFileResourceIds: No file resource has been rights-cleared for this concept.
approvedVideoResourceIds: No video resource has been rights-cleared for this concept.
resourceOccurrenceIds: Hand-authored; no corpus extraction record.
sourceCandidateIds: find-existing.mjs run for "cyanide", "complex IV", "ubiquinone" and "cytochrome oxidase" — no existing concept states the cyanide/Complex IV mechanism; grep -ril "cyanide" docs/*-Source-Imports/concept/ returns nothing.
lastReviewed: New record; not yet reviewed.
reviewDue: Set when the first review completes.
exclusionReason: Not excluded.
rejectedMergeCandidateIds: None found.
relationships: related_concept_ids links the three pending bioenergetics concepts this AFM section's other questions test (proton pumps/coupling sites, ETC components, terminal oxygen acceptor), since a question on any of them may reasonably use this concept as a contextual neighbour. No typed edges are written — this lane authors no relations file.
questionIds: AFM Bioenergetics Q3 and Q12 (src_01ab4268402d32d4d111) — authored as QST-FND-CYANIDE-COMPLEX-IV-001 and -002.
