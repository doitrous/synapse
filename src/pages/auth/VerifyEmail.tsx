import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, MailCheck, RotateCw } from 'lucide-react'
import { AuthLayout } from './AuthLayout'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { supabase } from '@/lib/supabase'
import { authErrorMessage } from './authMessages'

export function VerifyEmail() {
  const [params] = useSearchParams()
  const email = params.get('email') || ''
  const [verified, setVerified] = useState(false)
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!supabase) return
    void supabase.auth.getUser().then(({ data }) => setVerified(Boolean(data.user?.email_confirmed_at)))
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setVerified(Boolean(session?.user.email_confirmed_at)))
    return () => data.subscription.unsubscribe()
  }, [])

  async function resend() {
    if (!supabase || !email) return setMessage('Return to signup and enter the email address again.')
    setSending(true)
    const { error } = await supabase.auth.resend({ type: 'signup', email, options: { emailRedirectTo: `${window.location.origin}/auth/verify-email` } })
    setSending(false)
    setMessage(error ? authErrorMessage(error, 'A fresh verification message could not be sent. Wait a moment and try again.') : 'A fresh verification email has been sent.')
  }

  return (
    <AuthLayout step="verify" title={verified ? 'Email verified' : 'Check your email'} description={verified ? 'Your address is confirmed. Add an authenticator to protect the account before normal access begins.' : 'Open the verification message from Synapse, then return here. The link proves that the address belongs to you.'} compact>
      <div className="mx-auto max-w-lg text-center">
        <span className={verified ? 'mx-auto grid size-14 place-items-center rounded-xl bg-success-tint text-success' : 'mx-auto grid size-14 place-items-center rounded-xl bg-accent-tint text-accent-strong'}><Icon icon={verified ? CheckCircle2 : MailCheck} size={26} /></span>
        <h2 className="mt-5 text-[25px]">{verified ? 'Verification complete' : `Verification sent${email ? ` to ${email}` : ''}`}</h2>
        <p className="mx-auto mt-2 max-w-[52ch] text-[13px] leading-relaxed text-ink-2">{verified ? 'Continue to the free authenticator-app MFA setup. Administrators must reach assurance level 2 before protected API actions are allowed.' : 'Delivery uses the configured Supabase email template and Resend SMTP. The link expires and cannot be reused after confirmation.'}</p>
        {message && <p role="status" className="mt-4 rounded-lg border border-line bg-surface-2 px-3 py-2.5 text-[12.5px] text-ink-2">{message}</p>}
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          {verified ? <Link to="/auth/mfa" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-5 text-[13.5px] font-semibold text-on-accent hover:bg-accent-strong">Protect account</Link> : <Button onClick={() => void resend()} loading={sending} iconLeft={RotateCw}>Resend verification</Button>}
          <Link to="/login" className="inline-flex min-h-11 items-center justify-center rounded-lg px-4 text-[13px] font-semibold text-ink-2 hover:bg-inset hover:text-ink">Back to sign in</Link>
        </div>
      </div>
    </AuthLayout>
  )
}
