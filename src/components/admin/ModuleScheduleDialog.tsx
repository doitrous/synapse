import { useMemo, useState } from 'react'
import {
  BookOpenText,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock,
  FileQuestion,
  Hash,
  MapPin,
  Plus,
  Stethoscope,
  Trash2,
  X,
} from 'lucide-react'
import type { CurriculumCourse } from '@/data/universities'
import type { ManagedContentItem } from '@/data/contentControl'
import type { CourseCurriculumSelection } from './CourseCurriculumDialog'
import {
  EXAM_BLOCK_TYPES,
  MODULE_BLOCK_LABEL,
  MODULE_BLOCK_TYPES,
  emptyModuleScheduleBlock,
  type ModuleScheduleBlock,
  type ModuleScheduleBlockType,
} from '@/data/moduleSchedule'
import { getSubject } from '@/data/subjects'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Field, SearchInput, Select, Textarea, TextInput } from '@/components/ui/Field'
import { DateField, TimeField } from '@/components/ui/DateTimeField'
import { Icon } from '@/components/ui/Icon'
import { Toggle } from '@/components/ui/Toggle'
import { cn } from '@/lib/cn'
import { formatLongDate, formatTimeString } from '@/lib/format'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const TYPE_STYLE: Record<ModuleScheduleBlockType, string> = {
  lecture: 'border-primary-line bg-primary-tint text-primary-strong',
  practical: 'border-success/25 bg-success-tint text-success',
  review: 'border-warning/25 bg-warning-tint text-warning',
  midterm: 'border-danger/25 bg-danger-tint text-danger',
  midyear: 'border-danger/25 bg-danger-tint text-danger',
  term: 'border-danger/25 bg-danger-tint text-danger',
  final: 'border-danger/25 bg-danger-tint text-danger',
  logbook: 'border-line-2 bg-inset text-ink-2',
}

function isoDay(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function addDays(date: Date, amount: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

function startOfWeek(date: Date) {
  const next = new Date(date)
  next.setDate(next.getDate() - ((next.getDay() + 6) % 7))
  return next
}

function durationValid(block: ModuleScheduleBlock) {
  if (block.type === 'logbook') return true
  return block.startTime !== '' && block.endTime !== '' && block.endTime > block.startTime
}

function BlockChip({ block, onClick }: { block: ModuleScheduleBlock; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={(event) => { event.stopPropagation(); onClick() }}
      className={cn('flex w-full items-center gap-1.5 truncate rounded-md border px-2 py-1 text-start text-[10.5px] font-semibold transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-sm', TYPE_STYLE[block.type])}
      title={`${MODULE_BLOCK_LABEL[block.type]} · ${block.title}`}
    >
      {block.type === 'logbook' ? <Icon icon={ClipboardCheck} size={11} /> : <span className="tnum font-mono text-[9.5px] opacity-75">{formatTimeString(block.startTime)}</span>}
      <span className={cn('truncate', block.completed && 'line-through opacity-65')}>{block.title}</span>
    </button>
  )
}

function matchesSelectedTopics(item: ManagedContentItem, articles: ManagedContentItem[]) {
  if (articles.length === 0) return false
  const articleIds = new Set(articles.map((article) => article.id))
  if (item.questionData?.libraryIds.some((id) => articleIds.has(id))) return true
  const topicTerms = articles.flatMap((article) => [article.title, article.fields.Topic]).filter(Boolean).map((value) => value.toLowerCase())
  const itemText = `${item.title} ${item.fields.Topic ?? ''} ${item.questionData?.tags.topic ?? ''} ${item.questionData?.tags.subtopic ?? ''}`.toLowerCase()
  if (topicTerms.some((term) => itemText.includes(term) || term.includes(itemText))) return true
  if (item.kind !== 'practical' || !articles.some((article) => article.subjectId === item.subjectId)) return false
  const subjectName = getSubject(item.subjectId).name.toLowerCase()
  return itemText.includes(subjectName)
}

function AssessmentSelection({
  title,
  icon,
  enabled,
  onEnabled,
  automatic,
  manualIds,
  items,
  onToggle,
}: {
  title: string
  icon: typeof FileQuestion
  enabled: boolean
  onEnabled: (value: boolean) => void
  automatic: ManagedContentItem[]
  manualIds: string[]
  items: ManagedContentItem[]
  onToggle: (id: string) => void
}) {
  const [query, setQuery] = useState('')
  const filtered = items.filter((item) => `${item.title} ${item.fields.Topic ?? ''}`.toLowerCase().includes(query.toLowerCase()))
  return (
    <section className="rounded-xl border border-line bg-surface">
      <div className="flex items-center gap-2 border-b border-line px-3 py-2.5">
        <Icon icon={icon} size={15} className="text-ink-3" />
        <h4 className="flex-1 text-[12.5px] font-bold text-ink">{title}</h4>
        <span className="font-mono text-[10.5px] text-ink-3">{enabled ? automatic.length : 0} auto · {manualIds.length} manual</span>
      </div>
      <div className="space-y-3 p-3">
        <div className="flex items-center justify-between gap-3 rounded-lg bg-inset px-3 py-2">
          <span><span className="block text-[12px] font-semibold text-ink">Include topic matches automatically</span><span className="block text-[10.5px] text-ink-3">Updates when the exam topics change.</span></span>
          <Toggle checked={enabled} onChange={onEnabled} label={`Automatically include ${title.toLowerCase()}`} />
        </div>
        <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Add ${title.toLowerCase()} manually…`} />
        <div className="max-h-40 space-y-1 overflow-y-auto pr-1">
          {filtered.map((item) => {
            const checked = manualIds.includes(item.id)
            return <label key={item.id} className={cn('flex cursor-pointer items-start gap-2 rounded-lg border px-2.5 py-2 transition-colors', checked ? 'border-primary-line bg-primary-tint/40' : 'border-transparent hover:bg-inset')}><input type="checkbox" className="mt-0.5 size-4 accent-[var(--color-primary)]" checked={checked} onChange={() => onToggle(item.id)} /><span className="min-w-0"><span className="line-clamp-2 block text-[11.5px] font-medium leading-snug text-ink">{item.title}</span><span className="mt-0.5 block text-[10px] text-ink-3">{item.fields.Topic || getSubject(item.subjectId).name}</span></span></label>
          })}
          {filtered.length === 0 && <p className="py-4 text-center text-[11px] text-ink-3">No matching items.</p>}
        </div>
      </div>
    </section>
  )
}

export function ModuleScheduleDialog({
  module,
  university,
  year,
  items,
  curriculum,
  value,
  onClose,
  onChange,
}: {
  module: CurriculumCourse
  university: string
  year: string
  items: ManagedContentItem[]
  curriculum?: CourseCurriculumSelection
  value: ModuleScheduleBlock[]
  onClose: () => void
  onChange: (value: ModuleScheduleBlock[]) => void
}) {
  const [anchor, setAnchor] = useState(() => {
    const first = value.find((block) => block.date)?.date
    return first ? new Date(`${first}T12:00:00`) : new Date()
  })
  const [draft, setDraft] = useState<ModuleScheduleBlock | null>(null)
  const articles = useMemo(() => items.filter((item) => item.kind === 'article'), [items])
  const curriculumArticles = useMemo(() => new Set(curriculum?.articleIds ?? []), [curriculum])
  const questions = useMemo(() => items.filter((item) => item.kind === 'question'), [items])
  const practicals = useMemo(() => items.filter((item) => item.kind === 'practical'), [items])
  const selectedArticles = useMemo(() => articles.filter((item) => draft?.topicIds.includes(item.id)), [articles, draft?.topicIds])
  const automaticQuestions = useMemo(() => questions.filter((item) => matchesSelectedTopics(item, selectedArticles)), [questions, selectedArticles])
  const automaticPracticals = useMemo(() => practicals.filter((item) => matchesSelectedTopics(item, selectedArticles)), [practicals, selectedArticles])
  const isExam = draft ? EXAM_BLOCK_TYPES.includes(draft.type) : false

  const days = useMemo(() => {
    const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1)
    const start = startOfWeek(first)
    return Array.from({ length: 42 }, (_, index) => addDays(start, index))
  }, [anchor])

  const byDate = useMemo(() => {
    const map = new Map<string, ModuleScheduleBlock[]>()
    value.forEach((block) => map.set(block.date, [...(map.get(block.date) ?? []), block]))
    map.forEach((blocks) => blocks.sort((a, b) => a.startTime.localeCompare(b.startTime)))
    return map
  }, [value])

  function patch<K extends keyof ModuleScheduleBlock>(key: K, next: ModuleScheduleBlock[K]) {
    setDraft((current) => current ? { ...current, [key]: next } : current)
  }

  function startBlock(date: string, type: ModuleScheduleBlockType = 'lecture') {
    setDraft(emptyModuleScheduleBlock(date, type))
  }

  function saveBlock() {
    if (!draft || !draft.title.trim() || !draft.date || !durationValid(draft)) return
    const saved: ModuleScheduleBlock = {
      ...draft,
      title: draft.title.trim(),
      location: draft.location.trim(),
      moduleNumber: draft.moduleNumber.trim(),
      automaticQuestionIds: draft.automaticQuestions ? automaticQuestions.map((item) => item.id) : [],
      automaticPracticalIds: draft.automaticPracticals ? automaticPracticals.map((item) => item.id) : [],
    }
    onChange(value.some((block) => block.id === saved.id) ? value.map((block) => block.id === saved.id ? saved : block) : [...value, saved])
    setDraft(null)
  }

  function removeBlock() {
    if (!draft) return
    onChange(value.filter((block) => block.id !== draft.id))
    setDraft(null)
  }

  function toggleList(key: 'topicIds' | 'manualQuestionIds' | 'manualPracticalIds', id: string) {
    if (!draft) return
    patch(key, draft[key].includes(id) ? draft[key].filter((itemId) => itemId !== id) : [...draft[key], id])
  }

  const logbooks = value.filter((block) => block.type === 'logbook')

  return (
    <div className="fixed inset-0 z-50 bg-ink/25 p-0 backdrop-blur-[2px] sm:p-3" role="dialog" aria-modal="true" aria-labelledby="module-schedule-title">
      <div className="mx-auto flex h-full w-full max-w-[1500px] flex-col overflow-hidden border border-line bg-paper pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] shadow-float sm:rounded-2xl sm:pb-0 sm:pt-0">
        <header className="flex flex-wrap items-center gap-2 border-b border-line bg-surface px-3 py-3 sm:gap-3 sm:px-5 sm:py-4">
          <span className="grid size-10 place-items-center rounded-xl bg-primary-tint text-primary-strong"><Icon icon={CalendarDays} size={19} /></span>
          <div className="min-w-0 flex-1"><h2 id="module-schedule-title" className="font-serif text-[20px] font-semibold text-ink">{module.name} schedule</h2><p className="text-[11.5px] text-ink-3">{university} · {year} · {module.block}</p></div>
          <Button type="button" variant="primary" size="md" iconLeft={Plus} onClick={() => startBlock(isoDay(new Date()))}>Add block</Button>
          <button type="button" onClick={onClose} className="grid size-10 place-items-center rounded-lg text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close module schedule"><Icon icon={X} size={18} /></button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto xl:grid xl:grid-cols-[minmax(0,1fr)_25rem] xl:overflow-hidden">
          <main className="min-h-0 p-3 sm:p-5 xl:overflow-y-auto">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() - 1, 1))} className="grid size-10 place-items-center rounded-lg border border-line bg-surface text-ink-2 hover:bg-inset" aria-label="Previous month"><Icon icon={ChevronLeft} size={17} /></button>
                <h3 className="min-w-48 text-center font-serif text-[18px] font-semibold text-ink">{MONTHS[anchor.getMonth()]} {anchor.getFullYear()}</h3>
                <button type="button" onClick={() => setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1))} className="grid size-10 place-items-center rounded-lg border border-line bg-surface text-ink-2 hover:bg-inset" aria-label="Next month"><Icon icon={ChevronRight} size={17} /></button>
                <Button type="button" size="sm" variant="secondary" onClick={() => setAnchor(new Date())}>Today</Button>
              </div>
              <div className="flex flex-wrap gap-2 text-[10.5px] text-ink-3"><span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-primary" />Teaching</span><span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-success" />Practical</span><span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-warning" />Review</span><span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-danger" />Exam</span></div>
            </div>

            <div className="overflow-x-auto overscroll-x-contain rounded-xl border border-line bg-surface shadow-panel">
              <div className="grid min-w-[42rem] grid-cols-7 border-b border-line bg-surface-2 sm:min-w-0">{WEEKDAYS.map((day) => <div key={day} className="px-2 py-2 text-[10.5px] font-bold uppercase tracking-[0.06em] text-ink-3">{day}</div>)}</div>
              <div className="grid min-w-[42rem] grid-cols-7 sm:min-w-0">
                {days.map((day, index) => {
                  const key = isoDay(day)
                  const blocks = byDate.get(key) ?? []
                  const inMonth = day.getMonth() === anchor.getMonth()
                  const today = key === isoDay(new Date())
                  return <div key={key} className={cn('group min-h-[118px] border-b border-r border-line p-1.5 text-start transition-colors hover:bg-primary-tint/20', index % 7 === 6 && 'border-r-0', !inMonth && 'bg-surface-2/45')}><button type="button" onClick={() => startBlock(key)} className="mb-1 flex w-full items-center justify-between rounded-md focus-visible:outline-2 focus-visible:outline-primary" aria-label={`Add a block on ${key}`}><Icon icon={Plus} size={12} className="text-ink-3 opacity-0 transition-opacity group-hover:opacity-100" /><span className={cn('tnum grid size-6 place-items-center rounded-full text-[11.5px] font-semibold', today ? 'bg-primary text-on-primary' : inMonth ? 'text-ink-2' : 'text-ink-3')}>{day.getDate()}</span></button><div className="space-y-1">{blocks.slice(0, 4).map((block) => <BlockChip key={block.id} block={block} onClick={() => setDraft(structuredClone(block))} />)}{blocks.length > 4 && <span className="block px-1 text-[10px] font-medium text-ink-3">+{blocks.length - 4} more</span>}</div></div>
                })}
              </div>
            </div>
            <p className="mt-3 text-[11.5px] text-ink-3">Select any day to place a session. Select a block to edit its venue, topic links, or assessment blueprint.</p>
          </main>

          <aside className="min-h-0 border-t border-line bg-surface-2/45 xl:overflow-y-auto xl:border-l xl:border-t-0">
            {draft ? (
              <div>
                <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-line bg-surface px-4 py-3"><div className="min-w-0 flex-1"><p className="text-[10.5px] font-bold uppercase tracking-[0.07em] text-primary">{value.some((block) => block.id === draft.id) ? 'Edit block' : 'New block'}</p><p className="truncate text-[13px] font-semibold text-ink">{draft.title || MODULE_BLOCK_LABEL[draft.type]}</p></div><button type="button" onClick={() => setDraft(null)} className="grid size-9 place-items-center rounded-lg text-ink-3 hover:bg-inset" aria-label="Close block editor"><Icon icon={X} size={16} /></button></div>
                <div className="space-y-4 p-4">
                  <Field label="Block type"><Select value={draft.type} onChange={(event) => patch('type', event.target.value as ModuleScheduleBlockType)}>{MODULE_BLOCK_TYPES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</Select></Field>
                  <Field label={draft.type === 'logbook' ? 'Task' : 'Session title'}><TextInput value={draft.title} onChange={(event) => patch('title', event.target.value)} placeholder={draft.type === 'logbook' ? 'e.g. Complete 8 cannulations' : 'e.g. Acute coronary syndromes'} /></Field>
                  <div className="grid grid-cols-2 gap-3"><Field label={draft.type === 'logbook' ? 'Due date' : 'Date'}><DateField value={draft.date} onChange={(next) => patch('date', next)} /></Field><Field label="Module number" hint="Optional"><div className="relative"><Icon icon={Hash} size={14} className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-ink-3" /><TextInput className="ps-8" value={draft.moduleNumber} onChange={(event) => patch('moduleNumber', event.target.value)} placeholder="e.g. 04" /></div></Field></div>
                  {draft.type !== 'logbook' && <><div className="grid grid-cols-2 gap-3"><Field label="Starts"><TimeField value={draft.startTime} onChange={(next) => patch('startTime', next)} /></Field><Field label="Ends" hint={!durationValid(draft) ? 'Must be later than start.' : undefined}><TimeField value={draft.endTime} onChange={(next) => patch('endTime', next)} after={draft.startTime} /></Field></div><Field label="Location / place"><div className="relative"><Icon icon={MapPin} size={14} className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-ink-3" /><TextInput className="ps-8" value={draft.location} onChange={(event) => patch('location', event.target.value)} placeholder="e.g. Clinical skills centre · Room 2" /></div></Field></>}
                  <Field label="Notes or instructions" hint={draft.type === 'logbook' ? 'Describe the evidence or sign-off required.' : undefined}><Textarea value={draft.notes} onChange={(event) => patch('notes', event.target.value)} placeholder="Add information students need before attending…" /></Field>

                  <section><div className="mb-2 flex items-center justify-between"><div className="flex items-center gap-2"><Icon icon={BookOpenText} size={15} className="text-ink-3" /><h4 className="text-[12.5px] font-bold text-ink">Tagged library topics</h4></div><Badge tone={draft.topicIds.length ? 'primary' : 'neutral'}>{draft.topicIds.length}</Badge></div><div className="max-h-52 space-y-1 overflow-y-auto rounded-xl border border-line bg-surface p-2">{articles.sort((a, b) => Number(curriculumArticles.has(b.id)) - Number(curriculumArticles.has(a.id))).map((article) => { const checked = draft.topicIds.includes(article.id); return <label key={article.id} className={cn('flex cursor-pointer items-start gap-2 rounded-lg px-2 py-2 transition-colors', checked ? 'bg-primary-tint/55' : 'hover:bg-inset')}><input type="checkbox" className="mt-0.5 size-4 accent-[var(--color-primary)]" checked={checked} onChange={() => toggleList('topicIds', article.id)} /><span className="min-w-0 flex-1"><span className="block text-[11.5px] font-semibold leading-snug text-ink">{article.title}</span><span className="mt-0.5 flex items-center gap-1.5 text-[10px] text-ink-3">{getSubject(article.subjectId).short} · {article.fields.Topic}{curriculumArticles.has(article.id) && <span className="text-primary-strong">In curriculum</span>}</span></span></label> })}</div></section>

                  {isExam && <div className="space-y-3"><div className="rounded-xl border border-primary-line bg-primary-tint/35 p-3"><p className="text-[11px] font-bold uppercase tracking-[0.06em] text-primary-strong">Assessment blueprint</p><p className="mt-1 text-[11.5px] leading-relaxed text-ink-2">Topic matches are kept separate from manual additions, so the origin of every selected item remains visible.</p></div><AssessmentSelection title="Questions" icon={FileQuestion} enabled={draft.automaticQuestions} onEnabled={(value) => patch('automaticQuestions', value)} automatic={automaticQuestions} manualIds={draft.manualQuestionIds} items={questions} onToggle={(id) => toggleList('manualQuestionIds', id)} /><AssessmentSelection title="Practical questions" icon={Stethoscope} enabled={draft.automaticPracticals} onEnabled={(value) => patch('automaticPracticals', value)} automatic={automaticPracticals} manualIds={draft.manualPracticalIds} items={practicals} onToggle={(id) => toggleList('manualPracticalIds', id)} /></div>}

                  {draft.type === 'logbook' && <label className="flex cursor-pointer items-center justify-between rounded-xl border border-line bg-surface p-3"><span><span className="block text-[12.5px] font-semibold text-ink">Task completed</span><span className="block text-[10.5px] text-ink-3">Marks this requirement as signed off.</span></span><Toggle checked={draft.completed} onChange={(value) => patch('completed', value)} label="Logbook task completed" /></label>}

                  <div className="sticky bottom-0 flex gap-2 border-t border-line bg-surface-2/95 py-3 backdrop-blur-sm">{value.some((block) => block.id === draft.id) && <Button type="button" variant="danger" size="sm" iconLeft={Trash2} onClick={removeBlock}>Delete</Button>}<Button type="button" variant="primary" size="sm" className="ml-auto" iconLeft={Check} disabled={!draft.title.trim() || !draft.date || !durationValid(draft)} onClick={saveBlock}>Save block</Button></div>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <div className="rounded-xl border border-line bg-surface p-4"><div className="flex items-center gap-2"><Icon icon={Clock} size={15} className="text-ink-3" /><h3 className="text-[13px] font-bold text-ink">Module at a glance</h3></div><dl className="mt-3 grid grid-cols-2 gap-3"><div><dt className="text-[10px] uppercase tracking-wide text-ink-3">Scheduled</dt><dd className="tnum mt-1 font-mono text-[18px] font-semibold text-ink">{value.filter((block) => block.type !== 'logbook').length}</dd></div><div><dt className="text-[10px] uppercase tracking-wide text-ink-3">Exams</dt><dd className="tnum mt-1 font-mono text-[18px] font-semibold text-ink">{value.filter((block) => EXAM_BLOCK_TYPES.includes(block.type)).length}</dd></div></dl></div>
                  <div className="mt-4 rounded-xl border border-line bg-surface"><div className="flex items-center justify-between border-b border-line px-3 py-2.5"><div className="flex items-center gap-2"><Icon icon={ClipboardCheck} size={15} className="text-ink-3" /><h3 className="text-[12.5px] font-bold text-ink">Module logbook</h3></div><Button type="button" variant="ghost" size="sm" iconLeft={Plus} onClick={() => startBlock(isoDay(new Date()), 'logbook')}>Add task</Button></div><div className="p-2">{logbooks.length ? <ul className="space-y-1">{logbooks.map((block) => <li key={block.id}><button type="button" onClick={() => setDraft(structuredClone(block))} className="flex w-full items-start gap-2 rounded-lg px-2 py-2 text-start hover:bg-inset"><span className={cn('mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border', block.completed ? 'border-success bg-success text-on-success' : 'border-line-2 bg-surface')}>{block.completed && <Icon icon={Check} size={12} />}</span><span className="min-w-0 flex-1"><span className={cn('block text-[11.5px] font-semibold text-ink', block.completed && 'line-through opacity-65')}>{block.title}</span><span className="font-mono text-[9.5px] text-ink-3">Due {formatLongDate(new Date(`${block.date}T12:00:00`))}</span></span></button></li>)}</ul> : <div className="px-2 py-6 text-center"><p className="text-[12px] font-medium text-ink">No logbook tasks yet</p><p className="mt-1 text-[10.5px] leading-relaxed text-ink-3">Add required experiences, evidence, or supervisor sign-offs.</p></div>}</div></div>
                <button type="button" onClick={() => startBlock(isoDay(new Date()))} className="mt-4 flex min-h-32 w-full flex-col items-center justify-center rounded-xl border border-dashed border-line-2 bg-surface text-center transition-colors hover:border-primary-line hover:bg-primary-tint/25"><span className="grid size-9 place-items-center rounded-lg bg-primary-tint text-primary"><Icon icon={Plus} size={17} /></span><span className="mt-2 text-[12.5px] font-semibold text-ink">Add the first block</span><span className="mt-1 max-w-56 text-[10.5px] leading-relaxed text-ink-3">Place teaching, practicals, reviews, exams, or logbook work.</span></button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
