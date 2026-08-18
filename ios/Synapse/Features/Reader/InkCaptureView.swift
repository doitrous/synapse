import PDFKit
import UIKit

/// Where a stroke is drawn before it is committed.
///
/// Sits over the reader and takes the touch away from the page whenever a tool
/// other than pan is active. The wet stroke is painted here at full frame rate;
/// only when the finger lifts does it become an object and reach the store —
/// so a long stroke costs one write, not one per sample.
@MainActor
final class InkCaptureView: UIView {

    /// Called when a stroke finishes, in page space, with the page it landed on.
    var onStroke: ((_ points: [InkPoint], _ page: Int) -> Void)?
    /// Called when an eraser swipe finishes, with the whole path it swept.
    ///
    /// Once per gesture rather than once per sample: the sweep is a path, and
    /// testing it whole is both what the web does and what stops a single scrub
    /// costing one shard write per touch event.
    var onErase: ((_ path: [InkPoint], _ page: Int, _ radius: Double) -> Void)?

    var settings = ToolSettings() {
        didSet {
            isUserInteractionEnabled = settings.tool.drawsOnPage
            claw.isEnabled = settings.tool.drawsOnPage
            setNeedsDisplay()
        }
    }

    weak var pdfView: PDFView?

    /// The stroke in progress, in page space.
    private var wet: [InkPoint] = []
    /// The page it started on. A stroke belongs to where it began, so crossing
    /// a page boundary mid-gesture does not split or move it.
    private var wetPage: PDFPage?
    private var wetMetrics = PageMetrics(width: 0, height: 0)
    /// Where the eraser has been this gesture, for drawing its trail.
    private var eraserTrail: [CGPoint] = []
    /// The smoothing filter for the stroke in progress.
    ///
    /// One per stroke, as on the web — it carries the chased point, so reusing
    /// it across strokes would start each new line from where the last ended.
    private var stabilizer = Stabilizer(strength: 0)
    /// The last unsmoothed sample, so the release can catch up to where the
    /// finger actually lifted rather than where the filter had reached.
    private var lastRaw: InkPoint?

    /// Claims the gesture before anything else can.
    ///
    /// Disabling the navigation controller's swipe-back by hand did not work —
    /// a SwiftUI NavigationStack does not expose it anywhere a subview can
    /// reach. This is the mechanism UIKit actually provides for the question
    /// "who owns this touch": a recognizer that begins on contact, which every
    /// other recognizer is told to wait on. Because it never fails while a
    /// tool is active, the swipe-back and the scroll view never start.
    private lazy var claw: ImmediateGesture = {
        let gesture = ImmediateGesture(target: self, action: #selector(clawFired))
        gesture.delegate = self
        gesture.isEnabled = false
        // A recognizer that recognizes normally cancels the view's own touches,
        // which would take the stroke away the instant this one wins. It is
        // here to block *other* recognizers, not to replace `touchesMoved`.
        gesture.cancelsTouchesInView = false
        gesture.delaysTouchesBegan = false
        gesture.delaysTouchesEnded = false
        return gesture
    }()

    @objc private func clawFired() {}

    override init(frame: CGRect) {
        super.init(frame: frame)
        addGestureRecognizer(claw)
        backgroundColor = .clear
        isOpaque = false
        isMultipleTouchEnabled = false
        isUserInteractionEnabled = false
        contentMode = .redraw
    }

    required init?(coder: NSCoder) { fatalError("not used") }

    // MARK: - Touches

    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        guard let touch = touches.first, let pdfView else { return }

        let location = touch.preciseLocation(in: self)
        guard let page = pdfView.page(for: convert(location, to: pdfView), nearest: true) else { return }

        wetPage = page
        wetMetrics = PageMetrics(displayedBy: page, in: pdfView)
        wet = []
        eraserTrail = []
        lastRaw = nil
        stabilizer = Stabilizer(strength: settings.stabilization)
        append(touch, event: event)
    }

    override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
        guard let touch = touches.first else { return }
        append(touch, event: event)
        setNeedsDisplay()
    }

    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        finish()
    }

    override func touchesCancelled(_ touches: Set<UITouch>, with event: UIEvent?) {
        wet = []
        eraserTrail = []
        wetPage = nil
        setNeedsDisplay()
    }

    /// Take every sample the device recorded, not just the one delivered.
    ///
    /// A Pencil reports at up to 240 Hz while touch delivery runs at the screen
    /// refresh rate, so reading only `touch.location` throws away most of a
    /// fast stroke and leaves it visibly angular.
    private func append(_ touch: UITouch, event: UIEvent?) {
        let samples = event?.coalescedTouches(for: touch) ?? [touch]
        for sample in samples {
            let location = sample.preciseLocation(in: self)
            if settings.tool == .eraser {
                eraserTrail.append(location)
                if let point = pageSpace(location) { wet.append(point) }
            } else if let point = pageSpace(location) {
                let raw = InkPoint(x: point.x, y: point.y, pressure: pressure(of: sample))
                lastRaw = raw
                wet.append(stabilizer.push(raw))
            }
        }
    }

    private func pressure(of touch: UITouch) -> Double {
        // A finger reports no useful force; 0.5 is what the web substitutes for
        // a mouse, and it keeps the two consistent.
        guard touch.maximumPossibleForce > 0 else { return 0.5 }
        return Double(touch.force / touch.maximumPossibleForce)
    }

    private func pageSpace(_ location: CGPoint) -> InkPoint? {
        guard let pdfView, let page = wetPage, wetMetrics.width > 0 else { return nil }
        let user = pdfView.convert(convert(location, to: pdfView), to: page)
        return wetMetrics.storedPoint(fromUserSpace: user, rotation: page.rotation)
    }

    private func finish() {
        defer {
            wet = []
            eraserTrail = []
            wetPage = nil
            lastRaw = nil
            setNeedsDisplay()
        }

        // Close the gap the smoothing left behind, or every stroke stops short
        // of where the finger lifted and a deliberate tick is clipped off.
        if let lastRaw, settings.tool != .eraser, settings.stabilization > 0, wet.count >= 3 {
            wet.append(contentsOf: stabilizer.finish(lastRaw))
        }

        guard
            !wet.isEmpty,
            let pdfView, let page = wetPage,
            let index = pdfView.document?.index(for: page), index != NSNotFound
        else { return }

        if settings.tool == .eraser {
            onErase?(wet, index + 1, settings.eraserRadius)
        } else {
            onStroke?(wet, index + 1)
        }
    }

    // MARK: - The wet stroke

    override func draw(_ rect: CGRect) {
        guard let context = UIGraphicsGetCurrentContext() else { return }

        if settings.tool == .eraser {
            drawEraser(in: context)
            return
        }

        guard wet.count > 1, let pdfView, let page = wetPage, wetMetrics.width > 0 else { return }

        let screen = wet.map { point -> CGPoint in
            let user = wetMetrics.userSpacePoint(point, rotation: page.rotation)
            return convert(pdfView.convert(user, from: page), from: pdfView)
        }

        let highlighter = settings.tool == .highlighter
        context.setBlendMode(highlighter ? .multiply : .normal)
        context.setAlpha(highlighter ? 0.35 : 1)
        context.setStrokeColor(UIColor(hex: settings.color).cgColor)
        context.setLineWidth(CGFloat(settings.strokeWidth) * unitOnScreen(page: page, pdfView: pdfView))
        context.setLineCap(highlighter ? .butt : .round)
        context.setLineJoin(.round)

        let path = CGMutablePath()
        path.move(to: screen[0])
        for index in 1..<(screen.count - 1) {
            let current = screen[index]
            let next = screen[index + 1]
            path.addQuadCurve(
                to: CGPoint(x: (current.x + next.x) / 2, y: (current.y + next.y) / 2),
                control: current
            )
        }
        path.addLine(to: screen[screen.count - 1])

        context.addPath(path)
        context.strokePath()
    }

    private func drawEraser(in context: CGContext) {
        guard let last = eraserTrail.last, let pdfView, let page = wetPage else { return }
        let radius = CGFloat(settings.eraserRadius) * unitOnScreen(page: page, pdfView: pdfView)

        context.setStrokeColor(UIColor.label.withAlphaComponent(0.45).cgColor)
        context.setLineWidth(1)
        context.strokeEllipse(in: CGRect(
            x: last.x - radius, y: last.y - radius, width: radius * 2, height: radius * 2
        ))
    }

    private func unitOnScreen(page: PDFPage, pdfView: PDFView) -> CGFloat {
        let origin = wetMetrics.userSpacePoint(InkPoint(x: 0, y: 0), rotation: page.rotation)
        let away = wetMetrics.userSpacePoint(InkPoint(x: 1, y: 0), rotation: page.rotation)
        let a = convert(pdfView.convert(origin, from: page), from: pdfView)
        let b = convert(pdfView.convert(away, from: page), from: pdfView)
        return hypot(b.x - a.x, b.y - a.y)
    }
}

extension PDFView {
    /// The scroll view PDFKit puts the pages in.
    ///
    /// Not exposed by the framework, so it is found by walking the hierarchy.
    /// Needed because drawing and scrolling compete for the same gesture, and
    /// a stroke that scrolls the document instead of marking it is the single
    /// most annoying thing a reader can do.
    var enclosedScrollView: UIScrollView? {
        var queue: [UIView] = subviews
        while let view = queue.first {
            queue.removeFirst()
            if let scrollView = view as? UIScrollView { return scrollView }
            queue.append(contentsOf: view.subviews)
        }
        return nil
    }
}


/// A gesture that succeeds the instant a finger lands.
///
/// Its only job is to exist and win, so the touches this view handles directly
/// are not taken away mid-stroke by a scroll or a navigation swipe.
final class ImmediateGesture: UIGestureRecognizer {
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent) {
        super.touchesBegan(touches, with: event)
        state = .began
    }

    override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent) {
        super.touchesMoved(touches, with: event)
        state = .changed
    }

    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent) {
        super.touchesEnded(touches, with: event)
        state = .ended
    }

    override func touchesCancelled(_ touches: Set<UITouch>, with event: UIEvent) {
        super.touchesCancelled(touches, with: event)
        state = .cancelled
    }
}

extension InkCaptureView: UIGestureRecognizerDelegate {

    /// Every other recognizer waits for this one to fail — and while a tool is
    /// active it does not fail, so nothing else begins.
    func gestureRecognizer(
        _ gestureRecognizer: UIGestureRecognizer,
        shouldBeRequiredToFailBy other: UIGestureRecognizer
    ) -> Bool {
        true
    }

    /// Drawing is a single-finger gesture, so a two-finger pinch is still the
    /// zoom it looks like.
    func gestureRecognizer(
        _ gestureRecognizer: UIGestureRecognizer,
        shouldRecognizeSimultaneouslyWith other: UIGestureRecognizer
    ) -> Bool {
        other is UIPinchGestureRecognizer
    }
}
