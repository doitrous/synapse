import Foundation

/// Smoothing that follows the hand without lagging behind it.
///
/// A port of `src/lib/reader/stabilize.ts`. A "pulled string" model: the emitted
/// point chases the raw one rather than being it. At strength 0 it is the raw
/// input; higher values trade responsiveness for a steadier line, which is what
/// someone writing small annotations on a dense page actually wants.
///
/// The catch-up on release matters more than it looks: without it every stroke
/// ends short of where the pen lifted, so a deliberate tick or the tail of a
/// letter is quietly clipped.
struct Stabilizer {

    private var point: InkPoint?
    private let follow: Double

    /// `strength` 0..1. Mapped so 1 is very smooth but never frozen — the
    /// factor bottoms out at 0.1 rather than 0, which is why a fully stabilised
    /// line still arrives rather than hanging behind the finger forever.
    init(strength: Double) {
        follow = 1 - min(1, max(0, strength)) * 0.9
    }

    mutating func push(_ raw: InkPoint) -> InkPoint {
        guard let previous = point else {
            point = raw
            return raw
        }
        let next = InkPoint(
            x: previous.x + (raw.x - previous.x) * follow,
            y: previous.y + (raw.y - previous.y) * follow,
            pressure: raw.pressure
        )
        point = next
        return next
    }

    /// The samples that close the gap between the smoothed line and the pen.
    func finish(_ raw: InkPoint, steps: Int = 4) -> [InkPoint] {
        guard let point else { return [raw] }
        return (1...max(steps, 1)).map { step in
            let t = Double(step) / Double(steps)
            return InkPoint(
                x: point.x + (raw.x - point.x) * t,
                y: point.y + (raw.y - point.y) * t,
                pressure: raw.pressure
            )
        }
    }
}

extension Stabilizer {

    /// The same filter, applied to a whole path offline.
    static func path(_ points: [InkPoint], strength: Double) -> [InkPoint] {
        // Two points is a straight drag: there is no tremor in it to remove,
        // and adding catch-up samples would only lengthen it for nothing.
        guard points.count >= 3, strength > 0 else { return points }

        var stabilizer = Stabilizer(strength: strength)
        var out = points.map { stabilizer.push($0) }
        out.append(contentsOf: stabilizer.finish(points[points.count - 1]))
        return out
    }

    /// Total turning along a path — how wobbly it is.
    ///
    /// Used by the tests to state the property that matters: more smoothing
    /// means less of this, and the line never sprouts detail the hand did not
    /// make.
    static func totalCurvature(_ points: [InkPoint]) -> Double {
        guard points.count >= 3 else { return 0 }
        var total = 0.0
        for index in 2..<points.count {
            let ax = points[index - 1].x - points[index - 2].x
            let ay = points[index - 1].y - points[index - 2].y
            let bx = points[index].x - points[index - 1].x
            let by = points[index].y - points[index - 1].y
            total += abs(atan2(ax * by - ay * bx, ax * bx + ay * by))
        }
        return total
    }
}
