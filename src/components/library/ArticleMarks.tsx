import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Highlighter, MessageSquareText, StickyNote, Trash2, X } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Popover } from '@/components/ui/Popover'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Field'
import { usePersistentState } from '@/lib/usePersistentState'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import type { NoteTone } from '@/lib/reader/annotations'
import { makeAnchor, resolveAnchor, type TextRange } from '@/lib/library/textAnchor'
import {
  LIBRARY_MARKS_STORAGE_KEY, MARK_TONES, marksFor, newMarkId, removeMark, upsertMark,
  type LibraryMark, type LibraryMarkStore,
} from '@/data/libraryMarks'

/**
 * The student's own marks on an article: highlights, and notes pinned to a phrase.
 *
 * **On what a mark is attached to.** The anchor is resolved against the block's
 * stored source text, while the selection a browser hands back is the *rendered*
 * text — and the two differ wherever inline markup was used, because `**bold**`
 * renders as three fewer characters than it is stored as. A selection lying
 * inside one run of plain prose, which is nearly all of them, resolves exactly.
 * A selection dragged across a markup boundary will not be found, and is
 * reported as orphaned rather than placed somewhere approximate — a mark in the
 * wrong place is worse than a mark the student is told about.
 */

/** Text tint per tone. Bordered underneath rather than boxed, so prose still reads as prose. */
const MARK_CLASS: Record<NoteTone, string> = {
  paper: 'bg-inset decoration-line-2',
  teal: 'bg-[color-mix(in_srgb,#2f7d6b_22%,var(--color-surface))] decoration-[#2f7d6b]',
  amber: 'bg-[color-mix(in_srgb,#c2691c_22%,var(--color-surface))] decoration-[#c2691c]',
  rose: 'bg-[color-mix(in_srgb,#b03a76_20%,var(--color-surface))] decoration-[#b03a76]',
  sage: 'bg-[color-mix(in_srgb,#4f8f3a_21%,var(--color-surface))] decoration-[#4f8f3a]',
  slate: 'bg-[color-mix(in_srgb,#5b6570_21%,var(--color-surface))] decoration-[#5b6570]',
  sand: 'bg-[color-mix(in_srgb,#8a6d3b_21%,var(--color-surface))] decoration-[#8a6d3b]',
  clay: 'bg-primary-tint decoration-primary',
}

const TONE_SWATCH: Record<NoteTone, string> = {
  paper: 'bg-surface-2', teal: 'bg-[#2f7d6b]', amber: 'bg-[#c2691c]', rose: 'bg-[#b03a76]',
  sage: 'bg-[#4f8f3a]', slate: 'bg-[#5b6570]', sand: 'bg-[#8a6d3b]', clay: 'bg-primary',
}

const TONE_LABEL: Record<NoteTone, string> = {
  paper: 'Paper', teal: 'Teal', amber: 'Amber', rose: 'Rose',
  sage: 'Sage', slate: 'Slate', sand: 'Sand', clay: 'Clay',
}

export interface ArticleMarks {
  all: LibraryMark[]
  /** Marks on one block, with where they resolve to in its text now. */
  placed: (blockId: string, text: string) => { mark: LibraryMark; range: TextRange }[]
  /** Marks whose words are no longer anywhere in the article. */
  orphans: LibraryMark[]
  create: (blockId: string, text: string, range: TextRange, tone: NoteTone, note?: string) => LibraryMark | null
  update: (mark: LibraryMark) => void
  discard: (markId: string) => void
}

/**
 * Read and write the marks on one article.
 *
 * `blockTexts` is every block the reader will render, so orphan detection can
 * ask "is this phrase anywhere in the article" rather than only "is it in the
 * block it was made in" — a mark should not be called lost because an editor
 * moved the sentence it sits on into the paragraph above.
 */
export function useArticleMarks(articleId: string, blockTexts: Record<string, string>): ArticleMarks {
  const [store, setStore] = usePersistentState<LibraryMarkStore>(LIBRARY_MARKS_STORAGE_KEY, {})
  const all = useMemo(() => marksFor(store, articleId), [store, articleId])

  const placed = useCallback((blockId: string, text: string) => {
    const found: { mark: LibraryMark; range: TextRange }[] = []
    for (const mark of all) {
      if (mark.anchor.block !== blockId) continue
      const range = resolveAnchor(text, mark.anchor)
      if (range) found.push({ mark, range })
    }
    return found
  }, [all])

  const orphans = useMemo(() => all.filter((mark) => {
    const own = blockTexts[mark.anchor.block]
    if (own && resolveAnchor(own, mark.anchor)) return false
    // Its own block no longer holds it. Before calling it lost, look everywhere.
    return !Object.values(blockTexts).some((text) => resolveAnchor(text, mark.anchor))
  }), [all, blockTexts])

  const create = useCallback((blockId: string, text: string, range: TextRange, tone: NoteTone, note = '') => {
    const anchor = makeAnchor(blockId, text, range.start, range.end)
    if (!anchor) return null
    const mark: LibraryMark = {
      id: newMarkId(), articleId, anchor, tone, note, createdAt: new Date().toISOString(),
    }
    setStore((current) => upsertMark(current, mark))
    return mark
  }, [articleId, setStore])

  const update = useCallback((mark: LibraryMark) => setStore((current) => upsertMark(current, mark)), [setStore])
  const discard = useCallback((markId: string) => setStore((current) => removeMark(current, articleId, markId)), [articleId, setStore])

  return { all, placed, orphans, create, update, discard }
}

/** A selection the student has made inside a markable block. */
interface PendingSelection {
  blockId: string
  text: string
  range: TextRange
  anchorRect: DOMRect
}

/**
 * Which block a DOM node sits in, and how far into it the offset is.
 *
 * The offset is measured over rendered text, which is why it is used only to
 * choose between repeats of the same phrase rather than as the anchor itself.
 */
function blockOf(node: Node | null): HTMLElement | null {
  let current: Node | null = node
  while (current) {
    if (current instanceof HTMLElement && current.dataset.markBlock) return current
    current = current.parentNode
  }
  return null
}

/** Characters of rendered text before `offset` inside `node`, within `block`. */
function renderedOffset(block: HTMLElement, node: Node, offset: number): number {
  const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT)
  let total = 0
  let text = walker.nextNode()
  while (text) {
    if (text === node) return total + offset
    total += text.textContent?.length ?? 0
    text = walker.nextNode()
  }
  return total
}

/**
 * Turn the browser's selection into a range in the block's stored text.
 *
 * The selected string is looked for in the source; when it occurs more than
 * once, the occurrence nearest the place it was actually dragged wins. Null
 * when the words are not in the source at all, which is the markup case
 * described at the top of this file.
 */
function selectionRange(selection: Selection): PendingSelection | null {
  if (selection.isCollapsed || selection.rangeCount === 0) return null
  const range = selection.getRangeAt(0)
  const block = blockOf(range.startContainer)
  if (!block || block !== blockOf(range.endContainer)) return null

  const source = block.dataset.markText ?? ''
  const selected = selection.toString()
  const trimmed = selected.trim()
  if (!trimmed || !source) return null

  const domStart = renderedOffset(block, range.startContainer, range.startOffset)
    + selected.indexOf(trimmed)

  let best = -1
  let bestDistance = Number.POSITIVE_INFINITY
  let at = source.indexOf(trimmed)
  while (at !== -1) {
    const distance = Math.abs(at - domStart)
    if (distance < bestDistance) { bestDistance = distance; best = at }
    at = source.indexOf(trimmed, at + 1)
  }
  if (best === -1) return null

  return {
    blockId: block.dataset.markBlock!,
    text: source,
    range: { start: best, end: best + trimmed.length },
    anchorRect: range.getBoundingClientRect(),
  }
}

/** A zero-size element at a rect, so `Popover` can anchor to a text selection. */
function useRectAnchor(rect: DOMRect | null): HTMLElement | null {
  const [element, setElement] = useState<HTMLElement | null>(null)
  useEffect(() => {
    if (!rect) {
      setElement((current) => { current?.remove(); return null })
      return
    }
    const node = document.createElement('span')
    node.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;pointer-events:none;`
    document.body.appendChild(node)
    setElement(node)
    return () => node.remove()
  }, [rect])
  return element
}

/**
 * The toolbar that appears over a selection.
 *
 * Watches for selections inside `container`. A press on a tone highlights; a
 * press on the note button highlights and opens the note straight away, because
 * "I want to say something about this" is one intention, not two.
 */
export function MarkSelectionToolbar({
  container,
  marks,
  onNoteCreated,
}: {
  container: React.RefObject<HTMLElement | null>
  marks: ArticleMarks
  onNoteCreated: (mark: LibraryMark) => void
}) {
  const t = useT()
  const [pending, setPending] = useState<PendingSelection | null>(null)
  const anchor = useRectAnchor(pending?.anchorRect ?? null)

  useEffect(() => {
    const read = () => {
      const selection = window.getSelection()
      if (!selection || selection.isCollapsed) { setPending(null); return }
      const host = container.current
      if (!host || !host.contains(selection.anchorNode)) { setPending(null); return }
      setPending(selectionRange(selection))
    }
    // `mouseup` and `keyup` rather than `selectionchange`: the latter fires on
    // every pixel of a drag, so the toolbar would chase the cursor.
    document.addEventListener('mouseup', read)
    document.addEventListener('keyup', read)
    return () => {
      document.removeEventListener('mouseup', read)
      document.removeEventListener('keyup', read)
    }
  }, [container])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setPending(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  if (!pending || !anchor) return null

  const commit = (tone: NoteTone, openNote: boolean) => {
    const mark = marks.create(pending.blockId, pending.text, pending.range, tone)
    setPending(null)
    window.getSelection()?.removeAllRanges()
    if (mark && openNote) onNoteCreated(mark)
  }

  return (
    <Popover anchor={anchor} onClose={() => setPending(null)} placement="top-start" label={t('Mark this passage')} className="p-1.5">
      <div className="flex items-center gap-1">
        <span className="ps-1 pe-0.5 text-ink-3"><Icon icon={Highlighter} size={14} /></span>
        {MARK_TONES.map((tone) => (
          <button
            key={tone}
            type="button"
            onClick={() => commit(tone, false)}
            aria-label={`${t('Highlight')} — ${t(TONE_LABEL[tone])}`}
            title={t(TONE_LABEL[tone])}
            className={cn('size-6 rounded-full border border-line-2 transition-transform hover:scale-110', TONE_SWATCH[tone])}
          />
        ))}
        <span className="mx-1 h-5 w-px bg-line" />
        <button
          type="button"
          onClick={() => commit('amber', true)}
          className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-[12px] font-medium text-ink-2 transition-colors hover:bg-inset hover:text-ink"
        >
          <Icon icon={StickyNote} size={14} />
          {t('Add note')}
        </button>
      </div>
    </Popover>
  )
}

/** Reading, writing and removing one mark's note. */
export function MarkNotePopover({
  mark,
  anchor,
  marks,
  onClose,
}: {
  mark: LibraryMark
  anchor: HTMLElement | null
  marks: ArticleMarks
  onClose: () => void
}) {
  const t = useT()
  const [draft, setDraft] = useState(mark.note)
  const latest = useRef(draft)
  latest.current = draft

  // Written on the way out rather than per keystroke: this is a stored document
  // shared with every other surface, and a note is usually a sentence.
  useEffect(() => () => {
    if (latest.current !== mark.note) marks.update({ ...mark, note: latest.current })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!anchor) return null

  return (
    <Popover anchor={anchor} onClose={onClose} placement="bottom-start" label={t('Your note')} className="w-[min(22rem,90vw)] p-3">
      <p className="border-s-2 border-primary-line ps-2.5 text-[12px] italic leading-relaxed text-ink-3">
        “{mark.anchor.exact}”
      </p>
      <Textarea
        autoFocus
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder={t('What did you want to remember about this?')}
        className="mt-2.5 min-h-24 text-[13px]"
        aria-label={t('Your note')}
      />
      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        {MARK_TONES.map((tone) => (
          <button
            key={tone}
            type="button"
            onClick={() => marks.update({ ...mark, tone })}
            aria-label={t(TONE_LABEL[tone])}
            title={t(TONE_LABEL[tone])}
            aria-pressed={mark.tone === tone}
            className={cn(
              'size-5 rounded-full border transition-transform hover:scale-110',
              TONE_SWATCH[tone],
              mark.tone === tone ? 'border-ink' : 'border-line-2',
            )}
          />
        ))}
        <span className="ms-auto flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            iconLeft={Trash2}
            className="hover:text-danger"
            onClick={() => { marks.discard(mark.id); onClose() }}
          >
            {t('Remove')}
          </Button>
          <Button size="sm" variant="secondary" onClick={onClose}>{t('Done')}</Button>
        </span>
      </div>
    </Popover>
  )
}

/** One marked phrase inside the prose. */
export function MarkedPhrase({
  mark,
  children,
  onOpen,
}: {
  mark: LibraryMark
  children: React.ReactNode
  onOpen: (mark: LibraryMark, anchor: HTMLElement) => void
}) {
  const t = useT()
  const hasNote = Boolean(mark.note.trim())
  return (
    <button
      type="button"
      onClick={(event) => onOpen(mark, event.currentTarget)}
      title={hasNote ? mark.note : t('Your highlight')}
      aria-label={`${hasNote ? t('Your note') : t('Your highlight')}: ${mark.anchor.exact}`}
      className={cn(
        'mx-px inline rounded-sm px-0.5 text-start underline decoration-2 underline-offset-[3px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        MARK_CLASS[mark.tone],
      )}
    >
      {children}
      {hasNote && <Icon icon={MessageSquareText} size={12} className="ms-1 inline align-baseline text-ink-3" />}
    </button>
  )
}

/**
 * Every mark on this article, in one list.
 *
 * A highlight halfway down a long article is easy to lose, and a note is worth
 * nothing if it cannot be found again. Orphans are listed apart, with the words
 * they were made on, so an edit upstream costs the student a location rather
 * than their work.
 */
export function YourMarksPanel({
  marks,
  onSelect,
  onOpenNote,
}: {
  marks: ArticleMarks
  onSelect: (mark: LibraryMark) => void
  onOpenNote: (mark: LibraryMark, anchor: HTMLElement) => void
}) {
  const t = useT()
  if (!marks.all.length) return null
  const orphanIds = new Set(marks.orphans.map((mark) => mark.id))
  const live = marks.all.filter((mark) => !orphanIds.has(mark.id))

  return (
    <section className="overflow-hidden rounded-xl border border-line bg-surface shadow-panel">
      <div className="border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <Icon icon={Highlighter} size={15} className="text-primary" />
          <h2 className="text-[13px] font-semibold text-ink">{t('Your marks')}</h2>
        </div>
        <p className="mt-0.5 font-mono text-[10.5px] text-ink-3">
          {marks.all.length} {marks.all.length === 1 ? t('mark') : t('marks')}
        </p>
      </div>
      <ul className="divide-y divide-line">
        {live.map((mark) => (
          <li key={mark.id}>
            <button
              type="button"
              onClick={() => onSelect(mark)}
              className="group flex w-full items-start gap-2.5 px-4 py-3 text-start transition-colors hover:bg-inset/60"
            >
              <span className={cn('mt-1 size-2.5 shrink-0 rounded-full', TONE_SWATCH[mark.tone])} />
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] leading-snug text-ink-2 group-hover:text-ink">“{mark.anchor.exact}”</span>
                {mark.note.trim() && (
                  <span className="mt-1 flex items-start gap-1.5 text-[11.5px] leading-relaxed text-ink-3">
                    <Icon icon={MessageSquareText} size={12} className="mt-0.5 shrink-0" />
                    <span className="min-w-0 flex-1">{mark.note}</span>
                  </span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {marks.orphans.length > 0 && (
        <div className="border-t border-line bg-warning-tint/40 px-4 py-3">
          <p className="text-[11.5px] font-semibold text-ink-2">
            {marks.orphans.length === 1
              ? t('One mark no longer matches the article')
              : `${marks.orphans.length} ${t('marks no longer match the article')}`}
          </p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-ink-3">
            {t('The words they were made on have been edited or removed. They are kept here so nothing you wrote is lost.')}
          </p>
          <ul className="mt-2 space-y-2">
            {marks.orphans.map((mark) => (
              <li key={mark.id} className="flex items-start gap-2">
                <span className="min-w-0 flex-1">
                  <span className="block text-[11.5px] italic leading-snug text-ink-3">“{mark.anchor.exact}”</span>
                  {mark.note.trim() && <span className="mt-0.5 block text-[11.5px] text-ink-2">{mark.note}</span>}
                </span>
                <button
                  type="button"
                  onClick={(event) => onOpenNote(mark, event.currentTarget)}
                  aria-label={t('Your note')}
                  className="shrink-0 rounded p-1 text-ink-3 hover:bg-inset hover:text-ink"
                >
                  <Icon icon={StickyNote} size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => marks.discard(mark.id)}
                  aria-label={t('Remove')}
                  className="shrink-0 rounded p-1 text-ink-3 hover:bg-inset hover:text-danger"
                >
                  <Icon icon={X} size={13} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
