/**
 * Passwordless passkey (WebAuthn) sign-in.
 *
 * Supabase has no native passkey support, so this runs entirely outside it: a
 * fingerprint/PIN ceremony is verified against `webauthn_credentials` (this
 * module owns that table alone), and only *after* it succeeds does a Supabase
 * session get minted. See `mintSupabaseSession` for how — there is no
 * "sign in with an externally-verified credential" endpoint, so it reuses the
 * same admin `generate_link` trick `requestPasswordReset` (accounts.js)
 * already relies on for recovery links, asking for a magic-link token instead
 * of a recovery one and hashing it into a `token_hash` the client redeems with
 * `supabase.auth.verifyOtp`.
 *
 * Two production origins share one RP ID: the admin host
 * (connectadminacademy.nishany.com) is a *subdomain* of the student host
 * (nishany.com), and WebAuthn scopes a credential to the RP ID, not the exact
 * origin — so `nishany.com` as RP ID covers both, and a passkey registered on
 * either portal works on the other.
 */
import { randomUUID } from 'node:crypto'
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from '@simplewebauthn/server'
import { pool } from './db.js'

const RP_ID = process.env.WEBAUTHN_RP_ID || 'localhost'
const RP_NAME = process.env.WEBAUTHN_RP_NAME || 'Nishany'
const ALLOWED_ORIGINS = (process.env.WEBAUTHN_ORIGINS
  || 'https://nishany.com,https://connectadminacademy.nishany.com,http://localhost:5173')
  .split(',').map((origin) => origin.trim()).filter(Boolean)

// Supabase admin config (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY) is read at
// call time inside mintSupabaseSession / webauthnConfigured, not captured here.

/**
 * The challenge each ceremony must echo back, stashed between the "options"
 * call and the "verify" call.
 *
 * Keyed by user id for registration (the caller already has a session) and by
 * lower-cased email for authentication (the caller does not, yet). Same
 * in-memory-Map-with-TTL shape as `authHandoff.js`'s code store, for the same
 * reason:
 *
 * ponytail: in-memory and per-process — fine for the one Express instance
 * this runs behind. Move to Redis/DB if the API ever scales horizontally, same
 * as the note on authHandoff.js's map.
 */
const CHALLENGE_TTL_MS = 2 * 60_000
const challenges = new Map() // key -> { challenge, expiresAt }

function sweepChallenges(now) {
  for (const [key, entry] of challenges) if (entry.expiresAt <= now) challenges.delete(key)
}

function stashChallenge(key, challenge, now = Date.now()) {
  sweepChallenges(now)
  challenges.set(key, { challenge, expiresAt: now + CHALLENGE_TTL_MS })
}

/** Single-use: gone whether or not it was still valid. */
function takeChallenge(key, now = Date.now()) {
  const entry = challenges.get(key)
  challenges.delete(key)
  if (!entry || entry.expiresAt <= now) return null
  return entry.challenge
}

function normaliseEmail(value) {
  return String(value ?? '').trim().toLowerCase()
}

/** Registered credentials for one account — the enrolment list Account.tsx renders. */
export async function listPasskeys(userId) {
  const [rows] = await pool.query(
    `SELECT id, device_label AS deviceLabel, transports, created_at AS createdAt, last_used_at AS lastUsedAt
       FROM webauthn_credentials WHERE user_id = ? ORDER BY created_at DESC`,
    [userId],
  )
  return rows
}

export async function removePasskey(userId, id) {
  const [result] = await pool.query(
    'DELETE FROM webauthn_credentials WHERE id = ? AND user_id = ?',
    [id, userId],
  )
  if (!result.affectedRows) return { error: 'not_found' }
  return { ok: true }
}

/**
 * Registration options for the signed-in caller.
 *
 * Existing credentials are excluded so a student cannot register the same
 * authenticator twice, and so an authenticator that already holds a passkey
 * for this account skips straight to "already registered" in its own UI
 * rather than silently minting a second, redundant credential.
 */
export async function registrationOptions(userId, email) {
  const [existing] = await pool.query(
    'SELECT credential_id AS credentialId, transports FROM webauthn_credentials WHERE user_id = ?',
    [userId],
  )
  const options = await generateRegistrationOptions({
    rpName: RP_NAME,
    rpID: RP_ID,
    userName: email || userId,
    userID: Buffer.from(userId, 'utf8'),
    attestationType: 'none',
    excludeCredentials: existing.map((row) => ({
      id: row.credentialId,
      transports: row.transports ? row.transports.split(',') : undefined,
    })),
    authenticatorSelection: { residentKey: 'preferred', userVerification: 'preferred' },
  })
  stashChallenge(userId, options.challenge)
  return options
}

/** Verify the attestation and store the credential row. */
export async function verifyRegistration(userId, body) {
  const expectedChallenge = takeChallenge(userId)
  if (!expectedChallenge) return { error: 'challenge_expired' }

  let verification
  try {
    verification = await verifyRegistrationResponse({
      response: body?.response ?? body,
      expectedChallenge,
      expectedOrigin: ALLOWED_ORIGINS,
      expectedRPID: RP_ID,
    })
  } catch (error) {
    return { error: 'verification_failed', detail: error.message }
  }
  if (!verification.verified || !verification.registrationInfo) return { error: 'not_verified' }

  const { credential } = verification.registrationInfo
  const deviceLabel = String(body?.deviceLabel ?? '').trim().slice(0, 120) || null
  await pool.query(
    `INSERT INTO webauthn_credentials (id, user_id, credential_id, public_key, counter, transports, device_label)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      randomUUID(),
      userId,
      credential.id,
      Buffer.from(credential.publicKey).toString('base64url'),
      credential.counter ?? 0,
      (credential.transports ?? []).join(',') || null,
      deviceLabel,
    ],
  )
  return { ok: true }
}

/**
 * Authentication options for an email that has not signed in yet.
 *
 * Options are generated — and a challenge stashed — whether or not that email
 * holds a passkey. Answering differently for "no passkey on file" would let a
 * caller enumerate registered emails one guess at a time; instead every email
 * gets the same shape of response, and one with no credentials simply cannot
 * produce a verifiable assertion afterwards.
 */
export async function authenticationOptions(email) {
  const normalised = normaliseEmail(email)
  if (!normalised) return { error: 'email_required' }

  const [rows] = await pool.query(
    `SELECT wc.credential_id AS credentialId, wc.transports
       FROM webauthn_credentials wc
       JOIN user_access ua ON ua.user_id = wc.user_id
      WHERE ua.email = ?`,
    [normalised],
  )
  const options = await generateAuthenticationOptions({
    rpID: RP_ID,
    userVerification: 'preferred',
    allowCredentials: rows.map((row) => ({
      id: row.credentialId,
      transports: row.transports ? row.transports.split(',') : undefined,
    })),
  })
  stashChallenge(normalised, options.challenge)
  return options
}

async function findStoredCredential(email, credentialId) {
  const [rows] = await pool.query(
    `SELECT wc.id, wc.user_id AS userId, wc.public_key AS publicKey, wc.counter, wc.transports
       FROM webauthn_credentials wc
       JOIN user_access ua ON ua.user_id = wc.user_id
      WHERE ua.email = ? AND wc.credential_id = ?`,
    [email, credentialId],
  )
  return rows[0] ?? null
}

/**
 * Verify the assertion, bump the stored counter, and mint a Supabase session.
 *
 * Split into two calls — this one owns the crypto and the credential lookup,
 * `finalizeAuthentication` owns everything that follows a *successful*
 * verification — so the counter-bump-and-session-mint half can be exercised
 * directly in tests without fabricating a real signed assertion.
 */
export async function verifyAuthentication(body) {
  const email = normaliseEmail(body?.email)
  if (!email) return { error: 'email_required' }
  const expectedChallenge = takeChallenge(email)
  if (!expectedChallenge) return { error: 'challenge_expired' }

  const response = body?.response ?? body
  const credentialId = response?.id
  if (!credentialId) return { error: 'invalid_response' }

  const stored = await findStoredCredential(email, credentialId)
  if (!stored) return { error: 'unknown_credential' }

  let verification
  try {
    verification = await verifyAuthenticationResponse({
      response,
      expectedChallenge,
      expectedOrigin: ALLOWED_ORIGINS,
      expectedRPID: RP_ID,
      credential: {
        id: credentialId,
        publicKey: new Uint8Array(Buffer.from(stored.publicKey, 'base64url')),
        counter: Number(stored.counter),
        transports: stored.transports ? stored.transports.split(',') : undefined,
      },
    })
  } catch (error) {
    return { error: 'verification_failed', detail: error.message }
  }
  if (!verification.verified) return { error: 'not_verified' }

  return finalizeAuthentication(email, stored, verification)
}

/** Everything that happens once an assertion is already known to be good. */
export async function finalizeAuthentication(email, stored, verification) {
  await pool.query(
    'UPDATE webauthn_credentials SET counter = ?, last_used_at = CURRENT_TIMESTAMP WHERE id = ?',
    [verification.authenticationInfo.newCounter, stored.id],
  )
  return mintSupabaseSession(email)
}

/**
 * The crux: turn "this browser just proved it holds a registered passkey"
 * into a real Supabase session, with no password in sight.
 *
 * Supabase does not expose a way to sign in as an already-verified user, so
 * this asks for a magic-link instead and only ever hands the client the
 * resulting `token_hash` — never the full `action_link` (which embeds a
 * redirect URL) and never anything the service-role key could be recovered
 * from. The client exchanges the hash for a session itself, one time, via
 * `supabase.auth.verifyOtp({ type: 'email', token_hash })`.
 */
async function mintSupabaseSession(email) {
  // Read at call time, not module load: env is present at request time in prod,
  // and this keeps the mint testable (a test can set the vars before calling).
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, '')
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceRoleKey) return { error: 'supabase_not_configured' }
  const response = await fetch(`${supabaseUrl}/auth/v1/admin/generate_link`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    },
    body: JSON.stringify({ type: 'magiclink', email }),
  })
  if (!response.ok) return { error: 'supabase_rejected', status: response.status }
  const payload = await response.json()
  const tokenHash = payload?.properties?.hashed_token
  if (!tokenHash) return { error: 'no_token' }
  return { ok: true, token_hash: tokenHash, email }
}

export function webauthnConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}
