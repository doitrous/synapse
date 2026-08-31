#!/usr/bin/env node

import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const questionPath = resolve(root, 'docs/Helwan-Source-Imports/question/HU-LCS-103-family99-q44-46-muscle-mcq.md')

const parseItems = (text) => text.split(/\n\n---\n\n/).filter(Boolean).map((block) => {
  const fields = {}
  for (const match of block.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=\n\n## |$)/gm)) fields[match[1]] = match[2].trim()
  return fields
})

const rows = parseItems(await readFile(questionPath, 'utf8'))
const expectedIds = [44, 45, 46].map((number) => `Q-HU-LCS103-PHY-F99-${number}`)
const expectedKeys = ['E', 'A', 'E']
const expectedStems = [
  'A cross-sectional view of a skeletal muscle fiber through the H zone would reveal the presence of what?',
  'Role of Ca2+ ions in excitation-contraction coupling:',
  'The striated muscles upon microscopic observation are:',
]
const expectedOptions = [
  ['actin and titin.', 'actin but no myosin.', 'actin, myosin, and titin.', 'myosin and actin.', 'myosin but no actin.'],
  ['Binding of Ca2+ ions with troponin causes tropomyosin to move away, exposing the binding sites present on actin molecules.', 'Muscle relaxation occurs so long as Ca2+ ions combine with troponin.', 'Ca2+ ions make tropomyosin move and cover the binding sites on actin.', 'Binding of Ca2+ ions with myosin heads leads to cross-bridge cycling.', 'Propagation of action potential leads to release of Ca2+ ions from tubules.'],
  ['Cardiac and smooth muscles.', 'Smooth muscle only.', 'Smooth and skeletal muscles.', 'Skeletal muscles only.', 'Skeletal and cardiac muscles.'],
]
const expectedConcepts = ['CON-MSK-0824FE988ADA00', 'CON-MSK-3013AA61E917B7', 'CON-MSK-B080975D6171CF']
const expectedArticles = [
  'ART-HU-LCS103-PHY-F99-Q33-43-MYOFIBRIL-CONTRACTION',
  'ART-HU-LCS103-PHY-F99-Q33-43-NMJ-COUPLING',
  'ART-HU-LCS103-PHY-MUSCLE-TYPES-PROPERTIES',
]

assert.equal(rows.length, 3, 'question count')
assert.deepEqual(rows.map((row) => row.id), expectedIds, 'contiguous Q44–Q46 IDs')
assert.deepEqual(rows.map((row) => row.correct_answer), expectedKeys, 'printed key sequence')
assert.deepEqual(rows.map((row) => row.question), expectedStems, 'exact printed stems')
assert.deepEqual(rows.map((row) => ['a', 'b', 'c', 'd', 'e'].map((letter) => row[`answer_${letter}`])), expectedOptions, 'exact printed options and order')
assert.deepEqual(rows.map((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).length), [5, 5, 5], 'exact printed option counts')
assert.deepEqual(rows.map((row) => row.main_concept), expectedConcepts, 'reconciled concept IDs')
assert.deepEqual(rows.map((row) => row.library_ids), expectedArticles, 'existing article dependencies')
assert.ok(rows.every((row) => row.status === 'Draft'), 'all questions remain Draft')
assert.equal(rows.filter((row) => Object.hasOwn(row, 'explanation')).length, 0, 'generic explanation field absent')
assert.equal(rows.reduce((sum, row) => sum + Object.keys(row).filter((key) => /^explanation_[a-f]$/.test(key)).length, 0), 18, 'six option-specific explanation fields per question')
assert.ok(rows.every((row) => row.resource_ids.includes('src_fad2f5ab18e1efa59eb1')), 'every question cites Family99')
assert.ok(rows.every((row) => /No exact wording\/option-set repeat occurs inside Q44–Q46/.test(row.author_notes)), 'all printed occurrences retained without false collapse')

console.log(JSON.stringify({ questions: 3, keys: expectedKeys.join(''), optionCounts: [5, 5, 5], genericExplanationHeaders: 0, optionSpecificExplanationHeaders: 18, exactWithinSliceRepeats: 0 }, null, 2))
