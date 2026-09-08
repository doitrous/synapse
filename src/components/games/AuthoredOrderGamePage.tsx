import { FoundationGameLibrary } from './FoundationGameLibrary'
import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, ListOrdered, RotateCcw } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { IconButton } from '@/components/ui/IconButton'
import {
  scoreOrderedSteps,
  shuffledStepIds,
  validMiniGamePacks,
  type MiniGameKind,
  type OrderedMiniGamePack,
} from '@/data/minigamePacks'
import { getSubject } from '@/data/subjects'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/cn'

function randomSeed(): number {
  return Math.floor(Math.random() * 0x7fffffff)
}

function orderedPacks(kind: MiniGameKind): OrderedMiniGamePack[] {
  return validMiniGamePacks(kind).filter((pack): pack is OrderedMiniGamePack => pack.kind === kind)
}

function move(ids: string[], from: number, to: number): string[] {
  if (to < 0 || to >= ids.length || from === to) return ids
  const next = [...ids]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

function LegacyAuthoredOrderGamePage({ kind }: { kind: 'clinical_sequence' | 'mechanism_chain' }) {
  const t = useT()
  const packs = useMemo(() => orderedPacks(kind), [kind])
  const pack = packs[0]
  const [seed, setSeed] = useState(() => randomSeed())
  const [checked, setChecked] = useState(false)
  const initialIds = useMemo(() => (pack ? shuffledStepIds(pack, seed) : []), [pack, seed])
  const [ids, setIds] = useState(initialIds)

  useEffect(() => {
    setIds(initialIds)
    setChecked(false)
  }, [initialIds])

  const title = kind === 'clinical_sequence' ? t('Clinical Sequence') : t('Mechanism Chain')
  const description = kind === 'clinical_sequence'
    ? t('Order authored clinical or procedural steps.')
    : t('Order authored cause-to-effect relationships.')

  if (!pack) {
    return (
      <PageContainer>
        <PageHeader title={title} description={description} back={{ fallback: '/app/minigames' }} />
        <Panel className="p-8">
          <EmptyState icon={ListOrdered} title={t('No authored game pack is ready yet.')} description={t('This game appears once a reviewed local pack passes validation.')} />
        </Panel>
      </PageContainer>
    )
  }

  const byId = new Map(pack.steps.map((step) => [step.id, step]))
  const score = scoreOrderedSteps(pack, ids)
  const subject = getSubject(pack.subjectId)

  return (
    <PageContainer>
      <PageHeader title={title} description={description} back={{ fallback: '/app/minigames' }} />
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
                setSeed(randomSeed())
              }}
            >
              {t('New order')}
            </Button>
          </div>
        </Panel>

        <ol className="space-y-2">
          {ids.map((id, index) => {
            const step = byId.get(id)
            if (!step) return null
            const correctId = score.correct[index]
            const isCorrect = checked && id === correctId
            const isWrong = checked && id !== correctId
            return (
              <li key={id}>
                <Panel
                  className={cn(
                    'flex items-center gap-3 p-3 transition-colors',
                    isCorrect && 'border-success/40 bg-success-tint/30',
                    isWrong && 'border-danger/35 bg-danger-tint/25',
                  )}
                >
                  <span className="tnum grid size-8 shrink-0 place-items-center rounded-full border border-line bg-surface-2 font-mono text-[12px] font-semibold text-ink-2">
                    {index + 1}
                  </span>
                  <p className="min-w-0 flex-1 text-[13.5px] font-medium leading-snug text-ink">{step.text}</p>
                  <div className="flex shrink-0 items-center gap-1">
                    <IconButton icon={ArrowUp} label={t('Move up')} size="sm" variant="surface" disabled={index === 0} onClick={() => setIds((current) => move(current, index, index - 1))} />
                    <IconButton icon={ArrowDown} label={t('Move down')} size="sm" variant="surface" disabled={index === ids.length - 1} onClick={() => setIds((current) => move(current, index, index + 1))} />
                  </div>
                </Panel>
              </li>
            )
          })}
        </ol>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary" onClick={() => setChecked(true)}>{t('Check order')}</Button>
          {checked && (
            <p role="status" className="text-[13px] font-semibold text-ink-2">
              {score.exactPositions}/{score.total} {t('steps in the authored position')}
            </p>
          )}
        </div>

        {checked && (
          <Panel className="p-4">
            <h2 className="font-serif text-[16px] font-semibold text-ink">{t('Authored explanation')}</h2>
            <p className="mt-1 text-[13.5px] leading-relaxed text-ink-2">{pack.explanation}</p>
          </Panel>
        )}
      </div>
    </PageContainer>
  )
}

export function AuthoredOrderGamePage({kind}:{kind:'clinical_sequence'|'mechanism_chain'}){return <FoundationGameLibrary kind={kind==='clinical_sequence'?'clinical-sequence':'mechanism-chain'}><LegacyAuthoredOrderGamePage kind={kind}/></FoundationGameLibrary>}
