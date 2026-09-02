<!--
  AUN-MPT-104 -- new concepts minted from the "All Quizzes MPT 2022.pdf" quiz
  bank triage (coverage/AUN-MPT-104-triage.md, section S3b), Lectures 1-4
  (Introduction to Pathology; Introduction to Pharmacology; Cell injury its
  mechanism; Drug receptors, signaling mechanisms and drug action). Every
  canonical_key below was confirmed NEW by find-existing.mjs (live state +
  every docs/*-Source-Imports root + docs/import-ready) before minting; see
  coverage/AUN-MPT-104-triage.md for the search notes and the pending
  Kasr/Alexandria concepts reused instead of re-minted (in
  pending-live/AUN-MPT-104-quizzes-2022-*-concept.md).

  Teaching text is cited from the department's own Week 1 Lecture 1-4 slide
  decks (evidence/AUN-MPT-104-quizzes-2022-resources.md), which are the same
  lectures the quiz bank itself is drawn from -- several of these decks carry
  the identical practice questions, with printed answers, that appear in the
  quiz bank.

  Import: Admin > Concepts import.
-->

# Item

## id
CON-FND-07E9DC395BFC6B

## label
Pathology diagnoses a disease by what specimen is examined, at what scale -- cytological, histological, or gross

## canonical_key
teaching.pathology.diagnostic-methods.specimen-types

## aliases
Cytopathology
Histopathology
Gross pathology
Branches of pathological diagnosis
Levels of pathological examination

## arabic_label
طرق التشخيص المرضي حسب نوع العينة

## arabic_aliases
علم أمراض الخلايا
علم الأنسجة المرضي
الفحص العياني

## definition
Pathological diagnosis is organised by what is examined and at what scale. Cytological diagnosis (cytopathology) examines isolated cells shed or aspirated from the body -- exfoliated cells in sputum, urine or CSF, or a fine-needle aspirate -- and is used for screening and rapid sampling. Histopathological diagnosis examines a tissue specimen removed by a surgeon (a biopsy) under the microscope and is the definitive method for diagnosing most diseases, since it shows tissue architecture, not just individual cells. Gross (morphological) pathology is the naked-eye description of a diseased organ or specimen -- its size, shape, colour, cut surface and consistency -- read before any microscopic step. The three are complementary levels of the same diagnostic workflow, not competing methods.

## explicit_objective
Given a description of what was examined (isolated cells vs. a removed tissue specimen vs. naked-eye organ appearance), name the corresponding branch of pathological diagnosis.

## pitfalls
Confusing cytopathology with histopathology because both involve a microscope. The distinguishing fact is the specimen: cytopathology reads individual/isolated cells (a smear or fluid sample), while histopathology reads an intact piece of tissue with its architecture preserved (a biopsy).

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Introduction to Pathology

## subtopic
Diagnostic methods

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-INTRO-PATHOLOGY-AND-PHARMACOLOGY

## related_article_ids

## related_concept_ids
CON-FND-51391B298A6930
CON-FND-92DBCD0F0484C9
CON-FND-1B4EDB89A3A6D2

## resource_ids
src_791e29d6f1c310cf0cd4
src_3e62ae5ed2a35ed7211c

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.5

## exam_weight_by_year
AUN_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The diagnosis of disease by examination of isolated cells in body fluids is called: ... cytopathology" (Quiz 1, Q1); "The diagnosis of disease from the examination of tissue sections is called: ... histopathology" (Q2); "The observation of the pathological changes of organs or tissues by the naked eye is called: ... gross pathology" (Q3). Lecture 1 p.21 ("3- CYTOLOGICAL DIAGNOSIS (Cytopathology): Diagnosis of a disease by examination of isolated cells in body fluids"), p.23 ("4-HISTOPATHOLOGICAL DIAGNOSIS: Histological diagnosis is considered the definitive method to diagnose diseases by examination of the tissue removed by surgeons"), p.9-10 ("Lesions are examined both grossly (by the naked eye) and microscopically ... The gross description: includes changes in size, shape, colour, cut surface and consistency of the diseased organ").

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
sourceCandidateIds: find-existing.mjs run for "cytopathology", "histopathology" and "gross pathology" -- 0 hits each, safe to create.
relationships: paired in this batch with CON-FND-51391B298A6930 (prognosis vs pathogenesis, same lecture's vocabulary), CON-FND-92DBCD0F0484C9 (immunohistochemistry, a histopathology sub-technique) and CON-FND-1B4EDB89A3A6D2 (fixative, the specimen-handling step before histopathology). No typed-edge relations batch written this pass.

---

# Item

## id
CON-FND-51391B298A6930

## label
Prognosis predicts a disease's future course; pathogenesis explains the mechanism that produced its lesion

## canonical_key
teaching.pathology.disease-description.prognosis-vs-pathogenesis

## aliases
Prognosis
Pathogenesis
Fate of a disease
Disease-description vocabulary

## arabic_label
التشخيص المستقبلي والآلية المرضية

## arabic_aliases
الإنذار
التسبب المرضي

## definition
Prognosis is the prediction of how a patient's disease will progress -- its fate or outcome, whether regression (a good fate) or progression with complications (a bad fate). Pathogenesis is a different question entirely: it means the steps or mechanism by which the lesion of a disease is produced, i.e. how the disease came to cause the structural changes seen. Prognosis looks forward from the present state of disease; pathogenesis looks at the causal chain that produced that state. Both are distinct from etiology (the cause that started the process) and from a lesion itself (the morphologic change produced).

## explicit_objective
Distinguish "prognosis" (a forward-looking prediction of outcome) from "pathogenesis" (the backward-looking mechanism that produced the lesion), and place both against etiology and lesion in the same vocabulary set.

## pitfalls
Treating "pathogenesis" as a synonym for "etiology" (the cause) or for "prognosis" (the outcome) -- pathogenesis is specifically the mechanistic steps in between cause and lesion, not the cause itself and not what happens next.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Introduction to Pathology

## subtopic
Disease-description vocabulary

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-INTRO-PATHOLOGY-AND-PHARMACOLOGY

## related_article_ids

## related_concept_ids
CON-FND-07E9DC395BFC6B

## resource_ids
src_791e29d6f1c310cf0cd4
src_3e62ae5ed2a35ed7211c

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.5

## exam_weight_by_year
AUN_Y1=0.5

## clinical_relevance
0.4

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The prediction of how a patient's disease will progress is called: ... prognosis" (Quiz 1, Q4); "The steps or mechanisms of production of the lesion of a disease is termed: ... pathogenesis" (Q5). Lecture 1 p.9 ("*Pathogenesis of a disease: means the steps or mechanism of production of the lesion of that disease"), p.10 ("Prognosis: The prediction of how the patient's disease will progress ... Fate or outcome of the disease: Regression (good fate); Progression with complications (bad fate)").

## merge_ids

## rejected_merge_candidate_ids
CON-GYN-47D10105D082C2 (breast-cancer prognosis, a live clinical claim) and the several pending "pathogenesis of X disease" concepts (108-INT-concepts-pathology.md, ASU-INF-microbiology-concepts.md) -- all name a specific disease's own prognosis or pathogenesis, not the general vocabulary definitions this record teaches; not a merge candidate.

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
sourceCandidateIds: find-existing.mjs run for "prognosis" (8 hits, all named-disease prognosis facts, not this general vocabulary term) and "pathogenesis" (16 hits, same pattern) -- neither is a merge candidate.

---

# Item

## id
CON-FND-92DBCD0F0484C9

## label
Immunohistochemistry visualises specific antigens in tissue by linking an enzyme to an antibody against them

## canonical_key
teaching.pathology.diagnostic-methods.immunohistochemistry

## aliases
Immunoperoxidase technique
Antibody-enzyme tissue staining
IHC

## arabic_label
الكيمياء المناعية النسيجية

## arabic_aliases
تقنية الإنزيم المناعي البيروكسيدازي

## definition
Immunohistochemistry uses an antibody chemically linked to an enzyme (most commonly the immunoperoxidase technique) to bind and visualise a specific substance -- a cytoplasmic protein, enzyme or hormone -- within tissue sections. It is applied to tumour cells to detect tumour markers, letting a pathologist identify or subtype a neoplasm by what it expresses, beyond what routine histology alone can show.

## explicit_objective
State what immunohistochemistry links together (an enzyme to an antibody) and what it is used to detect in tissue sections (a specific antigen, commonly a tumour marker).

## pitfalls
Confusing immunohistochemistry with routine histopathology. Routine histology (H&E staining) shows general tissue architecture; immunohistochemistry is an add-on technique that reveals one specific molecule's location using an antibody-enzyme conjugate, most often to identify what a tumour is making or expressing.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Introduction to Pathology

## subtopic
Diagnostic methods

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-INTRO-PATHOLOGY-AND-PHARMACOLOGY

## related_article_ids

## related_concept_ids
CON-FND-07E9DC395BFC6B

## resource_ids
src_791e29d6f1c310cf0cd4
src_3e62ae5ed2a35ed7211c

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
0.9

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The use of antibodies linked chemically to enzymes to visualize specific substances in tissue sections using is called. ... Immunohistochemistry" (Quiz 1, Q6). Lecture 1 p.26 ("(immunohistochemistry): C- Immunoperoxidase technique. Can be utilized for detection of cytoplasmic proteins, enzymes and hormones in tumour cells (tumour markers)").

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
sourceCandidateIds: find-existing.mjs run for "immunohistochemistry" -- 0 hits, safe to create.

---

# Item

## id
CON-FND-1B4EDB89A3A6D2

## label
A specimen is placed in fixative (formalin 10% for tissue, alcohol for cytological smears) to prevent autolysis before examination

## canonical_key
teaching.pathology.specimen-handling.fixative-formalin

## aliases
Formalin fixation
Specimen fixation
Autolysis prevention

## arabic_label
تثبيت العينة بالفورمالين

## arabic_aliases
منع التحلل الذاتي للعينة

## definition
Fixation is the first handling step after a specimen is removed from the body: it preserves the specimen from decay and autolysis (self-digestion by the tissue's own enzymes after the blood supply is cut off) and stabilises tissue integrity for later histopathological examination. The standard fixative for tissue specimens is formaldehyde solution (formalin 10%); alcohol is used instead for cytological smears, which are thin cell layers rather than solid tissue blocks.

## explicit_objective
State why a removed specimen is placed in fixative (to prevent autolysis and preserve tissue for examination) and name the standard fixative for a tissue specimen (formalin 10%) versus a cytological smear (alcohol).

## pitfalls
Assuming any strength of formalin, or the wrong agent, is interchangeable. The teaching value is specifically formalin 10% for tissue blocks and alcohol for smears -- picking the wrong concentration or the wrong agent for the wrong specimen type is the tested distractor pattern.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Introduction to Pathology

## subtopic
Specimen handling

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-INTRO-PATHOLOGY-AND-PHARMACOLOGY

## related_article_ids

## related_concept_ids
CON-FND-07E9DC395BFC6B

## resource_ids
src_791e29d6f1c310cf0cd4
src_3e62ae5ed2a35ed7211c

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
0.9

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"To preserve specimen removed from the body from autolysis we add fixative to the tissue consists of: ... formalin 10%" (Quiz 1, Q7). Lecture 1 p.31 ("Why fixative: Fixation ... preserve specimen from decay & autolysis. Stabilise tissue integrity for histopathological examination ... What fixative: Formaldehyde (formalin). Alcohol for cytological smears").

## merge_ids

## rejected_merge_candidate_ids
The pending "Formalin converts the diphtheria AB exotoxin into an immunogenic toxoid" concept (ASU-INF-microbiology-concepts.md) -- a different use of formalin entirely (toxoid production, not specimen fixation); not a merge candidate.

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
sourceCandidateIds: find-existing.mjs run for "formalin" -- 5 hits, all the diphtheria-toxoid-conversion fact, a different use of formalin; not a merge candidate.

---

# Item

## id
CON-FND-28EDD1471279AF

## label
Rising intracellular calcium is the final common pathway that converts reversible cell injury into irreversible injury

## canonical_key
cell.injury.calcium-final-common-pathway

## aliases
Calcium-mediated cell injury
Irreversible cell injury mechanism
Calcium as final common pathway

## arabic_label
الكالسيوم كالمسار النهائي المشترك لإصابة الخلية

## arabic_aliases
آلية الإصابة الخلوية اللارجعية عبر الكالسيوم

## definition
Intracellular calcium is normally kept at extremely low levels by membrane energy-dependent transport. Ischaemia and toxins let calcium leak in across a damaged plasma membrane, and calcium is also released from the mitochondria and endoplasmic reticulum once those organelles are themselves injured, so cytosolic calcium rises. Once elevated, calcium activates a set of degradative enzymes: phospholipase (degrades membrane phospholipids, worsening membrane damage), proteases (break down cytoskeletal and other proteins), ATPase (further depletes ATP) and endonucleases (fragment nuclear chromatin). This calcium-driven enzyme cascade is what converts an injured but still-reversible cell into one with irreversible injury and death -- calcium influx is a marker and driver of irreversible injury, not merely an early or incidental finding.

## explicit_objective
Explain why rising intracellular calcium, once it activates phospholipases, proteases and endonucleases, marks the transition from reversible to irreversible cell injury, and identify calcium influx as the major mechanism of membrane damage in ischaemia.

## pitfalls
Treating calcium rise as just one item on a list of injury mechanisms alongside ATP depletion and free radicals, rather than recognising it as the shared downstream effector that those other mechanisms feed into -- ATP depletion itself raises calcium (by disabling the calcium-clearing pump), and it is calcium's own enzyme activation that then does the irreversible damage.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Cell injury its mechanism

## subtopic
Irreversible cell injury

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-INTRO-PATHOLOGY-AND-PHARMACOLOGY

## related_article_ids

## related_concept_ids
CON-FND-D53E254A82F334
CON-FND-375B9454502DE8

## resource_ids
src_5480a97e1b44bd2ffe20
src_3e62ae5ed2a35ed7211c

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.5

## exam_weight_by_year
AUN_Y1=0.5

## clinical_relevance
0.5

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Influx of which of the following ions plays a major role in irreversible cell injury: ... Calcium" (Quiz 3, Q2); "The major mechanism of plasma membrane damage in ischaemia is: ... Increased ca ions in the cytoplasm" (Q5). Lecture 3 p.13 ("3-Increased intracellular calcium -Calcium is maintained at extremely low levels by membrane energy dependent transport -Ischemia and toxins can cause calcium influx across plasma membrane or -Release from mitochondria and endoplasmic reticulum"), p.15 ("-Effects activates the following enzymes: a- phospholipase -----degrade membrane phospholipids; b- proteases---- breakdown protein; c-ATPase------ increase ATP depletion; d-endonucleases-------chromatin fragmentation").

## merge_ids

## rejected_merge_candidate_ids
CON-FND-375B9454502DE8 (ATP depletion mechanism, pending Kasr 108-INT) -- that record covers ATP depletion's own three consequences (sodium-pump failure/swelling, impaired protein synthesis, calcium rise as one downstream item) but stops at naming the calcium rise; it does not cover calcium's own further enzyme-activation cascade (phospholipase/protease/endonuclease) that this record teaches, so linked as a related concept rather than merged into. CON-FND-D53E254A82F334 (cell stress continuum: adaptation/reversible/irreversible) names the three-way outcome but not calcium's specific mechanistic role; also related, not merged.

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
sourceCandidateIds: find-existing.mjs run for "calcium influx cell injury", "calcium phospholipase membrane damage" and "intracellular calcium irreversible injury" -- 0 hits each, safe to create. Broader "cell injury" search returned CON-FND-D53E254A82F334 and CON-FND-375B9454502DE8 (both pending Kasr 108-INT), reused for Q1/Q4 of this same quiz via pending-live overlay rather than re-minted -- see pending-live/AUN-MPT-104-quizzes-2022-cell-injury-concept.md.
relationships: causes-chain with CON-FND-375B9454502DE8 (ATP depletion raises calcium) and downstream-of CON-FND-D53E254A82F334 (this is the mechanism inside "irreversible injury" on that continuum). No typed-edge relations batch written this pass.

---

# Item

## id
CON-FND-E639139712A3B5

## label
A drug's route of administration determines how completely it is absorbed and so the plasma concentration it achieves

## canonical_key
teaching.pharma.pharmacokinetics.absorption-route-serum-concentration

## aliases
Absorption and route of administration
Routes of drug administration
Bioavailability by route

## arabic_label
طرق إعطاء الدواء وتأثيرها على تركيزه بالدم

## arabic_aliases
الامتصاص وطرق إعطاء الدواء

## definition
Absorption -- the drug's movement from the site of administration into the bloodstream -- is the pharmacokinetic step most critical for achieving a therapeutic plasma drug concentration, since a drug that never reaches the blood in adequate amount cannot act however well it distributes, metabolises or is excreted afterward. Different routes deliver different fractions of the administered dose into circulation: intravenous administration bypasses absorption entirely (100% reaches the blood immediately), while oral administration is subject to incomplete absorption across the gut wall and first-pass hepatic metabolism before any drug reaches systemic circulation, giving oral the lowest achieved serum concentration among common routes (IV, intrathecal, intramuscular, oral) for an equivalent dose.

## explicit_objective
State that absorption is the pharmacokinetic step that determines whether a therapeutic plasma concentration is reached at all, and rank oral administration as giving the lowest serum concentration among IV/intrathecal/intramuscular/oral routes for an equivalent dose.

## pitfalls
Assuming all routes achieve comparable blood levels for the same dose. Oral administration in particular loses drug to incomplete gut absorption and first-pass hepatic metabolism before the drug ever reaches systemic circulation, which is why it is ranked lowest among the routes commonly compared in this teaching set.

## concept_type
mechanism

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Introduction to Pharmacology

## subtopic
Pharmacokinetics

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-INTRO-PATHOLOGY-AND-PHARMACOLOGY

## related_article_ids

## related_concept_ids
CON-FND-FD8AB71BE203B1
CON-FND-6BB35F11EBD54B

## resource_ids
src_153521a17aa9c4b71b04
src_3e62ae5ed2a35ed7211c

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.5

## exam_weight_by_year
AUN_Y1=0.5

## clinical_relevance
0.6

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
"Which of the following steps is most critical to achieve a therapeutic drug concentration in plasma? ... Absorption" (Quiz 2, Q1); "One of the following routes of medication administration would provide the lowest serum drug concentration? ... Oral" (Q9). Lecture 2 p.5 ("Pharmacokinetics: Is what the body does to the drug. The magnitude of the pharmacological effect of a drug depends on its concentration at the site of action. Absorption, Distribution, Metabolism, Excretion"), p.13 ("Routes of Drug Administration ... IV = intravenous = into the vein; PO = per os = oral; IM = intramuscular = into the muscle; SC = subcutaneous").

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
sourceCandidateIds: find-existing.mjs run for "oral bioavailability lowest serum" -- 0 hits, safe to create.

---

# Item

## id
CON-FND-1BF3F848420F8E

## label
Pharmacology is the study of drugs' actions and effects in living systems; a generic name is a drug's official, non-proprietary name

## canonical_key
teaching.pharma.vocabulary.definition-and-nomenclature

## aliases
Definition of pharmacology
Generic drug name
Drug nomenclature
Chemical, generic and brand names

## arabic_label
تعريف علم الأدوية وتسمية الأدوية

## arabic_aliases
الاسم العلمي للدواء

## definition
Pharmacology is the study of drugs, including their actions and effects in living systems -- distinct from pharmacy, which is the preparation and development of drugs, a different discipline. Every drug carries at least three kinds of name: a chemical name (a precise description of its chemical composition and molecular structure), a generic (also called approved or official) name -- the official drug name assigned to and approved by the local regulatory authority, not protected by any one company -- and a proprietary or brand/trade name used to market a specific manufacturer's product (e.g. diazepam is the generic name; Valium is one brand name for it).

## explicit_objective
Define pharmacology (the study of drugs' actions and effects) as distinct from pharmacy (drug preparation), and identify a drug's generic/official name as its regulator-approved non-proprietary name, distinct from its chemical name and its brand name.

## pitfalls
Confusing pharmacology with pharmacy, and confusing a drug's generic name with its brand name. A generic name is regulator-approved and not owned by any one company; a brand name is a specific manufacturer's trademarked marketing name for that same drug.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Introduction to Pharmacology

## subtopic
Vocabulary

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-INTRO-PATHOLOGY-AND-PHARMACOLOGY

## related_article_ids

## related_concept_ids
CON-FND-F468990E215745

## resource_ids
src_153521a17aa9c4b71b04
src_3e62ae5ed2a35ed7211c

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.5

## exam_weight_by_year
AUN_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The definition of pharmacology is: ... the study of drugs, including their actions and effects in living systems" (Quiz 2, Q7); "What is the approved (generic) name of a drug? ... The official drug name assigned by the manufacturer and approved by the local regulatory authority" (Q2). Lecture 2 p.12 ("Every drug has at least three names [a chemical, a generic and a proprietary (or trade) name] ... Chemical Name ... Generic Name diazepam ... Official Name diazepam, USP ... Brand Name Valium(R)").

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
sourceCandidateIds: find-existing.mjs run for "generic drug name" and "pharmacology definition" -- 0 hits each, safe to create.

---

# Item

## id
CON-FND-FD8AB71BE203B1

## label
Absorption, distribution, metabolism and excretion (ADME) is the standard sequence of pharmacokinetic phases a drug passes through

## canonical_key
teaching.pharma.pharmacokinetics.adme-sequence

## aliases
ADME sequence
Pharmacokinetic phases order

## arabic_label
تسلسل مراحل الحركية الدوائية

## arabic_aliases
الامتصاص والتوزيع والاستقلاب والإطراح

## definition
The most common sequence of pharmacokinetic phases a drug passes through, after administration, is absorption (entry into the bloodstream), distribution (movement from blood into tissues), metabolism (biotransformation, usually hepatic) and excretion (removal from the body, usually renal) -- abbreviated ADME. This is the standard order taught and tested for how a drug's course through the body is organised, distinct from listing "administration" itself, or steps like "disintegration" or "expiration", as if they were pharmacokinetic phases.

## explicit_objective
State the correct order of the four pharmacokinetic phases (absorption, distribution, metabolism, excretion) and reject distractor sequences that substitute non-pharmacokinetic steps (administration, disintegration, expiration) for one of the four.

## pitfalls
Accepting "administration" as if it were a pharmacokinetic phase. Administration is how the drug is given (the route); the four PK phases begin only once the drug starts moving through the body, starting with absorption.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Introduction to Pharmacology

## subtopic
Pharmacokinetics

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-INTRO-PATHOLOGY-AND-PHARMACOLOGY

## related_article_ids

## related_concept_ids
CON-FND-6BB35F11EBD54B
CON-FND-E639139712A3B5

## resource_ids
src_153521a17aa9c4b71b04
src_3e62ae5ed2a35ed7211c

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.5

## exam_weight_by_year
AUN_Y1=0.5

## clinical_relevance
0.3

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The most common sequence of pharmacokinetics phases a drug may pass through is: ... Absorption, distribution, metabolism and excretion." (Quiz 2, Q3). Lecture 2 p.20 ("The correct sequence of pharmacokinetic phases a drug may pass through is: ... d. absorption, distribution, metabolism and excretion"), p.5 ("Pharmacokinetics ... Absorption ... Distribution ... Metabolism ... Excretion").

## merge_ids

## rejected_merge_candidate_ids
CON-FND-6BB35F11EBD54B (pending Kasr 108-INT, "pharmacokinetics is what the body does to the drug; pharmacodynamics is what the drug does to the body") -- that record defines the PK/PD distinction itself but does not name or order the four ADME phases, which is what this record teaches; linked as a related concept and reused directly (via pending-live overlay) for the PK-vs-PD questions in this same quiz, not merged.

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
sourceCandidateIds: find-existing.mjs run for "pharmacokinetics phases" -- 0 hits, safe to create. "pharmacodynamics" search returned CON-FND-6BB35F11EBD54B (pending Kasr 108-INT), reused via pending-live overlay for Q4/Q5/Q6 of this same quiz rather than re-minted.

---

# Item

## id
CON-FND-F468990E215745

## label
Insulin is a drug obtained from both animal (originally bovine/porcine pancreas) and human/recombinant sources

## canonical_key
teaching.pharma.drug-sources.insulin-recombinant-and-animal

## aliases
Drug sources: animal, human, microbial, plant, mineral, synthetic
Insulin sourcing

## arabic_label
مصادر الأنسولين الحيوانية والبشرية

## arabic_aliases
مصادر الأدوية

## definition
Drugs are obtained from several kinds of source: plants (e.g. atropine), animals (e.g. thyroxine, and historically bovine/porcine insulin), microbes (e.g. insulin produced from E. coli or yeast by recombinant DNA technology), minerals (e.g. antacids) and fully synthetic chemistry. Insulin is the worked teaching example of a drug available from more than one source category at once -- both an animal-derived product and a human-sequence product made by recombinant microbial technology -- distinguishing it from single-source examples like morphine (a plant alkaloid) or cod liver oil (an animal-only product with no recombinant/human-sequence version).

## explicit_objective
Identify insulin as a drug obtained from both animal and human/recombinant sources, distinct from single-source drug examples.

## pitfalls
Assuming a drug has only one possible source category. Insulin specifically spans two of the standard source categories (animal and microbial/recombinant, itself producing a human-sequence molecule), which is the fact this teaching point isolates.

## concept_type
definition

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Introduction to Pharmacology

## subtopic
Drug sources

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-INTRO-PATHOLOGY-AND-PHARMACOLOGY

## related_article_ids

## related_concept_ids
CON-FND-1BF3F848420F8E

## resource_ids
src_153521a17aa9c4b71b04
src_3e62ae5ed2a35ed7211c

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
"Select the drug from both human and animal sources: ... insulin" (Quiz 2, Q8). Lecture 2 p.10 ("- Microbes e.g. Insulin from E. Coli or yeast by recombinant technology ... - Animals e.g. thyroxine ... - Plants e.g. atropine ... - Minerals e.g. Antiacids ... - Synthetics").

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
sourceCandidateIds: find-existing.mjs run for "insulin animal source" and "insulin animal human source" -- 0 hits each, safe to create.

---

# Item

## id
CON-FND-47418DE70D5CDC

## label
Drug receptors fall into four structural/signalling superfamilies -- ion-channel-linked, G-protein coupled, enzyme(tyrosine-kinase)-linked, and intracellular/nuclear -- each with a characteristic response time scale

## canonical_key
teaching.pharma.receptors.four-superfamilies-and-time-scale

## aliases
Four types of drug receptors
Receptor superfamilies
Ligand-gated ion channels
G-protein coupled receptors
Tyrosine-kinase-linked receptors
Intracellular receptors
hsp90 receptor chaperone

## arabic_label
الأنواع الأربعة لمستقبلات الأدوية

## arabic_aliases
المستقبلات المقترنة ببروتين جي
مستقبلات التيروزين كيناز
المستقبلات داخل الخلوية

## definition
Drug receptors are classified into four structural/signalling superfamilies, each acting on a characteristic time scale. (1) Ligand-gated ion channels (ionotropic receptors) are directly linked to an ion channel: ligand binding opens the channel within milliseconds, giving the fastest response -- e.g. nicotinic acetylcholine receptors (an exception among cholinergic receptors, since they act in milliseconds while most other receptor types act far slower) and glutamate, GABA, glycine and 5-HT3 receptors. (2) G-protein coupled receptors (metabotropic) act over seconds: ligand binding activates a G-protein that regulates an effector enzyme (e.g. adenylyl cyclase or phospholipase C), changing the concentration of a second messenger -- cAMP, cGMP, IP3, DAG or calcium are the well-established second messengers; GDP is not a second messenger, it is the inactive-state nucleotide bound to the G-protein's alpha subunit before activation. Muscarinic acetylcholine receptors and adrenergic receptors are both G-protein coupled. (3) Enzyme-linked (tyrosine-kinase-linked) receptors act over minutes: they are transmembrane proteins with an extracellular ligand-binding domain and a cytoplasmic domain with intrinsic enzymatic (tyrosine kinase) activity, the classic example being the insulin receptor -- ligand binding stimulates tyrosine kinase activity and phosphorylates target proteins, and the intracellular signal can outlast the ligand's own binding. (4) Intracellular (nuclear) receptors act over hours to days, the slowest and longest-lasting response: their ligands are lipid-soluble and cross the cell membrane directly (steroid hormones, thyroid hormone, vitamin D). In the resting state, heat shock protein 90 (hsp90) is bound to the receptor; when the lipid-soluble ligand binds, hsp90 dissociates and the receptor translocates to the nucleus to bind a DNA response element. Beyond their signalling role, receptor macromolecules themselves are drawn from several structural classes -- regulatory proteins, enzymes, transport proteins and structural proteins -- not exclusively dedicated "receptor" molecules.

## explicit_objective
Classify a described receptor (by its ligand, its signalling step, or its response time) into one of the four superfamilies, name each superfamily's characteristic time scale, identify GDP as not a second messenger, and state hsp90's role as the chaperone that dissociates from an intracellular receptor on ligand binding.

## pitfalls
Ranking receptor time scales by intuition rather than by mechanism -- ligand-gated ion channels are fastest (direct channel opening, milliseconds) because there is no intermediate signalling step, while intracellular receptors are slowest (hours-days) because the pathway requires ligand diffusion into the cell, hsp90 dissociation, nuclear translocation and new gene transcription. Also treating GDP as a second messenger because it appears in the same sentence as cAMP/IP3/DAG -- GDP is the G-protein's own resting-state ligand, not a downstream signal the G-protein produces.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Drug receptors, signaling mechanisms and drug action

## subtopic
Receptor superfamilies

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-DRUG-RECEPTORS

## related_article_ids

## related_concept_ids
CON-NEU-22613E658C5DB1
CON-FND-4388E0D8A75FD4
CON-FND-38CD8C0BD5B4DE

## resource_ids
src_05ccef123ba45f56d03d
src_3e62ae5ed2a35ed7211c

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.6

## exam_weight_by_year
AUN_Y1=0.6

## clinical_relevance
0.4

## academic_relevance
0.8

## weight_confidence
0.6

## confidence
0.9

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"All of the following receptors match with their time scale except: ... Nicotinic ACh receptor-----------------------Days" (Quiz 4, Q2, correct answer -- nicotinic ACh receptor is NOT a days-scale receptor, it is milliseconds, an ionotropic exception); "Muscarinic ACh receptors and adrenergic receptors are associated with which of the following? ... G-protein coupled receptors" (Q4); "Insulin at insulin receptor interacts with ... Receptor-activated tyrosine kinase" (Q7); "One of the following interact with ligand-gated ion channels: ... Glutamate" (Q9); "Tick the second messenger of G-protein-coupled (metabotropic)receptor: ... Camp" (Q11); "Which of the following is NOT a second messenger associated with G proteins? ... GDP" (Q12); "Which of the following signaling mechanisms can involve heat-shock protein (hsp90)? ... Intracellular receptors for lipid soluble ligands" (Q13); "With reference to drug receptors ... They include regulatory proteins, enzymes, transport proteins and structural proteins" (Q15). Lecture 4 p.10-11 ("Type of receptors: Ligand gated ion channels; G protein coupled receptors; Tyrosine Kinase linked receptors; Intracellular receptors ... A. ion channel linked (speedy) B. G protein linked (amplifier) C. enzyme linked (multiple actions) D. nuclear (gene) linked (long lasting)"), p.14 ("Ionotropic receptors (ligand-gated ion channel receptors): They are linked directly to ion channels ... Other receptors of this group are GABA receptors, 5HT3 receptors and glutamate receptors"), p.17 ("Well Established Second Messengers: Cyclic Adenosine Monophosphate (cAMP); Cyclic Guanosine Monophosphate (cGMP); Calcium; Phosphoinositides"), p.19 ("Tyrosine Kinase linked receptors as insulin ... stimulates the enzyme tyrosine kinase leading to phosphorylation of target proteins"), p.21 ("There is a protein called heat shock protein-90 (HSP-90) which is usually attached to the receptor in the absence of agonist. When the receptors are stimulated by these ligands, HSP-90 dissociates from the receptors. The receptors then translocate to the nucleus"), p.24 (printed answer key: "1. ... Answer b) GDP", "2. ... Answer c) G-protein coupled receptors").

## merge_ids

## rejected_merge_candidate_ids
CON-NEU-22613E658C5DB1 (pending Alexandria AU-MED-102, "Nicotinic receptors are ligand-gated ion channels found at the motor end-plate and in autonomic ganglia") -- names the same fact for the nicotinic receptor specifically but does not cover the other three superfamilies or the time-scale classification framework this record teaches; linked as a related concept and reused directly (via pending-live overlay) for the ionotropic-receptor-example question in this same quiz, not merged. CON-FND-4388E0D8A75FD4 (pending Kasr 108-INT, agonist/antagonist ligand types) and CON-FND-38CD8C0BD5B4DE (pending Kasr 108-INT, receptor/affinity definition) both concern what a ligand does at a receptor once bound, not the receptor's own structural classification; related, not merged.

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
sourceCandidateIds: find-existing.mjs run for "receptor time scale response", "muscarinic adrenergic G protein coupled", "insulin receptor tyrosine kinase", "receptor superfamilies transmembrane", "G-protein second messenger cAMP", "steroid receptor lipid soluble hsp90", "receptor macromolecule proteins", "four types of receptors", "enzyme-linked receptor" and "receptor classification" -- 0 hits each, safe to create. "ligand-gated ion channel" search returned CON-NEU-22613E658C5DB1 (pending Alexandria AU-MED-102) and a glossary term (108-INT-glossary.md), reused for the ionotropic-example question via pending-live overlay rather than re-minted.
crossModuleNote: this concept also answers the AUN-MPT-104 final exam's Q9 ("hsp90-chaperoned intracellular receptors for lipid-soluble ligands"), listed as one of the 38 "new" concepts identified but not minted in the first author lane's triage (coverage/AUN-MPT-104-triage.md, Q9 row) -- authored here per the second lane's dispatch instruction to mint once and let the final's matching row ride on it (see question/AUN-MPT-104-final-2022-q9-hsp90-mcq.md).
relationships: often_confused_with the second-messenger vs receptor-type distinction (a student who knows the four superfamilies still needs to separately recall which second messengers are "well established" -- this record states both). No typed-edge relations batch written this pass.
