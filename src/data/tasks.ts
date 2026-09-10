/**
 * The student's to-do list, kept beside the calendar.
 *
 * A task is lighter than a study block: it has no duration, may have no date
 * at all, and can carry a checklist of subtasks. Blocks stay what they are
 * (planned time on the grid); tasks are what the student still owes — and a
 * dated task shows up on the grid as a dot so the two read as one plan.
 *
 * Pure functions here; `useTasks` in `src/lib/useTasks.ts` wraps them over the
 * persisted document so the logic can be tested without React.
 */

export const TASKS_STORAGE_KEY = 'nishany.calendar.tasks.v1'
export const DEFAULT_GROUP_ID = 'group-default'
export const DEFAULT_GROUP_TITLE = 'My tasks'

export interface TaskGroup {
  id: string
  title: string
  createdAt: string
}

export interface Subtask {
  id: string
  title: string
  done: boolean
}

export interface Task {
  id: string
  groupId: string
  title: string
  details?: string
  /** Local calendar date, `YYYY-MM-DD`. Absent = unscheduled. */
  date?: string
  /** `HH:MM`, local. Only meaningful with a date. */
  time?: string
  done: boolean
  subtasks: Subtask[]
  createdAt: string
  updatedAt: string
}

export interface TaskDoc {
  version: 1
  groups: TaskGroup[]
  tasks: Task[]
}

export const EMPTY_TASKS: TaskDoc = { version: 1, groups: [], tasks: [] }

export interface NewTask {
  groupId?: string
  title: string
  details?: string
  date?: string
  time?: string
}

export type TaskPatch = Partial<Pick<Task, 'title' | 'details' | 'date' | 'time' | 'groupId'>>

let counter = 0
export function taskId(prefix: string, now: Date = new Date()): string {
  counter = (counter + 1) % 1000
  return `${prefix}-${now.getTime().toString(36)}-${counter.toString(36)}`
}

export function isoDay(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function shiftDay(ymd: string, days: number): string {
  const [y, m, d] = ymd.split('-').map(Number)
  const next = new Date(y, m - 1, d + days)
  return isoDay(next)
}

/** The default group, created on first write so an empty list needs no setup. */
export function ensureDefaultGroup(doc: TaskDoc, now: Date = new Date()): TaskDoc {
  if (doc.groups.some((group) => group.id === DEFAULT_GROUP_ID)) return doc
  return {
    ...doc,
    groups: [{ id: DEFAULT_GROUP_ID, title: DEFAULT_GROUP_TITLE, createdAt: now.toISOString() }, ...doc.groups],
  }
}

export function addGroup(doc: TaskDoc, title: string, now: Date = new Date()): { doc: TaskDoc; id: string } {
  const trimmed = title.trim()
  const base = ensureDefaultGroup(doc, now)
  if (!trimmed) return { doc: base, id: DEFAULT_GROUP_ID }
  const id = taskId('group', now)
  return { doc: { ...base, groups: [...base.groups, { id, title: trimmed, createdAt: now.toISOString() }] }, id }
}

export function renameGroup(doc: TaskDoc, id: string, title: string): TaskDoc {
  const trimmed = title.trim()
  if (!trimmed) return doc
  return { ...doc, groups: doc.groups.map((group) => (group.id === id ? { ...group, title: trimmed } : group)) }
}

/** Removing a group keeps its tasks: they move to the default group. */
export function removeGroup(doc: TaskDoc, id: string, now: Date = new Date()): TaskDoc {
  if (id === DEFAULT_GROUP_ID) return doc
  const base = ensureDefaultGroup(doc, now)
  return {
    ...base,
    groups: base.groups.filter((group) => group.id !== id),
    tasks: base.tasks.map((task) => (task.groupId === id ? { ...task, groupId: DEFAULT_GROUP_ID } : task)),
  }
}

export function addTask(doc: TaskDoc, input: NewTask, now: Date = new Date()): { doc: TaskDoc; id: string } {
  const title = input.title.trim()
  const base = ensureDefaultGroup(doc, now)
  if (!title) return { doc: base, id: '' }
  const groupId = base.groups.some((group) => group.id === input.groupId) ? input.groupId! : DEFAULT_GROUP_ID
  const id = taskId('task', now)
  const stamp = now.toISOString()
  const task: Task = {
    id,
    groupId,
    title,
    details: input.details?.trim() || undefined,
    date: input.date || undefined,
    time: input.date && input.time ? input.time : undefined,
    done: false,
    subtasks: [],
    createdAt: stamp,
    updatedAt: stamp,
  }
  return { doc: { ...base, tasks: [...base.tasks, task] }, id }
}

export function updateTask(doc: TaskDoc, id: string, patch: TaskPatch, now: Date = new Date()): TaskDoc {
  return {
    ...doc,
    tasks: doc.tasks.map((task) => {
      if (task.id !== id) return task
      const next: Task = { ...task, ...patch, updatedAt: now.toISOString() }
      if (patch.title !== undefined) next.title = patch.title.trim() || task.title
      if (patch.details !== undefined) next.details = patch.details.trim() || undefined
      if (patch.date !== undefined) next.date = patch.date || undefined
      if (!next.date) next.time = undefined
      else if (patch.time !== undefined) next.time = patch.time || undefined
      if (patch.groupId !== undefined && !doc.groups.some((group) => group.id === patch.groupId)) next.groupId = task.groupId
      return next
    }),
  }
}

/** Ticking a task ticks its subtasks too; unticking leaves them as they were. */
export function toggleTask(doc: TaskDoc, id: string, now: Date = new Date()): TaskDoc {
  return {
    ...doc,
    tasks: doc.tasks.map((task) => {
      if (task.id !== id) return task
      const done = !task.done
      return {
        ...task,
        done,
        subtasks: done ? task.subtasks.map((sub) => ({ ...sub, done: true })) : task.subtasks,
        updatedAt: now.toISOString(),
      }
    }),
  }
}

export function removeTask(doc: TaskDoc, id: string): TaskDoc {
  return { ...doc, tasks: doc.tasks.filter((task) => task.id !== id) }
}

export function addSubtask(doc: TaskDoc, taskId_: string, title: string, now: Date = new Date()): TaskDoc {
  const trimmed = title.trim()
  if (!trimmed) return doc
  return {
    ...doc,
    tasks: doc.tasks.map((task) =>
      task.id === taskId_
        ? { ...task, done: false, subtasks: [...task.subtasks, { id: taskId('sub', now), title: trimmed, done: false }], updatedAt: now.toISOString() }
        : task,
    ),
  }
}

/** The last subtask ticked completes the task; unticking one reopens it. */
export function toggleSubtask(doc: TaskDoc, taskId_: string, subId: string, now: Date = new Date()): TaskDoc {
  return {
    ...doc,
    tasks: doc.tasks.map((task) => {
      if (task.id !== taskId_) return task
      const subtasks = task.subtasks.map((sub) => (sub.id === subId ? { ...sub, done: !sub.done } : sub))
      const allDone = subtasks.length > 0 && subtasks.every((sub) => sub.done)
      return { ...task, subtasks, done: allDone, updatedAt: now.toISOString() }
    }),
  }
}

export function removeSubtask(doc: TaskDoc, taskId_: string, subId: string, now: Date = new Date()): TaskDoc {
  return {
    ...doc,
    tasks: doc.tasks.map((task) =>
      task.id === taskId_
        ? { ...task, subtasks: task.subtasks.filter((sub) => sub.id !== subId), updatedAt: now.toISOString() }
        : task,
    ),
  }
}

export type ScheduleLabel = 'Today' | 'Tomorrow' | 'Overdue' | null

/**
 * How a task's date reads relative to today. Anything that is not today,
 * tomorrow or late returns `null` so the caller can print the short date.
 */
export function scheduleLabel(task: Pick<Task, 'date' | 'done'>, today: string): ScheduleLabel {
  if (!task.date) return null
  if (task.date === today) return 'Today'
  if (task.date === shiftDay(today, 1)) return 'Tomorrow'
  if (task.date < today && !task.done) return 'Overdue'
  return null
}

export function tasksForDay(doc: TaskDoc, ymd: string): Task[] {
  return doc.tasks
    .filter((task) => task.date === ymd)
    .sort((a, b) => (a.time ?? '99:99').localeCompare(b.time ?? '99:99') || a.createdAt.localeCompare(b.createdAt))
}

export function taskProgress(task: Pick<Task, 'subtasks'>): { done: number; total: number } {
  return { done: task.subtasks.filter((sub) => sub.done).length, total: task.subtasks.length }
}

export function openTasks(doc: TaskDoc): Task[] {
  return doc.tasks.filter((task) => !task.done)
}

/** Stable schedule order: checking a task must not move it away from the pointer. */
export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    const ad = a.date ?? '9999-99-99'
    const bd = b.date ?? '9999-99-99'
    return ad.localeCompare(bd) || (a.time ?? '99:99').localeCompare(b.time ?? '99:99') || a.createdAt.localeCompare(b.createdAt)
  })
}
