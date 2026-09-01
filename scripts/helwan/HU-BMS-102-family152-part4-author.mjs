import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_a988f51544db9b537b0c'
const letters = 'ABCDE'
const THROMBI = 'ART-HU-BMS102-PAT-THROMBI'
const EMBOLI = 'ART-HU-BMS102-PAT-EMBOLI'
const PYEMIA = 'CON-INF-45E6A79B0DC0C6'
const EMBOLISM = 'CON-FND-B5E4F3F73B582D'
const DVT_PE = 'CON-FND-0FD3F9277F0AA1'
const VIRCHOW = 'CON-CVS-1DBCD5D81337B5'
const VENOUS_THROMBUS = 'CON-FND-324D89C2933CE7'

const row = fields => `# Item\n${fields.map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n')}`
const rows = values => values.join('\n---\n\n')

const specs = [
  ['Q37', 'B', PYEMIA, EMBOLI, 8, 'Which of the following is not correctly associated?', ['Air embolism – Deep Sea diving', 'Multiple parasitic arterial embolism – Pyemic abscesses', 'Fat embolism – Fracture of long bones', 'Venous embolism – post operative state'], 'Pyaemic abscesses are associated with septic emboli; the printed mismatch is “Multiple parasitic arterial embolism – Pyemic abscesses”.'],
  ['Q38', 'C', EMBOLISM, EMBOLI, 8, 'The commonest type of emboli is:', ['Fat emboli', 'Air emboli', 'Thrombotic', 'Parasitic', 'Tumor'], 'The source keys thrombotic emboli as the commonest type.'],
  ['Q39', 'C', DVT_PE, EMBOLI, 8, 'If the following events are placed in correct order which will come fourth:', ['Major abdominal surgery', 'Deep venous thrombosis', 'Embolization', 'Pulmonary infarction'], 'The source prints Embolization as the fourth item in this listed postoperative sequence. This sequence-specific teaching is not expanded beyond the carrier.'],
  ['Q40', 'C', EMBOLISM, EMBOLI, 8, 'With injury of large neck veins. The cause of death is:', ['Vagal inhibition.', 'Asphyxia.', 'Air embolism.', 'Fat embolism', 'thromboembolism'], 'The source keys air embolism after injury of large neck veins.'],
  ['Q41', 'C', VIRCHOW, THROMBI, 9, 'Three major factors that predispose to thrombosis are:', ['↓ blood viscosity, accelerated blood flow and endothelial damage', '↑ blood viscosity, accelerated blood flow and endothelial damage', 'Endothelial damage, ↑ blood viscosity and diminished blood flow', 'Fibrinolysis, fibrinoid necrosis of vessel wall and atherosclerosis', 'Disintegration of WBCs lysosomes, thrombocytopenia and bacteremia'], 'The printed combination maps to endothelial injury, increased viscosity and diminished flow within the source presentation of Virchow factors.'],
  ['Q42', 'B', VIRCHOW, THROMBI, 9, 'The factors predisposing to thrombosis include:', ['Smooth intima', 'Slow blood flow', 'Anemia', 'Rapid blood flow', 'Diluted blood'], 'The source keys slow blood flow as a thrombosis-predisposing factor.'],
  ['Q43', 'D', VIRCHOW, THROMBI, 9, "Which of the following isn't associated with thrombosis:", ['Activation of thrombosis mechanism', 'Endothelial damage', 'Formation of platelets aggregates', 'Thrombocytopenia', 'Vascular stasis'], 'The printed exception is thrombocytopenia.'],
  ['Q44', 'D', VENOUS_THROMBUS, THROMBI, 9, 'The commonest site of thrombus formation is:', ['Heart', 'Capillary', 'Large artery', 'Vein', 'Small artery'], 'The source keys vein as the commonest site of thrombus formation.'],
  ['Q45', 'D', VIRCHOW, THROMBI, 9, 'Venous thrombosis can occur in all of the followings except:', ['Postoperative state', 'After delivery', 'Severe burns', 'Anemia'], 'The source prints anemia as the exception in this venous-thrombosis risk set.'],
  ['Q46', 'C', VIRCHOW, THROMBI, 10, 'Virchow triad describes the pathogenesis of:', ['Embolus formation', 'Hyperemia', 'Thrombus formation', 'Congestion', 'Vegetation'], 'Virchow triad is keyed as describing thrombus formation.'],
  ['Q47', 'D', DVT_PE, EMBOLI, 10, 'What is the most common site of origin of pulmonary emboli:', ['Lumen of left ventricle', 'Lumen of right ventricle', 'Mesenteric veins', 'Calf veins of lower limbs', 'Superior vena cava'], 'The source keys the calf veins of the lower limbs as the most common origin site.'],
  ['Q48', 'D', DVT_PE, EMBOLI, 10, 'Venous emboli are most likely lodged in:', ['Intestine', 'Kidney', 'Heart', 'Lung', 'Brain'], 'The source keys the lung as the likely destination of venous emboli.'],
]

const questions = specs.map(([ref, key, concept, article, page, stem, options, teaching]) => ({
  ref, key, concept, article, page, stem, options, teaching,
  id: `Q-HU102-PAT-F152-P4-${ref}`,
  claim: `CLM-HU102-F152-P4-${ref}-01`,
  questionCitation: `CIT-HU102-F152-P4-${ref}-QUESTION`,
  keyCitation: `CIT-HU102-F152-P4-${ref}-KEY`,
  span: `SPN-HU102-F152-P4-${ref}-01`,
}))

const conceptInfo = {
  [PYEMIA]: ['Pyaemia is circulation and impaction of septic emboli causing multiple abscesses', 'Recognise why pyaemic abscesses require septic rather than parasitic emboli.'],
  [EMBOLISM]: ['Embolism', 'Apply the source-bounded embolism type and large-neck-vein associations.'],
  [DVT_PE]: ['A deep-vein thrombus can embolise to the pulmonary circulation', 'Trace the postoperative and calf-vein source pathway to pulmonary embolism.'],
  [VIRCHOW]: ['Venous thrombosis follows Virchow triad', 'Recognise the source-listed thrombosis factors, exceptions and pathogenesis.'],
  [VENOUS_THROMBUS]: ['Red thrombi are erythrocyte-rich thrombi that form most characteristically in veins', 'Identify vein as the source-keyed commonest thrombus site.'],
}

const extract = (path, id) => {
  const block = readFileSync(path, 'utf8').split(/\n---\n/).find(value => value.includes(`## id\n${id}\n`))
  if (!block) throw new Error(`missing ${id} in ${path}`)
  return block.trim()
}
const get = (block, name) => block.match(new RegExp(`## ${name}\\n([\\s\\S]*?)(?=\\n## |$)`))?.[1].trimEnd() ?? ''
const set = (block, name, value) => block.replace(new RegExp(`(## ${name}\\n)[\\s\\S]*?(?=\\n## |$)`), `$1${value}`)
const append = (block, name, values) => {
  const current = get(block, name).split(/\n| \| /).filter(value => value && value !== '[clear]')
  for (const value of values) if (!current.includes(value)) current.push(value)
  return set(block, name, current.join('\n'))
}

const articleSourceFiles = {
  [THROMBI]: 'HU-BMS-102-pathology-family152-part3-articles.md',
  [EMBOLI]: 'HU-BMS-102-pathology-family152-part3-articles.md',
}
const groups = Object.groupBy(questions, question => question.article)
const article = id => {
  let block = extract(join(root, 'article', articleSourceFiles[id]), id)
  const articleQuestions = groups[id]
  const concepts = [...new Set(articleQuestions.map(question => question.concept))]
  for (const [name, values] of [
    ['related_concepts', concepts],
    ['question_ids', articleQuestions.map(question => question.id)],
    ['resource_ids', [source]],
    ['article_source_ids', [source]],
    ['claim_ids', articleQuestions.map(question => question.claim)],
    ['span_ids', articleQuestions.map(question => question.span)],
    ['hold_these', concepts.map(concept => conceptInfo[concept][0])],
  ]) block = append(block, name, values)
  block = set(block, 'sections', `${get(block, 'sections')}\n\n### Family152 Part4 source-bounded additions\n${concepts.map(concept => conceptInfo[concept][0]).join('\n')}`)
  const annotations = get(block, 'annotations')
  const additions = concepts.filter(concept => !annotations.includes(concept)).map(concept => `### definition_of · ${concept}\nQuote: ${conceptInfo[concept][0]}\nBlock: body`)
  if (additions.length) block = set(block, 'annotations', `${annotations}\n\n${additions.join('\n\n')}`)
  block = set(block, 'callout_evidence', `${get(block, 'callout_evidence')}\n\n${articleQuestions.map(question => `### ${conceptInfo[question.concept][0]}\nClaims: ${question.claim}\nCitations: ${question.questionCitation}, ${question.keyCitation}\nSpan: ${question.span}`).join('\n\n')}`)
  block = set(block, 'evidence_basis', `${get(block, 'evidence_basis')}\nFamily152 tier-3 keyed study bank, pages 8–10; right-column letters are study answers, not an official key.`)
  block = set(block, 'notes', `${get(block, 'notes')}\nFamily152 Part4 appends Q37–Q48 evidence while preserving prior fields.`)
  return block
}

const conceptSourceFiles = {
  [PYEMIA]: 'HU-BMS-102-pathology-family10-part2-concepts.md',
  [EMBOLISM]: 'HU-BMS-102-pathology-family152-part3-concepts.md',
  [DVT_PE]: 'HU-BMS-102-pathology-family152-part3-concepts.md',
  [VIRCHOW]: 'HU-BMS-102-pathology-family152-part3-concepts.md',
  [VENOUS_THROMBUS]: 'HU-BMS-102-pathology-concepts.md',
}
const concept = id => {
  let block = extract(join(root, 'concept', conceptSourceFiles[id]), id)
  const conceptQuestions = questions.filter(question => question.concept === id)
  for (const [name, values] of [
    ['article_ids', [...new Set(conceptQuestions.map(question => question.article))]],
    ['resource_ids', [source]],
    ['atomic_claim_ids', conceptQuestions.map(question => question.claim)],
    ['learner_years', ['1']],
    ['universities', ['hu']],
    ['modules', ['HU-BMS-102']],
  ]) block = append(block, name, values)
  block = set(block, 'exam_signal', `${get(block, 'exam_signal')}\n${source} | Family152 Part4 ${conceptQuestions.map(question => question.ref).join('/')} | tier-3 keyed bank; not official key`)
  block = set(block, 'original_wording', `${get(block, 'original_wording')}\n${conceptQuestions.map(question => `[Family152 Part4 ${question.ref}] ${question.stem} [printed answer ${question.key}]`).join('\n')}`)
  block = set(block, 'field_notes', `${get(block, 'field_notes')}\nfamily152Part4Reuse: Complete governed row preserved; reciprocal source, claims, wording and article links appended idempotently.`)
  if (get(block, 'publication_status') !== 'needs_evidence') throw new Error(`${id} is not needs_evidence`)
  return block
}

const questionRow = question => row([
  ['id', question.id], ['title', question.stem], ['subject', 'fnd'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['vignette', ''],
  ['question', question.stem], ['format', 'single best answer'], ['derived_from', ''], ['correct_answer', question.key],
  ...question.options.flatMap((option, index) => [[`answer_${letters[index].toLowerCase()}`, option], [`explanation_${letters[index].toLowerCase()}`, letters[index] === question.key ? `${question.teaching} This is a source-supplied study-bank answer, not an authenticated Helwan examination key.` : `This option is not the printed letter. The tested source-bounded point is: ${conceptInfo[question.concept][0]}.`]]),
  ['topic', 'Circulatory disturbances'], ['subtopic', question.article === THROMBI ? 'Thrombosis' : 'Embolism'], ['difficulty', 'Moderate'], ['question_type', 'Pathology'],
  ['main_concept', question.concept], ['module', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pathology > Family152 Part4 > ${question.ref}`],
  ['clinical_relevance', '0.78'], ['academic_relevance', '0.94'], ['cognitive_effort_score', '0.55'], ['exam_weight_by_year', 'HU_Y1=0.62'], ['question_only_for', 'HU_Y1'], ['concept_ids', question.concept], ['years', 'HU_Y1'], ['universities', 'hu'],
  ['cognitive_effort', 'Moderate'], ['setting', 'Foundational'], ['reasoning_level', '2'], ['inferred_difficulty', '55'], ['exam_relevance', '7'], ['contextual_concept_ids', ''],
  ['library_ids', question.article], ['resource_ids', source], ['learning_objective', conceptInfo[question.concept][1]], ['media_recommendations', ''],
  ['source_citation', `${source}, Family152 Part4 ${question.ref}, PDF p${question.page}: literal stem/options and right-column printed ${question.key}. Tier-3 study-bank authority only.`],
  ['attachments', ''], ['attached_image', ''], ['author_notes', 'Literal spelling, capitalization, glyphs, option order and printed answer preserved; no marks or official-key authority inferred.'],
  ['estimated_seconds', '75'], ['randomise_answers', 'yes'],
])

const claim = question => row([
  ['id', question.claim], ['concept_id', question.concept], ['subject', 'fnd'], ['predicate', 'is source-keyed as'], ['object', question.options[letters.indexOf(question.key)]],
  ['display_text', conceptInfo[question.concept][0]], ['risk_class', 'foundational_stable'], ['verification_status', 'needs_evidence'], ['conflict_status', 'none'], ['confidence', '0.76'],
  ['freshness', 'source_created_2025-04-10'], ['time_sensitive', 'no'], ['qualifiers', `tier-3 bank, not official key; Family152 Part4 ${question.ref}`],
])
const citation = (question, key) => row([
  ['id', key ? question.keyCitation : question.questionCitation], ['claim_id', question.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'],
  ['support_span', key ? `Right-column printed answer: ${question.key}` : `${question.stem} Options: ${question.options.map((option, index) => `${letters[index]}. ${option}`).join(' | ')}`],
  ['locator_type', 'page'], ['locator_page', String(question.page)], ['locator_section', `Family152 Part4 ${question.ref}`], ['locator_detail', key ? 'Isolated right-column printed letter' : 'Exact stem and options'],
  ['context_note', 'Instructor-attributed keyed study bank; not an official key.'], ['confidence', '0.97'], ['counts_as_claim_evidence', 'no'],
])
const span = question => row([
  ['id', question.span], ['article_id', question.article], ['section_id', `${question.article.toLowerCase()}-${question.ref.toLowerCase()}`], ['text', conceptInfo[question.concept][0]],
  ['claim_ids', question.claim], ['citation_ids', `${question.questionCitation}\n${question.keyCitation}`],
])
const relation = (from, type, to, refs, scope) => row([
  ['source', from], ['type', type], ['target', to], ['evidence_claim_ids', refs.map(ref => questions.find(question => question.ref === ref).claim).join('\n')],
  ['citation_ids', refs.map(ref => questions.find(question => question.ref === ref).questionCitation).join('\n')], ['verification_status', 'needs_evidence'], ['confidence', '0.76'],
  ['qualifiers', `scope: ${scope}`], ['reviewer', 'Medical team, Helwan Pathology faculty'],
])

const relations = rows([
  relation(PYEMIA, 'related_concepts', EMBOLISM, ['Q37'], 'pyaemic abscesses require septic emboli rather than the printed parasitic mismatch'),
  relation(VENOUS_THROMBUS, 'related_concepts', VIRCHOW, ['Q41', 'Q42', 'Q44'], 'venous thrombus site and source-listed Virchow factors'),
])

const sourceRow = row([
  ['id', source], ['title', 'Circulatory — Ahmed Hassan keyed MCQ bank'], ['institution', 'Faculty of Medicine, Helwan University'], ['collection_id', 'hu-y1'],
  ['source_relative_path', 'Year 1/BMS 102/Pathology/Questions/MCQs/MCQs - Circulatory MCQ.pdf'], ['media_type', 'application/pdf'], ['languages', 'en'], ['page_count', '16'],
  ['sha256', 'a988f51544db9b537b0c94d26fb4a7df13e8e6fba80ec3bc968fc007a6b7edc8'], ['processing_status', 'pending'],
  ['rights', 'Local study-bank carrier held for internal authoring only; no page redistributed.'],
  ['qualification', 'Tier-3 instructor-attributed keyed study bank headed Circulatory and DR. Ahmed Hassan; printed answers are not an authenticated official exam key.'], ['is_assessment', 'yes'],
])

const files = new Map([
  ['evidence/HU-BMS-102-pathology-family152-part4-sources.md', sourceRow],
  ['article/HU-BMS-102-pathology-family152-part4-articles.md', rows([THROMBI, EMBOLI].map(article))],
  ['concept/HU-BMS-102-pathology-family152-part4-concepts.md', rows([PYEMIA, EMBOLISM, DVT_PE, VIRCHOW, VENOUS_THROMBUS].map(concept))],
  ['evidence/HU-BMS-102-pathology-family152-part4-claims.md', rows(questions.map(claim))],
  ['evidence/HU-BMS-102-pathology-family152-part4-citations.md', rows(questions.flatMap(question => [citation(question, false), citation(question, true)]))],
  ['evidence/HU-BMS-102-pathology-family152-part4-spans.md', rows(questions.map(span))],
  ['relations/HU-BMS-102-pathology-family152-part4-relations.md', relations],
  ['question/HU-BMS-102-pathology-family152-part4-mcq.md', rows(questions.map(questionRow))],
])

for (const [relativePath, body] of files) {
  const output = join(root, relativePath)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({
  family: 152,
  part: 4,
  refs: questions.map(question => question.ref),
  keys: questions.map(question => question.key).join(''),
  released: { sources: 1, articles: 2, concepts: 5, newConcepts: 0, reusedConcepts: 5, questions: 12, claims: 12, citations: 24, spans: 12, relations: 2 },
  holds: 0,
  backlog: 30,
}, null, 2))
