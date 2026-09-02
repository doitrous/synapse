import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  bankAccuracyBySubject, bankDailyCounts, bankEvents, bankSummary, bankTotal, weakestSubjects,
  type BankSources,
} from './bankStats.ts'
import type { AttemptRecord } from './attempts.ts'
import { EMPTY_PRACTICAL_PROGRESS } from './practicalProgress.ts'

/** The day the fixtures are read against. Local noon, so no timezone rolls it. */
const NOW = new Date(2026, 8, 2, 12, 0, 0)

/** `days` days before NOW, at local noon — the same local day every timezone. */
function daysAgo(days: number): string {
  return new Date(2026, 8, 2 - days, 12, 0, 0).toISOString()
}

function attempt(over: Partial<AttemptRecord>): AttemptRecord {
  return {
    id: `a-${Math.random().toString(36).slice(2)}`,
    at: daysAgo(0),
    surface: 'qbank',
    itemId: 'q1',
    subjectId: 'cvs',
    topic: 'Topic',
    difficulty: 'Easy',
    conceptIds: [],
    correct: true,
    seconds: null,
    sessionId: 's1',
    ...over,
  }
}

/**
 * Three banks with a little of everything: marked and unmarked MCQs, a passed
 * and a missed practical of each format, and a marked, a half-marked and an
 * unmarked essay.
 */
function sources(): BankSources {
  return {
    mcq: {
      total: 10,
      records: [
        attempt({ itemId: 'q1', subjectId: 'cvs', correct: true, at: daysAgo(0) }),
        attempt({ itemId: 'q2', subjectId: 'cvs', correct: false, at: daysAgo(0) }),
        attempt({ itemId: 'q3', subjectId: 'cvs', correct: true, at: daysAgo(1) }),
        attempt({ itemId: 'q4', subjectId: 'resp', correct: false, at: daysAgo(2) }),
        // Unmarked: a real event on its day, with nothing to score.
        attempt({ itemId: 'q5', subjectId: 'resp', correct: null, at: daysAgo(2) }),
        // Another surface, and one that must never reach these figures.
        attempt({ itemId: 'q6', subjectId: 'resp', surface: 'room', correct: true, at: daysAgo(3) }),
        attempt({ itemId: 'c1', subjectId: 'neuro', surface: 'card', correct: null, at: daysAgo(0) }),
      ],
    },
    practical: {
      catalogue: [
        { id: 'st-pass', kind: 'osce', subjectId: 'cvs' },
        { id: 'st-fail', kind: 'osce', subjectId: 'cvs' },
        { id: 'case-done', kind: 'case', subjectId: 'resp' },
        { id: 'lab-part', kind: 'lab', subjectId: 'resp' },
        { id: 'st-untouched', kind: 'osce', subjectId: 'neuro' },
      ],
      progress: {
        ...EMPTY_PRACTICAL_PROGRESS,
        stations: {
          'st-pass': { attempts: 1, bestMarks: 8, outOf: 10, lastAt: daysAgo(1), checkedItems: [] },
          'st-fail': { attempts: 1, bestMarks: 2, outOf: 10, lastAt: daysAgo(1), checkedItems: [] },
        },
        cases: {
          'case-done': { status: 'completed', lastStep: 4, steps: 4, lastAt: daysAgo(4) },
        },
        labs: {
          // Started and left unfinished, so the WP10 rule calls it missed.
          'lab-part': { done: 2, items: 6, lastAt: daysAgo(4) },
        },
      },
      records: [],
    },
    essay: {
      essays: [
        { id: 'e-good', subjectId: 'cvs', keyPoints: [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }] },
        { id: 'e-thin', subjectId: 'neuro', keyPoints: [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }] },
        { id: 'e-unmarked', subjectId: 'neuro', keyPoints: [{ id: 'a' }, { id: 'b' }] },
        { id: 'e-untouched', subjectId: 'resp', keyPoints: [{ id: 'a' }] },
      ],
      answers: {
        'e-good': { ticked: ['a', 'b', 'c'], updatedAt: daysAgo(0) },
        'e-thin': { ticked: ['a'], updatedAt: daysAgo(5) },
        'e-unmarked': { ticked: null, updatedAt: daysAgo(5) },
      },
    },
  }
}

/* ---- MCQ ------------------------------------------------------------- */

test('MCQ reads the qbank and room surfaces and nothing else', () => {
  const events = bankEvents('mcq', sources())
  assert.equal(events.length, 6)
  assert.equal(events.some((event) => event.itemKey.includes('c1')), false)
})

test('MCQ accuracy is every marked answer, and an unmarked one changes nothing', () => {
  const summary = bankSummary('mcq', sources(), NOW)
  // q1 q3 q6 right, q2 q4 wrong, q5 unmarked.
  assert.equal(summary.accuracy, 3 / 5)
  assert.equal(summary.seen, 6)
  assert.equal(summary.total, 10)
})

test('MCQ this week counts every answer, marked or not', () => {
  assert.equal(bankSummary('mcq', sources(), NOW).thisWeek, 6)
})

/* ---- Practical -------------------------------------------------------- */

test('a practical item counts on the day the store last recorded it', () => {
  const week = bankDailyCounts('practical', sources(), 7, NOW)
  assert.deepEqual(week.map((day) => day.attempts), [0, 0, 2, 0, 0, 2, 0])
})

test('practical accuracy is passed over attempted, by the WP10 missed rule', () => {
  // st-pass passes; st-fail is under half marks; case-done is finished and
  // clean; lab-part was left unfinished.
  const summary = bankSummary('practical', sources(), NOW)
  assert.equal(summary.accuracy, 2 / 4)
  assert.equal(summary.seen, 4)
  assert.equal(summary.total, 5)
})

test('an item the student has never opened is not attempted', () => {
  const events = bankEvents('practical', sources())
  assert.equal(events.some((event) => event.itemKey.endsWith('st-untouched')), false)
})

test('a station with no mark total has no result to report', () => {
  const data = sources()
  data.practical.progress.stations['st-pass'] = { attempts: 1, bestMarks: 0, outOf: 0, lastAt: daysAgo(0), checkedItems: [] }
  assert.equal(bankEvents('practical', data).some((event) => event.itemKey.endsWith('st-pass')), false)
})

/* ---- Essay ------------------------------------------------------------ */

test('essay accuracy is key points ticked over key points total', () => {
  // e-good 3/4, e-thin 1/4, e-unmarked contributes no units.
  const summary = bankSummary('essay', sources(), NOW)
  assert.equal(summary.accuracy, 4 / 8)
  assert.equal(summary.seen, 3)
  assert.equal(summary.total, 4)
})

test('an unmarked essay is a day of work, not a score of nought', () => {
  const events = bankEvents('essay', sources())
  const unmarked = events.find((event) => event.itemKey.endsWith('e-unmarked'))
  assert.equal(unmarked?.marked, 0)
  assert.equal(unmarked?.correct, 0)
})

test('essay subjects come off the essay, not off an attempt record', () => {
  const rows = bankAccuracyBySubject('essay', sources())
  assert.deepEqual(rows.map((row) => row.subjectId).sort(), ['cvs', 'neuro'])
})

/* ---- All -------------------------------------------------------------- */

test('all is the union of the three banks', () => {
  const data = sources()
  const events = bankEvents('all', data)
  assert.equal(events.length, bankEvents('mcq', data).length + bankEvents('practical', data).length + bankEvents('essay', data).length)
  assert.equal(bankTotal('all', data), 19)
})

test('all accuracy is the weighted mean of correct over marked across kinds', () => {
  // MCQ 3/5, practical 2/4, essay 4/8 → 9 of 17.
  assert.equal(bankSummary('all', sources(), NOW).accuracy, 9 / 17)
})

test('all counts each item once and each day once', () => {
  const summary = bankSummary('all', sources(), NOW)
  assert.equal(summary.seen, 6 + 4 + 3)
  // Six consecutive days carry work of some kind — MCQs today and yesterday,
  // stations yesterday, MCQs two and three days back, the case and the lab set
  // four back, an essay five back. The streak stops at the first empty day.
  assert.equal(summary.streakDays, 6)
})

/* ---- Subjects and empties --------------------------------------------- */

test('subject rows are weakest first', () => {
  const rows = bankAccuracyBySubject('all', sources())
  const accuracies = rows.map((row) => row.accuracy ?? 2)
  assert.deepEqual([...accuracies].sort((a, b) => a - b), accuracies)
})

test('the MCQ evidence floor is three marked answers, and the others one', () => {
  const data = sources()
  // resp has two marked MCQs (q4 wrong, q6 right) and one unmarked.
  assert.equal(weakestSubjects('mcq', data).some((row) => row.subjectId === 'resp'), false)
  assert.equal(weakestSubjects('mcq', data).some((row) => row.subjectId === 'cvs'), true)
  // The same subject in the practical bank is one item and shows.
  assert.equal(weakestSubjects('practical', data).some((row) => row.subjectId === 'resp'), true)
})

test('an empty bank reports nothing rather than nought per cent', () => {
  const empty: BankSources = {
    mcq: { total: 0, records: [] },
    practical: { progress: EMPTY_PRACTICAL_PROGRESS, catalogue: [], records: [] },
    essay: { answers: {}, essays: [] },
  }
  const summary = bankSummary('all', empty, NOW)
  assert.equal(summary.accuracy, null)
  assert.equal(summary.seen, 0)
  assert.equal(summary.streakDays, 0)
  assert.deepEqual(weakestSubjects('all', empty), [])
  assert.equal(bankDailyCounts('all', empty, 7, NOW).length, 7)
})

test('the seven days include the silent ones, oldest first', () => {
  const week = bankDailyCounts('mcq', sources(), 7, NOW)
  assert.equal(week.length, 7)
  assert.equal(week[6].date, '2026-09-02')
  assert.equal(week[0].date, '2026-08-27')
})
