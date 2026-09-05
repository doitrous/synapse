import Foundation

/// Turning a drawn scribble into the shape it was meant to be.
///
/// A port of `src/lib/reader/shapeRecognition.ts`. The rule that matters most
/// is the one about *not* firing: a diagram, a scrawled arrow through a
/// paragraph, a circled word that is deliberately rough — none of those should
/// be straightened. So every test has to pass a confidence bar, and a shape the
/// reader keeps drawing badly is left as ink.
enum ShapeKind: String, Sendable {
    case line, rect, ellipse, arrow
}

struct RecognisedShape: Equatable, Sendable {
    let kind: ShapeKind
    /// Defining points: two corners for rect/ellipse/line, tail→head for arrow.
    let a: InkPoint
    let b: InkPoint
    let confidence: Double
}

enum ShapeRecognition {

    private static let samples = 64

    /// A drawn shape below this is left as ink rather than straightened.
    static let snapConfidence = 0.55

    static func recognise(_ raw: [InkPoint]) -> RecognisedShape? {
        guard raw.count >= 4 else { return nil }
        let points = resample(raw, count: samples)
        let box = Box(points)
        let diagonal = hypot(box.width, box.height)
        guard diagonal >= 1e-4 else { return nil }

        let first = points[0]
        let last = points[points.count - 1]
        let closure = hypot(last.x - first.x, last.y - first.y) / diagonal
        let closed = closure < 0.2

        // A line: everything sits on the segment between the ends. The
        // threshold is deliberately tight — a written word is a wobble along a
        // line too, and straightening someone's handwriting is worse than
        // recognising nothing.
        let lineError = meanDistanceToSegment(points, first, last) / diagonal
        if !closed, lineError < 0.03 {
            return RecognisedShape(kind: .line, a: first, b: last, confidence: 1 - lineError / 0.03)
        }

        // An arrow: a shaft plus a head, so the last quarter turns back sharply.
        if !closed, let arrow = detectArrow(points, diagonal: diagonal) { return arrow }

        if closed {
            let ellipseError = ellipseResidual(points, box) / diagonal
            let rectError = rectResidual(points, box) / diagonal
            if ellipseError < rectError, ellipseError < 0.06 {
                return RecognisedShape(
                    kind: .ellipse,
                    a: InkPoint(x: box.minX, y: box.minY), b: InkPoint(x: box.maxX, y: box.maxY),
                    confidence: 1 - ellipseError / 0.06
                )
            }
            if rectError < 0.06 {
                return RecognisedShape(
                    kind: .rect,
                    a: InkPoint(x: box.minX, y: box.minY), b: InkPoint(x: box.maxX, y: box.maxY),
                    confidence: 1 - rectError / 0.06
                )
            }
        }

        return nil
    }

    private static func detectArrow(_ points: [InkPoint], diagonal: Double) -> RecognisedShape? {
        let headStart = Int((Double(points.count) * 0.72).rounded(.down))
        let shaft = Array(points.prefix(headStart))
        guard shaft.count >= 4 else { return nil }

        let shaftError = meanDistanceToSegment(shaft, shaft[0], shaft[shaft.count - 1]) / diagonal
        guard shaftError <= 0.05 else { return nil }

        // The head has to double back on the shaft rather than continue it.
        let tip = points[headStart]
        let end = points[points.count - 1]
        let shaftAngle = angle(shaft[0], shaft[shaft.count - 1])
        let backAngle = angle(tip, end)
        let turn = abs(normalise(backAngle - shaftAngle))
        let headLength = hypot(end.x - tip.x, end.y - tip.y) / diagonal

        guard turn >= .pi * 0.45, turn <= .pi * 0.92 else { return nil }
        guard headLength >= 0.06, headLength <= 0.5 else { return nil }

        return RecognisedShape(kind: .arrow, a: shaft[0], b: tip, confidence: 1 - shaftError / 0.05)
    }

    // MARK: - Geometry

    static func resample(_ points: [InkPoint], count: Int) -> [InkPoint] {
        guard !points.isEmpty, count > 1 else { return points }
        let total = pathLength(points)
        guard total > 0 else { return Array(repeating: points[0], count: count) }

        let step = total / Double(count - 1)
        var out = [points[0]]
        var accumulated = 0.0
        var index = 1
        var previous = points[0]

        while index < points.count && out.count < count {
            let segment = hypot(points[index].x - previous.x, points[index].y - previous.y)
            if accumulated + segment >= step {
                let t = (step - accumulated) / segment
                let next = InkPoint(
                    x: previous.x + (points[index].x - previous.x) * t,
                    y: previous.y + (points[index].y - previous.y) * t
                )
                out.append(next)
                previous = next
                accumulated = 0
            } else {
                accumulated += segment
                previous = points[index]
                index += 1
            }
        }
        while out.count < count { out.append(points[points.count - 1]) }
        return out
    }

    static func pathLength(_ points: [InkPoint]) -> Double {
        guard points.count > 1 else { return 0 }
        return (1..<points.count).reduce(0) {
            $0 + hypot(points[$1].x - points[$1 - 1].x, points[$1].y - points[$1 - 1].y)
        }
    }

    private struct Box {
        let minX, minY, maxX, maxY: Double
        var width: Double { maxX - minX }
        var height: Double { maxY - minY }

        init(_ points: [InkPoint]) {
            minX = points.map(\.x).min() ?? 0
            maxX = points.map(\.x).max() ?? 0
            minY = points.map(\.y).min() ?? 0
            maxY = points.map(\.y).max() ?? 0
        }
    }

    private static func meanDistanceToSegment(_ points: [InkPoint], _ a: InkPoint, _ b: InkPoint) -> Double {
        guard !points.isEmpty else { return 0 }
        return points.reduce(0) { $0 + StrokeCodec.pointToSegment($1, a, b) } / Double(points.count)
    }

    /// Mean radial error against the ellipse inscribed in the bounding box.
    private static func ellipseResidual(_ points: [InkPoint], _ box: Box) -> Double {
        let cx = (box.minX + box.maxX) / 2
        let cy = (box.minY + box.maxY) / 2
        let rx = max(box.width / 2, 1e-6)
        let ry = max(box.height / 2, 1e-6)
        let total = points.reduce(0.0) { running, point in
            running + abs(hypot((point.x - cx) / rx, (point.y - cy) / ry) - 1) * min(rx, ry)
        }
        return total / Double(points.count)
    }

    /// Mean distance to the nearest edge of the bounding rectangle.
    private static func rectResidual(_ points: [InkPoint], _ box: Box) -> Double {
        let corners = [
            InkPoint(x: box.minX, y: box.minY), InkPoint(x: box.maxX, y: box.minY),
            InkPoint(x: box.maxX, y: box.maxY), InkPoint(x: box.minX, y: box.maxY),
        ]
        let total = points.reduce(0.0) { running, point in
            let nearest = (0..<4).map {
                StrokeCodec.pointToSegment(point, corners[$0], corners[($0 + 1) % 4])
            }.min() ?? 0
            return running + nearest
        }
        return total / Double(points.count)
    }

    private static func angle(_ a: InkPoint, _ b: InkPoint) -> Double {
        atan2(b.y - a.y, b.x - a.x)
    }

    private static func normalise(_ value: Double) -> Double {
        var angle = value
        while angle > .pi { angle -= .pi * 2 }
        while angle < -.pi { angle += .pi * 2 }
        return angle
    }

    /// The path a recognised shape becomes, so it can be stored as ordinary ink.
    ///
    /// Stored as points rather than as a shape of its own: a straightened
    /// circle is just a very tidy stroke, which means it erases, moves, selects
    /// and renders through exactly the same code as everything else.
    static func path(_ shape: RecognisedShape, segments: Int = 48) -> [InkPoint] {
        let a = shape.a
        let b = shape.b

        switch shape.kind {
        case .line:
            return [a, b]

        case .arrow:
            let head = hypot(b.x - a.x, b.y - a.y) * 0.18
            let direction = atan2(b.y - a.y, b.x - a.x)
            func wing(_ offset: Double) -> InkPoint {
                InkPoint(x: b.x - cos(direction + offset) * head, y: b.y - sin(direction + offset) * head)
            }
            return [a, b, wing(0.45), b, wing(-0.45)]

        case .rect:
            return [
                InkPoint(x: a.x, y: a.y), InkPoint(x: b.x, y: a.y),
                InkPoint(x: b.x, y: b.y), InkPoint(x: a.x, y: b.y),
                InkPoint(x: a.x, y: a.y),
            ]

        case .ellipse:
            let cx = (a.x + b.x) / 2
            let cy = (a.y + b.y) / 2
            let rx = abs(b.x - a.x) / 2
            let ry = abs(b.y - a.y) / 2
            return (0...segments).map { index in
                let t = (Double(index) / Double(segments)) * .pi * 2
                return InkPoint(x: cx + cos(t) * rx, y: cy + sin(t) * ry)
            }
        }
    }
}

/// A straight edge to draw against.
///
/// One ruler for the reader rather than one per page: a ruler is a thing you
/// put on the book, not a thing the book has. It is never stored — it is where
/// you are holding it right now, not a mark you made.
struct RulerLine: Equatable, Sendable {
    var a: InkPoint
    var b: InkPoint

    /// How close a stroke has to start to the ruler before it snaps to it.
    static let capture = 0.03

    /// Project a point onto the ruler, when it is close enough to be meant.
    func project(_ point: InkPoint) -> InkPoint {
        let dx = b.x - a.x
        let dy = b.y - a.y
        let lengthSquared = dx * dx + dy * dy
        guard lengthSquared != 0 else { return point }

        let t = min(max(((point.x - a.x) * dx + (point.y - a.y) * dy) / lengthSquared, 0), 1)
        let projected = InkPoint(x: a.x + t * dx, y: a.y + t * dy, pressure: point.pressure)
        return hypot(projected.x - point.x, projected.y - point.y) <= Self.capture ? projected : point
    }
}
