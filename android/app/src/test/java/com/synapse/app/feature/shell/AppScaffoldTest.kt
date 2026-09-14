package com.synapse.app.feature.shell

import androidx.compose.material3.Text
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.assertTextEquals
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performScrollTo
import androidx.navigation.compose.rememberNavController
import com.synapse.app.design.SynapseTheme
import com.synapse.app.design.ThemeChoice
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

/**
 * Exercises [AppScaffold]'s top bar title, 5-tab bottom nav (Today/Library/Questions/
 * Resources/More), the "More" hub, and placeholder routing. Uses a plain (non-Hilt)
 * `createComposeRule()` host, so [AppScaffold]'s `dashboardContent` is overridden with a
 * Hilt-free stand-in here — the real `DashboardScreen` resolves its `@HiltViewModel` via
 * `hiltViewModel()`, which needs a Hilt-aware host activity and is exercised instead by
 * [com.synapse.app.feature.dashboard.DashboardViewModelTest] plus `:app:assembleDebug`.
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
                    qbankContent = { Text("QBankStandIn") },
                    flashcardsContent = { Text("FlashcardsStandIn") },
                    libraryContent = { Text("LibraryStandIn") },
                    resourcesContent = { Text("ResourcesStandIn") },
                    taxonomyContent = { Text("TaxonomyStandIn") },
                    essaysContent = { Text("EssaysStandIn") },
                    practicalContent = { Text("PracticalStandIn") },
                    performanceContent = { Text("PerformanceStandIn") },
                    adaptiveContent = { Text("AdaptiveStandIn") },
                    notebookContent = { Text("NotebookStandIn") },
                    whiteboardContent = { Text("WhiteboardStandIn") },
                    calendarContent = { Text("CalendarStandIn") },
                    universityContent = { Text("UniversityStandIn") },
                    accountContent = { Text("AccountStandIn") },
                    billingContent = { Text("BillingStandIn") },
                    maristanasContent = { Text("MaristanasStandIn") },
                    minigamesContent = { Text("MinigamesStandIn") },
                    studyTogetherContent = { Text("StudyTogetherStandIn") },
                    sharesContent = { Text("SharesStandIn") },
                )
            }
        }
    }

    @Test
    fun rendersTodayTitleAndDashboardOnStart() {
        setScaffold()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Today")
        composeTestRule.onNodeWithText("Dashboard").assertIsDisplayed()
    }

    @Test
    fun clickingTheLibraryTabRendersLibraryContentSeam() {
        setScaffold()

        composeTestRule.onNodeWithTag(bottomNavItemTag(LIBRARY_ROUTE)).performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Library")
        composeTestRule.onNodeWithText("LibraryStandIn").assertIsDisplayed()
    }

    @Test
    fun clickingTheResourcesTabRendersResourcesContentSeam() {
        setScaffold()

        composeTestRule.onNodeWithTag(bottomNavItemTag(RESOURCES_ROUTE)).performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Resources")
        composeTestRule.onNodeWithText("ResourcesStandIn").assertIsDisplayed()
    }

    @Test
    fun clickingTheQuestionsTabRendersQbankContentSeam() {
        setScaffold()

        composeTestRule.onNodeWithTag(bottomNavItemTag(QUESTION_BANK_ROUTE)).performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Questions")
        composeTestRule.onNodeWithText("QBankStandIn").assertIsDisplayed()
    }

    @Test
    fun clickingTheMoreTabShowsTheHub() {
        setScaffold()

        composeTestRule.onNodeWithTag(bottomNavItemTag(MORE_ROUTE)).performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("More")
        composeTestRule.onNodeWithTag(moreHubItemTag("calendar")).performScrollTo().assertIsDisplayed()
    }

    @Test
    fun moreHubListsEveryNonBottomDestinationAndTappingOneNavigatesToIt() {
        setScaffold()

        composeTestRule.onNodeWithTag(bottomNavItemTag(MORE_ROUTE)).performClick()

        // Every destination folded into the hub (Overview/Study/Plan/Workspace/Account) must
        // actually be listed — not just the group it lives in.
        MORE_GROUPS.flatMap { it.items }.forEach { destination ->
            composeTestRule.onNodeWithTag(moreHubItemTag(destination.route))
                .performScrollTo()
                .assertIsDisplayed()
        }

        // Tapping one navigates to it. Every hub destination now has a real
        // content seam wired (no placeholders remain), so this verifies the
        // navigation itself lands on the tapped destination's content.
        composeTestRule.onNodeWithTag(moreHubItemTag("study-together")).performScrollTo().performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Study Together")
        composeTestRule.onNodeWithText("StudyTogetherStandIn").assertIsDisplayed()
    }

    @Test
    fun tappingAdaptiveStudyInTheMoreHubRendersAdaptiveContentSeam() {
        setScaffold()

        composeTestRule.onNodeWithTag(bottomNavItemTag(MORE_ROUTE)).performClick()
        composeTestRule.onNodeWithTag(moreHubItemTag("adaptive")).performScrollTo().performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Adaptive Study")
        composeTestRule.onNodeWithText("AdaptiveStandIn").assertIsDisplayed()
    }

    @Test
    fun tappingMyDocumentsInTheMoreHubRendersSharesContentSeam() {
        setScaffold()

        composeTestRule.onNodeWithTag(bottomNavItemTag(MORE_ROUTE)).performClick()
        composeTestRule.onNodeWithTag(moreHubItemTag("shares")).performScrollTo().performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("My Documents")
        composeTestRule.onNodeWithText("SharesStandIn").assertIsDisplayed()
    }

    @Test
    fun tappingMinigamesInTheMoreHubRendersMinigamesContentSeam() {
        setScaffold()

        composeTestRule.onNodeWithTag(bottomNavItemTag(MORE_ROUTE)).performClick()
        composeTestRule.onNodeWithTag(moreHubItemTag("minigames")).performScrollTo().performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Minigames")
        composeTestRule.onNodeWithText("MinigamesStandIn").assertIsDisplayed()
    }

    @Test
    fun tappingBuildMaristanasInTheMoreHubRendersMaristanasContentSeam() {
        setScaffold()

        composeTestRule.onNodeWithTag(bottomNavItemTag(MORE_ROUTE)).performClick()
        composeTestRule.onNodeWithTag(moreHubItemTag("maristanas")).performScrollTo().performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Build Maristanas")
        composeTestRule.onNodeWithText("MaristanasStandIn").assertIsDisplayed()
    }

    @Test
    fun tappingBillingInTheMoreHubRendersBillingContentSeam() {
        setScaffold()

        composeTestRule.onNodeWithTag(bottomNavItemTag(MORE_ROUTE)).performClick()
        composeTestRule.onNodeWithTag(moreHubItemTag("billing")).performScrollTo().performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Billing")
        composeTestRule.onNodeWithText("BillingStandIn").assertIsDisplayed()
    }

    @Test
    fun tappingManageAccountInTheMoreHubRendersAccountContentSeam() {
        setScaffold()

        composeTestRule.onNodeWithTag(bottomNavItemTag(MORE_ROUTE)).performClick()
        composeTestRule.onNodeWithTag(moreHubItemTag("account")).performScrollTo().performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Manage account")
        composeTestRule.onNodeWithText("AccountStandIn").assertIsDisplayed()
    }

    @Test
    fun tappingUniversityInTheMoreHubRendersUniversityContentSeam() {
        setScaffold()

        composeTestRule.onNodeWithTag(bottomNavItemTag(MORE_ROUTE)).performClick()
        composeTestRule.onNodeWithTag(moreHubItemTag("university")).performScrollTo().performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("University")
        composeTestRule.onNodeWithText("UniversityStandIn").assertIsDisplayed()
    }

    @Test
    fun tappingCalendarInTheMoreHubRendersCalendarContentSeam() {
        setScaffold()

        composeTestRule.onNodeWithTag(bottomNavItemTag(MORE_ROUTE)).performClick()
        composeTestRule.onNodeWithTag(moreHubItemTag("calendar")).performScrollTo().performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Calendar")
        composeTestRule.onNodeWithText("CalendarStandIn").assertIsDisplayed()
    }

    @Test
    fun tappingWhiteboardInTheMoreHubRendersWhiteboardContentSeam() {
        setScaffold()

        composeTestRule.onNodeWithTag(bottomNavItemTag(MORE_ROUTE)).performClick()
        composeTestRule.onNodeWithTag(moreHubItemTag("whiteboard")).performScrollTo().performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Whiteboard")
        composeTestRule.onNodeWithText("WhiteboardStandIn").assertIsDisplayed()
    }

    @Test
    fun tappingNotebookInTheMoreHubRendersNotebookContentSeam() {
        setScaffold()

        composeTestRule.onNodeWithTag(bottomNavItemTag(MORE_ROUTE)).performClick()
        composeTestRule.onNodeWithTag(moreHubItemTag("notebook")).performScrollTo().performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Notebook")
        composeTestRule.onNodeWithText("NotebookStandIn").assertIsDisplayed()
    }

    @Test
    fun tappingPerformanceInTheMoreHubRendersPerformanceContentSeam() {
        setScaffold()

        composeTestRule.onNodeWithTag(bottomNavItemTag(MORE_ROUTE)).performClick()
        composeTestRule.onNodeWithTag(moreHubItemTag("performance")).performScrollTo().performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Performance")
        composeTestRule.onNodeWithText("PerformanceStandIn").assertIsDisplayed()
    }

    @Test
    fun tappingPracticalInTheMoreHubRendersPracticalContentSeam() {
        setScaffold()

        composeTestRule.onNodeWithTag(bottomNavItemTag(MORE_ROUTE)).performClick()
        composeTestRule.onNodeWithTag(moreHubItemTag("practical")).performScrollTo().performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Practical")
        composeTestRule.onNodeWithText("PracticalStandIn").assertIsDisplayed()
    }

    @Test
    fun tappingEssayQuestionsInTheMoreHubRendersEssaysContentSeam() {
        setScaffold()

        composeTestRule.onNodeWithTag(bottomNavItemTag(MORE_ROUTE)).performClick()
        composeTestRule.onNodeWithTag(moreHubItemTag("essays")).performScrollTo().performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Essay questions")
        composeTestRule.onNodeWithText("EssaysStandIn").assertIsDisplayed()
    }

    @Test
    fun tappingMedicalTaxonomyInTheMoreHubRendersTaxonomyContentSeam() {
        setScaffold()

        composeTestRule.onNodeWithTag(bottomNavItemTag(MORE_ROUTE)).performClick()
        composeTestRule.onNodeWithTag(moreHubItemTag("taxonomy")).performScrollTo().performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Medical Taxonomy")
        composeTestRule.onNodeWithText("TaxonomyStandIn").assertIsDisplayed()
    }

    @Test
    fun tappingFlashcardsInTheMoreHubRendersFlashcardsContentSeam() {
        setScaffold()

        composeTestRule.onNodeWithTag(bottomNavItemTag(MORE_ROUTE)).performClick()
        composeTestRule.onNodeWithTag(moreHubItemTag(FLASHCARDS_ROUTE)).performScrollTo().performClick()

        composeTestRule.onNodeWithTag(APP_BAR_TITLE_TAG).assertTextEquals("Flashcards")
        composeTestRule.onNodeWithText("FlashcardsStandIn").assertIsDisplayed()
    }

    @Test
    fun clickingTheThemeActionInvokesTheCallback() {
        var lastChoice: ThemeChoice? = null
        setScaffold(onThemeChange = { lastChoice = it })

        composeTestRule.onNodeWithTag(THEME_TOGGLE_TAG).performClick()

        assert(lastChoice != null) { "expected onThemeChange to be invoked" }
    }
}
