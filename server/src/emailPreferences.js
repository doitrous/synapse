/**
 * A student's own email choices, over the existing `email_suppressions` table.
 *
 * Suppression is per (address, category); a row with a NULL category is the
 * legacy "all non-transactional email off" switch that the one-click
 * unsubscribe writes. Transactional mail (password resets, receipts) is never
 * suppressible and is not listed here — those are not a preference.
 *
 * The IO lives in the route; the two decisions that are worth being sure about
 * — what a set of suppression rows means, and what rows a single toggle should
 * add or remove — are the pure functions below, so they carry the test.
 */

/** The categories a student can turn on and off. Keys match what the senders tag. */
export const STUDENT_EMAIL_CATEGORIES = [
  { key: 'Question of the Day', label: 'Daily study reminders', description: 'A nudge to keep your streak and answer the day’s question.' },
  { key: 'announcement', label: 'News and announcements', description: 'New features, and the occasional important update.' },
]

const KEYS = STUDENT_EMAIL_CATEGORIES.map((c) => c.key)

/**
 * What a student is subscribed to, given the categories currently suppressed.
 *
 * `suppressed` is the set of category values from the address's rows — a
 * literal category string, or `null` for the blanket switch. A blanket NULL row
 * turns everything off; otherwise a category is on unless its own row exists.
 */
export function readPreferences(suppressed) {
  const set = suppressed instanceof Set ? suppressed : new Set(suppressed ?? [])
  const allOff = set.has(null)
  return {
    allOff,
    categories: STUDENT_EMAIL_CATEGORIES.map(({ key, label, description }) => ({
      key,
      label,
      description,
      subscribed: !allOff && !set.has(key),
    })),
  }
}

/**
 * The row changes for one toggle.
 *
 * Turning a category off inserts its row. Turning one on deletes its row, and —
 * because a single blanket NULL row cannot say "all but this one" — first
 * rewrites any blanket switch into explicit per-category rows for the others,
 * so re-subscribing to one thing never silently re-subscribes to everything.
 *
 * Returns `{ inserts, deletes }` of category values (`null` = the blanket row).
 */
export function planChange(suppressed, category, subscribed) {
  if (!KEYS.includes(category)) throw new Error(`unknown email category: ${category}`)
  const set = suppressed instanceof Set ? suppressed : new Set(suppressed ?? [])

  if (!subscribed) return { inserts: [category], deletes: [] }

  const inserts = []
  const deletes = [category]
  if (set.has(null)) {
    // Normalise the blanket switch: everything except the one being turned on
    // stays off, now as its own row.
    deletes.push(null)
    for (const key of KEYS) if (key !== category) inserts.push(key)
  }
  return { inserts, deletes }
}
