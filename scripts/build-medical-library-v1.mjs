import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { gzipSync } from 'node:zlib'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(here, '..')
const bundlePath = process.env.MEDICAL_BUNDLE_PATH || '/Users/doitrous/Documents/CodexGPT/Concepts and Questions Creation Codex/medical-library/full-catalog.json'
const outputPath = join(projectRoot, 'server', 'data', 'medical-library-v1.json')
const coverageOutputPath = join(projectRoot, 'server', 'data', 'medical-library-coverage-v6.json.gz')
const bundle = JSON.parse(await readFile(bundlePath, 'utf8'))
const manifestDirectory = join(dirname(bundlePath), 'manifests')
const kasrCoverageAudit = JSON.parse(await readFile(join(manifestDirectory, 'kasr-coverage-quality-audit.json'), 'utf8'))
const sourceAvailabilityAudit = JSON.parse(await readFile(join(manifestDirectory, 'source-availability-audit.json'), 'utf8'))
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
const tidyFolderName = (value) => safeName(value).replace(/^\d+\.\s*/, '').trim() || 'Miscellaneous'
const sanitisePublicValue = (value) => {
  if (typeof value === 'string') return /(?:file:\/\/)?\/Users\//.test(value) ? undefined : value
  if (Array.isArray(value)) return value.map(sanitisePublicValue).filter((item) => item !== undefined)
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, sanitisePublicValue(item)]).filter(([, item]) => item !== undefined))
  return value
}
const sanitiseLocator = (locator = {}) => ({
  page: locator.page ?? null,
  printedPage: locator.printed_page ?? null,
  section: locator.section ?? null,
  start: locator.start ?? null,
  end: locator.end ?? null,
  coverageUnitId: locator.coverage_unit_id ?? null,
  supportSpan: locator.support_span ?? null,
})
const storageKeyFor = (resource) => {
  if (!resource.source_relative_path || /^https?:/i.test(resource.source_uri || '')) return undefined
  const institutionCodes = { 'Kasr Alainy': 'KAU', 'Ain Shams Books Drive': 'ASU', 'Alexandria Uni NewAug08': 'AU' }
  const institution = institutionCodes[resource.institution] || safeName(resource.institution || 'Miscellaneous')
  const parts = resource.source_relative_path.split('/').filter(Boolean)
  const fileName = safeName(parts.pop() || resource.title || resource.id)
  // The first source-relative folder names the university collection. The
  // remaining hierarchy (Anatomy, Physiology/Practical, etc.) is preserved so
  // the authenticated resource volume remains intelligible to administrators.
  if (parts.length && /books|drive|alexandria|kasr|ain shams/i.test(parts[0])) parts.shift()
  const folders = parts.map(tidyFolderName).filter(Boolean)
  return [institution, ...(folders.length ? folders : ['Miscellaneous']), fileName].join('/')
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

const canonicalNodeIds = new Set(MEDICAL_TAXONOMY_SEED.map((node) => node.id))
const canonicalPlacementFallbacks = {
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
const canonicalPlacementFor = (record) => {
  const fallbackArticleId = record.id.startsWith('ART-') ? record.id : record.related_article_ids?.[0]
  const fallback = canonicalPlacementFallbacks[fallbackArticleId]
  const primaryNodeId = canonicalNodeIds.has(record.primary_node_id) ? record.primary_node_id : fallback?.[0]
  const secondaryNodeIds = [...new Set([...(record.secondary_node_ids || []), ...(fallback?.[1] || [])])].filter((nodeId) => canonicalNodeIds.has(nodeId) && nodeId !== primaryNodeId)
  if (!primaryNodeId) throw new Error(`Missing canonical medical taxonomy placement for ${record.id}`)
  for (const nodeId of [primaryNodeId, ...secondaryNodeIds]) {
    if (!canonicalNodeIds.has(nodeId)) throw new Error(`Unknown canonical medical taxonomy ID ${nodeId} for ${record.id}`)
  }
  return { primaryNodeId, secondaryNodeIds }
}

const systemCodeFor = (recordId = '') => recordId.split('-')[1]?.toLowerCase() || 'medical'
const legacySubjectIds = {
  cvs: 'cvs', res: 'resp', ren: 'renal', git: 'gi', neu: 'neuro', end: 'endo', msk: 'msk',
  inf: 'pharm', fnd: 'pharm', dev: 'medical', imm: 'medical', hem: 'medical', der: 'medical',
  obs: 'medical', gyn: 'medical', and: 'medical',
}
const subjectIdFor = (record) => legacySubjectIds[systemCodeFor(record.id)] || 'medical'
const normal = (value = '') => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
const legacyPlacementFor = (article) => {
  const pilot = PILOT_ARTICLE_PLACEMENTS[article.id]
  const system = CURRICULUM_CATALOG.find((node) => node.id === subjectIdFor(article))
  if (!system) return { system: undefined, topic: undefined, subtopic: undefined }
  const topic = pilot
    ? system.topics.find((node) => node.title === pilot.topicTitle)
    : system.topics.find((node) => normal(node.title) === normal(article.topic))
      || system.topics.find((node) => normal(article.topic).includes(normal(node.title)) || normal(node.title).includes(normal(article.topic)))
  const subtopic = pilot
    ? topic?.subs.find((node) => node.title === pilot.subtopicTitle)
    : topic?.subs.find((node) => normal(node.title) === normal(article.subtopic || article.title))
  return { system, topic, subtopic }
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

const articleAliases = {
  'ART-CVS-CARDIAC-ELECTRICAL': ['ECG foundations', 'Electrocardiography foundations'],
  'ART-CVS-CARDIAC-OUTPUT': ['Cardiac output', 'Preload and afterload'],
  'ART-CVS-BLOOD-PRESSURE': ['Arterial blood pressure', 'Blood pressure regulation'],
  'ART-CVS-VASCULAR-FLOW': ['Vascular flow', 'Microcirculation'],
}

const relatedArticles = {
  'ART-CVS-HEART-ORIENTATION': ['ART-CVS-CHAMBERS-VALVES', 'ART-CVS-CORONARY-CIRCULATION'],
  'ART-CVS-CHAMBERS-VALVES': ['ART-CVS-HEART-ORIENTATION', 'ART-CVS-CONDUCTION', 'ART-CVS-CARDIAC-CYCLE'],
  'ART-CVS-CORONARY-CIRCULATION': ['ART-CVS-HEART-ORIENTATION', 'ART-CVS-CHAMBERS-VALVES'],
  'ART-CVS-CARDIAC-HISTOLOGY': ['ART-CVS-CONDUCTION', 'ART-CVS-CARDIAC-ELECTRICAL', 'ART-CVS-VASCULAR-FLOW'],
  'ART-CVS-CONDUCTION': ['ART-CVS-CARDIAC-HISTOLOGY', 'ART-CVS-CARDIAC-ELECTRICAL'],
  'ART-CVS-CARDIAC-ELECTRICAL': ['ART-CVS-CONDUCTION', 'ART-CVS-CARDIAC-CYCLE'],
  'ART-CVS-CARDIAC-CYCLE': ['ART-CVS-CHAMBERS-VALVES', 'ART-CVS-CARDIAC-ELECTRICAL', 'ART-CVS-CARDIAC-OUTPUT'],
  'ART-CVS-CARDIAC-OUTPUT': ['ART-CVS-CARDIAC-CYCLE', 'ART-CVS-BLOOD-PRESSURE', 'ART-CVS-VASCULAR-FLOW'],
  'ART-CVS-BLOOD-PRESSURE': ['ART-CVS-CARDIAC-OUTPUT', 'ART-CVS-VASCULAR-FLOW'],
  'ART-CVS-VASCULAR-FLOW': ['ART-CVS-CARDIAC-HISTOLOGY', 'ART-CVS-CARDIAC-OUTPUT', 'ART-CVS-BLOOD-PRESSURE'],
}

const articleSpansByArticle = new Map()
for (const span of bundle.article_spans) articleSpansByArticle.set(span.article_id, [...(articleSpansByArticle.get(span.article_id) || []), span])

const resourceById = new Map(bundle.resources.map((resource) => [resource.id, resource]))
const citationQualifies = (citationId) => {
  const citation = citationsById.get(citationId)
  const resource = citation ? resourceById.get(citation.resource_id) : undefined
  return Boolean(
    citation?.counts_as_claim_evidence
    && citation.locator
    && resource
    && resource.qualification?.eligible !== false
    && !/quarantin/i.test(resource.processing_status || ''),
  )
}
const claimQualifies = (claimId) => {
  const claim = claimsById.get(claimId)
  return Boolean(
    claim
    && claim.verification_status === 'verified'
    && claim.risk_class !== 'treatment_or_action'
    && claim.conflict_status !== 'conflicted'
    && (claim.citation_ids || []).some(citationQualifies),
  )
}
const spanQualifies = (span) => Boolean(span?.claim_ids?.length && span.claim_ids.every(claimQualifies))
const publishableSpanIds = new Set(bundle.article_spans.filter(spanQualifies).map((span) => span.id))
const readableSectionsFor = (article) => {
  const spans = articleSpansByArticle.get(article.id) || []
  const stripMarkers = (value = '') => value.replace(/<!--\s*\/?evidence:[\s\S]*?-->/g, '').replace(/\n{3,}/g, '\n\n').trim()
  // "Components and relations" is a machine listing of concepts and relations,
  // not reading material. It is no longer carried into the article.
  return (article.sections || [])
    .filter((section) => section.heading !== 'Components and relations')
    .map((section) => ({
      id: section.id,
      heading: section.heading,
      body: stripMarkers(section.body),
      kind: 'content',
      spanIds: spans.filter((span) => span.section_id === section.id).map((span) => span.id),
    }))
}

const publishedSectionsFor = (article, sections) => {
  const content = sections
    .map((section) => ({ ...section, body: '', spanIds: (section.spanIds || []).filter((id) => publishableSpanIds.has(id)) }))
    .filter((section) => section.spanIds.length)
  if (!content.length) return []
  return content
}

const publicationGateFor = (article) => {
  if (article.status === 'published') return 'publishable'
  if (/faculty/i.test(article.publication_gate || '')) return 'faculty_review'
  if ((article.conflicts || []).length) return 'conflicted'
  return 'needs_evidence'
}

const articleItems = bundle.articles.map((article) => {
  const place = legacyPlacementFor(article)
  const canonicalPlace = canonicalPlacementFor(article)
  const sortedSections = readableSectionsFor(article)
  const publishedSections = publishedSectionsFor(article, sortedSections)
  const publishable = publishedSections.length > 0
  const universityNotes = Object.entries(article.university_notes || {}).map(([name, text], index) => ({ id: `${article.id}-unote-${index + 1}`, universityId: name === 'Kasr Alainy' ? 'kau' : '', text }))
  const claimIds = (article.claim_annotations || []).flatMap((spanId) => spanById.get(spanId)?.claim_ids || [])
  const fieldNotes = {
    arabicTitle: 'No reviewed Arabic title was supplied; left empty rather than translated by the model.',
    ...((article.aliases || []).length || (articleAliases[article.id] || []).length ? {} : { aliases: 'No distinct evidence-supported search alias was needed for this title.' }),
    questionIds: 'No validated question records are linked to this pilot article yet.',
    moduleIds: 'No verified live module ID was supplied; curriculum mapping remains explicit and unguessed.',
    ...(place.subtopic ? {} : { subtopicId: 'No verified legacy curriculum subtopic matches this canonical medical-taxonomy placement.' }),
    microtopicId: 'The canonical medical taxonomy placement is more precise than this optional legacy curriculum overlay.',
    nanotopicId: 'No separate legacy nanotopic ID is needed; canonical placement remains the source of truth.',
    media: 'No rights-cleared, necessity-reviewed media item was supplied.',
    ...(article.last_reviewed ? {} : { lastReviewed: 'Not set until the evidence gate is passed by review.' }),
    ...(article.review_due ? {} : { reviewDue: 'Not scheduled until initial evidence review is complete.' }),
  }
  return {
    id: article.id,
    kind: 'article',
    title: article.title,
    subjectId: subjectIdFor(article),
    status: publishable ? 'Published' : 'In review',
    owner,
    updatedAt: generatedAt,
    fields: {
      Topic: article.topic || place.topic?.title || article.title,
      Summary: article.summary,
      'Reading time': String(article.reading_time || 8),
      'Content owner': owner,
      'Key point': article.hold_these?.[0] || '',
      'Template ID': article.template_id || '',
      Archetype: article.archetype || '',
      'Evidence state': article.status,
      'Publication gate': article.publication_gate || '',
      'Student release': publishable ? 'Verified spans only' : 'Not released',
      Reviewer: reviewer,
      Publisher: publisher,
    },
    articleData: {
      arabicTitle: article.arabic_title || '',
      aliases: [...new Set([...(article.aliases || []), ...(articleAliases[article.id] || [])])],
      templateId: article.template_id,
      archetype: archetypeMap[article.archetype] || 'concept',
      language: article.language || 'English',
      learnerStage: article.learner_stage || 'Years 1–3 foundation',
      summary: article.summary,
      body: sortedSections.map((section) => `${section.heading}\n${section.body}`).join('\n\n'),
      sections: sortedSections,
      publishedSections,
      publishedSummary: publishable
        ? `A verified, source-linked selection from ${article.title}. Select any factual statement to inspect every supporting resource and exact locator.`
        : '',
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
      subtopicId: place.subtopic?.subId || null,
      microtopicId: null,
      nanotopicId: null,
      relatedConceptIds: article.related_concept_ids || [],
      relatedArticleIds: [...new Set([...(article.related_article_ids || []), ...(relatedArticles[article.id] || [])])],
      universityNotes,
      fieldNotes,
      reviewer,
      finalPublisher: publisher,
      reviewDue: article.review_due || '',
      lastReviewed: article.last_reviewed || '',
      highYield: article.high_yield || 'Core',
      timeSensitive: article.time_sensitive === 'time_sensitive' ? 'time_sensitive' : 'stable',
      publicationGate: publicationGateFor(article),
      evidenceBasis: article.evidence_basis || [],
      articleLevelSourceIds: article.article_level_sources || [],
      claimIds,
      spanIds: article.claim_annotations || [],
      conflicts: article.conflicts || [],
      evidenceGaps: article.evidence_gaps || [],
      media: article.media || [],
      notes: article.notes || '',
    },
  }
})

const resourceItems = resources.map((resource) => {
  const includedArticles = bundle.articles.filter((article) => (article.resource_ids || []).includes(resource.id))
  const subjectId = includedArticles[0] ? subjectIdFor(includedArticles[0]) : 'medical'
  const chapters = [...new Set(includedArticles.map((article) => article.topic || article.system).filter(Boolean))]
  return {
    id: resource.id,
    kind: 'resource',
    title: resource.title,
    subjectId,
    status: resource.sourceUri ? 'Published' : 'In review',
    owner,
    updatedAt: generatedAt,
    fields: {
      Type: resource.sourceUri ? 'Article' : resource.mediaType === 'pdf' ? 'Book' : 'Article',
      Source: resource.institution || '',
      Location: resource.storageKey || resource.sourceUri || 'Pending secure upload',
      Year: resource.publicationDate ? String(resource.publicationDate).slice(0, 4) : '',
      Chapter: chapters.join(', ') || 'Miscellaneous',
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
      chapters,
      moduleIds: [],
      includedConceptIds: bundle.concepts.filter((concept) => (concept.atomic_claim_ids || []).some((claimId) => (claimsById.get(claimId)?.citation_ids || []).some((citationId) => citationsById.get(citationId)?.resource_id === resource.id))).map((concept) => concept.id),
      includedArticleIds: includedArticles.map((article) => article.id),
      conceptLocations: [],
    },
  }
})

const articleForConcept = new Map()
bundle.concepts.forEach((concept) => (concept.related_article_ids || []).forEach((articleId) => {
  if (!articleForConcept.has(concept.id)) articleForConcept.set(concept.id, articleId)
}))

const concepts = bundle.concepts.map((concept) => {
  const articleId = articleForConcept.get(concept.id)
  const article = bundle.articles.find((entry) => entry.id === articleId)
  if (!article) throw new Error(`Missing article for concept ${concept.id}`)
  const place = legacyPlacementFor(article)
  const canonicalPlace = canonicalPlacementFor(concept)
  const micro = place.subtopic?.micros.find((node) => node.title.toLowerCase() === String(concept.subtopic || '').toLowerCase())
  const conceptCitationIds = (concept.atomic_claim_ids || []).flatMap((claimId) => claimsById.get(claimId)?.citation_ids || [])
  const conceptResourceIds = [...new Set([...(concept.resource_ids || []), ...conceptCitationIds.map((citationId) => citationsById.get(citationId)?.resource_id).filter(Boolean)])]
  const approvedFileResourceIds = conceptResourceIds.filter((resourceId) => resources.find((resource) => resource.id === resourceId)?.sourceUri)
  const fieldNotes = {
    ...(concept.arabic_label ? {} : { arabicLabel: 'No reviewed Arabic terminology was supplied; left empty rather than model-translated.' }),
    ...((concept.aliases || []).length ? {} : { aliases: 'No distinct source-supported synonym or abbreviation was supplied.' }),
    ...((concept.pitfalls || []).length ? {} : { pitfalls: 'No concept-specific misconception was explicitly supported by the qualified source.' }),
    moduleIds: 'No verified live module ID was supplied; curriculum mapping remains explicit and unguessed.',
    ...(place.system ? {} : { systemId: 'No truthful system exists in the optional eight-system curriculum overlay; canonical placement is complete.' }),
    ...(place.topic ? {} : { topicTagId: 'No truthful topic exists in the optional eight-system curriculum overlay; canonical placement is complete.' }),
    ...(place.subtopic ? {} : { subtopicId: 'No truthful subtopic exists in the optional eight-system curriculum overlay; canonical placement is complete.' }),
    microtopicId: 'Optional legacy overlay; the canonical medical taxonomy placement remains the source of truth.',
    nanotopicId: 'Optional legacy overlay; no verified nanotopic ID was supplied.',
    ...(approvedFileResourceIds.length ? {} : { approvedFileResourceIds: 'Qualified local files retain exact occurrences but remain pending secure upload.' }),
    approvedVideoResourceIds: 'No qualified video source was supplied for this concept.',
    ...(concept.last_reviewed ? {} : { lastReviewed: 'Not set until the claim passes its evidence gate.' }),
    ...(concept.review_due ? {} : { reviewDue: 'Not scheduled until initial evidence review is complete.' }),
  }
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
    subjectId: subjectIdFor(article),
    topicId: place.topic?.id || null,
    systemId: place.system?.sysId || null,
    topicTagId: place.topic?.tpcId || null,
    subtopicId: place.subtopic?.subId || null,
    microtopicId: micro?.micId || null,
    nanotopicId: null,
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
    resourceIds: conceptResourceIds,
    approvedFileResourceIds,
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
    finalPublisher: publisher,
    lastReviewed: concept.last_reviewed || '',
    reviewDue: concept.review_due || '',
    publicationStatus: concept.publication_status,
    editorialReviewStatus: concept.editorial_review_status,
    exclusionReason: concept.exclusion_reason,
    weightConfidence: concept.weight_confidence,
    fieldNotes,
  }
})

const conceptById = new Map(concepts.map((concept) => [concept.id, concept]))
const relations = (bundle.concept_relations || []).map((relation) => {
  const source = conceptById.get(relation.source_concept_id)
  const target = conceptById.get(relation.target_concept_id)
  if (!source || !target) throw new Error(`Reviewed relationship references a missing concept: ${relation.source_concept_id} -> ${relation.target_concept_id}`)
  return {
    id: relation.id,
    sourceId: source.id,
    type: relation.type,
    targetId: target.id,
    evidenceClaimIds: relation.claim_ids || [],
    citationIds: relation.citation_ids || [],
    confidence: relation.confidence,
    verificationStatus: relation.status,
    qualifiers: { derivation: relation.origin, reviewMode: 'relationship_requires_separate_edge_review' },
    reviewer,
  }
})
for (const concept of concepts) {
  concept.relatedConceptIds = [...new Set(relations.filter((relation) => relation.sourceId === concept.id || relation.targetId === concept.id).map((relation) => relation.sourceId === concept.id ? relation.targetId : relation.sourceId))]
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
  text: (() => {
    const conceptIds = [...new Set((span.claim_ids || []).map((id) => claimsById.get(id)?.concept_id).filter(Boolean))]
    if (conceptIds.length === 1) {
      const concept = bundle.concepts.find((entry) => entry.id === conceptIds[0])
      if (concept) {
        const label = String(concept.label || '').trim()
        const definition = String(concept.definition || '').trim()
        if (normal(label) === normal(definition)) return definition || label
        if (normal(definition).startsWith(normal(label))) return definition
        return [label.replace(/[.!?]$/, ''), definition].filter(Boolean).join('. ')
      }
    }
    return (span.claim_ids || []).map((id) => claimsById.get(id)?.display_text).filter(Boolean).join(' ')
  })(),
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
const publishedArticleSpans = articleSpans.filter((span) => publishedArticleIds.has(span.articleId) && publishableSpanIds.has(span.id))
const publishedClaimIds = new Set(publishedArticleSpans.flatMap((span) => span.claimIds))
const publishedClaims = claims.filter((claim) => publishedClaimIds.has(claim.id) && claimQualifies(claim.id))
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
  migrationId: '2026-08-11-medical-library-reader-quality-v7',
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
    systems: MEDICAL_TAXONOMY_SEED.filter((node) => node.division === 'system' && node.parentId === null).length,
    topics: MEDICAL_TAXONOMY_SEED.filter((node) => node.division === 'system' && node.level === 'Topic').length,
    curriculumOverlaySystems: CURRICULUM_CATALOG.length,
    curriculumOverlayTopics: CURRICULUM_CATALOG.reduce((sum, system) => sum + system.topics.length, 0),
    medicalTaxonomyNodes: MEDICAL_TAXONOMY_SEED.length,
    medicalSystemRoots: MEDICAL_TAXONOMY_SEED.filter((node) => node.division === 'system' && node.parentId === null).length,
    medicalDisciplineRoots: MEDICAL_TAXONOMY_SEED.filter((node) => node.division === 'discipline' && node.parentId === null).length,
    medicalSkillRoots: MEDICAL_TAXONOMY_SEED.filter((node) => node.division === 'skills' && node.parentId === null).length,
    medicalKnowledgeRoots: MEDICAL_TAXONOMY_SEED.filter((node) => node.division === 'knowledge' && node.parentId === null).length,
    articles: articleItems.length,
    articleSections: articleItems.reduce((sum, article) => sum + (article.articleData?.sections?.length || 0), 0),
    articleSectionsWithEvidence: articleItems.reduce((sum, article) => sum + (article.articleData?.sections || []).filter((section) => section.spanIds?.length).length, 0),
    articlesWithRelatedReading: articleItems.filter((article) => article.articleData?.relatedArticleIds?.length).length,
    publishedArticles: articleItems.filter((item) => item.status === 'Published').length,
    publishedSpans: publishedArticleSpans.length,
    concepts: concepts.length,
    activeConcepts: concepts.filter((concept) => concept.status === 'active').length,
    relations: relations.length,
    verifiedRelations: relations.filter((relation) => relation.verificationStatus === 'verified').length,
    conceptsWithRelations: concepts.filter((concept) => concept.relatedConceptIds?.length).length,
    claims: claims.length,
    verifiedClaims: claims.filter((claim) => claim.verificationStatus === 'verified').length,
    citations: citations.length,
    claimEvidenceCitations: citations.filter((citation) => citation.countsAsClaimEvidence).length,
    resources: resources.length,
    resourcesPendingUpload: resources.filter((resource) => resource.storageKey).length,
    reviewCandidates: kasrCoverageAudit.records.length,
    sourceAvailabilityRecords: sourceAvailabilityAudit.records.length,
    sourceFilesAvailable: sourceAvailabilityAudit.records.filter((record) => record.status === 'available_file').length,
    absolutePathsExposed: JSON.stringify({ articleItems, concepts, relations, evidence }).includes('/Users/'),
  },
}

const coverageData = {
  migrationId: '2026-08-11-medical-library-coverage-v6',
  generatedAt,
  policy: kasrCoverageAudit.policy,
  counts: kasrCoverageAudit.counts,
  candidateCoverage: kasrCoverageAudit.records.map((record) => ({
    candidateId: record.candidate_id,
    sourceId: record.source_id,
    systemId: record.system_id,
    subject: record.subject,
    topic: record.topic,
    subtopic: record.subtopic,
    microtopic: record.microtopic,
    label: record.label,
    statement: record.statement,
    conceptType: record.concept_type,
    riskClass: record.risk_class,
    confidence: record.confidence,
    destination: record.destination,
    reasonCode: record.reason_code,
    reason: record.reason,
    targetConceptId: record.target_concept_id,
    resourceRelativePath: record.resource_relative_path,
    locator: sanitiseLocator(record.locator),
  })),
  sourceAvailability: sourceAvailabilityAudit.records.map((record) => ({
    sourceId: record.source_id,
    collectionId: record.collection_id,
    relativePath: record.relative_path,
    status: record.status,
  })),
}

if (data.report.absolutePathsExposed) throw new Error('Sanitisation failed: an absolute authoring path remains in the launch package')
if (data.report.universities !== 12 || data.report.years !== 84) throw new Error('University/year catalogue failed deterministic-count validation')
if (data.report.articles !== bundle.articles.length || data.report.concepts !== bundle.concepts.length || data.report.claims !== bundle.claims.length) throw new Error('Reviewed full-catalog coverage count mismatch')
if (articleItems.some((article) => [...article.articleData.sections, ...(article.articleData.publishedSections || [])].some((section) => section.kind === 'components'))) throw new Error('A Components and relations section survived: articles must carry reading material only')
if (articleItems.some((article) => article.status === 'Published' && !article.articleData.publishedSections?.length)) throw new Error('Every student-visible article must have a verified section projection')
if (articleItems.some((article) => !article.owner || !article.articleData.reviewer || !article.articleData.finalPublisher)) throw new Error('Article governance fields are incomplete')
if (concepts.some((concept) => !concept.owner || !concept.reviewer || !concept.finalPublisher || !concept.primaryNodeId || !concept.atomicClaimIds.length || !concept.resourceIds.length)) throw new Error('Concept identity, placement, evidence, resources, or governance fields are incomplete')
if (concepts.some((concept) => concept.publicationStatus === 'published' && concept.atomicClaimIds.some((claimId) => claims.find((claim) => claim.id === claimId)?.verificationStatus !== 'verified'))) throw new Error('A published concept contains an unverified claim')
if (concepts.some((concept) => concept.atomicClaimIds.some((claimId) => claims.find((claim) => claim.id === claimId)?.riskClass === 'treatment_or_action') && concept.publicationStatus !== 'faculty_review')) throw new Error('Treatment or action content bypassed faculty review')
if (new Set(articleItems.flatMap((article) => article.articleData.sections.flatMap((section) => section.spanIds || []))).size !== bundle.article_spans.length) throw new Error('Readable article sections do not cover every evidence span exactly once')
if (publishedArticleSpans.some((span) => !span.claimIds.length || span.claimIds.some((claimId) => !claimQualifies(claimId)))) throw new Error('A student-visible article span bypassed the claim publication gate')
if (publishedEvidence.resources.some((resource) => /quarantin/i.test(resource.processingStatus || ''))) throw new Error('A quarantined resource entered student-visible evidence')
if (coverageData.candidateCoverage.some((record) => /^queued/.test(record.destination))) throw new Error('A candidate still has an unresolved queue destination')
if (new Set(coverageData.candidateCoverage.map((record) => record.candidateId)).size !== coverageData.candidateCoverage.length) throw new Error('Coverage candidate IDs are not unique')
if (JSON.stringify(coverageData).includes('/Users/')) throw new Error('Coverage sanitisation failed: an absolute authoring path remains')

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`)
await writeFile(coverageOutputPath, gzipSync(JSON.stringify(coverageData), { level: 9 }))
console.log(JSON.stringify(data.report, null, 2))
