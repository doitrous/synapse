import { useMemo, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Plus, X } from 'lucide-react'
import type { CalEvent } from '@/data/calendar'
import { monthEvents } from '@/data/calendar'
import { getSubject, subjects } from '@/data/student'
import { PageContainer } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Segmented } from '@/components/ui/Tabs'
import { Toggle } from '@/components/ui/Toggle'
import { Field, Select, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { usePersistentState } from '@/lib/usePersistentState'
import { formatLongDate, formatTimeString } from '@/lib/format'
import { cn } from '@/lib/cn'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

interface StoredBlock {
  id: string
  title: string
  date: string
  start: string
  end: string
  subjectId: string
  kind: string
}

function isoDay(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
function dayKey(date: Date) {
  return isoDay(date)
}
function fromIsoDay(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}
function startOfWeek(date: Date) {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  copy.setDate(copy.getDate() - ((copy.getDay() + 6) % 7))
  return copy
}
function addDays(date: Date, amount: number) {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + amount)
  return copy
}
function sameDay(a: Date, b: Date) {
  return dayKey(a) === dayKey(b)
}
function durationMinutes(start: string, end: string) {
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  return Math.max(0, eh * 60 + em - sh * 60 - sm)
}

function generatedEvents(days: Date[]) {
  const months = new Map<string, [number, number]>()
  days.forEach((date) => months.set(`${date.getFullYear()}-${date.getMonth()}`, [date.getFullYear(), date.getMonth()]))
  return [...months.values()].flatMap(([year, month]) => monthEvents(year, month))
}

function Chip({ event }: { event: CalEvent }) {
  const subject = getSubject(event.subjectId)
  const curriculum = event.layer === 'curriculum'
  return (
    <div className={cn(
      'flex min-w-0 items-center gap-1.5 truncate rounded px-1.5 py-1 text-[10.5px]',
      curriculum ? 'bg-accent-tint font-medium text-accent-strong' : 'border border-dashed border-line-2 bg-surface text-ink-2',
    )}>
      {!curriculum && <span className="h-3 w-0.5 shrink-0 rounded-full" style={{ backgroundColor: subject.color }} />}
      <span className="tnum shrink-0 font-mono text-[9.5px] opacity-75">{formatTimeString(event.time)}</span>
      <span className="truncate">{event.title}</span>
    </div>
  )
}

function BlockDialog({ date, onClose, onSave }: { date: Date; onClose: () => void; onSave: (block: Omit<StoredBlock, 'id'>) => void }) {
  const [title, setTitle] = useState('')
  const [start, setStart] = useState('17:00')
  const [end, setEnd] = useState('18:00')
  const [subjectId, setSubjectId] = useState('cvs')
  const [kind, setKind] = useState('Study block')
  const valid = title.trim() && durationMinutes(start, end) > 0

  return (
    <div className="fixed inset-0 z-50 grid items-end bg-ink/30 p-0 animate-fade sm:place-items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Add a study block" onMouseDown={onClose}>
      <Panel className="animate-pop max-h-[calc(100dvh-env(safe-area-inset-top))] w-full overflow-y-auto overscroll-contain rounded-b-none pb-[env(safe-area-inset-bottom)] shadow-pop sm:max-w-lg sm:rounded-xl" onMouseDown={(event) => event.stopPropagation()}>
        <PanelHeader title="Add a study block" icon={CalendarDays} action={<IconButton icon={X} label="Close" size="sm" onClick={onClose} />} />
        <form className="space-y-4 p-5" onSubmit={(event) => {
          event.preventDefault()
          if (!valid) return
          onSave({ title: title.trim(), date: isoDay(date), start, end, subjectId, kind })
        }}>
          <p className="text-[13px] text-ink-2">{formatLongDate(date)}</p>
          <Field label="What are you working on?" htmlFor="block-title">
            <TextInput id="block-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Heart failure question set" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Starts"><TextInput type="time" value={start} onChange={(event) => setStart(event.target.value)} /></Field>
            <Field label="Ends" hint={durationMinutes(start, end) <= 0 ? 'End time must be later.' : undefined}><TextInput type="time" value={end} onChange={(event) => setEnd(event.target.value)} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Subject"><Select value={subjectId} onChange={(event) => setSubjectId(event.target.value)}>{subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}</Select></Field>
            <Field label="Type"><Select value={kind} onChange={(event) => setKind(event.target.value)}><option>Study block</option><option>Question bank</option><option>Library reading</option><option>Practical</option><option>Test</option></Select></Field>
          </div>
          <div className="flex justify-end gap-2 border-t border-line pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" iconLeft={Plus} disabled={!valid}>Add block</Button>
          </div>
        </form>
      </Panel>
    </div>
  )
}

export function CalendarPage() {
  const [anchor, setAnchor] = useState(() => new Date())
  const [view, setView] = useState('month')
  const [showCurriculum, setShowCurriculum] = useState(true)
  const [showPersonal, setShowPersonal] = useState(true)
  const [dialogDate, setDialogDate] = useState<Date | null>(null)
  const [blocks, setBlocks] = usePersistentState<StoredBlock[]>('synapse.calendar.blocks', [])
  const today = new Date()

  const days = useMemo(() => {
    if (view === 'week') {
      const start = startOfWeek(anchor)
      return Array.from({ length: 7 }, (_, index) => addDays(start, index))
    }
    const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1)
    const gridStart = startOfWeek(first)
    return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index))
  }, [anchor, view])

  const eventMap = useMemo(() => {
    const map = new Map<string, CalEvent[]>()
    const add = (event: CalEvent) => map.set(dayKey(event.date), [...(map.get(dayKey(event.date)) ?? []), event])
    generatedEvents(days).forEach(add)
    blocks.forEach((block) => add({ id: block.id, title: block.title, date: fromIsoDay(block.date), time: block.start, layer: 'personal', subjectId: block.subjectId, kind: block.kind }))
    map.forEach((events) => events.sort((a, b) => a.time.localeCompare(b.time)))
    return map
  }, [blocks, days])

  const visible = (events: CalEvent[] = []) => events.filter((event) => event.layer === 'curriculum' ? showCurriculum : showPersonal)
  const todayEvents = visible(eventMap.get(dayKey(today)))
  const weekStart = startOfWeek(anchor)
  const weekDays = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index))
  const weekEvents = weekDays.flatMap((day) => visible(eventMap.get(dayKey(day))))
  const taughtMinutes = weekEvents.filter((event) => event.layer === 'curriculum').length * 60
  const plannedBlocks = blocks.filter((block) => weekDays.some((day) => block.date === isoDay(day)))
  const plannedMinutes = plannedBlocks.reduce((total, block) => total + durationMinutes(block.start, block.end), 0)

  function shift(direction: number) {
    if (view === 'week') setAnchor((date) => addDays(date, direction * 7))
    else setAnchor((date) => new Date(date.getFullYear(), date.getMonth() + direction, 1))
  }
  function saveBlock(block: Omit<StoredBlock, 'id'>) {
    setBlocks((current) => [...current, { ...block, id: `block-${Date.now()}` }])
    setDialogDate(null)
  }

  const label = view === 'week'
    ? `${formatLongDate(startOfWeek(anchor))} – ${formatLongDate(addDays(startOfWeek(anchor), 6))}`
    : `${MONTHS[anchor.getMonth()]} ${anchor.getFullYear()}`

  return (
    <PageContainer>
      <div className="mb-4 flex min-w-0 flex-wrap items-center justify-between gap-3">
        <div className="flex w-full min-w-0 items-center gap-1.5 sm:w-auto sm:gap-2">
          <IconButton icon={ChevronLeft} label="Previous" variant="surface" size="sm" onClick={() => shift(-1)} />
          <h1 className="min-w-0 flex-1 truncate text-center font-serif text-[16px] font-semibold text-ink sm:min-w-[11rem] sm:flex-none sm:text-[19px]">{label}</h1>
          <IconButton icon={ChevronRight} label="Next" variant="surface" size="sm" onClick={() => shift(1)} />
          <Button className="hidden sm:inline-flex" variant="secondary" size="sm" onClick={() => setAnchor(new Date())}>Today</Button>
        </div>
        <div className="flex w-full flex-nowrap items-center gap-3 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:w-auto sm:flex-wrap sm:overflow-visible sm:pb-0">
          <Button className="shrink-0 sm:hidden" variant="secondary" size="sm" onClick={() => setAnchor(new Date())}>Today</Button>
          <label className="flex cursor-pointer items-center gap-2 text-[13px] text-ink-2"><span className="size-2.5 rounded-sm bg-accent-tint ring-1 ring-accent-line" />Curriculum<Toggle checked={showCurriculum} onChange={setShowCurriculum} label="Curriculum" /></label>
          <label className="flex cursor-pointer items-center gap-2 text-[13px] text-ink-2"><span className="size-2.5 rounded-sm border border-dashed border-line-2 bg-surface" />Personal<Toggle checked={showPersonal} onChange={setShowPersonal} label="Personal" tint="#55605c" /></label>
          <Segmented value={view} onChange={setView} items={[{ value: 'month', label: 'Month' }, { value: 'week', label: 'Week' }]} />
          <Button variant="primary" size="sm" iconLeft={Plus} onClick={() => setDialogDate(new Date())}>Add block</Button>
        </div>
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_20rem]">
        {view === 'month' ? (
          <Panel className="overflow-hidden">
            <div className="grid grid-cols-7 border-b border-line bg-surface-2">{WEEKDAYS.map((day) => <div key={day} className="px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.05em] text-ink-3">{day}</div>)}</div>
            <div className="grid grid-cols-7">
              {days.map((date, index) => {
                const events = visible(eventMap.get(dayKey(date)))
                const inMonth = date.getMonth() === anchor.getMonth()
                const isToday = sameDay(date, today)
                return (
                  <button key={dayKey(date)} onClick={() => setDialogDate(date)} className={cn('group min-h-[64px] border-b border-r border-line p-1 text-left transition-colors hover:bg-accent-tint/25 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-accent sm:min-h-[112px] sm:p-1.5', index % 7 === 6 && 'border-r-0', !inMonth && 'bg-surface-2/40')} aria-label={`Add block on ${formatLongDate(date)}`}>
                    <div className="mb-1 flex items-center justify-between">
                      <Icon icon={Plus} size={12} className="text-ink-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      <span className={cn('tnum grid size-6 place-items-center rounded-full text-[12px] font-medium', isToday ? 'bg-accent text-on-accent' : inMonth ? 'text-ink-2' : 'text-ink-3')}>{date.getDate()}</span>
                    </div>
                    <div className="hidden space-y-1 sm:block">{events.slice(0, 3).map((event) => <Chip key={event.id} event={event} />)}{events.length > 3 && <div className="px-1.5 text-[10.5px] font-medium text-ink-3">+{events.length - 3} more</div>}</div>
                    {events.length > 0 && <div className="mt-1 flex flex-wrap justify-end gap-0.5 sm:hidden">{events.slice(0, 3).map((event) => <span key={event.id} className={cn('size-1.5 rounded-full', event.layer === 'curriculum' ? 'bg-accent' : 'border border-line-2 bg-surface')} />)}{events.length > 3 && <span className="font-mono text-[8px] leading-none text-ink-3">+{events.length - 3}</span>}</div>}
                  </button>
                )
              })}
            </div>
          </Panel>
        ) : (
          <div className="space-y-2">
            {days.map((date, index) => {
              const events = visible(eventMap.get(dayKey(date)))
              return <Panel key={dayKey(date)} className="flex flex-col gap-2 p-3 sm:flex-row sm:gap-3"><button onClick={() => setDialogDate(date)} className="flex w-full shrink-0 items-center gap-2 rounded-md text-left hover:bg-inset sm:w-28"><span className="text-[12px] font-medium uppercase tracking-wide text-ink-3">{WEEKDAYS[index]}</span><span className={cn('tnum grid size-8 place-items-center rounded-full font-serif text-[16px] font-semibold', sameDay(date, today) ? 'bg-accent text-on-accent' : 'text-ink')}>{date.getDate()}</span></button><div className="grid min-w-0 flex-1 gap-1.5 sm:grid-cols-2">{events.length ? events.map((event) => <Chip key={event.id} event={event} />) : <button onClick={() => setDialogDate(date)} className="rounded-md border border-dashed border-line px-3 py-2 text-left text-[12.5px] text-ink-3 hover:border-line-2">+ Add a block</button>}</div></Panel>
            })}
          </div>
        )}

        <aside className="space-y-4 xl:sticky xl:top-[4.5rem]">
          <Panel>
            <PanelHeader title="Today's view" icon={Clock} hint={formatLongDate(today)} />
            <div className="p-3">
              {todayEvents.length ? <ul className="space-y-2">{todayEvents.map((event) => <li key={event.id} className="grid grid-cols-[4.5rem_1fr] gap-2 rounded-lg border border-line bg-surface-2/50 p-2.5"><span className="tnum font-mono text-[10.5px] text-ink-3">{formatTimeString(event.time)}</span><span><span className="block text-[12.5px] font-medium text-ink">{event.title}</span><span className="mt-0.5 block text-[11px] text-ink-3">{event.kind}</span></span></li>)}</ul> : <div className="rounded-lg border border-line bg-surface-2 p-4"><p className="text-[13px] font-medium text-ink">Nothing scheduled</p><p className="mt-2 text-[13px] leading-relaxed text-ink-2">A clear day. If it is deliberate, leave it clear—recovery is part of the plan.</p></div>}
              <Button className="mt-3 w-full" variant="secondary" size="sm" iconLeft={Plus} onClick={() => setDialogDate(today)}>Add to today</Button>
            </div>
          </Panel>
          <Panel>
            <PanelHeader title="Where the week goes" />
            <div className="divide-y divide-line px-4 py-1">
              <div className="flex items-start justify-between py-3"><span className="text-[13.5px] text-ink-2">Taught</span><span className="text-right"><strong className="tnum block font-mono text-[16px] text-ink">{(taughtMinutes / 60).toFixed(1)} h</strong><span className="text-[11.5px] text-ink-3">{weekEvents.filter((event) => event.layer === 'curriculum').length} sessions</span></span></div>
              <div className="flex items-start justify-between py-3"><span className="text-[13.5px] text-ink-2">Your plan</span><span className="text-right"><strong className="tnum block font-mono text-[16px] text-ink">{(plannedMinutes / 60).toFixed(1)} h</strong><span className="text-[11.5px] text-ink-3">{plannedBlocks.length} blocks</span></span></div>
            </div>
          </Panel>
        </aside>
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-[12px] text-ink-3"><CalendarDays size={13} />Select any day to add a personal block. Curriculum sessions are filled; your plan is outlined.</p>
      {dialogDate && <BlockDialog date={dialogDate} onClose={() => setDialogDate(null)} onSave={saveBlock} />}
    </PageContainer>
  )
}
