package com.synapse.app.core.qbank

import java.time.Instant
import kotlin.random.Random
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Task 3 (Plan 03 — Question Bank): the session engine.
 *
 * Covers [QBankSessionId.mint], the seeded shuffle behind [QBankSession.start],
 * the pick/check/navState/finish state machine, and the [LiveSession]
 * snapshot/resume round trip.
 */
class QBankSessionTest {

    private fun question(
        id: String,
        topic: String = "Heart failure",
        correctLabel: String = "B",
        options: List<AnswerOption> = listOf(
            AnswerOption("A", "Wrong answer", "Because wrong."),
            AnswerOption("B", "Right answer", "Because right."),
        ),
    ) = Question(
        id = id,
        subjectId = "SYS_CVS",
        topic = topic,
        vignette = "A patient presents...",
        stem = "Which is true?",
        options = options,
        correctLabel = correctLabel,
        explanation = "Explained.",
    )

    // MARK: - QBankSessionId.mint

    @Test
    fun `mint is deterministic under a seeded Random`() {
        val now = Instant.ofEpochMilli(1_735_689_600_000L)

        val first = QBankSessionId.mint(now, Random(42L))
        val second = QBankSessionId.mint(now, Random(42L))

        assertEquals(first, second)
    }

    @Test
    fun `mint has the qb dash base36 dash 5 chars shape`() {
        val now = Instant.ofEpochMilli(1_735_689_600_000L)

        val id = QBankSessionId.mint(now, Random(7L))

        val expectedTimestamp = now.toEpochMilli().toString(36)
        assertTrue(id.matches(Regex("^qb-$expectedTimestamp-[a-z0-9]{5}$")))
    }

    @Test
    fun `mint varies with the rng even for the same instant`() {
        val now = Instant.ofEpochMilli(1_735_689_600_000L)

        val a = QBankSessionId.mint(now, Random(1L))
        val b = QBankSessionId.mint(now, Random(2L))

        assertTrue(a != b)
    }

    // MARK: - seeded shuffle

    @Test
    fun `start shuffles deterministically under a seed`() {
        val pool = (1..10).map { question("Q$it") }

        val a = QBankSession.start(pool, length = 10, mode = QBankSession.Mode.Tutor, seed = 99L)
        val b = QBankSession.start(pool, length = 10, mode = QBankSession.Mode.Tutor, seed = 99L)

        assertEquals(a.questions.map { it.id }, b.questions.map { it.id })
    }

    @Test
    fun `start takes only the first length questions of the shuffle`() {
        val pool = (1..10).map { question("Q$it") }

        val session = QBankSession.start(pool, length = 3, mode = QBankSession.Mode.Tutor, seed = 5L)

        assertEquals(3, session.questions.size)
        assertEquals(pool.map { it.id }.toSet().size, 10) // sanity: distinct source ids
        assertTrue(session.questions.map { it.id }.toSet().size == 3)
    }

    // MARK: - picked is irrevocable once checked

    @Test
    fun `picked is irrevocable after check in tutor mode`() {
        val session = QBankSession.start(
            listOf(question("Q1")), length = 1, mode = QBankSession.Mode.Tutor, seed = 1L,
        )

        session.pick(0, "A")
        session.check(0)
        session.pick(0, "B")

        assertEquals("A", session.picked[session.questions[0].id])
    }

    @Test
    fun `picked stays revocable before check in timed mode`() {
        val session = QBankSession.start(
            listOf(question("Q1")), length = 1, mode = QBankSession.Mode.Timed, seed = 1L,
        )

        session.pick(0, "A")
        session.check(0) // deferred: a no-op in timed mode
        session.pick(0, "B")

        assertEquals("B", session.picked[session.questions[0].id])
        assertTrue(session.checked.isEmpty())
    }

    // MARK: - navState

    @Test
    fun `navState is unseen for an index never visited`() {
        val session = QBankSession.start(
            listOf(question("Q1"), question("Q2")), length = 2, mode = QBankSession.Mode.Tutor, seed = 1L,
        )
        session.visited.clear() // isolate: nothing visited at all

        assertEquals(QBankSession.NavState.Unseen, session.navState(1, currentIndex = 0))
    }

    @Test
    fun `navState is unseen for the current question even once visited`() {
        val session = QBankSession.start(
            listOf(question("Q1"), question("Q2")), length = 2, mode = QBankSession.Mode.Tutor, seed = 1L,
        )
        session.visited.add(1)

        assertEquals(QBankSession.NavState.Unseen, session.navState(1, currentIndex = 1))
    }

    @Test
    fun `navState is omitted when visited, unanswered, and no longer current`() {
        val session = QBankSession.start(
            listOf(question("Q1"), question("Q2")), length = 2, mode = QBankSession.Mode.Tutor, seed = 1L,
        )
        session.visited.add(1)

        assertEquals(QBankSession.NavState.Omitted, session.navState(1, currentIndex = 0))
    }

    @Test
    fun `navState is answered when picked but not yet checked`() {
        val session = QBankSession.start(
            listOf(question("Q1")), length = 1, mode = QBankSession.Mode.Tutor, seed = 1L,
        )
        session.visited.add(0)
        session.pick(0, "A")

        assertEquals(QBankSession.NavState.Answered, session.navState(0, currentIndex = 5))
    }

    // MARK: - tutor grades on check, timed grades only at finish

    @Test
    fun `tutor mode reveals correct or wrong as soon as check is called`() {
        val session = QBankSession.start(
            listOf(question("Q1", correctLabel = "B")), length = 1, mode = QBankSession.Mode.Tutor, seed = 1L,
        )
        session.visited.add(0)

        session.pick(0, "B")
        session.check(0)

        assertEquals(QBankSession.NavState.Correct, session.navState(0, currentIndex = 0))
    }

    @Test
    fun `timed mode withholds grading until finish`() {
        val session = QBankSession.start(
            listOf(question("Q1", correctLabel = "B")), length = 1, mode = QBankSession.Mode.Timed, seed = 1L,
        )
        session.visited.add(0)
        session.pick(0, "B")
        session.check(0) // no-op in timed mode

        assertEquals(QBankSession.NavState.Answered, session.navState(0, currentIndex = 0))

        val result = session.finish()

        assertEquals(1, result.correct)
        assertEquals(QBankSession.NavState.Correct, session.navState(0, currentIndex = 0))
    }

    @Test
    fun `finish grades every answered question via isCorrect`() {
        val questions = listOf(
            question("Q1", correctLabel = "B"),
            question("Q2", correctLabel = "A"),
            question("Q3", correctLabel = "A"),
        )
        val session = QBankSession.start(questions, length = 3, mode = QBankSession.Mode.Timed, seed = 3L)
        for (i in session.questions.indices) session.pick(i, "A")

        val result = session.finish()

        assertEquals(3, result.total)
        val correctIds = result.perQuestion.filter { it.correct }.map { it.questionId }.toSet()
        val expectedCorrectIds = session.questions.filter { it.correctLabel == "A" }.map { it.id }.toSet()
        assertEquals(expectedCorrectIds, correctIds)
        assertEquals(expectedCorrectIds.size, result.correct)
    }

    @Test
    fun `finish leaves an unanswered question ungraded`() {
        val session = QBankSession.start(
            listOf(question("Q1"), question("Q2")), length = 2, mode = QBankSession.Mode.Tutor, seed = 1L,
        )
        session.pick(0, "B")
        session.check(0)
        // Q at index 1 is left untouched.

        val result = session.finish()

        assertEquals(1, result.correct)
        assertEquals(2, result.total)
        val untouched = result.perQuestion.first { it.questionId == session.questions[1].id }
        assertNull(untouched.pickedLabel)
        assertEquals(false, untouched.correct)
    }

    // MARK: - snapshot / resume

    @Test
    fun `resume survives a reshuffle of the pool order`() {
        val q1 = question("Q1")
        val q2 = question("Q2")
        val q3 = question("Q3")
        val originalPool = listOf(q1, q2, q3)

        val session = QBankSession.start(originalPool, length = 3, mode = QBankSession.Mode.Tutor, seed = 11L)
        val originalOrder = session.questions.map { it.id }
        session.visited.addAll(setOf(0, 1))
        session.pick(0, "B")
        session.check(0)
        session.spent[session.questions[0].id] = 42

        val live = session.snapshot()

        // The pool comes back in a different order than it was drawn from.
        val reshuffledPool = listOf(q3, q1, q2)
        val resumed = QBankSession.resume(live, reshuffledPool)

        assertNotNull(resumed)
        resumed!!
        assertEquals(originalOrder, resumed.questions.map { it.id })
        assertEquals("B", resumed.picked[session.questions[0].id])
        assertTrue(session.questions[0].id in resumed.checked)
        assertEquals(setOf(0, 1), resumed.visited)
        assertEquals(42, resumed.spent[session.questions[0].id])
    }

    @Test
    fun `resume converts a stored index against the option labels current at resume time`() {
        val original = question(
            "Q1",
            correctLabel = "B",
            options = listOf(
                AnswerOption("A", "Wrong answer", "..."),
                AnswerOption("B", "Right answer", "..."),
            ),
        )
        val session = QBankSession.start(listOf(original), length = 1, mode = QBankSession.Mode.Tutor, seed = 1L)
        session.pick(0, "B") // the option at index 1

        val live = session.snapshot()
        assertEquals(1, live.answers[original.id])

        // The same question, relabelled: the same content at index 1 is now "Y".
        val relabelled = original.copy(
            options = listOf(
                AnswerOption("X", "Wrong answer", "..."),
                AnswerOption("Y", "Right answer", "..."),
            ),
            correctLabel = "Y",
        )

        val resumed = QBankSession.resume(live, listOf(relabelled))

        assertNotNull(resumed)
        assertEquals("Y", resumed!!.picked[original.id])
    }

    @Test
    fun `resume returns null when a question has left the pool`() {
        val session = QBankSession.start(
            listOf(question("Q1"), question("Q2")), length = 2, mode = QBankSession.Mode.Tutor, seed = 1L,
        )
        val live = session.snapshot()

        val resumed = QBankSession.resume(live, listOf(question("Q1")))

        assertNull(resumed)
    }
}
