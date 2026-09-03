<!--
  AUN-CBF-103 -- new concepts minted from "All quizzes CBF .pdf" (lane 3,
  branch aun-cbf103-author3), the OCR'd pp.31-90 authoring batch
  (coverage/AUN-CBF-103-triage.md, "S3 lane 3 addendum"). Every canonical_key
  below was confirmed NEW by find-existing.mjs (live state + every
  docs/*-Source-Imports root + docs/import-ready) before minting -- search
  terms recorded in the triage addendum's "Concept search notes (lane 3)".
  This source is a Moodle attempt-review export (no accompanying department
  lecture deck); teaching text is drawn from the bank's own stems and
  printed keys, cross-checked against standard undergraduate physiology and
  biochemistry teaching.

  Import: Admin > Concepts import.
-->

# Item

## id
CON-FND-08A3DBFA90D950

## label
A solution's tonicity toward red blood cells is set by its concentration of non-penetrating solute relative to plasma; 0.9% NaCl is isotonic, and 1.0% NaCl is hypertonic and shrinks (crenates) the cell

## canonical_key
membrane.tonicity.hypertonic-vs-isotonic-rbc

## aliases
Tonicity
Isotonic saline
Hypertonic solution
Crenation
Osmotic pressure of red blood cells

## arabic_label
توتر المحلول بالنسبة لكرات الدم الحمراء

## arabic_aliases
محلول مفرط التوتر
تجعد الخلية

## definition
Tonicity describes a solution's effect on cell volume, set specifically by its concentration of solute that cannot cross the cell membrane, not by its total osmolarity. Normal saline, 0.9% NaCl (about 154 mmol/L), is isotonic with plasma and red blood cells: it matches the cell's own effective osmotic pressure, so there is no net water movement and the cell keeps its normal volume. A hypertonic solution has a higher non-penetrating solute concentration than the cell's interior, so water leaves the cell by osmosis and it shrinks, a change called crenation; 1.0% NaCl, being more concentrated than the isotonic 0.9% reference, is hypertonic to red blood cells and crenates them. A hypotonic solution has a lower non-penetrating solute concentration than the cell, so water enters and the cell swells, and may lyse if the solution is markedly hypotonic (as with distilled water or a dilute NaCl solution well below 0.9%).

## explicit_objective
Rank a saline concentration as hypotonic, isotonic or hypertonic to red blood cells relative to the 0.9% NaCl reference, and state the resulting direction of water movement and cell-volume change.

## pitfalls
Confusing tonicity with total solute concentration or osmolarity in the abstract, rather than with the specific comparison to the cell's own effective osmotic pressure. A solution can be iso-osmotic in a lab sense yet still change cell volume if some of its solute freely crosses the membrane; for NaCl and red blood cells, though, the simple ranking against the 0.9% isotonic reference holds directly, so 1.0% NaCl reads as hypertonic and shrinks the cell rather than leaving it unchanged.

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
Cell Membrane Physiology

## subtopic
Osmosis and tonicity

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-MEMBRANE-TONICITY

## related_article_ids

## related_concept_ids
CON-NEU-1D5DC2D67A5291

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
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following solutions is hypertonic for red blood cells? ... 1.0% NaCl" (Quiz11&12 Q4).

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
sourceCandidateIds: find-existing.mjs run for "hypertonic solution red blood cells NaCl" -- 0 hits; broad grep for "hypotonic/hypertonic/isotonic/tonicity" across docs/*-Source-Imports/concept returned only unrelated CNS-tone (hypertonia/hypotonia) hits -- safe to create.
relationships: companion to CON-NEU-1D5DC2D67A5291 (the pending Kasr 103-BMS-physiology diffusion/osmosis concept, reused via overlay in this same cluster for the mechanism of osmosis itself; this record covers the specific tonicity ranking a red blood cell is tested against).

---

# Item

## id
CON-FND-CB46E0408C4FF2

## label
A free radical is any species with an unpaired electron; oxygen-derived free radicals (superoxide, hydroxyl radical, hydrogen peroxide) damage lipids (especially polyunsaturated fatty acids), proteins and DNA, while nitric oxide is a separate, nitrogen-centred radical and carbohydrates cannot themselves form radicals

## canonical_key
freeradical.ros.definition-sources-effects

## aliases
Free radical
Reactive oxygen species
ROS
Superoxide anion
Hydroxyl radical
Lipid peroxidation

## arabic_label
الجذور الحرة وأنواع الأكسجين التفاعلية

## arabic_aliases
الجذور الحرة المشتقة من الأكسجين
فوق أكسيد الدهون

## definition
A free radical is any atom, ion or molecule that carries an unpaired electron in its outer orbital, which makes it highly reactive and able to attack other molecules to satisfy that unpaired electron. The oxygen-derived free radicals (reactive oxygen species, ROS) are superoxide anion (O2·-), the hydroxyl radical (OH·, the most reactive of all) and hydrogen peroxide (H2O2, grouped with the true radicals because it readily generates the hydroxyl radical via the Fenton reaction). Xenobiotics, molecular oxygen itself and lipids can all generate or propagate free radicals, but carbohydrates cannot themselves form free radicals. Free radicals damage cell membranes by lipid peroxidation, and polyunsaturated fatty acids are the lipid class most vulnerable, because their multiple double bonds carry easily abstractable allylic hydrogens; free radicals also cause mutations and predispose to cancer by damaging DNA, and cause loss of biological activity of enzymes and other proteins by oxidising their functional groups. Protein glycosylation -- the non-enzymatic attachment of a sugar to a protein, as in glycated haemoglobin -- is a separate, non-oxidative chemical process and is not itself a free-radical effect.

## explicit_objective
Define a free radical by its unpaired electron, name the oxygen-derived free radicals, and state which molecular classes free radicals damage (lipids, especially PUFAs; proteins; DNA) as opposed to a process free radicals do not directly cause, such as protein glycosylation.

## pitfalls
Assuming nitric oxide counts as an oxygen-derived free radical because it does contain an unpaired electron and is itself a genuine radical -- it is instead classed separately as a nitrogen-centred (reactive nitrogen species) radical, not one of the oxygen-derived ROS this bank tests. Assuming any biomolecule can form a free radical: carbohydrates are the class this bank specifically excludes, in contrast to oxygen, lipids and xenobiotics, which can.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Oxygen Toxicity and Free Radical Injury

## subtopic
Free radical definition, sources and effects

## microtopic

## nanotopic

## modules
AUN-CBF-103

## article_ids
ART-FND-AUN-CBF103-OXIDATIVE-STRESS

## related_article_ids

## related_concept_ids

## resource_ids
src_f7e45bae9ce161e08d46

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
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following is not an oxygen derived free radical (ROS)? ... Nitric oxide" / "Which of the following can't form free radicals? ... Carbohydrates" / "Which of the following is not an effect of free radicals? ... Protein glycosylation" / "Which of the following lipid is most affected by free radicals? ... Polyunsaturated fatty acids" (Quiz22 Q1-4).

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
sourceCandidateIds: find-existing.mjs run for "free radical reactive oxygen species superoxide", "antioxidant preventive scavenging classification", "polyunsaturated fatty acid lipid peroxidation free radical" -- 0 hits each; broad grep for "free radical|antioxidant|reactive oxygen species" across docs/*-Source-Imports/concept returned only passing mentions inside unrelated shock/pathology records, no dedicated concept -- safe to create. Consolidated four distinct quiz stems (ROS identity, radical-forming substrate classes, free-radical effects, most-vulnerable lipid) into one concept rather than fragmenting, matching this lane's own precedent for the water-soluble-vitamins consolidation.
