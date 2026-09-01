import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_a988f51544db9b537b0c'
const letters = 'ABCDE'
const THROMBI = 'ART-HU-BMS102-PAT-THROMBI'
const EMBOLI = 'ART-HU-BMS102-PAT-EMBOLI'
const FAT = 'CON-FND-B308DCF18C3B33'
const VENOUS = 'CON-FND-324D89C2933CE7'
const ZAHN = 'CON-FND-7E61964BE1D637'
const VEGETATION = 'CON-FND-F50193380038D9'
const DVT_PE = 'CON-FND-0FD3F9277F0AA1'
const EMBOLISM = 'CON-FND-B5E4F3F73B582D'
const POSTPARTUM_DVT = 'CON-FND-A2AEC2D4E9A458'

const row = fields => `# Item\n${fields.map(([name, value]) => `## ${name}\n${value ?? ''}`).join('\n')}`
const rows = items => items.join('\n---\n\n')
const specs = [
  ['Q49', 'B', FAT, EMBOLI, 10, 'An 18-year-old male has fracture femur. 48 hours later he felt pain in the chest with dyspnea, cyanosis and hemoptysis. Then he died. The most possible cause of death is:', ['Chronic venous congestion of the lung', 'Fat embolism in pulmonary artery', 'Myocardial infarction', 'Thrombotic pulmonary embolism'], 'The source keys fat embolism in the pulmonary artery after femoral fracture.'],
  ['Q50', 'B', FAT, EMBOLI, 10, 'Simple fracture of long bones of the lower limb predispose to:', ['Air embolism', 'Fat embolism', 'Nitrogen embolism', 'Parasitic embolism', 'Tumor embolism'], 'The source keys fat embolism after a simple long-bone fracture.'],
  ['Q51', 'E', VENOUS, THROMBI, 11, 'The most common site of venous thrombosis is:', ['Brain', 'Kidney', 'Liver', 'Lung', 'Legs'], 'The source keys the legs as the most common site of venous thrombosis.'],
  ['Q52', 'D', ZAHN, THROMBI, 11, 'Lines of Zahn are formed due to deposition of which of the followings:', ['Red blood ceils', 'Red blood cells and fibrin', 'Red and white blood cells', 'Platelets and fibrin', 'White blood cells'], 'The source keys platelets and fibrin as the pale component of Lines of Zahn.'],
  ['Q53', 'C', VEGETATION, THROMBI, 11, 'A thrombus over the heart valve is called:', ['Mural thrombus', 'Ball-valve thrombus', 'Vegetation', 'Phlebothrombosis', 'None of the above'], 'The source keys vegetation for a thrombus over a heart valve.'],
  ['Q54', 'D', DVT_PE, EMBOLI, 11, 'What is the most common cause of pulmonary emboli:', ['Superficial leg hemorrhage', 'Right ventricle stasis', 'Mesentric vein obstruction', 'Deep venous thrombosis'], 'The source keys deep venous thrombosis as the most common cause of pulmonary emboli.'],
  ['Q55', 'E', EMBOLISM, EMBOLI, 11, 'Large-sized pulmonary embolus leads to which of the followings:', ['Cor pulmonale', 'Left sided heart failure', 'Pulmonary hypertension', 'Pulmonary infarction', 'Sudden death'], 'The source keys sudden death as the outcome of a large pulmonary embolus. This remains a source-bounded study answer, not a severity rule inferred beyond the option set.'],
  ['Q56', 'A', DVT_PE, EMBOLI, 12, 'What is the most common cause and site of origin for pulmonary emboli:', ['Deep venous thrombosis', 'Long bone trauma', 'Mesenteric vein obstruction', 'Right ventricle stasis', 'Superficial leg hemorrhage'], 'The source keys deep venous thrombosis as the common cause and origin context.'],
  ['Q57', 'E', EMBOLISM, EMBOLI, 12, 'What is the name of an embolus that is formed of malignant cells:', ['Air embolism', 'Amniotic fluid embolism', 'Fat embolism', 'Parasitic embolism', 'Tumor embolism'], 'The source keys tumor embolism for an embolus formed of malignant cells.'],
  ['Q58', 'E', EMBOLISM, EMBOLI, 12, 'During normal delivery of a full term infant. A 23 year old female with An uncomplicated pregnancy developed sudden dyspnea with cyanosis & hypotension. What is the most likely to be found in pulmonary arteries:', ['Gas bubbles', 'Thromboemboii', 'Fat globules', 'Aggregated RBCs', 'Amniotic fluid'], 'The source keys amniotic fluid in the pulmonary arteries for this delivery-associated presentation. This is source-bounded and not promoted to diagnostic guidance.'],
  ['Q59', 'D', EMBOLISM, EMBOLI, 12, 'Which of the followings is not a type of embolus:', ['Air', 'Parasite', 'Tumor', 'Virus'], 'The printed exception is Virus.'],
  ['Q60', 'D', POSTPARTUM_DVT, THROMBI, 12, 'Three days after a labor a 20 year old lady presented with swollen tender leg. The possible diagnosis is:', ['Hyperemia of the leg', 'Venous embolization of the leg', 'Septic shock', 'Deep venous thrombosis of the leg'], 'The source keys deep venous thrombosis of the leg in this postpartum presentation.'],
]
const questions = specs.map(([ref, key, concept, article, page, stem, options, teaching]) => ({
  ref, key, concept, article, page, stem, options, teaching,
  id: `Q-HU102-PAT-F152-P5-${ref}`,
  claim: `CLM-HU102-F152-P5-${ref}-01`,
  questionCitation: `CIT-HU102-F152-P5-${ref}-QUESTION`,
  keyCitation: `CIT-HU102-F152-P5-${ref}-KEY`,
  span: `SPN-HU102-F152-P5-${ref}-01`,
}))
const info = {
  [FAT]: ['Bone fracture is a major setting for fat embolism and fat embolism syndrome', 'Recognise the source-keyed long-bone-fracture association.'],
  [VENOUS]: ['Red thrombi are erythrocyte-rich thrombi that form most characteristically in veins', 'Identify the source-keyed common site of venous thrombosis.'],
  [ZAHN]: ['Lines of Zahn are alternating platelet-fibrin and erythrocyte-rich layers in an antemortem thrombus', 'Identify the platelet-fibrin component of Lines of Zahn.'],
  [VEGETATION]: ['Cardiac-valve thrombi are termed vegetations', 'Name a thrombus over a heart valve.'],
  [DVT_PE]: ['A deep-vein thrombus can embolise to the pulmonary circulation', 'Identify the source and pathway of pulmonary thromboemboli.'],
  [EMBOLISM]: ['Embolism', 'Apply the source-bounded embolus type and outcome distinctions.'],
  [POSTPARTUM_DVT]: ['A swollen tender leg shortly after labor suggests deep venous thrombosis', 'Recognise the source-bounded postpartum DVT presentation.'],
}

const extract = (path, id) => {
  const block = readFileSync(path, 'utf8').split(/\n---\n/).find(value => value.includes(`## id\n${id}\n`))
  if (!block) throw new Error(`missing ${id} in ${path}`)
  return block.trim()
}
const get = (block, name) => block.match(new RegExp(`## ${name}\\n([\\s\\S]*?)(?=\\n## |$)`))?.[1].trimEnd() ?? ''
const set = (block, name, value) => block.replace(new RegExp(`(## ${name}\\n)[\\s\\S]*?(?=\\n## |$)`), `$1${value}`)
const append = (block, name, values) => {
  const existing = get(block, name).split(/\n| \| /).filter(value => value && value !== '[clear]')
  for (const value of values) if (!existing.includes(value)) existing.push(value)
  return set(block, name, existing.join('\n'))
}

const groups = Object.groupBy(questions, question => question.article)
const article = id => {
  let block = extract(join(root, 'article', 'HU-BMS-102-pathology-family152-part4-articles.md'), id)
  const articleQuestions = groups[id]
  const concepts = [...new Set(articleQuestions.map(question => question.concept))]
  for (const [name, values] of [['related_concepts', concepts], ['question_ids', articleQuestions.map(q => q.id)], ['resource_ids', [source]], ['article_source_ids', [source]], ['claim_ids', articleQuestions.map(q => q.claim)], ['span_ids', articleQuestions.map(q => q.span)], ['hold_these', concepts.map(c => info[c][0])]]) block = append(block, name, values)
  block = set(block, 'sections', `${get(block, 'sections')}\n\n### Family152 Part5 source-bounded additions\n${concepts.map(c => info[c][0]).join('\n')}`)
  const annotations = get(block, 'annotations')
  const additions = concepts.filter(c => !annotations.includes(c)).map(c => `### definition_of · ${c}\nQuote: ${info[c][0]}\nBlock: body`)
  if (additions.length) block = set(block, 'annotations', `${annotations}\n\n${additions.join('\n\n')}`)
  block = set(block, 'callout_evidence', `${get(block, 'callout_evidence')}\n\n${articleQuestions.map(q => `### ${info[q.concept][0]}\nClaims: ${q.claim}\nCitations: ${q.questionCitation}, ${q.keyCitation}\nSpan: ${q.span}`).join('\n\n')}`)
  block = set(block, 'evidence_basis', `${get(block, 'evidence_basis')}\nFamily152 tier-3 keyed study bank, pages 10–12; right-column letters are study answers, not an official key.`)
  block = set(block, 'notes', `${get(block, 'notes')}\nFamily152 Part5 appends Q49–Q60 evidence while preserving prior fields.`)
  return block
}

const conceptFiles = {
  [FAT]: 'HU-BMS-102-pathology-concepts.md',
  [VENOUS]: 'HU-BMS-102-pathology-family152-part4-concepts.md',
  [ZAHN]: 'HU-BMS-102-pathology-family118-part1-concepts.md',
  [VEGETATION]: 'HU-BMS-102-pathology-family133-part1-concepts.md',
  [DVT_PE]: 'HU-BMS-102-pathology-family152-part4-concepts.md',
  [EMBOLISM]: 'HU-BMS-102-pathology-family152-part4-concepts.md',
  [POSTPARTUM_DVT]: 'HU-BMS-102-pathology-family118-part1-concepts.md',
}
const concept = id => {
  let block = extract(join(root, 'concept', conceptFiles[id]), id)
  const conceptQuestions = questions.filter(question => question.concept === id)
  for (const [name, values] of [['article_ids', [...new Set(conceptQuestions.map(q => q.article))]], ['resource_ids', [source]], ['atomic_claim_ids', conceptQuestions.map(q => q.claim)], ['learner_years', ['1']], ['universities', ['hu']], ['modules', ['HU-BMS-102']]]) block = append(block, name, values)
  block = set(block, 'exam_signal', `${get(block, 'exam_signal')}\n${source} | Family152 Part5 ${conceptQuestions.map(q => q.ref).join('/')} | tier-3 keyed bank; not official key`)
  block = set(block, 'original_wording', `${get(block, 'original_wording')}\n${conceptQuestions.map(q => `[Family152 Part5 ${q.ref}] ${q.stem} [printed answer ${q.key}]`).join('\n')}`)
  block = set(block, 'field_notes', `${get(block, 'field_notes')}\nfamily152Part5Reuse: Complete governed row preserved; reciprocal source, claims, wording and article links appended idempotently.`)
  if (get(block, 'publication_status') !== 'needs_evidence') throw new Error(`${id} is not needs_evidence`)
  return block
}

const questionRow = q => row([
  ['id', q.id], ['title', q.stem], ['subject', 'fnd'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['vignette', ''], ['question', q.stem], ['format', 'single best answer'], ['derived_from', ''], ['correct_answer', q.key],
  ...q.options.flatMap((option, index) => [[`answer_${letters[index].toLowerCase()}`, option], [`explanation_${letters[index].toLowerCase()}`, letters[index] === q.key ? `${q.teaching} This is a source-supplied study-bank answer, not an authenticated Helwan examination key.` : `This option is not the printed letter. The tested source-bounded point is: ${info[q.concept][0]}.`]]),
  ['topic', 'Circulatory disturbances'], ['subtopic', q.article === THROMBI ? 'Thrombosis' : 'Embolism'], ['difficulty', 'Moderate'], ['question_type', 'Pathology'], ['main_concept', q.concept], ['module', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pathology > Family152 Part5 > ${q.ref}`],
  ['clinical_relevance', '0.8'], ['academic_relevance', '0.94'], ['cognitive_effort_score', '0.55'], ['exam_weight_by_year', 'HU_Y1=0.62'], ['question_only_for', 'HU_Y1'], ['concept_ids', q.concept], ['years', 'HU_Y1'], ['universities', 'hu'], ['cognitive_effort', 'Moderate'], ['setting', 'Foundational'], ['reasoning_level', '2'], ['inferred_difficulty', '55'], ['exam_relevance', '7'], ['contextual_concept_ids', ''],
  ['library_ids', q.article], ['resource_ids', source], ['learning_objective', info[q.concept][1]], ['media_recommendations', ''], ['source_citation', `${source}, Family152 Part5 ${q.ref}, PDF p${q.page}: literal stem/options and right-column printed ${q.key}. Tier-3 study-bank authority only.`], ['attachments', ''], ['attached_image', ''], ['author_notes', 'Literal spelling, capitalization, glyphs, option order and printed answer preserved; no marks or official-key authority inferred.'], ['estimated_seconds', '75'], ['randomise_answers', 'yes'],
])
const claim = q => row([['id', q.claim], ['concept_id', q.concept], ['subject', 'fnd'], ['predicate', 'is source-keyed as'], ['object', q.options[letters.indexOf(q.key)]], ['display_text', info[q.concept][0]], ['risk_class', 'foundational_stable'], ['verification_status', 'needs_evidence'], ['conflict_status', 'none'], ['confidence', '0.76'], ['freshness', 'source_created_2025-04-10'], ['time_sensitive', 'no'], ['qualifiers', `tier-3 bank, not official key; Family152 Part5 ${q.ref}`]])
const citation = (q, key) => row([['id', key ? q.keyCitation : q.questionCitation], ['claim_id', q.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'], ['support_span', key ? `Right-column printed answer: ${q.key}` : `${q.stem} Options: ${q.options.map((option, index) => `${letters[index]}. ${option}`).join(' | ')}`], ['locator_type', 'page'], ['locator_page', String(q.page)], ['locator_section', `Family152 Part5 ${q.ref}`], ['locator_detail', key ? 'Isolated right-column printed letter' : 'Exact stem and options'], ['context_note', 'Instructor-attributed keyed study bank; not an official key.'], ['confidence', '0.97'], ['counts_as_claim_evidence', 'no']])
const span = q => row([['id', q.span], ['article_id', q.article], ['section_id', `${q.article.toLowerCase()}-${q.ref.toLowerCase()}`], ['text', info[q.concept][0]], ['claim_ids', q.claim], ['citation_ids', `${q.questionCitation}\n${q.keyCitation}`]])
const relation = (from, to, refs, scope) => row([['source', from], ['type', 'related_concepts'], ['target', to], ['evidence_claim_ids', refs.map(ref => questions.find(q => q.ref === ref).claim).join('\n')], ['citation_ids', refs.map(ref => questions.find(q => q.ref === ref).questionCitation).join('\n')], ['verification_status', 'needs_evidence'], ['confidence', '0.76'], ['qualifiers', `scope: ${scope}`], ['reviewer', 'Medical team, Helwan Pathology faculty']])
const relationRows = rows([
  relation(FAT, EMBOLISM, ['Q49', 'Q50'], 'long-bone fracture and fat-embolism association'),
  relation(ZAHN, VENOUS, ['Q51', 'Q52'], 'venous thrombus location and antemortem lamination'),
  relation(VEGETATION, VENOUS, ['Q51', 'Q53'], 'site-specific thrombus terminology'),
  relation(POSTPARTUM_DVT, DVT_PE, ['Q54', 'Q56', 'Q60'], 'postpartum DVT and pulmonary-thromboembolism pathway'),
])
const sourceRow = row([['id', source], ['title', 'Circulatory — Ahmed Hassan keyed MCQ bank'], ['institution', 'Faculty of Medicine, Helwan University'], ['collection_id', 'hu-y1'], ['source_relative_path', 'Year 1/BMS 102/Pathology/Questions/MCQs/MCQs - Circulatory MCQ.pdf'], ['media_type', 'application/pdf'], ['languages', 'en'], ['page_count', '16'], ['sha256', 'a988f51544db9b537b0c94d26fb4a7df13e8e6fba80ec3bc968fc007a6b7edc8'], ['processing_status', 'pending'], ['rights', 'Local study-bank carrier held for internal authoring only; no page redistributed.'], ['qualification', 'Tier-3 instructor-attributed keyed study bank headed Circulatory and DR. Ahmed Hassan; printed answers are not an authenticated official exam key.'], ['is_assessment', 'yes']])
const files = new Map([
  ['evidence/HU-BMS-102-pathology-family152-part5-sources.md', sourceRow],
  ['article/HU-BMS-102-pathology-family152-part5-articles.md', rows([THROMBI, EMBOLI].map(article))],
  ['concept/HU-BMS-102-pathology-family152-part5-concepts.md', rows([FAT, VENOUS, ZAHN, VEGETATION, DVT_PE, EMBOLISM, POSTPARTUM_DVT].map(concept))],
  ['evidence/HU-BMS-102-pathology-family152-part5-claims.md', rows(questions.map(claim))],
  ['evidence/HU-BMS-102-pathology-family152-part5-citations.md', rows(questions.flatMap(q => [citation(q, false), citation(q, true)]))],
  ['evidence/HU-BMS-102-pathology-family152-part5-spans.md', rows(questions.map(span))],
  ['relations/HU-BMS-102-pathology-family152-part5-relations.md', relationRows],
  ['question/HU-BMS-102-pathology-family152-part5-mcq.md', rows(questions.map(questionRow))],
])
for (const [relativePath, body] of files) {
  const output = join(root, relativePath)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}
console.log(JSON.stringify({ family: 152, part: 5, refs: questions.map(q => q.ref), keys: questions.map(q => q.key).join(''), released: { sources: 1, articles: 2, concepts: 7, newConcepts: 0, reusedConcepts: 7, questions: 12, claims: 12, citations: 24, spans: 12, relations: 4 }, holds: 0, backlog: 18 }, null, 2))
