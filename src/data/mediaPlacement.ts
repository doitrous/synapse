import type { MediaPlacement, MediaSlot } from './mediaLibrary.ts'

/**
 * The media belonging to one slot of one item.
 *
 * An answer or answer-explanation placement must name its letter to belong anywhere: without this a
 * half-written placement would render under every option at once, which is
 * worse than rendering nowhere.
 */
export function placementsFor(
  media: MediaPlacement[] | undefined,
  slot: MediaSlot,
  answerLabel?: string,
): MediaPlacement[] {
  if (!media?.length) return []
  return media.filter((placement) => {
    if (placement.slot !== slot) return false
    if (slot === 'stem') return true
    if (slot === 'explanation' && answerLabel === undefined) return placement.answerLabel === undefined
    return Boolean(placement.answerLabel) && placement.answerLabel === answerLabel
  })
}
