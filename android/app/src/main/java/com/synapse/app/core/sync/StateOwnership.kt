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
