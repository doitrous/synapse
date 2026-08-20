import { useState } from 'react'
import { ArrowLeft, Eye, FastForward, PenLine } from 'lucide-react'
import { coveredCount, type EssayQuestion } from '@/data/essay'
import { useEssayAnswers } from '@/lib/useEssayAnswers'
import { useRecordAttempt } from '@/lib/useAttemptLog'
import { useT } from '@/lib/i18n'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Checkbox } from '@/components/ui/Checkbox'
import { Textarea } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { SubjectTag } from '@/components/ui/Subject'

function Header({ essay, onExit }: { essay: EssayQuestion; onExit: () => void }) {
  const t = useT()
  return (
    <div className="mb-5">
      <button
        onClick={onExit}
        className="mb-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-2 transition-colors hover:text-ink"
      >
        <Icon icon={ArrowLeft} size={15} className="rtl:-scale-x-100" />
        {t('Back to essay questions')}
      </button>
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <SubjectTag id={essay.subjectId} />
      </div>
      <h1 className="mt-2 font-serif text-[22px] font-semibold tracking-[-0.02em] text-ink">{essay.title}</h1>
    </div>
  )
}

/**
 * One written question, taken through write, reveal, and self-mark.
 *
 * The helpers — key points, examiner note, model answer — are only ever
 * rendered once `stage` is `'revealed'`. That branch does not exist below the
 * write stage's return; there is no collapsed or hidden copy sitting in the
 * DOM for a curious student to find before they have written anything.
 */
export function EssayRunner({ essay, onExit }: { essay: EssayQuestion; onExit: () => void }) {
  const t = useT()
  const { answers, save } = useEssayAnswers()
  const logAttempt = useRecordAttempt()
  const saved = answers[essay.id]

  const [text, setText] = useState(saved?.text ?? '')
  // Reopening a question that was already revealed lands back on the mark
  // stage with the previous ticks, rather than making the student write again
  // to see helpers they have already earned this sitting.
  const [stage, setStage] = useState<'write' | 'revealed'>(saved?.ticked != null ? 'revealed' : 'write')
  const [ticked, setTicked] = useState<Set<string>>(() => new Set(saved?.ticked ?? []))

  const pointIds = essay.keyPoints.map((point) => point.id)
  const covered = stage === 'revealed' ? coveredCount([...ticked], pointIds) : null

  function reveal() {
    if (stage === 'revealed') return
    setStage('revealed')
    save(essay.id, { text, ticked: [...ticked] })
    // Marked by the student, not the app — see AttemptRecord.correct in
    // src/data/attempts.ts. `seconds` is null for the same reason: nothing
    // here times how long the student took.
    logAttempt({
      surface: 'essay',
      itemId: essay.id,
      subjectId: essay.subjectId,
      topic: essay.title,
      difficulty: 'Moderate',
      conceptIds: [],
      correct: null,
      seconds: null,
      sessionId: `essay-${essay.id}-${Date.now().toString(36)}`,
    })
  }

  function changeText(next: string) {
    setText(next)
    save(essay.id, { text: next, ticked: stage === 'revealed' ? [...ticked] : null })
  }

  function toggle(pointId: string) {
    setTicked((current) => {
      const next = new Set(current)
      if (next.has(pointId)) next.delete(pointId)
      else next.add(pointId)
      save(essay.id, { text, ticked: [...next] })
      return next
    })
  }

  return (
    <div className="mx-auto max-w-[720px] px-4 py-6 sm:px-6">
      <Header essay={essay} onExit={onExit} />

      <Panel className="p-5">
        <p className="text-[15px] font-medium leading-relaxed text-ink">{essay.prompt}</p>
        <Textarea
          value={text}
          onChange={(event) => changeText(event.target.value)}
          rows={8}
          placeholder={t('Write your answer…')}
          aria-label={t('Your answer')}
          className="mt-3"
        />
        {stage === 'write' && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button variant="primary" iconLeft={Eye} disabled={!text.trim()} onClick={reveal}>
              {t('Reveal')}
            </Button>
            <Button variant="ghost" iconLeft={FastForward} onClick={reveal}>
              {t('Skip and show me')}
            </Button>
          </div>
        )}
      </Panel>

      {stage === 'revealed' && (
        <div className="mt-4 space-y-4">
          <Panel>
            <PanelHeader
              title={t('Key points')}
              hint={
                covered
                  ? t('{covered} of {total} points covered')
                      .replace('{covered}', String(covered.covered))
                      .replace('{total}', String(covered.total))
                  : undefined
              }
            />
            <ul className="divide-y divide-line px-5">
              {essay.keyPoints.map((point) => (
                <li key={point.id} className="flex items-start gap-3 py-3">
                  <Checkbox checked={ticked.has(point.id)} onChange={() => toggle(point.id)} label={point.text} className="mt-0.5" />
                  <span className="flex-1 text-[13.5px] leading-relaxed text-ink">{point.text}</span>
                  {point.legible && (
                    <Badge tone="primary">
                      <Icon icon={PenLine} size={11} />
                      {t('Write legibly')}
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('What the examiner scans for')}</p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{essay.examinerNote}</p>
          </Panel>

          <Panel className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Model answer')}</p>
            <p className="mt-1.5 whitespace-pre-wrap text-[13.5px] leading-relaxed text-ink-2">{essay.modelAnswer}</p>
          </Panel>
        </div>
      )}
    </div>
  )
}
