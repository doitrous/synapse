import test from 'node:test'
import assert from 'node:assert/strict'
import { chooserTopics, countTopicsQuestions, filterTopicsByQuery, filterTopicsInContainer, isQuestionTopic, matchesQuery, questionsInScope, questionsInSources, scopeCounts, topicInModule, topicKey } from './qbankScope.ts'
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

test('a module offers its questions by their module tag, with no article link', () => {
  // The 101-ISK regression: a module with published questions but no published
  // library articles showed an empty selector, because grouping went only
  // through articles. The question is tagged for the module directly.
  const q = { ...question('q1', 'anat', 'Axilla'), moduleIds: ['101 ISK'] } as Question
  const synthetic = chooserTopics([q], []) // no library articles at all
  const topic = synthetic[0]
  // Matches on the module's display name even though articleIds is empty.
  assert.equal(topicInModule(topic, [q], new Set<string>(), new Set(['101 isk'])), true)
  // A different module does not claim it.
  assert.equal(topicInModule(topic, [q], new Set<string>(), new Set(['104 cps'])), false)
})

test('article-linked and id-token module membership still hold', () => {
  const topic: LibTopic = { id: 'art-1', title: 'Nerve supply', subjectId: 'anat', subtopics: [] }
  const q = question('q1', 'anat', 'Nerve supply', ['art-1'])
  // Topic IS one of the module's article ids.
  assert.equal(topicInModule(topic, [q], new Set(['art-1']), new Set()), true)
  // Question cites one of the module's articles.
  const other: LibTopic = { id: 'qt', title: 'Nerve supply', subjectId: 'anat', subtopics: [] }
  assert.equal(topicInModule(other, [q], new Set(['art-1']), new Set()), true)
})

const LIBRARY: LibTopic[] = [{
  id: 'hf',
  title: 'Heart failure',
  subjectId: 'cvs',
  subtopics: [{ id: 'hf-path', title: 'Pathophysiology' } as LibTopic['subtopics'][number]],
}]

test('countTopicsQuestions counts a multi-topic question once, not once per topic', () => {
  // The count-discrepancy bug: one question filed under two topics (by title and
  // by a library ref to the other) was summed into both topics' tallies, so the
  // module/total badges read higher than the bank holds. The deduped count is 1.
  const topics: LibTopic[] = [
    { id: 'a', title: 'Topic A', subjectId: 'cvs', subtopics: [{ id: 'a-1', title: 'Sub A' } as LibTopic['subtopics'][number]] },
    { id: 'b', title: 'Topic B', subjectId: 'cvs', subtopics: [] },
  ]
  const q = question('q1', 'cvs', 'Topic B', ['a-1']) // matches Topic B by title AND Topic A by ref
  const counts = scopeCounts([q], topics)
  // scopeCounts (per-topic, correct per row) tallies the question under both.
  assert.equal(counts.topics['a'] + counts.topics['b'], 2)
  // The distinct count over both topics is 1 — the number summing got wrong.
  assert.equal(countTopicsQuestions([q], topics, topics), 1)
})

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

/* ---- Search filter (the chooser's toolbar) ------------------------------ */

const SEARCH_TREE: LibTopic[] = [
  {
    id: 'hf',
    title: 'Heart failure',
    subjectId: 'cvs',
    subtopics: [
      { id: 'hf-acute', title: 'Acute decompensation' },
      { id: 'hf-chronic', title: 'Chronic management' },
    ] as LibTopic['subtopics'],
  },
  {
    id: 'arr',
    title: 'Arrhythmias',
    subjectId: 'cvs',
    subtopics: [{ id: 'arr-af', title: 'Atrial fibrillation' }] as LibTopic['subtopics'],
  },
]

test('filterTopicsByQuery: an empty query returns the tree untouched', () => {
  assert.equal(filterTopicsByQuery(SEARCH_TREE, ''), SEARCH_TREE)
  assert.equal(filterTopicsByQuery(SEARCH_TREE, '   '), SEARCH_TREE)
})

test('filterTopicsByQuery: a chapter whose title matches is kept whole', () => {
  const hit = filterTopicsByQuery(SEARCH_TREE, 'heart')
  assert.deepEqual(hit.map((topic) => topic.id), ['hf'])
  assert.equal(hit[0].subtopics.length, 2)
})

test('filterTopicsByQuery: a chapter surviving on a subtopic keeps only the matches', () => {
  const hit = filterTopicsByQuery(SEARCH_TREE, 'chronic')
  assert.deepEqual(hit.map((topic) => topic.id), ['hf'])
  assert.deepEqual(hit[0].subtopics.map((sub) => sub.id), ['hf-chronic'])
  // The source tree is never mutated — the chooser re-derives from it on every keystroke.
  assert.equal(SEARCH_TREE[0].subtopics.length, 2)
})

test('filterTopicsByQuery: case and surrounding spaces do not matter', () => {
  assert.deepEqual(filterTopicsByQuery(SEARCH_TREE, '  ATRIAL ').map((t) => t.id), ['arr'])
})

test('filterTopicsByQuery: nothing matching returns an empty list', () => {
  assert.deepEqual(filterTopicsByQuery(SEARCH_TREE, 'renal'), [])
})

test('matchesQuery: an empty query matches everything', () => {
  assert.equal(matchesQuery('Heart failure', ''), true)
  assert.equal(matchesQuery('Heart failure', 'fail'), true)
  assert.equal(matchesQuery('Heart failure', 'renal'), false)
})

/* ---- Search: a hit on the container itself ------------------------------ */

test('filterTopicsInContainer: a system whose own name matches keeps every chapter', () => {
  // "renal" names no chapter in this tree — the system is the hit.
  const hit = filterTopicsInContainer(['Renal & urinary'], SEARCH_TREE, 'renal')
  assert.equal(hit, SEARCH_TREE)
  assert.deepEqual(hit.map((topic) => topic.id), ['hf', 'arr'])
  assert.equal(hit[0].subtopics.length, 2)
})

test('filterTopicsInContainer: a module name matches the same way a system name does', () => {
  const hit = filterTopicsInContainer(['104 · Cardiopulmonary system', 'Cardiovascular'], SEARCH_TREE, '104')
  assert.deepEqual(hit.map((topic) => topic.id), ['hf', 'arr'])
})

test('filterTopicsInContainer: a container hit is case-insensitive and trimmed', () => {
  assert.equal(filterTopicsInContainer(['Renal & urinary'], SEARCH_TREE, '  RENAL '), SEARCH_TREE)
})

test('filterTopicsInContainer: no container hit falls through to chapter and subtopic titles', () => {
  const hit = filterTopicsInContainer(['Renal & urinary', 'Cardiovascular'], SEARCH_TREE, 'chronic')
  assert.deepEqual(hit.map((topic) => topic.id), ['hf'])
  assert.deepEqual(hit[0].subtopics.map((sub) => sub.id), ['hf-chronic'])
})

test('filterTopicsInContainer: nothing matching anywhere returns an empty list', () => {
  assert.deepEqual(filterTopicsInContainer(['Cardiovascular'], SEARCH_TREE, 'histology'), [])
})

test('filterTopicsInContainer: an empty query returns the tree untouched', () => {
  assert.equal(filterTopicsInContainer(['Cardiovascular'], SEARCH_TREE, '   '), SEARCH_TREE)
})

test('counts deduplicate title matches and repeated references while preserving shared chapter names', () => {
  const library = [
    { id: 'a', title: 'Heart', subjectId: 'cvs', subtopics: [{ id: 's1' }, { id: 's2' }] },
    { id: 'b', title: 'HEART', subjectId: 'resp', subtopics: [{ id: 's3' }] },
    { id: 'empty', title: 'Empty', subjectId: 'cvs', subtopics: [] },
  ] as LibTopic[]
  const pool = [question('q1', 'cvs', 'heart', ['s1', 's1', 's2']), question('q2', 'cvs', 'Other', ['s1', 's2'])]
  assert.deepEqual(scopeCounts(pool, library), { topics: { a: 2, b: 1, empty: 0 }, subtopics: { s1: 2, s2: 2, s3: 1 } })
})

test('counting a large topic tree does not rescan the question bank per subtopic', () => {
  let reads = 0
  const pool = Array.from({ length: 100 }, (_, i) => {
    const q = question(`q${i}`, 'cvs', `Topic ${i}`, [`s${i}`])
    Object.defineProperty(q, 'topic', { get() { reads++; return `Topic ${i}` } })
    return q
  })
  const library = Array.from({ length: 100 }, (_, i) => ({ id: `t${i}`, title: `Topic ${i}`, subjectId: 'cvs', subtopics: [{ id: `s${i}` }] })) as LibTopic[]
  const counts = scopeCounts(pool, library)
  assert.equal(counts.topics.t99, 1)
  assert.ok(reads <= 200, `Read question topics ${reads} times for 100 questions`)
})

test('indexed counts match the original filtering rules across a varied catalogue', () => {
  const library = Array.from({ length: 25 }, (_, i) => ({
    id: `t${i}`, title: `Topic ${i % 12}`, subjectId: 'cvs',
    subtopics: Array.from({ length: i % 5 }, (_, j) => ({ id: `s${i}-${j}`, title: `Article ${j}` })),
  })) as LibTopic[]
  const pool = Array.from({ length: 200 }, (_, i) => question(`q${i}`, 'cvs', `TOPIC ${i % 15}`, [
    `s${i % 25}-${i % 4}`, `s${(i * 7) % 25}-0`, `s${i % 25}-${i % 4}`, 'missing',
  ]))
  const expected = { topics: {} as Record<string, number>, subtopics: {} as Record<string, number> }
  for (const topic of library) {
    for (const sub of topic.subtopics) {
      expected.subtopics[sub.id] = pool.filter(q => q.libraryRefs.some(ref => ref.id === sub.id) || q.topic.toLowerCase() === topic.title.toLowerCase()).length
    }
    expected.topics[topic.id] = pool.filter(q => q.topic.toLowerCase() === topic.title.toLowerCase() || q.libraryRefs.some(ref => topic.subtopics.some(sub => sub.id === ref.id))).length
  }
  assert.deepEqual(scopeCounts(pool, library), expected)
})
