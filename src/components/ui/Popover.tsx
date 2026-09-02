import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { placeAtAnchor, placeAtPoint, type Placement } from '@/lib/popoverPosition'
import { isTopOverlay, popOverlay, pushOverlay } from '@/lib/overlayStack'
import { focusFirstWithin, wrapTab } from '@/lib/focusTrap'
import { cn } from '@/lib/cn'

/**
 * A floating surface attached to a trigger, or to a pointer.
 *
 * Rendered in a portal so it is never clipped by a panel's overflow, measured
 * after mount so it can flip rather than run off the viewport, and dismissed by
 * Escape, an outside press, or the window losing focus. The arithmetic lives in
 * `@/lib/popoverPosition` where it can be tested without a browser.
 *
 * An anchored surface follows its trigger when the page scrolls or resizes; a
 * pointer surface closes instead, because a menu that chases the scroll has
 * lost the thing it was opened on.
 *
 * The anchor is passed as an element rather than a ref object so that a render
 * which changes the trigger re-measures — a ref would mutate silently.
 *
 * Keyboard, from the same helpers `Dialog` uses: opening moves focus into the
 * surface, Tab wraps inside it, and closing hands focus back to whatever had it.
 * Focus is claimed only when the trigger itself held it — which is always true
 * of keyboard activation, and deliberately false for a toolbar menu that keeps
 * focus in an editor, or a surface anchored to a text selection. A combobox
 * `listbox` never claims: it is driven from its field. `autoFocus` forces the
 * question either way; `focusKey` re-runs it for a surface that swaps views.
 */
export function Popover({
  anchor,
  point,
  onClose,
  placement = 'bottom-start',
  gap = 6,
  margin = 8,
  matchAnchorWidth = false,
  role = 'dialog',
  label,
  autoFocus,
  focusKey,
  className,
  children,
}: {
  anchor?: HTMLElement | null
  point?: { x: number; y: number }
  onClose: () => void
  placement?: Placement
  gap?: number
  margin?: number
  /** For select-like surfaces that should never be narrower than their field. */
  matchAnchorWidth?: boolean
  role?: 'dialog' | 'menu' | 'listbox'
  label?: string
  /** Defaults to true for `dialog`/`menu`, false for a combobox `listbox`. */
  autoFocus?: boolean
  /** Changing this re-runs the initial focus, for a surface that swaps views. */
  focusKey?: string | number
  className?: string
  children: ReactNode
}) {
  const id = useId()
  const surfaceRef = useRef<HTMLDivElement>(null)
  // Whether this surface has taken focus — see the focus effect below.
  const focusClaimed = useRef(false)
  const [position, setPosition] = useState({ left: 0, top: 0, ready: false })
  const [minWidth, setMinWidth] = useState<number>()
  const pointX = point?.x
  const pointY = point?.y
  // A combobox drives its list from the field; everything else is a surface the
  // keyboard is meant to enter.
  const shouldFocus = autoFocus ?? role !== 'listbox'

  const reposition = useCallback(() => {
    const surface = surfaceRef.current
    if (!surface) return
    const viewport = { width: window.innerWidth, height: window.innerHeight }
    const size = { width: surface.offsetWidth, height: surface.offsetHeight }

    if (pointX !== undefined && pointY !== undefined) {
      const placed = placeAtPoint({ x: pointX, y: pointY }, size, viewport, margin)
      setPosition({ ...placed, ready: true })
      return
    }
    if (!anchor) return
    const rect = anchor.getBoundingClientRect()
    if (matchAnchorWidth) setMinWidth(rect.width)
    const placed = placeAtAnchor(rect, size, viewport, {
      placement,
      gap,
      margin,
      rtl: document.documentElement.dir === 'rtl',
    })
    setPosition({ left: placed.left, top: placed.top, ready: true })
  }, [anchor, pointX, pointY, placement, gap, margin, matchAnchorWidth])

  useLayoutEffect(reposition, [reposition])

  // Content that grows — a month grid gaining a sixth row, a list filtering
  // down — has to be re-placed, or a surface that flipped upward drifts.
  useEffect(() => {
    const surface = surfaceRef.current
    if (!surface || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => reposition())
    observer.observe(surface)
    return () => observer.disconnect()
  }, [reposition])

  useEffect(() => {
    // Above whatever opened it, so Escape reaches this and stops here.
    pushOverlay(id, 'popover')
    const anchored = pointX === undefined
    let frame = 0
    const onViewportChange = () => {
      if (!anchored) { onClose(); return }
      if (frame) return
      frame = requestAnimationFrame(() => { frame = 0; reposition() })
    }
    // Capture-phase, so a press anywhere dismisses before it does anything
    // else — but a press *inside* has to be allowed to become a click, and
    // stopPropagation on the surface cannot help during capture.
    const closeIfOutside = (event: Event) => {
      const target = event.target as Node
      if (surfaceRef.current?.contains(target)) return
      if (anchor?.contains(target)) return
      onClose()
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (!isTopOverlay(id)) return
        event.preventDefault()
        event.stopPropagation()
        onClose()
        return
      }
      // Trap Tab only once focus is genuinely inside the surface. A combobox
      // keeps focus in its field while its list is open, and Tab from there
      // has to go on to the next field rather than fall into the list.
      const surface = surfaceRef.current
      if (!surface?.contains(document.activeElement)) return
      wrapTab(event, surface)
    }
    document.addEventListener('pointerdown', closeIfOutside, true)
    document.addEventListener('keydown', onKey, true)
    // `scroll` in the capture phase so scrolling inside a panel counts too.
    window.addEventListener('scroll', onViewportChange, true)
    window.addEventListener('resize', onViewportChange)
    window.addEventListener('blur', onClose)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      popOverlay(id)
      document.removeEventListener('pointerdown', closeIfOutside, true)
      document.removeEventListener('keydown', onKey, true)
      window.removeEventListener('scroll', onViewportChange, true)
      window.removeEventListener('resize', onViewportChange)
      window.removeEventListener('blur', onClose)
    }
  }, [anchor, id, onClose, pointX, reposition])

  // Split from the focus-in effect below so a `focusKey` change can move focus
  // within the surface without handing it back to the trigger on the way.
  useEffect(() => {
    const surface = surfaceRef.current
    const previous = document.activeElement as HTMLElement | null
    return () => {
      // Only take focus back if it is still ours to give. If the reader has
      // moved on — clicked a field behind, followed a link — yanking focus to
      // the trigger would undo a deliberate choice. A removed node leaves focus
      // on `body`, which is the ordinary case on close.
      const active = document.activeElement
      if (active === document.body || active === null || surface?.contains(active)) previous?.focus?.()
    }
  }, [])

  useEffect(() => {
    // Not before the surface has been placed: until then it is painted
    // `invisible`, and `focus()` on a `visibility: hidden` element is a no-op
    // that would leave the reader on the trigger with the menu open.
    if (!position.ready) return
    const surface = surfaceRef.current
    const active = document.activeElement
    // Take focus on open only if the trigger held it. A formatting menu whose
    // trigger deliberately keeps focus in the editor (`onMouseDown` +
    // `preventDefault`) must leave it there, or the live selection — and with
    // it `execCommand` — is lost. Keyboard activation always focuses the
    // trigger, so the keyboard path always claims. `contains` rather than
    // equality: a trigger that needs a badge on its corner is wrapped in a
    // positioning span, and it is the span that anchors.
    const fromTrigger = active != null && (anchor?.contains(active) ?? false)
    // Once claimed, the surface keeps focus across a view swap, so a sub-view
    // cannot drop the reader on `<body>` when its rows unmount. The trigger
    // counts as ours too: StrictMode's simulated remount runs the restore
    // below and hands focus back there between the two mounts.
    const held = active === document.body || active === null || (surface?.contains(active) ?? false)
    if (!(focusClaimed.current ? held || fromTrigger : shouldFocus && fromTrigger)) return
    focusClaimed.current = true
    focusFirstWithin(surface)
  }, [anchor, shouldFocus, focusKey, position.ready])

  return createPortal(
    <div
      ref={surfaceRef}
      role={role}
      aria-label={label}
      tabIndex={-1}
      onContextMenu={(event) => event.preventDefault()}
      style={{ left: position.left, top: position.top, minWidth }}
      className={cn(
        'fixed z-[80] overflow-hidden rounded-xl border border-line bg-surface shadow-pop focus:outline-none',
        position.ready ? 'animate-pop' : 'invisible',
        className,
      )}
    >
      {children}
    </div>,
    document.body,
  )
}

/**
 * The trigger half of the pattern: an element handle plus the open flag.
 *
 * `anchor` is state rather than a ref because `Popover` has to re-measure when
 * the trigger element itself changes.
 */
export function usePopoverTrigger() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const toggle = useCallback(() => setOpen((current) => !current), [])
  return { anchor, setAnchor, open, setOpen, close, toggle }
}
