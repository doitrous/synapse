import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const assessment = 'src_eda268c7a75eb1930662'
const neo2 = 'src_1a05cf28311f19f1ef29'
const neo3 = 'src_a9ccc0b353dbbd7670cb'
const morphologyArticle = 'ART-HU-BMS102-PAT-NEOPLASM-MORPHOLOGY'
const spreadArticle = 'ART-HU-BMS102-PAT-METASTASIS-PATTERNS'
const idFor = (key) => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const rows = [
  {
    ref: 'B01', key: 'pathology.tumor.lung-adenocarcinoma-glandular-mucin', label: 'Lung adenocarcinoma forms malignant glands and may produce mucin', aliases: ['Pulmonary adenocarcinoma morphology', 'Gland-forming lung carcinoma'],
    definition: 'Lung adenocarcinoma is an epithelial malignancy showing glandular differentiation and often mucin production. In the Family-5 vignette, malignant gland formation with mucin is the decisive morphology.', objective: 'Recognise lung adenocarcinoma from malignant gland formation and mucin production.', pitfalls: 'Selecting squamous-cell carcinoma despite glandular differentiation, or treating smoking history as more specific than the biopsy morphology.',
    type: 'diagnostic pattern', micro: 'Epithelial tumour morphology', nano: 'Lung adenocarcinoma', article: morphologyArticle, source: neo2, teachPage: 51, teach: 'Classical adenocarcinoma is formed of malignant acini and solid sheets of malignant cells with intervening desmoplastic reaction.',
    subject: 'Lung adenocarcinoma', predicate: 'is identified here by', object: 'malignant gland formation with mucin production', display: 'Lung adenocarcinoma is identified here by malignant gland formation with mucin production.', page: 7,
    stem: 'A 65-year-old smoker presents with a persistent cough and hemoptysis. A lung biopsy reveals malignant cells forming glandular structures with mucin production. Which of the following is the most likely diagnosis?', keyLetter: 'B', options: ['Squamous cell carcinoma', 'Adenocarcinoma', 'Small cell carcinoma', 'Large cell carcinoma'],
    clue: 'the biopsy shows malignant glandular structures with mucin production', reasons: ['squamous differentiation would be supported by keratinisation or intercellular bridges rather than glands and mucin', 'the gland-forming, mucin-producing epithelial morphology is the defining clue', 'small-cell carcinoma is a neuroendocrine pattern rather than a gland-forming mucinous tumour', 'large-cell carcinoma lacks the specific glandular differentiation described in the biopsy'],
  },
  {
    ref: 'B02', key: 'pathology.tumor.endometrial-adenocarcinoma-myometrial-invasion', label: 'Endometrial adenocarcinoma shows atypical endometrial glands invading myometrium', aliases: ['Endometrial carcinoma morphology', 'Myometrial invasion by atypical glands'],
    definition: 'Endometrial adenocarcinoma is a malignant gland-forming tumour of endometrial epithelium. Atypical glands invading the myometrium establish invasive endometrial adenocarcinoma in the Family-5 vignette.', objective: 'Recognise endometrial adenocarcinoma from atypical glandular proliferation with myometrial invasion.', pitfalls: 'Calling a glandular endometrial tumour leiomyosarcoma, or ignoring invasion when distinguishing malignant from non-invasive glandular change.',
    type: 'diagnostic pattern', micro: 'Epithelial tumour morphology', nano: 'Endometrial adenocarcinoma', article: morphologyArticle, source: neo2, teachPage: 50, teach: 'Secretory-protective columnar epithelium includes endometrium; adenocarcinoma arises from secretory epithelium.',
    subject: 'Endometrial adenocarcinoma', predicate: 'is supported by', object: 'atypical endometrial glands invading the myometrium', display: 'Endometrial adenocarcinoma is supported by atypical endometrial glands invading the myometrium.', page: 7,
    stem: 'A 47-year-old woman presents with postmenopausal bleeding. Endometrial biopsy reveals atypical glandular proliferation invading the myometrium. Which of the following is the most likely diagnosis?', keyLetter: 'B', options: ['Leiomyosarcoma', 'Endometrial adenocarcinoma', 'Squamous cell carcinoma', 'Choriocarcinoma'],
    clue: 'the lesion is an atypical glandular proliferation of endometrium invading myometrium', reasons: ['leiomyosarcoma is a malignant smooth-muscle tumour and does not form atypical endometrial glands', 'glandular endometrial origin plus myometrial invasion defines the keyed diagnosis', 'squamous-cell carcinoma would require squamous rather than glandular differentiation', 'choriocarcinoma is a trophoblastic malignancy and is not described by invasive endometrial glands'],
  },
  {
    ref: 'B03', key: 'pathology.tumor.lip-squamous-cell-carcinoma-keratin-pearls', label: 'Squamous-cell carcinoma shows malignant squamous cells with keratin pearls', aliases: ['Keratinising squamous-cell carcinoma', 'Lower-lip SCC morphology'],
    definition: 'Squamous-cell carcinoma is a malignant epithelial tumour with squamous differentiation. Pleomorphic epithelial cells forming keratin pearls are a classic diagnostic pattern in the Family-5 lower-lip vignette.', objective: 'Recognise squamous-cell carcinoma from malignant squamous morphology and keratin pearls.', pitfalls: 'Choosing basal-cell carcinoma or melanoma despite keratin pearls, or treating actinic keratosis as already invasive carcinoma without the malignant morphology.',
    type: 'diagnostic pattern', micro: 'Epithelial tumour morphology', nano: 'Squamous-cell carcinoma', article: morphologyArticle, source: neo2, teachPage: 45, teach: 'Grades of squamous-cell differentiation are reflected by cell nests or keratin pearls; lesser differentiation produces fewer nests.',
    subject: 'Squamous-cell carcinoma', predicate: 'is supported by', object: 'pleomorphic epithelial cells forming keratin pearls', display: 'Squamous-cell carcinoma is supported by pleomorphic epithelial cells forming keratin pearls.', page: 7,
    stem: 'A 62-year-old man presents with a non-healing ulcer on the lower lip. Biopsy shows pleomorphic epithelial cells with keratin pearls. Which of the following is the most likely diagnosis?', keyLetter: 'B', options: ['Basal cell carcinoma', 'Squamous cell carcinoma', 'Actinic keratosis', 'Melanoma'],
    clue: 'the biopsy shows pleomorphic epithelial cells with keratin pearls', reasons: ['basal-cell carcinoma does not produce the squamous keratin-pearl pattern described', 'keratin pearls establish squamous differentiation in the malignant epithelial lesion', 'actinic keratosis is a premalignant keratinocytic lesion rather than the invasive malignant pattern in this vignette', 'melanoma is a melanocytic malignancy and does not form epithelial keratin pearls'],
  },
  {
    ref: 'B04', key: 'pathology.tumor.fibroadenoma-biphasic-breast', label: 'Fibroadenoma is a circumscribed biphasic breast tumour of glands and stroma', aliases: ['Biphasic fibroadenoma', 'Fibroepithelial breast tumour'],
    definition: 'Fibroadenoma is a benign biphasic breast tumour in which glandular elements and fibrous stroma proliferate. A firm, well-circumscribed mass with mixed glandular and stromal proliferation supports the diagnosis.', objective: 'Recognise fibroadenoma from a circumscribed biphasic glandular-and-stromal breast mass.', pitfalls: 'Calling every biphasic breast lesion a phyllodes tumour, or overlooking the benign circumscribed pattern in favour of invasive carcinoma.',
    type: 'diagnostic pattern', micro: 'Mixed tumour morphology', nano: 'Fibroadenoma', article: morphologyArticle, source: neo2, teachPage: 72, teach: 'True mixed tumors include fibroadenoma of the breast, in which both the ducts and fibrous stroma are neoplastic.',
    subject: 'Fibroadenoma', predicate: 'contains', object: 'a circumscribed biphasic proliferation of breast glands and fibrous stroma', display: 'Fibroadenoma contains a circumscribed biphasic proliferation of breast glands and fibrous stroma.', page: 7,
    stem: 'A 32-year-old woman presents with a firm, well-circumscribed breast mass. Histology reveals a mixture of glandular and stromal proliferation. What is the most likely diagnosis?', keyLetter: 'A', options: ['Fibroadenoma', 'Phyllodes tumor', 'Invasive ductal carcinoma', 'Papilloma'],
    clue: 'the mass is well circumscribed and contains both glandular and stromal proliferation', reasons: ['the circumscribed biphasic gland-and-stroma pattern is the source-defined fibroadenoma clue', 'phyllodes tumour is also fibroepithelial but requires its characteristic stromal architecture rather than this generic fibroadenoma pattern', 'invasive ductal carcinoma is malignant and infiltrative rather than a circumscribed biphasic benign mass', 'papilloma is an intraductal papillary epithelial lesion and does not explain the stated stromal proliferation'],
  },
  {
    ref: 'B05', key: 'pathology.tumor.osteosarcoma-sunburst-malignant-osteoid', label: 'Osteosarcoma produces malignant osteoid and may show a sunburst pattern', aliases: ['Osteogenic sarcoma pattern', 'Malignant osteoid tumour'],
    definition: 'Osteosarcoma is a malignant mesenchymal tumour in which malignant cells produce osteoid. In the Family-5 vignette, a distal-femoral lesion with a sunburst pattern and malignant osteoid supplies the diagnostic combination.', objective: 'Recognise osteosarcoma from malignant osteoid production with the stated radiographic pattern.', pitfalls: 'Choosing osteoma despite malignant osteoid, or using age and site alone while ignoring the defining matrix production.',
    type: 'diagnostic pattern', micro: 'Mesenchymal tumour morphology', nano: 'Osteosarcoma', article: morphologyArticle, source: neo2, teachPage: 10, teach: 'The mesenchymal tumour classification pairs osteoma with its malignant counterpart, osteosarcoma.',
    subject: 'Osteosarcoma', predicate: 'is identified here by', object: 'a sunburst distal-femoral lesion with malignant osteoid production', display: 'Osteosarcoma is identified here by a sunburst distal-femoral lesion with malignant osteoid production.', page: 8,
    stem: 'A 20-year-old male presents with a painful swelling in the distal femur. Imaging shows a lytic lesion with a ‘sunburst’ pattern. Histology reveals osteoid production by malignant cells. What is the most likely diagnosis?', keyLetter: 'B', options: ['Osteoma', 'Osteosarcoma', 'Ewing’s sarcoma', 'Fibrosarcoma'],
    clue: 'malignant cells produce osteoid in a distal-femoral lesion with a sunburst pattern', reasons: ['osteoma is benign and does not explain malignant osteoid production', 'malignant osteoid is the defining histological clue for the keyed osteosarcoma diagnosis', 'Ewing’s sarcoma is a small-round-cell tumour and does not produce malignant osteoid', 'fibrosarcoma shows malignant fibroblastic differentiation rather than osteoid production'],
  },
  {
    ref: 'B06', key: 'pathology.tumor.rhabdomyosarcoma-rhabdomyoblast-cross-striations', label: 'Rhabdomyosarcoma shows rhabdomyoblasts with skeletal-muscle differentiation', aliases: ['Embryonal rhabdomyosarcoma morphology', 'Rhabdomyoblast cross-striations'],
    definition: 'Rhabdomyosarcoma is a malignant tumour showing skeletal-muscle differentiation. Rhabdomyoblasts and cross-striations in a child’s orbital mass support the diagnosis in the Family-5 vignette.', objective: 'Recognise rhabdomyosarcoma from rhabdomyoblasts with cross-striations in a paediatric soft-tissue mass.', pitfalls: 'Choosing neuroblastoma or retinoblastoma based on age or orbital location while ignoring skeletal-muscle differentiation.',
    type: 'diagnostic pattern', micro: 'Mesenchymal tumour morphology', nano: 'Rhabdomyosarcoma', article: morphologyArticle, source: neo2, teachPage: 73, teach: 'Embryonal rhabdomyosarcoma is listed among embryonal tumors, with nose and vagina as examples.',
    subject: 'Rhabdomyosarcoma', predicate: 'is supported by', object: 'rhabdomyoblasts with cross-striations in a paediatric soft-tissue mass', display: 'Rhabdomyosarcoma is supported by rhabdomyoblasts with cross-striations in a paediatric soft-tissue mass.', page: 8,
    stem: 'A 10-year-old child presents with a soft tissue mass in the orbit. Histology reveals rhabdomyoblasts with cross-striations. What is the most likely diagnosis?', keyLetter: 'B', options: ['Neuroblastoma', 'Rhabdomyosarcoma', 'Retinoblastoma', 'Leiomyosarcoma'],
    clue: 'the tumour contains rhabdomyoblasts with cross-striations', reasons: ['neuroblastoma shows neuroblastic rather than skeletal-muscle differentiation', 'rhabdomyoblasts and cross-striations identify skeletal-muscle differentiation in the malignant tumour', 'retinoblastoma arises from retinal lineage and does not form rhabdomyoblasts', 'leiomyosarcoma shows smooth-muscle differentiation, for which cross-striations are not the defining feature'],
  },
  {
    ref: 'C01', key: 'pathology.metastasis.colon-liver-portal-hematogenous', label: 'Colon carcinoma reaches the liver haematogenously through portal drainage', aliases: ['Colorectal portal metastasis', 'Colon-to-liver haematogenous spread'],
    definition: 'Colon carcinoma commonly reaches the liver through haematogenous dissemination in portal venous drainage. Multiple liver lesions in a patient with colon cancer therefore support portal-vein haematogenous spread in this assessment.', objective: 'Explain colon-to-liver metastasis through portal haematogenous spread.', pitfalls: 'Choosing transcoelomic or direct spread for multiple hepatic lesions, or stating haematogenous spread without identifying portal drainage.',
    type: 'mechanism', micro: 'Routes of metastasis', nano: 'Portal spread', article: spreadArticle, source: neo3, teachPage: 11, teach: 'Emboli derived from tumors of organs drained by portal blood, including tumors of the gastrointestinal tract, reach the liver.',
    subject: 'Colon carcinoma', predicate: 'commonly reaches the liver by', object: 'haematogenous spread through portal venous drainage', display: 'Colon carcinoma commonly reaches the liver by haematogenous spread through portal venous drainage.', page: 10,
    stem: 'A 63-year-old male with a history of colon cancer presents with jaundice and hepatomegaly. Imaging reveals multiple hypodense lesions in the liver. Which of the following best explains the spread of cancer in this patient?', keyLetter: 'C', options: ['Direct invasion', 'Lymphatic spread', 'Hematogenous spread via the portal vein', 'Transcoelomic spread'],
    clue: 'a gastrointestinal primary has produced multiple liver lesions in the portal drainage territory', reasons: ['direct invasion would require contiguous extension rather than multiple liver deposits', 'lymphatic spread does not best explain this source-defined portal liver pattern', 'portal venous drainage provides the keyed haematogenous route from colon to liver', 'transcoelomic spread seeds serosal cavities rather than explaining multiple intraparenchymal liver lesions'],
  },
  {
    ref: 'C02', key: 'pathology.metastasis.ovarian-transcoelomic-peritoneal', label: 'Ovarian carcinoma can spread transcoelomically across the peritoneal cavity', aliases: ['Ovarian peritoneal seeding', 'Transcoelomic ovarian spread'],
    definition: 'Transcoelomic spread is dissemination across a serous body cavity. Ovarian carcinoma with malignant cells in ascitic peritoneal fluid demonstrates peritoneal transcoelomic spread in the Family-5 vignette.', objective: 'Recognise ovarian-carcinoma peritoneal dissemination as transcoelomic spread.', pitfalls: 'Calling free peritoneal malignant cells haematogenous metastasis, or confusing transcoelomic seeding with direct contiguous extension.',
    type: 'mechanism', micro: 'Routes of metastasis', nano: 'Transcoelomic spread', article: spreadArticle, source: neo3, teachPage: 16, teach: 'Transcoelomic spread occurs through serous cavities from organs covered by serous membranes.',
    subject: 'Ovarian carcinoma', predicate: 'spreads across the peritoneal cavity by', object: 'transcoelomic dissemination', display: 'Ovarian carcinoma spreads across the peritoneal cavity by transcoelomic dissemination.', page: 10,
    stem: 'A 72-year-old woman is diagnosed with ovarian carcinoma. She presents with massive ascites. Cytology of the peritoneal fluid shows malignant epithelial cells. Which mechanism best explains this spread?', keyLetter: 'D', options: ['Direct extension', 'Lymphatic embolization', 'Hematogenous spread', 'Transcoelomic spread'],
    clue: 'malignant epithelial cells are present in ascitic peritoneal fluid', reasons: ['direct extension is contiguous invasion and does not describe free peritoneal seeding', 'lymphatic embolisation occurs within lymphatic channels rather than across a serous cavity', 'haematogenous spread travels through blood and is not the mechanism demonstrated by malignant ascitic cells', 'peritoneal-fluid tumour cells establish the keyed transcoelomic dissemination pattern'],
  },
  {
    ref: 'C03', key: 'pathology.metastasis.lung-adrenal-hematogenous', label: 'Lung carcinoma reaches the adrenal gland through haematogenous spread', aliases: ['Lung-to-adrenal metastasis', 'Adrenal haematogenous metastasis'],
    definition: 'Lung carcinoma can disseminate through the bloodstream to the adrenal glands. A new adrenal mass in a patient with primary lung carcinoma is therefore attributed to haematogenous spread in this Family-5 item.', objective: 'Identify haematogenous spread as the route from a lung primary to an adrenal metastasis.', pitfalls: 'Choosing direct invasion across non-contiguous anatomy, or mistaking a target-organ pattern for lymphatic spread.',
    type: 'mechanism', micro: 'Routes of metastasis', nano: 'Lung-to-adrenal spread', article: spreadArticle, source: neo3, teachPage: 12, teach: 'Organ tropism depends partly on affinity between tumour cells and target-organ endothelium; the lecture gives primary lung tumour to adrenal glands as an example.',
    subject: 'Lung carcinoma', predicate: 'reaches the adrenal gland by', object: 'haematogenous spread', display: 'Lung carcinoma reaches the adrenal gland by haematogenous spread.', page: 11,
    stem: 'A 55-year-old man with primary lung carcinoma develops a right adrenal mass. What is the most likely pathway for tumor spread?', keyLetter: 'B', options: ['Lymphatic spread', 'Hematogenous spread', 'Direct invasion', 'Implantation spread'],
    clue: 'a lung primary has produced a non-contiguous adrenal mass', reasons: ['lymphatic spread is not the keyed route to this distant adrenal target', 'blood-borne dissemination explains the distant adrenal metastasis and is the printed key', 'direct invasion cannot bridge the non-contiguous lung-to-adrenal anatomy', 'implantation describes iatrogenic or surface seeding rather than this distant organ pattern'],
  },
  {
    ref: 'C04', key: 'pathology.metastasis.virchow-node-gastric-primary', label: 'A hard left supraclavicular Virchow node suggests gastric carcinoma', aliases: ['Virchow node gastric primary', 'Troisier sign'],
    definition: 'Virchow node is the left supraclavicular lymph node at the termination of the thoracic duct. A hard fixed Virchow node classically raises suspicion for an abdominal primary, and the Family-5 options key gastric carcinoma.', objective: 'Associate a hard fixed Virchow node with gastric carcinoma in the supplied assessment context.', pitfalls: 'Generalising that every left supraclavicular node proves gastric cancer, or ignoring that the assessment is a source-specific primary-site association.',
    type: 'clinical association', micro: 'Lymphatic metastasis', nano: 'Virchow node', article: spreadArticle, source: neo3, teachPage: 14, teach: 'The left supraclavicular lymph nodes (Virchow) lie at the termination of the thoracic duct and may be affected by lymphatic spread.',
    subject: 'A hard fixed Virchow node', predicate: 'suggests in this assessment', object: 'gastric carcinoma', display: 'A hard fixed Virchow node suggests gastric carcinoma in this assessment context.', page: 11,
    stem: 'A 68-year-old woman presents with a hard, fixed left supraclavicular lymph node (Virchow\'s node). Which primary malignancy is most likely the source?', keyLetter: 'B', options: ['Breast carcinoma', 'Gastric carcinoma', 'Lung carcinoma', 'Melanoma'],
    clue: 'the involved node is the hard fixed left supraclavicular Virchow node', reasons: ['breast carcinoma can involve supraclavicular nodes, but it is not the source-specific association keyed here', 'gastric carcinoma is the printed source association for a Virchow node in this option set', 'lung carcinoma can involve supraclavicular nodes but is not the keyed primary in this vignette', 'melanoma can metastasise to nodes but does not supply the classic option-set association being tested'],
  },
  {
    ref: 'C05', key: 'pathology.metastasis.breast-spine-batson-plexus', label: 'Breast carcinoma can reach vertebrae through Batson’s valveless venous plexus', aliases: ['Batson plexus breast metastasis', 'Breast-to-spine venous spread'],
    definition: 'Batson’s valveless vertebral venous plexus permits retrograde blood flow when thoracic or abdominal pressure changes. The Family-5 vignette attributes breast-carcinoma spread to vertebrae to haematogenous dissemination through this plexus.', objective: 'Explain vertebral metastasis from breast carcinoma through Batson’s venous plexus.', pitfalls: 'Calling vertebral deposits direct invasion, or using retrograde lymphatic spread when the keyed structure is a venous plexus.',
    type: 'mechanism', micro: 'Routes of metastasis', nano: 'Batson plexus', article: spreadArticle, source: neo3, teachPage: 11, teach: 'The vertebral venous system has no valves, and pressure variation can temporarily reverse blood flow to permit retrograde venous spread.',
    subject: 'Breast carcinoma', predicate: 'can reach vertebrae through', object: 'haematogenous spread in Batson’s valveless venous plexus', display: 'Breast carcinoma can reach vertebrae through haematogenous spread in Batson’s valveless venous plexus.', page: 11,
    stem: 'A 45-year-old woman with breast cancer develops back pain and vertebral collapse. Bone biopsy shows metastatic carcinoma. Which of the following best explains the pattern of metastasis?', keyLetter: 'C', options: ['Retrograde lymphatic spread', 'Direct invasion', 'Hematogenous spread via Batson\'s venous plexus', 'Transcoelomic spread'],
    clue: 'a breast primary has produced vertebral metastasis through a named valveless venous route', reasons: ['the named Batson route is venous rather than lymphatic', 'direct invasion cannot explain non-contiguous vertebral deposits from the breast', 'Batson’s valveless venous plexus is the keyed haematogenous pathway to vertebrae', 'transcoelomic spread seeds serous surfaces rather than the vertebral column'],
  },
]

for (const row of rows) {
  row.id = idFor(row.key)
  row.claim = `CLM-HU102-F5P2-${row.ref}-01`
  row.currCit = `CIT-HU102-F5P2-${row.ref}-CURR`
  row.asmCit = `CIT-HU102-F5P2-${row.ref}-ASM`
  row.span = `SPN-HU102-F5P2-${row.ref}-01`
}
const byRef = Object.fromEntries(rows.map((r) => [r.ref, r]))
const qid = (r) => `Q-HU102-PAT-NEO-F5-${r.ref}`

const sources = `# Item
## id
${neo2}
## title
SMP Neoplasia 2 — BMS-102
## institution
Faculty of Medicine, Helwan University
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Pathology/Theoretical/Lec 10 - Neoplasia 2/SMP neoplasia 2 2026.pdf
## media_type
application/pdf
## languages
en
## page_count
97
## sha256
1a05cf28311f19f1ef298824a3b3c7c5b22ce8423cca16c9e47fd62eec94b6e6
## processing_status
pending
## rights
Local university teaching material held for internal authoring only; no page image is redistributed.
## qualification
Current dated HU-BMS-102 theoretical teaching lecture, 23 March 2026. It establishes local curriculum wording, not independent medical verification.
## is_assessment
no

---

# Item
## id
${neo3}
## title
SMP Neoplasia 3 — BMS-102
## institution
Faculty of Medicine, Helwan University
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Pathology/Theoretical/Lec 12 - Neoplasia 3/SMP neoplasia 3.pdf
## media_type
application/pdf
## languages
en
## page_count
60
## sha256
a9ccc0b353dbbd7670cba31bd0156f9cf2490911d5567594809c65f3017a8514
## processing_status
pending
## rights
Local university teaching material held for internal authoring only; no page image is redistributed.
## qualification
HU-BMS-102 Neoplasia 3 theoretical teaching lecture dated 17 February 2025. It establishes local curriculum wording, not independent medical verification.
## is_assessment
no
`

const concept = (r, i) => `# Item
## label
${r.label}
## id
${r.id}
## canonical_key
${r.key}
## aliases
${r.aliases.join('\n')}
## arabic_label

## arabic_aliases

## definition
${r.definition}
## explicit_objective
${r.objective}
## pitfalls
${r.pitfalls}
## concept_type
${r.type}
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
${r.micro}
## nanotopic
${r.nano}
## modules
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Neoplasia > ${r.micro}
## universities
hu
## learner_years
1
## article_ids
${r.article}
## related_article_ids
${r.article === morphologyArticle ? spreadArticle : morphologyArticle}
## related_concept_ids
${rows[(i + 1) % rows.length].id}
## resource_ids
${r.source}
${assessment}
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
0.96
## weight_confidence
0.55
## exam_signal
${assessment} | tier-3 solved local study bank | undated | PDF p${r.page} ${r.ref} | printed key; not an official exam
## confidence
0.93
## atomic_claim_ids
${r.claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
[Teaching p${r.teachPage}] ${r.teach}
[Solved p${r.page} ${r.ref}] ${r.stem} Answer: ${r.keyLetter}) ${r.options['ABCD'.indexOf(r.keyLetter)]}.
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

const explain = (r, i) => {
  if ('ABCD'[i] === r.keyLetter) return `${r.options[i]} is the visibly printed answer for Family-5 ${r.ref}. The decisive evidence is that ${r.clue}, and ${r.reasons[i]}. This explanation preserves the source-defined pattern without turning it into a universal diagnostic rule outside the stated vignette.`
  return `${r.options[i]} does not fit this source item because ${r.reasons[i]}. The decisive evidence is that ${r.clue}, which supports ${r.options['ABCD'.indexOf(r.keyLetter)]}. Keeping lineage, morphology and route of spread separate prevents this distractor from replacing the printed answer.`
}

const question = (r) => `# Item
## id
${qid(r)}
## title
${r.stem}
## subject
fnd
## status
Draft
## owner
Helwan Year-1 authoring lane
## vignette

## question
${r.stem}
## format
single best answer
## derived_from

## correct_answer
${r.keyLetter}
${r.options.map((o, i) => `## answer_${'abcd'[i]}\n${o}\n## explanation_${'abcd'[i]}\n${explain(r, i)}`).join('\n')}
## topic
General pathology
## subtopic
${r.micro}
## difficulty
Moderate
## question_type
Clinical application
## main_concept
${r.id}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Neoplasia > ${r.micro}
## clinical_relevance
0.82
## academic_relevance
0.96
## cognitive_effort_score
0.55
## exam_weight_by_year
HU_Y1=0.8
## question_only_for
HU_Y1
## concept_ids
${r.id}
## years
HU_Y1
## universities
hu
## cognitive_effort
Medium
## setting
Both
## reasoning_level
2
## inferred_difficulty
64
## exam_relevance
8
## contextual_concept_ids

## library_ids
${r.article}
## resource_ids
${assessment}
${r.source}
## learning_objective
${r.objective}
## media_recommendations

## source_citation
${assessment}, PDF p${r.page}, Family-5 ${r.ref}: four options A–D and visibly printed key ${r.keyLetter}. Teaching support: ${r.source}, PDF p${r.teachPage}. Authority: tier-3 solved local study bank, not an official exam or official key.
## attachments

## attached_image

## author_notes
Stem, option order and printed key are preserved exactly. No official sitting, marks or recurrence claim is inferred.
## estimated_seconds
75
## randomise_answers
yes
`

const article = ({ id, title, aliases, micro, nano, subset, other, sections, notes }) => `# Item
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
9
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
${id === morphologyArticle ? 'Morphologic tumour diagnosis starts with lineage and the product made by malignant cells. Glands, keratin pearls, biphasic breast tissue, malignant osteoid and skeletal-muscle differentiation convert a broad mass vignette into a specific neoplasm classification.' : 'Metastatic patterns reflect anatomical routes. Portal drainage carries gastrointestinal tumour emboli to the liver, serous-cavity shedding produces transcoelomic spread, systemic blood flow reaches distant organs, the thoracic duct explains Virchow-node involvement, and Batson’s plexus provides a valveless vertebral route.'}
## sections
${sections}
## published_summary

## published_sections

## hold_these
${subset.map((r) => r.display).join('\n')}
## lose_the_mark
${id === morphologyArticle ? 'Letting age or smoking history override the defining biopsy morphology.\nCalling every gland-forming lesion benign or every sarcoma interchangeable.\nIgnoring the product made by malignant cells, such as osteoid or keratin.' : 'Calling non-contiguous organ deposits direct invasion.\nConfusing transcoelomic seeding with lymphatic or haematogenous spread.\nCalling Batson’s venous plexus a lymphatic route.'}
## related_concepts
${subset.map((r) => r.id).join('\n')}
## related_articles
${other}
## question_ids
${subset.map(qid).join('\n')}
## resource_ids
${[...new Set(subset.flatMap((r) => [r.source, assessment]))].join('\n')}
## universities
hu
## years
HU_Y1
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Neoplasia > ${micro}
## university_notes
hu: Restricted to HU-BMS-102 Year-1; solved Family 5 supplies assessment signal but no official-exam authority.
## annotations
${subset.map((r) => `### definition_of · ${r.id}\nQuote: ${r.display}\nBlock: body`).join('\n\n')}
## media

## media_recommendations

## callout_evidence
${subset.map((r) => `### ${r.display}\nClaims: ${r.claim}\nCitations: ${r.currCit}, ${r.asmCit}\nSpan: ${r.span}`).join('\n\n')}
## article_source_ids
${[...new Set(subset.flatMap((r) => [r.source, assessment]))].join('\n')}
## claim_ids
${subset.map((r) => r.claim).join('\n')}
## span_ids
${subset.map((r) => r.span).join('\n')}
## publication_gate
needs_evidence
## evidence_basis
Current HU-BMS-102 Neoplasia 2 or Neoplasia 3 teaching pages named in each citation.
Tier-3 solved local Family-5 bank, pp7–11, with visibly printed keys.
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
mediaRecommendations: No visual is required for the tested relationships.
lastReviewed: New draft; no faculty review has occurred.
reviewDue: Set only after first faculty review.
`

const morph = rows.filter((r) => r.article === morphologyArticle)
const spread = rows.filter((r) => r.article === spreadArticle)
const morphologySections = `### Definition
Morphologic diagnosis identifies what a tumour differentiates toward and what product it forms. ${morph[0].display} ${morph[1].display} ${morph[2].display}

### Mechanism
Epithelial tumours can retain glandular or squamous differentiation. Malignant acini and mucin support adenocarcinoma, while cell nests and keratin pearls support squamous differentiation. Site then narrows the label: lung and endometrium both produce adenocarcinomas, but their clinical and anatomical contexts are distinct.

### Key determinants
${morph[3].display} ${morph[4].display} ${morph[5].display} A biphasic breast mass points to fibroepithelial differentiation; malignant osteoid establishes osteosarcoma; rhabdomyoblasts with cross-striations establish skeletal-muscle differentiation.

### Clinical significance
Read the biopsy clue before the demographic clue. A source vignette may mention smoking, age, site or symptoms, but the highest-specificity evidence is the tissue pattern. The authored questions preserve that hierarchy without adding staging, prognosis or patient-specific management.`
const spreadSections = `### Definition
Metastasis is distant spread from a primary malignant tumour. The major routes in this slice are haematogenous dissemination, transcoelomic seeding and lymphatic transport, with anatomy determining the likely target pattern.

### Mechanism
${spread[0].display} ${spread[1].display} ${spread[2].display} Portal drainage explains colon-to-liver spread, malignant cells in ascitic fluid demonstrate a serous-cavity route, and a distant adrenal deposit from lung is blood-borne rather than contiguous.

### Key determinants
${spread[3].display} ${spread[4].display} The left supraclavicular node lies at the thoracic-duct termination, while Batson’s plexus is a valveless venous network capable of retrograde flow. These are anatomical route clues, not statements that one finding proves a primary in every patient.

### Clinical significance
First ask whether the secondary site is contiguous, within a serous cavity, in a lymphatic drainage path or in a blood-borne target organ. Then use the named structure, such as portal vein, thoracic duct or Batson’s plexus. This avoids calling every distant deposit simply “metastasis” without explaining the tested route.`
const articles = [
  article({ id: morphologyArticle, title: 'Morphology-led recognition of common neoplasms', aliases: ['Tumour diagnosis by differentiation', 'Neoplasm morphology patterns'], micro: 'Tumour morphology', nano: 'Lineage and diagnostic products', subset: morph, other: spreadArticle, sections: morphologySections, notes: 'This article teaches only the morphology explicitly supported by the local lecture and assessment; it adds no treatment or prognostic claim.' }),
  article({ id: spreadArticle, title: 'Metastatic routes: portal, transcoelomic, lymphatic and vertebral venous patterns', aliases: ['Routes of tumour spread', 'Anatomical metastasis patterns'], micro: 'Routes of metastasis', nano: 'Anatomical spread patterns', subset: spread, other: morphologyArticle, sections: spreadSections, notes: 'Virchow-node wording is explicitly scoped to the assessment context; no single physical sign is presented as diagnostic proof.' }),
].join('\n---\n\n')

const claim = (r) => `# Item
## id
${r.claim}
## concept_id
${r.id}
## subject
${r.subject}
## predicate
${r.predicate}
## object
${r.object}
## display_text
${r.display}
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
0.93
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
authority: current local curriculum plus auxiliary printed key; vignette scope retained
`

const citations = (r) => `# Item
## id
${r.currCit}
## claim_id
${r.claim}
## resource_id
${r.source}
## evidence_role
local_curriculum
## support_span
${r.teach}
## locator_type
page
## locator_page
${r.teachPage}
## locator_section
${r.micro}
## locator_detail
PDF p${r.teachPage}, teaching support for Family-5 ${r.ref}
## context_note
Local curriculum support only; assessment-specific detail remains attributed to the solved bank.
## confidence
0.92
## counts_as_claim_evidence
no

---

# Item
## id
${r.asmCit}
## claim_id
${r.claim}
## resource_id
${assessment}
## evidence_role
auxiliary_assessment
## support_span
${r.stem} Answer: ${r.keyLetter}) ${r.options['ABCD'.indexOf(r.keyLetter)]}.
## locator_type
page
## locator_page
${r.page}
## locator_section
Family 5 ${r.ref}
## locator_detail
Solved PDF p${r.page}, four options A–D and visibly printed answer
## context_note
Tier-3 solved local study-bank evidence only; not an official exam or authenticated official key.
## confidence
0.92
## counts_as_claim_evidence
no
`

const span = (r) => `# Item
## id
${r.span}
## article_id
${r.article}
## section_id
${r.article.toLowerCase()}-${r.micro.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}
## text
${r.display}
## claim_ids
${r.claim}
## citation_ids
${r.currCit}
${r.asmCit}
`

const relationDefs = [
  ['B01', 'associated_with', 'B02', 'shared glandular differentiation; site and invasion pattern keep the diagnoses distinct'],
  ['B01', 'contrasts_with', 'B03', 'glandular and squamous differentiation are different epithelial morphology patterns'],
  ['B04', 'contrasts_with', 'B02', 'a circumscribed benign biphasic breast tumour differs from invasive endometrial adenocarcinoma'],
  ['B05', 'contrasts_with', 'B06', 'both are sarcomas, but malignant osteoid and skeletal-muscle differentiation identify different lineages'],
  ['C01', 'contrasts_with', 'C02', 'portal haematogenous spread differs from transcoelomic peritoneal seeding'],
  ['C01', 'associated_with', 'C03', 'both patterns use haematogenous dissemination to a distant target organ'],
  ['C04', 'associated_with', 'C01', 'both apply gastrointestinal drainage anatomy to a metastatic pattern'],
  ['C05', 'associated_with', 'C01', 'both are venous routes whose anatomy predicts the metastatic target'],
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
${byRef[a].currCit}
${byRef[a].asmCit}
${byRef[b].currCit}
${byRef[b].asmCit}
## verification_status
needs_evidence
## confidence
0.88
## qualifiers
${note}
## reviewer
Medical team, Helwan Pathology faculty
`

const files = new Map([
  ['evidence/HU-BMS-102-pathology-family5-part2-sources.md', sources],
  ['concept/HU-BMS-102-pathology-family5-part2-concepts.md', rows.map(concept).join('\n---\n\n')],
  ['article/HU-BMS-102-pathology-family5-part2-articles.md', articles],
  ['question/HU-BMS-102-pathology-family5-part2-mcq.md', rows.map(question).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family5-part2-claims.md', rows.map(claim).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family5-part2-citations.md', rows.map(citations).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family5-part2-spans.md', rows.map(span).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family5-part2-relations.md', relationDefs.map(relation).join('\n---\n\n')],
])
for (const [relative, body] of files) {
  const out = join(root, relative)
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, `${body.trim()}\n`)
}
console.log(JSON.stringify({ family: '5-part2', released: { articles: 2, concepts: rows.length, questions: rows.length, sources: 2, claims: rows.length, citations: rows.length * 2, spans: rows.length, relations: relationDefs.length }, remaining: { routineKeyed: 43, questionableKeyed: 2 } }, null, 2))
