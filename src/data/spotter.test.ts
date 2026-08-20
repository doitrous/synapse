import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildSpotter, ROUNDS, OPTIONS_PER_ROUND, MIN_LABELS, type SpotterGame } from './spotter.ts'
import type { HistologySlide } from './histology.ts'

// Two subjects, nine structures, every structure pinned somewhere — enough to
// fill a full game and to test same-subject distractor preference.
const slides: HistologySlide[] = [
  {
    id: 'ileum', title: 'Ileum', subjectId: 'gi', tissue: 'Small bowel', stain: 'H&E',
    views: [
      { objective: 4, image: 'ileum-4.jpg' },
      { objective: 10, image: 'ileum-10.jpg' },
    ],
    structures: [
      { id: 'villus', label: 'Villus', at: { 4: { x: 0.1, y: 0.1 }, 10: { x: 0.2, y: 0.2 } } },
      { id: 'goblet', label: 'Goblet cell', at: { 10: { x: 0.3, y: 0.3 } } },
      { id: 'crypt', label: 'Crypt of Lieberkühn', at: { 4: { x: 0.4, y: 0.4 } } },
    ],
  },
  {
    id: 'duodenum', title: 'Duodenum', subjectId: 'gi', tissue: 'Small bowel', stain: 'H&E',
    views: [
      { objective: 4, image: 'duo-4.jpg' },
      { objective: 40, image: 'duo-40.jpg' },
    ],
    structures: [
      { id: 'paneth', label: 'Paneth cell', at: { 40: { x: 0.5, y: 0.5 } } },
      { id: 'lamina', label: 'Lamina propria', at: { 4: { x: 0.6, y: 0.6 } } },
    ],
  },
  {
    id: 'skin', title: 'Skin', subjectId: 'derm', tissue: 'Thin skin', stain: 'H&E',
    views: [
      { objective: 4, image: 'skin-4.jpg' },
      { objective: 10, image: 'skin-10.jpg' },
      { objective: 40, image: 'skin-40.jpg' },
    ],
    structures: [
      { id: 'epidermis', label: 'Epidermis', at: { 4: { x: 0.1, y: 0.9 } } },
      { id: 'dermis', label: 'Dermis', at: { 4: { x: 0.2, y: 0.8 } } },
      { id: 'sebaceous', label: 'Sebaceous gland', at: { 10: { x: 0.3, y: 0.7 } } },
      { id: 'follicle', label: 'Hair follicle', at: { 40: { x: 0.4, y: 0.6 } } },
    ],
  },
]

test('the same slides and seed build an identical game', () => {
  assert.deepEqual(buildSpotter(slides, 42), buildSpotter(slides, 42))
})

test('a different seed builds a different game', () => {
  const a = JSON.stringify(buildSpotter(slides, 1))
  const b = JSON.stringify(buildSpotter(slides, 2))
  assert.notEqual(a, b)
})

test('every round offers exactly OPTIONS_PER_ROUND distinct options including the answer', () => {
  const game = buildSpotter(slides, 7)
  assert.ok(game.rounds.length > 0)
  for (const round of game.rounds) {
    assert.equal(round.options.length, OPTIONS_PER_ROUND)
    assert.equal(new Set(round.options).size, OPTIONS_PER_ROUND, 'options must not repeat')
    assert.ok(round.options.includes(round.answer))
  }
})

test('the structure asked about genuinely has a pin at that round\'s objective', () => {
  const game = buildSpotter(slides, 11)
  for (const round of game.rounds) {
    const slide = slides.find((s) => s.id === round.slideId)
    assert.ok(slide, `round references unknown slide ${round.slideId}`)
    const structure = slide!.structures.find((s) => s.id === round.structureId)
    assert.ok(structure, `round references unknown structure ${round.structureId}`)
    const pin = structure!.at[round.objective]
    assert.ok(pin, `structure ${round.structureId} has no pin at ${round.objective}x`)
    assert.deepEqual(round.at, pin)
    assert.equal(structure!.label, round.answer)
  }
})

test('no structure is asked about twice in the same game', () => {
  const game = buildSpotter(slides, 5)
  const ids = game.rounds.map((r) => r.structureId)
  assert.equal(new Set(ids).size, ids.length)
})

test('a game is capped at ROUNDS by default', () => {
  const game = buildSpotter(slides, 3)
  assert.ok(game.rounds.length <= ROUNDS)
})

test('a short slide set yields fewer rounds rather than repeating a structure', () => {
  const short: HistologySlide[] = [
    {
      id: 'small', title: 'Small set', subjectId: 'gi', tissue: 'x', stain: 'H&E',
      views: [{ objective: 4, image: 'a.jpg' }],
      structures: [
        { id: 'p1', label: 'Alpha', at: { 4: { x: 0.1, y: 0.1 } } },
        { id: 'p2', label: 'Beta', at: { 4: { x: 0.2, y: 0.2 } } },
        // Unpinned structures still count toward the distinct-label floor, but
        // cannot themselves be asked about.
        { id: 'u1', label: 'Gamma', at: {} },
        { id: 'u2', label: 'Delta', at: {} },
      ],
    },
  ]
  const game = buildSpotter(short, 9)
  assert.equal(game.refusal, null)
  assert.equal(game.rounds.length, 2)
  assert.equal(new Set(game.rounds.map((r) => r.structureId)).size, 2)
})

test('no slide with any pinned structure refuses as too_few_structures', () => {
  const unpinned: HistologySlide[] = [
    {
      id: 'flat', title: 'Flat', subjectId: 'gi', tissue: 'x', stain: 'H&E',
      views: [{ objective: 4, image: 'a.jpg' }],
      structures: [
        { id: 'a', label: 'Alpha', at: {} },
        { id: 'b', label: 'Beta', at: {} },
        { id: 'c', label: 'Gamma', at: {} },
        { id: 'd', label: 'Delta', at: {} },
      ],
    },
  ]
  const game = buildSpotter(unpinned, 1)
  assert.equal(game.refusal, 'too_few_structures')
  assert.deepEqual(game.rounds, [])
})

test('fewer than MIN_LABELS distinct labels refuses as too_few_labels', () => {
  const sparse: HistologySlide[] = [
    {
      id: 'sparse', title: 'Sparse', subjectId: 'gi', tissue: 'x', stain: 'H&E',
      views: [{ objective: 4, image: 'a.jpg' }],
      structures: [
        { id: 'a', label: 'Alpha', at: { 4: { x: 0.1, y: 0.1 } } },
        { id: 'b', label: 'Beta', at: { 4: { x: 0.2, y: 0.2 } } },
        { id: 'c', label: 'Gamma', at: { 4: { x: 0.3, y: 0.3 } } },
      ],
    },
  ]
  assert.ok(new Set(sparse[0].structures.map((s) => s.label)).size < MIN_LABELS)
  const game = buildSpotter(sparse, 1)
  assert.equal(game.refusal, 'too_few_labels')
  assert.deepEqual(game.rounds, [])
})

test('an empty slide list refuses as too_few_structures', () => {
  const game = buildSpotter([], 1)
  assert.equal(game.refusal, 'too_few_structures')
  assert.deepEqual(game.rounds, [])
})

test('the rounds argument caps how many rounds are built', () => {
  const game = buildSpotter(slides, 4, 3)
  assert.equal(game.rounds.length, 3)
})

test('distractors prefer the same subject as the slide when enough exist', () => {
  // GI has six labels across two slides — comfortably enough to fill three
  // distractors from GI alone whenever a GI structure is asked about.
  const game: SpotterGame = buildSpotter(slides, 21)
  const giLabels = new Set(
    slides.filter((s) => s.subjectId === 'gi').flatMap((s) => s.structures.map((st) => st.label)),
  )
  for (const round of game.rounds) {
    const slide = slides.find((s) => s.id === round.slideId)!
    if (slide.subjectId !== 'gi') continue
    const distractors = round.options.filter((o) => o !== round.answer)
    assert.ok(distractors.every((label) => giLabels.has(label)), 'expected GI-only distractors')
  }
})
