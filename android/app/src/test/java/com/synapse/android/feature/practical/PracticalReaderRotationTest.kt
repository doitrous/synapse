package com.synapse.android.feature.practical

import android.content.Context
import androidx.activity.ComponentActivity
import androidx.compose.ui.test.isToggleable
import androidx.compose.ui.test.junit4.StateRestorationTester
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.compose.ui.test.onFirst
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.ViewModelStore
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import com.synapse.android.core.api.SynapseApi
import com.synapse.android.core.cache.CortexDatabase
import com.synapse.android.core.cache.LocalStore
import com.synapse.android.core.model.LedgerDecoder
import com.synapse.android.core.model.Practical
import com.synapse.android.core.sync.SyncEngine
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withTimeout
import okhttp3.OkHttpClient
import okhttp3.mockwebserver.Dispatcher
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import okhttp3.mockwebserver.RecordedRequest
import org.junit.After
import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/**
 * What a rotation and a back gesture do to a station being sat.
 *
 * The empirical finding behind both fixes: a configuration change destroys
 * and rebuilds the composition, so anything in a plain `remember` is gone and
 * every `LaunchedEffect` runs again -- but the ViewModel is *not* gone,
 * because it belongs to the navigation entry's retained `ViewModelStore`.
 * The run itself was surviving the rotation; what threw it away was the
 * reader's re-run `LaunchedEffect` calling `openStation` on a station that
 * was already open. See [PracticalViewModelTest] for that half; this file
 * covers the composition's own state and the back gesture.
 */
@RunWith(RobolectricTestRunner::class)
class PracticalReaderRotationTest {

    @get:Rule val composeTestRule = createAndroidComposeRule<ComponentActivity>()

    private lateinit var server: MockWebServer
    private lateinit var database: CortexDatabase
    private lateinit var store: LocalStore
    private lateinit var sync: SyncEngine
    private val viewModelStore = ViewModelStore()

    @Before fun setUp() {
        server = MockWebServer()
        server.dispatcher = object : Dispatcher() {
            override fun dispatch(request: RecordedRequest) =
                MockResponse().setResponseCode(200).setBody("""{"ok":true}""")
        }
        server.start()

        val context = ApplicationProvider.getApplicationContext<Context>()
        database = Room.inMemoryDatabaseBuilder(context, CortexDatabase::class.java).build()
        store = LocalStore(database)
        sync = SyncEngine(
            SynapseApi(
                baseUrl = server.url("/").toString().trimEnd('/'),
                client = OkHttpClient(),
                tokenProvider = { "token" },
            ),
            store,
        )
    }

    @After fun tearDown() {
        // Clear the store -- and with it the ViewModel's scope -- before the
        // database goes. A collector still reading a closed Room database
        // throws on a background coroutine, and an exception with no test
        // left to catch it surfaces against whichever test runs next.
        viewModelStore.clear()
        server.shutdown()
        database.close()
    }

    private fun station(): Pair<Practical, PracticalViewModel> = runBlocking {
        store.replaceLedger(
            LedgerDecoder.decode(
                """
                [{"id":"os-1","kind":"practical","status":"Published","subjectId":"cvs","title":"Station",
                  "fields":{"Type":"OSCE station","Difficulty":"Moderate","Duration":"8","Marks":"20"},
                  "practicalData":{"candidateInstructions":"Instructions",
                    "markSections":[{"id":"sec1","title":"Section","items":["Wash your hands"]}],
                    "decisions":[],"questions":[]}}]
                """.trimIndent(),
            ).items,
        )
        val viewModel = ViewModelProvider(
            viewModelStore,
            PracticalViewModel.factory(store, sync),
        )[PracticalViewModel::class.java]
        val item = withTimeout(5_000) { viewModel.items.first { it.size == 1 } }.single()
        item to viewModel
    }

    @Test
    fun `the tab a student is on survives a configuration change`() {
        val (practical, viewModel) = station()
        val restorer = StateRestorationTester(composeTestRule)
        restorer.setContent {
            PracticalReaderScreen(practical = practical, viewModel = viewModel, onExit = {})
        }

        // The mark scheme lives behind the second tab, so its text is the
        // cheapest proof of which tab is showing.
        composeTestRule.onNodeWithText("Wash your hands").assertDoesNotExist()
        composeTestRule.onNodeWithText("Examiner & Actor").performClick()
        composeTestRule.onNodeWithText("Wash your hands").assertExists()

        restorer.emulateSavedInstanceStateRestore()

        composeTestRule.onNodeWithText("Wash your hands").assertExists()
    }

    @Test
    fun `the back gesture leaves the station without banking it`() {
        val (practical, viewModel) = station()
        var exited = false
        composeTestRule.setContent {
            PracticalReaderScreen(practical = practical, viewModel = viewModel, onExit = { exited = true })
        }
        composeTestRule.onNodeWithText("Examiner & Actor").performClick()
        // The tick is on the checkbox, not on its label.
        composeTestRule.onAllNodes(isToggleable()).onFirst().performClick()
        composeTestRule.waitForIdle()
        assertTrue("the tick must land, or the test proves nothing", viewModel.ticks.value.isNotEmpty())

        composeTestRule.activityRule.scenario.onActivity { it.onBackPressedDispatcher.onBackPressed() }
        composeTestRule.waitForIdle()

        // The system gesture must reach this screen and take the same way out
        // the on-screen "Back" takes: clock stopped, run dropped, nothing
        // written. Without a BackHandler it went past the reader entirely and
        // left the ticker running for the life of the process.
        assertTrue("back must leave the reader", exited)
        assertTrue("and abandon the run", viewModel.ticks.value.isEmpty())
        assertFalse(
            "abandoning must write nothing",
            runBlocking { store.outbox().any { it.key.startsWith("synapse.practical") } },
        )
    }
}
