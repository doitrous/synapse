import { GitFork } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Meter } from '@/components/ui/Meter'
import { usePersistentState } from '@/lib/usePersistentState'
import { useMastery } from '@/lib/useMastery'
import { CONCEPT_STORAGE_KEY, initialConceptGraph, type ConceptGraph } from '@/data/conceptGraph'
import { masteryBand, summarise, weakest, type ConceptMastery as Entry, type MasteryBand } from '@/data/mastery'

const BAND_TONE: Record<MasteryBand, 'neutral' | 'primary' | 'success' | 'warning' | 'danger'> = {
  unseen: 'neutral',
  practised: 'primary',
  shaky: 'danger',
  developing: 'warning',
  secure: 'success',
}

const BAND_LABEL: Record<MasteryBand, string> = {
  unseen: 'Not yet seen',
  practised: 'Practised',
  shaky: 'Shaky',
  developing: 'Developing',
  secure: 'Secure',
}

/**
 * What the student has actually demonstrated, concept by concept.
 *
 * The only panel on this page built from real work rather than sample data, so
 * it says where its numbers came from and stays empty until something has been
 * answered. An invented figure here would be worse than a blank space: it is
 * the panel a student would use to decide what to revise.
 */
export function ConceptMasteryPanel() {
  const { ledger } = useMastery()
  const [graph] = usePersistentState<ConceptGraph>(CONCEPT_STORAGE_KEY, initialConceptGraph)

  const summary = summarise(ledger)
  const label = (conceptId: string) =>
    graph.concepts.find((concept) => concept.id === conceptId)?.label ?? conceptId

  if (!summary.measured && !summary.practisedOnly) {
    return (
      <Panel>
        <PanelHeader title="Concept mastery" icon={GitFork} hint="Built from questions and practicals you have answered" />
        <div className="p-5">
          <p className="text-[13.5px] leading-relaxed text-ink-2">
            Nothing recorded yet. Answer a question, work through a clinical case, or read an
            interpretation set, and the concepts each item assesses will appear here.
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-ink-3">
            Only concepts an item actually tests are counted. A concept a scenario merely mentions
            is left out, so nothing here sends you to revise something you were never asked.
          </p>
        </div>
      </Panel>
    )
  }

  const ranked = weakest(ledger, 6)
  const accuracyPct = summary.accuracy == null ? null : Math.round(summary.accuracy * 100)

  return (
    <Panel>
      <PanelHeader
        title="Concept mastery"
        icon={GitFork}
        hint={`${summary.measured} concept${summary.measured === 1 ? '' : 's'} measured across ${summary.attempts} marked answer${summary.attempts === 1 ? '' : 's'}`}
      />
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div>
            <p className="font-mono text-[22px] font-semibold text-ink">{accuracyPct == null ? '—' : `${accuracyPct}%`}</p>
            <p className="text-[11.5px] text-ink-3">Accuracy on marked answers</p>
          </div>
          {summary.practisedOnly > 0 && (
            <div>
              <p className="font-mono text-[22px] font-semibold text-ink">{summary.practisedOnly}</p>
              <p className="text-[11.5px] text-ink-3">Practised on a station, never marked</p>
            </div>
          )}
        </div>

        {ranked.length > 0 && (
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-3">
              Weakest first
            </p>
            <ul className="space-y-2.5">
              {ranked.map((entry: Entry) => {
                const band = masteryBand(entry)
                const pct = Math.round((entry.correct / entry.attempts) * 100)
                return (
                  <li key={entry.conceptId}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="min-w-0 truncate text-[13.5px] text-ink">{label(entry.conceptId)}</span>
                      <span className="flex shrink-0 items-center gap-2">
                        <span className="font-mono text-[12px] text-ink-2">{entry.correct}/{entry.attempts}</span>
                        <Badge tone={BAND_TONE[band]}>{BAND_LABEL[band]}</Badge>
                      </span>
                    </div>
                    <Meter value={pct} tone={pct < 50 ? 'danger' : pct < 80 ? 'warning' : 'success'} className="mt-1" />
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        <p className="text-[11.5px] leading-relaxed text-ink-3">
          A station or checklist is scored by you, so it counts as practice rather than a marked
          answer. Concepts a scenario only mentions are never counted.
        </p>
      </div>
    </Panel>
  )
}
