import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  EMPTY_PRACTICAL_PROGRESS, recordCaseStep, recordLabAnswered, recordStationRun,
  setSkillStatus, summariseSkills,
} from './practicalProgress.ts'

const AT = '2026-08-13T10:00:00.000Z'
const LATER = '2026-08-14T10:00:00.000Z'

test('a station run counts an attempt and sets the first best score', () => {
  const after = recordStationRun(EMPTY_PRACTICAL_PROGRESS, 'os-cvs', { marks: 14, outOf: 20, checkedItems: ['a'], at: AT })
  assert.deepEqual(after.stations['os-cvs'], {
    attempts: 1, bestMarks: 14, outOf: 20, lastAt: AT, checkedItems: ['a'],
  })
})

test('a worse run still counts as an attempt but does not lower the best', () => {
  const first = recordStationRun(EMPTY_PRACTICAL_PROGRESS, 'os-cvs', { marks: 18, outOf: 20, checkedItems: [], at: AT })
  const second = recordStationRun(first, 'os-cvs', { marks: 9, outOf: 20, checkedItems: ['x'], at: LATER })
  assert.equal(second.stations['os-cvs'].attempts, 2)
  assert.equal(second.stations['os-cvs'].bestMarks, 18)
  // The resumable ticks are always the most recent run, not the best one.
  assert.deepEqual(second.stations['os-cvs'].checkedItems, ['x'])
})

test('the best score carries the mark total it was scored against', () => {
  // 18/20 is better than 18/30; comparing raw marks would call them equal and
  // let a re-authored station rewrite an old result's meaning.
  const first = recordStationRun(EMPTY_PRACTICAL_PROGRESS, 's', { marks: 18, outOf: 20, checkedItems: [], at: AT })
  const second = recordStationRun(first, 's', { marks: 18, outOf: 30, checkedItems: [], at: LATER })
  assert.equal(second.stations['s'].bestMarks, 18)
  assert.equal(second.stations['s'].outOf, 20)
})

test('a station scored out of nothing does not divide by zero', () => {
  const after = recordStationRun(EMPTY_PRACTICAL_PROGRESS, 's', { marks: 0, outOf: 0, checkedItems: [], at: AT })
  assert.equal(after.stations['s'].attempts, 1)
  assert.equal(after.stations['s'].bestMarks, 0)
})

test('a case in progress becomes completed and stays completed', () => {
  const started = recordCaseStep(EMPTY_PRACTICAL_PROGRESS, 'c1', { lastStep: 2, steps: 6, completed: false, at: AT })
  assert.equal(started.cases['c1'].status, 'in-progress')
  const finished = recordCaseStep(started, 'c1', { lastStep: 6, steps: 6, completed: true, at: LATER })
  assert.equal(finished.cases['c1'].status, 'completed')
  // Reopening a finished case to reread it must not undo having finished it.
  const revisited = recordCaseStep(finished, 'c1', { lastStep: 1, steps: 6, completed: false, at: LATER })
  assert.equal(revisited.cases['c1'].status, 'completed')
  assert.equal(revisited.cases['c1'].lastStep, 6)
})

test('lab progress never goes backwards on a revisit', () => {
  const first = recordLabAnswered(EMPTY_PRACTICAL_PROGRESS, 'l1', { done: 8, items: 20, at: AT })
  const second = recordLabAnswered(first, 'l1', { done: 3, items: 20, at: LATER })
  assert.equal(second.labs['l1'].done, 8)
  assert.equal(second.labs['l1'].lastAt, LATER)
})

test('a skill can be practised, then marked ready', () => {
  const practised = setSkillStatus(EMPTY_PRACTICAL_PROGRESS, 'sk1', 'practised', AT)
  assert.equal(practised.skills['sk1'].status, 'practised')
  const ready = setSkillStatus(practised, 'sk1', 'ready', LATER)
  assert.equal(ready.skills['sk1'].status, 'ready')
})

test('clearing a skill removes it rather than storing a blank state', () => {
  const practised = setSkillStatus(EMPTY_PRACTICAL_PROGRESS, 'sk1', 'practised', AT)
  const cleared = setSkillStatus(practised, 'sk1', 'not-started', LATER)
  assert.equal('sk1' in cleared.skills, false)
})

test('the skills headline is counted from the list it is shown above', () => {
  // The old headline said "14 / 22" over a list of twelve. The total is passed
  // in from the live list, so the two cannot disagree.
  let progress = setSkillStatus(EMPTY_PRACTICAL_PROGRESS, 'a', 'practised', AT)
  progress = setSkillStatus(progress, 'b', 'ready', AT)
  progress = setSkillStatus(progress, 'c', 'ready', AT)
  assert.deepEqual(summariseSkills(progress, 12), { practised: 3, ready: 2, total: 12 })
})

test('an untouched record summarises as nothing done', () => {
  assert.deepEqual(summariseSkills(EMPTY_PRACTICAL_PROGRESS, 12), { practised: 0, ready: 0, total: 12 })
})
