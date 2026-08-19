/**
 * The wrapper every outbound email gets.
 *
 * Bodies are authored as a short run of `<p>` and `<a>`, and until now that run was
 * what went down the wire: no doctype, no width, no ground, no sender, no way out.
 * Mail clients render that as a full-bleed wall of Times New Roman, and filters read
 * an HTML-only message with no unsubscribe path as bulk mail from someone who has
 * not done this before.
 *
 * So the body stays plain and this supplies the rest. Choices that look old-fashioned
 * are deliberate — mail is not the web:
 *
 *   Tables, not flexbox. Outlook renders through Word, which has no float, no flex,
 *   and no grid. A single 600px centred table is the one layout every client agrees on.
 *
 *   Hex, not tokens. `var(--color-ink)` resolves to nothing in Gmail, and the reader's
 *   `data-theme` is unknowable, so the warm palette is written out literally.
 *
 *   Inline styles. Gmail strips `<style>` blocks on some clients and all of them on
 *   forwarded mail, so anything that must survive is on the element.
 *
 *   System fonts. Geist and Source Serif are web fonts that will not load; the
 *   fallback is what actually renders, so it is what is specified.
 *
 * Deliverability is mostly not markup — SPF, DKIM and DMARC are DNS records, and no
 * template can substitute for them. What a template *can* do is here: a real text
 * alternative, a preheader, an unsubscribe link on anything that is not transactional,
 * a physical sender, and no image-only content.
 */

/**
 * The light palette, resolved to literals. Kept in step with the `@theme` block
 * in index.css — mail clients strip custom properties, so these cannot be
 * tokens, and the only defence against drift is that they are named the same.
 * A message is always light: there is no theme attribute in an inbox.
 */
const COLOR = {
  paper: '#f5f7fb',
  surface: '#ffffff',
  ink: '#161920',
  ink2: '#5d636f',
  ink3: '#949aa8',
  line: '#e3e7ef',
  accent: '#d13a63',
  primaryStrong: '#a82449',
  primaryTint: '#fff5f5',
  onAccent: '#ffffff',
  /* The left hemisphere of the mark, for the logotype's CONNECT half. */
  brandBlue: '#1553b3',
}

const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
const SERIF = "Georgia, 'Times New Roman', Times, serif"
/** The logotype is set in Jost. No mail client will fetch a web font, so this
 *  falls back through the geometric sans-serifs that ship on real machines. */
const BRAND = "Jost, 'Century Gothic', 'Futura', 'Avenir Next', 'Trebuchet MS', sans-serif"

/** Who is sending, and from where. Required in most jurisdictions, and filters look. */
export interface EmailSender {
  name: string
  /** A real postal address. Bulk mail without one is a compliance and filtering risk. */
  postalAddress: string
}

export const DEFAULT_SENDER: EmailSender = {
  name: 'Connect Cortex',
  postalAddress: 'Cairo, Egypt',
}

export interface RenderEmailInput {
  /** Used for the preheader fallback and the plain-text subject line. */
  subject: string
  /** The authored body: simple HTML, already placeholder-filled. */
  bodyHtml: string
  /**
   * The grey line after the subject in an inbox list. Without one, clients grab the
   * first words of the body, which is usually "Hello Maya," — a wasted line.
   */
  preheader?: string
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

export function renderEmail({
  subject,
  bodyHtml,
  preheader,
  unsubscribeUrl,
  category,
  sender = DEFAULT_SENDER,
}: RenderEmailInput): RenderedEmail {
  // "Hello Maya," is the first line of almost every body, and it is exactly the
  // wasted inbox line a preheader exists to prevent — so the fallback skips
  // greetings and takes the first line that actually says something.
  const lead = preheader?.trim()
    || htmlToText(bodyHtml).split('\n').map((line) => line.trim()).find((line) => line.length > 24 && !/^(hi|hello|hey|dear)\b/i.test(line))
    || subject

  const footerLines = [
    `${escapeHtml(sender.name)} · ${escapeHtml(sender.postalAddress)}`,
    unsubscribeUrl
      ? `You are receiving this because you have a Connect Cortex account.${category ? ` This is a <strong style="font-weight:600;color:${COLOR.ink2}">${escapeHtml(category)}</strong> message.` : ''}`
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
<!--[if mso]><style>body,table,td{font-family:Arial,Helvetica,sans-serif !important}</style><![endif]-->
</head>
<body style="margin:0;padding:0;width:100%;background-color:${COLOR.paper};color:${COLOR.ink};-webkit-font-smoothing:antialiased;">
<!-- Shown in the inbox list beside the subject, never in the message itself. -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${escapeHtml(lead)}</div>
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLOR.paper};">
<tr>
<td align="center" style="padding:32px 16px;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;">

<!-- Wordmark. Text, not an image: images are blocked by default in most clients,
     and a masthead that renders as a grey box is worse than one made of letters. -->
<tr>
<td style="padding:0 4px 16px;">
<span style="font-family:${BRAND};font-size:19px;font-weight:500;letter-spacing:0.045em;text-transform:uppercase;"><span style="color:${COLOR.brandBlue};">Connect</span><span style="color:${COLOR.primaryStrong};">Cortex</span></span>
</td>
</tr>

<tr>
<td style="background-color:${COLOR.surface};border:1px solid ${COLOR.line};border-radius:12px;padding:32px 32px 28px;">
<div style="font-family:${SANS};font-size:15px;line-height:1.6;color:${COLOR.ink};">
${bodyHtml}
</div>
</td>
</tr>

<tr>
<td style="padding:20px 4px 0;font-family:${SANS};font-size:12px;line-height:1.6;color:${COLOR.ink3};">
${footerLines.map((line) => `<p style="margin:0 0 6px;">${line}</p>`).join('\n')}
${unsubscribeUrl ? `<p style="margin:10px 0 0;"><a href="${escapeHtml(unsubscribeUrl)}" style="color:${COLOR.ink2};text-decoration:underline;">Unsubscribe from these emails</a></p>` : ''}
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>`

  const text = [
    htmlToText(bodyHtml),
    '',
    '—',
    `${sender.name} · ${sender.postalAddress}`,
    unsubscribeUrl ? `Unsubscribe: ${unsubscribeUrl}` : '',
  ].filter(Boolean).join('\n')

  return { html, text }
}

/**
 * Styling for the authored body.
 *
 * The author writes bare `<p>` and `<a>`; clients default those to Times New Roman
 * at odd margins, so each one is given its style on the element on the way out.
 */
export function styleBodyHtml(bodyHtml: string): string {
  return bodyHtml
    .replace(/<p>/g, `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${COLOR.ink};">`)
    .replace(/<a /g, `<a style="color:${COLOR.primaryStrong};text-decoration:underline;font-weight:500;" `)
    .replace(/<h2>/g, `<h2 style="margin:0 0 12px;font-family:${SERIF};font-size:21px;font-weight:600;line-height:1.25;color:${COLOR.ink};">`)
    .replace(/<ul>/g, `<ul style="margin:0 0 14px;padding-left:20px;">`)
    .replace(/<li>/g, `<li style="margin:0 0 6px;font-size:15px;line-height:1.6;color:${COLOR.ink};">`)
}

/**
 * A single prominent action, for bodies that want one.
 *
 * Bulletproof in the Outlook sense: a table with a background colour rather than a
 * styled `<a>`, because Word ignores padding on inline elements and the button
 * collapses to a link.
 */
export function actionButton(label: string, url: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px;"><tr><td align="center" bgcolor="${COLOR.accent}" style="border-radius:8px;">
<a href="${escapeHtml(url)}" style="display:inline-block;padding:11px 22px;font-family:${SANS};font-size:14px;font-weight:600;color:${COLOR.onAccent};text-decoration:none;border-radius:8px;">${escapeHtml(label)}</a>
</td></tr></table>`
}

/**
 * Which categories a reader may switch off.
 *
 * Account and billing mail is transactional: it is sent because something happened to
 * the reader's account, and suppressing it would be worse for them than for us. Only
 * the rest carries an unsubscribe link.
 */
export const TRANSACTIONAL_CATEGORIES = new Set(['Onboarding', 'Billing & subscription', 'Security & account', 'Privacy & data'])

export function isTransactional(category: string): boolean {
  return TRANSACTIONAL_CATEGORIES.has(category)
}
