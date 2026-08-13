import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AlertCircle, CheckCircle2, MailCheck, MailWarning, RotateCw } from 'lucide-react'
import { AuthLayout } from './AuthLayout'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { authLandingHash, authLandingSearch, supabase } from '@/lib/supabase'
import { authErrorMessage, verificationLinkError } from './authMessages'
import { forgetPendingEmail, readPendingEmail, rememberPendingEmail } from './pendingEmail'

export function VerifyEmail() {
  const [params] = useSearchParams()
  // Resolved once: whether the address is known decides whether the page has to
  // ask for it, and that must not change under the student as they type.
  const [knownEmail] = useState(() => params.get('email') || readPendingEmail())
  const [email, setEmail] = useState(knownEmail)
  const [verified, setVerified] = useState(false)
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState('')
  const [linkFailure, setLinkFailure] = useState(() => verificationLinkError(authLandingSearch, authLandingHash))

  useEffect(() => {
    if (!supabase) return
    let live = true
    /**
     * Confirmation only ever moves one way, so this flag does too.
     *
     * Two sources answer the same question here — a network round-trip, and
     * the session the link's own tokens produce — and they finish in whichever
     * order the network decides. Writing both answers meant the slower one won:
     * a `getUser()` that resolved after the sign-in event reported "no user"
     * and put a student who had just verified back on "check your email", with
     * a link that would never work again. Only confirmation is recorded; the
     * absence of it is left to the state the page already holds.
     */
    const confirm = (confirmedAt: string | null | undefined) => { if (live && confirmedAt) setVerified(true) }
    void supabase.auth.getUser().then(({ data }) => confirm(data.user?.email_confirmed_at))
    const { data } = supabase.auth.onAuthStateChange((_event, session) => confirm(session?.user.email_confirmed_at))
    return () => { live = false; data.subscription.unsubscribe() }
  }, [])

  useEffect(() => { if (verified) forgetPendingEmail() }, [verified])

  async function resend(event: React.FormEvent) {
    event.preventDefault()
    const address = email.trim().toLowerCase()
    if (!supabase) return setMessage('Account creation is prepared but Supabase is not connected yet.')
    if (!address) return setMessage('Enter the email address you signed up with.')
    setSending(true)
    setMessage('')
    const { error } = await supabase.auth.resend({ type: 'signup', email: address, options: { emailRedirectTo: `${window.location.origin}/auth/verify-email` } })
    setSending(false)
    if (error) return setMessage(authErrorMessage(error, 'A fresh verification message could not be sent. Wait a moment and try again.'))
    rememberPendingEmail(address)
    // The dead link has been replaced; leaving its warning up would send the
    // student back to the email that no longer works.
    setLinkFailure(null)
    setMessage(`A fresh verification email has been sent to ${address}.`)
  }

  // A link that came back broken is not a page that should keep announcing a
  // delivery: the student already opened the email, and what they need next is
  // the reason and a replacement.
  const state = verified ? 'verified' : linkFailure ? 'failed' : 'waiting'

  return (
    <AuthLayout step="verify" title={verified ? 'Email verified' : 'Check your email'} description={verified ? 'Your address is confirmed. Add an authenticator to protect the account before normal access begins.' : 'Open the verification message from Synapse, then return here. The link proves that the address belongs to you.'} compact>
      <div className="mx-auto max-w-lg text-center">
        <span className={state === 'verified' ? 'mx-auto grid size-14 place-items-center rounded-xl bg-success-tint text-success' : state === 'failed' ? 'mx-auto grid size-14 place-items-center rounded-xl bg-danger-tint text-danger' : 'mx-auto grid size-14 place-items-center rounded-xl bg-accent-tint text-accent-strong'}><Icon icon={state === 'verified' ? CheckCircle2 : state === 'failed' ? MailWarning : MailCheck} size={26} /></span>
        <h2 className="mt-5 text-[25px]">{state === 'verified' ? 'Verification complete' : state === 'failed' ? 'Verification did not complete' : `Verification sent${knownEmail ? ` to ${knownEmail}` : ''}`}</h2>
        <p className="mx-auto mt-2 max-w-[52ch] text-[13px] leading-relaxed text-ink-2">{state === 'verified' ? 'Continue to the free authenticator-app MFA setup. Administrators must reach assurance level 2 before protected API actions are allowed.' : state === 'failed' ? 'The address is still unconfirmed, and the account cannot be used until it is. Each link works once, and only until it expires.' : 'Delivery uses the configured Supabase email template and Resend SMTP. The link expires and cannot be reused after confirmation.'}</p>
        {linkFailure && <p role="alert" className="mx-auto mt-4 flex max-w-[52ch] gap-2 rounded-lg border border-danger/30 bg-danger-tint px-3.5 py-3 text-start text-[12.5px] leading-relaxed text-danger"><Icon icon={AlertCircle} size={16} className="mt-0.5 shrink-0" />{linkFailure}</p>}
        {message && <p role="status" className="mt-4 rounded-lg border border-line bg-surface-2 px-3 py-2.5 text-[12.5px] text-ink-2">{message}</p>}
        {verified ? (
          <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
            <Link to="/auth/mfa" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-5 text-[13.5px] font-semibold text-on-accent hover:bg-accent-strong">Protect account</Link>
            <Link to="/login" className="inline-flex min-h-11 items-center justify-center rounded-lg px-4 text-[13px] font-semibold text-ink-2 hover:bg-inset hover:text-ink">Back to sign in</Link>
          </div>
        ) : (
          <form className="mt-6" onSubmit={(event) => void resend(event)}>
            {!knownEmail && <Field label="Email address" htmlFor="verify-email" className="mx-auto mb-3 max-w-sm text-start"><TextInput id="verify-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@university.edu" /></Field>}
            <div className="flex flex-col justify-center gap-2 sm:flex-row">
              <Button type="submit" loading={sending} iconLeft={RotateCw}>Resend verification</Button>
              <Link to="/login" className="inline-flex min-h-11 items-center justify-center rounded-lg px-4 text-[13px] font-semibold text-ink-2 hover:bg-inset hover:text-ink">Back to sign in</Link>
            </div>
          </form>
        )}
      </div>
    </AuthLayout>
  )
}
