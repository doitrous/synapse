/**
 * Response headers that cost nothing and close real gaps: HSTS, framing,
 * sniffing, referrer leakage, permissions, and a Content-Security-Policy.
 *
 * No helmet — this is eight headers, not a dependency. Applied to every
 * response (HTML, API, static assets) because CSP and framing protections on
 * the API alone do nothing for the page that embeds it.
 */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Sha256 (as CSP wants it: `sha256-<base64>`) of every inline `<script>`
 * block in `html` that has no `src` attribute. Standalone and pure so the
 * extraction can be tested without a filesystem.
 */
export function inlineScriptHashes(html) {
  const hashes = []
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi
  let match
  while ((match = re.exec(String(html ?? '')))) {
    const body = match[1]
    if (!body.trim()) continue
    hashes.push(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`)
  }
  return hashes
}

const BASE_CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  // Turnstile, plus the Facebook JS SDK the friends finder loads on demand.
  'script-src': ["'self'", 'https://challenges.cloudflare.com', 'https://connect.facebook.net'],
  // Turnstile's widget, admin-pasted tutorial videos (YouTube/Vimeo embeds),
  // and the Facebook SDK's login/status frames.
  'frame-src': [
    'https://challenges.cloudflare.com',
    'https://www.youtube.com', 'https://www.youtube-nocookie.com', 'https://player.vimeo.com',
    'https://www.facebook.com', 'https://web.facebook.com',
  ],
  'connect-src': ["'self'", 'https://*.supabase.co', 'wss:', 'https://challenges.cloudflare.com', 'https://graph.facebook.com', 'https://www.facebook.com'],
  'img-src': ["'self'", 'data:', 'blob:', 'https:'],
  'media-src': ["'self'", 'blob:', 'https:'],
  'style-src': ["'self'", "'unsafe-inline'"],
  'font-src': ["'self'", 'data:'],
  'worker-src': ["'self'", 'blob:'],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
}

/** The policy string, with the built page's own inline script hashes allow-listed. */
export function buildCsp(scriptHashes = []) {
  const directives = { ...BASE_CSP_DIRECTIVES, 'script-src': [...BASE_CSP_DIRECTIVES['script-src'], ...scriptHashes] }
  return Object.entries(directives).map(([name, values]) => `${name} ${values.join(' ')}`).join('; ')
}

/**
 * Reads the built `index.html` once, at boot, so the pre-paint theme script
 * (see index.html — sets the theme before first render, avoiding a flash) can
 * be allow-listed by hash instead of loosening script-src with
 * 'unsafe-inline'. Missing on purpose in dev/test, where nothing has been
 * built yet: the policy just carries no extra hash then.
 */
function scriptHashesFromBuiltIndex(publicDir) {
  if (!publicDir) return []
  try {
    return inlineScriptHashes(readFileSync(join(publicDir, 'index.html'), 'utf8'))
  } catch {
    return []
  }
}

/**
 * Build the middleware. The policy is enforced unless `CSP_ENFORCE=0`, which
 * ships it as Content-Security-Policy-Report-Only instead — the escape hatch
 * for watching a new third party in production before it is allow-listed.
 * (It ran report-only through the two-host browser pass with no violations
 * once the inline-script hash was quoted.)
 */
export function securityHeaders({ publicDir, enforce = process.env.CSP_ENFORCE !== '0' } = {}) {
  const csp = buildCsp(scriptHashesFromBuiltIndex(publicDir))
  const cspHeader = enforce ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only'
  return function securityHeadersMiddleware(_req, res, next) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    res.setHeader('X-Frame-Options', 'DENY')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(self), geolocation=(), payment=()')
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
    res.setHeader(cspHeader, csp)
    next()
  }
}
