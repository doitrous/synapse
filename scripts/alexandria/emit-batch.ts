/**
 * `batchFile` — the one place every generated Alexandria batch passes through.
 *
 * Extracted from `scripts/kasr/emit.ts`'s exported `batchFile` (and the
 * `TEXT_COLUMNS` list it checks against) at commit `c0a3709`
 * (`git show c0a3709:scripts/kasr/emit.ts`). Only that one function and its
 * one constant are copied here, deliberately, rather than importing
 * `scripts/kasr/emit.ts` directly: the rest of that file pulls in
 * `./seeds/types.ts`, which is where `mintConceptId` / `mintQuestionId` live —
 * the `kau:`-flavoured mint LANE-BRIEF.md §4 says this lane must not copy.
 * Alexandria mints with the manual's own `tools/mint-concept-id.mjs` instead.
 * `batchFile` itself has no mint dependency — it only wraps a header and a
 * list of already-built blocks and refuses a `[clear]` sentinel in a text
 * column — so lifting it alone keeps `build-evidence.ts` and `build-spans.ts`
 * working without dragging in anything Kasr-specific.
 *
 * `TEXT_COLUMNS` must be kept in sync with `scripts/kasr/emit.ts`'s own list;
 * if that list changes upstream and a future evidence file starts emitting
 * `[clear]` in a column added there, that column's copy belongs here too.
 */

/**
 * Columns that hold free text, never a list. `[clear]` in one of these is
 * always a mistake — `text()` (the importer's reader for these columns) does
 * not recognise the sentinel, so it would be stored as the literal four
 * characters and pass every validator silently. `batchFile` refuses to write
 * a batch that does that.
 */
const TEXT_COLUMNS = [
  'arabic_label', 'canonical_key', 'concept_type', 'definition',
  'editorial_review_status', 'exclusion_reason', 'explicit_objective',
  'final_publisher', 'id', 'label', 'last_reviewed', 'owner', 'pitfalls',
  'primary_node_id', 'publication_status', 'review_due', 'reviewer',
  'support_mode',
]

/**
 * A batch file: a comment explaining itself, then the items.
 *
 * Refuses to produce a batch that puts a list sentinel in a text column. This
 * is the one place every generated batch passes through, which is what makes
 * it the right place for the check — a rule written in a comment is followed
 * by whoever read the comment, and this is followed by everyone.
 */
export const batchFile = (header: string, blocks: string[]) => {
  const text = `<!--\n${header.trim().split('\n').map((line) => `  ${line}`.trimEnd()).join('\n')}\n-->\n\n`
    + blocks.join('\n\n---\n\n') + '\n'

  const offenders = TEXT_COLUMNS
    .filter((column) => new RegExp(`^## ${column}\\n\\[clear\\]$`, 'm').test(text))
  if (offenders.length) {
    throw new Error(
      `refusing to write a batch: ${offenders.join(', ')} carr${offenders.length === 1 ? 'ies' : 'y'} `
      + '"[clear]", which is a LIST sentinel. `text()` does not read it, so it would be stored as '
      + 'the literal four characters and pass every validator. Emit the key with nothing under it '
      + 'instead — the parser still counts the column, and `materialiseNewConcept` writes the null.')
  }
  return text
}
