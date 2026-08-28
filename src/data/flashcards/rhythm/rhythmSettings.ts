/**
 * Study Rhythm settings: the student's per-device preferences for the flashcard
 * activity-and-forecast panel.
 *
 * These are reporting/visual preferences, so they live in device-local storage
 * (the same class as auto-advance and the Pomodoro dial), read through
 * `useLocalJsonPreference` which shallow-merges stored values over these
 * defaults — so a field added in a later build defaults cleanly for an existing
 * student without a hand-written migration. `version` is carried anyway so a
 * *structural* change (a renamed or re-typed field) can be migrated explicitly.
 *
 * Nothing here reads a clock or storage: `validateRhythmSettings` takes the raw
 * parsed value plus the set of decks that currently exist, and returns a fully
 * valid settings object — clamping unknown enums to their default and dropping
 * excluded-deck ids whose deck was deleted, so a stale preference can never put
 * the panel into a state it has no branch for.
 */

export const RHYTHM_SETTINGS_KEY = 'synapse.flashcards.rhythm.v1'
export const RHYTHM_SETTINGS_VERSION = 1

export const RHYTHM_COLOR_SCHEMES = ['crimson', 'blue', 'teal', 'amber', 'violet', 'mono'] as const
export type RhythmColorScheme = (typeof RHYTHM_COLOR_SCHEMES)[number]

export const RHYTHM_CALENDAR_MODES = ['weekly', 'monthly', 'yearly', 'continuous'] as const
export type RhythmCalendarMode = (typeof RHYTHM_CALENDAR_MODES)[number]

/** History window options, longest-eligible-start wins against `ignoreBefore`. */
export const RHYTHM_HISTORY_LIMITS = ['4w', '3m', '6m', '1y', '2y', 'all'] as const
export type RhythmHistoryLimit = (typeof RHYTHM_HISTORY_LIMITS)[number]

/** How many days each history limit spans; `all` = no lower bound (null). */
export const HISTORY_LIMIT_DAYS: Record<RhythmHistoryLimit, number | null> = {
  '4w': 28, '3m': 90, '6m': 182, '1y': 365, '2y': 730, all: null,
}

export const RHYTHM_FORECAST_LIMITS = ['off', '7d', '30d', '90d', '6m', '1y'] as const
export type RhythmForecastLimit = (typeof RHYTHM_FORECAST_LIMITS)[number]

/** How many days each forecast limit spans; `off` = no forecast (0). */
export const FORECAST_LIMIT_DAYS: Record<RhythmForecastLimit, number> = {
  off: 0, '7d': 7, '30d': 30, '90d': 90, '6m': 182, '1y': 365,
}

export interface RhythmSettings {
  version: number
  /** Heatmap/legend/forecast/selected-day colour ramp. Does not recolour the app. */
  colorScheme: RhythmColorScheme
  calendarMode: RhythmCalendarMode
  /** Show the rhythm panel on the main (all-decks) Flashcards screen. */
  showOnMain: boolean
  /** Show the rhythm panel on individual deck screens. Independent of showOnMain. */
  showOnDeck: boolean
  /** Local `YYYY-MM-DD`; events before this day are ignored for reporting. null = none. */
  ignoreBefore: string | null
  historyLimit: RhythmHistoryLimit
  forecastLimit: RhythmForecastLimit
  /** Include actual future review due-dates in the forecast window. */
  showReviewForecast: boolean
  /** Include the estimated new-card introduction in the forecast window. */
  showNewForecast: boolean
  /** Drop review events whose card no longer exists from history + all stats. */
  excludeDeletedCards: boolean
  /** Drop non-grade events (reset, set-due, reposition…) from study activity. */
  excludeManualReschedules: boolean
  /** Deck ids excluded from the MAIN rhythm only (persist ids, never names). */
  excludedDeckIds: string[]
}

export const DEFAULT_RHYTHM_SETTINGS: RhythmSettings = {
  version: RHYTHM_SETTINGS_VERSION,
  colorScheme: 'crimson',
  calendarMode: 'continuous',
  showOnMain: true,
  showOnDeck: true,
  ignoreBefore: null,
  historyLimit: '3m',
  forecastLimit: '30d',
  showReviewForecast: true,
  showNewForecast: true,
  excludeDeletedCards: true,
  excludeManualReschedules: true,
  excludedDeckIds: [],
}

const DAY_RE = /^\d{4}-\d{2}-\d{2}$/

function choice<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === 'string' && (allowed as readonly string[]).includes(value) ? (value as T) : fallback
}

function bool(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback
}

/**
 * Coerce a raw parsed value into a fully valid `RhythmSettings`.
 *
 * `liveDeckIds` is the set of decks that currently exist; excluded ids whose
 * deck was deleted are dropped so the selector never shows a broken entry and a
 * deleted deck cannot silently keep filtering the rhythm. Pass an empty set to
 * skip that pruning (e.g. before decks are known).
 */
export function validateRhythmSettings(raw: unknown, liveDeckIds: ReadonlySet<string> = new Set()): RhythmSettings {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Partial<RhythmSettings>
  const d = DEFAULT_RHYTHM_SETTINGS

  let ignoreBefore: string | null = d.ignoreBefore
  if (typeof r.ignoreBefore === 'string' && DAY_RE.test(r.ignoreBefore)) ignoreBefore = r.ignoreBefore
  else if (r.ignoreBefore === null) ignoreBefore = null

  const excludedRaw = Array.isArray(r.excludedDeckIds) ? r.excludedDeckIds.filter((x): x is string => typeof x === 'string') : []
  const excludedDeckIds = liveDeckIds.size === 0 ? excludedRaw : excludedRaw.filter((id) => liveDeckIds.has(id))

  return {
    version: RHYTHM_SETTINGS_VERSION,
    colorScheme: choice(r.colorScheme, RHYTHM_COLOR_SCHEMES, d.colorScheme),
    calendarMode: choice(r.calendarMode, RHYTHM_CALENDAR_MODES, d.calendarMode),
    showOnMain: bool(r.showOnMain, d.showOnMain),
    showOnDeck: bool(r.showOnDeck, d.showOnDeck),
    ignoreBefore,
    historyLimit: choice(r.historyLimit, RHYTHM_HISTORY_LIMITS, d.historyLimit),
    forecastLimit: choice(r.forecastLimit, RHYTHM_FORECAST_LIMITS, d.forecastLimit),
    showReviewForecast: bool(r.showReviewForecast, d.showReviewForecast),
    showNewForecast: bool(r.showNewForecast, d.showNewForecast),
    excludeDeletedCards: bool(r.excludeDeletedCards, d.excludeDeletedCards),
    excludeManualReschedules: bool(r.excludeManualReschedules, d.excludeManualReschedules),
    excludedDeckIds: [...new Set(excludedDeckIds)],
  }
}
