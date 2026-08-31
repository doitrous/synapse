import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')

const assessment = 'src_eda268c7a75eb1930662'
const orientation = 'src_d270bc32d14620134e75'
const neo1 = 'src_7ce8b4c740464632c3de'
const neo2 = 'src_1a05cf28311f19f1ef29'
const neo3 = 'src_a9ccc0b353dbbd7670cb'
const neo4 = 'src_8e574a175cfd0e454cf3'

const behaviourArticle = 'ART-HU-BMS102-PAT-TUMOUR-BEHAVIOUR'
const preinvasiveArticle = 'ART-HU-BMS102-PAT-PREINVASIVE-CHANGE'
const idFor = (key) => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const rows = [
  {
    ref: 'A02', key: 'pathology.tumor.poorly-differentiated-carcinoma-morphology', label: 'Poorly differentiated carcinoma shows little resemblance to its tissue of origin', aliases: ['Poorly differentiated carcinoma morphology', 'Loss of tumour differentiation'],
    definition: 'A poorly differentiated carcinoma retains little recognisable specialised epithelial morphology. Marked pleomorphism, nuclear hyperchromasia and frequent mitoses support poor differentiation in the Family-5 lung-mass item.', objective: 'Recognise poorly differentiated carcinoma from severe cytological atypia and limited resemblance to the tissue of origin.', pitfalls: 'Calling every atypical epithelial lesion dysplasia, or choosing a benign adenoma despite pronounced pleomorphism and frequent mitotic activity.',
    type: 'diagnostic pattern', micro: 'Tumour differentiation', nano: 'Poor differentiation', article: behaviourArticle, source: neo1, teachPage: 34, teach: 'Undifferentiated or poorly differentiated tumours may not permit determination of the tissue of origin.',
    subject: 'Poorly differentiated carcinoma', predicate: 'is supported here by', object: 'pleomorphism, nuclear hyperchromasia and frequent mitoses', display: 'Poorly differentiated carcinoma is supported here by pleomorphism, nuclear hyperchromasia and frequent mitoses.', page: 1, difficulty: 'Hard', effort: 'High', reasoning: 2, inferred: 76,
    stem: 'A biopsy of a lung mass reveals pleomorphic cells with hyperchromatic nuclei and frequent mitoses. Which of the following best describes this tumor?', keyLetter: 'B', options: ['Well-differentiated adenoma', 'Poorly differentiated carcinoma', 'Hamartoma', 'Dysplasia'],
    clue: 'the lung-mass biopsy combines pleomorphism, nuclear hyperchromasia and frequent mitoses', reasons: ['a well-differentiated adenoma would retain orderly benign differentiation rather than this severe atypia', 'the severe cytological atypia and mitotic activity support the printed poor-differentiation classification', 'a hamartoma is a disorganised but benign collection of mature native tissues and does not match this malignant cytology', 'dysplasia is an intraepithelial atypical change and does not best classify the described lung tumour mass'],
  },
  {
    ref: 'A03', key: 'pathology.tumor.adenocarcinoma-gland-formation-invasion', label: 'An invasive gland-forming epithelial tumour is an adenocarcinoma', aliases: ['Invasive gland-forming adenocarcinoma', 'Adenocarcinoma morphology and invasion'],
    definition: 'Adenocarcinoma is a malignant epithelial tumour with glandular differentiation. Gland formation establishes the epithelial pattern, while invasion of surrounding tissue establishes malignant behaviour.', objective: 'Classify an invasive gland-forming epithelial tumour as adenocarcinoma.', pitfalls: 'Calling an invasive gland-forming tumour an adenoma because its glands are well differentiated, or selecting sarcoma despite epithelial gland formation.',
    type: 'classification', micro: 'Tumour nomenclature', nano: 'Adenocarcinoma', article: behaviourArticle, source: neo1, teachPage: 34, teach: 'Adenocarcinoma is a carcinoma with a glandular growth pattern.',
    subject: 'An invasive gland-forming epithelial tumour', predicate: 'is classified as', object: 'adenocarcinoma', display: 'An invasive gland-forming epithelial tumour is classified as adenocarcinoma.', page: 1, difficulty: 'Easy', effort: 'Low', reasoning: 1, inferred: 35,
    stem: 'A tumor is composed of well-differentiated glandular structures but has invaded surrounding tissues. What is the most likely diagnosis?', keyLetter: 'C', options: ['Papilloma', 'Adenoma', 'Adenocarcinoma', 'Sarcoma'],
    clue: 'the tumour forms glands and has invaded surrounding tissue', reasons: ['papilloma describes a benign papillary epithelial growth and does not fit invasive gland formation', 'adenoma is benign and therefore does not explain invasion of surrounding tissues', 'glandular differentiation plus invasion supports the printed adenocarcinoma answer', 'sarcoma is a malignant mesenchymal tumour rather than a gland-forming epithelial tumour'],
  },
  {
    ref: 'A04', key: 'pathology.tumor.anaplasia-poor-differentiation-mitoses', label: 'Anaplasia is loss of differentiation with marked malignant cytological atypia', aliases: ['Anaplastic tumour morphology', 'Loss of tumour differentiation'],
    definition: 'Anaplasia is a lack of differentiation in which malignant cells no longer resemble their tissue of origin. Poor differentiation, cellular atypia and high mitotic activity are characteristic manifestations.', objective: 'Define anaplasia and distinguish it from orderly differentiation and benign mature-cell proliferation.', pitfalls: 'Using anaplasia as a synonym for any dysplasia, or describing an anaplastic tumour as organised and normally polarised.',
    type: 'definition', micro: 'Tumour differentiation', nano: 'Anaplasia', article: behaviourArticle, source: neo1, teachPage: 54, teach: 'Anaplasia is a condition in which a neoplasm shows no differentiation and the tissue of origin cannot be identified.',
    subject: 'Anaplasia', predicate: 'is characterised by', object: 'poor differentiation with high mitotic activity', display: 'Anaplasia is characterised by poor differentiation with high mitotic activity.', page: 2, difficulty: 'Moderate', effort: 'Medium', reasoning: 1, inferred: 55,
    stem: 'Which of the following best describes anaplasia?', keyLetter: 'B', options: ['Differentiated tumor cells resembling the parent tissue', 'Poorly differentiated cells with high mitotic activity', 'Well-organized tumor cells with normal polarity', 'A benign proliferation of mature cells'],
    clue: 'anaplasia denotes loss of differentiation in a malignant tumour', reasons: ['resemblance to parent tissue describes differentiation rather than anaplasia', 'poor differentiation with high mitotic activity is the visibly printed definition in this item', 'normal polarity and organisation oppose the disordered malignant phenotype', 'a benign proliferation of mature cells retains differentiation and is not anaplastic'],
  },
  {
    ref: 'A05', key: 'pathology.tumor.pleomorphic-adenoma-mixed-parotid', label: 'Pleomorphic adenoma is a mixed salivary-gland tumour', aliases: ['Mixed tumour of the parotid', 'Pleomorphic salivary adenoma'],
    definition: 'Pleomorphic adenoma is a salivary-gland tumour with mixed-appearing epithelial and mesenchymal-like components produced by divergent differentiation. A parotid mass containing both components supports this diagnosis.', objective: 'Recognise pleomorphic adenoma from mixed epithelial and mesenchymal-like tissue in a parotid mass.', pitfalls: 'Calling the lesion a sarcoma because one component appears mesenchymal, or treating the mixed pattern as evidence of two unrelated tumours.',
    type: 'diagnostic pattern', micro: 'Tumour nomenclature', nano: 'Pleomorphic adenoma', article: behaviourArticle, source: neo1, teachPage: 34, teach: 'Pleomorphic adenoma is listed as a mixed tumour showing divergent differentiation of a single germ line.',
    subject: 'A mixed epithelial and mesenchymal-appearing parotid tumour', predicate: 'is most consistent with', object: 'pleomorphic adenoma', display: 'A mixed epithelial and mesenchymal-appearing parotid tumour is most consistent with pleomorphic adenoma.', page: 2, difficulty: 'Moderate', effort: 'Medium', reasoning: 1, inferred: 58,
    stem: 'A patient has a mass in the parotid gland that contains both epithelial and mesenchymal tissue. What is the most likely diagnosis?', keyLetter: 'A', options: ['Pleomorphic adenoma', 'Fibrosarcoma', 'Rhabdomyosarcoma', 'Basal cell carcinoma'],
    clue: 'the parotid mass contains both epithelial and mesenchymal-appearing tissue', reasons: ['the mixed salivary-gland pattern supports the printed pleomorphic-adenoma answer', 'fibrosarcoma is a malignant fibroblastic tumour and does not account for the epithelial component', 'rhabdomyosarcoma shows skeletal-muscle differentiation rather than this mixed salivary pattern', 'basal-cell carcinoma is an epithelial skin malignancy and does not explain a mixed parotid tumour'],
  },
  {
    ref: 'A08', key: 'pathology.tumor.malignancy-invasion-adjacent-tissue', label: 'Invasion of adjacent tissue is a defining feature of malignancy', aliases: ['Local tumour invasion', 'Infiltrative malignant growth'],
    definition: 'Malignant tumours infiltrate and destroy adjacent tissue rather than remaining confined within a circumscribed border. Local invasion therefore separates malignant behaviour from the expansile, often encapsulated pattern of many benign tumours.', objective: 'Identify invasion of adjacent tissue as the feature most indicative of malignancy.', pitfalls: 'Using rapid growth or nuclear variation alone as proof of malignancy when invasion is explicitly described, or calling an encapsulated mass infiltrative.',
    type: 'diagnostic discriminator', micro: 'Benign versus malignant behaviour', nano: 'Local invasion', article: behaviourArticle, source: neo1, teachPage: 16, teach: 'A malignant neoplasm is an invasive growth that can also spread.',
    subject: 'Invasion of adjacent tissue', predicate: 'indicates', object: 'malignant tumour behaviour', display: 'Invasion of adjacent tissue indicates malignant tumour behaviour.', page: 3, difficulty: 'Moderate', effort: 'Medium', reasoning: 1, inferred: 50,
    stem: 'Which of the following features is most indicative of malignancy?', keyLetter: 'C', options: ['Encapsulation', 'Uniform nuclear size', 'Invasion of adjacent tissues', 'Slow growth rate'],
    clue: 'the question asks for the feature that most directly establishes malignant behaviour', reasons: ['encapsulation favours a circumscribed benign growth pattern rather than invasion', 'uniform nuclear size suggests cytological regularity rather than malignancy', 'invasion of adjacent tissues is the printed defining behaviour of malignancy', 'slow growth may occur in benign or some malignant lesions and is less specific than invasion'],
  },
  {
    ref: 'A13', key: 'pathology.tumor.loss-contact-inhibition-malignant-transformation', label: 'Loss of contact inhibition supports malignant transformation', aliases: ['Loss of density-dependent growth inhibition', 'Contact inhibition in malignant cells'],
    definition: 'Normal cells restrain proliferation when they contact neighbouring cells. Loss of this contact-dependent growth restraint permits persistent proliferation despite crowding and is a hallmark of malignant transformation.', objective: 'Relate loss of contact inhibition to uncontrolled growth during malignant transformation.', pitfalls: 'Selecting decreased mitosis, increased adhesion or decreased angiogenesis as a malignant-growth hallmark, or treating contact inhibition as apoptosis.',
    type: 'mechanism', micro: 'Hallmarks of malignant growth', nano: 'Contact inhibition', article: behaviourArticle, source: neo4, teachPage: 11, teach: 'Insensitivity to growth-inhibitory signals is a core alteration in cancer.',
    subject: 'Loss of contact inhibition', predicate: 'supports', object: 'persistent proliferation during malignant transformation', display: 'Loss of contact inhibition supports persistent proliferation during malignant transformation.', page: 4, difficulty: 'Hard', effort: 'High', reasoning: 2, inferred: 73,
    stem: 'Which of the following is a hallmark of malignant transformation?', keyLetter: 'A', options: ['Loss of contact inhibition', 'Decreased mitotic rate', 'Increased cell adhesion', 'Decreased angiogenesis'],
    clue: 'malignant transformation removes normal growth restraints and favours continued proliferation', reasons: ['loss of contact inhibition is the printed hallmark and fits insensitivity to growth restraint', 'a decreased mitotic rate opposes the proliferative phenotype being tested', 'increased cell adhesion would not explain loss of normal density-dependent growth control', 'decreased angiogenesis would restrict rather than support tumour expansion'],
  },
  {
    ref: 'A17', key: 'pathology.metaplasia.barrett-squamous-to-glandular', label: 'Chronic acid reflux causes squamous-to-glandular metaplasia in Barrett oesophagus', aliases: ['Barrett oesophagus metaplasia', 'Reflux-associated glandular metaplasia'],
    definition: 'Barrett oesophagus is glandular intestinal-type metaplasia replacing the normal squamous lining of the distal oesophagus in response to chronic reflux injury. It is therefore a squamous-to-glandular metaplastic change.', objective: 'Identify the direction of epithelial metaplasia associated with chronic acid reflux.', pitfalls: 'Reversing the direction of change, or confusing epithelial metaplasia with connective-tissue metaplasia.',
    type: 'mechanism', micro: 'Metaplasia', nano: 'Barrett oesophagus', article: preinvasiveArticle, source: orientation, teachPage: 76, teach: 'Glandular metaplasia includes intestinal metaplasia and Barrett oesophagus and may follow chronic irritation.',
    subject: 'Chronic acid reflux', predicate: 'is associated with', object: 'squamous-to-glandular metaplasia in Barrett oesophagus', display: 'Chronic acid reflux is associated with squamous-to-glandular metaplasia in Barrett oesophagus.', page: 5, difficulty: 'Moderate', effort: 'Medium', reasoning: 1, inferred: 58,
    stem: 'Which type of metaplasia is commonly associated with chronic acid reflux?', keyLetter: 'A', options: ['Squamous to glandular metaplasia', 'Glandular to squamous metaplasia', 'Cartilaginous metaplasia', 'Connective tissue metaplasia'],
    clue: 'chronic reflux produces Barrett oesophagus by replacing squamous lining with glandular intestinal-type epithelium', reasons: ['squamous-to-glandular change is the printed Barrett pattern', 'glandular-to-squamous metaplasia is the reverse direction and does not describe Barrett oesophagus', 'cartilaginous metaplasia is a connective-tissue change unrelated to the reflux-injured oesophageal lining', 'connective-tissue metaplasia does not describe replacement of oesophageal surface epithelium'],
  },
  {
    ref: 'A18', key: 'pathology.dysplasia.excludes-basement-membrane-invasion', label: 'Dysplasia remains confined above the basement membrane', aliases: ['Dysplasia without invasion', 'Basement-membrane integrity in dysplasia'],
    definition: 'Epithelial dysplasia is disordered atypical proliferation that remains confined to the epithelium. Pleomorphism, loss of polarity and increased or abnormal mitoses can occur, but basement-membrane invasion indicates invasive carcinoma rather than dysplasia.', objective: 'Distinguish dysplasia from invasive carcinoma by basement-membrane integrity.', pitfalls: 'Calling basement-membrane invasion a dysplastic feature, or assuming that all dysplasia is full-thickness carcinoma in situ.',
    type: 'diagnostic discriminator', micro: 'Dysplasia', nano: 'Basement membrane', article: preinvasiveArticle, source: neo3, teachPage: 32, teach: 'High-grade dysplasia and carcinoma in situ remain limited by the epithelial basement membrane.',
    subject: 'Epithelial dysplasia', predicate: 'does not include', object: 'basement-membrane invasion', display: 'Epithelial dysplasia does not include basement-membrane invasion.', page: 5, difficulty: 'Moderate', effort: 'Medium', reasoning: 1, inferred: 61,
    stem: 'Which is NOT a characteristic of dysplasia?', keyLetter: 'C', options: ['Pleomorphism', 'Loss of cell polarity', 'Basement membrane invasion', 'Increased mitotic rate'],
    clue: 'dysplastic cells remain above an intact basement membrane', reasons: ['pleomorphism is a recognised cytological feature of dysplasia', 'loss of epithelial polarity is a recognised architectural feature of dysplasia', 'basement-membrane invasion crosses into invasive carcinoma and is therefore the printed exception', 'increased mitotic activity can accompany dysplasia'],
  },
  {
    ref: 'A19', key: 'pathology.metastasis.carcinoma-lymphatic-route', label: 'Carcinomas most commonly spread through lymphatic pathways', aliases: ['Lymphatic spread of carcinoma', 'Carcinoma metastasis route'],
    definition: 'Carcinomas are malignant epithelial tumours and most commonly disseminate through lymphatic vessels to regional lymph nodes. This is a general route preference rather than an absolute rule for every carcinoma.', objective: 'Identify lymphatic spread as the usual metastatic route of carcinomas.', pitfalls: 'Applying the sarcoma preference for haematogenous spread to carcinomas, or treating a usual route as an exclusive route.',
    type: 'mechanism', micro: 'Routes of metastasis', nano: 'Carcinoma lymphatic spread', article: behaviourArticle, source: neo3, teachPage: 13, teach: 'Lymphatic spread is the major pathway for carcinomas, whereas sarcomas favour haematogenous spread.',
    subject: 'Carcinomas', predicate: 'most commonly spread by', object: 'lymphatic dissemination', display: 'Carcinomas most commonly spread by lymphatic dissemination.', page: 5, difficulty: 'Moderate', effort: 'Medium', reasoning: 1, inferred: 52,
    stem: 'Which of the following is the most common route of metastasis for carcinomas?', keyLetter: 'A', options: ['Lymphatic spread', 'Hematogenous spread', 'Direct seeding', 'Perineural invasion'],
    clue: 'the question asks for the usual dissemination route of malignant epithelial tumours', reasons: ['lymphatic spread is the printed usual route for carcinomas', 'haematogenous spread is classically favoured by sarcomas, although carcinomas can also use it', 'direct seeding is not the general common route for carcinomas', 'perineural invasion occurs in selected tumours but is not the usual route of metastasis for carcinomas'],
  },
  {
    ref: 'A21', key: 'pathology.tumor.benign-encapsulation', label: 'Benign tumours are often circumscribed and encapsulated', aliases: ['Benign tumour encapsulation', 'Circumscribed benign growth'],
    definition: 'Many benign tumours expand as circumscribed masses and may develop a capsule that separates them from surrounding tissue. Encapsulation supports benign behaviour, whereas infiltrative destructive borders support malignancy.', objective: 'Recognise encapsulation as a characteristic feature of a benign tumour.', pitfalls: 'Assuming every benign tumour is encapsulated, or selecting rapid growth, infiltration or high mitotic activity as the benign feature.',
    type: 'diagnostic discriminator', micro: 'Benign versus malignant behaviour', nano: 'Encapsulation', article: behaviourArticle, source: neo1, teachPage: 41, teach: 'Benign tumours are circumscribed, often encapsulated, and push normal tissue aside.',
    subject: 'Encapsulation', predicate: 'supports', object: 'a benign circumscribed tumour pattern', display: 'Encapsulation supports a benign circumscribed tumour pattern.', page: 6, difficulty: 'Easy', effort: 'Low', reasoning: 1, inferred: 34,
    stem: 'Which of the following is a characteristic feature of a benign tumor?', keyLetter: 'C', options: ['Rapid growth', 'Infiltrative borders', 'Encapsulation', 'High mitotic rate'],
    clue: 'the option must describe a circumscribed rather than infiltrative growth pattern', reasons: ['rapid growth is not the characteristic benign feature requested', 'infiltrative borders support malignant local invasion rather than benign behaviour', 'encapsulation is the visibly printed benign-tumour characteristic', 'a high mitotic rate does not support the orderly benign pattern being tested'],
  },
  {
    ref: 'A24', key: 'pathology.tumor.polyp-mucosal-projection', label: 'A polyp is a mass projecting from a mucosal surface', aliases: ['Mucosal polyp definition', 'Polypoid mucosal projection'],
    definition: 'A polyp is a gross descriptive term for a mass that projects above a mucosal surface into the lumen of a hollow organ. The term describes shape and location, not by itself whether the lesion is benign or malignant.', objective: 'Define a polyp as a projection from a mucosal surface.', pitfalls: 'Equating every polyp with an adenoma, or using polyp as a synonym for a malignant skin tumour or blood-borne metastasis.',
    type: 'definition', micro: 'Tumour nomenclature', nano: 'Polyp', article: behaviourArticle, source: neo1, teachPage: 33, teach: 'A polyp is a projection from the mucosal epithelial surface of a hollow organ.',
    subject: 'A polyp', predicate: 'is', object: 'a mass projecting from a mucosal surface', display: 'A polyp is a mass projecting from a mucosal surface.', page: 6, difficulty: 'Easy', effort: 'Low', reasoning: 1, inferred: 30,
    stem: 'Which of the following describes a polyp?', keyLetter: 'B', options: ['A malignant tumor of the skin', 'A mass projecting from a mucosal surface', 'A benign tumor of the glandular epithelium', 'A hematogenous metastasis'],
    clue: 'polyp is a gross description of a mucosal projection', reasons: ['a malignant skin tumour is not defined by projection from a mucosal surface', 'a mass projecting from a mucosal surface is the visibly printed definition', 'a benign glandular epithelial tumour is an adenoma and may be polypoid, but it is not the definition of every polyp', 'a haematogenous metastasis describes a route of spread rather than a mucosal growth shape'],
  },
  {
    ref: 'C10', key: 'pathology.carcinoma-in-situ.confined-epithelium', label: 'Carcinoma in situ is malignant epithelial change confined above the basement membrane', aliases: ['Pre-invasive carcinoma in situ', 'Full-thickness epithelial dysplasia'],
    definition: 'Carcinoma in situ is full-thickness malignant epithelial atypia that remains confined above an intact basement membrane. Once malignant cells penetrate the basement membrane, the lesion is invasive carcinoma.', objective: 'Define carcinoma in situ by epithelial confinement and absence of basement-membrane invasion.', pitfalls: 'Calling carcinoma in situ invasive cancer, or reducing it to any low-grade dysplasia or non-atypical hyperplasia.',
    type: 'definition', micro: 'Carcinoma in situ', nano: 'Epithelial confinement', article: preinvasiveArticle, source: neo3, teachPage: 32, teach: 'High-grade dysplasia limited by the epithelial basement membrane is carcinoma in situ and involves the full epithelial thickness.',
    subject: 'Carcinoma in situ', predicate: 'consists of', object: 'malignant cells confined to the epithelium above an intact basement membrane', display: 'Carcinoma in situ consists of malignant cells confined to the epithelium above an intact basement membrane.', page: 12, difficulty: 'Moderate', effort: 'Medium', reasoning: 2, inferred: 63,
    stem: 'A 48-year-old woman with cervical cancer undergoes a Pap smear showing carcinoma in situ. What is the best description of this finding?', keyLetter: 'A', options: ['Malignant cells confined to the epithelium', 'Invasive cancer with basement membrane penetration', 'Dysplasia with regression potential', 'Premalignant hyperplasia'],
    clue: 'carcinoma in situ remains confined to epithelium above an intact basement membrane', reasons: ['malignant cells confined to the epithelium is the printed and defining description', 'basement-membrane penetration defines invasive carcinoma rather than carcinoma in situ', 'some dysplasia can regress, but that does not define carcinoma in situ in this vignette', 'hyperplasia is increased cell number without the defining full-thickness malignant atypia'],
  },
]

for (const row of rows) {
  row.id = idFor(row.key)
  row.claim = `CLM-HU102-F5P3-${row.ref}-01`
  row.currCit = `CIT-HU102-F5P3-${row.ref}-CURR`
  row.asmCit = `CIT-HU102-F5P3-${row.ref}-ASM`
  row.span = `SPN-HU102-F5P3-${row.ref}-01`
}

const byRef = Object.fromEntries(rows.map((row) => [row.ref, row]))
const qid = (row) => `Q-HU102-PAT-NEO-F5-${row.ref}`
const relatedMap = {
  A02: ['A04'], A03: ['A05', 'A08'], A04: ['A02'], A05: ['A03'], A08: ['A03', 'A21'], A13: ['A08'],
  A17: ['A18'], A18: ['C10'], A19: ['A08'], A21: ['A08'], A24: ['A03'], C10: ['A18', 'A08'],
}

const sources = `# Item
## id
${orientation}
## title
Introduction to pathology and cellular adaptation — BMS-102
## institution
Faculty of Medicine, Helwan University
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Pathology/Theoretical/Lec 1 - Orientation/Main_stream_Lecture_1_introduction_to_pathology_adaptation_2026.pdf
## media_type
application/pdf
## languages
en
## page_count
82
## sha256
d270bc32d14620134e75fc33684afd3f45a1a98835dd77bfecf1ec1e7e16416a
## processing_status
pending
## rights
Local university teaching material held for internal authoring only; no page image is redistributed.
## qualification
Current HU-BMS-102 theoretical teaching lecture for the 2025–2026 academic year. It establishes local curriculum wording, not independent medical verification.
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
${row.article === behaviourArticle ? preinvasiveArticle : behaviourArticle}
## related_concept_ids
${relatedMap[row.ref].map((ref) => byRef[ref].id).join('\n')}
## resource_ids
${row.source}
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
0.78
## academic_relevance
0.97
## weight_confidence
0.55
## exam_signal
${assessment} | tier-3 solved local study bank | undated | PDF p${row.page} ${row.ref} | printed key; not an official exam
## confidence
0.93
## atomic_claim_ids
${row.claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
[Teaching p${row.teachPage}] ${row.teach}
[Solved p${row.page} ${row.ref}] ${row.stem} Answer: ${row.keyLetter}) ${row.options['ABCD'.indexOf(row.keyLetter)]}.
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
mergeIds: No merge occurred; prior Family-5 handles are represented once by this exact canonical scope.
rejectedMergeCandidateIds: No rival same-scope concept survived triage.
lastReviewed: New record; no faculty review has occurred.
reviewDue: Set after first faculty review.
exclusionReason: Not excluded; held at needs_evidence.
`

const explain = (row, index) => {
  const correctIndex = 'ABCD'.indexOf(row.keyLetter)
  if (index === correctIndex) {
    return `${row.options[index]} is correct because ${row.clue}, and ${row.reasons[index]}. The decisive feature is the stated morphology or biological behaviour. Separating differentiation, invasion and route of spread prevents adjacent terms from replacing the diagnosis or mechanism.`
  }
  return `${row.options[index]} does not fit because ${row.reasons[index]}. The decisive evidence is that ${row.clue}, which supports ${row.options[correctIndex]}. Keeping differentiation, invasion and route of spread distinct prevents this distractor from replacing the correct answer.`
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
0.78
## academic_relevance
0.97
## cognitive_effort_score
0.58
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
${assessment}
${row.source}
## learning_objective
${row.objective}
## media_recommendations

## source_citation
${assessment}, PDF p${row.page}, Family-5 ${row.ref}: exact stem, options A–D and visibly printed key ${row.keyLetter}. Teaching support: ${row.source}, PDF p${row.teachPage}. Authority: tier-3 solved local study bank, not an official exam or official key.
## attachments

## attached_image

## author_notes
Stem, option order and printed key are preserved exactly. No official sitting, marks or recurrence claim is inferred.
## estimated_seconds
75
## randomise_answers
yes
`

const behaviour = rows.filter((row) => row.article === behaviourArticle)
const preinvasive = rows.filter((row) => row.article === preinvasiveArticle)

const behaviourSections = `### Definition
Tumour classification combines lineage, differentiation and biological behaviour. ${byRef.A03.display} ${byRef.A05.display} ${byRef.A24.display}

### Mechanism
Differentiation describes how closely tumour cells resemble their tissue of origin. ${byRef.A02.display} ${byRef.A04.display} Loss of normal growth restraint allows transformed cells to continue proliferating despite crowding; ${byRef.A13.display}

### Key determinants
The border is a high-value behavioural clue. ${byRef.A21.display} By contrast, ${byRef.A08.display} Once malignant epithelial cells disseminate, ${byRef.A19.display}

### Clinical significance
Read morphology and behaviour separately. A gland-forming lesion is named by epithelial differentiation, while invasion establishes malignancy. A polyp describes a projection from mucosa and does not, by itself, determine whether the lesion is benign or malignant.`

const preinvasiveSections = `### Definition
Metaplasia, dysplasia and carcinoma in situ are distinct epithelial changes. ${byRef.A17.display} ${byRef.A18.display} ${byRef.C10.display}

### Mechanism
Chronic irritation can reprogramme epithelial differentiation, producing metaplasia without necessarily producing cytological malignancy. Dysplasia adds atypical disordered proliferation, including pleomorphism, loss of polarity and increased or abnormal mitoses, but remains above the basement membrane.

### Key determinants
Extent and invasion must be stated separately. Full-thickness malignant epithelial atypia with an intact basement membrane is carcinoma in situ. Basement-membrane penetration changes the diagnosis to invasive carcinoma.

### Clinical significance
The progression terms are not interchangeable. Metaplasia is an adaptive change in cell type, dysplasia is atypical disordered epithelial growth, and carcinoma in situ is full-thickness malignant epithelial change without invasion. The basement membrane is the decisive boundary in the selected questions.`

const article = ({ id, title, aliases, micro, nano, subset, other, sections, summary, loses, notes }) => `# Item
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
${[...new Set(subset.flatMap((row) => [row.source, assessment]))].join('\n')}
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
${subset.map((row) => `### ${row.display}\nClaims: ${row.claim}\nCitations: ${row.currCit}, ${row.asmCit}\nSpan: ${row.span}`).join('\n\n')}
## article_source_ids
${[...new Set(subset.flatMap((row) => [row.source, assessment]))].join('\n')}
## claim_ids
${subset.map((row) => row.claim).join('\n')}
## span_ids
${subset.map((row) => row.span).join('\n')}
## publication_gate
needs_evidence
## evidence_basis
HU-BMS-102 teaching pages named in each citation.
Tier-3 solved local Family-5 bank, pp1–6 and p12, with visibly printed keys.
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

const articles = [
  article({
    id: behaviourArticle,
    title: 'Tumour differentiation, nomenclature and biological behaviour',
    aliases: ['Benign and malignant tumour patterns', 'Tumour morphology and invasion'],
    micro: 'Tumour behaviour', nano: 'Differentiation, invasion and spread', subset: behaviour, other: preinvasiveArticle,
    sections: behaviourSections,
    summary: 'Tumour naming begins with lineage and differentiation, while invasion and dissemination define malignant behaviour. Poor differentiation and anaplasia reduce resemblance to the tissue of origin; encapsulation favours a benign pattern; invasion and lymphatic spread identify malignant behaviour.',
    loses: ['Calling an invasive gland-forming tumour an adenoma because it remains well differentiated.', 'Treating polyp as a histological diagnosis rather than a gross mucosal projection.', 'Confusing the usual lymphatic route of carcinomas with the haematogenous preference of sarcomas.'],
    notes: 'This article consolidates the exact prior Family-1/Family-4 behaviour scopes named in triage rather than creating rival concepts.',
  }),
  article({
    id: preinvasiveArticle,
    title: 'Metaplasia, dysplasia and carcinoma in situ',
    aliases: ['Pre-invasive epithelial change', 'Basement-membrane boundary in neoplasia'],
    micro: 'Pre-invasive epithelial change', nano: 'Metaplasia, dysplasia and carcinoma in situ', subset: preinvasive, other: behaviourArticle,
    sections: preinvasiveSections,
    summary: 'Metaplasia changes epithelial type, dysplasia produces atypical disordered growth, and carcinoma in situ is full-thickness malignant epithelial atypia confined above an intact basement membrane. Invasion through that membrane defines invasive carcinoma.',
    loses: ['Calling Barrett oesophagus glandular-to-squamous metaplasia.', 'Listing basement-membrane invasion as a dysplastic feature.', 'Calling carcinoma in situ invasive cancer or ordinary hyperplasia.'],
    notes: 'The two questionable printed-key items A01 and A16 are deliberately absent and remain reserved for a dedicated conflict slice.',
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
0.93
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
authority: current local curriculum plus auxiliary printed key; source wording and scope retained
`

const citations = (row) => `# Item
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

# Item
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
Solved PDF p${row.page}, exact stem, four options A–D and visibly printed answer
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
${row.article.toLowerCase()}-${row.micro.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}
## text
${row.display}
## claim_ids
${row.claim}
## citation_ids
${row.currCit}
${row.asmCit}
`

const relationDefs = [
  ['A02', 'associated_with', 'A04', 'poor differentiation and anaplasia both describe loss of resemblance to the tissue of origin, with anaplasia representing the more complete loss'],
  ['A03', 'contrasts_with', 'A05', 'invasive gland-forming carcinoma differs from a mixed salivary-gland tumour'],
  ['A08', 'contrasts_with', 'A21', 'infiltrative destructive growth contrasts with circumscription and encapsulation'],
  ['A08', 'associated_with', 'A19', 'local invasion and lymphatic dissemination are distinct manifestations of malignant behaviour'],
  ['A13', 'associated_with', 'A08', 'loss of growth restraint supports malignant transformation, while invasion demonstrates malignant behaviour'],
  ['A17', 'contrasts_with', 'A18', 'adaptive change in epithelial type differs from atypical disordered epithelial proliferation'],
  ['A18', 'prerequisite_of', 'C10', 'understanding epithelial confinement in dysplasia is required to recognise full-thickness carcinoma in situ'],
  ['C10', 'contrasts_with', 'A08', 'carcinoma in situ remains above the basement membrane, whereas invasion establishes malignant tissue infiltration'],
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
${byRef[sourceRef].currCit}
${byRef[sourceRef].asmCit}
${byRef[targetRef].currCit}
${byRef[targetRef].asmCit}
## verification_status
needs_evidence
## confidence
0.88
## qualifiers
scope: ${note}
## reviewer
Medical team, Helwan Pathology faculty
`

const files = new Map([
  ['evidence/HU-BMS-102-pathology-family5-part3-sources.md', sources],
  ['concept/HU-BMS-102-pathology-family5-part3-concepts.md', rows.map(concept).join('\n---\n\n')],
  ['article/HU-BMS-102-pathology-family5-part3-articles.md', articles],
  ['question/HU-BMS-102-pathology-family5-part3-mcq.md', rows.map(question).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family5-part3-claims.md', rows.map(claim).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family5-part3-citations.md', rows.map(citations).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family5-part3-spans.md', rows.map(span).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family5-part3-relations.md', relationDefs.map(relation).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({
  family: '5-part3',
  released: { articles: 2, concepts: rows.length, questions: rows.length, sources: 1, claims: rows.length, citations: rows.length * 2, spans: rows.length, relations: relationDefs.length },
  remaining: { routineKeyed: 31, questionableKeyed: 2 },
  sourceRefs: rows.map((row) => row.ref),
}, null, 2))
