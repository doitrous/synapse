import { useEffect, useMemo, useRef, useState } from 'react'
import { Microscope as MicroscopeIcon } from 'lucide-react'
import { spriteCell, type HistologySlide } from '@/data/histology'
import { useLiveHistology } from '@/lib/useLiveHistology'
import { subjects, getSubject } from '@/data/subjects'
import { Panel } from '@/components/ui/Panel'
import { EmptyState } from '@/components/ui/EmptyState'
import { SystemMark } from '@/components/ui/SystemMark'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

const INSTRUMENT = '/microscope/microscope.png'
const GRID = '/microscope/focus-grid.jpg'

/**
 * A hundred and twenty frames on a twelve-by-ten grid.
 *
 * A grid rather than a strip because a strip of this many frames would be
 * nearly thirty thousand pixels wide — past what a GPU will hold as one
 * texture. Two axes is also why the frames are stepped from here instead of by
 * CSS `steps()`, which walks one.
 */
const COLUMNS = 12
const ROWS = 10
const FRAMES = COLUMNS * ROWS
/** Two seconds at sixty frames a second — the point of having this many. */
const FOCUS_MS = 2000

/** Where the instrument was sitting when the slide was chosen. */
interface Origin { x: number; y: number; scale: number }

/** Slides grouped by subject, catalogue order first, then anything unrecognised. */
function groupBySubject(slides: HistologySlide[]) {
  const buckets = new Map<string, HistologySlide[]>()
  for (const slide of slides) {
    const key = slide.subjectId || 'unfiled'
    const bucket = buckets.get(key)
    if (bucket) bucket.push(slide)
    else buckets.set(key, [slide])
  }
  const known = subjects.map((subject) => subject.id).filter((id) => buckets.has(id))
  const rest = [...buckets.keys()].filter((key) => !known.includes(key)).sort()
  return [...known, ...rest].map((key) => ({ key, slides: buckets.get(key)! }))
}

/**
 * The instrument, and the slides on the bench beside it.
 *
 * Choosing a slide does not cut to a viewer. The microscope travels from
 * wherever it is sitting to the middle of the screen while the push-in plays,
 * so what a student sees is continuous — the same object the whole way, rather
 * than one thing swapped for another.
 */
export function Microscope({ onOpen }: { onOpen: (slide: HistologySlide) => void }) {
  const t = useT()
  const { slides } = useLiveHistology()
  const [chosen, setChosen] = useState<HistologySlide | null>(null)
  const [origin, setOrigin] = useState<Origin | null>(null)
  /** False for one frame, so the element paints *at* the instrument before it moves. */
  const [travelling, setTravelling] = useState(false)
  const instrumentRef = useRef<HTMLImageElement>(null)
  const fieldRef = useRef<HTMLDivElement>(null)
  const groups = useMemo(() => groupBySubject(slides), [slides])

  // Fetched when there is something to look at, not on mount. A student who
  // never opens histology should not pay for the grid.
  useEffect(() => {
    if (!slides.length) return
    const image = new Image()
    image.src = GRID
  }, [slides.length])

  /**
   * Walk the frames against the clock.
   *
   * Timed rather than counted, so the push-in takes two seconds on a slow
   * machine as well as a fast one — a loop that advanced one frame per paint
   * would simply run long wherever it dropped frames. Reduced motion goes
   * straight to the last frame: the destination without the journey.
   */
  useEffect(() => {
    const field = fieldRef.current
    if (!chosen || !field) return
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const show = (index: number) => {
      const clamped = index
      const cell = spriteCell(clamped, COLUMNS, ROWS)
      field.style.backgroundPosition = `${cell.x}% ${cell.y}%`
    }
    if (reduced) { show(FRAMES - 1); return }
    let raf = 0
    const started = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / FOCUS_MS)
      show(Math.round(progress * (FRAMES - 1)))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    show(0)
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [chosen])

  /**
   * Open the slide even if the animation never says it finished.
   *
   * A CSS animation only fires `animationend` while the page is being painted.
   * A backgrounded or throttled tab leaves the clock at zero, and with the
   * transition as the only way through, the student would sit on a still frame
   * for good. The animation stays the nice path; this guarantees they arrive.
   */
  useEffect(() => {
    if (!chosen) return
    const timer = window.setTimeout(() => onOpen(chosen), FOCUS_MS + 250)
    return () => window.clearTimeout(timer)
  }, [chosen, onOpen])

  // Laid out at the destination and transformed back onto the instrument, then
  // released on the next frame so the browser has something to animate from.
  // Two frames deep: one to paint the start, one to change it.
  useEffect(() => {
    if (!origin) return
    let inner = 0
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setTravelling(true))
    })
    return () => { cancelAnimationFrame(outer); cancelAnimationFrame(inner) }
  }, [origin])

  function choose(slide: HistologySlide) {
    const rect = instrumentRef.current?.getBoundingClientRect()
    if (rect) {
      // The overlay is laid out centred at the target size; this is the
      // transform that puts it back over the instrument, so the travel starts
      // exactly where the student is already looking.
      const target = Math.min(window.innerWidth * 0.78, window.innerHeight * 0.62, 416)
      setOrigin({
        x: rect.left + rect.width / 2 - window.innerWidth / 2,
        y: rect.top + rect.height / 2 - window.innerHeight / 2,
        scale: rect.width / target,
      })
    }
    setChosen(slide)
  }

  if (chosen) {
    return (
      <div className="fixed inset-0 z-40 grid place-items-center bg-white">
        <div
          ref={fieldRef}
          role="img"
          aria-label={t('Focusing on the slide')}
          className="animate-microscope-iris"
          style={{
            width: 'min(80vw, 66vh, 28rem)',
            height: 'min(80vw, 66vh, 28rem)',
            backgroundImage: `url(${GRID})`,
            // The whole grid, scaled so one cell fills the element. Cell size is
            // a fraction of the element rather than pixels, so the frames stay
            // registered whatever size the field is drawn at.
            backgroundSize: `${COLUMNS * 100}% ${ROWS * 100}%`,
            backgroundRepeat: 'no-repeat',
            ['--microscope-focus-ms' as string]: `${FOCUS_MS}ms`,
            transform: origin && !travelling
              ? `translate(${origin.x}px, ${origin.y}px) scale(${origin.scale})`
              : undefined,
            transition: `transform ${FOCUS_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        />
      </div>
    )
  }

  return (
    <div className="grid items-start gap-4 sm:grid-cols-[minmax(8rem,11rem)_minmax(0,1fr)]">
      {/* The instrument itself — no card, no caption. It is a picture of a
          microscope; captioning it "the microscope" tells nobody anything. */}
      <img
        ref={instrumentRef}
        src={INSTRUMENT}
        alt=""
        width={360}
        height={360}
        className="mx-auto w-full max-w-[9rem] sm:sticky sm:top-6"
      />

      {slides.length === 0 ? (
        <Panel className="p-10">
          <EmptyState
            icon={MicroscopeIcon}
            title={t('No slides have been published yet.')}
            description={t('Slides appear here once they are published in the admin console.')}
          />
        </Panel>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <Panel key={group.key} className="overflow-hidden">
              <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
                <SystemMark subjectId={group.key} />
                <span className="text-[12.5px] font-semibold text-ink">
                  {group.key === 'unfiled' ? t('Unfiled') : getSubject(group.key).name}
                </span>
                <span className="tnum ms-auto font-mono text-[11px] text-ink-3">{group.slides.length}</span>
              </div>
              <ul className="divide-y divide-line">
                {group.slides.map((slide) => (
                  <li key={slide.id}>
                    <button
                      type="button"
                      onClick={() => choose(slide)}
                      className={cn(
                        'flex w-full items-center gap-3 px-4 py-3 text-start transition-colors',
                        'hover:bg-inset focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-accent)]',
                      )}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13.5px] font-medium text-ink">{slide.title}</span>
                        <span className="mt-0.5 block truncate text-[12px] text-ink-3">
                          {slide.tissue}
                          {slide.stain ? ` · ${slide.stain}` : ''}
                        </span>
                      </span>
                      <span className="tnum shrink-0 font-mono text-[11px] text-ink-3">
                        {slide.views.map((view) => `${view.objective}×`).join(' · ')}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
      )}
    </div>
  )
}
