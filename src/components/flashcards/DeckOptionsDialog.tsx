import { useState } from 'react'
import { Settings2, X } from 'lucide-react'
import { PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Dialog } from '@/components/ui/Dialog'
import { Field, TextInput, Select } from '@/components/ui/Field'
import { useT } from '@/lib/i18n'
import { useScope } from '@/lib/shortcuts/useShortcuts'
import type { DeckView, FlashcardsApi } from '@/lib/useFlashcards'
import { DEFAULT_DECK_CONFIG } from '@/lib/useFlashcards'

/** Per-deck limits and scheduler. Shared by the dashboard and the study screen (O). */
export function DeckOptionsDialog({ api, deck, onClose }: { api: FlashcardsApi; deck: DeckView; onClose: () => void }) {
  const t = useT()
  useScope('dialog', { exclusive: true })
  const cfg = deck.config ?? DEFAULT_DECK_CONFIG
  const [newPerDay, setNewPerDay] = useState(String(cfg.newPerDay))
  const [maxReviews, setMaxReviews] = useState(String(cfg.maxReviewsPerDay))

  function save() {
    api.setDeckConfig(deck.id, {
      newPerDay: Math.max(0, Number(newPerDay) || 0),
      maxReviewsPerDay: Math.max(0, Number(maxReviews) || 0),
    })
    onClose()
  }

  return (
    <Dialog onClose={onClose} label={t('Deck options')} size="sm">
      <PanelHeader title={t('Deck options')} icon={Settings2} action={<IconButton icon={X} label={t('Close')} size="sm" onClick={onClose} />} />
      <div className="space-y-4 p-5">
        <Field label={t('New cards per day')} htmlFor="opt-new"><TextInput id="opt-new" type="number" min={0} value={newPerDay} onChange={(e) => setNewPerDay(e.target.value)} /></Field>
        <Field label={t('Maximum reviews per day')} htmlFor="opt-max"><TextInput id="opt-max" type="number" min={0} value={maxReviews} onChange={(e) => setMaxReviews(e.target.value)} /></Field>
        <Field label={t('Scheduler')} htmlFor="opt-sched" hint={t('FSRS is not yet available; decks use the SM-2 scheduler.')}>
          <Select id="opt-sched" value={cfg.scheduler} disabled>
            <option value="sm2">{t('SM-2 (default)')}</option>
          </Select>
        </Field>
        <div className="flex justify-end gap-2 border-t border-line pt-4">
          <Button variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
          <Button variant="primary" onClick={save}>{t('Save')}</Button>
        </div>
      </div>
    </Dialog>
  )
}
