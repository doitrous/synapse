import test from 'node:test'
import assert from 'node:assert/strict'
import {
  EXAM_BUCKETS, bucketTotals, emptyExamMarks, isInternshipYear, moduleTotal, modulesWithoutMarks,
  newModuleSubject, programmeShareOf, programmeTotal, share, subjectTotal, termTotal, yearTotal,
  type ModuleSubject, type ModuleSubjectStore,
} from './moduleSubjects.ts'
import type { University } from './universities.ts'

const subject = (name: string, w1: number, w2: number, p1: number, p2: number): ModuleSubject => ({
  ...newModuleSubject(name),
  marks: { writtenEndOfModule: w1, writtenEndOfYear: w2, practicalEndOfModule: p1, practicalEndOfYear: p2 },
})

test('a subject totals the four buckets it is examined in', () => {
  assert.equal(subjectTotal(subject('Anatomy', 30, 20, 15, 5)), 70)
  assert.equal(subjectTotal(subject('Untouched', 0, 0, 0, 0)), 0)
})

test('the declared bucket order covers every field of ExamMarks, and no other', () => {
  assert.deepEqual(EXAM_BUCKETS.map((bucket) => bucket.key).slice().sort(), Object.keys(emptyExamMarks()).sort())
})

test('a module totals its subjects, and holds no marks of its own', () => {
  assert.equal(moduleTotal([subject('A', 10, 0, 0, 0), subject('B', 5, 5, 0, 0)]), 20)
  assert.equal(moduleTotal([]), 0)
})

test('a share of nothing is not set, never zero and never NaN', () => {
  assert.equal(share(0, 0), null)
  assert.equal(share(10, 0), null)
  assert.equal(share(25, 100), 25)
  assert.equal(share(1, 3)?.toFixed(1), '33.3')
})

test('only the internship year ids universityYearId mints count as internship', () => {
  assert.equal(isInternshipYear({ id: 'KAU_INT1' }), true)
  assert.equal(isInternshipYear({ id: 'KAU_INT2' }), true)
  assert.equal(isInternshipYear({ id: 'KAU_Y1' }), false)
  assert.equal(isInternshipYear({ id: 'KAU_INTRO' }), false)
})

function fixture(): { uni: University; store: ModuleSubjectStore } {
  const uni: University = {
    id: 'u', name: 'U', short: 'U', region: 'R',
    years: [
      { id: 'U_Y1', year: 'Year 1', students: 0, terms: ['Term 1', 'Term 2'], courses: [
        { id: 'c1', name: 'M1', block: 'B1', term: 'Term 1' },
        { id: 'c2', name: 'M2', block: 'B2', term: 'Term 2' },
      ] },
      { id: 'U_Y2', year: 'Year 2', students: 0, terms: ['Term 1'], courses: [
        { id: 'c3', name: 'M3', block: 'B3', term: 'Term 1' },
      ] },
      { id: 'U_INT1', year: 'Internship Year 1', students: 0, terms: ['Term 1'], courses: [
        { id: 'c4', name: 'M4', block: 'B4', term: 'Term 1' },
      ] },
    ],
  }
  const store: ModuleSubjectStore = {
    'u:U_Y1:c1': [subject('Anatomy', 30, 20, 15, 5), subject('Physiology', 20, 10, 0, 0)],
    'u:U_Y1:c2': [subject('Pathology', 25, 25, 0, 0)],
    'u:U_Y2:c3': [subject('Medicine', 100, 0, 0, 0)],
    'u:U_INT1:c4': [subject('Rotation', 40, 0, 0, 0)],
  }
  return { uni, store }
}

test('a term totals only the modules sitting in it', () => {
  const { uni, store } = fixture()
  assert.equal(termTotal(uni, uni.years[0], 'Term 1', store), 100)
  assert.equal(termTotal(uni, uni.years[0], 'Term 2', store), 50)
})

test('a year totals every module it holds', () => {
  const { uni, store } = fixture()
  assert.equal(yearTotal(uni, uni.years[0], store), 150)
  assert.equal(yearTotal(uni, uni.years[1], store), 100)
})

test('the programme excludes internship years', () => {
  const { uni, store } = fixture()
  assert.equal(programmeTotal(uni, store), 250)
})

test('a module with no subjects contributes nothing and is named as a gap', () => {
  const { uni, store } = fixture()
  delete store['u:U_Y1:c2']
  assert.equal(yearTotal(uni, uni.years[0], store), 100)
  assert.deepEqual(modulesWithoutMarks(uni, store).map((gap) => gap.course.id), ['c2'])
})

test('a module whose subjects all carry zero is a gap too', () => {
  const { uni, store } = fixture()
  store['u:U_Y2:c3'] = [subject('Medicine', 0, 0, 0, 0)]
  assert.ok(modulesWithoutMarks(uni, store).some((gap) => gap.course.id === 'c3'))
})

test('the subjects of a module share it out to a hundred per cent', () => {
  const { store } = fixture()
  const subjects = store['u:U_Y1:c1']
  const total = moduleTotal(subjects)
  const sum = subjects.reduce((acc, entry) => acc + (share(subjectTotal(entry), total) ?? 0), 0)
  assert.equal(Number(sum.toFixed(1)), 100)
})

test('a set of subjects splits across the four buckets', () => {
  const { store } = fixture()
  assert.deepEqual(bucketTotals(store['u:U_Y1:c1']), {
    writtenEndOfModule: 50, writtenEndOfYear: 30, practicalEndOfModule: 15, practicalEndOfYear: 5,
  })
})

test('a module in an internship year has no share of the degree, rather than a small one', () => {
  const { uni, store } = fixture()
  const internship = uni.years[2]
  assert.equal(programmeShareOf(uni, internship, 40, store), null)
})

test('a module in a programme year has its share of the degree', () => {
  const { uni, store } = fixture()
  assert.equal(programmeShareOf(uni, uni.years[1], 100, store), 40)
})
