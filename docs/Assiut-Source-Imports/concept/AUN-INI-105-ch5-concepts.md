<!--
  AUN-INI-105 -- new concepts minted from the "INI MCQ .pdf" bank triage,
  Chapter 5 "Antimicrobial chemotherapy & Pathogenesis of bacterial
  infections" (pp.51-62, 74 MCQ + 10 True/False, plain-text ANSWERS table
  p62; coverage/AUN-INI-105-triage.md's chapter map). Every canonical_key
  below was confirmed NEW by find-existing.mjs (live state + every
  docs/*-Source-Imports root + docs/import-ready) before minting. Two facts
  this chapter also tests (Mycoplasma/L-forms' intrinsic penicillin
  resistance, and the toxoid definition) reuse pending Ain-Shams
  ASU-INF-microbiology-concepts.md ids via a sparse overlay
  (pending-live/AUN-INI-105-ch5-asuinf-overlay-concepts.md); four more
  questions reuse the exotoxin/endotoxin and growth-curve/antibiotic-
  sensitivity ASU-INF concepts already overlaid for this module by chapter 1
  and chapter 2's own overlay files, needing no further overlay row here.
  One question (Q1, bactericidal definition) reuses a concept that is
  already LIVE (CON-INF-1249475C90F47B), cited directly with no overlay.

  Repair pass (chief-of-staff ruling, lane10): this file originally minted
  three more concepts -- selective toxicity, carrier state, opportunistic
  pathogen -- after finding genuine same-grain siblings in Helwan's
  HU-BMS-102-microbiology concepts and MUST's FHB-102-2-microbiology-
  introduction concepts, and logged those siblings under
  `rejected_merge_candidate_ids` "to keep a single ASU-INF dependency."
  That is not what rejected-merge is for: a genuine duplicate is an
  overlay, and a module's pending-dependency list simply grows as needed.
  All three twins have been deleted from this file (and from
  article/AUN-INI-105-ch5-article.md); the six questions that tested them
  now cite the sibling ids directly via a sparse pending-live overlay
  (pending-live/AUN-INI-105-ch5-repair-overlay-concepts.md) onto
  CON-INF-05D590078F3DCC (Helwan, selective toxicity),
  CON-INF-C4C74A0874FF61 (MUST, carrier state) and
  CON-INF-17893AA3303251 (MUST, opportunistic pathogen).

  Teaching text has no dedicated department lecture deck for this module
  (the INI folder holds only the MCQ bank itself plus three garbled/excluded
  files); definitions are written from standard microbiology/pharmacology
  teaching, evidenced by the bank's own stems/options
  (evidence/AUN-INI-105-mcq-resources.md).

  Import: Admin > Concepts import.
-->

# Item

## id
CON-INF-79A3B378728C71

## label
Tetracyclines are grouped with aminoglycosides as 30S-ribosomal-subunit-targeting protein synthesis inhibitors, distinct from the 50S-targeting or cell-wall-targeting drug classes

## canonical_key
teaching.pharmacology.antimicrobials.tetracycline-aminoglycoside-30s-kinship

## aliases
Tetracycline mechanism class
30S-targeting protein synthesis inhibitors

## arabic_label
تصنيف التتراسيكلين مع الأمينوغليكوزيدات

## arabic_aliases
مثبطات تخليق البروتين المرتبطة بالوحدة الفرعية 30S

## definition
Tetracyclines and aminoglycosides both act at the bacterial ribosome's 30S subunit -- tetracyclines reversibly block aminoacyl-tRNA from binding the A site, while aminoglycosides irreversibly distort the subunit to cause misreading of mRNA. Although their downstream effects differ (tetracyclines are bacteriostatic, aminoglycosides bactericidal), the bank's own teaching frame groups them together by shared ribosomal target, in contrast to chloramphenicol and macrolides (50S-targeting) or the beta-lactams and vancomycin (cell-wall-targeting).

## explicit_objective
State that tetracyclines are classed with aminoglycosides as 30S-ribosomal-subunit-targeting protein synthesis inhibitors, distinct from 50S-targeting and cell-wall-targeting antimicrobial classes.

## pitfalls
Assuming "identical mechanism" means an identical downstream effect (tetracyclines are bacteriostatic, aminoglycosides bactericidal) rather than a shared ribosomal target; confusing this 30S grouping with chloramphenicol, which targets the 50S subunit instead.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Protein synthesis inhibitor classes

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-282B6D07348734

## resource_ids
src_6f2f4188bb0cbf848733

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
0.6

## weight_confidence
0.5

## confidence
0.7

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Tetracyclines are identical in their mechanism of action to? ... Aminoglycosides" (Q2).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found for the authored instance (Q2). A second bank instance of this same stem (Q13, "...over-all mechanism of action to?") prints a different key (Chloramphenicol, a 50S-targeting drug) among a different option set -- held as a duplicate rather than authored, since Chloramphenicol's 50S target is less consistent with the "identical mechanism" framing than Q2's 30S-sharing Aminoglycosides answer.

## uncertainty
The bank's own "identical in mechanism" phrasing is a simplification (the two classes' molecular actions at the 30S subunit differ), inherited from the source rather than introduced by this concept.

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
sourceCandidateIds: find-existing.mjs run for "aminoglycoside" and "quinolone" (adjacent terms) -- no same-grain hit; safe to create.

---

# Item

## id
CON-INF-282B6D07348734

## label
Aminoglycosides bind the bacterial 30S ribosomal subunit, causing misreading of mRNA and inhibiting protein synthesis with a bactericidal effect

## canonical_key
teaching.pharmacology.antimicrobials.aminoglycoside-30s-mechanism

## aliases
Aminoglycoside mechanism of action
30S subunit binding by aminoglycosides

## arabic_label
آلية عمل الأمينوغليكوزيدات

## arabic_aliases
ارتباط الأمينوغليكوزيدات بالوحدة الفرعية 30S

## definition
Aminoglycosides (e.g. gentamicin) irreversibly bind the 30S ribosomal subunit, distorting it so that mRNA is misread and abnormal, non-functional proteins are produced; this disruption is severe enough to be bactericidal rather than merely bacteriostatic. This distinguishes aminoglycosides from cell-wall-active agents (which act on peptidoglycan synthesis), cytoplasmic-membrane-active agents (which act on the lipid bilayer), and DNA/RNA-polymerase-targeting agents.

## explicit_objective
State that aminoglycosides act by binding the bacterial 30S ribosomal subunit and causing misreading of mRNA, producing a bactericidal inhibition of protein synthesis.

## pitfalls
Confusing the aminoglycoside mechanism (30S binding, mRNA misreading, bactericidal) with the mechanism of other protein synthesis inhibitors such as chloramphenicol (50S binding, peptidyl transferase inhibition, bacteriostatic); assuming "inhibits protein synthesis" alone identifies the subunit or the bactericidal/bacteriostatic outcome.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Protein synthesis inhibitor classes

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-79A3B378728C71

## resource_ids
src_6f2f4188bb0cbf848733

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
0.65

## weight_confidence
0.55

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The mechanism of action of Aminoglycoside antibiotics is to? ... Bind to the 30S ribosomal subunit" (Q5). "Gentamycin acts by? ... Inhibition of protein synthesis" (Q17). "Aminoglycosides are broad spectrum antimicrobials. They function through? ... Inhibiting protein synthesis by binding to 30S ribosomal subunit" (Q22). "Which of the following groups of antimicrobials act on microorganisms by inhibiting protein synthesis? ... Aminoglycosides" (Q27). "Aminoglycosides act on? ... Protein synthesis" (Q53).

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
sourceCandidateIds: find-existing.mjs run for "aminoglycoside" -- pending hits found for aminoglycoside resistance and PK/PD classification, none matching this mechanism-of-action fact; safe to create.
relationships: five question stems (Q5, Q17, Q22, Q27, Q53) each test this same 30S-binding/protein-synthesis-inhibition fact from different framings (naming the mechanism directly, naming Gentamycin as the example, or naming the drug class from its effect); collapsed into one record. A sixth question (Q58, gentamycin's bactericidal effect being maximal in the log phase) links here as a contextual concept while its main concept is the already-overlaid growth-curve/antibiotic-sensitivity concept (CON-INF-2E629B81136A05).

---

# Item

## id
CON-INF-4A48E0B1B6B45E

## label
Vertical transmission is the passage of a pathogen from mother to child during pregnancy, distinct from horizontal transmission between unrelated individuals

## canonical_key
teaching.microbiology.transmission.vertical-transmission-definition

## aliases
Vertical transmission
Mother-to-child transmission

## arabic_label
انتقال العدوى الرأسي

## arabic_aliases
انتقال العدوى من الأم إلى الجنين

## definition
Vertical transmission names the transfer of a pathogen from mother to child during pregnancy, delivery, or breastfeeding, as opposed to horizontal transmission, which spreads a pathogen between unrelated individuals in a population (by direct contact, droplets, or a common vehicle). The distinction matters clinically because vertically transmitted infections (e.g. rubella, HIV, syphilis) can affect fetal development in ways a horizontally acquired infection in an adult does not.

## explicit_objective
Define vertical transmission as mother-to-child pathogen transfer during pregnancy, distinguishing it from horizontal transmission between unrelated individuals.

## pitfalls
Treating "vertical" and "direct" transmission as synonyms -- direct transmission is a horizontal-transmission subtype (person-to-person contact) and can occur between any two individuals, not specifically mother and child.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Pathogenesis of bacterial infections

## subtopic
Modes of transmission

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-9AE148EB72A3CA

## resource_ids
src_6f2f4188bb0cbf848733

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.25

## exam_weight_by_year
AUN_Y1=0.25

## clinical_relevance
0.4

## academic_relevance
0.55

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Transmission of pathogens during pregnancy from mother to child is called as? ... Vertical transmission" (Q7).

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
sourceCandidateIds: find-existing.mjs run for "vertical transmission" -- 0 hits, safe to create.

---

# Item

## id
CON-INF-51C61562F85559

## label
Phage therapy, an antimicrobial alternative, uses virulent (lytic) phages that kill their bacterial host outright, not lysogenic or temperate phages, which integrate into the host genome instead

## canonical_key
teaching.microbiology.phage-therapy.virulent-phage-selection

## aliases
Phage therapy
Virulent vs lysogenic phage selection

## arabic_label
العلاج بالعاثيات

## arabic_aliases
العاثيات الفتاكة مقابل العاثيات المعتدلة

## definition
Phage therapy is proposed as an antimicrobial alternative that uses virulent (lytic) bacteriophages, which infect a bacterial cell and immediately hijack it to produce new phage particles, lysing and killing the cell. Lysogenic (temperate) phages and prophages, by contrast, integrate their genome into the host bacterial chromosome and can remain dormant without killing the cell -- unsuitable for a therapy whose goal is bacterial killing, and in fact a risk, since a temperate phage can carry and transfer virulence or resistance genes between bacteria (lysogenic conversion).

## explicit_objective
State that phage therapy as an antimicrobial alternative relies on virulent (lytic) phages, not lysogenic/temperate phages or prophages, because only lytic infection kills the host bacterium.

## pitfalls
Assuming any bacteriophage could serve as an antimicrobial agent -- only the lytic (virulent) cycle kills the host cell; the lysogenic cycle integrates and can even worsen pathogenicity via lysogenic conversion.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Antimicrobial alternatives

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids

## resource_ids
src_6f2f4188bb0cbf848733

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.25

## exam_weight_by_year
AUN_Y1=0.25

## clinical_relevance
0.2

## academic_relevance
0.55

## weight_confidence
0.45

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"If you are going to choose an agent that can be used as an alternative for antimicrobials, which of the following do you recommend? ... Virulent phages" (Q8).

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
sourceCandidateIds: find-existing.mjs run for "virulent phage" and "phage therapy" -- 0 hits, safe to create.

---

# Item

## id
CON-INF-ACA5AD215D874E

## label
Attenuation is the deliberate reduction of a microorganism's virulence while it remains viable, the basis of live attenuated vaccines

## canonical_key
teaching.microbiology.pathogenesis.attenuation-reduces-virulence

## aliases
Attenuation
Live attenuated vaccine basis

## arabic_label
إضعاف الفوعة

## arabic_aliases
تخفيف ضراوة الكائن الحي الدقيق

## definition
Attenuation is the process by which a pathogen's virulence is deliberately reduced (e.g. by repeated subculture, adaptation to an unnatural host, or genetic modification) while the organism remains alive and capable of inducing an immune response. This is distinct from avirulence (never having been virulent), inactivation (killing the organism outright, as in inactivated/killed vaccines), and freezing (a preservation method, not a virulence-reduction one) -- attenuation specifically underlies live attenuated vaccines.

## explicit_objective
State that attenuation reduces a microorganism's virulence while keeping it viable, distinguishing it from avirulence, inactivation, and freezing, and link it to live attenuated vaccines.

## pitfalls
Confusing attenuation (virulence reduced, organism still alive) with inactivation (organism killed) -- both can produce a vaccine, but by different mechanisms with different immunogenicity and safety trade-offs.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Pathogenesis of bacterial infections

## subtopic
Virulence and pathogenicity

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-8B5B9FAD59E176

## resource_ids
src_6f2f4188bb0cbf848733

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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Virulence of the microorganisms can be reduced by? ... Attenuation" (Q9).

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
sourceCandidateIds: find-existing.mjs run for "attenuation" -- hits found were all radiology/imaging attenuation (unrelated physics sense); no microbiology-sense hit, safe to create.

---

# Item

## id
CON-INF-C867DCBD689779

## label
Bacteraemia is the presence of viable bacteria circulating in the bloodstream, distinct from septicaemia (bacteraemia with systemic toxic illness) and viraemia (viruses in the blood)

## canonical_key
teaching.microbiology.pathogenesis.bacteraemia-definition

## aliases
Bacteraemia
Bacteraemia vs septicaemia vs viraemia

## arabic_label
تجرثم الدم

## arabic_aliases
وجود البكتيريا الحية في مجرى الدم

## definition
Bacteraemia is defined narrowly as the presence of viable bacteria in the bloodstream, which may be transient and asymptomatic. Septicaemia goes further, naming bacteraemia accompanied by systemic signs of illness (the clinical sepsis syndrome) caused by the bacteria or their products; viraemia is the analogous term for viruses circulating in the blood rather than bacteria. "Bactericidal" is an unrelated term describing a drug's killing action, not a state of the bloodstream.

## explicit_objective
Define bacteraemia as viable bacteria in the bloodstream, and distinguish it from septicaemia (bacteraemia with systemic illness) and viraemia (viral bloodstream presence).

## pitfalls
Using "bacteraemia" and "septicaemia" interchangeably -- bacteraemia alone does not imply systemic toxic illness, while septicaemia specifically does.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Pathogenesis of bacterial infections

## subtopic
Terminology of bloodstream infection

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids

## resource_ids
src_6f2f4188bb0cbf848733

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
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Presence of viable bacteria in the blood stream is called? ... Bacteraemia" (Q10).

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
sourceCandidateIds: find-existing.mjs run for "bacteraemia" -- 0 hits, safe to create.

---

# Item

## id
CON-INF-5E6E2CC64D34D1

## label
Bacterial disease is diagnosed by finding the organism in pathological fluids and/or by isolating it in culture from exudates or blood -- the two methods are complementary, not exclusive

## canonical_key
teaching.microbiology.diagnosis.microscopy-and-culture-complementary

## aliases
Diagnosis of bacterial disease
Microscopy and culture as complementary methods

## arabic_label
تشخيص المرض البكتيري

## arabic_aliases
الكشف المباشر والزرع كطريقتين متكاملتين

## definition
Diagnosis of a bacterial disease can be made both by direct microscopic identification of bacteria in a patient's pathological fluids (pus, sputum, CSF, etc.) and by isolating the organism through culture of exudates or blood. Neither method alone is described as the sole route; the bank's own teaching frame treats direct demonstration and culture isolation as jointly valid, complementary diagnostic approaches rather than as competing alternatives.

## explicit_objective
State that bacterial disease diagnosis relies on both direct microscopic demonstration in pathological fluids and culture isolation from exudates or blood, as complementary methods.

## pitfalls
Assuming only one diagnostic method (microscopy or culture alone) is correct when a question offers both as an option -- the bank's teaching frame treats them as jointly valid.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Pathogenesis of bacterial infections

## subtopic
Diagnosis of bacterial infection

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids

## resource_ids
src_6f2f4188bb0cbf848733

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.25

## exam_weight_by_year
AUN_Y1=0.25

## clinical_relevance
0.4

## academic_relevance
0.5

## weight_confidence
0.45

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Diagnosis of bacterial disease can be made by? ... Both a and b [Finding bacteria in pathological fluids / Isolation of bacteria by culture from exudates or blood]" (Q11).

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
sourceCandidateIds: find-existing.mjs run for "diagnosis of bacterial disease" -- 0 hits, safe to create.

---

# Item

## id
CON-INF-9AE148EB72A3CA

## label
Airborne transmission (droplet or droplet-nuclei spread) is the classic route of common epidemic respiratory diseases such as influenza

## canonical_key
teaching.microbiology.transmission.airborne-epidemic-disease

## aliases
Airborne transmission
Influenza as an airborne epidemic disease

## arabic_label
انتقال العدوى عبر الهواء

## arabic_aliases
الأمراض الوبائية المحمولة جوا مثل الإنفلونزا

## definition
Airborne transmission -- spread via respiratory droplets or droplet nuclei -- is the classic route for common epidemic respiratory diseases, of which influenza is the textbook example. This is contrasted with typhoid (faeco-oral/waterborne), encephalitis (commonly vector-borne, e.g. by mosquitoes) and malaria (vector-borne, by Anopheles mosquitoes), none of which spread primarily through the air.

## explicit_objective
Identify influenza as a common airborne epidemic disease, distinguishing airborne transmission from the faeco-oral and vector-borne routes of typhoid, encephalitis and malaria.

## pitfalls
Assuming any epidemic disease is airborne by default -- typhoid, encephalitis and malaria are epidemic in the relevant sense but spread by faeco-oral or vector-borne routes, not through the air.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Pathogenesis of bacterial infections

## subtopic
Modes of transmission

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-4A48E0B1B6B45E

## resource_ids
src_6f2f4188bb0cbf848733

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.25

## exam_weight_by_year
AUN_Y1=0.25

## clinical_relevance
0.35

## academic_relevance
0.5

## weight_confidence
0.45

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"An example for common air borne epidemic disease? ... Influenza" (Q12).

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
sourceCandidateIds: find-existing.mjs run for "airborne epidemic" -- 0 hits, safe to create.

---

# Item

## id
CON-INF-A0CEFFF40ECCF9

## label
Antibiotic resistance is chiefly acquired through mutation or through gaining an R-factor (resistance) plasmid, and it is the R-plasmid route -- transferred by conjugation -- that spreads resistance between bacteria

## canonical_key
teaching.pharmacology.resistance.r-plasmid-conjugation-mechanism-and-spread

## aliases
R factor plasmid resistance
Conjugation as the spread route for multidrug resistance

## arabic_label
مقاومة المضادات الحيوية عبر البلازميدات

## arabic_aliases
انتقال المقاومة بين البكتيريا عن طريق الاقتران

## definition
Bacteria acquire antibiotic resistance chiefly through two mechanisms: spontaneous chromosomal mutation (which arises within a single organism and is not itself transmissible to other bacteria) and acquisition of an R-factor (resistance) plasmid, which carries one or more resistance genes. Because a plasmid is a mobile genetic element, R-plasmid-mediated resistance -- unlike mutation -- can be transferred between bacterial cells by conjugation, making conjugation the principal route by which multidrug resistance spreads through a bacterial population, including resistance to beta-lactams specifically.

## explicit_objective
State that bacteria acquire antibiotic resistance chiefly by mutation or by gaining an R-factor plasmid, and that plasmid-mediated resistance -- not mutation -- spreads between bacteria by conjugation.

## pitfalls
Treating mutation and plasmid acquisition as equally transmissible -- a mutation is confined to the organism in which it arose and its descendants, while a resistance plasmid can move horizontally between unrelated bacterial cells by conjugation.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Mechanisms of antibiotic resistance

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-8FD623568F7735

## resource_ids
src_6f2f4188bb0cbf848733

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.45

## exam_weight_by_year
AUN_Y1=0.45

## clinical_relevance
0.5

## academic_relevance
0.65

## weight_confidence
0.55

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Bacterin can become resistant to drugs by the following mechanism? ... A & C are correct [Mutation, Acquire R plasmid]" (Q14). "Multiple drug resistance could spread between bacteria by? ... Conjugation" (Q26). "A bacterial antibiotic resistance is frequently mediated by? ... R factor plasmid" (Q42). "Bacterial resistance to beta lactams is mediated by? ... Plasmid" (Q51).

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
sourceCandidateIds: find-existing.mjs run for "R factor plasmid" and "conjugation" -- a pending ASU-INF concept on the mechanics of conjugation (sex pili, F plasmid, no competence needed) covers a different grain (how conjugation itself works) from this record's grain (what resistance is acquired/spread and by which route); not merged.
relationships: four question stems (Q14, Q26, Q42, Q51) each test one facet of this same acquisition-and-spread fact (the two acquisition mechanisms, the spread route between bacteria, R-plasmid mediation generally, and R-plasmid mediation of beta-lactam resistance specifically); collapsed into one record rather than four.

---

# Item

## id
CON-INF-9E8165F7FCF947

## label
Broad-spectrum antibiotics disrupt the body's normal bacterial flora more than narrow-spectrum agents, because they suppress a wider range of commensal species alongside the target pathogen

## canonical_key
teaching.pharmacology.antimicrobials.broad-spectrum-flora-disruption

## aliases
Broad spectrum antibiotics and normal flora disruption

## arabic_label
تأثير المضادات الحيوية واسعة الطيف على الفلورا الطبيعية

## arabic_aliases
تعطيل الفلورا البكتيرية الطبيعية بالمضادات واسعة الطيف

## definition
Because broad-spectrum antibiotics act against a wide range of both Gram-positive and Gram-negative bacteria, their use disturbs the body's normal commensal flora (gut, skin, mucosal) more severely than a narrow-spectrum agent, which is selective enough to spare most non-target species. This disruption is clinically relevant because it can permit overgrowth of resistant or opportunistic organisms (e.g. Clostridium difficile) once competing normal flora is suppressed.

## explicit_objective
State that broad-spectrum antibiotics disrupt the normal bacterial flora more than narrow-spectrum agents, because they suppress a wider range of commensal species.

## pitfalls
Assuming any single narrow-spectrum agent (e.g. Penicillin G, Streptomycin) disrupts flora as broadly as a broad-spectrum agent -- the disruption scales with spectrum breadth, not with potency against the target organism.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Antimicrobial spectrum and its clinical consequences

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-1AD4F150B33953
CON-INF-3216CACCF7AD97

## resource_ids
src_6f2f4188bb0cbf848733

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
0.45

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Bacterial flora of the body is mainly affected by the use of? ... Broad spectrum antibiotics" (Q15).

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
sourceCandidateIds: find-existing.mjs run for "broad spectrum antibiotic" -- 0 same-grain hit, safe to create.

---

# Item

## id
CON-INF-2715335837C410

## label
Sulfonamides act by competitive antagonism, blocking PABA's conversion to folic acid; bacteria that can absorb pre-formed folic acid from their environment bypass this block and are resistant

## canonical_key
teaching.pharmacology.antimicrobials.sulfonamide-competitive-antagonism-and-resistance

## aliases
Sulfonamide mechanism of action
Sulfonamide resistance via exogenous folate use

## arabic_label
آلية عمل السلفوناميدات ومقاومتها

## arabic_aliases
التضاد التنافسي لحمض الفوليك

## definition
Sulfonamides are structural analogues of PABA (para-aminobenzoic acid) that competitively inhibit dihydropteroate synthase, blocking the bacterial conversion of PABA into folic acid -- a pathway bacteria need because, unlike human cells, they cannot take up pre-formed folic acid from their surroundings and must synthesise it themselves. A bacterium that CAN absorb pre-formed folic acid from the environment bypasses this blocked step entirely and is therefore resistant to sulfonamides, since the drug's target pathway becomes unnecessary.

## explicit_objective
State that sulfonamides act by competitive antagonism of PABA's conversion to folic acid, and that bacteria able to use pre-formed exogenous folic acid are resistant because they bypass this pathway.

## pitfalls
Assuming sulfonamide resistance always arises from a mutated target enzyme -- here the resistance mechanism is metabolic bypass (using an alternative folate source), not target alteration.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Folate pathway inhibitors

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-198D75A4CF7391

## resource_ids
src_6f2f4188bb0cbf848733

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
0.45

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
"Sulfonamides act by? ... Inhibition of growth by competitive antagonism" (Q16). "Bacteria that can absorb folic acid from the surrounding environment is going to be resistant to? ... Sulfamethoxazole" (Q23). "Resistance to sulfonamides is mediated by? ... Use of pre-formed folic acid" (Q65).

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
sourceCandidateIds: find-existing.mjs run for "sulfonamide" and "PABA" -- 0 same-grain hit, safe to create.
relationships: three question stems (Q16, Q23, Q65) each test one facet of this mechanism/resistance pairing; collapsed into one record.

---

# Item

## id
CON-INF-198D75A4CF7391

## label
Sulfonamides and trimethoprim act synergistically because they block two sequential steps of the same bacterial folate synthesis pathway

## canonical_key
teaching.pharmacology.antimicrobials.sulfonamide-trimethoprim-synergism

## aliases
Co-trimoxazole synergism
Sulfonamide-trimethoprim combination

## arabic_label
التآزر بين السلفوناميدات والتريميثوبريم

## arabic_aliases
حصار متسلسل لمسار تخليق حمض الفوليك

## definition
Sulfonamides block the conversion of PABA to dihydrofolic acid, while trimethoprim blocks the next step, the reduction of dihydrofolic acid to tetrahydrofolic acid by dihydrofolate reductase. Because the two drugs block two sequential steps of the same pathway, their combined effect (co-trimoxazole) is synergistic -- markedly more effective than either drug alone -- rather than merely additive or antagonistic.

## explicit_objective
State that sulfonamides and trimethoprim act synergistically by blocking two sequential steps of bacterial folate synthesis.

## pitfalls
Assuming that combining any two antifolate-pathway drugs is automatically synergistic -- the synergism here specifically follows from blocking two sequential (not the same, and not unrelated) steps of one pathway.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Folate pathway inhibitors

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-2715335837C410
CON-INF-B123D909CFF636

## resource_ids
src_6f2f4188bb0cbf848733

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
0.55

## weight_confidence
0.45

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The antimicrobial effect of sulfonamides could be synergistic with which of the following? ... Trimethoprim" (Q18).

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
sourceCandidateIds: find-existing.mjs run for "sulfonamide trimethoprim synergistic" -- 0 hits, safe to create.

---

# Item

## id
CON-INF-68C4791563358D

## label
Anaphylactic shock, a Type I IgE-mediated hypersensitivity reaction, is the main clinically significant side effect of penicillin

## canonical_key
teaching.pharmacology.antimicrobials.penicillin-anaphylaxis

## aliases
Penicillin hypersensitivity
Penicillin anaphylactic shock

## arabic_label
الصدمة التأقية للبنسلين

## arabic_aliases
فرط الحساسية للبنسلين

## definition
Penicillin's main clinically significant adverse effect is a Type I, IgE-mediated hypersensitivity reaction that can progress to anaphylactic shock, distinguishing it from the bone-marrow-toxicity concerns associated with chloramphenicol (aplastic anaemia, agranulocytosis) and from leukocytosis, which is not a recognised penicillin adverse effect at all.

## explicit_objective
State that anaphylactic shock (hypersensitivity) is penicillin's main clinically significant side effect, distinct from the bone-marrow toxicities associated with chloramphenicol.

## pitfalls
Attributing aplastic anaemia or agranulocytosis to penicillin -- these are chloramphenicol's characteristic bone-marrow toxicities, not penicillin's.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Antimicrobial adverse effects

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-48876D379A97FC

## resource_ids
src_6f2f4188bb0cbf848733

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
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The main side effect of penicillin is? ... Anaphylactic shock" (Q19).

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
sourceCandidateIds: find-existing.mjs run for "penicillin anaphylactic" -- 0 hits, safe to create.

---

# Item

## id
CON-INF-1AD4F150B33953

## label
Clostridium difficile is the classic cause of antibiotic-associated diarrhea and its more severe form, pseudomembranous enterocolitis, typically following broad-spectrum antibiotic disruption of normal gut flora

## canonical_key
teaching.microbiology.clostridium-difficile.antibiotic-associated-colitis

## aliases
C. difficile
Pseudomembranous enterocolitis

## arabic_label
التهاب القولون الغشائي الكاذب

## arabic_aliases
الإسهال المرتبط بالمضادات الحيوية بسبب المطثية العسيرة

## definition
Clostridium difficile is the classic cause of antibiotic-associated diarrhea and its more severe manifestation, pseudomembranous enterocolitis, which typically arises after broad-spectrum antibiotic use disrupts the normal protective gut flora and allows C. difficile to overgrow and produce its toxins. Other organisms listed as distractors (C. sordellii, C. perfringens, S. aureus, C. botulinum) cause distinct clinical syndromes, not this specific antibiotic-associated colitis picture.

## explicit_objective
Identify Clostridium difficile as the classic cause of antibiotic-associated diarrhea and pseudomembranous enterocolitis, linking it to broad-spectrum antibiotic disruption of gut flora.

## pitfalls
Confusing C. difficile with other Clostridium species (C. perfringens -- gas gangrene/food poisoning; C. botulinum -- botulism) that cause unrelated syndromes.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Antimicrobial adverse effects

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-9E8165F7FCF947

## resource_ids
src_6f2f4188bb0cbf848733

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
0.55

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Antibiotic-associated diarrhea and the more pseudomembranous enterocolitis can be caused by? ... Clostridium difficile" (Q20).

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
sourceCandidateIds: find-existing.mjs run for "Clostridium difficile" and "pseudomembranous" -- 0 same-grain hit, safe to create.

---

# Item

## id
CON-INF-8FD623568F7735

## label
Beta-lactamase enzymatically hydrolyses and inactivates beta-lactam drugs, the classic example of drug-inactivation as a bacterial resistance mechanism

## canonical_key
teaching.pharmacology.resistance.beta-lactamase-drug-inactivation

## aliases
Beta lactamase
Penicillin-inactivating enzyme

## arabic_label
إنزيم بيتا لاكتاماز

## arabic_aliases
تعطيل البنسلين بواسطة إنزيم بيتا لاكتاماز

## definition
Beta-lactamase is a bacterial enzyme that hydrolyses the beta-lactam ring shared by penicillins and related drugs, inactivating them before they can bind their target -- the textbook example of drug inactivation as a resistance mechanism, standing alongside altered target site, altered drug permeability, and active efflux as the four broad categories by which bacteria resist antimicrobials.

## explicit_objective
State that beta-lactamase inactivates beta-lactam drugs by enzymatic hydrolysis, and identify it as the classic example of the "drug inactivation" resistance mechanism category.

## pitfalls
Confusing beta-lactamase (a resistance enzyme that destroys the drug) with a virulence enzyme such as coagulase or catalase, which serve unrelated roles in host-organism interaction rather than antibiotic destruction.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Mechanisms of antibiotic resistance

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-A0CEFFF40ECCF9
CON-INF-AE7060FCD707AB

## resource_ids
src_6f2f4188bb0cbf848733

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
"Beta lactamase production is one method by which bacteria become resistant to beta lactam agents. This is a good example of? ... Inactivation of the drug" (Q21). "Bacterial enzyme than inactivate penicillin is? ... Beta lactamase" (Q48).

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
sourceCandidateIds: find-existing.mjs run for "beta lactamase" -- 0 hits, safe to create.
relationships: two question stems (Q21, Q48) test the same enzyme fact from different angles (classifying the resistance-mechanism category vs naming the enzyme); collapsed into one record.

---

# Item

## id
CON-INF-8FABD01DF54147

## label
Antimicrobial agents are classified as bactericidal (kill bacteria) or bacteriostatic (inhibit growth without killing); tetracyclines are the classic bacteriostatic example

## canonical_key
teaching.pharmacology.antimicrobials.cidal-static-drug-classification

## aliases
Bactericidal vs bacteriostatic drug examples
Tetracycline as bacteriostatic

## arabic_label
تصنيف المضادات الحيوية القاتلة والمثبطة للنمو

## arabic_aliases
التتراسيكلين كمثال للمضادات المثبطة للنمو

## definition
Antimicrobial agents are broadly classified as bactericidal, which kill bacteria outright, or bacteriostatic, which inhibit bacterial growth and multiplication without necessarily killing the organism (relying on host immune defences to clear the now-static population). Tetracyclines are the classic bacteriostatic example, in contrast to bactericidal classes such as aminoglycosides, penicillins and polymyxins.

## explicit_objective
Classify tetracyclines as bacteriostatic, distinguishing this class from bactericidal antimicrobial agents.

## pitfalls
Assuming all protein synthesis inhibitors share the same cidal/static classification -- tetracyclines are bacteriostatic while aminoglycosides, also protein synthesis inhibitors, are bactericidal.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Antimicrobial classification

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-1249475C90F47B
CON-INF-79A3B378728C71

## resource_ids
src_6f2f4188bb0cbf848733

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
0.45

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Considered as bacteriostatic agent? ... Tetracycline" (Q24).

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
sourceCandidateIds: find-existing.mjs run for "bacteriostatic" -- the live bactericidal-definition concept (CON-INF-1249475C90F47B) covers the opposite term's definition, not this record's drug-classification grain; not merged, linked as related_concept_ids instead.

---

# Item

## id
CON-INF-48876D379A97FC

## label
Chloramphenicol inhibits bacterial protein synthesis by binding the 50S ribosomal subunit; its most serious clinical drawback is bone marrow suppression (aplastic anaemia)

## canonical_key
teaching.pharmacology.antimicrobials.chloramphenicol-50s-and-marrow-toxicity

## aliases
Chloramphenicol mechanism of action
Chloramphenicol bone marrow toxicity

## arabic_label
آلية عمل الكلورامفينيكول وسميته النخاعية

## arabic_aliases
تثبيط نخاع العظم بالكلورامفينيكول

## definition
Chloramphenicol inhibits bacterial protein synthesis by binding the 50S ribosomal subunit and blocking peptidyl transferase, distinguishing it from the 30S-targeting tetracyclines and aminoglycosides. Its most serious clinical drawback -- the reason its use is now restricted -- is bone marrow suppression, which can present as a dose-related, reversible anaemia or, rarely, as idiosyncratic, dose-independent and often fatal aplastic anaemia; this toxicity, not its GI absorption or oral bioavailability, is what most limits its clinical use.

## explicit_objective
State that chloramphenicol binds the 50S ribosomal subunit to inhibit protein synthesis, and identify bone marrow suppression as its most serious clinical drawback.

## pitfalls
Confusing chloramphenicol's ribosomal target (50S) with the 30S target of tetracyclines and aminoglycosides; attributing its main clinical limitation to GI side effects or oral bioavailability rather than to bone marrow toxicity.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Protein synthesis inhibitor classes

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-282B6D07348734
CON-INF-68C4791563358D

## resource_ids
src_6f2f4188bb0cbf848733

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
0.55

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
"The use of chloramphenicol may unfortunately lead to bone marrow failure. This antimicrobial functions through? ... Inhibition of protein synthesis" (Q25). "Chloramphenicol destroys the bacteria by? ... Inhibition of protein synthesis by binding to 50S ribosomal subunit" (Q73). "The most serious disadvantage of clinical use of chloramphenicol is? ... It may cause bone marrow suppression" (Q74).

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
sourceCandidateIds: find-existing.mjs run for "chloramphenicol" -- 0 hits, safe to create.
relationships: three question stems (Q25, Q73, Q74) each test one facet of chloramphenicol's mechanism or its adverse-effect profile; collapsed into one record.

---

# Item

## id
CON-INF-63261E1F45420D

## label
Rifampicin, an antituberculous agent, inhibits bacterial RNA polymerase, blocking transcription

## canonical_key
teaching.pharmacology.antimicrobials.rifampicin-rna-polymerase-inhibition

## aliases
Rifampicin mechanism of action
RNA polymerase inhibition

## arabic_label
آلية عمل الريفامبيسين

## arabic_aliases
تثبيط الريفامبيسين لإنزيم بوليميراز الرنا

## definition
Rifampicin, an antituberculous agent, inhibits the bacterial DNA-dependent RNA polymerase enzyme, blocking transcription of bacterial genes into mRNA. This mechanism is distinct from that of the quinolones, which inhibit DNA gyrase (a DNA-replication enzyme, not RNA transcription), and from the protein-synthesis- or cell-wall-targeting classes.

## explicit_objective
State that rifampicin inhibits bacterial RNA polymerase, blocking transcription, distinguishing this from DNA gyrase inhibition by the quinolones.

## pitfalls
Confusing rifampicin's RNA-polymerase target with quinolones' DNA-gyrase target -- both are nucleic-acid-related enzymes but act at different steps (transcription vs DNA replication/supercoiling).

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Nucleic acid synthesis inhibitors

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-1BC546A68F8A0F

## resource_ids
src_6f2f4188bb0cbf848733

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
0.45

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
"Rifampicin is an antimicrobial that has antituberculous activity. It functions through? ... Inhibition of RNA polymerase enzyme" (Q29). "Rifampicin? ... Inhibit RNA polymerase" (Q45).

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
sourceCandidateIds: find-existing.mjs run for "rifampicin" -- 0 hits, safe to create.
relationships: two question stems (Q29, Q45) test the identical mechanism fact from near-identical framings; collapsed into one record rather than held as a duplicate, since both are informative single-fact recall stems the module benefits from having twice with different distractor sets.

---

# Item

## id
CON-INF-8B5B9FAD59E176

## label
Virulence is the quantitative measure of pathogenicity -- often expressed as the number of organisms needed to cause disease -- and its expression can be regulated by environmental factors and its genes carried on a plasmid or phage, and so can be transmitted between bacteria

## canonical_key
teaching.microbiology.pathogenesis.virulence-quantitative-measure

## aliases
Virulence definition
Virulence gene transmissibility

## arabic_label
الفوعة كمقياس كمي للإمراضية

## arabic_aliases
جينات الفوعة المحمولة على البلازميد أو العاثية

## definition
Virulence is the quantitative measure of a pathogen's pathogenicity, often expressed operationally as the number of organisms required to cause disease (a lower number meaning higher virulence). Its expression can be regulated by environmental factors, and virulence genes are frequently carried on a plasmid or phage rather than solely on the chromosome, often clustered in pathogenicity islands -- which means, contrary to a common misconception, that virulence genes CAN be transmitted between bacteria by the same horizontal gene transfer routes (conjugation, transduction) that spread antibiotic resistance.

## explicit_objective
Define virulence as the quantitative measure of pathogenicity, and state that virulence genes -- often plasmid- or phage-encoded -- can be transmitted between bacteria, unlike a fixed, non-transmissible trait.

## pitfalls
Assuming virulence is a fixed, non-transmissible property of a species -- virulence genes carried on mobile genetic elements (plasmids, phages) can move between bacterial cells, just as resistance genes do.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Pathogenesis of bacterial infections

## subtopic
Virulence and pathogenicity

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-ACA5AD215D874E
CON-INF-B775994AC7062B

## resource_ids
src_6f2f4188bb0cbf848733

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
"A quantitative measure for pathogenicity is known as? ... Virulence" (Q37). "Virulence of an organism is a quantitative measure for pathogenicity. All the following is correct with regard to virulence EXCEPT? ... Cannot be transmitted between bacteria" (Q40).

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
sourceCandidateIds: find-existing.mjs run for "virulence factor" -- hits found are this module's own ch1 virulence-factors-list concept (CON-INF-B775994AC7062B, a different grain: the list of factors, not the quantitative-measure definition) and unrelated concepts from other modules; linked as related_concept_ids, not merged.
relationships: two question stems (Q37, Q40) test the same definitional fact from naming it (Q37) and from an EXCEPT-format properties question (Q40); collapsed into one record.

---

# Item

## id
CON-INF-837A04FFAD5A95

## label
Latent infection is a state in which a microbe persists for years in the host causing minimal clinical disease, retaining the ability to reactivate

## canonical_key
teaching.microbiology.pathogenesis.latent-infection-definition

## aliases
Latent infection
Reactivation potential

## arabic_label
العدوى الكامنة

## arabic_aliases
استمرار الميكروب مع قابلية إعادة التنشيط

## definition
Latent infection describes a state in which a microorganism persists within the host for years, causing minimal or no clinical disease during that time, while retaining the capacity to reactivate later and produce overt illness. This differs from a chronic infection (ongoing, usually more clinically apparent disease), a carrier state (asymptomatic shedding without necessarily implying dormancy or later reactivation), and subclinical infection (mild/inapparent disease without the specific reactivation emphasis).

## explicit_objective
Define latent infection as years-long microbial persistence with minimal disease and a retained capacity to reactivate, distinguishing it from chronic infection, carrier state, and subclinical infection.

## pitfalls
Treating "latent infection," "carrier state," and "chronic infection" as interchangeable -- each names a distinct pattern of host-microbe persistence with different clinical implications.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Pathogenesis of bacterial infections

## subtopic
Patterns of infection persistence

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-C4C74A0874FF61

## resource_ids
src_6f2f4188bb0cbf848733

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
0.55

## weight_confidence
0.45

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A condition in which the microbe is able to persist for sears in the host causing minimal clinical disease with ability to reactivate is known as? ... Latent infection" (Q38).

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
sourceCandidateIds: find-existing.mjs run for "latent infection" -- 0 hits, safe to create.
transcriptionNote: the source stem prints "persist for sears" (a printing typo for "years"); preserved verbatim in original_wording, corrected to "years" in the concept's own prose.

---

# Item

## id
CON-INF-05FF149DC51874

## label
Bacterial invasiveness -- the spread of an organism through host tissue -- is facilitated by extracellular spreading enzymes such as collagenase, which breaks down connective-tissue collagen

## canonical_key
teaching.microbiology.pathogenesis.invasiveness-spreading-enzymes

## aliases
Bacterial invasiveness
Collagenase as a spreading factor

## arabic_label
عوامل الغزو البكتيري

## arabic_aliases
إنزيم الكولاجينيز كعامل انتشار

## definition
Bacterial invasiveness, an organism's ability to spread through host tissue once established, is facilitated by extracellular enzymes that break down tissue barriers -- collagenase, produced by organisms such as Clostridium perfringens, degrades connective-tissue collagen and promotes spread through tissue planes. This is distinct from coagulase (which promotes clot formation, tending to localise rather than spread infection), catalase (which neutralises host oxidative killing rather than aiding spread), and urease (implicated in colonisation/survival for specific organisms rather than general tissue invasion).

## explicit_objective
State that bacterial invasiveness is facilitated by tissue-spreading enzymes such as collagenase, distinguishing this role from coagulase, catalase, and urease.

## pitfalls
Assuming coagulase promotes bacterial spread -- coagulase forms a fibrin clot around the organism, which tends to localise infection (as in an abscess) rather than facilitate invasive spread.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## modules
AUN-INI-105

## topic
Pathogenesis of bacterial infections

## subtopic
Virulence and pathogenicity

## microtopic

## nanotopic

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-B775994AC7062B

## resource_ids
src_6f2f4188bb0cbf848733

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
0.45

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Invasiveness of bacteria could be facilitated by? ... Collagenase enzyme" (Q41).

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
sourceCandidateIds: find-existing.mjs run for "virulence factor" -- this module's own ch1 virulence-factors-list concept (CON-INF-B775994AC7062B) covers the list of factor categories, not this record's specific invasiveness-enzyme grain; linked as related_concept_ids, not merged.

---

# Item

## id
CON-INF-1BC546A68F8A0F

## label
Quinolones inhibit bacterial DNA gyrase (topoisomerase II), blocking DNA supercoiling and replication

## canonical_key
teaching.pharmacology.antimicrobials.quinolone-dna-gyrase-inhibition

## aliases
Quinolone mechanism of action
DNA gyrase inhibition

## arabic_label
آلية عمل الكينولونات

## arabic_aliases
تثبيط إنزيم جيريز الحمض النووي

## definition
Quinolones (e.g. levofloxacin, ciprofloxacin) inhibit bacterial DNA gyrase (topoisomerase II), an enzyme that introduces negative supercoils into bacterial DNA to relieve the topological strain created during replication; blocking it prevents DNA replication and is bactericidal. This distinguishes quinolones from rifampicin (which inhibits RNA polymerase, blocking transcription rather than replication) and from the protein-synthesis- and cell-wall-targeting drug classes.

## explicit_objective
State that quinolones inhibit bacterial DNA gyrase, blocking DNA replication, distinguishing this from RNA polymerase inhibition by rifampicin.

## pitfalls
Confusing DNA gyrase inhibition (quinolones, blocking DNA replication) with RNA polymerase inhibition (rifampicin, blocking transcription) -- both are nucleic-acid-related targets but act at different steps.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Nucleic acid synthesis inhibitors

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-63261E1F45420D

## resource_ids
src_6f2f4188bb0cbf848733

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
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The following antibiotic act by Inhibiting DNA synthesis in bacteria? ... Quinolones" (Q44). "Quinolone? ... Inhibit DNA gyrase" (Q46).

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
sourceCandidateIds: find-existing.mjs run for "quinolone" -- 0 hits, safe to create.
relationships: two question stems (Q44, Q46) test the identical fact (naming the drug class from its effect, and naming the specific target); collapsed into one record.

---

# Item

## id
CON-INF-971BBB6832830A

## label
Membrane-active antimicrobial agents disrupt the cytoplasmic (or fungal cell) membrane rather than the cell wall or an intracellular target -- Polymyxin acts on the bacterial cytoplasmic membrane, while Nystatin, an antifungal, disrupts the ergosterol-containing fungal membrane and is used to treat Candida infections

## canonical_key
teaching.pharmacology.antimicrobials.membrane-active-agents-polymyxin-nystatin

## aliases
Polymyxin mechanism of action
Nystatin and Candida treatment

## arabic_label
المضادات المؤثرة على الغشاء الخلوي

## arabic_aliases
البوليميكسين والنيستاتين

## definition
Membrane-active antimicrobial and antifungal agents act by disrupting a lipid membrane rather than the cell wall or an intracellular process. Polymyxin binds bacterial lipopolysaccharide and disrupts the cytoplasmic membrane of Gram-negative bacteria, producing a bactericidal effect. Nystatin, by contrast, is an antifungal polyene that binds ergosterol in the fungal cell membrane, disrupting its integrity, and is used clinically to treat Candida infections; it has no useful activity against bacteria, whose membranes lack ergosterol.

## explicit_objective
State that Polymyxin disrupts the bacterial cytoplasmic membrane while Nystatin disrupts the ergosterol-containing fungal membrane and treats Candida, distinguishing membrane-active agents by their target organism class.

## pitfalls
Assuming any membrane-active agent works against both bacteria and fungi -- Polymyxin and Nystatin act on structurally different membranes (bacterial cytoplasmic membrane vs. ergosterol-containing fungal membrane) and are not interchangeable across kingdoms.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Cell membrane-active agents

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids

## resource_ids
src_6f2f4188bb0cbf848733

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
0.55

## weight_confidence
0.45

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Candida is treated by? ... Nystatin" (Q47). "One of the following inhibit bacterial cell membra function? ... Polymyxin" (Q56). "Nystatin inhibits? ... Cell membrane function" (Q60).

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
sourceCandidateIds: find-existing.mjs run for "polymyxin" and "nystatin" -- 0 hits, safe to create.
relationships: three question stems (Q47, Q56, Q60) test the paired Polymyxin/Nystatin membrane-mechanism facts; collapsed into one record.
transcriptionNote: Q56's source stem prints "inhibit bacterial cell membra function" (a truncation of "membrane"); preserved verbatim in original_wording.

---

# Item

## id
CON-INF-88F95673CA38E8

## label
Cell-wall-synthesis-inhibiting drugs include the beta-lactams (penicillins, monobactams) and the glycopeptide vancomycin, distinct from drugs targeting protein synthesis, the cell membrane, or nucleic acids

## canonical_key
teaching.pharmacology.antimicrobials.cell-wall-inhibitor-drug-identification

## aliases
Cell wall synthesis inhibitor drug list
Penicillin and vancomycin mechanism of action

## arabic_label
تحديد المضادات المثبطة لتخليق جدار الخلية

## arabic_aliases
البنسلين والفانكومايسين كمثبطات لجدار الخلية

## definition
Cell-wall-synthesis-inhibiting antimicrobials include the beta-lactams (penicillins, cephalosporins, monobactams such as aztreonam), which block peptidoglycan cross-linking transpeptidase enzymes, and the glycopeptide vancomycin, which binds the D-Ala-D-Ala terminus of peptidoglycan precursors to block their incorporation. Both act by a fundamentally different route from protein-synthesis inhibitors (aminoglycosides, tetracyclines, chloramphenicol), membrane-active agents (polymyxin), or nucleic-acid-targeting drugs (quinolones, rifampicin) -- correctly identifying a drug as cell-wall-active, versus these other classes, is the recurring task these questions test.

## explicit_objective
Identify penicillin, vancomycin, and monobactams as cell-wall-synthesis-inhibiting drugs, distinguishing them from protein-synthesis-, membrane-, and nucleic-acid-targeting antimicrobial classes.

## pitfalls
Assuming all beta-lactam-sounding or "-mycin"-suffixed drug names share one mechanism class -- vancomycin (cell wall) and gentamycin (protein synthesis, an aminoglycoside despite the similar-sounding suffix) act by entirely different mechanisms.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Cell wall synthesis inhibitors

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-05D590078F3DCC
CON-INF-A5A90309AED2E6

## resource_ids
src_6f2f4188bb0cbf848733

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
"Vancomycin act on? ... Cell wall" (Q49). "Antimicrobial agent acts upon cell wall is? ... Penicillin" (Q68). "Mechanism of action of penicillin is? ... Inhibition of cell wall synthesis" (Q69). "The following drugs act by Inhibiting cell wall synthesis of the microorganisms? ... Monobactams" (Q72).

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
sourceCandidateIds: find-existing.mjs run for "vancomycin", "penicillin cell wall" and "monobactam" -- 0 hits, safe to create.
relationships: four question stems (Q49, Q68, Q69, Q72) each identify a cell-wall-active drug from a different distractor set; collapsed into one record.

---

# Item

## id
CON-INF-A5A90309AED2E6

## label
Cephalosporins inhibit bacterial cell wall synthesis, not protein synthesis, distinguishing them from the true protein-synthesis-inhibiting classes (tetracyclines, chloramphenicol, macrolides, aminoglycosides)

## canonical_key
teaching.pharmacology.antimicrobials.cephalosporin-cell-wall-not-protein-synthesis

## aliases
Cephalosporin mechanism of action

## arabic_label
آلية عمل السيفالوسبورينات

## arabic_aliases
السيفالوسبورينات كمثبطات لجدار الخلية

## definition
Cephalosporins, like penicillins, are beta-lactam antibiotics that inhibit bacterial cell wall (peptidoglycan) synthesis; they do not interfere with protein synthesis. When a question asks which of several protein-synthesis-inhibiting drug names does NOT interfere with protein synthesis, cephalosporins are the odd one out precisely because their mechanism lies elsewhere -- at the cell wall, alongside penicillins and vancomycin, not at the ribosome alongside tetracyclines, chloramphenicol, macrolides and aminoglycosides.

## explicit_objective
State that cephalosporins inhibit cell wall synthesis rather than protein synthesis, distinguishing them from the tetracycline/chloramphenicol/macrolide/aminoglycoside protein-synthesis-inhibitor classes.

## pitfalls
Grouping cephalosporins with other "-cillin"-adjacent or ribosome-targeting drug names by superficial naming pattern rather than by actual mechanism -- cephalosporins are cell-wall-active, not protein-synthesis-active.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Cell wall synthesis inhibitors

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-88F95673CA38E8
CON-INF-282B6D07348734

## resource_ids
src_6f2f4188bb0cbf848733

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
0.45

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following does not Interferes with protein synthesis? ... Cephalosporins" (Q54).

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
sourceCandidateIds: find-existing.mjs run for "cephalosporin" -- 0 hits, safe to create.

---

# Item

## id
CON-INF-AE7060FCD707AB

## label
Bacteria resist antimicrobial drugs through four broad, overlapping mechanism categories: enzymatic drug inactivation, altered target-site receptor, altered drug permeability, and (a fourth, active efflux)

## canonical_key
teaching.pharmacology.resistance.mechanism-category-overview

## aliases
Bacterial resistance mechanism categories
Overview of antimicrobial resistance mechanisms

## arabic_label
آليات مقاومة البكتيريا للمضادات الحيوية

## arabic_aliases
تصنيف آليات المقاومة الجرثومية

## definition
Bacteria become resistant to antimicrobial drugs through several broad mechanism categories that can act individually or together in the same organism: production of an enzyme that destroys or inactivates the drug (e.g. beta-lactamase), an altered target-site receptor that the drug can no longer bind effectively, and altered membrane permeability that keeps the drug from reaching an effective intracellular concentration. A given resistant organism may combine more than one of these categories at once, which is why a bank question asking "by which of the following mechanisms" often correctly answers "all of the above."

## explicit_objective
State that bacterial antimicrobial resistance arises from a set of broad mechanism categories -- enzymatic inactivation, altered target site, and altered permeability -- which can act individually or in combination.

## pitfalls
Assuming a resistant organism uses only one mechanism category -- multiple categories frequently combine in the same resistant strain, which is why "all of the above" is often the correct answer to this style of question.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Mechanisms of antibiotic resistance

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-8FD623568F7735

## resource_ids
src_6f2f4188bb0cbf848733

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
0.55

## weight_confidence
0.45

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Microorganism becomes resistant to antimicrobial drugs by the following mechanisms? ... All of the above [Production of enzyme that destroy the drug / Development of altered receptor of the drug / Change in permeability to drug]" (Q55).

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
sourceCandidateIds: find-existing.mjs run for "resistance mechanism" and "beta lactamase" -- the beta-lactamase concept minted this pass (CON-INF-8FD623568F7735) covers one specific enzyme example, not this record's broader taxonomy grain; linked as related_concept_ids, not merged.

---

# Item

## id
CON-INF-C4B0A8489B265C

## label
Surgical antimicrobial prophylaxis is indicated when a possible infection would carry a catastrophic consequence, not routinely for every operation or on a fixed pre/post-operative schedule unrelated to that risk

## canonical_key
teaching.pharmacology.antimicrobials.surgical-prophylaxis-indication

## aliases
Surgical antimicrobial prophylaxis
Indication for perioperative antibiotics

## arabic_label
الوقاية بالمضادات الحيوية الجراحية

## arabic_aliases
دواعي استخدام المضادات الحيوية الوقائية قبل الجراحة

## definition
Surgical antimicrobial prophylaxis is indicated specifically when a possible postoperative infection would have a catastrophic consequence for the patient (e.g. prosthetic-material implantation, cardiac surgery), timed to achieve effective drug levels at the time of incision -- not administered routinely for every operation regardless of risk, and not defined by a fixed interval such as "24 hours before" or "one week after" the operation, both of which are the wrong timing for effective prophylaxis.

## explicit_objective
State that surgical antimicrobial prophylaxis is indicated when a possible infection carries catastrophic risk, not routinely for all operations or on an arbitrary pre/post-operative schedule.

## pitfalls
Assuming prophylaxis is either always indicated (for all operations) or fixed to an arbitrary time window (24 hours before, or a week after) rather than being risk-based and timed around the incision itself.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Clinical use of antimicrobials

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids

## resource_ids
src_6f2f4188bb0cbf848733

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
0.45

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Surgical antimicrobial prophylaxis is indicated? ... When a possible infection would have a catastrophe effect" (Q59).

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
sourceCandidateIds: find-existing.mjs run for "surgical antimicrobial prophylaxis" -- 0 hits, safe to create.

---

# Item

## id
CON-INF-B123D909CFF636

## label
Combining two antimicrobials can produce synergism (a combined effect greater than either drug alone, e.g. penicillin plus gentamycin for enterococcal endocarditis) or antagonism (a combined effect worse than one drug alone, e.g. a bactericidal cell-wall agent paired with a bacteriostatic protein-synthesis inhibitor such as penicillin plus tetracycline for pneumococcal pneumonia)

## canonical_key
teaching.pharmacology.antimicrobials.combination-synergism-vs-antagonism

## aliases
Antimicrobial combination synergism
Antimicrobial combination antagonism

## arabic_label
التآزر والتضاد بين المضادات الحيوية

## arabic_aliases
التآزر بين البنسلين والجنتاميسين وتضاد البنسلين مع التتراسيكلين

## definition
When two antimicrobials are used together, the combined effect can be synergistic (markedly greater than either drug's individual effect) or antagonistic (worse than one drug used alone). Penicillin plus gentamycin against enterococci in endocarditis is a classic synergism example: the cell-wall-damaging penicillin allows the aminoglycoside better access to its intracellular ribosomal target. Penicillin plus tetracycline for pneumococcal pneumonia is a classic antagonism example: the bacteriostatic tetracycline halts bacterial growth and division, removing the actively dividing, cell-wall-synthesising target that the bactericidal, cell-wall-active penicillin needs in order to act.

## explicit_objective
State that antimicrobial combinations can be synergistic (e.g. penicillin plus gentamycin for enterococcal endocarditis) or antagonistic (e.g. penicillin plus tetracycline for pneumococcal pneumonia), and explain the mechanistic basis of each classic example.

## pitfalls
Assuming that combining a bactericidal and a bacteriostatic drug is always beneficial -- pairing a bacteriostatic drug that halts division with a bactericidal drug that needs active division/synthesis to act (as with tetracycline plus penicillin) can be antagonistic rather than synergistic.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Clinical use of antimicrobials

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-198D75A4CF7391

## resource_ids
src_6f2f4188bb0cbf848733

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
0.55

## weight_confidence
0.45

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Effect of combined use of penicillin and gentamycin in treatment of endocarditis caused by enterococci is called? ... Synergism" (Q62). "Effect of combined use of penicillin and tetracycline in treatment of pneumococcal pneumonia is called? ... Antagonism" (Q63).

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
sourceCandidateIds: find-existing.mjs run for "synergism antagonism antibiotic" -- 0 hits, safe to create.
relationships: two question stems (Q62, Q63) test the paired classic synergism/antagonism examples; collapsed into one record.

---

# Item

## id
CON-INF-E4D4D279028FBE

## label
A chemotherapeutic agent is a synthetically produced substance that can kill or inhibit bacteria, as distinct from a natural antibiotic (traditionally defined as a substance produced by one microorganism that inhibits another)

## canonical_key
teaching.pharmacology.antimicrobials.chemotherapeutic-agent-vs-antibiotic

## aliases
Chemotherapeutic agent definition
Synthetic vs natural antimicrobial

## arabic_label
العامل الكيميائي العلاجي

## arabic_aliases
الفرق بين المضاد الحيوي الطبيعي والعامل الكيميائي الاصطناعي

## definition
A chemotherapeutic agent is a synthetically produced substance capable of killing or inhibiting the growth of microorganisms. This is contrasted, in the traditional teaching definition the bank follows, with an antibiotic proper -- a substance naturally produced by one microorganism (classically a fungus or Streptomyces species) that inhibits the growth of another. Sulfonamides and quinolones are classic wholly synthetic chemotherapeutic agents under this scheme, even though modern usage often applies "antibiotic" loosely to any antimicrobial drug regardless of origin.

## explicit_objective
State that a chemotherapeutic agent is a synthetically produced antimicrobial substance, as distinguished (in the traditional teaching definition) from a naturally produced antibiotic.

## pitfalls
Assuming "antibiotic" and "chemotherapeutic agent" are simple synonyms in every context -- the bank's own teaching frame draws a natural-vs-synthetic distinction between the two terms that modern clinical usage often blurs.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Terminology of antimicrobial agents

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids

## resource_ids
src_6f2f4188bb0cbf848733

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.25

## exam_weight_by_year
AUN_Y1=0.25

## clinical_relevance
0.25

## academic_relevance
0.5

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Synthetic substance that can kill bacteria? ... Chemotherapeutic agent" (Q70).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
The natural/synthetic distinction between "antibiotic" and "chemotherapeutic agent" is a traditional teaching simplification; modern usage frequently applies "antibiotic" to synthetic agents too. Inherited from the source, not introduced here.

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
sourceCandidateIds: find-existing.mjs run for "chemotherapeutic agent" -- 0 hits, safe to create.

---

# Item

## id
CON-INF-3216CACCF7AD97

## label
Narrow-spectrum antibiotics act against a limited range of bacterial groups, while broad-spectrum agents (e.g. the fluoroquinolone levofloxacin) act against a wide range of both Gram-positive and Gram-negative organisms

## canonical_key
teaching.pharmacology.antimicrobials.narrow-vs-broad-spectrum-classification

## aliases
Narrow spectrum vs broad spectrum antibiotics
Levofloxacin as broad spectrum

## arabic_label
تصنيف المضادات الحيوية ضيقة وواسعة الطيف

## arabic_aliases
الليفوفلوكساسين كمضاد واسع الطيف

## definition
Antimicrobial spectrum classifies a drug by how many bacterial groups it acts against: narrow-spectrum agents (e.g. vancomycin against Gram-positives, clindamycin against anaerobes/Gram-positives, azithromycin against a comparatively limited range) target a restricted range, while broad-spectrum agents act against a wide range spanning both Gram-positive and Gram-negative organisms. Fluoroquinolones such as levofloxacin are classic broad-spectrum agents, in contrast to the narrower-spectrum drugs they are often grouped against in this style of question.

## explicit_objective
Classify levofloxacin as broad-spectrum, distinguishing it from narrow-spectrum agents such as vancomycin, clindamycin, and azithromycin.

## pitfalls
Assuming every fluoroquinolone-class or macrolide-class drug shares one spectrum classification -- spectrum breadth varies within a class and must be evaluated per agent, not assumed from class membership alone.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial chemotherapy

## subtopic
Antimicrobial spectrum and its clinical consequences

## microtopic

## nanotopic

## modules
AUN-INI-105

## article_ids
ART-INF-AUN-INI105-ANTIMICROBIAL-PATHOGENESIS

## related_article_ids

## related_concept_ids
CON-INF-9E8165F7FCF947

## resource_ids
src_6f2f4188bb0cbf848733

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
0.5

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The following are narrow spectrum antibiotics EXCEPT? ... Levofloxacin" (Q71).

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
sourceCandidateIds: find-existing.mjs run for "narrow spectrum broad spectrum" -- 0 hits, safe to create.

---
