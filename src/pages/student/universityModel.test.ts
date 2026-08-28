import assert from 'node:assert/strict'
import test from 'node:test'
import { markAmount } from '../../data/assessmentScheme.ts'
import type { ModuleScheduleStore } from '../../data/moduleSchedule.ts'
import type { ModuleSubjectStore } from '../../data/moduleSubjects.ts'
import type { University } from '../../data/universities.ts'
import {
  buildDemoStudentUniversityProjection,
  normalizeStudentUniversityProjection,
  type StudentUniversityProjection,
} from './universityModel.ts'

const now = new Date('2026-08-26T12:00:00')

test('live projection normalizes only the authenticated cohort and keeps unavailable totals honest', () => {
  const projection: StudentUniversityProjection = {
    profile: { studentId: 's1', universityId: 'hu', year: 'Year 2', yearId: 'HU_Y2', group: 'A' },
    university: { id: 'hu', name: 'Helwan University', short: 'HU', region: 'Cairo' },
    year: { id: 'HU_Y2', year: 'Year 2', active: true, terms: ['Term 1'] },
    status: 'ready',
    terms: [{
      term: 'Term 1',
      modules: [
        {
          id: 'inh',
          name: 'INH 201',
          moduleId: 'INH 201',
          term: 'Term 1',
          labels: ['verified'],
          assessment: {
            status: 'exact',
            declaredTotal: 360,
            componentTotal: 360,
            total: 360,
            displayTotal: 360,
            credits: 6,
            components: [{ id: 'written', label: 'Final written', kind: 'final-written', marks: 347.5 }],
          },
          subjects: [{ id: 's1', name: 'Anatomy', labels: ['verified'], coverage: { articleIds: ['ART-1'] }, children: [{ id: 's1-a', name: 'Neuroanatomy', children: [] }] }],
          schedule: [{ id: 'row-1', type: 'lecture', title: 'Safe row', date: '2026-12-15', startTime: '09:00', endTime: '10:00', labels: ['inferred', 'carried-forward'], links: { articleIds: ['ART-2'], conceptIds: ['CON-2'] } }],
          coverage: { counts: { articleIds: 2, conceptIds: 1 } },
        },
        {
          id: 'crs',
          name: 'CRS 204',
          moduleId: 'CRS 204',
          term: 'Term 1',
          assessment: { status: 'partial', displayTotal: 'unavailable', components: [] },
          subjects: [],
          schedule: [],
          coverage: {},
        },
      ],
    }],
    modules: [
      { id: 'inh', name: 'INH 201', moduleId: 'INH 201', term: 'Term 1' },
      { id: 'crs', name: 'CRS 204', moduleId: 'CRS 204', term: 'Term 1' },
    ],
  }

  const map = normalizeStudentUniversityProjection(projection, now)
  assert.equal(map.university?.id, 'hu')
  assert.equal(map.year?.id, 'HU_Y2')
  assert.equal(map.modules.length, 2)
  assert.equal(map.modules[0].assessment.displayTotal, '360')
  assert.equal(map.modules[0].assessment.components[0].displayMarks, '347.5')
  assert.equal(map.modules[0].schedule[0].linkCount, 2)
  assert.deepEqual(map.modules[0].badges, ['verified', 'carried-forward', 'inferred'])
  assert.equal(map.modules[1].assessment.displayTotal, 'unavailable')
  assert.deepEqual(map.modules[1].badges, ['needs-marks', 'needs-schedule'])
  assert.equal(map.totals.marks, 360)
  assert.equal(map.totals.marksUnavailable, true)
})

test('being-verified projection stays empty without inventing a catalogue year', () => {
  const map = normalizeStudentUniversityProjection({
    profile: { studentId: 's1', universityId: 'hu', year: 'Year 4', yearId: null, group: null },
    university: { id: 'hu', name: 'Helwan University', short: 'HU', region: 'Cairo' },
    year: null,
    terms: [],
    modules: [],
    status: 'being_verified',
  }, now)
  assert.equal(map.status, 'being_verified')
  assert.equal(map.year, null)
  assert.deepEqual(map.modules, [])
})

test('demo projection uses local stores but preserves flexible schemes and schedule labels', () => {
  const university: University = {
    id: 'hu',
    name: 'Helwan University',
    short: 'HU',
    region: 'Cairo',
    years: [{
      id: 'HU_Y2',
      year: 'Year 2',
      students: 0,
      terms: ['Term 1'],
      courses: [
        { id: 'inh', name: 'INH 201', block: 'Term 1', moduleId: 'INH 201', term: 'Term 1' },
        { id: 'crs', name: 'CRS 204', block: 'Term 1', moduleId: 'CRS 204', term: 'Term 1' },
      ],
    }],
  }
  const subjects: ModuleSubjectStore = {
    'hu:HU_Y2:inh': [{
      id: 'micro',
      name: 'Microbiology',
      marks: { writtenEndOfModule: 31, writtenEndOfYear: 15, practicalEndOfModule: 0, practicalEndOfYear: 0 },
      curriculum: { articleIds: ['ART-1'], questionIds: [], practicalIds: [], topicNodeIds: [], conceptIds: [], resourceIds: [] },
    }],
  }
  const schedules: ModuleScheduleStore = {
    'hu:HU_Y2:inh': [{
      id: 'old',
      type: 'lecture',
      title: 'Intro',
      date: '2026-01-01',
      startTime: '09:00',
      endTime: '10:00',
      location: '',
      moduleNumber: '',
      topicIds: ['ART-2'],
      notes: '',
      automaticQuestions: true,
      automaticPracticals: true,
      automaticQuestionIds: [],
      automaticPracticalIds: [],
      manualQuestionIds: [],
      manualPracticalIds: [],
      completed: false,
      carryForward: { sourceDate: '2025-01-01', sourceCycle: '2025', carriedForwardFrom: 'old-2025', targetCycle: '2026' },
      provenance: { evidenceState: 'inferred', sourceRefs: [] },
    }],
  }
  const projection = buildDemoStudentUniversityProjection(university, university.years[0], subjects, schedules, {
    'hu:HU_Y2:inh': {
      declaredTotal: markAmount(100) ?? undefined,
      reconciliationStatus: 'exact',
      components: [{ id: 'eom', label: 'EOM', kind: 'eom', marks: markAmount(100) ?? 0 }],
    },
  })
  const map = normalizeStudentUniversityProjection(projection, now)
  assert.equal(map.modules[0].assessment.displayTotal, '100')
  assert.equal(map.modules[0].schedule[0].labels.includes('carried-forward'), true)
  assert.equal(map.modules[0].schedule[0].labels.includes('inferred'), true)
  assert.equal(map.modules[0].schedule[0].linkCount, 1)
  assert.equal(map.modules[1].assessment.displayTotal, 'unavailable')
})
