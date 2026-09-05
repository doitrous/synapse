package com.nishany.android.feature.qbank

import com.nishany.android.core.progress.AttemptRecord
import java.time.LocalDate
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [QBankStats.of] is a pure port of `YourQbank`'s figures
 * (`src/pages/student/QuestionBank.tsx:119-200`), computed over the
 * qbank-and-room slice of the attempt ledger. No [android.content.Context],
 * no [com.nishany.android.core.cache.LocalStore] -- every record here is
 * built by hand, the same discipline `AttemptTest` uses for [com.nishany.android.core.progress.AttemptStore].
 */
class QBankStatsTest {

    private fun record(
        id: String,
        itemId: String,
        subjectId: String = "med",
        correct: Boolean? = true,
        at: String = "2026-08-19T10:00:00.000Z",
        surface: String = "qbank",
        sessionId: String = "s1",
    ) = AttemptRecord(
        id = id, at = at, surface = surface, itemId = itemId, subjectId = subjectId,
        topic = "Cardiology", difficulty = "Moderate", correct = correct, sessionId = sessionId,
    )

    @Test
    fun `a question answered in a study room counts as answered`() {
        // src/pages/student/QuestionBank.tsx:119-120 takes 'qbank' *or*
        // 'room'. A student who spends an evening in a room and then opens
        // this panel should not be told they answered nothing today.
        val records = listOf(
            record(id = "a1", itemId = "q1", surface = "qbank", correct = true),
            record(id = "a2", itemId = "q2", surface = "room", correct = false),
        )

        // Pin the clock: the records sit on 2026-08-19, and the week window
        // must be measured from the same day, not from whenever this runs.
        val stats = QBankStats.of(records, total = 10, today = LocalDate.of(2026, 8, 19))

        assertEquals("both surfaces count towards coverage", 2, stats.seen)
        assertEquals("and both towards accuracy", 0.5, stats.accuracy!!, 0.0001)
        assertEquals("and both towards the week", 2, stats.weekTotal)
    }

    @Test
    fun `an attempt from somewhere that is not the question bank is left out`() {
        // A ticked OSCE station is a real attempt, but it is not a question,
        // and counting it here would inflate coverage against a pool it was
        // never part of.
        val records = listOf(
            record(id = "a1", itemId = "q1", surface = "qbank"),
            record(id = "a2", itemId = "os-1", surface = "practical"),
        )

        val stats = QBankStats.of(records, total = 10)

        assertEquals(1, stats.seen)
    }

    @Test
    fun `coverage counts distinct questions, not attempts`() {
        // Two attempts at the same question -- one seen item, not two.
        val records = listOf(
            record(id = "a1", itemId = "q1"),
            record(id = "a2", itemId = "q1", sessionId = "s2"),
        )

        val stats = QBankStats.of(records, total = 10)

        assertEquals(1, stats.seen)
        assertEquals(10, stats.total)
    }

    @Test
    fun `accuracy ignores unmarked attempts rather than scoring them zero`() {
        val records = listOf(
            record(id = "a1", itemId = "q1", correct = true),
            record(id = "a2", itemId = "q2", correct = null),
        )

        val stats = QBankStats.of(records, total = 10)

        // If the unmarked attempt were scored as wrong, this would be 0.5.
        assertEquals(1.0, stats.accuracy!!, 0.0001)
    }

    @Test
    fun `the week always has seven entries, including the silent days`() {
        val today = LocalDate.of(2026, 8, 19)
        val records = listOf(record(id = "a1", itemId = "q1", at = "2026-08-19T10:00:00.000Z"))

        val stats = QBankStats.of(records, total = 10, today = today)

        assertEquals(7, stats.week.size)
        assertEquals(listOf("2026-08-13", "2026-08-14", "2026-08-15", "2026-08-16", "2026-08-17", "2026-08-18", "2026-08-19"), stats.week.map { it.date })
        assertEquals(1, stats.weekTotal)
    }

    @Test
    fun `a streak survives a today with no attempts yet`() {
        // Studied yesterday and the day before; nothing logged yet today.
        val today = LocalDate.of(2026, 8, 19)
        val records = listOf(
            record(id = "a1", itemId = "q1", at = "2026-08-18T09:00:00.000Z"),
            record(id = "a2", itemId = "q2", at = "2026-08-17T09:00:00.000Z", sessionId = "s2"),
        )

        val stats = QBankStats.of(records, total = 10, today = today)

        assertEquals(2, stats.streak)
    }

    @Test
    fun `a streak does not survive an empty yesterday`() {
        // Studied two days ago, but neither yesterday nor today.
        val today = LocalDate.of(2026, 8, 19)
        val records = listOf(record(id = "a1", itemId = "q1", at = "2026-08-17T09:00:00.000Z"))

        val stats = QBankStats.of(records, total = 10, today = today)

        assertEquals(0, stats.streak)
    }

    @Test
    fun `subject accuracy omits subjects the student has never answered`() {
        val records = marks("cardiology", correct = 2, wrong = 1)

        val stats = QBankStats.of(records, total = 10)

        assertEquals(listOf("cardiology"), stats.bySubject.map { it.subjectId })
        assertTrue(stats.bySubject.none { it.subjectId == "renal" })
    }

    @Test
    fun `a subject answered once is not a subject with an accuracy`() {
        // The web's WEAKNESS_EVIDENCE floor (`QuestionBank.tsx:94`, `:132`).
        // Without it a single lucky answer reports the subject at 100% and,
        // being a perfect score, sits at the top of the student's list.
        val records = marks("cardiology", correct = 3, wrong = 0) +
            marks("renal", correct = 1, wrong = 0)

        val stats = QBankStats.of(records, total = 10)

        assertEquals(listOf("cardiology"), stats.bySubject.map { it.subjectId })
    }

    @Test
    fun `subjects are ordered by how much of them was answered, not by score`() {
        // `attemptStats.ts:60` sorts on attempts, descending. Sorting on
        // accuracy instead puts the subject a student has barely touched
        // above the one they have actually been working through.
        val records = marks("renal", correct = 3, wrong = 0) +
            marks("cardiology", correct = 5, wrong = 5)

        val stats = QBankStats.of(records, total = 20)

        assertEquals(listOf("cardiology", "renal"), stats.bySubject.map { it.subjectId })
    }

    @Test
    fun `no more subjects are listed than the web lists`() {
        val records = (1..9).flatMap { marks("subject-$it", correct = 3, wrong = 0) }

        val stats = QBankStats.of(records, total = 40)

        assertEquals(6, stats.bySubject.size)
    }

    /** [correct] right answers and [wrong] wrong ones in [subjectId], each its own item. */
    private fun marks(subjectId: String, correct: Int, wrong: Int): List<AttemptRecord> =
        (1..correct).map {
            record(id = "$subjectId-c$it", itemId = "$subjectId-qc$it", subjectId = subjectId, correct = true)
        } + (1..wrong).map {
            record(id = "$subjectId-w$it", itemId = "$subjectId-qw$it", subjectId = subjectId, correct = false)
        }
}
