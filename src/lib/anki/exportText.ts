/**
 * Serializes a slice of a student's `FlashcardCollection` to the three plain
 * text deck-export shapes the flashcard page offers: pipe-delimited lines,
 * a `front,back,tags` CSV, and Anki's own `#separator:tab` TSV. Pure string
 * work, no dependency on the binary `.apkg`/sqlite pipeline in `sqljs.ts` —
 * a later UI task calls this directly to build a Blob for download.
 *
 * `pipe` and `csv` are read-anywhere plain text, so their fields are stripped
 * of HTML via `richToPlainText` (see `richText.ts`). `anki-tsv` sets
 * `#html:true`, Anki's own signal that field values are HTML, so those fields
 * keep their markup verbatim — a Cloze note's `{{c1::…}}` markup included, so
 * Anki's importer regenerates the same cloze cards it would from a native
 * export. The one exception: a raw tab or newline byte *inside* a field would
 * desync Anki's column split, so those are neutralized even in `anki-tsv`
 * (tab -> space, newline -> `<br>`, which is a no-op for how the HTML already
 * renders) — this is a deliberate, documented choice, not full compliance
 * with Anki's own field-escaping rules for exotic characters.
 */

import type { FlashcardCollection, Note } from '../../data/flashcards/model.ts'
import { richToPlainText } from '../../data/flashcards/richText.ts'

export type ExportTextFormat = 'anki-tsv' | 'csv' | 'pipe'

interface ExportRow {
  front: string
  back: string
  tags: string[]
}

/** Per note type, the two fields an export row is built from. Best-effort for
 * Image Occlusion: its media (image + occluder regions) isn't serialized to
 * text, only the header/back text fields — a round trip through these formats
 * necessarily loses the occlusion itself. */
function noteToRow(note: Note): ExportRow {
  if (note.type === 'basic') return { front: note.fields.front, back: note.fields.back, tags: note.tags }
  if (note.type === 'cloze') return { front: note.fields.text, back: note.fields.extra, tags: note.tags }
  return { front: note.fields.header, back: note.fields.back, tags: note.tags }
}

/** Rows in deck order (as given in `deckIds`, deduped), then by each note's
 * position in `collection.notes` — its insertion order — so output is
 * deterministic across runs for the same collection. */
function collectRows(collection: FlashcardCollection, deckIds: string[]): ExportRow[] {
  const orderedDeckIds = [...new Set(deckIds)]
  const byDeck = new Map<string, ExportRow[]>()
  for (const deckId of orderedDeckIds) byDeck.set(deckId, [])
  for (const note of Object.values(collection.notes)) {
    const bucket = byDeck.get(note.deckId)
    if (bucket) bucket.push(noteToRow(note))
  }
  return orderedDeckIds.flatMap((deckId) => byDeck.get(deckId) ?? [])
}

/** RFC-4180 field quoting: wrap in quotes and double any embedded quote when
 * the field contains a comma, quote, or newline; otherwise leave it bare. */
function csvField(value: string): string {
  if (/[",\r\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`
  return value
}

/** Neutralize the two bytes that would break an Anki TSV column split. A raw
 * tab becomes a space (there is no escape for a literal tab in a tab-
 * separated field); a raw newline becomes `<br>`, since the field is already
 * HTML under `#html:true` and `<br>` renders the same line break. */
function tsvSafeHtml(value: string): string {
  return value.replace(/\t/g, ' ').replace(/\r\n|\r|\n/g, '<br>')
}

export function exportDecksToText(
  collection: FlashcardCollection,
  deckIds: string[],
  format: ExportTextFormat,
): string {
  const rows = collectRows(collection, deckIds)

  if (format === 'pipe') {
    return rows.map((row) => `${richToPlainText(row.front)} | ${richToPlainText(row.back)}`).join('\n')
  }

  if (format === 'csv') {
    const lines = rows.map((row) =>
      [csvField(richToPlainText(row.front)), csvField(richToPlainText(row.back)), csvField(row.tags.join(' '))].join(
        ',',
      ),
    )
    return ['front,back,tags', ...lines].join('\n')
  }

  // anki-tsv
  const lines = rows.map((row) => [tsvSafeHtml(row.front), tsvSafeHtml(row.back), row.tags.join(' ')].join('\t'))
  return ['#separator:tab', '#html:true', ...lines].join('\n')
}
