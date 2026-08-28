import { useCallback, useEffect, useMemo, useState, type ReactNode, type RefObject } from 'react'
import { Highlighter, Sparkles } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Popover } from '@/components/ui/Popover'
import { QuickAddFlashcardDialog } from '@/components/flashcards/QuickAddFlashcardDialog'
import { usePersistentState } from '@/lib/usePersistentState'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { ConceptText } from '@/components/concepts/ConceptText'
import { makeAnchor, orderedSegments, resolveAnchor, type TextRange } from '@/lib/library/textAnchor'
import {
  QUESTION_HIGHLIGHTS_STORAGE_KEY, highlightsFor, newHighlightId, removeHighlight, upsertHighlight,
  type QuestionHighlight, type QuestionHighlightStore,
} from '@/data/questionHighlights'

/**
 * A student's highlights on one question while solving it — the qbank
 * equivalent of `useArticleMarks`, trimmed to the one thing this surface
 * needs. There is no note and no tone choice, so there is nothing here for an
 * "orphan" (a mark whose words have gone) to mean: a question's text does not
 * change under a student mid-session the way an article can be re-edited.
 */
export interface QuestionHighlights {
  all: QuestionHighlight[]
  /** Highlights on one block, with where they resolve to in its text now. */
  placed: (blockId: string, text: string) => { highlight: QuestionHighlight; range: TextRange }[]
  create: (blockId: string, text: string, range: TextRange) => QuestionHighlight | null
  discard: (highlightId: string) => void
}

export function useQuestionHighlights(questionId: string): QuestionHighlights {
  const [store, setStore] = usePersistentState<QuestionHighlightStore>(QUESTION_HIGHLIGHTS_STORAGE_KEY, {})
  const all = useMemo(() => highlightsFor(store, questionId), [store, questionId])

  const placed = useCallback((blockId: string, text: string) => {
    const found: { highlight: QuestionHighlight; range: TextRange }[] = []
    for (const highlight of all) {
      if (highlight.anchor.block !== blockId) continue
      const range = resolveAnchor(text, highlight.anchor)
      if (range) found.push({ highlight, range })
    }
    return found
  }, [all])

  const create = useCallback((blockId: string, text: string, range: TextRange) => {
    const anchor = makeAnchor(blockId, text, range.start, range.end)
    if (!anchor) return null
    const highlight: QuestionHighlight = {
      id: newHighlightId(), questionId, anchor, createdAt: new Date().toISOString(),
    }
    setStore((current) => upsertHighlight(current, highlight))
    return highlight
  }, [questionId, setStore])

  const discard = useCallback(
    (highlightId: string) => setStore((current) => removeHighlight(current, questionId, highlightId)),
    [questionId, setStore],
  )

  return { all, placed, create, discard }
}

/* ---------------------------------------------------------------------------
 * Selection capture. Copied from `ArticleMarks.tsx` rather than imported from
 * it: that file's functions are private to its own toolbar, and duplicating a
 * hundred lines here is cheaper than making them part of its public surface
 * for a second, unrelated caller to depend on. See that file for why a
 * selection is resolved by looking its words up in the block's source text
 * instead of trusting the browser's offsets — the same reasoning applies here
 * verbatim (`ConceptText` and `RichText` both render markup differently than
 * it is stored, exactly like the library's inline emphasis does).
 * ------------------------------------------------------------------------- */

interface PendingSelection {
  blockId: string
  text: string
  range: TextRange
  anchorRect: DOMRect
}

function blockOf(node: Node | null): HTMLElement | null {
  let current: Node | null = node
  while (current) {
    if (current instanceof HTMLElement && current.dataset.hlBlock) return current
    current = current.parentNode
  }
  return null
}

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

function selectionRange(selection: Selection): PendingSelection | null {
  if (selection.isCollapsed || selection.rangeCount === 0) return null
  const range = selection.getRangeAt(0)
  const block = blockOf(range.startContainer)
  if (!block || block !== blockOf(range.endContainer)) return null

  const source = block.dataset.hlText ?? ''
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
    blockId: block.dataset.hlBlock!,
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
 * One small "Highlight" prompt over a selection inside `container` — the
 * whole of the interaction. No colour choice and no note, unlike the
 * library's toolbar: this is meant to be unobtrusive enough to never get in
 * the way of answering a question.
 */
export function HighlightSelectionPopover({
  container,
  highlights,
}: {
  container: RefObject<HTMLElement | null>
  highlights: QuestionHighlights
}) {
  const t = useT()
  const [pending, setPending] = useState<PendingSelection | null>(null)
  const [cardFront, setCardFront] = useState<string | null>(null)
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
    // every pixel of a drag, so the prompt would chase the cursor.
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

  // The dialog outlives the popover (which closes the moment an action is taken),
  // so it renders independently of `pending`.
  const cardDialog = cardFront !== null
    ? <QuickAddFlashcardDialog initialFront={cardFront} onClose={() => setCardFront(null)} />
    : null

  if (!pending || !anchor) return cardDialog

  const commit = () => {
    highlights.create(pending.blockId, pending.text, pending.range)
    setPending(null)
    window.getSelection()?.removeAllRanges()
  }

  const makeCard = () => {
    setCardFront(pending.text.slice(pending.range.start, pending.range.end))
    setPending(null)
    window.getSelection()?.removeAllRanges()
  }

  return (
    <>
      <Popover anchor={anchor} onClose={() => setPending(null)} placement="top-start" label={t('Selection actions')} className="p-1">
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={commit}
            className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-[12px] font-medium text-ink-2 transition-colors hover:bg-inset hover:text-ink"
          >
            <Icon icon={Highlighter} size={14} />
            {t('Highlight')}
          </button>
          <button
            type="button"
            onClick={makeCard}
            className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-[12px] font-medium text-ink-2 transition-colors hover:bg-inset hover:text-ink"
          >
            <Icon icon={Sparkles} size={14} />
            {t('Make card')}
          </button>
        </div>
      </Popover>
      {cardDialog}
    </>
  )
}

/** Text tint for a highlight — one colour, consistent everywhere it appears. */
const HIGHLIGHT_CLASS = 'bg-[color-mix(in_srgb,#c2691c_22%,var(--color-surface))] decoration-[#c2691c]'

/**
 * One highlighted phrase. There is nothing to open here — clicking it is the
 * whole interaction, and it removes the highlight. `stopPropagation` matters:
 * an option's text sits inside the button that answers it, and a click meant
 * to erase a highlight must never also count as choosing that option.
 */
function HighlightedPhrase({
  highlight,
  onRemove,
  children,
}: {
  highlight: QuestionHighlight
  onRemove: (highlightId: string) => void
  children: ReactNode
}) {
  const t = useT()
  return (
    <span
      onClick={(event) => { event.stopPropagation(); onRemove(highlight.id) }}
      title={t('Click to remove this highlight')}
      aria-label={t('Remove highlight')}
      className={cn(
        'mx-px cursor-pointer rounded-sm px-0.5 underline decoration-2 underline-offset-[3px] transition-colors',
        HIGHLIGHT_CLASS,
      )}
    >
      {children}
    </span>
  )
}

/**
 * Text that can carry the student's highlights, still rendered through
 * `ConceptText` for concept linking. A highlighted range and the rest of the
 * block are non-overlapping, ordered segments — the same rule the library's
 * marked prose uses — each passed through `ConceptText` on its own, so concept
 * matching still runs on every word; it makes no difference which segment a
 * matched term happens to fall in.
 */
export function HighlightableText({
  text,
  enabled,
  blockId,
  highlights,
}: {
  text: string
  enabled: boolean
  blockId: string
  highlights: QuestionHighlights
}) {
  const hits = highlights.placed(blockId, text)

  const body = (() => {
    if (!hits.length) return <ConceptText text={text} enabled={enabled} />

    const segments = orderedSegments(hits.map(({ highlight, range }) => ({
      start: range.start, end: range.end, value: { highlight, range },
    })))

    const parts: ReactNode[] = []
    let cursor = 0
    segments.forEach((segment, index) => {
      if (segment.start > cursor) {
        parts.push(<ConceptText key={`t-${index}`} text={text.slice(cursor, segment.start)} enabled={enabled} />)
      }
      parts.push(
        <HighlightedPhrase key={`h-${segment.value.highlight.id}`} highlight={segment.value.highlight} onRemove={highlights.discard}>
          <ConceptText text={text.slice(segment.start, segment.end)} enabled={enabled} />
        </HighlightedPhrase>,
      )
      cursor = segment.end
    })
    if (cursor < text.length) parts.push(<ConceptText key="t-last" text={text.slice(cursor)} enabled={enabled} />)
    return <>{parts}</>
  })()

  return <span data-hl-block={blockId} data-hl-text={text}>{body}</span>
}
