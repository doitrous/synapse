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
  FileText,
  Clapperboard,
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
import { Segmented } from '@/components/ui/Tabs'
import { Toggle } from '@/components/ui/Toggle'
import { EmptyState } from '@/components/ui/EmptyState'
import { SubjectDot } from '@/components/ui/Subject'
import type { Resource } from '@/data/resources'
import { Button } from '@/components/ui/Button'
import { useUniversityCatalogue, universityFrom } from '@/lib/useUniversityCatalogue'
import { useT } from '@/lib/i18n'

const TYPE_ICON: Record<ResourceType, LucideIcon> = {
  Book: BookMarked,
  Video: PlayCircle,
  Guideline: ScrollText,
  Deck: Layers,
  Article: Newspaper,
}

/** Document (PDF) types — everything that isn't a video. */
const PDF_TYPES: ResourceType[] = ['Book', 'Guideline', 'Deck', 'Article']

export function Resources() {
  const t = useT()
  const [universityCatalogue] = useUniversityCatalogue()
  const [params] = useSearchParams()
  const [section, setSection] = useState<'pdf' | 'video'>('pdf')
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

  const base = resources.filter((r) => {
    const normalizedQuery = query.split(' — ')[0].trim().toLowerCase()
    if (normalizedQuery && !`${r.title} ${r.source} ${r.chapter ?? ''}`.toLowerCase().includes(normalizedQuery)) return false
    if (subject !== 'all' && r.subjectId !== subject) return false
    if (uni !== 'all' && !scopeUniversities(r.id).includes(uni)) return false
    if (year !== 'all' && scopeYear(r.subjectId) !== year) return false
    if (savedOnly && !saved.has(r.id)) return false
    return true
  })

  const pdfItems = base.filter((r) => r.type !== 'Video' && (type === 'all' || r.type === type))
  const videoItems = base.filter((r) => r.type === 'Video')

  // Group videos by subject → chapter, preserving the catalogue subject order.
  const videoGroups = subjects
    .map((subj) => {
      const subjVideos = videoItems.filter((v) => v.subjectId === subj.id)
      const chapters = new Map<string, Resource[]>()
      subjVideos.forEach((v) => {
        const key = v.chapter ?? t('Other')
        chapters.set(key, [...(chapters.get(key) ?? []), v])
      })
      return { subj, chapters: [...chapters.entries()] }
    })
    .filter((g) => g.chapters.length > 0)

  function toggleSaved(id: string) {
    setSaved((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const count = section === 'pdf' ? pdfItems.length : videoItems.length

  return (
    <PageContainer>
      <PageHeader
        title={t('Resources')}
        description={t('Every book, video, guideline, and deck — filter by subject and type, and save what you use.')}
      />

      {/* Section switch: PDFs vs Videos */}
      <div className="mb-4">
        <Segmented
          value={section}
          onChange={(v) => setSection(v as 'pdf' | 'video')}
          items={[
            { value: 'pdf', label: t('PDFs') },
            { value: 'video', label: t('Videos') },
          ]}
        />
      </div>

      {/* Filter bar */}
      <div className="mb-4 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={section === 'video' ? t('Search videos…') : t('Search resources…')}
            className="w-full sm:max-w-xs"
          />
          <Select value={subject} onChange={(e) => setSubject(e.target.value)} className="min-w-0 flex-1 sm:w-44 sm:flex-none">
            <option value="all">{t('All subjects')}</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Select>
          <Select value={uni} onChange={(e) => setUni(e.target.value)} className="min-w-0 flex-1 sm:w-48 sm:flex-none">
            <option value="all">{t('All universities')}</option>
            {universityCatalogue.map((u) => (
              <option key={u.id} value={u.id}>
                {u.short} — {u.name}
              </option>
            ))}
          </Select>
          <Select value={year} onChange={(e) => setYear(e.target.value)} className="w-32">
            <option value="all">{t('All years')}</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </Select>
          <label className="ms-auto flex cursor-pointer items-center gap-2.5 text-[13px] text-ink-2">
            {t('Saved only')}
            <Toggle checked={savedOnly} onChange={setSavedOnly} label={t('Saved only')} />
          </label>
        </div>
        {section === 'pdf' && (
          <div className="flex flex-wrap gap-2">
            <FilterChip active={type === 'all'} onClick={() => setType('all')}>
              {t('All types')}
            </FilterChip>
            {PDF_TYPES.map((ty) => (
              <FilterChip key={ty} active={type === ty} onClick={() => setType(ty)}>
                {t(ty)}
              </FilterChip>
            ))}
          </div>
        )}
      </div>

      <p className="mb-2 text-[12.5px] text-ink-3">
        <span className="tnum font-mono font-medium text-ink-2">{count}</span>{' '}
        {section === 'video'
          ? count === 1 ? t('video') : t('videos')
          : count === 1 ? t('resource') : t('resources')}
      </p>

      {section === 'pdf' ? (
        <Panel>
          {pdfItems.length === 0 ? (
            <EmptyState icon={FileText} title={t('No resources match')} description={t('Try clearing a filter or searching for something else.')} />
          ) : (
            <ul className="divide-y divide-line">
              {pdfItems.map((r) => {
                const subj = getSubject(r.subjectId)
                const isSaved = saved.has(r.id)
                return (
                  <li key={r.id} className="group flex items-center gap-3 px-3 py-3 transition-colors hover:bg-inset/60 sm:px-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2">
                      <Icon icon={TYPE_ICON[r.type]} size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="truncate text-[14px] font-medium text-ink">{r.title}</span>
                        {r.recommended && <Badge tone="accent">{t('Recommended')}</Badge>}
                        {lastOpenedId === r.id && <Badge tone="success">{t('Opened')} · {r.meta}</Badge>}
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] text-ink-3">
                        <span className="inline-flex items-center gap-1.5"><SubjectDot id={subj.id} />{subj.name}</span>
                        <span>·</span>
                        <span>{r.source}</span>
                        <span>·</span>
                        <span>{r.meta}</span>
                        <span className="hidden sm:inline">·</span>
                        <span className="tnum hidden sm:inline">{r.year}</span>
                      </div>
                    </div>
                    <div className="hidden shrink-0 items-center gap-1 lg:flex">
                      <span className="rounded bg-inset px-1.5 py-0.5 text-[10px] font-medium text-ink-3">{scopeYear(r.subjectId).replace('Year ', 'Y')}</span>
                      {scopeUniversities(r.id).map((id) => (
                        <span key={id} className="rounded bg-inset px-1.5 py-0.5 text-[10px] font-medium text-ink-3">{universityFrom(universityCatalogue, id)?.short}</span>
                      ))}
                    </div>
                    <span className="hidden shrink-0 rounded bg-inset px-1.5 py-0.5 text-[10.5px] font-medium text-ink-2 md:inline">{t(r.type)}</span>
                    <IconButton icon={isSaved ? BookmarkCheck : Bookmark} label={isSaved ? t('Saved') : t('Save')} size="sm" onClick={() => toggleSaved(r.id)} className={isSaved ? 'text-accent' : ''} />
                    <IconButton icon={ExternalLink} label={t('Open resource')} size="sm" variant="surface" className="transition-opacity lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100" onClick={() => setOpened(r)} />
                  </li>
                )
              })}
            </ul>
          )}
        </Panel>
      ) : videoGroups.length === 0 ? (
        <Panel>
          <EmptyState icon={Clapperboard} title={t('No videos match')} description={t('Try clearing a filter or searching for something else.')} />
        </Panel>
      ) : (
        <div className="space-y-5">
          {videoGroups.map(({ subj, chapters }) => (
            <section key={subj.id}>
              <div className="mb-2 flex items-center gap-2">
                <SubjectDot id={subj.id} />
                <h2 className="font-serif text-[16px] font-semibold text-ink">{subj.name}</h2>
                <span className="tnum font-mono text-[11px] text-ink-3">{chapters.reduce((n, [, list]) => n + list.length, 0)}</span>
              </div>
              <div className="space-y-4">
                {chapters.map(([chapter, list]) => (
                  <div key={chapter}>
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{chapter}</p>
                    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                      {list.map((r) => {
                        const isSaved = saved.has(r.id)
                        return (
                          <div key={r.id} className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-panel transition-colors hover:border-accent-line">
                            <button
                              type="button"
                              onClick={() => setOpened(r)}
                              className="relative flex aspect-video items-center justify-center bg-surface-2 text-ink-3 transition-colors group-hover:bg-accent-tint/30"
                              aria-label={`${t('Open resource')}: ${r.title}`}
                            >
                              <Icon icon={PlayCircle} size={34} className="text-accent/80 transition-transform group-hover:scale-110" />
                              <span className="tnum absolute bottom-1.5 end-1.5 rounded bg-ink/75 px-1.5 py-0.5 font-mono text-[10px] font-medium text-white">{r.meta}</span>
                            </button>
                            <div className="flex flex-1 items-start gap-2 p-3">
                              <div className="min-w-0 flex-1">
                                <p className="line-clamp-2 text-[13px] font-medium leading-snug text-ink">{r.title}</p>
                                <p className="mt-1 flex items-center gap-1.5 text-[11.5px] text-ink-3">{r.source} · {r.year}{r.recommended && <Badge tone="accent">{t('Recommended')}</Badge>}</p>
                              </div>
                              <IconButton icon={isSaved ? BookmarkCheck : Bookmark} label={isSaved ? t('Saved') : t('Save')} size="sm" onClick={() => toggleSaved(r.id)} className={isSaved ? 'text-accent' : ''} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {opened && (
        <div className="fixed inset-0 z-50 grid items-end bg-ink/30 p-0 sm:place-items-center sm:p-4" role="dialog" aria-modal="true" aria-label={`${t('Open resource')}: ${opened.title}`} onMouseDown={() => setOpened(null)}>
          <Panel className="max-h-[calc(100dvh-env(safe-area-inset-top))] w-full max-w-lg overflow-y-auto overscroll-contain rounded-b-none pb-[env(safe-area-inset-bottom)] shadow-pop sm:rounded-xl sm:pb-0" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-start gap-3 border-b border-line p-4"><span className="grid size-10 shrink-0 place-items-center rounded-md bg-surface-2 text-ink-2"><Icon icon={TYPE_ICON[opened.type]} size={18} /></span><div className="min-w-0 flex-1"><h2 className="font-serif text-[18px] font-semibold text-ink">{opened.title}</h2><p className="mt-0.5 text-[12px] text-ink-3">{opened.source} · {opened.year}</p></div><IconButton icon={X} label={t('Close')} size="sm" onClick={() => setOpened(null)} /></div>
            <div className="p-5"><p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{opened.type === 'Video' ? t('Plays at') : t('Opens at')}</p><p className="mt-2 text-[15px] font-medium text-ink">{opened.meta}</p><p className="mt-2 text-[13px] leading-relaxed text-ink-2">{t('This prototype records the exact chapter, page, slide, or timestamp. Connect the publisher or university media URL here when the content service is available.')}</p><div className="mt-5 flex flex-wrap gap-2"><Button variant="primary" iconLeft={opened.type === 'Video' ? PlayCircle : ExternalLink} onClick={() => { setLastOpenedId(opened.id); setOpened(null) }}>{opened.type === 'Video' ? t('Play video') : t('Open exact location')}</Button><Button variant="secondary" iconLeft={saved.has(opened.id) ? BookmarkCheck : Bookmark} onClick={() => toggleSaved(opened.id)}>{saved.has(opened.id) ? t('Saved') : t('Save resource')}</Button></div></div>
          </Panel>
        </div>
      )}
    </PageContainer>
  )
}
