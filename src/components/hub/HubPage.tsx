import type { ReactNode } from 'react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { useT } from '@/lib/i18n'

/**
 * The shape a hub takes: the app's own page header, then whatever the hub
 * gathers.
 *
 * Four hubs — Plan, Learn, Practice, Revise — are the same page with different
 * contents. The first version gave them a tinted header band with a numbered
 * mono eyebrow; it read as a template rather than as this product, so the hub
 * now uses exactly the header every other student page uses. What makes a hub
 * a hub is its cards, not a banner.
 *
 * `aside` is the summary slot: the one figure the hub is measured by (an exam
 * countdown, terms known), rendered as a quiet pill at the end of the header so
 * the title is still the first thing read.
 */
export function HubPage({
  title,
  lede,
  aside,
  children,
  className,
}: {
  /** Accepted for compatibility with the first version; no longer rendered. */
  eyebrow?: string
  title: string
  lede: string
  aside?: ReactNode
  children?: ReactNode
  className?: string
}) {
  const t = useT()

  return (
    <PageContainer className={className}>
      <PageHeader
        title={t(title)}
        description={t(lede)}
        actions={aside}
        className="border-b border-line pb-5 sm:pb-6"
      />
      {children}
    </PageContainer>
  )
}
