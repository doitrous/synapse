import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import fs from 'node:fs'

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
  plugins: [react(), tailwindcss(), swAssetManifest()],
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
        manualChunks: (id: string) => {
          if (!id.includes('node_modules')) return undefined
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)) return 'react'
          if (id.includes('node_modules/lucide-react/')) return 'icons'
          return undefined
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
