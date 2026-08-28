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

/** BMP: 14-byte file header, then a 40-byte BITMAPINFOHEADER carrying signed 32-bit dimensions. */
function bmp(width, height) {
  const buffer = Buffer.alloc(26)
  buffer.write('BM', 0, 'latin1')
  buffer.writeUInt32LE(14 + 40, 10)
  buffer.writeUInt32LE(40, 14)
  buffer.writeInt32LE(width, 18)
  buffer.writeInt32LE(height, 22)
  return buffer
}

/** BMP's ancient 12-byte BITMAPCOREHEADER, whose dimensions are 16-bit instead. */
function bmpCore(width, height) {
  const buffer = Buffer.alloc(22)
  buffer.write('BM', 0, 'latin1')
  buffer.writeUInt32LE(14 + 12, 10)
  buffer.writeUInt32LE(12, 14)
  buffer.writeUInt16LE(width, 18)
  buffer.writeUInt16LE(height, 20)
  return buffer
}

/** A minimal little-endian TIFF: byte-order marker, an IFD offset, then one IFD with two SHORT entries. */
function tiff(width, height) {
  const buffer = Buffer.alloc(34)
  buffer.write('II', 0, 'latin1')
  buffer.writeUInt16LE(42, 2)
  buffer.writeUInt32LE(8, 4)
  buffer.writeUInt16LE(2, 8)
  buffer.writeUInt16LE(256, 10) // tag: ImageWidth
  buffer.writeUInt16LE(3, 12) // type: SHORT
  buffer.writeUInt32LE(1, 14) // count
  buffer.writeUInt16LE(width, 18)
  buffer.writeUInt16LE(257, 22) // tag: ImageLength
  buffer.writeUInt16LE(3, 24) // type: SHORT
  buffer.writeUInt32LE(1, 26) // count
  buffer.writeUInt16LE(height, 30)
  return buffer
}

/** A minimal ISO-BMFF `ftyp` + `ispe` pair, enough for the bounded ispe scan to find. */
function isobmff(brand, width, height) {
  const buffer = Buffer.alloc(40)
  buffer.write('ftyp', 4, 'latin1')
  buffer.write(brand, 8, 'latin1')
  buffer.write('ispe', 20, 'latin1')
  buffer.writeUInt32BE(0, 24) // version/flags
  buffer.writeUInt32BE(width, 28)
  buffer.writeUInt32BE(height, 32)
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
  for (const mime of [
    'image/png', 'image/jpeg', 'image/gif', 'image/webp',
    'image/bmp', 'image/tiff', 'image/avif', 'image/heic', 'image/heif',
  ]) {
    assert.ok(MEDIA_MIME_EXTENSION[mime], mime)
  }
})

test('a BMP states its own size, even when the header runs top-down', () => {
  assert.deepEqual(imageMeta(bmp(640, 480)), { mimeType: 'image/bmp', width: 640, height: 480 })
  assert.deepEqual(imageMeta(bmp(640, -480)), { mimeType: 'image/bmp', width: 640, height: 480 })
})

test('a BMP with the old 12-byte core header states its size too', () => {
  assert.deepEqual(imageMeta(bmpCore(200, 100)), { mimeType: 'image/bmp', width: 200, height: 100 })
})

test('a TIFF states its size in an IFD entry, regardless of entry order', () => {
  assert.deepEqual(imageMeta(tiff(1600, 1200)), { mimeType: 'image/tiff', width: 1600, height: 1200 })
})

test('a TIFF whose IFD this code cannot read is accepted with an unknown size, not refused', () => {
  const buffer = Buffer.alloc(12)
  buffer.write('II', 0, 'latin1')
  buffer.writeUInt16LE(42, 2)
  buffer.writeUInt32LE(1000, 4) // IFD offset past the end of this short buffer
  assert.deepEqual(imageMeta(buffer), { mimeType: 'image/tiff', width: 0, height: 0 })
})

test('AVIF and HEIC/HEIF are identified by ISO-BMFF brand, with size from the ispe box', () => {
  assert.deepEqual(imageMeta(isobmff('avif', 1280, 720)), { mimeType: 'image/avif', width: 1280, height: 720 })
  assert.deepEqual(imageMeta(isobmff('avis', 1280, 720)), { mimeType: 'image/avif', width: 1280, height: 720 })
  assert.deepEqual(imageMeta(isobmff('heic', 4032, 3024)), { mimeType: 'image/heic', width: 4032, height: 3024 })
  assert.deepEqual(imageMeta(isobmff('heix', 4032, 3024)), { mimeType: 'image/heic', width: 4032, height: 3024 })
  assert.deepEqual(imageMeta(isobmff('mif1', 800, 600)), { mimeType: 'image/heif', width: 800, height: 600 })
  assert.deepEqual(imageMeta(isobmff('msf1', 800, 600)), { mimeType: 'image/heif', width: 800, height: 600 })
})

test('an AVIF whose ispe box this scan cannot find is accepted with an unknown size, not refused', () => {
  const buffer = Buffer.alloc(16)
  buffer.write('ftyp', 4, 'latin1')
  buffer.write('avif', 8, 'latin1')
  assert.deepEqual(imageMeta(buffer), { mimeType: 'image/avif', width: 0, height: 0 })
})

test('an ISO-BMFF file with a video/audio brand is not claimed as an image', () => {
  const buffer = Buffer.alloc(16)
  buffer.write('ftyp', 4, 'latin1')
  buffer.write('isom', 8, 'latin1')
  assert.equal(imageMeta(buffer), null)
})
