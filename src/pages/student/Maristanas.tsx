import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight, Award, BookOpenCheck, Building2, Check, CircleHelp, Clock3, Hammer,
  ListChecks, Pencil, Sparkles, Trophy,
} from 'lucide-react'
import { PageContainer } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { TextInput } from '@/components/ui/Field'
import { EmptyState } from '@/components/ui/EmptyState'
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

function ProgressSteps({ stage }: { stage: number }) {
  return (
    <ol className="grid grid-cols-[repeat(25,minmax(0,1fr))] gap-1" aria-label={`${stage} of ${MARISTANA_STEPS} construction steps complete`}>
      {Array.from({ length: MARISTANA_STEPS }, (_, index) => {
        const number = index + 1
        return (
          <li
            key={number}
            title={`Step ${number}${number <= stage ? ' complete' : ''}`}
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
  const step = Math.min(MARISTANA_STEPS, hospital.stage + (hospital.completed ? 0 : 1))
  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-panel sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.085em] text-primary-strong">Current build</p>
          <p className="mt-1 font-serif text-[22px] font-semibold tracking-[-0.02em] text-ink">
            {hospital.completed ? 'Hospital complete' : `Step ${step} of ${MARISTANA_STEPS}`}
          </p>
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
          <span>Foundation</span><span>Courtyard</span><span>Complete</span>
        </div>
      </div>
      {!hospital.completed && (
        <div className="mt-5 rounded-lg bg-surface-2/60 p-3.5">
          <div className="flex items-center justify-between gap-3 text-[12px]">
            <span className="font-medium text-ink-2">To place the next part</span>
            <span className="tnum font-mono font-semibold text-ink">{credit(hospital.creditsToNextStep)} credits</span>
          </div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-inset">
            <div className="h-full rounded-full bg-primary transition-[width] duration-500 ease-[var(--ease-out-quint)] motion-reduce:transition-none" style={{ width: `${hospital.stepProgress * 100}%` }} />
          </div>
          <p className="mt-2 text-[10.5px] text-ink-3">Each part requires {credit(creditsPerStep)} construction credits.</p>
        </div>
      )}
    </div>
  )
}

function RenameHospital({ hospital, onSave }: { hospital: MaristanaHospital; onSave: (name: string) => Promise<void> }) {
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
      <TextInput value={name} maxLength={80} onChange={(event) => setName(event.target.value)} autoFocus aria-label="Hospital name" className="font-serif text-[17px] font-semibold" />
      <Button type="submit" variant="primary" loading={saving}>Save</Button>
      <Button type="button" variant="ghost" onClick={() => { setName(hospital.name); setEditing(false) }}>Cancel</Button>
    </form>
  )
}

function HospitalCard({ hospital, selected, onSelect }: { hospital: MaristanaHospital; selected: boolean; onSelect: () => void }) {
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
        <p className="mt-1 font-mono text-[10.5px] text-ink-3">{hospital.completed ? 'Built · 25/25' : `${hospital.stage}/25 parts placed`}</p>
      </div>
    </button>
  )
}

export function Maristanas() {
  const t = useT()
  const { audienceSettled, audienceUnknown } = useIdentity()
  const { data, loading, error, refresh, rename } = useMaristanas()
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
      <PageContainer className="space-y-4" aria-label="Loading Build Maristanas">
        <div className="h-20 animate-pulse rounded-xl bg-inset motion-reduce:animate-none" />
        <div className="grid gap-4 lg:grid-cols-[1.6fr_0.8fr]"><div className="h-[520px] animate-pulse rounded-xl bg-inset motion-reduce:animate-none" /><div className="h-[520px] animate-pulse rounded-xl bg-inset motion-reduce:animate-none" /></div>
      </PageContainer>
    )
  }

  if (error || !data || !selected) {
    return <PageContainer><Panel className="p-10"><EmptyState icon={Building2} title="Construction ledger unavailable" description="Your progress could not be loaded. No construction credit has been changed." action={<Button onClick={() => void refresh()}>Try again</Button>} /></Panel></PageContainer>
  }

  if (!data.enabled) {
    return <PageContainer><Panel className="p-10"><EmptyState icon={Building2} title="Build Maristanas is resting" description="Your administrators have temporarily paused the construction experience. Your learning evidence is still safe." /></Panel></PageContainer>
  }

  const accuracy = data.questionsAnswered ? Math.round((data.correctAnswers / data.questionsAnswered) * 100) : null

  const onboardingReady = audienceSettled && !audienceUnknown && (onboardingStatus.hydrated || onboardingStatus.error != null)

  return (
    <>
    <PageContainer className="max-w-[1280px]">
      <header className="mb-5 flex flex-wrap items-end justify-between gap-4 sm:mb-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-primary-strong">
            <Icon icon={Hammer} size={15} />
            <p className="text-[10.5px] font-bold uppercase tracking-[0.09em]">Build Maristanas</p>
          </div>
          <h1 className="mt-2 text-balance font-serif text-[30px] font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-[39px]">Knowledge becomes a place of healing.</h1>
          <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-ink-2">Focused study and scored performance place every part. Build carefully; every hospital is a record of work you actually completed.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" iconLeft={CircleHelp} onClick={() => setHowItWorksOpen(true)} className="active:scale-[0.96]">How it works</Button>
          <div className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3.5 py-2.5 shadow-panel">
            <span className="grid size-9 place-items-center rounded-md bg-primary-tint text-primary-strong"><Icon icon={Trophy} size={17} /></span>
            <div><p className="tnum font-mono text-[17px] font-semibold leading-none text-ink">{data.completedHospitals}</p><p className="mt-1 text-[10.5px] text-ink-3">hospitals completed</p></div>
          </div>
        </div>
      </header>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.72fr)]">
        <Panel className="overflow-hidden">
          <div className="flex min-h-[76px] items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <RenameHospital hospital={selected} onSave={(name) => rename(selected.slot, name)} />
              <p className="mt-0.5 text-[11.5px] text-ink-3">Hospital {String(selected.slot).padStart(2, '0')} · {selected.completed ? 'Ready to serve' : 'Construction in progress'}</p>
            </div>
            <span className={cn('hidden rounded-md border px-2.5 py-1.5 text-[11px] font-semibold sm:inline-flex', selected.completed ? 'border-success/25 bg-success-tint text-success' : 'border-primary-line bg-primary-tint text-primary-strong')}>
              {selected.completed ? 'Complete' : `${selected.stage} of 25`}
            </span>
          </div>
          <MaristanaModel stage={selected.stage} name={selected.name} />
        </Panel>

        <div className="space-y-4">
          <BuildLedger hospital={selected} creditsPerStep={data.config.creditsPerStep} />

          <Panel>
            <PanelHeader title="Construction ledger" icon={BookOpenCheck} hint={`${credit(data.totalCredits)} total`} />
            <div className="divide-y divide-line">
              {[
                [Clock3, 'Focused study', `${duration(data.studyMinutes)} recorded`, data.breakdown.study],
                [ListChecks, 'Questions answered', `${data.questionsAnswered.toLocaleString()} attempts`, data.breakdown.questions],
                [Award, 'Correct-answer credit', accuracy == null ? 'No marked answers yet' : `${accuracy}% accuracy`, data.breakdown.accuracy],
                [Sparkles, 'Assessment scores', data.averageAssessmentScore == null ? 'No assessment session yet' : `${data.assessmentSessions} sessions · ${data.averageAssessmentScore}% avg`, data.breakdown.assessments],
              ].map(([Glyph, label, detail, value]) => (
                <div key={String(label)} className="flex items-center gap-3 px-4 py-3.5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-md bg-surface-2 text-ink-2"><Icon icon={Glyph as typeof Clock3} size={15} /></span>
                  <div className="min-w-0 flex-1"><p className="text-[12.5px] font-semibold text-ink">{label as string}</p><p className="mt-0.5 truncate text-[10.5px] text-ink-3">{detail as string}</p></div>
                  <span className="tnum font-mono text-[12px] font-semibold text-ink">+{credit(value as number)}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-4">
            <div className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-tint text-accent-strong"><Icon icon={Clock3} size={17} /></span>
              <div className="min-w-0 flex-1"><p className="text-[12.5px] font-semibold text-ink">This week</p><p className="mt-1 text-[11.5px] leading-relaxed text-ink-2">{duration(data.thisWeek.studyMinutes)} active study · {data.thisWeek.questionsAnswered} questions</p><p className="tnum mt-2 font-mono text-[17px] font-semibold text-primary-strong">+{credit(data.thisWeek.credits)} credits</p></div>
            </div>
          </Panel>
        </div>
      </div>

      <MaristanaAchievementRail stage={selected.stage} />

      <section className="mt-6" aria-labelledby="collection-title">
        <div className="mb-3 flex items-end justify-between gap-4">
          <div><p className="text-[10.5px] font-bold uppercase tracking-[0.085em] text-ink-3">Your collection</p><h2 id="collection-title" className="mt-1 font-serif text-[22px] font-semibold tracking-[-0.02em] text-ink">The healing quarter</h2></div>
          <p className="hidden text-[11.5px] text-ink-3 sm:block">Select a hospital to inspect or rename it.</p>
        </div>
        <div className="-mx-3 flex snap-x gap-3 overflow-x-auto px-3 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {data.hospitals.map((hospital) => <HospitalCard key={hospital.slot} hospital={hospital} selected={hospital.slot === selected.slot} onSelect={() => setSelectedSlot(hospital.slot)} />)}
        </div>
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Panel>
          <PanelHeader title="Recent construction credit" icon={Hammer} hint="Every credit has a source" />
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
          ) : <div className="p-8"><EmptyState icon={Hammer} title="The site is ready" description="Open a study surface or answer scored questions to place the first part." /></div>}
        </Panel>

        <Panel className="overflow-hidden">
          <div className="grid-chart-major p-5 sm:p-6">
            <span className="grid size-10 place-items-center rounded-lg border border-line bg-surface text-primary-strong shadow-panel"><Icon icon={Building2} size={19} /></span>
            <h2 className="mt-5 font-serif text-[23px] font-semibold tracking-[-0.02em] text-ink">Build the next part</h2>
            <p className="mt-2 max-w-md text-[12.5px] leading-relaxed text-ink-2">Study pages count while you are actively using them. Scored questions add credit for the attempt and a larger credit when correct; assessment-length sessions also add their final score.</p>
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
