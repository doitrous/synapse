import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Eye, EyeOff, FolderPlus, ListChecks } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
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
  // Hide only the completions the student explicitly dismissed. A task checked
  // afterward stays visible, including when the last subtask completes it.
  const [hiddenCompletions, setHiddenCompletions] = useState<Record<string, string>>({})
  const [addingGroup, setAddingGroup] = useState(false)
  const [groupDraft, setGroupDraft] = useState('')
  const [flash, setFlash] = useState<string | null>(null)
  const today = isoDay(new Date())

  useEffect(() => {
    if (!highlightedId) return
    setFlash(highlightedId)
    setHiddenCompletions((current) => { const next = { ...current }; delete next[highlightedId]; return next })
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
  const completed = doc.tasks.filter((task) => task.done)
  const visibleCompleted = completed.filter((task) => hiddenCompletions[task.id] !== task.updatedAt).length

  function submitGroup() {
    if (!groupDraft.trim()) return
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
        hint={open ? `${open} ${t('open')}` : t('all clear')}
        action={<Button variant="ghost" size="sm" iconLeft={FolderPlus} onClick={() => setAddingGroup(true)}>{t('New group')}</Button>}
      />
      <div className="space-y-4 p-3 sm:p-4">
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
              className="min-w-0 flex-1"
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
              hiddenCompletions={hiddenCompletions}
              highlightedId={flash}
              onRename={(title) => api.renameGroup(group.id, title)}
            />
          ))}
        </div>
        {completed.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
            <span className="text-[12px] text-ink-2" role="status">{completed.length} {t('completed')}</span>
            <Button
              variant="ghost"
              size="sm"
              iconLeft={visibleCompleted ? EyeOff : Eye}
              onClick={() => setHiddenCompletions(visibleCompleted
                ? Object.fromEntries(completed.map((task) => [task.id, task.updatedAt]))
                : {})}
            >
              {visibleCompleted ? t('Hide completed') : t('Show completed')}
            </Button>
          </div>
        )}
      </div>
      {prelude && <div className="overflow-hidden rounded-b-xl border-t border-line">{prelude}</div>}
    </Panel>
  )
}
