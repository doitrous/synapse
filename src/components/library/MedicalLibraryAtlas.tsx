import { useDeferredValue, useMemo, useState } from 'react'
import { BookOpen, ChevronRight, Database, GraduationCap, Home, Layers3, Microscope, Network, Search, Stethoscope } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { SearchInput } from '@/components/ui/Field'
import { cn } from '@/lib/cn'
import {
  MEDICAL_TAXONOMY_DIVISIONS,
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

function plural(value: number, singular: string, pluralLabel = `${singular}s`) {
  return `${value.toLocaleString()} ${value === 1 ? singular : pluralLabel}`
}

function fallbackPlacement(article: AtlasArticle) {
  const map: Record<string, string> = { cvs: 'SYS-CVS', resp: 'SYS-RES', renal: 'SYS-REN', gi: 'SYS-GIT', neuro: 'SYS-NEU', endo: 'SYS-END', msk: 'SYS-MSK', pharm: 'SYS-FND-T04' }
  return map[article.subjectId]
}

export function LibraryLanding({
  taxonomy,
  articles,
  universityCount,
  yearCount,
  onOpenView,
  onOpenArticle,
}: {
  taxonomy: MedicalTaxonomyNode[]
  articles: AtlasArticle[]
  universityCount: number
  yearCount: number
  onOpenView: (view: Exclude<MedicalLibraryView, 'home'>, nodeId?: string) => void
  onOpenArticle: (articleId: string) => void
}) {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const counts = useMemo(() => Object.fromEntries(MEDICAL_TAXONOMY_DIVISIONS.map((division) => {
    const nodes = taxonomy.filter((node) => node.division === division.id)
    return [division.id, { nodes: nodes.length, roots: nodes.filter((node) => node.parentId === null).length }]
  })), [taxonomy]) as Record<MedicalTaxonomyDivision, { nodes: number; roots: number }>
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
          <h1 className="mt-5 font-serif text-[34px] font-semibold leading-[1.08] tracking-[-0.025em] text-ink sm:text-[42px]">Choose how you want to enter medicine.</h1>
          <p className="mt-4 max-w-[42rem] text-[15px] leading-relaxed text-ink-2">Every route reaches the same connected, reviewed articles and concepts. Start with an organ system, a university discipline, a clinical task, or your curriculum.</p>
        </div>

        <div className="relative mt-7 max-w-[46rem]">
          <SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search systems, disciplines, skills, conditions, or articles…" className="h-12 bg-surface pe-4 ps-11 text-[14px] shadow-panel" />
          <Icon icon={Search} size={17} className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-ink-3" />
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
                  {nodeResults.map((node) => <button key={node.id} type="button" onClick={() => onOpenView(node.division, node.id)} className="group flex w-full items-start gap-3 rounded-lg px-2 py-2.5 text-start hover:bg-inset"><span className="mt-1 size-2 shrink-0 rounded-full bg-accent" /><span className="min-w-0 flex-1"><span className="block text-[13px] font-medium text-ink">{node.title}</span><span className="mt-0.5 block truncate font-mono text-[9.5px] text-ink-3">{node.divisionLabel} · {node.id}</span></span><Icon icon={ChevronRight} size={14} className="mt-1 text-ink-3 transition-transform group-hover:translate-x-0.5" /></button>)}
                </div>
              </div>
            )}
          </section>
        ) : (
          <div className="mt-9 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {MEDICAL_LIBRARY_VIEWS.map((view) => {
              const IconComponent = view.icon
              const count = view.id === 'curriculum' ? `${universityCount} universities · ${yearCount} years` : `${plural(counts[view.id].roots, view.id === 'system' ? 'root' : view.id === 'discipline' ? 'discipline' : 'domain')} · ${counts[view.id].nodes.toLocaleString()} nodes`
              return (
                <button key={view.id} type="button" onClick={() => onOpenView(view.id)} className="group flex min-h-52 flex-col rounded-xl border border-line bg-surface p-5 text-start shadow-panel transition-[border-color,background-color,transform] hover:-translate-y-0.5 hover:border-accent-line hover:bg-accent-tint/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40">
                  <span className="grid size-10 place-items-center rounded-lg border border-line bg-surface-2 text-ink-2 transition-colors group-hover:border-accent-line group-hover:bg-accent-tint group-hover:text-accent-strong"><Icon icon={IconComponent} size={18} /></span>
                  <h2 className="mt-5 font-serif text-[19px] font-semibold text-ink">{view.label}</h2>
                  <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-ink-3">{view.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-2 border-t border-line pt-3"><span className="text-[10.5px] font-medium text-ink-3">{count}</span><Icon icon={ChevronRight} size={15} className="text-accent transition-transform group-hover:translate-x-0.5" /></div>
                </button>
              )
            })}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5 text-[11.5px] text-ink-3"><span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-success" />Only reviewed articles appear to students</span><span>Empty branches remain visible as an honest study map</span><span>One article can appear in several routes without duplication</span></div>
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

export function AtlasNavigation({
  taxonomy,
  articles,
  view,
  selectedNodeId,
  selectedArticleId,
  universityCount,
  yearCount,
  onViewChange,
  onNodeSelect,
  onArticleSelect,
}: {
  taxonomy: MedicalTaxonomyNode[]
  articles: AtlasArticle[]
  view: Exclude<MedicalLibraryView, 'home'>
  selectedNodeId?: string
  selectedArticleId?: string
  universityCount: number
  yearCount: number
  onViewChange: (view: MedicalLibraryView) => void
  onNodeSelect: (nodeId: string) => void
  onArticleSelect: (articleId: string) => void
}) {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const [open, setOpen] = useState<Set<string>>(() => new Set())
  const index = useMemo(() => indexMedicalTaxonomy(taxonomy), [taxonomy])
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
    <div className="contents">
      <aside className="hidden min-h-0 flex-col border-e border-line bg-surface-2/35 xl:flex">
        <div className="flex h-12 items-center gap-2 border-b border-line px-3"><Icon icon={Layers3} size={15} className="text-accent" /><span className="font-serif text-[15px] font-semibold text-ink">Library views</span></div>
        <nav className="space-y-1 p-2" aria-label="Medical library views">
          <button type="button" onClick={() => onViewChange('home')} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px] font-medium text-ink-2 hover:bg-surface hover:text-ink"><Icon icon={Home} size={15} />Library home</button>
          {MEDICAL_LIBRARY_VIEWS.map((item) => <button key={item.id} type="button" onClick={() => onViewChange(item.id)} className={cn('flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-start text-[12px] font-medium', view === item.id ? 'bg-accent-tint text-accent-strong' : 'text-ink-2 hover:bg-surface hover:text-ink')}><Icon icon={item.icon} size={15} /><span className="min-w-0 flex-1 truncate">{item.shortLabel}</span></button>)}
        </nav>
        <div className="mt-auto border-t border-line px-3 py-3 text-[10.5px] leading-relaxed text-ink-3">{taxonomy.length.toLocaleString()} reviewed taxonomy nodes<br />{articles.length.toLocaleString()} published {articles.length === 1 ? 'article' : 'articles'}</div>
      </aside>

      <aside className="flex min-h-0 flex-col border-e border-line bg-surface">
        <div className="border-b border-line p-3"><SearchInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search this view…" /></div>
        <div className="border-b border-line px-3 py-2.5"><p className="text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">{MEDICAL_LIBRARY_VIEWS.find((item) => item.id === view)?.label}</p><p className="mt-1 text-[10.5px] text-ink-3">{view === 'curriculum' ? `${universityCount} universities · ${yearCount} years` : `${roots.length} roots · ${taxonomy.filter((node) => node.division === view).length.toLocaleString()} nodes`}</p></div>
        <div className="min-h-0 flex-1 overflow-y-auto p-2">
          {view === 'curriculum' ? <div className="rounded-lg border border-line bg-surface-2/50 p-3"><p className="text-[12.5px] font-semibold text-ink">Curriculum mapping is ready</p><p className="mt-1.5 text-[11.5px] leading-relaxed text-ink-3">Published articles appear here only after a university, year, and module are explicitly assigned. No placement is guessed.</p></div> : deferredQuery.trim() ? (
            <div className="space-y-3">
              {articleResults.length > 0 && <div><p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-ink-3">Articles</p>{articleResults.map((article) => <button key={article.id} type="button" onClick={() => onArticleSelect(article.id)} className={cn('w-full rounded-md px-2 py-2 text-start text-[12px] hover:bg-inset', selectedArticleId === article.id ? 'bg-accent-tint text-accent-strong' : 'text-ink-2')}>{article.title}</button>)}</div>}
              <div><p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-ink-3">Subjects & topics</p>{nodeResults.map((node) => <button key={node.id} type="button" onClick={() => selectNode(node.id)} className="w-full rounded-md px-2 py-2 text-start hover:bg-inset"><span className="block text-[12px] text-ink-2">{node.title}</span><span className="mt-0.5 block truncate font-mono text-[9px] text-ink-3">{node.id}</span></button>)}</div>
              {articleResults.length === 0 && nodeResults.length === 0 && <p className="px-2 py-6 text-center text-[12px] text-ink-3">No result in this view.</p>}
            </div>
          ) : <ul>{roots.map((root) => <TaxonomyBranch key={root.id} node={root} index={index} open={open} selectedNodeId={selectedNodeId} articleCounts={articleCounts} onToggle={(nodeId) => setOpen((current) => { const next = new Set(current); if (next.has(nodeId)) next.delete(nodeId); else next.add(nodeId); return next })} onSelect={selectNode} />)}</ul>}
        </div>
      </aside>
    </div>
  )
}

export function TaxonomyNodeOverview({ node, taxonomy, articles, onOpenArticle }: { node?: MedicalTaxonomyNode; taxonomy: MedicalTaxonomyNode[]; articles: AtlasArticle[]; onOpenArticle: (articleId: string) => void }) {
  const index = useMemo(() => indexMedicalTaxonomy(taxonomy), [taxonomy])
  const related = useMemo(() => {
    if (!node) return []
    return articles.filter((article) => {
      const placements = [article.primaryNodeId ?? fallbackPlacement(article), ...(article.secondaryNodeIds ?? [])].filter(Boolean) as string[]
      return placements.some((placement) => index.lineage(placement).some((ancestor) => ancestor.id === node.id))
    })
  }, [articles, index, node])

  if (!node) return <div className="grid min-h-[60vh] place-items-center px-6 text-center"><div className="max-w-md"><span className="mx-auto grid size-11 place-items-center rounded-xl bg-accent-tint text-accent-strong"><Icon icon={BookOpen} size={20} /></span><h1 className="mt-4 font-serif text-[22px] font-semibold text-ink">Choose a subject or topic</h1><p className="mt-2 text-[13px] leading-relaxed text-ink-3">The atlas shows the full study map. Select a branch to see its reviewed articles.</p></div></div>
  const lineage = index.lineage(node.id)
  return (
    <div className="mx-auto max-w-[62rem] px-5 py-8 sm:px-8 lg:py-10">
      <nav className="flex flex-wrap items-center gap-1.5 text-[11.5px] text-ink-3">{lineage.map((item, index) => <span key={item.id} className="contents"><span>{item.title}</span>{index < lineage.length - 1 && <Icon icon={ChevronRight} size={11} />}</span>)}</nav>
      <div className="mt-5 flex items-start gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-xl border border-accent-line bg-accent-tint/50 text-accent-strong"><Icon icon={Network} size={19} /></span><div><p className="text-[10.5px] font-bold uppercase tracking-[0.07em] text-accent-strong">{node.level}</p><h1 className="mt-1 font-serif text-[30px] font-semibold leading-tight tracking-[-0.02em] text-ink">{node.title}</h1><p className="mt-2 font-mono text-[10px] text-ink-3">{node.id}</p></div></div>
      <div className="mt-7 grid gap-3 sm:grid-cols-3"><div className="rounded-xl border border-line bg-surface p-4 shadow-panel"><p className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">Role</p><p className="mt-2 text-[13px] text-ink-2">{node.role}</p></div><div className="rounded-xl border border-line bg-surface p-4 shadow-panel"><p className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">Priority</p><p className="mt-2 text-[13px] text-ink-2">{node.priority}</p></div><div className="rounded-xl border border-line bg-surface p-4 shadow-panel"><p className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-3">Reviewed articles</p><p className="tnum mt-2 font-mono text-[20px] font-semibold text-ink">{related.length}</p></div></div>
      {node.note && <p className="mt-6 rounded-xl border border-line bg-surface-2/45 px-4 py-3 text-[12.5px] leading-relaxed text-ink-2">{node.note}</p>}
      <section className="mt-8"><div className="flex items-end justify-between gap-3 border-b border-line pb-3"><div><p className="text-[10.5px] font-bold uppercase tracking-[0.07em] text-ink-3">Published reading</p><h2 className="mt-1 font-serif text-[20px] font-semibold text-ink">Articles in this branch</h2></div><span className="text-[11px] text-ink-3">Reviewed content only</span></div>{related.length > 0 ? <div className="mt-3 grid gap-2 sm:grid-cols-2">{related.map((article) => <button key={article.id} type="button" onClick={() => onOpenArticle(article.id)} className="group rounded-xl border border-line bg-surface p-4 text-start shadow-panel hover:border-accent-line hover:bg-accent-tint/15"><div className="flex items-start gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-tint text-accent-strong"><Icon icon={BookOpen} size={14} /></span><span className="min-w-0 flex-1"><span className="block font-serif text-[16px] font-semibold text-ink">{article.title}</span><span className="mt-1 block line-clamp-2 text-[11.5px] leading-relaxed text-ink-3">{article.summary}</span></span><Icon icon={ChevronRight} size={14} className="mt-1 text-ink-3 transition-transform group-hover:translate-x-0.5" /></div></button>)}</div> : <div className="mt-3 rounded-xl border border-dashed border-line-2 bg-surface-2/25 px-5 py-8 text-center"><p className="text-[13px] font-medium text-ink-2">No reviewed article is published here yet.</p><p className="mt-1 text-[11.5px] text-ink-3">This branch stays visible as part of the complete study map; drafts remain in medical review.</p></div>}</section>
    </div>
  )
}
