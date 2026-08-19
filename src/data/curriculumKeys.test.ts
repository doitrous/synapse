import test from 'node:test'
import assert from 'node:assert/strict'
import {
  deleteTerm, isYearLive, migrateModuleCurricula, migrateModuleKeys, moduleKey, moveModule, renameTerm,
} from './curriculumKeys.ts'
import { moduleTotal, newModuleSubject, type ModuleSubjectStore } from './moduleSubjects.ts'
import type { CourseCurriculumSelection } from './courseCurriculum.ts'
import type { University } from './universities.ts'

function uni(): University {
  return {
    id: 'u', name: 'U', short: 'U', region: 'R',
    years: [
      { id: 'U_Y1', year: 'Year 1', students: 0, terms: ['Term 1', 'Term 2'], courses: [
        { id: 'c1', name: 'M1', block: 'B1', term: 'Term 1' },
        { id: 'c2', name: 'M2', block: 'B2', term: 'Term 2' },
      ] },
      { id: 'U_Y2', year: 'Year 2', students: 0, terms: ['Term 1'], courses: [] },
    ],
  }
}

const emptyStores = () => ({ subjects: {} as ModuleSubjectStore, curricula: {}, schedules: {} })

test('a module key is the university, the year id, and the course', () => {
  assert.equal(moduleKey('u', 'U_Y1', 'c1'), 'u:U_Y1:c1')
})

test('keys naming a year by its label are rewritten to name it by its id', () => {
  const store = { 'u:Year 1:c1': ['a'], 'u:Year 2:c9': ['b'] }
  assert.deepEqual(migrateModuleKeys(store, [uni()]), { 'u:U_Y1:c1': ['a'], 'u:U_Y2:c9': ['b'] })
})

test('migrating keys twice changes nothing the second time', () => {
  const once = migrateModuleKeys({ 'u:Year 1:c1': ['a'] }, [uni()])
  assert.deepEqual(migrateModuleKeys(once, [uni()]), once)
})

test('a key belonging to no known year is kept, never dropped', () => {
  const store = { 'zz:Nowhere:c1': ['a'] }
  assert.deepEqual(migrateModuleKeys(store, [uni()]), store)
})

test('a module-level selection becomes one subject named General, carrying every list', () => {
  const curricula: Record<string, CourseCurriculumSelection> = {
    'u:U_Y1:c1': { articleIds: ['a1'], questionIds: ['q1'], practicalIds: ['p1'], topicNodeIds: ['t1'], conceptIds: ['k1'], resourceIds: ['r1'] },
  }
  const subjects = migrateModuleCurricula({}, curricula)['u:U_Y1:c1']
  assert.equal(subjects.length, 1)
  assert.equal(subjects[0].name, 'General')
  assert.equal(moduleTotal(subjects), 0)
  assert.deepEqual(subjects[0].curriculum.articleIds, ['a1'])
  assert.deepEqual(subjects[0].curriculum.topicNodeIds, ['t1'])
  assert.deepEqual(subjects[0].curriculum.resourceIds, ['r1'])
  assert.deepEqual(subjects[0].curriculum.conceptIds, ['k1'])
})

test('a module that already has subjects is not given a second General', () => {
  const curricula: Record<string, CourseCurriculumSelection> = {
    'u:U_Y1:c1': { articleIds: ['a1'], questionIds: [], practicalIds: [] },
  }
  const store: ModuleSubjectStore = { 'u:U_Y1:c1': [newModuleSubject('Anatomy')] }
  assert.deepEqual(migrateModuleCurricula(store, curricula), store)
})

test('moving between terms in one year keeps every key where it was', () => {
  const stores = { ...emptyStores(), subjects: { 'u:U_Y1:c1': [newModuleSubject('A')] } }
  const result = moveModule({ university: uni(), courseId: 'c1', fromYearId: 'U_Y1', toYearId: 'U_Y1', toTerm: 'Term 2' }, stores)
  assert.equal(result.university.years[0].courses.find((c) => c.id === 'c1')?.term, 'Term 2')
  assert.equal(result.university.years[0].courses.length, 2)
  assert.ok(result.stores.subjects['u:U_Y1:c1'])
})

test('moving between years carries the marks, the curriculum and the schedule with it', () => {
  const stores = {
    subjects: { 'u:U_Y1:c1': [newModuleSubject('A')] } as ModuleSubjectStore,
    curricula: { 'u:U_Y1:c1': { articleIds: ['a1'], questionIds: [], practicalIds: [] } },
    schedules: { 'u:U_Y1:c1': [{ id: 'b1' }] },
  }
  const result = moveModule({ university: uni(), courseId: 'c1', fromYearId: 'U_Y1', toYearId: 'U_Y2', toTerm: 'Term 1' }, stores)
  assert.equal(result.university.years[0].courses.some((c) => c.id === 'c1'), false)
  assert.equal(result.university.years[1].courses.some((c) => c.id === 'c1'), true)
  assert.equal(result.stores.subjects['u:U_Y1:c1'], undefined)
  assert.equal(result.stores.curricula['u:U_Y1:c1'], undefined)
  assert.equal(result.stores.schedules['u:U_Y1:c1'], undefined)
  assert.ok(result.stores.subjects['u:U_Y2:c1'])
  assert.ok(result.stores.curricula['u:U_Y2:c1'])
  assert.ok(result.stores.schedules['u:U_Y2:c1'])
})

test('moving into a term the target year does not have creates it there', () => {
  const result = moveModule({ university: uni(), courseId: 'c1', fromYearId: 'U_Y1', toYearId: 'U_Y2', toTerm: 'Term 3' }, emptyStores())
  assert.deepEqual(result.university.years[1].terms, ['Term 1', 'Term 3'])
})

test('moving a module that is not there changes nothing', () => {
  const before = uni()
  const result = moveModule({ university: before, courseId: 'nope', fromYearId: 'U_Y1', toYearId: 'U_Y2', toTerm: 'Term 1' }, emptyStores())
  assert.equal(result.university, before)
})

test('renaming a term takes its modules with it', () => {
  const result = renameTerm(uni(), 'U_Y1', 'Term 2', 'Spring')
  assert.deepEqual(result.years[0].terms, ['Term 1', 'Spring'])
  assert.equal(result.years[0].courses.find((c) => c.id === 'c2')?.term, 'Spring')
  assert.equal(result.years[0].courses.find((c) => c.id === 'c1')?.term, 'Term 1')
})

test('deleting a term reassigns its modules rather than losing them', () => {
  const result = deleteTerm(uni(), 'U_Y1', 'Term 2', 'Term 1')
  assert.deepEqual(result.years[0].terms, ['Term 1'])
  assert.equal(result.years[0].courses.length, 2)
  assert.equal(result.years[0].courses.find((c) => c.id === 'c2')?.term, 'Term 1')
})

test('a year is live only when it and its university both are', () => {
  const u = uni()
  assert.equal(isYearLive(u, u.years[0]), true)
  assert.equal(isYearLive({ ...u, active: false }, u.years[0]), false)
  assert.equal(isYearLive(u, { ...u.years[0], active: false }), false)
  assert.equal(isYearLive({ ...u, active: true }, { ...u.years[0], active: true }), true)
})
