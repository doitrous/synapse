import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const assessment = 'src_9a70f046e6b0b21ba4ee'
const lecture = 'src_034276f9ba5a61ea711a'
const ironArticle = 'ART-HU-BMS102-PAT-F9P2-IRON-PIGMENT'
const amyloidArticle = 'ART-HU-BMS102-PAT-F9P2-AMYLOIDOSIS'
const calcificationArticle = 'ART-HU-BMS102-PAT-F9P2-CALCIFICATION'

const concepts = [
  {
    handle: 'hemochromatosis', id: 'CON-FND-B9A3C8B28B1443', key: 'haemochromatosis.primary.bronze-diabetes', reuse: true,
    label: 'Primary haemochromatosis is a chromosome-6 defect that loads the body with iron',
    aliases: ['Primary haemochromatosis', 'Primary hemochromatosis', 'Bronzed diabetes', 'Hereditary iron overload'],
    definition: 'Primary haemochromatosis is hereditary generalized iron overload caused by excessive intestinal iron absorption. The governed exact concept places the defect on chromosome 6. Progressive parenchymal iron deposition produces liver cirrhosis, pancreatic injury with diabetes, cardiac disease and bronzed skin; repeated haemolysis instead belongs to secondary iron overload.',
    objective: 'Identify the hereditary cause and distinguish primary haemochromatosis features from secondary haemolytic iron overload.',
    pitfalls: 'Choosing iron injection, dietary intake alone or repeated haemolysis as the inherited primary disorder. Those are acquired or secondary routes of iron loading.',
    type: 'clinical_feature', micro: 'Pigments', nano: 'Primary haemochromatosis', article: ironArticle,
    subject: 'Primary haemochromatosis', predicate: 'results from', object: 'hereditary excessive iron absorption and produces cirrhosis, diabetes and bronzed skin',
    display: 'Primary haemochromatosis results from hereditary excessive iron absorption and produces cirrhosis, diabetes and bronzed skin.',
    teachPage: 22, teachText: 'The lecture defines haemochromatosis as generalized haemosiderin accumulation with tissue injury and states that the primary hereditary form absorbs too much iron.',
  },
  {
    handle: 'melanin', id: 'CON-FND-AA9A76DBB4EE6B', key: 'pigment.melanin.tyrosinase-and-hyperpigmentation', reuse: true,
    label: 'Melanin is made by tyrosinase, and five named conditions increase it',
    aliases: ['Melanin hyperpigmentation', 'Chloasma', 'Addison pigmentation', 'Sun exposure pigmentation'],
    definition: 'Melanin is an endogenous brown pigment increased by prolonged sun exposure, pregnancy-associated chloasma, melanoma and several hormonal or chronic-stimulation settings. Vitiligo is loss of melanin pigmentation rather than a cause of hyperpigmentation.',
    objective: 'Recognize common causes of increased melanin and identify vitiligo as the opposite process.',
    pitfalls: 'Treating every pigmentary disorder as hyperpigmentation. Vitiligo causes depigmented patches because melanocytes or melanin are lost.',
    type: 'mechanism', micro: 'Pigments', nano: 'Melanin hyperpigmentation', article: ironArticle,
    subject: 'Melanin pigmentation', predicate: 'is increased by', object: 'sun exposure, pregnancy and melanoma but not vitiligo',
    display: 'Melanin pigmentation is increased by sun exposure, pregnancy and melanoma but not vitiligo.',
    teachPage: 21, teachText: 'The lecture lists prolonged sun exposure, pregnancy and melanoma among examples of increased melanin and separately classifies reduced pigmentation.',
  },
  {
    handle: 'brain-sparing', id: 'CON-FND-DF3205E3DF3AD1', key: 'pathology.hemosiderosis.primary-brain-sparing', reuse: false, partialGap: true,
    label: 'Family-9 identifies brain as the least likely listed site of primary haemosiderosis',
    aliases: ['Primary hemosiderosis brain sparing', 'Iron-overload organ distribution'],
    definition: 'The Family-9 assessment asks which listed organ is least likely to receive haemosiderin in primary haemosiderosis and visibly prints option E, brain. The Helwan lecture directly names liver, spleen, bone marrow, heart, pancreas and skin in generalized iron overload, but absence from that list does not independently prove the complete least-likely comparison.',
    objective: 'Preserve the exact source-keyed organ comparison while keeping its independent-teaching limitation explicit.',
    pitfalls: 'Inferring a universal organ-exclusion rule from a teaching list or promoting the auxiliary printed letter to an authenticated official key.',
    type: 'distribution', micro: 'Pigments', nano: 'Primary haemosiderosis organ distribution', article: ironArticle,
    subject: 'The Family-9 primary-haemosiderosis comparison', predicate: 'identifies as least likely', object: 'brain involvement among the listed organs',
    display: 'The Family-9 primary-haemosiderosis comparison identifies brain as the least likely listed organ.',
    teachPage: 23, teachText: 'The lecture names liver, spleen and bone marrow microscopically and describes liver, heart, pancreas and skin involvement, but does not directly state a least-likely brain comparison.',
  },
  {
    handle: 'amyloid-definition', id: 'CON-FND-D955408D228002', key: 'amyloid.definition.beta-pleated-extracellular-deposit', reuse: true,
    label: 'Amyloid is extracellular beta-pleated protein deposited on basement membranes and vessel walls',
    aliases: ['Amyloid', 'Amyloidosis', 'Extracellular fibrillary protein'],
    definition: 'Amyloidosis is abnormal extracellular deposition of fibrillar protein in many tissues and organs. Deposits may lie between cells and around blood vessels, appear waxy grossly and homogeneous eosinophilic on routine sections.',
    objective: 'Define amyloidosis as extracellular fibrillar protein deposition in tissues and vessels.',
    pitfalls: 'Calling amyloid intracellular or confusing the descriptive hyaline appearance with the specific extracellular fibrillary deposit.',
    type: 'definition', micro: 'Amyloidosis', nano: 'Extracellular amyloid definition', article: amyloidArticle,
    subject: 'Amyloidosis', predicate: 'is', object: 'abnormal extracellular fibrillar protein deposition in tissues and vessels',
    display: 'Amyloidosis is abnormal extracellular fibrillar protein deposition in tissues and vessels.',
    teachPage: 25, teachText: 'The lecture defines amyloidosis as deposition of abnormal extracellular fibrillar protein in many tissues.',
  },
  {
    handle: 'amyloid-gross', id: 'CON-FND-6DC900946DA3E6', key: 'pathology.amyloid.organ-gross-morphology-exception', reuse: false, partialGap: true,
    label: 'Family-9 keys a bulging cut surface as the exception in its amyloid-organ gross comparison',
    aliases: ['Amyloid organ gross morphology', 'Amyloid gross appearance exception'],
    definition: 'The Family-9 assessment presents enlargement, a stretched capsule, pale grey-brown colour, a bulging cut surface and preserved shape as its comparison and visibly prints option D, bulging out cut section, as the exception. The Helwan lecture independently supports a waxy translucent gross appearance but not the entire option-by-option set.',
    objective: 'Preserve the printed gross-morphology exception without extending the teaching evidence beyond what the lecture states.',
    pitfalls: 'Treating the auxiliary option set as a complete universal gross description or inventing official-key authority.',
    type: 'morphology', micro: 'Amyloidosis', nano: 'Gross organ morphology', article: amyloidArticle,
    subject: 'The Family-9 amyloid-organ comparison', predicate: 'keys as its exception', object: 'a bulging cut surface',
    display: 'The Family-9 amyloid-organ comparison keys a bulging cut surface as its exception.',
    teachPage: 25, teachText: 'The lecture independently describes amyloid grossly as waxy and translucent but does not state the complete Family-9 gross option set.',
  },
  {
    handle: 'systemic-amyloid', id: 'CON-FND-E3F496F6DDD7C3', key: 'amyloidosis.systemic.primary-secondary-senile', reuse: true,
    label: 'Systemic amyloidosis is primary, secondary or senile, and each has its own protein',
    aliases: ['Systemic amyloidosis', 'Myeloma-associated amyloidosis', 'AL amyloid'],
    definition: 'Systemic amyloidosis deposits amyloid in multiple organs. Primary or myeloma-associated systemic amyloidosis uses AL light-chain protein derived from a plasma-cell clone, making plasma-cell myeloma a common tested example. Local endocrine amyloid and cerebral senile amyloid are different distributions.',
    objective: 'Recognize plasma-cell myeloma as a common example of systemic AL amyloidosis.',
    pitfalls: 'Choosing a localized endocrine deposit, macroglossia as a manifestation rather than an aetiologic example, or senile cerebral amyloid as the keyed systemic example.',
    type: 'classification', micro: 'Amyloidosis', nano: 'Systemic amyloidosis', article: amyloidArticle,
    subject: 'Plasma-cell myeloma', predicate: 'is associated with', object: 'systemic AL amyloidosis',
    display: 'Plasma-cell myeloma is associated with systemic AL amyloidosis.',
    teachPage: 27, teachText: 'The lecture states that systemic primary amyloidosis includes multiple myeloma and that AL light chain is derived from plasma cells.',
  },
  {
    handle: 'dystrophic', id: 'CON-FND-33466CEBFC4EBA', key: 'calcification.dystrophic.damaged-tissue-normal-calcium', reuse: true,
    label: 'Dystrophic calcification is calcium laid down in already damaged tissue at a normal serum calcium',
    aliases: ['Dystrophic calcification', 'Psammoma bodies', 'Calcification in damaged tissue'],
    definition: 'Dystrophic calcification occurs in damaged, degenerated or necrotic tissue with normal serum calcium. Meningioma psammoma bodies and fibrosed cardiac valves are characteristic examples.',
    objective: 'Recognize meningioma psammoma bodies and fibrosed valves as dystrophic calcification.',
    pitfalls: 'Assigning psammoma bodies to metastatic calcification or assuming serum calcium must be raised.',
    type: 'definition', micro: 'Pathological Calcification', nano: 'Dystrophic calcification', article: calcificationArticle,
    subject: 'Meningioma psammoma bodies', predicate: 'are an example of', object: 'dystrophic calcification',
    display: 'Meningioma psammoma bodies are an example of dystrophic calcification.',
    teachPage: 34, teachText: 'The lecture states that dystrophic calcification occurs at normal serum calcium and calls meningioma deposits psammoma bodies.',
  },
  {
    handle: 'metastatic', id: 'CON-FND-87392C49DB246C', key: 'calcification.metastatic.viable-tissue-hypercalcaemia', reuse: true,
    label: 'Metastatic calcification is calcium laid down in living tissue because the blood level is high',
    aliases: ['Metastatic calcification', 'Hypercalcaemia', 'Calcification in viable tissue'],
    definition: 'Metastatic calcification occurs in viable tissues because serum calcium is high. Causes include hyperparathyroidism, bone destruction, prolonged immobilisation, hypervitaminosis D, milk-alkali syndrome and sarcoidosis; hypovitaminosis D is the tested exception. Common deposition sites include gastric mucosa, lungs, kidneys and arterial walls, whereas a fibrosed valve is damaged tissue and fits dystrophic calcification. Widespread deposits accompanying destructive bony metastases are metastatic with increased serum calcium.',
    objective: 'Identify causes, sites and a bony-metastasis vignette of metastatic calcification.',
    pitfalls: 'Reading metastatic as tumour spread itself, choosing hypovitaminosis D as a high-calcium cause, or treating a fibrosed valve as viable tissue.',
    type: 'classification', micro: 'Pathological Calcification', nano: 'Metastatic calcification', article: calcificationArticle,
    subject: 'Metastatic calcification', predicate: 'occurs in', object: 'viable tissue during hypercalcaemia and spares dystrophically damaged sites such as fibrosed valves',
    display: 'Metastatic calcification occurs in viable tissue during hypercalcaemia and is distinct from dystrophic calcification of fibrosed valves.',
    teachPage: 34, teachText: 'The lecture states that metastatic calcification occurs in viable tissue when serum calcium is high and contrasts it with dystrophic calcification of fibrosed valves.',
  },
]

for (const concept of concepts) {
  const token = concept.handle.toUpperCase().replaceAll(/[^A-Z0-9]+/g, '-')
  concept.claim = `CLM-HU102-F9P2-${token}-01`
  concept.currCit = `CIT-HU102-F9P2-${token}-CURR`
  concept.span = `SPN-HU102-F9P2-${token}-01`
}
const byHandle = Object.fromEntries(concepts.map((concept) => [concept.handle, concept]))

const questions = [
  { ref: 'Q14', page: 4, concept: 'hemochromatosis', key: 'C', stem: 'Primary hemochromatosis (Bronzed diabetes) is Caused by:', options: ['Injection of Iron as a therapy', 'Increase intake of dietary Iron', 'Inborn error of iron absorption (on chromosome number 6 )', 'All of the above', 'Non of the above'], clue: 'primary haemochromatosis is the hereditary excessive-absorption disorder represented by the chromosome-6 option', reasons: ['therapeutic iron injection is an acquired exposure rather than the inherited primary disorder', 'dietary iron intake alone does not define the inherited absorption defect', 'the inborn absorption error on chromosome 6 is the printed cause', 'the acquired options do not all cause primary haemochromatosis', 'one listed hereditary cause is supplied'] },
  { ref: 'Q15', page: 4, concept: 'hemochromatosis', key: 'B', stem: 'Concerning primary hemochromatosis, it is characterized by all of the following Except:', options: ['Genetic etiology', 'Repeated attacks of hemolysis', 'Liver cirrhosis', 'Diabetes mellitus', 'Bronzed skin'], clue: 'repeated haemolysis causes secondary iron overload rather than inherited primary haemochromatosis', reasons: ['a genetic aetiology defines the primary hereditary form', 'repeated haemolysis belongs to secondary overload and is the printed exception', 'hepatic iron injury can progress to cirrhosis', 'pancreatic injury can produce diabetes mellitus', 'iron plus increased melanin produces bronzed skin'] },
  { ref: 'Q16', page: 4, concept: 'amyloid-definition', key: 'C', stem: 'Abnormal deposition of proteinaceous SUbstance between cells and in blood vessels in many tissue and organs of the body is called:', options: ['Hyalinosis', 'Myxomatous degeneration', 'Amyloidosis', 'Calcification', 'Gout'], clue: 'amyloidosis is abnormal extracellular fibrillar protein deposition in tissues and vessel walls', reasons: ['hyalinosis is a descriptive glassy appearance rather than this specific systemic protein deposit', 'myxomatous degeneration involves mucinous matrix change', 'amyloidosis exactly matches the extracellular proteinaceous deposition described', 'calcification deposits calcium salts rather than fibrillar protein', 'gout deposits urate crystals rather than amyloid protein'] },
  { ref: 'Q17', page: 4, concept: 'amyloid-gross', key: 'D', stem: 'The organ with amyloid deposition is characterized by all of the following except:', options: ['Enlarged size', 'Stretched capsule', 'Pale grayish brownish color', 'Bulging out cut section', 'Preserved shape'], clue: 'the auxiliary source visibly prints bulging out cut section as its exception, while the lecture independently supports only a waxy translucent gross appearance', reasons: ['enlargement belongs to the source\'s non-exception set', 'a stretched capsule accompanies the source\'s enlarged-organ description', 'the pale grey-brown description belongs to the source\'s non-exception set', 'bulging out cut section is the visibly printed exception and is preserved without widening the teaching claim', 'preserved shape belongs to the source\'s non-exception set'] },
  { ref: 'Q19', page: 5, concept: 'dystrophic', key: 'A', stem: 'Psammoma bodies of meningioma is an example of:', options: ['Dystrophic calcification', 'Metastatic calcification', 'Hyalinosis', 'Amyloidosis', 'Hemosiderosis'], clue: 'meningioma psammoma bodies are a named dystrophic calcification pattern', reasons: ['the lecture directly names meningioma psammoma bodies under dystrophic calcification', 'metastatic calcification occurs in viable tissue during hypercalcaemia', 'hyalinosis is glassy eosinophilic material rather than laminated calcium', 'amyloidosis is extracellular fibrillar protein deposition', 'haemosiderosis is iron-pigment accumulation'] },
  { ref: 'Q20', page: 5, concept: 'metastatic', key: 'B', stem: 'The Cause of hypercalcemia may be any of the following except:', options: ['Prolonged immobilization', 'Hypovitaminosis D', 'Milk alkali syndrome', 'Hyperparathyroidism , Thyrotoxicosis and cushing syndrome', 'Sarcoidosis'], clue: 'vitamin-D excess can raise calcium, whereas vitamin-D deficiency is the printed exception', reasons: ['prolonged immobilisation can increase calcium release from bone', 'hypovitaminosis D does not fit the source\'s hypercalcaemic cause set and is the printed exception', 'milk-alkali syndrome can produce hypercalcaemia', 'the listed endocrine disorders belong to the source\'s cause set', 'sarcoidosis can increase active vitamin-D signalling and serum calcium'] },
  { ref: 'Q21', page: 5, concept: 'metastatic', key: 'D', stem: 'In metastatic calcifiction, Calcium may be deposited in the following sites Except:', options: ['Arterial walls', 'Glands in stomach fundus', 'Alveolar walls', 'Fibrosed cardiac valves', 'Renal tubules'], clue: 'fibrosed cardiac valves are damaged tissue and therefore a dystrophic rather than metastatic site', reasons: ['arterial walls can receive metastatic calcium deposits', 'gastric fundic mucosa is a characteristic metastatic site', 'alveolar walls are a characteristic pulmonary site', 'a fibrosed valve is the printed exception because it is a dystrophic damaged-tissue site', 'renal tubules and interstitium are characteristic metastatic sites'] },
  { ref: 'Q22', page: 5, concept: 'melanin', key: 'C', stem: 'Not a Cause of melanin hyperpigmentation', options: ['Addison disease', 'Chloasma of pregnancy', 'Vitiligo', 'Sun ray exposure', 'Melanoma'], clue: 'vitiligo causes loss of pigmentation, unlike the listed hyperpigmenting conditions', reasons: ['primary adrenal failure can increase melanocortin-driven pigmentation', 'pregnancy-associated chloasma is hyperpigmentation', 'vitiligo produces depigmented patches and is the printed exception', 'sun exposure stimulates increased melanin', 'melanoma is a melanocytic tumour associated with melanin pigment'] },
  { ref: 'Q23', page: 5, concept: 'brain-sparing', key: 'E', stem: 'The organ least likely to develop hemosiderin deposits in primary hemosiderosis is:', options: ['Liver', 'Pancreas', 'Heart', 'Skin', 'Brain'], clue: 'the source visibly prints brain as least likely, while the lecture directly names the other listed organs and does not independently establish a universal exclusion', reasons: ['the liver is a major iron-deposition and injury site', 'pancreatic iron injury contributes to diabetes', 'cardiac iron deposition can cause rhythm or pump disease', 'skin pigmentation is part of generalized iron overload', 'brain is the visibly printed least-likely answer and is retained with the teaching limitation explicit'] },
  { ref: 'Q24', page: 5, concept: 'metastatic', key: 'D', stem: 'A 70 years old patient with spread bony metastasis from colon cancer is Found to have calcification of Multiple organs. This calcification is best described as:', options: ['Dystrophic with decreased serum calcium', 'Dystrophic with increased serum calcium', 'Metastatic with decreased serum calcium', 'Metastatic with increased serum calcium', 'Stone with normal serum calcium'], clue: 'destructive bony metastases can raise serum calcium and produce multiple-organ metastatic calcification', reasons: ['dystrophic calcification is local to damaged tissue and not defined by low calcium', 'raised calcium plus multiple viable-organ deposits points away from dystrophic calcification', 'metastatic deposition requires the high-calcium setting rather than decreased calcium', 'metastatic with increased serum calcium matches the printed vignette classification', 'stone formation does not explain diffuse deposits in multiple organs'] },
  { ref: 'Q25', page: 6, concept: 'systemic-amyloid', key: 'C', stem: 'One of the common examples of systemic amyloidosis:-', options: ['Medullary thyroid carcinoma', 'Insulinoma', 'Plasma cell myeloma', 'Macroglossia', 'Senile cerebral amyloidosis'], clue: 'plasma-cell myeloma produces monoclonal light chains that form systemic AL amyloid', reasons: ['medullary thyroid carcinoma produces localized endocrine amyloid', 'insulinoma may have localized islet amyloid rather than the keyed systemic pattern', 'plasma-cell myeloma is a common systemic AL amyloidosis example', 'macroglossia is a manifestation of systemic deposition rather than an aetiologic example', 'senile cerebral amyloid is a localized age-related pattern'] },
]

for (const question of questions) {
  question.id = `Q-HU102-PAT-ACC-F9-${question.ref}`
  question.asmCit = `CIT-HU102-F9P2-${question.ref}-ASM`
}
const conceptQuestions = (concept) => questions.filter((question) => question.concept === concept.handle)
const questionIds = (concept) => conceptQuestions(concept).map((question) => question.id)
const assessmentCitations = (concept) => conceptQuestions(concept).map((question) => question.asmCit)

const sourceRows = `# Item
## id
${assessment}
## title
Cell Accumulation MCQ bank with printed inline keys
## institution
Helwan BMS-102 local corpus; visible instructor attribution to Dr. Ahmed Hassan
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Pathology/Questions/MCQs/MCQs - L4 MCQ.pdf
## media_type
application/pdf
## languages
en
## page_count
7
## sha256
9a70f046e6b0b21ba4ee0a0e0cf7fd5bbec02579156088d72c0dc24312dbfd78
## processing_status
pending
## rights
Local assessment-labelled material held for internal authoring only; no page image is redistributed.
## qualification
Tier-3 local pathology MCQ and written bank with 25 visibly printed single-letter MCQ keys. It has no authenticated sitting, marks, candidate field or official-key designation; printed keys remain auxiliary assessment evidence only.
## is_assessment
yes

---

# Item
## id
${lecture}
## title
Cell Injury 2 — annotated Helwan BMS-102 pathology lecture
## institution
Faculty of Medicine, Helwan University
## collection_id
hu-y1
## source_relative_path
Year 1/BMS 102/Pathology/Notes and Summaries/Cell-injury-lecture-2.pdf
## media_type
application/pdf
## languages
en
## page_count
37
## sha256
034276f9ba5a61ea711a37a89f27bb5fd0df62d98abc12be5619656edc749111
## processing_status
pending
## rights
Local university teaching material held for internal authoring only; no page image is redistributed.
## qualification
Tier-6 annotated Helwan lecture visibly attributed to Dr Enas Megahed Elhosary, Lecturer of Pathology, Faculty of Medicine, Helwan University. It supplies governed curriculum teaching and is not an assessment instrument or official answer key.
## is_assessment
no`

const fullConcept = (concept) => `# Item
## label
${concept.label}
## id
${concept.id}
## canonical_key
${concept.key}
## aliases
${concept.aliases.join('\n')}
## arabic_label

## arabic_aliases
[clear]
## definition
${concept.definition}
## explicit_objective
${concept.objective}
## pitfalls
${concept.pitfalls}
## concept_type
${concept.type}
## status
under review
## subject
fnd
## primary_node_id
SYS-FND-T03-S01
## secondary_node_ids
DIS-PAT-T01
## learner_years
1
## universities
hu
## modules
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Cell Accumulation > ${concept.micro} > ${concept.nano}
## article_ids
${concept.article}
## related_article_ids
${[ironArticle, amyloidArticle, calcificationArticle].filter((id) => id !== concept.article).join('\n')}
## related_concept_ids
${concepts.filter((other) => other.handle !== concept.handle && other.article === concept.article).map((other) => other.id).join('\n')}
## resource_ids
${lecture}
${assessment}
## approved_file_resource_ids
[clear]
## approved_video_resource_ids
[clear]
## blueprint_weight
0.84
## exam_weight_by_year
HU_Y1=0.84
## clinical_relevance
0.78
## academic_relevance
0.98
## weight_confidence
0.65
## support_mode
direct_statement
## confidence
${concept.partialGap ? '0.78' : '0.92'}
## exam_signal
${assessment} | tier-3 local keyed study bank | undated | Family-9 ${conceptQuestions(concept).map((question) => question.ref).join(', ')}
## atomic_claim_ids
${concept.claim}
## resource_occurrence_ids
[clear]
## source_candidate_ids
[clear]
## original_wording
[Teaching p${concept.teachPage}] ${concept.teachText}
${conceptQuestions(concept).map((question) => `[Assessment PDF p${question.page} ${question.ref}] ${question.stem} Answer: ${question.options['ABCDE'.indexOf(question.key)]}.`).join('\n')}
## merge_ids
[clear]
## rejected_merge_candidate_ids
[clear]
## conflicts
[clear]
## uncertainty
${concept.partialGap ? 'The governed lecture provides partial context but does not independently state the complete comparison printed in the Family-9 item.' : '[clear]'}
## evidence_gaps
${concept.partialGap ? 'Independent medical verification and Helwan faculty review of the complete source-specific comparison are required before publication.' : 'Independent medical verification and Helwan faculty review remain required before publication.'}
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
arabicAliases: No distinct source-supported Arabic alias has been reviewed.
microtopicId: No reviewed microtopic ID exists beneath the canonical general-pathology placement.
nanotopicId: No reviewed nanotopic ID exists beneath the assigned canonical node.
approvedFileResourceIds: Local source files are not rights-cleared for redistribution.
approvedVideoResourceIds: No video is assigned.
resourceOccurrenceIds: Hand-authored from exact governed pages.
sourceCandidateIds: Family 9 completed the four-query search-before-mint gate in the governing triage.
mergeIds: No merge occurred; the exact canonical scope is represented once.
rejectedMergeCandidateIds: No rival same-scope concept survived triage.
lastReviewed: New HU overlay; no faculty review has occurred.
reviewDue: Set after first faculty review.
exclusionReason: Not excluded; held at needs_evidence.
reuseGovernance: ${concept.reuse ? 'Standalone-complete HU overlay preserving the exact governed concept ID, canonical key and meaning.' : 'New Family-9 question-led concept after the governed no-same-scope search result.'}`

const explanation = (question, index) => {
  const correct = 'ABCDE'.indexOf(question.key)
  if (index === correct) return `${question.options[index]} is correct because ${question.reasons[index]}. The decisive distinction is that ${question.clue}. This preserves the printed key and exact option wording while keeping the record Draft for review.`
  return `${question.options[index]} does not fit because ${question.reasons[index]}. The decisive distinction is that ${question.clue}, which supports ${question.options[correct]}. The comparison remains tied to governed teaching and the exact assessment occurrence.`
}

const questionRow = (question) => {
  const concept = byHandle[question.concept]
  const moderate = ['Q14', 'Q15', 'Q17', 'Q20', 'Q23', 'Q24'].includes(question.ref)
  return `# Item
## id
${question.id}
## title
${question.stem}
## subject
fnd
## status
Draft
## owner
Helwan Year-1 authoring lane
## vignette

## question
${question.stem}
## format
single best answer
## derived_from

## correct_answer
${question.key}
${question.options.map((option, index) => `## answer_${'abcde'[index]}\n${option}\n## explanation_${'abcde'[index]}\n${explanation(question, index)}`).join('\n')}
## topic
General pathology
## subtopic
Cell Accumulation
## difficulty
${moderate ? 'Moderate' : 'Easy'}
## question_type
Concept discrimination
## main_concept
${concept.id}
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Cell Accumulation > ${concept.micro}
## clinical_relevance
0.78
## academic_relevance
0.98
## cognitive_effort_score
${moderate ? '0.62' : '0.48'}
## exam_weight_by_year
HU_Y1=0.84
## question_only_for
HU_Y1
## concept_ids
${concept.id}
## years
HU_Y1
## universities
hu
## cognitive_effort
${moderate ? 'Medium' : 'Low'}
## setting
Both
## reasoning_level
2
## inferred_difficulty
${moderate ? 60 : 46}
## exam_relevance
8
## contextual_concept_ids

## library_ids
${concept.article}
## resource_ids
${assessment}
${lecture}
## learning_objective
${concept.objective}
## media_recommendations

## source_citation
${assessment}, PDF p${question.page}, Family-9 ${question.ref}: exact stem, option order and visibly printed answer ${question.options['ABCDE'.indexOf(question.key)]} preserved. Authority: tier-3 local keyed study bank, not an official exam or authenticated official key. Teaching context: ${lecture}, PDF p${concept.teachPage}.
## attachments

## attached_image

## author_notes
Exact source wording and option order are preserved, including source spelling, punctuation and capitalization. No official sitting, marks, recurrence or candidate response is inferred.${concept.partialGap ? ' The partial-teaching gap is explicit and no broader conclusion is inferred.' : ''}${concept.reuse ? ' This row reuses a governed exact-scope concept by exact ID.' : ''}
## estimated_seconds
75
## randomise_answers
yes`
}

const articleRow = ({ id, title, aliases, subset, others, micro, summary, sections, loses, basis, gap }) => `# Item
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
Cell Accumulation
## microtopic
${micro}
## nanotopic
Question-led definitions, morphology and discrimination
## primary_node_id
SYS-FND-T03-S01
## secondary_node_ids
DIS-PAT-T01
## template_id
TPL-CONCEPT
## archetype
concept
## language
en
## learner_stage
Years 1–3 foundation
## reading_time
10
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
${subset.map((concept) => concept.display).join('\n')}
## lose_the_mark
${loses.join('\n')}
## related_concepts
${subset.map((concept) => concept.id).join('\n')}
## related_articles
${others.join('\n')}
## question_ids
${subset.flatMap(questionIds).join('\n')}
## resource_ids
${lecture}
${assessment}
## universities
hu
## years
HU_Y1
## module
HU-BMS-102
## module_subject
HU-BMS-102 > Pathology > Cell Accumulation > ${micro}
## university_notes
hu: Restricted to HU-BMS-102 Year-1; governed Helwan teaching supplies curriculum context and the Family-9 bank supplies exact auxiliary printed-key occurrences without official-exam authority.
## annotations
${subset.map((concept) => `### definition_of · ${concept.id}\nQuote: ${concept.display}\nBlock: body`).join('\n\n')}
## media

## media_recommendations

## callout_evidence
${subset.map((concept) => `### ${concept.display}\nClaims: ${concept.claim}\nCitations: ${[concept.currCit, ...assessmentCitations(concept)].join(', ')}\nSpan: ${concept.span}`).join('\n\n')}
## article_source_ids
${lecture}
${assessment}
## claim_ids
${subset.map((concept) => concept.claim).join('\n')}
## span_ids
${subset.map((concept) => concept.span).join('\n')}
## publication_gate
needs_evidence
## evidence_basis
${basis}
## evidence_gaps
${gap}
## conflicts
[clear]
## last_reviewed

## review_due

## notes
Exact source wording is retained in linked questions; prose standardizes terminology without changing printed keys.
## field_notes
arabicTitle: Blank pending independently verified Arabic terminology review.
publishedSummary: Blank because status is Draft.
publishedSections: Blank because status is Draft.
media: No rights-cleared asset is attached; this article is text-runnable.
mediaRecommendations: No visual is required for the tested distinctions.
lastReviewed: New draft; no faculty review has occurred.
reviewDue: Set only after first faculty review.`

const ironConcepts = concepts.filter((concept) => concept.article === ironArticle)
const amyloidConcepts = concepts.filter((concept) => concept.article === amyloidArticle)
const calcConcepts = concepts.filter((concept) => concept.article === calcificationArticle)
const articles = [
  articleRow({
    id: ironArticle, title: 'Hereditary haemochromatosis, melanin and iron-organ distribution', aliases: ['Bronzed diabetes and pigmentation', 'Question-led iron overload and melanin'], subset: ironConcepts, others: [amyloidArticle, calcificationArticle], micro: 'Pigments',
    summary: 'Primary haemochromatosis is hereditary excessive iron absorption that injures liver, pancreas, heart and skin; repeated haemolysis belongs to secondary overload. Sun exposure, pregnancy and melanoma increase melanin, whereas vitiligo causes pigment loss. Family-9 separately keys brain as the least likely listed primary-haemosiderosis site, retained with a partial-teaching warning.',
    sections: `### Definition\n${byHandle.hemochromatosis.display} ${byHandle.melanin.display}\n\n### Mechanism\nExcess absorbed iron accumulates in parenchymal organs and drives fibrosis and dysfunction. Hepatic injury causes cirrhosis, pancreatic injury contributes to diabetes, and skin bronzing reflects iron together with increased melanin. Repeated haemolysis loads iron secondarily and therefore does not characterize the inherited primary disorder.\n\n### Key determinants\nFamily-9 Q14 identifies the inborn chromosome-6 absorption error; Q15 makes repeated haemolysis the exception. Q22 reverses a pigment list: Addison disease, pregnancy chloasma, sunlight and melanoma increase pigmentation, while vitiligo causes loss. ${byHandle['brain-sparing'].display}\n\n### Evidence caution\nThe lecture directly names liver, spleen, marrow, heart, pancreas and skin involvement. It does not independently state that brain is universally spared or least likely, so Q23 remains a source-specific Draft comparison rather than a generalized exclusion rule.\n\n### Clinical significance\nThe organ pattern explains the traditional bronzed-diabetes triad: chronic liver injury, pancreatic endocrine dysfunction and skin pigmentation in a systemic iron-loading disease.`,
    loses: ['Calling repeated haemolysis a feature of primary hereditary haemochromatosis.', 'Treating vitiligo as increased melanin.', 'Inferring a universal brain-exclusion rule from an organ list.'],
    basis: 'Helwan Cell Injury 2 pp21–23 supplies pigment and iron-overload teaching; Family-9 assessment PDF pp4–5 supplies four exact printed-key occurrences.',
    gap: 'Independent medical verification and Helwan faculty review remain required. The Q23 least-likely brain comparison has only partial teaching support and is not promoted beyond its exact auxiliary occurrence.',
  }),
  articleRow({
    id: amyloidArticle, title: 'Amyloidosis: extracellular definition, organ appearance and systemic myeloma association', aliases: ['Amyloid morphology and systemic patterns', 'Question-led amyloidosis'], subset: amyloidConcepts, others: [ironArticle, calcificationArticle], micro: 'Amyloidosis',
    summary: 'Amyloidosis is extracellular fibrillar protein deposition in tissues and vessel walls. Amyloid is waxy grossly, and plasma-cell myeloma supplies AL light chains in systemic amyloidosis. Family-9’s gross-organ exception is retained with its incomplete independent teaching support made explicit.',
    sections: `### Definition\n${byHandle['amyloid-definition'].display} ${byHandle['systemic-amyloid'].display}\n\n### Mechanism\nMisfolded fibrillar protein accumulates extracellularly and around small vessels. In plasma-cell myeloma, a monoclonal light-chain product supplies AL amyloid, allowing deposits to occur systemically rather than in one localized endocrine or cerebral site.\n\n### Key determinants\nQ16 identifies the extracellular protein-deposition definition. Q25 distinguishes plasma-cell myeloma, an aetiologic systemic example, from macroglossia, which is a manifestation, and from localized endocrine or cerebral deposits. ${byHandle['amyloid-gross'].display}\n\n### Evidence caution\nThe lecture independently describes amyloid as waxy and translucent but does not state every Q17 option. The printed exception is therefore preserved as source-specific Draft evidence rather than expanded into a universal gross rule.\n\n### Clinical significance\nSeparate substance, distribution and manifestation: amyloid is the extracellular fibrillar substance; systemic AL amyloid is the distribution linked to plasma-cell myeloma; organ enlargement or macroglossia are consequences.`,
    loses: ['Calling amyloid intracellular.', 'Using macroglossia as the cause of systemic amyloidosis.', 'Presenting the Q17 option set as independently verified complete morphology.'],
    basis: 'Helwan Cell Injury 2 pp25 and 27 supplies definition, gross context and systemic/myeloma teaching; Family-9 assessment PDF pp4 and 6 supplies three exact printed-key occurrences.',
    gap: 'Independent medical verification and Helwan faculty review remain required. Q17’s complete gross option set is not independently supplied by the lecture.',
  }),
  articleRow({
    id: calcificationArticle, title: 'Calcification examples, hypercalcaemia causes and metastatic deposition sites', aliases: ['Psammoma bodies and metastatic calcification', 'Question-led pathological calcification sites'], subset: calcConcepts, others: [ironArticle, amyloidArticle], micro: 'Pathological Calcification',
    summary: 'Meningioma psammoma bodies and fibrosed valves are dystrophic calcification in damaged tissue. Metastatic calcification affects viable tissue during hypercalcaemia, including gastric, pulmonary, renal and arterial sites, and can follow destructive bony metastases.',
    sections: `### Definition\n${byHandle.dystrophic.display} ${byHandle.metastatic.display}\n\n### Mechanism\nDystrophic calcium precipitates locally in damaged tissue despite normal serum calcium. Metastatic calcium reaches viable tissues because the circulating calcium level is raised by endocrine, skeletal, vitamin-D or other systemic causes.\n\n### Key determinants\nQ19 identifies meningioma psammoma bodies as dystrophic. Q20 makes hypovitaminosis D the exception among hypercalcaemic causes. Q21 makes a fibrosed valve the damaged-tissue exception among metastatic sites. Q24 combines destructive bony metastases, raised calcium and multiple-organ deposits into metastatic calcification.\n\n### Site comparison\nArterial walls, gastric fundic glands, alveolar walls and renal tubules are viable-tissue deposition sites. A fibrosed cardiac valve has already been damaged and therefore belongs to dystrophic calcification.\n\n### Clinical significance\nThe two-question rule is tissue status plus serum calcium: damaged substrate and normal calcium indicate dystrophic deposition; viable organs exposed to hypercalcaemia indicate metastatic deposition.`,
    loses: ['Calling psammoma bodies metastatic.', 'Choosing hypovitaminosis D as a cause of hypercalcaemia.', 'Calling a fibrosed valve a viable metastatic site.'],
    basis: 'Helwan Cell Injury 2 p34 supplies the dystrophic/metastatic teaching; Family-9 assessment PDF p5 supplies four exact printed-key occurrences.',
    gap: 'Independent medical verification and Helwan faculty review remain required before publication. The keyed bank is auxiliary and not an authenticated official key.',
  }),
].join('\n---\n\n')

const claimRow = (concept) => `# Item
## id
${concept.claim}
## concept_id
${concept.id}
## subject
${concept.subject}
## predicate
${concept.predicate}
## object
${concept.object}
## display_text
${concept.display}
## risk_class
foundational_stable
## verification_status
needs_evidence
## conflict_status
none
## confidence
${concept.partialGap ? '0.78' : '0.92'}
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
authority: governed Helwan teaching plus auxiliary printed answer; ${concept.partialGap ? 'complete comparison requires independent verification' : 'no official-key authority inferred'}`

const curriculumCitation = (concept) => `# Item
## id
${concept.currCit}
## claim_id
${concept.claim}
## resource_id
${lecture}
## evidence_role
local_curriculum
## support_span
${concept.teachText}
## locator_type
page
## locator_page
${concept.teachPage}
## locator_section
${concept.micro}
## locator_detail
PDF p${concept.teachPage}, governed Helwan teaching source
## context_note
${concept.partialGap ? 'Partial teaching context only; the source-specific comparison requires independent review.' : 'Local curriculum support only; independent medical verification remains required.'}
## confidence
${concept.partialGap ? '0.70' : '0.92'}
## counts_as_claim_evidence
no`

const assessmentCitation = (question) => {
  const concept = byHandle[question.concept]
  return `# Item
## id
${question.asmCit}
## claim_id
${concept.claim}
## resource_id
${assessment}
## evidence_role
auxiliary_assessment
## support_span
${question.stem} Answer: ${question.options['ABCDE'.indexOf(question.key)]}.
## locator_type
page
## locator_page
${question.page}
## locator_section
Family 9 ${question.ref}
## locator_detail
PDF p${question.page}, exact prompt and visibly printed inline key
## context_note
Tier-3 local keyed study-bank evidence only; not an official exam or authenticated official key.${concept.partialGap ? ' Independent teaching supports only part of this comparison.' : ''}
## confidence
0.95
## counts_as_claim_evidence
no`
}

const spanRow = (concept) => `# Item
## id
${concept.span}
## article_id
${concept.article}
## section_id
${concept.article.toLowerCase()}-${concept.nano.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}
## text
${concept.display}
## claim_ids
${concept.claim}
## citation_ids
${[concept.currCit, ...assessmentCitations(concept)].join('\n')}`

const relationDefs = [
  ['hemochromatosis', 'associated_with', 'melanin', 'bronzed skin in haemochromatosis includes increased melanin as well as iron'],
  ['hemochromatosis', 'associated_with', 'brain-sparing', 'the source-specific brain comparison sits within generalized primary iron-overload distribution'],
  ['amyloid-definition', 'associated_with', 'amyloid-gross', 'extracellular amyloid deposition produces the gross organ comparison tested by Family-9'],
  ['systemic-amyloid', 'is_a', 'amyloid-definition', 'systemic amyloidosis is a distributional class of extracellular amyloid deposition'],
  ['dystrophic', 'contrasts_with', 'metastatic', 'damaged tissue with normal calcium contrasts with viable tissue exposed to hypercalcaemia'],
]
const relationRow = ([source, type, target, scope]) => {
  const a = byHandle[source]
  const b = byHandle[target]
  return `# Item
## source
${a.id}
## type
${type}
## target
${b.id}
## evidence_claim_ids
${a.claim}
${b.claim}
## citation_ids
${a.currCit}
${b.currCit}
## verification_status
needs_evidence
## confidence
${a.partialGap || b.partialGap ? '0.76' : '0.86'}
## qualifiers
scope: ${scope}
## reviewer
Medical team, Helwan Pathology faculty`
}

const files = new Map([
  ['evidence/HU-BMS-102-pathology-family9-part2-sources.md', sourceRows],
  ['article/HU-BMS-102-pathology-family9-part2-articles.md', articles],
  ['concept/HU-BMS-102-pathology-family9-part2-concepts.md', concepts.map(fullConcept).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family9-part2-claims.md', concepts.map(claimRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family9-part2-citations.md', [...concepts.map(curriculumCitation), ...questions.map(assessmentCitation)].join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family9-part2-spans.md', concepts.map(spanRow).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family9-part2-relations.md', relationDefs.map(relationRow).join('\n---\n\n')],
  ['question/HU-BMS-102-pathology-family9-part2-mcq.md', questions.map(questionRow).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({
  family: '9-part2-routine-closure', refs: questions.map((question) => `F9-${question.ref}`), keys: questions.map((question) => question.key),
  released: { sources: 2, articles: 3, concepts: 8, newConcepts: 2, standaloneCompleteConceptReuses: 6, questions: 11, claims: 8, citations: 19, spans: 8, relations: 5 },
  remainingRoutine: 0, holds: { questionableKey: ['F9-Q18'], unkeyedWrittenPrompts: 9 }, partialTeachingGaps: ['F9-Q17', 'F9-Q23'],
}, null, 2))
