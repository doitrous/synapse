import { imageMeta } from './imageMeta.js'

/**
 * Identify managed teaching media from its bytes, never its name or request
 * Content-Type. The result deliberately contains only facts needed for safe
 * storage and playback; duration and video dimensions are read by the browser
 * from the verified stored file because the server does not ship ffmpeg.
 */
export function mediaMeta(buffer) {
  const image = imageMeta(buffer)
  if (image) return { mediaType: 'image', ...image }
  if (!Buffer.isBuffer(buffer) || buffer.length < 12) return null

  const ascii = (offset, length) => buffer.subarray(offset, offset + length).toString('latin1')
  const hasHandler = (handlerType) => {
    let cursor = 0
    while ((cursor = buffer.indexOf('hdlr', cursor, 'latin1')) !== -1) {
      // ISO BMFF handler_type follows the hdlr box type, version/flags and
      // pre_defined fields. Looking for the complete box shape avoids treating
      // ordinary caption or media bytes containing “soun” as track metadata.
      if (ascii(cursor + 12, 4) === handlerType) return true
      cursor += 4
    }
    return false
  }

  // ISO Base Media File Format. The major brand distinguishes ordinary MP4,
  // QuickTime and the common audio-only M4A/M4B variants without trusting an
  // extension supplied by the uploader.
  if (ascii(4, 4) === 'ftyp') {
    const brand = ascii(8, 4)
    if (brand === 'qt  ') return { mediaType: 'video', mimeType: 'video/quicktime', width: 0, height: 0 }
    if (brand === 'M4A ' || brand === 'M4B ' || brand === 'M4P ') {
      return { mediaType: 'audio', mimeType: 'audio/mp4', width: 0, height: 0 }
    }
    // Some audio-only M4A files use the generic isom/mp42 brand. When the
    // header carries track-handler metadata, prefer that fact over the brand.
    // A video file commonly has both a sound and a video handler, so only a
    // sound handler with no video handler is classified as audio.
    const hasSoundTrack = hasHandler('soun')
    const hasVideoTrack = hasHandler('vide')
    if (hasSoundTrack && !hasVideoTrack) return { mediaType: 'audio', mimeType: 'audio/mp4', width: 0, height: 0 }
    return { mediaType: 'video', mimeType: 'video/mp4', width: 0, height: 0 }
  }

  // Matroska/WebM begins with the EBML header. Managed requests use WebM for
  // clips; an audio-only WebM remains safe and still plays in a video element.
  if (buffer.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]))) {
    return { mediaType: 'video', mimeType: 'video/webm', width: 0, height: 0 }
  }

  if (ascii(0, 4) === 'RIFF' && ascii(8, 4) === 'WAVE') {
    return { mediaType: 'audio', mimeType: 'audio/wav', width: 0, height: 0 }
  }
  if (ascii(0, 4) === 'OggS') return { mediaType: 'audio', mimeType: 'audio/ogg', width: 0, height: 0 }
  if (ascii(0, 3) === 'ID3' || (buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0)) {
    return { mediaType: 'audio', mimeType: 'audio/mpeg', width: 0, height: 0 }
  }

  return null
}
