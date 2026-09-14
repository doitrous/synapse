import SwiftUI

/// An infinite-feeling board of notes and connections.
///
/// The web version is built for a mouse: hover, right-click, a minimap, marquee
/// selection. None of that exists on a phone, so the interactions are rebuilt
/// rather than translated — drag to pan, pinch to zoom, tap a note to select,
/// drag it to move, and a link mode that is a deliberate two-tap action instead
/// of a drag from an edge handle nobody could hit at this size.
struct WhiteboardView: View {
    @Environment(\.strings) private var strings
    let api: SynapseAPI
    let sync: SyncEngine

    /// The active board's state — what the editor reads and writes. Kept as a
    /// flat `BoardState` so the note/link/frame editing code is unchanged; the
    /// surrounding `collection` carries the other boards and every element type
    /// iOS does not yet render, so a save never drops them.
    @State private var board = BoardState.empty
    @State private var collection = WhiteboardCollection(
        activeBoardId: "default", boards: [], sharedBoards: [], migratedFromSingleBoard: false
    )
    @State private var activeBoardId = "default"
    @State private var isLoading = true

    @State private var offset = CGSize.zero
    @State private var scale: CGFloat = 1
    @State private var gestureOffset = CGSize.zero
    @State private var gestureScale: CGFloat = 1

    @State private var selected: String?
    @State private var linkingFrom: String?
    @State private var editing: BoardNote?
    @State private var viewport = CGSize.zero

    /// Which tool a one-finger drag drives. Pinch-to-zoom stays live in every
    /// mode; panning is the select tool's drag, so drawing and panning never
    /// fight over the same gesture.
    @State private var tool: WhiteboardTool = .select
    @State private var inkColour = BoardInk.colours[0]
    @State private var inkWidth = BoardInk.widths[1]
    /// The stroke being drawn right now, in board coordinates, shown live until
    /// the finger lifts and it becomes one `InkStroke`.
    @State private var currentStroke: [CGPoint] = []
    @State private var strokeInProgress = false

    /// Session-only undo/redo, snapshots of the whole board — the same simple
    /// stack the web keeps, and cleared when the app closes.
    @State private var history: [BoardState] = []
    @State private var future: [BoardState] = []
    /// So a continuous drag (moving a note, erasing) records one undo step, not
    /// one per gesture frame.
    @State private var didRememberGesture = false

    var body: some View {
        GeometryReader { geometry in
            ZStack {
                if isLoading {
                    ProgressView().tint(Theme.primary)
                } else {
                    canvas(geometry.size)
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Theme.inset)
            .onAppear { viewport = geometry.size }
            .onChange(of: geometry.size) { _, size in viewport = size }
        }
        .navigationTitle(strings("Whiteboard"))
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItemGroup(placement: .topBarTrailing) {
                Button { addNote() } label: { Image(systemName: "plus.square") }
                    .tint(Theme.primary)
                Button { fitToContent() } label: { Image(systemName: "arrow.up.left.and.arrow.down.right") }
                    .tint(Theme.primary)
                    .disabled(board.notes.isEmpty)
            }
        }
        .safeAreaInset(edge: .bottom) { toolbar }
        .sheet(item: $editing) { note in
            NoteEditorSheet(note: note) { updated in
                Task { await update(updated) }
            } delete: {
                Task { await deleteNote(note) }
            }
            .localisedSheet()
        }
        .task { await load() }
    }

    // MARK: - Canvas

    private func canvas(_ size: CGSize) -> some View {
        let liveScale = BoardGeometry.clampScale(scale * gestureScale)
        let liveOffset = CGSize(
            width: offset.width + gestureOffset.width,
            height: offset.height + gestureOffset.height
        )

        return ZStack(alignment: .topLeading) {
            // The board itself, so its edges are visible — a bounded surface
            // that looks bounded is what stops a student panning into nothing.
            Rectangle()
                .fill(Theme.paper)
                .frame(width: BoardGeometry.size.width, height: BoardGeometry.size.height)

            links

            // Ink sits under the notes by default, over them when the student
            // flips the layer — the same two render sites the web toggles.
            if board.inkAbove != true { inkLayer }

            ForEach(board.notes) { note in
                NoteCard(
                    note: note,
                    isSelected: selected == note.id,
                    isLinkSource: linkingFrom == note.id
                )
                .position(
                    x: note.x + BoardGeometry.noteSize.width / 2,
                    y: note.y + BoardGeometry.noteSize.height / 2
                )
                .onTapGesture { tap(note) }
                .gesture(dragNote(note))
                // In pen/eraser mode a note must not steal the drawing gesture:
                // drawing over a note draws, it does not pick the note up.
                .allowsHitTesting(tool == .select)
            }

            if board.inkAbove == true { inkLayer }
        }
        .frame(
            width: BoardGeometry.size.width, height: BoardGeometry.size.height,
            alignment: .topLeading
        )
        .scaleEffect(liveScale, anchor: .topLeading)
        .offset(liveOffset)
        .frame(width: size.width, height: size.height, alignment: .topLeading)
        .clipped()
        .contentShape(Rectangle())
        .gesture(canvasGesture(size))
        .simultaneousGesture(pinch(size))
    }

    /// Every freehand stroke, plus the one being drawn right now.
    private var inkLayer: some View {
        Canvas { context, _ in
            for stroke in board.ink ?? [] {
                context.stroke(
                    Self.inkPath(stroke.points),
                    with: .color(Self.inkColour(stroke.color)),
                    style: StrokeStyle(lineWidth: stroke.width, lineCap: .round, lineJoin: .round)
                )
            }
            if strokeInProgress, currentStroke.count >= 2 {
                context.stroke(
                    Self.inkPath(currentStroke.flatMap { [$0.x, $0.y] }),
                    with: .color(Self.inkColour(inkColour)),
                    style: StrokeStyle(lineWidth: inkWidth, lineCap: .round, lineJoin: .round)
                )
            }
        }
        .frame(width: BoardGeometry.size.width, height: BoardGeometry.size.height)
        .allowsHitTesting(false)
    }

    /// The one-finger gesture depends on the tool: pan, draw, or erase.
    private func canvasGesture(_ size: CGSize) -> AnyGesture<Void> {
        switch tool {
        case .select: AnyGesture(pan(size).map { _ in () })
        case .pen: AnyGesture(drawGesture().map { _ in () })
        case .eraser: AnyGesture(eraseGesture().map { _ in () })
        }
    }

    private var links: some View {
        Canvas { context, _ in
            let byId = Dictionary(board.notes.map { ($0.id, $0) }, uniquingKeysWith: { first, _ in first })

            for link in board.links {
                guard let from = byId[link.from], let to = byId[link.to] else { continue }
                let sides = BoardGeometry.sides(from: from, to: to)
                let start = BoardGeometry.anchor(from, right: sides.start)
                let end = BoardGeometry.anchor(to, right: sides.end)
                let defaults = BoardGeometry.controls(from: start, to: end)

                var path = Path()
                path.move(to: start)
                path.addCurve(
                    to: end,
                    control1: link.c1.map { CGPoint(x: $0.x, y: $0.y) } ?? defaults.0,
                    control2: link.c2.map { CGPoint(x: $0.x, y: $0.y) } ?? defaults.1
                )
                context.stroke(path, with: .color(Theme.primaryLine), lineWidth: 1.5)
            }
        }
        .frame(width: BoardGeometry.size.width, height: BoardGeometry.size.height)
        .allowsHitTesting(false)
    }

    // MARK: - Gestures

    private func pan(_ size: CGSize) -> some Gesture {
        DragGesture()
            .onChanged { value in gestureOffset = value.translation }
            .onEnded { value in
                offset = BoardGeometry.clampOffset(
                    CGSize(
                        width: offset.width + value.translation.width,
                        height: offset.height + value.translation.height
                    ),
                    scale: scale, viewport: size
                )
                gestureOffset = .zero
            }
    }

    private func pinch(_ size: CGSize) -> some Gesture {
        MagnifyGesture()
            .onChanged { value in gestureScale = value.magnification }
            .onEnded { value in
                scale = BoardGeometry.clampScale(scale * value.magnification)
                gestureScale = 1
                offset = BoardGeometry.clampOffset(offset, scale: scale, viewport: size)
            }
    }

    /// Dragging a note moves the note, not the board — so it has to undo the
    /// current zoom, or a note would travel further than the finger at any
    /// scale but 1.
    private func dragNote(_ note: BoardNote) -> some Gesture {
        DragGesture()
            .onChanged { value in
                guard let index = board.notes.firstIndex(where: { $0.id == note.id }) else { return }
                if !didRememberGesture { remember(); didRememberGesture = true }
                let moved = CGPoint(
                    x: note.x + value.translation.width / scale,
                    y: note.y + value.translation.height / scale
                )
                let clamped = BoardGeometry.clampToBoard(moved, size: BoardGeometry.noteSize)
                board.notes[index].x = clamped.x
                board.notes[index].y = clamped.y
            }
            .onEnded { _ in didRememberGesture = false; Task { await save() } }
    }

    /// Pen: collect board-space points, thinned like the web (a point closer
    /// than 1.5 units adds nothing the hand can see), commit one stroke on lift.
    private func drawGesture() -> some Gesture {
        DragGesture(minimumDistance: 0)
            .onChanged { value in
                let s = BoardGeometry.clampScale(scale)
                let p = BoardGeometry.toBoard(value.location, offset: offset, scale: s)
                strokeInProgress = true
                if let last = currentStroke.last {
                    if hypot(p.x - last.x, p.y - last.y) >= 1.5 { currentStroke.append(p) }
                } else {
                    currentStroke = [p]
                }
            }
            .onEnded { _ in commitStroke() }
    }

    /// Eraser: a drag over any stroke's fattened path removes that whole stroke.
    private func eraseGesture() -> some Gesture {
        DragGesture(minimumDistance: 0)
            .onChanged { value in
                let s = BoardGeometry.clampScale(scale)
                let p = BoardGeometry.toBoard(value.location, offset: offset, scale: s)
                let hits = (board.ink ?? []).filter { BoardGeometry.strokeHit(p, stroke: $0) }
                guard !hits.isEmpty else { return }
                if !didRememberGesture { remember(); didRememberGesture = true }
                let ids = Set(hits.map(\.id))
                board.ink?.removeAll { ids.contains($0.id) }
            }
            .onEnded { _ in
                if didRememberGesture { didRememberGesture = false; Task { await save() } }
            }
    }

    private func commitStroke() {
        defer { currentStroke = []; strokeInProgress = false }
        // A tap is not a line: two points is the least that draws anything.
        guard currentStroke.count >= 2 else { return }
        remember()
        let stroke = InkStroke(
            id: UUID().uuidString,
            points: currentStroke.flatMap { [$0.x, $0.y] },
            color: inkColour,
            width: inkWidth
        )
        board.ink = (board.ink ?? []) + [stroke]
        Task { await save() }
    }

    private func tap(_ note: BoardNote) {
        if let source = linkingFrom {
            // Second tap completes a link. Linking a note to itself would draw
            // a curve from an edge back to the same edge, which is a smudge.
            if source != note.id { Task { await addLink(from: source, to: note.id) } }
            linkingFrom = nil
            return
        }
        if selected == note.id {
            editing = note
        } else {
            selected = note.id
        }
    }

    // MARK: - Toolbar

    private var toolbar: some View {
        VStack(spacing: 8) {
            HStack(spacing: 10) {
                toolPicker
                Spacer()
                Button { undo() } label: { Image(systemName: "arrow.uturn.backward") }
                    .tint(Theme.primary)
                    .disabled(history.isEmpty)
                Button { redo() } label: { Image(systemName: "arrow.uturn.forward") }
                    .tint(Theme.primary)
                    .disabled(future.isEmpty)
            }

            contextRow
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 10)
        .frame(maxWidth: .infinity)
        .floatingChrome(in: Rectangle())
    }

    private var toolPicker: some View {
        HStack(spacing: 4) {
            ForEach(WhiteboardTool.allCases, id: \.self) { option in
                Button {
                    tool = option
                    if option != .select { selected = nil; linkingFrom = nil }
                } label: {
                    Image(systemName: option.symbol)
                        .font(.system(size: 15, weight: .medium))
                        .frame(width: 38, height: 30)
                        .background(tool == option ? Theme.primaryTint : Color.clear)
                        .foregroundStyle(tool == option ? Theme.primary : Theme.ink2)
                        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.sm))
                }
                .buttonStyle(.plain)
                .accessibilityLabel(strings(option.rawValue.capitalized))
            }
        }
        .padding(3)
        .background(Theme.inset)
        .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.md))
    }

    @ViewBuilder private var contextRow: some View {
        if tool == .pen {
            HStack(spacing: 12) {
                ForEach(BoardInk.colours, id: \.self) { colour in
                    Button { inkColour = colour } label: {
                        Circle()
                            .fill(Self.inkColour(colour))
                            .frame(width: 22, height: 22)
                            .overlay(Circle().stroke(Theme.primary, lineWidth: inkColour == colour ? 2.5 : 0))
                    }
                    .buttonStyle(.plain)
                }
                Divider().frame(height: 22)
                ForEach(BoardInk.widths, id: \.self) { width in
                    Button { inkWidth = width } label: {
                        Circle()
                            .fill(inkWidth == width ? Theme.primary : Theme.ink3)
                            .frame(width: width + 6, height: width + 6)
                            .frame(width: 26, height: 26)
                    }
                    .buttonStyle(.plain)
                }
                Spacer()
                Button { toggleInkAbove() } label: {
                    Image(systemName: board.inkAbove == true ? "square.stack.3d.up.fill" : "square.stack.3d.down.right.fill")
                }
                .tint(Theme.primary)
                .accessibilityLabel(strings(board.inkAbove == true ? "Ink above notes" : "Ink below notes"))
            }
        } else if let selected, let note = board.notes.first(where: { $0.id == selected }) {
            HStack(spacing: 10) {
                Button {
                    linkingFrom = linkingFrom == nil ? note.id : nil
                } label: {
                    Label(
                        linkingFrom == nil ? "Connect" : "Pick a note",
                        systemImage: "arrow.triangle.branch"
                    )
                    .font(Theme.ui(13, weight: 500))
                }
                .tint(linkingFrom == nil ? Theme.primary : Theme.warning)

                Button { editing = note } label: {
                    Label(strings("Edit"), systemImage: "pencil").font(Theme.ui(13, weight: 500))
                }
                .tint(Theme.primary)

                Spacer()
                Text("\(board.notes.count) note\(board.notes.count == 1 ? "" : "s")")
                    .font(Theme.numeric(11))
                    .foregroundStyle(Theme.ink3)
            }
        } else {
            HStack(spacing: 10) {
                Text(hint)
                    .font(Theme.ui(12))
                    .foregroundStyle(Theme.ink3)
                Spacer()
                Text("\(Int(scale * 100))%")
                    .font(Theme.numeric(11))
                    .foregroundStyle(Theme.ink3)
            }
        }
    }

    private var hint: String {
        switch tool {
        case .eraser: "Drag across a line to rub it out."
        case .pen: "Draw with a finger or pencil."
        case .select:
            board.notes.isEmpty
                ? "Tap + to add a note. Drag to pan, pinch to zoom."
                : "Tap a note to select it."
        }
    }

    // MARK: - Editing

    private func addNote() {
        let point = BoardGeometry.placement(
            offset: offset, scale: scale, viewport: viewport, existing: board.notes.count
        )
        remember()
        let note = BoardNote(
            id: UUID().uuidString, x: point.x, y: point.y, text: "", tone: "paper"
        )
        board.notes.append(note)
        selected = note.id
        editing = note
        Task { await save() }
    }

    private func update(_ note: BoardNote) async {
        guard let index = board.notes.firstIndex(where: { $0.id == note.id }) else { return }
        remember()
        board.notes[index] = note
        await save()
    }

    private func deleteNote(_ note: BoardNote) async {
        remember()
        board.notes.removeAll { $0.id == note.id }
        // A link to a note that no longer exists would draw from nowhere.
        board.links.removeAll { $0.from == note.id || $0.to == note.id }
        selected = nil
        await save()
    }

    private func addLink(from: String, to: String) async {
        guard !board.links.contains(where: { $0.from == from && $0.to == to }) else { return }
        remember()
        board.links.append(BoardLink(id: UUID().uuidString, from: from, to: to))
        await save()
    }

    // MARK: - Undo / redo

    /// Snapshot before a change, so it can be undone. Caps at 50 like the web,
    /// and a fresh change abandons any redo branch.
    private func remember() {
        history.append(board)
        if history.count > 50 { history.removeFirst() }
        future.removeAll()
    }

    private func undo() {
        guard let previous = history.popLast() else { return }
        future.append(board)
        board = previous
        selected = nil
        linkingFrom = nil
        Task { await save() }
    }

    private func redo() {
        guard let next = future.popLast() else { return }
        history.append(board)
        board = next
        selected = nil
        linkingFrom = nil
        Task { await save() }
    }

    /// Flip freehand ink above or below the notes.
    private func toggleInkAbove() {
        remember()
        board.inkAbove = !(board.inkAbove ?? false)
        Task { await save() }
    }

    // MARK: - Ink rendering

    /// A freehand line as a smooth path — quadratic through midpoints, the same
    /// curve the web draws (`inkPath`), so a stroke looks identical on both.
    static func inkPath(_ points: [Double]) -> Path {
        var path = Path()
        guard points.count >= 4 else {
            if points.count == 2 {
                path.move(to: CGPoint(x: points[0], y: points[1]))
                path.addLine(to: CGPoint(x: points[0] + 0.01, y: points[1] + 0.01))
            }
            return path
        }
        path.move(to: CGPoint(x: points[0], y: points[1]))
        var i = 2
        while i + 3 < points.count {
            let mid = CGPoint(x: (points[i] + points[i + 2]) / 2, y: (points[i + 1] + points[i + 3]) / 2)
            path.addQuadCurve(to: mid, control: CGPoint(x: points[i], y: points[i + 1]))
            i += 2
        }
        path.addLine(to: CGPoint(x: points[points.count - 2], y: points[points.count - 1]))
        return path
    }

    static func inkColour(_ id: String) -> Color {
        switch id {
        case "primary": Theme.primary
        case "danger": Theme.danger
        case "success": Theme.success
        case "warning": Theme.warning
        default: Theme.ink
        }
    }

    /// Bring everything into view.
    private func fitToContent() {
        guard !board.notes.isEmpty, viewport != .zero else { return }

        let minX = board.notes.map(\.x).min() ?? 0
        let minY = board.notes.map(\.y).min() ?? 0
        let maxX = (board.notes.map(\.x).max() ?? 0) + BoardGeometry.noteSize.width
        let maxY = (board.notes.map(\.y).max() ?? 0) + BoardGeometry.noteSize.height

        let contentWidth = max(1, maxX - minX)
        let contentHeight = max(1, maxY - minY)
        let fit = min(viewport.width / (contentWidth + 80), viewport.height / (contentHeight + 80))

        scale = BoardGeometry.clampScale(fit)
        offset = BoardGeometry.centred(
            on: CGPoint(x: (minX + maxX) / 2, y: (minY + maxY) / 2),
            scale: scale, viewport: viewport
        )
    }

    // MARK: - Storage

    private func load() async {
        isLoading = true
        defer { isLoading = false }
        let now = Date()

        // Prefer the live multi-board document.
        if let remote = try? await api.userState(WhiteboardCollection.self, key: whiteboardCollectionKey),
           let stored = remote.value, !stored.boards.isEmpty {
            collection = stored
            activeBoardId = stored.activeBoardId
            board = Whiteboards.activeBoard(stored, now: now).state
            return
        }

        // No collection yet: fold a retired single-board drawing into a new
        // collection if one exists, otherwise start empty. Either way the app
        // now reads and writes boards.v1 like the website.
        var next = Whiteboards.emptyCollection(now: now)
        if let legacy = try? await api.userState(BoardState.self, key: BoardState.legacyStorageKey),
           let legacyState = legacy.value {
            next = Whiteboards.migrateSingleBoard(legacyState, into: next, owner: .local, now: now)
        }
        collection = next
        activeBoardId = next.activeBoardId
        board = Whiteboards.activeBoard(next, now: now).state
    }

    private func save() async {
        // Write the edited state back into the active board, preserving every
        // other board and every element type this editor does not touch.
        collection = Whiteboards.updateState(collection, id: activeBoardId, board, now: Date())
        await sync.write(key: whiteboardCollectionKey, value: collection)
    }
}

private struct NoteCard: View {
    @Environment(\.strings) private var strings
    let note: BoardNote
    let isSelected: Bool
    let isLinkSource: Bool

    var body: some View {
        Text(note.text.isEmpty ? "Empty note" : note.text)
            .font(Theme.ui(13))
            .foregroundStyle(note.text.isEmpty ? Theme.ink3 : Theme.ink)
            .lineLimit(4)
            .padding(10)
            .frame(
                width: BoardGeometry.noteSize.width,
                height: BoardGeometry.noteSize.height,
                alignment: .topLeading
            )
            .background(background)
            .overlay(
                RoundedRectangle(cornerRadius: Theme.Radius.md)
                    .stroke(border, lineWidth: isSelected || isLinkSource ? 2 : 1)
            )
            .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.md))
    }

    /// Tints rather than fills, so a note reads as paper with a wash over it
    /// and the ink on top stays legible in either theme.
    private var background: Color {
        switch note.tone {
        case "teal": Theme.primaryTint
        case "amber": Theme.warningTint
        case "rose": Theme.dangerTint
        case "sage": Theme.successTint
        case "slate": Theme.surface2
        case "sand": Theme.inset
        case "clay": Theme.primaryTint.opacity(0.55)
        default: Theme.surface
        }
    }

    private var border: Color {
        if isLinkSource { return Theme.warning }
        if isSelected { return Theme.primary }
        return Theme.line
    }
}

private struct NoteEditorSheet: View {
    @Environment(\.strings) private var strings
    @State var note: BoardNote
    let save: (BoardNote) -> Void
    let delete: () -> Void

    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            Form {
                Section(strings("Note")) {
                    TextField(strings("What is it?"), text: $note.text, axis: .vertical)
                        .lineLimit(3...8)
                        .font(Theme.ui(15))
                }

                Section(strings("Colour")) {
                    LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 4), spacing: 10) {
                        ForEach(BoardTone.order, id: \.self) { tone in
                            Button { note.tone = tone } label: {
                                RoundedRectangle(cornerRadius: Theme.Radius.md)
                                    .fill(swatch(tone))
                                    .frame(height: 36)
                                    .overlay(
                                        RoundedRectangle(cornerRadius: Theme.Radius.md)
                                            .stroke(note.tone == tone ? Theme.primary : Theme.line,
                                                    lineWidth: note.tone == tone ? 2 : 1)
                                    )
                            }
                            .buttonStyle(.plain)
                            .accessibilityLabel(BoardTone.label[tone] ?? tone)
                        }
                    }
                    .padding(.vertical, 4)
                }

                Section {
                    Button(strings("Delete note"), role: .destructive) { delete(); dismiss() }
                }
            }
            .scrollContentBackground(.hidden)
            .background(Theme.paper)
            .navigationTitle(strings("Note"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button(strings("Done")) { save(note); dismiss() }
                }
            }
        }
    }

    private func swatch(_ tone: String) -> Color {
        switch tone {
        case "teal": Theme.primaryTint
        case "amber": Theme.warningTint
        case "rose": Theme.dangerTint
        case "sage": Theme.successTint
        case "slate": Theme.surface2
        case "sand": Theme.inset
        case "clay": Theme.primaryTint.opacity(0.55)
        default: Theme.surface
        }
    }
}
