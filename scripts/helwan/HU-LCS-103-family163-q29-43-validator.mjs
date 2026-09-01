#!/usr/bin/env node

import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile, readdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  concepts: resolve(base, 'concept/HU-LCS-103-family163-q29-43-concepts.md'),
  articles: resolve(base, 'article/HU-LCS-103-family163-q29-43-articles.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family163-q29-43-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family163-q29-43-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family163-q29-43-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family163-q29-43-mcq.md'),
}
const prior = {
  articles: resolve(base, 'article/HU-LCS-103-family163-q15-28-articles.md'),
  conceptsA: resolve(base, 'concept/HU-LCS-103-family163-q15-28-concepts.md'),
  conceptsB: resolve(base, 'concept/HU-LCS-103-family163-q1-14-concepts.md'),
  conceptsC: resolve(base, 'concept/HU-LCS-103-family102-q12-17-selected-bone-tumour-concepts.md'),
}
const parseItems = (text) => text.split(/\n\n---\n\n/).filter(Boolean).map((block) => Object.fromEntries(
  [...block.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=\n\n## |(?![\s\S]))/gm)].map((match) => [match[1], match[2].trim()]),
))
const raw = {}
const loaded = {}
for (const [kind, path] of Object.entries(paths)) {
  raw[kind] = await readFile(path, 'utf8').catch(() => '')
  assert.notEqual(raw[kind], '', `${kind} file must exist`)
  loaded[kind] = parseItems(raw[kind])
}

const questionNumbers = [29, 30, 31, 32, 33, 35, 36, 37, 38, 39, 40, 43]
const expectedKeys = 'DABBBEACDCDD'.split('')
const expectedIds = questionNumbers.map((number) => `Q-HU-LCS103-MSK-F163-${String(number).padStart(2, '0')}`)
const expectedHashes = [
  'dc99798f287c567d3c97f5840db81cd9ef9d314764127bad480ecf907014b39c',
  'e189830fa73c02eeb47dc2d7f79ffade2125fc76fdd9804f81a57410d7cdf1c7',
  '27c319ed83bafc0136185df82723d1faa2142462f3d06a80302afe4287a20bfc',
  '4516e422118048116398542ec2cb03f82f4bb6a8465ff038926af9c6e434e9df',
  '52d299a6769ee5e75d5d939b73c25d19af183b4ea72a33abea2433448538185b',
  'af06c6a39c7a445174c154cb986bac0d0dc3131b3fbe8fe9736e08b2a082ce2e',
  'bc4464df03a1fa3f1205b219b3cfb217b9d4c419544e4022c9cc66ec8923087a',
  '89c11c614a9be2cfc6e9f90763ab83da42f46be46e94d7e834345ec2ae991c7a',
  'ce729438559dc7213f30dcd67dfc84c7ffa627ad72a5e93d5d4ca7d75175baad',
  '37da2f728ef23c8e574622464704b371b4fa3ce2d0cbcd09becdfc1b5ac4f77a',
  '59666947a36c0b027eeb256d41d5166378e6578cf6dd810ff1c1b075dc88bf03',
  'dac9587016346ffaae6993dcfbcdabf0a17ea2b6a029bbf0108601e82b0d38e9',
]
const hashes = loaded.questions.map((row) => createHash('sha256').update(JSON.stringify([row.question, ...'abcde'.split('').map((letter) => row[`answer_${letter}`])])).digest('hex'))
assert.equal(loaded.questions.length, 12, 'exactly twelve approved occurrences')
assert.deepEqual(loaded.questions.map((row) => row.id), expectedIds, 'source-number-preserving IDs')
assert.deepEqual(loaded.questions.map((row) => row.correct_answer), expectedKeys, 'exact agreeing keys')
assert.deepEqual(hashes, expectedHashes, 'exact source stems and options')
assert.ok(loaded.questions.every((row) => 'abcde'.split('').every((letter) => row[`answer_${letter}`] !== '')), 'five literal options each')
assert.ok(loaded.questions.every((row) => row.answer_f === ''), 'no invented sixth option')
assert.ok(loaded.questions.every((row) => row.status === 'Draft'), 'all questions remain Draft')
assert.ok(loaded.questions.every((row) => Object.keys(row).length >= 46), 'question field minimum')
assert.equal(loaded.questions.filter((row) => Object.hasOwn(row, 'explanation')).length, 0, 'no generic explanation field')
assert.equal(loaded.questions.reduce((sum, row) => sum + Object.keys(row).filter((key) => /^explanation_[a-f]$/.test(key)).length, 0), 72, 'six option-specific explanation headers each')
const explanations = loaded.questions.flatMap((row) => 'abcde'.split('').map((letter) => row[`explanation_${letter}`]))
assert.equal(explanations.length, 60, 'five active explanations each')
assert.ok(explanations.every((text) => text.length >= 200), 'every active explanation is at least 200 characters')
assert.ok(explanations.every((text) => (text.match(/[.!?](?=\s|$)/g) ?? []).length >= 3), 'every active explanation has at least three sentences')
for (const row of loaded.questions) {
  assert.match(row.author_notes, /Q34 remains held \(formal E\/red C\)/, `${row.id} repeats Q34 hold`)
  assert.match(row.author_notes, /Q41 remains held \(formal E\/red B\)/, `${row.id} repeats Q41 hold`)
  assert.match(row.author_notes, /Q42 remains held \(formal B\/red D\)/, `${row.id} repeats Q42 hold`)
}
for (const held of [34, 41, 42]) assert.ok(!raw.questions.includes(`Q-HU-LCS103-MSK-F163-${held}`), `Q${held} is absent`)
assert.match(loaded.questions[0].question, /African-American/, 'Q29 exact descriptor')
assert.match(loaded.questions[1].question, /5\.4 g\/L.*M-band/s, 'Q30 exact unit and wording')
assert.match(loaded.questions[3].question, /tumors cells/, 'Q32 exact grammar')
assert.match(loaded.questions[4].question, /physical examinations/, 'Q33 exact grammar')
assert.match(loaded.questions[5].question, /Lumbar Prolapsed Nucleus Pulposus/, 'Q35 exact capitalisation')
assert.match(loaded.questions[6].question, /37\.7° C.*karyotypic analysis/s, 'Q36 exact temperature and lead-in')
assert.match(loaded.questions[7].question, /fracture of the right femoral head.*compressed fracture of T11/s, 'Q37 exact fracture wording')
assert.match(loaded.questions[8].author_notes, /newly diagnosed diabetes\/peripheral-neuropathy tension/, 'Q38 source limitation')
assert.match(loaded.questions[9].question, /However;/, 'Q39 exact punctuation')
assert.match(loaded.questions[10].question, /mature white adipocytes/, 'Q40 exact morphology wording')
assert.match(loaded.questions[11].question, /Radiograph show/, 'Q43 exact grammar')

const conceptIds = [
  'CON-MSK-10AAC235A192FD', 'CON-FND-2B59FDDFCEDFA6', 'CON-MSK-8D8A075B265F7B',
  'CON-MSK-5AD256E28E4183', 'CON-MSK-9C7E37FE296254', 'CON-MSK-E92754368B0B07',
  'CON-MSK-89674D65B2316B', 'CON-MSK-4ABB70C236E69B', 'CON-REN-B9E0531973510E',
  'CON-MSK-EE1AB4607BE982',
]
const newConcepts = new Map([
  ['CON-MSK-10AAC235A192FD', 'sickle-cell-disease-osteomyelitis-predisposition'],
  ['CON-MSK-8D8A075B265F7B', 'adamantinoma-clinicoradiologic-immunophenotypic-pattern'],
  ['CON-MSK-EE1AB4607BE982', 'lipoma-clinicopathologic-pattern'],
])
assert.equal(loaded.concepts.length, 10, 'three new concepts plus seven safe updates')
assert.deepEqual(loaded.concepts.map((row) => row.id), conceptIds, 'approved concept IDs')
assert.equal(loaded.concepts.filter((row) => newConcepts.has(row.id)).length, 3, 'exactly three new concepts')
for (const [id, key] of newConcepts) {
  const concept = loaded.concepts.find((row) => row.id === id)
  assert.equal(concept.canonical_key, key, `${id} exact canonical key`)
  assert.equal(id, `CON-MSK-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`, `${id} deterministic ID`)
}
assert.ok(loaded.concepts.every((row) => row.status === 'under review' && row.publication_status === 'needs_evidence'), 'concepts remain pre-publication')
assert.ok(loaded.concepts.every((row) => Object.keys(row).length >= 50), 'concept field minimum')

const priorConcepts = new Map()
for (const path of [prior.conceptsC, prior.conceptsB, prior.conceptsA]) for (const row of parseItems(await readFile(path, 'utf8'))) priorConcepts.set(row.id, row)
const conceptMutationFields = new Set(['definition', 'explicit_objective', 'pitfalls', 'article_ids', 'related_article_ids', 'resource_ids', 'atomic_claim_ids', 'exam_signal', 'original_wording', 'uncertainty'])
for (const row of loaded.concepts.filter((concept) => !newConcepts.has(concept.id))) {
  const before = priorConcepts.get(row.id)
  assert.ok(before, `${row.id} has a prior governed row`)
  for (const key of Object.keys(before)) if (!conceptMutationFields.has(key)) assert.deepEqual(row[key], before[key], `${row.id} preserves ${key}`)
}

const articleIds = [
  'ART-HU-LCS103-MSK-F163-INFECTION-NEUROPATHY-RISKS', 'ART-HU-LCS103-PAT-F163-TUMOUR-PATTERNS',
  'ART-HU-LCS103-MSK-F163-GOUT-OA-CARPAL-ASSOCIATIONS', 'ART-HU-LCS103-MSK-F163-DISC-COMPRESSION',
  'ART-HU-LCS103-MSK-F163-SYSTEMIC-BONE-DISEASES',
]
assert.equal(loaded.articles.length, 5, 'one new and four safe same-ID article updates')
assert.deepEqual(loaded.articles.map((row) => row.id), articleIds, 'exact article IDs')
assert.ok(loaded.articles.every((row) => row.status === 'Draft' && row.publication_gate === 'needs_evidence'), 'articles remain Draft')
assert.ok(loaded.articles.every((row) => Object.keys(row).length >= 49), 'article field minimum')
assert.ok(loaded.articles.every((row) => row.sections.length >= 1200), 'articles are substantive')
const priorArticles = new Map(parseItems(await readFile(prior.articles, 'utf8')).map((row) => [row.id, row]))
const articleMutationFields = new Set(['title', 'summary', 'sections', 'hold_these', 'related_concepts', 'related_articles', 'question_ids', 'resource_ids', 'article_source_ids', 'claim_ids', 'span_ids', 'annotations', 'callout_evidence', 'conflicts', 'notes'])
for (const row of loaded.articles.slice(1)) {
  const before = priorArticles.get(row.id)
  assert.ok(before, `${row.id} has a prior governed row`)
  for (const key of Object.keys(before)) if (!articleMutationFields.has(key)) assert.deepEqual(row[key], before[key], `${row.id} preserves ${key}`)
}
for (const concept of loaded.concepts) {
  const article = loaded.articles.find((row) => row.id === concept.article_ids.split('\n').at(-1))
  assert.ok(article?.related_concepts.split('\n').includes(concept.id), `${concept.id} has reciprocal article link`)
}

const allowedResources = new Set(['src_79b5752c4d6f23e6dafc', 'src_3328fde7f743cd67dc9f', 'src_252ae116a3911d2020a2', 'src_718e08dfb6d19109dabf', 'src_6995e894c8b7f13c8809', 'src_237f83bb42bf143fefdf', 'src_aa8bb730fbccdbf7d6e0', 'src_ea4daee0a71cf5f3171e', 'src_cf37932d10b47ec0a26f'])
for (const row of [...loaded.concepts, ...loaded.articles, ...loaded.questions]) for (const id of row.resource_ids.split('\n').filter(Boolean)) assert.ok(allowedResources.has(id), `${row.id} uses only approved Helwan resources`)
assert.ok(!Object.values(raw).join('\n').includes('src_fed'), 'no cross-corpus formal resource')

assert.equal(loaded.claims.length, 10, 'ten claims')
assert.equal(loaded.citations.length, 20, 'two citations per claim')
assert.equal(loaded.spans.length, 10, 'one span per claim')
for (const claim of loaded.claims) {
  const claimCitations = loaded.citations.filter((row) => row.claim_id === claim.id)
  assert.equal(claimCitations.length, 2, `${claim.id} has two citations`)
  assert.equal(claimCitations[0].resource_id, 'src_79b5752c4d6f23e6dafc', `${claim.id} direct assessment first`)
  assert.ok(claimCitations.every((row) => row.counts_as_claim_evidence === 'no'), `${claim.id} local sources are non-independent`)
  const span = loaded.spans.find((row) => row.claim_ids === claim.id)
  assert.ok(span, `${claim.id} has a span`)
  assert.ok(span.citation_ids.includes(claimCitations[0].id) && span.citation_ids.includes(claimCitations[1].id), `${claim.id} span links citations`)
  const article = loaded.articles.find((row) => row.id === span.article_id)
  assert.ok(article.sections.includes(span.text), `${claim.id} text occurs in article`)
}

const questionRoots = [resolve(base, 'question'), resolve(root, 'docs/import-ready/question'), resolve(root, 'docs/questions-import-ready')]
for (const scanRoot of questionRoots) {
  const entries = await readdir(scanRoot, { recursive: true, withFileTypes: true }).catch(() => [])
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue
    const full = resolve(entry.parentPath ?? entry.path, entry.name)
    if (full === paths.questions) continue
    const text = await readFile(full, 'utf8')
    for (const question of loaded.questions) assert.ok(!text.includes(`## question\n${question.question}`), `${question.id} has no exact-stem rival in ${full}`)
  }
}
for (const [kind, text] of Object.entries(raw)) assert.equal((text.match(/^## explanation$/gm) ?? []).length, 0, `${kind} has no generic explanation header`)
console.log(JSON.stringify({ counts: { concepts: 10, newConcepts: 3, conceptUpdates: 7, articles: 5, newArticles: 1, articleUpdates: 4, resources: 0, questions: 12, claims: 10, citations: 20, spans: 10 }, keys: expectedKeys.join(''), optionCounts: loaded.questions.map(() => 5), genericExplanationHeaders: 0, optionSpecificExplanationHeaders: 72, substantiveExplanations: 60, held: ['Q34 formal E/red C', 'Q41 formal E/red B', 'Q42 formal B/red D'], practical: 0, written: 0, media: 0 }, null, 2))
