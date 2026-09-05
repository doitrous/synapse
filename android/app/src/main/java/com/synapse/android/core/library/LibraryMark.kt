package com.synapse.android.core.library

import kotlinx.serialization.Serializable

/**
 * A student's own highlight or sticky note on a library article.
 *
 * A direct port of `LibraryMark` in `src/data/libraryMarks.ts` (and the
 * anchor in `src/lib/library/textAnchor.ts`) and of iOS's
 * `Core/Library/LibraryMark.swift`, and it must stay one: this phone reads
 * and writes the very same document the website and the iPhone do, so the
 * JSON shape here -- field names, the anchor, the tone as a bare string -- is
 * the contract.
 *
 * One record, deliberately, for two things: a highlight is a note with
 * nothing written in it yet. [note] empty is a highlight; [note] set is a
 * sticky note.
 */
@Serializable
data class LibraryMark(
    val id: String,
    val articleId: String,
    val anchor: TextAnchor,
    /**
     * A `NOTE_TONES` value from the web palette. Kept as a bare string so a
     * tone authored anywhere round-trips untouched, even one this build does
     * not offer in its own toolbar.
     */
    val tone: String,
    /** Empty for a plain highlight. */
    val note: String,
    /** ISO-8601, for ordering a student's own marks. */
    val createdAt: String,
)

/**
 * Where a mark is pinned in the prose: the words, and a little of either
 * side so repeats of the same phrase can be told apart. The shape the W3C
 * text-quote selector settled on, and what `textAnchor.ts` records.
 */
@Serializable
data class TextAnchor(
    /**
     * Which run of text in the article this belongs to. Opaque: the reader
     * assigns them and only has to be consistent with itself between
     * renders.
     */
    val block: String,
    /** The selected words, exactly as they appeared. */
    val exact: String,
    /** Up to [LibraryMarks.contextWindow] characters before the selection. */
    val prefix: String,
    /** Up to [LibraryMarks.contextWindow] characters after it. */
    val suffix: String,
)

/** A half-open `[start, end)` range in a block's text. */
data class TextRange(val start: Int, val end: Int)

/** Marks keyed by the article they sit on -- the whole stored document. */
typealias LibraryMarkStore = Map<String, List<LibraryMark>>

object LibraryMarks {

    /**
     * Dotted and under `nishany.library.`, which [com.synapse.android.core.sync.StateOwnership]
     * routes to the student's own record. Undotted it would go to the shared
     * catalogue store, where a student may not write and every save would be
     * refused. Matches `LIBRARY_MARKS_STORAGE_KEY` on the web, and
     * `LibraryMarks.storageKey` on iOS, exactly.
     */
    const val storageKey = "nishany.library.marks.v1"

    /** The tones the selection toolbar offers, in the order shown. `MARK_TONES` on the web. */
    val offeredTones = listOf("amber", "teal", "rose", "sage")

    /** How much of either side an anchor keeps. `CONTEXT` in `textAnchor.ts`. */
    const val contextWindow = 32

    private var sequence = 0

    /** `mk-<base36 millis>-<seq>`, matching `newMarkId` on the web. */
    fun newMarkId(nowMillis: Long = System.currentTimeMillis()): String {
        sequence += 1
        return "mk-${nowMillis.toString(36)}-$sequence"
    }

    // -- Store folds (ports of libraryMarks.ts) -----------------------------

    fun marks(store: LibraryMarkStore, articleId: String): List<LibraryMark> = store[articleId] ?: emptyList()

    /** Add or replace a mark, keeping each article's list in creation order. */
    fun upsert(store: LibraryMarkStore, mark: LibraryMark): LibraryMarkStore {
        val list = (store[mark.articleId] ?: emptyList()).filter { it.id != mark.id } + mark
        return store + (mark.articleId to list)
    }

    /** Remove a mark, and the article's entry entirely once its last one goes. */
    fun remove(store: LibraryMarkStore, articleId: String, markId: String): LibraryMarkStore {
        val remaining = (store[articleId] ?: emptyList()).filter { it.id != markId }
        return if (remaining.isEmpty()) store - articleId else store + (articleId to remaining)
    }

    // -- Anchoring (port of textAnchor.ts) -----------------------------------

    /**
     * Build an anchor for the range `[start, end)` of a block's [text], or
     * null when the range is empty or out of bounds.
     *
     * ponytail: offsets are plain UTF-16 code units (Kotlin's native `String`
     * index), not Unicode scalars like the Swift port -- the two differ only
     * for text outside the Basic Multilingual Plane (rare emoji, some CJK
     * extensions), which article prose never contains. Upgrade to
     * codepoint-aware indexing if that stops being true.
     */
    fun makeAnchor(block: String, text: String, start: Int, end: Int): TextAnchor? {
        if (start < 0 || end > text.length || end <= start) return null
        val exact = text.substring(start, end)
        if (exact.isBlank()) return null
        val prefixStart = maxOf(0, start - contextWindow)
        val suffixEnd = minOf(text.length, end + contextWindow)
        return TextAnchor(
            block = block,
            exact = exact,
            prefix = text.substring(prefixStart, start),
            suffix = text.substring(end, suffixEnd),
        )
    }

    /**
     * Where this [anchor] sits in [text] now, or null if its words have gone.
     *
     * When the phrase occurs more than once, the occurrence whose
     * surroundings still match best wins. A case-insensitive pass is a
     * deliberate second choice -- an editor recasing a sentence should not
     * lose a highlight -- but exact matches are always preferred when any
     * exist.
     */
    fun resolveAnchor(text: String, anchor: TextAnchor): TextRange? {
        if (anchor.exact.isEmpty()) return null

        var starts = occurrences(text, anchor.exact)
        if (starts.isEmpty()) {
            val lowerText = text.lowercase()
            val lowerNeedle = anchor.exact.lowercase()
            // A recased edit only changes letters, never the length, so the
            // lowered indices still address the original text.
            if (lowerText.length == text.length) {
                starts = occurrences(lowerText, lowerNeedle)
            }
        }
        val length = anchor.exact.length
        if (starts.isEmpty()) return null
        if (starts.size == 1) return TextRange(starts[0], starts[0] + length)

        var best = starts[0]
        var bestScore = -1
        for (start in starts) {
            val score = commonRun(text.substring(0, start), anchor.prefix, fromEnd = true) +
                commonRun(text.substring(start + length), anchor.suffix, fromEnd = false)
            if (score > bestScore) {
                bestScore = score
                best = start
            }
        }
        return TextRange(best, best + length)
    }

    /** Every index at which [needle] occurs in [haystack], including overlaps. */
    private fun occurrences(haystack: String, needle: String): List<Int> {
        if (needle.isEmpty() || needle.length > haystack.length) return emptyList()
        val found = mutableListOf<Int>()
        var at = haystack.indexOf(needle)
        while (at != -1) {
            found.add(at)
            at = haystack.indexOf(needle, at + 1)
        }
        return found
    }

    /** How many characters two strings share, reading inward from the given ends. */
    private fun commonRun(a: String, b: String, fromEnd: Boolean): Int {
        val limit = minOf(a.length, b.length)
        var run = 0
        while (run < limit) {
            val left = if (fromEnd) a[a.length - 1 - run] else a[run]
            val right = if (fromEnd) b[b.length - 1 - run] else b[run]
            if (left != right) break
            run++
        }
        return run
    }

    // -- Placement ------------------------------------------------------

    /** One placed mark and where it resolves to in a block's text now. */
    data class Placement(val mark: LibraryMark, val range: TextRange)

    /**
     * Assign every mark to at most one block, and collect the ones whose
     * words are gone from the whole article.
     *
     * A mark is placed in the block its anchor names when the words are
     * still there; failing that -- which is every mark made on the other
     * platform, whose block ids never match this projection's -- in the
     * first block whose text still contains them. Only when no block holds
     * the words at all is a mark an orphan, exactly as the web decides it.
     * Placing in at most one block is what stops a phrase that recurs in two
     * blocks being drawn twice.
     *
     * @param blocks every markable block, in reading order, as (id, text).
     * @return placements keyed by block id (each in the marks' own order), and the orphans in that same order.
     */
    fun place(
        marks: List<LibraryMark>,
        blocks: List<Pair<String, String>>,
    ): Pair<Map<String, List<Placement>>, List<LibraryMark>> {
        val placements = LinkedHashMap<String, MutableList<Placement>>()
        val orphans = mutableListOf<LibraryMark>()
        val byId = LinkedHashMap<String, String>()
        for ((id, text) in blocks) {
            if (id !in byId) byId[id] = text
        }

        for (mark in marks) {
            val ownRange = byId[mark.anchor.block]?.let { resolveAnchor(it, mark.anchor) }
            if (ownRange != null) {
                placements.getOrPut(mark.anchor.block) { mutableListOf() }.add(Placement(mark, ownRange))
                continue
            }
            var placed = false
            for ((id, text) in blocks) {
                val range = resolveAnchor(text, mark.anchor)
                if (range != null) {
                    placements.getOrPut(id) { mutableListOf() }.add(Placement(mark, range))
                    placed = true
                    break
                }
            }
            if (!placed) orphans.add(mark)
        }
        return placements to orphans
    }
}
