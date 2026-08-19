import { PricingPage } from './landing/PricingPage'
import { EN_CONTENT } from './landing/content'
import { EN_PRICING } from './landing/pricingContent'

/** English pricing page (/pricing). Always LTR. */
export function PricingEn() {
  return <PricingPage content={EN_CONTENT} pricing={EN_PRICING} />
}
