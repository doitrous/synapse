import { Fragment } from 'react'
import { useT } from '@/lib/i18n'
import { RichHtml } from './RichHtml'
import { renderClozeSide } from '@/data/flashcards/cloze'
import type { CardWithMeta } from '@/lib/useFlashcards'

/**
 * The face of a card during study, for each note type.
 *
 * Basic renders its two rich fields. Cloze renders the source text with the
 * active deletion shown as a blank on the front and revealed on the back, every
 * other deletion shown in place — the structured cells from `renderClozeSide`,
 * so the markup never has to be parsed twice or trusted as HTML. Image occlusion
 * rendering arrives with the occlusion editor; until then no such card exists to
 * reach this component, and the fallback is honest rather than broken.
 */
export function StudyCardFace({ entry, showAnswer }: { entry: CardWithMeta; showAnswer: boolean }) {
  const t = useT()
  const { note, card } = entry

  if (note.type === 'basic') {
    return (
      <div className="space-y-0 text-center">
        <RichHtml html={note.fields.front} className="font-serif text-[20px] font-medium text-ink" />
        {showAnswer && (
          <div className="mt-6 border-t border-line pt-6">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.07em] text-ink-3">{t('Answer')}</p>
            <RichHtml html={note.fields.back} className="text-[15px] text-ink" />
          </div>
        )}
      </div>
    )
  }

  if (note.type === 'cloze') {
    const activeNumber = Number(card.templateKey.replace(/^c/, ''))
    const cells = renderClozeSide(note.fields.text, activeNumber, showAnswer ? 'back' : 'front')
    return (
      <div className="space-y-4 text-center">
        <p className="font-serif text-[19px] leading-relaxed text-ink">
          {cells.map((cell, i) => (
            <Fragment key={i}>
              {cell.kind === 'text' && <span>{cell.text}</span>}
              {cell.kind === 'blank' && (
                <span className="mx-0.5 rounded bg-accent-tint px-2 py-0.5 font-mono text-[15px] text-accent-strong">
                  {cell.hint ? `[${cell.hint}]` : '[…]'}
                </span>
              )}
              {cell.kind === 'answer' && (
                <span className="mx-0.5 rounded bg-primary-tint px-2 py-0.5 font-semibold text-primary-strong">{cell.text}</span>
              )}
            </Fragment>
          ))}
        </p>
        {showAnswer && note.fields.extra && (
          <div className="border-t border-line pt-4">
            <RichHtml html={note.fields.extra} className="text-[14px] text-ink-2" />
          </div>
        )}
      </div>
    )
  }

  // image-occlusion — full rendering ships with the occlusion editor.
  return (
    <div className="space-y-3 text-center">
      {note.fields.header && <RichHtml html={note.fields.header} className="font-serif text-[18px] text-ink" />}
      <p className="text-[13px] text-ink-3">{t('Image occlusion review renders with the occlusion editor.')}</p>
      {showAnswer && note.fields.back && <RichHtml html={note.fields.back} className="text-[14px] text-ink-2" />}
    </div>
  )
}
