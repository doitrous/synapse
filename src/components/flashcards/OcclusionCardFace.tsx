import { useEffect, useState } from 'react'
import { useT } from '@/lib/i18n'
import { resolveMediaSource } from '@/lib/mediaStorage'
import { RichHtml } from './RichHtml'
import type { CardWithMeta } from '@/lib/useFlashcards'
import type { ImageOcclusionNote, Occluder, OccluderShape } from '@/data/flashcards/model'
import { richToPlainText } from '@/data/flashcards/richText'

/**
 * An image-occlusion card during study: the image with SVG masks in image-space
 * (the viewBox is the image's own pixel box, so masks land exactly). The card's
 * `templateKey` names the occluder id — or the group id — being asked. Which
 * regions are masked depends on the mode and on whether the answer is shown; the
 * asked region is revealed on the back, with its label.
 */
export function OcclusionCardFace({ entry, showAnswer }: { entry: CardWithMeta; showAnswer: boolean }) {
  const { note, card } = entry
  if (note.type !== 'image-occlusion') return null

  const asked = askedOccluders(note, card.templateKey)
  const askedIds = new Set(asked.map((o) => o.id))
  const askedLabel = asked.map((o) => richToPlainText(o.label)).filter(Boolean).join(' · ')

  return (
    <div className="space-y-3 text-center">
      {note.fields.header && <RichHtml html={note.fields.header} className="font-serif text-[17px] text-ink" />}
      <OcclusionImage note={note} askedIds={askedIds} showAnswer={showAnswer} />
      {showAnswer && (
        <div className="space-y-2 border-t border-line pt-3">
          {askedLabel && <p className="text-[15px] font-medium text-primary-strong">{askedLabel}</p>}
          {note.fields.back && <RichHtml html={note.fields.back} className="text-[13.5px] text-ink-2" />}
        </div>
      )}
    </div>
  )
}

function askedOccluders(note: ImageOcclusionNote, templateKey: string): Occluder[] {
  const asGroup = note.occluders.filter((o) => o.groupId === templateKey)
  if (asGroup.length > 0) return asGroup
  const single = note.occluders.find((o) => o.id === templateKey)
  return single ? [single] : []
}

function OcclusionImage({ note, askedIds, showAnswer }: { note: ImageOcclusionNote; askedIds: Set<string>; showAnswer: boolean }) {
  const t = useT()
  const [src, setSrc] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let revokeUrl: string | null = null
    let alive = true
    resolveMediaSource(note.image)
      .then(({ url, revoke }) => { if (!alive) { if (revoke) URL.revokeObjectURL(url); return } if (revoke) revokeUrl = url; setSrc(url) })
      .catch(() => alive && setFailed(true))
    return () => { alive = false; if (revokeUrl) URL.revokeObjectURL(revokeUrl) }
  }, [note.image])

  if (failed) return <p className="text-[13px] text-danger">{t('The image for this card could not be loaded.')}</p>
  if (!src) return <div className="grid h-40 place-items-center rounded-lg border border-line bg-surface-2 text-[12.5px] text-ink-3">{t('Loading image…')}</div>

  return (
    <svg
      viewBox={`0 0 ${note.imageWidth} ${note.imageHeight}`}
      className="mx-auto block max-h-[52vh] w-full rounded-lg border border-line"
      style={{ aspectRatio: `${note.imageWidth} / ${note.imageHeight}` }}
      role="img"
      aria-label={showAnswer ? t('Image with the answer revealed') : t('Image with a hidden region to identify')}
    >
      <image href={src} x={0} y={0} width={note.imageWidth} height={note.imageHeight} />
      {note.occluders.map((o) => {
        const isAsked = askedIds.has(o.id)
        const masked = maskDecision(note.mode, isAsked, showAnswer)
        if (!masked) return null
        return <MaskShape key={o.id} shape={o.shape} asked={isAsked && !showAnswer} />
      })}
    </svg>
  )
}

/** Whether a given occluder is masked, by mode, asked-ness, and side. */
function maskDecision(mode: ImageOcclusionNote['mode'], isAsked: boolean, showAnswer: boolean): boolean {
  if (mode === 'hide-one') {
    // Only the asked region is ever hidden, and it is revealed on the back.
    return isAsked && !showAnswer
  }
  // hide-all: everything hidden on the front; on the back the asked one is
  // revealed while the rest stay hidden.
  if (!showAnswer) return true
  return !isAsked
}

function MaskShape({ shape, asked }: { shape: OccluderShape; asked: boolean }) {
  const fill = asked ? 'var(--color-primary)' : 'var(--color-accent)'
  const props = { fill, fillOpacity: 0.92 }
  if (shape.kind === 'rect') return <rect x={shape.x} y={shape.y} width={shape.w} height={shape.h} rx={2} {...props} />
  if (shape.kind === 'ellipse') return <ellipse cx={shape.x + shape.w / 2} cy={shape.y + shape.h / 2} rx={shape.w / 2} ry={shape.h / 2} {...props} />
  return <polygon points={shape.points.map((p) => `${p.x},${p.y}`).join(' ')} {...props} />
}
