import { useEffect, useRef, useState } from 'react'
import { SpecimenFor } from './specimens'
import { cn } from '@/lib/cn'
import type { LandingContent } from './content'

/**
 * The product, one surface at a time, as the page scrolls.
 *
 * On a wide screen the copy scrolls and the specimen column stays put, changing
 * to whichever step is being read. That needs no scroll listener and no
 * measuring: an `IntersectionObserver` over the copy blocks says which one is in
 * the reading band, which is the same question with a cheaper answer.
 *
 * Below `lg`, and for anyone who has asked for reduced motion, it degrades to
 * the honest version — each step followed by its own specimen, stacked. Nothing
 * is hidden behind the effect.
 */

export function Walkthrough({ c }: { c: LandingContent }) {
  const steps = c.walkthrough.steps
  const [active, setActive] = useState(0)
  const blocks = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const nodes = blocks.current.filter((node): node is HTMLDivElement => node !== null)
    if (!nodes.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = nodes.indexOf(entry.target as HTMLDivElement)
          if (index >= 0) setActive(index)
        }
      },
      // A band across the middle of the viewport: the step being read is the
      // one in front of the reader, not the one that happens to be topmost.
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    for (const node of nodes) observer.observe(node)
    return () => observer.disconnect()
  }, [steps.length])

  return (
    <section className="mt-24">
      <div className="flex items-end justify-between gap-6 border-b-2 border-ink/85 pb-3">
        <h2 className="font-serif text-[27px] font-semibold tracking-[-0.015em] text-ink sm:text-[32px]">{c.walkthrough.title}</h2>
        <p className="hidden max-w-xs text-[13.5px] leading-snug text-ink-2 sm:block">{c.walkthrough.sub}</p>
      </div>

      <div className="mt-8 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div>
          {steps.map((step, index) => (
            <div
              key={step.specimen}
              ref={(node) => { blocks.current[index] = node }}
              // Tall enough on a wide screen that one step owns the reading
              // band at a time, short enough that six of them are not a
              // four-screen scroll before the page continues.
              className="border-b border-line py-8 last:border-b-0 lg:min-h-[46vh] lg:border-b-0 lg:py-0 lg:pb-[12vh] lg:pt-[10vh]"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.07em] text-primary-strong">{step.eyebrow}</p>
              <h3
                className={cn(
                  'mt-2 font-serif text-[21px] font-semibold tracking-[-0.015em] sm:text-[25px]',
                  // Dimming the steps you are not reading only makes sense where
                  // they are all on screen at once.
                  'text-ink lg:transition-colors',
                  index !== active && 'lg:text-ink-3',
                )}
              >
                {step.title}
              </h3>
              <p className="mt-2.5 max-w-md text-[14.5px] leading-relaxed text-ink-2">{step.line}</p>

              {/* Stacked below lg: the specimen belongs to the step it explains. */}
              <div className="mt-5 lg:hidden">
                <SpecimenFor which={step.specimen} c={c.specimen} lang={c.lang} />
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-24">
            {steps.map((step, index) => (
              <div
                key={step.specimen}
                aria-hidden={index !== active}
                className={cn(
                  'transition-opacity duration-300 motion-reduce:transition-none',
                  index === active ? 'opacity-100' : 'pointer-events-none absolute inset-x-0 top-0 opacity-0',
                )}
              >
                <SpecimenFor which={step.specimen} c={c.specimen} lang={c.lang} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
