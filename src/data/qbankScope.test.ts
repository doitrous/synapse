import test from 'node:test'
import assert from 'node:assert/strict'
import { chooserTopics, isQuestionTopic, questionsInScope, questionsInSources, scopeCounts, topicKey } from './qbankScope.ts'
import type { Question } from './qbank.ts'
import type { LibTopic } from './library.ts'
import type { QuestionSource, SourceBucket } from './questionSource.ts'

function question(id: string, subjectId: string, topic: string, refIds: string[] = []): Question {
  return {
    id, subjectId, topic, difficulty: 'Moderate', vignette: '', stem: id,
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

test('a topic the library already covers is not duplicated', () => {
  const pool = [question('q1', 'cvs', 'Heart failure')]
  const topics = chooserTopics(pool, LIBRARY)
  assert.equal(topics.length, 1)
  assert.equal(topics[0].id, 'hf')
})

test('a topic only the questions name is added to the tree', () => {
  // The regression this guards: the shipped demo has twenty published questions
  // and no published articles, so the chooser rendered an empty box.
  const pool = [question('q1', 'cvs', 'Cardiac cycle and heart sounds')]
  const topics = chooserTopics(pool, [])
  assert.equal(topics.length, 1)
  assert.equal(topics[0].title, 'Cardiac cycle and heart sounds')
  assert.equal(topics[0].subjectId, 'cvs')
  assert.deepEqual(topics[0].subtopics, [])
  assert.ok(isQuestionTopic(topics[0].id))
})

test('the same topic across many questions becomes one entry', () => {
  const pool = Array.from({ length: 20 }, (_, i) => question(`q${i}`, 'cvs', 'Cardiac cycle and heart sounds'))
  assert.equal(chooserTopics(pool, []).length, 1)
})

test('the same title under two subjects stays two topics', () => {
  const pool = [question('q1', 'cvs', 'Physiology'), question('q2', 'resp', 'Physiology')]
  const topics = chooserTopics(pool, [])
  assert.equal(topics.length, 2)
  assert.deepEqual(topics.map((topic) => topic.subjectId).sort(), ['cvs', 'resp'])
})

test('matching a library topic is case-insensitive', () => {
  const pool = [question('q1', 'cvs', 'HEART FAILURE')]
  assert.equal(chooserTopics(pool, LIBRARY).length, 1)
})

test('a question with no topic adds nothing', () => {
  assert.deepEqual(chooserTopics([question('q1', 'cvs', '   ')], []), [])
  assert.deepEqual(chooserTopics([], []), [])
})

test('a synthetic topic counts its questions, so the tree is not filtered away', () => {
  const pool = [
    question('q1', 'cvs', 'Cardiac cycle and heart sounds'),
    question('q2', 'cvs', 'Cardiac cycle and heart sounds'),
  ]
  const topics = chooserTopics(pool, [])
  const counts = scopeCounts(pool, topics)
  assert.equal(counts.topics[topics[0].id], 2)
})

test('selecting a synthetic topic actually selects its questions', () => {
  // Without this the chooser would offer a chapter that filtered to nothing.
  const pool = [
    question('q1', 'cvs', 'Cardiac cycle and heart sounds'),
    question('q2', 'cvs', 'Valvular disease'),
  ]
  const topics = chooserTopics(pool, [])
  const cardiac = topics.find((topic) => topic.title === 'Cardiac cycle and heart sounds')!
  const scope = new Set([topicKey(cardiac.id)])
  const scoped = questionsInScope(pool, scope, topics)
  assert.deepEqual(scoped.map((q) => q.id), ['q1'])
})

test('an empty scope still means the whole bank', () => {
  const pool = [question('q1', 'cvs', 'A'), question('q2', 'cvs', 'B')]
  assert.equal(questionsInScope(pool, new Set(), chooserTopics(pool, [])).length, 2)
})

test('library topics and question topics coexist', () => {
  const pool = [
    question('q1', 'cvs', 'Heart failure', ['hf-path']),
    question('q2', 'cvs', 'Cardiac cycle and heart sounds'),
  ]
  const topics = chooserTopics(pool, LIBRARY)
  assert.deepEqual(topics.map((topic) => topic.title), ['Heart failure', 'Cardiac cycle and heart sounds'])
  const counts = scopeCounts(pool, topics)
  assert.equal(counts.topics.hf, 1)
  assert.equal(counts.topics[topics[1].id], 1)
})

function sourced(id: string, source?: QuestionSource): Question {
  return { ...question(id, 'cardio', 'Topic'), source }
}

test('questionsInSources: empty set means all questions', () => {
  const qs = [sourced('a', 'dept-mcq'), sourced('b', 'past-paper'), sourced('c', undefined)]
  assert.equal(questionsInSources(qs, new Set()).length, 3)
})

test('questionsInSources: filters to the selected buckets', () => {
  const qs = [sourced('a', 'dept-mcq'), sourced('b', 'past-paper'), sourced('c', undefined)]
  const sel: Set<SourceBucket> = new Set(['dept-mcq'])
  assert.deepEqual(questionsInSources(qs, sel).map((q) => q.id), ['a'])
})

test('questionsInSources: untagged questions match only when unspecified is selected', () => {
  const qs = [sourced('a', 'dept-mcq'), sourced('c', undefined)]
  assert.deepEqual(questionsInSources(qs, new Set(['unspecified'])).map((q) => q.id), ['c'])
  assert.deepEqual(questionsInSources(qs, new Set(['dept-mcq'])).map((q) => q.id), ['a'])
})
