import test from 'node:test'
import assert from 'node:assert/strict'
import { sourceOptions, sourceCoverage } from './sourceCoverage.ts'
import type { Question } from './qbank.ts'
import type { QuestionSource } from './questionSource.ts'

function q(id: string, source: QuestionSource | undefined, conceptIds: string[]): Question {
  return {
    id, subjectId: 'cardio', topic: 'T', difficulty: 'Moderate', vignette: '', stem: id,
    options: [], explanation: '', libraryRefs: [], resourceRefs: [],
    conceptIds, source,
  } as unknown as Question
}

test('sourceOptions counts by bucket, real sources first then unspecified', () => {
  const qs = [q('a', 'dept-mcq', []), q('b', 'dept-mcq', []), q('c', undefined, [])]
  const opts = sourceOptions(qs)
  assert.deepEqual(opts.map((o) => [o.bucket, o.count]), [['dept-mcq', 2], ['unspecified', 1]])
  assert.equal(opts[0].label, 'Department MCQs')
})

test('sourceOptions omits buckets with no questions', () => {
  const opts = sourceOptions([q('a', 'past-paper', [])])
  assert.deepEqual(opts.map((o) => o.bucket), ['past-paper'])
})

test('sourceCoverage: questions and concepts, answered vs available', () => {
  const qs = [
    q('a', 'dept-mcq', ['c1', 'c2']),
    q('b', 'dept-mcq', ['c2', 'c3']),
    q('c', 'past-paper', ['c4']),
  ]
  const answered = new Set(['a'])
  const rows = sourceCoverage(qs, answered)
  const mcq = rows.find((r) => r.bucket === 'dept-mcq')!
  assert.equal(mcq.questionsAvailable, 2)
  assert.equal(mcq.questionsAnswered, 1)
  assert.equal(mcq.conceptsAvailable, 3) // c1,c2,c3
  assert.equal(mcq.conceptsSeen, 2)      // c1,c2 from answered 'a'
  const paper = rows.find((r) => r.bucket === 'past-paper')!
  assert.equal(paper.questionsAnswered, 0)
  assert.equal(paper.conceptsSeen, 0)
})

test('sourceCoverage: empty log yields zero answered everywhere, rows still present', () => {
  const rows = sourceCoverage([q('a', 'dept-mcq', ['c1'])], new Set())
  assert.equal(rows.length, 1)
  assert.equal(rows[0].questionsAnswered, 0)
  assert.equal(rows[0].conceptsSeen, 0)
})

test('sourceCoverage: a concept named on two answered questions counts once', () => {
  const qs = [q('a', 'dept-mcq', ['c1']), q('b', 'dept-mcq', ['c1'])]
  const rows = sourceCoverage(qs, new Set(['a', 'b']))
  assert.equal(rows[0].conceptsAvailable, 1)
  assert.equal(rows[0].conceptsSeen, 1)
})
