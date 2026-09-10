import { useMemo, useState } from 'react'
import { CalendarDays, Check, CheckSquare2, ChevronLeft, ChevronRight, CircleAlert, Clock, Filter, Pencil, Plus, Trash2, X, MapPin, Layers, ArrowRight, WifiOff, GraduationCap } from 'lucide-react'
import type { CalEvent } from '@/data/calendar'
import { scheduleLinks, type ModuleScheduleStore } from '@/data/moduleSchedule'
import { getSubject, subjects } from '@/data/subjects'
import {
  durationMinutes, isoDay, STUDY_BLOCKS_STORAGE_KEY, type StudyBlock,
} from '@/data/studyBlocks'
import { useStudentSchedule, MODULE_SCHEDULE_STORAGE_KEY } from '@/lib/useStudentSchedule'
import { useTasks } from '@/lib/useTasks'
import { EMPTY_TASKS, TASKS_STORAGE_KEY, type Task, type TaskDoc } from '@/data/tasks'
import { TaskList } from '@/components/calendar/TaskList'
import { Checkbox } from '@/components/ui/Checkbox'
import type { ScheduledSession } from '@/lib/studentSchedule'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageContainer } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Dialog } from '@/components/ui/Dialog'
import { Button, ButtonLink } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Segmented } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { Popover, usePopoverTrigger } from '@/components/ui/Popover'
import { Toggle } from '@/components/ui/Toggle'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { DateField, TimeField } from '@/components/ui/DateTimeField'
import { SystemMark } from '@/components/ui/SystemMark'
import { CalendarSkeleton } from '@/components/loading/PageSkeleton'
import { LoadingRegion } from '@/components/loading/SkeletonParts'
import { DEFAULT_WEEK_START, addDays, monthGrid, sameDay, weekDays, weekdayLabels } from '@/lib/calendarGrid'
import { useIdentity } from '@/lib/useIdentity'
import { useStudentModules, useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { Icon } from '@/components/ui/Icon'
import { usePersistentState } from '@/lib/usePersistentState'
import { useOnlineStatus } from '@/lib/useOnlineStatus'
import { formatLongDate, formatTimeString } from '@/lib/format'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

/**
 * Curriculum and personal, behind one button.
 *
 * The count is on the trigger rather than the state being colour alone: a
 * student who hid the curriculum layer three days ago and forgot needs the bar
 * to tell them why the month looks empty.
 */
function CalendarLayers({
  showCurriculum,
  setShowCurriculum,
  showPersonal,
  setShowPersonal,
}: {
  showCurriculum: boolean
  setShowCurriculum: (next: boolean) => void
  showPersonal: boolean
  setShowPersonal: (next: boolean) => void
}) {
  const t = useT()
  const { anchor, setAnchor, open, setOpen, close } = usePopoverTrigger()
  const hidden = (showCurriculum ? 0 : 1) + (showPersonal ? 0 : 1)
  const label = hidden ? `${t('Layers')} · ${hidden} ${t('hidden')}` : t('Layers')

  return (
    <>
      <span ref={setAnchor} className="relative inline-flex shrink-0">
        <IconButton
          icon={Filter}
          label={label}
          variant="surface"
          size="sm"
          active={hidden > 0}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        />
        {hidden > 0 && (
          <Badge tone="primary" className="tnum pointer-events-none absolute -end-1.5 -top-1.5 border-primary-line px-1 text-[10px] leading-4">
            {hidden}
          </Badge>
        )}
      </span>

      {open && (
        <Popover anchor={anchor} onClose={close} placement="bottom-end" label={t('Layers')} className="w-[min(17rem,calc(100vw-1rem))]">
          <div className="border-b border-line px-3 py-2.5">
            <p className="text-[13.5px] font-semibold text-ink">{t('Layers')}</p>
            <p className="mt-0.5 text-[10.5px] text-ink-3">{t('Choose what this calendar draws.')}</p>
          </div>
          <div className="p-1.5">
            <label className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-lg px-2.5 text-[13px] text-ink-2 transition-colors hover:bg-inset">
              <span className="size-2.5 shrink-0 rounded-sm bg-primary-tint ring-1 ring-primary-line" />
              <span className="min-w-0 flex-1">{t('Curriculum')}</span>
              <Toggle checked={showCurriculum} onChange={setShowCurriculum} label={t('Curriculum')} />
            </label>
            <label className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-lg px-2.5 text-[13px] text-ink-2 transition-colors hover:bg-inset">
              <span className="size-2.5 shrink-0 rounded-sm border border-dashed border-line-2 bg-surface" />
              <span className="min-w-0 flex-1">{t('Personal')}</span>
              {/* No `tint`. It used to be a fixed slate hex, which no theme could
                  move; every token that follows the theme inverts, and the
                  knob is white in all four — measured, `--color-ink-2` and
                  `--color-ink` both fall to ~1.2–2.6:1 in dark and OLED. The
                  default primary holds 4.67:1 against the knob in every theme,
                  and the dashed swatch beside the label already says which
                  layer this is. */}
              <Toggle checked={showPersonal} onChange={setShowPersonal} label={t('Personal')} />
            </label>
          </div>
        </Popover>
      )}
    </>
  )
}

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
  const links = scheduleLinks(session)
  return {
    id: session.id,
    title: session.title || session.label,
    date: session.start,
    time: timeOf(session.start),
    endTime: session.end ? timeOf(session.end) : undefined,
    layer: 'curriculum',
    subjectId: links.subjectId ?? '',
    moduleId: session.moduleNumber || session.courseName,
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

/** A dated task, as a calendar event — a dot on the grid, a row in the day sheet. */
function taskEvent(task: Task): CalEvent {
  return {
    id: `task:${task.id}`,
    title: task.title,
    date: fromIsoDay(task.date!),
    time: task.time ?? '',
    layer: 'personal',
    subjectId: '',
    kind: 'task',
    isDone: task.done,
  }
}

function isTaskEvent(event: CalEvent): boolean {
  return event.kind === 'task'
}

function taskIdOf(event: CalEvent): string {
  return event.id.replace(/^task:/, '')
}

function Chip({ event }: { event: CalEvent }) {
  const subject = getSubject(event.subjectId)
  const curriculum = event.layer === 'curriculum'
  const task = isTaskEvent(event)
  return (
    <div className={cn(
      'flex min-w-0 items-center gap-1.5 truncate rounded px-1.5 py-1 text-[10.5px]',
      curriculum ? 'bg-primary-tint font-medium text-primary-strong' : task ? 'border border-line bg-surface text-ink-2' : 'border border-dashed border-line-2 bg-surface text-ink-2',
      task && event.isDone && 'text-ink-3 line-through',
    )}>
      {task ? (
        <span className={cn('size-1.5 shrink-0 rounded-full', event.isDone ? 'bg-ink-3' : 'bg-primary')} />
      ) : !curriculum && <span className="h-3 w-0.5 shrink-0 rounded-full" style={{ backgroundColor: subject.color }} />}
      {event.time && <span className="tnum shrink-0 font-mono text-[9.5px] opacity-75">{formatTimeString(event.time)}</span>}
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
                {/* A module whose name is its code — "205 NEU", as several
                    faculties list them — would otherwise read "205 NEU — 205
                    NEU". Say it once. */}
                {modules.map((module) => (
                  <option key={module.id} value={module.id}>
                    {module.name.trim() === module.id.trim() ? module.id : `${module.id} — ${module.name}`}
                  </option>
                ))}
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

function eventEndDate(event: CalEvent): Date {
  if (!event.endTime) return eventStartDate(event)
  const [hours = 0, minutes = 0] = event.endTime.split(':').map(Number)
  return new Date(event.date.getFullYear(), event.date.getMonth(), event.date.getDate(), hours, minutes)
}

function eventStartDate(event: CalEvent): Date {
  const [hours = 0, minutes = 0] = event.time.split(':').map(Number)
  return new Date(event.date.getFullYear(), event.date.getMonth(), event.date.getDate(), hours, minutes)
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
              <ButtonLink to={action.to} variant="primary" iconRight={ArrowRight}>
                {t(action.label)}
              </ButtonLink>
            )}
          </div>
        )}
    </Dialog>
  )
}

/** A day's agenda as a bottom sheet — the readable, tappable day view on mobile. */
function DaySheet({ date, events, onClose, onEvent, onAdd, onAddTask, onToggleTask }: { date: Date; events: CalEvent[]; onClose: () => void; onEvent: (e: CalEvent) => void; onAdd: () => void; onAddTask: () => void; onToggleTask: (taskId: string) => void }) {
  const t = useT()
  return (
    <Dialog onClose={onClose} label={formatLongDate(date)} size="sm" className="max-h-[80dvh]">
        <PanelHeader title={formatLongDate(date)} icon={CalendarDays} hint={`${events.length} ${events.length === 1 ? t('event') : t('events')}`} action={<IconButton icon={X} label={t('Close')} size="sm" onClick={onClose} />} />
        <div className="p-3">
          {events.length ? (
            <ul className="space-y-2">
              {events.map((event) => {
                const subject = getSubject(event.subjectId)
                if (isTaskEvent(event)) {
                  return (
                    <li key={event.id} className="flex items-center gap-2 rounded-lg border border-line bg-surface-2/50 p-2">
                      <Checkbox checked={Boolean(event.isDone)} onChange={() => onToggleTask(taskIdOf(event))} label={event.title} />
                      <button type="button" onClick={() => onEvent(event)} className="min-w-0 flex-1 rounded-md text-start">
                        <span className={cn('block truncate text-[13px] font-medium text-ink', event.isDone && 'text-ink-3 line-through')}>{event.title}</span>
                        <span className="mt-0.5 block text-[11px] text-ink-3">{t('Task')}{event.time ? ` · ${formatTimeString(event.time)}` : ''}</span>
                      </button>
                      <Icon icon={ChevronRight} size={15} className="text-ink-3 rtl:-scale-x-100" />
                    </li>
                  )
                }
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
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button variant="secondary" size="sm" iconLeft={CheckSquare2} onClick={onAddTask}>{t('Add a task')}</Button>
            <Button variant="primary" size="sm" iconLeft={Plus} onClick={onAdd}>{t('Add a block')}</Button>
          </div>
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
  const [blocks, setBlocks, blocksStatus] = usePersistentState<StudyBlock[]>(STUDY_BLOCKS_STORAGE_KEY, [])
  const { sessions, hasYear } = useStudentSchedule()
  const tasksApi = useTasks()
  const tasks = tasksApi.doc.tasks
  const [pane, setPane] = useState('calendar')
  const [taskDay, setTaskDay] = useState<string | null>(null)
  const [highlightedTask, setHighlightedTask] = useState<string | null>(null)
  const today = new Date()

  // `useStudentSchedule` and `useTasks` wrap `usePersistentState` internally
  // without surfacing its status, so it's re-read here for the same keys —
  // free, since entries are shared and hydration runs once per key.
  const [, , catalogueStatus] = useUniversityCatalogue()
  const [, , moduleScheduleStatus] = usePersistentState<ModuleScheduleStore>(MODULE_SCHEDULE_STORAGE_KEY, {})
  const [, , tasksStatus] = usePersistentState<TaskDoc>(TASKS_STORAGE_KEY, EMPTY_TASKS)
  const calendarStatuses = [blocksStatus, catalogueStatus, moduleScheduleStatus, tasksStatus]
  const calendarError = calendarStatuses.find((status) => status.error)?.error ?? null
  const calendarLoading = !calendarError && calendarStatuses.some((status) => !status.hydrated)
  const online = useOnlineStatus()

  const days = useMemo(
    () => (view === 'week' ? weekDays(anchor, WEEK_START) : monthGrid(anchor, WEEK_START)),
    [anchor, view],
  )

  const eventMap = useMemo(() => {
    const map = new Map<string, CalEvent[]>()
    const add = (event: CalEvent) => map.set(dayKey(event.date), [...(map.get(dayKey(event.date)) ?? []), event])
    sessions.map(sessionEvent).forEach(add)
    blocks.map(blockEvent).forEach(add)
    tasks.filter((task) => task.date).map(taskEvent).forEach(add)
    map.forEach((events) => events.sort((a, b) => a.time.localeCompare(b.time)))
    return map
  }, [blocks, sessions, tasks])

  const visible = (events: CalEvent[] = []) => events.filter((event) => event.layer === 'curriculum' ? showCurriculum : showPersonal)
  const thisWeek = weekDays(anchor, WEEK_START)
  const now = new Date()
  const nextEvent = [...eventMap.values()]
    .flatMap((events) => visible(events))
    .filter((event) => !isTaskEvent(event) && eventEndDate(event).getTime() >= now.getTime())
    .sort((a, b) => eventStartDate(a).getTime() - eventStartDate(b).getTime())[0]
  const nextAction = nextEvent ? actionFor(nextEvent) : null
  const nextMilestone = sessions
    .filter((session) => session.start.getTime() >= now.getTime() && (session.isExam || !session.end))[0]
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
  /** A task on the grid is opened in the list, not in the event dialog. */
  function showEvent(event: CalEvent) {
    if (isTaskEvent(event)) {
      setDaySheet(null)
      setPane('tasks')
      setHighlightedTask(null)
      window.requestAnimationFrame(() => setHighlightedTask(taskIdOf(event)))
      return
    }
    setDaySheet(null)
    setDetailEvent(event)
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
      <div className="mb-4 rounded-xl border border-line bg-surface px-3 py-3 shadow-panel">
        <div className="flex flex-wrap items-center gap-2">
          {/* The month keeps a whole row to itself below `md`; from there up it
              shares the line with the view switch, the layers and Add block. */}
          <div className="flex min-w-0 basis-full items-center gap-2 md:flex-1 md:basis-auto">
            <IconButton icon={ChevronLeft} label={t('Previous')} variant="surface" size="sm" className="rtl:-scale-x-100" onClick={() => shift(-1)} />
            <h1 className="min-w-0 flex-1 truncate text-center font-serif text-[17px] font-semibold text-ink sm:text-[19px]">{label}</h1>
            <IconButton icon={ChevronRight} label={t('Next')} variant="surface" size="sm" className="rtl:-scale-x-100" onClick={() => shift(1)} />
            <Button variant="secondary" size="sm" onClick={() => setAnchor(new Date())}>{t('Today')}</Button>
          </div>
          <span className="hidden h-5 w-px bg-line md:block" />
          {/* The two layer switches sat in the bar at all times to say something
              that is true for almost every student on almost every day: both
              layers are on. They are one button now, and it speaks up — with a
              count — only once a layer is actually hidden. */}
          <div className="flex min-w-0 basis-full flex-wrap items-center gap-2 md:basis-auto">
            <Segmented value={view} onChange={setView} items={[{ value: 'month', label: t('Month') }, { value: 'week', label: t('Week') }]} className="shrink-0 max-sm:flex-nowrap" />
            <CalendarLayers
              showCurriculum={showCurriculum}
              setShowCurriculum={setShowCurriculum}
              showPersonal={showPersonal}
              setShowPersonal={setShowPersonal}
            />
            <Button variant="primary" size="sm" iconLeft={Plus} className="ms-auto whitespace-nowrap" onClick={() => setDialogDate(new Date())}>{t('Add block')}</Button>
            <UniversityButton className="hidden xl:inline-flex" />
          </div>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-2 xl:hidden">
          <Segmented value={pane} onChange={setPane} items={[{ value: 'calendar', label: t('Calendar') }, { value: 'tasks', label: t('Tasks') }]} className="w-fit xl:hidden" />
          <UniversityButton />
        </div>
      </div>

      {calendarLoading ? (
        <LoadingRegion label={t('Loading your calendar')}><CalendarSkeleton toolbar={false} pane={pane} view={view} /></LoadingRegion>
      ) : calendarError ? (
        <Panel className="p-10">
          {online ? (
            <EmptyState
              icon={CircleAlert}
              title={t('This could not be loaded')}
              description={t('We could not reach the server. Check your connection — this page keeps retrying on its own.')}
              action={<Button variant="secondary" size="sm" onClick={() => window.location.reload()}>{t('Try again')}</Button>}
            />
          ) : (
            <EmptyState
              icon={WifiOff}
              title={t("You're offline")}
              description={t('This page keeps retrying in the background — it will load as soon as you reconnect.')}
              action={<Button variant="secondary" size="sm" onClick={() => window.location.reload()}>{t('Try again')}</Button>}
            />
          )}
        </Panel>
      ) : (
      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_21rem]">
        <div className={cn('min-w-0', pane !== 'calendar' && 'hidden xl:block')}>
        {view === 'month' ? (
          <Panel className="min-h-[37rem] overflow-hidden">
            <div className="grid grid-cols-7 border-b border-line bg-surface-2">{WEEKDAYS.map((day) => <div key={day} className="px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.05em] text-ink-3">{t(day)}</div>)}</div>
            <div className="grid grid-cols-7">
              {days.map((date, index) => {
                const events = visible(eventMap.get(dayKey(date)))
                const inMonth = date.getMonth() === anchor.getMonth()
                const isToday = sameDay(date, today)
                return (
                  <button key={dayKey(date)} onClick={() => openDay(date)} className={cn('group min-h-[64px] border-b border-r border-line p-1 text-start transition-colors hover:bg-primary-tint/25 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-primary sm:min-h-[112px] sm:p-1.5', index % 7 === 6 && 'border-r-0', !inMonth && 'bg-surface-2/40')} aria-label={`${formatLongDate(date)} — ${events.length} events`}>
                    <div className="mb-1 flex items-center justify-between">
                      <Icon icon={Plus} size={12} className="text-ink-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      <span className={cn('tnum grid size-6 place-items-center rounded-full text-[12px] font-medium', isToday ? 'bg-primary text-on-primary' : inMonth ? 'text-ink-2' : 'text-ink-3')}>{date.getDate()}</span>
                    </div>
                    <div className="hidden space-y-1 sm:block">{events.slice(0, 3).map((event) => <Chip key={event.id} event={event} />)}{events.length > 3 && <div className="px-1.5 text-[10.5px] font-medium text-ink-3">+{events.length - 3} {t('more')}</div>}</div>
                    {events.length > 0 && <div className="mt-1 flex flex-wrap justify-end gap-0.5 sm:hidden">{events.slice(0, 3).map((event) => <span key={event.id} className={cn('size-1.5 rounded-full', event.layer === 'curriculum' ? 'bg-primary' : isTaskEvent(event) ? 'border border-primary bg-surface' : 'border border-line-2 bg-surface')} />)}{events.length > 3 && <span className="font-mono text-[8px] leading-none text-ink-3">+{events.length - 3}</span>}</div>}
                  </button>
                )
              })}
            </div>
          </Panel>
        ) : (
          <Panel className="min-h-[37rem] overflow-hidden p-2">
            {days.map((date, index) => {
              const events = visible(eventMap.get(dayKey(date)))
              return <Panel key={dayKey(date)} className="flex flex-col gap-2 p-3 sm:flex-row sm:gap-3"><button onClick={() => openDay(date)} className="flex min-h-11 w-full shrink-0 items-center gap-2 rounded-md text-start hover:bg-inset sm:min-h-0 sm:w-28"><span className="text-[12px] font-medium uppercase tracking-wide text-ink-3">{t(WEEKDAYS[index])}</span><span className={cn('tnum grid size-8 place-items-center rounded-full font-serif text-[16px] font-semibold', sameDay(date, today) ? 'bg-primary text-on-primary' : 'text-ink')}>{date.getDate()}</span></button><div className="grid min-w-0 flex-1 grid-cols-1 gap-1.5 sm:grid-cols-2">{events.length ? events.map((event) => <button key={event.id} type="button" onClick={() => showEvent(event)} className="min-w-0 text-start max-sm:grid max-sm:min-h-11 max-sm:items-center"><Chip event={event} /></button>) : <button onClick={() => setDialogDate(date)} className="min-h-11 rounded-md border border-dashed border-line px-3 py-2 text-start text-[12.5px] text-ink-3 hover:border-line-2 sm:min-h-0">+ {t('Add a block')}</button>}</div></Panel>
            })}
          </Panel>
        )}

        </div>

        <div className={cn('min-w-0 xl:sticky xl:top-[4.5rem]', pane !== 'tasks' && 'hidden xl:block')}>
          <TaskList
            selectedDay={taskDay}
            highlightedId={highlightedTask}
            onAdded={() => setTaskDay(null)}
            prelude={(nextEvent || nextMilestone) ? (
              <div className="space-y-2 border-b border-line bg-mist px-3 py-2.5">
                {nextEvent && (
                  <div className="flex items-start gap-2">
                    <Icon icon={Clock} size={14} className="mt-0.5 shrink-0 text-ink-3" />
                    <span className="min-w-0 flex-1 text-[12.5px] leading-snug text-on-mist">
                      <span className="text-ink-2">{t('Next')}: </span>
                      <span className="tnum font-mono text-[11px] text-ink-2">{formatTimeString(nextEvent.time)}</span>{' '}
                      <button type="button" onClick={() => setDetailEvent(nextEvent)} className="text-start font-medium hover:text-primary-strong">{nextEvent.title}</button>
                    </span>
                    {nextAction && <ButtonLink to={nextAction.to} variant="ghost" size="sm" iconRight={ArrowRight} className="shrink-0">{t(nextAction.label)}</ButtonLink>}
                  </div>
                )}
                {nextMilestone && (
                  <div className="flex items-center gap-2 text-[12px] text-ink-2">
                    <Icon icon={CalendarDays} size={14} className="shrink-0 text-ink-3" />
                    <span className="min-w-0 flex-1 truncate">{nextMilestone.isExam ? t('Next exam') : t('Deadline')}: <span className="font-medium text-on-mist">{nextMilestone.title || nextMilestone.label}</span></span>
                    <span className="tnum shrink-0 font-mono text-[11px] text-ink-3">{formatLongDate(nextMilestone.start)}</span>
                  </div>
                )}
              </div>
            ) : undefined}
          />
        </div>
      </div>
      )}

      {!calendarLoading && !calendarError && !hasYear && (
        <Panel className="mt-3 p-4">
          <EmptyState
            icon={CalendarDays}
            title={t('No university timetable yet')}
            description={t("Your university hasn't published a schedule for your year, so only the blocks you plan yourself appear here.")}
          />
        </Panel>
      )}
      {daySheet && (
        <DaySheet
          date={daySheet}
          events={visible(eventMap.get(dayKey(daySheet)))}
          onClose={() => setDaySheet(null)}
          onEvent={showEvent}
          onAdd={() => { const d = daySheet; setDaySheet(null); setDialogDate(d) }}
          onAddTask={() => { const d = daySheet; setDaySheet(null); setTaskDay(isoDay(d)); setPane('tasks') }}
          onToggleTask={(id) => tasksApi.toggleTask(id)}
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

function UniversityButton({ className }: { className?: string }) {
  const t = useT()
  return (
          <button
            type="button"
            disabled
            title={`${t('University')} · ${t('Coming soon')}`}
            className={cn('min-h-11 items-center gap-2 rounded-lg border border-line bg-surface-2 px-2.5 py-0.5 text-ink-3 sm:min-h-8', className ?? 'inline-flex')}
          >
            <Icon icon={GraduationCap} size={16} />
            <span className="grid text-start leading-tight">
              <span className="text-[12px] font-medium">{t('University')}</span>
              <span className="text-[10px]">{t('Coming soon')}</span>
            </span>
          </button>
  )
}
