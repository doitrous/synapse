import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Award, Check, LockKeyhole } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Panel } from '@/components/ui/Panel'
import { MARISTANA_MILESTONES, maristanaStageAsset, type MaristanaMilestone } from '@/data/maristanas'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

export function MaristanaAchievementRail({ stage }: { stage: number }) {
  const t = useT()
  const earned = MARISTANA_MILESTONES.filter((milestone) => milestone.stage <= stage).length

  return (
    <section className="mt-6" aria-labelledby="maristana-achievements-title">
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.085em] text-ink-3">{t('Visible progress')}</p>
          <h2 id="maristana-achievements-title" className="mt-1 font-serif text-[22px] font-semibold tracking-[-0.02em] text-ink">{t('Construction achievements')}</h2>
        </div>
        <p className="tnum font-mono text-[11px] text-ink-3">{earned} / {MARISTANA_MILESTONES.length} {t('earned')}</p>
      </div>

      <Panel className="overflow-hidden">
        <ol className="-mx-px flex snap-x overflow-x-auto md:grid md:grid-cols-3 md:overflow-visible xl:grid-cols-6">
          {MARISTANA_MILESTONES.map((milestone, index) => {
            const unlocked = milestone.stage <= stage
            const current = unlocked && !MARISTANA_MILESTONES.some((candidate) => candidate.stage > milestone.stage && candidate.stage <= stage)
            return (
              <li
                key={milestone.stage}
                aria-label={`${t(milestone.title)}, ${unlocked ? t('earned') : t('unlocks at stage {n}').replace('{n}', String(milestone.stage))}`}
                className={cn(
                  'min-w-[172px] snap-start border-line md:min-w-0',
                  index > 0 && 'border-s',
                  index > 2 && 'md:border-t xl:border-t-0',
                  index === 3 && 'md:border-s-0 xl:border-s',
                  current ? 'bg-primary-tint/35' : unlocked ? 'bg-surface' : 'bg-surface-2/30',
                )}
              >
                <div className="relative h-24 overflow-hidden border-b border-line bg-surface-2">
                  <img
                    src={maristanaStageAsset(milestone.stage)}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className={cn('size-full object-cover transition-[filter,opacity] duration-200', !unlocked && 'grayscale opacity-45')}
                  />
                  <span className={cn(
                    'absolute end-2 top-2 grid size-7 place-items-center rounded-md border bg-surface/90 font-mono text-[10px] font-semibold shadow-panel backdrop-blur-sm',
                    unlocked ? 'border-success/25 text-success' : 'border-line text-ink-3',
                  )}>
                    {unlocked ? <Icon icon={Check} size={13} /> : milestone.stage}
                  </span>
                </div>
                <div className="p-3.5">
                  <div className="flex items-center gap-2">
                    <Icon icon={unlocked ? Award : LockKeyhole} size={14} className={unlocked ? 'text-primary-strong' : 'text-ink-3'} />
                    <p className="truncate text-[12px] font-semibold text-ink">{t(milestone.title)}</p>
                  </div>
                  <p className="mt-1.5 text-pretty text-[10.5px] leading-relaxed text-ink-3">{t(milestone.description)}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </Panel>
    </section>
  )
}

export function MaristanaAchievementToast({
  milestone,
  hospitalName,
  onClose,
}: {
  milestone: MaristanaMilestone
  hospitalName: string
  onClose: () => void
}) {
  const t = useT()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const enter = requestAnimationFrame(() => setVisible(true))
    const leave = window.setTimeout(() => setVisible(false), 3_600)
    const finish = window.setTimeout(onClose, 3_900)
    return () => {
      cancelAnimationFrame(enter)
      window.clearTimeout(leave)
      window.clearTimeout(finish)
    }
  }, [onClose])

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'fixed inset-x-3 top-[calc(4.5rem+env(safe-area-inset-top))] z-[80] mx-auto max-w-sm transition-[opacity,transform] duration-250 ease-[var(--ease-out-quint)] motion-reduce:transition-none sm:inset-x-auto sm:end-5 sm:mx-0',
        visible ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-2 scale-[0.98] opacity-0 motion-reduce:translate-y-0 motion-reduce:scale-100',
      )}
    >
      <Panel className="overflow-hidden border-primary-line shadow-pop">
        <div className="flex gap-3.5 p-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-tint text-primary-strong">
            <Icon icon={Award} size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.085em] text-primary-strong">{t('Achievement earned')}</p>
              <span className="tnum font-mono text-[10px] text-ink-3">{t('Stage')} {milestone.stage}/25</span>
            </div>
            <p className="mt-1 font-serif text-[18px] font-semibold tracking-[-0.015em] text-ink">{t(milestone.title)}</p>
            <p className="mt-0.5 truncate text-[11px] text-ink-2">{hospitalName} · {t(milestone.description)}</p>
          </div>
        </div>
        <div className="h-1 bg-primary" />
      </Panel>
    </div>,
    document.body,
  )
}
