/**
 * The language a formatter should render in.
 *
 * Passed explicitly rather than read from a module mirror: these functions are
 * pure, and `useRelativeTime()` / `useRelativeDay()` in `lib/useRelativeTime.ts`
 * bind the active language for components, the same way `useSubjectName()` binds
 * it for `subjectName`.
 */
export type FormatLang = 'en' | 'ar'

/**
 * Arabic relative time, with Latin digits.
 *
 * `Intl.RelativeTimeFormat('ar')` would render Arabic-Indic numerals, which
 * clash with the tabular Latin figures the rest of the interface counts in, so
 * the numbering system is pinned with `-u-nu-latn`. `numeric: 'auto'` is what
 * turns -1 day into أمس rather than "قبل يوم واحد".
 */
let arRelative: Intl.RelativeTimeFormat | null = null
function ar(): Intl.RelativeTimeFormat {
  arRelative ??= new Intl.RelativeTimeFormat('ar-u-nu-latn', { numeric: 'auto' })
  return arRelative
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

/** Percentage with no trailing decimals by default. */
export function pct(n: number, digits = 0): string {
  return `${n.toFixed(digits)}%`
}

/** 135 → "2h 15m", 45 → "45m", 120 → "2h". */
export function formatMinutes(total: number): string {
  const h = Math.floor(total / 60)
  const m = Math.round(total % 60)
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

/** Decimal hours for compact stats, e.g. 135 → "2.3". */
export function hoursFromMinutes(total: number): string {
  return (total / 60).toFixed(1)
}

/** 5:00 PM in the product-wide 12-hour clock. */
export function formatClock(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date)
}

/** Convert a stored 24-hour value such as 19:30 to 7:30 PM. */
export function formatTimeString(value: string): string {
  const [hour = 0, minute = 0] = value.split(':').map(Number)
  const date = new Date(2026, 0, 1, hour, minute)
  return formatClock(date)
}

/** 5:00 PM, Nov 07, 2026 — the canonical platform timestamp. */
export function formatDateTime(date: Date): string {
  const time = formatClock(date)
  const day = String(date.getDate()).padStart(2, '0')
  return `${time}, ${MONTHS[date.getMonth()]} ${day}, ${date.getFullYear()}`
}

/** "Mon 4 Aug" */
export function formatDayLabel(date: Date): string {
  return `${DAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]}`
}

/** "Nov 07, 2026" */
export function formatLongDate(date: Date): string {
  return `${MONTHS[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`
}

/** Whole-day difference between two dates (ignores time of day). */
export function dayDiff(target: Date, from: Date = new Date()): number {
  const a = new Date(target.getFullYear(), target.getMonth(), target.getDate())
  const b = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  return Math.round((a.getTime() - b.getTime()) / 86_400_000)
}

/**
 * "Today", "Tomorrow", "In 3 days", "2 days ago", "Overdue 1 day".
 *
 * Arabic is idiomatic rather than numeric at ±2 days — `Intl`'s
 * `numeric: 'auto'` gives `بعد الغد` and `أول أمس` where English still counts
 * ("In 2 days" / "2 days ago"). That is better Arabic, and deliberate.
 */
export function relativeDay(target: Date, lang: FormatLang = 'en', from: Date = new Date()): string {
  const d = dayDiff(target, from)
  if (lang === 'ar') return ar().format(d, 'day')
  if (d === 0) return 'Today'
  if (d === 1) return 'Tomorrow'
  if (d === -1) return 'Yesterday'
  if (d > 1) return `In ${d} days`
  return `${Math.abs(d)} days ago`
}

/**
 * "just now", "2h ago", "Yesterday", "3 days ago" — for a real timestamp.
 *
 * Distinct from `relativeDay`, which rounds to whole days: something opened
 * ninety minutes ago should not read as "Today" when the point is recency.
 */
export function formatRelativeTime(iso: string, lang: FormatLang = 'en', from: Date = new Date()): string {
  const at = new Date(iso)
  if (Number.isNaN(at.getTime())) return ''
  const minutes = Math.round((from.getTime() - at.getTime()) / 60_000)
  // English keeps its own compact shapes ("2h ago"): `Intl.RelativeTimeFormat`
  // would widen them to "2 hr. ago", and these labels sit in tight metadata
  // rows. Arabic has no equally compact convention, so it takes the Intl
  // wording, which also gets the dual and plural agreement right.
  if (lang === 'ar') {
    // `ar().format(0, 'second')` is Intl's own "الآن" — no Arabic literal has to
    // live outside the dictionary for it.
    if (minutes < 1) return ar().format(0, 'second')
    if (minutes < 60) return ar().format(-minutes, 'minute')
    const arHours = Math.round(minutes / 60)
    if (arHours < 24 && at.getDate() === from.getDate()) return ar().format(-arHours, 'hour')
    return relativeDay(at, lang, from)
  }
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24 && at.getDate() === from.getDate()) return `${hours}h ago`
  return relativeDay(at, lang, from)
}

/** Clamp a number into [min, max]. */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}
