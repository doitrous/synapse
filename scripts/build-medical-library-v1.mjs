import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { basename, dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(here, '..')
const bundlePath = process.env.MEDICAL_BUNDLE_PATH || '/Users/doitrous/Documents/CodexGPT/Concepts and Questions Creation Codex/medical-library/systems/cardiovascular/bundle.json'
const outputPath = join(projectRoot, 'server', 'data', 'medical-library-v1.json')
const bundle = JSON.parse(await readFile(bundlePath, 'utf8'))
const { CURRICULUM_CATALOG, PILOT_ARTICLE_PLACEMENTS } = await import('../src/data/curriculumCatalog.ts')
const { MEDICAL_TAXONOMY_SEED } = await import('../src/data/medicalLibraryTaxonomy.ts')

const owner = 'Admin team'
const reviewer = 'Medical team, Admin team'
const publisher = 'Admin team'
const generatedAt = bundle.generated_at || new Date().toISOString()

const universitySeeds = [
  ['kau', 'Kasr Alainy - Cairo University', 'KAU', 'Cairo'],
  ['asu', 'Ain Shams University', 'ASU', 'Cairo'],
  ['au', 'Alexandria University', 'AU', 'Alexandria'],
  ['hu', 'Helwan University', 'HU', 'Helwan, Cairo'],
  ['bu', 'Beni Suef University', 'BU', 'Beni Suef'],
  ['fu', 'Fayoum University', 'FU', 'Fayoum'],
  ['mu', 'Menoufia University', 'MU', 'Menoufia'],
  ['tu', 'Tanta University', 'TU', 'Tanta'],
  ['zu', 'Zagazig University', 'ZU', 'Zagazig'],
  ['mti', 'MTI University', 'MTI', 'Cairo'],
  ['must', 'MUST University', 'MUST', 'October City, Cairo'],
  ['ksu', 'Kafr Elsheikh University', 'KSU', 'Kafr El Sheikh'],
]

const buildYears = (code) => [1, 2, 3, 4, 5].map((n) => ({ id: `${code}_Y${n}`, year: `Year ${n}`, students: 0, courses: [], terms: [] })).concat([
  { id: `${code}_INT1`, year: 'Internship Year 1', students: 0, courses: [], terms: [] },
  { id: `${code}_INT2`, year: 'Internship Year 2', students: 0, courses: [], terms: [] },
])
const universities = universitySeeds.map(([id, name, short, region]) => ({ id, name, short, region, years: buildYears(short) }))

const safeName = (value) => value.replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, ' ').trim()
const sanitisePublicValue = (value) => {
  if (typeof value === 'string') return /(?:file:\/\/)?\/Users\//.test(value) ? undefined : value
  if (Array.isArray(value)) return value.map(sanitisePublicValue).filter((item) => item !== undefined)
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, sanitisePublicValue(item)]).filter(([, item]) => item !== undefined))
  return value
}
const storageKeyFor = (resource) => {
  if (!resource.source_relative_path || /^https?:/i.test(resource.source_uri || '')) return undefined
  const institution = resource.institution === 'Kasr Alainy' ? 'KAU' : safeName(resource.institution || 'Miscellaneous')
  const collection = resource.collection_id ? safeName(resource.collection_id.replace(/[_-]+/g, ' ')) : 'Miscellaneous'
  return `${institution}/Cardiovascular/${collection}/${safeName(basename(resource.source_relative_path))}`
}

const resources = bundle.resources.map((resource) => ({
  id: resource.id,
  institution: resource.institution,
  collectionId: resource.collection_id,
  collectionPriority: resource.collection_priority,
  title: resource.title,
  storageKey: storageKeyFor(resource),
  sourceRelativePath: resource.source_relative_path || undefined,
  sourceUri: /^https?:/i.test(resource.source_uri || '') ? resource.source_uri : undefined,
  mediaType: resource.media_type,
  languages: resource.languages || [],
  publicationDate: resource.publication_date,
  pageCount: resource.page_count,
  sha256: resource.sha256,
  processingStatus: resource.processing_status,
  rights: sanitisePublicValue(resource.rights),
  validation: sanitisePublicValue(resource.validation),
  confidence: resource.confidence,
  isAssessment: resource.is_assessment,
  qualification: typeof resource.qualification === 'string' ? resource.qualification : JSON.stringify(resource.qualification || {}),
  accessedAt: resource.accessed_at,
}))

const spanById = new Map(bundle.article_spans.map((span) => [span.id, span]))
const claimsById = new Map(bundle.claims.map((claim) => [claim.id, claim]))
const citationsById = new Map(bundle.citations.map((citation) => [citation.id, citation]))

const stripEvidenceMarkup = (body) => String(body || '')
  .replace(/<!--\s*\/?evidence:[^>]*-->/g, '')
  .replace(/^[-*]\s+/gm, '')
  .replace(/\n{3,}/g, '\n\n')
  .trim()

const placementFor = (articleId) => {
  const target = PILOT_ARTICLE_PLACEMENTS[articleId]
  const system = CURRICULUM_CATALOG.find((node) => node.id === 'cvs')
  const topic = system?.topics.find((node) => node.title === target?.topicTitle)
  const subtopic = topic?.subs.find((node) => node.title === target?.subtopicTitle)
  if (!system || !topic || !subtopic) throw new Error(`Missing taxonomy placement for ${articleId}`)
  return { system, topic, subtopic }
}

const canonicalPlacementSeeds = {
  'ART-CVS-HEART-ORIENTATION': ['SYS-CVS-T01-S01', ['DIS-ANA-T04']],
  'ART-CVS-CHAMBERS-VALVES': ['SYS-CVS-T01-S01', ['SYS-CVS-T01-S01-M01', 'SYS-CVS-T01-S01-M02', 'DIS-ANA-T04']],
  'ART-CVS-CORONARY-CIRCULATION': ['SYS-CVS-T01-S01-M03', ['SYS-CVS-T01-S01', 'DIS-ANA-T04']],
  'ART-CVS-CARDIAC-HISTOLOGY': ['SYS-CVS-T01-S01', ['DIS-HIS-T03']],
  'ART-CVS-CONDUCTION': ['SYS-CVS-T01-S01-M04', ['DIS-ANA-T04', 'DIS-PHY-T02']],
  'ART-CVS-CARDIAC-ELECTRICAL': ['SYS-CVS-T01-S02', ['SYS-CVS-T01-S01-M04', 'DIS-PHY-T02', 'SKL-INT-T03-S01']],
  'ART-CVS-CARDIAC-CYCLE': ['SYS-CVS-T01-S02-M01', ['DIS-PHY-T02']],
  'ART-CVS-CARDIAC-OUTPUT': ['SYS-CVS-T01-S02-M02', ['DIS-PHY-T02']],
  'ART-CVS-BLOOD-PRESSURE': ['SYS-CVS-T01-S02-M03', ['DIS-PHY-T02']],
  'ART-CVS-VASCULAR-FLOW': ['SYS-CVS-T01-S02-M02', ['DIS-PHY-T02']],
}
const canonicalNodeIds = new Set(MEDICAL_TAXONOMY_SEED.map((node) => node.id))
const canonicalPlacementFor = (articleId) => {
  const seed = canonicalPlacementSeeds[articleId]
  if (!seed) throw new Error(`Missing canonical medical taxonomy placement for ${articleId}`)
  const [primaryNodeId, secondaryNodeIds] = seed
  for (const nodeId of [primaryNodeId, ...secondaryNodeIds]) {
    if (!canonicalNodeIds.has(nodeId)) throw new Error(`Unknown canonical medical taxonomy ID ${nodeId} for ${articleId}`)
  }
  return { primaryNodeId, secondaryNodeIds }
}

const archetypeMap = {
  'Anatomy / structure': 'anatomy',
  'Concept / mechanism': 'concept',
  'Investigation / interpretation': 'investigation',
  'Condition / disease': 'condition',
  'Presentation / symptom': 'presentation',
  'Drug / therapeutics': 'drug',
  'Skill / procedure': 'skill',
  'Organism / infection': 'organism',
  'Emergency / acute care': 'emergency',
  'Public health / prevention': 'public-health',
}

const articleItems = bundle.articles.map((article) => {
  const place = placementFor(article.id)
  const canonicalPlace = canonicalPlacementFor(article.id)
  const sectionSpans = new Map()
  bundle.article_spans.filter((span) => span.article_id === article.id).forEach((span) => sectionSpans.set(span.section_id, [...(sectionSpans.get(span.section_id) || []), span.id]))
  const sortedSections = [...article.sections]
    .map((section) => ({
      id: section.id,
      heading: section.heading,
      body: stripEvidenceMarkup(section.body),
      kind: /components\s+and\s+relations/i.test(section.heading) ? 'components' : 'content',
      spanIds: sectionSpans.get(section.id) || [],
    }))
    .sort((a, b) => (a.kind === 'components' ? 1 : 0) - (b.kind === 'components' ? 1 : 0))
  const publishable = article.status === 'published'
  const universityNotes = Object.entries(article.university_notes || {}).map(([name, text], index) => ({ id: `${article.id}-unote-${index + 1}`, universityId: name === 'Kasr Alainy' ? 'kau' : '', text }))
  return {
    id: article.id,
    kind: 'article',
    title: article.title,
    subjectId: 'cvs',
    status: publishable ? 'Published' : 'In review',
    owner,
    updatedAt: generatedAt,
    fields: {
      Topic: place.topic.title,
      Summary: article.summary,
      'Reading time': String(article.reading_time || 8),
      'Key point': article.hold_these?.[0] || '',
      'Template ID': article.template_id || '',
      Archetype: article.archetype || '',
      'Evidence state': article.status,
      'Publication gate': article.publication_gate || '',
      Reviewer: reviewer,
      Publisher: publisher,
    },
    articleData: {
      arabicTitle: article.arabic_title || '',
      aliases: article.aliases || [],
      templateId: article.template_id,
      archetype: archetypeMap[article.archetype] || 'concept',
      language: article.language || 'English',
      summary: article.summary,
      body: stripEvidenceMarkup(article.body),
      sections: sortedSections,
      holdThese: article.hold_these || [],
      loseTheMark: article.lose_the_mark || [],
      questionIds: article.question_ids || [],
      resourceIds: article.resource_ids || [],
      annotations: [],
      universityIds: ['kau'],
      yearIds: (article.years || []).map((year) => `KAU_Y${year}`),
      moduleIds: [],
      primaryNodeId: canonicalPlace.primaryNodeId,
      secondaryNodeIds: canonicalPlace.secondaryNodeIds,
      subtopicId: place.subtopic.subId,
      relatedConceptIds: article.related_concept_ids || [],
      relatedArticleIds: article.related_article_ids || [],
      universityNotes,
      reviewer,
      finalPublisher: publisher,
      reviewDue: article.review_due || '',
      lastReviewed: article.last_reviewed || '',
      highYield: article.high_yield || 'Core',
      timeSensitive: article.time_sensitive === 'time_sensitive' ? 'time_sensitive' : 'stable',
      publicationGate: publishable ? 'publishable' : 'needs_evidence',
      evidenceBasis: article.evidence_basis || [],
      articleLevelSourceIds: article.article_level_sources || [],
      claimIds: (article.claim_annotations || []).flatMap((spanId) => spanById.get(spanId)?.claim_ids || []),
      spanIds: article.claim_annotations || [],
      conflicts: article.conflicts || [],
      evidenceGaps: article.evidence_gaps || [],
      notes: article.notes || '',
    },
  }
})

const resourceItems = resources.map((resource) => ({
  id: resource.id,
  kind: 'resource',
  title: resource.title,
  subjectId: 'cvs',
  status: resource.sourceUri ? 'Published' : 'In review',
  owner,
  updatedAt: generatedAt,
  fields: {
    Type: resource.sourceUri ? 'Article' : resource.mediaType === 'pdf' ? 'Book' : 'Article',
    Source: resource.institution || '',
    Location: resource.storageKey || resource.sourceUri || 'Pending secure upload',
    Year: resource.publicationDate ? String(resource.publicationDate).slice(0, 4) : '',
    Chapter: 'Cardiovascular pilot',
    'Processing state': resource.processingStatus,
    'Storage state': resource.storageKey ? 'pending_upload' : 'external',
    Rights: typeof resource.rights === 'string' ? resource.rights : JSON.stringify(resource.rights || {}),
  },
  resourceData: {
    universityIds: resource.institution === 'Kasr Alainy' ? ['kau'] : [],
    yearIds: [],
    institution: resource.institution,
    collectionId: resource.collectionId,
    storageKey: resource.storageKey,
    sha256: resource.sha256,
    rights: typeof resource.rights === 'string' ? resource.rights : JSON.stringify(resource.rights || {}),
    processingStatus: resource.processingStatus,
    reviewer,
    finalPublisher: publisher,
    chapters: ['Cardiovascular pilot'],
    moduleIds: [],
    includedConceptIds: bundle.concepts.filter((concept) => (concept.atomic_claim_ids || []).some((claimId) => (claimsById.get(claimId)?.citation_ids || []).some((citationId) => citationsById.get(citationId)?.resource_id === resource.id))).map((concept) => concept.id),
    includedArticleIds: bundle.articles.filter((article) => (article.resource_ids || []).includes(resource.id)).map((article) => article.id),
    conceptLocations: [],
  },
}))

const articleForConcept = new Map()
bundle.concepts.forEach((concept) => (concept.related_article_ids || []).forEach((articleId) => articleForConcept.set(concept.id, articleId)))

const concepts = bundle.concepts.map((concept) => {
  const articleId = articleForConcept.get(concept.id)
  const place = placementFor(articleId)
  const canonicalPlace = canonicalPlacementFor(articleId)
  const micro = place.subtopic.micros.find((node) => node.title.toLowerCase() === String(concept.subtopic || '').toLowerCase())
  return {
    id: concept.id,
    label: concept.label,
    canonicalKey: concept.canonical_key,
    aliases: concept.aliases || [],
    arabicLabel: concept.arabic_label || '',
    arabicAliases: concept.arabic_aliases || [],
    definition: concept.definition,
    pitfalls: (concept.pitfalls || []).join('\n'),
    status: concept.status === 'published' ? 'active' : 'under review',
    articleIds: concept.related_article_ids || [],
    subjectId: 'cvs',
    topicId: place.topic.id,
    systemId: place.system.sysId,
    topicTagId: place.topic.tpcId,
    subtopicId: place.subtopic.subId,
    microtopicId: micro?.micId,
    primaryNodeId: canonicalPlace.primaryNodeId,
    secondaryNodeIds: [...new Set([...canonicalPlace.secondaryNodeIds, ...(concept.secondary_node_ids || []).filter((nodeId) => canonicalNodeIds.has(nodeId))])],
    conceptType: concept.concept_type,
    learnerYears: concept.years || [],
    universityIds: ['kau'],
    moduleIds: [],
    explicitObjective: concept.explicit_objective,
    blueprintWeight: concept.blueprint_weight,
    examWeightByYear: Object.fromEntries(Object.entries(concept.exam_weight_by_year || {}).map(([year, weight]) => [`KAU_Y${year}`, weight])),
    clinicalRelevance: concept.clinical_relevance,
    academicRelevance: concept.academic_relevance,
    relatedConceptIds: [],
    relatedArticleIds: concept.related_article_ids || [],
    approvedFileResourceIds: [],
    approvedVideoResourceIds: [],
    atomicClaimIds: concept.atomic_claim_ids || [],
    resourceOccurrenceIds: concept.resource_occurrence_ids || [],
    supportMode: concept.support_mode,
    confidence: concept.confidence,
    conflicts: concept.conflicts || [],
    uncertainty: concept.uncertainty || [],
    evidenceGaps: concept.evidence_gaps || [],
    sourceCandidateIds: concept.source_candidate_ids || [],
    mergeIds: concept.merge_ids || [],
    rejectedMergeCandidateIds: concept.rejected_merge_candidate_ids || [],
    originalWording: concept.original_wording || [],
    owner,
    reviewer,
    lastReviewed: concept.last_reviewed || '',
    reviewDue: concept.review_due || '',
    publicationStatus: concept.publication_status,
    exclusionReason: concept.exclusion_reason,
    weightConfidence: concept.weight_confidence,
  }
})

// Only emit a semantic concept-to-concept relation when the supplied wording
// explicitly names another canonical concept. Shared article membership alone
// never creates a relationship.
const relations = []
for (const concept of concepts) {
  for (const target of concepts) {
    if (concept.id === target.id || target.label.length < 9) continue
    if (!concept.definition.toLowerCase().includes(target.label.toLowerCase())) continue
    const claimIds = concept.atomicClaimIds || []
    const citationIds = claimIds.flatMap((id) => claimsById.get(id)?.citation_ids || [])
    relations.push({
      id: `REL-${concept.id}-${target.id}`,
      sourceId: concept.id,
      type: 'related_concepts',
      targetId: target.id,
      evidenceClaimIds: claimIds,
      citationIds,
      confidence: Math.min(concept.confidence || 0, target.confidence || 0),
      verificationStatus: claimIds.every((id) => claimsById.get(id)?.verification_status === 'verified') ? 'verified' : 'needs_evidence',
      qualifiers: { derivation: 'explicit_target_label_in_supplied_definition' },
      reviewer,
      reviewedAt: generatedAt,
    })
  }
}

const claims = bundle.claims.map((claim) => ({
  id: claim.id,
  conceptId: claim.concept_id,
  subject: claim.subject,
  predicate: claim.predicate,
  object: claim.object,
  qualifiers: claim.qualifiers || {},
  displayText: claim.display_text,
  riskClass: claim.risk_class,
  verificationStatus: claim.verification_status,
  conflictStatus: claim.conflict_status,
  confidence: claim.confidence,
  freshness: claim.freshness,
  timeSensitive: claim.time_sensitive,
  reviewDue: claim.review_due,
  citationIds: claim.citation_ids || [],
}))

const citations = bundle.citations.map((citation) => ({
  id: citation.id,
  claimId: citation.claim_id,
  resourceId: citation.resource_id,
  evidenceRole: citation.evidence_role,
  locator: sanitisePublicValue(citation.locator),
  supportSpan: citation.support_span,
  contextNote: citation.context_note,
  confidence: citation.confidence,
  countsAsClaimEvidence: citation.counts_as_claim_evidence,
}))

const articleSpans = bundle.article_spans.map((span) => ({
  id: span.id,
  articleId: span.article_id,
  sectionId: span.section_id,
  textHash: span.text_hash,
  currentLine: span.current_line,
  text: (span.claim_ids || []).map((id) => claimsById.get(id)?.display_text).filter(Boolean).join(' '),
  claimIds: span.claim_ids || [],
  citationIds: span.citation_ids || [],
}))

const evidence = {
  schemaVersion: bundle.schema_version || '1.0.0',
  generatedAt,
  claims,
  citations,
  resources,
  articleSpans,
  merges: bundle.merges.map((record) => ({
    id: record.id,
    retainedConceptId: record.retained_concept_id,
    mergedCandidateIds: record.merged_candidate_ids || [],
    rule: record.rule,
    timestamp: record.timestamp,
    reversible: record.reversible,
    lineage: sanitisePublicValue(record.lineage || []),
  })),
  coverage: bundle.coverage.map((record) => ({
    sourceId: record.source_id,
    candidateId: record.candidate_id,
    canonicalConceptId: record.canonical_concept_id,
    decision: record.decision,
    reason: record.reason,
  })),
}

const publishedArticleIds = new Set(articleItems.filter((item) => item.status === 'Published').map((item) => item.id))
const publishedArticleSpans = articleSpans.filter((span) => publishedArticleIds.has(span.articleId))
const publishedClaimIds = new Set(publishedArticleSpans.flatMap((span) => span.claimIds))
const publishedClaims = claims.filter((claim) => publishedClaimIds.has(claim.id) && claim.verificationStatus === 'verified')
const verifiedPublishedClaimIds = new Set(publishedClaims.map((claim) => claim.id))
const publishedCitations = citations.filter((citation) => verifiedPublishedClaimIds.has(citation.claimId))
const publishedResourceIds = new Set(publishedCitations.map((citation) => citation.resourceId))
const publishedEvidence = {
  schemaVersion: evidence.schemaVersion,
  generatedAt,
  claims: publishedClaims,
  citations: publishedCitations,
  resources: resources.filter((resource) => publishedResourceIds.has(resource.id)),
  articleSpans: publishedArticleSpans.filter((span) => span.claimIds.some((id) => verifiedPublishedClaimIds.has(id))),
  merges: [],
  coverage: [],
}

const data = {
  migrationId: '2026-08-10-medical-library-v2',
  generatedAt,
  states: {
    'synapse-academic-universities-v1': universities,
    'synapse-course-curricula-v1': {},
    'synapse-module-schedules-v1': {},
    'synapse-taxonomy-tree-v4': CURRICULUM_CATALOG,
    'synapse-medical-library-taxonomy-v1': MEDICAL_TAXONOMY_SEED,
    'synapse-admin-content-ledger-v4': [...articleItems, ...resourceItems],
    'synapse-concept-graph-v2': { concepts, relations },
    'synapse-medical-evidence-v1': evidence,
    'synapse-medical-evidence-published-v1': publishedEvidence,
    'synapse-relation-types-v1': [],
  },
  demoStudentIds: ['stu-001', 'stu-002', 'stu-003', 'stu-004', 'stu-005', 'stu-006'],
  report: {
    universities: universities.length,
    years: universities.reduce((sum, university) => sum + university.years.length, 0),
    systems: CURRICULUM_CATALOG.length,
    topics: CURRICULUM_CATALOG.reduce((sum, system) => sum + system.topics.length, 0),
    medicalTaxonomyNodes: MEDICAL_TAXONOMY_SEED.length,
    medicalSystemRoots: MEDICAL_TAXONOMY_SEED.filter((node) => node.division === 'system' && node.parentId === null).length,
    medicalDisciplineRoots: MEDICAL_TAXONOMY_SEED.filter((node) => node.division === 'discipline' && node.parentId === null).length,
    medicalSkillRoots: MEDICAL_TAXONOMY_SEED.filter((node) => node.division === 'skills' && node.parentId === null).length,
    medicalKnowledgeRoots: MEDICAL_TAXONOMY_SEED.filter((node) => node.division === 'knowledge' && node.parentId === null).length,
    articles: articleItems.length,
    publishedArticles: articleItems.filter((item) => item.status === 'Published').length,
    concepts: concepts.length,
    activeConcepts: concepts.filter((concept) => concept.status === 'active').length,
    relations: relations.length,
    verifiedRelations: relations.filter((relation) => relation.verificationStatus === 'verified').length,
    claims: claims.length,
    verifiedClaims: claims.filter((claim) => claim.verificationStatus === 'verified').length,
    citations: citations.length,
    claimEvidenceCitations: citations.filter((citation) => citation.countsAsClaimEvidence).length,
    resources: resources.length,
    resourcesPendingUpload: resources.filter((resource) => resource.storageKey).length,
    absolutePathsExposed: JSON.stringify({ articleItems, concepts, relations, evidence }).includes('/Users/'),
  },
}

if (data.report.absolutePathsExposed) throw new Error('Sanitisation failed: an absolute authoring path remains in the launch package')
if (data.report.universities !== 12 || data.report.years !== 84) throw new Error('University/year catalogue failed deterministic-count validation')
if (data.report.articles !== 10 || data.report.concepts !== 140 || data.report.claims !== 140) throw new Error('Pilot coverage count mismatch')

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`)
console.log(JSON.stringify(data.report, null, 2))
