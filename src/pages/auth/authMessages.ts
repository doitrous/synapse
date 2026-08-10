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
  if (normalized.includes('network') || normalized.includes('fetch')) return 'Synapse could not reach the account service. Check your connection and try again.'
  return fallback
}
