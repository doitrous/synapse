import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildGrid, MIN_TERMS, type GridTerm, type Grid } from './crossword.ts'

const terms: GridTerm[] = [
  { term: 'ANTERIOR', clue: 'Toward the front' },
  { term: 'POSTERIOR', clue: 'Toward the back' },
  { term: 'SUPERIOR', clue: 'Above' },
  { term: 'INFERIOR', clue: 'Below' },
  { term: 'MEDIAL', clue: 'Toward the midline' },
  { term: 'LATERAL', clue: 'Away from the midline' },
  { term: 'PROXIMAL', clue: 'Nearer the trunk' },
  { term: 'DISTAL', clue: 'Further from the trunk' },
  { term: 'SUPINE', clue: 'Lying face up' },
  { term: 'PRONE', clue: 'Lying face down' },
]

/** Every square a grid actually uses, as "row,column" -> letter. */
function squares(grid: Grid): Map<string, string> {
  const used = new Map<string, string>()
  for (const word of grid.words) {
    for (let i = 0; i < word.term.length; i++) {
      const row = word.direction === 'down' ? word.row + i : word.row
      const column = word.direction === 'across' ? word.column + i : word.column
      used.set(`${row},${column}`, word.term[i])
    }
  }
  return used
}

test('the same seed and terms build the identical grid', () => {
  assert.deepEqual(buildGrid(terms, 42), buildGrid(terms, 42))
})

test('a different seed arranges them differently', () => {
  const a = JSON.stringify(buildGrid(terms, 1).words)
  const b = JSON.stringify(buildGrid(terms, 2).words)
  assert.notEqual(a, b)
})

test('letters agree wherever two words cross', () => {
  const grid = buildGrid(terms, 7)
  // squares() would silently overwrite a disagreement, so check as we build.
  const used = new Map<string, string>()
  for (const word of grid.words) {
    for (let i = 0; i < word.term.length; i++) {
      const row = word.direction === 'down' ? word.row + i : word.row
      const column = word.direction === 'across' ? word.column + i : word.column
      const key = `${row},${column}`
      const existing = used.get(key)
      if (existing !== undefined) assert.equal(existing, word.term[i], `disagreement at ${key}`)
      used.set(key, word.term[i])
    }
  }
})

test('every word after the first crosses another', () => {
  const grid = buildGrid(terms, 7)
  assert.ok(grid.words.length >= MIN_TERMS)
  const used = squares(grid)
  for (const word of grid.words.slice(1)) {
    const crossings = [...Array(word.term.length).keys()].filter((i) => {
      const row = word.direction === 'down' ? word.row + i : word.row
      const column = word.direction === 'across' ? word.column + i : word.column
      // A crossing is a square this word shares with a word running the other way.
      return grid.words.some((other) => other !== word && other.direction !== word.direction
        && coversSquare(other, row, column))
    })
    assert.ok(crossings.length > 0, `${word.term} crosses nothing`)
  }
  assert.ok(used.size > 0)
})

function coversSquare(word: { term: string; row: number; column: number; direction: 'across' | 'down' }, row: number, column: number) {
  for (let i = 0; i < word.term.length; i++) {
    const r = word.direction === 'down' ? word.row + i : word.row
    const c = word.direction === 'across' ? word.column + i : word.column
    if (r === row && c === column) return true
  }
  return false
}

test('the grid is cropped to the squares it uses', () => {
  const grid = buildGrid(terms, 3)
  const used = squares(grid)
  const rows = [...used.keys()].map((k) => Number(k.split(',')[0]))
  const columns = [...used.keys()].map((k) => Number(k.split(',')[1]))
  assert.equal(Math.min(...rows), 0)
  assert.equal(Math.min(...columns), 0)
  assert.equal(grid.height, Math.max(...rows) + 1)
  assert.equal(grid.width, Math.max(...columns) + 1)
})

test('no more than the maximum are placed', () => {
  const many = Array.from({ length: 40 }, (_, i) => ({ term: `TERM${i}`, clue: `Clue ${i}` }))
  assert.ok(buildGrid(many, 5, 12).words.length <= 12)
})

test('a term that cannot be interlocked is reported, not dropped in silence', () => {
  const grid = buildGrid([...terms, { term: 'XYZQW', clue: 'Shares no letter' }], 9)
  const placed = new Set(grid.words.map((w) => w.term))
  if (!placed.has('XYZQW')) assert.ok(grid.skipped.includes('XYZQW'))
})

test('too few usable terms is refused rather than made into a thin puzzle', () => {
  const grid = buildGrid(terms.slice(0, 3), 4)
  assert.equal(grid.words.length, 0)
  assert.equal(grid.skipped.length, 3)
})

test('numbering runs top to bottom, left to right', () => {
  const grid = buildGrid(terms, 11)
  const ordered = [...grid.words].sort((a, b) => a.row - b.row || a.column - b.column)
  let previous = 0
  for (const word of ordered) {
    assert.ok(word.number >= previous, 'numbers must not go backwards in reading order')
    previous = word.number
  }
})

test('a square starting both an across and a down word carries one number', () => {
  const grid = buildGrid(terms, 13)
  const starts = new Map<string, number[]>()
  for (const word of grid.words) {
    const key = `${word.row},${word.column}`
    starts.set(key, [...(starts.get(key) ?? []), word.number])
  }
  for (const [, numbers] of starts) {
    assert.equal(new Set(numbers).size, 1, 'one square, one number')
  }
})
