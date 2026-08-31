import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const assessment = 'src_eda268c7a75eb1930662'
const neo5 = 'src_771db2e7413e8f717ff1'
const markerArticle = 'ART-HU-BMS102-PAT-TUMOUR-MARKERS-HAEMATOLOGIC'
const paraneoArticle = 'ART-HU-BMS102-PAT-PARANEOPLASTIC-SYNDROMES'
const idFor = (key) => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const rows = [
  {
    ref: 'A06', key: 'pathology.tumor-marker.afp-hepatocellular-carcinoma', label: 'AFP is a tumour marker associated with hepatocellular carcinoma', aliases: ['Alpha-fetoprotein in hepatocellular carcinoma', 'AFP liver-cancer marker'],
    definition: 'Alpha-fetoprotein is an oncofetal antigen that can be elevated in hepatocellular carcinoma and some germ-cell tumours. It can support diagnosis and follow-up in the appropriate context but is not a stand-alone primary diagnostic test.', objective: 'Identify alpha-fetoprotein as the tumour marker most associated with hepatocellular carcinoma among the listed options.', pitfalls: 'Choosing PSA, CA-125 or CEA without matching the marker to its characteristic tumour association, or treating AFP as independently diagnostic.',
    type: 'risk association', micro: 'Tumour markers', nano: 'AFP and hepatocellular carcinoma', article: markerArticle, teachPage: 14, teach: 'Alpha-fetoprotein is listed as an oncofetal antigen associated with liver cell cancer and germ-cell tumours.',
    subject: 'Alpha-fetoprotein', predicate: 'is associated with', object: 'hepatocellular carcinoma', display: 'Alpha-fetoprotein is associated with hepatocellular carcinoma.', page: 2, difficulty: 'Easy', effort: 'Low', reasoning: 1, inferred: 35,
    stem: 'Which of the following tumor markers is most associated with hepatocellular carcinoma?', keyLetter: 'C', options: ['CEA', 'PSA', 'α-Fetoprotein (AFP)', 'CA-125'], clue: 'the question asks for the characteristic serum-marker association with hepatocellular carcinoma',
    reasons: ['CEA is used in several carcinomas but is less specifically associated with hepatocellular carcinoma in this option set', 'PSA is associated with prostatic tissue and prostate cancer rather than hepatocellular carcinoma', 'AFP is the oncofetal marker associated with hepatocellular carcinoma', 'CA-125 is most commonly associated with ovarian epithelial malignancy rather than hepatocellular carcinoma'],
  },
  {
    ref: 'A15', key: 'pathology.paraneoplastic.systemic-effects-tumor-secretions', label: 'Paraneoplastic syndromes are remote systemic effects of tumour-derived mediators', aliases: ['Paraneoplastic syndrome definition', 'Remote systemic tumour effects'],
    definition: 'Paraneoplastic syndromes are symptom complexes in people with cancer that are not explained by local tumour invasion or metastasis. They often result from ectopic mediator production or immune cross-reactivity and may precede recognition of the tumour.', objective: 'Distinguish a paraneoplastic syndrome from local invasion, metastasis and an unrelated secondary malignancy.', pitfalls: 'Calling direct compression or metastatic disease paraneoplastic, or assuming every remote effect is caused only by secreted hormone.',
    type: 'definition', micro: 'Paraneoplastic syndromes', nano: 'Definition and mechanism', article: paraneoArticle, teachPage: 9, teach: 'Paraneoplastic syndromes are symptoms not directly related to tumour spread or to hormones indigenous to the tumour tissue.',
    subject: 'Paraneoplastic syndromes', predicate: 'produce', object: 'remote systemic effects not caused by local invasion or metastasis', display: 'Paraneoplastic syndromes produce remote systemic effects not caused by local invasion or metastasis.', page: 4, difficulty: 'Moderate', effort: 'Medium', reasoning: 1, inferred: 52,
    stem: 'Which of the following best describes paraneoplastic syndromes?', keyLetter: 'C', options: ['Localized effects of tumor invasion', 'Symptoms resulting from immune response to the tumor', 'Systemic effects due to tumor-secreted substances', 'Secondary malignancies from metastases'], clue: 'a paraneoplastic syndrome is a remote systemic manifestation rather than a local or metastatic effect',
    reasons: ['localised effects of tumour invasion are direct tumour effects and therefore are not paraneoplastic', 'immune cross-reactivity can cause some paraneoplastic syndromes, but this option is narrower than the keyed systemic secretory description', 'systemic effects from tumour-derived substances fit the keyed paraneoplastic mechanism', 'metastases are direct spread of the primary malignancy rather than a paraneoplastic syndrome'],
  },
  {
    ref: 'B07', key: 'pathology.neuroendocrine.carcinoid-syndrome-chromogranin', label: 'Flushing, diarrhoea and wheeze with a chromogranin-positive intestinal tumour indicate carcinoid tumour', aliases: ['Carcinoid syndrome diagnostic pattern', 'Chromogranin-positive intestinal neuroendocrine tumour'],
    definition: 'A well-differentiated intestinal neuroendocrine tumour may produce vasoactive mediators and cause carcinoid syndrome. Episodic flushing, diarrhoea and bronchospasm or wheeze, together with chromogranin-positive neuroendocrine morphology, support a carcinoid tumour.', objective: 'Recognise a carcinoid tumour from the syndrome pattern and chromogranin-positive intestinal neuroendocrine cells.', pitfalls: 'Choosing a stromal or glandular tumour despite neuroendocrine staining, or using small-cell carcinoma merely because it is neuroendocrine.',
    type: 'diagnostic pattern', micro: 'Neuroendocrine neoplasia', nano: 'Carcinoid syndrome', article: markerArticle,
    subject: 'Flushing, diarrhoea and wheeze with a chromogranin-positive intestinal neuroendocrine tumour', predicate: 'support', object: 'carcinoid tumour', display: 'Flushing, diarrhoea and wheeze with a chromogranin-positive intestinal neuroendocrine tumour support carcinoid tumour.', page: 8, difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 62,
    stem: 'A 59-year-old male presents with flushing, diarrhea, and wheezing. A biopsy of a small intestinal mass shows nests of neuroendocrine cells positive for chromogranin A. What is the most likely diagnosis?', keyLetter: 'B', options: ['Gastrointestinal stromal tumor', 'Carcinoid tumor', 'Adenocarcinoma', 'Small cell carcinoma'], clue: 'the intestinal mass is neuroendocrine and accompanies flushing, diarrhoea and wheeze',
    reasons: ['a gastrointestinal stromal tumour is mesenchymal and does not explain the chromogranin-positive syndrome pattern', 'the clinical mediator syndrome and neuroendocrine staining support a carcinoid tumour', 'adenocarcinoma shows glandular epithelial differentiation rather than this neuroendocrine syndrome pattern', 'small-cell carcinoma is a high-grade neuroendocrine carcinoma and is not the best fit for this intestinal carcinoid-syndrome vignette'],
  },
  {
    ref: 'B08', key: 'pathology.hematologic.hodgkin-reed-sternberg', label: 'Reed–Sternberg cells with B symptoms and painless lymphadenopathy indicate Hodgkin lymphoma', aliases: ['Hodgkin lymphoma diagnostic pattern', 'Reed–Sternberg cell association'],
    definition: 'Classical Hodgkin lymphoma is characterised by diagnostic Reed–Sternberg cells in an appropriate inflammatory background. Painless lymphadenopathy accompanied by fever, night sweats or weight loss provides the characteristic clinical setting.', objective: 'Recognise Hodgkin lymphoma from Reed–Sternberg cells with painless lymphadenopathy and systemic B symptoms.', pitfalls: 'Choosing non-Hodgkin lymphoma without the defining cell pattern, or confusing a marrow plasma-cell neoplasm with nodal Hodgkin lymphoma.',
    type: 'diagnostic pattern', micro: 'Haematolymphoid neoplasia', nano: 'Hodgkin lymphoma', article: markerArticle,
    subject: 'Reed–Sternberg cells with B symptoms and painless lymphadenopathy', predicate: 'indicate', object: 'Hodgkin lymphoma', display: 'Reed–Sternberg cells with B symptoms and painless lymphadenopathy indicate Hodgkin lymphoma.', page: 8, difficulty: 'Easy', effort: 'Low', reasoning: 1, inferred: 38,
    stem: 'A 45-year-old man presents with fatigue, night sweats, and painless lymphadenopathy. Lymph node biopsy reveals Reed-Sternberg cells. What is the most likely diagnosis?', keyLetter: 'A', options: ['Hodgkin lymphoma', 'Non-Hodgkin lymphoma', 'Multiple myeloma', 'Chronic lymphocytic leukemia'], clue: 'the lymph-node biopsy contains Reed–Sternberg cells',
    reasons: ['Reed–Sternberg cells in this nodal and systemic setting support Hodgkin lymphoma', 'non-Hodgkin lymphomas comprise other lymphoid neoplasms and are not defined by Reed–Sternberg cells', 'multiple myeloma is a plasma-cell neoplasm centred in marrow and does not fit the lymph-node biopsy', 'chronic lymphocytic leukaemia is a mature B-cell neoplasm and does not produce the defining Reed–Sternberg pattern'],
  },
  {
    ref: 'B09', key: 'pathology.hematologic.multiple-myeloma-m-spike-plasma-cells', label: 'Bone pain, recurrent infections, an M-spike and marrow plasma cells indicate multiple myeloma', aliases: ['Multiple myeloma diagnostic pattern', 'M-protein plasma-cell neoplasm'],
    definition: 'Multiple myeloma is a clonal plasma-cell neoplasm that commonly produces a monoclonal immunoglobulin detected as an M-spike. Marrow plasma-cell infiltration, bone pain and impaired normal immunoglobulin production with recurrent infection form a characteristic diagnostic pattern.', objective: 'Recognise multiple myeloma from bone pain, recurrent infection, an M-spike and marrow plasma-cell infiltration.', pitfalls: 'Choosing a leukaemia without the plasma-cell and monoclonal-protein pattern, or confusing IgM-associated Waldenström macroglobulinaemia with typical myeloma.',
    type: 'diagnostic pattern', micro: 'Haematolymphoid neoplasia', nano: 'Multiple myeloma', article: markerArticle, teachPage: 14, teach: 'M-protein is listed as an immunoglobulin tumour marker produced in multiple myeloma.',
    subject: 'Bone pain, recurrent infections, an M-spike and marrow plasma-cell infiltration', predicate: 'indicate', object: 'multiple myeloma', display: 'Bone pain, recurrent infections, an M-spike and marrow plasma-cell infiltration indicate multiple myeloma.', page: 8, difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 61,
    stem: 'A 68-year-old man presents with bone pain and recurrent infections. Serum protein electrophoresis shows an M-spike. Bone marrow biopsy reveals plasma cell infiltration. What is the most likely diagnosis?', keyLetter: 'C', options: ['Chronic myeloid leukemia', 'Acute lymphoblastic leukemia', 'Multiple myeloma', 'Waldenström macroglobulinemia'], clue: 'the case combines an M-spike with marrow plasma-cell infiltration and bone symptoms',
    reasons: ['chronic myeloid leukaemia is a myeloid neoplasm and does not produce this plasma-cell and M-spike pattern', 'acute lymphoblastic leukaemia is a precursor lymphoid neoplasm rather than a monoclonal plasma-cell disorder', 'multiple myeloma explains the monoclonal protein, marrow plasma cells, bone pain and infection susceptibility', 'Waldenström macroglobulinaemia produces an IgM lymphoplasmacytic pattern and is not the best match for the stated marrow plasma-cell and bone presentation'],
  },
  {
    ref: 'B10', key: 'pathology.paraneoplastic.lambert-eaton-lung-cancer', label: 'Lambert–Eaton syndrome can be a paraneoplastic manifestation of lung cancer', aliases: ['Lung-cancer-associated Lambert–Eaton syndrome', 'Paraneoplastic neuromuscular weakness'],
    definition: 'Lambert–Eaton myasthenic syndrome is a presynaptic neuromuscular-junction disorder caused by antibodies against voltage-gated calcium channels. It may occur as a paraneoplastic syndrome, especially with small-cell lung carcinoma, and presents with weakness with autonomic or ocular features.', objective: 'Identify Lambert–Eaton syndrome as the paraneoplastic diagnosis associated with weakness and a lung mass in the supplied vignette.', pitfalls: 'Choosing myasthenia gravis without accounting for the lung mass, or substituting Horner or Guillain–Barré syndromes for a neuromuscular-junction disorder.',
    type: 'risk association', micro: 'Paraneoplastic syndromes', nano: 'Lambert–Eaton syndrome', article: paraneoArticle,
    subject: 'Lambert–Eaton syndrome', predicate: 'can occur as', object: 'a lung-cancer-associated paraneoplastic syndrome', display: 'Lambert–Eaton syndrome can occur as a lung-cancer-associated paraneoplastic syndrome.', page: 9, difficulty: 'Hard', effort: 'High', reasoning: 2, inferred: 72,
    stem: 'A 55-year-old man with a history of smoking presents with weakness and ptosis that worsens throughout the day. Imaging reveals a lung mass. What is the most likely underlying cause of his symptoms?', keyLetter: 'A', options: ['Lambert-Eaton syndrome', 'Myasthenia gravis', 'Guillain-Barré syndrome', 'Horner syndrome'], clue: 'the neuromuscular symptoms occur in a smoker with a lung mass',
    reasons: ['the lung-mass association supports the keyed Lambert–Eaton paraneoplastic diagnosis', 'myasthenia gravis can cause fatigable weakness but does not account for the keyed paraneoplastic lung-mass association', 'Guillain–Barré syndrome is an acute peripheral neuropathy and does not match this lung-associated neuromuscular-junction pattern', 'Horner syndrome causes ptosis with sympathetic denervation signs but does not explain the generalised weakness pattern tested here'],
  },
  {
    ref: 'B11', key: 'pathology.paraneoplastic.pthrp-lung-hypercalcemia', label: 'PTHrP secretion can cause paraneoplastic hypercalcaemia in lung cancer', aliases: ['Humoral hypercalcaemia of malignancy', 'Lung-cancer PTHrP syndrome'],
    definition: 'Tumour production of parathyroid hormone-related protein can increase bone resorption and renal calcium retention, producing humoral hypercalcaemia of malignancy. In a patient with a lung mass and no bone metastases, PTHrP is a key paraneoplastic mechanism.', objective: 'Identify PTHrP secretion as the cause of hypercalcaemia associated with a lung mass when bone metastases are absent.', pitfalls: 'Choosing SIADH for hypercalcaemia, or assuming that all malignant hypercalcaemia requires skeletal metastasis.',
    type: 'mechanism', micro: 'Paraneoplastic syndromes', nano: 'PTHrP hypercalcaemia', article: paraneoArticle,
    subject: 'Tumour secretion of PTHrP', predicate: 'causes', object: 'paraneoplastic hypercalcaemia', display: 'Tumour secretion of PTHrP causes paraneoplastic hypercalcaemia.', page: 9, difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 63,
    stem: 'A 50-year-old woman presents with unexplained hypercalcemia. CT scan reveals a lung mass. Which of the following paraneoplastic syndromes is most likely responsible for her condition?', keyLetter: 'C', options: ['Syndrome of inappropriate ADH secretion', 'Hypercoagulability', 'PTHrP-mediated hypercalcemia', 'Cushing’s syndrome'], clue: 'the abnormality is hypercalcaemia in a patient with a lung mass',
    reasons: ['SIADH causes water retention and hyponatraemia rather than hypercalcaemia', 'hypercoagulability is a recognised paraneoplastic effect but does not explain the elevated calcium', 'PTHrP-mediated humoral hypercalcaemia explains the biochemical abnormality', 'Cushing syndrome reflects excess glucocorticoid action rather than this calcium disturbance'],
  },
  {
    ref: 'C11', key: 'pathology.paraneoplastic.pthrp-lung-hypercalcemia', page: 12, difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 63,
    stem: 'A 55-year-old smoker presents with lethargy, confusion, and hypercalcemia. No bone metastases are seen on imaging. Which paraneoplastic syndrome is most likely responsible?', keyLetter: 'C', options: ['SIADH', 'ACTH secretion', 'PTHrP secretion', 'Hypoglycemia'], clue: 'hypercalcaemia occurs despite the absence of bone metastases',
    reasons: ['SIADH causes hyponatraemia rather than hypercalcaemia', 'ectopic ACTH causes Cushing syndrome and does not directly explain this calcium pattern', 'PTHrP secretion produces humoral hypercalcaemia without requiring bone metastases', 'hypoglycaemia is a different paraneoplastic metabolic effect and does not explain the elevated calcium'],
  },
  {
    ref: 'C12', key: 'pathology.paraneoplastic.siadh-lung-hyponatremia', label: 'SIADH can cause hyponatraemia in a patient with lung cancer', aliases: ['Lung-cancer-associated SIADH', 'Paraneoplastic ADH secretion'],
    definition: 'Ectopic antidiuretic hormone production by a lung malignancy, classically small-cell carcinoma, can produce the syndrome of inappropriate ADH secretion. Water retention lowers serum sodium despite preserved renal function.', objective: 'Identify SIADH as the paraneoplastic cause of hyponatraemia in a patient with lung cancer and normal kidney function.', pitfalls: 'Choosing PTHrP or hypercalcaemia of malignancy for a low-sodium presentation, or equating preserved renal function with absence of water-balance disturbance.',
    type: 'mechanism', micro: 'Paraneoplastic syndromes', nano: 'SIADH and hyponatraemia', article: paraneoArticle,
    subject: 'Ectopic ADH production in lung cancer', predicate: 'can cause', object: 'SIADH with hyponatraemia', display: 'Ectopic ADH production in lung cancer can cause SIADH with hyponatraemia.', page: 12, difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 60,
    stem: 'A 65-year-old man with lung cancer presents with hyponatremia and normal kidney function. Which of the following is the most likely cause?', keyLetter: 'B', options: ['Parathyroid hormone-related protein (PTHrP)', 'Syndrome of inappropriate ADH (SIADH)', 'Cushing syndrome', 'Hypercalcemia of malignancy'], clue: 'the central biochemical abnormality is hyponatraemia with preserved renal function in lung cancer',
    reasons: ['PTHrP causes hypercalcaemia rather than hyponatraemia', 'SIADH causes inappropriate water retention and dilutional hyponatraemia', 'Cushing syndrome reflects excess glucocorticoid action and does not best explain this isolated sodium disturbance', 'hypercalcaemia of malignancy raises calcium and is not the cause of the stated hyponatraemia'],
  },
  {
    ref: 'C13', key: 'pathology.paraneoplastic.hcc-erythropoietin-polycythemia', label: 'Erythropoietin production by hepatocellular carcinoma can cause polycythaemia', aliases: ['HCC-associated erythrocytosis', 'Paraneoplastic erythropoietin production'],
    definition: 'Some hepatocellular carcinomas produce erythropoietin ectopically. Increased erythropoietin stimulates red-cell production and can cause secondary polycythaemia as a paraneoplastic manifestation.', objective: 'Identify increased erythropoietin production as the cause of polycythaemia in a patient with hepatocellular carcinoma.', pitfalls: 'Choosing marrow invasion, haemolysis or haemodilution when the finding is increased red-cell mass driven by a tumour-derived hormone.',
    type: 'mechanism', micro: 'Paraneoplastic syndromes', nano: 'Erythropoietin and polycythaemia', article: paraneoArticle,
    subject: 'Erythropoietin production by hepatocellular carcinoma', predicate: 'can cause', object: 'secondary polycythaemia', display: 'Erythropoietin production by hepatocellular carcinoma can cause secondary polycythaemia.', page: 12, difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 59,
    stem: 'A 59-year-old woman with hepatocellular carcinoma develops polycythemia. Which of the following is the most likely cause?', keyLetter: 'A', options: ['Increased erythropoietin production', 'Direct invasion of bone marrow', 'Autoimmune hemolysis', 'Hemodilution'], clue: 'the tumour is hepatocellular carcinoma and the blood finding is polycythaemia',
    reasons: ['ectopic erythropoietin production stimulates erythropoiesis and explains the polycythaemia', 'bone-marrow invasion would impair rather than selectively increase red-cell production', 'autoimmune haemolysis destroys erythrocytes and causes anaemia rather than polycythaemia', 'haemodilution lowers measured cell concentration and cannot explain polycythaemia'],
  },
]

const unique = rows.filter((row, index) => rows.findIndex((item) => item.key === row.key) === index)
const full = Object.fromEntries(unique.map((row) => [row.key, row]))
for (const row of rows) {
  const own = { ...row }
  Object.assign(row, full[row.key], own)
}
for (const row of unique) {
  row.id = idFor(row.key)
  row.claim = `CLM-HU102-F5P5-${row.ref}-01`
  row.currCit = row.teach ? `CIT-HU102-F5P5-${row.ref}-CURR` : null
  row.span = `SPN-HU102-F5P5-${row.ref}-01`
}
for (const row of rows) {
  row.id = full[row.key].id
  row.claim = full[row.key].claim
  row.currCit = full[row.key].currCit
  row.span = full[row.key].span
  row.asmCit = `CIT-HU102-F5P5-${row.ref}-ASM`
}

const byRef = Object.fromEntries(rows.map((row) => [row.ref, row]))
const qid = (row) => `Q-HU102-PAT-NEO-F5-${row.ref}`
const questionsFor = (row) => rows.filter((item) => item.key === row.key)
const citationsFor = (row) => [row.currCit, ...questionsFor(row).map((item) => item.asmCit)].filter(Boolean)
const relatedMap = { A06: ['B09', 'C13'], A15: ['B10', 'B11', 'C12', 'C13'], B07: ['A15'], B08: ['B09'], B09: ['A06', 'B08'], B10: ['A15'], B11: ['A15', 'C12'], C12: ['B11'], C13: ['A06', 'A15'] }

const source = `# Item
## id
${neo5}
## title
Neoplasia 5 — tumour effects, paraneoplastic syndromes and laboratory diagnosis
## institution
Faculty of Medicine, Helwan University
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Pathology/Theoretical/Lec 15 - Neoplasia 5/SMP neoplasia5.pdf
## media_type
application/pdf
## languages
en
## page_count
26
## sha256
771db2e7413e8f717ff1ac81db649431f538e96176c020fef46793d529cb619f
## processing_status
pending
## rights
Local university teaching material held for internal authoring only; no page image is redistributed.
## qualification
Current HU-BMS-102 theoretical lecture for Academic Year 2025/2026, visibly attributed to Nahed Soliman and dated 20 April 2026. It establishes local curriculum wording, not independent medical verification.
## is_assessment
no
`

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
${row.article === markerArticle ? paraneoArticle : markerArticle}
## related_concept_ids
${relatedMap[row.ref].map((ref) => byRef[ref].id).filter((id, i, list) => list.indexOf(id) === i).join('\n')}
## resource_ids
${[assessment, row.teach ? neo5 : null].filter(Boolean).join('\n')}
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
${assessment} | tier-3 solved local study bank | undated | PDF ${questionsFor(row).map((item) => `p${item.page} ${item.ref}`).join(', ')} | printed key; not an official exam
## confidence
${row.teach ? '0.92' : '0.86'}
## atomic_claim_ids
${row.claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
${row.teach ? `[Teaching p${row.teachPage}] ${row.teach}\n` : ''}${questionsFor(row).map((item) => `[Solved p${item.page} ${item.ref}] ${item.stem} Answer: ${item.keyLetter}) ${item.options['ABCD'.indexOf(item.keyLetter)]}.`).join('\n')}
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent medical verification and Helwan faculty review remain required before publication.${row.teach ? '' : ' No separate current Helwan teaching-page statement was located for this exact association.'}
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
  const correctIndex = 'ABCD'.indexOf(row.keyLetter)
  if (index === correctIndex) return `${row.options[index]} is correct because ${row.reasons[index]}. The decisive clue is that ${row.clue}. The finding matches the most specific tumour marker, diagnosis or remote tumour effect in the options. Keeping local tumour effects, metastatic effects and paraneoplastic mechanisms separate prevents an adjacent cancer association from replacing it.`
  return `${row.options[index]} does not fit because ${row.reasons[index]}. The decisive clue is that ${row.clue}, which supports ${row.options[correctIndex]}. This distractor belongs to a different tumour type, marker or systemic mechanism. Matching the clinical pattern and laboratory finding to the narrowest association prevents it from replacing the correct answer.`
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
## resource_ids
${[assessment, row.teach ? neo5 : null].filter(Boolean).join('\n')}
## learning_objective
${row.objective}
## media_recommendations

## source_citation
${assessment}, PDF p${row.page}, Family-5 ${row.ref}: exact stem, options A–D and visibly printed key ${row.keyLetter}.${row.teach ? ` Teaching support: ${neo5}, PDF p${row.teachPage}.` : ''} Authority: tier-3 solved local study bank, not an official exam or official key.
## attachments

## attached_image

## author_notes
Stem, option order and printed key are preserved exactly. No official sitting, marks or recurrence claim is inferred.${row.teach ? '' : ' This record remains at needs_evidence because no separate current Helwan teaching-page statement was located for the exact association.'}
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
${subset.flatMap((row) => questionsFor(row).map(qid)).join('\n')}
## resource_ids
${assessment}
${neo5}
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
${subset.map((row) => `### ${row.display}\nClaims: ${row.claim}\nCitations: ${citationsFor(row).join(', ')}\nSpan: ${row.span}`).join('\n\n')}
## article_source_ids
${assessment}
${neo5}
## claim_ids
${subset.map((row) => row.claim).join('\n')}
## span_ids
${subset.map((row) => row.span).join('\n')}
## publication_gate
needs_evidence
## evidence_basis
Current HU-BMS-102 Neoplasia 5 teaching pages where exact local teaching support was located.
Tier-3 solved local Family-5 bank, pp2, 4, 8, 9 and 12, with visibly printed keys.
## evidence_gaps
Independent medical verification and Helwan faculty review remain required before publication. Several exact syndrome associations have only the governed assessment source in this bounded slice.
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

const markerRows = unique.filter((row) => row.article === markerArticle)
const paraneoRows = unique.filter((row) => row.article === paraneoArticle)
const articles = [
  article({ id: markerArticle, title: 'Tumour markers and selected haematolymphoid diagnoses', aliases: ['AFP, M-protein and diagnostic tumour patterns', 'Neuroendocrine and haematolymphoid recognition'], micro: 'Tumour markers and diagnosis', nano: 'AFP, carcinoid, Hodgkin lymphoma and myeloma', subset: markerRows, other: paraneoArticle,
    summary: 'Tumour markers support diagnosis and follow-up but must be interpreted with morphology and clinical context. AFP supports hepatocellular-carcinoma assessment, an M-spike supports a plasma-cell neoplasm, and specific cellular patterns identify carcinoid tumour and Hodgkin lymphoma.',
    sections: `### Definition
Tumour markers are substances produced by neoplastic cells that can be demonstrated in cells, serum or body fluids. They support diagnosis, therapeutic assessment and follow-up but do not replace tissue diagnosis. ${byRef.A06.display}

### Mechanism
An M-spike reflects a monoclonal immunoglobulin product. ${byRef.B09.display} Neuroendocrine mediator release can produce flushing, diarrhoea and wheeze, while chromogranin supports neuroendocrine differentiation.

### Key determinants
${byRef.B07.display} ${byRef.B08.display} Morphology and the clinical pattern narrow a broad marker association to the most likely diagnosis.

### Clinical significance
Match each clue to its level: AFP and M-protein are laboratory associations, Reed–Sternberg cells are a tissue clue, and carcinoid syndrome combines symptoms with neuroendocrine staining. A marker alone is not proof of malignancy.`,
    loses: ['Treating AFP as a primary diagnostic test rather than supportive evidence.', 'Calling every chromogranin-positive tumour small-cell carcinoma.', 'Ignoring Reed–Sternberg cells when distinguishing Hodgkin lymphoma from other lymphoid neoplasms.'],
    notes: 'The article is restricted to the four exact concepts required by this Part5 assessment slice.' }),
  article({ id: paraneoArticle, title: 'Paraneoplastic syndromes in lung and liver cancer', aliases: ['Remote systemic effects of malignancy', 'PTHrP, SIADH, erythropoietin and Lambert–Eaton syndrome'], micro: 'Paraneoplastic syndromes', nano: 'Neuromuscular and endocrine manifestations', subset: paraneoRows, other: markerArticle,
    summary: 'Paraneoplastic syndromes are remote systemic effects not caused by tumour invasion or metastasis. The selected questions test Lambert–Eaton syndrome, PTHrP-mediated hypercalcaemia, SIADH-associated hyponatraemia and erythropoietin-driven polycythaemia.',
    sections: `### Definition
${byRef.A15.display} The remote effect may result from ectopic mediator production or an immune response against antigens shared by tumour and normal tissue.

### Mechanism
${byRef.B11.display} ${byRef.C12.display} ${byRef.C13.display} These mechanisms produce different biochemical patterns: raised calcium, low sodium or increased red-cell mass.

### Key determinants
${byRef.B10.display} A lung mass with weakness points to a neuromuscular paraneoplastic association; a lung mass with hypercalcaemia points to PTHrP; lung cancer with hyponatraemia points to SIADH.

### Clinical significance
First decide whether the finding is local, metastatic or remote. Then match the remote manifestation to the mediator or immune syndrome. Absence of bone metastases is especially useful when recognising humoral hypercalcaemia.`,
    loses: ['Calling local compression or metastasis a paraneoplastic syndrome.', 'Using SIADH to explain hypercalcaemia rather than hyponatraemia.', 'Calling marrow invasion the cause of erythrocytosis in hepatocellular carcinoma.'],
    notes: 'The questionable-key records A01 and A16 remain deliberately outside this slice.' }),
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
${row.teach ? '0.92' : '0.84'}
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
authority: ${row.teach ? 'current local curriculum plus auxiliary printed key' : 'auxiliary printed key only for the exact association'}; source wording and scope retained
`

const citations = (row) => `${row.teach ? `# Item
## id
${row.currCit}
## claim_id
${row.claim}
## resource_id
${neo5}
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

` : ''}${questionsFor(row).map((item) => `# Item
## id
${item.asmCit}
## claim_id
${row.claim}
## resource_id
${assessment}
## evidence_role
auxiliary_assessment
## support_span
${item.stem} Answer: ${item.keyLetter}) ${item.options['ABCD'.indexOf(item.keyLetter)]}.
## locator_type
page
## locator_page
${item.page}
## locator_section
Family 5 ${item.ref}
## locator_detail
Solved PDF p${item.page}, exact stem, four options A–D and visibly printed answer
## context_note
Tier-3 solved local study-bank evidence only; not an official exam or authenticated official key.
## confidence
0.92
## counts_as_claim_evidence
no
`).join('\n---\n\n')}`

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
${citationsFor(row).join('\n')}
`

const relationDefs = [
  ['A06', 'associated_with', 'C13', 'hepatocellular carcinoma can be associated with AFP as a marker and erythropoietin as a paraneoplastic mediator'],
  ['A15', 'associated_with', 'B10', 'Lambert–Eaton syndrome is a remote neuromuscular manifestation of malignancy'],
  ['A15', 'associated_with', 'B11', 'PTHrP-mediated hypercalcaemia is a remote endocrine manifestation of malignancy'],
  ['B11', 'contrasts_with', 'C12', 'PTHrP raises calcium whereas SIADH lowers sodium through water retention'],
  ['C12', 'contrasts_with', 'C13', 'SIADH causes hyponatraemia whereas erythropoietin causes secondary polycythaemia'],
  ['B08', 'contrasts_with', 'B09', 'Hodgkin lymphoma is a nodal Reed–Sternberg-cell neoplasm whereas myeloma is a marrow plasma-cell neoplasm'],
  ['B07', 'associated_with', 'A15', 'carcinoid mediator release provides a neuroendocrine systemic-syndrome pattern'],
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
${[...new Set([...citationsFor(full[byRef[a].key]), ...citationsFor(full[byRef[b].key])])].join('\n')}
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
  ['evidence/HU-BMS-102-pathology-family5-part5-sources.md', source],
  ['concept/HU-BMS-102-pathology-family5-part5-concepts.md', unique.map(concept).join('\n---\n\n')],
  ['article/HU-BMS-102-pathology-family5-part5-articles.md', articles],
  ['question/HU-BMS-102-pathology-family5-part5-mcq.md', rows.map(question).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family5-part5-claims.md', unique.map(claim).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family5-part5-citations.md', unique.map(citations).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family5-part5-spans.md', unique.map(span).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family5-part5-relations.md', relationDefs.map(relation).join('\n---\n\n')],
])
for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}
console.log(JSON.stringify({ family: '5-part5', released: { articles: 2, concepts: unique.length, questions: rows.length, sources: 1, claims: unique.length, citations: unique.reduce((n, row) => n + citationsFor(row).length, 0), spans: unique.length, relations: relationDefs.length }, remaining: { routineKeyed: 11, questionableKeyed: 2 }, questionableDeferred: ['A01', 'A16'], sourceRefs: rows.map((row) => row.ref) }, null, 2))
