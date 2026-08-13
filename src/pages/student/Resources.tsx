import { useMemo, useState } from 'react'
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
  ChevronRight,
  Folder,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ResourceType } from '@/data/types'
import { useLiveResources, type LiveResource } from '@/lib/useLiveResources'
import { subjects, getSubject } from '@/data/subjects'
import { YEARS } from '@/data/universities'
import { usePersistentState } from '@/lib/usePersistentState'
import { useRecentResources } from '@/lib/useRecentResources'
import { apiOpenFile } from '@/lib/api'
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
import { Button } from '@/components/ui/Button'
import { useUniversityCatalogue, universityFrom } from '@/lib/useUniversityCatalogue'
import { cn } from '@/lib/cn'
import { BackBar } from '@/components/ui/BackBar'
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

/** Dotted, so `isUserOwnedState` routes bookmarks to the student's own record. */
const SAVED_RESOURCES_STORAGE_KEY = 'synapse.bookmarks.resources.v1'

/**
 * Turn a recorded location into a PDF viewer fragment.
 *
 * `meta` is free text an author typed — "Ch. 23 · Cardiology", "p. 412",
 * "12:30". Only a page number can be handed to a PDF viewer; anything else
 * opens the file at the start, which is still the right file.
 */
function fragmentFor(meta: string): string {
  const page = meta.match(/(?:p\.?|page)\s*(\d+)/i)?.[1]
  return page ? `#page=${page}` : ''
}

export function Resources() {
  const t = useT()
  const resources = useLiveResources()
  const [universityCatalogue] = useUniversityCatalogue()
  const [params] = useSearchParams()
  const [section, setSection] = useState<'pdf' | 'video'>('pdf')
  const [groupBy, setGroupBy] = useState<'system' | 'module'>('system')
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [type, setType] = useState<ResourceType | 'all'>('all')
  const [subject, setSubject] = useState('all')
  const [uni, setUni] = useState('all')
  const [year, setYear] = useState('all')
  const [savedOnly, setSavedOnly] = useState(false)
  const [opened, setOpened] = useState<LiveResource | null>(null)
  const toggleFolder = (key: string) => setCollapsed((prev) => { const next = new Set(prev); if (next.has(key)) next.delete(key); else next.add(key); return next })
  const [lastOpenedId, setLastOpenedId] = useState<string | null>(null)
  const [openError, setOpenError] = useState<string | null>(null)
  const { noteOpened } = useRecentResources()
  /**
   * Bookmarks, in the student's own record.
   *
   * These were a `useState` seeded from `saved: true` flags in the demo
   * catalogue, so a student arrived with three bookmarks they had not made and
   * lost every one they did make on the next reload.
   */
  const [savedIds, setSavedIds] = usePersistentState<string[]>(SAVED_RESOURCES_STORAGE_KEY, [])
  const saved = useMemo(() => new Set(savedIds), [savedIds])

  const base = resources.filter((r) => {
    const normalizedQuery = query.split(' — ')[0].trim().toLowerCase()
    if (normalizedQuery && !`${r.title} ${r.source} ${r.chapter ?? ''}`.toLowerCase().includes(normalizedQuery)) return false
    if (subject !== 'all' && r.subjectId !== subject) return false
    // Authored scope, with an empty list meaning "applies to everyone".
    if (uni !== 'all' && r.universityIds.length > 0 && !r.universityIds.includes(uni)) return false
    if (year !== 'all' && r.yearIds.length > 0 && !r.yearIds.includes(year)) return false
    if (savedOnly && !saved.has(r.id)) return false
    return true
  })

  const pdfItems = base.filter((r) => r.type !== 'Video' && (type === 'all' || r.type === type))
  const videoItems = base.filter((r) => r.type === 'Video')
  const sectionItems = section === 'video' ? videoItems : pdfItems

  // Folder tree: primary (System or Module) → subfolder (chapter) → items.
  const tree = (() => {
    const primaryOrder = groupBy === 'system' ? subjects.map((s) => s.id) : []
    const primaries = new Map<string, typeof sectionItems>()
    sectionItems.forEach((r) => {
      const key = groupBy === 'system' ? r.subjectId : (r.modules[0] ?? '__none__')
      primaries.set(key, [...(primaries.get(key) ?? []), r])
    })
    const keys = groupBy === 'system'
      ? primaryOrder.filter((k) => primaries.has(k))
      : [...primaries.keys()].sort((a, b) => (a === '__none__' ? 1 : b === '__none__' ? -1 : a.localeCompare(b)))
    return keys.map((pkey) => {
      const items = primaries.get(pkey)!
      const label = groupBy === 'system' ? getSubject(pkey).name : (pkey === '__none__' ? t('No module') : pkey)
      const subjectId = groupBy === 'system' ? pkey : items[0]?.subjectId
      const subs = new Map<string, typeof sectionItems>()
      items.forEach((r) => { const sk = r.chapter ?? t('General'); subs.set(sk, [...(subs.get(sk) ?? []), r]) })
      return { pkey, label, subjectId, count: items.length, subfolders: [...subs.entries()] }
    })
  })()

  function toggleSaved(id: string) {
    setSavedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  /**
   * Open a resource's source file at the place it records.
   *
   * The button used to close the dialog and set a local "Opened" flag, and the
   * dialog said so in copy shown to students. Where an admin has uploaded the
   * file, this now opens it — at the page or timestamp recorded on the item.
   */
  async function openResource(resource: LiveResource) {
    noteOpened({ id: resource.id, title: resource.title, type: resource.type, subjectId: resource.subjectId, meta: resource.meta })
    setLastOpenedId(resource.id)
    if (!resource.hasFile) return
    setOpenError(null)
    try {
      await apiOpenFile(`/medical-resources/${encodeURIComponent(resource.id)}`, fragmentFor(resource.meta))
      setOpened(null)
    } catch {
      setOpenError(t('That file could not be opened. It may still be uploading.'))
    }
  }

  const count = section === 'pdf' ? pdfItems.length : videoItems.length

  return (
    <PageContainer>
      <BackBar />
      <PageHeader
        title={t('Resources')}
        description={t('Every book, video, guideline, and deck — filter by subject and type, and save what you use.')}
      />

      {/* Prominent Files / Videos switch + organize-by control */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-xl border border-line bg-surface-2/60 p-1 shadow-panel">
          {([['pdf', t('Files'), FileText], ['video', t('Videos'), Clapperboard]] as const).map(([val, label, icon]) => (
            <button
              key={val}
              type="button"
              onClick={() => setSection(val)}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[13.5px] font-semibold transition-colors',
                section === val ? 'bg-surface text-accent-strong shadow-panel' : 'text-ink-3 hover:text-ink',
              )}
            >
              <Icon icon={icon} size={16} />
              {label}
            </button>
          ))}
        </div>
        <label className="inline-flex items-center gap-2 text-[12.5px] text-ink-2">
          {t('Organize by')}
          <Segmented value={groupBy} onChange={(v) => setGroupBy(v as 'system' | 'module')} items={[{ value: 'system', label: t('System') }, { value: 'module', label: t('Module') }]} />
        </label>
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

      {tree.length === 0 ? (
        <Panel>
          <EmptyState icon={section === 'video' ? Clapperboard : FileText} title={section === 'video' ? t('No videos match') : t('No resources match')} description={t('Try clearing a filter or searching for something else.')} />
        </Panel>
      ) : (
        <div className="space-y-3">
          {tree.map((folder) => {
            const folderKey = `${section}-${groupBy}-${folder.pkey}`
            const isCollapsed = collapsed.has(folderKey)
            return (
              <Panel key={folderKey} className="overflow-hidden">
                <button type="button" onClick={() => toggleFolder(folderKey)} aria-expanded={!isCollapsed} className="flex w-full items-center gap-2.5 border-b border-line bg-surface-2/50 px-3 py-2.5 text-start hover:bg-inset/60 sm:px-4">
                  <Icon icon={ChevronRight} size={15} className={cn('text-ink-3 transition-transform', !isCollapsed && 'rotate-90')} />
                  {folder.subjectId && <SubjectDot id={folder.subjectId} />}
                  <h2 className="font-serif text-[15.5px] font-semibold text-ink">{folder.label}</h2>
                  <span className="tnum ms-auto font-mono text-[11px] text-ink-3">{folder.count}</span>
                </button>
                {!isCollapsed && (
                  <div className="divide-y divide-line">
                    {folder.subfolders.map(([subLabel, list]) => {
                      const subKey = `${folderKey}::${subLabel}`
                      const subCollapsed = collapsed.has(subKey)
                      return (
                        <div key={subKey}>
                          <button type="button" onClick={() => toggleFolder(subKey)} aria-expanded={!subCollapsed} className="flex w-full items-center gap-2 px-4 py-2 text-start ps-8 hover:bg-inset/50">
                            <Icon icon={Folder} size={13} className="text-ink-3" />
                            <span className="text-[11.5px] font-semibold uppercase tracking-[0.06em] text-ink-2">{subLabel}</span>
                            <span className="tnum ms-1 font-mono text-[10.5px] text-ink-3">{list.length}</span>
                          </button>
                          {!subCollapsed && (section === 'video' ? (
                            <div className="grid gap-2 px-4 pb-3 ps-8 sm:grid-cols-2 xl:grid-cols-3">
                              {list.map((r) => {
                                const isSaved = saved.has(r.id)
                                return (
                                  <div key={r.id} className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-panel transition-colors hover:border-accent-line">
                                    <button type="button" onClick={() => setOpened(r)} className="relative flex aspect-video items-center justify-center bg-surface-2 text-ink-3 transition-colors group-hover:bg-accent-tint/30" aria-label={`${t('Open resource')}: ${r.title}`}>
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
                          ) : (
                            <ul className="pb-1">
                              {list.map((r) => {
                                const subj = getSubject(r.subjectId)
                                const isSaved = saved.has(r.id)
                                return (
                                  <li key={r.id} className="group flex items-center gap-3 px-4 py-2.5 ps-8 transition-colors hover:bg-inset/60">
                                    <span className="grid size-9 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2"><Icon icon={TYPE_ICON[r.type]} size={16} /></span>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="truncate text-[13.5px] font-medium text-ink">{r.title}</span>
                                        {r.recommended && <Badge tone="accent">{t('Recommended')}</Badge>}
                                        {lastOpenedId === r.id && <Badge tone="success">{t('Opened')} · {r.meta}</Badge>}
                                      </div>
                                      <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11.5px] text-ink-3">
                                        <span className="inline-flex items-center gap-1.5"><SubjectDot id={subj.id} />{subj.name}</span>
                                        <span>·</span><span>{r.source}</span><span>·</span><span>{r.meta}</span>
                                        <span className="hidden sm:inline">·</span><span className="tnum hidden sm:inline">{r.year}</span>
                                      </div>
                                    </div>
                                    {/* Only the scope an author recorded. An
                                        unrestricted resource shows no chips
                                        rather than invented ones. */}
                                    <div className="hidden shrink-0 items-center gap-1 lg:flex">
                                      {r.yearIds.map((id) => (
                                        <span key={id} className="rounded bg-inset px-1.5 py-0.5 text-[10px] font-medium text-ink-3">{id}</span>
                                      ))}
                                      {r.universityIds.map((id) => (
                                        <span key={id} className="rounded bg-inset px-1.5 py-0.5 text-[10px] font-medium text-ink-3">{universityFrom(universityCatalogue, id)?.short ?? id}</span>
                                      ))}
                                    </div>
                                    <span className="hidden shrink-0 rounded bg-inset px-1.5 py-0.5 text-[10.5px] font-medium text-ink-2 md:inline">{t(r.type)}</span>
                                    <IconButton icon={isSaved ? BookmarkCheck : Bookmark} label={isSaved ? t('Saved') : t('Save')} size="sm" onClick={() => toggleSaved(r.id)} className={isSaved ? 'text-accent' : ''} />
                                    <IconButton icon={ExternalLink} label={t('Open resource')} size="sm" variant="surface" onClick={() => setOpened(r)} />
                                  </li>
                                )
                              })}
                            </ul>
                          ))}
                        </div>
                      )
                    })}
                  </div>
                )}
              </Panel>
            )
          })}
        </div>
      )}

      {opened && (
        <div className="fixed inset-0 z-50 grid items-end bg-ink/30 p-0 sm:place-items-center sm:p-4" role="dialog" aria-modal="true" aria-label={`${t('Open resource')}: ${opened.title}`} onMouseDown={() => setOpened(null)}>
          <Panel className="max-h-[calc(100dvh-env(safe-area-inset-top))] w-full max-w-lg overflow-y-auto overscroll-contain rounded-b-none pb-[env(safe-area-inset-bottom)] shadow-pop sm:rounded-xl sm:pb-0" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-start gap-3 border-b border-line p-4"><span className="grid size-10 shrink-0 place-items-center rounded-md bg-surface-2 text-ink-2"><Icon icon={TYPE_ICON[opened.type]} size={18} /></span><div className="min-w-0 flex-1"><h2 className="font-serif text-[18px] font-semibold text-ink">{opened.title}</h2><p className="mt-0.5 text-[12px] text-ink-3">{opened.source} · {opened.year}</p></div><IconButton icon={X} label={t('Close')} size="sm" onClick={() => setOpened(null)} /></div>
            <div className="p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{opened.type === 'Video' ? t('Plays at') : t('Opens at')}</p>
              <p className="mt-2 text-[15px] font-medium text-ink">{opened.meta || t('Not recorded')}</p>
              {!opened.hasFile && (
                <p className="mt-2 text-[13px] leading-relaxed text-ink-2">
                  {t('No source file has been uploaded for this resource yet, so it cannot be opened here. The reference above is where to find it.')}
                </p>
              )}
              {openError && <p role="alert" className="mt-2 text-[13px] text-danger">{openError}</p>}
              <div className="mt-5 flex flex-wrap gap-2">
                <Button
                  variant="primary"
                  iconLeft={opened.type === 'Video' ? PlayCircle : ExternalLink}
                  disabled={!opened.hasFile}
                  onClick={() => void openResource(opened)}
                >
                  {opened.hasFile
                    ? (opened.type === 'Video' ? t('Play video') : t('Open exact location'))
                    : t('Source file not uploaded yet')}
                </Button>
                <Button variant="secondary" iconLeft={saved.has(opened.id) ? BookmarkCheck : Bookmark} onClick={() => toggleSaved(opened.id)}>{saved.has(opened.id) ? t('Saved') : t('Save resource')}</Button>
              </div>
            </div>
          </Panel>
        </div>
      )}
    </PageContainer>
  )
}
