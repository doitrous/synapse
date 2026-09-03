import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, BookOpen, Copy, ExternalLink, FolderOpen, Layers, NotebookPen,
  RotateCw, Search,
} from 'lucide-react'
import { ContextMenu, type ContextMenuItem } from '@/components/ui/ContextMenu'
import { scopeItemsFor } from '@/lib/contextMenuScopes'
import { QuickAddFlashcardDialog } from '@/components/flashcards/QuickAddFlashcardDialog'
import { useT } from '@/lib/i18n'

/**
 * Right-click, anywhere in the app.
 *
 * Mounted once in the shell rather than per surface, because most of the useful
 * actions follow from *what was clicked*, not from which page is open: a
 * selected phrase can always be looked up or kept, and a row that names a
 * target can always be opened in a new tab.
 *
 * Three sources of items, in order:
 *
 *  1. The surface, through `data-context-scope` — the notebook's formatting,
 *     the whiteboard's board actions. These win, including inside a text field,
 *     because a surface that has registered a menu for its own field means it.
 *  2. What is selected, and what the clicked row identifies.
 *  3. The page itself — back, reload, copy this page's link, open search. This
 *     is the part that was missing: a right-click on anything the first two did
 *     not recognise fell through to the browser's menu, which on a single-page
 *     app offers nothing that applies.
 *
 * Real form controls and links with nothing registered over them are still left
 * to the browser. Replacing the menu on a plain input would take away
 * spellcheck, undo and paste-and-match for no gain.
 */

const NATIVE_MENU_SELECTOR = 'input, textarea, select, a[href], [contenteditable=""], [contenteditable="true"]'

/** How much of a selection to show in the menu header before eliding it. */
const HEADER_LIMIT = 42

interface Target {
  x: number
  y: number
  selection: string
  /** Set by `data-context-*` attributes on any ancestor of the click. */
  label?: string
  href?: string
  /** Contributed by the surface that owns this region, if any. */
  scoped: ContextMenuItem[]
}

function readTarget(event: MouseEvent): Target | null {
  const node = event.target as HTMLElement | null
  if (!node) return null

  const selection = (window.getSelection()?.toString() ?? '').trim()
  const scoped = scopeItemsFor(node, selection)

  // A field with nothing registered over it keeps the browser's menu.
  if (!scoped.length && node.closest(NATIVE_MENU_SELECTOR)) return null

  const holder = node.closest<HTMLElement>('[data-context-href], [data-context-label]')

  return {
    x: event.clientX,
    y: event.clientY,
    selection,
    label: holder?.dataset.contextLabel,
    href: holder?.dataset.contextHref,
    scoped,
  }
}

export function StudyContextMenu({ onOpenSearch }: { onOpenSearch: () => void }) {
  const t = useT()
  const navigate = useNavigate()
  const [target, setTarget] = useState<Target | null>(null)
  const [quickAddFront, setQuickAddFront] = useState<string | null>(null)

  useEffect(() => {
    function onContextMenu(event: MouseEvent) {
      // A modifier press is the long-standing way to ask for the real menu.
      if (event.shiftKey) return
      const next = readTarget(event)
      if (!next) return
      event.preventDefault()
      setTarget(next)
    }
    document.addEventListener('contextmenu', onContextMenu)
    return () => document.removeEventListener('contextmenu', onContextMenu)
  }, [])

  /**
   * Long press, for touch.
   *
   * A phone has no right-click. iOS fires `contextmenu` on long press but
   * Android generally does not, and neither does so while a selection is being
   * dragged — which is exactly when these actions are wanted. Holding still for
   * half a second opens the same menu; moving more than a few pixels is a scroll
   * or a selection drag, and cancels.
   */
  useEffect(() => {
    let timer: number | null = null
    let origin: { x: number; y: number } | null = null

    const cancel = () => {
      if (timer != null) window.clearTimeout(timer)
      timer = null
      origin = null
    }

    function onPointerDown(event: PointerEvent) {
      if (event.pointerType !== 'touch') return
      origin = { x: event.clientX, y: event.clientY }
      timer = window.setTimeout(() => {
        timer = null
        const next = readTarget(event as unknown as MouseEvent)
        if (next) setTarget(next)
      }, 500)
    }

    function onPointerMove(event: PointerEvent) {
      if (!origin) return
      if (Math.hypot(event.clientX - origin.x, event.clientY - origin.y) > 10) cancel()
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerup', cancel)
    document.addEventListener('pointercancel', cancel)
    return () => {
      cancel()
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerup', cancel)
      document.removeEventListener('pointercancel', cancel)
    }
  }, [])

  const close = useCallback(() => setTarget(null), [])

  const quickAddDialog = quickAddFront !== null
    ? <QuickAddFlashcardDialog initialFront={quickAddFront} onClose={() => setQuickAddFront(null)} />
    : null

  // The menu closes the instant an item is chosen, so the dialog it opens must
  // render independently of `target` (which is null by then).
  if (!target) return quickAddDialog

  const { selection, label, href, scoped } = target
  const items: ContextMenuItem[] = [...scoped]
  const contributed = items.length

  if (selection) {
    items.push({
      id: 'copy',
      label: t('Copy'),
      icon: Copy,
      separated: items.length > 0,
      onSelect: () => { void navigator.clipboard?.writeText(selection).catch(() => undefined) },
    })
    items.push({
      id: 'notebook',
      label: t('Send to notebook'),
      icon: NotebookPen,
      // The notebook reads this on mount and starts a note from it, so the
      // student lands in the note rather than in an empty page.
      onSelect: () => {
        try { sessionStorage.setItem('nishany.notebook.capture', selection) } catch { /* ignore */ }
        navigate('/app/notebook?capture=1')
      },
    })
    items.push({
      id: 'flashcard',
      label: t('Create a flashcard'),
      icon: Layers,
      // Opens a quick-capture dialog with the selection as the card front; it
      // writes straight to the flashcards collection, so this works on any screen.
      onSelect: () => setQuickAddFront(selection),
    })
    items.push({
      id: 'library',
      label: t('Search the library'),
      icon: BookOpen,
      separated: true,
      onSelect: () => navigate(`/app/library?q=${encodeURIComponent(selection)}`),
    })
    items.push({
      id: 'resources',
      label: t('Search resources'),
      icon: FolderOpen,
      onSelect: () => navigate(`/app/resources?q=${encodeURIComponent(selection)}`),
    })
  }

  if (href) {
    items.push({
      id: 'open',
      label: t('Open'),
      icon: Search,
      separated: items.length > 0,
      onSelect: () => navigate(href),
    })
    items.push({
      id: 'open-new',
      label: t('Open in new tab'),
      icon: ExternalLink,
      onSelect: () => window.open(href, '_blank', 'noopener,noreferrer'),
    })
  }

  // Always last, and always there. A menu that can appear with nothing in it is
  // the same as no menu, and the student has no way to know which it will be
  // before they press. These four apply on every screen.
  const surfaceOffered = items.length > contributed || contributed > 0
  items.push({
    id: 'search',
    label: t('Search everything'),
    icon: Search,
    separated: surfaceOffered,
    onSelect: onOpenSearch,
  })
  items.push({
    id: 'back',
    label: t('Back'),
    icon: ArrowLeft,
    onSelect: () => navigate(-1),
  })
  items.push({
    id: 'reload',
    label: t('Reload this page'),
    icon: RotateCw,
    onSelect: () => window.location.reload(),
  })

  const header = selection
    ? (selection.length > HEADER_LIMIT ? `${selection.slice(0, HEADER_LIMIT)}…` : selection)
    : label

  return (
    <>
      <ContextMenu x={target.x} y={target.y} items={items} onClose={close} header={header} />
      {quickAddDialog}
    </>
  )
}
