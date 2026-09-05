import PDFKit
import UIKit

/// Where a gesture is interpreted before it becomes a mark.
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
    /// Called when a lasso closes, with the polygon it enclosed.
    var onLasso: ((_ polygon: [InkPoint], _ page: Int) -> Void)?
    /// Called when a widget's rectangle has been dragged out.
    var onRect: ((_ kind: ObjectKind, _ rect: [Double], _ page: Int) -> Void)?
    /// Called repeatedly while a selection is dragged, in page-space units.
    var onMove: ((_ dx: Double, _ dy: Double) -> Void)?
    /// Called when a drag ends, so the next one is a separate undo step.
    var onMoveEnd: (() -> Void)?
    /// Called when a tap lands on nothing, to dismiss a selection.
    var onTapAway: (() -> Void)?
    /// Called as the straight edge is moved or turned.
    var onRuler: ((RulerLine) -> Void)?

    var settings = ToolSettings() {
        didSet { refreshInteraction() }
    }

    /// The selection's box, in page space, and the page it is on.
    ///
    /// Held here so a drag that starts inside it can be claimed before PDFKit
    /// scrolls the document instead.
    var selection: (page: Int, rect: [Double])? {
        didSet { refreshInteraction(); setNeedsDisplay() }
    }

    weak var pdfView: PDFView?

    /// What this gesture turned out to be.
    private enum Gesture {
        case drawing
        case erasing
        case lassoing
        case sizing(ObjectKind)
        case moving(from: CGPoint, total: CGPoint)
        /// Sliding the whole straight edge, or turning it by one end.
        case ruling(RulerGrip, from: InkPoint)
    }

    /// Which part of the ruler a drag took hold of.
    enum RulerGrip { case body, endA, endB }

    private var gesture: Gesture?
    /// The stroke in progress, in page space.
    private var wet: [InkPoint] = []
    /// The page it started on. A mark belongs to where it began, so crossing a
    /// page boundary mid-gesture does not split or move it.
    private var wetPage: PDFPage?
    private var wetMetrics = PageMetrics(width: 0, height: 0)
    /// Where the eraser has been this gesture, for drawing its trail.
    private var eraserTrail: [CGPoint] = []
    /// The corner a widget's rectangle is being dragged from.
    private var anchor: InkPoint?
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
        contentMode = .redraw
    }

    required init?(coder: NSCoder) { fatalError("not used") }

    private func refreshInteraction() {
        claw.isEnabled = settings.tool.drawsOnPage || selection != nil || settings.ruler != nil
        setNeedsDisplay()
    }

    /// Let the page have any touch this view has no use for.
    ///
    /// With a tool active every touch is ours. With only a selection on screen,
    /// just the drag that starts inside its box is — everything else has to
    /// reach PDFKit, or the document would stop scrolling the moment a student
    /// selected something.
    override func hitTest(_ point: CGPoint, with event: UIEvent?) -> UIView? {
        guard isUserInteractionEnabled, !isHidden, alpha > 0.01 else { return nil }
        if settings.tool.drawsOnPage { return bounds.contains(point) ? self : nil }
        if grip(at: point) != nil { return self }
        if let box = selectionOnScreen(), box.insetBy(dx: -22, dy: -22).contains(point) { return self }
        return nil
    }

    /// Which part of the ruler, if any, is under a point on screen.
    ///
    /// The ends win over the body: they are the smaller targets, and grabbing
    /// the body when you meant to turn it is the more annoying mistake.
    ///
    /// The body's band has to stay **inside** the snap radius, and that is not
    /// a detail. A ruler exists to be drawn along, so strokes start near it by
    /// definition; if grabbing reached as far as snapping does, every such
    /// stroke would slide the ruler instead of marking the page and the tool
    /// could not do the one thing it is for. So the band is the drawn line's
    /// own thickness and no more — on the far side of it a stroke snaps.
    private func grip(at point: CGPoint) -> RulerGrip? {
        guard let ruler = settings.ruler, let ends = rulerOnScreen(ruler) else { return nil }
        if hypot(point.x - ends.a.x, point.y - ends.a.y) <= 22 { return .endA }
        if hypot(point.x - ends.b.x, point.y - ends.b.y) <= 22 { return .endB }

        let onLine = StrokeCodec.pointToSegment(
            InkPoint(x: Double(point.x), y: Double(point.y)),
            InkPoint(x: Double(ends.a.x), y: Double(ends.a.y)),
            InkPoint(x: Double(ends.b.x), y: Double(ends.b.y))
        )
        // Half the snap radius, so there is always a band either side where a
        // stroke is drawn against the edge rather than moving it.
        let band = min(6, CGFloat(RulerLine.capture) * unitOnScreen() * 0.5)
        return onLine <= Double(band) ? .body : nil
    }

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
        anchor = nil

        // The ruler is grabbable whatever the tool: it is a thing lying on the
        // page, and having to put a pen down to move it would be absurd.
        if let held = grip(at: location), let point = pageSpace(location) {
            gesture = .ruling(held, from: point)
            return
        }

        // A selection is a layer above the tools, as the web's selection
        // overlay is above its ink surface. Without this, dragging the box
        // while the lasso is still in hand starts a *new* lasso over the marks
        // you had just chosen — and loses them.
        if let box = selectionOnScreen(), box.insetBy(dx: -22, dy: -22).contains(location) {
            gesture = .moving(from: location, total: .zero)
            return
        }

        if !settings.tool.drawsOnPage {
            // Only reachable through `hitTest`, so there is nothing else this
            // touch could have been for.
            gesture = .moving(from: location, total: .zero)
            return
        }

        switch settings.tool {
        case .eraser:
            gesture = .erasing
        case .lasso:
            gesture = .lassoing
        case .note, .textbox, .tape:
            gesture = .sizing(settings.tool.widgetKind ?? .note)
            anchor = pageSpace(location)
        default:
            gesture = .drawing
            stabilizer = Stabilizer(strength: settings.stabilization)
        }
        append(touch, event: event)
    }

    override func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?) {
        guard let touch = touches.first else { return }

        if case .ruling(let held, let from) = gesture {
            guard let now = pageSpace(touch.preciseLocation(in: self)), var ruler = settings.ruler
            else { return }
            switch held {
            case .endA: ruler.a = now
            case .endB: ruler.b = now
            case .body:
                let dx = now.x - from.x
                let dy = now.y - from.y
                ruler.a = InkPoint(x: ruler.a.x + dx, y: ruler.a.y + dy)
                ruler.b = InkPoint(x: ruler.b.x + dx, y: ruler.b.y + dy)
            }
            settings.ruler = ruler
            onRuler?(ruler)
            gesture = .ruling(held, from: now)
            setNeedsDisplay()
            return
        }

        if case .moving(let from, let total) = gesture {
            let now = touch.preciseLocation(in: self)
            let step = CGPoint(x: now.x - from.x, y: now.y - from.y)
            report(step)
            gesture = .moving(from: now, total: CGPoint(x: total.x + step.x, y: total.y + step.y))
            return
        }

        append(touch, event: event)
        setNeedsDisplay()
    }

    override func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?) {
        finish(tapped: touches.first.map { $0.tapCount > 0 && wet.count <= 1 } ?? false)
    }

    override func touchesCancelled(_ touches: Set<UITouch>, with event: UIEvent?) {
        clear()
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
            guard let point = pageSpace(location) else { continue }

            switch gesture {
            case .erasing:
                eraserTrail.append(location)
                wet.append(point)
            case .drawing:
                let ruled = settings.ruler?.project(point) ?? point
                let raw = InkPoint(x: ruled.x, y: ruled.y, pressure: pressure(of: sample))
                lastRaw = raw
                wet.append(stabilizer.push(raw))
            default:
                wet.append(point)
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

    /// A drag in points on screen → a shift in page-space units.
    private func report(_ step: CGPoint) {
        let unit = unitOnScreen()
        guard unit > 0 else { return }
        onMove?(Double(step.x) / Double(unit), Double(step.y) / Double(unit))
    }

    private func clear() {
        gesture = nil
        wet = []
        eraserTrail = []
        wetPage = nil
        lastRaw = nil
        anchor = nil
        setNeedsDisplay()
    }

    private func finish(tapped: Bool) {
        defer { clear() }

        switch gesture {
        case .moving:
            onMoveEnd?()
            return
        case .ruling:
            return
        default:
            break
        }

        guard
            let pdfView, let page = wetPage,
            let index = pdfView.document?.index(for: page), index != NSNotFound
        else { return }
        let number = index + 1

        switch gesture {
        case .erasing:
            guard !wet.isEmpty else { return }
            onErase?(wet, number, settings.eraserRadius)

        case .lassoing:
            // A tap rather than a loop means "select nothing", which is how a
            // student gets rid of a selection they are done with.
            guard wet.count >= 3 else { onTapAway?(); return }
            let polygon = settings.lasso == .rect
                ? Lasso.rectanglePolygon(wet[0], wet[wet.count - 1])
                : wet
            onLasso?(polygon, number)

        case .sizing(let kind):
            guard let anchor, let last = wet.last else { return }
            let rect = rectangle(from: anchor, to: last)
            onRect?(kind, rect, number)

        case .drawing:
            // The pointer is for showing someone something. It is never stored,
            // as on the web — it has already done its whole job by the time the
            // finger lifts.
            guard settings.tool != .laser else { return }

            // Close the gap the smoothing left behind, or every stroke stops
            // short of where the finger lifted and a deliberate tick is
            // clipped off.
            if let lastRaw, settings.stabilization > 0, wet.count >= 3 {
                wet.append(contentsOf: stabilizer.finish(lastRaw))
            }
            guard wet.count > 1 else { return }

            // Straightened into the primitive it resembles, when it clearly is
            // one. Below the confidence bar it stays exactly as it was drawn —
            // a rough circle round a word is usually meant to be rough.
            if settings.straightens,
               let shape = ShapeRecognition.recognise(wet),
               shape.confidence >= ShapeRecognition.snapConfidence {
                onStroke?(ShapeRecognition.path(shape), number)
            } else {
                onStroke?(wet, number)
            }

        default:
            break
        }
    }

    /// The rectangle a widget occupies, given the two corners dragged out.
    ///
    /// A tap is a legitimate way to place one — nobody wants to size a sticky
    /// note before they can write on it — so anything too small to have been
    /// meant as a drag becomes the web's default 0.28 × 0.16 instead.
    private func rectangle(from a: InkPoint, to b: InkPoint) -> [Double] {
        let rect = [min(a.x, b.x), min(a.y, b.y), max(a.x, b.x), max(a.y, b.y)]
        let dragged = rect[2] - rect[0] > 0.02 && rect[3] - rect[1] > 0.01
        return dragged ? rect : [rect[0], rect[1], rect[0] + 0.28, rect[1] + 0.16]
    }

    // MARK: - What is being drawn right now

    override func draw(_ rect: CGRect) {
        guard let context = UIGraphicsGetCurrentContext() else { return }

        if let box = selectionOnScreen() { drawSelection(box, in: context) }
        if let ruler = settings.ruler { drawRuler(ruler, in: context) }

        switch gesture {
        case .erasing: drawEraser(in: context)
        case .lassoing: drawLasso(in: context)
        case .sizing: drawWidgetOutline(in: context)
        case .drawing: drawWet(in: context)
        default: break
        }
    }

    private func drawWet(in context: CGContext) {
        guard wet.count > 1, let path = screenPath(wet) else { return }

        let highlighter = settings.tool == .highlighter
        context.setBlendMode(highlighter ? .multiply : .normal)
        context.setAlpha(highlighter ? 0.35 : 1)
        context.setStrokeColor(UIColor(hex: settings.strokeColor).cgColor)
        context.setLineWidth(CGFloat(settings.strokeWidth) * unitOnScreen())
        context.setLineCap(highlighter ? .butt : .round)
        context.setLineJoin(.round)
        context.addPath(path)
        context.strokePath()
    }

    private func drawLasso(in context: CGContext) {
        guard wet.count > 1 else { return }
        let points = settings.lasso == .rect
            ? Lasso.rectanglePolygon(wet[0], wet[wet.count - 1]) + [wet[0]]
            : wet
        guard let path = screenPath(points, smooth: false) else { return }

        context.setStrokeColor(UIColor.tintColor.cgColor)
        context.setLineWidth(1.5)
        context.setLineDash(phase: 0, lengths: [6, 4])
        context.addPath(path)
        context.strokePath()
        context.setLineDash(phase: 0, lengths: [])
    }

    private func drawWidgetOutline(in context: CGContext) {
        guard let anchor, let last = wet.last else { return }
        let rect = rectangle(from: anchor, to: last)
        guard let box = onScreen(rect) else { return }

        context.setFillColor(UIColor.tintColor.withAlphaComponent(0.12).cgColor)
        context.fill(box)
        context.setStrokeColor(UIColor.tintColor.cgColor)
        context.setLineWidth(1.5)
        context.setLineDash(phase: 0, lengths: [6, 4])
        context.stroke(box)
        context.setLineDash(phase: 0, lengths: [])
    }

    private func drawSelection(_ box: CGRect, in context: CGContext) {
        context.setStrokeColor(UIColor.tintColor.cgColor)
        context.setLineWidth(1.5)
        context.setLineDash(phase: 0, lengths: [5, 3])
        context.stroke(box.insetBy(dx: -6, dy: -6))
        context.setLineDash(phase: 0, lengths: [])
    }

    /// The straight edge, with a grip at each end.
    private func drawRuler(_ ruler: RulerLine, in context: CGContext) {
        guard let ends = rulerOnScreen(ruler) else { return }

        context.setStrokeColor(UIColor.tintColor.withAlphaComponent(0.9).cgColor)
        context.setLineWidth(3)
        context.setLineCap(.round)
        context.move(to: ends.a)
        context.addLine(to: ends.b)
        context.strokePath()

        for end in [ends.a, ends.b] {
            context.setFillColor(UIColor.systemBackground.cgColor)
            context.fillEllipse(in: CGRect(x: end.x - 9, y: end.y - 9, width: 18, height: 18))
            context.setStrokeColor(UIColor.tintColor.cgColor)
            context.setLineWidth(2)
            context.strokeEllipse(in: CGRect(x: end.x - 9, y: end.y - 9, width: 18, height: 18))
        }
    }

    private func rulerOnScreen(_ ruler: RulerLine) -> (a: CGPoint, b: CGPoint)? {
        guard let pdfView, let page = wetPage ?? pdfView.currentPage else { return nil }
        let metrics = wetMetrics.width > 0 ? wetMetrics : PageMetrics(displayedBy: page, in: pdfView)
        guard
            let a = place(ruler.a, on: page, metrics: metrics),
            let b = place(ruler.b, on: page, metrics: metrics)
        else { return nil }
        return (a, b)
    }

    private func drawEraser(in context: CGContext) {
        guard let last = eraserTrail.last else { return }
        let radius = CGFloat(settings.eraserRadius) * unitOnScreen()

        context.setStrokeColor(UIColor.label.withAlphaComponent(0.45).cgColor)
        context.setLineWidth(1)
        context.strokeEllipse(in: CGRect(
            x: last.x - radius, y: last.y - radius, width: radius * 2, height: radius * 2
        ))
    }

    // MARK: - Page space on screen

    /// One page-space unit, in points on screen.
    private func unitOnScreen() -> CGFloat {
        guard let pdfView, let page = wetPage ?? pdfView.currentPage else { return 0 }
        let metrics = wetMetrics.width > 0 ? wetMetrics : PageMetrics(displayedBy: page, in: pdfView)
        let origin = metrics.userSpacePoint(InkPoint(x: 0, y: 0), rotation: page.rotation)
        let away = metrics.userSpacePoint(InkPoint(x: 1, y: 0), rotation: page.rotation)
        let a = convert(pdfView.convert(origin, from: page), from: pdfView)
        let b = convert(pdfView.convert(away, from: page), from: pdfView)
        return hypot(b.x - a.x, b.y - a.y)
    }

    private func place(_ point: InkPoint, on page: PDFPage, metrics: PageMetrics) -> CGPoint? {
        guard let pdfView else { return nil }
        let user = metrics.userSpacePoint(point, rotation: page.rotation)
        return convert(pdfView.convert(user, from: page), from: pdfView)
    }

    private func screenPath(_ points: [InkPoint], smooth: Bool = true) -> CGPath? {
        guard let page = wetPage, wetMetrics.width > 0, points.count > 1 else { return nil }
        let screen = points.compactMap { place($0, on: page, metrics: wetMetrics) }
        guard screen.count > 1 else { return nil }

        let path = CGMutablePath()
        path.move(to: screen[0])
        if smooth {
            for index in 1..<(screen.count - 1) {
                let current = screen[index]
                let next = screen[index + 1]
                path.addQuadCurve(
                    to: CGPoint(x: (current.x + next.x) / 2, y: (current.y + next.y) / 2),
                    control: current
                )
            }
        } else {
            for point in screen.dropFirst() { path.addLine(to: point) }
        }
        path.addLine(to: screen[screen.count - 1])
        return path
    }

    /// A page-space rect on the gesture's page → a rect on screen.
    private func onScreen(_ rect: [Double]) -> CGRect? {
        guard rect.count == 4, let page = wetPage, wetMetrics.width > 0 else { return nil }
        guard
            let a = place(InkPoint(x: rect[0], y: rect[1]), on: page, metrics: wetMetrics),
            let b = place(InkPoint(x: rect[2], y: rect[3]), on: page, metrics: wetMetrics)
        else { return nil }
        return CGRect(x: min(a.x, b.x), y: min(a.y, b.y), width: abs(b.x - a.x), height: abs(b.y - a.y))
    }

    /// The selection's box on screen, found from its own page rather than the
    /// gesture's — it has to be drawable when no gesture is in progress.
    private func selectionOnScreen() -> CGRect? {
        guard
            let selection, selection.rect.count == 4,
            let pdfView, let document = pdfView.document,
            selection.page >= 1, selection.page <= document.pageCount,
            let page = document.page(at: selection.page - 1)
        else { return nil }

        let metrics = PageMetrics(displayedBy: page, in: pdfView)
        let user0 = metrics.userSpacePoint(InkPoint(x: selection.rect[0], y: selection.rect[1]), rotation: page.rotation)
        let user1 = metrics.userSpacePoint(InkPoint(x: selection.rect[2], y: selection.rect[3]), rotation: page.rotation)
        let a = convert(pdfView.convert(user0, from: page), from: pdfView)
        let b = convert(pdfView.convert(user1, from: page), from: pdfView)
        return CGRect(x: min(a.x, b.x), y: min(a.y, b.y), width: abs(b.x - a.x), height: abs(b.y - a.y))
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
