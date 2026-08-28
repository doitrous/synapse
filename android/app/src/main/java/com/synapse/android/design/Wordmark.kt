package com.synapse.android.design

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.height
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.synapse.android.R

/**
 * The Connect Cortex lockup. The website reconstructs its lockup from live
 * text because it needs it selectable and theme-reactive; Android does not,
 * so this renders the supplied artwork directly, choosing the white variant
 * on dark grounds -- the same swap the web makes for the same reason
 * (`src/components/brand/Wordmark.tsx:9-12` -- the deep blue goes muddy on a
 * dark ground).
 *
 * The artwork is 1055x80px with no padding (13.1:1), far wider than any
 * phone is tall relative to its width at a legible height, so
 * [ContentScale.Fit] -- not [ContentScale.FillHeight] -- is required: Fit
 * letterboxes to the available width and keeps the whole lockup on screen,
 * where FillHeight would centre-crop both ends off a narrow screen.
 */
@Composable
fun Wordmark(modifier: Modifier = Modifier, height: Dp = 28.dp) {
    val dark = LocalCortex.current == DarkCortexColors
    Image(
        painter = painterResource(
            if (dark) R.drawable.brand_wordmark_white else R.drawable.brand_wordmark,
        ),
        // The lockup reads "Connect Cortex"; that is its accessible name, and
        // the artwork must never be announced as a file name.
        contentDescription = "Connect Cortex",
        modifier = modifier.height(height),
        contentScale = ContentScale.Fit,
    )
}
