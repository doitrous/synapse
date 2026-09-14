package com.synapse.app.core.whiteboard

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

/**
 * A verbatim port of every vector in `src/lib/whiteboardGeometry.test.ts` — the
 * geometry must stay numerically identical across web, iOS and Android, and this
 * is the test that proves it for Android. Test names mirror the TS ones.
 */
class WhiteboardGeometryTest {

    private fun note(id: String, x: Double, y: Double, text: String = ""): NoteBox = NoteBox(id, x, y, text)

    @Test
    fun `a point past an edge is brought back onto the board`() {
        assertEquals(Point(0.0, 0.0), clampToBoard(Point(-50.0, -50.0)))
        assertEquals(Point(Board.WIDTH, Board.HEIGHT), clampToBoard(Point(99999.0, 99999.0)))
    }

    @Test
    fun `a note is clamped by its far edge, not its corner`() {
        val placed = clampToBoard(Point(Board.WIDTH - 10, 0.0), Size(NOTE_WIDTH, NOTE_HEIGHT))
        assertEquals(Board.WIDTH - NOTE_WIDTH, placed.x, 0.0)
    }

    @Test
    fun `panning stops at the board edge rather than running on into nothing`() {
        val viewport = Size(1000.0, 700.0)
        assertEquals(0.0, clampView(BoardView(500.0, 300.0, 1.0), viewport).x, 0.0)
        val far = clampView(BoardView(-99999.0, -99999.0, 1.0), viewport)
        assertEquals(viewport.width - Board.WIDTH, far.x, 0.0)
        assertEquals(viewport.height - Board.HEIGHT, far.y, 0.0)
    }

    @Test
    fun `a board smaller than its window is centred, not cornered`() {
        val viewport = Size(1000.0, 700.0)
        val view = clampView(BoardView(-400.0, -400.0, 0.05), viewport)
        assertEquals((1000 - Board.WIDTH * 0.05) / 2, view.x, 1e-9)
        assertEquals((700 - Board.HEIGHT * 0.05) / 2, view.y, 1e-9)
    }

    @Test
    fun `a view already inside the board is left alone`() {
        val view = BoardView(-1200.0, -800.0, 1.0)
        assertEquals(view, clampView(view, Size(1000.0, 700.0)))
    }

    @Test
    fun `screen pixels map back to board coordinates through the view`() {
        val view = BoardView(-200.0, -100.0, 2.0)
        assertEquals(Point(300.0, 200.0), toBoard(Point(400.0, 300.0), view))
    }

    @Test
    fun `connectors leave the middle of an edge`() {
        val subject = note("a", 100.0, 200.0)
        assertEquals(Point(100.0, 200.0 + NOTE_HEIGHT / 2), anchorOf(subject, Side.Start))
        assertEquals(Point(100.0 + NOTE_WIDTH, 200.0 + NOTE_HEIGHT / 2), anchorOf(subject, Side.End))
    }

    @Test
    fun `a note to the right is joined end-to-start, and one to the left the other way`() {
        val left = note("a", 0.0, 0.0)
        val right = note("b", 600.0, 0.0)
        assertEquals(SidePair(Side.End, Side.Start), sidesBetween(left, right))
        assertEquals(SidePair(Side.Start, Side.End), sidesBetween(right, left))
        // Stacked notes read left-to-right, so the tie goes to the forward direction.
        assertEquals(SidePair(Side.End, Side.Start), sidesBetween(left, note("c", 0.0, 400.0)))
    }

    @Test
    fun `the default bend eases horizontally out of both ends`() {
        val (c1, c2) = defaultControls(Point(0.0, 50.0), Point(400.0, 250.0))
        assertEquals(50.0, c1.y, 0.0)
        assertEquals(250.0, c2.y, 0.0)
        assertEquals(200.0, c1.x, 0.0)
        assertEquals(200.0, c2.x, 0.0)
    }

    @Test
    fun `a very short connector still bends by a visible minimum`() {
        val (c1, _) = defaultControls(Point(0.0, 0.0), Point(10.0, 0.0))
        assertEquals(40.0, c1.x, 0.0)
    }

    @Test
    fun `a bent connector keeps the control points it was given`() {
        val bent = linkPath(Point(0.0, 0.0), Point(100.0, 0.0), Point(10.0, -80.0) to Point(90.0, 80.0))
        assertEquals("M 0 0 C 10 -80, 90 80, 100 0", bent.d)
        assertEquals(Point(10.0, -80.0) to Point(90.0, 80.0), bent.controls)
    }

    @Test
    fun `the topmost note wins when two overlap`() {
        val under = note("under", 0.0, 0.0)
        val over = note("over", 20.0, 20.0)
        assertEquals("over", noteAt(listOf(under, over), Point(40.0, 40.0))?.id)
    }

    @Test
    fun `a point outside every note hits nothing`() {
        assertNull(noteAt(listOf(note("a", 0.0, 0.0)), Point(900.0, 900.0)))
    }

    @Test
    fun `search matches text, case-insensitively, and skips notes without it`() {
        val notes = listOf(
            note("a", 0.0, 0.0, "Preload and afterload"),
            note("b", 0.0, 0.0, "Murmurs"),
            note("c", 0.0, 0.0, ""),
        )
        assertEquals(listOf("a"), matchNotes(notes, "PRELOAD").map { it.id })
        assertEquals(emptyList<String>(), matchNotes(notes, "").map { it.id })
    }

    @Test
    fun `hits are stepped through in reading order, not the order they were made`() {
        val notes = listOf(
            note("bottom", 10.0, 800.0, "aortic"),
            note("top-right", 900.0, 10.0, "aortic"),
            note("top-left", 10.0, 10.0, "aortic"),
        )
        assertEquals(listOf("top-left", "top-right", "bottom"), matchNotes(notes, "aortic").map { it.id })
    }

    @Test
    fun `centring on a point puts it mid-viewport, and stays on the board`() {
        val viewport = Size(1000.0, 700.0)
        val view = viewCentredOn(Point(2000.0, 1500.0), viewport, 1.0)
        assertEquals(500.0 - 2000.0, view.x, 0.0)
        assertEquals(350.0 - 1500.0, view.y, 0.0)
        // A point near the corner cannot be centred without leaving the board.
        assertEquals(0.0, viewCentredOn(Point(0.0, 0.0), viewport, 1.0).x, 0.0)
    }

    @Test
    fun `minimap viewport is computed in board coordinates without rounding`() {
        val view = BoardView(-123.456, -78.9, 1.25)
        val viewport = minimapViewport(view, Size(1440.5, 812.25), Size(190.0, 112.0))
        assertEquals((-view.x / view.scale) * (112.0 / Board.HEIGHT), viewport.x, 1e-9)
        assertEquals((-view.y / view.scale) * (112.0 / Board.HEIGHT), viewport.y, 1e-9)
        assertEquals((1440.5 / view.scale) * (112.0 / Board.HEIGHT), viewport.width, 1e-9)
        assertEquals((812.25 / view.scale) * (112.0 / Board.HEIGHT), viewport.height, 1e-9)
    }

    @Test
    fun `clicking the minimap centres that board point in the main viewport`() {
        val viewport = Size(1000.0, 700.0)
        val view = viewFromMinimapPoint(Point(95.0, 56.0), viewport, Size(190.0, 112.0), BoardView(0.0, 0.0, 1.0))
        assertEquals(500.0 - (95.0 / (112.0 / Board.HEIGHT)), view.x, 1e-9)
        assertEquals(350.0 - (56.0 / (112.0 / Board.HEIGHT)), view.y, 1e-9)
    }

    @Test
    fun `keyboard minimap panning moves in board units and respects clamps`() {
        val viewport = Size(1000.0, 700.0)
        val moved = panViewByBoardDelta(BoardView(-500.0, -500.0, 2.0), Point(12.5, -20.25), viewport)
        assertEquals(-525.0, moved.x, 0.0)
        assertEquals(-459.5, moved.y, 0.0)
        assertEquals(0.0, panViewByBoardDelta(BoardView(0.0, 0.0, 1.0), Point(-100.0, 0.0), viewport).x, 0.0)
    }
}
