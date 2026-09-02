import { formatLongDate } from '../lib/format.ts'
import type { LegalPageContent, LegalSection } from '../pages/legal/content.ts'

/**
 * The admin's edits to the four footer documents.
 *
 * `src/pages/legal/content.ts` holds the drafts, and they stay the base: the
 * prose there is versioned with the code, reviewed in a diff, and is what a
 * fresh install serves. What an admin writes in `/admin/legal` is stored
 * separately as an *override* — a sparse patch, per page and per section — and
 * merged over the draft when a page renders.
 *
 * Two reasons for a patch rather than a copy of the document. A page nobody
 * has edited must render exactly as it does today, which `mergeLegalPage`
 * guarantees by returning the base object itself when there is no override.
 * And an edit that only replaces `[COMPANY LEGAL NAME]` in one clause should
 * not freeze the other twelve clauses at the version they had that afternoon —
 * a later correction to the draft still reaches the reader.
 *
 * The document is admin-authored and every student (and every signed-out
 * visitor reading `/terms` before paying) must see the same one, so it is a
 * shared, hyphenated app-state key read through `usePersistentState` — the same
 * arrangement as `nishany-tutorial-videos-v1`. Dotted `nishany.*` keys are
 * per-user; see `src/lib/stateOwnership.ts`. The hook's own write path appends
 * the `app_state_versions` row, so nothing here touches the database.
 */

export const LEGAL_PAGES_STATE_KEY = 'nishany-legal-pages-v1'

/** The four routes, named by their path without the leading slash. */
export type LegalSlug = 'terms' | 'privacy' | 'refund-policy' | 'contact'

export const LEGAL_SLUGS: LegalSlug[] = ['terms', 'privacy', 'refund-policy', 'contact']

/**
 * What an admin changed about one section.
 *
 * Every field is optional and absent means "leave the draft alone". `hidden`
 * removes the section from the page rather than emptying it, so an index entry
 * never points at a heading with nothing under it.
 */
export interface LegalSectionOverride {
  heading?: string
  paragraphs?: string[]
  bullets?: string[]
  /** Explicit `false` clears the draft's "Needs legal review" badge. */
  needsReview?: boolean
  hidden?: boolean
}

export interface LegalPageOverride {
  lastUpdated?: string
  intro?: string
  sections: Record<string, LegalSectionOverride>
  /** Clauses the draft does not have, appended after the base sections. */
  extraSections?: LegalSection[]
  updatedAt: string
  updatedBy?: string
}

/**
 * `pages` is partial by design: a page with no entry is a page nobody has
 * edited, which is the case `mergeLegalPage` answers with the draft itself.
 */
export interface LegalPagesDoc {
  version: 1
  pages: Partial<Record<LegalSlug, LegalPageOverride>>
}

export const EMPTY_LEGAL_PAGES_DOC: LegalPagesDoc = { version: 1, pages: {} }

/** `/refund-policy` → `refund-policy`; anything else is not a legal page. */
export function legalSlugOf(path: string): LegalSlug | undefined {
  const slug = path.replace(/^\//, '')
  return (LEGAL_SLUGS as string[]).includes(slug) ? (slug as LegalSlug) : undefined
}

/** A string counts as an override only when it carries something. */
function filled(value: string | undefined): string | undefined {
  return value && value.trim() ? value : undefined
}

function mergeSection(base: LegalSection, patch: LegalSectionOverride): LegalSection {
  const bullets = patch.bullets ?? base.bullets
  // `??` rather than `||`: an admin who has replaced the placeholders clears
  // the badge by saving `false`, and that has to survive the merge.
  const needsReview = patch.needsReview ?? base.needsReview
  const merged: LegalSection = {
    id: base.id,
    heading: filled(patch.heading) ?? base.heading,
    // An array that is present wins whole, empty included — deleting every
    // bullet in the editor has to mean the list is gone, not unchanged.
    paragraphs: patch.paragraphs ?? base.paragraphs,
  }
  if (bullets && bullets.length) merged.bullets = bullets
  if (needsReview) merged.needsReview = true
  return merged
}

/**
 * The draft, with whatever the admin has changed laid over it.
 *
 * Pure, and deliberately identity-preserving: with no override it returns the
 * very object it was given, so a page nobody has edited renders byte for byte
 * as it did before this feature existed.
 */
export function mergeLegalPage(base: LegalPageContent, override?: LegalPageOverride): LegalPageContent {
  if (!override) return base

  const sections: LegalSection[] = []
  for (const section of base.sections) {
    const patch = override.sections?.[section.id]
    if (patch?.hidden) continue
    sections.push(patch ? mergeSection(section, patch) : section)
  }
  for (const extra of override.extraSections ?? []) sections.push(extra)

  return {
    ...base,
    updated: filled(override.lastUpdated) ?? base.updated,
    intro: filled(override.intro) ?? base.intro,
    sections,
  }
}

/**
 * How many `[BRACKETED]` facts the page still asks somebody to supply.
 *
 * The drafts leave every unconfirmed company fact in brackets rather than
 * inventing one, so this is the page's remaining work as a single number — the
 * count the admin console shows on each tab and beside Save.
 */
const PLACEHOLDER = /\[[^\]\n]+\]/g

export function countPlaceholders(page: LegalPageContent): number {
  let count = 0
  const scan = (value: string | undefined) => {
    if (value) count += value.match(PLACEHOLDER)?.length ?? 0
  }
  scan(page.updated)
  scan(page.intro)
  for (const section of page.sections) {
    scan(section.heading)
    for (const paragraph of section.paragraphs) scan(paragraph)
    for (const bullet of section.bullets ?? []) scan(bullet)
  }
  return count
}

/**
 * The "Last updated" line, as a reader should see it.
 *
 * The console stores the date the `DateField` produced, `YYYY-MM-DD`, because
 * that is the value the picker round-trips. An ISO day is not what a contract
 * says, so it is printed through the platform's own long-date formatter.
 *
 * Anything that is not an ISO day is returned untouched — which is the draft's
 * `[DATE — set before publishing]` placeholder, and the whole reason this is a
 * pass-through rather than a parse. The date is built from its own parts, not
 * from `new Date(value)`: that parses a bare `YYYY-MM-DD` as UTC midnight, and
 * west of Greenwich would print the day before.
 */
export function formatLegalDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim())
  if (!match) return value
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
  return Number.isNaN(date.getTime()) ? value : formatLongDate(date)
}

/* ---- Editor text conversions --------------------------------------------- */
/*
 * The console edits a list of paragraphs as one textarea, because that is how
 * prose is written. A blank line starts a paragraph; a bullet list is one per
 * line. Both round-trip: `textToParagraphs(paragraphsToText(x))` is `x` for any
 * list of non-empty, trimmed paragraphs.
 */

export function paragraphsToText(paragraphs: string[]): string {
  return paragraphs.join('\n\n')
}

export function textToParagraphs(text: string): string[] {
  return text.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean)
}

export function linesToText(lines: string[] | undefined): string {
  return (lines ?? []).join('\n')
}

export function textToLines(text: string): string[] {
  return text.split('\n').map((line) => line.trim()).filter(Boolean)
}
