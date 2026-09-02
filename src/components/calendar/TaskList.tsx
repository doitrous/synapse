import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { FolderPlus, ListChecks } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Toggle } from '@/components/ui/Toggle'
import { TextInput } from '@/components/ui/Field'
import { DEFAULT_GROUP_ID, isoDay, openTasks } from '@/data/tasks'
import { useT } from '@/lib/i18n'
import { useTasks } from '@/lib/useTasks'
import { cn } from '@/lib/cn'
import { TaskComposer } from './TaskComposer'
import { TaskGroupSection } from './TaskGroupSection'

/**
 * The to-do list that sits beside the calendar.
 *
 * It replaced four small panels of week arithmetic (hours taught, hours
 * planned, open time) that told the student about their week without giving
 * them anywhere to write down what they still owed it. What survives of those
 * panels is `prelude`: the calendar passes in the one line that still matters
 * — what is coming next.
 */
export function TaskList({
  selectedDay,
  highlightedId,
  onAdded,
  prelude,
  className,
}: {
  /** The calendar day currently in view, `YYYY-MM-DD`, or null when browsing. */
  selectedDay: string | null
  /** A task the calendar wants brought into view (it was clicked on the grid). */
  highlightedId: string | null
  /** Called after a task is created, so the calendar can drop its day selection. */
  onAdded?: () => void
  prelude?: ReactNode
  className?: string
}) {
  const t = useT()
  const api = useTasks()
  const { doc } = api
  const [groupId, setGroupId] = useState(DEFAULT_GROUP_ID)
  const [showCompleted, setShowCompleted] = useState(false)
  const [addingGroup, setAddingGroup] = useState(false)
  const [groupDraft, setGroupDraft] = useState('')
  const [flash, setFlash] = useState<string | null>(null)
  const today = isoDay(new Date())
  // Read through a ref so the flash runs once per highlight request, not on
  // every later edit to the list.
  const tasksRef = useRef(doc.tasks)
  tasksRef.current = doc.tasks

  useEffect(() => {
    if (!highlightedId) return
    setFlash(highlightedId)
    if (tasksRef.current.find((task) => task.id === highlightedId)?.done) setShowCompleted(true)
    const timer = window.setTimeout(() => setFlash(null), 1600)
    return () => window.clearTimeout(timer)
  }, [highlightedId])

  useEffect(() => {
    if (!doc.groups.some((group) => group.id === groupId)) setGroupId(DEFAULT_GROUP_ID)
  }, [doc.groups, groupId])

  const byGroup = useMemo(() => {
    const map = new Map<string, typeof doc.tasks>()
    for (const group of doc.groups) map.set(group.id, [])
    for (const task of doc.tasks) {
      const list = map.get(task.groupId)
      if (list) list.push(task)
      else map.set(task.groupId, [task])
    }
    return map
  }, [doc])
  const open = openTasks(doc).length

  function submitGroup() {
    const id = api.addGroup(groupDraft)
    if (id) setGroupId(id)
    setGroupDraft('')
    setAddingGroup(false)
  }

  return (
    <Panel className={cn('flex flex-col', className)}>
      <PanelHeader
        title={t('Tasks')}
        icon={ListChecks}
        hint={open ? `${open} ${open === 1 ? t('open') : t('open')}` : t('all clear')}
        action={<Button variant="ghost" size="sm" iconLeft={FolderPlus} onClick={() => setAddingGroup(true)}>{t('Group')}</Button>}
      />
      {prelude}
      <div className="space-y-3 p-3">
        <TaskComposer groups={doc.groups} groupId={groupId} onGroupChange={setGroupId} selectedDay={selectedDay} onAdd={(task) => { api.addTask(task); onAdded?.() }} />
        {addingGroup && (
          <div className="flex items-center gap-2">
            <TextInput
              autoFocus
              value={groupDraft}
              onChange={(event) => setGroupDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') { event.preventDefault(); submitGroup() }
                if (event.key === 'Escape') { setAddingGroup(false); setGroupDraft('') }
              }}
              placeholder={t('New group name')}
              aria-label={t('New group name')}
              className="flex-1"
            />
            <Button variant="secondary" size="sm" onClick={submitGroup} disabled={!groupDraft.trim()}>{t('Add')}</Button>
            <Button variant="ghost" size="sm" onClick={() => { setAddingGroup(false); setGroupDraft('') }}>{t('Cancel')}</Button>
          </div>
        )}
        <div className="space-y-4">
          {doc.groups.map((group) => (
            <TaskGroupSection
              key={group.id}
              group={group}
              tasks={byGroup.get(group.id) ?? []}
              api={api}
              today={today}
              showCompleted={showCompleted}
              highlightedId={flash}
              onRename={(title) => api.renameGroup(group.id, title)}
            />
          ))}
        </div>
        {doc.tasks.some((task) => task.done) && (
          <label className="flex cursor-pointer items-center justify-between gap-2 border-t border-line pt-3 text-[12.5px] text-ink-2">
            {t('Show completed')}
            <Toggle checked={showCompleted} onChange={setShowCompleted} label={t('Show completed')} />
          </label>
        )}
      </div>
    </Panel>
  )
}
