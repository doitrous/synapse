#!/usr/bin/env node

import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  sources: resolve(base, 'evidence/HU-LCS-103-family101-osteomyelitis-sources.md'),
  concepts: resolve(base, 'concept/HU-LCS-103-family101-osteomyelitis-concepts.md'),
  articles: resolve(base, 'article/HU-LCS-103-family101-osteomyelitis-articles.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family101-osteomyelitis-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family101-osteomyelitis-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family101-osteomyelitis-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family101-q1-11-osteomyelitis-mcq.md'),
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

const concepts = {
  organism: 'CON-MSK-9093C8C1E6891D',
  distribution: 'CON-MSK-FA4F7DB668E5B9',
  pathogenesis: 'CON-MSK-7840CBA0BBA334',
  complications: 'CON-MSK-F10CBA8F31CD29',
  chronic: 'CON-MSK-986759075D3736',
}
const articles = {
  acute: 'ART-HU-LCS103-PAT-F101-ACUTE-OSTEOMYELITIS',
  chronic: 'ART-HU-LCS103-PAT-F101-CHRONIC-OSTEOMYELITIS',
}
const expectedIds = Array.from({ length: 11 }, (_, index) => `Q-HU-LCS103-PAT-F101-${String(index + 1).padStart(2, '0')}`)
const expectedKeys = ['A', 'A', 'C', 'C', 'B', 'D', 'D', 'B', 'A', 'B', 'B']
const expectedOptionCounts = [5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5]
const expectedStems = [
  'The most common organism to cause acute suppurative osteomyelitis is:',
  'The following site is resistant to spread in cases of acute hematogenous osteomyelitis:',
  'The following is not a cause of hematogenous suppurative osteomyelitis',
  'Acute hematogenous osteomyelitis affects',
  'The characteristic inflammatory cell in acute osteomyelitis is:',
  'In acute suppurative osteomyelitis, the inflamed bone become necrotic due to:',
  'All of the followings are true about acute osteomyelitis except:',
  'The most common joint to be affected by acute hematogenous osteomyelitis is:',
  'Separated necrotic bone is called',
  'The commonest site of hematogenous osteomyelitis is:',
  'Sequestrum in osteomyelitis consists of:',
]
const expectedOptions = [
  ['Staph aureus', 'E coli', 'Streptococcus hemolyticus', 'Gonococci', 'Menigiococci'],
  ['Epiphysis', 'Diaphysis', 'Metaphysis', 'Periosteum', 'Endosteum'],
  ['Staph aureus', 'E.Coli', 'Klebsiella', 'Streptococci', 'None of the above'],
  ['Epiphysis', 'Diaphysis', 'Metaphysis', 'Periosteum', 'Endosteum'],
  ['Plasma cells', 'Neutrophils', 'Lymphocytes', 'Macrophages', 'Eosinophils'],
  ['Bacterial toxins', 'Ischemia caused by inflammatory thrombosis', 'Ischemia due to compression of vessels by exudates', 'All of the above', 'None of the above'],
  ['is most commonly caused by staphylococcus aureus', 'May be complicated by septicemia', 'May result in the formation of sequestrum', 'More commonly affects females above 60 years old', 'Acute hematogenous osteomyelitis usually affects the knee region'],
  ['Shoulder', 'Knee', 'Elbow', 'Sacroiliac', 'Ankle'],
  ['Sequestrum', 'Involucrum', 'Cloaca', 'Brodie abscess', 'None of the above'],
  ['Epiphysis of long bones', 'Metaphysis of long bones', 'Short bones', 'Flat bones'],
  ['Osseous metaplasia of skeletal muscles', 'Necrotic bone', 'Malignant bone', 'Sinuses from the infection to skin surface', 'Sub-periosteal new bone formation'],
]
const expectedConcepts = [
  concepts.organism, concepts.distribution, concepts.organism, concepts.distribution,
  concepts.pathogenesis, concepts.pathogenesis, concepts.complications, concepts.distribution,
  concepts.chronic, concepts.distribution, concepts.chronic,
]
const expectedArticles = [
  articles.acute, articles.acute, articles.acute, articles.acute, articles.acute, articles.acute,
  articles.chronic, articles.acute, articles.chronic, articles.acute, articles.chronic,
]

assert.equal(loaded.sources.length, 3, 'three governed source resources')
assert.deepEqual(loaded.sources.map((row) => row.id), ['src_cf37932d10b47ec0a26f', 'src_3328fde7f743cd67dc9f', 'src_dc883db2a46aec7986e5'], 'exact source IDs and order')
assert.equal(loaded.concepts.length, 5, 'five question-required concepts')
assert.deepEqual(loaded.concepts.map((row) => row.id), Object.values(concepts), 'minted governed concept IDs')
assert.ok(loaded.concepts.every((row) => row.status === 'under review' && row.publication_status === 'needs_evidence'), 'concepts stay pre-publication')
assert.equal(loaded.articles.length, 2, 'two substantive articles')
assert.deepEqual(loaded.articles.map((row) => row.id), Object.values(articles), 'article IDs')
assert.ok(loaded.articles.every((row) => row.status === 'Draft' && row.publication_gate === 'needs_evidence'), 'articles stay Draft')
assert.equal(loaded.claims.length, 5, 'one atomic claim per concept')
assert.equal(loaded.citations.length, 5, 'one direct citation per claim')
assert.equal(loaded.spans.length, 5, 'one article span per claim')

const rows = loaded.questions
assert.equal(rows.length, 11, 'exact Q1–Q11 occurrence count')
assert.deepEqual(rows.map((row) => row.id), expectedIds, 'exact Family-101 occurrence IDs')
assert.deepEqual(rows.map((row) => row.correct_answer), expectedKeys, 'printed key sequence')
assert.deepEqual(rows.map((row) => row.question), expectedStems, 'exact printed stems')
assert.deepEqual(rows.map((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).length), expectedOptionCounts, 'exact printed option counts')
assert.deepEqual(rows.map((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).map((letter) => row[`answer_${letter}`])), expectedOptions, 'exact printed options and order')
assert.deepEqual(rows.map((row) => row.main_concept), expectedConcepts, 'question-to-concept mapping')
assert.deepEqual(rows.map((row) => row.library_ids), expectedArticles, 'question-to-article mapping')
assert.ok(rows.every((row) => row.status === 'Draft'), 'all questions remain Draft')
assert.equal(rows.filter((row) => Object.hasOwn(row, 'explanation')).length, 0, 'generic explanation field absent')
assert.equal(rows.reduce((sum, row) => sum + Object.keys(row).filter((key) => /^explanation_[a-f]$/.test(key)).length, 0), 66, 'six option-specific explanation headers per question')
const activeExplanations = rows.flatMap((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).map((letter) => row[`explanation_${letter}`]))
assert.equal(activeExplanations.length, 54, 'one substantive explanation per printed option')
assert.ok(activeExplanations.every((value) => value.length >= 200), 'every printed option explanation is at least 200 characters')
assert.ok(activeExplanations.every((value) => (value.match(/[.!?](?=\s|$)/g) ?? []).length >= 3), 'every printed option explanation has at least three sentences')
assert.ok(rows.every((row) => row.resource_ids.includes('src_cf37932d10b47ec0a26f')), 'every question cites the direct Family-101 deck')
assert.ok(rows.every((row) => /Family 100 is excluded/.test(row.author_notes)), 'external Family-100 skip is explicit')
assert.ok(rows.every((row) => /Family 79 remains evidence support only/.test(row.author_notes)), 'Family-79 assessment hold remains explicit')
assert.ok(rows.every((row) => /Q12–Q21 remain outside this slice/.test(row.author_notes)), 'later Family-101 boundary is explicit')
assert.ok(rows.every((row) => /No source option-contract hold occurs inside Q1–Q11/.test(row.author_notes)), 'zero new holds are explicit')

for (const concept of loaded.concepts) {
  assert.ok(Object.values(articles).includes(concept.article_ids), `${concept.id} links to an owned article`)
  assert.match(loaded.articles.find((article) => article.id === concept.article_ids).related_concepts, new RegExp(concept.id), `${concept.id} has a reciprocal article link`)
}
for (let index = 0; index < loaded.claims.length; index += 1) {
  assert.equal(loaded.citations[index].claim_id, loaded.claims[index].id, 'citation-to-claim link')
  assert.equal(loaded.spans[index].claim_ids, loaded.claims[index].id, 'span-to-claim link')
  assert.equal(loaded.spans[index].citation_ids, loaded.citations[index].id, 'span-to-citation link')
  assert.ok(Object.values(articles).includes(loaded.spans[index].article_id), 'span-to-article link')
}

console.log(JSON.stringify({ counts: { sources: 3, concepts: 5, articles: 2, questions: 11, claims: 5, citations: 5, spans: 5 }, keys: expectedKeys.join(''), optionCounts: expectedOptionCounts, genericExplanationHeaders: 0, optionSpecificExplanationHeaders: 66, substantiveExplanations: 54, skippedFamily100: true, family79EvidenceOnly: true, newHolds: 0, family101Remaining: ['Q12–Q21'], practical: 0, written: 0, media: 0 }, null, 2))
