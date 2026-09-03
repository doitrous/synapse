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
      const urls = Object.values(bundle)
        .filter((file) => file.fileName.startsWith('assets/'))
        .map((file) => `/${file.fileName}`)
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
