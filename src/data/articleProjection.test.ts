import test from 'node:test'
import assert from 'node:assert/strict'
import { relatedArticleLinks, readerAnnotations, relatedReasonKey } from './articleProjection.ts'
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
