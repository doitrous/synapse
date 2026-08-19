import test from 'node:test'
import assert from 'node:assert/strict'
import {
  EXAM_BUCKETS, bucketTotals, emptyExamMarks, isInternshipYear, moduleTotal, modulesWithoutMarks,
  newModuleSubject, programmeShareOf, programmeTotal, share, subjectTotal, termTotal, yearTotal,
  addSubject, curriculumOfTree, descendantCount, findSubject, mergeCurricula, removeSubject,
  subjectPath, updateSubject, walkSubjects,
  canMoveSubject, indentSubject, isDescendantOf, marksLostByMove, moveSubject, nudgeSubject,
  outdentSubject, parentOf, siblingsOf,
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

/* ---- Rearranging the tree ------------------------------------------------ */

/** `anatomy > (basis > osteo), neuro` beside `physiology`, read as a shape. */
const shape = (subjects: ModuleSubject[]): string =>
  subjects.map((entry) => (entry.children?.length ? `${entry.id}(${shape(entry.children)})` : entry.id)).join(',')

test('the tree reads as the shape the moving tests assert against', () => {
  assert.equal(shape(tree()), 'anatomy(basis(osteo),neuro),physiology')
})

test('a subject knows its parent and the list it is ordered within', () => {
  assert.equal(parentOf(tree(), 'osteo')?.id, 'basis')
  assert.equal(parentOf(tree(), 'anatomy'), null)
  assert.deepEqual(siblingsOf(tree(), 'basis').map((entry) => entry.id), ['basis', 'neuro'])
  assert.deepEqual(siblingsOf(tree(), 'physiology').map((entry) => entry.id), ['anatomy', 'physiology'])
})

test('descent is read downwards only — a parent is not beneath its own child', () => {
  assert.equal(isDescendantOf(tree(), 'anatomy', 'osteo'), true)
  assert.equal(isDescendantOf(tree(), 'basis', 'osteo'), true)
  assert.equal(isDescendantOf(tree(), 'osteo', 'anatomy'), false)
  assert.equal(isDescendantOf(tree(), 'physiology', 'osteo'), false)
})

test('a branch cannot be moved into itself or anything beneath it', () => {
  assert.equal(canMoveSubject(tree(), 'anatomy', { kind: 'inside', targetId: 'anatomy' }), false)
  assert.equal(canMoveSubject(tree(), 'anatomy', { kind: 'inside', targetId: 'osteo' }), false)
  assert.equal(canMoveSubject(tree(), 'anatomy', { kind: 'after', targetId: 'neuro' }), false)
  assert.equal(canMoveSubject(tree(), 'physiology', { kind: 'inside', targetId: 'osteo' }), true)
  assert.equal(canMoveSubject(tree(), 'nowhere', { kind: 'inside', targetId: null }), false)
})

test('an impossible move leaves the tree exactly as it was', () => {
  assert.deepEqual(moveSubject(tree(), 'anatomy', { kind: 'inside', targetId: 'osteo' }), tree())
  assert.deepEqual(moveSubject(tree(), 'nowhere', { kind: 'inside', targetId: 'anatomy' }), tree())
})

test('a subject moves under another, carrying everything beneath it', () => {
  const next = moveSubject(tree(), 'basis', { kind: 'inside', targetId: 'physiology' })
  assert.equal(shape(next), 'anatomy(neuro),physiology(basis(osteo))')
  assert.equal(findSubject(next, 'osteo')?.name, 'Osteology')
})

test('a subject moves before or after another, wherever the target sits', () => {
  assert.equal(shape(moveSubject(tree(), 'physiology', { kind: 'before', targetId: 'neuro' })), 'anatomy(basis(osteo),physiology,neuro)')
  assert.equal(shape(moveSubject(tree(), 'physiology', { kind: 'after', targetId: 'basis' })), 'anatomy(basis(osteo),physiology,neuro)')
  assert.equal(shape(moveSubject(tree(), 'neuro', { kind: 'before', targetId: 'anatomy' })), 'neuro,anatomy(basis(osteo)),physiology')
})

test('a null target is the top of the module, and the last place in it', () => {
  assert.equal(shape(moveSubject(tree(), 'osteo', { kind: 'inside', targetId: null })), 'anatomy(basis,neuro),physiology,osteo')
})

test('a nudge steps one place among its own siblings', () => {
  assert.equal(shape(nudgeSubject(tree(), 'neuro', -1)), 'anatomy(neuro,basis(osteo)),physiology')
  assert.equal(shape(nudgeSubject(tree(), 'basis', 1)), 'anatomy(neuro,basis(osteo)),physiology')
  assert.equal(shape(nudgeSubject(tree(), 'physiology', -1)), 'physiology,anatomy(basis(osteo),neuro)')
})

test('a nudge at either end of a list holds, and never escapes its parent', () => {
  assert.deepEqual(nudgeSubject(tree(), 'basis', -1), tree())
  assert.deepEqual(nudgeSubject(tree(), 'neuro', 1), tree())
  assert.deepEqual(nudgeSubject(tree(), 'anatomy', -1), tree())
  assert.deepEqual(nudgeSubject(tree(), 'osteo', 1), tree())
})

test('indenting tucks a subject under the sibling above it', () => {
  assert.equal(shape(indentSubject(tree(), 'neuro')), 'anatomy(basis(osteo,neuro)),physiology')
  assert.equal(shape(indentSubject(tree(), 'physiology')), 'anatomy(basis(osteo),neuro,physiology)')
})

test('the first subject of a list has nothing above it to indent under', () => {
  assert.deepEqual(indentSubject(tree(), 'basis'), tree())
  assert.deepEqual(indentSubject(tree(), 'anatomy'), tree())
  assert.deepEqual(indentSubject(tree(), 'osteo'), tree())
})

test('outdenting lifts a subject out to sit just after its parent', () => {
  assert.equal(shape(outdentSubject(tree(), 'osteo')), 'anatomy(basis,osteo,neuro),physiology')
  assert.equal(shape(outdentSubject(tree(), 'basis')), 'anatomy(neuro),basis(osteo),physiology')
})

test('a subject already at the top of the module has nowhere to outdent to', () => {
  assert.deepEqual(outdentSubject(tree(), 'anatomy'), tree())
  assert.deepEqual(outdentSubject(tree(), 'physiology'), tree())
})

test('nesting a marked subject reports the marks it would stop counting', () => {
  // Physiology carries 30 of the module's 100 and is a direct subject; under
  // Anatomy it keeps the number and stops contributing it.
  assert.equal(marksLostByMove(tree(), 'physiology', { kind: 'inside', targetId: 'anatomy' }), 30)
  assert.equal(marksLostByMove(tree(), 'physiology', { kind: 'after', targetId: 'neuro' }), 30)
  assert.equal(moduleTotal(moveSubject(tree(), 'physiology', { kind: 'inside', targetId: 'anatomy' })), 70)
})

test('reordering at the top, or promoting to it, costs the module nothing', () => {
  assert.equal(marksLostByMove(tree(), 'physiology', { kind: 'before', targetId: 'anatomy' }), 0)
  assert.equal(marksLostByMove(tree(), 'physiology', { kind: 'inside', targetId: null }), 0)
  assert.equal(marksLostByMove(tree(), 'basis', { kind: 'inside', targetId: 'physiology' }), 0)
  assert.equal(marksLostByMove(tree(), 'anatomy', { kind: 'inside', targetId: 'osteo' }), 0)
  assert.equal(moduleTotal(nudgeSubject(tree(), 'physiology', -1)), 100)
})

test('promoting a nested subject gives the module its marks to count', () => {
  const marked = updateSubject(tree(), 'basis', (entry) => ({ ...entry, marks: { ...entry.marks, writtenEndOfModule: 40 } }))
  assert.equal(moduleTotal(marked), 100)
  assert.equal(moduleTotal(moveSubject(marked, 'basis', { kind: 'inside', targetId: null })), 140)
})

test('what a subject covers travels with it', () => {
  const next = moveSubject(tree(), 'basis', { kind: 'inside', targetId: 'physiology' })
  assert.deepEqual(curriculumOfTree(findSubject(next, 'physiology')!).topicNodeIds?.slice().sort(), ['SYS-CVS', 'SYS-MSK'])
  assert.deepEqual(curriculumOfTree(findSubject(next, 'anatomy')!).topicNodeIds?.slice().sort(), ['SYS-NEU'])
  // Nothing is created or lost by a move: the module covers what it covered.
  assert.deepEqual(mergeCurricula(next).topicNodeIds?.slice().sort(), mergeCurricula(tree()).topicNodeIds?.slice().sort())
})
