import { test } from 'node:test'
import assert from 'node:assert/strict'
import type { LegalPageContent } from '../pages/legal/content.ts'
import type { LegalPageOverride } from './legalPages.ts'
import {
  LEGAL_SLUGS,
  countPlaceholders,
  formatLegalDate,
  legalSlugOf,
  linesToText,
  mergeLegalPage,
  paragraphsToText,
  textToLines,
  textToParagraphs,
} from './legalPages.ts'

/**
 * A stand-in for one of the four drafts. The real documents live in
 * `src/pages/legal/content.ts`, which imports through the `@/` alias and so
 * cannot be loaded by `node --test`; the merge only reads this shape, and the
 * "no override" case is asserted by object identity, which holds for any base.
 */
function draft(): LegalPageContent {
  return {
    slug: '/terms',
    title: 'Terms and Conditions',
    documentTitle: 'Terms and Conditions · Nishany',
    description: 'The terms that apply when you use Nishany.',
    updated: '[DATE — set before publishing]',
    intro: 'These terms describe what you can expect from Nishany.',
    sections: [
      {
        id: 'who-we-are',
        heading: 'Who these terms are with',
        needsReview: true,
        paragraphs: [
          'Nishany is operated by [COMPANY LEGAL NAME], registered at [REGISTERED ADDRESS].',
          'These terms are governed by the law of [JURISDICTION].',
        ],
      },
      {
        id: 'accounts',
        heading: 'Your account and eligibility',
        paragraphs: ['You need an account to use Nishany.'],
        bullets: ['One account per student.', 'A working email address.'],
      },
    ],
  }
}

function override(patch: Partial<LegalPageOverride> = {}): LegalPageOverride {
  return { sections: {}, updatedAt: '2026-09-02T10:00:00.000Z', ...patch }
}

test('with no override the draft is returned untouched, object and all', () => {
  const base = draft()
  const merged = mergeLegalPage(base)
  // Identity, not deep equality: the public page must render byte for byte as
  // it did before this feature existed, for every one of the four documents.
  assert.equal(merged, base)
  assert.equal(merged.sections, base.sections)
  assert.equal(mergeLegalPage(base, undefined), base)
})

test('an override that touches nothing still leaves every field as the draft had it', () => {
  const base = draft()
  const merged = mergeLegalPage(base, override())
  assert.deepEqual(merged, base)
})

test('the override wins field by field, and the draft supplies the rest', () => {
  const base = draft()
  const merged = mergeLegalPage(base, override({
    lastUpdated: '2026-09-02',
    intro: 'Read these before you pay.',
    sections: {
      'who-we-are': {
        heading: 'Who you are contracting with',
        paragraphs: ['Nishany is operated by Connect for Education LLC.'],
        needsReview: false,
      },
    },
  }))

  assert.equal(merged.updated, '2026-09-02')
  assert.equal(merged.intro, 'Read these before you pay.')
  assert.equal(merged.slug, base.slug)
  assert.equal(merged.documentTitle, base.documentTitle)

  const [first, second] = merged.sections
  assert.equal(first.heading, 'Who you are contracting with')
  assert.deepEqual(first.paragraphs, ['Nishany is operated by Connect for Education LLC.'])
  // Replacing the placeholders is exactly when the badge should come off.
  assert.equal(first.needsReview, undefined)
  // A section with no entry is the draft's own object.
  assert.equal(second, base.sections[1])
})

test('a blank string is not an override — a cleared field falls back to the draft', () => {
  const base = draft()
  const merged = mergeLegalPage(base, override({
    lastUpdated: '   ',
    intro: '',
    sections: { 'who-we-are': { heading: '' } },
  }))
  assert.equal(merged.updated, base.updated)
  assert.equal(merged.intro, base.intro)
  assert.equal(merged.sections[0].heading, base.sections[0].heading)
})

test('an empty bullet array removes the list; an omitted one keeps the draft', () => {
  const base = draft()
  const cleared = mergeLegalPage(base, override({ sections: { accounts: { bullets: [] } } }))
  assert.equal(cleared.sections[1].bullets, undefined)

  const kept = mergeLegalPage(base, override({ sections: { accounts: { paragraphs: ['Rewritten.'] } } }))
  assert.deepEqual(kept.sections[1].bullets, base.sections[1].bullets)

  const replaced = mergeLegalPage(base, override({ sections: { accounts: { bullets: ['One account.'] } } }))
  assert.deepEqual(replaced.sections[1].bullets, ['One account.'])
})

test('needsReview can be raised as well as cleared', () => {
  const base = draft()
  const merged = mergeLegalPage(base, override({ sections: { accounts: { needsReview: true } } }))
  assert.equal(merged.sections[1].needsReview, true)
})

test('hidden removes the section from the page, index and all', () => {
  const base = draft()
  const merged = mergeLegalPage(base, override({ sections: { 'who-we-are': { hidden: true } } }))
  assert.deepEqual(merged.sections.map((section) => section.id), ['accounts'])
  // Hiding one section must not disturb the ones around it.
  assert.equal(merged.sections[0], base.sections[1])
})

test('hidden wins over the other edits on the same section', () => {
  const base = draft()
  const merged = mergeLegalPage(base, override({
    sections: { accounts: { hidden: true, heading: 'Never rendered' } },
  }))
  assert.deepEqual(merged.sections.map((section) => section.id), ['who-we-are'])
})

test('extra sections append after the draft, in the order they were added', () => {
  const base = draft()
  const merged = mergeLegalPage(base, override({
    extraSections: [
      { id: 'custom-1', heading: 'Governing language', paragraphs: ['The English text prevails.'] },
      { id: 'custom-2', heading: 'Complaints', paragraphs: ['Write to the address above.'], needsReview: true },
    ],
  }))
  assert.deepEqual(merged.sections.map((section) => section.id), ['who-we-are', 'accounts', 'custom-1', 'custom-2'])
  assert.equal(merged.sections[3].needsReview, true)
})

test('the draft object is never mutated by a merge', () => {
  const base = draft()
  const snapshot = structuredClone(base)
  mergeLegalPage(base, override({
    intro: 'Changed.',
    sections: { 'who-we-are': { hidden: true }, accounts: { bullets: [] } },
    extraSections: [{ id: 'custom-1', heading: 'Extra', paragraphs: ['Text.'] }],
  }))
  assert.deepEqual(base, snapshot)
})

test('placeholders are counted across the date, the intro and every section', () => {
  const base = draft()
  // [DATE …], [COMPANY LEGAL NAME], [REGISTERED ADDRESS], [JURISDICTION]
  assert.equal(countPlaceholders(base), 4)

  const merged = mergeLegalPage(base, override({
    lastUpdated: '2026-09-02',
    sections: {
      'who-we-are': {
        paragraphs: ['Nishany is operated by Connect for Education LLC, registered in Cairo.'],
      },
    },
  }))
  // The date is set and both bracketed paragraphs were replaced by one written
  // clause, so nothing is left for anybody to supply.
  assert.equal(countPlaceholders(merged), 0)
})

test('a placeholder in a bullet or an added section counts too', () => {
  const base = draft()
  const merged = mergeLegalPage(base, override({
    sections: { accounts: { bullets: ['Minimum age [MINIMUM AGE].'] } },
    extraSections: [{ id: 'custom-1', heading: 'Venue', paragraphs: ['The courts of [JURISDICTION].'] }],
  }))
  assert.equal(countPlaceholders(merged), 6)
})

test('slugs map to and from the public routes', () => {
  assert.equal(legalSlugOf('/refund-policy'), 'refund-policy')
  assert.equal(legalSlugOf('/terms'), 'terms')
  assert.equal(legalSlugOf('/pricing'), undefined)
  assert.deepEqual(LEGAL_SLUGS, ['terms', 'privacy', 'refund-policy', 'contact', 'accessibility'])
})

test('paragraphs and bullets round-trip through the editor textareas', () => {
  const paragraphs = ['First paragraph.', 'Second paragraph.']
  assert.deepEqual(textToParagraphs(paragraphsToText(paragraphs)), paragraphs)
  // A stray third blank line, or trailing whitespace, is not a new paragraph.
  assert.deepEqual(textToParagraphs('One.\n\n\n  \n\nTwo.\n\n'), ['One.', 'Two.'])
  // A single newline stays inside its paragraph — only a blank line splits.
  assert.deepEqual(textToParagraphs('One.\nStill one.'), ['One.\nStill one.'])

  const bullets = ['One account per student.', 'A working email address.']
  assert.deepEqual(textToLines(linesToText(bullets)), bullets)
  assert.deepEqual(textToLines(''), [])
  assert.equal(linesToText(undefined), '')
})

test('the last-updated line is printed as a date, not as an ISO day', () => {
  assert.equal(formatLegalDate('2026-09-12'), 'Sep 12, 2026')
  // Built from its own parts, so a timezone west of Greenwich does not print
  // the day before.
  assert.equal(formatLegalDate('2026-01-01'), 'Jan 01, 2026')
})

test('anything that is not an ISO day passes straight through', () => {
  // The draft's own placeholder, which must reach the page untouched.
  assert.equal(formatLegalDate('[DATE — set before publishing]'), '[DATE — set before publishing]')
  assert.equal(formatLegalDate('12 September 2026'), '12 September 2026')
  assert.equal(formatLegalDate(''), '')
})
