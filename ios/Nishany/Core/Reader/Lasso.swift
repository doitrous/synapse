import Foundation

/// Choosing marks by drawing round them.
///
/// A port of `src/lib/reader/lasso.ts`. Two rules, and each is the one that
/// makes the tool usable:
///
/// - **Ink needs most of itself inside.** "Any point inside" makes a long
///   stroke impossible to *avoid* selecting; "every point inside" makes it
///   impossible to select at all. Sixty per cent is the line that behaves.
/// - **Widgets go by their centre**, because a sticky note is a thing in a
///   place, not a path.
///
/// `kinds` is the settings popover, expressed as an argument: turning
/// "handwriting" off is just leaving `ink` out of the set.
enum Lasso {

    /// Fraction of a stroke's points that must fall inside to select it.
    static let inkThreshold = 0.6

    static func pointInPolygon(_ point: InkPoint, _ polygon: [InkPoint]) -> Bool {
        guard polygon.count >= 3 else { return false }
        var inside = false
        var j = polygon.count - 1
        for i in 0..<polygon.count {
            defer { j = i }
            let a = polygon[i]
            let b = polygon[j]
            guard (a.y > point.y) != (b.y > point.y) else { continue }
            let crossX = ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y) + a.x
            if point.x < crossX { inside.toggle() }
        }
        return inside
    }

    static func bounds(of polygon: [InkPoint]) -> [Double] {
        guard !polygon.isEmpty else { return [.infinity, .infinity, -.infinity, -.infinity] }
        return [
            polygon.map(\.x).min()!, polygon.map(\.y).min()!,
            polygon.map(\.x).max()!, polygon.map(\.y).max()!,
        ]
    }

    /// A rectangular marquee, as a polygon, so one code path serves both shapes.
    static func rectanglePolygon(_ a: InkPoint, _ b: InkPoint) -> [InkPoint] {
        [
            InkPoint(x: min(a.x, b.x), y: min(a.y, b.y)),
            InkPoint(x: max(a.x, b.x), y: min(a.y, b.y)),
            InkPoint(x: max(a.x, b.x), y: max(a.y, b.y)),
            InkPoint(x: min(a.x, b.x), y: max(a.y, b.y)),
        ]
    }

    static func select(
        _ objects: [AnnotationObject], polygon: [InkPoint], kinds: Set<ObjectKind>
    ) -> [String] {
        guard polygon.count >= 3 else { return [] }
        let box = bounds(of: polygon)
        var selected: [String] = []

        for object in objects where kinds.contains(object.kind) {
            guard PageSpace.intersects(object.bbox, box) else { continue }

            if object.isInk {
                let points = StrokeCodec.decode(object.p ?? [])
                guard !points.isEmpty else { continue }
                let inside = points.filter { pointInPolygon($0, polygon) }.count
                if Double(inside) / Double(points.count) >= inkThreshold { selected.append(object.id) }
                continue
            }

            // Everything else is a thing in a place: its centre decides.
            guard object.bbox.count == 4 else { continue }
            let centre = InkPoint(
                x: (object.bbox[0] + object.bbox[2]) / 2,
                y: (object.bbox[1] + object.bbox[3]) / 2
            )
            if pointInPolygon(centre, polygon) { selected.append(object.id) }
        }
        return selected
    }

    /// The box round a selection, for its handles.
    static func selectionBounds(_ objects: [AnnotationObject]) -> [Double]? {
        let boxes = objects.map(\.bbox).filter { $0.count == 4 }
        guard !boxes.isEmpty else { return nil }
        return [
            boxes.map { $0[0] }.min()!, boxes.map { $0[1] }.min()!,
            boxes.map { $0[2] }.max()!, boxes.map { $0[3] }.max()!,
        ]
    }
}

extension AnnotationObject {

    /// Shift a mark, without decoding it.
    ///
    /// A port of `translateObject`. Ink carries its geometry in `p`, a widget in
    /// `r`, and a marker has none at all — keeping that split here means no call
    /// site has to know which kinds have geometry. The encoded points are moved
    /// by adjusting only the first pair, which is what makes dragging a lasso
    /// selection of two hundred strokes cost nothing.
    func translated(dx: Double, dy: Double, stamp: Double) -> AnnotationObject {
        var moved = self
        moved.t = stamp
        if bbox.count == 4 {
            moved.bbox = [bbox[0] + dx, bbox[1] + dy, bbox[2] + dx, bbox[3] + dy]
        }
        if isInk {
            moved.p = StrokeCodec.translate(p ?? [], dx: dx, dy: dy)
        } else if isBoxed, let r, r.count == 4 {
            moved.r = [r[0] + dx, r[1] + dy, r[2] + dx, r[3] + dy]
        }
        return moved
    }
}
