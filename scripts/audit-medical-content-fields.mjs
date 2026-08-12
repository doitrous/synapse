import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
// `--source` lets the audit run against a simulated state as well as the
// shipped bundle, so a batch can be checked before anything is imported.
const sourceFlag = process.argv.indexOf('--source')
const sourceFile = sourceFlag === -1 ? join(here, '..', 'server', 'data', 'medical-library-v1.json') : process.argv[sourceFlag + 1]
const launch = JSON.parse(await readFile(sourceFile, 'utf8'))
const ledger = launch.states['synapse-admin-content-ledger-v4'] || []
const articles = ledger.filter((item) => item.kind === 'article')
const graph = launch.states['synapse-concept-graph-v2'] || { concepts: [], relations: [] }
const evidence = launch.states['synapse-medical-evidence-v1'] || { claims: [], citations: [], articleSpans: [], resources: [] }
const errors = []

const get = (value, path) => path.split('.').reduce((current, key) => current?.[key], value)
const hasValue = (value) => Array.isArray(value) ? value.length > 0 : value && typeof value === 'object' ? Object.keys(value).length > 0 : value !== '' && value !== null && value !== undefined
const hasPath = (value, path) => path.split('.').every((key) => {
  if (value === null || value === undefined || !Object.hasOwn(value, key)) return false
  value = value[key]
  return true
})
const missing = (items, paths, predicate = hasValue) => Object.fromEntries(paths.map((path) => [path, items.filter((item) => !predicate(get(item, path))).map((item) => item.id)]).filter(([, ids]) => ids.length))
const requirePaths = (kind, items, paths, predicate = hasValue) => {
  const absent = missing(items, paths, predicate)
  for (const [path, ids] of Object.entries(absent)) errors.push(`${kind}.${path} missing for ${ids.join(', ')}`)
  return absent
}

// These fields must contain a useful value for every article. Canonical taxonomy
// placement is the source of truth; the older curriculum overlay is optional.
const articlePopulated = [
  'title', 'subjectId', 'status', 'owner', 'updatedAt', 'fields.Topic', 'fields.Summary', 'fields.Reading time', 'fields.Content owner', 'fields.Reviewer', 'fields.Publisher',
  'articleData.templateId', 'articleData.archetype', 'articleData.language', 'articleData.learnerStage', 'articleData.summary', 'articleData.body', 'articleData.sections',
  'articleData.resourceIds', 'articleData.universityIds', 'articleData.yearIds', 'articleData.primaryNodeId', 'articleData.relatedConceptIds', 'articleData.relatedArticleIds',
  'articleData.reviewer', 'articleData.finalPublisher', 'articleData.highYield', 'articleData.timeSensitive', 'articleData.publicationGate', 'articleData.evidenceBasis',
  'articleData.claimIds', 'articleData.spanIds', 'articleData.notes', 'articleData.fieldNotes',
]
const articlePresent = [
  'articleData.publishedSections', 'articleData.publishedSummary', 'articleData.holdThese', 'articleData.loseTheMark', 'articleData.questionIds', 'articleData.moduleIds', 'articleData.secondaryNodeIds',
  'articleData.subtopicId', 'articleData.microtopicId', 'articleData.nanotopicId', 'articleData.universityNotes', 'articleData.articleLevelSourceIds',
  'articleData.conflicts', 'articleData.evidenceGaps', 'articleData.media', 'articleData.lastReviewed', 'articleData.reviewDue',
]
const conceptPopulated = [
  'label', 'canonicalKey', 'definition', 'status', 'articleIds', 'subjectId', 'primaryNodeId',
  'conceptType', 'learnerYears', 'universityIds', 'explicitObjective', 'blueprintWeight', 'examWeightByYear', 'clinicalRelevance', 'academicRelevance',
  'relatedArticleIds', 'resourceIds', 'atomicClaimIds', 'supportMode', 'confidence', 'originalWording', 'owner', 'reviewer',
  'finalPublisher', 'publicationStatus', 'editorialReviewStatus', 'weightConfidence', 'fieldNotes',
]
const conceptPresent = [
  'systemId', 'topicTagId', 'subtopicId', 'microtopicId', 'nanotopicId', 'secondaryNodeIds', 'relatedConceptIds', 'moduleIds',
  'aliases', 'arabicLabel', 'arabicAliases', 'pitfalls', 'approvedFileResourceIds', 'approvedVideoResourceIds', 'conflicts', 'uncertainty',
  'evidenceGaps', 'mergeIds', 'rejectedMergeCandidateIds', 'lastReviewed', 'reviewDue', 'exclusionReason',
]

const articleMissing = requirePaths('article', articles, articlePopulated)
const conceptMissing = requirePaths('concept', graph.concepts, conceptPopulated)
const articleFieldsAbsent = Object.fromEntries(articlePresent.map((path) => [path, articles.filter((article) => !hasPath(article, path)).map((article) => article.id)]).filter(([, ids]) => ids.length))
const conceptFieldsAbsent = Object.fromEntries(conceptPresent.map((path) => [path, graph.concepts.filter((concept) => !hasPath(concept, path)).map((concept) => concept.id)]).filter(([, ids]) => ids.length))

// requirePaths passes only the resolved value. Presence is checked separately to
// distinguish an intentional empty array/null from a field omitted by projection.
for (const article of articles) for (const path of articlePresent) if (!hasPath(article, path)) errors.push(`article.${path} absent for ${article.id}`)
for (const concept of graph.concepts) for (const path of conceptPresent) if (!hasPath(concept, path)) errors.push(`concept.${path} absent for ${concept.id}`)

const articleIntentionalBlanks = ['arabicTitle', 'aliases', 'questionIds', 'moduleIds', 'microtopicId', 'nanotopicId', 'media', 'lastReviewed', 'reviewDue']
for (const article of articles) {
  if (!Object.hasOwn(article.articleData || {}, 'evidenceGaps') || !Array.isArray(article.articleData.evidenceGaps)) errors.push(`${article.id}.evidenceGaps must be present as an array, including when no gaps remain`)
  for (const field of articleIntentionalBlanks) {
    if (!hasValue(article.articleData?.[field]) && !article.articleData?.fieldNotes?.[field]) errors.push(`${article.id}.${field} is blank without an explicit reason`)
  }
  if ([...article.articleData.sections, ...(article.articleData.publishedSections || [])].some((section) => section.kind === 'components')) errors.push(`${article.id} still carries a Components and relations section`)
  if (article.status === 'Published' && !article.articleData.publishedSections.length) errors.push(`${article.id} has no safe student projection`)
}

// `resourceOccurrenceIds` moved here when the first hand-authored concepts
// landed: the field records where a *pipeline-extracted* concept appears in the
// corpus, and a concept written by a person has no such record. Requiring it
// would have forced a fabricated ID, so it now needs an explicit reason instead.
//
// `sourceCandidateIds` joined it one system later, for the same reason. Some
// concepts have no corpus candidate because the local curriculum does not teach
// them at all — the corpus holds nothing for frailty, sarcopenia or stunting.
// That absence is a finding worth recording, and requiring the field made the
// nearest wrong ID tempting: searching the corpus for "falls" returns
// "Fallopian". Blank is now allowed, but only with a stated reason, so "the
// corpus has none" stays distinguishable from "the author did not look".
const conceptIntentionalBlanks = ['arabicLabel', 'aliases', 'pitfalls', 'moduleIds', 'microtopicId', 'nanotopicId', 'approvedFileResourceIds', 'approvedVideoResourceIds', 'lastReviewed', 'reviewDue', 'resourceOccurrenceIds', 'sourceCandidateIds']
for (const concept of graph.concepts) {
  for (const field of conceptIntentionalBlanks) {
    if (!hasValue(concept[field]) && !concept.fieldNotes?.[field]) errors.push(`${concept.id}.${field} is blank without an explicit reason`)
  }
}

const articleIds = new Set(articles.map((article) => article.id))
const conceptIds = new Set(graph.concepts.map((concept) => concept.id))
const claimIds = new Set(evidence.claims.map((claim) => claim.id))
const citationIds = new Set(evidence.citations.map((citation) => citation.id))
const resourceIds = new Set(evidence.resources.map((resource) => resource.id))
const spanIds = new Set(evidence.articleSpans.map((span) => span.id))
for (const concept of graph.concepts) {
  for (const id of concept.resourceIds || []) if (!resourceIds.has(id)) errors.push(`${concept.id} references unknown resource ${id}`)
}
for (const article of articles) {
  for (const id of article.articleData.relatedConceptIds || []) if (!conceptIds.has(id)) errors.push(`${article.id} references unknown concept ${id}`)
  for (const id of article.articleData.relatedArticleIds || []) if (!articleIds.has(id)) errors.push(`${article.id} references unknown article ${id}`)
  for (const id of article.articleData.claimIds || []) if (!claimIds.has(id)) errors.push(`${article.id} references unknown claim ${id}`)
  for (const id of article.articleData.spanIds || []) if (!spanIds.has(id)) errors.push(`${article.id} references unknown span ${id}`)
}
for (const relation of graph.relations) {
  if (!conceptIds.has(relation.sourceId) || !conceptIds.has(relation.targetId)) errors.push(`${relation.id} has an unknown concept endpoint`)
  if (!(relation.evidenceClaimIds || []).length || !(relation.citationIds || []).length) errors.push(`${relation.id} has no evidence chain`)
  for (const id of relation.evidenceClaimIds || []) if (!claimIds.has(id)) errors.push(`${relation.id} references unknown claim ${id}`)
  for (const id of relation.citationIds || []) if (!citationIds.has(id)) errors.push(`${relation.id} references unknown citation ${id}`)
}
for (const citation of evidence.citations) {
  if (!claimIds.has(citation.claimId)) errors.push(`${citation.id} references unknown claim ${citation.claimId}`)
  if (!resourceIds.has(citation.resourceId)) errors.push(`${citation.id} references unknown resource ${citation.resourceId}`)
  if (citation.countsAsClaimEvidence && !hasValue(citation.locator)) errors.push(`${citation.id} counts as evidence without an exact locator`)
}

const citedResourceCount = (span) => new Set(span.citationIds.map((id) => evidence.citations.find((citation) => citation.id === id)?.resourceId).filter(Boolean)).size
const report = {
  migrationId: launch.migrationId,
  articles: articles.length,
  articleFieldsChecked: articlePopulated.length + articlePresent.length + articleIntentionalBlanks.length,
  articleSections: articles.reduce((sum, article) => sum + article.articleData.sections.length, 0),
  // A section is evidence-linked when a span points at it. `spanIds` is only an
  // ordering hint, so counting it alone under-reports every imported article.
  evidenceLinkedSections: articles.reduce((sum, article) => sum + article.articleData.sections.filter((section) =>
    section.spanIds?.length || evidence.articleSpans.some((span) => span.articleId === article.id && span.sectionId === section.id)).length, 0),
  concepts: graph.concepts.length,
  conceptFieldsChecked: conceptPopulated.length + conceptPresent.length + conceptIntentionalBlanks.length,
  conceptsWithTypedRelationships: graph.concepts.filter((concept) => graph.relations.some((relation) => relation.sourceId === concept.id || relation.targetId === concept.id)).length,
  relations: graph.relations.length,
  verifiedRelations: graph.relations.filter((relation) => relation.verificationStatus === 'verified').length,
  claims: evidence.claims.length,
  citations: evidence.citations.length,
  spansWithMultipleResources: evidence.articleSpans.filter((span) => citedResourceCount(span) > 1).length,
  articleMissing,
  conceptMissing,
  articleFieldsAbsent,
  conceptFieldsAbsent,
  errors,
}

console.log(JSON.stringify(report, null, 2))
if (errors.length) process.exitCode = 1
