#!/usr/bin/env node
/**
 * Builds the tiny `.apkg`/`.colpkg` fixtures consumed by
 * `src/lib/anki/container.test.ts`. Real Anki is not available in this
 * environment, so every byte here is produced by hand:
 *
 *  - The SQLite payloads come from `sql.js` (same wasm build the app itself
 *    uses via `src/lib/anki/sqljs.ts`).
 *  - The zip container comes from `fflate`'s `zipSync`.
 *  - The MODERN fixture needs a real `.anki21b`, which is a zstd-compressed
 *    SQLite file. `fzstd` (the runtime dependency) is decompress-only — it
 *    cannot produce zstd frames, and there is no zstd encoder in this
 *    project's dependency tree. Rather than shell out to a system `zstd`
 *    binary (not guaranteed to exist, and this generator should be
 *    reproducible anywhere `npm ci` runs), we hand-craft a MINIMAL VALID
 *    zstd frame ourselves: one "Raw_Block" (block type 0), which per the
 *    zstd frame format (https://datatracker.ietf.org/doc/html/rfc8878)
 *    stores its payload byte-for-byte with no entropy coding at all. A
 *    conformant decoder — including `fzstd`, verified below — reproduces
 *    the exact original bytes from it. This is not a compressor; it is the
 *    zstd container format used with the identity transform, which is a
 *    real, spec-legal degenerate case (see `zstdFrameRaw` for the byte
 *    layout, derived by reading `fzstd`'s frame/block parser directly).
 *
 * Every frame this script builds is round-tripped through the actual
 * `fzstd.decompress` before being written to disk, so a mistake in the
 * hand-rolled framing fails the generator instead of silently producing a
 * bad fixture.
 */

import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import initSqlJs from 'sql.js'
import { zipSync, strToU8 } from 'fflate'
import { decompress as zstdDecompress } from 'fzstd'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const FIXTURES_DIR = join(ROOT, 'src/lib/anki/__fixtures__')

const REAL_DB_SENTINEL = 'ANKI_CONTAINER_TEST_SENTINEL_REAL_DB'

// ---------------------------------------------------------------------------
// zstd framing (encode side; see file header for why this is hand-rolled)
// ---------------------------------------------------------------------------

/**
 * Wraps `payload` in the smallest legal zstd frame that decodes back to
 * exactly `payload`: a magic number, a frame header declaring
 * "single segment" mode with a 4-byte content size, and one Raw (type 0)
 * block carrying `payload` verbatim, flagged as the last block.
 *
 * Byte layout (all fields little-endian), reverse-engineered against
 * `node_modules/fzstd/lib/index.js`'s `rzfh` (frame header) and `rzb`
 * (block header) readers so it is guaranteed to satisfy that exact parser:
 *
 *   [0..3]   magic:        0x28 0xB5 0x2F 0xFD
 *   [4]      frame desc:   0xA0 = Single_Segment_Flag(bit5)=1,
 *                                 Frame_Content_Size_Flag(bits6-7)=2
 *                                 (=> 4-byte content size, no window
 *                                 descriptor byte, no dictionary, no
 *                                 checksum)
 *   [5..8]   content size: payload.length, uint32 LE
 *   [9]      block header byte 0: bit0=Last_Block(1), bits1-2=Block_Type(00
 *                                 = Raw_Block), bits3-7 = low 5 bits of
 *                                 Block_Size
 *   [10]     block header byte 1: bits 5..12 of Block_Size
 *   [11]     block header byte 2: bits 13..20 of Block_Size
 *   [12..]   payload bytes, verbatim (Block_Size of them)
 *
 * Block_Size is a 21-bit field (max ~2 MiB), which is far more than this
 * generator ever needs for these sub-20KB fixtures.
 */
function zstdFrameRaw(payload) {
  const size = payload.length
  const MAX_RAW_BLOCK_SIZE = (1 << 21) - 1
  if (size > MAX_RAW_BLOCK_SIZE) {
    throw new Error(`payload too large for a single zstd raw block: ${size} bytes`)
  }

  const header = new Uint8Array(9)
  header.set([0x28, 0xb5, 0x2f, 0xfd], 0)
  header[4] = 0xa0
  header[5] = size & 0xff
  header[6] = (size >>> 8) & 0xff
  header[7] = (size >>> 16) & 0xff
  header[8] = (size >>> 24) & 0xff

  const blockHeader = new Uint8Array(3)
  blockHeader[0] = (1 | ((size & 0x1f) << 3)) & 0xff
  blockHeader[1] = (size >>> 5) & 0xff
  blockHeader[2] = (size >>> 13) & 0xff

  const frame = new Uint8Array(header.length + blockHeader.length + payload.length)
  frame.set(header, 0)
  frame.set(blockHeader, header.length)
  frame.set(payload, header.length + blockHeader.length)
  return frame
}

/** Round-trips `payload` through the real `fzstd` decoder; throws on mismatch. */
function assertZstdRoundTrips(payload, label) {
  const frame = zstdFrameRaw(payload)
  const decoded = zstdDecompress(frame)
  if (decoded.length !== payload.length || !decoded.every((b, i) => b === payload[i])) {
    throw new Error(`zstd frame for ${label} did not round-trip through fzstd.decompress`)
  }
  return frame
}

// ---------------------------------------------------------------------------
// minimal protobuf varint encoding (for the modern media map)
// ---------------------------------------------------------------------------

function encodeVarint(value) {
  const bytes = []
  let v = value >>> 0
  do {
    let b = v & 0x7f
    v >>>= 7
    if (v !== 0) b |= 0x80
    bytes.push(b)
  } while (v !== 0)
  return Uint8Array.from(bytes)
}

function concatBytes(chunks) {
  const total = chunks.reduce((n, c) => n + c.length, 0)
  const out = new Uint8Array(total)
  let offset = 0
  for (const c of chunks) {
    out.set(c, offset)
    offset += c.length
  }
  return out
}

/**
 * Hand-encodes the minimal media-map protobuf the container reader expects:
 * a flat stream of (field 1 = index varint, field 2 = name string) pairs,
 * one pair per media entry, in order. This is a project-internal minimal
 * scheme (see task brief), not a claim of bit-compatibility with real
 * Anki's media manifest proto.
 */
function encodeMediaMap(entries) {
  const chunks = []
  for (const { index, name } of entries) {
    // field 1, wire type 0 (varint): tag = (1 << 3) | 0
    chunks.push(encodeVarint((1 << 3) | 0))
    chunks.push(encodeVarint(index))
    // field 2, wire type 2 (length-delimited): tag = (2 << 3) | 2
    const nameBytes = strToU8(name)
    chunks.push(encodeVarint((2 << 3) | 2))
    chunks.push(encodeVarint(nameBytes.length))
    chunks.push(nameBytes)
  }
  return concatBytes(chunks)
}

// ---------------------------------------------------------------------------
// sqlite helpers
// ---------------------------------------------------------------------------

async function loadSqlJs() {
  const wasmPath = fileURLToPath(new URL('../../node_modules/sql.js/dist/sql-wasm.wasm', import.meta.url))
  return initSqlJs({ locateFile: () => wasmPath })
}

function buildLegacySqlite(SQL) {
  const db = new SQL.Database()
  db.run(`
    CREATE TABLE col (id INTEGER PRIMARY KEY, ver INTEGER);
    CREATE TABLE notes (id INTEGER PRIMARY KEY, flds TEXT);
    INSERT INTO col (id, ver) VALUES (1, 11);
    INSERT INTO notes (id, flds) VALUES (1, 'Legacy front\x1fLegacy back');
  `)
  const bytes = db.export()
  db.close()
  return bytes
}

function buildModernRealSqlite(SQL) {
  const db = new SQL.Database()
  db.run(`
    CREATE TABLE col (id INTEGER PRIMARY KEY, ver INTEGER);
    CREATE TABLE notes (id INTEGER PRIMARY KEY, flds TEXT);
    INSERT INTO col (id, ver) VALUES (1, 18);
    INSERT INTO notes (id, flds) VALUES (1, '${REAL_DB_SENTINEL}');
  `)
  const bytes = db.export()
  db.close()
  return bytes
}

function buildModernDecoySqlite(SQL) {
  // The one-row "you need a newer Anki" warning DB modern .apkg/.colpkg
  // files ship as `collection.anki2` so that pre-2.1.50 clients open
  // something sane instead of crashing. It must NOT contain the real-db
  // sentinel — that's exactly what the container reader test asserts.
  const db = new SQL.Database()
  db.run(`
    CREATE TABLE col (id INTEGER PRIMARY KEY, ver INTEGER);
    CREATE TABLE notes (id INTEGER PRIMARY KEY, flds TEXT);
    INSERT INTO col (id, ver) VALUES (1, 11);
    INSERT INTO notes (id, flds) VALUES (1, 'This file requires a newer version of Anki.');
  `)
  const bytes = db.export()
  db.close()
  return bytes
}

// ---------------------------------------------------------------------------
// fixture assembly
// ---------------------------------------------------------------------------

// A few bytes standing in for "a tiny image" — only the PNG signature, no
// actual pixel data. Tests only assert non-empty bytes under the right name.
const PNG_BYTES = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

async function buildLegacyApkg(SQL) {
  const sqlite = buildLegacySqlite(SQL)
  const zip = zipSync({
    'collection.anki2': sqlite,
    media: strToU8(JSON.stringify({ '0': 'a.png' })),
    0: PNG_BYTES,
  })
  return zip
}

async function buildModernPackage(SQL) {
  const realSqlite = buildModernRealSqlite(SQL)
  const decoySqlite = buildModernDecoySqlite(SQL)

  const anki21b = assertZstdRoundTrips(realSqlite, 'collection.anki21b (real db)')

  const mediaMapProto = encodeMediaMap([{ index: 0, name: 'a.png' }])
  const mediaZstd = assertZstdRoundTrips(mediaMapProto, 'media map protobuf')

  // Exercise the "media asset bytes may themselves be zstd-framed" path too.
  const assetZstd = assertZstdRoundTrips(PNG_BYTES, 'media asset 0 (a.png)')

  const zip = zipSync({
    'collection.anki21b': anki21b,
    'collection.anki2': decoySqlite, // decoy — must never be the one returned
    media: mediaZstd,
    0: assetZstd,
  })
  return zip
}

async function main() {
  const SQL = await loadSqlJs()
  await mkdir(FIXTURES_DIR, { recursive: true })

  const legacyZip = await buildLegacyApkg(SQL)
  const modernZip = await buildModernPackage(SQL)

  const targets = [
    ['legacy.apkg', legacyZip],
    ['modern.apkg', modernZip],
    // A .colpkg is the same modern container format under a different
    // conventional filename (full-collection export vs. deck export).
    ['collection.colpkg', modernZip],
  ]

  for (const [name, bytes] of targets) {
    const path = join(FIXTURES_DIR, name)
    await writeFile(path, bytes)
    const kb = (bytes.length / 1024).toFixed(2)
    console.log(`wrote ${path} (${kb} KB)`)
    if (bytes.length >= 20 * 1024) {
      throw new Error(`${name} is ${kb} KB, must stay under 20 KB`)
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
