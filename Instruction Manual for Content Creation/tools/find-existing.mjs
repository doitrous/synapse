/**
 * Does this already exist?
 *
 *   node "Instruction Manual for Content Creation/tools/find-existing.mjs" heart failure
 *
 * Searches live state and every pending batch for anything already covering a
 * term — concepts by label, alias, canonical key and definition; articles,
 * questions and practicals by title and alias; glossary terms by both languages;
 * evidence claims by display text, citations by support span, and resources by
 * title; and unimported batch files by their `## label` / `## title` / `term`
 * column.
 *
 * Run this before you mint anything. A hit means you update that record, not
 * that you write a second one. Silence is the only licence to create.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const term = process.argv.slice(2).join(' ').trim().toLowerCase()
if (!term) {
  console.error('Usage: node "Instruction Manual for Content Creation/tools/find-existing.mjs" <term>')
  process.exit(2)
}

const LIVE = 'server/data/medical-library-v1.json'

/**
 * Every root a pending batch can live under.
 *
 * The two shared roots were once the whole list, and then per-university roots
 * appeared — `docs/Kasr-Source-Imports/` and its `concept/`, `question/`,
 * `article/` subfolders. A batch authored there was invisible to the one tool
 * authors are told to run before minting anything, so the answer came back
 * "safe to create" for records that already existed and the duplicate got
 * written. Discovered by shape rather than by name: the next university must
 * not need an edit here to be searched.
 */
const BATCH_ROOTS = ['docs/import-ready', 'docs/questions-import-ready']
const BATCH_DIRS = [
  ...BATCH_ROOTS,
  ...(existsSync('docs')
    ? readdirSync('docs', { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && entry.name.endsWith('-Source-Imports'))
      .map((entry) => join('docs', entry.name))
    : []),
]

const hit = (value) => typeof value === 'string' && value.toLowerCase().includes(term)
const rows = []

if (existsSync(LIVE)) {
  const live = JSON.parse(readFileSync(LIVE, 'utf8'))
  const graph = live.states['nishany-concept-graph-v2'] ?? { concepts: [] }
  const ledger = live.states['nishany-admin-content-ledger-v4'] ?? []
  const glossary = live.states['nishany-medical-glossary-v1'] ?? { terms: [] }

  for (const concept of graph.concepts) {
    const aliases = concept.aliases ?? []
    if (hit(concept.label) || aliases.some(hit) || hit(concept.canonicalKey) || hit(concept.definition)) {
      rows.push(['live concept', concept.id, concept.label, aliases.length ? `aliases: ${aliases.join(', ')}` : ''])
    }
  }
  for (const item of ledger) {
    const aliases = item.articleData?.aliases ?? []
    if (hit(item.title) || aliases.some(hit)) rows.push([`live ${item.kind}`, item.id, item.title, item.status])
  }
  for (const entry of glossary.terms ?? []) {
    if (hit(entry.term) || hit(entry.ar) || hit(entry.def)) rows.push(['live glossary', entry.id, entry.term, entry.ar])
  }

  // Evidence is searched too, because 03-relationships tells you to reuse an
  // existing claim before authoring one, and a rule with no tooling is a rule
  // nobody follows.
  const evidence = live.states['nishany-medical-evidence-v1'] ?? {}
  for (const claim of evidence.claims ?? []) {
    if (hit(claim.displayText) || hit(claim.subject) || hit(claim.object)) {
      rows.push(['live claim', claim.id, claim.displayText ?? '', claim.verificationStatus ?? ''])
    }
  }
  for (const citation of evidence.citations ?? []) {
    if (hit(citation.supportSpan)) rows.push(['live citation', citation.id, (citation.supportSpan ?? '').slice(0, 90), `claim ${citation.claimId}`])
  }
  for (const resource of evidence.resources ?? []) {
    if (hit(resource.title)) rows.push(['live resource', resource.id, resource.title ?? '', resource.institution ?? ''])
  }
} else {
  console.error(`! ${LIVE} is missing — searching pending batches only.`)
}

// Pending batches are as real as live state for dedupe: another agent may have
// authored the thing an hour ago and it simply has not been imported yet.
for (const dir of BATCH_DIRS) {
  if (!existsSync(dir)) continue
  for (const name of readdirSync(dir, { recursive: true })) {
    const path = join(dir, String(name))
    if (!path.endsWith('.md')) continue
    const text = readFileSync(path, 'utf8')
    // `canonical_key` as well as the prose fields.
    //
    // The key is what the mint hashes and what `check-concept-ids` enforces one
    // ID per, so it is the field a duplicate collides on — and it was the one
    // field this tool did not read. An author searching the key they were about
    // to mint was told "safe to create" by the very tool the manual sends them
    // to, while a pending batch two directories away already held it. Keys are
    // dotted and hyphenated rather than prose, so they rarely match a
    // label-shaped search term; searching for one had to be done by hand.
    for (const match of text.matchAll(/^## (label|title|term|aliases|canonical_key)\r?\n([\s\S]*?)(?=\r?\n##|\r?\n---|$)/gm)) {
      for (const line of match[2].split(/\r?\n|\||;/)) {
        if (hit(line.trim())) rows.push(['pending', path, line.trim(), `via ## ${match[1]}`])
      }
    }
  }
}

if (!rows.length) {
  console.log(`No existing record matches "${term}". Safe to create one.`)
  process.exit(0)
}
const width = (i) => Math.max(...rows.map((row) => row[i].length))
for (const row of rows) console.log(`${row[0].padEnd(width(0))}  ${row[1].padEnd(width(1))}  ${row[2]}${row[3] ? `  · ${row[3]}` : ''}`)
console.log(`\n${rows.length} existing record(s). Update one of these rather than creating a duplicate.`)
