package com.synapse.app.core.qbank

import java.time.Instant
import kotlin.random.Random

/**
 * Mints session ids for a sitting of the question bank.
 *
 * A port of the web's `` `qb-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}` ``
 * (see `src/pages/student/QuestionBank.tsx`). The clock and the random source
 * are both injected so a caller can produce a deterministic id in tests — the
 * shape (a base-36 timestamp plus five random base-36 characters) only needs
 * to be unique and sortable-ish in production, not exactly reproducible.
 */
object QBankSessionId {

    private const val ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789"
    private const val SUFFIX_LENGTH = 5

    /** `"qb-" + base36(now.toEpochMilli()) + "-" + 5 random [a-z0-9] chars from [rng]`. */
    fun mint(now: Instant, rng: Random): String {
        val timestamp = now.toEpochMilli().toString(36)
        val suffix = buildString {
            repeat(SUFFIX_LENGTH) { append(ALPHABET[rng.nextInt(ALPHABET.length)]) }
        }
        return "qb-$timestamp-$suffix"
    }
}
