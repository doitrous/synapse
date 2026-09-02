<!--
  ZU-MED-103 (Structure and Function) — 27 NEW concepts minted for the
  sf-final24 cluster, authored from `Final S&F 2024 .pdf` (Zagazig's Fakous
  campus, Faculty of Medicine — source provenance ruled usable by the chief
  of staff, 2026-09-01; see LANE-CARD.md §7). Search-before-mint run against
  `find-existing.mjs` for every concept below (short literal queries); ids
  minted with `mint-concept-id.mjs`, checked against 13,578 existing ids
  (0 collisions). No evidence-store `src_…` resource exists yet for this PDF
  (not indexed in the corpus) — per 12-resources.md's weakest-but-honest
  option 3, `resource_ids`/`atomic_claim_ids` are left blank here and the
  citation lives only in each question's `source_citation`.

  3 live-hit and 4 pending-hit (4 questions) concepts from the same triage
  are handled as sparse overlays, not here: see
  `concept/ZU-MED-103-sf-final24-live-overlays.md` and
  `pending-live/ZU-MED-103-sf-final24-pending-overlays.md`. A 5th pending
  candidate for Q1/Q28 (Kasr 102-INT's histone/nucleosome concept) was found
  but dropped — its own article_ids is empty, no article covers it anywhere
  in the corpus — so Q1 and Q28 mint the covered concept below instead
  (`CON-FND-9604144A11BB6A`) rather than propagate a broken coverage chain.

  Import: Admin › Concepts › Import.
-->

# Item

## id
CON-FND-9604144A11BB6A

## label
Histones condense DNA into nucleosomes, the first level of DNA packing, by binding it electrostatically

## canonical_key
histone.nucleosome.dna-condensation-first-packing-level

## aliases
Nucleosome
Histone-DNA binding
First level of chromatin packing

## arabic_label


## arabic_aliases


## definition
Histones are lysine- and arginine-rich basic proteins; their positive charge lets them bind the acidic, phosphate-rich DNA electrostatically. This binding condenses DNA into nucleosomes — a histone octamer (two copies each of H2A, H2B, H3 and H4) wrapped by about 140 bp of DNA, connected to the next nucleosome by H1-bound linker DNA — the first level of DNA packing, on top of which all higher orders of chromatin condensation (30 nm fibre, loops, and finally the metaphase chromosome) are built. Among plasma/structural proteins, histone is the one with a DNA-binding function; albumin, globulin and keratin do not bind DNA.

## explicit_objective
State that histones condense DNA into nucleosomes — the first level of DNA packing — by electrostatic binding, and identify histone as the DNA-binding protein among albumin, globulin and keratin.

## pitfalls
Naming a level of chromatin organisation (euchromatin) or an entirely different molecule (a gene) instead of the nucleosome as the first packing level, or attributing DNA-binding to a non-DNA-binding structural/plasma protein (albumin, globulin, keratin) instead of histone.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Cell biology

## subtopic
Chromatin structure

## microtopic
Nucleosome and histone-DNA binding

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-CYTOLOGY-ENZYMES

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.2

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
"What is the first level of DNA packing in metaphase chromosome? a. Euchromatin b. Gene c. Histone d. Nucleosome" ANSWER: d (hand-drawn-ink key, Final S&F 2024 .pdf p.2 Q1); "Which one of the following proteins binds to DNA? a. Albumin b. Globulin c. Keratin d. Histone" ANSWER: d (hand-drawn-ink key, Final S&F 2024 .pdf p.5 Q28)

## merge_ids


## rejected_merge_candidate_ids
CON-FND-3660CDEFA054C3 (Kasr 102-INT, "Histones... condense DNA into nucleosomes") states the same underlying fact but carries no article_ids anywhere in the corpus — searched via `find-existing.mjs "nucleosome"`; not overlaid onto, since a question would then have no article that can teach it, per the same reasoning documented for ZU-MED-107's dropped Helwan HU-BMS-102 candidate.

## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard cell-biology/biochemistry textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-9E974C31428468

## label
Crossing over between homologous chromosomes occurs during meiosis I prophase (pachytene)

## canonical_key
meiosis.crossingover.pachytene-stage

## aliases
Pachytene
Meiosis I prophase substages
Genetic recombination

## arabic_label


## arabic_aliases


## definition
Crossing over — the reciprocal exchange of genetic material between paired homologous chromosomes — takes place during pachytene, one of the five substages of meiosis I prophase (leptotene, zygotene, pachytene, diplotene, diakinesis). It occurs after homologous chromosomes have fully synapsed (paired, at zygotene) and before they begin to separate, not during metaphase, anaphase or telophase, when the chromosomes are already condensed for segregation or actively moving apart.

## explicit_objective
Name pachytene, a substage of meiosis I prophase, as the point at which crossing over occurs, distinct from meiosis I metaphase, anaphase or telophase.

## pitfalls
Placing crossing over at meiosis I metaphase (when chromosomes are aligned but already fully condensed) rather than at pachytene, within prophase, when the synapsed homologues are still exchanging material before alignment.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Cell biology

## subtopic
Meiosis

## microtopic
Prophase I substages

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-CYTOLOGY-ENZYMES

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.2

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
"Crossing over (pachytene) takes place in which phase? a. Meiosis I metaphase b. Meiosis I anaphase c. Meiosis I prophase d. Meiosis I telophase" ANSWER: c (hand-drawn-ink key, Final S&F 2024 .pdf p.2 Q2)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard cell-biology textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-56A58CB8472134

## label
Keratin is the intermediate filament protein of skin epithelium

## canonical_key
keratin.intermediatefilament.skin-epidermis

## aliases
Cytokeratin
Skin intermediate filaments

## arabic_label


## arabic_aliases


## definition
Intermediate filaments are cell-type-specific: skin (epidermal) epithelium is built on keratin, distinct from tubulin (the subunit of microtubules, not an intermediate filament at all), vimentin (the intermediate filament of mesenchymal-derived cells) and desmin (the intermediate filament of muscle cells). Keratin filaments anchor to desmosomes and hemidesmosomes, giving epidermal cells their mechanical resilience.

## explicit_objective
Name keratin as the skin epithelium's intermediate filament protein, distinct from tubulin (a microtubule protein, not an intermediate filament), vimentin (mesenchymal cells) and desmin (muscle cells).

## pitfalls
Confusing the tissue-specific intermediate filament proteins — vimentin (mesenchyme), desmin (muscle) and keratin (epithelium) are the classic "match the filament to the tissue" exam set, and tubulin is a distractor from an entirely different cytoskeletal system (microtubules).

## concept_type
classification

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Cell biology

## subtopic
Cytoskeleton

## microtopic
Intermediate filaments

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-HISTOLOGY-CT

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

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
"The intermediate filaments found in skin composed of which type of protein? a. Tubulin b. Keratin c. Vimentin d. Desmin" ANSWER: b (hand-drawn-ink key, Final S&F 2024 .pdf p.2 Q3)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard histology textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-HEM-6662F3A2C71802

## label
The band cell is the immature form of the neutrophil

## canonical_key
neutrophil.bandcell.immature-form

## aliases
Band neutrophil
Immature neutrophil
Left shift

## arabic_label


## arabic_aliases


## definition
The neutrophil's immature form, released early from the bone marrow under demand (e.g. infection), is called the band cell (band neutrophil) — its nucleus is an unsegmented, curved band rather than the mature neutrophil's multi-lobed (2–5 lobe) nucleus. A rise in circulating band cells ("left shift") is a marker of an acute inflammatory or infectious response. This is distinct from the mature neutrophil's own true features: a multi-lobed (not S-shaped) nucleus, neutrophilic (not acidophilic) granules, and the presence (not absence) of azurophilic (primary) granules alongside its specific (secondary) granules.

## explicit_objective
Identify the band cell as the neutrophil's immature form, and correctly reject the distractor claims about the mature neutrophil's nucleus shape and granule staining.

## pitfalls
Assuming the neutrophil's nucleus is "S-shaped" (it is multi-lobed) or that it lacks azurophilic granules (it has them, alongside specific granules) — both common distractors built to sound plausible next to the correct band-cell fact.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
haem

## primary_node_id


## secondary_node_ids


## topic
Hematology

## subtopic
Granulocyte development

## microtopic
Neutrophil maturation stages

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-HEM-ZU103-HEMATOLOGY

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.5

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following characterizes neutrophil? a. Its nucleus is S-Shaped. b. Its immature form called band cell. c. It have acidophillic granules. d. It lacks azurophilic granules" ANSWER: b (hand-drawn-ink key — letter b struck through, with confirming X marks on the false options a and c, Final S&F 2024 .pdf p.2 Q7, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard hematology textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-0B8B56D68C37A0

## label
The capsule of an organ is composed of dense irregular connective tissue

## canonical_key
connectivetissue.denseirregular.organ-capsule-example

## aliases
Dense irregular connective tissue
Organ capsule histology

## arabic_label


## arabic_aliases


## definition
Dense irregular connective tissue has thick collagen bundles running in multiple, interwoven directions, giving it strength to resist stress from many directions at once — the organ capsule (e.g. of the spleen, kidney or liver) and the dermis are classic examples. This is distinct from dense regular connective tissue, in which collagen fibres run in one parallel direction to resist force along a single axis — the tendon and the ligament (both distractors here) are the classic examples of that type, and the lamina propria of mucosa (also a distractor) is loose, not dense, connective tissue.

## explicit_objective
Identify the organ capsule as an example of dense irregular connective tissue, distinct from the tendon and ligament (dense regular) and lamina propria (loose connective tissue).

## pitfalls
Grouping the organ capsule with the tendon and ligament as "the same kind of dense connective tissue" — the fibre arrangement (multidirectional/interwoven vs uniaxial/parallel) is exactly what separates dense irregular from dense regular, and exam distractors are built on this distinction.

## concept_type
classification

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Connective tissue

## subtopic
Dense connective tissue

## microtopic
Dense irregular connective tissue

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-HISTOLOGY-CT

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

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
"Which structure is composed of dense irregular connective tissue? a. Tendon b. Capsule of organs c. Lamina propria of mucosa d. Ligament" ANSWER: b (hand-drawn-ink key, Final S&F 2024 .pdf p.3 Q10)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard histology textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-49C20DBEBEB4D4

## label
Na+/amino acid cotransport is an example of symport across the cell membrane

## canonical_key
membranetransport.symport.sodium-aminoacid-cotransport

## aliases
Symport
Co-transport
Sodium-coupled amino acid transport

## arabic_label


## arabic_aliases


## definition
Symport (co-transport) moves two solutes across a membrane in the same direction, using the downhill electrochemical gradient of one (typically Na+) to drive the uphill movement of the other — the Na+/amino acid carrier is a textbook example. This is distinct from the distractors: Ca2+/Na+ and Na+/H+ exchangers are antiport (countertransport, opposite directions), and the Na+/K+ pump is primary active transport, using ATP directly rather than another ion's gradient, and moving Na+ and K+ in opposite directions across the membrane in one cycle.

## explicit_objective
Identify Na+/amino acid cotransport as an example of symport, distinct from the Na+/H+ and Ca2+/Na+ antiporters and the Na+/K+ pump's primary active transport.

## pitfalls
Confusing symport (same-direction co-transport, e.g. Na+/amino acid or Na+/glucose) with antiport (opposite-direction exchange, e.g. Na+/H+, Ca2+/Na+) — both use an ion gradient to move a second solute, but the direction relationship is what the exam is testing.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Membrane physiology

## subtopic
Transport across cell membranes

## microtopic
Symport vs antiport

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-PHYSIOLOGY-ANS-RENAL

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

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
"Regarding transport across cell membrane, which of the following is an example of co-transport (Symport)? a. Ca2+/Na+. b. Na+ /amino acid. c. Na+/H+. d. Na+/K+ pump" ANSWER: b (hand-drawn-ink key, Final S&F 2024 .pdf p.3 Q11)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard physiology textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-F8B7C29A49FDA4

## label
The rate of simple diffusion is inversely proportional to membrane thickness

## canonical_key
diffusion.fick-law.thickness-inverse-relationship

## aliases
Fick's law of diffusion
Membrane thickness and diffusion rate

## arabic_label


## arabic_aliases


## definition
By Fick's law, the rate of simple diffusion across a membrane is directly proportional to the concentration gradient, the surface area of the membrane, and the temperature, but inversely proportional to the membrane's thickness — a thicker membrane slows diffusion because the solute must travel a longer path. This inverse relationship (thickness) is the one factor among the four listed here that reduces, rather than increases, the diffusion rate as it rises.

## explicit_objective
Identify membrane thickness as the factor inversely (not directly) proportional to the rate of simple diffusion, distinct from concentration gradient, surface area and temperature, which are all directly proportional to it.

## pitfalls
Treating all four Fick's-law variables (gradient, surface area, temperature, thickness) as increasing diffusion rate together — thickness is the deliberate exception, and mixing it up with the three directly-proportional factors is the trap this question is built on.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Membrane physiology

## subtopic
Simple diffusion

## microtopic
Fick's law

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-PHYSIOLOGY-ANS-RENAL

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

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
"Regarding diffusion, which of the following is inversely proportionate to the rate of simple diffusion? a. Concentration gradient. b. Surface area of the membrane c. Temperature. d. Thickness of the membrane" ANSWER: d (hand-drawn-ink key, Final S&F 2024 .pdf p.3 Q12)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard physiology textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-3B8E7A98B9678A

## label
Amino acid transport across the intestinal/renal epithelium depends on secondary active transport

## canonical_key
membranetransport.secondaryactive.aminoacid-dependence

## aliases
Secondary active transport
Amino acid absorption mechanism

## arabic_label


## arabic_aliases


## definition
Secondary active transport uses the electrochemical (usually Na+) gradient built by a primary active pump (the Na+/K+-ATPase) to move a second solute uphill, without directly consuming ATP itself. Amino acid absorption across the gut and renal tubular epithelium depends on this mechanism (Na+-amino acid symporters); disturbing secondary active transport therefore impairs amino acid transport specifically, while urea, alcohol and O2 (the distractors here) all cross membranes by simple diffusion, independent of any transporter or ion gradient.

## explicit_objective
Identify amino acids as the solute whose transport depends on secondary active transport, distinct from urea, alcohol and O2, which cross by simple diffusion and are unaffected if secondary active transport is disturbed.

## pitfalls
Assuming every listed small molecule needs a transporter — urea, alcohol and O2 are lipid-soluble/small enough to cross by simple diffusion, and only the amino acid, which needs a Na+-coupled carrier, is actually dependent on secondary active transport.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Membrane physiology

## subtopic
Active transport

## microtopic
Secondary active transport

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-PHYSIOLOGY-ANS-RENAL

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"If secondary active transport is disturbed, transport of which molecules would be impaired? a. Urea. b. Alcohol. c. O2. d. Amino acids" ANSWER: d (hand-drawn-ink key, Final S&F 2024 .pdf p.3 Q13)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard physiology textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-866A493B33BB6D

## label
Sympathetic stimulation inhibits intestinal secretions

## canonical_key
autonomic.sympathetic.abdominal-organ-inhibition

## aliases
Sympathetic effects on GI tract
Autonomic control of intestinal secretion

## arabic_label


## arabic_aliases


## definition
Sympathetic stimulation of abdominal organs inhibits intestinal secretions and motility (the opposite of the parasympathetic system's "rest and digest" effect), redirecting blood flow and energy toward a "fight or flight" state. This is distinct from the distractors: sympathetic stimulation inhibits (not stimulates) insulin secretion via alpha-2 adrenergic receptors on pancreatic beta cells, promotes glycogenolysis (not glycogenesis, its opposite) in the liver, and decreases (not increases) intestinal motility.

## explicit_objective
State that sympathetic stimulation inhibits intestinal secretions, and correctly reject the distractors describing increased insulin secretion, glycogenesis or intestinal motility, all of which sympathetic activity actually opposes.

## pitfalls
Assuming sympathetic stimulation "activates" every abdominal process it touches — it specifically inhibits digestive secretion and motility and insulin release while promoting glycogen breakdown, the opposite pattern from what a naive "sympathetic = more active" assumption predicts.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Autonomic nervous system

## subtopic
Sympathetic effects

## microtopic
GI tract effects

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-PHYSIOLOGY-ANS-RENAL

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

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
"Stimulation of sympathetic supply to abdominal organs results in which of the following actions? a. Inhibition intestinal secretions b. Stimulation of insulin secretion c. Glycogenesis d. Increase in intestinal motility" ANSWER: a (hand-drawn-ink key, Final S&F 2024 .pdf p.3 Q14)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard physiology textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-FE37B5B5ADC2F0

## label
Vagal (parasympathetic) stimulation constricts the bronchioles

## canonical_key
autonomic.vagus.bronchiole-constriction

## aliases
Parasympathetic cranial outflow
Vagus nerve effects

## arabic_label


## arabic_aliases


## definition
The parasympathetic nervous system's cranial outflow travels via the vagus nerve; among its effects is bronchiolar smooth-muscle contraction, constricting the airway (the opposite of sympathetic bronchodilation). This is distinct from the distractors, none of which is a vagal effect: tachycardia and mydriasis are sympathetic effects (the vagus instead slows heart rate and is not implicated in pupil dilation), and micturition (bladder detrusor contraction) is driven by the sacral parasympathetic outflow (pelvic splanchnic nerves), not the vagus.

## explicit_objective
Identify bronchiolar constriction as a genuine vagal (cranial parasympathetic) effect, distinct from tachycardia and mydriasis (sympathetic) and micturition (sacral, not cranial, parasympathetic outflow).

## pitfalls
Assigning micturition to the vagus nerve because "it's parasympathetic" — bladder control is sacral parasympathetic (pelvic splanchnic nerves), a different outflow from the vagus nerve's cranial parasympathetic territory (heart, lungs, most of the GI tract).

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Autonomic nervous system

## subtopic
Parasympathetic effects

## microtopic
Vagal cranial outflow

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-PHYSIOLOGY-ANS-RENAL

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

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
"Parasympathetic nervous system has a cranial outflow. Stimulation of the vagus nerve causes which of the following effects? a. Tachycardia. b. Mydriasis. c. Constriction of the bronchioles d. Micturition" ANSWER: c (hand-drawn-ink key, Final S&F 2024 .pdf p.3 Q15)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard physiology textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-F717A7C9B7E9BD

## label
Hypovolemia stimulates the juxtaglomerular cells of the kidney

## canonical_key
renin.juxtaglomerularcells.hypovolemia-stimulus

## aliases
Renin release triggers
Juxtaglomerular apparatus

## arabic_label


## arabic_aliases


## definition
Juxtaglomerular (JG) cells, modified smooth muscle cells in the afferent arteriole wall, release renin in response to reduced renal perfusion pressure — the state produced by hypovolemia — triggering the renin-angiotensin-aldosterone system to restore blood volume and pressure. This is the opposite of hypervolemia and hypertension (both of which raise renal perfusion pressure and suppress renin release), and distinct from hyperosmolarity, which is instead sensed by hypothalamic osmoreceptors to drive ADH release, not JG-cell renin release.

## explicit_objective
Identify hypovolemia as the stimulus for juxtaglomerular cell renin release, distinct from hypervolemia and hypertension (which suppress it) and hyperosmolarity (sensed by a different receptor system).

## pitfalls
Confusing the JG cells' pressure/volume-sensing role (triggered by hypovolemia/low perfusion pressure) with the hypothalamic osmoreceptors' osmolarity-sensing role (triggered by hyperosmolarity) — both feed into body-water regulation but through different sensors and different first steps.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Renal physiology

## subtopic
Renin-angiotensin-aldosterone system

## microtopic
Juxtaglomerular cell stimulation

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-PHYSIOLOGY-ANS-RENAL

## related_article_ids


## related_concept_ids
CON-FND-5CDB9C43FC9C5A

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.5

## exam_weight_by_year
ZU_Y1=0.6

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
"Regarding nervous control of body water, which of the following stimulates juxtaglomerular cells of kidney? a. Hypervolemia. b. Hypertension. c. Hypovolemia. d. Hyperosmolarity." ANSWER: c (hand-drawn-ink key, Final S&F 2024 .pdf p.3 Q16)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard physiology textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-5CDB9C43FC9C5A

## label
Angiotensin II increases ADH secretion

## canonical_key
angiotensinii.bodywater-regulation.increases-adh-secretion

## aliases
Angiotensin II functions
Body water regulation by angiotensin II

## arabic_label


## arabic_aliases


## definition
Angiotensin II, generated downstream of renin release, contributes to body-water regulation by increasing ADH (vasopressin) secretion from the posterior pituitary, alongside its other roles (stimulating thirst, raising aldosterone). This is the opposite of the three distractors listed here: angiotensin II stimulates (not inhibits) thirst sensation, increases (not decreases) aldosterone secretion, and opposes rather than stimulates atrial natriuretic peptide, which is released in response to volume expansion, a state angiotensin II works against.

## explicit_objective
State that angiotensin II increases ADH secretion as part of body-water regulation, and correctly reject the distractors reversing its effects on thirst, aldosterone and ANP.

## pitfalls
Reversing angiotensin II's direction of effect on any of its four water-regulation targets (thirst, aldosterone, ADH, ANP) — the whole renin-angiotensin-aldosterone system moves in one coordinated direction (water/sodium retention), and a question testing any single link relies on getting that direction right.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Renal physiology

## subtopic
Renin-angiotensin-aldosterone system

## microtopic
Angiotensin II effects

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-PHYSIOLOGY-ANS-RENAL

## related_article_ids


## related_concept_ids
CON-FND-F717A7C9B7E9BD

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.5

## exam_weight_by_year
ZU_Y1=0.6

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
"Which of the following describes angiotensin II's role in the regulation of body water? a. Inhibits thirst sensation. b. Decreases aldosterone hormone. c. Increases ADH secretion. d. Stimulates atrial natriuretic peptide" ANSWER: c (hand-drawn-ink key, Final S&F 2024 .pdf p.3 Q17)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard physiology textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-HEM-2536A37AD16C97

## label
Kidney failure depresses bone marrow erythropoiesis through reduced erythropoietin

## canonical_key
erythropoiesis.renalfailure.bonemarrow-depression

## aliases
Renal anemia
Erythropoietin deficiency

## arabic_label


## arabic_aliases


## definition
The kidney is the principal source of erythropoietin, the hormone driving red-cell production in the bone marrow. Kidney failure lowers erythropoietin output, and with it, marrow erythropoiesis — the mechanism behind the anemia of chronic kidney disease. This is distinct from the distractors: a bone-marrow lesion (not kidney failure) is the classic cause of aplastic-type marrow failure, dietary oxalates/phytates decrease (not increase) intestinal iron absorption by chelating it, and hypoxia stimulates (not inhibits) erythropoietin secretion, the opposite of the distractor's claim.

## explicit_objective
State that kidney failure depresses bone marrow erythropoiesis via reduced erythropoietin secretion, and correctly reject the distractors about bone-marrow lesions causing megaloblastic anemia, oxalate/phytate effects on iron absorption, and hypoxia's effect on erythropoietin.

## pitfalls
Assigning "megaloblastic anemia" to a bone-marrow lesion (megaloblastic anemia is a B12/folate deficiency, not a marrow-structural problem) or reversing hypoxia's true stimulatory effect on erythropoietin secretion.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
haem

## primary_node_id


## secondary_node_ids


## topic
Erythropoiesis

## subtopic
Regulation of red cell production

## microtopic
Erythropoietin and renal disease

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-HEM-ZU103-HEMATOLOGY

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.6

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Regarding erythropoiesis, which of the following is true? a. Lesion in bone marrow leads to megaloblastic anemia b. Kidney failure leads to depression of bone marrow. c. Oxalates, phytate & phosphate increase absorption of iron. d. Hypoxia inhibits the secretion of erythropoietin hormone." ANSWER: b (hand-drawn-ink key, Final S&F 2024 .pdf p.3-4 Q18, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard hematology/physiology textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-82039C1A46611C

## label
Adrenaline is used in the treatment of bronchial asthma

## canonical_key
adrenaline.therapeuticuse.bronchial-asthma

## aliases
Epinephrine bronchodilation
Sympathomimetic drugs in asthma

## arabic_label


## arabic_aliases


## definition
Adrenaline (epinephrine), acting via beta-2 adrenergic receptors, relaxes bronchial smooth muscle and is used to treat acute bronchospasm in bronchial asthma. This is distinct from the distractors: beta-3 receptor stimulation increases lipolysis/thermogenesis rather than heart rate (beta-1 receptors govern chronotropy), sympathomimetic (not sympatholytic) drugs are used to support blood pressure in hemorrhage/shock, and vasodilators (not sympathomimetics, which would raise myocardial oxygen demand and worsen ischemia) are used in angina pectoris.

## explicit_objective
State that adrenaline is used to treat bronchial asthma via beta-2-mediated bronchodilation, and correctly reject the distractors about beta-3 receptors and heart rate, sympatholytic drugs in hemorrhage, and sympathomimetic drugs in angina.

## pitfalls
Assuming any sympathomimetic action is beneficial in angina pectoris — increasing sympathetic drive raises myocardial oxygen demand and would worsen angina, the opposite of the vasodilator treatment actually used.

## concept_type
clinical_application

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Autonomic nervous system

## subtopic
Sympathomimetic drug use

## microtopic
Adrenaline in bronchial asthma

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-PHYSIOLOGY-ANS-RENAL

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.6

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Concerning sympathetic nervous system, which of the following best describe it? a. Stimulation of B3 receptors increases heart rate b. Sympatholytic drugs are used in hemorrhage c. Adrenaline used in treatment of bronchial asthma d. Sympathomimetic drugs are used in angina pectoris" ANSWER: c (hand-drawn-ink key, Final S&F 2024 .pdf p.4 Q20, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard pharmacology/physiology textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-HEM-7A52519741DD52

## label
Plasma potassium rises in stored blood

## canonical_key
storedblood.changes.potassium-increase

## aliases
Blood storage lesion
Stored blood biochemistry

## arabic_label


## arabic_aliases


## definition
During blood storage, red cells slowly lose membrane integrity and leak intracellular potassium into the plasma, so plasma K+ rises the longer blood is stored — a clinically relevant risk in massive/rapid transfusion. This is one of several "storage lesion" changes; the other listed options misstate the actual pattern: 2,3-DPG falls (not rises) with storage, impairing oxygen offloading, and glucose falls (not "increases") as red cells consume it and produce lactic acid, rather than the paper's stated "increase dextrose and changed to lactic acid".

## explicit_objective
State that stored blood shows a rise in plasma potassium, and correctly reject the distractors misstating the direction of 2,3-DPG and glucose changes during storage.

## pitfalls
Assuming 2,3-DPG or glucose "increase" during blood storage — both actually fall (2,3-DPG depletion impairs oxygen delivery after transfusion; glucose is consumed by ongoing red cell glycolysis), the opposite direction from potassium, which does rise.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
haem

## primary_node_id


## secondary_node_ids


## topic
Blood transfusion

## subtopic
Storage lesion

## microtopic
Plasma potassium in stored blood

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-HEM-ZU103-HEMATOLOGY

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
0.6

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following occurs in in stored blood? a. Increase 2,3 DPG b. Increase K+ ions in plasma c. Increase dextrose and changed to lactic acid. d. Increase plasma concentration of tissue factor" ANSWER: b (hand-drawn-ink key, Final S&F 2024 .pdf p.4 Q21)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard hematology/transfusion-medicine textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-9A91612867A086

## label
Linoleic acid is an essential fatty acid

## canonical_key
fattyacid.essential.linoleic-acid

## aliases
Essential fatty acids
Omega-6 fatty acid

## arabic_label


## arabic_aliases


## definition
Linoleic acid, an omega-6 polyunsaturated fatty acid, is essential — the body cannot synthesize it de novo and must obtain it from the diet. This is distinct from the three distractors: oleic acid and palmitic acid are both non-essential (the body synthesizes them readily), and arachidonic acid, while biologically important as an eicosanoid precursor, is only conditionally essential — it can be synthesized from linoleic acid itself when dietary linoleic acid is adequate, so it is not classed as a true dietary essential fatty acid the way linoleic acid is.

## explicit_objective
Identify linoleic acid as a true essential fatty acid, distinct from oleic and palmitic acid (non-essential) and arachidonic acid (conditionally essential, derived from linoleic acid).

## pitfalls
Classing arachidonic acid as "essential" on the same footing as linoleic acid — it is only conditionally essential, since the body can make it from linoleic acid, which is the one fatty acid in this list that cannot be synthesized at all.

## concept_type
classification

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Lipid biochemistry

## subtopic
Fatty acid classification

## microtopic
Essential fatty acids

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-BIOCHEM-VITAMINS

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

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
"Fatty acid can be classified into essential and non-essential. Which of the following is an essential fatty acid? a. Oleic acid b. Linoleic acid c. Arachidonic acid d. Palmitic acid" ANSWER: b (hand-drawn-ink key, Final S&F 2024 .pdf p.4 Q24, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard biochemistry textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-8BC2AA065984A1

## label
Cerebrosides are composed of sphingosine, fatty acid and galactose

## canonical_key
glycolipid.cerebroside.sphingosine-fattyacid-galactose-composition

## aliases
Cerebroside composition
Galactocerebroside

## arabic_label


## arabic_aliases


## definition
A cerebroside is a glycosphingolipid built from ceramide (sphingosine joined to a fatty acid by an amide bond) with a single sugar — classically galactose — attached to the sphingosine's terminal hydroxyl; it contains no glycerol and no phosphate group. This distinguishes it from sphingomyelin, a related sphingolipid that does contain phosphoric acid (via a phosphodiester bond to phosphorylcholine) but no sugar, and from glycerophospholipids, which are built on a glycerol backbone rather than sphingosine.

## explicit_objective
State the four-component composition of a cerebroside (sphingosine, fatty acid, galactose, no glycerol or phosphate), distinguishing it from sphingomyelin's phosphate-containing, sugar-free composition.

## pitfalls
Attributing sphingomyelin's phosphoric-acid group to the cerebroside, or adding glycerol (which belongs to an entirely different, glycerol-backbone lipid family) to the cerebroside's actual sphingosine/fatty-acid/galactose composition.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Lipid biochemistry

## subtopic
Glycolipids

## microtopic
Cerebroside composition

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-BIOCHEM-VITAMINS

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

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
"Cerebrosides are glycolipids. What are the compositions of cerebrosides? a. Sphingosine, fatty acids, glycerol, phosphoric acid b. Sphingosine, fatty acids, galactose c. Glycerol, fatty acids, galactose d. Sphingosine, glucose, fatty acids, glycerol" ANSWER: b (hand-drawn-ink key, Final S&F 2024 .pdf p.4 Q25, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids
Searched "cerebrosides" — 102-INT and AU-MED-102 both mint broader glycolipid-classification concepts (cerebrosides/sulfolipids/gangliosides as a family, or sulfatide/cerebroside naming) but neither states this specific four-component composition fact; not merged.

## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard biochemistry textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-DD57006CA1454D

## label
Glutathione's hydrolytic products are glutamic acid, cysteine and glycine

## canonical_key
glutathione.hydrolysis.glutamate-cysteine-glycine

## aliases
Glutathione tripeptide composition
Gamma-glutamylcysteinylglycine

## arabic_label


## arabic_aliases


## definition
Glutathione is a tripeptide (gamma-glutamylcysteinylglycine) whose complete hydrolysis yields exactly three amino acids: glutamic acid, cysteine and glycine — the cysteine's free thiol group is what gives glutathione its antioxidant, free-radical-scavenging function. This is distinct from the plausible-looking distractors substituting serine or glutamine for one of the three genuine components, or substituting taurine (a cysteine-derived compound, not one of glutathione's own hydrolytic products) for glutamic acid.

## explicit_objective
Name glutamic acid, cysteine and glycine as glutathione's three hydrolytic products, rejecting distractors that substitute serine, glutamine or taurine for one of them.

## pitfalls
Substituting a similarly-named amino acid (glutamine for glutamic acid, serine for glycine) into glutathione's composition — the three genuine components (glutamate, cysteine, glycine) are frequently paired with near-miss distractors built from adjacent amino acid names.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Amino acid and peptide biochemistry

## subtopic
Biologically active peptides

## microtopic
Glutathione composition

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-BIOCHEM-VITAMINS

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

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
"Glutathione is one of biologically active peptides. What are the hydrolytic products of glutathione? a. Glutamic acid, cysteine and serine b. Glutamine, cysteine and glycine c. Taurine cysteine and glycine d. Glutamic acid, cysteine and glycine" ANSWER: d (hand-drawn-ink key, Final S&F 2024 .pdf p.4 Q26)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard biochemistry textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-C61653BB72941B

## label
Threonine is an essential amino acid that contains a hydroxyl (OH) group

## canonical_key
aminoacid.threonine.essential-hydroxyl-containing

## aliases
Hydroxyl-containing amino acids
Essential amino acids

## arabic_label


## arabic_aliases


## definition
Threonine is one of the essential amino acids and carries a hydroxyl (OH) group on its side chain (alongside serine, which also has an OH group but is non-essential, and tyrosine, which has an OH group but is likewise non-essential/conditionally essential). Among the essential amino acids specifically, threonine is the classic hydroxyl-bearing one — valine and phenylalanine (the distractors here) are essential but lack a side-chain hydroxyl, and tryptophan (also a distractor) is essential but has an indole side chain, not a hydroxyl.

## explicit_objective
Identify threonine as the essential amino acid bearing a hydroxyl group, distinct from valine, tryptophan and phenylalanine, none of which has a hydroxyl side chain.

## pitfalls
Confusing "has a hydroxyl group" (true of serine, threonine and tyrosine) with "is essential" (true only of threonine among those three) — the question is testing the intersection of both properties, not either alone.

## concept_type
classification

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Amino acid biochemistry

## subtopic
Essential amino acids

## microtopic
Hydroxyl-containing amino acids

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-BIOCHEM-VITAMINS

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.2

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
"Which of the following is an essential amino acid that contains OH group? a. Valine b. Tryptophan c. Theronine d. Phenyalanine" ANSWER: c (hand-drawn-ink key, Final S&F 2024 .pdf p.5 Q27)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard biochemistry textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.
sourceTypo: Q27's option c prints "Theronine" — kept as printed in the question text; this concept and its explanation name the amino acid correctly (threonine).

---

# Item

## id
CON-FND-2D132215E37EC0

## label
The tRNA TψC arm contains a thymine base

## canonical_key
trna.tpsic-loop.contains-thymine-base

## aliases
T-psi-C arm
Ribothymidine in tRNA

## arabic_label


## arabic_aliases


## definition
The TψC arm (T-psi-C loop) of tRNA is named for the three bases characteristically found there — thymine (an unusual base for RNA, more typical of DNA), pseudouridine (ψ) and cytosine. This is one of several tRNA structural facts the exam pairs against false distractors: the amino-acid specificity of a tRNA lies in its anticodon, not its acceptor arm; the acceptor arm's terminal sequence is 3'-CCA-OH (not "5' COOH"), where the amino acid attaches; and an average tRNA is about 75–90 nucleotides long, not 275.

## explicit_objective
State that the tRNA TψC arm contains thymine, and correctly reject distractors about acceptor-arm amino-acid specificity, the acceptor arm's 3' (not 5') terminal CCA sequence, and tRNA's true average length.

## pitfalls
Assuming tRNA, being RNA, never contains thymine — the TψC arm is a genuine, specifically named exception, and recognising this unusual base there is exactly what distinguishes tRNA's tertiary structure from ordinary RNA.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Molecular biology

## subtopic
tRNA structure

## microtopic
TψC arm

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-CYTOLOGY-ENZYMES

## related_article_ids


## related_concept_ids
CON-FND-CA2D65E688434A

## resource_ids


## approved_file_resource_ids


## approved_video_resource_ids


## learner_years
1

## universities
zu

## blueprint_weight
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.2

## academic_relevance
0.7

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Which of the following is true about tRNA? a. The specificity of a tRNA for a particular amino acid is contained in its acceptor arm b. T ψ C contains thymine bases c. Acceptor arm at terminal 5' COOH sequence is always CCA d. Each tRNA has an average 275 nucleotide residues" ANSWER: b (hand-drawn-ink key, with confirming X marks on the false options c and d, Final S&F 2024 .pdf p.5 Q29, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids
CON-FND-CA2D65E688434A (Alexandria AU-MED-102, "Every tRNA's acceptor arm ends in the same 3'-CCA sequence") states the acceptor-arm-CCA fact used as this question's own distractor c, a different objective from the TψC-arm-thymine fact this concept states — not merged, cross-linked instead via related_concept_ids.

## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard molecular-biology textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-68D0529325255C

## label
Pancreatic lipase is an example of an extracellular enzyme

## canonical_key
enzyme.pancreaticlipase.extracellular-example

## aliases
Extracellular enzymes
Secreted digestive enzymes

## arabic_label


## arabic_aliases


## definition
Pancreatic lipase is secreted by pancreatic acinar cells into the pancreatic duct and, from there, into the intestinal lumen, where it acts on dietary triglycerides entirely outside any cell — a genuine extracellular enzyme. This is distinct from the three distractors, all of which are intracellular enzymes acting inside the cytoplasm or mitochondria: lactate dehydrogenase (cytoplasmic glycolysis/gluconeogenesis), cytochrome oxidase (mitochondrial electron transport chain, Complex IV) and hexokinase (cytoplasmic, the first step of glycolysis).

## explicit_objective
Identify pancreatic lipase as a genuinely extracellular enzyme, distinct from lactate dehydrogenase, cytochrome oxidase and hexokinase, which all act intracellularly.

## pitfalls
Assuming any enzyme with clinical or diagnostic relevance in blood (like LDH, used as a tissue-damage marker) must be "extracellular" by function — LDH leaks into blood only after cell damage; its normal site of action is intracellular, unlike pancreatic lipase, whose normal job is performed entirely outside the cell that made it.

## concept_type
classification

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Enzymology

## subtopic
Enzyme localisation

## microtopic
Extracellular enzymes

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-PHYSIOLOGY-ANS-RENAL

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
"Which of the following is an example of an extracellular enzyme? a. Lactate dehydrogenase b. Cytochrome oxidase c. Pancreatic lipase d. Hexokinase" ANSWER: c (hand-drawn-ink key, with confirming X marks on the false options a and d, Final S&F 2024 .pdf p.5 Q30, render-confirmed)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard biochemistry textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-946D9212199A64

## label
Reversible non-competitive enzyme inhibition lowers the maximum velocity attainable with a given amount of enzyme

## canonical_key
enzymekinetics.noncompetitiveinhibition.vmax-lowered

## aliases
Non-competitive inhibition
Vmax reduction

## arabic_label


## arabic_aliases


## definition
In reversible non-competitive inhibition, the inhibitor binds at a site distinct from the substrate-binding site (on either the free enzyme or the enzyme-substrate complex), effectively removing some active enzyme from the usable pool regardless of substrate concentration — so Vmax falls, and it cannot be restored by adding more substrate, while Km itself is characteristically unchanged (unlike competitive inhibition, which raises the apparent Km but leaves Vmax reachable at high substrate). It does not require the inhibitor to structurally resemble the substrate (that is a competitive-inhibition feature).

## explicit_objective
State that reversible non-competitive inhibition lowers the maximum velocity (Vmax) attainable with a given amount of enzyme, distinct from the structural-resemblance-to-substrate feature of competitive inhibition.

## pitfalls
Attributing "structural resemblance to substrate" to non-competitive inhibition — that is the defining feature of competitive inhibition, which binds the same site as the substrate; a non-competitive inhibitor binds elsewhere and does not need to resemble the substrate at all.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Enzymology

## subtopic
Enzyme inhibition

## microtopic
Non-competitive inhibition

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-CYTOLOGY-ENZYMES

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.2

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
"In reversible non-competitive enzyme activity inhibition, the inhibitor binds at a site distinct to the substrate binding site. Which of the following is correct concerning it? a. Inhibitor bears structural resemblance to substrate b. Inhibitor lowers the maximum velocity attainable with a given amount of enzyme c. Km is increased d. Km is decreased" ANSWER: b (hand-drawn-ink key, Final S&F 2024 .pdf p.5 Q31)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard biochemistry textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-9E883BCBA70314

## label
Vitamin A deficiency causes night blindness, xerophthalmia and xeroderma

## canonical_key
vitamin.a-deficiency.nightblindness-xerophthalmia-xeroderma

## aliases
Vitamin A deficiency
Xerophthalmia

## arabic_label


## arabic_aliases


## definition
Vitamin A (retinol) is essential for the visual cycle (as 11-cis-retinal, part of rhodopsin) and for epithelial integrity. Its deficiency classically presents with inability to see in dim light (night blindness, from impaired rhodopsin regeneration) progressing to dryness of the conjunctiva/cornea (xerophthalmia) and dryness of the skin (xeroderma) — the triad in this vignette (inability to drive at night, xerophthalmia, xeroderma) — distinct from vitamin C, D or E deficiency, none of which produces this specific visual/epithelial pattern.

## explicit_objective
Recognise the vitamin A deficiency triad — night blindness, xerophthalmia, xeroderma — from a clinical vignette, distinct from vitamin C, D and E deficiency presentations.

## pitfalls
Confusing vitamin A's dryness/night-blindness presentation with vitamin D deficiency (bone-mineralisation defects, rickets/osteomalacia) or vitamin E deficiency (neuromuscular/hemolytic findings) — each fat-soluble vitamin has its own distinct deficiency picture, and this vignette's specific triad points only to vitamin A.

## concept_type
clinical_application

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Vitamins

## subtopic
Fat-soluble vitamin deficiency

## microtopic
Vitamin A deficiency

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-BIOCHEM-VITAMINS

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.7

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A 21-year-old man suffered from inability to drive at night for 6 months. Clinical examination revealed xerophthalmia and xeroderma. A deficiency of which of the following vitamins is deficient? a. Vitamin A b. Vitamin C c. Vitamin D d. Vitamin E" ANSWER: a (hand-drawn-ink key, Final S&F 2024 .pdf p.5 Q32)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard biochemistry/ophthalmology textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-9D7A5392883B71

## label
Vitamin K deficiency causes hemorrhagic disease of the newborn

## canonical_key
vitamin.k-deficiency.neonatal-hemorrhagic-disease

## aliases
Hemorrhagic disease of the newborn
Vitamin K deficiency bleeding

## arabic_label


## arabic_aliases


## definition
Vitamin K is required for gamma-carboxylation of clotting factors II, VII, IX and X in the liver; newborns have low vitamin K stores (poor placental transfer, sterile gut with no bacterial vitamin K synthesis yet, low content in breast milk) and, without prophylaxis, can develop hemorrhagic disease of the newborn — bleeding (classically from the umbilicus, as in this vignette) with a prolonged clotting time. This is distinct from pyridoxine (B6), riboflavin (B2) and vitamin C deficiencies, none of which produces this clotting-factor-dependent bleeding picture.

## explicit_objective
Recognise vitamin K deficiency as the cause of neonatal umbilical bleeding with prolonged clotting time in an unmedicated home birth, distinct from pyridoxine, riboflavin and vitamin C deficiency.

## pitfalls
Reaching for a B-vitamin (pyridoxine, riboflavin) when the vignette's key finding is a coagulation abnormality (prolonged clotting time) — that specifically implicates the vitamin K-dependent clotting factors, not a B-vitamin deficiency.

## concept_type
clinical_application

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Vitamins

## subtopic
Fat-soluble vitamin deficiency

## microtopic
Vitamin K deficiency in the newborn

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-BIOCHEM-VITAMINS

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.7

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A 2-day-neonate suffered from bleeding from the umbilicus and hemorrhagic tendency. He was born at home and didn't receive any medication since birth. Laboratory investigations showed prolongation of clotting time. Which of the following vitamins is deficient? a. Pyridoxine b. Riboflavin c. Vitamin K d. Vitamin C" ANSWER: c (hand-drawn-ink key, Final S&F 2024 .pdf p.5 Q33)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard biochemistry/pediatrics textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-503743C8F3398E

## label
Vitamin B1 (thiamine) deficiency causes beriberi

## canonical_key
vitamin.b1-deficiency.beriberi

## aliases
Thiamine deficiency
Beriberi

## arabic_label


## arabic_aliases


## definition
Vitamin B1 (thiamine) is a cofactor (as thiamine pyrophosphate) for several key enzymes (pyruvate dehydrogenase, alpha-ketoglutarate dehydrogenase, transketolase); its deficiency causes beriberi, presenting as either a peripheral neuropathy (dry beriberi) or high-output cardiac failure with edema (wet beriberi), distinct from the deficiency syndromes of B2 (riboflavin), B6 (pyridoxine) or B12 (cobalamin).

## explicit_objective
Name vitamin B1 (thiamine) as the vitamin whose deficiency causes beriberi, distinct from B2, B6 and B12 deficiency syndromes.

## pitfalls
Confusing the numbered B-vitamin deficiency syndromes with each other — beriberi (B1), specifically, is a frequently tested pairing that a student must not swap with pellagra (niacin/B3), ariboflavinosis (B2) or the neurological/hematological syndromes of B12 deficiency.

## concept_type
definition

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Vitamins

## subtopic
Water-soluble vitamin deficiency

## microtopic
Vitamin B1 deficiency

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-BIOCHEM-VITAMINS

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.6

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"Vitamins deficiencies lead to serious illnesses; What is vitamin deficiency cause Beriberi? a. B1 b. B2 c.B6 d.B12" ANSWER: a (hand-drawn-ink key, Final S&F 2024 .pdf p.5 Q34)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard biochemistry textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-6B060D2EDADCE7

## label
A vegetarian diet can eventually cause vitamin B12 deficiency, with onset delayed by years due to hepatic B12 stores

## canonical_key
vitamin.b12-deficiency.vegetarian-diet-delayed-onset

## aliases
Vitamin B12 deficiency
Strict vegetarian/vegan diet

## arabic_label


## arabic_aliases


## definition
Vitamin B12 (cobalamin) is obtained only from animal-derived foods; a strict vegetarian/vegan diet provides essentially none. Because the liver stores several years' worth of B12, deficiency symptoms characteristically take years (unlike folate deficiency, which develops over months, since folate stores are much smaller) to appear after dietary B12 intake stops — matching a vignette describing a multi-year vegetarian diet before symptoms emerge. This is distinct from thiamine, niacin or folic acid deficiency, none of which has this same years-long latency from a purely dietary cause.

## explicit_objective
Recognise vitamin B12 deficiency as the vitamin whose deficiency takes years (not months) to manifest on a vegetarian diet, due to large hepatic stores, distinct from thiamine, niacin and folic acid.

## pitfalls
Choosing folic acid instead of B12 for a vegetarian-diet vignette — plant foods do contain folate, and folate deficiency (when it occurs on a poor diet) develops over months due to small body stores, not the multi-year latency that specifically points to B12, which is absent from all plant foods but buffered by large liver stores.

## concept_type
clinical_application

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Vitamins

## subtopic
Water-soluble vitamin deficiency

## microtopic
Vitamin B12 deficiency

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-BIOCHEM-VITAMINS

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

## clinical_relevance
0.6

## academic_relevance
0.6

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids


## resource_occurrence_ids


## source_candidate_ids


## original_wording
"A 41-year-old journalist consumes on a vegetarian diet. After two years symptoms of vitamin deficiency develop. Which of the following vitamins is suspected to be deficient? a. Thiamine b.Niacin c. Folic acid d. (B12)" ANSWER: d (hand-drawn-ink key, Final S&F 2024 .pdf p.5 Q35)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard biochemistry/nutrition textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.

---

# Item

## id
CON-FND-BFB1DD86709AE7

## label
Folic acid is important for one-carbon metabolism

## canonical_key
folicacid.function.one-carbon-metabolism

## aliases
Folate coenzyme function
One-carbon transfer reactions

## arabic_label


## arabic_aliases


## definition
Folic acid, as its coenzyme form tetrahydrofolate, carries and transfers one-carbon units (methyl, methylene, formyl groups) in reactions including purine synthesis, thymidylate (dTMP) synthesis, and methionine regeneration from homocysteine — collectively "one-carbon metabolism". This is distinct from the distractors: folic acid is not directly involved in fatty acid oxidation, fatty acid synthesis, or gluconeogenesis, each of which depends on other cofactor/enzyme systems.

## explicit_objective
State that folic acid's core biochemical role is one-carbon metabolism, distinct from fatty acid oxidation, fatty acid synthesis and gluconeogenesis.

## pitfalls
Assuming folic acid participates broadly in "metabolism" generally rather than specifically in one-carbon transfer reactions (purine/thymidylate synthesis, homocysteine remethylation) — the distractors here are all real metabolic pathways, just ones folate is not the key cofactor for.

## concept_type
mechanism

## status
Draft

## support_mode
direct_statement

## subject
fnd

## primary_node_id


## secondary_node_ids


## topic
Vitamins

## subtopic
Water-soluble vitamin function

## microtopic
Folic acid and one-carbon metabolism

## nanotopic


## modules
ZU-MED-103

## article_ids
ART-FND-ZU103-BIOCHEM-VITAMINS

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
0.5

## exam_weight_by_year
ZU_Y1=0.6

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
"Folic acid is important for which of the following biochemical processes? a. Fatty acid oxidation b. Fatty acid synthesis c. Glucneogenesis d. One carbon metabolism" ANSWER: d (hand-drawn-ink key, Final S&F 2024 .pdf p.5 Q36)

## merge_ids


## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
No department-book or corpus-indexed source beyond this exam paper; a standard biochemistry textbook citation would strengthen this before publication.

## owner
Claude

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
resourceIds: No evidence-store src_ id exists for Final S&F 2024 .pdf yet; cited via question source_citation only, per 12-resources.md option 3.
primaryNodeId: No verified canonical taxonomy node supplied; left unguessed rather than invented.
sourceTypo: Q36's option c prints "Glucneogenesis" — kept as printed in the question text; this concept's own label/definition name the process correctly (gluconeogenesis).
