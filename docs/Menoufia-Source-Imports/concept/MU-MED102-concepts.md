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
