import { LandingShell } from './landing/LandingShell'
import { AR_CONTENT } from './landing/content'

/** Arabic-first marketing page (/ar and the root /). Renders RTL. */
export function LandingAr() {
  return <LandingShell content={AR_CONTENT} />
}
