import test from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Every API path is relative to the base, and the base already ends in `/api`.
 *
 * `VITE_API_BASE` is `/api` in the production image (see the root Dockerfile),
 * so `apiGet('/api/admin/assistant')` requests `/api/api/admin/assistant` and
 * answers 404. Nothing catches it in development: with no base configured the
 * app runs in demo mode and never calls the API at all, so the mistake only
 * appears once it is deployed.
 *
 * That is what this test is for. It reads the call sites rather than the
 * network, because the failure is a string, and a string is checkable.
 */

const CALL = /\bapi(?:Get|Put|Post|Delete|Send|Download|FetchFile|OpenFile)\s*(?:<[^>]*>)?\(\s*([`'"])([^`'"]*)\1/g

function sourceFiles(dir: string, found: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) sourceFiles(path, found)
    else if (/\.tsx?$/.test(entry) && !entry.endsWith('.test.ts')) found.push(path)
  }
  return found
}

test('no API call site repeats the /api prefix already in the base', () => {
  const offenders: string[] = []

  for (const file of sourceFiles('src')) {
    const source = readFileSync(file, 'utf8')
    for (const match of source.matchAll(CALL)) {
      const path = match[2]
      // Template literals whose first character is an interpolation come
      // through as an empty leading chunk; they carry no prefix to check.
      if (path === '') continue
      if (path.startsWith('/api/') || path === '/api') {
        offenders.push(`${file}: ${path}`)
      }
    }
  }

  assert.deepEqual(
    offenders,
    [],
    `These call sites would resolve to /api/api/… in production:\n  ${offenders.join('\n  ')}`,
  )
})

/** Express route patterns the API actually registers, e.g. `/api/me`. */
function serverRoutes(): string[] {
  const source = readFileSync(join('server', 'src', 'index.js'), 'utf8')
  const ROUTE = /\bapp\.(?:get|put|post|patch|delete)\(\s*(['"`])([^'"`]+)\1/g
  return [...source.matchAll(ROUTE)].map((match) => match[2])
}

/** Whether a concrete request path is served by a route pattern. */
function matches(pattern: string, path: string): boolean {
  const p = pattern.split('/')
  const r = path.split('/')
  if (pattern.endsWith('*')) return path.startsWith(pattern.slice(0, -1))
  if (p.length !== r.length) return false
  return p.every((segment, i) => segment.startsWith(':') || segment === r[i])
}

test('every client API path is a route the server actually registers', () => {
  // The 404 this guards against is only reachable once deployed, because
  // development runs in demo mode and never issues the request. Comparing the
  // two sides of the contract as text catches a wrong prefix, a typo and a
  // renamed route in one check.
  const routes = serverRoutes()
  assert.ok(routes.length > 20, `expected to parse many server routes, found ${routes.length}`)

  const missing: string[] = []
  for (const file of sourceFiles('src')) {
    for (const match of readFileSync(file, 'utf8').matchAll(CALL)) {
      const raw = match[2]
      if (raw === '') continue
      // Drop a query string, and stop at the first interpolation: everything
      // after it is a value, not a path segment this can check.
      const path = `/api${raw.split('?')[0].split('${')[0]}`.replace(/\/$/, '')
      if (!routes.some((route) => matches(route, path) || route.startsWith(path))) {
        missing.push(`${file}: ${raw}  →  ${path}`)
      }
    }
  }

  assert.deepEqual(missing, [], `No server route serves these:\n  ${missing.join('\n  ')}`)
})

test('the scanner actually recognises the call shapes used in this codebase', () => {
  // A guard that finds nothing is indistinguishable from a guard that works.
  // If the helpers are renamed, this fails rather than passing vacuously.
  const paths = sourceFiles('src')
    .flatMap((file) => [...readFileSync(file, 'utf8').matchAll(CALL)])
    .map((match) => match[2])

  assert.ok(paths.length > 10, `expected to find many API call sites, found ${paths.length}`)
  assert.ok(paths.includes('/me'), 'expected the known /me call site to be recognised')
})
