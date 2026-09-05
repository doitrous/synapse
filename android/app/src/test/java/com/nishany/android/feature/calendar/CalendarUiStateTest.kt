package com.nishany.android.feature.calendar

import com.nishany.android.core.calendar.EMPTY_TASKS
import com.nishany.android.core.calendar.Task
import com.nishany.android.core.sync.SyncStatus
import com.nishany.android.core.ui.UiState
import java.time.Instant
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/** [calendarUiState] in isolation -- same idiom as `PracticalUiStateTest`. */
class CalendarUiStateTest {

    private fun noRetry(): () -> Unit = { error("retry should not run in this test") }

    @Test
    fun `neither document has arrived yet is Loading`() {
        assertEquals(UiState.Loading, calendarUiState(null, null, SyncStatus.Idle, isOnline = true, retry = noRetry()))
    }

    @Test
    fun `one document missing but sync still running stays Loading`() {
        assertEquals(UiState.Loading, calendarUiState(EMPTY_TASKS, null, SyncStatus.Syncing, isOnline = true, retry = noRetry()))
    }

    @Test
    fun `both empty once sync completes is Empty`() {
        val result = calendarUiState(EMPTY_TASKS, emptyList(), SyncStatus.Done(0, Instant.now()), isOnline = true, retry = noRetry())
        assertTrue(result is UiState.Empty)
    }

    @Test
    fun `an unscheduled task alone is Content, not Empty`() {
        val doc = EMPTY_TASKS.copy(tasks = listOf(Task(id = "t1", groupId = "g", title = "Read chapter 3", createdAt = "now", updatedAt = "now")))
        val result = calendarUiState(doc, emptyList(), SyncStatus.Idle, isOnline = true, retry = noRetry())
        assertTrue(result is UiState.Content)
        assertEquals(1, (result as UiState.Content).data.unscheduled.size)
        assertTrue(result.data.agenda.isEmpty())
    }

    @Test
    fun `a dated task lands in the agenda, sorted with schedule blocks`() {
        val doc = EMPTY_TASKS.copy(
            tasks = listOf(Task(id = "t1", groupId = "g", title = "Submit logbook", date = "2024-05-03", createdAt = "now", updatedAt = "now")),
        )
        val result = calendarUiState(doc, emptyList(), SyncStatus.Idle, isOnline = true, retry = noRetry())
        assertTrue(result is UiState.Content)
        assertEquals(1, (result as UiState.Content).data.agenda.size)
        assertTrue(result.data.unscheduled.isEmpty())
    }

    @Test
    fun `a task with an unparseable date falls back to unscheduled rather than vanishing`() {
        val doc = EMPTY_TASKS.copy(
            tasks = listOf(Task(id = "t1", groupId = "g", title = "Bad date", date = "not-a-date", createdAt = "now", updatedAt = "now")),
        )
        val result = calendarUiState(doc, emptyList(), SyncStatus.Idle, isOnline = true, retry = noRetry())
        assertTrue(result is UiState.Content)
        val data = (result as UiState.Content).data
        assertEquals(0, data.agenda.size)
        assertEquals(1, data.unscheduled.size)
    }

    @Test
    fun `a failed sync with nothing cached yet is Error`() {
        val result = calendarUiState(null, null, SyncStatus.Failed("boom"), isOnline = false, retry = noRetry())
        assertTrue(result is UiState.Error)
        assertTrue((result as UiState.Error).message.contains("offline", ignoreCase = true))
    }
}
