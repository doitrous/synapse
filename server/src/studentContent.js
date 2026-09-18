/**
 * The student's content ledger, sliced.
 *
 * `GET /api/state/nishany-admin-content-ledger-v4` redacts the whole ledger on
 * every request and ships all of it — 23 MB on the August snapshot, ~60 MB in
 * production today — to a student who wanted one library article. This module
 * does the same redaction once per ledger version and serves the slices a
 * student surface actually reads.
 *
 * The redaction is unchanged: `redactLedgerForStudent` is the one gate for what
 * may leave, and every route here is downstream of it. What is added is
 * *audience* — a student receives their own university's and year's content and
 * not another's — plus, for articles, an index that carries no body at all.
 * Articles are ~45% of the ledger by bytes, so shipping their bodies only when
 * one is opened is most of the saving.
 *
 * Cache shape is copied deliberately from `publishedQuestions.js`: a version
 * signature over the same three documents, checked on every use so a second
 * server process refreshes after another one's write. Invalidation is one call
 * inside `invalidateSnapshots`, the same place every other snapshot is dropped.
 */
import { pool, appStateVersions } from './db.js'
import { MEDIA_STATE_KEY } from './mediaLibrary.js'
import { redactLedgerForStudent, releasedMediaIdsFromDocument } from './studentLedger.js'
import { loadConceptCatalogue, loadConceptIndex } from './conceptCatalogue.js'
import { itemModules, itemUniversities, itemYears, yearNumber } from './contentScope.js'
import { requireAuthenticated } from './auth.js'
import { hasConsoleAccess } from './roles.js'
import { callerHasActiveAccess } from './accounts.js'

/**
 * Answerable content — full questions with their answers, article and slice
 * bodies, a single item — is the paid product and needs a live subscription.
 * The non-answerable views (counts, `view=summary` stems, the article index,
 * an id manifest) stay open: they carry nothing a student could study or answer
 * from, and the free dashboard is built on them. Console roles preview
 * everything. Returns true (and sends 402) when the caller may not have it.
 */
async function contentLocked(req, res) {
  if (await callerHasActiveAccess(req.identity)) return false
  res.status(402).json({ error: 'subscription_required' })
  return true
}

const LEDGER_KEY = 'nishany-admin-content-ledger-v4'
const ACADEMIC_CATALOGUE_KEY = 'nishany-academic-universities-v1'

/** Kinds served whole by `/api/content/items`. Articles and questions are not: they have their own shapes. */
const SLICE_KINDS = new Set(['resource', 'practical', 'essay', 'histology', 'deck'])

const DEFAULT_QUESTION_FORMAT = 'mcq_single_best'

let snapshot = null
// A rebuild in progress, shared so concurrent cold requests await one 60 MB
// read + build instead of each doing their own. See loadStudentContent.
let rebuilding = null

export function invalidateStudentContent(key) {
  if (key === LEDGER_KEY || key === MEDIA_STATE_KEY || key === ACADEMIC_CATALOGUE_KEY) snapshot = null
}

function list(value) {
  return Array.isArray(value) ? value.filter((entry) => typeof entry === 'string' && entry.trim()) : []
}

/**
 * One article as the library list needs it: everything but the article.
 *
 * `articleData` is the body — sections, annotations, evidence — and it is the
 * reason the ledger is the size it is. The reader fetches it per article from
 * `/api/content/item/:id`; nothing in a list of articles needs it.
 */
export function articleIndexRow(item) {
  const data = item.articleData ?? {}
  return {
    id: item.id,
    title: item.title,
    subjectId: item.subjectId,
    status: item.status,
    updatedAt: item.updatedAt,
    // `Reading time` rides along because a library card prints it; `Topic` is
    // the chapter an untitled article is filed under.
    fields: { Topic: item.fields?.Topic, 'Reading time': item.fields?.['Reading time'] },
    // The student-facing blurb, already chosen between the evidence-gated one
    // and the draft, so the client's `publishedSummary || summary || fields`
    // ladder resolves to the same string it would have from the whole article.
    summary: data.publishedSummary || data.summary || item.fields?.Summary || '',
    // Where the article sits on the curriculum tree — `buildCurriculumMembership`
    // reads exactly these two and nothing else of the body.
    primaryNodeId: data.primaryNodeId,
    secondaryNodeIds: list(data.secondaryNodeIds),
    moduleIds: list(data.moduleIds),
    universityIds: list(data.universityIds),
    yearIds: list(data.yearIds),
  }
}

/**
 * One question as the Question Bank *hub* needs it: enough to count, group and
 * filter, and not one byte a student could answer from.
 *
 * The hub is the landing screen — presets, per-subject and per-source counts,
 * the topic chooser — and none of that reads an option, a rationale or an
 * explanation, which together are most of what a question weighs. Those arrive
 * only once a test actually starts, from the full `view` of this same route.
 *
 * Deliberately absent: `answers`, `correctAnswer`, `attachments`,
 * `fields.Explanation`, `mediaRequests`, `writtenParts` and every other format
 * payload. `fields.Vignette` stays because the "Emergencies only" preset
 * searches it, and `attachedImage` because the hub counts image questions.
 */
export function questionSummaryRow(item) {
  const data = item.questionData ?? {}
  const tags = data.tags ?? {}
  return {
    id: item.id,
    kind: 'question',
    title: item.title,
    subjectId: item.subjectId,
    status: item.status,
    fields: {
      Topic: item.fields?.Topic,
      Difficulty: item.fields?.Difficulty,
      Vignette: item.fields?.Vignette,
    },
    questionData: {
      format: data.format,
      attachedImage: data.attachedImage ?? '',
      libraryIds: list(data.libraryIds),
      resourceIds: list(data.resourceIds),
      tags: {
        topic: tags.topic ?? '',
        intendedDifficulty: tags.intendedDifficulty,
        sourceCategory: tags.sourceCategory,
        conceptIds: list(tags.conceptIds),
        mainConceptIds: list(tags.mainConceptIds),
        moduleIds: list(tags.moduleIds),
        moduleSubjectPaths: list(tags.moduleSubjectPaths),
        universityIds: list(tags.universityIds),
        years: list(tags.years),
        questionOnlyFor: list(tags.questionOnlyFor),
      },
    },
  }
}

/**
 * One essay as `usePracticeProgress` needs it: enough to know it counts and
 * whether it has been marked, none of the prompt, examiner's note or model
 * answer — the three fields that make an essay body what it is.
 *
 * `prompt` survives as a placeholder rather than disappearing:
 * `managedEssayToStudentEssay` (reused unchanged against this row) refuses an
 * essay with no prompt, and a light row must fail that check exactly when the
 * full one would.
 */
export function essaySummaryRow(item) {
  const data = item.essayData
  if (!data) return item
  return {
    ...item,
    essayData: {
      prompt: data.prompt?.trim() ? '·' : '',
      keyPoints: (data.keyPoints ?? []).map((point) => ({ id: point.id, text: '' })),
      examinerNote: '',
      modelAnswer: '',
    },
  }
}

/**
 * One practical as `usePracticeProgress` needs it: enough to sort it into
 * stations/cases/labs and count it, none of the decisions, questions, actor
 * script or media a station actually runs on.
 */
export function practicalSummaryRow(item) {
  const data = item.practicalData
  if (!data) return item
  return { ...item, practicalData: { format: data.format } }
}

/** `view=summary` projections, by slice kind — the essay/practical siblings of `questionSummaryRow`. */
const SLICE_SUMMARY_PROJECTIONS = { essay: essaySummaryRow, practical: practicalSummaryRow }

/** Which questions point at which article. The client used to scan the whole ledger for this. */
export function questionLinksFor(questions) {
  const links = {}
  for (const item of questions) {
    for (const articleId of list(item.questionData?.libraryIds)) {
      (links[articleId] ??= []).push({ id: item.id, stem: item.title })
    }
  }
  return links
}

/**
 * The inclusion rule `managedQuestionToStudentQuestion` applies in the browser.
 *
 * Mirrored here so the wire carries only questions the client would have kept
 * anyway. The client still re-applies it — this is a saving, not a new gate —
 * which is why an explicitly requested format skips it below: a written
 * question has no lettered answers and its consumer never wanted them.
 */
export function isAnswerableQuestion(item) {
  const data = item?.questionData
  if (item?.kind !== 'question' || !data) return false
  const answers = (Array.isArray(data.answers) ? data.answers : [])
    .filter((answer) => String(answer?.text ?? '').trim())
  return answers.length >= 2 && answers.some((answer) => answer.label === data.correctAnswer)
}

/**
 * Whether this student may see this item.
 *
 * The mirror of `questionInAudience` / `itemInScope` on the client, with the
 * same "empty means unrestricted" rule — untagged content applies to everyone.
 * It reads tags through `contentScope.js`, which normalises the three ways this
 * codebase has stored a year, so an item tagged `Year 2` reaches a second-year
 * exactly as one tagged `OMS_Y2` does. That makes this *looser* than the
 * client's raw string compare, which is the safe direction: the client filter
 * still runs on top, so nothing it would have shown is dropped here.
 */
export function inAudience(item, audience) {
  if (!audience) return true
  const kind = item?.kind
  const onlyFor = kind === 'question' ? list(item.questionData?.tags?.questionOnlyFor) : []
  if (onlyFor.length) {
    // An author allow-list. When present, nothing outside it qualifies.
    const allowed = onlyFor.some((id) => (audience.universityId && id.trim().toUpperCase() === audience.universityId)
      || (audience.yearId && id.trim() === audience.yearId))
    if (!allowed) return false
  }
  const universities = itemUniversities(kind, item)
  if (audience.universityId && universities.length && !universities.includes(audience.universityId)) return false
  const years = itemYears(kind, item)
  if (audience.year !== null && years.length && !years.includes(audience.year)) return false
  return true
}

/** What the catalogue holds, by kind, by module and by subject. */
export function countsFor(items) {
  const byKind = {}
  const byModule = {}
  const bySubject = {}
  const bump = (bucket, id, kind) => {
    const row = (bucket[id] ??= {})
    row[kind] = (row[kind] ?? 0) + 1
  }
  for (const item of items) {
    const kind = String(item?.kind ?? 'unknown')
    byKind[kind] = (byKind[kind] ?? 0) + 1
    for (const moduleId of new Set(itemModules(kind, item))) bump(byModule, moduleId, kind)
    if (item?.subjectId) bump(bySubject, String(item.subjectId), kind)
  }
  return { byKind, byModule, bySubject }
}

function megabytes(value) {
  return `${(JSON.stringify(value).length / 1024 / 1024).toFixed(1)}MB`
}

function build(signature, ledger, media, catalogue) {
  const started = Date.now()
  const items = redactLedgerForStudent(ledger, releasedMediaIdsFromDocument(media), catalogue)
  const byKind = new Map()
  const byId = new Map()
  const titles = new Map()
  for (const item of items) {
    const kind = String(item.kind ?? 'unknown')
    if (!byKind.has(kind)) byKind.set(kind, [])
    byKind.get(kind).push(item)
    if (item.id) {
      byId.set(item.id, item)
      titles.set(item.id, item.title ?? item.id)
    }
  }
  const questions = byKind.get('question') ?? []
  // Once per ledger version, so prod can be measured from the logs rather than
  // guessed at. This is the only place the whole projection is stringified.
  const sizes = [...byKind].map(([kind, entries]) => `${kind} ${entries.length} items ${megabytes(entries)}`)
  console.info(`[content] rebuilt in ${Date.now() - started}ms: ${sizes.join(', ') || 'empty'}`)
  return {
    signature,
    byKind,
    byId,
    titles,
    articleIndex: (byKind.get('article') ?? []).map(articleIndexRow),
    questionLinks: questionLinksFor(questions),
    summary: countsFor(items),
  }
}

export async function loadStudentContent() {
  const keys = [LEDGER_KEY, MEDIA_STATE_KEY, ACADEMIC_CATALOGUE_KEY]
  // Version-checked on every use, not merely invalidated in memory: another
  // process may have warmed its cache before this one's write. See the same
  // reasoning in publishedQuestions.js. The check reads versions only, never the
  // ~60 MB value blobs — those are pulled below solely on a cache miss.
  const versions = await appStateVersions(keys)
  // Dot-joined rather than JSON: this doubles as the ETag, and an ETag may not
  // contain a quote.
  const signature = keys.map((key) => versions.get(key) ?? 0).join('.')
  if (snapshot && snapshot.signature === signature) return snapshot
  // Cache miss. Coalesce: if a rebuild for this same version is already running
  // (the cold-start herd — several content requests arriving at once), await it
  // rather than each pulling the 60 MB blobs and rebuilding independently.
  if (rebuilding && rebuilding.signature === signature) return rebuilding.promise
  const promise = (async () => {
    // Only now is it worth pulling the (large) value blobs.
    const [rows] = await pool.query('SELECT k, v FROM app_state WHERE k IN (?, ?, ?)', keys)
    const row = (key) => rows.find((entry) => entry.k === key)
    try {
      snapshot = build(
        signature,
        JSON.parse(row(LEDGER_KEY)?.v ?? '[]'),
        JSON.parse(row(MEDIA_STATE_KEY)?.v ?? '{"records":[]}'),
        JSON.parse(row(ACADEMIC_CATALOGUE_KEY)?.v ?? '[]'),
      )
    } catch {
      // A malformed document yields nothing rather than a thrown request, the
      // same way the published-question snapshot treats it.
      snapshot = build(signature, [], { records: [] }, [])
    }
    return snapshot
  })()
  rebuilding = { signature, promise }
  try {
    return await promise
  } finally {
    if (rebuilding && rebuilding.promise === promise) rebuilding = null
  }
}

/** The caller's own cohort, or null for "no audience filter". */
export function audienceOf(profile) {
  const universityId = String(profile?.universityId ?? '').trim().toUpperCase() || null
  const yearId = String(profile?.yearId ?? '').trim() || null
  const year = yearNumber(yearId) ?? yearNumber(profile?.year)
  // An unsettled enrolment applies no filter, matching `questionInAudience`:
  // the alternative is a student with a half-finished profile seeing nothing.
  return universityId || year !== null ? { universityId, yearId, year } : null
}

/**
 * The audience this request is answered for.
 *
 * A student's is their own, full stop — `university` and `year` in the query
 * string are read only for a console caller, who has no cohort of their own and
 * previews other people's. That is the clamp: a student cannot widen, because
 * their query is never consulted.
 */
async function audienceFor(req) {
  if (hasConsoleAccess(req.identity?.role)) {
    const universityId = String(req.query.university ?? '').trim().toUpperCase() || null
    const yearId = String(req.query.year ?? '').trim() || null
    const year = yearNumber(yearId)
    return universityId || year !== null ? { universityId, yearId, year } : null
  }
  const [rows] = await pool.query(
    'SELECT university_id AS universityId, year, year_id AS yearId FROM students WHERE user_id = ? LIMIT 1',
    [req.identity.id],
  )
  return audienceOf(rows[0] ?? null)
}

/**
 * Answer with the version this content is at, or 304 if the caller has it.
 *
 * `private` because the body is audience-specific and must never sit in a
 * shared cache; `no-cache` because a browser may keep it forever provided it
 * revalidates, which is exactly what the ETag makes cheap.
 */
function sendVersioned(req, res, signature, body) {
  const etag = `W/"${signature}"`
  res.set('ETag', etag)
  res.set('Cache-Control', 'private, no-cache')
  if (req.get('if-none-match') === etag) return res.status(304).end()
  return res.json({ version: signature, ...body })
}

function scoped(items, audience) {
  return audience ? items.filter((item) => inAudience(item, audience)) : items
}

export async function summaryHandler(req, res) {
  const content = await loadStudentContent()
  const audience = await audienceFor(req)
  const counts = audience
    ? countsFor(scoped([...content.byId.values()], audience))
    : content.summary
  return sendVersioned(req, res, content.signature, { counts })
}

/** How many ids one manifest request may name. See `manifestHandler`. */
export const MAX_MANIFEST_IDS = 200

export async function itemsHandler(req, res) {
  const kind = String(req.query.kind ?? '')
  const content = await loadStudentContent()
  const audience = await audienceFor(req)

  if (req.query.ids !== undefined) {
    /**
     * "Which of these ids still exist, and what are they?"
     *
     * The exam programme holds ids an administrator picked months ago and needs
     * to know which still resolve and which of them are written questions. That
     * is two fields per id, so a manifest section on `/summary` was the other
     * option — but at ~60 bytes an entry a 12 000-item catalogue is ~700 KB
     * shipped to every dashboard, against a few hundred bytes here.
     *
     * Capped rather than truncated: silently answering about the first 200 of
     * 300 ids would read as "the other 100 were unpublished".
     */
    const ids = String(req.query.ids).split(',').map((id) => id.trim()).filter(Boolean)
    if (ids.length > MAX_MANIFEST_IDS) return res.status(400).json({ error: `at most ${MAX_MANIFEST_IDS} ids` })
    const items = ids
      .map((id) => content.byId.get(id))
      .filter((item) => item && inAudience(item, audience))
      .map((item) => ({
        id: item.id,
        kind: item.kind,
        ...(item.questionData?.format ? { format: item.questionData.format } : {}),
      }))
    return sendVersioned(req, res, content.signature, { items })
  }

  if (kind === 'article') {
    // `view=index` is required, not defaulted: the whole point of this route is
    // that an article's body never ships with the list, and a typo'd view must
    // fail loudly rather than quietly hand back 10 MB of article bodies.
    if (req.query.view !== 'index') return res.status(400).json({ error: 'articles require view=index' })
    const articles = scoped(content.byKind.get('article') ?? [], audience)
    return sendVersioned(req, res, content.signature, {
      items: audience ? articles.map(articleIndexRow) : content.articleIndex,
      questionLinks: audience
        ? questionLinksFor(scoped(content.byKind.get('question') ?? [], audience))
        : content.questionLinks,
    })
  }
  if (!SLICE_KINDS.has(kind)) return res.status(400).json({ error: 'unsupported kind' })
  const summaryRow = req.query.view === 'summary' ? SLICE_SUMMARY_PROJECTIONS[kind] : null
  // Full slice bodies (resources, practicals, essays, histology, decks) are the
  // paid product; the id-manifest and article-index branches above are not.
  // Neither is a `view=summary` projection for a kind that has one (essay,
  // practical) — it carries no body, the same policy as the question-summary
  // view. A kind with no projection (resource, histology, deck) leaves
  // summaryRow null and so stays gated regardless of the view param.
  if (!summaryRow && await contentLocked(req, res)) return
  const items = scoped(content.byKind.get(kind) ?? [], audience)
  return sendVersioned(req, res, content.signature, {
    items: summaryRow ? items.map(summaryRow) : items,
  })
}

export async function questionsHandler(req, res) {
  const content = await loadStudentContent()
  const audience = await audienceFor(req)
  const { subject, module: moduleId, topic, format } = req.query

  const summary = req.query.view === 'summary'

  let items = scoped(content.byKind.get('question') ?? [], audience)
  if (format) items = items.filter((item) => (item.questionData?.format ?? DEFAULT_QUESTION_FORMAT) === format)
  // The answerable rule is unconditional under `view=summary`: a summary row
  // carries no `answers` for the client to re-check, so this is the only gate.
  if (summary || !format) items = items.filter(isAnswerableQuestion)
  if (subject) items = items.filter((item) => item.subjectId === subject)
  if (moduleId) items = items.filter((item) => itemModules('question', item).includes(String(moduleId)))
  if (topic) {
    items = items.filter((item) => (item.questionData?.tags?.topic?.trim() || item.fields?.Topic?.trim() || 'General') === topic)
  }

  // The hub's view. No title stubs: the summary projection renders no library
  // or resource *titles*, only matches on their ids.
  if (summary) {
    return sendVersioned(req, res, content.signature, { items: items.map(questionSummaryRow) })
  }

  // Beyond here every question ships with its answers and explanations — the
  // paid product. The summary branch above (the free dashboard's view) has
  // already returned, so only a subscription-gated request reaches this.
  if (await contentLocked(req, res)) return

  // `managedQuestionToStudentQuestion` resolves `libraryIds`/`resourceIds` to
  // titles against the whole catalogue. It gets the titles it needs and nothing
  // else, so the projection keeps working against a slice.
  const present = new Set(items.map((item) => item.id))
  const stubs = []
  for (const item of items) {
    for (const id of [...list(item.questionData?.libraryIds), ...list(item.questionData?.resourceIds)]) {
      if (present.has(id)) continue
      present.add(id)
      if (content.titles.has(id)) stubs.push({ id, title: content.titles.get(id) })
    }
  }
  return sendVersioned(req, res, content.signature, { items: [...items, ...stubs] })
}

export async function itemHandler(req, res) {
  // A single full item is answerable content, so the gate comes first: a lapsed
  // student gets 402 for every id alike and so cannot use the 404-vs-hit split
  // below as an oracle for which ids exist in their cohort.
  if (await contentLocked(req, res)) return
  const content = await loadStudentContent()
  const item = content.byId.get(req.params.id)
  // One 404 for "no such item" and for "not yours": which of the two it is
  // would itself disclose that another cohort has an item by this id.
  if (!item || !inAudience(item, await audienceFor(req))) return res.status(404).json({ error: 'not found' })
  return sendVersioned(req, res, content.signature, { item })
}

/**
 * One concept's full detail — the prose the concept index leaves out, fetched
 * only when the glossary opens that concept.
 *
 * Not subscription-gated and not audience-gated: a concept definition was always
 * readable by any signed-in student (the whole graph used to ship to everyone),
 * and the index a student holds only ever surfaces their own cohort's ids, so
 * this cannot widen what they can reach. One 404 covers "no such concept".
 */
export async function conceptHandler(req, res) {
  const { byId, signature } = await loadConceptCatalogue()
  const concept = byId.get(String(req.params.id))
  if (!concept) return res.status(404).json({ error: 'not found' })
  return sendVersioned(req, res, signature, { concept })
}

/**
 * The slim concept index for the caller's own university — the bulk read every
 * many-concept student surface holds.
 *
 * Scoped to the caller's *student profile* university, not `audienceFor`'s
 * query params, so a console user viewing a student surface gets their cohort's
 * slim index rather than the whole authoring graph the `/api/state` route hands
 * authors. The ETag carries the university because two cohorts' indexes differ.
 */
export async function conceptIndexHandler(req, res) {
  const [rows] = await pool.query(
    'SELECT university_id AS universityId FROM students WHERE user_id = ? LIMIT 1',
    [req.identity.id],
  )
  const { signature, uni, graph } = await loadConceptIndex(rows[0]?.universityId ?? null)
  return sendVersioned(req, res, `${signature}.${uni}`, { graph })
}

const wrap = (fn) => (req, res) => Promise.resolve(fn(req, res)).catch((error) => {
  console.error(error)
  res.status(500).json({ error: error.message || 'server error' })
})

export function registerContentRoutes(app) {
  app.get('/api/content/summary', requireAuthenticated, wrap(summaryHandler))
  app.get('/api/content/items', requireAuthenticated, wrap(itemsHandler))
  app.get('/api/content/questions', requireAuthenticated, wrap(questionsHandler))
  app.get('/api/content/item/:id', requireAuthenticated, wrap(itemHandler))
  app.get('/api/content/concept/:id', requireAuthenticated, wrap(conceptHandler))
  app.get('/api/content/concept-index', requireAuthenticated, wrap(conceptIndexHandler))
}
