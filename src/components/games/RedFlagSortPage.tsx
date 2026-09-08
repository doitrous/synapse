import { FoundationGameLibrary } from '@/components/games/FoundationGameLibrary'
import { useMemo, useState } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { scoreRedFlagSort, validMiniGamePacks, type RedFlagFinding, type RedFlagSortPack } from '@/data/minigamePacks'
import { getSubject } from '@/data/subjects'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/cn'

function redFlagPacks(): RedFlagSortPack[] {
  return validMiniGamePacks('red_flag_sort').filter((pack): pack is RedFlagSortPack => pack.kind === 'red_flag_sort')
}

function LegacyRedFlagSortPage() {
  const t = useT()
  const packs = useMemo(() => redFlagPacks(), [])
  const pack = packs[0]
  const [placements, setPlacements] = useState<Record<string, RedFlagFinding['lane']>>({})
  const [checked, setChecked] = useState(false)

  if (!pack) {
    return (
      <PageContainer>
        <PageHeader title={t('Red Flag Sort')} description={t('Classify authored urgent findings without generated facts.')} back={{ fallback: '/app/minigames' }} />
        <Panel className="p-8">
          <EmptyState icon={AlertTriangle} title={t('No authored game pack is ready yet.')} description={t('This game appears once a reviewed local pack passes validation.')} />
        </Panel>
      </PageContainer>
    )
  }

  const subject = getSubject(pack.subjectId)
  const score = scoreRedFlagSort(pack, placements)

  return (
    <PageContainer>
      <PageHeader title={t('Red Flag Sort')} description={t('Classify authored urgent findings without generated facts.')} back={{ fallback: '/app/minigames' }} />
      <div className="space-y-4">
        <Panel className="p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif text-[20px] font-semibold text-ink">{pack.title}</h1>
                <Badge tone="outline">{subject.short}</Badge>
              </div>
              <p className="mt-1 max-w-2xl text-[13.5px] leading-relaxed text-ink-2">{pack.prompt}</p>
              <p className="mt-2 text-[12px] text-ink-3">{pack.source.label} · {pack.source.reviewedBy}</p>
            </div>
            <Button
              variant="secondary"
              iconLeft={RotateCcw}
              onClick={() => {
                setPlacements({})
                setChecked(false)
              }}
            >
              {t('Reset')}
            </Button>
          </div>
        </Panel>

        <div className="grid gap-3 md:grid-cols-2">
          {(['urgent', 'routine'] as const).map((lane) => (
            <Panel key={lane} className={cn('p-3', lane === 'urgent' ? 'border-danger/30' : 'border-line')}>
              <h2 className={cn('mb-2 text-[12px] font-semibold uppercase tracking-[0.14em]', lane === 'urgent' ? 'text-danger' : 'text-ink-3')}>
                {pack.lanes[lane]}
              </h2>
              <div className="space-y-2">
                {pack.findings.filter((finding) => placements[finding.id] === lane).map((finding) => (
                  <div key={finding.id} className="rounded-lg border border-line bg-surface px-3 py-2 text-[13px] text-ink">
                    {finding.text}
                  </div>
                ))}
                {!pack.findings.some((finding) => placements[finding.id] === lane) && (
                  <p className="rounded-lg border border-dashed border-line px-3 py-4 text-center text-[12.5px] text-ink-3">{t('No findings placed here yet.')}</p>
                )}
              </div>
            </Panel>
          ))}
        </div>

        <Panel className="p-3">
          <h2 className="mb-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-3">{t('Findings')}</h2>
          <div className="grid gap-2">
            {pack.findings.map((finding) => {
              const selected = placements[finding.id]
              const result = score.results.find((entry) => entry.finding.id === finding.id)
              return (
                <div
                  key={finding.id}
                  className={cn(
                    'rounded-xl border border-line bg-surface p-3',
                    checked && result?.correct && 'border-success/40 bg-success-tint/30',
                    checked && selected && !result?.correct && 'border-danger/35 bg-danger-tint/25',
                  )}
                >
                  <p className="text-[13.5px] font-medium text-ink">{finding.text}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(['urgent', 'routine'] as const).map((lane) => (
                      <Button
                        key={lane}
                        variant={selected === lane ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => {
                          setChecked(false)
                          setPlacements((current) => ({ ...current, [finding.id]: lane }))
                        }}
                      >
                        {pack.lanes[lane]}
                      </Button>
                    ))}
                  </div>
                  {checked && selected && <p className="mt-2 text-[12.5px] text-ink-2">{finding.rationale}</p>}
                </div>
              )
            })}
          </div>
        </Panel>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary" onClick={() => setChecked(true)} disabled={Object.keys(placements).length < pack.findings.length}>
            {t('Check sort')}
          </Button>
          {checked && (
            <p role="status" className="text-[13px] font-semibold text-ink-2">
              {score.correct}/{score.total} {t('findings matched to the authored lane')}
            </p>
          )}
        </div>
      </div>
    </PageContainer>
  )
}

export function RedFlagSortPage(){return <FoundationGameLibrary kind="red-flag-sort"><LegacyRedFlagSortPage/></FoundationGameLibrary>}
