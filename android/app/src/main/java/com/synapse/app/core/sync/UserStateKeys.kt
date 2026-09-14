package com.synapse.app.core.sync

/**
 * Singleton per-student user-owned documents [SyncEngine.refresh] pulls onto a fresh
 * device (in addition to draining the write outbox). Each key must satisfy
 * [StateOwnership.isUserOwned] — it round-trips through `/state/user/:key`, not the
 * shared `/state/:key` catalogue endpoint. Extend this list as features land (Notebook,
 * Whiteboard, ...).
 */
val STUDENT_USER_STATE_KEYS: List<String> = listOf(
    "synapse.flashcards.decks.v1",
    "synapse.flashcards.dailyCounts.v1",
    "synapse.library.read",
    "synapse.library.personalTags",
    "synapse.bookmarks.resources.v1",
    "synapse.essay.answers.v1",
    "synapse.written.answers.v1",
    "synapse.practical.progress.v1",
    // QBank's Flagged & missed hub and Previous tests: the flag list, the
    // served-question manifest "omitted" is derived from, and the names a
    // student has given their own sittings. See QBankRepository.
    "synapse.qbank.marked.v1",
    "synapse.qbank.sessionQuestions.v1",
    "synapse.qbank.sessionNames.v1",
)
