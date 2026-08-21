/**
 * The assets a module's questions need and the corpus does not have.
 *
 *   node --experimental-strip-types scripts/kasr/build-media-requests.ts "102 INT"
 *
 * A media request is the honest answer to a question that depends on a figure.
 * The 2025 102 paper sets three diagram questions — an eicosanoid pathway,
 * post-transcriptional modification, and the types of point mutation — each
 * printing numbered blanks over a figure that is not in the extracted text and
 * that this repository does not hold. §6 of the manual is unambiguous about the
 * two things not to do: never invent a URL, and never describe an image as
 * though it were there.
 *
 * The third temptation is subtler and is the one this file exists to resist:
 * rewriting a diagram question into a prose question. "Name the enzyme that
 * converts arachidonic acid to PGH2" is answerable without the figure, but it
 * is not the question the examiner set — it hands the student the pathway
 * position that the original made them read off the diagram. So the question
 * stays as it is, `Priority: required` says it cannot publish without the
 * asset, and the request goes to the admin backlog for a human to fulfil.
 *
 * Requests attach to articles, questions and practicals only, and importing is
 * the only way one comes into existence — there is no create form in the admin
 * UI. That is why this is generated rather than described.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { MODULES, mintQuestionId, type Seed } from './seeds/types.ts'
import { paperFromJson, type LoadedPaper, type MediaRequest } from './seeds/from-json.ts'

const module = process.argv[2]
if (!module || !MODULES[module]) {
  throw new Error(`usage: build-media-requests.ts "<module>" — one of ${Object.keys(MODULES).join(', ')}`)
}
const slug = module.replace(/\s+/g, '-')

/** Every read paper for this module. One line per paper, as in `build-batches.ts`. */
const PAPERS: Record<string, string[]> = {
  '102 INT': [
    'scripts/kasr/extract/102-INT/eoy-2025-199.json',
    'scripts/kasr/extract/102-INT/eoy-2024-198.json',
  ],
}

const papers: LoadedPaper[] = (PAPERS[module] ?? []).map(paperFromJson)
if (!papers.length) throw new Error(`no paper is registered for "${module}"`)

/** The question a request belongs to, so the block can name it. */
function questionFor(paper: LoadedPaper, request: MediaRequest): { id: string, seed: Seed } {
  const seed = paper.seeds.find((one) =>
    `${one.section[0].toUpperCase()}${one.q}` === request.forScheme)
  if (!seed) throw new Error(`media request "${request.heading}": no seed for scheme ${request.forScheme}`)
  return { id: mintQuestionId(paper.source, seed), seed }
}

const blocks: string[] = []
let count = 0

for (const paper of papers) {
  for (const request of paper.mediaRequests) {
    const { id, seed } = questionFor(paper, request)
    const scheme = paper.schemes[request.forScheme]
    count += 1
    blocks.push(`## ${id} — ${seed.section} Q${seed.q}, ${seed.marks} marks

**Question:** ${scheme.prompt}

**Module subject:** ${seed.modulePath}

\`\`\`markdown
## media_recommendations
### ${request.heading}
Brief: ${request.brief}
Purpose: ${request.purpose}
Priority: ${request.priority}
Status: ${request.status}${request.kind ? `\nKind: ${request.kind}` : ''}${request.sourceDirection ? `\nSource direction: ${request.sourceDirection}` : ''}${request.rights ? `\nRights: ${request.rights}` : ''}
\`\`\``)
  }
}

/** What the paper could not be read closely enough to settle, and why. */
const blocked = papers.flatMap((paper) => paper.unsat
  .filter((entry) => entry.blockedOn)
  .map((entry) => `- **${entry.scheme}** — ${entry.issue}`))

const doc = `# ${module} — media requests

${count} assets that questions in this module cannot be sat without, and that the
corpus does not contain.

**Nothing here is an invented URL, and no question was rewritten into prose to
route around a missing figure.** A diagram question asks a student to read a
position off a picture; restating it as "name the enzyme that does X" answers
the question in the asking. The questions are unchanged, marked \`Priority:
required\`, and wait for the asset.

## How to apply these

Each block below is the \`## media_recommendations\` field for one question, and
the question's ID is the heading. Paste the block into that question's record and
re-import with **Update matching items** on, or add it before the first import.
It then appears in the admin backlog at **Library Setup → Media requests**.

Requests attach to articles, questions and practicals only, and importing is the
only way one comes into existence — there is no create form anywhere in the admin
UI, which is why this file exists rather than a set of instructions.

## What is blocked on these

${blocked.length ? blocked.join('\n') : 'Nothing — every request is an improvement rather than a blocker.'}

---

${blocks.join('\n\n---\n\n')}
`

mkdirSync('docs/Kasr-Source-Imports/media-requests', { recursive: true })
const out = `docs/Kasr-Source-Imports/media-requests/${slug}-media-requests.md`
writeFileSync(out, doc)
console.log(JSON.stringify({ module, requests: count, blockedQuestions: blocked.length, out }, null, 1))
