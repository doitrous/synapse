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
    let api: NishanyAPI
    let sync: SyncEngine

    @State private var board = BoardState.empty
    @State private var isLoading = true
    /// Set when the board could not be a genuine "nothing drawn yet" — it
    /// lives on the server alone, so failing quietly here would show an
    /// empty board in place of one the student has actually built, and the
    /// next edit would save that emptiness over their real one.
    @State private var loadError: String?

    @State private var offset = CGSize.zero
    @State private var scale: CGFloat = 1
    @State private var gestureOffset = CGSize.zero
    @State private var gestureScale: CGFloat = 1

    @State private var selected: String?
    @State private var linkingFrom: String?
    @State private var editing: BoardNote?
    @State private var viewport = CGSize.zero

    var body: some View {
        GeometryReader { geometry in
            StateSurface(isLoading: isLoading, error: loadError, retry: { Task { await load() } }) {
                canvas(geometry.size)
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
            }
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
        .gesture(pan(size))
        .simultaneousGesture(pinch(size))
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
                let moved = CGPoint(
                    x: note.x + value.translation.width / scale,
                    y: note.y + value.translation.height / scale
                )
                let clamped = BoardGeometry.clampToBoard(moved, size: BoardGeometry.noteSize)
                board.notes[index].x = clamped.x
                board.notes[index].y = clamped.y
            }
            .onEnded { _ in Task { await save() } }
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
        HStack(spacing: 10) {
            if let selected, let note = board.notes.first(where: { $0.id == selected }) {
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
            } else {
                Text(board.notes.isEmpty
                     ? "Tap + to add a note. Drag to pan, pinch to zoom."
                     : "Tap a note to select it.")
                    .font(Theme.ui(12))
                    .foregroundStyle(Theme.ink3)
                Spacer()
                Text("\(Int(scale * 100))%")
                    .font(Theme.numeric(11))
                    .foregroundStyle(Theme.ink3)
            }
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 10)
        .frame(maxWidth: .infinity)
        .floatingChrome(in: Rectangle())
    }

    // MARK: - Editing

    private func addNote() {
        let point = BoardGeometry.placement(
            offset: offset, scale: scale, viewport: viewport, existing: board.notes.count
        )
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
        board.notes[index] = note
        await save()
    }

    private func deleteNote(_ note: BoardNote) async {
        board.notes.removeAll { $0.id == note.id }
        // A link to a note that no longer exists would draw from nowhere.
        board.links.removeAll { $0.from == note.id || $0.to == note.id }
        selected = nil
        await save()
    }

    private func addLink(from: String, to: String) async {
        guard !board.links.contains(where: { $0.from == from && $0.to == to }) else { return }
        board.links.append(BoardLink(id: UUID().uuidString, from: from, to: to))
        await save()
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
        if let remote = try? await api.userState(BoardState.self, key: BoardState.storageKey) {
            board = remote.value ?? .empty
            loadError = nil
        } else {
            loadError = Connectivity.shared.isOnline
                ? "Your board could not be opened on this device."
                : "You're offline, so your board can't be shown right now."
        }
    }

    private func save() async {
        await sync.write(key: BoardState.storageKey, value: board)
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
