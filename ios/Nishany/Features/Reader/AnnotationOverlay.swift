import PDFKit
import UIKit

extension UIColor {

    /// A literal sRGB colour as the annotation model stores it.
    ///
    /// Ink colours are literal rather than theme tokens on purpose: a red pen
    /// has to stay red in both themes.
    convenience init(hex: String) {
        var text = hex.trimmingCharacters(in: .whitespaces)
        if text.hasPrefix("#") { text.removeFirst() }
        if text.count == 3 { text = text.map { "\($0)\($0)" }.joined() }

        guard text.count == 6, let value = UInt32(text, radix: 16) else {
            self.init(white: 0.15, alpha: 1)
            return
        }
        self.init(
            red: CGFloat((value >> 16) & 0xFF) / 255,
            green: CGFloat((value >> 8) & 0xFF) / 255,
            blue: CGFloat(value & 0xFF) / 255,
            alpha: 1
        )
    }

    /// A widget tone.
    ///
    /// These are theme tokens, not ink: a sticky note has to stay readable on
    /// porcelain and on charcoal. Tape takes the opaque variant, because its
    /// whole purpose is to hide what is under it.
    convenience init(tone: NoteTone, opaque: Bool) {
        let light: UInt32
        let dark: UInt32

        switch (tone, opaque) {
        case (.paper, _): (light, dark) = (0xFFFDFA, 0x201C16)
        case (.teal, true): (light, dark) = (0x2F7D6B, 0x2F7D6B)
        case (.teal, false): (light, dark) = (0xE3F0EC, 0x22332F)
        case (.amber, true): (light, dark) = (0xC2691C, 0xC2691C)
        case (.amber, false): (light, dark) = (0xF6ECD6, 0x352914)
        case (.rose, true): (light, dark) = (0xB03A76, 0xB03A76)
        case (.rose, false): (light, dark) = (0xF7E4EE, 0x33202B)
        case (.sage, true): (light, dark) = (0x4F8F3A, 0x4F8F3A)
        case (.sage, false): (light, dark) = (0xEAEFDF, 0x26301E)
        case (.slate, true): (light, dark) = (0x5B6570, 0x5B6570)
        case (.slate, false): (light, dark) = (0xF1EBE1, 0x282219)
        case (.sand, true): (light, dark) = (0x8A6D3B, 0x8A6D3B)
        case (.sand, false): (light, dark) = (0xECE4D7, 0x322A20)
        case (.clay, true): (light, dark) = (0xB0512B, 0xB0512B)
        case (.clay, false): (light, dark) = (0xF4E5D9, 0x3B2418)
        }

        self.init { traits in
            UIColor(rgb: traits.userInterfaceStyle == .dark ? dark : light)
        }
    }
}

/// Draws every visible page's marks over the PDF view.
///
/// One overlay across the whole reader rather than one per page, and every
/// point converted with `PDFView.convert(_:from:)`. That call knows about the
/// page's rotation, the current zoom and the scroll position, so none of them
/// have to be tracked here — and the alternative, a per-page overlay, is
/// rotated by PDFKit along with its page, which turns a horizontal highlighter
/// into a vertical one.
final class AnnotationOverlay: UIView {

    /// Marks by 1-based page.
    var marks: [Int: [AnnotationObject]] = [:] {
        didSet { setNeedsDisplay() }
    }

    weak var pdfView: PDFView? {
        didSet { observe() }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        backgroundColor = .clear
        isOpaque = false
        // Read-only for now: every touch belongs to the page underneath.
        isUserInteractionEnabled = false
        contentMode = .redraw
    }

    required init?(coder: NSCoder) { fatalError("not used") }

    deinit { NotificationCenter.default.removeObserver(self) }

    private func observe() {
        NotificationCenter.default.removeObserver(self)
        guard let pdfView else { return }

        // The marks are painted in view coordinates, so anything that moves the
        // page moves them: scrolling, zooming, and the relayout that follows a
        // rotation of the device.
        for name in [
            Notification.Name.PDFViewScaleChanged,
            .PDFViewPageChanged,
            .PDFViewVisiblePagesChanged,
        ] {
            NotificationCenter.default.addObserver(
                self, selector: #selector(redraw), name: name, object: pdfView
            )
        }
        if let scrollView = pdfView.subviews.compactMap({ $0 as? UIScrollView }).first {
            scrollView.delegate.map { _ in }
            // A scroll view does not post notifications, so follow its offset.
            scrollObservation = scrollView.observe(\.contentOffset, options: [.new]) { [weak self] _, _ in
                Task { @MainActor in self?.setNeedsDisplay() }
            }
        }
    }

    private var scrollObservation: NSKeyValueObservation?

    @objc private func redraw() { setNeedsDisplay() }

    override func draw(_ rect: CGRect) {
        guard
            let context = UIGraphicsGetCurrentContext(),
            let pdfView,
            let document = pdfView.document
        else { return }

        for page in pdfView.visiblePages {
            let index = document.index(for: page)
            guard index != NSNotFound else { continue }

            let objects = (marks[index + 1] ?? []).sorted { $0.z < $1.z }
            guard !objects.isEmpty else { continue }

            let metrics = PageMetrics(displayedBy: page, in: pdfView)
            guard metrics.width > 0 else { continue }

            // One stored unit is this many points on screen, which is what
            // every width and font size is multiplied by.
            let unit = distanceOnScreen(page: page, metrics: metrics, in: pdfView)

            for object in objects {
                draw(object, page: page, metrics: metrics, unit: unit, in: context, pdfView: pdfView)
            }
        }
    }

    /// How long one page-space unit is on screen right now.
    ///
    /// Measured rather than derived from the zoom factor, so it stays right
    /// whatever PDFKit is doing with scale and rotation.
    private func distanceOnScreen(page: PDFPage, metrics: PageMetrics, in pdfView: PDFView) -> CGFloat {
        let origin = place(InkPoint(x: 0, y: 0), page: page, metrics: metrics, in: pdfView)
        let unitAway = place(InkPoint(x: 1, y: 0), page: page, metrics: metrics, in: pdfView)
        return hypot(unitAway.x - origin.x, unitAway.y - origin.y)
    }

    private func place(_ point: InkPoint, page: PDFPage, metrics: PageMetrics, in pdfView: PDFView) -> CGPoint {
        let user = metrics.userSpacePoint(point, rotation: page.rotation)
        return convert(pdfView.convert(user, from: page), from: pdfView)
    }

    // MARK: - One mark

    private func draw(
        _ object: AnnotationObject, page: PDFPage, metrics: PageMetrics,
        unit: CGFloat, in context: CGContext, pdfView: PDFView
    ) {
        switch object.kind {
        case .ink, .highlighter:
            drawInk(object, page: page, metrics: metrics, unit: unit, in: context, pdfView: pdfView)
        case .tape:
            fill(object, page: page, metrics: metrics, in: context, pdfView: pdfView,
                 color: UIColor(tone: object.tone ?? .slate, opaque: true))
        case .note:
            fill(object, page: page, metrics: metrics, in: context, pdfView: pdfView,
                 color: UIColor(tone: object.tone ?? .amber, opaque: false))
            drawText(object, page: page, metrics: metrics, unit: unit, in: pdfView,
                     size: 11, color: .label)
        case .textbox:
            drawText(object, page: page, metrics: metrics, unit: unit, in: pdfView,
                     size: CGFloat(object.size ?? 0.022) * unit,
                     color: UIColor(hex: object.color ?? "#241d16"))
        case .marker:
            // A bookmark is a place, not a mark. It belongs in the contents
            // panel; drawing it on the page would be graffiti.
            break
        }
    }

    private func drawInk(
        _ object: AnnotationObject, page: PDFPage, metrics: PageMetrics,
        unit: CGFloat, in context: CGContext, pdfView: PDFView
    ) {
        let points = StrokeCodec.decode(object.p ?? [])
        guard !points.isEmpty else { return }

        let highlighter = object.kind == .highlighter
        let screen = points.map { place($0, page: page, metrics: metrics, in: pdfView) }

        context.saveGState()
        defer { context.restoreGState() }

        // Multiply keeps the text legible under a highlighter; ink sits on top
        // opaque.
        context.setBlendMode(highlighter ? .multiply : .normal)
        context.setAlpha(highlighter ? CGFloat(object.a ?? 0.35) : 1)
        context.setLineWidth(CGFloat(object.w ?? 0.003) * unit)
        // Butt caps on a highlighter so overlapping passes do not bulge at the
        // ends; round on ink so a pen stroke ends like a pen stroke.
        context.setLineCap(highlighter ? .butt : .round)
        context.setLineJoin(.round)

        guard screen.count > 1 else {
            context.setFillColor(UIColor(hex: object.color ?? "#241d16").cgColor)
            let radius = CGFloat(object.w ?? 0.003) * unit / 2
            context.fillEllipse(in: CGRect(
                x: screen[0].x - radius, y: screen[0].y - radius,
                width: radius * 2, height: radius * 2
            ))
            return
        }

        context.setStrokeColor(UIColor(hex: object.color ?? "#241d16").cgColor)
        context.addPath(smoothPath(through: screen))
        context.strokePath()
    }

    /// Quadratic curves through the midpoints, as the web draws.
    ///
    /// Joining the samples with straight lines shows every one of them as a
    /// corner, which is very visible on a slow, deliberate stroke.
    private func smoothPath(through points: [CGPoint]) -> CGPath {
        let path = CGMutablePath()
        path.move(to: points[0])

        guard points.count > 2 else {
            path.addLine(to: points[1])
            return path
        }

        for index in 1..<(points.count - 1) {
            let current = points[index]
            let next = points[index + 1]
            path.addQuadCurve(
                to: CGPoint(x: (current.x + next.x) / 2, y: (current.y + next.y) / 2),
                control: current
            )
        }
        path.addLine(to: points[points.count - 1])
        return path
    }

    private func rectOnScreen(
        _ object: AnnotationObject, page: PDFPage, metrics: PageMetrics, in pdfView: PDFView
    ) -> CGRect {
        let box = object.rect
        guard box.count == 4 else { return .zero }

        // All four corners, because a rotated page turns a rectangle's corners
        // into a different pair.
        let corners = [
            place(InkPoint(x: box[0], y: box[1]), page: page, metrics: metrics, in: pdfView),
            place(InkPoint(x: box[2], y: box[1]), page: page, metrics: metrics, in: pdfView),
            place(InkPoint(x: box[2], y: box[3]), page: page, metrics: metrics, in: pdfView),
            place(InkPoint(x: box[0], y: box[3]), page: page, metrics: metrics, in: pdfView),
        ]
        let xs = corners.map(\.x)
        let ys = corners.map(\.y)
        return CGRect(
            x: xs.min() ?? 0, y: ys.min() ?? 0,
            width: (xs.max() ?? 0) - (xs.min() ?? 0),
            height: (ys.max() ?? 0) - (ys.min() ?? 0)
        )
    }

    private func fill(
        _ object: AnnotationObject, page: PDFPage, metrics: PageMetrics,
        in context: CGContext, pdfView: PDFView, color: UIColor
    ) {
        let rect = rectOnScreen(object, page: page, metrics: metrics, in: pdfView)
        guard rect.width > 0, rect.height > 0 else { return }

        let rounded = UIBezierPath(roundedRect: rect, cornerRadius: object.kind == .note ? 6 : 2)
        context.setFillColor(color.cgColor)
        context.addPath(rounded.cgPath)
        context.fillPath()
    }

    private func drawText(
        _ object: AnnotationObject, page: PDFPage, metrics: PageMetrics,
        unit: CGFloat, in pdfView: PDFView, size: CGFloat, color: UIColor
    ) {
        let text = object.text ?? ""
        guard !text.isEmpty else { return }

        let rect = rectOnScreen(object, page: page, metrics: metrics, in: pdfView)
            .insetBy(dx: object.kind == .note ? 6 : 0, dy: object.kind == .note ? 5 : 0)
        guard rect.width > 2, rect.height > 2 else { return }

        let paragraph = NSMutableParagraphStyle()
        paragraph.lineBreakMode = .byWordWrapping

        (text as NSString).draw(
            with: rect, options: [.usesLineFragmentOrigin],
            attributes: [
                .font: UIFont.systemFont(ofSize: max(6, size)),
                .foregroundColor: color,
                .paragraphStyle: paragraph,
            ],
            context: nil
        )
    }
}
