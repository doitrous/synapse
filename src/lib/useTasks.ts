import { useCallback, useMemo } from 'react'
import {
  EMPTY_TASKS,
  TASKS_STORAGE_KEY,
  addGroup,
  addSubtask,
  addTask,
  ensureDefaultGroup,
  removeGroup,
  removeSubtask,
  removeTask,
  renameGroup,
  toggleSubtask,
  toggleTask,
  updateTask,
  type NewTask,
  type TaskDoc,
  type TaskPatch,
} from '@/data/tasks'
import { usePersistentState } from './usePersistentState'

/**
 * The student's task list, shared by the calendar that edits it and the Plan
 * hub that counts it. All the logic is in `@/data/tasks`; this only binds it
 * to the persisted document.
 */
export function useTasks() {
  const [stored, setStored] = usePersistentState<TaskDoc>(TASKS_STORAGE_KEY, EMPTY_TASKS)
  const doc = useMemo(() => ensureDefaultGroup(stored), [stored])

  const mutate = useCallback((fn: (current: TaskDoc) => TaskDoc) => setStored((current) => fn(current ?? EMPTY_TASKS)), [setStored])

  return {
    doc,
    addGroup: useCallback((title: string) => {
      let id = ''
      mutate((current) => { const result = addGroup(current, title); id = result.id; return result.doc })
      return id
    }, [mutate]),
    renameGroup: useCallback((id: string, title: string) => mutate((current) => renameGroup(current, id, title)), [mutate]),
    removeGroup: useCallback((id: string) => mutate((current) => removeGroup(current, id)), [mutate]),
    addTask: useCallback((input: NewTask) => {
      let id = ''
      mutate((current) => { const result = addTask(current, input); id = result.id; return result.doc })
      return id
    }, [mutate]),
    updateTask: useCallback((id: string, patch: TaskPatch) => mutate((current) => updateTask(current, id, patch)), [mutate]),
    toggleTask: useCallback((id: string) => mutate((current) => toggleTask(current, id)), [mutate]),
    removeTask: useCallback((id: string) => mutate((current) => removeTask(current, id)), [mutate]),
    addSubtask: useCallback((taskId: string, title: string) => mutate((current) => addSubtask(current, taskId, title)), [mutate]),
    toggleSubtask: useCallback((taskId: string, subId: string) => mutate((current) => toggleSubtask(current, taskId, subId)), [mutate]),
    removeSubtask: useCallback((taskId: string, subId: string) => mutate((current) => removeSubtask(current, taskId, subId)), [mutate]),
  }
}

export type TasksApi = ReturnType<typeof useTasks>
