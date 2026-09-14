import CoreGraphics
import Foundation

/// A note on the board.
///
/// Stored under `synapse.whiteboard.board`, the same key and shape the web app
/// writes, so a board made on a laptop opens on the phone.
struct BoardNote: Codable, Identifiable, Equatable, Sendable {
    var id: String
    var x: Double
    var y: Double
    var text: String
    /// One of the eight tone keys. Kept as a string rather than an enum so a
    /// tone added on the web does not make the whole board undecodable here.
    var tone: String
}

/// A connector between two notes.
///
/// `c1`/`c2` are optional on purpose: absent means the automatic curve, which
/// is what every link on an existing board has. Present means the student bent
/// it, and their bend is what is drawn.
struct BoardLink: Codable, Identifiable, Equatable, Sendable {
    var id: String
    var from: String
    var to: String
    var c1: BoardPoint?
    var c2: BoardPoint?
}

struct BoardFrame: Codable, Identifiable, Equatable, Sendable {
    var id: String
    var x: Double
    var y: Double
    var width: Double
    var height: Double
    var title: String
}

struct BoardPoint: Codable, Equatable, Sendable {
    var x: Double
    var y: Double
}

/// A picture on the board. Newer boards reference managed media by `documentId`;
/// legacy boards keep an inline `src` — both are preserved verbatim.
struct BoardImage: Codable, Identifiable, Equatable, Sendable {
    var id: String
    var x: Double
    var y: Double
    var width: Double
    var height: Double
    var documentId: String?
    var src: String?
    var alt: String
    var sizeBytes: Double?
}

/// A file pinned to the board (its bytes live in the student's document store).
struct BoardFile: Codable, Identifiable, Equatable, Sendable {
    var id: String
    var x: Double
    var y: Double
    var documentId: String
    var name: String
    var sizeBytes: Double
    /// "pdf" | "file"; kept as a string so a new kind never fails the decode.
    var kind: String
}

/// One freehand line, as a flat `x, y, x, y…` list in board coordinates.
struct InkStroke: Codable, Identifiable, Equatable, Sendable {
    var id: String
    var points: [Double]
    var color: String
    var width: Double
}

/// A ready-made icon from the shared library, placed on the board.
struct ReadyElement: Codable, Identifiable, Equatable, Sendable {
    var id: String
    var x: Double
    var y: Double
    var width: Double
    var height: Double
    var readyItemId: String
}

/// Everything on a board.
///
/// Ported from `src/data/whiteboard.ts`. The collections after the original
/// three are optional so a board saved before they existed still reads — and,
/// just as importantly, so **iOS preserves web-authored ink, pictures, files and
/// ready items on save even though it does not yet render them all**. Dropping
/// them was the old single-key model's silent data loss.
struct BoardState: Codable, Equatable, Sendable {
    var notes: [BoardNote] = []
    var links: [BoardLink] = []
    var frames: [BoardFrame] = []
    var images: [BoardImage]?
    var files: [BoardFile]?
    var ink: [InkStroke]?
    var readyItems: [ReadyElement]?
    /// Whether freehand ink paints above the other elements; absent = below.
    var inkAbove: Bool?

    /// The retired single-board key. Read once to migrate, never written again.
    static let legacyStorageKey = "nishany.whiteboard.board"
    static let empty = BoardState()
}

/// Where things sit on the board, and how the board itself is bounded.
///
/// A port of `src/lib/whiteboardGeometry.ts`. Arithmetic over plain numbers,
/// kept out of the view so it can be tested — the board is the one surface
/// where a student can lose their place entirely, and "panned into empty space
/// forever" is a bug you only find by trying it.
enum BoardGeometry {

    /// The board has edges.
    ///
    /// An unbounded canvas sounds generous and is the opposite: pan far enough
    /// and everything you made is somewhere behind you with no way back but a
    /// control you have to know about.
    static let size = CGSize(width: 8000, height: 5000)
    static let noteSize = CGSize(width: 176, height: 74)

    static let minScale: CGFloat = 0.25
    static let maxScale: CGFloat = 2.5

    /// Keep a point inside the board, allowing for the size of what is placed.
    static func clampToBoard(_ point: CGPoint, size itemSize: CGSize = .zero) -> CGPoint {
        CGPoint(
            x: min(max(point.x, 0), max(0, size.width - itemSize.width)),
            y: min(max(point.y, 0), max(0, size.height - itemSize.height))
        )
    }

    /// Keep the viewport over the board.
    ///
    /// The offset is in screen points and negative as the board moves left/up.
    /// Clamping stops the student scrolling the board off the screen entirely,
    /// which is the "lost forever" case.
    static func clampOffset(_ offset: CGSize, scale: CGFloat, viewport: CGSize) -> CGSize {
        let scaled = CGSize(width: size.width * scale, height: size.height * scale)
        // When the board is smaller than the viewport there is nothing to pan.
        let minX = min(0, viewport.width - scaled.width)
        let minY = min(0, viewport.height - scaled.height)
        return CGSize(
            width: min(0, max(offset.width, minX)),
            height: min(0, max(offset.height, minY))
        )
    }

    static func clampScale(_ scale: CGFloat) -> CGFloat {
        min(max(scale, minScale), maxScale)
    }

    /// Screen point → board coordinates.
    static func toBoard(_ point: CGPoint, offset: CGSize, scale: CGFloat) -> CGPoint {
        CGPoint(x: (point.x - offset.width) / scale, y: (point.y - offset.height) / scale)
    }

    /// The offset that puts a board point in the middle of the viewport.
    static func centred(on point: CGPoint, scale: CGFloat, viewport: CGSize) -> CGSize {
        clampOffset(
            CGSize(
                width: viewport.width / 2 - point.x * scale,
                height: viewport.height / 2 - point.y * scale
            ),
            scale: scale, viewport: viewport
        )
    }

    /// Which side of a note a connector leaves from.
    ///
    /// Decided by which note is further right, so a link between two notes
    /// leaves one and arrives at the other rather than crossing back over
    /// itself.
    static func sides(from: BoardNote, to: BoardNote) -> (start: Bool, end: Bool) {
        let goingRight = to.x + noteSize.width / 2 >= from.x + noteSize.width / 2
        return (start: goingRight, end: !goingRight)
    }

    /// The anchor point on a note: `right` picks the right edge.
    static func anchor(_ note: BoardNote, right: Bool) -> CGPoint {
        CGPoint(
            x: right ? note.x + noteSize.width : note.x,
            y: note.y + noteSize.height / 2
        )
    }

    /// The default control points for a link's curve.
    ///
    /// A horizontal bow proportional to the gap, so short links stay tight and
    /// long ones sweep rather than cutting straight across whatever is between.
    static func controls(from start: CGPoint, to end: CGPoint) -> (CGPoint, CGPoint) {
        let bow = max(40, min(220, abs(end.x - start.x) * 0.45))
        return (
            CGPoint(x: start.x + bow, y: start.y),
            CGPoint(x: end.x - bow, y: end.y)
        )
    }

    /// Distance from a point to a line segment — the primitive the eraser aims
    /// with, since a stroke is a chain of these.
    static func distance(from p: CGPoint, toSegment a: CGPoint, _ b: CGPoint) -> CGFloat {
        let dx = b.x - a.x, dy = b.y - a.y
        if dx == 0, dy == 0 { return hypot(p.x - a.x, p.y - a.y) }
        let t = max(0, min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy)))
        return hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy))
    }

    /// Whether the eraser, at a board point, touches a stroke.
    ///
    /// The web aims the eraser at a fattened, invisible copy of the line
    /// (`max(16, width + 12)` wide) because a hairline is impossible to hit; a
    /// point within half that of the centreline counts as a hit.
    static func strokeHit(_ point: CGPoint, stroke: InkStroke) -> Bool {
        let pts = stroke.points
        guard pts.count >= 2 else { return false }
        let tolerance = max(16, stroke.width + 12) / 2
        if pts.count == 2 { return hypot(point.x - pts[0], point.y - pts[1]) <= tolerance }
        var i = 0
        while i + 3 < pts.count {
            let a = CGPoint(x: pts[i], y: pts[i + 1])
            let b = CGPoint(x: pts[i + 2], y: pts[i + 3])
            if distance(from: point, toSegment: a, b) <= tolerance { return true }
            i += 2
        }
        return false
    }

    /// The topmost note under a board point, searched in reverse so the note
    /// drawn last — the one visibly on top — is the one picked up.
    static func note(at point: CGPoint, in notes: [BoardNote]) -> BoardNote? {
        for note in notes.reversed() {
            if point.x >= note.x, point.x <= note.x + noteSize.width,
               point.y >= note.y, point.y <= note.y + noteSize.height {
                return note
            }
        }
        return nil
    }

    /// Notes whose text matches a search.
    static func matching(_ query: String, in notes: [BoardNote]) -> [BoardNote] {
        let trimmed = query.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return [] }
        return notes.filter { $0.text.localizedCaseInsensitiveContains(trimmed) }
    }

    /// Somewhere sensible to drop a new note: the middle of what is on screen,
    /// nudged so it does not land exactly on the last one.
    static func placement(offset: CGSize, scale: CGFloat, viewport: CGSize, existing: Int) -> CGPoint {
        let centre = toBoard(
            CGPoint(x: viewport.width / 2, y: viewport.height / 2),
            offset: offset, scale: scale
        )
        let stagger = Double(existing % 6) * 18
        return clampToBoard(
            CGPoint(
                x: centre.x - noteSize.width / 2 + stagger,
                y: centre.y - noteSize.height / 2 + stagger
            ),
            size: noteSize
        )
    }
}

/// What a drag does on the board.
enum WhiteboardTool: String, CaseIterable, Sendable {
    case select, pen, eraser

    var symbol: String {
        switch self {
        case .select: "hand.point.up.left"
        case .pen: "pencil.tip"
        case .eraser: "eraser"
        }
    }
}

/// Freehand ink colours and widths, by the keys the web app stores — kept as
/// strings/numbers so a stroke drawn on either platform round-trips unchanged.
enum BoardInk {
    /// The five colours, in the web's order (`INK_COLOURS`).
    static let colours = ["ink", "primary", "danger", "success", "warning"]
    /// The three stroke widths (`INK_WIDTHS`).
    static let widths: [Double] = [2, 4, 8]
}

/// The eight note colours, by the keys the web app stores.
enum BoardTone {
    static let order = ["paper", "teal", "amber", "rose", "sage", "sand", "slate", "clay"]

    static let label: [String: String] = [
        "paper": "Paper", "teal": "Teal", "amber": "Amber", "rose": "Rose",
        "sage": "Sage", "slate": "Slate", "sand": "Sand", "clay": "Clay",
    ]
}
