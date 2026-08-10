import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams, useLocation } from 'react-router-dom'
import {
  Clock,
  NotebookPen,
  ListChecks,
  ArrowRight,
  Check,
  TriangleAlert,
  BookOpen,
  X,
  FileText,
  BookmarkCheck,
  Lightbulb,
  CircleAlert,
  Flag,
  ExternalLink,
  ChevronRight,
  Plus,
  Tag as TagIcon,
  PenLine,
  Trash2,
  Database,
} from 'lucide-react'
import type { LibBlock } from '@/data/library'
import { useLiveLibrary } from '@/lib/useLiveLibrary'
import { subjects, getSubject } from '@/data/student'
import { scopeUniversities } from '@/data/universities'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { ChapterMark } from '@/components/ui/ChapterMark'
import { cn } from '@/lib/cn'
import { formatLongDate } from '@/lib/format'
import { usePersistentState } from '@/lib/usePersistentState'
import { ReportContentDialog, type ReportTarget } from '@/components/reports/ReportContentDialog'
import { BackBar, backState } from '@/components/ui/BackBar'
import { useUniversityCatalogue, universityFrom } from '@/lib/useUniversityCatalogue'
import { useT } from '@/lib/i18n'
import { NewArticleDialog } from '@/components/library/NewArticleDialog'
import { PERSONAL_TAGS_KEY, USER_ARTICLES_KEY, type UserArticle } from '@/data/userLibrary'
import { MEDICAL_PUBLISHED_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore, type ArticleSpan, type CitationLink, type EvidenceLocator, type MedicalEvidenceStore } from '@/data/medicalEvidence'
import { apiOpenFile } from '@/lib/api'
import { useMedicalTaxonomy } from '@/data/medicalTaxonomyStore'
import { indexMedicalTaxonomy } from '@/data/medicalLibraryTaxonomy'
import { AtlasNavigation, LibraryLanding, TaxonomyNodeOverview, type AtlasArticle, type MedicalLibraryView } from '@/components/library/MedicalLibraryAtlas'

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim()
  if (!q) return text
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return <>{text.split(new RegExp(`(${escaped})`, 'ig')).map((part, index) => part.toLowerCase() === q.toLowerCase() ? <mark key={index} className="rounded-sm bg-warning-tint px-0.5 text-ink">{part}</mark> : part)}</>
}

/* ---- Navigator --------------------------------------------------------- */

export function LegacyLibraryTree({
  selectedId,
  onSelect,
  query,
  activeTag,
  userArticles,
  personalTags,
  expanded,
  onToggleTopic,
}: {
  selectedId: string
  onSelect: (id: string) => void
  query: string
  activeTag: string | null
  userArticles: UserArticle[]
  personalTags: Record<string, string[]>
  expanded: Record<string, boolean>
  onToggleTopic: (topicId: string) => void
}) {
  const t = useT()
  const { topics: libraryTopics, subtopics: allSubtopics } = useLiveLibrary()
  const q = query.trim().toLowerCase()

  const tagsOf = (id: string) => personalTags[id] ?? []
  const matchesTag = (id: string) => !activeTag || tagsOf(id).some((x) => x.toLowerCase() === activeTag.toLowerCase())

  // Search / tag-filter mode → a flat result list across built-in + your articles.
  if (q || activeTag) {
    type Row = { id: string; title: string; sub: string; subjectId: string; mine: boolean }
    const builtin: Row[] = allSubtopics
      .filter((s) => matchesTag(s.id))
      .filter(
        (s) =>
          !q ||
          s.title.toLowerCase().includes(q) ||
          s.summary.toLowerCase().includes(q) ||
          s.topicTitle.toLowerCase().includes(q) ||
          tagsOf(s.id).some((x) => x.toLowerCase().includes(q)),
      )
      .map((s) => ({ id: s.id, title: s.title, sub: s.topicTitle, subjectId: s.subjectId, mine: false }))
    const mine: Row[] = userArticles
      .filter((a) => matchesTag(a.id))
      .filter(
        (a) =>
          !q ||
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.sections.some((sec) => sec.heading.toLowerCase().includes(q) || sec.body.toLowerCase().includes(q)) ||
          tagsOf(a.id).some((x) => x.toLowerCase().includes(q)),
      )
      .map((a) => ({ id: a.id, title: a.title, sub: getSubject(a.subjectId).name, subjectId: a.subjectId, mine: true }))
    const matches = [...mine, ...builtin]
    if (matches.length === 0)
      return <p className="px-2 py-8 text-center text-[13px] text-ink-3">{t('No topics match your filters.')}</p>
    return (
      <ul className="space-y-0.5">
        {matches.map((s) => (
          <li key={s.id}>
            <button
              onClick={() => onSelect(s.id)}
              className={cn(
                'flex w-full flex-col gap-0.5 rounded-md px-2 py-1.5 text-start transition-colors',
                selectedId === s.id ? 'bg-accent-tint' : 'hover:bg-inset',
              )}
            >
              <span className="flex items-center gap-2 text-[13px] font-medium text-ink">
                <ChapterMark subjectId={s.subjectId} index={1} compact />
                <Highlight text={s.title} query={query} />
                {s.mine && <Icon icon={PenLine} size={12} className="text-accent" />}
              </span>
              <span className="ps-12 text-[11.5px] text-ink-3"><Highlight text={s.sub} query={query} /></span>
            </button>
          </li>
        ))}
      </ul>
    )
  }

  const groups = subjects
    .map((subj) => ({
      subj,
      topics: libraryTopics.filter((tp) => tp.subjectId === subj.id),
      mine: userArticles.filter((a) => a.subjectId === subj.id),
    }))
    .filter((g) => g.topics.length > 0 || g.mine.length > 0)

  return (
    <div className="space-y-5">
      {groups.map(({ subj, topics, mine }) => (
        <div key={subj.id}>
          <div className="mb-1.5 flex items-center gap-2 px-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{subj.name}</span>
          </div>
          {topics.map((topic, topicIndex) => {
            const isOpen = expanded[topic.id] ?? false
            return (
              <div key={topic.id} className="mb-1">
                <button
                  onClick={() => onToggleTopic(topic.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-start text-[13.5px] font-bold text-ink transition-colors hover:bg-inset"
                >
                  <Icon
                    icon={ChevronRight}
                    size={15}
                    className={cn('shrink-0 text-ink-3 transition-transform', isOpen && 'rotate-90 rtl:-rotate-90')}
                  />
                  <ChapterMark subjectId={subj.id} index={topicIndex + 1} compact />
                  <span className="flex-1 leading-snug">{topic.title}</span>
                  <span className="tnum font-mono text-[10.5px] text-ink-3">{topic.subtopics.length}</span>
                </button>
                {isOpen && (
                  <ul className="ms-[1.15rem] space-y-0.5 border-s border-line-2 ps-[1.8rem]">
                    {topic.subtopics.map((st) => (
                      <li key={st.id}>
                        <button
                          onClick={() => onSelect(st.id)}
                          className={cn(
                            'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-start text-[13px] transition-colors',
                            selectedId === st.id
                              ? 'bg-accent-tint font-medium text-accent-strong'
                              : 'text-ink-2 hover:bg-inset hover:text-ink',
                          )}
                        >
                          <span className="truncate">{st.title}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
          {mine.length > 0 && (
            <div className="mb-1">
              <button
                onClick={() => onToggleTopic(`mine-${subj.id}`)}
                aria-expanded={expanded[`mine-${subj.id}`] ?? false}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-start text-[13.5px] font-bold text-accent-strong transition-colors hover:bg-inset"
              >
                <Icon
                  icon={ChevronRight}
                  size={15}
                  className={cn('shrink-0 text-accent/70 transition-transform', (expanded[`mine-${subj.id}`] ?? false) && 'rotate-90 rtl:-rotate-90')}
                />
                <Icon icon={PenLine} size={13} className="text-accent" />
                <span className="flex-1 leading-snug">{t('My articles')}</span>
                <span className="tnum font-mono text-[10.5px] text-accent/70">{mine.length}</span>
              </button>
              {(expanded[`mine-${subj.id}`] ?? false) && (
                <ul className="ms-[1.15rem] space-y-0.5 border-s border-accent-line ps-[1.8rem]">
                  {mine.map((a) => (
                    <li key={a.id}>
                      <button
                        onClick={() => onSelect(a.id)}
                        className={cn(
                          'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-start text-[13px] transition-colors',
                          selectedId === a.id
                            ? 'bg-accent-tint font-medium text-accent-strong'
                            : 'text-ink-2 hover:bg-inset hover:text-ink',
                        )}
                      >
                        <span className="truncate">{a.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ---- Reading blocks ---------------------------------------------------- */

function Callout({ tone, title, text, query }: { tone: 'accent' | 'warning'; title: string; text: string; query: string }) {
  const accent = tone === 'accent'
  return (
    <div
      className={cn(
        'my-5 rounded-xl border p-4',
        accent ? 'border-accent/45 bg-accent-tint/55' : 'border-warning/35 bg-warning-tint/65',
      )}
    >
      <div className="flex items-center gap-2">
        <Icon icon={accent ? Flag : TriangleAlert} size={16} className={accent ? 'text-accent' : 'text-warning'} />
        <span className={cn('text-[12.5px] font-semibold', accent ? 'text-accent-strong' : 'text-warning')}>
          <Highlight text={title} query={query} />
        </span>
      </div>
      <p className="mt-1.5 text-[14px] leading-relaxed text-ink"><Highlight text={text} query={query} /></p>
    </div>
  )
}

function Blocks({ blocks, query, onEvidence }: { blocks: LibBlock[]; query: string; onEvidence?: (spanId: string) => void }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === 'h')
          return (
            <h2 key={i} className="mt-7 mb-2 font-serif text-[19px] font-semibold tracking-[-0.01em] text-ink">
              <Highlight text={b.text ?? ''} query={query} />
            </h2>
          )
        if (b.type === 'p')
          return (
            <p key={i} className="mt-3 text-[15px] leading-[1.7] text-ink/90">
              <Highlight text={b.text ?? ''} query={query} />
            </p>
          )
        if (b.type === 'list')
          return (
            <ul key={i} className="mt-3 space-y-2">
              {b.items?.map((it, j) => (
                <li key={j} className="flex gap-2.5 text-[15px] leading-[1.6] text-ink/90">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-soft" />
                  <Highlight text={it} query={query} />
                </li>
              ))}
            </ul>
          )
        if (b.type === 'fact')
          return (
            <button
              key={b.spanId ?? i}
              type="button"
              onClick={() => b.spanId && onEvidence?.(b.spanId)}
              className="group mt-3 flex w-full items-start gap-3 rounded-lg border border-accent-line/70 bg-accent-tint/25 px-4 py-3 text-start transition-colors hover:border-accent hover:bg-accent-tint/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35"
            >
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              <span className="min-w-0 flex-1 text-[15px] leading-[1.65] text-ink/90"><Highlight text={b.text ?? ''} query={query} /></span>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-accent-line bg-surface px-2 py-0.5 font-mono text-[10px] font-semibold text-accent-strong">
                <Icon icon={Database} size={11} />{b.citationIds?.length ?? 0}
              </span>
            </button>
          )
        return <Callout key={i} tone={b.tone ?? 'accent'} title={b.title ?? ''} text={b.text ?? ''} query={query} />
      })}
    </>
  )
}

function locatorLabel(locator: EvidenceLocator | string): string {
  if (typeof locator === 'string') return locator
  const parts = [
    locator.page != null ? `Page ${locator.page}` : '',
    locator.printed_page != null ? `Printed page ${locator.printed_page}` : '',
    locator.section ? `Section ${locator.section}` : '',
    locator.line ? `Line ${locator.line}` : '',
    locator.timestamp ? `Time ${locator.timestamp}` : '',
  ].filter(Boolean)
  return parts.join(' · ') || locator.type || 'Exact source location'
}

function citationPage(locator: EvidenceLocator | string): string {
  if (typeof locator === 'string') return ''
  return locator.page != null ? `#page=${locator.page}` : ''
}

function EvidenceDrawer({ span, evidence, onClose }: { span: ArticleSpan; evidence: MedicalEvidenceStore; onClose: () => void }) {
  const citations = span.citationIds.map((id) => evidence.citations.find((citation) => citation.id === id)).filter(Boolean) as CitationLink[]
  const claims = span.claimIds.map((id) => evidence.claims.find((claim) => claim.id === id)).filter(Boolean)

  async function openCitation(citation: CitationLink) {
    const resource = evidence.resources.find((entry) => entry.id === citation.resourceId)
    if (!resource) return
    if (resource.sourceUri) {
      window.open(`${resource.sourceUri}${citationPage(citation.locator)}`, '_blank', 'noopener,noreferrer')
      return
    }
    await apiOpenFile(`/medical-resources/${encodeURIComponent(resource.id)}`, citationPage(citation.locator))
  }

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="evidence-drawer-title">
      <button type="button" className="absolute inset-0 bg-ink/25" onClick={onClose} aria-label="Close sources" />
      <aside className="absolute inset-y-0 end-0 flex w-full max-w-lg flex-col border-s border-line bg-paper shadow-pop">
        <header className="flex items-start gap-3 border-b border-line bg-surface px-5 py-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-tint text-accent-strong"><Icon icon={Database} size={17} /></span>
          <div className="min-w-0 flex-1">
            <h2 id="evidence-drawer-title" className="font-serif text-[18px] font-semibold text-ink">Sources for this fact</h2>
            <p className="mt-0.5 text-[11.5px] text-ink-3">{citations.length} exact source link{citations.length === 1 ? '' : 's'} · stable fact ID {span.id}</p>
          </div>
          <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-lg text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close sources"><Icon icon={X} size={18} /></button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="text-[14px] leading-relaxed text-ink">{span.text}</p>
            {claims.map((claim) => <span key={claim!.id} className={cn('mt-3 inline-flex rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold', claim!.verificationStatus === 'verified' ? 'border-success/25 bg-success-tint text-success' : 'border-warning/30 bg-warning-tint text-warning')}>{claim!.verificationStatus.replace('_', ' ')}</span>)}
          </div>
          <div className="mt-4 space-y-3">
            {citations.map((citation) => {
              const resource = evidence.resources.find((entry) => entry.id === citation.resourceId)
              return (
                <section key={citation.id} className="rounded-xl border border-line bg-surface p-4 shadow-panel">
                  <div className="flex items-start gap-3">
                    <span className="grid size-8 shrink-0 place-items-center rounded-md bg-inset text-ink-3"><Icon icon={FileText} size={15} /></span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[13px] font-semibold leading-snug text-ink">{resource?.title ?? citation.resourceId}</h3>
                      <p className="mt-1 text-[11.5px] text-ink-3">{resource?.institution} · {locatorLabel(citation.locator)}</p>
                    </div>
                  </div>
                  {citation.supportSpan && <p className="mt-3 border-s-2 border-accent-line ps-3 text-[12.5px] leading-relaxed text-ink-2">{citation.supportSpan}</p>}
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-[10.5px] text-ink-3">{citation.countsAsClaimEvidence ? 'Counts as claim evidence' : 'Article-level context'}</span>
                    <Button size="sm" variant="secondary" iconLeft={ExternalLink} onClick={() => void openCitation(citation)}>Go to exact source</Button>
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </aside>
    </div>
  )
}

/* ---- Personal tag strip (shared) --------------------------------------- */

function PersonalTagStrip({
  articleId,
  tags,
  reusable,
  onChange,
}: {
  articleId: string
  tags: string[]
  reusable: string[]
  onChange: (next: string[]) => void
}) {
  const t = useT()
  const [draft, setDraft] = useState('')
  const add = (raw: string) => {
    const v = raw.trim()
    if (!v) return
    if (!tags.some((x) => x.toLowerCase() === v.toLowerCase())) onChange([...tags, v])
    setDraft('')
  }
  const suggestions = reusable.filter((tag) => !tags.some((x) => x.toLowerCase() === tag.toLowerCase()))
  return (
    <div className="mt-4 border-t border-line pt-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink-3">
          <Icon icon={TagIcon} size={13} className="text-accent" />
          {t('Your tags')}
        </span>
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full border border-accent-line bg-accent-tint py-0.5 pe-1.5 ps-2.5 text-[12px] font-medium text-accent-strong"
          >
            {tag}
            <button
              onClick={() => onChange(tags.filter((x) => x !== tag))}
              aria-label={`${t('Remove')} ${tag}`}
              className="text-accent/70 hover:text-accent"
            >
              <Icon icon={X} size={12} />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault()
              add(draft)
            }
          }}
          placeholder={t('Add a tag…')}
          aria-label={`${t('Add a tag…')} ${articleId}`}
          className="h-7 min-w-[7rem] rounded-full border border-line bg-surface px-3 text-[12px] text-ink focus:border-accent focus:outline-none"
        />
      </div>
      {suggestions.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-ink-3">{t('Reuse:')}</span>
          {suggestions.map((tag) => (
            <button
              key={tag}
              onClick={() => add(tag)}
              className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-[12px] text-ink-2 hover:border-accent-line hover:bg-accent-tint/40 hover:text-accent-strong"
            >
              + {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ---- Reading view: built-in article ------------------------------------ */

function Reader({
  id,
  tags,
  reusable,
  onTagsChange,
  query,
}: {
  id: string
  tags: string[]
  reusable: string[]
  onTagsChange: (next: string[]) => void
  query: string
}) {
  const t = useT()
  const location = useLocation()
  const [universityCatalogue] = useUniversityCatalogue()
  const { topics: libraryTopics, subtopics: allSubtopics, updatedAtFor } = useLiveLibrary()
  const st = allSubtopics.find((s) => s.id === id)!
  const subject = getSubject(st.subjectId)
  const appliesTo = st.universityIds?.length ? st.universityIds : scopeUniversities(id)
  const [evidence] = usePersistentState<MedicalEvidenceStore>(MEDICAL_PUBLISHED_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore)
  const [selectedSpanId, setSelectedSpanId] = useState<string | null>(null)
  const selectedSpan = evidence.articleSpans.find((span) => span.id === selectedSpanId)
  const chapterIndex = libraryTopics.find((topic) => topic.id === st.topicId)?.subtopics.findIndex((item) => item.id === id) ?? 0
  const [readArticles, setReadArticles] = usePersistentState<Record<string, boolean>>('synapse.library.read', {})
  const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null)
  const traps = st.blocks.filter((block) => block.type === 'callout' && block.tone === 'warning')
  const isRead = Boolean(readArticles[id])

  return (
    <div className="mx-auto max-w-[78rem] px-5 py-8 sm:px-8 lg:py-10">
    <BackBar />
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,46rem)_20rem]">
    <article>
      <nav className="flex items-center gap-2 text-[12.5px] text-ink-3">
        <span className="inline-flex items-center gap-1.5 font-medium text-ink-2">
          <ChapterMark subjectId={subject.id} index={chapterIndex + 1} compact />
          {subject.name}
        </span>
        <Icon icon={ArrowRight} size={12} className="rtl:-scale-x-100" />
        <span>{st.topicTitle}</span>
      </nav>

      <h1 className="mt-3 font-serif text-[30px] font-semibold leading-tight tracking-[-0.02em] text-ink">
        <Highlight text={st.title} query={query} />
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-3">
          <Icon icon={Clock} size={14} />
          {st.readingMin} {t('min read')}
        </span>
        <span className="text-[12.5px] text-ink-3">{t('Updated')} {formatLongDate(updatedAtFor(st.id))}</span>
        <div className="flex gap-2">
          <Link to={`/app/notebook?article=${st.id}&new=1`}><Button variant="secondary" size="sm" iconLeft={NotebookPen}>{t('Take a note')}</Button></Link>
          <Link to={`/app/qbank?article=${st.id}`}>
            <Button variant="primary" size="sm" iconLeft={ListChecks}>
              {t('Test yourself')}
            </Button>
          </Link>
          <Button variant="ghost" size="sm" iconLeft={Flag} onClick={() => setReportTarget({ kind: 'library article', id: st.id, title: st.title })}>{t('Report')}</Button>
        </div>
      </div>

      {/* University scope — read-only. Managed by the admin dashboard only. */}
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
        <span className="text-[12px] font-medium text-ink-3">{t('Applies to')}</span>
        {appliesTo.map((uid) => {
          const u = universityFrom(universityCatalogue, uid)
          return (
            <span
              key={uid}
              className="inline-flex items-center gap-1 rounded-full border border-line-2 bg-surface-2 px-2.5 py-0.5 text-[12px] font-medium text-ink-2"
            >
              {u?.short}
            </span>
          )
        })}
        {appliesTo.length === 0 && <span className="text-[12px] text-ink-3">{t('All universities')}</span>}
      </div>

      {/* Personal, student-owned tags */}
      <PersonalTagStrip articleId={st.id} tags={tags} reusable={reusable} onChange={onTagsChange} />

      <p className="mt-6 text-[16.5px] leading-[1.6] text-ink"><Highlight text={st.summary} query={query} /></p>

      <div className="mt-2">
        <Blocks blocks={st.blocks} query={query} onEvidence={setSelectedSpanId} />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-line pt-5">
        <Button variant={isRead ? 'secondary' : 'primary'} iconLeft={isRead ? Check : BookmarkCheck} onClick={() => setReadArticles((current) => ({ ...current, [id]: !isRead }))}>{isRead ? t('Marked as read') : t('Mark as read')}</Button>
        <Link to={`/app/qbank?article=${st.id}`}><Button variant="secondary" iconLeft={ListChecks}>{t('Test yourself')} · {st.questions.length} {t('questions')}</Button></Link>
        <Link to={`/app/notebook?article=${st.id}&new=1`}><Button variant="ghost" iconLeft={NotebookPen}>{t('Take a note')}</Button></Link>
      </div>
    </article>
    <aside className="space-y-3 lg:sticky lg:top-[4.75rem]">
      <section className="rounded-xl border border-line bg-surface p-4 shadow-panel">
        <div className="flex items-center gap-2"><Icon icon={Lightbulb} size={15} className="text-accent" /><h2 className="text-[13px] font-semibold text-ink">{t('Hold these')}</h2></div>
        <ul className="mt-3 space-y-2.5">{st.keyPoints.map((point) => <li key={point} className="flex gap-2 text-[12.5px] leading-snug text-ink-2"><span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />{point}</li>)}</ul>
      </section>
      <section className="overflow-hidden rounded-xl border border-line bg-surface shadow-panel">
        <div className="border-b border-line px-4 py-3"><div className="flex items-center gap-2"><Icon icon={CircleAlert} size={16} className="text-danger" /><h2 className="text-[13px] font-bold text-ink">{t('Where people lose the mark')}</h2></div><p className="mt-0.5 font-mono text-[10.5px] text-ink-3">{Math.max(2, traps.length)} {t('traps')}</p></div>
        <ul className="divide-y divide-line px-4 py-1">{(traps.length ? traps.map((trap) => trap.text ?? '') : ['Naming the mechanism without linking it to the clinical consequence.', 'Choosing a treatment without stating the finding that makes it appropriate.']).map((trap) => <li key={trap} className="flex gap-2.5 py-3 text-[12.5px] leading-relaxed text-ink-2"><Icon icon={TriangleAlert} size={16} className="mt-0.5 text-danger" /><span>{trap}</span></li>)}</ul>
      </section>
      <Link to={`/app/qbank?article=${st.id}`} className="group flex items-center gap-3 rounded-xl border border-line bg-surface p-4 shadow-panel transition-colors hover:border-accent-line hover:bg-accent-tint/20">
        <span className="tnum grid size-10 shrink-0 place-items-center rounded-lg bg-accent-tint font-mono text-[15px] font-bold text-accent-strong">{st.questions.length}</span><span className="min-w-0 flex-1"><span className="block text-[13px] font-bold text-ink">{t('Questions that test this')}</span><span className="mt-0.5 block text-[11.5px] text-ink-3">{t('Start a filtered session')}</span></span><Icon icon={ChevronRight} size={17} className="text-ink-3 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
      </Link>
      <section className="rounded-xl border border-line bg-surface p-4 shadow-panel">
        <h2 className="text-[13px] font-semibold text-ink">{t('Resources that teach it')}</h2>
        <ul className="mt-2 divide-y divide-line">{st.resources.map((resource) => <li key={resource}><Link to={`/app/resources?q=${encodeURIComponent(resource)}`} state={backState(location, t('Back to reading'))} className="group flex items-start gap-2.5 py-2.5 text-[12.5px] leading-snug text-ink-2 hover:text-ink"><span className="grid size-7 shrink-0 place-items-center rounded-md bg-inset"><Icon icon={FileText} size={14} className="text-ink-3" /></span><span className="min-w-0 flex-1">{resource}<span className="mt-0.5 block text-[10.5px] text-ink-3">{t('Open at the relevant page')}</span></span><Icon icon={ExternalLink} size={14} className="mt-1 text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></li>)}</ul>
      </section>
    </aside>
    </div>
    <ReportContentDialog open={Boolean(reportTarget)} target={reportTarget} onClose={() => setReportTarget(null)} />
    {selectedSpan && <EvidenceDrawer span={selectedSpan} evidence={evidence} onClose={() => setSelectedSpanId(null)} />}
    </div>
  )
}

/* ---- Reading view: student-authored article ---------------------------- */

function UserReader({
  article,
  tags,
  reusable,
  onTagsChange,
  onDelete,
  query,
}: {
  article: UserArticle
  tags: string[]
  reusable: string[]
  onTagsChange: (next: string[]) => void
  onDelete: () => void
  query: string
}) {
  const t = useT()
  const subject = getSubject(article.subjectId)
  return (
    <div className="mx-auto max-w-[46rem] px-5 py-8 sm:px-8 lg:py-10">
      <article>
        <nav className="flex items-center gap-2 text-[12.5px] text-ink-3">
          <span className="inline-flex items-center gap-1.5 font-medium text-ink-2">
            <ChapterMark subjectId={subject.id} index={1} compact />
            {subject.name}
          </span>
          <Icon icon={ArrowRight} size={12} className="rtl:-scale-x-100" />
          <span className="inline-flex items-center gap-1 text-accent-strong"><Icon icon={PenLine} size={12} /> {t('My articles')}</span>
        </nav>

        <div className="mt-3 flex items-start justify-between gap-3">
          <h1 className="font-serif text-[30px] font-semibold leading-tight tracking-[-0.02em] text-ink">
            <Highlight text={article.title} query={query} />
          </h1>
          <Button variant="ghost" size="sm" iconLeft={Trash2} onClick={onDelete} className="shrink-0 hover:text-danger">{t('Delete')}</Button>
        </div>

        <div className="mt-2 text-[12.5px] text-ink-3">{t('Created')} {formatLongDate(new Date(article.createdAt))}</div>

        <PersonalTagStrip articleId={article.id} tags={tags} reusable={reusable} onChange={onTagsChange} />

        {article.summary && (
          <p className="mt-6 text-[16.5px] leading-[1.6] text-ink"><Highlight text={article.summary} query={query} /></p>
        )}

        <div className="mt-2">
          {article.sections.map((section) => (
            <section key={section.id}>
              {section.heading && (
                <h2 className="mt-7 mb-2 font-serif text-[19px] font-semibold tracking-[-0.01em] text-ink">
                  <Highlight text={section.heading} query={query} />
                </h2>
              )}
              {section.body.split('\n').filter(Boolean).map((para, i) => (
                <p key={i} className="mt-3 text-[15px] leading-[1.7] text-ink/90">
                  <Highlight text={para} query={query} />
                </p>
              ))}
            </section>
          ))}
          {article.sections.length === 0 && (
            <p className="mt-6 text-[13px] text-ink-3">{t('This article has no sections yet.')}</p>
          )}
        </div>
      </article>
    </div>
  )
}

/* ---- Page -------------------------------------------------------------- */

export function Library() {
  const t = useT()
  const { subtopics: allSubtopics } = useLiveLibrary()
  const [taxonomy] = useMedicalTaxonomy()
  const taxonomyIndex = useMemo(() => indexMedicalTaxonomy(taxonomy), [taxonomy])
  const [universityCatalogue] = useUniversityCatalogue()
  const [params, setParams] = useSearchParams()
  const paramId = params.get('s')
  const paramView = params.get('view')
  const paramNode = params.get('node')
  const initialView: MedicalLibraryView = ['system', 'discipline', 'skills', 'knowledge', 'curriculum'].includes(paramView ?? '') ? paramView as MedicalLibraryView : paramId ? 'system' : 'home'
  const [userArticles, setUserArticles] = usePersistentState<UserArticle[]>(USER_ARTICLES_KEY, [])
  const [personalTags, setPersonalTags] = usePersistentState<Record<string, string[]>>(PERSONAL_TAGS_KEY, {})
  const [selectedId, setSelectedId] = useState(allSubtopics.some((s) => s.id === paramId) ? (paramId as string) : '')
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>(paramNode && taxonomyIndex.byId.has(paramNode) ? paramNode : undefined)
  const [view, setView] = useState<MedicalLibraryView>(initialView)
  const [treeOpen, setTreeOpen] = useState(false)
  const [creating, setCreating] = useState(false)
  const atlasArticles = useMemo<AtlasArticle[]>(() => allSubtopics.map((article) => ({ id: article.id, title: article.title, summary: article.summary, subjectId: article.subjectId, topicTitle: article.topicTitle, primaryNodeId: article.primaryNodeId, secondaryNodeIds: article.secondaryNodeIds })), [allSubtopics])

  // Follow ?s= when arriving from a question's reference link.
  useEffect(() => {
    if (paramId && allSubtopics.some((s) => s.id === paramId)) {
      setSelectedId(paramId)
      const article = allSubtopics.find((item) => item.id === paramId)
      const node = article?.primaryNodeId ? taxonomyIndex.byId.get(article.primaryNodeId) : undefined
      if (node) {
        setSelectedNodeId(node.id)
        setView(node.division)
      } else if (view === 'home') setView('system')
    }
  }, [allSubtopics, paramId, taxonomyIndex, view])

  const reusableTags = useMemo(() => {
    const set = new Set<string>()
    Object.values(personalTags).forEach((list) => list.forEach((tag) => set.add(tag)))
    return [...set].sort((a, b) => a.localeCompare(b))
  }, [personalTags])

  const setTagsFor = (id: string, next: string[]) =>
    setPersonalTags((prev) => {
      const copy = { ...prev }
      if (next.length === 0) delete copy[id]
      else copy[id] = next
      return copy
    })

  const selectedUserArticle = userArticles.find((a) => a.id === selectedId)

  const openView = (nextView: Exclude<MedicalLibraryView, 'home'>, nodeId?: string) => {
    setView(nextView)
    setSelectedId('')
    setSelectedNodeId(nodeId)
    const next = new URLSearchParams()
    next.set('view', nextView)
    if (nodeId) next.set('node', nodeId)
    setParams(next)
  }

  const openArticle = (articleId: string) => {
    const article = allSubtopics.find((item) => item.id === articleId)
    const node = article?.primaryNodeId ? taxonomyIndex.byId.get(article.primaryNodeId) : undefined
    const nextView: MedicalLibraryView = node?.division ?? (view === 'home' || view === 'curriculum' ? 'system' : view)
    setView(nextView)
    setSelectedNodeId(node?.id)
    setSelectedId(articleId)
    const next = new URLSearchParams()
    next.set('view', nextView)
    next.set('s', articleId)
    if (node) next.set('node', node.id)
    setParams(next)
  }

  const changeView = (nextView: MedicalLibraryView) => {
    if (nextView === 'home') {
      setView('home')
      setSelectedId('')
      setSelectedNodeId(undefined)
      setParams(new URLSearchParams())
      return
    }
    openView(nextView)
  }

  const selectNode = (nodeId: string) => {
    const node = taxonomyIndex.byId.get(nodeId)
    if (!node) return
    setSelectedNodeId(nodeId)
    setSelectedId('')
    setView(node.division)
    const next = new URLSearchParams()
    next.set('view', node.division)
    next.set('node', nodeId)
    setParams(next)
  }

  const yearCount = universityCatalogue.reduce((sum, university) => sum + university.years.length, 0)
  const selectedNode = selectedNodeId ? taxonomyIndex.byId.get(selectedNodeId) : undefined
  const publishedSelected = allSubtopics.some((article) => article.id === selectedId)

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] min-h-0 flex-col bg-paper">
      <header className="flex h-12 shrink-0 items-center gap-2 border-b border-line bg-surface px-3 sm:px-4">
        <button type="button" className="inline-flex items-center gap-2 rounded-md px-1.5 py-1 text-start hover:bg-inset" onClick={() => changeView('home')}><Icon icon={BookOpen} size={16} className="text-accent" /><span className="font-serif text-[16px] font-semibold text-ink">{t('Library')}</span></button>
        {view !== 'home' && <><Icon icon={ChevronRight} size={12} className="text-ink-3" /><span className="hidden text-[11.5px] text-ink-3 sm:inline">{view === 'system' ? 'Systems & General' : view === 'discipline' ? 'By Discipline' : view === 'skills' ? 'Clinical Skills' : view === 'knowledge' ? 'Clinical Knowledge' : 'My Curriculum'}</span></>}
        {view !== 'home' && <Button variant="secondary" size="sm" iconLeft={BookOpen} onClick={() => setTreeOpen(true)} className="ms-auto xl:hidden">{t('Browse topics')}</Button>}
        <Button variant="primary" size="sm" iconLeft={Plus} onClick={() => setCreating(true)} className={view === 'home' ? 'ms-auto' : 'xl:ms-auto'}>{t('New article')}</Button>
      </header>

      <div className="min-h-0 flex-1">
        {view === 'home' && !selectedId ? <LibraryLanding taxonomy={taxonomy} articles={atlasArticles} universityCount={universityCatalogue.length} yearCount={yearCount} onOpenView={openView} onOpenArticle={openArticle} /> : (
          <div className="grid h-full min-h-0 grid-cols-[18rem_minmax(0,1fr)] max-xl:grid-cols-[18rem_minmax(0,1fr)] max-lg:grid-cols-1 xl:grid-cols-[13rem_18rem_minmax(0,1fr)]">
            <div className="contents max-lg:hidden"><AtlasNavigation taxonomy={taxonomy} articles={atlasArticles} view={view === 'home' ? 'system' : view} selectedNodeId={selectedNodeId} selectedArticleId={selectedId} universityCount={universityCatalogue.length} yearCount={yearCount} onViewChange={changeView} onNodeSelect={selectNode} onArticleSelect={openArticle} /></div>
            <main className="min-w-0 overflow-y-auto">
              {selectedUserArticle ? (
          <UserReader
            article={selectedUserArticle}
            tags={personalTags[selectedUserArticle.id] ?? []}
            reusable={reusableTags}
            onTagsChange={(next) => setTagsFor(selectedUserArticle.id, next)}
            onDelete={() => {
              setUserArticles((prev) => prev.filter((a) => a.id !== selectedUserArticle.id))
              setTagsFor(selectedUserArticle.id, [])
              setSelectedId('')
            }}
            query=""
          />
        ) : publishedSelected ? (
          <Reader
            id={selectedId}
            tags={personalTags[selectedId] ?? []}
            reusable={reusableTags}
            onTagsChange={(next) => setTagsFor(selectedId, next)}
            query=""
          />
        ) : (
          <TaxonomyNodeOverview node={selectedNode} taxonomy={taxonomy} articles={atlasArticles} onOpenArticle={openArticle} />
        )}
            </main>
          </div>
        )}
      </div>

      {/* Mobile navigator */}
      {treeOpen && (
        <div className="fixed inset-0 z-40 xl:hidden">
          <div className="absolute inset-0 bg-ink/30 animate-fade" onClick={() => setTreeOpen(false)} />
          <div className="animate-slide-x absolute inset-y-0 start-0 flex w-[min(22rem,90vw)] flex-col bg-surface shadow-pop">
            <div className="flex h-12 items-center justify-between border-b border-line px-4">
              <span className="font-serif text-[16px] font-semibold text-ink">{t('Library')}</span>
              <button type="button" onClick={() => setTreeOpen(false)} className="grid size-9 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close library navigation">
                <Icon icon={X} size={18} />
              </button>
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-1"><AtlasNavigation taxonomy={taxonomy} articles={atlasArticles} view={view === 'home' ? 'system' : view} selectedNodeId={selectedNodeId} selectedArticleId={selectedId} universityCount={universityCatalogue.length} yearCount={yearCount} onViewChange={(next) => { changeView(next); if (next === 'home') setTreeOpen(false) }} onNodeSelect={(nodeId) => { selectNode(nodeId); setTreeOpen(false) }} onArticleSelect={(articleId) => { openArticle(articleId); setTreeOpen(false) }} /></div>
          </div>
        </div>
      )}

      <NewArticleDialog
        open={creating}
        reusableTags={reusableTags}
        onClose={() => setCreating(false)}
        onCreate={(article) => {
          setUserArticles((prev) => [article, ...prev])
          if (article.tags.length) setTagsFor(article.id, article.tags)
          setSelectedId(article.id)
          setView('system')
        }}
      />
    </div>
  )
}
