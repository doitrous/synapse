import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import fs from 'node:fs'
import zlib from 'node:zlib'

/**
 * Writes dist/sw-assets.json: the hashed build files public/sw.js precaches
 * as the offline app shell, plus a build id (`version`) it uses to name its
 * cache — so a new deploy's service worker drops the previous deploy's
 * cached assets instead of serving them forever. See public/sw.js.
 */
function swAssetManifest(): Plugin {
  const version = String(Date.now())
  return {
    name: 'sw-asset-manifest',
    generateBundle(_options, bundle) {
      // The app *shell* only: every entry chunk, whatever it statically imports
      // (transitively), the CSS and assets those chunks pull in, and the fonts.
      // Not the lazy route chunks — listing every file precached the whole
      // build (~32 MB, admin pages included) onto each student's phone on first
      // visit. Route chunks are hashed and immutable, so the worker caches them
      // the first time they are actually fetched instead.
      // A font the app declares but first paint never needs, so it should not be
      // precached — it is fetched on demand instead, if a glyph ever calls for
      // it. Two kinds: the `.woff` fallbacks (every browser in the support floor
      // has woff2, so the .woff files double the font weight for nothing), and
      // the Cyrillic / Greek / Vietnamese / Devanagari subsets (the last a 112 KB
      // Baloo face) — this content is Latin and Arabic, and each subset's
      // unicode-range keeps the browser from requesting the others anyway. They
      // reach the graph through the entry CSS's imported assets, so the skip has
      // to live in `visit`, not only in the explicit font pass below.
      const skipPrecache = (name: string) =>
        /\.woff$/.test(name) || /-(?:cyrillic|cyrillic-ext|greek|vietnamese|devanagari)-.*\.woff2?$/.test(name)
      const files = new Set<string>()
      const visit = (name: string) => {
        if (files.has(name) || skipPrecache(name)) return
        const file = bundle[name]
        if (!file) return
        files.add(name)
        if (file.type === 'chunk') {
          file.imports.forEach(visit)
          const meta = (file as { viteMetadata?: { importedCss?: Set<string>; importedAssets?: Set<string> } }).viteMetadata
          meta?.importedCss?.forEach(visit)
          meta?.importedAssets?.forEach(visit)
        }
      }
      for (const file of Object.values(bundle)) {
        if (file.type === 'chunk' && file.isEntry) visit(file.fileName)
        if (file.type === 'asset' && /\.woff2$/.test(file.fileName) && !skipPrecache(file.fileName)) files.add(file.fileName)
      }
      const urls = [...files].filter((name) => name.startsWith('assets/')).sort().map((name) => `/${name}`)
      this.emitFile({ type: 'asset', fileName: 'sw-assets.json', source: JSON.stringify({ version, urls }) })
    },
  }
}

/**
 * Injects a `<link rel="preload">` for the font(s) first paint actually uses
 * into each built entry document, so the browser starts fetching the UI font
 * while it is still parsing the head instead of only after the entry CSS
 * resolves. Discovered late (via the entry CSS's @font-face), the UI font
 * otherwise lands on the critical path behind JS and delays FCP/LCP.
 *
 * Only the faces first paint uses are preloaded — preloading a font the first
 * screen never renders would just contend with the LCP resource for bandwidth:
 *   - Figtree (Latin) is `--font-sans`, the body/UI font on every screen, so it
 *     is preloaded on all three entries.
 *   - IBM Plex Sans Arabic (400) carries the Arabic script that dominates the
 *     Arabic entry's first paint, so it is preloaded on `ar/index.html` only.
 * Baloo (logotype only, see src/main.tsx) and Source Serif (headings only) are
 * deliberately left out. `crossorigin` is required even though the fonts are
 * same-origin: font fetches are always anonymous-CORS, and without it the
 * preload misses the cache and the browser downloads the font twice.
 */
function preloadFonts(): Plugin {
  let base = '/'
  // Fontsource emits `<family>-<subset>-<axis-or-weight>-<style>-<hash>.woff2`
  // — the same naming the skipPrecache pass above keys on. Match the *base*
  // Latin subset, not `latin-ext`, and the woff2 (not the .woff fallback).
  const FIGTREE_LATIN = /(?:^|\/)figtree-latin-wght-normal-[^/]*\.woff2$/
  const PLEX_ARABIC_400 = /(?:^|\/)ibm-plex-sans-arabic-arabic-400-normal-[^/]*\.woff2$/
  return {
    name: 'preload-fonts',
    configResolved(config) {
      base = config.base
    },
    // transformIndexHtml at the output stage receives the final bundle (so the
    // hashed font names are known) and lets Vite inject the tags itself — a
    // generateBundle mutation of the HTML source is overwritten by Vite's own
    // HTML emission, so the injection has to go through this hook.
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        if (!ctx.bundle) return
        const findFont = (re: RegExp) => Object.keys(ctx.bundle!).find((name) => re.test(name))
        const figtree = findFont(FIGTREE_LATIN)
        const plexArabic = findFont(PLEX_ARABIC_400)
        const isArabic = ctx.filename.endsWith('ar/index.html') || ctx.path === '/ar/index.html'
        const fonts = [figtree]
        if (isArabic) fonts.push(plexArabic)
        if (!figtree) this.warn(`preload-fonts: Figtree Latin woff2 not found in bundle; ${ctx.path} will not preload the UI font`)
        if (isArabic && !plexArabic) this.warn('preload-fonts: IBM Plex Sans Arabic 400 woff2 not found in bundle; the Arabic entry will not preload its font')
        return fonts.filter((f): f is string => Boolean(f)).map((fileName) => ({
          tag: 'link',
          attrs: { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: true, href: `${base}${fileName}` },
          injectTo: 'head' as const,
        }))
      },
    },
  }
}

/**
 * Emits a Brotli-compressed `.br` sibling next to every compressible text asset
 * in the build. The server serves these directly (see server/src/index.js)
 * rather than re-compressing each response at runtime: paying the cost once at
 * build time, at Brotli's maximum quality, is both cheaper per request and
 * smaller on the wire than the runtime gzip it replaces for static assets.
 *
 * Already-compressed binaries (woff2, images, wasm) are skipped — they do not
 * shrink, so a `.br` would only cost an extra request. Brotli only, no gzip: the
 * build target floor (iOS 15.4+ / Chrome 90+) supports Brotli over HTTPS
 * everywhere, so a gzip sibling would be dead weight.
 */
function precompressAssets(): Plugin {
  const compressible = /\.(?:js|mjs|css|html|svg|json|webmanifest)$/
  return {
    name: 'precompress-assets',
    // writeBundle runs after generateBundle (where the HTML is rewritten) and
    // after every file is on disk, so the `.br` reflects the final bytes.
    writeBundle(options, bundle) {
      const dir = options.dir
      if (!dir) return
      for (const [fileName, file] of Object.entries(bundle)) {
        if (!compressible.test(fileName)) continue
        const source = file.type === 'chunk' ? file.code : file.source
        const input = typeof source === 'string' ? Buffer.from(source) : Buffer.from(source as Uint8Array)
        const compressed = zlib.brotliCompressSync(input, {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
            [zlib.constants.BROTLI_PARAM_SIZE_HINT]: input.length,
          },
        })
        // A `.br` no smaller than the original would only cost an extra request
        // for no saving — skip it and let the server serve the plain file.
        if (compressed.length >= input.length) continue
        fs.writeFileSync(path.join(dir, `${fileName}.br`), compressed)
      }
    },
  }
}

/**
 * Where `node_modules` really lives. A git worktree borrows the main
 * checkout's dependencies through a symlink, and Vite's dev server refuses to
 * serve files (fonts, most visibly) from outside the project root unless the
 * real location is allowed explicitly.
 */
function realNodeModules(): string {
  try {
    return fs.realpathSync(path.resolve(import.meta.dirname, 'node_modules'))
  } catch {
    return path.resolve(import.meta.dirname, 'node_modules')
  }
}

// https://vite.dev/config/
export default defineConfig({
  // Normally the app is served from the origin root. A preview host can mount
  // a build under a path (`VITE_BASE_PATH=/some-preview/`); the router reads
  // the same value back through `import.meta.env.BASE_URL`.
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), tailwindcss(), swAssetManifest(), preloadFonts(), precompressAssets()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  // Multi-page: localized entry HTML so /en and /ar ship their own crawler
  // meta (Open Graph / hreflang). All three boot the same SPA.
  build: {
    // Floor: iOS 15.4+ / Android Chrome 90+ (see src/lib/polyfills.ts for the
    // one runtime gap that floor leaves — structuredClone).
    target: ['es2020', 'safari15', 'chrome90', 'firefox90'],
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, 'index.html'),
        en: path.resolve(import.meta.dirname, 'en/index.html'),
        ar: path.resolve(import.meta.dirname, 'ar/index.html'),
      },
      output: {
        // Dependencies change far less often than the product does. Splitting
        // them out means a deploy that touches only our code leaves these
        // cached, instead of re-downloading React and the icon set every time.
        //
        // rolldown's `advancedChunks`, not a `manualChunks` function: the
        // function form co-located React's core (`react/index`) with its lucide
        // importer in the `icons` chunk regardless of what it returned, which
        // dragged that 87KB chunk into every page's eager load (React is needed
        // at boot). `advancedChunks` places a matched module deterministically
        // and shares it, so React stays in `react` and `icons` holds only glyphs
        // — and so loads lazily, with the pages that actually draw them.
        advancedChunks: {
          groups: [
            { name: 'react', test: /node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\// },
            { name: 'icons', test: /node_modules\/lucide-react\// },
          ],
        },
      },
    },
  },
  // Honor the port assigned by the harness (PORT env) so autoPort works;
  // falls back to Vite's default when run directly.
  server: {
    port: Number(process.env.PORT) || 5173,
    // The session is an HttpOnly cookie the API sets, so development has to be
    // same-origin with the API exactly as production is (one Express app serves
    // both). `changeOrigin: false` keeps the Host header, which is what lets the
    // server issue the cookie for the hostname the browser actually used.
    proxy: {
      '/api': { target: 'http://127.0.0.1:8080', changeOrigin: false },
    },
    fs: {
      allow: [import.meta.dirname, realNodeModules()],
    },
  },
})
