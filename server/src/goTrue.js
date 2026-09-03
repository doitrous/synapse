/**
 * The Supabase Auth (GoTrue) REST API, spoken by the server instead of the browser.
 *
 * Everything `@supabase/supabase-js` did in the page happens here now, with the
 * anon key in `apikey` and the caller's own access token as the bearer where a
 * user context is required. One wrapper so there is one place that knows the
 * URL shape, one place that decides what an error looks like, and one place
 * that guarantees GoTrue's raw body never reaches a client — an auth service's
 * error payload is a description of our configuration.
 *
 * Every function answers `{ data, error }`; `error` is `{ status, code, message }`
 * or null. Nothing throws.
 */

const configError = {
  status: 503,
  code: 'auth_not_configured',
  message: 'Authentication is not configured on this server.',
}

function safeParse(text) {
  try { return JSON.parse(text) } catch { return null }
}

function config() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, '')
  const apikey = process.env.SUPABASE_ANON_KEY
  return url && apikey ? { url, apikey } : null
}

export function goTrueConfigured() {
  return Boolean(config())
}

async function call(path, { method = 'POST', body, accessToken, query } = {}) {
  const settings = config()
  if (!settings) return { data: null, error: configError }
  const search = query ? `?${new URLSearchParams(query)}` : ''
  let response
  try {
    response = await fetch(`${settings.url}/auth/v1${path}${search}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        apikey: settings.apikey,
        Authorization: `Bearer ${accessToken || settings.apikey}`,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch (error) {
    console.error('[auth] the auth service could not be reached:', error?.message ?? error)
    return { data: null, error: { status: 502, code: 'auth_unreachable', message: 'The authentication service could not be reached.' } }
  }

  const text = await response.text()
  const payload = text ? safeParse(text) : null
  if (!response.ok) {
    // GoTrue spells the same failure three ways depending on the endpoint and
    // its version. Normalised here so routes match on one field.
    const code = payload?.error_code ?? payload?.code ?? payload?.error ?? 'auth_error'
    const message = payload?.msg ?? payload?.error_description ?? payload?.message ?? 'Authentication failed.'
    return { data: null, error: { status: response.status, code: String(code), message: String(message) } }
  }
  return { data: payload ?? {}, error: null }
}

export function passwordGrant(email, password) {
  return call('/token', { query: { grant_type: 'password' }, body: { email, password } })
}

export function refreshGrant(refreshToken) {
  return call('/token', { query: { grant_type: 'refresh_token' }, body: { refresh_token: refreshToken } })
}

export function pkceGrant(authCode, codeVerifier) {
  return call('/token', { query: { grant_type: 'pkce' }, body: { auth_code: authCode, code_verifier: codeVerifier } })
}

export function signup({ email, password, data, redirectTo }) {
  return call('/signup', {
    query: redirectTo ? { redirect_to: redirectTo } : undefined,
    body: { email, password, data },
  })
}

export function recover(email, redirectTo) {
  return call('/recover', {
    query: redirectTo ? { redirect_to: redirectTo } : undefined,
    body: { email },
  })
}

export function resend(type, email, redirectTo) {
  return call('/resend', {
    query: redirectTo ? { redirect_to: redirectTo } : undefined,
    body: { type, email },
  })
}

/** Email confirmation, recovery links and the passkey magic-link hash all land here. */
export function verify(type, tokenHash) {
  return call('/verify', { body: { type, token_hash: tokenHash } })
}

export function updateUser(accessToken, body) {
  return call('/user', { method: 'PUT', accessToken, body })
}

export function getUser(accessToken) {
  return call('/user', { method: 'GET', accessToken })
}

/** `global` ends every session for the user; `others` keeps the calling one. */
export function logout(accessToken, scope = 'global') {
  return call('/logout', { accessToken, query: { scope }, body: {} })
}

export const factors = {
  /** GoTrue reports enrolled factors on the user record; there is no list endpoint. */
  async list(accessToken) {
    const { data, error } = await getUser(accessToken)
    if (error) return { data: null, error }
    return { data: { factors: Array.isArray(data?.factors) ? data.factors : [] }, error: null }
  },
  enroll(accessToken, { friendlyName } = {}) {
    return call('/factors', {
      accessToken,
      body: { factor_type: 'totp', friendly_name: friendlyName || undefined },
    })
  },
  challenge(accessToken, factorId) {
    return call(`/factors/${encodeURIComponent(factorId)}/challenge`, { accessToken, body: {} })
  },
  verify(accessToken, factorId, { challengeId, code }) {
    return call(`/factors/${encodeURIComponent(factorId)}/verify`, {
      accessToken,
      body: { challenge_id: challengeId, code },
    })
  },
  unenroll(accessToken, factorId) {
    return call(`/factors/${encodeURIComponent(factorId)}`, { method: 'DELETE', accessToken })
  },
}

/** Whether an account holds a factor it has finished enrolling. */
export function hasVerifiedTotp(user) {
  return Array.isArray(user?.factors)
    && user.factors.some((factor) => factor?.status === 'verified' && (factor?.factor_type ?? 'totp') === 'totp')
}

/**
 * The `aal` claim, read without verifying the signature.
 *
 * This token arrived from GoTrue over TLS moments ago and is on its way back to
 * GoTrue; verifying it here would be verifying our own courier. Anything the
 * *client* presents goes through `supabaseIdentity`, which does verify.
 */
export function tokenAal(accessToken) {
  try {
    const payload = JSON.parse(Buffer.from(String(accessToken).split('.')[1], 'base64url').toString('utf8'))
    return payload?.aal === 'aal2' ? 'aal2' : 'aal1'
  } catch {
    return 'aal1'
  }
}

/** GoTrue answers `expires_in` (seconds) and sometimes `expires_at` (epoch seconds). */
export function expiryFrom(grant, now = Date.now()) {
  if (Number.isFinite(grant?.expires_at)) return new Date(grant.expires_at * 1000)
  const seconds = Number(grant?.expires_in)
  return new Date(now + (Number.isFinite(seconds) ? seconds : 3600) * 1000)
}
