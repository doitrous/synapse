import { useState } from 'react'
import type { Provider } from '@supabase/supabase-js'
import { Button } from '@/components/ui/Button'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

const PROVIDERS: Array<{ id: Provider; label: string; mark: string }> = [
  { id: 'google', label: 'Google', mark: 'G' },
  { id: 'facebook', label: 'Facebook', mark: 'f' },
]

export function SocialAuthButtons({ mode, redirectTo }: { mode: 'sign in' | 'sign up'; redirectTo: string }) {
  const [loading, setLoading] = useState<Provider | null>(null)
  const [error, setError] = useState('')

  async function start(provider: Provider) {
    setError('')
    if (!supabase) {
      setError('Social sign-in is not available until Supabase is configured.')
      return
    }
    setLoading(provider)
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    })
    if (signInError) {
      setError(signInError.message || `Could not start ${provider} sign-in.`)
      setLoading(null)
    }
  }

  return (
    <div className="space-y-2">
      <div className="grid gap-2 sm:grid-cols-2">
        {PROVIDERS.map((provider) => (
          <Button
            key={provider.id}
            type="button"
            variant="secondary"
            className="justify-center"
            disabled={!isSupabaseConfigured || Boolean(loading)}
            loading={loading === provider.id}
            onClick={() => void start(provider.id)}
          >
            <span className="me-2 grid size-5 place-items-center rounded-full border border-line text-[12px] font-bold">{provider.mark}</span>
            {provider.label}
          </Button>
        ))}
      </div>
      {!isSupabaseConfigured && <p className="text-[11.5px] text-ink-3">Enable Google/Facebook in Supabase Auth and add this app URL to redirect URLs before using social {mode}.</p>}
      {error && <p role="alert" className="text-[12px] text-danger">{error}</p>}
    </div>
  )
}
