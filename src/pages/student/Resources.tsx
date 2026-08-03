import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  BookMarked,
  PlayCircle,
  ScrollText,
  Layers,
  Newspaper,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  FolderOpen,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ResourceType } from '@/data/types'
import { resources } from '@/data/resources'
import { subjects, getSubject } from '@/data/student'
import { YEARS, scopeUniversities, scopeYear } from '@/data/universities'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { SearchInput, Select } from '@/components/ui/Field'
import { FilterChip } from '@/components/ui/FilterChip'
import { Toggle } from '@/components/ui/Toggle'
import { EmptyState } from '@/components/ui/EmptyState'
import { SubjectDot } from '@/components/ui/Subject'
import type { Resource } from '@/data/resources'
import { Button } from '@/components/ui/Button'
import { useUniversityCatalogue, universityFrom } from '@/lib/useUniversityCatalogue'

const TYPE_ICON: Record<ResourceType, LucideIcon> = {
  Book: BookMarked,
  Video: PlayCircle,
  Guideline: ScrollText,
  Deck: Layers,
  Article: Newspaper,
}

const TYPES: ResourceType[] = ['Book', 'Video', 'Guideline', 'Deck', 'Article']

export function Resources() {
  const [universityCatalogue] = useUniversityCatalogue()
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [type, setType] = useState<ResourceType | 'all'>('all')
  const [subject, setSubject] = useState('all')
  const [uni, setUni] = useState('all')
  const [year, setYear] = useState('all')
  const [savedOnly, setSavedOnly] = useState(false)
  const [opened, setOpened] = useState<Resource | null>(null)
  const [lastOpenedId, setLastOpenedId] = useState<string | null>(null)
  const [saved, setSaved] = useState<Set<string>>(
    () => new Set(resources.filter((r) => r.saved).map((r) => r.id)),
  )

  const filtered = resources.filter((r) => {
    const normalizedQuery = query.split(' — ')[0].trim().toLowerCase()
    if (normalizedQuery && !`${r.title} ${r.source}`.toLowerCase().includes(normalizedQuery)) return false
    if (type !== 'all' && r.type !== type) return false
    if (subject !== 'all' && r.subjectId !== subject) return false
    if (uni !== 'all' && !scopeUniversities(r.id).includes(uni)) return false
    if (year !== 'all' && scopeYear(r.subjectId) !== year) return false
    if (savedOnly && !saved.has(r.id)) return false
    return true
  })

  function toggleSaved(id: string) {
    setSaved((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <PageContainer>
      <PageHeader
        title="Resources"
        description="Every book, video, guideline, and deck — filter by subject and type, and save what you use."
      />

      {/* Filter bar */}
      <div className="mb-4 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources…"
            className="w-full sm:max-w-xs"
          />
          <Select value={subject} onChange={(e) => setSubject(e.target.value)} className="min-w-0 flex-1 sm:w-44 sm:flex-none">
            <option value="all">All subjects</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
          <Select value={uni} onChange={(e) => setUni(e.target.value)} className="min-w-0 flex-1 sm:w-48 sm:flex-none">
            <option value="all">All universities</option>
            {universityCatalogue.map((u) => (
              <option key={u.id} value={u.id}>
                {u.short} — {u.name}
              </option>
            ))}
          </Select>
          <Select value={year} onChange={(e) => setYear(e.target.value)} className="w-32">
            <option value="all">All years</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </Select>
          <label className="ml-auto flex cursor-pointer items-center gap-2.5 text-[13px] text-ink-2">
            Saved only
            <Toggle checked={savedOnly} onChange={setSavedOnly} label="Saved only" />
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterChip active={type === 'all'} onClick={() => setType('all')}>
            All types
          </FilterChip>
          {TYPES.map((t) => (
            <FilterChip key={t} active={type === t} onClick={() => setType(t)}>
              {t}
            </FilterChip>
          ))}
        </div>
      </div>

      <p className="mb-2 text-[12.5px] text-ink-3">
        <span className="tnum font-mono font-medium text-ink-2">{filtered.length}</span>{' '}
        {filtered.length === 1 ? 'resource' : 'resources'}
      </p>

      <Panel>
        {filtered.length === 0 ? (
          <EmptyState
            icon={FolderOpen}
            title="No resources match"
            description="Try clearing a filter or searching for something else."
          />
        ) : (
          <ul className="divide-y divide-line">
            {filtered.map((r) => {
              const subj = getSubject(r.subjectId)
              const isSaved = saved.has(r.id)
              return (
                <li
                  key={r.id}
                  className="group flex items-center gap-3 px-3 py-3 transition-colors hover:bg-inset/60 sm:px-4"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2">
                    <Icon icon={TYPE_ICON[r.type]} size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="truncate text-[14px] font-medium text-ink">{r.title}</span>
                      {r.recommended && <Badge tone="accent">Recommended</Badge>}
                      {lastOpenedId === r.id && <Badge tone="success">Opened · {r.meta}</Badge>}
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] text-ink-3">
                      <span className="inline-flex items-center gap-1.5">
                        <SubjectDot id={subj.id} />
                        {subj.name}
                      </span>
                      <span>·</span>
                      <span>{r.source}</span>
                      <span>·</span>
                      <span>{r.meta}</span>
                      <span className="hidden sm:inline">·</span>
                      <span className="tnum hidden sm:inline">{r.year}</span>
                    </div>
                  </div>
                  <div className="hidden shrink-0 items-center gap-1 lg:flex">
                    <span className="rounded bg-inset px-1.5 py-0.5 text-[10px] font-medium text-ink-3">
                      {scopeYear(r.subjectId).replace('Year ', 'Y')}
                    </span>
                    {scopeUniversities(r.id).map((id) => (
                      <span
                        key={id}
                        className="rounded bg-inset px-1.5 py-0.5 text-[10px] font-medium text-ink-3"
                      >
                        {universityFrom(universityCatalogue, id)?.short}
                      </span>
                    ))}
                  </div>
                  <span className="hidden shrink-0 rounded bg-inset px-1.5 py-0.5 text-[10.5px] font-medium text-ink-2 md:inline">
                    {r.type}
                  </span>
                  <IconButton
                    icon={isSaved ? BookmarkCheck : Bookmark}
                    label={isSaved ? 'Saved' : 'Save'}
                    size="sm"
                    onClick={() => toggleSaved(r.id)}
                    className={isSaved ? 'text-accent' : ''}
                  />
                  <IconButton
                    icon={ExternalLink}
                    label="Open resource"
                    size="sm"
                    variant="surface"
            className="transition-opacity lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100"
                    onClick={() => setOpened(r)}
                  />
                </li>
              )
            })}
          </ul>
        )}
      </Panel>
      {opened && (
        <div className="fixed inset-0 z-50 grid items-end bg-ink/30 p-0 sm:place-items-center sm:p-4" role="dialog" aria-modal="true" aria-label={`Open ${opened.title}`} onMouseDown={() => setOpened(null)}>
          <Panel className="max-h-[calc(100dvh-env(safe-area-inset-top))] w-full max-w-lg overflow-y-auto overscroll-contain rounded-b-none pb-[env(safe-area-inset-bottom)] shadow-pop sm:rounded-xl sm:pb-0" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-start gap-3 border-b border-line p-4"><span className="grid size-10 shrink-0 place-items-center rounded-md bg-surface-2 text-ink-2"><Icon icon={TYPE_ICON[opened.type]} size={18} /></span><div className="min-w-0 flex-1"><h2 className="font-serif text-[18px] font-semibold text-ink">{opened.title}</h2><p className="mt-0.5 text-[12px] text-ink-3">{opened.source} · {opened.year}</p></div><IconButton icon={X} label="Close" size="sm" onClick={() => setOpened(null)} /></div>
            <div className="p-5"><p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">Opens at</p><p className="mt-2 text-[15px] font-medium text-ink">{opened.meta}</p><p className="mt-2 text-[13px] leading-relaxed text-ink-2">This prototype records the exact chapter, page, slide, or timestamp. Connect the publisher or university media URL here when the content service is available.</p><div className="mt-5 flex flex-wrap gap-2"><Button variant="primary" iconLeft={ExternalLink} onClick={() => { setLastOpenedId(opened.id); setOpened(null) }}>Open exact location</Button><Button variant="secondary" iconLeft={saved.has(opened.id) ? BookmarkCheck : Bookmark} onClick={() => toggleSaved(opened.id)}>{saved.has(opened.id) ? 'Saved' : 'Save resource'}</Button></div></div>
          </Panel>
        </div>
      )}
    </PageContainer>
  )
}
