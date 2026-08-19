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
        val titles = scope
            .filter { it.startsWith("t:") }
            .mapNotNull { key -> topics.firstOrNull { it.id == key.removePrefix("t:") } }
            .map { it.title.lowercase() }
            .toSet()

        return pool.filter { question ->
            question.libraryIds.any { it in wanted } || question.topic.lowercase() in titles
        }
    }
}
