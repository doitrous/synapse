import assert from 'node:assert/strict'
import test from 'node:test'
import {
  DEFAULT_GROUP_ID,
  EMPTY_TASKS,
  addGroup,
  addSubtask,
  addTask,
  removeGroup,
  scheduleLabel,
  shiftDay,
  sortTasks,
  taskProgress,
  tasksForDay,
  toggleSubtask,
  toggleTask,
  updateTask,
} from './tasks.ts'

const now = new Date('2026-09-02T09:00:00')

test('scheduleLabel reads a date against today', () => {
  assert.equal(scheduleLabel({ date: '2026-09-02', done: false }, '2026-09-02'), 'Today')
  assert.equal(scheduleLabel({ date: '2026-09-03', done: false }, '2026-09-02'), 'Tomorrow')
  assert.equal(scheduleLabel({ date: '2026-09-01', done: false }, '2026-09-02'), 'Overdue')
  assert.equal(scheduleLabel({ date: '2026-09-01', done: true }, '2026-09-02'), null)
  assert.equal(scheduleLabel({ date: '2026-09-20', done: false }, '2026-09-02'), null)
  assert.equal(scheduleLabel({ done: false }, '2026-09-02'), null)
})

test('shiftDay crosses month ends', () => {
  assert.equal(shiftDay('2026-09-30', 1), '2026-10-01')
  assert.equal(shiftDay('2026-03-01', -1), '2026-02-28')
})

test('adding a task creates the default group lazily and drops a time without a date', () => {
  const { doc, id } = addTask(EMPTY_TASKS, { title: '  Read heart failure  ', time: '09:00' }, now)
  assert.equal(doc.groups[0].id, DEFAULT_GROUP_ID)
  assert.equal(doc.tasks.length, 1)
  assert.equal(doc.tasks[0].id, id)
  assert.equal(doc.tasks[0].title, 'Read heart failure')
  assert.equal(doc.tasks[0].groupId, DEFAULT_GROUP_ID)
  assert.equal(doc.tasks[0].time, undefined)
  assert.equal(addTask(EMPTY_TASKS, { title: '   ' }, now).doc.tasks.length, 0)
})

test('removing a group moves its tasks to the default group', () => {
  const grouped = addGroup(EMPTY_TASKS, 'Cardiology', now)
  const withTask = addTask(grouped.doc, { groupId: grouped.id, title: 'ECG basics' }, now).doc
  const after = removeGroup(withTask, grouped.id, now)
  assert.equal(after.groups.length, 1)
  assert.equal(after.tasks[0].groupId, DEFAULT_GROUP_ID)
  assert.equal(removeGroup(after, DEFAULT_GROUP_ID, now), after)
})

test('subtasks complete the task when all are ticked and reopen it when one is unticked', () => {
  let doc = addTask(EMPTY_TASKS, { title: 'OSCE prep' }, now).doc
  const taskId = doc.tasks[0].id
  doc = addSubtask(doc, taskId, 'Hand wash', now)
  doc = addSubtask(doc, taskId, 'Introduce self', now)
  const [a, b] = doc.tasks[0].subtasks.map((sub) => sub.id)
  doc = toggleSubtask(doc, taskId, a, now)
  assert.deepEqual(taskProgress(doc.tasks[0]), { done: 1, total: 2 })
  assert.equal(doc.tasks[0].done, false)
  doc = toggleSubtask(doc, taskId, b, now)
  assert.equal(doc.tasks[0].done, true)
  doc = toggleSubtask(doc, taskId, a, now)
  assert.equal(doc.tasks[0].done, false)
  doc = toggleTask(doc, taskId, now)
  assert.ok(doc.tasks[0].subtasks.every((sub) => sub.done))
})

test('updateTask clears the time when the date is cleared and keeps an unknown group', () => {
  let doc = addTask(EMPTY_TASKS, { title: 'Renal lecture', date: '2026-09-05', time: '10:00' }, now).doc
  const id = doc.tasks[0].id
  doc = updateTask(doc, id, { date: '' }, now)
  assert.equal(doc.tasks[0].date, undefined)
  assert.equal(doc.tasks[0].time, undefined)
  doc = updateTask(doc, id, { groupId: 'nope' }, now)
  assert.equal(doc.tasks[0].groupId, DEFAULT_GROUP_ID)
})

test('tasksForDay and sortTasks keep schedule order when a task is completed', () => {
  let doc = addTask(EMPTY_TASKS, { title: 'Late', date: '2026-09-05', time: '14:00' }, now).doc
  doc = addTask(doc, { title: 'Early', date: '2026-09-05', time: '08:00' }, new Date(now.getTime() + 1000)).doc
  doc = addTask(doc, { title: 'Undated' }, new Date(now.getTime() + 2000)).doc
  assert.deepEqual(tasksForDay(doc, '2026-09-05').map((task) => task.title), ['Early', 'Late'])
  doc = toggleTask(doc, doc.tasks[1].id, now)
  assert.deepEqual(sortTasks(doc.tasks).map((task) => task.title), ['Early', 'Late', 'Undated'])
})

test('completing the last subtask and reopening a task preserve its list position', () => {
  let doc = addTask(EMPTY_TASKS, { title: 'First task' }, now).doc
  const first = doc.tasks[0].id
  doc = addSubtask(doc, first, 'Final step', now)
  doc = addTask(doc, { title: 'Second task' }, new Date(now.getTime() + 1000)).doc
  const order = sortTasks(doc.tasks).map((task) => task.id)
  doc = toggleSubtask(doc, first, doc.tasks[0].subtasks[0].id, now)
  assert.equal(doc.tasks[0].done, true)
  assert.deepEqual(sortTasks(doc.tasks).map((task) => task.id), order)
  doc = toggleTask(doc, first, now)
  assert.equal(doc.tasks[0].done, false)
  assert.deepEqual(sortTasks(doc.tasks).map((task) => task.id), order)
})
