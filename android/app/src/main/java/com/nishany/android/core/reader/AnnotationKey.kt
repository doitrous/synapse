package com.nishany.android.core.reader

/**
 * Where a student's marks are stored.
 *
 * A port of iOS `Core/Reader/AnnotationKey.swift`. Every string this produces
 * must match the other clients byte for byte -- a key that differs by one
 * character is not an error, it is a second, invisible set of notes.
 *
 * The prefix is deliberately kept `synapse.annotations.v1.` / `synapse.reader.`
 * (lowercase, not the rebranded `nishany.` spelling) -- this is a shared
 * persisted key across web/iOS/Android and the "keys later" wave leaves it
 * alone. Both spellings are already routed to the student's own store by
 * [com.nishany.android.core.sync.StateOwnership]. NOTE: `src/lib/reader/annotationKey.ts`
 * in this worktree currently spells its own prefix `nishany.annotations.v1.`
 * -- the opposite of what this port uses and of what iOS's own
 * `AnnotationKey.swift` still uses. That is a real mismatch between the web
 * source as it stands today and this task's explicit brief; flagged here
 * rather than silently resolved either way, since only whoever is tracking
 * the full rebrand across all three clients can say which one is stale.
 *
 * One key is one JSON document rewritten in full on every change, so marks
 * are sharded by page range: a stroke rewrites sixteen pages' worth, and the
 * reader keeps only the shards near the viewport open.
 */
object AnnotationKey {

    /** Pages per shard. Small enough to rewrite cheaply, large enough to be few. */
    const val SHARD_PAGES = 16

    private const val PREFIX = "synapse.annotations.v1."

    /** `k VARCHAR(160)` in `user_state`. */
    private const val MAX_KEY_LENGTH = 160

    /** Room for the longest suffix appended below: `.s` plus digits. */
    private const val SUFFIX_BUDGET = 8

    enum class Kind(val prefix: String) {
        /** A catalogue resource. */
        RESOURCE("r-"),

        /** The student's own upload. */
        DOCUMENT("d-"),
    }

    fun shardIndex(page: Int): Int = (maxOf(1, page) - 1) / SHARD_PAGES

    /** The inclusive page range a shard covers. */
    fun pageRange(shardIndex: Int): IntRange =
        (shardIndex * SHARD_PAGES + 1)..((shardIndex + 1) * SHARD_PAGES)

    /** The shards a page range touches, so the reader loads only what it shows. */
    fun shards(fromPage: Int, toPage: Int): IntRange = shardIndex(fromPage)..shardIndex(toPage)

    /**
     * A stable, bounded name for one document. An id long enough to threaten
     * the column is hashed rather than truncated -- truncation would let two
     * documents collide silently and share each other's notes.
     */
    fun scope(kind: Kind, id: String): String {
        val budget = MAX_KEY_LENGTH - PREFIX.length - SUFFIX_BUDGET - kind.prefix.length
        val safe = id.map { c ->
            if (c.isLetterOrDigit() && c.code < 128 || c == '.' || c == '_' || c == '-') c else '_'
        }.joinToString("")
        return if (safe.length <= budget) "${kind.prefix}$safe" else "${kind.prefix}h${fnv1a(id)}"
    }

    fun manifestKey(scope: String): String = "$PREFIX$scope.idx"

    fun shardKey(scope: String, index: Int): String = "$PREFIX$scope.s$index"

    /**
     * FNV-1a, hex. Not a security boundary -- just a short, stable name.
     * Hashes the *original* id, not the sanitised one, exactly as the web
     * does: sanitising first would make two ids differing only in
     * punctuation hash the same.
     */
    fun fnv1a(value: String): String {
        var hash = 0x811c9dc5.toInt()
        // UTF-16 code units, matching JS `charCodeAt` -- the same string must
        // be walked the same way or the hash diverges on anything non-ASCII.
        for (unit in value) {
            hash = hash xor unit.code
            hash *= 0x01000193
        }
        return (hash.toLong() and 0xffffffffL).toString(16).padStart(8, '0')
    }
}
