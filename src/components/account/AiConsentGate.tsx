import { useState } from 'react'
import { useIdentity } from '@/lib/useIdentity'
import { AiDisclaimerDialog } from './AiDisclaimerDialog'

/**
 * First-run AI disclosure, mounted once for the whole student app.
 *
 * Waits for `profileComplete` rather than merely `authenticated`: a brand new
 * account is still answering CompleteProfile/StudentOnboarding at that point,
 * and stacking a second modal on top of those is worse than showing this one
 * a few screens later. Renders nothing once `aiConsentAt` is set.
 *
 * Escape or the backdrop dismisses it for this page view — `dismissed` is
 * local, not written anywhere — so a keyboard user is never trapped, but the
 * notice comes back on the next load until the student actually acknowledges
 * it, which is the only path that posts consent.
 */
export function AiConsentGate() {
  const identity = useIdentity()
  const [dismissed, setDismissed] = useState(false)
  const shouldShow = !dismissed && identity.status === 'authenticated' && identity.profileComplete && !identity.profile.aiConsentAt

  if (!shouldShow) return null
  return <AiDisclaimerDialog onClose={() => setDismissed(true)} />
}
