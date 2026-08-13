/**
 * The address a signup is waiting on, kept until it is verified.
 *
 * The confirmation link is opened from a mail client, not from the tab that
 * submitted the form, so it lands on the verification page with no `?email=`
 * to work from. Remembering what the student typed is what keeps "Resend
 * verification" from being a button that can only apologise. When the store is
 * unavailable — private mode, a different browser — the page asks for the
 * address instead, so nothing here needs to succeed.
 */
const KEY = 'synapse.auth.pending-email'

export function rememberPendingEmail(email: string): void {
  try { localStorage.setItem(KEY, email) } catch { /* the page falls back to asking */ }
}

export function readPendingEmail(): string {
  try { return localStorage.getItem(KEY) || '' } catch { return '' }
}

export function forgetPendingEmail(): void {
  try { localStorage.removeItem(KEY) } catch { /* ignore */ }
}
