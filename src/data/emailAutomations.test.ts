import test from 'node:test'
import assert from 'node:assert/strict'
import {
  automationCategories, fillAutomation, fillTemplate, initialAutomations, normaliseAutomation,
  normaliseAutomations, PLACEHOLDERS, renderAutomation, type Automation,
} from './emailAutomations.ts'
import { isTransactional } from './emailTemplate.ts'

/**
 * The rules the layout depends on, checked against every automation rather than
 * against a sample. A wrapper can only lay out the blocks it is handed, so a
 * message that hides its call to action inside the body is a message the design
 * system never reaches — and the only way to know is to look at all of them.
 */

const each = (run: (automation: Automation) => void) => initialAutomations.forEach(run)

const named = (id: string): Automation => {
  const found = initialAutomations.find((entry) => entry.id === id)
  assert.ok(found, `${id} should exist`)
  return found
}

/** The messages that deliberately ask for nothing. Everything else has a button. */
const NO_ACTION = new Set(['au-sub-cancelled', 'au-refund'])

test('every automation is in a category the admin page renders', () => {
  each((automation) => assert.ok(automationCategories.includes(automation.category), automation.id))
})

test('ids are unique, because a stored edit is matched back to its seed by id', () => {
  const ids = initialAutomations.map((entry) => entry.id)
  assert.equal(new Set(ids).size, ids.length)
})

/* ---- The blocks ---------------------------------------------------------- */

test('every automation carries a preheader that is not the greeting it replaces', () => {
  each((automation) => {
    assert.ok(automation.preheader.trim().length > 0, `${automation.id} has no preheader`)
    assert.doesNotMatch(automation.preheader, /^(hi|hello|hey|dear)\b/i, automation.id)
  })
})

test('a preheader stays within what an inbox will actually show', () => {
  each((automation) => {
    const length = fillTemplate(automation.preheader).length
    assert.ok(length <= 95, `${automation.id} preheader is ${length} characters`)
  })
})

test('a preheader says something the subject does not', () => {
  each((automation) => {
    assert.notEqual(automation.preheader.trim(), automation.subject.trim(), automation.id)
  })
})

test('no body smuggles the call to action in as a bare link', () => {
  // A lone-link paragraph renders as underlined text, not the bulletproof button,
  // and Word would collapse a styled <a> to a link anyway.
  each((automation) => {
    assert.doesNotMatch(automation.body, /<p>\s*<a[^>]*>[^<]*<\/a>\s*<\/p>/i, automation.id)
  })
})

test('no body carries the sign-off, which now sits outside the card', () => {
  each((automation) => assert.doesNotMatch(automation.body, /The Maristana team/, automation.id))
})

test('the caveat is a note, never a last body paragraph', () => {
  each((automation) => {
    assert.doesNotMatch(automation.body, /<p>If (you did not|this was not|it was not|that was not)\b/i, automation.id)
  })
})

test('a body is paragraphs and lists, and nothing the wrapper would have to style blind', () => {
  each((automation) => {
    const tags = [...automation.body.matchAll(/<(\/?)([a-z0-9]+)[^>]*>/gi)].map((match) => match[2].toLowerCase())
    tags.forEach((tag) => assert.ok(['p', 'ul', 'li', 'a', 'strong', 'em'].includes(tag), `${automation.id} uses <${tag}>`))
  })
})

test('a note is one quiet line, never its own run of paragraphs', () => {
  each((automation) => {
    if (!automation.note) return
    assert.doesNotMatch(automation.note, /<p>/i, automation.id)
    assert.ok(automation.note.trim().length > 0, automation.id)
  })
})

test('a detail panel that exists has facts in it, and every fact has both halves', () => {
  each((automation) => {
    if (!automation.details) return
    assert.ok(automation.details.length > 0, `${automation.id} has an empty panel`)
    automation.details.forEach((fact) => {
      assert.ok(fact.label.trim(), `${automation.id} fact with no label`)
      assert.ok(fact.value.trim(), `${automation.id} fact "${fact.label}" with no value`)
    })
  })
})

test('every automation that asks for something asks for exactly one thing', () => {
  each((automation) => {
    if (NO_ACTION.has(automation.id)) {
      assert.equal(automation.action, undefined, `${automation.id} should ask for nothing`)
      return
    }
    assert.ok(automation.action, `${automation.id} has no action`)
    assert.ok(automation.action.label.trim(), automation.id)
    assert.match(automation.action.url, /^(\{\{actionUrl\}\}|https:\/\/)/, `${automation.id} action url`)
  })
})

test('every placeholder used is one the sender knows how to fill', () => {
  const known = new Set(Object.keys(PLACEHOLDERS))
  each((automation) => {
    const fields = [automation.subject, automation.preheader, automation.title ?? '', automation.body, automation.note ?? '',
      automation.action?.label ?? '', automation.action?.url ?? '',
      ...(automation.details ?? []).flatMap((fact) => [fact.label, fact.value])]
    fields.forEach((field) => {
      ;[...field.matchAll(/\{\{[^}]+\}\}/g)].forEach((match) => {
        assert.ok(known.has(match[0]), `${automation.id} uses unknown ${match[0]}`)
      })
    })
  })
})

test('filling an automation leaves no placeholder behind, anywhere it carries text', () => {
  each((automation) => {
    const filled = fillAutomation(automation)
    const all = [filled.subject, filled.preheader, filled.title ?? '', filled.body, filled.note ?? '',
      filled.action?.label ?? '', filled.action?.url ?? '',
      ...(filled.details ?? []).flatMap((fact) => [fact.label, fact.value])].join(' ')
    assert.doesNotMatch(all, /\{\{/, automation.id)
  })
})

/* ---- What each one actually renders as ----------------------------------- */

test('every automation renders the same wrapper, down to the rose rule', () => {
  each((automation) => {
    const { html } = renderAutomation(automation)
    assert.match(html, /background-color:#d13a63;border-radius:12px 12px 0 0/, automation.id)
    assert.match(html, /width="600"/, automation.id)
    assert.match(html, /— The Maristana team/, automation.id)
    assert.doesNotMatch(html, /#949aa8/, `${automation.id} reaches for ink-3`)
    // The masthead's O is the one image a message may carry. Nothing an author
    // writes may add another: a body that needs an image is a body that goes
    // blank in every client that blocks them.
    assert.equal((html.match(/<img/g) ?? []).length, 1, `${automation.id} carries an image beyond the mark`)
    assert.doesNotMatch(html, /\{\{/, automation.id)
  })
})

test('every automation renders a title, and it is the subject unless told otherwise', () => {
  each((automation) => {
    const { html } = renderAutomation(automation)
    const heading = fillTemplate(automation.title ?? automation.subject)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    assert.ok(html.includes(`>${heading}</h1>`), `${automation.id} title`)
  })
})

test('security mail leads with its title; everything else names its category first', () => {
  each((automation) => {
    const { html } = renderAutomation(automation)
    const hasEyebrow = html.includes('letter-spacing:0.09em')
    assert.equal(hasEyebrow, automation.category !== 'Security & account', automation.id)
  })
})

test('only mail a reader may switch off carries a way to switch it off', () => {
  each((automation) => {
    const { html } = renderAutomation(automation)
    const offers = html.includes('Unsubscribe from these emails')
    assert.equal(offers, !isTransactional(automation.category), automation.id)
  })
})

test('a password reset never offers to stop sending password resets', () => {
  const { html, text } = renderAutomation(named('au-password-reset'))
  assert.doesNotMatch(html, /Unsubscribe/)
  assert.doesNotMatch(text, /Unsubscribe/)
})

test('every automation has a plain-text alternative that says the same thing', () => {
  each((automation) => {
    const { text } = renderAutomation(automation)
    assert.ok(text.length > 40, automation.id)
    assert.doesNotMatch(text, /<[a-z/]/i, `${automation.id} leaks markup into the text part`)
    if (automation.action) assert.ok(text.includes(fillTemplate(automation.action.url)), `${automation.id} text has no link`)
  })
})

test('the assessment result is the layout the design system documents', () => {
  const { html } = renderAutomation(named('au-assessment'))
  assert.match(html, /Study &amp; learning<\/p>/)
  assert.match(html, /<h1[^>]*>Your assessment result is ready<\/h1>/)
  assert.match(html, />See your result<\/a>/)
  assert.match(html, /background-color:#fff5f5/)
  assert.match(html, />Cardiovascular<\/td>/)
  assert.match(html, />74% · 24 of 32<\/td>/)
  assert.match(html, /Results stay in <a[^>]*>Performance<\/a>/)
})

/* ---- Reading the older shape --------------------------------------------- */

const legacy = {
  ...named('au-password-reset'),
  preheader: undefined,
  action: undefined,
  note: undefined,
  details: undefined,
  body: '<p>Hello Maya,</p><p>Use the link below to choose a new password. It expires in one hour.</p><p><a href="{{actionUrl}}">Reset my password</a></p><p>If you did not ask for this, no change has been made.</p><p>— The Maristana team</p>',
}

test('an edit saved against the old shape keeps its button instead of losing it', () => {
  const migrated = normaliseAutomation(legacy)
  assert.deepEqual(migrated.action, { label: 'Reset my password', url: '{{actionUrl}}' })
})

test('the caveat a reader needs moves under the hairline rather than vanishing', () => {
  assert.match(normaliseAutomation(legacy).note ?? '', /^If you did not ask for this/)
})

test('the sign-off is dropped, because the wrapper now supplies it outside the card', () => {
  const migrated = normaliseAutomation(legacy)
  assert.doesNotMatch(migrated.body, /The Maristana team/)
  assert.match(renderAutomation(migrated).html, /— The Maristana team/)
})

test('what the author actually wrote survives the move, in order', () => {
  const migrated = normaliseAutomation(legacy)
  assert.equal(migrated.body, '<p>Hello Maya,</p><p>Use the link below to choose a new password. It expires in one hour.</p>')
})

test('a stored record with no preheader borrows the one its seed was given', () => {
  assert.equal(normaliseAutomation(legacy).preheader, named('au-password-reset').preheader)
})

test('an automation already in blocks is left exactly as it is', () => {
  const current = named('au-assessment')
  assert.deepEqual(normaliseAutomation(current), current)
})

test('migrating twice changes nothing the second time', () => {
  const once = normaliseAutomations([legacy])
  assert.deepEqual(normaliseAutomations(once), once)
})

test('a body that was never paragraphs is kept as authored', () => {
  const odd = { ...legacy, body: 'Just a sentence, somehow.' }
  const migrated = normaliseAutomation(odd)
  assert.equal(migrated.body, 'Just a sentence, somehow.')
  assert.deepEqual(migrated.action, named('au-password-reset').action)
})

test('a migrated automation renders the same wrapper as a seeded one', () => {
  const { html } = renderAutomation(normaliseAutomation(legacy))
  assert.match(html, /background-color:#d13a63;border-radius:12px 12px 0 0/)
  assert.match(html, /<td align="center" bgcolor="#d13a63"/)
  assert.doesNotMatch(html, /\{\{/)
})

test('an action the admin deliberately removed is not handed back to them', () => {
  // Keying "is this the old shape?" off the action would read a template whose
  // button was removed on purpose as a legacy record, and restore it.
  const stripped: Automation = { ...named('au-welcome'), action: undefined, details: undefined, note: undefined }
  const migrated = normaliseAutomation(stripped)
  assert.equal(migrated.action, undefined)
  assert.doesNotMatch(renderAutomation(migrated).html, /bgcolor="#d13a63"/)
})
