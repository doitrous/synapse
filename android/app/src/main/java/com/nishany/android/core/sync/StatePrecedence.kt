package com.nishany.android.core.sync

import java.time.Instant

/**
 * Who wins when the device holds a copy of a document the server also has.
 *
 * A port of `recoveryCopyWins` in `src/lib/statePrecedence.ts`. Deliberately
 * conservative: a local copy may only win when it can be *shown* to be newer.
 * Letting it win by default is how an idle device re-uploads stale data and
 * silently reverts work done elsewhere.
 */
object StatePrecedence {

    fun localCopyWins(localSavedAt: Instant?, serverUpdatedAt: Instant?): Boolean {
        if (localSavedAt == null) return false
        // Nothing on the server to compare against — an unwritten key, or an
        // older server that does not send the stamp — so keep the offline edit.
        if (serverUpdatedAt == null) return true
        // Strictly newer. An equal stamp means the server already has this write.
        return localSavedAt.isAfter(serverUpdatedAt)
    }
}
