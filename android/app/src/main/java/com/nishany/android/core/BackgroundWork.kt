package com.nishany.android.core

import android.util.Log
import kotlinx.coroutines.CoroutineExceptionHandler
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob

/**
 * The scope every ViewModel in this app runs its own background work on.
 *
 * The [SupervisorJob] is not the whole story, and used to be mistaken for
 * it. It stops one failed child from cancelling its siblings -- so a decode
 * failure in the ticker does not kill the write path -- but it does nothing
 * at all about where the exception goes next. Without a
 * [CoroutineExceptionHandler] in the context, an exception that escapes a
 * `launch` reaches the thread's default uncaught-exception handler, and on
 * Android that handler is `KillApplicationHandler`: the process dies.
 *
 * That is a real path, not a theoretical one.
 * [com.nishany.android.feature.practical.PracticalViewModel] deliberately
 * throws when the stored practical-progress document will not decode --
 * folding an empty document over a real one would erase the student's work
 * on every client, so refusing to write is correct. But refusing to write
 * must cost the student that one save, not the app they are sitting an exam
 * in. One document this build cannot read, written by a client that knows a
 * shape it does not, and finishing a station took the whole process down.
 *
 * [owner] names the ViewModel in the log line, because by the time an
 * exception arrives here the stack it came from is a coroutine's, and the
 * screen that was on is the thing worth knowing.
 *
 * Handling an exception here is the floor, not the ceiling: a background
 * failure the student needs to know about still has to be surfaced where it
 * happened -- see [com.nishany.android.feature.practical.PracticalViewModel.saveFailed].
 * This is what keeps the app alive long enough to say so.
 */
fun backgroundWorkScope(owner: String): CoroutineScope =
    CoroutineScope(
        SupervisorJob() +
            Dispatchers.Default +
            CoroutineExceptionHandler { _, error ->
                Log.e(BACKGROUND_WORK_TAG, "$owner: background work failed and nothing caught it", error)
            },
    )

/** One tag for every ViewModel's background failures, so `adb logcat -s` finds all of them at once. */
const val BACKGROUND_WORK_TAG = "CortexBackground"
