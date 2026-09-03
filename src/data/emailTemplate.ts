/**
 * The wrapper every automated message goes out in.
 *
 * One layout, one 600px column, a fixed set of blocks — the only thing that differs
 * between a receipt and a review nudge is which blocks are present. The blocks are
 * arguments rather than markup the author writes, because the rules that matter are
 * structural ones: one action per email and never two primaries, no detail panel
 * when there are no facts, the secondary note is never a second button, and the
 * unsubscribe line appears only on mail the reader is allowed to switch off. A
 * single blob of body HTML can express all of those and guarantee none of them.
 *
 * Choices that look old-fashioned are client constraints, not preferences:
 *
 *   Tables, no flex/grid/float. Outlook renders through Word, which has none of
 *   them. A single 600px centred table is the one layout every client agrees on.
 *
 *   Hex, not tokens. `var(--color-ink)` resolves to nothing in Gmail, and the
 *   reader's `data-theme` is unknowable, so the light palette is written out
 *   literally. It is kept in step with `index.css` by sharing its names — that
 *   shared naming is the only defence against drift, so when a brand colour
 *   changes, grep these two files together.
 *
 *   Inline styles. Gmail strips `<style>` blocks on some clients and on all
 *   forwarded mail. The one `<style>` block carries only the mobile media query;
 *   the email is correct without it.
 *
 *   System fonts. Jost and the display serif will not load, so the fallback is
 *   what actually renders and the fallback is what is specified.
 *
 *   `mso-line-height-rule:exactly` on every text cell and explicit widths on
 *   every table. Word invents both otherwise.
 *
 *   A message is always light. There is no theme attribute in an inbox, so
 *   `color-scheme: light` is declared to stop clients auto-inverting a design
 *   that was never built for it.
 *
 * Deliverability is mostly not markup — SPF, DKIM and DMARC are DNS records. What
 * a template can do is here: a real text alternative, a preheader, a physical
 * sender, an unsubscribe path, and no image-only content.
 */

/**
 * The light palette, resolved to literals, named for the tokens they mirror.
 *
 * Every text colour clears WCAG AA against the fill behind it: `ink` is 16.5:1 on
 * white, `ink2` is 5.9:1 on white and 5.6:1 on the paper, white on `primary` is
 * 4.7:1. `ink3` is deliberately absent — nothing in an email is decorative enough
 * to earn a colour that measures 2.8:1, least of all the footer, which carries the
 * legally required sender identity to a reader who cannot zoom the page.
 */
const COLOR = {
  paper: '#f5f7fb',
  surface: '#ffffff',
  ink: '#161920',
  ink2: '#5d636f',
  line: '#e3e7ef',
  primary: '#d13a63',
  primaryStrong: '#a82449',
  primaryTint: '#fff5f5',
  /** The hairline inside a tinted panel, where `line` would disappear. */
  primaryLine: '#f2dfe3',
  /** White, not `--color-on-accent` (#f8fbff): mail wants the full 4.7:1. */
  onAccent: '#ffffff',
  /** The bowl of Nishany's Noon Dot mark. */
  brandBlue: '#1553b3',
}

const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"
const SERIF = "Georgia,'Times New Roman',Times,serif"
/** The logotype run in mail. No client will fetch a web font, so this is an
 *  email-safe stack rather than the in-app Figtree webfont. */
const BRAND = "Figtree,'Helvetica Neue',Arial,sans-serif"

/** The brand mark, absolute. A message is read outside the app, so a relative
 *  path resolves against the mail client and 404s. Written out rather than
 *  imported from `pageMeta.ts` for the same reason the palette is: nothing in
 *  this file may depend on the running app, so that a server can render mail. */
const MARK_URL = 'https://nishany.com/brand/nishany-mark.png'

/** Who is sending, and from where. Required in most jurisdictions, and filters look. */
export interface EmailSender {
  name: string
  /** A real postal address. Bulk mail without one is a compliance and filtering risk. */
  postalAddress: string
}

export const DEFAULT_SENDER: EmailSender = {
  name: 'Nishany',
  postalAddress: 'Cairo, Egypt',
}

/** The one thing the message asks for. There is never a second. */
export interface EmailAction {
  label: string
  url: string
}

/** A fact the reader may need later: an amount, a date, a device, a score. */
export interface EmailDetail {
  label: string
  value: string
}

export interface RenderEmailInput {
  /** The subject line. Also the default title, and the plain-text heading. */
  subject: string
  /**
   * The grey line beside the subject in the inbox list, around 85 characters.
   * Without one, clients grab the first words of the body — which is always
   * "Hello Maya," — the exact wasted line a preheader exists to prevent.
   */
  preheader?: string
  /** The automation's category, in small tracked caps. Dropped on security mail. */
  eyebrow?: string
  /** Defaults to the subject: the title repeats it and never teases it. */
  title?: string
  /** The authored paragraphs — a short run of `<p>`, `<a>` and `<ul>`. */
  bodyHtml: string
  /** One bulletproof button. Omit on mail that asks for nothing. */
  action?: EmailAction
  /** Label/value rows in a tinted inset. Omit entirely when there are no facts. */
  details?: EmailDetail[]
  /** The quieter last word: an expiry, an "if this wasn't you". Never a button. */
  note?: string
  /**
   * Where a one-click unsubscribe goes. Omit for transactional mail — a password
   * reset must not offer to stop sending password resets.
   */
  unsubscribeUrl?: string
  /** What the reader would be unsubscribing from, e.g. "Study & learning". */
  category?: string
  sender?: EmailSender
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * A readable plain-text alternative.
 *
 * Sending `text/html` alone is one of the cheapest ways to look like bulk mail, and
 * some readers genuinely prefer text. Links are kept by writing the href out beside
 * its label, since a bare "Confirm my email" is useless without the address.
 */
export function htmlToText(html: string): string {
  return html
    .replace(/<\s*br\s*\/?>/gi, '\n')
    .replace(/<\s*\/\s*(p|div|h[1-6]|li)\s*>/gi, '\n\n')
    .replace(/<\s*li[^>]*>/gi, '• ')
    .replace(/<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, '$2 ($1)')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&middot;/g, '·')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .trim()
}

export interface RenderedEmail {
  html: string
  text: string
}

/** The sign-off, outside the card: a named team, never a no-reply address. */
const signOffFor = (sender: EmailSender) => `— The ${sender.name} team`

/**
 * The preheader, when the author has not written one.
 *
 * The first line of almost every body is "Hello Maya," — exactly the wasted inbox
 * line a preheader exists to prevent — so the fallback skips greetings and takes
 * the first line that actually says something.
 */
function leadFrom(preheader: string | undefined, bodyHtml: string, subject: string): string {
  const written = preheader?.trim()
  if (written) return written
  const found = htmlToText(bodyHtml)
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.length > 24 && !/^(hi|hello|hey|dear)\b/i.test(line))
  return found ?? subject
}

export function renderEmail({
  subject,
  preheader,
  eyebrow,
  title,
  bodyHtml,
  action,
  details,
  note,
  unsubscribeUrl,
  category,
  sender = DEFAULT_SENDER,
}: RenderEmailInput): RenderedEmail {
  const lead = leadFrom(preheader, bodyHtml, subject)
  const heading = (title ?? subject).trim()
  const facts = details?.filter((entry) => entry.label.trim() && entry.value.trim()) ?? []
  const signOff = signOffFor(sender)

  const eyebrowHtml = eyebrow
    ? `<p style="margin:0 0 10px;font-family:${SANS};font-size:11px;font-weight:600;letter-spacing:0.09em;text-transform:uppercase;color:${COLOR.ink2};mso-line-height-rule:exactly;line-height:14px;">${escapeHtml(eyebrow)}</p>`
    : ''

  // Bulletproof in the Outlook sense: a padded cell with bgcolor rather than a
  // styled <a>, because Word ignores padding on inline elements and the button
  // collapses to a bare link.
  // Every gap below the body is stated rather than summed: a paragraph's 12px
  // bottom margin and a table's top margin collapse to the larger of the two, so
  // adding 8px to reach 20px silently yields 12px.
  const actionHtml = action
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" class="cx-btn" style="margin:20px 0 22px;">
<tr>
<td align="center" bgcolor="${COLOR.primary}" style="border-radius:8px;">
<a href="${escapeHtml(action.url)}" style="display:inline-block;padding:12px 24px;font-family:${SANS};font-size:14px;font-weight:600;color:${COLOR.onAccent};text-decoration:none;border-radius:8px;mso-line-height-rule:exactly;line-height:18px;">${escapeHtml(action.label)}</a>
</td>
</tr>
</table>`
    : ''

  const factCell = (content: string, align: 'left' | 'right', pad: string) =>
    `<td${align === 'right' ? ' align="right"' : ''} style="padding:${pad};font-family:${SANS};font-size:13px;${align === 'right' ? `font-weight:600;color:${COLOR.ink};` : `color:${COLOR.ink2};`}mso-line-height-rule:exactly;line-height:18px;">${content}</td>`

  const detailsHtml = facts.length
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:${COLOR.primaryTint};border:1px solid ${COLOR.primaryLine};border-radius:10px;margin:${action ? '0' : '20px'} 0 20px;">
<tr>
<td style="padding:14px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
${facts.map((fact, index) => {
    const top = index === 0 ? '0' : '8px'
    const bottom = index === facts.length - 1 ? '0' : '8px'
    const row = `<tr>${factCell(escapeHtml(fact.label), 'left', `${top} 0 ${bottom}`)}${factCell(escapeHtml(fact.value), 'right', `${top} 0 ${bottom}`)}</tr>`
    // A hairline between rows, never above the first or below the last.
    return index === facts.length - 1
      ? row
      : `${row}\n<tr><td colspan="2" style="padding:0;font-size:0;line-height:0;border-top:1px solid ${COLOR.primaryLine};">&nbsp;</td></tr>`
  }).join('\n')}
</table>
</td>
</tr>
</table>`
    : ''

  const noteHtml = note
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin:${action || facts.length ? '0' : '20px'} 0 0;">
<tr><td style="padding:0 0 14px;font-size:0;line-height:0;border-top:1px solid ${COLOR.line};">&nbsp;</td></tr>
<tr><td style="font-family:${SANS};font-size:13px;color:${COLOR.ink2};mso-line-height-rule:exactly;line-height:20px;">${styleNoteHtml(note)}</td></tr>
</table>`
    : ''

  const footerLines = [
    `${escapeHtml(sender.name)} &middot; ${escapeHtml(sender.postalAddress)}`,
    unsubscribeUrl
      ? `You are receiving this because you have a ${escapeHtml(sender.name)} account.${category ? ` This is a <strong style="font-weight:600;color:${COLOR.ink2}">${escapeHtml(category)}</strong> message.` : ''}`
      : 'This is a service message about your account, so it is sent whatever your email preferences.',
  ]

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(subject)}</title>
<!--[if mso]><style>body,table,td,a{font-family:Arial,Helvetica,sans-serif !important}</style><![endif]-->
<style>
/* Only what cannot inline. Every client that drops this block still gets a
   correct email from the inline styles alone. */
@media only screen and (max-width:620px){
  .cx-pad{padding:24px 20px 22px !important}
  .cx-gut{padding:20px 12px !important}
  .cx-h1{font-size:22px !important}
  .cx-btn a{display:block !important;text-align:center !important}
}
</style>
</head>
<body style="margin:0;padding:0;width:100%;background-color:${COLOR.paper};color:${COLOR.ink};-webkit-font-smoothing:antialiased;">

<!-- Shown in the inbox list beside the subject, never in the message itself. -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${escapeHtml(lead)}</div>
<!-- Spacer entities stop Gmail pulling body copy in after the preheader. -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLOR.paper};">
<tr>
<td align="center" class="cx-gut" style="padding:32px 16px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;">

<!-- MASTHEAD. The lockup as the product sets it: the Noon Dot mark IS the N,
     followed by ISHANY in the brand face.

     The masthead still may never depend on an image loading — most clients block
     them by default, and a grey box is worse than one made of type. So the mark is
     the only image in the message, and it is given two ways to fail into the
     letter it stands in for:

       A styled alt="N". Clients that block images draw the alt text with the
       styles carried on the image itself, so the letter arrives in the same
       face, size and blue as the run around it.

       An mso branch, because Word draws a placeholder icon rather than honour
       alt text. Outlook gets the letter directly and never sees the image.

     Images on, the mark. Images off or Outlook, NISHANY in letters—an
     approved lockup, not a fallback that looks
     broken. There is no state where the masthead is a hole.
     The word stays ink so it remains AA-safe in mail clients. -->
<tr>
<td style="padding:0 4px 14px;">
<span style="font-family:${BRAND};font-size:19px;font-weight:700;letter-spacing:0.025em;text-transform:uppercase;white-space:nowrap;mso-line-height-rule:exactly;line-height:19px;color:${COLOR.ink};"><!--[if !mso]><!--><img src="${MARK_URL}" width="24" height="24" alt="N" style="width:24px;height:24px;line-height:24px;vertical-align:-7px;border:0;outline:none;text-decoration:none;font-family:${BRAND};font-size:19px;font-weight:700;color:${COLOR.brandBlue};"><!--<![endif]--><!--[if mso]>N<![endif]-->ISHANY</span>
</td>
</tr>

<!-- The 3px rose rule is the one piece of brand chrome that renders identically
     everywhere, and what makes the message recognisable before a word is read. -->
<tr>
<td style="background-color:${COLOR.primary};border-radius:12px 12px 0 0;font-size:0;line-height:0;height:3px;">&nbsp;</td>
</tr>
<tr>
<td class="cx-pad" style="background-color:${COLOR.surface};border:1px solid ${COLOR.line};border-top:0;border-radius:0 0 12px 12px;padding:28px 32px 26px;">
${eyebrowHtml}
<h1 class="cx-h1" style="margin:0 0 14px;font-family:${SERIF};font-size:25px;font-weight:600;letter-spacing:-0.01em;color:${COLOR.ink};mso-line-height-rule:exactly;line-height:31px;">${escapeHtml(heading)}</h1>
${bodyHtml}
${actionHtml}
${detailsHtml}
${noteHtml}
</td>
</tr>

<!-- SIGN-OFF, outside the card and in the reader's own voice register. -->
<tr>
<td style="padding:18px 4px 0;font-family:${SANS};font-size:13px;color:${COLOR.ink2};mso-line-height-rule:exactly;line-height:20px;">
${escapeHtml(signOff)}
</td>
</tr>

<!-- FOOTER. Sender, real postal address, why this arrived, and the way out. At
     ink-2 rather than ink-3: these are the legally required sender identity and
     the unsubscribe rationale, the two lines that most need to be readable in a
     medium where the reader cannot zoom the page. -->
<tr>
<td style="padding:16px 4px 0;font-family:${SANS};font-size:12px;color:${COLOR.ink2};mso-line-height-rule:exactly;line-height:19px;">
${footerLines.map((line, index) => `<p style="margin:0 0 ${index === footerLines.length - 1 && !unsubscribeUrl ? '0' : '5px'};">${line}</p>`).join('\n')}
${unsubscribeUrl ? `<p style="margin:9px 0 0;"><a href="${escapeHtml(unsubscribeUrl)}" style="color:${COLOR.ink2};text-decoration:underline;">Unsubscribe from these emails</a></p>` : ''}
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>`

  const text = [
    heading,
    '',
    htmlToText(bodyHtml),
    action ? `\n${action.label}: ${action.url}` : '',
    facts.length ? `\n${facts.map((fact) => `${fact.label}: ${fact.value}`).join('\n')}` : '',
    note ? `\n${htmlToText(note)}` : '',
    '',
    signOff,
    '',
    '—',
    `${sender.name} · ${sender.postalAddress}`,
    unsubscribeUrl ? `Unsubscribe: ${unsubscribeUrl}` : '',
  ].filter((line) => line !== '').join('\n').replace(/\n{3,}/g, '\n\n').trim()

  return { html, text }
}

/**
 * Styling for the authored paragraphs.
 *
 * The author writes bare `<p>` and `<a>`; clients default those to Times New Roman
 * at odd margins, so each one is given its style on the element on the way out.
 * The title, the action, the facts and the note are blocks rather than markup, so
 * nothing here needs to know about them.
 */
export function styleBodyHtml(bodyHtml: string): string {
  return bodyHtml
    .replace(/<p>/g, `<p style="margin:0 0 12px;font-family:${SANS};font-size:15px;color:${COLOR.ink};mso-line-height-rule:exactly;line-height:24px;">`)
    .replace(/<a /g, `<a style="color:${COLOR.primaryStrong};text-decoration:underline;font-weight:500;" `)
    .replace(/<ul>/g, `<ul style="margin:0 0 12px;padding-left:20px;">`)
    .replace(/<li>/g, `<li style="margin:0 0 6px;font-family:${SANS};font-size:15px;color:${COLOR.ink};mso-line-height-rule:exactly;line-height:24px;">`)
}

/** The note carries links but never paragraphs; it is one quiet line. */
function styleNoteHtml(note: string): string {
  return note.replace(/<a /g, `<a style="color:${COLOR.primaryStrong};text-decoration:underline;font-weight:500;" `)
}

/**
 * Which categories a reader may switch off.
 *
 * Account and billing mail is transactional: it is sent because something happened to
 * the reader's account, and suppressing it would be worse for them than for us. Only
 * the rest carries an unsubscribe link, and names its category in the footer so the
 * reader knows what they would be switching off.
 */
export const TRANSACTIONAL_CATEGORIES = new Set(['Onboarding', 'Billing & subscription', 'Security & account', 'Privacy & data'])

export function isTransactional(category: string): boolean {
  return TRANSACTIONAL_CATEGORIES.has(category)
}

/**
 * The categories whose title is already the whole point.
 *
 * "Reset your password" needs no label above it explaining that it concerns
 * security; the eyebrow would only delay the sentence the reader opened the
 * message for.
 */
const SILENT_EYEBROW = new Set(['Security & account'])

export function eyebrowFor(category: string): string | undefined {
  return SILENT_EYEBROW.has(category) ? undefined : category
}
