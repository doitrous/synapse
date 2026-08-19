import test from 'node:test'
import assert from 'node:assert/strict'
import {
  DEFAULT_SENDER, eyebrowFor, htmlToText, isTransactional, renderEmail, styleBodyHtml,
  TRANSACTIONAL_CATEGORIES,
} from './emailTemplate.ts'

const base = { subject: 'Your assessment result is ready', bodyHtml: '<p>Hello Maya,</p><p>It has been marked.</p>' }

/** Only what falls inside the card, so a block outside it cannot be mistaken for one in it. */
function card(html: string): string {
  const open = html.indexOf('border-radius:0 0 12px 12px')
  const close = html.indexOf('<!-- SIGN-OFF')
  assert.ok(open > 0 && close > open, 'the card and the sign-off should both be found')
  return html.slice(open, close)
}

/* ---- The wrapper --------------------------------------------------------- */

test('a message is one 600px column on the paper, and always light', () => {
  const { html } = renderEmail(base)
  assert.match(html, /<meta name="color-scheme" content="light">/)
  assert.match(html, /width="600"[^>]*style="width:600px;max-width:100%/)
  assert.match(html, /background-color:#f5f7fb/)
  // No flex, grid or float: Outlook renders through Word, which has none.
  assert.doesNotMatch(html, /display:\s*(flex|grid)|float:/)
})

test('the masthead is letters, never an image', () => {
  const { html } = renderEmail(base)
  assert.doesNotMatch(html, /<img/)
  assert.match(html, /#1553b3;">Connect<\/span>/)
  assert.match(html, /#a82449;">Cortex<\/span>/)
})

test('the rose rule sits above the card, and is the first brand chrome', () => {
  const { html } = renderEmail(base)
  assert.match(html, /background-color:#d13a63;border-radius:12px 12px 0 0;font-size:0;line-height:0;height:3px/)
})

test('every text cell tells Word its line height exactly', () => {
  // Word invents a line height otherwise, and the message reflows on the way out.
  const { html } = renderEmail({
    ...base,
    bodyHtml: styleBodyHtml(base.bodyHtml),
    action: { label: 'See it', url: 'https://x.test' },
    details: [{ label: 'Score', value: '74%' }],
    note: 'Quietly.',
  })
  const cells = html.split('font-family:-apple-system').slice(1)
  assert.ok(cells.length >= 8, `expected the wrapper's text cells, saw ${cells.length}`)
  cells.forEach((cell, index) => {
    assert.match(cell.slice(0, cell.indexOf('"')), /mso-line-height-rule:exactly/, `text cell ${index}`)
  })
})

test('the mobile query is the only thing in a style block, so dropping it costs nothing', () => {
  const { html } = renderEmail(base)
  // The first <style> is the Word-only font override inside a conditional comment.
  const block = html.slice(html.lastIndexOf('<style>') + 7, html.lastIndexOf('</style>'))
  assert.match(block, /@media only screen and \(max-width:620px\)/)
  assert.doesNotMatch(block, /^[^@]*\{/)
})

/* ---- The blocks ---------------------------------------------------------- */

test('the title repeats the subject unless it is given one of its own', () => {
  assert.match(renderEmail(base).html, /<h1[^>]*>Your assessment result is ready<\/h1>/)
  assert.match(renderEmail({ ...base, title: 'Marked' }).html, /<h1[^>]*>Marked<\/h1>/)
})

test('the title is set in the serif that stands in for the display face', () => {
  assert.match(renderEmail(base).html, /<h1[^>]*font-family:Georgia,'Times New Roman',Times,serif;font-size:25px/)
})

test('an eyebrow appears only when one is given', () => {
  assert.match(renderEmail({ ...base, eyebrow: 'Study & learning' }).html, /Study &amp; learning<\/p>/)
  assert.doesNotMatch(renderEmail(base).html, /letter-spacing:0.09em/)
})

test('the action is a padded cell with bgcolor, never a styled link', () => {
  const { html } = renderEmail({ ...base, action: { label: 'See your result', url: 'https://x.test/r' } })
  // Word ignores padding on inline elements; a styled <a> collapses to a link.
  assert.match(html, /<td align="center" bgcolor="#d13a63" style="border-radius:8px;">/)
  assert.match(html, /<a href="https:\/\/x.test\/r"[^>]*display:inline-block;padding:12px 24px/)
})

test('there is one action, because there is only ever one to give', () => {
  const { html } = renderEmail({ ...base, action: { label: 'Go', url: 'https://x.test' } })
  assert.equal((html.match(/bgcolor="#d13a63"/g) ?? []).length, 1)
})

test('a message that asks for nothing carries no button', () => {
  assert.doesNotMatch(renderEmail(base).html, /bgcolor="#d13a63"/)
})

test('the detail panel is absent when there are no facts, and when they are blank', () => {
  assert.doesNotMatch(renderEmail(base).html, /#fff5f5/)
  assert.doesNotMatch(renderEmail({ ...base, details: [] }).html, /#fff5f5/)
  assert.doesNotMatch(renderEmail({ ...base, details: [{ label: 'Score', value: '  ' }] }).html, /#fff5f5/)
})

test('facts are label and value, with a hairline between them and never around them', () => {
  const { html } = renderEmail({ ...base, details: [{ label: 'Subject', value: 'Cardiovascular' }, { label: 'Score', value: '74%' }] })
  assert.match(html, /background-color:#fff5f5;border:1px solid #f2dfe3/)
  assert.match(html, />Subject<\/td>/)
  assert.match(html, /font-weight:600;color:#161920[^>]*>Cardiovascular<\/td>/)
  assert.equal((html.match(/border-top:1px solid #f2dfe3/g) ?? []).length, 1)
})

test('the note sits below a hairline, quieter than the body and never a button', () => {
  const { html } = renderEmail({ ...base, note: 'If you did not ask, ignore this.' })
  assert.match(html, /border-top:1px solid #e3e7ef/)
  assert.match(html, /font-size:13px;color:#5d636f[^>]*>If you did not ask, ignore this\.<\/td>/)
})

test('a link in the note keeps the brand colour without becoming a second action', () => {
  const { html } = renderEmail({ ...base, note: 'Results stay in <a href="https://x.test/p">Performance</a>.' })
  assert.match(html, /<a style="color:#a82449;text-decoration:underline;font-weight:500;" href="https:\/\/x.test\/p">/)
  assert.doesNotMatch(html, /bgcolor="#d13a63"/)
})

test('the sign-off is outside the card, in the sender’s own name', () => {
  const { html } = renderEmail(base)
  assert.doesNotMatch(card(html), /The Connect Cortex team/)
  assert.match(html, /— The Connect Cortex team/)
  assert.match(renderEmail({ ...base, sender: { name: 'Acme', postalAddress: 'Nowhere' } }).html, /— The Acme team/)
})

/* ---- The preheader ------------------------------------------------------- */

test('the preheader is hidden from the message and shown in the inbox', () => {
  const { html } = renderEmail({ ...base, preheader: 'It has been marked.' })
  assert.match(html, /display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">It has been marked\./)
})

test('a missing preheader skips the greeting rather than wasting the line on it', () => {
  const { html } = renderEmail({ subject: 'S', bodyHtml: '<p>Hello Maya,</p><p>Your assessment has been marked at last.</p>' })
  assert.match(html, /mso-hide:all;">Your assessment has been marked at last\./)
})

test('a body with nothing long enough to lead with falls back to the subject', () => {
  const { html } = renderEmail({ subject: 'Two-factor is on', bodyHtml: '<p>Hi Maya,</p><p>It is on.</p>' })
  assert.match(html, /mso-hide:all;">Two-factor is on/)
})

/* ---- The footer ---------------------------------------------------------- */

test('the footer is one step darker than decoration, and ink-3 is nowhere at all', () => {
  const { html } = renderEmail({ ...base, unsubscribeUrl: 'https://x.test/u', category: 'Study & learning' })
  // #949aa8 measures 2.8:1; the sender identity and the unsubscribe rationale
  // are the two lines that most need reading, in a medium that cannot zoom.
  assert.doesNotMatch(html, /#949aa8/)
  assert.match(html, /font-size:12px;color:#5d636f/)
})

test('the footer names the sender and a real postal address', () => {
  const { html } = renderEmail(base)
  assert.match(html, new RegExp(`${DEFAULT_SENDER.name} &middot; ${DEFAULT_SENDER.postalAddress}`))
})

test('transactional mail does not offer to stop sending itself', () => {
  const { html, text } = renderEmail(base)
  assert.doesNotMatch(html, /Unsubscribe/)
  assert.doesNotMatch(text, /Unsubscribe/)
  assert.match(html, /sent whatever your email preferences/)
})

test('mail a reader may switch off says so, and names what they would switch off', () => {
  const { html } = renderEmail({ ...base, unsubscribeUrl: 'https://x.test/u', category: 'Study & learning' })
  assert.match(html, /<a href="https:\/\/x.test\/u"[^>]*>Unsubscribe from these emails<\/a>/)
  assert.match(html, /This is a <strong[^>]*>Study &amp; learning<\/strong> message/)
})

test('the categories a reader may not switch off are the ones about their own account', () => {
  assert.equal(isTransactional('Security & account'), true)
  assert.equal(isTransactional('Billing & subscription'), true)
  assert.equal(isTransactional('Onboarding'), true)
  assert.equal(isTransactional('Privacy & data'), true)
  assert.equal(isTransactional('Study & learning'), false)
  assert.equal(isTransactional('Collaboration'), false)
  assert.equal(isTransactional('Operations'), false)
  assert.equal(TRANSACTIONAL_CATEGORIES.size, 4)
})

test('security mail carries no eyebrow, because its title is already the point', () => {
  assert.equal(eyebrowFor('Security & account'), undefined)
  assert.equal(eyebrowFor('Study & learning'), 'Study & learning')
})

/* ---- Escaping and the text alternative ----------------------------------- */

test('a subject, a label and a fact are escaped wherever they land', () => {
  const { html } = renderEmail({
    subject: 'A & B <script>',
    bodyHtml: '<p>Hello.</p>',
    action: { label: 'Go & see', url: 'https://x.test/?a=1&b=2' },
    details: [{ label: '<b>Plan</b>', value: 'A & B' }],
  })
  assert.match(html, /<title>A &amp; B &lt;script&gt;<\/title>/)
  assert.match(html, /<h1[^>]*>A &amp; B &lt;script&gt;<\/h1>/)
  assert.match(html, />Go &amp; see<\/a>/)
  assert.match(html, /&lt;b&gt;Plan&lt;\/b&gt;/)
  assert.doesNotMatch(html, /<script>/)
})

test('the text alternative carries the heading, the link, the facts and the note', () => {
  const { text } = renderEmail({
    ...base,
    action: { label: 'See your result', url: 'https://x.test/r' },
    details: [{ label: 'Score', value: '74%' }],
    note: 'Results stay in <a href="https://x.test/p">Performance</a>.',
  })
  assert.match(text, /^Your assessment result is ready/)
  assert.match(text, /See your result: https:\/\/x\.test\/r/)
  assert.match(text, /Score: 74%/)
  assert.match(text, /Performance \(https:\/\/x\.test\/p\)/)
  assert.match(text, /— The Connect Cortex team/)
  assert.doesNotMatch(text, /<[a-z]/i)
})

test('a link keeps its address beside its label, because the label alone is useless', () => {
  assert.equal(htmlToText('<p>Read the <a href="https://x.test">reply</a>.</p>'), 'Read the reply (https://x.test).')
})

test('the authored paragraphs are given their styling on the element', () => {
  const styled = styleBodyHtml('<p>Hello.</p><ul><li>One</li></ul>')
  assert.match(styled, /<p style="margin:0 0 12px;[^"]*font-size:15px;[^"]*line-height:24px;">/)
  assert.match(styled, /<li style="[^"]*font-size:15px/)
  assert.match(styleBodyHtml('<p><a href="#">x</a></p>'), /<a style="color:#a82449;/)
})

test('the footer stops where it ends, rather than trailing a margin off the message', () => {
  assert.match(renderEmail(base).html, /<p style="margin:0 0 0;">This is a service message/)
  // With a way out below it, the last line keeps its gap and the link supplies its own.
  const open = renderEmail({ ...base, unsubscribeUrl: 'https://x.test/u', category: 'Study & learning' }).html
  assert.match(open, /<p style="margin:0 0 5px;">You are receiving this/)
  assert.match(open, /<p style="margin:9px 0 0;"><a href="https:\/\/x.test\/u"/)
})
