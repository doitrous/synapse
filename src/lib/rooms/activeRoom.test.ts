import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ACTIVE_ROOM_KEY, loadActiveRoom, sameRoom, saveActiveRoom, type ActiveRoom } from './activeRoom.ts'

function fakeStorage(initial: Record<string, string> = {}) {
  const map = new Map(Object.entries(initial))
  return {
    getItem: (k: string) => (map.has(k) ? map.get(k)! : null),
    setItem: (k: string, v: string) => { map.set(k, v) },
    removeItem: (k: string) => { map.delete(k) },
    get size() { return map.size },
    peek: () => Object.fromEntries(map),
  }
}

test('a saved live room reads back', () => {
  const s = fakeStorage()
  saveActiveRoom({ roomId: 'p1', roomCode: 'ABC123', roomName: 'Anatomy' }, s)
  assert.deepEqual(loadActiveRoom(s), { roomId: 'p1', roomCode: 'ABC123', roomName: 'Anatomy' })
})

test('roomName is optional and absent rather than empty when unknown', () => {
  const s = fakeStorage()
  saveActiveRoom({ roomId: 'p1', roomCode: 'ABC123' }, s)
  assert.deepEqual(loadActiveRoom(s), { roomId: 'p1', roomCode: 'ABC123' })
  assert.ok(!('roomName' in (loadActiveRoom(s) as object)))
})

test('a demo room is never written', () => {
  const s = fakeStorage()
  saveActiveRoom({ roomId: 'demo-1', roomCode: 'DEMO', roomName: 'Demo', demo: true }, s)
  assert.equal(loadActiveRoom(s), null)
  assert.equal(s.size, 0)
})

test('null clears the remembered room', () => {
  const s = fakeStorage({ [ACTIVE_ROOM_KEY]: JSON.stringify({ roomId: 'p1', roomCode: 'ABC' }) })
  saveActiveRoom(null, s)
  assert.equal(loadActiveRoom(s), null)
})

test('a malformed or partial value reads as null, never a half room', () => {
  assert.equal(loadActiveRoom(fakeStorage({ [ACTIVE_ROOM_KEY]: 'not json' })), null)
  assert.equal(loadActiveRoom(fakeStorage({ [ACTIVE_ROOM_KEY]: JSON.stringify({ roomId: 'p1' }) })), null)
  assert.equal(loadActiveRoom(fakeStorage({ [ACTIVE_ROOM_KEY]: JSON.stringify({ roomCode: 'ABC' }) })), null)
  assert.equal(loadActiveRoom(fakeStorage({ [ACTIVE_ROOM_KEY]: JSON.stringify({ roomId: '', roomCode: 'ABC' }) })), null)
  assert.equal(loadActiveRoom(fakeStorage({ [ACTIVE_ROOM_KEY]: JSON.stringify(42) })), null)
})

test('a throwing storage is survived, not propagated', () => {
  const boom = {
    getItem() { throw new Error('blocked') },
    setItem() { throw new Error('blocked') },
    removeItem() { throw new Error('blocked') },
  }
  assert.equal(loadActiveRoom(boom), null)
  assert.doesNotThrow(() => saveActiveRoom({ roomId: 'p1', roomCode: 'ABC' }, boom))
})

test('sameRoom compares by id, tolerating a changed code or null', () => {
  const a: ActiveRoom = { roomId: 'p1', roomCode: 'ABC' }
  assert.equal(sameRoom(a, { roomId: 'p1', roomCode: 'abc-normalised' }), true)
  assert.equal(sameRoom(a, { roomId: 'p2', roomCode: 'ABC' }), false)
  assert.equal(sameRoom(null, null), true)
  assert.equal(sameRoom(a, null), false)
})
