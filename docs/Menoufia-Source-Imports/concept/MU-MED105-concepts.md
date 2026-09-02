<!--
  MU-MED105 (Cardiovascular system) · lane-1 authored concepts for the
  CVS End Module 43 cluster (42 questions: 41 minted/reused + 1 sparse
  overlay). Searched via find-existing.mjs and a canonical-key grep sweep
  first (see coverage/MU-MED105-triage.md's concept-search sample and the
  per-item field_notes below).

  36 NEW concepts, self-contained to this lane (no other lane's pending
  files are required as gate/simulate dependencies, by deliberate choice —
  several of these facts have a near-duplicate already pending in another
  university's files, Kasr 104-CPS and Alexandria AU-MED-105 chief among
  them; each such concept's field_notes names the sibling id for a future
  cross-university dedup pass rather than being overlaid onto that lane's
  own in-flight file this dispatch, per MED104 lane-3's own caution about
  missing cross-university article dependencies).

  1 sparse OVERLAY row (tag-additions only, no body fields) onto a concept
  already LIVE in server/data/medical-library-v1.json, which needs no
  extra dependency file since gate reads live state directly:
    - CON-CVS-AD0881F8B57C91 (Afterload) — q42

  Evidence (one claim + one citation per new concept) is in the sibling
  evidence/MU-MED105-* files, citing the module's own Integrated CVS Book
  and Anatomy Support 43 CVS book. Teaching articles are in
  article/MU-MED105-articles.md.

  Simulate together with the sibling article + evidence files + this
  module's question batch:
    npm run medical:simulate -- \
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
CON-CVS-C2C8702CBA09CC

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
CON-CVS-A275BC451FCD18

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
CON-CVS-C0ADE9E8979F5A

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
The right coronary artery gives the marginal and posterior interventricular arteries, supplies the whole right side of the heart and, in most people, the whole conducting system — so its posterior interventricular branch carries the middle cardiac vein alongside it

## id
CON-CVS-C0ADE9E8979F5A

## canonical_key
cvs.anatomy.right-coronary-artery-course-nodes-middle-cardiac-vein

## aliases
Right coronary artery distribution
SA and AV node blood supply
Middle cardiac vein with posterior interventricular artery

## arabic_label
الشريان التاجي الأيمن يغذي العقدتين الجيبية والأذينية البطينية

## arabic_aliases


## definition
The right coronary artery arises from the anterior aortic sinus, runs the coronary sulcus, gives the marginal artery near the heart's inferior border, then turns posteriorly to give the posterior (inferior) interventricular artery before anastomosing with the circumflex artery. In most people it supplies the entire right atrium, right ventricle and, importantly, the whole conducting system — both the SA node and the AV node/bundle — which is why occlusion of the right coronary artery is a classic cause of nodal arrhythmias. Its posterior interventricular branch runs the posterior interventricular groove accompanied by the middle cardiac vein, the vessel most at risk of injury when a surgeon exposes that artery.

## explicit_objective
State that the right coronary artery supplies the SA and AV nodes in most people, gives the posterior (not anterior) interventricular artery, and that the middle cardiac vein is the vessel that accompanies (and is at surgical risk alongside) the posterior interventricular artery.

## pitfalls
Assuming the artery placed at surgical risk when exposing the posterior interventricular artery is the great or small cardiac vein — it is specifically the middle cardiac vein, the vein that runs the same posterior interventricular groove alongside that artery, not a vein that runs elsewhere.

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
Coronary vessels

## microtopic
Right coronary artery distribution

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Anatomy

## article_ids
ART-CVS-MU105-CORONARY-ANATOMY

## related_article_ids


## related_concept_ids
CON-CVS-1457E145410C1C
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
0.45

## exam_weight_by_year
MU_Y1=0.45

## clinical_relevance
0.55

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-CVS-C0ADE9E8979F5A

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q13: In most of the population, SA node and AV node are supplied by which of the following? / Right coronary artery. Q21: A 48-year-old male patient had chronic angina. Coronary angiography revealed nearly total blockage of the posterior interventricular artery. In exposing this artery, which accompanying vessel is most susceptible to injury? / Middle cardiac vein

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p4,p5 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
This concept is close in scope to Kasr 104-CPS's own CON-CVS-2A21F1B4F30B61 (right-coronary-artery.course-and-distribution, still pending in that lane's own files) — a strong candidate for a future cross-university dedup/overlay pass rather than two independent concepts long-term.

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
The anterior tibial artery continues over the front of the ankle as the dorsalis pedis artery

## id
CON-CVS-C2C8702CBA09CC

## canonical_key
cvs.anatomy.anterior-tibial-continues-as-dorsalis-pedis

## aliases
Dorsalis pedis artery origin
Anterior compartment leg artery continuation

## arabic_label
الشريان الظنبوبي الأمامي يستمر كشريان ظهر القدم

## arabic_aliases


## definition
The anterior tibial artery is the artery of the leg's anterior compartment, running down between tibialis anterior and extensor digitorum longus. In front of the ankle joint, midway between the two malleoli, it crosses under the extensor retinaculum and is renamed the dorsalis pedis artery, which then runs onto the dorsum of the foot and dives into the sole to help complete the deep plantar arch.

## explicit_objective
State that the anterior tibial artery becomes the dorsalis pedis artery at the front of the ankle, distinguishing this from the posterior tibial artery's own continuation into the plantar arteries.

## pitfalls
Confusing the anterior and posterior tibial arteries' respective continuations — the anterior tibial artery becomes the dorsalis pedis (dorsum of the foot); the posterior tibial artery instead divides behind the medial malleolus into the medial and lateral plantar arteries (sole of the foot).

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
Leg and foot arteries

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Anatomy

## article_ids
ART-CVS-MU105-PERIPHERAL-VESSELS

## related_article_ids


## related_concept_ids
CON-CVS-FB707E448E503C

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
0.35

## academic_relevance
0.75

## weight_confidence
0.35

## confidence
0.75

## atomic_claim_ids
CLM-CVS-C2C8702CBA09CC

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q17: The artery of the anterior compartment of the leg continues as which of the following arteries? / Dorsalis pedis artery

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p4 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
Close in scope to Alexandria AU-MED-105's own pending CON-MSK-0415214C935D2D (leg.dorsalis-pedis-posterior-tibial-arteries) — a candidate for a future cross-university dedup/overlay pass.

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
The cardiac action potential's plateau (phase 2) is sustained by a balance between inward Ca2+ influx (L-type calcium channels) and outward K+ efflux

## id
CON-CVS-9947504F986142

## canonical_key
cvs.physiology.ap-plateau-calcium-potassium-balance

## aliases
Cardiac action potential plateau
Phase 2 plateau

## arabic_label
هضبة جهد الفعل القلبي

## arabic_aliases


## definition
Phase 2 (the plateau) of the fast-response cardiac action potential follows the rapid depolarisation of phase 0 and holds the membrane near zero millivolts for an extended period. This plateau exists because inward Ca2+ current through L-type calcium channels is balanced against outward K+ current through delayed-rectifier potassium channels; neither current dominates, so the membrane potential barely changes for tens of milliseconds. The plateau is what prolongs cardiac muscle contraction long enough for effective ejection and prevents tetanic (fused) contraction by keeping the cell refractory throughout.

## explicit_objective
State that the fast-response cardiac action potential's plateau phase is caused by a balance between inward Ca2+ (L-type channel) influx and outward K+ efflux, not by Na+ currents.

## pitfalls
Attributing the plateau to a Na+/K+ balance (the pattern that shapes phase 0's upstroke and phase 3's repolarisation) rather than the Ca2+/K+ balance specific to phase 2 — fast Na+ channels are already inactivated by the time the plateau is reached.

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
Cardiac action potential phases

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Physiology

## article_ids
ART-CVS-MU105-CONTRACTILITY-PLATEAU

## related_article_ids


## related_concept_ids
CON-CVS-84C54F9C48D1C1

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
CLM-CVS-9947504F986142

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q22: Which of the following is the cause of the plateau phase in the fast response cardiac action potential? / Balance between inward Ca++ and outward K +

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p6 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
Close in scope to Kasr 104-CPS's own pending CON-CVS-D0CD4A234205EF (cardiac-action-potential.plateau-phase2.calcium-potassium-balance) — a candidate for a future cross-university dedup pass.

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
The supernormal phase of excitability, at the tail of repolarisation, is a dangerous period because a weak (subthreshold) stimulus can trigger an ectopic beat and precipitate ventricular fibrillation

## id
CON-CVS-73C75ED6DFDD91

## canonical_key
cvs.physiology.supernormal-excitability-vulnerable-period

## aliases
Supernormal phase of excitability
Vulnerable period cardiac cycle

## arabic_label
فترة الاستثارة فوق الطبيعية

## arabic_aliases


## definition
As the cardiac action potential repolarises, excitability passes through an absolute refractory period (no stimulus, however strong, can excite the cell), a relative refractory period (only a stronger-than-normal stimulus can), and finally, coinciding with the last half of repolarisation, a brief supernormal phase in which even a weak, subthreshold stimulus can excite the muscle. This supernormal phase is also called the vulnerable period because a stimulus landing during it (for example, from an ectopic focus or an electric shock) can trigger a re-entrant arrhythmia, making ventricular fibrillation the classic danger of a stimulus falling here.

## explicit_objective
Name the supernormal phase of excitability (coinciding with late repolarisation) as the dangerous, vulnerable period where a subthreshold stimulus can trigger ventricular fibrillation.

## pitfalls
Assuming the absolute refractory period is the dangerous one because it sounds most "extreme" — the absolute refractory period is in fact the safest, since no stimulus at all can excite the muscle then; the danger is specific to the supernormal phase, where excitability is paradoxically heightened.

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
Refractory periods and excitability

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Physiology

## article_ids
ART-CVS-MU105-AUTOMATICITY-CONDUCTION

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
0.45

## exam_weight_by_year
MU_Y1=0.45

## clinical_relevance
0.55

## academic_relevance
0.85

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-CVS-73C75ED6DFDD91

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q24: In which period of cardiac action potential, the excitability is considered dangerous due to increased susceptibility to ventricular fibrillation? / Supernormal phase of excitability

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p6 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
Close in scope to Kasr 104-CPS's own pending CON-CVS-5288011D93888B (cardiac-myocyte-action-potential.refractory-periods.arp-rrp-supernormal) — a candidate for a future cross-university dedup pass.

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
Depolarization of an autorhythmic (pacemaker) cell is carried mainly by Ca2+ influx through L-type calcium channels, unlike the fast Na+-driven upstroke of a working myocyte

## id
CON-CVS-84C54F9C48D1C1

## canonical_key
cvs.physiology.autorhythmic-cell-calcium-depolarization

## aliases
Pacemaker cell depolarization
Autorhythmic action potential upstroke

## arabic_label
إزالة استقطاب الخلايا ذاتية النظم بواسطة الكالسيوم

## arabic_aliases


## definition
A working (non-pacemaker) atrial or ventricular myocyte depolarises via a fast, large-magnitude Na+ current through voltage-gated fast sodium channels. An autorhythmic (pacemaker) cell such as an SA-node cell instead never rests at a fixed potential — a slow pacemaker current continuously drifts the membrane toward threshold — and once threshold is reached, its own depolarisation upstroke is carried by L-type Ca2+ channels rather than fast Na+ channels, which stay largely inactivated at the pacemaker cell's less negative resting range. This Ca2+-driven upstroke is correspondingly slower and smaller in magnitude than a working myocyte's Na+-driven one.

## explicit_objective
State that the depolarization (upstroke) of an autorhythmic cell's action potential is driven by Ca2+ influx through L-type channels, not by Na+ influx as in a working myocyte.

## pitfalls
Applying the working-myocyte rule (fast Na+ channels drive the upstroke) to pacemaker cells by default — pacemaker cells are the exception, with Ca2+ (not Na+) carrying their depolarising current, because their less negative resting potential keeps fast Na+ channels inactivated.

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
Pacemaker action potential

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Physiology

## article_ids
ART-CVS-MU105-CONTRACTILITY-PLATEAU

## related_article_ids


## related_concept_ids
CON-CVS-9947504F986142

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
0.85

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
CLM-CVS-84C54F9C48D1C1

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q25: Which one of the following ions is responsible for depolarization phase of the auto rhythmic cell action potential? / Calcium (Ca++) influx

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p6 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
Close in scope to Alexandria AU-MED-105's own pending CON-CVS-A4657614AE6923 (heart.action-potential.pacemaker-vs-working-myocardium) — a candidate for a future cross-university dedup pass.

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
The AV node's relatively slow conduction delays the impulse just long enough for the atria to complete their contraction before ventricular activation begins

## id
CON-CVS-A275BC451FCD18

## canonical_key
cvs.physiology.av-node-conduction-delay-function

## aliases
AV node conduction delay
Atrioventricular delay purpose

## arabic_label
تأخير التوصيل بالعقدة الأذينية البطينية

## arabic_aliases


## definition
Impulse conduction through the AV node is markedly slower than through atrial muscle, the bundle of His or the Purkinje system, taking roughly 0.1 second to cross. This deliberate delay is functionally important: it allows the atria to finish contracting and complete ventricular filling before the ventricles are electrically activated, so atrial and ventricular contraction stay sequential rather than simultaneous, optimising ventricular filling and, through it, stroke volume.

## explicit_objective
State that the AV node's slow conduction delays the impulse to allow the atria to complete contraction before the ventricles are activated, and locate that delay specifically at the AV node rather than elsewhere in the conducting system.

## pitfalls
Assuming the AV delay's purpose is to protect the ventricles from a high atrial rate (that is instead the AV node's separate rate-limiting/filtering role during atrial arrhythmias) rather than its normal-rhythm purpose of sequencing atrial-before-ventricular contraction, which is what this question tests.

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
AV node conduction

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
0.45

## exam_weight_by_year
MU_Y1=0.45

## clinical_relevance
0.4

## academic_relevance
0.9

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-CVS-A275BC451FCD18

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q28: Which part of the cardiac conduction system is responsible for delaying the electrical impulses to allow complete atrial contraction? / Atrioventricular node (AVN). Q29: What is the significance of impulse delay in the atrioventricular node (AVN)? / Allows sufficient time for complete atrial contraction

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p7 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
Close in scope to Kasr 104-CPS's own pending CON-CVS-9B1C94AF064C3D (av-node.conduction-delay-function) — a candidate for a future cross-university dedup pass.

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
Contractility is the intrinsic ability of cardiac muscle to generate force and contract, independent of fibre stretch, and is raised by positive inotropic agents

## id
CON-CVS-58B94753646870

## canonical_key
cvs.physiology.contractility-definition-inotropy

## aliases
Cardiac contractility definition
Positive inotropic effect

## arabic_label
قوة انقباض عضلة القلب

## arabic_aliases


## definition
Contractility (inotropy) is the intrinsic ability of cardiac muscle to generate force and contract, set by how much calcium reaches the contractile myofilaments independent of the fibre's own resting length — this is what separates it from the Frank-Starling mechanism, where force instead depends on stretch (preload). A positive inotropic agent raises contractility by increasing intracellular calcium availability to the myofilaments, producing a stronger contraction at any given fibre length, which is why such drugs raise stroke volume without needing extra ventricular filling.

## explicit_objective
Define contractility as the intrinsic force-generating ability of cardiac muscle (calcium-availability-dependent, length-independent), and state that positive inotropic agents work by raising it.

## pitfalls
Conflating contractility with the Frank-Starling mechanism — both raise the force of contraction, but contractility does so independent of fibre length (via calcium availability), while Frank-Starling does so specifically because of increased fibre length (stretch) at a fixed contractility.

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
Cardiac contractility

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Physiology

## article_ids
ART-CVS-MU105-CONTRACTILITY-PLATEAU

## related_article_ids


## related_concept_ids
CON-CVS-948548A19D49EF

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
0.9

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-CVS-58B94753646870

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q31: What is the meaning of contractility regarding cardiac function? / The ability of the cardiac muscle to generate force and contract. Q33: How do positive inotropic drugs influence cardiac muscle? / They increase contractility

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p8 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
Close in scope to Alexandria AU-MED-105's own pending CON-CVS-859114E6FE6C90 (heart.contractility.calcium-atpase-mechanism) — a candidate for a future cross-university dedup pass.

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
Frank-Starling law: within physiological limits, a rise in end-diastolic (ventricular filling) volume raises the force of cardiac contraction

## id
CON-CVS-948548A19D49EF

## canonical_key
cvs.physiology.frank-starling-law-edv-force

## aliases
Frank-Starling law
Frank-Starling mechanism

## arabic_label
قانون فرانك-ستارلنج

## arabic_aliases


## definition
The Frank-Starling law of the heart states that, within physiological limits, the force of cardiac muscle contraction is directly related to its initial fibre length — in practice, to how much the ventricle is filled (end-diastolic volume) before it contracts. A greater diastolic fill stretches the sarcomeres closer to their optimal length for cross-bridge formation, so the heart automatically pumps out whatever volume flows in, matching output to venous return without requiring any nervous or hormonal signal.

## explicit_objective
State that, per the Frank-Starling law, an increase in end-diastolic volume (venous return/preload) raises the force of ventricular contraction (and thus stroke volume/contractility as an exam may phrase it), within physiological limits.

## pitfalls
Treating the Frank-Starling mechanism as identical to an increase in true contractility — the department's own exam key phrases the Frank-Starling response as "contractility increases," but the mechanism driving it is stretch (preload), not a calcium-availability change; the printed key still stands per rule 1, and this distinction is worth teaching alongside it.

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
Frank-Starling law

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Physiology

## article_ids
ART-CVS-MU105-CONTRACTILITY-PLATEAU

## related_article_ids


## related_concept_ids
CON-CVS-58B94753646870

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
0.5

## exam_weight_by_year
MU_Y1=0.5

## clinical_relevance
0.5

## academic_relevance
0.9

## weight_confidence
0.45

## confidence
0.85

## atomic_claim_ids
CLM-CVS-948548A19D49EF

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q32: According to the Frank-Starling law, what happens to cardiac contractility when the heart fills with more blood during diastole? / Contractility increases

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p8 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts
The exam's own phrasing calls the Frank-Starling response a rise in "contractility," which is a looser use of the term than this concept's own strict, stretch-independent definition of contractility (CON-CVS-58B94753646870); printed key stands per rule 1, conflict noted for the article's own teaching, not as a hold.

## uncertainty
Close in scope to Alexandria AU-MED-105's own pending CON-CVS-3142C436848ABD (heart.frank-starling.edv-force-relationship) — a candidate for a future cross-university dedup pass.

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
During isovolumetric contraction, all four heart valves are shut and ventricular pressure rises rapidly while ventricular volume stays constant

## id
CON-CVS-8FEA34878D341E

## canonical_key
cvs.physiology.isovolumetric-contraction-pressure-rise

## aliases
Isovolumetric contraction phase
Isovolumic contraction

## arabic_label
مرحلة الانقباض متساوي الحجم

## arabic_aliases


## definition
Isovolumetric (isovolumic) contraction is the phase immediately after the AV valves close, when the ventricle contracts as a closed chamber: both the AV valves (already shut) and the semilunar valves (not yet opened, since ventricular pressure has not yet exceeded aortic/pulmonary pressure) are closed together, so no blood enters or leaves and ventricular volume is fixed. Because the ventricle is contracting against a constant volume, all the mechanical work goes into rapidly raising ventricular pressure, which climbs steeply until it exceeds the pressure in the aorta (or pulmonary trunk) and forces the semilunar valve open, ending the phase.

## explicit_objective
State that ventricular pressure rises rapidly during isovolumetric contraction while volume stays unchanged, and that this is the one phase where all four cardiac valves are simultaneously closed.

## pitfalls
Assuming ventricular volume changes during isovolumetric contraction because pressure is changing so dramatically — by definition (isovolumetric = constant volume), volume stays fixed throughout this phase; only pressure rises.

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
0.45

## exam_weight_by_year
MU_Y1=0.45

## clinical_relevance
0.4

## academic_relevance
0.9

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
CLM-CVS-8FEA34878D341E

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q35: What happens to ventricular pressure during the isovolumetric contraction phase? / Increases rapidly

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p8 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
Close in scope to Kasr 104-CPS's own pending CON-CVS-F51E391CCECE6A (cardiac-cycle.valve-states-and-heart-sounds-by-phase) — a candidate for a future cross-university dedup pass.

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
The ascending limb of the a-wave in the atrial pressure curve is caused by atrial contraction (atrial systole)

## id
CON-CVS-6C2A38EA5B232E

## canonical_key
cvs.physiology.atrial-pressure-a-wave-atrial-contraction

## aliases
Atrial pressure a-wave
Atrial systole pressure curve

## arabic_label
الموجة (a) في منحنى ضغط الأذين

## arabic_aliases


## definition
The atrial pressure curve shows three positive waves: a, c and v. The a-wave is the first and largest, produced directly by atrial contraction (atrial systole) raising atrial pressure as the atrium squeezes its contents against the still-closed AV valve. The smaller c-wave that follows instead reflects the AV valve bulging back into the atrium at the start of ventricular systole, and the v-wave reflects atrial filling against a still-closed AV valve later in the cycle — only the a-wave's ascending limb is attributable to atrial contraction itself.

## explicit_objective
Attribute the ascending limb of the atrial pressure curve's a-wave specifically to atrial contraction, distinguishing it from the c-wave (AV valve bulging) and v-wave (passive atrial filling).

## pitfalls
Attributing the a-wave to ventricular events (ejection or relaxation) — the a-wave is specifically atrial, produced by the atrium's own contraction, before the ventricle even begins its systole.

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
Atrial pressure curve

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Physiology

## article_ids
ART-CVS-MU105-CARDIAC-CYCLE

## related_article_ids


## related_concept_ids
CON-CVS-8FEA34878D341E

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
CLM-CVS-6C2A38EA5B232E

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q36: What causes the ascending limb of a-wave in the atrial pressure curve? / Atrial contraction

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p8 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
Close in scope to Kasr 104-CPS's own pending CON-CVS-B8AFC98120E132 (atrial-pressure-curve.a-c-v-waves) — a candidate for a future cross-university dedup pass. Department book's own atrial-pressure-curve section was matched for "increased venous return" (p68-69) but not for the a/c/v-wave naming convention specifically.

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
The atrioventricular valves remain open throughout atrial diastole and the whole of ventricular diastole, including the maximum (rapid) filling phase

## id
CON-CVS-8B779861E1A486

## canonical_key
cvs.physiology.av-valves-open-during-max-filling

## aliases
AV valves open phase
Maximum filling phase

## arabic_label
انفتاح الصمامات الأذينية البطينية أثناء الامتلاء الأقصى

## arabic_aliases


## definition
The atrioventricular (mitral and tricuspid) valves open once ventricular pressure falls below atrial pressure at the start of ventricular diastole, and they stay open throughout ventricular filling — including its most active portion, the maximum (rapid) filling phase, when blood rushes from the atria into the still-relaxing ventricles down a favourable pressure gradient. They only close again once ventricular systole begins and ventricular pressure exceeds atrial pressure.

## explicit_objective
State that the AV valves are open throughout the maximum (rapid) filling phase of the cardiac cycle, one of the phases during which they remain open alongside atrial systole and reduced (slow) filling.

## pitfalls
Assuming the AV valves are closed during any part of diastole because "closed" sounds like the safer default — the AV valves are open for essentially the whole of ventricular diastole (all its filling sub-phases), closing only at the very start of the next systole.

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
Cardiac cycle valve states

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Physiology

## article_ids
ART-CVS-MU105-CARDIAC-CYCLE

## related_article_ids


## related_concept_ids
CON-CVS-8FEA34878D341E

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
0.8

## atomic_claim_ids
CLM-CVS-8B779861E1A486

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q41: During which phases of the cardiac cycle do the atrioventricular valves remain open? / Maximum filling phase

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p9 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
Close in scope to Kasr 104-CPS's own pending CON-CVS-F51E391CCECE6A (cardiac-cycle.valve-states-and-heart-sounds-by-phase), the same sibling concept as CON-CVS-8FEA34878D341E above — a candidate for a future cross-university dedup pass.

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
Cardiac reserve is the ability of the heart to raise its output above the resting baseline in response to physiological demand

## id
CON-CVS-3732E943D2A4D6

## canonical_key
cvs.physiology.cardiac-reserve-definition

## aliases
Cardiac reserve
Cardiac output reserve

## arabic_label
الاحتياطي القلبي

## arabic_aliases


## definition
Cardiac reserve is the maximum percentage by which cardiac output can rise above its resting level, drawn on during exercise or other physiological stress. It has two contributing components: heart-rate reserve (the span from a resting rate of about 75/min up to a maximal rate around 220 minus age) and stroke-volume reserve (raised both by increasing end-diastolic volume through the Frank-Starling mechanism and by lowering end-systolic volume through positive inotropy). A healthy individual has substantial cardiac reserve; a failing heart's reserve is markedly reduced, which is why cardiac reserve is used clinically as an indicator of cardiovascular fitness.

## explicit_objective
Define cardiac reserve as the heart's ability to raise output above resting baseline in response to physiological demand, and name heart-rate and stroke-volume reserve as its two components.

## pitfalls
Confusing cardiac reserve (the capacity to increase output ABOVE a resting baseline) with cardiac output itself (the resting or current output value) — reserve is specifically about the available headroom, not the baseline value.

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
Cardiac reserve

## nanotopic


## modules
MU-MED105

## module_subject
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Physiology

## article_ids
ART-CVS-MU105-VENOUS-RETURN-RESERVE

## related_article_ids


## related_concept_ids
CON-CVS-58B94753646870

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
0.9

## atomic_claim_ids
CLM-CVS-3732E943D2A4D6

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Q44: What is cardiac reserve? / The ability of the heart to increase its output above baseline levels in response to physiological demands

## exam_signal
mu_9ac9f79f9ed25404b19b | paper | | p10 | MU-MED105

## merge_ids
[clear]

## rejected_merge_candidate_ids


## conflicts


## uncertainty
Close in scope to Kasr 104-CPS's own pending CON-CVS-A99309543A270D (cardiac-reserve.heart-rate-and-stroke-volume-reserve) — a candidate for a future cross-university dedup pass. This department book's own text (p85-86) matches this concept's definition almost verbatim, unusually strong evidence for a MED105-minted concept.

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

## module_subject
Afterload
MU-MED105 > 00 Module-wide > 06 EOM Exams > CVS End Module 43 > Physiology

## field_notes
mu: Tested as "CVS End Module 43.pdf" Q42, "Which one of the following statements regarding afterload is true?" (answer: Afterload is primarily influenced by systemic vascular resistance and pulmonary vascular resistance), yellow-highlight key, rendered p9. Sparse update only: this concept is already LIVE (server/data/medical-library-v1.json) with its own article ART-CVS-CARDIAC-OUTPUT, which already teaches afterload's SVR/PVR determinants; no gate/simulate dependency file needed since gate reads live state directly.
