import { useEffect, useRef, useState } from 'react'
import { Check, ChevronRight, Pencil, Plus, Trash2, X } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Collapse } from '@/components/ui/Collapse'
import { ContextMenu } from '@/components/ui/ContextMenu'
import { IconButton } from '@/components/ui/IconButton'
import { Field, Select, TextInput, Textarea } from '@/components/ui/Field'
import { DateField, TimeField } from '@/components/ui/DateTimeField'
import { Button } from '@/components/ui/Button'
import { DEFAULT_GROUP_ID, scheduleLabel, taskProgress, type Task, type TaskGroup, type TaskPatch } from '@/data/tasks'
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
  groups,
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
  groups: TaskGroup[]
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
    setDraft({ title: task.title, details: task.details ?? '', date: task.date ?? '', time: task.time ?? '', groupId: task.groupId })
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
        'rounded-lg transition-colors duration-200 motion-reduce:transition-none',
        highlighted && 'bg-primary-tint',
        task.done && 'bg-surface-2/60',
      )}
    >
      <div className="flex items-start gap-1 py-2">
        <TaskCheckbox checked={task.done} onChange={onToggle} label={`${task.done ? t('Mark as not done') : t('Mark as done')}: ${task.title}`} />
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls={`task-details-${task.id}`}
          className="flex min-h-11 min-w-0 flex-1 items-start gap-2 rounded-md py-1.5 text-start sm:min-h-8"
        >
          <span className="min-w-0 flex-1">
            <span className={cn('block break-words text-[13.5px] font-medium leading-snug text-ink', task.done && 'text-ink-2 line-through')}>{task.title}</span>
            <span className="mt-1 flex min-h-5 flex-wrap items-center gap-1.5">
              {task.done && <span className="text-[11.5px] text-ink-2">{t('Completed')}</span>}
              {task.date && !task.done && (
                <Badge tone={tone} className="text-[10.5px]">
                  {label ? t(label) : shortDate(task.date)}{task.time ? ` · ${formatTimeString(task.time)}` : ''}
                </Badge>
              )}
              {progress.total > 0 && (
                <span className="tnum text-[11.5px] text-ink-2">{progress.done}/{progress.total} {t('subtasks')}</span>
              )}
              {!task.date && task.details && !open && <span className="truncate text-[11.5px] text-ink-3">{task.details}</span>}
            </span>
          </span>
          <Icon icon={ChevronRight} size={15} open={open} className="chevron-turn mt-1 shrink-0 text-ink-3" />
        </button>
        <IconButton icon={Pencil} label={`${t('Edit task')}: ${task.title}`} size="sm" onClick={startEdit} />
      </div>

      <Collapse open={open} id={`task-details-${task.id}`}>
        <div className="ms-3 me-1 mb-3 space-y-3 border-s border-line ps-3 sm:ms-4">
          {editing ? (
            <div className="space-y-2.5">
              <Field label={t('Title')} htmlFor={`task-title-${task.id}`}><TextInput id={`task-title-${task.id}`} autoFocus value={draft.title ?? ''} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} aria-label={t('Title')} /></Field>
              <Field label={t('Details')} htmlFor={`task-notes-${task.id}`}><Textarea id={`task-notes-${task.id}`} value={draft.details ?? ''} onChange={(event) => setDraft((current) => ({ ...current, details: event.target.value }))} placeholder={t('Details')} aria-label={t('Details')} /></Field>
              {groups.length > 1 && <Field label={t('Group')} htmlFor={`task-destination-${task.id}`}>
                <Select id={`task-destination-${task.id}`} value={draft.groupId} onChange={(event) => setDraft((current) => ({ ...current, groupId: event.target.value }))}>
                  {groups.map((group) => <option key={group.id} value={group.id}>{group.id === DEFAULT_GROUP_ID ? t(group.title) : group.title}</option>)}
                </Select>
              </Field>}
              <div className="grid gap-2">
                <Field label={t('Date')} htmlFor={`task-date-${task.id}`}><DateField id={`task-date-${task.id}`} value={draft.date ?? ''} onChange={(next) => setDraft((current) => ({ ...current, date: next, ...(!next ? { time: '' } : {}) }))} /></Field>
                <Field label={t('Time (optional)')} htmlFor={`task-time-${task.id}`}><TimeField id={`task-time-${task.id}`} value={draft.time ?? ''} onChange={(next) => setDraft((current) => ({ ...current, time: next }))} disabled={!draft.date} /></Field>
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                {draft.date && <Button variant="ghost" size="sm" onClick={() => setDraft((current) => ({ ...current, date: '', time: '' }))}>{t('Clear date')}</Button>}
                <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>{t('Cancel')}</Button>
                <Button variant="primary" size="sm" onClick={saveEdit} disabled={!draft.title?.trim()}>{t('Save')}</Button>
              </div>
            </div>
          ) : (
            <>
              {task.details && <p className="whitespace-pre-line break-words text-[13px] leading-relaxed text-ink-2">{task.details}</p>}
              <p className="text-[12px] font-semibold text-ink-2">{t('Subtasks')}</p>
              {task.subtasks.length > 0 && (
                <ul className="space-y-0.5">
                  {task.subtasks.map((sub) => (
                    <li key={sub.id} className="group/sub flex items-center gap-1.5">
                      <TaskCheckbox checked={sub.done} onChange={() => onToggleSubtask(sub.id)} label={sub.title} />
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
                  className="min-w-0 flex-1 text-[13px] sm:!h-9"
                />
                <IconButton icon={Plus} label={t('Add subtask')} variant="surface" size="sm" disabled={!subtaskDraft.trim()} onClick={submitSubtask} />
              </div>
              <div className="flex justify-end gap-1">
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

/** A small visual checkbox inside a comfortable touch target. */
function TaskCheckbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className="group/check grid size-11 shrink-0 place-items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:size-8"
    >
      <span className={cn('grid size-5 place-items-center rounded-md border transition-colors duration-200 motion-reduce:transition-none', checked ? 'border-primary bg-primary text-on-primary' : 'border-line-2 bg-surface group-hover/check:border-primary')}>
        {checked && <Check size={13} strokeWidth={2.5} aria-hidden />}
      </span>
    </button>
  )
}
