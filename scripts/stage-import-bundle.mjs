/**
 * Bring the stored curriculum tree up to the source catalogue, before importing.
 *
 *   node --experimental-strip-types scripts/stage-import-bundle.mjs <live.json> <staged.json>
 *
 * LD-13: the runtime tree expands from 8 subjects to all 20 canonical systems in
 * one migration. That expansion exists in `curriculumCatalog.ts` but was never
 * written to the database, so production still stores the 8-subject tree — and a
 * stored tree overrides the source default.
 *
 * This matters immediately: the authored library places content on `fnd` and
 * `dev`, and importing it against an 8-subject tree would leave 228 articles on
 * subjects the student library cannot group. That is exactly the failure BLK-09
 * just repaired, so it is worth not recreating on the same afternoon.
 *
 * It merges rather than replaces, which the first version of this script did not.
 * Production's stored tree turned out to be *richer* than the source — `cvs` holds
 * 68 nodes against the source's 59, and six other subjects likewise — so writing
 * the source over it would have deleted real nodes. A stored subject is therefore
 * kept exactly as it is, and only genuinely missing subjects are added.
 *
 * That leaves a real discrepancy unresolved: the source catalogue is behind the
 * database for the original eight subjects. Reconciling those is a separate
 * question from making `fnd` and `dev` exist, and it is reported rather than
 * quietly decided here.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { CURRICULUM_CATALOG } from '../src/data/curriculumCatalog.ts'

const [input, output] = process.argv.slice(2)
if (!input || !output) throw new Error('Usage: stage-import-bundle.mjs <live.json> <staged.json>')

const TREE_KEY = 'nishany-taxonomy-tree-v4'
const bundle = JSON.parse(await readFile(input, 'utf8'))
const live = bundle.states?.[TREE_KEY] ?? []

/** Subjects, topics and subtopics, so a comparison counts the whole tree. */
const countNodes = (tree) =>
  tree.reduce((total, subject) =>
    total + 1 + (subject.topics ?? []).reduce((sum, topic) => sum + 1 + (topic.subs ?? []).length, 0), 0)

const storedIds = new Set(live.map((subject) => subject.id))
const missing = CURRICULUM_CATALOG.filter((subject) => !storedIds.has(subject.id))

// Reported, not acted on. Where the database holds more of a subject than the
// source does, the source is stale for that subject and reconciling the two is
// its own piece of work.
const behind = live
  .map((subject) => {
    const source = CURRICULUM_CATALOG.find((s) => s.id === subject.id)
    if (!source) return { id: subject.id, stored: countNodes([subject]), source: 0 }
    const stored = countNodes([subject])
    const inSource = countNodes([source])
    return inSource < stored ? { id: subject.id, stored, source: inSource } : null
  })
  .filter(Boolean)

const merged = [...live, ...missing]

console.log(JSON.stringify({
  storedSubjects: live.length,
  storedNodes: countNodes(live),
  subjectsAdded: missing.map((s) => s.id),
  nodesAdded: countNodes(missing),
  mergedSubjects: merged.length,
  mergedNodes: countNodes(merged),
  sourceBehindDatabaseFor: behind,
}, null, 1))

if (!missing.length) {
  console.log('\nNothing to add — every source subject is already stored.')
}

bundle.states[TREE_KEY] = merged
await writeFile(output, JSON.stringify(bundle, null, 1))
console.log(`\nstaged → ${output}`)
