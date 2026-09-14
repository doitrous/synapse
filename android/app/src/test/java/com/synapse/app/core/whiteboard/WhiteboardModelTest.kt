package com.synapse.app.core.whiteboard

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

/**
 * A verbatim port of every vector in `src/data/whiteboard.test.ts`. Test names
 * mirror the TS ones.
 */
class WhiteboardModelTest {

    private val legacy = BoardState(
        notes = listOf(Note(id = "n1", x = 10.125, y = 20.875, text = "legacy", tone = "paper")),
        links = emptyList(),
        frames = emptyList(),
        images = listOf(BoardImage(id = "p1", x = 40.25, y = 50.5, width = 260.75, height = 130.125, src = "data:image/png;base64,old", alt = "old")),
        ink = listOf(InkStroke(id = "i1", points = listOf(1.25, 2.5, 3.75, 4.125), color = "var(--color-ink)", width = 4.0)),
    )

    private val owner = WhiteboardOwner(ownerId = "u1", ownerName = "Mona", universityId = "asu", year = "Year 3")

    @Test
    fun `lazy migration preserves the existing single board as the default board`() {
        val collection = emptyWhiteboardCollection("u1", "Mona", "asu", "Year 3")
        val migrated = migrateSingleBoardToCollection(legacy, collection, owner, "2026-08-24T00:00:00.000Z")
        assertTrue(migrated.migratedFromSingleBoard)
        assertEquals(1, migrated.boards.size)
        assertEquals("Default board", migrated.boards[0].title)
        assertEquals(legacy, migrated.boards[0].state)
        assertEquals("asu", migrated.boards[0].universityId)
        assertEquals("Year 3", migrated.boards[0].year)
    }

    @Test
    fun `migration is idempotent and never duplicates the default board`() {
        val once = migrateSingleBoardToCollection(legacy, emptyWhiteboardCollection(), owner)
        val twice = migrateSingleBoardToCollection(INITIAL_BOARD, once, owner)
        assertEquals(1, twice.boards.size)
        assertEquals(once, twice)
    }

    @Test
    fun `board updates preserve fractional coordinates and bump revision`() {
        val migrated = migrateSingleBoardToCollection(legacy, emptyWhiteboardCollection(), owner)
        val nextState = legacy.copy(notes = listOf(Note(id = "n1", x = 10.333333, y = 20.666667, text = "moved", tone = "paper")))
        val updated = updateWhiteboardState(migrated, migrated.activeBoardId, nextState, "2026-08-24T01:00:00.000Z")
        assertEquals(migrated.boards[0].revision + 1, updated.boards[0].revision)
        assertEquals(10.333333, updated.boards[0].state.notes[0].x, 0.0)
        assertEquals(20.666667, updated.boards[0].state.notes[0].y, 0.0)
    }

    @Test
    fun `multiple named boards can be added and removed without losing the fallback board`() {
        val collection = emptyWhiteboardCollection("u1", "Mona", "asu", "Year 3")
        val second = createWhiteboardDocument(id = "wb-2", title = "Renal map", ownerId = "u1", ownerName = "Mona", universityId = "asu", year = "Year 3")
        val withSecond = addWhiteboard(collection, second)
        assertEquals("wb-2", withSecond.activeBoardId)
        assertEquals(2, withSecond.boards.size)
        val removed = removeWhiteboard(withSecond, "wb-2")
        assertEquals(1, removed.boards.size)
        assertEquals("default", removed.activeBoardId)
        assertEquals(1, removeWhiteboard(removed, "default").boards.size)
    }

    @Test
    fun `shared boards are same-university-year only, grouped by topic and ranked by stars then freshness`() {
        val base = emptyWhiteboardCollection("u1", "Mona", "asu", "Year 3")
        val a = createWhiteboardDocument(id = "a", title = "A", ownerId = "u2", ownerName = "Ali", universityId = "asu", year = "Year 3")
            .copy(topics = listOf("CVS"), stars = listOf("s1"), updatedAt = "2026-08-24T01:00:00.000Z")
        val b = createWhiteboardDocument(id = "b", title = "B", ownerId = "u3", ownerName = "Nour", universityId = "asu", year = "Year 3")
            .copy(topics = listOf("CVS"), stars = listOf("s1", "s2"), updatedAt = "2026-08-24T00:00:00.000Z")
        val other = createWhiteboardDocument(id = "c", title = "C", ownerId = "u4", ownerName = "Omar", universityId = "asu", year = "Year 4")
        val collection = base.copy(sharedBoards = listOf(a, b, other))
        val scoped = sameAudienceSharedBoards(collection, Audience(universityId = "asu", year = "Year 3"))
        assertEquals(listOf("a", "b"), scoped.map { it.id }.sorted())
        val grouped = groupWhiteboardsByTopic(scoped)
        assertEquals("CVS", grouped[0].topic)
        assertEquals(listOf("b", "a"), grouped[0].boards.map { it.id })
    }

    @Test
    fun `stars and follows are one per student and toggle cleanly`() {
        val board = createWhiteboardDocument(id = "a", title = "A", ownerId = "u2", ownerName = "Ali", universityId = "asu", year = "Year 3")
        val starred = toggleWhiteboardStar(board, "u1")
        assertEquals(listOf("u1"), starred.stars)
        assertEquals(emptyList<String>(), toggleWhiteboardStar(starred, "u1").stars)
        val followed = toggleWhiteboardFollow(board, "u1")
        assertEquals(listOf("u1"), followed.follows)
        assertEquals(emptyList<String>(), toggleWhiteboardFollow(followed, "u1").follows)
    }
}
