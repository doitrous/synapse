/**
 * Sign-in, the session shape the client reads, and passkeys. The sign-in flow
 * itself lives in authRoutes.js; this only mounts it and the routes around it.
 */
import { identifierTaken, usernameAvailability } from '../accounts.js'
import { heldTabs, requireAuthenticated } from '../auth.js'
import { router as authRouter } from '../authRoutes.js'
import { byUser, wrap } from '../http.js'
import { clientIp, rateLimited } from '../rateLimit.js'
import { requireTurnstile } from '../turnstile.js'
import { authenticationOptions, listPasskeys, registrationOptions, removePasskey, verifyAuthenticationRequest, verifyRegistration } from '../webauthn.js'

export function registerAuthRoutes(app) {
  /**
   * Whether an email or a phone is already registered.
   *
   * Sign-up asks before creating anything, so a person who already has an account
   * is sent to sign in rather than being handed an error after Supabase has made
   * an auth user with no roster row behind it. It answers only taken or not, and
   * it is rate limited because it is the one route here that has to work before
   * anybody is authenticated.
   */
  app.post('/api/accounts/exists', rateLimited('accounts_exists', clientIp, 20, 60_000), wrap(async (req, res) => {
    const { email, phone } = req.body ?? {}
    res.json(await identifierTaken({ email, phone }))
  }))

  /**
   * Whether a candidate username is free to take, for the signed-in caller.
   *
   * Same per-university, case-insensitive rule the profile save enforces —
   * this just answers it early so the account page can say so before Save is
   * pressed. The caller's own current username always reads as available.
   */
  app.get('/api/accounts/username-available', requireAuthenticated, rateLimited('username_available', byUser, 30, 60_000), wrap(async (req, res) => {
    res.json(await usernameAvailability(req.identity.id, String(req.query.u ?? '')))
  }))

  app.get('/api/session', wrap(async (req, res) => res.json({
    user: req.identity ? {
      id: req.identity.id,
      email: req.identity.email,
      role: req.identity.role,
      rank: req.identity.rank,
      // What the console should render. Resolved here so the browser never has to
      // work out its own permissions, and never disagrees with the guard.
      tabs: await heldTabs(req.identity),
      contentScope: req.identity.contentScope,
      aal: req.identity.aal,
      mfaRequired: Boolean(req.identity.mfaRequired),
    } : null,
  })))

  /**
   * Sign-in and everything around it — see authRoutes.js.
   *
   * This replaced the cross-origin handoff apparatus. Both portal hostnames are
   * served by this app and share one cookie at `.nishany.com`, so there is no
   * longer a session on one origin that the other cannot see, and nothing to hand
   * across in a URL.
   */
  // Bot check ahead of sign-up only — mounted here rather than inside
  // authRoutes.js so this track's file stays out of that router's own edits.
  // No-ops when TURNSTILE_SECRET_KEY is unset (see turnstile.js).
  app.use('/api/auth/signup', requireTurnstile)
  app.use('/api/auth', authRouter)

  // Passkeys (WebAuthn) — register/list/remove require a session; authenticate is
  // pre-login (public, allowlisted in auth.js) and mints a Supabase session on success.
  app.post('/api/auth/passkey/register/options', requireAuthenticated, wrap(async (req, res) => res.json(await registrationOptions(req.identity.id, req.identity.email))))
  app.post('/api/auth/passkey/register/verify', requireAuthenticated, wrap(async (req, res) => { const r = await verifyRegistration(req.identity.id, req.body ?? {}); if (r.error) return res.status(400).json(r); res.json(r) }))
  app.get('/api/auth/passkey/credentials', requireAuthenticated, wrap(async (req, res) => res.json({ credentials: await listPasskeys(req.identity.id) })))
  app.delete('/api/auth/passkey/credentials/:id', requireAuthenticated, wrap(async (req, res) => { const r = await removePasskey(req.identity.id, req.params.id); if (r.error) return res.status(404).json(r); res.json({ ok: true }) }))
  app.post('/api/auth/passkey/authenticate/options', wrap(async (req, res) => res.json(await authenticationOptions(req.body?.email))))
  app.post('/api/auth/passkey/authenticate/verify', wrap(verifyAuthenticationRequest))
}
