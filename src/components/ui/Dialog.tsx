import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Panel } from './Panel'
import { countOverlays, isTopOverlay, popOverlay, pushOverlay } from '@/lib/overlayStack'
import { cn } from '@/lib/cn'

/**
 * A modal task surface: a bottom sheet on a phone, a centred panel from `sm`.
 *
 * Every modal in the app used to be hand-rolled from the same six lines, which
 * is how three of them ended up with no Escape handler and no focus management
 * while the rest had both. This owns the parts that are easy to forget —
 * Escape, a focus trap, returning focus where it came from, and locking the
 * page behind — so a screen only has to describe its own content.
 */

const SIZES = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
  xl: 'sm:max-w-4xl',
}

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

export function Dialog({
  onClose,
  label,
  size = 'md',
  className,
  children,
}: {
  onClose: () => void
  /** Names the dialog for assistive technology. */
  label: string
  size?: keyof typeof SIZES
  className?: string
  children: ReactNode
}) {
  const id = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    pushOverlay(id, 'dialog')
    const previous = document.activeElement as HTMLElement | null
    const bodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Focus the first thing worth acting on, falling back to the panel so a
    // keyboard user is inside the dialog rather than still behind it.
    const panel = panelRef.current
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE)
    ;(first ?? panel)?.focus()

    const onKey = (event: KeyboardEvent) => {
      // A popover opened inside this dialog is above it, and Escape belongs to
      // whatever is on top — closing the dialog would discard a half-filled form.
      if (!isTopOverlay(id)) return
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      // Re-query on every Tab: a dialog's content changes as it is filled in.
      const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)]
        .filter((node) => node.offsetParent !== null || node === document.activeElement)
      if (!items.length) return
      const head = items[0]
      const tail = items[items.length - 1]
      if (event.shiftKey && document.activeElement === head) {
        event.preventDefault()
        tail.focus()
      } else if (!event.shiftKey && document.activeElement === tail) {
        event.preventDefault()
        head.focus()
      }
    }

    document.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('keydown', onKey, true)
      popOverlay(id)
      if (!countOverlays('dialog')) document.body.style.overflow = bodyOverflow
      previous?.focus?.()
    }
  }, [id, onClose])

  return createPortal(
    <div
      className="animate-fade fixed inset-0 z-50 grid items-end bg-ink/30 p-0 sm:place-items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      // Mouse *down* rather than click, so a text selection that starts inside
      // the panel and ends outside it does not dismiss the work in progress.
      onMouseDown={onClose}
    >
      <Panel
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          'animate-pop max-h-[calc(100dvh-env(safe-area-inset-top))] w-full overflow-y-auto overscroll-contain rounded-b-none pb-[env(safe-area-inset-bottom)] shadow-pop focus:outline-none sm:rounded-xl',
          SIZES[size],
          className,
        )}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {children}
      </Panel>
    </div>,
    document.body,
  )
}
