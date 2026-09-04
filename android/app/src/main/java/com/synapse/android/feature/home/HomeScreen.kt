package com.synapse.android.feature.home

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.foundation.BorderStroke
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.minimumInteractiveComponentSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.synapse.android.AppGraph
import com.synapse.android.design.AssistantGlyph
import com.synapse.android.design.CalendarGlyph
import com.synapse.android.design.CortexColors
import com.synapse.android.design.CortexRadius
import com.synapse.android.design.DailyGlyph
import com.synapse.android.design.FlashcardsGlyph
import com.synapse.android.design.HistoryGlyph
import com.synapse.android.design.LibraryGlyph
import com.synapse.android.design.LocalCortex
import com.synapse.android.design.NotebookGlyph
import com.synapse.android.design.PerformanceGlyph
import com.synapse.android.design.PracticalGlyph
import com.synapse.android.design.QuestionBankGlyph
import com.synapse.android.design.ResourcesGlyph
import com.synapse.android.design.TerminologyGlyph
import com.synapse.android.design.Wordmark
import com.synapse.android.core.ui.StateHost
import com.synapse.android.core.ui.UiState

/**
 * The signed-in shell's landing tab -- built from [AppGraph] and wired to
 * whatever navigation the caller wants for its four tiles, mirroring how
 * [com.synapse.android.feature.qbank.PreviousSittingsScreen] is reachable from
 * `TopicChooserScreen` through a plain callback rather than a route this
 * screen would have to know the name of.
 */
@Composable
fun HomeRoute(
    graph: AppGraph,
    onOpenQuestionBank: () -> Unit,
    onOpenPractical: () -> Unit,
    onOpenDaily: () -> Unit,
    onOpenAccount: () -> Unit,
    onOpenPerformance: () -> Unit,
    onOpenNotebook: () -> Unit,
    onOpenCalendar: () -> Unit,
    onOpenTerminology: () -> Unit,
    onOpenAssistant: () -> Unit,
) {
    val viewModel: HomeViewModel = viewModel(
        factory = HomeViewModel.factory(graph.auth, graph.store, graph.sync, graph.connectivity),
    )
    val uiState by viewModel.uiState.collectAsState()
    HomeScreen(
        uiState = uiState,
        onOpenQuestionBank = onOpenQuestionBank,
        onOpenPractical = onOpenPractical,
        onOpenDaily = onOpenDaily,
        onOpenAccount = onOpenAccount,
        onOpenPerformance = onOpenPerformance,
        onOpenNotebook = onOpenNotebook,
        onOpenCalendar = onOpenCalendar,
        onOpenTerminology = onOpenTerminology,
        onOpenAssistant = onOpenAssistant,
    )
}

/**
 * A greeting, the day's own target, a resume card for a sitting still open,
 * the four doors the redesigned web dashboard leads with, and -- below that
 * -- what this tab already carried before the redesign.
 *
 * Ported top-down from the M3 web dashboard (`src/pages/student/Dashboard.tsx`,
 * `TodaysTargetHero.tsx`, `TargetSeed.tsx`, `ResumeSessionCard.tsx`,
 * `DashboardNavGrid.tsx`): header, serif greeting, the Midnight Seed hero
 * card, an optional resume card, then the Practice/Flashcards/Library/
 * Resources grid. Android has no Flashcards, Library or Resources screen yet
 * (see [ComingSoonDialog]) -- those three tiles show what they are and how
 * they'll count once a later milestone builds the screen, not a fabricated
 * one now. Practical, the daily question and previous sittings are real,
 * working Android surfaces the web dashboard doesn't carry at all, so they
 * stay -- moved under the new grid rather than dropped -- as [MoreGrid].
 *
 * Padding runs on `start`/`end`, never `left`/`right`, so the layout mirrors
 * correctly the day the app grows an Arabic locale -- see [Modifier.padding]
 * calls below.
 */
@Composable
fun HomeScreen(
    uiState: UiState<HomeUi>,
    onOpenQuestionBank: () -> Unit,
    onOpenPractical: () -> Unit,
    onOpenDaily: () -> Unit,
    onOpenAccount: () -> Unit,
    onOpenPerformance: () -> Unit,
    onOpenNotebook: () -> Unit,
    onOpenCalendar: () -> Unit,
    onOpenTerminology: () -> Unit,
    onOpenAssistant: () -> Unit,
) {
    val cortex = LocalCortex.current
    var comingSoon by remember { mutableStateOf<String?>(null) }

    // Blank (a spinner) while the ledger is still warming, rather than a
    // dashboard promising "0 questions" and "0 stations" for a beat before
    // the real counts land -- see HomeViewModel.uiState's own doc.
    StateHost(state = uiState, modifier = Modifier.fillMaxSize().background(cortex.paper)) { ui ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(start = 20.dp, end = 20.dp, top = 20.dp, bottom = 28.dp),
            verticalArrangement = Arrangement.spacedBy(18.dp),
        ) {
            HomeHeader(avatarInitial = ui.avatarInitial, onAvatarClick = onOpenAccount)

            Text(ui.greeting, style = MaterialTheme.typography.headlineLarge, color = cortex.ink)

            HeroTargetCard(ui = ui, onContinue = onOpenQuestionBank)

            ui.resume?.let { resume ->
                ResumeCard(resume = resume, onResume = onOpenQuestionBank)
            }

            DashboardNavGrid(
                ui = ui,
                onOpenQuestionBank = onOpenQuestionBank,
                onShowComingSoon = { comingSoon = it },
            )

            MoreGrid(
                ui = ui,
                onOpenPractical = onOpenPractical,
                onOpenDaily = onOpenDaily,
                onOpenPreviousSittings = onOpenQuestionBank,
                onOpenPerformance = onOpenPerformance,
                onOpenNotebook = onOpenNotebook,
                onOpenCalendar = onOpenCalendar,
                onOpenTerminology = onOpenTerminology,
                onOpenAssistant = onOpenAssistant,
            )
        }
    }

    comingSoon?.let { title ->
        ComingSoonDialog(title = title, onDismiss = { comingSoon = null })
    }
}

@Composable
private fun HomeHeader(avatarInitial: String, onAvatarClick: () -> Unit) {
    val cortex = LocalCortex.current
    Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
        Wordmark(height = 26.dp)
        Spacer(modifier = Modifier.weight(1f))
        Box(
            // minimumInteractiveComponentSize(), before the visual .size(34.dp),
            // is the same trick IconButton's own default relies on
            // (FocusTimerScreen.kt's 44dp Reset button) -- it pads the
            // clickable bounds out to the 48dp WCAG 2.5.5 floor without
            // touching the 34dp circle actually drawn.
            modifier = Modifier
                .minimumInteractiveComponentSize()
                .size(34.dp)
                .clip(CircleShape)
                .background(cortex.accentTint)
                .border(1.dp, cortex.accentLine, CircleShape)
                .clickable(onClick = onAvatarClick),
            contentAlignment = Alignment.Center,
        ) {
            Text(
                avatarInitial,
                fontSize = 13.sp,
                fontWeight = FontWeight.SemiBold,
                color = cortex.accentStrong,
            )
        }
    }
}

/** The Midnight Seed ring, today's status line, and the one action that keeps it moving -- a port of `TodaysTargetHero.tsx`. */
@Composable
private fun HeroTargetCard(ui: HomeUi, onContinue: () -> Unit) {
    val cortex = LocalCortex.current
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(CortexRadius.xxl))
            .background(cortex.surface)
            .border(1.dp, cortex.line, RoundedCornerShape(CortexRadius.xxl))
            .padding(18.dp),
        horizontalArrangement = Arrangement.spacedBy(18.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        TargetSeed(done = ui.todayCount, goal = ui.goal, diameter = 88.dp)

        Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
            Text(
                "Today's target",
                fontSize = 15.5.sp,
                fontWeight = FontWeight.Bold,
                color = cortex.ink,
            )
            StatusLine(ui = ui, cortex = cortex)
            Button(
                onClick = onContinue,
                colors = ButtonDefaults.buttonColors(containerColor = cortex.primary, contentColor = cortex.onPrimary),
                contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp),
                shape = RoundedCornerShape(CortexRadius.md),
            ) {
                Text("Continue session", fontSize = 13.sp, fontWeight = FontWeight.SemiBold)
            }
        }
    }
}

@Composable
private fun StatusLine(ui: HomeUi, cortex: CortexColors) {
    if (ui.earned) {
        Text(HomeStats.statusText(ui.todayCount, ui.goal), fontSize = 13.sp, color = cortex.ink2)
        return
    }
    val remaining = HomeStats.remaining(ui.todayCount, ui.goal)
    val text = buildAnnotatedString {
        withStyle(SpanStyle(fontWeight = FontWeight.Bold, color = cortex.primaryStrong)) {
            append("${ui.todayCount} of ${ui.goal}")
        }
        append(" questions done — $remaining more to hit your mark.")
    }
    Text(text, fontSize = 13.sp, color = cortex.ink2)
}

/** "Pick up where you left off": the paused sitting's name and position, and an outlined-crimson way back in -- a port of `ResumeSessionCard.tsx`. */
@Composable
private fun ResumeCard(resume: ResumeInfo, onResume: () -> Unit) {
    val cortex = LocalCortex.current
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(cortex.surface)
            .border(1.dp, cortex.line, RoundedCornerShape(14.dp))
            .padding(horizontal = 16.dp, vertical = 14.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Column {
            Text(
                "Pick up where you left off",
                fontSize = 13.5.sp,
                fontWeight = FontWeight.SemiBold,
                color = cortex.ink,
            )
            Text(
                "${resume.name} · question ${resume.position} of ${resume.total}",
                fontSize = 12.sp,
                color = cortex.ink2,
            )
        }
        OutlinedButton(
            onClick = onResume,
            border = BorderStroke(1.dp, cortex.primaryLine),
            colors = ButtonDefaults.outlinedButtonColors(contentColor = cortex.primaryStrong),
            shape = CircleShape,
            contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp),
        ) {
            Text("Resume", fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
        }
    }
}

/**
 * Practice, Flashcards, Library, Resources -- the four doors the redesigned
 * web dashboard leads with (`DashboardNavGrid.tsx`). Practice is the one tile
 * with a real Android screen behind it today ([HomeUi.questionCount], the
 * same pool the Question Bank tab itself reads); the other three route to
 * [onShowComingSoon] instead of a screen this milestone was told not to
 * fabricate.
 */
@Composable
private fun DashboardNavGrid(
    ui: HomeUi,
    onOpenQuestionBank: () -> Unit,
    onShowComingSoon: (String) -> Unit,
) {
    val cortex = LocalCortex.current
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            GridCard(
                icon = { QuestionBankGlyph(color = cortex.accentStrong) },
                label = "Practice",
                sublabel = "${groupedCount(ui.questionCount)} questions",
                onClick = onOpenQuestionBank,
                modifier = Modifier.weight(1f),
            )
            GridCard(
                icon = { FlashcardsGlyph(color = cortex.accentStrong) },
                label = "Flashcards",
                sublabel = "Coming soon",
                onClick = { onShowComingSoon("Flashcards") },
                modifier = Modifier.weight(1f),
            )
        }
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            GridCard(
                icon = { LibraryGlyph(color = cortex.accentStrong) },
                label = "Library",
                sublabel = "Coming soon",
                onClick = { onShowComingSoon("Library") },
                modifier = Modifier.weight(1f),
            )
            GridCard(
                icon = { ResourcesGlyph(color = cortex.accentStrong) },
                label = "Resources",
                sublabel = "Coming soon",
                onClick = { onShowComingSoon("Resources") },
                modifier = Modifier.weight(1f),
            )
        }
    }
}

/**
 * What this tab already carried before the M3 redesign -- Practical stations,
 * the daily question, and previous sittings -- kept below the new hero grid
 * rather than dropped, since the redesigned web dashboard has no equivalent
 * of any of the three to fold them into. Restyled onto the same [GridCard]
 * the grid above uses, so it reads as one system rather than a leftover
 * screen bolted underneath.
 */
@Composable
private fun MoreGrid(
    ui: HomeUi,
    onOpenPractical: () -> Unit,
    onOpenDaily: () -> Unit,
    onOpenPreviousSittings: () -> Unit,
    onOpenPerformance: () -> Unit,
    onOpenNotebook: () -> Unit,
    onOpenCalendar: () -> Unit,
    onOpenTerminology: () -> Unit,
    onOpenAssistant: () -> Unit,
) {
    val cortex = LocalCortex.current
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        Text(
            "MORE",
            style = MaterialTheme.typography.labelSmall,
            color = cortex.ink3,
        )
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            GridCard(
                icon = { PracticalGlyph(color = cortex.accentStrong) },
                label = "Practical",
                sublabel = "${groupedCount(ui.practicalCount)} stations",
                onClick = onOpenPractical,
                modifier = Modifier.weight(1f),
            )
            GridCard(
                icon = { DailyGlyph(color = cortex.accentStrong) },
                label = "Daily question",
                sublabel = "One a day",
                onClick = onOpenDaily,
                modifier = Modifier.weight(1f),
            )
        }
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            GridCard(
                icon = { HistoryGlyph(color = cortex.accentStrong) },
                label = "Previous sittings",
                sublabel = "${groupedCount(ui.previousSittingsCount)} sittings",
                onClick = onOpenPreviousSittings,
                modifier = Modifier.weight(1f),
            )
            GridCard(
                icon = { PerformanceGlyph(color = cortex.accentStrong) },
                label = "Performance",
                sublabel = "Your progress",
                onClick = onOpenPerformance,
                modifier = Modifier.weight(1f),
            )
        }
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            GridCard(
                icon = { NotebookGlyph(color = cortex.accentStrong) },
                label = "Notebook",
                sublabel = "Your notes",
                onClick = onOpenNotebook,
                modifier = Modifier.weight(1f),
            )
            GridCard(
                icon = { CalendarGlyph(color = cortex.accentStrong) },
                label = "Calendar",
                sublabel = "Your timetable",
                onClick = onOpenCalendar,
                modifier = Modifier.weight(1f),
            )
        }
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            GridCard(
                icon = { TerminologyGlyph(color = cortex.accentStrong) },
                label = "Terminology",
                sublabel = "Glossary & taxonomy",
                onClick = onOpenTerminology,
                modifier = Modifier.weight(1f),
            )
            GridCard(
                icon = { AssistantGlyph(color = cortex.accentStrong) },
                label = "Study assistant",
                sublabel = "Ask a question",
                onClick = onOpenAssistant,
                modifier = Modifier.weight(1f),
            )
        }
    }
}

/** A tile whose screen this milestone doesn't build yet -- what it will do, in plain words, instead of a broken tap. */
@Composable
private fun ComingSoonDialog(title: String, onDismiss: () -> Unit) {
    AlertDialog(
        onDismissRequest = onDismiss,
        confirmButton = {
            TextButton(onClick = onDismiss) { Text("OK") }
        },
        title = { Text(title) },
        text = { Text("$title isn't in the app yet -- it's on the way in a later update.") },
    )
}

@Composable
private fun GridCard(
    icon: @Composable () -> Unit,
    label: String,
    sublabel: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
) {
    val cortex = LocalCortex.current
    Column(
        modifier = modifier
            .clip(RoundedCornerShape(14.dp))
            .background(cortex.surface)
            .border(1.dp, cortex.line, RoundedCornerShape(14.dp))
            .clickable(onClick = onClick)
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp),
    ) {
        icon()
        Text(label, fontSize = 13.5.sp, fontWeight = FontWeight.SemiBold, color = cortex.ink)
        Text(sublabel, fontSize = 11.sp, color = cortex.ink3, fontFamily = FontFamily.Monospace)
    }
}

/** "1,234" -- the mock's grouped-digit counts. */
private fun groupedCount(value: Int): String = "%,d".format(value)
