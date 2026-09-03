<!--
  MU-MED102 (Foundation 2) · lane-1 authored concepts for the f2end43
  cluster (45 questions from End Foundation 2 Batch 43). Searched via
  find-existing.mjs and grep across docs/*-Source-Imports/concept before
  minting any of these 20 — see coverage/MU-MED102-triage.md's "Concept
  search sample" and each item's own field_notes.sourceCandidateIds below.
  26 of 45 questions instead reuse an existing live/pending concept via a
  sparse tag-addition overlay row in pending-live/MU-MED102-overlay-concepts.md
  (no module_subject on an overlay row, per LANE-CARD rule 6).

  Grouped by subject: microbiology (inf, 9 concepts), pharmacology (pharm,
  3 concepts), general pathology (fnd, 8 concepts). Teaching articles are in
  article/MU-MED102-articles.md (three articles, one per subject group).
  Evidence (one claim + one citation per concept) is in evidence/MU-MED102-
  {claims,citations}.md, citing evidence/MU-MED102-resources.md's single
  resource record (the department-keyed End F2 Batch 43 exam itself, since
  Menoufia sources are not in corpus-source-index.json).

  Simulate together with the pending-live overlay file, this file, its
  article + evidence files, and the question batch:
    npm run medical:simulate -- \
      docs/Menoufia-Source-Imports/pending-live/MU-MED102-overlay-concepts.md \
      docs/Menoufia-Source-Imports/concept/MU-MED102-concepts.md \
      docs/Menoufia-Source-Imports/article/MU-MED102-articles.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED102-resources.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED102-claims.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED102-citations.md \
      docs/Menoufia-Source-Imports/question/MU-MED102-f2end43-mcq.md \
      --emit /tmp/sim-MU-MED102.json

  Import: Admin › Concepts › Import.
-->

# Item

## label
Bacteria range in size from about 0.2 to 8 micrometres

## id
CON-INF-940EB35DE56BEE

## canonical_key
bacteria.size.micrometre-range

## aliases
Bacterial size range
Size of bacteria

## arabic_label


## arabic_aliases


## definition
Bacteria are visible only by light or electron microscopy because they are extremely small: the smallest (such as Mycoplasma) approach about 0.2 micrometres, and the largest rod-shaped forms reach about 8 micrometres, so the accepted teaching range for the group as a whole is roughly 0.2 to 8 micrometres, not millimetres.

## explicit_objective
State that bacterial size spans roughly 0.2 to 8 micrometres, and reject a millimetre-scale range as a common distractor.

## pitfalls
Reading "0.2-8 mm" as correct because the digits match the true micrometre range — a thousand-fold unit error that would make bacteria visible to the naked eye.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
General bacteriology

## subtopic
Bacterial morphology

## microtopic
Bacterial size

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.15

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-INF-940EB35DE56BEE

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q1: The size of bacteria range from...to... / 0.2-8um.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p1 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "bacteria size", "size of bacteria" and "0.2 micron" — no candidate record exists in live state or docs/*-Source-Imports concept files.

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

---

# Item

## label
Streptodornase is a streptococcal DNAase enzyme that liquefies pus by degrading extracellular DNA

## id
CON-INF-D2D163ED014D92

## canonical_key
streptococcus.enzymes.streptodornase-dnaase

## aliases
Streptodornase
Streptococcal DNAase

## arabic_label


## arabic_aliases


## definition
Streptodornase (streptococcal deoxyribonuclease) is one of the spreading-factor enzymes Streptococcus pyogenes secretes; it depolymerises the DNA that accumulates in purulent exudate (from lysed leukocytes), reducing the viscosity of pus and helping the organism spread through tissue, distinct from streptokinase (which lyses fibrin clots) and hyaluronidase (which breaks down connective-tissue ground substance).

## explicit_objective
Identify streptodornase as a DNAase enzyme that liquefies pus, distinguishing it from streptokinase's fibrinolytic action and hyaluronidase's connective-tissue action.

## pitfalls
Confusing streptodornase with streptokinase (fibrinolysin) because both are streptococcal spreading-factor enzymes with similar names — streptodornase acts on DNA, streptokinase on fibrin.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
Bacteriology

## subtopic
Streptococcus pyogenes virulence factors

## microtopic
Streptodornase

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-INF-D2D163ED014D92

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q3: Choose the best description of Streptodornase enzyme action / DNAase enzymes.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p1 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "streptodornase" — no candidate record exists.

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

---

# Item

## label
Airborne particles carrying pathogens larger than 5 micrometres transmit by contact and droplet routes, not true airborne spread

## id
CON-INF-B9536C79237DE1

## canonical_key
transmission.particle-size.contact-and-droplet-above-5-micrometres

## aliases
Droplet vs airborne transmission by particle size
Contact and droplet transmission

## arabic_label


## arabic_aliases


## definition
Respiratory transmission is classified by particle size: droplet nuclei under about 5 micrometres stay airborne and travel on air currents (true airborne transmission), while larger particles, above about 5 micrometres, settle quickly onto surfaces and mucosae and are instead spread by direct/indirect contact and by short-range droplet spray rather than by sustained airborne carriage.

## explicit_objective
State that particles larger than 5 micrometres transmit by contact and droplet routes rather than by true airborne spread, which is reserved for droplet nuclei under 5 micrometres.

## pitfalls
Assuming any airborne particle counts as "airborne transmission" regardless of size — the distinction the department tests is specifically the under-5-micrometre threshold for true airborne spread.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T05

## secondary_node_ids


## topic
General microbiology

## subtopic
Modes of transmission

## microtopic
Particle-size classification of respiratory spread

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.75

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids
CLM-INF-B9536C79237DE1

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q5: Air particles contain pathogens larger than 5 um is transmitted by: / C and D. (Contact and Droplet)

## exam_signal
mu_56d88740af5ca3011894 | paper | | p2 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
The printed key selects "Contact and Droplet" (both) over "Droplet" alone for particles above 5 micrometres; recorded as printed, per rule 1.

## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "airborne transmission" and "droplet nuclei" — no candidate record exists.

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

---

# Item

## label
Streptococcus pyogenes is a Gram-positive coccus that characteristically grows in chains

## id
CON-INF-25B9700AF65EE5

## canonical_key
streptococcus.morphology.chain-arrangement

## aliases
Streptococcal chain arrangement
Strep pyogenes morphology

## arabic_label


## arabic_aliases


## definition
Streptococci divide along a single plane and remain attached end to end after division, producing the chain arrangement that gives the genus its name (from the Greek for "twisted chain"); this distinguishes them from staphylococci, which divide in irregular planes and cluster like grapes.

## explicit_objective
Identify Streptococcus pyogenes as a Gram-positive coccus arranged in chains, distinguishing this arrangement from the staphylococcal cluster pattern.

## pitfalls
Confusing the chain arrangement (streptococci) with the grape-like cluster arrangement (staphylococci) — both are Gram-positive cocci but divide, and therefore arrange, differently.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
Bacteriology

## subtopic
Gram-positive cocci

## microtopic
Streptococcal morphology and arrangement

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-INF-25B9700AF65EE5

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q11: Which of the following is Gram positive cocci arranged in Chains? / Strept.pyogenes.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p4 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "streptococcus chains" and "bacterial arrangement chains" — no candidate record exists.

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

---

# Item

## label
Bacterial spores let the organism survive depletion of nutrients, heat and dryness by entering a dormant, highly resistant state

## id
CON-INF-EE36D7C199E6D8

## canonical_key
bacteria.spore.survival-function

## aliases
Bacterial spore function
Endospore survival function

## arabic_label


## arabic_aliases


## definition
Certain Gram-positive genera (Bacillus, Clostridium) respond to adverse conditions, nutrient depletion, extreme heat or dryness, by forming a dormant endospore: a metabolically inactive, dehydrated structure with a thick, resistant coat that lets the organism survive conditions the vegetative cell could not, and germinate back into a vegetative cell once conditions improve. Spore formation is a survival strategy, not a reproductive one (one cell forms one spore, not two).

## explicit_objective
State that the function of the bacterial spore is to let the organism survive depletion of nutrients, heat and dryness, and reject spore formation as a reproductive mechanism.

## pitfalls
Treating sporulation as bacterial reproduction — a single vegetative cell forms a single spore, so spore numbers do not increase the population; its role is survival, not multiplication.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
General bacteriology

## subtopic
Bacterial spores

## microtopic
Spore survival function

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-INF-EE36D7C199E6D8

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q12: Which one of the following is a function of bacterial Spores? / Help bacteria to live if depletion of nutrient-heat-dryness

## exam_signal
mu_56d88740af5ca3011894 | paper | | p5 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "bacterial spore" and "endospore function" — 5 hits, all about spore boiling/autoclave resistance properties (docs/Assiut-Source-Imports), a different grain (resistance to a specific killing method vs the general survival-trigger function tested here); no direct candidate, not merged.

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

---

# Item

## label
Cell wall M protein divides Streptococcus pyogenes into more than 150 serologic (M) types

## id
CON-INF-FFBDF62FF38084

## canonical_key
streptococcus.m-protein.serotyping

## aliases
Streptococcal M protein serotyping
M protein

## arabic_label


## arabic_aliases


## definition
M protein is a fibrillar cell-wall-anchored protein of Streptococcus pyogenes that projects from the surface, is antiphagocytic, and is antigenically highly variable; more than 150 distinct M serotypes are recognised, and it is this protein's antigenic variation, not the streptococcal capsule or a cell-membrane protein, that forms the basis of M serotyping.

## explicit_objective
Identify cell wall M protein as the structure that divides Streptococcus pyogenes into more than 150 serologic types.

## pitfalls
Confusing M protein with staphylococcal Protein A, or placing it in the cell membrane rather than anchored in the cell wall.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
Bacteriology

## subtopic
Streptococcus pyogenes virulence factors

## microtopic
M protein and serotyping

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-INF-FFBDF62FF38084

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q17: The structure that divides Strept. Pyogenes into 150 serologic types is: / Cell wall M protein.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p6 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "M protein streptococcus" and "streptococcal serotypes" — no candidate record exists.

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

---

# Item

## label
This exam's own printed key names Group A streptococci as a cause of infective endocarditis, on a bare stem without a dental-procedure vignette

## id
CON-INF-506BBBAF1DD8DC

## canonical_key
teaching.mu-med102.f2end43.q19-infective-endocarditis-organism

## aliases
Infective endocarditis causative organism (this exam's key)

## arabic_label


## arabic_aliases


## definition
Among Clostridium perfringens, E. coli, Group A streptococci, Neisseria gonorrhoeae and Staph. epidermidis, this exam's printed grey-highlight key marks Group A streptococci as the cause of infective endocarditis. Classic teaching more often names Streptococcus viridans (subacute, following a dental procedure) or Staphylococcus aureus (acute); this record teaches the fact as this paper's own key states it, since the stem here carries no dental-procedure context that would specifically cue viridans, and the other four listed organisms are not typically associated with endocarditis at all.

## explicit_objective
State that, among this item's five options, Group A streptococci is the one this exam's own key credits as a cause of infective endocarditis.

## pitfalls
Assuming any Streptococcus option must mean S. viridans because that is the more commonly taught endocarditis organism — this specific stem and key name Group A streptococci instead.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
Bacteriology

## subtopic
Infective endocarditis, causative organisms

## microtopic
Group A streptococci and infective endocarditis (this exam's key)

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.3

## confidence
0.5

## atomic_claim_ids
CLM-INF-506BBBAF1DD8DC

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q19: Infective endocarditis caused by: / Group A streptococci.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p6 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-INF-... (ASU-INF Strep. viridans/dental-procedure endocarditis concept, exact id not re-quoted here) — rejected: that concept teaches viridans following a dental procedure, a different fact from this bare stem's own printed Group A streptococci key; reusing it would teach a fact this question does not test and would contradict the printed key.

## conflicts
This exam's printed key (Group A streptococci) differs from the more classically taught infective-endocarditis organisms (S. viridans subacute, S. aureus acute). Printed key stands as printed, per rule 1; the discrepancy is recorded here rather than silently resolved either way.

## uncertainty
Whether the department intended a different, more classically-taught organism is not recoverable from the source; the grey highlight on Group A streptococci is unambiguous and consistent with the document's convention on every other sampled item.

## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "infective endocarditis" — one close pending hit, docs/Ain-Shams-Source-Imports/concept/ASU-INF-microbiology-concepts.md's Strep. viridans / dental-procedure concept; rejected as a different grain, not merged (see rejected_merge_candidate_ids).

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

---

# Item

## label
Staphylococcal scalded skin syndrome is caused by exfoliative toxins that split the epidermis

## id
CON-INF-EB6B1168E11BC9

## canonical_key
staphylococcus.toxins.exfoliative-scalded-skin-syndrome

## aliases
Exfoliative toxin
SSSS

## arabic_label


## arabic_aliases


## definition
Staphylococcal scalded skin syndrome (SSSS) is produced by exfoliative (epidermolytic) toxins, serine proteases some Staphylococcus aureus strains secrete that cleave desmoglein-1 within the epidermis, causing widespread superficial blistering and skin peeling that resembles a scald; this is distinct from the enterotoxins (food poisoning), toxic shock syndrome toxin (toxic shock syndrome) and pyrogenic exotoxins (streptococcal, not staphylococcal) that can be confused with it.

## explicit_objective
State that staphylococcal scalded skin syndrome is caused by exfoliative toxins, and distinguish this from enterotoxin, toxic shock syndrome toxin and pyrogenic exotoxin.

## pitfalls
Attributing SSSS to enterotoxins or toxic shock syndrome toxin because all three are named S. aureus toxins — only the exfoliative toxins target desmoglein-1 and produce the scalded-skin blistering picture.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
Bacteriology

## subtopic
Staphylococcus aureus toxins

## microtopic
Exfoliative toxin and scalded skin syndrome

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-INF-EB6B1168E11BC9

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q20: Staphylococcal scalded skin syndrome (SSSS) is caused by: / Exfoliative toxins.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p6 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "exfoliative toxin" and "scalded skin" — no candidate record exists.

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

---

# Item

## label
The Gram-negative outer membrane has a bilayer structure

## id
CON-INF-0C3EC427B1C4CA

## canonical_key
gram-negative.outer-membrane.bilayer-structure

## aliases
Outer membrane bilayer

## arabic_label


## arabic_aliases


## definition
The Gram-negative outer membrane is a lipid bilayer, phospholipid on its inner leaflet and lipopolysaccharide on its outer leaflet, studded with porins; it is present only in Gram-negative bacteria (Gram-positive bacteria have no outer membrane), is not itself the site of connection to the inner (cytoplasmic) membrane, and is a two-layer, not a three-layer, structure.

## explicit_objective
State that the Gram-negative outer membrane is a bilayer, present only in Gram-negative bacteria.

## pitfalls
Assuming the outer membrane is present in Gram-positive bacteria too, or describing it as a three-layer rather than a two-layer (bilayer) structure.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
General bacteriology

## subtopic
Gram-negative cell envelope

## microtopic
Outer membrane structure

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.85

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids
CLM-INF-0C3EC427B1C4CA

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q37: Which of the following is TRUE regarding cell wall outer membrane? / Bilayer structure.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p12-13 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-INF-BF26D7E563FB78 (Ain-Shams, outer membrane "isn't true" item on lipid A toxicity / porin permeability / osmotic protection) — related but distinct grain: that record teaches which of four other outer-membrane statements is false, not the bilayer-structure fact this item tests.

## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "outer membrane bilayer" — no exact candidate; a related-but-distinct-grain hit (CON-INF-BF26D7E563FB78, Ain-Shams, an "isn't true" item about lipid A/porins/osmotic protection) was found and reviewed, but it does not state the bilayer-structure fact this item tests, so it was not merged.

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

---

# Item

## label
Isoprenaline is a synthetic non-selective beta agonist, acting on both beta1 and beta2 adrenoceptors

## id
CON-FND-DF4B7C94742F1A

## canonical_key
teaching.pharma.isoprenaline.beta1-beta2-nonselective-agonist

## aliases
Isoprenaline receptor selectivity
Isoproterenol receptors

## arabic_label


## arabic_aliases


## definition
Isoprenaline (isoproterenol) is a synthetic catecholamine and non-selective beta agonist: it stimulates both beta1 receptors (increasing heart rate and contractility) and beta2 receptors (bronchodilation and vasodilation) with essentially no alpha activity, unlike adrenaline (alpha, beta1 and beta2) or a cardioselective beta1 agonist such as dobutamine.

## explicit_objective
State that isoprenaline acts on both beta1 and beta2 receptors, with no significant alpha activity.

## pitfalls
Assuming isoprenaline shares adrenaline's alpha activity, or that it is beta1-selective like dobutamine — its defining feature is non-selective beta1-plus-beta2 stimulation with no alpha effect.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id
DIS-PHA-T03

## secondary_node_ids


## topic
Autonomic pharmacology

## subtopic
Sympathomimetics

## microtopic
Isoprenaline receptor selectivity

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Pharmacology

## article_ids
ART-MU102-PHARMACOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-DF4B7C94742F1A

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q32: Which receptor/s does isoprenaline act on? / Beta1 and beta2.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p11 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "isoprenaline" and "isoproterenol" — no candidate record naming isoprenaline's own receptor selectivity exists (nearby hits concern isoproterenol's inotropic/chronotropic strength versus dobutamine, a different grain).

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

---

# Item

## label
Indirect-acting cholinomimetic agents work by inhibiting the hydrolysis of endogenous acetylcholine

## id
CON-FND-B7E5D36F4C7F65

## canonical_key
teaching.pharma.cholinomimetics.indirect-acting-mechanism

## aliases
Indirect-acting cholinomimetic mechanism
Anticholinesterase mechanism

## arabic_label


## arabic_aliases


## definition
Indirect-acting cholinomimetic agents (anticholinesterases such as neostigmine, physostigmine and pyridostigmine) do not bind cholinergic receptors themselves; instead they inhibit acetylcholinesterase, the enzyme that normally hydrolyses acetylcholine at the synapse, so endogenous acetylcholine accumulates and its own action is potentiated at both muscarinic and nicotinic receptors. This is the opposite mechanism from a direct-acting agonist (such as pilocarpine or carbachol), which binds and activates the receptor itself.

## explicit_objective
State that the mechanism of indirect-acting cholinomimetics is inhibition of acetylcholine hydrolysis, not direct receptor binding.

## pitfalls
Describing an indirect-acting cholinomimetic as binding and activating the receptor directly — that description fits a direct-acting agonist; the indirect-acting class works one step upstream, by sparing endogenous acetylcholine from breakdown.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id
DIS-PHA-T03

## secondary_node_ids


## topic
Autonomic pharmacology

## subtopic
Cholinergic agonists and anticholinesterases

## microtopic
Indirect-acting cholinomimetic mechanism

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Pharmacology

## article_ids
ART-MU102-PHARMACOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-B7E5D36F4C7F65

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q34: The mechanism of action of indirect-acting cholinomimetic agents is: / Inhibition of the hydrolysis of endogenous acetylcholine.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p11-12 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-FND-7044CBD216CDEC (Assiut AUN-MPT-104, direct-vs-indirect-acting cholinomimetic overdose profile) — related but distinct grain: that record teaches the overdose/effect-profile comparison between a direct agonist and an anticholinesterase, not the basic mechanism-of-action fact (inhibits ACh hydrolysis) this item tests.

## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "indirect-acting cholinomimetic" — one related-but-distinct-grain hit (CON-FND-7044CBD216CDEC, Assiut, direct-vs-indirect-acting overdose profile), reviewed and rejected as a different grain (overdose comparison, not this basic mechanism-of-action fact); not merged.

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

---

# Item

## label
Atropine competitively blocks the excessive muscarinic stimulation produced by pilocarpine and choline esters

## id
CON-FND-FDD199F2E20756

## canonical_key
teaching.pharma.atropine.competitive-muscarinic-block

## aliases
Atropine competitive antagonism
Muscarinic blockade by atropine

## arabic_label


## arabic_aliases


## definition
Atropine is a competitive (surmountable) antagonist at muscarinic acetylcholine receptors: it occupies the same receptor site as acetylcholine, choline esters (such as pilocarpine or carbachol) and the acetylcholine accumulated by an anticholinesterase, blocking their muscarinic effects without altering the receptor itself, so a sufficiently high concentration of the agonist can still displace it.

## explicit_objective
State that atropine blocks excessive muscarinic receptor stimulation competitively, at the same receptor site as the agonist it is opposing.

## pitfalls
Describing atropine's antagonism as non-competitive or irreversible — atropine is the classic example of a competitive, surmountable muscarinic antagonist.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id
DIS-PHA-T03

## secondary_node_ids


## topic
Autonomic pharmacology

## subtopic
Muscarinic antagonists

## microtopic
Atropine, competitive muscarinic blockade

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Pharmacology

## article_ids
ART-MU102-PHARMACOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-FDD199F2E20756

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q36: The excessive stimulation of muscarinic receptors by pilocarpine and choline esters is blocked competitively by: / Atropine.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p12 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-FND-208INT-ATROPINE-CONTRAINDICATIONS-01-style record (Kasr 208-INT, atropine contraindicated in glaucoma) and the hyoscine-vs-atropine CNS-effects record — both related but distinct grain: they teach atropine's contraindications and its CNS profile respectively, not the basic competitive-antagonism-at-the-muscarinic-receptor fact this item tests.

## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "atropine muscarinic" — two related-but-distinct-grain hits in Kasr 208-INT (atropine's glaucoma contraindication; atropine/hyoscine CNS comparison) reviewed and rejected, neither states this basic competitive-antagonism fact directly.

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

---

# Item

## label
Wound healing by secondary intention occurs across a wide gap and relies on a larger amount of granulation tissue

## id
CON-FND-0D83C53F78CA3C

## canonical_key
wound-healing.secondary-intention.wide-gap

## aliases
Secondary intention wound healing
Healing by second intention

## arabic_label


## arabic_aliases


## definition
Healing by secondary intention occurs when a wound's edges cannot be closely apposed, a wide gap, an infected or contaminated wound, or significant tissue loss, so the defect must be filled by a larger volume of granulation tissue before epithelialisation and wound contraction can close it; this takes longer than healing by primary (first) intention, which applies to a clean, closely apposed surgical incision with minimal granulation tissue and a shorter healing time.

## explicit_objective
State that secondary intention healing is characterised by a wide gap and a larger amount of granulation tissue, distinguishing it from primary intention's clean, closely apposed, faster-healing incision.

## pitfalls
Assigning "clean wound," "surgical incision" or "short healing time" to secondary intention — those features belong to primary (first) intention, the opposite scenario.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T02

## secondary_node_ids


## topic
General pathology

## subtopic
Tissue repair and wound healing

## microtopic
Primary vs secondary intention healing

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Pathology

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.45

## academic_relevance
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-0D83C53F78CA3C

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q41: In wound healing by secondary intention: / Wide gab (gap).

## exam_signal
mu_56d88740af5ca3011894 | paper | | p14 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "wound healing secondary intention" and "secondary intention" — no candidate record exists.

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

---

# Item

## label
Liver cells are classified as stable cells by their power of regeneration

## id
CON-FND-7BC44955AF041F

## canonical_key
cell-regeneration.stable-cells.liver

## aliases
Stable cell classification
Liver regenerative capacity

## arabic_label


## arabic_aliases


## definition
Cells are classified by their regenerative capacity into labile cells (continuously dividing, such as epidermis and gut epithelium), stable cells (normally quiescent in G0 but retaining the capacity to re-enter the cell cycle and divide when stimulated, such as hepatocytes, renal tubular cells and other glandular epithelium) and permanent cells (unable to divide after maturity, such as neurons and cardiac myocytes). Liver cells are the classic example of stable cells: quiescent under normal conditions, but able to mount a substantial regenerative response after injury or partial hepatectomy.

## explicit_objective
State that liver cells are classified as stable cells, quiescent but able to regenerate when stimulated, distinguishing them from continuously-dividing labile cells and non-dividing permanent cells.

## pitfalls
Classifying liver cells as labile (continuously dividing, like epidermis) or permanent (never dividing, like neurons) — hepatocytes are the standard teaching example of the intermediate stable-cell category.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T01

## secondary_node_ids


## topic
General pathology

## subtopic
Cell growth and regeneration

## microtopic
Labile, stable and permanent cells

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Pathology

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-7BC44955AF041F

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q42: Liver cells are classified according to the power of regeneration as: / Stable cells.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p14 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "stable cells" and "labile permanent cells" — no candidate record exists.

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

---

# Item

## label
Fibrous tissue formation during healing includes a remodeling step that matures the scar

## id
CON-FND-4D9DF7817CA715

## canonical_key
wound-healing.fibrous-tissue-formation.remodeling-step

## aliases
Scar remodeling
Fibrous tissue formation steps

## arabic_label


## arabic_aliases


## definition
Fibrous (scar) tissue formation follows an ordered sequence: haemostasis and blood clot formation, an inflammatory phase that clears debris and recruits fibroblasts, granulation tissue formation with new collagen and capillaries, and finally remodeling, in which type III collagen is progressively replaced by stronger type I collagen, collagen fibres reorganise along lines of tension, and the scar's tensile strength increases over weeks to months even as its cellularity and vascularity decline. Necrosis and ulceration are not steps of scar formation; they are tissue-damage processes that can precede or complicate it.

## explicit_objective
Name remodeling as the maturation step of fibrous tissue formation, in which collagen type switches and reorganises to increase the scar's tensile strength.

## pitfalls
Listing necrosis or ulceration as steps of fibrous tissue formation — both are damage processes, not part of the repair sequence itself.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T02

## secondary_node_ids


## topic
General pathology

## subtopic
Tissue repair and wound healing

## microtopic
Fibrous tissue formation and remodeling

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Pathology

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-4D9DF7817CA715

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q43: Steps of fibrous tissue formation include: / Remodeling.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p14 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "fibrous tissue formation" and "scar remodeling" — no candidate record exists.

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

---

# Item

## label
The signet ring appearance of gastric carcinoma cells is caused by intracytoplasmic mucin deposition

## id
CON-FND-0BC970168E2067

## canonical_key
gastric-carcinoma.signet-ring.mucin-deposition

## aliases
Signet ring cell, gastric carcinoma
Mucin-filled signet ring cells

## arabic_label


## arabic_aliases


## definition
In signet ring cell carcinoma of the stomach, individual malignant cells accumulate a large intracytoplasmic mucin vacuole that pushes the nucleus to the cell's periphery, flattening and crescent-shaping it against the membrane, producing the ring-with-a-stone (signet ring) appearance on histology; this is a different fact from the same descriptive term applied to a lipid-filled adipocyte, where the deposited material is fat rather than mucin.

## explicit_objective
State that the gastric carcinoma signet ring appearance is caused by intracytoplasmic mucin, not amyloid, calcium, lipid or uric acid.

## pitfalls
Confusing the gastric-carcinoma signet ring cell (mucin-filled) with the histologically similar-looking but mechanistically distinct signet ring appearance of a fat-laden adipocyte (lipid-filled) — the deposited substance differs by tissue context.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Neoplasia, tumour morphology

## microtopic
Signet ring cell carcinoma

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Pathology

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-0BC970168E2067

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q44: Signet ring appearance in gastric carcinoma is due to deposition of: / Mucin

## exam_signal
mu_56d88740af5ca3011894 | paper | | p15 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-FND (108-INT / 101-ISK) signet-ring/adipocyte concept — related but distinct grain: teaches the fat-laden-adipocyte signet ring appearance (lipid), not the gastric-carcinoma mucin-filled fact this item tests.

## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "signet ring" — found a related-but-distinct-grain hit (108-INT-concepts-pathology.md / 101-ISK-mcq-concepts.md's "signet ring appearance" concept), reviewed and rejected: that record describes a fat-laden (lipid-filled) adipocyte's signet ring appearance, not the gastric-carcinoma mucin-filled fact this item tests.

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

---

# Item

## label
Gouty arthritis with a raised uric acid level reflects an underlying purine metabolism disorder

## id
CON-FND-ADC317DFBD2A44

## canonical_key
gout.mechanism.purine-metabolism-disorder

## aliases
Gout and purine metabolism
Hyperuricaemia mechanism

## arabic_label


## arabic_aliases


## definition
Gout results from a disorder of purine metabolism: overproduction or underexcretion of purines raises serum uric acid (hyperuricaemia), and monosodium urate crystals precipitate in and around joints, provoking the acute inflamed, swollen joint of gouty arthritis and, over time, tophus formation; this is distinct from calcium, phosphate or pyrimidine metabolism disorders, which do not raise uric acid or produce urate crystal deposition.

## explicit_objective
State that gout with a raised uric acid level reflects a purine metabolism disorder, not a calcium, phosphate or pyrimidine metabolism disorder.

## pitfalls
Attributing hyperuricaemia and gout to calcium or phosphate metabolism because the vignette describes a joint and bone-adjacent finding — the underlying derangement is specifically purine metabolism, which is what raises uric acid.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
General pathology

## subtopic
Metabolic disorders

## microtopic
Gout and purine metabolism

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Pathology

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.55

## academic_relevance
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-ADC317DFBD2A44

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q45: Male patient 50 years presented with inflamed and swollen joint... Uric acid level is above the normal range. What is the underlying mechanism explaining the above condition? / Purine metabolism disorders.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p15 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "gout purine metabolism" and "hyperuricaemia" — no candidate record exists.

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

---

# Item

## label
Hemochromatosis is a disorder of iron metabolism

## id
CON-FND-2A766D1E1E1873

## canonical_key
hemochromatosis.mechanism.iron-overload

## aliases
Hemochromatosis
Iron overload disorder

## arabic_label


## arabic_aliases


## definition
Hemochromatosis is a disorder of iron metabolism in which excessive iron absorption (primary/hereditary hemochromatosis) or excessive iron intake (secondary, transfusion-related) leads to iron deposition, largely as haemosiderin, in the liver, pancreas, heart, joints and skin, producing organ damage over time; the underlying element is iron, not calcium, hematin, haemosidrin (the storage form iron is deposited as, not the disorder's own element) or melanin.

## explicit_objective
State that hemochromatosis is a disorder of iron metabolism, and distinguish iron as the element from haemosidrin as merely its storage form.

## pitfalls
Naming haemosidrin as the disorder's substance rather than iron — haemosidrin is the storage pigment the excess iron is deposited as, not the metabolic element the disorder is classified by.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T07

## secondary_node_ids


## topic
General pathology

## subtopic
Metabolic disorders

## microtopic
Hemochromatosis and iron overload

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Pathology

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.45

## academic_relevance
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-2A766D1E1E1873

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q46: Hemochromatosis is a disorder in: / Iron.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p15-16 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "hemochromatosis" — two glossary-only hits (108-INT-glossary.md's "Primary hemochromatosis" term), no full concept record to overlay onto; new concept minted.

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

---

# Item

## label
Staphylococci have no causal relationship to cellulitis, which is classically a streptococcal infection

## id
CON-FND-AED00ED35FC2CB

## canonical_key
staphylococcus.skin-infections.no-cellulitis-link

## aliases
Staphylococcal skin infections vs cellulitis
Cellulitis causative organism

## arabic_label


## arabic_aliases


## definition
Staphylococcus aureus is the classic cause of localised, walled-off pyogenic skin infections, an abscess, a boil (furuncle), a carbuncle (a coalescence of adjoining furuncles), but cellulitis, a diffuse, spreading, poorly demarcated infection of the dermis and subcutaneous tissue, is classically attributed to Streptococcus pyogenes (Group A strep) instead, whose spreading-factor enzymes (hyaluronidase, streptokinase, streptodornase) favour diffuse tissue invasion rather than the localised, abscess-forming pattern staphylococci produce.

## explicit_objective
State that staphylococci are not causally linked to cellulitis, which is instead the classic streptococcal skin infection, distinguishing it from the localised staphylococcal pattern (abscess, boil, carbuncle, furuncle).

## pitfalls
Grouping cellulitis with the other four staphylococcal skin infections listed here because all five are skin infections — cellulitis specifically breaks the pattern, since it is streptococcal, not staphylococcal.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAT-T02

## secondary_node_ids


## topic
Bacteriology

## subtopic
Staphylococcal and streptococcal skin infections

## microtopic
Cellulitis, causative organism

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Pathology

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.7

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids
CLM-FND-AED00ED35FC2CB

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q47: Staphylococci have no causal relationship to one of the followings: / Cellulitis.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p16 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "cellulitis" and "staphylococcal skin infections" — no candidate record naming this specific staph-vs-cellulitis distinction exists.

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

---

# Item

## label
Acute severe hemorrhage produces compensatory hyperplasia of the bone marrow

## id
CON-FND-D66AACEF20D459

## canonical_key
bone-marrow.compensatory-hyperplasia.acute-hemorrhage

## aliases
Compensatory hyperplasia, bone marrow
Bone marrow response to hemorrhage

## arabic_label


## arabic_aliases


## definition
After acute, significant blood loss, the bone marrow responds with compensatory hyperplasia: erythropoietin drives an increase in the number of haematopoietic (chiefly erythroid) precursor cells to replace the lost red cell mass, a physiological, reversible adaptive growth response, distinct from atrophy (a decrease in cell size or number), aging atrophy, or irritation hyperplasia (a response to chronic physical or chemical irritation rather than to blood loss).

## explicit_objective
State that acute hemorrhage produces compensatory hyperplasia of the bone marrow, distinguishing it from atrophy and from irritation hyperplasia's different trigger.

## pitfalls
Selecting "compensatory atrophy" because the word "compensatory" appears in both this and the correct answer — hemorrhage triggers an increase (hyperplasia), not a decrease (atrophy), in marrow cellularity.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T01

## secondary_node_ids


## topic
General pathology

## subtopic
Cell growth adaptations

## microtopic
Compensatory hyperplasia

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Pathology

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-D66AACEF20D459

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q48: A 20 years old male had an accident a week ago. He suffered severe hemorrhage... What is the characteristic finding in his bone marrow? / Compensatory hyperplasia.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p16 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "compensatory hyperplasia" — no candidate record exists.

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

---
# Item

## label
50% of the Gram-positive bacterial cell wall is formed of peptidoglycan

## id
CON-INF-B8A4A58D6E2563

## canonical_key
gram-positive.cell-wall.peptidoglycan-fifty-percent

## aliases
Gram-positive cell wall composition
Peptidoglycan proportion, Gram-positive wall

## arabic_label


## arabic_aliases


## definition
The Gram-positive cell wall is a thick, multilayered peptidoglycan sheet interspersed with teichoic and lipoteichoic acid; peptidoglycan alone accounts for roughly half the wall's mass, with teichoic acid contributing most of the remainder, so peptidoglycan and teichoic acid together, not peptidoglycan alone, would overstate the peptidoglycan-specific fraction this item asks for.

## explicit_objective
State that peptidoglycan alone, not peptidoglycan plus teichoic acid together, accounts for about 50% of the Gram-positive cell wall.

## pitfalls
Selecting "peptidoglycan and teichoic acid" because that combination sounds more complete — the item specifically asks what the 50% figure refers to, which is peptidoglycan alone; teichoic acid is a separate, additional component.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
General bacteriology

## subtopic
Gram-positive cell envelope

## microtopic
Peptidoglycan proportion of the cell wall

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.15

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids
CLM-INF-B8A4A58D6E2563

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q2: 50% of cell wall of Gram positive bacteria is formed of: / Peptidoglycan.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p1 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-INF-3FBC905C4F778F (Ain-Shams, peptidoglycan structural rigidity) — related but distinct grain: teaches peptidoglycan's rigidity function, not the compositional-percentage fact this item tests.

## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "peptidoglycan gram positive cell wall" and "peptidoglycan" — the closest hit, CON-INF-3FBC905C4F778F (Ain-Shams, "peptidoglycan gives the bacterial cell wall its structural rigidity"), was reviewed and rejected as a different grain: that record teaches peptidoglycan's structural/rigidity function, not the compositional-percentage fact this item tests.

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

---

# Item

## label
The log (exponential) phase is the phase of rapid bacterial growth in the bacterial growth curve

## id
CON-INF-BE784719690987

## canonical_key
bacterial-growth-curve.log-phase.rapid-growth

## aliases
Log phase
Exponential phase, rapid growth

## arabic_label


## arabic_aliases


## definition
The bacterial growth curve has four phases: lag (adaptation, no division), log/exponential (rapid, regular doubling at the maximal rate the medium and conditions allow), stationary (growth rate equals death rate, population plateaus) and decline/death (nutrient depletion and toxic waste accumulation outpace division). The log phase is specifically the phase of rapid growth, and it is also when bacteria are most metabolically active and most susceptible to antibiotics that target active cell-wall synthesis or division.

## explicit_objective
Name the log (exponential) phase as the phase of rapid bacterial growth, distinguishing it from lag, stationary and decline.

## pitfalls
Confusing the log phase with the stationary phase because the stationary phase has the largest population size — rapid growth (rate) and largest population (size) are different properties, and only the log phase is defined by rapid growth.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
General bacteriology

## subtopic
Bacterial growth curve

## microtopic
Log (exponential) phase

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.25

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-INF-BE784719690987

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q4: In bacterial growth curve the phase of rapid growth is known as: / Log phase.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p1-2 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-INF (Ain-Shams ASU-INF, lag-vs-stationary phase distinction) — related but distinct grain: teaches the lag/stationary contrast, not the log-phase-is-rapid-growth fact this item tests.

## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "log phase", "bacterial growth curve" and "exponential phase" — the closest hits (Ain-Shams ASU-INF "Bacterial growth curve phases", canonical_key naming the lag-vs-stationary distinction; Assiut AUN-INI-105 growth-curve/disease-stage correlation) were reviewed and rejected: neither states the log-phase-is-rapid-growth fact this item tests, and one of Ain-Shams's own field_notes flags a log-phase concept as "not authored this pass — OWED".

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

---

# Item

## label
Bacillus anthracis is characterized by a capsule formed of protein, not polysaccharide

## id
CON-INF-E95FCFF86890D5

## canonical_key
bacillus-anthracis.capsule.protein-exception

## aliases
Anthrax capsule composition
Poly-D-glutamic acid capsule

## arabic_label


## arabic_aliases


## definition
Most bacterial capsules are polysaccharide, but Bacillus anthracis is the classic teaching exception: its capsule is made of poly-D-glutamic acid, a protein (polypeptide) capsule, which is antiphagocytic like other capsules but antigenically and structurally distinct from the usual polysaccharide type; B. anthracis also has a comparatively thick peptidoglycan layer as a Gram-positive rod, not an outer membrane, and does not itself cause septic shock as its defining feature.

## explicit_objective
State that Bacillus anthracis has a protein (poly-D-glutamic acid) capsule, the classic exception to the usual polysaccharide bacterial capsule.

## pitfalls
Assuming every bacterial capsule is polysaccharide by default and missing B. anthracis as the named exception — this is one of the most commonly tested "exception" facts in introductory bacteriology.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
Bacteriology

## subtopic
Bacillus anthracis

## microtopic
Anthrax capsule composition (protein exception)

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.8

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-INF-E95FCFF86890D5

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q6: Bacillus anthrax bacteria is characterized by: / Capsule formed of protein.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p2 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "anthrax capsule protein" and "polypeptide capsule" — one related question title (Assiut AUN-INI-105, pending-live, "Bacillus anthracis: the polypeptide-capsule exception") was found but is itself an unimported question record with no standalone concept behind it that could be safely reused; new concept minted rather than pointing at an unresolved question-level title.

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

---

# Item

## label
Cephalosporins are beta-lactam antibiotics that act on the bacterial cell wall

## id
CON-FND-AD9C85CB5FBDAC

## canonical_key
teaching.pharma.cephalosporin.cell-wall-action

## aliases
Cephalosporin mechanism
Beta-lactam cell wall antibiotics

## arabic_label


## arabic_aliases


## definition
Cephalosporins are beta-lactam antibiotics that inhibit bacterial cell wall synthesis: they bind penicillin-binding proteins and block the transpeptidation (cross-linking) step of peptidoglycan assembly, causing the wall to weaken and the cell to lyse under its own osmotic pressure, the same general target as penicillins; this is distinct from aminoglycosides and ciprofloxacin, which act on the ribosome and DNA gyrase respectively, not the cell wall.

## explicit_objective
State that cephalosporin is the antibiotic among aminoglycoside, cephalosporin and ciprofloxacin that acts on the bacterial cell wall.

## pitfalls
Selecting aminoglycoside because it is also a well-known antibiotic class — aminoglycosides act on the 30S ribosomal subunit (protein synthesis), not the cell wall; only cephalosporin, among these options, is a cell-wall-active beta-lactam.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id
DIS-PHA-T05

## secondary_node_ids


## topic
Antimicrobial pharmacology

## subtopic
Beta-lactam antibiotics

## microtopic
Cephalosporin mechanism of action

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Microbiology

## article_ids
ART-MU102-PHARMACOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.75

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-FND-AD9C85CB5FBDAC

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q9: The antibiotic acting on bacterial cell wall is: / Cephalosporin.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p3 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "cephalosporin cell wall" and "beta-lactam cell wall synthesis" — no candidate record exists.

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

---

# Item

## label
Flagella are the bacterial organ of motility

## id
CON-INF-B029433C542C5D

## canonical_key
bacteria.flagella.organ-of-motility

## aliases
Bacterial flagella function
Organ of motility

## arabic_label


## arabic_aliases


## definition
Flagella are long, whip-like protein filaments, rotated by a basal-body motor embedded in the cytoplasmic membrane and cell wall, that propel a bacterium through liquid; they are the organ of bacterial motility, distinct from pili (adherence and gene transfer), the outer membrane (a structural/permeability barrier), the cytoplasmic membrane (transport and energy generation) and peptidoglycan (structural rigidity), none of which drive movement.

## explicit_objective
State that flagella are the organ of bacterial motility, among cytoplasmic membrane, outer membrane, peptidoglycan and ribosomes.

## pitfalls
Confusing flagella with pili because both are surface appendages — pili mediate adherence and gene transfer, flagella alone drive motility.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
General bacteriology

## subtopic
Bacterial motility structures

## microtopic
Flagella, organ of motility

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.15

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-INF-B029433C542C5D

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q10: Which ONE of the following is the organ of motility of bacteria? / Flagellae.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p3 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "flagella motility" and "organ of motility" — a matching question title turned up in an Assiut pending-live question file (AUN-INI-105-ch1-asuinf-questions.md, "Flagella are the organ of motility") whose own main_concept id does not resolve to any standalone concept record in the corpus (a dangling reference in an unimported draft question); reusing an unresolved id would risk citing nothing, so a new concept was minted instead.

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

---

# Item

## label
Adrenaline is the drug of choice for anaphylactic shock

## id
CON-FND-0F488742F83AFF

## canonical_key
teaching.pharma.adrenaline.anaphylaxis-drug-of-choice

## aliases
Adrenaline in anaphylaxis
Epinephrine, drug of choice for anaphylaxis

## arabic_label


## arabic_aliases


## definition
Adrenaline (epinephrine) is the first-line drug of choice for anaphylactic shock: its alpha1 action reverses vasodilation and reduces mucosal oedema, its beta2 action bronchodilates and stabilises mast cells to limit further mediator release, and its beta1 action supports cardiac output, addressing the airway, breathing and circulatory collapse of anaphylaxis simultaneously, unlike a pure beta agonist (terbutaline, isoprenaline), a pure alpha agonist (phenylephrine) or a beta2-selective tocolytic (ritodrine), none of which cover this full combination.

## explicit_objective
State that adrenaline, not terbutaline, phenylephrine, ritodrine or isoprenaline, is the drug of choice for anaphylactic shock.

## pitfalls
Selecting isoprenaline because it is also a non-selective beta agonist — isoprenaline lacks adrenaline's alpha1 action, so it does not reverse the vasodilation and hypotension that make anaphylaxis life-threatening.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id
DIS-PHA-T03

## secondary_node_ids


## topic
Autonomic pharmacology

## subtopic
Sympathomimetics, clinical use

## microtopic
Adrenaline, drug of choice for anaphylactic shock

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Pharmacology

## article_ids
ART-MU102-PHARMACOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.7

## weight_confidence
0.4

## confidence
0.9

## atomic_claim_ids
CLM-FND-0F488742F83AFF

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q29: Which of the following drugs is the drug of choice for anaphylactic shock? / Adrenaline.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p10 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "anaphylaxis adrenaline" — no candidate record exists.

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

---

# Item

## label
IV infusion of dopamine is used to treat hemorrhagic shock

## id
CON-FND-F7B8759D2FC67A

## canonical_key
teaching.pharma.dopamine.hemorrhagic-shock-infusion

## aliases
Dopamine in shock
Dopamine IV infusion, clinical use

## arabic_label


## arabic_aliases


## definition
Dopamine, given as a titrated IV infusion, is used to support blood pressure and renal perfusion in shock states such as hemorrhagic shock, acting through dose-dependent dopaminergic, beta1 and alpha1 receptor effects as the infusion rate rises; it is not used to treat bronchial asthma (a beta2 agonist target, not dopamine's role), hypertension (dopamine raises, not lowers, blood pressure), vomiting (dopamine can itself provoke nausea via central dopaminergic receptors) or pheochromocytoma (a catecholamine-secreting tumour, where further catecholamine-like support is contraindicated).

## explicit_objective
State that IV dopamine infusion is used to support the circulation in shock states such as hemorrhagic shock, and reject hypertension, asthma, vomiting and pheochromocytoma as indications.

## pitfalls
Assuming dopamine is used to treat hypertension because it is a cardiovascular drug — dopamine is a vasopressor/inotrope that raises blood pressure in shock, the opposite of an antihypertensive use.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id
DIS-PHA-T03

## secondary_node_ids


## topic
Autonomic pharmacology

## subtopic
Sympathomimetics, clinical use

## microtopic
Dopamine, IV infusion in shock

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Pharmacology

## article_ids
ART-MU102-PHARMACOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.65

## academic_relevance
0.65

## weight_confidence
0.35

## confidence
0.75

## atomic_claim_ids
CLM-FND-F7B8759D2FC67A

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q30: Which one of the following conditions is treated by IV infusion of dopamine? / Hemorrhagic shock.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p10-11 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "dopamine shock" — no candidate record exists.

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

---

# Item

## label
Propranolol is useful in the treatment of hyperthyroidism

## id
CON-FND-76582EBDAEDAE8

## canonical_key
teaching.pharma.propranolol.hyperthyroidism-use

## aliases
Propranolol in thyrotoxicosis
Beta-blocker use in hyperthyroidism

## arabic_label


## arabic_aliases


## definition
Propranolol, a non-selective beta blocker, is used as adjunct therapy in hyperthyroidism (thyrotoxicosis) to control the adrenergic-mediated symptoms it produces, tachycardia, tremor, anxiety and palpitations, by blocking beta1 (cardiac) and beta2 receptors; this same non-selectivity makes propranolol contraindicated or used cautiously in bronchial asthma (beta2 blockade can precipitate bronchospasm), peripheral vascular disease (unopposed alpha-mediated vasoconstriction) and heart block (beta1 blockade worsens conduction delay), and it is not a standard treatment for depression.

## explicit_objective
State that propranolol is useful in hyperthyroidism, among depression, peripheral vascular disease, bronchial asthma and heart block, which are conditions it either does not treat or is contraindicated in.

## pitfalls
Assuming a non-selective beta blocker is safe or useful across all five listed conditions — propranolol is specifically contraindicated in asthma, peripheral vascular disease and heart block, and only the hyperthyroidism option is a genuine indication.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id
DIS-PHA-T03

## secondary_node_ids


## topic
Autonomic pharmacology

## subtopic
Beta blockers, clinical use and contraindications

## microtopic
Propranolol, use in hyperthyroidism

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Pharmacology

## article_ids
ART-MU102-PHARMACOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.6

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-76582EBDAEDAE8

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q31: Propranolol is useful in treatment of which one of the following conditions? / Hyperthyroidism.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p11 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-FND (Assiut AUN-MPT-104, propranolol masks hypoglycemia symptoms) — related but distinct grain: teaches a diabetic-safety caveat, not the hyperthyroidism-use fact this item tests.

## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "propranolol" and "propranolol hyperthyroidism" — related-but-distinct-grain hits (Assiut AUN-MPT-104: propranolol masking hypoglycemia symptoms, labetalol/propranolol comparison; Ain-Shams: amitriptyline vs propranolol for migraine) were reviewed and rejected: none states propranolol's use in hyperthyroidism, the fact this item tests.

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

---

# Item

## label
Atropine produces mydriasis, a rise in intraocular pressure and cycloplegia in the eye

## id
CON-FND-FB2D719680992A

## canonical_key
teaching.pharma.atropine.ocular-effects-triad

## aliases
Atropine ocular effects
Mydriasis, raised IOP and cycloplegia

## arabic_label


## arabic_aliases


## definition
Atropine, a muscarinic antagonist, blocks the iris sphincter and ciliary muscle's parasympathetic tone in the eye, producing mydriasis (pupil dilation, from unopposed sympathetic dilator tone), cycloplegia (paralysis of accommodation, from ciliary muscle relaxation) and a rise, not a reduction, in intraocular pressure (drainage angle narrowing from the dilated iris root can impede aqueous outflow); it does not cause miosis or cyclospasm, which are the opposite, pilocarpine-like muscarinic-agonist effects.

## explicit_objective
State that atropine produces mydriasis, a rise in intraocular pressure and cycloplegia in the eye, and reject miosis, a reduction in intraocular pressure and cyclospasm as its effects.

## pitfalls
Pairing mydriasis with "a reduction in intraocular pressure" because a dilated pupil sounds like it should relieve pressure — atropine's mydriasis is instead associated with a rise in intraocular pressure via drainage-angle narrowing, and cycloplegia (paralysis of accommodation), not cyclospasm, is the correct ciliary-muscle effect.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id
DIS-PHA-T03

## secondary_node_ids


## topic
Autonomic pharmacology

## subtopic
Muscarinic antagonists, ocular effects

## microtopic
Atropine, ocular effects triad

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Pharmacology

## article_ids
ART-MU102-PHARMACOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.8

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-FND-FB2D719680992A

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q33: Which one of the following effects atropine produces in the eye? / Mydriasis, a rise in intraocular pressure and cycloplegia.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p11 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "atropine mydriasis" and "atropine eye" — the only hit (6October O6U-IPH-108, "Reversing atropine mydriasis after a fundus exam") was reviewed and rejected as a different grain: that record concerns a reversal agent after deliberate mydriasis, not the ocular-effects-triad fact this item tests.

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

---
# Item

## label
The bacterial capsule's primary virulence function is antiphagocytic

## id
CON-INF-5B198E5A59242B

## canonical_key
bacteria.capsule.antiphagocytic-function

## aliases
Bacterial capsule function
Antiphagocytic capsule

## arabic_label


## arabic_aliases


## definition
The bacterial capsule is a surface layer (typically polysaccharide, though B. anthracis's is protein) external to the cell wall whose primary virulence function is antiphagocytic: it interferes with recognition and engulfment by host phagocytes, letting the organism survive longer in tissue, so encapsulated strains of a species are typically more virulent than unencapsulated ones. This is distinct from a secreted exotoxin or endotoxin, and distinct from any role in cell wall synthesis.

## explicit_objective
State that the primary function of the bacterial capsule is antiphagocytic protection against host immune clearance.

## pitfalls
Confusing the capsule's passive, structural antiphagocytic role with the active, secreted mechanisms of exotoxins or endotoxin — the capsule itself is not a toxin.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
Bacteriology

## subtopic
Bacterial virulence factors

## microtopic
Capsule, antiphagocytic function

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.8

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-INF-5B198E5A59242B

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q7: Which of the following is the bacterial Capsule function? / Antiphagocytic.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p2 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-INF-7789C0F6154E35 (Ain-Shams, live, same "antiphagocytic capsule" fact) — not rejected on grain, rejected on resolvability: no local article file exists to satisfy the gate's article-coverage check for this live-only record.

## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "capsule antiphagocytic" surfaced a live concept, CON-INF-7789C0F6154E35 (Ain-Shams), naming the same fact; however no markdown article or concept-record file backing it could be located anywhere in docs/*-Source-Imports (a genuinely live-only record with no local home article to cite for the gate's article-coverage check), so a new concept was minted here instead of an unresolvable overlay reuse. Not a semantic duplicate dispute, a tooling-resolvability one.

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

---

# Item

## label
Bacterial plasmids are small circular extrachromosomal DNA molecules

## id
CON-INF-6DAC554930DB35

## canonical_key
teaching.mu-med102.plasmid.circular-extrachromosomal-dna

## aliases
Plasmid structure
Circular extrachromosomal DNA

## arabic_label


## arabic_aliases


## definition
Bacterial plasmids are small, circular, double-stranded extrachromosomal DNA molecules that replicate independently of the bacterial chromosome. They are not essential for bacterial viability but commonly carry accessory genes, such as antibiotic resistance (R-plasmids) or virulence factors, that benefit the bacterium under specific conditions.

## explicit_objective
State that bacterial plasmids are small circular extrachromosomal DNA molecules.

## pitfalls
Describing plasmids as essential, functionless, RNA, or single-stranded — plasmids are non-essential, functional, double-stranded circular DNA.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
Bacterial genetics

## subtopic
Plasmids

## microtopic
Plasmid structure

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.85

## atomic_claim_ids
CLM-INF-6DAC554930DB35

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q16: Which of the following is true regarding plasmids. They are? / Circular.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p5 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-DEV-FE47A8F9B0768E (live, same plasmid-structure fact) — not rejected on grain, rejected on resolvability: no local article file exists to satisfy the gate's article-coverage check for this live-only record.

## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "plasmid" surfaced a live concept, CON-DEV-FE47A8F9B0768E, naming the same "plasmids are small circular extrachromosomal DNA molecules" fact; however no markdown article or concept-record file backing it could be located anywhere in docs/*-Source-Imports (a genuinely live-only record with no local home article to cite for the gate's article-coverage check), so a new concept was minted here instead of an unresolvable overlay reuse. Not a semantic duplicate dispute, a tooling-resolvability one.

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

---

# Item

## label
Coagulase production divides staphylococci into coagulase-positive Staph. aureus and coagulase-negative species

## id
CON-INF-3A5331F7784374

## canonical_key
teaching.mu-med102.staphylococcus.coagulase-test-species-division

## aliases
Coagulase test, staphylococcus identification
Coagulase-positive Staph. aureus

## arabic_label


## arabic_aliases


## definition
Coagulase, an enzyme that clots blood plasma, divides staphylococci into two groups: coagulase-positive (Staphylococcus aureus, the classic species and a key identification marker distinguishing it from the rest) and coagulase-negative (including S. epidermidis and S. saprophyticus). Coagulase positivity correlates with S. aureus's generally greater virulence relative to the coagulase-negative staphylococci.

## explicit_objective
State that Staphylococcus aureus is the coagulase-positive species among the staphylococci, distinguishing it from the coagulase-negative species.

## pitfalls
Assuming the coagulase test distinguishes staphylococci from streptococci — it is a staphylococcus-internal test that divides staphylococcal species from one another, not a genus-level test.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
Bacteriology

## subtopic
Staphylococcus identification

## microtopic
Coagulase test

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
0.35

## academic_relevance
0.75

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-INF-3A5331F7784374

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q18: Which of the following bacteria is Coagulase test positive? / Staph. aureus.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p5-p6 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-INF-542EE15AEA860B (live, same coagulase-positive/negative division fact) — not rejected on grain, rejected on resolvability: no local article file exists to satisfy the gate's article-coverage check for this live-only record.

## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "coagulase" surfaced a live concept, CON-INF-542EE15AEA860B, naming the same fact; however no markdown article or concept-record file backing it could be located anywhere in docs/*-Source-Imports (a genuinely live-only record with no local home article to cite for the gate's article-coverage check), so a new concept was minted here instead of an unresolvable overlay reuse. Not a semantic duplicate dispute, a tooling-resolvability one.

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

---

# Item

## label
Hymenolepis nana is the intestinal cestode capable of autoinfection

## id
CON-INF-150C7B3536AC2E

## canonical_key
hymenolepis-nana.autoinfection

## aliases
Autoinfection (H. nana)
H. nana internal life cycle

## arabic_label


## arabic_aliases


## definition
Hymenolepis nana is unique among the intestinal cestodes tested against it (Dipylidium caninum, Hymenolepis diminuta) in being able to complete its entire life cycle inside a single human host without an obligatory intermediate host: an ingested or hatched egg releases an oncosphere that penetrates a villus of the small intestine, develops into a cysticercoid larva within the villus, then re-emerges into the lumen to mature into an adult worm whose eggs can hatch again in the same bowel. This internal, self-perpetuating cycle is called autoinfection, and it explains why H. nana infections can intensify without any new external exposure.

## explicit_objective
Identify Hymenolepis nana as the parasite capable of autoinfection, completing its entire life cycle within one human host without external re-exposure.

## pitfalls
Assuming any small tapeworm can autoinfect — Dipylidium caninum and Hymenolepis diminuta both require an obligatory arthropod intermediate host (flea, or flea/grain beetle respectively), which rules out direct internal re-infection.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Cestodes (tapeworms)

## microtopic
Autoinfection

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Parasitology

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
CLM-INF-150C7B3536AC2E

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q50: Autoinfection is a mode of infection of which one of the following parasites. / Hymenolepis nana.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p17 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "autoinfection hymenolepis nana" -- no candidate record exists in live state or docs/*-Source-Imports concept files, safe to create.

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

---

# Item

## label
Heterophyes heterophyes life cycle uses a snail and a fish, never a copepod

## id
CON-INF-237B7DCB95F998

## canonical_key
heterophyes-heterophyes.life-cycle-hosts

## aliases
Heterophyes heterophyes host chain
Heterophyes life cycle

## arabic_label


## arabic_aliases


## definition
Heterophyes heterophyes, a small intestinal fluke, has a life cycle running through a snail as its first intermediate host, a brackish/coastal-water fish (classically mullet) as its second intermediate host, humans (or fish-eating mammals such as cats and dogs) as the definitive/reservoir host. A copepod (cyclop) plays no role anywhere in this cycle; a copepod first intermediate host is instead the pattern of a different fluke/cestode group, such as Diphyllobothrium latum.

## explicit_objective
List the confirmed hosts in the Heterophyes heterophyes life cycle (snail, fish, human, cat/dog) and reject a copepod, which belongs to a different fluke's cycle, as one of them.

## pitfalls
Assuming every trematode with two intermediate hosts uses a copepod as the first one — Heterophyes heterophyes's first intermediate host is a snail, not a copepod; the copepod-then-fish pattern belongs to Diphyllobothrium latum instead.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Trematodes (flukes)

## microtopic
Heterophyes heterophyes life cycle

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Parasitology

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
CLM-INF-237B7DCB95F998

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q54: Heterophyes heterophyes has a complex life cycle involving several hosts. Which of the following is NOT a part of this life cycle? / Cyclop.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p18 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "heterophyes heterophyes life cycle hosts cyclops" -- no candidate record exists in live state or docs/*-Source-Imports concept files, safe to create.

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

---

# Item

## label
Trichomonas vaginalis can spread by shared contaminated towels, alongside sexual contact

## id
CON-INF-2DE5DDD8AF899B

## canonical_key
trichomonas-vaginalis.fomite-transmission

## aliases
Trichomonas towel transmission
T. vaginalis non-sexual transmission

## arabic_label


## arabic_aliases


## definition
Trichomonas vaginalis exists only as a trophozoite (no cyst stage) and its trophozoites can survive for a limited time outside the body in a moist, warm environment. Because of this, sharing contaminated damp towels, underwear or other fomites is a recognised non-sexual route that can help transmit infection, in addition to its classic sexual transmission route. It has no animal reservoir, no skin-penetrating stage, and is not transmitted by ingestion.

## explicit_objective
Recognise fomite transmission (shared damp towels) as a non-sexual route by which Trichomonas vaginalis can spread, alongside its classic sexual transmission.

## pitfalls
Assuming Trichomonas vaginalis is transmitted only sexually — fomite transmission via shared damp towels is a recognised, examinable secondary route, since the fragile trophozoite can briefly survive outside the body in a moist environment.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Protozoa

## microtopic
Trichomonas vaginalis transmission

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Parasitology

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
CLM-INF-2DE5DDD8AF899B

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q55: Choose the right statement according to Trichomonas vaginalis / Using infected contaminated towels help in transmission.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p18 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "trichomonas vaginalis towel fomite transmission" -- no candidate record exists in live state or docs/*-Source-Imports concept files, safe to create.

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

---

# Item

## label
Giardia lamblia causes steatorrhoea by coating the duodenal mucosa

## id
CON-INF-438BE9A64D7913

## canonical_key
giardia-lamblia.steatorrhoea

## aliases
Giardia malabsorption
Giardia lamblia greasy stool

## arabic_label


## arabic_aliases


## definition
Giardia lamblia trophozoites attach to and coat the duodenal and jejunal mucosa in large numbers, mechanically interfering with fat digestion and absorption. The result is steatorrhoea, a light-coloured, greasy, foul-smelling stool that reflects unabsorbed fat, a classic presenting feature of giardiasis, often accompanied by bloating and abdominal cramps.

## explicit_objective
Recognise light-coloured, greasy (steatorrhoeic) stool as the classic malabsorption presentation of Giardia lamblia infection.

## pitfalls
Attributing pale, greasy stool to Entamoeba histolytica — E. histolytica classically causes bloody, mucus-containing dysentery from colonic ulceration, not fat malabsorption; steatorrhoea points to Giardia's small-bowel mucosal coating instead.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Protozoa

## microtopic
Giardia lamblia clinical features

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Parasitology

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
CLM-INF-438BE9A64D7913

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q56: If the patient noticed that his stool became light-coloured and greasy, what is the probable causative protozoon? / Giardia lamblia.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p19 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "giardia lamblia steatorrhea malabsorption" -- no candidate record exists in live state or docs/*-Source-Imports concept files, safe to create.

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

---

# Item

## label
Physical arthropod control methods are distinct from chemical insecticide control

## id
CON-INF-57180C6B99D81F

## canonical_key
arthropod-control.physical-vs-chemical

## aliases
Physical vector control
Chemical vs physical arthropod control

## arabic_label


## arabic_aliases


## definition
Arthropod (vector) control methods are grouped by mechanism. Physical/environmental methods act by removing breeding sites or mechanically barring arthropods from a host: eliminating stagnant water, proper sewage/garbage disposal, bed nets, and door/window screens are all physical methods. Chemical methods instead rely on toxicity to kill or repel arthropods, such as insecticides like DDT and arsenical compounds; this places insecticide use in a separate category from source reduction and physical barriers.

## explicit_objective
Distinguish physical/environmental arthropod control methods (source reduction, barriers) from chemical control (insecticides).

## pitfalls
Grouping insecticide use with physical control simply because it targets the same arthropods — the distinguishing feature is mechanism (chemical toxicity versus mechanical/environmental action), not the shared goal of vector reduction.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Medical entomology and vector control

## microtopic
Arthropod control methods

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Parasitology

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
CLM-INF-57180C6B99D81F

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q57: All of the following is physical method for arthropod control except..... / Using of insecticides like DDT and arsenical compounds.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p19 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "arthropod control physical chemical insecticide" -- no candidate record exists in live state or docs/*-Source-Imports concept files, safe to create.

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

---

# Item

## label
Anopheles mosquitoes are the exclusive vector of human malaria

## id
CON-INF-6BAFAF7430C005

## canonical_key
anopheles.human-malaria-vector

## aliases
Anopheles malaria vector
Human malaria transmission

## arabic_label


## arabic_aliases


## definition
Anopheles mosquitoes are the exclusive vector of human malaria: the female mosquito injects Plasmodium sporozoites into the bloodstream while taking a blood meal, and no other mosquito genus can complete the sexual (sporogonic) cycle of the four human Plasmodium species. Other mosquito-borne diseases are transmitted by different genera: bird (avian) malaria and Japanese encephalitis by Culex, dengue fever by Aedes, and Rift Valley fever mainly by Aedes and Culex.

## explicit_objective
Identify Anopheles as the exclusive mosquito vector of human malaria, distinguishing it from the Culex/Aedes vectors of bird malaria, dengue, Japanese encephalitis and Rift Valley fever.

## pitfalls
Assuming any mosquito-borne disease listed alongside malaria shares the same vector — bird malaria, dengue, Japanese encephalitis and Rift Valley fever are each transmitted by Culex or Aedes, not Anopheles, which is reserved for human malaria.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Medical entomology and vector control

## microtopic
Mosquito-borne disease vectors

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Parasitology

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
CLM-INF-6BAFAF7430C005

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q58: Anopheles mosquitoes transmit which one of the following parasitic infections....... / Human malaria.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p19 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "anopheles mosquito human malaria vector" -- no candidate record exists in live state or docs/*-Source-Imports concept files, safe to create.

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

---

# Item

## label
Propagative transmission is multiplication of the parasite alone inside the vector

## id
CON-INF-8B36A038546153

## canonical_key
vector-transmission.propagative

## aliases
Propagative transmission definition

## arabic_label


## arabic_aliases


## definition
Propagative transmission describes a vector in which the parasite only multiplies in number, without undergoing any developmental change in form, before being passed to a new host (e.g., Yersinia pestis multiplying within the flea gut). This contrasts with cyclodevelopmental transmission (development/form change only, no multiplication), cyclopropagative transmission (both development and multiplication), mechanical transmission (the vector merely carries the organism, with neither development nor multiplication), and transovarian transmission (passage from the arthropod to its own offspring via the egg).

## explicit_objective
Define propagative transmission as multiplication of the parasite alone inside the vector, distinguishing it from cyclodevelopmental (development only), cyclopropagative (both), mechanical (neither) and transovarian (to vector offspring) transmission.

## pitfalls
Confusing propagative transmission (multiplication only) with cyclopropagative transmission (multiplication and development together) — the propagative pattern involves no change in the parasite's form, only an increase in its numbers.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Medical entomology and vector control

## microtopic
Modes of vector transmission

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Parasitology

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
CLM-INF-8B36A038546153

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q59: Only multiplication of the parasite takes place inside the vector is called............... / Propagative transmission.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p20 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "propagative transmission vector multiplication" -- no candidate record exists in live state or docs/*-Source-Imports concept files, safe to create.

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

---

# Item

## label
Ascaris lumbricoides can mechanically obstruct the bowel in heavy infection

## id
CON-INF-BF0258CF482E39

## canonical_key
ascaris-lumbricoides.intestinal-obstruction

## aliases
Ascaris intestinal obstruction
Roundworm bowel obstruction

## arabic_label


## arabic_aliases


## definition
Ascaris lumbricoides is a large roundworm, often 15 to 35 cm long, and in heavy infections a tangled bolus of worms can mechanically obstruct the lumen of the small intestine. This is a recognised, classically tested surgical complication of ascariasis, occurring most often in children, who tend to carry the heaviest worm burdens and have a narrower bowel lumen to begin with.

## explicit_objective
Identify Ascaris lumbricoides as the intestinal parasite whose heavy worm burden can mechanically obstruct the bowel.

## pitfalls
Attributing intestinal obstruction to hookworm (Ancylostoma duodenale) — hookworm's classic complication is chronic blood loss and iron-deficiency anaemia from mucosal attachment and feeding, not bulk mechanical obstruction, which is Ascaris's signature complication.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Intestinal nematodes

## microtopic
Ascaris lumbricoides complications

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Parasitology

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
CLM-INF-BF0258CF482E39

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q60: Intestinal obstruction may occur as a complication of infection with which one of the following parasites? / Ascaris lumbricoides.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p20 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "ascaris lumbricoides intestinal obstruction complication" -- no candidate record exists in live state or docs/*-Source-Imports concept files, safe to create.

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

---

# Item

## label
Complete metamorphosis: immature and adult insects differ markedly in form, habitat and behaviour

## id
CON-INF-C6F4EA1ED6723A

## canonical_key
arthropods.complete-metamorphosis-descriptive

## aliases
Complete metamorphosis (holometabolous)
Insect life-stage difference

## arabic_label


## arabic_aliases


## definition
Complete (holometabolous) metamorphosis describes insects, such as mosquitoes and flies, whose immature stages (larva, pupa) look and behave completely differently from the adult and typically occupy a different habitat, such as an aquatic larva maturing into a flying adult. This contrasts with incomplete (hemimetabolous) metamorphosis, in which the immature nymph closely resembles a smaller, wingless version of the adult and usually shares the same habitat and behaviour.

## explicit_objective
Recognise complete (holometabolous) metamorphosis as the pattern in which immature and adult insects differ markedly in form, habitat and behaviour, against incomplete (hemimetabolous) metamorphosis's close resemblance.

## pitfalls
Confusing complete metamorphosis's marked immature-versus-adult difference with the vector-transmission terms propagative/cyclopropagative/cyclodevelopmental, which describe events happening to a parasite inside a vector, not the insect's own developmental stages.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Medical entomology and vector control

## microtopic
Insect metamorphosis

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Parasitology

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
CLM-INF-C6F4EA1ED6723A

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q61: The immature insects and the adults have different forms, often live in different habitats, and may have very different behavior which is called....... / Complete metamorphosis.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p20 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "complete metamorphosis insect larva adult different habitat" -- no candidate record exists in live state or docs/*-Source-Imports concept files, safe to create.

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

---

# Item

## label
Barrett oesophagus: chronic reflux drives squamous-to-intestinal metaplasia

## id
CON-FND-EA33B65C529268

## canonical_key
barrett-oesophagus.squamous-to-intestinal-metaplasia

## aliases
Barrett's esophagus
Oesophageal columnar metaplasia

## arabic_label


## arabic_aliases


## definition
Barrett oesophagus results from chronic gastro-oesophageal reflux repeatedly injuring the normal squamous epithelium of the distal oesophagus; the tissue adapts by replacing the squamous lining with a more acid-resistant columnar, intestinal-type epithelium containing goblet cells. Endoscopically this appears as salmon-coloured mucosa extending upward from the gastro-oesophageal junction into the paler, tan-white squamous mucosa. This squamous-to-intestinal metaplasia is a premalignant change that raises the risk of oesophageal adenocarcinoma.

## explicit_objective
Identify Barrett oesophagus (chronic-reflux-driven squamous-to-intestinal columnar metaplasia of the distal oesophagus) from its classic endoscopic and clinical description.

## pitfalls
Reversing the direction of change — chronic reflux converts squamous epithelium toward an intestinal (columnar) phenotype, not the other way around, and the process is metaplasia (a reversible tissue-type substitution), not dysplasia or transitional-epithelium change.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T02

## secondary_node_ids


## topic
General pathology

## subtopic
Cellular adaptation

## microtopic
Metaplasia

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > End Foundation 2 Batch 43 > Pathology

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_56d88740af5ca3011894

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
CLM-FND-EA33B65C529268

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q65: ...Esophago-gastro-duodenoscopy showed areas of salmon-colored mucosa... / Transformation of squamous epithelium to intestinal epithelium.

## exam_signal
mu_56d88740af5ca3011894 | paper | | p22 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "barrett esophagus intestinal metaplasia squamous columnar" -- no candidate record exists in live state or docs/*-Source-Imports concept files, safe to create.

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

---
# Item

## label
Mitochondria are absent from the bacterial (prokaryotic) cell

## id
CON-INF-8A1E540FBBB222

## canonical_key
bacteria.cell-structure.no-mitochondria

## aliases
Bacteria lack mitochondria
Absence of membrane-bound organelles in bacteria

## arabic_label


## arabic_aliases


## definition
Bacteria are prokaryotes and, unlike eukaryotic cells, possess no membrane-bound organelles at all, including mitochondria; ATP generation instead occurs across the bacterial cytoplasmic membrane itself, which carries the electron transport chain that in eukaryotes is confined to the mitochondrion.

## explicit_objective
State that bacteria, as prokaryotes, lack mitochondria and every other membrane-bound organelle, and that oxidative phosphorylation instead occurs across the cytoplasmic membrane.

## pitfalls
Assuming a structure common to eukaryotic cells (mitochondria, a nucleus, endoplasmic reticulum) must also be present in bacteria -- the prokaryote/eukaryote distinction is exactly what this kind of question tests.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
General bacteriology

## subtopic
Bacterial cell structure

## microtopic
Prokaryote vs eukaryote structure

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Microbiology Past Exams > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_acbb4b426183f9e21e89

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
CLM-INF-8A1E540FBBB222

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q1: One of the following is NOT present in the bacterial cell / c) Mitochondria.

## exam_signal
mu_acbb4b426183f9e21e89 | paper | | p1 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "mitochondria bacterial cell" and "mitochondria" -- live hits were unrelated (eukaryotic mitochondrial-abundance concepts in other systems), no same-grain bacteria-lack-mitochondria concept exists in live state or docs/*-Source-Imports.

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

---

# Item

## label
M protein is a Streptococcus pyogenes virulence factor, not a Staphylococcus aureus one

## id
CON-INF-58FD0B22F67C48

## canonical_key
bacteria.virulence-factor.m-protein-is-streptococcal-not-staphylococcal

## aliases
M protein staphylococcus exception
Staphylococcus aureus virulence factor list

## arabic_label


## arabic_aliases


## definition
M protein is an antigenically variable, antiphagocytic surface protein produced by Streptococcus pyogenes and used for streptococcal serotyping; it is not produced by, and is not a virulence factor of, Staphylococcus aureus, whose own virulence factors instead include beta-lactamases, coagulase, enterotoxins and Protein A.

## explicit_objective
Identify M protein as a Streptococcus pyogenes virulence factor that does not belong on a list of Staphylococcus aureus virulence factors.

## pitfalls
Assuming any well-known Gram-positive-coccus virulence factor could belong to either staphylococci or streptococci interchangeably -- M protein is genus-specific to Streptococcus pyogenes.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
General bacteriology

## subtopic
Staphylococcus aureus virulence factors

## microtopic
Staphylococcal vs streptococcal virulence factors

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Microbiology Past Exams > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_acbb4b426183f9e21e89

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
CLM-INF-58FD0B22F67C48

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q7: One of the following is NOT a virulence factor in Staphylococcus aureus / d) M protein.

## exam_signal
mu_acbb4b426183f9e21e89 | paper | | p3 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "m protein staphylococcus" and "m protein" -- this module's own lane-1 concept CON-INF-FFBDF62FF38084 (M protein divides S. pyogenes into serotypes) and Ain-Shams CON-INF (M protein as a TD antigen) both test M protein's streptococcal role, a different grain from this item's 'NOT a staph factor' exclusion fact; no same-grain match found, minted fresh.

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

---

# Item

## label
The cytoplasmic membrane is an essential bacterial structure, unlike the capsule, fimbriae, flagella or plasmids

## id
CON-INF-D92614F79174BD

## canonical_key
bacteria.cell-structure.cytoplasmic-membrane-essential

## aliases
Essential vs accessory bacterial structures
Obligatory bacterial cell membrane

## arabic_label


## arabic_aliases


## definition
Every living bacterial cell requires a cytoplasmic membrane, which bounds the cell, controls transport and hosts the electron transport chain; by contrast the capsule, fimbriae (pili), flagella and plasmids are accessory structures that many bacterial species lack entirely while remaining fully viable, so only the cytoplasmic membrane is truly obligatory among these options.

## explicit_objective
Distinguish the cytoplasmic membrane, an obligatory bacterial structure, from the capsule, fimbriae, flagella and plasmids, all of which are optional accessory structures.

## pitfalls
Treating a common or medically important accessory structure (such as the capsule or a plasmid) as universally required -- many bacterial species lack each of these and survive normally.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
General bacteriology

## subtopic
Bacterial cell structure

## microtopic
Essential vs accessory bacterial structures

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Microbiology Past Exams > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_acbb4b426183f9e21e89

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
CLM-INF-D92614F79174BD

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q8: One of the following is an essential structure of the bacterial cell / d) Cytoplasmic membrane.

## exam_signal
mu_acbb4b426183f9e21e89 | paper | | p3 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "essential structure" -- one hit (Assiut AUN-INI-105-ch4-mcq.md, 'Essential structures in a bacterial cell') tests a different-grain fact (nuclear body/nucleoid as the essential answer against a Nuclear body/Fimbriae/Inclusion granules/Plasmid/Capsule option set), not this item's cytoplasmic-membrane answer against a different option set; no same-grain match, minted fresh.

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

---

# Item

## label
Calcium dipicolinate is a chemical component specific to the bacterial spore core

## id
CON-INF-E886F22A5A9552

## canonical_key
bacteria.spore.calcium-dipicolinate

## aliases
Dipicolinic acid in spores
Spore heat-resistance chemistry

## arabic_label


## arabic_aliases


## definition
Calcium dipicolinate (the calcium salt of dipicolinic acid) is concentrated in the core of the bacterial endospore, where it complexes with spore DNA and contributes substantially to the spore's characteristic resistance to heat, desiccation and chemical agents; it is not found in the vegetative cell wall, flagella, pili or outer membrane.

## explicit_objective
Locate calcium dipicolinate specifically within the bacterial spore core and link it to spore heat resistance.

## pitfalls
Confusing calcium dipicolinate, a spore-specific chemical marker, with the general survival-function description of spores (dormancy under nutrient/heat/dryness stress) -- the two are related but distinct facts about the same structure.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
General bacteriology

## subtopic
Bacterial spores

## microtopic
Spore chemistry and heat resistance

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Microbiology Past Exams > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_acbb4b426183f9e21e89

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
CLM-INF-E886F22A5A9552

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q9: Calcium dipicolinate is found in / d) Spores.

## exam_signal
mu_acbb4b426183f9e21e89 | paper | | p3 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "calcium dipicolinate" and "dipicolinic" -- no candidate record exists in live state or docs/*-Source-Imports. This module's own lane-1 concept CON-INF-EE36D7C199E6D8 (bacterial spore survival function) is a different grain, spore function versus spore chemical composition, and was not merged, per the rejected_merge_candidate_ids note below.

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

---

# Item

## label
Peptidoglycan protects the bacterial cell from osmotic damage

## id
CON-INF-908F93CFF86B24

## canonical_key
bacteria.cell-wall.peptidoglycan-osmotic-protection

## aliases
Peptidoglycan rigidity and osmotic lysis
Cell wall resistance to osmotic pressure

## arabic_label


## arabic_aliases


## definition
Peptidoglycan (murein) forms a rigid, cross-linked mesh around the bacterial cell that mechanically resists the high internal osmotic pressure of the cytoplasm, preventing the cell from swelling and lysing in a hypotonic environment; this is why cell-wall-active antibiotics such as penicillins, which block peptidoglycan cross-linking, cause bacterial lysis and death.

## explicit_objective
State that peptidoglycan is the rigid bacterial cell-wall layer that mechanically protects the cell from osmotic lysis, and link this to the mechanism of cell-wall-active antibiotics.

## pitfalls
Attributing osmotic protection to the cytoplasmic membrane or an outer-membrane component (LPS, teichoic acid) rather than to the load-bearing peptidoglycan mesh itself.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
General bacteriology

## subtopic
Bacterial cell wall

## microtopic
Peptidoglycan structure and function

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Microbiology Past Exams > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_acbb4b426183f9e21e89

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
CLM-INF-908F93CFF86B24

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q10: The major component which protects bacterial cell from osmotic damage is / c) Peptidoglycan.

## exam_signal
mu_acbb4b426183f9e21e89 | paper | | p4 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "osmotic" and "peptidoglycan osmotic" -- live hits were unrelated (immunology/haematology osmotic-pressure concepts), and this module's own lane-1 concept CON-INF-B8A4A58D6E2563 (peptidoglycan is 50% of the Gram-positive wall by mass) is a different grain, composition proportion versus osmotic-protection mechanism; no same-grain match, minted fresh.

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

---

# Item

## label
The anterior nares are the classic Staphylococcus aureus carriage source in a neonatal-nursery sepsis outbreak

## id
CON-INF-41251ED119A62B

## canonical_key
bacteria.staph-aureus.nasal-carriage-nursery-outbreak-source

## aliases
Nasal carriage and nursery outbreaks
Staph aureus reservoir in outbreak investigation

## arabic_label


## arabic_aliases


## definition
The anterior nares (nose) are the principal carriage site of Staphylococcus aureus in healthy individuals, including hospital staff and carers, and nasal carriage among staff/contacts is the classic source traced in neonatal-nursery Staphylococcus aureus sepsis outbreaks, spread to infants via hands or droplets; this is the basis for nasal-carriage screening and decolonisation as an outbreak-control measure.

## explicit_objective
Identify the anterior nares as the classic Staphylococcus aureus carriage source traced in a neonatal-nursery sepsis outbreak investigation.

## pitfalls
Assuming the colon, throat or another normal-flora site is the relevant staphylococcal reservoir for this specific outbreak scenario -- the nose is the site the teaching and outbreak-control literature specifically implicates.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
General bacteriology

## subtopic
Normal flora and Staphylococcus aureus carriage

## microtopic
Outbreak epidemiology

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Microbiology Past Exams > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_acbb4b426183f9e21e89

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
CLM-INF-41251ED119A62B

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q1 (Final 40): outbreak of sepsis... new-born nursery... MOST likely source of the organism / b) Nose.

## exam_signal
mu_acbb4b426183f9e21e89 | paper | | p6 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "newborn nursery" and "nasal carriage" -- no candidate record exists in live state or docs/*-Source-Imports.

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

---

# Item

## label
Oral polio vaccine is given as a birth dose in the standard infant immunization schedule

## id
CON-INF-EB35B37A12423E

## canonical_key
immunization.schedule.opv-birth-dose

## aliases
OPV zero dose at birth
Birth-dose immunizations

## arabic_label


## arabic_aliases


## definition
Oral polio vaccine (OPV) is administered as a "zero dose" immediately at birth in the standard immunization schedule referenced by this exam, ahead of the infant's first scheduled clinic visit, to provide early mucosal protection against poliovirus, distinguishing it from vaccines such as DPT and Hib that begin later in the primary infant series.

## explicit_objective
State that oral polio vaccine (zero dose) is administered immediately at birth, ahead of the DPT and Hib series which begin later in infancy.

## pitfalls
Assuming every routine infant vaccine (DPT, Hib) is given at birth rather than starting at around six weeks of age; some national schedules also give a Hepatitis B birth dose, but this exam's own printed key names OPV for the birth-dose item.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
General bacteriology

## subtopic
Immunization schedule

## microtopic
Birth-dose vaccines

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Microbiology Past Exams > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_acbb4b426183f9e21e89

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
CLM-INF-EB35B37A12423E

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q3 (Final 40): Which ONE of the following immunizations should be administrated immediately after birth / e) Oral Polio virus vaccine.

## exam_signal
mu_acbb4b426183f9e21e89 | paper | | p7 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "hepatitis b vaccine" and "oral polio vaccine birth" -- no candidate record exists in live state or docs/*-Source-Imports.

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

---

# Item

## label
Chlamydiae life cycle alternates an infectious extracellular elementary body with a replicating intracellular reticulate body

## id
CON-INF-DB2A6206156886

## canonical_key
bacteria.chlamydiae.elementary-reticulate-body-life-cycle

## aliases
Elementary body vs reticulate body
Chlamydial developmental cycle

## arabic_label


## arabic_aliases


## definition
Chlamydiae are obligate intracellular bacteria with a unique two-form developmental cycle: the small, metabolically inactive elementary body is the infectious extracellular form that attaches to and enters a host cell, where it reorganises into the larger, metabolically active reticulate body that replicates before condensing back into new elementary bodies released to infect further cells; chlamydiae are obligate intracellular organisms because they cannot generate their own ATP, not because they lack ribosomes, which they do possess.

## explicit_objective
Describe the chlamydial life cycle as an extracellular infectious elementary body alternating with an intracellular replicating reticulate body, and state that their obligate intracellular lifestyle reflects an ATP deficiency, not an absence of ribosomes.

## pitfalls
Reversing which form is extracellular/infectious (elementary body) versus intracellular/replicating (reticulate body); assuming lifelong immunity follows infection, or that all three medically important chlamydiae share a purely human reservoir, when Chlamydophila psittaci is a bird-reservoir zoonosis.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
General bacteriology

## subtopic
Chlamydiae biology

## microtopic
Chlamydial developmental cycle

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Microbiology Past Exams > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_acbb4b426183f9e21e89

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
CLM-INF-DB2A6206156886

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q2 (Final 41 دور أول): Regarding chlamydiae, which one of the following is the most accurate / c) Their life cycle consists of elementary bodies outside of cells and reticulate bodies within cells.

## exam_signal
mu_acbb4b426183f9e21e89 | paper | | p9 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "chlamydia", "chlamydiae", "elementary body" and "reticulate bodies" -- hits were unrelated (Gram-stain-limitations and ophthalmia-neonatorum concepts naming Chlamydia only in passing), no same-grain elementary-body/reticulate-body life-cycle concept exists in live state or docs/*-Source-Imports.

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

---

# Item

## label
Aminoglycosides inhibit bacterial protein synthesis by irreversibly binding the 30S ribosomal subunit

## id
CON-INF-00087979C01C14

## canonical_key
pharmacology.aminoglycoside.30s-protein-synthesis-inhibition

## aliases
Aminoglycoside mechanism of action
30S ribosomal subunit binding

## arabic_label


## arabic_aliases


## definition
Aminoglycosides bind irreversibly to the bacterial 30S ribosomal subunit, causing misreading of the genetic code and inhibiting bacterial protein synthesis; because the binding is irreversible, the effect is bactericidal, distinguishing aminoglycosides from cell-wall-active (beta-lactam), DNA-gyrase-active (fluoroquinolone) and folate-pathway-active (sulfonamide/trimethoprim) antibiotic classes.

## explicit_objective
State that aminoglycosides act by irreversibly binding the bacterial 30S ribosomal subunit to inhibit protein synthesis, and distinguish this mechanism from cell-wall, DNA-gyrase and folate-pathway antibiotic targets.

## pitfalls
Confusing the aminoglycoside target (30S ribosomal subunit, protein synthesis) with the target of a different antibiotic class (cell wall, DNA gyrase or folate metabolism) offered as distractors in the same item.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
General bacteriology

## subtopic
Antibiotic mechanisms of action

## microtopic
Protein-synthesis-inhibiting antibiotics

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Microbiology Past Exams > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_acbb4b426183f9e21e89

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
CLM-INF-00087979C01C14

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q4 (Final 41 دور أول): aminoglycosides... mode of action / d) Inhibition of protein synthesis.

## exam_signal
mu_acbb4b426183f9e21e89 | paper | | p10 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "aminoglycoside" -- hits (ASU-INF 30S-subunit resistance-mutation concept, ASU-CNS-3 intrathecal-route concept) are different-grain (resistance mechanism and administration route, not this item's basic mode-of-action fact), no same-grain match, minted fresh.

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

---

# Item

## label
Klebsiella pneumoniae is a lactose-fermenting, mucoid-capsulated Gram-negative bacillus that causes necrotizing pneumonia in alcoholic patients

## id
CON-INF-5220B857FDB768

## canonical_key
bacteria.klebsiella-pneumoniae.mucoid-capsule-alcoholic-pneumonia

## aliases
Klebsiella pneumoniae identification triad
Friedlander's pneumonia
Currant-jelly sputum organism

## arabic_label


## arabic_aliases


## definition
Klebsiella pneumoniae is a lactose-fermenting Gram-negative bacillus that forms pink, mucoid colonies on MacConkey agar because of its heavy polysaccharide capsule, and is the classic cause of severe, necrotising lobar pneumonia (historically Friedlander's pneumonia) in alcoholic and otherwise debilitated patients; a Gram-negative bacillary sputum picture in a homeless or alcoholic patient with severe pneumonia, and the lactose-fermenting mucoid-capsule laboratory triad, both point to this organism.

## explicit_objective
Identify Klebsiella pneumoniae from its classic laboratory triad (lactose fermentation, mucoid capsulated colonies on MacConkey agar) and its classic clinical association with necrotising pneumonia in an alcoholic patient.

## pitfalls
Attributing the mucoid-capsule/lactose-fermenter laboratory picture to a different Enterobacteriaceae genus (Serratia, which pigments rather than forms a mucoid capsule) or to a non-lactose-fermenting organism (Pseudomonas aeruginosa).

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
General bacteriology

## subtopic
Klebsiella pneumoniae

## microtopic
Gram-negative bacillary pneumonia

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Microbiology Past Exams > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_acbb4b426183f9e21e89

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
CLM-INF-5220B857FDB768

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q5 (Final 41 دور أول): homeless, alcoholic man... Gram-negative bacilli... likely causative agent / d) Klebsiella pneumoniae. Also Q1 (Final 41 دور تاني): necrotizing lobar pneumonia... lactose fermenter; pink mucoid colonies... luxuriant capsule / a) Klebsiella pneumoniae.

## exam_signal
mu_acbb4b426183f9e21e89 | paper | | p11 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "klebsiella pneumoniae" -- no candidate record exists in live state or docs/*-Source-Imports. Tested twice in this compilation (a generic Gram-negative-bacilli-in-an-alcoholic vignette and the classic lactose-fermenter/mucoid-capsule/MacConkey triad vignette); both point to the same organism identity, so both questions share this one concept.

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

---

# Item

## label
Enterococcus species are catalase-negative, non-haemolytic Gram-positive cocci that cause recurrent UTI progressing to bacteraemia in the elderly

## id
CON-INF-E1D2402DA6315C

## canonical_key
bacteria.enterococcus.recurrent-uti-bacteraemia-elderly

## aliases
Enterococcus urosepsis
Catalase-negative non-haemolytic Gram-positive cocci in UTI

## arabic_label


## arabic_aliases


## definition
Enterococcus species are catalase-negative, typically non-haemolytic (gamma-haemolytic) Gram-positive cocci and a classic cause of recurrent urinary tract infection in elderly patients, which can progress to bacteraemia/urosepsis presenting with fever, chills and confusion; this combination of catalase-negative, non-haemolytic morphology with a recurrent-UTI-to-bacteraemia clinical course distinguishes Enterococcus from the alpha-haemolytic viridans streptococci and from the catalase-positive staphylococci.

## explicit_objective
Recognise Enterococcus species, by its catalase-negative, non-haemolytic Gram-positive cocci morphology, as the classic cause of recurrent UTI progressing to bacteraemia in an elderly patient.

## pitfalls
Selecting a catalase-positive staphylococcal species (ruled out by a catalase-negative result) or an alpha-haemolytic streptococcal species (ruled out by a non-haemolytic result) instead of Enterococcus.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
General bacteriology

## subtopic
Enterococcus in urinary tract infection

## microtopic
Gram-positive cocci identification by haemolysis and catalase

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Microbiology Past Exams > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_acbb4b426183f9e21e89

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
CLM-INF-E1D2402DA6315C

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q6 (Final 41 دور أول): elderly man... recurrent urinary tract infections... non-hemolytic, catalase negative. Gram stain... Gram-positive cocci / e) Enterococcus species.

## exam_signal
mu_acbb4b426183f9e21e89 | paper | | p11 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "enterococcus" -- one hit (Helwan HU-BMS-102, enterococcus intrinsic cephalosporin resistance) is a different grain, antibiotic resistance rather than clinical UTI/bacteraemia identification, no same-grain match, minted fresh.

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

---

# Item

## label
CSF Gram-negative diplococci in an acute meningitis presentation indicate Neisseria meningitidis

## id
CON-INF-419177EC999608

## canonical_key
bacteria.neisseria-meningitidis.csf-gram-negative-diplococci

## aliases
Meningococcal meningitis CSF finding
Gram-negative diplococci in cerebrospinal fluid

## arabic_label


## arabic_aliases


## definition
Neisseria meningitidis is a Gram-negative diplococcus and the classic cause of acute bacterial meningitis in a young adult presenting with sudden fever, severe headache and nuchal rigidity, with cerebrospinal fluid Gram stain showing Gram-negative diplococci within neutrophils; this morphology (Gram-negative diplococcus) distinguishes it from the Gram-positive diplococcus Streptococcus pneumoniae and the Gram-negative coccobacillus Haemophilus influenzae, both other meningitis causes.

## explicit_objective
Recognise CSF Gram-negative diplococci in a young adult with acute meningitis as diagnostic of Neisseria meningitidis, distinguishing it from Streptococcus pneumoniae and Haemophilus influenzae by Gram-stain morphology.

## pitfalls
Selecting Streptococcus pneumoniae (a Gram-positive, not Gram-negative, diplococcus) or Haemophilus influenzae (a coccobacillus, not a diplococcus) instead of Neisseria meningitidis on the basis of Gram-stain morphology alone.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-MIC-T01

## secondary_node_ids


## topic
General bacteriology

## subtopic
Neisseria meningitidis meningitis

## microtopic
CSF Gram-stain interpretation in meningitis

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Microbiology Past Exams > Microbiology

## article_ids
ART-MU102-MICROBIOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_acbb4b426183f9e21e89

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
CLM-INF-419177EC999608

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q7 (Final 41 دور أول): sudden onset of fever... severe headache... nuchal rigidity... Gram stain of the spinal fluid revealed... Gram negative diplococci / b) Neisseria meningitidis.

## exam_signal
mu_acbb4b426183f9e21e89 | paper | | p12 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for "neisseria meningitidis", "meningococcus" and "csf gram-negative diplococci" -- hits (Ain-Shams chemoprophylaxis, complement-deficiency susceptibility, droplet-precautions and empiric-therapy concepts) are all different-grain (management/epidemiology facts, not the CSF Gram-stain diagnostic fact), no same-grain match, minted fresh.

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

---

---

# Item

## label
Cyclodevelopmental transmission is morphological change in the vector without multiplication

## id
CON-INF-3CFED66B45A9BF

## canonical_key
parasitology.transmission.cyclodevelopmental

## aliases
Cyclodevelopmental transmission
Development without multiplication in a vector

## arabic_label


## arabic_aliases


## definition
Cyclodevelopmental transmission is a pattern of vector-borne transmission in which the parasite undergoes a morphological or developmental change inside the arthropod vector but does not multiply in number there — one ingested stage develops into one infective stage. This is distinct from propagative transmission, where the organism multiplies in the vector without any change in form, and from cyclopropagative transmission, where the organism both multiplies and changes form inside the vector.

## explicit_objective
Identify cyclodevelopmental transmission as vector-borne transmission with a change in form but no multiplication of the parasite inside the vector.

## pitfalls
Confusing cyclodevelopmental transmission (development only) with cyclopropagative transmission (development and multiplication together), or with propagative transmission (multiplication only, no change in form).

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Modes of parasite transmission

## microtopic
Cyclodevelopmental transmission

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Modes of transmission

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-3CFED66B45A9BF

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q1: The organism undergoes cyclical changes but does not multiply inside the arthropod, this is called ___ transmission. / cyclo-developmental.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p1 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Pseudophyllidean cestodes lack the discrete gravid proglottids seen in cyclophyllidean tapeworms

## id
CON-INF-172FA93BDEDACD

## canonical_key
cestodes.pseudophyllidea.gravid-segments-absent

## aliases
Pseudophyllidea gravid segments
Diphyllobothrium latum proglottid shedding

## arabic_label


## arabic_aliases


## definition
Pseudophyllidean cestodes, such as Diphyllobothrium latum, do not shed discrete gravid proglottids the way cyclophyllidean tapeworms (Taenia, Hymenolepis) do; instead their uterus opens directly onto the segment surface through a uterine pore, releasing operculated eggs continuously into the intestinal lumen and then the stool, rather than releasing whole detached gravid segments. This means the classic diagnostic finding for pseudophyllidean infection is unembryonated operculated eggs in stool, not passed proglottids.

## explicit_objective
State that pseudophyllidean tapeworms release eggs continuously through a uterine pore rather than shedding discrete gravid proglottids, unlike cyclophyllidean tapeworms.

## pitfalls
Assuming all tapeworms shed visible gravid proglottids in stool the way Taenia species do — pseudophyllidean cestodes instead release eggs directly through a uterine pore, so gravid segments are not a feature to look for.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Cestode general characters

## microtopic
Pseudophyllidea vs Cyclophyllidea

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Cestode general characters

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-172FA93BDEDACD

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q2: Regarding the gravid segments of pseudophyllidea, which of the following is true? / They are absent.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p1 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Aedes mosquitoes are the vector of yellow fever

## id
CON-INF-50D80179EC5358

## canonical_key
aedes.yellow-fever-vector

## aliases
Aedes yellow fever vector
Yellow fever transmission

## arabic_label


## arabic_aliases


## definition
Aedes mosquitoes, particularly Aedes aegypti, are the vector of yellow fever, a viral haemorrhagic disease. The same genus also transmits dengue fever, chikungunya and Zika virus, distinguishing it from Anopheles (malaria vector) and Culex (vector of diseases such as bird/avian malaria, Japanese encephalitis and Rift Valley fever alongside Aedes).

## explicit_objective
Identify Aedes as the mosquito vector of yellow fever, distinguishing it from Anopheles (malaria) and Culex.

## pitfalls
Confusing Aedes with Anopheles (the malaria vector) or Culex — each mosquito genus is tied to a distinct set of transmitted diseases and the pairing is commonly tested.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Medical entomology and vector control

## microtopic
Mosquito-borne disease vectors

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Medical entomology and vector control

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-50D80179EC5358

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q4: Yellow fever virus is transmitted by / b- Aedes.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p2 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Nematode digestive system is a complete tube with an anterior mouth bearing lips, teeth or plates and sensory papillae

## id
CON-INF-3CE26786A948DC

## canonical_key
nematoda.digestive-system.mouth-structures

## aliases
Nematode mouth structures
Nematode digestive tract

## arabic_label


## arabic_aliases


## definition
Nematodes (roundworms) possess a complete digestive tract running from an anterior mouth to a posterior anus. The mouth opening is provided with accessory structures — lips, teeth or cutting plates depending on the species — together with sensory papillae used to detect food and environmental cues, unlike trematodes and cestodes, which either use oral suckers or lack a mouth/gut altogether.

## explicit_objective
Describe the nematode mouth as bearing lips, teeth or plates plus sensory papillae, as part of a complete digestive tube.

## pitfalls
Assuming all helminths share the same mouth anatomy — trematodes have a mouth surrounded by an oral sucker and cestodes have no digestive tract at all, so the lips/teeth/plates/papillae description is specific to nematodes.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Nematode general characters

## microtopic
Nematode digestive system

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Nematode general characters

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-3CE26786A948DC

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Q8: Regarding the digestive system of nematoda, which of the following is true? / Mouth provided with the lips, teeth, plates and sensory papillae.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p3 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Nematode oesophagus is muscular in shape and structure

## id
CON-INF-53329B3104D544

## canonical_key
nematoda.oesophagus.muscular-structure

## aliases
Nematode oesophagus
Roundworm pharynx structure

## arabic_label


## arabic_aliases


## definition
The nematode oesophagus (pharynx) is a muscular tube that pumps ingested material into the intestine; its shape and structure are muscular throughout, in contrast to the variable, often non-muscular pharyngeal arrangements described for other helminth groups. This muscular oesophagus is one of several features (alongside a complete gut, separate sexes and lack of segmentation) used to characterise nematode general anatomy.

## explicit_objective
State that the nematode oesophagus is muscular in shape and structure.

## pitfalls
Assuming oesophageal structure is uniform and unimportant across helminth groups — it is one of the specific general characters used to identify nematodes on an exam.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Nematode general characters

## microtopic
Nematode oesophagus

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Nematode general characters

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-53329B3104D544

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Final38 Q1: Regarding the nematoda, which of the following is true? / Oesophagus is in the muscular shape and structure.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p5 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Trematode mouth is surrounded by an oral sucker

## id
CON-INF-5B6AB1F15D4973

## canonical_key
trematoda.general-characters.oral-sucker

## aliases
Trematode oral sucker
Fluke mouth structure

## arabic_label


## arabic_aliases


## definition
Trematodes (flukes) have a mouth surrounded by an oral sucker, which is used for attachment and feeding; most also carry a second, ventral (acetabulum) sucker further along the body. This contrasts with nematodes, whose mouth bears lips, teeth or plates rather than a sucker, and with cestodes, which have no mouth or gut at all.

## explicit_objective
Identify an oral sucker surrounding the mouth as a general character of trematodes.

## pitfalls
Confusing the trematode mouth (surrounded by a sucker) with the nematode mouth (bearing lips/teeth/plates) — the two helminth groups are distinguished on an exam by exactly this kind of general-character detail.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Trematode general characters

## microtopic
Trematode mouth and suckers

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Trematode general characters

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-5B6AB1F15D4973

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Final38 Q2: Regarding general characters of the trematodes, choose the correct answer / Mouth is surrounded by sucker.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p5 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Chemical control of adult mosquitoes includes skin-applied repellents such as citronella oil

## id
CON-INF-84B9B441DDB90B

## canonical_key
mosquito-control.chemical.adult-repellents

## aliases
Citronella mosquito repellent
Chemical control of adult mosquitoes

## arabic_label


## arabic_aliases


## definition
Chemical control aimed at the adult (flying) stage of mosquitoes includes repellents such as citronella oil applied directly to the skin, which deters adult mosquitoes from biting. This is distinct from chemical measures directed at the aquatic larval stage (such as larvicidal oils or Paris green spread on the water surface) and from physical/mechanical measures such as wire screening, which exclude adults without any chemical action.

## explicit_objective
Identify skin-applied chemical repellents such as citronella oil as a chemical method aimed at the adult mosquito stage.

## pitfalls
Confusing a chemical method aimed at the water-breeding larval stage (such as Paris green on the water surface) with one aimed at the flying adult stage, or confusing a chemical repellent with a purely physical/mechanical barrier such as wire screening.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Medical entomology and vector control

## microtopic
Mosquito control methods

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Medical entomology and vector control

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-84B9B441DDB90B

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Final38 Q4: Chemical methods used for control of mosquitoes adult stages including / Citronella oil repellants applied on the skin.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p6 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Conjugation in protozoa is exchange of nuclear material between two organisms

## id
CON-INF-1DBC9145781EB2

## canonical_key
protozoa.reproduction.conjugation

## aliases
Protozoal conjugation
Ciliate conjugation reproduction

## arabic_label


## arabic_aliases


## definition
Conjugation in protozoa is a form of sexual reproduction in which two organisms temporarily join and exchange nuclear (genetic) material before separating, each then continuing to reproduce asexually. This differs from binary fission (simple division of nucleus and cytoplasm into two daughter cells), from gamete formation (fusion of separate male and female sex cells), and from schizogony (multiple fission producing several daughter cells at once).

## explicit_objective
Define conjugation in protozoa as the exchange of nuclear material between two organisms.

## pitfalls
Confusing conjugation (exchange of nuclear material between two organisms) with binary fission (simple division into two) or with gamete formation (fusion of male and female sex cells) — each is a distinct reproductive mode tested separately.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Protozoal biology

## microtopic
Modes of protozoal reproduction

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Protozoal biology

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-1DBC9145781EB2

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Final38 Q5: Regarding the conjugation reproduction of the protozoa, choose the right statement / Occur by exchange of nuclear material between two organisms.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p6 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Cyclophyllidean cestodes develop a procercoid larval stage in the first intermediate host

## id
CON-INF-2EDF6DAB5B3A31

## canonical_key
cestodes.cyclophyllidea.procercoid-first-intermediate-host

## aliases
Cyclophyllidea procercoid stage
Cestode larval development sequence

## arabic_label


## arabic_aliases


## definition
In cyclophyllidean cestodes with an indirect life cycle, the oncosphere released from an ingested egg develops into a procercoid-type larval stage within the first intermediate host, which subsequently develops further (for example into a cysticercoid or cysticercus) in a second intermediate host or the same host, depending on species. Cyclophyllidean tapeworms are additionally characterised by an armed or unarmed scolex with (in many genera) a rostellum, four suckers, and eggs that are non-operculated and already contain a mature oncosphere (hexacanth embryo) when passed, unlike the non-operculated, immature eggs of pseudophyllideans, which require water for the miracidium... (see distinguishing concept for pseudophyllidea).

## explicit_objective
State that cyclophyllidean cestodes develop a procercoid-type larval stage within the first intermediate host.

## pitfalls
Confusing which larval stage (procercoid, cysticercoid, cysticercus) belongs in which intermediate host and for which cestode order — cyclophyllidean life cycles are commonly tested by asking where a specific larval stage develops.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Cestode general characters

## microtopic
Cyclophyllidea life cycle

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Cestode general characters

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-2EDF6DAB5B3A31

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Final38 Q8: Regarding Cyclophyllidea, choose the right statement / Larva stage of procercoid present in the 1st intermediate host.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p7 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Relapsing fever is a spirochetal disease transmitted by an arthropod vector

## id
CON-INF-768AEAC5AE25F6

## canonical_key
spirochetes.relapsing-fever.arthropod-transmission

## aliases
Relapsing fever transmission
Borrelia arthropod vector

## arabic_label


## arabic_aliases


## definition
Relapsing fever, caused by Borrelia species, is transmitted by an arthropod vector — the human body louse (epidemic/louse-borne relapsing fever) or soft ticks of the genus Ornithodoros (endemic/tick-borne relapsing fever). This distinguishes it from other spirochetal diseases such as syphilis (sexual/congenital transmission), pinta and yaws (direct skin contact), and leptospirosis (contact with water or soil contaminated by infected animal urine), none of which require an arthropod vector.

## explicit_objective
Identify relapsing fever as the spirochetal disease among common exam options that is transmitted by an arthropod vector (louse or soft tick).

## pitfalls
Assuming all spirochetal diseases share the same transmission route — syphilis, pinta, yaws and leptospirosis are each transmitted without an arthropod vector, while relapsing fever specifically requires one.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Medical entomology and vector control

## microtopic
Arthropod-borne spirochetal disease

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Medical entomology and vector control

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-768AEAC5AE25F6

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Final40 Q1: Which ONE of the following Spirochetal diseases is transmitted by an arthropod? / Relapsing fever.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p8 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Sporozoa move by gliding motility

## id
CON-INF-F2D178AB887530

## canonical_key
protozoa.sporozoa.gliding-movement

## aliases
Sporozoa gliding motility
Apicomplexan movement

## arabic_label


## arabic_aliases


## definition
Sporozoa (apicomplexan protozoa such as Plasmodium and Toxoplasma) lack the flagella, cilia or pseudopodia used by other protozoal groups and instead move by gliding motility, a distinctive substrate-dependent locomotion powered by an internal actin-myosin motor beneath the cell membrane. This differs from amoebae (pseudopodial/amoeboid movement), flagellates (flagellar movement) and ciliates such as Balantidium coli (ciliary movement).

## explicit_objective
Identify gliding as the characteristic mode of movement of sporozoa (apicomplexan protozoa).

## pitfalls
Assuming all protozoa move the same way — amoebae use pseudopodia, flagellates use flagella, ciliates use cilia, and sporozoa alone use gliding motility, a detail exams test directly.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Protozoal biology

## microtopic
Protozoal movement

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Protozoal biology

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-F2D178AB887530

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Final40 Q2: Which of the following parasites move by gliding? / Sporozoa.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p8 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Arthropods are defined by jointed (articulated) appendages

## id
CON-INF-4A4178411BC79C

## canonical_key
arthropoda.general-characters.jointed-appendages

## aliases
Arthropod jointed appendages
Articulated appendages

## arabic_label


## arabic_aliases


## definition
Arthropods (insects, arachnids, crustaceans) are characterised by paired, jointed (articulated) appendages attached to a segmented body with an external chitinous exoskeleton. This jointed-appendage feature is not shared by amoebae, flagellates, nematodes or cestodes, none of which have limbs of this kind, making it a defining structural feature used to identify the phylum.

## explicit_objective
Identify jointed (articulated) appendages as the defining structural feature of arthropods.

## pitfalls
Assuming any motile or segmented-looking organism qualifies as an arthropod — jointed, paired appendages specifically (not just a segmented body) are the defining feature that separates arthropods from nematodes or cestodes, which can also appear segmented or elongated.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Medical entomology and vector control

## microtopic
Arthropod general characters

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Medical entomology and vector control

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-4A4178411BC79C

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Final40 Q4: Which of the following have articulated appendages? / Arthropodes.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p9 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Enterobius vermicularis can be transmitted by autoinfection through perianal scratching

## id
CON-INF-A800464762DA96

## canonical_key
enterobius-vermicularis.transmission.autoinfection

## aliases
Enterobius autoinfection
Pinworm retroinfection

## arabic_label


## arabic_aliases


## definition
Enterobius vermicularis (the pinworm) is classically transmitted by autoinfection: the gravid female migrates out of the anus at night to lay eggs on the perianal skin, causing itching; scratching contaminates the fingers with infective eggs, which are then transferred back to the mouth (or, less commonly, the eggs hatch on the perianal skin and larvae migrate back through the anus, called retroinfection), re-establishing infection in the same host without leaving the body. Among common intestinal nematodes this direct person-to-person/self-to-self faecal-oral route via perianal eggs is distinctive to Enterobius, rather than requiring soil maturation as with Ascaris, Ancylostoma or Trichuris.

## explicit_objective
Identify Enterobius vermicularis as the intestinal nematode classically transmitted by autoinfection via perianal egg contamination.

## pitfalls
Assuming all intestinal nematodes share the same transmission route — Ascaris, Trichuris and hookworm eggs/larvae require a period of soil maturation before they become infective, while Enterobius eggs are infective almost immediately after being laid on perianal skin, enabling autoinfection.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Nematode life cycles

## microtopic
Enterobius vermicularis transmission

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Nematode life cycles

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-A800464762DA96

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Final40 Q8: Which of the following parasites can be transmitted by autoinfection? / Entrobius vermicularis.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p10 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
The flea is the intermediate host and vector of Dipylidium caninum

## id
CON-INF-927B0F320E9129

## canonical_key
dipylidium-caninum.life-cycle.flea-intermediate-host

## aliases
Dipylidium caninum flea vector
Dog tapeworm intermediate host

## arabic_label


## arabic_aliases


## definition
Dipylidium caninum, the double-pored dog tapeworm, uses the larval flea (dog or cat flea) as its intermediate host: the flea larva ingests Dipylidium eggs released from gravid proglottids (which resemble cucumber seeds and are shed intact in the faeces or perianal region of dogs and cats), and the parasite develops into a cysticercoid within the flea as it matures into an adult. Humans, most often young children in close contact with infested pets, become infected by accidentally swallowing an infected adult flea.

## explicit_objective
Identify the flea as both the intermediate host and vector required to complete the Dipylidium caninum life cycle.

## pitfalls
Assuming Dipylidium caninum is transmitted the way most other cestodes are (ingesting meat containing a cysticercus) — its unique flea-intermediate-host and accidental-flea-ingestion route, tied to dog/cat contact, is what distinguishes it on an exam.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Cestode life cycles

## microtopic
Dipylidium caninum

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Cestode life cycles

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-927B0F320E9129

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
VIP Q15 (image-linked to Q11 dog-tapeworm vignette): Which of the following insects is responsible for infection with the shown parasite? / Flea.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p20 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Ascaris lumbricoides can cause acute appendicitis by obstructing the appendiceal lumen

## id
CON-INF-248EE3163BB098

## canonical_key
ascaris-lumbricoides.appendicitis

## aliases
Ascaris appendicitis
Roundworm appendiceal obstruction

## arabic_label


## arabic_aliases


## definition
A migrating adult Ascaris lumbricoides worm can enter and mechanically obstruct the lumen of the vermiform appendix, precipitating acute appendicitis; this is a recognised surgical complication of ascariasis alongside — and sharing the same worm-bulk mechanism as — mechanical obstruction of the small intestine when a heavy worm burden forms a tangled bolus. Both complications reflect the size and motility of the adult worm rather than any toxin or invasive tissue damage.

## explicit_objective
Identify Ascaris lumbricoides as a recognised parasitic cause of acute appendicitis, alongside its better-known bowel-obstruction complication.

## pitfalls
Assuming appendicitis from a parasite must involve tissue invasion or inflammation from the organism itself — with Ascaris the mechanism is purely mechanical, a worm physically entering and obstructing the narrow appendiceal lumen.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Nematode clinical complications

## microtopic
Ascaris lumbricoides complications

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Nematode clinical complications

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-248EE3163BB098

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
VIP Q17: Acute appendicitis may occur as a complication of infection with which one of the following parasites? / Ascaris lumbricoides. VIP Q21: Which one of the following parasite cause appendicitis and intestitial obstruction / Ascaris lumbercoide.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p21 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Heterophyes heterophyes eggs can ectopically embolise to the heart or brain and cause cardiac or neurological symptoms

## id
CON-INF-FDB8D023058A73

## canonical_key
heterophyes-heterophyes.ectopic-egg-embolisation

## aliases
Heterophyes ectopic embolism
Heterophyiasis cardiac complication

## arabic_label


## arabic_aliases


## definition
Heterophyes heterophyes normally lives as a small intestinal fluke acquired by eating raw or undercooked brackish-water fish; occasionally its eggs penetrate the intestinal mucosa, enter the mesenteric venules, and are carried by the bloodstream to ectopic sites such as the heart (valves, myocardium) or brain, where they provoke a granulomatous reaction that can produce cardiac valvular disease or focal neurological deficits mimicking a stroke. This ectopic embolisation is a well-recognised, if uncommon, complication of heterophyiasis, particularly relevant in fish-eating populations along the Nile delta and similar endemic regions.

## explicit_objective
Recognise ectopic egg embolisation to the heart or brain as an uncommon but recognised complication of Heterophyes heterophyes infection in patients with a history of eating raw or undercooked brackish-water fish.

## pitfalls
Overlooking parasitic causes of stroke-like or cardiac presentations in patients with a fish-eating occupational or dietary history — Heterophyes heterophyes eggs reaching the heart or brain via the bloodstream is an atypical but tested cause.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Trematode clinical complications

## microtopic
Heterophyes heterophyes

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Trematode clinical complications

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-FDB8D023058A73

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
VIP Q18: A 65-year-old fisherman...weakness and inability to move his left arm and leg. Which of the following parasites is expected to cause this condition? / Heterophys heterophys.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p21 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Stoll's dilution egg-counting technique quantifies heavy helminth egg output such as Ascaris lumbricoides

## id
CON-INF-9EDAD9EDF18E23

## canonical_key
diagnostics.stolls-technique.egg-count

## aliases
Stoll's egg count technique
Quantitative stool egg counting

## arabic_label


## arabic_aliases


## definition
Stoll's dilution egg-counting technique is a quantitative stool examination method that dilutes a weighed stool sample in measured volumes of dilute sodium hydroxide, then counts eggs in a small aliquot to calculate eggs per gram of stool. It is used to estimate the intensity of infection with helminths that shed large numbers of eggs, such as Ascaris lumbricoides, rather than for organisms with low or intermittent egg output, for which a concentration technique is preferred instead.

## explicit_objective
Identify Stoll's dilution egg-counting technique as a quantitative method used to estimate the intensity of infection with heavy-egg-output helminths such as Ascaris lumbricoides.

## pitfalls
Assuming any stool examination method works equally well for every helminth — quantitative dilution counting such as Stoll's technique is suited to heavy, reliably high egg-output species like Ascaris, not to organisms with scanty or intermittent egg shedding.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Diagnostic techniques

## microtopic
Quantitative stool examination

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Diagnostic techniques

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-9EDAD9EDF18E23

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
VIP Q19: Stoll's technique can be used in the diagnosis of infection by which of the following parasites? / Ascaris lumbricoides.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p22 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Nitazoxanide is a broad-spectrum antiparasitic effective against Ascaris lumbricoides

## id
CON-INF-7CD4E349E7FBBD

## canonical_key
pharmacology.nitazoxanide.broad-spectrum-antiparasitic

## aliases
Nitazoxanide antihelminthic activity
Broad-spectrum antiparasitic drug

## arabic_label


## arabic_aliases


## definition
Nitazoxanide is a broad-spectrum antiparasitic (thiazolide) agent that interferes with the pyruvate:ferredoxin oxidoreductase enzyme pathway essential to anaerobic energy metabolism in a wide range of protozoa and helminths, including documented efficacy against Ascaris lumbricoides as well as against Giardia lamblia and Cryptosporidium. This broad coverage distinguishes it from narrower-spectrum drugs such as triclabendazole (Fasciola-specific) or praziquantel (cestodes and trematodes), and makes it a useful option when broad antiparasitic coverage is clinically desired.

## explicit_objective
Identify nitazoxanide as a broad-spectrum antiparasitic agent with documented efficacy against Ascaris lumbricoides.

## pitfalls
Assuming nitazoxanide's role is limited to protozoal infections such as giardiasis or cryptosporidiosis — it also has documented activity against helminths, including Ascaris lumbricoides.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Antiparasitic pharmacology

## microtopic
Broad-spectrum antiparasitic agents

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Antiparasitic pharmacology

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-7CD4E349E7FBBD

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
VIP Q22: Which one of the following is the best treatment of this parasite / nitazoxanide.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p23 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Trichomonas vaginalis vaginitis classically presents with frothy, malodorous, yellow-green discharge and is treated with metronidazole

## id
CON-INF-7F71E04B423304

## canonical_key
trichomonas-vaginalis.presentation-and-treatment

## aliases
Trichomoniasis presentation
Metronidazole for trichomoniasis

## arabic_label


## arabic_aliases


## definition
Trichomonas vaginalis infection classically presents with a frothy, malodorous, yellow-green (or yellowish) vaginal discharge accompanied by vulvar itching, burning and dysuria; the diagnosis is a common cause of vaginal discharge in sexually active women, including in pregnancy. First-line treatment is metronidazole (a 5-nitroimidazole), which is active against Trichomonas trophozoites, distinguishing it from antihelminthics such as praziquantel or bithionol, which have no activity against this protozoan.

## explicit_objective
Recognise the classic frothy, malodorous, yellow-green discharge of trichomoniasis and identify metronidazole as its first-line treatment.

## pitfalls
Reaching for an antihelminthic drug (praziquantel, bithionol) for a vaginal-discharge vignette — Trichomonas vaginalis is a protozoan, not a helminth, and requires an antiprotozoal agent such as metronidazole.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Protozoal STIs

## microtopic
Trichomonas vaginalis

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Protozoal STIs

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-7F71E04B423304

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
VIP Q36: 27-year-old married female...offensive frothy yellowish vaginal discharge...Which one of the following drugs is suitable for treatment? / Metronidazole. VIP Q40A: probable diagnosis of frothy yellowish-green vaginal discharge / Trichomoniasis.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p25 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Trichomoniasis is a sexually transmitted disease caused by a protozoan

## id
CON-INF-060A6A2C245739

## canonical_key
trichomonas-vaginalis.classification.std-protozoan

## aliases
Trichomoniasis is an STD
Trichomonas vaginalis classification

## arabic_label


## arabic_aliases


## definition
Trichomoniasis is a curable sexually transmitted disease caused by the flagellated protozoan Trichomonas vaginalis, which exists only as a trophozoite (it has no cyst stage). Both men and women can be infected and both can be symptomatic, though infection is frequently asymptomatic or under-recognised in men, and diagnosis relies on identifying trophozoites in vaginal/urethral secretions rather than on stool examination, since the organism does not inhabit the gastrointestinal tract.

## explicit_objective
Classify trichomoniasis as a curable, sexually transmitted protozoal infection with no cyst stage.

## pitfalls
Assuming trichomoniasis is incurable, that it is caused by a cyst form, that only women show symptoms, or that stool examination aids its diagnosis — all are common false statements the exam distractors are built from; the correct summary is that it is a curable STD caused by a trophozoite-only protozoan.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Protozoal STIs

## microtopic
Trichomonas vaginalis classification

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Protozoal STIs

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-060A6A2C245739

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
VIP Q37: Which of the following statements is TRUE about trichomoniasis? / It is sexually transmitted disease caused by protozoon.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p26 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Trichomonas vaginalis has no cyst stage and can spread by fomites such as shared contaminated towels

## id
CON-INF-8CDA04361321A1

## canonical_key
trichomonas-vaginalis.transmission.fomite-route

## aliases
Trichomonas fomite transmission
Trichomonas towel transmission

## arabic_label


## arabic_aliases


## definition
Trichomonas vaginalis exists only as a trophozoite, with no resistant cyst stage; while its principal route of transmission is sexual contact, the trophozoite can survive briefly outside the body in a moist, warm environment, allowing transmission by fomites such as shared damp towels or contaminated bathing articles. This distinguishes it from cyst-forming protozoa such as Giardia or Entamoeba histolytica, whose environmentally resistant cysts (not fomite contact by a fragile trophozoite) are the infective form.

## explicit_objective
State that Trichomonas vaginalis, lacking a cyst stage, can be transmitted non-sexually by fomites such as contaminated towels.

## pitfalls
Assuming Trichomonas vaginalis is transmitted by ingesting a mature cyst, oocyst or trophozoite the way Giardia, Toxoplasma or Entamoeba are — Trichomonas has no cyst stage at all, and its non-sexual route is direct fomite contact, not ingestion.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Protozoal STIs

## microtopic
Trichomonas vaginalis transmission

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Protozoal STIs

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-8CDA04361321A1

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
VIP Q40C: What is the mode of infection of this parasite? / using of contaminated towels.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p28 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
The burrow is the most characteristic skin lesion of scabies

## id
CON-INF-7EB4D0962FEFB5

## canonical_key
scabies.clinical-features.burrow

## aliases
Scabies burrow lesion
Sarcoptes scabiei burrow

## arabic_label


## arabic_aliases


## definition
The burrow — a thin, greyish, thread-like tunnel a few millimetres to a centimetre long, produced by the female Sarcoptes scabiei mite as it tunnels through the epidermis to lay eggs — is the most characteristic and specific skin lesion of scabies, typically found in the finger web spaces, wrists and other thin-skinned sites. Other findings such as papules, vesicles or secondary excoriation/impetiginisation can accompany scabies but are non-specific and seen in many other dermatoses.

## explicit_objective
Identify the burrow as the pathognomonic, most characteristic lesion of scabies.

## pitfalls
Treating any itchy papule or vesicle as diagnostic of scabies — these are non-specific findings seen in many skin conditions; the burrow is the one lesion that is specific to scabies.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Ectoparasites

## microtopic
Scabies clinical features

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Ectoparasites

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-7EB4D0962FEFB5

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
VIP Q38: Which of the following is the most characteristic lesion of scabies? / Burrow.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p26 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Dermoscopy can confirm the diagnosis of scabies by visualising the mite and its burrow

## id
CON-INF-445D9FFE93AA10

## canonical_key
scabies.diagnosis.dermoscopy

## aliases
Scabies dermoscopy diagnosis
Non-invasive scabies confirmation

## arabic_label


## arabic_aliases


## definition
Dermoscopy is a non-invasive method that can confirm a clinical diagnosis of scabies by directly visualising the mite (classically described as a small triangular structure, the 'delta-wing jet' sign, at the end of a burrow) and the burrow itself, without needing to physically extract the mite. It is increasingly used alongside, or in place of, traditional skin scraping and light microscopy, which remains the classic definitive test but requires successfully sampling a mite from a burrow.

## explicit_objective
Identify dermoscopy as a method that can confirm scabies diagnosis by directly visualising the mite and burrow.

## pitfalls
Assuming diagnosis of an interdigital/wrist itching-with-burrows presentation requires blood, serological, stool or intradermal testing — none of these detect an ectoparasite living in the epidermis; dermoscopy (or skin scraping) directly visualises the mite instead.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Ectoparasites

## microtopic
Scabies diagnosis

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Ectoparasites

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-445D9FFE93AA10

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
VIP Q39: ...interdigital tortuous grayish tunnels...Which of the following methods is the most likely to confirm the diagnosis? / Dermoscopy.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p27 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
House dust mites are a major inhalant allergen that can cause allergic dyspnea and asthma

## id
CON-INF-3A24FA64478498

## canonical_key
house-dust-mite.allergy.dyspnea

## aliases
House dust mite allergy
Dust mite asthma

## arabic_label


## arabic_aliases


## definition
House dust mites (Dermatophagoides species) are microscopic arachnids that live in household dust, feeding on shed human skin cells; their faecal particles and body fragments are one of the most important perennial inhalant allergens worldwide, triggering IgE-mediated allergic reactions in sensitised individuals that present as allergic rhinitis, allergic asthma with dyspnea and wheeze, and atopic dermatitis. This distinguishes house dust mites, an allergenic (not infective) exposure, from the tissue-invasive helminths and flukes that cause dyspnea through a different, migratory-larval or space-occupying mechanism.

## explicit_objective
Identify house dust mites as a major inhalant allergen that can cause allergic dyspnea/asthma.

## pitfalls
Assuming dyspnea in a differential of parasites must come from an invasive helminth's pulmonary migration — house dust mite exposure causes dyspnea through an entirely different, IgE-mediated allergic mechanism rather than tissue invasion.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Ectoparasites and arthropod allergens

## microtopic
House dust mite allergy

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Ectoparasites and arthropod allergens

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-3A24FA64478498

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
VIP Q41: Which of the following could be a cause of dyspnea in this patient? / Dust mites.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p28 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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

---

# Item

## label
Mebendazole is a first-line drug for treating ascariasis

## id
CON-INF-5DEF7DC5808AFF

## canonical_key
pharmacology.mebendazole.ascariasis-treatment

## aliases
Mebendazole for Ascaris
Ascariasis first-line drug

## arabic_label


## arabic_aliases


## definition
Mebendazole, a benzimidazole antihelminthic, is a standard first-line drug for treating ascariasis; it acts by binding parasite beta-tubulin, blocking microtubule polymerisation and glucose uptake in the worm, which kills the adult Ascaris lumbricoides. It is also effective against several other soil-transmitted helminths (Trichuris trichiura, hookworm species), distinguishing it from niclosamide and praziquantel, which are directed at cestodes, and from metronidazole, an antiprotozoal with no activity against roundworms.

## explicit_objective
Identify mebendazole as a first-line benzimidazole antihelminthic for treating ascariasis.

## pitfalls
Reaching for niclosamide, praziquantel or metronidazole to treat ascariasis — niclosamide and praziquantel target cestodes and metronidazole targets protozoa, none of which are effective against Ascaris lumbricoides.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
inf

## primary_node_id
DIS-PAR

## secondary_node_ids


## topic
Parasitology

## subtopic
Antiparasitic pharmacology

## microtopic
Ascariasis treatment

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Parasitology Past Exams > Antiparasitic pharmacology

## article_ids
ART-MU102-PARASITOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_a3dfb2b383711f049084

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
CLM-INF-5DEF7DC5808AFF

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
VIP Q14B: Which of the following is the best drug for her treatment? / Mebendazole.

## exam_signal
mu_a3dfb2b383711f049084 | paper | | p20 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
sourceCandidateIds: find-existing.mjs run for the concept's own key terms against live state and every pending batch — no candidate record exists; see coverage/MU-MED102-triage.md's Parasitology Past Exams addendum for the full search log.

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
# Item

## label
Benign and malignant tumours are distinguished by a fixed set of gross and microscopic criteria: capsulation, growth rate, mitoses, uniformity and consistency

## id
CON-FND-3FA6B2697B1A65

## canonical_key
neoplasia.classification.benign-vs-malignant-features

## aliases
Benign vs malignant tumour criteria
Gross criteria of malignancy

## arabic_label


## arabic_aliases


## definition
Benign tumours are typically capsulated or well-circumscribed, slow-growing, non-infiltrative, rarely recurrent, and composed of uniform cells with few mitoses; malignant tumours are the opposite on every axis -- poorly defined and fixed to surrounding tissue by infiltrative growth, rapidly growing, richly mitotic, pleomorphic, and firm/hard on palpation rather than soft. A malignant ulcer classically has raised, everted edges (the tumour grows outward and undermines the adjacent skin), the reverse of an inverted-edge description.

## explicit_objective
State the paired gross/microscopic criteria (capsulation, growth rate, mitotic activity, nuclear uniformity, consistency, ulcer-edge shape) that separate a benign from a malignant tumour, and identify the everted (not inverted) edge of a malignant ulcer.

## pitfalls
Assuming any firm, fixed mass is automatically malignant without weighing the full criteria set; reversing "everted" and "inverted" when describing a malignant ulcer's edge.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Neoplasia, tumour morphology

## microtopic
Benign vs malignant gross/microscopic criteria

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-3FA6B2697B1A65

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
III- The expected microscopic picture of the breast in the above case is / Carcinoma

## exam_signal
mu_11999c1093082353caec | paper | | p1 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "malignant tumor fixed to surrounding", "everted edges malignant ulcer" -- no exact-grain hit; minted fresh, consolidating four related items (III microscopic picture=carcinoma, IV gross consistency=hard, malignant-vs-benign growth characteristics, malignant ulcer edge shape) into one benign-vs-malignant-criteria teaching unit.

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

---

# Item

## label
Malignant tumours spread by direct extension, lymphatic permeation/embolization, haematogenous (blood) spread, transcoelomic seeding and implantation

## id
CON-FND-C1698A4BEA1C38

## canonical_key
neoplasia.spread.routes-of-malignant-tumours

## aliases
Routes of tumour spread
Lymphatic permeation
Peau d'orange

## arabic_label


## arabic_aliases


## definition
Malignant tumours reach new sites by five recognised routes: direct (local) extension into adjacent tissue; lymphatic spread, either permeation (tumour growing along lymphatic channels, producing the orange-peel/peau d'orange skin change of breast carcinoma) or embolization (tumour emboli carried to regional nodes); haematogenous (blood) spread to distant organs; transcoelomic seeding across a body cavity lined by serous membrane (peritoneum, pleura); and implantation, the accidental transfer of tumour cells at surgery. Simple ulceration of a tumour through skin or mucosa is a local complication of growth, not itself one of these distant-spread routes.

## explicit_objective
Name the five routes of malignant spread (direct, lymphatic permeation/embolization, haematogenous, transcoelomic, implantation), and recognise that a locally invasive breast carcinoma with axillary nodal metastasis demonstrates both direct and lymphatic spread together.

## pitfalls
Treating tumour ulceration through the skin as a distinct spread route rather than a local growth complication; conflating lymphatic permeation (growth along the vessel) with lymphatic embolization (detached emboli).

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Neoplasia, tumour morphology

## microtopic
Routes of malignant spread

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-C1698A4BEA1C38

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
I- The route of malignant spread in this case is: / Direct and lymphatic spread

## exam_signal
mu_11999c1093082353caec | paper | | p1 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "lymphatic permeation", "transcoelomic spread", "distant spread routes" -- no exact-grain hit; minted fresh, consolidating four spread-route items (direct+lymphatic breast route, distant-spread-routes-except-ulcer, transcoelomic definition, lymphatic permeation/peau d'orange) into one routes-of-spread teaching unit.

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

---

# Item

## label
Local invasion proceeds through cell-cell detachment, extracellular matrix degradation and migration; a locally malignant tumour (e.g. basal cell carcinoma) spreads only this way and, unlike a sarcoma, a carcinoma passes through an in-situ phase before invading

## id
CON-FND-3FBC08E9F663B5

## canonical_key
neoplasia.invasion-and-local-spread.cascade-and-locally-malignant-tumours

## aliases
Steps of ECM invasion
Locally malignant tumour
Sarcoma has no in-situ phase

## arabic_label


## arabic_aliases


## definition
Local tissue invasion by a malignant cell proceeds through an ordered cascade: cell-cell detachment (loss of adhesion molecules such as E-cadherin), degradation of the extracellular matrix by enzymes including matrix metalloproteinases, and migration of the tumour cell through the newly opened matrix, before intravasation into a vessel. A locally malignant tumour (the classic example is basal cell carcinoma / rodent ulcer) is capable only of this local, infiltrative spread and does not metastasize to distant sites. Carcinomas typically pass through a recognised in-situ (pre-invasive) phase before they invade; sarcomas, arising from mesenchymal tissue, have no equivalent in-situ phase and are invasive from the outset.

## explicit_objective
Sequence the steps of local ECM invasion (detachment, matrix degradation, migration), define a locally malignant tumour as one that spreads only locally without distant metastasis, and state that sarcomas -- unlike carcinomas -- have no in-situ phase.

## pitfalls
Assuming a 'locally malignant' tumour cannot metastasize because it is not fully malignant, rather than recognising it simply lacks the capacity for distant spread; assuming all malignant tumours pass through an in-situ phase, when this is a carcinoma-specific pattern that sarcomas do not share.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Neoplasia, tumour morphology

## microtopic
Invasion cascade and locally malignant behaviour

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-3FBC08E9F663B5

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
II- One of the steps included in the Invasion of Extracellular Matrix is: / Cell-cell detachment

## exam_signal
mu_11999c1093082353caec | paper | | p1 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "cell to cell detachment invasion", "matrix metalloproteinase invasion", "sarcoma in situ component" -- no exact-grain hit; minted fresh, consolidating the ECM-invasion-cascade step, the MMP-degradation step, and the locally-malignant/sarcoma-no-in-situ-phase facts into one invasion-and-local-spread teaching unit.

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

---

# Item

## label
Neoplasia is defined by autonomous, uncontrolled, purposeless and irreversible growth, spontaneous in onset

## id
CON-FND-50C0FF522228AB

## canonical_key
neoplasia.definition.general-criteria

## aliases
Definition of neoplasia
Criteria of neoplasm

## arabic_label


## arabic_aliases


## definition
Neoplasia is new tissue growth that is autonomous (independent of the normal stimulus that provoked it and that would normally control it), uncontrolled, purposeless to the host, spontaneous in onset, and -- once established -- irreversible; it does not regress when the inciting stimulus is removed, unlike a reversible adaptive change such as hypertrophy or hyperplasia.

## explicit_objective
List the defining general criteria of neoplasia (autonomous, uncontrolled, purposeless, spontaneous, irreversible) and identify irreversibility, not reversibility, as a true criterion.

## pitfalls
Describing neoplastic growth as reversible by analogy with physiological/adaptive hypertrophy or hyperplasia, which do regress once their stimulus is removed.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Neoplasia, tumour morphology

## microtopic
General criteria of neoplasia

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-50C0FF522228AB

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Regarding general criteria of neoplasm, one of the followings is wrong: / Reversible

## exam_signal
mu_11999c1093082353caec | paper | | p12 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "neoplasia autonomous" -- no exact-grain hit; minted fresh, consolidating the autonomous-growth item and the irreversibility item into one general-criteria-of-neoplasia teaching unit.

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

---

# Item

## label
A benign tumour can still be dangerous when its site threatens life or vital structures -- pituitary adenoma, cardiac myxoma/rhabdomyoma, oesophageal and ureteric benign tumours -- unlike a forearm lipoma

## id
CON-FND-8D2E84B262B674

## canonical_key
neoplasia.classification.benign-dangerous-by-site

## aliases
Benign dangerous tumour
Site-dependent danger of benign tumours

## arabic_label


## arabic_aliases


## definition
A tumour's histological benignity does not guarantee it is harmless: a benign tumour arising in a site with limited space or vital function -- the pituitary gland (mass effect, hormone excess), the heart (myxoma, rhabdomyoma obstructing flow), the oesophagus or ureter (luminal obstruction) -- is classed as benign-but-dangerous. A benign tumour in an accommodating site with no vital structure nearby, such as a forearm lipoma, remains benign-non-dangerous.

## explicit_objective
Classify a benign tumour as dangerous or non-dangerous by its site (pituitary, cardiac, oesophageal, ureteric = dangerous; forearm/subcutaneous lipoma = non-dangerous), not by its histology alone.

## pitfalls
Assuming "benign" is synonymous with "harmless" regardless of location, or conversely assuming every benign tumour needs the same urgency of treatment as its histologically identical counterpart in a safer site.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Neoplasia, tumour morphology

## microtopic
Benign-dangerous vs benign-non-dangerous tumours

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-8D2E84B262B674

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
The following list for benign dangerous tumors except / Lipoma

## exam_signal
mu_11999c1093082353caec | paper | | p2 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "benign dangerous tumor" -- no exact-grain hit; minted fresh, reused for the benign-non-dangerous-tumor item and the pituitary-adenoma-category item (same site-based classification fact tested three ways).

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

---

# Item

## label
Irritation (reactive) hyperplasia is the lymphoid tissue response to local infection or chronic irritation, e.g. cervical lymph node enlargement draining tonsillitis

## id
CON-FND-B97C8B88006F68

## canonical_key
hyperplasia.lymphoid.irritation-reactive

## aliases
Irritative hyperplasia
Reactive lymphoid hyperplasia

## arabic_label


## arabic_aliases


## definition
Irritation (also called irritative or reactive) hyperplasia is the increase in lymphoid tissue cellularity -- germinal centre expansion, increased lymphocytes and macrophages -- that follows local infection or chronic irritation draining to a lymph node; a cervical lymph node enlarging while draining tonsillitis is the classic example, distinct from hormonal hyperplasia (driven by a hormone) or compensatory hyperplasia (replacing lost tissue mass).

## explicit_objective
Name irritation/reactive hyperplasia as the lymphoid response to local infection draining to a node, and distinguish it from hormonal and compensatory hyperplasia by its trigger.

## pitfalls
Confusing irritation hyperplasia (infection-driven, lymphoid) with compensatory hyperplasia (mass-replacement-driven, e.g. bone marrow after haemorrhage) or hormonal hyperplasia (hormone-driven, e.g. breast in pregnancy).

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Cellular adaptation

## microtopic
Types of hyperplasia

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-B97C8B88006F68

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Enlarged cervical lymph node draining non-specific tonsillitis represents one of the following processes / Irritation hyperplasia

## exam_signal
mu_11999c1093082353caec | paper | | p2 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "irritation hyperplasia" -- no exact-grain hit; minted fresh, reused for the child-tonsillitis vignette (p3-4) and the p13 repeat of the antigenic-stimulation-lymphoid-hyperplasia item (three vignettes, one fact).

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

---

# Item

## label
Adaptive (compensatory) hypertrophy of the left ventricle develops in sustained pressure overload, such as poorly controlled hypertension or aortic valve stenosis

## id
CON-FND-99338FF75CDD15

## canonical_key
hypertrophy.cardiac.adaptive-pressure-overload

## aliases
Adaptive cardiac hypertrophy
Pressure-overload hypertrophy

## arabic_label


## arabic_aliases


## definition
Sustained pressure overload on the left ventricle -- from long-standing, poorly controlled hypertension or from aortic valve stenosis -- drives adaptive (compensatory) hypertrophy: individual myocyte enlargement (not hyperplasia, since mature cardiomyocytes are permanent cells) that increases wall thickness and contractile force to maintain cardiac output against the raised afterload.

## explicit_objective
Identify adaptive/compensatory hypertrophy, not hyperplasia or atrophy, as the expected left ventricular response to sustained pressure overload from uncontrolled hypertension or aortic stenosis.

## pitfalls
Selecting hyperplasia rather than hypertrophy for a pressure-overloaded left ventricle -- cardiomyocytes are permanent, post-mitotic cells and enlarge rather than divide.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Cellular adaptation

## microtopic
Cardiac hypertrophy

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-99338FF75CDD15

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
In case of aortic valve stenosis, left ventricle is affected by / Adaptive hypertrophy

## exam_signal
mu_11999c1093082353caec | paper | | p3 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "adaptive hypertrophy" -- no exact-grain hit; minted fresh, reused for the p9 hypertension-left-ventricle vignette (same fact, two stems).

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

---

# Item

## label
Papilloma is the benign tumour arising from protective (squamous or transitional) epithelium

## id
CON-FND-3CA8E4A473D9A2

## canonical_key
neoplasia.papilloma.benign-tumour-of-protective-epithelium

## aliases
Papilloma definition

## arabic_label


## arabic_aliases


## definition
A papilloma is a benign tumour of protective epithelium -- stratified squamous or transitional epithelium -- growing as finger-like fronds covered by that epithelium; it is distinguished from an adenoma, which is the benign tumour of glandular (secretory) epithelium.

## explicit_objective
Identify papilloma as the benign tumour of protective epithelium, as opposed to adenoma (glandular epithelium).

## pitfalls
Confusing papilloma (protective epithelium) with adenoma (glandular epithelium) as the benign epithelial tumour category.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Neoplasia, tumour morphology

## microtopic
Classification of benign epithelial tumours

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-3CA8E4A473D9A2

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Benign tumor of protective epithelium is one of the followings: / Papilloma

## exam_signal
mu_11999c1093082353caec | paper | | p4 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "papilloma protective epithelium" -- no exact-grain hit; minted fresh.

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

---

# Item

## label
Physiologic hypertrophy of the heart develops in trained athletes as an adaptive response to sustained exercise, distinct from pathologic hypertrophy or hyperplasia

## id
CON-FND-DEDC6702151712

## canonical_key
hypertrophy.cardiac.physiologic-athletic

## aliases
Athletic heart
Physiologic cardiac hypertrophy

## arabic_label


## arabic_aliases


## definition
Regular, sustained exercise (as in a trained marathon runner) drives physiologic hypertrophy of the heart -- an adaptive, reversible increase in myocyte size in response to a normal physiological demand -- distinct from the pathologic hypertrophy of chronic pressure overload (hypertension, valve disease) and from skeletal muscle, which under the same training stimulus also undergoes physiologic hypertrophy, not hyperplasia or atrophy.

## explicit_objective
Identify physiologic hypertrophy of the heart as the expected finding at autopsy in a trained athlete, distinguishing it from pathologic hypertrophy and from atrophy or hyperplasia of skeletal muscle.

## pitfalls
Assuming any cardiac hypertrophy found at autopsy is pathologic; missing that skeletal muscle in a trained athlete is also physiologically hypertrophied, not atrophied.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Cellular adaptation

## microtopic
Physiologic vs pathologic hypertrophy

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-DEDC6702151712

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
A 35-year-old marathon runner died in a motor vehicle accident... which feature could be identified? / Physiologic hypertrophy of the heart

## exam_signal
mu_11999c1093082353caec | paper | | p5 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "physiologic hypertrophy athlete" -- no exact-grain hit; minted fresh.

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

---

# Item

## label
Neuropathic (denervation) atrophy follows loss of the motor nerve supply to skeletal muscle, as in poliomyelitis

## id
CON-FND-789151DCC72B5C

## canonical_key
atrophy.neuropathic.denervation

## aliases
Denervation atrophy
Neuropathic atrophy

## arabic_label


## arabic_aliases


## definition
Neuropathic atrophy is skeletal muscle wasting that follows loss of its motor nerve supply; poliomyelitis, which destroys anterior horn motor neurons, is a classic cause, producing atrophy of the muscle fibres those neurons innervated -- one of the five recognised patterns of localized pathological atrophy alongside disuse, pressure, vascular and hormonal atrophy.

## explicit_objective
Identify neuropathic (denervation) atrophy as the pattern of muscle wasting caused by motor nerve loss, as in poliomyelitis.

## pitfalls
Confusing neuropathic atrophy (nerve-supply loss) with disuse atrophy (immobilisation with an intact nerve supply) as the mechanism in a paralytic illness.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Cellular adaptation

## microtopic
Patterns of pathological atrophy

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-789151DCC72B5C

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Which type of atrophy occurs in poliomyelitis patients? / Neuropathic

## exam_signal
mu_11999c1093082353caec | paper | | p6 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "neuropathic atrophy" -- no exact-grain hit; minted fresh.

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

---

# Item

## label
A deeply located malignant tumour carries a worse prognosis than an equivalent superficial tumour

## id
CON-FND-1F5740488C3831

## canonical_key
neoplasia.prognosis.depth-and-site

## aliases
Tumour depth and prognosis

## arabic_label


## arabic_aliases


## definition
Among the factors affecting a malignant tumour's prognosis, depth of location matters: a deeply located tumour tends to be diagnosed later, is harder to resect completely, and has more anatomical routes for local spread, giving it a worse prognosis than an otherwise comparable superficial tumour.

## explicit_objective
State that deep tumour location, not early stage, superficial site, prior therapy or good differentiation, is associated with a worse prognosis.

## pitfalls
Overlooking depth/site as an independent prognostic factor distinct from grade and stage.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Neoplasia, tumour morphology

## microtopic
Prognostic factors of malignant tumours

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-1F5740488C3831

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Tumor with poor prognosis is: / Deeply located tumors

## exam_signal
mu_11999c1093082353caec | paper | | p7 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "poor prognosis deep tumor" -- no exact-grain hit; minted fresh.

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

---

# Item

## label
A colonic adenomatous polyp with mild atypia is a precancerous lesion that can be single or multiple and can occur in any part of the colon

## id
CON-FND-710D9ECA1D16CB

## canonical_key
neoplasia.colon.adenomatous-polyp

## aliases
Colonic adenoma
Precancerous colon polyp

## arabic_label


## arabic_aliases


## definition
A colonic biopsy showing proliferated glands with mild atypia and no necrosis or haemorrhage is an adenoma (adenomatous polyp) of the colon -- a precancerous lesion, meaning it carries malignant potential without yet being invasive carcinoma. It can occur as a single lesion or multiple synchronous lesions, and can arise in any part of the colon; describing it as "not precancerous" is the false statement about this entity.

## explicit_objective
Recognise a mildly atypical, non-necrotic, non-haemorrhagic proliferated-gland colonic biopsy as adenoma, and identify it as precancerous, potentially single or multiple, and possible in any colonic segment.

## pitfalls
Describing a colonic adenoma as "not precancerous" -- its defining clinical significance is exactly its malignant potential.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Neoplasia, tumour morphology

## microtopic
Colonic adenomatous polyp

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-710D9ECA1D16CB

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
B. One of the following criteria regarding this tumor is wrong (colon biopsy, mild atypia, no necrosis/haemorrhage) / Not precancerous

## exam_signal
mu_11999c1093082353caec | paper | | p7 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "colonic adenoma precancerous" -- no exact-grain hit; minted fresh. Part A of this same vignette ("What is your diagnosis?") is a free-text fill-in, out of MCQ scope, not authored.

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

---

# Item

## label
Hormonal hyperplasia of breast glandular epithelium occurs in pregnancy and lactation, driven by prolactin

## id
CON-FND-F2C66A27C1A304

## canonical_key
hyperplasia.breast.hormonal-pregnancy-lactation

## aliases
Hormonal hyperplasia, breast
Pregnancy breast changes

## arabic_label


## arabic_aliases


## definition
During pregnancy and especially the third trimester, rising prolactin secretion from the pituitary gland stimulates breast glandular epithelial cells to undergo hormonal hyperplasia -- an increase in secretory cell numbers -- enabling milk production; this is a physiological, reversible hyperplasia driven by a hormone, distinct from irritation or compensatory hyperplasia.

## explicit_objective
Identify hormonal hyperplasia (not hypertrophy, atrophy, dysplasia or metaplasia) as the breast glandular epithelial response to prolactin in late pregnancy.

## pitfalls
Selecting hypertrophy instead of hyperplasia for a glandular epithelial response -- glandular cells are labile/stable and can increase in number under hormonal drive, unlike the cardiomyocyte example of hypertrophy.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Cellular adaptation

## microtopic
Types of hyperplasia

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-F2C66A27C1A304

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
During the third trimester of pregnancy, prolactin secretion... glandular epithelial cells... respond by undergoing: / Hyperplasia

## exam_signal
mu_11999c1093082353caec | paper | | p8 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "hormonal hyperplasia pregnancy breast" -- no exact-grain hit; minted fresh.

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

---

# Item

## label
A prolactin-secreting pituitary adenoma (prolactinoma) presents with galactorrhoea and menstrual irregularity from hyperprolactinaemia

## id
CON-FND-0DDDB3966D0CB3

## canonical_key
neoplasia.pituitary.prolactinoma

## aliases
Prolactinoma
Pituitary adenoma, prolactin-secreting

## arabic_label


## arabic_aliases


## definition
A prolactinoma is a benign pituitary adenoma that autonomously secretes prolactin; the resulting hyperprolactinaemia produces galactorrhoea (milky nipple discharge, often bilateral) and menstrual irregularity by suppressing gonadotropin-releasing hormone, and MRI shows anterior pituitary enlargement. Histologically it is an adenoma, not a hamartoma, hyperplasia, papilloma or teratoma.

## explicit_objective
Recognise the triad of galactorrhoea, menstrual irregularity and an MRI-enlarged anterior pituitary as a prolactin-secreting pituitary adenoma, and name its histology as adenoma.

## pitfalls
Labelling a functioning pituitary tumour's histology as hyperplasia (diffuse gland enlargement without a discrete neoplasm) rather than adenoma (a discrete benign neoplasm) when a discrete mass is described.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Neoplasia, tumour morphology

## microtopic
Pituitary adenoma

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-0DDDB3966D0CB3

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
A female 35-year-old complains of nipple discharge and irregular menses... most likely histologic diagnosis of this patient's pituitary tumor? / Adenoma

## exam_signal
mu_11999c1093082353caec | paper | | p8 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "prolactinoma" -- no exact-grain hit; minted fresh. This same vignette repeats verbatim on p16 with numbered (1-5) options instead of lettered -- held as an exact duplicate, not double-authored.

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

---

# Item

## label
Cachexia (generalized wasting) is a systemic cause of atrophy, distinct from the localized patterns (disuse, pressure, vascular, neuropathic, hormonal)

## id
CON-FND-B74FDBC28B5E2A

## canonical_key
atrophy.generalized.cachexia

## aliases
Cachexia
Generalized atrophy

## arabic_label


## arabic_aliases


## definition
Cachexia is a generalized wasting state -- from malignancy, chronic infection, malnutrition or chronic organ failure -- that produces generalized (systemic) atrophy of skeletal muscle and fat, distinct from the five named patterns of localized pathological atrophy (disuse, pressure, vascular, neuropathic, hormonal), which affect one region or tissue at a time.

## explicit_objective
Recognise atrophy as the growth disturbance expected in a cachectic patient, and distinguish generalized (cachexia, malnutrition, thyrotoxicosis) from localized atrophy causes.

## pitfalls
Choosing dysplasia, hyperplasia, hypertrophy or metaplasia instead of atrophy for a wasting, cachectic clinical picture.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Cellular adaptation

## microtopic
Generalized vs localized atrophy

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-B74FDBC28B5E2A

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Which of the following growth disturbances is most likely to occur in patients suffering from cachexia? / Atrophy

## exam_signal
mu_11999c1093082353caec | paper | | p9 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "cachexia atrophy" -- no exact-grain hit; minted fresh.

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

---

# Item

## label
Basal cell carcinoma (rodent ulcer) of the face is a locally malignant tumour with raised, rolled -- not everted -- edges, capable of transforming to basosquamous carcinoma

## id
CON-FND-72C9E2EF94990F

## canonical_key
neoplasia.basal-cell-carcinoma.rodent-ulcer

## aliases
Rodent ulcer
Basal cell carcinoma

## arabic_label


## arabic_aliases


## definition
Basal cell carcinoma of the face, classically called a rodent ulcer, is locally malignant (it spreads locally and destructively but essentially never metastasizes), microscopically shows the features of basal cell carcinoma, and can transform to the more aggressive basosquamous carcinoma. Its edges are classically described as raised and rolled (pearly, rolled edges), not everted -- everted edges describe a different pattern of malignant ulcer.

## explicit_objective
State that a rodent ulcer (basal cell carcinoma) has raised, rolled edges -- not everted edges -- alongside its other true features: local malignancy, basosquamous transformation potential, and local spread.

## pitfalls
Applying the "everted edges" description (more typical of a generic malignant/carcinomatous ulcer) to basal cell carcinoma, whose classic edge description is raised and rolled.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Neoplasia, tumour morphology

## microtopic
Basal cell carcinoma (rodent ulcer)

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-72C9E2EF94990F

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
All the following are true about rodent ulcer of the face except: / Edges of the ulcer are raised everted edges

## exam_signal
mu_11999c1093082353caec | paper | | p10 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "rodent ulcer basal cell carcinoma" -- no exact-grain hit; minted fresh.

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

---

# Item

## label
Circulating tumour cells survive immune attack in the bloodstream by aggregating with platelets and other blood cells; host innate and adaptive immune defences reduce, not favour, their survival

## id
CON-FND-E975CC82A64BD1

## canonical_key
neoplasia.spread.circulating-tumour-cell-survival

## aliases
Circulating tumour cell survival
Tumour cell dissemination in blood

## arabic_label


## arabic_aliases


## definition
Once a tumour cell intravasates into a vessel, its survival there depends on evading immune destruction: aggregation with platelets and other blood cells (forming a tumour-cell-platelet clump) and coating by blood components both help shield it from immune attack, favouring survival to a distant site. The host's own innate and adaptive immune defences work in the opposite direction, reducing circulating tumour cell survival rather than favouring it.

## explicit_objective
Identify platelet/blood-cell aggregation and coating as factors favouring circulating tumour cell survival, and host innate/adaptive immune defences as factors that reduce, not favour, that survival.

## pitfalls
Reading "does not favour tumour cell survival" items as asking what helps the tumour, and mistakenly selecting immune defences (which hinder, not help, tumour survival) as a favouring factor.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Neoplasia, tumour morphology

## microtopic
Haematogenous spread, circulating tumour cells

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-E975CC82A64BD1

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Dissemination of tumor cells through vascular channels, one of the following does not favor tumor cell survival: / Innate and adaptive immune defenses

## exam_signal
mu_11999c1093082353caec | paper | | p12 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "tumor cell survival platelets circulation" -- no exact-grain hit; minted fresh.

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

---

# Item

## label
Recognised prognostic factors of a malignant tumour are grade, stage, site and histological type -- tumour colour is not a recognised prognostic factor

## id
CON-FND-62EE104B252F19

## canonical_key
neoplasia.prognosis.recognized-factors

## aliases
Tumour prognostic factors

## arabic_label


## arabic_aliases


## definition
A malignant tumour's prognosis is assessed using grade (degree of differentiation), stage (extent of spread), site, and histological type; gross colour of the tumour is not among the recognised prognostic factors.

## explicit_objective
List grade, stage, site and type as recognised prognostic factors of a malignant tumour, and identify tumour colour as not one of them.

## pitfalls
Assuming any visually striking gross feature, such as colour, must carry prognostic weight alongside the recognised factors.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Neoplasia, tumour morphology

## microtopic
Prognostic factors of malignant tumours

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-62EE104B252F19

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
One of the following was not considered as a prognostic factor of malignant tumor: / Tumor color

## exam_signal
mu_11999c1093082353caec | paper | | p13 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "tumor prognostic factors grade stage" -- no exact-grain hit; minted fresh.

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

---

# Item

## label
Physiological atrophy of the thymus after puberty (thymic involution) is a normal, age-related process

## id
CON-FND-12CC9BA62D2FDD

## canonical_key
atrophy.physiological.thymic-involution

## aliases
Thymic involution
Physiological atrophy

## arabic_label


## arabic_aliases


## definition
The thymus normally undergoes physiological atrophy (involution) after puberty, with progressive replacement of thymic lymphoid tissue by fat; this is a normal, age-related process, one of the recognised physiological atrophy patterns alongside others such as post-menopausal ovarian/uterine atrophy, distinct from the pathological atrophy patterns (disuse, pressure, vascular, neuropathic, hormonal).

## explicit_objective
Identify post-pubertal thymic involution as physiological atrophy, not a pathological atrophy pattern.

## pitfalls
Assigning a pathological atrophy label (disuse, pressure, vascular, senescence/neuropathic) to a normal age-related involution process like thymic atrophy after puberty.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Cellular adaptation

## microtopic
Physiological atrophy

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-12CC9BA62D2FDD

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Atrophy of the thymus after puberty is a type of.............atrophy / Physiological

## exam_signal
mu_11999c1093082353caec | paper | | p13 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "thymus atrophy" -- no exact-grain hit; minted fresh.

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

---

# Item

## label
Chronic urinary bladder Bilharziasis (Schistosoma haematobium) drives squamous metaplasia of the normal transitional epithelium

## id
CON-FND-9200DFA3C72D6E

## canonical_key
metaplasia.bladder.bilharzial-squamous

## aliases
Bilharzial bladder metaplasia
Squamous metaplasia, bladder

## arabic_label


## arabic_aliases


## definition
Chronic Schistosoma haematobium (Bilharzia) infection of the urinary bladder provokes squamous metaplasia -- transformation of the normal transitional (urothelial) epithelium into squamous epithelium -- as an adaptive response to the chronic irritation of egg deposition; this metaplastic squamous epithelium is itself a recognised risk factor for bladder squamous cell carcinoma.

## explicit_objective
State that chronic bladder Bilharziasis causes squamous metaplasia of transitional epithelium (transitional to squamous), and that this is the direction of change, not the reverse.

## pitfalls
Reversing the direction of change (squamous-to-transitional instead of transitional-to-squamous) when describing Bilharzial bladder metaplasia.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Cellular adaptation

## microtopic
Metaplasia

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-9200DFA3C72D6E

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Which type of metaplasia occurs in urinary bladder Bilharziasis? / Transformation of transitional epithelium to squamous epithelium

## exam_signal
mu_11999c1093082353caec | paper | | p13 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "squamous metaplasia bladder bilharzia" -- no exact-grain hit; minted fresh.

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

---

# Item

## label
Aflatoxin (an Aspergillus flavus mycotoxin, a food contaminant) is a chemical carcinogen causally linked to hepatocellular carcinoma

## id
CON-FND-62BC955DED99FA

## canonical_key
carcinogenesis.chemical.aflatoxin-hepatocellular-carcinoma

## aliases
Aflatoxin
Chemical carcinogen, liver

## arabic_label


## arabic_aliases


## definition
Aflatoxin, a mycotoxin produced by Aspergillus flavus contaminating stored grains and nuts, is a chemical carcinogen with a well-established causal link to hepatocellular carcinoma, particularly acting synergistically with chronic hepatitis B infection.

## explicit_objective
Name hepatocellular carcinoma as the cancer causally associated with aflatoxin exposure.

## pitfalls
Confusing aflatoxin's target organ (liver, hepatocellular carcinoma) with other chemical-carcinogen associations (e.g. asbestos-mesothelioma, aromatic amine-urothelial carcinoma).

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Carcinogenesis

## microtopic
Chemical carcinogens

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-62BC955DED99FA

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Which of the following cancers is associated with aflatoxin carcinogen? / hepatocellular carcinoma

## exam_signal
mu_11999c1093082353caec | paper | | p14 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "aflatoxin hepatocellular carcinoma" -- no exact-grain hit; minted fresh.

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

---

# Item

## label
Papillary urothelial carcinoma is a non-invasive bladder tumour of thin papillary fronds with a central fibrovascular core covered by malignant/anaplastic urothelial cells

## id
CON-FND-248745D45028D3

## canonical_key
neoplasia.bladder.papillary-urothelial-carcinoma

## aliases
Papillary urothelial carcinoma, non-invasive

## arabic_label


## arabic_aliases


## definition
Papillary urothelial carcinoma is a bladder tumour composed of thin, finger-like papillary fronds, each with a central fibrovascular core, covered by malignant urothelial cells showing anaplastic features, with no invasion of the underlying lamina propria or muscle; this non-invasive papillary architecture distinguishes it from invasive urothelial carcinoma, inverted papilloma (a benign, endophytic lesion) and squamous cell carcinoma.

## explicit_objective
Recognise thin papillary fronds with a fibrovascular core and malignant/anaplastic covering urothelium, with no invasion, as papillary urothelial carcinoma.

## pitfalls
Confusing non-invasive papillary urothelial carcinoma with invasive urothelial carcinoma (which by definition breaches the basement membrane) or with inverted papilloma (a benign lesion growing inward rather than as exophytic fronds).

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Neoplasia, tumour morphology

## microtopic
Bladder tumours

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-248745D45028D3

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Male patient has 35 years old complains of hematuria... biopsy showed tumor composed of thin papillary fronds... no invasion. What is your diagnosis? / Papillary urothelial carcinoma

## exam_signal
mu_11999c1093082353caec | paper | | p14 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "papillary urothelial carcinoma" -- no exact-grain hit; minted fresh.

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

---

# Item

## label
Embryonal rhabdomyosarcoma in a young child presents as sheets of small round blue cells with a cambium layer condensed beneath the surface epithelium, classically at the orbit or vagina

## id
CON-FND-19C38BBE857DE0

## canonical_key
neoplasia.rhabdomyosarcoma.embryonal-cambium-layer

## aliases
Rhabdomyosarcoma, embryonal
Cambium layer
Sarcoma botryoides

## arabic_label


## arabic_aliases


## definition
Embryonal rhabdomyosarcoma is the most common soft-tissue sarcoma of young children, presenting as sheets of small round blue cells admixed with spindle-shaped cells in a myxoid stroma; when it arises beneath a mucosal or epithelial surface (classic sites: orbit producing progressive exophthalmos, or vagina producing a grape-like mass and discharge -- sarcoma botryoides) the tumour cells condense into a distinct cambium layer directly under that surface.

## explicit_objective
Recognise progressive exophthalmos or vaginal discharge with a mass in a young child, biopsy showing small round blue cells and a cambium layer, as embryonal rhabdomyosarcoma.

## pitfalls
Confusing embryonal rhabdomyosarcoma's small-round-blue-cell/cambium-layer picture with other paediatric small round blue cell tumours (e.g. neuroblastoma, lymphoma) without the site-specific cambium-layer and strap-cell clues.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Neoplasia, tumour morphology

## microtopic
Rhabdomyosarcoma

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-19C38BBE857DE0

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Male child has 3 years old... progressive exophthalmos... cambium layer... What is your diagnosis? / Rhabdomyosarcoma

## exam_signal
mu_11999c1093082353caec | paper | | p15 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "rhabdomyosarcoma cambium layer" -- no exact-grain hit; minted fresh, reused for the matching vaginal (sarcoma botryoides) vignette on p15-16 (same tumour, same fact, two sites).

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

---

# Item

## label
Tennis-racket-shaped strap cells with cross-striations are a diagnostic microscopic feature of rhabdomyosarcoma

## id
CON-FND-21A3FA6913301A

## canonical_key
neoplasia.rhabdomyosarcoma.strap-cells-cross-striations

## aliases
Strap cells
Cross-striations, rhabdomyosarcoma

## arabic_label


## arabic_aliases


## definition
Strap cells -- elongated tumour cells with abundant eosinophilic cytoplasm, sometimes showing cross-striations and a tennis-racket or tadpole shape -- are a specific microscopic feature of rhabdomyosarcoma, reflecting skeletal muscle (rhabdomyoblastic) differentiation, and are not a feature of the other sarcomas (chondrosarcoma, fibrosarcoma, leiomyosarcoma, osteosarcoma).

## explicit_objective
Identify tennis-racket-shaped, cross-striated strap cells as diagnostic of rhabdomyosarcoma among the sarcomas.

## pitfalls
Attributing strap cells/cross-striations to another sarcoma (leiomyosarcoma, fibrosarcoma) rather than specifically to rhabdomyosarcoma's skeletal-muscle differentiation.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Neoplasia, tumour morphology

## microtopic
Rhabdomyosarcoma

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-21A3FA6913301A

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Tennis Racket cells is one of the diagnostic criteria of one of the following tumors: / Rhabdomyosarcoma

## exam_signal
mu_11999c1093082353caec | paper | | p15 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "rhabdomyosarcoma cambium layer" -- no exact-grain hit; minted fresh as a distinct fact from the cambium-layer concept (a specific named histologic sign, not the general small-round-blue-cell picture).

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

---

# Item

## label
Xeroderma pigmentosum is an inherited genetic risk factor for squamous cell carcinoma, distinct from environmental/viral risk factors such as UV exposure, HPV or leukoplakia

## id
CON-FND-6E02735108012E

## canonical_key
carcinogenesis.genetic.xeroderma-pigmentosum-scc-risk

## aliases
Xeroderma pigmentosum, cancer risk

## arabic_label


## arabic_aliases


## definition
Xeroderma pigmentosum, an inherited defect in nucleotide excision DNA repair that leaves UV-induced DNA damage unrepaired, is a genetic risk factor for squamous cell carcinoma (and other skin cancers); it is grouped apart from the environmental/other risk factors for squamous cell carcinoma -- ultraviolet exposure (environmental), human papillomavirus (viral), and leukoplakia (a precursor lesion) -- because the underlying defect it confers is inherited rather than acquired.

## explicit_objective
Classify xeroderma pigmentosum as the genetic (inherited) risk factor for squamous cell carcinoma among a list that also includes UV exposure, HPV and leukoplakia.

## pitfalls
Selecting an environmental or viral risk factor (UV exposure, HPV) when the item specifically asks for the genetic risk factor.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Carcinogenesis

## microtopic
Risk factors for squamous cell carcinoma

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-6E02735108012E

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
One of the following is a genetic risk factor for squamous cell carcinoma: / Xeroderma pigmentosa

## exam_signal
mu_11999c1093082353caec | paper | | p15 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids
CON-FND (AU-MED-102-biochem-molecular-concepts.md) xeroderma-pigmentosum-DNA-repair concept — related but distinct grain: teaches the nucleotide-excision-repair biochemistry, not this item's SCC-risk-factor classification (genetic vs environmental/viral).

## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "xeroderma pigmentosum" found a related-but-distinct-grain hit (docs/import-ready/concept/AU-MED-102-biochem-molecular-concepts.md's "Xeroderma pigmentosum is a defect in nucleotide excision repair..." concept), reviewed and rejected: that record teaches the DNA-repair biochemistry mechanism, not this item's oncology-risk-factor-classification fact (genetic vs environmental/viral risk factor for SCC).

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

---

# Item

## label
Standard microscopic criteria of malignancy (pleomorphism, hyperchromatism, increased mitoses, loss of polarity) apply well to conventional carcinomas such as breast carcinoma, but are unreliable for grading tumours like neuroendocrine tumours or clear cell/papillary renal and thyroid carcinomas

## id
CON-FND-1014C9D0F30306

## canonical_key
neoplasia.grading.microscopic-criteria-of-malignancy-limits

## aliases
Microscopic criteria of malignancy

## arabic_label


## arabic_aliases


## definition
The standard microscopic criteria of malignancy -- nuclear pleomorphism, hyperchromatism, increased and abnormal mitoses, and loss of normal cell polarity -- correlate well with aggressive behaviour in conventional carcinomas such as breast carcinoma, making them reliable grading features there. In several other tumour types (well-differentiated neuroendocrine tumours of the appendix or pancreas, clear cell renal cell carcinoma, papillary thyroid carcinoma) these same criteria are notoriously unreliable predictors of behaviour, so grading and prognostication in those tumours relies on other features instead.

## explicit_objective
Recognise breast carcinoma as the tumour type where standard microscopic malignancy criteria are the reliable grading features, as opposed to neuroendocrine tumours or clear cell renal/papillary thyroid carcinoma, where these criteria do not reliably predict behaviour.

## pitfalls
Assuming the standard nuclear/mitotic criteria of malignancy apply equally well across all tumour types, when several well-recognised exceptions (neuroendocrine tumours, clear cell RCC, papillary thyroid carcinoma) exist.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Neoplasia, tumour morphology

## microtopic
Grading and microscopic criteria of malignancy

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-1014C9D0F30306

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Microscopic criteria of malignancy are the features of one of the following tumors: / Breast carcinoma

## exam_signal
mu_11999c1093082353caec | paper | | p15 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "microscopic criteria malignancy grading" -- no exact-grain hit; minted fresh.

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

---

# Item

## label
Adenoacanthoma, Barrett's oesophagus, endometriosis and localized myositis ossificans are true examples of metaplasia; congenital pyloric stenosis is not, because it is a congenital hypertrophic condition rather than an acquired change of cell type

## id
CON-FND-6D8E09B6D45A40

## canonical_key
metaplasia.examples.true-vs-non-metaplastic-mimics

## aliases
Examples of metaplasia
Congenital pyloric stenosis, not metaplasia

## arabic_label


## arabic_aliases


## definition
Metaplasia is the reversible replacement of one differentiated adult cell type by another, typically in response to chronic irritation; adenoacanthoma (squamous metaplasia within an adenocarcinoma), Barrett's oesophagus (squamous-to-intestinal columnar metaplasia), endometriosis (ectopic endometrial-type tissue, taught alongside coelomic metaplasia theories) and localized myositis ossificans (connective-tissue metaplasia to bone) are true examples. Congenital pyloric stenosis is not metaplasia at all -- it is a congenital condition of pyloric smooth-muscle hypertrophy causing gastric outlet obstruction, with no change of epithelial or mesenchymal cell type involved.

## explicit_objective
Identify congenital pyloric stenosis as not an example of metaplasia (it is congenital smooth-muscle hypertrophy), distinguishing it from true metaplasia examples such as adenoacanthoma, Barrett's oesophagus, endometriosis and myositis ossificans.

## pitfalls
Grouping congenital pyloric stenosis with metaplastic conditions because both involve tissue change, without recognising that metaplasia specifically means one differentiated cell type replacing another, which pyloric stenosis's smooth-muscle hypertrophy does not involve.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Cellular adaptation

## microtopic
Metaplasia, worked examples

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-6D8E09B6D45A40

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Which of the following conditions is not an example of metaplasia? / Congenital pyloric stenosis

## exam_signal
mu_11999c1093082353caec | paper | | p11 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "congenital pyloric stenosis metaplasia" -- no exact-grain hit; minted fresh.

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

---

# Item

## label
Human papillomavirus (HPV) viral oncogenesis is most strongly linked to carcinoma of the cervix among the major viral-associated neoplasms

## id
CON-FND-C4E4914B2E7FAB

## canonical_key
carcinogenesis.viral.hpv-cervical-carcinoma

## aliases
HPV, cervical carcinoma
Viral oncogenesis

## arabic_label


## arabic_aliases


## definition
Among neoplasms with an established viral-oncogenesis mechanism, carcinoma of the cervix is the one most strongly and classically linked to human papillomavirus (HPV) infection, through the viral E6 and E7 oncoproteins inactivating the p53 and Rb tumour-suppressor pathways; breast, prostate and ovarian cancer do not share this established viral mechanism, while retinoblastoma is linked instead to inherited/somatic RB1 gene loss rather than a virus.

## explicit_objective
Identify carcinoma of the cervix as the neoplasm most likely to arise through viral oncogenesis (HPV) among a list including breast, prostate and ovarian cancer and retinoblastoma.

## pitfalls
Selecting retinoblastoma as virally driven -- its mechanism is RB1 tumour-suppressor gene loss, not a virus.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT-T05

## secondary_node_ids


## topic
General pathology

## subtopic
Carcinogenesis

## microtopic
Viral oncogenesis

## nanotopic


## modules
MU-MED102

## module_subject
MU-MED102 > 00 Module-wide > 06 EOM Exams > Pathology Chapters 5 and 6 Past Exam MCQs

## article_ids
ART-MU102-PATHOLOGY-BASICS

## related_article_ids


## related_concept_ids


## resource_ids
src_11999c1093082353caec

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
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-FND-C4E4914B2E7FAB

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]


## original_wording
Some neoplasms appear to develop from viral oncogenesis. Which of the following neoplasms is most likely to arise in this manner? / Carcinoma of cervix

## exam_signal
mu_11999c1093082353caec | paper | | p11 | MU-MED102

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
Evidence must be attached before publication.

## field_notes
find-existing.mjs run for "cervical carcinoma HPV", "viral oncogenesis" -- no exact-grain hit; minted fresh.

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

---

