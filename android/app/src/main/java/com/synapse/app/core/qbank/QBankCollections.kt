package com.synapse.app.core.qbank

/** Session id -> the question ids that sitting served, in the order it served them. */
typealias SessionManifests = Map<String, List<String>>

/**
 * The questions a student can come back to: Flagged, Got wrong (incorrect), and
 * Omitted, plus the "Previous tests" list. Ported from `src/data/qbankCollections.ts`
 * and (for [bySession]) `src/data/attemptStats.ts`.
 *
 * One difference from the web port, forced by how [AttemptRecord] is written on
 * Android: [SessionViewModel][com.synapse.app.feature.qbank.SessionViewModel.finish]
 * writes one record per question in the sitting, whether it was answered or not —
 * an unanswered question's [AttemptRecord.correct] is `false`, never `null` (see
 * [QBankSession.finish]). Web's port instead skips a record with `correct === null`
 * to keep an unmarked/skipped station out of the wrong list. Android has no such
 * `null` to key off, so every function here gates on [AttemptRecord.selectedIndex]
 * being non-null instead — "was an option actually picked" rather than "was this
 * marked" — which is the same distinction web's `correct === null` check exists to
 * draw, just recovered from the field Android actually has.
 */
object QBankCollections {

    /** The surfaces whose records count as sitting a question from the bank. */
    private val QUESTION_SURFACES = setOf("qbank", "room")

    /**
     * How many sittings a manifest map keeps. Written only when a sitting begins
     * or a test is deleted — never per answer — so the bound is set high enough
     * that no real student reaches it.
     */
    const val MAX_STORED_SITTINGS = 600

    /**
     * The most recent verdict per question, among records that actually carry one
     * — see the class doc for why that is [AttemptRecord.selectedIndex] rather
     * than a null [AttemptRecord.correct].
     */
    fun latestVerdicts(records: List<AttemptRecord>): Map<String, Boolean> {
        data class Seen(val at: String, val correct: Boolean)
        val latest = HashMap<String, Seen>()
        for (record in records) {
            if (record.surface !in QUESTION_SURFACES || record.selectedIndex == null) continue
            val seen = latest[record.itemId]
            if (seen != null && seen.at >= record.at) continue
            latest[record.itemId] = Seen(record.at, record.correct == true)
        }
        return latest.mapValues { it.value.correct }
    }

    /** Questions whose latest verdict was wrong. Getting one right takes it out of this set. */
    fun incorrectIds(records: List<AttemptRecord>): Set<String> =
        latestVerdicts(records).filterValues { !it }.keys

    /**
     * Served by a sitting, and never actually answered anywhere since.
     *
     * A question the student has picked an option for at any point has engaged
     * with it, so it leaves this set whichever sitting the pick belongs to.
     */
    fun omittedIds(manifests: SessionManifests, records: List<AttemptRecord>): Set<String> {
        val answered = records
            .filter { it.surface in QUESTION_SURFACES && it.selectedIndex != null }
            .map { it.itemId }
            .toSet()
        return manifests.values.flatten().filterNot { it in answered }.toSet()
    }

    /** The manifests of sittings that are over — excludes [openSessionId], if any, from [manifests]. */
    fun finishedManifests(manifests: SessionManifests, openSessionId: String?): SessionManifests =
        if (openSessionId == null) manifests else manifests - openSessionId

    /** The published questions behind a set of ids, in pool order. */
    fun questionsById(pool: List<Question>, ids: Set<String>): List<Question> =
        pool.filter { it.id in ids }

    /**
     * The scope a set of questions implies — the topics they came from, not the
     * questions themselves, so "Test this scope" also offers material the student
     * has not seen.
     *
     * Simpler than web's port: [QBankScope.topicsFromQuestions] synthesizes
     * [topics] straight from the question set (there is no separate library tree
     * to cross-reference — see [QBankScope]'s doc comment), so every question's
     * topic is already one of [topics] by construction. A question naming a topic
     * outside [topics] (defensively handled, as web's port is) contributes
     * nothing.
     */
    fun scopeFromQuestions(questions: List<Question>, topics: List<TopicNode>): Set<String> {
        val topicIdByTitle = topics.associate { it.topic to it.id }
        return questions
            .mapNotNull { topicIdByTitle[it.topic.trim()] }
            .map(QBankScope::topicKey)
            .toSet()
    }

    /** Keep the newest [limit] sittings; returns [manifests] untouched when already within it. */
    fun pruneManifests(manifests: SessionManifests, limit: Int = MAX_STORED_SITTINGS): SessionManifests {
        if (manifests.size <= limit) return manifests
        return manifests.entries.toList().takeLast(limit).associate { it.key to it.value }
    }

    /** One finished sitting, reconstructed from the attempt records it produced. */
    data class SessionSummary(
        val sessionId: String,
        /** When the first answer in the sitting was recorded. */
        val startedAt: String,
        /** When the last one was. */
        val endedAt: String,
        val answered: Int,
        /** Answers actually picked — a crossed-out/never-touched station says nothing about correctness. */
        val marked: Int,
        val correct: Int,
        val accuracy: Double?,
        /** Distinct subjects covered, most-answered first. */
        val subjectIds: List<String>,
    )

    /** Group the attempt log into sittings, newest first. */
    fun bySession(records: List<AttemptRecord>): List<SessionSummary> {
        val groups = LinkedHashMap<String, MutableList<AttemptRecord>>()
        for (record in records) {
            if (record.sessionId.isBlank()) continue
            groups.getOrPut(record.sessionId) { mutableListOf() }.add(record)
        }
        return groups.map { (sessionId, group) ->
            val times = group.map { it.at }.sorted()
            val marked = group.filter { it.selectedIndex != null }
            val correct = marked.count { it.correct == true }
            val bySubject = group.groupingBy { it.subjectId }.eachCount()
            SessionSummary(
                sessionId = sessionId,
                startedAt = times.first(),
                endedAt = times.last(),
                answered = group.size,
                marked = marked.size,
                correct = correct,
                accuracy = if (marked.isNotEmpty()) correct.toDouble() / marked.size else null,
                subjectIds = bySubject.entries.sortedByDescending { it.value }.map { it.key },
            )
        }.sortedByDescending { it.startedAt }
    }

    /**
     * A synthetic, already-graded result built from the freshest attempt on
     * record for each of [questions] — lets a Collection (Flagged/Got
     * wrong/Omitted) be previewed through [com.synapse.app.feature.qbank.ResultsScreen]
     * without a live sitting. A question with no picked-and-recorded attempt shows
     * as unanswered, the same way [QBankSession.finish] represents one.
     */
    fun latestResultFor(questions: List<Question>, records: List<AttemptRecord>): QBankSessionResult =
        buildResult(questions) { question -> latestPick(question.id, records) }

    /** The result of one specific finished sitting, from its own attempt records only. */
    fun sessionResult(sessionId: String, questions: List<Question>, records: List<AttemptRecord>): QBankSessionResult {
        val own = records.filter { it.sessionId == sessionId }
        return buildResult(questions) { question -> latestPick(question.id, own) }
    }

    private fun latestPick(itemId: String, records: List<AttemptRecord>): AttemptRecord? =
        records
            .filter { it.itemId == itemId && it.surface in QUESTION_SURFACES && it.selectedIndex != null }
            .maxByOrNull { it.at }

    private fun buildResult(questions: List<Question>, pickFor: (Question) -> AttemptRecord?): QBankSessionResult {
        val perQuestion = questions.map { question ->
            val pickedLabel = pickFor(question)?.selectedIndex?.let { index -> question.options.getOrNull(index)?.label }
            QBankQuestionResult(
                questionId = question.id,
                pickedLabel = pickedLabel,
                correct = pickedLabel != null && question.isCorrect(pickedLabel),
            )
        }
        return QBankSessionResult(
            correct = perQuestion.count { it.correct },
            total = perQuestion.size,
            perQuestion = perQuestion,
        )
    }
}
