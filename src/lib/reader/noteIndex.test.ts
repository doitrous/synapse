import { strict as assert } from 'node:assert'
import test from 'node:test'
import { dropNotes, upsertNotes, type NoteEntry } from './noteIndex.ts'
import type { AnnotationObject } from './annotations.ts'

function note(id: string, page: number, text: string): AnnotationObject {
  return { id, kind: 'note', page, z: 1, bbox: [0, 0, 1, 1], t: 0, r: [0, 0, 1, 1], tone: 'amber', text }
}

function textbox(id: string, page: number, text: string): AnnotationObject {
  return { id, kind: 'textbox', page, z: 1, bbox: [0, 0, 1, 1], t: 0, r: [0, 0, 1, 1], text, color: '#000', size: 0.02 }
}

function tape(id: string, page: number): AnnotationObject {
  return { id, kind: 'tape', page, z: 1, bbox: [0, 0, 1, 1], t: 0, r: [0, 0, 1, 1], tone: 'slate' }
}

function ink(id: string, page: number): AnnotationObject {
  return { id, kind: 'ink', page, z: 1, bbox: [0, 0, 1, 1], t: 0, tool: 'ball', color: '#000', w: 0.003, p: [0, 0] }
}

test('a note and a text box are indexed, ordered by page', () => {
  const index = upsertNotes([], [note('a', 9, 'ventricular septal defect'), textbox('b', 2, 'ejection fraction')])
  assert.deepEqual(index.map((entry) => entry.id), ['b', 'a'])
  assert.equal(index[0].kind, 'textbox')
})

test('tape and handwriting carry no searchable words', () => {
  assert.deepEqual(upsertNotes([], [tape('t', 1), ink('i', 1)]), [])
})

test('retyping a note replaces its entry rather than adding a second', () => {
  const first = upsertNotes([], [note('a', 3, 'mitral')])
  const second = upsertNotes(first, [note('a', 3, 'mitral stenosis')])
  assert.equal(second.length, 1)
  assert.equal(second[0].text, 'mitral stenosis')
})

test('clearing a note removes it, so search stops finding deleted words', () => {
  const before = upsertNotes([], [note('a', 3, 'mitral')])
  assert.deepEqual(upsertNotes(before, [note('a', 3, '   ')]), [])
})

test('moving a note to another page moves its entry with it', () => {
  const before = upsertNotes([], [note('a', 3, 'aortic')])
  const after = upsertNotes(before, [note('a', 40, 'aortic')])
  assert.equal(after[0].page, 40)
})

test('surrounding whitespace is not stored', () => {
  assert.equal(upsertNotes([], [note('a', 1, '  spaced  ')])[0].text, 'spaced')
})

test('dropping ids removes exactly those entries', () => {
  const index: NoteEntry[] = upsertNotes([], [note('a', 1, 'one'), note('b', 2, 'two')])
  assert.deepEqual(dropNotes(index, ['a']).map((entry) => entry.id), ['b'])
})

test('dropping nothing leaves the index as it was', () => {
  const index = upsertNotes([], [note('a', 1, 'one')])
  assert.deepEqual(dropNotes(index, []), index)
  assert.deepEqual(dropNotes(index, ['missing']), index)
})
