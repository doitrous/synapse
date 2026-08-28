import test from 'node:test'
import assert from 'node:assert/strict'
import {
  clearCurriculumScopePart,
  curriculumModuleOptions,
  curriculumScopeChips,
  curriculumUniversityOptions,
  curriculumYearOptions,
  isCurriculumScopeEmpty,
  resolveCurriculumScope,
} from './curriculumFilters.ts'
import type { University } from './universities.ts'

const catalogue = [
  {
    id: 'kau', short: 'KAU', name: 'Kasr Alainy', region: 'Cairo', years: [
      {
        id: 'KAU_Y1', year: 'Year 1', students: 0, courses: [
          { id: 'm-1', name: 'Cardiovascular', block: 'Term 1', moduleId: 'CVS' },
          { id: 'm-2', name: 'Respiratory', block: 'Term 1', moduleId: 'RES' },
        ],
      },
      {
        id: 'KAU_Y2', year: 'Year 2', students: 0, courses: [
          { id: 'm-3', name: 'Neurology', block: 'Term 1', moduleId: 'NEU' },
        ],
      },
    ],
  },
  {
    id: 'asu', short: 'ASU', name: 'Ain Shams', region: 'Cairo', years: [
      {
        id: 'ASU_Y1', year: 'Year 1', students: 0, courses: [
          // Same module id as KAU's — a stable filter key must not collide across universities.
          { id: 'm-4', name: 'ASU Cardiovascular', block: 'Term 1', moduleId: 'CVS' },
        ],
      },
    ],
  },
  // Malformed/legacy data: no module id at all. Must still resolve to a
  // stable, non-empty option via `defaultModuleId` rather than being dropped.
  {
    id: 'hu', short: 'HU', name: 'Helwan', region: 'Helwan', years: [
      {
        id: 'HU_Y1', year: 'Year 1', students: 0, courses: [
          { id: 'm-5', name: 'General Anatomy', block: 'Term 1' },
        ],
      },
    ],
  },
] satisfies University[]

test('curriculumUniversityOptions dedupes and alphabetises', () => {
  const options = curriculumUniversityOptions([...catalogue, catalogue[0]])
  assert.deepEqual(options, [
    { id: 'asu', label: 'Ain Shams' },
    { id: 'hu', label: 'Helwan' },
    { id: 'kau', label: 'Kasr Alainy' },
  ])
})

test('curriculumYearOptions is empty without a university and scoped with one', () => {
  assert.deepEqual(curriculumYearOptions(catalogue), [])
  assert.deepEqual(curriculumYearOptions(catalogue, 'missing'), [])
  assert.deepEqual(curriculumYearOptions(catalogue, 'kau'), [
    { id: 'KAU_Y1', label: 'Year 1' },
    { id: 'KAU_Y2', label: 'Year 2' },
  ])
})

test('curriculumModuleOptions is empty without a university, grouped across years, and stable across universities that reuse a module id', () => {
  assert.deepEqual(curriculumModuleOptions(catalogue), [])

  const allKauModules = curriculumModuleOptions(catalogue, 'kau')
  assert.equal(allKauModules.length, 3)
  assert.deepEqual(allKauModules.map((m) => m.groupLabel), ['Year 1', 'Year 1', 'Year 2'])

  const yearScoped = curriculumModuleOptions(catalogue, 'kau', 'KAU_Y1')
  assert.deepEqual(yearScoped.map((m) => m.id), [
    'kau␟KAU_Y1␟CVS',
    'kau␟KAU_Y1␟RES',
  ])

  const asuScoped = curriculumModuleOptions(catalogue, 'asu', 'ASU_Y1')
  assert.equal(asuScoped.length, 1)
  assert.notEqual(asuScoped[0].id, yearScoped[0].id, 'same moduleId across universities must not collide')

  const helwan = curriculumModuleOptions(catalogue, 'hu', 'HU_Y1')
  assert.equal(helwan.length, 1)
  assert.equal(helwan[0].label, 'General Anatomy')
})

test('curriculumModuleOptions deduplicates a repeated course entry', () => {
  const withDuplicate = catalogue.map((university) => university.id === 'kau'
    ? { ...university, years: university.years.map((year) => year.id === 'KAU_Y1' ? { ...year, courses: [...year.courses, year.courses[0]] } : year) }
    : university)
  const options = curriculumModuleOptions(withDuplicate, 'kau', 'KAU_Y1')
  assert.equal(options.length, 2, 'the repeated course must collapse into one option')
})

test('resolveCurriculumScope drops a year that does not belong to the chosen university', () => {
  assert.deepEqual(resolveCurriculumScope({ universityId: 'kau', yearId: 'ASU_Y1' }, catalogue), { universityId: 'kau' })
})

test('resolveCurriculumScope drops a module that does not belong to the chosen university/year', () => {
  assert.deepEqual(
    resolveCurriculumScope({ universityId: 'kau', yearId: 'KAU_Y1', moduleId: 'asu␟ASU_Y1␟CVS' }, catalogue),
    { universityId: 'kau', yearId: 'KAU_Y1' },
  )
})

test('resolveCurriculumScope keeps a fully valid scope untouched', () => {
  const scope = { universityId: 'kau', yearId: 'KAU_Y1', moduleId: 'kau␟KAU_Y1␟CVS' }
  assert.deepEqual(resolveCurriculumScope(scope, catalogue), scope)
})

test('resolveCurriculumScope clears everything when the university itself is unknown', () => {
  assert.deepEqual(resolveCurriculumScope({ universityId: 'ghost', yearId: 'X', moduleId: 'Y' }, catalogue), {})
})

test('clearCurriculumScopePart cascades: clearing a university clears the whole scope', () => {
  const scope = { universityId: 'kau', yearId: 'KAU_Y1', moduleId: 'kau␟KAU_Y1␟CVS' }
  assert.deepEqual(clearCurriculumScopePart(scope, 'universityId'), {})
})

test('clearCurriculumScopePart: clearing a year keeps the university but drops the module', () => {
  const scope = { universityId: 'kau', yearId: 'KAU_Y1', moduleId: 'kau␟KAU_Y1␟CVS' }
  assert.deepEqual(clearCurriculumScopePart(scope, 'yearId'), { universityId: 'kau' })
})

test('clearCurriculumScopePart: clearing a module keeps university and year', () => {
  const scope = { universityId: 'kau', yearId: 'KAU_Y1', moduleId: 'kau␟KAU_Y1␟CVS' }
  assert.deepEqual(clearCurriculumScopePart(scope, 'moduleId'), { universityId: 'kau', yearId: 'KAU_Y1' })
})

test('curriculumScopeChips renders each resolvable part, independently, in order', () => {
  const scope = { universityId: 'kau', yearId: 'KAU_Y1', moduleId: 'kau␟KAU_Y1␟CVS' }
  assert.deepEqual(curriculumScopeChips(scope, catalogue), [
    { part: 'universityId', label: 'Kasr Alainy' },
    { part: 'yearId', label: 'Year 1' },
    { part: 'moduleId', label: 'CVS — Cardiovascular' },
  ])
})

test('curriculumScopeChips omits a part that no longer resolves rather than showing a broken chip', () => {
  const scope = { universityId: 'kau', yearId: 'ASU_Y1' }
  assert.deepEqual(curriculumScopeChips(scope, catalogue), [{ part: 'universityId', label: 'Kasr Alainy' }])
})

test('curriculumScopeChips is empty with no university, even if a year/module id is set', () => {
  assert.deepEqual(curriculumScopeChips({ yearId: 'KAU_Y1' }, catalogue), [])
})

test('isCurriculumScopeEmpty', () => {
  assert.equal(isCurriculumScopeEmpty({}), true)
  assert.equal(isCurriculumScopeEmpty({ universityId: 'kau' }), false)
})
