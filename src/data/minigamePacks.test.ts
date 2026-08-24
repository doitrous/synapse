import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  MINI_GAME_PACKS,
  scoreOrderedSteps,
  scoreRedFlagSort,
  shuffledStepIds,
  validateMiniGamePack,
  validMiniGamePacks,
  type OrderedMiniGamePack,
  type RedFlagSortPack,
} from './minigamePacks.ts'

test('every local mini-game pack is explicitly reviewed and valid', () => {
  assert.ok(MINI_GAME_PACKS.length >= 3)
  for (const pack of MINI_GAME_PACKS) {
    assert.deepEqual(validateMiniGamePack(pack), [])
    assert.ok(pack.source.label)
    assert.ok(pack.source.reviewedBy)
  }
})

test('each requested authored medicine game has a valid local pack', () => {
  assert.ok(validMiniGamePacks('clinical_sequence').length >= 1)
  assert.ok(validMiniGamePacks('mechanism_chain').length >= 1)
  assert.ok(validMiniGamePacks('red_flag_sort').length >= 1)
})

test('ordered games shuffle deterministically without changing authored answers', () => {
  const pack = validMiniGamePacks('clinical_sequence')[0] as OrderedMiniGamePack
  const a = shuffledStepIds(pack, 12)
  const b = shuffledStepIds(pack, 12)
  assert.deepEqual(a, b)
  assert.deepEqual([...a].sort(), pack.steps.map((step) => step.id).sort())
  assert.deepEqual(scoreOrderedSteps(pack, pack.steps.map((step) => step.id)), {
    exactPositions: pack.steps.length,
    total: pack.steps.length,
    complete: true,
    correct: pack.steps.map((step) => step.id),
  })
})

test('ordered scoring reports exact-position matches only', () => {
  const pack = validMiniGamePacks('mechanism_chain')[0] as OrderedMiniGamePack
  const submitted = pack.steps.map((step) => step.id)
  submitted.reverse()
  const score = scoreOrderedSteps(pack, submitted)
  assert.equal(score.total, pack.steps.length)
  assert.ok(score.exactPositions < pack.steps.length)
  assert.equal(score.complete, true)
})

test('red flag sort scoring uses authored lanes and rationales', () => {
  const pack = validMiniGamePacks('red_flag_sort')[0] as RedFlagSortPack
  const placements = Object.fromEntries(pack.findings.map((finding) => [finding.id, finding.lane]))
  const score = scoreRedFlagSort(pack, placements)
  assert.equal(score.correct, pack.findings.length)
  assert.equal(score.total, pack.findings.length)
  assert.ok(score.results.every((result) => result.correct && result.finding.rationale.length > 0))
})

test('invalid packs are refused by validation before the UI can use them', () => {
  const pack: OrderedMiniGamePack = {
    id: 'bad',
    kind: 'clinical_sequence',
    title: '',
    subjectId: '',
    topic: 'Nowhere',
    summary: 'Broken fixture',
    prompt: 'Broken',
    source: { label: '', reviewedBy: '' },
    steps: [{ id: 'x', text: '' }],
    explanation: '',
  }
  const errors = validateMiniGamePack(pack)
  assert.ok(errors.length >= 4)
})
