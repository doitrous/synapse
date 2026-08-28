import { useT } from '@/lib/i18n'
import { RichHtml } from './RichHtml'
import type { CardWithMeta } from '@/lib/useFlashcards'

/**
 * How an image-occlusion card is shown during study: the image with its masks,
 * one occluder (or grouped set) asked, revealed on the back.
 *
 * Placeholder until the occlusion slice: it renders the note's header and back
 * honestly rather than a broken canvas. The occlusion editor owns this file and
 * will replace the body with the masked-image renderer (SVG overlays mapped from
 * image-space coordinates, resolving the image via `mediaStorage`).
 */
export function OcclusionCardFace({ entry, showAnswer }: { entry: CardWithMeta; showAnswer: boolean }) {
  const t = useT()
  const { note } = entry
  if (note.type !== 'image-occlusion') return null
  return (
    <div className="space-y-3 text-center">
      {note.fields.header && <RichHtml html={note.fields.header} className="font-serif text-[18px] text-ink" />}
      <p className="text-[13px] text-ink-3">{t('Image occlusion review will render here.')}</p>
      {showAnswer && note.fields.back && <RichHtml html={note.fields.back} className="text-[14px] text-ink-2" />}
    </div>
  )
}
