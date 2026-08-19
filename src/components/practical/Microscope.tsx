import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import type { HistologySlide } from '@/data/histology'
import { useLiveHistology } from '@/lib/useLiveHistology'
import { subjects, getSubject } from '@/data/subjects'
import { Dialog } from '@/components/ui/Dialog'
import { PanelHeader } from '@/components/ui/Panel'
import { EmptyState } from '@/components/ui/EmptyState'
import { SystemMark } from '@/components/ui/SystemMark'
import { useT } from '@/lib/i18n'

const POSTER = '/microscope/focus-poster.jpg'
const VIDEO = '/microscope/focus.mp4'

type Stage = 'idle' | 'picking' | 'focusing'

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
 * The instrument that opens the histology viewer.
 *
 * Three stages, not a boolean: idle (a button showing the resting microscope),
 * picking (which slide), and focusing (the push-in that lands on it). The
 * order is deliberate — the student commits to a slide *before* the camera
 * moves, because the video is the transition into the eyepiece, not a loading
 * screen in front of one.
 */
export function Microscope({ onOpen }: { onOpen: (slide: HistologySlide) => void }) {
  const t = useT()
  const { slides } = useLiveHistology()
  const [stage, setStage] = useState<Stage>('idle')
  const [chosen, setChosen] = useState<HistologySlide | null>(null)
  const groups = useMemo(() => groupBySubject(slides), [slides])

  // Paid for only once a student actually opens the picker — never on mount,
  // where most students who never touch histology would carry the cost for
  // nothing.
  useEffect(() => {
    if (stage !== 'picking') return
    const preload = document.createElement('video')
    preload.preload = 'auto'
    preload.src = VIDEO
    preload.load()
  }, [stage])

  const choose = (slide: HistologySlide) => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    // Reduced motion means no journey, not no destination — the slide still
    // opens, just without the camera push-in.
    if (reducedMotion) {
      setStage('idle')
      onOpen(slide)
      return
    }
    setStage('focusing')
    setChosen(slide)
  }

  const land = () => {
    if (!chosen) return
    setStage('idle')
    setChosen(null)
    onOpen(chosen)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setStage('picking')}
        aria-label={t('Choose a slide to look at')}
        className="group relative block aspect-square w-full max-w-xs overflow-hidden rounded-xl border border-line bg-surface shadow-panel transition-shadow hover:shadow-pop focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
      >
        <img src={POSTER} alt="" className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
      </button>

      {stage === 'picking' && (
        <Dialog onClose={() => setStage('idle')} label={t('Choose a slide to look at')} size="lg">
          <PanelHeader title={t('Choose a slide to look at')} />
          <div className="max-h-[70vh] overflow-y-auto p-4">
            {groups.length === 0 ? (
              <EmptyState
                icon={Search}
                title={t('No slides have been published yet.')}
                description={t('Slides appear here once they are published in the admin console.')}
              />
            ) : (
              <div className="space-y-6">
                {groups.map((group) => (
                  <section key={group.key}>
                    <div className="mb-2.5 flex items-center gap-2 border-b border-line pb-1.5">
                      <SystemMark subjectId={group.key} size="sm" />
                      <h2 className="font-serif text-[15px] font-semibold text-ink">{getSubject(group.key).name}</h2>
                    </div>
                    <ul className="divide-y divide-line">
                      {group.slides.map((slide) => (
                        <li key={slide.id}>
                          <button
                            type="button"
                            onClick={() => choose(slide)}
                            className="flex w-full flex-wrap items-center gap-x-4 gap-y-1 px-2 py-3 text-start transition-colors hover:bg-inset/60 focus-visible:bg-inset focus-visible:outline-none"
                          >
                            <span className="min-w-0 flex-1 text-[14px] font-medium text-ink">{slide.title}</span>
                            <span className="text-[12.5px] text-ink-3">{slide.tissue}</span>
                            <span className="text-[12.5px] text-ink-3">·</span>
                            <span className="text-[12.5px] text-ink-3">{slide.stain}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}
          </div>
        </Dialog>
      )}

      {stage === 'focusing' && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink">
          <video
            src={VIDEO}
            autoPlay
            muted
            playsInline
            onEnded={land}
            // A codec or network failure must still land the student on the
            // slide rather than stranding them on a frozen frame.
            onError={land}
            className="size-full object-cover"
          />
        </div>
      )}
    </>
  )
}
