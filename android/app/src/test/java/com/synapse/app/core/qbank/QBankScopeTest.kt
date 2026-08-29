package com.synapse.app.core.qbank

import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Task 3 (Plan 03 — Question Bank): the scope tree.
 *
 * A scope is a `Set<String>` of `"t:<topicId>"` / `"s:<topicId>:<subtopicId>"`
 * keys. [QBankScope.topicsFromQuestions] synthesizes the chooser tree straight
 * from the bank (no library input in this task); [QBankScope.poolFor] narrows a
 * pool to what a scope covers; `toggleTopic` / `toggleSubtopic` carry the
 * supersede/explode rules a chooser UI needs. Subtopic keys are topic-namespaced
 * so a shared libraryId can't leak questions across topics.
 */
class QBankScopeTest {

    private fun question(
        id: String,
        topic: String,
        libraryIds: List<String> = emptyList(),
        correctLabel: String = "A",
    ) = Question(
        id = id,
        subjectId = "SYS_CVS",
        topic = topic,
        vignette = "A patient presents...",
        stem = "Which is true?",
        options = listOf(
            AnswerOption("A", "Option A", "Because A"),
            AnswerOption("B", "Option B", "Because B"),
        ),
        correctLabel = correctLabel,
        explanation = "Explained.",
        libraryIds = libraryIds,
    )

    // MARK: - topicsFromQuestions

    @Test
    fun `topicsFromQuestions groups by topic and synthesizes qt colon ids`() {
        val q1 = question("Q1", topic = "Heart failure")
        val q2 = question("Q2", topic = "Heart failure")
        val q3 = question("Q3", topic = "Arrhythmia")

        val topics = QBankScope.topicsFromQuestions(listOf(q1, q2, q3))

        assertEquals(2, topics.size)
        val heartFailure = topics.first { it.topic == "Heart failure" }
        assertEquals("qt:Heart failure", heartFailure.id)
        assertEquals(listOf(q1, q2), heartFailure.questions)
        val arrhythmia = topics.first { it.topic == "Arrhythmia" }
        assertEquals("qt:Arrhythmia", arrhythmia.id)
        assertEquals(listOf(q3), arrhythmia.questions)
    }

    @Test
    fun `topicsFromQuestions collects distinct libraryIds as subtopicIds`() {
        val q1 = question("Q1", topic = "Heart failure", libraryIds = listOf("hf-patho"))
        val q2 = question("Q2", topic = "Heart failure", libraryIds = listOf("hf-patho", "hf-tx"))

        val topics = QBankScope.topicsFromQuestions(listOf(q1, q2))

        assertEquals(listOf("hf-patho", "hf-tx"), topics.single().subtopicIds)
    }

    @Test
    fun `topicsFromQuestions skips blank topics`() {
        val blank = question("Q1", topic = "   ")
        val named = question("Q2", topic = "Arrhythmia")

        val topics = QBankScope.topicsFromQuestions(listOf(blank, named))

        assertEquals(1, topics.size)
        assertEquals("Arrhythmia", topics.single().topic)
    }

    // MARK: - poolFor

    @Test
    fun `poolFor empty scope is an empty pool`() {
        val q1 = question("Q1", topic = "Heart failure")

        assertTrue(QBankScope.poolFor(emptySet(), listOf(q1)).isEmpty())
    }

    @Test
    fun `poolFor a whole-topic key includes every question with that topic`() {
        val q1 = question("Q1", topic = "Heart failure")
        val q2 = question("Q2", topic = "Heart failure")
        val other = question("Q3", topic = "Arrhythmia")

        val pool = QBankScope.poolFor(setOf("t:qt:Heart failure"), listOf(q1, q2, other))

        assertEquals(listOf(q1, q2), pool)
    }

    @Test
    fun `poolFor a subtopic key includes only questions citing that libraryId`() {
        val cited = question("Q1", topic = "Heart failure", libraryIds = listOf("hf-patho"))
        val uncited = question("Q2", topic = "Heart failure", libraryIds = listOf("hf-tx"))

        val pool = QBankScope.poolFor(setOf(QBankScope.subtopicKey("qt:Heart failure", "hf-patho")), listOf(cited, uncited))

        assertEquals(listOf(cited), pool)
    }

    @Test
    fun `poolFor a subtopic does not leak questions from another topic sharing the libraryId`() {
        // Both topics cite the SAME libraryId — the exact cross-topic collision the
        // topic-namespaced subtopic keys exist to prevent.
        val hf = question("Q1", topic = "Heart failure", libraryIds = listOf("shared-ref"))
        val arr = question("Q2", topic = "Arrhythmia", libraryIds = listOf("shared-ref"))

        // Tick "shared-ref" only under Heart failure.
        val scope = setOf(QBankScope.subtopicKey("qt:Heart failure", "shared-ref"))
        val pool = QBankScope.poolFor(scope, listOf(hf, arr))

        assertEquals(listOf(hf), pool) // Arrhythmia's question is NOT pulled in.
    }

    @Test
    fun `poolFor a topic the pool does not contain yields nothing`() {
        val q1 = question("Q1", topic = "Heart failure")

        assertTrue(QBankScope.poolFor(setOf("t:qt:Nephrology"), listOf(q1)).isEmpty())
    }

    // MARK: - toggleTopic (supersede)

    @Test
    fun `toggleTopic selects the whole chapter and clears finer picks beneath it`() {
        val q1 = question("Q1", topic = "Heart failure", libraryIds = listOf("hf-patho", "hf-tx"))
        val topics = QBankScope.topicsFromQuestions(listOf(q1))
        val topicId = topics.single().id

        val startingScope = setOf(QBankScope.subtopicKey(topicId, "hf-patho"))
        val next = QBankScope.toggleTopic(startingScope, topicId, topics)

        assertEquals(setOf(QBankScope.topicKey(topicId)), next)
    }

    @Test
    fun `toggleTopic unticks an already-selected chapter`() {
        val q1 = question("Q1", topic = "Heart failure")
        val topics = QBankScope.topicsFromQuestions(listOf(q1))
        val topicId = topics.single().id
        val scope = setOf(QBankScope.topicKey(topicId))

        val next = QBankScope.toggleTopic(scope, topicId, topics)

        assertTrue(next.isEmpty())
    }

    // MARK: - toggleSubtopic (explode)

    @Test
    fun `toggleSubtopic explodes a whole-topic pick into its other subtopics`() {
        val q1 = question("Q1", topic = "Heart failure", libraryIds = listOf("hf-patho", "hf-tx", "hf-dx"))
        val topics = QBankScope.topicsFromQuestions(listOf(q1))
        val topicId = topics.single().id
        val scope = setOf(QBankScope.topicKey(topicId))

        val next = QBankScope.toggleSubtopic(scope, topicId, "hf-patho", topics)

        assertEquals(
            setOf(QBankScope.subtopicKey(topicId, "hf-tx"), QBankScope.subtopicKey(topicId, "hf-dx")),
            next,
        )
        assertFalse(QBankScope.topicKey(topicId) in next)
        assertFalse(QBankScope.subtopicKey(topicId, "hf-patho") in next)
    }

    @Test
    fun `toggleSubtopic ticks and unticks a bare subtopic`() {
        val q1 = question("Q1", topic = "Heart failure", libraryIds = listOf("hf-patho", "hf-tx"))
        val topics = QBankScope.topicsFromQuestions(listOf(q1))
        val topicId = topics.single().id

        val ticked = QBankScope.toggleSubtopic(emptySet(), topicId, "hf-patho", topics)
        assertEquals(setOf(QBankScope.subtopicKey(topicId, "hf-patho")), ticked)

        val unticked = QBankScope.toggleSubtopic(ticked, topicId, "hf-patho", topics)
        assertTrue(unticked.isEmpty())
    }
}
