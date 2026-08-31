#!/usr/bin/env node

import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const importRoot = resolve(root, 'docs/Helwan-Source-Imports')

const paths = {
  concepts: resolve(importRoot, 'concept/HU-LCS-103-family98-bone-physiology-concept-links.md'),
  articles: resolve(importRoot, 'article/HU-LCS-103-family98-bone-physiology-articles.md'),
  questions: resolve(importRoot, 'question/HU-LCS-103-family98-bone-physiology-mcq.md'),
  sources: resolve(importRoot, 'evidence/HU-LCS-103-family98-sources.md'),
  claims: resolve(importRoot, 'evidence/HU-LCS-103-family98-claims.md'),
  citations: resolve(importRoot, 'evidence/HU-LCS-103-family98-citations.md'),
  spans: resolve(importRoot, 'evidence/HU-LCS-103-family98-spans.md'),
}

const expectedCounts = { concepts: 7, articles: 2, questions: 10, sources: 2, claims: 7, citations: 7, spans: 7 }
const expectedKeys = ['D', 'C', 'A', 'C', 'B', 'C', 'C', 'A', 'C', 'A']

const parseItems = (text) => text.split(/\n\n---\n\n/).filter(Boolean).map((block) => {
  const fields = {}
  for (const match of block.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=\n\n## |$)/gm)) fields[match[1]] = match[2].trim()
  return fields
})

const loaded = {}
for (const [kind, path] of Object.entries(paths)) loaded[kind] = parseItems(await readFile(path, 'utf8'))

for (const [kind, expected] of Object.entries(expectedCounts)) assert.equal(loaded[kind].length, expected, `${kind} count`)
assert.deepEqual(loaded.questions.map((row) => row.correct_answer), expectedKeys, 'printed key sequence')
assert.equal(new Set(loaded.questions.map((row) => row.id)).size, 10, 'question IDs are unique')
assert.ok(loaded.questions.every((row) => row.status === 'Draft'), 'every question remains Draft')
assert.ok(loaded.articles.every((row) => row.status === 'Draft'), 'every article remains Draft')
assert.equal(loaded.questions.filter((row) => Object.hasOwn(row, 'explanation')).length, 0, 'generic explanation field is absent')
assert.equal(loaded.questions.reduce((sum, row) => sum + Object.keys(row).filter((key) => /^explanation_[a-f]$/.test(key)).length, 0), 60, 'six option-specific explanation fields per question')
assert.ok(loaded.questions.every((row) => row.resource_ids.includes('src_0a0fbd11416063bdc824')), 'every question cites the direct assessment source')
assert.ok(loaded.questions.every((row) => row.author_notes.includes('exact source')), 'every question records exact-source preservation')

console.log(JSON.stringify({ counts: expectedCounts, keys: expectedKeys.join(''), genericExplanationHeaders: 0, optionSpecificExplanationHeaders: 60 }, null, 2))
