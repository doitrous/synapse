#!/usr/bin/env node

import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const importRoot = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  concepts: resolve(importRoot, 'concept/HU-LCS-103-family99-q1-10-length-tension-concept-link.md'),
  articles: resolve(importRoot, 'article/HU-LCS-103-family99-q1-10-length-tension-article.md'),
  questions: resolve(importRoot, 'question/HU-LCS-103-family99-q1-10-muscle-mcq.md'),
  claims: resolve(importRoot, 'evidence/HU-LCS-103-family99-q1-10-length-tension-claims.md'),
  citations: resolve(importRoot, 'evidence/HU-LCS-103-family99-q1-10-length-tension-citations.md'),
  spans: resolve(importRoot, 'evidence/HU-LCS-103-family99-q1-10-length-tension-spans.md'),
}

const parseItems = (text) => text.split(/\n\n---\n\n/).filter(Boolean).map((block) => {
  const fields = {}
  for (const match of block.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=\n\n## |$)/gm)) fields[match[1]] = match[2].trim()
  return fields
})

const loaded = {}
for (const [kind, path] of Object.entries(paths)) loaded[kind] = parseItems(await readFile(path, 'utf8'))
const rows = loaded.questions
const lengthArticle = 'ART-HU-LCS103-PHY-F99-Q1-10-LENGTH-TENSION'
const expectedIds = [1, 2, 4, 8, 10].map((number) => `Q-HU-LCS103-PHY-F99-${number}`)
const expectedKeys = ['D', 'B', 'B', 'B', 'C']
const expectedOptionCounts = [4, 4, 4, 4, 4]
const expectedStems = [
  'In isometric contraction:',
  'A healthy 22-year-old person lifts weights as a part of his regular his biceps muscle contracts isotonically. Which one of the following does not change its length in this process when compared to when the muscle is at rest?',
  'Muscles that are involuntary in action are:',
  'Skeletal muscle:',
  'The function of T-tubules is to:',
]
const expectedOptions = [
  ['There is change in muscle length.', 'Mechanical efficiency is about 25%.', 'Can occur for long duration.', 'Usually occurs during standing to maintain body posture'],
  ['I band.', 'A band.', 'H zone.', 'Sarcomere.'],
  ['Smooth and skeletal muscles.', 'Cardiac and smooth muscles.', 'Skeletal and cardiac muscles.', 'Skeletal muscles.'],
  ['Contracts when Ca2+ is taken up by Sarcoplasmic reticulum.', 'Contraction strength is related to initial length.', 'Contract spontaneously.', 'Actin and myosin filaments shorten when it contracts.'],
  ['Move extracellular fluid into the sarcolemma.', 'Dampen the spread of the action potential.', 'Allow for rapid spread of the action potential', 'Increase extracellular Ca2+ concentrations.'],
]
const expectedConcepts = [
  'CON-MSK-87D5C5A48AB5D9',
  'CON-MSK-0824FE988ADA00',
  'CON-MSK-B080975D6171CF',
  'CON-MSK-01E9132FDDF9F2',
  'CON-MSK-3013AA61E917B7',
]
const expectedArticles = [
  'ART-HU-LCS103-PHY-MUSCLE-STRUCTURE-COUPLING',
  'ART-HU-LCS103-PHY-MUSCLE-STRUCTURE-COUPLING',
  'ART-HU-LCS103-PHY-MUSCLE-TYPES-PROPERTIES',
  lengthArticle,
  'ART-HU-LCS103-PHY-MUSCLE-STRUCTURE-COUPLING',
]

assert.equal(rows.length, 5, 'importer-valid question count')
assert.equal(loaded.concepts.length, 1, 'reciprocal concept-link count')
assert.equal(loaded.articles.length, 1, 'article count')
assert.equal(loaded.claims.length, 1, 'claim count')
assert.equal(loaded.citations.length, 1, 'citation count')
assert.equal(loaded.spans.length, 1, 'span count')
assert.deepEqual(rows.map((row) => row.id), expectedIds, 'exact importer-valid IDs from Q1–Q10')
assert.deepEqual(rows.map((row) => row.correct_answer), expectedKeys, 'printed key sequence')
assert.deepEqual(rows.map((row) => row.question), expectedStems, 'exact printed stems')
assert.deepEqual(rows.map((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).length), expectedOptionCounts, 'exact printed option counts')
assert.deepEqual(rows.map((row) => ['a', 'b', 'c', 'd'].filter((letter) => row[`answer_${letter}`]).map((letter) => row[`answer_${letter}`])), expectedOptions, 'exact printed options and order')
assert.deepEqual(rows.map((row) => row.main_concept), expectedConcepts, 'reconciled concept IDs')
assert.deepEqual(rows.map((row) => row.library_ids), expectedArticles, 'existing article dependencies')
assert.ok(rows.every((row) => row.status === 'Draft'), 'all questions remain Draft')
assert.equal(rows.filter((row) => Object.hasOwn(row, 'explanation')).length, 0, 'generic explanation field absent')
assert.equal(rows.reduce((sum, row) => sum + Object.keys(row).filter((key) => /^explanation_[a-f]$/.test(key)).length, 0), 30, 'six option-specific explanation fields per question')
assert.ok(rows.every((row) => row.resource_ids.includes('src_fad2f5ab18e1efa59eb1')), 'every question cites Family99')
assert.ok(rows.every((row) => /No exact wording\/option-set repeat occurs inside Q1–Q10/.test(row.author_notes)), 'all printed occurrences retained without false collapse')
assert.ok(rows.every((row) => /Q3, Q5, Q6, Q7 and Q9 each print only three options/.test(row.author_notes)), 'three-option source holds are explicit')
assert.equal(loaded.concepts[0].id, 'CON-MSK-01E9132FDDF9F2', 'existing length–tension concept reused')
assert.equal(loaded.concepts[0].article_ids, `+${lengthArticle}`, 'concept links reciprocally to owned article')
assert.equal(loaded.articles[0].id, lengthArticle, 'owned article ID')
assert.equal(loaded.articles[0].status, 'Draft', 'article remains Draft')
assert.match(loaded.articles[0].related_concepts, /CON-MSK-01E9132FDDF9F2/, 'article links reciprocally to concept')
assert.match(loaded.articles[0].question_ids, /Q-HU-LCS103-PHY-F99-8/, 'article links to Q8')
assert.match(loaded.articles[0].callout_evidence, /^### Initial sarcomere length determines thick–thin filament overlap\./, 'callout names an exact Hold these line')
assert.equal(loaded.claims[0].id, 'CLM-HULCS103-F99-Q110-LENGTH-TENSION-01', 'claim ID')
assert.equal(loaded.citations[0].claim_id, loaded.claims[0].id, 'citation links to claim')
assert.equal(loaded.spans[0].article_id, lengthArticle, 'span links to article')
assert.equal(loaded.spans[0].claim_ids, loaded.claims[0].id, 'span links to claim')
assert.equal(loaded.spans[0].citation_ids, loaded.citations[0].id, 'span links to citation')

console.log(JSON.stringify({ counts: { concepts: 1, articles: 1, questions: 5, claims: 1, citations: 1, spans: 1 }, keys: expectedKeys.join(''), optionCounts: expectedOptionCounts, genericExplanationHeaders: 0, optionSpecificExplanationHeaders: 30, heldThreeOptionRecords: ['Q3', 'Q5', 'Q6', 'Q7', 'Q9'], exactWithinSliceRepeats: 0 }, null, 2))
