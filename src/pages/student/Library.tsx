import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
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
} from 'lucide-react'
import type { LibBlock } from '@/data/library'
import { libraryTopics, allSubtopics, updatedAtFor } from '@/data/library'
import { subjects, getSubject } from '@/data/student'
import { scopeUniversities } from '@/data/universities'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { SearchInput } from '@/components/ui/Field'
import { ChapterMark } from '@/components/ui/ChapterMark'
import { cn } from '@/lib/cn'
import { formatLongDate } from '@/lib/format'
import { usePersistentState } from '@/lib/usePersistentState'
import { ReportContentDialog, type ReportTarget } from '@/components/reports/ReportContentDialog'
import { useUniversityCatalogue, universityFrom } from '@/lib/useUniversityCatalogue'

function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim()
  if (!q) return text
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return <>{text.split(new RegExp(`(${escaped})`, 'ig')).map((part, index) => part.toLowerCase() === q.toLowerCase() ? <mark key={index} className="rounded-sm bg-warning-tint px-0.5 text-ink">{part}</mark> : part)}</>
}

/* ---- Navigator --------------------------------------------------------- */

function Tree({
  selectedId,
  onSelect,
  query,
}: {
  selectedId: string
  onSelect: (id: string) => void
  query: string
}) {
  const q = query.trim().toLowerCase()

  if (q) {
    const matches = allSubtopics.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.topicTitle.toLowerCase().includes(q),
    )
    if (matches.length === 0)
      return <p className="px-2 py-8 text-center text-[13px] text-ink-3">No topics match “{query}”.</p>
    return (
      <ul className="space-y-0.5">
        {matches.map((s) => (
          <li key={s.id}>
            <button
              onClick={() => onSelect(s.id)}
              className={cn(
                'flex w-full flex-col gap-0.5 rounded-md px-2 py-1.5 text-left transition-colors',
                selectedId === s.id ? 'bg-accent-tint' : 'hover:bg-inset',
              )}
            >
              <span className="flex items-center gap-2 text-[13px] font-medium text-ink">
                <ChapterMark subjectId={s.subjectId} index={allSubtopics.findIndex((item) => item.id === s.id) + 1} compact />
                <Highlight text={s.title} query={query} />
              </span>
              <span className="pl-12 text-[11.5px] text-ink-3"><Highlight text={s.topicTitle} query={query} /></span>
            </button>
          </li>
        ))}
      </ul>
    )
  }

  const groups = subjects
    .map((subj) => ({ subj, topics: libraryTopics.filter((t) => t.subjectId === subj.id) }))
    .filter((g) => g.topics.length > 0)

  return (
    <div className="space-y-5">
      {groups.map(({ subj, topics }) => (
        <div key={subj.id}>
          <div className="mb-1.5 flex items-center gap-2 px-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">
              {subj.name}
            </span>
          </div>
          {topics.map((topic, topicIndex) => (
            <div key={topic.id} className="mb-2">
              <div className="flex items-center gap-2 px-2 py-1.5 text-[13.5px] font-bold text-ink"><ChapterMark subjectId={subj.id} index={topicIndex + 1} compact /><span className="leading-snug">{topic.title}</span></div>
              <ul className="ml-[1.15rem] space-y-0.5 border-l border-line-2 pl-[1.8rem]">
                {topic.subtopics.map((st) => (
                  <li key={st.id}>
                    <button
                      onClick={() => onSelect(st.id)}
                      className={cn(
                        'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] transition-colors',
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
            </div>
          ))}
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
        <Icon
          icon={accent ? Flag : TriangleAlert}
          size={16}
          className={accent ? 'text-accent' : 'text-warning'}
        />
        <span className={cn('text-[12.5px] font-semibold', accent ? 'text-accent-strong' : 'text-warning')}>
          <Highlight text={title} query={query} />
        </span>
      </div>
      <p className="mt-1.5 text-[14px] leading-relaxed text-ink"><Highlight text={text} query={query} /></p>
    </div>
  )
}

function Blocks({ blocks, query }: { blocks: LibBlock[]; query: string }) {
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
        return <Callout key={i} tone={b.tone ?? 'accent'} title={b.title ?? ''} text={b.text ?? ''} query={query} />
      })}
    </>
  )
}

/* ---- Reading view ------------------------------------------------------ */

function Reader({
  id,
  tags,
  onAdd,
  onRemove,
  query,
}: {
  id: string
  tags: string[]
  onAdd: (uni: string) => void
  onRemove: (uni: string) => void
  query: string
}) {
  const [universityCatalogue] = useUniversityCatalogue()
  const st = allSubtopics.find((s) => s.id === id)!
  const subject = getSubject(st.subjectId)
  const available = universityCatalogue.filter((u) => !tags.includes(u.id))
  const chapterIndex = libraryTopics.find((topic) => topic.id === st.topicId)?.subtopics.findIndex((item) => item.id === id) ?? 0
  const [readArticles, setReadArticles] = usePersistentState<Record<string, boolean>>('osler.library.read', {})
  const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null)
  const traps = st.blocks.filter((block) => block.type === 'callout' && block.tone === 'warning')
  const isRead = Boolean(readArticles[id])

  return (
    <div className="mx-auto grid max-w-[78rem] items-start gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,46rem)_20rem] lg:py-10">
    <article>
      <nav className="flex items-center gap-2 text-[12.5px] text-ink-3">
        <span className="inline-flex items-center gap-1.5 font-medium text-ink-2">
          <ChapterMark subjectId={subject.id} index={chapterIndex + 1} compact />
          {subject.name}
        </span>
        <Icon icon={ArrowRight} size={12} />
        <span>{st.topicTitle}</span>
      </nav>

      <h1 className="mt-3 font-serif text-[30px] font-semibold leading-tight tracking-[-0.02em] text-ink">
        <Highlight text={st.title} query={query} />
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-3">
          <Icon icon={Clock} size={14} />
          {st.readingMin} min read
        </span>
        <span className="text-[12.5px] text-ink-3">Updated {formatLongDate(updatedAtFor(st.id))}</span>
        <div className="flex gap-2">
          <Link to={`/app/notebook?article=${st.id}&new=1`}><Button variant="secondary" size="sm" iconLeft={NotebookPen}>Take a note</Button></Link>
          <Link to={`/app/qbank?article=${st.id}`}>
            <Button variant="primary" size="sm" iconLeft={ListChecks}>
              Test yourself
            </Button>
          </Link>
          <Button variant="ghost" size="sm" iconLeft={Flag} onClick={() => setReportTarget({ kind: 'library article', id: st.id, title: st.title })}>Report</Button>
        </div>
      </div>

      {/* University tagging */}
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
        <span className="text-[12px] font-medium text-ink-3">Applies to</span>
        {tags.map((uid) => {
          const u = universityFrom(universityCatalogue, uid)
          return (
            <span
              key={uid}
              className="inline-flex items-center gap-1 rounded-full border border-accent-line bg-accent-tint py-0.5 pl-2.5 pr-1.5 text-[12px] font-medium text-accent-strong"
            >
              {u?.short}
              <button
                onClick={() => onRemove(uid)}
                aria-label={`Remove ${u?.name}`}
                className="text-accent/70 hover:text-accent"
              >
                <Icon icon={X} size={12} />
              </button>
            </span>
          )
        })}
        {tags.length === 0 && <span className="text-[12px] text-ink-3">No universities tagged</span>}
        {available.length > 0 && (
          <select
            value=""
            onChange={(e) => e.target.value && onAdd(e.target.value)}
            className="rounded-full border border-line bg-surface px-2.5 py-1 text-[12px] text-ink-2 outline-none transition-colors hover:border-line-2 focus:border-accent"
          >
            <option value="">＋ Tag university</option>
            {available.map((u) => (
              <option key={u.id} value={u.id}>
                {u.short} — {u.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <p className="mt-6 text-[16.5px] leading-[1.6] text-ink"><Highlight text={st.summary} query={query} /></p>

      <div className="mt-2">
        <Blocks blocks={st.blocks} query={query} />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-line pt-5">
        <Button variant={isRead ? 'secondary' : 'primary'} iconLeft={isRead ? Check : BookmarkCheck} onClick={() => setReadArticles((current) => ({ ...current, [id]: !isRead }))}>{isRead ? 'Marked as read' : 'Mark as read'}</Button>
        <Link to={`/app/qbank?article=${st.id}`}><Button variant="secondary" iconLeft={ListChecks}>Test yourself · {st.questions.length} questions</Button></Link>
        <Link to={`/app/notebook?article=${st.id}&new=1`}><Button variant="ghost" iconLeft={NotebookPen}>Take a note</Button></Link>
      </div>
    </article>
    <aside className="space-y-3 lg:sticky lg:top-[4.75rem]">
      <section className="rounded-xl border border-line bg-surface p-4 shadow-panel">
        <div className="flex items-center gap-2"><Icon icon={Lightbulb} size={15} className="text-accent" /><h2 className="text-[13px] font-semibold text-ink">Hold these</h2></div>
        <ul className="mt-3 space-y-2.5">{st.keyPoints.map((point) => <li key={point} className="flex gap-2 text-[12.5px] leading-snug text-ink-2"><span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent" />{point}</li>)}</ul>
      </section>
      <section className="overflow-hidden rounded-xl border border-line bg-surface shadow-panel">
        <div className="border-b border-line px-4 py-3"><div className="flex items-center gap-2"><Icon icon={CircleAlert} size={16} className="text-danger" /><h2 className="text-[13px] font-bold text-ink">Where people lose the mark</h2></div><p className="mt-0.5 font-mono text-[10.5px] text-ink-3">{Math.max(2, traps.length)} traps</p></div>
        <ul className="divide-y divide-line px-4 py-1">{(traps.length ? traps.map((trap) => trap.text ?? '') : ['Naming the mechanism without linking it to the clinical consequence.', 'Choosing a treatment without stating the finding that makes it appropriate.']).map((trap) => <li key={trap} className="flex gap-2.5 py-3 text-[12.5px] leading-relaxed text-ink-2"><Icon icon={TriangleAlert} size={16} className="mt-0.5 text-danger" /><span>{trap}</span></li>)}</ul>
      </section>
      <Link to={`/app/qbank?article=${st.id}`} className="group flex items-center gap-3 rounded-xl border border-line bg-surface p-4 shadow-panel transition-colors hover:border-accent-line hover:bg-accent-tint/20">
        <span className="tnum grid size-10 shrink-0 place-items-center rounded-lg bg-accent-tint font-mono text-[15px] font-bold text-accent-strong">{st.questions.length}</span><span className="min-w-0 flex-1"><span className="block text-[13px] font-bold text-ink">Questions that test this</span><span className="mt-0.5 block text-[11.5px] text-ink-3">Start a filtered session</span></span><Icon icon={ChevronRight} size={17} className="text-ink-3 transition-transform group-hover:translate-x-0.5" />
      </Link>
      <section className="rounded-xl border border-line bg-surface p-4 shadow-panel">
        <h2 className="text-[13px] font-semibold text-ink">Resources that teach it</h2>
        <ul className="mt-2 divide-y divide-line">{st.resources.map((resource) => <li key={resource}><Link to={`/app/resources?q=${encodeURIComponent(resource)}`} className="group flex items-start gap-2.5 py-2.5 text-[12.5px] leading-snug text-ink-2 hover:text-ink"><span className="grid size-7 shrink-0 place-items-center rounded-md bg-inset"><Icon icon={FileText} size={14} className="text-ink-3" /></span><span className="min-w-0 flex-1">{resource}<span className="mt-0.5 block text-[10.5px] text-ink-3">Open at the relevant page</span></span><Icon icon={ExternalLink} size={14} className="mt-1 text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></li>)}</ul>
      </section>
    </aside>
    <ReportContentDialog open={Boolean(reportTarget)} target={reportTarget} onClose={() => setReportTarget(null)} />
    </div>
  )
}

/* ---- Page -------------------------------------------------------------- */

export function Library() {
  const [params] = useSearchParams()
  const paramId = params.get('s')
  const [selectedId, setSelectedId] = useState(
    allSubtopics.some((s) => s.id === paramId) ? (paramId as string) : allSubtopics[0].id,
  )
  const [query, setQuery] = useState('')
  const [treeOpen, setTreeOpen] = useState(false)
  const [uniTags, setUniTags] = useState<Record<string, string[]>>({})

  // Follow ?s= when arriving from a question's reference link.
  useEffect(() => {
    if (paramId && allSubtopics.some((s) => s.id === paramId)) setSelectedId(paramId)
  }, [paramId])

  const tagsFor = (sid: string) => uniTags[sid] ?? scopeUniversities(sid)
  const addTag = (sid: string, uid: string) =>
    setUniTags((prev) => ({ ...prev, [sid]: [...(prev[sid] ?? scopeUniversities(sid)), uid] }))
  const removeTag = (sid: string, uid: string) =>
    setUniTags((prev) => ({
      ...prev,
      [sid]: (prev[sid] ?? scopeUniversities(sid)).filter((u) => u !== uid),
    }))

  const nav = useMemo(
    () => (
      <>
        <div className="border-b border-line p-3">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the library…"
          />
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          <Tree
            selectedId={selectedId}
            query={query}
            onSelect={(id) => {
              setSelectedId(id)
              setTreeOpen(false)
            }}
          />
        </div>
      </>
    ),
    [query, selectedId],
  )

  return (
    <div className="flex h-[calc(100dvh-3.5rem)]">
      {/* Desktop navigator */}
      <aside className="hidden w-72 shrink-0 flex-col border-r border-line bg-surface lg:flex">
        <div className="flex h-12 items-center gap-2 border-b border-line px-4">
          <Icon icon={BookOpen} size={16} className="text-accent" />
          <span className="font-serif text-[16px] font-semibold text-ink">Library</span>
        </div>
        {nav}
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center gap-2 border-b border-line px-4 py-2 lg:hidden">
          <Button variant="secondary" size="sm" iconLeft={BookOpen} onClick={() => setTreeOpen(true)}>
            Browse topics
          </Button>
        </div>
        <Reader
          id={selectedId}
          tags={tagsFor(selectedId)}
          onAdd={(u) => addTag(selectedId, u)}
          onRemove={(u) => removeTag(selectedId, u)}
          query={query}
        />
      </div>

      {/* Mobile navigator */}
      {treeOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/30 animate-fade" onClick={() => setTreeOpen(false)} />
          <div className="animate-slide-x absolute inset-y-0 left-0 flex w-[17rem] flex-col bg-surface shadow-pop">
            <div className="flex h-12 items-center justify-between border-b border-line px-4">
              <span className="font-serif text-[16px] font-semibold text-ink">Library</span>
              <button onClick={() => setTreeOpen(false)} className="text-ink-3 hover:text-ink">
                <Icon icon={X} size={18} />
              </button>
            </div>
            {nav}
          </div>
        </div>
      )}
    </div>
  )
}
