import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import vm from 'node:vm'

const inputPath = resolve(process.argv[2] || '')
if (!process.argv[2]) throw new Error('Usage: node scripts/audit-medical-taxonomy.mjs <library-data.js>')
const context = { window: {} }
vm.createContext(context)
vm.runInContext(await readFile(inputPath, 'utf8'), context, { filename: inputPath })
const { schema, nodes: rows } = context.window.LIBRARY_DATA
const nodes = rows.map((row) => Object.fromEntries(schema.map((key, index) => [key, row[index]])))
const byId = new Map(nodes.map((node) => [node.id, node]))
const children = new Map()
for (const node of nodes) children.set(node.parent, [...(children.get(node.parent) || []), node])

const duplicateSiblings = []
for (const [parent, siblings] of children) {
  const names = new Map()
  for (const node of siblings) {
    const title = (node.microtopic || node.subtopic || node.topic || node.root).trim().toLocaleLowerCase()
    if (names.has(title)) duplicateSiblings.push({ parent, title, ids: [names.get(title), node.id] })
    else names.set(title, node.id)
  }
}

const invalidParents = nodes.filter((node) => !node.parent.startsWith('ROOT-') && !byId.has(node.parent)).map((node) => node.id)
const emptyTitles = nodes.filter((node) => !(node.microtopic || node.subtopic || node.topic || node.root).trim()).map((node) => node.id)
const emptyNonLeafNodes = nodes.filter((node) => ['System', 'Discipline', 'Domain', 'Topic', 'Subtopic'].includes(node.level) && !(children.get(node.id)?.length)).map((node) => node.id)
const pathOf = (node) => [node.root, node.topic, node.subtopic, node.microtopic].filter(Boolean).join(' → ')
const allText = nodes.map((node) => pathOf(node).toLocaleLowerCase()).join('\n')

const coverageTerms = {
  nutrition: ['nutrition'],
  anaesthesia: ['anesthesia', 'anaesthesia'],
  palliativeCare: ['palliative', 'end-of-life', 'end of life'],
  rehabilitation: ['rehabilitation'],
  disability: ['disability'],
  patientSafety: ['patient safety'],
  qualityImprovement: ['quality improvement'],
  healthInformatics: ['health informatics', 'digital health'],
  climateHealth: ['climate'],
  oralHealth: ['oral health', 'dental'],
  painMedicine: ['pain management', 'pain medicine'],
  safeguarding: ['safeguarding'],
  geriatrics: ['geriatrics', 'older adult', 'healthy aging'],
  adolescentHealth: ['adolescent'],
  occupationalHealth: ['occupational health'],
  globalHealth: ['global health'],
  evidenceBasedMedicine: ['evidence-based', 'evidence based medicine'],
  antimicrobialStewardship: ['antimicrobial stewardship'],
  prescribingSafety: ['prescribing', 'medicines safety'],
}

const coverage = Object.fromEntries(Object.entries(coverageTerms).map(([key, terms]) => [key, {
  present: terms.some((term) => allText.includes(term)),
  matches: nodes.filter((node) => terms.some((term) => pathOf(node).toLocaleLowerCase().includes(term))).slice(0, 12).map((node) => ({ id: node.id, path: pathOf(node) })),
}]))

const divisions = Object.fromEntries([...new Set(nodes.map((node) => node.division))].map((division) => {
  const selected = nodes.filter((node) => node.division === division)
  return [division, {
    nodes: selected.length,
    roots: selected.filter((node) => node.parent.startsWith('ROOT-')).length,
    levels: Object.fromEntries([...new Set(selected.map((node) => node.level))].map((level) => [level, selected.filter((node) => node.level === level).length])),
    rootSizes: selected.filter((node) => node.parent.startsWith('ROOT-')).map((root) => ({ id: root.id, title: root.root, descendants: selected.filter((node) => node.id !== root.id && pathOf(node).startsWith(`${root.root} →`)).length })),
  }]
}))

console.log(JSON.stringify({
  nodes: nodes.length,
  divisions,
  structuralChecks: { duplicateSiblings, invalidParents, emptyTitles, emptyNonLeafNodes },
  coverage,
}, null, 2))
