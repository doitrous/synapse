import CoreGraphics
import Foundation

/// How a page's own size relates to the stored coordinates.
///
/// A port of the conversions in `src/lib/reader/annotations.ts`, plus the piece
/// the web never needed: PDFKit measures pages from the **bottom-left with y
/// upward**, while the stored form is **top-left with y downward**. Every value
/// crossing that boundary has to be flipped, and a mark that is not is not
/// obviously wrong — it is upside down on the page, near where it should be.
struct PageMetrics: Equatable, Sendable {
    /// Unscaled width in PDF points.
    let width: Double
    /// Unscaled height in PDF points.
    let height: Double

    init(width: Double, height: Double) {
        self.width = width
        self.height = height
    }

    init(bounds: CGRect) {
        self.init(width: Double(bounds.width), height: Double(bounds.height))
    }

    /// `height / width` — how tall the page is in page-space units. About
    /// 1.414 on A4.
    var pageSpaceHeight: Double { width > 0 ? height / width : 0 }
}

enum PageSpace {

    /// A point on screen → page space.
    ///
    /// `scale` is the on-screen size of one PDF point. Both axes are divided by
    /// the *width*, which is what keeps a circle round: dividing y by the
    /// height instead would squash every mark on a non-square page.
    static func toPageSpace(_ point: CGPoint, metrics: PageMetrics, scale: Double) -> InkPoint {
        let divisor = metrics.width * scale
        guard divisor != 0 else { return InkPoint(x: 0, y: 0) }
        return InkPoint(x: Double(point.x) / divisor, y: Double(point.y) / divisor)
    }

    /// Page space → a point on screen.
    static func fromPageSpace(_ point: InkPoint, metrics: PageMetrics, scale: Double) -> CGPoint {
        let divisor = metrics.width * scale
        return CGPoint(x: point.x * divisor, y: point.y * divisor)
    }

    /// A stored width or font size → points on screen. The same divisor, which
    /// is why a stroke keeps its weight relative to the text at any zoom.
    static func lengthOnScreen(_ length: Double, metrics: PageMetrics, scale: Double) -> Double {
        length * metrics.width * scale
    }

    /// A stored rect → a rect on screen.
    static func rectOnScreen(_ rect: [Double], metrics: PageMetrics, scale: Double) -> CGRect {
        guard rect.count == 4 else { return .zero }
        let divisor = metrics.width * scale
        return CGRect(
            x: rect[0] * divisor,
            y: rect[1] * divisor,
            width: (rect[2] - rect[0]) * divisor,
            height: (rect[3] - rect[1]) * divisor
        )
    }

    // MARK: - The PDFKit boundary

    /// Page space → PDFKit user space.
    ///
    /// PDFKit's origin is the bottom-left corner of the page box and y grows
    /// upward; the stored form's origin is the top-left and y grows downward.
    /// Both stored axes are scaled by the page *width*, so x is a plain
    /// multiply and y is a multiply then a subtraction from the page height.
    static func toPDFPoint(_ point: InkPoint, metrics: PageMetrics) -> CGPoint {
        CGPoint(
            x: point.x * metrics.width,
            y: metrics.height - (point.y * metrics.width)
        )
    }

    /// PDFKit user space → page space.
    static func fromPDFPoint(_ point: CGPoint, metrics: PageMetrics) -> InkPoint {
        guard metrics.width != 0 else { return InkPoint(x: 0, y: 0) }
        return InkPoint(
            x: Double(point.x) / metrics.width,
            y: (metrics.height - Double(point.y)) / metrics.width
        )
    }

    /// Keep a point on the page.
    ///
    /// Bounded by the page's own proportions rather than a square: `y` runs to
    /// `height / width`, so clamping it to 1 would refuse the bottom third of
    /// every portrait page.
    static func clamp(_ point: InkPoint, metrics: PageMetrics) -> InkPoint {
        InkPoint(
            x: min(max(point.x, 0), 1),
            y: min(max(point.y, 0), metrics.pageSpaceHeight),
            pressure: point.pressure
        )
    }

    /// Whether two rects overlap, for culling. `[x0, y0, x1, y1]` both.
    static func intersects(_ a: [Double], _ b: [Double]) -> Bool {
        guard a.count == 4, b.count == 4 else { return false }
        return a[0] <= b[2] && a[2] >= b[0] && a[1] <= b[3] && a[3] >= b[1]
    }
}
