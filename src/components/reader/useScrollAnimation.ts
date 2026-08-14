import { useCallback, useEffect, useRef } from 'react'

/**
 * Scrolling the reader owns, with an end it can report.
 *
 * `scrollIntoView({ behavior: 'smooth' })` gives no completion signal, so the
 * old reader guessed at its duration with a 400 ms timer — and that guess was
 * what let a page change, a URL write and a scroll correction chase each other
 * indefinitely. A tween the component runs itself knows exactly when it is
 * done, and can say so.
 *
 * A long jump is not animated at all: watching three hundred pages fly past is
 * not orientation, it is a wait.
 */

const EASE_OUT_QUINT = (t: number) => 1 - (1 - t) ** 5
const DURATION_MS = 260
/** Beyond this, jump. Roughly "more than the next screenful". */
const INSTANT_DISTANCE = 4000

export interface ScrollAnimation {
  /** Scroll to an offset. Resolves once the scroller has settled there. */
  scrollTo: (top: number, options?: { instant?: boolean }) => Promise<void>
  /** True while this hook is moving the scroller, not the reader. */
  isAnimating: () => boolean
  cancel: () => void
}

export function useScrollAnimation(scroller: React.RefObject<HTMLElement | null>): ScrollAnimation {
  const frame = useRef(0)
  const settle = useRef(0)
  const active = useRef(false)

  const cancel = useCallback(() => {
    if (frame.current) cancelAnimationFrame(frame.current)
    if (settle.current) window.clearTimeout(settle.current)
    frame.current = 0
    settle.current = 0
    active.current = false
  }, [])

  useEffect(() => cancel, [cancel])

  const scrollTo = useCallback((top: number, options?: { instant?: boolean }) => {
    const node = scroller.current
    if (!node) return Promise.resolve()
    cancel()

    const from = node.scrollTop
    const target = Math.max(0, Math.min(top, node.scrollHeight - node.clientHeight))
    const distance = target - from
    if (Math.abs(distance) < 1) return Promise.resolve()

    active.current = true

    if (options?.instant || Math.abs(distance) > INSTANT_DISTANCE) {
      node.scrollTop = target
      return new Promise<void>((resolve) => {
        // One frame of grace: the scroll event for this write is still to come,
        // and publishing it as the reader's own move would restart the loop.
        settle.current = window.setTimeout(() => { active.current = false; resolve() }, 50)
      })
    }

    const started = performance.now()
    return new Promise<void>((resolve) => {
      const step = (now: number) => {
        const progress = Math.min(1, (now - started) / DURATION_MS)
        node.scrollTop = from + distance * EASE_OUT_QUINT(progress)
        if (progress < 1) { frame.current = requestAnimationFrame(step); return }
        frame.current = 0
        settle.current = window.setTimeout(() => { active.current = false; resolve() }, 50)
      }
      frame.current = requestAnimationFrame(step)
    })
  }, [cancel, scroller])

  const isAnimating = useCallback(() => active.current, [])

  return { scrollTo, isAnimating, cancel }
}
