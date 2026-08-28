import type { ContentReport } from '@/data/contentReports'
import type { PreviewAnchor } from '@/components/review/StudentFaithfulPreview'
import type { AnswerLetter, MediaSlot } from '@/data/mediaLibrary'

const SLOT_VALUES: MediaSlot[] = ['stem', 'answer', 'explanation']
const ANSWER_LETTER = /^[A-F]$/i

/**
 * A report's `field`/`anchor` are free text — whatever a reporter (or, so far,
 * nothing yet, since the create dialog does not collect them) typed or a
 * caller supplied — not the structured `{ slot, answerLabel }` a question
 * preview keys off. This is the one heuristic that turns one into the other,
 * so it exists once rather than being re-guessed everywhere a report opens a
 * preview:
 *
 *  - `field` that reads exactly "stem" / "answer" / "explanation" becomes the
 *    matching `slot`; anything else is passed through as `section` (an article
 *    heading, a practical decision title — `AnchorFrame`'s other match path).
 *  - `anchor` that is a single letter A–F becomes `answerLabel`; anything else
 *    is passed through as `quote` (substring-matched against block text).
 *
 * Neither guess is exclusive with the other's fallback, so a plain-language
 * `field` ("Explanation") still highlights something even without a letter.
 */
export function reportPreviewAnchor(report: Pick<ContentReport, 'field' | 'anchor'>): PreviewAnchor | undefined {
  const field = report.field?.trim()
  const anchor = report.anchor?.trim()
  if (!field && !anchor) return undefined

  const slot = field && SLOT_VALUES.includes(field.toLowerCase() as MediaSlot)
    ? (field.toLowerCase() as MediaSlot)
    : undefined
  const answerLabel = anchor && ANSWER_LETTER.test(anchor)
    ? (anchor.toUpperCase() as AnswerLetter)
    : undefined

  return {
    section: !slot && field ? field : undefined,
    slot,
    answerLabel,
    quote: !answerLabel && anchor ? anchor : undefined,
  }
}
