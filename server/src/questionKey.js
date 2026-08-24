/**
 * How a published question is marked.
 *
 * This is the one place that turns an admin-authored question into the marking
 * key the server scores against, kept apart from the snapshot that caches it so
 * the rule itself can be tested without a database.
 */

/**
 * The marking key for one published question, derived the way the student's
 * own screen derives it.
 *
 * Two details have to match `managedQuestionToStudentQuestion`, or the index a
 * student presses is scored against a different answer than the one they read:
 *
 * The ledger does not put a `correct` flag on an answer. It records the key
 * once, as `questionData.correctAnswer`, a label naming one of the answers.
 * (The practical authoring shape *does* carry a per-answer `correct`, which is
 * the easy thing to reach for here and the wrong one — reaching for it keys
 * every question to -1 and marks every student answer wrong.)
 *
 * And a student is only ever shown the answers that have text, so the index
 * they send counts the filled-in answers. Marking against the unfiltered array
 * would shift the key past every blank left above the correct answer.
 */
export function questionKey(item) {
  const data = item?.questionData
  const answers = (data?.answers ?? []).filter((answer) => answer?.text?.trim())
  const tags = data?.tags ?? {}
  const mainConceptIds = Array.isArray(tags.mainConceptIds) ? tags.mainConceptIds : []
  const conceptIds = Array.isArray(tags.conceptIds) ? tags.conceptIds : []
  return {
    id: item?.id,
    title: item?.title,
    subjectId: item?.subjectId ?? null,
    topic: tags.topic ?? item?.fields?.topic ?? null,
    subtopic: item?.fields?.subtopic ?? null,
    conceptIds: [...new Set([...mainConceptIds, ...conceptIds].filter((id) => typeof id === 'string' && id.trim()))],
    // The index of the correct option, or -1 when no answer carries the key's label.
    correctIndex: answers.findIndex((answer) => answer.label === data?.correctAnswer),
    optionCount: answers.length,
  }
}

/** Build the id-keyed snapshot from a parsed ledger, skipping anything unpublished. */
export function questionKeysFromLedger(ledger) {
  const byId = new Map()
  for (const item of Array.isArray(ledger) ? ledger : []) {
    if (item?.kind !== 'question' || item.status !== 'Published') continue
    byId.set(item.id, questionKey(item))
  }
  return byId
}
