import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const ROOT = 'docs/Helwan-Source-Imports'
const files = {
  concepts: `${ROOT}/concept/HU-BMS-102-pathology-concepts.md`,
  articles: `${ROOT}/article/HU-BMS-102-pathology-articles.md`,
  mcq: `${ROOT}/question/HU-BMS-102-pathology-mcq.md`,
  practical: `${ROOT}/practical/HU-BMS-102-pathology-virtual-lab.md`,
  sources: `${ROOT}/evidence/HU-BMS-102-pathology-sources.md`,
  claims: `${ROOT}/evidence/HU-BMS-102-pathology-claims.md`,
  citations: `${ROOT}/evidence/HU-BMS-102-pathology-citations.md`,
  spans: `${ROOT}/evidence/HU-BMS-102-pathology-spans.md`,
  relations: `${ROOT}/relations/HU-BMS-102-pathology-relations.md`,
  media: `${ROOT}/media-requests/HU-BMS-102-pathology-media-requests.md`,
}

const normalize = (value) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
const parse = (path) => readFileSync(path, 'utf8')
  .split(/^\s*---\s*$/m)
  .map((part) => part.trim())
  .filter((part) => /^# Item$/m.test(part))
  .map((document) => {
    const row = {}
    const matcher = /^##[ \t]*(.+?)[ \t]*\r?\n([\s\S]*?)(?=\r?\n##[ \t]|(?![\s\S]))/gm
    let match
    while ((match = matcher.exec(document))) row[normalize(match[1])] = match[2].trim()
    return row
  })

const rows = Object.fromEntries(Object.entries(files).filter(([key]) => key !== 'media').map(([key, path]) => [key, parse(path)]))
rows.written = []
const errors = []
const check = (ok, message) => { if (!ok) errors.push(message) }
const list = (value = '') => value.split(/[|;\n]/).map((item) => item.trim()).filter(Boolean).filter((item) => item !== '[clear]')
const ids = (key) => new Set(rows[key].map((row) => row.id).filter(Boolean))

const expectedCounts = {
  concepts: 7, articles: 2, mcq: 7, written: 0, practical: 2,
  sources: 3, claims: 7, citations: 7, spans: 7, relations: 4,
}
for (const [kind, expected] of Object.entries(expectedCounts)) check(rows[kind].length === expected, `${kind}: expected ${expected}, got ${rows[kind].length}`)

const conceptIds = ids('concepts')
const articleIds = ids('articles')
const sourceIds = ids('sources')
const claimIds = ids('claims')
const citationIds = ids('citations')

for (const concept of rows.concepts) {
  check(/^CON-FND-[A-F0-9]{14}$/.test(concept.id ?? ''), `concept ${concept.id}: invalid id`)
  check(concept.modules === 'HU-BMS-102', `concept ${concept.id}: module is not HU-BMS-102`)
  check(concept.universities === 'hu' && concept.learner_years === '1', `concept ${concept.id}: scope mismatch`)
  check(!concept.arabic_label && !concept.arabic_aliases, `concept ${concept.id}: unverified Arabic terminology present`)
  for (const articleId of list(concept.article_ids)) check(articleIds.has(articleId), `concept ${concept.id}: missing article ${articleId}`)
  for (const resourceId of list(concept.resource_ids)) check(sourceIds.has(resourceId), `concept ${concept.id}: missing source record ${resourceId}`)
  for (const claimId of list(concept.atomic_claim_ids)) check(claimIds.has(claimId), `concept ${concept.id}: missing claim ${claimId}`)
}

for (const article of rows.articles) {
  check(article.summary?.length >= 180, `article ${article.id}: summary is scaffold-short`)
  for (const heading of ['### Definition', '### Mechanism', '### Key determinants', '### Clinical significance', '### Common misconceptions']) {
    check(article.sections?.includes(heading), `article ${article.id}: missing ${heading}`)
  }
  for (const conceptId of list(article.related_concepts)) check(conceptIds.has(conceptId), `article ${article.id}: missing concept ${conceptId}`)
  for (const resourceId of list(article.resource_ids)) check(sourceIds.has(resourceId), `article ${article.id}: missing source ${resourceId}`)
  for (const claimId of list(article.claim_ids)) check(claimIds.has(claimId), `article ${article.id}: missing claim ${claimId}`)
  check(!article.arabic_title, `article ${article.id}: unverified Arabic title present`)
}

const expectedKeys = new Map([
  ['Q-HU102-PAT-CIRC2-05', ['B', '5', true]],
  ['Q-HU102-PAT-CIRC2-06', ['B', '6', true]],
  ['Q-HU102-PAT-CIRC2-07', ['C', '7', true]],
  ['Q-HU102-PAT-CIRC2-09', ['A', '9', true]],
  ['Q-HU102-PAT-CIRC2-12', ['B', '12', true]],
  ['Q-HU102-PAT-CIRC2-14', ['B', '14', true]],
  ['Q-HU102-PAT-CIRC2-27', ['C', '27', false]],
])
for (const question of rows.mcq) {
  const expected = expectedKeys.get(question.id)
  check(Boolean(expected), `unexpected MCQ id ${question.id}`)
  if (!expected) continue
  const [answer, sourceNumber, hasUnkeyedReplay] = expected
  check(question.correct_answer === answer, `${question.id}: expected printed key ${answer}, got ${question.correct_answer}`)
  for (const letter of ['a', 'b', 'c', 'd']) {
    check(Boolean(question[`answer_${letter}`]), `${question.id}: missing answer_${letter}`)
    check(Boolean(question[`explanation_${letter}`]), `${question.id}: missing explanation_${letter}`)
  }
  check(Boolean(question[`answer_${answer.toLowerCase()}`]), `${question.id}: correct_answer does not exist in emitted options`)
  check(list(question.main_concept).length === 1 && conceptIds.has(question.main_concept), `${question.id}: fallback or missing main concept`)
  check(list(question.library_ids).some((id) => articleIds.has(id)), `${question.id}: no emitted covering article`)
  const article = rows.articles.find((row) => list(question.library_ids).includes(row.id))
  check(article && list(article.related_concepts).includes(question.main_concept), `${question.id}: covering article does not own main concept`)
  check(question.source_citation?.includes('src_2b465fab7f0bfd7dd687'), `${question.id}: solved source id absent`)
  check(question.source_citation?.includes(`Q${sourceNumber}`), `${question.id}: exact source question absent`)
  check(question.source_citation?.includes('PDF p'), `${question.id}: exact source page absent`)
  check(question.source_citation?.toLowerCase().includes('auxiliary'), `${question.id}: auxiliary authority not labelled`)
  check(hasUnkeyedReplay === question.source_citation?.includes('src_557920d8b7726db4f14b'), `${question.id}: unkeyed replay accounting mismatch`)
  check(!/editorially keyed|inferred key/i.test(`${question.source_citation}\n${question.author_notes}`), `${question.id}: inferred/editorial key language present`)
}

for (const written of rows.written) {
  check(!/^### .*\bmarks?\b/im.test(written.written_parts ?? ''), `${written.id}: fabricated written marks present`)
  check(Boolean(written.source_citation?.match(/src_11e4f2b9f8bdbdb51806.*p/i)), `${written.id}: exact lecture source/page absent`)
  for (const conceptId of list(written.main_concept)) check(conceptIds.has(conceptId), `${written.id}: missing main concept ${conceptId}`)
  for (const articleId of list(written.library_ids)) check(articleIds.has(articleId), `${written.id}: missing article ${articleId}`)
}

for (const practical of rows.practical) {
  check(!practical.marks, `${practical.id}: fabricated marks field present`)
  check(practical.type === 'Lab interpretation' && practical.lab_subtype === 'Lab', `${practical.id}: not a lab interpretation`)
  check((practical.lab_questions?.match(/^\*= /gm) ?? []).length > 0, `${practical.id}: no explicit source-supported correct options`)
  check(!/https?:\/\//i.test(practical.lab_questions ?? ''), `${practical.id}: remote/fabricated media URL present`)
  for (const conceptId of [...list(practical.main_concept), ...list(practical.concept_ids)]) check(conceptIds.has(conceptId), `${practical.id}: missing concept ${conceptId}`)
}

for (const claim of rows.claims) check(conceptIds.has(claim.concept_id), `claim ${claim.id}: missing concept ${claim.concept_id}`)
for (const citation of rows.citations) {
  check(claimIds.has(citation.claim_id), `citation ${citation.id}: missing claim ${citation.claim_id}`)
  check(sourceIds.has(citation.resource_id), `citation ${citation.id}: missing source ${citation.resource_id}`)
  check(Boolean(citation.locator_page && citation.support_span), `citation ${citation.id}: exact locator/span absent`)
  check(citation.counts_as_claim_evidence === 'no', `citation ${citation.id}: local curriculum promoted to independent evidence`)
}
for (const span of rows.spans) {
  check(articleIds.has(span.article_id), `span ${span.id}: missing article ${span.article_id}`)
  for (const claimId of list(span.claim_ids)) check(claimIds.has(claimId), `span ${span.id}: missing claim ${claimId}`)
  for (const citationId of list(span.citation_ids)) check(citationIds.has(citationId), `span ${span.id}: missing citation ${citationId}`)
}
for (const relation of rows.relations) {
  check(conceptIds.has(relation.source), `relation: missing source concept ${relation.source}`)
  check(conceptIds.has(relation.target), `relation: missing target concept ${relation.target}`)
  for (const claimId of list(relation.evidence_claim_ids)) check(claimIds.has(claimId), `relation: missing claim ${claimId}`)
  for (const citationId of list(relation.citation_ids)) check(citationIds.has(citationId), `relation: missing citation ${citationId}`)
}

const media = readFileSync(files.media, 'utf8')
check((media.match(/^### image · /gm) ?? []).length === 2, 'media: expected two requests')
check(!/https?:\/\//i.test(media), 'media: URL present even though no media was supplied')
check(!/Priority: required/i.test(media), 'media: text-native virtual labs must not be blocked on optional plates')

const forbidden = /\b(?:TBD|TODO|PLACEHOLDER)\b/i
for (const [key, path] of Object.entries(files)) check(!forbidden.test(readFileSync(path, 'utf8')), `${key}: placeholder token present`)

const corpus = JSON.parse(readFileSync(`${ROOT}/evidence/corpus-source-index.json`, 'utf8')).sources
const expectedHashes = {
  src_11e4f2b9f8bdbdb51806: '11e4f2b9f8bdbdb518061fd414e2d0fd6f3be1166694721c57daa4802bcb100f',
  src_2b465fab7f0bfd7dd687: '2b465fab7f0bfd7dd687716d258a5e0f613132f974be6700fd588b33f96c5809',
  src_557920d8b7726db4f14b: '557920d8b7726db4f14b89d1c9ee69ece6db28d037485355c39d129767e9f4ee',
}
for (const [id, hash] of Object.entries(expectedHashes)) check(corpus[id]?.sha256 === hash, `corpus source hash mismatch for ${id}`)

const selectedFamily3 = {
  solvedPromptOccurrences: rows.mcq.length,
  printedAnswerOccurrences: rows.mcq.length,
  unkeyedCompanionReplays: [...expectedKeys.values()].filter(([, , replay]) => replay).length,
  retainedQuestionRecords: rows.mcq.length,
  distinctNewHandles: rows.concepts.length,
}
check(JSON.stringify(selectedFamily3) === JSON.stringify({ solvedPromptOccurrences: 7, printedAnswerOccurrences: 7, unkeyedCompanionReplays: 6, retainedQuestionRecords: 7, distinctNewHandles: 7 }), 'Family-3 selected-slice accounting mismatch')

const checksums = Object.fromEntries(Object.entries(files).map(([key, path]) => [key, createHash('sha256').update(readFileSync(path)).digest('hex')]))
const report = {
  passed: errors.length === 0,
  scope: 'HU-BMS-102 Pathology / Family-3 new-handle release slice',
  authority: {
    teaching: 'current dated BMS-102 lecture; local curriculum',
    questions: 'tier-3 solved auxiliary printed answers; not official examination authority',
    written: 'excluded: governed sources in this slice print no mark allocations, and the importer requires positive source-defensible marks',
  },
  authoringRelease: { concepts: true, articles: true, mcq: true, written: false, practical: true },
  governedFamily3Boundary: { solvedPrompts: 30, printedAnswers: 30, unkeyedCompanionPrompts: 28, retainedRecords: 30, handles: 26 },
  selectedFamily3,
  counts: { ...expectedCounts, mediaRequests: 2, importRows: Object.values(expectedCounts).reduce((sum, value) => sum + value, 0) },
  checksums,
  errors,
}
console.log(JSON.stringify(report, null, 2))
if (errors.length) process.exit(1)
