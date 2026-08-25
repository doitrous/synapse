import test from 'node:test'
import assert from 'node:assert/strict'
import { mediaMeta } from './mediaMeta.js'

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
