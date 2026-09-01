import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { readAnkiPackage } from './container.ts'
import { openDb } from './sqljs.ts'

const REAL_DB_SENTINEL = 'ANKI_CONTAINER_TEST_SENTINEL_REAL_DB'

function fixturePath(name: string): string {
  return fileURLToPath(new URL(`./__fixtures__/${name}`, import.meta.url))
}

async function loadFixture(name: string): Promise<ArrayBuffer> {
  const buf = await readFile(fixturePath(name))
  // Slice to a plain ArrayBuffer matching the exact bytes (Node's Buffer is
  // a view over a possibly-larger pooled ArrayBuffer).
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
}

test('readAnkiPackage: legacy.apkg — plain sqlite, JSON media map', async () => {
  const container = await readAnkiPackage(await loadFixture('legacy.apkg'))

  assert.equal(container.format, 'legacy')
  assert.ok(container.sqlite.length > 0, 'sqlite bytes should be non-empty')

  assert.equal(container.media.length, 1)
  assert.equal(container.media[0].ankiName, 'a.png')
  assert.ok(container.media[0].bytes.length > 0, 'media bytes should be non-empty')
})

test('readAnkiPackage: modern.apkg — zstd db, decoy avoided, protobuf media map', async () => {
  const container = await readAnkiPackage(await loadFixture('modern.apkg'))

  assert.equal(container.format, 'modern')
  assert.ok(container.sqlite.length > 0, 'sqlite bytes should be non-empty')

  assert.equal(container.media.length, 1)
  assert.equal(container.media[0].ankiName, 'a.png')
  assert.ok(container.media[0].bytes.length > 0, 'media bytes should be non-empty')

  const db = await openDb(container.sqlite)
  try {
    const rows = db.exec("SELECT flds FROM notes WHERE flds = '" + REAL_DB_SENTINEL + "'")
    assert.equal(rows.length, 1, 'the real db sentinel row should be present')
    assert.equal(rows[0].values.length, 1)

    const decoyRows = db.exec("SELECT flds FROM notes WHERE flds LIKE '%newer version of Anki%'")
    assert.equal(decoyRows.length, 0, 'the decoy warning row must not be present — decoy db was picked')
  } finally {
    db.close()
  }
})

test('readAnkiPackage: collection.colpkg — same modern layout as .apkg', async () => {
  const container = await readAnkiPackage(await loadFixture('collection.colpkg'))

  assert.equal(container.format, 'modern')
  assert.ok(container.sqlite.length > 0, 'sqlite bytes should be non-empty')

  assert.equal(container.media.length, 1)
  assert.equal(container.media[0].ankiName, 'a.png')
  assert.ok(container.media[0].bytes.length > 0, 'media bytes should be non-empty')

  const db = await openDb(container.sqlite)
  try {
    const rows = db.exec("SELECT flds FROM notes WHERE flds = '" + REAL_DB_SENTINEL + "'")
    assert.equal(rows.length, 1, 'the real db sentinel row should be present')
  } finally {
    db.close()
  }
})
