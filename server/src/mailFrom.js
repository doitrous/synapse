// Both nishany.com domains are on the same Resend account. This is the one
// place that decides which of them an outbound email goes out from, so that
// deciding is not left to whatever address a caller happens to type in.
//
// Three buckets: transactional (receipts, auth, QotD reminders — the vast
// majority of mail, and the safe default for anything uncategorised),
// marketing (newsletters/announcements — bulk mail belongs on its own
// subdomain so a marketing bounce or spam report never touches transactional
// deliverability), and support (the human inbox — replies to mail people
// wrote to us, or explicit contact-form mail).

const MARKETING_CATEGORIES = new Set(['marketing', 'newsletter', 'announcement', 'announcements'])
const SUPPORT_CATEGORIES = new Set(['support', 'mailbox replies', 'contact'])

function transactionalFrom() {
  return process.env.MAIL_FROM_TRANSACTIONAL || 'Nishany <no-reply@mail.nishany.com>'
}
function newsFrom() {
  return process.env.MAIL_FROM_NEWS || 'Nishany <news@news.nishany.com>'
}
function supportFrom() {
  return process.env.MAIL_FROM_SUPPORT || process.env.MAIL_FROM || 'Nishany <info@nishany.com>'
}

/** The bare `addr` out of `Name <addr>` (or the string itself), lowercased for comparison. */
function addressPart(from) {
  const match = /<([^>]+)>/.exec(from || '')
  return (match ? match[1] : from || '').trim().toLowerCase()
}

/** Which bucket a category belongs to. Unknown/missing categories default to transactional. */
function bucketFor(category) {
  const key = String(category || '').trim().toLowerCase()
  if (MARKETING_CATEGORIES.has(key)) return 'marketing'
  if (SUPPORT_CATEGORIES.has(key)) return 'support'
  return 'transactional'
}

function defaultFor(bucket) {
  if (bucket === 'marketing') return newsFrom()
  if (bucket === 'support') return supportFrom()
  return transactionalFrom()
}

/**
 * Pick the Resend "from" address for an outbound email.
 *
 * `category` selects the bucket default. `explicitFrom`, if given, is only
 * honoured when its address matches one of the three configured addresses —
 * otherwise anyone posting to `/api/mail/send` could send as literally any
 * address. A rejected override falls back to the category default and is
 * logged so the attempt isn't silent.
 */
export function fromForCategory(category, explicitFrom) {
  const bucket = bucketFor(category)
  const fallback = defaultFor(bucket)
  if (!explicitFrom) return fallback

  const allowed = new Set([transactionalFrom(), newsFrom(), supportFrom()].map(addressPart))
  if (allowed.has(addressPart(explicitFrom))) return explicitFrom

  console.warn('[mail] from override rejected', { from: explicitFrom, category })
  return fallback
}

/** True for categories that go out from the marketing (news.nishany.com) address. */
export function isMarketingCategory(category) {
  return bucketFor(category) === 'marketing'
}

/** Address for the List-Unsubscribe mailto: the news address for marketing, transactional otherwise. */
export function unsubscribeMailtoAddress(category) {
  return addressPart(isMarketingCategory(category) ? newsFrom() : transactionalFrom())
}

/** Reply-To for transactional mail, so replies to a no-reply@ address still reach the inbox. */
export function replyToForCategory(category) {
  return bucketFor(category) === 'transactional' ? addressPart(supportFrom()) : null
}
