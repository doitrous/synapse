import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpenText, Building2, Check, CreditCard, GraduationCap, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { SystemMark } from '@/components/ui/SystemMark'
import { cn } from '@/lib/cn'
import { useUniversityCatalogue } from '@/lib/useUniversityCatalogue'
import { usePlanCatalog } from '@/lib/usePlanCatalog'
import { universities as seededUniversities } from '@/data/universities'
import { useIdentity } from '@/lib/useIdentity'
import { supabase } from '@/lib/supabase'
import { API_MODE, apiPut } from '@/lib/api'
import { usePersistentState } from '@/lib/usePersistentState'
import { useT } from '@/lib/i18n'
import { formatShare } from '@/data/moduleSubjects'
import { priceAt, say, type CatalogPlan } from '@/data/planCatalog'
import { ProfileIconGlyph } from '@/components/ui/ProfileIconGlyph'
import { DEFAULT_PROFILE_ICON, PROFILE_ICONS, normaliseUsername, usernameProblem } from '@/data/profileIcons'
import {
  TRIAL_DAYS, liveUniversities, liveYears, offeredPlans, planSelectable, yearModules,
} from '@/data/onboarding'

interface StudentProfileDraft {
  username: string
  iconId: string
}

const PROFILE_STORAGE_KEY = 'nishany.account.profile.v1'

/**
 * The three questions a new student is asked, in the order the answers depend
 * on each other.
 *
 * Nothing else in the app works without a university and a year — the
 * timetable, the scoped library and the question bank all match nothing — so
 * there is no way past this and nothing here is optional.
 *
 * Two things about *when* it appears matter as much as what it asks:
 *
 *  - It waits for the account to load. It used to render the moment identity
 *    resolved, while the record of where the student studies was still in
 *    flight, so a student who had already answered was asked again — and
 *    answering differently is how one account ended up showing two different
 *    enrolled years in two browsers.
 *  - Whether it has been answered is read from the account itself, not from a
 *    "completed" flag in a browser document. The flag lived in the shared
 *    catalogue store, which no student may write; every save was refused, so
 *    nothing was ever recorded and only the enrolment happening to be present
 *    kept the screen away.
 *
 * Only live universities and years are offered, through the same `isYearLive`
 * the voucher rules read: a place that cannot take a voucher cannot take a
 * registration either.
 */

function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={cn('h-1.5 rounded-full transition-[width,background-color]', index === step ? 'w-6 bg-primary' : index < step ? 'w-1.5 bg-primary/50' : 'w-1.5 bg-line-2')}
        />
      ))}
    </div>
  )
}

export function StudentOnboarding() {
  const t = useT()
  const { audienceSettled, audienceUnknown, status, saveEnrolment } = useIdentity()
  const [configured, , catalogueStatus] = useUniversityCatalogue()
  const [catalog] = usePlanCatalog()

  const [step, setStep] = useState(0)
  const [universityId, setUniversityId] = useState('')
  const [yearId, setYearId] = useState('')
  const [planId, setPlanId] = useState('')
  const [group, setGroup] = useState('')
  const [profileDraft, setProfileDraft] = usePersistentState<StudentProfileDraft>(PROFILE_STORAGE_KEY, { username: '', iconId: DEFAULT_PROFILE_ICON })
  const [username, setUsername] = useState(profileDraft.username)
  const [iconId, setIconId] = useState(profileDraft.iconId || DEFAULT_PROFILE_ICON)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

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
  const cleanUsername = normaliseUsername(username)
  const profileError = usernameProblem(username)
  const steps = [
    {
      title: t('Where do you study?'),
      description: t('This decides which timetable and which content you see.'),
      icon: Building2,
    },
    {
      title: t('Which year are you in?'),
      description: t('Your year decides the modules you are taught, and what your timetable shows.'),
      icon: GraduationCap,
    },
    {
      title: t('Choose your profile'),
      description: t('Your username and icon are what classmates see if you opt in to discovery later.'),
      icon: UserRound,
    },
    {
      title: t('Choose your plan'),
      description: t('Every new account starts with {days} days of full access.').replace('{days}', String(TRIAL_DAYS)),
      icon: CreditCard,
    },
  ]

  // Nothing is decided until the account has answered for itself, and the
  // catalogue this screen offers has arrived. Rendering earlier means asking a
  // student who has already answered, and there is no way to un-ask it.
  if (status === 'loading') return null
  if (status === 'anonymous') return null
  // Not merely "identity has resolved": the account's own answer may still be
  // arriving. Asking a student who has already answered cannot be taken back.
  if (!audienceSettled) return null
  if (!audienceUnknown) return null
  // A catalogue that cannot be read is not a reason to withhold the screen —
  // the seeded list stands in — but one still on its way is.
  if (!catalogueStatus.hydrated && !catalogueStatus.error) return null

  async function finish() {
    if (!university || !year || !planId || profileError) return
    setError('')
    setSaving(true)
    try {
      const profilePayload = { username: cleanUsername, iconId }
      setProfileDraft(profilePayload)
      if (API_MODE) {
        try {
          await apiPut('/me/profile', profilePayload)
        } catch {
          // The planned server endpoint owns case-insensitive uniqueness. Older
          // backends do not have it yet; onboarding can still preserve the
          // choice locally while the deployment catches up.
        }
      }
      // Sign-up put the name, phone and nationality in Supabase user metadata,
      // where the server never sees them. This is the first request that can
      // carry them across, and it is also what finally gives the phone-number
      // uniqueness check a row to compare against.
      const metadata = (await supabase?.auth.getUser())?.data.user?.user_metadata as
        { full_name?: string; name?: string; phone?: string; nationality?: string } | undefined
      await saveEnrolment({
        universityId: university.id,
        year: year.year,
        group: group.trim(),
        plan: planId,
        name: metadata?.full_name || metadata?.name,
        phone: metadata?.phone,
        nationality: metadata?.nationality,
      })
    } catch {
      setSaving(false)
      setError(t('That could not be saved. Check your connection and try again — nothing has been lost.'))
    }
  }

  const canContinue = [Boolean(university), Boolean(year), !profileError, Boolean(planId)][step]

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-paper" role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
      <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col px-5 py-8 sm:py-12">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-tint text-primary-strong">
            <Icon icon={steps[step].icon} size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <h1 id="onboarding-title" className="font-serif text-[22px] font-semibold text-ink">
              {steps[step].title}
            </h1>
            <p className="mt-0.5 text-[13px] text-ink-2">
              {steps[step].description}
            </p>
          </div>
          <StepDots step={step} total={steps.length} />
        </div>

        <div className="mt-7 flex-1">
          {step === 0 && (
            <ul className="grid gap-2 sm:grid-cols-2">
              {universities.map((entry) => (
                <li key={entry.id}>
                  <button
                    type="button"
                    onClick={() => { setUniversityId(entry.id); setYearId('') }}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl border p-3.5 text-start transition-colors',
                      universityId === entry.id ? 'border-primary bg-primary-tint/50' : 'border-line bg-surface hover:bg-inset',
                    )}
                  >
                    <span className={cn('grid size-9 shrink-0 place-items-center rounded-lg text-[11px] font-bold', universityId === entry.id ? 'bg-primary text-on-primary' : 'bg-inset text-ink-2')}>{entry.short}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-medium text-ink">{entry.name}</span>
                      <span className="block truncate text-[11.5px] text-ink-3">{entry.region}</span>
                    </span>
                    {universityId === entry.id && <Icon icon={Check} size={16} className="shrink-0 text-primary-strong" />}
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
                      onClick={() => setYearId(entry.id)}
                      className={cn(
                        'w-full rounded-xl border p-3 text-center transition-colors',
                        yearId === entry.id ? 'border-primary bg-primary-tint/50 text-primary-strong' : 'border-line bg-surface text-ink hover:bg-inset',
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
            <div className="space-y-5">
              <Field
                label={t('Username')}
                htmlFor="onboarding-username"
                hint={t('Usernames are unique inside your university. The server rechecks this before approval.')}
              >
                <TextInput
                  id="onboarding-username"
                  value={username}
                  maxLength={24}
                  autoComplete="username"
                  placeholder={t('e.g. cardio-sara')}
                  onChange={(event) => setUsername(event.target.value)}
                  aria-describedby="onboarding-username-preview onboarding-username-error"
                />
              </Field>
              <div className="rounded-lg border border-line bg-surface-2/55 px-3.5 py-3">
                <p id="onboarding-username-preview" className="text-[12.5px] text-ink-2">
                  {t('Preview')}: <span className="font-mono font-semibold text-ink">@{cleanUsername || t('username')}</span>
                </p>
                {profileError && (
                  <p id="onboarding-username-error" role="alert" className="mt-1 text-[11.5px] text-danger">
                    {t(profileError)}
                  </p>
                )}
              </div>

              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-ink-3">{t('Profile icon')}</p>
                <ul className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {PROFILE_ICONS.map((entry) => (
                    <li key={entry.id}>
                      <button
                        type="button"
                        onClick={() => setIconId(entry.id)}
                        aria-pressed={iconId === entry.id}
                        className={cn(
                          'flex w-full flex-col items-center gap-2 rounded-xl border p-3 text-center transition-colors',
                          iconId === entry.id ? 'border-primary bg-primary-tint/50 text-primary-strong' : 'border-line bg-surface text-ink-2 hover:bg-inset hover:text-ink',
                        )}
                      >
                        <ProfileIconGlyph id={entry.id} className="size-7" />
                        <span className="text-[10.5px] font-medium">{t(entry.label)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-[12px] leading-relaxed text-ink-3">
                  {t('Discovery is off by default. This profile is private unless you later opt in from Account.')}
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <ul className="grid gap-2.5">
              {plans.map((plan) => (
                <PlanChoice
                  key={plan.id}
                  plan={plan}
                  selected={planId === plan.id}
                  selectable={planSelectable(catalog, plan)}
                  price={priceAt(plan, catalog.periods[0]?.id ?? '', catalog.periods)}
                  onChoose={() => setPlanId(plan.id)}
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

        {error && (
          <p role="alert" className="mt-5 rounded-lg border border-danger/30 bg-danger-tint px-3.5 py-3 text-[12.5px] text-danger">{error}</p>
        )}

        <div className="mt-8 flex items-center gap-2 border-t border-line pt-5">
          {step > 0 && (
            <Button type="button" variant="ghost" iconLeft={ArrowLeft} onClick={() => setStep((current) => current - 1)}>
              {t('Back')}
            </Button>
          )}
          <span className="ms-auto text-[12px] text-ink-3">{t('Step')} {step + 1} / {steps.length}</span>
          {step < steps.length - 1 ? (
            <Button type="button" variant="primary" iconRight={ArrowRight} disabled={!canContinue} onClick={() => setStep((current) => current + 1)}>
              {t('Continue')}
            </Button>
          ) : (
            <Button type="button" variant="primary" iconLeft={Check} loading={saving} disabled={!canContinue || saving} onClick={() => void finish()}>
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
          selectable && (selected ? 'border-primary bg-primary-tint/50' : 'border-line bg-surface hover:bg-inset'),
        )}
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-[14.5px] font-semibold text-ink">{say(plan.name, 'en')}</span>
            {plan.badge && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.05em] text-on-primary">{say(plan.badge, 'en')}</span>}
            {!selectable && <span className="rounded-full border border-line-2 bg-inset px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.05em] text-ink-3">{t('Coming soon')}</span>}
          </span>
          <span className="mt-1 block text-[12.5px] leading-relaxed text-ink-2">{say(plan.entitlement, 'en')}</span>
        </span>
        <span className="tnum shrink-0 text-end font-mono text-[15px] font-semibold text-ink">
          {price ? (price.amount === 0 ? t('Free') : `EGP ${price.amount}`) : formatShare(null)}
          {price && price.amount > 0 && <span className="ms-1 text-[11px] font-normal text-ink-3">/ {say(price.period.label, 'en')}</span>}
        </span>
        {selected && <Icon icon={Check} size={18} className="shrink-0 text-primary-strong" />}
      </button>
    </li>
  )
}
