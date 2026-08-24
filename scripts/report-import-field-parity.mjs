/**
 * Import field-parity report.
 *
 * Answers one question per field: can bulk import populate and update it?
 *
 * The model side is read from the TypeScript sources at run time rather than
 * from a hand-typed list, so the report cannot quietly fall out of date when a
 * field is added. A field the model has and the importer does not is a gap, and
 * the report names it.
 *
 *   node --experimental-strip-types scripts/report-import-field-parity.mjs
 *
 * Writes docs/medical-library-program/evidence/field-parity-matrix.{json,md}
 * and prints the summary. Exits non-zero if any field regresses to `missing`
 * without being listed as a known, explained exception below.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  ANNOTATION_MAP, ARTICLE_MAP, CASE_MAP, CITATION_MAP, CLAIM_MAP, CONCEPT_MAP,
  DECISION_MAP, IMPORT_EXEMPTIONS, LAB_MAP, LAB_QUESTION_MAP,
  MEDIA_REQUEST_MAP, MINIGAME_BASE_MAP, MINIGAME_SOURCE_MAP, ORDERED_MINIGAME_MAP,
  ORDERED_STEP_MAP, OSCE_MAP, QUESTION_MAP, QUESTION_TAGS_MAP, RED_FLAG_FINDING_MAP,
  RED_FLAG_SORT_MAP, RELATION_MAP, RESOURCE_AUTHORING_MAP, RESOURCE_RECORD_MAP,
  SPAN_MAP, SUBJECT_MAP, importFieldKeys,
} from '../src/data/importContract.ts'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const outDir = join(root, 'docs', 'medical-library-program', 'evidence')

/** Field names declared on one exported interface. */
async function interfaceFields(relativePath, name) {
  const source = await readFile(join(root, relativePath), 'utf8')
  const match = source.match(new RegExp(`export interface ${name}(?: extends [A-Za-z, ]+)? \\{([\\s\\S]*?)\\n\\}`))
  if (!match) throw new Error(`${name} not found in ${relativePath}`)
  return [...match[1].matchAll(/^ {2}([A-Za-z_][A-Za-z0-9_]*)\??:/gm)].map((entry) => entry[1])
}

/**
 * The fields one practical format actually carries, inherited ones included.
 *
 * The three formats extend `PracticalCommon`, so reading the interface alone
 * would report a format as having no `references` or `conceptTags` and quietly
 * drop four shared fields out of the matrix.
 */
async function practicalInterfaceFields(name) {
  const own = await interfaceFields('src/data/contentControl.ts', name)
  const shared = await interfaceFields('src/data/contentControl.ts', 'PracticalCommon')
  return [...own, ...shared.filter((field) => !own.includes(field))]
}

/**
 * Model field → the import column that populates it.
 *
 * `null` means deliberately not importable, with the reason recorded. Everything
 * else must name a real column, and the script checks that it exists.
 */
function assess(modelName, modelFields, map, importKeys, prefix = modelName) {
  return modelFields.map((field) => {
    const column = Object.hasOwn(map, field) ? map[field] : undefined
    const exemptReason = IMPORT_EXEMPTIONS[`${prefix}.${field}`]
    if (exemptReason) return { field, column: null, state: 'n/a', reason: exemptReason }
    if (column === null) return { field, column: null, state: 'n/a', reason: 'Not author-supplied.' }
    if (column === undefined) return { field, column: null, state: 'missing', reason: 'No import column maps to this field.' }
    if (!importKeys.has(column)) return { field, column, state: 'missing', reason: `Mapped column "${column}" is not in the import schema.` }
    return { field, column, state: 'ok', reason: '' }
  })
}

/** Read once, asserted three times — see `MEDIA_REQUEST_MAP`. */
const mediaRequestFields = await interfaceFields('src/data/contentControl.ts', 'MediaRequest')

const articleKeys = importFieldKeys('article')
const questionKeys = importFieldKeys('question')
const practicalKeys = importFieldKeys('practical')
const resourceKeys = importFieldKeys('catalogue-resource')
const conceptKeys = importFieldKeys('concept')
const relationKeys = importFieldKeys('relation')
const subjectKeys = importFieldKeys('subjects')
const minigameKeys = importFieldKeys('minigame')
const evidenceKeys = {
  resource: importFieldKeys('resource'),
  claim: importFieldKeys('claim'),
  citation: importFieldKeys('citation'),
  span: importFieldKeys('span'),
}

const groups = []

groups.push({
  contentType: 'Library article',
  model: 'ArticleAuthoringData',
  importFields: articleKeys.size,
  fields: assess('ArticleAuthoringData', await interfaceFields('src/data/contentControl.ts', 'ArticleAuthoringData'), ARTICLE_MAP, articleKeys),
})
groups.push({
  contentType: 'Library article · statement annotation',
  model: 'ConceptAnnotation',
  importFields: articleKeys.size,
  fields: assess('ConceptAnnotation', await interfaceFields('src/data/conceptGraph.ts', 'ConceptAnnotation'), ANNOTATION_MAP, articleKeys),
})
groups.push({
  contentType: 'Library article · media request',
  model: 'MediaRequest',
  importFields: articleKeys.size,
  fields: assess('MediaRequest', mediaRequestFields, MEDIA_REQUEST_MAP, articleKeys),
})
groups.push({
  contentType: 'Concept',
  model: 'Concept',
  importFields: conceptKeys.size,
  fields: assess('Concept', await interfaceFields('src/data/conceptGraph.ts', 'Concept'), CONCEPT_MAP, conceptKeys),
})
groups.push({
  contentType: 'Concept relation',
  model: 'ConceptRelation',
  importFields: relationKeys.size,
  fields: assess('ConceptRelation', await interfaceFields('src/data/conceptGraph.ts', 'ConceptRelation'), RELATION_MAP, relationKeys),
})
groups.push({
  contentType: 'Question',
  model: 'QuestionAuthoringData',
  importFields: questionKeys.size,
  fields: assess('QuestionAuthoringData', await interfaceFields('src/data/contentControl.ts', 'QuestionAuthoringData'), QUESTION_MAP, questionKeys),
})
groups.push({
  contentType: 'Question · tags',
  model: 'QuestionTags',
  importFields: questionKeys.size,
  fields: assess('QuestionTags', await interfaceFields('src/data/contentControl.ts', 'QuestionTags'), QUESTION_TAGS_MAP, questionKeys),
})
groups.push({
  contentType: 'Question · media request',
  model: 'MediaRequest',
  importFields: questionKeys.size,
  fields: assess('MediaRequest', mediaRequestFields, MEDIA_REQUEST_MAP, questionKeys),
})
groups.push({
  contentType: 'Practical · OSCE and checklist',
  model: 'OsceAuthoringData',
  importFields: practicalKeys.size,
  fields: assess('OsceAuthoringData', await practicalInterfaceFields('OsceAuthoringData'), OSCE_MAP, practicalKeys),
})
groups.push({
  contentType: 'Practical · clinical case',
  model: 'CaseAuthoringData',
  importFields: practicalKeys.size,
  fields: assess('CaseAuthoringData', await practicalInterfaceFields('CaseAuthoringData'), CASE_MAP, practicalKeys),
})
groups.push({
  contentType: 'Practical · case decision',
  model: 'ClinicalDecisionDraft',
  importFields: practicalKeys.size,
  fields: assess('ClinicalDecisionDraft', await interfaceFields('src/data/contentControl.ts', 'ClinicalDecisionDraft'), DECISION_MAP, practicalKeys),
})
groups.push({
  contentType: 'Practical · interpretation set',
  model: 'LabAuthoringData',
  importFields: practicalKeys.size,
  fields: assess('LabAuthoringData', await practicalInterfaceFields('LabAuthoringData'), LAB_MAP, practicalKeys),
})
groups.push({
  contentType: 'Practical · interpretation question',
  model: 'LabQuestionDraft',
  importFields: practicalKeys.size,
  fields: assess('LabQuestionDraft', await interfaceFields('src/data/contentControl.ts', 'LabQuestionDraft'), LAB_QUESTION_MAP, practicalKeys),
})
groups.push({
  contentType: 'Practical · media request',
  model: 'MediaRequest',
  importFields: practicalKeys.size,
  fields: assess('MediaRequest', mediaRequestFields, MEDIA_REQUEST_MAP, practicalKeys),
})
groups.push({
  contentType: 'Resource',
  model: 'ResourceAuthoringData',
  importFields: resourceKeys.size,
  fields: assess('ResourceAuthoringData', await interfaceFields('src/data/contentControl.ts', 'ResourceAuthoringData'), RESOURCE_AUTHORING_MAP, resourceKeys),
})
groups.push({
  contentType: 'Minigame · base pack',
  model: 'BasePack',
  importFields: minigameKeys.size,
  fields: assess('BasePack', await interfaceFields('src/data/minigamePacks.ts', 'BasePack'), MINIGAME_BASE_MAP, minigameKeys),
})
groups.push({
  contentType: 'Minigame · source metadata',
  model: 'MiniGameSource',
  importFields: minigameKeys.size,
  fields: assess('MiniGameSource', await interfaceFields('src/data/minigamePacks.ts', 'MiniGameSource'), MINIGAME_SOURCE_MAP, minigameKeys),
})
groups.push({
  contentType: 'Minigame · ordered pack',
  model: 'OrderedMiniGamePack',
  importFields: minigameKeys.size,
  fields: assess('OrderedMiniGamePack', await interfaceFields('src/data/minigamePacks.ts', 'OrderedMiniGamePack'), ORDERED_MINIGAME_MAP, minigameKeys),
})
groups.push({
  contentType: 'Minigame · ordered step',
  model: 'OrderedStep',
  importFields: minigameKeys.size,
  fields: assess('OrderedStep', await interfaceFields('src/data/minigamePacks.ts', 'OrderedStep'), ORDERED_STEP_MAP, minigameKeys),
})
groups.push({
  contentType: 'Minigame · red flag sort',
  model: 'RedFlagSortPack',
  importFields: minigameKeys.size,
  fields: assess('RedFlagSortPack', await interfaceFields('src/data/minigamePacks.ts', 'RedFlagSortPack'), RED_FLAG_SORT_MAP, minigameKeys),
})
groups.push({
  contentType: 'Minigame · red flag finding',
  model: 'RedFlagFinding',
  importFields: minigameKeys.size,
  fields: assess('RedFlagFinding', await interfaceFields('src/data/minigamePacks.ts', 'RedFlagFinding'), RED_FLAG_FINDING_MAP, minigameKeys),
})

// Subjects & Topics spans five interfaces, so it is assessed as one group.
const subjectFields = []
for (const name of ['CurriculumSystem', 'CurriculumTopic', 'CurriculumSubtopic', 'CurriculumMicro', 'CurriculumNano']) {
  const fields = await interfaceFields('src/data/curriculumCatalog.ts', name)
  subjectFields.push(...assess(name, fields, Object.fromEntries(fields.map((field) => [field, SUBJECT_MAP[`${name}.${field}`]])), subjectKeys, name)
    .map((entry) => ({ ...entry, field: `${name}.${entry.field}` })))
}
groups.push({
  contentType: 'Evidence · source',
  model: 'ResourceRecord',
  importFields: evidenceKeys.resource.size,
  fields: assess('ResourceRecord', await interfaceFields('src/data/medicalEvidence.ts', 'ResourceRecord'), RESOURCE_RECORD_MAP, evidenceKeys.resource),
})
groups.push({
  contentType: 'Evidence · claim',
  model: 'EvidenceClaim',
  importFields: evidenceKeys.claim.size,
  fields: assess('EvidenceClaim', await interfaceFields('src/data/medicalEvidence.ts', 'EvidenceClaim'), CLAIM_MAP, evidenceKeys.claim),
})
groups.push({
  contentType: 'Evidence · citation',
  model: 'CitationLink',
  importFields: evidenceKeys.citation.size,
  fields: assess('CitationLink', await interfaceFields('src/data/medicalEvidence.ts', 'CitationLink'), CITATION_MAP, evidenceKeys.citation),
})
groups.push({
  contentType: 'Evidence · article span',
  model: 'ArticleSpan',
  importFields: evidenceKeys.span.size,
  fields: assess('ArticleSpan', await interfaceFields('src/data/medicalEvidence.ts', 'ArticleSpan'), SPAN_MAP, evidenceKeys.span),
})
groups.push({ contentType: 'Subjects & Topics', model: 'CurriculumSystem tree', importFields: subjectKeys.size, fields: subjectFields })

const summary = groups.map((group) => ({
  contentType: group.contentType,
  model: group.model,
  modelFields: group.fields.length,
  importFields: group.importFields,
  ok: group.fields.filter((field) => field.state === 'ok').length,
  missing: group.fields.filter((field) => field.state === 'missing').length,
  notApplicable: group.fields.filter((field) => field.state === 'n/a').length,
}))

const gaps = groups.flatMap((group) => group.fields.filter((field) => field.state === 'missing').map((field) => ({ contentType: group.contentType, ...field })))

const report = { generatedAt: null, summary, gaps, groups }

await mkdir(outDir, { recursive: true })
await writeFile(join(outDir, 'field-parity-matrix.json'), `${JSON.stringify(report, null, 2)}\n`)

const md = [
  '# Import field-parity matrix',
  '',
  'Generated by `node --experimental-strip-types scripts/report-import-field-parity.mjs`.',
  'Model fields are read from the TypeScript sources at run time, so this cannot',
  'drift when a field is added.',
  '',
  '| Content type | Model | Model fields | Import columns | Importable | Gaps | Not applicable |',
  '|---|---|---:|---:|---:|---:|---:|',
  ...summary.map((row) => `| ${row.contentType} | \`${row.model}\` | ${row.modelFields} | ${row.importFields} | ${row.ok} | ${row.missing} | ${row.notApplicable} |`),
  '',
  gaps.length ? '## Gaps' : '## Gaps\n\nNone. Every model field is reachable by bulk import, or is recorded as not author-supplied.',
  ...(gaps.length ? ['', '| Content type | Field | Why |', '|---|---|---|', ...gaps.map((gap) => `| ${gap.contentType} | \`${gap.field}\` | ${gap.reason} |`)] : []),
  '',
  '## Fields deliberately outside the import contract',
  '',
  '| Field | Reason |',
  '|---|---|',
  ...Object.entries(IMPORT_EXEMPTIONS).map(([field, reason]) => `| \`${field}\` | ${reason} |`),
  '',
].join('\n')

await writeFile(join(outDir, 'field-parity-matrix.md'), md)

console.log(JSON.stringify({ summary, gapCount: gaps.length, gaps }, null, 2))
if (gaps.length) process.exitCode = 1
