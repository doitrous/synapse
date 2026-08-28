import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLocalChoice, useLocalPreference } from '@/lib/useLocalPreference'
import { clickableRow, stopRowClick } from '@/lib/clickableRow'
import { NO_CHAPTER, UNGROUPED, groupResources } from '@/data/resourceGrouping'
import { resourceIcon } from '@/data/resourceIcons'
import { MenuToggle } from '@/components/shell/MenuToggle'
import {
  PlayCircle,
  Bookmark,
  BookmarkCheck,
  FileText,
  Clapperboard,
  FolderTree,
  ChevronRight,
  Folder,
  Upload,
  ImagePlus,
  Images,
  Trash2,
  Pencil,
  X,
  Eye,
  EyeOff,
} from 'lucide-react'
import type { ResourceType } from '@/data/types'
import { useLiveResources, type LiveResource } from '@/lib/useLiveResources'
import { subjects, getSubject } from '@/data/subjects'
import { YEARS } from '@/data/universities'
import { usePersistentState } from '@/lib/usePersistentState'
import { useRecentResources } from '@/lib/useRecentResources'
import { useMyDocuments, type MyDocument } from '@/lib/useMyDocuments'
import { uploadRouteId } from '@/lib/useReaderSource'
import { apiDownload, apiFetchBlob, apiOpenFile, API_MODE } from '@/lib/api'
import { resolveMediaSource } from '@/lib/mediaStorage'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Collapse } from '@/components/ui/Collapse'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { SearchInput, Select } from '@/components/ui/Field'
import { FilterChip } from '@/components/ui/FilterChip'
import { Segmented } from '@/components/ui/Tabs'
import { Toggle } from '@/components/ui/Toggle'
import { EmptyState } from '@/components/ui/EmptyState'
import { SubjectDot } from '@/components/ui/Subject'
import { useUniversityCatalogue, universityFrom } from '@/lib/useUniversityCatalogue'
import { cn } from '@/lib/cn'
import { BackBar } from '@/components/ui/BackBar'
import { useT } from '@/lib/i18n'
import { overlayPortal } from '@/lib/overlayPortal'
import { initialNotes, type Note } from '@/data/notebook'
import { filesOf, imagesOf, INITIAL_BOARD, type BoardState } from '@/data/whiteboard'

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
function pageParamFor(meta: string): string {
  const page = meta.match(/(?:p\.?|page)\s*(\d+)/i)?.[1]
  return page ? `?page=${page}` : ''
}

export function Resources() {
  const t = useT()
  const resources = useLiveResources()
  const [universityCatalogue] = useUniversityCatalogue()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [section, setSection] = useState<'pdf' | 'video' | 'mine'>('mine')
  // Kept per device: how someone wants their resources laid out is not a
  // per-visit decision, and this reset to System on every mount.
  const [groupBy, setGroupBy] = useLocalChoice('synapse.resources.groupBy', 'module', ['system', 'module'] as const)
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [type, setType] = useState<ResourceType | 'all'>('all')
  const [subject, setSubject] = useState('all')
  const [uni, setUni] = useState('all')
  const [year, setYear] = useState('all')
  const [savedOnly, setSavedOnly] = useState(false)
  const [filtersOpen, setFiltersOpen] = useLocalPreference('synapse.resources.filters', true)
  /** The row whose "no file uploaded" reference is currently expanded. */
  const [referenceOnlyId, setReferenceOnlyId] = useState<string | null>(null)
  const activeFilters = [query.trim() !== '', type !== 'all', subject !== 'all', uni !== 'all', year !== 'all', savedOnly]
    .filter(Boolean).length
  const clearFilters = () => {
    setQuery('')
    setType('all')
    setSubject('all')
    setUni('all')
    setYear('all')
    setSavedOnly(false)
  }
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

  /**
   * Filter options, derived from the resources actually loaded.
   *
   * All four lists used to come from static imports — every subject in the app,
   * the whole university catalogue, a fixed YEARS constant, a hardcoded type
   * list — so a student could filter by a subject with nothing in it, or see a
   * "Deck" chip when no deck existed. Counts come from the current section, so
   * switching between Files and Videos re-counts rather than going stale.
   *
   * The scope rule is preserved: an empty universityIds/yearIds means the
   * resource applies to everyone, so those must not narrow the option list.
   */
  const pool = useMemo(
    () => resources.filter((r) => (section === 'video' ? r.type === 'Video' : r.type !== 'Video')),
    [resources, section],
  )
  const available = useMemo(() => {
    const subjectCounts = new Map<string, number>()
    const universityIds = new Set<string>()
    const yearIds = new Set<string>()
    for (const resource of pool) {
      subjectCounts.set(resource.subjectId, (subjectCounts.get(resource.subjectId) ?? 0) + 1)
      resource.universityIds.forEach((id) => universityIds.add(id))
      resource.yearIds.forEach((id) => yearIds.add(id))
    }
    return { subjectCounts, universityIds, yearIds }
  }, [pool])

  // A filter that no longer has anything behind it would otherwise hide
  // everything with no way back except knowing to reset it.
  useEffect(() => {
    if (subject !== 'all' && !available.subjectCounts.has(subject)) setSubject('all')
  }, [available, subject])

  // An article links a source by id. Land on the source itself rather than on a
  // catalogue filtered down to one row that still has to be clicked.
  const directId = params.get('id')
  useEffect(() => {
    if (!directId) return
    navigate(`/app/resources/${encodeURIComponent(directId)}`, { replace: true })
  }, [directId, navigate])

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

  /**
   * How many rows each type chip would actually show.
   *
   * Counted from `base` — everything the other filters allow — rather than from
   * the whole section, so "Article (7)" cannot promise seven while a subject
   * filter is holding six of them back.
   */
  const typeCounts = new Map<string, number>()
  for (const resource of base) {
    if (resource.type === 'Video') continue
    typeCounts.set(resource.type, (typeCounts.get(resource.type) ?? 0) + 1)
  }

  const pdfItems = base.filter((r) => r.type !== 'Video' && (type === 'all' || r.type === type))
  const videoItems = base.filter((r) => r.type === 'Video')
  const sectionItems = section === 'video' ? videoItems : pdfItems

  // Folder tree: primary (System or Module) → subfolder (chapter) → items.
  // The arrangement itself lives in `@/data/resourceGrouping`, where the rule
  // that nothing is dropped for having an unrecognised subject is under test.
  const tree = useMemo(() => {
    const subjectOrder = subjects.map((s) => s.id)
    return groupResources(sectionItems, groupBy, subjectOrder).map((folder) => ({
      pkey: folder.key,
      label: folder.key === UNGROUPED
        ? (groupBy === 'system' ? t('Unfiled') : t('No module'))
        : groupBy === 'system' ? getSubject(folder.key).name : folder.key,
      subjectId: folder.subjectId,
      count: folder.count,
      subfolders: folder.subfolders.map((sub) => [
        sub.key === NO_CHAPTER ? t('General') : sub.key,
        sub.items,
      ] as const),
    }))
  }, [groupBy, sectionItems, t])

  function toggleSaved(id: string) {
    setSavedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  /**
   * Open a source, from a tap on the row itself.
   *
   * Tapping a resource used to raise a dialog that named the resource again and
   * offered one button — "Open exact location" — so every open cost two taps
   * and a modal to say what the row had already said. The row opens the thing.
   *
   * A video leaves for its host, since there is nothing to render here.
   * Everything else goes to /app/resources/:id, which keeps the student inside
   * the app and can be linked at an exact page.
   *
   * A resource whose file has not been uploaded cannot be opened at all. That
   * is the one case the dialog was carrying that the row was not, so the row
   * carries it now: the reference is shown in place, where it is useful, rather
   * than behind a tap that leads to a dead end.
   */
  function openResource(resource: LiveResource) {
    setOpenError(null)
    if (!resource.hasFile) {
      setReferenceOnlyId((current) => current === resource.id ? null : resource.id)
      return
    }
    setLastOpenedId(resource.id)
    if (resource.type === 'Video') {
      noteOpened({ id: resource.id, title: resource.title, type: resource.type, subjectId: resource.subjectId, meta: resource.meta })
      void apiOpenFile(`/medical-resources/${encodeURIComponent(resource.id)}`).catch(() => {
        setOpenError(t('That file could not be opened. It may still be uploading.'))
      })
      return
    }
    // The reader records the open itself, once the document is actually up.
    navigate(`/app/resources/${encodeURIComponent(resource.id)}${pageParamFor(resource.meta)}`)
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
          {([['pdf', t('Files'), FileText], ['video', t('Videos'), Clapperboard], ['mine', t('My uploads'), Upload]] as const).map(([val, label, icon]) => (
            <button
              key={val}
              type="button"
              onClick={() => setSection(val)}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[13.5px] font-semibold transition-colors',
                section === val ? 'bg-surface text-primary-strong shadow-panel' : 'text-ink-3 hover:text-ink',
              )}
            >
              <Icon icon={icon} size={16} />
              {label}
            </button>
          ))}
        </div>
        <div className={cn('flex items-center gap-2', section === 'mine' && 'hidden')}>
          {/* Back on the row it names. Grouping decides the shape of the whole
              page, so it does not belong folded away inside the filters — a
              student had to open a panel to find out why the page looked as it
              did. Hidden on My uploads, which has no folders to group. */}
          <div className="inline-flex items-center gap-2">
            <Icon icon={FolderTree} size={15} className="text-ink-3" />
            <span className="text-[12.5px] font-medium text-ink-2">{t('Organise by')}</span>
            <Segmented value={groupBy} onChange={(v) => setGroupBy(v as 'system' | 'module')} items={[{ value: 'system', label: t('System') }, { value: 'module', label: t('Module') }]} />
          </div>
          {/* Filters take a row and a half and are usually already right. The
              count stays visible while they are folded away, so a narrowed list
              is never mistaken for an empty catalogue. */}
          {activeFilters > 0 && !filtersOpen && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary-line bg-primary-tint px-2.5 py-1.5 text-[12px] font-medium text-primary-strong transition-colors hover:bg-primary-tint/70"
            >
              {activeFilters} {activeFilters === 1 ? t('filter') : t('filters')}
              <Icon icon={X} size={13} />
            </button>
          )}
          <MenuToggle open={filtersOpen} onToggle={() => setFiltersOpen((current) => !current)} label="filters" />
        </div>
      </div>

      {section === 'mine' && <MyUploads />}

      {/* Filter bar */}
      {section !== 'mine' && filtersOpen && (
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
            {subjects.filter((s) => available.subjectCounts.has(s.id)).map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({available.subjectCounts.get(s.id)})
              </option>
            ))}
          </Select>
          {available.universityIds.size > 0 && (
            <Select value={uni} onChange={(e) => setUni(e.target.value)} className="min-w-0 flex-1 sm:w-48 sm:flex-none">
              <option value="all">{t('All universities')}</option>
              {universityCatalogue.filter((u) => available.universityIds.has(u.id)).map((u) => (
                <option key={u.id} value={u.id}>
                  {u.short} — {u.name}
                </option>
              ))}
            </Select>
          )}
          {available.yearIds.size > 0 && (
            <Select value={year} onChange={(e) => setYear(e.target.value)} className="w-32">
              <option value="all">{t('All years')}</option>
              {YEARS.filter((y) => available.yearIds.has(y)).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Select>
          )}
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
            {PDF_TYPES.filter((ty) => typeCounts.has(ty) || type === ty).map((ty) => (
              <FilterChip key={ty} active={type === ty} onClick={() => setType(ty)}>
                {t(ty)} ({typeCounts.get(ty) ?? 0})
              </FilterChip>
            ))}
          </div>
        )}
      </div>
      )}

      {section !== 'mine' && (
        <p className="mb-2 text-[12.5px] text-ink-3">
          <span className="tnum font-mono font-medium text-ink-2">{count}</span>{' '}
          {section === 'video'
            ? count === 1 ? t('video') : t('videos')
            : count === 1 ? t('resource') : t('resources')}
        </p>
      )}

      {section === 'mine' ? null : tree.length === 0 ? (
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
                  <Icon icon={ChevronRight} size={15} className={cn('text-ink-3 chevron-turn')} open={!isCollapsed} />
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
                          <button type="button" onClick={() => toggleFolder(subKey)} aria-expanded={!subCollapsed} className="flex min-h-11 w-full items-center gap-2 px-4 py-2 text-start ps-8 hover:bg-inset/50 sm:min-h-0">
                            <Icon icon={Folder} size={13} className="text-ink-3" />
                            <span className="text-[11.5px] font-semibold uppercase tracking-[0.06em] text-ink-2">{subLabel}</span>
                            <span className="tnum ms-1 font-mono text-[10.5px] text-ink-3">{list.length}</span>
                          </button>
                          {!subCollapsed && (section === 'video' ? (
                            <div className="grid gap-2 px-4 pb-3 ps-8 sm:grid-cols-2 xl:grid-cols-3">
                              {list.map((r) => {
                                const isSaved = saved.has(r.id)
                                return (
                                  <div
                                    key={r.id}
                                    aria-label={r.hasFile ? `${t('Play video')}: ${r.title}` : `${t('Where to find it')}: ${r.title}`}
                                    {...clickableRow(() => openResource(r), 'group flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-panel hover:border-primary-line')}
                                  >
                                    {/* The thumbnail was the only part that opened
                                        anything; the title beside it was inert. */}
                                    <div className="relative flex aspect-video items-center justify-center bg-surface-2 text-ink-3 transition-colors group-hover:bg-primary-tint/30">
                                      <Icon icon={PlayCircle} size={34} className="text-primary/80 transition-transform group-hover:scale-110" />
                                      <span className="tnum absolute bottom-1.5 end-1.5 rounded bg-ink/75 px-1.5 py-0.5 font-mono text-[10px] font-medium text-paper">{r.meta}</span>
                                    </div>
                                    <div className="flex flex-1 items-start gap-2 p-3">
                                      <div className="min-w-0 flex-1">
                                        <p className="line-clamp-2 text-[13px] font-medium leading-snug text-ink">{r.title}</p>
                                        <p className="mt-1 flex flex-wrap items-center gap-1.5 text-[11.5px] text-ink-3">
                                          {r.source} · {r.year}
                                          {r.recommended && <Badge tone="primary">{t('Recommended')}</Badge>}
                                          {!r.hasFile && <span className="italic">· {t('reference only')}</span>}
                                        </p>
                                        {referenceOnlyId === r.id && (
                                          <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-2">
                                            {t('Not uploaded yet.')} <span className="font-medium text-ink">{r.meta || t('Not recorded')}</span>
                                          </p>
                                        )}
                                      </div>
                                      <span {...stopRowClick} className="contents">
                                        <IconButton icon={isSaved ? BookmarkCheck : Bookmark} label={isSaved ? t('Saved') : t('Save')} size="sm" onClick={() => toggleSaved(r.id)} className={isSaved ? 'text-primary' : ''} />
                                      </span>
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
                                  <li
                                    key={r.id}
                                    aria-label={r.hasFile ? `${t('Open resource')}: ${r.title}` : `${t('Where to find it')}: ${r.title}`}
                                    {...clickableRow(() => openResource(r), 'group flex flex-wrap items-center gap-3 px-4 py-2.5 ps-8 hover:bg-inset/60')}
                                  >
                                    <span className="grid size-9 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2"><Icon icon={resourceIcon(r.icon, r.type)} size={16} /></span>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="truncate text-[13.5px] font-medium text-ink">{r.title}</span>
                                        {r.recommended && <Badge tone="primary">{t('Recommended')}</Badge>}
                                        {lastOpenedId === r.id && <Badge tone="success">{t('Opened')} · {r.meta}</Badge>}
                                      </div>
                                      <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11.5px] text-ink-3">
                                        {/* Under System grouping the folder header
                                            already names the subject, so repeating
                                            it on every row inside it says nothing. */}
                                        {groupBy === 'module' && <><span className="inline-flex items-center gap-1.5"><SubjectDot id={subj.id} />{subj.name}</span><span>·</span></>}
                                        <span>{r.source}</span><span>·</span><span>{r.meta}</span>
                                        <span className="hidden sm:inline">·</span><span className="tnum hidden sm:inline">{r.year}</span>
                                        {/* Marked before the tap rather than after
                                            it, so a row that cannot open does not
                                            look like one that can — but quietly,
                                            because on a catalogue still being
                                            uploaded this is most of them. */}
                                        {!r.hasFile && <><span aria-hidden>·</span><span className="italic">{t('reference only')}</span></>}
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
                                    {/* The row opens the resource; this must not. */}
                                    <span {...stopRowClick} className="contents">
                                      <IconButton icon={isSaved ? BookmarkCheck : Bookmark} label={isSaved ? t('Saved') : t('Save')} size="sm" onClick={() => toggleSaved(r.id)} className={isSaved ? 'text-primary' : ''} />
                                    </span>
                                    <Icon icon={ChevronRight} size={16} className="shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
                                    {referenceOnlyId === r.id && (
                                      <p className="basis-full ps-12 text-[12px] leading-relaxed text-ink-2">
                                        {t('No source file has been uploaded for this one yet, so it cannot be opened here.')}
                                        {' '}
                                        <span className="font-medium text-ink">{r.meta || t('Not recorded')}</span>
                                        {' — '}
                                        {t('that is where to find it.')}
                                      </p>
                                    )}
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

      {/* A failed open is the one thing that has to interrupt, because the row
          the student tapped looks unchanged otherwise. */}
      {openError && overlayPortal(
        <p role="alert" className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-lg border border-danger/30 bg-surface px-4 py-3 text-[13px] text-danger shadow-pop">
          {openError}
        </p>
      )}
    </PageContainer>
  )
}

/**
 * A student's own documents, beside the library's.
 *
 * They open in the same reader with the same tools and the same annotation
 * store, so there is nothing to learn twice — see `useReaderSource` for why
 * that costs no branching. The only thing said differently is where the file
 * lives: in demo mode it never leaves the browser, and pretending otherwise
 * would be a promise the deployment cannot keep.
 */
/** State of one row's on-demand media preview. */
interface PreviewEntry {
  status: 'loading' | 'ready' | 'error'
  url?: string
  revoke?: boolean
  message?: string
}

/**
 * Resolve the bytes behind one media row, only when its preview button is pressed.
 *
 * `previewSource` covers everything already sitting in this browser or in the
 * board/note document itself — a data URL, or an IndexedDB reference resolved
 * the same way the whiteboard and notebook resolve their own images. A synced
 * upload with no local bytes falls back to the same file endpoint the download
 * button already calls; nothing here is fetched until asked for.
 */
async function loadPreviewSource(row: MediaRow): Promise<{ url: string; revoke: boolean }> {
  if (row.previewSource) return resolveMediaSource(row.previewSource)
  if (row.documentId && API_MODE) {
    const blob = await apiFetchBlob(`/my-documents/${encodeURIComponent(row.documentId)}/file`)
    return { url: URL.createObjectURL(blob), revoke: true }
  }
  throw new Error('No preview is available for this file.')
}

function canPreview(row: MediaRow): boolean {
  return Boolean(row.previewSource) || (row.kind === 'image' && Boolean(row.documentId) && API_MODE)
}

function quotaShare(bytes: number, quotaBytes: number): number {
  if (quotaBytes <= 0) return 0
  return Math.max(0, Math.min(100, (bytes / quotaBytes) * 100))
}

function MyUploads() {
  const t = useT()
  const navigate = useNavigate()
  const documents = useMyDocuments()
  const [notes] = usePersistentState<Note[]>('synapse.notebook.notes', initialNotes)
  const [board] = usePersistentState<BoardState>('synapse.whiteboard.board', INITIAL_BOARD)
  const [busy, setBusy] = useState<number | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const [mediaOpen, setMediaOpen] = useState(false)
  const [previews, setPreviews] = useState<Record<string, PreviewEntry>>({})
  const previewsRef = useRef(previews)
  useEffect(() => { previewsRef.current = previews }, [previews])
  // Object URLs are cheap to leak one at a time and easy to leak all at once —
  // revoke whatever is still open when the page itself goes away.
  useEffect(() => () => {
    Object.values(previewsRef.current).forEach((entry) => { if (entry.url && entry.revoke) URL.revokeObjectURL(entry.url) })
  }, [])

  const readable = documents.items.filter((item) => item.mediaType === 'pdf')
  const mediaRows = mediaInventory({ documents: documents.items, notes, board })
  const countedBytes = dedupedMediaBytes({ documents: documents.items, notes, board })
  const documentBytes = useMemo(() => documents.items.reduce((sum, item) => sum + item.sizeBytes, 0), [documents.items])
  const mediaOnlyBytes = Math.max(0, countedBytes - documentBytes)

  const accept = async (files: FileList | null) => {
    const file = files?.[0]
    if (!file) return
    setFailure(null)
    setBusy(0)
    try {
      await documents.upload(file, setBusy)
    } catch (cause) {
      setFailure(cause instanceof Error ? cause.message : t('That file could not be added.'))
    } finally {
      setBusy(null)
    }
  }

  function togglePreview(row: MediaRow) {
    const existing = previews[row.id]
    if (existing) {
      if (existing.url && existing.revoke) URL.revokeObjectURL(existing.url)
      setPreviews((current) => { const next = { ...current }; delete next[row.id]; return next })
      return
    }
    setPreviews((current) => ({ ...current, [row.id]: { status: 'loading' } }))
    void loadPreviewSource(row)
      .then((result) => setPreviews((current) => ({ ...current, [row.id]: { status: 'ready', url: result.url, revoke: result.revoke } })))
      .catch((cause) => setPreviews((current) => ({
        ...current,
        [row.id]: { status: 'error', message: cause instanceof Error ? cause.message : t('That could not be opened.') },
      })))
  }

  return (
    <div className="space-y-3">
      <Panel className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-serif text-[15.5px] font-semibold text-ink">{t('My uploads')}</h2>
            <p className="mt-0.5 text-[12.5px] text-ink-3">
              {documents.synced
                ? t('Your documents and media, counted once against the same account quota wherever they appear.')
                : t('Your documents and media. This preview keeps uploaded bytes in this browser only.')}
            </p>
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-primary-line bg-primary-tint px-3 py-2 text-[13px] font-semibold text-primary-strong hover:bg-primary-tint/70">
            <Icon icon={Upload} size={15} />
            {busy === null ? t('Add a file') : `${Math.round(busy * 100)}%`}
            <input
              type="file"
              className="sr-only"
              disabled={busy !== null}
              onChange={(event) => { void accept(event.target.files); event.target.value = '' }}
            />
          </label>
        </div>
        {documents.quotaBytes > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-[12px] text-ink-2">
              <span className="font-semibold text-ink">{t('Storage')}</span>
              <span className="tnum font-mono text-ink-3">{megabytes(countedBytes)} / {megabytes(documents.quotaBytes)} MB</span>
            </div>
            <div className="mt-1.5 flex h-2 overflow-hidden rounded-full bg-inset">
              <span className="h-full bg-primary" style={{ width: `${quotaShare(documentBytes, documents.quotaBytes)}%` }} />
              <span className="h-full bg-accent" style={{ width: `${quotaShare(mediaOnlyBytes, documents.quotaBytes)}%` }} />
            </div>
            <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[10.5px] text-ink-3">
              <span className="inline-flex items-center gap-1.5"><span className="size-2 shrink-0 rounded-[2px] bg-primary" />{t('Documents')} · {megabytes(documentBytes)} MB</span>
              <span className="inline-flex items-center gap-1.5"><span className="size-2 shrink-0 rounded-[2px] bg-accent" />{t('Media')} · {megabytes(mediaOnlyBytes)} MB</span>
              <span>{t('Deduplicated — a file used twice counts once.')}</span>
            </div>
          </div>
        )}
        {(failure || documents.error) && (
          <p role="alert" className="mt-2 text-[12.5px] text-danger">{failure ?? documents.error}</p>
        )}
      </Panel>

      {documents.loading ? (
        <Panel><p className="p-6 text-center text-[13px] text-ink-3">{t('Opening…')}</p></Panel>
      ) : readable.length === 0 && mediaRows.length === 0 ? (
        <Panel>
          <EmptyState
            icon={Upload}
            title={t('Nothing uploaded yet')}
            description={t('Add a lecture handout, image, or board attachment. Documents and media are listed separately here.')}
          />
        </Panel>
      ) : (
        <div className="space-y-3">
          {/* Documents are the primary list: always visible, front and centre. */}
          <Panel className="overflow-hidden">
            <div className="border-b border-line bg-surface-2/50 px-4 py-3">
              <h3 className="text-[13px] font-semibold text-ink">{t('Documents')}</h3>
              <p className="text-[11.5px] text-ink-3">{t('PDFs that open in the resource reader.')}</p>
            </div>
            {readable.length === 0 ? (
              <p className="p-5 text-[12.5px] text-ink-3">{t('No reader-ready documents yet.')}</p>
            ) : (
              <ul className="divide-y divide-line">
                {readable.map((item) => (
                  <li
                    key={item.id}
                    aria-label={`${t('Open resource')}: ${item.title}`}
                    {...clickableRow(() => navigate(`/app/resources/${uploadRouteId(item.id)}`), 'group flex items-center gap-3 px-4 py-2.5 hover:bg-inset/60')}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2"><Icon icon={FileText} size={16} /></span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13.5px] font-medium text-ink">{item.title}</p>
                      <p className="tnum mt-0.5 font-mono text-[11px] text-ink-3">{megabytes(item.sizeBytes)} MB · {t('Resources upload')}</p>
                    </div>
                    <span {...stopRowClick} className="contents">
                      <IconButton icon={Pencil} label={t('Rename')} size="sm" onClick={() => { const title = window.prompt(t('Rename'), item.title); if (title?.trim()) void documents.rename(item.id, title.trim()) }} />
                      <IconButton icon={Trash2} label={t('Delete')} size="sm" onClick={() => { if (window.confirm(t('Delete this document? Your marks on it are deleted with it.'))) void documents.remove(item.id) }} />
                    </span>
                    <Icon icon={ChevronRight} size={16} className="shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          {/* Media stays out of the way until asked for — a button reveals it,
              never a permanent second column beside the documents. */}
          <Panel className="overflow-hidden">
            <button
              type="button"
              onClick={() => mediaRows.length > 0 && setMediaOpen((current) => !current)}
              aria-expanded={mediaRows.length > 0 ? mediaOpen : undefined}
              disabled={mediaRows.length === 0}
              className={cn(
                'flex w-full items-center gap-3 px-4 py-3 text-start',
                mediaRows.length > 0 && 'hover:bg-inset/60',
              )}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2"><Icon icon={Images} size={16} /></span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-ink">{t('Media')}</p>
                <p className="text-[11.5px] text-ink-3">{t('Images and files from resources, notebooks, and whiteboards.')}</p>
              </div>
              {mediaRows.length > 0 ? (
                <>
                  <span className="tnum shrink-0 font-mono text-[11px] text-ink-3">{mediaRows.length} · {megabytes(mediaRows.reduce((sum, r) => sum + r.sizeBytes, 0))} MB</span>
                  <Icon icon={ChevronRight} size={16} className="chevron-turn shrink-0 text-ink-3" open={mediaOpen} />
                </>
              ) : (
                <span className="shrink-0 text-[11.5px] italic text-ink-3">{t('No media yet')}</span>
              )}
            </button>
            {mediaRows.length > 0 && (
              <Collapse open={mediaOpen}>
                <ul className="divide-y divide-line border-t border-line">
                  {mediaRows.map((row) => {
                    const entry = previews[row.id]
                    return (
                      <li key={row.id}>
                        <div className="flex items-center gap-3 px-4 py-2.5">
                          <span className="grid size-9 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-2"><Icon icon={row.kind === 'image' ? ImagePlus : Upload} size={16} /></span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[13.5px] font-medium text-ink">{row.title}</p>
                            <p className="tnum mt-0.5 font-mono text-[11px] text-ink-3">{megabytes(row.sizeBytes)} MB · {t(row.sourceLabel)}</p>
                          </div>
                          {canPreview(row) && (
                            <IconButton
                              icon={entry ? EyeOff : Eye}
                              label={entry ? t('Hide preview') : t('Preview')}
                              size="sm"
                              onClick={() => togglePreview(row)}
                            />
                          )}
                          {row.documentId && API_MODE && (
                            <IconButton icon={ChevronRight} label={t('Download')} size="sm" onClick={() => void apiDownload(`/my-documents/${encodeURIComponent(row.documentId!)}/file`, row.title)} />
                          )}
                        </div>
                        {entry && (
                          <div className="px-4 pb-3 ps-12">
                            {entry.status === 'loading' && <p className="text-[12px] text-ink-3">{t('Loading…')}</p>}
                            {entry.status === 'error' && <p role="alert" className="text-[12px] text-danger">{entry.message}</p>}
                            {entry.status === 'ready' && entry.url && (
                              <img src={entry.url} alt={row.title} className="max-h-52 w-auto max-w-full rounded-md border border-line object-contain" />
                            )}
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </Collapse>
            )}
          </Panel>
        </div>
      )}
    </div>
  )
}

interface MediaInventoryInput {
  documents: MyDocument[]
  notes: Note[]
  board: BoardState
}

interface MediaRow {
  id: string
  title: string
  sizeBytes: number
  sourceLabel: string
  kind: 'image' | 'file'
  documentId?: string
  /**
   * Something `resolveMediaSource` can turn into a renderable URL on demand —
   * a legacy data URL or a stored-media reference. Absent for rows whose only
   * copy lives on the server, where the preview button falls back to the same
   * per-document file endpoint the download button already calls.
   */
  previewSource?: string
}

function isImageDocument(item: MyDocument): boolean {
  return item.mediaType === 'image' || Boolean(item.mimeType?.startsWith('image/'))
}

function mediaInventory({ documents, notes, board }: MediaInventoryInput): MediaRow[] {
  const rows: MediaRow[] = []
  const byDocument = new Map(documents.map((item) => [item.id, item]))

  documents
    .filter((item) => item.mediaType !== 'pdf')
    .forEach((item) => rows.push({
      id: `document:${item.id}`,
      title: item.title,
      sizeBytes: item.sizeBytes,
      sourceLabel: item.sourceKind === 'notebook' ? 'Notebook' : item.sourceKind === 'whiteboard' ? 'Whiteboard' : 'Resources upload',
      kind: isImageDocument(item) ? 'image' : 'file',
      documentId: item.id,
      previewSource: item.ref,
    }))

  notes
    .filter((note) => Boolean(note.imageData) && !note.imageDocumentId)
    .forEach((note) => rows.push({
      id: `note:${note.id}`,
      title: note.title || 'Notebook image',
      sizeBytes: dataUrlBytes(note.imageData ?? ''),
      sourceLabel: 'Notebook',
      kind: 'image',
      previewSource: note.imageData,
    }))

  imagesOf(board).filter((image) => !image.documentId || !byDocument.has(image.documentId)).forEach((image) => rows.push({
    id: `board-image:${image.id}`,
    title: image.alt || 'Whiteboard image',
    sizeBytes: dataUrlBytes(image.src ?? ''),
    sourceLabel: 'Whiteboard',
    kind: 'image',
    previewSource: image.src,
  }))

  filesOf(board).filter((file) => !byDocument.has(file.documentId)).forEach((file) => {
    const document = byDocument.get(file.documentId)
    rows.push({
      id: `board-file:${file.id}`,
      title: file.name,
      sizeBytes: document?.sizeBytes ?? file.sizeBytes,
      sourceLabel: 'Whiteboard',
      kind: 'file',
      documentId: file.documentId,
    })
  })

  return rows.sort((a, b) => a.sourceLabel.localeCompare(b.sourceLabel) || a.title.localeCompare(b.title))
}

function dedupedMediaBytes({ documents, notes, board }: MediaInventoryInput): number {
  const countedDocumentIds = new Set<string>()
  let total = 0
  for (const document of documents) {
    countedDocumentIds.add(document.id)
    total += document.sizeBytes
  }
  for (const note of notes) {
    if (note.imageData) total += dataUrlBytes(note.imageData)
  }
  for (const image of imagesOf(board)) total += dataUrlBytes(image.src ?? '')
  for (const file of filesOf(board)) {
    if (file.documentId && !countedDocumentIds.has(file.documentId)) total += file.sizeBytes
  }
  return total
}

function dataUrlBytes(value: string): number {
  const body = value.split(',')[1] ?? value
  return Math.ceil((body.length * 3) / 4)
}

function megabytes(bytes: number): string {
  return (bytes / (1024 * 1024)).toFixed(bytes < 10 * 1024 * 1024 ? 1 : 0)
}
