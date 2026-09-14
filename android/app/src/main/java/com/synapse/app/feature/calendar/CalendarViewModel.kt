package com.synapse.app.feature.calendar

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.synapse.app.core.calendar.CalendarEvent
import com.synapse.app.core.calendar.CalendarLayer
import com.synapse.app.core.calendar.DEFAULT_WEEK_START
import com.synapse.app.core.calendar.StudyBlock
import com.synapse.app.core.calendar.monthGrid
import com.synapse.app.core.calendar.toCalendarEvent
import com.synapse.app.core.calendar.weekDays
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import javax.inject.Inject

/** Month or week — which grid [CalendarUiState.Content.days] holds. */
enum class CalendarViewMode { WEEK, MONTH }

/** What [CalendarScreen] renders. */
sealed interface CalendarUiState {
    data object Loading : CalendarUiState

    data class Content(
        val anchor: LocalDate,
        /** From the view model's `now` seam — never the system clock directly, so "today" is deterministic in tests. */
        val today: LocalDate,
        val view: CalendarViewMode,
        /** The week's 7 days, or the month's 42-cell grid — see `core/calendar/CalendarGrid.kt`. */
        val days: List<LocalDate>,
        val eventsByDay: Map<LocalDate, List<CalendarEvent>>,
        val showCurriculum: Boolean,
        val showPersonal: Boolean,
        /** The student's own blocks, unmapped — so the screen can look one up by id to edit it (a [CalendarEvent] alone has no field the student can change back into a [StudyBlock]). */
        val blocks: List<StudyBlock>,
    ) : CalendarUiState {
        /** [eventsByDay] filtered by the visibility toggles, sorted by start time. */
        fun visibleEvents(day: LocalDate): List<CalendarEvent> =
            eventsByDay[day].orEmpty()
                .filter { if (it.layer == CalendarLayer.CURRICULUM) showCurriculum else showPersonal }
                .sortedBy { it.time }
    }
}

/**
 * Drives [CalendarScreen]: builds the week/month grid around an anchor date,
 * merges the (currently always-empty, see `CalendarRepository.curriculumSessions`)
 * published timetable with the student's own planned blocks into one event
 * map, and owns creating/editing/deleting a block — a thin pass-through to
 * [CalendarRepository], reloading afterward so [uiState] always reflects the
 * latest write. Mirrors `LibraryViewModel`'s load-on-mutate shape.
 */
@HiltViewModel
class CalendarViewModel @Inject constructor(
    private val repository: CalendarRepository,
) : ViewModel() {

    /** Overridable so "today"/"this week" is deterministic in tests — never read the system clock directly. */
    var now: () -> Instant = Instant::now

    private val _uiState = MutableStateFlow<CalendarUiState>(CalendarUiState.Loading)
    val uiState: StateFlow<CalendarUiState> = _uiState.asStateFlow()

    private var anchor: LocalDate? = null
    private var view: CalendarViewMode = CalendarViewMode.MONTH
    private var showCurriculum = true
    private var showPersonal = true

    init {
        load()
    }

    private fun today(): LocalDate = now().atZone(ZoneId.systemDefault()).toLocalDate()

    fun load() {
        viewModelScope.launch {
            _uiState.value = buildContent()
        }
    }

    private suspend fun buildContent(): CalendarUiState.Content {
        val today = today()
        val anchorDate = anchor ?: today.also { anchor = it }
        val days = if (view == CalendarViewMode.WEEK) weekDays(anchorDate, DEFAULT_WEEK_START) else monthGrid(anchorDate, DEFAULT_WEEK_START)

        val curriculumEvents = repository.curriculumSessions().map { it.toCalendarEvent() }
        val blocks = repository.blocks()
        val personalEvents = blocks.mapNotNull { it.toCalendarEvent() }
        val eventsByDay = (curriculumEvents + personalEvents).groupBy { it.date }

        return CalendarUiState.Content(
            anchor = anchorDate,
            today = today,
            view = view,
            days = days,
            eventsByDay = eventsByDay,
            showCurriculum = showCurriculum,
            showPersonal = showPersonal,
            blocks = blocks,
        )
    }

    fun setView(mode: CalendarViewMode) {
        view = mode
        load()
    }

    /** Move the anchor by [direction] weeks (week view) or months (month view). */
    fun shift(direction: Int) {
        val current = anchor ?: today()
        anchor = if (view == CalendarViewMode.WEEK) {
            current.plusWeeks(direction.toLong())
        } else {
            current.plusMonths(direction.toLong()).withDayOfMonth(1)
        }
        load()
    }

    fun goToToday() {
        anchor = today()
        load()
    }

    fun toggleCurriculum() {
        showCurriculum = !showCurriculum
        load()
    }

    fun togglePersonal() {
        showPersonal = !showPersonal
        load()
    }

    /** Create (new [block] id) or update (existing id) one of the student's own blocks. */
    fun saveBlock(block: StudyBlock) {
        viewModelScope.launch {
            repository.saveBlock(block, now())
            load()
        }
    }

    fun deleteBlock(id: String) {
        viewModelScope.launch {
            repository.deleteBlock(id, now())
            load()
        }
    }
}
