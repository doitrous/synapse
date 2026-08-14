import { normalizeProse } from './prose.ts'

/**
 * Plain text split into the blocks a note is made of.
 *
 * The notebook stores a plain string and always has, so this reads that string
 * rather than replacing it with a block schema — no migration, and a note
 * written before any of this still opens as what it was.
 *
 * Deliberately small: headings, lists, quotes, callouts, code and paragraphs.
 * Inline emphasis is left to the inline renderer, which already exists.
 */

export type NoteBlock =
  | { kind: 'heading'; level: 1 | 2 | 3; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; ordered: boolean; items: string[] }
  | { kind: 'quote'; lines: string[] }
  | { kind: 'callout'; tone: CalloutTone; title: string; lines: string[] }
  | { kind: 'code'; lines: string[] }
  | { kind: 'divider' }

export type CalloutTone = 'note' | 'warning' | 'success'

/** `> [!warning] Title` — the convention shared with common note apps. */
const CALLOUT_RE = /^>\s*\[!(note|info|warning|caution|success|tip)\]\s*(.*)$/i

const TONE_FOR: Record<string, CalloutTone> = {
  note: 'note', info: 'note', tip: 'success', success: 'success', warning: 'warning', caution: 'warning',
}

export function parseNoteBlocks(source: string): NoteBlock[] {
  // Split raw, then normalise only the blocks that are prose. Normalising up
  // front would curl the quotes inside a code fence, which is exactly what a
  // code fence exists to prevent.
  const lines = source.split('\n')
  const blocks: NoteBlock[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index]

    if (!line.trim()) { index += 1; continue }

    // Fenced code is taken verbatim: normalising quotes inside it would be wrong,
    // but the fence is rare enough in notes that re-splitting is cheaper than
    // threading a "skip" flag through the whole pass.
    if (line.trimStart().startsWith('```')) {
      const body: string[] = []
      index += 1
      while (index < lines.length && !lines[index].trimStart().startsWith('```')) {
        body.push(lines[index])
        index += 1
      }
      index += 1
      blocks.push({ kind: 'code', lines: body })
      continue
    }

    if (/^\s*(-{3,}|\*{3,})\s*$/.test(line)) { blocks.push({ kind: 'divider' }); index += 1; continue }

    const heading = line.match(/^(#{1,3})\s+(.*)$/)
    if (heading) {
      blocks.push({ kind: 'heading', level: heading[1].length as 1 | 2 | 3, text: normalizeProse(heading[2].trim()) })
      index += 1
      continue
    }

    const callout = line.match(CALLOUT_RE)
    if (callout) {
      const tone = TONE_FOR[callout[1].toLowerCase()] ?? 'note'
      const title = normalizeProse(callout[2].trim())
      const body: string[] = []
      index += 1
      while (index < lines.length && lines[index].startsWith('>')) {
        body.push(normalizeProse(lines[index].replace(/^>\s?/, '')))
        index += 1
      }
      blocks.push({ kind: 'callout', tone, title, lines: body })
      continue
    }

    if (line.startsWith('>')) {
      const body: string[] = []
      while (index < lines.length && lines[index].startsWith('>')) {
        body.push(normalizeProse(lines[index].replace(/^>\s?/, '')))
        index += 1
      }
      blocks.push({ kind: 'quote', lines: body })
      continue
    }

    const bullet = /^\s*[-*]\s+(.*)$/
    const numbered = /^\s*\d+[.)]\s+(.*)$/
    if (bullet.test(line) || numbered.test(line)) {
      const ordered = !bullet.test(line)
      const pattern = ordered ? numbered : bullet
      const items: string[] = []
      while (index < lines.length && pattern.test(lines[index])) {
        items.push(normalizeProse(lines[index].match(pattern)![1].trim()))
        index += 1
      }
      blocks.push({ kind: 'list', ordered, items })
      continue
    }

    // A paragraph runs until a blank line or the start of another block.
    const paragraph: string[] = []
    while (
      index < lines.length
      && lines[index].trim()
      && !/^(#{1,3}\s|>|\s*[-*]\s|\s*\d+[.)]\s|```)/.test(lines[index])
      && !/^\s*(-{3,}|\*{3,})\s*$/.test(lines[index])
    ) {
      paragraph.push(lines[index])
      index += 1
    }
    if (paragraph.length) blocks.push({ kind: 'paragraph', text: normalizeProse(paragraph.join(' ')) })
    else index += 1
  }

  return blocks
}

/**
 * Wrap or unwrap the selection with a marker, the way an editor's bold button
 * behaves. Returns the new text and where the selection should end up.
 */
export function toggleWrap(value: string, start: number, end: number, marker: string) {
  const selected = value.slice(start, end)
  const before = value.slice(0, start)
  const after = value.slice(end)

  if (before.endsWith(marker) && after.startsWith(marker)) {
    return {
      value: before.slice(0, -marker.length) + selected + after.slice(marker.length),
      start: start - marker.length,
      end: end - marker.length,
    }
  }
  if (selected.startsWith(marker) && selected.endsWith(marker) && selected.length > marker.length * 2) {
    const inner = selected.slice(marker.length, -marker.length)
    return { value: before + inner + after, start, end: start + inner.length }
  }
  return {
    value: `${before}${marker}${selected}${marker}${after}`,
    start: start + marker.length,
    end: end + marker.length,
  }
}

/** Put a prefix on every line the selection touches, or take it off again. */
export function toggleLinePrefix(value: string, start: number, end: number, prefix: string) {
  const lineStart = value.lastIndexOf('\n', start - 1) + 1
  const lineEnd = value.indexOf('\n', end) === -1 ? value.length : value.indexOf('\n', end)
  const target = value.slice(lineStart, lineEnd)
  const lines = target.split('\n')
  const allPrefixed = lines.every((line) => line.startsWith(prefix))
  const next = lines
    .map((line) => (allPrefixed ? line.slice(prefix.length) : `${prefix}${line}`))
    .join('\n')
  const delta = next.length - target.length
  return {
    value: value.slice(0, lineStart) + next + value.slice(lineEnd),
    start: lineStart,
    end: end + delta,
  }
}

/**
 * What pressing Enter should insert.
 *
 * Continuing a list is the behaviour every note app has; leaving an empty item
 * ends the list rather than adding another empty one, which is how people
 * actually stop.
 */
export function continueList(value: string, caret: number): { value: string; caret: number } | null {
  const lineStart = value.lastIndexOf('\n', caret - 1) + 1
  const line = value.slice(lineStart, caret)

  const bullet = line.match(/^(\s*)([-*])\s+(.*)$/)
  if (bullet) {
    if (!bullet[3].trim()) {
      return { value: value.slice(0, lineStart) + value.slice(caret), caret: lineStart }
    }
    const insert = `\n${bullet[1]}${bullet[2]} `
    return { value: value.slice(0, caret) + insert + value.slice(caret), caret: caret + insert.length }
  }

  const numbered = line.match(/^(\s*)(\d+)([.)])\s+(.*)$/)
  if (numbered) {
    if (!numbered[4].trim()) {
      return { value: value.slice(0, lineStart) + value.slice(caret), caret: lineStart }
    }
    const insert = `\n${numbered[1]}${Number(numbered[2]) + 1}${numbered[3]} `
    return { value: value.slice(0, caret) + insert + value.slice(caret), caret: caret + insert.length }
  }

  return null
}
