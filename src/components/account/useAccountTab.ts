import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

/** The four things a student manages about their account, in the order they matter. */
export type AccountTab = 'profile' | 'preferences' | 'billing' | 'security'

export const ACCOUNT_TABS: readonly AccountTab[] = ['profile', 'preferences', 'billing', 'security']

export const ACCOUNT_TAB_LABEL: Record<AccountTab, string> = {
  profile: 'Profile',
  preferences: 'Preferences',
  billing: 'Billing',
  security: 'Security',
}

function readTab(value: string | null, fallback: AccountTab): AccountTab {
  return ACCOUNT_TABS.includes(value as AccountTab) ? (value as AccountTab) : fallback
}

/**
 * Which account tab is open, held in the URL rather than beside it.
 *
 * `/app/billing` redirects to `/app/account?tab=billing`, so the URL has to be
 * the thing the page reads — a state variable the URL merely seeded would show
 * Profile to anyone who followed that redirect a second time, and would not
 * survive a reload or a shared link. `initial` is what an unparameterised visit
 * opens on, which is how `Billing` renders this page already on its own tab.
 *
 * It replaces rather than pushes: four tabs on one page are one destination, and
 * a back button that walks a student back through every tab they glanced at is
 * a back button that no longer leaves the page.
 */
export function useAccountTab(initial: AccountTab = 'profile'): [AccountTab, (next: AccountTab) => void] {
  const [params, setParams] = useSearchParams()
  const tab = readTab(params.get('tab'), initial)

  const setTab = useCallback((next: AccountTab) => {
    setParams((current) => {
      const nextParams = new URLSearchParams(current)
      nextParams.set('tab', next)
      return nextParams
    }, { replace: true })
  }, [setParams])

  return [tab, setTab]
}
