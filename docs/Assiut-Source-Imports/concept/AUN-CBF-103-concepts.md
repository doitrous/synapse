<!--
  AUN-CBF-103 -- new concepts minted from the "CBF question bank.pdf" (M.Ashraf)
  triage, Q1-30 authoring batch (coverage/AUN-CBF-103-triage.md). Every
  canonical_key below was confirmed NEW by find-existing.mjs (live state +
  every docs/*-Source-Imports root + docs/import-ready) before minting; see
  coverage/AUN-CBF-103-triage.md "Concept search notes" for the search
  terms and the pending Kasr/FOMSCU concepts reused instead of re-minted
  (in pending-live/AUN-CBF-103-*-concept.md). This source has no matching
  department lecture deck in the corpus (a standalone MCQ bank, no slide
  deck attached) -- teaching text is drawn from the question bank's own
  stems, cross-checked against standard undergraduate physiology teaching
  (Guyton & Hall values for body-fluid-compartment percentages).

  Import: Admin > Concepts import.
-->

# Item

## id
CON-FND-8B36B33DE53183

## label
For a 70 kg reference adult, total body water is 42 L, split into 28 L intracellular, 14 L extracellular (about 10 L interstitial and 3 L plasma), plus about 0.5 L transcellular fluid

## canonical_key
teaching.physiology.body-fluids.compartment-volumes-70kg

## aliases
Body fluid compartment volumes
70 kg reference person fluid volumes
Interstitial fluid volume
Transcellular fluid volume

## arabic_label
حجوم حجرات سوائل الجسم في شخص وزنه 70 كجم

## arabic_aliases
حجم السائل الخلالي
السائل عبر الخلوي

## definition
For the standard 70 kg reference adult used throughout physiology teaching, total body water (TBW) is 42 L. This splits into the intracellular fluid (ICF) compartment, 28 L (two-thirds of TBW), and the extracellular fluid (ECF) compartment, 14 L (one-third of TBW). The ECF itself splits further into the interstitial fluid, about 10 L, the fluid bathing cells outside the capillary wall, and the plasma, about 3 L, the fluid inside blood vessels. Transcellular fluid (CSF, synovial, intraocular, digestive secretions and similar specialised compartments not in free equilibrium with plasma or interstitial fluid) is small, about 0.5 L, and is often omitted from the basic ICF/ECF breakdown entirely.

## explicit_objective
State the volume of each body fluid compartment (total, ICF, ECF, interstitial, plasma, transcellular) for a 70 kg reference adult, given the compartment's fractional share of total body water.

## pitfalls
Confusing the ECF total (14 L) with either of its two subcomponents (interstitial ~10 L, plasma ~3 L) -- ECF is not directly measured, it is calculated, and only plasma is measured directly by tracer dilution; interstitial volume is the remainder (ECF minus plasma).

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
Body Fluids

## subtopic
Compartment volumes

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-BODY-FLUIDS

## related_article_ids

## related_concept_ids
CON-HEM-428F8B432AF540
CON-FND-72B998BB5F1A42
CON-FND-C15868C90B4F1D

## resource_ids
src_76eae135453cd8432f14

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.4

## exam_weight_by_year
AUN_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"the total water content in the body equals ... in a person 70 kg ... 42 L" (Q2); "the total water content in the intracellular fluid equals ... in a person 70 kg ... 28 L" (Q4); "the total water content in the extracellular fluid equals ... in a person 70 kg ... 14 L" (Q6); "the total water content in the interstitial spaces equals in a person 70 kg ... 10 L" (Q7); "the total water content in the plasma equals in a person 70 kg ... 3 L" (Q8); "the total water content in the transcellular fluid in a person 70 kg ... 0.5 L" (Q9).

## merge_ids

## rejected_merge_candidate_ids
CON-HEM-428F8B432AF540 (pending Kasr 102-INT, "Total body water divides into the intracellular and extracellular compartments in a fixed 2:1 ratio...") -- that record states the same fractional split (60/40/20% of body weight) but never gives the 70 kg reference-person litre values this record teaches; linked as a related concept, reused directly for the percentage-only questions in this same bank (Q1,3,5,10-13) rather than merged.

## conflicts
No source disagreement found.

## uncertainty
None beyond standard undergraduate teaching level; the 0.5 L transcellular-fluid figure is one of several textbook approximations in circulation (some texts cite ~1 L) -- printed as stated in the source.

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
sourceCandidateIds: find-existing.mjs run for "total body water 70kg volumes" and "interstitial fluid volume plasma volume" -- 0 hits each, safe to create. Broader "total body water" search returned CON-HEM-428F8B432AF540 (pending Kasr 102-INT), reused for the percentage-only questions in this same bank via pending-live overlay rather than re-minted.
relationships: companion fact to CON-HEM-428F8B432AF540 (percentages vs litre values, same compartment scheme); paired in this batch with CON-FND-72B998BB5F1A42 (Starling forces between plasma and interstitial fluid) and CON-FND-C15868C90B4F1D (the physical barriers separating these same compartments). No typed-edge relations batch written this pass.

---

# Item

## id
CON-FND-72B998BB5F1A42

## label
Plasma has a higher protein concentration than interstitial fluid, and the resulting plasma colloidal osmotic pressure is the force that reabsorbs fluid from interstitial space back into the capillary

## canonical_key
teaching.physiology.body-fluids.starling-forces-plasma-interstitial

## aliases
Starling forces
Plasma colloidal osmotic pressure
Capillary fluid exchange
Reabsorption of interstitial fluid

## arabic_label
قوى ستارلنغ بين البلازما والسائل الخلالي

## arabic_aliases
الضغط الأسموزي الغرواني للبلازما

## definition
Plasma and interstitial fluid have nearly identical ionic composition (both are extracellular fluid), but they differ sharply in one respect: plasma proteins (chiefly albumin) are too large to cross the capillary wall freely, so plasma has a much higher protein concentration than interstitial fluid. This protein difference creates the plasma colloidal osmotic pressure (oncotic pressure), which pulls water back into the capillary from the interstitial space -- the reabsorbing force in Starling's balance of forces across the capillary wall, opposing capillary hydrostatic pressure, which instead pushes fluid out of the capillary into the interstitial space.

## explicit_objective
State that plasma carries a higher protein concentration than interstitial fluid because of the capillary wall's restriction on protein movement, and identify plasma colloidal osmotic pressure as the force that reabsorbs fluid from interstitial space into the capillary.

## pitfalls
Assuming plasma and interstitial fluid differ broadly in composition. They are nearly identical in their small-ion content (both ECF); the one major difference the teaching point isolates is protein concentration, which is what generates the reabsorbing osmotic force in the first place.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Body Fluids

## subtopic
Capillary fluid exchange

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-BODY-FLUIDS

## related_article_ids

## related_concept_ids
CON-FND-8B36B33DE53183
CON-FND-C15868C90B4F1D

## resource_ids
src_76eae135453cd8432f14

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.5

## exam_weight_by_year
AUN_Y1=0.5

## clinical_relevance
0.5

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"which of the following is in higher concentration in plasma than interstitial space: ... proteins" (Q14); "the reabsorbing force of fluids from interstitial fluid to the plasma is: ... plasma colloidal osmotic pressure" (Q17).

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
sourceCandidateIds: find-existing.mjs run for "plasma colloidal osmotic pressure" and "Starling forces capillary" -- 0 hits each, safe to create.
relationships: companion to CON-FND-8B36B33DE53183 (plasma is one of the compartments whose volume that record states) and CON-FND-C15868C90B4F1D (the capillary wall is the barrier this record's forces act across). No typed-edge relations batch written this pass.

---

# Item

## id
CON-FND-C15868C90B4F1D

## label
The cell membrane separates intracellular from extracellular fluid, and the capillary wall separates plasma from interstitial fluid

## canonical_key
teaching.physiology.body-fluids.compartment-barriers

## aliases
Body fluid compartment boundaries
Cell membrane as ICF/ECF barrier
Capillary wall as plasma/interstitial barrier

## arabic_label
الحواجز الفاصلة بين حجرات سوائل الجسم

## arabic_aliases
الغشاء الخلوي كحاجز بين السائلين داخل وخارج الخلية
جدار الشعيرات الدموية كحاجز بين البلازما والسائل الخلالي

## definition
The body's fluid compartments are nested, and each boundary between adjacent compartments has a distinct physical structure. The cell membrane (plasma membrane) is the barrier between the intracellular fluid (ICF) inside a cell and the extracellular fluid (ECF) surrounding it. Within the ECF, the capillary wall (the vessel endothelium) is the barrier between the plasma inside blood vessels and the interstitial fluid outside them, around the cells. Each barrier is selectively permeable in its own way -- the cell membrane restricts most solutes and ions, and the capillary wall restricts large plasma proteins but is far more freely permeable to water and small solutes than the cell membrane is.

## explicit_objective
Name the physical barrier that separates each pair of adjacent body fluid compartments: cell membrane for ICF/ECF, capillary wall for plasma/interstitial fluid.

## pitfalls
Treating "the cell membrane" and "the capillary wall" as interchangeable barriers. The cell membrane is the ICF/ECF boundary at the level of a single cell; the capillary wall is a separate, more permeable boundary one level up, within the ECF itself, between its two subcompartments (plasma and interstitial fluid).

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Body Fluids

## subtopic
Compartment barriers

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-BODY-FLUIDS

## related_article_ids

## related_concept_ids
CON-FND-8B36B33DE53183
CON-FND-72B998BB5F1A42

## resource_ids
src_76eae135453cd8432f14

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.4

## exam_weight_by_year
AUN_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"ICF and ECF are separated by: ... cell membrane" (Q15); "plasma and interstitial fluid are separated by: ... capillary wall" (Q16).

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
sourceCandidateIds: find-existing.mjs run for "body fluid compartment barriers" and "capillary wall plasma interstitial barrier" -- 0 hits each, safe to create.

---

# Item

## id
CON-FND-4DCABC4C40E6FC

## label
Non-pitting oedema (unlike ordinary pitting oedema) is caused by lymphatic obstruction

## canonical_key
teaching.physiology.body-fluids.non-pitting-oedema-lymphatic

## aliases
Lymphatic obstruction
Non-pitting oedema
Lymphoedema

## arabic_label
الوذمة غير المنقرة والانسداد اللمفاوي

## arabic_aliases
الانسداد اللمفاوي

## definition
Oedema is excess fluid accumulation in the interstitial space. Most oedema is "pitting" -- pressing a finger into the swollen tissue leaves a temporary indentation, because the excess fluid is free interstitial fluid that can be displaced. Oedema caused by lymphatic obstruction is characteristically non-pitting instead: the lymphatic vessels normally return interstitial protein and excess fluid to the circulation, and when they are blocked, protein-rich fluid accumulates and organises with the tissue rather than flowing freely, so pressing on it does not leave a persistent pit. This distinguishes lymphatic obstruction from the other classic oedema causes (heart failure raising capillary hydrostatic pressure, liver failure or nephrotic syndrome lowering plasma colloidal osmotic pressure, venous obstruction), which all produce ordinary pitting oedema.

## explicit_objective
Identify lymphatic obstruction as the cause of non-pitting oedema, distinguishing it from the hydrostatic- and oncotic-pressure-driven causes of ordinary pitting oedema.

## pitfalls
Assuming any cause of oedema produces the same pitting quality on examination. The pitting/non-pitting distinction is itself diagnostic: non-pitting oedema specifically points toward lymphatic (or, separately, myxoedema in some other contexts) rather than the hydrostatic/oncotic causes that produce pitting oedema.

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
Body Fluids

## subtopic
Oedema

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-BODY-FLUIDS

## related_article_ids

## related_concept_ids
CON-FND-72B998BB5F1A42

## resource_ids
src_76eae135453cd8432f14

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.4

## exam_weight_by_year
AUN_Y1=0.4

## clinical_relevance
0.6

## academic_relevance
0.6

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"which of the following causes non-pitting oedema: ... lymphatic obstruction" (Q18).

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
sourceCandidateIds: find-existing.mjs run for "non-pitting oedema lymphatic obstruction" -- 0 hits, safe to create.

---

# Item

## id
CON-NEU-49F059364BC13B

## label
The neurilemmal sheath (sheath of Schwann) is the outermost covering of a peripheral axon, and is essential for peripheral nerve regeneration

## canonical_key
teaching.physiology.nerve.neurilemma-outermost-regeneration

## aliases
Neurilemma
Sheath of Schwann
Nerve regeneration
Axon coverings

## arabic_label
الغمد العصبي الخارجي (غمد شوان) وتجدد الأعصاب

## arabic_aliases
غمد شوان
تجدد الأعصاب المحيطية

## definition
Working outward from the axon itself, a peripheral nerve fibre's coverings are, in order: the axolemma (axon's own membrane), the myelin sheath (where present, formed of compacted Schwann-cell membrane), and outermost of all, the neurilemmal sheath (sheath of Schwann, or neurilemma) -- the Schwann cell's own cytoplasm and nucleus, forming the outermost layer around both myelinated and unmyelinated fibres. The neurilemmal sheath is clinically important because it is what allows a cut peripheral nerve to regenerate: the Schwann cells and their neurilemmal tube provide a physical guide and supportive environment for a regrowing axon to follow back to its target, a capacity central nervous system fibres (which lack a neurilemmal sheath) do not have.

## explicit_objective
Identify the neurilemmal sheath as the outermost covering of a peripheral axon, and state why it is essential for peripheral nerve regeneration.

## pitfalls
Confusing the neurilemmal sheath with the myelin sheath. The myelin sheath (present only in myelinated fibres) lies internal to the neurilemmal sheath, which itself surrounds every peripheral fibre, myelinated or not, and is specifically the layer responsible for guiding regeneration, not the myelin itself.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id

## secondary_node_ids

## topic
Nerve Excitability

## subtopic
Nerve fibre structure

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-NEU-AUN-CBF103-NERVE-EXCITABILITY

## related_article_ids

## related_concept_ids
CON-NEU-5664D7AB68AD8D

## resource_ids
src_76eae135453cd8432f14

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.4

## exam_weight_by_year
AUN_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.6

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"which of the following is the outermost layer that covers the axon of the nerve cell: ... neurilemmal sheath" (Q19); "it is correct to say that: ... neurilemmal sheath is important for nerve regeneration" (Q44, later batch).

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
sourceCandidateIds: find-existing.mjs run for "neurilemmal sheath outermost axon" and "nerve regeneration Schwann cell" -- 0 hits each, safe to create. "myelinated unmyelinated nerve fibre" search returned CON-NEU-5664D7AB68AD8D (pending FOMSCU 103-BMS, myelin sheath/nodes of Ranvier structure) -- related but not a match, that record does not state the neurilemma's outermost-layer position or its regeneration role; linked as a related concept, not merged.
crossModuleNote: this concept also answers this bank's Q44 (later batch, not yet authored) -- "neurilemmal sheath is important for nerve regeneration" is the same fact tested from the opposite direction (what it does, rather than where it sits).

---

# Item

## id
CON-NEU-9C5CF2053BB854

## label
Depolarization of the nerve membrane is caused by a rise in sodium permeability -- the greater the rise, the greater the depolarization

## canonical_key
teaching.physiology.nerve.depolarization-sodium-permeability

## aliases
Depolarization mechanism
Sodium permeability and depolarization
Rising phase of the action potential

## arabic_label
إزالة الاستقطاب وزيادة نفاذية الصوديوم

## arabic_aliases
آلية إزالة الاستقطاب

## definition
Depolarization is the change in membrane potential toward a less negative (or positive) value, and in an excitable nerve membrane it is caused by a transient rise in sodium (Na+) permeability: voltage-gated Na+ channels open, Na+ moves down its steep electrochemical gradient into the cell, and the resulting Na+ influx drives the membrane potential toward the sodium equilibrium potential. The size of the depolarization tracks the size of this permeability change -- a greater rise in Na+ permeability produces a greater depolarization, which is why blocking or reducing Na+ permeability (e.g. with a local anaesthetic, or when extracellular Na+ is lowered) reduces the amplitude of the resulting change.

## explicit_objective
State that depolarization of the nerve membrane is caused by rising sodium permeability, and that a greater rise in that permeability produces a greater depolarization.

## pitfalls
Naming potassium instead of sodium as the depolarizing ion. Potassium permeability changes drive repolarization and hyperpolarization (efflux moving the potential back toward, or past, rest); it is specifically the rise in sodium permeability that drives depolarization.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id

## secondary_node_ids

## topic
Nerve Excitability

## subtopic
Action potential ionic basis

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-NEU-AUN-CBF103-NERVE-EXCITABILITY

## related_article_ids

## related_concept_ids
CON-NEU-C79B370AECC47F
CON-NEU-F3DC9C5E5A4ED7

## resource_ids
src_76eae135453cd8432f14

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.5

## exam_weight_by_year
AUN_Y1=0.5

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"during the depolarization phase of the nerve action potential: ... there is an increased influx of Na+ ions" (Q21); "the membrane potential will depolarize by the greatest amount if the membrane permeability increases for: ... sodium" (Q24).

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
sourceCandidateIds: find-existing.mjs run for "depolarization sodium influx repolarization potassium efflux" -- 0 hits, safe to create.
relationships: mechanistic counterpart to CON-NEU-C79B370AECC47F (the resting state this record's rise departs from) and CON-NEU-F3DC9C5E5A4ED7 (the refractory state that follows, once Na+ channels inactivate). No typed-edge relations batch written this pass.

---

# Item

## id
CON-NEU-C79B370AECC47F

## label
The resting nerve membrane is far more permeable to potassium than to sodium, and moving the resting potential toward threshold (less negative) increases excitability

## canonical_key
teaching.physiology.nerve.resting-permeability-and-excitability

## aliases
Resting membrane permeability
Potassium leak channels
Resting potential and excitability

## arabic_label
نفاذية الغشاء العصبي في حالة الراحة والاستثارة

## arabic_aliases
قنوات تسرب البوتاسيوم

## definition
At rest, the nerve membrane is far more permeable to potassium (K+), through leak channels, than it is to sodium (Na+) -- this permeability ratio, not the ionic concentration gradients alone, is why the resting membrane potential sits close to the potassium equilibrium potential rather than midway between the sodium and potassium equilibrium potentials. Because the resting potential and the threshold potential are both fixed reference points, how close together they sit determines how easily the membrane fires: if the resting potential is displaced toward a less negative value (closer to threshold), a smaller additional depolarizing stimulus is needed to reach threshold, so the fibre becomes more excitable; conversely, displacing the resting potential to a more negative value (hyperpolarization) moves it further from threshold and decreases excitability.

## explicit_objective
State that the resting nerve membrane is more permeable to K+ than Na+, and that moving the resting membrane potential toward threshold (less negative) increases excitability while moving it away (more negative) decreases it.

## pitfalls
Treating "more permeable to K+" and "excitability depends on distance from threshold" as two unrelated facts. They are the same underlying idea from two angles: the resting potential sits where it does (close to the K+ equilibrium potential, well negative to threshold) because of the K+-dominant resting permeability, and it is exactly that distance-from-threshold that excitability tracks.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id

## secondary_node_ids

## topic
Nerve Excitability

## subtopic
Resting membrane potential

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-NEU-AUN-CBF103-NERVE-EXCITABILITY

## related_article_ids

## related_concept_ids
CON-NEU-9C5CF2053BB854
CON-NEU-77596C8A899A7E

## resource_ids
src_76eae135453cd8432f14

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.5

## exam_weight_by_year
AUN_Y1=0.5

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"resting nerve cell membrane is more permeable to: ... K+ ions than to Na+ ions" (Q23); "concerning the nerve fiber membrane at rest, the following is true: ... if the resting membrane potential is moved to a less negative value, the fiber becomes more excitable" (Q25).

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
sourceCandidateIds: find-existing.mjs run for "resting membrane potential nerve" and "ion channel resting permeability potassium" -- 0 hits each, safe to create. "sodium permeability excitability" search returned CON-NEU-77596C8A899A7E (pending FOMSCU 103-BMS, reused for Q27 in this same batch) -- related (both concern what sets excitability) but that record's specific claim is about extracellular K+ setting the resting potential and hypokalaemia's paralytic effect, not this record's resting-permeability-ratio and threshold-distance mechanism; linked as related, not merged.

---

# Item

## id
CON-NEU-891722498F106E

## label
A fall in extracellular calcium increases nerve/muscle excitability (hypocalcaemic tetany); a rise decreases it

## canonical_key
teaching.physiology.nerve.calcium-excitability-inverse

## aliases
Hypocalcaemia and excitability
Extracellular calcium and nerve excitability
Calcium membrane-stabilising effect

## arabic_label
الكالسيوم خارج الخلوي والاستثارة العصبية

## arabic_aliases
تكزز نقص كلس الدم

## definition
Extracellular calcium has a membrane-stabilising effect on voltage-gated sodium channels: normal Ca2+ levels raise the threshold needed to open them, holding excitability in check. A fall in extracellular calcium (hypocalcaemia) removes some of this stabilisation, lowering the threshold and so increasing nerve and muscle excitability -- the mechanism behind hypocalcaemic tetany, where low Ca2+ causes spontaneous, repetitive firing and sustained muscle contraction. Conversely, a rise in extracellular calcium (hypercalcaemia) increases the membrane-stabilising effect, raising the threshold further and decreasing excitability.

## explicit_objective
State the inverse relationship between extracellular calcium concentration and nerve/muscle excitability, and identify hypocalcaemia as the direction that increases excitability (tetany).

## pitfalls
Confusing calcium's extracellular, threshold-setting role here with its separate intracellular role as the trigger for neurotransmitter release and excitation-contraction coupling. This teaching point is specifically about how the calcium concentration outside the cell sets how easily the membrane reaches threshold, not about calcium's action once it enters the cell.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id

## secondary_node_ids

## topic
Nerve Excitability

## subtopic
Factors affecting excitability

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-NEU-AUN-CBF103-NERVE-EXCITABILITY

## related_article_ids

## related_concept_ids
CON-NEU-77596C8A899A7E

## resource_ids
src_76eae135453cd8432f14

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.5

## exam_weight_by_year
AUN_Y1=0.5

## clinical_relevance
0.6

## academic_relevance
0.6

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"excitability of the nerve fiber is increased in the following condition: ... low Ca++ concentration in ECF" (Q28).

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
sourceCandidateIds: find-existing.mjs run for "hypocalcemia excitability tetany" and "extracellular calcium nerve excitability" -- 0 hits each, safe to create.

---

# Item

## id
CON-NEU-F3DC9C5E5A4ED7

## label
The absolute refractory period is caused by inactivation of voltage-gated sodium channels, and blocks re-excitation regardless of stimulus strength

## canonical_key
teaching.physiology.nerve.absolute-refractory-period-na-inactivation

## aliases
Absolute refractory period
Sodium channel inactivation gates
Refractory period mechanism

## arabic_label
الفترة الحرونة المطلقة وتعطيل قنوات الصوديوم

## arabic_aliases
بوابات تعطيل قنوات الصوديوم

## definition
Voltage-gated sodium channels have two gates: an activation gate, which opens on depolarization to let the action potential's rising phase happen, and a separate inactivation gate, which then closes shortly after, on a slight delay, regardless of whether the membrane is still depolarized. During the absolute refractory period -- which spans roughly the time from the start of depolarization until repolarization is well underway -- the inactivation gates of a large fraction of Na+ channels are already closed, and a closed inactivation gate cannot be forced open by a second stimulus no matter how strong. This is why the absolute refractory period is absolute: excitability during it is not merely reduced, no stimulus of any strength can trigger a second action potential until enough channels have recovered (inactivation gates reopened, which requires repolarization first).

## explicit_objective
Explain the absolute refractory period as inactivation of voltage-gated Na+ channels' own inactivation gates, and state why no stimulus, however strong, can produce a second action potential during it.

## pitfalls
Treating the absolute refractory period as simply "reduced excitability," the way the relative refractory period is. The absolute refractory period is qualitatively different: it is not a higher threshold, it is the physical unavailability of enough Na+ channels to generate any action potential at all, which is why "however strong the stimulus" is the specific, testable claim this teaching point turns on.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id

## secondary_node_ids

## topic
Nerve Excitability

## subtopic
Refractory periods

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-NEU-AUN-CBF103-NERVE-EXCITABILITY

## related_article_ids

## related_concept_ids
CON-NEU-9C5CF2053BB854

## resource_ids
src_76eae135453cd8432f14

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.5

## exam_weight_by_year
AUN_Y1=0.5

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"during absolute refractory period: ... Na+ channels are inactivated by inner gates" (Q29).

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
sourceCandidateIds: find-existing.mjs run for "refractory period absolute relative nerve" and "sodium channel inactivation gate" -- 0 hits each, safe to create.

---

# Item

## id
CON-NEU-A4AC183C8E157D

## label
Threshold is the membrane potential at which enough voltage-gated Na+ channels have opened that sodium influx becomes self-sustaining (regenerative), triggering a full action potential

## canonical_key
teaching.physiology.nerve.threshold-regenerative-sodium

## aliases
Threshold potential
Firing level
Regenerative sodium influx

## arabic_label
جهد العتبة والتيار الصوديومي الذاتي التعزيز

## arabic_aliases
جهد الإطلاق

## definition
Threshold (the firing level) is the specific membrane potential at which a depolarizing stimulus stops needing outside help to keep going. Below threshold, the Na+ influx a stimulus produces is matched or outpaced by the K+ efflux leaking the charge back out, so the response fades (a local response). At threshold, enough voltage-gated Na+ channels have opened that the resulting Na+ influx itself depolarizes the membrane further, opening still more Na+ channels in a self-reinforcing (regenerative) loop -- this is what makes the action potential a fixed, all-or-none event rather than a graded one. Threshold is therefore best described as the condition under which Na+ channels are triggered to open in the normal, physiological way, not as a fixed voltage value quoted in isolation from that mechanism.

## explicit_objective
Define threshold as the membrane potential at which sodium channel opening becomes regenerative (self-sustaining), rather than as an arbitrary fixed voltage.

## pitfalls
Defining threshold purely as "when K+ permeability exceeds Na+ permeability" -- that describes repolarization, not the initiation of the spike. Threshold is crossed when the balance tips the other way, toward self-sustaining Na+ entry.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
neuro

## primary_node_id

## secondary_node_ids

## topic
Nerve Excitability

## subtopic
Threshold and depolarization

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-NEU-AUN-CBF103-NERVE-EXCITABILITY

## related_article_ids

## related_concept_ids
CON-NEU-9C5CF2053BB854
CON-NEU-C79B370AECC47F

## resource_ids
src_76eae135453cd8432f14

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.4

## exam_weight_by_year
AUN_Y1=0.4

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"threshold for production of an action potential in a nerve: ... is a condition where Na+ channels are triggered to open normally" (Q53).

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
sourceCandidateIds: find-existing.mjs run for "threshold definition nerve regenerative" -- 0 hits, safe to create.
relationships: companion to CON-NEU-9C5CF2053BB854 (the sodium-permeability rise threshold triggers) and CON-NEU-C79B370AECC47F (the resting-potential-to-threshold distance that excitability tracks).

---

# Item

## id
CON-FND-8027C14DF87022

## label
Energy balance is intake versus output: a neutral balance holds weight steady, a positive balance (as in growth) requires intake above output, and a negative balance causes loss of body weight

## canonical_key
teaching.physiology.metabolism.energy-balance-body-weight

## aliases
Energy balance
Positive and negative energy balance
Energy intake vs output

## arabic_label
اتزان الطاقة ووزن الجسم

## arabic_aliases
الاتزان السلبي للطاقة

## definition
Energy balance compares the energy taken in as food against the energy the body expends. In a normal, weight-stable adult, intake equals output, not intake exceeding output -- any excess or shortfall is exactly what changes body weight. During growth, intake must exceed output, since some of the surplus energy is laid down as new tissue rather than expended. A negative energy balance -- output exceeding intake -- forces the body to draw on its own stores, chiefly fat, and results in loss of body weight. Obesity itself reflects a sustained positive energy balance, and is characterised by an increase in the body's fat content, not its protein content.

## explicit_objective
State that a negative energy balance (output exceeding intake) causes loss of body weight, and that a weight-stable adult's intake equals, not exceeds, output.

## pitfalls
Assuming intake normally exceeds output in a stable adult. It does not -- a stable weight is exactly the sign that intake and output are matched; only growth (and other states of net tissue accretion) require a deliberate surplus.

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
Metabolism and Thermoregulation

## subtopic
Energy balance

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-METABOLISM

## related_article_ids

## related_concept_ids
CON-FND-5948B69A224D33

## resource_ids
src_76eae135453cd8432f14

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.4

## exam_weight_by_year
AUN_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.6

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"about the energy balance: ... with a negative energy balance, there is loss of the body weight" (Q71).

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
sourceCandidateIds: find-existing.mjs run for "energy balance body weight" -- 0 hits, safe to create.

---

# Item

## id
CON-FND-5948B69A224D33

## label
Most catabolic energy is released as heat; carbohydrate's physical and physiological heat values are equal (about 4.1 Kcal/g), and the energy equivalent of oxygen is the heat produced when one litre of O2 is consumed

## canonical_key
teaching.physiology.metabolism.heat-value-and-oxygen-equivalent

## aliases
Physical vs physiological heat value
Caloric value of foodstuffs
Energy equivalent of oxygen

## arabic_label
القيمة الحرارية للغذاء ومكافئ الأكسجين الحراري

## arabic_aliases
مكافئ الأكسجين الحراري

## definition
When a foodstuff is catabolised, most of the chemical energy released appears as heat, not as usable work or stored high-energy phosphate bonds -- the body is a relatively inefficient engine, and even the energy it does capture in ATP is itself dissipated as heat once that ATP is spent on cellular work. Each foodstuff has a physical heat value (measured by burning a weighed sample in a bomb calorimeter) and a physiological heat value (the energy actually available to the body). For carbohydrate and fat, which the body oxidises completely, the two values are equal -- carbohydrate's is about 4.1 Kcal/g. Protein's physical value (about 5.3 Kcal/g) is higher than its physiological value (about 4.1 Kcal/g), because the body cannot fully oxidise the nitrogen-containing part of the protein molecule and excretes it as urea, losing some of that energy. The energy equivalent of oxygen restates the same idea from the oxygen-consumption side: it is the amount of heat produced when one litre of O2 is consumed in oxidising a given substrate, and it is not a single fixed number, since it depends on which substrate (carbohydrate, fat or protein) is being oxidised.

## explicit_objective
State that most catabolic energy appears as heat, that carbohydrate's physical and physiological heat values are equal (unlike protein's), and define the energy equivalent of oxygen as the heat produced per litre of O2 consumed.

## pitfalls
Assuming every foodstuff's physical and physiological heat values are equal. Only carbohydrate and fat are fully oxidised by the body; protein's physiological value is lower than its physical value because nitrogen is excreted as urea rather than fully oxidised.

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
Metabolism and Thermoregulation

## subtopic
Heat value and caloric equivalents

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-METABOLISM

## related_article_ids

## related_concept_ids
CON-FND-8027C14DF87022
CON-FND-481FB61C091AAE

## resource_ids
src_76eae135453cd8432f14

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.4

## exam_weight_by_year
AUN_Y1=0.4

## clinical_relevance
0.3

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
"most of the energy released from catabolic processes: ... appears as thermal (heat) energy" (Q72); "the physical heat value of: ... carbohydrate is equal to its physiological heat value" (Q73); "the metabolism of 10 gm protein inside the body would produce: ... 41 Kcal" (Q74); "the energy equivalent of oxygen is: ... the amount of heat (Kcal) produced when one litre of O2 is consumed" (Q79).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
The bank's own figure for 10 g protein (41 Kcal) assumes the standard ~4.1 Kcal/g physiological value for protein; some texts round this to 4.0 or 4.35 Kcal/g.

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
sourceCandidateIds: find-existing.mjs run for "heat value carbohydrate protein fat" and "energy equivalent of oxygen" -- 0 hits each, safe to create.

---

# Item

## id
CON-FND-481FB61C091AAE

## label
The respiratory quotient (RQ) is the ratio of CO2 produced to O2 consumed -- about 1.0 for carbohydrate, 0.7 for fat -- and is near 1 in the brain, which runs almost entirely on glucose

## canonical_key
teaching.physiology.metabolism.respiratory-quotient

## aliases
Respiratory quotient
RQ
Non-protein RQ

## arabic_label
المعدل التنفسي

## arabic_aliases
نسبة التنفس

## definition
The respiratory quotient (RQ) is the ratio of the volume of CO2 produced to the volume of O2 consumed in metabolism -- not the reverse ratio. Its value depends on which fuel is being oxidised: about 1.0 for carbohydrate (which contains enough oxygen within its own molecule that CO2 output essentially equals O2 uptake), about 0.7 for fat (which needs to draw in relatively more O2 to complete its oxidation), and about 0.8 for a mixed, average diet. Since the brain normally metabolises almost exclusively glucose, its RQ runs close to 1. An RQ above 1 signals net conversion of carbohydrate into fat (lipogenesis, which releases more CO2 than the O2 consumed), or a transient rise from hyperventilation, heavy exercise, or fever and acidosis (all of which blow off or generate extra CO2 relative to O2 uptake); gluconeogenesis using fat as the substrate to make glucose runs the opposite direction and lowers, not raises, the RQ. An uncontrolled diabetic, unable to use glucose and relying instead on fat oxidation (with ketone body formation), has a low RQ, not one near 1.

## explicit_objective
Define the RQ as CO2 produced over O2 consumed, state its characteristic values for carbohydrate (~1.0) and fat (~0.7), and identify the physiological causes of a rise above 1 (excluding fat-to-glucose gluconeogenesis, which lowers it).

## pitfalls
Inverting the RQ ratio (O2/CO2 instead of CO2/O2), or assuming every state of rapid fat handling raises the RQ -- gluconeogenesis from fat is the opposite case, lowering RQ rather than raising it.

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
Metabolism and Thermoregulation

## subtopic
Respiratory quotient

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-METABOLISM

## related_article_ids

## related_concept_ids
CON-FND-5948B69A224D33

## resource_ids
src_76eae135453cd8432f14

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.4

## exam_weight_by_year
AUN_Y1=0.4

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
"a respiratory quotient above one occurs in all the following cases except: ... gluconeogenesis using fat as a substrate to be converted into glucose" (Q75); "the respiratory quotient (RO): ... is about 1 in the brain" (Q76); "the excess R.O.: ... indicates the fuel used during a certain exercise" (Q77).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
Q77's printed "excess R.O." is read as the respiratory exchange ratio measured during the oxygen-debt recovery period after exercise (as opposed to the steady-state RQ during exercise itself); the bank does not spell out this abbreviation, and no independent source in the corpus confirms it.

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
sourceCandidateIds: find-existing.mjs run for "respiratory quotient" and "respiratory quotient brain" -- 0 hits each, safe to create.

---

# Item

## id
CON-FND-BA8CBB467C0506

## label
BMR is measured after an overnight fast at thermoneutral temperature, at complete physical and mental rest -- not immediately after a meal; specific dynamic action is the rise in metabolic rate after eating, due mainly to the metabolic processing of absorbed nutrients rather than to the mechanical work of digestion itself

## canonical_key
teaching.physiology.metabolism.bmr-and-specific-dynamic-action

## aliases
Basal metabolic rate
BMR measurement conditions
Specific dynamic action
SDA

## arabic_label
معدل الأيض الأساسي والفعل الديناميكي النوعي للغذاء

## arabic_aliases
الفعل الديناميكي النوعي

## definition
The basal metabolic rate (BMR) is the energy expenditure needed to keep the vital organs running at complete rest, expressed per unit body surface area per hour (Kcal/m²/hour). For the figure to be valid, it must be measured under strictly standardised conditions: after an overnight (roughly 12-14 hour) fast, not immediately after a meal, at a thermoneutral room temperature (not a cold environment such as 10C, which would itself raise heat production), with the subject awake but completely relaxed. BMR is slightly higher in males than females and is highest in early childhood, falling gradually thereafter. Specific dynamic action (SDA), also called the thermic effect of food, is the rise in metabolic rate that follows eating -- about 30% for a protein meal (the largest effect of the three foodstuffs), about 6% for carbohydrate and about 4% for fat. Contrary to an intuitive guess, SDA is caused mainly by the metabolic processing of the absorbed nutrients (chiefly deamination of amino acids in the liver, for protein) rather than by the mechanical work of digesting and absorbing the food itself; the extra heat it generates can also contribute to warming the body on exposure to cold.

## explicit_objective
State the standardised fasting and thermoneutral conditions required for a valid BMR measurement, and explain that specific dynamic action is caused mainly by the metabolic processing of absorbed nutrients, not by the mechanical work of digestion and absorption.

## pitfalls
Assuming SDA is caused by the physical work of digesting and absorbing food. The dominant cause, especially for protein's large SDA, is the metabolic cost of processing the absorbed nutrients afterward (deamination and related liver metabolism), not the digestive process itself.

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
Metabolism and Thermoregulation

## subtopic
Basal metabolic rate and specific dynamic action

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-METABOLISM

## related_article_ids

## related_concept_ids
CON-FND-5948B69A224D33

## resource_ids
src_76eae135453cd8432f14

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.4

## exam_weight_by_year
AUN_Y1=0.4

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
"about the BMR, all the following is true except: ... it is measured immediately after dinner at an atmospheric temp about 10 C" (Q78); "about the specific dynamic action (SDA), all the following is true except: ... it is generally due to the work done during digestion and absorption of food" (Q80).

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
sourceCandidateIds: find-existing.mjs run for "basal metabolic rate" (returned unrelated live CON-FND-AEED54B4151525 on catecholamines raising BMR, not a match for these measurement-condition/SDA facts) and "specific dynamic action" (0 hits) -- safe to create.
