import { useState } from 'react'
import { Link } from 'react-router-dom'
import { KeyRound } from 'lucide-react'
import { AuthLayout } from './AuthLayout'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { supabase } from '@/lib/supabase'
import { authErrorMessage } from './authMessages'

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!supabase) return setMessage('Supabase is not connected yet. No reset email was sent.')
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth/reset-password` })
    setLoading(false)
    setMessage(error ? authErrorMessage(error, 'The reset message could not be requested. Wait a moment and try again.') : 'If an account exists for that address, a reset message has been sent.')
  }
  return <AuthLayout step="account" showProgress={false} title="Reset your password" description="Request a time-limited reset link. The response does not reveal whether an email address is registered." compact><form className="mx-auto max-w-md space-y-5" onSubmit={submit}><Field label="Email address" htmlFor="reset-email"><TextInput id="reset-email" name="email" type="email" autoComplete="email" spellCheck={false} required value={email} onChange={(event) => setEmail(event.target.value)} /></Field>{message && <p role="status" className="rounded-lg border border-line bg-surface-2 px-3 py-2.5 text-[12.5px] text-ink-2">{message}</p>}<Button className="w-full" type="submit" variant="primary" size="lg" iconLeft={KeyRound} loading={loading}>Send reset link</Button><p className="text-center"><Link className="text-[13px] font-semibold text-primary-strong hover:text-primary" to="/login">Back to sign in</Link></p></form></AuthLayout>
}
