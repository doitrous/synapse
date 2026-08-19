import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Check, ChevronLeft, ChevronRight, Clock, Pencil, Plus, Trash2, X, MapPin, Layers, ArrowRight } from 'lucide-react'
import type { CalEvent } from '@/data/calendar'
import { getSubject, subjects } from '@/data/subjects'
import {
  durationMinutes, isoDay, STUDY_BLOCKS_STORAGE_KEY, type StudyBlock,
} from '@/data/studyBlocks'
import { useStudentSchedule, type ScheduledSession } from '@/lib/useStudentSchedule'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageContainer } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Dialog } from '@/components/ui/Dialog'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Segmented } from '@/components/ui/Tabs'
import { Toggle } from '@/components/ui/Toggle'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { DateField, TimeField } from '@/components/ui/DateTimeField'
import { SystemMark } from '@/components/ui/SystemMark'
import { DEFAULT_WEEK_START, addDays, monthGrid, sameDay, weekDays, weekdayLabels } from '@/lib/calendarGrid'
import { useIdentity } from '@/lib/useIdentity'
import { useStudentModules } from '@/lib/useUniversityCatalogue'
import { Icon } from '@/components/ui/Icon'
import { usePersistentState } from '@/lib/usePersistentState'
import { formatLongDate, formatTimeString } from '@/lib/format'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

/**
 * The academic week these students keep runs Saturday to Friday.
 *
 * The grid arithmetic lives in `@/lib/calendarGrid` so the month header, the
 * week view and every date picker read the same answer — three local copies of
 * "which day starts a week" is how a date lands in two different columns.
 */
const WEEK_START = DEFAULT_WEEK_START
const WEEKDAYS = weekdayLabels(WEEK_START)

function dayKey(date: Date) {
  return isoDay(date)
}
function fromIsoDay(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}
function timeOf(date: Date) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

/** A published timetable block, as a calendar event. */
function sessionEvent(session: ScheduledSession): CalEvent {
  return {
    id: session.id,
    title: session.title || session.label,
    date: session.start,
    time: timeOf(session.start),
    endTime: session.end ? timeOf(session.end) : undefined,
    layer: 'curriculum',
    subjectId: session.topicIds[0] ?? '',
    kind: session.label,
    location: session.location,
    isExam: session.isExam,
  }
}

/** A block the student planned, as a calendar event. */
function blockEvent(block: StudyBlock): CalEvent {
  return {
    id: block.id,
    title: block.title,
    date: fromIsoDay(block.date),
    time: block.start,
    endTime: block.end,
    layer: 'personal',
    subjectId: block.subjectId,
    moduleId: block.moduleId,
    kind: block.kind,
  }
}

function Chip({ event }: { event: CalEvent }) {
  const subject = getSubject(event.subjectId)
  const curriculum = event.layer === 'curriculum'
  return (
    <div className={cn(
      'flex min-w-0 items-center gap-1.5 truncate rounded px-1.5 py-1 text-[10.5px]',
      curriculum ? 'bg-primary-tint font-medium text-primary-strong' : 'border border-dashed border-line-2 bg-surface text-ink-2',
    )}>
      {!curriculum && <span className="h-3 w-0.5 shrink-0 rounded-full" style={{ backgroundColor: subject.color }} />}
      <span className="tnum shrink-0 font-mono text-[9.5px] opacity-75">{formatTimeString(event.time)}</span>
      <span className="truncate">{event.title}</span>
    </div>
  )
}

/**
 * Create or change one of the student's own blocks.
 *
 * `existing` is what makes this an editor rather than only a creator: a block
 * could previously be added and then never touched again — no edit, no delete,
 * no way to correct a typo or move a session that shifted.
 */
function BlockDialog({ date, existing, onClose, onSave, onDelete }: {
  date: Date
  existing?: StudyBlock
  onClose: () => void
  onSave: (block: Omit<StudyBlock, 'id'>) => void
  onDelete?: () => void
}) {
  const t = useT()
  const { audience } = useIdentity()
  const modules = useStudentModules(audience.universityId, audience.yearId)
  const [title, setTitle] = useState(existing?.title ?? '')
  // The date was fixed by whichever cell was clicked, so a block planned on the
  // wrong day had to be deleted and made again.
  const [day, setDay] = useState(existing?.date ?? isoDay(date))
  const [start, setStart] = useState(existing?.start ?? '17:00')
  const [end, setEnd] = useState(existing?.end ?? '18:00')
  const [subjectId, setSubjectId] = useState(existing?.subjectId ?? subjects[0]?.id ?? '')
  const [moduleId, setModuleId] = useState(existing?.moduleId ?? '')
  const [kind, setKind] = useState(existing?.kind ?? 'Study block')
  const valid = title.trim() && day && durationMinutes(start, end) > 0
  const heading = existing ? t('Edit study block') : t('Add a study block')

  return (
    <Dialog onClose={onClose} label={heading} size="md">
        <PanelHeader title={heading} icon={CalendarDays} action={<IconButton icon={X} label={t('Close')} size="sm" onClick={onClose} />} />
        <form className="space-y-4 p-5" onSubmit={(event) => {
          event.preventDefault()
          if (!valid) return
          onSave({ title: title.trim(), date: day, start, end, subjectId, moduleId: moduleId || undefined, kind, done: existing?.done, sourceSessionId: existing?.sourceSessionId })
        }}>
          <Field label={t('What are you working on?')} htmlFor="block-title">
            <TextInput id="block-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder={t('e.g. Heart failure question set')} />
          </Field>
          <Field label={t('Date')}><DateField value={day} onChange={setDay} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t('Starts')}><TimeField value={start} onChange={setStart} /></Field>
            <Field label={t('Ends')} hint={durationMinutes(start, end) <= 0 ? t('End time must be later.') : undefined}><TimeField value={end} onChange={setEnd} after={start} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t('Subject')}><Select value={subjectId} onChange={(event) => setSubjectId(event.target.value)}>{subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}</Select></Field>
            <Field label={t('Type')}><Select value={kind} onChange={(event) => setKind(event.target.value)}><option value="Study block">{t('Study block')}</option><option value="Question bank">{t('Question bank')}</option><option value="Library reading">{t('Library reading')}</option><option value="Practical">{t('Practical')}</option><option value="Test">{t('Test')}</option></Select></Field>
          </div>
          {/* Modules come from the student's own year. Nothing to choose from
              means no university or year is on the account yet, so the field is
              absent rather than an empty control that looks broken. */}
          {modules.length > 0 && (
            <Field label={t('Module')} hint={t('Optional — ties this block to a module on your timetable.')}>
              <Select value={moduleId} onChange={(event) => setModuleId(event.target.value)}>
                <option value="">{t('No module')}</option>
                {modules.map((module) => <option key={module.id} value={module.id}>{module.id} — {module.name}</option>)}
              </Select>
            </Field>
          )}
          <div className="flex items-center justify-end gap-2 border-t border-line pt-4">
            {onDelete && <Button type="button" variant="ghost" className="me-auto text-danger hover:bg-danger-tint" iconLeft={Trash2} onClick={onDelete}>{t('Delete')}</Button>}
            <Button type="button" variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
            <Button type="submit" variant="primary" iconLeft={existing ? Check : Plus} disabled={!valid}>{existing ? t('Save changes') : t('Add block')}</Button>
          </div>
        </form>
    </Dialog>
  )
}

/** Maps an event's kind to the surface a student would most likely open next. */
function actionFor(event: CalEvent): { to: string; label: string } | null {
  const k = event.kind.toLowerCase()
  if (k.includes('qbank') || k.includes('question')) return { to: '/app/qbank', label: 'Open Question Bank' }
  if (k.includes('review')) return { to: '/app/qbank', label: 'Start a review' }
  if (k.includes('read') || k.includes('library') || k.includes('lecture')) return { to: '/app/library', label: 'Open Library' }
  if (k.includes('lab') || k.includes('practical') || k.includes('osce')) return { to: '/app/practical', label: 'Open Practical' }
  if (event.layer === 'curriculum') return { to: '/app/library', label: 'Open prep materials' }
  return null
}

function EventDetailDialog({ event, onClose, onEdit }: { event: CalEvent; onClose: () => void; onEdit?: () => void }) {
  const t = useT()
  const subject = getSubject(event.subjectId)
  const curriculum = event.layer === 'curriculum'
  const action = actionFor(event)
  const timeLabel = event.endTime ? `${formatTimeString(event.time)} – ${formatTimeString(event.endTime)}` : formatTimeString(event.time)
  return (
    <Dialog onClose={onClose} label={t('Event details')} size="sm">
        <div className="flex items-start gap-3 border-b border-line px-5 py-3.5">
          <span className="mt-1 h-8 w-1 shrink-0 rounded-full" style={{ backgroundColor: subject.color }} />
          <div className="min-w-0 flex-1">
            <span
              className={cn(
                'inline-flex rounded-full px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.06em]',
                curriculum ? 'bg-primary-tint text-primary-strong' : 'border border-dashed border-line-2 text-ink-2',
              )}
            >
              {curriculum ? t('Curriculum') : t('Personal')}
            </span>
            <h2 className="mt-1.5 font-serif text-[18px] font-semibold leading-snug text-ink">{event.title}</h2>
          </div>
          <IconButton icon={X} label={t('Close')} size="sm" onClick={onClose} />
        </div>
        <div className="space-y-3 px-5 py-4 text-[13.5px] text-ink-2">
          <div className="flex items-center gap-2.5">
            <Icon icon={Clock} size={16} className="text-ink-3" />
            <span className="tnum">{timeLabel}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Icon icon={CalendarDays} size={16} className="text-ink-3" />
            <span>{formatLongDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Icon icon={Layers} size={16} className="text-ink-3" />
            <span>{event.kind}</span>
          </div>
          {event.moduleId && (
            <div className="flex items-center gap-2.5">
              <SystemMark moduleId={event.moduleId} size="sm" />
              <span>{event.moduleId}</span>
            </div>
          )}
          {(event.location || event.subjectId) && (
            <div className="flex items-center gap-2.5">
              <Icon icon={MapPin} size={16} className="text-ink-3" />
              <span>{event.location || subject.name}</span>
            </div>
          )}
        </div>
        {(action || onEdit) && (
          <div className="flex justify-end gap-2 border-t border-line bg-surface-2/40 px-5 py-3">
            {onEdit && <Button variant="secondary" iconLeft={Pencil} onClick={onEdit}>{t('Edit')}</Button>}
            <Button variant="ghost" onClick={onClose}>
              {t('Close')}
            </Button>
            {action && (
              <Link to={action.to}>
                <Button variant="primary" iconRight={ArrowRight}>
                  {t(action.label)}
                </Button>
              </Link>
            )}
          </div>
        )}
    </Dialog>
  )
}

/** A day's agenda as a bottom sheet — the readable, tappable day view on mobile. */
function DaySheet({ date, events, onClose, onEvent, onAdd }: { date: Date; events: CalEvent[]; onClose: () => void; onEvent: (e: CalEvent) => void; onAdd: () => void }) {
  const t = useT()
  return (
    <Dialog onClose={onClose} label={formatLongDate(date)} size="sm" className="max-h-[80dvh]">
        <PanelHeader title={formatLongDate(date)} icon={CalendarDays} hint={`${events.length} ${events.length === 1 ? t('event') : t('events')}`} action={<IconButton icon={X} label={t('Close')} size="sm" onClick={onClose} />} />
        <div className="p-3">
          {events.length ? (
            <ul className="space-y-2">
              {events.map((event) => {
                const subject = getSubject(event.subjectId)
                return (
                  <li key={event.id}>
                    <button type="button" onClick={() => onEvent(event)} className="grid w-full grid-cols-[3.5rem_1fr_auto] items-center gap-2 rounded-lg border border-line bg-surface-2/50 p-2.5 text-start transition-colors hover:border-primary-line hover:bg-primary-tint/25">
                      <span className="tnum font-mono text-[11px] text-ink-3">{formatTimeString(event.time)}</span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-1.5"><span className="h-3 w-0.5 shrink-0 rounded-full" style={{ backgroundColor: subject.color }} /><span className="truncate text-[13px] font-medium text-ink">{event.title}</span></span>
                        <span className="mt-0.5 block ps-2 text-[11px] text-ink-3">{event.kind} · {subject.name}</span>
                      </span>
                      <Icon icon={ChevronRight} size={15} className="text-ink-3 rtl:-scale-x-100" />
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="rounded-lg border border-dashed border-line bg-surface-2/40 px-4 py-6 text-center text-[13px] text-ink-3">{t('Nothing scheduled this day.')}</p>
          )}
          <Button className="mt-3 w-full" variant="primary" size="sm" iconLeft={Plus} onClick={onAdd}>{t('Add a block')}</Button>
        </div>
    </Dialog>
  )
}

export function CalendarPage() {
  const t = useT()
  const [anchor, setAnchor] = useState(() => new Date())
  const [view, setView] = useState('month')
  const [showCurriculum, setShowCurriculum] = useState(true)
  const [showPersonal, setShowPersonal] = useState(true)
  const [dialogDate, setDialogDate] = useState<Date | null>(null)
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null)
  const [detailEvent, setDetailEvent] = useState<CalEvent | null>(null)
  const [daySheet, setDaySheet] = useState<Date | null>(null)
  const [blocks, setBlocks] = usePersistentState<StudyBlock[]>(STUDY_BLOCKS_STORAGE_KEY, [])
  const { sessions, hasYear } = useStudentSchedule()
  const today = new Date()

  const days = useMemo(
    () => (view === 'week' ? weekDays(anchor, WEEK_START) : monthGrid(anchor, WEEK_START)),
    [anchor, view],
  )

  const eventMap = useMemo(() => {
    const map = new Map<string, CalEvent[]>()
    const add = (event: CalEvent) => map.set(dayKey(event.date), [...(map.get(dayKey(event.date)) ?? []), event])
    sessions.map(sessionEvent).forEach(add)
    blocks.map(blockEvent).forEach(add)
    map.forEach((events) => events.sort((a, b) => a.time.localeCompare(b.time)))
    return map
  }, [blocks, sessions])

  const visible = (events: CalEvent[] = []) => events.filter((event) => event.layer === 'curriculum' ? showCurriculum : showPersonal)
  const todayEvents = visible(eventMap.get(dayKey(today)))
  const thisWeek = weekDays(anchor, WEEK_START)
  const weekEvents = thisWeek.flatMap((day) => visible(eventMap.get(dayKey(day))))
  const taughtSessions = weekEvents.filter((event) => event.layer === 'curriculum')
  // Each session's own start and end. Assuming every taught block was exactly
  // sixty minutes was the last invented number left on this page.
  const taughtMinutes = taughtSessions.reduce((total, event) => total + (event.endTime ? durationMinutes(event.time, event.endTime) : 0), 0)
  const plannedBlocks = blocks.filter((block) => thisWeek.some((day) => block.date === isoDay(day)))
  const plannedMinutes = plannedBlocks.reduce((total, block) => total + durationMinutes(block.start, block.end), 0)
  const editingBlock = blocks.find((block) => block.id === editingBlockId)

  function shift(direction: number) {
    if (view === 'week') setAnchor((date) => addDays(date, direction * 7))
    else setAnchor((date) => new Date(date.getFullYear(), date.getMonth() + direction, 1))
  }
  /**
   * One answer to "what does clicking a day do", for both views.
   *
   * Month opened a day sheet and week opened the editor, so the same intent had
   * two outcomes depending on which tab you were on. And on an empty day the
   * sheet only ever said "Nothing scheduled" above the button you were going to
   * press anyway — a screen to dismiss between the click and the thing it meant.
   */
  function openDay(date: Date) {
    if (visible(eventMap.get(dayKey(date))).length === 0) setDialogDate(date)
    else setDaySheet(date)
  }
  function saveBlock(block: Omit<StudyBlock, 'id'>) {
    if (editingBlockId) {
      setBlocks((current) => current.map((item) => item.id === editingBlockId ? { ...block, id: editingBlockId } : item))
    } else {
      setBlocks((current) => [...current, { ...block, id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` }])
    }
    setDialogDate(null)
    setEditingBlockId(null)
  }
  function deleteBlock() {
    if (!editingBlockId) return
    setBlocks((current) => current.filter((item) => item.id !== editingBlockId))
    setDialogDate(null)
    setEditingBlockId(null)
  }
  /** Open the editor on one of the student's own blocks. */
  function editEvent(event: CalEvent) {
    if (event.layer !== 'personal') return
    setDetailEvent(null)
    setEditingBlockId(event.id)
    setDialogDate(event.date)
  }

  const label = view === 'week'
    ? `${formatLongDate(thisWeek[0])} – ${formatLongDate(thisWeek[6])}`
    : `${t(MONTHS[anchor.getMonth()])} ${anchor.getFullYear()}`

  return (
    <PageContainer>
      <div className="mb-4 space-y-3">
        {/* Row 1: navigation + view switch (always visible on mobile) */}
        <div className="flex flex-wrap items-center gap-2">
          <IconButton icon={ChevronLeft} label={t('Previous')} variant="surface" size="sm" className="rtl:-scale-x-100" onClick={() => shift(-1)} />
          <h1 className="min-w-0 flex-1 truncate font-serif text-[17px] font-semibold text-ink sm:min-w-[11rem] sm:flex-none sm:text-[19px]">{label}</h1>
          <IconButton icon={ChevronRight} label={t('Next')} variant="surface" size="sm" className="rtl:-scale-x-100" onClick={() => shift(1)} />
          <Button variant="secondary" size="sm" onClick={() => setAnchor(new Date())}>{t('Today')}</Button>
          <Segmented value={view} onChange={setView} items={[{ value: 'month', label: t('Month') }, { value: 'week', label: t('Week') }]} />
        </div>
        {/* Row 2: filters + add */}
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-[13px] text-ink-2"><span className="size-2.5 rounded-sm bg-primary-tint ring-1 ring-primary-line" />{t('Curriculum')}<Toggle checked={showCurriculum} onChange={setShowCurriculum} label={t('Curriculum')} /></label>
          <label className="flex cursor-pointer items-center gap-2 text-[13px] text-ink-2"><span className="size-2.5 rounded-sm border border-dashed border-line-2 bg-surface" />{t('Personal')}<Toggle checked={showPersonal} onChange={setShowPersonal} label={t('Personal')} tint="#55605c" /></label>
          <Button className="ms-auto" variant="primary" size="sm" iconLeft={Plus} onClick={() => setDialogDate(new Date())}>{t('Add block')}</Button>
        </div>
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
        {view === 'month' ? (
          <Panel className="overflow-hidden">
            <div className="grid grid-cols-7 border-b border-line bg-surface-2">{WEEKDAYS.map((day) => <div key={day} className="px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.05em] text-ink-3">{t(day)}</div>)}</div>
            <div className="grid grid-cols-7">
              {days.map((date, index) => {
                const events = visible(eventMap.get(dayKey(date)))
                const inMonth = date.getMonth() === anchor.getMonth()
                const isToday = sameDay(date, today)
                return (
                  <button key={dayKey(date)} onClick={() => openDay(date)} className={cn('group min-h-[64px] border-b border-r border-line p-1 text-left transition-colors hover:bg-primary-tint/25 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-primary sm:min-h-[112px] sm:p-1.5', index % 7 === 6 && 'border-r-0', !inMonth && 'bg-surface-2/40')} aria-label={`${formatLongDate(date)} — ${events.length} events`}>
                    <div className="mb-1 flex items-center justify-between">
                      <Icon icon={Plus} size={12} className="text-ink-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      <span className={cn('tnum grid size-6 place-items-center rounded-full text-[12px] font-medium', isToday ? 'bg-primary text-on-primary' : inMonth ? 'text-ink-2' : 'text-ink-3')}>{date.getDate()}</span>
                    </div>
                    <div className="hidden space-y-1 sm:block">{events.slice(0, 3).map((event) => <Chip key={event.id} event={event} />)}{events.length > 3 && <div className="px-1.5 text-[10.5px] font-medium text-ink-3">+{events.length - 3} {t('more')}</div>}</div>
                    {events.length > 0 && <div className="mt-1 flex flex-wrap justify-end gap-0.5 sm:hidden">{events.slice(0, 3).map((event) => <span key={event.id} className={cn('size-1.5 rounded-full', event.layer === 'curriculum' ? 'bg-primary' : 'border border-line-2 bg-surface')} />)}{events.length > 3 && <span className="font-mono text-[8px] leading-none text-ink-3">+{events.length - 3}</span>}</div>}
                  </button>
                )
              })}
            </div>
          </Panel>
        ) : (
          <div className="space-y-2">
            {days.map((date, index) => {
              const events = visible(eventMap.get(dayKey(date)))
              return <Panel key={dayKey(date)} className="flex flex-col gap-2 p-3 sm:flex-row sm:gap-3"><button onClick={() => openDay(date)} className="flex w-full shrink-0 items-center gap-2 rounded-md text-start hover:bg-inset sm:w-28"><span className="text-[12px] font-medium uppercase tracking-wide text-ink-3">{t(WEEKDAYS[index])}</span><span className={cn('tnum grid size-8 place-items-center rounded-full font-serif text-[16px] font-semibold', sameDay(date, today) ? 'bg-primary text-on-primary' : 'text-ink')}>{date.getDate()}</span></button><div className="grid min-w-0 flex-1 gap-1.5 sm:grid-cols-2">{events.length ? events.map((event) => <button key={event.id} type="button" onClick={() => setDetailEvent(event)} className="min-w-0 text-start"><Chip event={event} /></button>) : <button onClick={() => setDialogDate(date)} className="rounded-md border border-dashed border-line px-3 py-2 text-start text-[12.5px] text-ink-3 hover:border-line-2">+ {t('Add a block')}</button>}</div></Panel>
            })}
          </div>
        )}

        <aside className="space-y-4 xl:sticky xl:top-[4.5rem]">
          <Panel>
            <PanelHeader title={t("Today's view")} icon={Clock} hint={formatLongDate(today)} />
            <div className="p-3">
              {todayEvents.length ? <ul className="space-y-2">{todayEvents.map((event) => <li key={event.id}><button type="button" onClick={() => setDetailEvent(event)} className="grid w-full grid-cols-[4.5rem_1fr_auto] items-center gap-2 rounded-lg border border-line bg-surface-2/50 p-2.5 text-start transition-colors hover:border-primary-line hover:bg-primary-tint/25"><span className="tnum font-mono text-[10.5px] text-ink-3">{formatTimeString(event.time)}</span><span><span className="block text-[12.5px] font-medium text-ink">{event.title}</span><span className="mt-0.5 block text-[11px] text-ink-3">{event.kind}</span></span><Icon icon={ChevronRight} size={15} className="text-ink-3 rtl:-scale-x-100" /></button></li>)}</ul> : <div className="rounded-lg border border-line bg-surface-2 p-4"><p className="text-[13px] font-medium text-ink">{t('Nothing scheduled')}</p><p className="mt-2 text-[13px] leading-relaxed text-ink-2">{t('A clear day. If it is deliberate, leave it clear—recovery is part of the plan.')}</p></div>}
              <Button className="mt-3 w-full" variant="secondary" size="sm" iconLeft={Plus} onClick={() => setDialogDate(today)}>{t('Add to today')}</Button>
            </div>
          </Panel>
          <Panel>
            <PanelHeader title={t('Where the week goes')} />
            <div className="divide-y divide-line px-4 py-1">
              <div className="flex items-start justify-between py-3"><span className="text-[13.5px] text-ink-2">{t('Taught')}</span><span className="text-end"><strong className="tnum block font-mono text-[16px] text-ink">{(taughtMinutes / 60).toFixed(1)} {t('h')}</strong><span className="text-[11.5px] text-ink-3">{weekEvents.filter((event) => event.layer === 'curriculum').length} {t('sessions')}</span></span></div>
              <div className="flex items-start justify-between py-3"><span className="text-[13.5px] text-ink-2">{t('Your plan')}</span><span className="text-end"><strong className="tnum block font-mono text-[16px] text-ink">{(plannedMinutes / 60).toFixed(1)} {t('h')}</strong><span className="text-[11.5px] text-ink-3">{plannedBlocks.length} {t('blocks')}</span></span></div>
            </div>
          </Panel>
        </aside>
      </div>

      {!hasYear && (
        <Panel className="mt-3 p-4">
          <EmptyState
            icon={CalendarDays}
            title={t('No university timetable yet')}
            description={t("Your university hasn't published a schedule for your year, so only the blocks you plan yourself appear here.")}
          />
        </Panel>
      )}
      {hasYear && sessions.length === 0 && (
        <p className="mt-3 rounded-lg border border-dashed border-line bg-surface-2/40 px-4 py-3 text-[12.5px] text-ink-3">
          {t('Your year has no published sessions yet. Blocks you plan yourself still appear on this calendar.')}
        </p>
      )}
      <p className="mt-3 flex items-center gap-1.5 text-[12px] text-ink-3"><CalendarDays size={13} />{t('Select any day to add a personal block. Curriculum sessions are filled; your plan is outlined.')}</p>
      {daySheet && (
        <DaySheet
          date={daySheet}
          events={visible(eventMap.get(dayKey(daySheet)))}
          onClose={() => setDaySheet(null)}
          onEvent={(e) => { setDaySheet(null); setDetailEvent(e) }}
          onAdd={() => { const d = daySheet; setDaySheet(null); setDialogDate(d) }}
        />
      )}
      {dialogDate && (
        <BlockDialog
          key={editingBlockId ?? 'new'}
          date={dialogDate}
          existing={editingBlock}
          onClose={() => { setDialogDate(null); setEditingBlockId(null) }}
          onSave={saveBlock}
          onDelete={editingBlock ? deleteBlock : undefined}
        />
      )}
      {detailEvent && (
        <EventDetailDialog
          event={detailEvent}
          onClose={() => setDetailEvent(null)}
          onEdit={detailEvent.layer === 'personal' ? () => editEvent(detailEvent) : undefined}
        />
      )}
    </PageContainer>
  )
}
