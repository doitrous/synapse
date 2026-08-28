import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildBoard, isPair, MIN_PAIRS, DEFAULT_PAIRS, type MatchTile } from './termMatch.ts'
import type { MedicalTerm } from './glossary.ts'

/** Eight fully-populated terms — enough to clear MIN_PAIRS on their own. */
const terms: MedicalTerm[] = [
  { id: 'anterior', term: 'Anterior', ar: 'أمامي', category: 'Directional & anatomy', def: 'Toward the front of the body.', defAr: 'باتجاه مقدمة الجسم.' },
  { id: 'posterior', term: 'Posterior', ar: 'خلفي', category: 'Directional & anatomy', def: 'Toward the back of the body.', defAr: 'باتجاه مؤخرة الجسم.' },
  { id: 'superior', term: 'Superior', ar: 'علوي', category: 'Directional & anatomy', def: 'Above, toward the head.', defAr: 'أعلى، باتجاه الرأس.' },
  { id: 'inferior', term: 'Inferior', ar: 'سفلي', category: 'Directional & anatomy', def: 'Below, toward the feet.', defAr: 'أسفل، باتجاه القدمين.' },
  { id: 'medial', term: 'Medial', ar: 'إنسي', category: 'Directional & anatomy', def: 'Closer to the midline of the body.', defAr: 'أقرب إلى خط منتصف الجسم.' },
  { id: 'lateral', term: 'Lateral', ar: 'وحشي', category: 'Directional & anatomy', def: 'Farther from the midline, toward the side.', defAr: 'أبعد عن خط المنتصف، باتجاه الجانب.' },
  { id: 'proximal', term: 'Proximal', ar: 'قريب', category: 'Directional & anatomy', def: 'Closer to the point of attachment or trunk.', defAr: 'أقرب إلى نقطة الاتصال أو الجذع.' },
  { id: 'distal', term: 'Distal', ar: 'بعيد', category: 'Directional & anatomy', def: 'Farther from the point of attachment.', defAr: 'أبعد عن نقطة الاتصال.' },
]

/** Same eight terms plus one with a blank Arabic translation. */
const termsWithBlankArabic: MedicalTerm[] = [
  ...terms,
  { id: 'no-arabic', term: 'Sepsis', ar: '', category: 'Common conditions', def: 'A dangerous whole-body response to infection.', defAr: 'استجابة خطيرة للجسم كله تجاه العدوى.' },
]

/** Only five usable terms — below MIN_PAIRS. */
const tooFew: MedicalTerm[] = terms.slice(0, 5)

test('the same terms, mode and seed build an identical board, tile order included', () => {
  const a = buildBoard(terms, 'definition', 42)
  const b = buildBoard(terms, 'definition', 42)
  assert.deepEqual(a, b)
})

test('a different seed reorders the tiles', () => {
  const a = buildBoard(terms, 'definition', 1)
  const b = buildBoard(terms, 'definition', 2)
  assert.notDeepEqual(a.tiles, b.tiles)
})

test('a board has two tiles per pair', () => {
  const board = buildBoard(terms, 'definition', 7)
  assert.equal(board.pairs, terms.length)
  assert.equal(board.tiles.length, board.pairs * 2)
})

test('every pairId appears exactly twice, once per side', () => {
  const board = buildBoard(terms, 'definition', 7)
  const bySide = new Map<string, Set<MatchTile['side']>>()
  for (const tile of board.tiles) {
    const sides = bySide.get(tile.pairId) ?? new Set()
    sides.add(tile.side)
    bySide.set(tile.pairId, sides)
  }
  const counts = new Map<string, number>()
  for (const tile of board.tiles) counts.set(tile.pairId, (counts.get(tile.pairId) ?? 0) + 1)

  for (const [pairId, sides] of bySide) {
    assert.equal(counts.get(pairId), 2, `pair ${pairId} should appear twice`)
    assert.deepEqual([...sides].sort(), ['partner', 'term'], `pair ${pairId} should have one of each side`)
  }
})

test('terms stay fixed on the left and partners are shuffled on the right', () => {
  const board = buildBoard(terms, 'definition', 7)
  assert.equal(board.termTiles.length, board.pairs)
  assert.equal(board.partnerTiles.length, board.pairs)
  assert.ok(board.termTiles.every((tile) => tile.side === 'term'))
  assert.ok(board.partnerTiles.every((tile) => tile.side === 'partner'))
  assert.deepEqual(board.tiles, [...board.termTiles, ...board.partnerTiles])
  assert.notDeepEqual(
    board.partnerTiles.map((tile) => tile.pairId),
    board.termTiles.map((tile) => tile.pairId),
  )
})

test('isPair accepts two tiles that share a pairId and differ in side', () => {
  const a: MatchTile = { id: 'a', pairId: 'p1', text: 'x', side: 'term' }
  const b: MatchTile = { id: 'b', pairId: 'p1', text: 'y', side: 'partner' }
  assert.ok(isPair(a, b))
  assert.ok(isPair(b, a))
})

test('isPair rejects two tiles on the same side', () => {
  const a: MatchTile = { id: 'a', pairId: 'p1', text: 'x', side: 'term' }
  const b: MatchTile = { id: 'b', pairId: 'p1', text: 'y', side: 'term' }
  assert.ok(!isPair(a, b))
})

test('isPair rejects tiles from different pairs', () => {
  const a: MatchTile = { id: 'a', pairId: 'p1', text: 'x', side: 'term' }
  const b: MatchTile = { id: 'b', pairId: 'p2', text: 'y', side: 'partner' }
  assert.ok(!isPair(a, b))
})

test('isPair rejects a tile paired with itself', () => {
  const a: MatchTile = { id: 'a', pairId: 'p1', text: 'x', side: 'term' }
  assert.ok(!isPair(a, a))
})

test('builds a board in arabic mode', () => {
  const board = buildBoard(terms, 'arabic', 3)
  assert.equal(board.refusal, null)
  assert.equal(board.mode, 'arabic')
  assert.equal(board.tiles.length, terms.length * 2)
})

test('builds a board in definition mode', () => {
  const board = buildBoard(terms, 'definition', 3)
  assert.equal(board.refusal, null)
  assert.equal(board.mode, 'definition')
  assert.equal(board.tiles.length, terms.length * 2)
})

test('a term with a blank Arabic translation is skipped in arabic mode', () => {
  const board = buildBoard(termsWithBlankArabic, 'arabic', 9)
  assert.equal(board.refusal, null)
  assert.ok(!board.tiles.some((tile) => tile.pairId === 'no-arabic'))
  assert.equal(board.pairs, terms.length)
})

test('that same term is not skipped in definition mode, since its def is present', () => {
  const board = buildBoard(termsWithBlankArabic, 'definition', 9)
  assert.ok(board.tiles.some((tile) => tile.pairId === 'no-arabic'))
})

test('fewer than MIN_PAIRS usable terms produces a refusal and no tiles', () => {
  assert.ok(tooFew.length < MIN_PAIRS)
  const board = buildBoard(tooFew, 'definition', 9)
  assert.equal(board.refusal, 'too_few_terms')
  assert.equal(board.tiles.length, 0)
  assert.equal(board.pairs, 0)
})

test('arabic tiles are flagged so the UI can set lang/dir, in arabic mode only', () => {
  const arabicBoard = buildBoard(terms, 'arabic', 5)
  const partnerTiles = arabicBoard.tiles.filter((tile) => tile.side === 'partner')
  assert.ok(partnerTiles.length > 0)
  assert.ok(partnerTiles.every((tile) => tile.arabic === true))
  const termTiles = arabicBoard.tiles.filter((tile) => tile.side === 'term')
  assert.ok(termTiles.every((tile) => tile.arabic !== true))

  const definitionBoard = buildBoard(terms, 'definition', 5)
  assert.ok(definitionBoard.tiles.every((tile) => tile.arabic !== true))
})

test('DEFAULT_PAIRS caps the board size when more terms are offered', () => {
  const extra: MedicalTerm[] = [
    ...terms,
    { id: 'extra-1', term: 'Extra1', ar: 'شيء', category: 'Word parts', def: 'An extra term.', defAr: 'مصطلح إضافي.' },
    { id: 'extra-2', term: 'Extra2', ar: 'شيء آخر', category: 'Word parts', def: 'Another extra term.', defAr: 'مصطلح إضافي آخر.' },
    { id: 'extra-3', term: 'Extra3', ar: 'شيء ثالث', category: 'Word parts', def: 'A third extra term.', defAr: 'مصطلح إضافي ثالث.' },
  ]
  const board = buildBoard(extra, 'definition', 5)
  assert.equal(board.pairs, DEFAULT_PAIRS)
  assert.equal(board.tiles.length, DEFAULT_PAIRS * 2)
})
