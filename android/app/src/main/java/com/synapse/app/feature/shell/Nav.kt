package com.synapse.app.feature.shell

import androidx.annotation.StringRes
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
import androidx.compose.material.icons.filled.Face
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.MailOutline
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Share
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material.icons.filled.Star
import androidx.compose.ui.graphics.vector.ImageVector
import com.synapse.app.R

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
 * (`src/components/shell/nav.ts`). [route] is the `NavHost` route, [labelRes] is a string
 * resource shown as the bottom-nav/hub label and top-bar title (a resource rather than a plain
 * `String` so every render site resolves it through `stringResource`, picking up the student's
 * locale), and [icon] comes from the bundled `material-icons-core` set (no extended icon-pack
 * dependency is wired up yet, so choices are the closest available glyph rather than an exact
 * match to the web's `lucide-react` icons).
 */
data class StudentDestination(
    val route: String,
    @StringRes val labelRes: Int,
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
    StudentDestination(DASHBOARD_ROUTE, R.string.nav_today, Icons.Filled.Home),
    StudentDestination(LIBRARY_ROUTE, R.string.nav_library, Icons.AutoMirrored.Filled.List),
    StudentDestination(QUESTION_BANK_ROUTE, R.string.nav_questions, Icons.Filled.CheckCircle),
    StudentDestination(RESOURCES_ROUTE, R.string.nav_resources, Icons.Filled.Info),
    StudentDestination(MORE_ROUTE, R.string.nav_more, Icons.Filled.MoreVert),
)

/** One labelled section of [MoreHubScreen], mirroring one [NavGroup] of the web's `studentNav`. */
data class MoreGroup(
    @StringRes val labelRes: Int,
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
        labelRes = R.string.nav_group_overview,
        items = listOf(
            StudentDestination("university", R.string.nav_university, Icons.Filled.LocationOn),
            StudentDestination("calendar", R.string.nav_calendar, Icons.Filled.DateRange),
        ),
    ),
    MoreGroup(
        labelRes = R.string.nav_group_study,
        items = listOf(
            StudentDestination("adaptive", R.string.nav_adaptive_study, Icons.AutoMirrored.Filled.ArrowForward),
            StudentDestination("practical", R.string.nav_practical, Icons.Filled.Build),
            StudentDestination("essays", R.string.nav_essay_questions, Icons.Filled.Edit),
            StudentDestination("taxonomy", R.string.nav_medical_taxonomy, Icons.Filled.Search),
        ),
    ),
    MoreGroup(
        labelRes = R.string.nav_group_plan,
        items = listOf(
            StudentDestination("performance", R.string.nav_performance, Icons.Filled.Star),
            StudentDestination("maristanas", R.string.nav_build_maristanas, Icons.Filled.AddCircle),
        ),
    ),
    MoreGroup(
        labelRes = R.string.nav_group_workspace,
        items = listOf(
            StudentDestination("whiteboard", R.string.nav_whiteboard, Icons.Filled.Create),
            StudentDestination("notebook", R.string.nav_notebook, Icons.Filled.MailOutline),
            StudentDestination(FLASHCARDS_ROUTE, R.string.nav_flashcards, Icons.Filled.Refresh),
            StudentDestination("minigames", R.string.nav_minigames, Icons.Filled.PlayArrow),
            StudentDestination("study-together", R.string.nav_study_together, Icons.Filled.Person),
            StudentDestination("parties", R.string.nav_parties, Icons.Filled.Face),
            StudentDestination("shares", R.string.nav_my_documents, Icons.Filled.Share),
        ),
    ),
    MoreGroup(
        labelRes = R.string.nav_group_account,
        items = listOf(
            StudentDestination("account", R.string.nav_manage_account, Icons.Filled.AccountCircle),
            StudentDestination("billing", R.string.nav_billing, Icons.Filled.ShoppingCart),
            StudentDestination("notifications", R.string.nav_notifications, Icons.Filled.Notifications),
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
