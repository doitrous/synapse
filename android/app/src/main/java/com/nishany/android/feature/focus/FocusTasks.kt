package com.nishany.android.feature.focus

import android.content.Context
import java.util.UUID
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.encodeToString
import kotlinx.serialization.decodeFromString

/** One task a focus block can be pointed at. Deliberately just an id and a title -- see [FocusTasksStore]. */
@Serializable
data class FocusTask(val id: String, val title: String)

/**
 * A minimal, device-local task list for the Focus Timer's task picker.
 *
 * Intentionally not the web's `useTasks` (open/done, subject tags, sync):
 * this is a native-only stopgap so task-select has something to select
 * from, per this task's brief -- "build minimal task list now". No server
 * sync, no completion state; add/remove is the whole feature. Plain
 * `SharedPreferences`, the same device-local, un-synced pattern
 * [com.nishany.android.design.ThemePreference] already uses for a
 * per-device-only setting.
 */
class FocusTasksStore(context: Context) {
    private val prefs = context.applicationContext.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    private val json = Json { ignoreUnknownKeys = true }

    private val _tasks = MutableStateFlow(load())
    val tasks: StateFlow<List<FocusTask>> = _tasks.asStateFlow()

    fun add(title: String): String {
        val trimmed = title.trim()
        if (trimmed.isEmpty()) return ""
        val task = FocusTask(id = UUID.randomUUID().toString(), title = trimmed)
        _tasks.value = _tasks.value + task
        persist()
        return task.id
    }

    fun remove(id: String) {
        _tasks.value = _tasks.value.filterNot { it.id == id }
        persist()
    }

    private fun load(): List<FocusTask> {
        val raw = prefs.getString(KEY, null) ?: return emptyList()
        return runCatching { json.decodeFromString<List<FocusTask>>(raw) }.getOrDefault(emptyList())
    }

    private fun persist() {
        prefs.edit().putString(KEY, json.encodeToString(_tasks.value)).apply()
    }

    private companion object {
        const val PREFS_NAME = "synapse-focus-tasks"
        const val KEY = "tasks"
    }
}
