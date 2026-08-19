import { useEffect, useMemo, useState } from 'react'
import { Microscope as MicroscopeIcon } from 'lucide-react'
import type { HistologySlide } from '@/data/histology'
import { useLiveHistology } from '@/lib/useLiveHistology'
import { subjects, getSubject } from '@/data/subjects'
import { Panel } from '@/components/ui/Panel'
import { EmptyState } from '@/components/ui/EmptyState'
import { SystemMark } from '@/components/ui/SystemMark'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

const POSTER = '/microscope/focus-poster.jpg'
const STRIP = '/microscope/focus-strip.jpg'

/** Frames on the strip, and the width of one. The CSS steps() must agree. */
const FRAMES = 18
const FRAME_PX = 320
/** Must match `animate-microscope-focus` in index.css. */
const FOCUS_MS = 1250

type Stage = 'choosing' | 'focusing'

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
 * The instrument, and what is on the bench beside it.
 *
 * The microscope sits at the start of the row and the slides sit next to it,
 * the way they do on a real bench — you pick one up and put it under the
 * lens. Choosing a slide runs the push-in, which is played as stepped stills
 * from one strip rather than a video: it stops exactly on the white field, and
 * that field is where the slide then appears.
 */
export function Microscope({ onOpen }: { onOpen: (slide: HistologySlide) => void }) {
  const t = useT()
  const { slides } = useLiveHistology()
  const [stage, setStage] = useState<Stage>('choosing')
  const [chosen, setChosen] = useState<HistologySlide | null>(null)
  const groups = useMemo(() => groupBySubject(slides), [slides])

  // Fetched when there is something to look at, not on mount. A student who
  // never opens histology should not pay for a hundred kilobytes of instrument.
  useEffect(() => {
    if (!slides.length) return
    const image = new Image()
    image.src = STRIP
  }, [slides.length])

  function choose(slide: HistologySlide) {
    setChosen(slide)
    setStage('focusing')
  }

  /**
   * Open the slide even if the animation never says it finished.
   *
   * A CSS animation only fires `animationend` while the page is being painted.
   * A tab in the background — or a browser throttling it — leaves the clock at
   * zero, and with the transition as the only way through, the student would
   * sit on a still frame forever. The animation stays the nice path; this is
   * the one that guarantees they arrive.
   */
  useEffect(() => {
    if (stage !== 'focusing' || !chosen) return
    const timer = window.setTimeout(() => onOpen(chosen), FOCUS_MS + 250)
    return () => window.clearTimeout(timer)
  }, [stage, chosen, onOpen])

  if (stage === 'focusing' && chosen) {
    return (
      <div className="grid min-h-[26rem] place-items-center py-10">
        <div
          role="img"
          aria-label={t('Focusing on the slide')}
          className="animate-microscope-focus size-[min(20rem,72vw)] rounded-full bg-cover shadow-pop"
          style={{
            backgroundImage: `url(${STRIP})`,
            backgroundSize: `${FRAMES * FRAME_PX}px ${FRAME_PX}px`,
            backgroundRepeat: 'no-repeat',
          }}
          onAnimationEnd={() => onOpen(chosen)}
        />
        <p className="mt-5 text-[12.5px] text-ink-3">{chosen.title}</p>
      </div>
    )
  }

  return (
    <div className="grid items-start gap-4 sm:grid-cols-[minmax(9rem,13rem)_minmax(0,1fr)]">
      {/* The instrument. It stays put; the slides come to it. */}
      <Panel className="p-4 text-center sm:sticky sm:top-6">
        <img
          src={POSTER}
          alt=""
          width={320}
          height={320}
          className="mx-auto w-full max-w-[10rem] rounded-lg"
        />
        <p className="mt-3 text-[13px] font-semibold text-ink">{t('The microscope')}</p>
        <p className="mt-1 text-[12px] leading-relaxed text-ink-3">
          {slides.length
            ? t('Choose a slide and it goes under the lens.')
            : t('Nothing to put under it yet.')}
        </p>
      </Panel>

      {/* The bench. */}
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
