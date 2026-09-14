package com.synapse.app.feature.shell

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.automirrored.filled.List
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material.icons.filled.AddCircle
import androidx.compose.material.icons.filled.Build
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Create
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.MailOutline
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material.icons.filled.Star
import androidx.compose.ui.graphics.vector.ImageVector

/** The [NavHost][androidx.navigation.compose.NavHost] start route — the "Today" tab. */
const val DASHBOARD_ROUTE = "dashboard"

/** The "Library" bottom tab's route (stays a [placeholder][com.synapse.app.feature.placeholder.PlaceholderScreen] this milestone). */
const val LIBRARY_ROUTE = "library"

/** Task 6's Question Bank flow route (see [com.synapse.app.feature.qbank.QuestionBankRoot]). */
const val QUESTION_BANK_ROUTE = "question_bank"

/** The "Resources" bottom tab's route (stays a placeholder this milestone). */
const val RESOURCES_ROUTE = "resources"

/** The "More" bottom tab's route — renders [MoreHubScreen], not a single feature. */
const val MORE_ROUTE = "more"

/** Plan 05 Task 4's Flashcards flow route (see [com.synapse.app.feature.flashcards.FlashcardsRoot]). Lives under [MoreHubScreen], not the bottom bar. */
const val FLASHCARDS_ROUTE = "flashcards"

/**
 * One entry in the student's navigation, mirroring a `NavItem` in the web app's `studentNav`
 * (`src/components/shell/nav.ts`). [route] is the `NavHost` route, [label] is shown as the
 * bottom-nav/hub label and top-bar title, and [icon] comes from the bundled
 * `material-icons-core` set (no extended icon-pack dependency is wired up yet, so choices are
 * the closest available glyph rather than an exact match to the web's `lucide-react` icons).
 */
data class StudentDestination(
    val route: String,
    val label: String,
    val icon: ImageVector,
)

/**
 * The 5 bottom-nav tabs, mirroring the production iOS app's `SignedInView.Destination`
 * (Today, Library, Questions, Resources, More). Only [DASHBOARD_ROUTE] and [QUESTION_BANK_ROUTE]
 * have real content today; [LIBRARY_ROUTE] and [RESOURCES_ROUTE] render
 * [com.synapse.app.feature.placeholder.PlaceholderScreen] until their features land.
 * [MORE_ROUTE] renders [MoreHubScreen], the hub for every other destination.
 */
val BOTTOM_DESTINATIONS: List<StudentDestination> = listOf(
    StudentDestination(DASHBOARD_ROUTE, "Today", Icons.Filled.Home),
    StudentDestination(LIBRARY_ROUTE, "Library", Icons.AutoMirrored.Filled.List),
    StudentDestination(QUESTION_BANK_ROUTE, "Questions", Icons.Filled.CheckCircle),
    StudentDestination(RESOURCES_ROUTE, "Resources", Icons.Filled.Info),
    StudentDestination(MORE_ROUTE, "More", Icons.Filled.MoreVert),
)

/** One labelled section of [MoreHubScreen], mirroring one [NavGroup] of the web's `studentNav`. */
data class MoreGroup(
    val label: String,
    val items: List<StudentDestination>,
)

/**
 * Everything that doesn't get one of the 5 [BOTTOM_DESTINATIONS] slots, grouped like the web
 * sidebar's `studentNav` (`nav.ts`): Overview, Study, Plan, Workspace, Account. [MoreHubScreen]
 * renders these groups in order; every route here is registered on the `NavHost` the same as a
 * bottom tab (see [ALL_DESTINATIONS]) and falls back to [PlaceholderScreen][com.synapse.app.feature.placeholder.PlaceholderScreen]
 * until its own feature lands.
 */
val MORE_GROUPS: List<MoreGroup> = listOf(
    MoreGroup(
        label = "Overview",
        items = listOf(
            StudentDestination("university", "University", Icons.Filled.LocationOn),
            StudentDestination("calendar", "Calendar", Icons.Filled.DateRange),
        ),
    ),
    MoreGroup(
        label = "Study",
        items = listOf(
            StudentDestination("adaptive", "Adaptive Study", Icons.AutoMirrored.Filled.ArrowForward),
            StudentDestination("practical", "Practical", Icons.Filled.Build),
            StudentDestination("essays", "Essay questions", Icons.Filled.Edit),
            StudentDestination("taxonomy", "Medical Taxonomy", Icons.Filled.Search),
        ),
    ),
    MoreGroup(
        label = "Plan",
        items = listOf(
            StudentDestination("performance", "Performance", Icons.Filled.Star),
            StudentDestination("maristanas", "Build Maristanas", Icons.Filled.AddCircle),
        ),
    ),
    MoreGroup(
        label = "Workspace",
        items = listOf(
            StudentDestination("whiteboard", "Whiteboard", Icons.Filled.Create),
            StudentDestination("notebook", "Notebook", Icons.Filled.MailOutline),
            StudentDestination(FLASHCARDS_ROUTE, "Flashcards", Icons.Filled.Refresh),
            StudentDestination("minigames", "Minigames", Icons.Filled.PlayArrow),
            StudentDestination("study-together", "Study Together", Icons.Filled.Person),
        ),
    ),
    MoreGroup(
        label = "Account",
        items = listOf(
            StudentDestination("account", "Manage account", Icons.Filled.AccountCircle),
            StudentDestination("billing", "Billing", Icons.Filled.ShoppingCart),
        ),
    ),
)

/**
 * Every route the `NavHost` must register: the 5 [BOTTOM_DESTINATIONS] plus every
 * [MoreGroup] item. This is the app's route registry — the top-bar title lookup and the
 * `NavHost` builder in [AppScaffold] both iterate this single list, so a route only needs to
 * be added once (to [BOTTOM_DESTINATIONS] or [MORE_GROUPS]) to be reachable, titled, and
 * routable.
 */
val ALL_DESTINATIONS: List<StudentDestination> =
    BOTTOM_DESTINATIONS + MORE_GROUPS.flatMap { it.items }
