package com.synapse.android.feature.home

import androidx.compose.foundation.Canvas
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
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.synapse.android.AppGraph
import com.synapse.android.design.CortexColors
import com.synapse.android.design.CortexRadius
import com.synapse.android.design.DailyGlyph
import com.synapse.android.design.HistoryGlyph
import com.synapse.android.design.LocalCortex
import com.synapse.android.design.PracticalGlyph
import com.synapse.android.design.QuestionBankGlyph
import com.synapse.android.design.Wordmark

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
) {
    val viewModel: HomeViewModel = viewModel(factory = HomeViewModel.factory(graph.auth, graph.store))
    val ui by viewModel.ui.collectAsState()
    HomeScreen(
        ui = ui,
        onOpenQuestionBank = onOpenQuestionBank,
        onOpenPractical = onOpenPractical,
        onOpenDaily = onOpenDaily,
        onOpenAccount = onOpenAccount,
    )
}

/**
 * A greeting, the day's own target, a resume card for a sitting still open,
 * and the four surfaces a student reaches for most.
 *
 * Ported layout-for-layout from the "Nishany Brand System" design canvas
 * (`ScreenEN.dc.html`): header, greeting, hero target card, an optional
 * resume card, then a 2x2 grid. Padding runs on `start`/`end`, never
 * `left`/`right`, so the layout mirrors correctly the day the app grows an
 * Arabic locale -- see [Modifier.padding] calls below.
 */
@Composable
fun HomeScreen(
    ui: HomeUi,
    onOpenQuestionBank: () -> Unit,
    onOpenPractical: () -> Unit,
    onOpenDaily: () -> Unit,
    onOpenAccount: () -> Unit,
) {
    val cortex = LocalCortex.current
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(cortex.paper)
            .verticalScroll(rememberScrollState())
            .padding(start = 20.dp, end = 20.dp, top = 20.dp, bottom = 28.dp),
        verticalArrangement = Arrangement.spacedBy(18.dp),
    ) {
        HomeHeader(avatarInitial = ui.avatarInitial, onAvatarClick = onOpenAccount)

        Text(ui.greeting, style = MaterialTheme.typography.titleLarge, color = cortex.ink)

        HeroTargetCard(ui = ui, onContinue = onOpenQuestionBank)

        ui.resume?.let { resume ->
            ResumeCard(resume = resume, onResume = onOpenQuestionBank)
        }

        HomeGrid(
            ui = ui,
            onOpenQuestionBank = onOpenQuestionBank,
            onOpenPractical = onOpenPractical,
            onOpenDaily = onOpenDaily,
        )
    }
}

@Composable
private fun HomeHeader(avatarInitial: String, onAvatarClick: () -> Unit) {
    val cortex = LocalCortex.current
    Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
        Wordmark(height = 26.dp)
        Spacer(modifier = Modifier.weight(1f))
        Box(
            modifier = Modifier
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
        TargetRing(progress = progressOf(ui))

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

private fun progressOf(ui: HomeUi): Float =
    if (ui.goal <= 0) 0f else (ui.todayCount.toFloat() / ui.goal).coerceIn(0f, 1f)

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

/**
 * The 88dp target ring: a full track, a faint inner circle purely for
 * texture, and the progress arc starting at twelve o'clock and sweeping
 * clockwise -- drawn with [Canvas]/`drawArc` rather than a vector asset so
 * [progress] can animate against a live figure with no per-frame asset swap.
 */
@Composable
private fun TargetRing(progress: Float, modifier: Modifier = Modifier, diameter: Dp = 88.dp) {
    val cortex = LocalCortex.current
    Canvas(modifier = modifier.size(diameter)) {
        val strokeWidth = 8.dp.toPx()
        val arcDiameter = size.minDimension - strokeWidth
        val topLeft = Offset((size.width - arcDiameter) / 2f, (size.height - arcDiameter) / 2f)
        val arcSize = androidx.compose.ui.geometry.Size(arcDiameter, arcDiameter)

        drawArc(
            color = cortex.inset,
            startAngle = 0f,
            sweepAngle = 360f,
            useCenter = false,
            topLeft = topLeft,
            size = arcSize,
            style = Stroke(width = strokeWidth, cap = StrokeCap.Round),
        )

        // A faint inner ring for texture -- r30/44 of the mock's 88dp ring.
        val innerRadius = (size.minDimension / 2f) * (30f / 44f)
        drawCircle(
            color = cortex.line,
            radius = innerRadius,
            center = center,
            style = Stroke(width = 1.5.dp.toPx()),
        )

        drawArc(
            color = cortex.primary,
            startAngle = -90f,
            sweepAngle = 360f * progress,
            useCenter = false,
            topLeft = topLeft,
            size = arcSize,
            style = Stroke(width = strokeWidth, cap = StrokeCap.Round),
        )

        drawCircle(color = cortex.primary, radius = 4.dp.toPx(), center = center)
    }
}

@Composable
private fun ResumeCard(resume: ResumeInfo, onResume: () -> Unit) {
    val cortex = LocalCortex.current
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(14.dp))
            .background(cortex.surface)
            .border(1.dp, cortex.line, RoundedCornerShape(14.dp))
            .clickable(onClick = onResume)
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
        ResumePill()
    }
}

@Composable
private fun ResumePill() {
    val cortex = LocalCortex.current
    Box(
        modifier = Modifier
            .clip(CircleShape)
            .background(cortex.primaryTint)
            .border(1.dp, cortex.primaryLine, CircleShape)
            .padding(horizontal = 12.dp, vertical = 6.dp),
    ) {
        Text("Resume", fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = cortex.primaryStrong)
    }
}

@Composable
private fun HomeGrid(
    ui: HomeUi,
    onOpenQuestionBank: () -> Unit,
    onOpenPractical: () -> Unit,
    onOpenDaily: () -> Unit,
) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        val cortex = LocalCortex.current
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            GridCard(
                icon = { QuestionBankGlyph(color = cortex.accentStrong) },
                label = "Question bank",
                sublabel = "${groupedCount(ui.questionCount)} questions",
                onClick = onOpenQuestionBank,
                modifier = Modifier.weight(1f),
            )
            GridCard(
                icon = { PracticalGlyph(color = cortex.accentStrong) },
                label = "Practical",
                sublabel = "${groupedCount(ui.practicalCount)} stations",
                onClick = onOpenPractical,
                modifier = Modifier.weight(1f),
            )
        }
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            GridCard(
                icon = { DailyGlyph(color = cortex.accentStrong) },
                label = "Daily question",
                sublabel = "One a day",
                onClick = onOpenDaily,
                modifier = Modifier.weight(1f),
            )
            GridCard(
                icon = { HistoryGlyph(color = cortex.accentStrong) },
                label = "Previous sittings",
                sublabel = "${groupedCount(ui.previousSittingsCount)} sittings",
                onClick = onOpenQuestionBank,
                modifier = Modifier.weight(1f),
            )
        }
    }
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
