import Foundation

/// What a student writes on a document, and where it lives on the page.
///
/// A port of `src/lib/reader/annotations.ts`.
///
/// **Coordinates.** Everything is stored in *page space*: both axes divided by
/// the page's width in points. `x` runs 0..1; `y` runs 0..(height/width), about
/// 1.414 on A4. Dividing both by the same number is what keeps a circle round
/// and lets one divisor convert stroke widths too — so a mark survives zooming,
/// rotating the device, a different screen and a different pixel ratio, none of
/// which are recorded. Origin is the page's **top-left with y downward**, which
/// is the opposite of PDFKit; see `PageSpace` for the flip.
enum ObjectKind: String, Codable, Sendable {
    case ink, highlighter, tape, note, textbox, marker
}

/// The four pens.
///
/// Stored, but every one renders at flat width — the web's `widthProfile()`
/// exists and has no call site. Tapering here would make the same stroke look
/// different in a browser.
enum PenTool: String, Codable, Sendable {
    case ball, fountain, brush, pencil
}

/// Widget colours are theme tokens, not literal ink.
///
/// A sticky note is chrome — it has to stay readable on porcelain and on
/// charcoal — while a red pen has to stay red in both. The same eight tones as
/// the whiteboard, so a student meets one palette rather than two.
enum NoteTone: String, Codable, CaseIterable, Sendable {
    case paper, teal, amber, rose, sage, slate, sand, clay
}

/// One mark on a page.
///
/// A single struct rather than an enum with associated values, because the
/// stored form is one JSON object whose fields depend on `kind`, and a shard
/// containing a kind this build does not know must survive a round trip rather
/// than being dropped.
struct AnnotationObject: Codable, Identifiable, Equatable, Sendable {
    var id: String
    var kind: ObjectKind
    /// 1-based, matching everything else the reader says about pages.
    var page: Int
    /// Fractional, so inserting between two marks never renumbers a page.
    var z: Double
    /// `[x0, y0, x1, y1]` in page space, cached so culling and hit-testing can
    /// reject a mark without decoding its points.
    var bbox: [Double]
    /// Updated-at, ms since epoch. Must be strictly monotonic — the renderer
    /// keys off it to know a mark changed.
    var t: Double

    // Ink and highlighter
    /// `ball | fountain | brush | pencil | highlighter`.
    var tool: String?
    /// Literal sRGB: a red pen is red in every theme.
    var color: String?
    /// Base stroke width, in page-space units.
    var w: Double?
    /// 0..1. The highlighter is translucent, ink is not.
    var a: Double?
    /// Quantised, delta-encoded points.
    var p: [Int]?

    // Tape, note, textbox
    /// `[x0, y0, x1, y1]` in page space.
    var r: [Double]?
    var tone: NoteTone?
    var text: String?
    /// Page-space units, like a stroke width — so it scales with the page.
    var size: Double?

    // Marker
    var title: String?

    var isInk: Bool { kind == .ink || kind == .highlighter }

    /// The rectangle a boxed widget occupies, or the cached bounds otherwise.
    var rect: [Double] { r ?? bbox }
}

extension AnnotationObject {

    /// A fresh id.
    ///
    /// Ten lowercase alphanumerics, as the web generates: a UUID is 36 bytes
    /// and a book holds thousands of these.
    static func newID() -> String {
        let alphabet = Array("0123456789abcdefghijklmnopqrstuvwxyz")
        return String((0..<10).map { _ in alphabet[Int.random(in: 0..<alphabet.count)] })
    }

    /// A timestamp that is always greater than the last one used.
    ///
    /// The renderer treats `t` as "this changed", so two marks made inside the
    /// same millisecond must still be ordered.
    static func nextStamp(after previous: Double?) -> Double {
        let now = Date().timeIntervalSince1970 * 1000
        guard let previous else { return now.rounded() }
        return max(now.rounded(), previous + 1)
    }

    static func ink(
        kind: ObjectKind, tool: String, color: String, width: Double, alpha: Double?,
        points: [InkPoint], page: Int, z: Double, stamp: Double
    ) -> AnnotationObject {
        let simplified = StrokeCodec.simplify(points)
        return AnnotationObject(
            id: newID(), kind: kind, page: page, z: z,
            bbox: StrokeCodec.bounds(simplified, padding: width / 2),
            t: stamp,
            tool: tool, color: color, w: width, a: alpha,
            p: StrokeCodec.encode(simplified)
        )
    }

    static func widget(
        kind: ObjectKind, rect: [Double], tone: NoteTone?, text: String?, color: String?,
        size: Double?, page: Int, z: Double, stamp: Double
    ) -> AnnotationObject {
        AnnotationObject(
            id: newID(), kind: kind, page: page, z: z, bbox: rect, t: stamp,
            color: color, r: rect, tone: tone, text: text, size: size
        )
    }

    static func marker(title: String, page: Int, z: Double, stamp: Double) -> AnnotationObject {
        AnnotationObject(
            id: newID(), kind: .marker, page: page, z: z,
            bbox: [0, 0, 0, 0], t: stamp, title: title
        )
    }
}

/// What the manifest holds: the things that must be listable before the pages
/// they live on have loaded.
struct AnnotationManifest: Codable, Equatable, Sendable {
    var markers: [AnnotationObject] = []
    var notes: [NoteEntry] = []

    /// A searchable mirror of note and textbox text.
    ///
    /// Kept outside the shards so a search from page 1 can match a note on page
    /// 300 without loading twenty shards. Tape and ink are deliberately not
    /// indexed — neither carries text.
    struct NoteEntry: Codable, Equatable, Identifiable, Sendable {
        var id: String
        var page: Int
        var text: String
        /// `note` or `textbox`.
        var kind: String
    }

    /// Rebuild the index from a page's objects, keeping the web's ordering:
    /// notes by page then id, markers by page.
    static func entries(from objects: [AnnotationObject]) -> [NoteEntry] {
        objects
            .filter { ($0.kind == .note || $0.kind == .textbox) && !($0.text ?? "").isEmpty }
            .map { NoteEntry(id: $0.id, page: $0.page, text: $0.text ?? "", kind: $0.kind.rawValue) }
            .sorted { $0.page != $1.page ? $0.page < $1.page : $0.id < $1.id }
    }
}
