package com.synapse.app.core.calendar

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * Ported test vectors from web's `src/lib/studentSchedule.test.ts`
 * (`flattenSchedule`), reduced to what [flattenModuleSchedule] actually
 * needs — a university id, a year id/label and a course list — rather than
 * full `University`/`UniYear` objects, since Android doesn't have that model
 * ported (see `CalendarRepository.curriculumSessions`'s doc comment).
 */
class ModuleScheduleTest {

    private val universityId = "kau"
    private val yearId = "KAU_Y1"
    private val yearLabel = "Year 1"
    private val cvs = CalendarCourse(id = "imp-1786976158706-0", name = "Cardiovascular System")
    private val resp = CalendarCourse(id = "imp-1786976158706-1", name = "Respiratory System")
    private val courses = listOf(cvs, resp)

    private fun block(
        date: String,
        startTime: String = "09:00",
        endTime: String = "10:00",
        title: String = "",
        type: String = "lecture",
    ) = ModuleScheduleBlockDto(id = "b-$date-$startTime", type = type, title = title, date = date, startTime = startTime, endTime = endTime)

    private fun byId(courseId: String, blocks: List<ModuleScheduleBlockDto>): ModuleScheduleStore =
        mapOf(moduleKey(universityId, yearId, courseId) to blocks)

    private fun flatten(store: ModuleScheduleStore) =
        flattenModuleSchedule(universityId, yearId, yearLabel, courses, store)

    @Test
    fun aTimetableIsFoundUnderTheYearIdTheConsoleActuallyWrites() {
        // The regression this guards: the reader built the key from the year's label
        // ("Year 1") while the console writes its ID ("KAU_Y1"), so every published
        // timetable came back empty for the student it was published for.
        val sessions = flatten(byId(cvs.id, listOf(block(date = "2026-09-10", title = "Heart failure"))))

        assertEquals(1, sessions.size)
        assertEquals("Heart failure", sessions[0].block.title)
        assertEquals("Cardiovascular System", sessions[0].courseName)
        assertEquals("Lecture", sessions[0].label)
    }

    @Test
    fun aTimetablePublishedBeforeYearsGrewIdsIsStillReadUnderTheLabel() {
        val store = mapOf(moduleKey(universityId, yearLabel, cvs.id) to listOf(block(date = "2026-09-10")))
        assertEquals(1, flatten(store).size)
    }

    @Test
    fun theIdWinsWhenAModuleHasBlocksUnderBothForms() {
        // Current data beats data left behind by the migration, never the other way.
        val store = mapOf(
            moduleKey(universityId, yearId, cvs.id) to listOf(block(date = "2026-09-10", title = "Published")),
            moduleKey(universityId, yearLabel, cvs.id) to listOf(block(date = "2026-09-11", title = "Stale")),
        )
        assertEquals(listOf("Published"), flatten(store).map { it.block.title })
    }

    @Test
    fun everyModuleInTheYearLandsOnOneListInTimeOrder() {
        val store = mapOf(
            moduleKey(universityId, yearId, cvs.id) to listOf(block(date = "2026-09-11", startTime = "09:00", title = "Second")),
            moduleKey(universityId, yearId, resp.id) to listOf(
                block(date = "2026-09-10", startTime = "14:00", title = "First"),
                block(date = "2026-09-11", startTime = "11:00", title = "Third"),
            ),
        )
        assertEquals(listOf("First", "Second", "Third"), flatten(store).map { it.block.title })
    }

    @Test
    fun anotherYearOfTheSameUniversityIsNotThisStudentsTimetable() {
        val sessions = flattenModuleSchedule(universityId, "KAU_Y2", "Year 2", courses, byId(cvs.id, listOf(block(date = "2026-09-10"))))
        assertTrue(sessions.isEmpty())
    }

    @Test
    fun aBlockIsReadInTheStudentsOwnTimeZoneNeverAsUtc() {
        val session = flatten(byId(cvs.id, listOf(block(date = "2026-09-10", startTime = "09:00", endTime = "11:00")))).single()
        assertEquals(2026, session.start.year)
        assertEquals(9, session.start.monthValue)
        assertEquals(10, session.start.dayOfMonth)
        assertEquals(9, session.start.hour)
        assertEquals(120, java.time.Duration.between(session.start, session.end).toMinutes())
    }

    @Test
    fun aLogbookTaskIsADeadlineRatherThanASitting() {
        val session = flatten(byId(cvs.id, listOf(block(date = "2026-09-10", type = "logbook", endTime = "")))).single()
        assertEquals(null, session.end)
        assertEquals(false, session.isExam)
    }

    @Test
    fun aBlockWithAnUnusableDateIsDroppedRatherThanPlacedAtTheEpoch() {
        assertTrue(flatten(byId(cvs.id, listOf(block(date = "")))).isEmpty())
    }

    @Test
    fun aYearWithNothingPublishedIsEmptyRatherThanInvented() {
        assertTrue(flatten(emptyMap()).isEmpty())
    }

    @Test
    fun anExamTypeBlockIsMarkedAsAnExam() {
        val session = flatten(byId(cvs.id, listOf(block(date = "2026-09-28", startTime = "09:00", title = "CVS final", type = "final")))).single()
        assertTrue(session.isExam)
        assertEquals("Final exam", session.label)
    }
}
