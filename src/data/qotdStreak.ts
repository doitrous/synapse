// src/data/qotdStreak.ts
import { dayNumber } from './qotdCohort.ts'

/**
 * Streak stats from a set of answered dates.
 *
 * `current` is anchored to today OR yesterday: a student who has not yet done
 * today's question keeps yesterday-anchored momentum until the day actually
 * ends, so a live streak is never zeroed mid-day.
 */
export function computeStreak(
  answeredDates: string[],
  todayIso: string,
): { current: number; longest: number } {
  const days = [...new Set(answeredDates.map(dayNumber))].sort((a, b) => a - b)
  if (days.length === 0) return { current: 0, longest: 0 }

  let longest = 1
  let run = 1
  for (let i = 1; i < days.length; i++) {
    run = days[i] === days[i - 1] + 1 ? run + 1 : 1
    if (run > longest) longest = run
  }

  const today = dayNumber(todayIso)
  const daySet = new Set(days)
  // Anchor at today if answered, else yesterday, else the streak is broken.
  let anchor = daySet.has(today) ? today : daySet.has(today - 1) ? today - 1 : null
  let current = 0
  while (anchor !== null && daySet.has(anchor)) {
    current++
    anchor--
  }
  return { current, longest }
}
