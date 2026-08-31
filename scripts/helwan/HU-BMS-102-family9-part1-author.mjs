import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const assessment = 'src_9a70f046e6b0b21ba4ee'
const lecture = 'src_034276f9ba5a61ea711a'
const calcificationArticle = 'ART-HU-BMS102-PAT-F9P1-CALCIFICATION'
const depositsArticle = 'ART-HU-BMS102-PAT-F9P1-HYALINE-AMYLOID'
const idFor = (key) => `CON-FND-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`

const concepts = [
  {
    handle: 'dystrophic', id: 'CON-FND-33466CEBFC4EBA', key: 'calcification.dystrophic.damaged-tissue-normal-calcium',
    label: 'Dystrophic calcification is calcium laid down in already damaged tissue at a normal serum calcium',
    aliases: ['Dystrophic calcification', 'Calcification in damaged tissue', 'Psammoma bodies'],
    definition: 'Dystrophic calcification is deposition of calcium salts in damaged, degenerated or necrotic tissue while the serum calcium is normal. The governed Helwan lecture lists old scars, chronic abscess walls, fibrosed valves, atheroma, fat necrosis and meningioma psammoma bodies; the assessment also tests dead parasitic structures and degenerated tumours as examples.',
    objective: 'Recognize dystrophic calcification from damaged tissue, normal serum calcium and representative examples.',
    pitfalls: 'Selecting a hypercalcaemic state such as primary hyperparathyroidism as a dystrophic example. High serum calcium instead points toward metastatic calcification.',
    type: 'definition', micro: 'Pathological Calcification', nano: 'Dystrophic calcification', article: calcificationArticle,
    subject: 'Dystrophic calcification', predicate: 'occurs in', object: 'damaged tissue despite normal serum calcium',
    display: 'Dystrophic calcification occurs in damaged tissue despite normal serum calcium.',
    teachPage: 34, teachText: 'The lecture defines dystrophic calcification as the commonest type, states that serum calcium is normal, and lists degenerated tissue, old scar, chronic abscess, fibrosed valve, atheroma, psammoma bodies and fat necrosis.', reuse: true,
  },
  {
    handle: 'hyaline', id: 'CON-FND-5CB8B822A9A6AF', key: 'hyaline.change.intracellular-and-extracellular',
    label: 'Hyaline change names a glassy pink appearance, not a single substance',
    aliases: ['Hyaline change', 'Hyalinosis', 'Russell bodies', 'Hyaline arteriolosclerosis'],
    definition: 'Hyalinosis is a descriptive glassy, homogeneous, structureless eosinophilic appearance that may be intracellular or extracellular. Russell bodies in plasma cells are an intracellular example. Extracellular hyaline occurs in arteriolar walls in chronic benign hypertension and in old scars and tumours.',
    objective: 'Define hyaline change and distinguish Russell-body and arteriolar-wall examples.',
    pitfalls: 'Treating hyaline as one chemical substance or confusing its homogeneous glassy appearance with amyloid, which requires specific staining for confirmation.',
    type: 'definition', micro: 'Hyaline Change', nano: 'Intracellular and extracellular hyaline', article: depositsArticle,
    subject: 'Hyaline change', predicate: 'appears as', object: 'homogeneous glassy eosinophilic material inside cells or extracellularly',
    display: 'Hyaline change appears as homogeneous glassy eosinophilic material inside cells or extracellularly.',
    teachPage: 15, teachText: 'The lecture defines hyalinosis as glassy, homogeneous, structureless eosinophilic material and lists Russell bodies plus chronic-hypertension arteriolar walls.', reuse: true,
  },
  {
    handle: 'amyloid-stain', id: 'CON-FND-4867DD3814D088', key: 'amyloid.staining.congo-red-apple-green-birefringence',
    label: 'Congo red under polarised light gives amyloid its apple-green birefringence',
    aliases: ['Congo red', 'Apple-green birefringence', 'Amyloid stain'],
    definition: 'Amyloid stains red with Congo red and shows apple-green birefringence when viewed under polarised light. The combined stain and optical finding is the high-yield distinction; ordinary haematoxylin and eosin shows amorphous eosinophilic material but is not specific.',
    objective: 'Name the stain, optical method and colour used to identify amyloid.',
    pitfalls: 'Stopping at the red Congo-red appearance. The characteristic tested observation is apple-green birefringence under polarised light.',
    type: 'investigation', micro: 'Amyloidosis', nano: 'Congo-red staining', article: depositsArticle,
    subject: 'Congo-red-stained amyloid', predicate: 'shows', object: 'apple-green birefringence under polarised light',
    display: 'Congo-red-stained amyloid shows apple-green birefringence under polarised light.',
    teachPage: 25, teachText: 'The lecture states that Congo red stains amyloid red and produces apple-green birefringence under polarised light.', reuse: true,
  },
  {
    handle: 'amyloid-definition', id: 'CON-FND-D955408D228002', key: 'amyloid.definition.beta-pleated-extracellular-deposit',
    label: 'Amyloid is extracellular beta-pleated protein deposited on basement membranes and vessel walls',
    aliases: ['Amyloid', 'Amyloidosis', 'Extracellular fibrillary protein'],
    definition: 'Amyloidosis is deposition of abnormal extracellular fibrillar protein in tissues. It is extracellular rather than intracellular, often begins around small vessels and basement membranes, and appears waxy grossly and homogeneous eosinophilic on routine sections.',
    objective: 'Identify amyloid as abnormal extracellular fibrillar protein and distinguish it from intracellular deposits.',
    pitfalls: 'Calling amyloid intracellular or relying on routine pink morphology alone; hyaline change can look similar and Congo-red polarised-light examination supplies the specific distinction.',
    type: 'definition', micro: 'Amyloidosis', nano: 'Extracellular amyloid definition', article: depositsArticle,
    subject: 'Amyloid', predicate: 'is', object: 'abnormal extracellular fibrillar protein deposited in tissues',
    display: 'Amyloid is abnormal extracellular fibrillar protein deposited in tissues.',
    teachPage: 25, teachText: 'The lecture defines amyloidosis as deposition of abnormal extracellular fibrillar protein in many tissues and describes its waxy and eosinophilic appearances.', reuse: true,
  },
  {
    handle: 'metastatic', id: 'CON-FND-87392C49DB246C', key: 'calcification.metastatic.viable-tissue-hypercalcaemia',
    label: 'Metastatic calcification is calcium laid down in living tissue because the blood level is high',
    aliases: ['Metastatic calcification', 'Hypercalcaemic calcification', 'Calcification in viable tissue'],
    definition: 'Metastatic calcification is calcium deposition in viable tissue in the setting of hypercalcaemia. It contrasts with dystrophic calcification in injured tissue. Hyperparathyroidism is a tested association, while infarcts and other necrotic sites fit dystrophic rather than metastatic deposition.',
    objective: 'Recognize metastatic calcification by viable tissue, raised serum calcium and hyperparathyroidism.',
    pitfalls: 'Reading metastatic as tumour spread or choosing an infarct as its characteristic site. Here metastatic describes calcium carried to otherwise viable tissue.',
    type: 'classification', micro: 'Pathological Calcification', nano: 'Metastatic calcification', article: calcificationArticle,
    subject: 'Metastatic calcification', predicate: 'occurs in', object: 'viable tissue during hypercalcaemia',
    display: 'Metastatic calcification occurs in viable tissue during hypercalcaemia.',
    teachPage: 34, teachText: 'The lecture states that metastatic calcification occurs in viable tissue when serum calcium is high and is caused by hypercalcaemia.', reuse: true,
  },
  {
    handle: 'renal-sequence', key: 'pathology.calcification.renal-failure-hyperparathyroidism-calcium-deposition-sequence',
    label: 'The Family-9 renal-failure sequence keys renal calcium deposition as the fourth event',
    aliases: ['Renal failure calcification sequence', 'Secondary hyperparathyroidism calcium deposition'],
    definition: 'The Family-9 assessment asks learners to order renal failure, hyperparathyroidism, calcium mobilisation, hypercalcaemia and renal calcium deposition, and visibly prints option C, deposition of calcium in the kidney, as its answer to the fourth-event prompt. The governed lecture supports the broader metastatic-calcification endpoint but does not independently state this complete tested order.',
    objective: 'Preserve and recognize the source-keyed fourth event without treating the auxiliary bank as an official key.',
    pitfalls: 'Inventing an official mark scheme or silently rewriting the printed sequence. The exact keyed occurrence is retained as Draft with an explicit sequence-specific evidence gap.',
    type: 'sequence', micro: 'Pathological Calcification', nano: 'Renal-failure calcium-deposition sequence', article: calcificationArticle,
    subject: 'The Family-9 renal-failure sequence', predicate: 'keys as its fourth event', object: 'deposition of calcium in the kidney',
    display: 'The Family-9 renal-failure sequence keys deposition of calcium in the kidney as its fourth event.',
    teachPage: 34, teachText: 'The lecture supplies only the broader endpoint: metastatic calcification occurs in viable tissue when serum calcium is high; it does not independently state the complete Family-9 event order.', reuse: false, sequenceGap: true,
  },
]

for (const concept of concepts) {
  concept.id ??= idFor(concept.key)
  const token = concept.handle.toUpperCase().replaceAll(/[^A-Z0-9]+/g, '-')
  concept.claim = `CLM-HU102-F9P1-${token}-01`
  concept.currCit = `CIT-HU102-F9P1-${token}-CURR`
  concept.span = `SPN-HU102-F9P1-${token}-01`
}
const byHandle = Object.fromEntries(concepts.map((concept) => [concept.handle, concept]))

const questions = [
  { ref: 'Q01', page: 2, concept: 'dystrophic', key: 'A', stem: 'Dystrophic calcification occurs in all of the following Except:', options: ['Primary hyper-parathyroidism', 'Atheroma', 'Degenerated uterine Leiomyoma (fibromyoma)', 'Dead bilharzial ova', 'Fibrosed cardiac valves'], clue: 'dystrophic calcification belongs to damaged tissue at normal serum calcium, whereas primary hyperparathyroidism creates a hypercalcaemic metastatic setting', reasons: ['primary hyperparathyroidism raises serum calcium and is the printed exception', 'atheroma is a classic damaged-tissue site', 'a degenerated leiomyoma can calcify dystrophically', 'dead bilharzial ova can undergo dystrophic calcification', 'a fibrosed valve is damaged tissue and may calcify dystrophically'] },
  { ref: 'Q02', page: 2, concept: 'hyaline', key: 'C', stem: 'Russell bodies in plasma cells of Rhinoscleroma are an example of:', options: ['Amyloidosis', 'Mucoid degeneration', 'Hyaline change', 'Fibrinoid degeneration', 'Cloudy swelling'], clue: 'Russell bodies are intracellular hyaline inclusions in plasma cells', reasons: ['amyloid is an extracellular fibrillar deposit', 'mucoid degeneration produces mucin-rich material rather than Russell bodies', 'Russell bodies are the lecture-listed intracellular hyaline example', 'fibrinoid change is an extracellular vessel-wall pattern associated with immune injury', 'cloudy swelling is reversible hydropic cell injury'] },
  { ref: 'Q03', page: 2, concept: 'hyaline', key: 'B', stem: 'The change of tisSUe (intracellular and extracellular) homogeneous retractile glassy material is called:', options: ['Cloudy swelling', 'Hyaline change', 'Amyloidosis', 'Calcification', 'Pigmentation'], clue: 'hyaline is the descriptive term for homogeneous glassy intracellular or extracellular material', reasons: ['cloudy swelling is water accumulation with pale swollen cells', 'hyaline change exactly names the described glassy appearance', 'amyloid is a specific extracellular fibrillar deposit and not the general intracellular-or-extracellular descriptor', 'calcification is calcium-salt deposition', 'pigmentation is accumulation of coloured endogenous or exogenous material'] },
  { ref: 'Q04', page: 2, concept: 'hyaline', key: 'B', stem: 'Hyaline change in arteriolar wall is Due to:', options: ['Malignant hypertension', 'Benign hypertension', 'Polyarteritis Nodosa', 'Atherosclerosis', 'None of the above'], clue: 'chronic benign hypertension produces extracellular hyaline thickening of arteriolar walls', reasons: ['malignant hypertension is associated with hyperplastic arteriolosclerosis and fibrinoid necrosis', 'benign hypertension is the lecture-listed setting for arteriolar hyaline change', 'polyarteritis nodosa causes necrotizing arteritis rather than simple hyaline arteriolosclerosis', 'atherosclerosis affects larger arteries with intimal plaques', 'one listed cause directly matches the taught arteriolar pattern'] },
  { ref: 'Q05', page: 2, concept: 'amyloid-stain', key: 'D', stem: 'Congo red stain and using polarized light to stain amyloid protein reveals:', options: ['Red color', 'Pink color', 'Homogenous brown birefringence', 'Apple green birefringence', 'Black color'], clue: 'Congo-red-stained amyloid shows apple-green birefringence under polarised light', reasons: ['red is the ordinary-light Congo-red colour, not the polarised-light finding asked for', 'pink is the routine haematoxylin-and-eosin appearance', 'brown relates to iodine staining rather than Congo red under polarised light', 'apple-green birefringence is the characteristic polarised-light result', 'black is not the described Congo-red or polarised-light appearance'] },
  { ref: 'Q06', page: 2, concept: 'amyloid-definition', key: 'B', stem: 'Which is not True about amyloidosis:', options: ['Sometimes derived from immunoglobulin light chains', 'Intracellular protein', 'Deposited initially in the wall of blood vessels', 'Extracellular fibrillary material', 'Shows green birefringence under polarized light when stained with congo red'], clue: 'amyloid is extracellular fibrillary protein, so calling it intracellular is the false statement', reasons: ['AL amyloid can derive from immunoglobulin light chains', 'amyloid is extracellular, making this the printed false statement', 'small-vessel walls are a recognized early distribution', 'extracellular fibrillary material is part of the definition', 'Congo red with polarised light produces apple-green birefringence'] },
  { ref: 'Q07', page: 3, concept: 'dystrophic', key: 'B', stem: 'Concerning dystrophic calcification , all are true Except:', options: ['Tissue is degenerated and necrotic', 'Calcium level is elevated', 'Appear as psammoma bodies in some tumors', 'May affect dead bilharzial ova', 'May affect infarctions'], clue: 'dystrophic calcification develops in injured tissue with normal rather than elevated serum calcium', reasons: ['degenerated or necrotic tissue is the defining setting', 'elevated calcium instead supports metastatic calcification and is the printed exception', 'psammoma bodies are a dystrophic pattern in some tumours', 'dead ova provide a damaged substrate for dystrophic deposition', 'infarcted tissue is necrotic and may calcify dystrophically'] },
  { ref: 'Q08', page: 3, concept: 'metastatic', key: 'D', stem: 'Concerning metastatic calcification , all are true Except:', options: ['Hypercalcemia is present', 'Tissue is healthy', 'Stomach , lung and kidney are common sites of deposition', 'May affect infarctions', 'May be depositied in walls of arteries'], clue: 'metastatic calcification affects viable tissue in hypercalcaemia, while an infarct is damaged tissue and fits dystrophic calcification', reasons: ['hypercalcaemia is the characteristic systemic setting', 'the receiving tissue is viable rather than necrotic', 'stomach, lung and kidney are classic deposition sites', 'infarction creates necrotic tissue, so this is the printed exception', 'arterial walls can receive metastatic calcium deposits'] },
  { ref: 'Q09', page: 3, concept: 'dystrophic', key: 'A', stem: 'Dystrophic calcification occurs in all of the following EXCEPT:', options: ['Primary hyper-parathyroidism', 'Atheromatous plaque', 'Degenerated uterine fibromyoma', 'Dead bilharzial ova.', 'Wall of hydatid cyst'], clue: 'primary hyperparathyroidism is a systemic hypercalcaemic cause rather than a damaged-tissue example', reasons: ['primary hyperparathyroidism is the printed exception because it favours metastatic calcification', 'an atheromatous plaque is damaged tissue', 'a degenerated fibromyoma is a classic dystrophic site', 'dead bilharzial ova can calcify in damaged tissue', 'a chronic damaged hydatid-cyst wall can calcify dystrophically'] },
  { ref: 'Q10', page: 3, concept: 'dystrophic', key: 'C', stem: 'Dystrophic calcification may occur in the following except:', options: ['Wall of a chronic abscess', 'Fat necrosis', 'Primary hyperparathyroidism', 'Atheromatous plaque', 'Degenerated tumor tissue'], clue: 'the damaged-tissue examples are dystrophic, whereas primary hyperparathyroidism raises serum calcium', reasons: ['a chronic abscess wall is damaged tissue', 'fat necrosis is a classic dystrophic setting', 'primary hyperparathyroidism creates hypercalcaemia and is the printed exception', 'atheromatous plaque can calcify dystrophically', 'degenerated tumour tissue can calcify dystrophically'] },
  { ref: 'Q11', page: 3, concept: 'renal-sequence', key: 'C', stem: 'If the following events are placed in their correct order of Occurrence which will come Fourth:', options: ['Renal failure', 'Hyperparathyroidism', 'Deposition of calcium in the kidney', 'Hypercalcemia', 'Mobilization of calcium from the bone'], clue: 'this auxiliary source visibly keys deposition of calcium in the kidney, and its complete tested order is retained as an explicit evidence gap', reasons: ['renal failure is presented as the initiating condition rather than the printed fourth event', 'hyperparathyroidism is an upstream endocrine response rather than the printed fourth event', 'deposition of calcium in the kidney is the visibly printed answer C and is preserved exactly as sourced', 'hypercalcaemia is associated with metastatic deposition but is not the bank\'s printed selection', 'mobilisation of calcium from bone precedes tissue deposition rather than matching the printed selection'] },
  { ref: 'Q12', page: 3, concept: 'metastatic', key: 'C', stem: 'Metastatic calcification is seen in:', options: ['Vitamin A deficiency', 'Vitamin D deficiency', 'Hyperparathyroidism', 'Hypothyroidism', 'Heart failure'], clue: 'hyperparathyroidism raises serum calcium and can produce metastatic calcification in viable tissues', reasons: ['vitamin A deficiency is not the keyed hypercalcaemic cause', 'vitamin D deficiency tends toward low calcium rather than metastatic deposition', 'hyperparathyroidism is the printed hypercalcaemic association', 'hypothyroidism is not the listed mechanism for metastatic calcification', 'heart failure can cause congestion but does not supply the keyed hypercalcaemic mechanism'] },
  { ref: 'Q13', page: 4, concept: 'dystrophic', key: 'C', stem: 'Dystrophic calcification may ocCUr in the following conditions except:', options: ['Wall of chronic abscess', 'Fat necrosis', 'Primary hyperparathyroidism', 'Atheromatous plaque', 'Degenerated nodular goiter'], clue: 'primary hyperparathyroidism is a systemic high-calcium state, while the other options describe damaged or degenerated tissues', reasons: ['a chronic abscess wall is damaged tissue', 'fat necrosis is a standard dystrophic example', 'primary hyperparathyroidism is the printed exception and favours metastatic calcification', 'atheromatous plaque commonly calcifies dystrophically', 'a degenerated nodular goitre supplies damaged tissue for dystrophic deposition'] },
]

for (const question of questions) {
  question.id = `Q-HU102-PAT-ACC-F9-${question.ref}`
  question.asmCit = `CIT-HU102-F9P1-${question.ref}-ASM`
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
${concept.article === calcificationArticle ? depositsArticle : calcificationArticle}
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
0.76
## academic_relevance
0.98
## weight_confidence
0.65
## support_mode
direct_statement
## confidence
${concept.sequenceGap ? '0.78' : '0.92'}
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
${concept.sequenceGap ? 'The governed lecture does not independently state the complete event order printed in Family-9 Q11.' : '[clear]'}
## evidence_gaps
${concept.sequenceGap ? 'The Q11 sequence is supported only by the auxiliary printed-key occurrence; independent medical verification and Helwan faculty review of the complete order are required before publication.' : 'Independent medical verification and Helwan faculty review remain required before publication.'}
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
  return `${question.options[index]} does not fit because ${question.reasons[index]}. The decisive distinction is that ${question.clue}, which supports ${question.options[correct]}. The comparison is kept tied to the governed teaching and the exact assessment occurrence.`
}

const questionRow = (question) => {
  const concept = byHandle[question.concept]
  const moderate = ['Q01', 'Q04', 'Q06', 'Q08', 'Q11'].includes(question.ref)
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
0.76
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
Exact source wording and option order are preserved, including source spelling, punctuation and capitalization. No official sitting, marks, recurrence or candidate response is inferred.${concept.sequenceGap ? ' The sequence-specific teaching gap is explicit; the printed answer is not promoted to an official key.' : ''}${concept.reuse ? ' This row reuses a governed exact-scope concept by exact ID.' : ''}
## estimated_seconds
75
## randomise_answers
yes`
}

const articleRow = ({ id, title, aliases, subset, other, summary, sections, loses, micro, basis, gap }) => `# Item
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
${other}
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

const calcificationConcepts = concepts.filter((concept) => concept.article === calcificationArticle)
const depositConcepts = concepts.filter((concept) => concept.article === depositsArticle)
const articles = [
  articleRow({
    id: calcificationArticle, title: 'Pathological calcification: dystrophic, metastatic and the renal-failure sequence',
    aliases: ['Dystrophic versus metastatic calcification', 'Question-led pathological calcification'], subset: calcificationConcepts, other: depositsArticle, micro: 'Pathological Calcification',
    summary: 'Dystrophic calcification develops in damaged tissue despite normal serum calcium; metastatic calcification develops in viable tissue when serum calcium is high. The Family-9 bank separately prints renal calcium deposition as its answer to a fourth-event sequence item, retained as Draft pending independent confirmation of the full order.',
    sections: `### Definition\n${byHandle.dystrophic.display} ${byHandle.metastatic.display}\n\n### Mechanism\nDystrophic deposition is driven by the local damaged substrate, whereas metastatic deposition reflects a systemic calcium disturbance. Hyperparathyroidism therefore belongs to the metastatic side of the comparison, while infarction, atheroma, chronic abscess, fat necrosis and degenerated tumour tissue belong to the dystrophic side.\n\n### Key determinants\nFamily-9 Q01, Q07, Q09, Q10 and Q13 change the option set while repeatedly testing the same rule: a hypercalcaemic endocrine state is the exception among damaged-tissue examples. Q08 reverses the direction and asks for the damaged-tissue exception among metastatic features. Q12 tests hyperparathyroidism directly.\n\n### Renal-failure sequence caution\n${byHandle['renal-sequence'].display} The Helwan lecture supports only the broader distinction between metastatic deposition in viable tissue with high serum calcium and dystrophic deposition in damaged tissue. It does not independently state the bank's complete event order, so the item remains Draft and the printed answer is not presented as an official key.\n\n### Clinical significance\nThe practical distinction is not the word metastatic but the combination of tissue condition and serum calcium: damaged tissue with normal calcium is dystrophic; viable tissue exposed to hypercalcaemia is metastatic.`,
    loses: ['Assuming every calcified lesion implies raised serum calcium.', 'Calling an infarct a metastatic-calcification site.', 'Treating the Q11 printed answer as an authenticated official key or inventing marks.'],
    basis: 'Helwan Cell Injury 2 pp33–34 supplies direct calcification teaching; Family-9 assessment PDF pp2–4 supplies the 9 exact printed-key occurrences linked here.',
    gap: 'Independent medical verification and Helwan faculty review remain required before publication. In particular, the complete order tested in Q11 is not independently stated by the governed lecture; only its exact printed answer occurrence is preserved.',
  }),
  articleRow({
    id: depositsArticle, title: 'Hyaline change and amyloid: appearance, location and Congo-red distinction',
    aliases: ['Hyalinosis versus amyloidosis', 'Question-led hyaline and amyloid deposits'], subset: depositConcepts, other: calcificationArticle, micro: 'Hyaline Change and Amyloidosis',
    summary: 'Hyaline is a descriptive homogeneous glassy appearance found inside cells or extracellularly, whereas amyloid is abnormal extracellular fibrillar protein. Congo red followed by polarised-light examination distinguishes amyloid by apple-green birefringence.',
    sections: `### Definition\n${byHandle.hyaline.display} ${byHandle['amyloid-definition'].display}\n\n### Mechanism\nRussell bodies in rhinoscleroma plasma cells are intracellular hyaline. Chronic benign hypertension produces hyaline change in arteriolar walls; malignant hypertension instead raises a fibrinoid-necrosis distinction. The term hyaline describes appearance and does not mean that every example has the same composition.\n\n### Amyloid morphology and location\nAmyloid is deposited extracellularly in tissues, including around small blood vessels. On routine sections it may appear homogeneous and eosinophilic, which explains why superficial morphology can be confused with hyaline change. Its fibrillar extracellular nature makes intracellular protein the false statement in Q06.\n\n### Key determinants\n${byHandle['amyloid-stain'].display} Ordinary Congo-red colour is not the complete tested answer: the question specifies polarised light, under which the diagnostic colour is apple green.\n\n### Clinical significance\nReading the compartment first prevents two common errors: Russell bodies are intracellular hyaline, while amyloid is extracellular. When the material is extracellular and glassy, Congo red plus polarised light supplies the discriminating observation.`,
    loses: ['Calling Russell bodies amyloid.', 'Calling amyloid intracellular.', 'Answering only red or pink when polarised-light Congo-red appearance is asked.'],
    basis: 'Helwan Cell Injury 2 p15 and p25 supplies direct hyaline and amyloid teaching; Family-9 assessment PDF p2 supplies the 4 exact printed-key occurrences linked here.',
    gap: 'Independent medical verification and Helwan faculty review remain required before publication. The keyed study bank does not authenticate an official sitting or official key.',
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
${concept.sequenceGap ? '0.78' : '0.92'}
## freshness
stable_local_curriculum_fact
## time_sensitive
no
## qualifiers
authority: governed Helwan teaching plus auxiliary printed answer; ${concept.sequenceGap ? 'complete tested order requires independent verification' : 'no official-key authority inferred'}`

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
${concept.sequenceGap ? 'The lecture supports only the broader metastatic-calcification endpoint, not the complete tested sequence.' : 'Local curriculum support only; independent medical verification remains required.'}
## confidence
${concept.sequenceGap ? '0.70' : '0.92'}
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
Tier-3 local keyed study-bank evidence only; not an official exam or authenticated official key.${question.ref === 'Q11' ? ' The complete event order requires independent verification.' : ''}
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
  ['dystrophic', 'contrasts_with', 'metastatic', 'damaged tissue with normal serum calcium contrasts with viable tissue exposed to hypercalcaemia'],
  ['hyaline', 'contrasts_with', 'amyloid-definition', 'a descriptive intracellular-or-extracellular glassy appearance contrasts with a specific extracellular fibrillar deposit'],
  ['amyloid-definition', 'diagnosed_by', 'amyloid-stain', 'Congo red with polarised-light apple-green birefringence identifies amyloid'],
  ['renal-sequence', 'associated_with', 'metastatic', 'the source-specific renal sequence terminates in calcium deposition and is taught only within the broader metastatic context'],
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
${a.sequenceGap || b.sequenceGap ? '0.76' : '0.86'}
## qualifiers
scope: ${scope}
## reviewer
Medical team, Helwan Pathology faculty`
}

const files = new Map([
  ['evidence/HU-BMS-102-pathology-family9-part1-sources.md', sourceRows],
  ['article/HU-BMS-102-pathology-family9-part1-articles.md', articles],
  ['concept/HU-BMS-102-pathology-family9-part1-concepts.md', concepts.map(fullConcept).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family9-part1-claims.md', concepts.map(claimRow).join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family9-part1-citations.md', [...concepts.map(curriculumCitation), ...questions.map(assessmentCitation)].join('\n---\n\n')],
  ['evidence/HU-BMS-102-pathology-family9-part1-spans.md', concepts.map(spanRow).join('\n---\n\n')],
  ['relations/HU-BMS-102-pathology-family9-part1-relations.md', relationDefs.map(relationRow).join('\n---\n\n')],
  ['question/HU-BMS-102-pathology-family9-part1-mcq.md', questions.map(questionRow).join('\n---\n\n')],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({
  family: '9-part1',
  refs: questions.map((question) => `F9-${question.ref}`),
  keys: questions.map((question) => question.key),
  released: {
    sources: 2, articles: 2, concepts: 6, newConcepts: 1, standaloneCompleteConceptReuses: 5,
    questions: 13, claims: 6, citations: 19, spans: 6, relations: 4,
  },
  excludedFromSlice: { questionableKey: ['F9-Q18'], writtenPrompts: 9 },
  sequenceEvidenceGap: ['F9-Q11'],
}, null, 2))
