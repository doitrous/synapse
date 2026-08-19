/**
 * Where the student actually stands.
 *
 * The one screen in Adaptive Study that must never flatter. It reports a range,
 * names every blueprint area it could not represent, and offers no Tutor mode —
 * an assessment that can be converted into practice stops being a measurement
 * the moment a student learns it can.
 */

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, ClipboardCheck, History, Timer } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { Table, Td, Th, Tr } from '@/components/ui/Table'
import { QuestionView } from '@/components/qbank/QuestionView'
import { Caveat, RangeBar, rangeText } from './parts'
import { MEASUREMENT_SEPARATION, PREDICTION_CAVEAT } from '@/data/adaptive/explain'
import { readinessSentence } from '@/data/adaptive/readiness'
import { correctOptionIndex } from '@/data/adaptive/item'
import type { AdaptiveStudy } from '@/lib/adaptive/useAdaptiveStudy'
import { useReadinessResults, useReadinessSession } from '@/lib/adaptive/useReadiness'
import { cn } from '@/lib/cn'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
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
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel>
          <PanelHeader title={MEASUREMENT_SEPARATION.readiness.heading} icon={ClipboardCheck} />
          <div className="space-y-4 p-5">
            <p className="text-[13.5px] leading-relaxed text-ink-2">{MEASUREMENT_SEPARATION.readiness.body}</p>
            <p className="text-[13.5px] leading-relaxed text-ink-2">{readinessSentence(latest)}</p>
            {latest && <RangeBar lower={latest.lower} upper={latest.upper} />}

            <Button
              variant="primary"
              iconLeft={ClipboardCheck}
              onClick={() => {
                const assembly = start()
                setShortfall(assembly.items.length)
              }}
              disabled={study.heldOut.size === 0}
            >
              Start a readiness assessment
            </Button>

            {study.heldOut.size === 0 && (
              <Caveat>
                No questions are reserved for measurement yet, so a readiness assessment cannot be assembled. Reserving
                items is an administrator's decision — practice accuracy is not offered as a substitute.
              </Caveat>
            )}

            {shortfall !== null && shortfall < study.config.readiness.assessmentSize && (
              <Caveat>
                Only <span className="tnum font-mono">{shortfall}</span> of{' '}
                <span className="tnum font-mono">{study.config.readiness.assessmentSize}</span> questions could be drawn
                while keeping the assessment balanced against your blueprint. The result will say which areas are
                under-represented rather than filling the gap from elsewhere.
              </Caveat>
            )}
          </div>
        </Panel>

        <Panel>
          <PanelHeader title={MEASUREMENT_SEPARATION.adaptive.heading} icon={Timer} />
          <div className="space-y-4 p-5">
            <p className="text-[13.5px] leading-relaxed text-ink-2">{MEASUREMENT_SEPARATION.adaptive.body}</p>
            <Caveat>{PREDICTION_CAVEAT}</Caveat>
          </div>
        </Panel>
      </div>

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
                {latest.underRepresented.map((entry) => entry.groupLabel).join(', ')}. Treat this result as provisional.
              </Caveat>
            </div>
          )}
        </Panel>
      )}

      <Panel>
        <PanelHeader title="History" icon={History} hint={`${history.length} assessments`} />
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
    </div>
  )
}
