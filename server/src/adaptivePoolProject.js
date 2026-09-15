/**
 * The adaptive-pool projection — pure, so both `adaptivePool.js` (which serves
 * it) and the client parity test (`src/data/adaptive/adaptivePool.parity.test.ts`,
 * which proves it matches the client gate) import it without the db pool.
 *
 * Adaptive Setup reads the whole approved question bank only to count concepts:
 * pool health per blueprint node, the held-out reserve, and which items fall in
 * a chosen scope. It never renders a stem there. So this projects a question to
 * the handful of fields those maths read — a faithful, deliberately small copy
 * of the client's `managedQuestionToStudentQuestion` null-conditions followed by
 * `adaptiveItemFrom`'s concept/scope fields. The parity test locks the two.
 */
import { collectMediaRequests } from './mediaRequestPolicy.js'

/** Mirrors `blockingMediaRequests`: a required request with no supplied media. */
function hasBlockingMediaRequest(item) {
  for (const request of collectMediaRequests(item).values()) {
    if (request?.priority === 'required' && (request.status !== 'supplied' || !String(request.mediaId ?? '').trim())) {
      return true
    }
  }
  return false
}

/**
 * One approved question → its adaptive pool row, or null when it is not eligible
 * to be asked. The null-conditions are exactly the client gate's: a published
 * question with no blocking media request, real question data, at least two
 * answered options, and a correct one among them.
 */
export function adaptivePoolItem(item) {
  if (!item || item.kind !== 'question' || item.status !== 'Published') return null
  const data = item.questionData
  if (!data || !Array.isArray(data.answers)) return null
  if (hasBlockingMediaRequest(item)) return null
  const answers = data.answers.filter((answer) => answer && typeof answer.text === 'string' && answer.text.trim())
  if (answers.length < 2 || !answers.some((answer) => answer.label === data.correctAnswer)) return null

  const tags = data.tags ?? {}
  // A concept tagged as main is never also counted as secondary — the same
  // double-count guard `adaptiveItemFrom` applies.
  const main = [...new Set(tags.mainConceptIds ?? [])]
  const secondary = [...new Set(tags.conceptIds ?? [])].filter((id) => !main.includes(id))
  return {
    id: item.id,
    mainConceptIds: main,
    secondaryConceptIds: secondary,
    conceptIds: [...main, ...secondary],
    universityIds: Array.isArray(tags.universityIds) ? tags.universityIds : [],
    years: Array.isArray(tags.years) ? tags.years : [],
    onlyFor: Array.isArray(tags.questionOnlyFor) ? tags.questionOnlyFor : [],
    moduleIds: [...new Set([...(tags.moduleIds ?? []), ...(tags.module ? [tags.module] : [])])],
  }
}
