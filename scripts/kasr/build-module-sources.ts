/**
 * The evidence chain for a module: sources, and the catalogue records beside them.
 *
 * Named `build-module-sources` rather than `build-evidence` because module 101
 * already has a `build-evidence.ts` that does something different — it derives
 * claims and citations from concept definitions. Two lanes wrote different
 * tools under one obvious name; the collision was found on merge, and renaming
 * the later one is cheaper than discovering at 2am which of them ran.
 *
 *   node --experimental-strip-types scripts/kasr/build-module-sources.ts "102 INT"
 *
 * A concept cannot pass `medical:audit` without one. `resourceIds` and
 * `atomicClaimIds` are both on `conceptPopulated` in
 * `scripts/audit-medical-content-fields.mjs`, so they must carry a value, and
 * every value must resolve — a resource against the evidence store, a claim
 * against a claim record. That makes `resource → claim → citation → concept`
 * load-bearing rather than decorative, and it is why the first pass of Year 1
 * concepts validated clean and audited badly.
 *
 * This file emits the two records that come from the **manifest** and can
 * therefore be generated: the evidence source and the catalogue resource. Every
 * value in them is copied from `kasr-y1-sources.json`, which is itself generated
 * from the files, so nothing here is authored and nothing can be invented — an
 * ID absent from the manifest is still an invented ID and is still refused.
 *
 * Claims and citations are **not** here, and deliberately. A citation's
 * `support_span` must be the source's own words, quoted rather than
 * paraphrased — "if you cannot quote it, you cannot cite it" — and a quotation
 * has to be read off the page by something that can read. Those come from the
 * seed files, which carry the quote and the page it was read at.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { MODULES } from './seeds/types.ts'
import { manifestFor, readManifest } from './manifest.ts'

const INDEX = 'docs/Kasr-Source-Imports/evidence/corpus-source-index.json'
const OUT = 'docs/Kasr-Source-Imports'

interface ManifestSource {
  sourceId: string
  corpusRelativePath: string
  fileName: string
  sha256: string
  moduleId: string | null
  secondaryModule: string | null
  sourceCategory: string | null
  examType: string | null
  subject: string | null
  examSittingYear: number | null
  pageCount: number | null
  fileType: string
  processingStatus: string
  sourceTier: number | null
  exclusionReason: string | null
}

const module = process.argv[2]
if (!module || !MODULES[module]) {
  throw new Error(`usage: build-module-sources.ts "<module>" — one of ${Object.keys(MODULES).join(', ')}`)
}
const MANIFEST = manifestFor(module)

const manifest = readManifest(module)
const all: ManifestSource[] = manifest.sources

/**
 * The path the corpus index has for a source, which is the only one that validates.
 *
 * A source ID is content-addressed — `src_` plus the first twenty hex of the
 * file's sha256 — so **the same bytes at two paths are one ID with two manifest
 * rows.** Fourteen IDs in this manifest are duplicated that way, covering
 * twenty-eight rows: a physiology orientation filed under both 102 and 103, an
 * instructor handout in two lecturers' folders, department books saved twice
 * under different names.
 *
 * Emitting a record per row therefore emits the same ID twice — `duplicate id
 * within the file` — and picks a path at random, which trips
 * `12-resources.md`'s hard error: `X is "…" in the corpus, not "…"`. Reading
 * the path back out of the index the validator itself consults makes the two
 * agree by construction rather than by luck.
 */
const index = JSON.parse(readFileSync(INDEX, 'utf8'))
const indexedPath = (id: string): string | undefined => index.sources[id]?.sourceRelativePath

/**
 * The sources a module's content may cite.
 *
 * An excluded file is left out: it is still a file the corpus contains — the
 * index says so — but a citation naming one should fail on the exclusion rather
 * than be silently blessed by appearing here.
 */
const rows = all
  .filter((s) => (s.moduleId === module || s.secondaryModule === module)
    && !s.exclusionReason && s.fileType === 'pdf')

// One record per source ID, not per manifest row. The lowest tier wins, so a
// file that is a department book in one folder and instructor material in
// another is catalogued as the department book.
const byId = new Map<string, ManifestSource>()
const alsoFiledAt = new Map<string, string[]>()
for (const row of rows) {
  const held = byId.get(row.sourceId)
  if (!held || (row.sourceTier ?? 9) < (held.sourceTier ?? 9)) byId.set(row.sourceId, row)
  if (held) alsoFiledAt.set(row.sourceId, [...(alsoFiledAt.get(row.sourceId) ?? [held.corpusRelativePath]), row.corpusRelativePath])
}

const sources = [...byId.values()]
  .sort((a, b) => (a.sourceTier ?? 9) - (b.sourceTier ?? 9)
    || a.corpusRelativePath.localeCompare(b.corpusRelativePath))

const duplicated = [...alsoFiledAt.entries()]

/**
 * Is this an exam paper rather than a teaching source?
 *
 * It decides `is_assessment`, which is what stops a past paper being cited as
 * proof that something is medically true. A paper is authoritative about what
 * the faculty examines and about nothing else — it is curriculum signal.
 */
const isAssessment = (s: ManifestSource) =>
  ['EOY', 'EOM', 'Baqoon'].includes(s.examType ?? '')
  || ['EOY', 'EOM', 'Baqoon', 'Department Questions'].includes(s.sourceCategory ?? '')

/** Why this source may support a medical claim — or why it may not. */
function qualification(s: ManifestSource): string {
  const category = s.sourceCategory ?? 'unclassified'
  if (category === 'Department Book') {
    return 'The department\'s own textbook for this module, written by the staff of the '
      + 'departments that teach and examine it. Authoritative for what this faculty teaches; '
      + 'it is a teaching text rather than a primary source, so a claim resting on it alone '
      + 'is local-curriculum evidence and not independent verification.'
  }
  if (isAssessment(s)) {
    return 'A past examination paper. Authoritative evidence of what this faculty examines '
      + 'and how it words a question; NOT evidence that a medical statement is true. Marked '
      + 'is_assessment so nothing treats it as clinical authority.'
  }
  if (category === 'Orientation') {
    return 'An official departmental announcement of exam scope and format. Authoritative for '
      + 'blueprint and exclusions; it makes no medical claims.'
  }
  if (category === 'Practical') {
    return 'The department\'s practical manual for this module. Authoritative for the '
      + 'procedures and specimens students are examined on.'
  }
  return 'Instructor-produced revision material circulated to students. Useful as a signal of '
    + 'emphasis; it is neither peer-reviewed nor departmentally endorsed, so it carries less '
    + 'weight than the department book and cannot be the sole support for a claim.'
}

/** How much weight a source carries, by what kind of thing it is. */
function confidence(s: ManifestSource): string {
  if (s.sourceCategory === 'Department Book') return '0.9'
  if (s.sourceCategory === 'Orientation') return '0.9'
  if (isAssessment(s)) return '0.85'
  if (s.sourceCategory === 'Practical') return '0.8'
  return '0.5'
}

/**
 * A readable title, since the filename is not one.
 *
 * The corpus filenames carry duplication suffixes, Arabic annotations and batch
 * codes — `EOY (INT - 102) 199 solved (3).pdf`. The title is what a citation
 * would print, so it says what the document is; the filename survives verbatim
 * in `source_relative_path`, which is what actually resolves it.
 */
function title(s: ManifestSource): string {
  const parts = [`Kasr Al Ainy ${module}`]
  if (s.subject) parts.push(s.subject)
  const kind = s.examType === 'EOY' ? 'end-of-year written paper'
    : s.examType === 'EOM' ? 'end-of-module written paper'
      : s.examType === 'Baqoon' ? 'second-sitting (baqoon) written paper'
        : s.sourceCategory === 'Department Book' ? 'department book'
          : s.sourceCategory === 'Department Questions' ? 'department question book'
            : s.sourceCategory === 'Orientation' ? 'exam orientation'
              : s.sourceCategory === 'Practical' ? 'practical manual'
                : 'instructor material'
  parts.push(kind)
  if (s.examSittingYear) parts.push(String(s.examSittingYear))
  return `${parts.join(' — ')} (${s.fileName})`
}

const languages = (s: ManifestSource) => /[؀-ۿ]/.test(s.fileName) ? 'en | ar' : 'en'

/** The evidence source — 17 columns, what a citation points at. */
const sourceBlock = (s: ManifestSource) => `# Item
## id
${s.sourceId}
## title
${title(s)}
## institution
Kasr Alainy — Faculty of Medicine, Cairo University
## processing_status
${s.processingStatus}
## collection_id
kau-y1
## source_relative_path
${indexedPath(s.sourceId) ?? s.corpusRelativePath}
## media_type
application/pdf
## languages
${languages(s)}
## page_count
${s.pageCount ?? ''}
## sha256
${s.sha256}
## rights
Private university teaching collection, held by the faculty and its students. Not cleared for redistribution; cited by page, never reproduced.
## qualification
${qualification(s)}
## confidence
${confidence(s)}
## is_assessment
${isAssessment(s) ? 'yes' : 'no'}`

/** The catalogue resource — the same PDF as something a student opens. */
const catalogueBlock = (s: ManifestSource, subject: string) => `# Item
## id
${s.sourceId}
## title
${title(s)}
## subject
${subject}
## type
Book
## source
Kasr Alainy — Faculty of Medicine, Cairo University
## status
Draft
## owner
Claude
## year
${s.examSittingYear ?? ''}
## module_ids
${module}
## universities
kau
## years
KAU_Y1
## description
${qualification(s)}`

/**
 * Which subject a source is catalogued under.
 *
 * The manifest records the department that set it, which is not a subject ID.
 * A source covering both halves of the module is catalogued under `fnd`,
 * because a resource has one subject and neither half is more the module than
 * the other.
 */
const subjectOf = (s: ManifestSource) =>
  s.subject === 'Biochemistry' ? 'fnd' : s.subject === 'Physiology' ? 'haem' : 'fnd'

const slug = module.replace(/\s+/g, '-')
const header = (what: string, count: number) => `${what} for ${module}, from the corpus manifest.

${count} records, one per source **file** the module owns that is not excluded —
which is not the same as one per manifest row. A source ID is the file's own
checksum, so the same bytes filed in two folders are one source with two rows.
${duplicated.length ? `${duplicated.length} of this module's sources are filed twice:

${duplicated.map(([id, paths]) => `  ${id}\n${paths.map((path) => `    ${path}`).join('\n')}`).join('\n')}

Each is emitted once, at the path the corpus index carries, because that is the
path \`medical:batch\` compares against.` : 'No source in this module is filed twice.'}

Nothing here is authored. Every ID, path, page count and checksum is copied from
${MANIFEST}, which is generated from
the files themselves — so a source that is not in the corpus cannot appear here,
and \`source_relative_path\` cannot disagree with the corpus record.

\`is_assessment\` is the column that matters most. A past paper is authoritative
about what this faculty examines and about nothing else; marking it stops
anything citing an exam as proof that a medical statement is true.

Generated by scripts/kasr/build-evidence.ts.`

const batch = (head: string, blocks: string[]) =>
  `<!--\n${head.trim().split('\n').map((l) => `  ${l}`.trimEnd()).join('\n')}\n-->\n\n`
  + blocks.join('\n\n---\n\n') + '\n'

mkdirSync(`${OUT}/evidence`, { recursive: true })

const sourceFile = `${OUT}/evidence/${slug}-sources.md`
writeFileSync(sourceFile, batch(header('Evidence sources', sources.length), sources.map(sourceBlock)))

/**
 * The catalogue half is staged outside the import root, on purpose.
 *
 * `validate-content-batch.mjs` has **no branch for a catalogue resource** — it
 * says so itself: "a catalogue-resource, subjects or glossary batch is not one
 * of them and has no branch here". So the file validates as `kind: "unknown"`,
 * which is an error, and `.github/workflows/content.yml` runs the validator
 * over `docs/Kasr-Source-Imports/*​/*.md` excluding only `manifest`, `INDEX.md`,
 * `academic`, `coverage` and `media-requests`. Putting a catalogue batch in
 * `resource/` therefore turns the Content workflow red **for every lane**, the
 * same way an item-less practical batch did.
 *
 * The batch is complete and correct; the validator simply cannot see it. So it
 * waits here until either the validator learns the contract or the workflow is
 * told to skip `resource/`. Nothing depends on it in the meantime: a concept's
 * `resource_ids` resolves against the *evidence* store, which is the file
 * above. This one is what lets a student open the book.
 */
const staged = `scripts/kasr/extract/${slug}`
mkdirSync(staged, { recursive: true })
const resourceFile = `${staged}/${slug}-catalogue-resources.md`
writeFileSync(resourceFile, batch(
  `${header('Catalogue resources', sources.length)}

STAGED, NOT READY TO IMPORT — see the note in scripts/kasr/build-evidence.ts.
This batch is complete, but \`medical:batch\` has no contract for a catalogue
resource and reports it as "unknown", which fails CI for every lane. Move it to
docs/Kasr-Source-Imports/resource/ once the validator or the workflow can see it.`,
  sources.map((s) => catalogueBlock(s, subjectOf(s)))))

console.log(JSON.stringify({
  module,
  manifestRows: rows.length,
  duplicatedIds: duplicated.length,
  sources: sources.length,
  assessment: sources.filter(isAssessment).length,
  teaching: sources.filter((s) => !isAssessment(s)).length,
  sourceFile,
  resourceFile,
}, null, 1))
