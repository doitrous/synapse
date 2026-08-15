import { BookOpen, CircleAlert } from 'lucide-react'
import { EmptyState } from './EmptyState'
import { Button } from './Button'
import { useT } from '@/lib/i18n'
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

  if (availability.kind === 'loading') {
    return <EmptyState icon={BookOpen} title={t('Loading…')} description={t('Fetching the reviewed catalogue.')} />
  }

  if (availability.kind === 'error') {
    // Only the retryable faults are worth a "try again": hydrate is already
    // retrying those in the background, so the button just shortens the wait.
    // An expired session or a refused role needs a different act entirely.
    const message: Record<StateErrorKind, string> = {
      network: t('We could not reach the server. Check your connection — this page keeps retrying on its own.'),
      server: t('The server could not return the catalogue. This page keeps retrying on its own.'),
      unauthorized: t('Your session has expired. Sign in again to see this content.'),
      forbidden: t('This account is not allowed to read this catalogue.'),
      notfound: t('The catalogue is missing from the server.'),
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
