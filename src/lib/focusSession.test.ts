import test from 'node:test'
import assert from 'node:assert/strict'
import {
  accruedSeconds, discard, formatClock, initialFocusSession, pause, reset, setDurationMinutes,
  setMode, start, tick,
} from './focusSession.ts'

const T0 = 1_700_000_000_000

test('start -> tick -> complete: a countdown reaches zero and stops itself', () => {
  // The shortest duration the picker allows (`MIN_DURATION_MINUTES`) is 5 —
  // `setDurationMinutes` clamps anything under that, so the block below is
  // 5 minutes, not literally one.
  const started = start(setDurationMinutes(initialFocusSession(T0), 5, T0), T0)
  assert.equal(started.running, true)
  assert.equal(started.remainingSeconds, 300)

  const midway = tick(started, T0 + 150_000)
  assert.equal(midway.running, true)
  assert.equal(midway.remainingSeconds, 150)
  assert.equal(accruedSeconds(midway), 150)

  const finished = tick(midway, T0 + 300_000)
  assert.equal(finished.running, false)
  assert.equal(finished.remainingSeconds, 0)
  assert.equal(finished.completedAt, T0 + 300_000)
  assert.equal(accruedSeconds(finished), 300)
})

test('count-up mode accrues seconds instead of counting down', () => {
  const started = start(setMode(initialFocusSession(T0), 'countup', T0), T0)
  const later = tick(started, T0 + 45_000)
  assert.equal(later.elapsedSeconds, 45)
  assert.equal(accruedSeconds(later), 45)
  assert.equal(later.completedAt, null)
})

test('pause freezes the clock; resuming with start picks up from there', () => {
  const started = start(setDurationMinutes(initialFocusSession(T0), 25, T0), T0)
  const ran = tick(started, T0 + 10_000)
  const paused = pause(ran, T0 + 10_000)
  assert.equal(paused.running, false)
  assert.equal(paused.remainingSeconds, 25 * 60 - 10)

  // Time passing while paused must not be counted.
  const stillPaused = tick(paused, T0 + 60_000)
  assert.equal(stillPaused.remainingSeconds, paused.remainingSeconds)

  const resumed = start(stillPaused, T0 + 60_000)
  assert.equal(resumed.running, true)
  assert.equal(resumed.remainingSeconds, paused.remainingSeconds)
})

test('starting again after completion restarts the block rather than staying at 0:00', () => {
  const finished = tick(start(setDurationMinutes(initialFocusSession(T0), 5, T0), T0), T0 + 300_000)
  assert.equal(finished.remainingSeconds, 0)
  const restarted = start(finished, T0 + 300_000)
  assert.equal(restarted.running, true)
  assert.equal(restarted.remainingSeconds, 300)
  assert.equal(restarted.completedAt, null)
})

test('strict-discard: leaving mid-block throws the running progress away', () => {
  const started = start(setDurationMinutes(initialFocusSession(T0), 25, T0), T0)
  const ran = tick(started, T0 + 5 * 60_000)
  assert.equal(ran.remainingSeconds, 20 * 60)

  const discarded = discard(ran, T0 + 5 * 60_000 + 15_000)
  assert.equal(discarded.running, false)
  assert.equal(discarded.remainingSeconds, 25 * 60)
  assert.equal(accruedSeconds(discarded), 0)
  assert.equal(discarded.completedAt, null)
})

test('reset returns to the full chosen duration in countdown, and zero in count-up', () => {
  const countdown = reset(tick(start(setDurationMinutes(initialFocusSession(T0), 50, T0), T0), T0 + 5_000), T0 + 5_000)
  assert.equal(countdown.remainingSeconds, 50 * 60)

  const countup = reset(tick(start(setMode(initialFocusSession(T0), 'countup', T0), T0), T0 + 5_000), T0 + 5_000)
  assert.equal(countup.elapsedSeconds, 0)
})

test('formatClock prints mm:ss under an hour and h:mm:ss past it', () => {
  assert.equal(formatClock(65), '1:05')
  assert.equal(formatClock(3_661), '1:01:01')
  assert.equal(formatClock(-4), '0:00')
})
