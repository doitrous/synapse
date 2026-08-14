/**
 * What a plan costs, and what a longer commitment actually saves.
 *
 * The landing page used to carry the other billing periods inside a prose line
 * — "EGP 249 / 3 months · EGP 799 / year" — which meant nothing could compare
 * them, state a saving, or switch the headline price. Prices are numbers here
 * so the page can do all three, and so a claimed saving is computed from the
 * offer rather than typed by hand and left to drift.
 */

export const BILLING_PERIODS = ['monthly', 'quarterly', 'yearly'] as const
export type BillingPeriod = (typeof BILLING_PERIODS)[number]

export const PERIOD_MONTHS: Record<BillingPeriod, number> = {
  monthly: 1,
  quarterly: 3,
  yearly: 12,
}

/** A plan's price at each period it is sold at. Absent means not sold that way. */
export type PriceTable = Partial<Record<BillingPeriod, number>>

/**
 * The price to show for a period, falling back to the longest shorter period
 * a plan is actually sold at — a plan billed only monthly still has a price
 * when the page is showing yearly.
 */
export function priceFor(prices: PriceTable, period: BillingPeriod): { amount: number; period: BillingPeriod } | null {
  if (prices[period] !== undefined) return { amount: prices[period] as number, period }
  for (const candidate of [...BILLING_PERIODS].reverse()) {
    if (PERIOD_MONTHS[candidate] < PERIOD_MONTHS[period] && prices[candidate] !== undefined) {
      return { amount: prices[candidate] as number, period: candidate }
    }
  }
  const first = BILLING_PERIODS.find((candidate) => prices[candidate] !== undefined)
  return first ? { amount: prices[first] as number, period: first } : null
}

/** What the same plan works out to per month at this period. */
export function perMonth(amount: number, period: BillingPeriod): number {
  return amount / PERIOD_MONTHS[period]
}

/**
 * How much cheaper this period is than paying monthly, as a whole percent.
 *
 * Null when there is nothing to compare — a free plan, a plan sold only at one
 * period, or the monthly price itself. Rounded down, so the page never claims
 * a saving larger than the one on offer.
 */
export function savingPercent(prices: PriceTable, period: BillingPeriod): number | null {
  const monthly = prices.monthly
  const chosen = prices[period]
  if (!monthly || chosen === undefined || period === 'monthly') return null
  const full = monthly * PERIOD_MONTHS[period]
  if (chosen >= full) return null
  return Math.floor(((full - chosen) / full) * 100)
}

const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']

/**
 * A number in the digits the reader is reading in.
 *
 * The Arabic page is written in Arabic-Indic numerals throughout, so a price
 * rendered in Western digits would be the one number on the page that looked
 * foreign to it.
 */
/**
 * A percentage, written the way the language writes one.
 *
 * Arabic puts the sign before the number — ٪٣٢, not ٣٢٪ — and the rest of the
 * Arabic page already does, so a percentage that did not would be the one
 * number on it set in a foreign convention.
 */
export function formatPercent(value: number, lang: 'ar' | 'en'): string {
  const digits = formatNumber(value, lang)
  return lang === 'ar' ? `٪${digits}` : `${digits}%`
}

export function formatNumber(value: number, lang: 'ar' | 'en'): string {
  const grouped = Math.round(value).toLocaleString('en-US')
  if (lang === 'en') return grouped
  return grouped
    .replace(/,/g, '٬')
    .replace(/[0-9]/g, (digit) => ARABIC_DIGITS[Number(digit)])
}
