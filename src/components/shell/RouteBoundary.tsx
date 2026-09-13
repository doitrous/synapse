import { Component, type ErrorInfo, type ReactNode } from 'react'
import { RouteLoading } from './RouteLoading'
import { isChunkLoadError, shouldReloadForChunk } from '@/lib/chunkReload'

/**
 * Just this boundary's Arabic strings, inline.
 *
 * The full dictionary (~320KB) is loaded lazily by `I18nProvider`; importing it
 * here would pull it back onto the eager boot path for every visitor. It also
 * cannot be relied on here — the very failure this boundary exists to catch is a
 * chunk (the dictionary included) failing to load — so the strings it renders
 * live inline. Their canonical entries remain in `shell.ts`.
 */
const AR: Record<string, string> = {
  'Maristana has been updated': 'جرى تحديث Maristana',
  'This screen could not be opened': 'تعذّر فتح هذه الشاشة',
  'This tab was open while a new version went out, and reloading did not pick it up. Your work is saved.':
    'كان هذا التبويب مفتوحًا حين صدرت نسخة جديدة، ولم تلتقطها إعادة التحميل. وعملك محفوظ.',
  'Something in this screen failed to start. Your work is saved — nothing here writes to your record.':
    'أخفق شيء في هذه الشاشة عن العمل. وعملك محفوظ — ولا شيء هنا يكتب في سجلّك.',
  'Reload the page': 'أعد تحميل الصفحة',
}

/**
 * This boundary's own translate.
 *
 * A class component, like `ErrorBoundary`, so it cannot call `useT()`. It reads
 * the language `I18nProvider` stamps onto `<html lang>` — a read during render,
 * never a write, so render stays pure. Its keys live in `shell.ts`.
 */
function translate(en: string): string {
  const lang = typeof document === 'undefined' ? 'en' : document.documentElement.lang
  return lang === 'ar' ? AR[en] ?? en : en
}

/**
 * Catches a screen that failed to load, and recovers the ordinary cause.
 *
 * Every screen is a lazily-imported chunk, so a tab left open across a
 * deployment asks for a file the server no longer has the moment the student
 * opens a new screen. Without this the import rejects inside a `Suspense` with
 * nothing to catch it and React renders *nothing* — a blank page, no message,
 * nothing in the console worth reporting. It is indistinguishable from the app
 * being down, and the remedy the student cannot guess at is a reload.
 *
 * So a stale chunk reloads itself once, and anything else is shown as the fault
 * it is. The distinction matters: reloading on a genuine render bug would put
 * the tab in a loop, which is worse than the bug.
 */

/** Scoped per tab: two tabs recovering from the same deployment are independent. */
const ATTEMPT_KEY = 'nishany.chunkReloadAt'

function lastAttemptAt(): number | null {
  try {
    const raw = sessionStorage.getItem(ATTEMPT_KEY)
    const parsed = raw ? Number(raw) : Number.NaN
    return Number.isFinite(parsed) ? parsed : null
  } catch {
    // Private browsing. Without a record the reload below is still bounded by
    // the browser's own guard against a document reloading in a tight loop.
    return null
  }
}

function recordAttempt(at: number): void {
  try { sessionStorage.setItem(ATTEMPT_KEY, String(at)) } catch { /* nothing to do */ }
}

interface Props {
  children: ReactNode
}

interface State {
  /** Null while fine; otherwise the error, once it is known not to be recoverable. */
  error: Error | null
  /** True between deciding to reload and the reload actually happening. */
  reloading: boolean
}

export class RouteBoundary extends Component<Props, State> {
  state: State = { error: null, reloading: false }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // A stale chunk is not shown as an error at all — the reload in
    // componentDidCatch is about to replace this document.
    if (isChunkLoadError(error) && shouldReloadForChunk(lastAttemptAt(), Date.now())) {
      return { reloading: true }
    }
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (isChunkLoadError(error) && shouldReloadForChunk(lastAttemptAt(), Date.now())) {
      recordAttempt(Date.now())
      // `location.reload()` would re-request the same stale document from cache
      // in some browsers; going to the current URL afresh is what fetches the
      // new index.html, which is the thing that names the new chunks.
      window.location.replace(window.location.href)
      return
    }
    // Anything else is a real fault and should be findable, not swallowed.
    console.error('Route failed to render', error, info.componentStack)
  }

  render(): ReactNode {
    if (this.state.reloading) return <RouteLoading />

    const { error } = this.state
    if (!error) return this.props.children

    const stale = isChunkLoadError(error)
    return (
      <div className="mx-auto w-full max-w-lg px-4 py-16 text-center" role="alert">
        <h1 className="font-serif text-[22px] font-semibold text-ink">
          {stale ? translate('Maristana has been updated') : translate('This screen could not be opened')}
        </h1>
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">
          {stale
            ? translate('This tab was open while a new version went out, and reloading did not pick it up. Your work is saved.')
            : translate('Something in this screen failed to start. Your work is saved — nothing here writes to your record.')}
        </p>
        <button
          type="button"
          onClick={() => window.location.replace(window.location.href)}
          className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-primary px-4 text-[13.5px] font-semibold text-on-primary transition-colors hover:bg-primary-strong sm:min-h-9"
        >
          {translate('Reload the page')}
        </button>
        {/* The message itself, for a student who is reporting this to us. */}
        <p className="mt-4 break-words font-mono text-[11px] text-ink-3">{error.message}</p>
      </div>
    )
  }
}
