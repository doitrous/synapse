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

/** "Today", "Tomorrow", "In 3 days", "2 days ago", "Overdue 1 day". */
export function relativeDay(target: Date, from: Date = new Date()): string {
  const d = dayDiff(target, from)
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
export function formatRelativeTime(iso: string, from: Date = new Date()): string {
  const at = new Date(iso)
  if (Number.isNaN(at.getTime())) return ''
  const minutes = Math.round((from.getTime() - at.getTime()) / 60_000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24 && at.getDate() === from.getDate()) return `${hours}h ago`
  return relativeDay(at, from)
}

/** Clamp a number into [min, max]. */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}
