/**
 * Deleting your own account, and the push devices that account signs in on.
 */
import { deleteAccount } from '../accountDeletion.js'
import { requireAuthenticated } from '../auth.js'
import { pool } from '../db.js'
import { wrap } from '../http.js'
import { normaliseDeviceToken } from '../push.js'

export function registerDeviceRoutes(app) {
  /* ── State store (mirrors localStorage keys) ─────────────────────────────── */

  /* ── Deleting an account ─────────────────────────────────────────────────── */

  /**
   * A student erasing their own account.
   *
   * Scoped to the caller and to nobody else: there is no id in the path, so the
   * only account this route can delete is the one whose token was presented.
   * App Store guideline 5.1.1(v) requires this to exist and to actually delete.
   */
  app.delete('/api/account', requireAuthenticated, wrap(async (req, res) => {
    const result = await deleteAccount(req.identity)
    if (result.error) return res.status(result.status ?? 400).json(result)
    return res.json(result)
  }))

  /* ── Push notification devices ───────────────────────────────────────────── */


  /**
   * Register this device for push, or move it to the current user.
   *
   * Upserting on the token is deliberate: see the note on `device_tokens` in
   * schema.sql. Whoever signed in most recently on a device is who that device
   * belongs to, so a shared or resold phone stops receiving the previous
   * student's reminders.
   */
  app.post('/api/devices', requireAuthenticated, wrap(async (req, res) => {
    const platform = ['ios', 'android', 'web'].includes(req.body?.platform) ? req.body.platform : 'ios'
    const locale = typeof req.body?.locale === 'string' ? req.body.locale.slice(0, 16) : null
    const appVersion = typeof req.body?.appVersion === 'string' ? req.body.appVersion.slice(0, 32) : null

    if (platform === 'web') {
      // A web subscription's identity is its endpoint (used as the PK token).
      const sub = req.body?.subscription
      const endpoint = typeof sub?.endpoint === 'string' ? sub.endpoint : null
      const p256dh = typeof sub?.keys?.p256dh === 'string' ? sub.keys.p256dh : null
      const auth = typeof sub?.keys?.auth === 'string' ? sub.keys.auth : null
      if (!endpoint || !p256dh || !auth) return res.status(400).json({ error: 'invalid web subscription' })
      await pool.query(
        `INSERT INTO device_tokens (token, user_id, platform, environment, locale, app_version, web_endpoint, web_p256dh, web_auth)
         VALUES (?, ?, 'web', 'production', ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), locale = VALUES(locale),
           app_version = VALUES(app_version), web_endpoint = VALUES(web_endpoint),
           web_p256dh = VALUES(web_p256dh), web_auth = VALUES(web_auth), last_seen_at = CURRENT_TIMESTAMP`,
        [endpoint, req.identity.id, locale, appVersion, endpoint, p256dh, auth],
      )
      return res.json({ ok: true })
    }

    const token = normaliseDeviceToken(req.body?.token)
    if (!token) return res.status(400).json({ error: 'invalid device token' })
    const environment = req.body?.environment === 'sandbox' ? 'sandbox' : 'production'
    await pool.query(
      `INSERT INTO device_tokens (token, user_id, platform, environment, locale, app_version)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), platform = VALUES(platform),
         environment = VALUES(environment), locale = VALUES(locale),
         app_version = VALUES(app_version), last_seen_at = CURRENT_TIMESTAMP`,
      [token, req.identity.id, platform, environment, locale, appVersion],
    )
    res.json({ ok: true })
  }))

  /**
   * Stop sending to this device — sign-out, or the student turning reminders off.
   *
   * Scoped to the caller's own rows. Tokens are not secret (the device hands
   * ours to us and Apple's to everyone), so without the `user_id` filter anyone
   * holding a token could silence someone else's notifications.
   */
  app.delete('/api/devices/:token', requireAuthenticated, wrap(async (req, res) => {
    const token = normaliseDeviceToken(req.params.token)
    if (!token) return res.status(400).json({ error: 'invalid device token' })
    await pool.query('DELETE FROM device_tokens WHERE token = ? AND user_id = ?', [token, req.identity.id])
    res.json({ ok: true })
  }))

  /**
   * Remove a web-push subscription. Its identity is the endpoint URL, which is not
   * a hex APNs token, so it cannot go through the token-validating DELETE above.
   * Scoped to the caller's own rows.
   */
  app.post('/api/devices/web/unsubscribe', requireAuthenticated, wrap(async (req, res) => {
    const endpoint = typeof req.body?.endpoint === 'string' ? req.body.endpoint : null
    if (!endpoint) return res.status(400).json({ error: 'endpoint required' })
    await pool.query(
      "DELETE FROM device_tokens WHERE platform = 'web' AND web_endpoint = ? AND user_id = ?",
      [endpoint, req.identity.id],
    )
    res.json({ ok: true })
  }))
}
