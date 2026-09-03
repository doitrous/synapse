import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import fs from 'node:fs'

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

// Read rather than `import … with { type: 'json' }`: this file is checked
// against tsconfig.node.json, which has no JSON module support configured,
// and one field does not need it.
const appVersion = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, 'package.json'), 'utf8')).version as string

// https://vite.dev/config/
export default defineConfig({
  // Normally the app is served from the origin root. A preview host can mount
  // a build under a path (`VITE_BASE_PATH=/some-preview/`); the router reads
  // the same value back through `import.meta.env.BASE_URL`.
  base: process.env.VITE_BASE_PATH || '/',
  // The version shown on Account → Security → Legal & about. Baked in at
  // build time from package.json, the same way `VITE_API_BASE` is read
  // everywhere else, so no separate env var has to be kept in sync per deploy.
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(appVersion),
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  // Multi-page: localized entry HTML so /en and /ar ship their own crawler
  // meta (Open Graph / hreflang). All three boot the same SPA.
  build: {
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
    fs: {
      allow: [import.meta.dirname, realNodeModules()],
    },
  },
})
