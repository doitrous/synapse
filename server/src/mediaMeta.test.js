import test from 'node:test'
import assert from 'node:assert/strict'
import { mediaMeta } from './mediaMeta.js'
import { MEDIA_MIME_EXTENSION } from './imageMeta.js'

const ftyp = (brand, handlers = []) => {
  const value = Buffer.alloc(32 + handlers.length * 20)
  value.writeUInt32BE(value.length, 0)
  value.write('ftyp', 4, 'latin1')
  value.write(brand, 8, 'latin1')
  handlers.forEach((handler, index) => {
    const offset = 32 + index * 20
    value.writeUInt32BE(20, offset)
    value.write('hdlr', offset + 4, 'latin1')
    value.write(handler, offset + 16, 'latin1')
  })
  return value
}

test('managed media identifies MP4, QuickTime, M4A and WebM from bytes', () => {
  assert.deepEqual(mediaMeta(ftyp('isom')), { mediaType: 'video', mimeType: 'video/mp4', width: 0, height: 0 })
  assert.deepEqual(mediaMeta(ftyp('qt  ')), { mediaType: 'video', mimeType: 'video/quicktime', width: 0, height: 0 })
  assert.deepEqual(mediaMeta(ftyp('M4A ')), { mediaType: 'audio', mimeType: 'audio/mp4', width: 0, height: 0 })
  assert.deepEqual(mediaMeta(ftyp('isom', ['soun'])), { mediaType: 'audio', mimeType: 'audio/mp4', width: 0, height: 0 })
  assert.deepEqual(mediaMeta(ftyp('mp42', ['soun', 'vide'])), { mediaType: 'video', mimeType: 'video/mp4', width: 0, height: 0 })
  assert.deepEqual(mediaMeta(Buffer.from([0x1a, 0x45, 0xdf, 0xa3, 0x01, 0, 0, 0, 0, 0, 0, 0])), { mediaType: 'video', mimeType: 'video/webm', width: 0, height: 0 })
})

test('managed media identifies common audio containers from bytes', () => {
  const wav = Buffer.alloc(16); wav.write('RIFF', 0); wav.write('WAVE', 8)
  assert.equal(mediaMeta(wav)?.mimeType, 'audio/wav')
  assert.equal(mediaMeta(Buffer.from('OggSabcdefgh'))?.mimeType, 'audio/ogg')
  assert.equal(mediaMeta(Buffer.from('ID3abcdefghi'))?.mimeType, 'audio/mpeg')
})

test('managed media refuses renamed or unknown bytes', () => {
  assert.equal(mediaMeta(Buffer.from('<script>alert(1)</script>')), null)
  assert.equal(mediaMeta(Buffer.from('%PDF-1.7')), null)
})

test('managed media identifies M4V, MKV and AVI video from bytes', () => {
  assert.deepEqual(mediaMeta(ftyp('M4V ')), { mediaType: 'video', mimeType: 'video/x-m4v', width: 0, height: 0 })

  const matroska = Buffer.concat([Buffer.from([0x1a, 0x45, 0xdf, 0xa3]), Buffer.from('\x42\x82\x88matroska', 'latin1')])
  assert.deepEqual(mediaMeta(matroska), { mediaType: 'video', mimeType: 'video/x-matroska', width: 0, height: 0 })

  const webm = Buffer.concat([Buffer.from([0x1a, 0x45, 0xdf, 0xa3]), Buffer.from('\x42\x82\x84webm\x00', 'latin1')])
  assert.deepEqual(mediaMeta(webm), { mediaType: 'video', mimeType: 'video/webm', width: 0, height: 0 })

  const avi = Buffer.alloc(16)
  avi.write('RIFF', 0, 'latin1')
  avi.write('AVI ', 8, 'latin1')
  assert.deepEqual(mediaMeta(avi), { mediaType: 'video', mimeType: 'video/x-msvideo', width: 0, height: 0 })
})

test('managed media identifies AAC (ADTS), FLAC and Opus from bytes', () => {
  assert.deepEqual(mediaMeta(Buffer.from([0xff, 0xf1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])), {
    mediaType: 'audio', mimeType: 'audio/aac', width: 0, height: 0,
  })
  assert.deepEqual(mediaMeta(Buffer.from([0xff, 0xf9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])), {
    mediaType: 'audio', mimeType: 'audio/aac', width: 0, height: 0,
  })
  assert.deepEqual(mediaMeta(Buffer.from('fLaCabcdefgh')), { mediaType: 'audio', mimeType: 'audio/flac', width: 0, height: 0 })

  // Real MP3 frame syncs that are not the AAC ADTS bytes above must still be MP3.
  assert.equal(mediaMeta(Buffer.from([0xff, 0xfb, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]))?.mimeType, 'audio/mpeg')

  const oggPage = (payload) => {
    const buffer = Buffer.alloc(28 + payload.length)
    buffer.write('OggS', 0, 'latin1')
    buffer[26] = 1 // page_segments
    buffer[27] = payload.length // segment_table[0]
    payload.copy(buffer, 28)
    return buffer
  }
  assert.deepEqual(mediaMeta(oggPage(Buffer.from('OpusHead\x01\x02\x38\x01'))), {
    mediaType: 'audio', mimeType: 'audio/opus', width: 0, height: 0,
  })
  assert.deepEqual(mediaMeta(oggPage(Buffer.from('\x01vorbis00000000000'))), {
    mediaType: 'audio', mimeType: 'audio/ogg', width: 0, height: 0,
  })
})

test('every audio/video format identified above has an extension to store it under', () => {
  for (const mime of [
    'video/x-m4v', 'video/x-matroska', 'video/x-msvideo',
    'audio/aac', 'audio/flac', 'audio/opus',
  ]) {
    assert.ok(MEDIA_MIME_EXTENSION[mime], mime)
  }
})
