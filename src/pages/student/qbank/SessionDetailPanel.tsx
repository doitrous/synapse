import type { Question } from '@/data/qbank'
import type { SessionDetail } from '@/data/attemptStats'
import { useSubjectName } from '@/lib/useSubjectName'
import { Meter } from '@/components/ui/Meter'
import { SubjectDot } from '@/components/ui/Subject'
import { cn } from '@/lib/cn'
import { LETTERS, clock } from './state'

/** One number with its name under it, for the row of figures on a sitting. */
function DetailStat({ label, value, tone }: { label: string; value: string; tone?: 'good' | 'bad' }) {
  return (
    <div>
      <p className={cn(
        'tnum font-mono text-[17px] font-semibold leading-none',
        tone === 'good' ? 'text-success' : tone === 'bad' ? 'text-danger' : 'text-ink',
      )}>{value}</p>
      <p className="mt-1 text-[11.5px] text-ink-3">{label}</p>
    </div>
  )
}

/**
 * Everything one sitting can say about itself.
 *
 * All of it derived from the records that sitting produced — see
 * `sessionDetail`. Nothing here is stored a second time, so deleting a test
 * changes these figures the same way it changes every other number in the app.
 */
export function SessionDetailPanel({
  detail,
  questions,
  total,
  t,
}: {
  detail: SessionDetail
  questions: Question[]
  total?: number
  t: (key: string) => string
}) {
  const subjectName = useSubjectName()
  const minutes = Math.round(detail.durationSeconds / 60)
  const omitted = Math.max(0, (total ?? detail.answered) - detail.answered)
  const pace = [
    { key: 'good' as const, label: t('Good · 45s or less'), color: 'bg-success' },
    { key: 'target' as const, label: t('Target · 46–60s'), color: 'bg-primary' },
    { key: 'slower' as const, label: t('Slower · 61–90s'), color: 'bg-warning' },
    { key: 'overtime' as const, label: t('Overtime · over 90s'), color: 'bg-danger' },
  ]
  const paced = Object.values(detail.pace).reduce((sum, value) => sum + value, 0)
  const nextAction = detail.repeatedWeaknesses.length
    ? `${t('Revisit')} ${detail.repeatedWeaknesses.slice(0, 2).join(', ')} ${t('before your next block; these topics have cost marks more than once.')}`
    : detail.weakestTopic
      ? `${t('Review')} ${detail.weakestTopic.key} ${t('and retest it while the reasoning is still fresh.')}`
      : detail.averageSeconds != null && detail.averageSeconds > 60
        ? t('Your next gain is pace: use a short timed block and aim to commit each answer by 60 seconds.')
        : detail.wrong > 0
          ? t('Review the missed answers below, then retake the same scope with fresh questions.')
          : t('This block is secure. Keep the spacing effect by revisiting it later rather than repeating it immediately.')
  return (
    <div className="border-t border-line bg-surface-2/40 px-4 py-4 sm:px-5">
      <div className="flex flex-wrap gap-x-8 gap-y-4">
        <DetailStat label={t('Right')} value={String(detail.correct)} tone={detail.correct > 0 ? 'good' : undefined} />
        <DetailStat label={t('Wrong')} value={String(detail.wrong)} tone={detail.wrong > 0 ? 'bad' : undefined} />
        {/* Only shown when there is one. A nought here would invite the student
            to wonder what they had failed to have marked. */}
        {detail.unmarked > 0 && <DetailStat label={t('Unmarked')} value={String(detail.unmarked)} />}
        {omitted > 0 && <DetailStat label={t('Omitted')} value={String(omitted)} />}
        <DetailStat label={t('Accuracy')} value={detail.accuracy == null ? '—' : `${Math.round(detail.accuracy * 100)}%`} />
        {detail.durationSeconds > 0 && <DetailStat label={t('Total time')} value={minutes >= 1 ? `${minutes}m` : `${detail.durationSeconds}s`} />}
        {detail.overtimeSeconds > 0 && <DetailStat label={t('Overtime')} value={`+${clock(detail.overtimeSeconds)}`} tone="bad" />}
        {detail.averageSeconds != null && <DetailStat label={t('Average / question')} value={`${detail.averageSeconds}s`} />}
        {detail.medianSeconds != null && <DetailStat label={t('Median / question')} value={`${detail.medianSeconds}s`} />}
      </div>

      {paced > 0 && (
        <div className="mt-5 border-t border-line pt-4">
          <p className="mb-2 text-[13px] font-semibold text-ink">{t('Pace distribution')}</p>
          <div className="flex h-2.5 overflow-hidden rounded-full bg-inset" aria-hidden>
            {pace.map((band) => detail.pace[band.key] > 0 && (
              <span key={band.key} className={band.color} style={{ width: `${(detail.pace[band.key] / paced) * 100}%` }} />
            ))}
          </div>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {pace.map((band) => (
              <li key={band.key} className="flex items-center gap-2 text-[11.5px] text-ink-2">
                <span className={cn('size-2 rounded-full', band.color)} aria-hidden />
                <span className="flex-1">{band.label}</span>
                <span className="tnum font-mono text-ink">{detail.pace[band.key]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {detail.subjects.length > 1 && (
        <div className="mt-4">
          <p className="mb-2 text-[13px] font-semibold text-ink">{t('By subject')}</p>
          <ul className="space-y-1.5">
            {detail.subjects.map((subject) => (
              <li key={subject.key} className="flex items-center gap-2.5 text-[12px]">
                <span className="inline-flex min-w-0 flex-1 items-center gap-1.5 text-ink-2">
                  <SubjectDot id={subject.key} />
                  <span className="truncate">{subjectName(subject.key)}</span>
                </span>
                <Meter value={subject.accuracy == null ? 0 : Math.round(subject.accuracy * 100)} className="w-24 shrink-0" />
                <span className="tnum w-16 shrink-0 text-end font-mono text-ink-3">
                  {subject.accuracy == null ? '—' : `${subject.correct}/${subject.marked}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {detail.missed.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-[13px] font-semibold text-ink">{t('Where you lost marks')}</p>
          <ul className="flex flex-wrap gap-1.5">
            {detail.missed.map((topic) => (
              <li
                key={topic.key}
                className="inline-flex items-center gap-1.5 rounded-full border border-danger/25 bg-danger-tint/60 px-2.5 py-0.5 text-[11.5px] text-ink-2"
              >
                {topic.key}
                <span className="tnum font-mono text-[10.5px] text-danger">{topic.marked - topic.correct}</span>
              </li>
            ))}
          </ul>
          {/* Named separately from the list above, because "you got one wrong"
              and "you do not know this" are different claims. */}
          {detail.weakestTopic && (
            <p className="mt-2 text-[11.5px] text-ink-3">
              {t('Weakest here')}: <span className="font-medium text-ink-2">{detail.weakestTopic.key}</span>
              {' '}({detail.weakestTopic.correct}/{detail.weakestTopic.marked})
            </p>
          )}
        </div>
      )}

      {detail.subtopics.length > 0 && (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {detail.subtopics.slice(0, 8).map((subtopic) => {
            const pct = subtopic.accuracy == null ? 0 : Math.round(subtopic.accuracy * 100)
            return (
              <div key={subtopic.key} className="rounded-lg border border-line bg-surface px-3 py-2.5">
                <div className="flex items-start justify-between gap-3 text-[11.5px]">
                  <span className="min-w-0 truncate text-ink-2" title={subtopic.key}>{subtopic.key}</span>
                  <span className="tnum shrink-0 font-mono text-ink">{subtopic.accuracy == null ? '—' : `${pct}%`}</span>
                </div>
                <Meter value={pct} tone={pct >= 80 ? 'success' : pct >= 60 ? 'primary' : 'warning'} className="mt-2" />
              </div>
            )
          })}
        </div>
      )}

      {detail.answers.length > 0 && (
        <div className="mt-5 border-t border-line pt-4">
          <p className="mb-2 text-[13px] font-semibold text-ink">{t('Answer review')}</p>
          <ol className="space-y-2">
            {detail.answers.map((answer, index) => {
              const question = questions.find((item) => item.id === answer.itemId)
              const picked = typeof answer.selectedIndex === 'number' ? question?.options[answer.selectedIndex] : undefined
              const keyed = typeof answer.correctIndex === 'number' ? question?.options[answer.correctIndex] : undefined
              return (
                <li key={answer.itemId} className="rounded-lg border border-line bg-surface px-3 py-3">
                  <div className="flex items-start gap-2">
                    <span className="tnum grid size-6 shrink-0 place-items-center rounded-full bg-inset font-mono text-[10.5px] text-ink-2">{index + 1}</span>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-[12.5px] font-medium leading-snug text-ink">{question?.stem ?? answer.topic}</p>
                      {answer.correct === true ? (
                        <p className="mt-1 text-[11.5px] text-success">{t('Correct')} {picked ? `· ${LETTERS[answer.selectedIndex!]} · ${picked.text}` : ''}</p>
                      ) : answer.correct === false ? (
                        <div className="mt-1 space-y-0.5 text-[11.5px] leading-snug">
                          {/* "Correct" alone, right under the option this student
                              picked, reads as being told they got it right. Naming
                              both sides — whose pick this is, and which one the key
                              names — leaves no room to misread it either way. */}
                          <p className="text-danger">{t('Your answer')}: {picked ? `${LETTERS[answer.selectedIndex!]} · ${picked.text}` : t('Not retained for this legacy attempt')}</p>
                          <p className="text-success">{t('Correct answer')}: {keyed ? `${LETTERS[answer.correctIndex!]} · ${keyed.text}` : t('Review the question explanation')}</p>
                        </div>
                      ) : (
                        <p className="mt-1 text-[11.5px] text-ink-3">{t('This activity was not marked against a key.')}</p>
                      )}
                    </div>
                    {answer.seconds != null && <span className="tnum shrink-0 font-mono text-[11px] text-ink-3">{answer.seconds}s</span>}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      )}

      <div className="mt-5 rounded-lg border border-primary-line bg-primary-tint/35 px-3.5 py-3">
        <p className="text-[12.5px] font-medium text-primary-strong">{t('Next action')}</p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-ink-2">{nextAction}</p>
      </div>
    </div>
  )
}
