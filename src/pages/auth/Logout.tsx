import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, CheckCircle2, LogOut as LogOutIcon } from 'lucide-react'
import { AuthLayout } from './AuthLayout'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { supabase } from '@/lib/supabase'
import { clearOwnerAccessToken } from '@/lib/api'
import { authErrorMessage } from './authMessages'

export function Logout() {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  async function logout() {
    setLoading(true)
    setError('')
    if (supabase) {
      const { error: signOutError } = await supabase.auth.signOut({ scope: 'local' })
      if (signOutError) {
        setError(authErrorMessage(signOutError, 'The account session could not be cleared. Check your connection and try again.'))
        setLoading(false)
        return
      }
    }
    clearOwnerAccessToken()
    setLoading(false)
    setDone(true)
  }
  return <AuthLayout step="protect" showProgress={false} title={done ? 'Signed out safely' : 'Sign out of Synapse'} description={done ? 'The account and temporary owner sessions on this device have been cleared.' : 'Your saved study data remains in MariaDB under your account and will be available when you sign in again.'} compact><div className="mx-auto max-w-md text-center"><span className={done ? 'mx-auto grid size-14 place-items-center rounded-xl bg-success-tint text-success' : 'mx-auto grid size-14 place-items-center rounded-xl bg-accent-tint text-accent-strong'}><Icon icon={done ? CheckCircle2 : LogOutIcon} size={26} /></span>{error && <p role="alert" className="mt-5 flex items-start gap-2 rounded-lg border border-danger/30 bg-danger-tint px-3.5 py-3 text-start text-[12.5px] text-danger"><Icon icon={AlertCircle} size={16} className="mt-0.5 shrink-0" />{error}</p>}{done ? <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center"><Link to="/login" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-5 text-[13px] font-semibold text-on-accent hover:bg-accent-strong">Sign in again</Link><Link to="/app" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-line px-5 text-[13px] font-semibold text-ink-2 hover:bg-inset">Temporary dashboard preview</Link></div> : <><p className="mt-5 text-[13px] leading-relaxed text-ink-2">This clears the authenticated session and any temporary owner key stored in this tab. The Student/Admin preview links remain until you explicitly remove them.</p><div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center"><Button variant="primary" size="lg" iconLeft={LogOutIcon} loading={loading} onClick={() => void logout()}>Sign out</Button><Link to="/app" className="inline-flex min-h-11 items-center justify-center rounded-lg px-5 text-[13px] font-semibold text-ink-2 hover:bg-inset">Cancel</Link></div></>}</div></AuthLayout>
}
