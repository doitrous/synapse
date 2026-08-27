import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { authoriseChanges, diffDocument, isMergeable, mergeDocument } from './stateMerge.js'

const LEDGER = 'synapse-admin-content-ledger-v4'
const GRAPH = 'synapse-concept-graph-v2'
const TREES = 'synapse-library-trees-v1'

const q = (id, title, moduleIds = ['MOD_CVS']) => ({
  id, kind: 'question', title, questionData: { tags: { moduleIds, years: [] } },
})

test('every content kind in the ledger is owned by a tab', () => {
  // Read from the client's ContentKind union, so a kind added there without a
  // tab here fails this test rather than silently refusing every save of it.
  const source = readFileSync(new URL('../../src/data/contentControl.ts', import.meta.url), 'utf8')
  const declared = source
    .match(/export type ContentKind = ([^\n]+)/)[1]
    .split('|').map((part) => part.trim().replace(/'/g, ''))
  for (const kind of declared) {
    const changes = diffDocument(LEDGER, [], [{ id: 'x', kind }])
    assert.equal(changes[0].tabs.length > 0, true, `no tab authors "${kind}"`)
  }
})

test('only the keyed collections merge', () => {
  assert.equal(isMergeable(LEDGER), true)
  assert.equal(isMergeable(GRAPH), true)
  assert.equal(isMergeable('synapse-vouchers-v1'), false)
})

test('a diff names what changed, by collection and id', () => {
  const base = [q('a', 'One'), q('b', 'Two')]
  const next = [q('a', 'One edited'), q('c', 'Three')]
  const changes = diffDocument(LEDGER, base, next)
  assert.deepEqual(
    changes.map((change) => [change.id, change.before ? 'was' : 'new', change.after ? 'is' : 'gone']).sort(),
    [['a', 'was', 'is'], ['b', 'was', 'gone'], ['c', 'new', 'is']],
  )
  assert.equal(changes.every((change) => change.kind === 'question'), true)
})

test('an untouched document produces no changes, whatever the key order', () => {
  const base = [{ id: 'a', kind: 'question', title: 'One', questionData: { tags: {} } }]
  const next = [{ kind: 'question', questionData: { tags: {} }, title: 'One', id: 'a' }]
  assert.deepEqual(diffDocument(LEDGER, base, next), [])
})

test('the concept graph diffs its two collections separately', () => {
  const base = { concepts: [{ id: 'c1', label: 'A' }], relations: [{ id: 'r1', type: 'causes' }] }
  const next = { concepts: [{ id: 'c1', label: 'B' }], relations: [] }
  const changes = diffDocument(GRAPH, base, next)
  assert.deepEqual(changes.map((change) => [change.collection, change.id]), [['concepts', 'c1'], ['relations', 'r1']])
  assert.equal(changes[0].kind, 'concept')
})

test('a change is refused when the caller does not hold its tab', () => {
  const changes = diffDocument(LEDGER, [], [q('a', 'One')])
  assert.equal(authoriseChanges(changes, { heldTabs: ['questions'], contentScope: null }).ok, true)
  const refused = authoriseChanges(changes, { heldTabs: ['library'], contentScope: null })
  assert.equal(refused.ok, false)
  assert.match(refused.refusals[0].reason, /not part of your role/)
})

test('a media-request-only edit is allowed by the media tab or by the owner tab', () => {
  const before = q('a', 'One')
  const after = { ...before, questionData: { ...before.questionData, mediaRequests: [{ id: 'm1', brief: 'ECG' }] } }
  const changes = diffDocument(LEDGER, [before], [after])
  assert.equal(authoriseChanges(changes, { heldTabs: ['media'], contentScope: null }).ok, true)
  assert.equal(authoriseChanges(changes, { heldTabs: ['questions'], contentScope: null }).ok, true)
  assert.equal(authoriseChanges(changes, { heldTabs: ['library'], contentScope: null }).ok, false)
})

test('a nested media-request edit is allowed by the media tab', () => {
  const before = { ...q('a', 'One'), questionData: { tags: {}, answers: [{ label: 'A', mediaRequests: [{ id: 'm1', status: 'needed' }] }] } }
  const after = { ...before, questionData: { ...before.questionData, answers: [{ label: 'A', mediaRequests: [{ id: 'm1', status: 'planned' }] }] } }
  const changes = diffDocument(LEDGER, [before], [after])
  assert.equal(authoriseChanges(changes, { heldTabs: ['media'], contentScope: null }).ok, true)
})

test('holding the media tab does not license editing the rest of the question', () => {
  const before = q('a', 'One')
  const after = q('a', 'Rewritten stem')
  const changes = diffDocument(LEDGER, [before], [after])
  assert.equal(authoriseChanges(changes, { heldTabs: ['media'], contentScope: null }).ok, false)
})

test('a change outside the caller scope is refused, and the request refuses whole', () => {
  const scope = { moduleIds: ['MOD_CVS'], yearIds: [] }
  const changes = diffDocument(LEDGER, [], [q('a', 'Mine'), q('b', 'Theirs', ['MOD_RES'])])
  const result = authoriseChanges(changes, { heldTabs: ['questions'], contentScope: scope })
  assert.equal(result.ok, false)
  assert.deepEqual(result.refusals.map((refusal) => refusal.id), ['b'])
  assert.match(result.refusals[0].reason, /outside the modules and years/)
})

test('concurrent edits to different items both survive', () => {
  const base = [q('a', 'One'), q('b', 'Two')]
  const stored = [q('a', 'One edited by them'), q('b', 'Two')]
  const incoming = [q('a', 'One'), q('b', 'Two edited by me')]
  const merged = mergeDocument(LEDGER, base, stored, incoming)
  assert.equal(merged.ok, true)
  assert.deepEqual(
    merged.value.map((item) => item.title).sort(),
    ['One edited by them', 'Two edited by me'],
  )
})

test('concurrent edits to the same item are a conflict, not a winner', () => {
  const base = [q('a', 'One')]
  const stored = [q('a', 'Theirs')]
  const incoming = [q('a', 'Mine')]
  const merged = mergeDocument(LEDGER, base, stored, incoming)
  assert.equal(merged.ok, false)
  assert.deepEqual(merged.conflicts, ['a'])
})

test('an item deleted underneath me is a conflict rather than a resurrection', () => {
  const merged = mergeDocument(LEDGER, [q('a', 'One')], [], [q('a', 'Mine')])
  assert.equal(merged.ok, false)
  assert.deepEqual(merged.conflicts, ['a'])
})

test('my deletion applies onto what is stored, and leaves their additions alone', () => {
  const base = [q('a', 'One')]
  const stored = [q('a', 'One'), q('z', 'Theirs')]
  const merged = mergeDocument(LEDGER, base, stored, [])
  assert.equal(merged.ok, true)
  assert.deepEqual(merged.value.map((item) => item.id), ['z'])
})

test('two people adding different items keep both', () => {
  const merged = mergeDocument(LEDGER, [], [q('theirs', 'Theirs')], [q('mine', 'Mine')])
  assert.equal(merged.ok, true)
  assert.deepEqual(merged.value.map((item) => item.id).sort(), ['mine', 'theirs'])
})

test('a reviewer may restructure their own year and not another', () => {
  const scope = { moduleIds: [], yearIds: ['OMS_Y2'] }
  const base = { trees: { 'year:OMS_Y2': [], 'year:OMS_Y4': [] } }
  const mine = { trees: { 'year:OMS_Y2': [{ id: 'n1', title: 'Anatomy' }], 'year:OMS_Y4': [] } }
  const theirs = { trees: { 'year:OMS_Y2': [], 'year:OMS_Y4': [{ id: 'n2', title: 'Anatomy' }] } }

  assert.equal(
    authoriseChanges(diffDocument(TREES, base, mine), { heldTabs: ['library'], contentScope: scope }).ok,
    true,
  )
  const refused = authoriseChanges(diffDocument(TREES, base, theirs), { heldTabs: ['library'], contentScope: scope })
  assert.equal(refused.ok, false)
  assert.match(refused.refusals[0].reason, /outside the modules and years/)
})

test('restructuring a tree needs the library tab', () => {
  const base = { trees: { 'year:OMS_Y2': [] } }
  const next = { trees: { 'year:OMS_Y2': [{ id: 'n1', title: 'Anatomy' }] } }
  const changes = diffDocument(TREES, base, next)
  assert.equal(authoriseChanges(changes, { heldTabs: ['library'], contentScope: null }).ok, true)
  assert.equal(authoriseChanges(changes, { heldTabs: ['questions'], contentScope: null }).ok, false)
})

test('two reviewers restructuring different years both keep their work', () => {
  const base = { trees: { 'year:OMS_Y2': [], 'year:OMS_Y4': [] } }
  const stored = { trees: { 'year:OMS_Y2': [], 'year:OMS_Y4': [{ id: 'n2', title: 'Theirs' }] } }
  const incoming = { trees: { 'year:OMS_Y2': [{ id: 'n1', title: 'Mine' }], 'year:OMS_Y4': [] } }
  const merged = mergeDocument(TREES, base, stored, incoming)
  assert.equal(merged.ok, true)
  assert.deepEqual(merged.value.trees['year:OMS_Y2'], [{ id: 'n1', title: 'Mine' }])
  assert.deepEqual(merged.value.trees['year:OMS_Y4'], [{ id: 'n2', title: 'Theirs' }])
})

test('two reviewers restructuring the same year collide by name', () => {
  const base = { trees: { 'year:OMS_Y2': [] } }
  const stored = { trees: { 'year:OMS_Y2': [{ id: 'n2', title: 'Theirs' }] } }
  const incoming = { trees: { 'year:OMS_Y2': [{ id: 'n1', title: 'Mine' }] } }
  const merged = mergeDocument(TREES, base, stored, incoming)
  assert.equal(merged.ok, false)
  assert.deepEqual(merged.conflicts, ['year:OMS_Y2'])
})

test('the newest version row must equal app_state, or every re-edit is a phantom conflict', () => {
  // Reproduces the production incident behind "publishing reverts by itself".
  // apply-content-import-to-db.mjs recorded the PRE-import ledger in the newest
  // app_state_versions row while app_state held the POST-import ledger. The
  // server rebuilds a client's merge base from that newest version row, so
  // `base` here lacks every imported item. Publishing one then looks like an
  // item added underneath the client — a conflict — and the client silently
  // re-reads, reverting the publish.
  const imported = (status) => ({
    id: 'q-imported', kind: 'question', title: 'Imported', status,
    questionData: { tags: { moduleIds: ['MOD_CVS'], years: [] } },
  })
  const staleBase = []                     // newest version row = pre-import
  const stored = [imported('Draft')]       // app_state = post-import
  const incoming = [imported('Published')] // the admin publishes it
  const broken = mergeDocument(LEDGER, staleBase, stored, incoming)
  assert.equal(broken.ok, false)
  assert.deepEqual(broken.conflicts, ['q-imported'])

  // With the invariant intact — the newest version row equals app_state — the
  // same publish merges cleanly. This is what the repaired import guarantees,
  // and what repair-content-version-baseline.mjs restores on a broken database.
  const correctBase = [imported('Draft')]
  const fixed = mergeDocument(LEDGER, correctBase, stored, incoming)
  assert.equal(fixed.ok, true)
  assert.equal(fixed.value.find((item) => item.id === 'q-imported').status, 'Published')
})

test('an unmergeable document is returned as sent, for the caller to version-check', () => {
  const merged = mergeDocument('synapse-vouchers-v1', { a: 1 }, { a: 2 }, { a: 3 })
  assert.equal(merged.ok, true)
  assert.deepEqual(merged.value, { a: 3 })
})
