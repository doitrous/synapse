package com.synapse.app.core.sync

/**
 * Singleton per-student user-owned documents [SyncEngine.refresh] pulls onto a fresh
 * device (in addition to draining the write outbox). Each key must satisfy
 * [StateOwnership.isUserOwned] — it round-trips through `/state/user/:key`, not the
 * shared `/state/:key` catalogue endpoint. Extend this list as features land (Notebook,
 * Whiteboard, ...); QBank's flagged/missed/previous sources are a later follow-up.
 */
val STUDENT_USER_STATE_KEYS: List<String> = listOf(
    "synapse.flashcards.decks.v1",
    "synapse.flashcards.dailyCounts.v1",
    "synapse.library.read",
    "synapse.library.personalTags",
    "synapse.bookmarks.resources.v1",
)
