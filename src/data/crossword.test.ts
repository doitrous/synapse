import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildGrid, givenTermsForGrid, MIN_TERMS, normalizeTermGridAnswer, normalizeTermGridLetter, type GridTerm, type Grid } from './crossword.ts'

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

test('the minimum is a floor on words actually placed, not just words offered', () => {
  // One seed proves nothing here: it was a rare unlucky shuffle that stranded
  // words and fell under the floor, so sweep a spread of seeds.
  for (let seed = 0; seed < 100; seed++) {
    const grid = buildGrid(terms, seed)
    assert.ok(grid.words.length >= MIN_TERMS, `seed ${seed} placed only ${grid.words.length}`)
  }
})

test('retrying from a derived seed costs no determinism', () => {
  // Seeds whose first arrangement falls short, so the retry path is the one
  // being compared — a shared link must still open the same puzzle for both.
  for (const seed of [129, 743, 784, 967, 999]) {
    assert.deepEqual(buildGrid(terms, seed), buildGrid(terms, seed))
  }
})

test('neighbouring seeds do not collide once retries are in play', () => {
  // The retry windows of adjacent seeds must not overlap, or two friends with
  // different links would be handed the same puzzle.
  const seen = new Set<string>()
  for (let seed = 0; seed < 40; seed++) seen.add(JSON.stringify(buildGrid(terms, seed).words))
  assert.ok(seen.size > 35, `only ${seen.size} distinct arrangements across 40 seeds`)
})

test('terms that can never interlock enough are refused, not made into a stub', () => {
  // Nine usable terms, so the count gate passes, but they share no letter and
  // no arrangement can interlock a second one.
  const isolated: GridTerm[] = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE', 'FFF', 'GGG', 'HHH', 'III']
    .map((term) => ({ term, clue: `Clue for ${term}` }))
  const grid = buildGrid(isolated, 6)
  assert.equal(grid.words.length, 0)
  assert.equal(grid.width, 0)
  assert.equal(grid.height, 0)
  assert.equal(grid.skipped.length, 9)
})

test('answer normalization ignores copy-paste presentation marks consistently', () => {
  assert.equal(normalizeTermGridAnswer("  naïve T-cell's β-lock  "), 'NAIVETCELLSLOCK')
  assert.equal(normalizeTermGridAnswer('co\u0301te d’ivoire'), 'COTEDIVOIRE')
  assert.equal(normalizeTermGridLetter(' -é '), 'E')
})

test('grid building uses the same normalization as typed answers', () => {
  const noisy: GridTerm[] = [
    { term: 'Anterior', clue: 'Toward the front' },
    { term: 'post-erior', clue: 'Toward the back' },
    { term: 'supérior', clue: 'Above' },
    { term: 'in ferior', clue: 'Below' },
    { term: "medi'al", clue: 'Toward the midline' },
    { term: 'late ral', clue: 'Away from the midline' },
    { term: 'proximal', clue: 'Nearer the trunk' },
    { term: 'distal', clue: 'Further from the trunk' },
    { term: 'supine', clue: 'Lying face up' },
    { term: 'prone', clue: 'Lying face down' },
  ]
  const grid = buildGrid(noisy, 12)
  const reported = new Set([...grid.words.map((word) => word.term), ...grid.skipped])
  assert.ok(reported.has('SUPERIOR'))
  assert.ok(reported.has('INFERIOR'))
  assert.ok(grid.words.every((word) => /^[A-Z]+$/.test(word.term)))
})

test('exactly two givens are selected deterministically when a grid has enough words', () => {
  const grid = buildGrid(terms, 21)
  const givens = givenTermsForGrid(grid, 21)
  assert.equal(givens.length, 2)
  assert.deepEqual(givens, givenTermsForGrid(grid, 21))
  assert.ok(givens.every((term) => grid.words.some((word) => word.term === term)))
})

test('the board stays small enough to solve on a phone', () => {
  // A guard against sprawl regressing, not a magic number: over seeds 0-1999
  // this generator's worst board is 18 squares on its longest side and 255
  // squares in total, so these bounds are the measured worst case with about a
  // fifth again as headroom. Tripping this means placement started sprawling.
  for (let seed = 0; seed < 100; seed++) {
    const grid = buildGrid(terms, seed)
    assert.ok(grid.width <= 22 && grid.height <= 22, `seed ${seed} built ${grid.width}x${grid.height}`)
    assert.ok(grid.width * grid.height <= 320, `seed ${seed} covers ${grid.width * grid.height} squares`)
  }
})
