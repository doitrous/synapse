package com.synapse.android.feature.focus

import android.content.Context
import com.synapse.android.core.calendar.AgendaSnapshotItem
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

/**
 * The device-local agenda snapshot [FocusCalendarWidget] renders from.
 *
 * The same minimal, un-synced `SharedPreferences` pattern as its sibling
 * [FocusTasksStore] -- and for the widget the same *reason*: a Glance
 * `provideGlance` runs inside the app's process but must not open Room,
 * because [com.synapse.android.core.cache.CortexDatabase] permits only one
 * instance over its file and [com.synapse.android.AppGraph] already holds it.
 * So the app precomputes the next few agenda entries whenever the calendar
 * data changes (see [com.synapse.android.AppGraph]'s snapshot collector) and
 * drops them here; the widget only reads.
 *
 * Unlike [FocusTasksStore] this exposes no `StateFlow`: nothing in the app
 * observes it -- the widget reads [items] once per `provideGlance`, and the
 * app is the sole writer.
 */
class CalendarWidgetStore(context: Context) {
    private val prefs = context.applicationContext.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    private val json = Json { ignoreUnknownKeys = true }

    fun items(): List<AgendaSnapshotItem> {
        val raw = prefs.getString(KEY, null) ?: return emptyList()
        return runCatching { json.decodeFromString<List<AgendaSnapshotItem>>(raw) }.getOrDefault(emptyList())
    }

    fun write(items: List<AgendaSnapshotItem>) {
        prefs.edit().putString(KEY, json.encodeToString(items)).apply()
    }

    private companion object {
        const val PREFS_NAME = "synapse-focus-calendar"
        const val KEY = "agenda"
    }
}
