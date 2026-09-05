import Foundation

/// What the pointer does right now.
///
/// Mirrors `Tool` in `src/components/reader/InkSurface.tsx`.
enum ReaderTool: String, CaseIterable, Identifiable, Sendable {
    case pan, pen, highlighter, eraser, lasso, shape, note, textbox, tape, laser

    var id: String { rawValue }

    var label: String {
        switch self {
        case .pan: "Move the page"
        case .pen: "Pen"
        case .highlighter: "Highlighter"
        case .eraser: "Eraser"
        case .lasso: "Select"
        case .note: "Sticky note"
        case .textbox: "Text"
        case .tape: "Tape"
        case .shape: "Shapes"
        case .laser: "Pointer"
        }
    }

    var symbol: String {
        switch self {
        case .pan: "hand.draw"
        case .pen: "pencil.tip"
        case .highlighter: "highlighter"
        case .eraser: "eraser"
        case .lasso: "lasso"
        case .note: "note.text"
        case .textbox: "textformat"
        case .tape: "rectangle.fill"
        case .shape: "square.on.circle"
        case .laser: "dot.radiowaves.left.and.right"
        }
    }

    /// Whether this tool takes the touch away from the page.
    ///
    /// Only `pan` leaves scrolling alone; every other tool has to own the
    /// gesture, or a stroke would scroll the document instead of drawing.
    var drawsOnPage: Bool { self != .pan }

    /// Whether this tool is placed by dragging out a rectangle.
    ///
    /// Placing one is a single act rather than a mode to stay in, so the tool
    /// returns to `pan` afterwards — the web does the same, and for the same
    /// reason: nobody wants a second sticky note from the next tap.
    var placesAWidget: Bool { self == .note || self == .textbox || self == .tape }

    /// The kind a widget tool creates.
    var widgetKind: ObjectKind? {
        switch self {
        case .note: .note
        case .textbox: .textbox
        case .tape: .tape
        default: nil
        }
    }
}

/// How the lasso encloses: a drawn loop, or a dragged rectangle.
enum LassoMode: String, CaseIterable, Sendable {
    case free, rect

    var label: String {
        switch self {
        case .free: "Draw round"
        case .rect: "Drag a box"
        }
    }
}

/// Erase whole marks, or only where the eraser passes.
enum EraserMode: String, CaseIterable, Sendable {
    case stroke, area

    var label: String {
        switch self {
        case .stroke: "Whole stroke"
        case .area: "Area"
        }
    }
}

/// How the current tool is set up.
///
/// Deliberately **not persisted**, exactly as on the web: a student picks a pen
/// for a task, not for life, and restoring last week's eraser radius is a
/// surprise rather than a convenience.
struct ToolSettings: Equatable, Sendable {
    var tool: ReaderTool = .pan
    /// Literal sRGB — a red pen is red in both themes.
    var color: String = ReaderPalette.ink[0]
    /// Page-space units, so a stroke is the same weight on every document and
    /// at every zoom.
    var width: Double = 0.003
    var pen: PenTool = .ball
    /// 0..1.
    var stabilization: Double = 0.35
    var eraserRadius: Double = 0.012
    var eraserMode: EraserMode = .stroke
    /// When true the eraser leaves handwriting alone — for clearing a page of
    /// highlighting without losing the notes written over it.
    var eraserHighlighterOnly: Bool = false
    var lasso: LassoMode = .free
    /// Straighten a drawn shape into the primitive it resembles.
    ///
    /// Off for the pen by default: a diagram, a scrawled arrow or a
    /// deliberately rough circle round a word should stay as it was drawn.
    var snapShapes: Bool = false
    /// Where the straight edge is being held, if it is out at all. Never
    /// stored — it is a thing you put on the book, not a mark you made.
    var ruler: RulerLine?
    /// Which kinds the lasso will pick up. All of them, until a student says
    /// otherwise — the commonest use is "everything I just drew here".
    var lassoKinds: Set<ObjectKind> = [.ink, .highlighter, .note, .textbox, .tape]
    /// Widget colours are theme tokens, not literal ink; `amber` is the web's
    /// default sticky note.
    var tone: NoteTone = .amber

    /// The highlighter is drawn four times as wide and translucent, and the
    /// stored object records that rather than the pen's own width.
    var strokeWidth: Double { tool == .highlighter ? width * 4 : width }
    var strokeAlpha: Double? { tool == .highlighter ? 0.35 : nil }

    /// The pointer is always the web's red, whatever colour the pen is set to —
    /// it is for showing someone something, not for marking the page.
    var strokeColor: String { tool == .laser ? "#e5484d" : color }

    /// Whether this gesture should be straightened when it is let go.
    var straightens: Bool { tool == .shape || (tool == .pen && snapShapes) }

    /// The web's default type size for a new textbox, in page-space units — so
    /// it stays the same size relative to the page's own text at any zoom.
    static let textboxSize = 0.022
}

/// The twelve ink colours the web offers, plus whatever a student picks.
enum ReaderPalette {
    static let ink = [
        "#241d16", "#6b6053", "#b0512b", "#c2691c", "#a5732a", "#4f8f3a",
        "#2f7d6b", "#3b6bb0", "#7a4fb0", "#b03a76", "#b23a3a", "#5b6570",
    ]

    /// A plain name for each entry in `ink`, same order — these are colour
    /// swatches with no other label, so VoiceOver needs a word for each one
    /// rather than reading a hex string (WCAG 4.1.2).
    static let inkNames = [
        "Charcoal", "Taupe", "Rust", "Amber", "Ochre", "Green",
        "Teal", "Blue", "Purple", "Magenta", "Red", "Slate",
    ]

    static func inkName(_ hex: String) -> String {
        ink.firstIndex(of: hex).map { inkNames[$0] } ?? hex
    }
}

/// Reader preferences that belong to the device, not the account.
///
/// The web keeps these in `localStorage` rather than the synced record, and the
/// split is deliberate: where a student parks the toolbar is about the hand
/// holding the phone, not about the student. Syncing it would move it under
/// someone's thumb on a device they were not using.
@MainActor
enum ReaderPreferences {
    private static let defaults = UserDefaults.standard

    enum Edge: String { case leading, trailing }

    /// Which side the toolbar sits on. `synapse.reader.toolbarEdge` on the web.
    static var toolbarEdge: Edge {
        get { Edge(rawValue: defaults.string(forKey: "synapse.reader.toolbarEdge") ?? "") ?? .trailing }
        set { defaults.set(newValue.rawValue, forKey: "synapse.reader.toolbarEdge") }
    }

    /// How far down, as a fraction of the reader's height. Clamped to the same
    /// range the web uses so the toolbar cannot be parked off-screen.
    static var toolbarOffset: Double {
        get {
            let stored = defaults.object(forKey: "synapse.reader.toolbarOffset") as? Double
            return min(max(stored ?? 0.34, 0.02), 0.75)
        }
        set { defaults.set(min(max(newValue, 0.02), 0.75), forKey: "synapse.reader.toolbarOffset") }
    }

    /// Whether the toolbar is folded down to just the active tool.
    static var toolbarCollapsed: Bool {
        get { defaults.bool(forKey: "synapse.reader.toolbarCollapsed") }
        set { defaults.set(newValue, forKey: "synapse.reader.toolbarCollapsed") }
    }
}
