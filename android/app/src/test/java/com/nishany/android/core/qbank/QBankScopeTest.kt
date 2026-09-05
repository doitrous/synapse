package com.nishany.android.core.qbank

import com.nishany.android.core.model.Question
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class QBankScopeTest {

    private val cardiology = ChooserTopic("t1", "Cardiology", "med", listOf("s1", "s2"))
    private val renal = ChooserTopic("t2", "Renal", "med", listOf("s3"))
    private val fromQuestions = ChooserTopic("qt:Neurology", "Neurology", "med", emptyList())
    private val topics = listOf(cardiology, renal, fromQuestions)

    private fun question(id: String, topic: String, libraryIds: List<String>) =
        Question(
            id = id, subjectId = "med", topic = topic, difficulty = "Moderate",
            vignette = "", stem = "Stem $id", options = emptyList(), correctLabel = "A",
            explanation = "", learningObjective = null, estimatedSeconds = null,
            libraryIds = libraryIds, conceptIds = emptyList(),
        )

    private val pool = listOf(
        question("q1", "Cardiology", listOf("s1")),
        question("q2", "Cardiology", listOf("s2")),
        question("q3", "Renal", listOf("s3")),
        // Filed under Cardiology but never cross-referenced to an article.
        question("q4", "Cardiology", emptyList()),
        question("q5", "Neurology", emptyList()),
    )

    @Test
    fun `keys are spelled as the web spells them`() {
        assertEquals("t:t1", QBankScope.topicKey("t1"))
        assertEquals("s:s1", QBankScope.subtopicKey("s1"))
        assertTrue(QBankScope.isQuestionTopic("qt:Neurology"))
    }

    @Test
    fun `a whole-topic selection expands to its subtopics`() {
        assertEquals(
            setOf("s1", "s2"),
            QBankScope.subtopicIds(setOf("t:t1"), topics),
        )
    }

    @Test
    fun `a subtopic selection stands alone`() {
        assertEquals(setOf("s2"), QBankScope.subtopicIds(setOf("s:s2"), topics))
    }

    @Test
    fun `an empty scope is everything`() {
        assertEquals(pool, QBankScope.questions(pool, emptySet(), topics))
    }

    @Test
    fun `a subtopic scope draws only from that subtopic`() {
        val picked = QBankScope.questions(pool, setOf("s:s1"), topics)
        assertEquals(listOf("q1"), picked.map { it.id })
    }

    @Test
    fun `a whole topic also matches on title`() {
        // Without the title fallback q4 vanishes, and a chapter the student can
        // plainly see has questions in it comes back empty.
        val picked = QBankScope.questions(pool, setOf("t:t1"), topics)
        assertEquals(listOf("q1", "q2", "q4"), picked.map { it.id })
    }

    @Test
    fun `the title match ignores case`() {
        val shouty = pool.map { if (it.id == "q4") question("q4", "CARDIOLOGY", emptyList()) else it }
        val picked = QBankScope.questions(shouty, setOf("t:t1"), topics)
        assertTrue(picked.any { it.id == "q4" })
    }

    @Test
    fun `a topic the questions named works with no subtopics`() {
        val picked = QBankScope.questions(pool, setOf("t:qt:Neurology"), topics)
        assertEquals(listOf("q5"), picked.map { it.id })
    }

    @Test
    fun `topics are synthesised from the questions when there is no library`() {
        val synthesised = QBankScope.chooserTopics(pool, emptyList())

        // Cardiology, Renal, Neurology — insertion order, one per distinct
        // (subjectId, lowercased title) pair.
        assertEquals(listOf("Cardiology", "Renal", "Neurology"), synthesised.map { it.title })
        assertTrue(synthesised.all { it.subtopicIds.isEmpty() })
        assertTrue(synthesised.all { QBankScope.isQuestionTopic(it.id) })
    }

    @Test
    fun `a chapter keeps the first spelling seen and the order it appeared in`() {
        val differentlyCased = listOf(
            question("q1", "cardiology", emptyList()),
            question("q2", "Renal", emptyList()),
            question("q3", "CARDIOLOGY", emptyList()),
            question("q4", "renal", emptyList()),
        )

        val synthesised = QBankScope.chooserTopics(differentlyCased, emptyList())

        // The first spelling encountered wins, and the chapter list keeps the
        // order the questions first named them in — a HashMap would reorder
        // it between runs.
        assertEquals(listOf("cardiology", "Renal"), synthesised.map { it.title })
    }

    @Test
    fun `a library topic with that title suppresses the synthetic one under every subject`() {
        val library = listOf(ChooserTopic("lib1", "Cardiology", "other-subject", emptyList()))
        val fromMed = listOf(question("q1", "Cardiology", emptyList()))

        val synthesised = QBankScope.chooserTopics(fromMed, library)

        // `covered` is not subject-scoped: a library topic titled "Cardiology"
        // under one subject suppresses a synthetic "Cardiology" under another.
        assertEquals(listOf("Cardiology"), synthesised.map { it.title })
        assertEquals(library, synthesised)
    }

    @Test
    fun `the same chapter title under two subjects stays two topics`() {
        val twoSubjects = listOf(
            question("q1", "Cardiology", emptyList()),
            Question(
                id = "q2", subjectId = "surg", topic = "Cardiology", difficulty = "Moderate",
                vignette = "", stem = "Stem q2", options = emptyList(), correctLabel = "A",
                explanation = "", learningObjective = null, estimatedSeconds = null,
                libraryIds = emptyList(), conceptIds = emptyList(),
            ),
        )

        val synthesised = QBankScope.chooserTopics(twoSubjects, emptyList())

        assertEquals(2, synthesised.size)
        assertEquals(setOf("med", "surg"), synthesised.map { it.subjectId }.toSet())
    }
}
