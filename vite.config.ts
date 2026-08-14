import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
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
  },
})
