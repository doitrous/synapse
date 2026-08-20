import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, CheckCircle2, KeyRound } from 'lucide-react'
import { AuthLayout } from './AuthLayout'
import { authErrorMessage } from './authMessages'
import { MIN_PASSWORD } from '@/data/accountIdentity'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { supabase } from '@/lib/supabase'

export function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setError('')
    if (!supabase) return setError('Supabase is not connected yet, so the password cannot be changed.')
    // The same single rule sign-up applies. Two different minimums would mean a
    // password accepted at registration could not be re-entered at a reset.
    if (password.length < MIN_PASSWORD) {
      return setError(`Use at least ${MIN_PASSWORD} characters for your password.`)
    }
    if (password !== confirm) return setError('Passwords do not match. Re-enter the same password in both fields.')
    setLoading(true)
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (updateError) return setError(authErrorMessage(updateError, 'The password could not be changed. Request a fresh reset link and try again.'))
    setDone(true)
  }

  return (
    <AuthLayout step="account" showProgress={false} title={done ? 'Password changed' : 'Choose a new password'} description={done ? 'Your account now uses the new password.' : 'This page works only after opening the time-limited recovery link sent to your email.'} compact>
      <div className="mx-auto max-w-md">
        {done ? <div className="text-center"><span className="mx-auto grid size-14 place-items-center rounded-xl bg-success-tint text-success"><Icon icon={CheckCircle2} size={26} /></span><Link to="/login" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 text-[13px] font-semibold text-on-primary hover:bg-primary-hover">Continue to sign in</Link></div> : <form className="space-y-5" onSubmit={submit}>{error && <p role="alert" className="flex gap-2 rounded-lg border border-danger/30 bg-danger-tint px-3.5 py-3 text-[12.5px] text-danger"><Icon icon={AlertCircle} size={16} className="mt-0.5 shrink-0" />{error}</p>}<Field label="New password" htmlFor="new-password"><TextInput id="new-password" type="password" autoComplete="new-password" minLength={MIN_PASSWORD} required value={password} onChange={(event) => setPassword(event.target.value)} /></Field><Field label="Confirm new password" htmlFor="confirm-new-password"><TextInput id="confirm-new-password" type="password" autoComplete="new-password" minLength={MIN_PASSWORD} required value={confirm} onChange={(event) => setConfirm(event.target.value)} /></Field><Button className="w-full" type="submit" variant="primary" size="lg" iconLeft={KeyRound} loading={loading}>Save new password</Button><p className="text-center"><Link className="text-[13px] font-semibold text-primary-strong hover:text-primary" to="/auth/forgot-password">Request a new recovery link</Link></p></form>}
      </div>
    </AuthLayout>
  )
}
