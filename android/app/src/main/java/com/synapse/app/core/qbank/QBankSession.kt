package com.synapse.app.core.qbank

import kotlin.random.Random

/**
 * A resumable snapshot of a [QBankSession].
 *
 * A port of `LiveSession` in `QBankSession.swift` / `QuestionBank.tsx`.
 * Answers are stored as the chosen option's **index**, not its label, so a
 * resumed sitting survives a reshuffle or relabelling of the question's
 * options between snapshot and resume — [QBankSession.snapshot] and
 * [QBankSession.resume] are what convert between the label the engine works
 * with and the index this record carries.
 */
data class LiveSession(
    val questionIds: List<String>,
    val mode: QBankSession.Mode,
    /** Question id -> the index of the chosen option. */
    val answers: Map<String, Int>,
    /** Question ids the student has committed to. */
    val checked: Set<String>,
    /** Indices actually looked at. */
    val visited: Set<Int>,
    /** Question id -> seconds spent on it. */
    val spent: Map<String, Int>,
)

/**
 * One question's outcome once a sitting is over.
 */
data class QBankQuestionResult(
    val questionId: String,
    val pickedLabel: String?,
    val correct: Boolean,
)

/** The grade for a finished sitting. */
data class QBankSessionResult(
    val correct: Int,
    val total: Int,
    val perQuestion: List<QBankQuestionResult>,
)

/**
 * A sitting of the question bank: a fixed, shuffled slice of a pool plus the
 * mutable state a student accumulates while working through it.
 *
 * A port of the running half of `QuestionBankModel.swift`, reduced to pure
 * state — no storage, no clock, no networking. [Mode] decides when a picked
 * answer is graded: [Mode.Tutor] reveals as soon as [check] is called;
 * [Mode.Timed] defers every grade to [finish], so a student can freely change
 * their mind up to that point.
 */
class QBankSession private constructor(
    /** The questions in this sitting, in the fixed order they were drawn. */
    val questions: List<Question>,
    val mode: Mode,
) {

    enum class Mode { Tutor, Timed }

    /**
     * Where a question stands, for the navigator. `Omitted` is deliberately
     * distinct from `Unseen`: it is a question the student reached, left
     * unanswered, and moved past — worth returning to before finishing,
     * unlike one never reached at all.
     */
    enum class NavState { Unseen, Answered, Correct, Wrong, Omitted }

    /** Question id -> the option label chosen. Irrevocable once [checked]. */
    val picked: MutableMap<String, String> = mutableMapOf()

    /** Question ids the student has committed to. */
    val checked: MutableSet<String> = mutableSetOf()

    /** Indices actually looked at (so the navigator can tell omitted from unseen). */
    val visited: MutableSet<Int> = mutableSetOf()

    /** Question id -> seconds spent on it. */
    val spent: MutableMap<String, Int> = mutableMapOf()

    /**
     * Commit to the choice already made for [index]. A no-op once that
     * question is [checked] — a question re-answerable after being checked
     * would teach nothing and make the accuracy figure a fiction.
     */
    fun pick(index: Int, label: String) {
        val question = questions.getOrNull(index) ?: return
        if (question.id in checked) return
        picked[question.id] = label
    }

    /**
     * Commit to the answer at [index].
     *
     * In [Mode.Tutor] this locks the pick in immediately and marks it graded,
     * revealing right/wrong. In [Mode.Timed] this is deferred: nothing is
     * marked [checked] here, so the pick stays revocable and ungraded until
     * [finish] grades every remaining answered question at once.
     */
    fun check(index: Int) {
        if (mode != Mode.Tutor) return
        val question = questions.getOrNull(index) ?: return
        if (question.id in checked) return
        if (question.id !in picked) return
        checked.add(question.id)
    }

    /**
     * Where question [index] stands, given the student is currently looking
     * at [currentIndex]:
     * - `Unseen` — never visited (or visited but still the one on screen,
     *   unanswered — that is not yet "left behind").
     * - `Correct` / `Wrong` — checked, graded against [Question.isCorrect].
     * - `Answered` — picked but not yet checked.
     * - `Omitted` — visited, still unanswered, and no longer the one on screen.
     */
    fun navState(index: Int, currentIndex: Int): NavState {
        val question = questions.getOrNull(index) ?: return NavState.Unseen
        if (index !in visited) return NavState.Unseen

        val label = picked[question.id]
        if (label == null) {
            return if (index != currentIndex) NavState.Omitted else NavState.Unseen
        }
        if (question.id !in checked) return NavState.Answered
        return if (question.isCorrect(label)) NavState.Correct else NavState.Wrong
    }

    /**
     * End the sitting and grade it.
     *
     * In [Mode.Timed], every answered-but-unchecked question is graded here —
     * this is what "answers come at the end" means, and it is why an answer
     * never explicitly [check]ed during play still counts.
     */
    fun finish(): QBankSessionResult {
        if (mode != Mode.Tutor) {
            for (question in questions) {
                if (question.id in checked) continue
                if (question.id in picked) checked.add(question.id)
            }
        }

        val perQuestion = questions.map { question ->
            val label = picked[question.id]
            QBankQuestionResult(
                questionId = question.id,
                pickedLabel = label,
                correct = label != null && question.isCorrect(label),
            )
        }
        return QBankSessionResult(
            correct = perQuestion.count { it.correct },
            total = questions.size,
            perQuestion = perQuestion,
        )
    }

    /**
     * This sitting as a resumable record. Answers are converted from the
     * label the engine holds to the option's current index, per [LiveSession].
     */
    fun snapshot(): LiveSession {
        val byId = questions.associateBy { it.id }
        val answers = picked.mapNotNull { (questionId, label) ->
            val question = byId[questionId] ?: return@mapNotNull null
            val position = question.options.indexOfFirst { it.label == label }
            if (position < 0) null else questionId to position
        }.toMap()

        return LiveSession(
            questionIds = questions.map { it.id },
            mode = mode,
            answers = answers,
            checked = checked.toSet(),
            visited = visited.toSet(),
            spent = spent.toMap(),
        )
    }

    companion object {

        /**
         * Build a new sitting: shuffle [pool] deterministically under [seed]
         * and take the first [length]. The same [seed] over the same [pool]
         * always yields the same order.
         */
        fun start(pool: List<Question>, length: Int, mode: Mode, seed: Long): QBankSession {
            val shuffled = pool.shuffled(Random(seed))
            val session = QBankSession(shuffled.take(length.coerceAtLeast(0)), mode)
            if (session.questions.isNotEmpty()) session.visited.add(0)
            return session
        }

        /**
         * Put a sitting saved elsewhere back on screen, against the current
         * [pool]. [LiveSession.answers] are indices; they are looked up
         * against each question's *current* [Question.options] to recover a
         * label, so a resumed sitting survives a reshuffle or relabelling of
         * the options that happened between [snapshot] and this call.
         *
         * Returns null if a question referenced by the sitting is no longer
         * in [pool] — a shortened sitting would silently misscore.
         */
        fun resume(live: LiveSession, pool: List<Question>): QBankSession? {
            val byId = pool.associateBy { it.id }
            val restored = live.questionIds.map { byId[it] ?: return null }

            val session = QBankSession(restored, live.mode)
            for ((questionId, index) in live.answers) {
                val question = byId[questionId] ?: continue
                val label = question.options.getOrNull(index)?.label ?: continue
                session.picked[questionId] = label
            }
            session.checked.addAll(live.checked)
            session.visited.addAll(live.visited)
            session.spent.putAll(live.spent)
            return session
        }
    }
}
