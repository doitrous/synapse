import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Trash2 } from 'lucide-react'
import { Dialog } from '@/components/ui/Dialog'
import { PanelHeader } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { API_MODE, apiDelete } from '@/lib/api'
import { logout } from '@/lib/auth/client'
import { useT } from '@/lib/i18n'

const CONFIRM_WORD = 'DELETE'

/**
 * The one irreversible control on the account page, gated behind typing the
 * word rather than a second click — a click is muscle memory on a page that
 * also asks for confirmation on things that are not this permanent.
 */
export function DeleteAccountDialog({ onClose }: { onClose: () => void }) {
  const t = useT()
  const navigate = useNavigate()
  const [typed, setTyped] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const canDelete = typed.trim() === CONFIRM_WORD

  async function confirmDelete() {
    if (!canDelete) return
    setBusy(true)
    setError('')
    try {
      if (API_MODE) await apiDelete('/account')
      // Best-effort: the account is already gone server-side at this point,
      // so a logout hiccup here should not strand the student on a page
      // that belongs to a deleted account.
      await logout().catch(() => {})
      navigate('/login', { replace: true })
    } catch {
      setError(t('Your account could not be deleted right now. Check your connection and try again, or contact support.'))
      setBusy(false)
    }
  }

  return (
    <Dialog onClose={onClose} label={t('Delete your account')} size="sm">
      <PanelHeader title={t('Delete your account')} icon={AlertTriangle} />
      <div className="space-y-3 p-5">
        <p className="text-[13.5px] leading-relaxed text-ink">
          {t('This permanently deletes your Nishany account — on the website and in the app — and everything attached to it: your notes, whiteboards, bookmarks, plans, progress and subscription.')}
        </p>
        <p className="text-[13.5px] font-semibold text-danger">{t('This cannot be undone.')}</p>
        <Field label={t('Type {word} to confirm').replace('{word}', CONFIRM_WORD)} htmlFor="delete-account-confirm">
          <TextInput
            id="delete-account-confirm"
            value={typed}
            onChange={(event) => setTyped(event.target.value)}
            placeholder={CONFIRM_WORD}
            autoComplete="off"
            autoCapitalize="characters"
          />
        </Field>
        {error && <p role="alert" className="text-[12.5px] text-danger">{error}</p>}
      </div>
      <div className="flex justify-end gap-2 border-t border-line px-5 py-4">
        <Button type="button" variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
        <Button type="button" variant="danger" iconLeft={Trash2} loading={busy} disabled={!canDelete} onClick={() => void confirmDelete()}>
          {t('Delete my account')}
        </Button>
      </div>
    </Dialog>
  )
}
