import { useState } from 'react'
import { ArrowLeft, Check, X } from 'lucide-react'
import {
  labelingComplete, markLabeling,
  type LabelingQuestionView, type LabelingResponse,
} from '@/data/labelingQuestion'
import { useT } from '@/lib/i18n'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { SubjectTag } from '@/components/ui/Subject'
import { cn } from '@/lib/cn'

/**
 * One labelled plate: name the structure at each pointer.
 *
 * The pins are positioned as percentages of the image, so they hold wherever it
 * is rendered — a phone, a laptop, a zoomed browser. A pixel offset would be
 * right only on the screen the author used.
 *
 * Answers are typed rather than chosen from a list. Recognition is not what a
 * practical exam tests: being shown "biceps brachii" among four options is a
 * different and much easier task than looking at the specimen and producing the
 * name, which is the thing the paper asks for.
 *
 * Marking is lenient about wording and strict about structure — see
 * `isLabelCorrect`.
 */
export function LabelingRunner({ question, onExit }: { question: LabelingQuestionView; onExit: () => void }) {
  const t = useT()
  const { imageUrl, altText, points } = question.labeling
  const [response, setResponse] = useState<LabelingResponse>({})
  const [checked, setChecked] = useState(false)

  const result = checked ? markLabeling(response, points) : null
  const complete = labelingComplete(response, points)

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

      <Panel className="mb-4 overflow-hidden">
        <div className="relative">
          <img src={imageUrl} alt={altText} className="block w-full" />
          {points.map((point) => {
            const right = result?.byPoint[point.id]
            return (
              <span
                key={point.id}
                // `-translate-*` centres the pin on the point rather than
                // hanging it below and to the right of it.
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                className={cn(
                  'absolute grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 font-mono text-[11px] font-bold shadow-pop',
                  right === true && 'border-success bg-success text-on-success',
                  right === false && 'border-danger bg-danger text-on-danger',
                  right === undefined && 'border-surface bg-primary text-on-primary',
                )}
                aria-hidden
              >
                {point.marker}
              </span>
            )
          })}
        </div>
      </Panel>

      <Panel>
        <PanelHeader
          title={t('Name each structure')}
          hint={result ? t('{correct} of {total} named').replace('{correct}', String(result.correct)).replace('{total}', String(result.total)) : undefined}
        />
        <ul className="divide-y divide-line">
          {points.map((point) => {
            const right = result?.byPoint[point.id]
            return (
              <li key={point.id} className="flex flex-wrap items-center gap-3 px-5 py-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line bg-surface-2 font-mono text-[11.5px] font-bold text-ink-2">
                  {point.marker}
                </span>
                <div className="min-w-[180px] flex-1">
                  <TextInput
                    value={response[point.id] ?? ''}
                    onChange={(event) => setResponse((current) => ({ ...current, [point.id]: event.target.value }))}
                    disabled={checked}
                    placeholder={t('Name this structure')}
                    aria-label={t('Structure {marker}').replace('{marker}', point.marker)}
                  />
                </div>
                {checked && (
                  <span className={cn('inline-flex items-center gap-1.5 text-[12.5px] font-medium',
                    right ? 'text-success' : 'text-danger')}>
                    <Icon icon={right ? Check : X} size={14} />
                    {/* A wrong answer is told what the answer was. Being told
                        only that you were wrong teaches nothing. */}
                    {right ? t('Correct') : point.answer}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </Panel>

      {!checked ? (
        <div className="mt-4">
          <Button variant="primary" disabled={!complete} onClick={() => setChecked(true)}>
            {complete ? t('Check answers') : t('Name every structure to check')}
          </Button>
        </div>
      ) : (
        question.learningObjective && (
          <Panel className="mt-4 p-5">
            <p className="text-[13.5px] leading-relaxed text-ink-2">{question.learningObjective}</p>
          </Panel>
        )
      )}
    </div>
  )
}
