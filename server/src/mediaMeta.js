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
  // QuickTime, M4V and the common audio-only M4A/M4B variants without trusting
  // an extension supplied by the uploader.
  if (ascii(4, 4) === 'ftyp') {
    const brand = ascii(8, 4)
    if (brand === 'qt  ') return { mediaType: 'video', mimeType: 'video/quicktime', width: 0, height: 0 }
    if (brand === 'M4V ') return { mediaType: 'video', mimeType: 'video/x-m4v', width: 0, height: 0 }
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

  // Matroska/WebM both begin with the EBML header; only the DocType element
  // says which one a file actually is. That element is a literal ASCII string
  // close to the front, so — the same bounded-scan shortcut used for `hdlr`
  // above — it is searched for directly rather than walked to as an element
  // tree. A miss (too little header to say, or an old file with no DocType
  // string at all) keeps today's behaviour and assumes WebM.
  if (buffer.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]))) {
    const headerRegion = ascii(4, Math.min(buffer.length - 4, 4096))
    if (headerRegion.includes('matroska')) {
      return { mediaType: 'video', mimeType: 'video/x-matroska', width: 0, height: 0 }
    }
    return { mediaType: 'video', mimeType: 'video/webm', width: 0, height: 0 }
  }

  if (ascii(0, 4) === 'RIFF' && ascii(8, 4) === 'WAVE') {
    return { mediaType: 'audio', mimeType: 'audio/wav', width: 0, height: 0 }
  }
  if (ascii(0, 4) === 'RIFF' && ascii(8, 4) === 'AVI ') {
    return { mediaType: 'video', mimeType: 'video/x-msvideo', width: 0, height: 0 }
  }
  if (ascii(0, 4) === 'fLaC') return { mediaType: 'audio', mimeType: 'audio/flac', width: 0, height: 0 }
  // AAC-in-ADTS's two-byte sync word (0xFFF, then version/layer/protection
  // bits) is checked ahead of the general MPEG frame-sync test below, because
  // '\xFF\xF1' and '\xFF\xF9' both also satisfy that looser test and would
  // otherwise be reported as MP3.
  if (buffer[0] === 0xff && (buffer[1] === 0xf1 || buffer[1] === 0xf9)) {
    return { mediaType: 'audio', mimeType: 'audio/aac', width: 0, height: 0 }
  }
  if (ascii(0, 4) === 'OggS') {
    if (oggFirstPacketCodec(buffer) === 'opus') return { mediaType: 'audio', mimeType: 'audio/opus', width: 0, height: 0 }
    return { mediaType: 'audio', mimeType: 'audio/ogg', width: 0, height: 0 }
  }
  if (ascii(0, 3) === 'ID3' || (buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0)) {
    return { mediaType: 'audio', mimeType: 'audio/mpeg', width: 0, height: 0 }
  }

  return null
}

/**
 * The codec named by an Ogg stream's very first packet, read off the page it
 * physically starts in (page header, then a segment table whose length is
 * itself stated at a fixed offset). Too little header to say is not treated
 * as a refusal — the caller falls back to the general Ogg/Vorbis type this
 * server already accepted before Opus detection existed.
 */
function oggFirstPacketCodec(buffer) {
  if (buffer.length < 28) return null
  const pageSegments = buffer[26]
  const payloadStart = 27 + pageSegments
  if (buffer.length < payloadStart + 8) return null
  if (buffer.subarray(payloadStart, payloadStart + 8).toString('latin1') === 'OpusHead') return 'opus'
  return null
}
