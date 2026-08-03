import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

// Self-hosted variable fonts (Fontsource) — offline, no external requests.
import '@fontsource-variable/source-serif-4'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
