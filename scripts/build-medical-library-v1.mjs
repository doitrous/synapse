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

const slug = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'section'
const articleSpansByArticle = new Map()
for (const span of bundle.article_spans) articleSpansByArticle.set(span.article_id, [...(articleSpansByArticle.get(span.article_id) || []), span])

const readableSectionsFor = (article) => {
  const articleConcepts = bundle.concepts.filter((concept) => (concept.related_article_ids || []).includes(article.id))
  const groups = new Map()
  for (const concept of articleConcepts) {
    const heading = concept.subtopic || concept.topic || 'Core concepts'
    const claimIds = new Set(concept.atomic_claim_ids || [])
    const spans = (articleSpansByArticle.get(article.id) || []).filter((span) => (span.claim_ids || []).some((claimId) => claimIds.has(claimId)))
    groups.set(heading, [...(groups.get(heading) || []), ...spans])
  }
  const sections = [...groups.entries()].map(([heading, spans]) => {
    const uniqueSpans = [...new Map(spans.map((span) => [span.id, span])).values()]
    return {
      id: `${article.id}-section-${slug(heading)}`,
      heading,
      body: uniqueSpans.map((span) => (span.claim_ids || []).map((claimId) => claimsById.get(claimId)?.display_text).filter(Boolean).join(' ')).filter(Boolean).join('\n\n'),
      kind: 'content',
      spanIds: uniqueSpans.map((span) => span.id),
    }
  })
  const conceptLines = articleConcepts.map((concept) => `${concept.label} · ${concept.id}`)
  const articleLines = (relatedArticles[article.id] || []).map((articleId) => `${bundle.articles.find((item) => item.id === articleId)?.title || articleId} · ${articleId}`)
  sections.push({ id: `${article.id}-components-and-relations`, heading: 'Components and relations', body: [`Concepts in this article:\n${conceptLines.join('\n')}`, `Continue with:\n${articleLines.join('\n')}`].join('\n\n'), kind: 'components', spanIds: [] })
  return sections
}

const publicationGateFor = (article) => {
  if (article.status === 'published') return 'publishable'
  if (/faculty/i.test(article.publication_gate || '')) return 'faculty_review'
  if ((article.conflicts || []).length) return 'conflicted'
  return 'needs_evidence'
}

const articleItems = bundle.articles.map((article) => {
  const place = placementFor(article.id)
  const canonicalPlace = canonicalPlacementFor(article.id)
  const sortedSections = readableSectionsFor(article)
  const publishable = article.status === 'published'
  const universityNotes = Object.entries(article.university_notes || {}).map(([name, text], index) => ({ id: `${article.id}-unote-${index + 1}`, universityId: name === 'Kasr Alainy' ? 'kau' : '', text }))
  const claimIds = (article.claim_annotations || []).flatMap((spanId) => spanById.get(spanId)?.claim_ids || [])
  const fieldNotes = {
    arabicTitle: 'No reviewed Arabic title was supplied; left empty rather than translated by the model.',
    ...((article.aliases || []).length || (articleAliases[article.id] || []).length ? {} : { aliases: 'No distinct evidence-supported search alias was needed for this title.' }),
    questionIds: 'No validated question records are linked to this pilot article yet.',
    moduleIds: 'The source names the Cardiovascular module but does not supply a verified live module ID.',
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
    subjectId: 'cvs',
    status: publishable ? 'Published' : 'In review',
    owner,
    updatedAt: generatedAt,
    fields: {
      Topic: place.topic.title,
      Summary: `${article.title} is organised here as ${claimIds.length} evidence-linked facts for years 1–3. Select any fact to inspect every exact source and locator. Items that still need independent verification remain under review.`,
      'Reading time': String(article.reading_time || 8),
      'Content owner': owner,
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
      aliases: [...new Set([...(article.aliases || []), ...(articleAliases[article.id] || [])])],
      templateId: article.template_id,
      archetype: archetypeMap[article.archetype] || 'concept',
      language: article.language || 'English',
      learnerStage: article.learner_stage || 'Years 1–3 foundation',
      summary: `${article.title} is organised here as ${claimIds.length} evidence-linked facts for years 1–3. Select any fact to inspect every exact source and locator. Items that still need independent verification remain under review.`,
      body: sortedSections.map((section) => `${section.heading}\n${section.body}`).join('\n\n'),
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
  const conceptCitationIds = (concept.atomic_claim_ids || []).flatMap((claimId) => claimsById.get(claimId)?.citation_ids || [])
  const conceptResourceIds = [...new Set(conceptCitationIds.map((citationId) => citationsById.get(citationId)?.resource_id).filter(Boolean))]
  const approvedFileResourceIds = conceptResourceIds.filter((resourceId) => resources.find((resource) => resource.id === resourceId)?.sourceUri)
  const fieldNotes = {
    ...(concept.arabic_label ? {} : { arabicLabel: 'No reviewed Arabic terminology was supplied; left empty rather than model-translated.' }),
    ...((concept.aliases || []).length ? {} : { aliases: 'No distinct source-supported synonym or abbreviation was supplied.' }),
    ...((concept.pitfalls || []).length ? {} : { pitfalls: 'No concept-specific misconception was explicitly supported by the qualified source.' }),
    moduleIds: 'The source names the Cardiovascular module but does not supply a verified live module ID.',
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
    exclusionReason: concept.exclusion_reason,
    weightConfidence: concept.weight_confidence,
    fieldNotes,
  }
})

const relationSeeds = [
  ['Fibrous and serous pericardial coverings', 'related_concepts', 'Heart within the pericardium and middle mediastinum'],
  ['Heart within the pericardium and middle mediastinum', 'related_concepts', 'Retrosternal position of the heart'],
  ['Aortic sinuses', 'related_concepts', 'Aortic sinuses of the ascending aorta'],
  ['Circumflex relation to coronary sinus', 'related_concepts', 'Course of coronary sinus with circumflex artery'],
  ['Coronary sinus opening in the right atrium', 'related_concepts', 'Course of coronary sinus with circumflex artery'],
  ['AV block is disturbed conduction between atria and ventricles at the atrioventricular node', 'presents_as', 'Atrioventricular block may prolong PR or produce P waves not followed by QRS'],
  ['AV block is disturbed conduction between atria and ventricles at the atrioventricular node', 'presents_as', 'AV block can increase PR interval or produce P waves without following QRS complexes'],
  ['Atrioventricular block disturbs conduction between atria and ventricles', 'related_concepts', 'AV block is disturbed conduction between atria and ventricles at the atrioventricular node'],
  ['Pericyte contraction regulates capillary blood flow', 'related_concepts', 'Pericyte processes usually surround capillary endothelium'],
  ['Continuous capillaries occur in connective tissue, bone, skin, and exocrine glands', 'contrasts_with', 'Fenestrated capillaries occur in intestine, endocrine glands, and renal glomeruli'],
  ['Afterload is the load against which cardiac muscle contracts', 'related_concepts', 'Afterload mainly affects end-systolic volume'],
  ['Arterial baroreceptors are mechanical stretch receptors that sense arterial pressure', 'related_concepts', 'Arterial baroreceptors are located mainly in the carotid sinus and aortic arch'],
  ['Arterial baroreceptors are mechanical stretch receptors that sense arterial pressure', 'related_concepts', 'Arterial baroreceptors begin responding near an arterial pressure of 50 mmHg'],
  ['Coronary blockage causes myocardial infarction', 'related_concepts', 'Coronary narrowing causes myocardial ischemia'],
  ['Arterial pressure equals cardiac output multiplied by total peripheral resistance', 'related_concepts', 'Arterial pressure equals heart rate multiplied by stroke volume and total peripheral resistance'],
  ['A cardiac murmur is an abnormal heart sound heard over chest-wall auscultatory areas', 'related_concepts', 'Abnormal heart sounds may have altered intensity'],
]
const conceptByLabel = new Map(concepts.map((concept) => [concept.label, concept]))
const relations = relationSeeds.map(([sourceLabel, type, targetLabel], index) => {
  const source = conceptByLabel.get(sourceLabel)
  const target = conceptByLabel.get(targetLabel)
  if (!source || !target) throw new Error(`Curated relationship references a missing concept: ${sourceLabel} -> ${targetLabel}`)
  const evidenceClaimIds = [...new Set([...(source.atomicClaimIds || []), ...(target.atomicClaimIds || [])])]
  const citationIds = [...new Set(evidenceClaimIds.flatMap((claimId) => claimsById.get(claimId)?.citation_ids || []))]
  const verified = evidenceClaimIds.length > 0 && evidenceClaimIds.every((claimId) => claimsById.get(claimId)?.verification_status === 'verified')
  return {
    id: `REL-CVS-${String(index + 1).padStart(3, '0')}`,
    sourceId: source.id,
    type,
    targetId: target.id,
    evidenceClaimIds,
    citationIds,
    confidence: Math.min(source.confidence || 0, target.confidence || 0),
    verificationStatus: verified ? 'verified' : 'needs_evidence',
    qualifiers: { derivation: 'curated_shared_entity_or_explicit_relation_from_supplied_claims', reviewMode: 'evidence_gate_not_faculty_signoff' },
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
    articleSections: articleItems.reduce((sum, article) => sum + (article.articleData?.sections?.length || 0), 0),
    articleSectionsWithEvidence: articleItems.reduce((sum, article) => sum + (article.articleData?.sections || []).filter((section) => section.spanIds?.length).length, 0),
    articlesWithRelatedReading: articleItems.filter((article) => article.articleData?.relatedArticleIds?.length).length,
    publishedArticles: articleItems.filter((item) => item.status === 'Published').length,
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
    absolutePathsExposed: JSON.stringify({ articleItems, concepts, relations, evidence }).includes('/Users/'),
  },
}

if (data.report.absolutePathsExposed) throw new Error('Sanitisation failed: an absolute authoring path remains in the launch package')
if (data.report.universities !== 12 || data.report.years !== 84) throw new Error('University/year catalogue failed deterministic-count validation')
if (data.report.articles !== 10 || data.report.concepts !== 140 || data.report.claims !== 140) throw new Error('Pilot coverage count mismatch')
if (articleItems.some((article) => article.articleData.sections.at(-1)?.kind !== 'components')) throw new Error('Every article must end with Components and relations')
if (articleItems.some((article) => !article.owner || !article.articleData.reviewer || !article.articleData.finalPublisher)) throw new Error('Article governance fields are incomplete')
if (concepts.some((concept) => !concept.owner || !concept.reviewer || !concept.finalPublisher || !concept.primaryNodeId || !concept.atomicClaimIds.length)) throw new Error('Concept identity, placement, evidence, or governance fields are incomplete')
if (new Set(articleItems.flatMap((article) => article.articleData.sections.flatMap((section) => section.spanIds || []))).size !== bundle.article_spans.length) throw new Error('Readable article sections do not cover every evidence span exactly once')

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`)
console.log(JSON.stringify(data.report, null, 2))
