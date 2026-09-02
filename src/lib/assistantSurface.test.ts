import test from 'node:test'
import assert from 'node:assert/strict'
import { surfaceFor, ASSISTANT_SURFACES } from './assistantSurface.ts'

test('a nested student route reports its own surface, not the dashboard', () => {
  // `/app` is a prefix of every other student route. Matched first, it would
  // swallow all of them and the assistant would be told "Dashboard" wherever
  // the student actually was.
  assert.equal(surfaceFor('/app/library'), 'Library')
  assert.equal(surfaceFor('/app/qbank'), 'Question Bank')
  assert.equal(surfaceFor('/app/resources/some-source-id'), 'Resources')
  assert.equal(surfaceFor('/app/study-together'), 'Study Rooms')
  assert.equal(surfaceFor('/app/study-rooms/abc'), 'Study Rooms')
  assert.equal(surfaceFor('/app/plan'), 'Plan')
  assert.equal(surfaceFor('/app/billing'), 'Account')
})

test('the dashboard is what /app itself resolves to', () => {
  assert.equal(surfaceFor('/app'), 'Dashboard')
  assert.equal(surfaceFor('/app/'), 'Dashboard')
})

test('a route outside the student app has no surface rather than a wrong one', () => {
  // The widget only mounts inside /app, but a bad guess here would be passed to
  // the model as fact. Undefined is simply omitted from the context.
  assert.equal(surfaceFor('/admin/assistant'), undefined)
  assert.equal(surfaceFor('/pricing'), undefined)
  assert.equal(surfaceFor('/'), undefined)
})

test('the catch-all sits last so ordering cannot silently regress', () => {
  const last = ASSISTANT_SURFACES[ASSISTANT_SURFACES.length - 1]
  assert.deepEqual(last, ['/app', 'Dashboard'])
  const others = ASSISTANT_SURFACES.slice(0, -1)
  assert.ok(others.every(([prefix]) => prefix.startsWith('/app/')), 'every earlier prefix is more specific than /app')
})
