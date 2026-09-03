import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AlertCircle, CheckCircle2, Inbox, MailCheck, MailWarning, RotateCw, ShieldCheck } from 'lucide-react'
import { AuthLayout } from './AuthLayout'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { API_MODE, apiGet } from '@/lib/api'
import { authMessage, resend as resendVerification } from '@/lib/auth/client'
import { useIdentity } from '@/lib/useIdentity'
import { verificationLinkError } from './authMessages'
import { forgetPendingEmail, readPendingEmail, rememberPendingEmail } from './pendingEmail'

/**
 * The step between creating an account and using it.
 *
 * Three different things can be true when somebody lands here, and the page
 * used to blur two of them into one screen that said "check your email"
 * regardless:
 *
 *  - the project requires confirmation and a message is on its way (`waiting`),
 *  - the project does not require it and the account is already usable
 *    (`sent=0` on the URL, resolved to `verified` as soon as Supabase agrees),
 *  - a confirmation link came back broken or expired (`failed`).
 *
 * The second is why a student reported no cue to check their inbox: there was
 * no email, and the page said there was.
 */
export function VerifyEmail() {
  const [params] = useSearchParams()
  const { reload } = useIdentity()
  // Resolved once: whether the address is known decides whether the page has to
  // ask for it, and that must not change under the student as they type.
  const [knownEmail] = useState(() => params.get('email') || readPendingEmail())
  // Sign-up says so when Supabase handed back a session, which only happens
  // when the project does not require a confirmed address.
  const [noEmailNeeded] = useState(() => params.get('sent') === '0')
  const [email, setEmail] = useState(knownEmail)
  const [verified, setVerified] = useState(false)
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState('')
  // Nothing rewrites the entry URL any more — the Supabase client that used to
  // wipe it during start-up is gone — so a failed link's reason is read from
  // the address bar directly.
  const [linkFailure, setLinkFailure] = useState(() => (typeof window === 'undefined' ? null : verificationLinkError(window.location.search, window.location.hash)))

  /**
   * The one page that asks Supabase for a current answer.
   *
   * Everywhere else `/api/me` reports the confirmation flag it already has;
   * here the whole point is that the answer changes while somebody is looking
   * at the page, in another tab or on their phone. `?fresh=1` forces the round
   * trip, and five seconds is often enough to feel immediate without turning a
   * page somebody leaves open into a stream of requests.
   *
   * Confirmation only ever moves one way, so this flag does too: a poll that
   * says "not yet" is left to the state the page already holds.
   */
  useEffect(() => {
    if (!API_MODE || verified) return undefined
    let live = true
    const ask = async () => {
      try {
        const me = await apiGet<{ user: { emailVerified?: boolean | null } | null }>('/me?fresh=1')
        if (live && me.user?.emailVerified) {
          setVerified(true)
          // The rest of the app is still holding the unverified answer.
          reload()
        }
      } catch { /* signed out, or offline — the next tick tries again */ }
    }
    void ask()
    const timer = window.setInterval(() => { void ask() }, 5000)
    return () => { live = false; window.clearInterval(timer) }
  }, [reload, verified])

  useEffect(() => { if (verified) forgetPendingEmail() }, [verified])

  async function resend(event: React.FormEvent) {
    event.preventDefault()
    const address = email.trim().toLowerCase()
    if (!API_MODE) return setMessage('Account creation is prepared but this deployment is not connected to its account service yet.')
    if (!address) return setMessage('Enter the email address you signed up with.')
    setSending(true)
    setMessage('')
    try {
      await resendVerification(address)
    } catch (error) {
      setSending(false)
      return setMessage(authMessage(error, 'A fresh verification message could not be sent. Wait a moment and try again.'))
    }
    setSending(false)
    rememberPendingEmail(address)
    // The dead link has been replaced; leaving its warning up would send the
    // student back to the email that no longer works.
    setLinkFailure(null)
    setMessage(`A fresh verification email has been sent to ${address}.`)
  }

  // A link that came back broken is not a page that should keep announcing a
  // delivery: the student already opened the email, and what they need next is
  // the reason and a replacement.
  const state = verified ? 'verified' : linkFailure ? 'failed' : noEmailNeeded ? 'ready' : 'waiting'

  const heading = {
    verified: 'Email verified',
    ready: 'Account created',
    failed: 'Verification did not complete',
    waiting: 'Check your email',
  }[state]

  const subheading = {
    verified: 'Your address is confirmed. Continue and set up your studies.',
    ready: 'Your account is ready to use. Continue and set up your studies.',
    failed: 'The address is still unconfirmed, and the account cannot be used until it is. Each link works once, and only until it expires.',
    waiting: 'One more step: open the message we just sent and follow the link in it. The link proves that the address belongs to you.',
  }[state]

  const done = state === 'verified' || state === 'ready'

  return (
    <AuthLayout
      step="verify"
      completedSteps={done ? ['account', 'verify'] : ['account']}
      title={heading}
      description={subheading}
      compact
    >
      <div className="mx-auto max-w-lg text-center">
        <span
          className={
            done
              ? 'mx-auto grid size-14 place-items-center rounded-xl bg-success-tint text-success'
              : state === 'failed'
                ? 'mx-auto grid size-14 place-items-center rounded-xl bg-danger-tint text-danger'
                : 'mx-auto grid size-14 place-items-center rounded-xl bg-primary-tint text-primary-strong'
          }
        >
          <Icon icon={done ? CheckCircle2 : state === 'failed' ? MailWarning : MailCheck} size={26} />
        </span>

        {state === 'waiting' ? (
          <>
            <h2 className="mt-5 text-[25px]">We sent you a verification email</h2>
            {/* The address itself, set apart. The instruction is useless if the
                student cannot tell which of their inboxes to open. */}
            <p className="mx-auto mt-3 inline-flex max-w-full items-center gap-2 rounded-lg border border-primary-line bg-primary-tint/50 px-3.5 py-2 text-[13.5px] font-semibold text-primary-strong">
              <Icon icon={Inbox} size={15} className="shrink-0" />
              <span className="min-w-0 break-all">{knownEmail || 'your email address'}</span>
            </p>
            <ol className="mx-auto mt-5 max-w-[46ch] space-y-2 text-start text-[13px] leading-relaxed text-ink-2">
              {[
                'Open your inbox and find the message from Nishany.',
                'Follow the verification link inside it. Check your spam folder if it is not there within a minute or two.',
                'You are brought straight back here, signed in and ready to start.',
              ].map((line, index) => (
                <li key={line} className="flex gap-2.5">
                  <span className="tnum mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-inset font-mono text-[11px] font-semibold text-ink-2">{index + 1}</span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[12px] text-ink-3">This page updates on its own once the link is followed — you can leave it open.</p>
          </>
        ) : (
          <>
            <h2 className="mt-5 text-[25px]">
              {state === 'verified' ? 'Verification complete' : state === 'ready' ? 'You are signed in' : 'Verification did not complete'}
            </h2>
            <p className="mx-auto mt-2 max-w-[52ch] text-[13px] leading-relaxed text-ink-2">
              {done
                ? 'Next you will choose your university, your year and a plan. An authenticator app is optional and can be added at any time from your account page.'
                : 'The address is still unconfirmed, and the account cannot be used until it is. Each link works once, and only until it expires.'}
            </p>
          </>
        )}

        {linkFailure && <p role="alert" className="mx-auto mt-4 flex max-w-[52ch] gap-2 rounded-lg border border-danger/30 bg-danger-tint px-3.5 py-3 text-start text-[12.5px] leading-relaxed text-danger"><Icon icon={AlertCircle} size={16} className="mt-0.5 shrink-0" />{linkFailure}</p>}
        {message && <p role="status" className="mt-4 rounded-lg border border-line bg-surface-2 px-3 py-2.5 text-[12.5px] text-ink-2">{message}</p>}

        {done ? (
          <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
            {/* Setting up the account is the next step, not protecting it. An
                optional second factor placed between verification and first use
                reads as a required one, which is how a student ended up in an
                authenticator screen they had not asked for. */}
            <Link to="/app" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 text-[13.5px] font-semibold text-on-primary hover:bg-primary-hover">Continue</Link>
            <Link to="/auth/mfa" className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-4 text-[13px] font-semibold text-ink-2 hover:bg-inset hover:text-ink">
              <Icon icon={ShieldCheck} size={15} />
              Add an authenticator (optional)
            </Link>
          </div>
        ) : (
          <form className="mt-6" onSubmit={(event) => void resend(event)}>
            {!knownEmail && <Field label="Email address" htmlFor="verify-email" className="mx-auto mb-3 max-w-sm text-start"><TextInput id="verify-email" name="email" type="email" autoComplete="email" spellCheck={false} required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@university.edu…" /></Field>}
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
