import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getOrInsertComputed, withResolvers, toBase64, fromBase64 } from './pdfCompat.ts'

test('getOrInsertComputed returns existing value without recomputing', () => {
  const map = new Map<string, number>([['a', 1]])
  let calls = 0
  const v = getOrInsertComputed.call(map, 'a', () => { calls++; return 99 })
  assert.equal(v, 1)
  assert.equal(calls, 0)
})

test('getOrInsertComputed computes, stores and returns a missing value', () => {
  const map = new Map<string, number>()
  const v = getOrInsertComputed.call(map, 'b', (k) => k.length)
  assert.equal(v, 1)
  assert.equal(map.get('b'), 1)
})

test('withResolvers resolves through the returned resolver', async () => {
  const { promise, resolve } = withResolvers<string>()
  resolve('ok')
  assert.equal(await promise, 'ok')
})

test('toBase64/fromBase64 round-trip arbitrary bytes', () => {
  const bytes = new Uint8Array([0, 1, 2, 254, 255, 65, 66])
  const b64 = toBase64(bytes)
  assert.equal(b64, Buffer.from(bytes).toString('base64'))
  assert.deepEqual([...fromBase64(b64)], [...bytes])
})

test('toBase64/fromBase64 handle the base64url alphabet', () => {
  const bytes = new Uint8Array([251, 255, 191]) // encodes with + and / in std base64
  const url = toBase64(bytes, { alphabet: 'base64url' })
  assert.ok(!/[+/=]/.test(url))
  assert.deepEqual([...fromBase64(url, { alphabet: 'base64url' })], [...bytes])
})
