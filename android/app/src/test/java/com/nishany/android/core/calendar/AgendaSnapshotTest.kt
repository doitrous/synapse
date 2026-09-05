package com.nishany.android.core.calendar

import java.time.LocalDate
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * [buildAgendaSnapshot], the flattening the app runs to feed the home-screen
 * calendar widget's [com.nishany.android.feature.focus.CalendarWidgetStore] --
 * schedule blocks and dated tasks merged, filtered to today onward, sorted,
 * capped.
 */
class AgendaSnapshotTest {

    private val today = LocalDate.of(2024, 5, 10)

    private fun scheduleDoc(vararg entries: Pair<String, String>): String {
        val modules = entries.joinToString(",") { (key, block) -> "\"$key\":[$block]" }
        val published = entries.joinToString(",") { (key, _) -> "\"$key\":true" }
        return "{$modules,\"__schedulePublishState__\":{$published}}"
    }

    private fun block(id: String, date: String, time: String = "09:00", type: String = "lecture") =
        """{"id":"$id","type":"$type","title":"Block $id","date":"$date","startTime":"$time","endTime":"10:00"}"""

    private fun tasksDoc(vararg tasks: String) =
        """{"version":1,"groups":[],"tasks":[${tasks.joinToString(",")}]}"""

    private fun task(id: String, title: String, date: String?, time: String? = null) =
        """{"id":"$id","groupId":"g","title":"$title","date":${date?.let { "\"$it\"" } ?: "null"},"time":${time?.let { "\"$it\"" } ?: "null"},"createdAt":"x","updatedAt":"x"}"""

    @Test
    fun `schedule and dated tasks are merged and time-sorted`() {
        val schedule = scheduleDoc("mod-a" to block("lecture", "2024-05-12", "09:00"))
        val tasks = tasksDoc(task("t1", "Essay", "2024-05-11", "14:00"))

        val result = buildAgendaSnapshot(schedule, tasks, today)

        assertEquals(listOf("Essay", "Block lecture"), result.map { it.title })
    }

    @Test
    fun `entries before today are dropped, today is kept`() {
        val schedule = scheduleDoc(
            "past" to block("past", "2024-05-09"),
            "now" to block("now", "2024-05-10"),
        )
        val result = buildAgendaSnapshot(schedule, null, today)
        assertEquals(listOf("Block now"), result.map { it.title })
        assertTrue(result.single().whenLabel.startsWith("Today"))
    }

    @Test
    fun `the snapshot is capped at the limit, keeping the earliest`() {
        val tasks = tasksDoc(*(1..8).map { task("t$it", "Task $it", "2024-05-${10 + it}") }.toTypedArray())
        val result = buildAgendaSnapshot(null, tasks, today, limit = 3)
        assertEquals(3, result.size)
        assertEquals(listOf("Task 1", "Task 2", "Task 3"), result.map { it.title })
    }

    @Test
    fun `exam blocks are flagged, lectures are not`() {
        val schedule = scheduleDoc(
            "exam" to block("exam", "2024-05-12", type = "final"),
            "lec" to block("lec", "2024-05-11"),
        )
        val result = buildAgendaSnapshot(schedule, null, today)
        assertEquals(mapOf("Block lec" to false, "Block exam" to true), result.associate { it.title to it.isExam })
    }

    @Test
    fun `an undated task never reaches the snapshot`() {
        val tasks = tasksDoc(task("t1", "Someday", date = null))
        assertEquals(emptyList<AgendaSnapshotItem>(), buildAgendaSnapshot(null, tasks, today))
    }

    @Test
    fun `a task with no time shows only its day`() {
        val tasks = tasksDoc(task("t1", "All day", "2024-05-12"))
        val label = buildAgendaSnapshot(null, tasks, today).single().whenLabel
        assertTrue("no separator when timeless: $label", !label.contains("·"))
    }

    @Test
    fun `malformed documents yield an empty snapshot rather than throwing`() {
        assertEquals(emptyList<AgendaSnapshotItem>(), buildAgendaSnapshot("not json", "also not json", today))
        assertEquals(emptyList<AgendaSnapshotItem>(), buildAgendaSnapshot(null, null, today))
    }
}
