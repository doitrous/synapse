import test from 'node:test'
import assert from 'node:assert/strict'
import {
  clearFilterStateParams,
  decodeFilterStateValue,
  encodeFilterStateValue,
  readFilterStateFromParams,
  writeFilterStatePatchToParams,
} from './filterStateCodec.ts'

test('encodeFilterStateValue: empty string and empty array both encode to undefined', () => {
  assert.equal(encodeFilterStateValue(''), undefined)
  assert.equal(encodeFilterStateValue([]), undefined)
})

test('encodeFilterStateValue: non-empty values', () => {
  assert.equal(encodeFilterStateValue('needed'), 'needed')
  assert.equal(encodeFilterStateValue(['a', 'b']), 'a,b')
})

test('decodeFilterStateValue: absent param falls back to the default', () => {
  assert.equal(decodeFilterStateValue(null, 'all'), 'all')
  assert.deepEqual(decodeFilterStateValue(null, []), [])
})

test('decodeFilterStateValue: shape follows the default (string vs array)', () => {
  assert.equal(decodeFilterStateValue('needed', 'all'), 'needed')
  assert.deepEqual(decodeFilterStateValue('a,b', []), ['a', 'b'])
  assert.deepEqual(decodeFilterStateValue('', []), [], 'an empty raw value must not become [""]')
})

test('readFilterStateFromParams reads only the keys in defaults, respecting a prefix', () => {
  const params = new URLSearchParams('f.status=needed&f.medium=image,video&other=untouched')
  const defaults = { status: 'all', medium: [] as string[] }
  assert.deepEqual(readFilterStateFromParams(params, defaults, 'f.'), {
    status: 'needed',
    medium: ['image', 'video'],
  })
})

test('readFilterStateFromParams falls back to defaults when nothing is in the URL', () => {
  const params = new URLSearchParams('')
  const defaults = { status: 'all', medium: [] as string[] }
  assert.deepEqual(readFilterStateFromParams(params, defaults), defaults)
})

test('writeFilterStatePatchToParams sets a diverging value', () => {
  const params = new URLSearchParams('')
  const defaults = { status: 'all', medium: [] as string[] }
  const next = writeFilterStatePatchToParams(params, defaults, { status: 'needed' }, 'f.')
  assert.equal(next.get('f.status'), 'needed')
})

test('writeFilterStatePatchToParams removes a key set back to its default', () => {
  const params = new URLSearchParams('f.status=needed')
  const defaults = { status: 'all', medium: [] as string[] }
  const next = writeFilterStatePatchToParams(params, defaults, { status: 'all' }, 'f.')
  assert.equal(next.has('f.status'), false)
})

test('writeFilterStatePatchToParams removes a key whose new value encodes to nothing', () => {
  const params = new URLSearchParams('f.medium=image,video')
  const defaults = { status: 'all', medium: [] as string[] }
  const next = writeFilterStatePatchToParams(params, defaults, { medium: [] }, 'f.')
  assert.equal(next.has('f.medium'), false)
})

test('writeFilterStatePatchToParams leaves params outside the patch alone', () => {
  const params = new URLSearchParams('other=keepme&f.status=needed')
  const defaults = { status: 'all', medium: [] as string[] }
  const next = writeFilterStatePatchToParams(params, defaults, { medium: ['image'] }, 'f.')
  assert.equal(next.get('other'), 'keepme')
  assert.equal(next.get('f.status'), 'needed')
  assert.equal(next.get('f.medium'), 'image')
})

test('clearFilterStateParams removes only the owned keys', () => {
  const params = new URLSearchParams('other=keepme&f.status=needed&f.medium=image')
  const defaults = { status: 'all', medium: [] as string[] }
  const next = clearFilterStateParams(params, defaults, 'f.')
  assert.equal(next.has('f.status'), false)
  assert.equal(next.has('f.medium'), false)
  assert.equal(next.get('other'), 'keepme')
})

test('round trip: write then read reproduces the patched value', () => {
  const defaults = { status: 'all', medium: [] as string[], q: '' }
  let params = new URLSearchParams('')
  params = writeFilterStatePatchToParams(params, defaults, { status: 'needed', medium: ['image', 'video'], q: 'retina' }, 'f.')
  const read = readFilterStateFromParams(params, defaults, 'f.')
  assert.deepEqual(read, { status: 'needed', medium: ['image', 'video'], q: 'retina' })
})
