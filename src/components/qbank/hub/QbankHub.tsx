import type { ReactNode } from 'react'
import { GraduationCap, History, ListChecks, PenLine, Shuffle, Stethoscope } from 'lucide-react'
import { Tabs } from '@/components/ui/Tabs'
import { PageHeader } from '@/components/shell/Page'
import { useT } from '@/lib/i18n'

/**
 * The two things the hub is for.
 *
 * There used to be a third — "Flagged & missed" — which was the same list the
 * composer's first step now offers as a pool. Two ways into one list is one too
 * many: the tab could only show it, while the step can also narrow it by system
 * and turn it into a sitting.
 */
export type QbankHubTab = 'new' | 'previous'

/** The four banks a test can be built out of. */
export type QbankBank = 'mcq' | 'practical' | 'essay' | 'mixed'

export interface QbankHubProps {
  /** Which bank everything below is about. */
  bank: QbankBank
  onBankChange: (next: QbankBank) => void
  tab: QbankHubTab
  onTabChange: (next: QbankHubTab) => void
  /** Sittings of this bank's kind, for the tab's count. */
  previousCount: number
  /** Sits between the header and the bank switch — the "you left a test open" card. */
  banner?: ReactNode
  children: ReactNode
}

/**
 * The Question Bank hub's frame: which bank, then what to do with it.
 *
 * The bank switch used to live inside the composer, which meant "Flagged &
 * missed" and "Previous tests" silently belonged to the MCQ bank alone — a
 * student who had just sat six stations found them under a tab that was not
 * about stations at all. Choosing the bank is the first decision on the page
 * now, and both actions below it are scoped to whatever is chosen, so every
 * count on screen is a count of the thing being looked at.
 */
export function QbankHub({
  bank,
  onBankChange,
  tab,
  onTabChange,
  previousCount,
  banner,
  children,
}: QbankHubProps) {
  const t = useT()

  return (
    <>
      <PageHeader title={t('Question Bank')} />

      {banner}

      <section className="mb-4" aria-labelledby="qbank-bank-title">
        <h2 id="qbank-bank-title" className="mb-2 text-[14px] font-semibold text-ink">
          {t('Which bank?')}
        </h2>
        <Tabs
          value={bank}
          onChange={(next) => onBankChange(next as QbankBank)}
          items={[
            { value: 'mcq', label: t('MCQ'), icon: ListChecks },
            { value: 'practical', label: t('Practical'), icon: Stethoscope },
            { value: 'essay', label: t('Essay'), icon: PenLine },
            { value: 'mixed', label: t('Mixed'), icon: Shuffle },
          ]}
        />
      </section>

      <Tabs
        className="mb-4"
        value={tab}
        onChange={(next) => onTabChange(next as QbankHubTab)}
        items={[
          { value: 'new', label: t('Build a test'), icon: GraduationCap },
          { value: 'previous', label: t('Previous tests'), icon: History, count: previousCount },
        ]}
      />

      {children}
    </>
  )
}
