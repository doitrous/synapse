import { useState } from 'react'
import { ArrowLeft, Check, Minus, X } from 'lucide-react'
import type { AnswerLabel } from '@/data/contentControl'
import { markMultiResponse, type MultiResponseQuestionView } from '@/data/multiResponseQuestion'
import { useT } from '@/lib/i18n'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { SubjectTag } from '@/components/ui/Subject'
import { cn } from '@/lib/cn'

/**
 * One "select all that apply" question.
 *
 * The result is shown as what was chosen wrongly and what was left out, kept
 * apart. Those are different mistakes: picking something wrong means a
 * misconception about that option, while missing something means not knowing it
 * belonged. A single fraction reports both as "you got 2 of 4" and tells the
 * student nothing about which to go and read.
 *
 * Every option is marked after checking — right ones the student found, right
 * ones they missed, and wrong ones they picked — because the point of the
 * feedback is the whole set, not their score on it.
 */
export function MultiResponseRunner({ question, onExit }: { question: MultiResponseQuestionView; onExit: () => void }) {
  const t = useT()
  const [chosen, setChosen] = useState<AnswerLabel[]>([])
  const [checked, setChecked] = useState(false)

  const result = checked ? markMultiResponse(chosen, question.correctAnswers) : null
  const right = new Set(question.correctAnswers)

  function toggle(label: AnswerLabel) {
    setChosen((current) => current.includes(label)
      ? current.filter((entry) => entry !== label)
      : [...current, label])
  }

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
        <p className="mt-1 text-[12.5px] text-ink-3">
          {t('Select all that apply — {n} are correct.').replace('{n}', String(question.correctAnswers.length))}
        </p>
      </div>

      <Panel className="mb-4 p-5">
        <p className="text-[15px] font-medium leading-relaxed text-ink">{question.stem}</p>
      </Panel>

      <ul className="space-y-2">
        {question.options.map((option) => {
          const picked = chosen.includes(option.label)
          const isRight = right.has(option.label)
          const verdict = !checked ? null : picked && isRight ? 'hit' : picked ? 'wrong' : isRight ? 'missed' : null
          return (
            <li key={option.label}>
              <button
                type="button"
                disabled={checked}
                aria-pressed={picked}
                onClick={() => toggle(option.label)}
                className={cn(
                  'flex w-full items-start gap-3 rounded-lg border p-4 text-start transition-colors',
                  verdict === 'hit' && 'border-success-line bg-success-tint',
                  verdict === 'wrong' && 'border-danger-line bg-danger-tint',
                  verdict === 'missed' && 'border-warning-line bg-warning-tint',
                  !verdict && picked && 'border-primary-line bg-primary-tint',
                  !verdict && !picked && 'border-line bg-surface hover:bg-inset/60',
                )}
              >
                <span className={cn(
                  'grid size-6 shrink-0 place-items-center rounded font-mono text-[11.5px] font-bold',
                  picked ? 'bg-primary text-on-primary' : 'border border-line bg-surface-2 text-ink-2',
                )}>
                  {option.label}
                </span>
                <span className="flex-1 text-[14px] leading-relaxed text-ink">{option.text}</span>
                {verdict && (
                  <span className={cn('inline-flex shrink-0 items-center gap-1 text-[12px] font-medium',
                    verdict === 'hit' && 'text-success',
                    verdict === 'wrong' && 'text-danger',
                    verdict === 'missed' && 'text-warning',
                  )}>
                    <Icon icon={verdict === 'hit' ? Check : verdict === 'wrong' ? X : Minus} size={14} />
                    {verdict === 'hit' ? t('Correct') : verdict === 'wrong' ? t('Not this one') : t('You missed this')}
                  </span>
                )}
              </button>
              {checked && option.explanation && (
                <p className="mt-1 px-4 text-[12.5px] leading-relaxed text-ink-2">{option.explanation}</p>
              )}
            </li>
          )
        })}
      </ul>

      {!checked ? (
        <div className="mt-4">
          <Button variant="primary" disabled={chosen.length === 0} onClick={() => setChecked(true)}>
            {t('Check answers')}
          </Button>
        </div>
      ) : (
        <Panel className="mt-4 p-5">
          <p className="font-serif text-[17px] font-semibold text-ink">
            {result!.allCorrect
              ? t('All correct.')
              : t('{wrong} chosen wrongly, {missed} left out')
                  .replace('{wrong}', String(result!.falsePositive.length))
                  .replace('{missed}', String(result!.missed.length))}
          </p>
          {question.learningObjective && (
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{question.learningObjective}</p>
          )}
        </Panel>
      )}
    </div>
  )
}
