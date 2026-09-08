import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Collapse } from '@/components/ui/Collapse'
import { Field, Select, TextInput, Textarea } from '@/components/ui/Field'
import { DateField, TimeField } from '@/components/ui/DateTimeField'
import { DEFAULT_GROUP_ID, isoDay, shiftDay, type NewTask, type TaskGroup } from '@/data/tasks'
import { useT } from '@/lib/i18n'

type Schedule = 'none' | 'today' | 'tomorrow' | 'custom'

/** Quick entry with the date and destination visible; optional details expand inline. */
export function TaskComposer({
  groups, groupId, onGroupChange, selectedDay, onAdd,
}: {
  groups: TaskGroup[]
  groupId: string
  onGroupChange: (id: string) => void
  selectedDay: string | null
  onAdd: (task: NewTask) => void
}) {
  const t = useT()
  const inputArea = useRef<HTMLDivElement>(null)
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [schedule, setSchedule] = useState<Schedule>('none')
  const [customDate, setCustomDate] = useState('')
  const [time, setTime] = useState('')
  const today = isoDay(new Date())

  useEffect(() => {
    if (selectedDay) {
      setSchedule('custom')
      setCustomDate(selectedDay)
      inputArea.current?.querySelector('input')?.focus()
    }
  }, [selectedDay])

  const date = schedule === 'today' ? today : schedule === 'tomorrow' ? shiftDay(today, 1) : schedule === 'custom' ? customDate : ''
  const canAdd = Boolean(title.trim()) && (schedule !== 'custom' || Boolean(customDate))

  function submit() {
    if (!canAdd) return
    onAdd({ title: title.trim(), details: details.trim() || undefined, groupId, date: date || undefined, time: date && time ? time : undefined })
    setTitle('')
    setDetails('')
    setTime('')
    setSchedule('none')
    setCustomDate('')
    setExpanded(false)
    inputArea.current?.querySelector('input')?.focus()
  }

  return (
    <div className="space-y-2.5">
      <div ref={inputArea} className="flex items-center gap-2">
        <TextInput
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); submit() } }}
          placeholder={t('Add a task…')}
          aria-label={t('New task')}
          className="min-w-0 flex-1"
        />
        <Button variant="primary" iconLeft={Plus} onClick={submit} disabled={!canAdd} aria-label={t('Add task')}>{t('Add')}</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="min-w-0 flex-1">
          <Select aria-label={t('Schedule')} value={schedule} onChange={(event) => setSchedule(event.target.value as Schedule)} className="text-[12.5px] sm:h-8">
            <option value="none">{t('No date')}</option>
            <option value="today">{t('Today')}</option>
            <option value="tomorrow">{t('Tomorrow')}</option>
            <option value="custom">{t('Pick a date')}</option>
          </Select>
        </div>
        <Button variant="ghost" size="sm" iconRight={ChevronDown} aria-expanded={expanded} aria-controls="task-composer-details" onClick={() => setExpanded((current) => !current)}>
          {t('Details')}{details.trim() || time ? ' •' : ''}
        </Button>
      </div>
      {schedule === 'custom' && <Field label={t('Task date')} htmlFor="task-composer-date"><DateField id="task-composer-date" value={customDate} onChange={setCustomDate} /></Field>}
      {groups.length > 1 && (
        <Select value={groupId} onChange={(event) => onGroupChange(event.target.value)} aria-label={t('Group')} className="text-[12.5px] sm:h-8">
          {groups.map((group) => <option key={group.id} value={group.id}>{group.id === DEFAULT_GROUP_ID ? t(group.title) : group.title}</option>)}
        </Select>
      )}
      <Collapse open={expanded} id="task-composer-details">
        <div className="space-y-3 border-t border-line pt-3">
          <Field label={t('Details')} htmlFor="task-details">
            <Textarea id="task-details" value={details} onChange={(event) => setDetails(event.target.value)} placeholder={t('Anything you need to remember')} />
          </Field>
          {date && (
            <Field label={t('Time (optional)')} htmlFor="task-time">
              <TimeField id="task-time" value={time} onChange={setTime} />
            </Field>
          )}
        </div>
      </Collapse>
    </div>
  )
}
