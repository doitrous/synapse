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

---

# Item

## id
CON-FND-DE8DB40917BBE0

## label
A drug can reach its maximal tissue response while occupying only a fraction of its receptors -- the unoccupied ones are "spare"

## canonical_key
teaching.pharma.receptor.spare-receptors

## aliases
Spare receptors
Receptor reserve
Silent receptors

## arabic_label
المستقبلات الاحتياطية (الفائضة)

## arabic_aliases
احتياطي المستقبلات

## definition
Spare receptors exist when a tissue's maximal response (Emax) is reached with less than full receptor occupancy, so unoccupied receptors remain available as a reserve. This happens when the receptor number in a tissue exceeds what is needed to saturate the downstream signalling machinery at its own maximum -- once enough receptors are occupied to drive that machinery to its ceiling, occupying additional receptors adds nothing further to the response. The defining way spare receptors are detected experimentally is that the intracellular effect of the drug-receptor interaction lasts longer than the drug-receptor interaction itself, or equivalently that a tissue's measured EC50 for an agonist is lower than that same agonist's equilibrium dissociation constant (Kd) for the receptor -- full effect is reached before the receptor population is fully occupied.

## explicit_objective
Recognise spare receptors from the description that a drug's intracellular effect outlasts the drug-receptor binding itself, or from an EC50 lower than the receptor's Kd for the agonist.

## pitfalls
Assuming a tissue's maximal response requires 100% receptor occupancy -- spare receptor theory shows this is not always true, and many tissues reach Emax at well under full occupancy. Also assuming "spare" receptors are functionally irrelevant because they are unoccupied at Emax -- their presence is exactly what increases a tissue's apparent sensitivity to an agonist, shifting EC50 below Kd.

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
Receptor Regulation and Variation in Drug Responsiveness

## subtopic
Spare receptors

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-RECEPTOR-VARIATION-ADR-TRANSPORT

## related_article_ids

## related_concept_ids
CON-FND-17149EED384DCA
CON-FND-38CD8C0BD5B4DE

## resource_ids
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
0.2

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following statements about spare receptors is most correct? ... Spare receptors will be detected if the intracellular effect of drug-receptor interaction lasts longer than the drug-receptor interaction itself" (Quiz 6, Q1, printed correct answer).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
This is a Katzung-style pharmacodynamics vignette; the department's own Lecture 6 slide deck (src_aaf88a7a6d5e696214b3, pp.1-21, fully read) does not contain the term "spare receptor" anywhere in its text, so the quiz bank's own printed-answer text is this concept's only available source rather than a lecture-deck citation like its siblings.

## evidence_gaps
Evidence must be attached before publication. No department lecture-deck source found for this specific term (see uncertainty) -- worth flagging to Omar in case a supplementary reading or textbook chapter for Lecture 6 exists outside the scanned corpus.

## owner
Claude

## reviewer
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
sourceCandidateIds: find-existing.mjs run for "spare receptor" and "receptor reserve" -- 0 hits each, safe to create.
relationships: related to CON-FND-17149EED384DCA (efficacy vs potency) and CON-FND-38CD8C0BD5B4DE (affinity) -- spare-receptor theory refines both by showing occupancy and effect are not linearly tied. No typed-edge relations batch written this pass.

---

# Item

## id
CON-FND-EB925681CC1A5C

## label
Continued agonist exposure down-regulates a tissue's receptors (desensitisation); continued antagonist exposure up-regulates them (supersensitivity)

## canonical_key
teaching.pharma.receptor.up-and-down-regulation

## aliases
Receptor down-regulation
Receptor up-regulation
Receptor desensitisation
Receptor supersensitivity

## arabic_label
التنظيم التصاعدي والتنازلي للمستقبلات

## arabic_aliases
إزالة حساسية المستقبل
فرط حساسية المستقبل

## definition
Both the number and the effectiveness of a tissue's receptors are controlled by regulatory factors that change with sustained drug exposure. Receptor down-regulation is continued stimulation by an agonist leading to desensitisation: repeated use of beta-agonists in bronchial asthma, for example, produces a diminished response from a fall in the number of available receptors, through decreased signal sensitivity, feedback regulation of receptor synthesis, or decreased receptor effectiveness. Receptor up-regulation is the opposite process: long-term exposure of cells to an antagonist frequently produces hyperactivity or supersensitivity of the receptors, because prolonged antagonist contact drives synthesis of new receptors. This is why abrupt withdrawal of a chronically-taken beta-antagonist can precipitate worsening angina or cardiac dysrhythmias -- the newly up-regulated receptor population is suddenly exposed to endogenous agonist with nothing left to block it.

## explicit_objective
State that chronic agonist exposure down-regulates receptors (desensitisation) while chronic antagonist exposure up-regulates them (supersensitivity), and explain the beta-blocker withdrawal example as the clinical consequence of up-regulation.

## pitfalls
Reversing which direction of exposure produces which regulation direction -- it is intuitive to expect antagonist exposure to also reduce receptor activity, but chronic antagonism instead produces compensatory up-regulation, the opposite of what agonist exposure does. Also assuming the danger of abruptly stopping a chronic antagonist comes from the antagonist itself, when it in fact comes from the up-regulated receptor population it leaves behind, suddenly unblocked.

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
Receptor Regulation and Variation in Drug Responsiveness

## subtopic
Receptor up- and down-regulation

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-RECEPTOR-VARIATION-ADR-TRANSPORT

## related_article_ids

## related_concept_ids
CON-FND-A1E2092A49359C

## resource_ids
src_aaf88a7a6d5e696214b3
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
"Receptor down-regulation = continued stimulation by an agonist leads to desensitization. For eg., repeated use of beta-agonists in bronchial asthma leads to diminished response due to a decrease in the number of Rs... Receptor up-regulation = long-term exposure of cells to antagonists frequently leads to hyperactivity or super sensitivity to Rs" (Lecture 6, p.11); "abrupt withdrawal of a beta-antagonist leads to worsening of angina pectoris or cardiac dysrythmias in some patients. This is because prolonged contact of beta-Rs with the antagonist results in synthesis of new Rs" (p.12). Quiz bank printed answer: "Regarding receptor up regulation, one of the following statements is true: ... It occurs after chronic administration of an antagonist" (Quiz 6, Q7).

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
sourceCandidateIds: find-existing.mjs run for "receptor up-regulation", "receptor down-regulation" and "receptor desensitization" -- 0 hits each, safe to create.
relationships: related to CON-FND-A1E2092A49359C (chemical/physiological antagonism), same lecture's antagonism teaching. No typed-edge relations batch written this pass.

---

# Item

## id
CON-FND-18F93F68713FEF

## label
Tachyphylaxis is a rapid loss of drug response after the first or first few doses, distinct from gradual tolerance

## canonical_key
teaching.pharma.tolerance.tachyphylaxis

## aliases
Tachyphylaxis
Acute tolerance
Rapid drug desensitisation

## arabic_label
تسرع التعود (تاكيفيلاكسيس)

## arabic_aliases
فقدان سريع لفعالية الدواء

## definition
Drug tolerance is a decrease in the intensity of response upon repeated administration of a drug during a course of treatment. When this decrease occurs rapidly -- after the first dose or after only a few doses -- it is specifically called tachyphylaxis, distinguishing it from ordinary (chronic) tolerance, which develops gradually over a longer course of repeated dosing. A clinical worked example is calcitonin used for severe hypercalcaemia: calcitonin lowers serum calcium quickly, but its effect fades within 2-3 days of repeated dosing (tachyphylaxis), so a bisphosphonate -- which takes 2-3 days to become effective but does not tachyphylax -- is started simultaneously, so that it takes over calcium control as the calcitonin's effect wears off.

## explicit_objective
Define tachyphylaxis as a rapid decrease in drug response after repeated administration, distinct from gradual tolerance, and apply it to a clinical example such as calcitonin in hypercalcaemia.

## pitfalls
Confusing tachyphylaxis (rapid, evident within the first few doses) with ordinary tolerance (gradual, over a longer course of repeated dosing) -- both are a fall in response with repeated dosing, but the timescale is the distinguishing fact tested. Also misreading an "increased" response option as tachyphylaxis, when the definition is specifically a decrease.

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
Adverse drug reaction

## subtopic
Tachyphylaxis and tolerance

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-RECEPTOR-VARIATION-ADR-TRANSPORT

## related_article_ids

## related_concept_ids
CON-FND-5A06E7B21A762A

## resource_ids
src_0c1c461395b2ab03cb43
src_aaf88a7a6d5e696214b3
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
"This means the decrease in intensity of response upon repeated administration of a drug during the course of ttt. When this occurs rapidly after the first or few doses of drug administration, it is called 'Tachyphylaxis'" (Lecture 6, p.14). Quiz bank printed answer: "Tachyphylaxis refers to which of the following? ... Responsiveness decreased rapidly after administration of a drug" (Quiz 8, Q3); calcitonin vignette (Quiz 8, Q9): "calcitonin alone is insufficient because it is known to rapidly and suddenly lose its effectiveness within 2 to 3 days of repeated dosing ... What is the term for the rapid decrease in response to calcitonin? ... Tachyphylaxis."

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
sourceCandidateIds: find-existing.mjs run for "tachyphylaxis" -- 2 hits, both glossary terms (docs/import-ready/glossary/108-INT-glossary.md, docs/Kasr-Source-Imports/glossary/108-INT-glossary.md), not a concept record; safe to create this concept alongside the existing glossary term rather than a duplicate glossary entry.
relationships: related to CON-FND-5A06E7B21A762A (hyperreactive/idiosyncratic/hypersensitive vocabulary), same lecture's variation-in-response teaching. No typed-edge relations batch written this pass.

---

# Item

## id
CON-FND-5A06E7B21A762A

## label
Hyperreactive/hyporeactive describe quantitative variation in drug response; idiosyncrasy is genetically determined; hypersensitivity is immunological -- the three are not interchangeable

## canonical_key
teaching.pharma.adr.response-variation-vocabulary

## aliases
Hyperreactive
Hyporeactive
Idiosyncratic drug response
Hypersensitivity (drug allergy)

## arabic_label
مفردات تباين الاستجابة الدوائية بين الأفراد

## arabic_aliases
فرط التفاعل الدوائي
الاستجابة الشاذة (الخصوصية)
فرط الحساسية الدوائية

## definition
Individuals vary in their response to a standard drug dose in two conceptually distinct ways. Quantitative variation -- more common and more clinically important -- describes an individual as hyporeactive (showing less response than expected) or hyperreactive (showing an increased intensity of response) to the same dose most people receive. Idiosyncrasy is a different, qualitative kind of variation: an idiosyncratic response is one that is qualitatively different from most individuals' response, caused by genetic differences in drug metabolism or receptor structure -- the classic example is prolonged apnoea after succinylcholine in a patient with an inherited abnormal (atypical) pseudocholinesterase, who cannot hydrolyse the drug at the normal rate. "Hyporeactive/hyperreactive" should never be substituted for "hyposensitive/hypersensitive": the latter pair names a third, separate mechanism -- an allergic or immunological response to the drug -- not a quantitative or genetic one.

## explicit_objective
Distinguish hyperreactive (quantitative, an increased intensity of response to a standard dose), idiosyncratic (qualitative, genetically determined), and hypersensitive (immunological/allergic) as three separate mechanisms of individual variation in drug response.

## pitfalls
Treating "hypersensitive" and "hyperreactive" as synonyms because they sound alike -- they name different mechanisms (immunological/allergic versus quantitative dose-response variation) and the distinction is explicitly taught as one not to blur. Also assuming every unexpected or exaggerated drug reaction must be idiosyncratic, when many are simply quantitative (hyper- or hyporeactive) variation around an otherwise normal dose-response relationship.

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
Adverse drug reaction

## subtopic
Variation in drug responses

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-RECEPTOR-VARIATION-ADR-TRANSPORT

## related_article_ids

## related_concept_ids
CON-FND-18F93F68713FEF

## resource_ids
src_0c1c461395b2ab03cb43
src_aaf88a7a6d5e696214b3
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
0.6

## weight_confidence
0.5

## confidence
0.9

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Some individuals exhibit 'ideosyncratic' response which is frequently qualitatively different from most individuals, due to genetic differences in drug metabolism... Some are hyporeactive (showing less response) or hyperreactive. Hypo- & hypersensitivity should not be used instead of hypo- or hyperreactivity, since the former refer to allergic or immunological response to drugs" (Lecture 6, p.13); idiosyncrasy examples including succinylcholine/pseudocholinesterase (Lecture 8, p.14). Quiz bank printed answer: "Which of the following refers to an increased intensity of response to a drug? ... Hyperreactive" (Quiz 8, Q4).

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
sourceCandidateIds: find-existing.mjs run for "hyperreactive idiosyncratic" and "hypersensitive tolerance" -- 0 hits each, safe to create.
relationships: related to CON-FND-18F93F68713FEF (tachyphylaxis), same lecture's variation-in-response teaching. No typed-edge relations batch written this pass.

---

# Item

## id
CON-FND-3FA9935F6B0949

## label
Beyond passive diffusion and carrier-mediated transport, drugs also cross membranes by filtration and pinocytosis; MRP and SLC are named transporters for renal excretion and neurotransmitter uptake

## canonical_key
teaching.pharma.membrane.filtration-pinocytosis-and-named-transporters

## aliases
Filtration (drug absorption)
Pinocytosis (drug absorption)
MRP transporter
SLC transporter

## arabic_label
الترشيح والاحتساء الخلوي وناقلات الأدوية المسماة

## arabic_aliases
الترشيح
الاحتساء الخلوي (البلعمة السائلة)

## definition
Beyond passive diffusion (small, lipid-soluble, non-ionised molecules dissolving through the lipid bilayer) and carrier-mediated transport (facilitated diffusion or active transport, both requiring a protein carrier), two further mechanisms move substances across membranes. Filtration moves small, water-soluble drugs through aqueous membrane pores or paracellular channels, carried along with bulk water flow rather than dissolving through lipid. Pinocytosis engulfs fluid together with dissolved or particulate substances by membrane invagination, forming a vesicle that carries the material into the cell -- iron is the worked pharmacokinetic example of a substance absorbed mainly by this route. Alongside these routes, specific named transporter proteins move particular substrates in a defined direction: MRP (multidrug resistance-associated protein) is responsible for excreting some drugs into the urine at the renal tubule, while SLC (solute carrier) transporters are responsible for the cellular uptake of some neurotransmitters, such as at a presynaptic nerve terminal.

## explicit_objective
Name filtration and pinocytosis as membrane-crossing mechanisms distinct from passive diffusion and carrier-mediated transport, with their typical substrates (small water-soluble drugs; iron, respectively), and identify MRP and SLC as named transporter proteins for renal drug excretion and neurotransmitter uptake respectively.

## pitfalls
Assuming every "carrier-mediated" process shares one generic mechanism -- MRP and SLC are specific, differently-directed transporter families (excretion out of the body versus uptake into a cell), not interchangeable generic carriers. Also confusing filtration (passive, driven by a concentration or pressure gradient through pores, no carrier) with active transport (energy-dependent, carrier-driven, saturable) -- both move water-soluble substances, but by different mechanisms.

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
Pharmacokinetics 1 (Absorption & distribution)

## subtopic
Absorption and transport mechanisms

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-RECEPTOR-VARIATION-ADR-TRANSPORT

## related_article_ids

## related_concept_ids
CON-FND-584FCF6897C35E
CON-FND-9D7D3A5B015805

## resource_ids
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
"Water soluble drugs are absorbed mainly by: ... Filtration" (Quiz 10, Q10); "Iron is absorbed mainly by: ... Pinocytosis" (Q11); "The transporter protein which responsible for the excretion of some drugs into the urine is: ... MRP" (Q5); "The transporter protein which responsible for the uptake of some neurotransmitters is: ... SLC" (Q8) -- all printed correct answers, `All Quizzes MPT 2022.pdf` Quiz 10.

## merge_ids

## rejected_merge_candidate_ids
CON-FND-584FCF6897C35E (pending Kasr 108-INT, simple diffusion) and CON-FND-9D7D3A5B015805 (pending Kasr 108-INT, carrier-mediated transport) both concern membrane-crossing mechanisms but neither names filtration, pinocytosis, MRP or SLC specifically; related, not merged. A 101-ISK cell-biology concept ("The membrane takes material in by phagocytosis, pinocytosis or receptor-mediated endocytosis, and puts it out by exocytosis") also names pinocytosis, but as a general cell-biology transport process, not in the specific pharmacokinetic context (drug/iron absorption) this record teaches; not a merge candidate.

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source found for Lecture 9 or Lecture 10 in the corpus (only Lectures 1-8 exist as separate slide-deck PDFs) -- the quiz bank's own printed-answer text is this concept's only available source.

## evidence_gaps
Evidence must be attached before publication. No department lecture-deck source for Lecture 10 exists in the corpus -- worth flagging to Omar in case one exists outside the scanned material.

## owner
Claude

## reviewer
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
sourceCandidateIds: find-existing.mjs run for "MRP transporter", "SLC transporter", "filtration aqueous pores" -- 0 hits each; "pinocytosis" returned only the unrelated 101-ISK cell-biology concept (general membrane transport, not pharmacokinetic drug absorption), documented above as not a merge candidate.
relationships: related to CON-FND-584FCF6897C35E (simple diffusion) and CON-FND-9D7D3A5B015805 (carrier-mediated transport), same lecture's absorption-mechanism teaching. No typed-edge relations batch written this pass.

---

# Item

## id
CON-FND-8E5F8C2923A89F

## label
Agenesis is the complete congenital absence of an organ, distinct from the four adaptive cellular responses

## canonical_key
pathology.congenital.agenesis-complete-organ-absence

## aliases
Agenesis
Aplasia (developmental, contrast)
Hypoplasia (developmental, contrast)

## arabic_label
انعدام التخلق (الغياب الخلقي التام للعضو)

## arabic_aliases
انعدام التخلق
قلة التنسج

## definition
Agenesis is the complete congenital failure of an organ to form during development, so the organ is entirely absent at birth. It is a developmental anomaly, not one of the four adaptive cellular responses (hypertrophy, hyperplasia, atrophy, metaplasia) that an already-formed cell population undergoes in response to a physiological or pathological stressor -- an organ that never formed cannot be described as having "adapted." Agenesis is distinguished from aplasia (the organ's primordium forms but fails to develop further, leaving only a rudimentary remnant) and hypoplasia (the organ forms but remains underdeveloped and smaller than normal), which are lesser degrees along the same developmental-failure spectrum.

## explicit_objective
Identify agenesis as complete congenital absence of an organ, and distinguish it from the four adaptive cellular responses and from aplasia/hypoplasia.

## pitfalls
Confusing agenesis with atrophy -- atrophy is shrinkage of an organ/tissue that had previously formed and grown normally, in response to disuse, reduced workload, or reduced hormonal/nervous stimulation, while agenesis means the organ never formed at all. Also treating agenesis, aplasia and hypoplasia as synonyms, when they name different degrees of developmental failure (complete absence; primordium only; underdevelopment).

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
Cellular adaptation 1

## subtopic
Developmental anomalies of organ formation

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CELLULAR-ADAPTATION-GAPS

## related_article_ids

## related_concept_ids
CON-FND-DF726F864C8BC3

## resource_ids
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
"Complete absence of an organ is called: ... Agenesis" (Quiz 11, Q1, `All Quizzes MPT 2022.pdf` p.46).

## merge_ids

## rejected_merge_candidate_ids
CON-FND-DF726F864C8BC3 (pending Kasr 108-INT, "Adaptation takes four forms: hypertrophy, hyperplasia, atrophy and metaplasia") names the department's own textbook list of adaptive responses, which explicitly does not include agenesis -- agenesis is complete failure of organ formation during development, not an adaptive change of an already-formed cell population; related, not merged.

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 11 in the corpus (only Lectures 1-8 exist as separate slide decks) -- the quiz bank's own printed-answer text is this concept's only available source, the same gap already documented for the Lecture 9-10 concepts above.

## evidence_gaps
Evidence must be attached before publication. No department lecture-deck source for Lecture 11 exists in the corpus -- worth flagging to Omar in case one exists outside the scanned material.

## owner
Claude

## reviewer
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
sourceCandidateIds: find-existing.mjs run for "agenesis" -- 0 true hits (the only match was a false-positive substring inside "mutagenesis"); safe to create.
relationships: related to CON-FND-DF726F864C8BC3 (pending Kasr 108-INT cell-adaptation concept), same Lecture 11 quiz. No typed-edge relations batch written this pass.

---

# Item

## id
CON-FND-27A9BC30BFB2C2

## label
FDA pregnancy risk categories (A-X) rank a drug's fetal risk against its clinical benefit, from no demonstrated risk to risk that always outweighs benefit

## canonical_key
teaching.pharma.posology.fda-pregnancy-categories

## aliases
FDA pregnancy category
Pregnancy category D
Pregnancy category X
Teratogenic risk classification

## arabic_label
تصنيف إدارة الغذاء والدواء الأمريكية لمخاطر الحمل

## arabic_aliases
فئة الحمل D
فئة الحمل X

## definition
The FDA's letter system (A, B, C, D, X) classifies a drug by the balance between its documented risk to the fetus and its potential clinical benefit to the mother, ranked from least to most concerning. Category D means fetal risk has been demonstrated (from animal studies, human studies, or post-marketing experience), but the drug may still be justified in certain circumstances because its potential benefit could outweigh that risk -- for example, a serious maternal illness with no safer alternative. Category X means fetal risk has been demonstrated and that risk outweighs any possible benefit to the mother under any circumstance, so category X drugs are contraindicated in pregnancy. Categories A, B and C progressively describe less certain or less severe risk, without either D's justified-use exception or X's absolute contraindication.

## explicit_objective
State the practical prescribing consequence of FDA pregnancy category D (may be used if benefit outweighs risk in certain circumstances) versus category X (contraindicated; risk always outweighs benefit).

## pitfalls
Treating D and X as differing only in "how bad" the demonstrated risk is, when the real distinction that matters clinically is the prescribing decision: category D still permits use in some circumstances, while category X is an absolute contraindication in pregnancy.

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
Pharmacokinetics variables 1

## subtopic
Pregnancy risk classification

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-PREGNANCY-DRUG-CATEGORIES

## related_article_ids

## related_concept_ids

## resource_ids
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
"A drug has been classified under \"D\" in FDA pregnancy categories? What would be the consequences of using that drug? ... Fetal risk has been demonstrated, in certain circumstances benefits could outweighs the risk." (Quiz 14, Q1, `All Quizzes MPT 2022.pdf` p.54); "A drug has been classified under \"X\" in FDA pregnancy categories? ... Fetal risk has been demonstrated, the risk outweighs any possible benefit to the mother." (Quiz 14, Q10, p.57).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 14 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "FDA pregnancy category" and "pregnancy category D" -- 0 hits, safe to create.

---

# Item

## id
CON-FND-BA06C8C3B76102

## label
Acute inflammation's vascular response is a brief vasoconstriction followed by vasodilatation and increased capillary permeability, producing the protein-rich fluid exudate

## canonical_key
teaching.pathology.inflammation.vascular-response-sequence

## aliases
Vascular response in acute inflammation
Increased vascular permeability
Fluid exudate formation
Hyperaemia of acute inflammation

## arabic_label
الاستجابة الوعائية في الالتهاب الحاد

## arabic_aliases
زيادة النفاذية الوعائية
الإفراز الالتهابي

## definition
When tissue is injured, the arterioles supplying it first undergo a brief, transient vasoconstriction -- the very first vascular response, lasting only seconds. This is immediately followed by vasodilatation (mediated chemically, chiefly by histamine), which increases blood flow to the area (hyperaemia) and produces the redness and heat of acute inflammation. Vasodilatation is accompanied by increased permeability of the capillary and venule walls, which lets protein-rich plasma leak into the interstitial tissue as an inflammatory exudate -- distinguished from a low-protein transudate precisely by that higher protein content, since normal, less-permeable capillary walls do not let plasma protein through in the same way. The net clinical picture of this vascular phase is hyperaemia together with localised oedema.

## explicit_objective
Sequence the vascular response of acute inflammation (transient vasoconstriction, then vasodilatation, then increased permeability with exudation) and state histamine's role and the reason the exudate is protein-rich.

## pitfalls
Assuming vasodilatation is the very first vascular event in acute inflammation -- a brief vasoconstriction precedes it. Also assuming the exudate's high protein content comes from breakdown of tissue cells, when it is explained instead by increased capillary-wall permeability letting plasma protein escape.

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
Inflammation: definition and causes

## subtopic
Vascular events of acute inflammation

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ACUTE-INFLAMMATION-VASCULAR-MEDIATORS

## related_article_ids

## related_concept_ids
CON-FND-11BD591A50EB8E
CON-FND-01FE2E5920BF31

## resource_ids
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
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Histamine is: ... Is the cause of increased vascular permeability" (Quiz 15, Q1, `All Quizzes MPT 2022.pdf` p.58); "In acute inflammation the exudate has a higher protein content than normal tissue fluid chiefly because: ... Capillary walls are more permeable" (Q2); "What is the first response of arterioles to injury in acute inflammation? ... Vasoconstriction" (Q3, p.59); "Which factor is involved in the formation of inflammatory fluid exudate: ... Increased vascular permeability" (Q4); "Which of the following is a feature of acute inflammation? ... Hyperaemia and localized oedema" (Q5); "Which is Not an effect of chemical mediator: ... Vasoconstriction" (Quiz 17, Q1, p.64).

## merge_ids

## rejected_merge_candidate_ids
CON-IMM-0F12EDB7C7CC8E (live, "Inflammation produces vasodilation, increased vascular permeability, and leukocyte migration") is a general microbiology-course statement of the same three events, university kau, not yet published and carrying no vasoconstriction step or exudate-versus-transudate reasoning; related but pitched at a different course's grain, so a new AUN-MPT-104 record was minted instead of overlaying onto it.

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lectures 15 or 17 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "vascular permeability" (live hit CON-IMM-0F12EDB7C7CC8E, documented above as not merged) and "acute inflammation vasoconstriction" -- 0 further hits.
relationships: related to CON-FND-11BD591A50EB8E (chemical mediators) and CON-FND-01FE2E5920BF31 (chemotaxis), same Lecture 15/17 quizzes. No typed-edge relations batch written this pass.

---

# Item

## id
CON-FND-11BD591A50EB8E

## label
Histamine, bradykinin and vasoactive amines are chemical mediators of acute inflammation; growth factors are not one of them

## canonical_key
teaching.pathology.inflammation.chemical-mediators

## aliases
Chemical mediators of inflammation
Vasoactive amines

## arabic_label
الوسائط الكيميائية للالتهاب

## arabic_aliases
الوسائط الكيميائية للالتهاب

## definition
Acute inflammation is driven by a defined set of chemical mediators released from cells or generated from plasma proteins at the site of injury -- histamine, bradykinin and other vasoactive amines chief among them. These mediators cause vasodilatation, increased vascular permeability and chemotaxis of leukocytes toward the injured area. Growth factors, by contrast, are proteins that stimulate cell proliferation and are central to the later repair phase that follows inflammation, not to the acute mediator cascade itself -- they are not counted among the chemical mediators of acute inflammation.

## explicit_objective
List histamine, bradykinin and vasoactive amines as chemical mediators of acute inflammation, and exclude growth factors from that list.

## pitfalls
Assuming every substance active anywhere in the injury-inflammation-repair continuum is a "chemical mediator" of acute inflammation -- growth factors act later, in tissue repair, and are not part of the acute mediator group.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Acute inflammation: mechanisms and formation of fluid exudate

## subtopic
Chemical mediators

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ACUTE-INFLAMMATION-VASCULAR-MEDIATORS

## related_article_ids

## related_concept_ids
CON-FND-BA06C8C3B76102
CON-FND-01FE2E5920BF31

## resource_ids
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
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of The following is not a chemical mediator: ... Growth factors" (Quiz 17, Q2, `All Quizzes MPT 2022.pdf` p.64).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 17 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "chemical mediators of inflammation" and "growth factors inflammation" -- no exact-fact hits beyond the general CON-IMM-0F12EDB7C7CC8E record already documented on the vascular-response concept above.
relationships: related to CON-FND-BA06C8C3B76102 (vascular response) and CON-FND-01FE2E5920BF31 (chemotaxis), same Lecture 15/17 quizzes. No typed-edge relations batch written this pass.

---

# Item

## id
CON-FND-01FE2E5920BF31

## label
Chemotaxis is the directed movement of leukocytes toward a chemical stimulus at the site of injury or infection

## canonical_key
teaching.pathology.inflammation.chemotaxis-definition

## aliases
Chemotaxis
Directed leukocyte migration

## arabic_label
الانجذاب الكيميائي (الكيموتاكسيس)

## arabic_aliases
الانجذاب الكيميائي

## definition
Chemotaxis is the directed (unidirectional) locomotion of leukocytes along a chemical gradient, toward a particular organism or irritant at the site of tissue injury or infection. It is what brings phagocytic cells from the vasculature to the actual site of injury after they have already marginated along and emigrated through the vessel wall, and it is triggered by chemotactic chemical mediators released at that site.

## explicit_objective
Define chemotaxis as the directed movement of leukocytes toward an irritant/organism, distinct from margination, exudation and transudation.

## pitfalls
Confusing chemotaxis (directed leukocyte movement toward a chemical stimulus) with margination (leukocytes lining up along the vessel wall, an earlier step) or with exudation/transudation (fluid movement, not cell movement).

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
Acute inflammation: mechanisms and formation of fluid exudate

## subtopic
Leukocyte recruitment

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ACUTE-INFLAMMATION-VASCULAR-MEDIATORS

## related_article_ids

## related_concept_ids
CON-FND-BA06C8C3B76102
CON-FND-11BD591A50EB8E

## resource_ids
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
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"In acute inflammation, the directed movement of leukocytes towards a particular organism (irritant) is called: ... Chemotaxis" (Quiz 17, Q3, `All Quizzes MPT 2022.pdf` p.65).

## merge_ids

## rejected_merge_candidate_ids
docs/Kasr-Source-Imports/concept/208-INT-concepts.md carries a pending, more detailed leukocyte-recruitment-sequence concept (margination/rolling, pavementing/adhesion, emigration, chemotaxis) for a different module (208-INT); that record teaches the full multi-step sequence, this one teaches only the chemotaxis definition step tested by this quiz item -- different grain, and chaining a third pending module's apply-order into this lane was judged not worth it for one definitional fact; not merged.

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 17 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "chemotaxis" -- hits documented above (208-INT pending, not merged); "directed leukocyte migration" -- 0 further hits.
relationships: related to CON-FND-BA06C8C3B76102 (vascular response) and CON-FND-11BD591A50EB8E (chemical mediators), same Lecture 15/17 quizzes. No typed-edge relations batch written this pass.

---

# Item

## id
CON-FND-8D4CB02987AB8A

## label
Acetylcholine activates both muscarinic and nicotinic receptors; noradrenaline activates adrenergic receptors -- the two transmitter-receptor systems do not cross over

## canonical_key
teaching.pharmacology.ans.acetylcholine-vs-noradrenaline-receptor-specificity

## aliases
Acetylcholine receptor specificity
Cholinergic vs adrenergic transmitter-receptor pairing

## arabic_label

## arabic_aliases

## definition
Acetylcholine (ACh) is the transmitter of the cholinergic system and activates both muscarinic and nicotinic receptors -- muscarinic receptors at postganglionic parasympathetic (and select sympathetic) effector junctions, nicotinic receptors at every autonomic ganglion and the skeletal neuromuscular junction. Noradrenaline is the transmitter of the adrenergic system and activates adrenergic (alpha/beta) receptors instead. Neither transmitter activates the other system's receptors, so a statement pairing acetylcholine with an adrenergic receptor, or noradrenaline with a muscarinic receptor, is always wrong. Sympathetic activation itself raises, not drops, blood pressure (via alpha-1-mediated vasoconstriction and beta-1-mediated cardiac stimulation), which is a separate error some distractors make.

## explicit_objective
State that acetylcholine activates muscarinic and nicotinic receptors while noradrenaline activates adrenergic receptors, with no cross-over between the two systems, and that sympathetic activation raises rather than lowers blood pressure.

## pitfalls
Assuming noradrenaline can activate muscarinic receptors, or that acetylcholine can activate adrenergic receptors -- the two transmitter-receptor systems are exclusive. Assuming sympathetic activation lowers blood pressure, when alpha-1 vasoconstriction and beta-1 cardiac stimulation together raise it.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Introduction to Autonomic Nervous System

## subtopic
Cholinergic and adrenergic receptor specificity

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANS-CHOLINERGIC-ADRENERGIC-TRANSMISSION

## related_article_ids

## related_concept_ids
CON-FND-DFCB638ECE2899

## resource_ids
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
0.3

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following statements is correct regarding the sympathetic and parasympathetic systems? ... Acetylcholine activates muscarinic receptors." / "The correct statement about acetylcholine: ... It acts on both muscarinic and nicotinic receptors" (Quiz 18, Q1 and Q3, `All Quizzes MPT 2022.pdf` p.66-67).

## merge_ids

## rejected_merge_candidate_ids
None -- find-existing.mjs run for "nicotinic and muscarinic receptors", "cholinergic receptor subtypes" returned no hit in live state or any pending batch.

## conflicts
No source disagreement found.

## uncertainty
No department lecture deck exists for Lecture 18 in the corpus (the last department slide deck reaches only Lecture 8) -- the quiz bank's own printed-answer text is this concept's only available source, same handling as the Lecture 9-17 gap-fill concepts already minted for this module.

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
sourceCandidateIds: find-existing.mjs run for "nicotinic and muscarinic receptors" and "cholinergic receptor subtypes" -- 0 hits, new concept.
relationships: sibling of CON-FND-DFCB638ECE2899 (ACh release mechanics), same Quiz 18 cluster.

---

# Item

## id
CON-FND-393530A59974BE

## label
The parasympathetic nervous system has a craniosacral anatomical origin and governs rest-and-digest functions including near-vision accommodation, GI motility and urination

## canonical_key
teaching.pharmacology.ans.parasympathetic-craniosacral-and-functions

## aliases
Parasympathetic craniosacral outflow
Parasympathetic rest-and-digest functions

## arabic_label

## arabic_aliases

## definition
The parasympathetic division of the autonomic nervous system is described as craniosacral because its outflow leaves the CNS from cranial nerve nuclei (III, VII, IX, X) and the sacral spinal cord (S2-S4), in contrast with the sympathetic system's thoracolumbar outflow. Functionally, the parasympathetic system is the "rest-and-digest" division: it governs near-vision accommodation (ciliary muscle contraction), gut motility and secretion, and bladder emptying (detrusor contraction) -- functions distinct from the sympathetic system's "fight-or-flight" role.

## explicit_objective
State that the parasympathetic nervous system is craniosacral in origin and that its functions include near-vision accommodation, movement of food through the gut, and urination.

## pitfalls
Confusing the craniosacral (parasympathetic) and thoracolumbar (sympathetic) outflow labels -- they name the exact opposite anatomical levels for each division. Attributing rest-and-digest functions (accommodation, GI motility, urination) to the sympathetic rather than the parasympathetic system.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Introduction to Autonomic Nervous System

## subtopic
Parasympathetic anatomy and function

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANS-CHOLINERGIC-ADRENERGIC-TRANSMISSION

## related_article_ids

## related_concept_ids

## resource_ids
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
0.3

## academic_relevance
0.8

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following statements concerning the parasympathetic nervous system is Correct? ... Is considered cranio-sacral." / "Which of the following statements concerning the parasympathetic nervous system is correct? ... The parasympathetic division is involved in accommodation of near vision, movement of food, and urination." (Quiz 18, Q2 and Q11, `All Quizzes MPT 2022.pdf` p.66, 69).

## merge_ids

## rejected_merge_candidate_ids
docs/Ain-Shams-Source-Imports/concept/ASU-AE-youssef1-spinal-circ-new-concepts.md carries a pending anatomy concept (CON-NEU-AB8200C11B6993, canonical_key autonomic.parasympathetic-outflow.craniosacral-origin) covering only the craniosacral-origin fact, module-blind (curriculum-node-tagged via primary_node_id DIS-ANA-T01, no `modules` field to overlay AUN-MPT-104 onto, unlike the sparse-overlay precedent which targets records that already carry a `modules` field), and narrower grain (origin only, not the functional rest-and-digest content this quiz also tests). Merging a module-tied AUN mint into a module-blind cross-curriculum record without a ruling risks the silent-merge trap this lane's card already warns against for a near-identical case (the Alexandria DVT/108-INT rejection) -- flagging for the chief of staff rather than reusing unilaterally; minted as its own module-tied concept instead.

## conflicts
No source disagreement found.

## uncertainty
No department lecture deck exists for Lecture 18 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "craniosacral" -- 1 pending near-match documented above (ASU, module-blind, not merged); "preganglionic" -- 27 hits reviewed, none an exact match for the functional (accommodation/GI/urination) half of this fact.
relationships: sibling of CON-FND-8D4CB02987AB8A (ACh/NE receptor specificity), same Quiz 18 cluster.

---

# Item

## id
CON-FND-DFCB638ECE2899

## label
Calcium influx into the presynaptic nerve terminal triggers acetylcholine release into the synaptic cleft, which is then terminated by acetylcholinesterase

## canonical_key
teaching.pharmacology.ans.acetylcholine-release-calcium-trigger

## aliases
Calcium-triggered acetylcholine release
Presynaptic neurotransmitter release mechanics

## arabic_label

## arabic_aliases

## definition
Neurotransmitters, including acetylcholine, are released from presynaptic nerve terminals, not from the postsynaptic cell. Release is triggered by the arrival of an action potential at the terminal, which opens voltage-gated calcium channels; the resulting influx of Ca2+ into the terminal is the proximate trigger that causes acetylcholine-containing vesicles to fuse with the presynaptic membrane and release their contents into the synaptic cleft. Once released, acetylcholine acts briefly on postsynaptic (or, at some junctions, presynaptic) receptors before being rapidly hydrolysed by acetylcholinesterase, which terminates its action.

## explicit_objective
State that neurotransmitters are released from the presynaptic terminal, that calcium influx triggered by an arriving action potential is what causes acetylcholine release, and that acetylcholinesterase terminates the released acetylcholine's action.

## pitfalls
Saying neurotransmitter release is triggered by an action potential arriving in the postsynaptic cell, rather than the presynaptic terminal -- release is a presynaptic event. Saying intracellular calcium falls before release -- calcium influx rises and is the trigger, it does not fall.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Introduction to Autonomic Nervous System

## subtopic
Acetylcholine synthesis, release and termination

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANS-CHOLINERGIC-ADRENERGIC-TRANSMISSION

## related_article_ids

## related_concept_ids
CON-FND-8D4CB02987AB8A

## resource_ids
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
"Which of the following is correct regarding neurotransmitters and neurotransmission? ... Neurotransmitters are released from the presynaptic nerve terminals." / "Influx of what ion causes ACh release into the synaptic cleft, prior to ACh being terminated by acetylcholinesterase (AChE)? ... Ca2+" (Quiz 18, Q4 and Q6, `All Quizzes MPT 2022.pdf` p.67-68).

## merge_ids

## rejected_merge_candidate_ids
None -- find-existing.mjs run for "acetylcholine release calcium influx" and "botulinum toxin" returned no hit in live state or any pending batch.

## conflicts
No source disagreement found.

## uncertainty
No department lecture deck exists for Lecture 18 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "acetylcholine release calcium influx", "botulinum toxin" -- 0 hits, new concept.
relationships: sibling of CON-FND-8D4CB02987AB8A (ACh/NE receptor specificity), same Quiz 18 cluster.

---

# Item

## id
CON-FND-5530C30545ED40

## label
M3 muscarinic receptors are Gq-coupled, signalling through IP3/DAG to raise intracellular calcium -- distinct from the Gi-coupled M2 receptor

## canonical_key
teaching.pharmacology.ans.m3-receptor-gq-ip3-dag-signalling

## aliases
M3 receptor signal transduction
Gq-coupled muscarinic receptors

## arabic_label

## arabic_aliases

## definition
M3 muscarinic receptors, found on glandular tissue (such as the salivary glands) and on smooth muscle (such as bronchiolar smooth muscle), are Gq-protein coupled: their stimulation activates phospholipase C, generating IP3 and DAG (diacylglycerol) as second messengers, which raise intracellular calcium and, in smooth muscle, drive contraction. Blocking M3 receptors with a muscarinic antagonist therefore decreases IP3/DAG signalling (for example, reducing DAG-driven secretion in salivary gland tissue), while stimulating them increases IP3/DAG (for example, increasing IP3/DAG-driven contraction of bronchiolar smooth muscle, producing bronchoconstriction). This Gq/IP3-DAG pathway is distinct from the Gi-coupled, cAMP-lowering M2 receptor found in the heart.

## explicit_objective
Identify M3 muscarinic receptors as Gq-coupled, signalling through IP3/DAG, and predict that blocking M3 receptors decreases IP3/DAG-mediated effects (for example glandular secretion) while stimulating them increases IP3/DAG-mediated effects (for example bronchiolar smooth muscle contraction).

## pitfalls
Assuming all muscarinic receptor subtypes work through the same second messenger -- M2 (heart) is Gi-coupled and lowers cAMP, while M3 (glands, smooth muscle) is Gq-coupled and raises IP3/DAG; they are not interchangeable. Assuming muscarinic stimulation of bronchiolar smooth muscle causes bronchodilation -- it causes bronchoconstriction via this same Gq/IP3-DAG pathway.

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
Introduction to Autonomic Nervous System

## subtopic
Muscarinic receptor subtypes and signal transduction

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANS-CHOLINERGIC-ADRENERGIC-TRANSMISSION

## related_article_ids

## related_concept_ids

## resource_ids
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
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following is an expected effect of a therapeutic dose of a drug that blocks muscarinic-3 receptors? ... Decreased DAG in salivary gland tissue" / "The activation of muscarinic receptors in bronchiolar smooth muscle is associated with ... increase in IP3 and DAG" (Quiz 18, Q5 and Q13, `All Quizzes MPT 2022.pdf` p.67, 70).

## merge_ids

## rejected_merge_candidate_ids
None -- find-existing.mjs run for "M3 receptor" returned no hit in live state or any pending batch; the pending Kasr 208-INT M2-receptor concept (CON-FND-F9E1875546E70D, reused elsewhere in this lane) covers a different subtype's mechanism (Gi/cAMP, cardiac) and was not merged onto for this Gq/IP3-DAG fact.

## conflicts
No source disagreement found.

## uncertainty
No department lecture deck exists for Lecture 18 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "M3 receptor", "muscarinic receptor bronchiolar smooth muscle IP3" -- 0 hits, new concept.
relationships: contrasts with CON-FND-F9E1875546E70D (pending Kasr 208-INT M2/Gi/cAMP concept, reused for Q7/Q9 of this same quiz). Also reused for Quiz 20 Q9 (bronchi dilation is NOT a muscarinic effect).

---

# Item

## id
CON-FND-31FA684CE9E7C9

## label
Catarrhal inflammation is excess secretion from a superficial mucosal surface, and usually resolves completely with tissue repair

## canonical_key
teaching.pathology.inflammation.catarrhal-definition-and-outcome

## aliases
Catarrhal inflammation
Acute non-suppurative inflammation

## arabic_label

## arabic_aliases

## definition
Catarrhal inflammation is a pattern of acute non-suppurative inflammation whose main feature is excess secretion (mucous or serous) from a superficial mucosal surface, such as the respiratory or gastrointestinal lining -- distinct from the pus-forming pattern of suppurative inflammation and from the deep ulceration of some other inflammatory patterns. Because it involves only the superficial mucosal epithelium without substantial tissue destruction, its usual outcome is complete resolution with tissue repair, rather than suppuration, fibrosis or ulceration/perforation.

## explicit_objective
State that catarrhal inflammation is defined by excess mucosal secretion and that its usual outcome is complete resolution with tissue repair, not suppuration or fibrosis.

## pitfalls
Confusing catarrhal inflammation's outcome (resolution and repair) with suppuration, ulceration or fibrosis, which describe other, more destructive inflammatory patterns. Confusing catarrhal inflammation (excess secretion) with granulomatous or cellulitic patterns.

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
Acute non suppurative inflammation

## subtopic
Catarrhal inflammation

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CATARRHAL-INFLAMMATION

## related_article_ids

## related_concept_ids
CON-FND-342EB8A955CCAE

## resource_ids
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
"The main feature of catarrhal inflammation is: ... Excess secretions from superficial mucosal surface" / "The usual outcome of acute catarrhal inflammation: ... Resolution and tissue repair" (Quiz 21, Q1-Q2, `All Quizzes MPT 2022.pdf` p.79).

## merge_ids

## rejected_merge_candidate_ids
find-existing.mjs run for "catarrhal" returned three live/pending hits, all specific to acute laryngitis (a named clinical entity whose definition happens to use the word "catarrhal") rather than a general definition of the catarrhal inflammation pattern itself -- different grain, not merged.

## conflicts
No source disagreement found.

## uncertainty
No department lecture deck exists for Lecture 21 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "catarrhal" -- 3 hits reviewed (all acute-laryngitis specific, different grain, not merged); "suppurative" -- reused CON-FND-342EB8A955CCAE for the Quiz 19 cluster instead of merging here.
relationships: related to CON-FND-342EB8A955CCAE (pending Kasr 208-INT suppurative-inflammation-types concept, reused for Quiz 19).

---

# Item

## id
CON-FND-6B410DA4B612B9

## label
Acetylcholine is unsuitable for clinical use because it lacks receptor selectivity and is hydrolysed almost instantly, so the doses required for a therapeutic effect are impractically high

## canonical_key
teaching.pharmacology.ans.acetylcholine-clinical-unsuitability

## aliases
Why acetylcholine is not used clinically
Acetylcholine dosing impracticality

## arabic_label

## arabic_aliases

## definition
Acetylcholine itself is not used as a clinical drug even though it is the body's own cholinergic transmitter. It acts non-selectively on both muscarinic and nicotinic receptors throughout the body, producing diffuse, hard-to-control effects, and it is hydrolysed almost instantly by acetylcholinesterase and plasma cholinesterase once given, giving it an extremely short duration of action. Together these mean the doses required to sustain any therapeutic effect would be impractically high, which is why more selective and longer-acting cholinomimetics (such as carbachol, bethanechol or pilocarpine) are used instead.

## explicit_objective
State that acetylcholine is unsuitable for clinical use because the doses required for a sustained therapeutic effect are impractically high, a consequence of its non-selectivity and near-instant hydrolysis.

## pitfalls
Attributing acetylcholine's clinical unsuitability simply to toxicity or cost, rather than to the impractically high doses its rapid hydrolysis and non-selectivity would require.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Parasympathetic nervous system (Agonists) 1

## subtopic
Direct-acting cholinomimetics

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CHOLINERGIC-PHARMACOLOGY-GAPFILL

## related_article_ids

## related_concept_ids

## resource_ids
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
"Acetylcholine is not used in clinical practice because: ... The doses required are very high" (Quiz 20, Q2, `All Quizzes MPT 2022.pdf` p.74).

## merge_ids

## rejected_merge_candidate_ids
None -- find-existing.mjs run for terms describing this fact returned no hit in live state or any pending batch.

## conflicts
No source disagreement found.

## uncertainty
No department lecture deck exists for Lecture 20 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "acetylcholine" clinical-use terms -- 0 exact-fact hits, new concept.
relationships: sibling of the other Quiz 20/22 cholinomimetic gap-fill concepts minted in this same pass.

---

# Item

## id
CON-FND-3F462938902705

## label
Muscarinic receptor stimulation in the eye causes miosis and spasm of accommodation (ciliary muscle contraction for near vision), not mydriasis or dry mouth

## canonical_key
teaching.pharmacology.ans.muscarinic-ocular-effects

## aliases
Muscarinic effects on the eye
Spasm of accommodation

## arabic_label

## arabic_aliases

## definition
Stimulating muscarinic receptors in the eye contracts the sphincter pupillae (producing miosis, pupillary constriction) and the ciliary muscle (producing spasm of accommodation, a fixed near-vision focus from sustained ciliary contraction) -- the opposite of the mydriasis and cycloplegia (loss of accommodation) produced by a muscarinic antagonist. Muscarinic stimulation also increases, not decreases, glandular secretion (for example salivary flow), so it does not cause xerostomia (dry mouth); dry mouth is instead an antimuscarinic effect.

## explicit_objective
State that muscarinic receptor stimulation in the eye produces miosis and spasm of accommodation, not mydriasis, and that it increases rather than decreases secretions.

## pitfalls
Pairing muscarinic stimulation with mydriasis or xerostomia -- both are antimuscarinic effects, the pharmacological opposite of what a muscarinic agonist produces.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Parasympathetic nervous system (Agonists) 1

## subtopic
Muscarinic ocular and glandular effects

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CHOLINERGIC-PHARMACOLOGY-GAPFILL

## related_article_ids

## related_concept_ids
CON-FND-5530C30545ED40

## resource_ids
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
"Which of the following is the effect of stimulating muscarinic receptors? ... Spasm of accommodation" (Quiz 20, Q3, `All Quizzes MPT 2022.pdf` p.75).

## merge_ids

## rejected_merge_candidate_ids
None -- find-existing.mjs run for "intraocular pressure" and ocular-effect terms returned no hit in live state or any pending batch.

## conflicts
No source disagreement found.

## uncertainty
No department lecture deck exists for Lecture 20 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "intraocular pressure" -- 0 hits, new concept.
relationships: contrasts with CON-FND-5530C30545ED40 (M3/Gq/IP3-DAG mechanism concept, same signalling family).

---

# Item

## id
CON-FND-A1A577616D7186

## label
Bethanechol is a direct-acting, acetylcholinesterase-resistant muscarinic agonist used to restore GI and bladder motility after surgery, and for non-obstructive urinary retention

## canonical_key
teaching.pharmacology.ans.bethanechol-indications

## aliases
Bethanechol
Direct-acting muscarinic agonist for bowel/bladder atony

## arabic_label

## arabic_aliases

## definition
Bethanechol is a direct-acting muscarinic agonist that, unlike acetylcholine, resists hydrolysis by acetylcholinesterase and so has a long enough duration of action for clinical use. Its selective action on GI and urinary smooth muscle, with minimal cardiovascular or ganglionic activity, makes it the drug of choice for restoring bowel motility in postoperative (non-obstructive) ileus, when a patient remains constipated with absent bowel sounds after abdominal or pelvic surgery, and equally for treating non-obstructive urinary retention by stimulating detrusor contraction.

## explicit_objective
State that bethanechol is a direct-acting, AChE-resistant muscarinic agonist used for postoperative bowel atony/ileus and for non-obstructive urinary retention.

## pitfalls
Confusing bethanechol's indication (restoring GI/bladder motility) with the opposite effect of an antimuscarinic such as atropine, which would worsen rather than treat atony. Assuming bethanechol's only use is urinary retention when postoperative bowel atony is an equally standard indication.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Parasympathetic nervous system (Agonists) 1

## subtopic
Direct-acting cholinomimetics

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CHOLINERGIC-PHARMACOLOGY-GAPFILL

## related_article_ids

## related_concept_ids
CON-FND-5D875E0EC6053C

## resource_ids
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
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Following gastrointestinal surgery, your patient remains severely constipated. Bowel sounds are absent. The drug you are most likely to prescribe to treat this problem is: ... Bethanechol" / "What is bethanechol most commonly used for? ... For urinary retention" (Quiz 20, Q4 and Q11, `All Quizzes MPT 2022.pdf` p.75, 77).

## merge_ids

## rejected_merge_candidate_ids
None -- find-existing.mjs run for "bethanechol" returned no hit in live state or any pending batch. This lane's own triage-keys.txt documents a separate earlier-cluster row (Q15, `bethanechol stimulates post-op bowel motility`) not yet authored at the time of this mint; the same canonical_key/id is intended for reuse when that row is authored, rather than minting a second bethanechol concept.

## conflicts
No source disagreement found.

## uncertainty
No department lecture deck exists for Lecture 20 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "bethanechol" -- 0 hits, new concept.
relationships: sibling of CON-FND-5D875E0EC6053C (carbachol pharmacology, same direct-acting-agonist family).

---

# Item

## id
CON-FND-5D875E0EC6053C

## label
Carbachol is a direct-acting agonist with both nicotinic and muscarinic activity, resistant to acetylcholinesterase, that lowers intraocular pressure via miosis (not mydriasis)

## canonical_key
teaching.pharmacology.ans.carbachol-pharmacology

## aliases
Carbachol
Direct-acting cholinomimetic with dual nicotinic/muscarinic activity

## arabic_label

## arabic_aliases

## definition
Carbachol is a direct-acting cholinomimetic that, unlike acetylcholine, exerts both nicotinic and muscarinic activity and resists hydrolysis by acetylcholinesterase, giving it a longer duration of action. As a parasympathetic (miotic) agent it constricts the pupil (miosis), opening the trabecular drainage angle to decrease intraocular pressure -- it does not cause mydriasis, which is the opposite, antimuscarinic effect. An overdose of carbachol can also act on muscarinic receptors of tissues with no cholinergic innervation, such as vascular endothelium, producing pronounced hypotension that an equivalent overdose of an indirect-acting acetylcholinesterase inhibitor (which can only potentiate acetylcholine at already-innervated sites) would not.

## explicit_objective
State that carbachol is a direct-acting agonist with both nicotinic and muscarinic activity, AChE-resistant, that decreases intraocular pressure via miosis, and that its overdose (unlike an AChE inhibitor's) can act at non-innervated vascular muscarinic receptors to cause hypotension.

## pitfalls
Attributing mydriasis to carbachol -- as a muscarinic agonist it produces miosis, the opposite. Assuming carbachol and indirect-acting AChE inhibitors have identical overdose profiles -- carbachol's direct action at non-innervated receptors (like vascular endothelium) makes it capable of effects an indirect agent limited to innervated synapses cannot produce.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Parasympathetic nervous system (Agonists) 1

## subtopic
Direct-acting cholinomimetics

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CHOLINERGIC-PHARMACOLOGY-GAPFILL

## related_article_ids

## related_concept_ids
CON-FND-A1A577616D7186

## resource_ids
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
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Characteristics of carbachol include all of the following Except: ... It causes mydriasis." (Quiz 20, Q6-Q7, `All Quizzes MPT 2022.pdf` p.76).

## merge_ids

## rejected_merge_candidate_ids
None -- find-existing.mjs run for "carbachol" returned no hit in live state or any pending batch.

## conflicts
No source disagreement found.

## uncertainty
No department lecture deck exists for Lecture 20 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "carbachol" -- 0 hits, new concept.
relationships: sibling of CON-FND-A1A577616D7186 (bethanechol) and CON-FND-7044CBD216CDEC (direct-vs-indirect-acting overdose distinction, same quiz item Q5).

---

# Item

## id
CON-FND-7044CBD216CDEC

## label
A direct-acting muscarinic agonist (carbachol) can act at non-innervated muscarinic receptors and cause hypotension on overdose; an indirect-acting acetylcholinesterase inhibitor (neostigmine) instead potentiates nicotinic transmission at the neuromuscular junction, affecting skeletal muscle and producing a cholinergic crisis the direct agonist does not

## canonical_key
teaching.pharmacology.ans.direct-vs-indirect-acting-cholinomimetic-overdose

## aliases
Direct vs indirect-acting cholinomimetic overdose profile
Neostigmine vs carbachol vs pilocarpine

## arabic_label

## arabic_aliases

## definition
Direct-acting muscarinic agonists such as carbachol act only at muscarinic receptors, including ones with no cholinergic innervation (for example vascular endothelium), so an overdose can produce pronounced hypotension. Indirect-acting acetylcholinesterase inhibitors such as neostigmine instead work by letting endogenous acetylcholine accumulate wherever it is already being released -- which includes the skeletal neuromuscular junction's nicotinic receptors, a site a muscarinic-selective agonist like pilocarpine or carbachol does not significantly affect. This is why neostigmine, unlike pilocarpine, has an effect on skeletal muscle, and why an overdose of neostigmine (but not of carbachol) produces a cholinergic crisis -- excess nicotinic stimulation at the neuromuscular junction causing muscle weakness and potential paralysis, on top of muscarinic excess.

## explicit_objective
Distinguish the overdose/effect profile of a direct-acting muscarinic agonist (hypotension from action at non-innervated vascular muscarinic receptors, no skeletal-muscle nicotinic effect) from an indirect-acting acetylcholinesterase inhibitor (skeletal-muscle nicotinic potentiation, cholinergic crisis on overdose).

## pitfalls
Assuming a direct-acting muscarinic agonist and an indirect-acting acetylcholinesterase inhibitor have identical overdose effects -- the indirect agent's action depends on existing cholinergic innervation (including the neuromuscular junction), while the direct agonist can also act at non-innervated muscarinic sites like blood vessels.

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
Parasympathetic nervous system (Agonists) 2

## subtopic
Direct vs indirect-acting cholinomimetics

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CHOLINERGIC-PHARMACOLOGY-GAPFILL

## related_article_ids

## related_concept_ids
CON-FND-5D875E0EC6053C

## resource_ids
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
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"An overdose of muscarinic agonist carbachol but not an overdose of acetylcholinesterase inhibitor neostigmine could cause the following: ... Hypotension" / "Neostigmine differs from pilocarpine in having effects on ... skeletal muscle" / "An overdose of acetylcholinesterase inhibitor neostigmine but not an overdose of muscarinic agonist carbachol could cause the following: ... Cholinergic crisis" (Quiz 20 Q5, Quiz 22 Q1 and Q2, `All Quizzes MPT 2022.pdf` p.75, 80-81).

## merge_ids

## rejected_merge_candidate_ids
None -- find-existing.mjs run for "neostigmine" returned pending Kasr 208-INT hits on a different fact (neostigmine's reversal of competitive neuromuscular blockade), not this direct-vs-indirect overdose-profile fact -- not merged, different grain.

## conflicts
No source disagreement found.

## uncertainty
No department lecture deck exists for Lectures 20/22 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "neostigmine" -- 4 hits reviewed, all a different fact (NMJ block reversal), not merged.
relationships: sibling of CON-FND-5D875E0EC6053C (carbachol) and CON-FND-A1A577616D7186 (bethanechol). Ties together one Quiz 20 row and two Quiz 22 rows on the same underlying direct-vs-indirect distinction.

---

# Item

## id
CON-FND-6B5BC774037EBC

## label
Edrophonium's brief, fast-onset acetylcholinesterase inhibition makes it the diagnostic ("Tensilon") test to distinguish myasthenic crisis (undertreatment) from cholinergic crisis (overtreatment)

## canonical_key
teaching.pharmacology.ans.edrophonium-diagnostic-use

## aliases
Edrophonium
Tensilon test

## arabic_label

## arabic_aliases

## definition
Edrophonium is a very short-acting, indirect-acting acetylcholinesterase inhibitor whose brief action makes it useful diagnostically rather than for maintenance therapy. In a myasthenia gravis patient whose worsening weakness could reflect either myasthenic crisis (insufficient anticholinesterase therapy) or cholinergic crisis (excessive therapy, causing a nicotinic depolarising block at the neuromuscular junction), a test dose of edrophonium transiently improves strength if the cause is myasthenic crisis, but worsens weakness if the cause is cholinergic crisis -- letting the two, which present similarly, be told apart quickly and safely because edrophonium's effect wears off within minutes.

## explicit_objective
State that edrophonium's short duration of action makes it the diagnostic agent of choice for distinguishing myasthenic crisis from cholinergic crisis in a myasthenia gravis patient.

## pitfalls
Confusing edrophonium's diagnostic role with a longer-acting anticholinesterase's therapeutic role -- its whole clinical value here is its brief action, letting the test be repeated or reversed quickly rather than committing the patient to a prolonged effect.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Parasympathetic nervous system (Agonists) 2

## subtopic
Cholinesterase inhibitors -- clinical indications

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CHOLINERGIC-PHARMACOLOGY-GAPFILL

## related_article_ids

## related_concept_ids

## resource_ids
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
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following is the best drug for distinguishing between myasthenic crisis (insufficient therapy) and cholinergic crisis (excessive therapy)? ... Edrophonium" (Quiz 22, Q4, `All Quizzes MPT 2022.pdf` p.81).

## merge_ids

## rejected_merge_candidate_ids
None -- find-existing.mjs run for "edrophonium" and "myasthenic crisis" returned no hit in live state or any pending batch.

## conflicts
No source disagreement found.

## uncertainty
No department lecture deck exists for Lecture 22 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "edrophonium", "myasthenic crisis" -- 0 hits, new concept.
relationships: sibling of CON-FND-C95C991F4315CC (echothiophate) and the reused pending Kasr 208-INT rivastigmine/Alzheimer's concept -- all part of the anticholinesterase-by-indication teaching set spanning Quiz 22.

---

# Item

## id
CON-FND-C95C991F4315CC

## label
Echothiophate is an irreversible, organophosphate-type acetylcholinesterase inhibitor used topically for glaucoma

## canonical_key
teaching.pharmacology.ans.echothiophate-irreversible-glaucoma

## aliases
Echothiophate
Irreversible cholinesterase inhibitors

## arabic_label

## arabic_aliases

## definition
Echothiophate is an organophosphate-type acetylcholinesterase inhibitor that phosphorylates the enzyme's active site essentially irreversibly, distinguishing it from the reversible carbamate-type inhibitors (such as neostigmine, physostigmine, pyridostigmine and rivastigmine) whose action wanes as the enzyme-inhibitor complex breaks down. Despite its systemic organophosphate-like toxicity potential, echothiophate is used clinically as a topical eye drop for glaucoma, where its irreversible, long-duration miotic effect lowers intraocular pressure.

## explicit_objective
Identify echothiophate as an irreversible, organophosphate-type acetylcholinesterase inhibitor used topically for glaucoma, distinct from the reversible inhibitors.

## pitfalls
Classing echothiophate with the reversible cholinesterase inhibitors (neostigmine, physostigmine, pyridostigmine, rivastigmine) -- its organophosphate-type, essentially irreversible mechanism sets it apart from all of them.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Parasympathetic nervous system (Agonists) 2

## subtopic
Cholinesterase inhibitors -- reversible vs irreversible

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CHOLINERGIC-PHARMACOLOGY-GAPFILL

## related_article_ids

## related_concept_ids
CON-FND-6B5BC774037EBC

## resource_ids
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
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following drugs is irreversible cholinesterase inhibitor? ... Echothiophate" (Quiz 22, Q5, `All Quizzes MPT 2022.pdf` p.82).

## merge_ids

## rejected_merge_candidate_ids
None -- find-existing.mjs run for "echothiophate" and "irreversible cholinesterase" returned no hit in live state or any pending batch (the pending Kasr 208-INT rivastigmine concept's own definition text names echothiophate only in passing, in a `## definition` field the search tool does not index for pending batches; not a structural hit).

## conflicts
No source disagreement found.

## uncertainty
No department lecture deck exists for Lecture 22 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "echothiophate", "irreversible cholinesterase" -- 0 structural hits (see rejected_merge_candidate_ids), new concept.
relationships: sibling of CON-FND-6B5BC774037EBC (edrophonium) and the reused pending Kasr rivastigmine concept.

---

# Item

## id
CON-FND-26A28E75EA8E52

## label
Organophosphate (nerve agent or insecticide) poisoning floods muscarinic receptors with acetylcholine, producing a muscarinic-excess picture: salivation, lacrimation, diarrhoea/GI cramps, urination, and miosis

## canonical_key
teaching.pharmacology.ans.organophosphate-poisoning-muscarinic-excess-recognition

## aliases
Organophosphate poisoning recognition
Muscarinic excess (SLUDGE) picture

## arabic_label

## arabic_aliases

## definition
Organophosphate compounds -- whether insecticides or military nerve agents such as sarin -- irreversibly inhibit acetylcholinesterase, letting acetylcholine accumulate at muscarinic receptors throughout the body. The resulting clinical picture is one of muscarinic excess: excessive salivation and lacrimation, GI cramps with vomiting and diarrhoea, increased urination, and miosis (pupillary constriction) -- the opposite of the dry mouth, mydriasis and urinary retention an antimuscarinic would produce. This pattern, recognisable at the bedside (for example in a child or farm worker exposed to insecticide, or a patient exposed to a nerve agent), is what identifies organophosphate poisoning and distinguishes it from other toxidromes.

## explicit_objective
Recognise the muscarinic-excess clinical picture (salivation, lacrimation, GI cramps/diarrhoea, urination, miosis) as organophosphate/nerve-agent poisoning, and contrast it with the opposite antimuscarinic picture.

## pitfalls
Expecting an antimuscarinic-type picture (dry mouth, mydriasis, urinary retention, tachycardia) from organophosphate poisoning -- the untreated poisoning itself produces the opposite, muscarinic-excess picture; the antimuscarinic picture only appears after atropine treatment reverses it.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Parasympathetic nervous system (Agonists) 2

## subtopic
Organophosphate poisoning

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CHOLINERGIC-PHARMACOLOGY-GAPFILL

## related_article_ids

## related_concept_ids

## resource_ids
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
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"His symptoms include severe abdominal cramps with vomiting and diarrhea and profuse lacrimation and salivation. Pupillary constriction is marked. The most likely cause is exposure to ... insecticides" / "She most likely consumed an organophosphate pesticide." / "Sarin is a volatile nerve agent that inhibits cholinesterase enzymes. Which of the following symptoms would you expect to see in a patient exposed to sarin? ... Miosis." (Quiz 22, Q8-Q10, `All Quizzes MPT 2022.pdf` p.83-84).

## merge_ids

## rejected_merge_candidate_ids
The pending Kasr 208-INT concept CON-FND-E2A3372187494C (`atropine.organophosphate-poisoning.treatment-effects`) covers the reversed picture after atropine treatment (tachycardia, bronchodilatation), a different fact from this one (the untreated poisoning's own muscarinic-excess presentation) -- not merged, different grain. find-existing.mjs run for "miosis" and "SLUDGE" returned no hit.

## conflicts
No source disagreement found.

## uncertainty
No department lecture deck exists for Lecture 22 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "organophosphate", "miosis", "SLUDGE" -- reviewed 7 organophosphate hits (treatment-effects and pralidoxime-mechanism concepts, different grain, not merged); miosis/SLUDGE 0 hits.
relationships: contextual sibling of the reused pending Kasr pralidoxime-mechanism concept (CON-FND-F966C99135DCA0, Quiz 22 Q11) and atropine-treatment-effects concept (not directly reused in this pass).

---

# Item

## id
CON-FND-3D217227A6222C

## label
Muscarinic agonists and anticholinesterases increase salivary secretion, useful for radiation-induced xerostomia; muscarinic antagonists instead reduce secretion and would worsen it

## canonical_key
teaching.pharmacology.ans.sialagogue-vs-antimuscarinic-xerostomia

## aliases
Sialagogues for radiation-induced xerostomia
Muscarinic antagonists worsen dry mouth

## arabic_label

## arabic_aliases

## definition
Head and neck irradiation in cancer patients can damage salivary glands and cause dry mouth (xerostomia). Any agent that increases cholinergic tone at the remaining glandular tissue -- a direct-acting muscarinic agonist (such as pilocarpine), an anticholinesterase (such as neostigmine), or muscarinic agonists generally -- can theoretically improve secretion of saliva. A muscarinic antagonist, by contrast, blocks muscarinic receptors on the salivary glands and reduces secretion, which would worsen rather than help dry mouth, making it the one class of the options not useful for this purpose.

## explicit_objective
State that muscarinic agonists and anticholinesterases can improve salivary secretion in radiation-induced xerostomia, while muscarinic antagonists reduce secretion and would worsen it.

## pitfalls
Assuming any cholinergic-pathway drug helps xerostomia -- a muscarinic antagonist works in the opposite direction from an agonist or anticholinesterase and would make dry mouth worse, not better.

## concept_type
directly_taught_fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Parasympathetic nervous system (Agonists) 2

## subtopic
Clinical applications of cholinergic drugs

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CHOLINERGIC-PHARMACOLOGY-GAPFILL

## related_article_ids

## related_concept_ids

## resource_ids
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
0.7

## weight_confidence
0.4

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Head and neck irradiation in cancer patients can decrease salivary secretion and cause dry mouth. All of the following drugs or classes of drugs are theoretically useful in improving secretion of saliva in these patients except: ... Muscarinic antagonists." (Quiz 22, Q12, `All Quizzes MPT 2022.pdf` p.84).

## merge_ids

## rejected_merge_candidate_ids
None -- find-existing.mjs run for terms describing this fact returned no hit in live state or any pending batch.

## conflicts
No source disagreement found.

## uncertainty
No department lecture deck exists for Lecture 22 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for xerostomia/sialagogue terms -- 0 hits, new concept.
relationships: closing concept of the Quiz 20/22 cholinergic-pharmacology gap-fill set.

---

# Item

## id
CON-FND-F184539AFF3F44

## label
Endarteritis obliterans is chronic intimal thickening producing thick-walled arteries with a narrowed lumen

## canonical_key
teaching.mpt104.pathology.endarteritis-obliterans

## aliases
Obliterative endarteritis
Chronic arterial intimal thickening

## arabic_label
التهاب الشريان الطامس

## arabic_aliases
سماكة البطانة الشريانية المزمنة

## definition
Endarteritis obliterans is a chronic vascular lesion in which the intima (inner lining) of small and medium arteries thickens progressively, narrowing the lumen while the wall itself becomes thicker -- the resulting vessel is thick-walled with a narrow lumen, not the thin-walled, wide-lumen picture of a healthy or dilated artery. It is a chronic reaction pattern in its own right, distinct from simple obliteration (complete closure) of the lumen and from the fact that arteries are end-arteries (a separate anatomical property), and it is classically seen accompanying chronic granulomatous and chronic infective processes such as tuberculosis and tertiary syphilis.

## explicit_objective
State that endarteritis obliterans means thick-walled arteries with a narrowed lumen, from chronic intimal thickening.

## pitfalls
Choosing "thin-walled arteries with wide lumen" or "arteries are end arteries" -- the first is the opposite finding, and the second is an unrelated anatomical fact about arterial supply, not a description of endarteritis obliterans itself. "Obliteration of the arterial lumen" overstates a narrowing process as complete closure.

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
Chronic inflammation definition and types

## subtopic
Chronic vascular lesions

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CHRONIC-INFLAMMATION-GRANULOMA

## related_article_ids

## related_concept_ids
CON-FND-8AF636D3C0F420
CON-FND-24818D28E4A753

## resource_ids
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
0.7

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Endarteritis obliterans means: ... The correct answer is: Thick-walled arteries with narrow lumen" (Quiz 23, Q1, `All Quizzes MPT 2022.pdf` p.85).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 23 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "endarteritis obliterans" -- 0 hits, new concept.
relationships: opens the Lecture 23/25 chronic-inflammation-and-granuloma set; related to CON-FND-24818D28E4A753 (Ghon focus, a tuberculous lesion that can show a similar chronic vascular pattern in the department's teaching tradition).

---

# Item

## id
CON-FND-8AF636D3C0F420

## label
Epithelioid macrophages are the central, key cell of granuloma formation

## canonical_key
teaching.mpt104.pathology.granuloma-epithelioid-macrophage-key-cell

## aliases
Epithelioid cells
Key cell of granuloma
Granuloma macrophage transformation

## arabic_label
الخلايا الظهارانية الشبه (الماكروفاج المتحول)

## arabic_aliases
الخلية الأساسية في الورم الحبيبي

## definition
When a macrophage is persistently activated by an antigen it cannot fully degrade, it enlarges, flattens its nucleus and gains abundant pink (eosinophilic) cytoplasm that resembles epithelium under the microscope -- this transformed cell is called an epithelioid cell, and epithelioid macrophages are the key, central cell of every granuloma, whatever its underlying cause. Several epithelioid cells can further fuse into a multinucleated giant cell. The macrophage's central role in granuloma formation is why it, rather than the neutrophil, mast cell or fibroblast, is named the most important cell in the development of a granuloma, and why "epithelioid cells" are correctly described as modified macrophages rather than modified epithelial cells, lymphocytes or plasma cells.

## explicit_objective
Identify the (epithelioid) macrophage as the central cell of granuloma formation and state that epithelioid cells are macrophages transformed by persistent antigenic stimulation.

## pitfalls
Selecting neutrophil, mast cell or fibroblast as the key granuloma cell -- neutrophils dominate acute, not granulomatous, inflammation, mast cells drive immediate hypersensitivity, and fibroblasts belong to the later fibrotic/healing response, not the granuloma's defining cell. Assuming "epithelioid" implies an epithelial-cell origin rather than a macrophage transformed to resemble epithelium.

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
Granuloma: types and mechanisms

## subtopic
Granuloma cell types

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CHRONIC-INFLAMMATION-GRANULOMA

## related_article_ids

## related_concept_ids
CON-FND-91B1F37DD27AB0
CON-FND-24818D28E4A753

## resource_ids
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
0.75

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The most important cell in the development of a granuloma is a: ... The correct answer is: Macrophage" (Quiz 23, Q3, `All Quizzes MPT 2022.pdf` p.86); "Epithelioid cells are modified: ... The correct answer is: Macrophages" (Quiz 25, Q5, p.93).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lectures 23 or 25 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "epithelioid" -- live hit CON-INF-8658F6CDBBB685 (title-only KAU concept, reused separately for the Lecture 25 Q8 caseating-granuloma row, not this cell-identity grain) and two thin Helwan HU-BMS-102 pending rows (label-only, no definition prose to safely cite for a 3+ sentence explanation) -- neither is an exact-grain match, so a fresh AUN-MPT-104 record was minted, collapsing Quiz 23 Q3 and Quiz 25 Q5 (same underlying fact) onto one concept.
relationships: paired with CON-FND-91B1F37DD27AB0 (lymphokine-mediated pathogenesis that activates this cell) and CON-FND-24818D28E4A753 (Ghon focus, the primary-TB counterpart lesion).

---

# Item

## id
CON-FND-8F94E784317AC6

## label
An indigestible foreign material (suture, silicone) triggers a foreign-body giant-cell granulomatous reaction

## canonical_key
teaching.mpt104.pathology.foreign-body-giant-cell-reaction

## aliases
Foreign-body granuloma
Foreign-body giant cell

## arabic_label
تفاعل الخلايا العملاقة للجسم الغريب

## arabic_aliases
الورم الحبيبي حول جسم غريب

## definition
An indigestible foreign material that a macrophage cannot break down -- retained suture, leaked breast-implant silicone, talc -- triggers the same macrophage-driven, granuloma-forming response as a persistent antigen, producing a foreign-body giant-cell reaction around the material itself. On histology this appears as macrophages, collagen deposition, lymphocytes and multinucleated giant cells surrounding a refractile foreign particle, which is why a leaking silicone breast implant produces giant cells as its most characteristic accompanying inflammatory cell type, and why a firm nodule found weeks after a surgical incision, showing this same picture on biopsy, is read as granuloma formation around retained suture material rather than a new infection or a neoplasm.

## explicit_objective
Recognise a foreign-body giant-cell/granulomatous reaction (around silicone or retained suture) from its histological picture and clinical setting.

## pitfalls
Reading a post-surgical nodule with macrophages, giant cells and refractile material as exuberant granulation tissue, hyaline degeneration or an abscess -- each of those lacks the combination of giant cells plus visible foreign material that specifically signals a foreign-body granulomatous reaction.

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
Tissue repair: types and mechanisms

## subtopic
Foreign-body granulomatous reaction

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CHRONIC-INFLAMMATION-GRANULOMA

## related_article_ids

## related_concept_ids
CON-FND-E2DF384CA54530
CON-FND-9AC85DE2741A38

## resource_ids
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
0.65

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following cell types would be most characteristic of the inflammatory response accompanying a leaking silicone breast implant: ... The correct answer is: Giant cell" (Quiz 25, Q2, `All Quizzes MPT 2022.pdf` p.92).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 25 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "foreign body giant cell" and "silicone breast implant giant cell" -- 0 hits, new concept.
relationships: paired with CON-FND-E2DF384CA54530 (silicosis, the inhaled-particle non-infective-granuloma counterpart) and CON-FND-9AC85DE2741A38 (the Lecture 27 suture-material granuloma row, same mechanism applied to a different clinical vignette).

---

# Item

## id
CON-FND-E2DF384CA54530

## label
Silicosis is a cause of non-infective granuloma

## canonical_key
teaching.mpt104.pathology.silicosis-noninfective-granuloma

## aliases
Non-infective granuloma causes
Silicotic nodule

## arabic_label
الورم الحبيبي غير المعدي (السحار السيليسي)

## arabic_aliases
داء السحار

## definition
Granulomas are grouped by cause into infective (tuberculosis, bilharziasis, leprosy, syphilis) and non-infective. Silicosis -- chronic inhalation of crystalline silica particles that macrophages cannot fully digest -- is a standard example of a non-infective granuloma, distinguishing it from bilharziasis, tuberculosis and leprosy, which are all infective causes of granulomatous inflammation on the same list.

## explicit_objective
Classify silicosis as a non-infective cause of granuloma, distinct from the infective causes (tuberculosis, bilharziasis, leprosy) on the same list.

## pitfalls
Grouping silicosis with the infective granuloma causes because it shares their epithelioid-macrophage histology -- the epithelioid-cell pattern is shared across infective and non-infective granulomas alike; only the trigger (an organism versus an inert inhaled particle) differs.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Granuloma: types and mechanisms

## subtopic
Infective versus non-infective granuloma

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CHRONIC-INFLAMMATION-GRANULOMA

## related_article_ids

## related_concept_ids
CON-FND-8F94E784317AC6
CON-FND-8AF636D3C0F420

## resource_ids
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
0.35

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following is a cause of non infective granuloma: ... The correct answer is: silicosis" (Quiz 25, Q3, `All Quizzes MPT 2022.pdf` p.93).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 25 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "silicosis non infective granuloma" -- 0 hits, new concept.
relationships: paired with CON-FND-8F94E784317AC6 (foreign-body giant-cell reaction, the other non-infective granuloma mechanism this cluster tests).

---

# Item

## id
CON-FND-24818D28E4A753

## label
The Ghon focus is the tuberculous lesion of primary tuberculosis infection

## canonical_key
teaching.mpt104.pathology.ghons-focus-primary-tb

## aliases
Ghon focus
Primary tuberculosis lesion
Ghon complex

## arabic_label
بؤرة غون

## arabic_aliases
المركب الأولي لمرض السل

## definition
The Ghon focus is the small, typically subpleural, area of tuberculous granulomatous inflammation that forms at the site of the initial (primary) tuberculosis infection in the lung -- a tuberculous reaction, not a foreign-body, bilharzial or otherwise non-specific inflammatory reaction. Together with the draining hilar/mediastinal lymph nodes it also affects, it forms the primary (Ghon) complex, the hallmark of primary pulmonary tuberculosis before any reactivation or reinfection (secondary tuberculosis) occurs.

## explicit_objective
State that the Ghon focus is a tuberculous reaction, the lesion of primary tuberculosis infection.

## pitfalls
Classing the Ghon focus as a foreign-body, bilharzial or generic non-specific inflammatory reaction -- these are the distractor categories offered against the correct, tuberculous-reaction answer, and each names an unrelated granuloma-forming or inflammatory process.

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
Granuloma: types and mechanisms

## subtopic
Tuberculosis worked examples

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CHRONIC-INFLAMMATION-GRANULOMA

## related_article_ids

## related_concept_ids
CON-FND-8AF636D3C0F420
CON-FND-F184539AFF3F44

## resource_ids
src_3e62ae5ed2a35ed7211c

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
0.75

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Ghon's focus consists of: ... The correct answer is: Tuberculous reaction" (Quiz 25, Q6, `All Quizzes MPT 2022.pdf` p.94).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 25 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "Ghon focus tuberculous" -- 0 hits, new concept.
relationships: paired with CON-FND-8AF636D3C0F420 (the epithelioid-macrophage cell this lesion is built from) and CON-FND-F184539AFF3F44 (endarteritis obliterans, a chronic vascular lesion in the same department teaching tradition).

---

# Item

## id
CON-FND-91B1F37DD27AB0

## label
Lymphokines mediate the chronic inflammation of a delayed (type IV) hypersensitivity reaction

## canonical_key
teaching.mpt104.pathology.lymphokines-mediate-dth-chronic-inflammation

## aliases
Delayed hypersensitivity mediators
Lymphokine-mediated chronic inflammation

## arabic_label
اللمفوكينات ووساطة الالتهاب المزمن في فرط الحساسية المتأخر

## arabic_aliases
وسطاء فرط الحساسية من النوع الرابع

## definition
The chronic inflammation seen in a delayed (type IV) hypersensitivity reaction -- including granuloma formation -- is mediated by lymphokines, the cytokines released by activated T lymphocytes, which recruit and activate macrophages at the reaction site. This is distinct from the mediators of acute inflammation and immediate hypersensitivity: complement, bradykinin and histamine act mainly in those faster, antibody- or plasma-cascade-driven pathways, not in the T-cell-driven chronic inflammation of a delayed hypersensitivity reaction; polymorphs (neutrophils) are cells, not mediators, and belong to acute rather than chronic inflammation.

## explicit_objective
State that lymphokines, not complement, bradykinin, histamine or polymorphs, mediate the chronic inflammation of a delayed hypersensitivity reaction.

## pitfalls
Selecting complement, bradykinin or histamine -- these mediate acute inflammation or immediate (type I) hypersensitivity, not the T-cell/lymphokine-driven chronic inflammation of a delayed (type IV) reaction. Selecting polymorphs mistakes a cell type for a chemical mediator.

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
Granuloma: types and mechanisms

## subtopic
Mediators of delayed hypersensitivity

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CHRONIC-INFLAMMATION-GRANULOMA

## related_article_ids

## related_concept_ids
CON-FND-8AF636D3C0F420

## resource_ids
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
0.7

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The chronic inflammation of a delayed hypersensitivity reaction is mediated by ... The correct answer is: Lymphokines" (Quiz 25, Q9, `All Quizzes MPT 2022.pdf` p.95).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 25 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "lymphokines delayed hypersensitivity" -- 0 hits, new concept.
relationships: closes the Lecture 23/25 chronic-inflammation-and-granuloma set; related to CON-FND-8AF636D3C0F420 (the macrophage these lymphokines activate).

---

# Item

## id
CON-FND-E7CF2D41E7F0BC

## label
Atropine's systemic antimuscarinic adverse-effect profile: dry mouth, urinary retention, blurred vision, reduced GI motility

## canonical_key
teaching.mpt104.pharmacology.atropine-systemic-adverse-effects

## aliases
Atropine adverse effects
Antimuscarinic side-effect profile

## arabic_label
الآثار الجانبية الجهازية للأتروبين

## arabic_aliases
ملف الآثار الجانبية لمضادات المسكارين

## definition
Atropine blocks muscarinic receptors throughout the body, producing effects that are the opposite of muscarinic stimulation. Its systemic adverse-effect profile includes dry mouth (reduced salivation), urinary retention (reduced detrusor tone), sandy or dry eyes with blurred vision (impaired accommodation and reduced lacrimation), and tachycardia, along with reduced gastrointestinal motility -- this reduced motility is also the mechanism behind its antidiarrheal contribution in the combination product diphenoxylate/atropine, and is why muscarinic antagonists specifically decrease urination rather than increase it. Diarrhea and increased salivation are muscarinic-agonist, not antagonist, effects, and are not part of this profile.

## explicit_objective
List atropine's systemic antimuscarinic adverse effects (dry mouth, urinary retention, blurred vision/sandy eyes, reduced GI motility) and state that these effects are opposite to those of muscarinic stimulation.

## pitfalls
Selecting diarrhea as an atropine adverse effect -- atropine's reduced GI motility instead makes it useful as an antidiarrheal ingredient. Selecting increased salivation, which is the opposite (muscarinic-agonist) effect.

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
Parasympathetic nervous system (Antagonists)

## subtopic
Atropine systemic adverse effects

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIMUSCARINIC-PHARMACOLOGY

## related_article_ids

## related_concept_ids
CON-FND-7F6FE263FBC1C0
CON-FND-568AAC30667942

## resource_ids
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
0.55

## academic_relevance
0.75

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Adverse effects which frequently occur during treatment with high doses of atropine include all of the following EXCEPT: ... The correct answer is: Diarrhea" (Quiz 24, Q1, `All Quizzes MPT 2022.pdf` p.87); "Which of the following is an adverse effect of atropine? ... The correct answer is: Blurred vision" (Q2); "Urination in the human subject is decreased by ... The correct answer is: muscarinic antagonists" (Q6, p.89); "Atropine is one of the ingredients in the antidiarrheal combination diphenoxylate/atropine ... Which of the following effects is produced by atropine that contributes to its antidiarrheal effect? ... The correct answer is: Reduction in gastrointestinal motility" (Q8, p.89).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 24 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "atropine adverse effects sandy eyes dry mouth" -- 0 hits, new concept.
relationships: opens the Lecture 24 antimuscarinic-pharmacology set; collapses Quiz 24 Q1, Q2, Q6 and Q8 (all testing the same atropine adverse-effect-profile fact) onto one concept.

---

# Item

## id
CON-FND-7F6FE263FBC1C0

## label
Muscarinic antagonists are useful as a cholinergic antidote, for eye exams and motion sickness, but contraindicated in narrow-angle glaucoma

## canonical_key
teaching.mpt104.pharmacology.antimuscarinic-contraindications-uses

## aliases
Antimuscarinic contraindications
Antimuscarinic therapeutic uses

## arabic_label
موانع استعمال واستطبابات مضادات المسكارين

## arabic_aliases
موانع استخدام الأتروبين في الجلوكوما

## definition
Muscarinic antagonists are useful as an antidote for cholinergic-agonist (and organophosphate) poisoning, for pupillary dilation during eye examinations, and for preventing motion sickness. They are specifically contraindicated for treatment of narrow-angle glaucoma: the pupillary dilation (mydriasis) that makes them useful for an eye exam is exactly what can precipitate an acute angle-closure attack by obstructing aqueous humour outflow, so they worsen rather than treat this condition.

## explicit_objective
State that muscarinic antagonists are useful as a cholinergic-agonist antidote, for eye examinations and for motion-sickness prevention, but are contraindicated (not useful) in narrow-angle glaucoma.

## pitfalls
Assuming muscarinic antagonists are useful for narrow-angle glaucoma because they are used for pupillary dilation in eye examinations -- the same mydriasis effect that helps one setting is contraindicated in the other.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Parasympathetic nervous system (Antagonists)

## subtopic
Antimuscarinic contraindications and uses

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIMUSCARINIC-PHARMACOLOGY

## related_article_ids

## related_concept_ids
CON-FND-E7CF2D41E7F0BC

## resource_ids
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
0.7

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Muscarinic antagonists are useful for all of the following EXCEPT: ... The correct answer is: Treatment of narrow angle glaucoma" (Quiz 24, Q11, `All Quizzes MPT 2022.pdf` p.90).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 24 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "trimethaphan ganglion blocker" and related antimuscarinic-use terms -- 0 hits, new concept.
relationships: paired with CON-FND-E7CF2D41E7F0BC (the adverse-effect profile that explains why these uses/contraindications hold).

---

# Item

## id
CON-FND-568AAC30667942

## label
Scopolamine is a CNS-penetrant antimuscarinic used for motion sickness, causing mydriasis with cycloplegia

## canonical_key
teaching.mpt104.pharmacology.scopolamine-cns-antimuscarinic-uses

## aliases
Scopolamine pharmacology
Antimuscarinic motion-sickness prevention
Mydriasis with cycloplegia

## arabic_label
السكوبولامين كمضاد مسكارين نافذ للجهاز العصبي المركزي

## arabic_aliases
دوار الحركة وتوسع الحدقة مع شلل التكيف

## definition
Scopolamine is a muscarinic antagonist that, unlike atropine's more peripherally weighted action, penetrates the CNS well. It is used for prevention of motion sickness (classically as a transdermal patch), and in the eye it produces mydriasis together with cycloplegia -- paralysis of the ciliary muscle that impairs accommodation for near vision -- explaining why a patient dosed with scopolamine cannot read a menu with the affected eye. Muscarinic antagonists in general are also useful as an antidote for cholinergic-agonist toxicity, such as the centrally-acting toxidrome (hallucinations, hot dry skin, mydriasis) produced by ingesting an anticholinergic-containing plant, a picture scopolamine itself can also produce in overdose.

## explicit_objective
Identify scopolamine as the CNS-penetrant antimuscarinic used for motion-sickness prevention, and state that it produces mydriasis with cycloplegia (impairing near vision, not just pupil size).

## pitfalls
Confusing scopolamine's mydriasis-with-cycloplegia effect with a pure mydriatic (pupil dilation without loss of near focus) -- an antimuscarinic affects both the pupil and the ciliary muscle at once, since both are under muscarinic control. Selecting a muscarinic agonist, a nicotinic antagonist or an AChE inhibitor as the drug behind an anticholinergic-plant-poisoning or ganglion-blocker vignette that actually describes an antimuscarinic.

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
Parasympathetic nervous system (Antagonists)

## subtopic
Scopolamine pharmacology

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIMUSCARINIC-PHARMACOLOGY

## related_article_ids

## related_concept_ids
CON-FND-1E1CDB94DF60D6
CON-FND-7F6FE263FBC1C0

## resource_ids
src_3e62ae5ed2a35ed7211c

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.55

## exam_weight_by_year
AUN_Y1=0.55

## clinical_relevance
0.55

## academic_relevance
0.75

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"What type of drugs is scopolamine? ... The correct answer is: Muscarinic antagonists" (Quiz 24, Q4, `All Quizzes MPT 2022.pdf` p.88); "A patient presents to the physician with a dilated right eye and complains that she could not read the lunch menu with the same eye ... The correct answer is: Scopolamine" (Q7, p.89); "Which of the following drugs would be the most effective anti-motion sickness drug for a person planning to go on a cruise? ... The correct answer is: Scopolamine" (Q10, p.90); "An 11 year old boy ... eating seeds from a plant while 'trying to get high' ... incoherent, skin hot and dry, pupils dilated and unresponsive to light ... The presumptive diagnosis was drug toxicity due to the ingestion of a compound similar to ... The correct answer is: scopolamine" (Q12, p.91).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 24 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "scopolamine" -- 0 hits anywhere in live state or any pending batch, new concept.
relationships: collapses Quiz 24 Q4, Q7, Q10 and Q12 (all pointing to scopolamine) onto one concept; paired with CON-FND-1E1CDB94DF60D6 (the toxidrome scopolamine and related antimuscarinics can produce, and its physostigmine reversal).

---

# Item

## id
CON-FND-1E1CDB94DF60D6

## label
Physostigmine, a centrally-acting cholinesterase inhibitor, reverses the anticholinergic toxidrome

## canonical_key
teaching.mpt104.pharmacology.anticholinergic-toxidrome-physostigmine-reversal

## aliases
Anticholinergic toxidrome
Physostigmine reversal
Centrally-acting cholinomimetic antidote

## arabic_label
متلازمة التسمم المضاد للكولين وعلاجها بالفيزوستيغمين

## arabic_aliases
الفيزوستيغمين كمضاد سموم مركزي

## definition
Taken in overdose or from an antimuscarinic-containing plant, atropine-like drugs produce the anticholinergic toxidrome: high fever, hallucinations, marked mydriasis and a dry mouth. This toxidrome is reversed by physostigmine, a centrally-acting (CNS-penetrant) cholinesterase inhibitor whose action raises acetylcholine levels both centrally and peripherally, directly counteracting the antimuscarinic block at its source -- a peripherally-restricted cholinesterase inhibitor cannot reverse the central (hallucination, fever) component of the toxidrome the way physostigmine can.

## explicit_objective
State that physostigmine, because it is centrally-acting, is the antidote of choice for the anticholinergic (antimuscarinic) toxidrome.

## pitfalls
Choosing a peripherally-restricted cholinesterase inhibitor, an NSAID, or a parasympatholytic (antimuscarinic, which would worsen rather than treat this toxidrome) as the treatment for a patient presenting with the anticholinergic toxidrome.

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
Parasympathetic nervous system (Antagonists)

## subtopic
Anticholinergic toxidrome and reversal

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIMUSCARINIC-PHARMACOLOGY

## related_article_ids

## related_concept_ids
CON-FND-568AAC30667942

## resource_ids
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
0.7

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A patient presents at Assiut University Hospital with high fever, hallucinations, marked mydriasis, and a dry mouth after ingesting an unknown drug. To counteract the effects of the drug you prescribe: ... The correct answer is: a centrally-acting cholinomimetic" (Quiz 24, Q3, `All Quizzes MPT 2022.pdf` p.88).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 24 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "physostigmine anticholinergic toxidrome" -- 0 hits, new concept.
relationships: paired with CON-FND-568AAC30667942 (the scopolamine/antimuscarinic overdose picture this reverses).

---

# Item

## id
CON-FND-50FB4649C59276

## label
Ipratropium is the antimuscarinic bronchodilator option in COPD unresponsive to a beta2 agonist

## canonical_key
teaching.mpt104.pharmacology.ipratropium-copd-bronchodilator

## aliases
Ipratropium
Antimuscarinic bronchodilator

## arabic_label
الإيبراتروبيوم كموسع قصبي مضاد للمسكارين

## arabic_aliases
علاج مرض الانسداد الرئوي المزمن

## definition
Ipratropium, an inhaled antimuscarinic bronchodilator, is the next therapeutic option when a patient with chronic obstructive pulmonary disease (COPD) does not respond to a beta2 agonist alone for relief of bronchospasm. It works through a different receptor (blocking muscarinic receptors on airway smooth muscle) rather than repeating or escalating the beta2-adrenergic mechanism, making it a rational add-on or alternative rather than simply "more of the same" bronchodilator class.

## explicit_objective
State that ipratropium, an antimuscarinic bronchodilator, is the next option for a COPD patient unresponsive to a beta2 agonist.

## pitfalls
Selecting a muscarinic agonist, a beta1 agonist, or physostigmine as the next bronchodilator option -- a muscarinic agonist would worsen bronchospasm, a beta1 agonist has minimal airway effect, and physostigmine is an unrelated centrally-acting cholinesterase inhibitor with no bronchodilator role.

## concept_type
application

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Parasympathetic nervous system (Antagonists)

## subtopic
Ipratropium in COPD

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIMUSCARINIC-PHARMACOLOGY

## related_article_ids

## related_concept_ids
CON-FND-7F6FE263FBC1C0

## resource_ids
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
0.65

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A patient with chronic obstructive pulmonary disease (COPD) was prescribed a β2 agonist for the relief of bronchospasm. However, the patient did not respond to this treatment. Which of the following drugs or classes of drugs would you suggest for this patient as the next option? ... The correct answer is: Ipratropium." (Quiz 24, Q5, `All Quizzes MPT 2022.pdf` p.88).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 24 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "ipratropium" -- 0 hits, new concept.
relationships: paired with CON-FND-7F6FE263FBC1C0 (antimuscarinic therapeutic-use pattern this fits within).

---

# Item

## id
CON-FND-84207418D30CBB

## label
Trimethaphan is a ganglion blocker acting on nicotinic receptors at the autonomic ganglia

## canonical_key
teaching.mpt104.pharmacology.ganglion-blockers-trimethaphan

## aliases
Ganglion blocker
Nicotinic ganglionic antagonist

## arabic_label
حاصرات العقد العصبية اللاإرادية (تريميثافان)

## arabic_aliases
مضاد النيكوتين على مستوى العقدة العصبية

## definition
Trimethaphan is a ganglion blocker: it acts on nicotinic (not muscarinic) receptors at the autonomic ganglia, blocking transmission through both the sympathetic and parasympathetic divisions at that single site. This makes it mechanistically distinct from every muscarinic antagonist discussed in this lecture -- it is not an antimuscarinic drug, and its site of action is the ganglion itself rather than the postsynaptic muscarinic receptors on an effector organ.

## explicit_objective
Identify trimethaphan as a ganglion blocker acting on nicotinic receptors at the autonomic ganglia, distinct from a muscarinic antagonist.

## pitfalls
Confusing a ganglion blocker (nicotinic-receptor antagonism at the ganglion, affecting both sympathetic and parasympathetic transmission) with a muscarinic antagonist (blocking the postsynaptic muscarinic receptor on the effector organ, affecting only parasympathetic-type responses). Selecting an organophosphate (parathion), an irreversible cholinesterase inhibitor (echothiophate) or an antimuscarinic (scopolamine) as a ganglion blocker.

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
Parasympathetic nervous system (Antagonists)

## subtopic
Ganglion blockers

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIMUSCARINIC-PHARMACOLOGY

## related_article_ids

## related_concept_ids
CON-FND-568AAC30667942

## resource_ids
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
0.65

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following drugs is ganglion blocker? ... The correct answer is: Trimethaphan" (Quiz 24, Q9, `All Quizzes MPT 2022.pdf` p.90).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 24 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "trimethaphan ganglion blocker" -- 0 hits, new concept.
relationships: closes the Lecture 24 antimuscarinic-pharmacology set; contrasted with CON-FND-568AAC30667942 (scopolamine, a true muscarinic antagonist) to keep the ganglion-blocker mechanism distinct.

---

# Item

## id
CON-FND-286EC65D65A4AB

## label
Prejunctional alpha2 receptor activation inhibits noradrenaline release

## canonical_key
teaching.mpt104.pharmacology.alpha2-autoreceptor-negative-feedback

## aliases
Alpha2 autoreceptor feedback
Presynaptic alpha2 inhibition

## arabic_label
تثبيط تحرر النورأدرينالين عبر مستقبلات ألفا-2 قبل المشبكية

## arabic_aliases
التغذية الراجعة السلبية للنورأدرينالين

## definition
Noradrenaline released at a sympathetic nerve ending acts back on prejunctional (presynaptic) alpha2 autoreceptors on the same terminal. Activating these receptors inhibits further noradrenaline release -- a negative-feedback loop that limits how much transmitter a single nerve impulse releases, rather than stimulating further release or acting through an IP3/DAG (Gq) pathway.

## explicit_objective
State that activation of prejunctional alpha2 receptors inhibits, rather than stimulates, further noradrenaline release.

## pitfalls
Reversing the feedback direction (assuming alpha2 activation stimulates NEP/noradrenaline synthesis or release) or assigning it a Gq-type IP3/DAG signalling pathway -- alpha2 receptors are Gi-coupled and inhibitory on transmitter release.

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
Sympathetic nervous system (agonists) 1

## subtopic
Alpha2 autoreceptor feedback

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-AGONISTS-1

## related_article_ids

## related_concept_ids
CON-FND-0F6EF6BCF447E9

## resource_ids
src_3e62ae5ed2a35ed7211c

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
0.4

## academic_relevance
0.75

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Activation of prejunctional α2 receptors on sympathetic nerve endings is associated with: ... The correct answer is: Inhibition of NEP release" (Quiz 26, Q1, `All Quizzes MPT 2022.pdf` p.97).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 26 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "prejunctional alpha2 receptor noradrenaline release" -- 0 hits, new concept.
relationships: opens the Lecture 26 sympathetic-agonists-1 set; paired with CON-FND-0F6EF6BCF447E9 (axonal reuptake, the other noradrenaline-clearance mechanism this lecture tests).

---

# Item

## id
CON-FND-9B1963638789A3

## label
Epinephrine's real clinical uses are cardiac arrest, anaphylactic shock and complete heart block, not heart failure

## canonical_key
teaching.mpt104.pharmacology.epinephrine-clinical-uses

## aliases
Epinephrine clinical uses
Adrenaline indications

## arabic_label
الاستطبابات السريرية للإبينفرين

## arabic_aliases
دواعي استعمال الأدرينالين

## definition
Epinephrine's department-tested clinical uses are cardiac arrest, anaphylactic shock and complete heart block. Heart failure is specifically excluded from this list: despite epinephrine's inotropic and chronotropic effects, it is not standard therapy for heart failure, where its arrhythmogenic potential and afterload-raising alpha-mediated vasoconstriction outweigh any short-term inotropic benefit.

## explicit_objective
State that epinephrine's tested clinical uses are cardiac arrest, anaphylactic shock and complete heart block, and that heart failure is not among them.

## pitfalls
Assuming heart failure is a standard epinephrine indication simply because epinephrine increases cardiac contractility -- inotropic potential alone does not make a drug a standard heart-failure therapy, and epinephrine's other effects make it unsuitable there.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Sympathetic nervous system (agonists) 1

## subtopic
Epinephrine clinical uses

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-AGONISTS-1

## related_article_ids

## related_concept_ids
CON-FND-0366B2635DE9A6

## resource_ids
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
0.65

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Epinephrine is used in the treatment of all the following conditions EXCEPT: ... The correct answer is: Heart failure" (Quiz 26, Q2, `All Quizzes MPT 2022.pdf` p.97).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 26 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "epinephrine uses cardiac arrest anaphylaxis" -- 0 hits, new concept.
relationships: paired with CON-FND-0366B2635DE9A6 (the receptor-selectivity fact that partly explains epinephrine's broader effect profile vs. noradrenaline).

---

# Item

## id
CON-FND-59669D8913F88C

## label
Norepinephrine is given only by IV infusion, never SC, IM or oral

## canonical_key
teaching.mpt104.pharmacology.norepinephrine-iv-infusion-route

## aliases
Norepinephrine administration route
IV-only vasopressor administration

## arabic_label
طريق إعطاء النورإبينفرين بالتسريب الوريدي فقط

## arabic_aliases
إعطاء النورأدرينالين عن طريق الوريد

## definition
Norepinephrine is used only by IV infusion. Its severe local vasoconstrictive potency makes subcutaneous or intramuscular injection a tissue-necrosis risk at the injection site, and it is inactivated by first-pass gut and liver metabolism if given orally -- ruling out every route except a continuous, carefully monitored IV infusion, typically through a central line to further reduce extravasation risk.

## explicit_objective
State that norepinephrine is administered only by IV infusion, and why the SC, IM and oral routes are unsuitable for it.

## pitfalls
Assuming norepinephrine can be given SC or IM like many other drugs -- its vasoconstrictive potency specifically makes this a tissue-necrosis risk. Assuming oral norepinephrine would work systemically, when first-pass metabolism inactivates it.

## concept_type
application

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Sympathetic nervous system (agonists) 1

## subtopic
Norepinephrine administration route

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-AGONISTS-1

## related_article_ids

## related_concept_ids
CON-FND-9B1963638789A3

## resource_ids
src_3e62ae5ed2a35ed7211c

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
0.6

## academic_relevance
0.65

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Norepinephrine is used by: ... The correct answer is: I.V. infusion route" (Quiz 26, Q3, `All Quizzes MPT 2022.pdf` p.98).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 26 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "norepinephrine iv infusion route" -- 0 hits, new concept.
relationships: paired with CON-FND-9B1963638789A3 (epinephrine's own clinical-use profile, the parallel fact for the sister catecholamine).

---

# Item

## id
CON-FND-0366B2635DE9A6

## label
Noradrenaline is an agonist at alpha1, alpha2 and beta1 receptors, but not beta2

## canonical_key
teaching.mpt104.pharmacology.catecholamine-receptor-selectivity

## aliases
Catecholamine receptor selectivity
Noradrenaline receptor profile

## arabic_label
انتقائية مستقبلات النورأدرينالين

## arabic_aliases
ملف مستقبلات الكاتيكولامينات

## definition
Noradrenaline's receptor profile is agonist activity at alpha1, alpha2 and beta1 (and beta3) adrenoceptors, but not at beta2 -- distinguishing it from adrenaline, which is an agonist at all four subtypes (alpha1, alpha2, beta1 and beta2), and from isoprenaline, a synthetic agonist essentially selective for beta1/beta2 with negligible alpha activity. This selectivity pattern is why noradrenaline produces potent vasoconstriction (alpha1) with less beta2-mediated vasodilation than adrenaline.

## explicit_objective
State noradrenaline's receptor-selectivity profile (alpha1, alpha2, beta1, not beta2) and contrast it with adrenaline and isoprenaline.

## pitfalls
Including beta2 in noradrenaline's receptor profile, or confusing its profile with adrenaline's (all four subtypes) or isoprenaline's (beta-selective, minimal alpha activity).

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Sympathetic nervous system (agonists) 1

## subtopic
Catecholamine receptor selectivity

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-AGONISTS-1

## related_article_ids

## related_concept_ids
CON-FND-9B1963638789A3

## resource_ids
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
0.8

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The following sympathomimetic amine has agonistic action on alpha1 + alpha 2+ beta 1 + beta 3 adrenoceptors, but not on beta 2 receptors: ... The correct answer is: Noradrenaline" (Quiz 26, Q4, `All Quizzes MPT 2022.pdf` p.98).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 26 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "dopamine cardiogenic shock" and adjacent catecholamine terms -- 0 hits for this receptor-selectivity grain, new concept.
relationships: paired with CON-FND-9B1963638789A3 (epinephrine's clinical uses, contrasted receptor profile).

---

# Item

## id
CON-FND-0F6EF6BCF447E9

## label
Noradrenaline's synaptic action is terminated principally by axonal (neuronal) reuptake

## canonical_key
teaching.mpt104.pharmacology.noradrenaline-termination-axonal-uptake

## aliases
Neuronal reuptake (Uptake-1)
Noradrenaline termination mechanism

## arabic_label
إنهاء فعل النورأدرينالين عبر إعادة الامتصاص العصبي المحوري

## arabic_aliases
آلية إعادة امتصاص النورأدرينالين

## definition
The principal process terminating noradrenaline's action at the synapse, after release from an adrenergic nerve ending, is axonal (neuronal) uptake back into the presynaptic terminal -- often called Uptake-1. Extraneuronal uptake, methylation by catechol-O-methyltransferase (COMT) and degradation by monoamine oxidase (MAO) all contribute to clearing noradrenaline, but axonal reuptake is the principal, quantitatively dominant route.

## explicit_objective
State that axonal (neuronal) reuptake, not extraneuronal uptake, COMT methylation or MAO degradation, is the principal process terminating noradrenaline's synaptic action.

## pitfalls
Naming extraneuronal uptake, COMT or MAO as the principal termination mechanism -- these are real but secondary clearance pathways, not the principal one.

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
Sympathetic nervous system (agonists) 1

## subtopic
Noradrenaline termination mechanism

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-AGONISTS-1

## related_article_ids

## related_concept_ids
CON-FND-286EC65D65A4AB

## resource_ids
src_3e62ae5ed2a35ed7211c

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
0.4

## academic_relevance
0.75

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The principal process which terminates the action of noradrenaline released from adrenergic nerve ending is: ... The correct answer is: Axonal uptake" (Quiz 26, Q5, `All Quizzes MPT 2022.pdf` p.98).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 26 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "axonal uptake noradrenaline termination" -- 0 hits, new concept.
relationships: paired with CON-FND-286EC65D65A4AB (the alpha2-autoreceptor feedback loop that limits release upstream of this reuptake step).

---

# Item

## id
CON-FND-080E1103BD8969

## label
Ephedrine is a noncatecholamine sympathomimetic

## canonical_key
teaching.mpt104.pharmacology.ephedrine-noncatecholamine-sympathomimetic

## aliases
Ephedrine chemistry
Noncatecholamine sympathomimetic

## arabic_label
الإفدرين كودي غير كاتيكولاميني

## arabic_aliases
الفرق بين الكاتيكولامينات وغير الكاتيكولامينات

## definition
Ephedrine, unlike adrenaline, noradrenaline, dopamine and isoprenaline, is a noncatecholamine sympathomimetic -- it lacks the catechol (dihydroxybenzene) ring structure that defines a true catecholamine. This structural difference is part of why ephedrine, unlike the catecholamines, survives first-pass gut and liver metabolism well enough to be given orally.

## explicit_objective
Identify ephedrine as a noncatecholamine sympathomimetic, distinct from the catecholamine agonists (adrenaline, noradrenaline, dopamine, isoprenaline).

## pitfalls
Classing ephedrine as a catecholamine because it is a sympathomimetic amine -- being a sympathomimetic does not require the catechol ring structure that specifically defines a catecholamine.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Sympathetic nervous system (agonists) 1

## subtopic
Catecholamine versus noncatecholamine sympathomimetics

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-AGONISTS-1

## related_article_ids

## related_concept_ids
CON-FND-0366B2635DE9A6

## resource_ids
src_3e62ae5ed2a35ed7211c

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
0.45

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following is a noncatecholamine sympathomimetic: ... The correct answer is: Ephedrine" (Quiz 26, Q6, `All Quizzes MPT 2022.pdf` p.99).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 26 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "ephedrine noncatecholamine" -- 0 hits, new concept.
relationships: paired with CON-FND-0366B2635DE9A6 (the receptor-selectivity concept this structural classification sits alongside).

---

# Item

## id
CON-FND-6DA49885F762FE

## label
Sympathetic postganglionic fibres are the site of adrenergic transmission

## canonical_key
teaching.mpt104.pharmacology.sympathetic-postganglionic-adrenergic-transmission

## aliases
Adrenergic transmission site
Sympathetic postganglionic neurotransmission

## arabic_label
موقع الانتقال الأدريناليني عند الألياف الودية بعد العقدية

## arabic_aliases
الألياف الودية بعد العقدية والنورأدرينالين

## definition
Adrenergic transmission -- release of noradrenaline as the neurotransmitter -- is the property of sympathetic postganglionic fibres specifically. This distinguishes that site from parasympathetic preganglionic fibres (cholinergic, acting on nicotinic receptors at the ganglion) and from the sympathetic fibres innervating the adrenal medulla, which are themselves preganglionic and cholinergic even though the medulla they stimulate secretes catecholamines into the bloodstream as a hormone rather than a synaptic neurotransmitter.

## explicit_objective
State that sympathetic postganglionic fibres are the site of adrenergic (noradrenaline-releasing) transmission, distinct from cholinergic sites including the fibres innervating the adrenal medulla.

## pitfalls
Assuming the sympathetic fibres to the adrenal medulla are themselves adrenergic transmission sites, since they are cholinergic (preganglionic) fibres that stimulate the medulla to secrete catecholamines as a hormone, not synaptic adrenergic transmission at that site itself.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Sympathetic nervous system (agonists) 1

## subtopic
Sites of adrenergic transmission

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-AGONISTS-1

## related_article_ids

## related_concept_ids
CON-FND-080E1103BD8969

## resource_ids
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
0.7

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which one of the following sites is characterized by adrenergic transmission? ... The correct answer is: Sympathetic postganglionic fibers" (Quiz 26, Q7, `All Quizzes MPT 2022.pdf` p.99).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 26 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "adrenergic transmission postganglionic sympathetic fiber" -- 0 hits, new concept.
relationships: closes the Lecture 26 sympathetic-agonists-1 set; paired with CON-FND-080E1103BD8969 (ephedrine's noncatecholamine chemistry).

---

# Item

## id
CON-FND-EF9B8220E32D3F

## label
Regeneration replaces damaged tissue with the same type; organization replaces it with fibrous tissue

## canonical_key
teaching.mpt104.pathology.regeneration-vs-organization

## aliases
Regeneration versus organization
Tissue repair outcomes

## arabic_label
التجدد مقابل التنظيم في إصلاح الأنسجة

## arabic_aliases
نتائج إصلاح الأنسجة

## definition
Regeneration means replacement of the damaged tissue by new tissue of the same type, restoring normal structure and function. Organization, by contrast, means replacement of the damaged tissue by fibrous tissue -- a scar that fills the defect but does not restore the original tissue type or function. Which outcome occurs depends on the regenerative capacity of the tissue's own cells (labile, stable or permanent).

## explicit_objective
State that regeneration replaces damaged tissue with the same tissue type, while organization replaces it with fibrous tissue.

## pitfalls
Swapping the two definitions -- describing organization as replacement by the same tissue type, or regeneration as replacement by fibrous or granulation tissue. Confusing either with calcification or replacement by neural tissue, which are not standard tissue-repair outcomes.

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
Tissue repair: types and mechanisms

## subtopic
Regeneration versus organization

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-TISSUE-REPAIR

## related_article_ids

## related_concept_ids
CON-FND-F4AA1A02CDAEF6
CON-FND-9DEA5636D2473B

## resource_ids
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
0.45

## academic_relevance
0.75

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"8- Organization means replacement of the damaged tissue by: ... The correct answer is: Fibrous tissue" (Quiz 27, Q1, `All Quizzes MPT 2022.pdf` p.101); "Regeneration means: ... The correct answer is: Replacement of the damaged tissue by new one of the same type" (Q6, p.103).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 27 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "regeneration organization fibrous tissue" -- 0 hits, new concept.
relationships: opens the Lecture 27 tissue-repair set; collapses Quiz 27 Q1 and Q6 (organization and regeneration, the paired definitions) onto one concept.

---

# Item

## id
CON-FND-9AC85DE2741A38

## label
A post-surgical nodule with macrophages, giant cells and foreign material is a granuloma around retained suture

## canonical_key
teaching.mpt104.pathology.foreign-body-granuloma-suture-material

## aliases
Foreign-body granuloma (suture)
Post-surgical granuloma

## arabic_label
الورم الحبيبي حول خيوط الجراحة المتبقية

## arabic_aliases
تفاعل الجسم الغريب بعد الجراحة

## definition
A nodule found weeks after a surgical incision, showing macrophages, collagen deposition, lymphocytes, multinucleated giant cells and a foreign refractile material on biopsy, is a foreign-body granuloma forming around retained suture material -- the indigestible suture provokes the same persistent-antigen, macrophage-driven response as any other foreign-body reaction, rather than representing exuberant granulation tissue, hyaline degeneration or an abscess.

## explicit_objective
Recognise a post-surgical nodule with macrophages, giant cells, collagen and refractile foreign material as a foreign-body granuloma around retained suture material.

## pitfalls
Misreading this histological picture as exuberant granulation tissue (excess vascular/fibroblastic proliferation, no giant cells or foreign material), hyaline degeneration (extracellular protein deposition, not a cellular granulomatous reaction), or an abscess (neutrophilic, pus-forming, not giant-cell-and-macrophage-based).

## concept_type
application

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Tissue repair: types and mechanisms

## subtopic
Foreign-body granuloma after surgery

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-TISSUE-REPAIR

## related_article_ids

## related_concept_ids
CON-FND-8F94E784317AC6

## resource_ids
src_3e62ae5ed2a35ed7211c

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
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A 25-year-old has an appendectomy, one month later she palpates a small nodule beneath the skin at the site of the healed sutured incision. The nodule is excised, and microscopic examination shows macrophages, collagen deposition, small lymphocytes, and multinucleated giant cells. A foreign refractile material is seen in the nodule. Which of the following complications of the surgery best accounts for these findings? ... The correct answer is: Granuloma formation" (Quiz 27, Q2, `All Quizzes MPT 2022.pdf` p.102).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 27 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "granuloma foreign body suture material" -- 0 hits, new concept.
relationships: paired with CON-FND-8F94E784317AC6 (the Lecture 25 silicone-implant foreign-body granuloma row, same mechanism in a different clinical vignette).

---

# Item

## id
CON-FND-9DEA5636D2473B

## label
A month-old myocardial infarction shows fibrous scar, since cardiac myocytes are permanent cells

## canonical_key
teaching.mpt104.pathology.mi-healing-fibrous-scar-timeline

## aliases
Myocardial infarction healing
Cardiac scar formation

## arabic_label
الشفاء الليفي بعد احتشاء عضلة القلب

## arabic_aliases
الندبة الليفية بعد شهر من الاحتشاء

## definition
A 58-year-old man's myocardial infarction, examined one month after the event, is expected to show a fibrous scar rather than any form of ongoing necrosis or true regeneration. Cardiac myocytes are permanent cells, so the only possible repair outcome for necrotic myocardium is organization; by one month, the acute necrotic phase (initially coagulative necrosis) has already been replaced by mature fibrous scar tissue.

## explicit_objective
State that a myocardial infarction examined one month later shows fibrous scar, because cardiac myocytes are permanent cells that heal only by organization.

## pitfalls
Selecting liquefactive necrosis, coagulative necrosis or regeneration for a month-old infarct -- coagulative necrosis is the acute-phase finding (days, not a month, later), liquefactive necrosis does not describe myocardial infarction healing, and true regeneration is impossible because cardiac myocytes are permanent cells.

## concept_type
application

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Tissue repair: types and mechanisms

## subtopic
Myocardial infarction healing

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-TISSUE-REPAIR

## related_article_ids

## related_concept_ids
CON-FND-F4AA1A02CDAEF6
CON-FND-EF9B8220E32D3F

## resource_ids
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
0.7

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A 58-year-old man had chest pain persisting for 4 hours. A radiographic imaging procedure showed area of necrosis involving a 4-cm a of the posterior left ventricular free wall. Which of the following pathologic findings would most likely be seen in the left ventricular lesion 1 month later? ... The correct answer is: Fibrous scar" (Quiz 27, Q3, `All Quizzes MPT 2022.pdf` p.102).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 27 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "regeneration organization fibrous tissue" and MI-healing terms -- 0 hits, new concept.
relationships: paired with CON-FND-F4AA1A02CDAEF6 (permanent cells, the fact this application depends on) and CON-FND-EF9B8220E32D3F (organization, the repair outcome this case demonstrates).

---

# Item

## id
CON-FND-F4AA1A02CDAEF6

## label
Labile cells regenerate continuously, stable cells regenerate when stimulated, permanent cells never regenerate

## canonical_key
teaching.mpt104.pathology.labile-stable-permanent-cells

## aliases
Cell regenerative capacity
Labile stable permanent cell classification

## arabic_label
تصنيف الخلايا حسب القدرة التجددية

## arabic_aliases
الخلايا اللاعمة والمستقرة والدائمة

## definition
Cell regenerative capacity is graded into three classes. Labile cells are cells which regenerate continuously during adult life, replacing themselves on an ongoing basis without needing a stimulus (surface epithelium, haematopoietic cells). Stable cells are cells which multiply only when stimulated -- normally quiescent (in the G0 phase), but capable of re-entering the cell cycle after injury (many glandular and parenchymal cells). Permanent cells are cells which never regenerate once mature, of which nerve cells are the standard example -- cardiac and skeletal muscle are the other classic permanent-cell tissues.

## explicit_objective
Classify a tissue's cells as labile (continuous regeneration), stable (regenerates only when stimulated) or permanent (never regenerates, e.g. nerve cells), and state a correct example for each.

## pitfalls
Confusing labile cells (regenerate continuously, no stimulus needed) with stable cells (require a stimulus to regenerate) -- the distinguishing fact is whether ongoing turnover happens by default. Naming a labile-cell tissue (mucous membranes, epidermis, haematopoietic cells) as an example of permanent cells, when nerve cells (along with cardiac and skeletal muscle) are the correct permanent-cell examples.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Tissue repair: types and mechanisms

## subtopic
Cell regenerative capacity

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-TISSUE-REPAIR

## related_article_ids

## related_concept_ids
CON-FND-EF9B8220E32D3F
CON-FND-9DEA5636D2473B

## resource_ids
src_3e62ae5ed2a35ed7211c

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.55

## exam_weight_by_year
AUN_Y1=0.55

## clinical_relevance
0.5

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Cells which never regenerate are called: ... The correct answer is: Permanent cells" (Quiz 27, Q4, `All Quizzes MPT 2022.pdf` p.102); "Labile cells are: ... The correct answer is: Cells which regenerate continuously during adult life" (Q5, p.103); "Stable cells are: ... The correct answer is: Cells which multiply only when stimulated" (Q7, p.103); "Which of the following is an Examples of permanent cells? ... The correct answer is: Nerve cells" (Q8, p.104).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 27 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "labile cells stable cells permanent cells" -- 0 hits, new concept.
relationships: closes the Lecture 27 tissue-repair set; collapses Quiz 27 Q4, Q5, Q7 and Q8 (all testing the same labile/stable/permanent classification) onto one concept; paired with CON-FND-9DEA5636D2473B (the MI-healing application of the permanent-cell fact).

---

# Item

## id
CON-FND-0F673BB3BBD326

## label
Dopamine activates dopaminergic D1/D2 and adrenergic receptors, and may be used in cardiogenic shock

## canonical_key
teaching.mpt104.pharmacology.dopamine-dose-dependent-receptor-pharmacology

## aliases
Dopamine receptor pharmacology
Dopamine in cardiogenic shock

## arabic_label
مستقبلات الدوبامين واستخدامه في الصدمة القلبية

## arabic_aliases
الدوبامين وعلاج صدمة القلب

## definition
Dopamine activates dopaminergic D1 and D2 receptors together with adrenergic alpha and beta receptors -- a multi-receptor profile broader than any other endogenous catecholamine discussed in this course. This multi-receptor activity, including a beta1-mediated inotropic effect, is why dopamine may be used in cardiogenic shock, providing cardiac inotropic support alongside its distinctive dopaminergic action.

## explicit_objective
State that dopamine activates dopaminergic D1/D2 receptors together with adrenergic alpha and beta receptors, and that this profile supports its use in cardiogenic shock.

## pitfalls
Assuming dopamine acts on only dopaminergic receptors or only adrenergic receptors, rather than both families together -- this combined activity is what distinguishes it from a more receptor-restricted catecholamine like isoprenaline or phenylephrine.

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
Sympathetic nervous system (agonists) 2

## subtopic
Dopamine receptor pharmacology

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-AGONISTS-2

## related_article_ids

## related_concept_ids
CON-FND-0366B2635DE9A6

## resource_ids
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
0.65

## academic_relevance
0.75

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"One of the following statements is TRUE regarding sympathomimetics: ... The correct answer is: Dopamine may be used in cardiogenic shock." (Quiz 28, Q1, `All Quizzes MPT 2022.pdf` p.106); "Dopaminergic D1 and D2 as well as adrenergic alpha and beta receptors are activated by: ... The correct answer is: Dopamine" (Q6, p.108).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 28 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "dopamine cardiogenic shock" and "dopamine d1 d2 alpha beta receptors dose" -- 0 hits, new concept.
relationships: opens the Lecture 28 sympathetic-agonists-2 set; collapses Quiz 28 Q1 and Q6 (both testing dopamine's multi-receptor profile) onto one concept; paired with CON-FND-0366B2635DE9A6 (noradrenaline's own, narrower receptor profile from Lecture 26).

---

# Item

## id
CON-FND-4CED62D934193E

## label
Tyramine acts almost exclusively by releasing noradrenaline from nerve endings

## canonical_key
teaching.mpt104.pharmacology.tyramine-indirect-sympathomimetic

## aliases
Tyramine mechanism
Indirect-acting sympathomimetic

## arabic_label
آلية عمل التيرامين بتحرير النورأدرينالين

## arabic_aliases
منبه ودي غير مباشر

## definition
Tyramine is a sympathomimetic amine that acts almost exclusively by releasing noradrenaline from the nerve endings, an indirect mechanism rather than direct receptor agonism. This distinguishes it from direct-acting agonists such as isoprenaline, dopamine and epinephrine, which act on adrenoceptors themselves rather than displacing stored transmitter.

## explicit_objective
State that tyramine acts almost exclusively by releasing noradrenaline from nerve endings, an indirect rather than direct sympathomimetic mechanism.

## pitfalls
Classing tyramine as a direct-acting receptor agonist like a catecholamine, when its action instead depends on displacing noradrenaline already stored in the nerve terminal.

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
Sympathetic nervous system (agonists) 2

## subtopic
Indirect-acting sympathomimetics

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-AGONISTS-2

## related_article_ids

## related_concept_ids
CON-FND-080E1103BD8969

## resource_ids
src_3e62ae5ed2a35ed7211c

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
0.4

## academic_relevance
0.75

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A sympathomimetic amine that acts almost exclusively by releasing noradrenaline from the nerve endings is: ... The correct answer is: Tyramine" (Quiz 28, Q2, `All Quizzes MPT 2022.pdf` p.106).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 28 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "tyramine releases noradrenaline" -- 0 hits, new concept.
relationships: paired with CON-FND-080E1103BD8969 (ephedrine, another noncatecholamine sympathomimetic with partial indirect action).

---

# Item

## id
CON-FND-67CAF7C656F6C5

## label
Phenylephrine produces mydriasis but no cycloplegia, since accommodation is muscarinic-controlled

## canonical_key
teaching.mpt104.pharmacology.phenylephrine-alpha1-mydriasis-no-cycloplegia

## aliases
Phenylephrine ocular effect
Mydriasis without cycloplegia

## arabic_label
توسع الحدقة دون شلل التكيف بالفينيليفرين

## arabic_aliases
تأثير الفينيليفرين على العين

## definition
Phenylephrine, instilled in the eye, produces mydriasis but no cycloplegia. As a selective alpha1 agonist it contracts the iris dilator muscle (alpha1-mediated), producing pupil dilation, but has no action on the ciliary muscle, which is under muscarinic, not adrenergic, control. Accommodation for near vision is therefore unaffected -- unlike an antimuscarinic such as scopolamine, which paralyses the ciliary muscle and produces cycloplegia alongside its mydriasis.

## explicit_objective
State that phenylephrine produces mydriasis without cycloplegia, contrasted with an antimuscarinic's mydriasis-with-cycloplegia.

## pitfalls
Assuming phenylephrine's mydriasis must come with cycloplegia the way an antimuscarinic's does -- the two drugs dilate the pupil through entirely different receptor mechanisms (alpha1 versus muscarinic blockade), and only the muscarinic mechanism also paralyses the ciliary muscle.

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
Sympathetic nervous system (agonists) 2

## subtopic
Phenylephrine ocular pharmacology

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-AGONISTS-2

## related_article_ids

## related_concept_ids
CON-FND-568AAC30667942

## resource_ids
src_3e62ae5ed2a35ed7211c

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
0.75

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Phenylephrine instilled in the eye produces: ... The correct answer is: Mydriasis but no cycloplegia" (Quiz 28, Q4, `All Quizzes MPT 2022.pdf` p.107).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 28 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "phenylephrine mydriasis cycloplegia" -- 0 hits, new concept.
relationships: paired with CON-FND-568AAC30667942 (scopolamine's mydriasis-with-cycloplegia, the contrasting antimuscarinic mechanism from Lecture 24).

---

# Item

## id
CON-FND-BF63B93BB2E9B6

## label
Amphetamine is used clinically in ADHD

## canonical_key
teaching.mpt104.pharmacology.amphetamine-adhd-narcolepsy-use

## aliases
Amphetamine clinical use
ADHD pharmacotherapy

## arabic_label
استخدام الأمفيتامين في علاج فرط الحركة ونقص الانتباه

## arabic_aliases
دواعي استعمال الأمفيتامين

## definition
Amphetamine is used in ADHD, among its established clinical uses. It acts by a dual (direct and indirect) sympathomimetic mechanism, has real abuse potential, and is a CNS stimulant rather than a depressant -- properties that together explain both its therapeutic use and the need for careful prescribing.

## explicit_objective
State that amphetamine's established clinical uses include ADHD, and that it is a CNS stimulant with real abuse potential.

## pitfalls
Assuming amphetamine has no abuse potential, is a CNS depressant, or acts by only a direct or only an indirect mechanism -- amphetamine is a CNS stimulant with genuine abuse potential and a dual direct/indirect mechanism.

## concept_type
application

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Sympathetic nervous system (agonists) 2

## subtopic
Amphetamine clinical pharmacology

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-AGONISTS-2

## related_article_ids

## related_concept_ids
CON-FND-4CED62D934193E

## resource_ids
src_3e62ae5ed2a35ed7211c

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
0.55

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Regarding Amphetamine, one of the following sttaments is TRUE: ... The correct answer is: It is used in ADHD" (Quiz 28, Q5, `All Quizzes MPT 2022.pdf` p.107).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 28 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "amphetamine ADHD" -- 0 hits, new concept.
relationships: paired with CON-FND-4CED62D934193E (tyramine, the other indirect/dual-mechanism sympathomimetic in this cluster).

---

# Item

## id
CON-FND-D7B70CF66505F4

## label
Selective beta2-adrenomimetics can still produce tachycardia as a side effect

## canonical_key
teaching.mpt104.pharmacology.beta2-agonist-tachycardia-side-effect

## aliases
Beta2 agonist side effects
Selective beta2 agonist tachycardia

## arabic_label
تسارع ضربات القلب كأثر جانبي لمنبهات بيتا-2 الانتقائية

## arabic_aliases
الآثار الجانبية لمنبهات بيتا-2

## definition
Selective beta2-adrenomimetics, despite their receptor selectivity, can still produce tachycardia as a side effect -- from some cross-reactivity at beta1 receptors at higher doses, reflex responses to beta2-mediated vasodilation, or direct beta2 effects on the atria. Dry mouth, peripheral vasoconstriction and depression of the breathing centre are not characteristic beta2-agonist effects; if anything, beta2 agonists cause vasodilation and bronchodilation, the opposite of vasoconstriction and respiratory depression.

## explicit_objective
State that tachycardia, not dry mouth, peripheral vasoconstriction or breathing-centre depression, is the characteristic side effect of a selective beta2 agonist.

## pitfalls
Assuming a "selective" beta2 agonist must be free of cardiac side effects, or attributing an antimuscarinic-type effect (dry mouth) or a vasoconstrictive/depressant effect to a beta2 agonist, which instead vasodilates and stimulates rather than depresses.

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
Sympathetic nervous system (agonists) 2

## subtopic
Beta2 agonist side effects

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-AGONISTS-2

## related_article_ids

## related_concept_ids
CON-FND-50FB4649C59276

## resource_ids
src_3e62ae5ed2a35ed7211c

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
0.7

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Select the side-effect characteristic for selective beta2-adrenomimics: ... The correct answer is: Tachycardia" (Quiz 28, Q7, `All Quizzes MPT 2022.pdf` p.108).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 28 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "beta2 adrenomimetic tachycardia side effect" -- 0 hits, new concept.
relationships: closes the Lecture 28 sympathetic-agonists-2 set and the whole Quiz 23-28 cluster; paired with CON-FND-50FB4649C59276 (ipratropium, the other airway-adrenoceptor-adjacent concept in this lane).

---

# Item

## id
CON-FND-DA7931EDFB7CDF

## label
Healing by first intention (apposed edges, low complications) versus second intention (tissue defect, more granulation tissue and complications)

## canonical_key
teaching.pathology.wound-healing.first-vs-second-intention

## aliases
Primary union
Primary intention
Secondary intention
Wound healing patterns

## arabic_label
الشفاء بالنية الأولى مقابل النية الثانية

## arabic_aliases
الالتحام الأولي
الشفاء بالنية الثانوية

## definition
Wound healing follows one of two patterns depending on the size of the tissue defect and whether the wound edges can be apposed. Healing by first intention (primary union) occurs in a clean, incised wound whose edges are closely apposed -- a sutured surgical incision is the standard example -- and needs only a thin fibrin seal and minimal granulation tissue, heals quickly, and carries a low complication rate. Healing by second intention occurs when there is a larger tissue defect and the wound edges cannot be apposed (an abscess cavity, an area of ulceration, an infarct undergoing organisation) -- it requires abundant granulation tissue to fill the gap and heals by wound contraction over a longer period, carrying a higher rate of complications than first intention. A clean surgical wound with apposed edges is the standard example of a lesion that does NOT heal by second intention, precisely because its edges are close enough for primary union instead.

## explicit_objective
Given a description of a wound (edges cleanly apposed vs. a defect with tissue loss/gaping edges), classify it as healing by first or second intention and predict which pathway has more granulation tissue, more complications, and a longer healing time.

## pitfalls
Assuming a surgical wound heals by second intention because an instrument caused it -- what determines the healing pathway is whether the edges are apposed (first intention), not the mechanism of injury. Assuming granulation tissue and complication rates are equal between the two pathways, when second intention specifically means more granulation tissue and more complications precisely because of the larger defect it must fill.

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
Tissue repair: Factors affecting and complications

## subtopic
First versus second intention healing

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-TISSUE-REPAIR-FACTORS

## related_article_ids

## related_concept_ids
CON-FND-EF9B8220E32D3F
CON-FND-FEDFC8ABD0A7E9

## resource_ids
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
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The following lesion does NOT heal by second intention: ... Surgical wound" (Quiz 29 Q3); "Which of the following is a feature of healing by second intention? ... More common complications" (Q4); "Which of the following is characteristic for healing by first intention? ... Occur in clean cut wound" (Q5).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 29 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "healing by second intention" and "healing first intention second intention" -- 0 hits, new concept.
relationships: three quiz rows (Q3/Q4/Q5) collapsed onto this one concept -- the same first-vs-second-intention classification tested three ways (which lesion excludes second intention; second intention's own feature; first intention's own feature).

---

# Item

## id
CON-FND-FEDFC8ABD0A7E9

## label
Apposing wound edges with sutures helps healing; corticosteroids, poor perfusion and bacterial contamination impair it

## canonical_key
teaching.pathology.wound-healing.factors-affecting-outcome

## aliases
Factors affecting wound healing
Wound healing complications

## arabic_label
العوامل المؤثرة على شفاء الجروح

## arabic_aliases
عوامل تعيق الشفاء

## definition
Several local and systemic factors determine whether a wound heals well or poorly. Apposing the wound edges -- for example with sutures -- helps healing by minimising the gap the tissue must bridge, favouring first-intention repair with less granulation tissue and fewer complications. By contrast, corticosteroid therapy impairs healing by suppressing the inflammatory and fibroblastic phases of repair, decreased tissue perfusion impairs healing by limiting the oxygen and nutrient delivery repair depends on, and the presence of bacteria impairs healing by prolonging the inflammatory phase and directly damaging newly formed tissue. A laceration closed with sutures over the following week is expected to heal favourably specifically because apposition, not any of these impairing factors, is present.

## explicit_objective
Given a clinical scenario describing a wound-care factor (sutures/apposition, corticosteroid use, tissue perfusion, bacterial contamination), classify it as helping or impairing wound healing.

## pitfalls
Assuming any intervention around a wound (such as suturing) could only be neutral or that all systemic factors (steroids, perfusion, infection) act the same direction -- apposition specifically helps, while corticosteroids, poor perfusion and bacteria specifically impair, and the exam question tests recognising which single option among the four is the helping one.

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
Tissue repair: Factors affecting and complications

## subtopic
Factors affecting wound healing

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-TISSUE-REPAIR-FACTORS

## related_article_ids

## related_concept_ids
CON-FND-DA7931EDFB7CDF

## resource_ids
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
"A 20-year-old woman sustains an injury to her right calf ... This wound is closed with sutures. Wound healing proceeds over the next week. Which of the following factors will be most likely to help wound healing in this patient? ... Presence of sutures" (Quiz 29 Q2).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 29 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "factors affecting wound healing" and "wound healing sutures" -- 0 hits, new concept.
relationships: paired with CON-FND-DA7931EDFB7CDF (first vs second intention) as the lecture's other tissue-repair-factors grain.

---

# Item

## id
CON-FND-336D4E2FB4FDE2

## label
Labetalol antagonises both alpha1 and beta adrenoceptors, unlike a pure beta-blocker such as propranolol

## canonical_key
teaching.pharmacology.labetalol.combined-alpha-beta-blockade

## aliases
Combined alpha and beta blockade
Labetalol mechanism

## arabic_label
لابيتالول: حصار مستقبلات ألفا وبيتا معاً

## arabic_aliases
حصار مشترك لمستقبلات ألفا وبيتا

## definition
Labetalol is an antihypertensive that antagonises both alpha1-adrenoceptors and beta-adrenoceptors, rather than beta receptors alone. Its cardiovascular effect therefore combines the peripheral vasodilation of alpha1 blockade with the reduction in heart rate and cardiac output of beta blockade. This dual action is the key feature distinguishing labetalol from a pure beta-blocker such as propranolol, which blocks only beta-adrenoceptors and has no alpha1-blocking activity of its own.

## explicit_objective
State that labetalol acts as a combined alpha1- and beta-adrenoceptor antagonist, and identify alpha1-receptor blockade as the specific property that distinguishes it from a pure beta-blocker like propranolol.

## pitfalls
Assuming labetalol is simply another selective or nonselective beta-blocker like propranolol -- its defining pharmacological feature, tested repeatedly, is that it also blocks alpha1-adrenoceptors, which propranolol does not.

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
Sympathetic nervous system (antagonists) 1

## subtopic
Labetalol combined blockade

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-ANTAGONISTS-1

## related_article_ids

## related_concept_ids
CON-FND-079D093B2D302D

## resource_ids
src_3e62ae5ed2a35ed7211c

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.55

## exam_weight_by_year
AUN_Y1=0.55

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
"A 34-year-old man is prescribed labetalol for hypertension. The effect on the cardiovascular system is a result of its action as an antagonist at which of the following? ... Both alpha and beta-adrenoceptors" (Quiz 30 Q1); "Labetalol is an effective antihypertensive agent that, like propranolol, is capable of blocking beta receptors. An important difference between the two drugs is that labetalol: ... has alpha1 receptor blocking actions" (Q7).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 30 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "labetalol alpha beta blocker" -- 0 hits, new concept.
relationships: two quiz rows (Q1/Q7) collapsed onto this one concept -- the same labetalol dual-blockade fact tested by mechanism (Q1) and by contrast with propranolol (Q7).

---

# Item

## id
CON-FND-1E5ADF2DEB83AF

## label
Prazosin (alpha1 blockade) prevents epinephrine's mydriasis without blocking its other adrenergic actions

## canonical_key
teaching.pharmacology.prazosin.blocks-alpha1-mediated-mydriasis

## aliases
Alpha1 blockade and mydriasis
Prazosin mechanism

## arabic_label
البرازوسين يمنع توسع الحدقة الناتج عن الأدرينالين

## arabic_aliases
حصار مستقبلات ألفا 1 وتوسع الحدقة

## definition
Epinephrine produces mydriasis (pupil dilation) by activating alpha1-adrenoceptors on the iris dilator muscle. Prazosin is a selective alpha1-adrenoceptor antagonist, so pretreatment with prazosin blocks this specific alpha1-mediated action of epinephrine, preventing the mydriasis that would otherwise occur. Epinephrine's other actions mediated through beta-adrenoceptors -- such as increased heart rate and increased cardiac stroke volume -- are not blocked by prazosin, since those depend on a different receptor family that prazosin does not antagonise.

## explicit_objective
Identify mydriasis as the specific epinephrine action blocked by the alpha1-selective antagonist prazosin, distinguishing it from epinephrine's beta-receptor-mediated cardiac actions, which prazosin does not block.

## pitfalls
Assuming an alpha1 blocker like prazosin blocks every action of epinephrine -- prazosin blocks only the alpha1-mediated actions (such as mydriasis), leaving epinephrine's beta-mediated cardiac effects (heart rate, stroke volume) and beta2-mediated bronchodilation unaffected.

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
Sympathetic nervous system (antagonists) 1

## subtopic
Alpha1 blockade selectivity

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-ANTAGONISTS-1

## related_article_ids

## related_concept_ids
CON-FND-079D093B2D302D

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following actions of epinephrine is blocked by prazosin? ... Mydriasis" (Quiz 30 Q2).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 30 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "prazosin blocks mydriasis" -- 0 hits, new concept.
relationships: paired with CON-FND-079D093B2D302D (prazosin's own clinical profile) as a second, mechanism-level prazosin grain.

---

# Item

## id
CON-FND-04576C33B4A433

## label
Tamsulosin's alpha1A selectivity makes it the preferred alpha blocker for benign prostatic hypertrophy

## canonical_key
teaching.pharmacology.tamsulosin.alpha1a-selectivity-bph

## aliases
Alpha1A subtype selectivity
Tamsulosin for BPH

## arabic_label
تامسولوسين وانتقائية مستقبلات ألفا 1أ في تضخم البروستاتا

## arabic_aliases
انتقائية تامسولوسين لعلاج تضخم البروستاتا الحميد

## definition
Alpha1-adrenoceptors have subtypes, and the alpha1A subtype predominates in prostatic and lower-urinary-tract smooth muscle. Tamsulosin is selective for the alpha1A subtype, which relaxes prostatic and bladder-neck smooth muscle to relieve the obstructive symptoms of benign prostatic hypertrophy (BPH) while producing comparatively less vascular (blood-pressure-lowering) alpha1 blockade than a nonselective alpha1 antagonist. This alpha1A selectivity is why tamsulosin, among the alpha blockers, is the one most specifically favoured for BPH.

## explicit_objective
State that tamsulosin's selectivity for the alpha1A receptor subtype, concentrated in prostatic/bladder-neck smooth muscle, is why it is the most appropriate alpha blocker choice for benign prostatic hypertrophy among nonselective alternatives.

## pitfalls
Assuming any alpha1 blocker is equally suited to BPH -- the exam point is specifically alpha1A subtype selectivity, which concentrates the drug's effect on prostatic/bladder-neck smooth muscle rather than the vasculature broadly.

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
Sympathetic nervous system (antagonists) 1

## subtopic
Alpha1 subtype selectivity

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-ANTAGONISTS-1

## related_article_ids

## related_concept_ids
CON-FND-079D093B2D302D

## resource_ids
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
"One of the following drugs is the most appropriate for treating patients with BPH (benign prostatic hypertrophy) because of selectivity on alpha1A: ... Tamsulosin" (Quiz 30 Q3).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 30 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "tamsulosin BPH alpha1A" -- 0 hits, new concept.
relationships: distinguished from CON-FND-079D093B2D302D (prazosin's own BPH benefit/postural-hypotension profile) -- a different specific drug and its subtype-selectivity rationale.

---

# Item

## id
CON-FND-122E61D54D6B33

## label
Doxazosin has a long duration of action, about 36 hours

## canonical_key
teaching.pharmacology.doxazosin.duration-of-action

## aliases
Doxazosin pharmacokinetics
Long-acting alpha blocker

## arabic_label
دوكسازوسين ومدة تأثيره الطويلة

## arabic_aliases
مدة فعالية الدوكسازوسين

## definition
Doxazosin is a long-acting alpha1-adrenoceptor antagonist used in hypertension and benign prostatic hypertrophy. Its duration of action is approximately 36 hours, considerably longer than shorter-acting alpha1 blockers such as prazosin, which allows for once-daily dosing. This pharmacokinetic property is the specific fact the exam tests about doxazosin, distinguishing it numerically from the other duration options offered.

## explicit_objective
State that doxazosin's duration of action is approximately 36 hours, supporting once-daily dosing.

## pitfalls
Confusing doxazosin's long duration with the shorter action of other alpha blockers such as prazosin -- the specific number tested here (36 hours) is what distinguishes doxazosin's dosing convenience.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Sympathetic nervous system (antagonists) 1

## subtopic
Alpha blocker pharmacokinetics

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-ANTAGONISTS-1

## related_article_ids

## related_concept_ids

## resource_ids
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
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The duration of action of doxazosin is: ... 36 hours" (Quiz 30 Q4).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 30 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "doxazosin duration action" -- 0 hits, new concept.
relationships: none within this cluster; a standalone alpha-blocker pharmacokinetic fact.

---

# Item

## id
CON-FND-60671E2F8BA372

## label
Clonidine stimulates presynaptic alpha2 autoreceptors, inhibiting further norepinephrine release

## canonical_key
teaching.pharmacology.clonidine.presynaptic-alpha2-autoreceptor

## aliases
Presynaptic alpha2 negative feedback
Clonidine mechanism

## arabic_label
كلونيدين ومستقبلات ألفا 2 قبل المشبكية

## arabic_aliases
تثبيط إفراز النورادرينالين عبر مستقبلات ألفا 2

## definition
Presynaptic alpha2-adrenoceptors on sympathetic nerve endings act as autoreceptors, providing negative feedback on the nerve's own neurotransmitter release. Clonidine is an alpha2 agonist that stimulates these presynaptic alpha2 receptors, which inhibits further release of norepinephrine from the nerve ending. This presynaptic inhibitory feedback -- reducing, not enhancing, transmitter release -- is the mechanism behind clonidine's centrally-mediated antihypertensive effect.

## explicit_objective
State that stimulating presynaptic alpha2 receptors (as clonidine does) inhibits norepinephrine release from the sympathetic nerve ending, rather than enhancing it or acting on postsynaptic/cholinergic pathways.

## pitfalls
Confusing a presynaptic alpha2 autoreceptor's negative-feedback role with a postsynaptic receptor's excitatory role, or assuming alpha2 stimulation enhances rather than inhibits further transmitter release.

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
Sympathetic nervous system (antagonists) 1

## subtopic
Presynaptic alpha2 autoreceptors

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-ANTAGONISTS-1

## related_article_ids

## related_concept_ids

## resource_ids
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
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Stimulation of presynaptic alpha2 receptors by clonidine results in: ... Inhibition of NEP release from nerve ending" (Quiz 30 Q6).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 30 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "clonidine presynaptic alpha2 autoreceptor" -- 0 hits, new concept.
relationships: none within this cluster; a standalone autonomic-pharmacology mechanism.

---

# Item

## id
CON-FND-EE37B17A3F012A

## label
Combined alpha and beta blockade (phentolamine plus nadolol) treats pheochromocytoma

## canonical_key
teaching.pharmacology.pheochromocytoma.combined-alpha-beta-blockade-treatment

## aliases
Pheochromocytoma pharmacotherapy
Phentolamine plus beta blocker

## arabic_label
علاج الفيوكروموسيتوما بحصار ألفا وبيتا معاً

## arabic_aliases
فينتولامين مع نادولول لعلاج الفيوكروموسيتوما

## definition
Pheochromocytoma is a catecholamine-secreting tumour whose excess epinephrine and norepinephrine drive both alpha-mediated vasoconstriction/hypertension and beta-mediated tachycardia. Management combines an alpha blocker such as phentolamine with a beta blocker such as nadolol, controlling both arms of the catecholamine excess. Among the drug pairs offered, phentolamine plus nadolol is the combination that supplies both an alpha antagonist and a beta antagonist together, which is why it is the better choice for this patient.

## explicit_objective
State that pheochromocytoma is managed with combined alpha- and beta-adrenoceptor blockade (e.g. phentolamine plus nadolol), rather than an alpha-blocker-only or beta-blocker-only combination.

## pitfalls
Choosing a combination of two alpha blockers (no beta component) or omitting the alpha blocker altogether -- pheochromocytoma management specifically needs both receptor families blocked, and alpha blockade must never be started after an unopposed beta blocker.

## concept_type
clinical_application

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Sympathetic nervous system (antagonists) 1

## subtopic
Pheochromocytoma pharmacotherapy

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-ANTAGONISTS-1

## related_article_ids

## related_concept_ids
CON-FND-533365E0002414

## resource_ids
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
0.7

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
"Pheochromocytoma is better to be treated by: ... Phentolamine + nadolol" (Quiz 30 Q8).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 30 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "phentolamine pheochromocytoma nadolol" -- 0 hits, new concept.
relationships: paired with CON-FND-533365E0002414 (phentolamine's own nonselective-blockade mechanism) as the lecture's second phentolamine grain.

---

# Item

## id
CON-FND-72AE046215C924

## label
Alpha1-adrenoceptor stimulation raises IP3 and DAG, increasing intracellular calcium

## canonical_key
teaching.pharmacology.alpha1-receptor.ip3-dag-calcium-signalling

## aliases
Alpha1 receptor second messengers
Gq-coupled alpha1 signalling

## arabic_label
مستقبلات ألفا 1 ومسار IP3 وDAG

## arabic_aliases
إشارات الكالسيوم عبر مستقبلات ألفا 1

## definition
Alpha1-adrenoceptors are Gq-protein-coupled receptors. Their stimulation activates phospholipase C, generating the second messengers IP3 (inositol trisphosphate) and DAG (diacylglycerol); IP3 releases calcium from intracellular stores, raising cytosolic calcium and producing the receptor's downstream effects such as smooth-muscle contraction. This IP3/DAG/calcium signalling pathway is specific to Gq-coupled receptors like alpha1, distinguishing it from beta-adrenoceptors (Gs-coupled, cAMP) or muscarinic M2 receptors (Gi-coupled, decreased cAMP).

## explicit_objective
Identify alpha1-adrenoceptor stimulation as the autonomic receptor pathway that raises IP3 and DAG and increases intracellular calcium, distinguishing it from beta-adrenergic, dopaminergic and muscarinic M2 signalling.

## pitfalls
Confusing Gq-coupled alpha1 signalling (IP3/DAG/calcium) with Gs-coupled beta-receptor signalling (cAMP) or Gi-coupled M2/alpha2 signalling (decreased cAMP) -- each receptor family uses a distinct second-messenger system.

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
Sympathetic nervous system (antagonists) 1

## subtopic
Alpha1 receptor signal transduction

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-ANTAGONISTS-1

## related_article_ids

## related_concept_ids

## resource_ids
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
0.8

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Stimulation of which of the following autonomic receptors would be expected to increase IP3 and DAG 'second messengers' resulting in rise of calcium? ... A1-adrenergic receptors" (Quiz 30 Q9).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 30 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "alpha1 receptor IP3 DAG calcium second messenger" -- 0 hits, new concept.
relationships: none within this cluster; a standalone receptor-signal-transduction fact, related in theme to Lecture 4's G-protein-coupled receptor concepts (CON-FND-47418DE70D5CDC) authored earlier in this module.

---

# Item

## id
CON-FND-533365E0002414

## label
Phentolamine is a nonselective alpha1/alpha2 antagonist that lowers blood pressure by blocking both alpha subtypes

## canonical_key
teaching.pharmacology.phentolamine.nonselective-alpha-blockade-mechanism

## aliases
Nonselective alpha blocker mechanism
Phentolamine mechanism

## arabic_label
فينتولامين وحصار مستقبلات ألفا غير الانتقائي

## arabic_aliases
آلية عمل الفينتولامين

## definition
Phentolamine is a nonselective alpha-adrenoceptor antagonist, blocking both alpha1 and alpha2 receptors rather than one subtype alone. Blocking alpha1 receptors on vascular smooth muscle produces vasodilation, and this combined alpha1/alpha2 blockade is the mechanism by which phentolamine lowers blood pressure. This nonselective action is what makes it useful for acute, reversible alpha blockade -- for example in a pheochromocytoma crisis -- distinguishing it from an alpha1-selective agent such as prazosin or tamsulosin.

## explicit_objective
State that phentolamine lowers blood pressure by blocking both alpha1 and alpha2 receptors (nonselective alpha blockade), not by an alpha1-selective mechanism alone.

## pitfalls
Confusing phentolamine's nonselective alpha1/alpha2 blockade with the alpha1-selective mechanism of prazosin, tamsulosin or doxazosin -- the exam distinguishes phentolamine specifically by naming both alpha subtypes.

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
Sympathetic nervous system (antagonists) 1

## subtopic
Nonselective alpha blockade

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-ANTAGONISTS-1

## related_article_ids

## related_concept_ids
CON-FND-EE37B17A3F012A

## resource_ids
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
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Phentolamine was used in this patient, because: ... It decreases BP by blocking receptors, both alpha 1 [and alpha 2]" (Quiz 30 Q10; the printed option text truncates after "both alpha 1," read as "both alpha 1 and alpha 2" given phentolamine's known nonselective mechanism).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
Q10's option text truncates mid-sentence in the extracted PDF text ("both alpha 1"); completed as "both alpha 1 and alpha 2" based on phentolamine's standard nonselective mechanism, since the other three options (anxiolytic effect, antipsychotic effects, increases BP) are clearly wrong regardless. No department lecture-deck source exists for Lecture 30 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "phentolamine nonselective alpha blocker" -- 0 hits, new concept.
relationships: paired with CON-FND-EE37B17A3F012A (phentolamine's own pheochromocytoma-combination use) as the lecture's other phentolamine grain.

---

# Item

## id
CON-FND-079D093B2D302D

## label
Prazosin dilates arterioles and veins, benefits BPH, and causes postural hypotension as a first-dose effect

## canonical_key
teaching.pharmacology.prazosin.clinical-profile

## aliases
Prazosin clinical effects
First-dose effect

## arabic_label
الخصائص السريرية للبرازوسين

## arabic_aliases
تأثير الجرعة الأولى للبرازوسين

## definition
Prazosin is a selective alpha1-adrenoceptor antagonist that dilates both arterioles and veins, lowering peripheral resistance and venous return. It is beneficial in patients with benign prostatic hypertrophy, since alpha1 blockade relaxes prostatic and bladder-neck smooth muscle. A well-known adverse effect is postural (orthostatic) hypotension with dizziness and fainting, most pronounced after the very first dose (the "first-dose effect"), a consequence of the abrupt venous and arteriolar dilation before compensatory mechanisms adjust.

## explicit_objective
State that prazosin dilates arterioles and veins, benefits patients with BPH, and causes first-dose postural hypotension with dizziness/fainting -- and identify "not beneficial in BPH" as the false statement among prazosin's properties.

## pitfalls
Believing prazosin is not beneficial in BPH -- alpha1 blockade specifically relaxes prostatic/bladder-neck smooth muscle, making prazosin (like other alpha1 blockers) beneficial in BPH, not contraindicated or ineffective.

## concept_type
clinical_application

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Sympathetic nervous system (antagonists) 1

## subtopic
Prazosin clinical profile

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-ANTAGONISTS-1

## related_article_ids

## related_concept_ids
CON-FND-1E5ADF2DEB83AF
CON-FND-336D4E2FB4FDE2

## resource_ids
src_3e62ae5ed2a35ed7211c

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.55

## exam_weight_by_year
AUN_Y1=0.55

## clinical_relevance
0.65

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
"Regarding PRAZOSIN, one is false: ... It is not beneficial in patients with BPH [marked as the FALSE statement]" (Quiz 30 Q11).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 30 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "prazosin BPH postural hypotension first dose" -- 0 hits, new concept.
relationships: paired with CON-FND-1E5ADF2DEB83AF (prazosin's mydriasis-blocking mechanism) and CON-FND-336D4E2FB4FDE2 (labetalol, the lecture's other combined/selective-blockade drug); this concept's own printed-key answer directly evidences why Q238 (alpha-blocker least-likely-use, marking BPH) is held as a conflict -- prazosin is confirmed beneficial in BPH by this same quiz.

---

# Item

## id
CON-FND-B74CD5B149F399

## label
Active hyperemia is arteriolar dilation increasing blood flow into a tissue, as in blushing

## canonical_key
teaching.pathology.hemodynamics.active-hyperemia

## aliases
Physiological hyperemia
Blushing

## arabic_label
الاحتقان الفعال (فرط الدم النشط)

## arabic_aliases
احتقان فسيولوجي

## definition
Active hyperemia is an increase in blood flow into a tissue caused by arteriolar dilation, an active physiological process. Blushing after an embarrassing moment is the standard example: sympathetic withdrawal and local vasodilator mechanisms dilate facial arterioles, increasing arterial inflow and reddening the skin. This is distinct from passive congestion, in which impaired venous outflow (not increased arterial inflow) causes blood to accumulate in a tissue, and from reactive hyperemia, the specific post-ischaemic subtype of increased flow that follows a period of arterial occlusion rather than a physiological trigger.

## explicit_objective
Identify blushing (arteriolar dilation increasing arterial inflow) as an example of active hyperemia, distinguishing it from passive/venous congestion and from the post-ischaemic subtype, reactive hyperemia.

## pitfalls
Confusing active hyperemia (arteriolar dilation, increased arterial inflow, an active process) with passive congestion (impaired venous outflow, a passive process) -- both redden or discolour tissue, but by opposite vascular mechanisms. Also confusing general active hyperemia with reactive hyperemia specifically, which names the post-ischaemic subtype rather than every case of arteriolar-dilation-driven increased flow.

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
Heamodynamic disorders: Hyperemia, congestion and thrombosis

## subtopic
Active hyperemia

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-HYPEREMIA-CONGESTION-THROMBOSIS

## related_article_ids

## related_concept_ids

## resource_ids
src_3e62ae5ed2a35ed7211c

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
0.4

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A 22-year-old second-year medical student develops a 'red' face after being asked a question during lecture. Which of the following statements best describes this vascular reaction? ... Active hyperemia" (Quiz 31 Q1).

## merge_ids

## rejected_merge_candidate_ids
docs/Kasr-Source-Imports/glossary/104-CPS-glossary.md "Reactive hyperemia" -- near-match term (both are hyperemia subtypes), but reactive hyperemia specifically names the post-ischaemic increase-in-flow subtype (e.g. after releasing a tourniquet), while this concept tests the general active-hyperemia mechanism via a purely physiological trigger (blushing, no preceding ischaemia) -- not the same concept, per the standing near-match-confirm-before-merge rule (coverage/AUN-MPT-104-triage.md §7).

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 31 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "active hyperemia blushing" and "reactive hyperemia" -- the second query hit a pending Kasr 104-CPS-glossary term ("Reactive hyperemia"), checked and rejected as a near-match, not the same concept (see rejected_merge_candidate_ids); minted new.
relationships: none within this cluster; a standalone hemodynamics-vocabulary concept.

---

# Item

## id
CON-FND-11AE7596C68944

## label
Phlebothrombosis is thrombus formation in a non-inflamed vein, typically from immobilization

## canonical_key
teaching.pathology.hemodynamics.phlebothrombosis

## aliases
Deep vein thrombosis
Venous thrombosis in non-inflamed veins

## arabic_label
تجلط الأوردة (فليبوثرومبوزس)

## arabic_aliases
تجلط الأوردة العميقة

## definition
Phlebothrombosis is thrombus formation within a non-inflamed vein, distinguishing it from thrombophlebitis, in which the thrombus forms in a vein already inflamed. Immobilization -- for example after a fracture requiring bed rest -- is a classic precipitating factor, since venous stasis (one arm of Virchow's triad) promotes clot formation in the stagnant blood of a non-inflamed deep vein. Local swelling, warmth, pain and tenderness in the affected limb, appearing days to weeks after immobilization began, are the clinical picture that should raise phlebothrombosis (deep vein thrombosis) as the diagnosis.

## explicit_objective
Given a vignette of immobilization followed by limb swelling, warmth, pain and tenderness, identify phlebothrombosis as the underlying process, and state that it forms in non-inflamed veins with immobilization as a precipitating mechanism.

## pitfalls
Confusing phlebothrombosis (a non-inflamed vein) with thrombophlebitis (an already-inflamed vein) -- these are distinguished by whether inflammation preceded the thrombus, not by the presence of a thrombus itself, and the exam names "non-inflamed veins" specifically as phlebothrombosis's defining site.

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
Heamodynamic disorders: Hyperemia, congestion and thrombosis

## subtopic
Phlebothrombosis

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-HYPEREMIA-CONGESTION-THROMBOSIS

## related_article_ids

## related_concept_ids
CON-FND-7C0F3DB1C2FE5E
CON-FND-9968E677B951D2

## resource_ids
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
"A 60-year-old woman sustained fractures ... During a physical examination 3 weeks later, the physician observes swelling and warmth in the left leg, and there is local pain and tenderness in the left thigh. Which of the following processes is most likely occurring in the femoral vein? ... Phlebothrombosis" (Quiz 31 Q2); "In phlebothrombosis the thrombus is formed in: ... non inflamed veins" (Q5).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 31 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "phlebothrombosis" -- 0 hits, new concept.
relationships: two quiz rows (Q2/Q5) collapsed onto this one concept -- the same phlebothrombosis fact tested by clinical vignette (Q2) and by direct definition (Q5, non-inflamed veins).

---

# Item

## id
CON-FND-38DC299E60FE95

## label
Chronic general venous congestion is caused by right-sided heart failure

## canonical_key
teaching.pathology.hemodynamics.chronic-venous-congestion-right-heart-failure

## aliases
Chronic passive congestion
Right heart failure and congestion

## arabic_label
الاحتقان الوريدي المزمن العام والفشل القلبي الأيمن

## arabic_aliases
قصور القلب الأيمن والاحتقان الوريدي

## definition
Chronic general (systemic) venous congestion occurs when the right side of the heart fails to pump venous return forward effectively, so blood backs up in the systemic venous system. Right-sided heart failure is the classic cause of this generalized, chronic pattern of congestion, producing findings such as hepatic and splenic congestion, dependent oedema and elevated jugular venous pressure. This is distinct from a localized cause of venous obstruction, such as compression by a tumour or an enlarged lymph node, which produces regional rather than systemic congestion.

## explicit_objective
State that chronic general (systemic) venous congestion is caused by right-sided heart failure, distinguishing it from a localized compressive cause of venous obstruction.

## pitfalls
Confusing a systemic/general pattern of chronic venous congestion (right heart failure) with a localized cause of venous obstruction (compression by a tumour or enlarged lymph node), which would produce regional, not generalized, congestion.

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
Heamodynamic disorders: Hyperemia, congestion and thrombosis

## subtopic
Chronic venous congestion

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-HYPEREMIA-CONGESTION-THROMBOSIS

## related_article_ids

## related_concept_ids

## resource_ids
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
"Chronic general venous congestion is noticed in patients with: ... Right sided heart failure" (Quiz 31 Q3).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 31 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "chronic venous congestion right heart failure" -- 0 hits, new concept.
relationships: none within this cluster; a standalone hemodynamics-vocabulary concept.

---

# Item

## id
CON-FND-7C0F3DB1C2FE5E

## label
A detached non-septic venous thrombus embolises to the lung

## canonical_key
teaching.pathology.hemodynamics.venous-thrombus-embolises-to-lung

## aliases
Pulmonary embolism source
Venous thromboembolism destination

## arabic_label
الجلطة الوريدية المنفصلة تنتقل إلى الرئة

## arabic_aliases
الانصمام الرئوي من جلطة وريدية

## definition
A thrombus that forms in the systemic venous circulation and detaches (becoming an embolus) travels with venous blood flow back to the right side of the heart and out into the pulmonary arterial circulation, lodging in the lung as a pulmonary embolus. This venous-to-pulmonary pathway is why a detached non-septic venous thrombus (as opposed to an arterial or left-heart thrombus, which would embolise systemically) specifically goes to the lung.

## explicit_objective
State that a detached non-septic venous thrombus embolises to the lung, via the venous-return pathway to the right heart and pulmonary circulation.

## pitfalls
Confusing the destination of a venous embolus (the lung, via the right heart) with that of an arterial or left-heart embolus (which travels systemically to the brain, kidney, spleen or limbs) -- the venous side of the circulation empties specifically into the pulmonary arteries.

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
Heamodynamic disorders: Hyperemia, congestion and thrombosis

## subtopic
Venous embolism pathway

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-HYPEREMIA-CONGESTION-THROMBOSIS

## related_article_ids

## related_concept_ids
CON-FND-11AE7596C68944

## resource_ids
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
"Detached non septic venous thrombus goes to the: ... Lung" (Quiz 31 Q4).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 31 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "detached venous thrombus lung" -- 0 hits, new concept.
relationships: paired with CON-FND-11AE7596C68944 (phlebothrombosis) as the lecture's venous-thromboembolism pair.

---

# Item

## id
CON-FND-E1D44B7FCA92D9

## label
Lines of Zahn -- alternating platelet-rich pale layers seen in an antemortem thrombus

## canonical_key
teaching.pathology.hemodynamics.lines-of-zahn

## aliases
Antemortem thrombus microscopy
Zahn lines

## arabic_label
خطوط زان في الجلطة

## arabic_aliases
الخطوط المميزة للجلطة الحية

## definition
Lines of Zahn are alternating pale and dark bands seen grossly and microscopically within a thrombus that formed in flowing blood during life (antemortem), distinguishing a true thrombus from a postmortem clot, which lacks this layered structure. The pale bands correspond to layers of platelets (with fibrin), laid down in sequence as the thrombus builds up within the vessel, giving the platelet component its identity as the structural feature named by Lines of Zahn among the option set.

## explicit_objective
State that Lines of Zahn consist of columns/layers of platelets, and that their presence distinguishes an antemortem thrombus from a postmortem clot.

## pitfalls
Naming red blood cells, fibrin alone or white blood cells rather than platelets as the component that defines Lines of Zahn's pale layers, or forgetting that their presence (not their absence) is what indicates a thrombus formed during life.

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
Heamodynamic disorders: Hyperemia, congestion and thrombosis

## subtopic
Antemortem thrombus features

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-HYPEREMIA-CONGESTION-THROMBOSIS

## related_article_ids

## related_concept_ids
CON-FND-9968E677B951D2

## resource_ids
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
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Lines of Zahn consist of: ... columns of platelets" (Quiz 31 Q6).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 31 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "lines of zahn platelets fibrin thrombus" -- 0 hits, new concept.
relationships: paired with CON-FND-9968E677B951D2 (Virchow's triad/thrombus formation) as the lecture's other thrombus-morphology grain; also the direct pharmacology-fact evidence behind the Q7 (q251) hold, since "during life" is the defining feature of a thrombus, not a clot.

---

# Item

## id
CON-FND-9968E677B951D2

## label
Virchow's triad concerns the three factors predisposing to thrombus formation

## canonical_key
teaching.pathology.hemodynamics.virchows-triad-thrombus-formation

## aliases
Virchow triad
Thrombosis risk factors

## arabic_label
ثالوث فيرشو وتكوين الجلطة

## arabic_aliases
عوامل تكوين الجلطة الدموية

## definition
Virchow's triad names the three broad categories of factors that predispose to thrombus formation: endothelial injury, stasis (or turbulence) of blood flow, and hypercoagulability of the blood. The triad is specifically about thrombus formation, not about embolus, ecchymosis or haematoma, which are separate hemodynamic entities that do not share this same three-factor causal framework.

## explicit_objective
State that Virchow's triad concerns the formation of a thrombus, not an embolus, ecchymosis or haematoma.

## pitfalls
Confusing Virchow's triad's target concept (thrombus formation) with a related but distinct hemodynamic entity such as embolus (a thrombus fragment that has already detached and travelled) or a haemorrhagic lesion (ecchymosis, haematoma), which are not what the triad's three risk factors explain.

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
Heamodynamic disorders: Hyperemia, congestion and thrombosis

## subtopic
Virchow's triad

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-HYPEREMIA-CONGESTION-THROMBOSIS

## related_article_ids

## related_concept_ids
CON-FND-E1D44B7FCA92D9

## resource_ids
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
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Virchow's triad is concerned with the formation of: ... Thrombus" (Quiz 31 Q8).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 31 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "virchow triad thrombus" -- 0 hits, new concept.
relationships: paired with CON-FND-E1D44B7FCA92D9 (Lines of Zahn) as the lecture's other thrombus-vocabulary grain; also the direct evidence behind the Q7 (q251) hold, since this question confirms "thrombus," not "clot," is this lecture's own consistently-used term for antemortem intravascular solidification.

---

# Item

## id
CON-FND-B7FEBDE2C2B183

## label
Esmolol is an ultra-short-acting beta blocker used for perioperative tachyarrhythmias

## canonical_key
teaching.pharmacology.esmolol.ultra-short-acting-perioperative

## aliases
Esmolol mechanism
Perioperative beta blockade

## arabic_label
إسمولول: حاصر بيتا فائق قصر المفعول

## arabic_aliases
حاصر بيتا لعلاج اضطراب النظم بعد الجراحة

## definition
Esmolol is a cardioselective (beta1-selective) beta-adrenoceptor antagonist with an ultra-short duration of action, metabolised rapidly by plasma esterases. This short, easily-titratable action makes it the preferred beta blocker for controlling acute perioperative tachycardia and extrasystoles, such as those appearing after recovery from general anaesthesia, where a rapidly reversible drug is needed. Its brief action distinguishes it from longer-acting beta blockers, which would be harder to titrate safely in this acute perioperative setting.

## explicit_objective
State that esmolol, an ultra-short-acting beta blocker, is the preferred agent for controlling acute perioperative tachycardia and extrasystoles.

## pitfalls
Choosing a longer-acting beta blocker or a non-beta-blocking drug for acute perioperative arrhythmia control -- esmolol's specific advantage here is its ultra-short, easily-titratable duration of action, not general beta-blocking potency.

## concept_type
clinical_application

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Sympathetic nervous system (antagonists) 2

## subtopic
Esmolol perioperative use

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-ANTAGONISTS-2

## related_article_ids

## related_concept_ids

## resource_ids
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
0.65

## academic_relevance
0.55

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"35 years old patient was operated for inguinal hernia ... tachycardia and extrasystoles were observed ... which drugs are helpful? ... Esmolol is special beta blocker used in this case" (Quiz 32 Q1).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 32 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "esmolol perioperative arrhythmia" -- 0 hits, new concept.
relationships: none within this cluster; a standalone beta-blocker-selection concept, thematically related to CON-FND-18D519B39F98A4 and CON-FND-BB97C931CB8423 as the lecture's other beta-blocker grains.

---

# Item

## id
CON-FND-18D519B39F98A4

## label
Propranolol masks the adrenergic warning symptoms of hypoglycemia in diabetics, rather than causing hyperglycemia

## canonical_key
teaching.pharmacology.propranolol.masks-hypoglycemia-symptoms

## aliases
Nonselective beta blocker and hypoglycemia
Propranolol in diabetics

## arabic_label
بروبرانولول وإخفاء أعراض نقص السكر في الدم

## arabic_aliases
حاصرات بيتا ونقص السكر في الدم لدى مرضى السكري

## definition
Propranolol, a nonselective beta blocker, is used with extra caution in a diabetic patient treated with insulin, because it masks the adrenergic warning symptoms of hypoglycemia -- tachycardia, tremor and palpitations -- that would normally alert the patient to falling blood glucose. This masking effect, not a direct hyperglycemic action, is propranolol's actual metabolic concern in diabetes: the statement that propranolol "causes hyperglycemia" is false, since its real risk is concealing, and potentially prolonging recognition of, an existing hypoglycemic episode.

## explicit_objective
State that propranolol's concern in insulin-treated diabetics is masking the adrenergic symptoms of hypoglycemia, and identify "propranolol causes hyperglycemia" as a false statement about beta blockers.

## pitfalls
Believing propranolol's diabetic concern is that it directly causes hyperglycemia -- the actual, tested mechanism is that it masks the adrenergic warning symptoms of hypoglycemia, which is a different and more dangerous problem (delayed recognition of low blood sugar), not elevated blood sugar itself.

## concept_type
clinical_application

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Sympathetic nervous system (antagonists) 2

## subtopic
Beta blockers and hypoglycemia masking

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-ANTAGONISTS-2

## related_article_ids

## related_concept_ids
CON-FND-BB97C931CB8423

## resource_ids
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
0.65

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
"In a hypertensive patient who is treated with insulin for diabetes mellitus, which of the following drugs is to be used with extra caution as it masks manifestations of hypoglycemia? ... Propranolol" (Quiz 32 Q2); "One of the following statements is FALSE regarding Beta-blockers: ... Propranolol is contraindicated in diabetics as it causes hyperglycemia [marked FALSE]" (Q3).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 32 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "propranolol masks hypoglycemia symptoms" -- 0 hits, new concept.
relationships: two quiz rows (Q2/Q3) collapsed onto this one concept -- the same propranolol-and-diabetes fact tested by direct recall (Q2) and by identifying the false statement (Q3).

---

# Item

## id
CON-FND-BB97C931CB8423

## label
Acebutolol is beta1-selective with intrinsic sympathomimetic activity and membrane-stabilizing property, and its ISA can worsen exertional angina

## canonical_key
teaching.pharmacology.acebutolol.beta1-selective-isa-membrane-stabilizing

## aliases
Acebutolol properties
Intrinsic sympathomimetic activity and angina

## arabic_label
أسيبوتولول: انتقائية بيتا 1 ونشاط ودي جزئي

## arabic_aliases
النشاط الودي الذاتي للأسيبوتولول وتأثيره على الذبحة الصدرية

## definition
Acebutolol is a beta blocker combining three properties: beta1 selectivity (cardioselectivity), intrinsic sympathomimetic activity (ISA, meaning it is a partial agonist that provides some low-level receptor stimulation even while blocking the receptor), and a membrane-stabilizing (local anaesthetic-like) property. Because ISA means acebutolol does not fully suppress beta-receptor activity the way a pure antagonist does, it can worsen exertional angina pectoris in a patient who needs the heart-rate- and workload-lowering effect of full beta blockade during exercise, since the partial agonism blunts that protective reduction.

## explicit_objective
Identify acebutolol as the beta1-selective blocker with intrinsic sympathomimetic activity and membrane-stabilizing property, and state that its ISA can worsen exertional angina by blunting the full heart-rate-lowering effect of beta blockade.

## pitfalls
Assuming intrinsic sympathomimetic activity is simply a neutral or beneficial extra property -- in a patient with exertional angina, ISA specifically works against the therapeutic goal of beta blockade by providing partial agonist stimulation instead of full blockade during exercise.

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
Sympathetic nervous system (antagonists) 2

## subtopic
Acebutolol properties and ISA

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-SYMPATHETIC-ANTAGONISTS-2

## related_article_ids

## related_concept_ids
CON-FND-18D519B39F98A4

## resource_ids
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
0.65

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The beta adrenergic blocker having BETA 1 selectivity, intrinsic sympathomimetic activity and membrane stabilizing property is: ... Acebutolol" (Quiz 32 Q4); "Which of the following beta-blockers would be most likely to worsen exertional angina pectoris because of its intrinsic sympathomimetic activity? ... Acebutolol" (Q5).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 32 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "acebutolol intrinsic sympathomimetic activity membrane stabilizing" -- 0 hits, new concept.
relationships: two quiz rows (Q4/Q5) collapsed onto this one concept -- acebutolol's identifying property profile (Q4) and the clinical consequence of its ISA component (Q5).

---

# Item

## id
CON-FND-EF6008CE1515E5

## label
A leg-vein deep vein thrombosis embolises as pulmonary thromboembolism

## canonical_key
teaching.pathology.hemodynamics.dvt-leg-vein-source-of-pulmonary-embolism

## aliases
DVT complication
Leg vein thrombus source of PE

## arabic_label
جلطة أوردة الساق ومصدر الانصمام الرئوي

## arabic_aliases
تجلط الأوردة العميقة ومصدر الانصمام الرئوي

## definition
Deep vein thrombosis of the leg veins is the most important source of pulmonary thromboembolism: a thrombus forming in the stagnant blood of an immobilized limb can detach and travel via venous return to lodge in the pulmonary arteries. A patient who develops leg-vein DVT weeks after a major fracture, with continued immobilization, is therefore at risk of pulmonary thromboembolism as the expected downstream complication, and leg veins are the site of thrombi most often implicated as the source of a pulmonary embolus.

## explicit_objective
State that leg-vein deep vein thrombosis is the classic source of pulmonary thromboembolism, and identify pulmonary thromboembolism as the expected complication of an immobilized, fracture-related DVT.

## pitfalls
Naming a site other than leg veins (e.g. the aorta, an artery, or the left ventricle) as the classic source of thrombi causing pulmonary embolism -- only a VENOUS thrombus (most often leg veins) embolises to the lung via the right heart.

## concept_type
clinical_application

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Heamodynamic disorders: Embolism, ischemia and infarction

## subtopic
DVT as source of pulmonary embolism

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-EMBOLISM-ISCHEMIA-INFARCTION

## related_article_ids

## related_concept_ids
CON-FND-11AE7596C68944
CON-FND-9175888AAAC2F0

## resource_ids
src_3e62ae5ed2a35ed7211c

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.55

## exam_weight_by_year
AUN_Y1=0.55

## clinical_relevance
0.7

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
"76-year-old woman is hospitalized after falling and fracturing her left femoral trochanter. Two weeks later, the left leg is swollen ... Which of the following complications is most likely to occur after these events? ... Pulmonary thromboembolism" (Quiz 33 Q1); "which of the following sites of thrombi can be the source pulmonary embolism? ... Leg veins" (Q15).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 33 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "chronic venous congestion right heart failure" and related embolism queries -- 0 hits, new concept.
relationships: two quiz rows (Q1/Q15) collapsed onto this one concept -- the same leg-vein-DVT-to-PE fact tested by clinical vignette (Q1) and by direct site recall (Q15); related to Lecture 31's CON-FND-11AE7596C68944 (phlebothrombosis) and CON-FND-7C0F3DB1C2FE5E (venous thrombus embolises to lung).

---

# Item

## id
CON-FND-9175888AAAC2F0

## label
Immobilization causes deep vein thrombosis through venous stasis

## canonical_key
teaching.pathology.hemodynamics.immobilization-dvt-stasis-mechanism

## aliases
Venous stasis and DVT
Immobilization thrombosis risk

## arabic_label
عدم الحركة وتجلط الأوردة العميقة

## arabic_aliases
الركود الوريدي وتجلط الأوردة

## definition
Immobilization is a classic mechanism for deep vein thrombosis because it produces venous stasis -- stagnant, slow-moving blood in the leg veins -- one of the three arms of Virchow's triad predisposing to thrombus formation. A patient with a swollen, difficult-to-move leg after a period of immobility, confirmed by venogram to have deep leg-vein thrombosis, has this stasis mechanism as the most likely explanation, rather than a coagulation-factor or vessel-wall-injury mechanism specifically.

## explicit_objective
State that immobilization causes deep vein thrombosis through the mechanism of venous stasis, one arm of Virchow's triad.

## pitfalls
Attributing an immobilization-related DVT to turbulent flow, hypercalcemia or a drug effect instead of venous stasis -- immobilization's specific mechanism is stagnant, slow blood flow, not vessel injury or a hypercoagulable trigger.

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
Heamodynamic disorders: Embolism, ischemia and infarction

## subtopic
DVT mechanism (stasis)

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-EMBOLISM-ISCHEMIA-INFARCTION

## related_article_ids

## related_concept_ids
CON-FND-EF6008CE1515E5
CON-FND-9968E677B951D2

## resource_ids
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
"A 55-year-old woman has had discomfort and swelling of the left leg for the past week ... A venogram shows thrombosis of deep left leg veins. Which of the following mechanisms is most likely to cause this condition? ... Immobilization" (Quiz 33 Q2).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 33 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "immobilization DVT stasis Virchow" -- 0 hits, new concept.
relationships: paired with CON-FND-EF6008CE1515E5 (leg-vein DVT as PE source) as the lecture's DVT-mechanism-and-complication pair; also related to Lecture 31's CON-FND-9968E677B951D2 (Virchow's triad).

---

# Item

## id
CON-FND-AA58C1D1394257

## label
An embolus is a detached intravascular mass carried by the blood to a distant site

## canonical_key
teaching.pathology.hemodynamics.embolus-definition

## aliases
Embolism vocabulary
Definition of embolus

## arabic_label
تعريف الصمة (الإمبولوس)

## arabic_aliases
الكتلة المنفصلة داخل الأوعية الدموية

## definition
An embolus is a detached intravascular mass -- solid, liquid or gaseous -- carried by the bloodstream from its point of origin to a distant site, where it lodges and can obstruct flow. This is distinct from an infarct (the area of tissue necrosis that can result once an embolus obstructs a vessel), a thrombus (the mass before it detaches and starts travelling), and a clot (coagulated blood without this in-vessel, during-life, travelling character).

## explicit_objective
State that an embolus is a detached intravascular mass carried by the blood to a distant site, distinguishing it from an infarct, a thrombus and a clot.

## pitfalls
Confusing embolus (the travelling mass) with infarct (the resulting area of necrosis), thrombus (the mass before detachment) or clot (a non-thrombus coagulum) -- these are four distinct hemodynamic-pathology terms often confused with one another.

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
Heamodynamic disorders: Embolism, ischemia and infarction

## subtopic
Embolism vocabulary

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-EMBOLISM-ISCHEMIA-INFARCTION

## related_article_ids

## related_concept_ids

## resource_ids
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
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A detached intravascular mass carried by the blood from its point of origin to a distant site is called: ... Embolus" (Quiz 33 Q3).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 33 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "embolus definition detached intravascular mass" -- 0 hits, new concept.
relationships: the lecture's core vocabulary concept, related to every other embolism/infarction grain in this cluster.

---

# Item

## id
CON-FND-2048DC4715C0DE

## label
A neck vein injury can cause air embolism

## canonical_key
teaching.pathology.hemodynamics.air-embolism-neck-vein-injury

## aliases
Venous air embolism
Air embolism mechanism

## arabic_label
الانصمام الهوائي وإصابة وريد الرقبة

## arabic_aliases
انصمام هوائي بعد جرح وريدي بالرقبة

## definition
An open, low-pressure venous injury near the heart -- such as a stab wound to a neck vein -- allows atmospheric air to be drawn into the venous circulation during inspiration, producing an air embolism. This is the specific hemodynamic risk of a neck vein injury, distinct from the thrombotic, fat or tumour emboli that arise from other clinical settings.

## explicit_objective
State that a neck vein stab wound carries a specific risk of air embolism, given the low venous pressure and proximity to the heart.

## pitfalls
Assuming any vascular injury carries the same embolism risk profile -- a neck vein injury's specific danger is air embolism (from atmospheric air entrainment), not fat, tumour or ordinary thrombotic emboli, which arise from different clinical settings (fracture, malignancy, DVT respectively).

## concept_type
clinical_application

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Heamodynamic disorders: Embolism, ischemia and infarction

## subtopic
Air embolism

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-EMBOLISM-ISCHEMIA-INFARCTION

## related_article_ids

## related_concept_ids

## resource_ids
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
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A patient admits to the emergency unit after a neck vein stabbing wound. What type of emboli would you most suspect to occur in this patient? ... Air emboli" (Quiz 33 Q4).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 33 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "air embolism neck vein" -- 0 hits, new concept.
relationships: none within this cluster; a standalone embolism-type concept, paired thematically with CON-FND-D8BF76229CC959 (fat embolism) and CON-FND-E6A4425324881A (most frequent embolism type) as the lecture's embolism-type triad.

---

# Item

## id
CON-FND-456F4BFCEAFBD8

## label
Red (hemorrhagic) infarcts occur in organs with a dual blood supply, such as the lung

## canonical_key
teaching.pathology.hemodynamics.red-infarct-dual-blood-supply

## aliases
Hemorrhagic infarct
Dual blood supply and infarct colour

## arabic_label
الاحتشاء الأحمر (النزفي) في الأعضاء ذات الإمداد الدموي المزدوج

## arabic_aliases
الرئة كمثال على الاحتشاء الأحمر

## definition
A red (hemorrhagic) infarct occurs when blood re-enters the necrotic area, typically in an organ with a dual or collateral blood supply -- the lung, supplied by both pulmonary and bronchial arteries, is the standard example. This contrasts with a pale (anaemic) infarct, which occurs in a solid organ with a single, end-arterial blood supply (kidney, heart, spleen), where no second source of blood re-enters the necrotic zone.

## explicit_objective
State that red infarcts occur in dual-blood-supply organs such as the lung, distinguishing them from pale infarcts in single-blood-supply solid organs.

## pitfalls
Naming a single-blood-supply organ (kidney, heart) as the site of a red infarct, or a dual-blood-supply organ (lung) as the site of a pale infarct -- the colour of an infarct tracks the organ's vascular supply pattern.

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
Heamodynamic disorders: Embolism, ischemia and infarction

## subtopic
Red vs pale infarct

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-EMBOLISM-ISCHEMIA-INFARCTION

## related_article_ids

## related_concept_ids
CON-FND-FA99A919A9BB4E

## resource_ids
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
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A red infarction is seen in: ... lung" (Quiz 33 Q5).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 33 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "red infarct dual blood supply lung" -- 0 hits, new concept.
relationships: paired with CON-FND-FA99A919A9BB4E (pale infarct in solid organs) as the lecture's infarct-colour pair.

---

# Item

## id
CON-FND-3DC23DAEB405BC

## label
Cerebral infarction undergoes liquefactive necrosis

## canonical_key
teaching.pathology.hemodynamics.cerebral-infarction-liquefactive-necrosis

## aliases
Brain infarct necrosis type
Cerebral infarction pathology

## arabic_label
احتشاء المخ والتنخر التميعي

## arabic_aliases
النخر التميعي في احتشاء الدماغ

## definition
Cerebral infarction, unlike infarction in most other organs, undergoes liquefactive necrosis rather than coagulative necrosis. The brain's high lipid content and lack of a firm connective-tissue stroma mean that dead neural tissue is digested by its own and infiltrating enzymes into a soft, liquefied cavity, rather than retaining the firm, cell-outline-preserved architecture typical of a coagulative infarct elsewhere.

## explicit_objective
State that cerebral infarction undergoes liquefactive, not coagulative, necrosis, given the brain's lipid-rich composition and lack of supportive stroma.

## pitfalls
Applying the general "solid-organ infarcts undergo coagulative necrosis" rule to the brain -- cerebral infarction is the standard, specifically-tested exception, undergoing liquefactive necrosis instead.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Heamodynamic disorders: Embolism, ischemia and infarction

## subtopic
Cerebral infarction necrosis type

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-EMBOLISM-ISCHEMIA-INFARCTION

## related_article_ids

## related_concept_ids
CON-FND-7B4DA968F5BE76

## resource_ids
src_3e62ae5ed2a35ed7211c

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.55

## exam_weight_by_year
AUN_Y1=0.55

## clinical_relevance
0.5

## academic_relevance
0.75

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Cerebral infarction is: ... liquifactive necrosis" (Quiz 33 Q6).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 33 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "cerebral infarction liquefactive necrosis" -- 0 hits, new concept.
relationships: paired with CON-FND-7B4DA968F5BE76 (coagulative necrosis in solid-organ infarcts) as the deliberate exception/rule pair of this lecture's necrosis-type teaching.

---

# Item

## id
CON-FND-D8BF76229CC959

## label
Fat embolism originates from bone fracture

## canonical_key
teaching.pathology.hemodynamics.fat-embolism-bone-fracture-origin

## aliases
Fat embolism source
Bone fracture embolism risk

## arabic_label
الانصمام الدهني ومصدره من كسر العظام

## arabic_aliases
كسر العظام كمصدر للانصمام الدهني

## definition
Fat embolism arises when marrow fat is released into the venous circulation, most commonly from a long-bone fracture, where disrupted marrow fat globules enter torn venules at the fracture site. This is the standard clinical origin of fat embolism, distinct from the origins of other embolus types -- pregnancy (amniotic fluid), congestive heart failure or a detached thrombus (thromboembolism).

## explicit_objective
State that bone fracture is the classic origin of fat embolism, among pregnancy, congestive heart failure and detached thrombi as alternative embolus sources.

## pitfalls
Confusing fat embolism's origin (bone fracture, marrow fat) with amniotic fluid embolism's origin (pregnancy/delivery) or ordinary thromboembolism's origin (a detached thrombus) -- each embolus type has a distinct clinical trigger.

## concept_type
clinical_application

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Heamodynamic disorders: Embolism, ischemia and infarction

## subtopic
Fat embolism

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-EMBOLISM-ISCHEMIA-INFARCTION

## related_article_ids

## related_concept_ids
CON-FND-2048DC4715C0DE
CON-FND-E6A4425324881A

## resource_ids
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
"Fat embolism can originate from: ... bone fracture" (Quiz 33 Q7).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 33 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "fat embolism bone fracture origin" -- 0 hits, new concept.
relationships: part of the lecture's embolism-type triad with CON-FND-2048DC4715C0DE (air embolism) and CON-FND-E6A4425324881A (most frequent embolism type, thromboembolism, distinguishing frequency from fat embolism's specific fracture-associated origin).

---

# Item

## id
CON-FND-F1AE9BB7549A71

## label
Infarction results from acute ischaemia in the presence of poor collateral circulation

## canonical_key
teaching.pathology.hemodynamics.infarction-requires-poor-collateral-circulation

## aliases
Infarction mechanism
Collateral circulation and infarction

## arabic_label
الاحتشاء ونقص التروية الحاد مع ضعف الدوران الجانبي

## arabic_aliases
الدوران الجانبي وحدوث الاحتشاء

## definition
Infarction (tissue death from vascular occlusion) results specifically from acute ischaemia occurring in the presence of poor collateral circulation, since good collateral supply can maintain enough perfusion to prevent necrosis despite the primary vessel's occlusion. Gradual ischaemia, by contrast, allows time for collateral vessels to develop, which is why sudden (acute) occlusion combined with poor collaterals -- not gradual occlusion or occlusion with good collaterals -- is what produces infarction.

## explicit_objective
State that infarction results from acute ischaemia specifically when collateral circulation is poor, distinguishing this from gradual ischaemia or ischaemia with good collateral supply, neither of which typically produces infarction.

## pitfalls
Assuming any acute ischaemia produces infarction regardless of collateral status, or that gradual ischaemia is equally likely to cause infarction -- the specific combination tested is acute onset PLUS poor collaterals.

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
Heamodynamic disorders: Embolism, ischemia and infarction

## subtopic
Infarction mechanism

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-EMBOLISM-ISCHEMIA-INFARCTION

## related_article_ids

## related_concept_ids
CON-FND-FA99A919A9BB4E
CON-FND-C6E88AC53F7F2B

## resource_ids
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
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Infarction is due to: ... acute ischaemia in presence of poor collateral circulation" (Quiz 33 Q8).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 33 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "poor collateral circulation infarction" -- 0 hits, new concept.
relationships: related to CON-FND-FA99A919A9BB4E (pale infarct in solid organs, which typically have poor collateral supply) and CON-FND-C6E88AC53F7F2B (ischaemia's own causes) as the lecture's infarction-mechanism cluster.

---

# Item

## id
CON-FND-FA99A919A9BB4E

## label
Pale (anaemic) infarcts occur in solid organs with a single blood supply, such as kidney and heart

## canonical_key
teaching.pathology.hemodynamics.pale-infarct-solid-organ-single-blood-supply

## aliases
Anaemic infarct
Solid organ infarct colour

## arabic_label
الاحتشاء الشاحب (فقر الدم) في الأعضاء الصلبة ذات الإمداد الدموي الأحادي

## arabic_aliases
الكلية والقلب كمثال على الاحتشاء الشاحب

## definition
A pale (anaemic) infarct occurs in a solid organ supplied by a single, end-arterial blood supply -- the kidney and the heart are the standard examples -- so that arterial occlusion cuts off blood entirely, with no second source re-entering the necrotic zone to give it a red, hemorrhagic appearance. This is the counterpart to a red (hemorrhagic) infarct, which occurs in an organ such as the lung with a dual blood supply.

## explicit_objective
State that pale infarcts occur in solid, single-blood-supply organs such as the kidney and heart, following arterial occlusion.

## pitfalls
Naming a dual-blood-supply organ (lung) as the site of a pale infarct, or a single-blood-supply solid organ (kidney, heart) as the site of a red infarct -- infarct colour tracks whether a second blood source can re-perfuse the necrotic area.

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
Heamodynamic disorders: Embolism, ischemia and infarction

## subtopic
Red vs pale infarct

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-EMBOLISM-ISCHEMIA-INFARCTION

## related_article_ids

## related_concept_ids
CON-FND-456F4BFCEAFBD8
CON-FND-F1AE9BB7549A71

## resource_ids
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
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Infarcts occurs due to of arterial occlusion in solid organs such as the kidneys and heart are: ... Pale" (Quiz 33 Q9).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 33 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "pale infarct solid organ kidney heart" -- 0 hits, new concept.
relationships: paired with CON-FND-456F4BFCEAFBD8 (red infarct) as the infarct-colour pair; related to CON-FND-F1AE9BB7549A71 (infarction mechanism).

---

# Item

## id
CON-FND-C6E88AC53F7F2B

## label
Ischaemia results from arterial obstruction

## canonical_key
teaching.pathology.hemodynamics.ischaemia-from-arterial-obstruction

## aliases
Ischaemia causes
Arterial obstruction and ischaemia

## arabic_label
نقص التروية والانسداد الشرياني

## arabic_aliases
انسداد الشريان كسبب لنقص التروية

## definition
Ischaemia -- inadequate blood supply to a tissue -- most directly results from arterial obstruction, which cuts off the arterial inflow a tissue depends on. Capillary damage and venous obstruction can also compromise tissue perfusion in other ways, but arterial obstruction is the direct, standard mechanism tested for producing ischaemia, since it removes the tissue's arterial supply at its source.

## explicit_objective
State that arterial obstruction is the direct cause of ischaemia, among capillary damage, chronic venous congestion and venous obstruction as related but distinct mechanisms.

## pitfalls
Confusing ischaemia's arterial-obstruction mechanism with venous obstruction or chronic venous congestion, which primarily impair drainage rather than arterial inflow -- ischaemia specifically names inadequate arterial supply.

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
Heamodynamic disorders: Embolism, ischemia and infarction

## subtopic
Ischaemia causes

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-EMBOLISM-ISCHEMIA-INFARCTION

## related_article_ids

## related_concept_ids
CON-FND-F1AE9BB7549A71
CON-FND-E4AEBC2AA036D4

## resource_ids
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
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Ischaemia can result from: ... arterial obstruction" (Quiz 33 Q10).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 33 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "ischaemia arterial obstruction causes" -- 0 hits, new concept.
relationships: related to CON-FND-F1AE9BB7549A71 (infarction mechanism, which follows ischaemia) and CON-FND-E4AEBC2AA036D4 (atherosclerosis, the commonest cause of chronic ischaemia specifically).

---

# Item

## id
CON-FND-7B4DA968F5BE76

## label
Solid-organ infarcts undergo coagulative necrosis

## canonical_key
teaching.pathology.hemodynamics.coagulative-necrosis-solid-organ-infarct

## aliases
Coagulative necrosis pattern
Infarct necrosis type

## arabic_label
النخر التخثري في احتشاء الأعضاء الصلبة

## arabic_aliases
نمط النخر في الكلية والطحال

## definition
Infarcts in solid organs -- the kidney and spleen are standard examples -- undergo coagulative necrosis, in which the cells die but their basic outline and tissue architecture are preserved for some days, because intracellular proteins denature and resist proteolysis before eventually being cleared by inflammatory cells. A pyramidal, pale, wedge-shaped renal lesion with preserved cell outlines but lost cellular detail, or a tan-to-white wedge-shaped splenic lesion with its base on the capsule (as seen in a septic-embolus-related splenic infarct), are both classic coagulative-necrosis pictures.

## explicit_objective
Identify a pale, wedge-shaped lesion with preserved cell outlines but lost cellular detail, in a solid organ such as the kidney or spleen, as coagulative necrosis.

## pitfalls
Confusing coagulative necrosis (architecture preserved, cell outlines intact) with liquefactive necrosis (tissue liquefies, architecture lost) -- solid organs such as kidney and spleen classically show coagulative necrosis on infarction, in contrast to the brain's liquefactive pattern.

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
Heamodynamic disorders: Embolism, ischemia and infarction

## subtopic
Coagulative necrosis

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-EMBOLISM-ISCHEMIA-INFARCTION

## related_article_ids

## related_concept_ids
CON-FND-3DC23DAEB405BC

## resource_ids
src_3e62ae5ed2a35ed7211c

## approved_file_resource_ids

## approved_video_resource_ids

## learner_years
1

## universities
aun

## blueprint_weight
0.55

## exam_weight_by_year
AUN_Y1=0.55

## clinical_relevance
0.55

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Microscopic examination of tissue taken from pyramidal shape pale lesion of the kidney showed that the outline of the cells still present but cellular details are lost. Which of the following pathologic conditions most likely present? ... Coagulative necrosis" (Quiz 33 Q11); "The spleen of a 26 year old male who died from complications of subacute bacterial endocarditis is seen at autopsy. On sectioning reveals a tan to white, wedge-shaped lesion with base on the capsule. This finding most likely represents the result of: ... Coagulative necrosis" (Q14).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 33 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "coagulative necrosis kidney spleen infarct" -- 0 hits, new concept.
relationships: two quiz rows (Q11/Q14) collapsed onto this one concept -- the identical coagulative-necrosis fact tested in two solid organs (kidney and spleen); paired with CON-FND-3DC23DAEB405BC (cerebral/liquefactive necrosis) as the module's deliberate rule/exception necrosis-type pair.

---

# Item

## id
CON-FND-E4AEBC2AA036D4

## label
Atherosclerosis is the commonest cause of chronic ischaemia

## canonical_key
teaching.pathology.hemodynamics.atherosclerosis-commonest-chronic-ischaemia-cause

## aliases
Chronic ischaemia etiology
Atherosclerosis and ischaemia

## arabic_label
تصلب الشرايين كأشيع سبب لنقص التروية المزمن

## arabic_aliases
السبب الأشيع لنقص التروية المزمن

## definition
Atherosclerosis -- progressive narrowing of arteries by lipid-laden plaque -- is the commonest cause of chronic ischaemia, gradually reducing arterial luminal calibre over years and limiting blood flow to the tissue it supplies. This gradual, atherosclerotic narrowing contrasts with an acute cause of vascular compromise such as surgical ligation, infection, or spasmodic vascular disease, which are less common causes overall of chronic (as opposed to acute) ischaemia.

## explicit_objective
State that atherosclerosis is the commonest cause of chronic ischaemia, among surgical ligation, infection and spasmodic vascular disease as less common alternatives.

## pitfalls
Naming an acute or uncommon cause (surgical ligation, infection, vascular spasm) as the commonest cause of chronic ischaemia, rather than recognising atherosclerosis's gradual, progressive narrowing as the dominant, population-level cause.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Heamodynamic disorders: Embolism, ischemia and infarction

## subtopic
Chronic ischaemia etiology

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-EMBOLISM-ISCHEMIA-INFARCTION

## related_article_ids

## related_concept_ids
CON-FND-C6E88AC53F7F2B

## resource_ids
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
"The commonest cause of chronic ischaemia is: ... Atherosclerosis" (Quiz 33 Q12).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 33 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "atherosclerosis chronic ischemia common cause" -- 0 hits, new concept.
relationships: paired with CON-FND-C6E88AC53F7F2B (ischaemia's own arterial-obstruction cause) as the lecture's ischaemia-etiology pair.

---

# Item

## id
CON-FND-E6A4425324881A

## label
Detached thrombi (thromboembolism) are the most frequent type of embolism

## canonical_key
teaching.pathology.hemodynamics.thromboembolism-most-frequent-embolism-type

## aliases
Thromboembolism frequency
Commonest embolus type

## arabic_label
الانصمام الخثاري كأشيع نوع للانصمام

## arabic_aliases
الجلطة المنفصلة كأشيع سبب للانصمام

## definition
Among the recognised embolus types -- fat, malignant/tumour cells, air and detached thrombi -- detached thrombi (thromboembolism) are the most frequent, since deep vein thrombosis and cardiac mural thrombi are common clinical events that regularly source emboli, compared with the less common triggers behind fat, tumour or air embolism.

## explicit_objective
State that detached thrombi (thromboembolism) are the most frequent type of embolism, among fat, malignant-cell and air emboli as less common alternatives.

## pitfalls
Assuming fat embolism (from bone fracture) is the most frequent embolus type because it is a well-known named entity -- by overall frequency, ordinary thromboembolism from a detached thrombus is far more common than fat, tumour or air embolism.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Heamodynamic disorders: Embolism, ischemia and infarction

## subtopic
Embolism frequency

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-EMBOLISM-ISCHEMIA-INFARCTION

## related_article_ids

## related_concept_ids
CON-FND-D8BF76229CC959
CON-FND-2048DC4715C0DE

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The most frequent type of embolism is produced by: ... detached thrombi" (Quiz 33 Q13).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 33 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "detached thrombi most frequent embolism" -- 0 hits, new concept.
relationships: completes the lecture's embolism-type triad with CON-FND-D8BF76229CC959 (fat embolism) and CON-FND-2048DC4715C0DE (air embolism), distinguishing overall frequency from the specific-origin facts of the other two.

---

# Item

## id
CON-FND-39051880D8AFFB

## label
5HT2 receptor blockers counteract the bronchoconstriction and diarrhea of carcinoid syndrome

## canonical_key
teaching.pharmacology.serotonin.5ht2-blockade-carcinoid

## aliases
Carcinoid syndrome pharmacology
Serotonin receptor antagonism in carcinoid

## arabic_label
حاصرات مستقبلات السيروتونين 5HT2 والمتلازمة السرطاوية

## arabic_aliases
علاج أعراض المتلازمة السرطاوية بحصار 5HT2

## definition
Carcinoid tumours secrete excess serotonin (5-HT), producing bronchoconstriction and diarrhea through serotonin's action at 5HT2 receptors. A 5HT2 receptor blocker (such as ketanserin) counteracts these specific symptoms by antagonising serotonin at that receptor, distinguishing this drug class from other serotonin-pathway agents such as buspirone (a 5HT1A partial agonist used for anxiety), sumatriptan (a 5HT1 agonist for migraine) and ondansetron (a 5HT3 antagonist used as an antiemetic, not for migraine).

## explicit_objective
State that a 5HT2 receptor blocker counteracts carcinoid syndrome's bronchoconstriction and diarrhea, distinguishing this correct statement from incorrect claims about buspirone, sumatriptan and ondansetron's serotonin-receptor actions.

## pitfalls
Confusing 5HT2 blockade's carcinoid application with unrelated serotonin-receptor drugs and their actual uses: buspirone is a 5HT1A partial agonist for anxiety (not psychosis, not 5HT2a), sumatriptan is a 5HT1 agonist for migraine (not an antiemetic, not a 5HT3 blocker), and ondansetron is a 5HT3 antagonist used as an antiemetic (not for migraine, and it blocks rather than activates 5HT3).

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
Autacoids 1

## subtopic
Serotonin receptor pharmacology

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-AUTACOIDS-1

## related_article_ids

## related_concept_ids

## resource_ids
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
0.55

## academic_relevance
0.65

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which one of the following statements regarding drug effects on serotonin receptor systems is accurate? ... 5HT2 receptor blockers counteract bronchoconstriction and diarrhea of carcinoid." (Quiz 34 Q2).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 34 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "5HT2 receptor blocker carcinoid bronchoconstriction diarrhea" -- 0 hits, new concept.
relationships: none within this cluster; a standalone autacoid/serotonin-pharmacology concept, opening the lecture's autacoids topic.

---

# Item

## id
CON-FND-EB9C944D139E7A

## label
Cimetidine inhibits phenytoin metabolism, raising phenytoin's half-life

## canonical_key
teaching.pharmacology.cimetidine.cyp-inhibition-raises-phenytoin-half-life

## aliases
Cimetidine drug interaction
CYP450 inhibition and phenytoin

## arabic_label
سيميتيدين وتفاعله الدوائي مع الفينيتوين

## arabic_aliases
تثبيط إنزيمات الكبد وزيادة نصف عمر الفينيتوين

## definition
Cimetidine is a cytochrome P450 (CYP450) enzyme inhibitor. In a patient taking phenytoin, an anticonvulsant metabolised by CYP450, co-administered cimetidine inhibits that metabolism, so phenytoin is cleared more slowly and its half-life increases -- raising the risk of phenytoin toxicity if the dose is not adjusted. This CYP-inhibitor property is the same mechanism by which cimetidine interacts with other CYP450-metabolised drugs.

## explicit_objective
State that cimetidine, as a CYP450 inhibitor, increases phenytoin's half-life when the two drugs are co-administered, raising phenytoin toxicity risk.

## pitfalls
Confusing cimetidine's CYP-inhibitor action (raising, not lowering, another drug's half-life and increasing toxicity risk) with a CYP-inducer's opposite effect -- cimetidine specifically slows, not speeds, phenytoin's clearance.

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
Autacoids 1

## subtopic
Drug interactions via CYP450

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-AUTACOIDS-1

## related_article_ids

## related_concept_ids

## resource_ids
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
"The widely used anticonvulsant phenytoin is often implicated in drug interactions. If phenytoin is used by a patient taking cimetidine for a GI ulcer, which one of the following is likely to occur? ... increase half-life of phenytoin" (Quiz 34 Q3).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 34 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "phenytoin cimetidine CYP inhibitor half life" -- 0 hits, new concept.
relationships: related in theme (cimetidine's CYP-inhibitor property) to the final-2022 triage's unauthored Q3 (cimetidine and oral-contraceptive effectiveness), a different specific drug interaction sharing the same underlying CYP-inhibition mechanism -- not the same concept, linked only by mechanism, not merged.

---

# Item

## id
CON-FND-7BC222629BD73F

## label
Ondansetron is the drug of choice for cisplatin-induced chemotherapy nausea

## canonical_key
teaching.pharmacology.ondansetron.cisplatin-induced-nausea

## aliases
5HT3 antagonist antiemetic
Chemotherapy-induced nausea treatment

## arabic_label
أوندانسيترون لعلاج الغثيان الناتج عن العلاج الكيميائي بالسيسبلاتين

## arabic_aliases
مضاد مستقبلات 5HT3 لعلاج غثيان العلاج الكيميائي

## definition
Ondansetron is a selective 5HT3 (serotonin) receptor antagonist, and is the preferred drug for severe nausea associated with highly emetogenic chemotherapy such as cisplatin. Cisplatin triggers nausea largely through serotonin release acting on 5HT3 receptors in the gut and chemoreceptor trigger zone, so blocking this receptor with ondansetron is the targeted, standard approach, distinguishing it from other antiemetic or antihistamine agents used for different types of nausea.

## explicit_objective
State that ondansetron, a 5HT3 receptor antagonist, is the preferred drug for cisplatin-induced (chemotherapy) nausea.

## pitfalls
Choosing a general antihistamine or anticholinergic antiemetic (e.g. cimetidine, scopolamine, cyclizine) for cisplatin-induced nausea instead of a 5HT3-receptor-targeted agent like ondansetron, which is specifically effective against the serotonin-mediated mechanism of highly emetogenic chemotherapy.

## concept_type
clinical_application

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Autacoids 1

## subtopic
5HT3 antagonist antiemetics

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-AUTACOIDS-1

## related_article_ids

## related_concept_ids

## resource_ids
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
0.55

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A patient undergoing chemotherapy with cisplatin has severe nausea. Which of the following would be the drug to use in this patient? ... Ondansetron" (Quiz 34 Q4).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 34 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "ondansetron cisplatin chemotherapy nausea" -- 0 hits, new concept.
relationships: tests the same underlying fact as the still-unauthored final-2022 triage row "Q24 ondansetron for chemotherapy-induced nausea" (see coverage/AUN-MPT-104-triage.md, Remaining list) -- future authoring of that final-exam row should reuse this concept id rather than re-mint, since both test the identical ondansetron/cisplatin fact.

---

# Item

## id
CON-FND-D97F86DAF65FA2

## label
Ranitidine blocks histamine binding to parietal-cell H2 receptors

## canonical_key
teaching.pharmacology.ranitidine.h2-receptor-blockade-parietal-cells

## aliases
H2 receptor antagonist mechanism
Ranitidine mechanism

## arabic_label
رانيتيدين وحصار مستقبلات H2 في الخلايا الجدارية

## arabic_aliases
آلية عمل رانيتيدين كحاصر H2

## definition
Ranitidine is a histamine H2-receptor antagonist. It works by blocking histamine binding to H2 receptors on gastric parietal cells, which reduces the histamine-driven stimulation of acid secretion. This mechanism -- blocking histamine's own receptor, not gastrin binding, prostaglandin receptors, or the H+/K+-ATPase pump directly -- is what distinguishes an H2 blocker like ranitidine from a proton pump inhibitor, which acts on the H+/K+-ATPase itself.

## explicit_objective
State that ranitidine reduces gastric acid secretion by blocking histamine binding to H2 receptors on parietal cells, distinguishing this mechanism from gastrin-receptor blockade, prostaglandin-receptor blockade, or direct H+/K+-ATPase inhibition.

## pitfalls
Confusing an H2-receptor antagonist's mechanism (blocking histamine at its receptor) with a proton pump inhibitor's mechanism (blocking the H+/K+-ATPase pump directly) -- ranitidine acts one step upstream of the pump, at the histamine receptor.

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
Autacoids 1

## subtopic
H2 receptor antagonists

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-AUTACOIDS-1

## related_article_ids

## related_concept_ids

## resource_ids
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
0.65

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Ranitidine inhibits which of the following: ... Histamine binding to parietal cells" (Quiz 34 Q5).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 34 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "ranitidine H2 histamine parietal cell" -- 0 hits, new concept.
relationships: none within this cluster; a standalone autacoid/histamine-pharmacology mechanism concept.

---

# Item

## id
CON-FND-F0A43C29DC304E

## label
Diphenhydramine, a sedating antihistamine, can significantly impair a driver's ability to drive

## canonical_key
teaching.pharmacology.diphenhydramine.sedation-impairs-driving

## aliases
First-generation antihistamine sedation
Sedating antihistamine and driving

## arabic_label
ديفينهيدرامين وتأثيره المهدئ على القيادة

## arabic_aliases
مضادات الهيستامين المسببة للنعاس وتأثيرها على القيادة

## definition
Diphenhydramine is a first-generation antihistamine that readily crosses the blood-brain barrier and produces significant CNS sedation, unlike a second-generation antihistamine such as loratadine or fexofenadine. In a patient who needs to remain alert -- such as a long-distance truck driver with allergic rhinitis -- diphenhydramine is the drug among typical options that could significantly impair the ability to drive, due to this sedating property.

## explicit_objective
Identify diphenhydramine, among antihistamine and other options, as the drug that could significantly impair a driver's ability to drive, due to its first-generation, sedating profile.

## pitfalls
Assuming all antihistamines are equally sedating -- second-generation agents (loratadine, fexofenadine) are specifically designed to minimise CNS penetration and sedation, unlike first-generation diphenhydramine.

## concept_type
clinical_application

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Autacoids 1

## subtopic
Antihistamine sedation profile

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-AUTACOIDS-1

## related_article_ids

## related_concept_ids

## resource_ids
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
0.55

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
"You see a 43-year-old man long-distance truck driver in the clinic who complains of serious allergic rhinitis. Which one of the following drugs could signiﬁcantly impair his ability to drive? ... Diphenhydramine." (Quiz 34 Q6).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 34 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs run for "sedating antihistamine impairs driving" -- 0 hits, new concept.
relationships: this quiz's own correctly-keyed answer (diphenhydramine impairs driving) is the direct pharmacology-fact evidence behind the Q1 (q278) hold, where the printed key wrongly names a sedating antihistamine (meclizine) as appropriate for a patient needing to stay alert.

---

# Item

## id
CON-FND-37DB89CCC6F059

## label
Hypoproteinemia is the expected finding with chronic liver disease's leg oedema and ascites

## canonical_key
edema.hepatic.hypoproteinemia-mechanism

## aliases
Hepatic oedema mechanism
Hypoalbuminemia and ascites

## arabic_label

## arabic_aliases

## definition
In chronic liver disease, impaired hepatic synthetic function reduces plasma albumin production, producing hypoproteinemia; the resulting fall in plasma oncotic pressure allows fluid to leak from the vasculature into the interstitium and peritoneal cavity, producing bilateral pitting leg oedema and ascites. Leukocytosis, hypertension and hypercalcaemia are not the expected accompanying findings of this hypoalbuminemic mechanism.

## explicit_objective
State that hypoproteinemia, from impaired hepatic albumin synthesis, is the expected finding accompanying bilateral pitting leg oedema and ascites in chronic liver disease.

## pitfalls
Assuming hypertension or leukocytosis, rather than hypoproteinemia, is the expected biochemical accompaniment of hepatic (chronic-liver-disease) oedema and ascites.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Heamodynamic disorders: Gangrene, heamorhage and edema

## subtopic
Oedema mechanisms

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-GANGRENE-HAEMORRHAGE-OEDEMA

## related_article_ids

## related_concept_ids

## resource_ids
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
0.55

## academic_relevance
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A 55 years old man had chronic liver disease. On examination, there is bilateral pitting edema of the leg and ascites. Which of the following findings is most likely to be expected? ... Hypoproteinemia" (Quiz 35 Q1).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 35 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "hypoproteinemia edema chronic liver disease" -- 0 hits; grep across docs/*-Source-Imports concept dirs for "hypoproteinemia"/"hypoalbuminemia" found unrelated hits (biochemistry/immunology records, not this oedema-mechanism fact). New concept.

---

# Item

## id
CON-FND-E9C75D708151B5

## label
A collection of fluid beneath the dura is termed a hematoma

## canonical_key
hemorrhage.subdural.hematoma-terminology

## aliases
Subdural hematoma terminology

## arabic_label

## arabic_aliases

## definition
A localized collection of extravasated blood outside the vessel wall, such as the fluid accumulating beneath the dura after head trauma (a subdural hematoma) and compressing the underlying brain, is termed a hematoma -- distinct from congestion (passive venous engorgement within vessels), petechiae (pinpoint haemorrhages) and ecchymosis (a larger flat bruise), none of which describes a discrete space-occupying collection.

## explicit_objective
State that a localized extravasated-blood collection, such as a post-traumatic subdural fluid collection compressing the brain, is termed a hematoma, distinguishing it from congestion, petechiae and ecchymosis.

## pitfalls
Confusing hematoma with petechiae or ecchymosis, both of which describe flat, non-space-occupying skin/subcutaneous bleeding rather than a discrete extravasated-blood collection.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Heamodynamic disorders: Gangrene, heamorhage and edema

## subtopic
Haemorrhage terminology

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-GANGRENE-HAEMORRHAGE-OEDEMA

## related_article_ids

## related_concept_ids

## resource_ids
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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"...A head CT scan shows an accumulation of fluid beneath the dura, compressing the left cerebral hemisphere. Which of the following terms best describes this collection of fluid? ... Hematoma" (Quiz 35 Q2).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 35 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "subdural hematoma fluid dura" -- 0 hits. New concept.

---

# Item

## id
CON-FND-0CFD7C6059B858

## label
Ecchymosis is internal (subcutaneous) haemorrhage, not a form of external haemorrhage

## canonical_key
hemorrhage.classification.external-vs-ecchymosis

## aliases
External vs internal haemorrhage

## arabic_label

## arabic_aliases

## definition
External haemorrhage describes blood loss that exits the body through a natural passage or surface, such as haematuria (urine), haematemesis (vomit), epistaxis (nose) and haemoptysis (sputum). Ecchymosis, a larger flat subcutaneous bruise from blood extravasating into the skin and soft tissue, remains contained within the body and is therefore a form of internal (not external) haemorrhage, unlike the other four.

## explicit_objective
Classify ecchymosis as internal (subcutaneous) haemorrhage, distinct from the external-haemorrhage examples haematuria, haematemesis, epistaxis and haemoptysis.

## pitfalls
Grouping ecchymosis with external haemorrhage because it is visible on the skin surface -- visibility does not equal exit from the body; the blood stays contained subcutaneously.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Heamodynamic disorders: Gangrene, heamorhage and edema

## subtopic
Haemorrhage classification

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-GANGRENE-HAEMORRHAGE-OEDEMA

## related_article_ids

## related_concept_ids

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"All are forms of external haemorrhage Except: ... ecchymosis" (Quiz 35 Q3).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 35 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "ecchymosis internal hemorrhage" -- 0 hits. New concept.

---

# Item

## id
CON-FND-6AC322F5109ADB

## label
Lymphatic obstruction is the example of local (not generalized) oedema among cardiac, renal and hepatic causes

## canonical_key
edema.classification.local-lymphatic-vs-generalized

## aliases
Local vs generalized oedema

## arabic_label

## arabic_aliases

## definition
Cardiac, renal and hepatic disease each raise venous/capsular hydrostatic pressure or lower plasma oncotic pressure systemically, producing generalized oedema. Lymphatic obstruction, by contrast, blocks fluid drainage from a specific, localized territory only (e.g. a single limb), producing local rather than generalized oedema -- the example among these four causes.

## explicit_objective
Identify lymphatic obstruction as an example of local oedema, contrasted with the generalized-oedema mechanisms of cardiac, renal and hepatic disease.

## pitfalls
Assuming any organ-failure cause of oedema (cardiac, renal, hepatic) is localized rather than generalized -- only a mechanism that blocks drainage from one specific territory, such as lymphatic obstruction, produces local oedema.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Heamodynamic disorders: Gangrene, heamorhage and edema

## subtopic
Oedema classification

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-GANGRENE-HAEMORRHAGE-OEDEMA

## related_article_ids

## related_concept_ids

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"An example of local edema: ... lymphatic" (Quiz 35 Q4).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 35 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "lymphatic obstruction local edema" -- 0 hits. New concept.

---

# Item

## id
CON-FND-C771B70391CB03

## label
Cardiac oedema starts in the legs, the most gravity-dependent site in an ambulant patient

## canonical_key
edema.cardiac.gravity-dependent-onset-legs

## aliases
Dependent oedema onset

## arabic_label

## arabic_aliases

## definition
Cardiac (congestive heart failure) oedema is a gravity-dependent (dependent) oedema: raised systemic venous hydrostatic pressure from right-heart failure pushes fluid out of capillaries preferentially at the most dependent body site, which in an ambulant patient is the legs (ankles), not the chest, hand or face.

## explicit_objective
State that cardiac oedema begins in the legs, the most gravity-dependent site in an ambulant patient, not the chest, hand or face.

## pitfalls
Naming a non-dependent site (chest, hand or face) as where cardiac oedema starts -- its gravity-dependent mechanism means the legs are the site of earliest and greatest fluid accumulation in an ambulant patient.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Heamodynamic disorders: Gangrene, heamorhage and edema

## subtopic
Oedema classification

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-GANGRENE-HAEMORRHAGE-OEDEMA

## related_article_ids

## related_concept_ids

## resource_ids
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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"cardiac edema starts in : ... legs" (Quiz 35 Q5).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 35 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "cardiac edema starts in legs" -- 0 hits. New concept.

---

# Item

## id
CON-FND-1285B5A86515DA

## label
An exudate clots on standing because of its high fibrinogen (protein) content

## canonical_key
fluid.exudate.high-protein-clots-on-standing

## aliases
Exudate vs transudate

## arabic_label

## arabic_aliases

## definition
An inflammatory exudate has high protein content, including fibrinogen, which allows the fluid to clot on standing -- unlike a transudate, which has low protein content, a low specific gravity and few cells, and does not clot. Clotting on standing is therefore the characteristic that identifies an exudate among these four options.

## explicit_objective
State that an exudate clots on standing because of its high, fibrinogen-containing protein content, distinguishing it from a transudate's low-protein, non-clotting profile.

## pitfalls
Attributing exudate's characteristic properties (poor protein content, low specific gravity, scanty cells) to a transudate instead -- these three describe a transudate, the opposite fluid type.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Heamodynamic disorders: Gangrene, heamorhage and edema

## subtopic
Exudate vs transudate

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-GANGRENE-HAEMORRHAGE-OEDEMA

## related_article_ids

## related_concept_ids

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Exudate is characterised by: ... clotting on standing" (Quiz 35 Q6).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 35 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "exudate clots on standing" -- 0 hits; grep for "exudate" found unrelated hits (immunology/histology records discussing exudate in other contexts, not this specific clotting-on-standing distinguishing fact). New concept.

---

# Item

## id
CON-FND-82DE35F0E9CF40

## label
Frequent loss of a small amount of blood over time causes anemia, not shock

## canonical_key
hemorrhage.chronic.small-repeated-loss-causes-anemia

## aliases
Chronic blood loss

## arabic_label

## arabic_aliases

## definition
Repeated, small-volume blood loss over a long period (e.g. from a chronic bleeding source) does not reduce circulating blood volume acutely enough to trigger shock; instead, the sustained loss of red cell mass and iron over time results in (typically iron-deficiency) anemia. Thrombosis and embolism are unrelated consequences of ongoing external or internal blood loss.

## explicit_objective
State that frequent, small-volume blood loss over a long period results in anemia, not shock, thrombosis or embolism.

## pitfalls
Confusing the consequence of chronic small-volume blood loss (anemia) with that of a large, acute haemorrhage (hypovolemic shock) -- the volume and rate of loss determine which of the two occurs.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Heamodynamic disorders: Gangrene, heamorhage and edema

## subtopic
Haemorrhage consequences

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-GANGRENE-HAEMORRHAGE-OEDEMA

## related_article_ids

## related_concept_ids

## resource_ids
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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Frequent loss of a small amount of blood may result in: ... Anemia" (Quiz 35 Q7).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 35 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "chronic blood loss anemia" -- 0 hits. New concept. This record is also the direct pathology-fact evidence behind the q298 (Quiz 35 Q15) True/False hold, whose printed answer confirms chronic small blood loss "has effect" (i.e. it does cause anemia).

---

# Item

## id
CON-FND-D809577C431021

## label
Cardiac (ascitic) oedema fluid is a low-protein transudate

## canonical_key
edema.cardiac.ascites-transudate-low-protein

## aliases
Cardiac ascites transudate

## arabic_label

## arabic_aliases

## definition
The ascitic fluid of cardiac oedema (from raised systemic/portal venous hydrostatic pressure in right-heart failure) is a transudate: it has low protein content, does not clot on standing, contains few cells, and has a specific gravity below 1015 -- the opposite profile of an inflammatory exudate.

## explicit_objective
State that cardiac oedema's ascitic fluid is a low-protein transudate (not clotting, few cells, specific gravity under 1015), the hydrostatic-pressure-driven counterpart to an inflammatory exudate.

## pitfalls
Attributing exudate features (clotting on standing, numerous cells, specific gravity above 1015) to cardiac oedema's ascitic fluid, which is instead a low-protein transudate.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Heamodynamic disorders: Gangrene, heamorhage and edema

## subtopic
Exudate vs transudate

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-GANGRENE-HAEMORRHAGE-OEDEMA

## related_article_ids

## related_concept_ids
CON-FND-1285B5A86515DA

## resource_ids
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
0.55

## academic_relevance
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"In cardiac oedema: ... the ascitic fluid has low protein content" (Quiz 35 Q8).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 35 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "cardiac ascites transudate low protein" -- 0 hits. New concept.
relationships: sibling/contrast pair with CON-FND-1285B5A86515DA (this same lecture's exudate concept) -- the two records together cover the exudate-vs-transudate distinction from both directions.

---

# Item

## id
CON-FND-94AC7220623687

## label
Malnutrition is the generalized cause of oedema among allergy, acute inflammation and lymphatic obstruction

## canonical_key
edema.generalized.malnutrition-hypoproteinemia

## aliases
Generalized oedema causes

## arabic_label

## arabic_aliases

## definition
Malnutrition lowers plasma protein (albumin) synthesis systemically, reducing plasma oncotic pressure throughout the vasculature and producing generalized oedema. Allergy, acute inflammation and lymphatic obstruction, by contrast, each act at a localized site (a specific reaction, an inflamed area, or a blocked drainage territory), producing local rather than generalized oedema.

## explicit_objective
Identify malnutrition as a cause of generalized oedema (via systemic hypoproteinemia), contrasted with the localized-oedema mechanisms of allergy, acute inflammation and lymphatic obstruction.

## pitfalls
Assuming a localized inflammatory or allergic process produces generalized oedema -- only a systemic mechanism such as malnutrition-driven hypoproteinemia does so.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Heamodynamic disorders: Gangrene, heamorhage and edema

## subtopic
Oedema classification

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-GANGRENE-HAEMORRHAGE-OEDEMA

## related_article_ids

## related_concept_ids
CON-FND-6AC322F5109ADB

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Oedema is generalized in: ... Malnutrition" (Quiz 35 Q10).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 35 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "malnutrition generalized edema" -- 0 hits. New concept.
relationships: direct contrast pairing with CON-FND-6AC322F5109ADB (this same lecture's local-oedema/lymphatic-obstruction concept).

---

# Item

## id
CON-FND-19158A048CC02C

## label
Gangrenous tissue's bad odour comes from hydrogen sulphide produced by putrefactive bacteria

## canonical_key
gangrene.odour.hydrogen-sulphide-putrefaction

## aliases
Gangrene odour mechanism

## arabic_label

## arabic_aliases

## definition
Gangrenous tissue's characteristic bad odour is produced by hydrogen sulphide and other volatile compounds generated by putrefactive bacteria breaking down dead tissue, not simply from the raw quantity of organisms present, the degree of tissue destruction, or the level of systemic toxemia.

## explicit_objective
State that hydrogen sulphide production by putrefactive bacteria, not organism load, tissue destruction or toxemia alone, is what produces gangrenous tissue's bad odour.

## pitfalls
Attributing gangrene's bad odour directly to bacterial numbers, tissue destruction or toxemia rather than to the specific putrefactive gas (hydrogen sulphide) these bacteria produce.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Heamodynamic disorders: Gangrene, heamorhage and edema

## subtopic
Gangrene mechanisms

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-GANGRENE-HAEMORRHAGE-OEDEMA

## related_article_ids

## related_concept_ids

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The tissue affected by gangrene has a bad odour because of: ... Production of hydrogen sulphide" (Quiz 35 Q11).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 35 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "gangrene bad odor hydrogen sulphide" -- 0 hits. New concept. Related to the q300 (Quiz 35 Q17) True/False hold ("Gangrene means necrosis with putrefaction"), whose definitional fact this record's mechanism partially supports.

---

# Item

## id
CON-FND-87F011172E24D8

## label
Hemothorax (blood in the pleural cavity) is a form of internal haemorrhage

## canonical_key
hemorrhage.internal.hemothorax-body-cavity

## aliases
Internal haemorrhage examples

## arabic_label

## arabic_aliases

## definition
Internal haemorrhage describes bleeding contained within a body (serous) cavity, such as hemothorax (blood in the pleural cavity). Haematoma, purpura, ecchymosis and petechiae, by contrast, are skin/subcutaneous bleeding patterns of varying size, not bleeding into a body cavity.

## explicit_objective
Identify hemothorax as internal haemorrhage (blood within a body cavity), distinguishing it from the skin/subcutaneous bleeding patterns haematoma, purpura, ecchymosis and petechiae.

## pitfalls
Classifying a subcutaneous bleeding pattern (haematoma, purpura, ecchymosis, petechiae) as internal haemorrhage -- that term is reserved for bleeding into a body cavity such as the pleural, peritoneal or pericardial space.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Heamodynamic disorders: Gangrene, heamorhage and edema

## subtopic
Haemorrhage classification

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-GANGRENE-HAEMORRHAGE-OEDEMA

## related_article_ids

## related_concept_ids
CON-FND-0CFD7C6059B858

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following is a type of internal haemorrhage: ... Hemothorax" (Quiz 35 Q12).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 35 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "hemothorax internal hemorrhage" -- 0 hits. New concept.
relationships: sibling of CON-FND-0CFD7C6059B858 (this same lecture's internal-vs-external haemorrhage classification concept).

---

# Item

## id
CON-FND-1025F8970116D6

## label
Lymphatic oedema is non-pitting, unlike cardiac, nutritional and nephritic oedema

## canonical_key
edema.lymphatic.non-pitting-fibrosis

## aliases
Non-pitting oedema

## arabic_label

## arabic_aliases

## definition
Lymphatic oedema is classically non-pitting: the protein-rich fluid that accumulates when lymphatic drainage is obstructed stimulates chronic fibrosis in the affected tissue, so pressure does not leave a persistent indentation. Cardiac, nutritional and nephritic oedema, driven by hydrostatic-pressure or oncotic-pressure mechanisms rather than protein-rich lymphatic stasis, remain pitting.

## explicit_objective
State that lymphatic oedema is non-pitting (from protein-rich fluid driving tissue fibrosis), unlike the pitting oedema of cardiac, nutritional and nephritic causes.

## pitfalls
Assuming all oedema is pitting -- lymphatic oedema is the classic non-pitting exception, owing to its protein-rich fluid and fibrotic tissue response.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Heamodynamic disorders: Gangrene, heamorhage and edema

## subtopic
Oedema classification

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-GANGRENE-HAEMORRHAGE-OEDEMA

## related_article_ids

## related_concept_ids

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following type of oedema is non-pitting: ... lymphatic oedema" (Quiz 35 Q13).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 35 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "lymphatic oedema non-pitting" -- 0 hits. New concept.

---

# Item

## id
CON-FND-A24E254A253910

## label
Volvulus (intestinal torsion) produces moist gangrene via combined venous and arterial occlusion

## canonical_key
gangrene.moist.volvulus-venous-occlusion

## aliases
Volvulus gangrene mechanism

## arabic_label

## arabic_aliases

## definition
Torsion or twisting of the intestine, as in a volvulus, compresses and occludes both the venous and arterial supply to the affected loop. Because venous outflow is blocked as well as arterial inflow, the bowel becomes engorged with stagnant blood, favouring rapid bacterial putrefaction -- the mechanism of moist, not dry, gas or senile, gangrene.

## explicit_objective
State that a volvulus produces moist gangrene, since intestinal torsion occludes venous as well as arterial supply, engorging the bowel with stagnant blood and favouring rapid putrefaction.

## pitfalls
Assuming a mechanical/vascular event such as volvulus produces dry gangrene -- combined arterial-and-venous occlusion, unlike arterial occlusion alone, produces the engorged, rapidly putrefying picture of moist gangrene instead.

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
Heamodynamic disorders: Gangrene, heamorhage and edema

## subtopic
Gangrene mechanisms

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-GANGRENE-HAEMORRHAGE-OEDEMA

## related_article_ids

## related_concept_ids
CON-FND-116B0060AF7B6B

## resource_ids
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
0.55

## academic_relevance
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following types of gangrene occur as a result of torsion or twisting of intestines seen in a volvulus? ... Moist gangrene" (Quiz 35 Q14).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 35 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "volvulus venous gangrene" -- 0 hits. New concept.
relationships: directly related to the reused CON-FND-116B0060AF7B6B (Kasr 208-INT dry-vs-moist-gangrene demarcation concept, this same lecture's Q9/q292) -- this record supplies the volvulus-specific mechanism example, that one the general dry-vs-moist demarcation contrast.

---

# Item

## id
CON-FND-C68CFB507DC0C8

## label
Losartan's chief advantage over enalapril is a lower incidence of angioedema

## canonical_key
arb.losartan.advantage-over-acei-less-angioedema

## aliases
Losartan vs enalapril

## arabic_label

## arabic_aliases

## definition
Angiotensin receptor blockers (ARBs) such as losartan do not affect bradykinin metabolism, since they act downstream at the angiotensin II receptor rather than inhibiting the ACE enzyme that also degrades bradykinin. This gives losartan a lower incidence of angioedema than an ACE inhibitor such as enalapril, even though the two classes are otherwise comparable in efficacy for lowering blood pressure and cost, and losartan has not been shown to be better than an ACE inhibitor at preventing secondary myocardial events.

## explicit_objective
State that losartan's chief advantage over enalapril is a lower incidence of angioedema, because ARBs do not inhibit bradykinin degradation the way ACE inhibitors do.

## pitfalls
Assuming an ARB's advantage over an ACE inhibitor lies in superior blood-pressure efficacy, cardioprotection or cost -- the well-established advantage is a lower angioedema (and cough) risk, from sparing bradykinin degradation.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Autacoids 2

## subtopic
ARB vs ACE inhibitor

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-AUTACOIDS-2

## related_article_ids

## related_concept_ids
CON-FND-F63798C7FE1A68

## resource_ids
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
0.55

## academic_relevance
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following is an advantage of losartan over enalapril? ... Less incidence of angioedema" (Quiz 36 Q3).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 36 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "losartan less angioedema than ace inhibitor" -- 0 hits; grep for "angioedema" found the reused CON-FND-F63798C7FE1A68 (ACE inhibitor adverse effects), a related but distinct fact (this record is about the ARB's comparative advantage, not the ACE inhibitor's own adverse-effect list). New concept.
relationships: direct contrast pairing with the reused CON-FND-F63798C7FE1A68 (this same lecture's Q1/Q2, fosinopril/lisinopril adverse effects).

---

# Item

## id
CON-FND-C06E663F2F7DE7

## label
ACE inhibitors (e.g. lisinopril) enhance bradykinin's effects by blocking its degradation

## canonical_key
acei.mechanism.bradykinin-degradation-blocked

## aliases
ACE inhibitor bradykinin mechanism

## arabic_label

## arabic_aliases

## definition
Angiotensin-converting enzyme (ACE) normally degrades bradykinin in addition to converting angiotensin I to angiotensin II. ACE inhibitors such as lisinopril block this degradation, so bradykinin accumulates and its effects (vasodilation, and the drug class's characteristic dry cough and angioedema) are enhanced -- an effect not shared by losartan (an ARB acting downstream of ACE), propranolol (a beta-blocker) or clonidine (a central alpha2 agonist), none of which inhibit ACE.

## explicit_objective
State that ACE inhibitors such as lisinopril enhance bradykinin's effects by blocking its ACE-mediated degradation, unlike losartan, propranolol or clonidine.

## pitfalls
Assuming any antihypertensive drug class enhances bradykinin -- only an ACE inhibitor, by blocking the enzyme that degrades it, does so.

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
Autacoids 2

## subtopic
ACE inhibitor mechanism

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-AUTACOIDS-2

## related_article_ids

## related_concept_ids
CON-FND-F63798C7FE1A68

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Enhancement of the effects of bradykinin is most with one of the following drugs ... Lisinopril" (Quiz 36 Q4).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 36 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "ace inhibitor dry cough bradykinin" -- 0 hits. New concept -- this record's mechanism is the direct pharmacology-fact basis for the reused CON-FND-F63798C7FE1A68 concept's cough/angioedema adverse effects, but tests the mechanism itself rather than an adverse-effect recognition fact, so kept as its own record rather than folded in.

---

# Item

## id
CON-FND-7708CA90015B1D

## label
Captopril is the appropriate ACE inhibitor for a woman with diabetic nephropathy

## canonical_key
acei.captopril.diabetic-nephropathy-renoprotection

## aliases
ACE inhibitor renoprotection

## arabic_label

## arabic_aliases

## definition
ACE inhibitors such as captopril reduce intraglomerular pressure by preferentially dilating the efferent glomerular arteriole, slowing the progression of diabetic nephropathy -- making captopril the appropriate choice for a woman with diabetic nephropathy among four drug-patient pairings tested together. A beta-blocker such as propranolol is relatively contraindicated in peripheral vascular disease, captopril itself would worsen rather than suit a hyperkalemic patient, and any ACE inhibitor (including enalapril) is contraindicated in pregnancy.

## explicit_objective
Identify captopril as the appropriate choice for a woman with diabetic nephropathy, because ACE inhibitors are renoprotective by reducing intraglomerular pressure, and reject drug-patient pairings that are inappropriate or contraindicated for other stated patient factors.

## pitfalls
Overlooking that ACE inhibitors are specifically renoprotective in diabetic nephropathy while also being contraindicated in pregnancy and in patients prone to hyperkalemia -- the same drug class can be the right or wrong choice depending on the specific patient factor named.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Autacoids 2

## subtopic
ACE inhibitor indications and cautions

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-AUTACOIDS-2

## related_article_ids

## related_concept_ids
CON-FND-F63798C7FE1A68

## resource_ids
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
0.7

## academic_relevance
0.4

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which one of the following is the most appropriate drug to use for the patient described in parentheses? ... Captopril (woman with diabetic nephropathy)" (Quiz 36 Q5).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 36 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "captopril diabetic nephropathy" -- 0 hits; grep for "diabetic nephropathy" found unrelated biochemistry hits (Alexandria/Kasr lipid/nitrogen metabolism records, not this ACE-inhibitor-indication fact). New concept.

---

# Item

## id
CON-FND-DAD9DC4AEE2456

## label
Aliskiren is a direct renin inhibitor

## canonical_key
antihypertensive.aliskiren.direct-renin-inhibitor

## aliases
Direct renin inhibitor

## arabic_label

## arabic_aliases

## definition
Aliskiren directly inhibits renin, the enzyme that initiates the renin-angiotensin-aldosterone cascade by cleaving angiotensinogen to angiotensin I -- acting one step upstream of an ACE inhibitor (which blocks angiotensin I to angiotensin II conversion) and an ARB such as losartan or valsartan (which blocks the angiotensin II receptor). This distinguishes aliskiren as the direct renin inhibitor among these four antihypertensive options.

## explicit_objective
Identify aliskiren as a direct renin inhibitor, acting upstream of ACE inhibitors and ARBs in the renin-angiotensin-aldosterone cascade.

## pitfalls
Confusing a direct renin inhibitor (aliskiren) with an ARB (losartan, valsartan) or an ACE inhibitor (lisinopril) -- each acts at a different, sequential step of the same cascade.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Autacoids 2

## subtopic
Renin-angiotensin system drug classes

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-AUTACOIDS-2

## related_article_ids

## related_concept_ids

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A woman with high blood pressure is given a drug that is considered a direct renin inhibitor. Which one of these drugs? ... Aliskiren" (Quiz 36 Q6).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 36 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "aliskiren direct renin inhibitor" -- 0 hits; grep for "aliskiren"/"renin inhibitor" found 0 hits across docs/*-Source-Imports concept dirs. New concept.

---

# Item

## id
CON-FND-962C19CA6C839B

## label
A benign tumour usually shows a mature (well-differentiated) cell population

## canonical_key
neoplasia.benign.mature-cell-population

## aliases
Benign tumour histology

## arabic_label

## arabic_aliases

## definition
A benign tumour is usually composed of a mature, well-differentiated cell population that closely resembles its tissue of origin, without blood or lymphatic spread, extensive necrosis, or numerous mitotic figures -- features that instead characterise a malignant tumour.

## explicit_objective
State that a benign tumour usually shows a mature cell population, distinguishing it from the blood/lymphatic spread, necrosis and high mitotic activity of a malignant tumour.

## pitfalls
Attributing a malignant feature (blood/lymphatic spread, extensive necrosis, many mitotic figures) to a benign tumour, whose defining histological feature is instead a mature, well-differentiated cell population.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Neoplasia: definition and classification

## subtopic
Benign tumour features

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-NEOPLASIA-DEFINITION-CLASSIFICATION

## related_article_ids

## related_concept_ids

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A benign tumour usually shows: ... mature cell population" (Quiz 37 Q1).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 37 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "benign tumour mature differentiated cells" -- 0 hits. New concept.

---

# Item

## id
CON-FND-02F2597FB9F10A

## label
A malignant ulcer is characterized by an indurated base

## canonical_key
neoplasia.malignant-ulcer.indurated-base

## aliases
Malignant ulcer base

## arabic_label

## arabic_aliases

## definition
A malignant ulcer is characterized by an indurated (hard) base, produced by infiltrating malignant tissue -- unlike a punched-out edge (typical of an ischaemic or syphilitic/gummatous ulcer), congestion around the ulcer, or a healthy floor, none of which is the defining feature of malignancy.

## explicit_objective
State that a malignant ulcer is characterized by an indurated base, distinguishing it from a punched-out edge, surrounding congestion or a healthy floor.

## pitfalls
Assuming a punched-out edge is the defining feature of a malignant ulcer -- that edge pattern is more typical of an ischaemic or gummatous ulcer, while a malignant ulcer's defining feature is its indurated base.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Neoplasia: definition and classification

## subtopic
Malignant ulcer features

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-NEOPLASIA-DEFINITION-CLASSIFICATION

## related_article_ids

## related_concept_ids
CON-FND-A827F765FDA492

## resource_ids
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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A malignant ulcer is characterized by: ... indurated base" (Quiz 37 Q2).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 37 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "malignant ulcer indurated base everted edge" -- 0 hits. New concept.
relationships: paired with CON-FND-A827F765FDA492 (this same lecture's Q4, malignant ulcer edge) -- the two records together cover the malignant-ulcer base-and-edge description.

---

# Item

## id
CON-FND-8971FF484237C5

## label
Neoplasia is an autonomous growth that behaves parasitically toward the host

## canonical_key
neoplasia.definition.autonomous-parasitic-growth

## aliases
Definition of neoplasia

## arabic_label

## arabic_aliases

## definition
Neoplasia is defined as an autonomous (uncontrolled) new growth that, once established, persists independently of the stimulus that initiated it, has no useful function to the host, and escapes normal biological growth control -- behaving parasitically by drawing nutrition from the host without contributing anything useful in return. This is what "autonomous" and "parasitic" mean in the classic definition of neoplasia, distinguishing it from a normal, controlled, functionally useful, stimulus-dependent tissue response.

## explicit_objective
State that neoplasia is an autonomous growth that behaves parasitically toward the host, without a sustaining stimulus, useful function, or biological control.

## pitfalls
Assuming neoplastic growth remains dependent on a continuing stimulus, retains a useful function, or stays under normal biological control -- autonomy from all three of these is precisely what defines a neoplasm.

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
Neoplasia: definition and classification

## subtopic
Definition of neoplasia

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-NEOPLASIA-DEFINITION-CLASSIFICATION

## related_article_ids

## related_concept_ids

## resource_ids
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
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Neoplasia is an autonomous growth characterized by: ... parasitic" (Quiz 37 Q3).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 37 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "neoplasia definition autonomous parasitic growth" -- 0 hits. New concept.

---

# Item

## id
CON-FND-A827F765FDA492

## label
The edge of a malignant ulcer is raised and everted

## canonical_key
neoplasia.malignant-ulcer.raised-everted-edge

## aliases
Malignant ulcer edge

## arabic_label

## arabic_aliases

## definition
The edge of a malignant ulcer is raised and everted (rolled outward), produced by the proliferating malignant tissue at its margin -- distinct from a sloping edge (a healing or traumatic/venous ulcer), an undermined edge (classically a tuberculous ulcer), or a punched-out edge (an ischaemic or gummatous ulcer).

## explicit_objective
State that a malignant ulcer's edge is raised and everted, distinguishing it from the sloping, undermined and punched-out edges of other ulcer types.

## pitfalls
Confusing a malignant ulcer's raised, everted edge with the undermined edge of a tuberculous ulcer or the punched-out edge of an ischaemic/gummatous ulcer.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Neoplasia: definition and classification

## subtopic
Malignant ulcer features

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-NEOPLASIA-DEFINITION-CLASSIFICATION

## related_article_ids

## related_concept_ids
CON-FND-02F2597FB9F10A

## resource_ids
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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The edge of a malignant ulcer is: ... raised and everted" (Quiz 37 Q4).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 37 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "malignant ulcer indurated base everted edge" -- 0 hits. New concept.
relationships: paired with CON-FND-02F2597FB9F10A (this same lecture's Q2, malignant ulcer base).

---

# Item

## id
CON-FND-E9841932647962

## label
Malignant cell nuclei show abnormal mitotic figures

## canonical_key
neoplasia.malignant-nuclei.abnormal-mitosis

## aliases
Malignant nuclear features

## arabic_label

## arabic_aliases

## definition
The nuclei of malignant cells show abnormal mitotic figures (atypical, sometimes tripolar spindle patterns), reflecting the disordered, excessive cell division that drives malignant growth -- unlike normal nuclear size, a normal nucleus-to-cytoplasm (N/C) ratio, normochromatism, and uniform nuclear shape, which are instead features of benign or normal cells.

## explicit_objective
State that malignant cell nuclei show abnormal mitotic figures, distinguishing this from the normal size, N/C ratio, chromatin staining and shape of benign or normal nuclei.

## pitfalls
Attributing normal nuclear features (normal size, normal N/C ratio, normochromatism, uniform shape) to a malignant cell -- these instead describe a benign or normal cell nucleus.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Neoplasia: definition and classification

## subtopic
Malignant cell nuclear features

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-NEOPLASIA-DEFINITION-CLASSIFICATION

## related_article_ids

## related_concept_ids

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The nuclei of malignant cells show: ... d- abnormal mitosis" (Quiz 37 Q5) -- printed option text carries a stray "d-" prefix (a PDF export artifact matching the option's own letter), cleaned to "Abnormal mitosis" in this record; the marked answer's content is unambiguous.

## merge_ids

## rejected_merge_candidate_ids
CON-FND-D75B95517F50CF

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 37 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "malignant cell nuclei abnormal mitosis" -- 0 hits; grep for "abnormal mitos" found a related but distinct Kasr 208-INT concept (CON-FND-D75B95517F50CF, "Anaplasia... grades a malignant tumor's differentiation") -- that record's focus is the grade-differentiation-anaplasia relationship, using abnormal mitoses as one feature among several, not this record's narrower nuclear-recognition fact; not merged, listed in rejected_merge_candidate_ids. New concept.

---

# Item

## id
CON-FND-0FAB8FEEC08F4B

## label
Angioma is the uncapsulated benign tumour among fibroadenoma, neurofibroma, chondroma and lipoma

## canonical_key
neoplasia.benign-tumour.angioma-uncapsulated

## aliases
Uncapsulated benign tumour

## arabic_label

## arabic_aliases

## definition
Most benign tumours -- fibroadenoma, chondroma and lipoma among them -- grow slowly enough to compress and form a surrounding fibrous capsule. Angioma (a vascular benign tumour/proliferation of blood vessels) characteristically lacks this true capsule, growing instead as an uncapsulated network of vessels within the surrounding tissue, which this teaching point names as the uncapsulated example among the four options.

## explicit_objective
Identify angioma as the uncapsulated benign tumour among fibroadenoma, neurofibroma, chondroma and lipoma.

## pitfalls
Assuming every benign tumour is capsulated by definition -- angioma is a recognised exception, growing as an uncapsulated vascular proliferation.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Neoplasia: definition and classification

## subtopic
Benign tumour capsulation

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-NEOPLASIA-DEFINITION-CLASSIFICATION

## related_article_ids

## related_concept_ids

## resource_ids
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
0.6

## weight_confidence
0.4

## confidence
0.7

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of these benign tumours is uncapsulated ? ... angioma" (Quiz 37 Q6).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 37 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source. Neurofibroma is also taught as an uncapsulated benign tumour in some pathology curricula; the source PDF marks angioma specifically as its single correct answer among the five options, so that is what this record follows, but a learner may reasonably encounter neurofibroma cited as uncapsulated elsewhere.

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
sourceCandidateIds: find-existing.mjs searched "angioma uncapsulated benign tumour" -- 0 hits; grep for "uncapsulated"/"capsulat" found only an unrelated hamartoma/choristoma distinction (Kasr 208-INT). New concept.

---

# Item

## id
CON-FND-0D4DD74432DAD3

## label
Zileuton relieves asthma by inhibiting 5-lipoxygenase

## canonical_key
autacoid.zileuton.5-lipoxygenase-inhibitor

## aliases
Zileuton mechanism

## arabic_label

## arabic_aliases

## definition
Zileuton relieves asthma by inhibiting 5-lipoxygenase, the enzyme that converts arachidonic acid into leukotrienes -- the bronchoconstricting, pro-inflammatory mediators central to asthma pathophysiology. This upstream enzyme-inhibition mechanism is distinct from inhibiting mast cell degranulation, antagonizing leukotriene receptors at their target (as montelukast does), or inhibiting cyclooxygenase (the prostaglandin pathway enzyme).

## explicit_objective
State that zileuton relieves asthma by inhibiting 5-lipoxygenase, blocking leukotriene synthesis at its source, distinct from leukotriene-receptor antagonism or cyclooxygenase inhibition.

## pitfalls
Confusing zileuton's 5-lipoxygenase-inhibiting mechanism with a leukotriene-receptor antagonist's mechanism (e.g. montelukast) -- one blocks synthesis, the other blocks the receptor.

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
Autacoids 3

## subtopic
Leukotriene pathway drugs

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-AUTACOIDS-3

## related_article_ids

## related_concept_ids
CON-FND-69AECAECBCA67F

## resource_ids
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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Zileuton is effective in relieving asthma because it produces one of the following: ... Inhibits 5-lipoxygenase" (Quiz 38 Q1).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 38 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "zileuton 5-lipoxygenase inhibitor asthma" -- 0 hits. New concept.

---

# Item

## id
CON-FND-5B8348A2C52406

## label
Alprostadil (PGE1) is the drug of choice for temporary maintenance of a patent ductus arteriosus

## canonical_key
autacoid.alprostadil.pda-maintenance

## aliases
Alprostadil PDA maintenance

## arabic_label

## arabic_aliases

## definition
Alprostadil (prostaglandin E1) keeps the ductus arteriosus open by maintaining the smooth-muscle-relaxing prostaglandin tone that closes physiologically after birth, making it the drug of choice for temporary maintenance of ductal patency in a neonate with ductus-dependent congenital heart disease -- the opposite therapeutic goal from indomethacin, a prostaglandin-synthesis inhibitor used instead to close a patent ductus arteriosus.

## explicit_objective
State that alprostadil (PGE1) is the drug of choice for temporarily maintaining a patent ductus arteriosus, contrasted with indomethacin, which is used to close one.

## pitfalls
Confusing alprostadil's ductus-opening indication with indomethacin's opposite, ductus-closing indication -- the same physiological pathway (prostaglandin tone) is exploited in opposite directions by the two drugs.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Autacoids 3

## subtopic
Prostaglandin therapeutics

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-AUTACOIDS-3

## related_article_ids

## related_concept_ids
CON-FND-0B0F628EB67257

## resource_ids
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
0.65

## academic_relevance
0.4

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"For temporary maintenance of a patent ductus arteriosus, the drug of choice is: ... alprostadil" (Quiz 38 Q2).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 38 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "alprostadil patent ductus arteriosus" -- 0 hits. New concept.

---

# Item

## id
CON-FND-6D14E90AC8C478

## label
Glucocorticoids relieve allergic rhinitis by decreasing phospholipase A2 activity

## canonical_key
autacoid.glucocorticoid.pla2-inhibition-mechanism

## aliases
Glucocorticoid PLA2 mechanism

## arabic_label

## arabic_aliases

## definition
Glucocorticoids relieve allergic conditions such as nasal congestion and rhinorrhea by inducing lipocortin (annexin-1), which inhibits phospholipase A2 -- the enzyme that liberates arachidonic acid from membrane phospholipids, the shared first step feeding both the cyclooxygenase (prostaglandin) and lipoxygenase (leukotriene) pathways. This single upstream mechanism, not direct leukotriene-receptor antagonism, lipoxygenase-pathway inhibition, or H2-receptor antagonism, is how a glucocorticoid blocks eicosanoid-driven inflammation broadly.

## explicit_objective
State that a glucocorticoid's mechanism in allergic rhinitis is decreased phospholipase A2 activity, blocking both the prostaglandin and leukotriene pathways at their shared first step.

## pitfalls
Attributing a glucocorticoid's anti-allergic action to a downstream, pathway-specific mechanism (leukotriene-receptor antagonism, lipoxygenase inhibition, H2-receptor blockade) rather than its actual upstream, phospholipase-A2-inhibiting mechanism.

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
Autacoids 3

## subtopic
Eicosanoid synthesis inhibition

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-AUTACOIDS-3

## related_article_ids

## related_concept_ids

## resource_ids
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
0.55

## academic_relevance
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"...he was advised to take glucocorticoids, the mechanism of action of them is: ... down phospholipase A2 activity" (Quiz 38 Q3).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 38 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "glucocorticoid phospholipase a2 inhibition" -- 0 hits. New concept.

---

# Item

## id
CON-FND-1705B37A2FA90C

## label
A PGE1 analog (misoprostol) prevents NSAID-induced gastritis

## canonical_key
autacoid.pge1-analog.nsaid-gastritis-prevention

## aliases
Misoprostol NSAID gastroprotection

## arabic_label

## arabic_aliases

## definition
NSAIDs such as ibuprofen inhibit cyclooxygenase, reducing the gastroprotective prostaglandin PGE1/PGE2 that normally maintains gastric mucus and bicarbonate secretion; a PGE1 analog such as misoprostol restores this protective effect, preventing NSAID-induced gastritis. A PGE1-receptor antagonist, a PGE2 analog or a PGI2 analog do not describe this specific replacement-therapy mechanism.

## explicit_objective
State that a PGE1 analog (misoprostol) prevents NSAID-induced gastritis by restoring the gastroprotective prostaglandin tone that the NSAID's cyclooxygenase inhibition removed.

## pitfalls
Selecting a PGE1 antagonist, PGE2 analog or PGI2 analog instead of a PGE1 analog -- the therapeutic replacement for NSAID-suppressed gastric PGE1 specifically requires a PGE1 analog, not an antagonist or a different prostaglandin's analog.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Autacoids 3

## subtopic
Prostaglandin therapeutics

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-AUTACOIDS-3

## related_article_ids

## related_concept_ids

## resource_ids
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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"...The physician prescribes a medication to prevent gastritis. Which of the following best describes the medication? ... PGE 1 analog" (Quiz 38 Q4).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 38 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "misoprostol pge1 analog nsaid gastritis prevention" -- 0 hits. New concept.

---

# Item

## id
CON-FND-0B0F628EB67257

## label
Dinoprostone is approved for cervical ripening near term

## canonical_key
autacoid.dinoprostone.cervical-ripening

## aliases
Dinoprostone cervical ripening

## arabic_label

## arabic_aliases

## definition
Dinoprostone (a PGE2 analog) is approved specifically for ripening an unfavourable cervix at or near term, softening and preparing it for labour induction -- unlike ergonovine (an ergot alkaloid used post-partum to prevent haemorrhage), terbutaline (a beta2 agonist tocolytic that delays labour) or alprostadil (PGE1, used for ductal patency, not cervical ripening).

## explicit_objective
State that dinoprostone is the agent approved for cervical ripening near term, distinguishing it from ergonovine, terbutaline and alprostadil.

## pitfalls
Substituting alprostadil (PGE1) for dinoprostone (PGE2) as the cervical-ripening agent -- the two prostaglandin analogs have distinct, non-interchangeable obstetric indications.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Autacoids 3

## subtopic
Prostaglandin therapeutics

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-AUTACOIDS-3

## related_article_ids

## related_concept_ids
CON-FND-5B8348A2C52406

## resource_ids
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
0.65

## academic_relevance
0.4

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which one of the following is approved for \"ripening\" of an unfavorable cervix at or near term in a pregnant patient? ... Dinoprostone" (Quiz 38 Q5).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 38 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "dinoprostone cervical ripening" -- 0 hits. New concept.
relationships: contrast pairing with CON-FND-5B8348A2C52406 (this same lecture's Q2, alprostadil/PGE1 ductal patency) -- the two PGE analogs' distinct obstetric-vs-neonatal indications.

---

# Item

## id
CON-FND-69AECAECBCA67F

## label
Leukotriene biosynthesis requires 5-lipoxygenase

## canonical_key
autacoid.leukotriene.5-lipoxygenase-required-enzyme

## aliases
Leukotriene biosynthesis pathway

## arabic_label

## arabic_aliases

## definition
Leukotrienes are synthesised from arachidonic acid via the 5-lipoxygenase pathway, not the 8-lipoxygenase (a non-human pathway), COX-1 or COX-2 pathways, which instead generate prostaglandins and thromboxane. 5-Lipoxygenase is therefore the required enzyme for leukotriene biosynthesis, and the target of a drug such as zileuton.

## explicit_objective
State that leukotriene biosynthesis requires 5-lipoxygenase, distinguishing this pathway from the COX-1/COX-2 prostaglandin/thromboxane pathway.

## pitfalls
Confusing the leukotriene-generating lipoxygenase pathway with the prostaglandin/thromboxane-generating cyclooxygenase (COX-1/COX-2) pathway -- both start from arachidonic acid but diverge at this branch point.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Autacoids 3

## subtopic
Leukotriene pathway drugs

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-AUTACOIDS-3

## related_article_ids

## related_concept_ids
CON-FND-0D4DD74432DAD3

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.85

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following enzymes do leukotrienes require for their biosynthesis? ... 5-Lipoxygenase" (Quiz 38 Q6).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 38 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "leukotriene biosynthesis 5-lipoxygenase enzyme" -- 0 hits. New concept.
relationships: sibling of CON-FND-0D4DD74432DAD3 (this same lecture's Q1, zileuton).

---

# Item

## id
CON-FND-0BE8A63694384F

## label
Benign tumours grow by expansion

## canonical_key
neoplasia.benign.growth-by-expansion

## aliases
Benign tumour growth pattern

## arabic_label

## arabic_aliases

## definition
Benign tumours grow by expansion: they enlarge as a cohesive mass that pushes aside, rather than invades, surrounding tissue, and do not spread to lymph nodes, recur after adequate removal, or grow at a rapid rate -- features instead associated with malignant tumours.

## explicit_objective
State that benign tumours grow by expansion, pushing aside surrounding tissue, distinguishing this from lymphatic spread, recurrence and rapid growth.

## pitfalls
Attributing a malignant growth feature (lymph node spread, recurrence, rapid growth) to a benign tumour, whose defining growth pattern is instead expansion.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Neoplasia: characters of benign and malignant

## subtopic
Growth pattern

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-NEOPLASIA-CHARACTERS

## related_article_ids

## related_concept_ids
CON-FND-535DC0C5E33E73
CON-FND-962C19CA6C839B

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Benign tumours show: ... growth by expansion" (Quiz 39 Q1).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 39 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "benign tumour growth by expansion" -- 0 hits. New concept.
relationships: sibling/contrast pair with CON-FND-535DC0C5E33E73 (this same lecture's Q2, malignant infiltrative growth); related to CON-FND-962C19CA6C839B (Lecture 37's benign mature-cell-population concept).

---

# Item

## id
CON-FND-535DC0C5E33E73

## label
Malignant tumours grow by infiltration

## canonical_key
neoplasia.malignant.growth-by-infiltration

## aliases
Malignant tumour growth pattern

## arabic_label

## arabic_aliases

## definition
Malignant tumours grow by infiltration: they invade and destroy surrounding tissue rather than merely pushing it aside, and characteristically show a rapid (not slow) rate of growth, are not localized, and do recur after removal -- the opposite growth pattern from a benign tumour's expansile growth.

## explicit_objective
State that malignant tumours grow by infiltration, distinguishing this from a slow growth rate, localization and non-recurrence.

## pitfalls
Attributing a benign tumour's features (slow growth, being localized, not recurring after removal) to a malignant tumour, whose defining growth pattern is instead infiltration.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Neoplasia: characters of benign and malignant

## subtopic
Growth pattern

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-NEOPLASIA-CHARACTERS

## related_article_ids

## related_concept_ids
CON-FND-0BE8A63694384F

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Malignat tumours characterized by: ... Grow by infiltration" (Quiz 39 Q2).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 39 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "malignant tumour growth by infiltration" -- 0 hits. New concept.
relationships: sibling/contrast pair with CON-FND-0BE8A63694384F (this same lecture's Q1, benign expansile growth).

---

# Item

## id
CON-FND-4EB925D64C4FF3

## label
Tumour stage is the most important prognostic factor in malignant tumours

## canonical_key
neoplasia.prognosis.stage-most-important-factor

## aliases
Prognostic factor ranking

## arabic_label

## arabic_aliases

## definition
Among the factors that inform a malignant tumour's prognosis -- grade, size, stage and cell shape -- tumour stage (its anatomic extent of spread, captured by the TNM system's tumour size, nodal involvement and distant metastasis axes) is the single most important, since a widely spread cancer carries a substantially worse prognosis regardless of how differentiated its cells appear.

## explicit_objective
State that tumour stage is the most important prognostic factor in malignant tumours, ranking above tumour grade, raw size and cell shape.

## pitfalls
Assuming tumour grade (differentiation) is the most important prognostic factor -- stage (anatomic extent of spread) outweighs grade as the dominant determinant of prognosis.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Neoplasia: characters of benign and malignant

## subtopic
Prognostic factors

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-NEOPLASIA-CHARACTERS

## related_article_ids

## related_concept_ids
CON-FND-9FF27DE891DFBE

## resource_ids
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
0.65

## academic_relevance
0.4

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The most important factor in prognosis of malignant tumours is: ... Tumour stage" (Quiz 39 Q4).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 39 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "tumour stage most important prognostic factor" -- 0 hits; grep for "tumor stage"/"tumour stage" found 0 hits. New concept.
relationships: directly related to the reused CON-FND-9FF27DE891DFBE (Kasr 208-INT TNM-staging-vs-grading concept, this same lecture's Q3/Q5) -- this record supplies the prognostic-ranking fact, that one the TNM-system-definition fact.

---

# Item

## id
CON-FND-1AF0F29A09A2CA

## label
Invasion is the most important microscopic feature confirming malignancy

## canonical_key
neoplasia.malignancy-criterion.invasion

## aliases
Malignancy diagnostic criterion

## arabic_label

## arabic_aliases

## definition
Among pleomorphism, necrosis, an increased nuclear/cytoplasmic ratio, invasion and atypia, invasion -- histological evidence that tumour cells have breached the basement membrane and infiltrated surrounding tissue -- is the most important feature confirming malignancy, since the other four (pleomorphism, necrosis, raised N/C ratio, atypia) can each also be seen in severe dysplasia without invasion, which by definition is not yet malignant.

## explicit_objective
State that invasion (breach of the basement membrane) is the most important microscopic feature confirming malignancy, distinguishing it from pleomorphism, necrosis, raised N/C ratio and atypia, each of which can occur in severe dysplasia without invasion.

## pitfalls
Treating pleomorphism, necrosis, a raised N/C ratio or atypia as sufficient on their own to confirm malignancy -- each can be seen in severe dysplasia; only invasion through the basement membrane is the defining, confirmatory criterion.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Neoplasia: characters of benign and malignant

## subtopic
Malignancy criteria

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-NEOPLASIA-CHARACTERS

## related_article_ids

## related_concept_ids
CON-FND-535DC0C5E33E73

## resource_ids
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
0.7

## academic_relevance
0.4

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"...which is most important feature to indicate that the neoplasm is malignant? ... Invasion" (Quiz 39 Q6).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 39 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "invasion malignancy criterion" -- 0 hits. New concept.
relationships: related to CON-FND-535DC0C5E33E73 (this same lecture's Q2, malignant infiltrative growth) -- invasion is the microscopic diagnostic criterion behind that gross/behavioural growth-pattern fact.

---

# Item

## id
CON-FND-C24474B6240E60

## label
Benzathine penicillin is the best prophylactic drug against Streptococcus haemolyticus

## canonical_key
antimicrobial.benzathine-penicillin.strep-prophylaxis

## aliases
Rheumatic fever prophylaxis

## arabic_label

## arabic_aliases

## definition
Benzathine penicillin, a long-acting depot form of penicillin G, is the best prophylactic drug against Streptococcus haemolyticus (group A beta-haemolytic streptococcus), maintaining protective drug levels for weeks with a single injection -- the basis for long-term rheumatic fever prophylaxis. Doxycycline, flucloxacillin and ceftriaxone are not the standard prophylactic choice for this organism.

## explicit_objective
State that benzathine penicillin is the best prophylactic drug against Streptococcus haemolyticus, owing to its long-acting depot formulation.

## pitfalls
Selecting a short-acting or non-penicillin antibacterial (doxycycline, flucloxacillin, ceftriaxone) for long-term streptococcal prophylaxis, where benzathine penicillin's depot, weeks-long action is specifically what is needed.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Introduction to Antimicrobial therapy

## subtopic
Antibacterial prophylaxis

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-INTRO-ANTIMICROBIAL-THERAPY

## related_article_ids

## related_concept_ids

## resource_ids
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
0.7

## academic_relevance
0.4

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The best effective prophylactic drug in streptococcus haemolyticus is: ... Benzathine penicillin" (Quiz 40 Q1).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 40 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "benzathine penicillin prophylaxis streptococcus" -- 0 hits. New concept.

---

# Item

## id
CON-FND-9285259B9D2045

## label
Sulbactam is a beta-lactamase inhibitor co-administered with penicillins

## canonical_key
antimicrobial.sulbactam.beta-lactamase-inhibitor

## aliases
Beta-lactamase inhibitors

## arabic_label

## arabic_aliases

## definition
Sulbactam is a beta-lactamase inhibitor, co-administered with a penicillin (as in ampicillin/sulbactam) to protect the antibiotic from bacterial beta-lactamase inactivation and restore its activity against beta-lactamase-producing organisms. Ethacrynic acid (a loop diuretic), monobactam (a distinct beta-lactam antibiotic class, e.g. aztreonam) and moxalactam (a cephalosporin-class antibiotic) are not beta-lactamase inhibitors.

## explicit_objective
Identify sulbactam as a beta-lactamase inhibitor used to protect a co-administered penicillin from bacterial beta-lactamase inactivation.

## pitfalls
Confusing sulbactam, a beta-lactamase inhibitor, with a beta-lactam antibiotic itself (monobactam, moxalactam) or an unrelated drug class (ethacrynic acid, a diuretic).

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Introduction to Antimicrobial therapy

## subtopic
Beta-lactamase inhibitors

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-INTRO-ANTIMICROBIAL-THERAPY

## related_article_ids

## related_concept_ids
CON-FND-DC92909C41BEA8

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Pick out the β-lactamase inhibitor for co-administration with penicillins: ... Sulbactum" (Quiz 40 Q2).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 40 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "sulbactam beta-lactamase inhibitor" -- 0 hits. New concept.

---

# Item

## id
CON-FND-DC92909C41BEA8

## label
Resistance to penicillin and other beta-lactams arises from multiple, coexisting mechanisms

## canonical_key
antimicrobial.beta-lactam-resistance.multiple-mechanisms

## aliases
Beta-lactam resistance mechanisms

## arabic_label

## arabic_aliases

## definition
Bacteria can resist penicillin and other beta-lactam antibiotics through several distinct mechanisms that are not mutually exclusive: inactivation by beta-lactamase enzymes, altered porin structure reducing drug entry into gram-negative organisms, and altered penicillin-binding proteins (PBPs) reducing the drug's target affinity. Because all three mechanisms genuinely contribute to beta-lactam resistance, "all of the above" is the correct, most complete answer.

## explicit_objective
State that resistance to penicillin and other beta-lactams can arise from beta-lactamase inactivation, altered porin structure and altered PBPs together, not from any single mechanism alone.

## pitfalls
Selecting only one resistance mechanism (beta-lactamase inactivation, porin change, or PBP alteration) when the question in fact tests that all three genuinely contribute to beta-lactam resistance.

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
Introduction to Antimicrobial therapy

## subtopic
Antibiotic resistance mechanisms

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-INTRO-ANTIMICROBIAL-THERAPY

## related_article_ids

## related_concept_ids
CON-FND-9285259B9D2045

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Resistance to Penicillin and other β-lactams is due to: ... All of the above" (Quiz 40 Q3).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 40 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "beta-lactamase resistance mechanisms penicillin" -- 0 hits. New concept.
relationships: sibling of CON-FND-9285259B9D2045 (this same lecture's Q2, sulbactam).

---

# Item

## id
CON-FND-6334736B849C6D

## label
Oral (not intravenous) vancomycin treats pseudomembranous colitis

## canonical_key
antimicrobial.vancomycin.oral-route-for-c-diff-colitis

## aliases
Vancomycin route for C. difficile colitis

## arabic_label

## arabic_aliases

## definition
Vancomycin inhibits bacterial cell wall synthesis, causes histamine release (red man syndrome) as an adverse effect, and is a first-choice drug for MRSA -- but for pseudomembranous colitis (typically Clostridioides difficile), it must be given orally, not intravenously, since intravenous vancomycin does not reach an effective concentration within the gut lumen where the infection occurs; oral vancomycin acts locally within the colon instead.

## explicit_objective
State that vancomycin's use in pseudomembranous colitis requires the oral route, not the intravenous route, since only oral dosing reaches an effective luminal gut concentration.

## pitfalls
Assuming vancomycin's intravenous route, appropriate for systemic infections such as MRSA, also applies to pseudomembranous colitis -- that specific indication requires the oral route instead, to act locally within the gut lumen.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Introduction to Antimicrobial therapy

## subtopic
Vancomycin

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-INTRO-ANTIMICROBIAL-THERAPY

## related_article_ids

## related_concept_ids

## resource_ids
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
0.7

## academic_relevance
0.4

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Concerning vancomycin, the following is correct EXCEPT: ... It is used intravenously in the treatment of pseudomembranous colitis" (Quiz 40 Q4).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 40 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "vancomycin oral pseudomembranous colitis" -- 0 hits. New concept.

---

# Item

## id
CON-FND-9CBD045C91CA64

## label
Maculopapular rash is a characteristic adverse effect of ampicillin

## canonical_key
antimicrobial.ampicillin.maculopapular-rash

## aliases
Ampicillin rash

## arabic_label

## arabic_aliases

## definition
A maculopapular (morbilliform) skin rash is a characteristic adverse effect of ampicillin, occurring in a substantial minority of patients and especially common (and non-allergic in mechanism) when ampicillin is given during infectious mononucleosis (EBV infection) -- distinct from acute haemolytic anemia, agranulocytosis or phototoxicity, none of which is ampicillin's characteristic reaction.

## explicit_objective
State that a maculopapular rash, not acute haemolytic anemia, agranulocytosis or phototoxicity, is ampicillin's characteristic adverse effect.

## pitfalls
Attributing a different drug class's characteristic adverse effect (haemolytic anemia, agranulocytosis, phototoxicity) to ampicillin, whose own signature reaction is a maculopapular rash.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Introduction to Antimicrobial therapy

## subtopic
Aminopenicillin adverse effects

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-INTRO-ANTIMICROBIAL-THERAPY

## related_article_ids

## related_concept_ids

## resource_ids
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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A characteristic adverse effect associated with the use of Ampicillin is: ... Maculpapular rash" (Quiz 40 Q5).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 40 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "ampicillin maculopapular rash" -- 0 hits. New concept.

---

# Item

## id
CON-FND-739E0D80DC4F2A

## label
Erythromycin is the appropriate alternative for a penicillin-allergic patient with Streptococcus pneumoniae infection

## canonical_key
antimicrobial.erythromycin.alternative-for-penicillin-allergy

## aliases
Macrolide for penicillin allergy

## arabic_label

## arabic_aliases

## definition
In a patient with true hypersensitivity to penicillin V who develops a Streptococcus pneumoniae infection, erythromycin (a macrolide) is the appropriate alternative, since it belongs to a structurally unrelated antibiotic class with no cross-reactivity risk -- unlike amoxicillin/clavulanate, ampicillin (both penicillins) or cefaclor (a cephalosporin, which carries some cross-reactivity risk with penicillin allergy).

## explicit_objective
Select erythromycin as the appropriate antibiotic for a penicillin-allergic patient with a Streptococcus pneumoniae infection, avoiding amoxicillin/clavulanate, ampicillin and cefaclor.

## pitfalls
Choosing a beta-lactam alternative (a different penicillin, or a cephalosporin such as cefaclor) for a penicillin-allergic patient -- a macrolide such as erythromycin, from a structurally unrelated class, is the safer choice.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Introduction to Antimicrobial therapy

## subtopic
Antibiotic selection in penicillin allergy

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-INTRO-ANTIMICROBIAL-THERAPY

## related_article_ids

## related_concept_ids

## resource_ids
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
0.7

## academic_relevance
0.4

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"...which of the following antimicrobials would be the best choice for that patient? ... Erythromycin" (Quiz 40 Q6).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 40 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "erythromycin penicillin allergy alternative" -- 0 hits. New concept.

---

# Item

## id
CON-FND-A64FEC0DBC4146

## label
Ceftriaxone is bactericidal

## canonical_key
antimicrobial.ceftriaxone.bactericidal

## aliases
Ceftriaxone pharmacology

## arabic_label

## arabic_aliases

## definition
Ceftriaxone, a third-generation cephalosporin, is bactericidal, inhibiting bacterial cell wall synthesis (not protein synthesis) and killing susceptible bacteria outright -- it is not effective orally (requiring parenteral administration only), and hepatic toxicity is not its main recognised side effect (biliary sludging is a more specific, better-known concern).

## explicit_objective
State that ceftriaxone is bactericidal (via cell wall synthesis inhibition), and reject the claims that it is orally effective, acts by inhibiting protein synthesis, or causes hepatic toxicity as its main side effect.

## pitfalls
Assuming ceftriaxone is available orally, or that it inhibits protein synthesis rather than cell wall synthesis -- ceftriaxone is a parenteral-only beta-lactam and, like other cephalosporins, is bactericidal via cell wall synthesis inhibition.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Introduction to Antimicrobial therapy

## subtopic
Cephalosporin pharmacology

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-INTRO-ANTIMICROBIAL-THERAPY

## related_article_ids

## related_concept_ids

## resource_ids
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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"One of the following about ceftriaxone is correct: ... It is bactericidal" (Quiz 40 Q7).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 40 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "ceftriaxone bactericidal" -- 0 hits. New concept.

---

# Item

## id
CON-FND-AFBFED85C86B2C

## label
Type IV collagenase degrades the ECM in tumour spread

## canonical_key
neoplasia.ecm-degradation.type-iv-collagenase

## aliases
Type IV collagenase
ECM degradation by tumour cells

## arabic_label

## arabic_aliases

## definition
Malignant tumour cells secrete type IV collagenase, a matrix metalloproteinase that degrades type IV collagen, the main structural protein of the basement membrane, as one of the key enzymatic steps that lets them breach the basement membrane and invade surrounding tissue -- distinct from elastase (which degrades elastin), lipase (which hydrolyses fat) or amylase (which digests starch), none of which targets this collagen type.

## explicit_objective
State that tumour cells secrete type IV collagenase to degrade the basement membrane's extracellular matrix, enabling invasion.

## pitfalls
Confusing type IV collagenase with a general digestive enzyme such as elastase, lipase or amylase -- the printed key specifically names type IV collagenase for basement-membrane degradation in tumour invasion.

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
Neoplasia: Mechanisms of spread of malignant tumors

## subtopic
Extracellular matrix degradation

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-NEOPLASIA-SPREAD-MECHANISMS

## related_article_ids

## related_concept_ids

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Degradation of the ECM occurs by proteolytic enzymes secreted by tumour cells as: ... type IV collagenase" (Quiz 41 Q1).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 41 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "type IV collagenase" -- 0 hits. A grep sweep for "collagenase" across every docs/*-Source-Imports concept dir hit only bacterial-collagenase concepts (Ain Shams ASU-INF, Assiut AUN-INI-105, MUST FHB-102-2, Kasr 208-INT/101-ISK) -- unrelated to tumour-cell type IV collagenase. New concept.

---

# Item

## id
CON-FND-B8CF57D24CAAA0

## label
Malignant cells first appear in a lymph node's subcapsular sinus

## canonical_key
neoplasia.lymph-node-metastasis.subcapsular-sinus-first-site

## aliases
Subcapsular sinus metastasis
First site of nodal metastasis

## arabic_label

## arabic_aliases

## definition
Afferent lymphatics draining a tumour empty first into the subcapsular (marginal) sinus immediately beneath a lymph node's capsule, so malignant cells travelling via lymph are expected to be trapped and first detectable there, ahead of the medullary sinuses, the lymphoid follicles, the efferent vessel or the paracortex.

## explicit_objective
State that malignant cells reaching a lymph node via afferent lymphatics are expected to appear first in the subcapsular sinus.

## pitfalls
Assuming malignant cells first appear in the medullary sinuses, the follicles or the paracortex -- these lie deeper within or serve a different function from the subcapsular sinus, which is the first structure afferent lymph (and any tumour cells it carries) reaches.

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
Neoplasia: Mechanisms of spread of malignant tumors

## subtopic
Lymphatic spread and nodal metastasis

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-NEOPLASIA-SPREAD-MECHANISMS

## related_article_ids

## related_concept_ids

## resource_ids
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
0.5

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"In examining a lymph node microscopically for suspicion of metastasis, the malignant cells are expected to appear first in: ... the sub-capsular lymph sinuses" (Quiz 41 Q3).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 41 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "subcapsular sinus metastasis" -- 0 hits. A grep sweep for "subcapsular" hit only a Kasr 104-CPS normal lymph-node histology concept (cortex/medulla/paracortex zones and cell distribution, CON-HEM-60C0AFCC9A1F88) -- a different grain (normal histology, not the pathology of where metastatic cells first localise). New concept.

---

# Item

## id
CON-FND-93098A5E0650BC

## label
Cadherins glue normal cells to each other

## canonical_key
neoplasia.cell-adhesion.cadherins-glue-normal-cells

## aliases
Cadherins
Cell adhesion molecules

## arabic_label

## arabic_aliases

## definition
Cadherins are calcium-dependent transmembrane adhesion molecules that mediate cell-to-cell adhesion, holding normal cells together within a tissue and to their surroundings -- distinct from fibronectin and laminin (extracellular matrix glycoproteins) or type IV collagenase and cathepsin D (degradative enzymes), none of which is the general adhesion molecule the printed key names. Loss of cadherin function is one of the changes that allows malignant cells to detach and invade.

## explicit_objective
Identify cadherins as the adhesion molecules that glue normal cells to each other and to their surroundings.

## pitfalls
Confusing cadherins with a matrix glycoprotein (fibronectin, laminin) or a degradative enzyme (type IV collagenase, cathepsin D) -- the printed key specifically names cadherins as the general cell-to-cell adhesion molecule.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Neoplasia: Mechanisms of spread of malignant tumors

## subtopic
Cell adhesion molecules

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-NEOPLASIA-SPREAD-MECHANISMS

## related_article_ids

## related_concept_ids

## resource_ids
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
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Normal cells are glued to each other and to their surroundings by a variety of adhesion molecules as: ... cadherins." (Quiz 41 Q4).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 41 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "cadherins cell adhesion" -- 0 hits. A grep sweep for "cadherin" hit only a Helwan HU-GIT-301 concept about E-cadherin LOSS in diffuse gastric carcinoma -- a different grain (a specific cancer's cadherin loss, not this general normal-physiology adhesion fact). New concept.

---

# Item

## id
CON-FND-506895F21F8431

## label
Perineural invasion in malignant tumours causes pain

## canonical_key
neoplasia.perineural-invasion.pain

## aliases
Perineural invasion
Perineural spread

## arabic_label

## arabic_aliases

## definition
Perineural invasion, malignant cells tracking along the perineural (Schwann cell sheath) space surrounding a nerve, characteristically produces pain, since it irritates and compresses nerve fibres along the route of spread -- a distinct pattern of local extension from haemorrhage, mass formation or ulceration.

## explicit_objective
State that perineural invasion by a malignant tumour characteristically causes pain.

## pitfalls
Assuming perineural invasion characteristically produces haemorrhage, a mass effect or ulceration -- these are consequences of other tumour behaviours (bleeding, bulk, surface breach), not of nerve-sheath tracking specifically, whose hallmark symptom is pain.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Neoplasia: Mechanisms of spread of malignant tumors

## subtopic
Perineural invasion

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-NEOPLASIA-SPREAD-MECHANISMS

## related_article_ids

## related_concept_ids

## resource_ids
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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Perineural invasion in malignant tumors cause: ... Pain" (Quiz 41 Q5).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 41 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "perineural invasion pain" -- 0 hits. New concept.

---

# Item

## id
CON-FND-BFC4491084FD14

## label
Tumour-associated angiogenic factors drive tumour angiogenesis

## canonical_key
neoplasia.tumour-angiogenesis.taf

## aliases
Tumour angiogenesis
Tumour-associated angiogenic factors

## arabic_label

## arabic_aliases

## definition
Tumour angiogenesis, the formation of new blood vessels supplying a growing tumour, occurs under the influence of tumour-associated angiogenic factors (such as VEGF) secreted by the tumour cells themselves, which stimulate proliferation and sprouting of nearby endothelial cells -- distinct from matrix-degrading enzymes (collagenase, elastase), complement components or general inflammatory mediators such as TNF, none of which is the driver the printed key names.

## explicit_objective
State that tumour angiogenesis occurs under the influence of tumour-associated angiogenic factors secreted by the tumour.

## pitfalls
Attributing tumour angiogenesis to matrix-degrading enzymes, complement components or a general inflammatory mediator such as TNF -- the printed key specifically names tumour-associated angiogenic factors as the driver of new vessel formation around a tumour.

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
Neoplasia: Mechanisms of spread of malignant tumors

## subtopic
Tumour angiogenesis

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-NEOPLASIA-SPREAD-MECHANISMS

## related_article_ids

## related_concept_ids

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Tumour angiogenesis occurs under the influence of: ... tumour associated angiogenic factors" (Quiz 41 Q6).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 41 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "tumour angiogenic factors" -- 0 hits. A grep sweep for "angiogenesis|angiogenic" hit Helwan chronic-inflammation, Ain Shams glioblastoma-histology and Kasr granulation-tissue concepts -- none is this tumour-specific angiogenic-driver fact. New concept.

---

# Item

## id
CON-FND-1EA6F246BFB893

## label
Clindamycin carries a C difficile diarrhea risk to counsel on discharge

## canonical_key
antimicrobial.clindamycin.c-diff-diarrhea

## aliases
Clindamycin adverse effects
Clindamycin-associated C difficile

## arabic_label

## arabic_aliases

## definition
Clindamycin carries a well-recognised risk of Clostridium difficile diarrhea, including its severe form, pseudomembranous colitis, because it disrupts normal gut flora and allows C. difficile to overgrow -- a risk significant enough that any patient discharged on a multi-week clindamycin course should be specifically counselled about it, distinct from pseudotumor cerebri, hyperbilirubinemia or nephrotoxicity, none of which is clindamycin's characteristic adverse effect.

## explicit_objective
State that Clostridium difficile diarrhea is a clindamycin adverse effect that should be discussed with a patient discharged on a multi-week course.

## pitfalls
Attributing pseudotumor cerebri, hyperbilirubinemia or nephrotoxicity to clindamycin -- its characteristic, counselling-worthy risk is Clostridium difficile diarrhea/pseudomembranous colitis from gut flora disruption.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial therapy 1

## subtopic
Clindamycin adverse effects

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIMICROBIAL-THERAPY-1

## related_article_ids

## related_concept_ids

## resource_ids
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
0.7

## academic_relevance
0.4

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A patient is being discharged from the hospital on a 3-week course of clindamycin. Which of the following potential adverse effects should be discussed with her? ... Clostridium difficile diarrhea." (Quiz 42 Q1).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 42 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "clindamycin C diff diarrhea" -- 0 hits. A grep sweep for "clindamycin" hit only Assiut AUN-INI-105-ch5 (a general C. difficile/antibiotic-associated-diarrhea concept, not this clindamycin-specific drug association) and MUST FHB-102-2 -- different grain, not the same concept. New concept.

---

# Item

## id
CON-FND-FB8DF4269600C2

## label
Vancomycin is not a macrolide

## canonical_key
antimicrobial.vancomycin.not-a-macrolide

## aliases
Macrolide classification
Vancomycin classification

## arabic_label

## arabic_aliases

## definition
Vancomycin is a glycopeptide antibiotic that inhibits bacterial cell wall synthesis, not a macrolide -- azithromycin, erythromycin and clarithromycin are the true macrolides, sharing the class's characteristic 50S-ribosomal-subunit-binding mechanism, which vancomycin does not share.

## explicit_objective
Identify vancomycin as a glycopeptide, not a macrolide, distinguishing it from azithromycin, erythromycin and clarithromycin.

## pitfalls
Grouping vancomycin among the macrolides because it is another well-known antibiotic name -- vancomycin is a cell-wall-active glycopeptide, unrelated to the 50S-binding macrolide class.

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
Antimicrobial therapy 1

## subtopic
Macrolide classification

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIMICROBIAL-THERAPY-1

## related_article_ids

## related_concept_ids

## resource_ids
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
0.3

## academic_relevance
0.7

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"All of them belongs to macrolides EXCEPT: ... Vancomycin" (Quiz 42 Q2).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 42 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "vancomycin not a macrolide" -- 0 hits. A grep sweep for "erythromycin|vancomycin" hit a related but non-identical Assiut AUN-INI-105-ch5 concept classifying vancomycin among cell-wall-synthesis inhibitors generally (not this specific macrolide-exclusion framing). New concept.

---

# Item

## id
CON-FND-E80D82F5AB996F

## label
Aminoglycosides are mainly effective against aerobic, not anaerobic, gram-negative bacteria

## canonical_key
antimicrobial.aminoglycosides.aerobic-gram-negative-only

## aliases
Aminoglycoside spectrum
Aminoglycoside oxygen-dependent uptake

## arabic_label

## arabic_aliases

## definition
Aminoglycosides require oxygen-dependent active transport to cross the bacterial cell membrane and reach their ribosomal target, so they are mainly effective against aerobic, not anaerobic, gram-negative bacteria, since anaerobic organisms lack the oxidative transport process aminoglycoside uptake depends on -- alongside their other class features (concentration-dependent killing, synergism with beta-lactams, and renal dose adjustment by creatinine clearance).

## explicit_objective
State that aminoglycosides are mainly effective against aerobic, not anaerobic, gram-negative bacteria, because their uptake requires oxygen-dependent active transport.

## pitfalls
Assuming aminoglycosides are mainly effective against anaerobic gram-negative bacteria -- their oxygen-dependent uptake mechanism instead limits them to aerobic organisms.

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
Antimicrobial therapy 1

## subtopic
Aminoglycoside spectrum and dosing

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIMICROBIAL-THERAPY-1

## related_article_ids

## related_concept_ids

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Concerning Aminoglycosides, the following are true except: ... They are mainly effective in anaerobic gram negative bacteria" (Quiz 42 Q3).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 42 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "aminoglycosides aerobic gram negative" -- 0 hits. A grep sweep for "aminoglycoside" hit a related but distinct Assiut AUN-INI-105-ch5 mechanism concept (30S binding/mRNA misreading, reused separately for q352) -- this spectrum/oxygen-dependence fact is a different grain. New concept.

---

# Item

## id
CON-FND-AC1BF871C1B2B5

## label
Macrolides are 50S-subunit inhibitors that are bacteriostatic

## canonical_key
antimicrobial.macrolides.50s-bacteriostatic

## aliases
Macrolide mechanism
Macrolide ribosomal target

## arabic_label

## arabic_aliases

## definition
Macrolides (erythromycin, azithromycin, clarithromycin) bind the bacterial ribosome's 50S subunit, blocking translocation during protein synthesis, and this inhibition is bacteriostatic rather than bactericidal -- distinguishing macrolides from 30S-targeting classes (aminoglycosides, tetracyclines) and from bactericidal protein synthesis inhibitors.

## explicit_objective
State that macrolides are 50S-ribosomal-subunit-targeting, bacteriostatic protein synthesis inhibitors.

## pitfalls
Assuming macrolides target the 30S subunit or are bactericidal -- they bind the 50S subunit and are bacteriostatic, the opposite pairing from aminoglycosides (30S, bactericidal).

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
Antimicrobial therapy 1

## subtopic
Macrolide mechanism

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIMICROBIAL-THERAPY-1

## related_article_ids

## related_concept_ids

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Macrolids are -------- ribosomal subunit inhibitors that are ---------. ... 50s; Bacteriostatic" (Quiz 42 Q4).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 42 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "macrolides 50S bacteriostatic" -- 0 hits. A grep sweep of Assiut AUN-INI-105-ch5 for "50S|macrolide" found only the chloramphenicol-50S concept (reused for q351) and a cephalosporin cell-wall-vs-protein-synthesis classification concept -- neither is this macrolide-specific mechanism/effect pairing. New concept.

---

# Item

## id
CON-FND-7DB1D6CF02F3C6

## label
Erythromycin is used safely in pregnancy

## canonical_key
antimicrobial.erythromycin.safe-in-pregnancy

## aliases
Antibiotic safety in pregnancy
Erythromycin pregnancy safety

## arabic_label

## arabic_aliases

## definition
Erythromycin is generally considered safe for use in pregnancy, a standard alternative when a pregnant patient needs antimicrobial treatment but cannot receive drug classes carrying recognised fetal risk -- unlike doxycycline (fetal teeth discolouration and bone growth disturbance), moxifloxacin (risk to developing cartilage) or gentamicin (fetal ototoxicity/nephrotoxicity).

## explicit_objective
Identify erythromycin as safe to use in pregnancy, unlike doxycycline, moxifloxacin or gentamicin.

## pitfalls
Assuming any broad-spectrum antibiotic is acceptable in pregnancy -- doxycycline, moxifloxacin and gentamicin each carry a specific recognised fetal risk that erythromycin does not share.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial therapy 1

## subtopic
Antibiotic safety in pregnancy

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIMICROBIAL-THERAPY-1

## related_article_ids

## related_concept_ids

## resource_ids
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
0.7

## academic_relevance
0.4

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following is used safely in pregnancy? ... Erythromycin" (Quiz 42 Q5).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 42 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "erythromycin safe in pregnancy" -- 0 hits. New concept.

---

# Item

## id
CON-FND-DAFCB3028F7BE6

## label
Clindamycin and erythromycin antagonise each other at a shared ribosomal site

## canonical_key
antimicrobial.clindamycin-erythromycin.same-site-antagonism

## aliases
Antibiotic combination antagonism
Clindamycin-macrolide antagonism

## arabic_label

## arabic_aliases

## definition
Clindamycin and erythromycin both bind overlapping sites on the bacterial ribosome's 50S subunit, so combining them is antagonistic -- one drug can displace or block the other's binding, reducing the combination's net antibacterial effect compared with either drug given alone, unlike ciprofloxacin/amoxicillin, tigecycline/azithromycin or doxycycline/amoxicillin, none of which shares this same-site antagonism.

## explicit_objective
State that clindamycin and erythromycin are antagonistic when combined, since both bind an overlapping site on the bacterial 50S ribosomal subunit.

## pitfalls
Assuming any two protein-synthesis-inhibiting antibiotics are safely combined -- clindamycin and erythromycin specifically compete for an overlapping 50S binding site, making their combination antagonistic rather than additive.

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
Antimicrobial therapy 1

## subtopic
Antibiotic combination antagonism

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIMICROBIAL-THERAPY-1

## related_article_ids

## related_concept_ids

## resource_ids
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
0.6

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following antibiotic combinations is inappropriate based on antagonism at the same site of action? ... Clindamycin and erythromycin." (Quiz 42 Q6).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 42 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "clindamycin erythromycin antagonism" -- 0 hits. New concept.

---

# Item

## id
CON-FND-6798FF8F210C05

## label
Prostatic carcinoma produces osteosclerotic bone metastases

## canonical_key
neoplasia.bone-metastasis.osteosclerotic-prostate

## aliases
Osteosclerotic bone metastasis
Prostatic carcinoma bone metastasis pattern

## arabic_label

## arabic_aliases

## definition
Prostatic carcinoma characteristically produces osteosclerotic (osteoblastic) bone metastases, in which new bone formation dominates over resorption, giving a dense, radio-opaque appearance on imaging -- distinguishing it from the classically osteolytic bone metastasis pattern of renal cell carcinoma, thyroid carcinoma and bronchogenic (lung) carcinoma, and from breast carcinoma's typically mixed lytic/sclerotic pattern.

## explicit_objective
Identify prostatic carcinoma as the tumour whose bone metastases are characteristically osteosclerotic.

## pitfalls
Assuming all bone metastases are osteolytic, or attributing the osteosclerotic pattern to renal, thyroid, lung or breast carcinoma -- prostatic carcinoma is the tumour specifically associated with a predominantly osteosclerotic bone metastasis pattern.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Neoplasia: Routes of spread of malignant tumors

## subtopic
Bone metastasis patterns

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-BONE-METASTASIS-PATTERN

## related_article_ids

## related_concept_ids

## resource_ids
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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which one of these tumours metastasizing in bone is osteosclerotic: ... prostatic carcinoma" (Quiz 43 Q6).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 43 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "osteosclerotic bone metastasis prostate" -- 0 hits. A grep sweep for "osteosclerotic|osteoblastic" hit only unrelated Alexandria (alkaline phosphatase/osteoblast histology) and Menoufia (vitamin D bone mineralization) concepts -- different grain, not this tumour-specific metastasis-pattern fact. New concept.

---

# Item

## id
CON-FND-F551D7B7A61AB9

## label
Sulfasalazine treats inflammatory bowel disease

## canonical_key
antimicrobial.sulfasalazine.ibd-indication

## aliases
Sulfasalazine indication
Sulfasalazine for IBD

## arabic_label

## arabic_aliases

## definition
Sulfasalazine is a standard treatment for inflammatory bowel disease, particularly ulcerative colitis, since gut bacteria cleave it into 5-aminosalicylic acid, which acts locally in the colon to reduce mucosal inflammation -- distinct from its role in pseudomembranous colitis, H. pylori infection or E. coli diarrhea, none of which it is a standard treatment for.

## explicit_objective
State that sulfasalazine is used to treat inflammatory bowel disease, not pseudomembranous colitis, H. pylori infection or E. coli diarrhea.

## pitfalls
Assuming a gastroenterology patient on sulfasalazine is being treated for an infectious diarrheal illness -- sulfasalazine's standard indication is inflammatory bowel disease, not an infectious cause.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial therapy 2

## subtopic
Sulfasalazine indication

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIMICROBIAL-THERAPY-2

## related_article_ids

## related_concept_ids

## resource_ids
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
0.4

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A patient admitted to the gastroenterology service is being treated with sulfasalazine. What is the most likely purpose for this drug to be given? ... Inflammatory bowel disease" (Quiz 44 Q1).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 44 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "sulfasalazine inflammatory bowel disease" -- 0 hits. A grep sweep for "sulfasalazine" hit a Mansoura MANS-MSS-202 concept about sulfasalazine's prodrug mechanism/DMARD role in rheumatoid arthritis -- a different grain (mechanism, not this IBD-indication fact). New concept.

---

# Item

## id
CON-FND-BD49F8DB0D8F05

## label
Sulfamethoxazole can cause crystalluria

## canonical_key
antimicrobial.sulfamethoxazole.crystalluria

## aliases
Sulfonamide crystalluria
Sulfamethoxazole adverse effects

## arabic_label

## arabic_aliases

## definition
Sulfamethoxazole and other sulfonamides can precipitate out in acidic urine to form crystals in the renal tubules, a recognised adverse effect called crystalluria, reducible by adequate hydration and urine alkalinisation -- distinct from penicillin, doxycycline or gentamicin, none of which characteristically causes this specific adverse effect.

## explicit_objective
State that sulfamethoxazole can cause crystalluria, unlike penicillin, doxycycline or gentamicin.

## pitfalls
Attributing crystalluria to penicillin, doxycycline or gentamicin -- sulfonamides such as sulfamethoxazole are the class specifically associated with this adverse effect.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial therapy 2

## subtopic
Sulfonamide adverse effects

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIMICROBIAL-THERAPY-2

## related_article_ids

## related_concept_ids

## resource_ids
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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which antibiotic produces crystalluria? ... Sulfamethoxazole" (Quiz 44 Q3).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 44 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "sulfamethoxazole crystalluria" -- 0 hits. New concept.

---

# Item

## id
CON-FND-FB5065BAC15156

## label
Pseudomembranous colitis may be treated with either vancomycin or metronidazole

## canonical_key
antimicrobial.pseudomembranous-colitis.vancomycin-metronidazole-treatment

## aliases
Pseudomembranous colitis treatment
C difficile colitis treatment

## arabic_label

## arabic_aliases

## definition
Pseudomembranous colitis, typically caused by Clostridioides difficile overgrowth after gut flora disruption, may be treated with either oral vancomycin or metronidazole, both standard options depending on severity and local practice -- unlike clindamycin, which is not a treatment for this condition but is instead one of the antibiotics classically implicated in causing it.

## explicit_objective
State that pseudomembranous colitis may be treated with either oral vancomycin or metronidazole, not clindamycin.

## pitfalls
Confusing clindamycin's role as a cause of pseudomembranous colitis with a treatment for it -- the standard treatments are oral vancomycin or metronidazole.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial therapy 2

## subtopic
Pseudomembranous colitis treatment

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIMICROBIAL-THERAPY-2

## related_article_ids

## related_concept_ids

## resource_ids
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
0.7

## academic_relevance
0.4

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Pseudomembranous colitis may be treated with: ... Both Vancomycin and Metronidazole" (Quiz 44 Q4).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 44 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "pseudomembranous colitis vancomycin metronidazole treatment" -- 0 hits. New concept.

---

# Item

## id
CON-FND-F9417E8EE7E655

## label
Tendonitis is a side effect of ciprofloxacin

## canonical_key
antimicrobial.ciprofloxacin.tendonitis

## aliases
Fluoroquinolone tendonitis
Ciprofloxacin adverse effects

## arabic_label

## arabic_aliases

## definition
Tendonitis, and in more severe cases tendon rupture (especially of the Achilles tendon), is a recognised, characteristic adverse effect of ciprofloxacin and other fluoroquinolones, thought to relate to the drug class's effect on collagen and connective tissue -- a risk heightened in older patients and those on concurrent corticosteroids, distinct from teeth discolouration (tetracyclines) or ototoxicity (aminoglycosides).

## explicit_objective
State that tendonitis is a characteristic ciprofloxacin adverse effect, unlike teeth discolouration or ototoxicity.

## pitfalls
Attributing teeth discolouration or ototoxicity to ciprofloxacin -- these belong to tetracyclines and aminoglycosides respectively; ciprofloxacin's characteristic risk is tendonitis/tendon rupture.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Antimicrobial therapy 2

## subtopic
Fluoroquinolone adverse effects

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIMICROBIAL-THERAPY-2

## related_article_ids

## related_concept_ids

## resource_ids
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
0.4

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following is a side effect of ciprofloxacin? ... Tendonitis" (Quiz 44 Q5).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 44 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "ciprofloxacin tendonitis" -- 0 hits. A grep sweep for "tendonitis" hit only an unrelated Zagazig orthopaedic Achilles-tendon-rupture concept -- different grain, not this fluoroquinolone drug-adverse-effect fact. New concept.

---

# Item

## id
CON-FND-D3D567B1858979

## label
Chronic UV exposure is the most important risk factor for this fair-skinned man's skin cancer

## canonical_key
carcinogen.physical.uv-exposure-skin-cancer

## aliases
UV exposure skin cancer
Physical carcinogens

## arabic_label

## arabic_aliases

## definition
Chronic exposure to ultraviolet (UV) rays is the most important risk factor for skin cancer, especially in fair-skinned individuals whose lower melanin content gives less natural photoprotection, distinct from inherited Rb gene mutation (retinoblastoma/sarcoma risk), asbestos exposure (mesothelioma/lung cancer risk) or cigarette smoking (lung/bladder cancer risk), none of which is the most important risk factor for a fair-skinned patient's sun-exposed skin lesion.

## explicit_objective
Identify chronic UV exposure as the most important risk factor for skin cancer in a fair-skinned patient.

## pitfalls
Attributing a fair-skinned patient's sun-exposed skin cancer to inherited Rb mutation, asbestos or smoking -- chronic UV exposure is the risk factor the printed key names as most important.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Etiology of cancers and laboratory diagnosis

## subtopic
Physical carcinogens

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CANCER-ETIOLOGY-DIAGNOSIS

## related_article_ids

## related_concept_ids

## resource_ids
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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A 42 years old fair skin man has a skin nodule on the right hand... Which of the following risk factor is most important for development of this tumor? ... Chronic exposure to UV rays" (Quiz 45 Q1).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 45 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "UV exposure skin cancer" -- 0 hits. A grep sweep for "ultraviolet|UV ray|UV exposure|UV radiation" found no existing concept anywhere in docs/*-Source-Imports. New concept.

---

# Item

## id
CON-FND-81533C95FE69F4

## label
Corticosteroids are not a chemical carcinogen

## canonical_key
carcinogen.chemical.corticosteroids-not-a-chemical-carcinogen

## aliases
Chemical carcinogens list
Corticosteroids not carcinogenic

## arabic_label

## arabic_aliases

## definition
Corticosteroids are not classed among the chemical carcinogens -- they are anti-inflammatory/immunosuppressive hormonal agents -- unlike azo compounds, polycyclic aromatic hydrocarbons and asbestos, which are genuine named chemical carcinogens in the department's teaching.

## explicit_objective
State that corticosteroids are not a chemical carcinogen, unlike azo compounds, polycyclic hydrocarbons or asbestos.

## pitfalls
Assuming corticosteroids belong on a chemical-carcinogen list simply because they are a well-known drug class -- the department's named chemical carcinogens are azo compounds, polycyclic hydrocarbons, asbestos, vinyl chloride, arsenic and aflatoxins, not corticosteroids.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Etiology of cancers and laboratory diagnosis

## subtopic
Chemical carcinogens

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CANCER-ETIOLOGY-DIAGNOSIS

## related_article_ids

## related_concept_ids

## resource_ids
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
0.3

## academic_relevance
0.6

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Chemical carcinogens include all EXCEPT: ... Corticosteroids" (Quiz 45 Q2).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 45 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "chemical carcinogens corticosteroids" -- 0 hits. A grep sweep for "chemical carcinogen" hit only the reused Kasr aflatoxin concept (which lists the full named-carcinogen set but is framed around aflatoxin specifically, not this EXCEPT/corticosteroid-exclusion framing) and an Assiut AUN-INI-105-ch7 aflatoxin/mycotoxicosis concept -- different grain. New concept.

---

# Item

## id
CON-FND-0C1014ADF53736

## label
H pylori infection is involved in the development of gastric lymphoma

## canonical_key
carcinogen.bacterial.h-pylori-gastric-lymphoma

## aliases
H pylori carcinogenesis
Gastric MALT lymphoma

## arabic_label

## arabic_aliases

## definition
Chronic Helicobacter pylori infection is implicated in the development of gastric lymphoma, particularly MALT (mucosa-associated lymphoid tissue) lymphoma, through sustained antigenic stimulation of gastric lymphoid tissue, as well as gastric adenocarcinoma via chronic gastritis -- distinct from brain tumours, metastasis in general or colon carcinoma, none of which H. pylori is characteristically linked to.

## explicit_objective
State that H. pylori infection is implicated in the development of gastric lymphoma.

## pitfalls
Attributing H. pylori's carcinogenic association to brain tumours or colon carcinoma -- its established link is to gastric lymphoma (and gastric adenocarcinoma).

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
Etiology of cancers and laboratory diagnosis

## subtopic
Bacterial carcinogenesis

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CANCER-ETIOLOGY-DIAGNOSIS

## related_article_ids

## related_concept_ids

## resource_ids
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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"H pylori infection is involved in development of: ... Gastric lymphoma" (Quiz 45 Q6).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 45 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "H pylori gastric lymphoma" -- 0 hits. New concept.

---

# Item

## id
CON-FND-8B1A909A2138C4

## label
Human papilloma virus is associated with cervical cancer

## canonical_key
carcinogen.viral.hpv-cervical-cancer

## aliases
HPV cervical cancer
Viral carcinogenesis

## arabic_label

## arabic_aliases

## definition
Human papilloma virus (HPV), particularly high-risk strains such as HPV-16 and HPV-18, is strongly associated with cervical cancer, through viral oncoprotein inactivation of tumour suppressor gene products -- one of the best-established virus-cancer associations, distinct from endometrial, colorectal or breast cancer, none of which HPV characteristically causes.

## explicit_objective
State that human papilloma virus is associated with cervical cancer.

## pitfalls
Attributing HPV's carcinogenic association to endometrial, colorectal or breast cancer -- its best-established link is to cervical cancer.

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
Etiology of cancers and laboratory diagnosis

## subtopic
Viral carcinogenesis

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CANCER-ETIOLOGY-DIAGNOSIS

## related_article_ids

## related_concept_ids

## resource_ids
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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Human papilloma virus is associated with: ... Cervical cancer" (Quiz 45 Q7).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 45 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "HPV cervical cancer" -- 0 hits. A grep sweep for "human papilloma|HPV" filtered to files also mentioning "cervical" hit only the reused Kasr EBV/oncogenic-viruses concept (which mentions HPV/cervical carcinoma in passing while its explicit_objective is EBV-focused) -- a different grain, not this HPV-specific fact. New concept.

---

# Item

## id
CON-FND-E7A5F2A0F170F0

## label
Breast cancer is not related to virus infection

## canonical_key
carcinogen.viral.breast-cancer-not-virus-related

## aliases
Non-viral cancers
Breast cancer etiology

## arabic_label

## arabic_aliases

## definition
Breast cancer is not classed as a virus-related malignancy in standard teaching, unlike Burkitt's lymphoma and nasopharyngeal cancer (both EBV-associated) or cervical cancer (HPV-associated), making it the one cancer among these options without an established viral carcinogenesis link.

## explicit_objective
State that breast cancer, unlike Burkitt's lymphoma, nasopharyngeal cancer or cervical cancer, is not classed as virus-related.

## pitfalls
Assuming every cancer in a virus-carcinogenesis question set has a viral association -- breast cancer is the standard teaching exception among malignancies commonly listed alongside EBV- and HPV-associated cancers.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Etiology of cancers and laboratory diagnosis

## subtopic
Viral carcinogenesis

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CANCER-ETIOLOGY-DIAGNOSIS

## related_article_ids

## related_concept_ids

## resource_ids
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
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The following cancer is NOT related to virus Infection: ... Breast cancer" (Quiz 45 Q8).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 45 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "breast cancer not related to virus" -- 0 hits. New concept.

---

# Item

## id
CON-FND-D429C114778FFB

## label
Hepatitis C virus is the most important carcinogenic virus in Egypt

## canonical_key
carcinogen.viral.hcv-most-important-in-egypt

## aliases
HCV Egypt carcinogenesis
Most important carcinogenic virus Egypt

## arabic_label

## arabic_aliases

## definition
Hepatitis C virus (HCV) is taught as the most important carcinogenic virus in Egypt, reflecting the country's historically very high HCV prevalence and its strong association with chronic liver disease progressing to hepatocellular carcinoma -- a local-epidemiology teaching point distinct from HPV, HIV or EBV, each carcinogenic in its own right but not named as most important for this population.

## explicit_objective
State that hepatitis C virus is taught as the most important carcinogenic virus in Egypt.

## pitfalls
Naming HPV, HIV or EBV instead of HCV for this Egypt-specific "most important carcinogenic virus" question -- each is carcinogenic in its own right, but HCV is the one the printed key names as most important in this population.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Etiology of cancers and laboratory diagnosis

## subtopic
Viral carcinogenesis in Egypt

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-CANCER-ETIOLOGY-DIAGNOSIS

## related_article_ids

## related_concept_ids

## resource_ids
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
0.7

## academic_relevance
0.4

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The most important carcinogenic virus in Egypt is: ... Hepatitis C virus" (Quiz 45 Q9).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 45 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "most important carcinogenic virus Egypt" and "hepatitis C egypt" -- 0 hits. New concept.

---

# Item

## id
CON-FND-7167065941596E

## label
Mild-to-moderate intestinal amebiasis is treated with metronidazole plus diloxanide furoate

## canonical_key
antiparasitic.metronidazole-diloxanide-furoate.mild-moderate-intestinal-amebiasis

## aliases
Amebiasis treatment
Metronidazole plus diloxanide furoate

## arabic_label

## arabic_aliases

## definition
For mild-to-moderate symptomatic intestinal amebiasis, the preferred treatment combines metronidazole, a tissue amebicide treating the invasive trophozoite infection causing symptoms, with diloxanide furoate, a luminal agent that eradicates any remaining intestinal cysts once the tissue infection is treated -- unlike either drug given alone, which leaves either the tissue infection or the luminal cyst reservoir untreated.

## explicit_objective
State that mild-to-moderate symptomatic intestinal amebiasis is treated with metronidazole plus diloxanide furoate together.

## pitfalls
Treating symptomatic intestinal amebiasis with a single agent (metronidazole alone or diloxanide furoate alone) -- the combination is needed to clear both the active tissue infection and the luminal cyst reservoir.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Commonly used Antiviral, antihelmentics, antiprotozoal 1

## subtopic
Amebiasis treatment

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIPARASITIC-ANTIMALARIAL-1

## related_article_ids

## related_concept_ids

## resource_ids
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
0.7

## academic_relevance
0.4

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A male patient presents with lower abdominal discomfort, flatulence, and occasional diarrhea... The preferred treatment that he should have received for the initial symptoms (which were indicative of mild-to moderate disease) is ... Metronidazole plus diloxanide furoate" (Quiz 46 Q1).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 46 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "metronidazole diloxanide furoate mild amebiasis" -- 0 hits. A grep sweep for "amebiasis|amoebiasis|entamoeba|diloxanide" hit only lifecycle/diagnosis/transmission concepts (Helwan HU-GIT-301, 6 October O6U-IMP-106) -- none is this drug-treatment fact. New concept.

---

# Item

## id
CON-FND-9B0280F43F7BC7

## label
Hydatid disease does not respond to praziquantel

## canonical_key
antiparasitic.praziquantel.not-effective-hydatid-disease

## aliases
Praziquantel spectrum
Hydatid disease treatment exception

## arabic_label

## arabic_aliases

## definition
Hydatid disease, caused by the larval (cyst) stage of Echinococcus granulosus, does not respond reliably to praziquantel -- albendazole (often with surgical or percutaneous cyst management) is the standard treatment instead, an important exception since praziquantel is broadly effective against most other trematode and cestode infections, including paragonimiasis, pork tapeworm (Taenia solium) infection and schistosomiasis.

## explicit_objective
State that hydatid disease does not respond to praziquantel, unlike paragonimiasis, pork tapeworm infection or schistosomiasis.

## pitfalls
Assuming praziquantel's broad anti-trematode/cestode spectrum extends to hydatid disease -- Echinococcus granulosus cyst disease is a standard teaching exception, treated with albendazole instead.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Commonly used Antiviral, antihelmentics, antiprotozoal 1

## subtopic
Praziquantel spectrum

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIPARASITIC-ANTIMALARIAL-1

## related_article_ids

## related_concept_ids

## resource_ids
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
0.4

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which helminthic infection does not respond to treatment with praziquantel? ... Hydatid disease" (Quiz 46 Q2).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 46 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "praziquantel hydatid" -- 0 hits. A grep sweep for "praziquantel|hydatid" hit Helwan HU-GIT-301 concepts about praziquantel treating OTHER organisms (Diphyllobothrium, Heterophyes) and its Fasciola exception, plus hydatid biology (host/site/transmission) concepts -- none states this specific hydatid-treatment-failure fact. New concept.

---

# Item

## id
CON-FND-90BF44437DE710

## label
Diloxanide furoate treats asymptomatic E histolytica cyst carriage

## canonical_key
antiparasitic.diloxanide-furoate.asymptomatic-amebiasis-carriage

## aliases
Asymptomatic amebiasis treatment
Diloxanide furoate luminal role

## arabic_label

## arabic_aliases

## definition
Diloxanide furoate is a luminal amebicide used to treat the asymptomatic colonization (cyst-passer) state of Entamoeba histolytica after acute infection has resolved, clearing the intestinal lumen of cysts and preventing relapse or transmission -- distinct from metronidazole (a tissue amebicide for active invasive infection), chloroquine (an antimalarial) or primaquine (an antimalarial targeting liver hypnozoites).

## explicit_objective
State that diloxanide furoate is used to treat the asymptomatic luminal cyst-carriage state of E. histolytica after acute infection.

## pitfalls
Assuming metronidazole alone clears the luminal cyst-carriage state -- diloxanide furoate is the luminal agent specifically indicated for this asymptomatic colonization stage.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Commonly used Antiviral, antihelmentics, antiprotozoal 1

## subtopic
Amebiasis treatment

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIPARASITIC-ANTIMALARIAL-1

## related_article_ids

## related_concept_ids

## resource_ids
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
0.4

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"After the acute infection, which of the following medications is given to treat the asymptomatic colonization state of E. histolytica? ... Diloxanide furoate" (Quiz 46 Q3).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 46 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "diloxanide furoate asymptomatic amebiasis" -- 0 hits. New concept.

---

# Item

## id
CON-FND-795A6173AED93F

## label
Chloroquine treats acute P vivax attacks but does not eradicate exoerythrocytic forms

## canonical_key
antimalarial.chloroquine.blood-stage-not-exoerythrocytic

## aliases
Chloroquine antimalarial mechanism
Chloroquine vs primaquine roles

## arabic_label

## arabic_aliases

## definition
Chloroquine is the standard oral treatment for the acute attack of P. vivax malaria, acting on blood-stage (erythrocytic) parasites to resolve the acute illness, but it does not eradicate exoerythrocytic (dormant liver hypnozoite) forms -- so chloroquine treatment for P. vivax must be followed by primaquine, which specifically targets hypnozoites, to prevent relapse.

## explicit_objective
State that chloroquine treats the acute blood-stage attack of P. vivax malaria but does not eradicate exoerythrocytic (liver hypnozoite) forms.

## pitfalls
Assuming chloroquine alone cures P. vivax malaria -- it clears blood-stage parasites but leaves liver hypnozoites intact, requiring primaquine to prevent relapse.

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
Commonly used Antiviral, antihelmentics, antiprotozoal 1

## subtopic
Antimalarial pharmacology

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIPARASITIC-ANTIMALARIAL-1

## related_article_ids

## related_concept_ids

## resource_ids
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
0.7

## academic_relevance
0.4

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which drug should be used for oral treatment of the acute attack of P vivax malaria but does not eradicate exoerythrocytic forms of the parasite? ... Chloroquine" (Quiz 46 Q4).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 46 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "chloroquine blood stage not exoerythrocytic" -- 0 hits. A grep sweep for "chloroquine|mefloquine|malarone|atovaquone" hit only unrelated pharmacokinetics (own lane's Vd concept, q109-area) and rheumatology/dermatology hits -- none is this antimalarial mechanism fact. New concept.

---

# Item

## id
CON-FND-41B4A47B42B7E2

## label
Severe extraintestinal amebiasis is treated with tinidazole plus diloxanide furoate

## canonical_key
antiparasitic.tinidazole-diloxanide-furoate.severe-extraintestinal-amebiasis

## aliases
Amebic liver abscess treatment
Tinidazole plus diloxanide furoate

## arabic_label

## arabic_aliases

## definition
Severe extraintestinal amebiasis (such as amebic liver abscess) is effectively treated with tinidazole, a tissue amebicide related to metronidazole, combined with diloxanide furoate to eradicate any residual luminal cysts once the tissue infection is controlled -- the same tissue-agent-plus-luminal-agent pairing principle used for intestinal disease, adapted here for tinidazole's efficacy against extraintestinal (tissue) infection.

## explicit_objective
State that severe extraintestinal amebiasis is effectively treated with tinidazole plus diloxanide furoate.

## pitfalls
Treating severe extraintestinal amebiasis with a luminal-agent-only regimen, or with chloroquine alone -- the effective regimen pairs a tissue amebicide (tinidazole) with a luminal agent (diloxanide furoate).

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Commonly used Antiviral, antihelmentics, antiprotozoal 1

## subtopic
Amebiasis treatment

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIPARASITIC-ANTIMALARIAL-1

## related_article_ids

## related_concept_ids

## resource_ids
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
0.4

## weight_confidence
0.5

## confidence
0.7

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The drug regimen most likely to be effective in treating severe extraintestinal disease in this patient is: ... Tinidazole plus diloxanide furoate" (Quiz 46 Q5).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
This question's stem ('in this patient') implies a shared vignette with Q1 (q383) that the source PDF does not print in full -- the mild-to-moderate and severe-extraintestinal scenarios are treated here as two related but distinct teaching points rather than assumed to describe literally the same patient's disease progression.

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
sourceCandidateIds: find-existing.mjs searched "tinidazole diloxanide furoate severe extraintestinal amebiasis" -- 0 hits. New concept.

---

# Item

## id
CON-FND-757C35AF7B7008

## label
Malarone manages multidrug-resistant P falciparum in endemic areas

## canonical_key
antimalarial.malarone.multidrug-resistant-falciparum

## aliases
Atovaquone-proguanil
Malarone for resistant falciparum

## arabic_label

## arabic_aliases

## definition
Malarone (atovaquone-proguanil) is efficiently used in the management of multidrug-resistant P. falciparum malaria in endemic areas, combining atovaquone's action on the parasite's mitochondrial electron transport chain with proguanil's antifolate activity for a synergistic effect against resistant strains -- distinct from chloroquine (ineffective against resistant strains), doxycycline (an adjunct/prophylactic agent) or primaquine (targeting liver hypnozoites and gametocytes, not blood-stage resistant infection).

## explicit_objective
State that Malarone (atovaquone-proguanil) is efficiently used to manage multidrug-resistant P. falciparum in endemic areas.

## pitfalls
Naming chloroquine, doxycycline or primaquine instead of Malarone for managing multidrug-resistant P. falciparum -- Malarone's combined mitochondrial/antifolate mechanism is what the printed key specifically identifies here.

## concept_type
clinical_feature

## status
under review

## support_mode
direct_statement

## subject
pharm

## primary_node_id

## secondary_node_ids

## topic
Commonly used Antiviral, antihelmentics, antiprotozoal 1

## subtopic
Antimalarial pharmacology

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIPARASITIC-ANTIMALARIAL-1

## related_article_ids

## related_concept_ids

## resource_ids
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
0.4

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which ONE of the following drugs is efficiently used in management of multidrug-resistant plasmodium falciparum in endemic area? ... Malarone (Atovaquone-Proguanil)" (Quiz 46 Q6).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 46 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "malarone multidrug resistant falciparum" -- 0 hits. New concept.

---

# Item

## id
CON-FND-B745FB1C1BCD83

## label
Mefloquine prophylaxis can still fail against P vivax relapse

## canonical_key
antimalarial.mefloquine.prophylaxis-failure-p-vivax

## aliases
Mefloquine prophylaxis
P vivax relapse despite prophylaxis

## arabic_label

## arabic_aliases

## definition
Mefloquine is an effective prophylactic choice in chloroquine-resistant P. falciparum regions, but like chloroquine it acts only on blood-stage parasites and does not eradicate P. vivax's dormant liver hypnozoites -- so a traveller on mefloquine prophylaxis can still develop a P. vivax attack from hypnozoite reactivation, since mefloquine provides no protection against this relapse mechanism.

## explicit_objective
State that mefloquine prophylaxis does not prevent P. vivax relapse from liver hypnozoite reactivation, since it acts only on blood-stage parasites.

## pitfalls
Assuming mefloquine prophylaxis fully protects against all malaria species -- it protects against blood-stage infection (including chloroquine-resistant P. falciparum) but not against P. vivax relapse from liver hypnozoites, which require primaquine to eradicate.

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
Commonly used Antiviral, antihelmentics, antiprotozoal 1

## subtopic
Antimalarial prophylaxis

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIPARASITIC-ANTIMALARIAL-1

## related_article_ids

## related_concept_ids

## resource_ids
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
0.7

## academic_relevance
0.4

## weight_confidence
0.5

## confidence
0.75

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A traveler in a geographical region where chloroquine-resistant P falciparum is endemic used a drug for prophylaxis but nevertheless developed a severe attack of P vivax malaria. The drug used for prophylaxis was probably: ... Mefloquine" (Quiz 46 Q7).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 46 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "mefloquine prophylaxis failure P vivax" -- 0 hits. This same clinical fact is tested separately (unauthored) in this lane's final-exam source pool (a different PDF, out of this cluster's scope) -- no concept exists there yet either, so no cross-pool reuse applies. New concept.

---

# Item

## id
CON-FND-323905D76583CF

## label
Papilloma is the benign epithelial tumour of non-glandular surfaces

## canonical_key
neoplasia.papilloma.benign-non-glandular-epithelial-tumour

## aliases
Papilloma classification
Papillary projections

## arabic_label

## arabic_aliases

## definition
Papilloma is the benign epithelial cell neoplasm derived from non-glandular surfaces (such as skin or mucosal squamous epithelium), characteristically growing as multiple finger-like (papillary) projections outward from the epithelial surface -- distinguishing it from adenoma (the benign tumour of glandular epithelium), the malignant epithelial/mesenchymal options (squamous cell carcinoma, sarcoma, lymphoma), fibroma (a benign mesenchymal, not epithelial, tumour) and hamartoma (a developmental malformation rather than a true neoplasm).

## explicit_objective
Identify papilloma as the benign epithelial tumour arising from non-glandular surfaces, characterised grossly by multiple finger-like projections.

## pitfalls
Confusing papilloma with adenoma (glandular origin), a malignant epithelial or mesenchymal tumour, fibroma (mesenchymal) or hamartoma (a malformation, not a neoplasm) -- papilloma is specifically the benign, non-glandular, papillary-projection epithelial tumour.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Benign epithelial tumors classification and examples

## subtopic
Papilloma classification

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-BENIGN-EPITHELIAL-TUMORS

## related_article_ids

## related_concept_ids

## resource_ids
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
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A benign epithelial cell neoplasm derived from non-glandular surfaces is referred to as: ... Papilloma" (Quiz 47 Q1/Q2). "Which of the following is a benign tumor of the epithelium characterized by multiple finger like projections? ... Papilloma" (Quiz 47 Q5).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 47 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "papilloma non-glandular benign epithelial tumor" -- 0 hits. A grep sweep for "papilloma.*benign|adenoma.*benign|benign.*papilloma|benign.*adenoma" hit only this lane's own unrelated angioma-capsulation concept -- no duplicate. New concept, collapsing Q1/Q2 (literal duplicate, options reordered) and Q5 (same tumour type's morphology angle) onto one record.

---

# Item

## id
CON-FND-F9DB9176CB94DF

## label
Adenoma is the benign tumour of glandular epithelium

## canonical_key
neoplasia.adenoma.benign-glandular-tumour

## aliases
Adenoma classification
Benign glandular tumour

## arabic_label

## arabic_aliases

## definition
Adenoma is the term for a benign tumour of glandular epithelial origin, forming gland-like or duct-like structures resembling the tissue it arises from -- distinguishing it from papilloma (the benign tumour of non-glandular surfaces), carcinoma (a malignant epithelial tumour), a Krukenberg tumour (a specific metastatic, not primary benign, ovarian tumour) and the general behavioural descriptor "malignant."

## explicit_objective
Identify adenoma as the benign tumour of glandular epithelial origin.

## pitfalls
Confusing adenoma with papilloma (non-glandular origin), carcinoma (malignant), a Krukenberg tumour (a specific metastatic ovarian tumour) or the general term "malignant" -- adenoma is specifically the benign, glandular-origin epithelial tumour.

## concept_type
classification

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Benign epithelial tumors classification and examples

## subtopic
Adenoma classification

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-BENIGN-EPITHELIAL-TUMORS

## related_article_ids

## related_concept_ids

## resource_ids
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
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"If a tumor is benign and glandular in origin, what is it called? ... Adenoma" (Quiz 47 Q3/Q4).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for Lecture 47 in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
sourceCandidateIds: find-existing.mjs searched "adenoma benign glandular tumor" -- 0 hits. New concept, collapsing Q3/Q4 (literal duplicate, options reordered) onto one record.


---

# Item

## id
CON-FND-B587A4B064622E

## label
Acyclovir is the drug used to inhibit herpes viruses

## canonical_key
pharmacology.acyclovir.herpes-virus-inhibition

## aliases
Acyclovir mechanism

## arabic_label

## arabic_aliases

## definition
Acyclovir is a guanosine nucleoside analogue selectively phosphorylated by the herpesvirus-encoded thymidine kinase, then converted by host kinases to acyclovir triphosphate, which inhibits viral DNA polymerase and terminates the growing viral DNA chain. This selective activation only in herpesvirus-infected cells makes acyclovir the prototypical drug to inhibit herpes simplex and varicella-zoster viruses, with a wide safety margin in uninfected cells.

## explicit_objective
Identify acyclovir as the drug used to inhibit herpesviruses, and state its selective, virus-dependent activation mechanism.

## pitfalls
Confusing acyclovir's herpesvirus-specific activation (via viral thymidine kinase) with a drug active against a different virus family, such as azidothymidine (HIV), oseltamivir (influenza) or amantadine (influenza).

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Commonly used Antiviral – antihelmentics – antiprotozoal 2

## subtopic
Acyclovir mechanism and indication

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIVIRAL-THERAPY-2

## related_article_ids

## related_concept_ids

## resource_ids

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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which ONE of the following drugs Is used to inhibit herpes viruses? ... The correct answer is: Acyclovir" (Quiz 48 Q1).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-68C76DBB7B9D0B

## label
Valacyclovir is the oral prodrug of acyclovir used for recurrent genital herpes

## canonical_key
pharmacology.valacyclovir.oral-genital-herpes-maintenance

## aliases
Valacyclovir indication

## arabic_label

## arabic_aliases

## definition
Valacyclovir is the oral prodrug of acyclovir, rapidly converted to acyclovir after absorption with substantially greater oral bioavailability than acyclovir itself. It is the standard oral drug for episodic or suppressive treatment of recurrent genital herpes in an otherwise healthy patient, including one who is breastfeeding.

## explicit_objective
Identify valacyclovir as the oral prodrug of acyclovir used for recurrent genital herpes management.

## pitfalls
Reaching for an intravenous reserve drug (foscarnet), an HIV drug (ritonavir) or an anti-influenza drug (amantadine) instead of valacyclovir for routine oral herpes management in an otherwise healthy patient.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Commonly used Antiviral – antihelmentics – antiprotozoal 2

## subtopic
Valacyclovir as oral therapy for recurrent genital herpes

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIVIRAL-THERAPY-2

## related_article_ids

## related_concept_ids
CON-FND-B587A4B064622E

## resource_ids

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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"...Previously, she responded to a drug used topically...Which drug to be used orally is most likely to be prescribed at this time? ... The correct answer is: Valacyclovir" (Quiz 48 Q2).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-3E2557E509C765

## label
Ganciclovir is the drug for CMV retinitis prophylaxis and herpetic infection suppression

## canonical_key
pharmacology.ganciclovir.cmv-retinitis-treatment

## aliases
Ganciclovir indication

## arabic_label

## arabic_aliases

## definition
Ganciclovir is an acyclovir analogue with added activity against cytomegalovirus (CMV). After phosphorylation, first by a CMV-encoded kinase and then by host kinases, it inhibits viral DNA polymerase in both herpesviruses and CMV, making it the drug of choice for suppressing herpetic infections and for CMV retinitis prophylaxis in immunocompromised patients.

## explicit_objective
Identify ganciclovir as the drug for CMV retinitis prophylaxis and herpetic infection suppression.

## pitfalls
Reaching for an HIV protease inhibitor (indinavir), an antifungal (fluconazole) or an antimycobacterial (rifabutin) instead of ganciclovir for CMV cover.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Commonly used Antiviral – antihelmentics – antiprotozoal 2

## subtopic
Ganciclovir for CMV retinitis and herpes suppression

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIVIRAL-THERAPY-2

## related_article_ids

## related_concept_ids
CON-FND-B587A4B064622E

## resource_ids

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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The drug most likely to suppress herpetic infections and provide prophylaxis against CMV retinitis in this patient is ... The correct answer is: Gancyclovir" (Quiz 48 Q3).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-E69563689BFCA4

## label
Vidarabine is not indicated for HCV eradication

## canonical_key
pharmacology.hcv-therapy.vidarabine-not-indicated

## aliases
HCV eradication drugs

## arabic_label

## arabic_aliases

## definition
Hepatitis C virus (HCV) eradication regimens use direct-acting antivirals such as sofosbuvir (an NS5B polymerase inhibitor), interferon-alpha and ribavirin. Vidarabine, an older nucleoside analogue historically used against herpesviruses and other DNA viruses, plays no role in HCV eradication, which targets the hepatitis C RNA virus through mechanisms vidarabine does not address.

## explicit_objective
Recognise vidarabine as not indicated for hepatitis C virus eradication, unlike sofosbuvir, interferon-alpha and ribavirin.

## pitfalls
Assuming any older antiviral nucleoside analogue (such as vidarabine) is effective against HCV, rather than recognising that modern HCV therapy uses a specific, different drug set.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Commonly used Antiviral – antihelmentics – antiprotozoal 2

## subtopic
HCV eradication drugs versus vidarabine

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIVIRAL-THERAPY-2

## related_article_ids

## related_concept_ids

## resource_ids

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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"All the following agents can be used effectively in eradication of HCV EXCEPT: ... The correct answer is: Vidarabine" (Quiz 48 Q4).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-6F6B6A97CE0F07

## label
Lamivudine is not effective against influenza virus

## canonical_key
pharmacology.influenza-antivirals.amantadine-oseltamivir-vs-lamivudine

## aliases
Anti-influenza drugs

## arabic_label

## arabic_aliases

## definition
Amantadine, rimantadine (M2 ion-channel blockers) and oseltamivir (a neuraminidase inhibitor) are effective for influenza virus eradication. Lamivudine is a nucleoside reverse transcriptase inhibitor used against HIV and hepatitis B virus; it has no activity against the influenza uncoating or neuraminidase steps that the anti-influenza drugs target, so it is not effective against influenza.

## explicit_objective
Recognise lamivudine as not indicated for influenza eradication, unlike amantadine, rimantadine and oseltamivir.

## pitfalls
Assuming any antiviral nucleoside analogue (such as lamivudine, an anti-HIV/HBV drug) is broadly active against influenza.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Commonly used Antiviral – antihelmentics – antiprotozoal 2

## subtopic
Anti-influenza drugs versus lamivudine

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIVIRAL-THERAPY-2

## related_article_ids

## related_concept_ids

## resource_ids

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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"All the following agents can be used effectively in eradication of influenza virus EXCEPT: ... The correct answer is: Lamivudine" (Quiz 48 Q5).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-2EBF581321D607

## label
Oseltamivir eradicates influenza through neuraminidase inhibition

## canonical_key
pharmacology.oseltamivir.neuraminidase-inhibition

## aliases
Oseltamivir mechanism

## arabic_label

## arabic_aliases

## definition
Oseltamivir is a neuraminidase inhibitor. By blocking the viral neuraminidase enzyme, it prevents newly formed influenza virions, including H1N1, from being released from the surface of infected cells, halting the spread of infection to new cells.

## explicit_objective
State that oseltamivir eradicates influenza virus through neuraminidase inhibition.

## pitfalls
Confusing oseltamivir's neuraminidase-inhibition mechanism (blocking viral release) with the M2-channel-blocking mechanism of amantadine/rimantadine (blocking viral uncoating).

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Commonly used Antiviral – antihelmentics – antiprotozoal 2

## subtopic
Oseltamivir mechanism of action

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIVIRAL-THERAPY-2

## related_article_ids

## related_concept_ids
CON-FND-6F6B6A97CE0F07

## resource_ids

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
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Oseltamivir can eradicate H1N1 influenza virus through: ... The correct answer is: Inhibition of the viral neuraminidase enzyme" (Quiz 48 Q6).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-6807A797456DE2

## label
Interferon is not used for CMV retinitis remission

## canonical_key
pharmacology.interferon.clinical-uses-excludes-cmv

## aliases
Interferon clinical uses

## arabic_label

## arabic_aliases

## definition
Interferon-alpha is used for refractory genital warts (condylomata acuminata), for hepatitis C virus infection combined with ribavirin, and for chronic hepatitis B virus infection. It is not used for CMV retinitis remission, a role instead filled by ganciclovir (and alternatives such as foscarnet or cidofovir), which act on CMV DNA polymerase by a mechanism interferons do not share.

## explicit_objective
Recognise CMV retinitis remission as not an interferon indication, unlike genital warts, HCV and chronic HBV.

## pitfalls
Assuming interferon's broad antiviral reputation extends to CMV retinitis, when that specific indication belongs to ganciclovir instead.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Commonly used Antiviral – antihelmentics – antiprotozoal 2

## subtopic
Interferon clinical uses excluding CMV retinitis

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTIVIRAL-THERAPY-2

## related_article_ids

## related_concept_ids
CON-FND-3E2557E509C765

## resource_ids

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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Interferons are protective glycoproteins that can be used effectively in management all of the following, EXCEPT: ... The correct answer is: Remission of CMV retinitis" (Quiz 48 Q7).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-9FCD284318A2A1

## label
Recurrent hematuria with atypical urine cytology and an ulcerated bladder mass indicates carcinoma

## canonical_key
neoplasia.carcinoma.hematuria-cystoscopy-recognition

## aliases
Bladder carcinoma clinical recognition

## arabic_label

## arabic_aliases

## definition
An ulcerated, infiltrating bladder mass causing recurrent hematuria, with atypical (malignant-appearing) cells on urine cytology, is the classic clinical and cytological picture of carcinoma -- most commonly transitional cell carcinoma of the bladder in an older adult. The ulceration itself, a feature of unrestrained invasive growth destroying the overlying epithelium, points to malignancy rather than a benign process such as adenoma or papilloma.

## explicit_objective
Recognise a bladder carcinoma from recurrent hematuria, atypical urine cytology and an ulcerated cystoscopic mass.

## pitfalls
Mistaking a benign epithelial process (adenoma, papilloma) or a mesenchymal tumour (sarcoma) for the malignant epithelial pattern this vignette describes.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Malignant epithelial tumors classification and examples

## subtopic
Clinical recognition of carcinoma from hematuria and cytology

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-MALIGNANT-EPITHELIAL-TUMORS

## related_article_ids

## related_concept_ids

## resource_ids

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
0.7

## academic_relevance
0.4

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A 62 years male patient has hematuria for many times in past week...Which of the following is best describe the lesion ... The correct answer is: Carcinoma" (Quiz 49 Q1).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-493ABE0143A7CD

## label
Adenocarcinoma is the malignant tumour of glandular epithelium

## canonical_key
neoplasia.adenocarcinoma.malignant-glandular-tumor

## aliases
Adenocarcinoma definition
Malignant glandular tumour naming

## arabic_label

## arabic_aliases

## definition
Adenocarcinoma is the malignant tumour of glandular epithelium -- the malignant counterpart of adenoma. It shows the invasive, destructive growth and cytological atypia of a malignant tumour while still forming, to varying degrees, gland-like or duct-like structures reflecting its glandular origin. When a malignant tumour arises from glandular cells, it is named adenocarcinoma as a general nomenclature rule.

## explicit_objective
Define adenocarcinoma as the malignant tumour of glandular epithelium, and state the general naming rule it exemplifies.

## pitfalls
Confusing adenocarcinoma (malignant, glandular) with adenoma (benign, glandular), a hamartoma (a malformation, not a true neoplasm), or with sarcoma (the malignant tumour naming for epithelial, not mesenchymal, origin is carcinoma, not sarcoma).

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Malignant epithelial tumors classification and examples

## subtopic
Adenocarcinoma as malignant glandular tumour

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-MALIGNANT-EPITHELIAL-TUMORS

## related_article_ids

## related_concept_ids

## resource_ids

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
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Adenocarcinoma is a: ... The correct answer is: Malignant tumors of glands" (Quiz 49 Q2); "Malignant tumours are: ... The correct answer is: When arising from glandular cells are called adenocarcinoma" (Quiz 51 Q12).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-ED5F7732D5D514

## label
Grade I, stage I designations together mean well-differentiated and localized

## canonical_key
neoplasia.grading-staging.grade1-stage1-interpretation

## aliases
Tumour grade versus stage

## arabic_label

## arabic_aliases

## definition
Histological grade (I of IV) reflects how closely tumour cells resemble their tissue of origin; grade I means well-differentiated, generally slower-growing tissue. Clinical stage (I) reflects the anatomical extent of spread; stage I means the tumour is localized, without regional or distant spread. Together, grade I and stage I describe a well-differentiated, localized neoplasm, two independent axes of tumour description rather than two measures of the same thing.

## explicit_objective
Interpret a grade I, stage I neoplasm as well-differentiated and localized, distinguishing the grade axis from the stage axis.

## pitfalls
Treating grade and stage as interchangeable, or assuming a low grade/stage means the tumour is not malignant at all rather than malignant-but-favourable on both axes.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Malignant epithelial tumors classification and examples

## subtopic
Interpreting tumour grade and stage together

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-MALIGNANT-EPITHELIAL-TUMORS

## related_article_ids

## related_concept_ids

## resource_ids

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
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"...diagnosed as grade I on a scale of I to IV. Clinically, some of the patients...found to have stage I disease...best interpretation... The correct answer is: Well-differentiated and localized" (Quiz 49 Q4).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-A8B048ADB67ED2

## label
Signet ring carcinoma is a subtype of glandular carcinoma

## canonical_key
neoplasia.signet-ring-carcinoma.glandular-subtype

## aliases
Signet ring carcinoma classification

## arabic_label

## arabic_aliases

## definition
Signet ring carcinoma is a variant of glandular carcinoma (adenocarcinoma) in which tumour cells accumulate intracytoplasmic mucin that pushes the nucleus to the cell periphery, giving the characteristic signet-ring appearance under the microscope. It classically occurs in the stomach and is a subtype of adenocarcinoma, not of squamous, transitional or basal cell carcinoma.

## explicit_objective
Classify signet ring carcinoma as a subtype of glandular carcinoma (adenocarcinoma).

## pitfalls
Assigning signet ring carcinoma to a non-glandular carcinoma category (squamous, transitional, basal cell) instead of recognising its glandular, mucin-producing origin.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Malignant epithelial tumors classification and examples

## subtopic
Signet ring carcinoma as a glandular carcinoma subtype

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-MALIGNANT-EPITHELIAL-TUMORS

## related_article_ids

## related_concept_ids
CON-FND-493ABE0143A7CD

## resource_ids

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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Signet ring carcinoma is a type of: ... The correct answer is: Glandular carcinoma" (Quiz 49 Q5).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-EBC323671C0727

## label
Stroma separating individual cells distinguishes sarcoma from carcinoma

## canonical_key
neoplasia.sarcoma-vs-carcinoma.stroma-separates-cells

## aliases
Sarcoma versus carcinoma histology
Sarcoma not masses and sheets

## arabic_label

## arabic_aliases

## definition
Sarcoma cells, arising from mesenchymal tissue, are typically dispersed as individual cells within an abundant connective-tissue stroma that separates them from one another. Carcinoma cells, arising from epithelium, instead grow cohesively as masses, sheets, nests or glands held together by cell junctions, with the stroma forming a supporting framework around groups of cells rather than separating individual tumour cells. This stromal relationship to individual cells is the key histological feature distinguishing sarcoma from carcinoma, so growth as 'masses and sheets of malignant cells' specifically describes carcinoma, not sarcoma.

## explicit_objective
State that stroma separating individual cells is the key histologic feature distinguishing sarcoma from carcinoma, and that growth as masses/sheets is a carcinoma, not sarcoma, feature.

## pitfalls
Assuming sarcoma and carcinoma share the same cohesive-sheet growth pattern, rather than recognising sarcoma's individually-dispersed, stroma-separated cell pattern as the distinguishing histological feature.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Malignant epithelial tumors classification and examples

## subtopic
Sarcoma versus carcinoma stromal relationship

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-MALIGNANT-EPITHELIAL-TUMORS

## related_article_ids

## related_concept_ids

## resource_ids

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
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The most important histologic feature that differentiates sarcoma from carcinoma is ... The correct answer is: Stroma separates individual cells" (Quiz 49 Q8); "Sarcomas are NOT characterized by: ... The correct answer is: Made of masses and sheets of malignant cells" (Quiz 51 Q14).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-68374A6825E4A5

## label
An iron-oxygen-complexing chemotherapy drug causing DNA strand breaks and pulmonary toxicity acts in G2 phase

## canonical_key
pharmacology.doxorubicin.iron-oxygen-complex-g2-pulmonary-toxicity

## aliases
Bleomycin G2-phase action
Cell-cycle-specific chemotherapy G2

## arabic_label

## arabic_aliases

## definition
A chemotherapy drug that complexes with iron and oxygen to generate free radicals causing DNA strand breaks, and that carries dose-limiting pulmonary toxicity/fibrosis requiring close monitoring, matches bleomycin. Bleomycin is a cell-cycle-specific antitumour antibiotic classified as acting in the G2 phase of the cell cycle, where it blocks cells from progressing into mitosis.

## explicit_objective
Identify the G2-phase, iron-oxygen-complex, pulmonary-toxic chemotherapy drug (bleomycin) from its mechanism and toxicity.

## pitfalls
Misassigning this drug's cell-cycle phase to S phase (DNA synthesis, where the DNA-strand-break mechanism might seem to fit) instead of the G2 phase it is actually classified under.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Anticancer & Immunomodulator 1

## subtopic
Iron-oxygen-complex chemotherapy drug acting in G2 phase

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTICANCER-IMMUNOMODULATOR-1

## related_article_ids

## related_concept_ids

## resource_ids

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
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"A drug used in a chemotherapy regimen works by complexing with iron and oxygen to promote DNA strand breaks...pulmonary side effects. In what phase of the cell cycle does this drug work? ... The correct answer is: G2 phase" (Quiz 50 Q1).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-45B9EEC4348094

## label
Paclitaxel's cellular target is microtubules

## canonical_key
pharmacology.paclitaxel.microtubule-target

## aliases
Paclitaxel mechanism

## arabic_label

## arabic_aliases

## definition
Paclitaxel is a taxane that binds to and stabilises microtubules, preventing their normal depolymerisation. This locks the mitotic spindle in place and arrests dividing cells in mitosis, making microtubules paclitaxel's cellular target, distinct from the DNA, topoisomerase or tyrosine kinase targets of other anticancer drug classes.

## explicit_objective
Identify microtubules as the cellular target of paclitaxel.

## pitfalls
Confusing paclitaxel's microtubule-stabilising mechanism with a DNA-, topoisomerase- or tyrosine-kinase-targeting mechanism used by other anticancer drug classes.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Anticancer & Immunomodulator 1

## subtopic
Paclitaxel's microtubule target

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTICANCER-IMMUNOMODULATOR-1

## related_article_ids

## related_concept_ids

## resource_ids

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
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The cellular target of paclitaxel is: ... The correct answer is: Microtubules" (Quiz 50 Q2).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-CC1B00E7404289

## label
Cisplatin's major toxicity is nephrotoxicity, not bone marrow suppression

## canonical_key
pharmacology.cisplatin.nephrotoxicity-not-marrow-suppression

## aliases
Cisplatin toxicity profile

## arabic_label

## arabic_aliases

## definition
Cisplatin is distinctive among common cytotoxic chemotherapy drugs for causing significant nephrotoxicity (renal tubular damage) as its major dose-limiting side effect. This contrasts with most other cytotoxic agents, such as methotrexate, doxorubicin and vinblastine, whose dose-limiting toxicity is instead bone marrow suppression. Adequate hydration is used clinically to reduce cisplatin's renal toxicity.

## explicit_objective
Identify cisplatin as the chemotherapy drug whose major toxicity is nephrotoxicity rather than bone marrow suppression.

## pitfalls
Assuming all cytotoxic chemotherapy drugs share bone marrow suppression as their dose-limiting toxicity, missing cisplatin's distinctive nephrotoxicity profile.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Anticancer & Immunomodulator 1

## subtopic
Cisplatin nephrotoxicity versus marrow-suppressing chemotherapy drugs

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTICANCER-IMMUNOMODULATOR-1

## related_article_ids

## related_concept_ids

## resource_ids

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
0.7

## academic_relevance
0.4

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following medications has the major side effect of nephrotoxicity rather than bone marrow suppression? ... The correct answer is: Cisplatin" (Quiz 50 Q3).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-2EDA0E441849FB

## label
Methotrexate is a folic acid analog

## canonical_key
pharmacology.methotrexate.folic-acid-analog

## aliases
Methotrexate as folate analogue

## arabic_label

## arabic_aliases

## definition
Methotrexate is a folic acid (folate) analogue. It competitively inhibits dihydrofolate reductase, blocking the regeneration of tetrahydrofolate needed for purine and thymidylate synthesis, and so halting DNA synthesis in rapidly dividing cells -- distinct from the pyrimidine-analogue, topoisomerase-inhibitor and alkylating mechanisms of other anticancer drug classes.

## explicit_objective
Identify methotrexate as the anticancer drug that is a folic acid analog.

## pitfalls
Confusing methotrexate (a folate analogue) with fluorouracil (a pyrimidine analogue), a different antimetabolite class targeting a different pathway.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Anticancer & Immunomodulator 1

## subtopic
Methotrexate as a folic acid analog

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTICANCER-IMMUNOMODULATOR-1

## related_article_ids

## related_concept_ids

## resource_ids

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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following anticancer drugs is a folic acid analog? ... The correct answer is: Methotrexate" (Quiz 50 Q4).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-187067AB4F5030

## label
Cyclophosphamide is a cell-cycle non-specific alkylating agent

## canonical_key
pharmacology.cyclophosphamide.cell-cycle-nonspecific

## aliases
Cyclophosphamide as alkylating agent

## arabic_label

## arabic_aliases

## definition
Cyclophosphamide is an alkylating agent. Alkylating agents are cell-cycle non-specific: they can damage DNA, by cross-linking DNA strands, in cells at any phase of the cell cycle, including non-dividing cells at rest. This is unlike phase-restricted antimetabolites (e.g. methotrexate, S phase) and mitotic-spindle poisons (e.g. vinblastine, vincristine, M phase), which only act on actively cycling cells.

## explicit_objective
Identify cyclophosphamide as a cell-cycle non-specific anticancer agent, and contrast it with cell-cycle-specific classes.

## pitfalls
Assuming all anticancer drugs are cell-cycle specific, missing the distinct cell-cycle non-specific behaviour of alkylating agents such as cyclophosphamide.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Anticancer & Immunomodulator 1

## subtopic
Cyclophosphamide as a cell-cycle non-specific alkylating agent

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTICANCER-IMMUNOMODULATOR-1

## related_article_ids

## related_concept_ids

## resource_ids

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
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which of the following anticancer drugs is a cell cycle non specific agent? ... The correct answer is: Cyclophosphamide" (Quiz 50 Q5).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-FADD789D0EBD83

## label
Hemangioma is the benign, congenital vascular tumour presenting as a stable skin nodule

## canonical_key
neoplasia.hemangioma.benign-vascular-tumor

## aliases
Vascular birthmark

## arabic_label

## arabic_aliases

## definition
Haemangioma is a benign tumour of blood vessels, often congenital (a vascular birthmark), classically presenting as a small, reddish, raised skin nodule that is stable in size and colour over long-term follow-up. Its congenital onset and stability distinguish it from a malignant, acquired or progressively enlarging skin lesion such as melanoma, carcinoma or lymphoma.

## explicit_objective
Recognise a stable congenital reddish skin nodule as a haemangioma.

## pitfalls
Mistaking a stable, congenital vascular nodule for a malignant, acquired, progressively-changing lesion such as melanoma or carcinoma.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Mesenchymal tumors: benign and malignant and developmental tumors

## subtopic
Hemangioma as a benign congenital vascular tumour

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-MESENCHYMAL-TUMORS

## related_article_ids

## related_concept_ids

## resource_ids

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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"...0.3 cm reddish, slightly raised nodule...present since birth and has not appreciably changed...Which of the following neoplasms is this nodule most likely to be? ... The correct answer is: Haemangioma" (Quiz 51 Q1).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-98883162BD988A

## label
Lipoma is the benign, soft, stable subcutaneous fatty tumour

## canonical_key
neoplasia.lipoma.benign-fatty-tumor

## aliases
Benign fatty tumour

## arabic_label

## arabic_aliases

## definition
Lipoma is the benign tumour of mature adipose tissue -- the most common soft-tissue tumour overall, typically presenting as a soft, rounded, painless, slow-growing (or stable) subcutaneous mass with normal overlying skin, found incidentally and remaining stable over time.

## explicit_objective
Recognise a soft, painless, stable subcutaneous mass as a lipoma.

## pitfalls
Mistaking a stable, soft, benign subcutaneous mass for a malignant mesenchymal tumour (rhabdomyosarcoma), a pigmented lesion (melanoma) or metastatic disease.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Mesenchymal tumors: benign and malignant and developmental tumors

## subtopic
Lipoma as a benign, soft, stable subcutaneous fatty tumour

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-MESENCHYMAL-TUMORS

## related_article_ids

## related_concept_ids

## resource_ids

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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"...2 cm soft, rounded mass...no difficulty using the arm...no associated pain...does not change in size over the next year...Which of the following neoplasms is she most likely to have? ... The correct answer is: Lipoma" (Quiz 51 Q2).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-CB60542E06A0C6

## label
Teratoma is the tumour derived from all three germ cell layers

## canonical_key
neoplasia.teratoma.three-germ-layers

## aliases
Tumour of three germ layers
Dermoid cyst

## arabic_label

## arabic_aliases

## definition
Teratoma is the tumour derived from all three germ cell layers -- ectoderm, mesoderm and endoderm -- and can classically present as a cystic ovarian mass containing hair (ectoderm/skin appendages), squamous epithelium (ectoderm), glandular epithelium (endoderm) and cartilage or fibrous connective tissue (mesoderm). A mature teratoma, such as this dermoid cyst pattern, is benign; an immature teratoma, containing embryonic-appearing tissue, is malignant.

## explicit_objective
Identify teratoma as the tumour derived from all three germ cell layers, and recognise its classic mature-cystic (dermoid) ovarian presentation.

## pitfalls
Confusing teratoma (three germ layers) with a choristoma (normal tissue, ectopic site), a hamartoma (disorganised native tissue) or a single-lineage benign tumour (lymphoma, fibroma, myoma).

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Mesenchymal tumors: benign and malignant and developmental tumors

## subtopic
Teratoma as a tumour of all three germ layers

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-MESENCHYMAL-TUMORS

## related_article_ids

## related_concept_ids

## resource_ids

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
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"...cystic and filled with hair...squamous epithelium, tall columnar glandular epithelium, cartilage, and fibrous connective tissue...Which of the following neoplasms is she most likely to have? ... The correct answer is: Teratoma" (Quiz 51 Q3); "What is a benign tumor called that is derived from all 3 germ cell layer ... The correct answer is: Teratoma" (Quiz 51 Q16).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-3965F7DB0C47DC

## label
Leiomyoma is the benign, slow-growing uterine smooth-muscle tumour

## canonical_key
neoplasia.leiomyoma.benign-smooth-muscle-tumor

## aliases
Uterine fibroid

## arabic_label

## arabic_aliases

## definition
Leiomyoma, also called a uterine fibroid, is the benign tumour of uterine smooth muscle. It is extremely common, typically asymptomatic, firm, solid and well-circumscribed, and grows very slowly over years, in contrast to leiomyosarcoma, its faster-growing malignant counterpart.

## explicit_objective
Recognise a firm, solid, circumscribed, slow-growing uterine nodule as a leiomyoma.

## pitfalls
Mistaking a slow, multi-year-course uterine nodule for its faster-growing malignant counterpart, leiomyosarcoma, or for an unrelated tumour type such as hemangioma or adenocarcinoma.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Mesenchymal tumors: benign and malignant and developmental tumors

## subtopic
Leiomyoma as a benign, slow-growing uterine smooth-muscle tumour

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-MESENCHYMAL-TUMORS

## related_article_ids

## related_concept_ids

## resource_ids

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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"...firm nodule palpable on the dome of the uterus six years ago...slowly increased in size...solid and circumscribed...asymptomatic...Which of the following neoplasms is she most likely to have? ... The correct answer is: Leiomyoma" (Quiz 51 Q4).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-862BD1DA196ED8

## label
Chondroma is the benign tumour of cartilage

## canonical_key
neoplasia.chondroma.benign-cartilage-tumor

## aliases
Benign cartilage tumour

## arabic_label

## arabic_aliases

## definition
Chondroma is the benign tumour of cartilage, following the standard mesenchymal-tumour naming convention in which a benign tumour is named after its tissue of origin plus the suffix '-oma' -- here, cartilage.

## explicit_objective
Name chondroma as the benign tumour of cartilage.

## pitfalls
Mixing up the benign mesenchymal-tumour naming series -- lipoma (fat), chondroma (cartilage), osteoma (bone), leiomyoma (smooth muscle).

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Mesenchymal tumors: benign and malignant and developmental tumors

## subtopic
Chondroma as the benign cartilage tumour

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-MESENCHYMAL-TUMORS

## related_article_ids

## related_concept_ids

## resource_ids

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
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Benign tumor of cartilage is called an: ... The correct answer is: Chondroma" (Quiz 51 Q6).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-2D1A30B8748B78

## label
Osteoma is the benign tumour of osseous tissue

## canonical_key
neoplasia.osteoma.benign-bone-tumor

## aliases
Benign bone tumour

## arabic_label

## arabic_aliases

## definition
Osteoma is the benign tumour of osseous (bone) tissue, following the same mesenchymal-tumour naming convention as chondroma and lipoma -- tissue of origin plus '-oma', here bone.

## explicit_objective
Name osteoma as the benign tumour of osseous tissue.

## pitfalls
Mixing up the benign mesenchymal-tumour naming series -- lipoma (fat), chondroma (cartilage), osteoma (bone), leiomyoma (smooth muscle).

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Mesenchymal tumors: benign and malignant and developmental tumors

## subtopic
Osteoma as the benign osseous tumour

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-MESENCHYMAL-TUMORS

## related_article_ids

## related_concept_ids
CON-FND-862BD1DA196ED8

## resource_ids

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
0.2

## academic_relevance
0.8

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Benign tumor of osseous tissue is called an: ... The correct answer is: Osteoma" (Quiz 51 Q7).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-86066D9E19E79D

## label
Hamartoma is a mass of disorganised but mature native tissue

## canonical_key
neoplasia.hamartoma.definition

## aliases
Hamartoma definition
Hamartoma versus choristoma

## arabic_label

## arabic_aliases

## definition
A hamartoma is a mass of disorganised, but otherwise mature and histologically normal, cells and tissue elements indigenous (native) to the part of the body in which it occurs -- a developmental malformation of local tissue architecture rather than a true, clonal neoplasm. It is distinguished from a choristoma (normal tissue in an ectopic location), a germ-cell tumour (arising from totipotent cells) and a teratoma (differentiating towards more than one germ layer).

## explicit_objective
Define hamartoma as a mass of disorganised but mature, native tissue, distinguishing it from choristoma, germ-cell tumour and teratoma.

## pitfalls
Confusing hamartoma (native tissue, disorganised) with choristoma (normal tissue, wrong location), a germ-cell tumour (totipotent origin) or a teratoma (multiple germ layers).

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Mesenchymal tumors: benign and malignant and developmental tumors

## subtopic
Hamartoma definition versus choristoma, germ-cell tumour and teratoma

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-MESENCHYMAL-TUMORS

## related_article_ids

## related_concept_ids

## resource_ids

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
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Hamartoma refers to: ... The correct answer is: Mass of disorganised but mature cells indigenous to the part" (Quiz 51 Q10).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-F23FC5494D8DCA

## label
Haematoma is a non-neoplastic blood collection, not a benign tumour

## canonical_key
neoplasia.haematoma.not-a-neoplasm

## aliases
Haematoma is not a neoplasm

## arabic_label

## arabic_aliases

## definition
A haematoma is a localised collection of extravasated blood outside blood vessels, caused by bleeding into tissue -- a reactive, non-neoplastic process, not a true clonal neoplasm at all, despite the name's superficial resemblance to a tumour suffix. Genuine benign tumours among common exam options include papilloma, adenoma and fibroma.

## explicit_objective
Recognise haematoma as a non-neoplastic blood collection rather than a true benign tumour.

## pitfalls
Assuming any '-oma'-suffixed term (haematoma) denotes a true neoplasm, rather than recognising some are reactive, non-neoplastic processes.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Mesenchymal tumors: benign and malignant and developmental tumors

## subtopic
Haematoma as a non-neoplastic blood collection, not a benign tumour

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-MESENCHYMAL-TUMORS

## related_article_ids

## related_concept_ids

## resource_ids

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
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which is Not a benign tumour: ... The correct answer is: Haematoma" (Quiz 51 Q17).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-5B2B737D6DB265

## label
Cyclosporine inhibits calcineurin, blocking IL-2 gene transcription

## canonical_key
pharmacology.cyclosporine.calcineurin-inhibition-moa

## aliases
Cyclosporine mechanism of action
Calcineurin inhibitor

## arabic_label

## arabic_aliases

## definition
Cyclosporine binds cyclophilin, and the resulting complex inhibits calcineurin, a calcium/calmodulin-dependent phosphatase that normally dephosphorylates the transcription factor NFAT, allowing it to enter the nucleus and switch on interleukin-2 (IL-2) gene transcription. By inhibiting calcineurin, cyclosporine blocks IL-2 production and suppresses T-lymphocyte activation, the mechanism underlying its use in preventing transplant rejection.

## explicit_objective
State that cyclosporine acts by inhibiting calcineurin, blocking IL-2 gene transcription and T-cell activation.

## pitfalls
Confusing cyclosporine's calcineurin-inhibition mechanism with direct white-cell-division inhibition (antimetabolites) or direct IL-2-receptor blockade (basiliximab), or reversing it as calcineurin activation.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Anticancer & Immunomodulator 2

## subtopic
Cyclosporine mechanism of action -- calcineurin inhibition

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTICANCER-IMMUNOMODULATOR-2

## related_article_ids

## related_concept_ids

## resource_ids

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
0.6

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The mechanism of action of cyclosporine is: ... The correct answer is: Inhibition of calcineurin." (Quiz 52 Q1).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-20DB7ABACDC26F

## label
Gum hyperplasia is a cyclosporine side effect

## canonical_key
pharmacology.cyclosporine.gum-hyperplasia-side-effect

## aliases
Cyclosporine gingival hyperplasia

## arabic_label

## arabic_aliases

## definition
Gingival (gum) hyperplasia is a well-recognised side effect of cyclosporine, seen in a substantial proportion of patients on long-term therapy, managed with meticulous oral hygiene or, if severe, a dose change -- distinct from cyclosporine's other, separately-tested toxicities (hypertension, nephrotoxicity, hyperuricemia).

## explicit_objective
Identify gum (gingival) hyperplasia as a cyclosporine side effect.

## pitfalls
Confusing cyclosporine's gum hyperplasia with an unrelated side effect (hypotension, muscular paralysis, arthritis) that cyclosporine does not cause.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Anticancer & Immunomodulator 2

## subtopic
Cyclosporine's gum hyperplasia side effect

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTICANCER-IMMUNOMODULATOR-2

## related_article_ids

## related_concept_ids
CON-FND-5B2B737D6DB265

## resource_ids

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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Which side effect is related to cyclosporine? ... The correct answer is: Gum hyperplasia" (Quiz 52 Q2).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-B18369C13A43D5

## label
Cyclosporine toxicity profile does not include hypokalemia

## canonical_key
pharmacology.cyclosporine.toxicity-profile-excludes-hypokalemia

## aliases
Cyclosporine electrolyte toxicity

## arabic_label

## arabic_aliases

## definition
Cyclosporine can cause hyperuricemia (sometimes precipitating gout), nephrotoxicity (from direct renal vasoconstriction and tubular injury) and hypertension (related to its renal vasoconstrictive action). Its renal toxicity characteristically causes hyperkalemia, from reduced potassium excretion due to impaired renal tubular function, not hypokalemia -- the reverse electrolyte disturbance from what might otherwise be assumed.

## explicit_objective
Recognise hypokalemia as not a cyclosporine toxicity, unlike hyperuricemia, nephrotoxicity and hypertension.

## pitfalls
Assuming cyclosporine's renal toxicity lowers, rather than raises, serum potassium.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Anticancer & Immunomodulator 2

## subtopic
Cyclosporine toxicity profile excludes hypokalemia

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTICANCER-IMMUNOMODULATOR-2

## related_article_ids

## related_concept_ids
CON-FND-20DB7ABACDC26F

## resource_ids

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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Toxic effects of cyclosporine DON'T include: ... The correct answer is: Hypokalemia" (Quiz 52 Q3).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-F859D858AC6AF0

## label
Cyclosporine is metabolized mainly by CYP3A4

## canonical_key
pharmacology.cyclosporine.cyp3a4-metabolism

## aliases
Cyclosporine CYP3A4 metabolism

## arabic_label

## arabic_aliases

## definition
Cyclosporine is metabolised mainly by the cytochrome P450 3A4 (CYP3A4) enzyme, chiefly in the liver and intestinal wall. This makes cyclosporine highly susceptible to drug interactions with CYP3A4 inhibitors (which raise cyclosporine levels, risking toxicity) and CYP3A4 inducers (which lower cyclosporine levels, risking rejection), a clinically important prescribing consideration distinct from drugs metabolised by CYP2D6, CYP2C9 or CYP2C19.

## explicit_objective
State that cyclosporine is mainly metabolized by CYP3A4, and its drug-interaction implication.

## pitfalls
Assigning cyclosporine's metabolism to a different cytochrome P450 isoform (CYP2D6, CYP2C9, CYP2C19) associated with other drugs.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Anticancer & Immunomodulator 2

## subtopic
Cyclosporine's CYP3A4 metabolism

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTICANCER-IMMUNOMODULATOR-2

## related_article_ids

## related_concept_ids

## resource_ids

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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"Cyclosporine is metabolized mainly by: ... The correct answer is: CYP3A4" (Quiz 52 Q4).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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

---

# Item

## id
CON-FND-36AFF41F44E15B

## label
Cyclosporine is the drug of choice for preventing post-transplant rejection

## canonical_key
pharmacology.cyclosporine.transplant-rejection-drug-of-choice

## aliases
Cyclosporine transplant indication

## arabic_label

## arabic_aliases

## definition
Cyclosporine, a calcineurin inhibitor that blocks T-lymphocyte activation and IL-2 production, is the drug of choice for preventing post-transplant organ rejection. It typically forms the backbone of a combination immunosuppressive regimen alongside a glucocorticoid and an antimetabolite, rather than glucocorticoids or antibody-based agents being used alone as the primary rejection-prevention drug.

## explicit_objective
Identify cyclosporine as the drug of choice for preventing post-transplant rejection.

## pitfalls
Assuming glucocorticoids (an adjunct) or an antibody agent are the primary drug of choice for rejection prevention, rather than cyclosporine.

## concept_type
fact

## status
under review

## support_mode
direct_statement

## subject
fnd

## primary_node_id

## secondary_node_ids

## topic
Anticancer & Immunomodulator 2

## subtopic
Cyclosporine as the drug of choice for transplant rejection prevention

## microtopic

## nanotopic

## modules
AUN-MPT-104

## article_ids
ART-FND-AUN-MPT104-ANTICANCER-IMMUNOMODULATOR-2

## related_article_ids

## related_concept_ids
CON-FND-5B2B737D6DB265

## resource_ids

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
0.5

## weight_confidence
0.5

## confidence
0.8

## atomic_claim_ids

## resource_occurrence_ids

## source_candidate_ids

## original_wording
"The drug of choice for prevention of post-transplant rejection is ... The correct answer is: Cyclosporine" (Quiz 52 Q5).

## merge_ids

## rejected_merge_candidate_ids

## conflicts
No source disagreement found.

## uncertainty
No department lecture-deck source exists for this Lecture in the corpus -- the quiz bank's own printed-answer text is this concept's only available source.

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
