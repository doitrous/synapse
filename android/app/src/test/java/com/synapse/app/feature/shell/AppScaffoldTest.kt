package com.synapse.app.feature.shell

import androidx.compose.material3.Text
import androidx.compose.ui.semantics.SemanticsActions
import androidx.compose.ui.semantics.getOrNull
import androidx.compose.ui.test.SemanticsNodeInteraction
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.assertTextEquals
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.synapse.app.design.SynapseTheme
import com.synapse.app.design.ThemeChoice
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/**
 * Exercises [AppScaffold]'s top bar title, bottom nav, drawer, and placeholder routing. Uses a
 * plain (non-Hilt) `createComposeRule()` host, so [AppScaffold]'s `dashboardContent` is
 * overridden with a Hilt-free stand-in here — the real `DashboardScreen` resolves its
 * `@HiltViewModel` via `hiltViewModel()`, which needs a Hilt-aware host activity and is
 * exercised instead by [com.synapse.app.feature.dashboard.DashboardViewModelTest] plus
 * `:app:assembleDebug`.
 */
@RunWith(RobolectricTestRunner::class)
class AppScaffoldTest {

    @get:Rule
    val composeTestRule = createComposeRule()

    private fun setScaffold(onThemeChange: (ThemeChoice) -> Unit = {}) {
        composeTestRule.setContent {
            val navController = rememberNavController()
            SynapseTheme(ThemeChoice.Light) {
                AppScaffold(
                    navController = navController,
                    themeChoice = ThemeChoice.Light,
                    onThemeChange = onThemeChange,
                    dashboardContent = { Text("Dashboard") },
                )
            }
        }
    }

    /**
     * Invokes a node's `OnClick` semantics action directly instead of [performClick]'s touch-based
     * dispatch. [ModalNavigationDrawer][androidx.compose.material3.ModalNavigationDrawer] positions
     * its `drawerContent` via a runtime offset that opens once [drawerState][androidx.compose.material3.DrawerState]
     * transitions to `Open`; under Robolectric, synthetic touch input dispatched at that
     * post-open, correctly-reported position doesn't reliably reach the drawer's content (a known
     * Robolectric limitation with drawer-style offset/translated layouts — see e.g.
     * robolectric/robolectric#5102 and #932 for the same gap on the View-system `DrawerLayout`).
     * The node's semantics config still exposes a live `OnClick` action reflecting the exact same
     * click handler a real touch would invoke, so calling it directly still exercises real
     * production behavior; only the touch-simulation step is bypassed.
     */
    private fun SemanticsNodeInteraction.performDrawerItemClick() {
        val node = fetchSemanticsNode()
        val onClick = node.config.getOrNull(SemanticsActions.OnClick)
        checkNotNull(onClick) { "Node has no OnClick semantics action" }
        onClick.action?.invoke()
    }

    @Test
    fun rendersDashboardTitleOnStart() {
        setScaffold()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Dashboard")
    }

    @Test
    fun clickingABottomNavPlaceholderDestinationNavigatesToIt() {
        setScaffold()

        // "Library" is a placeholder destination (Task 6 only builds Dashboard). The drawer
        // (always present in the tree, just off-screen when closed) also has a "Library" entry,
        // so target the bottom nav one by tag rather than by text.
        composeTestRule.onNodeWithTag(bottomNavItemTag("library")).performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Library")
        composeTestRule.onNodeWithText("Coming soon").assertIsDisplayed()
    }

    @Test
    fun questionBankRouteRendersQbankContentSeam() {
        lateinit var navController: NavHostController
        composeTestRule.setContent {
            navController = rememberNavController()
            SynapseTheme(ThemeChoice.Light) {
                AppScaffold(
                    navController = navController,
                    themeChoice = ThemeChoice.Light,
                    onThemeChange = {},
                    dashboardContent = { Text("Dashboard") },
                    qbankContent = { Text("QBankStandIn") },
                )
            }
        }

        // Question Bank isn't in the curated bottom bar yet, so drive the
        // NavHost straight to its route and assert the seam — not the
        // PlaceholderScreen — renders.
        composeTestRule.runOnUiThread { navController.navigate(QUESTION_BANK_ROUTE) }

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Question Bank")
        composeTestRule.onNodeWithText("QBankStandIn").assertIsDisplayed()
    }

    @Test
    fun clickingTheThemeActionInvokesTheCallback() {
        var lastChoice: ThemeChoice? = null
        setScaffold(onThemeChange = { lastChoice = it })

        composeTestRule.onNodeWithTag(THEME_TOGGLE_TAG).performClick()

        assert(lastChoice != null) { "expected onThemeChange to be invoked" }
    }

    @Test
    fun hamburgerButtonIsDisplayedOnStartScreen() {
        setScaffold()

        composeTestRule.onNodeWithTag(NAV_DRAWER_BUTTON_TAG).assertIsDisplayed()
    }

    @Test
    fun openingDrawerAndClickingQuestionBankNavigatesToQbankContentSeam() {
        composeTestRule.setContent {
            val navController = rememberNavController()
            SynapseTheme(ThemeChoice.Light) {
                AppScaffold(
                    navController = navController,
                    themeChoice = ThemeChoice.Light,
                    onThemeChange = {},
                    dashboardContent = { Text("Dashboard") },
                    qbankContent = { Text("QBankStandIn") },
                )
            }
        }

        composeTestRule.onNodeWithTag(NAV_DRAWER_BUTTON_TAG).performClick()
        composeTestRule.waitForIdle()
        // The hamburger must actually open the drawer: the item is on-screen only when the
        // drawer is Open (it's translated off-screen while Closed). assertIsDisplayed is
        // bounds-based, so — unlike touch dispatch — it isn't subject to the Robolectric
        // limitation performDrawerItemClick works around, and it fails if the hamburger were
        // wired to a no-op or to close().
        composeTestRule.onNodeWithTag(drawerItemTag(QUESTION_BANK_ROUTE)).assertIsDisplayed()
        composeTestRule.onNodeWithTag(drawerItemTag(QUESTION_BANK_ROUTE)).performDrawerItemClick()
        composeTestRule.waitForIdle()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Question Bank")
        composeTestRule.onNodeWithText("QBankStandIn").assertIsDisplayed()
    }

    @Test
    fun openingDrawerAndClickingAPlaceholderDestinationNavigatesToIt() {
        setScaffold()

        composeTestRule.onNodeWithTag(NAV_DRAWER_BUTTON_TAG).performClick()
        composeTestRule.waitForIdle()
        // Confirm the hamburger actually opened the drawer (see the QBank drawer test).
        composeTestRule.onNodeWithTag(drawerItemTag("resources")).assertIsDisplayed()
        composeTestRule.onNodeWithTag(drawerItemTag("resources")).performDrawerItemClick()
        composeTestRule.waitForIdle()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Resources")
        composeTestRule.onNodeWithText("Coming soon").assertIsDisplayed()
    }
}
