import { useEffect, useState } from 'react'
import { overlayPortal } from '@/lib/overlayPortal'

interface Tip {
  text: string
  left: number
  top: number
}

const CANDIDATE = '[data-description], .truncate, [class*="line-clamp-"]'

function candidateOf(target: EventTarget | null): HTMLElement | null {
  const element = target instanceof HTMLElement ? target : null
  return element?.closest<HTMLElement>(CANDIDATE) ?? null
}

function tipFor(element: HTMLElement): Tip | null {
  if (element.closest('[role="tooltip"]')) return null
  const explicit = element.dataset.description?.trim()
  const clipped = element.scrollWidth > element.clientWidth + 1 || element.scrollHeight > element.clientHeight + 1
  if (!explicit && !clipped) return null
  const text = explicit || element.getAttribute('aria-label')?.trim() || element.textContent?.trim()
  if (!text) return null
  const rect = element.getBoundingClientRect()
  return {
    text,
    left: Math.min(window.innerWidth - 16, Math.max(16, rect.left + rect.width / 2)),
    top: Math.min(window.innerHeight - 12, rect.bottom + 7),
  }
}

/**
 * One delegated continuation tooltip for legacy clipped text.
 *
 * New controls should use `Tooltip` or `OverflowText`, which provide the best
 * keyboard semantics. This layer closes the large pre-existing gap: any old
 * `truncate`/`line-clamp` label reveals its complete value on hover, and on
 * focus when it is already an interactive element. `data-description` also
 * lets a surface opt in even when its visible label is not clipped.
 */
export function OverflowTooltipLayer() {
  const [tip, setTip] = useState<Tip | null>(null)

  useEffect(() => {
    let touchTimer: number | null = null
    const open = (target: EventTarget | null) => {
      const element = candidateOf(target)
      setTip(element ? tipFor(element) : null)
    }
    const close = () => setTip(null)

    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      open(event.target)
    }
    const onPointerOut = (event: PointerEvent) => {
      const from = candidateOf(event.target)
      const to = candidateOf(event.relatedTarget)
      if (from && from === to) return
      close()
    }
    const onFocusIn = (event: FocusEvent) => open(event.target)
    const onFocusOut = () => close()
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') return
      open(event.target)
      if (touchTimer !== null) window.clearTimeout(touchTimer)
      touchTimer = window.setTimeout(close, 3500)
    }
    const onScroll = () => close()

    document.addEventListener('pointerover', onPointerOver)
    document.addEventListener('pointerout', onPointerOut)
    document.addEventListener('focusin', onFocusIn)
    document.addEventListener('focusout', onFocusOut)
    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('scroll', onScroll, true)
    return () => {
      if (touchTimer !== null) window.clearTimeout(touchTimer)
      document.removeEventListener('pointerover', onPointerOver)
      document.removeEventListener('pointerout', onPointerOut)
      document.removeEventListener('focusin', onFocusIn)
      document.removeEventListener('focusout', onFocusOut)
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('scroll', onScroll, true)
    }
  }, [])

  if (!tip) return null
  return overlayPortal(
    <div
      role="tooltip"
      className="pointer-events-none fixed z-[100] max-w-[min(24rem,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border border-line bg-ink px-2.5 py-1.5 text-center text-[11.5px] font-medium leading-snug text-paper shadow-pop"
      style={{ left: tip.left, top: tip.top }}
    >
      {tip.text}
    </div>,
  )
}
