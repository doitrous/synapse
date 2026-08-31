#!/usr/bin/env node

import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  sources: resolve(base, 'evidence/HU-LCS-103-family101-q13-21-pott-sinus-sources.md'),
  concepts: resolve(base, 'concept/HU-LCS-103-family101-q13-21-pott-sinus-concepts.md'),
  articles: resolve(base, 'article/HU-LCS-103-family101-q13-21-pott-sinus-article.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family101-q13-21-pott-sinus-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family101-q13-21-pott-sinus-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family101-q13-21-pott-sinus-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family101-q13-21-closure-mcq.md'),
}

const parseItems = (text) => text.split(/\n\n---\n\n/).filter(Boolean).map((block) => {
  const fields = {}
  for (const match of block.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=\n\n## |(?![\s\S]))/gm)) fields[match[1]] = match[2].trim()
  return fields
})

const loaded = {}
for (const [kind, path] of Object.entries(paths)) {
  const text = await readFile(path, 'utf8').catch(() => '')
  assert.notEqual(text, '', `${kind} import must be generated before validation can pass`)
  loaded[kind] = parseItems(text)
}

const ids = {
  pott: 'CON-MSK-3506288FEBB87F',
  sinus: 'CON-MSK-147B410CE730C2',
  chronic: 'CON-MSK-986759075D3736',
  complications: 'CON-MSK-F10CBA8F31CD29',
  articleNew: 'ART-HU-LCS103-PAT-F101-POTT-SINUS-COMPLICATIONS',
  articleChronic: 'ART-HU-LCS103-PAT-F101-CHRONIC-OSTEOMYELITIS',
}

const expectedNumbers = [13, 14, 15, 16, 17, 18, 19, 21]
const expectedIds = expectedNumbers.map((number) => `Q-HU-LCS103-PAT-F101-${number}`)
const expectedKeys = ['B', 'D', 'E', 'D', 'D', 'B', 'E', 'D']
const expectedStems = [
  'A necrotic dead piece of bone in osteomyelitis is called:',
  "Pott's disease of the spine is caused by:",
  'In Tuberculous osteomyelitis which is true:',
  'Sinus tract of Chronic osteomyelitis is liable for:',
  'All the following are complications of Acute hematogenous osteomyelitis except:',
  'Sequestrum in osteomyelitis consists of:-',
  'Involcurum in osteomyelitis consists of:-',
  'All ofthe followings are true about acute osteomyelitis except:-',
]
const expectedOptions = [
  ['Involucrum', 'Sequestrum', 'Woven bone', 'Lamellar bone', 'Cancellous bone'],
  ['Staph', 'Strept', 'Syphilis', 'Tuberculosis', 'Unknown cause'],
  ['Type of acute osteomyelitis', 'Still very common in developed countries.', 'Never follow pulmonary tuberculosis', 'Called paget’s disease of bone', 'Liquifaction of necrotic bones of the vertebral bodies leads to kyphosis and scoliosis'],
  ['Adenocarcinoma', 'Malignant melanoma', 'Basal cell carcinoma', 'Squamous cell carcinoma', 'Fibrinoid necrosis'],
  ['Toxaemia', 'Septicemia.', 'Thrombophlebitis', 'Primary amyloidosis.', 'Pathological fractures.'],
  ['Osseous metaplasia of skeletal muscles', 'Necrotic bone', 'Malignant bone', 'Sinuses from the infection to skin surface', 'Sub-periosteal new bone formation'],
  ['Osseous metaplasia of skeletal muscles', 'Necrotic bone', 'Malignant bone', 'Sinuses from the infection to skin surface', 'Sub-periosteal new bone formation'],
  ['Is most commonly caused by staphylococcus aureus', 'May be complicated by septicemia', 'May result in the formation of sequestrum', 'More commonly affects females above 6o years old', 'Acute hematogenous osteomyelitis usually affects the knee region'],
]
const expectedConcepts = [ids.chronic, ids.pott, ids.pott, ids.sinus, ids.complications, ids.chronic, ids.chronic, ids.complications]
const expectedArticles = [ids.articleChronic, ids.articleNew, ids.articleNew, ids.articleNew, ids.articleChronic, ids.articleChronic, ids.articleChronic, ids.articleChronic]

assert.equal(loaded.sources.length, 1, 'one new governed teaching source')
assert.equal(loaded.sources[0].id, 'src_f2e15ef3167cabd93105', 'Family-150 teaching source identity')
assert.equal(loaded.sources[0].source_relative_path, 'Year 1/LCS 103/All Subjects/Notes and Summaries/103 LCS Approach to Bone diseases 2  _240716_163251.pdf', 'exact Family-150 corpus path')

assert.equal(loaded.concepts.length, 2, 'two question-required concepts')
assert.deepEqual(loaded.concepts.map((row) => row.id), [ids.pott, ids.sinus], 'minted concept IDs')
assert.ok(loaded.concepts.every((row) => row.status === 'under review' && row.publication_status === 'needs_evidence'), 'new concepts remain pre-publication')
assert.ok(loaded.concepts.every((row) => row.article_ids === ids.articleNew), 'new concepts link to the owned article')

assert.equal(loaded.articles.length, 1, 'one bounded dependency article')
assert.equal(loaded.articles[0].id, ids.articleNew, 'article ID')
assert.equal(loaded.articles[0].status, 'Draft', 'article remains Draft')
assert.match(loaded.articles[0].related_concepts, new RegExp(ids.pott), 'article links Pott concept')
assert.match(loaded.articles[0].related_concepts, new RegExp(ids.sinus), 'article links sinus concept')

assert.equal(loaded.claims.length, 2, 'two teaching claims')
assert.equal(loaded.citations.length, 2, 'two teaching citations')
assert.equal(loaded.spans.length, 2, 'two article spans')
for (let index = 0; index < 2; index += 1) {
  assert.equal(loaded.citations[index].claim_id, loaded.claims[index].id, 'citation-to-claim link')
  assert.equal(loaded.spans[index].claim_ids, loaded.claims[index].id, 'span-to-claim link')
  assert.equal(loaded.spans[index].citation_ids, loaded.citations[index].id, 'span-to-citation link')
  assert.equal(loaded.spans[index].article_id, ids.articleNew, 'span-to-article link')
}

const rows = loaded.questions
assert.equal(rows.length, 8, 'exact importer-valid occurrence count')
assert.deepEqual(rows.map((row) => row.id), expectedIds, 'exact source occurrence IDs')
assert.deepEqual(rows.map((row) => row.correct_answer), expectedKeys, 'visually rechecked printed key sequence')
assert.equal(expectedKeys.join(''), 'BDEDDBED', 'locked key literal')
assert.deepEqual(rows.map((row) => row.question), expectedStems, 'exact printed stems')
assert.deepEqual(rows.map((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).map((letter) => row[`answer_${letter}`])), expectedOptions, 'exact printed options and order')
assert.deepEqual(rows.map((row) => row.main_concept), expectedConcepts, 'question-to-concept mapping')
assert.deepEqual(rows.map((row) => row.library_ids), expectedArticles, 'question-to-article mapping')
assert.ok(rows.every((row) => row.status === 'Draft'), 'all questions remain Draft')
assert.equal(rows.filter((row) => Object.hasOwn(row, 'explanation')).length, 0, 'generic explanation field absent')
assert.equal(rows.reduce((sum, row) => sum + Object.keys(row).filter((key) => /^explanation_[a-f]$/.test(key)).length, 0), 48, 'six option-specific explanation headers per question')
const activeExplanations = rows.flatMap((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).map((letter) => row[`explanation_${letter}`]))
assert.equal(activeExplanations.length, 40, 'one explanation per printed option')
assert.ok(activeExplanations.every((value) => value.length >= 200), 'every printed option explanation is at least 200 characters')
assert.ok(activeExplanations.every((value) => (value.match(/[.!?](?=\s|$)/g) ?? []).length >= 3), 'every printed option explanation has at least three sentences')
assert.ok(rows.every((row) => row.resource_ids.includes('src_cf37932d10b47ec0a26f')), 'every question cites the direct assessment source')
assert.ok(rows.every((row) => /Q12 prints B for Lymphocyte while Q20 prints C for Plasma cell/.test(row.author_notes)), 'conflicting keys are explicit')
assert.ok(rows.every((row) => /Both Q12 and Q20 remain held and unimported/.test(row.author_notes)), 'both conflicting occurrences remain held')
assert.ok(rows.every((row) => /No medical adjudication is inferred/.test(row.author_notes)), 'no conflict resolution is guessed')

console.log(JSON.stringify({ counts: { sources: 1, concepts: 2, articles: 1, questions: 8, claims: 2, citations: 2, spans: 2 }, keys: expectedKeys.join(''), optionCounts: rows.map(() => 5), genericExplanationHeaders: 0, optionSpecificExplanationHeaders: 48, substantiveExplanations: 40, preservedRepeats: ['Q13≈Q9', 'Q18=Q11', 'Q21=Q7'], holds: ['Q12=B', 'Q20=C'], practical: 0, written: 0, media: 0 }, null, 2))
