package com.nishany.android.feature.studytest

import com.nishany.android.core.model.AnswerOption
import com.nishany.android.core.model.Question
import com.nishany.android.core.model.StudyRoom
import org.junit.Assert.assertEquals
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/** Plain JUnit -- [StudyTestLogic] touches neither Android nor the network, so none of these need Robolectric or MockWebServer. */
class StudyTestLogicTest {

    private fun question(id: String, correctLabel: String = "A") = Question(
        id = id,
        subjectId = "med",
        topic = "Renal",
        difficulty = "Moderate",
        vignette = "",
        stem = "Stem $id",
        options = listOf(
            AnswerOption("A", "Option A", "Because A"),
            AnswerOption("B", "Option B", "Because B"),
            AnswerOption("C", "Option C", "Because C"),
        ),
        correctLabel = correctLabel,
        explanation = "",
        learningObjective = null,
        estimatedSeconds = null,
        libraryIds = emptyList(),
        conceptIds = emptyList(),
    )

    private fun room(
        status: String = "running",
        myFinished: Boolean = false,
        resultsOpen: Boolean = false,
        questionIds: List<String> = listOf("q1", "q2", "q3"),
        myAnswers: List<StudyRoom.Answer> = emptyList(),
    ) = StudyRoom(
        id = "r1", code = "AB12CD", name = "Renal block", isHost = true, status = status,
        timed = false, secondsPerQuestion = null, questionCount = questionIds.size,
        questionIds = questionIds, resultsOpen = resultsOpen, members = emptyList(),
        myAnswers = myAnswers, myFinished = myFinished,
    )

    // --- currentIndex: resuming from answeredIds ---

    @Test fun `currentIndex starts at 0 when nothing has been answered`() {
        val questions = listOf(question("q1"), question("q2"), question("q3"))
        assertEquals(0, StudyTestLogic.currentIndex(questions, emptySet()))
    }

    @Test fun `currentIndex resumes at the first unanswered question`() {
        val questions = listOf(question("q1"), question("q2"), question("q3"))
        assertEquals(1, StudyTestLogic.currentIndex(questions, setOf("q1")))
        assertEquals(2, StudyTestLogic.currentIndex(questions, setOf("q1", "q2")))
    }

    @Test fun `currentIndex lands on the last question once everything is answered`() {
        val questions = listOf(question("q1"), question("q2"), question("q3"))
        assertEquals(2, StudyTestLogic.currentIndex(questions, setOf("q1", "q2", "q3")))
    }

    @Test fun `currentIndex is 0 for an empty question list rather than throwing`() {
        assertEquals(0, StudyTestLogic.currentIndex(emptyList(), setOf("ghost")))
    }

    @Test fun `currentIndex ignores answered ids for questions not in the list`() {
        // A room can name a question this device dropped from its local pool
        // (loadQuestions already filtered it out) -- an answer to it must not
        // desync the resume position for the questions that did load.
        val questions = listOf(question("q1"), question("q2"))
        assertEquals(0, StudyTestLogic.currentIndex(questions, setOf("q-not-in-pool")))
    }

    // --- reviewed: pairing questions with the server's verdict ---

    @Test fun `reviewed pairs each question with its answer in room order`() {
        val questions = listOf(question("q1", "A"), question("q2", "B"))
        val myRoom = room(
            questionIds = listOf("q1", "q2"),
            myAnswers = listOf(
                StudyRoom.Answer("q1", chosenIndex = 0, correct = true),
                StudyRoom.Answer("q2", chosenIndex = 2, correct = false),
            ),
        )
        val rows = StudyTestLogic.reviewed(myRoom, questions)
        assertEquals(2, rows.size)
        assertEquals("q1", rows[0].question.id)
        assertTrue(rows[0].answer.correct)
        assertEquals(0, rows[0].correctIndex) // label "A" is options[0]
        assertEquals("q2", rows[1].question.id)
        assertFalse(rows[1].answer.correct)
        assertEquals(1, rows[1].correctIndex) // label "B" is options[1]
    }

    @Test fun `reviewed skips a question id the local pool never synced`() {
        val questions = listOf(question("q1"))
        val myRoom = room(
            questionIds = listOf("q1", "q-missing"),
            myAnswers = listOf(
                StudyRoom.Answer("q1", chosenIndex = 0, correct = true),
                StudyRoom.Answer("q-missing", chosenIndex = 0, correct = true),
            ),
        )
        assertEquals(listOf("q1"), StudyTestLogic.reviewed(myRoom, questions).map { it.question.id })
    }

    @Test fun `reviewed skips a question with no matching answer`() {
        val questions = listOf(question("q1"), question("q2"))
        val myRoom = room(questionIds = listOf("q1", "q2"), myAnswers = listOf(StudyRoom.Answer("q1", 0, true)))
        assertEquals(listOf("q1"), StudyTestLogic.reviewed(myRoom, questions).map { it.question.id })
    }

    @Test fun `wasAnswered is false for a chosenIndex outside the option list`() {
        // Handing in leaves an untouched question recorded with no real
        // option behind it -- see the field's own doc for why this must read
        // as "not answered", not as a wrong answer.
        val q = question("q1")
        val reviewedRow = StudyTestLogic.Reviewed(q, StudyRoom.Answer("q1", chosenIndex = -1, correct = false))
        assertFalse(reviewedRow.wasAnswered)
    }

    @Test fun `wasAnswered is true for a real chosenIndex`() {
        val q = question("q1")
        val reviewedRow = StudyTestLogic.Reviewed(q, StudyRoom.Answer("q1", chosenIndex = 1, correct = false))
        assertTrue(reviewedRow.wasAnswered)
    }

    @Test fun `correctIndex is null when the published correctLabel no longer matches an option`() {
        val q = question("q1", correctLabel = "Z")
        val reviewedRow = StudyTestLogic.Reviewed(q, StudyRoom.Answer("q1", chosenIndex = 0, correct = false))
        assertNull(reviewedRow.correctIndex)
    }

    // --- phase: lobby / running / results transitions ---

    @Test fun `phase is LOBBY while the room has not started`() {
        assertEquals(StudyTestLogic.Phase.LOBBY, StudyTestLogic.phase(room(status = "lobby")))
    }

    @Test fun `phase is RUNNING once started but before the caller finishes`() {
        assertEquals(StudyTestLogic.Phase.RUNNING, StudyTestLogic.phase(room(status = "running", myFinished = false)))
    }

    @Test fun `phase is RESULTS once the caller has finished, even if others have not`() {
        // resultsOpen only gates whether other members' scores show -- the
        // caller's own results screen is reachable the moment they finish.
        assertEquals(
            StudyTestLogic.Phase.RESULTS,
            StudyTestLogic.phase(room(status = "running", myFinished = true, resultsOpen = false)),
        )
    }

    @Test fun `phase is RESULTS once the room has closed`() {
        assertEquals(
            StudyTestLogic.Phase.RESULTS,
            StudyTestLogic.phase(room(status = "closed", myFinished = true, resultsOpen = true)),
        )
    }
}
