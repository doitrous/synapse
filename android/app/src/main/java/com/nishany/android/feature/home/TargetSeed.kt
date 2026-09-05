package com.nishany.android.feature.home

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.nishany.android.design.LocalCortex

/**
 * The nishany Noon mark, reused as today's progress ring -- a Compose port
 * of the web's `TargetSeed.tsx`. Same 100-unit geometry as that SVG (r=34/20
 * arcs opening top-right, a navy seed at (72, 28)), just drawn with
 * [Canvas]/`drawArc` instead of `<circle>` + `stroke-dasharray`. The outer
 * crimson arc is the only reactive part -- a track for the full 275°, and a
 * fill sized to [done]/[goal] animating in on first composition, the same
 * "grows from the mark's own anchor" motion the web's dash-array transition
 * plays.
 */
private const val SWEEP_DEGREES = 275f
private const val OUTER_RADIUS_UNITS = 34f
private const val OUTER_STROKE_UNITS = 8f
private const val INNER_RADIUS_UNITS = 20f
private const val INNER_STROKE_UNITS = 7f
private const val SEED_RADIUS_UNITS = 5f

/** The seed's centre in the mark's 100-unit space, (50, 50) being the ring's own centre. */
private const val SEED_OFFSET_X_UNITS = 22f
private const val SEED_OFFSET_Y_UNITS = -22f

private val OuterCrimson = Color(0xFFA81D40)
private val InnerRose = Color(0xFFE0859B)

@Composable
fun TargetSeed(
    done: Int,
    goal: Int,
    modifier: Modifier = Modifier,
    diameter: Dp = 132.dp,
) {
    val cortex = LocalCortex.current
    val pct = if (goal > 0) (done.toFloat() / goal).coerceIn(0f, 1f) else 0f
    val animatedPct by animateFloatAsState(targetValue = pct, animationSpec = tween(700), label = "targetSeedFill")
    val label = "$done of $goal questions done"

    Canvas(
        modifier = modifier
            .size(diameter)
            .semantics { contentDescription = label },
    ) {
        // 100-unit space -> px, the same scale `viewBox="0 0 100 100"` gives the web's SVG at any rendered size.
        val unit = size.minDimension / 100f
        fun arcGeometry(radiusUnits: Float): Pair<Offset, Size> {
            val radius = radiusUnits * unit
            return Offset(center.x - radius, center.y - radius) to Size(radius * 2f, radius * 2f)
        }

        val (outerTopLeft, outerSize) = arcGeometry(OUTER_RADIUS_UNITS)
        drawArc(
            color = cortex.inset,
            startAngle = 0f,
            sweepAngle = SWEEP_DEGREES,
            useCenter = false,
            topLeft = outerTopLeft,
            size = outerSize,
            style = Stroke(width = OUTER_STROKE_UNITS * unit, cap = StrokeCap.Round),
        )
        drawArc(
            color = OuterCrimson,
            startAngle = 0f,
            sweepAngle = SWEEP_DEGREES * animatedPct,
            useCenter = false,
            topLeft = outerTopLeft,
            size = outerSize,
            style = Stroke(width = OUTER_STROKE_UNITS * unit, cap = StrokeCap.Round),
        )

        val (innerTopLeft, innerSize) = arcGeometry(INNER_RADIUS_UNITS)
        drawArc(
            color = InnerRose,
            startAngle = 0f,
            sweepAngle = SWEEP_DEGREES,
            useCenter = false,
            topLeft = innerTopLeft,
            size = innerSize,
            style = Stroke(width = INNER_STROKE_UNITS * unit, cap = StrokeCap.Round),
        )

        drawCircle(
            color = cortex.midnight,
            radius = SEED_RADIUS_UNITS * unit,
            center = Offset(center.x + SEED_OFFSET_X_UNITS * unit, center.y + SEED_OFFSET_Y_UNITS * unit),
        )
    }
}
