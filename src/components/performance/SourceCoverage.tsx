import { Layers } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Meter } from '@/components/ui/Meter'
import { usePublishedQuestions } from '@/lib/usePublishedQuestions'
import { sourceCoverage } from '@/data/sourceCoverage'
import type { AttemptRecord } from '@/data/attempts'

function tone(pct: number): 'danger' | 'warning' | 'success' {
  return pct < 34 ? 'danger' : pct < 67 ? 'warning' : 'success'
}

/**
 * How much of each MCQ source the student has worked through — questions seen
 * and concepts seen, per source. A coverage view, not an accuracy one: a bar
 * fills as a question is answered at all, right or wrong. Denominators are the
 * published questions the student can draw from, so the figure is honest about
 * what is left. Hidden entirely until some source-tagged questions exist.
 */
export function SourceCoveragePanel({ records }: { records: AttemptRecord[] }) {
  const questions = usePublishedQuestions()
  const answered = new Set(records.map((r) => r.itemId))
  const rows = sourceCoverage(questions, answered)

  if (rows.length === 0) return <></>

  return (
    <Panel>
      <PanelHeader
        title="Coverage by source"
        icon={Layers}
        hint="Questions and concepts you have seen, by source"
      />
      <div className="space-y-5 p-5">
        {rows.map((row) => {
          const qPct = row.questionsAvailable ? Math.round((row.questionsAnswered / row.questionsAvailable) * 100) : 0
          const cPct = row.conceptsAvailable ? Math.round((row.conceptsSeen / row.conceptsAvailable) * 100) : 0
          return (
            <div key={row.bucket}>
              <p className="mb-1.5 text-[13.5px] font-medium text-ink">{row.label}</p>
              <div className="space-y-2">
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11.5px] text-ink-3">Questions</span>
                    <span className="font-mono text-[12px] text-ink-2">{row.questionsAnswered}/{row.questionsAvailable}</span>
                  </div>
                  <Meter value={qPct} tone={tone(qPct)} className="mt-1" />
                </div>
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11.5px] text-ink-3">Concepts</span>
                    <span className="font-mono text-[12px] text-ink-2">{row.conceptsSeen}/{row.conceptsAvailable}</span>
                  </div>
                  <Meter value={cPct} tone={tone(cPct)} className="mt-1" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}
