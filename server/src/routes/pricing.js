/**
 * Vouchers, the public price quote, and the marketing subscriber count.
 */
import { requireAuthenticated, requireSuperAdmin } from '../auth.js'
import { wrap } from '../http.js'
import { activeSubscriptionCount } from '../platformReports.js'
import { pricingQuote } from '../pricing.js'
import { computeSubscriberCount, nextSubscriberDisplayDoc, publicSubscriberCountPayload, readSubscriberDisplay, writeSubscriberDisplay } from '../subscriberCount.js'
import { myVoucher, redeemVoucher, releaseVoucher } from '../vouchers.js'

export function registerPricingRoutes(app) {
  /* ── Vouchers ────────────────────────────────────────────────────────────── */

  app.post('/api/vouchers/redeem', requireAuthenticated, wrap(async (req, res) => {
    const result = await redeemVoucher(req.identity.id, req.body?.code)
    // A refused voucher is a 200 with a typed reason, not an error status: the
    // client has to render the reason, and a 4xx would put the persistence layer
    // into its terminal-error path for something that is a normal answer.
    res.json(result)
  }))

  app.delete('/api/vouchers/redemption', requireAuthenticated, wrap(async (req, res) => {
    res.json(await releaseVoucher(req.identity.id))
  }))

  app.get('/api/vouchers/mine', requireAuthenticated, wrap(async (req, res) => {
    res.json({ redemption: await myVoucher(req.identity.id) })
  }))

  /* ── Pricing and verified QBank records ─────────────────────────────────── */

  app.get('/api/pricing/quote', wrap(async (req, res) => {
    const result = await pricingQuote({ period: req.query?.period, voucherCode: req.query?.voucher })
    if (result.error) return res.status(400).json(result)
    res.json(result)
  }))

  /**
   * The marketing subscriber count. No auth guard — it is read by anonymous
   * landing-page visitors, the same way `/api/pricing/quote` is. Hidden
   * entirely (`{ enabled: false }`) until a superadmin turns it on.
   */
  app.get('/api/public/subscriber-count', wrap(async (req, res) => {
    const doc = await readSubscriberDisplay()
    if (!doc.enabled) return res.json({ enabled: false })
    const realCountNow = await activeSubscriptionCount()
    res.json(publicSubscriberCountPayload(doc, { realCountNow, now: Date.now() }))
  }))

  /**
   * Superadmin-only. `requireSuperAdmin`, not `requireConsole` — the generic
   * `PUT /api/state/:key` must never write this key, because a base change
   * has to re-capture the real subscription count in the same request as the
   * write, and the generic route has no way to express that.
   */
  app.post('/api/admin/subscriber-count', requireSuperAdmin, wrap(async (req, res) => {
    const current = await readSubscriberDisplay()
    const realCountNow = await activeSubscriptionCount()
    const result = nextSubscriberDisplayDoc(current, req.body ?? {}, { realCountNow, now: Date.now() })
    if (!result.ok) return res.status(400).json({ error: result.error })
    await writeSubscriberDisplay(result.doc, req.identity.id)
    const preview = computeSubscriberCount(result.doc, { realCountNow, now: Date.now() })
    res.json({ ok: true, doc: result.doc, preview })
  }))
}
