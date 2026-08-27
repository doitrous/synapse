/**
 * Copied from `scripts/kasr/build-structure.ts` — already module-generic (takes the
 * module as `process.argv[2]`, checked against `MODULES`), so only the output
 * root changed.
 *
 * A module's subject tree, as the academic importer reads it.
 *
 *   node --experimental-strip-types scripts/asu/build-structure.ts "ASU-CVS"
 *
 * The tree is the department's own book and nothing else. Where the book names
 * a chapter there is a node; where it does not, there is none — so the outline
 * cannot acquire a tidy intermediate level that no faculty wrote.
 *
 * Marks are recorded only where a source states them. Module 102's orientation
 * states none, so neither subject carries one: a plausible guess in a marks
 * field is worse than a blank, because the marks decide the shape of every
 * revision plan built from the exam.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { MODULES } from './seeds/types.ts'

interface Chapter {
  subjectPath: string
  bookTitle: string
  physicalStart: number
  physicalEnd: number
  printedStart?: number
  printedEnd?: number
  cancelledForExam?: boolean
  cancelledNote?: string | null
  excludedFromWrittenExam?: boolean
  exclusionNote?: string | null
  evidence: string
}

const module = process.argv[2]
if (!module || !MODULES[module]) {
  throw new Error(`usage: build-structure.ts "<module>" — one of ${Object.keys(MODULES).join(', ')}`)
}
const slug = module.replace(/\s+/g, '-')
const STAGE = `${process.env.ASU_TOOLCHAIN_EXTRACT_DIR ?? 'scripts/asu/extract'}/${slug}`

const chapters: Chapter[] = [
  ...JSON.parse(readFileSync(`${STAGE}/biochem-chapters.json`, 'utf8')),
  ...JSON.parse(readFileSync(`${STAGE}/physio-chapters.json`, 'utf8')),
]

/** Is this chapter off the written paper, in whole or in part? */
const cut = (c: Chapter) => c.cancelledForExam || c.excludedFromWrittenExam
const cutNote = (c: Chapter) => c.cancelledNote ?? c.exclusionNote ?? null

/**
 * The outline, built from the paths themselves.
 *
 * Depth is not uniform and must not be forced: Biochemistry's book is a flat
 * list of fourteen chapters with no part level, and Physiology's is two systems
 * with chapters beneath. Padding the shallower one to match would invent a node.
 */
interface Node { name: string, children: Map<string, Node>, chapter?: Chapter }
const root: Node = { name: module, children: new Map() }

for (const chapter of chapters) {
  const segments = chapter.subjectPath.split(' > ')
  if (segments[0] !== module) throw new Error(`${chapter.subjectPath}: does not start with "${module}"`)
  let node = root
  for (const segment of segments.slice(1)) {
    if (!node.children.has(segment)) node.children.set(segment, { name: segment, children: new Map() })
    node = node.children.get(segment)!
  }
  if (node.chapter) throw new Error(`${chapter.subjectPath}: two chapters claim this path`)
  node.chapter = chapter
}

/**
 * The outline lines, two spaces per level.
 *
 * Nothing but the subject name goes on the line. A trailing `# not on the
 * written paper` reads to a human as a comment and to `parseAcademicOutline` as
 * four more words of the subject's name — the tree would import a node called
 * "Anticoagulants  # not on the written paper". The cancellations are recorded
 * in the comment block below the outline instead, where they cannot be mistaken
 * for content.
 *
 * A cut chapter stays in the tree regardless. It is still taught and still
 * examined practically; only the written paper drops it, and a student revising
 * for the practical needs the node to exist.
 */
function render(node: Node, depth: number): string[] {
  const lines: string[] = []
  for (const child of node.children.values()) {
    lines.push(`${'  '.repeat(depth)}- ${child.name}`)
    lines.push(...render(child, depth + 1))
  }
  return lines
}

const leaves = chapters.length
const off = chapters.filter(cut)
const outline = render(root, 1).join('\n')

const notes = off.map((c) => `  ${c.subjectPath}\n    ${cutNote(c) ?? 'no reason recorded'}`).join('\n\n')

const doc = `<!--
  Module ${module} — the subject tree, taken from the department's own book.

  Source: \`Department Book Module 102.pdf\` (167 pages), "Introduction to Biomedical
  Sciences (INT – 102)", by staff of the Medical Biochemistry Department and the
  Physiology Department, Faculty of Medicine, Cairo University. Manifest source
  src_a488633802ec053c6325 — see ../manifest/kasr-y1-sources.json.

  The two subjects are not a guess. \`102 INT/NOTE 2 SUBJECTS ARE BIOCHEMISTRY AND
  PHYSIOLOGY NOTE/\` states them, and the book is in two parts under exactly those
  names: Part I "Medical Biochemistry and Molecular Biology" (physical p2), Part II
  "Physiology" (physical p112).

  Beneath each subject the structure reproduces the book's own chapters. Part I's
  Contents (physical p3) is a flat list of fourteen Roman-numbered chapters with no
  grouping level, so there is none here. Part II's Contents (physical p113) groups
  its nineteen chapters under Blood and Autonomic Nervous System, so those two
  nodes exist. The depths differ because the book's do.

  Two page offsets, because Part II restarts its numbering:
  Part I  printed = physical - 4    (printed 1 is physical 5)
  Part II printed = physical - 113  (printed 1 is physical 114)

  A second book was read and deliberately not used as the tree. \`Dpt book PHYSIO
  First Year.pdf\` is the physiology department's whole-year book, covering 102 and
  103, and it names 27 chapters where the module book names 19. The module book
  wins on evidence, not on assumption: the exam orientation's exclusion list opens
  with INTRODUCTION, BODY FLUIDS and HOMEOSTASIS, none of which exists in the year
  book's 102 half and all three of which are printed headings inside the module
  book's — so the orientation was written against this book. The year book's finer
  chapters are carried on each record in
  ../../../scripts/asu/extract/${slug}/physio-chapters.json as \`yearBookChapters\`,
  and the seven places the two books genuinely disagree are recorded there as
  \`conflict\` rather than resolved silently.

  Marks are recorded only where a source states them. Neither of module 102's two
  orientations states a mark total, so neither subject carries one — unlike 101
  ISK, where Anatomy's 60 came from its orientation. The 2025 end-of-year paper
  divides 80 marks as Biochemistry 50 and Physiology 30, but that is one sitting's
  paper rather than a stated allocation, and it is recorded on the paper's own
  batch instead of here.

  ${leaves} leaf chapters, ${off.length} of them cancelled for the written exam by the
  department's own announcements. A cancelled chapter stays in the tree: it is
  still taught and still examined practically, and a student revising for the
  practical needs the node.

  Import: Academic Setup › Import. \`[102]\` resolves onto the catalogue's existing
  \`102 INT\`; it does not create a second module.
-->

# Year 1
## Term 1
- Introduction to Biomedical Sciences [102]
${outline}

<!--
  Cancelled for the written paper, with the announcement that cancels each:

${notes}

  Four further chapters are cancelled only in PART — a heading inside them is
  named by an orientation while the rest of the chapter is examinable. Those
  carry \`false\` with an \`exclusionNote\` beginning "PARTIAL." in
  physio-chapters.json, because a chapter-level flag cannot say "printed page 20
  of this chapter is off the paper" and flagging the whole chapter would tell a
  student to skip examinable material.
-->
`

const OUT_ROOT = process.env.ASU_TOOLCHAIN_OUT ?? 'docs/Ain-Shams-Source-Imports'
mkdirSync(`${OUT_ROOT}/academic`, { recursive: true })
const out = `${OUT_ROOT}/academic/${slug.toLowerCase()}-structure.md`
writeFileSync(out, doc)
console.log(JSON.stringify({ module, leaves, cancelled: off.length, out }, null, 1))
