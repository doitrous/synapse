import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpenText, Building2, Check, GraduationCap, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { SystemMark } from '@/components/ui/SystemMark'
import { cn } from '@/lib/cn'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { usePlanCatalog } from '@/lib/usePlanCatalog'
import { universities as seededUniversities } from '@/data/universities'
import { usePersistentState } from '@/lib/usePersistentState'
import { SELF_AUDIENCE_STORAGE_KEY, useIdentity, type SelfDeclaredAudience } from '@/lib/useIdentity'
import { useT } from '@/lib/i18n'
import { formatShare } from '@/data/moduleSubjects'
import { priceAt, say, type CatalogPlan } from '@/data/planCatalog'
import {
  ONBOARDING_STORAGE_KEY, TRIAL_DAYS, liveUniversities, liveYears, offeredPlans,
  onboardingComplete, planSelectable, trialFor, yearModules,
  type OnboardingAnswers, type TrialGrant,
} from '@/data/onboarding'

/**
 * The three questions a new student is asked, in the order the answers depend
 * on each other.
 *
 * This replaced a dismissible modal that asked for a university and a year and
 * offered "Not now" beside them. Nothing else in the app works without those
 * two — the timetable, the scoped library, the question bank all match nothing
 * — so the way past it was the reason accounts existed with every surface
 * empty. It is now a step at a time, with no way to skip and nothing lost if
 * the tab is closed halfway.
 *
 * Only live universities and years are offered, through the same `isYearLive`
 * the voucher rules read: a place that cannot take a voucher cannot take a
 * registration either.
 */

interface StoredOnboarding {
  answers: Partial<OnboardingAnswers>
  trial?: TrialGrant
  completedAt?: string
}

const EMPTY: StoredOnboarding = { answers: {} }

function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={cn('h-1.5 rounded-full transition-all', index === step ? 'w-6 bg-accent' : index < step ? 'w-1.5 bg-accent/50' : 'w-1.5 bg-line-2')}
        />
      ))}
    </div>
  )
}

export function StudentOnboarding() {
  const t = useT()
  const { audienceUnknown, status } = useIdentity()
  const [configured] = useUniversityCatalogue()
  const [catalog] = usePlanCatalog()
  const [stored, setStored] = usePersistentState<StoredOnboarding>(ONBOARDING_STORAGE_KEY, EMPTY)
  const [, setAudience] = usePersistentState<SelfDeclaredAudience | null>(SELF_AUDIENCE_STORAGE_KEY, null)

  const [step, setStep] = useState(0)
  const [universityId, setUniversityId] = useState(() => stored.answers.universityId ?? '')
  const [yearId, setYearId] = useState(() => stored.answers.yearId ?? '')
  const [planId, setPlanId] = useState(() => stored.answers.planId ?? '')
  const [group, setGroup] = useState('')

  // An admin-configured catalogue is the real list; the seeded schools stand in
  // when none has been set up yet, so this is never an empty screen.
  const catalogue = configured.length ? configured : seededUniversities
  const universities = useMemo(() => liveUniversities(catalogue), [catalogue])
  const university = universities.find((entry) => entry.id === universityId)
  const years = useMemo(() => (university ? liveYears(university) : []), [university])
  const year = years.find((entry) => entry.id === yearId)
  const modules = useMemo(() => (year ? yearModules(year) : []), [year])
  const plans = useMemo(
    () => offeredPlans(catalog, { universityId, year: year?.year }),
    [catalog, universityId, year],
  )

  if (status === 'loading' || !audienceUnknown || stored.completedAt) return null

  function finish() {
    const answers = { universityId, yearId, planId }
    if (!onboardingComplete(answers) || !university || !year) return
    setAudience({ universityId: university.id, year: year.year, group: group.trim() })
    setStored({
      answers,
      trial: trialFor(answers.planId, new Date()),
      completedAt: new Date().toISOString(),
    })
  }

  /** Remember the answers so far, so closing the tab does not undo them. */
  const remember = (answers: Partial<OnboardingAnswers>) =>
    setStored((current) => ({ ...current, answers: { ...current.answers, ...answers } }))

  const canContinue = [Boolean(university), Boolean(year), Boolean(planId)][step]

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-paper" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
      <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col px-5 py-8 sm:py-12">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-tint text-accent-strong">
            <Icon icon={[Building2, GraduationCap, Sparkles][step]} size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <h1 id="onboarding-title" className="font-serif text-[22px] font-semibold text-ink">
              {[t('Where do you study?'), t('Which year are you in?'), t('Choose your plan')][step]}
            </h1>
            <p className="mt-0.5 text-[13px] text-ink-2">
              {[
                t('This decides which timetable and which content you see.'),
                t('Your year decides the modules you are taught, and what your timetable shows.'),
                t('Every new account starts with {days} days of full access.').replace('{days}', String(TRIAL_DAYS)),
              ][step]}
            </p>
          </div>
          <StepDots step={step} total={3} />
        </div>

        <div className="mt-7 flex-1">
          {step === 0 && (
            <ul className="grid gap-2 sm:grid-cols-2">
              {universities.map((entry) => (
                <li key={entry.id}>
                  <button
                    type="button"
                    onClick={() => { setUniversityId(entry.id); setYearId(''); remember({ universityId: entry.id }) }}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl border p-3.5 text-start transition-colors',
                      universityId === entry.id ? 'border-accent bg-accent-tint/50' : 'border-line bg-surface hover:bg-inset',
                    )}
                  >
                    <span className={cn('grid size-9 shrink-0 place-items-center rounded-lg text-[11px] font-bold', universityId === entry.id ? 'bg-accent text-on-accent' : 'bg-inset text-ink-2')}>{entry.short}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-medium text-ink">{entry.name}</span>
                      <span className="block truncate text-[11.5px] text-ink-3">{entry.region}</span>
                    </span>
                    {universityId === entry.id && <Icon icon={Check} size={16} className="shrink-0 text-accent-strong" />}
                  </button>
                </li>
              ))}
              {universities.length === 0 && (
                <li className="rounded-xl border border-dashed border-line p-6 text-center text-[13px] text-ink-2 sm:col-span-2">
                  {t('No universities are open for registration yet.')}
                </li>
              )}
            </ul>
          )}

          {step === 1 && (
            <>
              <ul className="grid gap-2 sm:grid-cols-3">
                {years.map((entry) => (
                  <li key={entry.id}>
                    <button
                      type="button"
                      onClick={() => { setYearId(entry.id); remember({ yearId: entry.id }) }}
                      className={cn(
                        'w-full rounded-xl border p-3 text-center transition-colors',
                        yearId === entry.id ? 'border-accent bg-accent-tint/50 text-accent-strong' : 'border-line bg-surface text-ink hover:bg-inset',
                      )}
                    >
                      <span className="block text-[13.5px] font-medium">{entry.year}</span>
                      <span className="mt-0.5 block text-[11.5px] text-ink-3">
                        {entry.courses.length} {entry.courses.length === 1 ? t('module') : t('modules')}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* What they are signing up to study, before they choose a plan. */}
              {year && (
                <div className="mt-5 rounded-xl border border-line bg-surface-2/40 p-4">
                  <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-3">
                    <Icon icon={BookOpenText} size={14} />
                    {t('What you will study')}
                  </p>
                  {modules.length === 0 ? (
                    <p className="mt-2 text-[12.5px] text-ink-2">{t('Your university has not published this year’s modules yet.')}</p>
                  ) : (
                    <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
                      {modules.map((entry) => (
                        <li key={entry.id} className="flex items-center gap-2 rounded-lg bg-surface px-2.5 py-2">
                          <SystemMark moduleId={entry.id} size="sm" />
                          <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink">{entry.name}</span>
                          <span className="shrink-0 text-[11px] text-ink-3">{entry.term}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <Field label={t('Group')} htmlFor="onboarding-group" hint={t('Optional — your clinical or tutorial group, if you have one.')} className="mt-5 max-w-xs">
                <TextInput id="onboarding-group" value={group} onChange={(event) => setGroup(event.target.value)} maxLength={24} />
              </Field>
            </>
          )}

          {step === 2 && (
            <ul className="grid gap-2.5">
              {plans.map((plan) => (
                <PlanChoice
                  key={plan.id}
                  plan={plan}
                  selected={planId === plan.id}
                  selectable={planSelectable(catalog, plan)}
                  price={priceAt(plan, catalog.periods[0]?.id ?? '', catalog.periods)}
                  onChoose={() => { setPlanId(plan.id); remember({ planId: plan.id }) }}
                />
              ))}
              {plans.length === 0 && (
                <li className="rounded-xl border border-dashed border-line p-6 text-center text-[13px] text-ink-2">
                  {t('No plans are available for your year yet.')}
                </li>
              )}
            </ul>
          )}
        </div>

        <div className="mt-8 flex items-center gap-2 border-t border-line pt-5">
          {step > 0 && (
            <Button type="button" variant="ghost" iconLeft={ArrowLeft} onClick={() => setStep((current) => current - 1)}>
              {t('Back')}
            </Button>
          )}
          <span className="ms-auto text-[12px] text-ink-3">{t('Step')} {step + 1} / 3</span>
          {step < 2 ? (
            <Button type="button" variant="primary" iconRight={ArrowRight} disabled={!canContinue} onClick={() => setStep((current) => current + 1)}>
              {t('Continue')}
            </Button>
          ) : (
            <Button type="button" variant="primary" iconLeft={Check} disabled={!canContinue} onClick={finish}>
              {t('Start studying')}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function PlanChoice({ plan, selected, selectable, price, onChoose }: {
  plan: CatalogPlan
  selected: boolean
  selectable: boolean
  price: { amount: number; period: { id: string; label: { en: string; ar: string } } } | null
  onChoose: () => void
}) {
  const t = useT()
  return (
    <li>
      <button
        type="button"
        onClick={selectable ? onChoose : undefined}
        aria-disabled={!selectable}
        className={cn(
          'flex w-full flex-wrap items-center gap-3 rounded-xl border p-4 text-start transition-colors',
          !selectable && 'cursor-default border-line bg-inset/50 opacity-70',
          selectable && (selected ? 'border-accent bg-accent-tint/50' : 'border-line bg-surface hover:bg-inset'),
        )}
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-[14.5px] font-semibold text-ink">{say(plan.name, 'en')}</span>
            {plan.badge && <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.05em] text-on-accent">{say(plan.badge, 'en')}</span>}
            {!selectable && <span className="rounded-full border border-line-2 bg-inset px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.05em] text-ink-3">{t('Coming soon')}</span>}
          </span>
          <span className="mt-1 block text-[12.5px] leading-relaxed text-ink-2">{say(plan.entitlement, 'en')}</span>
        </span>
        <span className="tnum shrink-0 text-end font-mono text-[15px] font-semibold text-ink">
          {price ? (price.amount === 0 ? t('Free') : `EGP ${price.amount}`) : formatShare(null)}
          {price && price.amount > 0 && <span className="ms-1 text-[11px] font-normal text-ink-3">/ {say(price.period.label, 'en')}</span>}
        </span>
        {selected && <Icon icon={Check} size={18} className="shrink-0 text-accent-strong" />}
      </button>
    </li>
  )
}
