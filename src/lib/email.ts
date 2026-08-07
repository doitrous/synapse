/**
 * Email sending via Resend.
 *
 * IMPORTANT: a Resend API key must never live in the browser bundle — anyone
 * could read it. So the SPA never calls Resend directly. Instead it POSTs to a
 * small server endpoint (a serverless function) that holds the key and forwards
 * the request to Resend.
 *
 * Configure two things:
 *   • Server (where the key lives):  RESEND_API_KEY   — e.g. a Vercel/Netlify/
 *     Cloudflare function env var, or your own API. See server/send-email.example.ts.
 *   • Client (this app):            VITE_EMAIL_ENDPOINT — the URL of that function,
 *     set in a .env file (see .env.example).
 *
 * When VITE_EMAIL_ENDPOINT is not set, sendEmail runs in demo mode and only
 * records the attempt in the local message log.
 */

export interface SendEmailInput {
  to: string
  subject: string
  html: string
  from?: string
}

export interface SendEmailResult {
  ok: boolean
  status: 'Sent' | 'Failed' | 'Queued'
  id?: string
  error?: string
  demo?: boolean
}

const ENDPOINT = import.meta.env.VITE_EMAIL_ENDPOINT as string | undefined
const DEFAULT_FROM = (import.meta.env.VITE_EMAIL_FROM as string | undefined) ?? 'Synapse <no-reply@synapse.app>'

export function emailConfigured(): boolean {
  return Boolean(ENDPOINT)
}

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const from = input.from ?? DEFAULT_FROM
  if (!ENDPOINT) {
    // Demo mode: no backend wired yet — record intent only.
    return { ok: true, status: 'Queued', demo: true, id: `demo-${Date.now()}` }
  }
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...input, from }),
    })
    if (!res.ok) {
      const error = await res.text().catch(() => res.statusText)
      return { ok: false, status: 'Failed', error }
    }
    const data = (await res.json().catch(() => ({}))) as { id?: string }
    return { ok: true, status: 'Sent', id: data.id }
  } catch (error) {
    return { ok: false, status: 'Failed', error: error instanceof Error ? error.message : 'Network error' }
  }
}
