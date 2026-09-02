#!/usr/bin/env node

import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const files = {
  concepts: resolve(base, 'concept/HU-LCS-103-family163-q74-77-concepts.md'),
  articles: resolve(base, 'article/HU-LCS-103-family163-q74-77-articles.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family163-q74-77-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family163-q74-77-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family163-q74-77-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family163-q74-77-mcq.md'),
}
const parseItems = (text) => text.split(/\n\n---\n\n/).filter(Boolean).map((block) => Object.fromEntries(
  [...block.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=\n(?:\n)?## |(?![\s\S]))/gm)].map((match) => [match[1], match[2].trim()]),
))
const loaded = Object.fromEntries(await Promise.all(Object.entries(files).map(async ([kind, path]) => [kind, parseItems(await readFile(path, 'utf8'))])))
const fail = (message) => { throw new Error(message) }
const assert = (condition, message) => { if (!condition) fail(message) }
const hash = (values) => createHash('sha256').update(values.join('\n')).digest('hex')

assert(loaded.questions.length === 3, 'three questions')
assert(loaded.concepts.length === 2, 'two concept updates')
assert(loaded.articles.length === 1, 'one article update')
assert(loaded.claims.length === 2 && loaded.citations.length === 4 && loaded.spans.length === 2, '2/4/2 evidence')
assert(loaded.questions.map((row) => row.id).join('|') === 'Q-HU-LCS103-MSK-F163-74|Q-HU-LCS103-MSK-F163-76|Q-HU-LCS103-MSK-F163-77', 'approved question ids')
assert(loaded.questions.map((row) => row.correct_answer).join('') === 'CBE', 'locked keys CBE')
assert(loaded.questions.every((row) => ['answer_a', 'answer_b', 'answer_c', 'answer_d', 'answer_e'].every((key) => row[key]) && !row.answer_f), 'five literal options each')
assert(loaded.questions.every((row) => row.status === 'Draft'), 'all questions Draft')
assert(loaded.questions.every((row) => !Object.hasOwn(row, 'explanation')), 'no generic explanation field')
assert(loaded.questions.every((row) => ['a', 'b', 'c', 'd', 'e'].every((letter) => (row[`explanation_${letter}`] ?? '').length >= 200 && (row[`explanation_${letter}`].match(/[.!?](?:\s|$)/g) ?? []).length >= 3)), 'all option explanations substantive')

const expectedHashes = new Map([
  ['Q-HU-LCS103-MSK-F163-74', '5cd07f255438f172318f0509982b319e389eeb0ac47d3187ae17429ed6fea011'],
  ['Q-HU-LCS103-MSK-F163-76', 'b7ba762424100ad3c58a637d0c085efc0da57504086a4d0cbeb7cec5969fbdf9'],
  ['Q-HU-LCS103-MSK-F163-77', '509eaaac35c7900e516831351772f9c02eb0294bb20f66157cace336e3231b9d'],
])
for (const row of loaded.questions) assert(hash([row.question, row.answer_a, row.answer_b, row.answer_c, row.answer_d, row.answer_e]) === expectedHashes.get(row.id), `${row.id} literal stem/option hash`)

const ids = new Set(loaded.concepts.map((row) => row.id))
assert(ids.size === 2 && ids.has('CON-MSK-B26274E881BA5A') && ids.has('CON-MSK-319E7EB6D0E26A'), 'exact concept updates')
assert(loaded.concepts.every((row) => row.article_ids.split('\n').includes('ART-HU-LCS103-PAT-F163-TUMOUR-PATTERNS') && row.related_article_ids.split('\n').includes('ART-HU-LCS103-PAT-F163-TUMOUR-PATTERNS')), 'reciprocal concept/article links')
assert(loaded.articles[0].id === 'ART-HU-LCS103-PAT-F163-TUMOUR-PATTERNS', 'exact article update')
assert(['CON-MSK-B26274E881BA5A', 'CON-MSK-319E7EB6D0E26A'].every((id) => loaded.articles[0].related_concepts.split('\n').includes(id)), 'article reciprocal concepts')
assert(/Q75 is excluded: formal key B conflicts with red handwritten D/.test(loaded.articles[0].conflicts), 'Q75 conflict hold')
assert(loaded.questions.every((row) => /Q75 remains held because formal key B conflicts with red handwritten D/.test(row.author_notes)), 'Q75 hold in every question')
assert(loaded.questions.every((row) => row.resource_ids === 'src_79b5752c4d6f23e6dafc\nsrc_3328fde7f743cd67dc9f'), 'approved resources only')
assert(loaded.citations.every((row) => ['src_79b5752c4d6f23e6dafc', 'src_3328fde7f743cd67dc9f'].includes(row.resource_id)), 'citation resources governed')
assert(!Object.values(loaded).flat().some((row) => JSON.stringify(row).includes('Q-HU-LCS103-MSK-F163-75')), 'no Q75 content record')

console.log(JSON.stringify({ counts: { questions: 3, concepts: 2, articles: 1, claims: 2, citations: 4, spans: 2, resources: 0 }, keys: 'CBE', optionCounts: loaded.questions.map(() => 5), genericExplanationHeaders: 0, held: ['Q75 B/D plus right/left contradiction'], boundary: 'Q77' }, null, 2))
