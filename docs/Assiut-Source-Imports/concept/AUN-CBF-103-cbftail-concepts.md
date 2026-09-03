<!--
  AUN-CBF-103 -- new concepts minted from "All quizzes CBF .pdf" (lane 4,
  branch aun-cbf103-author4), the OCR'd pp.91-149 authoring batch (dispatch
  scope: pp.91+, the window lane 3 left open; OCR extended through p210 this
  pass but only pp.91-149 are authored here, see coverage/AUN-CBF-103-triage.md
  "S3 lane 4 addendum"). Every canonical_key below was confirmed NEW by
  find-existing.mjs plus a broad grep -ril across every docs/*-Source-Imports
  root and docs/import-ready before minting -- search terms recorded in the
  triage addendum's "Concept search notes (lane 4)". This source is a Moodle
  attempt-review export (no accompanying department lecture deck); teaching
  text is drawn from the bank's own stems and printed "The correct answer
  is:" keys, cross-checked against standard undergraduate physiology and
  biochemistry teaching, and cited to src_f7e45bae9ce161e08d46
  (evidence/AUN-CBF-103-allquizzes-resources.md).

  Import: Admin > Concepts import.
-->

# Item

## id
CON-NEU-0023C82A30A2CA

## label
A nerve impulse (action potential) is an electrochemical event -- a self-propagating, all-or-none reversal of membrane potential driven by the rapid movement of ions across the membrane, not a flow of electrons or a purely chemical secretion

## canonical_key
nerve.impulse.electrochemical-nature-general

## aliases
Nerve impulse
Definition of the action potential
Electrochemical conduction
All-or-none law

## arabic_label
الطبيعة الكهروكيميائية للسيال العصبي

## arabic_aliases
جهد الفعل
قانون الكل أو لا شيء

## definition
A nerve impulse is electrochemical in nature: it is not a flow of electrons along the membrane the way current runs through a copper wire, and it is not purely chemical either, in the sense of a diffusing secretion with no electrical component. Instead it is the rapid, self-propagating movement of positively charged ions -- principally sodium inward during depolarisation and potassium outward during repolarisation -- back and forth across the excitable membrane, each local ion movement changing the membrane potential enough to trigger the same voltage-gated response in the adjacent patch of membrane. This combination of a chemical event (ion movement down electrochemical gradients through specific channels) with an electrical consequence (a measurable, propagating change in membrane voltage) is exactly what "electrochemical" means here, and it is why the impulse can be recorded as a voltage change yet is fundamentally powered by ion movement rather than by free electrons. The impulse also obeys the all-or-none law once threshold is reached: it propagates at full amplitude along the whole fibre, unlike a chemical concentration gradient that simply fades with distance or an electrical signal in a wire that would need continuous chemical maintenance.

## explicit_objective
State that the nerve impulse is electrochemical -- ionic movement producing a propagating voltage change -- and distinguish this from a purely electrical (electron-flow) or purely chemical (diffusion-only) description.

## pitfalls
Choosing "chemical" alone because ion movement sounds like chemistry, or "electrical" alone because it is recorded as a voltage. Both miss the point: the impulse is defined by ions (a chemical species) moving across a membrane and thereby producing an electrical signal, so only "electrochemical" captures both halves correctly.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Nerve Physiology

## subtopic
Action potential fundamentals

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBFTAIL-NERVE

## related_article_ids

## related_concept_ids
CON-NEU-9C5CF2053BB854
CON-NEU-DD9033DCA3AAF1

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.3

## exam_weight_by_year
AUN_Y1=0.3

## clinical_relevance
0.4

## academic_relevance
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The nerve impulse ... Is electrochemical in nature, and involves the rapid movement of positively charged ions back and forth across cell membranes" (Quiz23&24 handout Q1, p92).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "nerve impulse electrochemical" and "nerve impulse definition ion movement across membrane" -- 0 hits; broad grep -ril "electrochemical" across docs/*-Source-Imports/concept surfaced only active-transport and smooth-muscle-coupling concepts, none stating this as the general definition of a nerve impulse -- safe to create.
relationships: companion to this lane's own lane-1 concept CON-NEU-9C5CF2053BB854 (depolarisation = rising Na+ permeability) and to the reused pending Kasr repolarisation concept CON-NEU-DD9033DCA3AAF1 -- this record is the general "what is a nerve impulse" definition those two mechanistic records assume.

---

# Item

## id
CON-FND-43CE940A66A057

## label
Glucose homeostasis is coordinated by several organs with distinct jobs: pancreatic beta cells secrete insulin (alpha cells secrete glucagon), the kidney reabsorbs essentially all filtered glucose under the renal threshold, thyroid hormone raises intestinal glucose absorption, and the liver acts as the body's "glucostat," buffering blood glucose by storing or releasing it

## canonical_key
glucose.homeostasis.organ-roles-islet-kidney-liver-gut

## aliases
Glucose homeostasis
Pancreatic islet cells
Renal glucose reabsorption
Liver as glucostat
Thyroid hormone and glucose absorption

## arabic_label
تنظيم مستوى الجلوكوز في الدم -- أدوار الأعضاء

## arabic_aliases
خلايا بيتا البنكرياسية
الكبد كمنظم للجلوكوز

## definition
Several organs cooperate to keep blood glucose within a narrow range, and each has a distinct, testable job. Within the pancreatic islets, the beta cells are the ones that secrete insulin, the main hypoglycaemic hormone, while the alpha cells secrete the hyperglycaemic hormone glucagon -- a fact tested directly by asking which islet cell type makes insulin. The kidney's role is reabsorptive rather than synthetic: the renal tubules reabsorb essentially all of the glucose filtered at the glomerulus as long as the filtered load stays below the renal threshold, which is why glucose does not normally appear in urine. Thyroid hormone's contribution is at the gut: it raises the rate of intestinal glucose absorption, on top of its many other metabolic effects, so a question naming "the hormone that increases glucose absorption from the intestine" is pointing at thyroid hormone rather than insulin or glucagon, neither of which acts at the enterocyte's absorptive step. Finally, the liver is often called the body's glucostat because it senses blood glucose and buffers it in both directions -- taking up and storing glucose as glycogen when levels rise, and releasing glucose from glycogenolysis and gluconeogenesis when they fall -- more directly than any other organ.

## explicit_objective
State which pancreatic islet cell secretes insulin, describe the kidney's reabsorptive role in glucose handling, name thyroid hormone as a stimulus for intestinal glucose absorption, and identify the liver as the organ that buffers blood glucose (the "glucostat").

## pitfalls
Assuming every glucose-regulation question must be about insulin or glucagon. This bank specifically tests the supporting cast -- the kidney's reabsorptive threshold, thyroid hormone's absorptive effect at the gut, and the liver's buffering role -- and answering "insulin" or "pancreas" by reflex misses what each stem is actually asking about.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Endocrine Physiology

## subtopic
Glucose homeostasis

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBFTAIL-GLUCOSE-GLYCOGEN

## related_article_ids

## related_concept_ids
CON-END-85750744126501

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.35

## exam_weight_by_year
AUN_Y1=0.35

## clinical_relevance
0.5

## academic_relevance
0.6

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Insulin is secreted by what type of cells in the pancreas ... Beta cells"; "What is the key role of the kidney in glucose regulation ... Reabsorption of glucose"; "The hormone that increase glucos absorption from intestine ... Thyroid"; "The glucostat of the body is ... Liver" (Quiz28 Q1-Q4, pp.96-97).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "insulin beta cells pancreas secretion" -- 0 hits; broad grep -ril "beta cells|pancreatic beta" returned only the Kasr 103-BMS type-1-vs-type-2 diabetes concept (CON-END-85750744126501, reused separately for the C-peptide question) and an unrelated Zagazig record -- none states the basic islet-cell/kidney/thyroid/liver roles this cluster of four questions tests. Consolidated into one concept rather than four, per this module's established practice (lane 2/3) of grouping several distinct-but-small facts that one exam block tests together, since fragmenting "which organ does what in glucose regulation" into four singleton records would not change what a student needs to master.
relationships: related_concept_ids links to CON-END-85750744126501 (pending Kasr type-1-vs-type-2 diabetes, reused via overlay in this same authoring pass for the C-peptide question) since both sit under the same glucose-homeostasis umbrella.

---

# Item

## id
CON-FND-E4EF5D0C7E32ED

## label
Glycogen synthesis needs a protein primer, glycogenin, onto which the first glucose residues are attached before glycogen synthase can extend the chain; glycogen synthase itself is the enzyme insulin activates to build glycogen in resting muscle after a meal

## canonical_key
glycogenesis.glycogenin-primer-and-insulin-activation

## aliases
Glycogenin
Glycogen synthase
Insulin and glycogen synthesis
Glycogenesis priming

## arabic_label
تخليق الجليكوجين -- البروتين البادئ وتفعيل الأنسولين

## arabic_aliases
جليكوجينين
إنزيم جليكوجين سينثيز

## definition
Glycogen cannot simply begin forming on a bare glucose molecule; the first several glucose units are covalently attached to a specific protein primer, glycogenin, which auto-glucosylates itself and then serves as the core that the growing glycogen chain is built out from. Once that primer exists, glycogen synthase is the enzyme responsible for extending the chain, adding glucose units in alpha-1,4 linkage from UDP-glucose. In resting muscle after a carbohydrate meal, insulin is the signal that activates glycogen synthase (by promoting its dephosphorylation), which is why muscle glycogen storage rises specifically under the high-insulin state that follows eating, and why a professional athlete replenishing glycogen after training is described as doing so under insulin's action rather than glucagon's or epinephrine's, both of which move glycogen metabolism the opposite way.

## explicit_objective
Name glycogenin as the protein primer glycogen synthesis is built onto, and state that insulin activates glycogen synthase to promote glycogen storage in resting muscle.

## pitfalls
Confusing glycogenin (the primer glycogen synthesis starts from) with glycogen synthase (the enzyme that extends the chain) or with glycogen phosphorylase (the enzyme of the opposite, breakdown pathway). The three names sound similar but describe three different roles: starting the chain, building it, and dismantling it.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Carbohydrate Metabolism

## subtopic
Glycogen synthesis

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBFTAIL-GLUCOSE-GLYCOGEN

## related_article_ids

## related_concept_ids
CON-FND-3905E3B98C2EC4
CON-FND-F3DBB1774F2BED

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.35

## exam_weight_by_year
AUN_Y1=0.35

## clinical_relevance
0.4

## academic_relevance
0.6

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Glycogenin is ... Protein primer for glycogen synthesis" (Quiz29&30 Q1, p101); "The activity of muscle glycogen synthase in resting muscles is increased by the action of which of the following? ... Insulin" (Quiz29&30 Q5, p103).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "glycogenin protein primer glycogen synthesis" and "glycogen synthase insulin activation" -- 0 hits each; broad grep -ril "glycogenin" across docs/*-Source-Imports/concept returned nothing -- safe to create. Consolidated Quiz29&30 Q1 and Q5 into one concept since both test the glycogen-synthesis (as opposed to breakdown) side of glycogen metabolism.
relationships: related_concept_ids links to CON-FND-3905E3B98C2EC4 (pending Kasr glycogenolysis/phosphorylase concept, the breakdown-side counterpart reused in this same pass) and to this lane's own CON-FND-F3DBB1774F2BED (Cori's disease), both under the same glycogen-metabolism umbrella.

---

# Item

## id
CON-FND-F3DBB1774F2BED

## label
Cori's disease (glycogen storage disease type III) is caused by absence of the glycogen debranching enzyme, so glycogen breakdown stalls at each branch point and only the short outer branches can be removed

## canonical_key
glycogenosis.cori-disease-debranching-enzyme-deficiency

## aliases
Cori's disease
Glycogen storage disease type III
Debranching enzyme deficiency
Limit dextrinosis

## arabic_label
مرض كوري -- نقص إنزيم إزالة التفرع

## arabic_aliases
داء تخزين الجليكوجين النوع الثالث

## definition
Cori's disease, also called glycogen storage disease type III or limit dextrinosis, is caused by deficiency of the glycogen debranching enzyme, the enzyme that normally removes the branch points glycogen phosphorylase itself cannot cleave. Without it, glycogenolysis stops after phosphorylase has stripped away the outer chains down to about four residues from each branch, leaving a characteristic abnormal, short-branched "limit dextrin" structure rather than releasing the glucose that lies beyond the branch point. Clinically this produces a milder picture than the phosphatase deficiency of Von Gierke's disease, because some glucose can still be mobilised from the unbranched portions of the molecule; the enzyme this bank asks about (debranching enzyme) is specifically the one whose absence defines Cori's disease, distinguishing it from Von Gierke's (glucose 6-phosphatase), McArdle's (muscle phosphorylase), Pompe's (lysosomal acid maltase) and Andersen's (branching enzyme) diseases in the same family.

## explicit_objective
Name debranching enzyme deficiency as the defect in Cori's disease and distinguish it from the enzyme defects of the other glycogen storage diseases in the same differential list.

## pitfalls
Confusing Cori's disease (debranching enzyme, type III) with Von Gierke's disease (glucose 6-phosphatase, type I) or Andersen's disease (branching enzyme, type IV) -- three different enzymes in three different diseases whose names and roles are easy to swap under exam pressure.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Carbohydrate Metabolism

## subtopic
Glycogen storage diseases

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBFTAIL-GLUCOSE-GLYCOGEN

## related_article_ids

## related_concept_ids
CON-FND-1BE461A57AB76D
CON-FND-E4EF5D0C7E32ED

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.3

## exam_weight_by_year
AUN_Y1=0.3

## clinical_relevance
0.6

## academic_relevance
0.55

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Debranching enzyme is absent in ... Cori's disease" (Quiz29&30 Q2, p101).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "Cori disease debranching enzyme" -- 0 hits; broad grep -n "Cori.s disease|Andersen|glycogenin|McArdle|Pompe" across docs/Kasr-Source-Imports/concept/103-BMS-mcq-carbohydrate-concepts.md (the corpus's richest glycogen-metabolism file, already reused twice in this same batch for Von Gierke's and phosphorylase) returned no hits -- confirmed new.
relationships: related_concept_ids links to the reused pending Kasr Von Gierke's concept CON-FND-1BE461A57AB76D (the type I sibling disease in the same quiz block) and to this lane's own CON-FND-E4EF5D0C7E32ED (glycogenesis, the synthesis-side counterpart).

---

# Item

## id
CON-FND-A902B6A3287C5D

## label
Brown fat is more important than shivering for heat production in the neonate, generating heat by uncoupled mitochondrial oxidation (non-shivering thermogenesis) under sympathetic (not parasympathetic) stimulation

## canonical_key
thermoregulation.brown-fat-neonatal-non-shivering

## aliases
Brown adipose tissue
Non-shivering thermogenesis
Neonatal thermoregulation
Uncoupling protein thermogenin

## arabic_label
الدهون البنية والتوليد الحراري غير الارتعاشي عند الوليد

## arabic_aliases
التوليد الحراري غير الارتعاشي

## definition
Brown adipose tissue is a specialised fat depot, rich in mitochondria (which give it its colour) and richly supplied by sympathetic nerve fibres, that generates heat directly rather than by mechanical work. Sympathetic stimulation of brown fat activates a mitochondrial uncoupling protein (thermogenin, UCP1) that lets protons leak back across the inner mitochondrial membrane without driving ATP synthase, so the energy of the proton gradient is dissipated as heat instead -- this is non-shivering thermogenesis. In the neonate, whose shivering mechanism is still immature and who has a large surface-area-to-mass ratio that makes heat loss especially dangerous, brown fat is more important than shivering as a defence against cold, in contrast to the adult, where brown fat is relatively scarce and shivering dominates. The stimulation is sympathetic, not parasympathetic, consistent with the sympathetic nervous system's general role in mobilising the body's responses to cold and stress.

## explicit_objective
State that brown fat is more important than shivering for neonatal thermoregulation, and that it generates heat through sympathetically driven, uncoupled (non-shivering) mitochondrial oxidation.

## pitfalls
Assuming brown fat works through the same mechanism as shivering (mechanical muscle work) or is stimulated by the parasympathetic system. Its heat production is chemical/mitochondrial, not mechanical, and its nerve supply is sympathetic, matching the general pattern that cold defence is a sympathetic function.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Thermoregulation

## subtopic
Non-shivering thermogenesis

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBFTAIL-THERMOREGULATION

## related_article_ids

## related_concept_ids
CON-FND-65DED043238250

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.3

## exam_weight_by_year
AUN_Y1=0.3

## clinical_relevance
0.45

## academic_relevance
0.55

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Brown fat is ... Is more important than shivering in neonatal thermoregulation" (Quiz58&59 Q6, p111).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "brown fat neonatal thermoregulation" -- 0 hits, confirmed new.
relationships: related_concept_ids links to this module's own lane-1 concept CON-FND-65DED043238250 (cold-exposure response: muscle tone, catecholamines, cutaneous vasoconstriction), the shivering/sympathetic side of cold defence this record's non-shivering mechanism contrasts with.

---

# Item

## id
CON-FND-B1B0C0880006D2

## label
Following adaptation (acclimatization) to a hot climate, the body's ability to lose heat by sweating increases -- the sweat glands hypertrophy and sweat output rises, while the salt content of the sweat falls under aldosterone's action

## canonical_key
thermoregulation.heat-acclimatization-sweat-capacity

## aliases
Heat acclimatization
Sweat gland adaptation
Acclimatization to hot climate

## arabic_label
التأقلم مع المناخ الحار وزيادة القدرة على التعرق

## arabic_aliases
التأقلم الحراري

## definition
Repeated exposure to a hot climate produces acclimatization, a set of adaptations that improve the body's capacity to lose heat by evaporation specifically through sweating. The eccrine sweat glands hypertrophy and become more responsive, so a given thermal stimulus produces a larger sweat output than it would in an unacclimatized person, meaning the single adaptation most directly tested is an increased ability to lose heat by sweating. At the same time, aldosterone secretion rises during acclimatization and acts on the sweat gland duct to reabsorb more sodium, so the sweat produced becomes progressively more dilute (lower salt content) even as its total volume rises, protecting the acclimatized person from the salt depletion that would otherwise accompany heavy sweating. Basal metabolic rate, muscle tone and urinary output are not what acclimatization changes; the adaptation is specifically in the sweating mechanism.

## explicit_objective
State that heat acclimatization increases the capacity to lose heat by sweating, through sweat gland hypertrophy and aldosterone-driven salt conservation in the sweat itself.

## pitfalls
Choosing basal metabolic rate, muscle tone or urinary output as what improves with heat acclimatization. The adaptation is specific to the sweating mechanism -- greater sweat volume with lower salt loss -- not a general rise in metabolic activity.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Thermoregulation

## subtopic
Heat acclimatization

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBFTAIL-THERMOREGULATION

## related_article_ids

## related_concept_ids
CON-FND-15848C8393D66F

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.3

## exam_weight_by_year
AUN_Y1=0.3

## clinical_relevance
0.4

## academic_relevance
0.5

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Following adaptation to a hot climate there is an increase in ... The ability to lose heat by sweating" (Quiz58&59 Q8, p111).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "heat acclimatization sweating" -- 0 hits, confirmed new.
relationships: related_concept_ids links to this module's own lane-1 concept CON-FND-15848C8393D66F (eccrine sweat glands as the true thermoregulatory glands), the baseline sweating-mechanism record this concept describes an adaptation of.

---

# Item

## id
CON-FND-7BC76180FF59BC

## label
Pulmonary surfactant, mainly dipalmitoyl phosphatidylcholine (DPPC) made by type II pneumocytes, lowers alveolar surface tension; in infant (neonatal) respiratory distress syndrome, prematurity leaves DPPC concentration lower than in a full-term baby, causing alveolar collapse

## canonical_key
lung.surfactant.dppc-and-respiratory-distress-syndrome

## aliases
Pulmonary surfactant
Dipalmitoyl phosphatidylcholine
Infant respiratory distress syndrome
Type II pneumocytes

## arabic_label
الفاعل بالسطح الرئوي ومتلازمة الضائقة التنفسية عند الوليد

## arabic_aliases
الفوسفاتيديل كولين ثنائي البالميتويل
متلازمة الضائقة التنفسية عند الوليد

## definition
Pulmonary surfactant is a phospholipid-rich mixture, secreted by type II pneumocytes, whose principal component is dipalmitoyl phosphatidylcholine (DPPC). By interposing itself at the air-liquid interface, DPPC lowers alveolar surface tension, which is what keeps small alveoli from collapsing on expiration and reduces the work of breathing. Surfactant production rises through gestation and typically reaches an adequate level only later in the third trimester, so an infant born at 28 weeks has too few mature type II pneumocytes and too little time to have accumulated a full surfactant supply; the resulting DPPC concentration is lower than in a full-term baby, not higher or unchanged, and it is this deficiency -- not an excess lecithin/sphingomyelin ratio or an unrelated cause -- that produces the alveolar collapse, hyaline membranes and respiratory distress of the syndrome. Because the deficit is one of production time rather than of an untreatable process, giving surfactant (or, antenatally, corticosteroids to accelerate the infant's own production) is the direct, mechanism-based treatment.

## explicit_objective
State that dipalmitoyl phosphatidylcholine (surfactant) is lower than normal in a premature infant with respiratory distress syndrome, and that this deficiency, not an excess, drives the alveolar collapse.

## pitfalls
Assuming the lecithin/sphingomyelin ratio in the amniotic fluid is high in an affected infant. It is precisely a low L/S ratio that signals surfactant immaturity and predicts respiratory distress syndrome; a ratio above two is reassuring, not diagnostic of the disease.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Lipid Biochemistry

## subtopic
Phospholipids and surfactant

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBFTAIL-LIPIDS

## related_article_ids

## related_concept_ids
CON-FND-F36385D669CF3A

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.35

## exam_weight_by_year
AUN_Y1=0.35

## clinical_relevance
0.6

## academic_relevance
0.5

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"An infant born at 28 weeks of gestation ... infant respiratory distress syndrome ... The concentration of dipalmitoyl phosphatidylcholine would be expected to be lower than that of a full-term baby" (Quiz31&32 Q1, p118).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "surfactant dipalmitoyl phosphatidylcholine RDS" -- 0 hits, confirmed new.
relationships: related_concept_ids links to this lane's own CON-FND-F36385D669CF3A (glycerophospholipid classification), since DPPC is itself a glycerophospholipid (a phosphatidylcholine species).

---

# Item

## id
CON-FND-F36385D669CF3A

## label
Glycerophospholipids (lecithin, plasmalogen, cardiolipin, phosphatidylinositol, phosphatidylserine, phosphatidylethanolamine) share a glycerol backbone and are structurally distinct from sphingolipids such as sphingomyelin; among them, phosphatidylinositol is the specific one that acts as the precursor for intracellular second messengers

## canonical_key
glycerophospholipid.classification-and-phosphatidylinositol-signalling

## aliases
Glycerophospholipids
Sphingomyelin classification
Phosphatidylinositol second messenger
Lecithin, plasmalogen, cardiolipin

## arabic_label
الفوسفوليبيدات الجليسريدية وإشارات الفوسفاتيديل إينوزيتول

## arabic_aliases
الفوسفاتيديل إينوزيتول

## definition
Glycerophospholipids are membrane lipids built on a glycerol backbone bearing two fatty acid chains and a phosphate-linked head group; the family includes lecithin (phosphatidylcholine), phosphatidylethanolamine, phosphatidylserine, phosphatidylinositol, plasmalogens and cardiolipin. Sphingomyelin, by contrast, is a sphingolipid: it is built on a sphingosine backbone rather than glycerol, so despite superficially resembling the glycerophospholipids in membrane behaviour, it is structurally the odd one out when a question asks "which of these is NOT a glycerophospholipid." Among the true glycerophospholipids, phosphatidylinositol has a distinctive further role beyond membrane structure: hormone or neurotransmitter binding to a receptor can trigger phospholipase C to cleave membrane phosphatidylinositol bisphosphate into two intracellular second messengers, inositol trisphosphate (which releases calcium from the endoplasmic reticulum) and diacylglycerol (which activates protein kinase C) -- making phosphatidylinositol, specifically, the glycerophospholipid that functions as a second-messenger precursor, a role lecithin, phosphatidylserine and phosphatidylethanolamine do not share.

## explicit_objective
Classify sphingomyelin as a sphingolipid rather than a glycerophospholipid, and identify phosphatidylinositol as the glycerophospholipid that serves as the precursor for intracellular second messengers.

## pitfalls
Grouping sphingomyelin with lecithin, plasmalogen and cardiolipin because all four are phospholipids found in cell membranes. "Phospholipid" is the broader category; "glycerophospholipid" specifically requires a glycerol backbone, which sphingomyelin's sphingosine backbone does not have.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Lipid Biochemistry

## subtopic
Phospholipid classification

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBFTAIL-LIPIDS

## related_article_ids

## related_concept_ids
CON-FND-7BC76180FF59BC

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.35

## exam_weight_by_year
AUN_Y1=0.35

## clinical_relevance
0.35

## academic_relevance
0.6

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which out of the following is not a Glycerophospholipid? ... Sphingomyelin" (Quiz31&32 Q3, p119-120); "Choose the Glycerophospholipid that acts as a precursor for second messenger ... Phosphatidyl Inositol" (Quiz31&32 Q4, p121).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "glycerophospholipid phosphatidylinositol second messenger" -- 0 hits, confirmed new.
relationships: related_concept_ids links to this lane's own CON-FND-7BC76180FF59BC (DPPC/surfactant), a specific glycerophospholipid species covered by this same authoring pass.

---

# Item

## id
CON-FND-5E095521CE7B1C

## label
Essential fatty acids (linoleic and its metabolic precursor linolenic-related omega families) cannot be synthesized by the human body and must come from the diet, unlike non-essential fatty acids such as oleic, palmitic and stearic acid, which the body can make endogenously

## canonical_key
fattyacid.essential-versus-nonessential-classification

## aliases
Essential fatty acids
Linoleic acid
Non-essential fatty acids
Oleic, palmitic, stearic acid

## arabic_label
الأحماض الدهنية الأساسية مقابل غير الأساسية

## arabic_aliases
حمض اللينوليك
الأحماض الدهنية الأساسية

## definition
Essential fatty acids are those the human body lacks the enzymes (specifically the desaturases needed to introduce a double bond beyond carbon 9) to synthesize, so they must be obtained from the diet; linoleic acid is the classic example and the parent of the omega-6 series. Non-essential fatty acids -- oleic acid, palmitic acid and stearic acid among them -- can be synthesized endogenously from acetyl-CoA and are not dietary requirements in the same sense, so a stem asking "all of the following are non-essential fatty acids EXCEPT" is testing recognition that linolenic (an omega-3 essential fatty acid, alongside linoleic) is the one the body cannot make, while oleic, palmitic and stearic acid are all ones it can. This essential/non-essential distinction matters clinically because a diet deficient in linoleic acid produces a recognisable deficiency syndrome (scaly dermatitis, impaired growth), which no amount of oleic, palmitic or stearic acid in the diet can substitute for.

## explicit_objective
Identify linoleic acid (and the related omega-3/omega-6 essential fatty acids) as ones the body cannot synthesize and must obtain from the diet, distinguishing them from non-essential fatty acids such as oleic, palmitic and stearic acid.

## pitfalls
Assuming any polyunsaturated fatty acid is automatically essential. Essentiality is defined specifically by whether the body's desaturase enzymes can introduce the needed double bond, not by chain length or degree of unsaturation in general.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Lipid Biochemistry

## subtopic
Fatty acid classification

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBFTAIL-LIPIDS

## related_article_ids

## related_concept_ids
CON-FND-0A21F9F3BFC086

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.3

## exam_weight_by_year
AUN_Y1=0.3

## clinical_relevance
0.35

## academic_relevance
0.55

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"All are non-essential fatty acids except ... Linolenic" (Quiz31&32 Q6, p122-123); "A fatty acid which is not synthesized in human body and has to be supplied in the diet is ... Linoleic acid" (Quiz31&32 Q9, p126).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "essential fatty acid linoleic linolenic" -- 0 hits, confirmed new.
relationships: related_concept_ids links to this lane's own CON-FND-0A21F9F3BFC086 (fatty acid carbon-chain/double-bond nomenclature), the structural counterpart this classification concept pairs with.

---

# Item

## id
CON-FND-0A21F9F3BFC086

## label
A fatty acid's carbon-chain length and number of double bonds identify it: palmitoleic acid is a 16-carbon fatty acid with one double bond, and arachidonic acid is a 20-carbon fatty acid with four double bonds (the eicosanoid precursor)

## canonical_key
fattyacid.carbon-chain-and-double-bond-nomenclature

## aliases
Palmitoleic acid
Arachidonic acid
Fatty acid nomenclature
Carbon chain length and double bonds

## arabic_label
تسمية الأحماض الدهنية حسب عدد الكربونات والروابط المزدوجة

## arabic_aliases
حمض البالميتوليك
حمض الأراكيدونيك

## definition
Fatty acids are named and classified by two structural features together: the number of carbons in the chain and the number of carbon-carbon double bonds it carries. Palmitoleic acid is a 16-carbon monounsaturated fatty acid (one double bond), distinguishing it from the saturated 16-carbon palmitic acid and from longer or more unsaturated chains such as erucic or elaidic acid. Arachidonic acid is a 20-carbon polyunsaturated fatty acid with four double bonds, derived in the body from the essential fatty acid linoleic acid, and it is specifically this 20-carbon, four-double-bond structure that makes arachidonic acid the substrate for the cyclooxygenase and lipoxygenase pathways that generate the eicosanoids (prostaglandins, thromboxanes and leukotrienes). Reading a fatty-acid stem therefore means extracting both numbers -- chain length and double-bond count -- since either one alone (for example "20 carbons" without specifying unsaturation) would not uniquely identify the fatty acid being asked about.

## explicit_objective
Match a stated carbon-chain length and double-bond count to the correct named fatty acid, specifically palmitoleic acid (16:1) and arachidonic acid (20:4).

## pitfalls
Focusing only on chain length or only on double-bond count. Both numbers are needed together: a 16-carbon chain could be palmitic (0 double bonds) or palmitoleic (1 double bond), and a 20-carbon chain could be arachidic (0), eicosapentaenoic (5) or arachidonic (4) depending on unsaturation.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Lipid Biochemistry

## subtopic
Fatty acid structure

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBFTAIL-LIPIDS

## related_article_ids

## related_concept_ids
CON-FND-5E095521CE7B1C

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.3

## exam_weight_by_year
AUN_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.55

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which out of the following is a fatty acid with 16 carbon atoms and one double bond? ... Palmitoleic acid" (Quiz31&32 Q7, p123-124); "Choose out of the following, a fatty acid with 20 carbon atoms and four double bonds ... Arachidonic acid" (Quiz31&32 Q10, p126-127).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "essential fatty acid linoleic linolenic" (adjacent search covering fatty-acid nomenclature terms) -- 0 hits, confirmed new.
relationships: related_concept_ids links to this lane's own CON-FND-5E095521CE7B1C (essential vs non-essential fatty acid classification), the functional counterpart to this structural-nomenclature record.

---

# Item

## id
CON-FND-A7DECCECA5611B

## label
Gangliosides -- sphingolipids carrying oligosaccharide chains with one or more sialic acid residues, concentrated in neuronal membranes -- are the specific lipid receptor cholera toxin binds in the intestinal epithelium to trigger its diarrhoeal action

## canonical_key
sphingolipid.ganglioside-cholera-toxin-receptor

## aliases
Gangliosides
Cholera toxin receptor
GM1 ganglioside
Sphingolipid receptor

## arabic_label
الغانغليوسيدات ومستقبل سم الكوليرا

## arabic_aliases
الغانغليوسيد

## definition
Gangliosides are sphingolipids -- built on a ceramide (sphingosine plus a fatty acid) backbone -- carrying an oligosaccharide head group that includes one or more sialic acid (N-acetylneuraminic acid) residues, which gives them a negative charge and concentrates them especially in neuronal cell membranes, where they participate in cell recognition and signalling. In the intestinal epithelium, a specific ganglioside, GM1, is the membrane receptor cholera toxin binds; toxin binding to GM1 triggers persistent activation of adenylyl cyclase inside the enterocyte, driving the massive cAMP-mediated chloride and water secretion responsible for cholera's profuse watery diarrhoea. Other sphingolipids in the same family -- galactocerebroside (a simple glycosphingolipid), sphingomyelin (a phosphosphingolipid) and lecithin (a glycerophospholipid, not a sphingolipid at all) -- do not serve this receptor role; it is specifically the sialic-acid-bearing ganglioside structure that cholera toxin recognises.

## explicit_objective
Identify ganglioside as the sphingolipid that serves as the intestinal receptor for cholera toxin.

## pitfalls
Choosing galactocerebroside or sphingomyelin because both are also sphingolipids found in membranes. The receptor role is specific to the ganglioside's sialic-acid-bearing oligosaccharide head group, which the simpler cerebrosides and sphingomyelin do not carry.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Lipid Biochemistry

## subtopic
Sphingolipids

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBFTAIL-LIPIDS

## related_article_ids

## related_concept_ids
CON-FND-F36385D669CF3A

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.3

## exam_weight_by_year
AUN_Y1=0.3

## clinical_relevance
0.5

## academic_relevance
0.5

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which type of lipid is a receptor for cholera toxin in the intestine? ... Ganglioside" (Quiz31&32 Q8, p124-125).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "ganglioside cholera toxin receptor" -- 0 hits, confirmed new.
relationships: related_concept_ids links to this lane's own CON-FND-F36385D669CF3A (glycerophospholipid classification), the glycerol-backbone family this sphingolipid record contrasts with.

---

# Item

## id
CON-FND-EF9977457D3792

## label
Transaminases (aminotransferases) catalyze transfer of an amino group from an amino acid to an alpha-keto acid, forming a new amino acid and a new keto acid without net loss of nitrogen; clinically, a rise in serum GOT (AST) activity is a classic marker of tissue damage, including myocardial infarction

## canonical_key
transaminase.ketoacid-formation-and-mi-marker

## aliases
Transaminases
Aminotransferases
GOT
AST
Serum glutamate-oxaloacetate transaminase
Myocardial infarction enzyme marker

## arabic_label
إنزيمات نقل الأمين ودلالتها في احتشاء عضلة القلب

## arabic_aliases
إنزيم الترانس أميناز
GOT / AST

## definition
Transaminases (aminotransferases) catalyze the reversible transfer of an amino group from an amino acid onto an alpha-keto acid acceptor, using pyridoxal phosphate as coenzyme; the amino acid donor becomes a new keto acid (its former amino group now gone) and the keto acid acceptor becomes a new amino acid, so the overall reaction forms keto acids from amino acids without any net removal of the nitrogen from the body, only its relocation onto a different carbon skeleton -- this distinguishes transamination from oxidative deamination, hydrolysis or decarboxylation, none of which describe what a transaminase does. Serum glutamate-oxaloacetate transaminase (GOT), also called aspartate aminotransferase (AST), is present in high concentration in cardiac and liver tissue, and when either tissue is damaged the enzyme leaks into the blood; a rise in serum GOT/AST activity is accordingly a classic (if non-specific, since it also rises after liver damage) marker used to help detect myocardial infarction, historically one of the first cardiac enzyme markers used before troponin and CK-MB became standard.

## explicit_objective
State that transaminases form keto acids from amino acids by transferring an amino group (not by removing CO2 or hydrolysing the protein), and that serum GOT (AST) activity rises after myocardial infarction.

## pitfalls
Confusing transamination (amino-group transfer between an amino acid and a keto acid, catalysed by a transaminase) with oxidative deamination (net removal of the amino group as free ammonia, catalysed by glutamate dehydrogenase). Both involve amino acids and ammonia handling, but only oxidative deamination actually removes nitrogen from the amino-acid pool.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Amino Acid Metabolism

## subtopic
Transamination and clinical enzymology

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBFTAIL-NITROGEN

## related_article_ids

## related_concept_ids
CON-FND-9393EA8A25D95A

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.35

## exam_weight_by_year
AUN_Y1=0.35

## clinical_relevance
0.6

## academic_relevance
0.55

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Transaminases catalyze: ... The formation of ketoacids from amino acids" (Quiz41&42 Q1, p143); "Serum glutamate -- oxaloacetate transaminase (GOT): ... Activity is raised after myocardial infarction" (Quiz41&42 Q2, p144).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "transaminase ketoacid amino acid" and "GOT AST myocardial infarction transaminase" -- 0 hits each, confirmed new. Consolidated Quiz41&42 Q1 and Q2 into one concept since both test the same transaminase enzyme family -- its general reaction and its clinical (GOT/AST) marker use.
relationships: related_concept_ids links to this lane's own CON-FND-9393EA8A25D95A (urea cycle: OTC and enzyme-deficiency hyperammonaemia), the downstream nitrogen-disposal pathway this transamination record feeds into.

---

# Item

## id
CON-FND-9393EA8A25D95A

## label
Ornithine transcarbamylase (OTC) catalyzes formation of citrulline from ornithine plus carbamoyl phosphate, the second step of the urea cycle; deficiency of any urea cycle enzyme, including OTC, blocks the cycle and raises blood ammonia

## canonical_key
ureacycle.otc-citrulline-and-enzyme-deficiency-hyperammonaemia

## aliases
Ornithine transcarbamylase
OTC deficiency
Citrulline formation
Urea cycle enzyme deficiency
Hyperammonaemia

## arabic_label
إنزيم أورنيثين ترانسكارباميلاز ونقص إنزيمات دورة اليوريا

## arabic_aliases
نقص الأورنيثين ترانسكارباميلاز
فرط الأمونيا في الدم

## definition
Ornithine transcarbamylase (OTC) is the mitochondrial urea-cycle enzyme that combines ornithine with carbamoyl phosphate (itself made by carbamoyl phosphate synthetase I from ammonia, bicarbonate and ATP) to form citrulline, which is then exported to the cytosol for the rest of the cycle; OTC's specific direction -- ornithine plus carbamoyl phosphate to citrulline -- is what distinguishes it from the reactions before and after it in the pathway. Because the urea cycle is a linear sequence with no bypass, a deficiency of any one of its enzymes, OTC included, stalls the whole pathway at that step: nitrogen entering as ammonia and aspartate can no longer be converted to urea and excreted, so it accumulates in the blood as ammonia (hyperammonaemia), along with the intermediates upstream of the blocked step (citrulline, argininosuccinate or arginine, depending on which enzyme is deficient). This is why every urea cycle enzymopathy, despite differing in which precursor accumulates, shares the same dangerous downstream consequence of rising blood ammonia and its neurotoxic effects.

## explicit_objective
State that OTC forms citrulline from ornithine (not the reverse, and not by hydrolysis), and that deficiency of any urea cycle enzyme raises blood ammonia by blocking nitrogen disposal.

## pitfalls
Reversing OTC's reaction direction (naming it as forming ornithine from citrulline) or assuming only a specific enzyme's deficiency raises ammonia. Every step in the linear urea cycle is essential; a block anywhere in the pathway backs up nitrogen and raises blood ammonia, not only a block at one particular enzyme.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Amino Acid Metabolism

## subtopic
Urea cycle

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-CBFTAIL-NITROGEN

## related_article_ids

## related_concept_ids
CON-FND-EF9977457D3792
CON-FND-3806EF570B0A1C

## resource_ids
src_f7e45bae9ce161e08d46

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.35

## exam_weight_by_year
AUN_Y1=0.35

## clinical_relevance
0.55

## academic_relevance
0.6

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"In urea cycle, the enzyme ornithine transcarbomylase is concerned with: ... The formation of citrulline from ornithine" (Quiz41&42 Q3, p145); "Deficiency of urea cycle enzymes results into accumulation of citrulline, argininosuccinate, arginine in the liver resulting in increasing concentration of ... in the blood ... Ammonia" (Quiz41&42 Q7, p149).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level.

## evidence_gaps
Evidence must be attached before publication.

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
sourceCandidateIds: find-existing.mjs run for "urea cycle ornithine transcarbamylase citrulline" -- 0 hits; broad grep -ril "urea cycle|ornithine|citrulline" surfaced docs/Kasr-Source-Imports/concept/103-BMS-mcq-nitrogen-concepts.md (already reused separately in this same pass for CON-FND-3806EF570B0A1C, the nitrogen-donor/N-acetylglutamate concept) which has no OTC-specific record -- confirmed new. Consolidated Quiz41&42 Q3 and Q7 into one concept since both test the same OTC/urea-cycle-block mechanism.
relationships: related_concept_ids links to this lane's own CON-FND-EF9977457D3792 (transaminases) and to the reused pending Kasr concept CON-FND-3806EF570B0A1C (urea's overall equation and nitrogen donors), both parts of the same nitrogen-disposal pathway.
