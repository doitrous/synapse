/**
 * Email sending via Resend.
 *
 * IMPORTANT: a Resend API key must never live in the browser bundle — anyone
 * could read it. So the SPA never calls Resend directly; a server holds the key.
 *
 * In live mode (VITE_API_BASE set) that server is our own backend: mail goes to
 * POST /api/mail/send, which sends through Resend and records the message in the
 * `emails` table so it appears in Mail Box. Setting RESEND_API_KEY on the server
 * is therefore all that is required — there is no second build-time variable to
 * remember, which is what used to strand the app in demo mode.
 *
 * VITE_EMAIL_ENDPOINT remains supported for the static demo build, where there is
 * no backend: point it at a standalone function (see server/send-email.example.ts).
 * With neither configured, sendEmail records intent only.
 */

import { API_MODE, apiPost } from './api'

export interface SendEmailInput {
  to: string
  subject: string
  html: string
  from?: string
  /**
   * Plain-text alternative. Sending HTML alone is one of the cheapest ways to look
   * like bulk mail, so every caller that has a body should send one.
   */
  text?: string
  /**
   * Extra RFC headers — in practice List-Unsubscribe and List-Unsubscribe-Post,
   * which is what makes Gmail and Outlook show their own unsubscribe control
   * instead of offering the reader the "report spam" button.
   */
  headers?: Record<string, string>
}

export interface SendEmailResult {
  ok: boolean
  status: 'Sent' | 'Failed' | 'Queued'
  id?: string
  error?: string
  demo?: boolean
}

const ENDPOINT = import.meta.env.VITE_EMAIL_ENDPOINT as string | undefined
const DEFAULT_FROM = import.meta.env.VITE_EMAIL_FROM as string | undefined

export function emailConfigured(): boolean {
  return API_MODE || Boolean(ENDPOINT)
}

/** Where mail is being sent from, for the admin status banner. */
export function emailTransport(): 'backend' | 'endpoint' | 'demo' {
  if (API_MODE) return 'backend'
  return ENDPOINT ? 'endpoint' : 'demo'
}

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  if (API_MODE) {
    // The backend owns the Resend key and the sender address, and records the
    // message so it shows up in Mail Box. Omitting `from` lets MAIL_FROM win.
    try {
      const data = await apiPost<{ id?: string; status?: string; resendId?: string | null }>('/mail/send', {
        from: input.from,
        to: input.to,
        subject: input.subject,
        html: input.html,
        text: input.text,
        headers: input.headers,
      })
      // The server reports Queued when no Resend key is configured on its side.
      const queued = data.status === 'Queued'
      return { ok: true, status: queued ? 'Queued' : 'Sent', id: data.resendId ?? data.id }
    } catch (error) {
      return { ok: false, status: 'Failed', error: error instanceof Error ? error.message : 'Network error' }
    }
  }

  const from = input.from ?? DEFAULT_FROM ?? 'Synapse <no-reply@synapse.app>'
  if (!ENDPOINT) {
    // Demo build with no backend and no function — record intent only.
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
