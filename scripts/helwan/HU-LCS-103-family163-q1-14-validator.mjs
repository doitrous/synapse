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
  concepts: resolve(base, 'concept/HU-LCS-103-family163-q1-14-concepts.md'),
  articles: resolve(base, 'article/HU-LCS-103-family163-q1-14-articles.md'),
  sources: resolve(base, 'evidence/HU-LCS-103-family163-q1-14-sources.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family163-q1-14-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family163-q1-14-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family163-q1-14-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family163-q1-14-mcq.md'),
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

const questionNumbers = [1, 2, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14]
const expectedKeys = 'BEDBABABBDBC'.split('')
const expectedIds = questionNumbers.map((number) => `Q-HU-LCS103-MSK-F163-${String(number).padStart(2, '0')}`)
const expectedHashes = [
  '28f327618e9a76d498b8c461cdee3898d55a9d6b28d7bcce75c559190d458b88',
  '5702a1b19afcc2d97f71799c1a86a6c24185dab1f833610661e8f0ca2bb10e74',
  'a717da68dcdf920f3564b25f04ea234ef7a64e01bfa06ac691094416f38fd8b6',
  '16a618830f6afb1ba010c1b712d0614f55c23b8a3d119b5fb5bc6bfcd52f864f',
  '06736a4ea01eac5b2fe5382047dcd6bb0be98fd54556fffa9fe76441531dc738',
  '768d5d7df3ab3ce3413c668c5967732ceab2fae3183667c40d7230f845428a13',
  'a4483ebc99afe4e487d07485fbcf423a2f496f99e13546765b51a1abd77c631c',
  '182493e0ad1bc581d3173a558cc6b008b532302b645490a02227aff37fc53420',
  '9c59df18a7d44ff0909ab0379a768e7b58bb620c0aaaac53d3ffc423d4954b30',
  'cbbafec52547f6dd544c46ab37939d553d9795342c9e33581b2df3a71080f660',
  'da7b4553805b71d71e02b98a8c8e8a2b6f14119ed3f4ab288aee7ff48d7237ed',
  '852759a96eeaf0fba6f0742e7fc391451be4012b3dda98dc820fe75e21f17169',
]
const questionHashes = loaded.questions.map((row) => createHash('sha256').update(JSON.stringify([row.question, ...'abcde'.split('').map((letter) => row[`answer_${letter}`])])).digest('hex'))
assert.equal(loaded.questions.length, 12, 'exactly 12 importer-valid occurrences')
assert.deepEqual(loaded.questions.map((row) => row.id), expectedIds, 'exact source-number-preserving IDs')
assert.deepEqual(loaded.questions.map((row) => row.correct_answer), expectedKeys, 'exact agreeing source keys')
assert.equal(expectedKeys.join(''), 'BEDBABABBDBC', 'locked key literal')
assert.deepEqual(questionHashes, expectedHashes, 'exact source stems and five literal options')
assert.ok(loaded.questions.every((row) => ['a', 'b', 'c', 'd', 'e'].every((letter) => row[`answer_${letter}`] !== '')), 'five literal options each')
assert.ok(loaded.questions.every((row) => row.answer_f === ''), 'no invented sixth option')
assert.ok(loaded.questions.every((row) => row.status === 'Draft'), 'all questions remain Draft')
assert.ok(loaded.questions.every((row) => Object.keys(row).length >= 46), 'questions meet field minimum')
assert.equal(loaded.questions.filter((row) => Object.hasOwn(row, 'explanation')).length, 0, 'generic explanation field absent')
assert.equal(loaded.questions.reduce((sum, row) => sum + Object.keys(row).filter((key) => /^explanation_[a-f]$/.test(key)).length, 0), 72, 'six option-specific explanation headers per question')
const explanations = loaded.questions.flatMap((row) => 'abcde'.split('').map((letter) => row[`explanation_${letter}`]))
assert.equal(explanations.length, 60, 'five active explanations per question')
assert.ok(explanations.every((text) => text.length >= 200), 'every active explanation is at least 200 characters')
assert.ok(explanations.every((text) => (text.match(/[.!?](?=\s|$)/g) ?? []).length >= 3), 'every active explanation has at least three sentences')
assert.ok(loaded.questions.every((row) => /Q3 remains held at formal A\/red E/.test(row.author_notes)), 'Q3 conflict hold repeated')
assert.ok(loaded.questions.every((row) => /Q9 remains held at formal B\/red D/.test(row.author_notes)), 'Q9 conflict hold repeated')
assert.ok(!raw.questions.includes('Q-HU-LCS103-MSK-F163-03') && !raw.questions.includes('Q-HU-LCS103-MSK-F163-09'), 'held questions are absent')
assert.match(loaded.questions[0].author_notes, /more than 2 standard deviations.*2\.5-SD threshold/i, 'Q1 threshold risk')
assert.match(loaded.questions[1].author_notes, /nonunion is multifactorial/i, 'Q2 risk')
assert.match(loaded.questions[4].answer_a, /radiolucent core/, 'Q6 literal core wording')
assert.match(loaded.questions[6].author_notes, /no disc level.*underspecified/i, 'Q8 underspecification risk')
assert.match(loaded.questions[11].answer_c, /beta 2 macroglobulin/, 'Q14 literal source spelling')

const conceptIds = [
  'CON-MSK-89674D65B2316B', 'CON-MSK-E0806FEAA648F8', 'CON-FND-2B59FDDFCEDFA6', 'CON-MSK-3AD186B4605AF2',
  'CON-DER-78AF0815FE7330', 'CON-MSK-FA490E0113A07D', 'CON-MSK-4ABB70C236E69B', 'CON-MSK-4784E7374A0B6B',
  'CON-MSK-9C7E37FE296254', 'CON-MSK-A1148497BD0DB2', 'CON-MSK-D11FA83681C5C6',
]
const newIds = ['CON-MSK-E0806FEAA648F8', 'CON-MSK-FA490E0113A07D', 'CON-MSK-4ABB70C236E69B', 'CON-MSK-4784E7374A0B6B', 'CON-MSK-D11FA83681C5C6']
assert.equal(loaded.concepts.length, 11, 'six updates plus five first materializations')
assert.deepEqual(loaded.concepts.map((row) => row.id), conceptIds, 'approved concept IDs in approved order')
assert.ok(loaded.concepts.every((row) => row.status === 'under review' && row.publication_status === 'needs_evidence'), 'concept records remain pre-publication')
assert.ok(loaded.concepts.every((row) => Object.keys(row).length >= 50), 'concept records meet field minimum')
assert.equal(loaded.concepts.filter((row) => newIds.includes(row.id)).length, 5, 'only five proven exact-scope materializations')
const q1 = loaded.concepts[0]
assert.equal(q1.canonical_key, 'bone.matrix.organic-inorganic-composition', 'Q1 keeps exact existing canonical key')
assert.match(q1.article_ids, /ART-103-HIS-BONE-MATRIX-CLASSIFICATION/, 'Q1 retains prior article')
assert.match(q1.article_ids, /ART-HU-LCS103-MSK-F163-FRAGILITY-HEALING/, 'Q1 adds reciprocal article')
const disc = loaded.concepts.find((row) => row.id === 'CON-MSK-9C7E37FE296254')
assert.match(disc.article_ids, /ART-103-HIS-CARTILAGE-TYPES/, 'disc retains prior article')
assert.match(disc.article_ids, /ART-HU-LCS103-MSK-F163-DISC-COMPRESSION/, 'disc adds reciprocal article')
const fibro = loaded.concepts.find((row) => row.id === 'CON-DER-78AF0815FE7330')
assert.equal(fibro.canonical_key, 'teaching.pathopractical.fibrosarcoma.herringbone', 'fibrosarcoma exact live key')
assert.match(fibro.article_ids, /ART-DER-TOP-070DD897F2/, 'fibrosarcoma retains live article')
assert.match(fibro.article_ids, /ART-HU-LCS103-PAT-F163-TUMOUR-PATTERNS/, 'fibrosarcoma adds reciprocal article')

const articleIds = ['ART-HU-LCS103-MSK-F163-FRAGILITY-HEALING', 'ART-HU-LCS103-PAT-F163-TUMOUR-PATTERNS', 'ART-HU-LCS103-MSK-F163-DISC-COMPRESSION']
assert.equal(loaded.articles.length, 3, 'three approved reciprocal articles')
assert.deepEqual(loaded.articles.map((row) => row.id), articleIds, 'exact article IDs')
assert.ok(loaded.articles.every((row) => row.status === 'Draft' && row.publication_gate === 'needs_evidence'), 'articles remain Draft')
assert.ok(loaded.articles.every((row) => Object.keys(row).length >= 49), 'articles meet field minimum')
for (const article of loaded.articles) {
  assert.ok(article.sections.length >= 1200, `${article.id} is substantive`)
  for (const qid of article.question_ids.split('\n').filter(Boolean)) assert.ok(expectedIds.includes(qid), `${article.id} links only approved question IDs`)
}

assert.equal(loaded.sources.length, 3, 'one assessment and two new evidence-only teaching resources')
assert.deepEqual(loaded.sources.map((row) => row.id), ['src_79b5752c4d6f23e6dafc', 'src_718e08dfb6d19109dabf', 'src_252ae116a3911d2020a2'], 'exact source IDs')
assert.deepEqual(loaded.sources.map((row) => row.sha256), [
  '79b5752c4d6f23e6dafc8c360427669b1f654797c1a7bd0eb7ed9b084825cc1a',
  '718e08dfb6d19109dabfbcbe4ba9392092defe7f322e661d0e0aecee7763f53d',
  '252ae116a3911d2020a2d814ccf5ec639b698ca9ba0e05320c245f793f7982e6',
], 'exact source hashes')
assert.deepEqual(loaded.sources.map((row) => row.is_assessment), ['yes', 'no', 'no'], 'only Family163 is assessment evidence')

assert.equal(loaded.claims.length, 6, 'six article claims')
assert.equal(loaded.citations.length, 12, 'two citations per claim')
assert.equal(loaded.spans.length, 6, 'one article span per claim')
for (const claim of loaded.claims) {
  const claimCitations = loaded.citations.filter((row) => row.claim_id === claim.id)
  assert.equal(claimCitations.length, 2, `${claim.id} has assessment and teaching citations`)
  assert.equal(claimCitations[0].resource_id, 'src_79b5752c4d6f23e6dafc', `${claim.id} direct source first`)
  assert.ok(claimCitations.every((row) => row.counts_as_claim_evidence === 'no'), `${claim.id} local sources are not independent verification`)
  const span = loaded.spans.find((row) => row.claim_ids === claim.id)
  assert.ok(span, `${claim.id} has article span`)
  assert.ok(span.citation_ids.includes(claimCitations[0].id) && span.citation_ids.includes(claimCitations[1].id), `${claim.id} span links both citations`)
  const article = loaded.articles.find((row) => row.id === span.article_id)
  assert.ok(article.sections.includes(span.text), `${claim.id} span text exists verbatim in article`)
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
console.log(JSON.stringify({ counts: { concepts: 11, newConcepts: 5, conceptUpdates: 6, articles: 3, sources: 3, questions: 12, claims: 6, citations: 12, spans: 6 }, keys: expectedKeys.join(''), optionCounts: loaded.questions.map(() => 5), genericExplanationHeaders: 0, optionSpecificExplanationHeaders: 72, substantiveExplanations: 60, held: ['Q3 formal A/red E', 'Q9 formal B/red D'], practical: 0, written: 0, media: 0 }, null, 2))
