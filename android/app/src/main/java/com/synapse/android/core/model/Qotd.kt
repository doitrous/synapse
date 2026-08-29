package com.synapse.android.core.model

/**
 * Wire types for the Question-of-the-Day endpoints (`/api/qotd/*`).
 *
 * The question BODY is deliberately absent: `today` names the day's
 * `questionId`, and the app resolves the question from the local published
 * ledger by that id via [QuestionProjection], exactly as the question bank does.
 * `date`/`history` are calendar dates (`YYYY-MM-DD`), kept as strings.
 */

/** `GET /api/qotd/today` */
data class QotdToday(
    val date: String,
    val questionId: String?,
    val answered: Boolean,
    val answerIndex: Int?,
    val correct: Boolean?,
    val current: Int,
    val longest: Int,
    val history: List<String>,
)

/**
 * `POST /api/qotd/answer` result. `correctIndex` is a position in the question's
 * option list (blank options dropped, the same order the server marks against),
 * not a label — map it with `question.options[correctIndex].label`.
 */
data class QotdAnswerResult(
    val correct: Boolean,
    val correctIndex: Int,
    val current: Int,
    val longest: Int,
)

/** `GET /api/qotd/leaderboard` */
data class QotdLeaderboard(
    val scope: Scope,
    val rows: List<Row>,
    val viewer: Viewer,
) {
    data class Scope(val universityId: String, val year: String)

    data class Row(
        val rank: Int,
        val userId: String,
        val username: String,
        val profileIcon: String?,
        val current: Int,
        val totalCorrect: Int,
        val totalAnswered: Int,
    )

    data class Viewer(val rank: Int?, val total: Int, val current: Int)
}

/** `GET /api/qotd/friends` */
data class QotdFriends(
    val date: String,
    val viewerAnswered: Boolean,
    val friends: List<Friend>,
) {
    /** `correct` is null until the viewer has answered today — no spoilers. */
    data class Friend(
        val userId: String,
        val name: String,
        val answered: Boolean,
        val correct: Boolean?,
    )
}
