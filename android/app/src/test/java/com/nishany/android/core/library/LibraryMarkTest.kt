package com.nishany.android.core.library

import com.nishany.android.core.sync.StateOwnership
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * The article-marks model, folds and anchoring, ported from
 * [ios/SynapseTests/LibraryMarkTests.swift]. The phone reads and writes the
 * very same document the website and the iPhone do, so these lock the JSON
 * shape and the resolution rules to `libraryMarks.ts` / `textAnchor.ts`. A
 * drift here does not throw -- it puts a student's highlight somewhere the
 * other platform never draws it.
 */
class LibraryMarkTest {

    private val json = Json { ignoreUnknownKeys = true }

    // -- Contract ------------------------------------------------------

    @Test
    fun `the storage key is the web's, and routes to the student's store`() {
        assertEquals("nishany.library.marks.v1", LibraryMarks.storageKey)
        assertTrue(StateOwnership.isUserOwned(LibraryMarks.storageKey))
    }

    @Test
    fun `a web-shaped document round-trips`() {
        val webWritten = """
            {
              "art-1": [
                {
                  "id": "mk-abc-1",
                  "articleId": "art-1",
                  "anchor": { "block": "block:2", "exact": "left ventricle", "prefix": "the ", "suffix": " pumps" },
                  "tone": "amber",
                  "note": "remember this",
                  "createdAt": "2026-09-04T10:00:00.000Z"
                },
                {
                  "id": "mk-abc-2",
                  "articleId": "art-1",
                  "anchor": { "block": "summary", "exact": "aorta", "prefix": "", "suffix": "" },
                  "tone": "teal",
                  "note": "",
                  "createdAt": "2026-09-04T10:05:00.000Z"
                }
              ]
            }
        """.trimIndent()

        val store = json.decodeFromString<LibraryMarkStore>(webWritten)
        assertEquals(2, store["art-1"]?.size)
        val mark = store["art-1"]!!.first()
        assertEquals("mk-abc-1", mark.id)
        assertEquals("left ventricle", mark.anchor.exact)
        assertEquals("block:2", mark.anchor.block)
        assertEquals("amber", mark.tone)
        assertEquals("remember this", mark.note)

        val reencoded = json.encodeToString(store)
        val again = json.decodeFromString<LibraryMarkStore>(reencoded)
        assertEquals(store, again)
    }

    @Test
    fun `an unknown tone round-trips rather than being normalised`() {
        val raw = """{"a":[{"id":"m1","articleId":"a","anchor":{"block":"b","exact":"x","prefix":"","suffix":""},"tone":"slate","note":"","createdAt":"t"}]}"""
        val store = json.decodeFromString<LibraryMarkStore>(raw)
        assertEquals("slate", store["a"]?.first()?.tone)
    }

    // -- Anchoring -------------------------------------------------------

    @Test
    fun `an anchor keeps the words and a window of either side`() {
        val text = "The left ventricle pumps blood into the aorta."
        val start = text.indexOf("ventricle")
        val anchor = LibraryMarks.makeAnchor("b", text, start, start + "ventricle".length)!!
        assertEquals("ventricle", anchor.exact)
        assertEquals("The left ", anchor.prefix)
        assertEquals(" pumps blood into the aorta.", anchor.suffix)
    }

    @Test
    fun `an empty or out-of-bounds range makes no anchor`() {
        val text = "abc"
        assertNull(LibraryMarks.makeAnchor("b", text, 1, 1))
        assertNull(LibraryMarks.makeAnchor("b", text, 0, 9))
        assertNull(LibraryMarks.makeAnchor("b", text, -1, 2))
        assertNull(LibraryMarks.makeAnchor("b", "   ", 0, 3))
    }

    @Test
    fun `a single occurrence resolves to itself`() {
        val anchor = TextAnchor(block = "b", exact = "aorta", prefix = "", suffix = "")
        val range = LibraryMarks.resolveAnchor("into the aorta now", anchor)!!
        assertEquals(TextRange(9, 14), range)
    }

    @Test
    fun `a repeated phrase resolves by its surrounding context`() {
        val text = "the left ventricle and the right ventricle"
        val start = text.lastIndexOf("ventricle")
        val anchor = LibraryMarks.makeAnchor("b", text, start, text.length)!!
        val range = LibraryMarks.resolveAnchor(text, anchor)!!
        assertEquals(33, range.start)
    }

    @Test
    fun `a recased phrase still resolves, exact matches winning first`() {
        val anchor = TextAnchor(block = "b", exact = "Aorta", prefix = "", suffix = "")
        val range = LibraryMarks.resolveAnchor("the aorta", anchor)!!
        assertEquals(TextRange(4, 9), range)
    }

    @Test
    fun `a phrase that has been edited out resolves to nothing`() {
        val anchor = TextAnchor(block = "b", exact = "pulmonary vein", prefix = "", suffix = "")
        assertNull(LibraryMarks.resolveAnchor("nothing of the sort here", anchor))
    }

    // -- Store folds -----------------------------------------------------

    @Test
    fun `upsert adds, then replaces the same id in place`() {
        var store: LibraryMarkStore = emptyMap()
        val a = mark(id = "m1", article = "art", exact = "one")
        val b = mark(id = "m2", article = "art", exact = "two")
        store = LibraryMarks.upsert(store, a)
        store = LibraryMarks.upsert(store, b)
        assertEquals(listOf("m1", "m2"), store["art"]?.map { it.id })

        val edited = a.copy(note = "edited")
        store = LibraryMarks.upsert(store, edited)
        assertEquals(listOf("m2", "m1"), store["art"]?.map { it.id })
        assertEquals("edited", store["art"]?.first { it.id == "m1" }?.note)
    }

    @Test
    fun `removing the last mark drops the article's entry entirely`() {
        var store = LibraryMarks.upsert(emptyMap(), mark(id = "m1", article = "art", exact = "x"))
        store = LibraryMarks.remove(store, "art", "m1")
        assertNull(store["art"])
    }

    @Test
    fun `mark ids are unique in sequence`() {
        val a = LibraryMarks.newMarkId()
        val b = LibraryMarks.newMarkId()
        assertTrue(a != b)
        assertTrue(a.startsWith("mk-"))
    }

    // -- Placement ---------------------------------------------------------

    @Test
    fun `a mark is placed in the block its anchor names`() {
        val m = mark(id = "m1", article = "art", block = "p:1", exact = "aorta")
        val (placements, orphans) = LibraryMarks.place(
            listOf(m),
            listOf("p:0" to "the left ventricle", "p:1" to "blood into the aorta"),
        )
        assertTrue(orphans.isEmpty())
        assertEquals(1, placements["p:1"]?.size)
        assertNull(placements["p:0"])
        assertEquals(TextRange(15, 20), placements["p:1"]?.first()?.range)
    }

    @Test
    fun `a mark whose block id is unknown falls back to the block with the words`() {
        val m = mark(id = "m1", article = "art", block = "block:7", exact = "aorta")
        val (placements, orphans) = LibraryMarks.place(
            listOf(m),
            listOf("p:0" to "the left ventricle", "p:1" to "blood into the aorta"),
        )
        assertTrue(orphans.isEmpty())
        assertEquals(1, placements["p:1"]?.size)
    }

    @Test
    fun `a mark whose words are gone from every block is an orphan, not misplaced`() {
        val m = mark(id = "m1", article = "art", block = "p:0", exact = "pulmonary vein")
        val (placements, orphans) = LibraryMarks.place(
            listOf(m),
            listOf("p:0" to "the left ventricle", "p:1" to "blood into the aorta"),
        )
        assertTrue(placements.isEmpty())
        assertEquals(listOf("m1"), orphans.map { it.id })
    }

    @Test
    fun `a phrase in two blocks is drawn once, not twice`() {
        val m = mark(id = "m1", article = "art", block = "p:1", exact = "aorta")
        val (placements, _) = LibraryMarks.place(
            listOf(m),
            listOf("p:0" to "the aorta", "p:1" to "the aorta"),
        )
        val total = placements.values.sumOf { it.size }
        assertEquals(1, total)
        assertEquals(1, placements["p:1"]?.size)
    }

    @Test
    fun `no marks and no blocks resolve to nothing, never a failure`() {
        val (placements, orphans) = LibraryMarks.place(emptyList(), emptyList())
        assertTrue(placements.isEmpty())
        assertTrue(orphans.isEmpty())
    }

    private fun mark(id: String, article: String, block: String = "b", exact: String): LibraryMark = LibraryMark(
        id = id,
        articleId = article,
        anchor = TextAnchor(block = block, exact = exact, prefix = "", suffix = ""),
        tone = "amber",
        note = "",
        createdAt = "2026-09-04T00:00:00.000Z",
    )
}
