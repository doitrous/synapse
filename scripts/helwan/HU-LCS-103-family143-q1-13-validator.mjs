#!/usr/bin/env node

import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../..')
const base = resolve(root, 'docs/Helwan-Source-Imports')
const paths = {
  concepts: resolve(base, 'concept/HU-LCS-103-family143-q1-13-joint-concepts.md'),
  articles: resolve(base, 'article/HU-LCS-103-family143-q1-13-joint-articles.md'),
  sources: resolve(base, 'evidence/HU-LCS-103-family143-q1-13-sources.md'),
  claims: resolve(base, 'evidence/HU-LCS-103-family143-q1-13-claims.md'),
  citations: resolve(base, 'evidence/HU-LCS-103-family143-q1-13-citations.md'),
  spans: resolve(base, 'evidence/HU-LCS-103-family143-q1-13-spans.md'),
  questions: resolve(base, 'question/HU-LCS-103-family143-q1-13-mcq.md'),
}
const parseItems = (text) => text.split(/\n\n---\n\n/).filter(Boolean).map((block) => {
  const fields = {}
  for (const match of block.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=\n\n## |(?![\s\S]))/gm)) fields[match[1]] = match[2].trim()
  return fields
})
const loaded = {}
const raw = {}
for (const [kind, path] of Object.entries(paths)) {
  raw[kind] = await readFile(path, 'utf8').catch(() => '')
  assert.notEqual(raw[kind], '', `${kind} import must exist`)
  loaded[kind] = parseItems(raw[kind])
}

const ids = {
  oa: 'CON-MSK-5AD256E28E4183', ra: 'CON-MSK-CFE4B805DB79CC', septic: 'CON-MSK-7005C294D3DE73',
  tb: 'CON-MSK-074302F3E094DB', pott: 'CON-MSK-3506288FEBB87F',
}
const articleIds = ['ART-HU-LCS103-PAT-F143-OA-RA-DISCRIMINATORS', 'ART-HU-LCS103-PAT-F143-INFECTIOUS-ARTHRITIS']
const expectedKeys = 'BCBCCBCACCBBC'.split('')
const expectedStems = [
  'A 68-year-old obese woman complains of chronic knee pain that worsens with activity and improves with rest. X-ray shows joint space narrowing and osteophyte formation. What is the most likely diagnosis?',
  'A 72-year-old woman presents with hard, painless nodules at the distal interphalangeal joints. These lesions are most characteristic of:',
  'A 55-year-old man has chronic hip pain. Radiographs show narrowing of the joint space. What is the pathological basis of this finding?',
  'A patient with osteoarthritis develops locking of the knee joint. Which lesion is most likely responsible?',
  'A 45-year-old woman develops morning stiffness lasting more than one hour, with symmetrical swelling of both wrists and MCP joints. The most likely diagnosis is:',
  'A biopsy from an inflamed synovium reveals villous hypertrophy and lymphoid follicle formation. Which disease is most likely?',
  'A 50-year-old woman has ulnar deviation of the fingers and radial deviation of the wrist. These findings are characteristic of:',
  'A patient is positive for rheumatoid factor. Which of the following diseases may also show elevated RF levels?',
  'A 30-year-old immunocompromised patient presents with fever, joint pain, redness, and swelling. Joint aspiration reveals pus. The most likely diagnosis is:',
  'The most common route by which bacteria reach a joint in suppurative arthritis is:',
  'A patient with septic arthritis is expected to have which laboratory finding?',
  'A patient develops monoarticular arthritis involving the hip joint due to tuberculosis. Which pathological feature is most characteristic?',
  'Tuberculosis of the spine is known as:',
]
const expectedOptions = [
  ['Rheumatoid arthritis', 'Osteoarthritis', 'Gouty arthritis', 'Septic arthritis', 'Tuberculous arthritis'],
  ['Rheumatoid nodules', 'Tophi', 'Heberden nodes', 'Ganglion cysts', 'Bursitis'],
  ['Synovial hypertrophy', 'Cartilage loss', 'Bone infarction', 'Granuloma formation', 'Crystal deposition'],
  ['Pannus formation', 'Rheumatoid nodules', 'Loose bodies (joint mice)', 'Tophi', 'Caseating granulomas'],
  ['Osteoarthritis', 'Gout', 'Rheumatoid arthritis', 'Septic arthritis', 'Pseudogout'],
  ['Osteoarthritis', 'Rheumatoid arthritis', 'Tuberculous arthritis', 'Gout', 'Bursitis'],
  ['Gout', 'Osteoarthritis', 'Rheumatoid arthritis', 'Septic arthritis', 'Pseudogout'],
  ['Leprosy', 'Osteoporosis', 'Osteosarcoma', 'Fibrous dysplasia', 'Chondroblastoma'],
  ['Gout', 'Osteoarthritis', 'Septic arthritis', 'Tuberculous arthritis', 'Bursitis'],
  ['Direct trauma', 'Lymphatic spread', 'Hematogenous spread', 'Neural spread', 'Congenital transmission'],
  ['Leukopenia', 'Neutrophilic leukocytosis', 'Decreased ESR', 'Thrombocytopenia', 'Hypouricemia'],
  ['Pannus formation', 'Caseating granulomas', 'Tophi formation', 'Osteophytes', 'CPPD crystals'],
  ['Paget disease', 'Spondylosis', 'Pott disease', 'Ankylosing spondylitis', 'Scheuermann disease'],
]

assert.equal(loaded.concepts.length, 5, 'four exact-ID updates plus one new concept')
assert.deepEqual(loaded.concepts.map((row) => row.id), [ids.oa, ids.ra, ids.septic, ids.tb, ids.pott], 'exact concept IDs')
assert.deepEqual(loaded.concepts.map((row) => row.canonical_key), [
  'pathology.joint.osteoarthritis-degeneration-osteophytes',
  'pathology.joint.rheumatoid-pannus-clinicopathology',
  'pathology.joint.infectious-suppurative-arthritis',
  'pathology.joint.tuberculous-arthritis-caseating-tubercles',
  'osteomyelitis.tuberculous.pott-disease-vertebral-kyphosis',
], 'exact canonical keys')
assert.ok(loaded.concepts.every((row) => row.status === 'under review' && row.publication_status === 'needs_evidence'), 'concepts remain pre-publication')
assert.match(loaded.concepts[0].article_ids, /ART-HU-LCS103-PAT-F143-OA-RA-DISCRIMINATORS/, 'OA reciprocal article link')
assert.match(loaded.concepts[1].article_ids, /ART-HU-LCS103-PAT-F143-OA-RA-DISCRIMINATORS/, 'RA reciprocal article link')
assert.match(loaded.concepts[2].article_ids, /ART-HU-LCS103-PAT-F143-INFECTIOUS-ARTHRITIS/, 'septic reciprocal article link')
assert.match(loaded.concepts[3].article_ids, /ART-HU-LCS103-PAT-F143-INFECTIOUS-ARTHRITIS/, 'TB reciprocal article link')
assert.match(loaded.concepts[4].article_ids, /ART-HU-LCS103-PAT-F143-INFECTIOUS-ARTHRITIS/, 'Pott reciprocal article link')
assert.match(loaded.concepts[1].uncertainty, /Q8=A Leprosy.*without answer repair|Q8=A Leprosy.*retained/i, 'RA update preserves Q8 risk')

assert.equal(loaded.articles.length, 2, 'two reciprocal articles')
assert.deepEqual(loaded.articles.map((row) => row.id), articleIds, 'exact article IDs')
assert.ok(loaded.articles.every((row) => row.status === 'Draft' && row.publication_gate === 'needs_evidence'), 'articles remain Draft')
assert.ok(Object.keys(loaded.articles[0]).length >= 49 && Object.keys(loaded.articles[1]).length >= 49, 'articles meet field minimum')
assert.match(loaded.articles[0].conflicts, /Q8.*Leprosy.*source-risk/i, 'Q8 source risk in article')
assert.match(loaded.articles[1].related_concepts, new RegExp(ids.tb), 'infectious article links new TB concept')
assert.match(loaded.articles[1].related_concepts, new RegExp(ids.pott), 'infectious article links existing Pott concept')

assert.equal(loaded.sources.length, 1, 'one new source record')
assert.equal(loaded.sources[0].id, 'src_d24024cfcd418918201f', 'exact Family143 source ID')
assert.equal(loaded.sources[0].sha256, 'd24024cfcd418918201fea7f9ce01eacae96fd68874b0fb532b08822eb4e8063', 'exact Family143 source hash')
assert.equal(loaded.sources[0].page_count, '7', 'seven physical pages')
assert.match(loaded.sources[0].qualification, /not an official answer key/i, 'printed-answer authority is bounded')

assert.equal(loaded.claims.length, 4, 'four claims')
assert.equal(loaded.citations.length, 8, 'two citations per claim')
assert.equal(loaded.spans.length, 4, 'one span per claim')
for (let index = 0; index < 4; index += 1) {
  const claim = loaded.claims[index]
  const claimCitations = loaded.citations.filter((row) => row.claim_id === claim.id)
  assert.equal(claimCitations.length, 2, `claim ${claim.id} has assessment and teaching citations`)
  assert.deepEqual(claimCitations.map((row) => row.resource_id), ['src_d24024cfcd418918201f', 'src_6995e894c8b7f13c8809'], 'direct source plus Family65 teaching')
  assert.ok(claimCitations.every((row) => row.counts_as_claim_evidence === 'no'), 'local citations do not count as independent evidence')
  assert.equal(loaded.spans[index].claim_ids, claim.id, 'span-to-claim link')
  assert.ok(loaded.spans[index].citation_ids.includes(claimCitations[0].id) && loaded.spans[index].citation_ids.includes(claimCitations[1].id), 'span links both citations')
  const article = loaded.articles.find((row) => row.id === loaded.spans[index].article_id)
  assert.ok(article.sections.includes(loaded.spans[index].text), 'span text is present in article')
}

const questions = loaded.questions
assert.equal(questions.length, 13, 'all Q1-Q13 occurrences')
assert.deepEqual(questions.map((row) => row.id), Array.from({ length: 13 }, (_, index) => `Q-HU-LCS103-PAT-F143-${String(index + 1).padStart(2, '0')}`), 'exact occurrence IDs')
assert.deepEqual(questions.map((row) => row.correct_answer), expectedKeys, 'exact printed keys')
assert.equal(expectedKeys.join(''), 'BCBCCBCACCBBC', 'locked key literal')
assert.deepEqual(questions.map((row) => row.question), expectedStems, 'exact source stems')
assert.deepEqual(questions.map((row) => ['a', 'b', 'c', 'd', 'e'].map((letter) => row[`answer_${letter}`])), expectedOptions, 'exact source options and order')
assert.ok(questions.every((row) => row.status === 'Draft'), 'all questions remain Draft')
assert.ok(questions.every((row) => Object.keys(row).length >= 46), 'questions meet field minimum')
assert.equal(questions.filter((row) => Object.hasOwn(row, 'explanation')).length, 0, 'generic explanation field absent')
assert.equal(questions.reduce((sum, row) => sum + Object.keys(row).filter((key) => /^explanation_[a-f]$/.test(key)).length, 0), 78, 'six option-specific explanation headers per question')
const active = questions.flatMap((row) => ['a', 'b', 'c', 'd', 'e'].map((letter) => row[`explanation_${letter}`]))
assert.equal(active.length, 65, 'one substantive explanation per option')
assert.ok(active.every((value) => value.length >= 200), 'every active explanation is at least 200 characters')
assert.ok(active.every((value) => (value.match(/[.!?](?=\s|$)/g) ?? []).length >= 3), 'every active explanation has at least three sentences')
assert.match(questions[7].author_notes, /Q8=A Leprosy.*source-risk.*without repair.*faculty review/i, 'Q8 author risk note')
assert.ok(['a', 'b', 'c', 'd', 'e'].every((letter) => /Leprosy.*without medical repair.*faculty review/i.test(questions[7][`explanation_${letter}`])), 'Q8 every explanation preserves risk')
assert.match(questions[3].author_notes, /crosses a physical page boundary/i, 'Q4 page crossing preserved')
assert.match(questions[7].author_notes, /crosses a physical page boundary/i, 'Q8 page crossing preserved')
assert.ok(questions.every((row) => /no practical, written or media task/i.test(row.author_notes)), 'no inferred task types')
assert.ok(questions.every((row) => /Family-101 Q12\/Q20.*remain untouched/i.test(row.author_notes)), 'prior conflict holds remain untouched')

for (const [kind, text] of Object.entries(raw)) assert.equal((text.match(/^## explanation$/gm) ?? []).length, 0, `${kind} has no generic explanation header`)

console.log(JSON.stringify({ counts: { concepts: 5, newConcepts: 1, conceptUpdates: 4, articles: 2, sources: 1, questions: 13, claims: 4, citations: 8, spans: 4 }, keys: expectedKeys.join(''), optionCounts: questions.map(() => 5), genericExplanationHeaders: 0, optionSpecificExplanationHeaders: 78, substantiveExplanations: 65, sourceRisks: ['Q8=A Leprosy'], newHolds: [], practical: 0, written: 0, media: 0 }, null, 2))
