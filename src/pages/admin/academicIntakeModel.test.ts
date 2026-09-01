import assert from 'node:assert/strict'
import test from 'node:test'
import {
  ASSESSMENT_SCHEMES_KEY,
  PROVENANCE_KEY,
  SCHEDULE_KEY,
  SUBJECTS_KEY,
  UNIVERSITY_KEY,
  buildStagedAcademicDocuments,
  hasExpectedVersions,
  parseAcademicIntakePackage,
  type AcademicIntakePackage,
  type CurrentAcademicDocuments,
} from './academicIntakeModel.ts'
import type { University } from '../../data/universities.ts'

const currentUniversity: University = {
  id: 'hu',
  name: 'Helwan University',
  short: 'HU',
  region: 'Helwan',
  years: [
    { id: 'HU_Y1', year: 'Year 1', students: 99, terms: ['Term 1'], courses: [{ id: 'hu-y1-bms', name: 'BMS 101', block: 'Term 1', moduleId: 'BMS 101', term: 'Term 1' }] },
    { id: 'HU_Y2', year: 'Year 2', students: 0, terms: ['Old'], courses: [{ id: 'old-inh', name: 'Old INH', block: 'Old', moduleId: 'OLD 201', term: 'Old' }] },
    { id: 'HU_Y4', year: 'Year 4', students: 12, terms: ['Term 1'], courses: [{ id: 'hu-y4-med', name: 'Medicine', block: 'Term 1', moduleId: 'MED 401', term: 'Term 1' }] },
  ],
}

const current: CurrentAcademicDocuments = {
  universities: [currentUniversity],
  curricula: { 'hu:HU_Y4:hu-y4-med': { articleIds: ['a'], questionIds: [], practicalIds: [] } },
  schedules: { 'hu:HU_Y4:hu-y4-med': [] },
  subjects: { 'hu:HU_Y1:hu-y1-bms': [] },
  provenance: { previous: { ok: true } },
  assessmentSchemes: { 'hu:HU_Y4:hu-y4-med': { declaredTotal: 1000, components: [{ id: 'c', label: 'Quiz', kind: 'quiz', marks: 1000 }] } },
}

const pkg: AcademicIntakePackage = {
  schemaVersion: 1,
  id: 'academic-intake-test',
  generatedAt: '2026-08-26T00:00:00.000Z',
  catalogue: [{
    id: 'hu',
    name: 'Helwan University',
    short: 'HU',
    region: 'Helwan',
    years: [
      { id: 'HU_Y1', year: 'Year 1', students: 1, terms: ['Nope'], courses: [{ id: 'bad', name: 'Bad', block: 'Nope', moduleId: 'BAD', term: 'Nope' }] },
      { id: 'HU_Y2', year: 'Year 2', students: 20, terms: ['Term 1'], courses: [{ id: 'hu-y2-inh', name: 'INH 201', block: 'Term 1', moduleId: 'INH 201', term: 'Term 1' }] },
      { id: 'HU_Y3', year: 'Year 3', students: 21, terms: ['Term 1'], courses: [{ id: 'hu-y3-ftf', name: 'FTF 304', block: 'Term 1', moduleId: 'FTF 304', term: 'Term 1' }] },
    ],
  }],
  moduleSubjects: {
    'hu:HU_Y1:bad': [],
    'hu:HU_Y2:hu-y2-inh': [{
      id: 'micro',
      name: 'Microbiology',
      marks: { writtenEndOfModule: 31, writtenEndOfYear: 15, practicalEndOfModule: 0, practicalEndOfYear: 0 },
      curriculum: { articleIds: [], questionIds: [], practicalIds: [], topicNodeIds: [], conceptIds: [], resourceIds: [] },
    }],
    'hu:HU_Y3:hu-y3-ftf': [],
  },
  assessmentSchemes: {
    'hu:HU_Y2:hu-y2-inh': {
      declaredTotal: 4600,
      components: [
        { id: 'quiz', label: 'Quiz', kind: 'quiz', marks: 3100 },
        { id: 'final', label: 'Final written', kind: 'final-written', marks: 1500 },
      ],
    },
    'hu:HU_Y3:hu-y3-ftf': {
      declaredTotal: 6000,
      components: [{ id: 'quiz', label: 'Quiz', kind: 'quiz', marks: 5000 }],
    },
  },
  sourceRefs: [
    { id: 'src-y2', originalPath: '/Users/doitrous/Desktop/helwan/Year 2/file.pdf', sha256: 'a', documentType: 'pdf', universityId: 'hu', yearId: 'HU_Y2', category: 'official-plan', evidenceRole: 'structure', evidenceState: 'verified', confidence: 1 },
    { id: 'src-y1', originalPath: '/Users/doitrous/Desktop/helwan/Year 1/file.pdf', sha256: 'b', documentType: 'pdf', universityId: 'hu', yearId: 'HU_Y1', category: 'official-plan', evidenceRole: 'structure', evidenceState: 'verified', confidence: 1 },
  ],
  conflicts: [],
  warnings: ['review schedule candidate wording'],
}

test('package parser rejects invalid JSON and accepts generated contract shape', () => {
  assert.equal(parseAcademicIntakePackage('{').ok, false)
  const parsed = parseAcademicIntakePackage(JSON.stringify(pkg))
  assert.equal(parsed.ok, true)
  assert.equal(parsed.package?.id, 'academic-intake-test')
})

test('selected university wave preserves unsupported years and excludes HU_Y1', () => {
  const staged = buildStagedAcademicDocuments(pkg, current, 'hu', ['HU_Y2'])
  const hu = staged.documents[UNIVERSITY_KEY].find((university) => university.id === 'hu')
  assert.ok(hu)
  assert.equal(hu.years.find((year) => year.id === 'HU_Y1')?.courses[0].id, 'hu-y1-bms')
  assert.equal(hu.years.find((year) => year.id === 'HU_Y2')?.courses[0].id, 'hu-y2-inh')
  assert.equal(hu.years.find((year) => year.id === 'HU_Y4')?.courses[0].id, 'hu-y4-med')
  assert.deepEqual(Object.keys(staged.documents[SUBJECTS_KEY]).sort(), ['hu:HU_Y1:hu-y1-bms', 'hu:HU_Y2:hu-y2-inh'])
  assert.deepEqual(Object.keys(staged.documents[ASSESSMENT_SCHEMES_KEY]).sort(), ['hu:HU_Y2:hu-y2-inh', 'hu:HU_Y4:hu-y4-med'])
  assert.equal((staged.documents[PROVENANCE_KEY]['academic-intake-test:hu:HU_Y2'] as { sourceRefs: unknown[] }).sourceRefs.length, 1)
})

test('each university wave keeps a distinct provenance placement', () => {
  const first = buildStagedAcademicDocuments(pkg, current, 'hu', ['HU_Y2'])
  const second = buildStagedAcademicDocuments(pkg, { ...current, provenance: first.documents[PROVENANCE_KEY] }, 'hu', ['HU_Y3'])
  assert.deepEqual(Object.keys(second.documents[PROVENANCE_KEY]).sort(), [
    'academic-intake-test:hu:HU_Y2',
    'academic-intake-test:hu:HU_Y3',
    'previous',
  ])
})

test('HU_Y1 selection blocks while conflicted marks are quarantined', () => {
  const protectedStage = buildStagedAcademicDocuments(pkg, current, 'hu', ['HU_Y1'])
  assert.ok(protectedStage.blockingReasons.some((reason) => reason.includes('HU_Y1')))

  const staged = buildStagedAcademicDocuments(pkg, current, 'hu', ['HU_Y3'])
  assert.equal(staged.markReconciliation[0].status, 'conflicted')
  assert.equal(Object.hasOwn(staged.documents[ASSESSMENT_SCHEMES_KEY], 'hu:HU_Y3:hu-y3-ftf'), false)
  assert.ok(staged.warnings.some((warning) => warning.includes('quarantined')))
})

test('a wave preserves existing schedule and mark keys that the evidence package does not replace', () => {
  const currentWithExistingEvidence: CurrentAcademicDocuments = {
    ...current,
    schedules: {
      ...current.schedules,
      'hu:HU_Y2:old-inh': [{ id: 'existing', type: 'lecture', title: 'Existing verified lecture', date: '2026-09-01' }],
    },
    assessmentSchemes: {
      ...current.assessmentSchemes,
      'hu:HU_Y2:legacy-elective': { declaredTotal: 1000, components: [{ id: 'final', label: 'Final', kind: 'final_written', marks: 1000 }] },
    },
  }
  const staged = buildStagedAcademicDocuments(pkg, currentWithExistingEvidence, 'hu', ['HU_Y2'])
  assert.equal(staged.documents[SCHEDULE_KEY]['hu:HU_Y2:old-inh'][0].id, 'existing')
  assert.equal(Object.hasOwn(staged.documents[ASSESSMENT_SCHEMES_KEY], 'hu:HU_Y2:legacy-elective'), true)
})

test('six expected versions are required before publish', () => {
  assert.equal(hasExpectedVersions(null), false)
  assert.equal(hasExpectedVersions({
    ok: true,
    changedKeys: [],
    validationErrors: [],
    protectionViolations: [],
    fingerprints: {},
    versions: {
      'nishany-academic-universities-v1': 1,
      'nishany-course-curricula-v1': 1,
      'nishany-module-schedules-v1': 1,
      'nishany-module-subjects-v1': 1,
      'nishany-academic-source-provenance-v1': 1,
    },
  }), false)
  assert.equal(hasExpectedVersions({
    ok: true,
    changedKeys: [],
    validationErrors: [],
    protectionViolations: [],
    fingerprints: {},
    versions: {
      'nishany-academic-universities-v1': 1,
      'nishany-course-curricula-v1': 1,
      'nishany-module-schedules-v1': 1,
      'nishany-module-subjects-v1': 1,
      'nishany-academic-source-provenance-v1': 1,
      'nishany-assessment-schemes-v1': null,
    },
  }), true)
})
