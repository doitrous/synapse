/**
 * Parsers for plain text / CSV / TSV deck import formats.
 *
 * Pure string parsing, no dependency on the Anki binary (.apkg) pipeline.
 * `front`/`back` strings returned here are RAW — not HTML-escaped or
 * sanitized. A later mapper/commit stage is responsible for safety.
 */

export interface ParsedRow {
  front: string
  back: string
  tags: string[]
}

export type TextFormat = 'pipe' | 'csv' | 'anki'

/**
 * RFC-4180-style delimited text splitter. Handles double-quoted fields,
 * embedded delimiters/newlines inside quotes, and `""` as an escaped quote.
 * Rows are split on bare `\n` or `\r\n` (not inside quotes). Trailing
 * fully-blank rows are dropped.
 */
function splitDelimited(text: string, delim: string): string[][] {
  const records: string[][] = []
  let row: string[] = []
  let value = ''
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (c === '"') {
      if (quoted && text[i + 1] === '"') {
        value += '"'
        i++
      } else {
        quoted = !quoted
      }
    } else if (c === delim && !quoted) {
      row.push(value)
      value = ''
    } else if ((c === '\n' || c === '\r') && !quoted) {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(value)
      value = ''
      if (row.some((x) => x !== '')) records.push(row)
      row = []
    } else {
      value += c
    }
  }
  row.push(value)
  if (row.some((x) => x !== '')) records.push(row)
  return records
}

/** One card per line, `front | back`. Splits on the FIRST `|` only. */
export function parsePipeLines(text: string): ParsedRow[] {
  const rows: ParsedRow[] = []
  for (const rawLine of text.split(/\r\n|\r|\n/)) {
    const line = rawLine.trim()
    if (!line) continue
    const pipeIndex = line.indexOf('|')
    if (pipeIndex === -1) {
      rows.push({ front: line, back: '', tags: [] })
    } else {
      const front = line.slice(0, pipeIndex).trim()
      const back = line.slice(pipeIndex + 1).trim()
      rows.push({ front, back, tags: [] })
    }
  }
  return rows
}

/** CSV with a header row naming `front`/`back`/`tags` columns (any order/case). */
export function parseFrontBackTagsCsv(text: string): ParsedRow[] {
  const records = splitDelimited(text, ',').map((row) => row.map((cell) => cell.trim()))
  if (records.length === 0) return []
  const header = records[0].map((h) => h.trim().toLowerCase())
  const frontIdx = header.indexOf('front')
  const backIdx = header.indexOf('back')
  const tagsIdx = header.indexOf('tags')
  const rows: ParsedRow[] = []
  for (const record of records.slice(1)) {
    const front = frontIdx >= 0 ? (record[frontIdx] ?? '') : ''
    const back = backIdx >= 0 ? (record[backIdx] ?? '') : ''
    const tagsRaw = tagsIdx >= 0 ? (record[tagsIdx] ?? '') : ''
    const tags = tagsRaw.split(/\s+/).filter(Boolean)
    rows.push({ front, back, tags })
  }
  return rows
}

const SEPARATOR_ALIASES: Record<string, string> = {
  tab: '\t',
  comma: ',',
  semicolon: ';',
  ';': ';',
}

/**
 * Anki-style export text: leading `#key:value` header lines followed by
 * delimited data rows (no column header row — position-based).
 *
 * Recognized headers:
 * - `#separator:<tab|comma|;|<literal char>>` — data column delimiter (default tab)
 * - `#tags column:N` — 1-indexed column holding space-separated tags
 * - `#html:true` — passthrough, does not affect parsing here
 * - Any other `#`-prefixed line is treated as a comment and skipped
 */
export function parseAnkiCsv(text: string): ParsedRow[] {
  const lines = text.split(/\r\n|\r|\n/)
  let separator = '\t'
  let tagsColumn = -1 // 1-indexed; -1 means none
  let bodyStart = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!line.startsWith('#')) {
      bodyStart = i
      break
    }
    bodyStart = i + 1
    const match = line.match(/^#\s*([^:]+):(.*)$/)
    if (!match) continue
    const key = match[1].trim().toLowerCase()
    const value = match[2].trim()
    if (key === 'separator') {
      separator = SEPARATOR_ALIASES[value.toLowerCase()] ?? (value || '\t')
    } else if (key === 'tags column') {
      const n = Number.parseInt(value, 10)
      if (!Number.isNaN(n)) tagsColumn = n
    }
    // 'html' and any other keys: passthrough / ignored for parsing purposes.
  }

  const body = lines.slice(bodyStart).join('\n')
  const records = splitDelimited(body, separator)
  const rows: ParsedRow[] = []
  for (const record of records) {
    const front = (record[0] ?? '').trim()
    const back = (record[1] ?? '').trim()
    let tags: string[] = []
    if (tagsColumn > 0) {
      const tagsRaw = record[tagsColumn - 1] ?? ''
      tags = tagsRaw.trim().split(/\s+/).filter(Boolean)
    }
    rows.push({ front, back, tags })
  }
  return rows
}

/**
 * Sniffs which parser a block of pasted/uploaded text needs:
 * - Leading `#`-header lines => 'anki'
 * - A first line naming `front`/`back` (comma-separated) => 'csv'
 * - Otherwise => 'pipe'
 */
export function detectTextFormat(text: string): TextFormat {
  const trimmed = text.trimStart()
  if (trimmed.startsWith('#')) return 'anki'
  const firstLine = trimmed.split(/\r\n|\r|\n/)[0] ?? ''
  const headerCells = firstLine.split(',').map((c) => c.trim().toLowerCase())
  if (headerCells.includes('front') && headerCells.includes('back')) return 'csv'
  return 'pipe'
}
