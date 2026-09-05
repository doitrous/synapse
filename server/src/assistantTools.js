import { pool } from './db.js'
import { loadStudentContent, inAudience, audienceOf } from './studentContent.js'

/**
 * Retrieval, kept apart from generation.
 *
 * The assistant used to be told to "name the library subtopic" with no library
 * in front of it, which is a licence to invent one. These three functions are
 * the library: they read the same redacted, cached projection the student
 * content routes read (`loadStudentContent`), scoped through the same
 * `inAudience` gate, so the assistant can never surface an article the student
 * could not open for themselves.
 *
 * Everything they return is *data*. It reaches the model inside a
 * `<context>` block and the system prompt says so, because an article body is
 * written by a content author and a question stem quotes whatever a paper
 * quoted — neither is a place instructions may come from.
 */

/** How much of one article's body may reach the model. */
const SNIPPET_CHARS = 700
const ARTICLE_CHARS = 3000

/** Words too common to discriminate between two medical articles. */
const STOPWORDS = new Set([
  'the', 'and', 'for', 'with', 'what', 'which', 'that', 'this', 'from', 'about',
  'how', 'why', 'does', 'are', 'was', 'were', 'can', 'you', 'explain', 'between',
])

export function tokenise(query) {
  return [...new Set((String(query ?? '').toLowerCase().match(/[\p{L}\p{N}]{3,}/gu) ?? []))]
    .filter((word) => !STOPWORDS.has(word))
    .slice(0, 12)
}

/**
 * Every string inside a nested content document, flattened.
 *
 * `articleData` has been three different shapes across this codebase's life —
 * sections, blocks, annotations — so this walks it rather than knowing it. A
 * walker that reads a shape it has not seen is worth more here than a parser
 * that returns nothing the day the editor adds a field.
 */
export function plainText(value, cap = ARTICLE_CHARS) {
  const out = []
  let length = 0
  const walk = (node) => {
    if (length >= cap || node == null) return
    if (typeof node === 'string') {
      const text = node.trim()
      if (text) { out.push(text); length += text.length + 1 }
      return
    }
    if (Array.isArray(node)) { for (const entry of node) walk(entry) ; return }
    if (typeof node === 'object') { for (const entry of Object.values(node)) walk(entry) }
  }
  walk(value)
  return out.join(' ').slice(0, cap)
}

/**
 * How well one item answers this query.
 *
 * Deliberately a word count and not an embedding: the corpus is one
 * university's library, the queries are two or three clinical nouns, and a
 * title match is worth more than five body matches. A zero score means "not a
 * result", so an unrelated question returns nothing rather than the least
 * unrelated article — which is the failure that makes retrieval worse than no
 * retrieval.
 *
 * ponytail: term counting, no stemming or synonyms. Swap in a real index if
 * students start reporting misses, not before.
 */
export function scoreFields({ title = '', topic = '', body = '' }, tokens) {
  if (!tokens.length) return 0
  const lowTitle = title.toLowerCase()
  const lowTopic = topic.toLowerCase()
  const lowBody = body.toLowerCase()
  let score = 0
  for (const token of tokens) {
    if (lowTitle.includes(token)) score += 5
    if (lowTopic.includes(token)) score += 3
    if (lowBody.includes(token)) score += 1
  }
  return score
}

/** The best `limit` items for these tokens, best first. Ties break by id, so the order is stable. */
export function ranked(items, tokens, limit, project) {
  return items
    .map((item) => ({ item, score: scoreFields(project(item), tokens) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || String(a.item.id).localeCompare(String(b.item.id)))
    .slice(0, limit)
    .map((entry) => entry.item)
}

function scoped(items, audience) {
  return audience ? items.filter((item) => inAudience(item, audience)) : items
}

/** The student's own cohort, for scoping. Console callers have none, so nothing is filtered. */
export async function audienceForUser(userId) {
  const [rows] = await pool.query(
    'SELECT university_id AS universityId, year, year_id AS yearId FROM students WHERE user_id = ? LIMIT 1',
    [userId],
  )
  return audienceOf(rows[0] ?? null)
}

export async function searchLibrary({ query, subject, limit = 5 }, audience) {
  const content = await loadStudentContent()
  const tokens = tokenise(query)
  let articles = scoped(content.byKind.get('article') ?? [], audience)
  if (subject) articles = articles.filter((item) => item.subjectId === subject)
  return ranked(articles, tokens, clampLimit(limit), (item) => ({
    title: item.title ?? '',
    topic: item.fields?.Topic ?? '',
    body: plainText(item.articleData, SNIPPET_CHARS * 2),
  })).map((item) => ({
    source: 'library',
    id: item.id,
    title: item.title ?? item.id,
    topic: item.fields?.Topic ?? '',
    text: plainText(item.articleData, SNIPPET_CHARS),
  }))
}

export async function getArticle({ id }, audience) {
  const content = await loadStudentContent()
  const item = content.byId.get(String(id))
  // One answer for "no such article" and for "not this student's": the
  // difference would itself disclose another cohort's catalogue.
  if (!item || item.kind !== 'article' || !inAudience(item, audience)) return null
  return {
    source: 'library',
    id: item.id,
    title: item.title ?? item.id,
    topic: item.fields?.Topic ?? '',
    text: plainText(item.articleData, ARTICLE_CHARS),
  }
}

export async function searchQuestions({ query, subject, limit = 5 }, audience) {
  const content = await loadStudentContent()
  const tokens = tokenise(query)
  let questions = scoped(content.byKind.get('question') ?? [], audience)
  if (subject) questions = questions.filter((item) => item.subjectId === subject)
  return ranked(questions, tokens, clampLimit(limit), (item) => ({
    title: item.title ?? '',
    topic: item.questionData?.tags?.topic ?? item.fields?.Topic ?? '',
    body: plainText(item.questionData?.explanation, SNIPPET_CHARS),
  })).map((item) => ({
    source: 'question',
    id: item.id,
    title: item.title ?? item.id,
    topic: item.questionData?.tags?.topic ?? item.fields?.Topic ?? '',
    text: plainText(item.questionData?.explanation, SNIPPET_CHARS),
  }))
}

function clampLimit(limit) {
  const n = Number(limit)
  return Number.isFinite(n) ? Math.min(Math.max(Math.trunc(n), 1), 8) : 5
}

/** What the providers that can call functions are offered. */
export const TOOL_DEFS = [
  {
    name: 'searchLibrary',
    description: "Search this student's own library articles by keyword. Use it before naming any article or subtopic.",
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Clinical keywords, not a sentence.' },
        subject: { type: 'string', description: 'Optional subject id to narrow to.' },
        limit: { type: 'integer', description: 'How many articles to return, 1-8.' },
      },
      required: ['query'],
    },
  },
  {
    name: 'getArticle',
    description: 'Read one library article in full, by the id a search returned.',
    parameters: {
      type: 'object',
      properties: { id: { type: 'string' } },
      required: ['id'],
    },
  },
  {
    name: 'searchQuestions',
    description: "Search this student's question bank for questions on a topic, with their explanations.",
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        subject: { type: 'string' },
        limit: { type: 'integer' },
      },
      required: ['query'],
    },
  },
]

const RUNNERS = { searchLibrary, getArticle, searchQuestions }

/**
 * Run one tool call. Never throws: a model that calls a tool that does not
 * exist, or passes nonsense, gets told so and tries again rather than taking
 * the whole turn down.
 */
export async function runTool(name, args, audience) {
  const runner = RUNNERS[name]
  if (!runner) return { error: `no such tool: ${name}` }
  try {
    const result = await runner(args && typeof args === 'object' ? args : {}, audience)
    if (result === null) return { error: 'not found' }
    return Array.isArray(result) ? { results: result } : result
  } catch (cause) {
    return { error: String(cause?.message ?? cause).slice(0, 200) }
  }
}

/** Anything that would end the attribute, or the tag, is not an attribute. */
function attr(value) {
  return String(value ?? '').replace(/[<>"]/g, '').slice(0, 120)
}

/**
 * Retrieved material, fenced.
 *
 * The tag is the boundary the system prompt refers to: what is inside it is
 * library text, and the model is told nothing inside it may be obeyed. So the
 * boundary has to hold — an article whose body contains `</context>` would
 * otherwise end the block and have the rest of itself read as prompt. Content
 * authors do not write that on purpose; a question quoting an exam paper that
 * quotes an XML snippet writes it by accident, which is the same problem.
 */
export function contextBlock(entries) {
  return (entries ?? [])
    .map((entry) => {
      const text = String(entry.text ?? '').replace(/<\s*\/?\s*(context|student)\b[^>]*>/gi, ' ')
      return `<context source="${attr(entry.source)}" id="${attr(entry.id)}" title="${attr(entry.title)}">\n${text}\n</context>`
    })
    .join('\n')
}
