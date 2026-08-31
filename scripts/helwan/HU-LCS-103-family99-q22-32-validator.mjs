#!/usr/bin/env node

import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const importRoot = resolve(root, 'docs/Helwan-Source-Imports')

const paths = {
  concepts: resolve(importRoot, 'concept/HU-LCS-103-family99-q22-32-muscle-concept-links.md'),
  articles: resolve(importRoot, 'article/HU-LCS-103-family99-q22-32-muscle-articles.md'),
  questions: resolve(importRoot, 'question/HU-LCS-103-family99-q22-32-muscle-mcq.md'),
  sources: resolve(importRoot, 'evidence/HU-LCS-103-family99-q22-32-sources.md'),
  claims: resolve(importRoot, 'evidence/HU-LCS-103-family99-q22-32-claims.md'),
  citations: resolve(importRoot, 'evidence/HU-LCS-103-family99-q22-32-citations.md'),
  spans: resolve(importRoot, 'evidence/HU-LCS-103-family99-q22-32-spans.md'),
}

const expectedCounts = { concepts: 5, articles: 2, questions: 11, sources: 2, claims: 5, citations: 5, spans: 5 }
const expectedKeys = ['B', 'A', 'A', 'B', 'C', 'B', 'D', 'D', 'E', 'B', 'E']
const expectedIds = Array.from({ length: 11 }, (_, index) => `Q-HU-LCS103-PHY-F99-${index + 22}`)

const parseItems = (text) => text.split(/\n\n---\n\n/).filter(Boolean).map((block) => {
  const fields = {}
  for (const match of block.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=\n\n## |$)/gm)) fields[match[1]] = match[2].trim()
  return fields
})

const loaded = {}
for (const [kind, path] of Object.entries(paths)) loaded[kind] = parseItems(await readFile(path, 'utf8'))

for (const [kind, expected] of Object.entries(expectedCounts)) assert.equal(loaded[kind].length, expected, `${kind} count`)
assert.deepEqual(loaded.questions.map((row) => row.id), expectedIds, 'contiguous Q22–Q32 IDs')
assert.deepEqual(loaded.questions.map((row) => row.correct_answer), expectedKeys, 'printed key sequence')
assert.ok(loaded.questions.every((row) => row.status === 'Draft'), 'all questions remain Draft')
assert.ok(loaded.articles.every((row) => row.status === 'Draft'), 'all articles remain Draft')
assert.equal(loaded.questions.filter((row) => Object.hasOwn(row, 'explanation')).length, 0, 'generic explanation field absent')
assert.equal(loaded.questions.reduce((sum, row) => sum + Object.keys(row).filter((key) => /^explanation_[a-f]$/.test(key)).length, 0), 66, 'six option-specific explanation fields per question')
assert.match(loaded.questions.find((row) => row.id.endsWith('-31')).author_notes, /repeat of printed Q22/, 'Q22/Q31 repeat is explicit')
assert.match(loaded.questions.find((row) => row.id.endsWith('-32')).author_notes, /repeat of printed Q23/, 'Q23/Q32 repeat is explicit')
assert.ok(loaded.questions.every((row) => row.resource_ids.includes('src_fad2f5ab18e1efa59eb1')), 'every question cites Family99')

console.log(JSON.stringify({ counts: expectedCounts, keys: expectedKeys.join(''), genericExplanationHeaders: 0, optionSpecificExplanationHeaders: 66, repeats: ['Q22/Q31', 'Q23/Q32'] }, null, 2))
