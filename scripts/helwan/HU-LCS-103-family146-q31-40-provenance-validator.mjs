import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '../..')
const basePath = resolve(root, 'docs/Helwan-Source-Imports/question/HU-LCS-103-family98-bone-physiology-mcq.md')
const updatePath = resolve(root, 'docs/Helwan-Source-Imports/question/HU-LCS-103-family146-q31-40-provenance-updates.md')
const sourcePath = resolve(root, 'docs/Helwan-Source-Imports/evidence/HU-LCS-103-family146-provenance-sources.md')
const family146 = 'src_aacbb031f12572131776'
const expectedKeys = 'DCACBCCACA'

function parse(text) {
  return text.trim().split(/\n---\n/).map((record) => {
    const fields = {}
    for (const match of record.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=^## |\z)/gm)) fields[match[1].trim()] = match[2].trim()
    return { record, fields }
  }).filter(({ fields }) => fields.id)
}

const [baseText, updateText, sourceText] = await Promise.all([
  readFile(basePath, 'utf8'),
  readFile(updatePath, 'utf8'),
  readFile(sourcePath, 'utf8'),
])

const base = new Map(parse(baseText).map((row) => [row.fields.id, row]))
const updates = parse(updateText)
assert.equal(updates.length, 10)
assert.equal((updateText.match(/^## explanation$/gm) ?? []).length, 0, 'generic explanation header is forbidden')
assert.equal((updateText.match(/^## explanation_[a-f]$/gm) ?? []).length, 60, 'six option-specific explanation fields per row must be preserved')
assert.match(sourceText, new RegExp(`## id\\n${family146}(?:\\n|$)`))
assert.match(sourceText, /## sha256\naacbb031f12572131776bc76f89d69f15759e7cc6e5a3af3d3bc7239f0be610a/)

const keys = []
for (let index = 0; index < updates.length; index += 1) {
  const expectedId = `Q-HU-LCS103-PHY-F98-${String(index + 1).padStart(2, '0')}`
  const incoming = updates[index]
  const current = base.get(expectedId)
  assert.ok(current, `${expectedId} baseline missing`)
  assert.equal(incoming.fields.id, expectedId)
  assert.equal(incoming.fields.status, 'Draft')
  assert.equal(incoming.fields.resource_ids, `+${family146}`, `${expectedId} must contain one append directive only`)

  const incomingSnapshot = { ...incoming.fields }
  const currentSnapshot = { ...current.fields }
  delete incomingSnapshot.resource_ids
  delete currentSnapshot.resource_ids
  assert.deepEqual(incomingSnapshot, currentSnapshot, `${expectedId} changed a non-resource field`)

  const priorResources = current.fields.resource_ids.split(/\n+/).filter(Boolean)
  assert.equal(priorResources.length, 2, `${expectedId} governed baseline source count changed`)
  assert.ok(!priorResources.includes(family146), `${expectedId} baseline already includes Family-146 provenance`)
  const mergedResources = [...priorResources, family146].filter((id, position, all) => all.indexOf(id) === position)
  assert.deepEqual(mergedResources, [...priorResources, family146], `${expectedId} append is not idempotent`)

  assert.equal(incoming.fields.source_citation, current.fields.source_citation, `${expectedId} sourceCitation mutated`)
  assert.equal(incoming.fields.author_notes, current.fields.author_notes, `${expectedId} authorNotes mutated`)
  assert.equal(incoming.fields.question, current.fields.question, `${expectedId} stem mutated`)
  assert.equal(incoming.fields.correct_answer, current.fields.correct_answer, `${expectedId} key mutated`)
  for (const letter of ['a', 'b', 'c', 'd', 'e', 'f']) {
    assert.equal(incoming.fields[`answer_${letter}`], current.fields[`answer_${letter}`], `${expectedId} option ${letter.toUpperCase()} mutated`)
    assert.equal(incoming.fields[`explanation_${letter}`], current.fields[`explanation_${letter}`], `${expectedId} explanation ${letter.toUpperCase()} mutated`)
  }
  keys.push(incoming.fields.correct_answer)
}

assert.equal(keys.join(''), expectedKeys)
console.log(JSON.stringify({
  counts: { resourcesCreated: 0, questionsUpdated: 10, questionsCreated: 0 },
  keys: keys.join(''),
  statuses: { Draft: 10 },
  effectiveMutation: ['resourceIds'],
  invariantFields: 'all other question fields byte-identical',
  genericExplanationHeaders: 0,
}, null, 2))
