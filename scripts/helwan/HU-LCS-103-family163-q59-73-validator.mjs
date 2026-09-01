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
  concepts: resolve(base, 'concept/HU-LCS-103-family163-q59-73-concepts.md'),
  articles: resolve(base, 'article/HU-LCS-103-family163-q59-73-articles.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family163-q59-73-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family163-q59-73-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family163-q59-73-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family163-q59-73-mcq.md'),
}
const parseItems = (text) => text.split(/\n\n---\n\n/).filter(Boolean).map((block) => Object.fromEntries(
  [...block.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=\n(?:\n)?## |(?![\s\S]))/gm)].map((match) => [match[1], match[2].trim()]),
))
const listValues = (value) => String(value ?? '').replace(/^\+/, '').split('\n').filter(Boolean)
const raw = {}
const loaded = {}
for (const [kind, path] of Object.entries(paths)) {
  raw[kind] = await readFile(path, 'utf8').catch(() => '')
  assert.notEqual(raw[kind], '', `${kind} exists`)
  loaded[kind] = parseItems(raw[kind])
}

const numbers = [60, 61, 62, 63, 64, 65, 67, 68, 69, 70, 71, 72]
const keys = 'BDBABACCCAAE'.split('')
const ids = numbers.map((number) => `Q-HU-LCS103-MSK-F163-${String(number).padStart(2, '0')}`)
const hashes = [
  '9ad0b690b5631e0da559a792f3d7f1cd4e270e1d43231001dbb64a336a6b257d',
  'b4047ccdf9cdeeb1f4806c44e57376d3939c71e4d154305853170fb6b7098752',
  '5a5bb9c01b6b3dd64f6fb7463dddfc5739ea7c52d358e2185ebc219ba61c2ce6',
  'f54c22676f541f5e660979248a62780dfff02ef3c56b29e7ee7d6f7a55106f5a',
  '1df7b4273aa09835a38b3fad67ad50ed90b1d3f0c4a7e04fe87c20f9c97088e8',
  '595887475133731d68b2f914c7e658471ae13e4a6cc192fcb17870ca3196de25',
  'b019f8ff711b1688f99aa901c0e7752b08771c38e394fdea2af4920fa3b62059',
  '76cf777c60a1bb2dea5d52d5c12dae1c932976ed24507fe1bf8995b06a8e3d18',
  '15db8765f099238bff0cc83101bb1fd85b8624bf2b50523ec1d3464df7c19e4d',
  '569dd99072338800efa6706a445a6ba54b78d43a62da44bdbdbd0e7929b2b27b',
  '1238355ba7e14c670dc1bea889597db6044a6affe7bfa669459b9a6b25b6ceaf',
  'e0dadcb93af3e9d94f7d9c9683abb86f110d96d882284388ae1be40382352fb3',
]
const actualHashes = loaded.questions.map((row) => createHash('sha256').update(JSON.stringify([row.question, ...'abcde'.split('').map((letter) => row[`answer_${letter}`])])).digest('hex'))
assert.equal(loaded.questions.length, 12)
assert.deepEqual(loaded.questions.map((row) => row.id), ids)
assert.deepEqual(loaded.questions.map((row) => row.correct_answer), keys)
assert.deepEqual(actualHashes, hashes, 'literal stems/options')
assert.ok(loaded.questions.every((row) => 'abcde'.split('').every((letter) => row[`answer_${letter}`])))
assert.ok(loaded.questions.every((row) => !Object.hasOwn(row, 'answer_f') && row.status === 'Draft'))
assert.ok(loaded.questions.every((row) => Object.keys(row).length >= 46))
assert.equal(loaded.questions.filter((row) => Object.hasOwn(row, 'explanation')).length, 0)
assert.equal(loaded.questions.reduce((count, row) => count + Object.keys(row).filter((key) => /^explanation_[a-e]$/.test(key)).length, 0), 60)
const explanations = loaded.questions.flatMap((row) => 'abcde'.split('').map((letter) => row[`explanation_${letter}`]))
assert.ok(explanations.every((text) => text.length >= 200), 'substantive explanations')
assert.ok(explanations.every((text) => (text.match(/[.!?](?=\s|$)/g) ?? []).length >= 3), 'three sentences')
for (const row of loaded.questions) {
  assert.match(row.author_notes, /Q59 formal E\/red C/)
  assert.match(row.author_notes, /Q66 A\/B/)
  assert.match(row.author_notes, /Q73 C\/A/)
  assert.match(row.author_notes, /t\(14;11\).*t\(11;14\)/)
  assert.match(row.author_notes, /no official exam sitting, cohort or date/)
}
for (const held of [59, 66, 73]) assert.ok(!raw.questions.includes(`Q-HU-LCS103-MSK-F163-${held}`), `Q${held} absent`)
assert.match(loaded.questions[1].question, /blackish discoloration.*antimicrobial cream/s)
assert.match(loaded.questions[2].question, /β-2 microglobulin of 4\.5 mg\/dL/)
assert.match(loaded.questions[3].question, /left great toe.*right first metatarsophalangeal/s)
assert.match(loaded.questions[4].question, /radial aspect of the wrist/)
assert.match(loaded.questions[5].question, /denies heat or cold intolerance.*starry look.*pretibial myxedema/s)
assert.match(loaded.questions[6].question, /trans abdominal.*firm whorly greyish white cut section/s)
assert.equal(loaded.questions[8].answer_c, 'Steroid injection and night time splint')
assert.equal(loaded.questions[9].answer_a, "Phalen's test")
assert.equal(loaded.questions[10].answer_e, 'Rapid plasma regain')
assert.match(loaded.questions[11].question, /\(<1cm\)/)

const conceptIds = [
  'CON-REN-B9E0531973510E', 'CON-MSK-4A6E1433462500', 'CON-MSK-D11FA83681C5C6',
  'CON-MSK-9B52018C4649BD', 'CON-END-E46176A2C11CE5', 'CON-GYN-35EC443C05BB12',
  'CON-MSK-9DA5311A7BF9C2', 'CON-MSK-C5E2A428D599AE', 'CON-MSK-D8EB03B685E55C',
  'CON-MSK-F6F560B9332DCB', 'CON-MSK-3AD186B4605AF2',
]
const newConcepts = new Map([
  ['CON-MSK-4A6E1433462500', 'msk.diabetic-foot.gangrene-debridement'],
  ['CON-END-E46176A2C11CE5', 'endo.graves.clinical-pattern'],
  ['CON-GYN-35EC443C05BB12', 'gyn.uterus.leiomyoma-gross-microscopic-pattern'],
  ['CON-MSK-9DA5311A7BF9C2', 'bonetumor.enchondroma-characteristics-exception'],
  ['CON-MSK-C5E2A428D599AE', 'msk.carpal-tunnel.conservative-treatment'],
  ['CON-MSK-D8EB03B685E55C', 'msk.carpal-tunnel.phalen-test-confirmation'],
  ['CON-MSK-F6F560B9332DCB', 'pathology.joint.rheumatoid-anti-ccp-serology'],
])
assert.deepEqual(loaded.concepts.map((row) => row.id), conceptIds)
assert.ok(loaded.concepts.every((row) => Object.keys(row).length >= 50))
assert.ok(loaded.concepts.every((row) => row.status === 'under review' && row.publication_status === 'needs_evidence'))
for (const [id, key] of newConcepts) {
  const row = loaded.concepts.find((concept) => concept.id === id)
  assert.equal(row.canonical_key, key)
  const system = id.split('-')[1]
  assert.equal(id, `CON-${system}-${createHash('sha256').update(key).digest('hex').slice(0, 14).toUpperCase()}`)
  assert.match(row.field_notes, /sourceCandidateIds:/)
}

const priorConcepts = new Map()
for (const file of [
  'concept/HU-LCS-103-family163-q1-14-concepts.md',
  'concept/HU-LCS-103-family163-q15-28-concepts.md',
  'concept/HU-LCS-103-family163-q29-43-concepts.md',
  'concept/HU-LCS-103-family163-q44-58-concepts.md',
]) for (const row of parseItems(await readFile(resolve(base, file), 'utf8'))) priorConcepts.set(row.id, row)
const conceptMutationFields = new Set(['definition', 'explicit_objective', 'pitfalls', 'article_ids', 'related_article_ids', 'resource_ids', 'atomic_claim_ids', 'exam_signal', 'original_wording', 'uncertainty'])
for (const row of loaded.concepts.filter((concept) => !newConcepts.has(concept.id))) {
  const before = priorConcepts.get(row.id)
  assert.ok(before)
  for (const key of Object.keys(before)) if (!conceptMutationFields.has(key)) assert.deepEqual(row[key], before[key], `${row.id} preserves ${key}`)
  for (const old of listValues(before.resource_ids)) assert.ok(listValues(row.resource_ids).includes(old), `${row.id} preserves resource ${old}`)
}

const articleIds = [
  'ART-HU-LCS103-MSK-F163-INFECTION-NEUROPATHY-RISKS',
  'ART-HU-LCS103-PAT-F163-TUMOUR-PATTERNS',
  'ART-HU-LCS103-MSK-F163-GOUT-OA-CARPAL-ASSOCIATIONS',
  'ART-HU-LCS103-END-F163-GRAVES-CLINICAL-PATTERN',
]
assert.deepEqual(loaded.articles.map((row) => row.id), articleIds)
assert.ok(loaded.articles.every((row) => row.status === 'Draft' && row.publication_gate === 'needs_evidence'))
assert.ok(loaded.articles.every((row) => Object.keys(row).length >= 49 && row.sections.length >= 1000))
const priorArticles = new Map()
for (const file of ['article/HU-LCS-103-family163-q29-43-articles.md', 'article/HU-LCS-103-family163-q44-58-articles.md']) for (const row of parseItems(await readFile(resolve(base, file), 'utf8'))) priorArticles.set(row.id, row)
const articleMutationFields = new Set(['summary', 'sections', 'hold_these', 'related_concepts', 'question_ids', 'resource_ids', 'article_source_ids', 'claim_ids', 'span_ids', 'annotations', 'callout_evidence', 'conflicts', 'notes'])
for (const row of loaded.articles.filter((article) => priorArticles.has(article.id))) {
  const before = priorArticles.get(row.id)
  for (const key of Object.keys(before)) if (!articleMutationFields.has(key)) assert.deepEqual(row[key], before[key], `${row.id} preserves ${key}`)
  for (const old of listValues(before.resource_ids)) assert.ok(listValues(row.resource_ids).includes(old), `${row.id} preserves resource ${old}`)
}
for (const concept of loaded.concepts) {
  const linked = listValues(concept.article_ids).filter((id) => articleIds.includes(id))
  assert.ok(linked.some((id) => listValues(loaded.articles.find((article) => article.id === id)?.related_concepts).includes(concept.id)), `${concept.id} reciprocal link`)
}

assert.equal(loaded.claims.length, 11)
assert.equal(loaded.citations.length, 22)
assert.equal(loaded.spans.length, 11)
for (const claim of loaded.claims) {
  const citations = loaded.citations.filter((row) => row.claim_id === claim.id)
  assert.equal(citations.length, 2)
  assert.equal(citations[0].resource_id, 'src_79b5752c4d6f23e6dafc')
  assert.ok(citations.every((row) => row.counts_as_claim_evidence === 'no'))
  const span = loaded.spans.find((row) => row.claim_ids === claim.id)
  assert.ok(span && span.citation_ids.includes(citations[0].id) && span.citation_ids.includes(citations[1].id))
  assert.ok(loaded.articles.find((article) => article.id === span.article_id)?.sections.includes(span.text))
}
const allowedResources = new Set(['src_79b5752c4d6f23e6dafc', 'src_3328fde7f743cd67dc9f', 'src_237f83bb42bf143fefdf', 'src_6995e894c8b7f13c8809', 'src_aa8bb730fbccdbf7d6e0'])
for (const row of [...loaded.concepts.filter((concept) => newConcepts.has(concept.id)), ...loaded.questions, ...loaded.citations]) for (const id of listValues(row.resource_ids ?? row.resource_id)) assert.ok(allowedResources.has(id), `${row.id} approved Helwan resource`)

for (const scanRoot of [resolve(base, 'question'), resolve(root, 'docs/import-ready/question'), resolve(root, 'docs/questions-import-ready')]) {
  const entries = await readdir(scanRoot, { recursive: true, withFileTypes: true }).catch(() => [])
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue
    const full = resolve(entry.parentPath ?? entry.path, entry.name)
    if (full === paths.questions) continue
    const text = await readFile(full, 'utf8')
    for (const question of loaded.questions) assert.ok(!text.includes(`## question\n${question.question}`), `${question.id} no exact-stem rival in ${full}`)
  }
}
for (const [kind, text] of Object.entries(raw)) assert.equal((text.match(/^## explanation$/gm) ?? []).length, 0, `${kind} no generic explanation`)
console.log(JSON.stringify({ counts: { questions: 12, concepts: 11, newConcepts: 7, conceptUpdates: 4, articles: 4, newArticles: 1, articleUpdates: 3, claims: 11, citations: 22, spans: 11, resources: 0 }, keys: keys.join(''), optionCounts: loaded.questions.map(() => 5), genericExplanationHeaders: 0, held: ['Q59 E/C', 'Q66 A/B', 'Q73 C/A plus text anomaly'], practical: 0, written: 0, media: 0 }, null, 2))
