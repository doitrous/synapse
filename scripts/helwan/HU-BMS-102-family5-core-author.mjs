import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const assessment = 'src_eda268c7a75eb1930662'
const neo1 = 'src_7ce8b4c740464632c3de'
const neo4 = 'src_8e574a175cfd0e454cf3'

const cid = (key) => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const concepts = [
  {
    ref: 'A07', key: 'pathology.neoplasm.sarcoma-malignant-mesenchymal-origin',
    label: 'A sarcoma is a malignant neoplasm of mesenchymal origin', aliases: ['Sarcoma nomenclature', 'Malignant mesenchymal tumour'],
    definition: 'A sarcoma is a malignant neoplasm derived from mesenchymal tissue. The suffix does not describe every mesenchymal proliferation: benign mesenchymal tumours usually retain the tissue name plus “-oma”, whereas malignant counterparts use “sarcoma”.',
    objective: 'Classify a malignant mesenchymal neoplasm as a sarcoma.', pitfalls: 'Calling every mesenchymal tumour a sarcoma, or using carcinoma for a malignant neoplasm of mesenchymal origin.',
    type: 'classification', micro: 'Tumour nomenclature', nano: 'Sarcoma', article: 'ART-HU-BMS102-PAT-NEOPLASM-CLASSIFICATION', relatedArticle: 'ART-HU-BMS102-PAT-CANCER-GENE-CLASSES',
    source: neo1, page: 31, lectureQuote: 'Mesenchymal tumors. Benign forms – fibroma, leiomyoma. Malignant forms – sarcoma, eg fibrosarcoma, leiomyosarcoma.',
    claimSubject: 'Sarcoma', predicate: 'is classified as', claimObject: 'a malignant neoplasm of mesenchymal origin', display: 'A malignant neoplasm of mesenchymal origin is classified as a sarcoma.',
  },
  {
    ref: 'A09', key: 'pathology.neoplasm.teratoma-totipotential-germ-layers',
    label: 'Teratoma arises from totipotential germ cells and contains multiple germ-layer tissues', aliases: ['Teratoma classification', 'Totipotential germ-cell tumour'],
    definition: 'A teratoma is a germ-cell neoplasm derived from totipotential cells and composed of tissues representing more than one germ layer. The Family-5 assessment frames the classic example as containing elements from all three germ layers.',
    objective: 'Recognise a tumour containing tissues from all three germ layers as a teratoma.', pitfalls: 'Confusing a teratoma with a hamartoma, which is a disorganised overgrowth of tissues native to the site.',
    type: 'classification', micro: 'Tumour nomenclature', nano: 'Teratoma', article: 'ART-HU-BMS102-PAT-NEOPLASM-CLASSIFICATION', relatedArticle: 'ART-HU-BMS102-PAT-CANCER-GENE-CLASSES',
    source: neo1, page: 34, lectureQuote: 'Teratoma — From Totipotential cells (gonads), > one germ layer.',
    claimSubject: 'Teratoma', predicate: 'arises from', claimObject: 'totipotential germ cells and contains tissues from multiple germ layers', display: 'A teratoma arises from totipotential germ cells and contains tissues from multiple germ layers.',
  },
  {
    ref: 'A10', key: 'pathology.neoplasm.grade-degree-of-differentiation',
    label: 'Tumour grade is principally based on degree of differentiation', aliases: ['Histological tumour grade', 'Tumour differentiation grade'],
    definition: 'Tumour grade describes how closely neoplastic cells and architecture resemble the normal parent tissue. In this module, degree of differentiation is the principal grading feature used to estimate biological aggressiveness.',
    objective: 'Identify degree of differentiation as the principal feature used to grade a tumour.', pitfalls: 'Substituting tumour size, nodal disease or distant metastasis for grade; those belong to staging rather than histological differentiation.',
    type: 'assessment principle', micro: 'Tumour assessment', nano: 'Grade', article: 'ART-HU-BMS102-PAT-NEOPLASM-CLASSIFICATION', relatedArticle: 'ART-HU-BMS102-PAT-CANCER-GENE-CLASSES',
    source: neo1, page: 19, lectureQuote: 'Tumors are often “graded” as to how closely they resemble the normal parent tissue that they are derived from.',
    claimSubject: 'Tumour grade', predicate: 'is principally based on', claimObject: 'the degree of differentiation', display: 'Tumour grade is principally based on the degree of differentiation.',
  },
  {
    ref: 'A12', key: 'pathology.cancer-gene.tp53-tumor-suppressor-example',
    label: 'TP53 is a tumour-suppressor gene', aliases: ['p53 tumour suppressor', 'TP53 anti-oncogene example'],
    definition: 'TP53 is a tumour-suppressor gene. The Family-5 question tests gene-class recognition: TP53 belongs to the growth-restraining tumour-suppressor class, unlike KRAS, MYC and HER2, which are presented as growth-promoting oncogenic examples.',
    objective: 'Recognise TP53 as an example of a tumour-suppressor gene.', pitfalls: 'Treating every cancer-associated gene as an oncogene, or confusing the gene name TP53 with the p53 protein product.',
    type: 'classification', micro: 'Molecular carcinogenesis', nano: 'TP53', article: 'ART-HU-BMS102-PAT-CANCER-GENE-CLASSES', relatedArticle: 'ART-HU-BMS102-PAT-NEOPLASM-CLASSIFICATION',
    source: neo4, page: 20, lectureQuote: 'Tumor suppressor genes. Retinoblastoma gene (Rb); P53; DCC; APC gene.',
    claimSubject: 'TP53', predicate: 'is an example of', claimObject: 'a tumour-suppressor gene', display: 'TP53 is an example of a tumour-suppressor gene.',
  },
  {
    ref: 'A14', key: 'pathology.neoplasm.tnm-tumor-node-metastasis-components',
    label: 'TNM staging records primary tumour, regional nodes and distant metastasis', aliases: ['TNM components', 'Tumour-node-metastasis staging'],
    definition: 'TNM is an anatomical staging system in which T records the primary tumour, N records regional lymph-node involvement and M records distant metastasis. It describes extent of spread rather than microscopic differentiation.',
    objective: 'State the three components represented by the TNM staging system.', pitfalls: 'Using degree of differentiation as a TNM component, or treating grade and stage as interchangeable.',
    type: 'classification', micro: 'Tumour assessment', nano: 'TNM stage', article: 'ART-HU-BMS102-PAT-NEOPLASM-CLASSIFICATION', relatedArticle: 'ART-HU-BMS102-PAT-CANCER-GENE-CLASSES',
    source: neo1, page: 28, lectureQuote: 'Staging is based on the size of the primary lesion, lymph node affection and the presence or absence of distant metastases. Many systems are used for staging; the most accepted include the TNM system.',
    claimSubject: 'TNM staging', predicate: 'records', claimObject: 'primary tumour, regional lymph-node involvement and distant metastasis', display: 'TNM staging records the primary tumour, regional lymph-node involvement and distant metastasis.',
  },
  {
    ref: 'A25', key: 'pathology.cancer-gene.oncogene-activated-proto-oncogene',
    label: 'An oncogene is an activated growth-promoting proto-oncogene', aliases: ['Oncogene definition', 'Activated proto-oncogene'],
    definition: 'An oncogene is a mutated or otherwise activated proto-oncogene whose product drives persistent cell growth or proliferation. Activation can alter protein structure or increase production of an otherwise normal growth-promoting product.',
    objective: 'Define an oncogene as an activated growth-promoting proto-oncogene.', pitfalls: 'Calling tumour-suppressor genes oncogenes, or implying that every normal gene involved in growth is already an oncogene.',
    type: 'definition', micro: 'Molecular carcinogenesis', nano: 'Oncogenes', article: 'ART-HU-BMS102-PAT-CANCER-GENE-CLASSES', relatedArticle: 'ART-HU-BMS102-PAT-NEOPLASM-CLASSIFICATION',
    source: neo4, page: 15, lectureQuote: 'Mutated proto-oncogenes are called oncogenes and their products are called oncoproteins. Mutation may lead to an abnormal oncoprotein or excess production of a normal protein product.',
    claimSubject: 'Oncogene', predicate: 'is', claimObject: 'an activated proto-oncogene that drives persistent cell growth or proliferation', display: 'An oncogene is an activated proto-oncogene that drives persistent cell growth or proliferation.',
  },
].map((item) => ({ ...item, id: cid(item.key), claim: `CLM-HU102-F5-${item.ref}-01`, span: `SPN-HU102-F5-${item.ref}-01`, lectureCitation: `CIT-HU102-F5-${item.ref}-CURR`, assessmentCitation: `CIT-HU102-F5-${item.ref}-ASM` }))

const byRef = Object.fromEntries(concepts.map((c) => [c.ref, c]))

const questions = [
  {
    ref: 'A07', page: 2, stem: 'A malignant tumor of mesenchymal origin is best classified as a:', key: 'B', options: ['Carcinoma', 'Sarcoma', 'Teratoma', 'Adenoma'],
    ex: [
      'Carcinoma denotes a malignant epithelial neoplasm, not one of mesenchymal origin. The module separates epithelial carcinoma nomenclature from mesenchymal sarcoma nomenclature. The tissue of origin therefore makes this option incorrect.',
      'Sarcoma is the malignant-tumour term for mesenchymal origin. The local Neoplasia 1 lecture lists malignant mesenchymal forms as sarcomas, and Family-5 A07 prints option B. The key classification cue is mesenchymal origin.',
      'A teratoma arises from totipotential germ cells and may contain tissues from several germ layers. That mixed germ-cell origin is different from a malignant mesenchymal lineage. The stem gives no germ-cell or mixed-tissue cue.',
      'Adenoma is a benign epithelial neoplasm, commonly with glandular differentiation. It is neither malignant nor mesenchymal by nomenclature. Both parts of the stem therefore exclude this option.',
    ], objective: 'Classify malignant mesenchymal neoplasms by standard tumour nomenclature.', topic: 'Neoplasia — nomenclature', difficulty: 'Easy', type: 'Classification', effort: 'Low', level: 1, seconds: 45,
  },
  {
    ref: 'A09', page: 3, stem: 'A tumor arising from totipotent germ cells that contains elements from all three germ layers is best classified as:', key: 'C', options: ['Hamartoma', 'Choriocarcinoma', 'Teratoma', 'Lymphoma'],
    ex: [
      'A hamartoma is a disorganised overgrowth of mature tissues normally present at the site. It is not defined by totipotent germ-cell origin or representation of all three germ layers. The developmental cue in the stem points elsewhere.',
      'Choriocarcinoma is a malignant trophoblastic neoplasm rather than the general mixed-tissue germ-cell tumour described here. The stem emphasises totipotential cells and all three germ layers, not trophoblastic differentiation. That distinction excludes this option.',
      'A teratoma arises from totipotential germ cells and contains tissues from multiple germ layers. The teaching lecture states the totipotential origin, while Family-5 A09 specifies all three germ layers and prints option C. Those are the defining clues in this item.',
      'Lymphoma is a malignant neoplasm of lymphoid cells. It does not arise from totipotential germ cells or contain a mixture of germ-layer derivatives. The lineage and morphology in the stem are incompatible with lymphoma.',
    ], objective: 'Recognise the defining origin and tissue composition of a teratoma.', topic: 'Neoplasia — nomenclature', difficulty: 'Easy', type: 'Definition', effort: 'Low', level: 1, seconds: 45,
  },
  {
    ref: 'A10', page: 3, stem: 'Which grading feature is most predictive of tumor aggressiveness?', key: 'B', options: ['Tumor necrosis', 'Cellular differentiation', 'Degree of encapsulation', 'Presence of stromal components'],
    ex: [
      'Tumour necrosis can accompany rapid growth or inadequate blood supply, but it is not the principal grading feature in this question. The module defines grade by resemblance to the normal parent tissue. Necrosis may contribute in particular grading schemes without replacing differentiation here.',
      'Cellular differentiation describes how closely tumour cells and architecture resemble their tissue of origin. The Neoplasia 1 lecture uses this resemblance to define grading, and Family-5 A10 prints option B. Poor differentiation generally signals more aggressive biological behaviour in this module framework.',
      'Encapsulation helps distinguish a circumscribed benign growth pattern from infiltrative behaviour, but it is not the grading feature requested. Grade is a microscopic assessment centred on differentiation. A tumour border cannot substitute for that cellular comparison.',
      'Stroma supports a tumour and varies among neoplasms, yet its mere presence does not define grade. The assessment asks for the feature most predictive within the taught grading model. Degree of differentiation is the keyed criterion.',
    ], objective: 'Distinguish histological grade from other tumour features.', topic: 'Neoplasia — grade and stage', difficulty: 'Moderate', type: 'Assessment principle', effort: 'Medium', level: 2, seconds: 60,
  },
  {
    ref: 'A12', page: 3, stem: 'Which of the following is an example of a tumor suppressor gene?', key: 'B', options: ['KRAS', 'TP53', 'MYC', 'HER2'],
    ex: [
      'KRAS is used as a proto-oncogene/oncogene example in molecular carcinogenesis. Activating alterations promote signalling rather than place KRAS in the tumour-suppressor class. The stem asks for a growth-restraining gene class, so KRAS is not the keyed answer.',
      'TP53 is a tumour-suppressor gene. The local Neoplasia 4 lecture lists P53 under tumour-suppressor genes, and Family-5 A12 prints option B. This item tests gene-class recognition rather than a specific mutation mechanism.',
      'MYC is a growth-promoting transcription-factor proto-oncogene and becomes oncogenic when dysregulated. It is not classified as a tumour-suppressor gene. Choosing it reverses the two major cancer-gene categories being tested.',
      'HER2 is a growth-factor-receptor proto-oncogene whose amplification or overexpression can provide a proliferative signal. It is not a tumour-suppressor gene. The source contrasts such oncogenic drivers with TP53.',
    ], objective: 'Recognise TP53 as a tumour-suppressor gene.', topic: 'Neoplasia — molecular basis', difficulty: 'Easy', type: 'Classification', effort: 'Low', level: 1, seconds: 45,
  },
  {
    ref: 'A14', page: 4, stem: 'The TNM system is used to classify tumors based on:', key: 'C', options: ['Degree of differentiation', 'Molecular markers', 'Tumor size, lymph node involvement, and metastases', 'Rate of growth'],
    ex: [
      'Degree of differentiation is a grading variable rather than the basis of TNM staging. Grade asks how closely a tumour resembles its parent tissue. TNM instead records anatomical extent of disease.',
      'Molecular markers may guide diagnosis, prognosis or treatment in specific cancers, but they are not the three components encoded by TNM. The letters refer to anatomical categories. The stem therefore does not ask for a molecular classification.',
      'TNM records the primary tumour, regional lymph-node involvement and distant metastasis. The local lecture describes staging by primary-lesion size, nodal affection and distant spread, and Family-5 A14 prints option C. This is the source-defined anatomical staging framework.',
      'Rate of growth is a kinetic property and is not one of the TNM letters. A rapidly growing tumour can still have different T, N and M categories depending on its extent. Growth rate therefore cannot replace anatomical stage.',
    ], objective: 'State the anatomical components of the TNM staging system.', topic: 'Neoplasia — grade and stage', difficulty: 'Easy', type: 'Classification', effort: 'Low', level: 1, seconds: 45,
  },
  {
    ref: 'A25', page: 7, stem: 'Which of the following best describes oncogenes?', key: 'B', options: ['Normal genes involved in apoptosis', 'Mutated genes promoting uncontrolled cell growth', 'Tumor suppressor genes', 'Genes regulating immune response'],
    ex: [
      'Normal genes can participate in apoptosis without being oncogenes. An oncogene is an activated form of a growth-promoting proto-oncogene, not any normal gene with a cell-survival role. The description is therefore too broad and mechanistically different.',
      'Oncogenes are mutated or otherwise activated proto-oncogenes whose products drive persistent growth or proliferation. The Neoplasia 4 lecture states that mutated proto-oncogenes are oncogenes, and Family-5 A25 prints option B. The assessment wording summarises their growth-promoting consequence.',
      'Tumour-suppressor genes restrain proliferation or preserve growth control and are a distinct cancer-gene class. Loss of their function is not the definition of an oncogene. This option confuses two opposing categories.',
      'Genes regulating immune responses can influence tumour biology, but that function alone does not define an oncogene. The module definition centres on activation of proto-oncogenes and persistent proliferative signalling. Immune regulation is therefore outside the tested definition.',
    ], objective: 'Define oncogenes in relation to proto-oncogenes and growth promotion.', topic: 'Neoplasia — molecular basis', difficulty: 'Easy', type: 'Definition', effort: 'Low', level: 1, seconds: 45,
  },
]

const qid = (ref) => `Q-HU102-PAT-NEO-F5-${ref}`
const articleQuestions = (id) => questions.filter((q) => byRef[q.ref].article === id).map((q) => qid(q.ref))
const articleConcepts = (id) => concepts.filter((c) => c.article === id)

const sourceItems = `# Item
## id
${neo1}
## title
Main-stream Neoplasia 1 — BMS-102
## institution
Faculty of Medicine, Helwan University
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Pathology/Theoretical/Lec 8 - Neoplasia 1/main-stream-neoplasia-1-2026.pptx.pdf
## media_type
application/pdf
## languages
en
## page_count
59
## sha256
7ce8b4c740464632c3de7dbd2bb079440e63953ebfd982893027068b365c99a0
## processing_status
pending
## rights
Local university teaching material held for internal authoring only; no page image is redistributed.
## qualification
Current dated HU-BMS-102 theoretical teaching lecture, 14 March 2026. It establishes local curriculum wording, not independent medical verification.
## is_assessment
no

---

# Item
## id
${neo4}
## title
Mainstream Neoplasia 4 — BMS-102
## institution
Faculty of Medicine, Helwan University
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Pathology/Theoretical/Lec 13 - Neoplasia 4/mainstream neoplasia 4 2026.pdf
## media_type
application/pdf
## languages
en
## page_count
67
## sha256
8e574a175cfd0e454cf3e36546f44f446a8dc4070d3a682dd23dc6ac27a0cf86
## processing_status
pending
## rights
Local university teaching material held for internal authoring only; no page image is redistributed.
## qualification
Current dated HU-BMS-102 theoretical teaching lecture, 19 April 2026. It establishes local curriculum wording, not independent medical verification.
## is_assessment
no

---

# Item
## id
${assessment}
## title
General neoplasia continuous-assessment bank — solved copy
## institution
Helwan BMS-102 local corpus; visible institutional attribution absent
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Pathology/Questions/MCQs/MCQs - College MCQs continous assessement neoplasia answer.pdf
## media_type
application/pdf
## languages
en
## page_count
14
## sha256
eda268c7a75eb1930662b241c7b167f3a3ae3b62503cc9e5c67d6cb31ab059cd
## processing_status
pending
## rights
Local assessment-labelled material held for internal authoring only; no page image is redistributed.
## qualification
Tier-3 solved local study bank with 62 prompt and printed-answer occurrences. It has no authenticated sitting, marks, candidate field or official-key designation; printed keys remain auxiliary assessment evidence only.
## is_assessment
yes
`

const conceptItem = (c, i) => {
  const neighbours = [concepts[(i + 1) % concepts.length].id]
  return `# Item
## label
${c.label}
## id
${c.id}
## canonical_key
${c.key}
## aliases
${c.aliases.join('\n')}
## arabic_label

## arabic_aliases

## definition
${c.definition}
## explicit_objective
${c.objective}
## pitfalls
${c.pitfalls}
## concept_type
${c.type}
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
${c.micro}
## nanotopic
${c.nano}
## modules
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Neoplasia > ${c.micro}
## universities
hu
## learner_years
1
## article_ids
${c.article}
## related_article_ids
${c.relatedArticle}
## related_concept_ids
${neighbours.join('\n')}
## resource_ids
${c.source}
${assessment}
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.78
## exam_weight_by_year
HU_Y1=0.78
## clinical_relevance
0.65
## academic_relevance
0.96
## weight_confidence
0.55
## exam_signal
${assessment} | tier-3 solved local study bank | undated | PDF p${questions.find((q) => q.ref === c.ref).page} ${c.ref} | printed key; not an official exam
## confidence
0.94
## atomic_claim_ids
${c.claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
[Teaching p${c.page}] ${c.lectureQuote}
[Solved p${questions.find((q) => q.ref === c.ref).page} ${c.ref}] ${questions.find((q) => q.ref === c.ref).stem} Answer: ${questions.find((q) => q.ref === c.ref).key}) ${questions.find((q) => q.ref === c.ref).options['ABCD'.indexOf(questions.find((q) => q.ref === c.ref).key)]}.
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
[clear]
## evidence_gaps
Independent medical verification and Helwan faculty review remain required before publication.
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
mergeIds: No merge occurred.
rejectedMergeCandidateIds: No rival same-scope concept survived triage.
lastReviewed: New record; no faculty review has occurred.
reviewDue: Set after first faculty review.
exclusionReason: Not excluded; held at needs_evidence.
`
}

const questionItem = (q) => {
  const c = byRef[q.ref]
  const opts = q.options.map((o, i) => `## answer_${'abcd'[i]}\n${o}\n## explanation_${'abcd'[i]}\n${q.ex[i]}`).join('\n')
  return `# Item
## id
${qid(q.ref)}
## title
${q.stem}
## subject
fnd
## status
Draft
## owner
Helwan Year-1 authoring lane
## vignette

## question
${q.stem}
## format
single best answer
## derived_from

## correct_answer
${q.key}
${opts}
## topic
General pathology
## subtopic
${q.topic}
## difficulty
${q.difficulty}
## question_type
${q.type}
## main_concept
${c.id}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > ${q.topic}
## clinical_relevance
0.65
## academic_relevance
0.96
## cognitive_effort_score
${q.level === 1 ? '0.3' : '0.5'}
## exam_weight_by_year
HU_Y1=0.78
## question_only_for
HU_Y1
## concept_ids
${c.id}
## years
HU_Y1
## universities
hu
## cognitive_effort
${q.effort}
## setting
Academic
## reasoning_level
${q.level}
## inferred_difficulty
${q.level === 1 ? '80' : '65'}
## exam_relevance
8
## contextual_concept_ids

## library_ids
${c.article}
## resource_ids
${assessment}
${c.source}
## learning_objective
${q.objective}
## media_recommendations

## source_citation
${assessment}, PDF p${q.page}, Family-5 ${q.ref}: four options A–D and visibly printed key ${q.key}. Teaching support: ${c.source}, PDF p${c.page}. Authority: tier-3 solved local study bank, not an official exam or official key.
## attachments

## attached_image

## author_notes
The stem, option order and printed key are preserved exactly. No official sitting, marks or recurrence claim is inferred.
## estimated_seconds
${q.seconds}
## randomise_answers
yes
`
}

const commonArticleTail = (id, related, summary, sections, conceptsForArticle, hold, lose, evidenceBasis, notes) => `# Item
## id
${id}
## title
${summary.title}
## arabic_title

## aliases
${summary.aliases.join('\n')}
## subject
fnd
## topic
General pathology
## subtopic
Neoplasia
## microtopic
${summary.micro}
## nanotopic
${summary.nano}
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
7
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
${summary.text}
## sections
${sections}
## published_summary

## published_sections

## hold_these
${hold.join('\n')}
## lose_the_mark
${lose.join('\n')}
## related_concepts
${conceptsForArticle.map((c) => c.id).join('\n')}
## related_articles
${related}
## question_ids
${articleQuestions(id).join('\n')}
## resource_ids
${[...new Set(conceptsForArticle.flatMap((c) => [c.source, assessment]))].join('\n')}
## universities
hu
## years
HU_Y1
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Neoplasia > ${summary.micro}
## university_notes
hu: Restricted to HU-BMS-102 Year-1; solved Family 5 supplies assessment signal but no official-exam authority.
## annotations
${conceptsForArticle.map((c) => `### definition_of · ${c.id}\nQuote: ${c.display}\nBlock: body`).join('\n\n')}
## media

## media_recommendations

## callout_evidence
${conceptsForArticle.map((c) => `### ${c.display}\nClaims: ${c.claim}\nCitations: ${c.lectureCitation}, ${c.assessmentCitation}\nSpan: ${c.span}`).join('\n\n')}
## article_source_ids
${[...new Set(conceptsForArticle.flatMap((c) => [c.source, assessment]))].join('\n')}
## claim_ids
${conceptsForArticle.map((c) => c.claim).join('\n')}
## span_ids
${conceptsForArticle.map((c) => c.span).join('\n')}
## publication_gate
needs_evidence
## evidence_basis
${evidenceBasis.join('\n')}
## evidence_gaps
Independent medical verification and Helwan faculty review remain required before publication.
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
mediaRecommendations: No visual is required for these classification relationships.
lastReviewed: New draft; no faculty review has occurred.
reviewDue: Set only after first faculty review.
`

const article1 = commonArticleTail(
  'ART-HU-BMS102-PAT-NEOPLASM-CLASSIFICATION', 'ART-HU-BMS102-PAT-CANCER-GENE-CLASSES',
  { title: 'Neoplasm classification, grade and TNM stage', aliases: ['Tumour nomenclature and staging', 'Grade versus stage'], micro: 'Tumour classification', nano: 'Nomenclature, grade and stage', text: 'Neoplasm terminology answers three different questions: what lineage produced the tumour, how closely it resembles its parent tissue, and how far it has spread. Sarcoma and teratoma are lineage-based categories, grade is centred on differentiation, and TNM stage records primary tumour, regional nodes and distant metastasis.' },
  `### Definition
Tumour names encode lineage. A malignant neoplasm of mesenchymal origin is classified as a sarcoma. Examples in the lecture include fibrosarcoma and leiomyosarcoma. A teratoma arises from totipotential germ cells and contains tissues from multiple germ layers. It is therefore a germ-cell category rather than simply another mesenchymal tumour.

### Mechanism
Tumour grade is principally based on the degree of differentiation. Grade is a microscopic description of resemblance to the normal parent tissue: well-differentiated tumours preserve more of the expected cellular appearance and architecture, whereas poorly differentiated and anaplastic tumours show progressively less resemblance.

### Key determinants
TNM staging records the primary tumour, regional lymph-node involvement and distant metastasis. These anatomical categories answer a different question from grade. A tumour can be well differentiated yet anatomically advanced, or poorly differentiated while still confined.

### Clinical significance
First identify the operation in the stem. “Origin” asks for nomenclature, “resemblance” asks for grade, and “size, nodes and metastasis” asks for stage. This sequence prevents a frequent error: using differentiation as a TNM component or using spread as a grading feature.`,
  articleConcepts('ART-HU-BMS102-PAT-NEOPLASM-CLASSIFICATION'),
  articleConcepts('ART-HU-BMS102-PAT-NEOPLASM-CLASSIFICATION').map((c) => c.display),
  ['Calling carcinoma a mesenchymal malignancy.', 'Using tumour size or metastasis as the definition of grade.', 'Treating grade and stage as interchangeable.'],
  ['Current HU-BMS-102 Neoplasia 1 lecture, pp19, 28, 31 and 34.', 'Tier-3 solved local Family-5 bank, pp2–4, with visibly printed keys.'],
  'The article separates source-supported classification operations and does not add tumour-specific prognostic thresholds.'
)

const article2 = commonArticleTail(
  'ART-HU-BMS102-PAT-CANCER-GENE-CLASSES', 'ART-HU-BMS102-PAT-NEOPLASM-CLASSIFICATION',
  { title: 'Cancer-gene classes: oncogenes and tumour-suppressor genes', aliases: ['Oncogene versus tumour suppressor', 'TP53 gene-class review'], micro: 'Molecular carcinogenesis', nano: 'Oncogenes and tumour suppressors', text: 'Cancer-gene classification separates activated growth-promoting proto-oncogenes from tumour-suppressor genes whose normal role restrains proliferation or preserves growth control. The Family-5 assessment uses oncogene definition and TP53 recognition to test that contrast.' },
  `### Definition
Cancer-gene classification separates growth-promoting oncogenes from tumour-suppressor genes. TP53 is an example of a tumour-suppressor gene. Its category is therefore different from the growth-promoting genes presented as distractors in the Family-5 item.

### Mechanism
An oncogene is an activated proto-oncogene that drives persistent cell growth or proliferation. The local lecture states that mutated proto-oncogenes are oncogenes and their products are oncoproteins. Activation can change a protein's structure or increase production of a normal protein product.

### Key determinants
The Family-5 key condenses the oncogene definition into “mutated genes promoting uncontrolled cell growth.” The assessment contrasts TP53 with KRAS, MYC and HER2, which are used as oncogenic examples. The questions test gene-class recognition and do not require inventing a tumour-specific mutation.

### Clinical significance
Ask whether a change adds a persistent growth signal or removes a restraint. An activated proto-oncogene is an oncogene; loss of tumour-suppressor function removes a brake. Do not label every cancer-associated gene an oncogene, and keep the TP53 gene distinct from its p53 protein product.`,
  articleConcepts('ART-HU-BMS102-PAT-CANCER-GENE-CLASSES'),
  articleConcepts('ART-HU-BMS102-PAT-CANCER-GENE-CLASSES').map((c) => c.display),
  ['Calling every cancer-associated gene an oncogene.', 'Calling KRAS, MYC or HER2 tumour-suppressor genes in this question.', 'Using TP53 and p53 as though gene and protein were the same label.'],
  ['Current HU-BMS-102 Neoplasia 4 lecture, pp15–16 and 19–20.', 'Tier-3 solved local Family-5 bank, pp3 and 7, with visibly printed keys.'],
  'The article limits itself to the gene-class distinction supported by the local lecture and does not infer patient-specific testing or treatment.'
)

const claimItem = (c) => `# Item
## id
${c.claim}
## concept_id
${c.id}
## subject
${c.claimSubject}
## predicate
${c.predicate}
## object
${c.claimObject}
## display_text
${c.display}
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.94
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
authority: current local curriculum plus auxiliary printed key; independent verification pending
`

const citationItems = (c) => {
  const q = questions.find((item) => item.ref === c.ref)
  return `# Item
## id
${c.lectureCitation}
## claim_id
${c.claim}
## resource_id
${c.source}
## evidence_role
local_curriculum
## support_span
${c.lectureQuote}
## locator_type
page
## locator_page
${c.page}
## locator_section
${c.micro}
## locator_detail
PDF p${c.page}, direct teaching statement used for Family-5 ${c.ref}
## context_note
Local curriculum evidence; punctuation and British spelling are normalised only in authored prose.
## confidence
0.94
## counts_as_claim_evidence
no

---

# Item
## id
${c.assessmentCitation}
## claim_id
${c.claim}
## resource_id
${assessment}
## evidence_role
auxiliary_assessment
## support_span
${q.stem} Answer: ${q.key}) ${q.options['ABCD'.indexOf(q.key)]}.
## locator_type
page
## locator_page
${q.page}
## locator_section
Family 5 ${c.ref}
## locator_detail
Solved PDF p${q.page}, four options A–D and visibly printed answer
## context_note
Tier-3 solved local study-bank evidence only; not an official exam or authenticated official key.
## confidence
0.92
## counts_as_claim_evidence
no
`
}

const spanItem = (c) => `# Item
## id
${c.span}
## article_id
${c.article}
## section_id
${c.article.toLowerCase()}-${c.micro.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}
## text
${c.display}
## claim_ids
${c.claim}
## citation_ids
${c.lectureCitation}
${c.assessmentCitation}
`

const relationPairs = [
  ['A07', 'contrasts_with', 'A09', ['A07', 'A09'], 'classification: sarcoma and teratoma describe different cellular origins'],
  ['A10', 'contrasts_with', 'A14', ['A10', 'A14'], 'assessment: grade measures differentiation, whereas TNM stage measures anatomical extent'],
  ['A12', 'contrasts_with', 'A25', ['A12', 'A25'], 'gene class: TP53 is a tumour suppressor, whereas an oncogene is an activated growth-promoting proto-oncogene'],
]
const relationItem = ([s, type, t, refs, qualifier]) => `# Item
## source
${byRef[s].id}
## type
${type}
## target
${byRef[t].id}
## evidence_claim_ids
${refs.map((r) => byRef[r].claim).join('\n')}
## citation_ids
${refs.flatMap((r) => [byRef[r].lectureCitation, byRef[r].assessmentCitation]).join('\n')}
## verification_status
needs_evidence
## confidence
0.9
## qualifiers
${qualifier}
## reviewer
Medical team, Helwan Pathology faculty
`

const files = new Map([
  ['evidence/HU-BMS-102-pathology-family5-core-sources.md', sourceItems],
  ['concept/HU-BMS-102-pathology-family5-core-concepts.md', concepts.map(conceptItem).join('\n---\n\n')],
  ['question/HU-BMS-102-pathology-family5-core-mcq.md', questions.map(questionItem).join('\n---\n\n')],
  ['article/HU-BMS-102-pathology-family5-core-articles.md', `${article1}\n---\n\n${article2}`],
  ['evidence/HU-BMS-102-pathology-family5-core-claims.md', concepts.map(claimItem).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family5-core-citations.md', concepts.map(citationItems).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family5-core-spans.md', concepts.map(spanItem).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family5-core-relations.md', relationPairs.map(relationItem).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const out = join(root, relative)
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, `${body.trim()}\n`)
}

console.log(JSON.stringify({ family: 5, released: { articles: 2, concepts: concepts.length, questions: questions.length, sources: 3, claims: concepts.length, citations: concepts.length * 2, spans: concepts.length, relations: relationPairs.length }, held: { keyedQuestions: 62 - questions.length } }, null, 2))
