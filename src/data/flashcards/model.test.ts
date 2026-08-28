import { test } from 'node:test'
import assert from 'node:assert/strict'
import { noteAudio, type BasicNote, type ClozeNote, type ImageOcclusionNote, type Note } from './model.ts'
import { generateCards } from './generate.ts'

const basicWithAudio: BasicNote = {
  id: 'n1', type: 'basic', deckId: 'd1', tags: [], createdAt: '', updatedAt: '',
  fields: { front: 'Q', back: 'A', audio: 'synapse-media:audio1' },
}
const clozeWithAudio: ClozeNote = {
  id: 'n2', type: 'cloze', deckId: 'd1', tags: [], createdAt: '', updatedAt: '',
  fields: { text: '{{c1::a}}', extra: '', audio: 'synapse-media:audio2' },
}
const basicNoAudio: BasicNote = {
  id: 'n3', type: 'basic', deckId: 'd1', tags: [], createdAt: '', updatedAt: '',
  fields: { front: 'Q', back: 'A' },
}
const clozeNoAudio: ClozeNote = {
  id: 'n4', type: 'cloze', deckId: 'd1', tags: [], createdAt: '', updatedAt: '',
  fields: { text: '{{c1::a}}', extra: '' },
}
const occ: ImageOcclusionNote = {
  id: 'n5', type: 'image-occlusion', deckId: 'd1', tags: [], createdAt: '', updatedAt: '',
  image: 'synapse-media:img', imageWidth: 100, imageHeight: 100, mode: 'hide-all',
  occluders: [{ id: 'o1', shape: { kind: 'rect', x: 0, y: 0, w: 10, h: 10 }, label: '' }],
  groups: [],
  fields: { header: '', back: '' },
}

test('noteAudio returns the ref for a Basic note with fields.audio set', () => {
  assert.equal(noteAudio(basicWithAudio), 'synapse-media:audio1')
})

test('noteAudio returns the ref for a Cloze note with fields.audio set', () => {
  assert.equal(noteAudio(clozeWithAudio), 'synapse-media:audio2')
})

test('noteAudio returns undefined for a Basic/Cloze note without audio', () => {
  assert.equal(noteAudio(basicNoAudio), undefined)
  assert.equal(noteAudio(clozeNoAudio), undefined)
})

test('noteAudio returns undefined for an ImageOcclusionNote', () => {
  assert.equal(noteAudio(occ), undefined)
})

test('back-compat: a Basic note without the audio field is still assignable to Note', () => {
  // No `audio` key at all — exercises that the field is genuinely optional,
  // not just permitted to be undefined, and that legacy note objects still
  // satisfy the type.
  const legacy: Note = {
    id: 'n6', type: 'basic', deckId: 'd1', tags: [], createdAt: '', updatedAt: '',
    fields: { front: 'Q', back: 'A' },
  }
  assert.equal(noteAudio(legacy), undefined)
})

test('audio does not affect card identity: same cards with or without it', () => {
  const withAudio: BasicNote = {
    id: 'n7', type: 'basic', deckId: 'd1', tags: [], createdAt: '', updatedAt: '',
    fields: { front: 'Q', back: 'A', audio: 'synapse-media:audio3' },
  }
  const withoutAudio: BasicNote = {
    id: 'n7', type: 'basic', deckId: 'd1', tags: [], createdAt: '', updatedAt: '',
    fields: { front: 'Q', back: 'A' },
  }
  const cardsWithAudio = generateCards(withAudio)
  const cardsWithoutAudio = generateCards(withoutAudio)
  assert.equal(cardsWithAudio.length, cardsWithoutAudio.length)
  assert.deepEqual(
    cardsWithAudio.map((c) => ({ id: c.id, templateKey: c.templateKey })),
    cardsWithoutAudio.map((c) => ({ id: c.id, templateKey: c.templateKey })),
  )
})
