/**
 * What makes two sign-ups the same person, and how often one caller may ask.
 *
 * Kept apart from `accounts.js` because none of it touches the database: these
 * are rules, and rules that need a MariaDB driver loaded to be tested do not
 * get tested. `identifierTaken` reads them and runs the one query.
 */

/**
 * A phone number reduced to what makes it that number, or null if it is not one.
 *
 * This is the same algorithm as `normalisePhone` in `src/data/accountIdentity.ts`,
 * and the two are held to the same expectations by their own tests. The client
 * runs it to catch a duplicate before an account is created; this runs it to
 * decide, and the UNIQUE index behind it is what actually enforces the answer.
 */
const DEFAULT_COUNTRY = '20'

export function normalisePhone(raw) {
  if (!raw) return null
  let value = String(raw).replace(/[\s()\-.]/g, '')
  if (!value) return null
  if (value.startsWith('00')) value = `+${value.slice(2)}`
  const international = value.startsWith('+')
  const digits = international ? value.slice(1) : value
  if (!/^\d+$/.test(digits)) return null
  const full = international
    ? digits
    : digits.startsWith('0')
      ? `${DEFAULT_COUNTRY}${digits.slice(1)}`
      : digits
  if (full.length < 8 || full.length > 15) return null
  return `+${full}`
}

export function normaliseEmail(raw) {
  if (!raw) return null
  const value = String(raw).trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return null
  return value
}


/**
 * A small per-caller budget for the endpoint above.
 *
 * There is no rate limiting anywhere else on this server, and everything else
 * is behind authentication. This one is not — it has to answer before an
 * account exists — so it carries its own ceiling rather than being the one open
 * door that will answer as fast as it is asked.
 */
const SEEN = new Map()
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 20

export function withinRateLimit(key, now = Date.now()) {
  const hits = (SEEN.get(key) ?? []).filter((at) => now - at < WINDOW_MS)
  hits.push(now)
  SEEN.set(key, hits)
  // Callers come and go; without this the map is a slow leak keyed by address.
  if (SEEN.size > 5000) {
    for (const [candidate, times] of SEEN) {
      if (!times.some((at) => now - at < WINDOW_MS)) SEEN.delete(candidate)
    }
  }
  return hits.length <= MAX_PER_WINDOW
}

export function resetRateLimit() {
  SEEN.clear()
}
