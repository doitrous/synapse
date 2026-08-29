/**
 * The media stage of an Anki import: uploads every referenced asset into the
 * student's My Documents (so it counts against their Resources allowance and
 * syncs across devices) and rewrites each note's field HTML from Anki's media
 * tokens to `synapse-doc:` references.
 *
 * Ordering matters. The mapper deliberately left field HTML RAW — an
 * `<img src="a.png">` still points at the zip's asset name, and `sanitizeRich`
 * would strip such an `<img>` (its src is not a media reference). So this stage
 * rewrites the tokens to real references FIRST and only THEN sanitizes; that is
 * the one place field HTML is sanitized on the import path.
 *
 * `uploadDoc` is injected (it is `useMyDocuments().upload`) so this module has
 * no dependency on the browser storage layer and stays unit-testable.
 */

import type { BasicNote, ClozeNote, Note } from '../../data/flashcards/model.ts'
import { sanitizeRich } from '../../data/flashcards/richText.ts'
import type { AnkiContainer } from './container.ts'
import type { ImportReport, MappedImport } from './mapper.ts'

// Mirrors mediaStorage.ts DOC_REFERENCE_PREFIX. Kept inline (not imported) so
// this module — and its tests — never pull in the browser-only mediaStorage.
const DOC_REFERENCE_PREFIX = 'synapse-doc:'

export type UploadDoc = (
  file: File,
  onProgress?: (fraction: number) => void,
  source?: { kind: 'resource'; id?: string },
) => Promise<string>

const MIME_BY_EXT: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  avif: 'image/avif',
  svg: 'image/svg+xml',
  mp3: 'audio/mpeg',
  ogg: 'audio/ogg',
  oga: 'audio/ogg',
  wav: 'audio/wav',
  m4a: 'audio/mp4',
  mp4: 'video/mp4',
  webm: 'video/webm',
}

function guessMime(name: string): string {
  const ext = name.slice(name.lastIndexOf('.') + 1).toLowerCase()
  return MIME_BY_EXT[ext] ?? 'application/octet-stream'
}

/**
 * Copies bytes into a fresh, ArrayBuffer-backed view. fflate/fzstd hand back
 * `Uint8Array<ArrayBufferLike>`, which the DOM `BlobPart`/`File` types reject
 * (they require an `ArrayBuffer`, not a possibly-shared buffer); a fresh
 * `Uint8Array` is `Uint8Array<ArrayBuffer>` and assigns cleanly.
 */
function toBlobPart(bytes: Uint8Array): BlobPart {
  const copy = new Uint8Array(bytes.byteLength)
  copy.set(bytes)
  return copy
}

const IMG_SRC_RE = /(<img\b[^>]*?\bsrc\s*=\s*)("([^"]*)"|'([^']*)')/gi
const SOUND_RE = /\[sound:([^\]]+)\]/gi

/** Replaces an `<img src="ankiName">` with the uploaded `synapse-doc:` ref; leaves unknown imgs alone. */
function rewriteImgSrc(html: string, refByName: Map<string, string>): string {
  return html.replace(IMG_SRC_RE, (full, pre: string, _quoted: string, dq?: string, sq?: string) => {
    const name = dq ?? sq ?? ''
    const ref = refByName.get(name)
    return ref ? `${pre}"${ref}"` : full
  })
}

interface SoundResult {
  html: string
  audioRef?: string
  count: number
}

/** Strips `[sound:x]` tokens from display text, returning the first resolved ref as the note's audio. */
function extractSounds(html: string, refByName: Map<string, string>): SoundResult {
  let audioRef: string | undefined
  let count = 0
  const stripped = html.replace(SOUND_RE, (_full, name: string) => {
    count += 1
    const ref = refByName.get(name.trim())
    if (ref && !audioRef) audioRef = ref
    return '' // sound tokens are markup, never shown as text
  })
  return { html: stripped, audioRef, count }
}

function rewriteField(html: string, refByName: Map<string, string>): { html: string; audioRef?: string; sounds: number } {
  const withImgs = rewriteImgSrc(html, refByName)
  const { html: cleaned, audioRef, count } = extractSounds(withImgs, refByName)
  return { html: sanitizeRich(cleaned), audioRef, sounds: count }
}

export async function materializeMedia(
  mapped: MappedImport,
  container: AnkiContainer,
  uploadDoc: UploadDoc,
  onProgress?: (done: number, total: number) => void,
): Promise<{ notes: Note[]; report: ImportReport }> {
  const bytesByName = new Map(container.media.map((m) => [m.ankiName, m.bytes]))
  const refByName = new Map<string, string>()

  const needed = mapped.mediaRefsNeeded.filter((name) => bytesByName.has(name))
  let done = 0
  for (const name of needed) {
    const bytes = bytesByName.get(name)!
    const file = new File([toBlobPart(bytes)], name, { type: guessMime(name) })
    const id = await uploadDoc(file, undefined, { kind: 'resource' })
    refByName.set(name, `${DOC_REFERENCE_PREFIX}${id}`)
    done += 1
    onProgress?.(done, needed.length)
  }

  const approximations = [...mapped.report.approximations]
  const approxSeen = new Set(approximations)
  const addApprox = (msg: string) => {
    if (!approxSeen.has(msg)) {
      approxSeen.add(msg)
      approximations.push(msg)
    }
  }

  const notes = mapped.notes.map((note) => rewriteNote(note, refByName, addApprox))

  const report: ImportReport = { ...mapped.report, mediaRefs: refByName.size, approximations }
  return { notes, report }
}

function rewriteNote(note: Note, refByName: Map<string, string>, addApprox: (msg: string) => void): Note {
  if (note.type === 'basic') {
    const front = rewriteField(note.fields.front, refByName)
    const back = rewriteField(note.fields.back, refByName)
    const audio = front.audioRef ?? back.audioRef
    if (front.sounds + back.sounds > 1) {
      addApprox('Some notes had more than one audio clip; only the first was kept.')
    }
    const fields: BasicNote['fields'] = { front: front.html, back: back.html }
    if (audio) fields.audio = audio
    return { ...note, fields }
  }

  if (note.type === 'cloze') {
    const text = rewriteField(note.fields.text, refByName)
    const extra = rewriteField(note.fields.extra, refByName)
    const audio = text.audioRef ?? extra.audioRef
    if (text.sounds + extra.sounds > 1) {
      addApprox('Some notes had more than one audio clip; only the first was kept.')
    }
    const fields: ClozeNote['fields'] = { text: text.html, extra: extra.html }
    if (audio) fields.audio = audio
    return { ...note, fields }
  }

  return note
}
