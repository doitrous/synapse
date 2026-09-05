package com.nishany.android.feature.calendar

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.nishany.android.core.BACKGROUND_WORK_TAG
import com.nishany.android.core.ConnectivityMonitor
import com.nishany.android.core.CortexJson
import com.nishany.android.core.backgroundWorkScope
import com.nishany.android.core.cache.LocalStore
import com.nishany.android.core.calendar.AgendaItem
import com.nishany.android.core.calendar.CALENDAR_TASKS_KEY
import com.nishany.android.core.calendar.EMPTY_TASKS
import com.nishany.android.core.calendar.MODULE_SCHEDULES_KEY
import com.nishany.android.core.calendar.TaskDoc
import com.nishany.android.core.calendar.addTask as addTaskFold
import com.nishany.android.core.calendar.flattenPublishedSchedule
import com.nishany.android.core.calendar.removeTask as removeTaskFold
import com.nishany.android.core.calendar.toggleTask as toggleTaskFold
import com.nishany.android.core.sync.SyncEngine
import com.nishany.android.core.sync.SyncStatus
import com.nishany.android.core.ui.EmptyConfig
import com.nishany.android.core.ui.UiState
import java.time.Instant
import java.time.LocalDateTime
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock

/** [AgendaItem]s with no date (unscheduled tasks) first, then every dated item oldest-first. */
data class CalendarUi(
    val unscheduled: List<AgendaItem.TaskEntry>,
    val agenda: List<AgendaItem>,
)

/**
 * The Calendar (parity item G9): the student's published timetable
 * ([MODULE_SCHEDULES_KEY], catalogue-synced, read-only) plus their own task
 * list ([CALENDAR_TASKS_KEY], user-owned, read-write), combined into one
 * agenda. See [com.nishany.android.core.calendar.flattenPublishedSchedule]'s
 * doc for the one thing this does not do that the web does: scope the
 * timetable to the student's own university/year.
 *
 * Task mutation follows [com.nishany.android.feature.notebook.NotebookViewModel]'s
 * read-fold-write idiom -- see that class's doc.
 */
class CalendarViewModel(
    private val store: LocalStore,
    private val sync: SyncEngine,
    connectivity: ConnectivityMonitor? = null,
) : ViewModel() {
    private val backgroundScope = backgroundWorkScope("CalendarViewModel")
    private val mutation = Mutex()

    private val tasks: StateFlow<TaskDoc?> = store.documentFlow(CALENDAR_TASKS_KEY)
        .map { doc -> doc?.json?.let { decodeTasks(it) } }
        .stateIn(backgroundScope, SharingStarted.Eagerly, null)

    private val schedule: StateFlow<List<AgendaItem.Schedule>?> = store.documentFlow(MODULE_SCHEDULES_KEY)
        .map { doc -> doc?.json?.let { runCatching { flattenPublishedSchedule(it) }.getOrDefault(emptyList()) } }
        .stateIn(backgroundScope, SharingStarted.Eagerly, null)

    val uiState: StateFlow<UiState<CalendarUi>> =
        combine(tasks, schedule, sync.status, connectivity?.isOnline ?: flowOf(true)) { taskDoc, scheduleItems, status, online ->
            calendarUiState(taskDoc, scheduleItems, status, online, retry = ::retrySync)
        }.stateIn(backgroundScope, SharingStarted.Eagerly, UiState.Loading)

    private val _saveFailed = MutableStateFlow(false)
    val saveFailed: StateFlow<Boolean> = _saveFailed.asStateFlow()

    /** [date] is `YYYY-MM-DD`, or null for an unscheduled task. */
    fun addTask(title: String, date: String?) {
        val id = "task-${millisBase36()}"
        mutate { current -> addTaskFold(current, title, date, id, nowIso()) }
    }

    fun toggleTask(id: String) {
        mutate { current -> toggleTaskFold(current, id, nowIso()) }
    }

    fun removeTask(id: String) {
        mutate { current -> removeTaskFold(current, id) }
    }

    private fun mutate(transform: (TaskDoc) -> TaskDoc) {
        backgroundScope.launch {
            mutation.withLock {
                try {
                    val current = loadTasks()
                    val updated = transform(current)
                    sync.write(CALENDAR_TASKS_KEY, CortexJson.encodeToString(TaskDoc.serializer(), updated))
                } catch (e: CancellationException) {
                    throw e
                } catch (e: Exception) {
                    Log.e(BACKGROUND_WORK_TAG, "CalendarViewModel: a student's change was not saved", e)
                    _saveFailed.value = true
                }
            }
        }
    }

    private suspend fun loadTasks(): TaskDoc =
        store.document(CALENDAR_TASKS_KEY)?.json?.let { decodeTasks(it) } ?: EMPTY_TASKS

    private fun decodeTasks(json: String): TaskDoc? = runCatching { CortexJson.decodeFromString(TaskDoc.serializer(), json) }.getOrNull()

    fun acknowledgeSaveFailure() {
        _saveFailed.value = false
    }

    private fun retrySync() {
        backgroundScope.launch { sync.refresh() }
    }

    private fun nowIso(): String = Instant.now().toString()

    private fun millisBase36(): String = java.lang.Long.toString(System.currentTimeMillis(), 36)

    override fun onCleared() {
        backgroundScope.cancel()
    }

    companion object {
        fun factory(store: LocalStore, sync: SyncEngine, connectivity: ConnectivityMonitor) = viewModelFactory {
            initializer { CalendarViewModel(store, sync, connectivity) }
        }
    }
}

/**
 * The pure fold behind [CalendarViewModel.uiState]. `null` for either input
 * means that document has not come back from a sync pass yet; both must have
 * landed (or the sync pass must have finished, or failed) before this
 * resolves out of [UiState.Loading] -- the same "local cache already
 * answered, or a completed pass found nothing" split as
 * [com.nishany.android.feature.notebook.notebookUiState].
 */
internal fun calendarUiState(
    taskDoc: TaskDoc?,
    scheduleItems: List<AgendaItem.Schedule>?,
    syncStatus: SyncStatus,
    isOnline: Boolean,
    retry: () -> Unit,
): UiState<CalendarUi> {
    val bothLoaded = taskDoc != null && scheduleItems != null
    val settled = bothLoaded || syncStatus is SyncStatus.Done
    if (!settled) {
        return when {
            syncStatus is SyncStatus.Failed -> UiState.Error(
                message = if (isOnline) {
                    "Couldn't reach Nishany. Check your connection and try again."
                } else {
                    "You're offline. Connect and try again."
                },
                retry = retry,
            )
            else -> UiState.Loading
        }
    }

    // A task whose `date` is set but will not parse (corrupted by some other
    // client, or a format this build does not yet read) falls back to
    // unscheduled rather than vanishing from both lists -- the student's task
    // still exists in the document either way, so the one wrong outcome is
    // silently dropping it from view entirely.
    val tasks = taskDoc?.tasks.orEmpty()
    val dated = mutableListOf<AgendaItem.TaskEntry>()
    val unscheduled = mutableListOf<AgendaItem.TaskEntry>()
    for (task in tasks) {
        val start = if (task.date.isNullOrBlank()) null else parseTaskStart(task)
        if (start != null) dated += AgendaItem.TaskEntry(task, start) else unscheduled += AgendaItem.TaskEntry(task, LocalDateTime.MIN)
    }
    val agenda = (scheduleItems.orEmpty() + dated).sortedBy { it.start }

    if (agenda.isEmpty() && unscheduled.isEmpty()) {
        return UiState.Empty(
            EmptyConfig(
                title = "Your timetable will appear here",
                description = "Published lectures and exams show up here, alongside anything you add yourself.",
            ),
        )
    }
    return UiState.Content(CalendarUi(unscheduled = unscheduled, agenda = agenda))
}

private fun parseTaskStart(task: com.nishany.android.core.calendar.Task): LocalDateTime? {
    val date = task.date ?: return null
    return runCatching {
        val day = java.time.LocalDate.parse(date)
        val time = task.time?.let { runCatching { java.time.LocalTime.parse(it) }.getOrNull() } ?: java.time.LocalTime.MIDNIGHT
        LocalDateTime.of(day, time)
    }.getOrNull()
}
