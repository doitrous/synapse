import { useEffect, useState } from 'react'
import { ChevronRight, MoreHorizontal, Pencil, Trash2, X } from 'lucide-react'
import { Collapse } from '@/components/ui/Collapse'
import { ContextMenu } from '@/components/ui/ContextMenu'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { TextInput } from '@/components/ui/Field'
import { DEFAULT_GROUP_ID, sortTasks, type Task, type TaskGroup } from '@/data/tasks'
import { Button } from '@/components/ui/Button'
import { useT } from '@/lib/i18n'
import type { TasksApi } from '@/lib/useTasks'
import { TaskRow } from './TaskRow'

/** One group of tasks: a collapsible caption with its open count, then its rows. */
export function TaskGroupSection({
  group,
  tasks,
  api,
  today,
  hiddenCompletions,
  highlightedId,
  onRename,
}: {
  group: TaskGroup
  tasks: Task[]
  api: TasksApi
  today: string
  hiddenCompletions: Record<string, string>
  highlightedId: string | null
  onRename: (title: string) => void
}) {
  const t = useT()
  const [open, setOpen] = useState(true)
  const [renaming, setRenaming] = useState(false)
  const [draft, setDraft] = useState(group.title)
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null)
  const openCount = tasks.filter((task) => !task.done).length
  const shown = sortTasks(tasks.filter((task) => !task.done || hiddenCompletions[task.id] !== task.updatedAt))
  useEffect(() => {
    if (highlightedId && tasks.some((task) => task.id === highlightedId)) setOpen(true)
  }, [highlightedId, tasks])
  const isDefault = group.id === DEFAULT_GROUP_ID

  return (
    <section>
      <div className="group/head flex items-center gap-1 border-b border-line pb-1">
        {renaming ? (
          <div className="flex min-w-0 flex-1 items-center gap-1.5">
            <Icon icon={ChevronRight} size={14} open={open} className="chevron-turn shrink-0 text-ink-3" />
            <TextInput
              autoFocus
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') { onRename(draft); setRenaming(false) }
                if (event.key === 'Escape') { setDraft(group.title); setRenaming(false) }
              }}
              aria-label={t('Group name')}
              className="text-[13px] sm:!h-8"
            />
            <Button variant="secondary" size="sm" disabled={!draft.trim()} onClick={() => { onRename(draft); setRenaming(false) }}>{t('Save')}</Button>
            <IconButton icon={X} label={t('Cancel')} size="sm" onClick={() => setRenaming(false)} />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-controls={`task-group-${group.id}`}
            className="flex min-h-11 min-w-0 flex-1 items-center gap-1.5 rounded-md text-start sm:min-h-9"
          >
            <Icon icon={ChevronRight} size={14} open={open} className="chevron-turn shrink-0 text-ink-3" />
            <span className="truncate text-[13px] font-semibold text-ink">{isDefault ? t(group.title) : group.title}</span>
            <span className="tnum ms-auto text-[11.5px] text-ink-3">{openCount} {t('open')}</span>
          </button>
        )}
        {!isDefault && <IconButton
          icon={MoreHorizontal}
          label={t('Group options')}
          size="sm"
          onClick={(event) => { const rect = event.currentTarget.getBoundingClientRect(); setMenu({ x: rect.left, y: rect.bottom + 4 }) }}
        />}
      </div>
      <Collapse open={open} id={`task-group-${group.id}`}>
        {shown.length ? (
          <ul className="divide-y divide-line/60 pt-1">
            {shown.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                groups={api.doc.groups}
                today={today}
                highlighted={highlightedId === task.id}
                onToggle={() => api.toggleTask(task.id)}
                onUpdate={(patch) => api.updateTask(task.id, patch)}
                onRemove={() => api.removeTask(task.id)}
                onAddSubtask={(title) => api.addSubtask(task.id, title)}
                onToggleSubtask={(subId) => api.toggleSubtask(task.id, subId)}
                onRemoveSubtask={(subId) => api.removeSubtask(task.id, subId)}
              />
            ))}
          </ul>
        ) : (
          <p className="px-2 py-3 text-[12.5px] text-ink-3">{tasks.length ? t('All done here.') : t('Nothing in this group yet.')}</p>
        )}
      </Collapse>
      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
          items={[
            { id: 'rename', label: t('Rename'), icon: Pencil, onSelect: () => { setDraft(group.title); setRenaming(true) }, disabled: isDefault },
            { id: 'delete', label: t('Delete group'), icon: Trash2, onSelect: () => api.removeGroup(group.id), disabled: isDefault, separated: true, tone: 'danger' },
          ]}
        />
      )}
    </section>
  )
}
