import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const assessment = 'src_eda268c7a75eb1930662'
const neo1 = 'src_7ce8b4c740464632c3de'
const neo3 = 'src_a9ccc0b353dbbd7670cb'
const metastasisArticle = 'ART-HU-BMS102-PAT-METASTATIC-PATTERNS'
const stagingArticle = 'ART-HU-BMS102-PAT-STAGING-PROGNOSIS-TREATMENT'
const behaviourArticle = 'ART-HU-BMS102-PAT-TUMOUR-BEHAVIOUR'
const idFor = (key) => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const rows = [
  {
    ref: 'A11', key: 'pathology.metastasis.sarcoma-hematogenous-route', label: 'Sarcomas characteristically favour haematogenous metastasis', aliases: ['Blood-borne spread of sarcoma', 'Sarcoma metastatic route'],
    definition: 'Sarcomas are malignant mesenchymal neoplasms and classically disseminate through blood vessels. This route preference contrasts with the usual lymphatic dissemination of carcinomas, although neither rule is absolute.', objective: 'Identify sarcoma as the tumour class most likely to metastasise by the haematogenous route.', pitfalls: 'Applying the usual carcinoma lymphatic route to sarcoma, or treating papilloma as a metastatic malignant tumour.',
    type: 'mechanism', micro: 'Routes of metastasis', nano: 'Sarcoma haematogenous spread', article: metastasisArticle, source: neo3, teachPage: 13, teach: 'Sarcomas favour haematogenous spread, whereas lymphatic spread is the major pathway for carcinomas.',
    subject: 'Sarcomas', predicate: 'characteristically favour', object: 'haematogenous metastasis', display: 'Sarcomas characteristically favour haematogenous metastasis.', page: 3, pageLabel: 'p3', difficulty: 'Moderate', effort: 'Medium', reasoning: 1, inferred: 52,
    stem: 'Which of the following tumors is most likely to metastasize via the hematogenous route?', keyLetter: 'C', options: ['Squamous cell carcinoma', 'Adenocarcinoma', 'Sarcoma', 'Papilloma'], clue: 'the question asks which tumour class characteristically favours blood-borne dissemination',
    reasons: ['squamous-cell carcinoma is an epithelial malignancy and usually favours lymphatic spread', 'adenocarcinoma is a carcinoma and usually favours lymphatic spread even though blood-borne spread can occur', 'sarcomas characteristically favour haematogenous dissemination', 'papilloma is a benign epithelial tumour and does not characteristically metastasise'],
  },
  {
    ref: 'A20', key: 'pathology.pediatric.wilms-nephroblastoma', label: 'Wilms tumour is a paediatric nephroblastoma', aliases: ['Wilms nephroblastoma', 'Childhood renal embryonal tumour'],
    definition: 'Wilms tumour, or nephroblastoma, is an embryonal renal malignancy of childhood. It arises from nephrogenic precursor tissue and is classified as a paediatric nephroblastoma rather than a mature teratoma or neuroendocrine tumour.', objective: 'Classify Wilms tumour as a paediatric nephroblastoma.', pitfalls: 'Confusing a renal embryonal tumour with a mature teratoma, or choosing a broad mesenchymal label instead of nephroblastoma.',
    type: 'classification', micro: 'Paediatric neoplasia', nano: 'Wilms tumour', article: metastasisArticle,
    subject: 'Wilms tumour', predicate: 'is classified as', object: 'a paediatric nephroblastoma', display: 'Wilms tumour is classified as a paediatric nephroblastoma.', page: 5, pageLabel: 'p5', difficulty: 'Easy', effort: 'Low', reasoning: 1, inferred: 32,
    stem: "What type of neoplasm is a Wilm's tumor?", keyLetter: 'C', options: ['Neuroendocrine tumor', 'Mesenchymal tumor', 'Pediatric nephroblastoma', 'Mature teratoma'], clue: 'Wilms tumour is the named childhood renal embryonal malignancy',
    reasons: ['Wilms tumour is not a neuroendocrine neoplasm', 'a generic mesenchymal category is less specific than the recognised renal embryonal classification', 'paediatric nephroblastoma is the specific classification for Wilms tumour', 'a mature teratoma contains differentiated tissues from multiple germ layers and is not Wilms tumour'],
  },
  {
    ref: 'B12', key: 'pathology.metastasis.pancreatic-cancer-liver-site', label: 'The liver is a common metastatic site for pancreatic cancer', aliases: ['Pancreatic carcinoma liver metastasis', 'Hepatic spread of pancreatic cancer'],
    definition: 'Pancreatic carcinoma commonly metastasises to the liver through portal venous drainage and systemic dissemination. In a patient with a pancreatic mass, weight loss and jaundice, the liver is the most likely metastatic site among the listed options.', objective: 'Identify the liver as the most likely metastatic site for pancreatic cancer in the supplied option set.', pitfalls: 'Choosing a possible but less characteristic distant site while ignoring portal drainage to the liver.',
    type: 'risk association', micro: 'Metastatic patterns', nano: 'Pancreatic cancer and liver', article: metastasisArticle,
    subject: 'Pancreatic cancer', predicate: 'commonly metastasises to', object: 'the liver', display: 'Pancreatic cancer commonly metastasises to the liver.', page: 9, pageLabel: 'p9', difficulty: 'Moderate', effort: 'Medium', reasoning: 1, inferred: 53,
    stem: 'A 70-year-old man presents with weight loss and jaundice. Imaging shows a pancreatic mass. What is the most likely site of metastasis?', keyLetter: 'B', options: ['Bone', 'Liver', 'Lungs', 'Brain'], clue: 'the primary tumour is pancreatic and drains into the portal circulation',
    reasons: ['bone can receive metastases but is not the most likely site in this pancreatic-mass item', 'portal venous drainage makes the liver a characteristic metastatic site for pancreatic cancer', 'the lungs can receive systemic tumour emboli but are less likely than the liver here', 'brain metastasis is not the most likely site for the stated pancreatic primary'],
  },
  {
    ref: 'B13', key: 'pathology.metastasis.breast-primary-lytic-bone-lesion', label: 'A lytic bone metastasis in an older woman can originate from breast cancer', aliases: ['Breast primary with lytic bone metastasis', 'Skeletal metastasis from breast carcinoma'],
    definition: 'Breast carcinoma commonly spreads to bone and can produce destructive lytic skeletal lesions. A lytic lesion with hypercalcaemia in an older woman therefore supports breast cancer as the primary among the supplied options.', objective: 'Identify breast cancer as the most likely primary for the stated lytic bone metastasis pattern.', pitfalls: 'Treating hypercalcaemia as proof of a particular primary without integrating the skeletal metastatic pattern and option set.',
    type: 'diagnostic pattern', micro: 'Metastatic patterns', nano: 'Breast cancer and bone', article: metastasisArticle,
    subject: 'A lytic bone metastasis in an older woman', predicate: 'can indicate', object: 'a breast-cancer primary', display: 'A lytic bone metastasis in an older woman can indicate a breast-cancer primary.', page: 9, pageLabel: 'p9', difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 61,
    stem: 'A 65-year-old woman presents with a lytic bone lesion. Serum calcium is elevated. What is the most likely primary malignancy?', keyLetter: 'A', options: ['Breast cancer', 'Ovarian cancer', 'Colon cancer', 'Pancreatic cancer'], clue: 'the presentation is a destructive skeletal metastasis in an older woman',
    reasons: ['breast cancer commonly metastasises to bone and best fits the supplied pattern', 'ovarian cancer more characteristically spreads across peritoneal surfaces than presents as this lytic lesion', 'colon cancer commonly spreads to liver through portal drainage and is less characteristic here', 'pancreatic cancer commonly metastasises to liver and is less characteristic for this skeletal presentation'],
  },
  {
    ref: 'B14', key: 'pathology.metastasis.lung-adenocarcinoma-adrenal-site', label: 'The adrenal gland is a characteristic metastatic site for lung adenocarcinoma', aliases: ['Lung cancer adrenal metastasis', 'Pulmonary adenocarcinoma metastatic tropism'],
    definition: 'Lung carcinoma can disseminate haematogenously to many organs, including the adrenal glands. Adrenal metastasis is sufficiently characteristic that the adrenal gland is the keyed common site in this lung-adenocarcinoma option set.', objective: 'Identify the adrenal gland as the characteristic metastatic site for lung adenocarcinoma among the listed options.', pitfalls: 'Confusing a general list of common metastatic organs with the specific lung-to-adrenal association tested here.',
    type: 'risk association', micro: 'Metastatic patterns', nano: 'Lung cancer and adrenal gland', article: metastasisArticle, source: neo3, teachPage: 12, teach: 'The local metastasis lecture uses a primary lung tumour spreading to the adrenal glands as an example of organ tropism.',
    subject: 'Lung adenocarcinoma', predicate: 'commonly metastasises to', object: 'the adrenal gland', display: 'Lung adenocarcinoma commonly metastasises to the adrenal gland.', page: 9, pageLabel: 'p9', difficulty: 'Moderate', effort: 'Medium', reasoning: 1, inferred: 55,
    stem: 'A 58-year-old man is diagnosed with a lung adenocarcinoma. Which of the following is the most common site for metastasis?', keyLetter: 'D', options: ['Bone', 'Brain', 'Liver', 'Adrenal gland'], clue: 'the primary is a lung adenocarcinoma and the option set includes the characteristic adrenal site',
    reasons: ['bone is a common metastatic organ but is not the keyed most characteristic site in this option set', 'brain metastases can occur in lung cancer but are not the keyed answer here', 'liver metastases can occur but the source item selects the more characteristic adrenal association', 'the adrenal gland is a characteristic metastatic site for lung carcinoma'],
  },
  {
    ref: 'B17', key: 'pathology.staging.colon-muscularis-propria-t2n0m0', label: 'Colon tumour invasion into muscularis propria without nodes is T2N0M0', aliases: ['Colorectal T2N0M0 stage pattern', 'Muscularis propria invasion in colon TNM'],
    definition: 'In colorectal TNM staging, invasion into the muscularis propria is T2. Absence of regional lymph-node involvement is N0, and absence of distant metastasis is M0, producing T2N0M0.', objective: 'Assign T2N0M0 to a colonic tumour invading muscularis propria with no nodal involvement or distant metastasis.', pitfalls: 'Using tumour size rather than depth for the colorectal T category, or adding nodal or distant-stage components not present in the vignette.',
    type: 'classification', micro: 'Tumour staging', nano: 'Colorectal T2N0M0', article: stagingArticle, source: neo1, teachPage: 28, teach: 'Tumour staging estimates spread using primary-lesion extent, lymph-node involvement and distant metastasis in the TNM framework.',
    subject: 'A colon tumour invading muscularis propria without nodal or distant spread', predicate: 'is staged as', object: 'T2N0M0', display: 'A colon tumour invading muscularis propria without nodal or distant spread is staged as T2N0M0.', page: 10, pageLabel: 'p10', difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 66,
    stem: 'A biopsy of a colonic tumor reveals invasion into the muscularis propria but no lymph node involvement. What is the likely TNM stage?', keyLetter: 'B', options: ['T1N0M0', 'T2N0M0', 'T3N1M0', 'T4N1M1'], clue: 'muscularis propria invasion defines T2 and the vignette states no lymph-node involvement',
    reasons: ['T1 indicates invasion limited to submucosa and is too shallow for muscularis propria involvement', 'T2N0M0 matches muscularis propria invasion without nodal or distant spread', 'T3N1M0 would require extension beyond muscularis propria and nodal involvement', 'T4N1M1 would require advanced local invasion, nodes and distant metastasis not described'],
  },
  {
    ref: 'B18', key: 'pathology.breast.erpr-positive-her2-negative-surgery-hormonal-therapy', label: 'Node-negative ER/PR-positive, HER2-negative breast cancer is treated with surgery and hormonal therapy in this source context', aliases: ['Hormone-receptor-positive breast treatment', 'ER/PR-positive breast cancer treatment selection'],
    definition: 'Hormone-receptor-positive breast cancer is eligible for endocrine therapy, while localised operable disease is managed surgically. In the supplied node-negative, ER/PR-positive and HER2-negative vignette, surgery plus hormonal therapy is the keyed approach.', objective: 'Select surgery and hormonal therapy for the supplied localised hormone-receptor-positive breast-cancer profile.', pitfalls: 'Ignoring receptor status when choosing systemic treatment, or selecting a single modality when the keyed plan combines local and endocrine management.',
    type: 'management principle', micro: 'Treatment selection', nano: 'Hormone-receptor-positive breast cancer', article: stagingArticle,
    subject: 'Node-negative ER/PR-positive, HER2-negative breast cancer', predicate: 'is managed here with', object: 'surgery and hormonal therapy', display: 'Node-negative ER/PR-positive, HER2-negative breast cancer is managed here with surgery and hormonal therapy.', page: 10, pageLabel: 'p10', difficulty: 'Hard', effort: 'High', reasoning: 2, inferred: 72,
    stem: 'A 67-year-old woman is diagnosed with breast cancer. The tumor is 2.5 cm, ER/PR-positive, HER2-negative, with no lymph node involvement. What is the best treatment approach?', keyLetter: 'A', options: ['Surgery and hormonal therapy', 'Chemotherapy only', 'Radiation therapy only', 'Immunotherapy'], clue: 'the tumour is operable, node-negative and hormone-receptor positive',
    reasons: ['surgery treats the localised tumour and endocrine therapy targets its hormone-receptor dependence', 'chemotherapy alone omits definitive local treatment and does not use the stated receptor information', 'radiotherapy alone does not provide the combined local and receptor-directed strategy selected here', 'immunotherapy is not the keyed approach for this localised ER/PR-positive, HER2-negative profile'],
  },
  {
    ref: 'C06', reuseId: 'CON-FND-C6BA00615E296B', article: stagingArticle, existingArticle: behaviourArticle,
    display: 'Tumour grade is principally based on the degree of differentiation.', claim: 'CLM-HU102-F5-A10-01', currCit: 'CIT-HU102-F5-A10-CURR', span: 'SPN-HU102-F5P6-C06-01', nano: 'Tumour grade and differentiation',
    objective: 'Identify degree of differentiation as the defining feature of tumour grade.', page: 11, pageLabel: 'p11', difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 62,
    stem: 'A biopsy of a poorly differentiated tumor shows pleomorphic cells, high mitotic activity, and extensive necrosis. Which feature best defines tumor grade?', keyLetter: 'A', options: ['Degree of differentiation', 'Tumor size', 'Extent of metastasis', 'Depth of invasion'], clue: 'histological grade is defined primarily by differentiation rather than anatomical extent',
    reasons: ['degree of differentiation is the defining grading feature in this item', 'tumour size is used in anatomical staging rather than histological grade', 'extent of metastasis contributes to stage rather than grade', 'depth of invasion contributes to local stage rather than the histological grade definition'],
  },
  {
    ref: 'C07', key: 'pathology.staging.stage-four-lung-distant-metastasis', label: 'Stage IV lung carcinoma indicates distant metastatic spread', aliases: ['Metastatic stage-four lung cancer', 'Lung carcinoma distant-stage definition'],
    definition: 'Stage IV lung carcinoma denotes advanced disease with distant metastatic spread. It is an anatomical extent category and does not describe tumour differentiation or absence of lymph-node disease.', objective: 'Interpret stage IV lung carcinoma as spread beyond the lung to distant sites.', pitfalls: 'Confusing stage with histological grade, or interpreting stage IV as in situ or node-negative local disease.',
    type: 'classification', micro: 'Tumour staging', nano: 'Stage IV lung carcinoma', article: stagingArticle, source: neo1, teachPage: 28, teach: 'The accepted anatomical staging systems classify stages 0 to IV according to tumour size, nodal involvement and distant metastases.',
    subject: 'Stage IV lung carcinoma', predicate: 'indicates', object: 'distant metastatic spread', display: 'Stage IV lung carcinoma indicates distant metastatic spread.', page: 11, pageLabel: 'p11', difficulty: 'Easy', effort: 'Low', reasoning: 1, inferred: 38,
    stem: 'A 67-year-old male is diagnosed with a stage IV lung carcinoma. What does this indicate?', keyLetter: 'A', options: ['Tumor has spread beyond the lung to distant sites', 'Tumor is highly differentiated', 'Tumor has no lymph node involvement', 'Tumor is in situ'], clue: 'stage IV is an anatomical extent category representing distant disease',
    reasons: ['spread beyond the lung to distant sites is the defining interpretation of stage IV disease here', 'high differentiation is a grade description and does not define stage IV', 'absence of lymph-node involvement does not establish stage IV and conflicts with the advanced-stage implication', 'in situ disease is pre-invasive and lies at the opposite end of anatomical extent'],
  },
  {
    ref: 'C08', key: 'pathology.grading.gleason-nine-aggressive-prostate-cancer', label: 'A Gleason score of 9 indicates highly aggressive prostate cancer', aliases: ['High-grade Gleason 9 prostate carcinoma', 'Gleason score and prostate-cancer aggression'],
    definition: 'The Gleason grading system assesses architectural differentiation in prostate adenocarcinoma. A combined score of 9 represents a high-grade, poorly differentiated tumour with aggressive biological behaviour.', objective: 'Interpret a Gleason score of 9 as highly aggressive prostate cancer.', pitfalls: 'Calling a high Gleason score well differentiated, organ-confined or unlikely to metastasise.',
    type: 'classification', micro: 'Tumour grading', nano: 'Gleason score 9', article: stagingArticle,
    subject: 'A Gleason score of 9', predicate: 'indicates', object: 'highly aggressive prostate cancer', display: 'A Gleason score of 9 indicates highly aggressive prostate cancer.', page: 12, pageLabel: 'pp11–12', difficulty: 'Moderate', effort: 'Medium', reasoning: 1, inferred: 57,
    stem: 'A 59-year-old man with prostate cancer has a Gleason score of 9. What does this imply?', keyLetter: 'B', options: ['Well-differentiated tumor', 'Highly aggressive tumor', 'Tumor confined to prostate', 'Low likelihood of metastasis'], clue: 'Gleason 9 is a high histological grade',
    reasons: ['a Gleason score of 9 does not represent well-differentiated architecture', 'a high Gleason score indicates highly aggressive tumour biology', 'Gleason score grades architecture and does not by itself mean the tumour is confined to the prostate', 'high grade is associated with greater rather than low metastatic potential'],
  },
  {
    ref: 'C09', reuseId: 'CON-FND-09144FA12A9FC5', article: stagingArticle, existingArticle: behaviourArticle,
    display: 'Anaplasia is characterised by poor differentiation with high mitotic activity.', claim: 'CLM-HU102-F5P3-A04-01', currCit: 'CIT-HU102-F5P3-A04-CURR', span: 'SPN-HU102-F5P6-C09-01', nano: 'Anaplasia and loss of differentiation',
    objective: 'Classify a malignant tumour with giant hyperchromatic nuclei and no resemblance to its tissue of origin as anaplastic.', page: 12, pageLabel: 'p12', difficulty: 'Moderate', effort: 'Medium', reasoning: 1, inferred: 54,
    stem: 'A biopsy of a malignant tumor shows highly anaplastic cells with giant nuclei and no resemblance to the tissue of origin. Which term best describes this?', keyLetter: 'C', options: ['Well-differentiated', 'Dysplastic', 'Anaplastic', 'Hyperplastic'], clue: 'the malignant cells show extreme atypia and no resemblance to the tissue of origin',
    reasons: ['well-differentiated tumour cells retain recognisable resemblance to their tissue of origin', 'dysplasia describes atypical disordered epithelial growth but is not the best term for this fully malignant undifferentiated tumour', 'anaplastic describes the marked loss of differentiation and severe cytological atypia', 'hyperplasia is increased cell number without the defining malignant loss of differentiation'],
  },
]

for (const row of rows) {
  row.id = row.reuseId ?? idFor(row.key)
  row.asmCit = `CIT-HU102-F5P6-${row.ref}-ASM`
  if (!row.reuseId) {
    row.claim = `CLM-HU102-F5P6-${row.ref}-01`
    row.currCit = row.source ? `CIT-HU102-F5P6-${row.ref}-CURR` : null
    row.span = `SPN-HU102-F5P6-${row.ref}-01`
    row.citationIds = [row.currCit, row.asmCit].filter(Boolean)
  } else {
    row.citationIds = [row.currCit, row.asmCit]
  }
}
const newRows = rows.filter((row) => !row.reuseId)
const byRef = Object.fromEntries(rows.map((row) => [row.ref, row]))
const qid = (row) => `Q-HU102-PAT-NEO-F5-${row.ref}`
const relatedMap = { A11: ['B12', 'B14'], A20: ['A11'], B12: ['B14'], B13: ['B12'], B14: ['A11', 'B12'], B17: ['C07', 'C08'], B18: ['B17'], C07: ['B17', 'C08'], C08: ['C07'] }

const concept = (row) => `# Item
## label
${row.label}
## id
${row.id}
## canonical_key
${row.key}
## aliases
${row.aliases.join('\n')}
## arabic_label

## arabic_aliases

## definition
${row.definition}
## explicit_objective
${row.objective}
## pitfalls
${row.pitfalls}
## concept_type
${row.type}
## status
under review
## support_mode
direct_statement
## subject
fnd
## primary_node_id
SYS-FND-T03
## secondary_node_ids
DIS-PAT-T05
## topic
General pathology
## subtopic
Neoplasia
## microtopic
${row.micro}
## nanotopic
${row.nano}
## modules
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Neoplasia > ${row.micro}
## universities
hu
## learner_years
1
## article_ids
${row.article}
## related_article_ids
${row.article === metastasisArticle ? stagingArticle : metastasisArticle}
## related_concept_ids
${relatedMap[row.ref].map((ref) => byRef[ref].id).join('\n')}
## resource_ids
${[assessment, row.source].filter(Boolean).join('\n')}
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.8
## exam_weight_by_year
HU_Y1=0.8
## clinical_relevance
0.84
## academic_relevance
0.97
## weight_confidence
0.55
## exam_signal
${assessment} | tier-3 solved local study bank | undated | PDF ${row.pageLabel} ${row.ref} | printed key; not an official exam
## confidence
${row.source ? '0.92' : '0.85'}
## atomic_claim_ids
${row.claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
${row.teach ? `[Teaching p${row.teachPage}] ${row.teach}\n` : ''}[Solved ${row.pageLabel} ${row.ref}] ${row.stem} Answer: ${row.keyLetter}) ${row.options['ABCD'.indexOf(row.keyLetter)]}.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent medical verification and Helwan faculty review remain required before publication.${row.source ? '' : ' No separate current Helwan teaching-page statement was located for this exact association.'}
## owner
Helwan Year-1 authoring lane
## reviewer
Medical team, Helwan Pathology faculty
## final_publisher
Admin team
## last_reviewed

## review_due

## publication_status
needs_evidence
## editorial_review_status
drafted_not_reviewed
## exclusion_reason

## field_notes
arabicLabel: Blank pending independently verified Arabic terminology review.
arabicAliases: Blank pending independently verified Arabic terminology review.
microtopicId: No reviewed microtopic ID exists beneath SYS-FND-T03 for this overlay.
nanotopicId: No reviewed nanotopic ID exists beneath the assigned canonical node.
approvedFileResourceIds: Local source files are not rights-cleared for redistribution.
approvedVideoResourceIds: No video is assigned.
resourceOccurrenceIds: Hand-authored from exact governed pages.
sourceCandidateIds: Family 5 completed the search-before-mint gate in the governing triage.
mergeIds: No merge occurred; the exact canonical scope is represented once.
rejectedMergeCandidateIds: No rival same-scope concept survived triage.
lastReviewed: New record; no faculty review has occurred.
reviewDue: Set after first faculty review.
exclusionReason: Not excluded; held at needs_evidence.
`

const explain = (row, index) => {
  const correct = 'ABCD'.indexOf(row.keyLetter)
  if (index === correct) return `${row.options[index]} is correct because ${row.reasons[index]}. The decisive clue is that ${row.clue}. This identifies the most specific classification, metastatic pattern, stage or management principle in the options. Separating grade, stage, route and destination prevents a related neoplasia fact from replacing it.`
  return `${row.options[index]} does not fit because ${row.reasons[index]}. The decisive clue is that ${row.clue}, which supports ${row.options[correct]}. This distractor answers a different question about tumour origin, grade, stage, route or treatment. Matching the vignette to the narrowest requested relationship prevents it from replacing the correct answer.`
}
const question = (row) => `# Item
## id
${qid(row)}
## title
${row.stem}
## subject
fnd
## status
Draft
## owner
Helwan Year-1 authoring lane
## vignette

## question
${row.stem}
## format
single best answer
## derived_from

## correct_answer
${row.keyLetter}
${row.options.map((option, i) => `## answer_${'abcd'[i]}\n${option}\n## explanation_${'abcd'[i]}\n${explain(row, i)}`).join('\n')}
## topic
General pathology
## subtopic
${row.micro ?? 'Tumour differentiation'}
## difficulty
${row.difficulty}
## question_type
Clinical application
## main_concept
${row.id}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Neoplasia > ${row.micro ?? 'Tumour differentiation'}
## clinical_relevance
0.84
## academic_relevance
0.97
## cognitive_effort_score
0.62
## exam_weight_by_year
HU_Y1=0.8
## question_only_for
HU_Y1
## concept_ids
${row.id}
## years
HU_Y1
## universities
hu
## cognitive_effort
${row.effort}
## setting
Both
## reasoning_level
${row.reasoning}
## inferred_difficulty
${row.inferred}
## exam_relevance
8
## contextual_concept_ids

## library_ids
${row.article}
${row.existingArticle ?? ''}
## resource_ids
${[assessment, row.source].filter(Boolean).join('\n')}
## learning_objective
${row.objective}
## media_recommendations

## source_citation
${assessment}, PDF ${row.pageLabel}, Family-5 ${row.ref}: exact stem, options A–D and visibly printed key ${row.keyLetter}.${row.source ? ` Teaching support: ${row.source}, PDF p${row.teachPage}.` : ''} Authority: tier-3 solved local study bank, not an official exam or official key.
## attachments

## attached_image

## author_notes
Stem, option order and printed key are preserved exactly. No official sitting, marks or recurrence claim is inferred.${row.reuseId ? ' This question reuses the already governed Family-5 concept and article rather than creating a rival.' : row.source ? '' : ' This record remains at needs_evidence because no separate current Helwan teaching-page statement was located for the exact association.'}
## estimated_seconds
75
## randomise_answers
yes
`

const article = ({ id, title, aliases, micro, nano, subset, other, summary, sections, loses, notes }) => `# Item
## id
${id}
## title
${title}
## arabic_title

## aliases
${aliases.join('\n')}
## subject
fnd
## topic
General pathology
## subtopic
Neoplasia
## microtopic
${micro}
## nanotopic
${nano}
## primary_node_id
SYS-FND-T03
## secondary_node_ids
DIS-PAT-T05
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
8
## high_yield
High
## time_sensitive
stable
## status
Draft
## owner
Helwan Year-1 authoring lane
## reviewer
Medical team, Helwan Pathology faculty
## final_publisher
Admin team
## summary
${summary}
## sections
${sections}
## published_summary

## published_sections

## hold_these
${subset.map((row) => row.display).join('\n')}
## lose_the_mark
${loses.join('\n')}
## related_concepts
${subset.map((row) => row.id).join('\n')}
## related_articles
${other}
## question_ids
${subset.map(qid).join('\n')}
## resource_ids
${assessment}
${neo1}
${neo3}
## universities
hu
## years
HU_Y1
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Neoplasia > ${micro}
## university_notes
hu: Restricted to HU-BMS-102 Year-1; the solved Family-5 bank supplies assessment signal but no official-exam authority.
## annotations
${subset.map((row) => `### definition_of · ${row.id}\nQuote: ${row.display}\nBlock: body`).join('\n\n')}
## media

## media_recommendations

## callout_evidence
${subset.map((row) => `### ${row.display}\nClaims: ${row.claim}\nCitations: ${row.citationIds.join(', ')}\nSpan: ${row.span}`).join('\n\n')}
## article_source_ids
${assessment}
${neo1}
${neo3}
## claim_ids
${subset.map((row) => row.claim).join('\n')}
## span_ids
${subset.map((row) => row.span).join('\n')}
## publication_gate
needs_evidence
## evidence_basis
Current HU-BMS-102 Neoplasia 1 and Neoplasia 3 teaching pages where exact local support was located.
Tier-3 solved local Family-5 bank, pp3, 5 and 9–12, with visibly printed keys.
## evidence_gaps
Independent medical verification and Helwan faculty review remain required before publication. Several exact site, stage and treatment associations have only the governed assessment source in this bounded slice.
## conflicts
[clear]
## last_reviewed

## review_due

## notes
${notes}
## field_notes
arabicTitle: Blank pending independently verified Arabic terminology review.
publishedSummary: Blank because status is Draft.
publishedSections: Blank because status is Draft.
media: No rights-cleared asset is attached; this article is text-runnable.
mediaRecommendations: No visual is required for the tested relationships.
lastReviewed: New draft; no faculty review has occurred.
reviewDue: Set only after first faculty review.
`

const metastatic = newRows.filter((row) => row.article === metastasisArticle)
const staging = rows.filter((row) => row.article === stagingArticle)
const articles = [
  article({ id: metastasisArticle, title: 'Characteristic metastatic patterns and paediatric tumour classification', aliases: ['Routes and destinations of tumour spread', 'Sarcoma spread and common secondary sites'], micro: 'Metastatic patterns', nano: 'Routes, target organs and Wilms tumour', subset: metastatic, other: stagingArticle,
    summary: 'Metastatic questions may ask for a route, a destination or the most likely primary. Sarcomas favour blood-borne spread; pancreatic cancer commonly reaches liver; breast cancer commonly reaches bone; and lung carcinoma has a characteristic adrenal association. Wilms tumour is a paediatric nephroblastoma.',
    sections: `### Definition
Metastasis is discontinuous tumour spread to a secondary site. ${byRef.A11.display} ${byRef.A20.display}

### Mechanism
Venous drainage and organ tropism shape metastatic destinations. ${byRef.B12.display} ${byRef.B14.display} Tumour cells must enter vessels, survive transit, leave the circulation and establish growth in the target organ.

### Key determinants
${byRef.B13.display} Read whether the item asks for the route, the target organ or the likely primary; these are different propositions even when the same organs appear.

### Clinical significance
Use the primary site and drainage pattern together. A blood-borne route does not by itself name the target, and a target-organ association does not by itself prove the route.`,
    loses: ['Calling every carcinoma lymphatic when the question asks for a specific distant organ.', 'Treating a possible metastatic site as the most characteristic site in the supplied options.', 'Calling Wilms tumour a mature teratoma rather than nephroblastoma.'], notes: 'This article covers only the five new concepts required by the final routine Family-5 slice.' }),
  article({ id: stagingArticle, title: 'Tumour staging, prognostic grade and treatment selection', aliases: ['TNM, stage IV and Gleason grading', 'Anatomical extent and receptor-directed management'], micro: 'Staging and prognosis', nano: 'TNM, Gleason grade and breast treatment', subset: staging, other: metastasisArticle,
    summary: 'Stage measures anatomical extent, grade estimates biological aggressiveness, and biomarkers can guide treatment. The selected questions apply colorectal TNM, stage-IV lung-cancer meaning, Gleason score 9 and hormone-receptor-directed breast-cancer treatment.',
    sections: `### Definition
Staging estimates tumour spread from the primary lesion to nodes and distant sites. ${byRef.B17.display} ${byRef.C07.display}

### Mechanism
Grade describes differentiation and architecture rather than anatomical extent. ${byRef.C06.display} ${byRef.C09.display} ${byRef.C08.display} High-grade architecture indicates more aggressive biological behaviour but does not by itself specify the anatomical stage.

### Key determinants
${byRef.B18.display} Receptor status supplies treatment information, whereas tumour size, nodal involvement and distant metastasis supply staging information.

### Clinical significance
Do not exchange grade and stage. Muscularis propria invasion determines the colorectal T category, distant spread determines advanced stage, Gleason architecture supplies prostate grade, and ER/PR status supports endocrine treatment selection.`,
    loses: ['Using tumour size or metastatic extent as the definition of histological grade.', 'Calling stage IV disease highly differentiated or in situ.', 'Ignoring ER/PR positivity when selecting the keyed breast-cancer management approach.'], notes: 'C06 and C09 reuse the existing tumour-behaviour article and governed concepts; this article creates no rival records for them.' }),
].join('\n---\n\n')

const claim = (row) => `# Item
## id
${row.claim}
## concept_id
${row.id}
## subject
${row.subject}
## predicate
${row.predicate}
## object
${row.object}
## display_text
${row.display}
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
${row.source ? '0.92' : '0.84'}
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
authority: ${row.source ? 'current local curriculum plus auxiliary printed key' : 'auxiliary printed key only for the exact association'}; source wording and scope retained
`
const citations = (row) => `${row.source ? `# Item
## id
${row.currCit}
## claim_id
${row.claim}
## resource_id
${row.source}
## evidence_role
local_curriculum
## support_span
${row.teach}
## locator_type
page
## locator_page
${row.teachPage}
## locator_section
${row.micro}
## locator_detail
PDF p${row.teachPage}, teaching support for Family-5 ${row.ref}
## context_note
Local curriculum support only; assessment-specific detail remains attributed to the solved bank.
## confidence
0.92
## counts_as_claim_evidence
no

---

` : ''}# Item
## id
${row.asmCit}
## claim_id
${row.claim}
## resource_id
${assessment}
## evidence_role
auxiliary_assessment
## support_span
${row.stem} Answer: ${row.keyLetter}) ${row.options['ABCD'.indexOf(row.keyLetter)]}.
## locator_type
page
## locator_page
${row.page}
## locator_section
Family 5 ${row.ref}
## locator_detail
Solved PDF ${row.pageLabel}, exact stem, four options A–D and visibly printed answer
## context_note
Tier-3 solved local study-bank evidence only; not an official exam or authenticated official key.
## confidence
0.92
## counts_as_claim_evidence
no
`
const span = (row) => `# Item
## id
${row.span}
## article_id
${row.article}
## section_id
${row.article.toLowerCase()}-${row.nano.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}
## text
${row.display}
## claim_ids
${row.claim}
## citation_ids
${row.citationIds.join('\n')}
`

const relationDefs = [
  ['A11', 'associated_with', 'B14', 'blood-borne dissemination provides the route through which lung carcinoma can reach adrenal tissue'],
  ['B12', 'contrasts_with', 'B14', 'pancreatic-to-liver and lung-to-adrenal are distinct primary–secondary patterns'],
  ['B13', 'contrasts_with', 'B12', 'breast-to-bone differs from pancreatic-to-liver metastatic tropism'],
  ['B17', 'associated_with', 'C07', 'both are anatomical staging propositions at different levels of specificity'],
  ['B17', 'contrasts_with', 'C08', 'TNM measures anatomical extent whereas Gleason score measures histological grade'],
  ['C07', 'contrasts_with', 'C08', 'advanced stage and high grade are related but non-interchangeable dimensions'],
  ['B18', 'associated_with', 'B17', 'local extent and receptor status jointly inform management while remaining distinct variables'],
]
const relation = ([a, type, b, note]) => `# Item
## source
${byRef[a].id}
## type
${type}
## target
${byRef[b].id}
## evidence_claim_ids
${byRef[a].claim}
${byRef[b].claim}
## citation_ids
${[byRef[a].currCit, byRef[a].asmCit, byRef[b].currCit, byRef[b].asmCit].filter(Boolean).join('\n')}
## verification_status
needs_evidence
## confidence
0.86
## qualifiers
scope: ${note}
## reviewer
Medical team, Helwan Pathology faculty
`

const files = new Map([
  ['concept/HU-BMS-102-pathology-family5-part6-concepts.md', newRows.map(concept).join('\n---\n\n')],
  ['article/HU-BMS-102-pathology-family5-part6-articles.md', articles],
  ['question/HU-BMS-102-pathology-family5-part6-mcq.md', rows.map(question).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family5-part6-claims.md', newRows.map(claim).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family5-part6-citations.md', rows.map(citations).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family5-part6-spans.md', rows.map(span).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family5-part6-relations.md', relationDefs.map(relation).join('\n---\n\n')],
])
for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}
console.log(JSON.stringify({ family: '5-part6', released: { articles: 2, concepts: newRows.length, questions: rows.length, conceptReuses: rows.length - newRows.length, sources: 0, claims: newRows.length, citations: rows.reduce((n, row) => n + (row.source ? 2 : 1), 0), spans: rows.length, relations: relationDefs.length }, remaining: { routineKeyed: 0, questionableKeyed: 2 }, questionableDeferred: ['A01', 'A16'], sourceRefs: rows.map((row) => row.ref) }, null, 2))
