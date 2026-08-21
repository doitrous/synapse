/**
 * Every source ID the Kasr corpus actually contains.
 *
 *   node --experimental-strip-types scripts/kasr/build-source-index.ts
 *
 * `validate-content-batch.mjs` refuses a `src_…` it cannot check, and it looks
 * for this file beside the batch: `<import root>/evidence/corpus-source-index.json`.
 * Without it every resource record in this programme comes back "cannot be
 * checked — an unchecked source ID is how three invented ones got through
 * before", which is the right refusal and the wrong reason.
 *
 * The existing index at `docs/medical-library-program/evidence/` holds 267
 * sources and **not one of them is from this corpus**. So a Kasr batch was not
 * failing a check; it had no check to fail. This is that corpus's own index,
 * generated from the manifest so the two cannot disagree.
 *
 * Keyed by source ID, one entry per FILE. The manifest holds one row per path,
 * and IDs are content-addressed, so the same bytes filed under two names give
 * two rows and one entry — which is the point: the validator compares a batch's
 * `source_relative_path` against this, and an index with one path per ID agrees
 * with it by construction where a per-row map cannot.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

interface Row {
  sourceId: string; sha256: string; fileName: string; corpusRelativePath: string | null
  fileType: string; pageCount: number | null; textLayer: string | null
  oldSystemExcluded?: boolean; exclusionReason?: string | null
}

const manifest = JSON.parse(readFileSync('docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json', 'utf8'))

const sources: Record<string, unknown> = {}
const duplicated: string[] = []
let excluded = 0

for (const row of manifest.sources as Row[]) {
  if (sources[row.sourceId]) { duplicated.push(row.sourceId); continue }
  // An excluded file is still IN the corpus. Leaving it out would make a batch
  // that names it fail as "not a source the corpus contains", which is a
  // different and false statement from "excluded on purpose".
  if (row.oldSystemExcluded) excluded += 1
  sources[row.sourceId] = {
    sourceRelativePath: row.corpusRelativePath ?? row.fileName,
    sha256: row.sha256,
    processingStatus: row.oldSystemExcluded ? 'excluded'
      : row.fileType !== 'pdf' ? 'not_extractable'
      : row.textLayer === 'none' ? 'ocr_required' : 'extracted',
    pageCount: row.pageCount ?? 0,
    languages: [/[؀-ۿ]/.test(row.fileName) ? 'ar' : 'en'],
    ...(row.oldSystemExcluded ? { exclusionReason: row.exclusionReason ?? 'OLD SYSTEM material, excluded from this programme' } : {}),
  }
}

const index = {
  note: 'Every source ID the Kasr Al Ainy corpus actually contains. A batch naming a src_ ID absent from '
    + 'here is naming a source that does not exist. Generated from '
    + 'docs/Kasr-Source-Imports/manifest/kasr-y1-sources.json by scripts/kasr/build-source-index.ts, so the '
    + 'two cannot disagree. One entry per file: IDs are content-addressed, so the same bytes filed under two '
    + 'names give two manifest rows and one entry here — which is what lets the validator compare a batch\'s '
    + 'source_relative_path against a single authoritative path.',
  count: Object.keys(sources).length,
  sources,
}

mkdirSync('docs/Kasr-Source-Imports/evidence', { recursive: true })
const out = 'docs/Kasr-Source-Imports/evidence/corpus-source-index.json'
writeFileSync(out, `${JSON.stringify(index, null, 1)}\n`)
console.log(`${index.count} sources (${manifest.sources.length} manifest rows, `
  + `${duplicated.length} duplicated, ${excluded} excluded) -> ${out}`)
