import { test } from 'node:test'
import assert from 'node:assert/strict'
import { flattenSchedule, nextExam, sessionMinutes } from './studentSchedule.ts'
import { emptyModuleScheduleBlock, type ModuleScheduleBlock, type ModuleScheduleBlockType, type ModuleScheduleStore } from '../data/moduleSchedule.ts'
import type { UniYear, University } from '../data/universities.ts'

/**
 * A year whose ID and label differ — which is every real year, and the whole
 * point: keying on the label found nothing the console had ever written.
 */
const YEAR: UniYear = {
  id: 'KAU_Y1',
  year: 'Year 1',
  students: 0,
  courses: [
    { id: 'imp-1786976158706-0', name: 'Cardiovascular System', block: 'Block 1' },
    { id: 'imp-1786976158706-1', name: 'Respiratory System', block: 'Block 1' },
  ],
}

const UNI: University = { id: 'kau', name: 'King Abdulaziz University', short: 'KAU', region: 'Jeddah', years: [YEAR] }

const CVS = YEAR.courses[0].id

function block(overrides: Partial<ModuleScheduleBlock> & { date: string }): ModuleScheduleBlock {
  const type: ModuleScheduleBlockType = overrides.type ?? 'lecture'
  return { ...emptyModuleScheduleBlock(overrides.date, type), ...overrides, type }
}

/** The key the admin console actually writes, as seen in production data. */
function byId(courseId: string, blocks: ModuleScheduleBlock[]): ModuleScheduleStore {
  return { [`kau:KAU_Y1:${courseId}`]: blocks }
}

test('a timetable is found under the year ID the console actually writes', () => {
  // The regression this guards: the reader built the key from the year's label
  // ("Year 1") while the console writes its ID ("KAU_Y1"), so every published
  // timetable came back empty for the student it was published for.
  const sessions = flattenSchedule(UNI, YEAR, byId(CVS, [block({ date: '2026-09-10', title: 'Heart failure' })]))

  assert.equal(sessions.length, 1)
  assert.equal(sessions[0].title, 'Heart failure')
  assert.equal(sessions[0].courseName, 'Cardiovascular System')
  assert.equal(sessions[0].label, 'Lecture')
})

test('a timetable published before years grew IDs is still read under the label', () => {
  const sessions = flattenSchedule(UNI, YEAR, { [`kau:Year 1:${CVS}`]: [block({ date: '2026-09-10' })] })
  assert.equal(sessions.length, 1)
})

test('the ID wins when a module has blocks under both forms', () => {
  // Current data beats data left behind by the migration, never the other way.
  const sessions = flattenSchedule(UNI, YEAR, {
    [`kau:KAU_Y1:${CVS}`]: [block({ date: '2026-09-10', title: 'Published' })],
    [`kau:Year 1:${CVS}`]: [block({ date: '2026-09-11', title: 'Stale' })],
  })
  assert.deepEqual(sessions.map((session) => session.title), ['Published'])
})

test('every module in the year lands on one list, in time order', () => {
  const sessions = flattenSchedule(UNI, YEAR, {
    [`kau:KAU_Y1:${CVS}`]: [block({ date: '2026-09-11', startTime: '09:00', title: 'Second' })],
    [`kau:KAU_Y1:${YEAR.courses[1].id}`]: [
      block({ date: '2026-09-10', startTime: '14:00', title: 'First' }),
      block({ date: '2026-09-11', startTime: '11:00', title: 'Third' }),
    ],
  })
  assert.deepEqual(sessions.map((session) => session.title), ['First', 'Second', 'Third'])
})

test('another year of the same university is not this student\'s timetable', () => {
  const other = { ...YEAR, id: 'KAU_Y2', year: 'Year 2' }
  assert.deepEqual(flattenSchedule(UNI, other, byId(CVS, [block({ date: '2026-09-10' })])), [])
})

test('a block is read in the student\'s own time zone, never as UTC', () => {
  const [session] = flattenSchedule(UNI, YEAR, byId(CVS, [block({ date: '2026-09-10', startTime: '09:00', endTime: '11:00' })]))
  assert.equal(session.start.getFullYear(), 2026)
  assert.equal(session.start.getMonth(), 8)
  assert.equal(session.start.getDate(), 10)
  assert.equal(session.start.getHours(), 9)
  assert.equal(sessionMinutes(session), 120)
})

test('a logbook task is a deadline rather than a sitting', () => {
  const [session] = flattenSchedule(UNI, YEAR, byId(CVS, [block({ date: '2026-09-10', type: 'logbook' })]))
  assert.equal(session.end, null)
  assert.equal(sessionMinutes(session), 0)
  assert.equal(session.isExam, false)
})

test('a block with an unusable date is dropped rather than placed at the epoch', () => {
  assert.deepEqual(flattenSchedule(UNI, YEAR, byId(CVS, [block({ date: '' })])), [])
})

test('a year with nothing published is empty rather than invented', () => {
  assert.deepEqual(flattenSchedule(UNI, YEAR, {}), [])
})

test('the exam horizon the adaptive planner needs comes back from a published final', () => {
  // With the key wrong this was null forever, which silently disabled the exam
  // horizon: every student got the no-exam allocation and no readiness mock.
  const sessions = flattenSchedule(UNI, YEAR, byId(CVS, [
    block({ date: '2026-09-10', title: 'Revision', type: 'review' }),
    block({ date: '2026-09-28', startTime: '09:00', title: 'CVS final', type: 'final' }),
  ]))
  const upcoming = nextExam(sessions, new Date(2026, 7, 20, 15, 0))

  assert.notEqual(upcoming, null)
  assert.equal(upcoming!.session.title, 'CVS final')
  assert.equal(upcoming!.daysAway, 39)
})

test('an exam that has already been sat is not the next exam', () => {
  const sessions = flattenSchedule(UNI, YEAR, byId(CVS, [block({ date: '2026-08-10', type: 'final' })]))
  assert.equal(nextExam(sessions, new Date(2026, 7, 20)), null)
})
