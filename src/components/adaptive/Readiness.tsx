/**
 * Where the student actually stands.
 *
 * The one screen in Adaptive Study that must never flatter. It reports a range,
 * names every blueprint area it could not represent, and offers no Tutor mode —
 * an assessment that can be converted into practice stops being a measurement
 * the moment a student learns it can.
 */

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, ClipboardCheck, History, Timer, TrendingUp } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Table, Td, Th, Tr } from '@/components/ui/Table'
import { QuestionView } from '@/components/qbank/QuestionView'
import { Caveat, RangeBar, rangeText } from './parts'
import { MEASUREMENT_SEPARATION } from '@/data/adaptive/explain'
import { readinessSentence, type ReadinessResult } from '@/data/adaptive/readiness'
import { correctOptionIndex } from '@/data/adaptive/item'
import type { AdaptiveStudy } from '@/lib/adaptive/useAdaptiveStudy'
import { useReadinessResults, useReadinessSession } from '@/lib/adaptive/useReadiness'
import { cn } from '@/lib/cn'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
}

/**
 * The readiness range, plotted across every assessment taken so far.
 *
 * The band is drawn from the stored interval at each assessment — never
 * interpolated or smoothed — and the line traces its midpoint only because a
 * single line has to trace *something*; the band stays the actual claim. The
 * latest point is drawn hollow to match the emphasis `RangeBar` gives the
 * current reading everywhere else on this tab.
 */
function ReadinessTrend({ series }: { series: ReadinessResult[] }) {
  const width = 640
  const height = 184
  const padL = 40
  const padR = 14
  const padT = 18
  const padB = 24
  const plotW = width - padL - padR
  const plotH = height - padT - padB

  const values = series.flatMap((entry) => [entry.lower, entry.upper])
  const minV = Math.max(0, Math.min(...values) - 0.06)
  const maxV = Math.min(1, Math.max(...values) + 0.06)
  const span = Math.max(0.08, maxV - minV)

  const x = (index: number) => (series.length > 1 ? padL + (index / (series.length - 1)) * plotW : padL + plotW / 2)
  const y = (value: number) => padT + (1 - (value - minV) / span) * plotH

  const upperPoints = series.map((entry, index) => `${x(index)},${y(entry.upper)}`)
  const lowerPoints = series.map((entry, index) => `${x(index)},${y(entry.lower)}`).reverse()
  const bandPoints = [...upperPoints, ...lowerPoints].join(' ')
  const linePath = series
    .map((entry, index) => `${index === 0 ? 'M' : 'L'} ${x(index)} ${y((entry.lower + entry.upper) / 2)}`)
    .join(' ')

  const ticks = [0, 0.5, 1].map((step) => minV + step * span)
  const labelIndexes = series.length <= 4
    ? series.map((_, index) => index)
    : [0, Math.round((series.length - 1) / 3), Math.round((2 * (series.length - 1)) / 3), series.length - 1]

  const last = series[series.length - 1]
  const lastIndex = series.length - 1

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} role="img" aria-label="Your readiness range over time">
      <line x1={padL} y1={padT} x2={padL} y2={height - padB} stroke="var(--color-line)" strokeWidth={1} />
      <line x1={padL} y1={height - padB} x2={width - padR} y2={height - padB} stroke="var(--color-line)" strokeWidth={1} />
      {ticks.map((tick) => (
        <g key={tick}>
          <line
            x1={padL} y1={y(tick)} x2={width - padR} y2={y(tick)}
            stroke="var(--color-line)" strokeWidth={1} strokeDasharray="3 3"
          />
          <text x={padL - 8} y={y(tick) + 3} fontSize="10" textAnchor="end" fill="var(--color-ink-3)" fontFamily="var(--font-mono)">
            {Math.round(tick * 100)}%
          </text>
        </g>
      ))}
      <polygon points={bandPoints} fill="var(--color-primary-tint)" />
      <path d={linePath} fill="none" stroke="var(--color-primary)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {series.map((entry, index) => (
        <circle
          key={entry.id}
          cx={x(index)}
          cy={y((entry.lower + entry.upper) / 2)}
          r={index === lastIndex ? 5 : 3.5}
          fill={index === lastIndex ? 'var(--color-surface)' : 'var(--color-primary)'}
          stroke="var(--color-primary)"
          strokeWidth={index === lastIndex ? 2.5 : 0}
        />
      ))}
      <text
        x={x(lastIndex) - 8} y={Math.max(12, y(last.upper) - 8)}
        fontSize="11" fontWeight={600} textAnchor="end" fill="var(--color-primary-strong)"
      >
        {rangeText(last.lower, last.upper)}
      </text>
      {labelIndexes.map((index) => (
        <text
          key={index} x={x(index)} y={height - padB + 16}
          fontSize="10" textAnchor="middle" fill="var(--color-ink-3)" fontFamily="var(--font-mono)"
        >
          {formatShortDate(series[index].at)}
        </text>
      ))}
    </svg>
  )
}

export function Readiness({ study }: { study: AdaptiveStudy }) {
  const [results] = useReadinessResults()
  const { session, start, answer, goTo, finish, discard } = useReadinessSession(study)
  const [shortfall, setShortfall] = useState<number | null>(null)

  const itemsById = useMemo(() => new Map(study.items.map((item) => [item.id, item])), [study.items])

  const history = useMemo(
    () => [...results].sort((a, b) => b.at.localeCompare(a.at)),
    [results],
  )
  const latest = history[0] ?? null
  // Chronological, for the trend chart — `history` itself stays newest-first
  // because that is the order a table of past attempts should read in.
  const series = useMemo(() => [...history].reverse(), [history])

  // ---- running -------------------------------------------------------------
  if (session) {
    const index = Math.min(session.cursor, session.items.length - 1)
    const entry = session.items[index]
    const item = entry ? itemsById.get(entry.itemId) : undefined
    const given = entry ? session.answers[entry.itemId] : undefined

    if (!item) {
      return (
        <Panel>
          <EmptyState
            icon={ClipboardCheck}
            title="This assessment could not be restored"
            description="The questions it referred to are no longer in scope."
            action={<Button onClick={discard}>Discard it</Button>}
          />
        </Panel>
      )
    }

    return (
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <Panel>
          <PanelHeader
            title={`Question ${index + 1} of ${session.items.length}`}
            icon={Timer}
            hint="Feedback comes at the end — this is a measurement, not practice"
          />
          <div className="p-5">
            {/* `revealed` is hard-wired false. There is no branch here that can
                show the key, which is what keeps this flow a measurement. */}
            <QuestionView
              question={item.question}
              chosen={given?.chosenIndex ?? null}
              revealed={false}
              correctIndex={correctOptionIndex(item)}
              onChoose={(chosenIndex) => answer(item.id, chosenIndex, null)}
            />
          </div>
        </Panel>

        {/* `min-w-0`: a grid child defaults to `min-width: auto`, so anything
            that refuses to wrap widens the column instead of being clipped. */}
        <div className="min-w-0 space-y-4">
          <Panel>
            <PanelHeader title="Progress" icon={ClipboardCheck} />
            <div className="grid grid-cols-6 gap-1.5 p-4">
              {session.items.map((slot, position) => (
                <button
                  key={slot.itemId}
                  type="button"
                  onClick={() => goTo(position)}
                  className={cn(
                    'tnum grid h-8 place-items-center rounded-md border font-mono text-[12px]',
                    position === index && 'ring-2 ring-primary ring-offset-1 ring-offset-surface',
                    session.answers[slot.itemId]
                      ? 'border-primary bg-primary-tint text-primary-strong'
                      : 'border-line text-ink-3',
                  )}
                >
                  {position + 1}
                </button>
              ))}
            </div>
          </Panel>

          <div className="flex flex-wrap gap-2">
            <Button iconLeft={ChevronLeft} onClick={() => goTo(Math.max(0, index - 1))} disabled={index === 0}>
              Previous
            </Button>
            <Button
              iconRight={ChevronRight}
              onClick={() => goTo(Math.min(session.items.length - 1, index + 1))}
              disabled={index >= session.items.length - 1}
            >
              Next
            </Button>
          </div>

          <Button
            variant="primary"
            className="w-full"
            onClick={() => finish((itemId, chosenIndex) => {
              const answered = itemsById.get(itemId)
              return answered ? correctOptionIndex(answered) === chosenIndex : false
            })}
          >
            Submit assessment
          </Button>

          <Caveat>
            Anything you leave blank is recorded as an omission, not as a wrong answer. It is reported separately rather
            than dragging the range down.
          </Caveat>
        </div>
      </div>
    )
  }

  // ---- idle ----------------------------------------------------------------
  return (
    <div className="grid items-start gap-5 lg:grid-cols-[1.35fr_1fr]">
      <div className="min-w-0 space-y-5">
        <Panel>
          <PanelHeader
            title="Your readiness range over time"
            icon={TrendingUp}
            hint="Held-out questions only — feedback at the end, never during"
          />
          <div className="p-5 pt-4">
            {series.length >= 2 ? (
              <>
                <ReadinessTrend series={series} />
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[11px] text-ink-3">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-[3px] w-4 shrink-0 rounded-full bg-primary" /> estimate
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-4 shrink-0 rounded-sm bg-primary-tint" /> uncertainty band — it narrows as
                    you answer more
                  </span>
                </div>
              </>
            ) : (
              <EmptyState
                icon={TrendingUp}
                title="Not enough assessments yet"
                description="Your range appears here as a trend once you have taken at least two readiness assessments."
              />
            )}
          </div>
        </Panel>

        {latest && latest.groups.length > 0 && (
          <Panel>
            <PanelHeader title="By blueprint area" icon={ClipboardCheck} hint="Most recent assessment" />
            <Table>
              <thead>
                <tr>
                  <Th>Area</Th>
                  <Th align="end">Answered</Th>
                  <Th align="end">Correct</Th>
                  <Th>Range</Th>
                </tr>
              </thead>
              <tbody>
                {latest.groups.map((group) => (
                  <Tr key={group.groupId}>
                    <Td>{group.groupLabel}</Td>
                    <Td align="end" className="tnum font-mono text-[12.5px]">{group.answered}</Td>
                    <Td align="end" className="tnum font-mono text-[12.5px]">{group.correct}</Td>
                    <Td>
                      {group.insufficient ? (
                        <span className="text-[12px] text-ink-3">Too few questions to report</span>
                      ) : (
                        <div className="min-w-[120px]">
                          <RangeBar lower={group.lower ?? 0} upper={group.upper ?? 1} />
                          <p className="tnum mt-1 font-mono text-[11px] text-ink-3">
                            {rangeText(group.lower ?? 0, group.upper ?? 1)}
                          </p>
                        </div>
                      )}
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
            {latest.underRepresented.length > 0 && (
              <div className="border-t border-line p-5">
                <Caveat>
                  {latest.underRepresented.length} blueprint area
                  {latest.underRepresented.length === 1 ? '' : 's'} could not be fully represented:{' '}
                  {latest.underRepresented.map((entry) => entry.groupLabel).join(', ')}. Treat this result as
                  provisional.
                </Caveat>
              </div>
            )}
          </Panel>
        )}
      </div>

      <div className="min-w-0 space-y-5">
        {/* Blue, not crimson: this is a measurement, not an action to push — the
            same distinction `Badge`'s accent tone keeps everywhere else. */}
        <Panel className="overflow-hidden border-accent-line">
          <div className="bg-gradient-to-b from-accent-tint to-transparent p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-accent-strong">
              Readiness assessment
            </p>
            <h3 className="mt-1.5 font-serif text-[19px] font-semibold leading-snug tracking-[-0.01em] text-ink">
              {study.config.readiness.assessmentSize} held-out questions, marked at the end
            </h3>
            <p className="mt-2 text-[12.5px] leading-relaxed text-ink-2">{MEASUREMENT_SEPARATION.readiness.body}</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-ink-2">{readinessSentence(latest)}</p>
            {latest && <RangeBar lower={latest.lower} upper={latest.upper} className="mt-3" />}

            <Button
              variant="primary"
              iconLeft={ClipboardCheck}
              className="mt-4"
              onClick={() => {
                const assembly = start()
                setShortfall(assembly.items.length)
              }}
              disabled={study.heldOut.size === 0}
            >
              Start assessment
            </Button>

            {study.heldOut.size === 0 && (
              <Caveat className="mt-3">
                No questions are reserved for measurement yet, so a readiness assessment cannot be assembled. Reserving
                items is an administrator's decision — practice accuracy is not offered as a substitute.
              </Caveat>
            )}

            {shortfall !== null && shortfall < study.config.readiness.assessmentSize && (
              <Caveat className="mt-3">
                Only <span className="tnum font-mono">{shortfall}</span> of{' '}
                <span className="tnum font-mono">{study.config.readiness.assessmentSize}</span> questions could be
                drawn while keeping the assessment balanced against your blueprint. The result will say which areas
                are under-represented rather than filling the gap from elsewhere.
              </Caveat>
            )}
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            title="History"
            icon={History}
            hint={`${history.length} assessment${history.length === 1 ? '' : 's'}`}
          />
          {history.length === 0 ? (
            <EmptyState
              icon={History}
              title="No assessments yet"
              description="Your practice accuracy is deliberately not shown here as a stand-in. Adaptive blocks oversample your weak areas, so it would read lower than your real standing."
            />
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th>Date</Th>
                  <Th align="end">Answered</Th>
                  <Th align="end">Omitted</Th>
                  <Th>Range</Th>
                  <Th align="end">Model</Th>
                </tr>
              </thead>
              <tbody>
                {history.map((result) => (
                  <Tr key={result.id}>
                    <Td>{formatDate(result.at)}</Td>
                    <Td align="end" className="tnum font-mono text-[12.5px]">{result.answered}</Td>
                    <Td align="end" className="tnum font-mono text-[12.5px]">{result.omitted}</Td>
                    <Td className="tnum font-mono text-[12.5px]">{rangeText(result.lower, result.upper)}</Td>
                    <Td align="end"><Badge tone="outline">v{result.configVersion}</Badge></Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          )}
        </Panel>

        <Panel className="p-4">
          <p className="text-[12px] leading-relaxed text-ink-2">
            <span className="font-semibold text-ink">Why a range, not a number?</span> A single percentage implies a
            precision the evidence does not have. The band narrows as you answer more held-out questions — watching it
            narrow, and rise, is the goal.
          </p>
        </Panel>
      </div>
    </div>
  )
}
