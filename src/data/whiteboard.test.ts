import { strict as assert } from 'node:assert'
import test from 'node:test'
import {
  INITIAL_BOARD,
  addWhiteboard,
  createWhiteboardDocument,
  emptyWhiteboardCollection,
  groupWhiteboardsByTopic,
  migrateSingleBoardToCollection,
  removeWhiteboard,
  sameAudienceSharedBoards,
  toggleWhiteboardFollow,
  toggleWhiteboardStar,
  updateWhiteboardState,
  type BoardState,
} from './whiteboard.ts'

const legacy: BoardState = {
  notes: [{ id: 'n1', x: 10.125, y: 20.875, text: 'legacy', tone: 'paper' }],
  links: [],
  frames: [],
  images: [{ id: 'p1', x: 40.25, y: 50.5, width: 260.75, height: 130.125, src: 'data:image/png;base64,old', alt: 'old' }],
  ink: [{ id: 'i1', points: [1.25, 2.5, 3.75, 4.125], color: 'var(--color-ink)', width: 4 }],
}

test('lazy migration preserves the existing single board as the default board', () => {
  const collection = emptyWhiteboardCollection('u1', 'Mona', 'asu', 'Year 3')
  const migrated = migrateSingleBoardToCollection(legacy, collection, { ownerId: 'u1', ownerName: 'Mona', universityId: 'asu', year: 'Year 3' }, '2026-08-24T00:00:00.000Z')
  assert.equal(migrated.migratedFromSingleBoard, true)
  assert.equal(migrated.boards.length, 1)
  assert.equal(migrated.boards[0].title, 'Default board')
  assert.deepEqual(migrated.boards[0].state, legacy)
  assert.equal(migrated.boards[0].universityId, 'asu')
  assert.equal(migrated.boards[0].year, 'Year 3')
})

test('migration is idempotent and never duplicates the default board', () => {
  const once = migrateSingleBoardToCollection(legacy, emptyWhiteboardCollection(), { ownerId: 'u1', ownerName: 'Mona', universityId: 'asu', year: 'Year 3' })
  const twice = migrateSingleBoardToCollection(INITIAL_BOARD, once, { ownerId: 'u1', ownerName: 'Mona', universityId: 'asu', year: 'Year 3' })
  assert.equal(twice.boards.length, 1)
  assert.deepEqual(twice, once)
})

test('board updates preserve fractional coordinates and bump revision', () => {
  const migrated = migrateSingleBoardToCollection(legacy, emptyWhiteboardCollection(), { ownerId: 'u1', ownerName: 'Mona', universityId: 'asu', year: 'Year 3' })
  const nextState: BoardState = { ...legacy, notes: [{ id: 'n1', x: 10.333333, y: 20.666667, text: 'moved', tone: 'paper' }] }
  const updated = updateWhiteboardState(migrated, migrated.activeBoardId, nextState, '2026-08-24T01:00:00.000Z')
  assert.equal(updated.boards[0].revision, migrated.boards[0].revision + 1)
  assert.equal(updated.boards[0].state.notes[0].x, 10.333333)
  assert.equal(updated.boards[0].state.notes[0].y, 20.666667)
})

test('multiple named boards can be added and removed without losing the fallback board', () => {
  const collection = emptyWhiteboardCollection('u1', 'Mona', 'asu', 'Year 3')
  const second = createWhiteboardDocument({ id: 'wb-2', title: 'Renal map', ownerId: 'u1', ownerName: 'Mona', universityId: 'asu', year: 'Year 3' })
  const withSecond = addWhiteboard(collection, second)
  assert.equal(withSecond.activeBoardId, 'wb-2')
  assert.equal(withSecond.boards.length, 2)
  const removed = removeWhiteboard(withSecond, 'wb-2')
  assert.equal(removed.boards.length, 1)
  assert.equal(removed.activeBoardId, 'default')
  assert.equal(removeWhiteboard(removed, 'default').boards.length, 1)
})

test('shared boards are same-university/year only, grouped by topic and ranked by stars then freshness', () => {
  const base = emptyWhiteboardCollection('u1', 'Mona', 'asu', 'Year 3')
  const a = { ...createWhiteboardDocument({ id: 'a', title: 'A', ownerId: 'u2', ownerName: 'Ali', universityId: 'asu', year: 'Year 3' }), topics: ['CVS'], stars: ['s1'], updatedAt: '2026-08-24T01:00:00.000Z' }
  const b = { ...createWhiteboardDocument({ id: 'b', title: 'B', ownerId: 'u3', ownerName: 'Nour', universityId: 'asu', year: 'Year 3' }), topics: ['CVS'], stars: ['s1', 's2'], updatedAt: '2026-08-24T00:00:00.000Z' }
  const other = createWhiteboardDocument({ id: 'c', title: 'C', ownerId: 'u4', ownerName: 'Omar', universityId: 'asu', year: 'Year 4' })
  const collection = { ...base, sharedBoards: [a, b, other] }
  const scoped = sameAudienceSharedBoards(collection, { universityId: 'asu', year: 'Year 3' })
  assert.deepEqual(scoped.map((board) => board.id).sort(), ['a', 'b'])
  const grouped = groupWhiteboardsByTopic(scoped)
  assert.equal(grouped[0].topic, 'CVS')
  assert.deepEqual(grouped[0].boards.map((board) => board.id), ['b', 'a'])
})

test('stars and follows are one per student and toggle cleanly', () => {
  const board = createWhiteboardDocument({ id: 'a', title: 'A', ownerId: 'u2', ownerName: 'Ali', universityId: 'asu', year: 'Year 3' })
  const starred = toggleWhiteboardStar(board, 'u1')
  assert.deepEqual(starred.stars, ['u1'])
  assert.deepEqual(toggleWhiteboardStar(starred, 'u1').stars, [])
  const followed = toggleWhiteboardFollow(board, 'u1')
  assert.deepEqual(followed.follows, ['u1'])
  assert.deepEqual(toggleWhiteboardFollow(followed, 'u1').follows, [])
})
