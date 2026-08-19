/**
 * Numbers, written the way the reader reads them.
 *
 * What a plan costs, and what a longer commitment saves, moved to
 * `src/data/planCatalog.ts` when plans stopped being two hardcoded lists and
 * became one document the admin console edits. What is left here is the part
 * that was never about plans: rendering a figure in the digits and conventions
 * of the page it appears on.
 */

const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']

/**
 * A number in the digits the reader is reading in.
 *
 * The Arabic page is written in Arabic-Indic numerals throughout, so a price
 * rendered in Western digits would be the one number on the page that looked
 * foreign to it.
 */
export function formatNumber(value: number, lang: 'ar' | 'en'): string {
  const grouped = Math.round(value).toLocaleString('en-US')
  if (lang === 'en') return grouped
  return grouped
    .replace(/,/g, '٬')
    .replace(/[0-9]/g, (digit) => ARABIC_DIGITS[Number(digit)])
}

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
