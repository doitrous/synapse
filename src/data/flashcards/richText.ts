/**
 * The one gate every stored rich field passes through.
 *
 * Card fronts, backs and cloze text carry formatting — bold, colour, sup/sub,
 * lists — and the spec is explicit that this must render safely and never allow
 * arbitrary executable HTML. So the stored value is HTML, but only ever HTML
 * that has been through `sanitizeRich`: a strict allowlist of tags and, on the
 * two tags that take them, a strict allowlist of style properties and link
 * schemes. Anything outside the list is dropped, `<script>`/`<style>` are
 * dropped content and all, event-handler attributes never survive, and text is
 * escaped. Default-deny, then reconstruct — never "strip the bad bits", because
 * a blocklist is a list of the attacks you thought of.
 *
 * Everything here is pure string work with no DOM, so the XSS vectors are pinned
 * by tests that run in plain Node alongside the rest of the suite.
 */

/** Inline and block tags a field may contain. Everything else is removed. */
const ALLOWED_TAGS = new Set([
  'b', 'strong', 'i', 'em', 'u', 's', 'sup', 'sub', 'mark', 'br',
  'span', 'p', 'div', 'ul', 'ol', 'li', 'a', 'img',
])

/** Tags whose entire contents are dropped, not just the tag. */
const DROP_CONTENT_TAGS = new Set(['script', 'style', 'iframe', 'object', 'embed', 'noscript', 'template'])

const VOID_TAGS = new Set(['br'])

/** Style properties allowed on `span`/`mark`, each with a strict value test. */
const STYLE_RULES: Record<string, RegExp> = {
  color: /^#[0-9a-f]{3,8}$|^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$|^[a-z]{3,20}$/i,
  'background-color': /^#[0-9a-f]{3,8}$|^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$|^[a-z]{3,20}$/i,
  'font-weight': /^(bold|normal|[1-9]00)$/i,
  'font-style': /^(italic|normal)$/i,
  'font-size': /^(0?\.\d+|\d{1,3}(\.\d+)?)(px|em|rem|%)$/i,
  'font-family': /^[\w\s,'"-]{1,80}$/,
  'text-decoration': /^(underline|line-through|none)$/i,
}

const TOKEN_RE = /<\/?([a-zA-Z][a-zA-Z0-9]*)((?:[^>"']|"[^"]*"|'[^']*')*)\/?>|<!--[\s\S]*?-->/g

/** An `&` that does **not** already open an entity — the only kind to escape. */
const BARE_AMPERSAND = /&(?!(?:[a-zA-Z][a-zA-Z0-9]{1,30}|#\d{1,7}|#[xX][0-9a-fA-F]{1,6});)/g

/** Any entity shape — the mark of a value that has already been through here. */
const ANY_ENTITY = /&(?:[a-zA-Z][a-zA-Z0-9]{1,30}|#\d{1,7}|#[xX][0-9a-fA-F]{1,6});/

/**
 * Escape text for HTML — **idempotently**.
 *
 * `<`, `>` and `"` are always escaped: nothing that could open a tag or close
 * an attribute is ever left alone. `&` is escaped only when it does not already
 * open an entity, and that one exception is what makes this safe to run twice.
 * It has to be safe to run twice: `sanitizeRich` runs on the way *in* (the
 * editor) and again on the way *out* (`RichHtml` re-sanitizes as defence in
 * depth), so a blanket `&` → `&amp;` added one layer per save and per render
 * until a card that said `a & b` read `a &amp;amp; b`. Preserving an entity is
 * not a hole — a surviving `&lt;script&gt;` is inert text, exactly as before.
 */
export function escapeHtml(text: string): string {
  return text
    .replace(BARE_AMPERSAND, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * True when a stored field predates the rich editor: no tag and no entity, so
 * every `<`, `>` and `&` in it is a literal the student typed.
 *
 * Two callers depend on it. The editor must `escapeHtml` such a value before
 * seeding it into a `contentEditable`, or the browser eats `a <b c` as markup.
 * The cloze parser must not read `a < b && c > d` as a tag when it projects
 * text. A value holding either a tag or an entity is already HTML and must be
 * left exactly as it is — escaping that again would show its own markup.
 */
const REAL_TAG = /<\/?(?:b|i|u|s|strong|em|sup|sub|span|div|p|br|ul|ol|li|mark|font|a|img|code|pre|blockquote|h[1-6]|hr)\b[^<>]*>/i

export function isLegacyPlainText(value: string): boolean {
  // A bare `<` followed by a letter is not enough — "K<Na, so >140" and
  // "a <b c" are things a student types. Only a complete allowlisted tag
  // (or an entity) proves the value has already been through the editor.
  return !REAL_TAG.test(value) && !ANY_ENTITY.test(value)
}

/**
 * Return a safe HTML string built only from allowed tags/attributes. The input
 * is treated as untrusted: unknown tags vanish, dangerous tags take their
 * content with them, and the tag stack is balanced so no unclosed element can
 * leak formatting past the field.
 */
export function sanitizeRich(html: string): string {
  if (!html) return ''
  let out = ''
  let last = 0
  let skipUntil: string | null = null
  const stack: string[] = []
  let match: RegExpExecArray | null
  TOKEN_RE.lastIndex = 0

  while ((match = TOKEN_RE.exec(html)) !== null) {
    const raw = match[0]
    const between = html.slice(last, match.index)
    last = TOKEN_RE.lastIndex

    if (skipUntil) {
      // Inside a drop-content tag: swallow text and wait for the close tag.
      if (raw.toLowerCase() === `</${skipUntil}>`) skipUntil = null
      continue
    }
    if (between) out += escapeHtml(between)
    if (raw.startsWith('<!--')) continue

    const name = match[1]?.toLowerCase()
    if (!name) continue
    const closing = raw.startsWith('</')

    if (DROP_CONTENT_TAGS.has(name)) {
      if (!closing && !raw.endsWith('/>')) skipUntil = name
      continue
    }
    if (!ALLOWED_TAGS.has(name)) continue

    if (closing) {
      const idx = stack.lastIndexOf(name)
      if (idx === -1) continue
      // Close everything opened after it too, keeping the tree balanced.
      for (let i = stack.length - 1; i >= idx; i--) out += `</${stack[i]}>`
      stack.splice(idx)
      continue
    }

    if (name === 'img') {
      // A separate path, not the generic attrs/void machinery below: an <img>
      // is only ever kept when its src is a recognized media reference, and
      // when it isn't the whole tag is dropped — not just the bad attribute.
      const imgAttrs = sanitizeImgAttrs(match[2] ?? '')
      if (imgAttrs) out += `<img${imgAttrs}>`
      continue
    }

    const attrs = sanitizeAttrs(name, match[2] ?? '')
    if (VOID_TAGS.has(name)) {
      out += `<${name}${attrs}>`
    } else {
      stack.push(name)
      out += `<${name}${attrs}>`
    }
  }

  if (last < html.length) out += escapeHtml(html.slice(last))
  for (let i = stack.length - 1; i >= 0; i--) out += `</${stack[i]}>`
  return out
}

function sanitizeAttrs(tag: string, rawAttrs: string): string {
  const attrRe = /([a-zA-Z-]+)\s*=\s*("([^"]*)"|'([^']*)')/g
  let result = ''
  let m: RegExpExecArray | null
  while ((m = attrRe.exec(rawAttrs)) !== null) {
    const attr = m[1].toLowerCase()
    const value = m[3] ?? m[4] ?? ''
    if (attr === 'href' && tag === 'a') {
      const safe = safeUrl(value)
      if (safe) result += ` href="${escapeHtml(safe)}"`
    } else if (attr === 'style' && (tag === 'span' || tag === 'mark' || tag === 'p' || tag === 'div')) {
      const style = sanitizeStyle(value)
      if (style) result += ` style="${escapeHtml(style)}"`
    }
    // Every other attribute (class, on*, id, data-*, src, …) is dropped.
  }
  return result
}

/**
 * An `<img>` is kept only when `src` is a reference this app itself resolves
 * media through — never an arbitrary remote URL or `data:` blob, both of
 * which would let a malicious import phone home or smuggle a payload. The
 * three forms mirror `isStoredMediaReference` (`src/lib/mediaStorage.ts`),
 * its `/media/…` managed-media matcher, and the `synapse-doc:` prefix a
 * later task mints for document-embedded media — this file stays
 * dependency-free (no import of `mediaStorage.ts`, which pulls in
 * browser/Vite-only globals) so the same regex logic is inlined here.
 */
function isMediaReferenceSrc(value: string): boolean {
  // Current (`nishany-`) and pre-rebrand (`synapse-`) prefixes are both allowed,
  // so content saved before the rebrand still renders after sanitising.
  return (
    value.startsWith('nishany-media:') ||
    value.startsWith('synapse-media:') ||
    /^\/media\/[^/?#]+$/.test(value) ||
    /^nishany-doc:/.test(value) ||
    /^synapse-doc:/.test(value)
  )
}

const DIMENSION_RE = /^\d{1,4}%?$/

function sanitizeImgAttrs(rawAttrs: string): string | null {
  const attrRe = /([a-zA-Z-]+)\s*=\s*("([^"]*)"|'([^']*)')/g
  let src: string | null = null
  let alt: string | null = null
  let width: string | null = null
  let height: string | null = null
  let m: RegExpExecArray | null
  while ((m = attrRe.exec(rawAttrs)) !== null) {
    const attr = m[1].toLowerCase()
    const value = m[3] ?? m[4] ?? ''
    if (attr === 'src') src = value
    else if (attr === 'alt') alt = value
    else if (attr === 'width') width = value
    else if (attr === 'height') height = value
  }
  if (!src || !isMediaReferenceSrc(src)) return null

  let result = ` src="${escapeHtml(src)}"`
  if (alt !== null) result += ` alt="${escapeHtml(alt)}"`
  if (width !== null && DIMENSION_RE.test(width)) result += ` width="${escapeHtml(width)}"`
  if (height !== null && DIMENSION_RE.test(height)) result += ` height="${escapeHtml(height)}"`
  return result
}

function sanitizeStyle(value: string): string {
  const kept: string[] = []
  for (const decl of value.split(';')) {
    const idx = decl.indexOf(':')
    if (idx === -1) continue
    const prop = decl.slice(0, idx).trim().toLowerCase()
    const val = decl.slice(idx + 1).trim()
    const rule = STYLE_RULES[prop]
    if (rule && rule.test(val) && !/url\(|expression|javascript:/i.test(val)) {
      kept.push(`${prop}: ${val}`)
    }
  }
  return kept.join('; ')
}

function safeUrl(value: string): string | null {
  const trimmed = value.trim()
  // Reject control chars that could smuggle a scheme past the check.
  if (/[ -]/.test(trimmed)) return null
  if (/^(https?:|mailto:)/i.test(trimmed)) return trimmed
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) return trimmed
  return null
}

/**
 * The visible text of a rich field, tags removed and entities decoded, for
 * search, duplicate detection and plain contexts. Never used to re-render HTML.
 */
export function richToPlainText(html: string): string {
  const withoutDropped = html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
  const withoutTags = withoutDropped.replace(/<[^>]*>/g, '')
  return decodeEntities(withoutTags).replace(/\s+/g, ' ').trim()
}

/**
 * Decode the entities `escapeHtml` writes, plus `&nbsp;`. Exported for callers
 * that need the visible characters without `richToPlainText`'s whitespace
 * collapsing — `clozePlainText`, whose output must stay byte-identical to the
 * plain-text era for legacy notes.
 */
export function decodeEntities(text: string): string {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
}

/** True when a field has no visible content — for required-field validation. */
export function isRichEmpty(html: string): boolean {
  return richToPlainText(html) === '' && !/<(img|br)\b/i.test(html)
}
