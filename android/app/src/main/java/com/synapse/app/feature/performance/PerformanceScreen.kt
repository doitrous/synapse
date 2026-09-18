package com.synapse.app.feature.performance

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SegmentedButton
import androidx.compose.material3.SegmentedButtonDefaults
import androidx.compose.material3.SingleChoiceSegmentedButtonRow
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.res.pluralStringResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.synapse.app.R
import com.synapse.app.core.api.LeaderboardMetric
import com.synapse.app.core.api.LeaderboardRow

const val PERFORMANCE_LOADING_TAG = "performance_loading"
const val PERFORMANCE_EMPTY_TAG = "performance_empty"
const val PERFORMANCE_TAB_PERSONAL_TAG = "performance_tab_personal"
const val PERFORMANCE_TAB_LEADERS_TAG = "performance_tab_leaders"
const val PERFORMANCE_LEADERBOARD_OFFLINE_TAG = "performance_leaderboard_offline"
const val PERFORMANCE_LEADERBOARD_EMPTY_TAG = "performance_leaderboard_empty"
fun performanceLeaderboardRowTag(rank: Int): String = "performance_leaderboard_row_$rank"

/** Difficulty bands in authored order — matches iOS's fixed ["Easy","Moderate","Hard","Challenging"]. */
private val DIFFICULTY_ORDER = listOf("Easy", "Moderate", "Hard", "Challenging")

/**
 * The Performance tab's single public entry point. Constructs its own
 * [PerformanceViewModel] via [hiltViewModel] — no navigation wiring required
 * of the caller, mirroring `LibraryRoute`/`feature.qbank.QuestionBankRoot`.
 */
@Composable
fun PerformanceRoute(viewModel: PerformanceViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    PerformanceScreen(
        uiState = uiState,
        onSelectTab = viewModel::selectTab,
        onSelectMetric = viewModel::selectMetric,
    )
}

@Composable
private fun PerformanceScreen(
    uiState: PerformanceUiState,
    onSelectTab: (PerformanceTab) -> Unit,
    onSelectMetric: (LeaderboardMetric) -> Unit,
) {
    if (uiState !is PerformanceUiState.Content) {
        Box(
            modifier = Modifier.fillMaxSize().testTag(PERFORMANCE_LOADING_TAG),
            contentAlignment = Alignment.Center,
        ) { CircularProgressIndicator() }
        return
    }

    Column(modifier = Modifier.fillMaxSize()) {
        Text(
            stringResource(R.string.performance_title),
            style = MaterialTheme.typography.titleLarge,
            modifier = Modifier.padding(16.dp),
        )

        val tabIndex = if (uiState.tab == PerformanceTab.Personal) 0 else 1
        TabRow(selectedTabIndex = tabIndex) {
            Tab(
                selected = tabIndex == 0,
                onClick = { onSelectTab(PerformanceTab.Personal) },
                text = { Text(stringResource(R.string.performance_tab_personal)) },
                modifier = Modifier.testTag(PERFORMANCE_TAB_PERSONAL_TAG),
            )
            Tab(
                selected = tabIndex == 1,
                onClick = { onSelectTab(PerformanceTab.Leaders) },
                text = { Text(stringResource(R.string.performance_tab_leaders)) },
                modifier = Modifier.testTag(PERFORMANCE_TAB_LEADERS_TAG),
            )
        }

        when (uiState.tab) {
            PerformanceTab.Personal -> PersonalProgressPane(uiState.personal)
            PerformanceTab.Leaders -> TopPerformersPane(
                metric = uiState.metric,
                state = uiState.leaderboard,
                onSelectMetric = onSelectMetric,
            )
        }
    }
}

// --- Personal progress ---------------------------------------------------------

@Composable
private fun PersonalProgressPane(stats: PersonalStats) {
    if (stats.attempts == 0) {
        Box(
            modifier = Modifier.fillMaxSize().testTag(PERFORMANCE_EMPTY_TAG),
            contentAlignment = Alignment.Center,
        ) {
            Text(
                stringResource(R.string.performance_empty_message),
                style = MaterialTheme.typography.bodyMedium,
                modifier = Modifier.padding(24.dp),
            )
        }
        return
    }

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp),
    ) {
        item { HeadlineRow(stats) }
        item { SectionCard(title = stringResource(R.string.performance_section_when_you_study)) { HeatmapGrid(stats.heatmap) } }
        if (stats.bySubject.isNotEmpty()) {
            item { SectionCard(title = stringResource(R.string.performance_section_by_subject)) { BreakdownBarList(stats.bySubject) } }
        }
        if (stats.byDifficulty.isNotEmpty()) {
            item {
                SectionCard(title = stringResource(R.string.performance_section_by_difficulty)) {
                    val ordered = stats.byDifficulty.sortedBy { row ->
                        DIFFICULTY_ORDER.indexOf(row.key).let { if (it < 0) DIFFICULTY_ORDER.size else it }
                    }
                    BreakdownBarList(ordered)
                }
            }
        }
        if (stats.bySurface.isNotEmpty()) {
            item { SectionCard(title = stringResource(R.string.performance_section_by_surface)) { BreakdownBarList(stats.bySurface, showCount = true) } }
        }
    }
}

@Composable
private fun HeadlineRow(stats: PersonalStats) {
    Row(horizontalArrangement = Arrangement.spacedBy(12.dp), modifier = Modifier.fillMaxWidth()) {
        val accuracyLabel = stringResource(R.string.performance_kpi_accuracy_label)
        val noValue = stringResource(R.string.performance_no_value)
        if (stats.marked >= MIN_MARKED_FOR_ACCURACY) {
            KpiTile(
                modifier = Modifier.weight(1f),
                label = accuracyLabel,
                value = stats.overallAccuracy?.let { stringResource(R.string.performance_accuracy_percent, (it * 100).toInt()) } ?: noValue,
                sub = pluralStringResource(R.plurals.performance_marked_of, stats.marked, stats.marked),
            )
        } else {
            KpiTile(
                modifier = Modifier.weight(1f),
                label = accuracyLabel,
                value = noValue,
                sub = pluralStringResource(
                    R.plurals.performance_more_marked_needed,
                    MIN_MARKED_FOR_ACCURACY - stats.marked,
                    MIN_MARKED_FOR_ACCURACY - stats.marked,
                ),
            )
        }
        KpiTile(
            modifier = Modifier.weight(1f),
            label = stringResource(R.string.performance_kpi_streak_label),
            value = "${stats.streak}",
            sub = pluralStringResource(R.plurals.performance_streak_unit, stats.streak),
        )
        KpiTile(
            modifier = Modifier.weight(1f),
            label = stringResource(R.string.performance_kpi_items_label),
            value = "${stats.distinctItems}",
            sub = pluralStringResource(R.plurals.performance_attempts_count, stats.attempts, stats.attempts),
        )
    }
}

@Composable
private fun KpiTile(label: String, value: String, sub: String, modifier: Modifier = Modifier) {
    Card(modifier = modifier) {
        Column(modifier = Modifier.padding(12.dp)) {
            Text(label, style = MaterialTheme.typography.labelMedium)
            Text(value, style = MaterialTheme.typography.headlineSmall)
            Text(sub, style = MaterialTheme.typography.bodySmall)
        }
    }
}

@Composable
private fun SectionCard(title: String, content: @Composable () -> Unit) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(title, style = MaterialTheme.typography.titleMedium)
            Spacer(modifier = Modifier.height(12.dp))
            content()
        }
    }
}

/** A bar list: a `Row` per group, the bar itself a `Box` sized by a fraction of the row's width — no charting dependency needed. */
@Composable
private fun BreakdownBarList(rows: List<Breakdown>, showCount: Boolean = false) {
    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        rows.forEach { row ->
            Column {
                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(row.key, style = MaterialTheme.typography.bodyMedium)
                    Text(
                        if (showCount) "${row.attempts}"
                        else row.accuracy?.let {
                            stringResource(R.string.performance_breakdown_accuracy_of_marked, (it * 100).toInt(), row.marked)
                        } ?: stringResource(R.string.performance_not_marked),
                        style = MaterialTheme.typography.bodySmall,
                    )
                }
                Spacer(modifier = Modifier.height(4.dp))
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(8.dp)
                        .background(MaterialTheme.colorScheme.surfaceVariant, RoundedCornerShape(4.dp)),
                ) {
                    val fraction = (row.accuracy ?: 0.0).toFloat().coerceIn(0f, 1f)
                    Box(
                        modifier = Modifier
                            .fillMaxWidth(if (showCount) 1f else fraction)
                            .height(8.dp)
                            .background(MaterialTheme.colorScheme.primary, RoundedCornerShape(4.dp)),
                    )
                }
            }
        }
    }
}

/** 17 weeks x 7 days, oldest week first, shaded by how busy the day was — a `Row` of `Column`s of `Box`es. */
@Composable
private fun HeatmapGrid(days: List<DayCount>) {
    if (days.isEmpty()) {
        Text(stringResource(R.string.performance_heatmap_empty), style = MaterialTheme.typography.bodySmall)
        return
    }
    val weeks = days.chunked(7)
    val busiest = (days.maxOfOrNull { it.attempts } ?: 1).coerceAtLeast(1)
    LazyRow(horizontalArrangement = Arrangement.spacedBy(3.dp)) {
        items(weeks) { week ->
            Column(verticalArrangement = Arrangement.spacedBy(3.dp)) {
                week.forEach { day ->
                    val ratio = day.attempts.toFloat() / busiest
                    val alpha = if (day.attempts == 0) 0f else (0.25f + 0.75f * ratio).coerceIn(0.25f, 1f)
                    Box(
                        modifier = Modifier
                            .size(10.dp)
                            .background(
                                if (day.attempts == 0) MaterialTheme.colorScheme.surfaceVariant
                                else MaterialTheme.colorScheme.primary.copy(alpha = alpha),
                                RoundedCornerShape(2.dp),
                            ),
                    )
                }
            }
        }
    }
}

// --- Top performers --------------------------------------------------------------

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun TopPerformersPane(
    metric: LeaderboardMetric,
    state: LeaderboardUiState,
    onSelectMetric: (LeaderboardMetric) -> Unit,
) {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        SingleChoiceSegmentedButtonRow(modifier = Modifier.fillMaxWidth()) {
            SegmentedButton(
                selected = metric == LeaderboardMetric.ConceptsMastered,
                onClick = { onSelectMetric(LeaderboardMetric.ConceptsMastered) },
                shape = SegmentedButtonDefaults.itemShape(index = 0, count = 2),
            ) { Text(stringResource(R.string.performance_metric_concepts_mastered)) }
            SegmentedButton(
                selected = metric == LeaderboardMetric.PercentCorrect,
                onClick = { onSelectMetric(LeaderboardMetric.PercentCorrect) },
                shape = SegmentedButtonDefaults.itemShape(index = 1, count = 2),
            ) { Text(stringResource(R.string.performance_metric_percent_correct)) }
        }
        Spacer(modifier = Modifier.height(12.dp))

        when (state) {
            is LeaderboardUiState.Loading -> Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                CircularProgressIndicator()
            }
            is LeaderboardUiState.Unavailable -> Box(
                modifier = Modifier.fillMaxSize().testTag(PERFORMANCE_LEADERBOARD_OFFLINE_TAG),
                contentAlignment = Alignment.Center,
            ) {
                Text(
                    stringResource(R.string.performance_leaderboard_unavailable),
                    style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier.padding(24.dp),
                )
            }
            is LeaderboardUiState.Loaded -> {
                val scope = state.response.scope
                if (scope != null) {
                    Text(
                        listOfNotNull(scope.year, state.response.term).joinToString(" · "),
                        style = MaterialTheme.typography.labelMedium,
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                }
                if (state.response.rows.isEmpty()) {
                    Box(
                        modifier = Modifier.fillMaxSize().testTag(PERFORMANCE_LEADERBOARD_EMPTY_TAG),
                        contentAlignment = Alignment.Center,
                    ) { Text(stringResource(R.string.performance_leaderboard_empty), style = MaterialTheme.typography.bodyMedium) }
                } else {
                    LazyColumn(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                        items(state.response.rows) { row -> LeaderboardRowItem(row, metric) }
                    }
                }
            }
        }
    }
}

@Composable
private fun LeaderboardRowItem(row: LeaderboardRow, metric: LeaderboardMetric) {
    Row(
        modifier = Modifier.fillMaxWidth().testTag(performanceLeaderboardRowTag(row.rank)).padding(vertical = 8.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(
            stringResource(R.string.performance_leaderboard_rank, row.rank),
            style = MaterialTheme.typography.labelLarge,
            modifier = Modifier.padding(end = 8.dp),
        )
        Text(
            stringResource(R.string.performance_leaderboard_username, row.username),
            style = MaterialTheme.typography.bodyLarge,
            modifier = Modifier.weight(1f),
        )
        Text(
            when (metric) {
                LeaderboardMetric.ConceptsMastered -> "${row.securedConcepts ?: 0}"
                LeaderboardMetric.PercentCorrect -> row.accuracy?.let {
                    stringResource(R.string.performance_accuracy_percent, (it * 100).toInt())
                } ?: stringResource(R.string.performance_no_value)
            },
            style = MaterialTheme.typography.bodyLarge,
        )
    }
    HorizontalDivider()
}
