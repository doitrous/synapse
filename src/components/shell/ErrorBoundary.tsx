import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AR } from '@/data/i18n-ar'

/**
 * The recovery screen's own translate.
 *
 * This is a class component that wraps the router, so it sits outside
 * `I18nProvider` and cannot call `useT()`. `I18nProvider` stamps the active
 * language onto `<html lang>` and this screen only ever renders after the app
 * has painted at least once, so the attribute is a reliable read here — and it
 * is a read, never a write, so render stays pure.
 */
function translate(en: string): string {
  const lang = typeof document === 'undefined' ? 'en' : document.documentElement.lang
  return lang === 'ar' ? AR[en] ?? en : en
}

interface State { error: Error | null }

/**
 * Top-level error boundary so a runtime error shows a calm recovery screen
 * instead of a white page. Wraps the whole router in production.
 */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // In production this is where a monitoring hook (e.g. Sentry) would report.
    if (import.meta.env.DEV) console.error('Unhandled error:', error, info)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      // Inline styles with literal fallbacks: this screen has to render even
      // when the stylesheet is the thing that failed, so it cannot rely on a
      // token resolving. The fallbacks are the light-theme values.
      <div style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', padding: '2rem', background: 'var(--color-paper, #f5f7fb)', color: 'var(--color-ink, #161920)', fontFamily: 'Geist Variable, system-ui, sans-serif' }}>
        <div style={{ maxWidth: 460, textAlign: 'center' }}>
          {/* A glyph in a hairline tile, never a large centred pictogram — and
              never an emoji, which this system does not use anywhere. */}
          <div style={{ display: 'grid', placeItems: 'center', width: 44, height: 44, margin: '0 auto 12px', borderRadius: 12, border: '1px solid var(--color-line, #e3e7ef)', background: 'var(--color-surface-2, #eef1f7)', color: 'var(--color-ink-3, #949aa8)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.95" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </div>
          <h1 style={{ fontFamily: '"Source Serif 4 Variable", Georgia, serif', fontSize: 24, fontWeight: 560, letterSpacing: '-0.011em', margin: '0 0 8px' }}>{translate('Something went wrong')}</h1>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--color-ink-2, #5d636f)', margin: '0 0 20px' }}>
            {translate('The page hit an unexpected error. Reloading usually fixes it — your saved work is stored locally and will still be here.')}
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => window.location.reload()} style={{ borderRadius: 10, border: 'none', background: 'var(--color-primary, #d13a63)', color: 'var(--color-on-primary, #ffffff)', padding: '10px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{translate('Reload the page')}</button>
            <button onClick={() => { window.location.href = '/' }} style={{ borderRadius: 10, border: '1px solid var(--color-line-2, #ccd3e0)', background: 'transparent', color: 'inherit', padding: '10px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{translate('Go home')}</button>
          </div>
        </div>
      </div>
    )
  }
}
