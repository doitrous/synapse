package com.synapse.android.feature.focus

import android.content.Context
import androidx.compose.runtime.Composable
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.glance.GlanceId
import androidx.glance.GlanceModifier
import androidx.glance.GlanceTheme
import androidx.glance.action.actionStartActivity
import androidx.glance.action.clickable
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.GlanceAppWidgetReceiver
import androidx.glance.appwidget.provideContent
import androidx.glance.background
import androidx.glance.layout.Column
import androidx.glance.layout.fillMaxSize
import androidx.glance.layout.padding
import androidx.glance.semantics.contentDescription
import androidx.glance.semantics.semantics
import androidx.glance.text.FontWeight
import androidx.glance.text.Text
import androidx.glance.text.TextStyle
import com.synapse.android.MainActivity
import java.time.LocalDate
import java.time.format.DateTimeFormatter

private val DATE_FORMAT = DateTimeFormatter.ofPattern("EEEE, MMM d")

/**
 * The home-screen calendar/timetable widget -- a shell only.
 *
 * ponytail: Android has no schedule/timetable data source yet (it lands
 * with the schedule feature port, M5/M6 per this task's brief), so this
 * shows today's date and an honest empty state rather than fabricating
 * lectures. Upgrade path: once a local schedule store exists (mirroring
 * [FocusTasksStore]'s pattern), read today's entries here the same way
 * [FocusTasksWidget] reads [FocusTasksStore].
 */
class FocusCalendarWidget : GlanceAppWidget() {
    override suspend fun provideGlance(context: Context, id: GlanceId) {
        provideContent {
            GlanceTheme(colors = GlanceCortexColors) {
                CalendarWidgetContent()
            }
        }
    }
}

class FocusCalendarWidgetReceiver : GlanceAppWidgetReceiver() {
    override val glanceAppWidget: GlanceAppWidget = FocusCalendarWidget()
}

@Composable
private fun CalendarWidgetContent() {
    Column(
        modifier = GlanceModifier
            .fillMaxSize()
            .background(GlanceTheme.colors.surface)
            .padding(12.dp)
            .clickable(actionStartActivity<MainActivity>())
            .semantics { contentDescription = "Open Nishany calendar" },
    ) {
        Text(
            LocalDate.now().format(DATE_FORMAT),
            style = TextStyle(color = GlanceTheme.colors.onSurface, fontWeight = FontWeight.Bold, fontSize = 14.sp),
        )
        Text(
            "Your timetable will appear here",
            style = TextStyle(color = GlanceTheme.colors.onSurfaceVariant, fontSize = 12.sp),
        )
    }
}
