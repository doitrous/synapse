/**
 * The admin Content dashboard, filtered/searched/paged server-side.
 *
 * `ControlDashboard.tsx` used to hold the whole ~77–251 MB list-projected ledger
 * in the browser and filter/search/facet/count it client-side. This is that same
 * pipeline (ControlDashboard lines ~340–446), run on the server over the memoised
 * `loadAdminContent()` snapshot, so the browser fetches one 50-item page at a time
 * instead of the entire catalogue.
 *
 * The filter/search/facet/count pass runs over the LIST-INDEX items
 * (`snapshot.indexItems`, heavy bodies dropped by `toIndexItem`) — exactly what the
 * client held — so search matches the same fields the client did (title/topic/tags,
 * never a question's Vignette/Explanation). The returned `page`/`reviewQueue` are
 * the FULL items looked up by id, because the editor opens them and a save needs the
 * exact stored item as its delta `before`; those are few, so the weight is fine.
 *
 * Every pure function below is a transliteration of a client `src/data/*.ts`
 * function, and `src/data/adminContentList.test.ts` imports both and proves them
 * equal — the same "mirror + parity test" contract as `mediaLibrary.js`. Anything
 * the client pipeline does NOT read on the list path (e.g. `publishReadiness`,
 * used only by bulk-publish actions and row rendering) is intentionally absent.
 */
import { pool } from './db.js'
import { loadAdminContent } from './adminContent.js'
import { itemWritableBy } from './contentScope.js'

/* ---- Curriculum subjects (mirror of client CURRICULUM_SUBJECTS) ---------- *
 * `getSubject` reads this static table, not the university catalogue, so the
 * subject facet labels/colours are catalogue-independent. Kept byte-identical to
 * `src/data/curriculumCatalog.ts` CURRICULUM_SUBJECTS; the parity test deep-equals
 * the two so drift fails CI. */
export const CURRICULUM_SUBJECTS = [
  { id: 'cvs', name: 'Cardiovascular', ar: 'القلب والأوعية الدموية', short: 'CVS', color: '#b52230' },
  { id: 'resp', name: 'Respiratory', ar: 'الجهاز التنفسي', short: 'RESP', color: '#1f6f8b' },
  { id: 'renal', name: 'Renal & Urinary', ar: 'الكلى والمسالك البولية', short: 'RENAL', color: '#5a5b9a' },
  { id: 'gi', name: 'Gastrointestinal', ar: 'الجهاز الهضمي', short: 'GI', color: '#9a6a1f' },
  { id: 'neuro', name: 'Neurology', ar: 'الجهاز العصبي', short: 'NEURO', color: '#2f6bc7' },
  { id: 'endo', name: 'Endocrine', ar: 'الغدد الصماء', short: 'ENDO', color: '#8d4a72' },
  { id: 'msk', name: 'Musculoskeletal', ar: 'الجهاز العضلي الهيكلي', short: 'MSK', color: '#6d7688' },
  { id: 'pharm', name: 'Pharmacology', ar: 'علم الأدوية', short: 'PHARM', color: '#c14a2e' },
  { id: 'fnd', name: 'Foundations', ar: 'الأساسيات', short: 'FND', color: '#5145a8' },
  { id: 'dev', name: 'Human development', ar: 'النمو البشري', short: 'DEV', color: '#7f6a33' },
  { id: 'haem', name: 'Blood and lymphoreticular', ar: 'الدم والجهاز اللمفاوي', short: 'HAEM', color: '#9c2848' },
  { id: 'imm', name: 'Immune system', ar: 'الجهاز المناعي', short: 'IMM', color: '#1f8a5a' },
  { id: 'inf', name: 'Infection and tropical medicine', ar: 'العدوى وطب المناطق الحارة', short: 'INF', color: '#6b8c1f' },
  { id: 'obs', name: 'Pregnancy and childbirth', ar: 'الحمل والولادة', short: 'OBS', color: '#b0417e' },
  { id: 'gyn', name: 'Female reproductive', ar: 'الجهاز التناسلي الأنثوي', short: 'GYN', color: '#7b3f9e' },
  { id: 'androl', name: 'Male reproductive', ar: 'الجهاز التناسلي الذكري', short: 'AND', color: '#3a6d9e' },
  { id: 'psy', name: 'Behavioural health', ar: 'الصحة السلوكية', short: 'PSY', color: '#6a6a4a' },
  { id: 'derm', name: 'Skin', ar: 'الجلد', short: 'DERM', color: '#a85f3a' },
  { id: 'mul', name: 'Multisystem and emergencies', ar: 'الأجهزة المتعددة والطوارئ', short: 'MUL', color: '#8a2f22' },
  { id: 'pop', name: 'Population health', ar: 'صحة السكان', short: 'POP', color: '#14707d' },
]
const SUBJECTS_BY_ID = Object.fromEntries(CURRICULUM_SUBJECTS.map((s) => [s.id, s]))
/** `subjects.ts` getSubject — a subject by id, falling back to a neutral placeholder. */
function getSubject(id) {
  return SUBJECTS_BY_ID[id] ?? { id, name: id, short: String(id).toUpperCase(), color: '#6d7688' }
}

/* ---- universities.ts: year scope matching -------------------------------- */
function defaultModuleId(systemShort, index) {
  const code = systemShort.replace(/[^A-Za-z]/g, '').slice(0, 4).toUpperCase() || 'MOD'
  return `${code} ${String(index).padStart(2, '0')}`
}
function yearOrdinal(token) {
  const t = token.trim()
  const label = t.match(/^year\s*(\d+)$/i)?.[1]
  if (label) return `Y${label}`
  const intern = t.match(/^internship(?:\s+year)?\s*(\d+)$/i)?.[1]
  if (intern) return `INT${intern}`
  const compY = t.match(/_Y(\d+)$/i)?.[1]
  if (compY) return `Y${compY}`
  const compInt = t.match(/_INT(\d+)$/i)?.[1]
  if (compInt) return `INT${compInt}`
  return null
}
function isCompositeYear(token) {
  return /_(?:Y|INT)\d+$/i.test(token.trim())
}
function yearTokensMatch(itemYear, scopeYearId) {
  if (itemYear === scopeYearId) return true
  if (isCompositeYear(itemYear) && isCompositeYear(scopeYearId)) return false
  const a = yearOrdinal(itemYear)
  return a !== null && a === yearOrdinal(scopeYearId)
}
function yearScopeMatches(itemYears, scopeYearId) {
  if (!scopeYearId || !itemYears || itemYears.length === 0) return true
  return itemYears.some((token) => yearTokensMatch(token, scopeYearId))
}

/* ---- contentControl.ts: scope, media requests, source -------------------- */
function itemScope(item) {
  const questionTags = item.questionData?.tags
  const scope = item.articleData ?? item.practicalData ?? item.resourceData
  return {
    universityIds: questionTags?.universityIds ?? scope?.universityIds ?? [],
    yearIds: questionTags?.years ?? scope?.yearIds ?? [],
  }
}
function itemInScope(item, universityId, yearId) {
  const scope = itemScope(item)
  if (universityId && scope.universityIds.length > 0 && !scope.universityIds.includes(universityId)) return false
  if (!yearScopeMatches(scope.yearIds, yearId)) return false
  return true
}
/** Required media still outstanding anywhere inside an authored item. */
function mediaRequestsOf(item) {
  const found = []
  const seen = new Set()
  const requestIds = new Set()
  const requestObjects = new Set()
  const visit = (value) => {
    if (!value || typeof value !== 'object' || seen.has(value)) return
    seen.add(value)
    if (Array.isArray(value)) { value.forEach(visit); return }
    for (const [key, inner] of Object.entries(value)) {
      if (key === 'mediaRequests' && Array.isArray(inner)) {
        for (const request of inner) {
          if (!request || typeof request !== 'object' || requestObjects.has(request)) continue
          requestObjects.add(request)
          const id = typeof request.id === 'string' ? request.id.trim() : ''
          if (id && requestIds.has(id)) continue
          if (id) requestIds.add(id)
          found.push(request)
        }
      } else visit(inner)
    }
  }
  visit(item)
  return found
}
function blockingMediaRequests(item) {
  return mediaRequestsOf(item).filter((request) => (
    request.priority === 'required'
    && (request.status !== 'supplied' || !request.mediaId?.trim())
  ))
}
function matchesMediaRequestFilter(item, filter) {
  if (filter === 'all') return true
  const requests = mediaRequestsOf(item)
  if (filter === 'none') return requests.length === 0
  if (filter === 'any') return requests.length > 0
  if (filter === 'blocking') return blockingMediaRequests(item).length > 0
  return requests.some((request) => request.status === 'needed' || request.status === 'planned')
    || blockingMediaRequests(item).length > 0
}
function isUniversitySourced(item) {
  return item.source?.origin === 'university'
}

/* ---- publishReadiness.ts -------------------------------------------------- *
 * Only used for the cross-page bulk-selection summary (`matching[].ready/
 * hardBlocked` when includeMatchingIds is set). Works on a list-index row, which
 * carries `hasBody`/`publishedSectionKinds` in place of the article bodies. */
const GATE_REASON = {
  needs_evidence: 'Needs evidence',
  faculty_review: 'Faculty review',
  conflicted: 'Conflicting sources',
  excluded: 'Excluded',
}
function reassignedAfterArchive(item) {
  if (!item.archive?.detached) return true
  if (item.kind === 'question') {
    const tags = item.questionData?.tags
    const hasModule = Boolean(tags?.moduleIds?.length || tags?.moduleSubjectPaths?.length)
    const hasAudience = Boolean(tags?.universityIds?.length || tags?.years?.length || tags?.questionOnlyFor?.length)
    return hasModule && hasAudience
  }
  if (item.kind === 'article') {
    const data = item.articleData
    const hasModule = Boolean(data?.moduleIds?.length || data?.moduleSubjectPaths?.length)
    const hasAudience = Boolean(data?.universityIds?.length || data?.yearIds?.length)
    return hasModule && hasAudience
  }
  return true
}
function publishReadiness(item) {
  const missingMedia = blockingMediaRequests(item)
  if (missingMedia.length) {
    return {
      ready: false,
      reason: `${missingMedia.length} required media ${missingMedia.length === 1 ? 'request' : 'requests'} unresolved`,
      hardBlocked: true,
    }
  }
  if (item.status === 'Published') return { ready: false, reason: 'Already published', alreadyPublished: true }
  if (!reassignedAfterArchive(item)) {
    return { ready: false, reason: 'Assign a verified module and audience', hardBlocked: true }
  }
  if (item.kind !== 'article') return { ready: true, reason: '' }

  const data = item.articleData
  const publishedKinds = data?.publishedSectionKinds ?? data?.publishedSections?.map((section) => section.kind)
  if (!publishedKinds) {
    const hasBody = data?.hasBody ?? (data?.sections ?? []).some((section) => section.body?.trim() || section.narrative?.trim())
    return hasBody ? { ready: true, reason: '' } : { ready: false, reason: 'No content yet' }
  }
  const visible = publishedKinds.filter((kind) => kind !== 'components')
  if (visible.length > 0) return { ready: true, reason: '' }
  return { ready: false, reason: GATE_REASON[data?.publicationGate ?? ''] ?? 'Not ready' }
}

/* ---- contentTags.ts ------------------------------------------------------ */
function normalizeContentTag(value) {
  return value.trim().replace(/\s+/g, ' ')
}
function uniqueContentTags(values) {
  const seen = new Set()
  const result = []
  for (const value of values) {
    const display = normalizeContentTag(value)
    const key = display.toLocaleLowerCase()
    if (!display || seen.has(key)) continue
    seen.add(key)
    result.push(display)
  }
  return result
}
function contentTagsOf(item) {
  return uniqueContentTags(item.editorialTags ?? [])
}
function availableContentTags(items) {
  return uniqueContentTags(items.flatMap((item) => item.editorialTags ?? []))
    .sort((left, right) => left.localeCompare(right, undefined, { sensitivity: 'base' }))
}

/* ---- contentScope.ts: itemModules ---------------------------------------- *
 * Only the branches a ManagedContentItem can take (question + the article/
 * practical/resource default; deck/essay/histology fall through to nothing).
 * The concept/libraryTree branches never apply to a content item's kind. */
function scopeList(value) {
  return Array.isArray(value) ? value.filter((entry) => entry !== null && entry !== undefined && entry !== '') : []
}
function moduleOfPath(path) {
  const first = String(path ?? '').split('>')[0]?.trim()
  return first || null
}
function itemModules(kind, item) {
  const record = item ?? {}
  if (kind === 'question') {
    const tags = record.questionData?.tags ?? {}
    return [...scopeList(tags.moduleIds), ...scopeList(tags.moduleSubjectPaths).map(moduleOfPath).filter(Boolean)].map(String)
  }
  const data = (kind === 'article' ? record.articleData
    : kind === 'practical' ? record.practicalData
    : kind === 'resource' ? record.resourceData
    : null) ?? {}
  return [...scopeList(data.moduleIds), ...scopeList(data.moduleSubjectPaths).map(moduleOfPath).filter(Boolean)].map(String)
}

/* ---- contentModules.ts: contentModuleLabels ------------------------------ */
function mvalues(value) {
  return Array.isArray(value) ? value.map((entry) => String(entry).trim()).filter(Boolean) : []
}
function normalized(value) {
  return value.trim().toLowerCase()
}
function numericYear(value) {
  if (/int/i.test(value)) return null
  const match = value.trim().match(/(?:^|[_\s])(?:y(?:ear)?\s*)?(\d{1,2})$/i)
  return match ? Number(match[1]) : null
}
function authoredScope(item, options) {
  const data = item.kind === 'question' ? item.questionData?.tags
    : item.kind === 'article' ? item.articleData
      : item.kind === 'practical' ? item.practicalData
        : item.kind === 'resource' ? item.resourceData
          : undefined
  const record = data ?? {}
  const rawUniversities = mvalues(record.universityIds)
  const rawYears = mvalues(item.kind === 'question' ? record.years : record.yearIds)
  const onlyFor = item.kind === 'question' ? mvalues(record.questionOnlyFor) : []
  const universityIds = new Set(rawUniversities.map(normalized))
  const yearKeys = new Set(rawYears.map(normalized))
  const yearNumbers = new Set(rawYears.map(numericYear).filter((year) => year !== null))
  const universityKeys = new Set(options.map((option) => normalized(option.universityId)))
  const yearIdToUniversity = new Map(options.map((option) => [normalized(option.yearId), normalized(option.universityId)]))

  for (const value of onlyFor) {
    const key = normalized(value)
    if (universityKeys.has(key)) universityIds.add(key)
    if (yearIdToUniversity.has(key)) {
      yearKeys.add(key)
      universityIds.add(yearIdToUniversity.get(key))
    }
  }
  for (const key of yearKeys) {
    const universityId = yearIdToUniversity.get(key)
    if (universityId) universityIds.add(universityId)
  }
  return { universityIds, yearKeys, yearNumbers }
}
function optionInScope(option, scope) {
  if (scope.universityIds.size && !scope.universityIds.has(normalized(option.universityId))) return false
  if (!scope.yearKeys.size && !scope.yearNumbers.size) return true
  return scope.yearKeys.has(normalized(option.yearId))
    || scope.yearKeys.has(normalized(option.yearLabel))
    || (numericYear(option.yearLabel) !== null && scope.yearNumbers.has(numericYear(option.yearLabel)))
}
/**
 * The catalogue-derived module lookup — invariant across items, so it is built
 * ONCE per query (`catalogueModuleOptions`) and threaded into every per-item
 * `contentModuleLabels` call. Rebuilding it inside the per-item function turned a
 * 75k-item list into ~150k full-catalogue rebuilds and cost ~20s per request.
 * `prep` is optional: callers that pass none (the parity tests, one-off lookups)
 * keep the original build-it-here behaviour with identical output.
 */
function catalogueModuleOptions(catalogue) {
  const options = catalogue.flatMap((university) => university.years.flatMap((year) => year.courses.map((course, index) => ({
    id: course.moduleId ?? defaultModuleId(course.name, index + 1),
    label: course.name,
    group: `${university.short} › ${year.year}`,
    universityId: university.id,
    yearId: year.id,
    yearLabel: year.year,
  }))))
  const byId = new Map()
  const byLabel = new Map()
  for (const option of options) {
    byId.set(option.id, [...(byId.get(option.id) ?? []), option])
    const labelKey = option.label.trim().toLowerCase()
    byLabel.set(labelKey, [...(byLabel.get(labelKey) ?? []), option])
  }
  return { options, byId, byLabel }
}

function contentModuleLabels(item, catalogue, prep) {
  const { options, byId, byLabel } = prep ?? catalogueModuleOptions(catalogue)
  const scope = authoredScope(item, options)

  const seen = new Set()
  const labels = []
  for (const raw of itemModules(item.kind, item)) {
    const id = raw.trim()
    if (!id) continue
    const matches = byId.get(id) ?? byLabel.get(id.toLowerCase()) ?? []
    const scoped = matches.filter((option) => optionInScope(option, scope))
    const chosen = scoped.length === 1 ? scoped[0] : undefined
    const key = chosen ? `${chosen.id}::${chosen.label}` : id.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    if (chosen) {
      labels.push({ id: chosen.id, label: chosen.label, context: chosen.group, known: true })
      continue
    }
    if (!matches.length) {
      labels.push({ id, label: id, context: 'This module is not present in the current university catalogue.', known: false })
      continue
    }
    if (!scoped.length && (scope.universityIds.size || scope.yearKeys.size || scope.yearNumbers.size)) {
      labels.push({
        id,
        label: id,
        context: `This module exists in ${[...new Set(matches.map((option) => option.group))].join(' · ')}, but not in the item's selected university/year.`,
        known: false,
      })
      continue
    }
    labels.push({
      id,
      label: id,
      context: `This module matches multiple catalogue entries (${[...new Set(scoped.map((option) => option.group))].join(' · ')}). Add or correct the item's university and year scope.`,
      known: false,
    })
  }
  return labels
}

/* ---- contentFacets.ts ---------------------------------------------------- */
function facetToken(type, value) {
  return `${type}:${value.trim().toLowerCase()}`
}
function facetKey(facet) {
  return facetToken(facet.type, facet.value)
}
function itemFacetTokens(item, catalogue, prep) {
  const tokens = new Set()
  const modules = contentModuleLabels(item, catalogue, prep)
  for (const module of modules) tokens.add(facetToken('module', module.label))
  if (modules.length === 0) tokens.add(facetToken('flag', 'no-module'))
  if (item.subjectId) tokens.add(facetToken('subject', item.subjectId))
  for (const tag of contentTagsOf(item)) tokens.add(facetToken('tag', tag))
  return tokens
}
function availableFacets(items, catalogue, prep) {
  const modules = new Map()
  const subjects = new Map()
  const tags = new Map()
  for (const item of items) {
    for (const module of contentModuleLabels(item, catalogue, prep)) {
      modules.set(facetToken('module', module.label), { type: 'module', value: module.label, label: module.label })
    }
    if (item.subjectId) {
      const subject = getSubject(item.subjectId)
      subjects.set(facetToken('subject', subject.id), { type: 'subject', value: subject.id, label: subject.name, color: subject.color })
    }
    for (const tag of contentTagsOf(item)) {
      tags.set(facetToken('tag', tag), { type: 'tag', value: tag, label: tag })
    }
  }
  const byLabel = (left, right) => left.label.localeCompare(right.label, undefined, { sensitivity: 'base' })
  return {
    modules: [...modules.values()].sort(byLabel),
    subjects: [...subjects.values()].sort(byLabel),
    tags: [...tags.values()].sort(byLabel),
  }
}
function itemMatchesFacets(tokens, selected) {
  if (selected.size === 0) return true
  for (const token of selected) if (tokens.has(token)) return true
  return false
}

/* ---- The dashboard pipeline (ControlDashboard.tsx lines ~340–446) --------- */
const QUESTION_KINDS = new Set(['question', 'resource', 'practical', 'deck', 'essay', 'histology'])
const updatedDesc = (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()

/**
 * The topic/chapter group label an item sits under — the server twin of
 * `currentTopicLabel` in ControlDashboard. Carried in the bulk-selection
 * projection so a cross-page topic rename can find every item under the label
 * without downloading full items. Resource groups on Chapter, everything else on
 * Topic, with the same fallbacks.
 */
function topicLabelOf(item) {
  if (item.kind === 'resource') {
    return item.fields?.Chapter?.trim() || item.resourceData?.chapters?.[0] || 'General'
  }
  return item.fields?.Topic?.trim() || 'Other'
}

/**
 * Run the whole list pipeline over already-loaded index items + byId + catalogue.
 * Pure and injectable, so the parity tests drive it without a database.
 */
export function runContentQuery({ indexItems, byId, catalogue, contentScope = null }, params = {}) {
  const activeKind = params.kind ?? 'question'
  const universityId = params.universityId || undefined
  const year = params.year || undefined
  const status = params.status ?? 'All'
  const mediaFilter = params.mediaFilter ?? 'all'
  const selectedFacets = new Set(Array.isArray(params.facets) ? params.facets : [])
  const query = typeof params.query === 'string' ? params.query : ''
  const sourceTab = params.sourceTab ?? 'all'
  const archiveSplit = params.archiveSplit === true
  const archiveView = params.archiveView === true
  const page = Number.isFinite(params.page) && params.page > 0 ? Math.floor(params.page) : 1
  const pageSize = Number.isFinite(params.pageSize) && params.pageSize > 0 ? Math.floor(params.pageSize) : 50
  // A scoped reviewer sees only content their modules/years may write — the
  // server twin of the client's `useScopedItems(ledger)`. Every derivation below
  // (counts, facets, matching) runs over this narrowed set, exactly as the client
  // runs them over the scoped `items`. The scope is trusted (from `req.identity`,
  // never the request body). Null scope (editor/super admin) filters nothing.
  const isArchiveView = archiveSplit && archiveView
  const items = contentScope
    ? indexItems.filter((item) => itemWritableBy(contentScope, item.kind, item))
    : indexItems

  // scopedItems → summaryItems → counts
  const byKind = archiveSplit ? items.filter((item) => item.kind === activeKind) : items
  const scopedItems = !archiveSplit
    ? byKind
    : byKind.filter((item) => (isArchiveView ? item.status === 'Archived' : item.status !== 'Archived'))
  const summaryItems = scopedItems.filter((item) => {
    if (isArchiveView || (!universityId && !year)) return true
    if (!QUESTION_KINDS.has(activeKind)) return true
    return itemInScope(item, universityId, year)
  })
  const counts = {
    total: summaryItems.length,
    published: summaryItems.filter((item) => item.status === 'Published').length,
    review: summaryItems.filter((item) => item.status === 'In review').length,
    drafts: summaryItems.filter((item) => item.status === 'Draft').length,
  }

  const kindCounts = {
    question: 0, article: 0, practical: 0, resource: 0, deck: 0, essay: 0, histology: 0,
  }
  for (const item of items) if (item.kind in kindCounts) kindCounts[item.kind] += 1

  const existingContentTags = availableContentTags(items)

  // The catalogue module lookup, built once and reused for every per-item facet
  // derivation below (rebuilding it per item cost ~20s over 75k items).
  const modulePrep = catalogueModuleOptions(catalogue)

  // Per-kind facets
  const kindItems = items.filter((item) => item.kind === activeKind)
  const facetIndex = new Map(kindItems.map((item) => [item.id, itemFacetTokens(item, catalogue, modulePrep)]))
  const facetGroups = availableFacets(kindItems, catalogue, modulePrep)
  const facetFlags = kindItems.some((item) => facetIndex.get(item.id)?.has('flag:no-module'))
    ? [{ type: 'flag', value: 'no-module', label: 'Needs module' }]
    : []
  const facetLabels = {}
  for (const facet of [...facetGroups.modules, ...facetGroups.subjects, ...facetGroups.tags, ...facetFlags]) {
    facetLabels[facetKey(facet)] = facet.label
  }
  const kindArchivedCount = kindItems.filter((item) => item.status === 'Archived').length
  const kindCurrentCount = kindItems.length - kindArchivedCount

  // matching
  const normalizedQuery = query.trim().toLowerCase()
  const matching = items
    .filter((item) => item.kind === activeKind)
    .filter((item) => !archiveSplit || (isArchiveView ? item.status === 'Archived' : item.status !== 'Archived'))
    .filter((item) => status === 'All' || item.status === status)
    .filter((item) => matchesMediaRequestFilter(item, mediaFilter))
    .filter((item) => itemMatchesFacets(facetIndex.get(item.id) ?? new Set(), selectedFacets))
    .filter((item) => {
      if ((!universityId && !year) || isArchiveView || !QUESTION_KINDS.has(activeKind)) return true
      return itemInScope(item, universityId, year)
    })
    .filter((item) => !normalizedQuery
      || `${item.title} ${item.owner} ${Object.values(item.fields).join(' ')} ${[...(facetIndex.get(item.id) ?? [])].join(' ')}`.toLowerCase().includes(normalizedQuery))
    .sort(updatedDesc)

  const sourceCounts = {
    all: matching.length,
    university: matching.filter(isUniversitySourced).length,
    internal: matching.filter((item) => !isUniversitySourced(item)).length,
  }

  const showsSourceTabs = activeKind === 'question' || activeKind === 'practical'
  const rows = (!showsSourceTabs || sourceTab === 'all')
    ? matching
    : matching.filter((item) => (sourceTab === 'university' ? isUniversitySourced(item) : !isUniversitySourced(item)))

  // Resources split Files/Videos client-side (a Segmented control over the page);
  // the badge counts are over the whole matching set, so they come from here.
  const resourceCounts = {
    Files: rows.filter((item) => item.fields?.Type !== 'Video').length,
    Videos: rows.filter((item) => item.fields?.Type === 'Video').length,
  }

  const total = rows.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, pageCount)
  const pageRowIds = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((item) => item.id)

  const full = (id) => byId.get(String(id))
  const reviewQueue = summaryItems
    .filter((item) => item.status === 'In review')
    .sort(updatedDesc)
    .slice(0, 7)
    .map((item) => full(item.id))
    .filter(Boolean)

  // Archive sub-view stat cards (locked kinds' Archive tab). Computed only there;
  // zeros otherwise so the client can read them unconditionally.
  const archiveStats = isArchiveView
    ? {
        previouslyPublished: summaryItems.filter((item) => item.archive?.originalStatus === 'Published').length,
        noModule: summaryItems.filter((item) => contentModuleLabels(item, catalogue, modulePrep).length === 0).length,
        operations: new Set(summaryItems.map((item) => item.archive?.operationId).filter(Boolean)).size,
      }
    : { previouslyPublished: 0, noModule: 0, operations: 0 }

  const result = {
    page: pageRowIds.map(full).filter(Boolean),
    total,
    pageCount,
    counts,
    kindCounts,
    facetGroups,
    facetFlags,
    facetLabels,
    sourceCounts,
    resourceCounts,
    existingContentTags,
    reviewQueue,
    kindArchivedCount,
    kindCurrentCount,
    archiveStats,
    // How many items the reviewer's scope hid (all kinds), for the "N others
    // hidden" banner. 0 for an unscoped caller — the banner never shows.
    scopeHidden: contentScope ? indexItems.length - items.length : 0,
  }
  if (params.includeMatchingIds) {
    // Every matching item across all pages — enough fields to drive "Select all N
    // matching → Publish/Archive" ("X of Y can publish" + the force-publish list's
    // title/reason), and a cross-page topic rename (subjectId + topic), without
    // downloading full items.
    result.matching = matching.map((item) => {
      const verdict = publishReadiness(item)
      return {
        id: item.id, status: item.status, kind: item.kind, title: item.title,
        subjectId: item.subjectId ?? '', topic: topicLabelOf(item),
        ready: verdict.ready, hardBlocked: verdict.hardBlocked === true, reason: verdict.reason ?? '',
      }
    })
    result.matchingIds = result.matching.map((m) => m.id)
  }
  return result
}

/* ---- Catalogue loader (memoised by app_state_versions signature) --------- */
const CATALOGUE_KEY = 'nishany-academic-universities-v1'
let catalogueSnapshot = null

export async function loadCatalogue() {
  const [rows] = await pool.query(
    `SELECT s.v, (SELECT MAX(id) FROM app_state_versions WHERE k = s.k) AS version
       FROM app_state s WHERE s.k = ?`,
    [CATALOGUE_KEY],
  )
  const signature = String(rows[0]?.version ?? 0)
  if (catalogueSnapshot && catalogueSnapshot.signature === signature) return catalogueSnapshot.catalogue
  let catalogue = []
  try {
    const parsed = JSON.parse(rows[0]?.v ?? '[]')
    if (Array.isArray(parsed)) catalogue = parsed
  } catch { catalogue = [] }
  catalogueSnapshot = { signature, catalogue }
  return catalogue
}

/**
 * One page of the Content dashboard. Loads the snapshot + catalogue (unless
 * injected, for the parity tests) and runs the pipeline. `deps` lets a test feed
 * `{ indexItems, byId, catalogue }` directly instead of hitting the database.
 */
export async function queryContentList(params = {}, deps) {
  let indexItems = deps?.indexItems
  let byId = deps?.byId
  if (!indexItems || !byId) {
    const snapshot = await loadAdminContent()
    indexItems = snapshot.indexItems
    byId = snapshot.byId
  }
  const catalogue = deps?.catalogue ?? await loadCatalogue()
  return runContentQuery({ indexItems, byId, catalogue, contentScope: deps?.contentScope ?? null }, params)
}

export async function adminContentListHandler(req, res) {
  // contentScope comes only from the authenticated identity, never the request
  // body — a reviewer must not be able to widen their own scope by asking.
  return res.json(await queryContentList(req.body ?? {}, { contentScope: req.identity?.contentScope ?? null }))
}
