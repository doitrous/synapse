import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { I18nProvider } from './lib/i18n'
import { IdentityProvider } from './lib/useIdentity'
import { ErrorBoundary } from './components/shell/ErrorBoundary'

// Self-hosted variable fonts (Fontsource) — offline, no external requests.
import '@fontsource-variable/source-serif-4'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <I18nProvider>
        <IdentityProvider>
          <RouterProvider router={router} />
        </IdentityProvider>
      </I18nProvider>
    </ErrorBoundary>
  </StrictMode>,
)
