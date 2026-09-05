package com.nishany.android.feature.focus

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent

/**
 * Handles the ongoing notification's Pause/Resume and Stop actions.
 *
 * Deliberately talks to [FocusSessionStore] directly rather than to any live
 * [FocusViewModel] -- there may not be one: this process can be started fresh
 * just to service the broadcast (no foreground service pins it alive; see
 * [FocusNotifier]'s class doc). [FocusViewModel.resync] is what reconciles a
 * live instance with whatever this receiver wrote, the next time its screen
 * reaches `Lifecycle.Event.ON_START`.
 */
class FocusNotificationReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val store = FocusSessionStore(context)
        val now = System.currentTimeMillis()
        val before = tick(store.load(), now)
        val after = when (intent.action) {
            FocusNotifier.ACTION_TOGGLE -> if (before.running) pause(before, now) else start(before, now)
            FocusNotifier.ACTION_STOP -> discard(before, now)
            else -> return
        }
        store.save(after)

        val taskTitle = after.selectedTaskId?.let { id ->
            FocusTasksStore(context).tasks.value.firstOrNull { it.id == id }?.title
        }
        FocusNotifier(context).update(after, taskTitle)
    }
}
