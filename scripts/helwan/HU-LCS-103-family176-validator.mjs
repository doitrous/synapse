#!/usr/bin/env node

import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  concepts: resolve(base, 'concept/HU-LCS-103-family176-popliteal-fossa-concept.md'),
  articles: resolve(base, 'article/HU-LCS-103-family176-popliteal-fossa-article.md'),
  sources: resolve(base, 'evidence/HU-LCS-103-family176-sources.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family176-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family176-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family176-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family176-mcq.md'),
}
const parseItems = (text) => text.split(/\n\n---\n\n/).filter(Boolean).map((block) => {
  const fields = {}
  for (const match of block.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=\n\n## |(?![\s\S]))/gm)) fields[match[1]] = match[2].trim()
  return fields
})
const raw = {}
const loaded = {}
for (const [kind, path] of Object.entries(paths)) {
  raw[kind] = await readFile(path, 'utf8').catch(() => '')
  assert.notEqual(raw[kind], '', `${kind} import must exist`)
  loaded[kind] = parseItems(raw[kind])
}

assert.equal(loaded.concepts.length, 1)
assert.equal(loaded.concepts[0].id, 'CON-MSK-C30EB62DB34996')
assert.equal(loaded.concepts[0].canonical_key, 'knee.popliteal-fossa-location-boundaries-contents')
assert.ok(Object.keys(loaded.concepts[0]).length >= 50)
assert.equal(loaded.concepts[0].article_ids, 'ART-HU-LCS103-ANA-F176-POPLITEAL-FOSSA')
assert.match(loaded.concepts[0].uncertainty, /Dr\/ M\. Ali.*Mohamed Mamdouh AbdAziz/s)
assert.match(loaded.concepts[0].uncertainty, /LCS - 105/)

assert.equal(loaded.articles.length, 1)
assert.equal(loaded.articles[0].status, 'Draft')
assert.ok(Object.keys(loaded.articles[0]).length >= 49)
assert.equal(loaded.articles[0].related_concepts, loaded.concepts[0].id)
assert.equal(loaded.articles[0].question_ids.split('\n').length, 3)
assert.match(loaded.articles[0].hold_these, /Five unlabeled a–e.*held without inference/i)

assert.equal(loaded.sources.length, 2)
assert.deepEqual(loaded.sources.map((row) => row.id), ['src_00ec490d3c55b87835f5', 'src_0e30d32f2bc49e81e838'])
assert.deepEqual(loaded.sources.map((row) => row.sha256), ['00ec490d3c55b87835f52ee61b8e046c467ee141e8a96f9d95b9afd8fed11959', '0e30d32f2bc49e81e838d8eaae5e461b648951e17f3bc8f52ee4ecbf45a67d2a'])
assert.match(loaded.sources[0].qualification, /Dr\/ M\. Ali.*Mohamed Mamdouh AbdAziz/s)
assert.match(loaded.sources[1].qualification, /LCS - 105/)

assert.equal(loaded.claims.length, 3)
assert.equal(loaded.citations.length, 6)
assert.equal(loaded.spans.length, 3)
for (const claim of loaded.claims) assert.equal(claim.concept_id, loaded.concepts[0].id)
for (const citation of loaded.citations) {
  assert.ok(loaded.claims.some((claim) => claim.id === citation.claim_id))
  assert.ok(loaded.sources.some((source) => source.id === citation.resource_id))
  assert.equal(citation.counts_as_claim_evidence, 'no')
}
for (const span of loaded.spans) {
  assert.equal(span.article_id, loaded.articles[0].id)
  assert.ok(loaded.claims.some((claim) => claim.id === span.claim_ids))
  assert.ok(span.citation_ids.split('\n').every((id) => loaded.citations.some((citation) => citation.id === id)))
  assert.ok(loaded.articles[0].sections.includes(span.text))
}

const expected = [
  ['Q-HU-LCS103-ANA-F176-01', 'The popliteal fossa is located at which part of the body?', 'B', ['Anterior thigh', 'Posterior knee', 'Medial ankle', 'Lateral hip']],
  ['Q-HU-LCS103-ANA-F176-02', 'Which of the following structures forms the superolateral boundary of the popliteal fossa?', 'B', ['Semitendinosus', 'Biceps femoris', 'Gastrocnemius (lateral head)', 'Plantaris']],
  ['Q-HU-LCS103-ANA-F176-03', 'Which structure is the deepest within the popliteal fossa?', 'A', ['Popliteal artery', 'Popliteal vein', 'Tibial nerve', 'Common fibular nerve']],
]
assert.equal(loaded.questions.length, 3)
assert.equal(loaded.questions.map((q) => q.correct_answer).join(''), 'BBA')
for (let index = 0; index < expected.length; index += 1) {
  const q = loaded.questions[index]
  const [id, stem, key, options] = expected[index]
  assert.equal(q.id, id)
  assert.equal(q.status, 'Draft')
  assert.equal(q.question, stem)
  assert.equal(q.correct_answer, key)
  assert.deepEqual(['a', 'b', 'c', 'd'].map((letter) => q[`answer_${letter}`]), options)
  assert.equal(q.main_concept, loaded.concepts[0].id)
  assert.equal(q.library_ids, loaded.articles[0].id)
  assert.ok(Object.keys(q).length >= 46)
  assert.equal(Object.hasOwn(q, 'explanation'), false)
  assert.equal(Object.keys(q).filter((field) => /^explanation_[a-f]$/.test(field)).length, 6)
  for (const letter of ['a', 'b', 'c', 'd']) {
    assert.ok(q[`explanation_${letter}`].length >= 200, `${id} ${letter} explanation length`)
    assert.ok((q[`explanation_${letter}`].match(/[.!?](?=\s|$)/g) ?? []).length >= 3, `${id} ${letter} explanation sentence count`)
  }
  assert.match(q.author_notes, /yellow-highlighted.*preserved/i)
  assert.match(q.author_notes, /Five unlabeled a–e callouts.*held without inference/i)
  const literalHash = createHash('sha256').update(`${q.question}\n${options.join('\n')}\n${key}`).digest('hex')
  const expectedHash = createHash('sha256').update(`${stem}\n${options.join('\n')}\n${key}`).digest('hex')
  assert.equal(literalHash, expectedHash, `${id} literal hash`)
}
for (const [kind, text] of Object.entries(raw)) assert.equal((text.match(/^## explanation$/gm) ?? []).length, 0, `${kind} has no generic explanation header`)
assert.equal(loaded.questions.filter((q) => q.status === 'Draft').length, 3)

console.log(JSON.stringify({ counts: { concepts: 1, articles: 1, sources: 2, questions: 3, claims: 3, citations: 6, spans: 3 }, keys: 'BBA', optionCounts: [4, 4, 4], genericExplanationHeaders: 0, heldDiagramCallouts: 5, written: 0, practical: 0, media: 0 }, null, 2))
