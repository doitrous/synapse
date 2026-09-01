import { test } from 'node:test'
import assert from 'node:assert/strict'
import { materializeMedia, type UploadDoc } from './media.ts'
import type { MappedImport } from './mapper.ts'
import type { AnkiContainer } from './container.ts'
import type { BasicNote, ClozeNote } from '../../data/flashcards/model.ts'

const NOW_ISO = '2026-08-29T00:00:00.000Z'

function basicNote(front: string, back: string): BasicNote {
  return {
    id: 'note-1',
    type: 'basic',
    deckId: 'deck-1',
    tags: [],
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
    fields: { front, back },
  }
}

function container(entries: { ankiName: string; bytes: Uint8Array }[]): AnkiContainer {
  return { sqlite: new Uint8Array(), media: entries, format: 'modern' }
}

function mappedFrom(note: BasicNote | ClozeNote, mediaRefsNeeded: string[]): MappedImport {
  return {
    decks: [{ id: 'deck-1', name: 'D', createdAt: NOW_ISO }],
    notes: [note],
    mediaRefsNeeded,
    report: { decks: 1, notes: 1, cards: 1, mediaRefs: 0, approximations: [] },
  }
}

/** Records upload calls; returns doc-<filename> so refs are predictable. */
function recordingUpload(): { fn: UploadDoc; files: string[] } {
  const files: string[] = []
  const fn: UploadDoc = async (file) => {
    files.push(file.name)
    return `doc-${file.name}`
  }
  return { fn, files }
}

test('materializeMedia: rewrites <img src> to a nishany-doc ref and uploads the asset', async () => {
  const note = basicNote('Q <img src="a.png">', 'plain back')
  const mapped = mappedFrom(note, ['a.png'])
  const { fn, files } = recordingUpload()

  const { notes, report } = await materializeMedia(mapped, container([{ ankiName: 'a.png', bytes: Uint8Array.from([1, 2, 3]) }]), fn)

  const out = notes[0] as BasicNote
  assert.match(out.fields.front, /<img[^>]+src="nishany-doc:doc-a\.png"/)
  assert.deepEqual(files, ['a.png'])
  assert.equal(report.mediaRefs, 1)
})

test('materializeMedia: [sound:x] becomes the note audio ref and leaves the text clean', async () => {
  const note = basicNote('front', 'Answer [sound:s.mp3]')
  const mapped = mappedFrom(note, ['s.mp3'])
  const { fn } = recordingUpload()

  const { notes } = await materializeMedia(mapped, container([{ ankiName: 's.mp3', bytes: Uint8Array.from([9]) }]), fn)

  const out = notes[0] as BasicNote
  assert.equal(out.fields.audio, 'nishany-doc:doc-s.mp3')
  assert.doesNotMatch(out.fields.back, /\[sound:/)
})

test('materializeMedia: an <img> whose asset is missing is dropped by sanitize (not left dangling)', async () => {
  const note = basicNote('Q <img src="missing.png">', 'back')
  const mapped = mappedFrom(note, ['missing.png'])
  const { fn, files } = recordingUpload()

  // Container has no such asset, so nothing is uploaded and the img keeps its
  // non-reference src, which sanitizeRich strips.
  const { notes } = await materializeMedia(mapped, container([]), fn)

  const out = notes[0] as BasicNote
  assert.doesNotMatch(out.fields.front, /<img/)
  assert.deepEqual(files, [])
})

test('materializeMedia: uploads each asset once even if referenced twice', async () => {
  const note = basicNote('<img src="a.png"> and again <img src="a.png">', 'b')
  const mapped = mappedFrom(note, ['a.png'])
  const { fn, files } = recordingUpload()

  const { notes } = await materializeMedia(mapped, container([{ ankiName: 'a.png', bytes: Uint8Array.from([1]) }]), fn)

  assert.deepEqual(files, ['a.png'])
  const out = notes[0] as BasicNote
  const matches = out.fields.front.match(/nishany-doc:doc-a\.png/g) ?? []
  assert.equal(matches.length, 2)
})

test('materializeMedia: reports when a note carries more than one audio clip', async () => {
  const note = basicNote('[sound:one.mp3]', '[sound:two.mp3]')
  const mapped = mappedFrom(note, ['one.mp3', 'two.mp3'])
  const { fn } = recordingUpload()

  const { notes, report } = await materializeMedia(
    mapped,
    container([
      { ankiName: 'one.mp3', bytes: Uint8Array.from([1]) },
      { ankiName: 'two.mp3', bytes: Uint8Array.from([2]) },
    ]),
    fn,
  )

  const out = notes[0] as BasicNote
  assert.equal(out.fields.audio, 'nishany-doc:doc-one.mp3')
  assert.ok(report.approximations.some((a) => /more than one audio/i.test(a)))
})

test('materializeMedia: cloze note media is rewritten in text/extra', async () => {
  const cloze: ClozeNote = {
    id: 'note-1',
    type: 'cloze',
    deckId: 'deck-1',
    tags: [],
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
    fields: { text: '{{c1::x}} <img src="a.png">', extra: '' },
  }
  const mapped = mappedFrom(cloze, ['a.png'])
  const { fn } = recordingUpload()

  const { notes } = await materializeMedia(mapped, container([{ ankiName: 'a.png', bytes: Uint8Array.from([1]) }]), fn)

  const out = notes[0] as ClozeNote
  assert.match(out.fields.text, /\{\{c1::x\}\}/)
  assert.match(out.fields.text, /nishany-doc:doc-a\.png/)
})
