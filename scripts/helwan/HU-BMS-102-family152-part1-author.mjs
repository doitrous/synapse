import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_a988f51544db9b537b0c'
const A_CONG = 'ART-HU-BMS102-PAT-HYPERAEMIA-CONGESTION'
const A_OED = 'ART-HU-BMS102-PAT-OEDEMA-MECHANISMS'
const C_BROWN = 'CON-FND-2F6E16E7D19228'
const C_NUT = 'CON-FND-D35F7F5AFB4F18'
const C_ONC = 'CON-FND-1A6183A27A5620'
const C_HYPER = 'CON-FND-E677D1053B76BC'
const C_HFC = 'CON-FND-EA306C3E6B23E1'
const C_SIDE = 'CON-FND-9F0BD1B3074191'
const C_LOCAL = 'CON-FND-19B0A2A6DDA3D5'
const letters = 'ABCDE'
const row = fields => `# Item\n${fields.map(([key, value]) => `## ${key}\n${value ?? ''}`).join('\n')}`
const rows = items => items.join('\n---\n\n')

const specs = [
  ['Q01', 'A', C_BROWN, A_CONG, 1, 'A 49-year-old man with left sided heart failure. He develops one of the followings:', ['Brown induration of the lung', 'Cardiac cirrhosis', 'Dilatation of right ventricle', 'Edema of lower limb', 'Nutmeg liver'], 'The carrier keys brown induration of the lung as the consequence of left-sided heart failure.'],
  ['Q02', 'D', C_NUT, A_CONG, 1, 'By microscopic examination of hepatic lobules, central part is deep red while midzone show fatty changes. This lesion is called:', ['Amyloid liver', 'Fatty change liver', 'Liver necrosis', 'Nutmeg liver', 'Toxemia of liver'], 'The alternating central congestion and midzonal fatty change are keyed as nutmeg liver.'],
  ['Q03', 'A', C_ONC, A_OED, 1, "Which of the following isn't involved pathogenesis of edema:", ['Increased plasma oncotic pressure', 'Increased tissue osmotic pressure', 'Increased capillary permeability', 'Increased capillary hydrostatic pressure', 'Lymphatic obstruction'], 'The carrier keys increased plasma oncotic pressure as the exception; decreased plasma oncotic pressure promotes oedema.'],
  ['Q04', 'A', C_HYPER, A_CONG, 1, 'Which of the following is a cause of active hyperemia:', ['Acute inflammation', 'Kidney in renal vein thrombosis', 'Lung in acute left ventricular failure', 'Lung in right sided heart failure', 'Tissue of lung in femoral vein thrombosis'], 'Acute inflammation is keyed as the active-hyperaemia cause; the other vascular examples describe impaired outflow or downstream embolic effects.'],
  ['Q05', 'C', C_HFC, A_CONG, 2, 'Heart failure cells are present within the alveoli as a result of:', ['Active hyperemia.', 'Acute inflammation', 'Rupture of capillaries.', 'Thrombosis of pulmonary artery.'], 'The carrier keys rupture of capillaries, permitting erythrocyte leakage and subsequent haemosiderin uptake by alveolar macrophages.'],
  ['Q06', 'B', C_NUT, A_CONG, 2, 'Which of the followings is true for nutmeg liver:', ['It is a caseating granuloma of the liver', 'It is alternating yellow and dark red colors due to congestion', 'It is extensive iron deposition in hepatocytes', 'It is the microscopic description of the liver in hepatic bilharziasis', 'It occurs in case of hepatic amyloidosis'], 'The carrier keys the alternating yellow and dark-red congestive pattern.'],
  ['Q07', 'B', C_SIDE, A_CONG, 2, 'With right sided heart failure, the liver shows:', ['Acute inflammation', 'Congestion', 'Edema', 'Hemorrhage', 'Infarction'], 'Right-sided heart failure is keyed as producing hepatic congestion.'],
  ['Q08', 'C', C_BROWN, A_CONG, 2, 'Which of the following can cause brown induration of the lung:', ['Emphysema', 'Lung infarction', 'Mitral stenosis', 'Aortic stenosis', 'Pulmonary TB'], 'Mitral stenosis is keyed as a cause of chronic pulmonary venous congestion and brown induration.'],
  ['Q09', 'B', C_HYPER, A_CONG, 2, 'Congestion means:', ['Active process in which arteriolar dilation leads to ↑ blood flow', 'Passive process resulting from reduced outflow of blood from a tissue', 'Accumulation of fluid in interstitial fluid', 'Fluid collections in peritoneal cavity'], 'The carrier defines congestion as a passive process caused by reduced blood outflow.'],
  ['Q10', 'C', C_LOCAL, A_OED, 3, 'Which of the following is a cause of localized edema:', ['Right ventricular failure', 'Nephrotic syndrome', 'Inflammatory edema', 'Nutritional deficiency', 'Liver failure'], 'Inflammatory oedema is keyed as a localized form in this option set.'],
  ['Q11', 'E', C_SIDE, A_CONG, 3, 'Chronic venous congestion of the liver is due to:', ['Hepato-renal failure', 'Left sided HF', 'Liver cirrhosis', 'Portal HTN', 'Right sided HF'], 'The carrier keys right-sided heart failure as the cause of chronic venous congestion of the liver.'],
  ['Q12', 'D', C_SIDE, A_CONG, 3, 'Post mortem examination of a case reveals bilateral edema of lower limbs and nutmeg liver. In such case one would also expect to find:', ['Biliary cirrhosis.', 'Portal vein thrombosis.', 'Pulmonary embolus.', 'Right heart dilatation.', 'Splenic amyloidosis.'], 'The carrier keys right-heart dilatation as the associated finding in this systemic congestive pattern.'],
]

const questions = specs.map(([ref, key, concept, article, page, stem, options, teaching]) => ({
  ref, key, concept, article, page, stem, options, teaching,
  id: `Q-HU102-PAT-F152-P1-${ref}`,
  claim: `CLM-HU102-F152-P1-${ref}-01`,
  qcit: `CIT-HU102-F152-P1-${ref}-QUESTION`,
  kcit: `CIT-HU102-F152-P1-${ref}-KEY`,
  span: `SPN-HU102-F152-P1-${ref}-01`,
}))
const groups = Object.groupBy(questions, q => q.article)
const conceptInfo = {
  [C_BROWN]: ['Brown induration of the lung reflects chronic pulmonary venous congestion', 'Recognise left-sided heart failure and mitral stenosis as source-keyed settings for brown induration of the lung.', 'clinical_pathological_correlation', 'pathology.congestion.brown-induration-chronic-pulmonary-congestion'],
  [C_NUT]: ['Chronic passive liver congestion produces a nutmeg appearance', 'Recognise the source-described nutmeg morphology.', 'morphological_pattern', 'pathology.congestion.liver-nutmeg-appearance'],
  [C_ONC]: ['Nephrotic oedema results from reduced plasma oncotic pressure', 'Distinguish increased from decreased plasma oncotic pressure in oedema pathogenesis.', 'pathophysiological_mechanism', 'pathology.edema.nephrotic-reduced-plasma-oncotic-pressure'],
  [C_HYPER]: ['Hyperaemia is active whereas congestion is passive', 'Distinguish acute-inflammatory active hyperaemia from passive congestion.', 'classification', 'pathology.circulation.hyperaemia-active-congestion-passive'],
  [C_HFC]: ['Chronic pulmonary congestion produces haemosiderin-laden heart-failure cells', 'Relate alveolar capillary rupture to heart-failure-cell formation.', 'morphological_pattern', 'pathology.congestion.pulmonary-heart-failure-cells'],
  [C_SIDE]: ['Right heart failure causes systemic congestion whereas left heart failure causes pulmonary congestion', 'Relate right-sided failure to hepatic congestion, nutmeg liver and right-heart dilatation.', 'clinical_pathway', 'pathology.congestion.right-systemic-left-pulmonary'],
  [C_LOCAL]: ['Inflammatory oedema is driven primarily by increased vascular permeability', 'Identify inflammatory oedema as the source-keyed localised pattern.', 'pathophysiological_mechanism', 'pathology.edema.inflammatory-increased-vascular-permeability'],
}

const sourceRow = row([
  ['id', source], ['title', 'Circulatory — Ahmed Hassan keyed MCQ bank'],
  ['institution', 'Faculty of Medicine, Helwan University'], ['collection_id', 'hu-y1'],
  ['source_relative_path', 'Year 1/BMS 102/Pathology/Questions/MCQs/MCQs - Circulatory MCQ.pdf'],
  ['media_type', 'application/pdf'], ['languages', 'en'], ['page_count', '16'],
  ['sha256', 'a988f51544db9b537b0c94d26fb4a7df13e8e6fba80ec3bc968fc007a6b7edc8'],
  ['processing_status', 'pending'],
  ['rights', 'Local Helwan study-bank carrier held for internal authoring only; no source page is redistributed.'],
  ['qualification', 'Tier-3 instructor-attributed keyed study bank visibly headed Circulatory and DR. Ahmed Hassan. Right-column letters supply study-bank answers, but no official exam sitting, marks, date, module code or authenticated university-key declaration is visible.'],
  ['is_assessment', 'yes'],
])

const extract = (path, id) => {
  const block = readFileSync(path, 'utf8').split(/\n---\n/).find(part => part.includes(`## id\n${id}\n`))
  if (!block) throw new Error(`Missing governed record ${id} in ${path}`)
  return block.trim()
}
const get = (block, field) => block.match(new RegExp(`## ${field}\\n([\\s\\S]*?)(?=\\n## |$)`))?.[1].trimEnd() ?? ''
const set = (block, field, value) => block.replace(new RegExp(`(## ${field}\\n)[\\s\\S]*?(?=\\n## |$)`), `$1${value}`)
const append = (block, field, values) => {
  const current = get(block, field).split(/\n| \| /).filter(value => value && value !== '[clear]')
  for (const value of values) if (!current.includes(value)) current.push(value)
  return set(block, field, current.join('\n'))
}

const articlePath = join(root, 'article', 'HU-BMS-102-pathology-family6-part1-articles.md')
const updateArticle = id => {
  let block = extract(articlePath, id)
  const qs = groups[id]
  const concepts = [...new Set(qs.map(q => q.concept))]
  for (const [field, values] of [
    ['related_concepts', concepts], ['question_ids', qs.map(q => q.id)], ['resource_ids', [source]],
    ['article_source_ids', [source]], ['claim_ids', qs.map(q => q.claim)], ['span_ids', qs.map(q => q.span)],
    ['hold_these', concepts.map(concept => conceptInfo[concept][0])],
  ]) block = append(block, field, values)
  block = set(block, 'sections', `${get(block, 'sections')}\n\n### Family152 Part1 source-bounded additions\n${concepts.map(concept => conceptInfo[concept][0]).join('\n')}`)
  const annotations = get(block, 'annotations')
  const newAnnotations = concepts.filter(id => !annotations.includes(id)).map(id => `### definition_of · ${id}\nQuote: ${conceptInfo[id][0]}\nBlock: body`)
  if (newAnnotations.length) block = set(block, 'annotations', `${annotations}\n\n${newAnnotations.join('\n\n')}`)
  const callouts = qs.map(q => `### ${conceptInfo[q.concept][0]}\nClaims: ${q.claim}\nCitations: ${q.qcit}, ${q.kcit}\nSpan: ${q.span}`).join('\n\n')
  block = set(block, 'callout_evidence', `${get(block, 'callout_evidence')}\n\n${callouts}`)
  block = set(block, 'evidence_basis', `${get(block, 'evidence_basis')}\nFamily152 tier-3 Ahmed-Hassan Circulatory keyed study bank, pages 1–3; printed right-column letters are source-supplied study answers, not an official exam key.`)
  block = set(block, 'notes', `${get(block, 'notes')}\nFamily152 Part1 preserves Q01–Q12 as distinct source occurrences and appends their reciprocal evidence without changing the prior article fields.`)
  return block
}

const conceptFiles = {
  [C_NUT]: 'HU-BMS-102-pathology-family6-part1-concepts.md', [C_ONC]: 'HU-BMS-102-pathology-family6-part1-concepts.md',
  [C_HYPER]: 'HU-BMS-102-pathology-family6-part1-concepts.md', [C_HFC]: 'HU-BMS-102-pathology-family6-part1-concepts.md',
  [C_SIDE]: 'HU-BMS-102-pathology-family6-part2-concepts.md', [C_LOCAL]: 'HU-BMS-102-pathology-family6-part1-concepts.md',
}
const updateConcept = id => {
  let block = extract(join(root, 'concept', conceptFiles[id]), id)
  const qs = questions.filter(q => q.concept === id)
  const articles = [...new Set(qs.map(q => q.article))]
  for (const [field, values] of [['article_ids', articles], ['resource_ids', [source]], ['atomic_claim_ids', qs.map(q => q.claim)]]) block = append(block, field, values)
  block = set(block, 'exam_signal', `${get(block, 'exam_signal')}\n${source} | Family152 Part1 ${qs.map(q => q.ref).join('/')} | tier-3 instructor-attributed keyed study bank | right-column printed letters; not an official exam key`)
  block = set(block, 'original_wording', `${get(block, 'original_wording')}\n${qs.map(q => `[Family152 Part1 ${q.ref}] ${q.stem} [printed answer ${q.key}]`).join('\n')}`)
  block = set(block, 'field_notes', `${get(block, 'field_notes')}\nfamily152Part1Reuse: Complete governed row preserved; Family152 source, claims, wording and article reciprocity appended idempotently.`)
  return block
}

const newConcept = () => {
  const qs = questions.filter(q => q.concept === C_BROWN)
  const [label, objective, type, canonical] = conceptInfo[C_BROWN]
  const expected = `CON-FND-${createHash('sha256').update(canonical).digest('hex').slice(0, 14).toUpperCase()}`
  if (expected !== C_BROWN) throw new Error(`Deterministic ID mismatch ${expected}`)
  return row([
    ['label', label], ['id', C_BROWN], ['canonical_key', canonical], ['aliases', 'Brown induration of lung\nChronic pulmonary venous congestion morphology'],
    ['arabic_label', ''], ['arabic_aliases', '[clear]'],
    ['definition', 'Brown induration is the chronic pulmonary-congestion pattern produced by persistent venous outflow impairment, classically in left-sided heart failure or mitral stenosis. Repeated capillary leakage, haemosiderin-laden macrophages and fibrosis make the lung brown and firm.'],
    ['explicit_objective', objective], ['pitfalls', 'Assigning systemic hepatic congestion to left-sided failure, or treating the tier-3 printed letter as an official examination key.'],
    ['concept_type', type], ['status', 'Draft'], ['support_mode', 'direct_statement'], ['subject', 'fnd'], ['primary_node_id', 'SYS-FND-T03'],
    ['secondary_node_ids', 'DIS-PAT-T03\nSYS-CVS'], ['topic', 'General pathology'], ['subtopic', 'Haemodynamic disorders'],
    ['microtopic', 'Organ congestion'], ['nanotopic', 'Brown induration of lung'], ['learner_years', '1'], ['universities', 'hu'], ['modules', 'HU-BMS-102'],
    ['module_subject', 'HU-BMS-102 > Pathology > Circulatory disturbances > Organ congestion > Brown induration'],
    ['article_ids', A_CONG], ['related_article_ids', A_OED], ['related_concept_ids', `${C_HFC}\n${C_SIDE}`], ['resource_ids', source],
    ['approved_file_resource_ids', '[clear]'], ['approved_video_resource_ids', '[clear]'], ['blueprint_weight', '0.62'], ['exam_weight_by_year', 'HU_Y1=0.62'],
    ['clinical_relevance', '0.80'], ['academic_relevance', '0.95'], ['weight_confidence', '0.46'], ['confidence', '0.78'],
    ['exam_signal', `${source} | Family152 Part1 Q01/Q08 | tier-3 instructor-attributed keyed study bank | printed A/C; not an official exam key`],
    ['atomic_claim_ids', qs.map(q => q.claim).join('\n')], ['resource_occurrence_ids', '[clear]'], ['source_candidate_ids', '[clear]'],
    ['original_wording', qs.map(q => `[Family152 Part1 ${q.ref}] ${q.stem} [printed answer ${q.key}]`).join('\n')],
    ['merge_ids', '[clear]'], ['rejected_merge_candidate_ids', '[clear]'], ['conflicts', '[clear]'],
    ['uncertainty', 'The carrier is an instructor-attributed study bank without official exam/key authentication.'],
    ['evidence_gaps', 'Independent medical verification and Helwan pathology faculty review remain required before publication.'],
    ['owner', 'Helwan Year-1 authoring lane'], ['reviewer', 'Medical team, Helwan Pathology faculty'], ['final_publisher', 'Admin team'],
    ['last_reviewed', ''], ['review_due', ''], ['publication_status', 'needs_evidence'], ['editorial_review_status', 'drafted_not_reviewed'], ['exclusion_reason', ''],
    ['field_notes', 'arabicLabel: Blank pending independently verified terminology review.\narabicAliases: No reviewed Arabic alias is available.\nmicrotopicId: No reviewed microtopic ID exists.\nnanotopicId: No reviewed nanotopic ID exists.\napprovedFileResourceIds: Source is not rights-cleared for redistribution.\napprovedVideoResourceIds: No video is assigned.\nresourceOccurrenceIds: Hand-authored from exact Family152 pages.\nsourceCandidateIds: Source-first searches were reconciled in the governing triage.\nmergeIds: No merge occurred.\nrejectedMergeCandidateIds: No rival same-key record exists.\nlastReviewed: New Draft; no faculty review.\nreviewDue: Set after review.\nexclusionReason: Not excluded; held at needs_evidence.'],
  ])
}

const questionRow = q => row([
  ['id', q.id], ['title', q.stem], ['subject', 'fnd'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['vignette', ''], ['question', q.stem],
  ['format', 'single best answer'], ['derived_from', ''], ['correct_answer', q.key],
  ...q.options.flatMap((option, index) => [[`answer_${letters[index].toLowerCase()}`, option], [`explanation_${letters[index].toLowerCase()}`, letters[index] === q.key ? `${q.teaching} This is a source-supplied study-bank answer, not an authenticated Helwan examination key.` : `This option is not the right-column letter printed for this occurrence. The tested source-bounded teaching point is: ${conceptInfo[q.concept][0]}.`]]),
  ['topic', 'Circulatory disturbances'], ['subtopic', q.article === A_CONG ? 'Hyperaemia and congestion' : 'Oedema mechanisms'], ['difficulty', 'Moderate'], ['question_type', 'Pathology'],
  ['main_concept', q.concept], ['module', 'HU-BMS-102'], ['module_subject', `HU-BMS-102 > Pathology > Family152 Part1 > ${q.ref}`],
  ['clinical_relevance', '0.80'], ['academic_relevance', '0.95'], ['cognitive_effort_score', '0.55'], ['exam_weight_by_year', 'HU_Y1=0.62'],
  ['question_only_for', 'HU_Y1'], ['concept_ids', q.concept], ['years', 'HU_Y1'], ['universities', 'hu'], ['cognitive_effort', 'Moderate'],
  ['setting', q.stem.startsWith('A ') || q.stem.startsWith('Post mortem') ? 'Clinical' : 'Foundational'], ['reasoning_level', '2'], ['inferred_difficulty', '55'], ['exam_relevance', '7'],
  ['contextual_concept_ids', ''], ['library_ids', q.article], ['resource_ids', source], ['learning_objective', conceptInfo[q.concept][1]],
  ['media_recommendations', ''], ['source_citation', `${source}, Family152 Part1 ${q.ref}, PDF p${q.page}: literal stem/options and right-column printed ${q.key}. Tier-3 study-bank authority only.`],
  ['attachments', ''], ['attached_image', ''], ['author_notes', 'Literal wording, spelling, option order and printed answer are preserved after joining line wraps. No marks, sitting or official-key authority is inferred.'],
  ['estimated_seconds', '75'], ['randomise_answers', 'yes'],
])
const claimRow = q => row([
  ['id', q.claim], ['concept_id', q.concept], ['subject', 'fnd'], ['predicate', 'is source-keyed as'], ['object', q.options[letters.indexOf(q.key)]],
  ['display_text', conceptInfo[q.concept][0]], ['risk_class', 'foundational_stable'], ['verification_status', 'needs_evidence'], ['conflict_status', 'none'],
  ['confidence', '0.78'], ['freshness', 'source_created_2025-04-10'], ['time_sensitive', 'no'],
  ['qualifiers', `authority: tier-3 Ahmed-Hassan keyed study bank, not an official exam key. occurrence: Family152 Part1 ${q.ref}.`],
])
const citationRow = (q, key) => row([
  ['id', key ? q.kcit : q.qcit], ['claim_id', q.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'],
  ['support_span', key ? `Right-column printed answer: ${q.key}` : `${q.stem} Options: ${q.options.map((option, index) => `${letters[index]}. ${option}`).join(' | ')}`],
  ['locator_type', 'page'], ['locator_page', String(q.page)], ['locator_section', `Family152 Part1 ${q.ref}`],
  ['locator_detail', key ? 'Isolated right-column printed letter aligned to this occurrence' : 'Exact literal stem and option structure'],
  ['context_note', 'Instructor-attributed keyed study bank; no authenticated exam sitting, marks or official university-key declaration.'], ['confidence', '0.97'], ['counts_as_claim_evidence', 'no'],
])
const spanRow = q => row([
  ['id', q.span], ['article_id', q.article], ['section_id', `${q.article.toLowerCase()}-${q.ref.toLowerCase()}`],
  ['text', conceptInfo[q.concept][0]], ['claim_ids', q.claim], ['citation_ids', `${q.qcit}\n${q.kcit}`],
])
const relationRow = (from, type, to, refs, scope) => row([
  ['source', from], ['type', type], ['target', to],
  ['evidence_claim_ids', refs.map(ref => questions.find(q => q.ref === ref).claim).join('\n')],
  ['citation_ids', refs.map(ref => questions.find(q => q.ref === ref).qcit).join('\n')],
  ['verification_status', 'needs_evidence'], ['confidence', '0.78'], ['qualifiers', `scope: ${scope}`], ['reviewer', 'Medical team, Helwan Pathology faculty'],
])
const relations = rows([
  relationRow(C_BROWN, 'related_concepts', C_HFC, ['Q01', 'Q05', 'Q08'], 'brown induration and heart-failure cells are chronic pulmonary-congestion morphology'),
  relationRow(C_BROWN, 'related_concepts', C_SIDE, ['Q01', 'Q07', 'Q08'], 'left-sided pulmonary congestion contrasts with right-sided systemic organ congestion'),
  relationRow(C_NUT, 'related_concepts', C_SIDE, ['Q02', 'Q06', 'Q11', 'Q12'], 'right-sided failure produces chronic hepatic congestion and nutmeg liver'),
  relationRow(C_LOCAL, 'contrasts_with', C_ONC, ['Q03', 'Q10'], 'local inflammatory permeability oedema differs from low-oncotic systemic oedema'),
])

const conceptRows = new Map([[C_BROWN, newConcept()]])
for (const id of [C_NUT, C_ONC, C_HYPER, C_HFC, C_SIDE, C_LOCAL]) conceptRows.set(id, updateConcept(id))
const files = new Map([
  ['evidence/HU-BMS-102-pathology-family152-part1-sources.md', sourceRow],
  ['article/HU-BMS-102-pathology-family152-part1-articles.md', rows([A_CONG, A_OED].map(updateArticle))],
  ['concept/HU-BMS-102-pathology-family152-part1-concepts.md', rows([...conceptRows.values()])],
  ['evidence/HU-BMS-102-pathology-family152-part1-claims.md', rows(questions.map(claimRow))],
  ['evidence/HU-BMS-102-pathology-family152-part1-citations.md', rows(questions.flatMap(q => [citationRow(q, false), citationRow(q, true)]))],
  ['evidence/HU-BMS-102-pathology-family152-part1-spans.md', rows(questions.map(spanRow))],
  ['relations/HU-BMS-102-pathology-family152-part1-relations.md', relations],
  ['question/HU-BMS-102-pathology-family152-part1-mcq.md', rows(questions.map(questionRow))],
])
for (const [relative, body] of files) {
  const path = join(root, relative)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${body.trim()}\n`)
}
console.log(JSON.stringify({ family: 152, part: 1, refs: questions.map(q => q.ref), keys: questions.map(q => q.key).join(''), released: { sources: 1, articles: 2, concepts: 7, newConcepts: 1, reusedConcepts: 6, questions: 12, claims: 12, citations: 24, spans: 12, relations: 4 }, holds: 0, backlog: 66 }, null, 2))
