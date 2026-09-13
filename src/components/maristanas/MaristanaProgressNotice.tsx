import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Building2, Check, Hammer } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Panel } from '@/components/ui/Panel'
import { maristanaProgressDelta, type MaristanaOverview, type MaristanaProgressDelta } from '@/data/maristanas'
import { useMaristanas } from '@/lib/useMaristanas'
import { cn } from '@/lib/cn'
import { useT } from '@/lib/i18n'

interface VisibleProgress extends MaristanaProgressDelta {
  sequence: number
}

/**
 * A global acknowledgement for real construction credit. The server ledger is
 * the source of truth; the first response establishes a baseline and is never
 * presented as newly earned work.
 */
export function MaristanaProgressNotice() {
  const t = useT()
  const { data } = useMaristanas()
  const previous = useRef<MaristanaOverview | null>(null)
  const mergeUntil = useRef(0)
  const leaveTimer = useRef<number | null>(null)
  const finishTimer = useRef<number | null>(null)
  const sequence = useRef(0)
  const [notice, setNotice] = useState<VisibleProgress | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!data) return
    const earlier = previous.current
    previous.current = data
    if (!earlier) return
    const delta = maristanaProgressDelta(earlier, data)
    if (!delta) return

    const now = Date.now()
    sequence.current += 1
    setNotice((current) => ({
      ...delta,
      earnedCredits: current && now < mergeUntil.current
        ? current.earnedCredits + delta.earnedCredits
        : delta.earnedCredits,
      sequence: sequence.current,
    }))
    mergeUntil.current = now + 2_000
    setVisible(true)

    if (leaveTimer.current != null) window.clearTimeout(leaveTimer.current)
    if (finishTimer.current != null) window.clearTimeout(finishTimer.current)
    leaveTimer.current = window.setTimeout(() => setVisible(false), 4_800)
    finishTimer.current = window.setTimeout(() => setNotice(null), 5_080)
  }, [data])

  useEffect(() => () => {
    if (leaveTimer.current != null) window.clearTimeout(leaveTimer.current)
    if (finishTimer.current != null) window.clearTimeout(finishTimer.current)
  }, [])

  if (!notice) return null
  const percent = Math.round(Math.max(0, Math.min(1, notice.stepProgress)) * 100)
  const title = notice.hospitalCompleted
    ? t('A Maristana is complete')
    : notice.stepsPlaced > 0
      ? `${notice.stepsPlaced} ${notice.stepsPlaced === 1 ? t('new part placed') : t('new parts placed')}`
      : t('Your Maristana is taking shape')

  return createPortal(
    <div
      key={notice.sequence}
      role="status"
      aria-live="polite"
      className={cn(
        'fixed inset-x-3 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-[75] mx-auto max-w-[22rem] transition-[opacity,transform] duration-200 ease-[var(--ease-out-quint)] motion-reduce:transition-none sm:inset-x-auto sm:end-5 sm:mx-0 sm:w-[22rem]',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 motion-reduce:translate-y-0',
      )}
    >
      <Panel className="overflow-hidden border-primary-line shadow-pop">
        <div className="flex gap-3.5 p-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary-tint text-primary-strong">
            <Icon icon={notice.hospitalCompleted ? Check : Hammer} size={19} strokeWidth={2.1} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.085em] text-primary-strong">{t('Maristana progress')}</p>
              <p className="tnum font-mono text-[10.5px] font-semibold text-primary-strong">+{notice.earnedCredits.toLocaleString()} {t('credits')}</p>
            </div>
            <p className="mt-1 text-[13.5px] font-semibold tracking-[-0.01em] text-ink">{title}</p>
            <p className="mt-0.5 truncate text-[10.5px] text-ink-3">{notice.hospitalName} · {t('Stage')} {notice.nextStage} {t('of')} 25</p>
            <div className="mt-3" aria-label={t('{n}% toward the next construction part').replace('{n}', String(percent))}>
              <div className="relative h-1.5 overflow-hidden rounded-full bg-inset">
                <div
                  className="absolute inset-0 rounded-full bg-primary transition-transform duration-500 ease-[var(--ease-out-quint)] motion-reduce:transition-none"
                  style={{ transform: `translateX(${percent - 100}%)` }}
                />
              </div>
              <div className="mt-1.5 flex items-center justify-between gap-3 text-[9.5px] text-ink-3">
                <span className="inline-flex items-center gap-1"><Icon icon={Building2} size={11} /> {t('Next part')}</span>
                <span className="tnum font-mono">{notice.creditsToNextStep.toLocaleString()} {t('credits left')}</span>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </div>,
    document.body,
  )
}
