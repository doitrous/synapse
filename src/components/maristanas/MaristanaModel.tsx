import { useEffect, useRef, useState } from 'react'
import { Building2, Box, Check } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'
import { MARISTANA_BUILD_STEPS, MARISTANA_STEPS, maristanaStageAsset } from '@/data/maristanas'

/**
 * Asset hand-off contract.
 *
 * A supplied render named `stage-01.webp` … `stage-25.webp` is picked up
 * automatically. Until those renders arrive the interface shows a deliberately
 * schematic construction elevation, not a fake final hospital model.
 */
function BlueprintHospital({ stage }: { stage: number }) {
  const t = useT()
  const visible = (part: number) => part <= stage
  const part = (number: number, className: string) => cn(
    'transition-[opacity,transform] duration-500 ease-[var(--ease-out-quint)] motion-reduce:transition-none',
    visible(number) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
    className,
  )
  return (
    <svg viewBox="0 0 760 420" className="h-full w-full" role="img" aria-label={t('Schematic hospital at construction stage {n} of 25').replace('{n}', String(stage))}>
      <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" className="text-accent/70">
        <path d="M72 354H688" strokeDasharray="5 8" className="text-line-2" />
        <path d="M155 352V303H605V352" className={part(1, '')} />
        <path d="M190 303V280H570V303" className={part(2, '')} />
        <path d="M226 280V250H534V280" className={part(3, '')} />
        <path d="M103 352V290H226V352" className={part(4, '')} />
        <path d="M534 352V290H657V352" className={part(5, '')} />

        <path d="M116 290V230H226V290" className={part(6, '')} />
        <path d="M128 230V205H226V230" className={part(7, '')} />
        <path d="M142 205V188H226V205" className={part(8, '')} />
        <path d="M151 352V252M190 352V252" className={part(9, '')} />
        <path d="M139 247H202M139 270H202" className={part(10, '')} />

        <path d="M534 290V230H644V290" className={part(11, '')} />
        <path d="M534 230V205H632V230" className={part(12, '')} />
        <path d="M534 205V188H618V205" className={part(13, '')} />
        <path d="M570 352V252M609 352V252" className={part(14, '')} />
        <path d="M558 247H621M558 270H621" className={part(15, '')} />

        <path d="M260 250V166H500V250" className={part(16, '')} />
        <path d="M286 250V190M332 250V190M428 250V190M474 250V190" className={part(17, '')} />
        <path d="M270 166H490L472 145H288Z" className={part(18, '')} />
        <path d="M325 145C331 94 429 94 435 145" className={part(19, '')} />
        <path d="M350 113C360 82 400 82 410 113" className={part(20, '')} />
        <path d="M380 87V54" className={part(21, '')} />
        <path d="M380 54L405 65L380 74Z" className={part(22, '')} />

        <path d="M357 250V210C357 180 403 180 403 210V250" className={part(23, '')} />
        <path d="M160 316H190M570 316H600M294 212H319M441 212H466" className={part(24, '')} />
        <path d="M83 352H677M125 367H635" strokeWidth="5" className={part(25, 'text-primary')} />
      </g>
      {stage === 0 && (
        <g className="text-ink-3">
          <path d="M130 350L630 350M220 280L540 280M380 70V350" stroke="currentColor" strokeWidth="2" strokeDasharray="7 9" />
          <text x="380" y="205" textAnchor="middle" fill="currentColor" fontSize="18" fontFamily="var(--font-mono)">{t('SITE 01 · READY')}</text>
        </g>
      )}
    </svg>
  )
}

function BuildRoadmap({ stage }: { stage: number }) {
  const t = useT()
  const scroller = useRef<HTMLDivElement>(null)
  const currentStep = useRef<HTMLLIElement>(null)
  const mounted = useRef(false)
  const activeStep = Math.min(MARISTANA_STEPS, stage + (stage < MARISTANA_STEPS ? 1 : 0))

  useEffect(() => {
    const rail = scroller.current
    const item = currentStep.current
    if (!rail || !item) return
    const top = Math.max(0, item.offsetTop - (rail.clientHeight - item.clientHeight) / 2)
    rail.scrollTo({
      top,
      behavior: mounted.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto',
    })
    mounted.current = true
  }, [activeStep])

  return (
    <aside className="flex min-h-0 flex-col border-e border-line bg-surface" aria-label={t('Maristana construction roadmap')}>
      <div className="shrink-0 border-b border-line px-3 py-3 sm:px-4">
        <p className="text-[9.5px] font-bold uppercase tracking-[0.09em] text-ink-3">{t('Build roadmap')}</p>
        <p className="tnum mt-1 font-mono text-[10.5px] font-semibold text-ink">{stage} / {MARISTANA_STEPS} {t('placed')}</p>
      </div>
      <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-2 sm:px-3" tabIndex={0}>
        <ol className="relative">
          {MARISTANA_BUILD_STEPS.map((label, index) => {
            const number = index + 1
            const complete = number <= stage
            const current = number === activeStep
            return (
              <li
                key={label}
                ref={current ? currentStep : undefined}
                aria-current={current ? 'step' : undefined}
                className={cn(
                  'relative flex min-h-10 gap-2 rounded-md px-1.5 py-2 sm:gap-2.5 sm:px-2',
                  current && 'bg-primary-tint/65',
                )}
              >
                {number < MARISTANA_STEPS && (
                  <span aria-hidden className={cn(
                    'absolute start-[13px] top-7 h-[calc(100%-0.55rem)] w-px sm:start-[15px]',
                    number < stage ? 'bg-primary/45' : 'bg-line-2',
                  )} />
                )}
                <span className={cn(
                  'relative z-10 mt-px grid size-[18px] shrink-0 place-items-center rounded-full border font-mono text-[8.5px] font-bold tabular-nums sm:size-5 sm:text-[9px]',
                  complete
                    ? 'border-primary bg-primary text-on-primary'
                    : current
                      ? 'border-primary bg-surface text-primary-strong shadow-panel'
                      : 'border-line-2 bg-surface text-ink-3',
                )}>
                  {complete ? <Icon icon={Check} size={10} strokeWidth={2.5} /> : number}
                </span>
                <span className="min-w-0 pt-px">
                  <span className={cn(
                    'block text-[9.5px] font-semibold leading-[1.25] sm:text-[10.5px]',
                    current ? 'text-primary-strong' : complete ? 'text-ink-2' : 'text-ink-3',
                  )}>{t(label)}</span>
                  {current && <span className="mt-0.5 block text-[8.5px] font-medium text-primary sm:text-[9px]">{t('In progress')}</span>}
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </aside>
  )
}

export function MaristanaModel({ stage, name, compact = false }: { stage: number; name: string; compact?: boolean }) {
  const t = useT()
  const [assetAvailable, setAssetAvailable] = useState(true)
  useEffect(() => setAssetAvailable(true), [stage])

  if (compact) {
    return (
      <div className="grid h-28 place-items-center overflow-hidden bg-surface-2/45 px-3">
        {assetAvailable && stage > 0 ? (
          <img
            src={maristanaStageAsset(stage)}
            alt={t('{name}, construction stage {n} of 25').replace('{name}', name).replace('{n}', String(stage))}
            className="size-full object-cover"
            onError={() => setAssetAvailable(false)}
          />
        ) : stage > 0 ? (
          <BlueprintHospital stage={stage} />
        ) : (
          <Icon icon={Building2} size={31} className="text-ink-3" />
        )}
      </div>
    )
  }

  return (
    <div className="grid h-60 grid-cols-[7.5rem_minmax(0,1fr)] overflow-hidden bg-surface-2/45 sm:h-[31rem] sm:grid-cols-[11.5rem_minmax(0,1fr)] xl:h-[36rem]">
      <BuildRoadmap stage={stage} />
      <div className="relative h-full min-w-0 overflow-hidden bg-surface-2/45">
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 p-3 sm:p-4">
          <span className="inline-flex items-center gap-2 rounded-md border border-line bg-surface/90 px-2.5 py-1.5 text-[10px] font-semibold text-ink-2 shadow-panel backdrop-blur-sm sm:text-[11px]">
            <Icon icon={Box} size={13} /> {t('Stage')} {String(stage).padStart(2, '0')}/25
          </span>
          <span className="hidden max-w-[42%] truncate rounded-md bg-surface/75 px-2 py-1 font-mono text-[9.5px] text-ink-3 backdrop-blur-sm sm:block">{name}</span>
        </div>

        {assetAvailable && stage > 0 ? (
          <img
            key={stage}
            src={maristanaStageAsset(stage)}
            alt={t('{name}, construction stage {n} of 25').replace('{name}', name).replace('{n}', String(stage))}
            className="absolute inset-0 size-full object-contain"
            onError={() => setAssetAvailable(false)}
          />
        ) : (
          <div className="absolute inset-0 flex items-end px-3 pb-7 pt-14 sm:px-8 sm:pb-9">
            <BlueprintHospital stage={stage} />
          </div>
        )}

        {!assetAvailable && (
          <div className="absolute bottom-3 start-3 rounded-md border border-line bg-surface/90 px-2.5 py-1.5 text-[10.5px] text-ink-3 shadow-panel backdrop-blur-sm">
            {t('Blueprint preview · 3D asset pending')}
          </div>
        )}
      </div>
    </div>
  )
}
