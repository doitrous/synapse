import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Award, BookOpenCheck, Building2, Check, CircleHelp, ClipboardCheck, Clock3, Hammer,
  ListChecks, Pencil, Trophy, WifiOff,
} from 'lucide-react'
import { PageContainer } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { TextInput } from '@/components/ui/Field'
import { EmptyState } from '@/components/ui/EmptyState'
import { Skeleton } from '@/components/ui/Skeleton'
import { MaristanaModel } from '@/components/maristanas/MaristanaModel'
import { MaristanaAchievementRail, MaristanaAchievementToast } from '@/components/maristanas/MaristanaAchievements'
import { MaristanaHowItWorksDialog, MaristanaOnboarding } from '@/components/maristanas/MaristanaOnboarding'
import {
  DEFAULT_MARISTANA_ONBOARDING, MARISTANA_MILESTONES, MARISTANA_ONBOARDING_KEY,
  MARISTANA_STEPS, type MaristanaHospital, type MaristanaMilestone,
} from '@/data/maristanas'
import { useMaristanas } from '@/lib/useMaristanas'
import { usePersistentState } from '@/lib/usePersistentState'
import { useIdentity } from '@/lib/useIdentity'
import { useOnlineStatus } from '@/lib/useOnlineStatus'
import { cn } from '@/lib/cn'
import { formatDateTime } from '@/lib/format'
import { useT } from '@/lib/i18n'

function credit(value: number): string {
  return Math.round(value).toLocaleString()
}

function duration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  if (!hours) return `${rest}m`
  return rest ? `${hours}h ${rest}m` : `${hours}h`
}

/** ArrowLeft to the previous screen, falling back to the dashboard when this
 * is the first entry in the tab's history (a fresh tab, a bookmark, a deep link). */
function BackButton() {
  const t = useT()
  const navigate = useNavigate()
  const handleBack = useCallback(() => {
    const historyIndex = (window.history.state as { idx?: number } | null)?.idx
    if (typeof historyIndex === 'number' && historyIndex > 0) navigate(-1)
    else navigate('/app')
  }, [navigate])
  return (
    <button
      type="button"
      onClick={handleBack}
      className="mb-3 inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 -ms-2 sm:min-h-9 text-[12.5px] font-medium text-ink-2 hover:bg-inset hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
    >
      <Icon icon={ArrowLeft} size={15} className="rtl:-scale-x-100" />
      {t('Back')}
    </button>
  )
}

function ProgressSteps({ stage }: { stage: number }) {
  const t = useT()
  return (
    <ol className="grid grid-cols-[repeat(25,minmax(0,1fr))] gap-1" aria-label={t('{done} of {total} construction steps complete').replace('{done}', String(stage)).replace('{total}', String(MARISTANA_STEPS))}>
      {Array.from({ length: MARISTANA_STEPS }, (_, index) => {
        const number = index + 1
        return (
          <li
            key={number}
            title={number <= stage ? t('Step {n} complete').replace('{n}', String(number)) : t('Step {n}').replace('{n}', String(number))}
            className={cn(
              'h-2 min-w-0 rounded-[2px]',
              number <= stage ? 'bg-primary' : number === stage + 1 ? 'bg-primary-soft/55' : 'bg-inset',
            )}
          />
        )
      })}
    </ol>
  )
}

function BuildLedger({ hospital, creditsPerStep }: { hospital: MaristanaHospital; creditsPerStep: number }) {
  const t = useT()
  const step = Math.min(MARISTANA_STEPS, hospital.stage + (hospital.completed ? 0 : 1))
  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-panel sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.085em] text-primary-strong">{t('Current build')}</p>
          <h3 className="mt-1 font-serif text-[22px] font-semibold tracking-[-0.02em] text-ink">
            {hospital.completed
              ? t('Hospital complete')
              : t('Step {n} of {total}').replace('{n}', String(step)).replace('{total}', String(MARISTANA_STEPS))}
          </h3>
        </div>
        <span className={cn(
          'grid size-10 shrink-0 place-items-center rounded-lg border font-mono text-[12px] font-bold',
          hospital.completed ? 'border-success/25 bg-success-tint text-success' : 'border-primary-line bg-primary-tint text-primary-strong',
        )}>
          {hospital.completed ? <Icon icon={Check} size={18} /> : `${hospital.stage + 1}`}
        </span>
      </div>
      <div className="mt-5">
        <ProgressSteps stage={hospital.stage} />
        <div className="mt-2 flex items-center justify-between text-[11px] text-ink-3">
          <span>{t('Foundation')}</span><span>{t('Courtyard')}</span><span>{t('Complete')}</span>
        </div>
      </div>
      {!hospital.completed && (
        <div className="mt-5 rounded-lg bg-surface-2/60 p-3.5">
          <div className="flex items-center justify-between gap-3 text-[12px]">
            <span className="font-medium text-ink-2">{t('To place the next part')}</span>
            <span className="tnum font-mono font-semibold text-ink">{credit(hospital.creditsToNextStep)} {t('credits')}</span>
          </div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-inset">
            <div className="h-full rounded-full bg-primary transition-[width] duration-500 ease-[var(--ease-out-quint)] motion-reduce:transition-none" style={{ width: `${hospital.stepProgress * 100}%` }} />
          </div>
          <p className="mt-2 text-[10.5px] text-ink-3">{t('Each part requires {n} construction credits.').replace('{n}', credit(creditsPerStep))}</p>
        </div>
      )}
    </div>
  )
}

function RenameHospital({ hospital, onSave }: { hospital: MaristanaHospital; onSave: (name: string) => Promise<void> }) {
  const t = useT()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(hospital.name)
  const [saving, setSaving] = useState(false)

  useEffect(() => setName(hospital.name), [hospital.name])

  if (!editing) {
    return (
      <button type="button" onClick={() => setEditing(true)} className="group inline-flex min-h-11 max-w-full items-center gap-2 rounded-md text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:min-h-9">
        <span className="truncate font-serif text-[25px] font-semibold tracking-[-0.025em] text-ink sm:text-[31px]">{hospital.name}</span>
        <Icon icon={Pencil} size={14} className="shrink-0 text-ink-3 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
      </button>
    )
  }

  async function save() {
    const clean = name.trim()
    if (!clean) return
    setSaving(true)
    try { await onSave(clean); setEditing(false) } finally { setSaving(false) }
  }

  return (
    <form className="flex max-w-lg items-center gap-2" onSubmit={(event) => { event.preventDefault(); void save() }}>
      <TextInput value={name} maxLength={80} onChange={(event) => setName(event.target.value)} autoFocus aria-label={t('Hospital name')} className="font-serif text-[17px] font-semibold" />
      <Button type="submit" variant="primary" loading={saving}>{t('Save')}</Button>
      <Button type="button" variant="ghost" onClick={() => { setName(hospital.name); setEditing(false) }}>{t('Cancel')}</Button>
    </form>
  )
}

function HospitalCard({ hospital, selected, onSelect }: { hospital: MaristanaHospital; selected: boolean; onSelect: () => void }) {
  const t = useT()
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'min-w-[190px] snap-start overflow-hidden rounded-xl border bg-surface text-start shadow-panel transition-[border-color,box-shadow,transform] duration-150 ease-[var(--ease-out-quint)] hover:-translate-y-0.5 hover:shadow-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:min-w-0',
        selected ? 'border-primary' : 'border-line hover:border-line-2',
      )}
    >
      <MaristanaModel stage={hospital.stage} name={hospital.name} compact />
      <div className="border-t border-line p-3">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-[13px] font-semibold text-ink">{hospital.name}</p>
          {hospital.completed && <Icon icon={Check} size={14} className="shrink-0 text-success" />}
        </div>
        <p className="mt-1 font-mono text-[10.5px] text-ink-3">{hospital.completed ? t('Built · 25/25') : t('{n}/25 parts placed').replace('{n}', String(hospital.stage))}</p>
      </div>
    </button>
  )
}

export function Maristanas() {
  const t = useT()
  const { audienceSettled, audienceUnknown } = useIdentity()
  const { data, loading, error, refresh, rename } = useMaristanas()
  const online = useOnlineStatus()
  const [onboarding, setOnboarding, onboardingStatus] = usePersistentState(MARISTANA_ONBOARDING_KEY, DEFAULT_MARISTANA_ONBOARDING)
  const activeSlot = data?.hospitals.find((hospital) => hospital.active)?.slot ?? 1
  const [selectedSlot, setSelectedSlot] = useState(activeSlot)
  const [howItWorksOpen, setHowItWorksOpen] = useState(false)
  const [unlockedAchievement, setUnlockedAchievement] = useState<{ milestone: MaristanaMilestone; hospitalName: string } | null>(null)
  const previousStages = useRef<Map<number, number> | null>(null)

  const startBuilding = useCallback(() => {
    setOnboarding({ version: 1, completed: true })
  }, [setOnboarding])
  const closeHowItWorks = useCallback(() => setHowItWorksOpen(false), [])
  const closeAchievement = useCallback(() => setUnlockedAchievement(null), [])

  useEffect(() => {
    if (!data?.hospitals.some((hospital) => hospital.slot === selectedSlot)) setSelectedSlot(activeSlot)
  }, [activeSlot, data, selectedSlot])

  useEffect(() => {
    if (!data) return
    const latest = new Map(data.hospitals.map((hospital) => [hospital.slot, hospital.stage]))
    const previous = previousStages.current
    previousStages.current = latest
    if (!previous) return

    for (const hospital of data.hospitals) {
      const earlierStage = previous.get(hospital.slot) ?? hospital.stage
      if (hospital.stage <= earlierStage) continue
      const milestone = MARISTANA_MILESTONES
        .filter((candidate) => candidate.stage > earlierStage && candidate.stage <= hospital.stage)
        .at(-1)
      if (milestone) setUnlockedAchievement({ milestone, hospitalName: hospital.name })
    }
  }, [data])

  const selected = useMemo(() => {
    if (!data) return undefined
    return data.hospitals.find((hospital) => hospital.slot === selectedSlot) ?? data.hospitals.at(-1)
  }, [data, selectedSlot])

  if (loading && !data) {
    return (
      <PageContainer className="space-y-4" aria-label={t('Loading Build Maristanas')}>
        <Skeleton className="h-20 rounded-xl" />
        <div className="grid gap-4 lg:grid-cols-[1.6fr_0.8fr]"><Skeleton className="h-[520px] rounded-xl" /><Skeleton className="h-[520px] rounded-xl" /></div>
      </PageContainer>
    )
  }

  if (error || !data || !selected) {
    // Offline is a more specific — and more actionable — truth than the
    // generic server-error copy below (mirrors CatalogueUnavailable's own
    // offline branch).
    if (!online) {
      return (
        <PageContainer>
          <Panel className="p-10">
            <EmptyState
              icon={WifiOff}
              title={t("You're offline")}
              description={t('This page keeps retrying in the background — it will load as soon as you reconnect.')}
              action={<Button onClick={() => void refresh()}>{t('Try again')}</Button>}
            />
          </Panel>
        </PageContainer>
      )
    }
    return <PageContainer><Panel className="p-10"><EmptyState icon={Building2} title={t('Construction ledger unavailable')} description={t('No construction credit has changed.')} action={<Button onClick={() => void refresh()}>{t('Try again')}</Button>} /></Panel></PageContainer>
  }

  if (!data.enabled) {
    return <PageContainer><Panel className="p-10"><EmptyState icon={Building2} title={t('Build Maristanas is resting')} description={t('Your administrators have temporarily paused the construction experience. Your learning evidence is still safe.')} /></Panel></PageContainer>
  }

  const accuracy = data.questionsAnswered ? Math.round((data.correctAnswers / data.questionsAnswered) * 100) : null

  const onboardingReady = audienceSettled && !audienceUnknown && (onboardingStatus.hydrated || onboardingStatus.error != null)

  return (
    <>
    <PageContainer className="max-w-[1280px]">
      <BackButton />
      <header className="mb-5 flex flex-wrap items-end justify-between gap-4 sm:mb-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-primary-strong">
            <Icon icon={Hammer} size={15} />
            <p className="text-[10.5px] font-bold uppercase tracking-[0.09em]">{t('Build Maristanas')}</p>
          </div>
          <h1 className="mt-2 text-balance font-serif text-[30px] font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-[39px]">{t('Knowledge becomes a place of healing.')}</h1>
          <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-ink-2">{t('Focused study and scored performance place every part. Build carefully; every hospital is a record of work you actually completed.')}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" iconLeft={CircleHelp} onClick={() => setHowItWorksOpen(true)} className="active:scale-[0.96]">{t('How it works')}</Button>
          <div className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3.5 py-2.5 shadow-panel">
            <span className="grid size-9 place-items-center rounded-md bg-primary-tint text-primary-strong"><Icon icon={Trophy} size={17} /></span>
            <div><p className="tnum font-mono text-[17px] font-semibold leading-none text-ink">{data.completedHospitals}</p><p className="mt-1 text-[10.5px] text-ink-3">{t('hospitals completed')}</p></div>
          </div>
        </div>
      </header>

      <div>
        <Panel className="overflow-hidden">
          <div className="flex min-h-[76px] items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <RenameHospital hospital={selected} onSave={(name) => rename(selected.slot, name)} />
              <p className="mt-0.5 text-[11.5px] text-ink-3">{t('Hospital')} {String(selected.slot).padStart(2, '0')} · {selected.completed ? t('Ready to serve') : t('Construction in progress')}</p>
            </div>
            <span className={cn('hidden rounded-md border px-2.5 py-1.5 text-[11px] font-semibold sm:inline-flex', selected.completed ? 'border-success/25 bg-success-tint text-success' : 'border-primary-line bg-primary-tint text-primary-strong')}>
              {selected.completed ? t('Complete') : t('{n} of 25').replace('{n}', String(selected.stage))}
            </span>
          </div>
          <MaristanaModel stage={selected.stage} name={selected.name} />
        </Panel>

        <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
          <div className="space-y-4">
            <BuildLedger hospital={selected} creditsPerStep={data.config.creditsPerStep} />

            <Panel className="p-4">
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-tint text-accent-strong"><Icon icon={Clock3} size={17} /></span>
                <div className="min-w-0 flex-1"><h3 className="text-[12.5px] font-semibold text-ink">{t('This week')}</h3><p className="mt-1 text-[11.5px] leading-relaxed text-ink-2">{duration(data.thisWeek.studyMinutes)} {t('active study')} · {data.thisWeek.questionsAnswered} {t('questions')}</p><p className="tnum mt-2 font-mono text-[17px] font-semibold text-primary-strong">+{credit(data.thisWeek.credits)} {t('credits')}</p></div>
              </div>
            </Panel>
          </div>

          <Panel>
            <PanelHeader title={t('Construction ledger')} icon={BookOpenCheck} hint={`${credit(data.totalCredits)} ${t('total')}`} />
            <div className="divide-y divide-line">
              {[
                [Clock3, t('Focused study'), `${duration(data.studyMinutes)} ${t('recorded')}`, data.breakdown.study],
                [ListChecks, t('Questions answered'), `${data.questionsAnswered.toLocaleString()} ${t('attempts')}`, data.breakdown.questions],
                [Award, t('Correct-answer credit'), accuracy == null ? t('No marked answers yet') : t('{n}% accuracy').replace('{n}', String(accuracy)), data.breakdown.accuracy],
                [ClipboardCheck, t('Assessment scores'), data.averageAssessmentScore == null ? t('No assessment session yet') : t('{sessions} sessions · {score}% avg').replace('{sessions}', String(data.assessmentSessions)).replace('{score}', String(data.averageAssessmentScore)), data.breakdown.assessments],
              ].map(([Glyph, label, detail, value]) => (
                <div key={String(label)} className="flex items-center gap-3 px-4 py-3.5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-md bg-surface-2 text-ink-2"><Icon icon={Glyph as typeof Clock3} size={15} /></span>
                  <div className="min-w-0 flex-1"><p className="text-[12.5px] font-semibold text-ink">{label as string}</p><p className="mt-0.5 truncate text-[10.5px] text-ink-3">{detail as string}</p></div>
                  <span className="tnum font-mono text-[12px] font-semibold text-ink">+{credit(value as number)}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <MaristanaAchievementRail stage={selected.stage} />

      <section className="mt-6" aria-labelledby="collection-title">
        <div className="mb-3 flex items-end justify-between gap-4">
          <div><p className="text-[10.5px] font-bold uppercase tracking-[0.085em] text-ink-3">{t('Your collection')}</p><h2 id="collection-title" className="mt-1 font-serif text-[22px] font-semibold tracking-[-0.02em] text-ink">{t('The healing quarter')}</h2></div>
          <p className="hidden text-[11.5px] text-ink-3 sm:block">{t('Select a hospital to inspect or rename it.')}</p>
        </div>
        <div className="-mx-3 flex snap-x gap-3 overflow-x-auto px-3 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {data.hospitals.map((hospital) => <HospitalCard key={hospital.slot} hospital={hospital} selected={hospital.slot === selected.slot} onSelect={() => setSelectedSlot(hospital.slot)} />)}
        </div>
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Panel>
          <PanelHeader title={t('Recent construction credit')} icon={Hammer} hint={t('Every credit has a source')} />
          {data.recentActivity.length ? (
            <ol className="divide-y divide-line">
              {data.recentActivity.map((activity) => (
                <li key={activity.id} className="flex items-center gap-3 px-4 py-3.5">
                  <span className={cn('grid size-8 shrink-0 place-items-center rounded-md', activity.kind === 'study' ? 'bg-accent-tint text-accent-strong' : 'bg-primary-tint text-primary-strong')}><Icon icon={activity.kind === 'study' ? Clock3 : ListChecks} size={15} /></span>
                  <div className="min-w-0 flex-1"><p className="truncate text-[12.5px] font-semibold text-ink">{activity.label}</p><p className="mt-0.5 truncate text-[10.5px] text-ink-3">{activity.detail} · {formatDateTime(new Date(activity.at))}</p></div>
                  <span className="tnum shrink-0 font-mono text-[11.5px] font-semibold text-ink">+{credit(activity.credits)}</span>
                </li>
              ))}
            </ol>
          ) : <div className="p-8"><EmptyState icon={Hammer} title={t('The site is ready')} description={t('Open a study surface or answer scored questions to place the first part.')} /></div>}
        </Panel>

        <Panel className="overflow-hidden">
          <div className="grid-chart-major p-5 sm:p-6">
            <span className="grid size-10 place-items-center rounded-lg border border-line bg-surface text-primary-strong shadow-panel"><Icon icon={Building2} size={19} /></span>
            <h2 className="mt-5 font-serif text-[23px] font-semibold tracking-[-0.02em] text-ink">{t('Build the next part')}</h2>
            <p className="mt-2 max-w-md text-[12.5px] leading-relaxed text-ink-2">{t('Study pages count while you are actively using them. Scored questions add credit for the attempt and a larger credit when correct; assessment-length sessions also add their final score.')}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <ButtonLink to="/app/adaptive" variant="primary" iconRight={ArrowRight}>{t('Continue studying')}</ButtonLink>
              <ButtonLink to="/app/qbank" variant="secondary" iconRight={ArrowRight}>{t('Open Question Bank')}</ButtonLink>
            </div>
          </div>
        </Panel>
      </div>
    </PageContainer>
    {onboardingReady && !onboarding.completed && <MaristanaOnboarding onStart={startBuilding} />}
    {howItWorksOpen && <MaristanaHowItWorksDialog onClose={closeHowItWorks} />}
    {unlockedAchievement && (
      <MaristanaAchievementToast
        milestone={unlockedAchievement.milestone}
        hospitalName={unlockedAchievement.hospitalName}
        onClose={closeAchievement}
      />
    )}
    </>
  )
}
