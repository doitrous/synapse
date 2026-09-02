import type { ReactNode } from 'react'
import { GraduationCap, History, ListChecks, PenLine, Shuffle, Stethoscope, Target } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import { PageHeader } from '@/components/shell/Page'
import { useQotd } from '@/lib/useQotd'
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
  const qotd = useQotd()
  const unanswered = !qotd.loading && Boolean(qotd.question) && !qotd.answered

  const lede = bank === 'mcq' ? t('Single-best-answer questions, marked against their key.')
    : bank === 'practical' ? t('OSCE stations, clinical cases and interpretation sets, run one after another.')
      : bank === 'essay' ? t('Written questions: write, reveal, then mark yourself against the key points.')
        : t('One queue drawn from all three banks, in whatever proportions you set.')

  return (
    <>
      <PageHeader
        title={t('Question Bank')}
        description={t('Build a test out of any part of the bank, or go back to what you flagged and missed.')}
        actions={(
          <>
          <ButtonLink to="/app/qotd" variant="secondary" iconLeft={Target}>
            {t('Question of the Day')}
            {unanswered && (
              <>
                <span className="size-2 rounded-full bg-primary" aria-hidden />
                {/* The dot is the whole signal on screen, so it says the same
                    thing in words for anyone who cannot see a crimson circle. */}
                <span className="sr-only">{t('not answered yet')}</span>
              </>
            )}
          </ButtonLink>
          {/* No "Previous tests" shortcut here: it is one of the two tabs
              directly below, and a header button for it was the same press
              twice. */}
          </>
        )}
      />

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
        <p className="mt-2 text-[12.5px] leading-relaxed text-ink-2">{lede}</p>
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
