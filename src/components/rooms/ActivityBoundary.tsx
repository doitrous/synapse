import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import { Panel } from '@/components/ui/Panel'

/**
 * Keeps a shared test or game failing to render from taking the whole room
 * with it.
 *
 * Study together opens over the live room; without this a throw inside the
 * session or game runner unwinds all the way to the route boundary and the
 * student loses the room to a full-screen "this screen could not be opened".
 * Here the room stays mounted underneath, the dialog shows what went wrong —
 * `error.message`, so a student reporting it can read it back to us — and one
 * button returns them to the floor. It resets when the dialog is reopened,
 * because the whole subtree unmounts with it.
 */
export class ActivityBoundary extends Component<
  { children: ReactNode; onClose: () => void; t: (s: string) => string },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null }

  static getDerivedStateFromError(error: Error): { error: Error } {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (import.meta.env.DEV) console.error('Study-together activity failed to render:', error, info.componentStack)
  }

  render(): ReactNode {
    if (!this.state.error) return this.props.children
    const { t, onClose } = this.props
    return (
      <Panel className="p-8 text-center">
        <h2 className="font-serif text-xl">{t('This activity could not open')}</h2>
        <p className="mt-2 text-[13.5px] text-ink-2">
          {t('Something in the shared test or game failed to start. Your room is still open.')}
        </p>
        <p className="mt-3 break-words font-mono text-[11px] text-ink-3">{this.state.error.message}</p>
        <Button className="mt-5" variant="secondary" onClick={onClose}>{t('Back to room')}</Button>
      </Panel>
    )
  }
}
