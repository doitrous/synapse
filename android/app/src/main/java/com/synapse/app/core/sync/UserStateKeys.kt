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
    // Notebook. One array under this key, matching web's `usePersistentState`
    // and iOS's `Note.storageKey` — there is no per-note `synapse.notebook.<id>`
    // key on either client (see `core/notebook/Notebook.kt`'s doc comment).
    "synapse.notebook.notes",
    "synapse.bookmarks.resources.v1",
    "synapse.essay.answers.v1",
    "synapse.written.answers.v1",
    "synapse.practical.progress.v1",
    // Adaptive Study. No entry for `synapse.progress.adaptive.evidenceIndex.v1`
    // or the monthly `synapse.progress.adaptive.evidence.*` docs web/iOS use —
    // Android's AdaptiveRepository reuses the QBank attempts store as its
    // evidence source instead of maintaining a parallel evidence ledger (see
    // `feature/adaptive/AdaptiveRepository.kt`'s doc comment).
    "synapse.progress.adaptive.plan.v1",
    "synapse.progress.adaptive.readiness.v1",
    "synapse.progress.adaptive.session.v1",
    "synapse.progress.adaptive.boosts.v1",
    "synapse.progress.adaptive.coverageDebt.v1",
    "synapse.progress.adaptive.overrides.v1",
    "synapse.progress.adaptive.readinessSession.v1",
    // QBank's Flagged & missed hub and Previous tests: the flag list, the
    // served-question manifest "omitted" is derived from, and the names a
    // student has given their own sittings. See QBankRepository.
    "synapse.qbank.marked.v1",
    "synapse.qbank.sessionQuestions.v1",
    "synapse.qbank.sessionNames.v1",
    // Whiteboard. Both keys are pulled: the collection is the live document, and
    // the legacy singleton is read once so a board saved from the web before the
    // collection existed is still there to migrate (see
    // `core/whiteboard/WhiteboardModel.kt`'s `migrateSingleBoardToCollection`).
    "synapse.whiteboard.boards.v1",
    "synapse.whiteboard.board",
)
