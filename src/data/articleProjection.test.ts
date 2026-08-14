import test from 'node:test'
import assert from 'node:assert/strict'
import { articleToSubtopic, overlaySubtopic, relatedArticleLinks, readerAnnotations, relatedReasonKey, sectionSpans } from './articleProjection.ts'
import { parseSections } from './bulkImport.ts'
import { emptyMedicalEvidenceStore, type MedicalEvidenceStore } from './medicalEvidence.ts'
import type { ManagedContentItem } from './contentControl.ts'
import type { ConceptGraph } from './conceptGraph.ts'

const item = (id: string, title: string, articleData: unknown = {}): ManagedContentItem =>
  ({ id, kind: 'article', title, subjectId: 'cvs', status: 'Published', owner: 'o', updatedAt: '', fields: {}, articleData }) as ManagedContentItem

const readable = new Map<string, ManagedContentItem>([
  ['ART-A', item('ART-A', 'Cardiac output, preload and afterload')],
  ['ART-B', item('ART-B', 'Cardiac cycle and heart sounds')],
])

test('valid related IDs render and a dead ID is dropped', () => {
  // The live shape: 433 authored links across 145 articles, some pointing at
  // records the projection does not render.
  const links = relatedArticleLinks(['ART-A', 'ART-MISSING', 'ART-B'], readable, 'ART-SELF')
  assert.deepEqual(links.map((link) => link.id), ['ART-A', 'ART-B'])
  assert.equal(links[0].title, 'Cardiac output, preload and afterload')
})

test('a self-link is dropped', () => {
  assert.deepEqual(relatedArticleLinks(['ART-A'], readable, 'ART-A'), [])
})

test('duplicate IDs collapse to one link', () => {
  const links = relatedArticleLinks(['ART-A', 'ART-A', ' ART-A '], readable, 'ART-SELF')
  assert.equal(links.length, 1)
})

test('blank and whitespace IDs are dropped', () => {
  assert.deepEqual(relatedArticleLinks(['', '   ', 'ART-B'], readable, 'ART-SELF').map((l) => l.id), ['ART-B'])
})

test('a per-pair reason is carried through when authored', () => {
  const reasons = { [relatedReasonKey('ART-A')]: 'Preload explains the cycle you just read.' }
  const [link] = relatedArticleLinks(['ART-A'], readable, 'ART-SELF', reasons)
  assert.equal(link.reason, 'Preload explains the cycle you just read.')
})

test('an absent reason leaves the field unset rather than blank', () => {
  const [link] = relatedArticleLinks(['ART-A'], readable, 'ART-SELF', { [relatedReasonKey('ART-A')]: '   ' })
  assert.equal('reason' in link, false)
})

/* ---- annotations ------------------------------------------------------- */

const graph = {
  concepts: [
    { id: 'med.concept.cardiac-output', label: 'Cardiac output', publicationStatus: 'published' },
    { id: 'med.concept.draft', label: 'Draft concept', publicationStatus: 'needs_evidence' },
  ],
  relations: [],
} as unknown as ConceptGraph

const annotated = (annotations: unknown[]) => item('ART-SELF', 'Self', { annotations })

test('an annotation on a published concept reaches the reader', () => {
  const out = readerAnnotations(annotated([
    { id: 'a1', quote: 'the volume ejected in one minute', conceptId: 'med.concept.cardiac-output', relation: 'definition_of', block: 'body' },
  ]), graph)
  assert.equal(out.length, 1)
  assert.equal(out[0].conceptLabel, 'Cardiac output')
  assert.equal(out[0].block, 'body')
})

test('an annotation pointing at an unpublished concept is hidden', () => {
  const out = readerAnnotations(annotated([
    { id: 'a1', quote: 'anything', conceptId: 'med.concept.draft', relation: 'definition_of', block: 'body' },
  ]), graph)
  assert.deepEqual(out, [])
})

test('an annotation pointing at a missing concept is hidden', () => {
  const out = readerAnnotations(annotated([
    { id: 'a1', quote: 'anything', conceptId: 'med.concept.gone', relation: 'definition_of', block: 'body' },
  ]), graph)
  assert.deepEqual(out, [])
})

test('no raw concept ID or relation name is exposed as display text', () => {
  const [out] = readerAnnotations(annotated([
    { id: 'a1', quote: 'the volume ejected in one minute', conceptId: 'med.concept.cardiac-output', relation: 'definition_of', block: 'body' },
  ]), graph)
  // The reader renders `quote` and `conceptLabel`. `conceptId` is carried for
  // navigation only and must never be the visible string.
  assert.equal(out.quote, 'the volume ejected in one minute')
  assert.equal(out.conceptLabel, 'Cardiac output')
  assert.notEqual(out.conceptLabel, out.conceptId)
  assert.equal('relation' in out, false)
})

test('duplicate quotes collapse so one phrase is not marked twice', () => {
  const out = readerAnnotations(annotated([
    { id: 'a1', quote: 'same words', conceptId: 'med.concept.cardiac-output', relation: 'definition_of', block: 'body' },
    { id: 'a2', quote: 'same words', conceptId: 'med.concept.cardiac-output', relation: 'is_a', block: 'body' },
  ]), graph)
  assert.equal(out.length, 1)
})

test('a section keeps its id when an earlier section is inserted', () => {
  const before = parseSections('### Definition\nA.\n### Mechanism\nB.', 'art-x')
  const after = parseSections('### Overview\nNew.\n### Definition\nA.\n### Mechanism\nB.', 'art-x')
  // Positional ids would renumber here, and every span pointing at the old
  // `sec-1` would silently start describing different prose.
  assert.equal(before[1].id, 'art-x-mechanism')
  assert.equal(after[2].id, 'art-x-mechanism')
  assert.equal(after[0].id, 'art-x-overview')
})

test('two sections sharing a heading still get distinct ids', () => {
  const sections = parseSections('### Notes\nA.\n### Notes\nB.', 'art-x')
  assert.deepEqual(sections.map((s) => s.id), ['art-x-notes', 'art-x-notes-2'])
})

test('a span reaches its section without the article naming it back', () => {
  // Spans are imported after the article that contains them, so an article row
  // cannot name span ids that do not exist yet. Membership therefore has to be
  // derived from the span, or every imported article reads as unsourced draft.
  const evidence = {
    claims: [], citations: [], resources: [], merges: [], coverage: [],
    articleSpans: [
      { id: 'SPN-1', articleId: 'ART-X', sectionId: 'art-x-definition', textHash: '', text: 'A sourced sentence.', claimIds: ['CLM-1'], citationIds: ['CIT-1'] },
      { id: 'SPN-2', articleId: 'ART-Y', sectionId: 'art-y-definition', textHash: '', text: 'Another article.', claimIds: [], citationIds: [] },
    ],
  } as unknown as MedicalEvidenceStore
  const spans = sectionSpans('ART-X', { id: 'art-x-definition' }, evidence)
  assert.deepEqual(spans.map((s) => s.id), ['SPN-1'])
  assert.deepEqual(sectionSpans('ART-X', { id: 'art-x-other' }, evidence), [])
})

test('a trap is offered once, for the reader panel, and not also appended to the body', () => {
  // Regression: traps were pushed into `blocks` as warning callouts *and*
  // returned on `traps`, so every "Where people lose the mark" line printed
  // twice — once tacked onto the end of the article, once in its own panel.
  const article = item('ART-TRAP', 'Coronary sinus', {
    sections: [{ heading: 'Anatomy', body: 'The coronary sinus is the main cardiac vein.' }],
    loseTheMark: ['Do not confuse the sinus with the sulcus.'],
  })
  const projected = articleToSubtopic(article, emptyMedicalEvidenceStore(), { concepts: [], relations: [] } as ConceptGraph, readable)

  assert.deepEqual(projected.traps, ['Do not confuse the sinus with the sulcus.'])
  const warnings = projected.blocks.filter((block) => block.type === 'callout' && block.tone === 'warning')
  assert.deepEqual(warnings, [], 'traps must not also be emitted as body callouts')
})

test('an overlaid article with an edited body does not repeat its traps either', () => {
  const seeded = {
    id: 'sub-1', title: 'Seeded', readingMin: 5, summary: '', blocks: [], keyPoints: [], questions: [], media: [],
  } as unknown as Parameters<typeof overlaySubtopic>[0]
  const overlay = item('ART-OVER', 'Overlaid', {
    sections: [{ heading: 'Anatomy', body: 'Edited body text.' }],
    loseTheMark: ['The sulcus is the groove, not the vein.'],
  })
  const projected = overlaySubtopic(seeded, overlay, emptyMedicalEvidenceStore(), { concepts: [], relations: [] } as ConceptGraph, readable)

  assert.deepEqual(projected.traps, ['The sulcus is the groove, not the vein.'])
  assert.deepEqual(projected.blocks.filter((block) => block.type === 'callout' && block.tone === 'warning'), [])
})

test('prose reaching the reader has the typography the rest of the page uses', () => {
  const article = item('ART-QUOTE', 'Palpitations', {
    sections: [{ heading: 'History', body: 'She says her heart keeps "jumping".' }],
  })
  const projected = articleToSubtopic(article, emptyMedicalEvidenceStore(), { concepts: [], relations: [] } as ConceptGraph, readable)
  const paragraph = projected.blocks.find((block) => block.type === 'p')
  assert.equal(paragraph?.text, 'She says her heart keeps “jumping”.')
})
