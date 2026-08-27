import test from 'node:test'
import assert from 'node:assert/strict'
import { compareLibraryTopics, primaryModuleId } from './libraryOrder.ts'
import type { LibTopic, Subtopic } from './library.ts'

function subtopic(id: string, moduleIds?: string[]): Subtopic {
  return {
    id, title: id, readingMin: 1, summary: '', blocks: [], keyPoints: [], questions: [], resources: [],
    ...(moduleIds ? { moduleIds } : {}),
  }
}

function topic(id: string, subjectId: string, subtopics: Subtopic[]): LibTopic {
  return { id, title: id, subjectId, subtopics }
}

const moduleRank = new Map([['CVS 01', 0], ['RES 01', 1]])
const subjectRank = new Map([['cvs', 0], ['resp', 1]])
const subjectName = (id: string) => ({ cvs: 'Cardiovascular', resp: 'Respiratory' })[id] ?? id

test('primaryModuleId is the first module named by the first subtopic that names one', () => {
  assert.equal(primaryModuleId(topic('t1', 'cvs', [subtopic('a'), subtopic('b', ['CVS 01', 'RES 01'])])), 'CVS 01')
  assert.equal(primaryModuleId(topic('t2', 'cvs', [subtopic('a')])), undefined)
})

test('topics sort by their primary module in catalogue order, earliest module first', () => {
  const respTopic = topic('resp-topic', 'resp', [subtopic('r1', ['RES 01'])])
  const cvsTopic = topic('cvs-topic', 'cvs', [subtopic('c1', ['CVS 01'])])
  const sorted = [respTopic, cvsTopic].sort((a, b) => compareLibraryTopics(a, b, moduleRank, subjectRank, subjectName))
  assert.deepEqual(sorted.map((t) => t.id), ['cvs-topic', 'resp-topic'])
})

test('within the same module, topics sort by subject order', () => {
  const respInCvsModule = topic('resp-in-cvs', 'resp', [subtopic('r1', ['CVS 01'])])
  const cvsInCvsModule = topic('cvs-in-cvs', 'cvs', [subtopic('c1', ['CVS 01'])])
  const sorted = [respInCvsModule, cvsInCvsModule].sort((a, b) => compareLibraryTopics(a, b, moduleRank, subjectRank, subjectName))
  assert.deepEqual(sorted.map((t) => t.id), ['cvs-in-cvs', 'resp-in-cvs'])
})

test('topics with no module at all fall into a final General bucket, after every moduled topic', () => {
  const general = topic('general', 'cvs', [subtopic('g1')])
  const moduled = topic('moduled', 'resp', [subtopic('m1', ['RES 01'])])
  const sorted = [general, moduled].sort((a, b) => compareLibraryTopics(a, b, moduleRank, subjectRank, subjectName))
  assert.deepEqual(sorted.map((t) => t.id), ['moduled', 'general'])
})

test('a module id the registry does not know still forms its own group, after every recognised module', () => {
  const unknown = topic('unknown-mod', 'cvs', [subtopic('u1', ['ZZZ 99'])])
  const known = topic('known-mod', 'resp', [subtopic('k1', ['RES 01'])])
  const general = topic('general', 'cvs', [subtopic('g1')])
  const sorted = [general, unknown, known].sort((a, b) => compareLibraryTopics(a, b, moduleRank, subjectRank, subjectName))
  assert.deepEqual(sorted.map((t) => t.id), ['known-mod', 'unknown-mod', 'general'])
})

test('equal module and subject leaves topics in their original relative order (stable sort)', () => {
  const first = topic('first', 'cvs', [subtopic('a1', ['CVS 01'])])
  const second = topic('second', 'cvs', [subtopic('a2', ['CVS 01'])])
  const third = topic('third', 'cvs', [subtopic('a3', ['CVS 01'])])
  const sorted = [first, second, third].sort((a, b) => compareLibraryTopics(a, b, moduleRank, subjectRank, subjectName))
  assert.deepEqual(sorted.map((t) => t.id), ['first', 'second', 'third'])
})

test('a subject missing from the ranking falls back to alphabetical order by name', () => {
  const unrankedSubjectRank = new Map<string, number>()
  const zzz = topic('zzz', 'zzz-subject', [subtopic('z1', ['CVS 01'])])
  const aaa = topic('aaa', 'aaa-subject', [subtopic('a1', ['CVS 01'])])
  const names = ({ 'zzz-subject': 'Zzz subject', 'aaa-subject': 'Aaa subject' } as Record<string, string>)
  const sorted = [zzz, aaa].sort((a, b) => compareLibraryTopics(a, b, moduleRank, unrankedSubjectRank, (id) => names[id] ?? id))
  assert.deepEqual(sorted.map((t) => t.id), ['aaa', 'zzz'])
})
