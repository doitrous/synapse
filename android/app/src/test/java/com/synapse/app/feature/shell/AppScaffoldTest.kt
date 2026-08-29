package com.synapse.app.feature.shell

import androidx.compose.material3.Text
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.assertTextEquals
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.navigation.compose.rememberNavController
import com.synapse.app.design.SynapseTheme
import com.synapse.app.design.ThemeChoice
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/**
 * Exercises [AppScaffold]'s top bar title, bottom nav, and placeholder routing. Uses a
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

    @Test
    fun rendersDashboardTitleOnStart() {
        setScaffold()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Dashboard")
    }

    @Test
    fun clickingABottomNavPlaceholderDestinationNavigatesToIt() {
        setScaffold()

        // "Library" is a placeholder destination (Task 6 only builds Dashboard).
        composeTestRule.onNodeWithText("Library").performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Library")
        composeTestRule.onNodeWithText("Coming soon").assertIsDisplayed()
    }

    @Test
    fun clickingTheThemeActionInvokesTheCallback() {
        var lastChoice: ThemeChoice? = null
        setScaffold(onThemeChange = { lastChoice = it })

        composeTestRule.onNodeWithTag(THEME_TOGGLE_TAG).performClick()

        assert(lastChoice != null) { "expected onThemeChange to be invoked" }
    }
}
