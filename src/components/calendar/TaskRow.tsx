import { useEffect, useRef, useState } from 'react'
import { ChevronRight, Pencil, Plus, Trash2, X } from 'lucide-react'
import { Checkbox } from '@/components/ui/Checkbox'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Collapse } from '@/components/ui/Collapse'
import { ContextMenu } from '@/components/ui/ContextMenu'
import { IconButton } from '@/components/ui/IconButton'
import { TextInput, Textarea } from '@/components/ui/Field'
import { DateField, TimeField } from '@/components/ui/DateTimeField'
import { Button } from '@/components/ui/Button'
import { scheduleLabel, taskProgress, type Task, type TaskPatch } from '@/data/tasks'
import { formatTimeString } from '@/lib/format'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

function shortDate(ymd: string): string {
  const [y, m, d] = ymd.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
}

/**
 * One task: a checkbox, its title, how it is scheduled, and — opened with the
 * chevron — its details, subtasks and editing.
 */
export function TaskRow({
  task,
  today,
  highlighted,
  onToggle,
  onUpdate,
  onRemove,
  onAddSubtask,
  onToggleSubtask,
  onRemoveSubtask,
}: {
  task: Task
  today: string
  /** Briefly true when the calendar sent the student here. */
  highlighted?: boolean
  onToggle: () => void
  onUpdate: (patch: TaskPatch) => void
  onRemove: () => void
  onAddSubtask: (title: string) => void
  onToggleSubtask: (subId: string) => void
  onRemoveSubtask: (subId: string) => void
}) {
  const t = useT()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null)
  const [subtaskDraft, setSubtaskDraft] = useState('')
  const [draft, setDraft] = useState<TaskPatch>({})
  const ref = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (highlighted) { setOpen(true); ref.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }) }
  }, [highlighted])

  const label = scheduleLabel(task, today)
  const progress = taskProgress(task)
  const tone = label === 'Today' ? 'primary' : label === 'Overdue' ? 'danger' : 'neutral'

  function startEdit() {
    setDraft({ title: task.title, details: task.details ?? '', date: task.date ?? '', time: task.time ?? '' })
    setEditing(true)
    setOpen(true)
  }
  function saveEdit() {
    onUpdate(draft)
    setEditing(false)
  }
  function submitSubtask() {
    const trimmed = subtaskDraft.trim()
    if (!trimmed) return
    onAddSubtask(trimmed)
    setSubtaskDraft('')
  }

  return (
    <li
      ref={ref}
      id={`task-${task.id}`}
      onContextMenu={(event) => { event.preventDefault(); setMenu({ x: event.clientX, y: event.clientY }) }}
      className={cn(
        'rounded-lg transition-colors duration-500',
        highlighted && 'bg-primary-tint',
        task.done && 'opacity-75',
      )}
    >
      <div className="flex items-start gap-2 px-1 py-1">
        <Checkbox checked={task.done} onChange={onToggle} label={task.done ? t('Mark as not done') : t('Mark as done')} className="mt-0.5" />
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          className="flex min-h-11 min-w-0 flex-1 items-start gap-2 rounded-md py-1.5 text-start sm:min-h-8"
        >
          <span className="min-w-0 flex-1">
            <span className={cn('block text-[13.5px] font-medium leading-snug text-ink', task.done && 'text-ink-3 line-through')}>{task.title}</span>
            <span className="mt-0.5 flex flex-wrap items-center gap-1.5">
              {task.date && (
                <Badge tone={tone} className="text-[10.5px]">
                  {label ? t(label) : shortDate(task.date)}{task.time ? ` · ${formatTimeString(task.time)}` : ''}
                </Badge>
              )}
              {progress.total > 0 && (
                <span className="tnum font-mono text-[11px] text-ink-3">{progress.done}/{progress.total}</span>
              )}
              {!task.date && task.details && !open && <span className="truncate text-[11.5px] text-ink-3">{task.details}</span>}
            </span>
          </span>
          <Icon icon={ChevronRight} size={15} open={open} className="chevron-turn mt-1 shrink-0 text-ink-3" />
        </button>
      </div>

      <Collapse open={open}>
        <div className="ms-11 me-2 mb-2 space-y-2.5 rounded-lg border border-line bg-surface-2/50 p-3 sm:ms-9">
          {editing ? (
            <div className="space-y-2.5">
              <TextInput value={draft.title ?? ''} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} aria-label={t('Title')} />
              <Textarea value={draft.details ?? ''} onChange={(event) => setDraft((current) => ({ ...current, details: event.target.value }))} placeholder={t('Details')} aria-label={t('Details')} />
              <div className="grid gap-2 sm:grid-cols-2">
                <DateField value={draft.date ?? ''} onChange={(next) => setDraft((current) => ({ ...current, date: next }))} />
                <TimeField value={draft.time ?? ''} onChange={(next) => setDraft((current) => ({ ...current, time: next }))} disabled={!draft.date} />
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                {draft.date && <Button variant="ghost" size="sm" onClick={() => setDraft((current) => ({ ...current, date: '', time: '' }))}>{t('Clear date')}</Button>}
                <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>{t('Cancel')}</Button>
                <Button variant="primary" size="sm" onClick={saveEdit}>{t('Save')}</Button>
              </div>
            </div>
          ) : (
            <>
              {task.details && <p className="whitespace-pre-line text-[13px] leading-relaxed text-ink-2">{task.details}</p>}
              {task.subtasks.length > 0 && (
                <ul className="space-y-0.5">
                  {task.subtasks.map((sub) => (
                    <li key={sub.id} className="group/sub flex items-center gap-1.5">
                      <Checkbox checked={sub.done} onChange={() => onToggleSubtask(sub.id)} label={sub.title} className="sm:!size-7" />
                      <span className={cn('min-w-0 flex-1 text-[13px] text-ink', sub.done && 'text-ink-3 line-through')}>{sub.title}</span>
                      <IconButton icon={X} label={t('Remove subtask')} size="sm" className="opacity-0 group-hover/sub:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100" onClick={() => onRemoveSubtask(sub.id)} />
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex items-center gap-1.5">
                <TextInput
                  value={subtaskDraft}
                  onChange={(event) => setSubtaskDraft(event.target.value)}
                  onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); submitSubtask() } }}
                  placeholder={t('Add a subtask…')}
                  aria-label={t('New subtask')}
                  className="flex-1 text-[13px] sm:!h-9"
                />
                <IconButton icon={Plus} label={t('Add subtask')} variant="surface" size="sm" onClick={submitSubtask} />
              </div>
              <div className="flex justify-end gap-1">
                <Button variant="ghost" size="sm" iconLeft={Pencil} onClick={startEdit}>{t('Edit')}</Button>
                <Button variant="ghost" size="sm" iconLeft={Trash2} onClick={onRemove} className="text-danger">{t('Delete')}</Button>
              </div>
            </>
          )}
        </div>
      </Collapse>

      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
          header={<span className="block truncate text-[12px] font-medium text-ink-2">{task.title}</span>}
          items={[
            { id: 'toggle', label: task.done ? t('Mark as not done') : t('Mark as done'), onSelect: onToggle },
            { id: 'edit', label: t('Edit'), icon: Pencil, onSelect: startEdit },
            { id: 'delete', label: t('Delete'), icon: Trash2, onSelect: onRemove, separated: true, tone: 'danger' },
          ]}
        />
      )}
    </li>
  )
}
