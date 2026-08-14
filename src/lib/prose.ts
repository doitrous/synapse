/**
 * Typographic normalisation for authored prose.
 *
 * Nothing in the student app ever cleaned up content text: `bodyToBlocks` split
 * on blank lines and trimmed, and the reader rendered raw strings. Meanwhile the
 * app's own chrome is written with curly quotes, so an article that quoted a
 * patient — `her heart keeps "jumping"` — put straight ASCII quotes next to
 * typographic ones in the same paragraph. That reads as broken formatting, and
 * it is why quoted phrases looked unstyled.
 *
 * This runs at projection time so every surface benefits at once, and it is
 * deliberately conservative: it changes punctuation, never words.
 */

/** The handful of entities that actually turn up in imported content. */
const ENTITIES: Record<string, string> = {
  amp: '&',
  quot: '"',
  apos: "'",
  lt: '<',
  gt: '>',
  nbsp: ' ',
  ldquo: '“',
  rdquo: '”',
  lsquo: '‘',
  rsquo: '’',
  mdash: '—',
  ndash: '–',
  hellip: '…',
  deg: '°',
  micro: 'µ',
  times: '×',
}

/**
 * Undo a single round of HTML escaping.
 *
 * `&amp;` is resolved in the same pass as everything else rather than first, so
 * a literal `&amp;quot;` in the source stays the text `&quot;` instead of
 * silently becoming a quote character.
 */
export function decodeEntities(text: string): string {
  return text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, body: string) => {
    if (body.startsWith('#')) {
      const code = body[1] === 'x' || body[1] === 'X'
        ? Number.parseInt(body.slice(2), 16)
        : Number.parseInt(body.slice(1), 10)
      if (!Number.isFinite(code) || code <= 0 || code > 0x10ffff) return match
      try { return String.fromCodePoint(code) } catch { return match }
    }
    const named = ENTITIES[body.toLowerCase()]
    return named ?? match
  })
}

/** Characters after which a quote is opening rather than closing. */
const OPENS_AFTER = new Set([' ', '\t', '\n', '\r', '(', '[', '{', ' ', '—', '–', '/', '“', '‘'])

/**
 * Straight quotes become typographic ones, decided by what precedes them.
 *
 * A double quote at the start of a run, or after a space or an opening bracket,
 * opens; anything else closes. A single quote after a letter or digit is an
 * apostrophe (`don't`, `patient's`, `'90s` is the known miss), otherwise it
 * opens.
 */
export function curlyQuotes(text: string): string {
  let out = ''
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    const previous = i === 0 ? '' : text[i - 1]
    if (char === '"') {
      out += i === 0 || OPENS_AFTER.has(previous) ? '“' : '”'
    } else if (char === "'") {
      const afterWord = /[A-Za-z0-9؀-ۿ]/.test(previous)
      out += afterWord ? '’' : (i === 0 || OPENS_AFTER.has(previous) ? '‘' : '’')
    } else {
      out += char
    }
  }
  return out
}

/**
 * Dashes and ellipses.
 *
 * Only a spaced `--` becomes an em dash: an unspaced one is far more likely to
 * be a range, an identifier or a command-line flag than a punctuation mark
 * somebody typed twice.
 */
export function normalizeDashes(text: string): string {
  return text
    .replace(/ +-- +/g, '—')
    // Both edges are guarded, so a longer run of dots is left alone rather than
    // having an ellipsis taken out of the middle of it.
    .replace(/(?<!\.)\.{3}(?!\.)/g, '…')
}

/**
 * The whole pass, in the order the steps depend on each other: entities first,
 * so `&quot;` is a quote by the time quotes are being decided.
 */
export function normalizeProse(text: string): string {
  if (!text) return text
  return normalizeDashes(curlyQuotes(decodeEntities(text)))
}
