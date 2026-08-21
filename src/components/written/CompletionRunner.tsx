import { useState } from 'react'
import { ArrowLeft, Check, X } from 'lucide-react'
import {
  completionComplete, markCompletion,
  type CompletionQuestionView, type CompletionResponse,
} from '@/data/completionQuestion'
import { useT } from '@/lib/i18n'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { SubjectTag } from '@/components/ui/Subject'
import { cn } from '@/lib/cn'

/**
 * One completion question: a sentence with words taken out of it.
 *
 * The blanks are inputs sitting inline in the sentence, not a numbered list
 * beneath it, because the sentence is what carries the meaning — reading "the
 * ___ node lies in the ___" and then hunting for boxes 1 and 2 somewhere else
 * asks the student to hold the sentence in their head while they answer it.
 *
 * Each input is sized to its own answer so the sentence still reads as a
 * sentence, and so the gap does not quietly tell the student how long the word
 * is: every blank is the same width regardless of what belongs in it.
 */
export function CompletionRunner({ question, onExit }: { question: CompletionQuestionView; onExit: () => void }) {
  const t = useT()
  const { segments, blanks } = question.completion
  const [response, setResponse] = useState<CompletionResponse>({})
  const [checked, setChecked] = useState(false)

  const result = checked ? markCompletion(response, blanks) : null
  const complete = completionComplete(response, blanks)

  return (
    <div className="mx-auto max-w-[720px] px-4 py-6 sm:px-6">
      <div className="mb-5">
        <button
          onClick={onExit}
          className="mb-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-2 transition-colors hover:text-ink"
        >
          <Icon icon={ArrowLeft} size={15} className="rtl:-scale-x-100" />
          {t('Back to written questions')}
        </button>
        <SubjectTag id={question.subjectId} />
        <h1 className="mt-2 font-serif text-[22px] font-semibold tracking-[-0.02em] text-ink">{question.title}</h1>
      </div>

      <Panel className="p-5">
        <p className="text-[15px] leading-[2.2] text-ink">
          {segments.map((segment, index) => {
            if (segment.kind === 'text') {
              return <span key={index}>{segment.text}</span>
            }
            const { blank } = segment
            const right = result?.byBlank[blank.id]
            return (
              <input
                key={blank.id}
                type="text"
                value={response[blank.id] ?? ''}
                disabled={checked}
                onChange={(event) => setResponse((current) => ({ ...current, [blank.id]: event.target.value }))}
                aria-label={t('Blank {n}').replace('{n}', String(blanks.indexOf(blank) + 1))}
                // A fixed width, so the size of the gap is not a hint about the
                // length of the word that belongs in it.
                className={cn(
                  'mx-1 w-[10rem] rounded border-b-2 bg-transparent px-1.5 py-0.5 text-[14.5px] text-ink outline-none transition-colors',
                  right === true && 'border-success text-success',
                  right === false && 'border-danger text-danger',
                  right === undefined && 'border-line-2 focus:border-primary',
                )}
              />
            )
          })}
        </p>
      </Panel>

      {checked && (
        <Panel className="mt-4">
          <ul className="divide-y divide-line">
            {blanks.map((blank, index) => {
              const right = result!.byBlank[blank.id]
              return (
                <li key={blank.id} className="flex flex-wrap items-center gap-3 px-5 py-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line bg-surface-2 font-mono text-[11.5px] font-bold text-ink-2">
                    {index + 1}
                  </span>
                  <span className={cn('inline-flex items-center gap-1.5 text-[13px] font-medium',
                    right ? 'text-success' : 'text-danger')}>
                    <Icon icon={right ? Check : X} size={14} />
                    {/* A wrong answer is shown the answer. Being told only that
                        you were wrong teaches nothing. */}
                    {right ? t('Correct') : blank.answer}
                  </span>
                  {!right && response[blank.id]?.trim() && (
                    <span className="text-[12.5px] text-ink-3">
                      {t('You wrote: {answer}').replace('{answer}', response[blank.id])}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </Panel>
      )}

      {!checked ? (
        <div className="mt-4">
          <Button variant="primary" disabled={!complete} onClick={() => setChecked(true)}>
            {complete ? t('Check answers') : t('Fill every blank to check')}
          </Button>
        </div>
      ) : (
        <Panel className="mt-4 p-5">
          <p className="tnum font-serif text-[17px] font-semibold text-ink">
            {t('{correct} of {total} filled in correctly')
              .replace('{correct}', String(result!.correct))
              .replace('{total}', String(result!.total))}
          </p>
          {question.learningObjective && (
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{question.learningObjective}</p>
          )}
        </Panel>
      )}
    </div>
  )
}
