/**
 * The Nishany API: configuration, the middleware stack, and the order every
 * route group is mounted in.
 *
 * There is no routing logic below — each group lives in `routes/`, and each
 * of those is a thin HTTP shell over a sibling module that owns the decisions.
 * What this file still owns is the two things that are only true of the whole
 * app: the exact order the middleware runs in, and the exact order the groups
 * are registered in (Express matches first-registered-first, so the guards,
 * the `/api/state/manifest`-before-`/api/state/:key` pairing, and the SPA
 * catch-all all depend on it).
 */
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import express from 'express'
import compression from 'compression'
import { resolveSeo } from '@omary98/seo-runtime-core'
import { injectHead } from '@omary98/seo-runtime-express'
import cors from 'cors'
import { pool, migrate } from './db.js'
import { apiAuthGate, identityFromCookieHeader, identityFromToken } from './auth.js'
import { securityHeaders } from './securityHeaders.js'
import { ApiError } from './apiError.js'
import { logServerError } from './http.js'
import { sendMail } from './mail.js'
import { medicalResourceRecords } from './mediaStore.js'
import { sweepIdle } from './sessionStore.js'
import { attachRoomsRealtime } from './roomsRealtime.js'
import { areBlocked } from './blocks.js'
import { loadSfu } from './roomsSfu.js'
import { resolvePartyId, roomSnapshot } from './parties.js'
import { setMailer } from './qotdReminderEmail.js'
import { startQotdReminderScheduler } from './qotdReminders.js'
import { registerContentRoutes } from './studentContent.js'
import { registerAdminContentRoutes } from './adminContent.js'
import { registerAdaptivePoolRoutes } from './adaptivePool.js'
import { registerAdminConceptRoutes } from './adminConcept.js'
import { registerPublicRoutes } from './routes/public.js'
import { registerSeo, store } from './seo.js'
import { injectBodyExtras, rawTitleOverride, shellBodyExtras, shellHead, withShellFallback } from './seoShell.js'
import { isKnownSpaPath } from './spaRoutes.js'
import { registerAuthRoutes } from './routes/auth.js'
import { registerAssistantRoutes, registerEssayRoutes } from './routes/assistant.js'
import { registerMeRoutes } from './routes/me.js'
import { registerDocumentRoutes } from './routes/documents.js'
import { registerShareRoutes } from './routes/shares.js'
import { registerPricingRoutes } from './routes/pricing.js'
import { registerQbankRoutes } from './routes/qbank.js'
import { registerQotdRoutes } from './routes/qotd.js'
import { registerMaristanaRoutes } from './routes/maristanas.js'
import { registerStudyRoomRoutes } from './routes/studyRooms.js'
import { registerPartyRoutes } from './routes/parties.js'
import { registerChallengeRoutes } from './routes/challenges.js'
import { registerFriendRoutes } from './routes/friends.js'
import { registerDeviceRoutes } from './routes/devices.js'
import { registerStateDocumentRoutes, registerStateManifestRoutes } from './routes/state.js'
import { registerContentArchiveRoutes } from './routes/contentArchive.js'
import { registerContentReportRoutes } from './routes/contentReports.js'
import { registerUserStateRoutes } from './routes/userState.js'
import { registerMailRoutes, registerUnsubscribeRoutes } from './routes/mail.js'
import { registerAdminRoutes, registerStudentRoutes } from './routes/admin.js'
import { createDataSnapshot, registerBackupWriteRoutes, registerLibraryRoutes } from './routes/library.js'
import { registerMediaRoutes } from './routes/media.js'
import { registerMcqValidationRoutes } from './routes/mcqValidation.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
app.disable('x-powered-by')
// One proxy in front (Coolify). Without this every rate limit is charged to the
// proxy's address, which means one abusive client locks out everybody.
app.set('trust proxy', 1)
// A separate constant from the static-file PUBLIC_DIR below: this one only
// needs to exist early enough to hash the built index.html's inline theme
// script for CSP, before the SPA is ever wired up.
// The seo-hub receiver (@omary98/seo-runtime-express): POST /api/articles, POST/GET /api/seo/*,
// GET /sitemap.xml and /robots.txt, plus its redirect middleware — registered before EVERY other
// middleware (body parser, session, auth, static/catch-all), because its redirect check and its
// own 2 MB-capped body reader must run ahead of the rest of this stack, not behind it.
registerSeo(app)
const SECURITY_HEADERS_PUBLIC_DIR = process.env.PUBLIC_DIR || join(__dirname, '..', 'public')
app.use(securityHeaders({ publicDir: SECURITY_HEADERS_PUBLIC_DIR }))
/**
 * Compress responses.
 *
 * The catalogue documents are the reason this is here. `app_state` holds whole
 * JSON trees — the content ledger, a taxonomy of some 1,800 nodes, a concept
 * graph of similar size — and every read returns one entire document, because
 * there is no per-item route to ask for less. Uncompressed that is megabytes
 * over a phone connection for a student opening the library on a ward.
 *
 * JSON of this shape compresses by roughly an order of magnitude, so this is
 * the cheapest bandwidth win available and it costs the API almost nothing.
 * Placed before every route so it covers the SPA assets too.
 */
app.use(compression())
// Never `true` (reflects any Origin back) — an explicit allowlist, env-overridable
// for staging. `credentials` stays unset: the API is bearer/cookie-gated by
// apiAuthGate, not by browser-sent cookies read cross-origin.
const CORS_ORIGIN = process.env.CORS_ORIGIN?.split(',') ?? ['https://nishany.com', 'https://connectadminacademy.nishany.com']
app.use(cors({ origin: CORS_ORIGIN }))
// The student site moved to nishany.com. Old links, bookmarks, and search
// results still name synapse.doitrous.com, so its page requests are redirected
// permanently. /api is exempt on purpose: the installed iOS and Android builds
// have the old host compiled in as their API base and must keep working
// without an app update — and only GETs move, so nothing mid-POST is dropped.
// The Host header is read directly rather than via req.hostname because
// `req.hostname` also strips the port, which this comparison does not need —
// `trust proxy` above is what makes it trustworthy behind Coolify.
const LEGACY_STUDENT_HOSTS = new Set(['synapse.doitrous.com', 'www.synapse.doitrous.com', 'www.nishany.com'])
app.use((req, res, next) => {
  const host = String(req.headers.host || '').toLowerCase().split(':')[0]
  if (!LEGACY_STUDENT_HOSTS.has(host) || req.method !== 'GET' || req.path.startsWith('/api')) return next()
  res.redirect(301, `https://nishany.com${req.originalUrl}`)
})
app.use(apiAuthGate)
/**
 * A few routes save a whole shared document rather than one field. The
 * question ledger alone is ~23 MB and growing, so 25 MB was one import away
 * from rejecting every save with 413. `limit` is checked against the
 * DECOMPRESSED body, so it must exceed the raw document size even though
 * clients now gzip it on the wire (body-parser inflates gzip automatically).
 * 64 MB is headroom. Mounted only on these paths, and BEFORE the 1 MB default
 * below: body-parser marks a request's body as already parsed once one of
 * these has run, so the smaller parser after it just passes through instead
 * of re-enforcing 1 MB — mounting them in the other order would make this
 * limit dead code.
 */
const LARGE_JSON_BODY = express.json({ limit: '64mb' })
for (const path of ['/api/state/:key', '/api/user-state/:key', '/api/admin/academic/preview', '/api/admin/academic/publish']) {
  app.use(path, LARGE_JSON_BODY)
}
// Validator evidence is a base64-encoded file with a 5 MB decoded ceiling.
// Base64 adds roughly one third, so 8 MB leaves room for the metadata envelope.
app.use('/api/mcq-validator/sources', express.json({ limit: '8mb' }))
// Everything else defaults to a small body. `apiAuthGate` above never reads
// `req.body` (headers and path/method only), so parsing after it is safe and
// means an unauthenticated caller can't run a 1 MB parse before being refused.
app.use(express.json({
  limit: '1mb',
  verify: (req, _res, buffer) => {
    if (req.originalUrl === '/api/webhooks/resend/inbound') req.rawBody = buffer.toString('utf8')
  },
}))

/*
 * Every route group, in the order Express must see them.
 *
 * The order is not cosmetic. `/api/state/manifest` must be registered before
 * `/api/state/:key` or it becomes a read of a document called "manifest";
 * `registerAdminRoutes` opens with the `/api/students` and `/api/mail` tab
 * guards, so it has to come before the routes those guards protect; and
 * `/api/unsubscribe` is deliberately mounted ahead of them, because the reader
 * of an unsubscribe link is signed out.
 */
registerPublicRoutes(app)
registerAuthRoutes(app)
registerEssayRoutes(app)
registerMeRoutes(app)
registerDocumentRoutes(app)
registerShareRoutes(app)
registerPricingRoutes(app)
registerQbankRoutes(app)
registerQotdRoutes(app)
registerMaristanaRoutes(app)
registerStudyRoomRoutes(app)
registerPartyRoutes(app)
registerChallengeRoutes(app)
registerFriendRoutes(app)
registerDeviceRoutes(app)
registerStateManifestRoutes(app)
registerContentArchiveRoutes(app)
registerStateDocumentRoutes(app)
/**
 * The student's sliced view of the content ledger — summary, kind slices, the
 * article index, scoped questions and one item at a time. Routes and cache live
 * in `studentContent.js`; this is only where they are mounted.
 */
registerContentRoutes(app)
registerAdminContentRoutes(app)
registerAdaptivePoolRoutes(app)
registerAdminConceptRoutes(app)
registerContentReportRoutes(app)
registerMcqValidationRoutes(app)
registerUserStateRoutes(app)
registerUnsubscribeRoutes(app)
registerAdminRoutes(app)
registerLibraryRoutes(app)
registerMediaRoutes(app)
registerBackupWriteRoutes(app)
registerStudentRoutes(app)
registerMailRoutes(app)
registerAssistantRoutes(app)

/* ── Serve the built SPA (single-origin deploy) ──────────────────────────────
 * If a ../public folder exists (the Vite build, copied in by the Dockerfile),
 * serve it and fall back to index.html for client-side routes. When it's absent
 * (API-only deploy), these are no-ops. */
/** Locales built as their own entry document — one per extra `input` in
 *  `vite.config.ts`. Adding one there means adding it here. */
const LOCALE_ENTRY_PATHS = ['en', 'ar']

const PUBLIC_DIR = process.env.PUBLIC_DIR || join(__dirname, '..', 'public')
if (existsSync(join(PUBLIC_DIR, 'index.html'))) {
  /* The localized entry documents, matched before anything else touches them.
   *
   * `/en` and `/ar` are real HTML files, built as separate Vite inputs, because
   * a link crawler runs no JavaScript: WhatsApp, iMessage, Slack and Google see
   * only what is in the document they are served. Their Open Graph card, their
   * `lang`/`dir`, and their canonical URL therefore have to be in the file, and
   * cannot be set by the SPA after it mounts.
   *
   * They must be matched here, above the static middleware, because that
   * middleware would otherwise see `public/ar` as a directory and 301 `/ar` to
   * `/ar/` — and then, with directory indexes off, decline to serve it and drop
   * it into the catch-all below, which sends the English root document. That is
   * what shipped: every crawler asking for the Arabic page was handed the
   * English one, with the wrong card and a canonical pointing at `/`.
   *
   * Never cached, exactly like the root document: these are the files a deploy
   * needs to be able to change.
   *
   * (`nginx.conf` used to carry this as `location = /en` blocks. It was never
   * copied into the image by the Dockerfile — the production container is this
   * server, not nginx — so it never ran. It has been deleted rather than left
   * to describe routing that does not happen.)
   */
  for (const locale of LOCALE_ENTRY_PATHS) {
    const document = join(PUBLIC_DIR, locale, 'index.html')
    if (!existsSync(document)) continue
    // Head tags come from the hub now, not only from what Vite baked in at build time: the hub
    // owns title/description/canonical/alternates/robots/OG/JSON-LD for `page:home:{lang}`
    // (seo.js's `pages()`), and injectHead splices those into this static shell server-side —
    // before the crawler ever sees the response — same reason these are static per-locale
    // documents rather than the SPA's client-side-only routes: a crawler running no JavaScript
    // never sees anything the SPA sets after it mounts.
    app.get([`/${locale}`, `/${locale}/`], async (_req, res, next) => {
      try {
        res.setHeader('Cache-Control', 'no-cache')
        const [html, seo] = await Promise.all([readFile(document, 'utf8'), resolveSeo(store, `/${locale}`, locale)])
        // composeSeo templates a fallback *title* when the hub page has none, but leaves
        // `description` as '' — the runtime never templates one (CONTRACT.md). injectHead
        // strips whatever <title>/description tag is already in `html` unconditionally, so
        // neither of composeSeo's composed values can be fed to it as-is: an empty resolved
        // description must fall back to this shell's own baked-in description, and — worse,
        // since composeSeo's title is almost never really empty — only a real raw `seoTitle`
        // override (read straight from the store, bypassing the template) may replace the
        // shell's own baked-in title. See seoShell.js for the exact mechanism.
        const rawTitle = await rawTitleOverride(store, `/${locale}`, locale)
        const finalSeo = withShellFallback(seo, shellHead(html), rawTitle)
        // Share block (01-site-setup.md §5) + footer Popular-searches/Help/Editorial links
        // (10-internal-linking-menu-footer.md), server-rendered into this prerendered shell so
        // they exist for a crawler that never runs the SPA's own JS. See seoShell.js.
        const withExtras = injectBodyExtras(html, shellBodyExtras(finalSeo, locale))
        res.type('html').send(injectHead(withExtras, finalSeo))
      } catch (e) { next(e) }
    })
  }

  app.use('/assets', express.static(join(PUBLIC_DIR, 'assets'), { index: false, maxAge: '1y', immutable: true }))
  app.use(express.static(PUBLIC_DIR, {
    index: false,
    maxAge: '1h',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache')
    },
  }))
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    // Every path the client router actually owns (react-router's own top-level `path:` entries in
    // src/router.tsx), so a crawler asking for something outside that set gets a real 404 instead
    // of the 200 soft-404 this used to send for every unknown path — the same document either way
    // (the SPA renders its own `NotFound` page client-side), only the status code differs.
    res.status(isKnownSpaPath(req.path) ? 200 : 404).sendFile(join(PUBLIC_DIR, 'index.html'))
  })
  console.log('Serving SPA from', PUBLIC_DIR)
}

/**
 * The terminal handler. Reached only when something upstream called
 * `next(err)` instead of handling its own error — body-parser rejecting an
 * oversized or malformed body being the main case, since every route itself
 * goes through `wrap` (see http.js), which never lets an error fall through
 * to here. Same rule as `wrap`: never echo `err.message` to the caller.
 */
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err)
  if (err?.type === 'entity.too.large' || err?.status === 413) {
    return res.status(413).json({ error: 'payload_too_large' })
  }
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'bad_json' })
  }
  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: err.code, message: err.publicMessage })
  }
  logServerError(req.originalUrl, err)
  res.status(500).json({ error: 'internal' })
})

const port = Number(process.env.PORT) || 8080
migrate()
  .catch((error) => {
    // A forward migration can fail for reasons that do not make the already
    // applied schema unusable (for example a DDL permission or compatibility
    // problem). Taking the whole site down in that case turns one unavailable
    // feature into a restart loop for every user. Keep serving the last known
    // schema and leave a precise error for the deployment operator to fix.
    const detail = error?.sqlMessage || error?.message || String(error)
    const code = error?.code ? ` (${error.code})` : ''
    console.error(`Database migration failed${code}; starting with the previously applied schema:`, detail)
  })
  .then(async () => {
    const httpServer = app.listen(port, () => {
      console.log(`Nishany on :${port}`)
      void medicalResourceRecords()
        .then((resources) => console.log(`Medical resource index ready (${resources.length} records)`))
        .catch((error) => console.error('Medical resource index warm-up failed:', error.message))
    })

    // The study-room signalling channel shares this HTTP server rather than
    // binding a second port: one origin, one TLS certificate, one thing for
    // Coolify to route. Attached after `listen` and never awaited into the boot
    // path — a host that cannot run the SFU still serves the whole product, and
    // the room says voice is unavailable rather than the process failing to
    // start. See docs/rooms-voice.md.
    // Sessions nobody can present any more. Hourly, unref'd so it never holds
    // the process open, and failure is logged rather than fatal.
    setInterval(() => { void sweepIdle().catch((error) => console.error('session sweep failed:', error.message)) }, 3_600_000).unref()

    void attachRoomsRealtime(httpServer, {
      identityFromToken,
      // The web client has no bearer token to offer as a subprotocol any more.
      identityFromCookies: identityFromCookieHeader,
      resolveRoom: resolvePartyId,
      readRoom: roomSnapshot,
      loadSfu,
      areBlocked,
    })
      .then((realtime) => {
        if (!realtime) return
        console.log(
          realtime.sfu.available
            ? `Study room signalling ready, voice ready (${realtime.sfu.describe?.() ?? 'no config'})`
            : `Study room signalling ready, voice unavailable (${realtime.sfu.reason})`,
        )
      })
      .catch((error) => console.error('Study room signalling failed to attach:', error.message))
    setMailer(sendMail) // inject the email sender the reminder dispatcher uses
    startQotdReminderScheduler()
    // Recovery-point creation must never prevent the HTTP server from coming
    // online, or even delay it — this used to sit on the boot path, awaited
    // inside the same chain that gates `app.listen`'s readiness. Deferred
    // a minute past listen instead, and unref'd so it never holds the process
    // open. A backup failure is reported for operators but is non-fatal.
    setTimeout(() => {
      void (async () => {
        try {
          const [recent] = await pool.query(
            "SELECT id FROM data_snapshots WHERE created_at >= NOW() - INTERVAL 24 HOUR AND created_by = 'system:daily' LIMIT 1",
          )
          if (!recent.length) await createDataSnapshot(`Daily recovery point ${new Date().toISOString()}`, 'system:daily')
        } catch (error) {
          console.error('Daily recovery snapshot skipped:', error.message)
        }
      })()
    }, 60_000).unref()
  })
  .catch((e) => { console.error('startup failed:', e.message); process.exit(1) })
