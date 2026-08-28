import test from 'node:test'
import assert from 'node:assert/strict'
import type { ManagedContentItem } from './contentControl.ts'
import { addContentTags, availableContentTags, contentTagsOf, normalizeContentTag, uniqueContentTags } from './contentTags.ts'

function item(id: string, editorialTags?: string[]): ManagedContentItem {
  return {
    id,
    kind: 'article',
    title: id,
    subjectId: 'cvs',
    status: 'Draft',
    owner: 'Editor',
    updatedAt: '2026-01-01T00:00:00.000Z',
    fields: {},
    editorialTags,
  }
}

test('normalizes visible whitespace and removes blank and case-insensitive duplicates', () => {
  assert.equal(normalizeContentTag('  Generated   - No Module  '), 'Generated - No Module')
  assert.deepEqual(uniqueContentTags(['Review', ' review ', '', 'Needs   image']), ['Review', 'Needs image'])
})

test('collects reusable tags across every content record with stable display labels', () => {
  assert.deepEqual(availableContentTags([
    item('one', ['Urgent', 'Generated - No Module']),
    { ...item('two', ['generated - no module', 'Faculty reviewed']), kind: 'question' },
  ]), ['Faculty reviewed', 'Generated - No Module', 'Urgent'])
})

test('bulk addition preserves existing labels and updates only changed records', () => {
  const before = item('one', ['Existing'])
  const changed = addContentTags(before, ['New label', ' existing '], '2026-02-01T00:00:00.000Z')
  assert.deepEqual(contentTagsOf(changed), ['Existing', 'New label'])
  assert.equal(changed.updatedAt, '2026-02-01T00:00:00.000Z')

  const unchanged = addContentTags(changed, ['new LABEL'], '2026-03-01T00:00:00.000Z')
  assert.equal(unchanged, changed)
})
