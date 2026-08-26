import test from 'node:test'
import assert from 'node:assert/strict'
import {
  ASSESSMENT_SCHEMES_KEY,
  CURRICULA_KEY,
  SCHEDULE_KEY,
  SUBJECTS_KEY,
  UNIVERSITY_KEY,
  academicPreview,
  studentUniversityProjection,
} from './academic.js'

const catalogue = [{
  id: 'hu',
  name: 'Helwan University',
  short: 'HU',
  region: 'Cairo',
  years: [
    { id: 'HU_Y1', year: 'Year 1', courses: [{ id: 'hu-y1-m1', name: 'Immutable', moduleId: 'HU-101' }] },
    { id: 'HU_Y2', year: 'Year 2', terms: ['Term 1'], courses: [{ id: 'hu-y2-m1', name: 'INH 201', moduleId: 'INH 201', term: 'Term 1' }] },
  ],
}]

test('student university projection returns only the caller cohort', () => {
  const out = studentUniversityProjection(
    { id: 'student-1', universityId: 'hu', year: 'Year 2', yearId: 'HU_Y2', study_group: 'A' },
    catalogue,
  )
  assert.equal(out.status, 'ready')
  assert.deepEqual(out.university, { id: 'hu', name: 'Helwan University', short: 'HU', region: 'Cairo' })
  assert.deepEqual(out.year, { id: 'HU_Y2', year: 'Year 2', active: true, terms: ['Term 1'] })
  assert.deepEqual(out.modules, [{ id: 'hu-y2-m1', name: 'INH 201', moduleId: 'INH 201', term: 'Term 1' }])
  assert.equal(out.terms[0].modules[0].id, 'hu-y2-m1')
})

test('student university projection is calm while a catalogue year is being verified', () => {
  const out = studentUniversityProjection({ id: 'student-1', universityId: 'hu', year: 'Year 4' }, catalogue)
  assert.equal(out.status, 'being_verified')
  assert.equal(out.year, null)
  assert.deepEqual(out.modules, [])
})

test('student projection includes exact assessment schemes and subject trees for the enrolled year only', () => {
  const docs = {
    [UNIVERSITY_KEY]: catalogue,
    [ASSESSMENT_SCHEMES_KEY]: {
      'hu:HU_Y2:hu-y2-m1': {
        declaredTotal: 36000,
        reconciliationStatus: 'exact',
        credits: 6,
        components: [
          { id: 'eom', label: 'EOM', kind: 'EOM', marks: 1250, subjectAllocations: [{ subjectId: 's1', label: 'Anatomy', marks: 1250 }] },
          { id: 'written', label: 'Final written', kind: 'final_written', marks: 34750 },
        ],
      },
      'hu:HU_Y1:hu-y1-m1': { declaredTotal: 99900, components: [] },
    },
    [SUBJECTS_KEY]: {
      'hu:HU_Y2:hu-y2-m1': [
        {
          id: 's1',
          name: 'Anatomy',
          evidenceState: 'verified',
          curriculum: { articleIds: ['ART-1'], conceptIds: ['CON-1'] },
          children: [
            { id: 's1-a', name: 'Neuroanatomy', curriculum: { questionIds: ['Q-1'] } },
            { id: 's1-draft', name: 'Draft topic', status: 'draft', curriculum: { articleIds: ['ART-DRAFT'] } },
          ],
        },
      ],
    },
  }
  const out = studentUniversityProjection({ id: 'student-1', universityId: 'hu', yearId: 'HU_Y2' }, docs)
  const module = out.terms[0].modules[0]
  assert.equal(module.assessment.declaredTotal, 360)
  assert.equal(module.assessment.componentTotal, 360)
  assert.equal(module.assessment.components[0].marks, 12.5)
  assert.equal(module.assessment.components[0].subjectAllocations[0].marks, 12.5)
  assert.equal(module.assessment.credits, 6)
  assert.equal(module.subjects[0].children.length, 1)
  assert.deepEqual(module.coverage.articleIds, ['ART-1'])
  assert.deepEqual(module.coverage.questionIds, ['Q-1'])
  assert.equal(out.modules.some((entry) => entry.id === 'hu-y1-m1'), false)
})

test('student projection keeps unknown and conflicted assessment totals unavailable', () => {
  const out = studentUniversityProjection({ id: 'student-1', universityId: 'hu', yearId: 'HU_Y2' }, {
    [UNIVERSITY_KEY]: catalogue,
    [ASSESSMENT_SCHEMES_KEY]: {
      'hu:HU_Y2:hu-y2-m1': { reconciliationStatus: 'conflicted', declaredTotal: 36000, components: [{ id: 'x', marks: 36000 }] },
    },
  })
  assert.equal(out.terms[0].modules[0].assessment.displayTotal, 'unavailable')
  assert.deepEqual(out.terms[0].modules[0].assessment.components, [])
})

test('student projection scopes schedules, separates link ids, and labels inferred carry-forward rows', () => {
  const out = studentUniversityProjection({ id: 'student-1', universityId: 'hu', yearId: 'HU_Y2' }, {
    [UNIVERSITY_KEY]: catalogue,
    [CURRICULA_KEY]: {
      'hu:HU_Y2:hu-y2-m1': { articleIds: ['ART-M'], practicalIds: ['P-1'] },
    },
    [SCHEDULE_KEY]: {
      'hu:HU_Y2:hu-y2-m1': [
        {
          id: 'row-1',
          type: 'lecture',
          title: 'Safe row',
          date: '2026-12-15',
          topicIds: ['ART-2', 'CON-2', 'TOP-2'],
          subjectId: 's1',
          carriedForward: true,
          carriedForwardFrom: 'row-2025',
          evidenceState: 'inferred',
        },
        { id: 'row-draft', status: 'draft', date: '2026-12-16', topicIds: ['ART-DRAFT'] },
        { id: 'row-conflict', evidenceState: 'conflicted', date: '2026-12-17', topicIds: ['ART-CONFLICT'] },
      ],
    },
  })
  const module = out.terms[0].modules[0]
  assert.equal(module.schedule.length, 1)
  assert.equal(module.schedule[0].links.subjectId, 's1')
  assert.deepEqual(module.schedule[0].links.articleIds, ['ART-2'])
  assert.deepEqual(module.schedule[0].links.conceptIds, ['CON-2'])
  assert.deepEqual(module.schedule[0].links.topicNodeIds, ['TOP-2'])
  assert.deepEqual(module.schedule[0].labels, ['inferred', 'carried-forward'])
  assert.deepEqual(module.coverage.articleIds, ['ART-M'])
})

test('student projection hides draft/conflicted curriculum selections from coverage', () => {
  const out = studentUniversityProjection({ id: 'student-1', universityId: 'hu', yearId: 'HU_Y2' }, {
    [UNIVERSITY_KEY]: catalogue,
    [CURRICULA_KEY]: {
      'hu:HU_Y2:hu-y2-m1': { status: 'draft', articleIds: ['ART-DRAFT'] },
    },
    [SUBJECTS_KEY]: {
      'hu:HU_Y2:hu-y2-m1': [{ id: 's1', name: 'Safe', curriculum: { articleIds: ['ART-SAFE'] } }],
    },
  })
  assert.deepEqual(out.terms[0].modules[0].coverage.articleIds, ['ART-SAFE'])
})

test('academic preview refuses Helwan Year 1 catalogue changes', () => {
  const base = { [UNIVERSITY_KEY]: catalogue }
  const next = {
    [UNIVERSITY_KEY]: [{
      ...catalogue[0],
      years: [{ ...catalogue[0].years[0], courses: [] }, catalogue[0].years[1]],
    }],
  }
  const preview = academicPreview(base, { ...base, ...next })
  assert.equal(preview.ok, false)
  assert.equal(preview.protectionViolations[0].scope, 'HU_Y1')
})

test('academic preview refuses batches that mention protected Helwan Year 1 slices', () => {
  const base = { [UNIVERSITY_KEY]: catalogue, [SUBJECTS_KEY]: {} }
  const preview = academicPreview(base, {
    ...base,
    [SUBJECTS_KEY]: { 'hu:HU_Y1:hu-y1-m1': [] },
  })
  assert.equal(preview.ok, false)
  assert.equal(preview.protectionViolations[0].key, SUBJECTS_KEY)
})

test('academic preview permits other years to change while an existing Helwan Year 1 slice stays identical', () => {
  const protectedSubjects = [{ id: 'hu-y1-anatomy', name: 'Protected anatomy' }]
  const base = {
    [UNIVERSITY_KEY]: catalogue,
    [SUBJECTS_KEY]: { 'hu:HU_Y1:hu-y1-m1': protectedSubjects },
  }
  const preview = academicPreview(base, {
    ...base,
    [SUBJECTS_KEY]: {
      ...base[SUBJECTS_KEY],
      'must:MUST_Y1:must-y1-m1': [{ id: 'must-y1-anatomy', name: 'Anatomy' }],
    },
  })
  assert.equal(preview.ok, true)
  assert.deepEqual(preview.protectionViolations, [])
})

test('academic preview permits a new non-protected store when the live key does not exist yet', () => {
  const base = { [UNIVERSITY_KEY]: catalogue, [ASSESSMENT_SCHEMES_KEY]: null }
  const preview = academicPreview(base, {
    ...base,
    [ASSESSMENT_SCHEMES_KEY]: {
      'must:MUST_Y1:must-y1-m1': { declaredTotal: 10000, components: [{ id: 'final', marks: 10000 }] },
    },
  })
  assert.equal(preview.ok, true)
  assert.deepEqual(preview.protectionViolations, [])
})

test('academic preview validates expected document shapes', () => {
  const preview = academicPreview({}, { [UNIVERSITY_KEY]: {}, [CURRICULA_KEY]: [] })
  assert.equal(preview.ok, false)
  assert.deepEqual(preview.validationErrors.map((error) => error.key), [UNIVERSITY_KEY, CURRICULA_KEY])
})
