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
  concepts: resolve(base, 'concept/HU-LCS-103-family163-q44-58-concepts.md'),
  articles: resolve(base, 'article/HU-LCS-103-family163-q44-58-articles.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family163-q44-58-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family163-q44-58-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family163-q44-58-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family163-q44-58-mcq.md'),
}
const prior = {
  articles: resolve(base, 'article/HU-LCS-103-family163-q29-43-articles.md'),
  concepts: [
    resolve(base, 'concept/HU-LCS-103-family163-q29-43-concepts.md'),
    resolve(base, 'concept/HU-LCS-103-family163-q15-28-concepts.md'),
    resolve(base, 'concept/HU-LCS-103-family143-q1-13-joint-concepts.md'),
    resolve(root, 'docs/import-ready/concept/101-ISK-mcq-concepts.md'),
  ],
}
const parseItems = (text) => text.split(/\n\n---\n\n/).filter(Boolean).map((block) => Object.fromEntries(
  [...block.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=\n(?:\n)?## |(?![\s\S]))/gm)].map((match) => [match[1], match[2].trim()]),
))
const listValues = (value) => String(value ?? '').replace(/^\+/, '').split('\n').filter(Boolean)
const raw = {}
const loaded = {}
for (const [kind, path] of Object.entries(paths)) {
  raw[kind] = await readFile(path, 'utf8').catch(() => '')
  assert.notEqual(raw[kind], '', `${kind} file exists`)
  loaded[kind] = parseItems(raw[kind])
}

const numbers = [44, 47, 48, 49, 50, 52, 53, 54, 56, 57, 58]
const keys = 'AACBADCDDBB'.split('')
const ids = numbers.map((number) => `Q-HU-LCS103-MSK-F163-${String(number).padStart(2, '0')}`)
const hashes = [
  'b1550f5405ee39145f1894220caac93cf4c798e9798e9021b3552635f5b4be74',
  '4372358a664cf3546d79fcfc13cef5481471129959b393324d4bd76d7b09093a',
  '66bfdcbc96f7ea44523846247bd7a7fa5422843718b442fecb4147c06fae52e6',
  '00a481951efbbb6aae36293efc5105a6aee47d4648ec20a8dee83668b8ce488c',
  '413aa15b6f3ba2df8cb7fe9166bf188745972b9cefb3b827db63784a06733de0',
  '99e19c83bf753a36b3db1494dc07a594caed62004c49542c8a1c787d5efc34c5',
  '54e0b2d9adc64da655ddf773f0a1779713801b665ca35fb6b6d9b1853e5bfec6',
  '9379fe62ea731761c9df8449033c83e3b7d270660541ebe0921f7cbdcdce63bf',
  'cb0d0feccde2d05903b8582c2ca8cabd837895c7ab63223d3d88fb2ae9d1dbc1',
  '87bfb6b30e53505d3166635ac51c6a8ed0b43d85c67850aa812743fb6e59741b',
  'fec23d9b2c139f25baa09d8b3fcfa7af6b9b4e6ae769a62725f57689983c4ebe',
]
const actualHashes = loaded.questions.map((row) => createHash('sha256').update(JSON.stringify([row.question, ...'abcde'.split('').map((letter) => row[`answer_${letter}`])])).digest('hex'))
assert.equal(loaded.questions.length, 11, 'exactly eleven approved occurrences')
assert.deepEqual(loaded.questions.map((row) => row.id), ids, 'source-number-preserving IDs')
assert.deepEqual(loaded.questions.map((row) => row.correct_answer), keys, 'locked agreeing keys')
assert.deepEqual(actualHashes, hashes, 'literal stems and five options')
assert.ok(loaded.questions.every((row) => 'abcde'.split('').every((letter) => row[`answer_${letter}`])), 'five literal options each')
assert.ok(loaded.questions.every((row) => row.answer_f === '' && row.status === 'Draft'), 'no invented option and all Draft')
assert.ok(loaded.questions.every((row) => Object.keys(row).length >= 46), 'question field minimum')
assert.equal(loaded.questions.filter((row) => Object.hasOwn(row, 'explanation')).length, 0, 'no generic explanation field')
assert.equal(loaded.questions.reduce((count, row) => count + Object.keys(row).filter((key) => /^explanation_[a-f]$/.test(key)).length, 0), 66, 'six option-specific explanation headers each')
const explanations = loaded.questions.flatMap((row) => 'abcde'.split('').map((letter) => row[`explanation_${letter}`]))
assert.ok(explanations.every((text) => text.length >= 200), 'substantive explanations')
assert.ok(explanations.every((text) => (text.match(/[.!?](?=\s|$)/g) ?? []).length >= 3), 'at least three sentences per active explanation')
for (const row of loaded.questions) {
  assert.match(row.author_notes, /Q45 remains held \(formal C\/red A\)/)
  assert.match(row.author_notes, /Q46 remains held \(formal A\/red C\)/)
  assert.match(row.author_notes, /Q51 remains held \(formal B\/red A\)/)
  assert.match(row.author_notes, /Q55 remains held \(formal A\/red C\)/)
  assert.match(row.author_notes, /does not identify an official exam sitting, cohort or date/)
}
for (const held of [45, 46, 51, 55]) assert.ok(!raw.questions.includes(`Q-HU-LCS103-MSK-F163-${held}`), `Q${held} absent`)
assert.match(loaded.questions[0].question, /5\.4 g\/L.*M-band/s)
assert.match(loaded.questions[1].question, /10\.6g\/dl.*1\.300\/mm3.*30 %.*abnormal appearing/s)
assert.match(loaded.questions[2].question, /1st metatarsophalangeal/)
assert.match(loaded.questions[3].question, /β-2 microglobulin of 4\.5 mg\/dL.*25% plasma cells/s)
assert.match(loaded.questions[4].question, /asymptomatic man.*severe fatigue/s)
assert.equal(loaded.questions[4].answer_e, 'Observe without treatment since she is asymptomatic')
assert.equal(loaded.questions[5].answer_b, 'Hand bone')
assert.match(loaded.questions[6].question, /radial aspect of the wrist/)
assert.match(loaded.questions[8].question, /radiograph of the lower limb.*Heberden’s nodes|Heberden’s nodes.*radiograph of the lower limb/s)
assert.match(loaded.questions[9].question, /no birthmark.*followed by regression/s)
assert.equal(loaded.questions[10].answer_b, 'Cortisol of 75 microgm/dL')

const conceptIds = [
  'CON-FND-2B59FDDFCEDFA6', 'CON-REN-B9E0531973510E', 'CON-MSK-DDF3A03342A247',
  'CON-MSK-9B52018C4649BD', 'CON-MSK-CFE4B805DB79CC', 'CON-MSK-5AD256E28E4183',
  'CON-MSK-CCA1BD5332E366', 'CON-MSK-5968997CD38FBA', 'CON-MSK-E2CD193CEF4060',
]
const newConcepts = new Map([
  ['CON-MSK-CCA1BD5332E366', 'severe-hypercalcemia-sequential-saline-bisphosphonate-management'],
  ['CON-MSK-5968997CD38FBA', 'infantile-hemangioma-clinical-course'],
  ['CON-MSK-E2CD193CEF4060', 'cushing-syndrome-secondary-osteoporosis'],
])
assert.equal(loaded.concepts.length, 9, 'three new plus six updates')
assert.deepEqual(loaded.concepts.map((row) => row.id), conceptIds, 'approved concept IDs and order')
assert.ok(loaded.concepts.every((row) => Object.keys(row).length >= 50), 'concept field minimum')
assert.ok(loaded.concepts.every((row) => row.status === 'under review' && row.publication_status === 'needs_evidence'), 'concepts remain pre-publication')
for (const [id, key] of newConcepts) {
  const row = loaded.concepts.find((concept) => concept.id === id)
  assert.equal(row.canonical_key, key)
  assert.equal(id, `CON-MSK-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`)
  assert.match(row.field_notes, /resourceOccurrenceIds:/)
  assert.match(row.field_notes, /sourceCandidateIds:/)
}
const priorConcepts = new Map()
for (const path of prior.concepts.toReversed()) for (const row of parseItems(await readFile(path, 'utf8'))) priorConcepts.set(row.id, row)
const conceptMutationFields = new Set(['definition', 'explicit_objective', 'pitfalls', 'modules', 'universities', 'article_ids', 'related_article_ids', 'resource_ids', 'atomic_claim_ids', 'exam_signal', 'original_wording', 'uncertainty'])
for (const row of loaded.concepts.filter((concept) => !newConcepts.has(concept.id))) {
  const before = priorConcepts.get(row.id)
  assert.ok(before, `${row.id} has governed prior row`)
  for (const key of Object.keys(before)) if (!conceptMutationFields.has(key)) assert.deepEqual(row[key], before[key], `${row.id} preserves ${key}`)
}

const articleIds = ['ART-HU-LCS103-PAT-F163-TUMOUR-PATTERNS', 'ART-HU-LCS103-MSK-F163-GOUT-OA-CARPAL-ASSOCIATIONS', 'ART-HU-LCS103-MSK-F163-SYSTEMIC-BONE-DISEASES']
assert.deepEqual(loaded.articles.map((row) => row.id), articleIds, 'only three approved article updates')
assert.ok(loaded.articles.every((row) => row.status === 'Draft' && row.publication_gate === 'needs_evidence'), 'articles Draft')
assert.ok(loaded.articles.every((row) => Object.keys(row).length >= 49 && row.sections.length >= 1200), 'articles substantive and complete')
const priorArticles = new Map(parseItems(await readFile(prior.articles, 'utf8')).map((row) => [row.id, row]))
const articleMutationFields = new Set(['summary', 'sections', 'hold_these', 'related_concepts', 'question_ids', 'resource_ids', 'article_source_ids', 'claim_ids', 'span_ids', 'annotations', 'callout_evidence', 'conflicts', 'notes'])
for (const row of loaded.articles) {
  const before = priorArticles.get(row.id)
  assert.ok(before)
  for (const key of Object.keys(before)) if (!articleMutationFields.has(key)) assert.deepEqual(row[key], before[key], `${row.id} preserves ${key}`)
}
for (const concept of loaded.concepts) {
  const linked = listValues(concept.article_ids).filter((id) => articleIds.includes(id))
  assert.ok(linked.some((id) => loaded.articles.find((article) => article.id === id)?.related_concepts.split('\n').includes(concept.id)), `${concept.id} reciprocal article link`)
}

assert.equal(loaded.claims.length, 9)
assert.equal(loaded.citations.length, 18)
assert.equal(loaded.spans.length, 9)
for (const claim of loaded.claims) {
  const citations = loaded.citations.filter((row) => row.claim_id === claim.id)
  assert.equal(citations.length, 2)
  assert.equal(citations[0].resource_id, 'src_79b5752c4d6f23e6dafc')
  assert.ok(citations.every((row) => row.counts_as_claim_evidence === 'no'))
  const span = loaded.spans.find((row) => row.claim_ids === claim.id)
  assert.ok(span)
  assert.ok(span.citation_ids.includes(citations[0].id) && span.citation_ids.includes(citations[1].id))
  assert.ok(loaded.articles.find((article) => article.id === span.article_id)?.sections.includes(span.text))
}
const allowedResources = new Set(['src_79b5752c4d6f23e6dafc', 'src_3328fde7f743cd67dc9f', 'src_237f83bb42bf143fefdf', 'src_6995e894c8b7f13c8809', 'src_aa8bb730fbccdbf7d6e0', 'src_718e08dfb6d19109dabf'])
for (const row of [...loaded.concepts.filter((concept) => newConcepts.has(concept.id)), ...loaded.questions]) for (const id of listValues(row.resource_ids)) assert.ok(allowedResources.has(id), `${row.id} only approved Helwan resources`)
for (const row of loaded.concepts.filter((concept) => !newConcepts.has(concept.id))) {
  if (row.id === 'CON-MSK-9B52018C4649BD') {
    assert.ok(row.article_ids.startsWith('+') && row.related_article_ids.startsWith('+') && row.resource_ids.startsWith('+') && row.atomic_claim_ids.startsWith('+'), `${row.id} uses append-only list directives and cannot clobber shared Kasr links`)
  } else {
    const beforeResources = listValues(priorConcepts.get(row.id).resource_ids)
    assert.ok(beforeResources.every((id) => listValues(row.resource_ids).includes(id)), `${row.id} preserves every prior shared resource link`)
  }
}
for (const row of loaded.articles) {
  const beforeResources = priorArticles.get(row.id).resource_ids.split('\n').filter(Boolean)
  assert.ok(beforeResources.every((id) => row.resource_ids.split('\n').includes(id)), `${row.id} preserves every prior article resource link`)
}

const questionRoots = [resolve(base, 'question'), resolve(root, 'docs/import-ready/question'), resolve(root, 'docs/questions-import-ready')]
for (const scanRoot of questionRoots) {
  const entries = await readdir(scanRoot, { recursive: true, withFileTypes: true }).catch(() => [])
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue
    const full = resolve(entry.parentPath ?? entry.path, entry.name)
    if (full === paths.questions) continue
    const text = await readFile(full, 'utf8')
    for (const question of loaded.questions) assert.ok(!text.includes(`## question\n${question.question}`), `${question.id} no same-stem rival in ${full}`)
  }
}
for (const [kind, text] of Object.entries(raw)) assert.equal((text.match(/^## explanation$/gm) ?? []).length, 0, `${kind} no generic explanation`)
console.log(JSON.stringify({ counts: { questions: 11, concepts: 9, newConcepts: 3, conceptUpdates: 6, articles: 3, articleUpdates: 3, claims: 9, citations: 18, spans: 9, resources: 0 }, keys: keys.join(''), optionCounts: loaded.questions.map(() => 5), genericExplanationHeaders: 0, held: ['Q45 C/A', 'Q46 A/C', 'Q51 B/A', 'Q55 A/C'], practical: 0, written: 0, media: 0 }, null, 2))
