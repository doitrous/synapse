import { useMemo, useState } from 'react'
import { BookOpenText, FileQuestion, Filter, Plus, Stethoscope, X } from 'lucide-react'
import type { CurriculumCourse } from '@/data/universities'
import type { ManagedContentItem } from '@/data/contentControl'
import { subjects } from '@/data/student'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SearchInput, Select } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Tabs } from '@/components/ui/Tabs'

export interface CourseCurriculumSelection {
  articleIds: string[]
  questionIds: string[]
  practicalIds: string[]
}

type CurriculumTab = 'article' | 'question' | 'practical'

const EMPTY: CourseCurriculumSelection = { articleIds: [], questionIds: [], practicalIds: [] }

export function CourseCurriculumDialog({ course, year, items, value, onClose, onSave }: { course: CurriculumCourse | null; year: string; items: ManagedContentItem[]; value?: CourseCurriculumSelection; onClose: () => void; onSave: (value: CourseCurriculumSelection) => void }) {
  const [draft, setDraft] = useState<CourseCurriculumSelection>(() => structuredClone(value ?? EMPTY))
  const [tab, setTab] = useState<CurriculumTab>('article')
  const [query, setQuery] = useState('')
  const [subjectId, setSubjectId] = useState('all')
  const [topic, setTopic] = useState('all')
  const [difficulty, setDifficulty] = useState('all')

  const kindItems = useMemo(() => items.filter((item) => item.kind === tab), [items, tab])
  const topics = useMemo(() => [...new Set(kindItems.map((item) => item.fields.Topic).filter(Boolean))].sort(), [kindItems])
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return kindItems.filter((item) => {
      if (subjectId !== 'all' && item.subjectId !== subjectId) return false
      if (topic !== 'all' && item.fields.Topic !== topic) return false
      if (difficulty !== 'all' && item.fields.Difficulty !== difficulty) return false
      return !normalized || `${item.title} ${Object.values(item.fields).join(' ')}`.toLowerCase().includes(normalized)
    })
  }, [difficulty, kindItems, query, subjectId, topic])

  if (!course) return null

  const selectionKey = tab === 'article' ? 'articleIds' : tab === 'question' ? 'questionIds' : 'practicalIds'
  const selected = draft[selectionKey]
  const counts = { article: draft.articleIds.length, question: draft.questionIds.length, practical: draft.practicalIds.length }

  function toggle(id: string) {
    setDraft((current) => ({ ...current, [selectionKey]: selected.includes(id) ? selected.filter((itemId) => itemId !== id) : [...selected, id] }))
  }

  function includeFiltered() {
    setDraft((current) => ({ ...current, [selectionKey]: [...new Set([...current[selectionKey], ...filtered.map((item) => item.id)])] }))
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/25 p-0 backdrop-blur-[2px] sm:p-4" role="dialog" aria-modal="true" aria-labelledby="course-curriculum-title">
      <div className="flex h-full max-h-none w-full max-w-5xl flex-col overflow-hidden border border-line bg-paper pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] shadow-float sm:h-auto sm:max-h-[90vh] sm:rounded-2xl sm:pb-0 sm:pt-0">
        <header className="flex flex-wrap items-center gap-2 border-b border-line bg-surface px-3 py-3 sm:flex-nowrap sm:gap-3 sm:px-5 sm:py-4">
          <span className="grid size-9 place-items-center rounded-lg bg-accent-tint text-accent-strong"><Icon icon={BookOpenText} size={17} /></span>
          <div className="min-w-0 flex-1"><h2 id="course-curriculum-title" className="font-serif text-[18px] font-semibold text-ink">{course.name} curriculum</h2><p className="text-[11.5px] text-ink-3">{year} · {course.block} · define the exact module catalogue</p></div>
          <button type="button" onClick={onClose} className="grid size-10 place-items-center rounded-lg text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close curriculum editor"><Icon icon={X} size={18} /></button>
          <div className="flex basis-full justify-end gap-2 sm:contents"><Button type="button" variant="ghost" onClick={onClose}>Cancel</Button><Button type="button" variant="primary" onClick={() => onSave(draft)}>Save curriculum</Button></div>
        </header>

        <Tabs
          className="shrink-0 bg-surface px-4"
          value={tab}
          onChange={(next) => { setTab(next as CurriculumTab); setQuery(''); setTopic('all'); setDifficulty('all') }}
          items={[
            { value: 'article', label: 'Library topics', icon: BookOpenText, count: counts.article },
            { value: 'question', label: 'Questions by filters', icon: FileQuestion, count: counts.question },
            { value: 'practical', label: 'Practical questions', icon: Stethoscope, count: counts.practical },
          ]}
        />

        <div className="flex flex-wrap items-center gap-2 border-b border-line bg-surface-2/45 px-4 py-3">
          <Icon icon={Filter} size={15} className="text-ink-3" />
          <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search available content…" className="w-64" />
          <Select aria-label="Filter by module" value={subjectId} onChange={(event) => setSubjectId(event.target.value)} className="w-40"><option value="all">All modules</option>{subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}</Select>
          <Select aria-label="Filter by topic" value={topic} onChange={(event) => setTopic(event.target.value)} className="w-44"><option value="all">All topics</option>{topics.map((item) => <option key={item}>{item}</option>)}</Select>
          {tab !== 'article' && <Select aria-label="Filter by difficulty" value={difficulty} onChange={(event) => setDifficulty(event.target.value)} className="w-36"><option value="all">All difficulty</option><option>Easy</option><option>Moderate</option><option>Hard</option><option>Challenging</option></Select>}
          <Button type="button" size="sm" iconLeft={Plus} className="ml-auto" onClick={includeFiltered}>Include filtered ({filtered.length})</Button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <div className="grid gap-2 md:grid-cols-2">
            {filtered.map((item) => {
              const checked = selected.includes(item.id)
              const subject = subjects.find((candidate) => candidate.id === item.subjectId)
              return (
                <label key={item.id} className={`flex min-h-[4.5rem] cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${checked ? 'border-accent-line bg-accent-tint/45' : 'border-line bg-surface hover:bg-inset'}`}>
                  <input type="checkbox" checked={checked} onChange={() => toggle(item.id)} className="mt-1 size-4 accent-[var(--color-accent)]" />
                  <span className="min-w-0 flex-1"><span className="line-clamp-2 block text-[13px] font-semibold leading-snug text-ink">{item.title}</span><span className="mt-1 flex flex-wrap gap-1.5"><Badge tone="outline">{subject?.short ?? item.subjectId}</Badge>{item.fields.Topic && <Badge tone="neutral">{item.fields.Topic}</Badge>}{item.fields.Difficulty && <Badge tone="warning">{item.fields.Difficulty}</Badge>}</span></span>
                </label>
              )
            })}
          </div>
          {filtered.length === 0 && <div className="py-16 text-center"><p className="text-[13px] font-medium text-ink">No content matches these filters</p><p className="mt-1 text-[12px] text-ink-3">Change a filter to broaden the curriculum pool.</p></div>}
        </div>

        <footer className="flex flex-wrap items-center gap-1 border-t border-line bg-surface px-4 py-3 text-[11.5px] text-ink-3 sm:px-5 sm:text-[12px]"><span>{draft.articleIds.length} library · {draft.questionIds.length} questions · {draft.practicalIds.length} practical</span><span className="sm:ml-auto">Selections are saved per university, year, and module.</span></footer>
      </div>
    </div>
  )
}
