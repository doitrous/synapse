package com.synapse.app.feature.shell

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.List
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Create
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Star
import androidx.compose.ui.graphics.vector.ImageVector

/** The [NavHost][androidx.navigation.compose.NavHost] start route. */
const val DASHBOARD_ROUTE = "dashboard"

/** Task 6's Question Bank flow route (see [com.synapse.app.feature.qbank.QuestionBankRoot]). */
const val QUESTION_BANK_ROUTE = "question_bank"

/**
 * One entry in the student's primary navigation, mirroring the web app's
 * `studentNav` groups (`src/components/shell/nav.ts`) collapsed to the set
 * that ships on Android for this milestone. [route] is the `NavHost` route,
 * [label] is shown as the bottom-nav label and top-bar title, and [icon]
 * comes from the bundled `material-icons-core` set (no extended icon-pack
 * dependency is wired up yet, so choices are the closest available glyph
 * rather than an exact match to the web's `lucide-react` icons).
 */
data class StudentDestination(
    val route: String,
    val label: String,
    val icon: ImageVector,
)

/**
 * The student's primary destinations, in nav order. Only [DASHBOARD_ROUTE]
 * has real content (Task 6's Dashboard); every other route renders
 * [com.synapse.app.feature.placeholder.PlaceholderScreen] until its own
 * feature lands.
 */
val STUDENT_DESTINATIONS: List<StudentDestination> = listOf(
    StudentDestination(DASHBOARD_ROUTE, "Dashboard", Icons.Filled.Home),
    StudentDestination("library", "Library", Icons.AutoMirrored.Filled.List),
    StudentDestination(QUESTION_BANK_ROUTE, "Question Bank", Icons.Filled.CheckCircle),
    StudentDestination("flashcards", "Flashcards", Icons.Filled.Refresh),
    StudentDestination("resources", "Resources", Icons.Filled.Info),
    StudentDestination("notebook", "Notebook", Icons.Filled.Edit),
    StudentDestination("whiteboard", "Whiteboard", Icons.Filled.Create),
    StudentDestination("calendar", "Calendar", Icons.Filled.DateRange),
    StudentDestination("performance", "Performance", Icons.Filled.Star),
    StudentDestination("account", "Account", Icons.Filled.AccountCircle),
)

/**
 * The subset of [STUDENT_DESTINATIONS] surfaced in the bottom [NavigationBar]
 * — a full ten-item bar would be unusable, so this curates the destinations a
 * student reaches for most; the rest stay reachable once a drawer/rail lands.
 */
private val PRIMARY_ROUTES = setOf(DASHBOARD_ROUTE, "library", "flashcards", "calendar", "account")

val PRIMARY_DESTINATIONS: List<StudentDestination> =
    STUDENT_DESTINATIONS.filter { it.route in PRIMARY_ROUTES }
