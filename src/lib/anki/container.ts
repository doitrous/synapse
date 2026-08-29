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
// minimal protobuf varint reader (media map only needs fields 1 and 2)
// ---------------------------------------------------------------------------

interface VarintResult {
  value: number
  offset: number
}

/** Reads a single base-128 varint starting at `offset`. No lib, per brief. */
function readVarint(bytes: Uint8Array, offset: number): VarintResult {
  let result = 0
  let shift = 0
  let pos = offset
  for (;;) {
    if (pos >= bytes.length) throw new Error('readVarint: unexpected end of buffer')
    const byte = bytes[pos]
    pos++
    result |= (byte & 0x7f) << shift
    if ((byte & 0x80) === 0) break
    shift += 7
  }
  return { value: result >>> 0, offset: pos }
}

/**
 * Decodes the modern media map: a flat stream of tagged fields where field 1
 * (varint) is a media entry's numeric zip-index and field 2 (length-delimited
 * string) is its filename, one (index, name) pair per media entry, in order.
 * Returns the same shape as the legacy JSON map: index (as a string key) ->
 * filename.
 */
function decodeMediaProtobuf(bytes: Uint8Array): Record<string, string> {
  const map: Record<string, string> = {}
  let offset = 0
  let pendingIndex: number | null = null

  while (offset < bytes.length) {
    const tag = readVarint(bytes, offset)
    offset = tag.offset
    const fieldNumber = tag.value >>> 3
    const wireType = tag.value & 0x7

    if (wireType === 0) {
      // varint field
      const field = readVarint(bytes, offset)
      offset = field.offset
      if (fieldNumber === 1) pendingIndex = field.value
    } else if (wireType === 2) {
      // length-delimited field (string/bytes)
      const len = readVarint(bytes, offset)
      offset = len.offset
      const end = offset + len.value
      if (end > bytes.length) throw new Error('decodeMediaProtobuf: length-delimited field overruns buffer')
      const slice = bytes.subarray(offset, end)
      offset = end
      if (fieldNumber === 2) {
        if (pendingIndex === null) throw new Error('decodeMediaProtobuf: name field seen before index field')
        map[String(pendingIndex)] = strFromU8(slice)
        pendingIndex = null
      }
    } else {
      throw new Error(`decodeMediaProtobuf: unsupported wire type ${wireType}`)
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
