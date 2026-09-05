package com.nishany.android.core.calendar

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class CalendarTasksTest {

    @Test
    fun `addTask seeds the default group on first use`() {
        val doc = addTask(EMPTY_TASKS, "Revise CVS", "2024-05-01", "t1", "2024-04-01T00:00:00Z")
        assertEquals(1, doc.groups.size)
        assertEquals("group-default", doc.tasks.single().groupId)
        assertEquals("2024-05-01", doc.tasks.single().date)
    }

    @Test
    fun `addTask does not duplicate the default group on a second task`() {
        val once = addTask(EMPTY_TASKS, "A", null, "t1", "2024-04-01T00:00:00Z")
        val twice = addTask(once, "B", null, "t2", "2024-04-02T00:00:00Z")
        assertEquals(1, twice.groups.size)
        assertEquals(2, twice.tasks.size)
    }

    @Test
    fun `toggleTask flips done and bumps updatedAt, leaves other tasks alone`() {
        val doc = addTask(EMPTY_TASKS, "A", null, "t1", "2024-04-01T00:00:00Z")
        val toggled = toggleTask(doc, "t1", "2024-04-02T00:00:00Z")
        assertTrue(toggled.tasks.single().done)
        assertEquals("2024-04-02T00:00:00Z", toggled.tasks.single().updatedAt)

        val toggledBack = toggleTask(toggled, "t1", "2024-04-03T00:00:00Z")
        assertTrue(!toggledBack.tasks.single().done)
    }

    @Test
    fun `toggleTask on a missing id is a no-op`() {
        val doc = addTask(EMPTY_TASKS, "A", null, "t1", "2024-04-01T00:00:00Z")
        assertEquals(doc, toggleTask(doc, "missing", "2024-04-02T00:00:00Z"))
    }

    @Test
    fun `removeTask drops exactly that task`() {
        val doc = addTask(addTask(EMPTY_TASKS, "A", null, "t1", "now"), "B", null, "t2", "now")
        val removed = removeTask(doc, "t1")
        assertEquals(listOf("t2"), removed.tasks.map { it.id })
    }
}
