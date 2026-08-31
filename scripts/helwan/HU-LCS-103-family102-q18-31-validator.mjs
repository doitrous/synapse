#!/usr/bin/env node

import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  concepts: resolve(base, 'concept/HU-LCS-103-family102-q18-31-closure-concept-updates.md'),
  articles: resolve(base, 'article/HU-LCS-103-family102-q18-31-closure-article.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family102-q18-31-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family102-q18-31-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family102-q18-31-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family102-q18-31-mcq.md'),
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
  osteosarcoma: 'CON-MSK-A1148497BD0DB2',
  classification: 'CON-MSK-660824CAF79CBF',
  osteoma: 'CON-MSK-4836A383AEA93E',
  chondroma: 'CON-MSK-681A1DB12F3693',
  myeloma: 'CON-FND-2B59FDDFCEDFA6',
  ewing: 'CON-MSK-E92754368B0B07',
  osteoid: 'CON-MSK-3AD186B4605AF2',
  chondrosarcoma: 'CON-MSK-DDF3A03342A247',
}
const articles = {
  bone: 'ART-HU-LCS103-PAT-F102-BONE-FORMING-TUMOURS',
  cartilage: 'ART-HU-LCS103-PAT-F102-CARTILAGE-TUMOURS',
  selected: 'ART-HU-LCS103-PAT-F102-SELECTED-BONE-TUMOURS',
  closure: 'ART-HU-LCS103-PAT-F102-CLOSURE-METASTASIS-SUBTYPES',
}
const expectedKeys = 'CCDACBAEBECDCC'.split('')
const expectedStems = [
  'Sun-ray appearance is characteristic feature of:',
  'Osteosarcoma tends to occur in:',
  'The most common bone tumor is:',
  'A patient with multiple osteomas. This is a part of:-',
  'Ollier disease is characterized by multiple:-',
  'Multiple Myeloma is a tumor of:-',
  'Translocation t-(11,21) is characteristic for:',
  'Osteosarcoma is characterized by:-',
  'Multiple Chondromas + Benign angiomas is called:-',
  'The following carcinoma may produce osteosclerotic bone metastasis:-',
  'Painful radiolucent lesion in distal femur (1 cm) which is relieved by aspirin:',
  'The most common site for chondrosarcoma among those is:',
  'Onion skin appearance on X-ray is characteristic of:-',
  'Microscopic examination of bone tumor revealed atypical spindle cells related to malignant osteoid formation and wide areas with malignant cartilage formations.The diagnosis is:-',
]
const expectedOptions = [
  ['Osteoma', 'Osteoblastoma', 'Osteosarcoma', 'Chondroma', 'Chondrosarcoma'],
  ['Epiphysis', 'Diaphysis', 'Metaphysis', 'Articular cartilage', 'Tendons'],
  ['Osteosarcoma', 'Osteochondroma', 'Giant cell tumor', 'Metastatic tumors', 'Chondrosarcoma'],
  ['Gardner syndrome', 'Ollier disease', 'Maffucci syndrome', 'Li-Fraumeni syndrome', 'McCune Albright syndrome'],
  ['Exostosis', 'Fibrous dysplasia', 'Chondromas', 'Bone secondaries'],
  ['Lymphocytes', 'Plasma cells', 'Mast cells', 'Neuroectodermal cells of bone marrow', 'Promyelocytes'],
  ['Ewing sarcoma', 'Osteosarcoma', 'Multiple myeloma', 'McCune Albright syndrome', 'Cortical fibrous defect'],
  ['Is rare in the metaphysis of long bones', 'Spreads mostly by lymphatic pathway', 'Gives onion skin appearance on radiograph', 'Has a good prognosis', 'Occurs most commonly between the ages of 10 and 25 years'],
  ['Ollier syndrome', 'Maffucci syndrome', 'Gardener syndrome', 'Multiple hereditary exostosis'],
  ['Bronchogenic carcinoma', 'Thyroid carcinoma', 'Renal cell carcinoma', 'Breast carcinoma', 'Prostatic carcinoma'],
  ['Osteosarcoma', 'Chondroma', 'Osteoid osteoma', 'Osteoblastoma', 'Osteoma'],
  ['Proximal femur', 'Around the knee joint', 'Metatarsal bones', 'Scapula', 'Mandible'],
  ['Osteosarcoma', 'Bone metastasis', 'Ewing’s sarcoma', 'McCune Albright syndrome', 'Osteoid osteoma'],
  ['Osteochondroma', 'Chondrosarcoma', 'Chondroblastic osteosarcoma', 'Osteoblastic osteosarcoma', 'Metaphyseal fibrous defect'],
]
const conceptMap = [ids.osteosarcoma, ids.osteosarcoma, ids.classification, ids.osteoma, ids.chondroma, ids.myeloma, ids.ewing, ids.osteosarcoma, ids.chondroma, ids.classification, ids.osteoid, ids.chondrosarcoma, ids.ewing, ids.osteosarcoma]
const articleMap = [articles.bone, articles.bone, articles.closure, articles.bone, articles.cartilage, articles.selected, articles.selected, articles.bone, articles.cartilage, articles.closure, articles.bone, articles.cartilage, articles.selected, articles.closure]

assert.equal(loaded.concepts.length, 2, 'exact classification and osteosarcoma update count')
assert.deepEqual(loaded.concepts.map((row) => row.id), [ids.classification, ids.osteosarcoma], 'exact update IDs')
assert.deepEqual(loaded.concepts.map((row) => row.canonical_key), ['bonetumor.classification-and-primary-malignant-frequency', 'bonetumor.osteosarcoma-clinicoradiologic-and-malignant-osteoid'], 'exact update keys')
assert.ok(loaded.concepts.every((row) => row.status === 'under review' && row.publication_status === 'needs_evidence'), 'updates remain pre-publication')
assert.ok(loaded.concepts.every((row) => row.article_ids.includes(articles.closure)), 'both updates reciprocally link closure article')
assert.match(loaded.concepts[0].article_ids, new RegExp(articles.bone), 'classification update preserves prior article')
assert.match(loaded.concepts[1].article_ids, new RegExp(articles.bone), 'osteosarcoma update preserves prior article')

assert.equal(loaded.articles.length, 1, 'one closure article')
assert.equal(loaded.articles[0].id, articles.closure, 'closure article ID')
assert.equal(loaded.articles[0].status, 'Draft', 'article remains Draft')
assert.match(loaded.articles[0].related_concepts, new RegExp(ids.classification), 'article links classification concept')
assert.match(loaded.articles[0].related_concepts, new RegExp(ids.osteosarcoma), 'article links osteosarcoma concept')

assert.equal(loaded.claims.length, 2, 'two closure claims')
assert.equal(loaded.citations.length, 2, 'two closure citations')
assert.equal(loaded.spans.length, 2, 'two closure spans')
for (let index = 0; index < 2; index += 1) {
  assert.equal(loaded.claims[index].concept_id, [ids.classification, ids.osteosarcoma][index], 'claim-to-concept link')
  assert.equal(loaded.citations[index].claim_id, loaded.claims[index].id, 'citation-to-claim link')
  assert.equal(loaded.citations[index].resource_id, 'src_ea4daee0a71cf5f3171e', 'citation uses direct Family102 source')
  assert.equal(loaded.citations[index].counts_as_claim_evidence, 'no', 'local source is not independent verification')
  assert.equal(loaded.spans[index].article_id, articles.closure, 'span-to-article link')
  assert.equal(loaded.spans[index].claim_ids, loaded.claims[index].id, 'span-to-claim link')
  assert.equal(loaded.spans[index].citation_ids, loaded.citations[index].id, 'span-to-citation link')
}

const rows = loaded.questions
assert.equal(rows.length, 14, 'all remaining MCQ occurrences')
assert.deepEqual(rows.map((row) => row.id), Array.from({ length: 14 }, (_, index) => `Q-HU-LCS103-PAT-F102-${index + 18}`), 'exact occurrence IDs')
assert.deepEqual(rows.map((row) => row.correct_answer), expectedKeys, 'exact printed keys')
assert.equal(expectedKeys.join(''), 'CCDACBAEBECDCC', 'locked key literal')
assert.deepEqual(rows.map((row) => row.question), expectedStems, 'exact printed stems')
assert.deepEqual(rows.map((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).map((letter) => row[`answer_${letter}`])), expectedOptions, 'exact printed options and order')
assert.deepEqual(rows.map((row) => row.main_concept), conceptMap, 'question-to-concept mapping')
assert.deepEqual(rows.map((row) => row.library_ids), articleMap, 'question-to-article mapping')
assert.ok(rows.every((row) => row.status === 'Draft'), 'all questions remain Draft')
assert.equal(rows.filter((row) => Object.hasOwn(row, 'explanation')).length, 0, 'generic explanation field absent')
assert.equal(rows.reduce((sum, row) => sum + Object.keys(row).filter((key) => /^explanation_[a-f]$/.test(key)).length, 0), 84, 'six option-specific explanation headers per question')
const activeExplanations = rows.flatMap((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).map((letter) => row[`explanation_${letter}`]))
assert.equal(activeExplanations.length, 68, 'one substantive explanation per printed option')
assert.ok(activeExplanations.every((value) => value.length >= 200), 'every printed option explanation is at least 200 characters')
assert.ok(activeExplanations.every((value) => (value.match(/[.!?](?=\s|$)/g) ?? []).length >= 3), 'every printed option explanation has at least three sentences')
assert.deepEqual(rows.map((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).length), [5, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 5, 5], 'exact option counts')
assert.match(rows[6].author_notes, /Q24.*t-\(11,21\).*printed key A.*source-risk.*without medical repair/i, 'Q24 literal source risk is explicit')
assert.match(rows[10].author_notes, /Q28.*repeat of Q1.*separate source occurrence/i, 'Q28 repeat is preserved')
assert.match(rows[11].author_notes, /Q29.*repeat of Q2.*separate source occurrence/i, 'Q29 repeat is preserved')
assert.match(rows[12].author_notes, /lowercase c.*normalized to importer value C/i, 'Q30 lowercase printed key is transparently normalized')
assert.ok(rows.every((row) => /six keyed written case prompts remain deferred/.test(row.author_notes)), 'written-case boundary remains deferred')
assert.ok(rows.every((row) => /Family-101 Q12 and Q20 remain held and unimported/.test(row.author_notes)), 'prior holds remain untouched')
assert.ok(rows.every((row) => /Family-102 Q12 and Q15 remain Draft source-risk occurrences/.test(row.author_notes)), 'prior source risks remain explicit')

console.log(JSON.stringify({ counts: { concepts: 2, newConcepts: 0, conceptUpdates: 2, articles: 1, questions: 14, claims: 2, citations: 2, spans: 2 }, keys: expectedKeys.join(''), optionCounts: [5, 5, 5, 5, 4, 5, 5, 5, 4, 5, 5, 5, 5, 5], genericExplanationHeaders: 0, optionSpecificExplanationHeaders: 84, substantiveExplanations: 68, preservedRepeats: ['Q28=Q1', 'Q29=Q2'], sourceRisks: ['Q24=t-(11,21), key A'], newHolds: [], deferredWrittenCases: 6, practical: 0, media: 0 }, null, 2))
