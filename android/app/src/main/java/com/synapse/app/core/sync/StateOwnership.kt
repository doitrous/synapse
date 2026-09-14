package com.synapse.app.core.sync

/**
 * Direct port of the web app's USER_OWNED_PATTERNS (src/lib/stateOwnership.ts).
 * Chooses the endpoint only; the server derives the real owner from the session.
 * A mismatch here silently splits a student's progress across devices — keep it
 * byte-for-byte in sync with the web list (and the iOS StateOwnership.swift).
 */
object StateOwnership {
    private val userOwned: List<Regex> = listOf(
        Regex("^synapse-lang$"),
        Regex("^synapse\\.notebook\\."),
        Regex("^synapse\\.whiteboard\\."),
        Regex("^synapse\\.calendar\\.blocks$"),
        Regex("^synapse\\.library\\.(read|userArticles|personalTags|marks)"),
        Regex("^synapse\\.account\\."),
        Regex("^synapse-notification-read-v1-"),
        Regex("^synapse-applied-voucher-v1$"),
        Regex("^synapse\\.qbank\\."),
        Regex("^synapse\\.flashcards\\."),
        Regex("^synapse\\.practical\\."),
        Regex("^synapse\\.essay\\."),
        // Web's own USER_OWNED_PATTERNS has no entry for `synapse.written.` —
        // `synapse.written.answers.v1` (src/lib/useWrittenAnswers.ts) matches no
        // pattern there, so a live-mode save would route to the shared/admin
        // endpoint and be refused for a student. Added here so the written
        // self-mark flow actually persists; flagged rather than silently
        // ported so the same gap can be fixed on web.
        Regex("^synapse\\.written\\."),
        Regex("^synapse\\.highlights\\."),
        Regex("^synapse\\.annotations\\."),
        Regex("^synapse\\.reader\\."),
        Regex("^synapse\\.bookmarks\\."),
        Regex("^synapse\\.progress\\."),
        Regex("^synapse\\.maristanas\\."),
        Regex("^synapse\\.myDocuments\\."),
        Regex("^synapse\\.termgrid\\."),
    )

    fun isUserOwned(key: String): Boolean = userOwned.any { it.containsMatchIn(key) }
}
