import { strict as assert } from 'node:assert'
import test from 'node:test'
import {
  BOARD, NOTE_HEIGHT, NOTE_WIDTH, anchorOf, clampToBoard, clampView, defaultControls,
  linkPath, matchNotes, noteAt, sidesBetween, toBoard, viewCentredOn,
} from './whiteboardGeometry.ts'

const note = (id: string, x: number, y: number, text = '') => ({ id, x, y, text })

test('a point past an edge is brought back onto the board', () => {
  assert.deepEqual(clampToBoard({ x: -50, y: -50 }), { x: 0, y: 0 })
  assert.deepEqual(clampToBoard({ x: 99999, y: 99999 }), { x: BOARD.width, y: BOARD.height })
})

test('a note is clamped by its far edge, not its corner', () => {
  const placed = clampToBoard({ x: BOARD.width - 10, y: 0 }, { width: NOTE_WIDTH, height: NOTE_HEIGHT })
  assert.equal(placed.x, BOARD.width - NOTE_WIDTH)
})

test('panning stops at the board edge rather than running on into nothing', () => {
  const viewport = { width: 1000, height: 700 }
  assert.equal(clampView({ x: 500, y: 300, scale: 1 }, viewport).x, 0)
  const far = clampView({ x: -99999, y: -99999, scale: 1 }, viewport)
  assert.equal(far.x, viewport.width - BOARD.width)
  assert.equal(far.y, viewport.height - BOARD.height)
})

test('a board smaller than its window is centred, not cornered', () => {
  const viewport = { width: 1000, height: 700 }
  const view = clampView({ x: -400, y: -400, scale: 0.05 }, viewport)
  assert.equal(view.x, (1000 - BOARD.width * 0.05) / 2)
  assert.equal(view.y, (700 - BOARD.height * 0.05) / 2)
})

test('a view already inside the board is left alone', () => {
  const view = { x: -1200, y: -800, scale: 1 }
  assert.deepEqual(clampView(view, { width: 1000, height: 700 }), view)
})

test('screen pixels map back to board coordinates through the view', () => {
  const view = { x: -200, y: -100, scale: 2 }
  assert.deepEqual(toBoard({ x: 400, y: 300 }, view), { x: 300, y: 200 })
})

test('connectors leave the middle of an edge', () => {
  const subject = note('a', 100, 200)
  assert.deepEqual(anchorOf(subject, 'start'), { x: 100, y: 200 + NOTE_HEIGHT / 2 })
  assert.deepEqual(anchorOf(subject, 'end'), { x: 100 + NOTE_WIDTH, y: 200 + NOTE_HEIGHT / 2 })
})

test('a note to the right is joined end-to-start, and one to the left the other way', () => {
  const left = note('a', 0, 0)
  const right = note('b', 600, 0)
  assert.deepEqual(sidesBetween(left, right), { from: 'end', to: 'start' })
  assert.deepEqual(sidesBetween(right, left), { from: 'start', to: 'end' })
  // Stacked notes read left-to-right, so the tie goes to the forward direction.
  assert.deepEqual(sidesBetween(left, note('c', 0, 400)), { from: 'end', to: 'start' })
})

test('the default bend eases horizontally out of both ends', () => {
  const [c1, c2] = defaultControls({ x: 0, y: 50 }, { x: 400, y: 250 })
  assert.equal(c1.y, 50)
  assert.equal(c2.y, 250)
  assert.equal(c1.x, 200)
  assert.equal(c2.x, 200)
})

test('a very short connector still bends by a visible minimum', () => {
  const [c1] = defaultControls({ x: 0, y: 0 }, { x: 10, y: 0 })
  assert.equal(c1.x, 40)
})

test('a bent connector keeps the control points it was given', () => {
  const bent = linkPath({ x: 0, y: 0 }, { x: 100, y: 0 }, [{ x: 10, y: -80 }, { x: 90, y: 80 }])
  assert.equal(bent.d, 'M 0 0 C 10 -80, 90 80, 100 0')
  assert.deepEqual(bent.controls, [{ x: 10, y: -80 }, { x: 90, y: 80 }])
})

test('the topmost note wins when two overlap', () => {
  const under = note('under', 0, 0)
  const over = note('over', 20, 20)
  assert.equal(noteAt([under, over], { x: 40, y: 40 })?.id, 'over')
})

test('a point outside every note hits nothing', () => {
  assert.equal(noteAt([note('a', 0, 0)], { x: 900, y: 900 }), null)
})

test('search matches text, case-insensitively, and skips notes without it', () => {
  const notes = [note('a', 0, 0, 'Preload and afterload'), note('b', 0, 0, 'Murmurs'), note('c', 0, 0, '')]
  assert.deepEqual(matchNotes(notes, 'PRELOAD').map((n) => n.id), ['a'])
  assert.deepEqual(matchNotes(notes, ''), [])
})

test('hits are stepped through in reading order, not the order they were made', () => {
  const notes = [
    note('bottom', 10, 800, 'aortic'),
    note('top-right', 900, 10, 'aortic'),
    note('top-left', 10, 10, 'aortic'),
  ]
  assert.deepEqual(matchNotes(notes, 'aortic').map((n) => n.id), ['top-left', 'top-right', 'bottom'])
})

test('centring on a point puts it mid-viewport, and stays on the board', () => {
  const viewport = { width: 1000, height: 700 }
  const view = viewCentredOn({ x: 2000, y: 1500 }, viewport, 1)
  assert.equal(view.x, 500 - 2000)
  assert.equal(view.y, 350 - 1500)
  // A point near the corner cannot be centred without leaving the board.
  assert.equal(viewCentredOn({ x: 0, y: 0 }, viewport, 1).x, 0)
})
