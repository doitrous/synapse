import { test } from 'node:test'
import assert from 'node:assert/strict'
import { listDirective, importList, optionalList, splitList } from './importSemantics.ts'

/**
 * The `+` prefix, which marks a list cell as an append.
 *
 * The bug these pin: `listDirective` removed the `+` by slicing one character
 * off the front of the *cell* and then splitting, so only the first item lost
 * it. `+A | +B` appended `A` and stored the literal string `+B` — an ID no
 * record has, indistinguishable downstream from a real one, with no error at
 * any layer. Found in production data on ART-103-PHY-NERVE-ACTION-POTENTIAL.
 *
 * It affected newline-separated cells too, so "one item per line" was not the
 * workaround it appeared to be.
 */

test('every + item is an append, on every separator', () => {
  for (const cell of ['+A | +B', '+A\n+B', '+A;+B', '+A | B', '+A\nB']) {
    const directive = listDirective(cell)
    assert.equal(directive.mode, 'append', `${JSON.stringify(cell)} should append`)
    assert.deepEqual(directive.items, ['A', 'B'], `${JSON.stringify(cell)} stored a literal +`)
  }
})

test('no stored value ever keeps a leading +', () => {
  // The invariant worth stating on its own: no concept, article, claim or
  // resource ID begins with `+`, so a `+` reaching storage is always corruption
  // — whatever mode the cell was read in.
  for (const cell of ['+A | +B', 'X | +Y', '+A', '  +A  |  +B  ']) {
    for (const item of listDirective(cell).items) {
      assert.ok(!item.startsWith('+'), `${JSON.stringify(cell)} produced ${JSON.stringify(item)}`)
    }
  }
})

test('a mixed cell keeps its items but loses no characters', () => {
  // `X | +Y` — the cell does not start with `+`, so it reads as a replace, and
  // the `+` on the second item is the author saying "append" in a cell that is
  // not one. The mode is genuinely ambiguous and this function has no error
  // channel, so it does the one unambiguous thing: it never stores the `+`.
  // The batch validator refuses the cell so the author states which they meant
  // — see `validate-content-batch.mjs`, mixed-append check.
  const directive = listDirective('X | +Y')
  assert.equal(directive.mode, 'replace')
  assert.deepEqual(directive.items, ['X', 'Y'])
})

test('the modes themselves are unchanged', () => {
  assert.equal(listDirective(undefined).mode, 'untouched')
  assert.equal(listDirective('').mode, 'untouched')
  assert.equal(listDirective('   ').mode, 'untouched')
  assert.equal(listDirective('[clear]').mode, 'clear')
  assert.deepEqual(listDirective('[clear]').items, [])
  assert.equal(listDirective('A | B').mode, 'replace')
  assert.deepEqual(listDirective('A | B').items, ['A', 'B'])
})

test('splitList drops empties rather than producing blank ids', () => {
  assert.deepEqual(splitList('A ||  | B'), ['A', 'B'])
  // A lone `+` is a prefix with nothing after it, not an item called "+".
  assert.deepEqual(splitList('+ | A'), ['A'])
})

test('importList and optionalList inherit the fix', () => {
  // Both route through listDirective, which is why the fix belongs there and
  // not in each caller.
  assert.deepEqual(importList('+A | +B'), ['A', 'B'])
  assert.deepEqual(optionalList('+A | +B'), ['A', 'B'])
  // The distinction optionalList exists for survives.
  assert.equal(optionalList(undefined), undefined)
  assert.deepEqual(optionalList('[clear]'), [])
})
