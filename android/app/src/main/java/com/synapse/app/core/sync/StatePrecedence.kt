package com.synapse.app.core.sync
import java.time.Instant

object StatePrecedence {
    private fun parseOrNull(s: String?): Instant? =
        if (s == null) null else try { Instant.parse(s) } catch (e: Exception) { null }

    /** Port of web `recoveryCopyWins`: a local write wins only when strictly newer. */
    fun localCopyWins(savedAt: String?, serverUpdatedAt: String?): Boolean {
        val saved = parseOrNull(savedAt) ?: return false
        val server = parseOrNull(serverUpdatedAt) ?: return true
        return saved.isAfter(server) // strictly newer; equal means server already has it
    }
}
