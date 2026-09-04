package com.synapse.android.feature.focus

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.synapse.android.MainActivity
import com.synapse.android.R
import com.synapse.android.core.notifications.hasNotificationPermission

/** `NotificationCompat.Builder`'s title/body -- split out so it unit-tests as plain JVM; see [FocusNotifierTest]. */
data class FocusNotificationContent(val title: String, val text: String)

/**
 * What the ongoing notification shows for [state] -- the live clock (mode-aware,
 * via [formatClock]) and, if one is selected, the task title. Pure: no Android,
 * no Context, so it is exercised directly by [FocusNotifierTest] without
 * Robolectric.
 */
fun buildFocusNotificationContent(state: FocusSessionState, taskTitle: String?): FocusNotificationContent {
    val clock = formatClock(if (state.mode == FocusMode.COUNTDOWN) state.remainingSeconds else state.elapsedSeconds)
    val title = if (taskTitle != null) "Focusing on $taskTitle" else "Focus block running"
    return FocusNotificationContent(title = title, text = clock)
}

/**
 * The Android "Live Activity" equivalent this task's brief asks for: an
 * ongoing, silent notification mirroring the running focus block.
 *
 * ponytail: no foreground service backs this. [FocusSession.tick] already
 * catches up from wall-clock on resume, so the block's elapsed time stays
 * correct even if this process is killed and the notification stops
 * refreshing in the background -- the next heartbeat (or the app reopening)
 * repaints it correctly rather than drifting silently. A foreground service
 * is only needed for *continuous* background ticking once the process is
 * gone, which is not what this task asks for; upgrade path if that
 * changes: a `FOREGROUND_SERVICE_DATA_SYNC`-typed service driving this
 * same [update] once a second.
 */
class FocusNotifier(private val context: Context) {
    init {
        ensureChannel()
    }

    /** Posts/updates the ongoing notification. No-op (and no crash) if [state] is not running, or the app was never granted POST_NOTIFICATIONS -- this never re-prompts. */
    fun update(state: FocusSessionState, taskTitle: String?) {
        if (!state.running) {
            clear()
            return
        }
        if (!context.hasNotificationPermission()) return

        val content = buildFocusNotificationContent(state, taskTitle)
        val notification = NotificationCompat.Builder(context, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(content.title)
            .setContentText(content.text)
            .setOngoing(true)
            .setOnlyAlertOnce(true)
            .setSilent(true)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setCategory(NotificationCompat.CATEGORY_PROGRESS)
            .setContentIntent(openAppPendingIntent())
            .addAction(toggleAction(state.running))
            .addAction(stopAction())
            .build()
        NotificationManagerCompat.from(context).notify(NOTIFICATION_ID, notification)
    }

    fun clear() {
        NotificationManagerCompat.from(context).cancel(NOTIFICATION_ID)
    }

    private fun ensureChannel() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return
        val channel = NotificationChannel(CHANNEL_ID, "Focus timer", NotificationManager.IMPORTANCE_LOW).apply {
            description = "The running focus block's live clock."
            setSound(null, null)
            setShowBadge(false)
        }
        context.getSystemService(NotificationManager::class.java).createNotificationChannel(channel)
    }

    /** Tap-to-open: lands back on the focus timer, not just the app's last tab. */
    private fun openAppPendingIntent(): PendingIntent {
        val intent = Intent(context, MainActivity::class.java).apply {
            action = Intent.ACTION_MAIN
            addCategory(Intent.CATEGORY_LAUNCHER)
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
            putExtra(MainActivity.EXTRA_OPEN_FOCUS_TIMER, true)
        }
        return PendingIntent.getActivity(context, REQUEST_OPEN, intent, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
    }

    private fun toggleAction(running: Boolean): NotificationCompat.Action {
        val intent = Intent(context, FocusNotificationReceiver::class.java).setAction(ACTION_TOGGLE)
        val pending = PendingIntent.getBroadcast(context, REQUEST_TOGGLE, intent, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
        val label = if (running) "Pause" else "Resume"
        return NotificationCompat.Action.Builder(R.drawable.ic_notification, label, pending).build()
    }

    private fun stopAction(): NotificationCompat.Action {
        val intent = Intent(context, FocusNotificationReceiver::class.java).setAction(ACTION_STOP)
        val pending = PendingIntent.getBroadcast(context, REQUEST_STOP, intent, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
        return NotificationCompat.Action.Builder(R.drawable.ic_notification, "Stop", pending).build()
    }

    companion object {
        const val CHANNEL_ID = "focus-timer"
        const val ACTION_TOGGLE = "com.synapse.android.action.FOCUS_TOGGLE"
        const val ACTION_STOP = "com.synapse.android.action.FOCUS_STOP"
        private const val NOTIFICATION_ID = 4_201
        private const val REQUEST_OPEN = 1
        private const val REQUEST_TOGGLE = 2
        private const val REQUEST_STOP = 3
    }
}
