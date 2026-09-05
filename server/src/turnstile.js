/**
 * Cloudflare Turnstile bot check, as Express middleware.
 *
 * A no-op whenever `TURNSTILE_SECRET_KEY` is unset — the same convention as
 * every other optional integration in this server (Resend, mediasoup):
 * an unconfigured deployment behaves exactly as it did before Turnstile
 * existed, rather than refusing every request behind it.
 */

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export async function requireTurnstile(req, res, next) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return next()

  const token = typeof req.body?.turnstileToken === 'string' ? req.body.turnstileToken : ''
  if (!token) return res.status(403).json({ error: 'bot_check_failed' })

  try {
    const body = new URLSearchParams({ secret, response: token })
    const ip = req.ip
    if (ip) body.set('remoteip', ip)
    const verify = await fetch(VERIFY_URL, { method: 'POST', body })
    const result = await verify.json()
    if (!result?.success) return res.status(403).json({ error: 'bot_check_failed' })
    return next()
  } catch {
    return res.status(403).json({ error: 'bot_check_failed' })
  }
}
