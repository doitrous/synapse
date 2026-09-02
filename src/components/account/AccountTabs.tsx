import { CreditCard, ShieldCheck, SlidersHorizontal, UserRound } from 'lucide-react'
import { Tabs } from '@/components/ui/Tabs'
import { ACCOUNT_TABS, ACCOUNT_TAB_LABEL, type AccountTab } from './useAccountTab'
import { useT } from '@/lib/i18n'

const TAB_ICON = {
  profile: UserRound,
  preferences: SlidersHorizontal,
  billing: CreditCard,
  security: ShieldCheck,
} as const

/**
 * The account page's tab strip.
 *
 * Only the strip: which tab is open is `useAccountTab`'s business, because that
 * answer lives in the URL and the page body needs it too.
 */
export function AccountTabs({ value, onChange }: { value: AccountTab; onChange: (next: AccountTab) => void }) {
  const t = useT()
  return (
    <Tabs
      items={ACCOUNT_TABS.map((tab) => ({ value: tab, label: t(ACCOUNT_TAB_LABEL[tab]), icon: TAB_ICON[tab] }))}
      value={value}
      onChange={(next) => onChange(next as AccountTab)}
    />
  )
}
