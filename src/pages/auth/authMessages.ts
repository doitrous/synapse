export function authErrorMessage(error: unknown, fallback: string): string {
  const message = error instanceof Error
    ? error.message
    : typeof error === 'object' && error && 'message' in error
      ? String(error.message)
      : ''
  const normalized = message.toLowerCase()

  if (normalized.includes('invalid login credentials')) return 'The email or password is not correct. Check both fields or reset your password.'
  if (normalized.includes('email not confirmed')) return 'Verify your email from the message we sent before signing in.'
  if (normalized.includes('already registered')) return 'An account already uses this email. Sign in or reset its password.'
  if (normalized.includes('rate limit') || normalized.includes('too many')) return 'Too many attempts were made. Wait a few minutes, then try again.'
  if (normalized.includes('expired')) return 'That secure link or code has expired. Request a fresh one and try again.'
  if (normalized.includes('network') || normalized.includes('fetch')) return 'Connect Cortex could not reach the account service. Check your connection and try again.'
  return fallback
}

/**
 * What a failed confirmation link says for itself, read out of the URL it came
 * back on. Supabase puts the reason in the hash (`#error_code=otp_expired`) for
 * a link, in the query string for a handful of server-side failures, and in
 * neither when the link worked.
 *
 * Only the codes are trusted. `error_description` travels in a URL anyone can
 * edit, so it is never shown: a stranger's sentence rendered inside the account
 * page is a phishing line with our styling on it.
 */
export function verificationLinkError(search: string, hash: string): string | null {
  const fromHash = new URLSearchParams(hash.replace(/^#/, ''))
  const fromQuery = new URLSearchParams(search.replace(/^\?/, ''))
  const read = (key: string) => (fromHash.get(key) || fromQuery.get(key) || '').toLowerCase()
  const code = read('error_code')
  const error = read('error')
  if (!code && !error) return null

  if (code.includes('expired')) return 'That verification link has expired. Send a fresh one below and open it from the newest email.'
  if (code.includes('invalid') || error === 'access_denied') return 'That verification link is no longer valid — it may already have been used. Send a fresh one below.'
  return 'The account service could not complete that verification link. Send a fresh one below, or try again in a few minutes.'
}
