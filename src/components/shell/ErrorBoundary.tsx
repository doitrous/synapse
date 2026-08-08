import { Component, type ErrorInfo, type ReactNode } from 'react'

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
      <div style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', padding: '2rem', background: 'var(--color-paper, #f4f1ea)', color: 'var(--color-ink, #2b2722)', fontFamily: 'Geist Variable, system-ui, sans-serif' }}>
        <div style={{ maxWidth: 460, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⚕️</div>
          <h1 style={{ fontFamily: '"Source Serif 4 Variable", Georgia, serif', fontSize: 24, fontWeight: 600, margin: '0 0 8px' }}>Something went wrong</h1>
          <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.75, margin: '0 0 20px' }}>
            The page hit an unexpected error. Reloading usually fixes it — your saved work is stored locally and will still be here.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => window.location.reload()} style={{ borderRadius: 10, border: 'none', background: 'var(--color-accent, #b0512b)', color: '#fff', padding: '10px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Reload the page</button>
            <button onClick={() => { window.location.href = '/' }} style={{ borderRadius: 10, border: '1px solid rgba(0,0,0,0.15)', background: 'transparent', color: 'inherit', padding: '10px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Go home</button>
          </div>
        </div>
      </div>
    )
  }
}
