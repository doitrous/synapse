package com.synapse.app.feature.qbank

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import com.synapse.app.core.qbank.QBankSession

fun navigatorItemTag(index: Int): String = "qbank_nav_item_$index"

/** [QBankSession.NavState] mapped to a legend color. Deliberately independent of [MaterialTheme]'s
 *  semantic colors (correct/wrong/etc. are a fixed vocabulary, not brand-driven). */
private fun QBankSession.NavState.color(): Color = when (this) {
    QBankSession.NavState.Unseen -> Color(0xFFB0B7C3)
    QBankSession.NavState.Answered -> Color(0xFF6FA5FF)
    QBankSession.NavState.Correct -> Color(0xFF2E9E5B)
    QBankSession.NavState.Wrong -> Color(0xFFD13A3A)
    QBankSession.NavState.Omitted -> Color(0xFFE0A93B)
}

private fun QBankSession.NavState.label(): String = when (this) {
    QBankSession.NavState.Unseen -> "Unseen"
    QBankSession.NavState.Answered -> "Answered"
    QBankSession.NavState.Correct -> "Correct"
    QBankSession.NavState.Wrong -> "Wrong"
    QBankSession.NavState.Omitted -> "Omitted"
}

/**
 * A grid of every question in the sitting, colored by [QBankSession.NavState],
 * with a small dot overlay for flagged questions and a legend beneath. Tapping
 * a cell jumps straight to that question via [onSelect].
 */
@Composable
fun QuestionNavigator(
    navStates: List<QBankSession.NavState>,
    currentIndex: Int,
    flagged: (Int) -> Boolean,
    onSelect: (Int) -> Unit,
    modifier: Modifier = Modifier,
) {
    Column(modifier = modifier) {
        LazyVerticalGrid(
            columns = GridCells.Adaptive(minSize = 40.dp),
            modifier = Modifier.size(width = 280.dp, height = 200.dp),
        ) {
            items(navStates.size, key = { it }) { index ->
                val state = navStates[index]
                Box(
                    modifier = Modifier
                        .size(36.dp)
                        .clip(CircleShape)
                        .background(state.color())
                        .clickable { onSelect(index) }
                        .testTag(navigatorItemTag(index)),
                    contentAlignment = Alignment.Center,
                ) {
                    Text(
                        text = "${index + 1}",
                        color = Color.White,
                        style = MaterialTheme.typography.labelLarge,
                    )
                    if (flagged(index)) {
                        Box(
                            modifier = Modifier
                                .size(8.dp)
                                .clip(CircleShape)
                                .background(Color(0xFFFFC107))
                                .align(Alignment.TopEnd),
                        )
                    }
                    if (index == currentIndex) {
                        Box(
                            modifier = Modifier
                                .size(4.dp)
                                .clip(CircleShape)
                                .background(Color.White)
                                .align(Alignment.BottomCenter),
                        )
                    }
                }
            }
        }

        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            QBankSession.NavState.entries.forEach { state ->
                Row {
                    Box(
                        modifier = Modifier
                            .size(10.dp)
                            .clip(CircleShape)
                            .background(state.color()),
                    )
                    Text(
                        text = " ${state.label()}",
                        style = MaterialTheme.typography.bodyMedium,
                    )
                }
            }
        }
    }
}
