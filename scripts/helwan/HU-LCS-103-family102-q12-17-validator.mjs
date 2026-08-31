#!/usr/bin/env node

import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  concepts: resolve(base, 'concept/HU-LCS-103-family102-q12-17-selected-bone-tumour-concepts.md'),
  articles: resolve(base, 'article/HU-LCS-103-family102-q12-17-selected-bone-tumour-articles.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family102-q12-17-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family102-q12-17-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family102-q12-17-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family102-q12-17-mcq.md'),
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

const conceptIds = {
  ewing: 'CON-MSK-E92754368B0B07',
  giant: 'CON-MSK-319E7EB6D0E26A',
  myeloma: 'CON-FND-2B59FDDFCEDFA6',
  osteosarcoma: 'CON-MSK-A1148497BD0DB2',
}
const articleId = 'ART-HU-LCS103-PAT-F102-SELECTED-BONE-TUMOURS'
const expectedKeys = 'BCEABD'.split('')
const expectedStems = [
  'Ewing sarcoma is not characterized by:',
  'Regarding Ewing sarcoma, Which is NOT true:',
  'The presence of Homer Wright rosettes in Ewing sarcoma indicates :',
  'Giant cell tumor of bone is characterized by all of the following except:',
  'Neoplastic proliferation of plasma cells with appearance of bone lytic lesions is present in:',
  "Patient with Paget's disease of bone is vulnerable to the development of:",
]
const expectedOptions = [
  ['Highly aggressive tumor', 'The most common sarcoma of bone in children', 'Has genetic aetiology', 'May arise from long or flat bones', 'May spread outside bone'],
  ['Destructive infiltrative tumor', 'Onion skin appearance in x ray', 'Dense stroma by microscopic examination', 'Common to arise from femur', 'May have neural differentiation'],
  ['Tumor is benign', 'Tumor is locally malignant', 'Tumor spread to lung', 'Tumor arises from metaphysis', 'Tumor has neural differentiation'],
  ['Highly aggressive malignant tumor', 'Arises from epiphysis of long bones', 'May spread to lung', 'Presence of giant cells with osteoclastic activity', 'Leads to formation of lytic lesions of bones'],
  ['Ewing sarcoma', 'Multiple myeloma', 'Osteoclastoma', 'All of the above', 'None of the above'],
  ['Osteomyelitis', 'Osteoblastoma', 'Fibrous dysplasia', 'Osteosarcoma', 'Ewing sarcoma'],
]
const expectedConcepts = [conceptIds.ewing, conceptIds.ewing, conceptIds.ewing, conceptIds.giant, conceptIds.myeloma, conceptIds.osteosarcoma]

assert.equal(loaded.concepts.length, 4, 'two new concepts and two exact-ID updates')
assert.deepEqual(loaded.concepts.map((row) => row.id), [conceptIds.ewing, conceptIds.giant, conceptIds.myeloma, conceptIds.osteosarcoma], 'concept IDs and update order')
assert.deepEqual(loaded.concepts.map((row) => row.canonical_key), [
  'bonetumor.ewing-genetics-radiology-neural-differentiation',
  'bonetumor.giant-cell-site-and-stromal-biology',
  'pathology.hematologic.multiple-myeloma-m-spike-plasma-cells',
  'bonetumor.osteosarcoma-clinicoradiologic-and-malignant-osteoid',
], 'new and reused canonical keys')
assert.ok(loaded.concepts.every((row) => row.status === 'under review' && row.publication_status === 'needs_evidence'), 'concept records remain pre-publication')
assert.ok(loaded.concepts.every((row) => row.article_ids.includes(articleId)), 'all four concept records reciprocally link the owned article')
assert.match(loaded.concepts[2].article_ids, /ART-HU-BMS102-PAT-TUMOUR-MARKERS-HAEMATOLOGIC/, 'myeloma update preserves its existing article')
assert.match(loaded.concepts[2].modules, /HU-BMS-102/, 'myeloma update preserves its existing module')
assert.match(loaded.concepts[2].modules, /HU-LCS-103/, 'myeloma update adds LCS scope')
assert.match(loaded.concepts[3].article_ids, /ART-HU-LCS103-PAT-F102-BONE-FORMING-TUMOURS/, 'osteosarcoma update preserves the prior Family102 article')

assert.equal(loaded.articles.length, 1, 'one substantive selected-bone-tumours article')
assert.equal(loaded.articles[0].id, articleId, 'article ID')
assert.equal(loaded.articles[0].status, 'Draft', 'article remains Draft')
for (const id of Object.values(conceptIds)) assert.match(loaded.articles[0].related_concepts, new RegExp(id), `article links ${id}`)

assert.equal(loaded.claims.length, 4, 'four question-led local claims')
assert.equal(loaded.citations.length, 4, 'four teaching citations')
assert.equal(loaded.spans.length, 4, 'four article spans')
const expectedCitationResources = ['src_3328fde7f743cd67dc9f', 'src_3328fde7f743cd67dc9f', 'src_ea4daee0a71cf5f3171e', 'src_3328fde7f743cd67dc9f']
for (let index = 0; index < 4; index += 1) {
  assert.equal(loaded.claims[index].concept_id, Object.values(conceptIds)[index], 'claim-to-concept link')
  assert.equal(loaded.citations[index].claim_id, loaded.claims[index].id, 'citation-to-claim link')
  assert.equal(loaded.citations[index].resource_id, expectedCitationResources[index], 'citation uses the governed source supporting that claim')
  assert.equal(loaded.citations[index].counts_as_claim_evidence, 'no', 'local support is not independent verification')
  assert.equal(loaded.spans[index].article_id, articleId, 'span-to-article link')
  assert.equal(loaded.spans[index].claim_ids, loaded.claims[index].id, 'span-to-claim link')
  assert.equal(loaded.spans[index].citation_ids, loaded.citations[index].id, 'span-to-citation link')
}

const rows = loaded.questions
assert.equal(rows.length, 6, 'exact importer-valid occurrence count')
assert.deepEqual(rows.map((row) => row.id), [12, 13, 14, 15, 16, 17].map((number) => `Q-HU-LCS103-PAT-F102-${String(number).padStart(2, '0')}`), 'exact occurrence IDs')
assert.deepEqual(rows.map((row) => row.correct_answer), expectedKeys, 'exact printed keys')
assert.equal(expectedKeys.join(''), 'BCEABD', 'locked key literal')
assert.deepEqual(rows.map((row) => row.question), expectedStems, 'exact printed stems')
assert.deepEqual(rows.map((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).map((letter) => row[`answer_${letter}`])), expectedOptions, 'exact printed options and order')
assert.deepEqual(rows.map((row) => row.main_concept), expectedConcepts, 'question-to-concept mapping')
assert.ok(rows.every((row) => row.library_ids === articleId), 'all six questions use the bounded reciprocal article')
assert.ok(rows.every((row) => row.status === 'Draft'), 'all questions remain Draft')
assert.equal(rows.filter((row) => Object.hasOwn(row, 'explanation')).length, 0, 'generic explanation field absent')
assert.equal(rows.reduce((sum, row) => sum + Object.keys(row).filter((key) => /^explanation_[a-f]$/.test(key)).length, 0), 36, 'six option-specific explanation headers per question')
const activeExplanations = rows.flatMap((row) => ['a', 'b', 'c', 'd', 'e', 'f'].filter((letter) => row[`answer_${letter}`]).map((letter) => row[`explanation_${letter}`]))
assert.equal(activeExplanations.length, 30, 'one substantive explanation per printed option')
assert.ok(activeExplanations.every((value) => value.length >= 200), 'every printed option explanation is at least 200 characters')
assert.ok(activeExplanations.every((value) => (value.match(/[.!?](?=\s|$)/g) ?? []).length >= 3), 'every printed option explanation has at least three sentences')
assert.ok(rows.every((row) => row.resource_ids.includes('src_ea4daee0a71cf5f3171e')), 'every question cites the direct assessment source')
assert.match(rows[0].author_notes, /Q12.*printed key B.*source-risk.*without medical repair/i, 'Q12 source risk is explicit')
assert.match(rows[3].author_notes, /Q15.*printed key A.*source-risk.*without medical repair/i, 'Q15 source risk is explicit')
assert.ok(rows.every((row) => /six keyed written case prompts remain deferred/.test(row.author_notes)), 'written-case boundary remains deferred')
assert.ok(rows.every((row) => /Family-101 Q12 and Q20 remain held and unimported/.test(row.author_notes)), 'prior conflict holds remain untouched')
assert.ok(rows.every((row) => /No medical adjudication is inferred/.test(row.author_notes)), 'no held conflict is guessed')

console.log(JSON.stringify({ counts: { concepts: 4, newConcepts: 2, conceptUpdates: 2, articles: 1, questions: 6, claims: 4, citations: 4, spans: 4 }, keys: expectedKeys.join(''), optionCounts: rows.map(() => 5), genericExplanationHeaders: 0, optionSpecificExplanationHeaders: 36, substantiveExplanations: 30, sourceRisks: ['Q12=B', 'Q15=A'], priorHoldsUntouched: ['Family101-Q12=B', 'Family101-Q20=C'], newHolds: [], deferredWrittenCases: 6, practical: 0, media: 0 }, null, 2))
