import assert from 'node:assert/strict'
import test from 'node:test'
import { EMPTY_TERMINOLOGY_PROGRESS, knownIn, markKnown, toggleKnown, unmarkKnown } from './terminologyProgress.ts'

const now = new Date('2026-09-02T09:00:00')

test('marking is idempotent and unmarking removes the entry', () => {
  const once = markKnown(EMPTY_TERMINOLOGY_PROGRESS, 'anterior', now)
  const twice = markKnown(once, 'anterior', new Date(now.getTime() + 5000))
  assert.equal(twice, once)
  assert.equal(once.known.anterior, now.toISOString())
  const cleared = unmarkKnown(twice, 'anterior')
  assert.deepEqual(cleared.known, {})
  assert.equal(unmarkKnown(cleared, 'anterior'), cleared)
})

test('toggle flips and knownIn counts only ids in the given list', () => {
  let doc = toggleKnown(EMPTY_TERMINOLOGY_PROGRESS, 'anterior', now)
  doc = toggleKnown(doc, 'posterior', now)
  doc = toggleKnown(doc, 'retired-term', now)
  assert.equal(knownIn(doc, ['anterior', 'posterior', 'superior']), 2)
  doc = toggleKnown(doc, 'anterior', now)
  assert.equal(knownIn(doc, ['anterior', 'posterior', 'superior']), 1)
})
