package com.nishany.android.feature.focus

import org.junit.Assert.assertEquals
import org.junit.Test

/** [buildFocusNotificationContent] is the only pure logic in [FocusNotifier]'s file -- the rest is Android (NotificationManager, PendingIntent) and untested here, per this task's brief. */
class FocusNotificationTest {

    private val t0 = 1_700_000_000_000L

    @Test
    fun `countdown clock and no task -- generic title, remaining time`() {
        val state = start(setDurationMinutes(initialFocusSession(t0), 25, t0), t0)
        val ticked = tick(state, t0 + 60_000)
        val content = buildFocusNotificationContent(ticked, taskTitle = null)
        assertEquals("Focus block running", content.title)
        assertEquals("24:00", content.text)
    }

    @Test
    fun `count-up clock with a selected task -- title names it, text is elapsed time`() {
        val state = start(setMode(initialFocusSession(t0), FocusMode.COUNTUP, t0), t0)
        val ticked = tick(state, t0 + 65_000)
        val content = buildFocusNotificationContent(ticked, taskTitle = "Cardiology reading")
        assertEquals("Focusing on Cardiology reading", content.title)
        assertEquals("1:05", content.text)
    }
}
