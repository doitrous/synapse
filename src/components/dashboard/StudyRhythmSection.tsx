import { StudyHeatmap } from './StudyHeatmap'
import { QotdCompact } from './QotdCompact'

/**
 * The dashboard's study-rhythm band: one panel, with the daily question inside
 * it.
 *
 * The heatmap and the Question of the Day used to be separate full-width
 * slots, which read as two unrelated announcements and pushed everything below
 * them a card further down. They are one thought — the heatmap is the record
 * of the habit and the daily question is the smallest way to keep it going
 * today — so the question is a tile in the panel's end column rather than a
 * panel of its own. Below `lg` the column collapses and the tile stacks
 * full-width under the squares, which is the same reading order.
 */
export function StudyRhythmSection() {
  return <StudyHeatmap aside={<QotdCompact />} />
}
