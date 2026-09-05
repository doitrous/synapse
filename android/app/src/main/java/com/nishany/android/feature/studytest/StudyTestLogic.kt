package com.nishany.android.feature.studytest

import com.nishany.android.core.model.Question
import com.nishany.android.core.model.StudyRoom

/**
 * The pure rules behind [StudyTestViewModel] -- the parts of iOS's
 * `StudyRoomModel` (`ios/Nishany/Core/StudyTogether/StudyRoomModel.swift`)
 * that do not touch the network, split out so a JVM unit test can exercise
 * them with no Android framework and no fake API.
 */
internal object StudyTestLogic {

    /**
     * Where to resume in [questions]: the first one not yet in [answeredIds],
     * or the last question when every one of them has been answered (so a
     * fully-answered room still lands somewhere sittable, on the last
     * question, rather than off the end of the list).
     *
     * Mirrors `StudyRoomModel.loadQuestions`'s `firstIndex { !answered.contains($0.id) } ?? max(0, questions.count - 1)`.
     */
    fun currentIndex(questions: List<Question>, answeredIds: Set<String>): Int {
        if (questions.isEmpty()) return 0
        val firstUnanswered = questions.indexOfFirst { it.id !in answeredIds }
        return if (firstUnanswered >= 0) firstUnanswered else questions.size - 1
    }

    /** One answered question, ready to be read back -- the Android peer of iOS's `StudyRoomModel.Reviewed`. */
    data class Reviewed(val question: Question, val answer: StudyRoom.Answer) {
        /** Which option was the right one, read from the published question -- not from the sitting itself, see the class doc. */
        val correctIndex: Int?
            get() = question.options.indexOfFirst { it.label == question.correctLabel }.takeIf { it >= 0 }

        /**
         * Whether the student actually chose something. Handing in leaves
         * anything untouched recorded as not correct with no option behind
         * it -- a different thing from choosing badly, so the review screen
         * must say "not answered", not "wrong".
         */
        val wasAnswered: Boolean get() = answer.chosenIndex in question.options.indices
    }

    /**
     * The sitting, in the order the room set it. The verdict comes from
     * [StudyRoom.Answer.correct] -- the server's own record of what was
     * answered; only *which* option is correct is read from the published
     * [Question], the same split the solo bank's own review uses so a
     * question edited since the sitting cannot retroactively change whether
     * an answer was marked right.
     *
     * A question id the room names but [questions] does not carry (not
     * synced, or filed under another cohort) is skipped, exactly like an
     * answer with no matching question id -- both are "cannot review this
     * one", not a crash.
     */
    fun reviewed(room: StudyRoom, questions: List<Question>): List<Reviewed> {
        val byId = questions.associateBy { it.id }
        val answersById = room.myAnswers.associateBy { it.questionId }
        return room.questionIds.mapNotNull { id ->
            val question = byId[id] ?: return@mapNotNull null
            val answer = answersById[id] ?: return@mapNotNull null
            Reviewed(question, answer)
        }
    }

    /** Which of the room's three screens to show. */
    enum class Phase { LOBBY, RUNNING, RESULTS }

    fun phase(room: StudyRoom): Phase = when {
        room.isLobby -> Phase.LOBBY
        room.myFinished -> Phase.RESULTS
        else -> Phase.RUNNING
    }
}
