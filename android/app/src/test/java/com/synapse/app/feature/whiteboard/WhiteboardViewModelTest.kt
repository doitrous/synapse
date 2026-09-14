package com.synapse.app.feature.whiteboard

import com.synapse.app.core.api.SynapseApi
import com.synapse.app.core.cache.LocalStore
import com.synapse.app.core.cache.OutboxEntry
import com.synapse.app.core.model.AttemptRecord as ModelAttemptRecord
import com.synapse.app.core.model.Manifest
import com.synapse.app.core.model.SessionDto
import com.synapse.app.core.model.StateDoc
import com.synapse.app.core.sync.SyncEngine
import com.synapse.app.core.whiteboard.Point
import com.synapse.app.core.whiteboard.Size
import com.synapse.app.core.whiteboard.Tool
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import kotlinx.serialization.json.Json
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Test
import java.time.Instant

/**
 * [WhiteboardViewModel] built against a real [WhiteboardRepository] wired to
 * hand-written fakes — the same convention as `PerformanceViewModelTest`.
 */
@OptIn(ExperimentalCoroutinesApi::class)
class WhiteboardViewModelTest {

    private val dispatcher = StandardTestDispatcher()
    private val json = Json { ignoreUnknownKeys = true }
    private val now = Instant.parse("2026-08-29T12:00:00Z")

    @Before fun setUp() { Dispatchers.setMain(dispatcher) }
    @After fun tearDown() { Dispatchers.resetMain() }

    private fun viewModel(localStore: LocalStore = VmFakeLocalStore()): WhiteboardViewModel {
        val api = VmFakeSynapseApi()
        val syncEngine = SyncEngine(api, localStore, readableKeys = emptyList(), userStateKeys = emptyList())
        val repository = WhiteboardRepository(localStore, syncEngine, json)
        return WhiteboardViewModel(repository).apply { this.now = { this@WhiteboardViewModelTest.now } }
    }

    private fun content(viewModel: WhiteboardViewModel): WhiteboardUiState.Content {
        dispatcher.scheduler.advanceUntilIdle()
        return viewModel.uiState.value as WhiteboardUiState.Content
    }

    @Test
    fun `load produces a default board with nothing on it`() {
        val vm = viewModel()
        val state = content(vm)
        assertTrue(state.board.notes.isEmpty())
        assertEquals(Tool.Select, state.tool)
        assertEquals(false, state.canUndo)
    }

    @Test
    fun `adding a note selects it, opens the editor, and can be undone`() {
        val vm = viewModel()
        content(vm)
        vm.setViewport(Size(1000.0, 700.0))

        vm.addNoteAtCenter()
        val afterAdd = content(vm)
        assertEquals(1, afterAdd.board.notes.size)
        assertEquals(afterAdd.board.notes.single().id, afterAdd.selectedNoteId)
        assertEquals(afterAdd.board.notes.single().id, afterAdd.editingNoteId)
        assertTrue(afterAdd.canUndo)

        vm.undo()
        val afterUndo = content(vm)
        assertTrue(afterUndo.board.notes.isEmpty())
        assertTrue(afterUndo.canRedo)

        vm.redo()
        assertEquals(1, content(vm).board.notes.size)
    }

    @Test
    fun `dragging a note commits once at the end, not per frame`() {
        val vm = viewModel()
        content(vm)
        vm.setViewport(Size(1000.0, 700.0))
        vm.addNoteAtCenter()
        val note = content(vm).board.notes.single()
        val revisionBeforeDrag = content(vm).activeBoard.revision

        vm.beginNoteDrag(note.id)
        vm.dragNoteTo(note.id, Point(500.0, 500.0))
        vm.dragNoteTo(note.id, Point(510.0, 505.0))
        val midDrag = content(vm)
        // Live-updated in memory, but not yet committed as a new revision.
        assertEquals(510.0, midDrag.board.notes.single().x, 0.0)
        assertEquals(revisionBeforeDrag, midDrag.activeBoard.revision)

        vm.commitDrag()
        val afterDrag = content(vm)
        assertEquals(revisionBeforeDrag + 1, afterDrag.activeBoard.revision)
        assertEquals(510.0, afterDrag.board.notes.single().x, 0.0)
    }

    @Test
    fun `tapping a note twice opens its editor, and tapping a second note while linking connects them`() {
        val vm = viewModel()
        content(vm)
        vm.setViewport(Size(1000.0, 700.0))
        vm.addNoteAtCenter()
        val first = content(vm).board.notes.single().id
        vm.stopEditingNote()
        vm.addNoteAtCenter()
        val second = content(vm).board.notes.first { it.id != first }.id
        vm.stopEditingNote()

        vm.tapNote(first)
        assertEquals(first, content(vm).selectedNoteId)
        vm.tapNote(first)
        assertEquals(first, content(vm).editingNoteId)
        vm.stopEditingNote()

        vm.startLinking(first)
        vm.tapNote(second)
        val linked = content(vm)
        assertEquals(1, linked.board.links.size)
        assertEquals(first, linked.board.links.single().from)
        assertEquals(second, linked.board.links.single().to)
        assertNull(linked.linkingFromNoteId)
    }

    @Test
    fun `a short pen stroke is discarded without leaving a stray undo entry`() {
        val vm = viewModel()
        content(vm)
        vm.setTool(Tool.Pen)
        vm.beginStroke(Point(10.0, 10.0))
        vm.endStroke()
        val state = content(vm)
        assertTrue(state.board.ink.orEmpty().isEmpty())
        assertEquals(false, state.canUndo)
    }

    @Test
    fun `a real pen stroke is committed and can be erased`() {
        val vm = viewModel()
        content(vm)
        vm.setTool(Tool.Pen)
        vm.beginStroke(Point(0.0, 0.0))
        vm.appendStrokePoint(Point(10.0, 10.0))
        vm.appendStrokePoint(Point(20.0, 0.0))
        vm.endStroke()
        assertEquals(1, content(vm).board.ink.orEmpty().size)

        vm.setTool(Tool.Eraser)
        vm.beginErase()
        vm.eraseAt(Point(10.0, 10.0))
        vm.endErase()
        assertTrue(content(vm).board.ink.orEmpty().isEmpty())
    }

    @Test
    fun `switching boards resets undo history and selection`() {
        val vm = viewModel()
        content(vm)
        vm.setViewport(Size(1000.0, 700.0))
        vm.addNoteAtCenter()
        assertTrue(content(vm).canUndo)

        vm.addBoard("Second board")
        val afterAdd = content(vm)
        assertEquals(2, afterAdd.collection.boards.size)
        assertTrue(afterAdd.board.notes.isEmpty())
        assertEquals(false, afterAdd.canUndo)
    }
}

// --- Fakes --------------------------------------------------------------------

private class VmFakeLocalStore : LocalStore {
    val userState = linkedMapOf<String, Triple<String, String?, String?>>()
    override suspend fun putCatalogue(key: String, updatedAt: String, json: String) {}
    override suspend fun catalogueUpdatedAt(key: String): String? = null
    override suspend fun getCatalogue(key: String): String? = null
    override suspend fun enqueue(key: String, json: String) {}
    override suspend fun pendingOutbox(): List<OutboxEntry> = emptyList()
    override suspend fun clearOutbox(key: String) {}
    override suspend fun putAttempts(items: List<ModelAttemptRecord>) {}
    override suspend fun attempts(month: String): List<ModelAttemptRecord> = emptyList()
    override suspend fun allAttempts(): List<ModelAttemptRecord> = emptyList()
    override suspend fun putUserState(key: String, json: String, savedAt: String?, serverUpdatedAt: String?) {
        userState[key] = Triple(json, savedAt, serverUpdatedAt)
    }
    override suspend fun getUserState(key: String): String? = userState[key]?.first
    override suspend fun userStateSavedAt(key: String): String? = userState[key]?.second
    override suspend fun clearAll() { userState.clear() }
}

private class VmFakeSynapseApi : SynapseApi {
    override suspend fun session(): SessionDto = SessionDto("u")
    override suspend fun manifest(): Manifest = emptyMap()
    override suspend fun getState(key: String): StateDoc = StateDoc(kotlinx.serialization.json.JsonNull)
    override suspend fun getUserState(key: String): StateDoc = StateDoc(kotlinx.serialization.json.JsonNull)
    override suspend fun putUserState(key: String, doc: StateDoc) {}
    override suspend fun getAttempts(month: String): List<ModelAttemptRecord> = emptyList()
    override suspend fun postAttempt(attempt: ModelAttemptRecord) {}
}
