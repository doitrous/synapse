import { BookOpen, CircleAlert, WifiOff } from 'lucide-react'
import { EmptyState } from './EmptyState'
import { Button } from './Button'
import { NishanyLoader } from './NishanyLoader'
import { useT } from '@/lib/i18n'
import { useOnlineStatus } from '@/lib/useOnlineStatus'
import type { CatalogueAvailability } from '@/lib/catalogueAvailability'
import type { StateErrorKind } from '@/lib/apiErrors'

/**
 * Why a student surface has nothing to show.
 *
 * Live mode drops the seeded demo content and builds every catalogue from
 * published records alone, so an unreachable server, a catalogue that was never
 * loaded, and a genuinely unpublished catalogue all arrive as an empty array.
 * Rendering the same blank page for all three is what made a failed load
 * indistinguishable from an empty one — on the library, the question bank and
 * the practical list alike, which is why this lives here rather than in one page.
 *
 * The loading and failure copy is shared; only the empty case knows what kind
 * of thing is missing.
 */
export function CatalogueUnavailable({
  availability,
  empty,
}: {
  availability: CatalogueAvailability
  empty: { title: string; description: string }
}) {
  const t = useT()
  const online = useOnlineStatus()

  if (availability.kind === 'loading') {
    // An EmptyState here claimed the catalogue *was* empty for the second or
    // two before it arrived — icon, title and all. The loader says the one
    // thing that is true at that moment and nothing more.
    return (
      <div className="grid min-h-52 place-items-center gap-3 py-10 text-center">
        <NishanyLoader size={44} label={t('Loading…')} />
        <p className="text-[13px] text-ink-2">{t('Fetching the reviewed catalogue.')}</p>
      </div>
    )
  }

  if (availability.kind === 'error') {
    // The tab itself being offline is a more specific — and more actionable —
    // truth than any server-error copy below: "check your connection" is
    // wrong to show someone who already knows their wifi is down.
    if (!online) {
      return (
        <EmptyState
          icon={WifiOff}
          title={t("You're offline")}
          description={t('This page keeps retrying in the background — it will load as soon as you reconnect.')}
          action={<Button variant="secondary" size="sm" onClick={() => window.location.reload()}>{t('Try again')}</Button>}
        />
      )
    }
    // Only the retryable faults are worth a "try again": hydrate is already
    // retrying those in the background, so the button just shortens the wait.
    // An expired session or a refused role needs a different act entirely.
    const message: Record<StateErrorKind, string> = {
      network: t('We could not reach the server. Check your connection — this page keeps retrying on its own.'),
      server: t('The server could not return the catalogue. This page keeps retrying on its own.'),
      unauthorized: t('Your session has expired. Sign in again to see this content.'),
      forbidden: t('This account is not allowed to read this catalogue.'),
      notfound: t('The catalogue is missing from the server.'),
      conflict: t('Somebody else changed this while you were reading it. Reload to see their version.'),
      toolarge: t('The catalogue could not be transferred.'),
    }
    return (
      <EmptyState
        icon={CircleAlert}
        title={t('This could not be loaded')}
        description={message[availability.error]}
        action={<Button variant="secondary" size="sm" onClick={() => window.location.reload()}>{t('Try again')}</Button>}
      />
    )
  }

  return <EmptyState icon={BookOpen} title={empty.title} description={empty.description} />
}
