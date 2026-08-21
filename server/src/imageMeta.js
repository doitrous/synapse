/**
 * What an image actually is, read from its own bytes.
 *
 * `Content-Type` is whatever the uploader claimed, and a file extension is
 * whatever they typed. Both are trusted nowhere here — the same stance
 * `assembleChunks` already takes when it sniffs `%PDF-` rather than believing a
 * header, and for the same reason: a renamed executable must be refused at the
 * point it would otherwise become a teaching asset.
 *
 * Dimensions are read here rather than measured in a browser, because the
 * browser's number is a claim made by the client and this one is a fact about
 * the file. No dependency: four headers, each a documented fixed layout.
 *
 * SVG is deliberately absent. It is a document that can carry script, not a
 * picture, and it would be served from our own origin.
 */

export const MEDIA_MIME_EXTENSION = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp',
}

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

/** A frame header that states a size, as opposed to one that only carries data. */
const JPEG_SIZE_MARKERS = new Set([
  0xffc0, 0xffc1, 0xffc2, 0xffc3, 0xffc5, 0xffc6, 0xffc7,
  0xffc9, 0xffca, 0xffcb, 0xffcd, 0xffce, 0xffcf,
])

export function imageMeta(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length < 10) return null
  const found = png(buffer) ?? jpeg(buffer) ?? gif(buffer) ?? webp(buffer)
  // A header can be well-formed and still describe nothing renderable. Zero in
  // either axis is not a small image, it is a broken one.
  if (!found || found.width <= 0 || found.height <= 0) return null
  return found
}

function png(buffer) {
  if (buffer.length < 24 || !buffer.subarray(0, 8).equals(PNG_SIGNATURE)) return null
  if (buffer.subarray(12, 16).toString('latin1') !== 'IHDR') return null
  return { mimeType: 'image/png', width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
}

/**
 * JPEG carries its size inside a frame header, which sits after any number of
 * other segments, so the segment chain is walked rather than assumed.
 */
function jpeg(buffer) {
  if (buffer.readUInt16BE(0) !== 0xffd8) return null
  let offset = 2
  while (offset + 9 < buffer.length) {
    const marker = buffer.readUInt16BE(offset)
    if ((marker & 0xff00) !== 0xff00) return null
    if (JPEG_SIZE_MARKERS.has(marker)) {
      return {
        mimeType: 'image/jpeg',
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      }
    }
    const length = buffer.readUInt16BE(offset + 2)
    if (length < 2) return null
    offset += 2 + length
  }
  return null
}

function gif(buffer) {
  const magic = buffer.subarray(0, 6).toString('latin1')
  if (magic !== 'GIF87a' && magic !== 'GIF89a') return null
  return { mimeType: 'image/gif', width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) }
}

/**
 * Only the extended (VP8X) form states a canvas size directly, and it states it
 * minus one. The lossy and lossless forms are read from their own sub-chunks.
 */
function webp(buffer) {
  if (buffer.length < 30) return null
  if (buffer.subarray(0, 4).toString('latin1') !== 'RIFF') return null
  if (buffer.subarray(8, 12).toString('latin1') !== 'WEBP') return null
  const chunk = buffer.subarray(12, 16).toString('latin1')
  if (chunk === 'VP8X') {
    return {
      mimeType: 'image/webp',
      width: buffer.readUIntLE(24, 3) + 1,
      height: buffer.readUIntLE(27, 3) + 1,
    }
  }
  if (chunk === 'VP8 ') {
    return {
      mimeType: 'image/webp',
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    }
  }
  if (chunk === 'VP8L') {
    const bits = buffer.readUInt32LE(21)
    return {
      mimeType: 'image/webp',
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    }
  }
  return null
}
