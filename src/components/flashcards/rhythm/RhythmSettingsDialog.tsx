import { useMemo, useState } from 'react'
import { RotateCcw, Settings2, X } from 'lucide-react'
import { PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Dialog } from '@/components/ui/Dialog'
import { Field, TextInput, Select, SearchInput } from '@/components/ui/Field'
import { Toggle } from '@/components/ui/Toggle'
import { Checkbox } from '@/components/ui/Checkbox'
import { Segmented } from '@/components/ui/Tabs'
import { useT } from '@/lib/i18n'
import { useScope } from '@/lib/shortcuts/useShortcuts'
import { cn } from '@/lib/cn'
import { localDay } from '@/data/flashcards/time'
import {
  RHYTHM_CALENDAR_MODES,
  RHYTHM_HISTORY_LIMITS,
  RHYTHM_FORECAST_LIMITS,
  type RhythmSettings,
  type RhythmCalendarMode,
  type RhythmHistoryLimit,
  type RhythmForecastLimit,
} from '@/data/flashcards/rhythm/rhythmSettings'
import { RHYTHM_SCHEMES, rhythmRampVars } from '@/data/flashcards/rhythm/schemes'

export interface RhythmDeckOption {
  id: string
  name: string
  path?: string
  cardCount: number
}

/**
 * All Study Rhythm preferences, with a live colour-scheme preview.
 *
 * Edits apply immediately: every control calls `onChange` with the full next
 * settings object so the panel behind this dialog updates as you go, rather
 * than waiting on a Save button. "Restore default settings" (footer) resets
 * these preferences only — the separate ignore-before reporting baseline is
 * a controller-owned action that lives in the panel header, not here.
 */
export function RhythmSettingsDialog({
  settings,
  decks,
  onChange,
  onRestoreDefaults,
  onClose,
}: {
  settings: RhythmSettings
  decks: RhythmDeckOption[]
  onChange: (next: RhythmSettings) => void
  onRestoreDefaults: () => void
  onClose: () => void
}) {
  const t = useT()
  useScope('dialog', { exclusive: true })
  const today = useMemo(() => localDay(new Date()), [])
  const [deckQuery, setDeckQuery] = useState('')
  const [confirmingRestore, setConfirmingRestore] = useState(false)

  const patch = (partial: Partial<RhythmSettings>) => onChange({ ...settings, ...partial })

  const excludedSet = useMemo(() => new Set(settings.excludedDeckIds), [settings.excludedDeckIds])
  const toggleDeckExcluded = (id: string) => {
    const next = new Set(settings.excludedDeckIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    patch({ excludedDeckIds: [...next] })
  }

  const filteredDecks = useMemo(() => {
    const q = deckQuery.trim().toLowerCase()
    if (!q) return decks
    return decks.filter((d) => d.name.toLowerCase().includes(q) || (d.path ?? '').toLowerCase().includes(q))
  }, [decks, deckQuery])

  const calendarModeLabels: Record<RhythmCalendarMode, string> = {
    weekly: t('Weekly'),
    monthly: t('Monthly'),
    yearly: t('Yearly'),
    continuous: t('Continuous'),
  }

  const historyLimitLabels: Record<RhythmHistoryLimit, string> = {
    '4w': t('4 weeks'),
    '3m': t('3 months'),
    '6m': t('6 months'),
    '1y': t('1 year'),
    '2y': t('2 years'),
    all: t('All time'),
  }

  const forecastLimitLabels: Record<RhythmForecastLimit, string> = {
    off: t('Off'),
    '7d': t('7 days'),
    '30d': t('30 days'),
    '90d': t('90 days'),
    '6m': t('6 months'),
    '1y': t('1 year'),
  }

  const forecastOff = settings.forecastLimit === 'off'

  return (
    <Dialog onClose={onClose} label={t('Study Rhythm settings')} size="lg">
      <PanelHeader
        title={t('Study Rhythm settings')}
        icon={Settings2}
        action={<IconButton icon={X} label={t('Close')} size="sm" onClick={onClose} />}
      />

      <div className="space-y-6 p-5">
        {/* 1. Colour scheme */}
        <Field
          label={t('Colour scheme')}
          hint={t('Recolours the rhythm heatmap, legend and forecast only — it does not change the rest of the app.')}
        >
          <div className="flex flex-wrap gap-2">
            {RHYTHM_SCHEMES.map((scheme) => {
              const active = settings.colorScheme === scheme.id
              return (
                <button
                  key={scheme.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => patch({ colorScheme: scheme.id })}
                  className={cn(
                    'flex min-h-11 items-center gap-2 rounded-lg border px-2.5 transition-colors sm:min-h-9',
                    active ? 'border-primary-hover bg-primary-tint' : 'border-line-2 bg-surface hover:border-ink-3/45',
                  )}
                >
                  <span className="flex overflow-hidden rounded-[3px]" aria-hidden="true">
                    {rhythmRampVars(scheme.id).map((color, level) => (
                      <span key={level} className="size-3" style={{ backgroundColor: color }} />
                    ))}
                  </span>
                  <span className={cn('text-[12.5px] font-medium', active ? 'text-primary-strong' : 'text-ink-2')}>
                    {scheme.label}
                  </span>
                </button>
              )
            })}
          </div>
        </Field>

        {/* 2. Calendar mode */}
        <Field label={t('Calendar view')}>
          <Segmented
            items={RHYTHM_CALENDAR_MODES.map((mode) => ({ value: mode, label: calendarModeLabels[mode] }))}
            value={settings.calendarMode}
            onChange={(value) => patch({ calendarMode: value as RhythmCalendarMode })}
          />
        </Field>

        {/* 3. Visibility */}
        <Field label={t('Visibility')} hint={t('These are independent — show the panel in one place and hide it in the other if you like.')}>
          <div className="space-y-2">
            <CheckboxRow
              label={t('Show on the main Flashcards screen')}
              checked={settings.showOnMain}
              onChange={(v) => patch({ showOnMain: v })}
            />
            <CheckboxRow
              label={t('Show on individual deck screens')}
              checked={settings.showOnDeck}
              onChange={(v) => patch({ showOnDeck: v })}
            />
          </div>
        </Field>

        {/* 4. Ignore data before */}
        <Field
          label={t('Ignore data before')}
          htmlFor="rhythm-ignore-before"
          hint={t('Reporting only — your review history is not deleted.')}
        >
          <div className="flex items-center gap-2">
            <TextInput
              id="rhythm-ignore-before"
              type="date"
              value={settings.ignoreBefore ?? ''}
              max={today}
              onChange={(e) => patch({ ignoreBefore: e.target.value || null })}
              className="max-w-[12rem]"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => patch({ ignoreBefore: null })}
              disabled={!settings.ignoreBefore}
            >
              {t('Clear')}
            </Button>
          </div>
        </Field>

        {/* 5. History limit */}
        <Field
          label={t('History limit')}
          htmlFor="rhythm-history-limit"
          hint={t('Display only. When this and “Ignore data before” are both set, whichever start date is later wins.')}
        >
          <Select
            id="rhythm-history-limit"
            value={settings.historyLimit}
            onChange={(e) => patch({ historyLimit: e.target.value as RhythmHistoryLimit })}
          >
            {RHYTHM_HISTORY_LIMITS.map((limit) => (
              <option key={limit} value={limit}>{historyLimitLabels[limit]}</option>
            ))}
          </Select>
        </Field>

        {/* 6. Forecast */}
        <Field
          label={t('Forecast window')}
          htmlFor="rhythm-forecast-limit"
          hint={t('How far ahead the forecast looks. Set to Off to hide it.')}
        >
          <Select
            id="rhythm-forecast-limit"
            value={settings.forecastLimit}
            onChange={(e) => patch({ forecastLimit: e.target.value as RhythmForecastLimit })}
          >
            {RHYTHM_FORECAST_LIMITS.map((limit) => (
              <option key={limit} value={limit}>{forecastLimitLabels[limit]}</option>
            ))}
          </Select>
          <div className="mt-2.5 space-y-2">
            <ToggleRow
              label={t('Future review cards')}
              checked={settings.showReviewForecast}
              disabled={forecastOff}
              onChange={(v) => patch({ showReviewForecast: v })}
            />
            <ToggleRow
              label={t('Projected new cards (estimate)')}
              checked={settings.showNewForecast}
              disabled={forecastOff}
              onChange={(v) => patch({ showNewForecast: v })}
            />
          </div>
        </Field>

        {/* 7. History exclusions */}
        <Field
          label={t('History exclusions')}
          hint={t('Reporting only — these never delete events. Regular Again / Hard / Good / Easy answers always count.')}
        >
          <div className="space-y-2">
            <CheckboxRow
              label={t('Exclude deleted cards')}
              checked={settings.excludeDeletedCards}
              onChange={(v) => patch({ excludeDeletedCards: v })}
            />
            <CheckboxRow
              label={t('Exclude manual reschedules')}
              checked={settings.excludeManualReschedules}
              onChange={(v) => patch({ excludeManualReschedules: v })}
            />
          </div>
        </Field>

        {/* 8. Excluded decks */}
        <Field
          label={t('Excluded decks')}
          hint={t('Hides selected decks from the main heatmap only. It does not delete a deck and does not hide that deck’s own dashboard rhythm.')}
        >
          {decks.length === 0 ? (
            <p className="rounded-lg border border-line-2 bg-surface-2 px-3 py-4 text-center text-[12.5px] text-ink-3">
              {t('No decks yet.')}
            </p>
          ) : (
            <>
              <SearchInput
                value={deckQuery}
                onChange={(e) => setDeckQuery(e.target.value)}
                placeholder={t('Search decks…')}
                aria-label={t('Search decks')}
                className="mb-2"
              />
              <div className="max-h-56 overflow-y-auto rounded-lg border border-line-2">
                {filteredDecks.length === 0 ? (
                  <p className="px-3 py-6 text-center text-[12.5px] text-ink-3">{t('No decks match your search.')}</p>
                ) : (
                  <ul className="divide-y divide-line">
                    {filteredDecks.map((deck) => {
                      const excluded = excludedSet.has(deck.id)
                      return (
                        <li key={deck.id} className="flex items-center gap-2.5 px-2.5">
                          <Checkbox
                            label={`${t('Exclude')} ${deck.name}`}
                            checked={excluded}
                            onChange={() => toggleDeckExcluded(deck.id)}
                          />
                          <button
                            type="button"
                            onClick={() => toggleDeckExcluded(deck.id)}
                            className="flex min-h-11 min-w-0 flex-1 items-center gap-2 py-1.5 text-start sm:min-h-9"
                          >
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[13px] text-ink">{deck.name}</span>
                              {deck.path && <span className="block truncate text-[11.5px] text-ink-3">{deck.path}</span>}
                            </span>
                            <span className="tnum shrink-0 text-[12px] text-ink-3">{deck.cardCount}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            </>
          )}
        </Field>

        {/* 9. Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          {!confirmingRestore ? (
            <Button type="button" variant="ghost" size="sm" iconLeft={RotateCcw} onClick={() => setConfirmingRestore(true)}>
              {t('Restore default settings')}
            </Button>
          ) : (
            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-line-2 bg-inset px-3 py-2">
              <span className="text-[12.5px] text-ink-2">
                {t('Reset colour, calendar mode and other preferences? Your “Ignore data before” baseline is kept.')}
              </span>
              <span className="flex gap-1.5">
                <Button type="button" variant="ghost" size="sm" onClick={() => setConfirmingRestore(false)}>
                  {t('Keep')}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    onRestoreDefaults()
                    setConfirmingRestore(false)
                  }}
                >
                  {t('Restore')}
                </Button>
              </span>
            </div>
          )}
          <Button type="button" variant="primary" onClick={onClose}>{t('Done')}</Button>
        </div>
      </div>
    </Dialog>
  )
}

/** A checkbox paired with a clickable label, both toggling the same value. */
function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (next: boolean) => void
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Checkbox label={label} checked={checked} onChange={onChange} />
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className="min-h-11 flex-1 py-1.5 text-start text-[13px] font-medium text-ink sm:min-h-9"
      >
        {label}
      </button>
    </div>
  )
}

/** A labeled row wrapping `Toggle`, greyed out and inert while `disabled`. */
function ToggleRow({
  label,
  checked,
  disabled,
  onChange,
}: {
  label: string
  checked: boolean
  disabled?: boolean
  onChange: (next: boolean) => void
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 rounded-lg border border-line-2 bg-surface px-3 py-2.5 transition-opacity',
        disabled && 'opacity-55',
      )}
      aria-disabled={disabled || undefined}
    >
      <span className="text-[13px] font-medium text-ink">{label}</span>
      <span className={disabled ? 'pointer-events-none' : undefined}>
        <Toggle checked={checked} onChange={disabled ? () => {} : onChange} label={label} />
      </span>
    </div>
  )
}
