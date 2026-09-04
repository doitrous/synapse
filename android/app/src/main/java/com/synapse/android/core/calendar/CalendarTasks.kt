package com.synapse.android.core.calendar

import kotlinx.serialization.Serializable

/** The whole document: a port of `TaskDoc` in `src/data/tasks.ts`, read and written by the web calendar's task list. */
const val CALENDAR_TASKS_KEY = "nishany.calendar.tasks.v1"

private const val DEFAULT_GROUP_ID = "group-default"
private const val DEFAULT_GROUP_TITLE = "My tasks"

@Serializable
data class TaskGroup(val id: String, val title: String, val createdAt: String)

@Serializable
data class Subtask(val id: String, val title: String, val done: Boolean = false)

/**
 * A student to-do, lighter than a [com.synapse.android.core.calendar.ScheduledBlock]:
 * no duration, an optional date, an optional checklist. A port of `Task` in
 * `src/data/tasks.ts`, minus `subtasks` editing (modelled for round-trip
 * fidelity, but this app's screen only edits title/date/done -- see
 * [com.synapse.android.core.notebook.Note]'s doc for the same reasoning: an
 * unmodelled *edit* is a risk, an unmodelled *field this app leaves alone* is
 * not).
 */
@Serializable
data class Task(
    val id: String,
    val groupId: String,
    val title: String,
    val details: String? = null,
    /** Local calendar date, `YYYY-MM-DD`. Absent = unscheduled. */
    val date: String? = null,
    /** `HH:MM`, local. Only meaningful with a date. */
    val time: String? = null,
    val done: Boolean = false,
    val subtasks: List<Subtask> = emptyList(),
    val createdAt: String,
    val updatedAt: String,
)

@Serializable
data class TaskDoc(
    val version: Int = 1,
    val groups: List<TaskGroup> = emptyList(),
    val tasks: List<Task> = emptyList(),
)

val EMPTY_TASKS = TaskDoc()

/** Every task this app creates lands in one default group -- see the class doc on why groups themselves are not a screen here. */
fun ensureDefaultGroup(doc: TaskDoc, at: String): TaskDoc =
    if (doc.groups.any { it.id == DEFAULT_GROUP_ID }) doc
    else doc.copy(groups = doc.groups + TaskGroup(DEFAULT_GROUP_ID, DEFAULT_GROUP_TITLE, at))

fun addTask(doc: TaskDoc, title: String, date: String?, id: String, at: String): TaskDoc {
    val withGroup = ensureDefaultGroup(doc, at)
    val task = Task(id = id, groupId = DEFAULT_GROUP_ID, title = title, date = date, createdAt = at, updatedAt = at)
    return withGroup.copy(tasks = withGroup.tasks + task)
}

fun toggleTask(doc: TaskDoc, id: String, at: String): TaskDoc =
    doc.copy(tasks = doc.tasks.map { if (it.id == id) it.copy(done = !it.done, updatedAt = at) else it })

fun removeTask(doc: TaskDoc, id: String): TaskDoc =
    doc.copy(tasks = doc.tasks.filterNot { it.id == id })
