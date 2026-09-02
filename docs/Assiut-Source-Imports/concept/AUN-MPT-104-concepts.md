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
