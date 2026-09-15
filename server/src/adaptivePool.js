/**
 * The adaptive pool route.
 *
 * Adaptive Setup used to download the 239 MB ledger and project it in the
 * browser (which froze the tab) just to count concepts. This serves the same
 * numbers pre-projected: the approved question bank reduced to the concept ids
 * and scope its pool-health, held-out and scope maths read — a few MB. The
 * projection itself lives in `adaptivePoolProject.js` (pure, parity-tested);
 * this only adds the loader, the guard and the version/304 envelope.
 */
import { requireConsole } from './auth.js'
import { loadAdminContent } from './adminContent.js'
import { adaptivePoolItem } from './adaptivePoolProject.js'

export async function adaptivePoolHandler(req, res) {
  const content = await loadAdminContent()
  const items = []
  for (const item of content.byKind.get('question') ?? []) {
    const projected = adaptivePoolItem(item)
    if (projected) items.push(projected)
  }
  const etag = `W/"adaptive-pool-1-${content.signature}"`
  res.set('ETag', etag)
  res.set('Cache-Control', 'private, no-cache')
  if (req.get('if-none-match') === etag) return res.status(304).end()
  return res.json({ version: content.signature, items })
}

export function registerAdaptivePoolRoutes(app) {
  const wrap = (fn) => (req, res) => Promise.resolve(fn(req, res)).catch((error) => {
    console.error(error)
    res.status(500).json({ error: error.message || 'server error' })
  })
  app.get('/api/admin/adaptive/pool', requireConsole, wrap(adaptivePoolHandler))
}
