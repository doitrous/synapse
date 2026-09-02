import { useMemo } from 'react'
import { CircleCheck } from 'lucide-react'
import type { Skill } from '@/data/practical'
import { skills } from '@/data/practical'
import { summariseSkills, type SkillStatus } from '@/data/practicalProgress'
import { usePracticalProgress } from '@/lib/usePracticalProgress'
import { useRelativeTime } from '@/lib/useRelativeTime'
import { EmptyState } from '@/components/ui/EmptyState'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { useT } from '@/lib/i18n'

/** The next state each tap moves a skill to, cycling through the three. */
const NEXT_STATUS: Record<SkillStatus, SkillStatus> = {
  'not-started': 'practised',
  practised: 'ready',
  ready: 'not-started',
}

const STATUS_LABEL: Record<SkillStatus, string> = {
  'not-started': 'Not started',
  practised: 'Practised',
  ready: 'Ready',
}

function SkillRow({ skill, status, onCycle }: { skill: Skill; status: SkillStatus; onCycle: () => void }) {
  const t = useT()
  return (
    <li>
      <button
        type="button"
        onClick={onCycle}
        className="flex min-h-11 w-full items-center gap-3 border-b border-line px-4 py-2.5 text-start transition-colors last:border-b-0 hover:bg-inset sm:min-h-0"
        aria-label={`${skill.name} — ${t(STATUS_LABEL[status])}. ${t('Change')}`}
      >
        <span className="flex-1 text-[13px] text-ink">{skill.name}</span>
        <Badge tone={status === 'ready' ? 'success' : status === 'practised' ? 'accent' : 'neutral'}>
          {t(STATUS_LABEL[status]).toUpperCase()}
        </Badge>
      </button>
    </li>
  )
}

/** A small ring showing `value`/`total` as an arc, matching the artboard's summary dial. */
function ProgressRing({ value, total, size = 76 }: { value: number; total: number; size?: number }) {
  const r = size / 2 - 7
  const circumference = 2 * Math.PI * r
  const frac = total ? value / total : 0
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
      >
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={7} className="stroke-inset" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={7}
          strokeLinecap="round"
          className="stroke-success transition-[stroke-dasharray] duration-500"
          strokeDasharray={`${frac * circumference} ${circumference}`}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="tnum font-mono text-[16px] font-semibold text-ink">
          {value}
          <span className="text-[11px] font-medium text-ink-3">/{total}</span>
        </span>
      </div>
    </div>
  )
}

/**
 * The year's skills checklist, marked by the student.
 *
 * This tab previously had no interactive element at all: it rendered twelve
 * skills with six sign-offs attributed to named clinicians and dates, under a
 * headline claiming "14 / 22 signed off". A student can now record what they
 * have practised and what they are ready to be assessed on — and the copy is
 * explicit that this is their own record, not a sign-off, because no assessor
 * identity exists in Maristana to give one.
 *
 * `onGoToOsce` is how the two non-communication categories offer somewhere to
 * practise: the checklist records readiness, the stations are where it is
 * earned, and the page that mounts this decides where that link goes.
 */
export function SkillsChecklist({ onGoToOsce }: { onGoToOsce: () => void }) {
  const t = useT()
  const relativeTime = useRelativeTime()
  const categories = ['Examination', 'Procedures', 'Communication'] as const
  const { progress, markSkill } = usePracticalProgress()
  const summary = summariseSkills(progress, skills.length)
  const readyPct = summary.total ? (summary.ready / summary.total) * 100 : 0
  const practisedOnlyPct = summary.total ? ((summary.practised - summary.ready) / summary.total) * 100 : 0

  const lastAt = useMemo(() => {
    const stamps = Object.values(progress.skills).map((s) => s.lastAt)
    return stamps.length ? stamps.sort().at(-1) : undefined
  }, [progress.skills])

  if (!skills.length) {
    return <Panel className="p-8"><EmptyState icon={CircleCheck} title={t('No skills checklist yet')} description={t("The year's skills checklist appears here once it has been set up.")} /></Panel>
  }

  return (
    <div className="space-y-4">
      <p className="text-[11.5px] text-ink-3">{t('Tap a skill to cycle: not started → practised → ready.')}</p>

      <Panel className="flex flex-wrap items-center gap-5 p-4">
        <ProgressRing value={summary.ready} total={summary.total} />
        <div className="min-w-[220px] flex-1">
          <p className="font-serif text-[15px] font-semibold text-ink">{t('Skills you have marked ready')}</p>
          <p className="mt-0.5 text-[12px] text-ink-3">
            {t('{n} still to go').replace('{n}', String(summary.total - summary.ready))}
            {' · '}
            {t('{n} practised so far').replace('{n}', String(summary.practised - summary.ready))}
            {lastAt ? ` · ${t('updated {time}').replace('{time}', relativeTime(lastAt))}` : ''}
          </p>
          <div className="mt-2 flex h-2 w-full max-w-md overflow-hidden rounded-full bg-inset">
            <span className="h-full bg-success" style={{ width: `${readyPct}%` }} />
            <span className="h-full bg-accent" style={{ width: `${practisedOnlyPct}%` }} />
          </div>
        </div>
        <p className="max-w-[260px] rounded-lg border border-dashed border-line-2 bg-surface-2/40 px-3.5 py-2.5 text-[11px] leading-relaxed text-ink-3">
          {t('This is your own record for planning revision — a formal sign-off is given by an assessor and is not recorded here.')}
        </p>
      </Panel>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const items = skills.filter((s) => s.category === cat)
          if (items.length === 0) return null
          const readyInCat = items.filter((s) => progress.skills[s.id]?.status === 'ready').length
          const suggestion = items.find((s) => (progress.skills[s.id]?.status ?? 'not-started') !== 'ready')

          return (
            <Panel key={cat} className="flex flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                {/* `cat` stays the raw English category: it is the key, and it is
                    what `skill.category` is compared against. Only the heading
                    is translated. */}
                <p className="text-[13px] font-semibold text-ink">{t(cat)}</p>
                <span className="tnum font-mono text-[11px] text-ink-3">
                  {t('{n} of {total} ready').replace('{n}', String(readyInCat)).replace('{total}', String(items.length))}
                </span>
              </div>
              <ul>
                {items.map((skill) => {
                  const status = progress.skills[skill.id]?.status ?? 'not-started'
                  return (
                    <SkillRow
                      key={skill.id}
                      skill={skill}
                      status={status}
                      onCycle={() => markSkill(skill.id, NEXT_STATUS[status])}
                    />
                  )
                })}
              </ul>
              <div className="mt-auto border-t border-line px-4 py-2.5">
                {cat === 'Communication' ? (
                  suggestion ? (
                    <>
                      <p className="text-[10.5px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Suggested next')}</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-ink-2">
                        <span className="font-medium text-ink">{suggestion.name}</span>
                        {' — '}
                        {t('practise this to close the gap.')}
                      </p>
                    </>
                  ) : (
                    <p className="text-[11.5px] text-success">{t('All communication skills are marked ready.')}</p>
                  )
                ) : (
                  <button
                    type="button"
                    onClick={onGoToOsce}
                    className="inline-flex min-h-11 items-center text-[11px] font-medium text-primary hover:text-primary-hover sm:min-h-0"
                  >
                    {t('Practise in OSCE stations →')}
                  </button>
                )}
              </div>
            </Panel>
          )
        })}
      </div>
    </div>
  )
}
