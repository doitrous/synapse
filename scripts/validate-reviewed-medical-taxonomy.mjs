import { MEDICAL_TAXONOMY_SEED, MEDICAL_TAXONOMY_COUNTS, indexMedicalTaxonomy } from '../src/data/medicalLibraryTaxonomy.ts'

const nodes = MEDICAL_TAXONOMY_SEED
const index = indexMedicalTaxonomy(nodes)
const ids = new Set()
const errors = {
  duplicateIds: [], missingParents: [], crossDivisionParents: [],
  invalidDepths: [], duplicateSiblingTitles: [], cycles: [],
}
const siblingTitles = new Map()

for (const node of nodes) {
  if (ids.has(node.id)) errors.duplicateIds.push(node.id)
  ids.add(node.id)
  const parent = node.parentId ? index.byId.get(node.parentId) : undefined
  if (node.parentId && !parent) errors.missingParents.push({ id: node.id, parentId: node.parentId })
  if (parent && parent.division !== node.division) errors.crossDivisionParents.push({ id: node.id, parentId: parent.id })
  const expectedDepth = parent ? parent.depth + 1 : 0
  if (expectedDepth !== node.depth) errors.invalidDepths.push({ id: node.id, depth: node.depth, expectedDepth })
  const siblingKey = `${node.parentId ?? `ROOT:${node.division}`}|${node.title.trim().toLocaleLowerCase()}`
  siblingTitles.set(siblingKey, [...(siblingTitles.get(siblingKey) ?? []), node.id])
  const visited = new Set([node.id])
  let parentId = node.parentId
  while (parentId) {
    if (visited.has(parentId)) { errors.cycles.push({ id: node.id, at: parentId }); break }
    visited.add(parentId)
    parentId = index.byId.get(parentId)?.parentId ?? null
  }
}

for (const [key, siblingIds] of siblingTitles) {
  if (siblingIds.length > 1) errors.duplicateSiblingTitles.push({ key, ids: siblingIds })
}

const passed = Object.values(errors).every((items) => items.length === 0)
console.log(JSON.stringify({ passed, counts: MEDICAL_TAXONOMY_COUNTS, errors }, null, 2))
if (!passed) process.exitCode = 1
