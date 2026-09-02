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
  concepts: resolve(base, 'concept/HU-LCS-103-family163-q15-28-concepts.md'),
  articles: resolve(base, 'article/HU-LCS-103-family163-q15-28-articles.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family163-q15-28-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family163-q15-28-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family163-q15-28-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family163-q15-28-mcq.md'),
}
const parseItems = (text) => text.split(/\n\n---\n\n/).filter(Boolean).map((block) => {
  const fields = {}
  for (const match of block.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=\n\n## |(?![\s\S]))/gm)) fields[match[1]] = match[2].trim()
  return fields
})
const raw = {}
const loaded = {}
for (const [kind, path] of Object.entries(paths)) {
  raw[kind] = await readFile(path, 'utf8').catch(() => '')
  assert.notEqual(raw[kind], '', `${kind} file must exist`)
  loaded[kind] = parseItems(raw[kind])
}

const questionNumbers = [15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28]
const expectedKeys = 'BEADACEDBBBBE'.split('')
const expectedIds = questionNumbers.map((number) => `Q-HU-LCS103-MSK-F163-${String(number).padStart(2, '0')}`)
const expectedHashes = [
  '8bc62bdf24fdd7fced865a440e1d5d41a942a4fa02427859af6bcf900b290005',
  'e62addc1e92e6021d2126985b41c5c6ee79798cf35c57599262d5c60e8aad3c6',
  'df1a24ad257679fe08332118736d2c2076779c0f7e8e3c929fe26546ebf2abc7',
  '086049bac0ad2bdddc47beb1aeb0eeb700746d01154ac8d8275c09b97363c3c2',
  '1ba25c56b3a8b749402ecf541f42991e24cfed546b848fa96920636b7cebad5f',
  '7cb1e1f2ea8794ea391ee7366a3b07331f95c79b3cfd310c2e6b4ab6ad877301',
  '991b61fe287a558816c7b16d4968a2df7dd19666f3e706b382612b1968dcb232',
  '9cbd37b24166161e866865ce77ee158cb7c4c11d1b7de0cc6696ad9fc3395d95',
  'e238d5f58f1e2a9c5ce860c64ba2c3ffb10efba512e14e14a14add97db062abf',
  '0c494d758edaddd00c0acae85ab33b1bacc11f09e001edd37b7236a891a5743b',
  '118221fb5d6eaee40c547203bfbf767241e25c6e64903ac741a7ed26fa3d352a',
  '67acfd45fcac6b12d4f9749123be03d335e1dbd071ee88eee509672ae6a52fc3',
  'dd5c2ed774d4024c5e063650cf25deb2228ae1ab94800672875201a9619736fa',
]
const hashes = loaded.questions.map((row) => createHash('sha256').update(JSON.stringify([row.question, ...'abcde'.split('').map((letter) => row[`answer_${letter}`])])).digest('hex'))
assert.equal(loaded.questions.length, 13, 'exactly thirteen approved occurrences')
assert.deepEqual(loaded.questions.map((row) => row.id), expectedIds, 'source-number-preserving IDs')
assert.deepEqual(loaded.questions.map((row) => row.correct_answer), expectedKeys, 'exact agreeing keys')
assert.deepEqual(hashes, expectedHashes, 'exact source stems and options')
assert.ok(loaded.questions.every((row) => 'abcde'.split('').every((letter) => row[`answer_${letter}`] !== '')), 'five literal options each')
assert.ok(loaded.questions.every((row) => row.answer_f === ''), 'no invented sixth option')
assert.ok(loaded.questions.every((row) => row.status === 'Draft'), 'all questions remain Draft')
assert.ok(loaded.questions.every((row) => Object.keys(row).length >= 46), 'question field minimum')
assert.equal(loaded.questions.filter((row) => Object.hasOwn(row, 'explanation')).length, 0, 'no generic explanation field')
assert.equal(loaded.questions.reduce((sum, row) => sum + Object.keys(row).filter((key) => /^explanation_[a-f]$/.test(key)).length, 0), 78, 'six option-specific explanation headers each')
const explanations = loaded.questions.flatMap((row) => 'abcde'.split('').map((letter) => row[`explanation_${letter}`]))
assert.equal(explanations.length, 65, 'five active explanations each')
assert.ok(explanations.every((text) => text.length >= 200), 'every active explanation is at least 200 characters')
assert.ok(explanations.every((text) => (text.match(/[.!?](?=\s|$)/g) ?? []).length >= 3), 'every active explanation has at least three sentences')
assert.ok(loaded.questions.every((row) => /Q20 remains held.*formal key prints C.*red answer layer prints A/.test(row.author_notes)), 'Q20 conflict hold repeated')
assert.ok(!raw.questions.includes('Q-HU-LCS103-MSK-F163-20'), 'Q20 is absent')
assert.match(loaded.questions[0].author_notes, /confirmatory diagnosis.*MRI finding/, 'Q15 risk')
assert.match(loaded.questions[3].author_notes, /leukemia association.*direct assessment/i, 'Q18 limitation')
assert.match(loaded.questions[6].answer_b, /micro gm\/dL/, 'Q22 exact unit')
assert.match(loaded.questions[7].question, /What is his diagnosis\?/, 'Q23 pronoun mismatch')
assert.match(loaded.questions[8].author_notes, /association set lacks independent Helwan/i, 'Q24 limitation')
assert.equal(loaded.questions[10].answer_b, 'Congestive heart failure', 'Q26 literal answer')
assert.match(loaded.questions[12].question, /with revealed mature lamellar bone/, 'Q28 literal grammar')

const conceptIds = [
  'CON-MSK-9C7E37FE296254', 'CON-HU-BMS101-OSTEOGENESIS-IMPERFECTA', 'CON-MSK-D43C90AFFD6024',
  'CON-REN-B9E0531973510E', 'CON-MSK-DDF3A03342A247', 'CON-FND-2B59FDDFCEDFA6',
  'CON-MSK-89674D65B2316B', 'CON-MSK-3B5E21D11A3B3B', 'CON-MSK-5AD256E28E4183',
  'CON-MSK-11E8FA53BC53C4', 'CON-MSK-4836A383AEA93E',
]
const newIds = ['CON-MSK-D43C90AFFD6024', 'CON-MSK-3B5E21D11A3B3B', 'CON-MSK-11E8FA53BC53C4']
assert.equal(loaded.concepts.length, 11, 'three new concepts plus eight safe updates')
assert.deepEqual(loaded.concepts.map((row) => row.id), conceptIds, 'approved concept IDs')
assert.equal(loaded.concepts.filter((row) => newIds.includes(row.id)).length, 3, 'exactly three new concepts')
assert.ok(loaded.concepts.every((row) => row.status === 'under review' && row.publication_status === 'needs_evidence'), 'concepts remain pre-publication')
assert.ok(loaded.concepts.every((row) => Object.keys(row).length >= 50), 'concept field minimum')
assert.equal(loaded.concepts.find((row) => row.id === newIds[0]).canonical_key, 'postmenopausal-high-turnover-osteoporosis', 'high-turnover canonical key')
assert.equal(loaded.concepts.find((row) => row.id === newIds[1]).canonical_key, 'carpal-tunnel-associated-conditions-exception', 'carpal canonical key')
assert.equal(loaded.concepts.find((row) => row.id === newIds[2]).canonical_key, 'paget-disease-cardiac-and-joint-complications', 'Paget canonical key')
const allowedResources = new Set(['src_79b5752c4d6f23e6dafc', 'src_252ae116a3911d2020a2', 'src_aa8bb730fbccdbf7d6e0', 'src_718e08dfb6d19109dabf', 'src_6995e894c8b7f13c8809', 'src_3328fde7f743cd67dc9f'])
for (const row of [...loaded.concepts, ...loaded.articles, ...loaded.questions]) for (const id of row.resource_ids.split('\n').filter(Boolean)) assert.ok(allowedResources.has(id), `${row.id} uses only approved Helwan resources`)
assert.ok(!Object.values(raw).join('\n').includes('src_fed'), 'no cross-corpus formal resource')

const articleIds = [
  'ART-HU-LCS103-MSK-F163-DISC-COMPRESSION', 'ART-HU-LCS103-PAT-F163-TUMOUR-PATTERNS',
  'ART-HU-LCS103-MSK-F163-SYSTEMIC-BONE-DISEASES', 'ART-HU-LCS103-MSK-F163-GOUT-OA-CARPAL-ASSOCIATIONS',
]
assert.equal(loaded.articles.length, 4, 'two updates and two new reciprocal articles')
assert.deepEqual(loaded.articles.map((row) => row.id), articleIds, 'exact article IDs')
assert.ok(loaded.articles.every((row) => row.status === 'Draft' && row.publication_gate === 'needs_evidence'), 'articles remain Draft')
assert.ok(loaded.articles.every((row) => Object.keys(row).length >= 49), 'article field minimum')
assert.ok(loaded.articles.every((row) => row.sections.length >= 1200), 'articles are substantive')
const disc = loaded.articles[0]
assert.match(disc.question_ids, /F163-08/, 'disc update retains Q8')
assert.match(disc.question_ids, /F163-12/, 'disc update retains Q12')
assert.match(disc.question_ids, /F163-15/, 'disc update adds Q15')
const tumours = loaded.articles[1]
for (const id of ['F163-04', 'F163-05', 'F163-06', 'F163-07', 'F163-13', 'F163-14', 'F163-19', 'F163-21', 'F163-28']) assert.match(tumours.question_ids, new RegExp(id), `tumour update retains/adds ${id}`)

assert.equal(loaded.claims.length, 9, 'nine claims')
assert.equal(loaded.citations.length, 18, 'two citations per claim')
assert.equal(loaded.spans.length, 9, 'one span per claim')
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
console.log(JSON.stringify({ counts: { concepts: 11, newConcepts: 3, conceptUpdates: 8, articles: 4, newArticles: 2, articleUpdates: 2, resources: 0, questions: 13, claims: 9, citations: 18, spans: 9 }, keys: expectedKeys.join(''), optionCounts: loaded.questions.map(() => 5), genericExplanationHeaders: 0, optionSpecificExplanationHeaders: 78, substantiveExplanations: 65, held: ['Q20 formal C/red A'], practical: 0, written: 0, media: 0 }, null, 2))
