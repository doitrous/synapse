import test from 'node:test'
import assert from 'node:assert/strict'
import {
  curriculumScopeHasModule,
  mediaRequestCurriculumScope,
  mediaRequestModuleOptions,
  sortMediaRequestRows,
} from './mediaRequestCurriculum.ts'
import type { ManagedContentItem } from './contentControl.ts'
import type { University } from './universities.ts'

const catalogue = [
  {
    id: 'kau', short: 'KAU', name: 'Kasr Alainy', region: 'Cairo', years: [
      { id: 'KAU_Y1', year: 'Year 1', students: 0, courses: [{ id: 'm-1', name: 'Cardiovascular', block: 'Term 1', moduleId: 'CVS' }] },
      { id: 'KAU_Y2', year: 'Year 2', students: 0, courses: [{ id: 'm-2', name: 'Respiratory', block: 'Term 1', moduleId: 'RES' }] },
    ],
  },
  {
    id: 'asu', short: 'ASU', name: 'Ain Shams', region: 'Cairo', years: [
      { id: 'ASU_Y1', year: 'Year 1', students: 0, courses: [{ id: 'm-3', name: 'ASU Cardiovascular', block: 'Term 1', moduleId: 'CVS' }] },
    ],
  },
] satisfies University[]

function item(kind: ManagedContentItem['kind'], data: Record<string, unknown>): ManagedContentItem {
  return {
    id: `${kind}-1`, kind, title: 'Owner', subjectId: 'cvs', status: 'Draft', owner: 'Admin', updatedAt: '', fields: {},
    [`${kind}Data`]: data,
  } as unknown as ManagedContentItem
}

test('question requests inherit university, year and module from their owner', () => {
  const owner = item('question', { tags: {
    universityIds: ['KAU'], years: ['KAU_Y1'], moduleSubjectPaths: ['CVS > Anatomy'],
  } })
  const scope = mediaRequestCurriculumScope(owner, catalogue)
  const option = mediaRequestModuleOptions(catalogue).find((candidate) => candidate.universityId === 'kau')!

  assert.deepEqual(scope.universityIds, ['kau'])
  assert.deepEqual(scope.yearIds, ['KAU_Y1'])
  assert.deepEqual(scope.moduleKeys, ['cvs'])
  assert.equal(curriculumScopeHasModule(scope, option), true)
})

test('questionOnlyFor contributes its actual university/year audience', () => {
  const owner = item('question', { tags: { questionOnlyFor: ['ASU_Y1'], moduleIds: ['CVS'] } })
  const scope = mediaRequestCurriculumScope(owner, catalogue)

  assert.deepEqual(scope.universityIds, ['asu'])
  assert.deepEqual(scope.yearIds, ['ASU_Y1'])
  assert.equal(curriculumScopeHasModule(scope, mediaRequestModuleOptions(catalogue)[0]), false)
  assert.equal(curriculumScopeHasModule(scope, mediaRequestModuleOptions(catalogue)[2]), true)
})

test('article, practical and resource records use their own curriculum fields', () => {
  for (const kind of ['article', 'practical', 'resource'] as const) {
    const scope = mediaRequestCurriculumScope(item(kind, {
      universityIds: ['kau'], yearIds: ['Year 2'], moduleIds: ['RES'],
    }), catalogue)
    assert.deepEqual(scope.universityIds, ['kau'], kind)
    assert.deepEqual(scope.yearIds, ['KAU_Y2'], kind)
    assert.deepEqual(scope.moduleKeys, ['res'], kind)
  }
})

test('content types without authored curriculum remain visibly unassigned', () => {
  for (const kind of ['deck', 'essay', 'histology'] as const) {
    assert.deepEqual(mediaRequestCurriculumScope(item(kind, {}), catalogue), {
      hasUniversityAssignment: false, hasYearAssignment: false, hasModuleAssignment: false,
      universityIds: [], yearIds: [], moduleKeys: [], unresolvedModules: [],
    }, kind)
  }
})

test('future nested curriculum tags work across content types without guessing today', () => {
  const scope = mediaRequestCurriculumScope(item('histology', {
    tissue: 'Lung', tags: { universityIds: ['ASU'], yearIds: ['ASU_Y1'], moduleIds: ['CVS'] },
  }), catalogue)
  assert.deepEqual(scope.universityIds, ['asu'])
  assert.deepEqual(scope.yearIds, ['ASU_Y1'])
  assert.deepEqual(scope.moduleKeys, ['cvs'])
  assert.equal(scope.hasUniversityAssignment, true)
  assert.equal(scope.hasYearAssignment, true)
  assert.equal(scope.hasModuleAssignment, true)
})

test('unknown module tags stay distinguishable from no module assignment', () => {
  const scope = mediaRequestCurriculumScope(item('practical', { moduleIds: ['LEGACY-MOD'] }), catalogue)
  assert.deepEqual(scope.moduleKeys, ['legacy-mod'])
  assert.deepEqual(scope.unresolvedModules, ['LEGACY-MOD'])
  assert.equal(scope.hasModuleAssignment, true)
})

test('curriculum sorts are deterministic and put unassigned owners last', () => {
  const kau = mediaRequestCurriculumScope(item('article', {
    universityIds: ['kau'], yearIds: ['KAU_Y2'], moduleIds: ['RES'],
  }), catalogue)
  const asu = mediaRequestCurriculumScope(item('article', {
    universityIds: ['asu'], yearIds: ['ASU_Y1'], moduleIds: ['CVS'],
  }), catalogue)
  const unassigned = mediaRequestCurriculumScope(item('histology', {}), catalogue)
  const rows = [
    { id: '3', ownerTitle: 'Unplaced', priority: 'required', status: 'needed', curriculum: unassigned },
    { id: '2', ownerTitle: 'Respiratory owner', priority: 'optional', status: 'planned', curriculum: kau },
    { id: '1', ownerTitle: 'Cardiac owner', priority: 'required', status: 'needed', curriculum: asu },
  ]

  assert.deepEqual(sortMediaRequestRows(rows, 'university', catalogue).map((row) => row.id), ['1', '2', '3'])
  assert.deepEqual(sortMediaRequestRows(rows, 'year', catalogue).map((row) => row.id), ['1', '2', '3'])
  assert.deepEqual(sortMediaRequestRows(rows, 'module', catalogue).map((row) => row.id), ['1', '2', '3'])
  assert.deepEqual(sortMediaRequestRows(rows, 'priority', catalogue).map((row) => row.id), ['1', '3', '2'])
})
