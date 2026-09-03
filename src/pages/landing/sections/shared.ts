import { useEffect, useRef, useState, type RefObject } from 'react'

/** Every primary CTA on the rebuilt landing page starts the same trial. */
export const TRIAL_PATH = '/signup?plan=maristana&period=term'

/**
 * True once the element has entered the viewport — sticks, never reverts.
 * Pair with `opacity-0` before / `animate-rise` after (src/index.css:706-727,
 * `nishany-rise` uses `animation-fill-mode: backwards` so swapping the class
 * mid-render never flashes). `prefers-reduced-motion` needs no branch here:
 * the file's global rule (index.css:950-957) already collapses every
 * animation/transition duration to ~0ms for `*`, so a reduced-motion reader
 * sees the final state almost immediately instead of a fade.
 */
export function useRevealOnScroll<T extends HTMLElement>(): { ref: RefObject<T>; visible: boolean } {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (visible) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { ref, visible }
}
