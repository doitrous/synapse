/**
 * Does the corpus teach this node's label in the sense the node means?
 *
 *   node --experimental-strip-types scripts/check-node-source-sense.mjs SYS-DEV
 *
 * The source plan matches a node to corpus files by counting records whose
 * labels contain the node's words. That is a word match, not a sense match, and
 * for nodes whose label is an ordinary English word it is routinely wrong:
 *
 *   "Virulence"    → an Ain Shams *locomotor anatomy* book
 *   "Distribution" → an Alexandria *research methods* book (statistical sense)
 *   "Metabolism"   → a *haematology* book (biochemical sense)
 *   "Work"         → a *respiratory physiology* book (work of breathing)
 *
 * Each of those would have been cited as evidence that the local curriculum
 * teaches the node, which is exactly what it is not. The failures were caught by
 * reading the filenames one at a time; this makes it a command.
 *
 * The check works from the concept index rather than the file index, because a
 * candidate carries the *sentence* it was extracted from. Seeing the sentences a
 * corpus file offers for "Work" settles in one glance what a record count cannot.
 *
 * Output is advisory. It flags nodes worth a human look before their local
 * sources are cited; it does not decide, because only reading the statements can.
 *
 * Known limitation: it is sharp for single-word labels, which are the ones that
 * actually go wrong, and blunt for multi-word ones. A node called "Caregiver and
 * community support" is reported under `doNotCite` because no corpus candidate
 * carries all three words in one label — not because the ranked file is wrong.
 * Read the `doNotCite` list as "the evidence for this node could not be checked
 * mechanically", and judge multi-word entries by hand.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const evidence = join(here, '..', 'docs', 'medical-library-program', 'evidence')
const system = process.argv[2]
if (!system) throw new Error('Give a system ID, e.g. SYS-DEV')

const norm = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
const plan = JSON.parse(await readFile(join(evidence, `${system}-source-plan.json`), 'utf8'))
const nodes = Array.isArray(plan) ? plan : (plan.nodes ?? [])
const index = JSON.parse(await readFile(join(evidence, 'corpus-concept-index.json'), 'utf8'))

/**
 * Every candidate whose label mentions the node's label, with its source file.
 *
 * Matched on whole words. A substring test reports "Work" as taught by every
 * page that says "network", which is how the first version of this script
 * managed to be wrong about the very failure it was written to catch.
 */
function statementsFor(label) {
  const key = norm(label)
  if (!key) return []
  const words = key.split(' ').filter(Boolean)
  const mentions = (candidateLabel) => {
    const haystack = ` ${candidateLabel} `
    return words.every((word) => haystack.includes(` ${word} `))
  }
  const out = []
  for (const [candidateLabel, ids] of Object.entries(index.byLabel)) {
    if (!mentions(candidateLabel)) continue
    for (const id of ids) {
      const candidate = index.candidates[id]
      out.push({ id, label: candidate.labels[0], source: candidate.sources[0], statement: candidate.statements[0] ?? '' })
    }
  }
  return out
}

/**
 * What this can and cannot decide.
 *
 * It cannot tell whether "Growth" in a corpus file means a child's growth or an
 * embryo's — only reading the sentence does that, which is why the sentences are
 * the output and the verdict is only a sort order.
 *
 * What it can measure is *ambiguity*: how widely the corpus spreads this label
 * across unrelated collections. A label whose statements come from one subject
 * area is being used in one sense; a label scattered across anatomy, physiology
 * and pathology is a word the corpus uses for several different things, and its
 * record count is not evidence that the node is taught.
 */
const report = []
for (const node of nodes) {
  if (!node.title || !(node.sources ?? []).length) continue
  const statements = statementsFor(node.title)
  const collections = new Set(statements.map((s) => s.source.split('/')[0]))
  const plannedFiles = (node.sources ?? []).slice(0, 3).map((s) => s.sourceRelativePath)
  const topFile = plannedFiles[0] ?? null
  // Does the file the plan ranks first actually say anything about this label?
  const topFileSpeaks = statements.some((s) => topFile && topFile.endsWith(s.source.split('/').slice(1).join('/')))
  report.push({
    nodeId: node.nodeId,
    title: node.title,
    localRecords: node.localRecords,
    topPlannedFile: topFile,
    candidatesMentioningLabel: statements.length,
    collectionsSpanned: collections.size,
    topFileSpeaksAboutLabel: topFileSpeaks,
    // Sentences from the file the plan would have you cite, where there are any,
    // because that is the file an author is about to trust.
    fromTopFile: statements
      .filter((s) => topFile && topFile.endsWith(s.source.split('/').slice(1).join('/')))
      .slice(0, 4).map((s) => (s.statement || s.label).slice(0, 130)),
    elsewhere: statements.slice(0, 4).map((s) => `${s.source.split('/').pop()} — ${(s.statement || s.label).slice(0, 100)}`),
  })
}

// One hard signal and one soft one, kept apart because conflating them made the
// first version of this script flag every node, and so flag nothing.
//
// Hard: the file the plan ranks first never mentions this label at all. There is
// no reading of that which supports citing it as local coverage.
const broken = report.filter((r) => !r.topFileSpeaksAboutLabel)
// Soft: the corpus uses this label across many unrelated collections, so it is a
// word carrying more than one sense and the record count is not evidence of
// coverage. This is a reading order, not a verdict.
const ambiguous = report
  .filter((r) => r.topFileSpeaksAboutLabel && r.collectionsSpanned >= 5)
  .sort((a, b) => b.collectionsSpanned - a.collectionsSpanned)
const suspect = [...broken, ...ambiguous]
await writeFile(join(evidence, `${system}-source-sense.json`), JSON.stringify({ system, nodes: report.length, suspect: suspect.length, report }, null, 1))
const line = (r) => ({
  node: r.nodeId,
  title: r.title,
  records: r.localRecords,
  topFile: r.topPlannedFile?.split('/').pop(),
  sample: r.fromTopFile[0] ?? r.elsewhere[0] ?? null,
})
console.log(JSON.stringify({
  system,
  nodesWithLocalSources: report.length,
  doNotCite: broken.length,
  readBeforeCiting: ambiguous.length,
  // The ranked file says nothing about this label. Citing it would assert local
  // curriculum coverage the corpus does not show.
  doNotCiteDetail: broken.map(line),
  // Ambiguous label. The sample comes from the ranked file itself: if it is
  // about a different sense of the word, the record count measures nothing.
  readBeforeCitingDetail: ambiguous.map((r) => ({ ...line(r), collections: r.collectionsSpanned })),
}, null, 1))
