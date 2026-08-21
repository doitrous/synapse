import test from 'node:test'
import assert from 'node:assert/strict'
import { MEDIA_MIME_EXTENSION, imageMeta } from './imageMeta.js'

/** A minimal but real PNG header: signature, IHDR length/type, then 4+4 bytes. */
function png(width, height) {
  const buffer = Buffer.alloc(33)
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(buffer, 0)
  buffer.writeUInt32BE(13, 8)
  buffer.write('IHDR', 12)
  buffer.writeUInt32BE(width, 16)
  buffer.writeUInt32BE(height, 20)
  return buffer
}

/** JPEG: SOI, then an SOF0 frame carrying height then width, big-endian. */
function jpeg(width, height) {
  const buffer = Buffer.alloc(21)
  buffer.writeUInt16BE(0xffd8, 0)
  buffer.writeUInt16BE(0xffc0, 2)
  buffer.writeUInt16BE(17, 4)
  buffer.writeUInt8(8, 6)
  buffer.writeUInt16BE(height, 7)
  buffer.writeUInt16BE(width, 9)
  return buffer
}

function gif(width, height) {
  const buffer = Buffer.alloc(10)
  buffer.write('GIF89a', 0)
  buffer.writeUInt16LE(width, 6)
  buffer.writeUInt16LE(height, 8)
  return buffer
}

/** WebP VP8X, which states canvas size as two 24-bit values minus one. */
function webp(width, height) {
  const buffer = Buffer.alloc(30)
  buffer.write('RIFF', 0)
  buffer.write('WEBP', 8)
  buffer.write('VP8X', 12)
  buffer.writeUIntLE(width - 1, 24, 3)
  buffer.writeUIntLE(height - 1, 27, 3)
  return buffer
}

test('a PNG states its own size', () => {
  assert.deepEqual(imageMeta(png(1920, 1080)), { mimeType: 'image/png', width: 1920, height: 1080 })
})

test('a JPEG states its own size, height before width', () => {
  assert.deepEqual(imageMeta(jpeg(800, 600)), { mimeType: 'image/jpeg', width: 800, height: 600 })
})

test('a GIF states its size little-endian', () => {
  assert.deepEqual(imageMeta(gif(320, 240)), { mimeType: 'image/gif', width: 320, height: 240 })
})

test('a WebP states its canvas size minus one', () => {
  assert.deepEqual(imageMeta(webp(1024, 768)), { mimeType: 'image/webp', width: 1024, height: 768 })
})

test('anything that is not an image we accept is refused', () => {
  assert.equal(imageMeta(Buffer.from('%PDF-1.7 and then some more bytes')), null)
  assert.equal(imageMeta(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg">')), null, 'SVG can carry script')
  assert.equal(imageMeta(Buffer.alloc(0)), null)
  assert.equal(imageMeta(Buffer.from([0x89, 0x50])), null, 'truncated header')
  assert.equal(imageMeta(null), null)
})

test('an image with no area is refused, however well-formed its header', () => {
  assert.equal(imageMeta(png(0, 100)), null)
  assert.equal(imageMeta(gif(100, 0)), null)
})

test('every accepted type has an extension to store it under', () => {
  for (const mime of ['image/png', 'image/jpeg', 'image/gif', 'image/webp']) {
    assert.ok(MEDIA_MIME_EXTENSION[mime], mime)
  }
})
