/**
 * The small amount of inline markup authored content actually uses.
 *
 * Tokenised rather than turned into HTML: the result is rendered as React
 * elements, so there is no `dangerouslySetInnerHTML` anywhere near student
 * content and a stray `<script>` in an imported document stays text.
 *
 * Kept deliberately small. This is not a markdown implementation and should not
 * grow into one — it covers emphasis, code and links because those are what
 * appears in the corpus, and everything else is prose.
 */

export type InlineToken =
  | { kind: 'text'; text: string }
  | { kind: 'strong'; text: string }
  | { kind: 'em'; text: string }
  | { kind: 'code'; text: string }
  | { kind: 'link'; text: string; href: string }

/**
 * Only schemes that cannot execute. A `javascript:` or `data:` href in imported
 * content is rendered as plain text rather than as a link somebody could click.
 */
function safeHref(href: string): string | null {
  const trimmed = href.trim()
  if (/^(https?:|mailto:)/i.test(trimmed)) return trimmed
  // In-app paths are the other legitimate case.
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return trimmed
  return null
}

// Ordered: code first, so `**` inside a code span is not read as emphasis.
// `notAfter` stands in for a lookbehind (`(?<!\*)`): Safari only gained
// lookbehind in 16.4, and the supported floor is iOS 15.4, where the regex
// literal itself would fail to parse and take the whole chunk down with it.
const PATTERNS: Array<{ kind: InlineToken['kind']; re: RegExp; notAfter?: string }> = [
  { kind: 'code', re: /`([^`\n]+)`/g },
  { kind: 'link', re: /\[([^\]\n]+)\]\(([^)\s]+)\)/g },
  { kind: 'strong', re: /\*\*([^*\n]+)\*\*/g },
  { kind: 'em', re: /\*([^*\n]+)\*(?!\*)/g, notAfter: '*' },
]

/** First match of `re` in `input` not immediately preceded by `notAfter`. */
function findMatch(re: RegExp, input: string, notAfter?: string): RegExpExecArray | null {
  re.lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = re.exec(input))) {
    if (!notAfter || match.index === 0 || input[match.index - 1] !== notAfter) return match
    re.lastIndex = match.index + 1
  }
  return null
}

export function tokenizeInline(input: string): InlineToken[] {
  const tokens: InlineToken[] = []
  let rest = input

  while (rest) {
    let best: { index: number; length: number; token: InlineToken } | null = null

    for (const { kind, re, notAfter } of PATTERNS) {
      const match = findMatch(re, rest, notAfter)
      if (!match) continue
      if (best && match.index >= best.index) continue

      let token: InlineToken
      if (kind === 'link') {
        const href = safeHref(match[2])
        // An unusable href is not a link; keep the author's characters.
        if (!href) continue
        token = { kind: 'link', text: match[1], href }
      } else {
        token = { kind, text: match[1] } as InlineToken
      }
      best = { index: match.index, length: match[0].length, token }
    }

    if (!best) {
      tokens.push({ kind: 'text', text: rest })
      break
    }
    if (best.index > 0) tokens.push({ kind: 'text', text: rest.slice(0, best.index) })
    tokens.push(best.token)
    rest = rest.slice(best.index + best.length)
  }

  return tokens.filter((token) => token.kind !== 'text' || token.text !== '')
}

/** True when a string contains nothing this renderer would change. */
export function isPlainInline(input: string): boolean {
  return !/[`*[]/.test(input)
}
