/** Read the question ids frozen into a collaborative session record. */
export function frozenQuestionIds(raw, { party = false } = {}) {
  try {
    const values = typeof raw === 'string' ? JSON.parse(raw) : raw
    if (!Array.isArray(values)) return null
    return values
      .filter((entry) => !party || entry?.kind === 'question')
      .map((entry) => String(party ? entry?.id ?? '' : entry ?? '').trim())
      .filter(Boolean)
  } catch {
    return null
  }
}

/** Count sessions whose frozen paper intersects the archive's exact targets. */
export function affectedSessionRows(rows, field, targetQuestionIds = null, options) {
  const targetIds = targetQuestionIds instanceof Set ? targetQuestionIds : null
  return rows.reduce((count, row) => {
    const ids = frozenQuestionIds(row[field], options)
    // A malformed frozen paper is conservatively treated as affected.
    if (ids === null) return count + 1
    if (!targetIds) return count + (ids.length ? 1 : 0)
    return count + (ids.some((id) => targetIds.has(id)) ? 1 : 0)
  }, 0)
}

/** Freeze the exact session identities represented by the preflight counts. */
export function affectedSessionIds(rows, field, targetQuestionIds = null, options) {
  const targetIds = targetQuestionIds instanceof Set ? targetQuestionIds : null
  return rows.flatMap((row) => {
    const ids = frozenQuestionIds(row[field], options)
    const affected = ids === null || (!targetIds ? ids.length > 0 : ids.some((id) => targetIds.has(id)))
    return affected ? [String(row.id ?? '').trim()] : []
  }).filter(Boolean).sort()
}

const SESSION_KINDS = ['studyRooms', 'challenges', 'partyQuestionSessions']

/** An acknowledgement applies only to the exact frozen set the admin reviewed. */
export function affectedSessionSetsMatch(expected, current) {
  return SESSION_KINDS.every((kind) => {
    const left = Array.isArray(expected?.[kind]) ? [...new Set(expected[kind].map(String))].sort() : null
    const right = Array.isArray(current?.[kind]) ? [...new Set(current[kind].map(String))].sort() : null
    return left !== null && right !== null && left.length === right.length && left.every((id, index) => id === right[index])
  })
}
