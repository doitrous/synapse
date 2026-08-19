import { PricingPage } from './landing/PricingPage'
import { AR_CONTENT } from './landing/content'
import { AR_PRICING } from './landing/pricingContent'

/** Arabic pricing page (/ar/pricing). Renders RTL. */
export function PricingAr() {
  return <PricingPage content={AR_CONTENT} pricing={AR_PRICING} />
}
