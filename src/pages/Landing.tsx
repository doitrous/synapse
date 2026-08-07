import { LandingShell } from './landing/LandingShell'
import { EN_CONTENT } from './landing/content'

/** English marketing page (/en). Always LTR. */
export function Landing() {
  return <LandingShell content={EN_CONTENT} />
}
