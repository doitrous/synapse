import { test } from 'node:test'
import assert from 'node:assert/strict'
import { blockItem, isPast, itemMinutes, itemsOn, localDateTime, mergeUpcoming, nextUp } from './upcoming.ts'
import type { ScheduledSession } from './useStudentSchedule.ts'
import type { StudyBlock } from '@/data/studyBlocks'

function session(overrides: Partial<ScheduledSession> & { id: string; date: string; startTime: string }): ScheduledSession {
  const start = localDateTime(overrides.date, overrides.startTime)!
  return {
    id: overrides.id,
    date: overrides.date,
    startTime: overrides.startTime,
    endTime: overrides.endTime ?? '',
    title: overrides.title ?? '',
    type: overrides.type ?? 'lecture',
    topicIds: overrides.topicIds ?? [],
    courseId: 'c1',
    courseName: overrides.courseName ?? 'Cardiovascular System',
    start,
    end: overrides.endTime ? localDateTime(overrides.date, overrides.endTime) : null,
    label: overrides.label ?? 'Lecture',
    isExam: overrides.isExam ?? false,
    ...overrides,
  } as ScheduledSession
}

function block(overrides: Partial<StudyBlock> & { id: string; date: string; start: string; end: string }): StudyBlock {
  return {
    title: 'Revise the conduction system',
    subjectId: 'cvs',
    kind: 'Revision',
    ...overrides,
  }
}

test('a date and a time become a local moment, not a UTC one', () => {
  const moment = localDateTime('2026-08-17', '09:30')!
  assert.equal(moment.getFullYear(), 2026)
  assert.equal(moment.getMonth(), 7)
  assert.equal(moment.getDate(), 17)
  assert.equal(moment.getHours(), 9)
  assert.equal(moment.getMinutes(), 30)
})

test('a block with an unusable date is dropped rather than placed at the epoch', () => {
  assert.equal(blockItem(block({ id: 'b1', date: '', start: '09:00', end: '10:00' })), null)
})

test('both calendars come back as one list in time order', () => {
  const merged = mergeUpcoming(
    [session({ id: 's1', date: '2026-08-17', startTime: '11:00', endTime: '12:00', title: 'Heart failure' })],
    [
      block({ id: 'b1', date: '2026-08-17', start: '08:00', end: '09:00' }),
      block({ id: 'b2', date: '2026-08-17', start: '14:00', end: '15:00' }),
    ],
  )
  assert.deepEqual(merged.map((item) => item.title), [
    'Revise the conduction system',
    'Heart failure',
    'Revise the conduction system',
  ])
  assert.deepEqual(merged.map((item) => item.source), ['personal', 'faculty', 'personal'])
})

test('a block planned from a session does not appear beside the session it came from', () => {
  // "Add to plan" copies a session into the student's own blocks. Listing both
  // showed the same lecture twice and counted its hour twice.
  const merged = mergeUpcoming(
    [session({ id: 's1', date: '2026-08-17', startTime: '11:00', endTime: '12:00', title: 'Heart failure' })],
    [block({ id: 'b1', date: '2026-08-17', start: '11:00', end: '12:00', title: 'Heart failure', sourceSessionId: 's1' })],
  )
  assert.equal(merged.length, 1)
  assert.equal(merged[0].source, 'faculty')
})

test('a block planned from a session the timetable no longer has is kept', () => {
  // The session was cancelled or the year re-published. The student still
  // planned that hour, and deleting their block on their behalf is not ours.
  const merged = mergeUpcoming(
    [],
    [block({ id: 'b1', date: '2026-08-17', start: '11:00', end: '12:00', sourceSessionId: 'gone' })],
  )
  assert.equal(merged.length, 1)
  assert.equal(merged[0].source, 'personal')
})

test('what is next comes from whichever calendar has it', () => {
  const items = mergeUpcoming(
    [session({ id: 's1', date: '2026-08-17', startTime: '14:00', endTime: '15:00', title: 'Seminar' })],
    [block({ id: 'b1', date: '2026-08-17', start: '09:00', end: '10:00', title: 'Morning revision' })],
  )
  assert.equal(nextUp(items, new Date(2026, 7, 17, 8, 0))!.title, 'Morning revision')
  assert.equal(nextUp(items, new Date(2026, 7, 17, 11, 0))!.title, 'Seminar')
  assert.equal(nextUp(items, new Date(2026, 7, 17, 20, 0)), null)
})

test('what is happening now is what is next, until it has finished', () => {
  const items = mergeUpcoming([session({ id: 's1', date: '2026-08-17', startTime: '09:00', endTime: '10:00', title: 'Lecture' })], [])
  // Forty minutes in. Skipping to the next thing answers a question nobody
  // asked, and leaves the student looking at a card about tomorrow.
  assert.equal(nextUp(items, new Date(2026, 7, 17, 9, 40))!.title, 'Lecture')
  assert.equal(nextUp(items, new Date(2026, 7, 17, 10, 1)), null)
})

test('an untimed item is still to come until its start has passed', () => {
  const items = mergeUpcoming([session({ id: 's1', date: '2026-08-17', startTime: '17:00', title: 'Logbook due' })], [])
  assert.equal(nextUp(items, new Date(2026, 7, 17, 16, 0))!.title, 'Logbook due')
  assert.equal(nextUp(items, new Date(2026, 7, 17, 17, 1)), null)
  assert.equal(itemMinutes(items[0]), 0)
})

test('a day holds only its own items', () => {
  const items = mergeUpcoming(
    [session({ id: 's1', date: '2026-08-18', startTime: '09:00', endTime: '10:00', title: 'Tomorrow' })],
    [block({ id: 'b1', date: '2026-08-17', start: '09:00', end: '10:00', title: 'Today' })],
  )
  assert.deepEqual(itemsOn(items, new Date(2026, 7, 17)).map((item) => item.title), ['Today'])
  assert.deepEqual(itemsOn(items, new Date(2026, 7, 18)).map((item) => item.title), ['Tomorrow'])
})

test('an item is past only once it has finished', () => {
  const [item] = mergeUpcoming([session({ id: 's1', date: '2026-08-17', startTime: '09:00', endTime: '10:00' })], [])
  assert.equal(isPast(item, new Date(2026, 7, 17, 9, 59)), false)
  assert.equal(isPast(item, new Date(2026, 7, 17, 10, 1)), true)
  assert.equal(itemMinutes(item), 60)
})
