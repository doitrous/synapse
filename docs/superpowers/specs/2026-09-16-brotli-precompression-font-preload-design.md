# Brotli precompression + first-paint font preload — design

**Date:** 2026-09-16
**Status:** Approved (design)

## Motivation

Cross-referencing the `jjcm/makefaster` performance-technique catalog against Nishany's
stack surfaced two high-value items not yet implemented, both safe under the
**Responsiveness doctrine** (they are first-load-only wins with no steady-state cost —
doctrine rule 6):

1. **Precompress static assets** (makefaster's largest-impact class). The server today
   only does *runtime* gzip via `compression()` middleware; it never emits brotli and
   re-gzips every text response on every request.
2. **Preload the first-paint font.** All three HTML entries (`index.html`, `en/index.html`,
   `ar/index.html`) ship with **no** `preload`/`preconnect`/`modulepreload` hints. The UI
   font is discovered late (via CSS `@import` from the entry chunk), delaying FCP/LCP.

Neither change adds an in-app network wait, and neither regresses doctrine rules 1–5.

## Part A — Brotli precompression

### Build side

New zero-dependency Vite plugin `precompressAssets()` in `vite.config.ts`, following the
existing custom-plugin style (`swAssetManifest`, `realNodeModules`).

- Hook: `writeBundle` (runs after all files are on disk).
- Walk `dist/` recursively. For every compressible text asset write a `<file>.br` sibling
  using Node's built-in `zlib.brotliCompressSync` at quality 11
  (`BROTLI_PARAM_QUALITY: 11`).
- **Compress:** `.js`, `.mjs`, `.css`, `.html`, `.svg`, `.json`, `.webmanifest`.
- **Skip:** already-compressed binaries (`.woff2`, `.woff`, `.png`, `.webp`, `.jpg`,
  `.jpeg`, `.gif`, `.ico`, `.wasm`) — recompressing them wastes bytes and build time.
- **Brotli only, no gzip.** The `build.target` support floor (iOS 15.4+ / Chrome 90+)
  supports brotli-over-HTTPS universally, so `.gz` siblings would be dead weight. Trivial
  to add later if a non-HTTPS/legacy-proxy case appears.

### Serve side

New middleware in `server/src/index.js`, mounted **before** the `/assets` static handler
(currently line 257).

- For a `GET`/`HEAD` whose `Accept-Encoding` contains `br` and whose `<resolved path>.br`
  exists on disk: serve the `.br` file with
  - `Content-Encoding: br`
  - the **original** path's `Content-Type` (resolved via the same mime lookup
    `express.static` uses, keyed off the un-suffixed path)
  - `Vary: Accept-Encoding`
  - the same cache headers the target would have received (`immutable, max-age=1y` for
    `/assets`, `no-cache` for `.html`).
- Otherwise `next()` — the existing static handlers serve the plain file unchanged.
- The existing `compression()` middleware (line 98) already skips responses that have
  `Content-Encoding` set, so it will not double-compress; it continues to gzip dynamic API
  responses exactly as today.

### Doctrine fit

Rule 6 — first-load-only win (smaller JS/CSS on the wire), zero steady-state cost, no new
in-app network wait. Transparent to the service worker (the SW caches the decoded response
body as before).

## Part B — First-paint font preload

New Vite plugin `preloadFonts()`.

- Hook: `generateBundle` (font asset hashes are known here; matches how `swAssetManifest`
  inspects the bundle).
- Locate emitted first-paint font woff2 assets by fontsource's naming convention (the same
  convention the existing `skipPrecache` regex relies on, e.g. `figtree-latin-…​.woff2`,
  `ibm-plex-sans-arabic-arabic-…​400…​.woff2`).
- Inject into the matching emitted `index.html`(s) a link of the form:
  `<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/<hashed>.woff2">`

### Which faces (trap-avoidance)

- **Figtree Variable — Latin** → all three entries (`/`, `/en`, `/ar`). It is `--font-sans`,
  the body/UI font on essentially every screen.
- **IBM Plex Sans Arabic (weight 400) — Arabic subset** → **only** `ar/index.html`, where
  Arabic script dominates first paint.
- **NOT preloaded:** Baloo 2 / Baloo Bhaijaan 2 (brand-logotype only, per the comment in
  `src/main.tsx`) and Source Serif 4 (headings only). Preloading a font first paint does not
  use is the exact regression makefaster's catalog flags ("Preload first thumbnails → grid
  slower"). Preload budget stays tight so it does not contend with the LCP resource/JS.

### Details

- `crossorigin` is **mandatory** even though fonts are same-origin: font fetches are always
  anonymous-CORS mode, and omitting it makes the preload miss the cache and double-fetch.
- **Defensive:** if an expected font asset is not found in the bundle, the plugin emits a
  build **warning** (`this.warn(...)`) rather than silently injecting nothing — so a
  fontsource rename cannot quietly disable the preload.

## Components / boundaries

| Unit | Purpose | Depends on |
|------|---------|-----------|
| `precompressAssets()` (vite.config.ts) | Emit `.br` siblings for text assets at build | `node:zlib`, `node:fs` |
| `preloadFonts()` (vite.config.ts) | Inject font preload links into entry HTML at build | Rollup bundle (generateBundle) |
| brotli-serve middleware (server/src/index.js) | Serve `.br` sibling when client accepts br | `node:fs`, existing static config |

Each is independent: the two build plugins do not interact, and the serve middleware only
depends on the `.br` files existing (degrades to plain serving if they do not).

## Verification

Dependencies are **not installed in this worktree** (`node_modules` is empty). Verification
requires an environment with deps:

1. `npm install`
2. `npm run build`
3. Confirm `.br` siblings exist for `dist/assets/*.js` and `dist/assets/*.css`, and that
   `.woff2` files have **no** `.br` sibling.
4. Confirm each built `index.html` / `en/index.html` / `ar/index.html` contains the expected
   `<link rel="preload" as="font" … crossorigin>` line(s), and that `ar/index.html` is the
   only one with the Arabic face.
5. Serve the build and `curl -H 'Accept-Encoding: br' -I <origin>/assets/<some>.js` →
   response has `Content-Encoding: br` and `Vary: Accept-Encoding`; a request without the
   header still returns the plain asset.

If the environment cannot build (deps unavailable), flag it rather than reporting success.

## Out of scope

- gzip siblings (brotli-only per support floor).
- Preconnect (fonts are self-hosted, same origin).
- Modern image formats / responsive srcset, list virtualization, worker offloading — separate
  audits raised in the review, not part of this change.
