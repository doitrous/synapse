import { StudyHeatmap } from './StudyHeatmap'
import { QotdCompact } from './QotdCompact'

/**
 * Daily study activity, with the daily question as its own tile in the panel's
 * far-right column — the heatmap is the record of the habit, the QotD is the
 * smallest way to keep it going today.
 */
export function StudyRhythmSection() {
  return <StudyHeatmap aside={<QotdCompact className="h-full" />} />
}
