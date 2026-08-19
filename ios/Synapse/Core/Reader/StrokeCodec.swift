import CoreGraphics
import Foundation

/// A point in page space, with pressure where the device reports it.
struct InkPoint: Equatable, Sendable {
    var x: Double
    var y: Double
    /// 0..1. Captured for future use but **never stored** — `encodePoints`
    /// writes x and y only, and the web does the same.
    var pressure: Double?

    init(x: Double, y: Double, pressure: Double? = nil) {
        self.x = x
        self.y = y
        self.pressure = pressure
    }

    var cgPoint: CGPoint { CGPoint(x: x, y: y) }
}

/// A stroke, small enough to store thousands of.
///
/// A port of `src/lib/reader/strokeCodec.ts`. Three stages, each cheap and
/// reversible:
///
/// 1. **Simplify** — Ramer–Douglas–Peucker, which typically removes half the
///    samples with no visible change to the line.
/// 2. **Quantise** — multiply by 4096 and round. One unit is about 0.05 mm on
///    A4: finer than a nib, and far finer than anyone can see.
/// 3. **Delta-encode** — each point as its offset from the last.
///
/// The result stays a plain array of small integers rather than base64, because
/// the account export promises a student their own data and a wall of base64 is
/// not that.
enum StrokeCodec {

    /// 1/4096 of a page width. Below the resolution of any pen or any eye.
    static let quantum: Double = 4096

    /// Matches JavaScript's `Math.round`, which is `floor(x + 0.5)` — half
    /// rounds *up*, toward positive infinity.
    ///
    /// Swift's `rounded()` is half-away-from-zero, so the two disagree on
    /// exactly `-n.5`: JS gives `-1` for `-1.5`, Swift gives `-2`. One unit is a
    /// hundredth of a millimetre, so nobody would see it — but the two encoders
    /// producing different integers for the same stroke is the kind of drift
    /// that makes a later comparison mysteriously fail.
    static func quantise(_ value: Double) -> Int {
        Int((value * quantum + 0.5).rounded(.down))
    }

    static func dequantise(_ value: Int) -> Double {
        Double(value) / quantum
    }

    /// `[x0, y0, dx1, dy1, …]` — the shape stored on an ink object's `p`.
    static func encode(_ points: [InkPoint]) -> [Int] {
        guard !points.isEmpty else { return [] }

        var out: [Int] = []
        out.reserveCapacity(points.count * 2)
        var lastX = 0
        var lastY = 0

        for (index, point) in points.enumerated() {
            let x = quantise(point.x)
            let y = quantise(point.y)
            if index == 0 {
                out.append(x)
                out.append(y)
            } else {
                out.append(x - lastX)
                out.append(y - lastY)
            }
            lastX = x
            lastY = y
        }
        return out
    }

    static func decode(_ encoded: [Int]) -> [InkPoint] {
        var points: [InkPoint] = []
        var x = 0
        var y = 0
        var index = 0

        while index + 1 < encoded.count {
            if index == 0 {
                x = encoded[0]
                y = encoded[1]
            } else {
                x += encoded[index]
                y += encoded[index + 1]
            }
            points.append(InkPoint(x: dequantise(x), y: dequantise(y)))
            index += 2
        }
        return points
    }

    /// Move an encoded stroke without decoding it.
    ///
    /// Only the first pair is absolute — every other entry is an offset from
    /// the one before — so moving a whole stroke is two additions, whatever its
    /// length. That is what makes dragging a lasso selection of two hundred
    /// strokes cost nothing.
    static func translate(_ encoded: [Int], dx: Double, dy: Double) -> [Int] {
        guard encoded.count >= 2 else { return encoded }
        var out = encoded
        out[0] += quantise(dx)
        out[1] += quantise(dy)
        return out
    }

    /// Ramer–Douglas–Peucker.
    ///
    /// `epsilon` is in page-space units, so it means the same thing on every
    /// document: 0.0006 of a page width is well under a pixel at 4× zoom.
    static func simplify(_ points: [InkPoint], epsilon: Double = 0.0006) -> [InkPoint] {
        guard points.count > 2 else { return points }

        var keep = [Bool](repeating: false, count: points.count)
        keep[0] = true
        keep[points.count - 1] = true

        // Iterative rather than recursive: a long stroke is thousands of
        // samples, and the recursion depth is data-dependent.
        var stack: [(Int, Int)] = [(0, points.count - 1)]
        while let (start, end) = stack.popLast() {
            var furthest = -1
            var distance = epsilon

            var index = start + 1
            while index < end {
                let candidate = pointToSegment(points[index], points[start], points[end])
                if candidate > distance {
                    distance = candidate
                    furthest = index
                }
                index += 1
            }

            guard furthest != -1 else { continue }
            keep[furthest] = true
            stack.append((start, furthest))
            stack.append((furthest, end))
        }

        return zip(points, keep).compactMap { $1 ? $0 : nil }
    }

    /// Perpendicular distance from a point to a segment, or to its nearer end.
    static func pointToSegment(_ point: InkPoint, _ a: InkPoint, _ b: InkPoint) -> Double {
        let dx = b.x - a.x
        let dy = b.y - a.y
        let lengthSquared = dx * dx + dy * dy
        guard lengthSquared != 0 else { return hypot(point.x - a.x, point.y - a.y) }

        var t = ((point.x - a.x) * dx + (point.y - a.y) * dy) / lengthSquared
        t = min(max(t, 0), 1)
        return hypot(point.x - (a.x + t * dx), point.y - (a.y + t * dy))
    }

    /// Roughly what a value costs once serialised, for the shard size guard.
    static func byteSize(_ value: some Encodable) -> Int {
        (try? JSONEncoder().encode(value).count) ?? 0
    }

    /// The bounding box of a stroke, padded by half its width — the same
    /// `boundsOf(points, w / 2)` the web caches on every ink object so culling
    /// and hit-testing can reject a mark without decoding its points.
    static func bounds(_ points: [InkPoint], padding: Double = 0) -> [Double] {
        guard let first = points.first else { return [0, 0, 0, 0] }

        var minX = first.x, minY = first.y, maxX = first.x, maxY = first.y
        for point in points.dropFirst() {
            minX = min(minX, point.x)
            minY = min(minY, point.y)
            maxX = max(maxX, point.x)
            maxY = max(maxY, point.y)
        }
        return [minX - padding, minY - padding, maxX + padding, maxY + padding]
    }
}
