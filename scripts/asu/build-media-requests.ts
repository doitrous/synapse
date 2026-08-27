/**
 * The assets a module's questions need and the corpus does not have.
 *
 *   node --experimental-strip-types scripts/asu/build-media-requests.ts "ASU-CVS"
 *
 * Copied from `scripts/kasr/build-media-requests.ts`, with one real change:
 * that file keeps its own hardcoded `PAPERS: Record<string, string[]>` map of
 * JSON paper files per module, separate from `seeds/registry.ts`'s
 * `REGISTRATIONS` — a second place a paper has to be listed, and out of sync
 * with the registry from day one (only `102 INT`'s two files were ever
 * added). This version reads `REGISTRATIONS` directly instead: every
 * registered paper for the module, loaded the same way `build-batches.ts`
 * loads them, so a paper registered once is picked up by both scripts
 * automatically. Every paper loaded through `paperFromJson` (`from-json.ts`)
 * already carries `.mediaRequests` and `.unsat` — see `LoadedPaper` — so this
 * needs no second load path.
 *
 * A media request is the honest answer to a question that depends on a
 * figure the corpus does not contain — see Kasr's original for the fuller
 * reasoning on why a diagram question must never be rewritten into prose to
 * route around a missing figure (manual §6).
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { MODULES, mintQuestionId, type Seed } from './seeds/types.ts'
import type { LoadedPaper, MediaRequest } from './seeds/from-json.ts'
import { REGISTRATIONS } from './seeds/registry.ts'

const module = process.argv[2]
if (!module || !MODULES[module]) {
  throw new Error(`usage: build-media-requests.ts "<module>" — one of ${Object.keys(MODULES).join(', ')}`)
}
const slug = module.replace(/\s+/g, '-')

const papers = REGISTRATIONS
  .filter((entry) => entry.module === module)
  .map((entry) => entry.load() as LoadedPaper)
  .filter((paper) => paper.mediaRequests?.length || paper.unsat?.length)
if (!papers.length) {
  console.log(JSON.stringify({ module, requests: 0, blockedQuestions: 0, out: null,
    note: 'no registered paper for this module carries mediaRequests or unsat entries' }, null, 1))
  process.exit(0)
}

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
  for (const request of paper.mediaRequests ?? []) {
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
const blocked = papers.flatMap((paper) => (paper.unsat ?? [])
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

const OUT_ROOT = process.env.ASU_TOOLCHAIN_OUT ?? 'docs/Ain-Shams-Source-Imports'
mkdirSync(`${OUT_ROOT}/media-requests`, { recursive: true })
const out = `${OUT_ROOT}/media-requests/${slug}-media-requests.md`
writeFileSync(out, doc)
console.log(JSON.stringify({ module, requests: count, blockedQuestions: blocked.length, out }, null, 1))
