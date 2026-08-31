import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')

const assessment = 'src_eda268c7a75eb1930662'
const neo3 = 'src_a9ccc0b353dbbd7670cb'
const neo4 = 'src_8e574a175cfd0e454cf3'
const suppressorArticle = 'ART-HU-BMS102-PAT-TUMOUR-SUPPRESSORS-ANGIOGENESIS'
const carcinogenArticle = 'ART-HU-BMS102-PAT-ENVIRONMENTAL-VIRAL-CARCINOGENESIS'
const idFor = (key) => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const rows = [
  {
    ref: 'A22', key: 'pathology.tumor.vegf-angiogenesis', label: 'VEGF secretion promotes tumour angiogenesis', aliases: ['VEGF-driven tumour angiogenesis', 'Angiogenic switch in neoplasia'],
    definition: 'Vascular endothelial growth factor promotes formation of new vessels that supply a growing tumour. Secretion of angiogenic factors can drive the angiogenic switch and permit expansion beyond the diffusion-limited microscopic size.', objective: 'Identify VEGF secretion as a tumour-derived signal that promotes angiogenesis.', pitfalls: 'Selecting loss of E-cadherin, increased apoptosis or a p53 mutation when the question asks for the direct pro-angiogenic factor.',
    type: 'mechanism', micro: 'Hallmarks of cancer', nano: 'Tumour angiogenesis', article: suppressorArticle, source: neo4, teachPage: 31, teach: 'The angiogenic switch may arise from tumour production of angiogenic factors or loss of angiogenesis inhibitors.',
    subject: 'VEGF secretion', predicate: 'promotes', object: 'tumour angiogenesis', display: 'VEGF secretion promotes tumour angiogenesis.', page: 6, pageLabel: 'p6', difficulty: 'Moderate', effort: 'Medium', reasoning: 1, inferred: 56,
    stem: 'Which factor is most likely to promote angiogenesis in a tumor?', keyLetter: 'B', options: ['p53 mutation', 'VEGF secretion', 'Loss of E-cadherin', 'Increased apoptosis'],
    clue: 'VEGF is a direct pro-angiogenic signal', reasons: ['a p53 mutation can remove growth restraints but is not the direct angiogenic factor among these options', 'VEGF directly stimulates the vascular response required for new vessel formation', 'loss of E-cadherin weakens cell adhesion and facilitates invasion rather than directly stimulating angiogenesis', 'increased apoptosis reduces viable tumour-cell mass and does not promote new-vessel formation'],
  },
  {
    ref: 'A23', key: 'pathology.carcinogen.asbestos-mesothelioma', label: 'Asbestos exposure increases the risk of mesothelioma', aliases: ['Asbestos-associated mesothelioma', 'Occupational asbestos carcinogenesis'],
    definition: 'Occupational or environmental asbestos exposure is strongly associated with malignant mesothelioma of serosal surfaces, especially the pleura. A history of asbestos exposure is therefore a high-value risk clue for mesothelioma.', objective: 'Link a history of asbestos exposure with increased risk of mesothelioma.', pitfalls: 'Choosing a generic carcinoma or lymphoma instead of the characteristic asbestos-associated serosal malignancy.',
    type: 'risk association', micro: 'Environmental carcinogenesis', nano: 'Asbestos and mesothelioma', article: carcinogenArticle, source: null, teachPage: null, teach: null,
    subject: 'Asbestos exposure', predicate: 'increases the risk of', object: 'mesothelioma', display: 'Asbestos exposure increases the risk of mesothelioma.', page: 6, pageLabel: 'p6', difficulty: 'Easy', effort: 'Low', reasoning: 1, inferred: 35,
    stem: 'A patient with a history of asbestos exposure is at high risk for:', keyLetter: 'C', options: ['Squamous cell carcinoma', 'Adenocarcinoma', 'Mesothelioma', 'Lymphoma'],
    clue: 'the exposure named is asbestos', reasons: ['squamous cell carcinoma is not the characteristic malignancy singled out by asbestos exposure in this item', 'adenocarcinoma is too nonspecific and does not capture the characteristic serosal tumour association', 'asbestos exposure is classically linked to malignant mesothelioma', 'lymphoma is not the characteristic asbestos-associated malignancy'],
  },
  {
    ref: 'B15', key: 'pathology.genetics.apc-familial-adenomatous-polyposis', label: 'Inherited APC mutation causes familial adenomatous polyposis', aliases: ['APC-associated FAP', 'Familial adenomatous polyposis genetics'],
    definition: 'Familial adenomatous polyposis is an inherited tumour-predisposition syndrome caused by a germline pathogenic APC variant. Affected people develop numerous colorectal adenomas and have a very high risk of colorectal carcinoma without preventive management.', objective: 'Associate an inherited APC mutation and familial colorectal cancer with familial adenomatous polyposis.', pitfalls: 'Confusing APC-associated polyposis with mismatch-repair-associated Lynch syndrome, TP53-associated Li-Fraumeni syndrome or PTEN-associated Cowden syndrome.',
    type: 'risk association', micro: 'Inherited tumour suppressor syndromes', nano: 'APC and familial adenomatous polyposis', article: suppressorArticle, source: neo4, teachPage: 20, teach: 'An inherited mutant APC copy causes familial adenomatous polyposis, and loss of both APC copies causes colon cancer.',
    subject: 'An inherited APC mutation', predicate: 'is associated with', object: 'familial adenomatous polyposis', display: 'An inherited APC mutation is associated with familial adenomatous polyposis.', page: 10, pageLabel: 'pp9–10', difficulty: 'Moderate', effort: 'Medium', reasoning: 1, inferred: 52,
    stem: 'A 45-year-old man with a family history of colorectal cancer undergoes genetic testing. A mutation in the APC gene is identified. Which syndrome does he likely have?', keyLetter: 'C', options: ['Lynch syndrome', 'Li-Fraumeni syndrome', 'Familial adenomatous polyposis', 'Cowden syndrome'],
    clue: 'the germline alteration is in APC', reasons: ['Lynch syndrome is driven by inherited mismatch-repair defects rather than APC mutation', 'Li-Fraumeni syndrome is associated with germline TP53 variants rather than APC mutation', 'germline APC mutation establishes the familial adenomatous polyposis association', 'Cowden syndrome is associated with PTEN rather than APC'],
  },
  {
    ref: 'B16', key: 'pathology.genetics.pten-cowden-syndrome', label: 'PTEN mutation with breast and thyroid lesions indicates Cowden syndrome', aliases: ['PTEN-associated Cowden syndrome', 'Cowden tumour-predisposition syndrome'],
    definition: 'Cowden syndrome is a PTEN-associated tumour-predisposition syndrome characterised by multiple hamartomatous lesions and increased risks involving the breast, thyroid and endometrium. A PTEN mutation in a young adult with breast and thyroid lesions supports this diagnosis.', objective: 'Recognise Cowden syndrome from a PTEN mutation with breast and thyroid manifestations.', pitfalls: 'Substituting BRCA-associated disease, von Hippel–Lindau syndrome or mismatch-repair-associated Lynch syndrome for a PTEN-associated phenotype.',
    type: 'diagnostic pattern', micro: 'Inherited tumour suppressor syndromes', nano: 'PTEN and Cowden syndrome', article: suppressorArticle, source: null, teachPage: null, teach: null,
    subject: 'A PTEN mutation with breast and thyroid lesions', predicate: 'supports', object: 'Cowden syndrome', display: 'A PTEN mutation with breast and thyroid lesions supports Cowden syndrome.', page: 10, pageLabel: 'p10', difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 62,
    stem: 'A 28-year-old woman with multiple breast fibroadenomas and thyroid nodules is diagnosed with a PTEN mutation. What is the most likely diagnosis?', keyLetter: 'B', options: ['BRCA-associated breast cancer', 'Cowden syndrome', 'Von Hippel-Lindau syndrome', 'Lynch syndrome'],
    clue: 'the vignette combines a PTEN mutation with breast and thyroid lesions', reasons: ['BRCA-associated cancer does not explain the stated PTEN mutation and multisystem phenotype', 'PTEN mutation with breast and thyroid manifestations supports Cowden syndrome', 'von Hippel–Lindau syndrome is associated with VHL alteration and a different tumour spectrum', 'Lynch syndrome is caused by mismatch-repair defects and does not fit the stated PTEN mutation'],
  },
  {
    ref: 'C14', key: 'pathology.genetics.retinoblastoma-tumor-suppressor-inactivation', label: 'Retinoblastoma develops through tumour suppressor gene inactivation', aliases: ['RB tumour suppressor inactivation', 'Retinoblastoma two-hit mechanism'],
    definition: 'The RB gene is a tumour suppressor that restrains cell-cycle progression. Retinoblastoma develops when both functional copies are lost or inactivated in a susceptible retinal cell, illustrating tumour suppressor gene inactivation.', objective: 'Identify tumour suppressor gene inactivation as the genetic mechanism underlying retinoblastoma.', pitfalls: 'Choosing proto-oncogene activation, oncogenic translocation or growth-factor overexpression when the defining defect is loss of RB function.',
    type: 'mechanism', micro: 'Tumour suppressor genes', nano: 'RB inactivation', article: suppressorArticle, source: neo4, teachPage: 20, teach: 'The RB tumour suppressor gene is linked to retinoblastoma and osteosarcoma.',
    subject: 'Retinoblastoma development', predicate: 'involves', object: 'tumour suppressor gene inactivation', display: 'Retinoblastoma development involves tumour suppressor gene inactivation.', page: 13, pageLabel: 'p13', difficulty: 'Moderate', effort: 'Medium', reasoning: 1, inferred: 57,
    stem: 'A patient is diagnosed with retinoblastoma. Which genetic mechanism is involved in tumor development?', keyLetter: 'B', options: ['Activation of proto-oncogenes', 'Inactivation of tumor suppressor genes', 'Translocation of oncogenes', 'Overexpression of growth factors'],
    clue: 'retinoblastoma is driven by loss of RB tumour suppressor function', reasons: ['proto-oncogene activation is a gain-of-function mechanism and does not describe RB loss', 'inactivation of a tumour suppressor gene is the defining genetic mechanism', 'oncogenic translocation is not the mechanism specified for RB-associated retinoblastoma', 'growth-factor overexpression is not the defining inherited or somatic RB defect'],
  },
  {
    ref: 'C15', key: 'pathology.genetics.apc-familial-adenomatous-polyposis', label: 'Inherited APC mutation causes familial adenomatous polyposis', aliases: ['APC-associated FAP', 'Familial adenomatous polyposis genetics'],
    definition: 'Familial adenomatous polyposis is an inherited tumour-predisposition syndrome caused by a germline pathogenic APC variant. Affected people develop numerous colorectal adenomas and have a very high risk of colorectal carcinoma without preventive management.', objective: 'Associate an inherited APC mutation and a family history of colon cancer with familial adenomatous polyposis.', pitfalls: 'Confusing APC-associated polyposis with mismatch-repair-associated Lynch syndrome, hereditary breast cancer or multiple endocrine neoplasia.',
    type: 'risk association', micro: 'Inherited tumour suppressor syndromes', nano: 'APC and familial adenomatous polyposis', article: suppressorArticle, source: neo4, teachPage: 20, teach: 'An inherited mutant APC copy causes familial adenomatous polyposis, and loss of both APC copies causes colon cancer.',
    subject: 'An inherited APC mutation', predicate: 'is associated with', object: 'familial adenomatous polyposis', display: 'An inherited APC mutation is associated with familial adenomatous polyposis.', page: 13, pageLabel: 'p13', difficulty: 'Moderate', effort: 'Medium', reasoning: 1, inferred: 52,
    stem: 'A 35-year-old woman with a family history of colon cancer tests positive for an inherited APC gene mutation. Which condition is most associated with this mutation?', keyLetter: 'B', options: ['Lynch syndrome', 'Familial adenomatous polyposis (FAP)', 'Hereditary breast cancer', 'Multiple endocrine neoplasia'],
    clue: 'the inherited alteration is in APC', reasons: ['Lynch syndrome reflects mismatch-repair deficiency rather than an APC mutation', 'familial adenomatous polyposis is the inherited syndrome associated with APC mutation', 'hereditary breast-cancer syndromes are not defined by inherited APC mutation', 'multiple endocrine neoplasia involves other susceptibility genes and a different tumour spectrum'],
  },
  {
    ref: 'C16', key: 'pathology.genetics.rb-retinoblastoma-osteosarcoma-risk', label: 'Germline RB mutation links childhood retinoblastoma with later osteosarcoma risk', aliases: ['RB-associated osteosarcoma risk', 'Hereditary retinoblastoma second malignancy'],
    definition: 'A germline pathogenic RB variant predisposes to childhood retinoblastoma and increases the risk of subsequent osteosarcoma. The shared tumour suppressor defect explains the characteristic second-malignancy pattern.', objective: 'Use childhood retinoblastoma followed by osteosarcoma to identify an underlying RB mutation.', pitfalls: 'Choosing KRAS, TP53 or BRAF when the paired retinoblastoma–osteosarcoma phenotype points to RB.',
    type: 'risk association', micro: 'Inherited tumour suppressor syndromes', nano: 'RB-associated osteosarcoma', article: suppressorArticle, source: neo4, teachPage: 20, teach: 'The RB tumour suppressor gene is linked to retinoblastoma and osteosarcoma.',
    subject: 'A germline RB mutation', predicate: 'increases the risk of', object: 'retinoblastoma and osteosarcoma', display: 'A germline RB mutation increases the risk of retinoblastoma and osteosarcoma.', page: 13, pageLabel: 'p13', difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 63,
    stem: 'A 42-year-old woman with a history of childhood retinoblastoma is diagnosed with osteosarcoma. Which of the following best explains her increased cancer risk?', keyLetter: 'C', options: ['KRAS mutation', 'TP53 mutation', 'RB gene mutation', 'BRAF mutation'],
    clue: 'childhood retinoblastoma followed by osteosarcoma is the characteristic RB-associated pattern', reasons: ['KRAS activation does not explain the characteristic paired tumour history', 'TP53 mutation causes a broader Li-Fraumeni tumour spectrum but is not the keyed gene for this retinoblastoma history', 'RB mutation explains both hereditary retinoblastoma and increased osteosarcoma risk', 'BRAF mutation is not the inherited defect linking these two tumours'],
  },
  {
    ref: 'C17', key: 'pathology.carcinogen.helicobacter-gastric-adenocarcinoma', label: 'Chronic Helicobacter pylori infection increases gastric adenocarcinoma risk', aliases: ['H. pylori-associated gastric carcinoma', 'Helicobacter carcinogenesis'],
    definition: 'Chronic Helicobacter pylori gastritis promotes persistent inflammation, mucosal atrophy and metaplastic change that can progress to gastric adenocarcinoma. The infection also has a separate association with gastric B-cell lymphoma.', objective: 'Identify gastric adenocarcinoma as a malignancy associated with chronic Helicobacter pylori infection.', pitfalls: 'Choosing hepatocellular, oesophageal or pancreatic carcinoma despite the infection being centred in gastric mucosa.',
    type: 'risk association', micro: 'Infectious carcinogenesis', nano: 'Helicobacter pylori', article: carcinogenArticle, source: neo3, teachPage: 48, teach: 'Helicobacter pylori infection may cause gastric carcinoma and gastric B-cell lymphoma.',
    subject: 'Chronic Helicobacter pylori infection', predicate: 'increases the risk of', object: 'gastric adenocarcinoma', display: 'Chronic Helicobacter pylori infection increases the risk of gastric adenocarcinoma.', page: 13, pageLabel: 'p13', difficulty: 'Easy', effort: 'Low', reasoning: 1, inferred: 38,
    stem: 'A patient with chronic Helicobacter pylori infection has an increased risk of which malignancy?', keyLetter: 'A', options: ['Gastric adenocarcinoma', 'Hepatocellular carcinoma', 'Esophageal squamous cell carcinoma', 'Pancreatic adenocarcinoma'],
    clue: 'chronic H. pylori infection acts in the gastric mucosa', reasons: ['gastric adenocarcinoma is a recognised malignancy associated with chronic H. pylori infection', 'hepatocellular carcinoma is associated with chronic viral hepatitis and cirrhosis rather than H. pylori', 'oesophageal squamous carcinoma is linked to different exposures and does not arise from chronic H. pylori gastritis', 'pancreatic adenocarcinoma is not the characteristic malignancy associated with this infection'],
  },
  {
    ref: 'C18', key: 'pathology.carcinogen.hpv16-e6-e7-p53-rb', label: 'HPV-16 E6 and E7 inhibit p53 and RB in cervical oncogenesis', aliases: ['High-risk HPV E6/E7 oncogenesis', 'HPV-16 p53 and RB inhibition'],
    definition: 'High-risk HPV encodes E6 and E7 oncoproteins that disable key tumour suppressor pathways. E6 promotes loss of p53 function, while E7 interferes with RB, allowing abnormal cell-cycle progression in cervical epithelium.', objective: 'Identify E6- and E7-mediated inhibition of p53 and RB as the oncogenic mechanism of persistent HPV-16 infection.', pitfalls: 'Substituting nonspecific proto-oncogene activation, telomerase upregulation or HER2 overexpression for the defining E6/E7 tumour suppressor effects.',
    type: 'mechanism', micro: 'Viral carcinogenesis', nano: 'High-risk HPV', article: carcinogenArticle, source: neo3, teachPage: 56, teach: 'High-risk HPV E6 and E7 proteins bind p53 and RB respectively.',
    subject: 'HPV-16 E6 and E7', predicate: 'promote oncogenesis by inhibiting', object: 'p53 and RB', display: 'HPV-16 E6 and E7 promote oncogenesis by inhibiting p53 and RB.', page: 13, pageLabel: 'p13', difficulty: 'Moderate', effort: 'Medium', reasoning: 1, inferred: 59,
    stem: 'A 33-year-old woman with persistent HPV-16 infection undergoes a cervical biopsy. What is the most likely mechanism of oncogenesis?', keyLetter: 'B', options: ['Activation of proto-oncogenes', 'E6 and E7-mediated inhibition of p53 and RB', 'Upregulation of telomerase', 'Overexpression of HER2'],
    clue: 'high-risk HPV expresses E6 and E7 oncoproteins', reasons: ['generic proto-oncogene activation does not identify the defining high-risk HPV mechanism', 'E6 and E7 disable p53 and RB tumour suppressor pathways respectively', 'telomerase can support cellular immortality but is not the specific mechanism tested for persistent HPV-16', 'HER2 overexpression is not the characteristic oncogenic action of HPV E6 and E7'],
  },
  {
    ref: 'C19', key: 'pathology.carcinogen.hbv-integration-hcc', label: 'HBV integration into host DNA contributes to hepatocellular carcinoma risk', aliases: ['HBV-associated hepatocellular carcinoma', 'Oncogenic HBV integration'],
    definition: 'Chronic hepatitis B infection increases hepatocellular carcinoma risk through chronic inflammatory injury and viral effects that include integration of HBV DNA into the host genome. Integration can disturb genomic regulation and contribute to malignant transformation without requiring direct lysis of hepatocytes.', objective: 'Identify oncogenic viral integration into host DNA as the tested mechanism linking chronic HBV infection with hepatocellular carcinoma.', pitfalls: 'Choosing direct viral lysis, mismatch-repair deficiency or isolated MYC overexpression when chronic HBV infection is the defining exposure.',
    type: 'mechanism', micro: 'Viral carcinogenesis', nano: 'Hepatitis B virus', article: carcinogenArticle, source: neo3, teachPage: 54, teach: 'Oncogenic DNA viruses, including HBV, may integrate their genomes into the host genome.',
    subject: 'HBV integration into host DNA', predicate: 'contributes to the risk of', object: 'hepatocellular carcinoma', display: 'HBV integration into host DNA contributes to the risk of hepatocellular carcinoma.', page: 14, pageLabel: 'pp13–14', difficulty: 'Hard', effort: 'High', reasoning: 2, inferred: 70,
    stem: 'A 50-year-old man presents with jaundice and weight loss. He has chronic hepatitis B infection. Which of the following best explains his risk for hepatocellular carcinoma?', keyLetter: 'A', options: ['Oncogenic viral integration into host DNA', 'Overexpression of MYC oncogene', 'Direct viral lysis of hepatocytes', 'DNA mismatch repair deficiency'],
    clue: 'the chronic oncogenic DNA-virus infection can integrate viral DNA into the host genome', reasons: ['oncogenic viral integration is the tested mechanism linking HBV with hepatocellular carcinoma risk', 'MYC overexpression alone does not explain the risk conferred by chronic HBV infection in this vignette', 'direct viral lysis does not account for the oncogenic mechanism tested here', 'mismatch-repair deficiency underlies a different cancer-predisposition pathway and is not the characteristic HBV mechanism'],
  },
]

for (const row of rows) {
  row.id = idFor(row.key)
  row.claim = `CLM-HU102-F5P4-${row.ref}-01`
  row.currCit = row.source ? `CIT-HU102-F5P4-${row.ref}-CURR` : null
  row.asmCit = `CIT-HU102-F5P4-${row.ref}-ASM`
  row.span = `SPN-HU102-F5P4-${row.ref}-01`
}

const uniqueConceptRows = rows.filter((row, index) => rows.findIndex((item) => item.key === row.key) === index)
const byRef = Object.fromEntries(rows.map((row) => [row.ref, row]))
const qid = (row) => `Q-HU102-PAT-NEO-F5-${row.ref}`
const questionIdsFor = (row) => rows.filter((item) => item.key === row.key).map(qid)
const relatedMap = {
  A22: ['C14'], A23: ['C18'], B15: ['B16', 'C16', 'C17'], B16: ['B15'], C14: ['C16'],
  C16: ['C14', 'B15'], C17: ['C18', 'B15'], C18: ['C19', 'C17', 'A23'], C19: ['C18'],
}

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
${row.article === suppressorArticle ? carcinogenArticle : suppressorArticle}
## related_concept_ids
${relatedMap[row.ref].map((ref) => byRef[ref].id).filter((id, index, list) => list.indexOf(id) === index).join('\n')}
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
0.82
## academic_relevance
0.97
## weight_confidence
0.55
## exam_signal
${assessment} | tier-3 solved local study bank | undated | PDF ${row.pageLabel} ${rows.filter((item) => item.key === row.key).map((item) => item.ref).join('/')} | printed key; not an official exam
## confidence
0.92
## atomic_claim_ids
${row.claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
${row.teach ? `[Teaching p${row.teachPage}] ${row.teach}\n` : ''}${rows.filter((item) => item.key === row.key).map((item) => `[Solved ${item.pageLabel} ${item.ref}] ${item.stem} Answer: ${item.keyLetter}) ${item.options['ABCD'.indexOf(item.keyLetter)]}.`).join('\n')}
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent medical verification and Helwan faculty review remain required before publication.${row.source ? '' : ' No separate current Helwan teaching-page support was located for this exact association.'}
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
mergeIds: No merge occurred; the exact canonical scope is represented once in this slice.
rejectedMergeCandidateIds: No rival same-scope concept survived triage.
lastReviewed: New record; no faculty review has occurred.
reviewDue: Set after first faculty review.
exclusionReason: Not excluded; held at needs_evidence.
`

const explain = (row, index) => {
  const correctIndex = 'ABCD'.indexOf(row.keyLetter)
  if (index === correctIndex) {
    return `${row.options[index]} is correct because ${row.reasons[index]}. The decisive clue is that ${row.clue}. This identifies the most specific mechanism, syndrome or exposure association in the item. Nearby cancer pathways should not replace the relationship explicitly established by the vignette.`
  }
  return `${row.options[index]} does not fit because ${row.reasons[index]}. The decisive clue is that ${row.clue}, which supports ${row.options[correctIndex]}. This option belongs to a different mechanism, syndrome or exposure pattern. Matching the named gene, infection or carcinogen to its characteristic consequence prevents this distractor from replacing the correct answer.`
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
${row.options.map((option, index) => `## answer_${'abcd'[index]}\n${option}\n## explanation_${'abcd'[index]}\n${explain(row, index)}`).join('\n')}
## topic
General pathology
## subtopic
${row.micro}
## difficulty
${row.difficulty}
## question_type
Clinical application
## main_concept
${row.id}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Neoplasia > ${row.micro}
## clinical_relevance
0.82
## academic_relevance
0.97
## cognitive_effort_score
0.6
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
Stem, option order and printed key are preserved exactly. No official sitting, marks or recurrence claim is inferred.${row.source ? '' : ' This record remains at needs_evidence because no separate current Helwan teaching-page support was located for the exact association.'}
## estimated_seconds
75
## randomise_answers
yes
`

const suppressorRows = uniqueConceptRows.filter((row) => row.article === suppressorArticle)
const carcinogenRows = uniqueConceptRows.filter((row) => row.article === carcinogenArticle)

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
${subset.flatMap(questionIdsFor).join('\n')}
## resource_ids
${[...new Set(subset.flatMap((row) => [assessment, row.source]).filter(Boolean))].join('\n')}
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
${subset.map((row) => `### ${row.display}\nClaims: ${row.claim}\nCitations: ${[row.currCit, row.asmCit].filter(Boolean).join(', ')}\nSpan: ${row.span}`).join('\n\n')}
## article_source_ids
${[...new Set(subset.flatMap((row) => [assessment, row.source]).filter(Boolean))].join('\n')}
## claim_ids
${subset.map((row) => row.claim).join('\n')}
## span_ids
${subset.map((row) => row.span).join('\n')}
## publication_gate
needs_evidence
## evidence_basis
Current HU-BMS-102 Neoplasia teaching pages where an exact local teaching statement was located.
Tier-3 solved local Family-5 bank, pp6 and pp9–14, with visibly printed keys.
## evidence_gaps
Independent medical verification and Helwan faculty review remain required before publication. The asbestos–mesothelioma and PTEN–Cowden associations have only the governed assessment source in this bounded slice.
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

const articles = [
  article({
    id: suppressorArticle,
    title: 'Tumour angiogenesis and inherited tumour suppressor syndromes',
    aliases: ['Angiogenic growth and tumour suppressor loss', 'APC, PTEN and RB cancer predisposition'],
    micro: 'Tumour growth and suppressor genes', nano: 'VEGF, APC, PTEN and RB', subset: suppressorRows, other: carcinogenArticle,
    summary: 'Tumours sustain growth by recruiting vessels and by escaping tumour suppressor control. VEGF promotes angiogenesis, while inherited APC, PTEN and RB defects produce characteristic tumour-predisposition patterns.',
    sections: `### Definition
Tumour growth depends on both positive growth signals and loss of protective restraints. ${byRef.A22.display} Tumour suppressor syndromes arise when inherited loss-of-function susceptibility is followed by further loss in vulnerable cells.

### Mechanism
APC regulates growth signalling in colorectal epithelium, PTEN restrains proliferative signalling, and RB controls cell-cycle entry. ${byRef.C14.display} The affected gene determines the characteristic tissue pattern rather than producing one interchangeable hereditary-cancer phenotype.

### Key determinants
${byRef.B15.display} ${byRef.B16.display} ${byRef.C16.display} The childhood retinoblastoma–later osteosarcoma pairing is especially useful because both tumours fall within the RB-associated spectrum.

### Clinical significance
Read the named gene before the tumour list: APC points to colorectal polyposis, PTEN to Cowden syndrome, and RB to retinoblastoma with osteosarcoma risk. For angiogenesis, distinguish a direct vascular growth factor from alterations that primarily affect adhesion, apoptosis or cell-cycle restraint.`,
    loses: ['Calling an APC mutation Lynch syndrome instead of familial adenomatous polyposis.', 'Using TP53 to explain the characteristic retinoblastoma–osteosarcoma pairing when RB is offered.', 'Treating loss of E-cadherin as a direct pro-angiogenic factor.'],
    notes: 'The repeated APC scope in B15 and C15 is represented by one concept and two exact source questions. The questionable-key items A01 and A16 remain outside this slice.',
  }),
  article({
    id: carcinogenArticle,
    title: 'Environmental and infectious carcinogenesis',
    aliases: ['Chemical, bacterial and viral cancer risks', 'Asbestos, Helicobacter, HPV and HBV'],
    micro: 'Carcinogenesis', nano: 'Environmental and infectious causes', subset: carcinogenRows, other: suppressorArticle,
    summary: 'Carcinogens produce recognisable exposure–tumour and mechanism–tumour pairings. Asbestos is linked to mesothelioma, chronic Helicobacter pylori to gastric adenocarcinoma, high-risk HPV to p53/RB inhibition, and HBV integration to hepatocellular carcinoma risk.',
    sections: `### Definition
Environmental and infectious carcinogens increase cancer risk through different mechanisms. ${byRef.A23.display} ${byRef.C17.display}

### Mechanism
Persistent infection can drive chronic injury or deliver viral oncogenic functions. ${byRef.C18.display} ${byRef.C19.display} HPV disables two central tumour suppressor pathways, whereas HBV can alter host genomic regulation through integration and also sustains chronic hepatic injury.

### Key determinants
The named exposure identifies the most specific pairing. Asbestos points to a serosal malignancy, H. pylori to gastric malignancy, HPV-16 to E6/E7 effects, and chronic HBV to hepatocellular carcinoma risk.

### Clinical significance
Do not collapse all carcinogens into generic DNA damage. Separate an occupational fibre exposure, a chronic bacterial gastric infection and two oncogenic DNA-virus mechanisms. This preserves the mechanism that each vignette is asking the learner to recognise.`,
    loses: ['Selecting a generic carcinoma instead of mesothelioma after asbestos exposure.', 'Linking Helicobacter pylori to hepatocellular rather than gastric carcinoma.', 'Calling direct viral lysis the oncogenic mechanism of chronic HBV infection.'],
    notes: 'No separate current Helwan teaching page was located for the exact asbestos–mesothelioma association, so that scope remains explicitly at needs_evidence.',
  }),
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
${row.source ? '0.92' : '0.82'}
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
authority: ${row.source ? 'current local curriculum plus auxiliary printed key' : 'auxiliary printed key only in this bounded slice'}; source wording and scope retained
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
${[row.currCit, row.asmCit].filter(Boolean).join('\n')}
`

const relationDefs = [
  ['A22', 'associated_with', 'C14', 'angiogenic growth and loss of cell-cycle restraint are distinct cooperating cancer capabilities'],
  ['B15', 'contrasts_with', 'B16', 'APC-associated colorectal polyposis differs from the PTEN-associated Cowden phenotype'],
  ['C14', 'prerequisite_of', 'C16', 'recognising RB as a tumour suppressor supports the inherited retinoblastoma–osteosarcoma risk pattern'],
  ['B15', 'contrasts_with', 'C17', 'inherited APC predisposition differs from acquired infection-associated gastric carcinogenesis'],
  ['A23', 'contrasts_with', 'C18', 'an occupational fibre carcinogen differs from oncogenic viral protein action'],
  ['C17', 'contrasts_with', 'C18', 'chronic bacterial inflammatory carcinogenesis differs from high-risk HPV oncoprotein action'],
  ['C18', 'associated_with', 'C19', 'HPV and HBV are oncogenic DNA viruses with distinct tissue targets and mechanisms'],
]

const relation = ([sourceRef, type, targetRef, note]) => `# Item
## source
${byRef[sourceRef].id}
## type
${type}
## target
${byRef[targetRef].id}
## evidence_claim_ids
${byRef[sourceRef].claim}
${byRef[targetRef].claim}
## citation_ids
${[byRef[sourceRef].currCit, byRef[sourceRef].asmCit, byRef[targetRef].currCit, byRef[targetRef].asmCit].filter(Boolean).join('\n')}
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
  ['concept/HU-BMS-102-pathology-family5-part4-concepts.md', uniqueConceptRows.map(concept).join('\n---\n\n')],
  ['article/HU-BMS-102-pathology-family5-part4-articles.md', articles],
  ['question/HU-BMS-102-pathology-family5-part4-mcq.md', rows.map(question).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family5-part4-claims.md', uniqueConceptRows.map(claim).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family5-part4-citations.md', uniqueConceptRows.map(citations).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family5-part4-spans.md', uniqueConceptRows.map(span).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family5-part4-relations.md', relationDefs.map(relation).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

const citationsCount = uniqueConceptRows.reduce((count, row) => count + (row.source ? 2 : 1), 0)
console.log(JSON.stringify({
  family: '5-part4',
  released: { articles: 2, concepts: uniqueConceptRows.length, questions: rows.length, sources: 0, claims: uniqueConceptRows.length, citations: citationsCount, spans: uniqueConceptRows.length, relations: relationDefs.length },
  remaining: { routineKeyed: 21, questionableKeyed: 2 },
  questionableDeferred: ['A01', 'A16'],
  sourceRefs: rows.map((row) => row.ref),
}, null, 2))
