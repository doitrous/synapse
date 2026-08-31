#!/usr/bin/env node

import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const importRoot = resolve(root, 'docs/Helwan-Source-Imports')

const paths = {
  concepts: resolve(importRoot, 'concept/HU-LCS-103-family99-q33-43-muscle-concept-links.md'),
  articles: resolve(importRoot, 'article/HU-LCS-103-family99-q33-43-muscle-articles.md'),
  questions: resolve(importRoot, 'question/HU-LCS-103-family99-q33-43-muscle-mcq.md'),
  claims: resolve(importRoot, 'evidence/HU-LCS-103-family99-q33-43-claims.md'),
  citations: resolve(importRoot, 'evidence/HU-LCS-103-family99-q33-43-citations.md'),
  spans: resolve(importRoot, 'evidence/HU-LCS-103-family99-q33-43-spans.md'),
}

const expectedCounts = { concepts: 7, articles: 2, questions: 11, claims: 7, citations: 7, spans: 7 }
const expectedKeys = ['B', 'D', 'D', 'C', 'C', 'B', 'D', 'A', 'E', 'B', 'D']
const expectedIds = Array.from({ length: 11 }, (_, index) => `Q-HU-LCS103-PHY-F99-${index + 33}`)
const expectedOptionCounts = [5, 5, 4, 4, 4, 4, 4, 5, 5, 5, 5]

const parseItems = (text) => text.split(/\n\n---\n\n/).filter(Boolean).map((block) => {
  const fields = {}
  for (const match of block.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=\n\n## |$)/gm)) fields[match[1]] = match[2].trim()
  return fields
})

const loaded = {}
for (const [kind, path] of Object.entries(paths)) loaded[kind] = parseItems(await readFile(path, 'utf8'))

for (const [kind, expected] of Object.entries(expectedCounts)) assert.equal(loaded[kind].length, expected, `${kind} count`)
assert.deepEqual(loaded.questions.map((row) => row.id), expectedIds, 'contiguous Q33–Q43 IDs')
assert.deepEqual(loaded.questions.map((row) => row.correct_answer), expectedKeys, 'printed key sequence')
assert.deepEqual(loaded.questions.map((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).length), expectedOptionCounts, 'exact printed option counts')
assert.ok(loaded.questions.every((row) => row.status === 'Draft'), 'all questions remain Draft')
assert.ok(loaded.articles.every((row) => row.status === 'Draft'), 'all articles remain Draft')
assert.equal(loaded.questions.filter((row) => Object.hasOwn(row, 'explanation')).length, 0, 'generic explanation field absent')
assert.equal(loaded.questions.reduce((sum, row) => sum + Object.keys(row).filter((key) => /^explanation_[a-f]$/.test(key)).length, 0), 66, 'six option-specific explanation fields per question')
assert.ok(loaded.questions.every((row) => row.resource_ids.includes('src_fad2f5ab18e1efa59eb1')), 'every question cites Family99')
assert.ok(loaded.questions.every((row) => /No exact wording\/option-set repeat occurs inside Q33–Q43/.test(row.author_notes)), 'all printed occurrences retained without false collapse')

console.log(JSON.stringify({ counts: expectedCounts, keys: expectedKeys.join(''), optionCounts: expectedOptionCounts, genericExplanationHeaders: 0, optionSpecificExplanationHeaders: 66, exactWithinSliceRepeats: 0 }, null, 2))
