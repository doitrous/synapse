import { Account } from './Account'

/**
 * Billing, which is now the Billing tab of Account.
 *
 * `/app/billing` redirects to `/app/account?tab=billing`, so nothing routes
 * here any more. The export is kept — and opens Account on the right tab — so
 * that a direct import of `Billing` still lands a student on their plan rather
 * than on a missing module.
 */
export function Billing() {
  return <Account initialTab="billing" />
}
