import { useEffect, useState } from 'react'
import {
  ArrowLeft, ArrowRight, BarChart3, Building2, Check, CircleHelp, Clock3,
  ListChecks, RotateCcw, X,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { maristanaStageAsset } from '@/data/maristanas'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

const BUILD_FRAME_MS = 145
const DO_NOT_DISMISS = () => undefined

const HOW_IT_WORKS = [
  {
    icon: Clock3,
    title: 'Study actively',
    description: 'Focused minutes count while you are using study pages. Time in an idle tab does not.',
  },
  {
    icon: ListChecks,
    title: 'Answer scored questions',
    description: 'Each marked attempt adds construction credit, with a larger contribution for a correct answer.',
  },
  {
    icon: BarChart3,
    title: 'Complete assessments',
    description: 'Assessment-length sessions add credit from the final score, so careful performance matters.',
  },
] as const

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ))

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return reduced
}

function MaristanaBuildSequence() {
  const t = useT()
  const reducedMotion = usePrefersReducedMotion()
  const [assetsReady, setAssetsReady] = useState(reducedMotion)
  const [frame, setFrame] = useState(reducedMotion ? 25 : 1)
  const [run, setRun] = useState(0)
  const [playing, setPlaying] = useState(!reducedMotion)

  useEffect(() => {
    if (reducedMotion) {
      setAssetsReady(true)
      setFrame(25)
      setPlaying(false)
      return
    }

    let active = true
    const preloads = Array.from({ length: 25 }, (_, index) => new Promise<void>((resolve) => {
      const image = new Image()
      image.onload = () => resolve()
      image.onerror = () => resolve()
      image.src = maristanaStageAsset(index + 1)
    }))
    void Promise.all(preloads).then(() => {
      if (active) setAssetsReady(true)
    })
    return () => { active = false }
  }, [reducedMotion])

  useEffect(() => {
    if (!assetsReady || reducedMotion) return
    let animationFrame = 0
    let lastFrame = 1
    const startedAt = performance.now()
    setFrame(1)
    setPlaying(true)

    const advance = (now: number) => {
      const nextFrame = Math.min(25, Math.floor((now - startedAt) / BUILD_FRAME_MS) + 1)
      if (nextFrame !== lastFrame) {
        lastFrame = nextFrame
        setFrame(nextFrame)
      }
      if (nextFrame < 25) animationFrame = requestAnimationFrame(advance)
      else setPlaying(false)
    }

    animationFrame = requestAnimationFrame(advance)
    return () => cancelAnimationFrame(animationFrame)
  }, [assetsReady, reducedMotion, run])

  const replay = () => {
    if (!assetsReady || reducedMotion) return
    setRun((current) => current + 1)
  }

  return (
    <div className="grid-chart-major relative flex min-h-[290px] flex-col overflow-hidden bg-surface-2/45 sm:min-h-[360px] lg:min-h-full">
      <div className="flex items-center justify-between gap-3 px-4 pt-4 sm:px-5 sm:pt-5">
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-primary-strong">{t('Construction study')}</p>
          <p className="mt-0.5 text-[11.5px] text-ink-3">{t('One hospital · 25 visible stages')}</p>
        </div>
        {!reducedMotion && (
          <IconButton
            icon={RotateCcw}
            label={t('Replay build animation')}
            variant="surface"
            onClick={replay}
            disabled={!assetsReady || playing}
            className="disabled:pointer-events-none disabled:opacity-45"
          />
        )}
      </div>

      <div className="relative flex flex-1 items-center justify-center px-3 py-3 sm:px-5 sm:py-5">
        <img
          src={maristanaStageAsset(frame)}
          alt=""
          aria-hidden="true"
          className="aspect-video w-full object-contain"
        />
      </div>

      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="tnum font-mono text-[12px] font-semibold text-ink">{t('Stage')} {String(frame).padStart(2, '0')} / 25</p>
            <p className="mt-0.5 text-[10.5px] text-ink-3">{frame === 25 ? t('Ready to serve') : assetsReady ? t('Building from your learning') : t('Preparing the construction study')}</p>
          </div>
          {frame === 25 && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-success">
              <Icon icon={Check} size={14} /> {t('Complete')}
            </span>
          )}
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-inset" aria-hidden>
          <div
            className="h-full origin-left rounded-full bg-primary transition-transform duration-150 ease-linear motion-reduce:transition-none"
            style={{ transform: `scaleX(${frame / 25})` }}
          />
        </div>
      </div>
      <p className="sr-only">{t('An illustration shows a Maristana being built from stage {n} to stage 25.').replace('{n}', String(frame))}</p>
    </div>
  )
}

function HowItWorksSteps({ compact = false }: { compact?: boolean }) {
  const t = useT()
  return (
    <div>
      <ol className="divide-y divide-line">
        {HOW_IT_WORKS.map((item, index) => (
          <li key={item.title} className={cn('flex gap-3.5', compact ? 'py-3' : 'py-4')}>
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-2 text-ink-2">
              <Icon icon={item.icon} size={17} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[13px] font-semibold text-ink">{t(item.title)}</p>
                <span className="tnum font-mono text-[10px] text-ink-3">0{index + 1}</span>
              </div>
              <p className="mt-1 text-pretty text-[11.5px] leading-relaxed text-ink-2">{t(item.description)}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-4 rounded-lg border border-line bg-surface-2/55 p-3.5">
        <p className="text-[11px] font-bold uppercase tracking-[0.07em] text-ink-3">{t('Then it builds itself')}</p>
        <p className="mt-1.5 text-pretty text-[12px] leading-relaxed text-ink-2">
          {t('Credit places the next part automatically. A finished Maristana contains 25 parts, and your school can tune the balance without changing what counts as real learning.')}
        </p>
      </div>
    </div>
  )
}

export function MaristanaOnboarding({ onStart }: { onStart: () => void }) {
  const t = useT()
  const [view, setView] = useState<'introduction' | 'how'>('introduction')

  return (
    <Dialog onClose={DO_NOT_DISMISS} label={t('Welcome to Build Maristanas')} size="xl" className="overflow-hidden p-0">
      <div className="grid min-h-[min(690px,calc(100dvh-2rem))] lg:grid-cols-[1.16fr_0.84fr]">
        <div className="border-b border-line lg:border-b-0 lg:border-e">
          <MaristanaBuildSequence />
        </div>

        <div className="flex min-h-[430px] flex-col p-5 sm:p-6 lg:p-7">
          <div key={view} className="animate-pop">
            {view === 'introduction' ? (
              <>
                <span className="grid size-10 place-items-center rounded-xl bg-primary-tint text-primary-strong">
                  <Icon icon={Building2} size={20} />
                </span>
                <p className="mt-5 text-[10.5px] font-bold uppercase tracking-[0.09em] text-primary-strong">{t('Build Maristanas')}</p>
                <h1 className="mt-2 text-balance font-serif text-[30px] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[36px]">
                  {t('Build a place of healing.')}
                </h1>
                <p className="mt-3 text-pretty text-[13px] leading-relaxed text-ink-2">
                  {t('Your focused study becomes a Maristana—a hospital built one part at a time. Every finished building is a record of work you actually completed.')}
                </p>

                <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-line py-4">
                  <div><dt className="tnum font-mono text-[17px] font-semibold text-ink">25</dt><dd className="mt-1 text-[10.5px] leading-snug text-ink-3">{t('visible stages')}</dd></div>
                  <div><dt className="font-mono text-[17px] font-semibold text-ink">3</dt><dd className="mt-1 text-[10.5px] leading-snug text-ink-3">{t('learning signals')}</dd></div>
                  <div><dt className="font-mono text-[17px] font-semibold text-ink">{t('Auto')}</dt><dd className="mt-1 text-[10.5px] leading-snug text-ink-3">{t('construction')}</dd></div>
                </dl>
              </>
            ) : (
              <>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-primary-strong">{t('How it works')}</p>
                <h1 className="mt-2 text-balance font-serif text-[29px] font-semibold leading-tight tracking-[-0.025em] text-ink">{t('Learning is the building material.')}</h1>
                <p className="mt-2 text-pretty text-[12.5px] leading-relaxed text-ink-2">{t('There is nothing extra to log and no arbitrary daily claim. The construction ledger reads the study work you already do.')}</p>
                <div className="mt-4"><HowItWorksSteps compact /></div>
              </>
            )}
          </div>

          <div className="mt-auto pt-6">
            <div className={cn('flex flex-col gap-2', view === 'how' && 'sm:flex-row')}>
              <Button variant="primary" size="lg" iconRight={ArrowRight} onClick={onStart} className="flex-1 active:scale-[0.96]">
                {t('Start building')}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                iconLeft={view === 'introduction' ? CircleHelp : ArrowLeft}
                onClick={() => setView((current) => current === 'introduction' ? 'how' : 'introduction')}
                className="active:scale-[0.96]"
              >
                {view === 'introduction' ? t('How it works') : t('Back')}
              </Button>
            </div>
            <p className="mt-3 text-center text-[10.5px] leading-relaxed text-ink-3">{t('Progress is based on active study and server-scored performance.')}</p>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export function MaristanaHowItWorksDialog({ onClose }: { onClose: () => void }) {
  const t = useT()
  return (
    <Dialog onClose={onClose} label={t('How Build Maristanas works')} size="lg" className="overflow-hidden p-0">
      <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-primary-strong">{t('Build Maristanas')}</p>
          <h2 className="mt-1.5 font-serif text-[25px] font-semibold tracking-[-0.025em] text-ink">{t('How construction works')}</h2>
          <p className="mt-1 text-[12px] text-ink-2">{t('Your existing study activity moves the build forward automatically.')}</p>
        </div>
        <IconButton icon={X} label={t('Close how it works')} onClick={onClose} />
      </div>
      <div className="px-5 py-2 sm:px-6"><HowItWorksSteps /></div>
      <div className="flex justify-end border-t border-line px-5 py-4 sm:px-6">
        <Button variant="primary" onClick={onClose} className="active:scale-[0.96]">{t('I understand')}</Button>
      </div>
    </Dialog>
  )
}
