<!--
  O6U-IPA-107 -- twenty-four new concepts, minted after a real search-before-mint pass
  (00-START-HERE.md §4: shortest distinctive word first, then synonym; find-existing.mjs
  against live state + every docs/*-Source-Imports pending folder, plus a direct grep of
  Kasr 108-INT-concepts-pathology.md, 104-CPS-*.md, 208-INT-concepts.md, and both ASU-INF
  concept files, per the dispatch's steer toward those as likely overlaps).

  That search found almost no overlap: 108-INT-concepts-pathology.md covers cell injury/
  adaptation/accumulations, a different general-pathology chapter than hemodynamics,
  infectious pathology or neoplasia; 104-CPS's files are anatomy/physiology/histology, not
  pathology; both ASU-INF files are microbiology (organisms/culture media), not the
  pathology of specific diseases. The one genuine hit, cellular anaplasia, is filed
  separately (concept/O6U-IPA-107-live-overlay-concepts.md is not needed -- it is pending,
  not live; see pending-live/O6U-IPA-107-overlay-concepts.md). This corpus's general-
  pathology hemodynamics/neoplasia/infectious-disease content is a genuinely under-covered
  area, unlike the heavy 101-ISK histology overlap the IBS-IBF and IHI-103 clusters found.

  Several concepts here deliberately pair two printed T/F facts that are the same exam
  question asked from opposite directions (e.g. dysplasia vs metaplasia, choristoma vs
  hamartoma, congestion vs hyperemia) -- one concept, two questions, matching how the source
  book itself tests the distinction.

  atomic_claim_ids is left blank with a field_notes reason on every record: this PDF is not
  in the shared corpus extraction index, so no citable src_ claim exists yet. An S5 evidence
  pass is flagged as follow-up work. Arabic fields and §4 relationship discovery are
  likewise deferred, per field_notes on each record.
-->

# Item

## id
CON-CVS-49A221CF77C999

## label
Infarct colour follows tissue architecture: red where blood can pool back in, pale/white where it cannot

## canonical_key
infarction.color-depends-on-tissue-and-supply

## definition
An infarct's gross colour is not random: it follows the tissue's vascular architecture. Red
(haemorrhagic) infarction occurs in loose, spongy tissues with a dual or collateral blood
supply -- classically the lung -- where blood re-enters the necrotic zone from the second
supply or from venous back-flow. Pale (white/anaemic) infarction occurs in solid organs
supplied by a single end-artery with no effective collateral -- classically the heart,
kidney and spleen -- so no blood can re-enter the dead zone once the single supply is cut.

## explicit_objective
State which tissue architecture produces a red infarct (loose, dual-supplied, e.g. lung) and
which produces a pale infarct (solid, end-arterial, e.g. heart/kidney/spleen).

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-INFARCTION-AND-VASCULAR-CHANGE

## learner_years
1

## universities
o6u

## blueprint_weight
0.5

## exam_weight_by_year
O6U_Y1=0.7

## clinical_relevance
0.5

## academic_relevance
0.8

## module_subject
O6U-IPA-107 > General Pathology > Hemodynamic disorders

## exam_signal
src_f411749e2fd19154b7bc | paper | | p246,248 | O6U-IPA-107

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 1 (p246): "red infarction occurs in loose tissues such as the lung which allow blood to
collect in infarct zone" (true). T/F 37 (p248): "white infarction occurs in loose tissues
such as lung which allow blood to collect in infarct zone" (false). T/F 9 (p246): "pale
infarction occurs in: arterial occlusion in solid organs with end arterial occlusion (heart,
kidney and spleen)" (true).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: Pathology Q Bank.pdf is not in the shared corpus extraction index; no
citable claim exists yet. S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: No verified live O6U-IPA-107 module id supplied yet; left blank pending Academic
Setup import.

## topic
General Pathology
## subtopic
Hemodynamic disorders
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
Red versus pale infarction
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Assuming "loose tissue" always means red infarct regardless of supply, or that "solid organ"
always means pale -- the deciding factor is whether a second blood source can re-enter the
dead zone, not tissue firmness alone.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-CVS-F5FF8179E86A7C

## label
Edema is an excessive accumulation of fluid in interstitial tissue or body cavities

## canonical_key
edema.definition-interstitial-fluid-accumulation

## definition
Edema is defined as an increased volume of fluid in the interstitial tissue spaces, or an
excessive accumulation of fluid within a body cavity (an effusion). It is a sign of an
underlying imbalance in one of the forces governing fluid movement across the capillary
wall, not a disease in itself.

## explicit_objective
Define edema as excess interstitial fluid or an excessive body-cavity fluid accumulation.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-EDEMA-GANGRENE-AND-VASCULAR-EFFECTS

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.4

## academic_relevance
0.65

## module_subject
O6U-IPA-107 > General Pathology > Hemodynamic disorders

## exam_signal
src_f411749e2fd19154b7bc | paper | | p246 | O6U-IPA-107

## weight_confidence
0.4

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 2 (p246): "edema is increased fluid in interstitial tissue spaces or it is a fluid
accumulation in body cavities in excessive amounts" (true).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Hemodynamic disorders
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Restricting "edema" to interstitial spaces only -- a body-cavity fluid excess (ascites,
hydrothorax) is also edema by this definition, just given its own cavity-specific name.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-CVS-ECFFA68BCE760A

## label
Congestion is a passive process from impaired venous drainage; hyperemia is an active process from increased arterial inflow

## canonical_key
congestion.passive-vs-hyperemia-active

## definition
Congestion and hyperemia both describe an organ with excess blood, but by opposite
mechanisms. Congestion is a passive process: veins and capillaries dilate because venous
drainage is impaired, so blood backs up. Hyperemia is an active process: arterioles dilate,
increasing arterial inflow, so more blood is delivered. The two are commonly swapped in
exam distractors by describing one mechanism and naming the other term.

## explicit_objective
Distinguish congestion (passive, impaired venous drainage) from hyperemia (active,
increased arterial inflow).

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-INFARCTION-AND-VASCULAR-CHANGE

## learner_years
1

## universities
o6u

## blueprint_weight
0.5

## exam_weight_by_year
O6U_Y1=0.72

## clinical_relevance
0.4

## academic_relevance
0.75

## module_subject
O6U-IPA-107 > General Pathology > Hemodynamic disorders

## exam_signal
src_f411749e2fd19154b7bc | paper | | p246-247 | O6U-IPA-107

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 4 (p246): "dilatation of veins and capillaries due to impaired venous drainage referred
to congestion" (true). T/F 13 (p247): "hyperemia is an active process resulting from
increased arterial blood inflow because of arteriolar dilatation" (true).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Hemodynamic disorders
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
Active hyperemia versus passive congestion
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Calling any organ with excess blood "congested" regardless of mechanism -- an actively
inflamed, arteriolar-dilated organ (e.g. early inflammation) is hyperemic, not congested.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-CVS-5F3E4E882CA4F4

## label
A deep leg vein thromboembolus commonly lodges in a peripheral pulmonary arterial branch

## canonical_key
thromboembolism.deep-leg-vein-to-pulmonary-artery

## definition
A thromboembolus arising in the deep veins of the legs commonly detaches, travels through
the venous system and right heart, and lodges in a peripheral branch of the pulmonary
artery -- a pulmonary embolism. In about 95% of cases, pulmonary emboli originate from
thrombi of the deep leg veins specifically, making deep vein thrombosis the dominant source
to screen for when a pulmonary embolism is found.

## explicit_objective
Trace a deep-leg-vein thromboembolus to its typical destination, a peripheral pulmonary
arterial branch, and state that ~95% of pulmonary emboli originate this way.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-THROMBOSIS-AND-EMBOLISM

## learner_years
1

## universities
o6u

## blueprint_weight
0.5

## exam_weight_by_year
O6U_Y1=0.75

## clinical_relevance
0.6

## academic_relevance
0.75

## module_subject
O6U-IPA-107 > General Pathology > Hemodynamic disorders

## exam_signal
src_f411749e2fd19154b7bc | paper | | p246-247 | O6U-IPA-107

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 6 (p246): "A thromboembolus from the venous circulation usually arising in large leg
veins and lodge in a peripheral pulmonary arterial branch" (true). T/F 18 (p247): "in 95% of
cases, emboli originate from thrombi of deep leg veins" (true).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Hemodynamic disorders
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
Pulmonary embolism source
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Assuming an equal split of embolic sources -- deep leg veins so dominate (~95%) that any
other source (pelvic veins, right heart) is the exception, not the rule.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-CVS-2918F285001F14

## label
Chronic hepatic venous congestion gives the liver a nutmeg-like cut surface

## canonical_key
liver.chronic-congestion-nutmeg-appearance

## definition
In chronic venous congestion of the liver -- most often from right-sided heart failure --
the cut surface shows a characteristic mottled "nutmeg" appearance: congested, dark-red
centrilobular zones alternating with paler, less-congested periportal zones, resembling the
cut surface of a nutmeg seed.

## explicit_objective
Identify chronic hepatic venous congestion by its nutmeg-pattern cut surface.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-EDEMA-GANGRENE-AND-VASCULAR-EFFECTS

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.65

## clinical_relevance
0.5

## academic_relevance
0.7

## module_subject
O6U-IPA-107 > General Pathology > Hemodynamic disorders

## exam_signal
src_f411749e2fd19154b7bc | paper | | p247 | O6U-IPA-107

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 29 (p247): "in chronic venous congestion of the liver, the cut surface shows
characteristic nutmeg appearance" (true).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Hemodynamic disorders
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
Nutmeg liver
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Confusing the nutmeg pattern with a diffuse, uniform change -- the mottled centrilobular/
periportal contrast is the specific feature, not simple diffuse liver congestion.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-CVS-979C5170FEF762

## label
Gangrene is necrosis with superadded bacterial putrefaction, classically by clostridia

## canonical_key
gangrene.necrosis-with-putrefaction

## definition
Gangrene is necrotic tissue with superadded putrefaction: bacterial breakdown of the dead
tissue, classically by organisms of the clostridial group, that produces gas and toxins.
This distinguishes gangrene from plain necrosis, which is tissue death without that
secondary bacterial breakdown.

## explicit_objective
Define gangrene as necrosis with superadded bacterial putrefaction (classically
clostridial), producing gas and toxins.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-EDEMA-GANGRENE-AND-VASCULAR-EFFECTS

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.65

## clinical_relevance
0.55

## academic_relevance
0.7

## module_subject
O6U-IPA-107 > General Pathology > Hemodynamic disorders

## exam_signal
src_f411749e2fd19154b7bc | paper | | p247 | O6U-IPA-107

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 21 (p247): "gangrene is a necrosis with superadded putrefaction caused by bacterial
activity (of clostridia group) with the production of gas and toxins" (true).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Hemodynamic disorders
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
Gas gangrene mechanism
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Treating "gangrene" and "necrosis" as interchangeable -- gangrene specifically requires the
added bacterial putrefaction step; sterile necrosis is not gangrene.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-CVS-0BA1BF62606F4C

## label
Four primary Starling forces determine fluid movement across the capillary membrane

## canonical_key
edema.starling-forces-four-determinants

## definition
Fluid movement across the capillary wall is governed by four primary opposing forces,
collectively called the Starling forces: capillary hydrostatic pressure and interstitial
colloid osmotic pressure (both favouring fluid out of the vessel), and plasma colloid
osmotic pressure and interstitial hydrostatic pressure (both favouring fluid back into the
vessel). An imbalance among these four forces is the shared mechanism behind most causes of
edema.

## explicit_objective
Name the four Starling forces that determine capillary fluid movement.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-THROMBOSIS-AND-EMBOLISM

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.68

## clinical_relevance
0.45

## academic_relevance
0.75

## module_subject
O6U-IPA-107 > General Pathology > Hemodynamic disorders

## exam_signal
src_f411749e2fd19154b7bc | paper | | p248 | O6U-IPA-107

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 35 (p248): "there are four primary forces that determine fluid movement across the
capillary membrane are called starling forces" (true).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Hemodynamic disorders
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
Starling forces
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Naming only hydrostatic and osmotic pressure without specifying both sides of the
capillary wall -- all four forces (two per side) are needed for the complete picture.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-CVS-3E3878FDC8135C

## label
Virchow's triad names the three factors that predispose to thrombus formation

## canonical_key
thrombosis.virchows-triad-three-factors

## definition
Virchow's triad is the classic set of three factors that predispose to thrombus formation:
endothelial injury, abnormal blood flow (stasis or turbulence), and hypercoagulability of
the blood. Any one factor alone can tip the balance toward thrombosis, but they commonly act
together.

## explicit_objective
Name Virchow's triad as the three predisposing factors for thrombosis: endothelial injury,
abnormal flow, and hypercoagulability.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-THROMBOSIS-AND-EMBOLISM

## learner_years
1

## universities
o6u

## blueprint_weight
0.5

## exam_weight_by_year
O6U_Y1=0.75

## clinical_relevance
0.55

## academic_relevance
0.8

## module_subject
O6U-IPA-107 > General Pathology > Hemodynamic disorders

## exam_signal
src_f411749e2fd19154b7bc | paper | | p248 | O6U-IPA-107

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 36 (p248): "there are three factors that predispose to thrombus formation are called
virchow's triad" (true).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Hemodynamic disorders
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
Virchow's triad
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Listing only two of the three factors, or substituting "vessel wall damage" and
"endothelial injury" as if they were separate items rather than the same factor.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-9E7B13DCA0E60B

## label
Dysplasia is disordered maturation within one tissue type; metaplasia is replacement by a different differentiated tissue

## canonical_key
growth.dysplasia-versus-metaplasia-definitions

## definition
Dysplasia and metaplasia are both disorders of cell growth, but they name different
changes. Dysplasia is a disordered pattern of growth and maturation within a single tissue
type: loss of uniformity of individual cells and loss of their architectural orientation,
without the tissue converting to a different type. Metaplasia is the replacement of one
differentiated tissue type by another differentiated tissue type, usually a reversible
adaptive response to chronic irritation. Confusing the two -- describing metaplasia's
tissue-replacement definition while naming it dysplasia, or vice versa -- is a common exam
trap.

## explicit_objective
Distinguish dysplasia (disordered growth within one tissue type) from metaplasia
(replacement by a different differentiated tissue type).

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-NEOPLASIA-BASICS

## learner_years
1

## universities
o6u

## blueprint_weight
0.5

## exam_weight_by_year
O6U_Y1=0.75

## clinical_relevance
0.4

## academic_relevance
0.85

## module_subject
O6U-IPA-107 > General Pathology > Neoplasia

## exam_signal
src_f411749e2fd19154b7bc | paper | | p399 | O6U-IPA-107

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 1 (p399): "Dysplasia is replacement of one differentiated tissue by another
differentiated tissue" (false -- this is metaplasia's definition). T/F 12 (p399):
"Metaplasia is disorder of cell growth associated with epithelium loss in uniformity of
individual cells as well as loss of architectural orientation" (false -- this is
dysplasia's definition).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: A near-neighbour "disorderedgrowth.definitions.hyperplasia-hypertrophy-
atrophy-dysplasia" concept exists in pending docs/Kasr-Source-Imports/concept/208-INT-
concepts.md (a different specific pairing, hyperplasia/hypertrophy/atrophy/dysplasia, not
the dysplasia/metaplasia swap tested here) -- not reused, flagged for an S4 relationship
edge instead.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Neoplasia
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
Dysplasia versus metaplasia
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Reading either definition and matching it to the term that sounds most similar rather than
the term it actually describes -- the exam trap here is precisely that swap.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-1E967D0329720F

## label
A choristoma is normal tissue in an abnormal site; a hamartoma is disorganised native tissue in its normal site

## canonical_key
tissue.choristoma-versus-hamartoma

## definition
Choristoma and hamartoma are both benign developmental tissue anomalies, but at opposite
sites. A choristoma is a mass of histologically normal tissue growing in an abnormal
(ectopic) location. A hamartoma is a disorganised, tumour-like overgrowth of tissue elements
native to the site it grows in -- normal cell types, present at their normal site, but in an
abnormal arrangement and proportion.

## explicit_objective
Distinguish choristoma (normal tissue, abnormal site) from hamartoma (disorganised tissue,
normal site).

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-NEOPLASIA-BASICS

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.68

## clinical_relevance
0.3

## academic_relevance
0.75

## module_subject
O6U-IPA-107 > General Pathology > Neoplasia

## exam_signal
src_f411749e2fd19154b7bc | paper | | p399 | O6U-IPA-107

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 2 (p399): "Choristoma is a normal tissue in abnormal site" (true). T/F 11 (p399):
"Hamartoma is normal tissue in abnormal site" (false -- this is choristoma's definition).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: A pending Helwan hamartoma concept (docs/Helwan-Source-Imports/concept/
HU-GIT-301-pathology-concepts.md) covers a specific colonic-polyp example, not the general
choristoma/hamartoma site-distinction tested here -- not reused. S4 relationship pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Neoplasia
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
Choristoma versus hamartoma
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Swapping the two definitions -- both are benign developmental anomalies of normal tissue,
so the only distinguishing question is "right tissue, wrong site" (choristoma) versus
"right site, disorganised tissue" (hamartoma).
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-BF1519F5E21B71

## label
Grading expresses a tumor's degree of differentiation; staging expresses its extent of spread

## canonical_key
tumor.staging-versus-grading

## definition
Grading and staging are two separate axes for describing a malignant tumour, and they are
commonly swapped in exam distractors. Grading denotes the tumour's level (degree) of
differentiation -- how closely its cells resemble the normal tissue of origin. Staging
denotes the tumour's extent of spread -- typically captured by a system such as TNM (tumour
size/extent, nodal involvement, distant metastasis).

## explicit_objective
State that grading measures differentiation and staging measures extent of spread, not the
reverse.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-NEOPLASIA-BASICS

## learner_years
1

## universities
o6u

## blueprint_weight
0.5

## exam_weight_by_year
O6U_Y1=0.75

## clinical_relevance
0.55

## academic_relevance
0.8

## module_subject
O6U-IPA-107 > General Pathology > Neoplasia

## exam_signal
src_f411749e2fd19154b7bc | paper | | p399 | O6U-IPA-107

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 8 (p399): "Staging denotes the level of differentiation whereas grading expresses the
extent of tumor spread" (false -- the two are swapped from their real definitions).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Neoplasia
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
Grading versus staging
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Reading the statement quickly and pattern-matching "staging...grading" as correct because
both real definitions appear somewhere in the sentence -- check which word is paired with
which definition.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-E4E893693D2285

## label
Malignant tumors typically grow rapidly; benign tumors typically grow slowly

## canonical_key
tumor.benign-slow-malignant-rapid-growth

## definition
As a general rule, malignant tumours grow rapidly, reflecting their higher mitotic rate and
loss of normal growth control, while benign tumours grow slowly over months to years. This
is a general tendency rather than an absolute law -- some benign tumours (e.g. hormone-
sensitive fibroids in pregnancy) can grow quickly, and some low-grade malignancies grow
slowly -- but as a teaching generalisation it holds and is commonly tested with its
direction reversed.

## explicit_objective
State that malignant tumours generally grow rapidly and benign tumours generally grow
slowly, not the reverse.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-NEOPLASIA-BASICS

## learner_years
1

## universities
o6u

## blueprint_weight
0.45

## exam_weight_by_year
O6U_Y1=0.68

## clinical_relevance
0.4

## academic_relevance
0.7

## module_subject
O6U-IPA-107 > General Pathology > Neoplasia

## exam_signal
src_f411749e2fd19154b7bc | paper | | p399 | O6U-IPA-107

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 20 (p399): "Most benign tumors grow rapidly whereas most malignant tumors grow slowly"
(false -- the direction is reversed).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Neoplasia
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Treating this as an absolute rule rather than a general tendency -- exceptions exist on both
sides, but the exam-tested default direction is malignant=fast, benign=slow.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-FND-13A086586F044D

## label
A carcinoma is a malignant tumor of epithelial cell origin

## canonical_key
carcinoma.malignant-epithelial-tumor-definition

## definition
A carcinoma is, by definition, a malignant neoplasm of epithelial cell origin. This is what
separates it terminologically from a sarcoma (malignant tumour of mesenchymal/connective-
tissue origin) and from a papilloma or adenoma (benign tumours of epithelial origin).

## explicit_objective
Define carcinoma as a malignant epithelial-cell-origin tumour, distinct from benign
epithelial tumours and from mesenchymal-origin sarcomas.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-NEOPLASIA-BASICS

## learner_years
1

## universities
o6u

## blueprint_weight
0.5

## exam_weight_by_year
O6U_Y1=0.75

## clinical_relevance
0.5

## academic_relevance
0.8

## module_subject
O6U-IPA-107 > General Pathology > Neoplasia

## exam_signal
src_f411749e2fd19154b7bc | paper | | p399 | O6U-IPA-107

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 15 (p399): "Malignant neoplasms of epithelial cell origin are called carcinomas" (true).
T/F 19 (p399): "Carcinoma is a benign epithelial tumor derived from surface epithelium"
(false -- carcinoma is malignant, not benign).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Neoplasia
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Reading "epithelial tumour derived from surface epithelium" as automatically correct
because the tissue-of-origin clause is right -- the benign/malignant qualifier is the part
being tested.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---
# Item

## id
CON-INF-3EAE8B8164344E

## label
Portal hypertension from hepatic bilharziasis can predispose to pulmonary bilharziasis, and to hypersplenism

## canonical_key
schistosomiasis.portal-hypertension-pulmonary-complication

## definition
Hepatic schistosomiasis (bilharziasis) causes periportal ("pipe-stem") fibrosis and portal
hypertension. Two complications follow from the portal hypertension itself: portosystemic
venous shunting can carry schistosome ova to the lungs, predisposing to pulmonary
bilharziasis; and splenomegaly from portal hypertension can progress to hypersplenism
(excess destruction of blood cells by the enlarged spleen).

## explicit_objective
State that hepatic bilharziasis's portal hypertension can predispose to both pulmonary
bilharziasis (via portosystemic shunting) and hypersplenism (via splenomegaly).

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-BILHARZIAL-PATHOLOGY

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.5

## academic_relevance
0.65

## module_subject
O6U-IPA-107 > General Pathology > Infectious and parasitic pathology

## exam_signal
src_f411749e2fd19154b7bc | paper | | p279 | O6U-IPA-107

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 1 (p279): "portal hypertension complicating hepatic bilharziasis can predispose to
pulmonary bilharziasis" (true). T/F 4 (p279): "hypersplenism is a complication of hepatic
bilharzial fibrosis" (true).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Infectious and parasitic pathology
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
CON-INF-641799738EDC08
## modules
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Treating pulmonary bilharziasis as a direct lung infection route -- it reaches the lung
specifically via the portosystemic shunt that portal hypertension opens up.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-INF-8716CFFBB35337

## label
Bilharzial bladder cancer is classically squamous cell carcinoma, and sandy patches are more common in the bladder than the colon

## canonical_key
schistosomiasis.bladder-cancer-squamous-type

## definition
Chronic bilharzial cystitis is classically associated with squamous cell carcinoma of the
bladder, not adenocarcinoma. "Sandy patches" -- pale, granular egg-deposit plaques -- are a
gross feature of urinary bladder bilharziasis and are seen there more often than in
bilharzial colitis.

## explicit_objective
State that bilharzial bladder cancer is classically squamous cell (not adenocarcinoma), and
that sandy patches are more characteristic of the bladder than the colon.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-BILHARZIAL-PATHOLOGY

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.55

## academic_relevance
0.65

## module_subject
O6U-IPA-107 > General Pathology > Infectious and parasitic pathology

## exam_signal
src_f411749e2fd19154b7bc | paper | | p279 | O6U-IPA-107

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 5 (p279): "adenocardcinoma is a complication of bilharzial colitis" (false -- squamous
cell carcinoma is the classic bilharzial malignancy). T/F 6 (p279): "sandy patches are more
common in colon than in urinary bladder" (false -- the reverse is true).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Infectious and parasitic pathology
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Defaulting to "adenocarcinoma" for any GI-tract cancer question -- bilharzial malignancy is
the standard exception, favouring squamous histology.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-INF-A851E2C723C18C

## label
Cystitis glandularis is a precancerous lesion of the bladder; cystitis cystica is not

## canonical_key
cystitis.glandularis-versus-cystica-precancerous

## definition
Cystitis glandularis and cystitis cystica are both metaplastic changes of the bladder
urothelium (von Brunn's nests undergoing glandular or cystic change respectively), but only
cystitis glandularis (specifically its intestinal-type variant) is considered a precancerous
lesion, carrying an association with subsequent adenocarcinoma. Cystitis cystica is
considered a benign metaplastic change without that premalignant association.

## explicit_objective
Distinguish cystitis glandularis (precancerous) from cystitis cystica (not precancerous).

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-BILHARZIAL-PATHOLOGY

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.5

## academic_relevance
0.65

## module_subject
O6U-IPA-107 > General Pathology > Infectious and parasitic pathology

## exam_signal
src_f411749e2fd19154b7bc | paper | | p279 | O6U-IPA-107

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 7 (p279): "cystitis glandularis is a precancerous lesion" (true). T/F 8 (p279):
"cystitis cystica is a precancerous lesion" (false).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Infectious and parasitic pathology
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Assuming both "cystitis X" metaplastic variants carry the same cancer risk because they
sound like a matched pair -- only the glandularis variant is flagged precancerous.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-INF-641799738EDC08

## label
Liver cirrhosis is not a recognised complication of hepatic schistosomiasis

## canonical_key
schistosomiasis.hepatic-fibrosis-not-true-cirrhosis

## definition
Hepatic schistosomiasis produces periportal ("pipe-stem" or "Symmers'") fibrosis, a
presinusoidal pattern of fibrosis around portal tracts. This is not true cirrhosis: it
lacks the diffuse nodular regeneration that defines cirrhosis, and the schistosomal fibrosis
pattern is a distinct entity taught specifically to be distinguished from cirrhosis, not
classed as a form of it.

## explicit_objective
State that liver cirrhosis is not a recognised complication of hepatic schistosomiasis --
the schistosomal fibrosis pattern (periportal/pipe-stem) is distinct from cirrhosis.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-BILHARZIAL-PATHOLOGY

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.5

## academic_relevance
0.65

## module_subject
O6U-IPA-107 > General Pathology > Infectious and parasitic pathology

## exam_signal
src_f411749e2fd19154b7bc | paper | | p279 | O6U-IPA-107

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 3 (p279): "Liver cirrhosis is a complication of hepatic schistosomiasis" (false).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Infectious and parasitic pathology
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
CON-INF-3EAE8B8164344E
## modules
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Assuming any chronic liver fibrosis qualifies as "cirrhosis" -- the schistosomal pattern is
specifically taught as a named exception that does not meet the cirrhosis definition.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-INF-73281250ACA2F6

## label
The bladder trigone is the commonest site affected in bilharzial cystitis

## canonical_key
schistosomiasis.bladder-trigone-commonest-site

## definition
Within the urinary bladder, bilharzial cystitis most commonly affects the trigone -- the
triangular area between the two ureteric orifices and the internal urethral orifice.

## explicit_objective
State that the bladder trigone is the commonest site affected in bilharzial cystitis.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-BILHARZIAL-PATHOLOGY

## learner_years
1

## universities
o6u

## blueprint_weight
0.35

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.5

## academic_relevance
0.6

## module_subject
O6U-IPA-107 > General Pathology > Infectious and parasitic pathology

## exam_signal
src_f411749e2fd19154b7bc | paper | | p279 | O6U-IPA-107

## weight_confidence
0.3

## confidence
0.6

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 2 (p279): "the trigone is the commonest site affected in bilharzial cystitis" (true --
the source itself annotates this item "مش فالكتاب", i.e. "not in the book", flagging that
whoever compiled this bank could not find it in their own reference textbook; the printed
answer stands per the printed-key-stands rule, but confidence is lower than the other items
in this cluster and it is flagged here for a second look).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.
keyConfidence: source annotates this item "مش فالكتاب" ("not in the book") -- printed key
kept per the printed-key-stands rule, but flagged lower-confidence; textbook-external
pathology teaching does support trigone predominance in bilharzial cystitis (mirroring
schistosome egg deposition patterns near the ureteric orifices), so the printed answer is
independently defensible, not merely accepted on the bank's authority alone.

## topic
General Pathology
## subtopic
Infectious and parasitic pathology
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Treating the "not in the book" annotation as an error flag on the answer itself -- it flags
the compiler's own reference gap, not a printed-key conflict; the answer is kept.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-INF-A22200D7584A60

## label
Lepromatous leprosy lacks T-cell mediated immunity, and its lepromin test is negative, unlike tuberculoid leprosy

## canonical_key
leprosy.lepromatous-versus-tuberculoid-immunology

## definition
Leprosy's clinical spectrum is set by the host's cell-mediated immune response. Lepromatous
leprosy is the pole with poor/absent T-cell mediated immunity against M. leprae, permitting
widespread bacillary proliferation; its lepromin skin test is negative, reflecting that
absent cellular response. Tuberculoid leprosy is the opposite pole, with a strong T-cell
response that limits the disease (and gives it, not lepromatous leprosy, a positive lepromin
test) but also causes more local tissue damage from that same immune reaction.

## explicit_objective
State that lepromatous leprosy lacks T-cell mediated immunity and gives a negative lepromin
test, the opposite of tuberculoid leprosy.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-LEPROSY-AND-SYPHILIS

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.62

## clinical_relevance
0.5

## academic_relevance
0.7

## module_subject
O6U-IPA-107 > General Pathology > Infectious and parasitic pathology

## exam_signal
src_f411749e2fd19154b7bc | paper | | p280,299 | O6U-IPA-107

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 3 (p280): "patients with lepromatous leprosy lack T-cell mediated immunity" (true). T/F
4 (p280): "lepromin test is strongly positive In lepromatous leprosy" (false -- it is
negative). T/F 3 (p299): "Maculoanaesthetic leprosy (tuberculoid leprosy) is the most severe
form of leprosy" (false -- lepromatous is the more severe/disseminated form).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Infectious and parasitic pathology
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
Leprosy immunological spectrum
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Assuming "lepromatous" (sounds more organised/contained) is the milder form -- it is in
fact the more severe, immunologically anergic pole; tuberculoid is the milder, more immune-
competent pole.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-INF-C5B905759154B7

## label
The chancre is the primary-syphilis lesion, and tertiary syphilis occurs years, not weeks, later

## canonical_key
syphilis.stage-timeline-chancre-is-primary

## definition
Syphilis progresses through primary, secondary and tertiary stages on a timeline the exam
tests directly. The chancre -- a painless, firm, indurated ulcer -- is the lesion of primary
syphilis, appearing at the inoculation site, not of secondary syphilis. Tertiary syphilis
follows years (not the 2-12 weeks that separates primary from secondary disease) after the
initial infection, once the untreated disease has had time to progress through its latent
period.

## explicit_objective
State that the chancre is a primary-syphilis lesion and that tertiary syphilis occurs years
(not weeks) after infection.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-LEPROSY-AND-SYPHILIS

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.62

## clinical_relevance
0.5

## academic_relevance
0.7

## module_subject
O6U-IPA-107 > General Pathology > Infectious and parasitic pathology

## exam_signal
src_f411749e2fd19154b7bc | paper | | p280 | O6U-IPA-107

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 5 (p280): "chance appears as erythematous, firm, painless slightly elevated papule or
nodule in secondary syphilis" (false -- the chancre is a primary-syphilis lesion). T/F 7
(p280): "tertiary syphilis occurs after 2-12 weeks" (false -- it occurs years later).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Infectious and parasitic pathology
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
CON-INF-910CE9FE797088
## modules
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Confusing the chancre (primary) with the diffuse maculopapular rash of secondary syphilis --
both can appear as papular lesions, but chancre is specifically the primary inoculation-site
lesion.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-INF-910CE9FE797088

## label
Tertiary syphilis produces gummas, and its aortitis classically affects the ascending aorta and aortic arch

## canonical_key
syphilis.tertiary-gumma-and-aortic-complications

## definition
Tertiary syphilis has two classic manifestations tested together: syphilitic gummas
(localised granulomatous lesions with central necrosis) occur in this stage, and can affect
sites such as the tongue (where syphilitic glossitis/gummas are considered precancerous);
and syphilitic aortitis, which classically damages the vasa vasorum of the ascending aorta
and aortic arch (the thoracic aorta), predisposing to aneurysm there.

## explicit_objective
State that tertiary syphilis produces gummas (including precancerous tongue lesions) and
aortitis classically affecting the ascending aorta and arch.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-LEPROSY-AND-SYPHILIS

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.62

## clinical_relevance
0.55

## academic_relevance
0.7

## module_subject
O6U-IPA-107 > General Pathology > Infectious and parasitic pathology

## exam_signal
src_f411749e2fd19154b7bc | paper | | p280,299 | O6U-IPA-107

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 6 (p280): "syphilis causes aneurysm of the ascending aorta and aortic arch [thoracic
aorta]" (true). T/F 1 (p299): "Syphilitic gummas occur in tertiary syphilis" (true). T/F 2
(p299): "Syphilitic lesions of the tongue are precancerous" (true).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Infectious and parasitic pathology
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
CON-INF-C5B905759154B7
## modules
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Assuming syphilitic aortitis affects the abdominal aorta like atherosclerotic aneurysms
typically do -- syphilitic aortitis is classically a thoracic (ascending aorta/arch)
disease, the opposite site emphasis from atherosclerotic aneurysms.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-INF-1F74C19C36955C

## label
Actinomycosis is a bacterial disease, not a fungal one, despite its name and branching filaments

## canonical_key
actinomycosis.bacterial-not-fungal-disease

## definition
Actinomycosis is caused by Actinomyces species, filamentous, branching, Gram-positive
bacteria (not fungi) that are part of normal oral/GI flora and cause disease only when
introduced into deeper tissue, typically after mucosal injury. Its historical classification
alongside fungal diseases came from the organism's fungus-like branching filamentous growth
(sulfur granules), not from any true fungal biology.

## explicit_objective
State that actinomycosis is a bacterial (not fungal) infection, despite its fungus-like
branching-filament morphology.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-LEPROSY-AND-SYPHILIS

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.45

## academic_relevance
0.65

## module_subject
O6U-IPA-107 > General Pathology > Infectious and parasitic pathology

## exam_signal
src_f411749e2fd19154b7bc | paper | | p299 | O6U-IPA-107

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 4 (p299): "Actionmyocosis [sic, Actinomycosis] is a rare infectious fungus disease
caused by actionmyces [sic, Actinomyces] species" (false -- it is bacterial, not fungal).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: A live "Actinomycosis as endogenous granulomatous infection with sulfur
granules" concept (CON-INF-E5F0904F30665E) exists but states a different specific claim
(the granulomatous/sulfur-granule presentation, not the bacterial-versus-fungal
classification tested here) -- not reused as the main concept for this fact, flagged for an
S4 relationship edge instead.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Infectious and parasitic pathology
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
CON-INF-E5F0904F30665E
## modules
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Classifying actinomycosis as fungal purely from its branching-filament, "ray fungus"-style
histological appearance -- the organism itself is bacterial.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-INF-0B392E2FB3A222

## label
Toxemia is circulating toxins in the blood; bacteremia is the mere presence of bacteria, not their multiplication

## canonical_key
bacteremia.versus-septicemia-versus-toxemia

## definition
Toxemia, bacteremia and septicemia name three distinct blood-borne states. Toxemia is the
circulation of toxins (not necessarily live organisms) in the blood, causing clinical and
pathological manifestations. Bacteremia is simply the presence of bacteria in the blood,
without necessarily any multiplication there. Septicemia is the more severe state: the
circulation of large numbers of virulent micro-organisms that are actively multiplying and
producing toxins in the blood itself -- the definition that "bacteremia" is sometimes
mistakenly given.

## explicit_objective
Distinguish toxemia (circulating toxins), bacteremia (mere bacterial presence in blood) and
septicemia (actively multiplying, toxin-producing organisms in blood).

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-LEPROSY-AND-SYPHILIS

## learner_years
1

## universities
o6u

## blueprint_weight
0.4

## exam_weight_by_year
O6U_Y1=0.6

## clinical_relevance
0.5

## academic_relevance
0.65

## module_subject
O6U-IPA-107 > General Pathology > Infectious and parasitic pathology

## exam_signal
src_f411749e2fd19154b7bc | paper | | p299 | O6U-IPA-107

## weight_confidence
0.4

## confidence
0.75

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 5 (p299): "Toxemia is circulation of toxins in blood causing clinical and pathological
manifestations" (true). T/F 6 (p299): "Circulation of large number of virulent
micro-organisms with multiplication and toxin production is called bacteremia" (false --
that definition is septicemia's, not bacteremia's).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Infectious and parasitic pathology
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
Toxemia, bacteremia, septicemia
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Using "bacteremia" and "septicemia" interchangeably -- bacteremia is the mere presence of
bacteria; septicemia specifically requires active multiplication and toxin production.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---

# Item

## id
CON-INF-530DDEC56C3345

## label
Pyemic abscesses, from septic emboli, are acute, not chronic, abscesses

## canonical_key
pyemia.acute-septic-embolic-abscesses

## definition
Pyemia is the condition in which septic emboli -- fragments of infected thrombus -- travel
through the bloodstream and lodge in distant organs, each seeding a new focus of infection.
The abscesses that result (pyemic abscesses) are acute lesions: they form rapidly at the
site each embolus lodges, rather than developing as slow, chronic collections.

## explicit_objective
State that pyemic abscesses, seeded by septic emboli, are acute rather than chronic lesions.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PAT

## article_ids
ART-O6U-IPA-LEPROSY-AND-SYPHILIS

## learner_years
1

## universities
o6u

## blueprint_weight
0.35

## exam_weight_by_year
O6U_Y1=0.55

## clinical_relevance
0.45

## academic_relevance
0.6

## module_subject
O6U-IPA-107 > General Pathology > Infectious and parasitic pathology

## exam_signal
src_f411749e2fd19154b7bc | paper | | p299 | O6U-IPA-107

## weight_confidence
0.35

## confidence
0.75

## atomic_claim_ids
[clear]

## resource_ids
src_f411749e2fd19154b7bc

## related_article_ids
[clear]

## original_wording
T/F 7 (p299): "Pyemic abscesses are chronic abscesses" (false -- they are acute).

## owner
Claude

## reviewer
Medical team, Admin team

## final_publisher
Admin team

## publication_status
needs_evidence

## editorial_review_status
drafted_not_reviewed

## field_notes
atomicClaimIds: not in the shared corpus extraction index; S5 evidence pass owed.
arabicLabel: No verification pass run this session.
arabicAliases: No verification pass run this session.
relationships: Not yet run -- S4 pass owed.
moduleIds: left blank pending Academic Setup import.

## topic
General Pathology
## subtopic
Infectious and parasitic pathology
## microtopic
[clear]
## nanotopic
[clear]
## secondary_node_ids
[clear]
## related_concept_ids
[clear]
## modules
[clear]
## aliases
[clear]
## arabic_label
[clear]
## arabic_aliases
[clear]
## pitfalls
Assuming any abscess found on later imaging or at autopsy must be "chronic" -- pyemic
abscesses form acutely, even if discovered after some time has passed.
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Evidence must be attached before publication -- no corpus-indexed source yet.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## last_reviewed
[clear]
## review_due
[clear]
## exclusion_reason
[clear]

---
