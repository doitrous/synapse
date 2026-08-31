#!/usr/bin/env node

import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  concepts: resolve(base, 'concept/HU-LCS-103-family144-q17-motor-unit-concept.md'),
  articles: resolve(base, 'article/HU-LCS-103-family144-q17-motor-unit-article.md'),
  sources: resolve(base, 'evidence/HU-LCS-103-family144-q17-sources.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family144-q17-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family144-q17-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family144-q17-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family144-q17-mcq.md'),
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
  assert.notEqual(raw[kind], '', `${kind} import must exist`)
  loaded[kind] = parseItems(raw[kind])
}

assert.equal(loaded.concepts.length, 1)
assert.equal(loaded.concepts[0].id, 'CON-MSK-C14F65CD68F720')
assert.equal(loaded.concepts[0].canonical_key, 'muscle.grading.motor-unit-recruitment-frequency-treppe')
assert.ok(Object.keys(loaded.concepts[0]).length >= 50)
assert.match(loaded.concepts[0].article_ids, /ART-HU-LCS103-PHY-F144-MOTOR-UNIT-ARITHMETIC/)

assert.equal(loaded.articles.length, 1)
assert.equal(loaded.articles[0].id, 'ART-HU-LCS103-PHY-F144-MOTOR-UNIT-ARITHMETIC')
assert.equal(loaded.articles[0].status, 'Draft')
assert.ok(Object.keys(loaded.articles[0]).length >= 49)
assert.equal(loaded.articles[0].question_ids, 'Q-HU-LCS103-PHY-F144-17')
assert.match(loaded.articles[0].notes, /all other 66.*remain held/i)

assert.equal(loaded.sources.length, 1)
assert.equal(loaded.sources[0].id, 'src_3cd2b338713b01fb5bf1')
assert.equal(loaded.sources[0].sha256, '3cd2b338713b01fb5bf1f95e2dc396daaf5ca4e66ec9be2d03e8d151111b9176')
assert.equal(loaded.sources[0].page_count, '39')
assert.match(loaded.sources[0].qualification, /all other 66.*held/i)

assert.equal(loaded.claims.length, 1)
assert.equal(loaded.citations.length, 2)
assert.equal(loaded.spans.length, 1)
assert.deepEqual(loaded.citations.map((row) => row.resource_id), ['src_3cd2b338713b01fb5bf1', 'src_262c1ba3765a9922e9d4'])
assert.ok(loaded.citations.every((row) => row.counts_as_claim_evidence === 'no'))
assert.equal(loaded.spans[0].claim_ids, loaded.claims[0].id)
assert.ok(loaded.spans[0].citation_ids.includes(loaded.citations[0].id) && loaded.spans[0].citation_ids.includes(loaded.citations[1].id))
assert.ok(loaded.articles[0].sections.includes(loaded.spans[0].text))

assert.equal(loaded.questions.length, 1)
const q = loaded.questions[0]
assert.equal(q.id, 'Q-HU-LCS103-PHY-F144-17')
assert.equal(q.status, 'Draft')
assert.equal(q.question, 'Suppose , a eye muscle is composed of 90 muscle fibers . What is the minimum number of motor units……………')
assert.equal(q.correct_answer, 'E')
assert.deepEqual(['a', 'b', 'c', 'd', 'e'].map((letter) => q[`answer_${letter}`]), ['90 motor units', '50 motor units', '45 motor units', '30 motor units', '15 motor units'])
assert.ok(Object.keys(q).length >= 46)
assert.equal(Object.hasOwn(q, 'explanation'), false)
assert.equal(Object.keys(q).filter((key) => /^explanation_[a-f]$/.test(key)).length, 6)
for (const letter of ['a', 'b', 'c', 'd', 'e']) {
  assert.ok(q[`explanation_${letter}`].length >= 200, `${letter} explanation length`)
  assert.ok((q[`explanation_${letter}`].match(/[.!?](?=\s|$)/g) ?? []).length >= 3, `${letter} explanation sentence count`)
}
assert.match(q.author_notes, /literal source wording.*`a eye`/i)
assert.match(q.author_notes, /red arrow.*not treated as a key/i)
assert.match(q.author_notes, /all other 66.*remain explicitly held/i)
for (const [kind, text] of Object.entries(raw)) assert.equal((text.match(/^## explanation$/gm) ?? []).length, 0, `${kind} has no generic explanation header`)

console.log(JSON.stringify({ counts: { conceptUpdates: 1, articles: 1, sources: 1, questions: 1, claims: 1, citations: 2, spans: 1 }, keys: 'E', optionCounts: [5], genericExplanationHeaders: 0, heldOccurrences: 66, practical: 0, written: 0, media: 0 }, null, 2))
