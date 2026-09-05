package com.nishany.android.core.model

/**
 * A shared test, as the server describes it -- the `/api/study-rooms` routes
 * (`server/src/studyRooms.js`). The Android peer of iOS's `StudyRoom`
 * (`ios/Nishany/Core/Model/StudyRoom.swift`).
 *
 * This is a separate system from the voice study rooms
 * ([com.nishany.android.core.rooms], the `/api/parties` routes + the room
 * socket) -- same "study room" name, unrelated server tables and unrelated
 * screens. Two
 * of this shape's rules are load-bearing and are the reason fields below are
 * nullable/empty rather than always populated:
 *
 * - [questionIds] is empty while the room is in the lobby, so nobody can read
 *   ahead before everyone has joined;
 * - another member's [Member.correct] is null until results open, so nobody
 *   watches a friend's score climb while they are still sitting it.
 */
data class StudyRoom(
    val id: String,
    val code: String,
    val name: String,
    val isHost: Boolean,
    /** `"lobby"`, `"running"`, or `"closed"`. */
    val status: String,
    val timed: Boolean,
    val secondsPerQuestion: Int?,
    val questionCount: Int,
    /** Empty in the lobby, by design. */
    val questionIds: List<String>,
    val resultsOpen: Boolean,
    val members: List<Member>,
    val myAnswers: List<Answer>,
    val myFinished: Boolean,
) {
    data class Member(
        val userId: String,
        val displayName: String?,
        val finished: Boolean,
        val answered: Int,
        /** Null until results open, for everyone but yourself. */
        val correct: Int?,
    ) {
        val name: String get() = displayName?.takeIf { it.isNotBlank() } ?: "Student"
    }

    data class Answer(
        val questionId: String,
        val chosenIndex: Int,
        val correct: Boolean,
    )

    val isLobby: Boolean get() = status == "lobby"
    val answeredIds: Set<String> get() = myAnswers.map { it.questionId }.toSet()
}

/** A room in the student's list -- `GET /api/study-rooms/mine`'s `rooms`. */
data class RoomSummary(
    val id: String,
    val code: String,
    val name: String,
    val status: String,
    val questionCount: Int,
)

/**
 * What every mutating room call answers with.
 *
 * The server reports refusals as `{ ok: false, reason }` rather than as HTTP
 * errors, so a caller that only checks the status code would treat "that
 * code does not exist" as success. [room] is absent on `submitAnswer`'s
 * success shape (`{ ok: true, correct, correctIndex }`) -- callers that need
 * the fresh room re-fetch it, matching iOS's own `answer` (it reloads
 * separately rather than reading `result.room`).
 */
data class RoomMutation(
    val ok: Boolean?,
    val reason: String?,
    val room: StudyRoom?,
    val id: String?,
) {
    val succeeded: Boolean get() = ok != false

    /** The refusal in words a student can act on. */
    val message: String?
        get() {
            if (ok != false || reason == null) return null
            return when (reason) {
                "no_questions" -> "Pick at least one question first."
                "not_found" -> "No room with that code."
                "already_started" -> "That test has already started."
                "not_started" -> "The host has not started it yet."
                "not_a_member" -> "You are not in that room."
                "already_finished" -> "You have already finished this one."
                "not_in_room" -> "That question is not part of this test."
                "not_host" -> "Only the host can start it."
                else -> "That did not work."
            }
        }
}
