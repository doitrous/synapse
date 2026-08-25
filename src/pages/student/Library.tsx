import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams, useLocation } from 'react-router-dom'
import {
  Clock,
  NotebookPen,
  ListChecks,
  ArrowRight,
  ArrowLeft,
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
  Image as ImageIcon,
  Film,
  AudioLines,
  Expand,
} from 'lucide-react'
import type { LibBlock } from '@/data/library'
import type { ArticleMediaRecord } from '@/data/contentControl'
import { useLiveLibrary, type LiveSubtopic } from '@/lib/useLiveLibrary'
import { getSubject } from '@/data/subjects'
import { Button, ButtonLink } from '@/components/ui/Button'
import { CatalogueUnavailable } from '@/components/ui/CatalogueUnavailable'
import { Icon } from '@/components/ui/Icon'
import { SystemMark } from '@/components/ui/SystemMark'
import { cn } from '@/lib/cn'
import { formatLongDate } from '@/lib/format'
import { usePersistentState } from '@/lib/usePersistentState'
import { ReportContentDialog, type ReportTarget } from '@/components/reports/ReportContentDialog'
import { BackBar, backState } from '@/components/ui/BackBar'
import { useUniversityCatalogue, universityFrom } from '@/lib/useUniversityCatalogue'
import { useT } from '@/lib/i18n'
import { useIdentity } from '@/lib/useIdentity'
import { hasConsoleAccess } from '@/data/adminRoles'
import { useLocalPreference } from '@/lib/useLocalPreference'
import { MenuToggle } from '@/components/shell/MenuToggle'
import { NewArticleDialog } from '@/components/library/NewArticleDialog'
import { PERSONAL_TAGS_KEY, USER_ARTICLES_KEY, type UserArticle } from '@/data/userLibrary'
import { MEDICAL_PUBLISHED_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore, type ArticleSpan, type CitationLink, type EvidenceLocator, type MedicalEvidenceStore } from '@/data/medicalEvidence'
import { ConceptText } from '@/components/concepts/ConceptText'
import { ConceptChip } from '@/components/concepts/ConceptChip'
import { apiOpenFile } from '@/lib/api'
import { useMedicalTaxonomy } from '@/data/medicalTaxonomyStore'
import { indexMedicalTaxonomy } from '@/data/medicalLibraryTaxonomy'
import { AtlasNavigation, LibraryLanding, LibraryViewTabs, TaxonomyNodeOverview, type AtlasArticle, type MedicalLibraryView } from '@/components/library/MedicalLibraryAtlas'
import {
  MarkNotePopover, MarkSelectionToolbar, MarkedPhrase, YourMarksPanel, useArticleMarks,
  type ArticleMarks,
} from '@/components/library/ArticleMarks'
import { overlayPortal } from '@/lib/overlayPortal'
import { orderedSegments } from '@/lib/library/textAnchor'
import type { LibraryMark } from '@/data/libraryMarks'
import { PlacedAsset } from '@/components/ui/PlacedMedia'
import { useMediaRecords } from '@/lib/useMediaRecords'

/**
 * Article prose, with the search term marked where there is one.
 *
 * With no active search the text goes through ConceptText, which makes each
 * named concept pressable and renders everything between them through the
 * inline markup renderer. While searching, the plain string is used instead:
 * splitting on the query and re-tokenising each fragment would break markers
 * across the split, and seeing what matched matters more than seeing it styled.
 */
function Highlight({ text, query, concepts = true }: { text: string; query: string; concepts?: boolean }) {
  const q = query.trim()
  // No active search: render the author's inline markup, then let ConceptText
  // find the named concepts inside it. This is the one student surface actually
  // about reading concepts, and it was the only one not highlighting them.
  if (!q) return <ConceptText text={text} enabled={concepts} />
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return <>{text.split(new RegExp(`(${escaped})`, 'ig')).map((part, index) => part.toLowerCase() === q.toLowerCase() ? <mark key={index} className="rounded-sm bg-warning-tint px-0.5 text-ink">{part}</mark> : part)}</>
}

/* ---- Navigator --------------------------------------------------------- */

/* ---- Article media ----------------------------------------------------- */

const MEDIA_ICON = { image: ImageIcon, video: Film, audio: AudioLines } as const
const MEDIA_LABEL = { image: 'Image', video: 'Video', audio: 'Audio' } as const

/** Media pinned to words inside a given part of the article. */
function anchoredMedia(media: ArticleMediaRecord[] | undefined, block: 'summary' | 'body' | 'hold' | 'trap') {
  return (media ?? []).filter((item) => item.anchor?.quote?.trim() && (item.anchor.block ?? 'body') === block)
}

/** Media that belongs to the article as a whole rather than to a phrase. */
function standaloneMedia(media: ArticleMediaRecord[] | undefined) {
  return (media ?? []).filter((item) => !item.anchor?.quote?.trim())
}

/**
 * Locate each anchor quote inside a run of text.
 *
 * Matching is case-insensitive so an anchor still resolves when a sentence is
 * recased, and overlapping anchors resolve first-come so a phrase is never
 * wrapped twice.
 */
function anchorSegments(text: string, media: ArticleMediaRecord[]) {
  const haystack = text.toLocaleLowerCase()
  const hits = media
    .map((item) => {
      const quote = item.anchor!.quote.trim()
      const start = haystack.indexOf(quote.toLocaleLowerCase())
      return start === -1 ? undefined : { start, end: start + quote.length, item }
    })
    .filter((hit): hit is { start: number; end: number; item: ArticleMediaRecord } => Boolean(hit))
    .sort((a, b) => a.start - b.start)

  const kept: typeof hits = []
  let cursor = 0
  for (const hit of hits) {
    if (hit.start >= cursor) { kept.push(hit); cursor = hit.end }
  }
  return kept
}

/**
 * Article prose, carrying everything pinned to a phrase inside it.
 *
 * Two things now claim phrases: media an author anchored, and the student's own
 * highlights and notes. They go through one ordered, non-overlapping segment
 * list — see `orderedSegments` — so the two cannot both try to wrap the same
 * words, and the first by position wins, which is the rule the media matcher
 * used on its own before this.
 *
 * `data-mark-block` and `data-mark-text` are what the selection toolbar reads:
 * which run of text this is, and what it says in the store. A block without
 * them is prose the student cannot mark, which is how headings and the sources
 * list stay out of it.
 */
type PhraseSegment =
  | { start: number; end: number; kind: 'media'; item: ArticleMediaRecord }
  | { start: number; end: number; kind: 'mark'; mark: LibraryMark }

function ReaderText({
  text,
  query,
  media = [],
  onOpenMedia,
  blockId,
  marks,
  onOpenMark,
}: {
  text: string
  query: string
  media?: ArticleMediaRecord[]
  onOpenMedia?: (item: ArticleMediaRecord) => void
  /** Omitted for text the student is not offered a way to mark. */
  blockId?: string
  marks?: ArticleMarks
  onOpenMark?: (mark: LibraryMark, anchor: HTMLElement) => void
}) {
  const mediaHits = media.length && onOpenMedia ? anchorSegments(text, media) : []
  const markHits = blockId && marks ? marks.placed(blockId, text) : []

  const segments: PhraseSegment[] = orderedSegments<PhraseSegment>([
    ...mediaHits.map((hit) => ({ start: hit.start, end: hit.end, value: { start: hit.start, end: hit.end, kind: 'media' as const, item: hit.item } })),
    ...markHits.map(({ mark, range }) => ({ start: range.start, end: range.end, value: { start: range.start, end: range.end, kind: 'mark' as const, mark } })),
  ]).map((segment) => segment.value)

  const body = (() => {
    if (!segments.length) return <Highlight text={text} query={query} />
    const parts: React.ReactNode[] = []
    let cursor = 0
    segments.forEach((segment, index) => {
      if (segment.start > cursor) parts.push(<Highlight key={`t-${index}`} text={text.slice(cursor, segment.start)} query={query} />)
      const inner = <Highlight text={text.slice(segment.start, segment.end)} query={query} />
      if (segment.kind === 'media') {
        parts.push(
          <button
            key={`m-${segment.item.id}`}
            type="button"
            onClick={() => onOpenMedia!(segment.item)}
            title={segment.item.caption || `Open ${MEDIA_LABEL[segment.item.type].toLowerCase()}`}
            className="mx-px inline items-baseline gap-1 rounded-sm border-b-2 border-dotted border-primary/70 bg-primary-tint/30 px-0.5 text-start font-medium text-ink transition-colors hover:bg-primary-tint hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            {inner}
            <Icon icon={MEDIA_ICON[segment.item.type]} size={12} className="ms-1 inline align-baseline text-primary-strong" />
          </button>,
        )
      } else {
        parts.push(
          <MarkedPhrase key={`k-${segment.mark.id}`} mark={segment.mark} onOpen={onOpenMark ?? (() => undefined)}>
            {inner}
          </MarkedPhrase>,
        )
      }
      cursor = segment.end
    })
    if (cursor < text.length) parts.push(<Highlight key="t-last" text={text.slice(cursor)} query={query} />)
    return <>{parts}</>
  })()

  if (!blockId) return body
  return <span data-mark-block={blockId} data-mark-text={text}>{body}</span>
}

/** The media itself, sized to its container. */
function MediaFrame({ item, className }: { item: ArticleMediaRecord; className?: string }) {
  const mediaRecords = useMediaRecords()
  // An admin can release an item before its alt text is written, so fall back
  // to the caption rather than shipping an unlabelled element.
  const label = item.altText?.trim() || item.caption?.trim() || MEDIA_LABEL[item.type]
  if (item.sourceId) {
    const record = mediaRecords.get(item.sourceId)
    return record
      ? <PlacedAsset record={record} caption={item.caption} className={className} />
      : <p role="alert" className="p-3 text-[11.5px] text-danger">This managed media record is unavailable.</p>
  }
  if (item.type === 'image') return <img src={item.url} alt={label} className={cn('w-full rounded-lg object-contain', className)} />
  if (item.type === 'video') return <video src={item.url} controls aria-label={label} className={cn('w-full rounded-lg', className)} />
  return <audio src={item.url} controls aria-label={label} className={cn('w-full', className)} />
}

/** Attribution line shown under a media item, when there is one to show. */
function MediaCredit({ item }: { item: ArticleMediaRecord }) {
  const credit = [item.exactSource, item.locator, item.rights].map((part) => part?.trim()).filter(Boolean).join(' · ')
  if (!credit) return null
  return <p className="mt-1.5 text-[11px] leading-relaxed text-ink-3">{credit}</p>
}

/** Full-size view, opened by pressing an anchored phrase or a media thumbnail. */
function MediaLightbox({ item, onClose }: { item: ArticleMediaRecord; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return overlayPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="media-lightbox-title">
      <button type="button" className="absolute inset-0 bg-ink/60" onClick={onClose} aria-label="Close media" />
      <figure className="relative flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-line bg-paper shadow-pop">
        <header className="flex items-start gap-3 border-b border-line bg-surface px-4 py-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary-strong"><Icon icon={MEDIA_ICON[item.type]} size={16} /></span>
          <div className="min-w-0 flex-1">
            <h2 id="media-lightbox-title" className="text-[13.5px] font-semibold leading-snug text-ink">{item.caption || MEDIA_LABEL[item.type]}</h2>
            {item.anchor?.quote && <p className="mt-0.5 truncate text-[11.5px] text-ink-3">Explains “{item.anchor.quote}”</p>}
          </div>
          <button type="button" onClick={onClose} className="grid size-8 place-items-center rounded-lg text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close media"><Icon icon={X} size={17} /></button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto bg-inset/40 p-4">
          <MediaFrame item={item} className="max-h-[65vh]" />
          <figcaption className="mt-3">
            {item.caption && <p className="text-[13px] leading-relaxed text-ink-2">{item.caption}</p>}
            <MediaCredit item={item} />
          </figcaption>
        </div>
      </figure>
    </div>
  )
}

/** The article's own media space: everything not pinned to a phrase. */
function ArticleMediaSection({ media, onOpenMedia, t }: { media: ArticleMediaRecord[]; onOpenMedia: (item: ArticleMediaRecord) => void; t: (value: string) => string }) {
  if (!media.length) return null
  return (
    <section className="mt-10 border-t border-line pt-5">
      <div className="flex items-center gap-2">
        <Icon icon={ImageIcon} size={16} className="text-primary" />
        <h2 className="font-serif text-[19px] font-semibold tracking-[-0.01em] text-ink">{t('Media')}</h2>
      </div>
      <p className="mt-1 text-[12px] text-ink-3">{t('Figures and recordings for this article.')}</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {media.map((item) => (
          <figure key={item.id} className="overflow-hidden rounded-xl border border-line bg-surface shadow-panel">
            {item.type === 'image' ? (
              <button
                type="button"
                onClick={() => onOpenMedia(item)}
                className="group relative block w-full bg-inset/40 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                aria-label={`${t('Open')} ${item.caption || MEDIA_LABEL[item.type]}`}
              >
                <MediaFrame item={item} className="max-h-56" />
                <span className="absolute end-2 top-2 grid size-7 place-items-center rounded-md bg-paper/85 text-ink-2 opacity-0 transition-opacity group-hover:opacity-100"><Icon icon={Expand} size={14} /></span>
              </button>
            ) : (
              <div className="bg-inset/40 p-3"><MediaFrame item={item} className="max-h-56" /></div>
            )}
            <figcaption className="border-t border-line px-3.5 py-3">
              <p className="text-[12.5px] leading-relaxed text-ink-2">{item.caption || item.altText}</p>
              <MediaCredit item={item} />
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

/**
 * Every media item in the article, anchored or not.
 *
 * A figure pinned to a phrase is easy to miss while reading, so it is listed
 * here too — this panel is the article's complete media index.
 */
function MediaIndexPanel({ media, onOpenMedia, t }: { media: ArticleMediaRecord[]; onOpenMedia: (item: ArticleMediaRecord) => void; t: (value: string) => string }) {
  if (!media.length) return null
  return (
    <section className="overflow-hidden rounded-xl border border-line bg-surface shadow-panel">
      <div className="border-b border-line px-4 py-3">
        <div className="flex items-center gap-2"><Icon icon={ImageIcon} size={15} className="text-primary" /><h2 className="text-[13px] font-semibold text-ink">{t('Media in this article')}</h2></div>
        <p className="mt-0.5 font-mono text-[10.5px] text-ink-3">{media.length} {media.length === 1 ? t('item') : t('items')}</p>
      </div>
      <ul className="divide-y divide-line">
        {media.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onOpenMedia(item)}
              className="group flex w-full items-start gap-2.5 px-4 py-3 text-start transition-colors hover:bg-primary-tint/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-md bg-inset text-ink-3"><Icon icon={MEDIA_ICON[item.type]} size={14} /></span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12.5px] font-medium text-ink-2 group-hover:text-ink">{item.caption || item.altText || MEDIA_LABEL[item.type]}</span>
                <span className="mt-0.5 block truncate text-[10.5px] text-ink-3">
                  {item.anchor?.quote ? `${t('Linked to')} “${item.anchor.quote}”` : t('Whole article')}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ---- Reading blocks ---------------------------------------------------- */

function Callout({ tone, title, text, query, media, onOpenMedia, blockId, marks, onOpenMark }: { tone: 'primary' | 'warning'; title: string; text: string; query: string; media?: ArticleMediaRecord[]; onOpenMedia?: (item: ArticleMediaRecord) => void; blockId?: string; marks?: ArticleMarks; onOpenMark?: (mark: LibraryMark, anchor: HTMLElement) => void }) {
  const accent = tone === 'primary'
  return (
    <div
      className={cn(
        'my-5 rounded-xl border p-4',
        accent ? 'border-primary/45 bg-primary-tint/55' : 'border-warning/35 bg-warning-tint/65',
      )}
    >
      <div className="flex items-center gap-2">
        <Icon icon={accent ? Flag : TriangleAlert} size={16} className={accent ? 'text-primary' : 'text-warning'} />
        <span className={cn('text-[12.5px] font-semibold', accent ? 'text-primary-strong' : 'text-warning')}>
          <Highlight text={title} query={query} />
        </span>
      </div>
      <p className="mt-1.5 text-[14px] leading-relaxed text-ink"><ReaderText text={text} query={query} media={media} onOpenMedia={onOpenMedia} blockId={blockId} marks={marks} onOpenMark={onOpenMark} /></p>
    </div>
  )
}

function Blocks({
  blocks,
  query,
  onEvidence,
  bodyMedia = [],
  trapMedia = [],
  onOpenMedia,
  marks,
  onOpenMark,
}: {
  blocks: LibBlock[]
  query: string
  onEvidence?: (spanId: string) => void
  bodyMedia?: ArticleMediaRecord[]
  trapMedia?: ArticleMediaRecord[]
  onOpenMedia?: (item: ArticleMediaRecord) => void
  marks?: ArticleMarks
  onOpenMark?: (mark: LibraryMark, anchor: HTMLElement) => void
}) {
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
              <ReaderText text={b.text ?? ''} query={query} media={bodyMedia} onOpenMedia={onOpenMedia} blockId={`block:${i}`} marks={marks} onOpenMark={onOpenMark} />
            </p>
          )
        if (b.type === 'list')
          return (
            <ul key={i} className="mt-3 space-y-2">
              {b.items?.map((it, j) => (
                <li key={j} className="flex gap-2.5 text-[15px] leading-[1.6] text-ink/90">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-soft" />
                  <span><ReaderText text={it} query={query} media={bodyMedia} onOpenMedia={onOpenMedia} blockId={`block:${i}:item:${j}`} marks={marks} onOpenMark={onOpenMark} /></span>
                </li>
              ))}
            </ul>
          )
        if (b.type === 'sources')
          return (
            <div key={i} className="mt-10 border-t border-line pt-5">
              <div className="flex items-center gap-2">
                <Icon icon={Database} size={16} className="text-primary" />
                <h2 className="font-serif text-[19px] font-semibold tracking-[-0.01em] text-ink">Sources</h2>
              </div>
              <p className="mt-1 text-[12px] text-ink-3">
                {b.count ?? 0} verified fact{b.count === 1 ? '' : 's'} behind this article. Select one to see its exact source pages.
              </p>
            </div>
          )
        if (b.type === 'fact')
          return (
            <button
              key={b.spanId ?? i}
              type="button"
              onClick={() => b.spanId && onEvidence?.(b.spanId)}
              // Cortex blue, not crimson: this block's whole meaning is "this
              // statement is backed by sources — open them", which is exactly
              // the structural, points-elsewhere role blue carries. Crimson
              // here competed with the article's actual actions.
              className="group mt-3 flex w-full items-start gap-3 rounded-lg border border-accent-line/70 bg-accent-tint/40 px-4 py-3 text-start transition-colors hover:border-accent hover:bg-accent-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35"
            >
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              {/* Concepts off here on purpose. A verified fact is itself a
                  button that opens its sources, so a concept inside it was a
                  button inside a button — invalid, and clicking one fired both.
                  One fact, one target. Concepts stay live everywhere else. */}
              <span className="min-w-0 flex-1 text-[15px] leading-[1.65] text-ink/90"><Highlight text={b.text ?? ''} query={query} concepts={false} /></span>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-accent-line bg-surface px-2 py-0.5 font-mono text-[10px] font-semibold text-accent-strong">
                <Icon icon={Database} size={11} />{b.citationIds?.length ?? 0}
              </span>
            </button>
          )
        return (
          <Callout
            key={i}
            tone={b.tone ?? 'primary'}
            title={b.title ?? ''}
            text={b.text ?? ''}
            query={query}
            media={b.tone === 'warning' ? trapMedia : bodyMedia}
            onOpenMedia={onOpenMedia}
            blockId={`block:${i}`}
            marks={marks}
            onOpenMark={onOpenMark}
          />
        )
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

  return overlayPortal(
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="evidence-drawer-title">
      <button type="button" className="absolute inset-0 bg-ink/25" onClick={onClose} aria-label="Close sources" />
      <aside className="absolute inset-y-0 end-0 flex w-full max-w-lg flex-col border-s border-line bg-paper shadow-pop">
        <header className="flex items-start gap-3 border-b border-line bg-surface px-5 py-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary-strong"><Icon icon={Database} size={17} /></span>
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
          <Icon icon={TagIcon} size={13} className="text-primary" />
          {t('Your tags')}
        </span>
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full border border-primary-line bg-primary-tint py-0.5 pe-1.5 ps-2.5 text-[12px] font-medium text-primary-strong"
          >
            {tag}
            <button
              onClick={() => onChange(tags.filter((x) => x !== tag))}
              aria-label={`${t('Remove')} ${tag}`}
              className="text-primary/70 hover:text-primary"
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
          className="h-7 min-w-[7rem] rounded-full border border-line bg-surface px-3 text-[12px] text-ink focus:border-primary focus:outline-none"
        />
      </div>
      {suggestions.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-ink-3">{t('Reuse:')}</span>
          {suggestions.map((tag) => (
            <button
              key={tag}
              onClick={() => add(tag)}
              className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-[12px] text-ink-2 hover:border-primary-line hover:bg-primary-tint/40 hover:text-primary-strong"
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
  article,
  tags,
  reusable,
  onTagsChange,
  query,
  onOpenArticle,
  onBrowseSubject,
  onBrowseTopic,
  cameFrom,
}: {
  article: LiveSubtopic
  tags: string[]
  reusable: string[]
  onTagsChange: (next: string[]) => void
  query: string
  onOpenArticle: (articleId: string) => void
  onBrowseSubject?: () => void
  onBrowseTopic?: () => void
  /** The article this one was reached from, when it was reached from one. */
  cameFrom?: { title: string; onBack: () => void }
}) {
  const t = useT()
  const location = useLocation()
  const [universityCatalogue] = useUniversityCatalogue()
  const { topics: libraryTopics, updatedAtFor } = useLiveLibrary()
  const st = article
  const id = article.id
  const subject = getSubject(st.subjectId)
  // Only the universities an author recorded. The old fallback hashed the
  // article id to invent a set, so every article claimed a scope it never had.
  const appliesTo: string[] = st.universityIds ?? []
  const [evidence] = usePersistentState<MedicalEvidenceStore>(MEDICAL_PUBLISHED_EVIDENCE_STORAGE_KEY, emptyMedicalEvidenceStore)
  const [selectedSpanId, setSelectedSpanId] = useState<string | null>(null)
  const selectedSpan = evidence.articleSpans.find((span) => span.id === selectedSpanId)
  const chapterIndex = libraryTopics.find((topic) => topic.id === st.topicId)?.subtopics.findIndex((item) => item.id === id) ?? 0
  const [readArticles, setReadArticles] = usePersistentState<Record<string, boolean>>('synapse.library.read', {})
  const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null)
  // Traps come from the projection, which has already applied the callout
  // evidence policy. Nothing is invented here when an article has none.
  const traps = st.traps ?? st.blocks.filter((block) => block.type === 'callout' && block.tone === 'warning').map((block) => block.text ?? '').filter(Boolean)
  const relatedArticles = st.relatedArticles ?? []
  const isRead = Boolean(readArticles[id])
  const [openMedia, setOpenMedia] = useState<ArticleMediaRecord | null>(null)
  const media = st.media ?? []

  /**
   * Every run of text the student can mark, by the id the reader gives it.
   *
   * Built here rather than inside the hook because this component is the only
   * thing that knows how the article is broken up — and orphan detection needs
   * the whole set, so a sentence moved between paragraphs does not read as a
   * mark whose words have gone.
   */
  const blockTexts = useMemo(() => {
    const texts: Record<string, string> = { summary: st.summary }
    st.blocks.forEach((block, index) => {
      if (block.type === 'p' || block.type === 'callout') texts[`block:${index}`] = block.text ?? ''
      if (block.type === 'list') block.items?.forEach((item, itemIndex) => { texts[`block:${index}:item:${itemIndex}`] = item })
    })
    st.keyPoints.forEach((point, index) => { texts[`hold:${index}`] = point })
    return texts
  }, [st.blocks, st.keyPoints, st.summary])

  const marks = useArticleMarks(st.id, blockTexts)
  const articleRef = useRef<HTMLDivElement>(null)
  const [openNote, setOpenNote] = useState<{ mark: LibraryMark; anchor: HTMLElement | null } | null>(null)

  /**
   * Bring a mark into view from the list beside the article.
   *
   * The mark is a real button in the prose, so it can simply be found and
   * focused — no second copy of the text, and no scroll arithmetic.
   */
  const revealMark = (mark: LibraryMark) => {
    const target = articleRef.current?.querySelector<HTMLElement>(`[data-mark-block] button[aria-label$="${CSS.escape(mark.anchor.exact)}"]`)
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    target?.focus({ preventScroll: true })
  }

  return (
    <div className="mx-auto max-w-[78rem] px-5 py-8 sm:px-8 lg:py-10">
    {/* Two different returns, and both can apply: `cameFrom` is a jump made
        inside the library ("Read next"), `BackBar` is an arrival from another
        surface. Naming the article makes the difference obvious. */}
    {cameFrom && (
      <div className="mb-3">
        <button
          type="button"
          onClick={cameFrom.onBack}
          className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-[12.5px] font-medium text-ink-2 shadow-panel transition-colors hover:border-primary-line hover:text-primary-strong"
        >
          <Icon icon={ArrowLeft} size={15} className="shrink-0 rtl:-scale-x-100" />
          <span className="truncate">{t('Back to')} {cameFrom.title}</span>
        </button>
      </div>
    )}
    <BackBar />
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,46rem)_20rem]">
    <article ref={articleRef}>
      {/* The same trail as a taxonomy node page, and navigable for the same
          reason: reading an article is the most common place to want the rest
          of its branch. */}
      {/* These are real navigation, but they only changed colour on hover, so
          they read as a label. Given the house interactive treatment — hairline
          border, surface, hover fill, focus ring — the trail looks like the way
          back out that it is. A crumb with nowhere to go stays plain text. */}
      <nav aria-label={t('Breadcrumb')} className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-ink-3">
        {onBrowseSubject ? (
          <button
            type="button"
            onClick={onBrowseSubject}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface py-1 pe-2.5 ps-1 font-medium text-ink-2 shadow-panel transition-colors hover:border-primary-line hover:bg-primary-tint/40 hover:text-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <SystemMark subjectId={subject.id} index={chapterIndex + 1} />
            {subject.name}
          </button>
        ) : (
          <span className="inline-flex items-center gap-1.5 py-1 pe-2.5 ps-1 font-medium text-ink-2">
            <SystemMark subjectId={subject.id} index={chapterIndex + 1} />
            {subject.name}
          </span>
        )}
        <Icon icon={ArrowRight} size={12} className="rtl:-scale-x-100" />
        {onBrowseTopic ? (
          <button
            type="button"
            onClick={onBrowseTopic}
            className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface px-2.5 py-1.5 transition-colors hover:border-primary-line hover:bg-primary-tint/40 hover:text-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {st.topicTitle}
            <Icon icon={ChevronRight} size={12} className="opacity-60 rtl:-scale-x-100" />
          </button>
        ) : (
          <span className="px-2.5 py-1.5">{st.topicTitle}</span>
        )}
      </nav>

      <h1 className="mt-3 font-serif text-[30px] font-semibold leading-tight tracking-[-0.02em] text-ink">
        <Highlight text={st.title} query={query} />
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="inline-flex items-center gap-1.5 text-[12.5px] text-ink-3">
          <Icon icon={Clock} size={14} />
          {st.readingMin} {t('min read')}
        </span>
        {(() => {
          // Nothing at all rather than a date no revision produced.
          const updatedAt = updatedAtFor(st.id)
          return updatedAt ? <span className="text-[12.5px] text-ink-3">{t('Updated')} {formatLongDate(updatedAt)}</span> : null
        })()}
        <div className="flex gap-2">
          <ButtonLink
            to="/app/notebook?capture=1"
            variant="secondary"
            size="sm"
            iconLeft={NotebookPen}
            onClick={() => {
              try {
                sessionStorage.setItem('synapse.notebook.capture', JSON.stringify({
                  quote: st.summary,
                  sourceTitle: st.title,
                  articleId: st.id,
                  topicTitle: st.topicTitle,
                  sourceUrl: `/app/library?s=${st.id}`,
                }))
              } catch { /* keep navigation usable */ }
            }}
          >
            {t('Take a note')}
          </ButtonLink>
          <ButtonLink to={`/app/qbank?article=${st.id}`} variant="primary" size="sm" iconLeft={ListChecks}>
            {t('Test yourself')}
          </ButtonLink>
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

      <p className="mt-6 text-[16.5px] leading-[1.6] text-ink">
        <ReaderText text={st.summary} query={query} media={anchoredMedia(media, 'summary')} onOpenMedia={setOpenMedia} blockId="summary" marks={marks} onOpenMark={(mark, anchor) => setOpenNote({ mark, anchor })} />
      </p>

      <div className="mt-2">
        <Blocks
          blocks={st.blocks}
          query={query}
          onEvidence={setSelectedSpanId}
          bodyMedia={anchoredMedia(media, 'body')}
          trapMedia={anchoredMedia(media, 'trap')}
          onOpenMedia={setOpenMedia}
          marks={marks}
          onOpenMark={(mark, anchor) => setOpenNote({ mark, anchor })}
        />
      </div>

      <ArticleMediaSection media={standaloneMedia(media)} onOpenMedia={setOpenMedia} t={t} />

      <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-line pt-5">
        <Button variant={isRead ? 'secondary' : 'primary'} iconLeft={isRead ? Check : BookmarkCheck} onClick={() => setReadArticles((current) => ({ ...current, [id]: !isRead }))}>{isRead ? t('Marked as read') : t('Mark as read')}</Button>
        <ButtonLink to={`/app/qbank?article=${st.id}`} variant="secondary" iconLeft={ListChecks}>{t('Test yourself')} · {st.questions.length} {t('questions')}</ButtonLink>
        <ButtonLink
          to="/app/notebook?capture=1"
          variant="ghost"
          iconLeft={NotebookPen}
          onClick={() => {
            try {
              sessionStorage.setItem('synapse.notebook.capture', JSON.stringify({
                quote: st.summary,
                sourceTitle: st.title,
                articleId: st.id,
                topicTitle: st.topicTitle,
                sourceUrl: `/app/library?s=${st.id}`,
              }))
            } catch { /* keep navigation usable */ }
          }}
        >
          {t('Take a note')}
        </ButtonLink>
      </div>
    </article>
    {/* min-w-0: on mobile the aside shares one grid column with the article, so
        without it the widest sidebar row sets the column width for both. */}
    <aside className="min-w-0 space-y-3 lg:sticky lg:top-[4.75rem]">
      <YourMarksPanel marks={marks} onSelect={revealMark} onOpenNote={(mark, anchor) => setOpenNote({ mark, anchor })} />
      {st.keyPoints.length > 0 && (
      <section className="rounded-xl border border-line bg-surface p-4 shadow-panel">
        <div className="flex items-center gap-2"><Icon icon={Lightbulb} size={15} className="text-primary" /><h2 className="text-[13px] font-semibold text-ink">{t('Hold these')}</h2></div>
        <ul className="mt-3 space-y-2.5">{st.keyPoints.map((point, index) => <li key={point} className="flex gap-2 text-[12.5px] leading-snug text-ink-2"><span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" /><span><ReaderText text={point} query="" media={anchoredMedia(media, 'hold')} onOpenMedia={setOpenMedia} blockId={`hold:${index}`} marks={marks} onOpenMark={(mark, anchor) => setOpenNote({ mark, anchor })} /></span></li>)}</ul>
      </section>
      )}
      <MediaIndexPanel media={media} onOpenMedia={setOpenMedia} t={t} />
      {/* Shown only when this article has reviewed traps. An article with none
          says nothing rather than offering generic advice as its own. */}
      {traps.length > 0 && (
      <section className="overflow-hidden rounded-xl border border-line bg-surface shadow-panel">
        <div className="border-b border-line px-4 py-3"><div className="flex items-center gap-2"><Icon icon={CircleAlert} size={16} className="text-danger" /><h2 className="text-[13px] font-bold text-ink">{t('Where people lose the mark')}</h2></div><p className="mt-0.5 font-mono text-[10.5px] text-ink-3">{traps.length} {t('traps')}</p></div>
        <ul className="divide-y divide-line px-4 py-1">{traps.map((trap) => <li key={trap} className="flex gap-2.5 py-3 text-[12.5px] leading-relaxed text-ink-2"><Icon icon={TriangleAlert} size={16} className="mt-0.5 shrink-0 text-danger" /><span><ConceptText text={trap} /></span></li>)}</ul>
      </section>
      )}
      {(st.relatedConceptIds?.length ?? 0) > 0 && (
      <section className="rounded-xl border border-line bg-surface p-4 shadow-panel">
        <h2 className="text-[13px] font-semibold text-ink">{t('Concepts in this article')}</h2>
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {st.relatedConceptIds!.map((conceptId) => <li key={conceptId}><ConceptChip conceptId={conceptId} /></li>)}
        </ul>
      </section>
      )}
      {relatedArticles.length > 0 && (
      <section className="rounded-xl border border-line bg-surface p-4 shadow-panel">
        <h2 className="text-[13px] font-semibold text-ink">{t('Read next')}</h2>
        <ul className="mt-2 divide-y divide-line">{relatedArticles.map((related) => (
          <li key={related.id}>
            <button type="button" onClick={() => onOpenArticle(related.id)} className="group flex w-full items-start gap-2.5 py-2.5 text-start text-[12.5px] leading-snug text-ink-2 hover:text-ink">
              <span className="grid size-7 shrink-0 place-items-center rounded-md bg-inset"><Icon icon={BookOpen} size={14} className="text-ink-3" /></span>
              <span className="min-w-0 flex-1">{related.title}{related.reason && <span className="mt-0.5 block text-[10.5px] text-ink-3">{related.reason}</span>}</span>
              <Icon icon={ChevronRight} size={14} className="mt-1 text-ink-3 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
            </button>
          </li>
        ))}</ul>
      </section>
      )}
      {/* Leaving the library for a filtered session had no way back: the student
          landed in the question bank with the article they were reading gone. */}
      <Link to={`/app/qbank?article=${st.id}`} state={backState(location, t('Back to article'))} className="group flex items-center gap-3 rounded-xl border border-line bg-surface p-4 shadow-panel transition-colors hover:border-primary-line hover:bg-primary-tint/20">
        <span className="tnum grid size-10 shrink-0 place-items-center rounded-lg bg-primary-tint font-mono text-[15px] font-bold text-primary-strong">{st.questions.length}</span><span className="min-w-0 flex-1"><span className="block text-[13px] font-bold text-ink">{t('Questions that test this')}</span><span className="mt-0.5 block text-[11.5px] text-ink-3">{t('Start a filtered session')}</span></span><Icon icon={ChevronRight} size={17} className="text-ink-3 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
      </Link>
      <section className="rounded-xl border border-line bg-surface p-4 shadow-panel">
        <h2 className="text-[13px] font-semibold text-ink">{t('Resources that teach it')}</h2>
        <ul className="mt-2 divide-y divide-line">{st.resources.map((resource, index) => {
          // Prefer the recorded id: searching by title finds nothing the moment
          // a resource is renamed, and finds the wrong thing when two share a name.
          const resourceId = st.resourceIds?.[index]
          const to = resourceId ? `/app/resources?id=${encodeURIComponent(resourceId)}` : `/app/resources?q=${encodeURIComponent(resource)}`
          return <li key={resource}><Link to={to} state={backState(location, t('Back to article'))} data-context-href={to} data-context-label={resource} className="group flex items-start gap-2.5 py-2.5 text-[12.5px] leading-snug text-ink-2 hover:text-ink"><span className="grid size-7 shrink-0 place-items-center rounded-md bg-inset"><Icon icon={FileText} size={14} className="text-ink-3" /></span><span className="min-w-0 flex-1">{resource}<span className="mt-0.5 block text-[10.5px] text-ink-3">{t('Open at the relevant page')}</span></span><Icon icon={ExternalLink} size={14} className="mt-1 text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></li>
        })}</ul>
      </section>
    </aside>
    </div>
    <ReportContentDialog open={Boolean(reportTarget)} target={reportTarget} onClose={() => setReportTarget(null)} />
    {selectedSpan && <EvidenceDrawer span={selectedSpan} evidence={evidence} onClose={() => setSelectedSpanId(null)} />}
    {openMedia && <MediaLightbox item={openMedia} onClose={() => setOpenMedia(null)} />}
    <MarkSelectionToolbar container={articleRef} marks={marks} onNoteCreated={(mark) => setOpenNote({ mark, anchor: null })} />
    {openNote && (
      <MarkNotePopover
        mark={marks.all.find((item) => item.id === openNote.mark.id) ?? openNote.mark}
        // A note opened straight from the toolbar has no element to point at
        // yet — the phrase it belongs to renders on the same tick — so it hangs
        // off the article until the student closes it.
        anchor={openNote.anchor ?? articleRef.current}
        marks={marks}
        onClose={() => setOpenNote(null)}
      />
    )}
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
            <SystemMark subjectId={subject.id} index={1} />
            {subject.name}
          </span>
          <Icon icon={ArrowRight} size={12} className="rtl:-scale-x-100" />
          <span className="inline-flex items-center gap-1 text-primary-strong"><Icon icon={PenLine} size={12} /> {t('My articles')}</span>
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
  const { subtopics: allSubtopics, availability } = useLiveLibrary()
  const [taxonomy] = useMedicalTaxonomy()
  const taxonomyIndex = useMemo(() => indexMedicalTaxonomy(taxonomy), [taxonomy])
  const [params, setParams] = useSearchParams()
  const paramId = params.get('s')
  const paramView = params.get('view')
  const paramNode = params.get('node')
  const initialView: MedicalLibraryView = ['system', 'discipline', 'skills', 'knowledge', 'module', 'year'].includes(paramView ?? '') ? paramView as MedicalLibraryView : paramId ? 'system' : 'module'
  const [userArticles, setUserArticles] = usePersistentState<UserArticle[]>(USER_ARTICLES_KEY, [])
  const [personalTags, setPersonalTags] = usePersistentState<Record<string, string[]>>(PERSONAL_TAGS_KEY, {})
  const [selectedId, setSelectedId] = useState(allSubtopics.some((s) => s.id === paramId) ? (paramId as string) : '')
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>(() => {
    if (paramNode && taxonomyIndex.byId.has(paramNode)) return paramNode
    if (['system', 'discipline', 'skills', 'knowledge'].includes(initialView)) return taxonomyIndex.roots(initialView as Exclude<MedicalLibraryView, 'home' | 'module' | 'year'>)[0]?.id
    return undefined
  })
  const [view, setView] = useState<MedicalLibraryView>(initialView)
  const [treeOpen, setTreeOpen] = useState(false)
  const [creating, setCreating] = useState(false)
  // The rail is a device preference — a wide monitor and a laptop want
  // different answers.
  const [railOpen, setRailOpen] = useLocalPreference('synapse.library.rail', true)
  const railCollapseTimer = useRef<number | null>(null)
  /** Articles jumped from, most recent last — the way back out of "Read next". */
  const [trail, setTrail] = useState<string[]>([])
  const { role } = useIdentity()
  const atlasArticles = useMemo<AtlasArticle[]>(() => allSubtopics.map((article) => ({ id: article.id, title: article.title, summary: article.summary, subjectId: article.subjectId, topicTitle: article.topicTitle, primaryNodeId: article.primaryNodeId, secondaryNodeIds: article.secondaryNodeIds })), [allSubtopics])

  const defaultNodeFor = (nextView: MedicalLibraryView): string | undefined => {
    if (nextView === 'home' || nextView === 'module' || nextView === 'year') return undefined
    return taxonomyIndex.roots(nextView)[0]?.id
  }

  function cancelRailAutoCollapse() {
    if (railCollapseTimer.current != null) window.clearTimeout(railCollapseTimer.current)
    railCollapseTimer.current = null
  }

  function scheduleRailAutoCollapse() {
    cancelRailAutoCollapse()
    if (!window.matchMedia('(min-width: 1024px)').matches) return
    railCollapseTimer.current = window.setTimeout(() => {
      setRailOpen(false)
      railCollapseTimer.current = null
    }, 3_000)
  }

  useEffect(() => () => cancelRailAutoCollapse(), [])

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
    cancelRailAutoCollapse()
    setView(nextView)
    setSelectedId('')
    const nextNodeId = nodeId ?? defaultNodeFor(nextView)
    setSelectedNodeId(nextNodeId)
    const next = new URLSearchParams()
    next.set('view', nextView)
    if (nextNodeId) next.set('node', nextNodeId)
    setParams(next)
  }

  /** Navigate to an article. Says nothing about how the student got there. */
  const showArticle = (articleId: string) => {
    const article = allSubtopics.find((item) => item.id === articleId)
    const node = article?.primaryNodeId ? taxonomyIndex.byId.get(article.primaryNodeId) : undefined
    const nextView: MedicalLibraryView = node?.division ?? (view === 'home' || view === 'module' || view === 'year' ? 'system' : view)
    setView(nextView)
    setSelectedNodeId(node?.id)
    setSelectedId(articleId)
    setRailOpen(true)
    scheduleRailAutoCollapse()
    const next = new URLSearchParams()
    next.set('view', nextView)
    next.set('s', articleId)
    if (node) next.set('node', node.id)
    setParams(next)
  }

  /** Arriving fresh — from the tree, from search, from a link in. */
  const openArticle = (articleId: string) => {
    setTrail([])
    showArticle(articleId)
  }

  /**
   * Following "Read next" out of the article being read.
   *
   * Both paths used to replace the search params outright, so three articles
   * deep there was no way back except the browser button — and no way to tell
   * which of the three it would land on. The trail records where each jump
   * started so the reader can offer the way back by name.
   */
  const openRelatedArticle = (articleId: string) => {
    if (selectedId && selectedId !== articleId) setTrail((current) => [...current, selectedId])
    showArticle(articleId)
  }

  const goBackInTrail = () => {
    const previous = trail[trail.length - 1]
    if (!previous) return
    setTrail((current) => current.slice(0, -1))
    showArticle(previous)
  }

  const changeView = (nextView: MedicalLibraryView) => {
    cancelRailAutoCollapse()
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
    // A topic is a step in browsing, not the end of it: the tree stays.
    cancelRailAutoCollapse()
    setRailOpen(true)
    setTrail([])
    setSelectedNodeId(nodeId)
    setSelectedId('')
    setView(node.division)
    const next = new URLSearchParams()
    next.set('view', node.division)
    next.set('node', nodeId)
    setParams(next)
  }

  // "On a route" means a view has been chosen or an article opened — the two
  // states in which the tab strip is a navigation aid rather than a duplicate.
  const onRoute = view !== 'home' || Boolean(selectedId)
  const cameFromArticle = allSubtopics.find((item) => item.id === trail[trail.length - 1])
  const selectedNode = selectedNodeId ? taxonomyIndex.byId.get(selectedNodeId) : undefined
  const selectedPublishedArticle = allSubtopics.find((article) => article.id === selectedId)
  // The top of the open article's branch — where "Cardiovascular System" in its
  // breadcrumb should lead. Undefined for an article with no placement, in which
  // case that crumb stays plain text rather than pretending to be a link.
  const placementRoot = selectedPublishedArticle?.primaryNodeId
    ? taxonomyIndex.lineage(selectedPublishedArticle.primaryNodeId)[0]?.id
    : undefined

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] min-h-0 flex-col bg-paper">
      <header className="flex h-12 shrink-0 items-center gap-2 border-b border-line bg-surface px-3 sm:px-4">
        {/* The topic tree's toggle, directly above the tree it opens. It used to
            sit at the far right of this header — the full width of the page away
            from the panel it controls, on the opposite side from where that
            panel appears. */}
        {onRoute && (
          <MenuToggle
            open={railOpen}
            onToggle={() => {
              cancelRailAutoCollapse()
              setRailOpen((current) => !current)
            }}
            label="topics"
            direction="vertical"
            className="shrink-0 max-lg:hidden"
          />
        )}
        <button type="button" className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-md px-1.5 py-1 text-start hover:bg-inset sm:min-h-0 sm:min-w-0 sm:justify-start" onClick={() => changeView('home')}><Icon icon={BookOpen} size={16} className="text-primary" /><span className="hidden font-serif text-[16px] font-semibold text-ink sm:inline">{t('Library')}</span></button>
        {/* The home state offers these same five routes as cards in the page.
            Showing them as tabs at the same time was two menus for one choice,
            so the strip appears only once a route has been picked — and then
            folded away, because the route was just chosen on the page behind it.
            It reopens from the same three lines the rest of the app uses. */}
        {onRoute && <span className="hidden h-5 w-px shrink-0 bg-line sm:block" />}
        {/* Too narrow for six tabs on a phone — the Browse topics drawer carries them there. */}
        {onRoute ? <LibraryViewTabs view={view} onViewChange={changeView} className="max-sm:hidden" /> : <span className="flex-1" />}
        <span className="flex-1 sm:hidden" />
        {view !== 'home' && <Button variant="secondary" size="sm" iconLeft={BookOpen} onClick={() => setTreeOpen(true)} className="shrink-0 lg:hidden">{t('Browse topics')}</Button>}
        {/* Authoring belongs to the console, not to one role within it. A
            student's own notes belong in the notebook, which is where they
            already are. */}
        {hasConsoleAccess(role ?? '') && <Button variant="primary" size="sm" iconLeft={Plus} onClick={() => setCreating(true)} className="shrink-0">{t('New article')}</Button>}
      </header>

      <div className="min-h-0 flex-1">
        {availability.kind !== 'ready' && !userArticles.length ? (
          <CatalogueUnavailable
            availability={availability}
            empty={{
              title: t('No articles have been published yet'),
              description: hasConsoleAccess(role ?? '')
                ? t('Articles appear here once their status is Published. Drafts and items in review stay in Library Setup.')
                : t('Your library is being written. Reviewed articles will appear here as they are published.'),
            }}
          />
        ) : view === 'home' && !selectedId ? <LibraryLanding taxonomy={taxonomy} articles={atlasArticles} onOpenView={openView} onOpenArticle={openArticle} /> : (
          <div className="flex h-full min-h-0">
            {/* Width rather than presence, so opening and closing the tree is a
                movement instead of a jump. The inner column keeps its own width
                while the outer one animates, or the tree would reflow itself
                narrower on every frame of its own collapse. */}
            <div
              inert={!railOpen}
              onMouseEnter={cancelRailAutoCollapse}
              onFocusCapture={cancelRailAutoCollapse}
              className={cn(
                'min-h-0 shrink-0 overflow-hidden transition-[width,opacity] duration-200 ease-out motion-reduce:transition-none max-lg:hidden',
                railOpen ? 'w-72 opacity-100' : 'w-0 opacity-0',
              )}
            >
              <div className="grid h-full min-h-0 w-72 grid-cols-1">
                <AtlasNavigation taxonomy={taxonomy} articles={atlasArticles} view={view === 'home' ? 'system' : view} selectedNodeId={selectedNodeId} selectedArticleId={selectedId} onNodeSelect={selectNode} onArticleSelect={openArticle} />
              </div>
            </div>
            <main className="min-w-0 flex-1 overflow-y-auto">
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
        ) : selectedPublishedArticle ? (
          <Reader
            article={selectedPublishedArticle}
            tags={personalTags[selectedId] ?? []}
            reusable={reusableTags}
            onTagsChange={(next) => setTagsFor(selectedId, next)}
            query=""
            onOpenArticle={openRelatedArticle}
            onBrowseSubject={placementRoot ? () => selectNode(placementRoot) : undefined}
            onBrowseTopic={selectedPublishedArticle.primaryNodeId ? () => selectNode(selectedPublishedArticle.primaryNodeId!) : undefined}
            cameFrom={cameFromArticle ? { title: cameFromArticle.title, onBack: goBackInTrail } : undefined}
          />
        ) : view === 'module' || view === 'year' ? (
          <div className="grid min-h-full place-items-center px-6 py-10 text-center">
            <div className="max-w-md">
              <span className="mx-auto grid size-11 place-items-center rounded-xl bg-primary-tint text-primary-strong"><Icon icon={BookOpen} size={20} /></span>
              <h1 className="mt-4 font-serif text-[22px] font-semibold text-ink">{view === 'module' ? t('Choose a module article') : t('Choose a year article')}</h1>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-3">{t('Use the library tree to open material scoped to your registered university and year.')}</p>
            </div>
          </div>
        ) : (
          <TaxonomyNodeOverview node={selectedNode} taxonomy={taxonomy} articles={atlasArticles} onOpenArticle={openArticle} onSelectNode={selectNode} />
        )}
            </main>
          </div>
        )}
      </div>

      {/* Mobile navigator */}
      {treeOpen && overlayPortal(
        <div className="fixed inset-0 z-40 lg:hidden">
          <button type="button" className="absolute inset-0 bg-ink/30 animate-fade" onClick={() => setTreeOpen(false)} aria-label={t('Close library navigation')} />
          <div className="animate-slide-x absolute inset-y-0 start-0 flex w-[min(22rem,90vw)] flex-col bg-surface shadow-pop">
            <div className="flex h-12 items-center justify-between border-b border-line px-4">
              <span className="font-serif text-[16px] font-semibold text-ink">{t('Library')}</span>
              <button type="button" onClick={() => setTreeOpen(false)} className="grid size-9 place-items-center rounded-md text-ink-3 hover:bg-inset hover:text-ink" aria-label="Close library navigation">
                <Icon icon={X} size={18} />
              </button>
            </div>
            <div className="border-b border-line px-2 py-2"><LibraryViewTabs view={view} onViewChange={(next) => { changeView(next); if (next === 'home') setTreeOpen(false) }} /></div>
            <div className="grid min-h-0 flex-1 grid-cols-1"><AtlasNavigation taxonomy={taxonomy} articles={atlasArticles} view={view === 'home' ? 'system' : view} selectedNodeId={selectedNodeId} selectedArticleId={selectedId} onNodeSelect={(nodeId) => { selectNode(nodeId); setTreeOpen(false) }} onArticleSelect={(articleId) => { openArticle(articleId); setTreeOpen(false) }} /></div>
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
