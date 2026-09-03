<!--
  MU-MED101 (Foundation 1) - lane-2 authored concepts for the
  f1supp43-biochemphys (30 new concepts) and f1supp43-embryo (28 new
  concepts) clusters, 58 new mints total. Searched via find-existing.mjs and
  root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura
  pending concept files before minting -- see the seed headers in
  coverage/seeds/MU-MED101/f1supp43-{biochemphys,embryo}.json for the six
  exact-fact reuses (sparse overlays in pending-live/
  MU-MED101-concepts-overlay.md, not repeated here) that were found this way.
  All concepts below are new mints -- no close match was found for these
  specific facts.

  Evidence (one claim + one citation per concept) is in the sibling
  evidence/MU-MED101-{claims,citations}.md, citing the exam paper itself
  (evidence/MU-MED101-resources.md, already registered by lane 1). Teaching
  articles are in article/MU-MED101-articles.md (appended by this lane).

  Simulate together with the four foreign concept files the sparse overlays
  depend on:
    node scripts/content/gate.mjs simulate \
      docs/Kasr-Source-Imports/concept/102-INT-mcq-concepts.md \
      docs/Kasr-Source-Imports/concept/103-BMS-biochemistry-concepts.md \
      docs/Kasr-Source-Imports/concept/101-ISK-mcq-concepts.md \
      docs/Ain-Shams-Source-Imports/concept/ASU-UG-assessment-1-mcq-concepts.md \
      docs/Ain-Shams-Source-Imports/concept/ASU-AE-embryo2-q11-69-new-concepts.md \
      docs/import-ready/concept/AU-MED-102-biochem-structural-concepts.md \
      docs/Menoufia-Source-Imports/concept/MU-MED101-concepts.md \
      docs/Menoufia-Source-Imports/concept/MU-MED101-concepts-2.md \
      docs/Menoufia-Source-Imports/pending-live/MU-MED101-concepts-overlay.md \
      docs/Menoufia-Source-Imports/article/MU-MED101-articles.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED101-resources.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED101-claims.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED101-citations.md \
      docs/Menoufia-Source-Imports/question/MU-MED101-support43-biophys-mcq.md \
      docs/Menoufia-Source-Imports/question/MU-MED101-support43-embryo-mcq.md

  Import: Admin > Concepts > Import.
-->

# Item

## label
Metabolic alkalosis is compensated by respiratory hypoventilation retaining CO2

## id
CON-FND-9E4A791CF44E5C

## canonical_key
acid-base.compensation.metabolic-alkalosis-hypoventilation

## aliases


## arabic_label


## arabic_aliases


## definition
Metabolic alkalosis (raised pH and raised bicarbonate) is compensated by the respiratory centre reducing ventilation rate and depth (hypoventilation), which retains carbon dioxide. The retained CO2 raises carbonic acid and hydrogen ion concentration, pulling the pH back toward normal without correcting the underlying bicarbonate excess.

## explicit_objective
State that the respiratory compensation for metabolic alkalosis is hypoventilation, which retains CO2 to raise H+ and partially normalise pH.

## pitfalls
Confusing this with the compensation for metabolic acidosis, which is hyperventilation (the opposite direction of ventilation change).

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHY-T04

## secondary_node_ids
[clear]

## topic
Physiology

## subtopic
Acid-Base Physiology

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Acid-Base Physiology

## article_ids
ART-MU101-ACIDBASE-D4BF76CA

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-9E4A791CF44E5C

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Compensatory mechanism for a patient in metabolic alkalosis / gas pattern HCO3 38, pH 7.50, PaCO2 50 -> Hypoventilation

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p13 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q01 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p13, red-text key.

---

# Item

## label
The normal bicarbonate to carbonic acid ratio in extracellular fluid is about 20:1

## id
CON-FND-674670B271BEC1

## canonical_key
acid-base.buffer.bicarbonate-carbonic-acid-ratio-20-1

## aliases


## arabic_label


## arabic_aliases


## definition
The Henderson-Hasselbalch equation for the bicarbonate buffer, pH = 6.1 + log([HCO3-]/[H2CO3]), gives a normal extracellular pH of 7.4 only when the ratio of bicarbonate to carbonic acid is held at about 20:1. It is this ratio, not the absolute concentration of either component alone, that the respiratory and renal systems act to preserve.

## explicit_objective
State that the normal physiological ratio of bicarbonate to carbonic acid in extracellular fluid is approximately 20:1.

## pitfalls
Thinking a higher or lower absolute bicarbonate level always means acidosis/alkalosis, when it is the ratio to carbonic acid, not either value alone, that determines pH.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHY-T04

## secondary_node_ids
[clear]

## topic
Physiology

## subtopic
Acid-Base Physiology

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Acid-Base Physiology

## article_ids
ART-MU101-ACIDBASE-D4BF76CA

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-674670B271BEC1

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Identify the correct ratio of bicarbonate to carbonic acid in extracellular fluids -> 20:1

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p13 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q03 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p13, red-text key.

---

# Item

## label
Increased ventilation eliminates CO2 and reduces, not increases, H+ concentration

## id
CON-FND-368319E51D203E

## canonical_key
acid-base.respiratory-regulation.increased-ventilation-reduces-h-plus

## aliases


## arabic_label


## arabic_aliases


## definition
Increased ventilation eliminates CO2 from the extracellular fluid, shifting the CO2 + H2O <-> H2CO3 <-> H+ + HCO3- equilibrium to the left and thereby reducing, not increasing, hydrogen ion concentration. Conversely, decreased ventilation retains CO2 and increases H+ concentration -- the mechanism of respiratory acidosis.

## explicit_objective
State that increased ventilation eliminates CO2 and reduces H+ concentration, and identify the reverse (false) pairing as incorrect.

## pitfalls
Assuming any statement that pairs "eliminates CO2" with "increases H+" could be true; eliminating CO2 always reduces, never increases, H+.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHY-T04

## secondary_node_ids
[clear]

## topic
Physiology

## subtopic
Acid-Base Physiology

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Acid-Base Physiology

## article_ids
ART-MU101-ACIDBASE-D4BF76CA

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-368319E51D203E

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Which statement is false regarding respiratory regulation of acid-base balance -> "increased ventilation eliminates CO2 and increases H+" is false

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p13 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q04 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p13-14, red-text key.

---

# Item

## label
The kidney contributes to acid-base balance chiefly by reclaiming filtered bicarbonate

## id
CON-FND-36527431DD0232

## canonical_key
acid-base.renal-regulation.bicarbonate-reclamation

## aliases


## arabic_label


## arabic_aliases


## definition
The proximal renal tubule reclaims essentially all of the filtered bicarbonate via carbonic-anhydrase-driven H+ secretion, which converts filtered HCO3- to CO2 and water that re-enters the cell and regenerates HCO3- for return to the blood. This reclamation, together with new bicarbonate generation via ammoniagenesis and titratable acid excretion, is the kidney's slower, complementary partner to the fast respiratory control of acid-base balance.

## explicit_objective
State that the kidney's dominant acid-base contribution is reclamation of filtered bicarbonate in the proximal tubule.

## pitfalls
Confusing bicarbonate reclamation (the dominant mechanism) with ammonia secretion, which is real but a smaller, separate part of renal acid-base handling.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHY-T04

## secondary_node_ids
[clear]

## topic
Physiology

## subtopic
Acid-Base Physiology

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Acid-Base Physiology

## article_ids
ART-MU101-ACIDBASE-D4BF76CA

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-36527431DD0232

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
The Kidney contributes to acid-base balance by -> Reclamation of bicarbonate

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p14 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q05 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p14, red-text key.

---

# Item

## label
Respiratory compensation for metabolic acidosis is increased ventilation to blow off CO2

## id
CON-FND-9574E00BC25339

## canonical_key
acid-base.compensation.metabolic-acidosis-hyperventilation

## aliases


## arabic_label


## arabic_aliases


## definition
The fast, minutes-scale compensation for metabolic acidosis is respiratory: chemoreceptors sense falling pH and rising H+, and the respiratory centre increases the rate and depth of ventilation to blow off extra CO2, shifting the buffer equilibrium to reduce H+ and partially normalise pH. This is faster than the renal compensation, which generates new bicarbonate over hours to days.

## explicit_objective
State that the fast respiratory compensation for metabolic acidosis is increased ventilation (hyperventilation).

## pitfalls
Confusing the direction of ventilation change for metabolic acidosis (increased) versus metabolic alkalosis (decreased).

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHY-T04

## secondary_node_ids
[clear]

## topic
Physiology

## subtopic
Acid-Base Physiology

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Acid-Base Physiology

## article_ids
ART-MU101-ACIDBASE-D4BF76CA

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-9574E00BC25339

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
To compensate for metabolic acidosis, the body will -> increase respiration rate

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p14 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q07 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p14, red-text key.

---

# Item

## label
Rebreathing into a paper bag corrects anxiety-induced acute respiratory alkalosis

## id
CON-FND-57EA6E88793B03

## canonical_key
acid-base.intervention.rebreathing-paper-bag-respiratory-alkalosis

## aliases


## arabic_label


## arabic_aliases


## definition
Anxiety-triggered hyperventilation causes acute respiratory alkalosis by blowing off CO2 faster than it is produced. Having the patient rebreathe exhaled air from a paper bag raises the CO2 concentration of inspired air, restoring PaCO2 toward normal and correcting the alkalosis directly at its cause.

## explicit_objective
State that rebreathing from a paper bag is the classic bedside intervention for anxiety-induced acute respiratory alkalosis.

## pitfalls
Reaching for supplemental oxygen, which does not address the underlying problem of excessive CO2 elimination.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHY-T04

## secondary_node_ids
[clear]

## topic
Physiology

## subtopic
Acid-Base Physiology

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Acid-Base Physiology

## article_ids
ART-MU101-ACIDBASE-D4BF76CA

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.3

## exam_weight_by_year
MU_Y1=0.3

## clinical_relevance
0.7

## academic_relevance
0.3

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-57EA6E88793B03

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Ben has an anxiety attack, respiratory alkalosis -> next nursing intervention: have him breathe into a paper bag

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p15 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q08 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p15, red-text key (question numbered "8.Ben" with no space, missed by pagetext.mjs keys' regex; resolved by reading the PDF's per-span colour data directly).

---

# Item

## label
CO2 and water form carbonic acid, which dissociates into hydrogen ion and bicarbonate

## id
CON-FND-2905C98769FD5A

## canonical_key
acid-base.buffer.co2-water-carbonic-acid-h-bicarbonate

## aliases


## arabic_label


## arabic_aliases


## definition
The bicarbonate buffer reaction proceeds CO2 + H2O <-> H2CO3 <-> H+ + HCO3-, catalysed rapidly by carbonic anhydrase in red cells and renal tubular cells. Carbon dioxide and water first combine to form carbonic acid, which then dissociates into a hydrogen ion and bicarbonate, linking CO2 handling by the lungs to bicarbonate handling by the kidneys.

## explicit_objective
State the two-step bicarbonate buffer reaction: CO2 + water forms carbonic acid, which dissociates into hydrogen ion and bicarbonate.

## pitfalls
Reversing the order of the reaction, or naming oxygen or carbon dioxide itself as one of the dissociation products instead of bicarbonate.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHY-T04

## secondary_node_ids
[clear]

## topic
Physiology

## subtopic
Acid-Base Physiology

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Acid-Base Physiology

## article_ids
ART-MU101-ACIDBASE-D4BF76CA

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-2905C98769FD5A

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
In the bicarbonate buffering system, CO2 and water join to form ___, which dissociates into hydrogen and ___ -> carbonic acid, bicarbonate

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p15 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q09 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p15, red-text key (question numbered "9.In" with no space, missed by pagetext.mjs keys' regex; resolved by reading the PDF's per-span colour data directly).

---

# Item

## label
Molality is moles of solute per kilogram of solvent

## id
CON-FND-A6366627A6860E

## canonical_key
solution-chemistry.molality.definition-and-calculation

## aliases


## arabic_label


## arabic_aliases


## definition
Molality (m) is defined as the number of moles of solute per kilogram of solvent (mol/kg). Because it is mass-based rather than volume-based, molality is independent of temperature, unlike molarity, which makes it preferred for precise physical-chemistry calculations such as freezing-point depression. For example, dissolving 2 moles of a solute in 400 g (0.4 kg) of solvent gives a molality of 2 / 0.4 = 5 mol/kg.

## explicit_objective
State the definition of molality as moles of solute per kilogram of solvent, and apply it to a simple numeric example.

## pitfalls
Confusing molality (per kilogram of solvent) with molarity (per litre of solution) -- the two units are not interchangeable and give different numeric answers for the same solution.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Solution Chemistry

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Solution Chemistry

## article_ids
ART-MU101-SOLNCHEM-49A71510

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.3

## exam_weight_by_year
MU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-A6366627A6860E

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Molality (m) = moles of solute / ___ -> kilogram of solvent; worked example: 2 mol NaOH in 400 g water -> 5 mol/kg

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p15 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q10 and q12 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p15-16, red-text key (q10 numbered "10.Molality" with no space, missed by pagetext.mjs keys' regex; resolved by reading the PDF's per-span colour data directly).

---

# Item

## label
The molar mass of sodium hydroxide (NaOH) is 40 grams per mole

## id
CON-FND-F08DE65A4D2FA4

## canonical_key
solution-chemistry.molar-mass.naoh-40-g-per-mol

## aliases


## arabic_label


## arabic_aliases


## definition
Sodium hydroxide, NaOH, sums the atomic masses of one sodium (approximately 23 g/mol), one oxygen (approximately 16 g/mol) and one hydrogen (approximately 1 g/mol) atom to give a molar mass of 40 g/mol. This straightforward summation of atomic masses from the periodic table is the standard method for calculating the molar mass of any simple ionic compound.

## explicit_objective
Calculate the molar mass of NaOH by summing the atomic masses of sodium, oxygen and hydrogen.

## pitfalls
Mis-adding the individual atomic masses (23 + 16 + 1) and landing on a nearby but incorrect total such as 38, 45 or 50.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Solution Chemistry

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Solution Chemistry

## article_ids
ART-MU101-SOLNCHEM-49A71510

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.25

## exam_weight_by_year
MU_Y1=0.25

## clinical_relevance
0.1

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-F08DE65A4D2FA4

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Molar mass of NaOH is ___ -> 40 grams/mol

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p15 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q11 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p15-16, red-text key (question numbered "11.Molar" with no space, missed by pagetext.mjs keys' regex; resolved by reading the PDF's per-span colour data directly).

---

# Item

## label
Normality is the number of mole equivalents of solute per litre of solution

## id
CON-FND-71E0F5AABC0F85

## canonical_key
solution-chemistry.normality.definition

## aliases


## arabic_label


## arabic_aliases


## definition
Normality is defined as the number of gram-equivalents (mole equivalents) of solute per litre of solution. It differs from molarity because it accounts for the reactive capacity of the solute -- one mole of a diprotic acid, for instance, supplies two equivalents of H+, so its normality is twice its molarity -- and is particularly used in acid-base and redox contexts.

## explicit_objective
State that normality is defined as mole equivalents of solute per litre of solution, and distinguish it from molarity and molality.

## pitfalls
Confusing normality with molarity; normality specifically counts reactive equivalents, not simple moles of the whole solute species.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Solution Chemistry

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Solution Chemistry

## article_ids
ART-MU101-SOLNCHEM-49A71510

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.3

## exam_weight_by_year
MU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-71E0F5AABC0F85

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
It is defined as the number of mole equivalents per liter of solution -> NORMALITY

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p16 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q13 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p16, red-text key.

---

# Item

## label
Invert sugar is composed of glucose and fructose

## id
CON-FND-7B94977469CE26

## canonical_key
carbohydrate-chemistry.invert-sugar.glucose-fructose-composition

## aliases


## arabic_label


## arabic_aliases


## definition
Invert sugar is the equimolar mixture of glucose and fructose produced by hydrolysis of sucrose, called "invert" because the optical rotation of the mixture is opposite in sign to that of the original sucrose. It is sweeter than sucrose and used commercially in confectionery and preserves because it resists crystallisation.

## explicit_objective
State that invert sugar consists of a glucose-fructose mixture produced by sucrose hydrolysis.

## pitfalls
Confusing invert sugar's composition (glucose + fructose) with maltose (glucose + glucose) or lactose (glucose + galactose).

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Carbohydrate Chemistry

## article_ids
ART-MU101-CARBCHEM-9E8FDE35

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.3

## exam_weight_by_year
MU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-7B94977469CE26

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Invert sugar consists of -> Glucose + fructose

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p16 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q14 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p16, red-text key.

---

# Item

## label
Hyaluronic acid's repeating disaccharide unit is N-acetylglucosamine and D-glucuronic acid

## id
CON-FND-41A66DE2892493

## canonical_key
carbohydrate-chemistry.hyaluronic-acid.repeat-unit

## aliases


## arabic_label


## arabic_aliases


## definition
Hyaluronic acid is a glycosaminoglycan built from a repeating disaccharide of N-acetylglucosamine and D-glucuronic acid, forming a very long, unbranched, unsulfated polysaccharide chain. Unlike the other glycosaminoglycans, it is not sulfated and is not attached to a core protein as a proteoglycan, and it binds huge amounts of water to give synovial fluid and the extracellular matrix their viscosity.

## explicit_objective
State the repeating disaccharide unit of hyaluronic acid: N-acetylglucosamine and D-glucuronic acid.

## pitfalls
Confusing hyaluronic acid's repeat unit with chondroitin/dermatan sulfate's (N-acetylgalactosamine-based) repeat units.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Carbohydrate Chemistry

## article_ids
ART-MU101-CARBCHEM-9E8FDE35

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.3

## exam_weight_by_year
MU_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-41A66DE2892493

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Repeating units of hyaluronic acid are -> N-acetyl glucosamine and D-glucuronic acid

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p16 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q15 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p16, red-text key.

---

# Item

## label
Glyceraldehyde is the simplest aldose sugar

## id
CON-FND-9754E4BE532753

## canonical_key
carbohydrate-chemistry.aldose.glyceraldehyde-simplest-aldose

## aliases


## arabic_label


## arabic_aliases


## definition
Glyceraldehyde is the simplest possible aldose, a three-carbon sugar carrying an aldehyde group on carbon 1, and is the reference compound used to define the D and L configurations for all other monosaccharides. Larger aldoses such as glucose share its aldehyde functional group, distinguishing them from ketoses such as fructose, ribulose, erythrulose and dihydroxyacetone, which carry a ketone group instead.

## explicit_objective
Identify glyceraldehyde as the simplest aldose and distinguish aldoses from ketoses by their functional group.

## pitfalls
Selecting a ketose (fructose, ribulose, erythrulose, dihydroxyacetone) as the aldose, based only on sugar-family familiarity rather than the functional group.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Carbohydrate Chemistry

## article_ids
ART-MU101-CARBCHEM-9E8FDE35

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.3

## exam_weight_by_year
MU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-9754E4BE532753

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
The aldose sugar is -> Glyceraldehyde

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p17 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q16 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p17, red-text key.

---

# Item

## label
Lactose is formed by a beta-1,4-galactosidic bond between galactose and glucose

## id
CON-FND-B79A436C6533E1

## canonical_key
carbohydrate-chemistry.lactose.beta-1-4-galactosidic-linkage

## aliases


## arabic_label


## arabic_aliases


## definition
Lactose, the principal sugar of milk, is a disaccharide of galactose and glucose joined by a beta-1,4-galactosidic bond, in which the anomeric carbon of beta-D-galactose links to carbon 4 of D-glucose. This beta linkage is why lactose requires the specific enzyme lactase (beta-galactosidase) for hydrolysis, and why lactase deficiency (lactose intolerance) leaves it undigested and osmotically active in the gut.

## explicit_objective
State that lactose is formed by a beta-1,4-galactosidic linkage between galactose and glucose, and name the digestive enzyme this requires.

## pitfalls
Confusing lactose's beta-1,4 linkage with maltose's alpha-1,4 linkage, or with glycogen/amylopectin's alpha-1,6 branch linkage.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Carbohydrate Chemistry

## article_ids
ART-MU101-CARBCHEM-9E8FDE35

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-B79A436C6533E1

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Lactose is formed from galactose and glucose united by -> beta-1-4-galactosidic linkage

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p17 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q17 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p17, red-text key.

---

# Item

## label
Sucrose is composed of alpha-D-glucose and beta-D-fructose joined at both anomeric carbons

## id
CON-FND-AF2B462D55E69C

## canonical_key
carbohydrate-chemistry.sucrose.alpha-glucose-beta-fructose

## aliases


## arabic_label


## arabic_aliases


## definition
Sucrose is a disaccharide formed by an alpha-1,2-glycosidic bond joining the anomeric carbon of alpha-D-glucose to the anomeric carbon of beta-D-fructose. Because this bond links both sugars' anomeric carbons, sucrose has no free anomeric carbon and, unlike lactose or maltose, is a non-reducing sugar.

## explicit_objective
State that sucrose is composed of alpha-glucose and beta-fructose, joined through both anomeric carbons, making it a non-reducing sugar.

## pitfalls
Reversing the anomeric configurations (alpha/beta) of the two component sugars, or naming two glucose units instead of glucose plus fructose.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Carbohydrate Chemistry

## article_ids
ART-MU101-CARBCHEM-9E8FDE35

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-AF2B462D55E69C

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Sucrose consists of which of the following -> alpha Glucose + beta fructose

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p17 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q19 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p17, red-text key.

---

# Item

## label
Heparin's repeating disaccharide unit carries three sulfate groups

## id
CON-FND-8B7D8582182540

## canonical_key
glycosaminoglycan.heparin.three-sulfate-groups-per-disaccharide

## aliases


## arabic_label


## arabic_aliases


## definition
Heparin is one of the most heavily sulfated biological macromolecules: its repeating disaccharide unit carries three sulfate groups plus one carboxyl group, making it the body's most strongly acidic, most densely negatively charged natural anticoagulant. It is secreted by mast cells, acts chiefly by potentiating antithrombin III, and is also used clinically as an injectable anticoagulant drug.

## explicit_objective
State that heparin's repeating disaccharide unit carries three sulfate groups, and that it is secreted by mast cells and acts as a natural and clinical anticoagulant.

## pitfalls
Underestimating heparin's sulfation as two groups per disaccharide rather than the correct figure of three, which is what makes it so strongly anionic.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Glycosaminoglycans and Glycoproteins

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Glycosaminoglycans and Glycoproteins

## article_ids
ART-MU101-GAGGLYCO-87AAAE0F

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.4

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-8B7D8582182540

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Which is false about heparin -> "contains 2 sulphate groups" is false; it carries 3

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p18 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q20 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p18, red-text key.

---

# Item

## label
Immunoglobulins are a glycoprotein example, carrying attached oligosaccharide chains

## id
CON-FND-0A30250CF4A5B1

## canonical_key
glycoprotein.function.immunoglobulins-as-glycoprotein-example

## aliases


## arabic_label


## arabic_aliases


## definition
Glycoproteins are proteins carrying covalently attached oligosaccharide chains, and immunoglobulins (antibodies) are a classic example: the carbohydrate component contributes to their folding, stability, secretion and effector function. This makes immune defence one of the functional roles carried out by a glycoprotein, distinguishing glycoproteins (mostly protein) from proteoglycans and glycosaminoglycans (mostly carbohydrate).

## explicit_objective
State that immunoglobulins are a functional example of glycoproteins, and explain the general glycoprotein-versus-proteoglycan distinction.

## pitfalls
Attributing glycoprotein-associated functions (like immune defence) to a pure glycosaminoglycan such as heparin instead.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Glycosaminoglycans and Glycoproteins

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Glycosaminoglycans and Glycoproteins

## article_ids
ART-MU101-GAGGLYCO-87AAAE0F

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.4

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-0A30250CF4A5B1

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
A function of glycoproteins -> Immunoglobulins

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p18 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q21 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p18, red-text key.

---

# Item

## label
Hyaluronic acid is the one glycosaminoglycan that carries no sulphate groups

## id
CON-FND-F4865459F719A6

## canonical_key
glycosaminoglycan.hyaluronic-acid.no-sulfate-groups

## aliases


## arabic_label


## arabic_aliases


## definition
Hyaluronic acid is the one glycosaminoglycan that is never sulfated: its repeating disaccharide (N-acetylglucosamine and D-glucuronic acid) carries carboxyl groups but no sulfate esters, unlike heparin, keratan sulfate and chondroitin sulfate. This also explains why hyaluronic acid, unlike the other glycosaminoglycans, is never found covalently linked to a core protein as a proteoglycan.

## explicit_objective
Identify hyaluronic acid as the glycosaminoglycan lacking sulphate groups, and contrast it with the sulfated glycosaminoglycans.

## pitfalls
Assuming all glycosaminoglycans are sulfated because heparin, keratan sulfate and chondroitin sulfate are; hyaluronic acid is the specific exception.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Glycosaminoglycans and Glycoproteins

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Glycosaminoglycans and Glycoproteins

## article_ids
ART-MU101-GAGGLYCO-87AAAE0F

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.3

## exam_weight_by_year
MU_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-F4865459F719A6

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Which does not have sulphuric acid groups -> Hyaluronic acid

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p18 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q23 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p18, red-text key.

---

# Item

## label
Starch is a mixture of unbranched amylose and branched amylopectin

## id
CON-FND-99CC4397B1DE0C

## canonical_key
carbohydrate-chemistry.starch.amylose-amylopectin-composition

## aliases


## arabic_label


## arabic_aliases


## definition
Starch, the storage polysaccharide of plants, is a mixture of two glucose polymers: amylose, an unbranched alpha-1,4-linked chain that forms a helix and gives the blue colour with iodine, and amylopectin, a branched polymer of alpha-1,4-linked chains with alpha-1,6 branch points roughly every 24-30 residues, which makes up the larger fraction of most starches.

## explicit_objective
State that starch consists of unbranched amylose and branched amylopectin, and describe their structural difference.

## pitfalls
Describing amylose as branched, or amylopectin as unbranched -- the branching is specific to amylopectin only.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Carbohydrate Chemistry

## article_ids
ART-MU101-CARBCHEM-9E8FDE35

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-99CC4397B1DE0C

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Starch consists of -> Unbranched amylose and branched amylopectin

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p19 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q24 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p19, red-text key.

---

# Item

## label
"Invert sugar" is the name given to the glucose-fructose mixture produced by sucrose hydrolysis

## id
CON-FND-1EBEB86CAB058D

## canonical_key
carbohydrate-chemistry.invert-sugar.naming-as-hydrolysis-mixture

## aliases


## arabic_label


## arabic_aliases


## definition
"Invert sugar" or "inverted sugar" is the name given specifically to the equimolar mixture of glucose and fructose produced when sucrose is hydrolysed by acid or the enzyme invertase/sucrase, reflecting the inversion (sign change) of optical rotation between sucrose and the resulting mixture. This naming question is distinct from the earlier compositional fact of what invert sugar contains: this concept covers what the mixture as a whole is called.

## explicit_objective
State that "invert sugar" names the mixture produced by hydrolysing sucrose, as distinct from naming glucose or fructose alone.

## pitfalls
Naming only one component (glucose, fructose, or dextrose) as "invert sugar" rather than the complete hydrolysis mixture that the term actually refers to.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Carbohydrate Chemistry

## article_ids
ART-MU101-CARBCHEM-9E8FDE35

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.25

## exam_weight_by_year
MU_Y1=0.25

## clinical_relevance
0.2

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-1EBEB86CAB058D

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Also known as inverted sugar -> Mixture of hydrolysis of sucrose

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p19 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q25 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p19, red-text key.

---

# Item

## label
Dihydroxyacetone is the only carbohydrate with no asymmetric (chiral) carbon

## id
CON-FND-ED32F5874F5421

## canonical_key
carbohydrate-chemistry.dihydroxyacetone.no-chiral-centre

## aliases


## arabic_label


## arabic_aliases


## definition
Dihydroxyacetone is the simplest possible ketose, a three-carbon sugar whose central carbon bears the ketone group and is attached to two identical -CH2OH groups. Because none of its three carbons has four different substituents, dihydroxyacetone has no chiral centre and no D or L form, unlike every other monosaccharide (including glyceraldehyde, erythrose and erythrulose, which each have at least one chiral carbon).

## explicit_objective
Identify dihydroxyacetone as the one carbohydrate with no asymmetric carbon, and explain why it therefore lacks D/L forms.

## pitfalls
Assuming any three-carbon sugar lacks a chiral centre; glyceraldehyde, the aldose counterpart, does have one (carbon 2) and does have D/L forms.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Carbohydrate Chemistry

## article_ids
ART-MU101-CARBCHEM-9E8FDE35

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.3

## exam_weight_by_year
MU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-ED32F5874F5421

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
The only carbohydrate with no asymmetric carbon atoms -> Dihydroxyacetone

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p19 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q26 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p19, red-text key.

---

# Item

## label
Maltose is two glucose units joined by an alpha-1,4-glycosidic bond

## id
CON-FND-24219DD2F169B6

## canonical_key
carbohydrate-chemistry.maltose.alpha-1-4-glucose-glucose

## aliases


## arabic_label


## arabic_aliases


## definition
Maltose is a disaccharide of two glucose units joined by an alpha-1,4-glycosidic bond, produced physiologically as an intermediate of starch digestion by salivary and pancreatic amylase. Because the bond involves only one of the two anomeric carbons, the second glucose retains a free anomeric carbon, making maltose a reducing sugar, unlike sucrose.

## explicit_objective
State that maltose is formed of two glucose units joined by an alpha-1,4-glycosidic bond, and name its physiological origin.

## pitfalls
Confusing maltose's alpha-1,4-glucose-glucose linkage with cellulose's beta-1,4-glucose-glucose linkage (cellobiose), which differs only in anomeric configuration but is biologically very different.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Carbohydrate Chemistry

## article_ids
ART-MU101-CARBCHEM-9E8FDE35

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-24219DD2F169B6

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Glycosidic linkage found in maltose -> Glucose (alpha1-4) Glucose

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p19 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q27 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p19, red-text key (pagetext.mjs keys reported this item ambiguous, flagging both B and D; resolved by reading the PDF's per-span colour data directly, confirming only option B is marked).

---

# Item

## label
A glycoprotein is an oligosaccharide covalently linked to a protein

## id
CON-FND-05A8CEB2CD0029

## canonical_key
glycoprotein.definition.oligosaccharide-linked-to-protein

## aliases


## arabic_label


## arabic_aliases


## definition
When one or more oligosaccharide chains are covalently attached to a protein, typically via N-linkage to asparagine or O-linkage to serine/threonine, the resulting molecule is a glycoprotein. Glycoproteins are mostly protein by mass, with the attached carbohydrate influencing folding, stability, solubility, half-life and recognition, distinguishing them from proteoglycans, which are mostly carbohydrate attached to a smaller protein core.

## explicit_objective
Define a glycoprotein as an oligosaccharide covalently linked to a protein, distinguishing it from a glycolipid and a proteoglycan.

## pitfalls
Confusing glycoproteins (carbohydrate-on-protein) with glycolipids (carbohydrate-on-lipid, such as gangliosides) or proteoglycans (mostly carbohydrate).

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T01

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Glycosaminoglycans and Glycoproteins

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Glycosaminoglycans and Glycoproteins

## article_ids
ART-MU101-GAGGLYCO-87AAAE0F

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.3

## exam_weight_by_year
MU_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-05A8CEB2CD0029

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Oligosaccharides linked to proteins are called -> Glycoproteins

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p20 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q28 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p19-20, red-text key (question numbered "28.Oligosaccharides" with no space, missed by pagetext.mjs keys' regex; resolved by reading the PDF's per-span colour data directly).

---

# Item

## label
Cellulose is built of D-glucose units joined by beta-1,4-glycosidic bonds

## id
CON-FND-F9F45E1748DD65

## canonical_key
carbohydrate-chemistry.cellulose.beta-1-4-linkage

## aliases


## arabic_label


## arabic_aliases


## definition
Cellulose is an unbranched, structural polysaccharide of D-glucose units joined exclusively by beta-1,4-glycosidic bonds, which force each successive glucose to rotate 180 degrees relative to its neighbour, producing long, straight, hydrogen-bonded chains that pack into rigid microfibrils. Humans lack the beta-glucosidase needed to hydrolyse this bond, so cellulose passes through the gut undigested as dietary fibre.

## explicit_objective
State that cellulose's glucose units are joined by beta-1,4-glycosidic bonds, and explain why humans cannot digest it.

## pitfalls
Confusing cellulose's beta-1,4 linkage with starch/glycogen's alpha-1,4 linkage, which humans can digest via amylase.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Carbohydrate Chemistry

## article_ids
ART-MU101-CARBCHEM-9E8FDE35

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.3

## exam_weight_by_year
MU_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-F9F45E1748DD65

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Cellulose is made up of repeating units of -> beta-1-4 linkage between D-glucose units

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p20 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q30 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p20, red-text key.

---

# Item

## label
Amylopectin combines alpha-1,4 backbone linkages with alpha-1,6 branch linkages

## id
CON-FND-3AE7A52E50C9A2

## canonical_key
carbohydrate-chemistry.amylopectin.alpha-1-4-and-alpha-1-6-linkages

## aliases


## arabic_label


## arabic_aliases


## definition
Amylopectin, the branched component of starch, is built from D-glucose units joined by alpha-1,4-glycosidic bonds along its linear stretches, with additional alpha-1,6-glycosidic bonds introduced roughly every 24-30 residues to create branch points. This combination of a 1,4 backbone and 1,6 branches is structurally identical in principle to glycogen, though glycogen branches more frequently, about every 8-12 residues.

## explicit_objective
State that amylopectin combines alpha-1,4 backbone linkages with alpha-1,6 branch linkages, and compare its branch frequency to glycogen.

## pitfalls
Describing amylopectin's linkages as beta rather than alpha, or omitting the 1,6 branch linkage entirely.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Carbohydrate Chemistry

## article_ids
ART-MU101-CARBCHEM-9E8FDE35

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.3

## exam_weight_by_year
MU_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-3AE7A52E50C9A2

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Amylopectin has -> alpha-1-4 and alpha-1-6 linkage

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p20 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q31 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p20, red-text key.

---

# Item

## label
Erythrulose is the keto tetrose (a four-carbon ketose)

## id
CON-FND-27F1AC824735FB

## canonical_key
carbohydrate-chemistry.classification.erythrulose-keto-tetrose

## aliases


## arabic_label


## arabic_aliases


## definition
Erythrulose is a four-carbon ketose, the ketone-bearing counterpart of the aldotetrose erythrose. Naming monosaccharides by carbon number plus functional group (tetrose/pentose/hexose, aldo-/keto-) is the standard classification system, distinguishing erythrulose (a keto tetrose) from xylulose (a keto pentose) and sorbose/psicose (keto hexoses).

## explicit_objective
Classify erythrulose as the keto tetrose among a set of named monosaccharides, using the carbon-number-plus-functional-group system.

## pitfalls
Selecting a sugar with the correct functional group (ketose) but the wrong carbon count (a pentose or hexose) instead of the four-carbon erythrulose.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Carbohydrate Chemistry

## article_ids
ART-MU101-CARBCHEM-9E8FDE35

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.25

## exam_weight_by_year
MU_Y1=0.25

## clinical_relevance
0.1

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-27F1AC824735FB

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
A keto tetrose -> Erythrulose

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p20 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q32 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p20, red-text key.

---

# Item

## label
Glycogen is the major carbohydrate storage form in animals

## id
CON-FND-A717B3B956BD3E

## canonical_key
carbohydrate-chemistry.glycogen.major-animal-storage-form

## aliases


## arabic_label


## arabic_aliases


## definition
Glycogen is the major carbohydrate storage polysaccharide of animals, stored chiefly in liver and skeletal muscle, built of D-glucose units joined by alpha-1,4 linkages with alpha-1,6 branch points roughly every 8-12 residues -- more heavily branched than plant starch. This heavy branching gives it many free ends for rapid, simultaneous mobilisation of glucose during fasting or exercise.

## explicit_objective
State that glycogen is the major animal carbohydrate storage form, and contrast it with starch (the plant equivalent) and cellulose/chitin (structural polysaccharides).

## pitfalls
Naming starch as the animal storage form; starch is the plant equivalent, and glycogen is animals' analogous but more heavily branched storage polysaccharide.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T03

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Carbohydrate Chemistry

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Carbohydrate Chemistry

## article_ids
ART-MU101-CARBCHEM-9E8FDE35

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-A717B3B956BD3E

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Major storage form of carbohydrates in animals -> Glycogen

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p21 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q33 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p21, red-text key.

---

# Item

## label
Ceruloplasmin is a copper-binding metalloprotein of plasma

## id
CON-FND-4CDCC389A481F0

## canonical_key
protein-chemistry.metalloprotein.ceruloplasmin-copper-binding

## aliases


## arabic_label


## arabic_aliases


## definition
Ceruloplasmin is a copper-binding plasma glycoprotein, and its bound copper (six to seven atoms per molecule) makes it a metalloprotein -- a protein whose function depends on a tightly bound metal cofactor. It also has ferroxidase activity, oxidising Fe2+ to Fe3+ to allow its loading onto transferrin, and is characteristically low in Wilson's disease, a disorder of copper metabolism.

## explicit_objective
Identify ceruloplasmin as a copper-binding metalloprotein, and name its ferroxidase function and its association with Wilson's disease.

## pitfalls
Selecting a simple, non-metal-binding plasma protein (albumin) or a protein classified for other reasons (casein a phosphoprotein, salmin a protamine, gelatin a collagen derivative) instead of the true metalloprotein.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Proteins and Amino Acids

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Proteins and Amino Acids

## article_ids
ART-MU101-PROTEINAA-C5C4756B

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.3

## exam_weight_by_year
MU_Y1=0.3

## clinical_relevance
0.5

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-4CDCC389A481F0

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
An example of metalloprotein is -> ceruloplasmin

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p21 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q34 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p21, red-text key.

---

# Item

## label
The alpha helix and beta-pleated sheet are examples of protein secondary structure

## id
CON-FND-6AE7C832CAA796

## canonical_key
protein-chemistry.structure.alpha-helix-beta-sheet-secondary-structure

## aliases


## arabic_label


## arabic_aliases


## definition
Secondary structure describes the regular, local, repeating folding patterns of the polypeptide backbone, stabilised by hydrogen bonds between backbone amide and carbonyl groups. The alpha helix (a right-handed coil) and the beta-pleated sheet (extended, hydrogen-bonded strands) are the two classic examples, forming before the chain packs into its overall three-dimensional tertiary fold.

## explicit_objective
Classify the alpha helix and beta-pleated sheet as secondary structure, and distinguish this level from primary, tertiary and quaternary structure.

## pitfalls
Confusing secondary structure (local backbone folding patterns like the helix/sheet) with tertiary structure (the overall 3D fold of one chain) or quaternary structure (the assembly of multiple chains).

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Proteins and Amino Acids

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Proteins and Amino Acids

## article_ids
ART-MU101-PROTEINAA-C5C4756B

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-6AE7C832CAA796

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Alpha-helix and beta-pleated sheet are examples of -> Secondary structure

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p21 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q35 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p21, red-text key. Source formatting note: option A ("Primary structure") is printed without an "a)" label, unlike options B-E.

---

# Item

## label
Glutamine is the uncharged amide derivative of the acidic amino acid glutamic acid

## id
CON-FND-3D0104B8490B14

## canonical_key
protein-chemistry.amino-acid.glutamine-amide-of-glutamic-acid

## aliases


## arabic_label


## arabic_aliases


## definition
Glutamine is the amide of glutamic acid: its side-chain carboxyl group is converted to an amide (-CONH2) group, which removes the negative charge glutamic acid carries at physiological pH. This makes glutamine the uncharged amide derivative of the acidic amino acid glutamic acid, exactly as asparagine is the uncharged amide derivative of aspartic acid.

## explicit_objective
State that glutamine is the uncharged amide derivative of glutamic acid, and name the parallel asparagine/aspartic acid pair.

## pitfalls
Selecting an amino acid derivative unrelated to an acidic parent (cystine, a sulfur-containing dimer; tyrosine, an aromatic amino acid) instead of the amide of an acidic amino acid.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T05

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Proteins and Amino Acids

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Proteins and Amino Acids

## article_ids
ART-MU101-PROTEINAA-C5C4756B

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.3

## exam_weight_by_year
MU_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-3D0104B8490B14

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Uncharged derivative of an acidic amino acid -> Glutamine

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p22 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-biochemphys-q38 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Biochemistry/Physiology sub-block, p22, red-text key. Source anomaly: a stray sixth line "f) Isoleucine" follows option E with no red mark; read as extraneous noise and excluded.

---

# Item

## label
The morula is the first embryonic stage to reach the uterine cavity, around day 4

## id
CON-DEV-FD37F8117B3AE6

## canonical_key
embryology.cleavage.morula-first-stage-in-uterine-cavity-day4

## aliases


## arabic_label


## arabic_aliases


## definition
After fertilization in the ampulla of the uterine tube, the zygote undergoes cleavage while being transported along the tube, reaching the 16-cell morula stage by about day 3-4. The morula is the first embryonic stage to reach the uterine cavity, entering around day 4 after fertilization, and only later develops a fluid-filled cavity to become a blastocyst.

## explicit_objective
State that the morula is the first embryonic stage to arrive in the uterine cavity, arriving around day 4 after fertilization.

## pitfalls
Naming the blastocyst as the first stage to reach the uterine cavity; the blastocyst forms only after the morula has already been in the uterus for a day or so.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T01

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Fertilization and Implantation

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Fertilization and Implantation

## article_ids
ART-MU101-FERTIMPLANT-8D855BD3

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-FD37F8117B3AE6

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Morula enters the uterine cavity at -> 4th day; first stage to reach uterine lumen after fertilization -> Morula

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p3 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q01 and q17 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p3 and p7, red-text key on stem and option.

---

# Item

## label
Striated (skeletal) muscle is a mesodermal derivative arising from the somite myotome

## id
CON-DEV-7F44BF85B67373

## canonical_key
embryology.germ-layers.striated-muscle-mesoderm-derivative

## aliases


## arabic_label


## arabic_aliases


## definition
Striated (skeletal) muscle arises chiefly from the myotome of the somites (paraxial mesoderm), whose cells differentiate into myoblasts and fuse to form multinucleated skeletal muscle fibres. This is a classic example used to distinguish mesoderm-derived tissues (muscle, bone, connective tissue, blood vessels, kidneys) from ectoderm-derived tissues (nervous system, epidermis) and endoderm-derived tissues (gut lining and its glandular derivatives).

## explicit_objective
Identify striated muscle as a mesodermal derivative arising from the somite myotome, distinguishing it from ectodermal and endodermal derivatives.

## pitfalls
Selecting an ectodermal structure (brain) or an endodermal structure (intestinal mucosa, thymus gland) instead of the true mesodermal derivative.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T01

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Germ Layers and Derivatives

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Germ Layers and Derivatives

## article_ids
ART-MU101-GERMLAYERS-FCAB4BA8

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-7F44BF85B67373

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Structure derived from the mesoderm -> Striated muscle

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p3 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q03 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p3, red-text key on stem and option.

---

# Item

## label
Implantation near the internal cervical os produces placenta previa

## id
CON-DEV-8EF02511F3FBC0

## canonical_key
embryology.implantation.placenta-previa-low-implantation

## aliases


## arabic_label


## arabic_aliases


## definition
When the blastocyst implants abnormally low in the uterus, close to or over the internal cervical os, the resulting placenta develops in that low position and is called placenta previa. Because the placenta then lies in the path the fetus must pass through during delivery, placenta previa is an important cause of painless antepartum haemorrhage and typically requires caesarean delivery.

## explicit_objective
State that low implantation near the internal os produces placenta previa, and name its key clinical consequence.

## pitfalls
Confusing placenta previa (low intrauterine implantation) with an ectopic pregnancy (tubal, ovarian or abdominal implantation outside the normal uterine cavity site).

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T01

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Fertilization and Implantation

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Fertilization and Implantation

## article_ids
ART-MU101-FERTIMPLANT-8D855BD3

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.7

## academic_relevance
0.4

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-8EF02511F3FBC0

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Implantation of the blastocyst near the internal os -> Placenta previa

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p4 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q05 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p4, red-text key on stem and option.

---

# Item

## label
The primitive node lies at the cranial end of the primitive streak

## id
CON-DEV-EA33F77B49818A

## canonical_key
embryology.gastrulation.primitive-node-cranial-end-of-streak

## aliases


## arabic_label


## arabic_aliases


## definition
The primitive streak has a rounded thickening at its cranial end called the primitive node (Hensen's node), surrounding a central depression, the primitive pit. The primitive node is a key organiser centre: cells ingressing through it give rise to the notochordal process, and it directs induction of the neural plate in the overlying ectoderm.

## explicit_objective
State that the primitive node lies at the cranial end of the primitive streak, and name its role as an organiser for the notochord and neural plate.

## pitfalls
Confusing the primitive node with the notochord itself (a later derivative structure) or the primitive groove (the depression running the length of the streak).

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T01

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Germ Layers and Derivatives

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Germ Layers and Derivatives

## article_ids
ART-MU101-GERMLAYERS-FCAB4BA8

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-EA33F77B49818A

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
At the cranial end of the primitive streak lies the primitive -> Node

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p4 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q06 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p4, red-text key on stem and option.

---

# Item

## label
Spermatogonia are the mother stem cells of the entire sperm lineage

## id
CON-DEV-6A10B8CC932A0C

## canonical_key
embryology.gametogenesis.spermatogonia-mother-cell-of-sperm

## aliases


## arabic_label


## arabic_aliases


## definition
Spermatogonia are the diploid stem cells lying against the basement membrane of the seminiferous tubule, present from before puberty, that give rise to the entire spermatogenic lineage. A spermatogonium undergoes mitosis to renew the stem-cell pool and to produce primary spermatocytes, which then undergo meiosis I and II via secondary spermatocytes to spermatids, and finally spermiogenesis to mature spermatozoa.

## explicit_objective
State that spermatogonia are the mother cells of the sperm lineage, and trace the sequence from spermatogonium through to mature sperm.

## pitfalls
Selecting a later stage (primary spermatocyte, secondary spermatocyte or spermatid) as the "mother cell" instead of the original spermatogonial stem cell.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T01

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Gametogenesis and the Menstrual Cycle

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Gametogenesis and the Menstrual Cycle

## article_ids
ART-MU101-GAMETOMC-426DA802

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-6A10B8CC932A0C

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Mother cell of sperm is -> Spermatogonia

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p4 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q08 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p4, red-text key on stem and option.

---

# Item

## label
Oogenesis begins during intrauterine life, before birth

## id
CON-DEV-036376331E51AF

## canonical_key
embryology.gametogenesis.oogenesis-begins-intrauterine-life

## aliases


## arabic_label


## arabic_aliases


## definition
Oogenesis begins during intrauterine life: primordial germ cells colonise the developing ovary and proliferate by mitosis into oogonia, which enter meiosis I and arrest at prophase (as primary oocytes) before birth. This is a key contrast with spermatogenesis, which does not begin until puberty; a female is born with her full, non-renewing complement of primary oocytes already arrested in meiotic prophase.

## explicit_objective
State that oogenesis begins during intrauterine life, and contrast this timing with spermatogenesis, which begins only at puberty.

## pitfalls
Assuming oogenesis begins at puberty because ovulation and cyclic hormonal changes begin then; the process itself starts far earlier, before birth.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T01

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Gametogenesis and the Menstrual Cycle

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Gametogenesis and the Menstrual Cycle

## article_ids
ART-MU101-GAMETOMC-426DA802

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-036376331E51AF

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Oogenesis starts to occur -> During intrauterine life

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p5 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q09 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p5, red-text key on stem and option.

---

# Item

## label
The dermis is a mesodermal, not ectodermal, derivative of the skin

## id
CON-DEV-D1281FB0B48B26

## canonical_key
embryology.germ-layers.dermis-mesodermal-not-ectodermal

## aliases


## arabic_label


## arabic_aliases


## definition
The dermis, the deeper connective-tissue layer of the skin, is derived from mesoderm (from the somite dermatome over most of the body, and from neural crest in the face), unlike hair, nails, the CNS and the epidermis, which are all ectodermal. This makes the dermis the exception whenever a question lists otherwise-ectodermal skin/nervous-system structures.

## explicit_objective
Identify the dermis as the mesodermal exception among structures that are otherwise ectodermal (hair, CNS, nails, epidermis).

## pitfalls
Assuming the whole skin, dermis included, is ectodermal because the epidermis (its superficial layer) is; only the epidermis is ectodermal, the dermis beneath it is mesodermal.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T01

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Germ Layers and Derivatives

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Germ Layers and Derivatives

## article_ids
ART-MU101-GERMLAYERS-FCAB4BA8

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-D1281FB0B48B26

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Ectodermal in origin except -> Dermis

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p5 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q10 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p5, red-text key on stem and option.

---

# Item

## label
The chorion is formed of syncytiotrophoblast, cytotrophoblast and extraembryonic somatic mesoderm

## id
CON-DEV-7B6FEDA3793E2F

## canonical_key
embryology.placenta.chorion-layers-syncytio-cyto-somatic-mesoderm

## aliases


## arabic_label


## arabic_aliases


## definition
The chorion is composed of three layers: the syncytiotrophoblast (outer, invasive, multinucleated), the cytotrophoblast (inner, mononuclear, proliferative) beneath it, and the extraembryonic somatic (parietal) mesoderm lining the innermost surface. Intraembryonic mesoderm, by contrast, lies within the embryo proper and is not one of the chorion's layers.

## explicit_objective
List the three layers of the chorion (syncytiotrophoblast, cytotrophoblast, extraembryonic somatic mesoderm), and distinguish extraembryonic from intraembryonic mesoderm.

## pitfalls
Naming intraembryonic (rather than extraembryonic somatic) mesoderm as a chorion layer; only the extraembryonic somatic mesoderm lines the chorion.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T02

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Placenta and Fetal Membranes

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Placenta and Fetal Membranes

## article_ids
ART-MU101-PLACENTA-6CA76541

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-7B6FEDA3793E2F

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Layers of the chorion except -> Intraembryonic splanchnic mesoderm

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p5 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q11 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p5, red-text key on stem and option.

---

# Item

## label
The corpus luteum of pregnancy secretes hormones for about three months

## id
CON-DEV-F85B7F76DBDC79

## canonical_key
embryology.gametogenesis.corpus-luteum-of-pregnancy-three-months

## aliases


## arabic_label


## arabic_aliases


## definition
If pregnancy occurs, human chorionic gonadotropin (hCG) from the syncytiotrophoblast rescues the corpus luteum from degeneration, converting it into the corpus luteum of pregnancy, which continues secreting progesterone and some oestrogen for about the first three months (the first trimester). After this, the placenta becomes able to produce sufficient progesterone itself and the corpus luteum's function becomes non-essential and it regresses.

## explicit_objective
State that the corpus luteum of pregnancy remains the principal hormone source for about the first three months, and name the hormone (hCG) that rescues it.

## pitfalls
Confusing the corpus luteum of pregnancy's roughly three-month lifespan with the corpus luteum of menstruation's much shorter, roughly 14-day lifespan when pregnancy does not occur.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T01

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Gametogenesis and the Menstrual Cycle

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Gametogenesis and the Menstrual Cycle

## article_ids
ART-MU101-GAMETOMC-426DA802

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.5

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-F85B7F76DBDC79

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Corpus luteum of pregnancy secretes hormones for -> Three months

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p5 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q12 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p5, red-text key on stem and option.

---

# Item

## label
Fertilization normally occurs in the ampulla of the uterine tube

## id
CON-DEV-D66BAFF03A3C53

## canonical_key
embryology.fertilization.normal-site-ampulla-of-uterine-tube

## aliases


## arabic_label


## arabic_aliases


## definition
Fertilization normally occurs in the ampulla of the uterine (fallopian) tube, the widest and longest segment, where the ovulated secondary oocyte, swept in by the fimbriae, meets ascending sperm. This is also why the ampulla is the most common site for a tubal (ectopic) pregnancy, since the zygote is briefly retained here before being transported toward the uterus.

## explicit_objective
State that fertilization normally occurs in the ampulla of the uterine tube, and name why this is also the most common ectopic pregnancy site.

## pitfalls
Confusing the ampulla (fertilization site) with the fimbriated end/infundibulum (which captures the oocyte) or with sites relevant to implantation (uterine wall), which occur later.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T01

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Fertilization and Implantation

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Fertilization and Implantation

## article_ids
ART-MU101-FERTIMPLANT-8D855BD3

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-D66BAFF03A3C53

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Normal site of fertilization -> Ampulla of uterine tube

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p6 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q13 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p6, red-text key on stem and option (pagetext.mjs keys auto-read).

---

# Item

## label
Cytotrophoblast gives rise to the amniotic membrane

## id
CON-DEV-D36C2A370DF65D

## canonical_key
embryology.amnion.cytotrophoblast-gives-rise-to-amniotic-membrane

## aliases


## arabic_label


## arabic_aliases


## definition
The amniotic membrane (amnion) is lined by amnioblasts that this exam's own convention traces back to the cytotrophoblast lineage. The amnion these amnioblasts form then expands during folding to surround the embryo and enclose the amniotic cavity.

## explicit_objective
State that cytotrophoblast gives rise to the amniotic membrane, tested from both directions (what forms from cytotrophoblast, and what gives rise to the amnion).

## pitfalls
Naming hypoblast (source of Heuser's membrane/yolk-sac endoderm) or extraembryonic mesoderm (which later lines the amnion's outer surface) as the origin of the amniotic membrane instead of cytotrophoblast.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T02

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Amnion and Yolk Sac

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Amnion and Yolk Sac

## article_ids
ART-MU101-AMNIONYOLK-2197F9C7

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-D36C2A370DF65D

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Formed from cytotrophoblast -> Amniotic membrane; gives rise to the amniotic membrane -> Cytotrophoblast

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p6 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q14 and q33 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p6 and p10, red-text key on stem and option (pagetext.mjs keys auto-read).

---

# Item

## label
Amniotic fluid is overwhelmingly water by composition

## id
CON-DEV-5DDEC72B57CE54

## canonical_key
embryology.amnion.amniotic-fluid-mainly-water

## aliases


## arabic_label


## arabic_aliases


## definition
Amniotic fluid is overwhelmingly water, roughly 98-99% by composition, with a small remainder of dissolved electrolytes, proteins, urea, creatinine and, later in pregnancy, fetal cells and vernix. Its volume and composition change across pregnancy, initially a transudate of maternal plasma/fetal skin and later dominated by fetal urine and lung fluid, but water remains its overwhelming majority component throughout.

## explicit_objective
State that amniotic fluid is overwhelmingly composed of water, with only minor solute components such as creatinine, urea and phosphate.

## pitfalls
Selecting a minor solute (creatinine, urea, phosphate) as the "main component" of amniotic fluid instead of water, which vastly outweighs them by mass.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T02

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Amnion and Yolk Sac

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Amnion and Yolk Sac

## article_ids
ART-MU101-AMNIONYOLK-2197F9C7

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.3

## exam_weight_by_year
MU_Y1=0.3

## clinical_relevance
0.4

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-5DDEC72B57CE54

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Main component of the amniotic fluid -> Water

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p6 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q15 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p6, red-text key on stem and option (pagetext.mjs keys auto-read).

---

# Item

## label
Battledore placenta names marginal (peripheral) attachment of the umbilical cord

## id
CON-DEV-25BF9A0373B675

## canonical_key
embryology.placenta.battledore-placenta-marginal-cord-insertion

## aliases


## arabic_label


## arabic_aliases


## definition
When the umbilical cord inserts at the periphery (margin) of the placental disc rather than centrally, this is called a battledore placenta (marginal cord insertion), named for its resemblance to the paddle-shaped battledore bat used in an old racquet sport. It is usually of little clinical consequence on its own, unlike velamentous insertion, in which the cord vessels run unprotected through the membranes before reaching the placental edge.

## explicit_objective
Name battledore placenta as the term for marginal umbilical cord insertion, and distinguish it from velamentous insertion.

## pitfalls
Confusing battledore placenta (marginal cord insertion) with placenta accreta (abnormal adherence/invasion) or a lobed placenta (a placenta divided into separate lobes).

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T02

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Placenta and Fetal Membranes

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Placenta and Fetal Membranes

## article_ids
ART-MU101-PLACENTA-6CA76541

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.3

## exam_weight_by_year
MU_Y1=0.3

## clinical_relevance
0.5

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-25BF9A0373B675

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Attachment of the umbilical cord to the peripheral part of the placenta -> Battledore placenta

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p6 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q16 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p6-7, red-text key on stem and option (pagetext.mjs keys auto-read).

---

# Item

## label
The spermatid is the first haploid cell among the spermatogenic and oogenic lineage examples

## id
CON-DEV-9604D6EE7771D8

## canonical_key
embryology.gametogenesis.spermatid-is-haploid

## aliases


## arabic_label


## arabic_aliases


## definition
The spermatid is produced after both meiotic divisions are complete (via the secondary spermatocyte), and is therefore haploid, carrying 23 chromosomes; it then undergoes spermiogenesis, a morphological remodelling rather than a further division, to become a mature spermatozoon. By contrast, the primary oocyte, primary spermatocyte, an ordinary somatic cell and the zygote are all diploid (46 chromosomes).

## explicit_objective
Identify the spermatid as haploid, and distinguish it from diploid cells at earlier gametogenic stages and from the diploid zygote.

## pitfalls
Assuming the primary spermatocyte or primary oocyte is already haploid because it is "on the way" to becoming a gamete; both remain diploid until after meiosis I.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T01

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Gametogenesis and the Menstrual Cycle

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Gametogenesis and the Menstrual Cycle

## article_ids
ART-MU101-GAMETOMC-426DA802

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-9604D6EE7771D8

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Cell with a haploid number of chromosomes -> Spermatid

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p7 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q18 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p7, red-text key on stem and option (pagetext.mjs keys auto-read).

---

# Item

## label
The chorionic plate is formed by extraembryonic mesoderm together with the trophoblast layers

## id
CON-DEV-E3665557EC3E81

## canonical_key
embryology.placenta.chorionic-plate-extraembryonic-mesoderm

## aliases


## arabic_label


## arabic_aliases


## definition
The chorionic plate, the fetal surface of the placenta from which the villi and umbilical vessels arise, is formed by extraembryonic mesoderm together with the trophoblast layers (cytotrophoblast and syncytiotrophoblast). The extraembryonic mesoderm lines the inside of the chorion and gives the chorionic plate its connective-tissue and vascular component.

## explicit_objective
State that extraembryonic mesoderm shares in forming the chorionic plate, alongside the trophoblast layers.

## pitfalls
Naming intraembryonic mesoderm, endoderm or ectoderm as contributing to the chorionic plate; only extraembryonic mesoderm (with the trophoblast layers) is involved.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T02

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Placenta and Fetal Membranes

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Placenta and Fetal Membranes

## article_ids
ART-MU101-PLACENTA-6CA76541

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-E3665557EC3E81

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Structure sharing in formation of the chorionic plate -> Extraembryonic mesoderm

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p7 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q19 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p7, red-text key on stem and option (pagetext.mjs keys auto-read).

---

# Item

## label
The allantois grows from the yolk sac into the connecting stalk

## id
CON-DEV-3E745A8189D52D

## canonical_key
embryology.placenta.allantois-invades-connecting-stalk

## aliases


## arabic_label


## arabic_aliases


## definition
The allantois grows from the caudal wall of the yolk sac into the connecting stalk, the structure that will become the umbilical cord, and its vessels go on to become the umbilical arteries and vein. Its distal part later becomes obliterated, forming the urachus, while its proximal part remains continuous with the developing bladder.

## explicit_objective
State that the allantois invades the connecting stalk, and trace what becomes of its proximal and distal parts.

## pitfalls
Reversing which part of the allantois is obliterated (distal, becoming the urachus) versus which remains continuous with the bladder (proximal).

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T02

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Placenta and Fetal Membranes

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Placenta and Fetal Membranes

## article_ids
ART-MU101-PLACENTA-6CA76541

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.4

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-3E745A8189D52D

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Regarding the allantois, the true statement -> It invades the connecting stalk

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p7 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q20 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p7-8, red-text key on stem and option (pagetext.mjs keys auto-read).

---

# Item

## label
The full spermatogenic cycle in the seminiferous tubules takes about 60 days

## id
CON-DEV-82DA2DB5B804BA

## canonical_key
embryology.gametogenesis.spermatogenic-cycle-60-days

## aliases


## arabic_label


## arabic_aliases


## definition
The complete cycle of spermatogenesis, from a spermatogonium's commitment to differentiation through both meiotic divisions and spermiogenesis to a mature spermatozoon, takes approximately 60-64 days in humans. This roughly two-month timescale means the effects of a toxic exposure or fever on sperm quality are typically seen about two months later.

## explicit_objective
State that the full spermatogenic cycle takes approximately 60 days, and explain its clinical relevance for timing exposures/treatments.

## pitfalls
Underestimating the spermatogenic cycle's duration as weeks or hours rather than the correct roughly two-month timescale.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T01

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Gametogenesis and the Menstrual Cycle

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Gametogenesis and the Menstrual Cycle

## article_ids
ART-MU101-GAMETOMC-426DA802

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.3

## exam_weight_by_year
MU_Y1=0.3

## clinical_relevance
0.4

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-82DA2DB5B804BA

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Cycle of spermatogenesis takes about -> 60 days

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p8 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q21 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p8, red-text key on stem and option (pagetext.mjs keys auto-read).

---

# Item

## label
The secretory-phase endometrial glands secrete a glycogen-rich, not glycogen-poor, material

## id
CON-DEV-476D9FB6F25672

## canonical_key
embryology.menstrual-cycle.secretory-phase-glands-glycogen-rich

## aliases


## arabic_label


## arabic_aliases


## definition
During the secretory phase of the menstrual cycle, progesterone drives the endometrial glands to secrete a glycogen-rich material that nourishes a potential early conceptus before placental circulation is established, alongside the glands becoming increasingly tortuous, the spiral arteries elongating, and the phase lasting a relatively fixed 14 days.

## explicit_objective
State that the secretory-phase glandular secretion is glycogen-rich (not glycogen-poor), alongside the other secretory-phase features (tortuous glands, 14-day length, lengthening spiral arteries).

## pitfalls
Describing the secretory-phase secretion as glycogen-poor; the glycogen-rich secretion is the defining, nutritive feature of this phase, in preparation for a possible early pregnancy.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T01

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Gametogenesis and the Menstrual Cycle

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Gametogenesis and the Menstrual Cycle

## article_ids
ART-MU101-GAMETOMC-426DA802

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.4

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-476D9FB6F25672

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Regarding the secretory phase, not correct -> "glands secrete a material poor in glycogen"

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p8 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q22 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p8, red-text key on stem and option (pagetext.mjs keys auto-read).

---

# Item

## label
The suprarenal cortex is mesodermal, unlike the ectodermal medulla

## id
CON-DEV-6E2F31C213049A

## canonical_key
embryology.germ-layers.suprarenal-cortex-mesodermal-not-ectodermal

## aliases


## arabic_label


## arabic_aliases


## definition
The suprarenal (adrenal) cortex develops from mesoderm (intermediate mesoderm/coelomic epithelium near the developing gonad and kidney), unlike the suprarenal medulla, which is derived from neural crest, itself an ectodermal derivative. Among structures such as the spinal cord, external auditory meatus and lower anal canal (all ectodermal), the suprarenal cortex stands out as mesodermal.

## explicit_objective
Identify the suprarenal cortex as mesodermal, distinguishing it from the neural-crest-derived (ectodermal) suprarenal medulla and from other genuinely ectodermal structures.

## pitfalls
Assuming the whole suprarenal gland is ectodermal because its medulla is; only the medulla is neural-crest/ectodermal, the cortex is mesodermal.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T01

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Germ Layers and Derivatives

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Germ Layers and Derivatives

## article_ids
ART-MU101-GERMLAYERS-FCAB4BA8

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-6E2F31C213049A

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Derivatives of ectoderm except -> Suprarenal cortex

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p8 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q23 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p8, red-text key on stem and option (pagetext.mjs keys auto-read).

---

# Item

## label
Meiosis I splits the primary spermatocyte into two haploid secondary spermatocytes, each 22 autosomes plus one sex chromosome

## id
CON-DEV-0ADC71836B6D09

## canonical_key
embryology.gametogenesis.secondary-spermatocyte-22-plus-x-or-y

## aliases


## arabic_label


## arabic_aliases


## definition
Meiosis I splits the primary spermatocyte's paired homologous chromosomes (44 autosomes + XY, diploid) into two secondary spermatocytes, each now haploid: 22 autosomes plus either one X or one Y sex chromosome. The Y-bearing secondary spermatocyte will go on, after meiosis II, to produce a Y-bearing spermatid and, ultimately, a male-determining sperm.

## explicit_objective
State that the secondary spermatocyte is haploid, carrying 22 autosomes plus a single sex chromosome (X or Y), and trace this from the diploid primary spermatocyte.

## pitfalls
Writing an internally inconsistent formula that combines a haploid autosome count with both sex chromosomes together, or a diploid autosome count with only one sex chromosome.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T01

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Gametogenesis and the Menstrual Cycle

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Gametogenesis and the Menstrual Cycle

## article_ids
ART-MU101-GAMETOMC-426DA802

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-0ADC71836B6D09

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
2ry spermatocyte contains chromosomes -> 22+Y

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p8 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q24 and q35 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p8-9 and p11, red-text key on stem and option (pagetext.mjs keys auto-read).

---

# Item

## label
The zygote is the cell formed by fusion of the male and female pronuclei

## id
CON-DEV-34A4AFD08BD2C5

## canonical_key
embryology.fertilization.zygote-formed-by-pronuclear-fusion

## aliases


## arabic_label


## arabic_aliases


## definition
After sperm entry, the sperm and oocyte nuclei each form a pronucleus, and syngamy -- the fusion of these two haploid pronuclei -- restores the diploid chromosome number and creates a genetically new, single-celled individual called the zygote. The zygote is the very first cell of the new organism and the starting point for all subsequent cleavage divisions.

## explicit_objective
State that the zygote is the cell formed by fusion of the male and female pronuclei, restoring the diploid number.

## pitfalls
Naming a stage that precedes fertilization (primary oocyte, secondary oocyte) or follows it after several divisions (morula) instead of the zygote itself.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T01

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Fertilization and Implantation

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Fertilization and Implantation

## article_ids
ART-MU101-FERTIMPLANT-8D855BD3

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.4

## exam_weight_by_year
MU_Y1=0.4

## clinical_relevance
0.5

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-34A4AFD08BD2C5

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Fusion of male and female pronuclei results in -> Zygote

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p9 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q25 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p9, red-text key on stem and option (pagetext.mjs keys auto-read).

---

# Item

## label
A secondary chorionic villus is formed of cytotrophoblast, syncytiotrophoblast and a mesenchymal core

## id
CON-DEV-85A12BF990199E

## canonical_key
embryology.placenta.secondary-chorionic-villus-composition

## aliases


## arabic_label


## arabic_aliases


## definition
A secondary chorionic villus develops when extraembryonic mesenchymal mesoderm invades the core of a primary villus, itself a cytotrophoblastic projection covered by syncytiotrophoblast. A secondary villus is therefore formed of all three components together: a mesenchymal mesodermal core, surrounded by cytotrophoblast, in turn covered by syncytiotrophoblast.

## explicit_objective
State that a secondary chorionic villus is formed of cytotrophoblast and syncytiotrophoblast together with an invading mesenchymal core, not either trophoblast layer alone.

## pitfalls
Selecting only one trophoblast layer (cytotrophoblast or syncytiotrophoblast) as the complete answer, rather than recognising both layers plus the mesenchymal core together form the secondary villus.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T02

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Placenta and Fetal Membranes

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Placenta and Fetal Membranes

## article_ids
ART-MU101-PLACENTA-6CA76541

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-85A12BF990199E

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
A secondary chorionic villus is formed of -> All of the above (cytotrophoblast and syncytiotrophoblast)

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p9 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q27 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p9, red-text key on stem and option (pagetext.mjs keys auto-read).

---

# Item

## label
The yolk sac roof is incorporated into the primitive gut, connected to the midgut via the vitellointestinal duct

## id
CON-DEV-4B4FC0F9B53AEE

## canonical_key
embryology.yolk-sac.foregut-midgut-hindgut-vitellointestinal-duct

## aliases


## arabic_label


## arabic_aliases


## definition
As the embryo folds, the roof of the primary yolk sac is incorporated into the embryo as the primitive gut tube, becoming continuous with the foregut, midgut and hindgut, with the midgut remaining connected to the shrinking extraembryonic yolk sac remnant via the vitellointestinal (vitelline) duct until this connection is normally obliterated. Persistence of this duct after birth produces a Meckel's diverticulum.

## explicit_objective
State that the foregut, midgut, hindgut and vitellointestinal duct are all parts/derivatives of the incorporated yolk sac system.

## pitfalls
Naming only one gut region (foregut, midgut or hindgut) as connected to the yolk sac, rather than recognising all three regions plus the vitellointestinal duct are part of this single incorporated system.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T02

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Amnion and Yolk Sac

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Amnion and Yolk Sac

## article_ids
ART-MU101-AMNIONYOLK-2197F9C7

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-4B4FC0F9B53AEE

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Parts of yolk sac -> All of the above (foregut, midgut, hindgut, vitellointestinal duct)

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p9 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q28 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p9, red-text key on stem and option (pagetext.mjs keys auto-read).

---

# Item

## label
Paraxial mesoderm (via the somite dermatome) gives rise to the dermis of the skin

## id
CON-DEV-8153A275E4A623

## canonical_key
embryology.germ-layers.paraxial-mesoderm-dermatome-dermis

## aliases


## arabic_label


## arabic_aliases


## definition
Paraxial mesoderm organises into somites, each of which differentiates into a sclerotome (vertebrae/ribs), myotome (skeletal muscle) and dermatome, which contributes to the dermis of the skin over most of the trunk and limbs. This distinguishes paraxial mesoderm derivatives from intermediate mesoderm (kidney), lateral plate/splanchnic mesoderm (visceral smooth muscle) and ectoderm (epidermis).

## explicit_objective
State that paraxial mesoderm gives rise to the dermis of the skin via the somite dermatome, distinguishing it from other mesodermal and ectodermal derivatives.

## pitfalls
Confusing paraxial mesoderm's dermatome-derived dermis with the ectodermal epidermis, or with intermediate/splanchnic mesoderm derivatives (kidney, visceral muscle).

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T01

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Germ Layers and Derivatives

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Germ Layers and Derivatives

## article_ids
ART-MU101-GERMLAYERS-FCAB4BA8

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-8153A275E4A623

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Paraxial mesoderm gives one structure which is the -> Dermis of skin

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p10 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q30 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p10, red-text key on stem and option (pagetext.mjs keys auto-read).

---

# Item

## label
Heuser's membrane arises from hypoblast lining the primary yolk sac cavity

## id
CON-DEV-F147CCC2126226

## canonical_key
embryology.bilaminar-disc.heusers-membrane-from-hypoblast

## aliases


## arabic_label


## arabic_aliases


## definition
Heuser's membrane (the exocoelomic membrane) is a thin layer of extraembryonic endoderm that spreads from the hypoblast to line the inside of the cytotrophoblast, together with the hypoblast enclosing the primary (exocoelomic) yolk sac cavity. Because it arises directly from hypoblast cells migrating to line this cavity, hypoblast is its correct origin, distinct from epiblast, extraembryonic mesoderm and syncytiotrophoblast.

## explicit_objective
State that Heuser's membrane arises from hypoblast, distinguishing it from the epiblast (source of the definitive germ layers) and the trophoblast layers.

## pitfalls
Confusing hypoblast (extraembryonic endoderm, source of Heuser's membrane and the yolk sac) with epiblast (source of the definitive ectoderm, mesoderm and endoderm during gastrulation).

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T01

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Germ Layers and Derivatives

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Germ Layers and Derivatives

## article_ids
ART-MU101-GERMLAYERS-FCAB4BA8

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.3

## exam_weight_by_year
MU_Y1=0.3

## clinical_relevance
0.2

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-F147CCC2126226

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Gives rise to the Heuser's membrane -> Hypoblast

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p10 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q32 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p10, red-text key on stem and option (pagetext.mjs keys auto-read).

---

# Item

## label
Embryonic folding causes the amniotic sac to expand and surround the fetus

## id
CON-DEV-932C8363BAE4A8

## canonical_key
embryology.folding.amniotic-sac-expands-to-surround-fetus

## aliases


## arabic_label


## arabic_aliases


## definition
As lateral and longitudinal (head and tail) folding converts the flat trilaminar embryonic disc into a cylindrical body form, the amnion, initially a small dorsal sac, expands and comes to surround the entire embryo, so the embryo appears to "sink into" the amniotic cavity with fluid then surrounding it on all sides. This expansion of the amniotic sac is one of the direct, defining consequences of folding.

## explicit_objective
State that folding causes the amniotic sac to expand and enclose the embryo, as one of folding's direct consequences.

## pitfalls
Confusing folding's effect on the amnion (expansion to surround the embryo) with folding's effects on gut regions (head fold forms foregut, not midgut) or on the connecting stalk (brought ventral, not dorsal).

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T01

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Germ Layers and Derivatives

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Germ Layers and Derivatives

## article_ids
ART-MU101-GERMLAYERS-FCAB4BA8

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-932C8363BAE4A8

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Result of folding -> Amniotic sac expands to surround fetus

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p11 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q34 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p11, red-text key on stem and option (pagetext.mjs keys auto-read).

---

# Item

## label
The secondary spermatocyte's chromosomal formula is 22 autosomes plus one Y (or one X) chromosome

## id
CON-DEV-B7634187C87A16

## canonical_key
embryology.gametogenesis.secondary-spermatocyte-formula-22-plus-y

## aliases


## arabic_label


## arabic_aliases


## definition
The diploid primary spermatocyte (44 autosomes + XY) undergoes meiosis I to produce two haploid secondary spermatocytes, each carrying 22 autosomes plus a single sex chromosome, either X or Y. "22+Y" represents the Y-bearing secondary spermatocyte, distinct from the diploid "44+XY" formula of its parent primary spermatocyte.

## explicit_objective
State the secondary spermatocyte's haploid chromosomal formula (22 autosomes plus one sex chromosome), distinguishing it from the diploid primary spermatocyte.

## pitfalls
Writing the diploid primary-spermatocyte formula (44+XY) or an internally inconsistent haploid-with-two-sex-chromosomes formula instead of the correct haploid 22+Y (or 22+X).

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T01

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Gametogenesis and the Menstrual Cycle

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Gametogenesis and the Menstrual Cycle

## article_ids
ART-MU101-GAMETOMC-426DA802

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.3

## exam_weight_by_year
MU_Y1=0.3

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-B7634187C87A16

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Chromosomal formula concerned with the secondary spermatocyte -> 22+Y

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p11 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q35 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p11, red-text key on stem and option (pagetext.mjs keys auto-read).

---

# Item

## label
The prechordal plate does not itself give rise to intraembryonic mesoderm

## id
CON-DEV-C1C5C84B84AE89

## canonical_key
embryology.gastrulation.prechordal-plate-not-a-mesoderm-source

## aliases


## arabic_label


## arabic_aliases


## definition
The prechordal plate is a small, specialised area of tightly adherent endoderm-and-overlying-ectoderm cells cranial to the notochord that acts chiefly as a signalling/organiser centre, helping induce the forebrain and forming the future site of the oropharyngeal membrane. Unlike the primitive streak, primitive node and notochord, it is not itself a source of intraembryonic mesoderm.

## explicit_objective
Identify the prechordal plate as the structure among the primitive streak/node/notochord axis that does NOT itself generate intraembryonic mesoderm.

## pitfalls
Assuming any midline gastrulation structure (streak, node, notochord, prechordal plate) generates mesoderm equally; the prechordal plate's role is organiser signalling, not mesoderm production.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
dev

## primary_node_id
DIS-EMB-T01

## secondary_node_ids
[clear]

## topic
Embryology

## subtopic
Germ Layers and Derivatives

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Support 43 - With Answers > Germ Layers and Derivatives

## article_ids
ART-MU101-GERMLAYERS-FCAB4BA8

## related_article_ids


## related_concept_ids


## resource_ids
src_34ff78aabb8bfd729922

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.35

## exam_weight_by_year
MU_Y1=0.35

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-DEV-C1C5C84B84AE89

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Does not share in formation of intraembryonic mesoderm -> Prechordal plate

## exam_signal
src_34ff78aabb8bfd729922 | paper | | p11 | MU-MED101

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no match found for this specific fact.
mu: Tested as f1supp43-embryo-q36 in "EOM Practice - Foundation 1 - Support 43 - With Answers.pdf" (mu_34ff78aabb8bfd729922), Embryology sub-block, p11, red-text key on stem and option (pagetext.mjs keys auto-read).
