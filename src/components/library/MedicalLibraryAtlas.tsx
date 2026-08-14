import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { BookOpen, ChevronRight, Database, GraduationCap, Home, Layers3, Microscope, Network, Stethoscope } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { SearchInput } from '@/components/ui/Field'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import {
  indexMedicalTaxonomy,
  searchMedicalTaxonomy,
  type MedicalTaxonomyDivision,
  type MedicalTaxonomyNode,
} from '@/data/medicalLibraryTaxonomy'

export type MedicalLibraryView = 'home' | MedicalTaxonomyDivision | 'curriculum'

export interface AtlasArticle {
  id: string
  title: string
  summary: string
  subjectId: string
  topicTitle: string
  primaryNodeId?: string
  secondaryNodeIds?: string[]
}

interface ViewDefinition {
  id: Exclude<MedicalLibraryView, 'home'>
  label: string
  shortLabel: string
  description: string
  icon: typeof Layers3
}

export const MEDICAL_LIBRARY_VIEWS: ViewDefinition[] = [
  { id: 'system', label: 'Systems & General', shortLabel: 'Systems', description: 'Organ systems, foundations, life stages, infection, emergencies, and population health.', icon: Stethoscope },
  { id: 'discipline', label: 'By Discipline', shortLabel: 'Disciplines', description: 'Basic sciences, clinical specialties, and the subjects used in university teaching.', icon: Microscope },
  { id: 'skills', label: 'Clinical Skills', shortLabel: 'Skills', description: 'History, examination, interpretation, procedures, prescribing, communication, and reasoning.', icon: GraduationCap },
  { id: 'knowledge', label: 'Clinical Knowledge', shortLabel: 'Knowledge', description: 'Presentations, diagnosis, management, therapeutics, emergencies, prevention, and evidence.', icon: Network },
  { id: 'curriculum', label: 'My Curriculum', shortLabel: 'Curriculum', description: 'Find reviewed content assigned to your university, year, and module.', icon: Database },
]

function fallbackPlacement(article: AtlasArticle) {
  const map: Record<string, string> = { cvs: 'SYS-CVS', resp: 'SYS-RES', renal: 'SYS-REN', gi: 'SYS-GIT', neuro: 'SYS-NEU', endo: 'SYS-END', msk: 'SYS-MSK', pharm: 'SYS-FND-T04' }
  return map[article.subjectId]
}

export function LibraryLanding({
  taxonomy,
  articles,
  onOpenView,
  onOpenArticle,
}: {
  taxonomy: MedicalTaxonomyNode[]
  articles: AtlasArticle[]
  onOpenView: (view: Exclude<MedicalLibraryView, 'home'>, nodeId?: string) => void
  onOpenArticle: (articleId: string) => void
}) {
  const t = useT()
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const nodeResults = useMemo(() => searchMedicalTaxonomy(taxonomy, deferredQuery).slice(0, 8), [deferredQuery, taxonomy])
  const articleResults = useMemo(() => {
    const q = deferredQuery.trim().toLocaleLowerCase()
    return q ? articles.filter((article) => `${article.title} ${article.summary} ${article.topicTitle}`.toLocaleLowerCase().includes(q)).slice(0, 6) : []
  }, [articles, deferredQuery])
  const searching = deferredQuery.trim().length > 0

  return (
    <div className="min-h-full bg-paper px-4 py-8 sm:px-7 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-[76rem]">
        <div className="max-w-[46rem]">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-line bg-accent-tint/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.07em] text-accent-strong"><Icon icon={BookOpen} size={13} />Medical library</div>
          {/* This asked a question — "Choose how you want to enter medicine." —
              of someone who had come to read. A landing page should say what
              the library is and what it is good for; the five cards below are
              already the choice. */}
          <h1 className="mt-5 font-serif text-[34px] font-semibold leading-[1.08] tracking-[-0.025em] text-ink sm:text-[42px]">{t('Every system, every source, one library.')}</h1>
          <p className="mt-4 max-w-[42rem] text-[15px] leading-relaxed text-ink-2">{t('Reviewed articles across the whole curriculum, each one carrying the concepts it teaches, the questions that test it, and the exact page of the source it came from. Find it by organ system, by discipline, by clinical skill, by condition, or straight from your own timetable.')}</p>
        </div>

        {/* SearchInput draws its own magnifier. A second one was added here and
            fought the component's padding, which is why the icon looked doubled. */}
        <div className="mt-7 max-w-[46rem]">
          <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('Search systems, disciplines, skills, conditions, or articles…')} className="h-12 bg-surface text-[14px] shadow-panel" />
        </div>

        {searching ? (
          <section className="mt-6 overflow-hidden rounded-xl border border-line bg-surface shadow-panel" aria-label="Library search results">
            <div className="border-b border-line px-4 py-3"><p className="text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">Search results</p></div>
            {articleResults.length === 0 && nodeResults.length === 0 ? <p className="px-4 py-8 text-center text-[13px] text-ink-3">No reviewed article or taxonomy branch matches this search.</p> : (
              <div className="grid divide-y divide-line lg:grid-cols-2 lg:divide-x lg:divide-y-0">
                <div className="p-2">
                  <p className="px-2 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">Reviewed articles</p>
                  {articleResults.map((article) => <button key={article.id} type="button" onClick={() => onOpenArticle(article.id)} className="group flex w-full items-start gap-3 rounded-lg px-2 py-2.5 text-start hover:bg-inset"><span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md bg-accent-tint text-accent-strong"><Icon icon={BookOpen} size={13} /></span><span className="min-w-0 flex-1"><span className="block text-[13px] font-medium text-ink">{article.title}</span><span className="mt-0.5 block truncate text-[11px] text-ink-3">{article.topicTitle}</span></span><Icon icon={ChevronRight} size={14} className="mt-1 text-ink-3 transition-transform group-hover:translate-x-0.5" /></button>)}
                  {articleResults.length === 0 && <p className="px-2 py-4 text-[12px] text-ink-3">No published article matches yet.</p>}
                </div>
                <div className="p-2">
                  <p className="px-2 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">Subjects & topics</p>
                  {nodeResults.map((node) => <button key={node.id} type="button" onClick={() => onOpenView(node.division, node.id)} className="group flex w-full items-start gap-3 rounded-lg px-2 py-2.5 text-start hover:bg-inset"><span className="mt-1 size-2 shrink-0 rounded-full bg-accent" /><span className="min-w-0 flex-1"><span className="block text-[13px] font-medium text-ink">{node.title}</span><span className="mt-0.5 block truncate text-[11px] text-ink-3">{node.divisionLabel}</span></span><Icon icon={ChevronRight} size={14} className="mt-1 text-ink-3 transition-transform group-hover:translate-x-0.5" /></button>)}
                </div>
              </div>
            )}
          </section>
        ) : (
          <div className="mt-9 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {MEDICAL_LIBRARY_VIEWS.map((view) => {
              const IconComponent = view.icon
              return (
                <button key={view.id} type="button" onClick={() => onOpenView(view.id)} className="group flex min-h-44 flex-col rounded-xl border border-line bg-surface p-5 text-start shadow-panel transition-[border-color,background-color,transform] hover:-translate-y-0.5 hover:border-accent-line hover:bg-accent-tint/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40">
                  <span className="grid size-10 place-items-center rounded-lg border border-line bg-surface-2 text-ink-2 transition-colors group-hover:border-accent-line group-hover:bg-accent-tint group-hover:text-accent-strong"><Icon icon={IconComponent} size={18} /></span>
                  <h2 className="mt-5 font-serif text-[19px] font-semibold text-ink">{t(view.label)}</h2>
                  <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-ink-3">{t(view.description)}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-medium text-accent-strong">{t('Open')}<Icon icon={ChevronRight} size={14} className="transition-transform group-hover:translate-x-0.5" /></span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function TaxonomyBranch({ node, index, open, selectedNodeId, articleCounts, onToggle, onSelect }: {
  node: MedicalTaxonomyNode
  index: ReturnType<typeof indexMedicalTaxonomy>
  open: Set<string>
  selectedNodeId?: string
  articleCounts: Map<string, number>
  onToggle: (nodeId: string) => void
  onSelect: (nodeId: string) => void
}) {
  const children = index.children(node.id)
  const expanded = open.has(node.id)
  return (
    <li className="[content-visibility:auto]">
      <div className={cn('group flex min-h-9 items-center gap-1 rounded-md pe-1', selectedNodeId === node.id && 'bg-accent-tint/55')}>
        {children.length > 0 ? <button type="button" onClick={() => onToggle(node.id)} className="grid size-8 shrink-0 place-items-center rounded text-ink-3 hover:bg-inset hover:text-ink" aria-label={`${expanded ? 'Collapse' : 'Expand'} ${node.title}`} aria-expanded={expanded}><Icon icon={ChevronRight} size={13} className={cn('transition-transform', expanded && 'rotate-90')} /></button> : <span className="ms-3 me-2 size-1.5 shrink-0 rounded-full bg-line-2" />}
        <button type="button" onClick={() => onSelect(node.id)} className="min-w-0 flex-1 py-2 text-start"><span className={cn('block truncate text-[12px]', selectedNodeId === node.id ? 'font-semibold text-accent-strong' : 'text-ink-2 group-hover:text-ink')}>{node.title}</span></button>
        {(articleCounts.get(node.id) ?? 0) > 0 && <span className="tnum rounded-full bg-surface px-1.5 py-0.5 font-mono text-[9px] text-ink-3">{articleCounts.get(node.id)}</span>}
      </div>
      {expanded && children.length > 0 && <ul className="ms-4 border-s border-line ps-1">{children.map((child) => <TaxonomyBranch key={child.id} node={child} index={index} open={open} selectedNodeId={selectedNodeId} articleCounts={articleCounts} onToggle={onToggle} onSelect={onSelect} />)}</ul>}
    </li>
  )
}

/**
 * The five library routes as a compact strip. Replaces the old fixed sidebar so a
 * chosen view owns the full width of the page beneath it.
 */
export function LibraryViewTabs({
  view,
  onViewChange,
  className,
}: {
  view: MedicalLibraryView
  onViewChange: (view: MedicalLibraryView) => void
  className?: string
}) {
  return (
    <nav
      aria-label="Medical library views"
      className={cn('flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden', className)}
    >
      <button
        type="button"
        onClick={() => onViewChange('home')}
        aria-current={view === 'home' ? 'page' : undefined}
        className={cn(
          'inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-[12px] font-medium transition-colors',
          view === 'home' ? 'bg-accent-tint text-accent-strong' : 'text-ink-3 hover:bg-inset hover:text-ink',
        )}
      >
        <Icon icon={Home} size={14} />
        Home
      </button>
      {MEDICAL_LIBRARY_VIEWS.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onViewChange(item.id)}
          title={item.description}
          aria-current={view === item.id ? 'page' : undefined}
          className={cn(
            'inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-[12px] font-medium transition-colors',
            view === item.id ? 'bg-accent-tint text-accent-strong' : 'text-ink-2 hover:bg-inset hover:text-ink',
          )}
        >
          <Icon icon={item.icon} size={14} />
          {item.shortLabel}
        </button>
      ))}
    </nav>
  )
}

export function AtlasNavigation({
  taxonomy,
  articles,
  view,
  selectedNodeId,
  selectedArticleId,
  onNodeSelect,
  onArticleSelect,
}: {
  taxonomy: MedicalTaxonomyNode[]
  articles: AtlasArticle[]
  view: Exclude<MedicalLibraryView, 'home'>
  selectedNodeId?: string
  selectedArticleId?: string
  onNodeSelect: (nodeId: string) => void
  onArticleSelect: (articleId: string) => void
}) {
  const t = useT()
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const [open, setOpen] = useState<Set<string>>(() => new Set())
  const index = useMemo(() => indexMedicalTaxonomy(taxonomy), [taxonomy])

  // Arriving at a node — from a search result, a breadcrumb, or a link out of an
  // article — should reveal where it sits. Without this the tree stays collapsed
  // and the selected branch is somewhere inside a closed root, which is most of
  // why this navigation felt like a wall of names.
  useEffect(() => {
    if (!selectedNodeId) return
    setOpen((current) => {
      const next = new Set(current)
      let changed = false
      for (const node of index.lineage(selectedNodeId)) {
        if (!next.has(node.id)) { next.add(node.id); changed = true }
      }
      return changed ? next : current
    })
  }, [index, selectedNodeId])

  /**
   * An article ends the browsing, so the tree narrows to the branch it sits in.
   *
   * Every other path only ever *added* to the open set, so by the third article
   * the rail was a wall of every branch visited on the way. Choosing a topic
   * still expands without closing anything — that is a step in browsing, not
   * the end of it.
   */
  useEffect(() => {
    if (!selectedArticleId || !selectedNodeId) return
    setOpen(new Set(index.lineage(selectedNodeId).map((node) => node.id)))
  }, [index, selectedArticleId, selectedNodeId])
  const articleCounts = useMemo(() => {
    const counts = new Map<string, number>()
    for (const article of articles) {
      const placements = [article.primaryNodeId ?? fallbackPlacement(article), ...(article.secondaryNodeIds ?? [])].filter(Boolean) as string[]
      const ancestors = new Set(placements.flatMap((nodeId) => index.lineage(nodeId).map((node) => node.id)))
      ancestors.forEach((nodeId) => counts.set(nodeId, (counts.get(nodeId) ?? 0) + 1))
    }
    return counts
  }, [articles, index])
  const activeDivision = view === 'curriculum' ? undefined : view
  const roots = activeDivision ? index.roots(activeDivision) : []
  const nodeResults = useMemo(() => activeDivision ? searchMedicalTaxonomy(taxonomy, deferredQuery, activeDivision).slice(0, 60) : [], [activeDivision, deferredQuery, taxonomy])
  const articleResults = useMemo(() => {
    const q = deferredQuery.trim().toLocaleLowerCase()
    return q ? articles.filter((article) => `${article.title} ${article.summary} ${article.topicTitle}`.toLocaleLowerCase().includes(q)).slice(0, 30) : []
  }, [articles, deferredQuery])

  function selectNode(nodeId: string) {
    onNodeSelect(nodeId)
    setOpen((current) => {
      const next = new Set(current)
      index.lineage(nodeId).forEach((node) => next.add(node.id))
      return next
    })
  }

  return (
    <aside className="flex min-h-0 flex-col border-e border-line bg-surface">
      <div className="border-b border-line p-3"><SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search this view…" /></div>
      <div className="border-b border-line px-3 py-2.5"><p className="text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">{t(MEDICAL_LIBRARY_VIEWS.find((item) => item.id === view)?.label ?? '')}</p></div>
      <div className="min-h-0 flex-1 overflow-y-auto p-2">
          {view === 'curriculum' ? <div className="rounded-lg border border-line bg-surface-2/50 p-3"><p className="text-[12.5px] font-semibold text-ink">Curriculum mapping is ready</p><p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-3">Published articles appear here only after a university, year, and module are explicitly assigned. No placement is guessed.</p></div> : deferredQuery.trim() ? (
            <div className="space-y-3">
              {articleResults.length > 0 && <div><p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-ink-3">Articles</p>{articleResults.map((article) => <button key={article.id} type="button" onClick={() => onArticleSelect(article.id)} className={cn('w-full rounded-md px-2 py-2 text-start text-[12px] hover:bg-inset', selectedArticleId === article.id ? 'bg-accent-tint text-accent-strong' : 'text-ink-2')}>{article.title}</button>)}</div>}
              <div><p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Subjects & topics')}</p>{nodeResults.map((node) => <button key={node.id} type="button" onClick={() => selectNode(node.id)} className="w-full rounded-md px-2 py-2 text-start hover:bg-inset"><span className="block text-[12px] text-ink-2">{node.title}</span></button>)}</div>
              {articleResults.length === 0 && nodeResults.length === 0 && <p className="px-2 py-6 text-center text-[12px] text-ink-3">{t('No result in this view.')}</p>}
            </div>
          ) : <ul>{roots.map((root) => <TaxonomyBranch key={root.id} node={root} index={index} open={open} selectedNodeId={selectedNodeId} articleCounts={articleCounts} onToggle={(nodeId) => setOpen((current) => { const next = new Set(current); if (next.has(nodeId)) next.delete(nodeId); else next.add(nodeId); return next })} onSelect={selectNode} />)}</ul>}
      </div>
    </aside>
  )
}

export function TaxonomyNodeOverview({ node, taxonomy, articles, onOpenArticle, onSelectNode }: { node?: MedicalTaxonomyNode; taxonomy: MedicalTaxonomyNode[]; articles: AtlasArticle[]; onOpenArticle: (articleId: string) => void; onSelectNode?: (nodeId: string) => void }) {
  const t = useT()
  const index = useMemo(() => indexMedicalTaxonomy(taxonomy), [taxonomy])
  const related = useMemo(() => {
    if (!node) return []
    return articles.filter((article) => {
      const placements = [article.primaryNodeId ?? fallbackPlacement(article), ...(article.secondaryNodeIds ?? [])].filter(Boolean) as string[]
      return placements.some((placement) => index.lineage(placement).some((ancestor) => ancestor.id === node.id))
    })
  }, [articles, index, node])

  if (!node) return <div className="grid min-h-[60vh] place-items-center px-6 text-center"><div className="max-w-md"><span className="mx-auto grid size-11 place-items-center rounded-xl bg-accent-tint text-accent-strong"><Icon icon={BookOpen} size={20} /></span><h1 className="mt-4 font-serif text-[22px] font-semibold text-ink">{t('Choose a subject or topic')}</h1><p className="mt-2 text-[13px] leading-relaxed text-ink-3">{t('Pick a branch on the left to see what there is to read.')}</p></div></div>

  const lineage = index.lineage(node.id)
  const ancestors = lineage.slice(0, -1)

  return (
    <div className="mx-auto max-w-[52rem] px-5 py-8 sm:px-8 lg:py-10">
      {/* Every ancestor is a way back up the tree, not just a label. */}
      <nav aria-label={t('Breadcrumb')} className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11.5px]">
        {ancestors.map((item) => (
          <span key={item.id} className="inline-flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onSelectNode?.(item.id)}
              disabled={!onSelectNode}
              className="rounded text-ink-3 transition-colors hover:text-accent-strong hover:underline disabled:no-underline disabled:hover:text-ink-3"
            >
              {item.title}
            </button>
            <Icon icon={ChevronRight} size={11} className="text-ink-3" />
          </span>
        ))}
        <span className="font-medium text-ink-2">{node.title}</span>
      </nav>

      <h1 className="mt-4 font-serif text-[30px] font-semibold leading-tight tracking-[-0.02em] text-ink">{node.title}</h1>
      <p className="mt-2 text-[12.5px] text-ink-3">
        {related.length === 0
          ? t('Nothing published here yet')
          : related.length === 1 ? t('1 article') : `${related.length} ${t('articles')}`}
      </p>

      <section className="mt-7">
        {related.length > 0 ? (
          <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface shadow-panel">
            {related.map((article) => (
              <li key={article.id}>
                <button
                  type="button"
                  onClick={() => onOpenArticle(article.id)}
                  data-context-label={article.title}
                  className="group flex w-full items-start gap-3 px-4 py-3.5 text-start transition-colors hover:bg-accent-tint/15"
                >
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md bg-accent-tint text-accent-strong"><Icon icon={BookOpen} size={13} /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-[15.5px] font-semibold text-ink">{article.title}</span>
                    {article.summary && <span className="mt-1 block line-clamp-2 text-[12px] leading-relaxed text-ink-3">{article.summary}</span>}
                  </span>
                  <Icon icon={ChevronRight} size={15} className="mt-1 shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-xl border border-dashed border-line-2 bg-surface-2/25 px-5 py-10 text-center">
            <p className="text-[13px] font-medium text-ink-2">{t('Nothing to read here yet')}</p>
            <p className="mt-1 text-[11.5px] text-ink-3">{t('This branch is part of the map. Articles appear as they are written.')}</p>
          </div>
        )}
      </section>
    </div>
  )
}
