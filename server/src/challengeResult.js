/**
 * What a finished challenge says.
 *
 * Kept away from the database because this is the part worth being sure of:
 * a comparison two students will argue about should not depend on how a query
 * happened to order its rows.
 */

export function bothFinished(challenge) {
  return Boolean(challenge?.challengerFinishedAt && challenge?.opponentFinishedAt)
}

function sideFor(userId, answers) {
  const mine = answers.filter((answer) => answer.userId === userId)
  return {
    correct: mine.filter((answer) => answer.correct).length,
    answered: mine.length,
    seconds: mine.reduce((total, answer) => total + (answer.seconds ?? 0), 0),
  }
}

/**
 * Each side's totals, and the per-question split.
 *
 * A question one got and the other missed is the interesting row — it is the
 * thing worth talking about afterwards — so every question is reported, not
 * only the ones somebody answered. Unanswered counts as not correct, because
 * from the paper's point of view that is what it is.
 */
export function headToHead(challenge, answers) {
  const verdict = new Map()
  for (const answer of answers) verdict.set(`${answer.userId}:${answer.questionId}`, Boolean(answer.correct))
  return {
    challenger: sideFor(challenge.challengerId, answers),
    opponent: sideFor(challenge.opponentId, answers),
    questions: challenge.questionIds.map((questionId) => ({
      questionId,
      challengerCorrect: verdict.get(`${challenge.challengerId}:${questionId}`) ?? false,
      opponentCorrect: verdict.get(`${challenge.opponentId}:${questionId}`) ?? false,
    })),
  }
}
