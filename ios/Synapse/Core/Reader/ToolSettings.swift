import Foundation

/// What the pointer does right now.
///
/// Mirrors `Tool` in `src/components/reader/InkSurface.tsx`. The web has ten;
/// this phase covers the four a student needs to mark up a page — the widget
/// and selection tools follow.
enum ReaderTool: String, CaseIterable, Identifiable, Sendable {
    case pan, pen, highlighter, eraser

    var id: String { rawValue }

    var label: String {
        switch self {
        case .pan: "Move the page"
        case .pen: "Pen"
        case .highlighter: "Highlighter"
        case .eraser: "Eraser"
        }
    }

    var symbol: String {
        switch self {
        case .pan: "hand.draw"
        case .pen: "pencil.tip"
        case .highlighter: "highlighter"
        case .eraser: "eraser"
        }
    }

    /// Whether this tool takes the touch away from the page.
    ///
    /// Only `pan` leaves scrolling alone; every other tool has to own the
    /// gesture, or a stroke would scroll the document instead of drawing.
    var drawsOnPage: Bool { self != .pan }
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

    /// The highlighter is drawn four times as wide and translucent, and the
    /// stored object records that rather than the pen's own width.
    var strokeWidth: Double { tool == .highlighter ? width * 4 : width }
    var strokeAlpha: Double? { tool == .highlighter ? 0.35 : nil }
}

/// The twelve ink colours the web offers, plus whatever a student picks.
enum ReaderPalette {
    static let ink = [
        "#241d16", "#6b6053", "#b0512b", "#c2691c", "#a5732a", "#4f8f3a",
        "#2f7d6b", "#3b6bb0", "#7a4fb0", "#b03a76", "#b23a3a", "#5b6570",
    ]
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
