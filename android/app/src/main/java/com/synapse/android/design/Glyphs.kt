package com.synapse.android.design

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.size
import androidx.compose.material3.LocalContentColor
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * Small stroke-style glyphs, drawn rather than pulled from an icon library.
 *
 * `androidx.compose.material:material-icons-*` is not a declared dependency
 * in `app/build.gradle.kts` (only `androidx.compose.material3` is), and the
 * home screen and bottom bar need icons regardless -- adding an icon-font
 * dependency for five glyphs is a heavier call than this task should make on
 * its own. Every glyph here is 22dp by default (the grid cards' size; the
 * bottom bar renders them a touch smaller via Material's own default icon
 * size) and reads its colour from [LocalContentColor] unless [color] is
 * overridden, so a `NavigationBarItem`'s selected/unselected tint reaches
 * these the same way it reaches a real `Icon`.
 */
private fun strokeWidthFor(sizePx: Float) = sizePx * 0.09f

/**
 * The nishany mark: an open ring with the gap at twelve o'clock, and the
 * mark's own centre dot. The bottom bar's Home tab, and the one glyph here
 * that is brand rather than generic -- it is what the mock draws as the
 * active tab (`ScreenEN.dc.html`), tinted [color] exactly like every other
 * tab icon so selection colours it the same way.
 */
@Composable
fun NishanyMark(modifier: Modifier = Modifier, size: Dp = 22.dp, color: Color = LocalContentColor.current) {
    Canvas(modifier = modifier.size(size)) {
        val stroke = strokeWidthFor(this.size.minDimension) * 1.6f
        val diameter = this.size.minDimension - stroke
        val topLeft = Offset((this.size.width - diameter) / 2f, (this.size.height - diameter) / 2f)
        val arcSize = Size(diameter, diameter)
        // A 60-degree gap centred on the top: the arc runs from -60 to 240 degrees.
        drawArc(
            color = color,
            startAngle = -60f,
            sweepAngle = 300f,
            useCenter = false,
            topLeft = topLeft,
            size = arcSize,
            style = Stroke(width = stroke, cap = StrokeCap.Round),
        )
        drawCircle(color = color, radius = stroke * 0.85f, center = center)
    }
}

/** A stack of ruled lines in an outlined card -- the question bank: a list of items to answer. */
@Composable
fun QuestionBankGlyph(modifier: Modifier = Modifier, size: Dp = 22.dp, color: Color = LocalContentColor.current) {
    Canvas(modifier = modifier.size(size)) {
        val stroke = strokeWidthFor(this.size.minDimension)
        val inset = stroke
        val w = this.size.width
        val h = this.size.height
        val lineXs = floatArrayOf(inset + stroke, w - inset - stroke)
        val rowYs = floatArrayOf(h * 0.32f, h * 0.56f, h * 0.80f)
        for (y in rowYs) {
            drawLine(
                color = color,
                start = Offset(lineXs[0], y),
                end = Offset(if (y == rowYs.last()) lineXs[1] - (lineXs[1] - lineXs[0]) * 0.35f else lineXs[1], y),
                strokeWidth = stroke,
                cap = StrokeCap.Round,
            )
        }
    }
}

/** A medical cross inside a rounded outline -- practical stations, OSCE-blue. */
@Composable
fun PracticalGlyph(modifier: Modifier = Modifier, size: Dp = 22.dp, color: Color = LocalContentColor.current) {
    Canvas(modifier = modifier.size(size)) {
        val stroke = strokeWidthFor(this.size.minDimension)
        val w = this.size.width
        val h = this.size.height
        val armExtent = w * 0.24f
        drawLine(color, Offset(w / 2f, h / 2f - armExtent), Offset(w / 2f, h / 2f + armExtent), stroke, StrokeCap.Round)
        drawLine(color, Offset(w / 2f - armExtent, h / 2f), Offset(w / 2f + armExtent, h / 2f), stroke, StrokeCap.Round)
    }
}

/** A sun -- a ring of short rays around a centre dot -- for the one question a day. */
@Composable
fun DailyGlyph(modifier: Modifier = Modifier, size: Dp = 22.dp, color: Color = LocalContentColor.current) {
    Canvas(modifier = modifier.size(size)) {
        val stroke = strokeWidthFor(this.size.minDimension)
        val c = center
        val coreRadius = this.size.minDimension * 0.20f
        drawCircle(color = color, radius = coreRadius, center = c, style = Stroke(width = stroke))
        val rayInner = coreRadius + stroke * 1.6f
        val rayOuter = this.size.minDimension * 0.46f
        for (i in 0 until 8) {
            val angle = (Math.PI / 4 * i).toFloat()
            val dx = kotlin.math.cos(angle)
            val dy = kotlin.math.sin(angle)
            drawLine(
                color = color,
                start = Offset(c.x + dx * rayInner, c.y + dy * rayInner),
                end = Offset(c.x + dx * rayOuter, c.y + dy * rayOuter),
                strokeWidth = stroke,
                cap = StrokeCap.Round,
            )
        }
    }
}

/** A clock face -- past sittings, time already spent. */
@Composable
fun HistoryGlyph(modifier: Modifier = Modifier, size: Dp = 22.dp, color: Color = LocalContentColor.current) {
    Canvas(modifier = modifier.size(size)) {
        val stroke = strokeWidthFor(this.size.minDimension)
        val c = center
        val radius = this.size.minDimension * 0.42f
        drawCircle(color = color, radius = radius, center = c, style = Stroke(width = stroke))
        drawLine(color, c, Offset(c.x, c.y - radius * 0.55f), stroke, StrokeCap.Round)
        drawLine(color, c, Offset(c.x + radius * 0.42f, c.y + radius * 0.05f), stroke, StrokeCap.Round)
    }
}

/** A head-and-shoulders silhouette in a ring -- Account. */
@Composable
fun AccountGlyph(modifier: Modifier = Modifier, size: Dp = 22.dp, color: Color = LocalContentColor.current) {
    Canvas(modifier = modifier.size(size)) {
        val stroke = strokeWidthFor(this.size.minDimension)
        val w = this.size.width
        val h = this.size.height
        val headRadius = this.size.minDimension * 0.16f
        drawCircle(color = color, radius = headRadius, center = Offset(w / 2f, h * 0.36f), style = Stroke(width = stroke))
        val shoulderY = h * 0.78f
        val shoulderHalfWidth = w * 0.24f
        drawArc(
            color = color,
            startAngle = 200f,
            sweepAngle = 140f,
            useCenter = false,
            topLeft = Offset(w / 2f - shoulderHalfWidth, shoulderY - shoulderHalfWidth * 0.8f),
            size = Size(shoulderHalfWidth * 2f, shoulderHalfWidth * 1.6f),
            style = Stroke(width = stroke, cap = StrokeCap.Round),
        )
    }
}
