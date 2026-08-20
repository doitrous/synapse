package com.synapse.android.feature.qbank

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.synapse.android.core.qbank.QuestionState

/**
 * The strip a student uses to jump between questions mid-sitting.
 *
 * Colour follows [com.synapse.android.core.qbank.QuestionState] exactly, via
 * [stateOf] -- which is [RunnerViewModel.stateOf], passed in rather than a
 * [RunnerViewModel] itself so this composable stays trivially previewable.
 * In a timed sitting that function reports every answered question as
 * `ANSWERED`, never `CORRECT`/`WRONG`, until [RunnerViewModel.finish] is
 * called -- so the strip cannot leak whether an answer was right, which is
 * the entire point of the mode split.
 */
@Composable
fun QuestionNavigator(
    count: Int,
    current: Int,
    stateOf: (Int) -> QuestionState,
    onSelect: (Int) -> Unit,
) {
    LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        items(count) { index ->
            val color = colorFor(stateOf(index))
            Box(
                modifier = Modifier
                    .size(36.dp)
                    .clip(CircleShape)
                    .background(color)
                    .border(
                        width = if (index == current) 2.dp else 0.dp,
                        color = MaterialTheme.colorScheme.onSurface,
                        shape = CircleShape,
                    )
                    .clickable { onSelect(index) },
                contentAlignment = Alignment.Center,
            ) {
                Text("${index + 1}", color = Color.White, style = MaterialTheme.typography.labelMedium)
            }
        }
    }
}

private fun colorFor(state: QuestionState): Color = when (state) {
    QuestionState.CORRECT -> Color(0xFF2E7D32)
    QuestionState.WRONG -> Color(0xFFC62828)
    QuestionState.ANSWERED -> Color(0xFF1565C0)
    QuestionState.OMITTED -> Color(0xFFF9A825)
    QuestionState.UNSEEN -> Color(0xFF9E9E9E)
}
