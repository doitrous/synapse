import CoreGraphics
import Foundation
import Testing
@testable import Synapse

/// The board is the one surface where a student can lose their place entirely,
/// so the arithmetic that stops that is what these cover.
struct WhiteboardTests {

    private func note(_ id: String, _ x: Double, _ y: Double) -> BoardNote {
        BoardNote(id: id, x: x, y: y, text: id, tone: "paper")
    }

    @Suite("Staying on the board")
    struct Bounds {

        @Test("a note cannot be dragged off the edges")
        func noteClamped() {
            let size = BoardGeometry.noteSize
            #expect(BoardGeometry.clampToBoard(CGPoint(x: -500, y: -500), size: size) == CGPoint(x: 0, y: 0))

            let far = BoardGeometry.clampToBoard(CGPoint(x: 99_999, y: 99_999), size: size)
            #expect(far.x == BoardGeometry.size.width - size.width)
            #expect(far.y == BoardGeometry.size.height - size.height)
        }

        /// The "panned into empty space forever" case: without this the board
        /// can be pushed entirely off-screen with no way back.
        @Test("the viewport cannot be panned off the board")
        func offsetClamped() {
            let viewport = CGSize(width: 400, height: 800)

            // Dragged right/down past the top-left corner.
            let overshoot = BoardGeometry.clampOffset(
                CGSize(width: 900, height: 900), scale: 1, viewport: viewport
            )
            #expect(overshoot == .zero)

            // Dragged far past the bottom-right.
            let far = BoardGeometry.clampOffset(
                CGSize(width: -99_999, height: -99_999), scale: 1, viewport: viewport
            )
            #expect(far.width == viewport.width - BoardGeometry.size.width)
            #expect(far.height == viewport.height - BoardGeometry.size.height)
        }

        /// Zoomed far out the whole board is smaller than the screen, and there
        /// is nothing left to pan — clamping must not fight the user by
        /// snapping to a negative offset.
        @Test("a board smaller than the viewport does not pan")
        func smallerThanViewport() {
            let viewport = CGSize(width: 20_000, height: 20_000)
            let offset = BoardGeometry.clampOffset(
                CGSize(width: -100, height: -100), scale: 0.25, viewport: viewport
            )
            #expect(offset == .zero)
        }

        @Test("zoom stays within its limits")
        func scaleClamped() {
            #expect(BoardGeometry.clampScale(0.001) == BoardGeometry.minScale)
            #expect(BoardGeometry.clampScale(99) == BoardGeometry.maxScale)
            #expect(BoardGeometry.clampScale(1) == 1)
        }
    }

    @Suite("Coordinates")
    struct Coordinates {

        @Test("a screen point maps back to the board through pan and zoom")
        func toBoard() {
            let point = BoardGeometry.toBoard(
                CGPoint(x: 300, y: 200), offset: CGSize(width: -100, height: -50), scale: 2
            )
            #expect(point == CGPoint(x: 200, y: 125))
        }

        @Test("centring puts a point in the middle of the viewport")
        func centred() {
            let viewport = CGSize(width: 400, height: 800)
            let offset = BoardGeometry.centred(
                on: CGPoint(x: 4000, y: 2500), scale: 1, viewport: viewport
            )
            let back = BoardGeometry.toBoard(
                CGPoint(x: viewport.width / 2, y: viewport.height / 2), offset: offset, scale: 1
            )
            #expect(abs(back.x - 4000) < 0.001)
            #expect(abs(back.y - 2500) < 0.001)
        }

        /// A new note must land where the student is looking, not at the
        /// board's origin thousands of points away.
        @Test("a new note lands in view")
        func placement() {
            let viewport = CGSize(width: 400, height: 800)
            let offset = BoardGeometry.centred(on: CGPoint(x: 4000, y: 2500), scale: 1, viewport: viewport)
            let point = BoardGeometry.placement(offset: offset, scale: 1, viewport: viewport, existing: 0)

            #expect(abs(point.x - (4000 - BoardGeometry.noteSize.width / 2)) < 1)
            #expect(abs(point.y - (2500 - BoardGeometry.noteSize.height / 2)) < 1)
        }

        @Test("successive notes are staggered rather than stacked")
        func stagger() {
            let viewport = CGSize(width: 400, height: 800)
            let first = BoardGeometry.placement(offset: .zero, scale: 1, viewport: viewport, existing: 0)
            let second = BoardGeometry.placement(offset: .zero, scale: 1, viewport: viewport, existing: 1)
            #expect(first != second, "a note dropped exactly on the last one looks like nothing happened")
        }
    }

    @Suite("Links")
    struct Links {
        private let helper = WhiteboardTests()

        /// A connector should leave one note and arrive at the other rather
        /// than doubling back across itself.
        @Test("a connector leaves the side facing its target")
        func sides() {
            let left = helper.note("a", 100, 100)
            let right = helper.note("b", 900, 100)

            let rightward = BoardGeometry.sides(from: left, to: right)
            #expect(rightward.start, "leaves the right edge")
            #expect(!rightward.end, "arrives at the left edge")

            let leftward = BoardGeometry.sides(from: right, to: left)
            #expect(!leftward.start)
            #expect(leftward.end)
        }

        @Test("an anchor sits on the middle of the chosen edge")
        func anchors() {
            let note = helper.note("a", 100, 200)
            let right = BoardGeometry.anchor(note, right: true)
            #expect(right.x == 100 + BoardGeometry.noteSize.width)
            #expect(right.y == 200 + BoardGeometry.noteSize.height / 2)

            #expect(BoardGeometry.anchor(note, right: false).x == 100)
        }

        /// Short links stay tight; long ones sweep instead of cutting straight
        /// across whatever sits between them.
        @Test("the curve bows in proportion to the gap")
        func controlPoints() {
            let near = BoardGeometry.controls(from: CGPoint(x: 0, y: 0), to: CGPoint(x: 60, y: 0))
            let far = BoardGeometry.controls(from: CGPoint(x: 0, y: 0), to: CGPoint(x: 3000, y: 0))
            #expect(near.0.x < far.0.x)
            #expect(far.0.x - 0 <= 220, "the bow is capped so a long link does not loop")
        }
    }

    @Suite("Picking things up")
    struct HitTesting {
        private let helper = WhiteboardTests()

        @Test("a point inside a note finds it")
        func inside() {
            let notes = [helper.note("a", 100, 100)]
            #expect(BoardGeometry.note(at: CGPoint(x: 110, y: 110), in: notes)?.id == "a")
            #expect(BoardGeometry.note(at: CGPoint(x: 99, y: 110), in: notes) == nil)
        }

        /// Overlapping notes: the one drawn last is the one visibly on top, so
        /// it is the one a tap should pick up.
        @Test("the topmost note wins where they overlap")
        func topmost() {
            let notes = [helper.note("under", 100, 100), helper.note("over", 110, 110)]
            #expect(BoardGeometry.note(at: CGPoint(x: 120, y: 120), in: notes)?.id == "over")
        }

        @Test("search matches note text, and an empty query matches nothing")
        func search() {
            let notes = [
                BoardNote(id: "1", x: 0, y: 0, text: "Preload and afterload", tone: "paper"),
                BoardNote(id: "2", x: 0, y: 0, text: "Starling curve", tone: "teal"),
            ]
            #expect(BoardGeometry.matching("afterload", in: notes).map(\.id) == ["1"])
            #expect(BoardGeometry.matching("STARLING", in: notes).map(\.id) == ["2"])
            #expect(BoardGeometry.matching("   ", in: notes).isEmpty)
        }
    }

    /// The board is stored under the key the web app writes, so a board made on
    /// a laptop has to decode here unchanged.
    @Suite("Storage")
    struct Storage {

        @Test("a board round-trips through the stored shape")
        func roundTrip() throws {
            let board = BoardState(
                notes: [BoardNote(id: "n1", x: 10, y: 20, text: "Note", tone: "teal")],
                links: [BoardLink(id: "l1", from: "n1", to: "n2")],
                frames: [BoardFrame(id: "f1", x: 0, y: 0, width: 100, height: 80, title: "Group")]
            )
            let data = try JSONEncoder().encode(board)
            #expect(try JSONDecoder().decode(BoardState.self, from: data) == board)
        }

        /// Absent control points mean "use the automatic curve", which is what
        /// every link on an existing board has. They must stay absent rather
        /// than encoding as zeros, which would draw every link through the
        /// board's top-left corner.
        @Test("an unbent link keeps no control points")
        func unbentLink() throws {
            let data = try JSONEncoder().encode(BoardLink(id: "l1", from: "a", to: "b"))
            let json = try #require(try JSONSerialization.jsonObject(with: data) as? [String: Any])
            #expect(json["c1"] == nil)
            #expect(json["c2"] == nil)
        }

        @Test("a bent link keeps the student's bend")
        func bentLink() throws {
            let link = BoardLink(
                id: "l1", from: "a", to: "b",
                c1: BoardPoint(x: 10, y: 20), c2: BoardPoint(x: 30, y: 40)
            )
            let data = try JSONEncoder().encode(link)
            #expect(try JSONDecoder().decode(BoardLink.self, from: data) == link)
        }

        /// A tone added on the web must not make the whole board undecodable
        /// on a phone that has not shipped yet.
        @Test("an unknown tone still decodes")
        func unknownTone() throws {
            let data = Data(#"{"notes":[{"id":"n","x":0,"y":0,"text":"t","tone":"lilac"}],"links":[],"frames":[]}"#.utf8)
            let board = try JSONDecoder().decode(BoardState.self, from: data)
            #expect(board.notes.first?.tone == "lilac")
        }

        /// Ink drawn on either platform must survive the trip. A board saved
        /// before ink existed decodes with `inkAbove` nil, not a crash.
        @Test("freehand ink round-trips and an old board has no ink layer")
        func inkRoundTrip() throws {
            let board = BoardState(
                notes: [], links: [], frames: [],
                ink: [InkStroke(id: "i1", points: [0, 0, 5, 5, 10, 0], color: "primary", width: 4)],
                inkAbove: true
            )
            let data = try JSONEncoder().encode(board)
            #expect(try JSONDecoder().decode(BoardState.self, from: data) == board)

            let legacy = Data(#"{"notes":[],"links":[],"frames":[]}"#.utf8)
            #expect(try JSONDecoder().decode(BoardState.self, from: legacy).inkAbove == nil)
        }
    }

    @Suite("Ink")
    struct Ink {

        private func stroke(_ points: [Double], width: Double = 4) -> InkStroke {
            InkStroke(id: "i", points: points, color: "ink", width: width)
        }

        /// The eraser aims at a fattened path, so a point near the line hits and
        /// one clearly off it misses.
        @Test("the eraser hits a point near the line and misses one far off")
        func hitAndMiss() {
            let line = stroke([0, 0, 100, 0])
            #expect(BoardGeometry.strokeHit(CGPoint(x: 50, y: 3), stroke: line))
            #expect(!BoardGeometry.strokeHit(CGPoint(x: 50, y: 200), stroke: line))
        }

        /// A wider stroke is easier to hit — the tolerance grows with the line.
        @Test("a fatter line is hit from further away")
        func widthWidensTolerance() {
            let point = CGPoint(x: 50, y: 14)
            #expect(!BoardGeometry.strokeHit(point, stroke: stroke([0, 0, 100, 0], width: 2)))
            #expect(BoardGeometry.strokeHit(point, stroke: stroke([0, 0, 100, 0], width: 20)))
        }

        /// A stroke with nothing in it cannot be hit rather than crashing on the
        /// empty array.
        @Test("an empty stroke is never hit")
        func emptyStroke() {
            #expect(!BoardGeometry.strokeHit(.zero, stroke: stroke([])))
        }
    }
}
