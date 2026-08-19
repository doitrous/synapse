import test from 'node:test'
import assert from 'node:assert/strict'
import {
  EXAM_BUCKETS, bucketTotals, emptyExamMarks, isInternshipYear, moduleTotal, modulesWithoutMarks,
  newModuleSubject, programmeShareOf, programmeTotal, share, subjectTotal, termTotal, yearTotal,
  addSubject, curriculumOfTree, descendantCount, findSubject, mergeCurricula, removeSubject,
  subjectPath, updateSubject, walkSubjects,
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

/* ---- The subject tree ---------------------------------------------------- */

const leaf = (id: string, name: string, topics: string[] = []): ModuleSubject => ({
  ...newModuleSubject(name),
  id,
  curriculum: { articleIds: [], questionIds: [], practicalIds: [], topicNodeIds: topics, conceptIds: [], resourceIds: [] },
})

/** Anatomy → Basis of Anatomy → Osteology, beside an unsplit Physiology. */
function tree(): ModuleSubject[] {
  return [
    {
      ...subject('Anatomy', 30, 20, 15, 5),
      id: 'anatomy',
      children: [
        { ...leaf('basis', 'Basis of Anatomy', ['SYS-CVS']), children: [leaf('osteo', 'Osteology', ['SYS-MSK'])] },
        leaf('neuro', 'Neuroanatomy', ['SYS-NEU']),
      ],
    },
    { ...subject('Physiology', 20, 10, 0, 0), id: 'physiology' },
  ]
}

test('the whole tree is walked, parents before their children', () => {
  assert.deepEqual(walkSubjects(tree()).map((entry) => entry.id), ['anatomy', 'basis', 'osteo', 'neuro', 'physiology'])
})

test('a subject is found however deep it sits', () => {
  assert.equal(findSubject(tree(), 'osteo')?.name, 'Osteology')
  assert.equal(findSubject(tree(), 'nowhere'), undefined)
})

test('a subject knows how many sit beneath it', () => {
  const anatomy = tree()[0]
  assert.equal(descendantCount(anatomy), 3)
  assert.equal(descendantCount(tree()[1]), 0)
})

test('a subject can be edited at any depth without disturbing the rest', () => {
  const next = updateSubject(tree(), 'osteo', (entry) => ({ ...entry, name: 'Bones' }))
  assert.equal(findSubject(next, 'osteo')?.name, 'Bones')
  assert.equal(findSubject(next, 'basis')?.name, 'Basis of Anatomy')
  assert.equal(findSubject(next, 'physiology')?.name, 'Physiology')
})

test('removing a subject takes everything under it', () => {
  const next = removeSubject(tree(), 'basis')
  assert.deepEqual(walkSubjects(next).map((entry) => entry.id), ['anatomy', 'neuro', 'physiology'])
})

test('removing a top subject leaves the others alone', () => {
  assert.deepEqual(walkSubjects(removeSubject(tree(), 'anatomy')).map((entry) => entry.id), ['physiology'])
})

test('a subject is added at the top of the module, or under the one named', () => {
  const atTop = addSubject(tree(), null, leaf('path', 'Pathology'))
  assert.deepEqual(atTop.map((entry) => entry.id), ['anatomy', 'physiology', 'path'])

  const deeper = addSubject(tree(), 'basis', leaf('joints', 'Arthrology'))
  assert.deepEqual(findSubject(deeper, 'basis')?.children?.map((entry) => entry.id), ['osteo', 'joints'])
})

test('the path reads from the top of the module down to the subject', () => {
  assert.deepEqual(subjectPath(tree(), 'osteo').map((entry) => entry.name), ['Anatomy', 'Basis of Anatomy', 'Osteology'])
  assert.deepEqual(subjectPath(tree(), 'physiology').map((entry) => entry.name), ['Physiology'])
  assert.deepEqual(subjectPath(tree(), 'nowhere'), [])
})

test('what a module covers includes everything chosen at every depth', () => {
  assert.deepEqual(mergeCurricula(tree()).topicNodeIds?.slice().sort(), ['SYS-CVS', 'SYS-MSK', 'SYS-NEU'])
})

test('what a subject covers includes everything beneath it, and nothing beside it', () => {
  const anatomy = tree()[0]
  assert.deepEqual(curriculumOfTree(anatomy).topicNodeIds?.slice().sort(), ['SYS-CVS', 'SYS-MSK', 'SYS-NEU'])
  const basis = findSubject(tree(), 'basis')!
  assert.deepEqual(curriculumOfTree(basis).topicNodeIds?.slice().sort(), ['SYS-CVS', 'SYS-MSK'])
})

test('only a module’s direct subjects carry marks towards its total', () => {
  // Anatomy 70 + Physiology 30. The nested subjects carry none and add none,
  // so splitting a discipline never changes what the module is worth.
  assert.equal(moduleTotal(tree()), 100)
  const split = updateSubject(tree(), 'basis', (entry) => ({
    ...entry,
    marks: { writtenEndOfModule: 999, writtenEndOfYear: 0, practicalEndOfModule: 0, practicalEndOfYear: 0 },
  }))
  assert.equal(moduleTotal(split), 100)
})

test('splitting a subject leaves its own marks exactly where they were', () => {
  const before = moduleTotal(tree())
  const after = addSubject(tree(), 'physiology', leaf('cell', 'Cell Physiology'))
  assert.equal(moduleTotal(after), before)
  assert.equal(subjectTotal(findSubject(after, 'physiology')!), 30)
})
