import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

type Provider = 'google' | 'facebook'

const PROVIDER_LABEL: Record<Provider, string> = {
  google: 'Google',
  facebook: 'Facebook',
}

function mark(provider: Provider) {
  return provider === 'google' ? 'G' : 'f'
}

export function SocialAuthButtons({
  redirectTo,
  mode,
}: {
  redirectTo: string
  mode: 'sign in' | 'sign up'
}) {
  const [busy, setBusy] = useState<Provider | null>(null)
  const [error, setError] = useState('')

  async function start(provider: Provider) {
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
      setError(authError.message || 'Social sign-in could not be started.')
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-2">
        {(['google', 'facebook'] as const).map((provider) => (
          <Button
            key={provider}
            type="button"
            variant="secondary"
            className="w-full"
            loading={busy === provider}
            disabled={!isSupabaseConfigured || Boolean(busy)}
            onClick={() => void start(provider)}
          >
            <span className="grid size-5 place-items-center rounded-full border border-line bg-surface font-mono text-[12px] font-bold text-ink-2" aria-hidden>
              {mark(provider)}
            </span>
            {mode === 'sign in' ? 'Sign in' : 'Continue'} with {PROVIDER_LABEL[provider]}
          </Button>
        ))}
      </div>
      {error && (
        <p role="alert" className="flex gap-2 rounded-lg border border-danger/30 bg-danger-tint px-3.5 py-3 text-[12.5px] text-danger">
          <Icon icon={AlertCircle} size={16} className="mt-0.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}
