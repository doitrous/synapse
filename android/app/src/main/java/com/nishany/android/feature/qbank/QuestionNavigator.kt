package com.nishany.android.feature.qbank

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.minimumInteractiveComponentSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.nishany.android.core.qbank.QuestionState
import com.nishany.android.design.LocalCortex

/**
 * The strip a student uses to jump between questions mid-sitting.
 *
 * Colour follows [com.nishany.android.core.qbank.QuestionState] exactly, via
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
    val cortex = LocalCortex.current
    LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        items(count) { index ->
            val swatch = swatchFor(stateOf(index))
            val here = index == current
            Box(
                modifier = Modifier
                    // minimumInteractiveComponentSize() pads the clickable
                    // bounds out to the WCAG 2.5.5 48dp floor -- the same
                    // mechanism IconButton's own default uses -- without
                    // touching the 40dp swatch actually drawn below.
                    .minimumInteractiveComponentSize()
                    // 40dp outside, 36dp of swatch inside: the 2dp gap is the
                    // web's `ring-2 ring-primary/30`, which sits outside the
                    // border rather than replacing it.
                    .size(40.dp)
                    .then(
                        if (here) {
                            Modifier.border(2.dp, cortex.primary.copy(alpha = 0.30f), CircleShape)
                        } else {
                            Modifier
                        },
                    )
                    .padding(2.dp)
                    .clip(CircleShape)
                    .background(swatch.fill)
                    .border(1.dp, if (here) cortex.primary else swatch.border, CircleShape)
                    .clickable { onSelect(index) },
                contentAlignment = Alignment.Center,
            ) {
                Text(
                    "${index + 1}",
                    color = if (here) cortex.primaryStrong else swatch.text,
                    fontWeight = if (here) FontWeight.SemiBold else null,
                    style = MaterialTheme.typography.labelMedium,
                )
            }
        }
    }
}

/** The three colours one swatch is made of, in the web's order: border, fill, number. */
private data class NavigatorSwatch(val border: Color, val fill: Color, val text: Color)

/**
 * `SWATCH` in `src/components/qbank/QuestionNavigator.tsx:23-29`, token for
 * token.
 *
 * These were five stock Material colours -- Material's own green, red, blue,
 * amber and grey -- filled solid with white numerals on them. That is a
 * different design language from the rest of the app, and it was also
 * unreadable: white on the amber (#F9A825) is 2.1:1, well under the 4.5:1 a
 * number this small needs. The site never fills these; it uses a tinted
 * ground with the same hue's text colour on it, which is a pairing the
 * palette already guarantees.
 *
 * The `answered` row is the one that most needs to stay as the web has it:
 * it is deliberately the primary tint and not a third colour, because in a
 * timed sitting `answered` is every question the student has done, and
 * anything that reads as a verdict there leaks the marking the mode exists
 * to withhold.
 */
@Composable
private fun swatchFor(state: QuestionState): NavigatorSwatch {
    val cortex = LocalCortex.current
    return when (state) {
        QuestionState.UNSEEN -> NavigatorSwatch(cortex.line, cortex.surface, cortex.ink3)
        QuestionState.ANSWERED -> NavigatorSwatch(cortex.primaryLine, cortex.primaryTint, cortex.primaryStrong)
        QuestionState.OMITTED -> NavigatorSwatch(cortex.warning.copy(alpha = 0.45f), cortex.warningTint, cortex.warning)
        QuestionState.CORRECT -> NavigatorSwatch(cortex.success.copy(alpha = 0.50f), cortex.successTint, cortex.success)
        QuestionState.WRONG -> NavigatorSwatch(cortex.danger.copy(alpha = 0.50f), cortex.dangerTint, cortex.danger)
    }
}
