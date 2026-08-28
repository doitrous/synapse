/**
 * The shared contract between the Study Rhythm data layer and its UI.
 *
 * `buildRhythmDataset` (in `rhythmData.ts`) is the ONE place the settings are
 * interpreted: it applies the scope (all decks vs one deck), the exclusions
 * (deleted cards, manual reschedules, excluded decks), the effective history
 * start and the forecast window, then returns a single dataset that the heatmap
 * cells AND the statistics beneath them both render. No component re-derives the
 * filtered data, so a boundary change updates the calendar and its stats
 * together by construction.
 *
 * Everything is pure: `now`, the events and the cards are passed in, days are
 * local `YYYY-MM-DD` strings, and the 0..5 intensity `level` is computed here so
 * the UI only maps a level to a colour token.
 */

import type { CardMeta, ReviewEvent } from '../model.ts'
import type { RhythmSettings } from './rhythmSettings.ts'

/** A card projected to just what the rhythm needs (unscoped; builder filters). */
export interface RhythmCard {
  cardId: string
  deckId: string
  meta: CardMeta
}

export type RhythmScope = { kind: 'all' } | { kind: 'deck'; deckId: string }

export interface RhythmDataInput {
  /** ALL review events, unscoped. The builder applies scope + exclusions. */
  events: ReviewEvent[]
  /** ALL live cards, unscoped. Used for the deleted-card filter and forecasts. */
  cards: RhythmCard[]
  /** Per-deck new-cards-per-day cap, for the projected-new forecast. */
  deckNewPerDay: Record<string, number>
  settings: RhythmSettings
  now: Date
  scope: RhythmScope
}

export type RhythmCellKind = 'history' | 'today' | 'forecast'

export interface RhythmDayCell {
  /** Local `YYYY-MM-DD`. */
  day: string
  /** Completed reviews (study activity) on this local day. History/today only. */
  reviews: number
  /** Milliseconds studied on this day, when review duration was recorded. */
  timeMs: number
  /** Forecast only: actual review cards due on this day (from real due dates). */
  dueReviews: number
  /** Forecast only: ESTIMATED new-card introductions on this day. */
  projectedNew: number
  kind: RhythmCellKind
  /** 0..5 display intensity (reviews for history; due+projectedNew for forecast). */
  level: number
}

export interface RhythmStats {
  currentStreak: number
  longestStreak: number
  activeDays: number
  totalReviews: number
  /** Reviews per active day (0 when no active days). */
  dailyAverage: number
  /** Sum of real review cards due across the forecast window. */
  dueInForecast: number
  /** Sum of estimated new cards across the forecast window. */
  projectedNewInForecast: number
  reviewTimeMs: number
  /** True when at least one counted event recorded a duration. */
  hasReviewTime: boolean
}

export interface RhythmDataset {
  /** Effective reporting start: the later of ignore-before and the history limit. */
  effectiveStart: string
  /** Last history day = today (local). */
  rangeEnd: string
  /** Last forecast day, or null when forecasting is off. */
  forecastEnd: string | null
  todayDay: string
  /** Contiguous history→today→forecast cells, sorted ascending. */
  days: RhythmDayCell[]
  historyDays: RhythmDayCell[]
  forecastDays: RhythmDayCell[]
  stats: RhythmStats
  /** Any counted study activity in range. */
  hasHistory: boolean
  /** No history AND no forecast to show. */
  isEmpty: boolean
}
