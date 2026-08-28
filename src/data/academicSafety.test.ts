import test from 'node:test'
import assert from 'node:assert/strict'
import { assertNoProtectedAcademicTargets, assertNoProtectedSourceRefs, isProtectedHelwanYearOnePath } from './academicSafety.ts'

test('Helwan Year 1 catalogue and source targets are rejected before mutation', () => {
  const check = assertNoProtectedAcademicTargets([
    { universityId: 'hu', yearId: 'HU_Y2', moduleId: 'HU_Y2-INH' },
    { universityId: 'hu', yearId: 'HU_Y1', moduleId: 'HU_Y1-FOUNDATION' },
    { sourcePath: 'corpus/01-explicitly-taught/3. Helwan Uni/Year 1/schedule.pdf' },
  ])
  assert.equal(check.ok, false)
  assert.equal(check.violations.length, 2)
})

test('the real Helwan Year 1 desktop source root is protected case-insensitively', () => {
  assert.equal(isProtectedHelwanYearOnePath('/Users/doitrous/Desktop/helwan/Year 1/schedule.pdf'), true)
  assert.equal(isProtectedHelwanYearOnePath('Desktop/helwan/Year 1/schedule.pdf'), true)
  assert.equal(isProtectedHelwanYearOnePath('helwan/HU_Y1/marks.pdf'), true)
  assert.equal(isProtectedHelwanYearOnePath('corpus/01-explicitly-taught/3. Helwan Uni/Y1/file.pdf'), true)
})

test('Helwan Year 2 and other universities pass the protection check', () => {
  const check = assertNoProtectedAcademicTargets([
    { universityId: 'hu', yearId: 'HU_Y2', moduleId: 'INH 201' },
    { sourcePath: '/Users/doitrous/Desktop/helwan/Year 2/schedule.pdf' },
    { sourcePath: 'Desktop/helwan/Year 3/schedule.pdf' },
    { universityId: 'kau', yearId: 'KAU_Y1', sourcePath: 'corpus/1. Kasr Alainy Books/Y1.pdf' },
  ])
  assert.equal(check.ok, true)
  assert.deepEqual(check.violations, [])
})

test('protected source refs are detected through provenance', () => {
  const check = assertNoProtectedSourceRefs([{
    id: 'src-hu-y1',
    originalPath: 'corpus/01-explicitly-taught/3. Helwan Uni/HU_Y1/marks.pdf',
    sha256: 'abc',
    documentType: 'pdf',
    universityId: 'hu',
    yearId: 'HU_Y1',
    category: 'mark-distribution',
    evidenceRole: 'marks',
    evidenceState: 'verified',
    confidence: 1,
  }])
  assert.equal(check.ok, false)
})
