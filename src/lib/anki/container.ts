/**
 * Reads the container format of a `.apkg`/`.colpkg` Anki package: unzips the
 * archive, picks the right SQLite collection out of it, and normalizes the
 * media map to a flat list of (name, bytes) entries.
 *
 * `.apkg`/`.colpkg` are ZIP archives with two generations of internal
 * layout:
 *
 *  - LEGACY (schema <= v11, pre Anki 2.1.50): `collection.anki2` is a plain
 *    (uncompressed) SQLite database. The media map is a small JSON text
 *    entry named `media`, e.g. `{"0":"a.png"}`, and the assets themselves
 *    are zip entries named by their numeric index (`0`, `1`, ...).
 *
 *  - MODERN (Anki 2.1.50+): the real database ships as `collection.anki21b`,
 *    which is a zstd-COMPRESSED SQLite file (or `collection.anki21`,
 *    uncompressed, on some exports). A `collection.anki2` entry is still
 *    present, but it is a DECOY: a one-row "you need a newer Anki" warning
 *    database, present only so old clients don't crash outright. It must
 *    never be the DB this module returns when a `.anki21b`/`.anki21` entry
 *    exists. The media map is a zstd-compressed, protobuf-encoded message
 *    (not JSON), and the numbered asset entries may themselves be
 *    zstd-framed.
 *
 * `.colpkg` (full collection export/import) uses the same modern-generation
 * layout as `.apkg`; there is no separate container format to handle.
 */

import { unzipSync, strFromU8 } from 'fflate'
import { decompress as zstdDecompress } from 'fzstd'

export interface AnkiMediaEntry {
  ankiName: string
  bytes: Uint8Array
}

export interface AnkiContainer {
  sqlite: Uint8Array
  media: AnkiMediaEntry[]
  format: 'legacy' | 'modern'
}

const ZSTD_MAGIC = [0x28, 0xb5, 0x2f, 0xfd]

function looksLikeZstdFrame(bytes: Uint8Array): boolean {
  return (
    bytes.length >= 4 &&
    bytes[0] === ZSTD_MAGIC[0] &&
    bytes[1] === ZSTD_MAGIC[1] &&
    bytes[2] === ZSTD_MAGIC[2] &&
    bytes[3] === ZSTD_MAGIC[3]
  )
}

function decompressIfZstdFramed(bytes: Uint8Array): Uint8Array {
  return looksLikeZstdFrame(bytes) ? zstdDecompress(bytes) : bytes
}

// ---------------------------------------------------------------------------
// minimal protobuf reader for the modern media manifest
//
// The manifest is a `MediaEntries` message (Anki's own schema, from
// `proto/anki/import_export.proto`):
//
//   message MediaEntries {
//     message MediaEntry {
//       string name = 1;
//       uint32 size = 2;
//       bytes  sha1 = 3;
//       optional uint32 legacy_zip_filename = 255;
//     }
//     repeated MediaEntry entries = 1;
//   }
//
// It is a TWO-LEVEL message: the top level repeats field 1 (wire type 2), each
// occurrence a serialized `MediaEntry` submessage. Media asset files inside the
// zip are named by their 0-based index into `entries` (or `legacy_zip_filename`
// when present — legacy imports may have gaps), and `name` is the original
// filename. We only need `name` and the zip index; `size`/`sha1`/any future
// field is skipped generically. No protobuf library is used.
// ---------------------------------------------------------------------------

interface VarintResult {
  value: number
  offset: number
}

/**
 * Reads a single base-128 varint starting at `offset`. Uses multiplication
 * rather than `<<` so values above 2^31 (a real `uint32` size, say) decode
 * correctly instead of overflowing a 32-bit shift.
 */
function readVarint(bytes: Uint8Array, offset: number): VarintResult {
  let result = 0
  let shift = 0
  let pos = offset
  for (;;) {
    if (pos >= bytes.length) throw new Error('readVarint: unexpected end of buffer')
    const byte = bytes[pos]
    pos++
    result += (byte & 0x7f) * 2 ** shift
    if ((byte & 0x80) === 0) break
    shift += 7
    if (shift > 63) throw new Error('readVarint: varint too long')
  }
  return { value: result, offset: pos }
}

/** Advances past one field's value given its wire type (generic unknown-field skip). */
function skipField(bytes: Uint8Array, offset: number, wireType: number): number {
  switch (wireType) {
    case 0:
      return readVarint(bytes, offset).offset
    case 1:
      return offset + 8
    case 5:
      return offset + 4
    case 2: {
      const len = readVarint(bytes, offset)
      const end = len.offset + len.value
      if (end > bytes.length) throw new Error('skipField: length-delimited field overruns buffer')
      return end
    }
    default:
      throw new Error(`skipField: unsupported wire type ${wireType}`)
  }
}

interface ParsedMediaEntry {
  name: string | null
  legacyZipFilename: number | null
}

/** Parses one `MediaEntry` submessage: field 1 = name, field 255 = legacy_zip_filename; skips the rest. */
function parseMediaEntry(bytes: Uint8Array): ParsedMediaEntry {
  let offset = 0
  let name: string | null = null
  let legacyZipFilename: number | null = null
  while (offset < bytes.length) {
    const tag = readVarint(bytes, offset)
    offset = tag.offset
    const fieldNumber = Math.floor(tag.value / 8)
    const wireType = tag.value % 8
    if (fieldNumber === 1 && wireType === 2) {
      const len = readVarint(bytes, offset)
      offset = len.offset
      const end = offset + len.value
      if (end > bytes.length) throw new Error('parseMediaEntry: name overruns buffer')
      name = strFromU8(bytes.subarray(offset, end))
      offset = end
    } else if (fieldNumber === 255 && wireType === 0) {
      const v = readVarint(bytes, offset)
      offset = v.offset
      legacyZipFilename = v.value
    } else {
      offset = skipField(bytes, offset, wireType)
    }
  }
  return { name, legacyZipFilename }
}

/**
 * Decodes the modern media manifest (`MediaEntries`) into a map of zip-entry
 * name -> original filename — the same shape the legacy JSON map produces, so
 * the caller treats both package generations identically.
 */
function decodeMediaProtobuf(bytes: Uint8Array): Record<string, string> {
  const map: Record<string, string> = {}
  let offset = 0
  let index = 0
  while (offset < bytes.length) {
    const tag = readVarint(bytes, offset)
    offset = tag.offset
    const fieldNumber = Math.floor(tag.value / 8)
    const wireType = tag.value % 8
    if (fieldNumber === 1 && wireType === 2) {
      const len = readVarint(bytes, offset)
      offset = len.offset
      const end = offset + len.value
      if (end > bytes.length) throw new Error('decodeMediaProtobuf: entry overruns buffer')
      const entry = parseMediaEntry(bytes.subarray(offset, end))
      offset = end
      if (entry.name !== null) {
        const zipName = String(entry.legacyZipFilename ?? index)
        map[zipName] = entry.name
      }
      index++
    } else {
      offset = skipField(bytes, offset, wireType)
    }
  }
  return map
}

/** Parses the `media` zip entry as legacy JSON, or `undefined` if it isn't. */
function tryParseLegacyMediaMap(bytes: Uint8Array): Record<string, string> | undefined {
  let text: string
  try {
    text = strFromU8(bytes)
  } catch {
    return undefined
  }
  try {
    const parsed: unknown = JSON.parse(text)
    if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, string>
    }
    return undefined
  } catch {
    return undefined
  }
}

// ---------------------------------------------------------------------------
// database selection
// ---------------------------------------------------------------------------

interface SelectedDb {
  sqlite: Uint8Array
  format: 'legacy' | 'modern'
}

function selectDatabase(entries: Record<string, Uint8Array>): SelectedDb {
  const anki21b = entries['collection.anki21b']
  if (anki21b) {
    return { sqlite: zstdDecompress(anki21b), format: 'modern' }
  }

  const anki21 = entries['collection.anki21']
  if (anki21) {
    return { sqlite: anki21, format: 'modern' }
  }

  const anki2 = entries['collection.anki2']
  if (anki2) {
    return { sqlite: anki2, format: 'legacy' }
  }

  throw new Error('readAnkiPackage: no collection.anki21b/.anki21/.anki2 entry found in archive')
}

// ---------------------------------------------------------------------------
// public API
// ---------------------------------------------------------------------------

export async function readAnkiPackage(file: ArrayBuffer): Promise<AnkiContainer> {
  const entries = unzipSync(new Uint8Array(file))

  const { sqlite, format } = selectDatabase(entries)

  const mediaEntry = entries['media']
  const media: AnkiMediaEntry[] = []

  if (mediaEntry) {
    const legacyMap = tryParseLegacyMediaMap(mediaEntry)
    const mediaMap: Record<string, string> =
      legacyMap ?? decodeMediaProtobuf(decompressIfZstdFramed(mediaEntry))

    for (const [index, ankiName] of Object.entries(mediaMap)) {
      const assetEntry = entries[index]
      if (!assetEntry) continue
      const bytes = decompressIfZstdFramed(assetEntry)
      if (bytes.length === 0) continue
      media.push({ ankiName, bytes })
    }
  }

  return { sqlite, media, format }
}
