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
 * the file. No dependency: each format is a documented, fixed-enough layout.
 *
 * PNG/JPEG/GIF/WebP state their pixel size in a field that is always present
 * when the header is well-formed, so a zero there means the header is broken
 * and the file is refused outright. BMP and TIFF are read the same way — the
 * field is always present — but are treated leniently: a layout this code does
 * not recognise (an unusual TIFF IFD entry order, for instance) yields an
 * unknown-but-accepted 0×0 rather than a refusal, the same latitude the server
 * already gives video, whose dimensions the browser measures instead. AVIF and
 * HEIC/HEIF share that same latitude for a different reason: their size lives
 * in an `ispe` box nested inside `meta/iprp/ipco`, and rather than walk that
 * whole box tree this does a bounded scan for the box's own literal type bytes
 * (the same technique `mediaMeta.js` already uses to find `hdlr`) — a miss is
 * "unknown," not "broken."
 *
 * SVG is deliberately absent. It is a document that can carry script, not a
 * picture, and it would be served from our own origin.
 */

export const MEDIA_MIME_EXTENSION = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/bmp': 'bmp',
  'image/tiff': 'tiff',
  'image/avif': 'avif',
  'image/heic': 'heic',
  'image/heif': 'heif',
  'audio/mpeg': 'mp3',
  'audio/wav': 'wav',
  'audio/ogg': 'ogg',
  'audio/opus': 'opus',
  'audio/aac': 'aac',
  'audio/flac': 'flac',
  'audio/mp4': 'm4a',
  'video/mp4': 'mp4',
  'video/quicktime': 'mov',
  'video/webm': 'webm',
  'video/x-m4v': 'm4v',
  'video/x-matroska': 'mkv',
  'video/x-msvideo': 'avi',
}

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

/** A frame header that states a size, as opposed to one that only carries data. */
const JPEG_SIZE_MARKERS = new Set([
  0xffc0, 0xffc1, 0xffc2, 0xffc3, 0xffc5, 0xffc6, 0xffc7,
  0xffc9, 0xffca, 0xffcb, 0xffcd, 0xffce, 0xffcf,
])

/** ISO-BMFF major brands that name a still-image container, not audio/video. */
const ISOBMFF_IMAGE_MIME = {
  avif: 'image/avif',
  avis: 'image/avif',
  heic: 'image/heic',
  heix: 'image/heic',
  mif1: 'image/heif',
  msf1: 'image/heif',
}

export function imageMeta(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length < 10) return null
  const strict = png(buffer) ?? jpeg(buffer) ?? gif(buffer) ?? webp(buffer)
  if (strict) {
    // A header can be well-formed and still describe nothing renderable. Zero
    // in either axis is not a small image, it is a broken one.
    if (strict.width <= 0 || strict.height <= 0) return null
    return strict
  }
  const lenient = bmp(buffer) ?? tiff(buffer) ?? isobmffImage(buffer)
  if (!lenient) return null
  return { mimeType: lenient.mimeType, width: Math.max(0, lenient.width), height: Math.max(0, lenient.height) }
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

/**
 * BMP states its size in the DIB header that follows the 14-byte file header.
 * The ancient 12-byte BITMAPCOREHEADER packs 16-bit dimensions; every later
 * variant (BITMAPINFOHEADER and its successors) packs signed 32-bit ones at
 * the same fixed offset, with a negative height meaning the rows run top-down
 * rather than bottom-up — the magnitude is still the pixel height.
 */
function bmp(buffer) {
  if (buffer.length < 16 || buffer.subarray(0, 2).toString('latin1') !== 'BM') return null
  const dibHeaderSize = buffer.readUInt32LE(14)
  if (dibHeaderSize === 12) {
    if (buffer.length < 22) return null
    return { mimeType: 'image/bmp', width: buffer.readUInt16LE(18), height: buffer.readUInt16LE(20) }
  }
  if (buffer.length < 26) return null
  return {
    mimeType: 'image/bmp',
    width: buffer.readInt32LE(18),
    height: Math.abs(buffer.readInt32LE(22)),
  }
}

/**
 * TIFF's byte-order marker doubles as the format's own magic number, and
 * every field after it — the offset to the first IFD, and each 12-byte entry
 * within it — is read in that same order. Only the two size tags are read;
 * everything else in the IFD is skipped.
 */
function tiff(buffer) {
  if (buffer.length < 8) return null
  const marker = buffer.subarray(0, 4)
  let little
  if (marker.equals(Buffer.from([0x49, 0x49, 0x2a, 0x00]))) little = true
  else if (marker.equals(Buffer.from([0x4d, 0x4d, 0x00, 0x2a]))) little = false
  else return null
  const size = tiffImageSize(buffer, little)
  return { mimeType: 'image/tiff', width: size?.width ?? 0, height: size?.height ?? 0 }
}

function tiffImageSize(buffer, little) {
  const readU16 = (offset) => (little ? buffer.readUInt16LE(offset) : buffer.readUInt16BE(offset))
  const readU32 = (offset) => (little ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset))
  const ifdOffset = readU32(4)
  if (ifdOffset + 2 > buffer.length) return null
  const entryCount = readU16(ifdOffset)
  let width = 0
  let height = 0
  for (let index = 0; index < entryCount; index += 1) {
    const entryOffset = ifdOffset + 2 + index * 12
    if (entryOffset + 12 > buffer.length) break
    const tag = readU16(entryOffset)
    if (tag !== 256 && tag !== 257) continue
    // A SHORT value of count 1 is stored left-justified in the 4-byte
    // value/offset field itself; only that one type is handled, since
    // ImageWidth/ImageLength are SHORT or LONG in every TIFF seen in practice.
    const type = readU16(entryOffset + 2)
    const value = type === 3 ? readU16(entryOffset + 8) : readU32(entryOffset + 8)
    if (tag === 256) width = value
    else height = value
  }
  return width > 0 && height > 0 ? { width, height } : null
}

/** AVIF and HEIC/HEIF are ISO-BMFF, identified the same way MP4 is: by brand. */
function isobmffImage(buffer) {
  if (buffer.length < 12 || buffer.subarray(4, 8).toString('latin1') !== 'ftyp') return null
  const mimeType = ISOBMFF_IMAGE_MIME[buffer.subarray(8, 12).toString('latin1')]
  if (!mimeType) return null
  const size = findIspeSize(buffer)
  return { mimeType, width: size?.width ?? 0, height: size?.height ?? 0 }
}

/**
 * The `ispe` (Image Spatial Extents) box states pixel size as version/flags
 * followed by two 32-bit big-endian fields. Its type bytes are searched for
 * directly rather than walking the `meta/iprp/ipco` box tree that contains
 * it — the same bounded-scan shortcut `mediaMeta.js` uses for `hdlr`.
 */
function findIspeSize(buffer) {
  let cursor = 0
  while ((cursor = buffer.indexOf('ispe', cursor, 'latin1')) !== -1) {
    if (cursor + 16 <= buffer.length) {
      const width = buffer.readUInt32BE(cursor + 8)
      const height = buffer.readUInt32BE(cursor + 12)
      if (width > 0 && height > 0) return { width, height }
    }
    cursor += 4
  }
  return null
}
