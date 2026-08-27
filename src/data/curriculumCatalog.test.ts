import { test } from 'node:test'
import assert from 'node:assert/strict'
import { CURRICULUM_CATALOG, findCurriculumPath, type CurriculumSystem } from './curriculumCatalog.ts'

// A minimal two-system fixture exercising every level, since the real
// catalogue currently has no nanotopics to drill down to.
const FIXTURE: CurriculumSystem[] = [
  {
    id: 'sys-a', name: 'System A', short: 'A', color: '#000', sysId: 'SYS_A',
    topics: [
      {
        id: 'sys-a-topic-1', title: 'Topic A1', tpcId: 'TPC_A1',
        subs: [
          {
            id: 'sys-a-topic-1-sub-1', title: 'Sub A1.1', subId: 'SUB_A1_1',
            micros: [
              {
                id: 'sys-a-topic-1-sub-1-micro-1', title: 'Micro A1.1.1', micId: 'MIC_A1_1_1',
                nanos: [{ id: 'sys-a-topic-1-sub-1-micro-1-nano-1', title: 'Nano A1.1.1.1', nanId: 'NAN_A1_1_1_1' }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sys-b', name: 'System B', short: 'B', color: '#000', sysId: 'SYS_B',
    topics: [
      {
        id: 'sys-b-topic-1', title: 'Topic B1', tpcId: 'TPC_B1',
        subs: [],
      },
    ],
  },
]

test('findCurriculumPath finds a topic in a later system when no systemId is given', () => {
  // The bug this replaces: an unconditional `return` right after the topic
  // loop meant a topicId-only query only ever looked inside tree[0] — a topic
  // that exists in any other system was silently unfindable.
  const laterSystem = CURRICULUM_CATALOG[CURRICULUM_CATALOG.length - 1]
  const targetTopic = laterSystem.topics[0]
  assert.notEqual(laterSystem.id, CURRICULUM_CATALOG[0].id, 'sanity: this system is not the first in the tree')

  const result = findCurriculumPath(CURRICULUM_CATALOG, { topicId: targetTopic.id })

  assert.ok(result, 'expected a match for a topic that exists later in the tree')
  assert.equal(result?.system.id, laterSystem.id)
  assert.equal(result?.topic?.id, targetTopic.id)
})

test('findCurriculumPath still resolves a topic in the first system', () => {
  const firstSystem = CURRICULUM_CATALOG[0]
  const targetTopic = firstSystem.topics[0]

  const result = findCurriculumPath(CURRICULUM_CATALOG, { topicId: targetTopic.id })

  assert.ok(result)
  assert.equal(result?.system.id, firstSystem.id)
  assert.equal(result?.topic?.id, targetTopic.id)
})

test('findCurriculumPath resolves a full path down to a nanotopic', () => {
  const result = findCurriculumPath(FIXTURE, {
    topicId: 'sys-a-topic-1',
    subtopicId: 'sys-a-topic-1-sub-1',
    microtopicId: 'sys-a-topic-1-sub-1-micro-1',
    nanotopicId: 'sys-a-topic-1-sub-1-micro-1-nano-1',
  })

  assert.ok(result)
  assert.equal(result?.system.id, 'sys-a')
  assert.equal(result?.topic?.id, 'sys-a-topic-1')
  assert.equal(result?.subtopic?.id, 'sys-a-topic-1-sub-1')
  assert.equal(result?.microtopic?.id, 'sys-a-topic-1-sub-1-micro-1')
  assert.equal(result?.nanotopic?.id, 'sys-a-topic-1-sub-1-micro-1-nano-1')
})

test('findCurriculumPath finds a topic in the second system of a small tree, with no systemId given', () => {
  const result = findCurriculumPath(FIXTURE, { topicId: 'sys-b-topic-1' })

  assert.ok(result, 'the regression case: topicId belongs to the tree\'s second system')
  assert.equal(result?.system.id, 'sys-b')
  assert.equal(result?.topic?.id, 'sys-b-topic-1')
})

test('findCurriculumPath returns undefined when nothing matches', () => {
  const result = findCurriculumPath(CURRICULUM_CATALOG, { topicId: 'not-a-real-topic-id' })
  assert.equal(result, undefined)
})
