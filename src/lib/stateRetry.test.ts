import { test } from 'node:test'
import assert from 'node:assert/strict'
import { awaitsSession, hydrationRetryDelay, RETRY_MS } from './stateRetry.ts'

test('a fault that might pass keeps the ordinary pause, however many times it fails', () => {
  for (const attempt of [1, 2, 9, 500]) {
    assert.equal(hydrationRetryDelay('network', attempt), RETRY_MS)
    assert.equal(hydrationRetryDelay('server', attempt), RETRY_MS)
  }
})

test('a 401 is retried a few times, then left to a sign-in', () => {
  // The boot race this exists for resolves in well under a second, so the first
  // two retries carry it; the third is for a token refresh that is slow.
  const first = hydrationRetryDelay('unauthorized', 1)
  const second = hydrationRetryDelay('unauthorized', 2)
  const third = hydrationRetryDelay('unauthorized', 3)
  assert.ok(first !== null && second !== null && third !== null)
  assert.ok(first! < second! && second! < third!, 'each retry waits longer than the last')
  // Four failures means the browser really is signed out. Asking again on a
  // timer is the retry storm this replaced.
  assert.equal(hydrationRetryDelay('unauthorized', 4), null)
  assert.equal(hydrationRetryDelay('unauthorized', 40), null)
})

test('a decision about the request itself is never retried', () => {
  for (const attempt of [1, 2, 3]) {
    assert.equal(hydrationRetryDelay('forbidden', attempt), null)
    assert.equal(hydrationRetryDelay('notfound', attempt), null)
    assert.equal(hydrationRetryDelay('toolarge', attempt), null)
  }
})

test('only a 401 is worth holding work for until a session arrives', () => {
  assert.equal(awaitsSession('unauthorized'), true)
  // A student asking for an admin-only document is refused for a reason no
  // sign-in will change, so nothing is held open waiting for one.
  assert.equal(awaitsSession('forbidden'), false)
  assert.equal(awaitsSession('notfound'), false)
  assert.equal(awaitsSession('toolarge'), false)
  assert.equal(awaitsSession('network'), false)
  assert.equal(awaitsSession('server'), false)
})
