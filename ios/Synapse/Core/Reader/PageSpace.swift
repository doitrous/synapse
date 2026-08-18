import CoreGraphics
import Foundation
import PDFKit

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

    /// The page as the reader actually shows it.
    ///
    /// `bounds(for:)` reports the box **before** the page's own `/Rotate` is
    /// applied, so a page stored turned comes back 842×595 while it displays
    /// 595×842. The stored coordinates are normalised against the width a
    /// reader sees — which is what pdf.js reports on the web — so the displayed
    /// size is the one that matters here.
    init(displayedBy page: PDFPage, in view: PDFView) {
        let box = page.bounds(for: view.displayBox)
        let quarterTurned = abs(page.rotation) % 180 != 0
        self.init(
            width: Double(quarterTurned ? box.height : box.width),
            height: Double(quarterTurned ? box.width : box.height)
        )
    }

    /// A stored point → PDFKit's unrotated user space for this page.
    ///
    /// Two changes of basis at once, and both are easy to get silently wrong:
    /// the stored form is top-left with y down and normalised by the *displayed*
    /// width, while PDFKit's page space is bottom-left with y up and always
    /// unrotated. Skipping the rotation puts a horizontal highlighter down the
    /// page vertically; skipping the flip puts it near the right place, upside
    /// down.
    func userSpacePoint(_ point: InkPoint, rotation: Int) -> CGPoint {
        // Where the mark sits on the page as it is shown, in points.
        let dx = point.x * width
        let dy = point.y * width

        // The unrotated box, which is what user space is measured in.
        let quarterTurned = abs(rotation) % 180 != 0
        let boxWidth = quarterTurned ? height : width
        let boxHeight = quarterTurned ? width : height

        switch ((rotation % 360) + 360) % 360 {
        case 90:
            return CGPoint(x: dy, y: dx)
        case 180:
            return CGPoint(x: boxWidth - dx, y: dy)
        case 270:
            return CGPoint(x: boxHeight - dy, y: boxWidth - dx)
        default:
            return CGPoint(x: dx, y: boxHeight - dy)
        }
    }

    /// PDFKit's unrotated user space → a stored point.
    ///
    /// The exact inverse of `userSpacePoint`. Kept beside it so the two cannot
    /// drift: a capture path that disagrees with the render path by one axis
    /// draws a stroke that lands somewhere else the moment it is reloaded.
    func storedPoint(fromUserSpace point: CGPoint, rotation: Int) -> InkPoint {
        let quarterTurned = abs(rotation) % 180 != 0
        let boxWidth = quarterTurned ? height : width
        let boxHeight = quarterTurned ? width : height

        let dx: Double
        let dy: Double
        switch ((rotation % 360) + 360) % 360 {
        case 90:
            dx = Double(point.y)
            dy = Double(point.x)
        case 180:
            dx = boxWidth - Double(point.x)
            dy = Double(point.y)
        case 270:
            dx = boxWidth - Double(point.y)
            dy = boxHeight - Double(point.x)
        default:
            dx = Double(point.x)
            dy = boxHeight - Double(point.y)
        }

        guard width > 0 else { return InkPoint(x: 0, y: 0) }
        return InkPoint(x: dx / width, y: dy / width)
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
