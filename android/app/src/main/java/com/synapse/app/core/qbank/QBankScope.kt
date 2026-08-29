package com.synapse.app.core.qbank

/**
 * One chapter a student can choose to drill, synthesized from the questions
 * themselves rather than from a library tree (this port has no library input
 * to draw on — see the task-3 brief). [subtopicIds] are the question's own
 * [Question.libraryIds] seen under this topic, so a scope can still narrow to
 * "just the questions that cite this one reference" even without a real
 * library chapter tree behind them.
 */
data class TopicNode(
    val id: String,
    val topic: String,
    val subtopicIds: List<String> = emptyList(),
    val questions: List<Question> = emptyList(),
)

/**
 * What a sitting is drawn from.
 *
 * A scope is a set of keys, each either a whole topic (`t:<topicId>`) or a
 * single subtopic (`s:<subtopicId>`), so a student can take a whole chapter or
 * drill into one reference under it. Ported from `src/data/qbankScope.ts` /
 * `QBankScope.swift`, reduced to what this task has to work with: a bare list
 * of [Question]s, with topics synthesized from [Question.topic] rather than
 * supplied by a library.
 */
object QBankScope {

    private const val QUESTION_TOPIC_PREFIX = "qt:"

    fun topicKey(topicId: String): String = "t:$topicId"
    fun subtopicKey(subtopicId: String): String = "s:$subtopicId"

    /**
     * The chapters a student can choose from, grouped by [Question.topic].
     * Order follows first appearance in [questions]; a blank topic is
     * skipped, since there is nothing to name a chooser entry with.
     */
    fun topicsFromQuestions(questions: List<Question>): List<TopicNode> {
        val byTopic = LinkedHashMap<String, MutableList<Question>>()
        for (question in questions) {
            val title = question.topic.trim()
            if (title.isEmpty()) continue
            byTopic.getOrPut(title) { mutableListOf() }.add(question)
        }
        return byTopic.map { (title, grouped) ->
            TopicNode(
                id = "$QUESTION_TOPIC_PREFIX$title",
                topic = title,
                subtopicIds = grouped.flatMap { it.libraryIds }.distinct(),
                questions = grouped,
            )
        }
    }

    /**
     * Narrow the full set of questions to what [scope] covers.
     *
     * An empty scope means nothing has been chosen yet, and returns an empty
     * pool — a sitting can only be built from chapters the student actually
     * ticked. A question is in scope when its own topic's key is selected, or
     * when one of its [Question.libraryIds] is selected as a subtopic.
     */
    fun poolFor(scope: Set<String>, questions: List<Question>): List<Question> {
        if (scope.isEmpty()) return emptyList()

        val selectedTopicIds = scope.mapNotNull { key -> key.takeIf { it.startsWith("t:") }?.removePrefix("t:") }.toSet()
        val selectedSubtopicIds = scope.mapNotNull { key -> key.takeIf { it.startsWith("s:") }?.removePrefix("s:") }.toSet()

        return questions.filter { question ->
            val topicId = "$QUESTION_TOPIC_PREFIX${question.topic.trim()}"
            val topicSelected = topicId in selectedTopicIds
            val subtopicSelected = question.libraryIds.any { it in selectedSubtopicIds }
            topicSelected || subtopicSelected
        }
    }

    /**
     * Tick or untick a whole chapter.
     *
     * Selecting supersedes any finer picks beneath it: having chosen the
     * whole chapter, the subtopics under it are no longer a separate
     * statement, so they are removed from the scope.
     */
    fun toggleTopic(scope: Set<String>, topicId: String, topics: List<TopicNode>): Set<String> {
        val key = topicKey(topicId)
        val next = scope.toMutableSet()
        if (key in next) {
            next.remove(key)
        } else {
            next.add(key)
            topics.firstOrNull { it.id == topicId }?.subtopicIds?.forEach { next.remove(subtopicKey(it)) }
        }
        return next
    }

    /**
     * Tick or untick a subtopic.
     *
     * Unticking one out of a whole-topic selection explodes that selection
     * into its parts, minus this one — otherwise "everything except this"
     * would be unsayable without unticking the chapter and re-ticking each
     * other piece by hand.
     */
    fun toggleSubtopic(scope: Set<String>, topicId: String, subtopicId: String, topics: List<TopicNode>): Set<String> {
        val topicKeyStr = topicKey(topicId)
        val subKeyStr = subtopicKey(subtopicId)
        val next = scope.toMutableSet()

        when {
            topicKeyStr in next -> {
                next.remove(topicKeyStr)
                topics.firstOrNull { it.id == topicId }?.subtopicIds?.forEach { other ->
                    if (other != subtopicId) next.add(subtopicKey(other))
                }
            }
            subKeyStr in next -> next.remove(subKeyStr)
            else -> next.add(subKeyStr)
        }
        return next
    }
}
