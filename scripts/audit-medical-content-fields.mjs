import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const launch = JSON.parse(await readFile(join(here, '..', 'server', 'data', 'medical-library-v1.json'), 'utf8'))
const ledger = launch.states['synapse-admin-content-ledger-v4'] || []
const articles = ledger.filter((item) => item.kind === 'article')
const graph = launch.states['synapse-concept-graph-v2'] || { concepts: [], relations: [] }
const evidence = launch.states['synapse-medical-evidence-v1'] || { claims: [], citations: [], articleSpans: [], resources: [] }
const errors = []

const get = (value, path) => path.split('.').reduce((current, key) => current?.[key], value)
const hasValue = (value) => Array.isArray(value) ? value.length > 0 : value && typeof value === 'object' ? Object.keys(value).length > 0 : value !== '' && value !== null && value !== undefined
const missing = (items, paths) => Object.fromEntries(paths.map((path) => [path, items.filter((item) => !hasValue(get(item, path))).map((item) => item.id)]).filter(([, ids]) => ids.length))
const requirePaths = (kind, items, paths) => {
  const absent = missing(items, paths)
  for (const [path, ids] of Object.entries(absent)) errors.push(`${kind}.${path} missing for ${ids.join(', ')}`)
  return absent
}

const articleRequired = [
  'title', 'subjectId', 'status', 'owner', 'updatedAt', 'fields.Topic', 'fields.Summary', 'fields.Reading time', 'fields.Content owner', 'fields.Reviewer', 'fields.Publisher',
  'articleData.templateId', 'articleData.archetype', 'articleData.language', 'articleData.learnerStage', 'articleData.summary', 'articleData.body', 'articleData.sections',
  'articleData.holdThese', 'articleData.loseTheMark', 'articleData.resourceIds', 'articleData.universityIds', 'articleData.yearIds', 'articleData.primaryNodeId',
  'articleData.secondaryNodeIds', 'articleData.subtopicId', 'articleData.relatedConceptIds', 'articleData.relatedArticleIds', 'articleData.universityNotes',
  'articleData.reviewer', 'articleData.finalPublisher', 'articleData.highYield', 'articleData.timeSensitive', 'articleData.publicationGate', 'articleData.evidenceBasis',
  'articleData.articleLevelSourceIds', 'articleData.claimIds', 'articleData.spanIds', 'articleData.notes', 'articleData.fieldNotes',
]
const conceptRequired = [
  'label', 'canonicalKey', 'definition', 'status', 'articleIds', 'subjectId', 'systemId', 'topicTagId', 'subtopicId', 'primaryNodeId', 'secondaryNodeIds',
  'conceptType', 'learnerYears', 'universityIds', 'explicitObjective', 'blueprintWeight', 'examWeightByYear', 'clinicalRelevance', 'academicRelevance',
  'relatedArticleIds', 'resourceIds', 'atomicClaimIds', 'resourceOccurrenceIds', 'supportMode', 'confidence', 'sourceCandidateIds', 'originalWording', 'owner', 'reviewer',
  'finalPublisher', 'publicationStatus', 'editorialReviewStatus', 'weightConfidence', 'fieldNotes',
]

const articleMissing = requirePaths('article', articles, articleRequired)
const conceptMissing = requirePaths('concept', graph.concepts, conceptRequired)

const articleIntentionalBlanks = ['arabicTitle', 'aliases', 'questionIds', 'moduleIds', 'microtopicId', 'nanotopicId', 'media', 'lastReviewed', 'reviewDue']
for (const article of articles) {
  if (!Object.hasOwn(article.articleData || {}, 'evidenceGaps') || !Array.isArray(article.articleData.evidenceGaps)) errors.push(`${article.id}.evidenceGaps must be present as an array, including when no gaps remain`)
  for (const field of articleIntentionalBlanks) {
    if (!hasValue(article.articleData?.[field]) && !article.articleData?.fieldNotes?.[field]) errors.push(`${article.id}.${field} is blank without an explicit reason`)
  }
  if (article.articleData.sections.at(-1)?.kind !== 'components') errors.push(`${article.id} does not end with Components and relations`)
}

const conceptIntentionalBlanks = ['arabicLabel', 'aliases', 'pitfalls', 'moduleIds', 'microtopicId', 'nanotopicId', 'approvedFileResourceIds', 'approvedVideoResourceIds', 'lastReviewed', 'reviewDue']
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
  articleFieldsChecked: articleRequired.length + articleIntentionalBlanks.length,
  articleSections: articles.reduce((sum, article) => sum + article.articleData.sections.length, 0),
  evidenceLinkedSections: articles.reduce((sum, article) => sum + article.articleData.sections.filter((section) => section.spanIds?.length).length, 0),
  concepts: graph.concepts.length,
  conceptFieldsChecked: conceptRequired.length + conceptIntentionalBlanks.length,
  conceptsWithTypedRelationships: graph.concepts.filter((concept) => graph.relations.some((relation) => relation.sourceId === concept.id || relation.targetId === concept.id)).length,
  relations: graph.relations.length,
  verifiedRelations: graph.relations.filter((relation) => relation.verificationStatus === 'verified').length,
  claims: evidence.claims.length,
  citations: evidence.citations.length,
  spansWithMultipleResources: evidence.articleSpans.filter((span) => citedResourceCount(span) > 1).length,
  articleMissing,
  conceptMissing,
  errors,
}

console.log(JSON.stringify(report, null, 2))
if (errors.length) process.exitCode = 1
