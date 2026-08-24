import { useState } from 'react'
import type { Provider } from '@supabase/supabase-js'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

type SocialProvider = Extract<Provider, 'google' | 'facebook'>

const PROVIDERS: Array<{ id: SocialProvider; label: string; mark: string }> = [
  { id: 'google', label: 'Google', mark: 'G' },
  { id: 'facebook', label: 'Facebook', mark: 'f' },
]

export function SocialAuthButtons({
  redirectTo,
  mode,
}: {
  redirectTo: string
  mode: 'sign in' | 'sign up'
}) {
  const [busy, setBusy] = useState<SocialProvider | null>(null)
  const [error, setError] = useState('')

  async function start(provider: SocialProvider) {
    setError('')
    if (!supabase) {
      setError('Social sign-in is waiting for the Supabase project keys.')
      return
    }
    setBusy(provider)
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    })
    if (authError) {
      setBusy(null)
      setError(authError.message || `Social ${mode} could not be started.`)
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-2">
        {PROVIDERS.map((provider) => (
          <Button
            key={provider.id}
            type="button"
            variant="secondary"
            className="w-full"
            loading={busy === provider.id}
            disabled={!isSupabaseConfigured || Boolean(busy)}
            onClick={() => void start(provider.id)}
          >
            <span className="grid size-5 place-items-center rounded-full border border-line bg-surface font-mono text-[12px] font-bold text-ink-2" aria-hidden>
              {provider.mark}
            </span>
            {mode === 'sign in' ? 'Sign in' : 'Continue'} with {provider.label}
          </Button>
        ))}
      </div>
      {!isSupabaseConfigured && (
        <p className="text-[11.5px] text-ink-3">
          Enable Google/Facebook in Supabase Auth and add this app URL to redirect URLs before using social {mode}.
        </p>
      )}
      {error && (
        <p role="alert" className="flex gap-2 rounded-lg border border-danger/30 bg-danger-tint px-3.5 py-3 text-[12.5px] text-danger">
          <Icon icon={AlertCircle} size={16} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}
