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
// Orbitron is the logotype's own geometric sans: brand lockups only, never UI.
import '@fontsource-variable/source-serif-4'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import '@fontsource-variable/orbitron'
import './index.css'

// Both domains serve one index.html, whose canonical, hreflang and Open Graph tags
// all name the student site. On the admin domain those are wrong and the pages are
// private, so the marketing head is stripped and the domain is told to stay out of
// search results.
if (isAdminHost()) {
  document.title = 'Maristana Admin'
  document.querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang], meta[property^="og:"], meta[name^="twitter:"]').forEach((tag) => tag.remove())
  const robots = document.createElement('meta')
  robots.name = 'robots'
  robots.content = 'noindex, nofollow'
  document.head.appendChild(robots)
}

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
