import assert from 'node:assert/strict'
import test from 'node:test'
import {
  editorJsonToPlainText,
  ensureNotebookEditor,
  normaliseNotebookEditorJson,
  plainTextToEditorJson,
  type Note,
  type NotebookEditorJson,
} from './notebook.ts'

test('legacy markdown is preserved but its formatting marks do not enter the readable editor', () => {
  const note: Note = {
    id: 'legacy', title: 'Legacy', body: '# Heading\n- Point\n> Quote', tags: [], updatedAt: '2026-01-01T00:00:00.000Z',
  }
  const migrated = ensureNotebookEditor(note)
  assert.equal(migrated.legacyMarkdownSource, note.body)
  assert.equal(editorJsonToPlainText(migrated.editorJson), 'Heading\nPoint\nQuote')
})

test('new text produces a Lexical-compatible serialised root', () => {
  const state = plainTextToEditorJson('First\nSecond')
  assert.equal(state.root.type, 'root')
  assert.equal(state.root.version, 1)
  assert.equal(state.root.children[0].type, 'paragraph')
  assert.equal(state.root.children[0].children?.[0].type, 'text')
  assert.equal(editorJsonToPlainText(state), 'First\nSecond')
})

test('the temporary block JSON migrates lazily without losing its words', () => {
  const old = {
    root: {
      type: 'root', version: 1,
      children: [
        { type: 'heading', version: 1, text: 'Clinical sequence' },
        { type: 'paragraph', version: 1, text: 'Assess airway first.' },
      ],
    },
  } as NotebookEditorJson
  const next = normaliseNotebookEditorJson(old)
  assert.equal(editorJsonToPlainText(next), 'Clinical sequence\nAssess airway first.')
  assert.ok(next.root.children.every((node) => Array.isArray(node.children)))
})
