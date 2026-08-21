import { useState } from 'react'
import { ArrowLeft, Check, X } from 'lucide-react'
import {
  markMatching, matchingComplete,
  type MatchingQuestionView, type MatchingResponse,
} from '@/data/matchingQuestion'
import { useT } from '@/lib/i18n'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { SubjectTag } from '@/components/ui/Subject'
import { cn } from '@/lib/cn'

/**
 * One matching question: pick an option for each prompt, then check.
 *
 * The whole block is shown at once and marked at once, which is how a paper
 * sets it. Marking prompt by prompt as the student goes would let them work the
 * later prompts out by elimination from the ones already confirmed — the
 * opposite of what a matching block tests, which is telling near neighbours
 * apart against each other.
 *
 * Scored per prompt, because a five-prompt block is five marks and not one.
 */
export function MatchingRunner({ question, onExit }: { question: MatchingQuestionView; onExit: () => void }) {
  const t = useT()
  const { options, prompts } = question.matching
  const [response, setResponse] = useState<MatchingResponse>({})
  const [checked, setChecked] = useState(false)

  const result = checked ? markMatching(response, prompts) : null
  const complete = matchingComplete(response, prompts)

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

      <Panel className="mb-4 p-5">
        <p className="text-[15px] font-medium leading-relaxed text-ink">{question.stem}</p>
      </Panel>

      <Panel className="mb-4">
        <PanelHeader title={t('Options')} hint={t('An option may answer more than one prompt.')} />
        <ul className="divide-y divide-line">
          {options.map((option) => (
            <li key={option.id} className="flex items-start gap-3 px-5 py-2.5">
              <span className="grid size-6 shrink-0 place-items-center rounded-full border border-line bg-surface-2 font-mono text-[11.5px] font-bold text-ink-2">
                {option.id}
              </span>
              <span className="text-[13.5px] leading-relaxed text-ink">{option.text}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <div className="space-y-3">
        {prompts.map((prompt, index) => {
          const chosen = response[prompt.id]
          const right = result?.byPrompt[prompt.id]
          return (
            <Panel key={prompt.id} className="p-4">
              <p className="text-[14px] leading-relaxed text-ink">
                <span className="me-2 font-mono text-[12.5px] text-ink-3">{index + 1}.</span>
                {prompt.text}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {options.map((option) => {
                  const picked = chosen === option.id
                  // After checking, the answer is shown on the option that was
                  // right — not only on the one picked, or a student who chose
                  // wrongly is told they were wrong and never told what was right.
                  const isAnswer = checked && option.id === prompt.answerId
                  return (
                    <button
                      key={option.id}
                      type="button"
                      disabled={checked}
                      aria-pressed={picked}
                      aria-label={`${prompt.text} — ${option.id}`}
                      onClick={() => setResponse((current) => ({ ...current, [prompt.id]: option.id }))}
                      className={cn(
                        'grid size-8 place-items-center rounded-md border font-mono text-[12.5px] font-bold transition-colors',
                        isAnswer && 'border-success-line bg-success-tint text-success',
                        picked && !checked && 'border-primary-line bg-primary-tint text-primary-strong',
                        picked && checked && !right && 'border-danger-line bg-danger-tint text-danger',
                        !picked && !isAnswer && 'border-line bg-surface text-ink-2 hover:bg-inset',
                      )}
                    >
                      {option.id}
                    </button>
                  )
                })}
                {checked && (
                  <span className={cn('ms-1 inline-flex items-center gap-1 text-[12.5px] font-medium',
                    right ? 'text-success' : 'text-danger')}>
                    <Icon icon={right ? Check : X} size={14} />
                    {right ? t('Correct') : t('Answer: {id}').replace('{id}', prompt.answerId)}
                  </span>
                )}
              </div>
            </Panel>
          )
        })}
      </div>

      {!checked ? (
        <div className="mt-4">
          <Button variant="primary" disabled={!complete} onClick={() => setChecked(true)}>
            {complete
              ? t('Check answers')
              : t('Match every prompt to check')}
          </Button>
        </div>
      ) : (
        <Panel className="mt-4 p-5">
          <p className="tnum font-serif text-[17px] font-semibold text-ink">
            {t('{correct} of {total} matched').replace('{correct}', String(result!.correct)).replace('{total}', String(result!.total))}
          </p>
          {question.learningObjective && (
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{question.learningObjective}</p>
          )}
        </Panel>
      )}
    </div>
  )
}
