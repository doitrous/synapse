import { useState, type ComponentType } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { API_MODE } from '@/lib/api'
import { oauthUrl } from '@/lib/auth/client'

type SocialProvider = 'google' | 'facebook'

/** Official four-colour Google "G", full-colour regardless of the button's own text colour. */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  )
}

/** Official Facebook "f", same full-colour treatment as Google's mark. */
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden focusable="false">
      <path fill="#1877F2" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.87v2.25h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/>
    </svg>
  )
}

const PROVIDERS: Array<{ id: SocialProvider; label: string; icon: ComponentType }> = [
  { id: 'google', label: 'Google', icon: GoogleIcon },
  { id: 'facebook', label: 'Facebook', icon: FacebookIcon },
]

/**
 * `next` is a path inside this app, not a URL.
 *
 * The whole exchange belongs to the server now: it mints the PKCE verifier,
 * keeps it and `next` in a cookie of its own, and only redirects back to a path
 * it has validated. Nothing about where to land is decided in this page, which
 * is what stops an OAuth return being turned into an open redirect.
 */
export function SocialAuthButtons({
  next,
  mode,
}: {
  next: string
  mode: 'sign in' | 'sign up'
}) {
  const [busy, setBusy] = useState<SocialProvider | null>(null)
  const [error, setError] = useState('')

  function start(provider: SocialProvider) {
    setError('')
    if (!API_MODE) {
      setError('Social sign-in is waiting for this deployment to be connected to its account service.')
      return
    }
    setBusy(provider)
    window.location.href = oauthUrl(provider, next)
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
            disabled={!API_MODE || Boolean(busy)}
            onClick={() => start(provider.id)}
          >
            <span className="grid size-[18px] shrink-0 place-items-center" aria-hidden>
              <provider.icon />
            </span>
            {mode === 'sign in' ? 'Sign in' : 'Continue'} with {provider.label}
          </Button>
        ))}
      </div>
      {!API_MODE && (
        <p className="text-[11.5px] text-ink-3">
          Enable Google/Facebook in Supabase Auth and add this host&rsquo;s <span className="font-mono">/api/auth/callback</span> to its redirect URLs before using social {mode}.
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
