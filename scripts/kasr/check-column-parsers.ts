/**
 * Which columns are lists and which are text — measured, not read.
 *
 *   node --experimental-strip-types scripts/kasr/check-column-parsers.ts \
 *     docs/Kasr-Source-Imports/concept/102-INT-concepts.md
 *
 * `[clear]` is a **list** sentinel. `optionalList` reads it and stores `[]`;
 * `text()` never looks for it and stores the literal four characters — which
 * then *passes* the audit, because the field is non-empty. The mirror-image
 * error is as bad and less visible: an empty block on a **list** column stores
 * `null` where `[]` is the accurate statement, so "no aliases" becomes
 * indistinguishable from "nobody considered aliases".
 *
 * Both were found by hand-mapping columns to parsers, which is a reading of the
 * source and goes stale the moment somebody changes a parser without changing a
 * column name. This measures instead: **send a probe value containing a `|`
 * through `conceptFromRow` for every column and look at what comes back.** A
 * list parser splits it into two; a text parser keeps it whole. No knowledge of
 * which columns are which is required, and the answer cannot drift from the
 * code because it *is* the code.
 *
 * Every one of these errors is invisible in the batch file and several pass the
 * audit, so the rule this enforces is: argue from the stored value, and only
 * from the stored value.
 */
import { readFileSync } from 'node:fs'
import { CONCEPT_IMPORT_FIELDS, conceptFromRow } from '../../src/data/conceptImport.ts'

const file = process.argv[2]
if (!file) throw new Error('usage: check-column-parsers.ts <concept-batch.md>')

/** Two values a list parser will split and a text parser will not. */
const PROBE = 'KASRPROBEALPHA | KASRPROBEBETA'

/** Every column, classified by what the importer does with the probe. */
const lists = new Set<string>()
const texts = new Set<string>()
for (const field of CONCEPT_IMPORT_FIELDS) {
  const stored = conceptFromRow({ [field.key]: PROBE } as Record<string, string>) as Record<string, unknown>
  const value = Object.values(stored).find((one) =>
    (Array.isArray(one) && one.some((item) => String(item).includes('KASRPROBE')))
    || (typeof one === 'string' && one.includes('KASRPROBE')))
  if (Array.isArray(value)) lists.add(field.key)
  else if (typeof value === 'string') texts.add(field.key)
  // Anything else is a column the probe does not reach — a number, an enum, a
  // resolver. Neither sentinel applies, so it is not this check's business.
}

/** The batch, parsed the way the validator parses it. */
const rows = readFileSync(file, 'utf8')
  .split(/^\s*---\s*$/m).map((part) => part.trim()).filter(Boolean)
  .map((document) => {
    const result: Record<string, string> = {}
    const matcher = /^##[ \t]*(.+?)[ \t]*\r?\n([\s\S]*?)(?=\r?\n##[ \t]|(?![\s\S]))/gm
    let match
    while ((match = matcher.exec(document))) {
      result[match[1].trim().toLowerCase().replace(/[\s-]+/g, '_')] = match[2].trim()
    }
    return result
  })

const wrongSentinel: string[] = []   // `[clear]` on a text column
const wrongBlank: string[] = []      // empty block on a list column

for (const [index, row] of rows.entries()) {
  const where = `item ${index + 1} (${row.id ?? row.label?.slice(0, 40) ?? '?'})`
  for (const [key, value] of Object.entries(row)) {
    if (value === '[clear]' && texts.has(key)) {
      wrongSentinel.push(`${where}: ${key} — text column holding the literal "[clear]"`)
    }
    if (value === '' && lists.has(key)) {
      wrongBlank.push(`${where}: ${key} — list column left blank; "[clear]" is what says deliberately empty`)
    }
  }
}

console.log(JSON.stringify({
  file,
  items: rows.length,
  listColumns: lists.size,
  textColumns: texts.size,
  sentinelInTextColumn: wrongSentinel.length,
  blankInListColumn: wrongBlank.length,
}, null, 1))
for (const line of [...wrongSentinel, ...wrongBlank].slice(0, 40)) console.log(`  ${line}`)
if (wrongSentinel.length || wrongBlank.length) process.exit(1)
