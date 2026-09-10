/**
 * Friends, invites, and the (dark) Facebook link plus Meta's deletion callback.
 */
import express from 'express'
import { requireAuthenticated } from '../auth.js'
import { deletionCallback as facebookDeletionCallback, linkAccount as linkFacebookAccount, matchFacebookFriends, parseSignedRequest as parseFacebookSignedRequest, unlinkAccount as unlinkFacebookAccount } from '../facebook.js'
import { mintInvite, redeemInvite } from '../friendInvites.js'
import { directorySearch, myFriends, myRequests, removeFriend, respondToRequest, sendRequest } from '../friends.js'
import { blockUser, blockedList, unblockUser } from '../blocks.js'
import { PUBLIC_ORIGIN, wrap } from '../http.js'

export function registerFriendRoutes(app) {
  /* ── Friends ─────────────────────────────────────────────────────────────── */

  app.get('/api/friends', requireAuthenticated, wrap(async (req, res) => {
    res.json({
      friends: await myFriends(req.identity.id),
      requests: await myRequests(req.identity.id),
      blocked: await blockedList(req.identity.id),
    })
  }))

  /* ── Blocking ────────────────────────────────────────────────────────────── */

  app.post('/api/friends/block', requireAuthenticated, wrap(async (req, res) => {
    res.json(await blockUser(req.identity.id, req.body?.userId))
  }))

  app.post('/api/friends/unblock', requireAuthenticated, wrap(async (req, res) => {
    res.json(await unblockUser(req.identity.id, req.body?.userId))
  }))

  app.get('/api/friends/directory', requireAuthenticated, wrap(async (req, res) => {
    res.json({ people: await directorySearch(req.identity.id, req.query?.q) })
  }))

  app.post('/api/friends/request', requireAuthenticated, wrap(async (req, res) => {
    res.json(await sendRequest(req.identity.id, req.body?.userId))
  }))

  app.post('/api/friends/respond', requireAuthenticated, wrap(async (req, res) => {
    res.json(await respondToRequest(req.identity.id, req.body?.userId, Boolean(req.body?.accept)))
  }))

  app.post('/api/friends/remove', requireAuthenticated, wrap(async (req, res) => {
    res.json(await removeFriend(req.identity.id, req.body?.userId))
  }))

  app.post('/api/friends/invite', requireAuthenticated, wrap(async (req, res) => {
    res.json(await mintInvite(req.identity.id))
  }))

  app.post('/api/friends/invite/redeem', requireAuthenticated, wrap(async (req, res) => {
    res.json(await redeemInvite(req.identity.id, req.body?.token))
  }))

  /* ── Facebook link ────────────────────────────────────────────────────────
     Dark until Meta approves `user_friends` for this app: nothing here starts
     an OAuth handshake, so these routes exist for the day the flag flips on. */

  /**
   * The same off switch the front end has.
   *
   * `VITE_FEATURE_FACEBOOK_FRIENDS` only ever hid the button, so linking still
   * shipped live as an API — "it ships off" was true of the screen and not of
   * the server. Off is the default: a flag nobody has set means the feature is
   * not on, never that the check was forgotten.
   */
  function facebookFriendsEnabled(_req, res, next) {
    if (process.env.FEATURE_FACEBOOK_FRIENDS !== 'true') {
      // A refusal with a reason, not a status code: every other refusal in this
      // file answers 200 with `{ ok, reason }`, and the client's `apiSend` throws
      // away the body of anything else — so a 4xx here would reach a student as
      // "something went wrong" instead of a sentence.
      return res.json({ ok: false, reason: 'facebook_disabled' })
    }
    return next()
  }

  app.post('/api/friends/facebook/link', requireAuthenticated, facebookFriendsEnabled, wrap(async (req, res) => {
    res.json(await linkFacebookAccount(req.identity.id, req.body?.fbUserId))
  }))

  app.post('/api/friends/facebook/unlink', requireAuthenticated, facebookFriendsEnabled, wrap(async (req, res) => {
    res.json(await unlinkFacebookAccount(req.identity.id))
  }))

  /**
   * The intersection itself.
   *
   * `fbFriendIds` is the caller's own Facebook friend list, read by the browser
   * straight from Facebook's `/me/friends` for the account it just connected.
   * This route never talks to Facebook — it only matches that list against
   * `facebook_links`, same as the deletion callback never re-derives what Meta
   * already told it.
   */
  app.post('/api/friends/facebook/match', requireAuthenticated, facebookFriendsEnabled, wrap(async (req, res) => {
    const fbFriendIds = Array.isArray(req.body?.fbFriendIds) ? req.body.fbFriendIds : []
    res.json({ people: await matchFacebookFriends(req.identity.id, fbFriendIds) })
  }))

  /**
   * Meta's data-deletion callback, required for App Review.
   *
   * Public because Meta's own servers call it — there is no student session to
   * require, and requiring one meant this route answered 401 to every deletion
   * request, so the requirement it exists for did not work at all. What
   * authenticates it instead is the `signed_request` Meta signs with the app
   * secret: no secret configured, or a signature that does not verify, and the
   * request is refused rather than processed. It is listed in `apiAuthGate`'s
   * allowlist for that reason and no other.
   *
   * Left ungated by `FEATURE_FACEBOOK_FRIENDS` deliberately: anybody who ever
   * linked an account must be able to have it deleted, including after linking
   * is switched back off.
   *
   * Meta posts this form-encoded, so the parser is attached here rather than
   * globally — no other route takes a form body.
   */
  app.post('/api/facebook/deletion-callback', express.urlencoded({ extended: false }), wrap(async (req, res) => {
    const appSecret = process.env.FACEBOOK_APP_SECRET
    if (!appSecret) return res.status(503).json({ error: 'facebook_not_configured' })

    const payload = parseFacebookSignedRequest(req.body?.signed_request ?? req.query?.signed_request, appSecret)
    if (!payload?.user_id) return res.status(401).json({ error: 'invalid_signed_request' })

    const fbUserId = String(payload.user_id)
    await facebookDeletionCallback(fbUserId)
    res.json({ url: `${PUBLIC_ORIGIN}/privacy`, confirmation_code: fbUserId })
  }))
}
