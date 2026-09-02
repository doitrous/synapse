<!--
  MU-MED105 (Cardiovascular system) · lane-1 authored concepts for the
  CVS End Module 43 cluster (42 questions), REPAIRED by lane-2 on
  2026-09-02 per the chief-of-staff's never-a-twin ruling. Searched via
  find-existing.mjs and a canonical-key grep sweep first (see
  coverage/MU-MED105-triage.md's concept-search sample and the per-item
  field_notes below).

  Repair summary: lane-1 originally minted 12 concepts it knew, by its own
  ## uncertainty notes, were "close in scope" to a specific pending
  concept in Kasr 104-CPS or Alexandria AU-MED-105 — minting them anyway
  to avoid a cross-lane simulate dependency, which is a never-a-twin
  violation. Every one of the 12 was read against its named sibling and
  confirmed the same fact (near-verbatim or a strict-subset match); none
  was rejected. All 12 twin records were deleted (2 of them, the two
  cardiac-cycle valve-state concepts, collapsed onto the SAME Kasr
  sibling), and replaced below with 11 sparse pending-live overlay rows
  (tag-additions only: +mu, +1, +MU-MED105 — no module_subject, per the
  ruling) onto their 11 distinct siblings. Their questions' main_concept/
  concept_ids were repointed to the sibling ids (see question file), and
  their now-orphaned article sections were deleted or trimmed (see
  article/MU-MED105-articles.md's own header). Full dispositions and
  source-question mapping are in each overlay row's own field_notes below.

  24 NEW concepts remain, self-contained to this lane (no gate/simulate
  dependency beyond this module's own files).

  1 sparse OVERLAY row (tag-additions only, no body fields) onto a concept
  already LIVE in server/data/medical-library-v1.json, which needs no
  extra dependency file since gate reads live state directly:
    - CON-CVS-AD0881F8B57C91 (Afterload) — q42

  11 sparse OVERLAY rows (tag-additions only, per the repair above) onto
  concepts still PENDING in Kasr 104-CPS / Alexandria AU-MED-105's own
  files — each row's own field_notes names its exam question(s) and its
  sibling's home concept/article file:
    - CON-CVS-2A21F1B4F30B61 (Kasr, right coronary artery) — q13, q21
    - CON-MSK-0415214C935D2D (Alexandria, dorsalis pedis) — q17
    - CON-CVS-D0CD4A234205EF (Kasr, AP plateau) — q22
    - CON-CVS-5288011D93888B (Kasr, refractory/supernormal phase) — q24
    - CON-CVS-A4657614AE6923 (Alexandria, pacemaker vs working AP) — q25
    - CON-CVS-9B1C94AF064C3D (Kasr, AV node delay) — q28, q29
    - CON-CVS-859114E6FE6C90 (Alexandria, contractility) — q31, q33
    - CON-CVS-3142C436848ABD (Alexandria, Frank-Starling law) — q32
    - CON-CVS-F51E391CCECE6A (Kasr, valve states/heart sounds) — q35, q41
    - CON-CVS-B8AFC98120E132 (Kasr, atrial pressure a-c-v waves) — q36
    - CON-CVS-A99309543A270D (Kasr, cardiac reserve) — q44

  Evidence (one claim + one citation per new concept) is in the sibling
  evidence/MU-MED105-* files, citing the module's own Integrated CVS Book
  and Anatomy Support 43 CVS book. Teaching articles are in
  article/MU-MED105-articles.md. The 11 pending-live overlays teach from
  their own sibling's own article, not from this module's articles file.

  Simulate together with the sibling article + evidence files, the 11
  pending Kasr/Alexandria concept + article files the overlay rows above
  depend on, and this module's question batch:
    npm run medical:simulate -- \
      docs/Kasr-Source-Imports/concept/104-CPS-concepts.md \
      docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md \
      docs/Kasr-Source-Imports/concept/104-CPS-physiology-concepts.md \
      docs/Kasr-Source-Imports/concept/104-CPS-mcq-concepts.md \
      docs/Kasr-Source-Imports/article/104-CPS-anatomy.md \
      docs/Kasr-Source-Imports/article/104-CPS-articles.md \
      docs/Kasr-Source-Imports/article/104-CPS-physiology.md \
      docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md \
      docs/Alexandria-Source-Imports/concept/AU-MED-105-physiology-concepts.md \
      docs/Alexandria-Source-Imports/article/AU-MED-105-anatomy-articles.md \
      docs/Alexandria-Source-Imports/article/AU-MED-105-physiology-articles.md \
      docs/Menoufia-Source-Imports/concept/MU-MED105-concepts.md \
      docs/Menoufia-Source-Imports/article/MU-MED105-articles.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED105-resources.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED105-claims.md \
      docs/Menoufia-Source-Imports/evidence/MU-MED105-citations.md \
      docs/Menoufia-Source-Imports/question/MU-MED105-end43-mcq.md \
      --emit /tmp/sim-MU-MED105.json

  Import: Admin › Concepts › Import.
-->

# Item

## label
Cardiac muscle fibres are joined end to end by intercalated discs — cell junctions at the Z-lines whose transverse fascia adherens/desmosome portion anchors adjacent fibres and whose lateral gap-junction portion lets the whole tissue act as a functional (not true) electrical syncytium

## id
CON-CVS-541BCC4EDBF23B

## canonical_key
cvs.histology.intercalated-disc-syncytium

## aliases
Intercalated discs
Cardiac muscle functional syncytium
Gap junctions cardiac conduction

## arabic_label
الأقراص البينية للعضلة القلبية

## arabic_aliases
المخلوية الوظيفية للقلب

## definition
Intercalated discs are step-like cell junctions that cross cardiac muscle fibres at the Z-lines, joining one myocyte to the next end to end. Each disc has a transverse portion (fascia adherens and desmosomes, which mechanically anchor neighbouring cells so the tissue can pull as one during contraction) and a lateral portion (gap junctions, low-resistance channels that let the action potential spread cell to cell without any nerve). Because individual myocytes stay anatomically separate but are electrically continuous through these gap junctions, cardiac muscle behaves as a functional syncytium, not a true one.

## explicit_objective
Name intercalated discs as the Z-line junctions that both mechanically link and electrically couple cardiac myocytes, and identify gap junctions specifically as the structure that lets electrical signals conduct from one cardiac cell to the next.

## pitfalls
Treating cardiac muscle as a true anatomical syncytium (fused cytoplasm, as in some invertebrate muscle) rather than a functional one — cardiac myocytes remain distinct cells joined by gap junctions, not fused together. Confusing the disc's two portions: the transverse (fascia adherens/desmosome) portion is mechanical, the lateral (gap junction) portion is electrical.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-CVS-T01-S01-M04

## topic
Histology

## subtopic
Cardiovascular System

## microtopic
Cardiac muscle intercalated discs

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Histology/Physiology

## article_ids
ART-CVS-MU105-HISTOLOGY

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-CVS-541BCC4EDBF23B

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q1: Which one of the followings is a character of cardiac muscle fibers? / Has intercalated disk. Q27: What is the primary factor facilitating the conduction of electrical signals between cardiac cells? / Presence of gap junctions

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p1,p7 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
Lipofuscin, a yellowish-brown "wear and tear" pigment, accumulates progressively in cardiac muscle fibres with advancing age

## id
CON-CVS-48462697F07B7F

## canonical_key
cvs.histology.lipofuscin-aging-pigment

## aliases
Lipofuscin cardiac muscle
Wear and tear pigment heart

## arabic_label
صبغة الليبوفسين في عضلة القلب

## arabic_aliases


## definition
Lipofuscin is a yellowish-brown, autofluorescent lipid-protein pigment that accumulates within cardiac muscle fibres — and other long-lived, post-mitotic cells — as a byproduct of lysosomal degradation of oxidised, damaged organelles. Because cardiac myocytes essentially never divide, this residue is never diluted out by cell turnover and instead builds up steadily across a person's life, which is why it is called a "wear and tear" pigment and why its amount in a histological section rises with the individual's age.

## explicit_objective
State that lipofuscin is the pigment that accumulates in cardiac muscle fibres specifically with advancing age, distinct from glycogen or myoglobin (also present in cardiac muscle but not age-related).

## pitfalls
Confusing lipofuscin with myoglobin or glycogen — the department book lists all three as cardiac-muscle-fibre contents, but only lipofuscin is the one whose amount specifically increases with age; myoglobin and glycogen are baseline structural/metabolic components, not accumulating aging markers.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-CVS-T01-S01-M04

## topic
Histology

## subtopic
Cardiovascular System

## microtopic
Cardiac muscle fibre pigments

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Histology

## article_ids
ART-CVS-MU105-HISTOLOGY

## related_article_ids


## related_concept_ids
CON-CVS-541BCC4EDBF23B

## resource_ids
src_5ca028d96bdca72569d0

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
0.2

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-CVS-48462697F07B7F

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q2: With advance of age, cardiac muscle fibers shows an increase in which one of followings? / Lipofuscin pigment

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p1 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
Purkinje fibres are large, pale-staining, vacuolated modified cardiac muscle cells of the AV bundle branches, containing few myofibrils and abundant glycogen

## id
CON-CVS-39355F0F93C292

## canonical_key
cvs.histology.purkinje-fibre-characteristics

## aliases
Purkinje fibre histology
Pale staining conducting fibres

## arabic_label
ألياف بوركنجي

## arabic_aliases


## definition
Purkinje fibres are modified cardiac muscle cells forming the peripheral conducting system (the branches of the AV bundle). Histologically they are larger than ordinary cardiac muscle fibres, stain pale because they contain few myofibrils (concentrated at the fibre periphery) and abundant glycogen, and their cytoplasm looks vacuolated in routine sections because the glycogen dissolves out during processing. Their sparse myofibril content and central, glycogen-rich cytoplasm are what specialise them for fast impulse conduction rather than forceful contraction.

## explicit_objective
State that Purkinje fibres stain pale (from few myofibrils and abundant glycogen, not from any of the alternative options an exam offers) and are larger than ordinary cardiac muscle fibres.

## pitfalls
Assuming a larger cell must stain darker (more myofibril protein) — Purkinje fibres are the opposite: larger overall but with fewer myofibrils per unit area, so they stain paler, not darker, than ordinary cardiac muscle.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-CVS-T01-S01-M04

## topic
Histology

## subtopic
Cardiovascular System

## microtopic
Purkinje fibre histology

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Histology

## article_ids
ART-CVS-MU105-HISTOLOGY

## related_article_ids


## related_concept_ids
CON-CVS-03CAAB3C8FE36C

## resource_ids
src_5ca028d96bdca72569d0

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
0.25

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-CVS-39355F0F93C292

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q3: Which one of the followings is a characteristic of purkinje muscle fibers? / Pale staining

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p1 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
T-tubules in cardiac muscle are sarcolemmal invaginations located at the Z-lines, larger than skeletal muscle's own T-tubules

## id
CON-CVS-9258E1D3C59637

## canonical_key
cvs.histology.t-tubule-z-line-location

## aliases
Cardiac T-tubule location
T-tubule Z-line

## arabic_label
الأنيبيبات المستعرضة عند خط Z

## arabic_aliases


## definition
T-tubules are tubular invaginations of the sarcolemma that carry the surface action potential deep into the muscle fibre. In cardiac muscle they are located at the Z-lines (one per sarcomere) and are wider in calibre than skeletal muscle's own T-tubules, which instead sit at the A-I junction, two per sarcomere. This single-tubule-per-Z-line arrangement is part of what gives cardiac muscle its diad (rather than skeletal muscle's triad) tubular system.

## explicit_objective
Locate the cardiac T-tubule at the Z-line and distinguish this from skeletal muscle's A-I-junction location.

## pitfalls
Carrying over the skeletal-muscle rule (T-tubules at the A-I junction) to cardiac muscle — the location differs by tissue: cardiac T-tubules sit at the Z-line, skeletal at the A-I junction.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-CVS-T01-S01-M04

## topic
Histology

## subtopic
Cardiovascular System

## microtopic
Cardiac muscle T-tubule system

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Histology

## article_ids
ART-CVS-MU105-HISTOLOGY

## related_article_ids


## related_concept_ids
CON-CVS-4F6B826A873478

## resource_ids
src_5ca028d96bdca72569d0

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
0.2

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-CVS-9258E1D3C59637

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q4: What is the location of T-tubules in cardiac muscle? / Z-line

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p1 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
Cardiac muscle's tubular system forms diads, not triads — each junction is one T-tubule paired with one sarcoplasmic-reticulum terminal cisterna

## id
CON-CVS-4F6B826A873478

## canonical_key
cvs.histology.diad-tubular-system

## aliases
Cardiac diad
Cardiac muscle tubular system

## arabic_label
النظام الأنبوبي الثنائي بعضلة القلب

## arabic_aliases


## definition
Skeletal muscle's tubular system forms triads — one T-tubule flanked by two terminal cisternae of sarcoplasmic reticulum. Cardiac muscle's own sarcoplasmic reticulum is less well developed than skeletal muscle's, and its T-tubule couples with only one terminal cisterna, forming a diad rather than a triad. This is one of several histological features (alongside T-tubule location and calibre) that distinguish cardiac from skeletal muscle ultrastructure.

## explicit_objective
State that cardiac muscle's tubular junction is a diad (one T-tubule plus one sarcoplasmic-reticulum terminal cisterna), not a triad, and that triads belong to skeletal muscle instead.

## pitfalls
Applying skeletal muscle's triad arrangement to cardiac muscle by default — cardiac muscle's own sarcoplasmic reticulum is less developed and its tubular junction has only one cisterna per T-tubule (diad), not two (triad).

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-CVS-T01-S01-M04

## topic
Histology

## subtopic
Cardiovascular System

## microtopic
Cardiac muscle T-tubule system

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Histology

## article_ids
ART-CVS-MU105-HISTOLOGY

## related_article_ids


## related_concept_ids
CON-CVS-9258E1D3C59637

## resource_ids
src_5ca028d96bdca72569d0

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
0.2

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-CVS-4F6B826A873478

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q5: Which one of the followings is true concerning the tubular system in cardiac muscle cells? / Consists of one terminal cisterna of sarcoplasmic reticulum & one T-tubule

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p2 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.

---

# Item

## label
The femoral vein lies immediately medial to the femoral artery at the base of the femoral triangle

## id
CON-CVS-A888A1AB787256

## canonical_key
cvs.anatomy.femoral-triangle-vein-medial-to-artery

## aliases
Femoral triangle vessel order
Femoral vein position

## arabic_label
الوريد الفخذي إنسي للشريان الفخذي

## arabic_aliases


## definition
At the base of the femoral triangle (the femoral vessels' entry point under the inguinal ligament), the femoral nerve, artery and vein sit in that order from lateral to medial ("NAVEL": Nerve, Artery, Vein, Empty space, Lymphatics). The structure immediately medial to the femoral artery is therefore the femoral vein, both vessels sharing the femoral sheath with the vein enclosed in its own medial compartment.

## explicit_objective
State the lateral-to-medial order of femoral triangle contents (nerve, artery, vein) and identify the femoral vein as the structure immediately medial to the femoral artery.

## pitfalls
Confusing this local vessel order with the femoral sheath's own three compartments (lateral: artery: femoral canal/lymphatics) — the question asks what is medial to the artery specifically, which is the vein, not the femoral canal (that lies medial to the vein, one compartment further).

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01-M03

## topic
Anatomy

## subtopic
Lower limb vasculature

## microtopic
Femoral triangle contents

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Anatomy

## article_ids
ART-CVS-MU105-PERIPHERAL-VESSELS

## related_article_ids


## related_concept_ids


## resource_ids
src_876c2bd15d1bf71629c5

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
0.75

## weight_confidence
0.35

## confidence
0.75

## atomic_claim_ids
CLM-CVS-A888A1AB787256

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q7: Which one of the following structures lies immediately medial to the femoral artery at the base of the femoral triangle? / Femoral vein

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p2 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
This is a lower-limb (not chest/heart) anatomy fact recycled onto the CVS Anatomy rotation — a common pattern in this corpus (LANE-CARD §7); cited to the CVS anatomy department book's own vessel chapter, not independently confirmed against a MED104/MSK-specific source.

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
The peroneal (fibular) artery arises from the posterior tibial artery in the deep posterior compartment of the leg

## id
CON-CVS-FB707E448E503C

## canonical_key
cvs.anatomy.peroneal-artery-from-posterior-tibial

## aliases
Fibular artery origin
Peroneal artery branch

## arabic_label
الشريان الشظوي فرع من الشريان الظنبوبي الخلفي

## arabic_aliases


## definition
The popliteal artery divides into the anterior tibial artery (which pierces the interosseous membrane to supply the anterior compartment) and the posterior tibial artery (which continues in the deep posterior compartment). A short distance below its origin, the posterior tibial artery gives off the peroneal (fibular) artery as its largest branch, which runs along the fibula supplying the lateral and deep posterior compartments and the fibula's own nutrient artery.

## explicit_objective
State that the peroneal artery is a branch of the posterior tibial artery, not a direct branch of the popliteal, femoral or anterior tibial arteries.

## pitfalls
Assuming the peroneal artery branches directly from the popliteal artery (it does not — the popliteal first splits into anterior and posterior tibial arteries, and only the posterior tibial then gives off the peroneal).

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01-M03

## topic
Anatomy

## subtopic
Lower limb vasculature

## microtopic
Leg arteries

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Anatomy

## article_ids
ART-CVS-MU105-PERIPHERAL-VESSELS

## related_article_ids


## related_concept_ids
CON-MSK-0415214C935D2D

## resource_ids
src_876c2bd15d1bf71629c5

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
0.75

## weight_confidence
0.35

## confidence
0.75

## atomic_claim_ids
CLM-CVS-FB707E448E503C

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q8: The peroneal artery is a branch of which of the following arteries? / Posterior tibial artery

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p2 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
Lower-limb anatomy recycled onto the CVS Anatomy rotation, same pattern as CON-CVS-A888A1AB787256; not independently confirmed against a MED104/MSK-specific source.

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
Tricuspid valve incompetence lets blood regurgitate backward into the right atrium during ventricular systole

## id
CON-CVS-DEF0999654CC4B

## canonical_key
cvs.anatomy.tricuspid-regurgitation-right-atrium

## aliases
Tricuspid regurgitation direction
Incompetent AV valve backflow

## arabic_label
قصور الصمام ثلاثي الشرفات يرتد الدم للأذين الأيمن

## arabic_aliases


## definition
The tricuspid valve normally closes at the start of ventricular systole, sealing the right atrioventricular orifice so the contracting right ventricle ejects blood forward into the pulmonary trunk. When the valve is incompetent (regurgitant), it fails to seal completely, and some ventricular blood is instead forced backward, upstream, into the right atrium — the chamber immediately proximal to the diseased valve — producing the systolic murmur and, over time, the right atrial and systemic venous congestion (peripheral oedema) of tricuspid regurgitation.

## explicit_objective
State that an incompetent tricuspid valve regurgitates blood into the right atrium (the chamber proximal to the valve on the inflow side), not forward into the pulmonary circulation or into other chambers.

## pitfalls
Confusing regurgitation direction with the valve's normal forward flow direction — regurgitation is specifically backward, into the chamber the blood came from (right atrium for the tricuspid valve), the opposite of the valve's competent, forward-only function.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01-M03

## topic
Anatomy

## subtopic
Heart chambers and valves

## microtopic
Tricuspid valve incompetence

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Anatomy

## article_ids
ART-CVS-MU105-CHAMBER-VALVE-PERICARDIUM

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## academic_relevance
0.75

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-CVS-DEF0999654CC4B

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q9: A 45-year-old female is admitted to the hospital with swelling (edema) of the lower limbs. Ultrasound examination reveals an incompetent tricuspid valve. Into which area will regurgitation of blood occur in this patient? / Right atrium

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p3 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
The sino-atrial node lies at the junction of the superior vena cava and the right atrium

## id
CON-CVS-1BAC795EE1ECE7

## canonical_key
cvs.anatomy.sa-node-location-svc-ra-junction

## aliases
SA node location
Sinu-atrial node site

## arabic_label
موضع العقدة الجيبية الأذينية

## arabic_aliases


## definition
The sino-atrial (SA) node — the mass of specialised, modified cardiac muscle cells that initiates each normal cardiac cycle — sits in the wall of the right atrium at the upper end of the crista terminalis, precisely at the junction where the superior vena cava enters the right atrium. This anatomical position is separate from its physiological property of being the fastest-discharging pacemaker; the question of where it sits and the question of why it leads are two distinct facts about the same structure.

## explicit_objective
Locate the SA node anatomically at the superior-vena-cava/right-atrium junction, distinct from the AV node's own location at the atrioventricular septum.

## pitfalls
Mixing up the SA node's location (SVC/right-atrium junction) with the AV node's location (in the atrioventricular septum near the coronary sinus opening) — both are conducting-system landmarks but sit in different chambers.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01-M03

## topic
Anatomy

## subtopic
Heart conducting system

## microtopic
SA node location

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Anatomy

## article_ids
ART-CVS-MU105-CHAMBER-VALVE-PERICARDIUM

## related_article_ids


## related_concept_ids
CON-CVS-9B1C94AF064C3D

## resource_ids
src_5ca028d96bdca72569d0

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.45

## exam_weight_by_year
MU_Y1=0.45

## clinical_relevance
0.4

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-CVS-1BAC795EE1ECE7

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q10: A 35-year-old female is admitted to the emergency department because of Cardiac arrhythmia. Where is the mass of specialized conducting tissue that initiates the cardiac cycle located? / At the junction of the superior vena cava and the right atrium

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p3 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
The posterior wall of the left ventricle is formed by the left two-thirds of the heart's diaphragmatic surface

## id
CON-CVS-68BF2821F7BD30

## canonical_key
cvs.anatomy.lv-posterior-wall-diaphragmatic-surface

## aliases
Left ventricle posterior wall
Diaphragmatic surface of heart

## arabic_label
الجدار الخلفي للبطين الأيسر

## arabic_aliases


## definition
The heart's diaphragmatic (inferior) surface rests on the central tendon of the diaphragm and is formed mainly by the left ventricle, with a smaller right ventricular contribution. Specifically, the left two-thirds of this diaphragmatic surface belongs to the left ventricle and constitutes its posterior (inferior) wall, while the right one-third belongs to the right ventricle — the same left-dominant division seen on the heart's sternocostal (anterior) surface, where the left ventricle instead contributes only its own left one-third.

## explicit_objective
State that the left ventricle's posterior wall corresponds to the left two-thirds of the diaphragmatic surface of the heart, and distinguish this fraction from the reversed left-third/right-two-thirds split on the sternocostal surface.

## pitfalls
Swapping the fractions between surfaces — the left ventricle contributes its LARGER share (two-thirds) to the diaphragmatic surface but its SMALLER share (one-third) to the sternocostal surface, the opposite pattern to what intuition might suggest.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01-M03

## topic
Anatomy

## subtopic
Heart surfaces

## microtopic
Diaphragmatic surface of the heart

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Anatomy

## article_ids
ART-CVS-MU105-CHAMBER-VALVE-PERICARDIUM

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.25

## academic_relevance
0.8

## weight_confidence
0.35

## confidence
0.7

## atomic_claim_ids
CLM-CVS-68BF2821F7BD30

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q11: The posterior wall of the left ventricle comprises which of the following surfaces of the heart? / Left 2/3 of the diaphagmatic surface of the heart

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p3 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
No exact-phrase confirmation of the "left two-thirds" fraction found via grep in the department book's own diaphragmatic-surface description (the book's heart-surfaces section was not fully text-searchable for this specific fraction); the fact is standard gross-anatomy teaching and the printed exam key stands per rule 1, but this concept's evidence gap is real, not cosmetic.

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
The anterior interventricular artery is the terminal continuation of the left coronary artery, running with the great cardiac vein in the anterior interventricular groove

## id
CON-CVS-1457E145410C1C

## canonical_key
cvs.anatomy.anterior-iv-artery-from-left-coronary

## aliases
Anterior interventricular artery origin
LAD origin

## arabic_label
الشريان بين البطينين الأمامي فرع الشريان التاجي الأيسر

## arabic_aliases


## definition
The left coronary artery arises from the left posterior aortic sinus and, after a short main stem, divides into two terminal branches: the anterior interventricular artery (continuing down the anterior interventricular groove with the great cardiac vein, supplying both ventricles and the anterior two-thirds of the interventricular septum) and the circumflex artery (curving around the heart's left border into the posterior coronary sulcus). The anterior interventricular artery is therefore a direct continuation of the left, not the right, coronary artery.

## explicit_objective
State that the anterior interventricular artery is a branch (terminal continuation) of the left coronary artery, and name the circumflex artery as its sibling branch from the same origin.

## pitfalls
Assigning the anterior interventricular artery to the right coronary artery by confusing it with that artery's own posterior interventricular branch — the anterior interventricular artery belongs to the left coronary artery; the right coronary artery's own interventricular branch runs posteriorly, not anteriorly.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01-M03

## topic
Anatomy

## subtopic
Coronary vessels

## microtopic
Left coronary artery branches

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Anatomy

## article_ids
ART-CVS-MU105-CORONARY-ANATOMY

## related_article_ids


## related_concept_ids
CON-CVS-2A21F1B4F30B61

## resource_ids
src_5ca028d96bdca72569d0

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.45

## exam_weight_by_year
MU_Y1=0.45

## clinical_relevance
0.5

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-CVS-1457E145410C1C

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q12: The anterior interventricular artery is a branch of which of the following? / Left coronary artery

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p3 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
The unpaired branches of the abdominal aorta (coeliac trunk, superior mesenteric, inferior mesenteric, median sacral) supply midline gut derivatives; the gonadal, renal and suprarenal arteries are paired, not unpaired

## id
CON-CVS-D6166DE26FC349

## canonical_key
cvs.anatomy.abdominal-aorta-unpaired-branches

## aliases
Abdominal aorta unpaired branches
Coeliac trunk SMA IMA median sacral

## arabic_label
الفروع الفردية للشريان الأورطي البطني

## arabic_aliases


## definition
The abdominal aorta gives both paired (bilateral) and unpaired (midline) branches. Its unpaired branches are the coeliac trunk, the superior mesenteric artery, the inferior mesenteric artery and the median sacral artery — all four supplying midline gut derivatives (or, for the median sacral, the midline continuation of the aorta itself). The gonadal, renal, middle suprarenal and inferior phrenic arteries, by contrast, are paired, arising bilaterally to supply laterally-placed organs.

## explicit_objective
List the abdominal aorta's four unpaired branches (coeliac trunk, superior mesenteric, inferior mesenteric, median sacral) and identify the gonadal artery as paired, not unpaired.

## pitfalls
Assuming every artery supplying an abdominal organ mentioned alongside the gut vessels must also be unpaired — the gonadal arteries supply paired (bilateral) gonads and are themselves paired, unlike the midline gut-derivative arteries in this list.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01-M03

## topic
Anatomy

## subtopic
Abdominal aorta

## microtopic
Unpaired abdominal aortic branches

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Anatomy

## article_ids
ART-CVS-MU105-PERIPHERAL-VESSELS

## related_article_ids


## related_concept_ids


## resource_ids
src_876c2bd15d1bf71629c5

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
0.75

## weight_confidence
0.35

## confidence
0.75

## atomic_claim_ids
CLM-CVS-D6166DE26FC349

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q14: All the following are unpaired branches of the abdominal aorta EXCEPT / Gonadal artery

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p4 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
General vascular anatomy recycled onto the CVS Anatomy rotation (the abdominal aorta is not itself part of the heart/thorax), same pattern as the lower-limb items; not independently confirmed against the CVS anatomy department book's own text via grep.

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
The femoral artery becomes the popliteal artery by passing through the adductor hiatus, the gap in adductor magnus's insertion

## id
CON-CVS-FBD7BE4AC072A7

## canonical_key
cvs.anatomy.adductor-hiatus-femoral-to-popliteal

## aliases
Adductor hiatus
Adductor magnus opening

## arabic_label
الفتحة الوترية للعضلة المقربة الكبرى

## arabic_aliases


## definition
The femoral artery runs down the adductor canal (Hunter's canal) in the thigh's medial compartment, then leaves it by passing through the adductor hiatus — a gap between the adductor and hamstring parts of adductor magnus's distal insertion — to enter the popliteal fossa, where it is renamed the popliteal artery. No other thigh adductor (gracilis, adductor longus, adductor brevis) forms this opening; it belongs specifically to adductor magnus.

## explicit_objective
Name adductor magnus's tendinous opening (the adductor hiatus) as the structure the femoral artery passes through to become the popliteal artery.

## pitfalls
Assuming any adductor muscle could form this opening — the adductor hiatus is a feature specific to adductor magnus's own distal attachment, not shared by adductor longus, brevis or gracilis.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01-M03

## topic
Anatomy

## subtopic
Lower limb vasculature

## microtopic
Adductor hiatus

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Anatomy

## article_ids
ART-CVS-MU105-PERIPHERAL-VESSELS

## related_article_ids


## related_concept_ids
CON-CVS-76ACE0E1CFD074

## resource_ids
src_876c2bd15d1bf71629c5

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
0.75

## weight_confidence
0.35

## confidence
0.75

## atomic_claim_ids
CLM-CVS-FBD7BE4AC072A7

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q15: The femoral artery continues as the popliteal artery through the opening in which of the following muscles? / Adductor magnus

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p4 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
Lower-limb anatomy recycled onto the CVS Anatomy rotation, same pattern as the other lower-limb items in this cluster.

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
Adductor longus separates the femoral vessels from the profunda femoris vessels in the thigh's medial compartment

## id
CON-CVS-76ACE0E1CFD074

## canonical_key
cvs.anatomy.adductor-longus-separates-femoral-profunda

## aliases
Adductor longus femoral vessel relation
Profunda femoris relation

## arabic_label
العضلة المقربة الطويلة تفصل الأوعية الفخذية عن الوعاء العميق

## arabic_aliases


## definition
Below the femoral triangle, the femoral vessels enter the adductor canal, where adductor longus (proximally) and adductor magnus (distally) form the canal's floor. The profunda femoris artery and vein, having branched off more proximally, run their own separate course deep to adductor longus; it is this muscle that lies between (separates) the femoral vessels running superficially in the canal and the profunda vessels running deep to it.

## explicit_objective
State that adductor longus is the muscle that separates the femoral vessels from the profunda femoris vessels in the thigh.

## pitfalls
Confusing this separating role with adductor longus's other anatomical relations (such as forming the medial border of the femoral triangle) — the specific tested fact here is its position between the femoral and profunda vessel planes, not its triangle-boundary role.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01-M03

## topic
Anatomy

## subtopic
Lower limb vasculature

## microtopic
Adductor canal relations

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Anatomy

## article_ids
ART-CVS-MU105-PERIPHERAL-VESSELS

## related_article_ids


## related_concept_ids
CON-CVS-FBD7BE4AC072A7

## resource_ids
src_876c2bd15d1bf71629c5

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
0.7

## weight_confidence
0.3

## confidence
0.65

## atomic_claim_ids
CLM-CVS-76ACE0E1CFD074

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q16: The femoral vessels are separated from the profunda vessels by which of the following muscles? / Adductor longus

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p4 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
Lower-limb anatomy recycled onto the CVS Anatomy rotation; this concept's own evidence gap is wider than most in this cluster — no department-book quote confirming the exact "separates femoral from profunda" phrasing was located, only the standard adductor-canal relations this fact is consistent with. Genuine evidence gap, not cosmetic.

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
The oblique sinus of the pericardium lies behind the left atrium, with the descending thoracic aorta the structure immediately posterior to a hand introduced into it

## id
CON-CVS-5B0C381101C0A4

## canonical_key
cvs.anatomy.oblique-sinus-posterior-descending-aorta

## aliases
Oblique sinus of pericardium
Pericardial sinuses posterior relations

## arabic_label
الجيب المائل للتامور

## arabic_aliases


## definition
The oblique sinus of the pericardium is a blind recess behind the left atrium, bounded by the pericardial reflections around the four pulmonary veins and the inferior vena cava — unlike the transverse sinus, it is a cul-de-sac with only one opening. A hand introduced into the oblique sinus, from below, has the posterior pericardial wall immediately behind it, and beyond that wall lies the descending thoracic aorta, the structure that is therefore posterior to the hand, separated from it only by the fibrous pericardium and posterior mediastinal connective tissue.

## explicit_objective
Locate the oblique sinus behind the left atrium and name the descending thoracic aorta as the structure posterior to a hand placed in it, distinct from the vessels that bound the sinus's own opening.

## pitfalls
Naming one of the sinus's own boundary vessels (pulmonary veins, IVC, ascending aorta, pulmonary trunk) as what lies posterior to a hand in the sinus — those vessels bound the oblique sinus's opening or lie anterior to it; the descending thoracic aorta is the structure posterior to the sinus itself, beyond the pericardial wall.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01-M03

## topic
Anatomy

## subtopic
Pericardium

## microtopic
Pericardial sinuses

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Anatomy

## article_ids
ART-CVS-MU105-CHAMBER-VALVE-PERICARDIUM

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.35

## academic_relevance
0.8

## weight_confidence
0.35

## confidence
0.7

## atomic_claim_ids
CLM-CVS-5B0C381101C0A4

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q19: If you introduce your hand into the oblique sinus of the pericardium then which of the following lies posterior to your hand? / Descending thoracic aorta

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p5 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
The department book's own oblique-sinus page (p35) is figure-only with minimal running text in the native layer; boundaries description confirmed on p34, but the specific "descending aorta posterior to a hand in the sinus" clinical framing was not itself found as a direct quote — standard gross-anatomy teaching, printed key stands per rule 1, but the citation below is to the general oblique-sinus section, not an exact-phrase match.

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
Rhythmicity is the heart's own ability to generate spontaneous, regular impulses without external nervous stimulation

## id
CON-CVS-3BBEF4F17A1928

## canonical_key
cvs.physiology.rhythmicity-definition

## aliases
Cardiac rhythmicity
Myogenic rhythm

## arabic_label
انتظام القلب الذاتي

## arabic_aliases


## definition
Rhythmicity is one of the four physiological properties of cardiac muscle (alongside excitability, conductivity and contractility): the ability of the heart to beat regularly on its own, without needing an external nerve impulse to trigger each beat. This property is myogenic — it originates within the heart's own specialised pacemaker tissue (the SA node, normally) rather than being imposed by the autonomic nervous system, which only modulates the rate rather than creates the rhythm.

## explicit_objective
Define rhythmicity as the heart's own ability to beat regularly without external stimulation, distinct from the other three cardiac properties (excitability, conductivity, contractility) an exam may set alongside it.

## pitfalls
Confusing rhythmicity (the ability to generate the impulse spontaneously and regularly) with excitability (the ability to respond to a stimulus) or conductivity (the ability to transmit the impulse) — the three are related but named for distinct roles in the same overall process.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PHY-T02

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Physiology

## subtopic
Cardiovascular System

## microtopic
Physiological properties of cardiac muscle

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Physiology

## article_ids
ART-CVS-MU105-AUTOMATICITY-CONDUCTION

## related_article_ids


## related_concept_ids
CON-CVS-1BAC795EE1ECE7

## resource_ids
src_5ca028d96bdca72569d0

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
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-CVS-3BBEF4F17A1928

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q23: Rhythmicity: is the ability of the cardiac muscle to / Initiate spontaneous, regular impulse

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p6 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
The Bainbridge (atrial) reflex: distension of the right atrium by increased venous return stretches the SA node and raises heart rate

## id
CON-CVS-5419DA4CEFDBB6

## canonical_key
cvs.physiology.bainbridge-reflex-venous-return-heart-rate

## aliases
Bainbridge reflex
Atrial stretch reflex heart rate

## arabic_label
منعكس باينبريدج

## arabic_aliases


## definition
Increased venous return distends the right atrium, mechanically stretching the pacemaker cells of the SA node sitting in its wall. This stretch itself increases SA-node permeability to Ca2+ (through L- and T-type channels), speeding the pacemaker's own spontaneous depolarisation and raising heart rate — the Bainbridge effect. Because a higher heart rate paired with the extra venous return also raises stroke volume, the net effect is a rise in cardiac output that helps the heart cope with an increased venous inflow rather than letting blood dam up behind it.

## explicit_objective
State that increased venous return raises heart rate via the Bainbridge reflex (right-atrial/SA-node stretch), one of several mechanical factors affecting heart rate.

## pitfalls
Assuming increased venous return should slow the heart (by analogy with baroreceptor-mediated reflexes that slow the heart when pressure rises) — the Bainbridge reflex is a distinct, atrial-stretch-specific mechanism that raises, not lowers, heart rate.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PHY-T02

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Physiology

## subtopic
Cardiovascular System

## microtopic
Factors affecting heart rate

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Physiology

## article_ids
ART-CVS-MU105-AUTOMATICITY-CONDUCTION

## related_article_ids


## related_concept_ids
CON-CVS-E0AB698D1EFEBE

## resource_ids
src_5ca028d96bdca72569d0

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
0.85

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-CVS-5419DA4CEFDBB6

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q26: Which one of the following factors increases the heart rate? / Increase venous return

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p7 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
Purkinje fibres conduct the cardiac impulse faster than any other part of the conducting system

## id
CON-CVS-03CAAB3C8FE36C

## canonical_key
cvs.physiology.purkinje-fastest-conduction-velocity

## aliases
Purkinje conduction velocity
Fastest cardiac conduction

## arabic_label
أسرع توصيل بألياف بوركنجي

## arabic_aliases


## definition
Conduction velocity differs markedly across the parts of the cardiac conducting system: it is slowest through the AV node (about 0.05 m/s, the deliberate delay), intermediate through atrial and ventricular muscle, and fastest through the Purkinje fibre network (up to about 4 m/s). This high conduction velocity is what lets the Purkinje system distribute the impulse almost simultaneously throughout both ventricles, so the ventricular myocardium contracts as a coordinated unit rather than as a slow, spreading wave.

## explicit_objective
Rank the Purkinje fibres as the fastest-conducting part of the cardiac conducting system, faster than atrial muscle, AV nodal fibres or the bundle of His.

## pitfalls
Assuming a structure earlier in the conduction sequence (such as the bundle of His) must be faster because it is "upstream" — conduction velocity does not track sequence order; the AV node is deliberately the slowest part despite being early in the pathway, and the Purkinje fibres are the fastest despite being the last.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PHY-T02

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Physiology

## subtopic
Cardiovascular System

## microtopic
Conduction velocity

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Physiology

## article_ids
ART-CVS-MU105-AUTOMATICITY-CONDUCTION

## related_article_ids


## related_concept_ids
CON-CVS-39355F0F93C292

## resource_ids
src_5ca028d96bdca72569d0

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
0.3

## academic_relevance
0.85

## weight_confidence
0.35

## confidence
0.75

## atomic_claim_ids
CLM-CVS-03CAAB3C8FE36C

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q30: Which part of the conducting system has the fastest speed of conduction? / Purkinje fibers

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p7 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
This concept's exact conduction-velocity figures were not confirmed via grep against the Integrated CVS Book's own text (search for "conduction velocity" returned no hit); the ranking itself is standard physiology and the printed key stands per rule 1, but the numeric figures cited above are general teaching values, not lifted from this module's own book.

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
Vagal (parasympathetic) stimulation decreases heart rate

## id
CON-CVS-ED9A0CCE4C631F

## canonical_key
cvs.physiology.vagal-stimulation-decreases-heart-rate

## aliases
Parasympathetic effect on heart rate
Vagus nerve negative chronotropy

## arabic_label
تحفيز العصب المبهم يبطئ معدل ضربات القلب

## arabic_aliases


## definition
The vagus (parasympathetic) nerves supply the SA node, AV node and atrial muscle via postganglionic fibres releasing acetylcholine onto muscarinic receptors. Acetylcholine hyperpolarises the SA node and slows its rate of spontaneous depolarisation, which lengthens the interval between beats and so decreases heart rate (negative chronotropy) — the opposite of sympathetic stimulation, which instead raises heart rate.

## explicit_objective
State that vagal (parasympathetic) stimulation decreases heart rate, and identify acetylcholine acting on the SA node as the mechanism.

## pitfalls
Mixing up the autonomic branches' effects — sympathetic stimulation raises heart rate and contractility; vagal (parasympathetic) stimulation specifically decreases heart rate and has comparatively little effect on ventricular contractility, since vagal innervation of the ventricles is sparse.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PHY-T02

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Physiology

## subtopic
Cardiovascular System

## microtopic
Autonomic control of heart rate

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Physiology

## article_ids
ART-CVS-MU105-AUTOMATICITY-CONDUCTION

## related_article_ids


## related_concept_ids
CON-CVS-5419DA4CEFDBB6

## resource_ids
src_5ca028d96bdca72569d0

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
0.85

## weight_confidence
0.35

## confidence
0.8

## atomic_claim_ids
CLM-CVS-ED9A0CCE4C631F

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q34: What is the role of the vagus (parasympathetic) nerves in cardiac functions? / To decrease heart rate

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p8 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
The Integrated CVS Book's own vagus-nerve mentions found via grep are anatomical (course, branches) rather than this specific chronotropic-effect statement; the physiological fact itself is standard and the printed key stands per rule 1, but no exact-phrase quote was located for this specific framing.

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
During the rapid (maximum) ejection phase, ventricular volume falls sharply as aortic pressure climbs to its peak value

## id
CON-CVS-A7220E2C8D6103

## canonical_key
cvs.physiology.rapid-ejection-phase-volume-pressure

## aliases
Maximum ejection phase
Rapid ejection phase

## arabic_label
مرحلة القذف السريع

## arabic_aliases


## definition
Once ventricular pressure exceeds aortic (or pulmonary) pressure, the semilunar valve opens and the rapid (maximum) ejection phase begins: a large fraction of the stroke volume leaves the ventricle in a short time, so ventricular volume decreases markedly. Aortic pressure rises alongside this rapid outflow and reaches its maximum value at the end of the rapid ejection phase, after which ejection slows (the reduced ejection phase) as ventricular and aortic pressures begin to fall back toward each other.

## explicit_objective
State that ventricular volume decreases markedly and aortic pressure reaches its peak during the rapid (maximum) ejection phase of the cardiac cycle.

## pitfalls
Assuming aortic pressure peaks at the very start of ejection (when the semilunar valve first opens) — pressure instead keeps climbing through the rapid ejection phase and only reaches its maximum at that phase's end, as outflow is still exceeding what runs off into the periphery.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PHY-T02

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Physiology

## subtopic
Cardiovascular System

## microtopic
Cardiac cycle phases

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Physiology

## article_ids
ART-CVS-MU105-CARDIAC-CYCLE

## related_article_ids


## related_concept_ids
CON-CVS-62F68B96395F02

## resource_ids
src_5ca028d96bdca72569d0

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.45

## exam_weight_by_year
MU_Y1=0.45

## clinical_relevance
0.35

## academic_relevance
0.9

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-CVS-A7220E2C8D6103

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q37: During which phase of the cardiac cycle does the ventricular volume markedly decreases? / Maximum ejection phase. Q38: During which phase of the cardiac cycle does the aortic pressure markedly increases and reaches maximum value? / Maximum ejection phase

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p8,p9 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
The incisura (dicrotic notch) in the aortic pressure curve is caused by elastic recoil of the aortic wall after the aortic valve suddenly closes

## id
CON-CVS-62F68B96395F02

## canonical_key
cvs.physiology.aortic-incisura-elastic-recoil

## aliases
Aortic incisura
Dicrotic notch

## arabic_label
الشق الحادثي في منحنى ضغط الأورطي

## arabic_aliases


## definition
As the ventricle relaxes and its pressure falls below aortic pressure, the aortic (semilunar) valve snaps shut, producing a brief, sharp dip in the aortic pressure curve called the incisura or dicrotic notch. The dip itself is caused by the sudden cessation of forward flow at valve closure, and it is immediately followed by a small secondary rise as the elastic wall of the aorta recoils against the now-closed valve, briefly bouncing pressure back up before the steady diastolic decline resumes.

## explicit_objective
Attribute the incisura in the aortic pressure curve to aortic valve closure followed by elastic recoil of the aortic wall, at the boundary between systole and diastole.

## pitfalls
Attributing the incisura to a ventricular event (such as isovolumetric relaxation) rather than the aortic wall's own elastic recoil against the now-closed aortic valve — the incisura is a feature of the aortic pressure curve specifically, driven by the aorta's own elasticity, not by what the ventricle is doing at that instant.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PHY-T02

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Physiology

## subtopic
Cardiovascular System

## microtopic
Aortic pressure curve

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Physiology

## article_ids
ART-CVS-MU105-CARDIAC-CYCLE

## related_article_ids


## related_concept_ids
CON-CVS-A7220E2C8D6103

## resource_ids
src_5ca028d96bdca72569d0

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
0.3

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-CVS-62F68B96395F02

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q39: Incisura in aortic pressure curve is caused by which of the following? / Elastic recoil of the aorta

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p9 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
Preload is primarily determined by venous return — how much blood fills the ventricle before it contracts

## id
CON-CVS-E0AB698D1EFEBE

## canonical_key
cvs.physiology.preload-determined-by-venous-return

## aliases
Preload determinant
Venous return and preload

## arabic_label
الحمل القبلي يحدده العائد الوريدي

## arabic_aliases


## definition
Preload is the degree of ventricular wall stretch just before contraction begins, produced by end-diastolic filling. Since filling depends on how much blood flows back to the heart, venous return is preload's primary determinant — a rise in venous return increases end-diastolic volume and therefore preload, which through the Frank-Starling mechanism raises the force of the next contraction. This distinguishes preload's determinant (venous return, an inflow quantity) from afterload's determinant (arterial resistance, an outflow-opposing quantity).

## explicit_objective
State that venous return is the primary determinant of preload, distinct from afterload's own determinants (systemic and pulmonary vascular resistance).

## pitfalls
Confusing preload's determinant (venous return, filling the ventricle before contraction) with afterload's determinant (vascular resistance, opposing the ventricle during contraction) — an exam commonly pairs these two questions, and swapping the answers is the classic error.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PHY-T02

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Physiology

## subtopic
Cardiovascular System

## microtopic
Preload and afterload

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Physiology

## article_ids
ART-CVS-MU105-VENOUS-RETURN-RESERVE

## related_article_ids


## related_concept_ids
CON-CVS-AD0881F8B57C91

## resource_ids
src_5ca028d96bdca72569d0

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.45

## exam_weight_by_year
MU_Y1=0.45

## clinical_relevance
0.45

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-CVS-E0AB698D1EFEBE

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q40: Which one of the following factors primarily determines preload? / Venous return

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p9 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
Venous return is driven primarily by the mean systemic filling pressure — the pressure that would exist throughout the circulation if the heart stopped — acting against right atrial pressure

## id
CON-CVS-2493448DCCA3E8

## canonical_key
cvs.physiology.venous-return-mean-systemic-filling-pressure

## aliases
Mean systemic filling pressure
Venous return determinants

## arabic_label
متوسط ضغط الامتلاء الجهازي

## arabic_aliases


## definition
The mean systemic filling pressure (MSFP) is the pressure that would exist uniformly throughout the systemic circulation if the heart were stopped and blood flow equalised — it depends mainly on total blood volume and venous tone (venoconstriction raises it by shifting blood from the high-capacitance venous reservoir toward the arterial side). Venous return is driven by the pressure gradient between the MSFP and right atrial pressure: the larger that gradient, the greater the venous return, which is why raising MSFP (more blood volume, more venoconstriction) increases venous return and, through it, cardiac filling.

## explicit_objective
Name the mean systemic filling pressure as the main determinant of venous return, and state that it is set mainly by blood volume and venous tone.

## pitfalls
Confusing the mean systemic filling pressure with right atrial pressure itself — they are the two ends of the pressure gradient that drives venous return, not the same quantity; MSFP is the "upstream" pressure of the whole systemic reservoir, right atrial pressure is the "downstream" pressure venous return flows against.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PHY-T02

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Physiology

## subtopic
Cardiovascular System

## microtopic
Venous return

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Physiology

## article_ids
ART-CVS-MU105-VENOUS-RETURN-RESERVE

## related_article_ids


## related_concept_ids
CON-CVS-E0AB698D1EFEBE
CON-CVS-029134937E8FF0

## resource_ids
src_5ca028d96bdca72569d0

## approved_file_resource_ids
[clear]

## approved_video_resource_ids
[clear]

## learner_years
1

## universities
mu

## blueprint_weight
0.45

## exam_weight_by_year
MU_Y1=0.45

## clinical_relevance
0.4

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-CVS-2493448DCCA3E8

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q43: What is the main determinant of venous return? / Mean systemic filling pressure

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p10 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.


---

# Item

## label
A rise in right atrial pressure above zero progressively reduces venous return, until venous return stops entirely around +7 mmHg

## id
CON-CVS-029134937E8FF0

## canonical_key
cvs.physiology.right-atrial-pressure-reduces-venous-return

## aliases
Right atrial pressure and venous return
RAP effect on venous return

## arabic_label
ارتفاع ضغط الأذين الأيمن يقلل العائد الوريدي

## arabic_aliases


## definition
Right atrial pressure is normally close to zero (roughly -2 to +2 mmHg). Venous return depends on the pressure gradient between the mean systemic filling pressure and right atrial pressure, so as right atrial pressure rises above zero, that gradient narrows and venous return falls progressively; by about +7 mmHg the gradient is abolished and venous return stops completely. Below zero (subatmospheric), the large veins entering the thorax tend to collapse, so further falls in right atrial pressure produce no further increase in venous return — it plateaus rather than rising indefinitely.

## explicit_objective
State that a rise in right atrial pressure above its normal near-zero level progressively decreases venous return, distinguishing this from the plateau effect of a further fall in right atrial pressure below zero.

## pitfalls
Assuming venous return keeps rising indefinitely as right atrial pressure falls further below zero — large veins collapse at subatmospheric pressure, capping any further increase; the clean, progressive relationship only holds as right atrial pressure rises above zero, which is what this question tests.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PHY-T02

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Physiology

## subtopic
Cardiovascular System

## microtopic
Venous return

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Physiology

## article_ids
ART-CVS-MU105-VENOUS-RETURN-RESERVE

## related_article_ids


## related_concept_ids
CON-CVS-2493448DCCA3E8

## resource_ids
src_5ca028d96bdca72569d0

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
0.85

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-CVS-029134937E8FF0

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q45: Which of the following is a normal response to increase in the right atrial pressure above zero? / The venous return decreases

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p10 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first (see this concept's own ## uncertainty field and coverage/MU-MED105-triage.md's concept-search sample) before minting.
mu: Tested as "CVS End Module 43.pdf" (see ## original_wording and ## exam_signal above), yellow-highlight key, rendered per coverage/MU-MED105-triage-keys.txt.

---

# Item

## label
Afterload is the load against which cardiac muscle contracts

## id
CON-CVS-AD0881F8B57C91

## universities
+mu

## learner_years
+MU_Y1

## modules
+MU-MED105

## field_notes
mu: Tested as "CVS End Module 43.pdf" Q42, "Which one of the following statements regarding afterload is true?" (answer: Afterload is primarily influenced by systemic vascular resistance and pulmonary vascular resistance), yellow-highlight key, rendered p9. Sparse update only: this concept is already LIVE (server/data/medical-library-v1.json) with its own article ART-CVS-CARDIAC-OUTPUT, which already teaches afterload's SVR/PVR determinants; no gate/simulate dependency file needed since gate reads live state directly. Fixed by lane-2 (2026-09-02): removed a stray ## module_subject field (its value had leaked "Afterload" from the label onto a second line) — per rule 6/the never-a-twin ruling, an overlay row never carries module_subject.

---

# Item

## label
The right coronary artery runs the coronary sulcus to give the marginal and posterior interventricular arteries, supplying the whole right side of the heart and, in most people, the whole conducting system

## id
CON-CVS-2A21F1B4F30B61

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin repair (chief-of-staff ruling, 2026-09-02): lane-1 minted CON-CVS-C0ADE9E8979F5A as a full new record for this exact fact, flagging in its own ## uncertainty field that it was "close in scope" to this Kasr 104-CPS concept — confirmed the same fact on read (near-verbatim matching definitions) and merged. Deleted the twin record and its article/MU-MED105-articles.md section (ART-CVS-MU105-CORONARY-ANATOMY, trimmed to its one surviving concept); repointed q13 and q21's main_concept/concept_ids to this id.
mu: Tested as "CVS End Module 43.pdf" Q13 ("In most of the population, SA node and AV node are supplied by which of the following?" / Right coronary artery) and Q21 ("...blockage of the posterior interventricular artery. In exposing this artery, which accompanying vessel is most susceptible to injury?" / Middle cardiac vein), yellow-highlight key, rendered p4-p5. Full record is in docs/Kasr-Source-Imports/concept/104-CPS-anatomy-concepts.md; simulate with that file (and its own article, docs/Kasr-Source-Imports/article/104-CPS-anatomy.md) as a dependency.

---

# Item

## label
The anterior tibial artery becomes the dorsalis pedis artery in front of the ankle midway between the malleoli and ends by diving into the sole to complete the deep plantar arch, while the posterior tibial artery — the tibial nerve's arterial companion — gives the peroneal artery (the leg's main supply and the fibula's nutrient artery) and terminates behind the medial malleolus by dividing into the medial and lateral plantar arteries

## id
CON-MSK-0415214C935D2D

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin repair (chief-of-staff ruling, 2026-09-02): lane-1 minted CON-CVS-C2C8702CBA09CC (anterior tibial artery continues as dorsalis pedis), flagging in its own ## uncertainty field that it was "close in scope" to this Alexandria AU-MED-105 concept — confirmed the same fact on read (MU's fact is a strict subset of this broader dorsalis-pedis/posterior-tibial record) and merged. Deleted the twin record and its sentence/alias from article/MU-MED105-articles.md's ART-CVS-MU105-PERIPHERAL-VESSELS section; repointed q17's main_concept/concept_ids to this id.
mu: Tested as "CVS End Module 43.pdf" Q17 ("The artery of the anterior compartment of the leg continues as which of the following arteries?" / Dorsalis pedis artery), yellow-highlight key, rendered p4. Full record is in docs/Alexandria-Source-Imports/concept/AU-MED-105-anatomy-concepts.md; simulate with that file (and its own article, docs/Alexandria-Source-Imports/article/AU-MED-105-anatomy-articles.md) as a dependency.

---

# Item

## label
The working cardiac myocyte's action potential plateau (phase 2) is sustained by a balance between inward Ca++ current through L-type calcium channels and outward K+ current, prolonging depolarization well beyond a skeletal muscle fibre's brief spike

## id
CON-CVS-D0CD4A234205EF

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin repair (chief-of-staff ruling, 2026-09-02): lane-1 minted CON-CVS-9947504F986142 (AP plateau Ca2+/K+ balance), flagging in its own ## uncertainty field that it was "close in scope" to this Kasr 104-CPS concept — confirmed the same fact on read (matching mechanism and definition) and merged. Deleted the twin record and its whole article (article/MU-MED105-articles.md's ART-CVS-MU105-CONTRACTILITY-PLATEAU, all 4 of whose concepts were twins — article deleted outright); repointed q22's main_concept/concept_ids to this id.
mu: Tested as "CVS End Module 43.pdf" Q22 ("Which of the following is the cause of the plateau phase in the fast response cardiac action potential?" / Balance between inward Ca++ and outward K+), yellow-highlight key, rendered p6. Full record is in docs/Kasr-Source-Imports/concept/104-CPS-mcq-concepts.md; simulate with that file (and its own article, docs/Kasr-Source-Imports/article/104-CPS-physiology.md) as a dependency.

---

# Item

## label
The absolute and relative refractory periods of the cardiac myocyte action potential span almost the whole of contraction, which prevents the sustained tetanic contractions seen in skeletal muscle

## id
CON-CVS-5288011D93888B

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin repair (chief-of-staff ruling, 2026-09-02): lane-1 minted CON-CVS-73C75ED6DFDD91 (supernormal/vulnerable phase), flagging in its own ## uncertainty field that it was "close in scope" to this Kasr 104-CPS concept — confirmed the same fact on read (MU's fact is a subset of this broader ARP/RRP/supernormal record) and merged. Deleted the twin record and its sentences/alias from article/MU-MED105-articles.md's ART-CVS-MU105-AUTOMATICITY-CONDUCTION section; repointed q24's main_concept/concept_ids to this id.
mu: Tested as "CVS End Module 43.pdf" Q24 ("In which period of cardiac action potential, the excitability is considered dangerous due to increased susceptibility to ventricular fibrillation?" / Supernormal phase of excitability), yellow-highlight key, rendered p6. Full record is in docs/Kasr-Source-Imports/concept/104-CPS-physiology-concepts.md; simulate with that file (and its own article, docs/Kasr-Source-Imports/article/104-CPS-physiology.md) as a dependency.

---

# Item

## label
A pacemaker action potential is unstable at rest; a working cardiac myocyte's action potential is not

## id
CON-CVS-A4657614AE6923

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin repair (chief-of-staff ruling, 2026-09-02): lane-1 minted CON-CVS-84C54F9C48D1C1 (autorhythmic cell Ca2+ depolarization), flagging in its own ## uncertainty field that it was "close in scope" to this Alexandria AU-MED-105 concept — confirmed the same fact on read (matching mechanism and definition) and merged. Deleted the twin record; it had no dedicated article sentence of its own left after the ART-CVS-MU105-CONTRACTILITY-PLATEAU article (its ## article_ids target) was deleted outright as all 4 of that article's concepts were twins. Repointed q25's main_concept/concept_ids to this id.
mu: Tested as "CVS End Module 43.pdf" Q25 ("Which one of the following ions is responsible for depolarization phase of the auto rhythmic cell action potential?" / Calcium (Ca++) influx), yellow-highlight key, rendered p6. Full record is in docs/Alexandria-Source-Imports/concept/AU-MED-105-physiology-concepts.md; simulate with that file (and its own article, docs/Alexandria-Source-Imports/article/AU-MED-105-physiology-articles.md) as a dependency.

---

# Item

## label
Every cardiac valve is briefly closed twice a cycle — during isovolumetric contraction (making the first heart sound) and isovolumetric relaxation (making the second) — while the AV valves stay open through atrial systole and both filling phases

## id
CON-CVS-F51E391CCECE6A

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin repair (chief-of-staff ruling, 2026-09-02): lane-1 minted TWO separate records for this one Kasr 104-CPS concept — CON-CVS-8FEA34878D341E (isovolumetric contraction, all valves shut) and CON-CVS-8B779861E1A486 (AV valves open through max filling) — each flagging in its own ## uncertainty field that it was "close in scope" to this same Kasr valve-states-by-phase concept. Confirmed both MU facts are proper subsets of this one comprehensive record and merged both onto it. Deleted both twin records and their three concepts' worth of sentences from article/MU-MED105-articles.md's ART-CVS-MU105-CARDIAC-CYCLE section (which now teaches only its two surviving concepts, rapid ejection and the aortic incisura); repointed q35 and q41's main_concept/concept_ids to this one id.
mu: Tested as "CVS End Module 43.pdf" Q35 ("What happens to ventricular pressure during the isovolumetric contraction phase?" / Increases rapidly), rendered p8, and Q41 ("During which phases of the cardiac cycle do the atrioventricular valves remain open?" / Maximum filling phase), rendered p9, both yellow-highlight key. Full record is in docs/Kasr-Source-Imports/concept/104-CPS-mcq-concepts.md; simulate with that file (and its own article, docs/Kasr-Source-Imports/article/104-CPS-physiology.md) as a dependency.

---

# Item

## label
The atrioventricular (AV) node's relatively slow conduction delays the impulse just long enough for atrial systole to finish topping up ventricular filling before ventricular contraction begins

## id
CON-CVS-9B1C94AF064C3D

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin repair (chief-of-staff ruling, 2026-09-02): lane-1 minted CON-CVS-A275BC451FCD18 (AV node conduction delay), flagging in its own ## uncertainty field that it was "close in scope" to this Kasr 104-CPS concept — confirmed the same fact on read (near-verbatim matching definitions) and merged. Deleted the twin record and its sentences/alias from article/MU-MED105-articles.md's ART-CVS-MU105-AUTOMATICITY-CONDUCTION section; repointed q28 and q29's main_concept/concept_ids to this id.
mu: Tested as "CVS End Module 43.pdf" Q28 ("Which part of the cardiac conduction system is responsible for delaying the electrical impulses to allow complete atrial contraction?" / Atrioventricular node (AVN)) and Q29 ("What is the significance of impulse delay in the atrioventricular node (AVN)?" / Allows sufficient time for complete atrial contraction), yellow-highlight key, rendered p7. Full record is in docs/Kasr-Source-Imports/concept/104-CPS-mcq-concepts.md; simulate with that file (and its own article, docs/Kasr-Source-Imports/article/104-CPS-physiology.md) as a dependency.

---

# Item

## label
Cardiac contractility is set by how much calcium reaches the myofilaments, independent of fibre length

## id
CON-CVS-859114E6FE6C90

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin repair (chief-of-staff ruling, 2026-09-02): lane-1 minted CON-CVS-58B94753646870 (contractility definition/inotropy), flagging in its own ## uncertainty field that it was "close in scope" to this Alexandria AU-MED-105 concept — confirmed the same fact on read (matching definition) and merged. Deleted the twin record and its whole article (ART-CVS-MU105-CONTRACTILITY-PLATEAU, deleted outright since all 4 of its concepts were twins); repointed q31 and q33's main_concept/concept_ids to this id.
mu: Tested as "CVS End Module 43.pdf" Q31 ("What is the meaning of contractility regarding cardiac function?" / The ability of the cardiac muscle to generate force and contract) and Q33 ("How do positive inotropic drugs influence cardiac muscle?" / They increase contractility), yellow-highlight key, rendered p8. Full record is in docs/Alexandria-Source-Imports/concept/AU-MED-105-physiology-concepts.md; simulate with that file (and its own article, docs/Alexandria-Source-Imports/article/AU-MED-105-physiology-articles.md) as a dependency.

---

# Item

## label
Within physiological limits, a rise in end-diastolic volume raises the force of cardiac contraction (Frank–Starling law)

## id
CON-CVS-3142C436848ABD

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin repair (chief-of-staff ruling, 2026-09-02): lane-1 minted CON-CVS-948548A19D49EF (Frank-Starling law), flagging in its own ## uncertainty field that it was "close in scope" to this Alexandria AU-MED-105 concept — confirmed the same fact on read (near-verbatim matching definitions) and merged. Deleted the twin record and its whole article (ART-CVS-MU105-CONTRACTILITY-PLATEAU, deleted outright since all 4 of its concepts were twins); repointed q32's main_concept/concept_ids to this id.
mu: Tested as "CVS End Module 43.pdf" Q32 ("According to the Frank-Starling law, what happens to cardiac contractility when the heart fills with more blood during diastole?" / Contractility increases — printed key stands per rule 1, taught alongside the mechanism/contractility distinction in the sibling's own article), yellow-highlight key, rendered p8. Full record is in docs/Alexandria-Source-Imports/concept/AU-MED-105-physiology-concepts.md; simulate with that file (and its own article, docs/Alexandria-Source-Imports/article/AU-MED-105-physiology-articles.md) as a dependency.

---

# Item

## label
The atrial pressure curve rises to an a wave during atrial systole, a smaller c wave when the closed AV valve bulges back into the atrium at the start of isovolumetric ventricular contraction, and a v wave as venous blood fills the atrium against still-closed AV valves — so the a wave, not the c wave, precedes the first heart sound

## id
CON-CVS-B8AFC98120E132

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin repair (chief-of-staff ruling, 2026-09-02): lane-1 minted CON-CVS-6C2A38EA5B232E (a-wave/atrial contraction), flagging in its own ## uncertainty field that it was "close in scope" to this Kasr 104-CPS concept — confirmed the same fact on read (MU's fact is a subset of this broader a/c/v-wave record) and merged. Deleted the twin record and its sentences/alias from article/MU-MED105-articles.md's ART-CVS-MU105-CARDIAC-CYCLE section; repointed q36's main_concept/concept_ids to this id.
mu: Tested as "CVS End Module 43.pdf" Q36 ("What causes the ascending limb of a-wave in the atrial pressure curve?" / Atrial contraction), yellow-highlight key, rendered p8. Full record is in docs/Kasr-Source-Imports/concept/104-CPS-mcq-concepts.md; simulate with that file (and its own article, docs/Kasr-Source-Imports/article/104-CPS-physiology.md) as a dependency.

---

# Item

## label
Heart rate reserve runs from about 75/min to 220 minus age, and stroke volume reserve from about 70 ml to 200 ml

## id
CON-CVS-A99309543A270D

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin repair (chief-of-staff ruling, 2026-09-02): lane-1 minted CON-CVS-3732E943D2A4D6 (cardiac reserve definition), flagging in its own ## uncertainty field that it was "close in scope" to this Kasr 104-CPS concept — confirmed the same fact on read (this department book's own text at p85-86 matches this concept's definition almost verbatim per lane-1's own note) and merged. Deleted the twin record and its sentences/alias from article/MU-MED105-articles.md's ART-CVS-MU105-VENOUS-RETURN-RESERVE section; repointed q44's main_concept/concept_ids to this id.
mu: Tested as "CVS End Module 43.pdf" Q44 ("What is cardiac reserve?" / The ability of the heart to increase its output above baseline levels in response to physiological demands), yellow-highlight key, rendered p10. Full record is in docs/Kasr-Source-Imports/concept/104-CPS-concepts.md; simulate with that file as a dependency (its own article_ids, ART-104-PHY-CARDIAC-PUMP-FUNCTION, resolves from docs/Kasr-Source-Imports/article/104-CPS-articles.md).

---

# Item

## label
Amrinone (inamrinone) inhibits phosphodiesterase III, raising intracellular cAMP to produce a positive inotropic and vasodilator effect in heart failure

## id
CON-CVS-D1BDCD9C7A28E4

## canonical_key
cvs.pharmacology.amrinone-pde3-inhibition-camp

## aliases
Amrinone mechanism
Inamrinone
Phosphodiesterase III inhibitor

## arabic_label
أمرينون يثبط الفوسفودايستريز الثالث

## arabic_aliases


## definition
Amrinone (inamrinone) is a bipyridine inotrope that inhibits phosphodiesterase III (PDE III), the enzyme that normally breaks down cyclic AMP (cAMP) inside cardiac and vascular smooth muscle cells. Blocking PDE III lets intracellular cAMP accumulate; in cardiac myocytes this raises calcium entry through L-type channels, producing a positive inotropic effect independent of beta-adrenergic receptors, while in vascular smooth muscle the same cAMP rise causes vasodilation, lowering both preload and afterload. This combined inotrope-plus-vasodilator (inodilator) action makes amrinone useful for short-term treatment of severe, refractory heart failure, though its use is limited by thrombocytopenia and arrhythmia risk on prolonged dosing.

## explicit_objective
State that amrinone's mechanism is phosphodiesterase III inhibition, which raises intracellular cAMP to produce a combined positive inotropic and vasodilator (inodilator) effect.

## pitfalls
Confusing amrinone's mechanism with a drug that activates phosphodiesterase or decreases cAMP -- amrinone specifically inhibits PDE III, which raises (not lowers) cAMP; a drug that activated phosphodiesterase would instead lower cAMP and be a negative, not positive, inotrope.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PHA-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pharmacology

## subtopic
Positive inotropic agents

## microtopic
Amrinone / PDE III inhibitors

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Pharmacology

## article_ids
ART-CVS-MU105-HF-DIURETIC-PHARM

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.6

## atomic_claim_ids
CLM-CVS-D1BDCD9C7A28E4

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q46: see question record for stem/options (End Module 43, p10).

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p10 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
General textbook/lecture fact, not a page-quoted extraction from this module's own department book; confidence set accordingly (0.6) pending a stronger source match.

## owner
Claude

## reviewer
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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first before minting; no close match found (see coverage/MU-MED105-triage.md's reuse-family list and this dispatch's own search log).
mu: Tested as "CVS End Module 43.pdf" Q46, yellow-highlight key, rendered p10 (lane-2 dispatch render, 2026-09-02).

---

# Item

## label
Enalapril, an ACE inhibitor, decreases cardiac remodeling in heart failure by blocking angiotensin II-driven myocardial hypertrophy and fibrosis

## id
CON-CVS-2BECFB3079BFE1

## canonical_key
cvs.pharmacology.enalapril-ace-inhibitor-remodeling

## aliases
Enalapril remodeling
ACE inhibitor cardiac remodeling
Angiotensin II myocardial hypertrophy

## arabic_label
إنالابريل يقلل من إعادة تشكل عضلة القلب

## arabic_aliases


## definition
Enalapril is an angiotensin-converting enzyme (ACE) inhibitor that blocks the conversion of angiotensin I to angiotensin II. Beyond its haemodynamic effect of lowering afterload, angiotensin II itself drives pathological cardiac remodeling directly -- it stimulates myocyte hypertrophy, interstitial fibrosis and progressive chamber dilation in the failing heart. By suppressing angiotensin II formation, enalapril and other ACE inhibitors slow or partially reverse this remodeling process, which is why ACE inhibitors improve long-term survival in heart failure rather than only providing short-term symptomatic relief.

## explicit_objective
State that enalapril decreases cardiac remodeling in heart failure by suppressing angiotensin II, the mediator that otherwise drives myocyte hypertrophy and fibrosis.

## pitfalls
Assuming any heart-failure drug that improves symptoms also improves remodeling and survival -- positive inotropes like digoxin and amrinone raise contractility without slowing remodeling, which is why ACE inhibitors (and not inotropes) are the drug class specifically credited with an anti-remodeling, survival benefit.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PHA-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pharmacology

## subtopic
ACE inhibitors

## microtopic
Enalapril / cardiac remodeling

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Pharmacology

## article_ids
ART-CVS-MU105-HF-DIURETIC-PHARM

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.6

## atomic_claim_ids
CLM-CVS-2BECFB3079BFE1

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q48: see question record for stem/options (End Module 43, p10).

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p10 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
General textbook/lecture fact, not a page-quoted extraction from this module's own department book; confidence set accordingly (0.6) pending a stronger source match.

## owner
Claude

## reviewer
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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first before minting; no close match found (see coverage/MU-MED105-triage.md's reuse-family list and this dispatch's own search log).
mu: Tested as "CVS End Module 43.pdf" Q48, yellow-highlight key, rendered p10 (lane-2 dispatch render, 2026-09-02).

---

# Item

## label
Ventricular fibrillation is a contraindication to digoxin, since digoxin raises automaticity and can worsen a ventricular arrhythmia already in progress

## id
CON-CVS-30FFECEA12AEB8

## canonical_key
cvs.pharmacology.digoxin-contraindication-ventricular-fibrillation

## aliases
Digoxin contraindications
Digoxin and ventricular arrhythmia

## arabic_label
الرجفان البطيني من موانع استخدام الديجوكسين

## arabic_aliases


## definition
Digoxin is contraindicated in ventricular fibrillation and other ventricular arrhythmias. By inhibiting the cardiac Na+/K+ ATPase, digoxin raises intracellular calcium and, at toxic or inappropriate levels, increases automaticity and ectopic pacemaker activity in ventricular tissue -- exactly the property that can precipitate or worsen ventricular fibrillation rather than treat it. This is the opposite of digoxin's useful, rate-controlling role in supraventricular arrhythmias such as atrial fibrillation, where its vagally-mediated slowing of AV conduction is beneficial; in ventricular fibrillation there is no AV node to slow and its pro-automaticity effect is purely harmful.

## explicit_objective
State that ventricular fibrillation is a contraindication to digoxin because digoxin's pro-automaticity effect can worsen, not treat, a ventricular arrhythmia.

## pitfalls
Assuming digoxin is broadly antiarrhythmic because it is useful in atrial fibrillation -- digoxin only helps supraventricular arrhythmias by slowing AV conduction; in ventricular arrhythmias its calcium-raising, automaticity-increasing effect is dangerous, not therapeutic.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PHA-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pharmacology

## subtopic
Digoxin

## microtopic
Digoxin contraindications

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Pharmacology

## article_ids
ART-CVS-MU105-HF-DIURETIC-PHARM

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.6

## atomic_claim_ids
CLM-CVS-30FFECEA12AEB8

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q50: see question record for stem/options (End Module 43, p11).

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p11 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
General textbook/lecture fact, not a page-quoted extraction from this module's own department book; confidence set accordingly (0.6) pending a stronger source match.

## owner
Claude

## reviewer
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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first before minting; no close match found (see coverage/MU-MED105-triage.md's reuse-family list and this dispatch's own search log).
mu: Tested as "CVS End Module 43.pdf" Q50, yellow-highlight key, rendered p11 (lane-2 dispatch render, 2026-09-02).

---

# Item

## label
Furosemide is the diuretic preferred in acute renal failure because, unlike thiazides, it remains effective at low glomerular filtration rates

## id
CON-CVS-B7466D954A0B3B

## canonical_key
cvs.pharmacology.furosemide-preferred-acute-renal-failure

## aliases
Furosemide acute renal failure
Loop diuretic in renal impairment

## arabic_label
فروسيميد هو المدر المفضل في الفشل الكلوي الحاد

## arabic_aliases


## definition
Furosemide, a loop diuretic, is the diuretic of choice in acute renal failure. Loop diuretics act at the thick ascending limb of the loop of Henle, a site that remains accessible even when glomerular filtration rate (GFR) is markedly reduced, and furosemide can still produce a meaningful diuresis at a GFR too low for thiazide diuretics (which act at the distal convoluted tubule and depend on adequate filtered load) to be effective. In acute renal failure, furosemide is used both to manage volume overload and, by increasing urine output, to attempt conversion of oliguric to non-oliguric renal failure, which is easier to manage clinically even though it does not itself improve renal recovery or survival.

## explicit_objective
State that furosemide is preferred over thiazide diuretics in acute renal failure because it remains effective at low GFR, unlike thiazides.

## pitfalls
Assuming any diuretic works equally well regardless of renal function -- thiazide diuretics lose efficacy as GFR falls because they depend on adequate filtered sodium load reaching the distal tubule, while furosemide's site of action (the thick ascending limb) keeps it effective even in significant renal impairment.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PHA-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pharmacology

## subtopic
Diuretics

## microtopic
Furosemide in renal failure

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Pharmacology

## article_ids
ART-CVS-MU105-HF-DIURETIC-PHARM

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.6

## atomic_claim_ids
CLM-CVS-B7466D954A0B3B

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q54: see question record for stem/options (End Module 43, p12).

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p12 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
General textbook/lecture fact, not a page-quoted extraction from this module's own department book; confidence set accordingly (0.6) pending a stronger source match.

## owner
Claude

## reviewer
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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first before minting; no close match found (see coverage/MU-MED105-triage.md's reuse-family list and this dispatch's own search log).
mu: Tested as "CVS End Module 43.pdf" Q54, yellow-highlight key, rendered p12 (lane-2 dispatch render, 2026-09-02).

---

# Item

## label
Thiazide diuretics are the most common drug-induced cause of hyponatremia

## id
CON-CVS-C396B72F394432

## canonical_key
cvs.pharmacology.thiazide-most-common-drug-cause-hyponatremia

## aliases
Thiazide-induced hyponatremia
Drug-induced hyponatremia

## arabic_label
مدرات الثيازيد هي السبب الدوائي الأكثر شيوعًا لنقص صوديوم الدم

## arabic_aliases


## definition
Thiazide diuretics are the most common drug class responsible for hyponatremia. They block the Na+/Cl- cotransporter in the distal convoluted tubule, a segment of the nephron that is normally water-impermeable and dilutes urine; blocking sodium reabsorption there impairs the kidney's ability to generate free water for excretion, while sodium loss also stimulates thirst and ADH release. The combined effect -- salt loss plus impaired free-water excretion -- lets water intake outstrip excretion, diluting plasma sodium. Loop diuretics carry much lower hyponatremia risk because they act upstream, at the loop of Henle, where they blunt the medullary concentration gradient the kidney would otherwise use to dilute urine maximally, so the water-excretion defect thiazides cause is largely avoided.

## explicit_objective
State that thiazide diuretics are the most common drug-induced cause of hyponatremia, and explain why loop diuretics carry much less of this risk.

## pitfalls
Assuming all diuretics cause hyponatremia by the same mechanism or to the same degree -- thiazides specifically impair free-water excretion at the distal convoluted tubule, while loop diuretics act upstream and blunt the medullary concentrating gradient instead, which is why thiazides (not loop diuretics) are the classic drug cause of hyponatremia.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PHA-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pharmacology

## subtopic
Diuretics

## microtopic
Thiazide adverse effects

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Pharmacology

## article_ids
ART-CVS-MU105-HF-DIURETIC-PHARM

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.6

## atomic_claim_ids
CLM-CVS-C396B72F394432

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q57: see question record for stem/options (End Module 43, p13).

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p13 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
General textbook/lecture fact, not a page-quoted extraction from this module's own department book; confidence set accordingly (0.6) pending a stronger source match.

## owner
Claude

## reviewer
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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first before minting; no close match found (see coverage/MU-MED105-triage.md's reuse-family list and this dispatch's own search log).
mu: Tested as "CVS End Module 43.pdf" Q57, yellow-highlight key, rendered p13 (lane-2 dispatch render, 2026-09-02).

---

# Item

## label
Mac Callum's patch is a sign of chronic rheumatic mural endocarditis -- a patch of thickened, wrinkled endocardium on the posterior left atrial wall

## id
CON-CVS-99B1A014E318DA

## canonical_key
cvs.pathology.mac-callum-patch-chronic-mural-endocarditis

## aliases
MacCallum's patch
Rheumatic mural endocarditis

## arabic_label
لطخة ماك كالوم علامة التهاب الشغاف الجداري الروماتيزمي المزمن

## arabic_aliases


## definition
Mac Callum's patch is an area of thickened, wrinkled, grey-white mural endocardium found on the posterior wall of the left atrium in chronic rheumatic heart disease. It results from the repeated trauma of a regurgitant mitral jet striking the posterior atrial wall, producing localised endocardial fibrous thickening -- a form of chronic mural (as opposed to valvular) rheumatic endocarditis. Its presence and location are a useful reminder that rheumatic mitral regurgitation classically directs its jet posteriorly, in contrast to the anterior-directed jet more typical of other causes of mitral regurgitation.

## explicit_objective
State that Mac Callum's patch is a sign of chronic mural (not valvular) rheumatic endocarditis, located on the posterior left atrial wall from a regurgitant mitral jet.

## pitfalls
Confusing Mac Callum's patch (mural endocarditis on the posterior left atrial wall, from jet trauma) with valvular endocarditis or with the Aschoff body (a myocardial, not endocardial, lesion) -- Mac Callum's patch is specifically an endocardial finding on the atrial wall itself, not on a valve leaflet or in the myocardium.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PAT-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pathology

## subtopic
Rheumatic heart disease

## microtopic
Mac Callum's patch

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Pathology

## article_ids
ART-CVS-MU105-RHEUMATIC-EMBOLIC-PATH

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.6

## atomic_claim_ids
CLM-CVS-99B1A014E318DA

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q58: see question record for stem/options (End Module 43, p13).

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p13 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
General textbook/lecture fact, not a page-quoted extraction from this module's own department book; confidence set accordingly (0.6) pending a stronger source match.

## owner
Claude

## reviewer
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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first before minting; no close match found (see coverage/MU-MED105-triage.md's reuse-family list and this dispatch's own search log).
mu: Tested as "CVS End Module 43.pdf" Q58, yellow-highlight key, rendered p13 (lane-2 dispatch render, 2026-09-02).

---

# Item

## label
Milk spots (soldier's patches) are focal areas of fibrous thickening of the visceral pericardium, a sign of chronic fibrosis from repeated friction

## id
CON-CVS-AE821D7F644263

## canonical_key
cvs.pathology.milk-spots-pericardial-fibrosis

## aliases
Milk spots
Soldier's patches
Tache laiteuse

## arabic_label
البقع اللبنية علامة تليف التامور الحشوي

## arabic_aliases


## definition
Milk spots (also called soldier's patches or tache laiteuse) are focal, opaque, white-grey patches of fibrous thickening on the visceral pericardium, most often overlying the right ventricle. They represent chronic fibrosis produced by repeated low-grade friction or mechanical irritation between the visceral and parietal pericardial layers over years, rather than an active inflammatory or infective process, and they are frequently an incidental finding at autopsy or cardiac surgery with no clinical significance of their own.

## explicit_objective
Identify milk spots as fibrosis of the visceral pericardium from chronic mechanical friction, not congestion, inflammation or necrosis.

## pitfalls
Assuming any white patch on the pericardium signals active inflammation -- milk spots are old, fibrous and clinically silent, the endpoint of chronic friction rather than an acute or ongoing pericarditis.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PAT-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pathology

## subtopic
Pericardial disease

## microtopic
Milk spots

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Pathology

## article_ids
ART-CVS-MU105-RHEUMATIC-EMBOLIC-PATH

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.6

## atomic_claim_ids
CLM-CVS-AE821D7F644263

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q59: see question record for stem/options (End Module 43, p13).

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p13 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
General textbook/lecture fact, not a page-quoted extraction from this module's own department book; confidence set accordingly (0.6) pending a stronger source match.

## owner
Claude

## reviewer
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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first before minting; no close match found (see coverage/MU-MED105-triage.md's reuse-family list and this dispatch's own search log).
mu: Tested as "CVS End Module 43.pdf" Q59, yellow-highlight key, rendered p13 (lane-2 dispatch render, 2026-09-02).

---

# Item

## label
Aschoff cells (Anitschkow cells) are large activated histiocytes with caterpillar-shaped nuclei, found within the Aschoff bodies of rheumatic myocarditis

## id
CON-CVS-CA4A15EBB014FE

## canonical_key
cvs.pathology.aschoff-cells-large-histiocytes

## aliases
Aschoff giant cells
Anitschkow cells
Aschoff bodies

## arabic_label
خلايا أشوف هي منسجات كبيرة داخل الأجسام الأشوفية

## arabic_aliases


## definition
Aschoff cells (also called Anitschkow cells or Aschoff giant cells) are large, activated histiocytes (macrophages) with abundant cytoplasm and a distinctive nucleus that shows a central, slender ribbon of chromatin -- classically described as caterpillar-shaped when seen in longitudinal section, or owl's-eye when seen in cross-section. They are the characteristic cell of the Aschoff body, the pathognomonic granuloma-like lesion of acute rheumatic myocarditis, which also contains fibrinoid necrosis, lymphocytes and plasma cells within the myocardial interstitium.

## explicit_objective
Identify Aschoff cells as large activated histiocytes with a caterpillar-shaped nucleus, the characteristic cell within the Aschoff body of rheumatic myocarditis.

## pitfalls
Mistaking Aschoff cells for lymphocytes, plasma cells or mast cells -- those other cell types can also be present within an Aschoff body's inflammatory infiltrate, but the Aschoff (Anitschkow) cell itself is specifically a large activated histiocyte with its distinctive caterpillar-nucleus appearance.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PAT-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pathology

## subtopic
Rheumatic heart disease

## microtopic
Aschoff cells

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Pathology

## article_ids
ART-CVS-MU105-RHEUMATIC-EMBOLIC-PATH

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.6

## atomic_claim_ids
CLM-CVS-CA4A15EBB014FE

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q60: see question record for stem/options (End Module 43, p13).

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p13 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
General textbook/lecture fact, not a page-quoted extraction from this module's own department book; confidence set accordingly (0.6) pending a stronger source match.

## owner
Claude

## reviewer
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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first before minting; no close match found (see coverage/MU-MED105-triage.md's reuse-family list and this dispatch's own search log).
mu: Tested as "CVS End Module 43.pdf" Q60, yellow-highlight key, rendered p13 (lane-2 dispatch render, 2026-09-02).

---

# Item

## label
The most common site affected in acute rheumatic myocarditis is the posterior wall of the left atrium

## id
CON-CVS-10947BC0F5E769

## canonical_key
cvs.pathology.rheumatic-myocarditis-posterior-left-atrial-wall

## aliases
Rheumatic myocarditis site
Rheumatic pancarditis distribution

## arabic_label
أكثر موضع إصابة في التهاب عضلة القلب الروماتيزمي الحاد هو الجدار الخلفي للأذين الأيسر

## arabic_aliases


## definition
Acute rheumatic fever produces a pancarditis affecting the endocardium, myocardium and pericardium together, but within the myocardium the Aschoff bodies of acute rheumatic myocarditis most commonly affect the posterior wall of the left atrium. This distribution sits close to where Mac Callum's patch forms on the adjacent endocardium, both findings reflecting the same posterior left atrial region that is preferentially involved in rheumatic carditis, alongside the valve apparatus itself (chiefly the mitral valve).

## explicit_objective
State that the posterior wall of the left atrium is the site most commonly affected in acute rheumatic myocarditis.

## pitfalls
Assuming rheumatic myocarditis distributes evenly across all four chambers -- it preferentially involves the posterior left atrial wall, the same general region where the mitral valve apparatus and Mac Callum's patch are also affected in rheumatic heart disease.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PAT-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pathology

## subtopic
Rheumatic heart disease

## microtopic
Rheumatic myocarditis distribution

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Pathology

## article_ids
ART-CVS-MU105-RHEUMATIC-EMBOLIC-PATH

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.6

## atomic_claim_ids
CLM-CVS-10947BC0F5E769

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q61: see question record for stem/options (End Module 43, p13).

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p13 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
General textbook/lecture fact, not a page-quoted extraction from this module's own department book; confidence set accordingly (0.6) pending a stronger source match.

## owner
Claude

## reviewer
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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first before minting; no close match found (see coverage/MU-MED105-triage.md's reuse-family list and this dispatch's own search log).
mu: Tested as "CVS End Module 43.pdf" Q61, yellow-highlight key, rendered p13 (lane-2 dispatch render, 2026-09-02).

---

# Item

## label
Massive pulmonary embolism causes acute heart failure by suddenly raising right ventricular afterload beyond what the unprepared right ventricle can overcome

## id
CON-CVS-6701FC6B3EF9B6

## canonical_key
cvs.pathology.massive-pulmonary-embolism-acute-heart-failure

## aliases
Massive pulmonary embolism acute heart failure
Acute cor pulmonale

## arabic_label
الانسداد الرئوي الضخم يسبب فشلًا قلبيًا حادًا

## arabic_aliases


## definition
Massive pulmonary embolism is a cause of acute heart failure. A large embolus obstructing the pulmonary arterial circulation abruptly raises pulmonary vascular resistance and, with it, the afterload the right ventricle must pump against; because this rise happens over minutes rather than the months a chronically hypertrophying right ventricle would have to adapt, the thin-walled right ventricle acutely dilates and fails (acute cor pulmonale), producing sudden right heart failure, a fall in left ventricular filling and cardiac output, and often cardiogenic shock or sudden death. This is distinct from the chronic, gradually compensated right ventricular hypertrophy seen with slowly progressive causes of pulmonary hypertension.

## explicit_objective
State that massive pulmonary embolism causes acute heart failure through a sudden rise in right ventricular afterload that the unprepared right ventricle cannot overcome.

## pitfalls
Assuming any cause of chronically raised right heart pressure has the same acute effect as a massive pulmonary embolism -- conditions like systemic hypertension, mitral stenosis or coarctation of the aorta raise pressures gradually, giving the heart time to hypertrophy and compensate, while a massive embolism's suddenness is exactly what makes it a cause of ACUTE, not chronic, heart failure.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PAT-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pathology

## subtopic
Heart failure

## microtopic
Massive pulmonary embolism

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Pathology

## article_ids
ART-CVS-MU105-RHEUMATIC-EMBOLIC-PATH

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.6

## atomic_claim_ids
CLM-CVS-6701FC6B3EF9B6

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q65: see question record for stem/options (End Module 43, p14).

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p14 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
General textbook/lecture fact, not a page-quoted extraction from this module's own department book; confidence set accordingly (0.6) pending a stronger source match.

## owner
Claude

## reviewer
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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first before minting; no close match found (see coverage/MU-MED105-triage.md's reuse-family list and this dispatch's own search log).
mu: Tested as "CVS End Module 43.pdf" Q65, yellow-highlight key, rendered p14 (lane-2 dispatch render, 2026-09-02).

---

# Item

## label
Amniotic fluid embolism is amniotic fluid and fetal debris entering the maternal pulmonary circulation during labour or delivery, causing sudden dyspnoea, cyanosis, hypotension and DIC

## id
CON-CVS-58677CDDB27828

## canonical_key
cvs.pathology.amniotic-fluid-embolism-peripartum

## aliases
Amniotic fluid embolism
Peripartum embolism

## arabic_label
الانصمام بالسائل الأمنيوسي

## arabic_aliases


## definition
Amniotic fluid embolism occurs when amniotic fluid, fetal squamous cells, lanugo hair and other fetal debris enter the maternal circulation, typically through tears in uterine veins or the placental implantation site during labour, delivery or the immediate postpartum period, and embolise to the maternal pulmonary arterial circulation. Clinically it presents with the sudden onset of dyspnoea, cyanosis and hypotension, often progressing rapidly to cardiovascular collapse; the amniotic material also activates the coagulation cascade, frequently triggering disseminated intravascular coagulation (DIC) as a life-threatening complication. Histologically, fetal squamous cells and other amniotic debris are identified within the small peripheral pulmonary arteries.

## explicit_objective
Recognise amniotic fluid embolism from its classic peripartum presentation of sudden dyspnoea, cyanosis and hypotension, and identify fetal/amniotic debris in the peripheral pulmonary arteries as its defining histological finding.

## pitfalls
Confusing amniotic fluid embolism with fat embolism (fat globules, classically after long-bone fracture), air embolism (gas bubbles) or thromboembolism (aggregated red blood cells/fibrin) -- amniotic fluid embolism is specifically identified by fetal squamous cells and other amniotic debris within the pulmonary arteries of a peripartum patient.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PAT-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pathology

## subtopic
Embolism

## microtopic
Amniotic fluid embolism

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Pathology

## article_ids
ART-CVS-MU105-RHEUMATIC-EMBOLIC-PATH

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.6

## atomic_claim_ids
CLM-CVS-58677CDDB27828

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q68: see question record for stem/options (End Module 43, p15).

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p15 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
General textbook/lecture fact, not a page-quoted extraction from this module's own department book; confidence set accordingly (0.6) pending a stronger source match.

## owner
Claude

## reviewer
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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first before minting; no close match found (see coverage/MU-MED105-triage.md's reuse-family list and this dispatch's own search log).
mu: Tested as "CVS End Module 43.pdf" Q68, yellow-highlight key, rendered p15 (lane-2 dispatch render, 2026-09-02).

---

# Item

## label
Sympathetic stimulation raises the mean systemic filling pressure by venoconstriction, shifting blood from the venous reservoir toward the heart

## id
CON-CVS-A1107778AE9E3B

## canonical_key
cvs.physiology.sympathetic-stimulation-raises-msfp

## aliases
Sympathetic venoconstriction
Sympathetic effect on mean systemic filling pressure

## arabic_label
التنبيه الودي يرفع متوسط ضغط الامتلاء الجهازي

## arabic_aliases


## definition
Sympathetic stimulation of the heart and vasculature raises the mean systemic filling pressure (MSFP). The systemic veins normally hold the majority of total blood volume at low pressure, acting as a high-capacitance reservoir; sympathetic activation constricts these veins (venoconstriction), reducing their capacitance and effectively shifting blood out of the venous reservoir toward the heart. Because MSFP is set by the total blood volume relative to the vasculature's capacitance, this venoconstriction raises MSFP even though total blood volume itself has not changed, which in turn increases the pressure gradient driving venous return back to the heart.

## explicit_objective
State that sympathetic stimulation raises mean systemic filling pressure through venoconstriction, which shifts blood out of the venous reservoir without changing total blood volume.

## pitfalls
Assuming mean systemic filling pressure can only rise if total blood volume rises -- MSFP is a function of volume relative to vascular capacitance, so sympathetic venoconstriction raises MSFP by reducing venous capacitance alone, with blood volume unchanged.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PHY-T02

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Physiology

## subtopic
Venous return

## microtopic
Sympathetic effect on MSFP

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Physiology

## article_ids
ART-CVS-MU105-VENOUS-RETURN-RESERVE

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.6

## atomic_claim_ids
CLM-CVS-A1107778AE9E3B

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q72: see question record for stem/options (End Module 43, p16).

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p16 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
General textbook/lecture fact, not a page-quoted extraction from this module's own department book; confidence set accordingly (0.6) pending a stronger source match.

## owner
Claude

## reviewer
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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first before minting; no close match found (see coverage/MU-MED105-triage.md's reuse-family list and this dispatch's own search log).
mu: Tested as "CVS End Module 43.pdf" Q72, yellow-highlight key, rendered p16 (lane-2 dispatch render, 2026-09-02).

---

# Item

## label
Spironolactone characteristically causes gynecomastia (via its anti-androgenic/progestogenic activity) and hyperkalemia (via its aldosterone-antagonist, potassium-sparing action)

## id
CON-CVS-DEBDF72E55A483

## canonical_key
cvs.pharmacology.spironolactone-gynecomastia-hyperkalemia

## aliases
Spironolactone side effects
Spironolactone gynecomastia

## arabic_label
سبيرونولاكتون يسبب تثدي الرجال وفرط بوتاسيوم الدم

## arabic_aliases


## definition
Spironolactone is an aldosterone-receptor antagonist used as a potassium-sparing diuretic. Because it blocks aldosterone's action at the collecting-tubule mineralocorticoid receptor, it reduces urinary potassium excretion, and this potassium-sparing effect can produce clinically significant hyperkalemia, especially when combined with other potassium-retaining drugs (ACE inhibitors, potassium supplements) or in renal impairment. Spironolactone also has off-target anti-androgenic and progestogenic activity at steroid receptors -- it partially blocks androgen receptors and weakly activates progesterone receptors -- and this hormonal cross-reactivity is what causes gynecomastia (and, in some patients, menstrual irregularities or decreased libido) as a characteristic side effect distinct from its diuretic mechanism.

## explicit_objective
State that spironolactone causes hyperkalemia through its potassium-sparing, aldosterone-antagonist mechanism, and gynecomastia through separate anti-androgenic/progestogenic receptor activity.

## pitfalls
Assuming gynecomastia and hyperkalemia share one mechanism -- hyperkalemia follows directly from spironolactone's aldosterone-antagonist diuretic action, while gynecomastia is an unrelated, off-target hormonal effect at androgen and progesterone receptors, not a consequence of its diuretic mechanism.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PHA-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pharmacology

## subtopic
Diuretics

## microtopic
Spironolactone adverse effects

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Pharmacology

## article_ids
ART-CVS-MU105-HF-DIURETIC-PHARM

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.6

## atomic_claim_ids
CLM-CVS-DEBDF72E55A483

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q73: see question record for stem/options (End Module 43, p11).

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p11 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty


## evidence_gaps
General textbook/lecture fact, not a page-quoted extraction from this module's own department book; confidence set accordingly (0.6) pending a stronger source match.

## owner
Claude

## reviewer
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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch first before minting; no close match found (see coverage/MU-MED105-triage.md's reuse-family list and this dispatch's own search log).
mu: Tested as "CVS End Module 43.pdf" Q73, yellow-highlight key, rendered p11 (lane-2 dispatch render, 2026-09-02).

---

# Item

## label
Dobutamine's selective beta1 agonism gives it a strong inotropic, minimally chronotropic action, making it first-line for cardiogenic shock and acute decompensated heart failure

## id
CON-FND-1F4B558BD69110

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin discipline (lane-2, 2026-09-02): searched via find-existing.mjs before authoring q47; this sibling concept already covers the fact tested, so no new MU concept was minted -- sparse overlay only, tag-additions and this field_notes row, no module_subject (per the STEP-1 ruling).
mu: Tested as "CVS End Module 43.pdf" Q47 ("Which one of the following drugs is associated with clinically useful or physiologically important positive inotropic effect?" / Dobutamine), yellow-highlight key, rendered p10-11. Full record is in docs/Kasr-Source-Imports/concept/208-INT-concepts.md; simulate with that file (and its own article, docs/Kasr-Source-Imports/article/208-INT-articles.md) as a dependency.

---

# Item

## label
Digitalis controls ventricular rate in atrial fibrillation by decreasing AV nodal conduction (vagally mediated), not by restoring rhythm or reducing atrial excitability

## id
CON-FND-C058332F0BFD90

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin discipline (lane-2, 2026-09-02): searched via find-existing.mjs before authoring q49; this sibling concept already covers the fact tested, so no new MU concept was minted -- sparse overlay only, tag-additions and this field_notes row, no module_subject (per the STEP-1 ruling).
mu: Tested as "CVS End Module 43.pdf" Q49 ("In which of the following cases digoxin is a drug of choice?" / Heart failure with Atrial Fibrillation), yellow-highlight key, rendered p11. Full record is in docs/Kasr-Source-Imports/concept/208-INT-concepts.md; simulate with that file (and its own article, docs/Kasr-Source-Imports/article/208-INT-articles.md) as a dependency.

---

# Item

## label
Digoxin inhibits the Na+/K+ ATPase enzyme, raising intracellular sodium and, via the Na+/Ca2+ exchanger, intracellular calcium -- its positive inotropic mechanism

## id
CON-FND-2379F34ADE2AB1

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin discipline (lane-2, 2026-09-02): searched via find-existing.mjs before authoring q51, q52; this sibling concept already covers the fact tested, so no new MU concept was minted -- sparse overlay only, tag-additions and this field_notes row, no module_subject (per the STEP-1 ruling).
mu: Tested as "CVS End Module 43.pdf" Q51 ("Digoxin can cause which of the following actions in therapeutic dose" / Positive inotropic effect) and Q52 ("The Mechanism of action of Digoxin is:" / Inhibition of cardiac Na+-K+ ATPase), yellow-highlight key, rendered p11-12. Full record is in docs/Kasr-Source-Imports/concept/208-INT-concepts.md; simulate with that file (and its own article, docs/Kasr-Source-Imports/article/208-INT-articles.md) as a dependency.

---

# Item

## label
Hypokalemia (alongside renal impairment, hypomagnesemia and hypercalcemia) increases digitalis toxicity, because digoxin and potassium compete for the same Na+/K+ ATPase binding site

## id
CON-FND-B929F5B301F1E1

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin discipline (lane-2, 2026-09-02): searched via find-existing.mjs before authoring q53; this sibling concept already covers the fact tested, so no new MU concept was minted -- sparse overlay only, tag-additions and this field_notes row, no module_subject (per the STEP-1 ruling).
mu: Tested as "CVS End Module 43.pdf" Q53 ("Digoxin toxicity is increased by all EXCEPT:" / Hyperkalemia -- not a risk factor per this concept's own risk-factor list, which is why it is the EXCEPT), yellow-highlight key, rendered p12. Full record is in docs/Kasr-Source-Imports/concept/208-INT-concepts.md; simulate with that file (and its own article, docs/Kasr-Source-Imports/article/208-INT-articles.md) as a dependency.

---

# Item

## label
Loop diuretics such as furosemide carry an ototoxicity risk, especially in renal insufficiency or with concurrent ototoxic drugs

## id
CON-FND-8CDAE2FC566F9E

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin discipline (lane-2, 2026-09-02): searched via find-existing.mjs before authoring q55; this sibling concept already covers the fact tested, so no new MU concept was minted -- sparse overlay only, tag-additions and this field_notes row, no module_subject (per the STEP-1 ruling).
mu: Tested as "CVS End Module 43.pdf" Q55 ("Concomitant administration of furosemide with the following agent can induce severe ototoxicity:" / Gentamicin), yellow-highlight key, rendered p12. Full record is in docs/Kasr-Source-Imports/concept/208-INT-concepts.md; simulate with that file (and its own article, docs/Kasr-Source-Imports/article/208-INT-articles.md) as a dependency.

---

# Item

## label
Thiazide diuretics block the Na+/Cl- transporter in the distal convoluted tubule

## id
CON-FND-B8F8442BE9266F

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin discipline (lane-2, 2026-09-02): searched via find-existing.mjs before authoring q56; this sibling concept already covers the fact tested, so no new MU concept was minted -- sparse overlay only, tag-additions and this field_notes row, no module_subject (per the STEP-1 ruling).
mu: Tested as "CVS End Module 43.pdf" Q56 ("Thiazide diuretic is prescribed for:" / Essential Hypertension), yellow-highlight key, rendered p12. Full record is in docs/Kasr-Source-Imports/concept/208-INT-concepts.md; simulate with that file (and its own article, docs/Kasr-Source-Imports/article/208-INT-articles.md) as a dependency.

---

# Item

## label
Infective endocarditis requires a surface to settle on and organisms to settle there

## id
CON-CVS-45B20CE90AF6EE

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin discipline (lane-2, 2026-09-02): searched via find-existing.mjs before authoring q62, q63; this sibling concept already covers the fact tested, so no new MU concept was minted -- sparse overlay only, tag-additions and this field_notes row, no module_subject (per the STEP-1 ruling).
mu: Tested as "CVS End Module 43.pdf" Q62 ("Vegetation develop as a result of:" / endothelial cell injury) and Q63 (gross features of acute infective endocarditis vegetations / friable), yellow-highlight key, rendered p13-14. Full record is in docs/import-ready/concept/SYS-CVS-CONCEPT-T08.md; simulate with that file (and its own article, docs/import-ready/article/SYS-CVS-ARTICLE-T08.md) as a dependency.

---

# Item

## label
Restrictive cardiomyopathy impairs filling without dilating the ventricle

## id
CON-CVS-4A41D59159ED61

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin discipline (lane-2, 2026-09-02): searched via find-existing.mjs before authoring q64; this sibling concept already covers the fact tested, so no new MU concept was minted -- sparse overlay only, tag-additions and this field_notes row, no module_subject (per the STEP-1 ruling).
mu: Tested as "CVS End Module 43.pdf" Q64 ("Which is a cause of restrictive cardiomyopathy?" / Sarcoidosis), yellow-highlight key, rendered p14. Full record is in docs/import-ready/concept/SYS-CVS-CONCEPT-T04.md; simulate with that file (and its own article, docs/import-ready/article/SYS-CVS-ARTICLE-T04.md) as a dependency.

---

# Item

## label
A rigid pericardium makes the ventricles compete for a fixed volume

## id
CON-CVS-268E5C530580B6

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin discipline (lane-2, 2026-09-02): searched via find-existing.mjs before authoring q66; this sibling concept already covers the fact tested, so no new MU concept was minted -- sparse overlay only, tag-additions and this field_notes row, no module_subject (per the STEP-1 ruling).
mu: Tested as "CVS End Module 43.pdf" Q66 ("Which of the following produces a combination of right-sided venous distention and low cardiac output?" / Constrictive pericarditis), yellow-highlight key, rendered p14. Full record is in docs/import-ready/concept/SYS-CVS-CONCEPT-T06.md; simulate with that file (and its own article, docs/import-ready/article/SYS-CVS-ARTICLE-T06.md) as a dependency.

---

# Item

## label
Deep vein thrombosis follows Virchow's triad (stasis, hypercoagulability, endothelial injury); inflamed clot is thrombophlebitis

## id
CON-CVS-92BB03F3D57E33

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin discipline (lane-2, 2026-09-02): searched via find-existing.mjs before authoring q67, q69; this sibling concept already covers the fact tested, so no new MU concept was minted -- sparse overlay only, tag-additions and this field_notes row, no module_subject (per the STEP-1 ruling).
mu: Tested as "CVS End Module 43.pdf" Q67 ("Thrombophlebitis is defined as:" / thrombosis in inflamed vein) and Q69 (elderly-fracture vignette, leg pain/tenderness / Deep venous thrombosis), yellow-highlight key, rendered p15. Full record is in docs/MUST-Source-Imports/concept/MUST-CVS-201-concepts.md; simulate with that file (and its own article, docs/MUST-Source-Imports/article/MUST-CVS-201-articles.md) as a dependency.

---

# Item

## label
The superior gluteal artery is the principal branch of the posterior division of the internal iliac artery

## id
CON-MSK-7F7CF4EEB4DA70

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin discipline (lane-2, 2026-09-02): searched via find-existing.mjs before authoring q71; this sibling concept already covers the fact tested, so no new MU concept was minted -- sparse overlay only, tag-additions and this field_notes row, no module_subject (per the STEP-1 ruling).
mu: Tested as "CVS End Module 43.pdf" Q71 ("The superior and inferior gluteal arteries are branches of which of the following?" / Internal iliac artery), yellow-highlight key, rendered p16. This sibling names the superior gluteal artery specifically (posterior division); the inferior gluteal artery is the anterior division's own parietal branch of the same internal iliac artery, taught in this question's own explanation from general anatomy rather than duplicated here. Full record is in docs/Ain-Shams-Source-Imports/concept/ASU-UG-eom-ug-final2-collection-concepts.md; simulate with that file (and its own article, docs/Ain-Shams-Source-Imports/article/ASU-UG-eom-ug-final2-collection-articles.md) as a dependency.

---

# Item

## label
Lines of Zahn are alternating platelet-fibrin and erythrocyte-rich layers in an antemortem thrombus

## id
CON-FND-7E61964BE1D637

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
never-a-twin discipline (lane-2, 2026-09-02): searched via find-existing.mjs before authoring q74; this sibling concept already covers the fact tested, so no new MU concept was minted -- sparse overlay only, tag-additions and this field_notes row, no module_subject (per the STEP-1 ruling).
mu: Tested as "CVS End Module 43.pdf" Q74 ("Which of the following is most likely to have grossly identifiable lines of Zahn:" / arterial Thrombus), yellow-highlight key, rendered p16. Full record is in docs/Helwan-Source-Imports/concept/HU-BMS-102-pathology-family118-part1-concepts.md; simulate with that file as a dependency (its own ## article_ids, ART-HU-BMS102-PAT-THROMBI, has no defining article file yet in this corpus -- a pre-existing gap in the Helwan lane, not fixed here).

---

<!--
  Lane-3 additions below (2026-09-02), authored for the med105-final43-p1
  cluster (CVS Final 43 - Paper 1 Answered.pdf, mu_b2fc082f072c18432ad3).
  1 sparse OVERLAY row (tag-additions only) onto a concept still PENDING in
  Kasr 104-CPS's own file, found via find-existing.mjs before minting:
    - CON-CVS-EFDC2163E84213 (Kasr, metarterioles/arteriolar resistance) — q01
  1 REUSE of a concept already minted in THIS module's own file by an
  earlier lane (no overlay row needed, already tagged +mu/+MU-MED105 here):
    - CON-CVS-D6166DE26FC349 (abdominal aorta unpaired branches) — q16
  28 NEW concepts, self-contained to this lane, grouped into six new
  articles in article/MU-MED105-articles.md. Evidence (one claim + one
  citation per new concept) is in evidence/MU-MED105-{claims,citations}.md,
  citing this module's own two department books (Integrated CVS Book for
  histology/physiology/pathology/pharmacology facts, Support 43 Anatomy CVS
  for gross-anatomy facts), per the same resource records used by lane-1/2.
-->

# Item

## label
Arterioles are the principal resistance vessels of the systemic circulation, and Poiseuille's law — resistance and flow varying with the fourth power of radius — explains why their smooth-muscle tone has such a powerful effect on local blood flow and total peripheral resistance

## id
CON-CVS-EFDC2163E84213

## universities
+mu

## learner_years
+1

## modules
+MU-MED105

## field_notes
sourceCandidateIds: Searched via find-existing.mjs ("metarterioles") before minting; hit Kasr 104-CPS's own MCQ concept, which already teaches the identical fact (the metarteriole's precapillary sphincter controls blood flow into the capillary bed) as one sentence within its broader arteriolar-resistance definition.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q1 ("Which vessels regulate the amount of blood going into the capillary bed?" / Metarterioles), yellow-highlight key, rendered p1. Full record is in docs/Kasr-Source-Imports/concept/104-CPS-mcq-concepts.md; simulate with that file (and its own article, docs/Kasr-Source-Imports/article/104-CPS-histology.md) as a dependency.

---

# Item

## label
Blood sinusoids are wide, thin-walled, slow-flow vessels found in the spleen's red pulp, where the slow transit lets splenic macrophages screen and remove aged or defective red blood cells

## id
CON-CVS-426BDAEDF23FF3

## canonical_key
cvs.histology.blood-sinusoids-spleen

## aliases
Blood sinusoids
Splenic sinusoids

## arabic_label


## arabic_aliases


## definition
Blood sinusoids are wide-calibre, irregular vessels with a thin, often fenestrated or discontinuous wall, distinct from a true capillary's continuous, narrow endothelial tube. Their width and porous wall let blood flow through them slowly compared with a true capillary bed. The spleen's red pulp is the classic sinusoidal bed in the body, built this way so blood lingers in contact with the surrounding macrophage-rich cords long enough for aged, damaged or defective red cells to be identified and removed — the basis of the spleen's red-cell quality-control function. Sinusoids of a similar kind also line the liver and bone marrow, but the spleen is the site tested here.

## explicit_objective
Identify the spleen's red pulp as the classic site of slow-flow blood sinusoids, and explain why the slow transit supports the spleen's red-cell filtering function.

## pitfalls
Confusing a sinusoid with a normal true capillary, or assuming any organ with rich blood flow (kidney, fingertip) has sinusoidal circulation — sinusoids are a specific, wide, thin-walled, fenestrated vessel type, not a general description of a well-perfused organ.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Histology

## subtopic
Cardiovascular System

## microtopic
Blood sinusoids

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Histology

## article_ids
ART-CVS-MU105-P1-VESSEL-HISTOLOGY

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## confidence
0.7

## atomic_claim_ids
CLM-CVS-426BDAEDF23FF3

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q2: Blood Sinusoids are type of blood vessels where slow circulation occurs, at Which sites it can be seen? / Spleen

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p1 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("blood sinusoids spleen") and a canonical-key grep sweep before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q2, yellow-highlight key, rendered p1.

---

# Item

## label
A prominent, wavy internal elastic lamina in cross-section is the histological hallmark of a muscular artery such as the basilar artery, distinguishing it from the concentric elastic lamellae of an elastic artery like the aorta

## id
CON-CVS-A1CABEF78F7DC3

## canonical_key
cvs.histology.muscular-artery-internal-elastic-lamina

## aliases
Internal elastic lamina
Muscular artery identification

## arabic_label


## arabic_aliases


## definition
Muscular (medium-sized, distributing) arteries carry a thick, well-developed internal elastic lamina at the junction of the intima and media. Because the vessel wall relaxes after death and during tissue fixation, this lamina buckles into a characteristic wavy line seen in histological cross-section, a feature used to identify a muscular artery such as the basilar artery. This differs from an elastic (large, conducting) artery like the aorta, whose wall is instead dominated by multiple concentric elastic lamellae running throughout the media, not a single prominent lamina at the intima-media junction. It also differs from veins, whose internal elastic lamina, when present at all, is thin and inconspicuous.

## explicit_objective
Identify a prominent wavy internal elastic lamina in cross-section as the histological hallmark of a muscular artery, and distinguish it from the concentric elastic lamellae of an elastic artery.

## pitfalls
Confusing the muscular artery's single prominent internal elastic lamina with the elastic artery's multiple concentric elastic lamellae throughout the media — these are two different histological patterns identifying two different artery classes.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Histology

## subtopic
Cardiovascular System

## microtopic
Artery wall classification

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Histology

## article_ids
ART-CVS-MU105-P1-VESSEL-HISTOLOGY

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.15

## academic_relevance
0.9

## weight_confidence
0.6

## confidence
0.75

## atomic_claim_ids
CLM-CVS-A1CABEF78F7DC3

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q3: A prominent internal elastic lamina appearing in cross section as wavy line, is characteristic of which of the following? / Basilar artery

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p1 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("internal elastic lamina wavy") before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q3, yellow-highlight key, rendered p1.

---

# Item

## label
A large vein such as the inferior vena cava has longitudinally-arranged smooth muscle bundles in its thick tunica adventitia, the opposite of an artery's pattern of muscle concentrated in the media

## id
CON-CVS-93386C33A22083

## canonical_key
cvs.histology.large-vein-adventitial-smooth-muscle

## aliases
Large vein wall structure
IVC histology

## arabic_label


## arabic_aliases


## definition
A large vein such as the inferior vena cava has a thin tunica intima and media but a very thick tunica adventitia, which is its dominant, thickest layer — the reverse of the arterial pattern, where the media dominates. This thick adventitia carries longitudinally-arranged smooth muscle bundles, on top of the usual circular muscle of the thin media, giving the wall the mechanical support it needs to resist collapse and stretch despite the vessel's low internal pressure. The thick adventitia also requires its own vasa vasorum for nutrition, since diffusion from the lumen alone is insufficient across such a thick layer.

## explicit_objective
State that a large vein's defining histological feature is smooth muscle bundles within its thick tunica adventitia, contrasting with an artery's media-dominant muscle pattern.

## pitfalls
Assuming a vein's smooth muscle is concentrated in the media, as in an artery — a large vein's muscle is instead concentrated in its thick adventitia, the outermost layer.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-HIS-T03

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Histology

## subtopic
Cardiovascular System

## microtopic
Vein wall classification

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Histology

## article_ids
ART-CVS-MU105-P1-VESSEL-HISTOLOGY

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## confidence
0.75

## atomic_claim_ids
CLM-CVS-93386C33A22083

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q4: Which of the following represents a characteristic finding in the structure of Inferior vena cava (large vein)? / Smooth muscle fibers in the adventitia

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p2 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("large vein tunica adventitia smooth muscle") before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q4, yellow-highlight key, rendered p2.

---

# Item

## label
The main tonsillar artery is a branch of the facial artery, arising as it curves over the superior constrictor muscle to pierce it and reach the palatine tonsil's lower pole

## id
CON-CVS-7D3B6519AF9A70

## canonical_key
cvs.anatomy.tonsillar-artery-facial-branch

## aliases
Tonsillar artery
Facial artery tonsillar branch

## arabic_label


## arabic_aliases


## definition
The palatine tonsil's principal blood supply, the tonsillar artery, is a branch of the facial artery. It arises as the facial artery curves over the upper border of the superior constrictor muscle of the pharynx, piercing that muscle to reach the tonsil's lower pole. Because this vessel is the tonsil's main arterial supply, it is the vessel a surgeon must identify and control during tonsillectomy to avoid significant intraoperative or post-operative haemorrhage. Smaller, inconstant contributions also reach the tonsillar bed from the ascending pharyngeal, lingual and descending palatine arteries, but none of these is the main tonsillar artery.

## explicit_objective
State that the main tonsillar artery is a branch of the facial artery, reaching the tonsil's lower pole after piercing the superior constrictor muscle.

## pitfalls
Naming the lingual, ascending pharyngeal or descending palatine artery as the MAIN tonsillar artery — each contributes only a minor, inconstant twig, while the facial artery's branch is the principal, surgically significant vessel.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Anatomy

## subtopic
Head and neck arterial supply

## microtopic
Tonsillar artery

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Anatomy

## article_ids
ART-CVS-MU105-P1-VASCULAR-ANATOMY

## related_article_ids


## related_concept_ids


## resource_ids
src_876c2bd15d1bf71629c5

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
0.7

## weight_confidence
0.6

## confidence
0.75

## atomic_claim_ids
CLM-CVS-7D3B6519AF9A70

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q7: From which of the following arteries, the main tonsillar artery arises? / Facial

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p2 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("tonsillar artery facial") before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q7, yellow-highlight key, rendered p2.

---

# Item

## label
The superficial palmar arch is formed mainly by the ulnar artery, completed on its lateral side by the superficial palmar branch of the radial artery

## id
CON-CVS-F98FC7061B98E2

## canonical_key
cvs.anatomy.superficial-palmar-arch-formation

## aliases
Superficial palmar arch
Ulnar artery palmar arch

## arabic_label


## arabic_aliases


## definition
The superficial palmar arch, lying just deep to the palmar aponeurosis, is formed principally by the ulnar artery, completed on its lateral (radial) side by the superficial palmar branch of the radial artery. It gives rise to the common palmar digital arteries that supply the fingers. This is the mirror image of the deep palmar arch, which is formed principally by the radial artery and completed by the deep branch of the ulnar artery, so the dominant vessel is reversed between the two arches.

## explicit_objective
State that the superficial palmar arch is formed mainly by the ulnar artery, completed by the radial artery's superficial palmar branch, and contrast it with the deep arch's reversed dominant vessel.

## pitfalls
Swapping the two arches' dominant vessels — the superficial arch is ulnar-dominant, the deep arch is radial-dominant, and the two are easy to confuse.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Anatomy

## subtopic
Upper limb arterial supply

## microtopic
Palmar arches

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Anatomy

## article_ids
ART-CVS-MU105-P1-VASCULAR-ANATOMY

## related_article_ids


## related_concept_ids


## resource_ids
src_876c2bd15d1bf71629c5

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
0.75

## weight_confidence
0.6

## confidence
0.75

## atomic_claim_ids
CLM-CVS-F98FC7061B98E2

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q8: Which of the following is the artery which forms the superficial palmar arch? / The ulnar with a branch from the radial

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p3 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("superficial palmar arch ulnar") before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q8, yellow-highlight key, rendered p3.

---

# Item

## label
The superior thyroid vein drains into the internal jugular vein, directly or via a common trunk with the facial vein

## id
CON-CVS-1D4229601F06C4

## canonical_key
cvs.anatomy.superior-thyroid-vein-drainage

## aliases
Superior thyroid vein
Thyroid venous drainage

## arabic_label


## arabic_aliases


## definition
The superior thyroid vein accompanies the superior thyroid artery upward from the thyroid gland and drains into the internal jugular vein, either directly or via a common trunk shared with the facial vein. The middle thyroid vein takes a similar, short, direct route into the internal jugular vein a little lower down. Both veins are therefore vulnerable to injury near the internal jugular during thyroid surgery. The inferior thyroid veins, by contrast, drain downward into the left brachiocephalic vein, not the internal jugular.

## explicit_objective
State that the superior thyroid vein drains into the internal jugular vein, and distinguish this from the inferior thyroid veins' separate drainage into the left brachiocephalic vein.

## pitfalls
Confusing the superior thyroid vein's drainage (internal jugular) with the inferior thyroid veins' drainage (left brachiocephalic vein) — the thyroid's venous outflow does not mirror its arterial inflow one-for-one.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Anatomy

## subtopic
Neck venous drainage

## microtopic
Thyroid venous drainage

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Anatomy

## article_ids
ART-CVS-MU105-P1-VASCULAR-ANATOMY

## related_article_ids


## related_concept_ids


## resource_ids
src_876c2bd15d1bf71629c5

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
0.6

## confidence
0.75

## atomic_claim_ids
CLM-CVS-1D4229601F06C4

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q9: Into which of the following veins the injured vein [superior thyroid vein] drains? / Internal jugular

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p3 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("superior thyroid vein internal jugular") before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q9, yellow-highlight key, rendered p3.

---

# Item

## label
The profunda brachii artery accompanies the radial nerve through the spiral (radial) groove on the posterior surface of the humerus, so a fracture or injury there classically damages both structures together

## id
CON-CVS-9542708C49288F

## canonical_key
cvs.anatomy.profunda-brachii-spiral-groove

## aliases
Profunda brachii artery
Radial nerve spiral groove companion vessel

## arabic_label


## arabic_aliases


## definition
The profunda brachii (deep brachial) artery arises from the brachial artery and runs with the radial nerve through the spiral (radial) groove on the posterior humeral shaft, supplying the triceps as it goes. Because the nerve and artery travel together through this groove, a mid-shaft humeral fracture or a penetrating injury at this level classically damages both the radial nerve and the profunda brachii artery together, producing wrist drop alongside bleeding from the injured vessel.

## explicit_objective
State that the profunda brachii artery accompanies the radial nerve through the spiral groove of the humerus, so injury there classically involves both structures.

## pitfalls
Naming the radial artery, which lies distally in the forearm, as the vessel accompanying the radial nerve in the spiral groove — the companion vessel at that level is the profunda brachii, not the radial artery.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Anatomy

## subtopic
Upper limb neurovascular relations

## microtopic
Spiral groove neurovascular bundle

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Anatomy

## article_ids
ART-CVS-MU105-P1-VASCULAR-ANATOMY

## related_article_ids


## related_concept_ids


## resource_ids
src_876c2bd15d1bf71629c5

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
0.7

## weight_confidence
0.6

## confidence
0.75

## atomic_claim_ids
CLM-CVS-9542708C49288F

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q12: Injury of the radial nerve in the spiral groove with bleeding from an artery that accompanied the nerve in this groove -- which artery was most likely injured? / Profunda brachii

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p4 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("profunda brachii spiral groove radial nerve") before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q12, yellow-highlight key, rendered p4.

---

# Item

## label
At the root of the neck, the subclavian vein lies anterior (superficial) to scalenus anterior while the subclavian artery lies posterior to the same muscle

## id
CON-CVS-812D4C41C85A2F

## canonical_key
cvs.anatomy.subclavian-vein-scalenus-anterior-relation

## aliases
Subclavian vein position
Scalenus anterior neurovascular relations

## arabic_label


## arabic_aliases


## definition
Scalenus anterior physically separates the subclavian vein from the subclavian artery at the root of the neck: the vein passes anterior to (superficial to) the muscle, while the artery, together with the brachial plexus's roots and trunks, passes posterior to it (between scalenus anterior and scalenus medius). This anterior position is exactly what makes the subclavian vein vulnerable to a superficial penetrating wound at the root of the neck, while the artery, lying deeper, requires the wound to also pass through or around the muscle.

## explicit_objective
State that the subclavian vein lies anterior (superficial) to scalenus anterior, while the subclavian artery lies posterior to it.

## pitfalls
Reversing the two vessels' relation to scalenus anterior — the vein is the superficial (anterior) one, the artery the deep (posterior) one, the opposite assignment is a common error.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Anatomy

## subtopic
Root of the neck

## microtopic
Subclavian vessel relations

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Anatomy

## article_ids
ART-CVS-MU105-P1-VASCULAR-ANATOMY

## related_article_ids


## related_concept_ids


## resource_ids
src_876c2bd15d1bf71629c5

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
0.7

## weight_confidence
0.6

## confidence
0.75

## atomic_claim_ids
CLM-CVS-812D4C41C85A2F

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q14: Bleeding from a vessel that lies superficial to the scalenus anterior muscle -- which vessel would be injured? / Subclavian vein

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p5 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("subclavian vein scalenus anterior") before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q14, yellow-highlight key, rendered p5.

---

# Item

## label
The right superior intercostal vein drains into the arch of the azygos vein, while the left superior intercostal vein drains into the left brachiocephalic vein

## id
CON-CVS-FD3AF3387766EC

## canonical_key
cvs.anatomy.superior-intercostal-vein-drainage

## aliases
Superior intercostal vein
Azygos arch drainage

## arabic_label


## arabic_aliases


## definition
The right superior intercostal vein drains the 2nd-4th right intercostal spaces and ends in the arch of the azygos vein, the point where the azygos vein hooks anteriorly over the root of the right lung just before joining the superior vena cava. The left superior intercostal vein drains the corresponding left-sided spaces but instead crosses the arch of the aorta to join the left brachiocephalic vein, a mirror-image but anatomically distinct pathway from its right-sided counterpart. The azygos vein's own body, further down, receives the lower right intercostal veins directly, separately from this arch-level drainage.

## explicit_objective
State that the right superior intercostal vein drains into the arch of the azygos vein, contrasting it with the left superior intercostal vein's separate drainage into the left brachiocephalic vein.

## pitfalls
Assuming the right and left superior intercostal veins drain identically — the right drains into the azygos arch, the left into the left brachiocephalic vein, two different pathways.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Anatomy

## subtopic
Thoracic venous drainage

## microtopic
Intercostal venous drainage

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Anatomy

## article_ids
ART-CVS-MU105-P1-VASCULAR-ANATOMY

## related_article_ids


## related_concept_ids


## resource_ids
src_876c2bd15d1bf71629c5

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
0.75

## weight_confidence
0.6

## confidence
0.75

## atomic_claim_ids
CLM-CVS-FD3AF3387766EC

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q15: The right superior intercostal vein ends in which of the following veins? / Arch of azygos

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p5 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("superior intercostal vein azygos") before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q15, yellow-highlight key, rendered p5.

---

# Item

## label
The great saphenous vein passes anterior to the medial malleolus as it ascends the leg, a superficial and constant landmark that makes it the classic conduit harvested for coronary artery bypass grafting

## id
CON-CVS-D4AD9E80701217

## canonical_key
cvs.anatomy.great-saphenous-vein-medial-malleolus

## aliases
Great saphenous vein course
Long saphenous vein

## arabic_label


## arabic_aliases


## definition
The great (long) saphenous vein arises from the medial end of the dorsal venous arch of the foot and passes anterior to the medial malleolus as it ascends the leg and thigh to drain into the femoral vein at the saphenofemoral junction. Its superficial, constant course anterior to the medial malleolus makes it an easy, reliable site for venous cannulation, and the same superficial, easily-dissected course through the leg and thigh is what makes it the classic conduit harvested for coronary artery bypass grafting. This is distinct from the small (short) saphenous vein, which instead runs posterior to the lateral malleolus.

## explicit_objective
State that the great saphenous vein passes anterior to the medial malleolus, and that this superficial course is why it is harvested for coronary bypass grafting.

## pitfalls
Confusing the great saphenous vein's course (anterior to the medial malleolus) with the small saphenous vein's course (posterior to the lateral malleolus) — the two veins run on opposite sides of the ankle.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Anatomy

## subtopic
Lower limb venous anatomy

## microtopic
Great saphenous vein

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Anatomy

## article_ids
ART-CVS-MU105-P1-VASCULAR-ANATOMY

## related_article_ids


## related_concept_ids


## resource_ids
src_876c2bd15d1bf71629c5

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
0.7

## weight_confidence
0.6

## confidence
0.75

## atomic_claim_ids
CLM-CVS-D4AD9E80701217

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q17: He observed that this vein [greater saphenous vein] runs in which of the following sites? / Anterior to the medial malleolus

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p6 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("great saphenous vein medial malleolus") before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q17, yellow-highlight key, rendered p6.

---

# Item

## label
The chordae tendineae, anchored between the AV valve cusps and the papillary muscles, are pulled taut during ventricular systole and prevent the cusps from prolapsing back into the atrium against the high systolic pressure

## id
CON-CVS-9065C501E85979

## canonical_key
cvs.anatomy.chordae-tendineae-prolapse-prevention

## aliases
Chordae tendineae function
AV valve prolapse prevention

## arabic_label


## arabic_aliases


## definition
The chordae tendineae are tendinous cords running from the free edges of the mitral and tricuspid valve cusps to the papillary muscles of the ventricular wall. When the ventricle contracts, its papillary muscles contract along with it, pulling on the chordae to hold the cusps taut against the closed valve orifice. This tension is exactly what prevents the cusps from ballooning (prolapsing) back into the atrium under the high pressure of ventricular systole. Rupture of a chorda or papillary muscle removes this restraint and is a classic cause of acute mitral (or tricuspid) valve regurgitation.

## explicit_objective
State that the chordae tendineae, tensioned by papillary muscle contraction, prevent AV valve cusps from prolapsing into the atrium during ventricular systole.

## pitfalls
Attributing this restraining function to the pectinate muscles or trabeculae carneae, which are unrelated atrial and ventricular wall structures — the chordae tendineae specifically, anchored to the papillary muscles, are what restrain the valve cusps.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Anatomy

## subtopic
Cardiac valve support apparatus

## microtopic
Chordae tendineae

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Anatomy

## article_ids
ART-CVS-MU105-P1-VALVES-PERICARDIUM

## related_article_ids


## related_concept_ids
CON-CVS-5E6A3445314E64
CON-CVS-4ABA568F6D69F1

## resource_ids
src_876c2bd15d1bf71629c5

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
0.6

## academic_relevance
0.7

## weight_confidence
0.6

## confidence
0.8

## atomic_claim_ids
CLM-CVS-9065C501E85979

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q18: Which of the following structures prevents regurgitation of the mitral valve cusps into the left atrium during systole? / Chordae tendineae

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p6 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
Live records CON-CVS-5E6A3445314E64 (tricuspid cusp attachment to chordae) and CON-CVS-4ABA568F6D69F1 (papillary muscle attachment to chordae) were found via find-existing.mjs; both are close in scope (chordae tendineae structure) but neither teaches THIS fact (the cusp-prolapse-prevention function during systole), so this concept was minted rather than overlaid, and both siblings are listed as related_concept_ids instead.

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
sourceCandidateIds: Searched via find-existing.mjs ("chordae tendineae") before minting; hit two live concepts about chordae ATTACHMENTS (tricuspid cusp / papillary muscle), a different fact from this one's cusp-prolapse-prevention FUNCTION -- see ## uncertainty above.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q18, yellow-highlight key, rendered p6 (pagetext.mjs keys guessed red-text E here; render shows a clean yellow highlight on D only).

---

# Item

## label
The transverse pericardial sinus lies behind the ascending aorta and pulmonary trunk, letting a surgeon pass a finger or clamp through it to encircle and cross-clamp the two great arteries together

## id
CON-CVS-CA0E298E19CEAD

## canonical_key
cvs.anatomy.transverse-pericardial-sinus

## aliases
Transverse pericardial sinus
Great artery cross-clamping

## arabic_label


## arabic_aliases


## definition
The transverse pericardial sinus is a passage within the fibrous pericardium that lies behind the ascending aorta and pulmonary trunk (the arterial mesocardium) and in front of the atria and venae cavae. Because it separates the arterial outflow tracts from the venous inflow structures, a surgeon can pass a finger or vascular clamp through this sinus to encircle and cross-clamp the ascending aorta and pulmonary trunk together, a manoeuvre used during cardiopulmonary bypass surgery. This differs from the oblique sinus, a separate pericardial recess that lies behind the left atrium, bounded by the reflections around the pulmonary veins and inferior vena cava, and used to access different structures.

## explicit_objective
State that the transverse pericardial sinus lies behind the ascending aorta and pulmonary trunk, allowing them to be encircled and clamped together, and distinguish it from the oblique sinus.

## pitfalls
Confusing the transverse sinus (behind the great arteries, used to clamp them) with the oblique sinus (behind the left atrium, bounded by the great veins) — the two pericardial sinuses have different boundaries and different surgical uses.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Anatomy

## subtopic
Pericardium

## microtopic
Transverse pericardial sinus

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Anatomy

## article_ids
ART-CVS-MU105-P1-VALVES-PERICARDIUM

## related_article_ids


## related_concept_ids


## resource_ids
src_876c2bd15d1bf71629c5

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
0.6

## confidence
0.75

## atomic_claim_ids
CLM-CVS-CA0E298E19CEAD

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q20: Fingers in the transverse pericardial sinus allow a vascular clamp upon which vessels? / Pulmonary trunk and ascending aorta

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p6 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("transverse pericardial sinus") before minting; no existing record matched. This module's own end43-cvs cluster already teaches the OBLIQUE sinus (a different, distinct pericardial recess -- see QST-MUMED105-END43-Q19); not a duplicate.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q20, yellow-highlight key, rendered p6.

---

# Item

## label
The apex of the heart, formed by the left ventricle, projects to the left fifth intercostal space in the midclavicular line -- the surface landmark for the apex beat

## id
CON-CVS-D0EBC976A8D99F

## canonical_key
cvs.anatomy.cardiac-apex-surface-landmark

## aliases
Apex beat
Cardiac apex surface projection

## arabic_label


## arabic_aliases


## definition
The apex of the heart, formed by the left ventricle, projects onto the anterior chest wall at the left fifth intercostal space in the midclavicular line. This is the classic surface landmark for palpating and auscultating the apex beat (the point of maximal cardiac impulse), and a displaced or diffuse apex beat at this landmark is a clinical sign of left ventricular enlargement. It contrasts with the surface projections of the heart's other borders and valves: the right atrium at the right sternal edge, the aortic valve behind the sternum at the third intercostal space, and the pulmonary valve at the left second intercostal space.

## explicit_objective
State that the cardiac apex projects to the left fifth intercostal space in the midclavicular line, the surface landmark for the apex beat.

## pitfalls
Confusing the apex beat's landmark (left fifth intercostal space, midclavicular line) with a valve's own auscultation area -- the apex beat marks the ventricular apex itself, not a valve.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Anatomy

## subtopic
Surface anatomy of the heart

## microtopic
Apex beat landmark

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Anatomy

## article_ids
ART-CVS-MU105-P1-VALVES-PERICARDIUM

## related_article_ids


## related_concept_ids


## resource_ids
src_876c2bd15d1bf71629c5

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
0.65

## academic_relevance
0.65

## weight_confidence
0.6

## confidence
0.8

## atomic_claim_ids
CLM-CVS-D0EBC976A8D99F

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q21: A slight rhythmic pulsation was noted at the left fifth intercostal space in the midclavicular line -- what part of the heart is present at this point? / Apex of the heart

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p7 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("apex beat fifth intercostal midclavicular") before minting; no existing record matched. This module's own end43-cvs Q20 tested the same landmark fact but was HELD (garbled printed stem, per rule 10) -- no concept was ever minted for it, so this is a fresh mint, not a duplicate of an authored item.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q21, yellow-highlight key, rendered p7.

---

# Item

## label
The superior vena cava spans two mediastinal divisions: its upper part lies in the superior mediastinum, its lower, pericardium-enclosed part in the middle mediastinum

## id
CON-CVS-1CD0584522E8BC

## canonical_key
cvs.anatomy.svc-mediastinal-divisions

## aliases
Superior vena cava mediastinum
SVC mediastinal location

## arabic_label


## arabic_aliases


## definition
The superior vena cava begins behind the first right costal cartilage, within the superior mediastinum, then descends to enter the pericardial sac and drain into the right atrium within the middle mediastinum. It therefore spans both mediastinal divisions rather than sitting wholly within either one, with the mediastinal boundary running directly across its lower course. This differs from the posterior mediastinum, which lies behind the pericardium and contains the oesophagus, descending aorta and azygos system, none of which the SVC passes through.

## explicit_objective
State that the superior vena cava spans the superior and middle mediastinum, beginning in the former and terminating within the pericardium in the latter.

## pitfalls
Naming only one mediastinal division for the SVC, or including the posterior mediastinum -- the SVC's course spans exactly the superior and middle divisions, not the posterior one.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-ANA-T04

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Anatomy

## subtopic
Mediastinum

## microtopic
SVC mediastinal course

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Anatomy

## article_ids
ART-CVS-MU105-P1-VALVES-PERICARDIUM

## related_article_ids


## related_concept_ids


## resource_ids
src_876c2bd15d1bf71629c5

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
0.75

## weight_confidence
0.6

## confidence
0.75

## atomic_claim_ids
CLM-CVS-1CD0584522E8BC

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q22: The superior vena cava lies in which of the following mediastinal divisions? / Superior and middle

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p7 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("superior vena cava mediastinum") before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q22, yellow-highlight key, rendered p7.

---

# Item

## label
Non-bacterial thrombotic (marantic) endocarditis produces small, sterile, loosely attached fibrin-and-platelet vegetations along the valve closure line, classically in debilitated or cachectic patients with an underlying hypercoagulable state such as advanced malignancy

## id
CON-CVS-11A1CED5230C0D

## canonical_key
cvs.pathology.non-bacterial-thrombotic-endocarditis

## aliases
Marantic endocarditis
Non-bacterial thrombotic endocarditis

## arabic_label


## arabic_aliases


## definition
Non-bacterial thrombotic endocarditis (also called marantic endocarditis) produces small, sterile, loosely attached vegetations of fibrin and platelets along the line of valve closure. It classically occurs in debilitated or cachectic patients with an underlying hypercoagulable state, most often advanced malignancy, and is thought to arise from endothelial injury combined with a hypercoagulable state in the absence of any infecting organism. Because no organism is involved, the vegetations remain sterile on culture, distinguishing this entity from acute or subacute infective endocarditis, both of which are caused by, and contain, an infecting organism.

## explicit_objective
Identify non-bacterial thrombotic (marantic) endocarditis as sterile, loosely adherent valve vegetations occurring in debilitated cancer patients, and distinguish it from infective and rheumatic endocarditis.

## pitfalls
Confusing marantic endocarditis with infective endocarditis because both can produce valve vegetations -- the defining difference is that marantic vegetations are sterile (no organism), while infective vegetations are organism-laden.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PAT-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pathology

## subtopic
Endocarditis

## microtopic
Non-bacterial thrombotic endocarditis

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Pathology

## article_ids
ART-CVS-MU105-P1-VASCULAR-PATHOLOGY

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.7

## academic_relevance
0.6

## weight_confidence
0.6

## confidence
0.8

## atomic_claim_ids
CLM-CVS-11A1CED5230C0D

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q23: Multiple small sterile loosely adherent vegetations over the cardiac valves in a debilitating cancer patient -- most probable type/cause? / Non-bacterial thrombotic endocarditis

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p7 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("non-bacterial thrombotic endocarditis") before minting; no existing record matched. This module's own end43-cvs cluster already teaches infective endocarditis's gross vegetation features (ART-CVS-INFECTIVE-ENDOCARDITIS) -- a different disease entity, not a duplicate.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q23, yellow-highlight key, rendered p7.

---

# Item

## label
Monckeberg medial calcific sclerosis is calcification confined to the media of a medium-sized muscular artery (classically in the lower limb of an older patient), leaving the lumen patent so the vessel is hard and rigid but not obstructed

## id
CON-CVS-E0F8E645000740

## canonical_key
cvs.pathology.monckeberg-medial-calcific-sclerosis

## aliases
Monckeberg sclerosis
Medial calcific sclerosis

## arabic_label


## arabic_aliases


## definition
Monckeberg medial calcific sclerosis is calcification of the muscular media of medium-sized arteries, classically in the lower limb, typically seen in older patients. Because the calcification is confined to the media and does not involve the intima or narrow the lumen, the vessel becomes hard and rigid (a "pipe-stem" artery) on palpation while the lumen itself remains patent and blood flow is not obstructed. This distinguishes it from atherosclerosis, which produces intimal plaques that do narrow or occlude the lumen, and from arteriolosclerosis, which affects small arterioles rather than medium muscular arteries.

## explicit_objective
Identify Monckeberg medial calcific sclerosis as medial calcification of a medium muscular artery with a preserved, patent lumen, distinct from atherosclerosis.

## pitfalls
Assuming any hard, calcified artery must have a narrowed lumen, as in atherosclerosis -- Monckeberg sclerosis is specifically defined by a patent lumen despite the calcified, rigid wall.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PAT-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pathology

## subtopic
Arteriosclerosis

## microtopic
Monckeberg medial calcific sclerosis

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Pathology

## article_ids
ART-CVS-MU105-P1-VASCULAR-PATHOLOGY

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## confidence
0.75

## atomic_claim_ids
CLM-CVS-E0F8E645000740

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q26: Hard and rigid medium sized muscular arteries of lower limb with patent lumen -- diagnosis? / Monkeberg medial calcific sclerosis

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p8 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("monckeberg medial calcific sclerosis") before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q26, yellow-highlight key, rendered p8.

---

# Item

## label
Thrombus propagation is the fate in which a thrombus keeps growing by ongoing deposition of additional platelets and fibrin, trapping more red cells and extending along the vessel, typically towards the heart for a venous thrombus

## id
CON-CVS-AF2F860A9D43D5

## canonical_key
cvs.pathology.thrombus-propagation-definition

## aliases
Thrombus propagation
Fate of a thrombus

## arabic_label


## arabic_aliases


## definition
Propagation is one of the possible fates of a thrombus: the thrombus keeps growing by the ongoing deposition of additional platelets and fibrin, trapping more red cells as it extends along the vessel. For a venous thrombus this means extension proximally, towards the heart, lengthening the original clot rather than replacing it. This growing, often loosely attached column of clot is at particular risk of fragmenting off as an embolus, which is why propagation is a clinically significant fate alongside a thrombus's other possible outcomes: resolution (complete dissolution by the fibrinolytic system), organization (replacement by ingrowing granulation tissue) and recanalization (new channels forming through an organized thrombus).

## explicit_objective
Define propagation as a thrombus's continued growth by ongoing platelet/fibrin/RBC deposition, extending toward the heart, and distinguish it from resolution, organization and recanalization.

## pitfalls
Confusing propagation (growth by new deposition) with organization (replacement by granulation tissue) -- these are two different fates a thrombus can undergo, not the same process.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PAT-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pathology

## subtopic
Thrombosis

## microtopic
Fates of a thrombus

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Pathology

## article_ids
ART-CVS-MU105-P1-VASCULAR-PATHOLOGY

## related_article_ids


## related_concept_ids
CON-FND-2F4E0092DCAF16

## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## confidence
0.8

## atomic_claim_ids
CLM-CVS-AF2F860A9D43D5

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q28: Thrombi tend to grow due to deposition of additional platelets, fibrin & RBCs towards the heart -- outcome? / Propagation

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p9 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
CON-FND-2F4E0092DCAF16 (Kasr 208-INT, "site of thrombus propagation") tests a related but different fact -- WHERE propagation happens (leg veins vs artery/aorta/vegetation) -- about the same process this concept DEFINES; listed as a related concept, not merged, since neither fully covers the other.

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
sourceCandidateIds: Searched via find-existing.mjs ("thrombus propagation") before minting; hit a Kasr 208-INT question testing a different fact (site of propagation) about the same process -- see ## uncertainty above.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q28, yellow-highlight key, rendered p9.

---

# Item

## label
Late in pregnancy, the enlarged gravid uterus mechanically compresses the inferior vena cava and pelvic veins, raising venous hydrostatic pressure in the legs and producing bilateral leg oedema despite a normal blood pressure and urine exam

## id
CON-CVS-7EC2094D5081A6

## canonical_key
cvs.pathology.pregnancy-venous-hydrostatic-oedema

## aliases
Pregnancy leg oedema mechanism
Hydrostatic oedema

## arabic_label


## arabic_aliases


## definition
Late in pregnancy, the enlarged gravid uterus mechanically compresses the inferior vena cava and pelvic veins, raising venous hydrostatic pressure in the lower limbs. This simple mechanical rise in hydrostatic pressure pushes fluid out of the capillaries into the interstitium, producing bilateral leg oedema even when blood pressure and urine findings are entirely normal. This distinguishes benign, mechanical late-pregnancy oedema from pre-eclampsia, which instead presents with hypertension and proteinuria, and from oedema caused by decreased oncotic pressure, increased capillary permeability, or salt/water retention, none of which fit a patient with an otherwise normal work-up.

## explicit_objective
State that late-pregnancy bilateral leg oedema with a normal blood pressure and urine exam reflects mechanical compression of the pelvic veins raising venous hydrostatic pressure, and distinguish it from pre-eclampsia.

## pitfalls
Assuming any pregnancy-associated oedema signals pre-eclampsia -- a normal blood pressure and urine exam point instead to simple mechanical venous compression, not a hypertensive or renal process.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PAT-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pathology

## subtopic
Oedema mechanisms

## microtopic
Pregnancy-associated leg oedema

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Pathology

## article_ids
ART-CVS-MU105-P1-VASCULAR-PATHOLOGY

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.55

## weight_confidence
0.6

## confidence
0.75

## atomic_claim_ids
CLM-CVS-7EC2094D5081A6

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q29: Bilateral lower limb edema in 9th month of pregnancy with normal BP and urine -- mechanism? / Increased hydrostatic pressure

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p9 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("pregnancy leg oedema hydrostatic pressure") before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q29, yellow-highlight key, rendered p9 (pagetext.mjs keys guessed red-text E here; render shows a clean yellow highlight on B only).

---

# Item

## label
Strangulated-hernia gangrene results from combined arterial and venous obstruction at the constricted hernial neck: the thinner-walled vein occludes first causing haemorrhagic pooling, then arterial inflow is also cut off as swelling progresses

## id
CON-CVS-DCD446F801232F

## canonical_key
cvs.pathology.strangulated-hernia-gangrene-mechanism

## aliases
Strangulated hernia gangrene
Haemorrhagic infarction mechanism

## arabic_label


## arabic_aliases


## definition
In a strangulated hernia, the tight neck of the hernial sac compresses both the artery and vein of the trapped bowel loop. The thinner-walled vein occludes first, causing blood to pool and haemorrhage into the tissue; as swelling within the trapped segment progresses, arterial inflow is also cut off. This combined arterial and venous obstruction produces haemorrhagic (black, gangrenous) infarction of the strangulated segment, distinguishing it from pure arterial obstruction, which instead produces pale, dry (anaemic) infarction without the same haemorrhagic black discolouration.

## explicit_objective
State that strangulated-hernia gangrene results from combined arterial and venous obstruction at the constricted hernial neck, producing haemorrhagic rather than anaemic infarction.

## pitfalls
Attributing strangulation gangrene to arterial obstruction alone, as in a typical anaemic infarct -- the haemorrhagic, black appearance specifically reflects venous occlusion happening first, then combined with arterial occlusion.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PAT-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pathology

## subtopic
Infarction and gangrene

## microtopic
Strangulated hernia gangrene

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Pathology

## article_ids
ART-CVS-MU105-P1-VASCULAR-PATHOLOGY

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## academic_relevance
0.6

## weight_confidence
0.6

## confidence
0.8

## atomic_claim_ids
CLM-CVS-DCD446F801232F

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q31: Strangulated umbilical hernia with development of black spots -- etiological factor? / Arterial and venous obstruction

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p10 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("strangulated hernia gangrene") before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q31, yellow-highlight key, rendered p10.

---

# Item

## label
An infarct's basic tissue architecture is preserved in its early phase (coagulative necrosis) because the supporting connective tissue framework survives even though the parenchymal cells themselves die

## id
CON-CVS-9C2C53AAE415CF

## canonical_key
cvs.pathology.infarct-architecture-preservation

## aliases
Coagulative necrosis
Infarct ghost architecture

## arabic_label


## arabic_aliases


## definition
In coagulative necrosis, the pattern seen in most solid-organ infarcts, the basic outline of the affected tissue is preserved for several days after the infarct occurs. This is because the supporting connective tissue framework -- the collagen and reticulin stroma -- survives even though the parenchymal (functional) cells die. This preserved "ghost" architecture is what allows a pathologist to recognise the outline of a coagulative infarct microscopically before the dead tissue is eventually digested by macrophages and remodelled by granulation tissue and scarring.

## explicit_objective
State that the supporting connective tissue framework, not the parenchyma, preserves an infarct's architecture in its early phase (coagulative necrosis).

## pitfalls
Assuming the parenchyma itself is what is preserved after infarction -- it is the parenchyma that dies; the connective tissue stroma is what survives and preserves the tissue outline.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PAT-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pathology

## subtopic
Infarction and coagulative necrosis

## microtopic
Infarct architecture

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Pathology

## article_ids
ART-CVS-MU105-P1-VASCULAR-PATHOLOGY

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.35

## academic_relevance
0.7

## weight_confidence
0.6

## confidence
0.75

## atomic_claim_ids
CLM-CVS-9C2C53AAE415CF

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q32: The architecture of infarcted tissue is preserved in early phases due to preserved / supporting connective tissue

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p10 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("infarct architecture preserved") before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q32, yellow-highlight key, rendered p10.

---

# Item

## label
An aneurysmal varix is an abnormal direct communication between an artery and an adjacent vein, typically post-traumatic, whose resulting aneurysmal dilatation forms as part of the venous wall, not the arterial wall

## id
CON-CVS-A6A1D83DD74BC0

## canonical_key
cvs.pathology.aneurysmal-varix

## aliases
Aneurysmal varix
Arteriovenous aneurysm

## arabic_label


## arabic_aliases


## definition
An aneurysmal varix is an abnormal direct communication between an artery and an adjacent vein, typically resulting from trauma, through which arterial pressure is transmitted into the vein. The vein wall, not built to withstand arterial pressure, responds by dilating into a pulsatile sac; this dilatation is therefore an aneurysmal change that forms as part of the venous wall itself, not the arterial wall. This distinguishes it from a true aneurysm (atherosclerosis-driven, dilating the arterial wall itself), a dissecting aneurysm (hypertension-driven medial dissection within the arterial wall), a false aneurysm (a contained rupture surrounded by a fibrous capsule), and an inflammatory aneurysm (driven by an inflammatory process in the aortic wall).

## explicit_objective
Identify an aneurysmal varix as an arteriovenous communication whose aneurysmal dilatation is part of the venous, not arterial, wall, and distinguish it from true, dissecting, false and inflammatory aneurysms.

## pitfalls
Assuming any pulsatile vascular dilatation is arterial in origin -- an aneurysmal varix's dilatation specifically involves the venous wall, driven by arterial pressure transmitted across an abnormal AV communication.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PAT-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pathology

## subtopic
Aneurysm classification

## microtopic
Aneurysmal varix

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Pathology

## article_ids
ART-CVS-MU105-P1-VASCULAR-PATHOLOGY

## related_article_ids


## related_concept_ids
CON-CVS-CE2E5976F7BFBF

## resource_ids
src_5ca028d96bdca72569d0

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
0.65

## weight_confidence
0.6

## confidence
0.75

## atomic_claim_ids
CLM-CVS-A6A1D83DD74BC0

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Match Q35: Aneurysmal varix -- best described by? / Aneurysmal dilatation is part of venous wall

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p11 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("aneurysmal varix") before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" match item 35, printed answer key (literal letter E in the source's own table), p11.

---

# Item

## label
A dissecting aneurysm arises when blood tracks into a tear in the aortic intima and dissects along a plane within the weakened media, most classically driven by chronic hypertension

## id
CON-CVS-CE2E5976F7BFBF

## canonical_key
cvs.pathology.dissecting-aneurysm-hypertension

## aliases
Dissecting aneurysm
Aortic dissection cause

## arabic_label


## arabic_aliases


## definition
A dissecting aneurysm arises when blood tracks into a tear in the aortic intima and dissects along a plane within the weakened media, splitting the wall rather than simply dilating it. Chronic hypertension is the classic driver of this process: the sustained high pressure both predisposes to the underlying cystic medial degeneration and supplies the force that propagates the dissection along the wall. This hypertension-driven mechanism distinguishes a dissecting aneurysm from an atherosclerosis-driven true (fusiform or saccular) aneurysm, and from an aneurysmal varix, whose dilatation instead involves the venous wall following an abnormal arteriovenous communication.

## explicit_objective
State that hypertension-driven medial degeneration is the classic cause of a dissecting aneurysm, distinguishing it from atherosclerosis-driven true aneurysms.

## pitfalls
Attributing a dissecting aneurysm to atherosclerosis, as with a true aneurysm -- hypertension and medial degeneration, not atherosclerotic plaque, are the classic drivers of dissection.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PAT-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pathology

## subtopic
Aneurysm classification

## microtopic
Dissecting aneurysm

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Pathology

## article_ids
ART-CVS-MU105-P1-VASCULAR-PATHOLOGY

## related_article_ids


## related_concept_ids
CON-CVS-A6A1D83DD74BC0

## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## academic_relevance
0.65

## weight_confidence
0.6

## confidence
0.8

## atomic_claim_ids
CLM-CVS-CE2E5976F7BFBF

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Match Q36: Dissecting aneurysm -- best described by? / Hypertension

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p11 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("dissecting aneurysm") before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" match item 36, printed answer key (literal letter B in the source's own table), p11.

---

# Item

## label
Aortic valve stenosis imposes a chronic pressure overload on the left ventricle, driving compensatory hypertrophy and, once exhausted, left-sided heart failure

## id
CON-CVS-4A6B6FAE038355

## canonical_key
cvs.pathology.aortic-stenosis-left-heart-failure

## aliases
Aortic stenosis heart failure
Left ventricular pressure overload

## arabic_label


## arabic_aliases


## definition
Aortic valve stenosis imposes a chronic pressure overload directly on the left ventricle, which must generate higher pressure to eject blood across the narrowed valve. Over time this drives concentric left ventricular hypertrophy as the chamber compensates for the added workload. Once this compensation is exhausted, the overloaded left ventricle dilates and fails, producing left-sided heart failure. This contrasts with mitral stenosis, pulmonary stenosis, emphysema and pulmonary fibrosis, which instead overload the right side of the circulation (raising left atrial/pulmonary pressure without directly overloading the left ventricle, or raising right ventricular afterload) and so cause right-, not left-sided, failure.

## explicit_objective
State that aortic valve stenosis, via chronic left-ventricular pressure overload, is a cause of left-sided heart failure, distinguishing it from causes of right-sided failure.

## pitfalls
Grouping aortic stenosis with the causes of right-sided heart failure (mitral stenosis, pulmonary disease, pulmonary stenosis) -- it is the one option among these that directly overloads the LEFT ventricle.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PAT-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pathology

## subtopic
Heart failure

## microtopic
Left-sided heart failure causes

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Pathology

## article_ids
ART-CVS-MU105-P1-HEART-FAILURE-RHEUMATIC

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## academic_relevance
0.65

## weight_confidence
0.6

## confidence
0.8

## atomic_claim_ids
CLM-CVS-4A6B6FAE038355

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q24: Which one of the following is a cause of left sided heart failure? / Aortic valve stenosis (AS)

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p8 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("left sided heart failure aortic stenosis") before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q24, yellow-highlight key, rendered p8.

---

# Item

## label
The arthritis of acute rheumatic fever is a non-erosive, migratory polyarthritis: the joint is painful and swollen, but the articular cartilage is preserved and the arthritis resolves completely without residual joint damage

## id
CON-CVS-5777FDF4C26257

## canonical_key
cvs.pathology.rheumatic-fever-arthritis-non-erosive

## aliases
Rheumatic fever arthritis
Migratory polyarthritis

## arabic_label


## arabic_aliases


## definition
The arthritis of acute rheumatic fever is a non-erosive, migratory polyarthritis. The synovium is inflamed and the joint is painful and swollen, but the articular cartilage itself is preserved throughout the attack. Because the cartilage is spared, the arthritis resolves completely without any residual joint damage, unlike the carditis of the same illness, which can leave the heart permanently scarred (chronic rheumatic valve disease). This non-erosive, fully-reversible pattern distinguishes rheumatic fever's joint involvement from an erosive arthritis such as rheumatoid arthritis, in which articular cartilage is progressively destroyed.

## explicit_objective
State that the arthritis of acute rheumatic fever is non-erosive, leaving the articular cartilage preserved and resolving without residual damage, unlike the concurrent carditis.

## pitfalls
Assuming rheumatic fever's arthritis leaves permanent joint damage, by analogy with its carditis -- the joint disease is fully reversible; only the heart is at risk of lasting scarring.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PAT-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pathology

## subtopic
Rheumatic fever

## microtopic
Rheumatic arthritis

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Pathology

## article_ids
ART-CVS-MU105-P1-HEART-FAILURE-RHEUMATIC

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.65

## weight_confidence
0.6

## confidence
0.75

## atomic_claim_ids
CLM-CVS-5777FDF4C26257

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q25: Which one of the following is a characteristic feature of Rheumatic arthritis? / Preserved articular cartilage

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p8 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("rheumatic fever articular cartilage") before minting; no existing record matched. This module's own end43-cvs cluster already teaches Mac Callum's patch (rheumatic CARDITIS) -- a different disease component, not a duplicate.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q25, yellow-highlight key, rendered p8.

---

# Item

## label
Chronic right-sided heart failure raises central venous pressure and produces chronic passive congestion of the liver: centrilobular haemorrhage deposits haemosiderin, and long-standing congestion drives centrilobular fibrosis (cardiac/nutmeg cirrhosis)

## id
CON-CVS-2C57180475285E

## canonical_key
cvs.pathology.cardiac-cirrhosis-haemosiderin

## aliases
Chronic passive congestion of the liver
Nutmeg liver

## arabic_label


## arabic_aliases


## definition
Chronic right-sided heart failure raises central venous pressure, producing chronic passive congestion of the liver: centrilobular sinusoids become engorged, hepatocytes there undergo hypoxic atrophy and haemorrhage, and macrophages break down the extravasated red cells, depositing haemosiderin in the centrilobular zone. This gives the liver its characteristic mottled "nutmeg" appearance grossly. Long-standing congestion of this kind drives centrilobular fibrosis and, eventually, cardiac ("nutmeg") cirrhosis, distinguishing the pigment and mechanism here from bilirubin/biliverdin (jaundice), copper (Wilson disease) or hematin (haemolytic conditions such as malaria).

## explicit_objective
State that haemosiderin deposition from centrilobular haemorrhage underlies cardiac (nutmeg) liver cirrhosis in chronic right heart failure.

## pitfalls
Attributing the liver change in chronic right heart failure to bilirubin (jaundice-related) or copper (Wilson disease) pigments -- the specific pigment deposited from centrilobular haemorrhage in chronic passive congestion is haemosiderin.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PAT-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pathology

## subtopic
Chronic venous congestion

## microtopic
Cardiac (nutmeg) liver cirrhosis

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Pathology

## article_ids
ART-CVS-MU105-P1-HEART-FAILURE-RHEUMATIC

## related_article_ids


## related_concept_ids


## resource_ids
src_5ca028d96bdca72569d0

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
0.55

## academic_relevance
0.6

## weight_confidence
0.6

## confidence
0.8

## atomic_claim_ids
CLM-CVS-2C57180475285E

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q30: Pulmonary hypertension and compensated right sided heart failure with enlarged tender liver -- material responsible for liver cirrhosis? / Hemosiderin

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p10 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("hemosiderin liver") before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q30, yellow-highlight key, rendered p10.

---

# Item

## label
Quinidine is a Class I anti-arrhythmic drug, blocking fast voltage-gated sodium channels in cardiac myocytes to slow the action potential's phase 0 upstroke and stabilise the myocardial membrane

## id
CON-CVS-136EF337EB578B

## canonical_key
cvs.pharmacology.class-i-antiarrhythmic-quinidine

## aliases
Class I anti-arrhythmic
Quinidine mechanism

## arabic_label


## arabic_aliases


## definition
Quinidine is a Class I anti-arrhythmic drug: it blocks fast voltage-gated sodium channels in cardiac myocytes, slowing the rate of the action potential's phase 0 upstroke. This membrane-stabilising action slows conduction through the myocardium, the shared mechanism that defines the whole Class I family, of which quinidine is a Class IA member (intermediate sodium-channel blockade with additional potassium-channel effects that prolong the action potential). This contrasts with Class II agents (beta-blockers such as atenolol and propranolol), Class III agents (potassium-channel blockers such as amiodarone) and Class IV agents (calcium-channel blockers such as verapamil), each of which acts through a different channel or receptor.

## explicit_objective
Identify quinidine as a Class I (sodium-channel blocking) anti-arrhythmic drug, and distinguish the four anti-arrhythmic drug classes by their mechanism.

## pitfalls
Assigning quinidine to Class III alongside amiodarone because both affect the action potential's repolarisation -- quinidine's PRIMARY, class-defining action is fast sodium-channel blockade (Class I), not the potassium-channel blockade that defines Class III.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PHA-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pharmacology

## subtopic
Anti-arrhythmic drug classification

## microtopic
Class I anti-arrhythmics

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Pharmacology

## article_ids
ART-CVS-MU105-P1-ANTIARRHYTHMIC-PHARM

## related_article_ids


## related_concept_ids
CON-CVS-DC7789864C39B9
CON-CVS-E5510D2D844FDB

## resource_ids
src_5ca028d96bdca72569d0

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
0.55

## academic_relevance
0.7

## weight_confidence
0.6

## confidence
0.8

## atomic_claim_ids
CLM-CVS-136EF337EB578B

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q33: Which of the following drugs are Class I anti-arrhythmic drugs? / Quinidine

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p10 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("class I antiarrhythmic quinidine") before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q33, yellow-highlight key, rendered p10.

---

# Item

## label
Lidocaine (Class IB) acts preferentially on depolarised ventricular tissue and has little effect on AV nodal conduction, unlike beta-blockers, digitalis and verapamil, which all slow AV nodal conduction

## id
CON-CVS-E5510D2D844FDB

## canonical_key
cvs.pharmacology.lidocaine-spares-av-conduction

## aliases
Lidocaine AV conduction
Drugs sparing the AV node

## arabic_label


## arabic_aliases


## definition
Lidocaine is a Class IB sodium-channel blocker that acts preferentially on depolarised, especially ischaemic, ventricular tissue. It has little effect on the AV node's own calcium-dependent conduction, a different electrical mechanism from the fast sodium channels lidocaine targets. This sets it apart from beta-blockers (esmolol, propranolol), which slow AV conduction by reducing sympathetic drive to the node; digitalis, which slows AV conduction by increasing vagal tone; and verapamil, a calcium-channel blocker that acts directly on the node's calcium-dependent action potential -- all four of which do decrease AV nodal conduction, unlike lidocaine.

## explicit_objective
State that lidocaine, unlike beta-blockers, digitalis and verapamil, does not significantly decrease AV nodal conduction, because it targets ventricular sodium channels rather than the AV node's calcium-dependent conduction.

## pitfalls
Grouping lidocaine with the other rate-slowing antiarrhythmics because all are used in arrhythmia -- lidocaine specifically spares the AV node, acting instead on ventricular tissue, the opposite pharmacological target from the other four drugs.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PHA-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pharmacology

## subtopic
AV nodal conduction pharmacology

## microtopic
Lidocaine and the AV node

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Pharmacology

## article_ids
ART-CVS-MU105-P1-ANTIARRHYTHMIC-PHARM

## related_article_ids


## related_concept_ids
CON-CVS-136EF337EB578B

## resource_ids
src_5ca028d96bdca72569d0

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
0.55

## academic_relevance
0.65

## weight_confidence
0.6

## confidence
0.75

## atomic_claim_ids
CLM-CVS-E5510D2D844FDB

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q34: All of the following drugs decrease AV conduction EXCEPT: / Lidocaine

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p11 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("lidocaine AV conduction") before minting; no existing record matched. This module's own end43-cvs cluster already teaches digoxin's AV-conduction-decreasing effect (a different drug, complementary fact) -- not a duplicate.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q34, yellow-highlight key, rendered p11.

---

# Item

## label
Quinidine, like its parent compound quinine, can cause cinchonism, a dose-related toxicity syndrome of tinnitus, headache, dizziness, blurred vision and gastrointestinal upset

## id
CON-CVS-DC7789864C39B9

## canonical_key
cvs.pharmacology.quinidine-cinchonism

## aliases
Cinchonism
Quinidine adverse effects

## arabic_label


## arabic_aliases


## definition
Quinidine, like its parent compound quinine, can produce cinchonism, a dose-related toxicity syndrome whose features are tinnitus, headache, dizziness, blurred vision and gastrointestinal upset. The syndrome is named for cinchona bark, the original source of quinine-family drugs, and is one of the classic adverse-effect associations tested for this drug. This distinguishes quinidine's adverse-effect profile from that of the other listed anti-arrhythmics: amiodarone (pulmonary fibrosis, thyroid dysfunction, corneal deposits), and the beta-blockers and calcium-channel blocker (bradycardia and their own class-specific effects), none of which cause cinchonism.

## explicit_objective
State that quinidine can cause cinchonism (tinnitus, headache, dizziness, blurred vision, GI upset), and name cinchona bark as the syndrome's origin.

## pitfalls
Confusing cinchonism with the adverse effects of the other Class-differing anti-arrhythmics listed alongside quinidine (amiodarone's pulmonary/thyroid effects, or beta-blocker/calcium-channel-blocker bradycardia) -- cinchonism is specifically a quinidine/quinine-family toxicity.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
cvs

## primary_node_id
DIS-PHA-T01

## secondary_node_ids
SYS-CVS-T01-S01

## topic
Pharmacology

## subtopic
Anti-arrhythmic drug adverse effects

## microtopic
Cinchonism

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS Final 43 - Paper 1 > Pharmacology

## article_ids
ART-CVS-MU105-P1-ANTIARRHYTHMIC-PHARM

## related_article_ids


## related_concept_ids
CON-CVS-136EF337EB578B

## resource_ids
src_5ca028d96bdca72569d0

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
0.6

## confidence
0.75

## atomic_claim_ids
CLM-CVS-DC7789864C39B9

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q37: Which of the following drugs can induce cinchonism as an adverse effect? / Quinidine

## exam_signal
mu_b2fc082f072c18432ad3 | paper | | p11 | MU-MED105

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
sourceCandidateIds: Searched via find-existing.mjs ("cinchonism") before minting; no existing record matched.
mu: Tested as "CVS Final 43 - Paper 1 Answered.pdf" Q37, red text (printed, no highlight needed), p11.

---
