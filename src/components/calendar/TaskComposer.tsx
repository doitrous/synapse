import { useEffect, useState } from 'react'
import { CalendarDays, Plus, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Popover, usePopoverTrigger } from '@/components/ui/Popover'
import { Field, Select, TextInput, Textarea } from '@/components/ui/Field'
import { DateField, TimeField } from '@/components/ui/DateTimeField'
import { isoDay, shiftDay, type NewTask, type TaskGroup } from '@/data/tasks'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

type Schedule = 'none' | 'today' | 'tomorrow' | 'custom'

/**
 * The one text field at the top of the list, and the fuller form behind it.
 *
 * Typing a title and pressing Enter is the whole gesture for most tasks. The
 * "More" popover is where a task gets details, a group, a day and a time —
 * kept behind one button so the quick path stays one line tall.
 */
export function TaskComposer({
  groups,
  groupId,
  onGroupChange,
  selectedDay,
  onAdd,
}: {
  groups: TaskGroup[]
  groupId: string
  onGroupChange: (id: string) => void
  /** The calendar day the student is looking at, if any — the default date. */
  selectedDay: string | null
  onAdd: (task: NewTask) => void
}) {
  const t = useT()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [schedule, setSchedule] = useState<Schedule>('none')
  const [customDate, setCustomDate] = useState('')
  const [time, setTime] = useState('')
  const more = usePopoverTrigger()
  const today = isoDay(new Date())

  useEffect(() => {
    if (selectedDay) { setSchedule('custom'); setCustomDate(selectedDay) }
  }, [selectedDay])

  const date = schedule === 'today' ? today : schedule === 'tomorrow' ? shiftDay(today, 1) : schedule === 'custom' ? customDate : ''

  function submit() {
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd({ title: trimmed, details: details.trim() || undefined, groupId, date: date || undefined, time: date && time ? time : undefined })
    setTitle('')
    setDetails('')
    setTime('')
    // The parent drops its day selection in `onAdd`; the effect above re-applies
    // a selection that is still standing, so resetting here is always right.
    setSchedule('none')
    setCustomDate('')
    more.close()
  }

  const chip = (value: Schedule, label: string) => (
    <button
      type="button"
      onClick={() => setSchedule(value)}
      aria-pressed={schedule === value}
      className={cn(
        'h-11 rounded-full border px-3.5 text-[12.5px] font-medium transition-colors sm:h-9 sm:px-3',
        schedule === value ? 'border-primary-line bg-primary-tint text-primary-strong' : 'border-line bg-surface text-ink-2 hover:border-line-2 hover:text-ink',
      )}
    >
      {label}
    </button>
  )

  return (
    <div className="flex items-center gap-2">
      <div className="relative min-w-0 flex-1">
        <TextInput
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); submit() } }}
          placeholder={t('Add a task…')}
          aria-label={t('New task')}
          className="pe-9"
        />
        {date && (
          <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-ink-3" title={date}>
            <CalendarDays size={14} />
          </span>
        )}
      </div>
      <span ref={more.setAnchor} className="inline-flex">
        <IconButton icon={SlidersHorizontal} label={t('More options')} variant="surface" size="md" active={more.open} onClick={more.toggle} />
      </span>
      <IconButton icon={Plus} label={t('Add task')} variant="primary" size="md" onClick={submit} />
      {more.open && (
        <Popover anchor={more.anchor} onClose={more.close} placement="bottom-end" role="dialog" label={t('Task details')} className="w-[min(22rem,calc(100vw-2rem))] p-4">
          <div className="space-y-3">
            <Field label={t('Title')} htmlFor="task-title">
              <TextInput id="task-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder={t('What needs doing?')} />
            </Field>
            <Field label={t('Details')} htmlFor="task-details">
              <Textarea id="task-details" value={details} onChange={(event) => setDetails(event.target.value)} placeholder={t('Anything you need to remember')} />
            </Field>
            <Field label={t('Group')} htmlFor="task-group">
              <Select id="task-group" value={groupId} onChange={(event) => onGroupChange(event.target.value)}>
                {groups.map((group) => <option key={group.id} value={group.id}>{group.title}</option>)}
              </Select>
            </Field>
            <div>
              <p className="mb-1.5 text-[12.5px] font-medium text-ink-2">{t('Schedule')}</p>
              <div className="flex flex-wrap gap-1.5">
                {chip('none', t('No date'))}
                {chip('today', t('Today'))}
                {chip('tomorrow', t('Tomorrow'))}
                {chip('custom', t('Pick a date'))}
              </div>
            </div>
            {schedule === 'custom' && (
              <Field label={t('Date')} htmlFor="task-date">
                <DateField id="task-date" value={customDate} onChange={setCustomDate} />
              </Field>
            )}
            {date && (
              <Field label={t('Time (optional)')} htmlFor="task-time">
                <TimeField id="task-time" value={time} onChange={setTime} />
              </Field>
            )}
            <div className="flex justify-end gap-2 pt-1">
              <Button variant="ghost" size="sm" onClick={more.close}>{t('Cancel')}</Button>
              <Button variant="primary" size="sm" iconLeft={Plus} onClick={submit} disabled={!title.trim()}>{t('Add task')}</Button>
            </div>
          </div>
        </Popover>
      )}
    </div>
  )
}
