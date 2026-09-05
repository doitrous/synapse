import assert from 'node:assert/strict'
import test from 'node:test'
import type { ManagedContentItem } from '../data/contentControl.ts'
import { questionInAudience } from './questionAudience.ts'

/** A published question tagged for one university and year. */
function question(tags: {
  universityIds?: string[]
  years?: string[]
  questionOnlyFor?: string[]
}): ManagedContentItem {
  return {
    id: 'q',
    kind: 'question',
    title: 'Stem',
    subjectId: 'cvs',
    status: 'Published',
    owner: 'A',
    updatedAt: 'old',
    fields: {},
    questionData: {
      tags: {
        universityIds: tags.universityIds ?? [],
        years: tags.years ?? [],
        ...(tags.questionOnlyFor ? { questionOnlyFor: tags.questionOnlyFor } : {}),
      },
    },
  } as unknown as ManagedContentItem
}

const helwanY3 = question({ universityIds: ['hu'], years: ['HU_Y3'] })

test('a Helwan Year 3 question is hidden from a Kasr Year 1 student', () => {
  assert.equal(questionInAudience(helwanY3, 'kau', 'KAU_Y1'), false)
})

test('a Helwan Year 3 question is shown to a Helwan Year 3 student', () => {
  assert.equal(questionInAudience(helwanY3, 'hu', 'HU_Y3'), true)
})

test('right university but wrong year is hidden (no cross-year leak)', () => {
  assert.equal(questionInAudience(helwanY3, 'hu', 'HU_Y2'), false)
})

test('a year-label tag matches the scoped composite id for the same year', () => {
  // The bulk importer stores years as bare labels ("Year 3"); yearScopeMatches
  // (src/data/universities.ts) compares by ordinal so this still matches HU_Y3.
  const labelled = question({ universityIds: ['hu'], years: ['Year 3'] })
  assert.equal(questionInAudience(labelled, 'hu', 'HU_Y3'), true)
})

test('a year-label tag does not match a different year (no cross-year leak)', () => {
  const labelled = question({ universityIds: ['hu'], years: ['Year 3'] })
  assert.equal(questionInAudience(labelled, 'hu', 'HU_Y2'), false)
})

test('questionOnlyFor narrows a shared question to the allow-listed cohort', () => {
  // Tagged for both universities, but restricted to Kasr only.
  const shared = question({ universityIds: ['hu', 'kau'], years: ['HU_Y3', 'KAU_Y1'], questionOnlyFor: ['kau'] })
  assert.equal(questionInAudience(shared, 'kau', 'KAU_Y1'), true)
  assert.equal(questionInAudience(shared, 'hu', 'HU_Y3'), false)
})

test('a question allow-listed away from its own university reaches nobody', () => {
  // Contradictory authoring (tagged hu, only-for kau): the scope tag still applies.
  const contradictory = question({ universityIds: ['hu'], years: ['HU_Y3'], questionOnlyFor: ['kau'] })
  assert.equal(questionInAudience(contradictory, 'kau', 'KAU_Y1'), false)
  assert.equal(questionInAudience(contradictory, 'hu', 'HU_Y3'), false)
})

test('a blank audience (demo, admin preview, unsettled onboarding) applies no filter', () => {
  assert.equal(questionInAudience(helwanY3, '', ''), true)
  assert.equal(questionInAudience(helwanY3, undefined, undefined), true)
})

test('an untagged question stays visible to everyone, matching platform scope rules', () => {
  const untagged = question({})
  assert.equal(questionInAudience(untagged, 'hu', 'HU_Y3'), true)
  assert.equal(questionInAudience(untagged, 'kau', 'KAU_Y1'), true)
})
