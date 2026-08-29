/**
 * Web push — the browser channel of the QotD reminder fan-out.
 *
 * Dormant until `VAPID_PUBLIC_KEY` + `VAPID_PRIVATE_KEY` are set, the same
 * "no-op when unconfigured" contract every other push sender in this codebase
 * follows (see `push.js`). A subscription that the push service reports gone
 * (404/410) is deleted the same way `push.js` deletes a dead APNs token — one
 * bad subscription must not fail the run, and a stale row must not linger
 * forever waiting for a student who uninstalled months ago.
 */

import webpush from 'web-push'
import { pool } from './db.js'

function configured(env = process.env) {
  return Boolean(env.VAPID_PUBLIC_KEY && env.VAPID_PRIVATE_KEY)
}

// Configured once at import time. web-push has no per-call override, so this
// mirrors how the module is actually used: env is read at boot, not per send.
if (configured()) {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:synapse@mail.doitrous.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY,
  )
}

/**
 * Send one web push. No-op (`false`) unless VAPID is configured or the device
 * has no endpoint. On success returns `true`; on a gone subscription (404/410)
 * the row is deleted and `false` is returned; any other failure also returns
 * `false` without touching the row (transient, not necessarily dead).
 */
export async function sendWebPush(device, notification) {
  if (!configured() || !device?.web_endpoint) return false

  const subscription = {
    endpoint: device.web_endpoint,
    keys: { p256dh: device.web_p256dh, auth: device.web_auth },
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({ title: notification.title, body: notification.body, path: notification.path }),
    )
    return true
  } catch (error) {
    if (error?.statusCode === 404 || error?.statusCode === 410) {
      try {
        await pool.query('DELETE FROM device_tokens WHERE web_endpoint = ?', [device.web_endpoint])
      } catch { /* the row can go next time */ }
    }
    return false
  }
}
