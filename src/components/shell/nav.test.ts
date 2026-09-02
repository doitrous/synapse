import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ROUTE_TITLES, studentNav, titleForPath } from './nav.ts'

test('student nav is the nine destinations in five sections', () => {
  assert.deepEqual(
    studentNav.flatMap((g) => g.items.map((i) => i.label)),
    ['Dashboard', 'Plan', 'Learn', 'Practice', 'Adaptive Study', 'Revise', 'Minigames', 'Study Rooms', 'Account'],
  )
  assert.deepEqual(studentNav.map((g) => g.label), [undefined, 'Study', 'Test yourself', 'Together', 'You'])
})

/**
 * The routes the nav stopped listing. Asserting on `titleForPath` alone cannot
 * fail here — it answers 'Dashboard' for anything it does not recognise — so
 * the real check is that each path has its *own* entry in `ROUTE_TITLES`, and
 * that `titleForPath` then hands that entry back.
 */
const TITLED_ROUTES = [
  '/app/tutorial', '/app/qbank', '/app/qotd', '/app/calendar', '/app/university', '/app/terminology',
  '/app/taxonomy', '/app/notebook', '/app/practical', '/app/essays', '/app/performance',
  '/app/oral', '/app/skills', '/app/histology',
  '/app/maristanas', '/app/flashcards', '/app/whiteboard', '/app/resources', '/app/library',
  '/app/term-grid',
]

test('every student route off the nav has its own breadcrumb title', () => {
  for (const path of TITLED_ROUTES) {
    const title = ROUTE_TITLES[path]
    assert.equal(typeof title, 'string', `${path} has no ROUTE_TITLES entry`)
    assert.ok(title.length > 0, `${path} has an empty ROUTE_TITLES entry`)
    assert.notEqual(title, path, `${path} is titled with its own pathname`)
  }
})

test('titleForPath returns the ROUTE_TITLES entry, not the Dashboard fallback', () => {
  for (const path of TITLED_ROUTES) {
    assert.equal(titleForPath(path, 'student'), ROUTE_TITLES[path])
  }
})

test('a nav item still wins over the fallback map', () => {
  assert.equal(titleForPath('/app', 'student'), 'Dashboard')
  assert.equal(titleForPath('/app/plan', 'student'), 'Plan')
})

test('a nested route inherits its parent title', () => {
  assert.equal(titleForPath('/app/resources/abc-123', 'student'), 'Resources')
})

test('an unknown student route falls back to Dashboard, never to the path', () => {
  assert.equal(titleForPath('/app/nothing-here', 'student'), 'Dashboard')
})

test('no route title duplicates a nav label it would shadow', () => {
  const navPaths = new Set(studentNav.flatMap((g) => g.items.map((i) => i.to)))
  for (const path of Object.keys(ROUTE_TITLES)) {
    assert.ok(!navPaths.has(path), `${path} is in the nav and does not need a ROUTE_TITLES entry`)
  }
})
