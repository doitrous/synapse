/**
 * Example serverless function that sends email via Resend.
 *
 * This is the ONLY place the Resend API key should ever live. Deploy it to
 * Vercel (`/api/send-email`), Netlify, Cloudflare Workers, or your own Node
 * server, set RESEND_API_KEY in that platform's environment, then set
 * VITE_EMAIL_ENDPOINT in the app to this function's URL.
 *
 *   npm i resend            # on the server project
 *
 * Rename to send-email.ts and adapt the handler signature to your platform.
 */
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface Body {
  to: string
  from: string
  subject: string
  html: string
}

// Vercel/Netlify-style handler (req, res). Adapt as needed.
export default async function handler(req: { method: string; body: Body }, res: { status: (n: number) => { json: (v: unknown) => void } }) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { to, from, subject, html } = req.body
  if (!to || !subject || !html) return res.status(400).json({ error: 'Missing to/subject/html' })

  try {
    const { data, error } = await resend.emails.send({ from, to, subject, html })
    if (error) return res.status(502).json({ error: error.message })
    return res.status(200).json({ id: data?.id })
  } catch (e) {
    return res.status(500).json({ error: e instanceof Error ? e.message : 'Send failed' })
  }
}
