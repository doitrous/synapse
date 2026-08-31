#!/usr/bin/env node

import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  sources: resolve(base, 'evidence/HU-LCS-103-family102-q1-11-sources.md'),
  concepts: resolve(base, 'concept/HU-LCS-103-family102-q1-11-bone-tumour-concepts.md'),
  articles: resolve(base, 'article/HU-LCS-103-family102-q1-11-bone-tumour-articles.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family102-q1-11-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family102-q1-11-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family102-q1-11-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family102-q1-11-mcq.md'),
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

const conceptIds = [
  'CON-MSK-3AD186B4605AF2',
  'CON-MSK-DDF3A03342A247',
  'CON-MSK-660824CAF79CBF',
  'CON-MSK-4836A383AEA93E',
  'CON-MSK-A1148497BD0DB2',
  'CON-MSK-B26274E881BA5A',
  'CON-MSK-681A1DB12F3693',
]
const articleIds = [
  'ART-HU-LCS103-PAT-F102-BONE-FORMING-TUMOURS',
  'ART-HU-LCS103-PAT-F102-CARTILAGE-TUMOURS',
]
const expectedKeys = 'CDABDABCEAC'.split('')
const expectedStems = [
  'Painful radiolucent lesion in distal femur (1 cm), which is relieved by Aspirin:',
  'The most common site for chodrosarcoma among those is:',
  'The Following are primary bone tumors except:',
  'All of the following is true regarding osteoma except:',
  'The most common primary malignant bone tumor is :',
  'Osteosarcoma is characterized by all of the following except :',
  'The hallmark microscopic sign to diagnose osteosarcoma is :',
  'Osteochondroma ( exostosis ) is characterized by all except :',
  'The following is a characteristic feature of chondroma:',
  'The following are not true about chondrosarcoma except :',
  'One of the following is a difference between osteoid osteoma & osteoblastoma:',
]
const expectedOptions = [
  ['Osteosarcoma.', 'Chondroma.', 'Osteoid osteoma.', 'Osteoblastoma.', 'Osteoma.'],
  ['Proximal femur.', 'Aroud the knee joint.', 'Metatarsal bones.', 'Scapula', 'Mandible'],
  ['Metastatic tumors', 'Osteogenic tumors', 'Chondrogenic tumors', 'Fibrous tumors', 'Fibro-osseus tumors'],
  ['Benign tumor of bone', 'Usually occurs around knee', 'May be solitary or multiple', 'May be part of Gardner syndrome', 'Composed of mixture of lamellar and woven bone'],
  ['Osteoblastoma', 'Ewing sarcoma', 'Chondrosarcoma', 'Osteosarcoma', 'None of the above'],
  ['Common in old age', 'Arises from metaphysis of long bones', 'Common arund knee', 'Shows hemorrhage and necrosis', 'May lead to sunray pattern or Codman’s triangle'],
  ['Variable size and shape of cells', 'Presence of malignant osteoid matrix formation', 'Abundant malignant cartilage formation', 'All of the above', 'None of the above'],
  ['Common benign growth', 'May be single or multiple', 'Cartilaginous outgrowth covered by bony cap', 'Usually arises from metaphysis of long bones'],
  ['Benign cartilage forming tumor', 'Common in hands and feet', 'If multiple are called Ollier syndrome', 'If associated with benign angiomas are called Maffucci syndrome', 'All of the above'],
  ['Occurs more frequent in pelvis', 'Commonly involves distal exteremities', 'Forms small lobulated mass', 'Early blood spread', 'Most patients are younger than 40 years'],
  ['Osteoblastoma is well circumscribed lesion', 'Osteoblastoma usually involves the cortex', 'Osteoblastoma is larger than 2 cm in diameter', 'Osteoblastoma is benign', 'Osteoblastoma is surrounded by rim of sclerotic bone'],
]
const expectedConceptMap = [conceptIds[0], conceptIds[1], conceptIds[2], conceptIds[3], conceptIds[2], conceptIds[4], conceptIds[4], conceptIds[5], conceptIds[6], conceptIds[1], conceptIds[0]]
const expectedArticleMap = [articleIds[0], articleIds[1], articleIds[0], articleIds[0], articleIds[0], articleIds[0], articleIds[0], articleIds[1], articleIds[1], articleIds[1], articleIds[0]]

assert.equal(loaded.sources.length, 1, 'one direct assessment source')
assert.equal(loaded.sources[0].id, 'src_ea4daee0a71cf5f3171e', 'exact Family-102 source ID')
assert.equal(loaded.sources[0].source_relative_path, 'Year 1/LCS 103/All Subjects/Questions/MCQs/MCQs - mcq 5 mss.pdf', 'exact Family-102 source path')
assert.equal(loaded.sources[0].sha256, 'ea4daee0a71cf5f3171e609de4aa14e28438895e4f6c8559223b248a92b02ade', 'exact Family-102 hash')
assert.equal(loaded.sources[0].is_assessment, 'yes', 'direct keyed source is marked assessment')

assert.equal(loaded.concepts.length, 7, 'seven question-required concepts')
assert.deepEqual(loaded.concepts.map((row) => row.id), conceptIds, 'minted concept IDs and order')
assert.ok(loaded.concepts.every((row) => row.status === 'under review' && row.publication_status === 'needs_evidence'), 'concepts remain pre-publication')
for (const row of loaded.concepts) {
  assert.ok(articleIds.includes(row.article_ids), `concept ${row.id} links one owned article`)
  assert.match(row.resource_ids, /src_ea4daee0a71cf5f3171e/, 'concept cites direct source')
  assert.match(row.resource_ids, /src_3328fde7f743cd67dc9f/, 'concept cites governed teaching support')
}

assert.equal(loaded.articles.length, 2, 'two bounded dependency articles')
assert.deepEqual(loaded.articles.map((row) => row.id), articleIds, 'article IDs and order')
assert.ok(loaded.articles.every((row) => row.status === 'Draft'), 'articles remain Draft')
for (const conceptId of conceptIds) {
  assert.equal(loaded.articles.filter((row) => row.related_concepts.includes(conceptId)).length, 1, `${conceptId} has one reciprocal article link`)
}

assert.equal(loaded.claims.length, 7, 'seven local teaching claims')
assert.equal(loaded.citations.length, 7, 'seven local citations')
assert.equal(loaded.spans.length, 7, 'seven article spans')
for (let index = 0; index < 7; index += 1) {
  assert.equal(loaded.claims[index].concept_id, conceptIds[index], 'claim-to-concept link')
  assert.equal(loaded.citations[index].claim_id, loaded.claims[index].id, 'citation-to-claim link')
  assert.equal(loaded.citations[index].resource_id, 'src_3328fde7f743cd67dc9f', 'citation uses governed Family-64 teaching support')
  assert.equal(loaded.citations[index].counts_as_claim_evidence, 'no', 'local support is not independent verification')
  assert.equal(loaded.spans[index].claim_ids, loaded.claims[index].id, 'span-to-claim link')
  assert.equal(loaded.spans[index].citation_ids, loaded.citations[index].id, 'span-to-citation link')
  assert.ok(articleIds.includes(loaded.spans[index].article_id), 'span-to-owned-article link')
}

const rows = loaded.questions
assert.equal(rows.length, 11, 'exact occurrence count')
assert.deepEqual(rows.map((row) => row.id), Array.from({ length: 11 }, (_, index) => `Q-HU-LCS103-PAT-F102-${String(index + 1).padStart(2, '0')}`), 'exact occurrence IDs')
assert.deepEqual(rows.map((row) => row.correct_answer), expectedKeys, 'visually rechecked printed keys')
assert.equal(expectedKeys.join(''), 'CDABDABCEAC', 'locked key literal')
assert.deepEqual(rows.map((row) => row.question), expectedStems, 'exact printed stems')
assert.deepEqual(rows.map((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).map((letter) => row[`answer_${letter}`])), expectedOptions, 'exact printed options and order')
assert.deepEqual(rows.map((row) => row.main_concept), expectedConceptMap, 'question-to-concept mapping')
assert.deepEqual(rows.map((row) => row.library_ids), expectedArticleMap, 'question-to-article mapping')
assert.ok(rows.every((row) => row.status === 'Draft'), 'all questions remain Draft')
assert.equal(rows.filter((row) => Object.hasOwn(row, 'explanation')).length, 0, 'generic explanation field absent')
assert.equal(rows.reduce((sum, row) => sum + Object.keys(row).filter((key) => /^explanation_[a-f]$/.test(key)).length, 0), 66, 'six option-specific explanation headers per question')
const activeExplanations = rows.flatMap((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).map((letter) => row[`explanation_${letter}`]))
assert.equal(activeExplanations.length, 54, 'one substantive explanation per printed option')
assert.ok(activeExplanations.every((value) => value.length >= 200), 'every printed option explanation is at least 200 characters')
assert.ok(activeExplanations.every((value) => (value.match(/[.!?](?=\s|$)/g) ?? []).length >= 3), 'every printed option explanation has at least three sentences')
assert.ok(rows.every((row) => row.resource_ids.includes('src_ea4daee0a71cf5f3171e')), 'every question cites the direct assessment source')
assert.ok(rows.every((row) => /Family-101 Q12 and Q20 remain held and unimported/.test(row.author_notes)), 'prior conflict holds remain explicit and untouched')
assert.ok(rows.every((row) => /No medical adjudication is inferred/.test(row.author_notes)), 'prior conflict is not guessed')
assert.deepEqual(rows.map((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).length), [5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5], 'Q8 exact four-option form is preserved')

console.log(JSON.stringify({ counts: { sources: 1, concepts: 7, articles: 2, questions: 11, claims: 7, citations: 7, spans: 7 }, keys: expectedKeys.join(''), optionCounts: [5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5], genericExplanationHeaders: 0, optionSpecificExplanationHeaders: 66, substantiveExplanations: 54, priorHoldsUntouched: ['Family101-Q12=B', 'Family101-Q20=C'], newHolds: [], practical: 0, written: 0, media: 0 }, null, 2))
