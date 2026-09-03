import { test } from 'node:test'
import assert from 'node:assert/strict'
import type { ManagedContentItem } from '@/data/contentControl'
import { questionLinksFrom, questionsKey } from './contentKeys.ts'

test('an unscoped key is stable and distinct from every narrowed one', () => {
  assert.equal(questionsKey(), questionsKey({}))
  assert.notEqual(questionsKey(), questionsKey({ subject: 'anat' }))
})

test('two scopes differing only in which field is set do not collide', () => {
  assert.notEqual(questionsKey({ subject: 'a' }), questionsKey({ module: 'a' }))
  assert.notEqual(questionsKey({ module: 'a' }), questionsKey({ topic: 'a' }))
  assert.notEqual(questionsKey({ topic: 'a' }), questionsKey({ format: 'a' }))
})

test('a format fan-out keys apart from the single format it contains', () => {
  assert.notEqual(questionsKey({ formats: ['essay', 'short_answer'] }), questionsKey({ format: 'essay' }))
  assert.equal(questionsKey({ formats: ['essay'] }), questionsKey({ formats: ['essay'] }))
})

const question = (id: string, libraryIds: string[]): ManagedContentItem => ({
  id, kind: 'question', title: `stem ${id}`, questionData: { libraryIds },
} as unknown as ManagedContentItem)

test('back-links are grouped by article and ignore everything that is not a question', () => {
  const links = questionLinksFrom([
    question('q1', ['a1', 'a2']),
    question('q2', ['a1']),
    { id: 'a1', kind: 'article', title: 'An article' } as ManagedContentItem,
  ])
  assert.deepEqual(links.a1, [{ id: 'q1', stem: 'stem q1' }, { id: 'q2', stem: 'stem q2' }])
  assert.deepEqual(links.a2, [{ id: 'q1', stem: 'stem q1' }])
})
