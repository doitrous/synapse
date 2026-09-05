import Foundation

/// What the finger is touching, decided geometrically.
///
/// A port of `src/lib/reader/hitTest.ts`. All of it in page space, never against
/// views: a mark is a path, not an element, and asking UIKit what is under a
/// point would mean one layer per stroke. Every test rejects on the cached
/// bounding box first, so a page of four hundred strokes decodes almost none of
/// them.
enum HitTest {

    /// Does a stroke pass within `tolerance` of a point?
    ///
    /// The stroke's own width counts toward the reach — erasing is aimed at the
    /// ink you can see, and a fat highlighter stroke is grabbable well away from
    /// the centre line the points describe.
    static func strokeHitsPoint(_ object: AnnotationObject, _ point: InkPoint, tolerance: Double) -> Bool {
        let reach = tolerance + (object.w ?? 0) / 2
        guard PageSpace.intersects(
            object.bbox,
            [point.x - reach, point.y - reach, point.x + reach, point.y + reach]
        ) else { return false }

        let points = StrokeCodec.decode(object.p ?? [])
        guard points.count > 1 else {
            return points.first.map { hypot($0.x - point.x, $0.y - point.y) <= reach } ?? false
        }
        for index in 1..<points.count where
            StrokeCodec.pointToSegment(point, points[index - 1], points[index]) <= reach {
            return true
        }
        return false
    }

    /// Every object an eraser swipe crossed.
    ///
    /// The swipe is treated as a *path*, not as the handful of points the finger
    /// happened to report. Testing only those points misses anything that fell
    /// between two of them — and the faster the swipe, the further apart they
    /// are, so a quick scrub would rub out almost nothing.
    static func strokesAlongPath(
        _ objects: [AnnotationObject], path: [InkPoint], radius: Double
    ) -> [String] {
        guard !path.isEmpty else { return [] }
        let sweep = StrokeCodec.bounds(path, padding: radius)
        var hit: [String] = []
        var seen: Set<String> = []

        for object in objects where !seen.contains(object.id) {
            guard PageSpace.intersects(object.bbox, sweep) else { continue }

            // A widget is erased by touching it; only ink has a path to trace.
            guard object.isInk else {
                if object.isBoxed,
                   path.contains(where: { insideRect($0, object.rect, slop: radius) }) {
                    hit.append(object.id)
                    seen.insert(object.id)
                }
                continue
            }

            let reach = radius + (object.w ?? 0) / 2
            let points = StrokeCodec.decode(object.p ?? [])

            if points.count == 1 {
                if path.contains(where: { hypot(points[0].x - $0.x, points[0].y - $0.y) <= reach }) {
                    hit.append(object.id)
                    seen.insert(object.id)
                }
                continue
            }
            if path.count == 1 {
                if strokeHitsPoint(object, path[0], tolerance: radius) {
                    hit.append(object.id)
                    seen.insert(object.id)
                }
                continue
            }

            if crosses(path: path, stroke: points, within: reach) {
                hit.append(object.id)
                seen.insert(object.id)
            }
        }
        return hit
    }

    private static func crosses(path: [InkPoint], stroke: [InkPoint], within reach: Double) -> Bool {
        for e in 1..<path.count {
            for s in 1..<stroke.count where
                segmentDistance(path[e - 1], path[e], stroke[s - 1], stroke[s]) <= reach {
                return true
            }
        }
        return false
    }

    /// The topmost object under a point, or none.
    static func topmost(
        _ objects: [AnnotationObject], at point: InkPoint, tolerance: Double
    ) -> AnnotationObject? {
        var best: AnnotationObject?
        for object in objects {
            let touched = object.isInk
                ? strokeHitsPoint(object, point, tolerance: tolerance)
                : object.isBoxed && insideRect(point, object.rect, slop: tolerance)
            guard touched else { continue }
            if best == nil || object.z > best!.z { best = object }
        }
        return best
    }

    /// Is a point inside a widget's rectangle, allowing for a little slop?
    static func insideRect(_ point: InkPoint, _ rect: [Double], slop: Double = 0) -> Bool {
        guard rect.count == 4 else { return false }
        return point.x >= rect[0] - slop && point.x <= rect[2] + slop
            && point.y >= rect[1] - slop && point.y <= rect[3] + slop
    }

    /// Shortest distance between two line segments.
    static func segmentDistance(_ a1: InkPoint, _ a2: InkPoint, _ b1: InkPoint, _ b2: InkPoint) -> Double {
        if segmentsCross(a1, a2, b1, b2) { return 0 }
        return min(
            StrokeCodec.pointToSegment(a1, b1, b2),
            StrokeCodec.pointToSegment(a2, b1, b2),
            StrokeCodec.pointToSegment(b1, a1, a2),
            StrokeCodec.pointToSegment(b2, a1, a2)
        )
    }

    private static func cross(
        _ ox: Double, _ oy: Double, _ ax: Double, _ ay: Double, _ bx: Double, _ by: Double
    ) -> Double {
        (ax - ox) * (by - oy) - (ay - oy) * (bx - ox)
    }

    private static func segmentsCross(
        _ a1: InkPoint, _ a2: InkPoint, _ b1: InkPoint, _ b2: InkPoint
    ) -> Bool {
        let d1 = cross(b1.x, b1.y, b2.x, b2.y, a1.x, a1.y)
        let d2 = cross(b1.x, b1.y, b2.x, b2.y, a2.x, a2.y)
        let d3 = cross(a1.x, a1.y, a2.x, a2.y, b1.x, b1.y)
        let d4 = cross(a1.x, a1.y, a2.x, a2.y, b2.x, b2.y)
        return ((d1 > 0) != (d2 > 0)) && ((d3 > 0) != (d4 > 0))
    }
}

extension AnnotationObject {
    /// Whether this kind occupies a rectangle rather than a path.
    var isBoxed: Bool { kind == .tape || kind == .note || kind == .textbox }
}
