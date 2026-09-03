<!--
  MU-MED101 (Foundation 1) - authored concepts for the varA-biophys cluster,
  30 new mints. Source: 'EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf' (mu_f63b294e2eeab7da0ff8),
  the continuation-numbered (Q37-72) Biochemistry/Physiology sub-block of the
  "Support 43" exam family -- a distinct paper from the already-authored
  "Support 43 - With Answers.pdf" (f1supp43-biochemphys cluster covered its
  own separate Q1-38 numbering; confirmed no stem overlap by grep before
  authoring). Key convention: yellow-fill highlight (pagetext.mjs keys
  auto-read all but 5 items -- q44, q48, q52, q60, q64 straddle a page break
  with no highlight on either page, confirmed with pdf_visual_keys.py; each
  keyed editorially per LANE-CARD rule 10, field-noted).

  "Variant B" (mu_186bd9afca2e2121edae) is confirmed byte-identical stem/
  option text to this paper (spot-checked p2 and p11) but carries zero
  highlighted keys anywhere (pagetext.mjs keys: 0/36 keyed) -- the unanswered
  twin of this same paper, contributing no new content. Logged as duplicate,
  not separately authored.

  Search-before-mint (find-existing.mjs plus root-word greps across
  Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura/import-ready pending
  concept files) found four exact-fact foreign reuses (sparse overlays in
  pending-live/MU-MED101-concepts-overlay.md, not repeated here) plus one
  exact-fact local reuse (CON-FND-9E4A791CF44E5C, already MU-tagged,
  referenced directly with no overlay needed) -- see
  coverage/seeds/MU-MED101/varA-biophys.json's header for all five. The
  remaining 30 items below are new mints; no equivalent-fact match was found
  for any of them.

  Evidence (one claim + one citation per concept) is in the sibling
  evidence/MU-MED101-{claims,citations}.md; the resource record is in
  evidence/MU-MED101-resources.md. Teaching articles: five existing articles
  (ART-MU101-ACIDBASE, -SOLNCHEM, -CARBCHEM, -GAGGLYCO, -PROTEINAA) extended
  with these new concept ids in their own ## related_concepts, plus three new
  articles (ART-MU101-LIPIDS, ART-MU101-ANS, ART-MU101-MEMBRANE) in
  article/MU-MED101-articles.md.

  Simulate together with:
    docs/import-ready/concept/102-INT-mcq-concepts.md \
    docs/import-ready/concept/102-INT-concepts.md \
    docs/import-ready/concept/AU-MED-102-biochem-structural-concepts.md \
    docs/import-ready/concept/101-ISK-mcq-concepts.md \
    docs/Menoufia-Source-Imports/concept/MU-MED101-concepts.md \
    docs/Menoufia-Source-Imports/concept/MU-MED101-concepts-2.md \
    docs/Menoufia-Source-Imports/concept/MU-MED101-concepts-3.md \
    docs/Menoufia-Source-Imports/concept/MU-MED101-concepts-4.md \
    docs/Menoufia-Source-Imports/concept/MU-MED101-concepts-5.md \
    docs/Menoufia-Source-Imports/pending-live/MU-MED101-concepts-overlay.md \
    docs/Menoufia-Source-Imports/article/MU-MED101-articles.md \
    docs/Menoufia-Source-Imports/evidence/MU-MED101-resources.md \
    docs/Menoufia-Source-Imports/evidence/MU-MED101-claims.md \
    docs/Menoufia-Source-Imports/evidence/MU-MED101-citations.md \
    docs/Menoufia-Source-Imports/question/MU-MED101-varA-biophys-mcq.md

  Import: Admin > Concepts > Import.
-->

# Item

## label
Vomiting causes metabolic alkalosis, not metabolic acidosis, through loss of gastric hydrochloric acid

## id
CON-FND-3A5557EE5F045E

## canonical_key
acid-base.causes.vomiting-causes-alkalosis-not-acidosis

## aliases


## arabic_label


## arabic_aliases


## definition
Vomiting removes hydrogen-ion-rich gastric secretions (HCl) and, through the renal contraction-alkalosis response to the accompanying volume depletion, produces metabolic alkalosis rather than metabolic acidosis. Genuine causes of metabolic acidosis include diarrhoea (intestinal bicarbonate loss), renal failure (retained acid and reduced acid excretion), muscular exercise (lactic acid accumulation) and ketosis (ketoacid accumulation) -- all of which move pH in the opposite direction to vomiting.

## explicit_objective
Identify vomiting as a cause of metabolic alkalosis rather than metabolic acidosis, distinguishing it from genuine metabolic-acidosis causes such as diarrhoea, renal failure, muscular exercise and ketosis.

## pitfalls
Assuming any severe gastrointestinal fluid loss causes acidosis; vomiting specifically loses acid (gastric HCl), the opposite of diarrhoea, which loses base (intestinal bicarbonate).

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
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Acid-Base Physiology

## article_ids
ART-MU101-ACIDBASE-D4BF76CA

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-3A5557EE5F045E

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Which of the following is not a cause of metabolic acidosis -> Vomiting

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p2 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q37 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p2, yellow-fill-highlight key.

---

# Item

## label
A true (crystalloid) solution, such as sodium chloride, passes freely through a semipermeable membrane, unlike a colloid

## id
CON-FND-44A94DF65C50AE

## canonical_key
solution-chemistry.classification.true-solution-semipermeable-membrane-passage

## aliases


## arabic_label


## arabic_aliases


## definition
Sodium chloride dissolves into hydrated ions under about 1 nanometre in diameter, small enough to pass freely through both filter paper and a semipermeable (dialysis) membrane -- the defining physical property of a true (crystalloid) solution, as opposed to a colloid (roughly 1-200 nm, retained by a semipermeable membrane though it still passes filter paper) or a coarse suspension (over roughly 200 nm, retained by both and visible under an ordinary microscope).

## explicit_objective
State that a true/crystalloid solution such as NaCl, with solute particles below about 1 nm, passes freely through both filter paper and a semipermeable (dialysis) membrane, unlike a colloid.

## pitfalls
Confusing the crystalloid particle-size range (under about 1 nm) with the colloidal range (roughly 1-200 nm), which is retained by a semipermeable membrane even though it still passes filter paper.

## concept_type
mechanism

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
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Solution Chemistry

## article_ids
ART-MU101-SOLNCHEM-49A71510

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-44A94DF65C50AE

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
True statement regarding sodium chloride solution -> Can pass through semipermeable membrane

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p2 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q39 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p2, yellow-fill-highlight key (no printed key found on either straddled page; keyed editorially per LANE-CARD rule 10).

---

# Item

## label
Cellulose has no nutritional value for humans because human digestive enzymes cannot hydrolyse its beta-1,4-glycosidic bonds

## id
CON-FND-0C76F56DAB1E6A

## canonical_key
carbohydrate-chemistry.digestibility.cellulose-indigestible-no-nutrition

## aliases


## arabic_label


## arabic_aliases


## definition
Cellulose is built from D-glucose units joined exclusively by beta-1,4-glycosidic bonds, and humans lack the cellulase enzyme needed to hydrolyse that bond, so it passes through the gastrointestinal tract undigested. Because no absorbable monosaccharide is released, cellulose contributes no calories or nutritional value, unlike starch and glycogen, whose alpha-1,4/alpha-1,6 bonds human amylase cleaves efficiently; instead it functions purely as insoluble dietary fibre.

## explicit_objective
State that cellulose has no nutritional value for humans, because its beta-1,4-glycosidic bonds cannot be hydrolysed by human digestive enzymes.

## pitfalls
Assuming any glucose polymer is a caloric nutrient; digestibility depends entirely on the glycosidic bond configuration (alpha, digestible by amylase, vs beta, not digestible by any human enzyme).

## concept_type
mechanism

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
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Carbohydrate Chemistry

## article_ids
ART-MU101-CARBCHEM-9E8FDE35

## related_article_ids


## related_concept_ids
CON-FND-F9F45E1748DD65

## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-0C76F56DAB1E6A

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Carbohydrate with no nutritional value -> Cellulose

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p2 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q40 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p2, yellow-fill-highlight key.

---

# Item

## label
Mannose is the C2 epimer of glucose

## id
CON-FND-DA23B0E2B665D1

## canonical_key
carbohydrate-chemistry.isomerism.mannose-c2-epimer-of-glucose

## aliases


## arabic_label


## arabic_aliases


## definition
Mannose and glucose share the same molecular formula and differ in configuration only at carbon 2, making mannose the C2 epimer of glucose, the same kind of single-carbon relationship by which galactose is glucose's C4 epimer. Fructose, by contrast, is glucose's aldose-ketose isomer (a functional-group difference, not an epimeric one), and ribose and xylose are sugars of a different chain length altogether.

## explicit_objective
Identify mannose as the specific C2 epimer of glucose, distinguishing it from galactose (the C4 epimer) and fructose (the aldose-ketose isomer).

## pitfalls
Treating 'an epimer of glucose' and 'an isomer of glucose' as interchangeable; fructose is an isomer of glucose but not an epimer of it.

## concept_type
mechanism

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
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Carbohydrate Chemistry

## article_ids
ART-MU101-CARBCHEM-9E8FDE35

## related_article_ids


## related_concept_ids
CON-FND-AEDF8CA500AD5A

## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-DA23B0E2B665D1

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Epimer of glucose -> Mannose

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p3 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q41 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p3, yellow-fill-highlight key.

---

# Item

## label
Heparin stimulates lipoprotein lipase, releasing it from the vascular endothelium into plasma

## id
CON-FND-D1D02A385DD5EA

## canonical_key
glycosaminoglycans.heparin.stimulates-lipoprotein-lipase

## aliases


## arabic_label


## arabic_aliases


## definition
Heparin, beyond its anticoagulant action, displaces lipoprotein lipase from its endothelial heparan-sulfate binding sites into the circulating plasma, activating it to hydrolyse the triglycerides carried in chylomicrons and VLDL. This heparin-releasable pool of lipoprotein lipase is the basis of the historical 'post-heparin lipolytic activity' assay used to measure the enzyme.

## explicit_objective
State that heparin stimulates/releases lipoprotein lipase from the vascular endothelium, activating plasma triglyceride hydrolysis.

## pitfalls
Confusing heparin's anticoagulant role (potentiating antithrombin III) with this separate, lipid-metabolism action on lipoprotein lipase.

## concept_type
mechanism

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
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Glycosaminoglycans and Glycoproteins

## article_ids
ART-MU101-GAGGLYCO-87AAAE0F

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-D1D02A385DD5EA

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Enzyme stimulated by heparin -> Heparin

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p3 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q42 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p3, yellow-fill-highlight key.

---

# Item

## label
Mutarotation is the gradual change in specific rotation of a freshly dissolved optically active sugar as it reaches equilibrium

## id
CON-FND-9984D817457330

## canonical_key
carbohydrate-chemistry.optical-activity.mutarotation

## aliases


## arabic_label


## arabic_aliases


## definition
Mutarotation is the slow, spontaneous change in optical rotation shown by a freshly dissolved reducing sugar (such as glucose) as its open-chain form cyclises and interconverts between the alpha and beta anomeric ring forms until an equilibrium mixture is reached. It is distinct from optical activity in general (rotation of plane-polarised light, present throughout the process) and from racemisation (formation of an equal D/L mixture), neither of which describes this specific, gradual, time-dependent change.

## explicit_objective
Define mutarotation as the time-dependent change in specific rotation of a dissolved sugar as its alpha/beta anomers equilibrate.

## pitfalls
Confusing mutarotation (gradual equilibration of one compound's anomers) with racemisation (formation of a D/L mixture) or with optical activity in general.

## concept_type
mechanism

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
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Carbohydrate Chemistry

## article_ids
ART-MU101-CARBCHEM-9E8FDE35

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-9984D817457330

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Gradual change in specific rotation of a sugar solution -> mutarotation

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p3 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q43 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p3, yellow-fill-highlight key.

---

# Item

## label
Keratan sulphate is the glycosaminoglycan found in abundance in the cornea

## id
CON-FND-57DD3E543F4238

## canonical_key
glycosaminoglycans.keratan-sulfate.abundant-in-cornea

## aliases


## arabic_label


## arabic_aliases


## definition
Keratan sulphate is a sulfated glycosaminoglycan present at particularly high concentration in the cornea, where its precisely regular spacing between collagen fibrils is thought to contribute to corneal transparency; it is also found in cartilage and intervertebral discs, but the cornea is its most exam-characteristic location. This distinguishes it from the other named glycosaminoglycans, none of which is specifically associated with the cornea.

## explicit_objective
State that keratan sulphate is the glycosaminoglycan found in abundance in the cornea.

## pitfalls
Confusing keratan sulphate's tissue distribution with that of hyaluronic acid (synovial fluid, vitreous humour) or heparin (mast cells, plasma).

## concept_type
mechanism

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
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Glycosaminoglycans and Glycoproteins

## article_ids
ART-MU101-GAGGLYCO-87AAAE0F

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-57DD3E543F4238

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Tissue rich in keratan sulphate -> Cornea

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p3 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q44 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p3, yellow-fill-highlight key (no printed key found on either straddled page; keyed editorially per LANE-CARD rule 10).

---

# Item

## label
Ribulose is a ketopentose

## id
CON-FND-0E2A414FAA60C1

## canonical_key
carbohydrate-chemistry.classification.ribulose-ketopentose

## aliases


## arabic_label


## arabic_aliases


## definition
Ribulose is a five-carbon monosaccharide carrying a ketone functional group, making it a ketopentose -- a key intermediate of the pentose phosphate pathway. This term combines carbon count (five, a pentose) with functional group (ketone, a ketose) into a single classification, distinguishing ribulose from an aldopentose such as ribose (its aldose isomer) or from a tetrose/hexose sugar of a different chain length.

## explicit_objective
Classify ribulose by both carbon count and functional group as a ketopentose.

## pitfalls
Confusing ribulose (a ketopentose) with its aldose isomer ribose (an aldopentose), or misjudging its carbon count against a tetrose or hexose.

## concept_type
mechanism

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
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Carbohydrate Chemistry

## article_ids
ART-MU101-CARBCHEM-9E8FDE35

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-0E2A414FAA60C1

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Classification of ribulose -> Ketopentose

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p4 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q45 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p4, yellow-fill-highlight key.

---

# Item

## label
Glycosides are not products of glucose oxidation; they form instead by condensation with an alcohol

## id
CON-FND-7D87FB26A34638

## canonical_key
carbohydrate-chemistry.reactions.glycoside-not-an-oxidation-product

## aliases


## arabic_label


## arabic_aliases


## definition
Oxidising glucose at different carbons yields distinct acids -- gluconic acid (C1 oxidised), glucuronic acid (C6 oxidised) and glucosaccharic (glucaric) acid (both C1 and C6 oxidised) -- but a glycoside is not one of them, because glycosides form by an entirely different reaction: condensation of the anomeric (C1) hydroxyl with an alcohol or other -OH-bearing group, releasing water, not by any oxidation step.

## explicit_objective
Distinguish glucose's true oxidation products (gluconic, glucuronic, glucosaccharic acid) from a glycoside, which forms by condensation rather than oxidation.

## pitfalls
Assuming every named glucose derivative arises from oxidation; glycoside formation is a condensation reaction at the anomeric carbon, unrelated to the oxidation-state changes that produce the acid derivatives.

## concept_type
mechanism

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
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Carbohydrate Chemistry

## article_ids
ART-MU101-CARBCHEM-9E8FDE35

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-7D87FB26A34638

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Product not formed by glucose oxidation -> Glycoside

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p4 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q46 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p4, yellow-fill-highlight key.

---

# Item

## label
Alpha-D-glucose and beta-D-glucose are anomers, differing only at the anomeric carbon

## id
CON-FND-06FC2D59066FE7

## canonical_key
carbohydrate-chemistry.isomerism.alpha-beta-d-glucose-are-anomers

## aliases


## arabic_label


## arabic_aliases


## definition
When open-chain D-glucose cyclises, a new stereocentre is created at C1 (the anomeric carbon); the two possible configurations there, alpha and beta, are called anomers -- a special case of epimerism restricted specifically to the anomeric carbon and produced by ring closure rather than by any other chemical change.

## explicit_objective
Identify alpha-D-glucose and beta-D-glucose as anomers, differing only at the anomeric carbon created on ring closure.

## pitfalls
Calling alpha/beta-D-glucose 'epimers' in general rather than the more specific term 'anomers', which applies only to the anomeric-carbon case.

## concept_type
mechanism

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
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Carbohydrate Chemistry

## article_ids
ART-MU101-CARBCHEM-9E8FDE35

## related_article_ids


## related_concept_ids
CON-FND-AEDF8CA500AD5A

## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-06FC2D59066FE7

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Relationship between alpha- and beta-D-glucose -> Anomers

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p4 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q47 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p4, yellow-fill-highlight key.

---

# Item

## label
Sucrose's glucose and fructose units are joined by an alpha-1,2-glycosidic linkage between their two anomeric carbons

## id
CON-FND-23D30D7A298779

## canonical_key
carbohydrate-chemistry.disaccharides.sucrose-alpha-1-2-glycosidic-linkage

## aliases


## arabic_label


## arabic_aliases


## definition
Sucrose is formed from alpha-D-glucose and beta-D-fructose joined head-to-head through both of their anomeric carbons (glucose C1 to fructose C2), a bond described as an alpha-1,2-glycosidic linkage; because both anomeric carbons are tied up in this bond, sucrose has no free reducing end and is a non-reducing sugar, unlike maltose (glucose-glucose, alpha-1,4) or lactose (galactose-glucose, beta-1,4), which each leave one anomeric carbon free.

## explicit_objective
Identify sucrose as the disaccharide whose monosaccharide units are linked by an alpha-1,2-glycosidic bond, and connect this to its non-reducing character.

## pitfalls
Confusing sucrose's 1,2 linkage (through both anomeric carbons) with maltose's 1,4 linkage (through one anomeric and one non-anomeric carbon, which leaves a free reducing end).

## concept_type
mechanism

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
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Carbohydrate Chemistry

## article_ids
ART-MU101-CARBCHEM-9E8FDE35

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-23D30D7A298779

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Disaccharide with an alpha 1-to-2 glycosidic linkage -> Sucrose

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p4 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q48 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p4, yellow-fill-highlight key.

---

# Item

## label
Free radicals initiate and propagate lipid rancidity

## id
CON-FND-481E092DAB9FEC

## canonical_key
lipids.oxidation.free-radicals-enhance-rancidity

## aliases


## arabic_label


## arabic_aliases


## definition
Rancidity is the oxidative spoilage of fats, driven by a free-radical chain reaction in which a radical abstracts hydrogen from an unsaturated fatty acid, forming a lipid radical that reacts with oxygen and propagates further radical formation. Antioxidants (which quench radicals), avoidance of air/oxygen exposure and avoidance of the bacteria/enzymes that can initiate spoilage all instead protect against rancidity, the opposite role from free radicals.

## explicit_objective
Identify free radicals as the agent that enhances/propagates rancidity, as opposed to antioxidants and oxygen/bacteria avoidance, which protect against it.

## pitfalls
Selecting an anti-rancidity factor (antioxidant, avoidance of air or bacteria) instead of the pro-rancidity factor (free radicals) the question asks for.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Lipids

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Lipids

## article_ids
ART-MU101-LIPIDS-5482CCBF

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-481E092DAB9FEC

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Factor that enhances rancidity -> Free radical

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p5 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q49 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p5, yellow-fill-highlight key.

---

# Item

## label
Lecithin (dipalmitoyl phosphatidylcholine) is the phospholipid that acts as pulmonary surfactant

## id
CON-FND-CCEE032D2010B9

## canonical_key
lipids.phospholipids.lecithin-lung-surfactant

## aliases


## arabic_label


## arabic_aliases


## definition
Lecithin, specifically dipalmitoylphosphatidylcholine (DPPC), is the major phospholipid component of pulmonary surfactant, secreted by type II pneumocytes to lower alveolar surface tension and prevent alveolar collapse at end-expiration. The other named phospholipids -- cephalin (phosphatidylethanolamine), phosphatidylinositol, phosphatidylserine and sphingomyelin -- are structural or signalling membrane lipids rather than the principal surfactant component.

## explicit_objective
Identify lecithin (dipalmitoylphosphatidylcholine) as the phospholipid that functions as pulmonary surfactant.

## pitfalls
Confusing lecithin's surfactant role with the general membrane-structural roles of the other phospholipids listed.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Lipids

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Lipids

## article_ids
ART-MU101-LIPIDS-5482CCBF

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-CCEE032D2010B9

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Phospholipid that acts as lung surfactant -> Lecithin

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p5 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q50 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p5, yellow-fill-highlight key.

---

# Item

## label
Arachidonic acid is a 20-carbon fatty acid with four double bonds at positions 5, 8, 11 and 14

## id
CON-FND-AD4D6D4CF70F4E

## canonical_key
lipids.fatty-acids.arachidonic-acid-c20-4-delta-5-8-11-14

## aliases


## arabic_label


## arabic_aliases


## definition
Arachidonic acid is written C20:4, Delta-5,8,11,14 -- a twenty-carbon polyunsaturated (omega-6) fatty acid with four cis double bonds at carbons 5, 8, 11 and 14, derived from linoleic acid and serving as the direct precursor for the eicosanoid signalling molecules (prostaglandins, thromboxanes, leukotrienes).

## explicit_objective
State arachidonic acid's structural formula (C20:4, Delta-5,8,11,14) and recognise its role as the eicosanoid precursor.

## pitfalls
Confusing arachidonic acid's carbon count and double-bond number with those of other named fatty acids (linoleic acid C18:2, alpha-linolenic acid C18:3, palmitic acid C16:0).

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Lipids

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Lipids

## article_ids
ART-MU101-LIPIDS-5482CCBF

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-AD4D6D4CF70F4E

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Structural formula of arachidonic acid -> (C20:4, Delta 5,8,11,14)

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p5 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q51 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p5, yellow-fill-highlight key.

---

# Item

## label
A ganglioside is built of a ceramide (sphingosine plus fatty acid) linked to an oligosaccharide chain that includes sialic acid

## id
CON-FND-3FD8683C5365A8

## canonical_key
lipids.glycosphingolipids.ganglioside-composition

## aliases


## arabic_label


## arabic_aliases


## definition
Gangliosides are the most complex glycosphingolipids, built on a ceramide backbone (sphingosine condensed with a fatty acid) to which an oligosaccharide chain -- typically including glucose, galactose and one or more sialic acid (N-acetylneuraminic acid) residues -- is attached. The presence of sialic acid is exactly what distinguishes a ganglioside from a simpler glycosphingolipid such as a cerebroside, which carries only a single neutral sugar and no sialic acid.

## explicit_objective
List the structural components of a ganglioside (sphingosine, fatty acid, sugars, sialic acid) and identify sialic acid as the feature that defines the ganglioside subclass.

## pitfalls
Confusing a ganglioside's sphingosine-based backbone with the glycerol-based backbone of the glycerophospholipids (lecithin, cephalin, phosphatidylserine, phosphatidylinositol).

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Lipids

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Lipids

## article_ids
ART-MU101-LIPIDS-5482CCBF

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-3FD8683C5365A8

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Components of a ganglioside -> Sphingosine + fatty acids + Glucose + Galactose + Sialic acid

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p5 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q52 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p5, yellow-fill-highlight key (no printed key found on either straddled page; keyed editorially per LANE-CARD rule 10).

---

# Item

## label
Beta carotene is not a steroid; sterols, bile acids, oestrogen and glucocorticoids all are

## id
CON-FND-608241A4086569

## canonical_key
lipids.classification.beta-carotene-not-a-steroid

## aliases


## arabic_label


## arabic_aliases


## definition
Beta carotene is an isoprenoid/carotenoid pigment (a vitamin A precursor) built from isoprene units, not the fused four-ring cyclopentanoperhydrophenanthrene nucleus that defines a steroid. Sterols (such as cholesterol), bile acids, oestrogen and glucocorticoids all share that steroid nucleus and are therefore true steroids, unlike beta carotene.

## explicit_objective
Identify beta carotene as a non-steroid isoprenoid pigment, distinguishing it from the true steroids sterol, bile acid, oestrogen and glucocorticoid.

## pitfalls
Assuming any lipid-soluble molecule with hormone-like or structural importance must be a steroid; the defining feature is specifically the four-ring steroid nucleus, which beta carotene lacks.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-BIO-T04

## secondary_node_ids
[clear]

## topic
Biochemistry

## subtopic
Lipids

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Lipids

## article_ids
ART-MU101-LIPIDS-5482CCBF

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-608241A4086569

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Lipid that is not a steroid -> Beta carotene

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p6 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q53 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p6, yellow-fill-highlight key.

---

# Item

## label
Glycine is classed as a neutral amino acid

## id
CON-FND-831F518E284A24

## canonical_key
proteins.amino-acid-classification.glycine-neutral

## aliases


## arabic_label


## arabic_aliases


## definition
Amino acids are grouped by their side-chain charge at physiological pH into acidic (aspartate, glutamate), basic (lysine, arginine, histidine) and neutral (uncharged side chain, e.g. glycine, alanine, serine) classes. Glycine's side chain is simply a hydrogen atom, carrying no ionisable charge, which makes it the simplest neutral amino acid.

## explicit_objective
Classify glycine as a neutral amino acid, distinguishing it from the basic amino acids lysine, arginine and histidine and the acidic amino acid glutamate.

## pitfalls
Confusing 'neutral' (uncharged side chain) with the basic amino acids, which are frequently listed alongside it and can be mistaken for neutral if their side-chain charge is forgotten.

## concept_type
mechanism

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
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Proteins and Amino Acids

## article_ids
ART-MU101-PROTEINAA-C5C4756B

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-831F518E284A24

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Neutral amino acid -> Glycine

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p6 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q56 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p6, yellow-fill-highlight key.

---

# Item

## label
Cysteine is a sulphur-containing amino acid

## id
CON-FND-DB2956ACAD4EE6

## canonical_key
proteins.amino-acid-classification.cysteine-sulfur-containing

## aliases


## arabic_label


## arabic_aliases


## definition
Cysteine carries a thiol (-SH) side chain, making it, together with methionine, one of the two sulphur-containing amino acids. Its thiol group allows two cysteine residues to form a covalent disulfide bond, a major stabiliser of tertiary and quaternary protein structure.

## explicit_objective
Classify cysteine as a sulphur-containing amino acid and connect its thiol side chain to disulfide-bond formation.

## pitfalls
Classifying cysteine by an unrelated property (acidic, basic, aromatic or essential) instead of its defining sulphur-containing thiol side chain.

## concept_type
mechanism

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
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Proteins and Amino Acids

## article_ids
ART-MU101-PROTEINAA-C5C4756B

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-DB2956ACAD4EE6

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Classification of cysteine -> Sulphur containing

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p7 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q57 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p7, yellow-fill-highlight key.

---

# Item

## label
Fibrous proteins such as fibrin have a length-to-width ratio greater than 10, unlike globular proteins

## id
CON-FND-E3BBCA3B568ECD

## canonical_key
proteins.structure.fibrous-protein-length-width-ratio

## aliases


## arabic_label


## arabic_aliases


## definition
Proteins are broadly classed by shape into fibrous (elongated, length-to-width ratio greater than about 10, e.g. fibrin/fibrinogen, collagen, keratin) and globular (compact, roughly spherical, ratio close to 1, e.g. haemoglobin, myoglobin, albumin, most globulins). Fibrin's elongated polymer strands, formed when thrombin cleaves fibrinogen and the monomers polymerise, are the classic exam example of a fibrous protein.

## explicit_objective
Identify fibrin as a fibrous protein with a length-to-width ratio greater than 10, distinguishing it from the globular proteins haemoglobin, myoglobin, albumin and globulin.

## pitfalls
Assuming all plasma/blood-related proteins are globular; fibrin specifically forms elongated fibrous strands, unlike the globular haemoglobin, myoglobin, albumin and globulin listed alongside it.

## concept_type
mechanism

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
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Proteins and Amino Acids

## article_ids
ART-MU101-PROTEINAA-C5C4756B

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-E3BBCA3B568ECD

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Protein with a high length-to-width ratio -> Fibrin

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p7 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q60 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p7, yellow-fill-highlight key (no printed key found on either straddled page; keyed editorially per LANE-CARD rule 10).

---

# Item

## label
The sympathetic nervous system is catabolic, mobilising energy stores for a fight-or-flight response

## id
CON-FND-E1A103BBD113AB

## canonical_key
ans.sympathetic.catabolic-energy-mobilising

## aliases


## arabic_label


## arabic_aliases


## definition
The sympathetic division of the autonomic nervous system is functionally catabolic: its 'fight-or-flight' discharge mobilises stored energy by stimulating glycogenolysis and lipolysis and by increasing cardiac output and ventilation, preparing the body for vigorous activity rather than for rest, digestion or energy storage, which are instead promoted by the parasympathetic ('rest and digest') division.

## explicit_objective
State that the sympathetic nervous system is catabolic (energy-mobilising), contrasting it with the anabolic, energy-conserving parasympathetic system.

## pitfalls
Reversing sympathetic and parasympathetic in the catabolic/anabolic pairing.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
[clear]

## topic
Physiology

## subtopic
Autonomic Nervous System

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Autonomic Nervous System

## article_ids
ART-MU101-ANS-AF9E6E0F

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-E1A103BBD113AB

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Functional character of the sympathetic nervous system -> The sympathetic system is catabolic (energy consuming)

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p8 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q61 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p8, yellow-fill-highlight key.

---

# Item

## label
The autonomic nervous system is a two-neuron efferent (motor) pathway, unlike the single-neuron somatic motor pathway

## id
CON-FND-0C0D3DCF41711B

## canonical_key
ans.organisation.two-neuron-efferent-system

## aliases


## arabic_label


## arabic_aliases


## definition
Every autonomic motor pathway, sympathetic or parasympathetic, uses two neurons in series -- a preganglionic neuron (cell body in the CNS, myelinated axon) synapsing in a peripheral ganglion onto a postganglionic neuron (cell body in the ganglion, unmyelinated axon to the target organ). This differs from the somatic motor pathway, which reaches skeletal muscle via a single motor neuron with no intervening peripheral ganglion.

## explicit_objective
State that the ANS is an efferent two-neuron (pre- and postganglionic) system, contrasting it with the single-neuron somatic motor pathway.

## pitfalls
Assuming the ANS is part of the CNS or a purely afferent/sensory system; it is specifically an efferent, two-neuron, peripheral motor system.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
[clear]

## topic
Physiology

## subtopic
Autonomic Nervous System

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Autonomic Nervous System

## article_ids
ART-MU101-ANS-AF9E6E0F

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-0C0D3DCF41711B

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Organisation of the autonomic nervous system -> Is an efferent two neuronal system

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p8 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q62 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p8, yellow-fill-highlight key.

---

# Item

## label
An autonomic ganglion is a collection of nerve cell bodies located outside the CNS

## id
CON-FND-2294DA0AE59648

## canonical_key
ans.organisation.autonomic-ganglion-definition

## aliases


## arabic_label


## arabic_aliases


## definition
An autonomic ganglion is, by definition, a collection of neuronal cell bodies lying outside the central nervous system, where preganglionic fibres synapse onto postganglionic neurons using acetylcholine as the ganglionic neurotransmitter. Sympathetic ganglia are typically paravertebral or prevertebral (relatively close to the spinal cord), while parasympathetic ganglia typically lie close to or within the wall of the target organ.

## explicit_objective
Define an autonomic ganglion as a collection of nerve cell bodies located outside the CNS, and note its ganglionic (acetylcholine) neurotransmission.

## pitfalls
Placing autonomic ganglia inside the CNS, or confusing their cholinergic ganglionic transmission with the differing neurotransmitters used at the postganglionic-to-target-organ synapse.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
[clear]

## topic
Physiology

## subtopic
Autonomic Nervous System

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Autonomic Nervous System

## article_ids
ART-MU101-ANS-AF9E6E0F

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-2294DA0AE59648

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Definition of an autonomic ganglion -> collection of nerve cells outside CNS

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p8 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q63 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p8, yellow-fill-highlight key.

---

# Item

## label
Sympathetic stimulation produces mydriasis (pupillary dilatation) via contraction of the dilator pupillae muscle

## id
CON-FND-79972A05C5204F

## canonical_key
ans.sympathetic.effects.mydriasis-dilator-pupillae

## aliases


## arabic_label


## arabic_aliases


## definition
Sympathetic stimulation contracts the radially arranged dilator pupillae muscle of the iris, producing mydriasis (pupillary dilatation). This is the opposite of parasympathetic-mediated contraction of the circularly arranged constrictor (sphincter) pupillae muscle, which produces miosis, and of ciliary-muscle contraction, which mediates accommodation.

## explicit_objective
State that sympathetic stimulation produces mydriasis via dilator pupillae contraction, contrasting it with parasympathetic miosis/accommodation.

## pitfalls
Attributing ciliary-muscle contraction (accommodation) or eyelid drooping (loss of sympathetic tone, as in Horner's syndrome) to active sympathetic stimulation; both are parasympathetic or sympathetic-loss phenomena, not direct sympathetic-stimulation effects.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
[clear]

## topic
Physiology

## subtopic
Autonomic Nervous System

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Autonomic Nervous System

## article_ids
ART-MU101-ANS-AF9E6E0F

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-79972A05C5204F

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Effect of sympathetic stimulation on the eye -> Dilatation of the pupil (mydriasis)

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p8 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q64 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p8, yellow-fill-highlight key (no printed key found on either straddled page; keyed editorially per LANE-CARD rule 10).

---

# Item

## label
The sphincter (constrictor) pupillae is parasympathetically, not sympathetically, innervated -- the exception among organs with sympathetic supply

## id
CON-FND-9D648BC1395CD5

## canonical_key
ans.sympathetic.distribution.constrictor-pupillae-not-sympathetic

## aliases


## arabic_label


## arabic_aliases


## definition
Almost every peripheral organ, including sweat glands, skeletal-muscle blood vessels, cardiac (ventricular) muscle and bronchial smooth muscle, receives sympathetic innervation. The constrictor (sphincter) pupillae muscle is a notable exception, receiving parasympathetic innervation only (via the oculomotor nerve and ciliary ganglion) with no direct sympathetic supply.

## explicit_objective
Identify the constrictor pupillae as the exception among the listed structures that lacks direct sympathetic innervation.

## pitfalls
Assuming every smooth or cardiac muscle structure has sympathetic supply; the pupillary sphincter is a specific, exam-tested exception.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
[clear]

## topic
Physiology

## subtopic
Autonomic Nervous System

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Autonomic Nervous System

## article_ids
ART-MU101-ANS-AF9E6E0F

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-9D648BC1395CD5

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Organ without sympathetic supply -> Constrictor pupillae muscle

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p9 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q65 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p9, yellow-fill-highlight key.

---

# Item

## label
Sympathetic stimulation causes bronchodilatation via beta-2 receptors on bronchial smooth muscle

## id
CON-FND-60C85CB384A726

## canonical_key
ans.sympathetic.effects.bronchodilatation-beta2

## aliases


## arabic_label


## arabic_aliases


## definition
Circulating adrenaline and sympathetic activation relax bronchial smooth muscle via beta-2 adrenergic receptors, producing bronchodilatation and increased airway calibre -- the physiological basis for using beta-2 agonists such as salbutamol as bronchodilator drugs. This is the opposite of the bronchoconstriction produced by parasympathetic (muscarinic) stimulation.

## explicit_objective
State that sympathetic stimulation causes bronchodilatation via beta-2 receptors, contrasting it with parasympathetic bronchoconstriction.

## pitfalls
Reversing sympathetic and parasympathetic effects on bronchial smooth muscle tone.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
[clear]

## topic
Physiology

## subtopic
Autonomic Nervous System

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Autonomic Nervous System

## article_ids
ART-MU101-ANS-AF9E6E0F

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-60C85CB384A726

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Effect of sympathetic stimulation on the airway -> Broncho-dilatation

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p9 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q66 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p9, yellow-fill-highlight key.

---

# Item

## label
The greater splanchnic nerve is a sympathetic (preganglionic) nerve

## id
CON-FND-1A8DAFDB5135FB

## canonical_key
ans.sympathetic.anatomy.greater-splanchnic-nerve

## aliases


## arabic_label


## arabic_aliases


## definition
The greater splanchnic nerve is formed from preganglionic sympathetic fibres (roughly T5-T9) that pass through the sympathetic chain without synapsing and travel to the coeliac ganglion, where they synapse on postganglionic neurons supplying the abdominal viscera. It is a purely sympathetic structure, carrying no parasympathetic fibres.

## explicit_objective
Identify the greater splanchnic nerve as a preganglionic sympathetic nerve travelling to the coeliac ganglion.

## pitfalls
Assuming a 'splanchnic' (visceral) nerve name implies parasympathetic function; the named splanchnic nerves (greater, lesser, least) are specifically sympathetic.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
[clear]

## topic
Physiology

## subtopic
Autonomic Nervous System

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Autonomic Nervous System

## article_ids
ART-MU101-ANS-AF9E6E0F

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-1A8DAFDB5135FB

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Nature of the greater splanchnic nerve -> Belongs to sympathetic system

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p9 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q67 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p9, yellow-fill-highlight key.

---

# Item

## label
T1-T2 preganglionic sympathetic fibres to the head and neck relay in the cervical sympathetic ganglia

## id
CON-FND-6A2C6C30D3F1CE

## canonical_key
ans.sympathetic.anatomy.t1-t2-relay-in-cervical-ganglia

## aliases


## arabic_label


## arabic_aliases


## definition
Preganglionic sympathetic neurons supplying the head and neck arise from the lateral horn of the upper one or two thoracic spinal cord segments (T1-T2), ascend the sympathetic chain, and synapse in one of the cervical sympathetic ganglia (superior, middle or inferior/stellate). Postganglionic fibres from there follow the carotid arteries and cranial nerves to their targets, including the pupil dilator, tarsal muscles, sweat glands and blood vessels of the head and neck.

## explicit_objective
Trace T1-T2 preganglionic sympathetic fibres to the head/neck through their relay in the cervical sympathetic ganglia.

## pitfalls
Assuming these fibres synapse in a ganglion near the target organ (a parasympathetic pattern); sympathetic preganglionic fibres to the head/neck instead relay in the relatively distant cervical ganglia.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHY-T07

## secondary_node_ids
[clear]

## topic
Physiology

## subtopic
Autonomic Nervous System

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Autonomic Nervous System

## article_ids
ART-MU101-ANS-AF9E6E0F

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-6A2C6C30D3F1CE

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Relay site of T1-T2 preganglionic sympathetic fibres to the head and neck -> Relay in cervical ganglia

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p10 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q68 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p10, yellow-fill-highlight key.

---

# Item

## label
Peripheral membrane proteins can function as hormone receptors

## id
CON-FND-C83EF923AB6264

## canonical_key
cell-membrane.composition.peripheral-proteins-as-receptors

## aliases


## arabic_label


## arabic_aliases


## definition
The cell membrane's protein component includes both integral (transmembrane) and peripheral (attached non-covalently to one bilayer face) proteins. Peripheral proteins commonly function as receptors, enzymes or structural links to the cytoskeleton at either membrane face, in addition to the transmembrane receptor role played by many integral proteins.

## explicit_objective
Identify hormone-receptor function as a role that peripheral (surface-associated) membrane proteins can perform.

## pitfalls
Assuming only transmembrane (integral) proteins can serve as receptors; peripheral proteins on either membrane face also commonly serve receptor, enzymatic or cytoskeletal-linkage roles.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
[clear]

## topic
Physiology

## subtopic
Cell Membrane and Transport

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Cell Membrane and Transport

## article_ids
ART-MU101-MEMBRANE-615ED100

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-C83EF923AB6264

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
True statement about the cell membrane -> Contain peripheral proteins that act as receptors for hormones

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p10 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q70 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p10, yellow-fill-highlight key.

---

# Item

## label
Secondary active transport moves a solute against its gradient using energy indirectly, via an ion gradient built by primary active transport

## id
CON-FND-6989A09E118B1F

## canonical_key
cell-membrane.transport.secondary-active-transport-indirect-energy

## aliases


## arabic_label


## arabic_aliases


## definition
Secondary active transport moves a solute against its concentration gradient by coupling that movement to the downhill flow of a second ion, typically Na+, through a shared carrier. The driving ion gradient is itself built up by a primary active transporter, such as the Na+/K+-ATPase, that directly consumes ATP, so secondary active transport uses cellular energy indirectly rather than hydrolysing ATP itself at the transport step.

## explicit_objective
Explain that secondary active transport uses energy indirectly, via an ion gradient established by a primary active (ATP-consuming) transporter, rather than directly.

## pitfalls
Confusing secondary active transport with facilitated diffusion (which needs no energy input at all, even indirectly) or with primary active transport (which consumes ATP directly at the transport step).

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
[clear]

## topic
Physiology

## subtopic
Cell Membrane and Transport

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Cell Membrane and Transport

## article_ids
ART-MU101-MEMBRANE-615ED100

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-6989A09E118B1F

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Feature of secondary active transport -> Energy is used indirectly

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p10 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q71 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p10, yellow-fill-highlight key.

---

# Item

## label
Osmosis is the passive movement of water across a semipermeable membrane down its concentration gradient

## id
CON-FND-C9AFF3319629E0

## canonical_key
cell-membrane.transport.osmosis-passive-process

## aliases


## arabic_label


## arabic_aliases


## definition
Osmosis is the net movement of water across a selectively permeable membrane from a region of lower solute concentration to one of higher solute concentration, driven by the water concentration gradient itself. It requires no carrier protein and no metabolic energy, making it a passive process, unlike the active transport of solutes.

## explicit_objective
Define osmosis as a passive, carrier-free, energy-independent movement of water down its own concentration gradient.

## pitfalls
Confusing osmosis (passive water movement, no carrier) with facilitated diffusion of a solute (needs a carrier) or with active transport (needs energy and moves against a gradient).

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id
DIS-PHY-T01

## secondary_node_ids
[clear]

## topic
Physiology

## subtopic
Cell Membrane and Transport

## microtopic


## nanotopic


## modules
MU-MED101

## module_subject
MU-MED101 > 00 Module-wide > 06 EOM Exams > Biochemistry and Physiology - Variant A > Cell Membrane and Transport

## article_ids
ART-MU101-MEMBRANE-615ED100

## related_article_ids


## related_concept_ids


## resource_ids
src_f63b294e2eeab7da0ff8

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
CLM-FND-C9AFF3319629E0

## resource_occurrence_ids
[clear]

## source_candidate_ids
[clear]

## original_wording
Nature of osmosis -> Is a passive process

## exam_signal
src_f63b294e2eeab7da0ff8 | paper | | p11 | MU-MED101

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
sourceCandidateIds: Searched via find-existing.mjs against live state and every pending batch, plus root-word greps across Kasr/Alexandria/Ain-Shams/Assiut/FOMSCU/Mansoura pending concept files, before minting -- no equivalent-fact match found.
mu: Tested as varA-biophys-q72 in "EOM Practice - Foundation 1 - Biochemistry and Physiology - Variant A.pdf" (mu_f63b294e2eeab7da0ff8), Biochemistry/Physiology continuation, p11, yellow-fill-highlight key.
