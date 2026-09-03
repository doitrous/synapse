/**
 * Service worker: offline app shell + web push.
 *
 * Push stays exactly as it was — two events, `push` and `notificationclick`,
 * see the handlers at the bottom.
 *
 * Everything above that is new: an installable app shell so the student app
 * still opens (to whatever was last cached) without a connection, on a ward
 * with no signal.
 *
 *   install  — reads /sw-assets.json (written by vite.config.ts's
 *              sw-asset-manifest plugin at build time) and precaches the
 *              shell: '/', '/index.html', '/manifest.webmanifest', and every
 *              hashed /assets/* file from that build.
 *   activate — deletes any previous version of that cache. The manifest's
 *              `version` (a build id) names the cache, so a new deploy never
 *              serves assets left over from the one before it.
 *   fetch    — cache-first for /assets/* (content-hashed, so a cache hit is
 *              always correct); network-first with a cached-shell fallback
 *              for page navigations; network-first with a cached-response
 *              fallback for the handful of GET /api/* routes worth reading
 *              offline. Every other /api/* request, and anything that is not
 *              a GET, is left untouched — never intercepted, never cached.
 */

const SHELL_CACHE_PREFIX = 'nishany-shell-'
const API_CACHE = 'nishany-api-v1'
const CORE_URLS = ['/', '/index.html', '/manifest.webmanifest']
const CACHEABLE_API_EXACT = ['/api/content/summary', '/api/me']
const CACHEABLE_API_PREFIX = '/api/content/items'

/** Read once per worker lifetime; falls back to an unversioned shell offline. */
let manifestPromise = null
function loadManifest() {
  manifestPromise ??= fetch('/sw-assets.json', { cache: 'no-store' })
    .then((res) => (res.ok ? res.json() : { version: 'dev', urls: [] }))
    .catch(() => ({ version: 'dev', urls: [] }))
  return manifestPromise
}

async function shellCacheName() {
  const { version } = await loadManifest()
  return `${SHELL_CACHE_PREFIX}${version}`
}

/** A response is never cached if it carries a Set-Cookie — session material
 * has no business sitting in the Cache Storage API. (In practice the Fetch
 * spec already strips Set-Cookie from script-visible headers; this is a
 * second guard, not the only one.) */
function safeToCache(response) {
  return Boolean(response) && response.ok && !response.headers.has('set-cookie')
}

function isCacheableApi(pathname) {
  return CACHEABLE_API_EXACT.includes(pathname) || pathname.startsWith(CACHEABLE_API_PREFIX)
}

async function cacheFirst(request) {
  const cache = await caches.open(await shellCacheName())
  const cached = await cache.match(request)
  if (cached) return cached
  const response = await fetch(request)
  if (safeToCache(response)) cache.put(request, response.clone())
  return response
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName)
  try {
    const response = await fetch(request)
    if (safeToCache(response)) cache.put(request, response.clone())
    return response
  } catch (error) {
    const cached = await cache.match(request)
    if (cached) return cached
    throw error
  }
}

async function navigationFirst(request) {
  const cache = await caches.open(await shellCacheName())
  try {
    return await fetch(request)
  } catch {
    return (await cache.match('/index.html')) || (await cache.match('/')) || Response.error()
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const { urls } = await loadManifest()
    const cache = await caches.open(await shellCacheName())
    // Best-effort per file: one missing asset must not fail the whole install.
    await Promise.all([...CORE_URLS, ...(urls || [])].map((url) => cache.add(url).catch(() => {})))
  })())
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const current = await shellCacheName()
    const names = await caches.keys()
    await Promise.all(
      names.filter((name) => name.startsWith(SHELL_CACHE_PREFIX) && name !== current).map((name) => caches.delete(name)),
    )
  })())
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  // Never cache non-GET, and never touch a cross-origin request.
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(cacheFirst(request))
    return
  }
  if (url.pathname.startsWith('/api/')) {
    // Everything else under /api/ is never intercepted — it goes to the
    // network exactly as if this worker were not here.
    if (isCacheableApi(url.pathname)) event.respondWith(networkFirst(request, API_CACHE))
    return
  }
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(navigationFirst(request))
  }
})

self.addEventListener('push', (event) => {
  let data = {}
  try { data = event.data ? event.data.json() : {} } catch { data = {} }

  const title = data.title || 'Question of the Day'
  event.waitUntil(
    self.registration.showNotification(title, {
      body: data.body || "Today's question is waiting.",
      icon: '/brand/nishany-mark.png',
      badge: '/favicon.png',
      data: { path: data.path || '/app/qotd' },
    }),
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const path = event.notification.data?.path || '/app/qotd'
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((wins) => {
      const existing = wins.find((w) => 'focus' in w)
      if (existing) {
        existing.focus()
        if ('navigate' in existing) existing.navigate(path)
        return undefined
      }
      return clients.openWindow(path)
    }),
  )
})
