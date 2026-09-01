import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const root = join(repo, 'docs', 'Helwan-Source-Imports')
const source = 'src_cf79a07d410cc87b8400'
const A1 = 'ART-HU-BMS102-MIC-F38P1-AUTOCLAVE-PRINCIPLES-EQUIPMENT'
const A2 = 'ART-HU-BMS102-MIC-F38P1-LOW-TEMPERATURE-GAS-STERILIZATION'
const row = (fields) => `# Item\n${fields.map(([name, value]) => `## ${name}\n${value ?? ''}`).join('\n')}`
const joinRows = (rows) => rows.join('\n---\n\n')

const concepts = {
  Q20: {
    id: 'CON-INF-F57D5BB4B5C74D', article: A1,
    display: 'A simple autoclave has a tightly fitting lid connected to a steam-discharge tap, safety valve and manometer.',
    objective: 'Identify the source-listed construction of a simple autoclave.',
    predicate: 'has', object: 'a tightly fitting lid connected to a steam-discharge tap, safety valve and manometer',
    limitation: 'The source description is a teaching schematic rather than an engineering specification or device operating instruction.',
  },
  Q21: {
    id: 'CON-INF-50B54C0E700FD5', article: A1,
    display: 'The source distinguishes the steam-jacketed gravity-displacement autoclave by automatic process control.',
    objective: 'Identify automatic control as the source-listed distinction of the steam-jacketed gravity-displacement autoclave.',
    predicate: 'is distinguished in the source by', object: 'automatic process control',
    limitation: 'The answer is limited to the printed comparison and does not claim automatic control is the design\'s only distinction.',
  },
  Q23: {
    id: 'CON-INF-1D8EA7DA7403D9', article: A2,
    display: 'Ethylene oxide is a lethal alkylating sterilant active against microorganisms including spores.',
    objective: 'Identify the lethal alkylating, sporicidal property as the true ethylene-oxide statement.',
    predicate: 'acts as', object: 'a lethal alkylating sterilant active against microorganisms including spores',
    limitation: 'This foundational property is not a complete occupational-safety statement or validated device-cycle protocol.',
  },
  Q24: {
    id: 'CON-INF-7A1422BDA6F879', article: A2,
    display: 'The source lists long narrow-lumen surgical instruments as a plasma-gas sterilization use.',
    objective: 'Preserve the printed best answer while limiting the device-use claim to validated compatible systems.',
    predicate: 'lists as a plasma-gas sterilization use', object: 'surgical instruments with long narrow lumens',
    limitation: 'Actual lumen length, diameter, materials and device compatibility are system-specific and must follow manufacturer instructions and a validated cycle.',
  },
}

const questions = [
  {
    ref: 'Q20', page: '26', key: 'A',
    stem: 'Simple autoclave :',
    options: [
      'Metal cylinder with tightly fitting lid\nThe lid is connected to steam discharge tap, safety valve and manometer .',
      'Metal cylinder with tightly fitting lid, in which steam is introduced from external\nsource.\nThe lid is connected to steam discharge tap, safety valve and manometer .',
      'Metal cylinder with tightly fitting lid that allows better displacement of air.',
      'Metal cylinder with tightly fitting lid, fitted to a vacuum pump insuring air removal.',
    ],
    wrong: [
      '',
      'An external steam supply describes the source\'s steam-jacketed design rather than its simple-autoclave construction.',
      'Better air displacement belongs to the steam-jacketed comparison rather than the source\'s simple-autoclave construction.',
      'The source associates vacuum-assisted air removal with a different autoclave design, not the simple autoclave.',
    ],
  },
  {
    ref: 'Q21', page: '26', key: 'C',
    stem: 'Steam jacketed gravity displacement autoclave is better than simple autoclave in :',
    options: [
      'Double walled chamber where air is evacuated through a vacuum.',
      'Allows better temperature and time cycle.',
      'The process is automatically controlled .',
      'Biological indicators not always needed.',
    ],
    wrong: [
      'Vacuum evacuation is assigned to the prevacuum design rather than gravity displacement.',
      'This wording is less specific than the source-underlined automatic-control distinction.',
      '',
      'The source does not state that biological indicators are unnecessary.',
    ],
  },
  {
    ref: 'Q23', page: '40', key: 'D',
    stem: 'As regarding Ethylene oxide (EO) gas sterilizer the following is true:',
    options: [
      'Items to be sterilized are exposed to it for 3-6 hr at 100°C then it is aerated for 8-\n12 hr to remove any trace of the gas .',
      'Used for heat resistant sensitive devices as glass and metal articles.',
      "It's not toxic, not explosive but carcinogenic to lab animals .",
      'Highly lethal alkylating agent that kills all microbes including spores .',
    ],
    wrong: [
      'The source does not assign a 100°C exposure to its ethylene-oxide teaching description.',
      'The source presents ethylene oxide for heat-sensitive materials rather than heat-resistant glass and metal articles.',
      'The source explicitly describes ethylene oxide as toxic and explosive, so this statement reverses those properties.',
      '',
    ],
  },
  {
    ref: 'Q24', page: '40', key: 'B',
    stem: 'As regarding Plasma gas sterilizer the following is true :',
    options: [
      'Hydrogen peroxide or a mixture with peracetic acid and ethylene oxide .',
      'Used for sterilization of surgical instruments with long narrow lumen as\nlaparoscopes and arthroscopes .',
      'highly toxic & needs prolonged aeration before release .',
      'Items to be sterilized are exposed to it for 3-6 hr at 55°C then it is aerated for 8-12\nhr to remove any trace of the gas .',
    ],
    wrong: [
      'The source does not include ethylene oxide in its plasma-generating mixture.',
      '',
      'The source contrasts plasma gas with the prolonged-aeration property associated with ethylene oxide.',
      'This exposure-and-aeration pattern is assigned to ethylene oxide rather than plasma gas in the source.',
    ],
  },
]

for (const q of questions) {
  q.id = `Q-HU102-MIC-F70-${q.ref}`
  q.claim = `CLM-HU102-F70-${q.ref}-01`
  q.questionCit = `CIT-HU102-F70-${q.ref}-QUESTION`
  q.keyCit = `CIT-HU102-F70-${q.ref}-KEY`
  q.span = `SPN-HU102-F70-${q.ref}-01`
}
const byRef = Object.fromEntries(questions.map((q) => [q.ref, q]))

const sourceRow = row([
  ['id', source],
  ['title', 'Sterilization & Disinfection (2025-2026)'],
  ['institution', 'Helwan University Faculty of Medicine (visible attribution; Capital University logo also present)'],
  ['collection_id', 'hu-y1'],
  ['source_relative_path', 'Year 1/BMS 102/Microbiology/Theoretical/Lec 7 - Sterilization & Disinfection/sterilization & disinfection2 (1).pdf'],
  ['media_type', 'application/pdf'],
  ['languages', 'en'],
  ['page_count', '46'],
  ['sha256', 'cf79a07d410cc87b840053488aa918107aa19fe0ab56ff9499b383e514d93a33'],
  ['processing_status', 'pending'],
  ['rights', 'Local teaching material held for internal authoring only; no page image is redistributed.'],
  ['qualification', 'Tier-4 theoretical teaching deck. The visible cover names Reem Abdelrahman, Faculty of Medicine, Helwan University, and 2025-2026, while also displaying a Capital University logo; PDF metadata says Author: Esraa. Family 70 releases only four four-option MCQs with source-native red underlines. Seventeen unmarked open-response or unkeyed items remain holds; three three-option MCQs remain importer-schema holds; nine repeated checklist prompts and two incomplete fragments are excluded. No examination, sitting, marks, candidate instructions or authenticated official-key authority is inferred.'],
  ['is_assessment', 'yes'],
])

const oldArticlePath = join(root, 'article', 'HU-BMS-102-microbiology-family56-part1-articles.md')
const oldConceptPath = join(root, 'concept', 'HU-BMS-102-microbiology-family38-part1-concepts.md')
const extractById = (path, id) => {
  const item = readFileSync(path, 'utf8').split(/\n---\n/).find((part) => part.includes(`## id\n${id}\n`))
  if (!item) throw new Error(`Cannot find ${id} in ${path}`)
  return item.trim()
}
const getField = (item, name) => {
  const match = item.match(new RegExp(`## ${name}\\n([\\s\\S]*?)(?=\\n## |$)`))
  if (!match) throw new Error(`Missing ${name}`)
  return match[1].trimEnd()
}
const setField = (item, name, value) => {
  const pattern = new RegExp(`(## ${name}\\n)[\\s\\S]*?(?=\\n## |$)`)
  if (!pattern.test(item)) throw new Error(`Missing ${name}`)
  return item.replace(pattern, `$1${value}`)
}
const appendLines = (item, name, lines) => {
  const merged = getField(item, name).split('\n').filter(Boolean)
  for (const line of lines) if (!merged.includes(line)) merged.push(line)
  return setField(item, name, merged.join('\n'))
}
const appendText = (item, name, text) => {
  const old = getField(item, name)
  return setField(item, name, old.includes(text) ? old : `${old}\n${text}`.trim())
}

const articleGroups = new Map([[A1, ['Q20', 'Q21']], [A2, ['Q23', 'Q24']]])
const reusedArticle = (id, refs) => {
  let item = extractById(oldArticlePath, id)
  const qs = refs.map((ref) => byRef[ref])
  const cs = refs.map((ref) => concepts[ref])
  item = appendLines(item, 'related_concepts', cs.map((c) => c.id))
  item = appendLines(item, 'question_ids', qs.map((q) => q.id))
  item = appendLines(item, 'resource_ids', [source])
  item = appendLines(item, 'article_source_ids', [source])
  item = appendLines(item, 'claim_ids', qs.map((q) => q.claim))
  item = appendLines(item, 'span_ids', qs.map((q) => q.span))
  item = appendLines(item, 'hold_these', cs.map((c) => c.display))
  item = appendText(item, 'sections', `### Family-70 source-grounded occurrences\n${cs.map((c) => c.display).join('\n')}\nThese are source-bounded teaching relationships, not device operating instructions.`)
  item = appendText(item, 'callout_evidence', qs.map((q) => `### ${concepts[q.ref].display}\nClaims: ${q.claim}\nCitations: ${q.questionCit}, ${q.keyCit}\nSpan: ${q.span}`).join('\n\n'))
  item = appendText(item, 'evidence_basis', 'Family-70 adds exact four-option prompt occurrences and source-native red-underlined teaching answers; it does not create official-key authority.')
  item = appendText(item, 'evidence_gaps', 'Family-70 retains seventeen unmarked open-response/unkeyed holds and three three-option importer-schema holds. Independent medical verification and named Helwan faculty review remain required.')
  item = appendText(item, 'notes', `Family-70 exact-ID reuse preserves every prior field and appends only governed source, question and evidence reciprocity for ${refs.join('/')}.`)
  return item
}

const reusedConcept = (ref) => {
  const c = concepts[ref]
  const q = byRef[ref]
  let item = extractById(oldConceptPath, c.id)
  item = appendLines(item, 'resource_ids', [source])
  item = appendLines(item, 'atomic_claim_ids', [q.claim])
  item = appendText(item, 'exam_signal', `${source} | tier-4 local theoretical teaching deck | Family-70 ${ref}, source-native red underline | not an official examination key`)
  item = appendText(item, 'original_wording', `[Family-70 ${ref}] ${q.stem} [underlined answer ${q.key}]`)
  item = appendText(item, 'evidence_gaps', `Family-70 source authority is limited by the cover-logo/authorship metadata conflict and absence of examination or official-key status. ${c.limitation}`)
  item = appendText(item, 'field_notes', `family70Reuse: Exact-ID reuse preserves every prior Family-38 field and appends only the Family-70 source occurrence, claim and authority warning for ${ref}.`)
  return item
}

const answerRows = (q) => q.options.flatMap((option, index) => {
  const letter = 'ABCD'[index]
  const c = concepts[q.ref]
  const explanation = letter === q.key
    ? `The option “${option}” is the source-underlined teaching answer. ${c.display} ${c.limitation}`
    : `${q.wrong[index]} The tested relationship is: ${c.display} Therefore “${option}” is not the source-underlined best answer.`
  return [[`answer_${'abcd'[index]}`, option], [`explanation_${'abcd'[index]}`, explanation]]
})
const holdText = 'Q01-Q16 and Q22 remain unmarked open-response or unkeyed holds. Q17-Q19 remain three-option importer-schema holds. Q26-Q34 are repeated checklist exclusions, and I01-I02 are incomplete-fragment exclusions.'
const questionRow = (q) => {
  const c = concepts[q.ref]
  return row([
    ['id', q.id], ['title', q.stem], ['subject', 'inf'], ['status', 'Draft'], ['owner', 'Helwan Year-1 authoring lane'], ['vignette', ''],
    ['question', q.stem], ['format', 'single best answer'], ['derived_from', ''], ['correct_answer', q.key], ...answerRows(q),
    ['topic', 'Sterilization and disinfection'], ['subtopic', q.ref === 'Q20' || q.ref === 'Q21' ? 'Autoclave equipment' : 'Low-temperature sterilization'],
    ['difficulty', 'Moderate'], ['question_type', 'Microbiology'], ['main_concept', c.id], ['module', 'HU-BMS-102'],
    ['module_subject', `HU-BMS-102 > Microbiology > Sterilization and disinfection > Family-70 > ${q.ref}`],
    ['clinical_relevance', '0.72'], ['academic_relevance', '0.95'], ['cognitive_effort_score', '0.46'], ['exam_weight_by_year', 'HU_Y1=0.58'],
    ['question_only_for', 'HU_Y1'], ['concept_ids', c.id], ['years', 'HU_Y1'], ['universities', 'hu'], ['cognitive_effort', 'Low'], ['setting', 'Academic'],
    ['reasoning_level', '1'], ['inferred_difficulty', '46'], ['exam_relevance', '6'], ['contextual_concept_ids', ''], ['library_ids', c.article], ['resource_ids', source],
    ['learning_objective', c.objective], ['media_recommendations', ''],
    ['source_citation', `${source}, PDF p${q.page}, Family-70 ${q.ref}: literal stem, four-option order and source-native red underline beneath option ${q.key}. Tier-4 local theoretical teaching-answer authority only; the cover names Helwan University but also displays a Capital University logo, and PDF metadata names a different author. No examination, sitting, marks or authenticated official key is inferred.`],
    ['attachments', ''], ['attached_image', ''],
    ['author_notes', `Literal source wording, capitalization, punctuation, spacing and line-break-dependent option text are preserved without repair. ${c.limitation} ${holdText}`],
    ['estimated_seconds', '60'], ['randomise_answers', 'yes'],
  ])
}

const claimRow = (q) => {
  const c = concepts[q.ref]
  return row([
    ['id', q.claim], ['concept_id', c.id], ['subject', 'inf'], ['predicate', c.predicate], ['object', c.object], ['display_text', c.display],
    ['risk_class', 'foundational_stable'], ['verification_status', 'needs_evidence'], ['conflict_status', 'none'], ['confidence', '0.76'],
    ['freshness', 'stable_local_teaching_answer'], ['time_sensitive', 'no'],
    ['qualifiers', `authority: tier-4 local theoretical teaching prompt with source-native red underline, without official-key status. provenance: visible Helwan attribution coexists with a Capital University logo and conflicting PDF author metadata. scope: ${c.limitation}`],
  ])
}
const questionCitation = (q) => row([
  ['id', q.questionCit], ['claim_id', q.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'],
  ['support_span', `${q.stem} Options: ${q.options.map((option, index) => `${'ABCD'[index]}. ${option}`).join(' | ')}`],
  ['locator_type', 'page'], ['locator_page', q.page], ['locator_section', `Family-70 ${q.ref}`], ['locator_detail', 'Exact literal prompt and four-option structure'],
  ['context_note', 'Tier-4 local theoretical teaching prompt; no examination, sitting or marks are visible.'], ['confidence', '0.96'], ['counts_as_claim_evidence', 'no'],
])
const keyCitation = (q) => row([
  ['id', q.keyCit], ['claim_id', q.claim], ['resource_id', source], ['evidence_role', 'auxiliary_assessment'],
  ['support_span', `${q.key}. ${q.options['ABCD'.indexOf(q.key)]}`], ['locator_type', 'page'], ['locator_page', q.page],
  ['locator_section', `Family-70 ${q.ref} underlined teaching answer`], ['locator_detail', `A source-native red underline appears beneath option ${q.key}`],
  ['context_note', 'Source-native teaching-answer mark only; not an authenticated official answer key.'], ['confidence', '0.96'], ['counts_as_claim_evidence', 'no'],
])
const spanRow = (q) => row([
  ['id', q.span], ['article_id', concepts[q.ref].article], ['section_id', `${concepts[q.ref].article.toLowerCase()}-family70-${q.ref.toLowerCase()}`],
  ['text', concepts[q.ref].display], ['claim_ids', q.claim], ['citation_ids', `${q.questionCit}\n${q.keyCit}`],
])

const files = new Map([
  ['evidence/HU-BMS-102-microbiology-family70-part1-sources.md', sourceRow],
  ['article/HU-BMS-102-microbiology-family70-part1-articles.md', joinRows([...articleGroups].map(([id, refs]) => reusedArticle(id, refs)))],
  ['concept/HU-BMS-102-microbiology-family70-part1-concepts.md', joinRows(questions.map((q) => reusedConcept(q.ref)))],
  ['evidence/HU-BMS-102-microbiology-family70-part1-claims.md', joinRows(questions.map(claimRow))],
  ['evidence/HU-BMS-102-microbiology-family70-part1-citations.md', joinRows(questions.flatMap((q) => [questionCitation(q), keyCitation(q)]))],
  ['evidence/HU-BMS-102-microbiology-family70-part1-spans.md', joinRows(questions.map(spanRow))],
  ['question/HU-BMS-102-microbiology-family70-part1-questions.md', joinRows(questions.map(questionRow))],
])

for (const [relative, body] of files) {
  const output = join(root, relative)
  mkdirSync(dirname(output), { recursive: true })
  writeFileSync(output, `${body.trim()}\n`)
}

console.log(JSON.stringify({
  family: '70-part1', refs: questions.map((q) => q.ref), keys: questions.map((q) => q.key).join(''),
  released: { sources: 1, articles: 2, updatedArticles: 2, concepts: 4, updatedConcepts: 4, questions: 4, claims: 4, citations: 8, spans: 4, relations: 0 },
  holds: { unmarkedOrUnkeyed: 17, threeOptionSchema: ['Q17', 'Q18', 'Q19'], repeatedChecklistExclusions: 9, incompleteFragments: 2 },
}, null, 2))
