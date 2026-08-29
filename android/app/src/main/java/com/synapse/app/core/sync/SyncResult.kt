package com.synapse.app.core.sync

/** Outcome of a sync pass: how many outbox docs were pushed, how many abandoned
 *  (server said forbidden — they will never succeed), and whether the drain was
 *  stopped early because the session was unauthorized (everything kept for retry). */
data class SyncResult(val pushed: Int, val abandoned: Int, val stoppedUnauthorized: Boolean)
