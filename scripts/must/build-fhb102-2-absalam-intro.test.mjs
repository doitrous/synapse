#!/usr/bin/env node

import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'

const root = resolve(import.meta.dirname, '../..')
const generator = resolve(root, 'scripts/must/build-fhb102-2-authoring-slice.mjs')

function read(relativePath) {
  return readFileSync(resolve(root, relativePath), 'utf8')
}

function items(markdown) {
  return markdown.split(/^# Item$/m).slice(1)
}

test('the approved Absalam introduction slice emits only seven clean Draft questions and eight ledger holds', () => {
  execFileSync(process.execPath, [generator], { cwd: root, stdio: 'pipe' })

  const questions = read('docs/MUST-Source-Imports/question/FHB-102-2-parasitology-introduction-mcq.md')
  const articles = read('docs/MUST-Source-Imports/article/FHB-102-2-parasitology-introduction-articles.md')
  const concepts = read('docs/MUST-Source-Imports/concept/FHB-102-2-parasitology-introduction-concepts.md')
  const claims = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-claims.md')
  const citations = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-citations.md')
  const spans = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-spans.md')
  const sources = read('docs/MUST-Source-Imports/evidence/FHB-102-2-parasitology-introduction-sources.md')
  const coverage = read('docs/MUST-Source-Imports/coverage/FHB-102-2-AUTHORING.md')

  assert.equal(items(questions).length, 7)
  assert.equal(items(articles).length, 3)
  assert.equal(items(concepts).length, 7)
  assert.equal(items(claims).length, 7)
  assert.equal(items(citations).length, 7)
  assert.equal(items(spans).length, 7)

  const expectedQuestions = [
    ['Q02', 'A parasite is an organism that:', 'B', 'Benefits the host', 'A living organism that lives in or on another organism and harms it', 'A free-living organism', 'Can only survive outside a host'],
    ['Q04', 'A facultative parasite:', 'B', 'Is always dependent on a host', 'Can live both as a parasite and free-living', 'Is always an endoparasite', 'Requires multiple hosts for survival'],
    ['Q05', 'An opportunistic parasite:', 'C', 'Causes disease in healthy individuals', 'Only infects plants', 'Causes severe disease in immunocompromised hosts', 'Can live independently without a host'],
    ['Q09', 'What is the habitat of malaria parasites in humans?', 'D', 'Intestine', 'Muscles', 'Skin', 'Blood'],
    ['Q11', 'Which of the following is is a classification of parasites?', 'D', 'Based on their taxonomy', 'Based on their habitat in the human body', 'Based on their color', 'A & B'],
    ['Q14', 'What is the shape of trematodes?', 'B', 'Tape-like and segmented', 'Leaf-like and unsegmented', 'Cylindrical and unsegmented', 'Spherical'],
    ['Q15', 'The group of parasitic flatworms includes:', 'C', 'Trematodes and Nematodes', 'Nematodes and Cestodes', 'Cestodes and Trematodes', 'Cestodes and Protozoa'],
  ]
  for (const [label, stem, key, a, b, c, d] of expectedQuestions) {
    assert.match(questions, new RegExp(`## id\\nQST-MUST-FHB1022-PARA-INTRO-${label}`))
    assert.ok(questions.includes(`## question\n${stem}`), `${label} must preserve its printed stem`)
    assert.ok(questions.includes(`## correct_answer\n${key}`), `${label} must preserve its printed key`)
    for (const [letter, option] of [['a', a], ['b', b], ['c', c], ['d', d]]) {
      assert.ok(questions.includes(`## answer_${letter}\n${option}`), `${label} option ${letter.toUpperCase()} must be verbatim`)
    }
  }

  for (const held of ['Q1', 'Q3', 'Q6', 'Q7', 'Q8', 'Q10', 'Q12', 'Q13']) {
    assert.match(coverage, new RegExp(`\\*\\*${held} is held`))
    assert.doesNotMatch(questions, new RegExp(`INTRO-${held.padStart(3, '0')}\\b`))
  }

  assert.equal((articles.match(/^## status\nDraft$/gm) || []).length, 3)
  assert.equal((concepts.match(/^## status\nunder review$/gm) || []).length, 7)
  assert.equal((concepts.match(/^## publication_status\nneeds_evidence$/gm) || []).length, 7)
  assert.equal((questions.match(/^## status\nDraft$/gm) || []).length, 7)
  assert.match(sources, /## id\nsrc_4bd3b78f762673d7eb7f/)
  assert.match(sources, /## id\nsrc_f65b3872022ca0b42a79/)
  assert.match(coverage, /\| Questions \| 15 \| Draft \|/)
  assert.match(coverage, /\| Question authoring holds \| 31 \| no student-facing record authored \|/)
  assert.match(coverage, /First 15-prompt Absalam introduction slice: \*\*7 authored \/ 8 held \/ 0 unassessed\*\*/)

  const articleIds = [...articles.matchAll(/^## id\n(ART-[^\n]+)$/gm)].map((match) => match[1])
  for (const item of items(articles)) {
    const ownId = item.match(/^\n\n## id\n([^\n]+)/)?.[1]
    const related = item.match(/## related_articles\n([\s\S]*?)\n\n## question_ids/)?.[1] ?? ''
    for (const sibling of articleIds.filter((id) => id !== ownId)) assert.ok(related.includes(sibling), `${ownId} must link reciprocally to ${sibling}`)
  }
})
