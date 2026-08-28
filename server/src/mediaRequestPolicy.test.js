import test from 'node:test'
import assert from 'node:assert/strict'
import {
  collectMediaRequests, authoriseOneMediaRequestChange, authoriseMediaRequestTransitions,
} from './mediaRequestPolicy.js'

const req = (id, extra = {}) => ({ id, ownerId: 'a1', ownerKind: 'question', medium: 'image', kind: 'diagram', brief: 'x', teachingPurpose: 'y', priority: 'required', status: 'needed', ...extra })
const REVIEWER = { rank: 1 }
const EDITOR = { rank: 2 }

test('collectMediaRequests finds requests nested anywhere in the owner', () => {
  const item = {
    id: 'q1', kind: 'question',
    mediaRequests: [req('r-owner')],
    questionData: { answers: [{ label: 'A', mediaRequests: [req('r-answer')] }] },
  }
  const found = collectMediaRequests(item)
  assert.deepEqual([...found.keys()].sort(), ['r-answer', 'r-owner'])
})

test('a reviewer may attach media and add comments, but not plan, decline or hand-mark supplied', () => {
  const before = req('r1')
  // attach media (supply the asset) — allowed
  assert.equal(authoriseOneMediaRequestChange(before, { ...before, mediaId: 'med-1' }, REVIEWER).ok, true)
  // add a review comment — allowed
  assert.equal(authoriseOneMediaRequestChange(before, { ...before, reviewComments: [{ id: 'c1', anchor: 'stem', kind: 'comment', text: 'hi', author: 'R', createdAt: 't' }] }, REVIEWER).ok, true)
  // plan / decline / supplied — refused for a reviewer
  assert.equal(authoriseOneMediaRequestChange(before, { ...before, status: 'planned' }, REVIEWER).ok, false)
  assert.equal(authoriseOneMediaRequestChange(before, { ...before, status: 'declined' }, REVIEWER).ok, false)
  assert.equal(authoriseOneMediaRequestChange(before, { ...before, status: 'supplied', mediaId: 'med-1' }, REVIEWER).ok, false)
})

test('an editor may plan, decline, mark supplied, and create or remove a request', () => {
  const before = req('r1')
  assert.equal(authoriseOneMediaRequestChange(before, { ...before, status: 'planned' }, EDITOR).ok, true)
  assert.equal(authoriseOneMediaRequestChange(before, { ...before, status: 'declined' }, EDITOR).ok, true)
  assert.equal(authoriseOneMediaRequestChange(before, { ...before, status: 'supplied', mediaId: 'm' }, EDITOR).ok, true)
  assert.equal(authoriseOneMediaRequestChange(null, req('new'), EDITOR).ok, true)   // create
  assert.equal(authoriseOneMediaRequestChange(before, null, EDITOR).ok, true)       // remove
  assert.equal(authoriseOneMediaRequestChange(null, req('new'), REVIEWER).ok, false) // reviewer cannot create
})

test('a reviewer may open an escalation with a reason and priority, but not resolve it', () => {
  const before = req('r1')
  const escalated = { ...before, escalation: { reason: 'no rights-clear source', priority: 'high', byUserId: 'u', byName: 'R', byRole: 'Reviewer', at: 't', status: 'open', history: [] } }
  assert.equal(authoriseOneMediaRequestChange(before, escalated, REVIEWER).ok, true)
  // missing reason/priority refused
  assert.equal(authoriseOneMediaRequestChange(before, { ...before, escalation: { reason: '', priority: 'high', status: 'open', history: [] } }, REVIEWER).ok, false)
  // resolving is editor-only
  const resolved = { ...escalated, escalation: { ...escalated.escalation, status: 'resolved', history: [{ at: 't2', actorId: 'e', actorName: 'Ed', actorRole: 'Editor', action: 'resolved' }] } }
  assert.equal(authoriseOneMediaRequestChange(escalated, resolved, REVIEWER).ok, false)
  assert.equal(authoriseOneMediaRequestChange(escalated, resolved, EDITOR).ok, true)
})

test('an open escalation makes the request read-only to a reviewer, but not to an editor', () => {
  const escalated = { ...req('r1'), escalation: { reason: 'r', priority: 'high', byUserId: 'u', byName: 'R', byRole: 'Reviewer', at: 't', status: 'open', history: [] } }
  // Reviewer cannot even attach media while it is escalated-open.
  assert.equal(authoriseOneMediaRequestChange(escalated, { ...escalated, mediaId: 'm' }, REVIEWER).ok, false)
  // Editor can act on it (e.g. return it).
  const returned = { ...escalated, escalation: { ...escalated.escalation, status: 'returned', history: [{ at: 't2', actorId: 'e', actorName: 'Ed', actorRole: 'Editor', action: 'returned' }] } }
  assert.equal(authoriseOneMediaRequestChange(escalated, returned, EDITOR).ok, true)
})

test('escalation history cannot be shortened or rewritten', () => {
  const withHistory = { ...req('r1'), escalation: { reason: 'r', priority: 'high', byUserId: 'u', byName: 'R', byRole: 'Reviewer', at: 't', status: 'open', history: [{ at: 't', actorId: 'u', actorName: 'R', actorRole: 'Reviewer', action: 'escalated' }] } }
  const shortened = { ...withHistory, escalation: { ...withHistory.escalation, status: 'resolved', history: [] } }
  assert.equal(authoriseOneMediaRequestChange(withHistory, shortened, EDITOR).ok, false)
})

test('the item-level pass collects refusals across every changed request', () => {
  const before = { id: 'q1', mediaRequests: [req('r1'), req('r2')] }
  const after = { id: 'q1', mediaRequests: [{ ...req('r1'), status: 'planned' }, { ...req('r2'), mediaId: 'm' }] }
  const reviewer = authoriseMediaRequestTransitions(before, after, REVIEWER)
  assert.equal(reviewer.ok, false)
  assert.deepEqual(reviewer.refusals.map((r) => r.id), ['r1']) // r2 (attach) is fine; r1 (planned) is refused
  assert.equal(authoriseMediaRequestTransitions(before, after, EDITOR).ok, true)
})
