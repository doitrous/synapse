<!--
  ZU-MED-102 (Medical Terminology) — 9 NEW concepts minted for the
  termfinal24 cluster, authored from `Fakous Medical Terminology Final
  2024.pdf` (Zagazig's Fakous campus, Faculty of Medicine — source
  provenance ruled usable by the chief of staff, 2026-09-01; see
  LANE-CARD.md §7). Search-before-mint run against `find-existing.mjs` for
  every concept below (short literal queries), supplemented by `grep -ril`
  across pending/import-ready concept directories; ids minted with
  `mint-concept-id.mjs`, checked against 13,578 existing ids (0 collisions).
  No evidence-store `src_…` resource exists yet for this PDF (not indexed in
  the corpus) — per 12-resources.md's weakest-but-honest option 3,
  `resource_ids`/`atomic_claim_ids` are left blank here and the citation
  lives only in each question's `source_citation`.

  Terminology items are grouped into a few concept records per word-part
  family rather than one concept per term (9 concepts for 20 questions), per
  this lane's dispatch.

  1 live-hit concept from the same triage is handled as a sparse overlay,
  not here: see `concept/ZU-MED-102-termfinal24-live-overlays.md`.

  Import: Admin › Concepts › Import.
-->

# Item

## id
CON-FND-70361F36A2952D

## label
SI units for basic quantity, temperature, and mass concentration

## canonical_key
terminology.si-units.medical-measurement

## aliases
Kelvin as the SI unit of temperature
Kilogram per liter as the SI unit of mass concentration

## arabic_label


## arabic_aliases


## definition
The International System of Units (SI) assigns one coherent unit to each physical quantity used in scientific and medical measurement. Meter is the SI base unit of length and, among the four measurement-unit choices commonly quizzed in a terminology course (a unit of density, a unit of mass concentration, a unit of amount concentration, and a unit of length), it is the one that is itself a true SI base unit rather than a unit derived by combining two base units. Temperature has its own dedicated SI base unit, kelvin (K), distinct from the everyday Celsius or Fahrenheit scales. Mass concentration — the mass of a solute dissolved per unit volume of solution, as used for many clinical lab values — is expressed in kilogram per liter (or a scaled unit such as gram per liter), not in kilogram alone, liter alone, or mole per liter (which is amount concentration, a different quantity built on moles rather than mass).

## explicit_objective
Identify meter as a basic SI unit, kelvin as the SI unit of temperature, and kilogram per liter as the SI unit of mass concentration, distinguishing each from other unit types the same question set could plausibly offer.

## pitfalls
Picking a derived or composite unit (kilogram per cubic meter, kilogram per liter, mole per liter) when asked for a basic SI unit instead of meter; confusing Celsius or Fahrenheit with the SI temperature unit kelvin; and confusing mass concentration's unit (kilogram per liter) with amount concentration's unit (mole per liter) — the two are easy to swap because both describe "how much solute per volume."

## concept_type
directly_taught_fact

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Medical terminology fundamentals

## subtopic
Units of measurement

## microtopic


## nanotopic


## modules
ZU-MED-102

## article_ids
ART-FND-ZU102-TERMINOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which one of the following is basic SI unit? A)kilogram per cubic meter B) kilogram per liter C)mole per liter D)Meter" ANSWER: D (digital highlight key, Fakous Medical Terminology Final 2024.pdf p.1 Q1); "Which of the following is the SI unit of temperature? A)kelvin, K B)Centigrade, C C)Farenheit, F D)joule, J" ANSWER: A (Q2); "Which of the following is the SI unit of Mass concentration? A)kilogram B) liter C)kilogram per liter D) mole per liter" ANSWER: C (Q3)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard SI/clinical-chemistry reference would strengthen this before publication.

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

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous Medical Terminology Final 2024.pdf yet; cited via each question's source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-4292412C40F704

## label
Cytology word-parts: "karyon" (nucleus) and the "-blast" suffix (immature cell)

## canonical_key
terminology.cytology.karyon-blast

## aliases
Karyon as the root for cell nucleus
-blast suffix for immature or precursor cells

## arabic_label


## arabic_aliases


## definition
Medical terminology builds cell-biology words from a small set of Greek/Latin roots and suffixes. "Karyon" is the combining form for the cell nucleus (seen in words such as karyotype, karyolysis, and eukaryotic/prokaryotic), so a question asking what "karyon" best defines is asking for "cell nucleus," not the cell membrane, cytoplasm, or a description of cell damage. The suffix "-blast" denotes an immature, actively developing or actively dividing cell — for example, an osteoblast is an immature bone-forming cell and a fibroblast is an immature connective-tissue cell — in contrast to suffixes such as "-cyte" (a mature cell), "-genic" (producing or originating from), and "-clast" (a cell that breaks down tissue, the functional opposite of "-blast").

## explicit_objective
Define "karyon" as the root for cell nucleus and identify "-blast" as the suffix that names an immature, actively developing cell, distinguishing "-blast" from "-cyte," "-genic," and "-clast."

## pitfalls
Defining "karyon" as cell membrane, cytoplasm, or cell damage instead of nucleus; and picking "-cytes" (mature cell), "-genic" (producing/originating from), or "-clast" (a tissue-breakdown cell) instead of "-blast" when asked which suffix names an immature, active cell.

## concept_type
directly_taught_fact

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Medical terminology fundamentals

## subtopic
Cytology word-building elements

## microtopic


## nanotopic


## modules
ZU-MED-102

## article_ids
ART-FND-ZU102-TERMINOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"An immature active cells are terminated with which of the following? A)cytes B)blasts C)genic D)clast" ANSWER: B (digital highlight key, Fakous Medical Terminology Final 2024.pdf p.1 Q4); "Which of the following best defines karyon? A)Cell membrane B)Cell nucleus C)Cell cytoplasm D)Cell damage" ANSWER: B (Q5)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard medical-terminology textbook citation would strengthen this before publication.

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

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous Medical Terminology Final 2024.pdf yet; cited via each question's source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-DE1C8E5CF7001A

## label
General medical prefixes: chloro- (green), exo- (outside/outer), hemi- (half)

## canonical_key
terminology.prefix.chloro-exo-hemi

## aliases
Chloro- prefix meaning green
Exo- prefix meaning outside or outer
Hemi- prefix meaning half

## arabic_label


## arabic_aliases


## definition
Three unrelated but frequently confused medical prefixes each carry one fixed meaning that a terminology exam tests directly. "Chloro-" is the colour prefix for green (as in chlorophyll or chlorosis), not yellow, red, or pink. "Exo-" means outside or outer (as in exocrine, exoskeleton), the opposite of an inward-pointing prefix such as "ana-" (up/again), "epi-" (upon/above), or "dia-" (through/across) — none of which mean "outside." "Hemi-" means half or one side (as in hemiplegia, hemisphere), distinct from "semi-" (partly, not exactly half), "mono-" (one/single), and "di-" (two).

## explicit_objective
Match chloro- to green, exo- to outside/outer, and hemi- to half/one side, each distinguished from its closest-sounding or closest-meaning distractor prefix.

## pitfalls
Picking yellow, red, or pink instead of green for chloro-; picking ana-, epi-, or dia- instead of exo- for "outside/outer"; and picking semi-, mono-, or di- instead of hemi- for "half one side," especially confusing semi- (partly) with hemi- (exactly half).

## concept_type
directly_taught_fact

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Medical terminology fundamentals

## subtopic
Prefixes

## microtopic


## nanotopic


## modules
ZU-MED-102

## article_ids
ART-FND-ZU102-TERMINOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.2

## academic_relevance
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The prefix Chloro refer to which colour? A)Yellow B)Green C)Red D)Pink" ANSWER: B (digital highlight key, Fakous Medical Terminology Final 2024.pdf p.2 Q10); "The prefix Meaning outside or outer is which of the following? A)Ana B)Epi C)Exo D)Dia" ANSWER: C (Q12); "Half one side means Which prefix? A)Semi B)Mono C)Hemi D)Di" ANSWER: C (Q13)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard medical-terminology textbook citation would strengthen this before publication.

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

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous Medical Terminology Final 2024.pdf yet; cited via each question's source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-AEEB25E713AFCF

## label
Clinical word-building elements: "-stomy" (surgical opening), "cephal/o" (head), "-itis" (inflammation)

## canonical_key
terminology.suffix.stomy-cephalo-itis

## aliases
-stomy suffix for a surgical opening
Cephal/o combining form for head
-itis suffix for inflammation, e.g. nephritis

## arabic_label


## arabic_aliases


## definition
Three further word-building elements complete this paper's basic-suffix set. The suffix "-stomy" names a surgically created permanent opening (as in colostomy or tracheostomy), distinct from "cut in" (the "-tomy" suffix), "removal" (the "-ectomy" suffix), or "visceral examination." The combining form "cephal/o" refers to the head (as in cephalic, hydrocephalus), not the abdomen, neck, or ribs. The suffix "-itis" means inflammation of the structure the word root names; "nephritis" — kidney root ("nephr/o") plus "-itis" — is inflammation of the kidneys, distinct from appendicitis (appendix), hepatitis (liver), or cystitis (bladder), which share the same "-itis" suffix but attach to a different root.

## explicit_objective
Define "-stomy" as a surgically created opening, "cephal/o" as the combining form for head, and apply "-itis" (inflammation) to the correct root — nephr/o for kidney — to identify nephritis as inflammation of the kidneys.

## pitfalls
Confusing "-stomy" (a permanent opening) with "-tomy" (cutting into) or "-ectomy" (removal); picking abdomen, neck, or ribs instead of head for cephal/o; and picking a term built on the wrong root (appendicitis, hepatitis, or cystitis) instead of nephritis when the question asks for inflammation of the kidneys specifically.

## concept_type
directly_taught_fact

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Medical terminology fundamentals

## subtopic
Suffixes and combining forms

## microtopic


## nanotopic


## modules
ZU-MED-102

## article_ids
ART-FND-ZU102-TERMINOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The suffix Stomy means Which of the following? A)Cut in B)Removal C)Opening D)Visceral examination" ANSWER: C (digital highlight key, Fakous Medical Terminology Final 2024.pdf p.2 Q11); "The combining form cephal/o refers to which of the following? A)Abdomen B)Head C)Neck D)Ribs" ANSWER: B (Q15); "An inflammation of kidneys is termed which of the following? A)nephrities B)Appendities C)Hepatities D)Cystities" ANSWER: A (Q16, printed spelling "-ities" kept as printed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard medical-terminology textbook citation would strengthen this before publication.

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

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous Medical Terminology Final 2024.pdf yet; cited via each question's source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-B04DD375E26D87

## label
Anatomical position and directional terms: anterior orientation of the palms; distal

## canonical_key
terminology.anatomicalposition.anterior-distal

## aliases
Standard anatomical position — palms face anteriorly
Distal as movement or position away from the point of origin

## arabic_label


## arabic_aliases


## definition
In the standard anatomical position — the reference posture every other directional term is defined against — the body stands erect, facing forward, arms at the sides, and the palms of the hands face anteriorly (forward), not posteriorly, medially, or laterally. "Distal" describes a position or movement away from the point of attachment or origin of a structure (for example, the fingertips are distal to the wrist), the direct opposite of "proximal" (toward the point of attachment or origin), and distinct from "anterior" (toward the front) and "posterior" (toward the back), which describe a different axis of orientation entirely.

## explicit_objective
State that the palms face anteriorly in the standard anatomical position, and define "distal" as away from the point of attachment or origin, distinguishing it from proximal, anterior, and posterior.

## pitfalls
Picking posteriorly, medially, or laterally instead of anteriorly for palm orientation in the anatomical position; and confusing distal (away from origin) with proximal (toward origin), or with anterior/posterior, which describe front-back rather than near-far position.

## concept_type
directly_taught_fact

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Medical terminology fundamentals

## subtopic
Anatomical position and directional terminology

## microtopic


## nanotopic


## modules
ZU-MED-102

## article_ids
ART-FND-ZU102-TERMINOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"In the anatomical position, the palms of the hands are facing which of the following? A)Anteriorly B)Posteriorly C)Medialy D)Laterally" ANSWER: A (digital highlight key, Fakous Medical Terminology Final 2024.pdf p.2 Q17); "Which of the following describes movement or position away from the point of attachment or origin? A)Proximal B)Distal C)Anterior D)Posterior" ANSWER: B (Q18)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard anatomy-terminology textbook citation would strengthen this before publication.

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

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous Medical Terminology Final 2024.pdf yet; cited via each question's source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-HEM-84EBE116475480

## label
Hem/o combining-form facts: hemolysis (RBC breakdown) and hemorrhage (bleeding from a vessel)

## canonical_key
terminology.hemo.hemolysis-hemorrhage

## aliases
Hemolysis defined as breakdown of red blood cells
Hemorrhage defined as blood loss from a damaged vessel

## arabic_label


## arabic_aliases


## definition
Two terms built on the "hem/o" (blood) root name two distinct blood-related events. "Hemolysis" — "hem/o" (blood) plus "-lysis" (breakdown/destruction) — is the breakdown of red blood cells, releasing their contents into the surrounding plasma or fluid; it is not the loss of red blood cells from the body, the formation of new red blood cells, or an increase in red blood cell number, each of which describes a different process. "Hemorrhage" is blood loss escaping from a damaged blood vessel, distinct from "hemolysis" (the cells break down but the blood need not leave a vessel), "hypotension" (low blood pressure, a possible consequence of severe hemorrhage but not the same word), and "hypertension" (high blood pressure).

## explicit_objective
Define hemolysis as the breakdown of red blood cells and hemorrhage as blood loss from a damaged vessel, distinguishing each from RBC loss/formation/count changes and from hypotension/hypertension respectively.

## pitfalls
Defining hemolysis as loss, formation, or increased number of red blood cells instead of their breakdown; and picking hemolysis, hypotension, or hypertension instead of hemorrhage when asked for the term describing blood loss from a damaged vessel.

## concept_type
directly_taught_fact

## status
Draft

## support_mode
direct_statement

## subject
haem

## primary_node_id


## secondary_node_ids


## topic
Hematology terminology

## subtopic
Hem/o combining-form vocabulary

## microtopic


## nanotopic


## modules
ZU-MED-102

## article_ids
ART-HEM-ZU102-HEMO-SUFFIXES

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.5

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"What is the meaning of Haemolysis? A)Break down of red blood cells B) Loss of red blood cells C) Formation of red blood cells D) Increase number of red blood cells" ANSWER: A (digital highlight key, Fakous Medical Terminology Final 2024.pdf p.1 Q6); "Blood loss from damaged blood vessel refers to which of the following? A)Hemolysis B) Haemorrhage C)Hypotension D)Hypertension" ANSWER: B (Q8)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard medical-terminology textbook citation would strengthen this before publication.

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

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous Medical Terminology Final 2024.pdf yet; cited via each question's source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-CVS-F6F49377F30EF4

## label
Vital-sign combining forms: tachycardia (abnormally fast heart rate) and hypoxia (decreased oxygen)

## canonical_key
terminology.vitalsigns.tachycardia-hypoxia

## aliases
Tachycardia defined as abnormally fast heart rate
Hypoxia defined as decreased oxygen

## arabic_label


## arabic_aliases


## definition
Two abnormal-vital-sign terms combine a prefix, a root, and a suffix in the pattern this course teaches. "Tachycardia" — "tachy-" (fast) plus "-cardia" (heart condition) — describes an abnormally fast heart rate, the opposite of "bradycardia" (abnormally slow) and distinct from a term describing heart size (which would use "-megaly," not "-cardia" alone). "Hypoxia" — "hyp-/hypo-" (decreased/below normal) plus "ox/o" (oxygen) plus "-ia" (condition) — refers to decreased oxygen, distinct from increased carbon monoxide, decreased carbon dioxide, or increased hydrogen, each a different gas or a different direction of change.

## explicit_objective
Define tachycardia as abnormally fast heart rate and hypoxia as decreased oxygen, each built from its prefix + root (+ suffix) parts and distinguished from its closest distractor.

## pitfalls
Selecting an option describing heart rate or size incorrectly (abnormally small/large heart rate) instead of "abnormally fast" for tachycardia; and confusing hypoxia (decreased oxygen) with increased carbon monoxide, decreased carbon dioxide, or increased hydrogen.

## concept_type
directly_taught_fact

## status
Draft

## support_mode
direct_statement

## subject
cvs

## primary_node_id


## secondary_node_ids


## topic
Cardiovascular and respiratory terminology

## subtopic
Vital-sign word-building elements

## microtopic


## nanotopic


## modules
ZU-MED-102

## article_ids
ART-CVS-ZU102-VITALSIGN-SUFFIXES

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.4

## exam_weight_by_year
ZU_Y1=0.5

## clinical_relevance
0.5

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following refers to hypoxia? A)Increased carbon monoxide B)Decreased carbon dioxide C) Increased hydrogen D) Decreased oxygen" ANSWER: D (digital highlight key, Fakous Medical Terminology Final 2024.pdf p.1 Q7); "Tachycardia is a term describing which of the following? A)Abnormally fast heart rate B)Abnormally small heart rate C)Abnormally large heart rate D)Abnormally slow heart rate" ANSWER: A (Q14)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard medical-terminology textbook citation would strengthen this before publication.

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

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous Medical Terminology Final 2024.pdf yet; cited via each question's source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-REN-720B8C1048B7BC

## label
Ureters connect the kidneys to the bladder

## canonical_key
anatomy.ureter-bladder-connection

## aliases
Ureter as the tube connecting kidney to bladder

## arabic_label


## arabic_aliases


## definition
The ureters are the paired tubular structures of the urinary system that connect each kidney's renal pelvis to the urinary bladder, carrying urine downward by peristalsis for storage until voiding. This is distinct from the urethra, the separate tube that carries urine out of the bladder to the exterior of the body; the rectum, part of the digestive tract unrelated to the urinary system; and the intestine, likewise a digestive-tract structure.

## explicit_objective
State that the ureters connect the kidneys to the bladder, distinguishing this from the urethra (bladder to exterior), the rectum, and the intestine.

## pitfalls
Confusing the ureter's destination (the bladder) with the urethra's role (carrying urine out of the bladder to the exterior), or selecting an unrelated digestive-tract structure (rectum, intestine) as the ureter's destination.

## concept_type
directly_taught_fact

## status
Draft

## support_mode
direct_statement

## subject
renal

## primary_node_id


## secondary_node_ids


## topic
Urinary system terminology

## subtopic
Urinary tract anatomy

## microtopic


## nanotopic


## modules
ZU-MED-102

## article_ids
ART-REN-ZU102-URETER-BLADDER

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.45

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"The ureters, which are part of the urinary system, connect the kidneys to which of the following? a)Bladder b) Urethra c)Rectum d)Intestine" ANSWER: a (digital highlight key, Fakous Medical Terminology Final 2024.pdf p.2 Q19)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard anatomy textbook citation would strengthen this before publication.

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

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous Medical Terminology Final 2024.pdf yet; cited via each question's source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-GIT-567C50B44DB4FE

## label
The duodenum is part of the gastrointestinal tract

## canonical_key
anatomy.duodenum-git-tract

## aliases
Duodenum as first part of the small intestine

## arabic_label


## arabic_aliases


## definition
The duodenum is the first and shortest segment of the small intestine, immediately distal to the stomach, and is a true part of the gastrointestinal tube through which food and chyme pass. This distinguishes it from the spleen (a lymphoid organ, not part of the alimentary canal), the gall bladder (a bile-storage organ that connects to the digestive tract via the biliary system but is not itself part of the food-passage tube), and the pancreas (an accessory digestive gland that secretes into the duodenum but likewise sits outside the food-passage tube itself).

## explicit_objective
Identify the duodenum as a genuine part of the gastrointestinal tube, distinguishing it from accessory digestive organs (spleen, gall bladder, pancreas) that are not themselves part of the food-passage tract.

## pitfalls
Classifying an accessory digestive organ (spleen, gall bladder, or pancreas) as part of the gastrointestinal tube itself, rather than recognising that only the duodenum among the four choices is a true segment of the alimentary canal.

## concept_type
directly_taught_fact

## status
Draft

## support_mode
direct_statement

## subject
gi

## primary_node_id


## secondary_node_ids


## topic
Gastrointestinal system terminology

## subtopic
Gastrointestinal tract anatomy

## microtopic


## nanotopic


## modules
ZU-MED-102

## article_ids
ART-GIT-ZU102-DUODENUM

## related_article_ids


## related_concept_ids


## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.35

## exam_weight_by_year
ZU_Y1=0.45

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following is a part of gastrointestinal tube? a)spleen b)Gall bladder c)Pancrease d)Dudenum" ANSWER: d (digital highlight key, Fakous Medical Terminology Final 2024.pdf p.2 Q20, printed spelling "Dudenum"/"Pancrease" kept as printed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard anatomy textbook citation would strengthen this before publication.

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

## field_notes
sourceProvenance: Fakous campus (Zagazig's second Faculty of Medicine) — see LANE-CARD.md §7.
resourceIds: No evidence-store src_ id exists for Fakous Medical Terminology Final 2024.pdf yet; cited via each question's source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.
