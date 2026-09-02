import { useEffect, useMemo, useRef } from 'react'
import { Microscope as MicroscopeIcon } from 'lucide-react'
import type { HistologySlide } from '@/data/histology'
import { useLiveHistology } from '@/lib/useLiveHistology'
import { subjects } from '@/data/subjects'
import { useSubjectName } from '@/lib/useSubjectName'
import { Panel } from '@/components/ui/Panel'
import { EmptyState } from '@/components/ui/EmptyState'
import { SystemMark } from '@/components/ui/SystemMark'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import type { MicroscopeTransitionRect } from './microscopeTransition'

const INSTRUMENT = '/microscope/microscope.png'
const FOCUS_GRID = '/microscope/focus-grid-alpha.webp'

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
 * Choosing a slide records the instrument's real viewport rectangle. The
 * viewer uses that rectangle as the transition origin and its own measured,
 * centered optical target as the destination, keeping the move continuous and
 * precisely aligned.
 */
export function Microscope({
  onOpen,
}: {
  onOpen: (slide: HistologySlide, origin?: MicroscopeTransitionRect) => void
}) {
  const t = useT()
  const subjectName = useSubjectName()
  const { slides } = useLiveHistology()
  const instrumentRef = useRef<HTMLImageElement>(null)
  const groups = useMemo(() => groupBySubject(slides), [slides])

  // Decode the keyed transition frames while the student is choosing a slide,
  // so the first frame is ready when they open one instead of appearing late.
  useEffect(() => {
    if (!slides.length) return
    const image = new Image()
    image.src = FOCUS_GRID
    image.decode?.().catch(() => undefined)
  }, [slides.length])

  function choose(slide: HistologySlide) {
    const rect = instrumentRef.current?.getBoundingClientRect()
    onOpen(slide, rect ? {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    } : undefined)
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
                  {group.key === 'unfiled' ? t('Unfiled') : subjectName(group.key)}
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
