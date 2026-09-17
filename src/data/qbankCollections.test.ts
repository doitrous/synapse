import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  attemptedIds, incorrectIds, latestVerdicts, omittedIds, pruneManifests, questionsById, scopeFromQuestions,
} from './qbankCollections.ts'
import type { AttemptRecord } from './attempts.ts'
import type { Question } from './qbank.ts'
import type { LibTopic } from './library.ts'

function record(itemId: string, correct: boolean | null, at: string, sessionId = 's1'): AttemptRecord {
  return {
    id: `${sessionId}:qbank:${itemId}`,
    at, surface: 'qbank', itemId,
    subjectId: 'cvs', topic: 'Heart failure', difficulty: 'Moderate',
    conceptIds: [], correct, seconds: null, sessionId,
  }
}

function question(id: string, topic: string, refIds: string[] = []): Question {
  return {
    id, subjectId: 'cvs', topic, difficulty: 'Moderate', vignette: '', stem: id,
    options: [], explanation: '',
    libraryRefs: refIds.map((refId) => ({ id: refId, title: refId })),
    resourceRefs: [],
  } as unknown as Question
}

const LIBRARY: LibTopic[] = [{
  id: 'hf',
  title: 'Heart failure',
  subjectId: 'cvs',
  subtopics: [{ id: 'hf-path', title: 'Pathophysiology' } as LibTopic['subtopics'][number]],
}]

test('the latest verdict wins, not the first', () => {
  const records = [
    record('q1', false, '2026-08-01T09:00:00.000Z', 's1'),
    record('q1', true, '2026-08-05T09:00:00.000Z', 's2'),
  ]
  assert.equal(latestVerdicts(records).get('q1'), true)
})

test('serverAt decides order across devices even when the wall clock disagrees', () => {
  // Device A's clock runs fast: it marks q1 WRONG at a later local time, but the
  // server received it FIRST (serverAt 1000). Device B marks it RIGHT at an
  // earlier local time, received LAST (serverAt 2000). Ordering by `at` keeps
  // the wrong answer; ordering by serverAt — the fix — keeps the right one.
  const wrongFastClock = { ...record('q1', false, '2026-08-10T09:00:00.000Z', 'sA'), serverAt: 1000 }
  const rightSlowClock = { ...record('q1', true, '2026-08-01T09:00:00.000Z', 'sB'), serverAt: 2000 }
  assert.equal(latestVerdicts([wrongFastClock, rightSlowClock]).get('q1'), true)
  // Flip the server order and the verdict flips with it.
  assert.equal(latestVerdicts([{ ...wrongFastClock, serverAt: 3000 }, rightSlowClock]).get('q1'), false)
})

test('an unmarked record does not clear a verdict', () => {
  // A station is ticked against a checklist, not marked against a key. It is
  // evidence of practice and says nothing about whether the student was right,
  // so it must not take a question out of the wrong list.
  const records = [
    record('q1', false, '2026-08-01T09:00:00.000Z', 's1'),
    record('q1', null, '2026-08-05T09:00:00.000Z', 's2'),
  ]
  assert.equal(latestVerdicts(records).get('q1'), false)
})

test('getting a question right takes it out of the wrong list', () => {
  const wrong = [record('q1', false, '2026-08-01T09:00:00.000Z', 's1')]
  assert.deepEqual([...incorrectIds(wrong)], ['q1'])
  const fixed = [...wrong, record('q1', true, '2026-08-05T09:00:00.000Z', 's2')]
  assert.deepEqual([...incorrectIds(fixed)], [])
})

test('attemptedIds collects every question touched on a question surface, right or wrong', () => {
  // Unsolved = the whole bank minus these. A null (unmarked) attempt still
  // counts as touched: the student engaged with it, so it is not "unsolved".
  const records = [
    record('q1', true, '2026-08-01T09:00:00.000Z', 's1'),
    record('q2', false, '2026-08-02T09:00:00.000Z', 's1'),
    record('q3', null, '2026-08-03T09:00:00.000Z', 's2'),
  ]
  assert.deepEqual([...attemptedIds(records)].sort(), ['q1', 'q2', 'q3'])
  assert.deepEqual([...attemptedIds([])], [])
})

test('a question a sitting served but never recorded is omitted', () => {
  const manifests = { s1: ['q1', 'q2'] }
  const records = [record('q1', true, '2026-08-01T09:00:00.000Z', 's1')]
  assert.deepEqual([...omittedIds(manifests, records)], ['q2'])
})

test('answering a question in any sitting takes it out of the omitted list', () => {
  // Omitted means "served, never attempted". Once a student has answered it
  // anywhere the list has done its job and should stop offering it.
  const manifests = { s1: ['q1', 'q2'] }
  const records = [
    record('q1', true, '2026-08-01T09:00:00.000Z', 's1'),
    record('q2', false, '2026-08-06T09:00:00.000Z', 's2'),
  ]
  assert.deepEqual([...omittedIds(manifests, records)], [])
})

test('questionsById keeps the pool order and drops unpublished ids', () => {
  const pool = [question('q1', 'Heart failure'), question('q2', 'Asthma')]
  assert.deepEqual(questionsById(pool, new Set(['q2', 'q1', 'gone'])).map((q) => q.id), ['q1', 'q2'])
})

test('a scope covers the subtopics referenced and the topics named', () => {
  const scope = scopeFromQuestions([question('q1', 'Heart failure', ['hf-path'])], LIBRARY)
  assert.deepEqual([...scope].sort(), ['s:hf-path', 't:hf'])
})

test('a question naming a topic the library does not cover contributes no topic key', () => {
  const scope = scopeFromQuestions([question('q1', 'Cardiac cycle', [])], LIBRARY)
  assert.deepEqual([...scope], [])
})

test('pruning keeps the most recent sittings and drops the oldest', () => {
  const manifests = { s1: ['q1'], s2: ['q2'], s3: ['q3'] }
  assert.deepEqual(pruneManifests(manifests, 2), { s2: ['q2'], s3: ['q3'] })
})

test('pruning leaves a map under the limit untouched', () => {
  const manifests = { s1: ['q1'] }
  assert.equal(pruneManifests(manifests, 2), manifests)
})
