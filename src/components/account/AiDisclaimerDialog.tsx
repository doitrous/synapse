import { useState } from 'react'
import { Bot } from 'lucide-react'
import { Dialog } from '@/components/ui/Dialog'
import { PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { API_MODE, apiPost } from '@/lib/api'
import { useIdentity } from '@/lib/useIdentity'
import { useT } from '@/lib/i18n'

/**
 * What Nishany tells a student about its AI-assisted features, once, before
 * they rely on any of them.
 *
 * One component serves two callers. `AiConsentGate` mounts it as a first-run
 * gate — shown once `aiConsentAt` is null and closed only by acknowledging.
 * The Help panel on Account opens the same dialog to let a student read it
 * again at any time; posting consent a second time is a no-op on the server
 * (`recordAiConsent` keeps the first timestamp), so both callers can share
 * the one "Understood" action without a separate read-only mode to maintain.
 */
export function AiDisclaimerDialog({ onClose }: { onClose: () => void }) {
  const t = useT()
  const identity = useIdentity()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function acknowledge() {
    setBusy(true)
    setError('')
    try {
      if (API_MODE) await apiPost('/me/consent/ai')
      identity.reload()
      onClose()
    } catch {
      setError(t('That could not be saved. Check your connection and try again.'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <Dialog onClose={onClose} label={t('About AI in Nishany')} size="sm">
      <PanelHeader title={t('About AI in Nishany')} icon={Bot} />
      <div className="space-y-3 p-5 text-[13.5px] leading-relaxed text-ink-2">
        <p>{t('Some features in Nishany — explanations, study suggestions, and grading assistance — are generated or assisted by AI.')}</p>
        <p>{t('AI output can be wrong. It does not replace your course, your textbooks or your supervisors, and it must never be used to make a decision about a real patient.')}</p>
        <p>{t('You can keep using Nishany either way — this is a disclosure, not a feature you opt into.')}</p>
      </div>
      {error && <p role="alert" className="px-5 pb-2 text-[12.5px] text-danger">{error}</p>}
      <div className="flex justify-end gap-2 border-t border-line px-5 py-4">
        <Button type="button" variant="primary" loading={busy} onClick={() => void acknowledge()}>
          {t('Understood')}
        </Button>
      </div>
    </Dialog>
  )
}
