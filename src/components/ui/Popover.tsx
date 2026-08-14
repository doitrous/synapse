import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { placeAtAnchor, placeAtPoint, type Placement } from '@/lib/popoverPosition'
import { isTopOverlay, popOverlay, pushOverlay } from '@/lib/overlayStack'
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
  className?: string
  children: ReactNode
}) {
  const id = useId()
  const surfaceRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ left: 0, top: 0, ready: false })
  const [minWidth, setMinWidth] = useState<number>()
  const pointX = point?.x
  const pointY = point?.y

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
      if (event.key !== 'Escape' || !isTopOverlay(id)) return
      event.preventDefault()
      event.stopPropagation()
      onClose()
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

  return createPortal(
    <div
      ref={surfaceRef}
      role={role}
      aria-label={label}
      onContextMenu={(event) => event.preventDefault()}
      style={{ left: position.left, top: position.top, minWidth }}
      className={cn(
        'fixed z-[80] overflow-hidden rounded-xl border border-line bg-surface shadow-pop',
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
