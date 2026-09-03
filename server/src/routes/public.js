/**
 * Health and the voice-deployment probe: the two routes anybody may call.
 */
import { loadSfu } from '../roomsSfu.js'

export function registerPublicRoutes(app) {
  app.get('/api/health', (_req, res) => res.json({ ok: true }))

  /*
   * The voice deployment, as a browser would see it — minus anything secret.
   *
   * Public on purpose: it is the only way to check from outside the host that
   * the media server announces a reachable address and that the host forwards
   * its ports, and the candidates it returns are useless without the ICE
   * credentials, which stay on the transport. See `roomsSfu.probe`.
   */
  app.get('/api/rooms/voice', async (_req, res) => {
    const sfu = await loadSfu()
    if (!sfu.available) return res.json({ available: false, reason: sfu.reason })
    try {
      res.json({ available: true, config: sfu.describe(), ...(await sfu.probe()) })
    } catch (error) {
      res.status(500).json({ available: true, config: sfu.describe(), error: error?.message ?? 'probe failed' })
    }
  })
}
