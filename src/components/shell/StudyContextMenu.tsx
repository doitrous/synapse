import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Copy, ExternalLink, FolderOpen, ListChecks, NotebookPen, Search } from 'lucide-react'
import { ContextMenu, type ContextMenuItem } from '@/components/ui/ContextMenu'
import { useT } from '@/lib/i18n'

/**
 * Right-click, anywhere in the student app.
 *
 * Mounted once in the shell rather than per surface, because the useful actions
 * follow from *what was clicked*, not from which page is open: a selected
 * phrase can always be looked up or kept, and a row that names a target can
 * always be opened in a new tab.
 *
 * Real form controls and links are deliberately left to the browser. Replacing
 * the menu on a text input would take away spellcheck, undo and paste-and-match
 * for no gain, and "Open link in new tab" already exists on an anchor.
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
}

function readTarget(event: MouseEvent): Target | null {
  const node = event.target as HTMLElement | null
  if (!node) return null
  if (node.closest(NATIVE_MENU_SELECTOR)) return null

  const selection = (window.getSelection()?.toString() ?? '').trim()
  const holder = node.closest<HTMLElement>('[data-context-href], [data-context-label]')

  // Nothing selected and nothing identifiable: the browser's menu is more
  // useful than an empty one of ours.
  if (!selection && !holder) return null

  return {
    x: event.clientX,
    y: event.clientY,
    selection,
    label: holder?.dataset.contextLabel,
    href: holder?.dataset.contextHref,
  }
}

export function StudyContextMenu() {
  const t = useT()
  const navigate = useNavigate()
  const [target, setTarget] = useState<Target | null>(null)

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

  if (!target) return null

  const { selection, label, href } = target
  const items: ContextMenuItem[] = []

  if (selection) {
    items.push({
      id: 'copy',
      label: t('Copy'),
      icon: Copy,
      onSelect: () => { void navigator.clipboard?.writeText(selection).catch(() => undefined) },
    })
    items.push({
      id: 'notebook',
      label: t('Send to notebook'),
      icon: NotebookPen,
      // The notebook reads this on mount and starts a note from it, so the
      // student lands in the note rather than in an empty page.
      onSelect: () => {
        try { sessionStorage.setItem('synapse.notebook.capture', selection) } catch { /* ignore */ }
        navigate('/app/notebook?capture=1')
      },
    })
    items.push({
      id: 'library',
      label: t('Search the library'),
      icon: BookOpen,
      separated: true,
      onSelect: () => navigate(`/app/library?q=${encodeURIComponent(selection)}`),
    })
    items.push({
      id: 'qbank',
      label: t('Find questions on this'),
      icon: ListChecks,
      onSelect: () => navigate(`/app/qbank?q=${encodeURIComponent(selection)}`),
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

  if (!items.length) return null

  const header = selection
    ? (selection.length > HEADER_LIMIT ? `${selection.slice(0, HEADER_LIMIT)}…` : selection)
    : label

  return <ContextMenu x={target.x} y={target.y} items={items} onClose={close} header={header} />
}
