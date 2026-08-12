import test from 'node:test'
import assert from 'node:assert/strict'
import {
  SUBJECTS_IMPORT_FIELDS, applyRow, indexTree, duplicateLabelsIn, referencesTo, slugify,
  type StructuralChange,
} from './subjectsImport.ts'
import type { CurriculumSystem } from './curriculumCatalog.ts'

const ids = {
  systemId: (slug: string) => `SYS_${slug.toUpperCase()}`,
  topicId: (slug: string) => `TPC_${slug.toUpperCase()}`,
  subtopicId: (slug: string) => `SUB_${slug.toUpperCase()}`,
  microtopicId: (slug: string) => `MIC_${slug.toUpperCase()}`,
  nanotopicId: (slug: string) => `NAN_${slug.toUpperCase()}`,
}

const seed = (): CurriculumSystem[] => ([{
  id: 'cvs', name: 'Cardiovascular', short: 'CVS', color: '#b4442f', sysId: 'SYS_CVS',
  topics: [{
    id: 'cvs-cardiac-anatomy', title: 'Cardiac anatomy', tpcId: 'TPC_CVS_CARDIAC_ANATOMY',
    subs: [{ id: 'chambers', title: 'Chambers', subId: 'SUB_CHAMBERS', micros: [] }],
  }],
}])

const run = (tree: CurriculumSystem[], rows: Array<Record<string, string>>) => {
  const context = { tree, taken: new Set(indexTree(tree).keys()), changes: [] as StructuralChange[], errors: [] as string[] }
  rows.forEach((values, index) => applyRow(values, context, ids, index + 2))
  return context
}

test('the fixture exercises every subjects import field', () => {
  const row: Record<string, string> = {
    system_id: 'cvs', system: 'Cardiovascular', system_short: 'CVS', system_color: '#b4442f',
    system_cross_refs: 'resp-dyspnoea', topic_id: 'cvs-cardiac-anatomy', topic: 'Cardiac anatomy',
    topic_cross_refs: 'chambers', subtopic_id: 'chambers', subtopic: 'Chambers',
    microtopic_id: '', microtopic: 'Left ventricle', nanotopic_id: '', nanotopic: 'Apex',
  }
  const missing = SUBJECTS_IMPORT_FIELDS.map((field) => field.key).filter((key) => !(key in row))
  assert.deepEqual(missing, [], `fixture does not cover: ${missing.join(', ')}`)

  const tree = seed()
  const { errors } = run(tree, [row])
  assert.deepEqual(errors, [])
  assert.deepEqual(tree[0].crossRefs, ['resp-dyspnoea'])
  assert.deepEqual(tree[0].topics[0].crossRefs, ['chambers'])
  assert.equal(tree[0].topics[0].subs[0].micros[0].title, 'Left ventricle')
  assert.equal(tree[0].topics[0].subs[0].micros[0].nanos[0].title, 'Apex')
})

/* ---- the defect this replaces ------------------------------------------ */

test('a rename by ID moves the node instead of creating a second one', () => {
  const tree = seed()
  const { changes } = run(tree, [{ system_id: 'cvs', system: 'Cardiovascular', topic_id: 'cvs-cardiac-anatomy', topic: 'Cardiac anatomy and imaging' }])
  assert.equal(tree[0].topics.length, 1)
  assert.equal(tree[0].topics[0].id, 'cvs-cardiac-anatomy')
  assert.equal(tree[0].topics[0].title, 'Cardiac anatomy and imaging')
  assert.deepEqual(changes.filter((change) => change.action === 'rename'), [
    { level: 'topic', action: 'rename', nodeId: 'cvs-cardiac-anatomy', from: 'Cardiac anatomy', to: 'Cardiac anatomy and imaging' },
  ])
})

test('the same rename without an ID still creates a second node, as before', () => {
  // Documented, not fixed: a name-only file cannot express "this is the same
  // node under a new name". The ID column is the fix, and the wizard says so.
  const tree = seed()
  run(tree, [{ system: 'Cardiovascular', topic: 'Cardiac anatomy and imaging' }])
  assert.equal(tree[0].topics.length, 2)
})

test('re-importing an unchanged file changes nothing', () => {
  const tree = seed()
  const { changes } = run(tree, [{ system_id: 'cvs', system: 'Cardiovascular', topic_id: 'cvs-cardiac-anatomy', topic: 'Cardiac anatomy', subtopic_id: 'chambers', subtopic: 'Chambers' }])
  assert.deepEqual(changes, [])
})

test('a topic moves between systems and the move is reported', () => {
  const tree = seed()
  tree.push({ id: 'resp', name: 'Respiratory', short: 'RES', color: '#2f6fb4', sysId: 'SYS_RESP', topics: [] })
  const { changes } = run(tree, [{ system_id: 'resp', system: 'Respiratory', topic_id: 'cvs-cardiac-anatomy', topic: 'Cardiac anatomy' }])
  assert.equal(tree[0].topics.length, 0)
  assert.equal(tree[1].topics.length, 1)
  assert.deepEqual(changes, [{ level: 'topic', action: 'move', nodeId: 'cvs-cardiac-anatomy', from: 'cvs', newParentId: 'resp' }])
})

test('system metadata is editable, not just the title path', () => {
  const tree = seed()
  run(tree, [{ system_id: 'cvs', system: 'Cardiovascular', system_short: 'CV', system_color: '#123456' }])
  assert.equal(tree[0].short, 'CV')
  assert.equal(tree[0].color, '#123456')
})

test('an ID that does not exist is a row error rather than a silent create', () => {
  const tree = seed()
  const { errors } = run(tree, [{ system_id: 'nope', system: 'Nope' }])
  assert.equal(tree.length, 1)
  assert.ok(errors[0].includes('system ID nope does not exist'))
})

test('a child ID under the wrong parent is a row error', () => {
  const tree = seed()
  const { errors } = run(tree, [{ system_id: 'cvs', system: 'Cardiovascular', topic_id: 'cvs-cardiac-anatomy', topic: 'Cardiac anatomy', subtopic_id: 'not-here', subtopic: 'X' }])
  assert.ok(errors[0].includes('subtopic ID not-here is not under topic'))
})

test('a new node gets a unique ID rather than colliding', () => {
  const tree = seed()
  run(tree, [{ system: 'Cardiovascular', topic: 'Cardiac anatomy', subtopic: 'Chambers', microtopic: 'Chambers' }])
  const micro = tree[0].topics[0].subs[0].micros[0]
  assert.equal(micro.title, 'Chambers')
  assert.notEqual(micro.id, 'chambers')
  assert.equal(micro.id, 'chambers-2')
})

/* ---- guardrails -------------------------------------------------------- */

test('one label, one home is detectable before the write', () => {
  const tree = seed()
  run(tree, [{ system: 'Respiratory', topic: 'Cardiac anatomy' }])
  const duplicates = duplicateLabelsIn(tree)
  assert.equal(duplicates.length, 1)
  assert.equal(duplicates[0].label, 'cardiac anatomy')
  assert.equal(duplicates[0].paths.length, 2)
})

test('a clean tree reports no duplicate labels', () => {
  assert.deepEqual(duplicateLabelsIn(seed()), [])
})

test('records referencing a renamed node are named in the impact report', () => {
  const affected = referencesTo(['SUB_CHAMBERS'], {
    articles: [{ id: 'ART-CVS-CHAMBERS-VALVES', subtopicId: 'SUB_CHAMBERS' }, { id: 'ART-OTHER', subtopicId: 'SUB_ELSE' }],
    concepts: [{ id: 'med.concept.chambers', subtopicId: 'SUB_CHAMBERS' }],
  })
  assert.deepEqual(affected, [
    { nodeId: 'SUB_CHAMBERS', kind: 'article', recordIds: ['ART-CVS-CHAMBERS-VALVES'] },
    { nodeId: 'SUB_CHAMBERS', kind: 'concept', recordIds: ['med.concept.chambers'] },
  ])
})

test('a node nothing references reports no impact', () => {
  assert.deepEqual(referencesTo(['SUB_UNUSED'], { articles: [{ id: 'A', subtopicId: 'SUB_CHAMBERS' }], concepts: [] }), [])
})

test('slugify normalises the dash variants the corpus actually contains', () => {
  assert.equal(slugify('Acid–base balance'), 'acid-base-balance')
  assert.equal(slugify('  Fluid, electrolytes  '), 'fluid-electrolytes')
})
