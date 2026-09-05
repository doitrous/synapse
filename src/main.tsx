import './lib/polyfills'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { I18nProvider } from './lib/i18n'
import { ThemeProvider } from './lib/useTheme'
import { IdentityProvider } from './lib/useIdentity'
import { ErrorBoundary } from './components/shell/ErrorBoundary'
import { isAdminHost } from './lib/portalHost'
import { API_MODE } from './lib/api'

// Self-hosted variable fonts (Fontsource) — offline, no external requests.
// Baloo 2 / Baloo Bhaijaan 2 are the logotype's own rounded display faces:
// brand lockups only, never UI.
import '@fontsource-variable/source-serif-4'
import '@fontsource-variable/figtree'
import '@fontsource/ibm-plex-sans-arabic/400.css'
import '@fontsource/ibm-plex-sans-arabic/500.css'
import '@fontsource/ibm-plex-sans-arabic/600.css'
import '@fontsource/ibm-plex-sans-arabic/700.css'
import '@fontsource-variable/baloo-2'
import '@fontsource-variable/baloo-bhaijaan-2'
import './index.css'

// Both domains serve one index.html, whose canonical, hreflang and Open Graph tags
// all name the student site. On the admin domain those are wrong and the pages are
// private, so the marketing head is stripped and the domain is told to stay out of
// search results.
if (isAdminHost()) {
  document.title = 'Nishany Admin'
  document.querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang], meta[property^="og:"], meta[name^="twitter:"]').forEach((tag) => tag.remove())
  const robots = document.createElement('meta')
  robots.name = 'robots'
  robots.content = 'noindex, nofollow'
  document.head.appendChild(robots)
}

// Registered once here so offline caching (public/sw.js) benefits every
// visitor, not only whoever lands on the one page that used to mount
// `useWebPush` — that hook now reuses this registration via
// `serviceWorker.ready` instead of registering a second time.
try { void navigator.serviceWorker?.register(`${import.meta.env.BASE_URL}sw.js`) } catch { /* best-effort */ }

async function startApp() {
  // Keep the local showcase populated for review without putting fixture code
  // on the live startup path or sending fixture data to a configured backend.
  // Existing browser-owned work is preserved and wins over every demo fixture.
  if (!API_MODE) {
    try {
      const { seedDemoShowcase } = await import('./data/demoPreview')
      seedDemoShowcase(window.localStorage)
    } catch { /* storage may be unavailable */ }
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ErrorBoundary>
        <ThemeProvider>
          <I18nProvider>
            <IdentityProvider>
              <RouterProvider router={router} />
            </IdentityProvider>
          </I18nProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </StrictMode>,
  )
}

void startApp()
