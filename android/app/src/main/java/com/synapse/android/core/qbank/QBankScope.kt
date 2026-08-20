package com.synapse.android.core.qbank

import com.synapse.android.core.model.Question

/** One choosable chapter in the question bank. */
data class ChooserTopic(
    val id: String,
    val title: String,
    val subjectId: String,
    /** Empty for a topic the questions named rather than the library. */
    val subtopicIds: List<String>,
)

/**
 * What a sitting is drawn from.
 *
 * A port of `src/data/qbankScope.ts`. A scope is a set of keys, each either a
 * whole topic (`t:<id>`) or a single subtopic (`s:<id>`), so a student can take
 * a whole chapter or drill into one part of it. The same spelling as the web,
 * so a scope means the same thing on both.
 */
object QBankScope {

    const val QUESTION_TOPIC_PREFIX = "qt:"

    fun topicKey(id: String) = "t:$id"
    fun subtopicKey(id: String) = "s:$id"
    fun isQuestionTopic(id: String) = id.startsWith(QUESTION_TOPIC_PREFIX)

    fun subtopicIds(scope: Set<String>, topics: List<ChooserTopic>): Set<String> {
        val ids = mutableSetOf<String>()
        val wholeTopics = mutableSetOf<String>()
        for (key in scope) when {
            key.startsWith("t:") -> wholeTopics += key.removePrefix("t:")
            key.startsWith("s:") -> ids += key.removePrefix("s:")
        }
        for (topic in topics) if (topic.id in wholeTopics) ids += topic.subtopicIds
        return ids
    }

    /**
     * Narrow a pool to what the scope covers. An empty scope is everything.
     *
     * A whole-topic selection also matches on title, so questions whose library
     * reference happens to differ are still included — without that, a bank
     * whose questions are not cross-referenced to articles comes back empty for
     * a chapter the student can plainly see has questions in it.
     */
    fun questions(
        pool: List<Question>,
        scope: Set<String>,
        topics: List<ChooserTopic>,
    ): List<Question> {
        if (scope.isEmpty()) return pool

        val wanted = subtopicIds(scope, topics)
        // Matches by title, case-insensitively — src/data/qbankScope.ts:47-52.
        // `QuestionProjection` files any question with no topic tag under
        // "General" (usePublishedQuestions.ts:34), so a chooser topic titled
        // "General" — synthesised or from the library — sweeps in every
        // untagged question in the bank. That collision is inherited from the
        // TypeScript on purpose, not a Kotlin bug: the TypeScript is the
        // contract, and a chooser that resolved it differently on Android
        // would give the same student a different question count on their
        // phone than on their laptop.
        val titles = scope
            .filter { it.startsWith("t:") }
            .mapNotNull { key -> topics.firstOrNull { it.id == key.removePrefix("t:") } }
            .map { it.title.lowercase() }
            .toSet()

        return pool.filter { question ->
            question.libraryIds.any { it in wanted } || question.topic.lowercase() in titles
        }
    }

    /**
     * The chapters a student can actually choose from.
     *
     * Ported from `chooserTopics` in `src/data/qbankScope.ts:78`. The library
     * tree is passed in, never imported. Milestone 1 ships no Library, so
     * this is always called with an empty list and every topic returned is
     * synthesised from the questions themselves — which is exactly the case
     * the TypeScript was written for: a bank with questions but no published
     * articles used to offer an empty box.
     *
     * A synthetic topic has no subtopics, and [questions] already resolves a
     * whole-topic selection by title, so it needs no special case there.
     */
    fun chooserTopics(pool: List<Question>, libraryTopics: List<ChooserTopic>): List<ChooserTopic> {
        val covered = libraryTopics.map { it.title.trim().lowercase() }.toSet()
        val extra = LinkedHashMap<String, ChooserTopic>()

        for (question in pool) {
            val title = question.topic.trim()
            if (title.isEmpty()) continue
            val key = "${question.subjectId}::${title.lowercase()}"
            if (title.lowercase() in covered || extra.containsKey(key)) continue
            extra[key] = ChooserTopic(
                id = "$QUESTION_TOPIC_PREFIX$key",
                title = title,
                subjectId = question.subjectId,
                subtopicIds = emptyList(),
            )
        }

        return libraryTopics + extra.values
    }
}
