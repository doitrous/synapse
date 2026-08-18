import PDFKit
import SwiftUI

/// Reading a source document.
///
/// PDFKit rather than a web view: it pages, searches, remembers where you were,
/// and renders a 400-page textbook without loading all of it — none of which a
/// `WKWebView` pointed at a file gives you.
struct ResourceReaderView: View {
    let resource: LibraryResource
    let files: ResourceFileStore
    let api: SynapseAPI
    let sync: SyncEngine

    @State private var pageLabel = ""
    @State private var searching = false
    @State private var query = ""
    @State private var annotations: AnnotationStore?
    /// The page the reader is on, which decides which shards are worth having.
    @State private var page = 1
    /// The marks handed to the PDF view.
    ///
    /// Held here rather than read straight off the store: the store's changes
    /// have to cross into a `UIViewRepresentable`, and relying on observation
    /// to carry them meant the overlay was built once with nothing and never
    /// asked again. Copying explicitly after each load is one line and cannot
    /// silently stop working.
    @State private var marks: [Int: [AnnotationObject]] = [:]
    @State private var settings = ToolSettings()
    /// What the lasso picked up, by id.
    @State private var selection: Set<String> = []
    /// Which drag is in progress.
    ///
    /// The undo stack folds changes sharing a tag, so a drag of forty touch
    /// moves is one step. Bumping this on release is what stops the *next* drag
    /// folding into the same one.
    @State private var gesture = 0
    /// The note or textbox being written in.
    @State private var editing: AnnotationObject?
    /// Whether there is anything to undo or redo.
    ///
    /// Copied out of the store for the same reason `marks` is: these are read
    /// while building a `UIViewRepresentable`'s surroundings, and relying on
    /// observation to carry them left the buttons showing the state from two
    /// changes ago. Refreshed wherever the marks are.
    @State private var history: (undo: Bool, redo: Bool) = (false, false)

    var body: some View {
        Group {
            switch files.state(for: resource.id) {
            case .ready(let url):
                reader(url)
            case .downloading(let fraction):
                downloading(fraction)
            case .failed(let message):
                EmptyStateView(symbol: "exclamationmark.triangle", title: "Could not open it", detail: message)
            case .notDownloaded:
                notDownloaded
            }
        }
        .background(Theme.paper)
        .navigationTitle(resource.title)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            if case .ready = files.state(for: resource.id) {
                ToolbarItem(placement: .topBarTrailing) {
                    Menu {
                        Button {
                            searching.toggle()
                        } label: {
                            Label("Search inside", systemImage: "magnifyingglass")
                        }
                        Button(role: .destructive) {
                            files.delete(resource.id)
                        } label: {
                            Label("Remove download", systemImage: "trash")
                        }
                    } label: {
                        Image(systemName: "ellipsis.circle")
                    }
                    .tint(Theme.accent)
                }
            }
        }
    }

    private func reader(_ url: URL) -> some View {
        // Reserved space rather than an overlay. PDFKit is a UIKit view, and a
        // UIKit view wins hit-testing against SwiftUI content drawn above it —
        // so a floating bar over the page looked right and swallowed every tap,
        // which is a far worse failure than losing a few points of page.
        page(url)
            .safeAreaInset(edge: .bottom, spacing: 0) {
                VStack(spacing: 8) {
                    if !pageLabel.isEmpty, !searching {
                        Text(pageLabel)
                            .font(Theme.numeric(11))
                            .foregroundStyle(Theme.ink2)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 5)
                            .background(.ultraThinMaterial, in: Capsule())
                    }
                    if !selection.isEmpty { selectionBar }
                }
                .padding(.bottom, 6)
            }
    }

    private func page(_ url: URL) -> some View {
        PDFReader(
            url: url,
            query: searching ? query : "",
            marks: marks,
            settings: settings,
            selection: selectionBox,
            onStroke: { points, onPage in
                Task { await commit(points, page: onPage) }
            },
            onErase: { path, onPage, radius in
                Task { await erase(along: path, page: onPage, radius: radius) }
            },
            onLasso: { polygon, onPage in
                selection = Set(Lasso.select(
                    annotations?.objects(onPage: onPage) ?? [],
                    polygon: polygon, kinds: settings.lassoKinds
                ))
            },
            onRect: { kind, rect, onPage in
                Task { await place(kind, rect: rect, page: onPage) }
            },
            onMove: { dx, dy in
                Task { await move(dx: dx, dy: dy) }
            },
            onMoveEnd: { gesture += 1 },
            onTapAway: { selection = [] },
            onRuler: { settings.ruler = $0 }
        ) { label, number in
            pageLabel = label
            page = number
        }
        .sheet(item: $editing) { object in
            WidgetTextSheet(object: object) { text in
                Task { await retype(object, text: text) }
            }
        }
        .overlay {
            ReaderToolbar(
                settings: $settings,
                canUndo: history.undo,
                canRedo: history.redo,
                undo: { Task { await annotations?.undo(); refreshMarks() } },
                redo: { Task { await annotations?.redo(); refreshMarks() } }
            )
        }
        .task {
            // The scope is the resource's id, so marks made on the website
            // land under exactly the same key.
            let store = AnnotationStore(api: api, sync: sync, kind: .resource, documentID: resource.id)
            annotations = store
            await store.loadManifest()
            await store.load(around: page)
            refreshMarks()
        }
        // Following the reader rather than loading everything: a 300-page book
        // is twenty shards, and nineteen of them are nowhere near the screen.
        .onChange(of: page) { _, current in
            Task {
                await annotations?.load(around: current)
                refreshMarks()
            }
        }
        .searchable(
            text: $query, isPresented: $searching,
            placement: .navigationBarDrawer(displayMode: .always),
            prompt: "Search this document"
        )
    }

    /// Turn a finished stroke into a stored mark.
    ///
    /// The width and alpha come from the tool rather than the object, because
    /// the highlighter is stored four times as wide and translucent — the same
    /// numbers the web writes, so a mark made here reads correctly there.
    private func commit(_ points: [InkPoint], page onPage: Int) async {
        guard let store = annotations, points.count > 1 else { return }

        let object = AnnotationObject.ink(
            kind: settings.tool == .highlighter ? .highlighter : .ink,
            tool: settings.tool == .highlighter ? "highlighter" : settings.pen.rawValue,
            color: settings.color,
            width: settings.strokeWidth,
            alpha: settings.strokeAlpha,
            points: points,
            page: onPage,
            z: store.nextZ(onPage: onPage),
            stamp: AnnotationObject.nextStamp(after: store.lastStamp)
        )
        await store.add(object)
        refreshMarks()
    }

    /// Rub out whatever the eraser swept across.
    ///
    /// The whole sweep at once, against the same geometry the web uses: testing
    /// only the sampled points would miss anything that fell between two of
    /// them, and a fast scrub reports points far apart.
    private func erase(along path: [InkPoint], page onPage: Int, radius: Double) async {
        guard let store = annotations, !path.isEmpty else { return }

        let candidates = settings.eraserHighlighterOnly
            ? store.objects(onPage: onPage).filter { $0.kind == .highlighter }
            : store.objects(onPage: onPage)

        let ids = Set(HitTest.strokesAlongPath(candidates, path: path, radius: radius))
        guard !ids.isEmpty else { return }

        await store.remove(candidates.filter { ids.contains($0.id) })
        refreshMarks()
    }

    private func refreshMarks() {
        guard let store = annotations else { return }
        marks = store.objectsByPage
        history = (store.canUndo, store.canRedo)
    }

    /// Place a sticky note, a text box or a strip of tape.
    ///
    /// Placing one is a single act rather than a mode to stay in, so the tool
    /// goes back to pan afterwards — the web does the same. A note and a
    /// textbox open for writing straight away, because an empty one is not
    /// what anybody wanted.
    private func place(_ kind: ObjectKind, rect: [Double], page onPage: Int) async {
        guard let store = annotations else { return }

        let object = AnnotationObject.widget(
            kind: kind, rect: rect,
            tone: kind == .textbox ? nil : settings.tone,
            text: kind == .tape ? nil : "",
            color: kind == .textbox ? settings.color : nil,
            size: kind == .textbox ? ToolSettings.textboxSize : nil,
            page: onPage, z: store.nextZ(onPage: onPage),
            stamp: AnnotationObject.nextStamp(after: store.lastStamp)
        )
        await store.add(object)
        refreshMarks()

        settings.tool = .pan
        if kind != .tape { editing = object }
    }

    /// Shift whatever is selected.
    ///
    /// Tagged with the gesture number so a drag folds into one undo step: the
    /// alternative is a student holding Undo down to put a note back.
    private func move(dx: Double, dy: Double) async {
        guard let store = annotations, !selection.isEmpty else { return }
        let stamp = AnnotationObject.nextStamp(after: store.lastStamp)
        await store.update(ids: Array(selection), coalesce: "move-\(gesture)") {
            $0.translated(dx: dx, dy: dy, stamp: stamp)
        }
        refreshMarks()
    }

    private func retype(_ object: AnnotationObject, text: String) async {
        guard let store = annotations else { return }
        await store.update(ids: [object.id]) { current in
            var edited = current
            edited.text = text
            return edited
        }
        refreshMarks()
    }

    private func removeSelection() async {
        guard let store = annotations else { return }
        let ids = selection
        let objects = store.objectsByPage.values.flatMap { $0 }.filter { ids.contains($0.id) }
        selection = []
        await store.remove(objects)
        refreshMarks()
    }

    /// What can be done to a selection, once there is one.
    private var selectionBar: some View {
        HStack(spacing: 14) {
            Text("^[\(selection.count) mark](inflect: true) selected")
                .font(Theme.ui(13))
                .foregroundStyle(Theme.ink2)

            if let only = soleWordedObject {
                Button {
                    editing = only
                } label: {
                    Label("Edit", systemImage: "character.cursor.ibeam")
                }
            }

            Button(role: .destructive) {
                Task { await removeSelection() }
            } label: {
                Label("Delete", systemImage: "trash")
            }

            Button("Done") { selection = [] }
        }
        .font(Theme.ui(13, weight: 600))
        .labelStyle(.titleOnly)
        .tint(Theme.accent)
        .padding(.horizontal, 16)
        .padding(.vertical, 10)
        .background(.regularMaterial, in: Capsule())
        .padding(.bottom, 16)
    }

    /// The one selected mark that holds words, if that is what is selected.
    private var soleWordedObject: AnnotationObject? {
        guard selection.count == 1, let id = selection.first else { return nil }
        let object = annotations?.objectsByPage.values.flatMap { $0 }.first { $0.id == id }
        return (object?.kind == .note || object?.kind == .textbox) ? object : nil
    }

    /// The selection's box and the page it is on, for the capture layer.
    private var selectionBox: (page: Int, rect: [Double])? {
        let objects = (annotations?.objectsByPage.values.flatMap { $0 } ?? [])
            .filter { selection.contains($0.id) }
        guard let page = objects.first?.page, let rect = Lasso.selectionBounds(objects) else { return nil }
        return (page, rect)
    }

    private func downloading(_ fraction: Double) -> some View {
        VStack(spacing: 14) {
            ProgressView(value: fraction)
                .tint(Theme.accent)
                .frame(maxWidth: 220)
            Text(fraction > 0 ? "\(Int(fraction * 100))%" : "Starting…")
                .font(Theme.numeric(13))
                .foregroundStyle(Theme.ink2)
            Button("Cancel") { files.cancel(resource.id) }
                .font(Theme.ui(14))
                .tint(Theme.accent)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    private var notDownloaded: some View {
        VStack(spacing: 12) {
            Image(systemName: "arrow.down.circle")
                .font(.system(size: 34))
                .foregroundStyle(Theme.accent)
            Text(resource.title)
                .font(Theme.display(20))
                .foregroundStyle(Theme.ink)
                .multilineTextAlignment(.center)
            Text("Download it once and it stays on this phone, with or without a signal.")
                .font(Theme.ui(14))
                .foregroundStyle(Theme.ink2)
                .multilineTextAlignment(.center)

            Button {
                files.download(resource.id)
            } label: {
                Text("Download")
                    .font(Theme.ui(16, weight: 600))
                    .frame(maxWidth: 220)
                    .frame(height: 46)
                    .background(Theme.accent)
                    .foregroundStyle(Theme.onAccent)
                    .clipShape(RoundedRectangle(cornerRadius: Theme.Radius.lg))
            }
            .padding(.top, 4)
        }
        .padding(32)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

/// PDFKit, wrapped.
struct PDFReader: UIViewRepresentable {
    let url: URL
    let query: String
    /// The student's marks, by 1-based page.
    ///
    /// A snapshot rather than the store itself: PDFKit asks for overlays from
    /// UIKit callbacks, and passing immutable values across that boundary is
    /// simpler than making the coordinator main-actor bound to read a model.
    var marks: [Int: [AnnotationObject]] = [:]
    var settings = ToolSettings()
    /// The selection's box, so a drag that starts on it is claimed before
    /// PDFKit scrolls the page instead.
    var selection: (page: Int, rect: [Double])?
    var onStroke: ((_ points: [InkPoint], _ page: Int) -> Void)?
    var onErase: ((_ path: [InkPoint], _ page: Int, _ radius: Double) -> Void)?
    var onLasso: ((_ polygon: [InkPoint], _ page: Int) -> Void)?
    var onRect: ((_ kind: ObjectKind, _ rect: [Double], _ page: Int) -> Void)?
    var onMove: ((_ dx: Double, _ dy: Double) -> Void)?
    var onMoveEnd: (() -> Void)?
    var onTapAway: (() -> Void)?
    var onRuler: ((RulerLine) -> Void)?
    let onPageChange: (String, Int) -> Void

    func makeUIView(context: Context) -> PDFView {
        let view = PDFView()
        view.autoScales = true
        // Continuous vertical scrolling is how people read on a phone; the
        // default two-up page curl is a desktop idiom.
        view.displayMode = .singlePageContinuous
        view.displayDirection = .vertical
        view.usePageViewController(false)
        view.backgroundColor = UIColor(Theme.paper)


        view.document = PDFDocument(url: url)

        // Restore where this document was last left open.
        if let page = context.coordinator.restoredPage(for: url, in: view.document) {
            view.go(to: page)
        }

        NotificationCenter.default.addObserver(
            context.coordinator,
            selector: #selector(Coordinator.pageChanged(_:)),
            name: .PDFViewPageChanged, object: view
        )
        context.coordinator.view = view
        context.coordinator.url = url
        context.coordinator.onPageChange = onPageChange

        // One overlay across the reader, added after the document so it sits
        // above the pages.
        let overlay = AnnotationOverlay(frame: view.bounds)
        overlay.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        overlay.pdfView = view
        overlay.marks = marks
        view.addSubview(overlay)
        context.coordinator.overlay = overlay

        // Above the marks, so a stroke is drawn over what is already there.
        let capture = InkCaptureView(frame: view.bounds)
        capture.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        capture.pdfView = view
        capture.settings = settings
        capture.selection = selection
        capture.onStroke = onStroke
        capture.onErase = onErase
        capture.onLasso = onLasso
        capture.onRect = onRect
        capture.onMove = onMove
        capture.onMoveEnd = onMoveEnd
        capture.onTapAway = onTapAway
        capture.onRuler = onRuler
        view.addSubview(capture)
        context.coordinator.capture = capture

        context.coordinator.report()
        return view
    }

    func updateUIView(_ view: PDFView, context: Context) {
        context.coordinator.onPageChange = onPageChange
        context.coordinator.overlay?.marks = marks
        context.coordinator.capture?.settings = settings
        context.coordinator.capture?.selection = selection
        context.coordinator.capture?.onStroke = onStroke
        context.coordinator.capture?.onErase = onErase
        context.coordinator.capture?.onLasso = onLasso
        context.coordinator.capture?.onRect = onRect
        context.coordinator.capture?.onMove = onMove
        context.coordinator.capture?.onMoveEnd = onMoveEnd
        context.coordinator.capture?.onTapAway = onTapAway
        context.coordinator.capture?.onRuler = onRuler
        // Scrolling and drawing are the same gesture, so only one of them can
        // have it: the page scrolls under `pan` and nothing else.
        view.enclosedScrollView?.isScrollEnabled = !settings.tool.drawsOnPage
        context.coordinator.search(query)
    }

    func makeCoordinator() -> Coordinator { Coordinator() }

    final class Coordinator: NSObject {
        weak var view: PDFView?
        var url: URL?
        var onPageChange: ((String, Int) -> Void)?
        /// The single overlay the marks are painted into.
        weak var overlay: AnnotationOverlay?
        weak var capture: InkCaptureView?
        private var lastQuery = ""


        /// Where the student was last reading, per document.
        private static let key = "SynapseResourcePage"

        func restoredPage(for url: URL, in document: PDFDocument?) -> PDFPage? {
            guard let document else { return nil }
            let stored = UserDefaults.standard.dictionary(forKey: Self.key) as? [String: Int] ?? [:]
            guard let index = stored[url.lastPathComponent], index > 0, index < document.pageCount else { return nil }
            return document.page(at: index)
        }

        @objc func pageChanged(_ notification: Notification) {
            report()
            guard let view, let url, let page = view.currentPage else { return }
            let index = view.document?.index(for: page) ?? NSNotFound
            guard index != NSNotFound else { return }

            var stored = UserDefaults.standard.dictionary(forKey: Self.key) as? [String: Int] ?? [:]
            stored[url.lastPathComponent] = index
            UserDefaults.standard.set(stored, forKey: Self.key)
        }

        func report() {
            guard let view, let document = view.document, let page = view.currentPage else { return }
            // `index(for:)` returns NSNotFound rather than nil for a page the
            // document does not hold, which would print as a nonsense number.
            let index = document.index(for: page)
            guard index != NSNotFound else { return }
            onPageChange?("\(index + 1) of \(document.pageCount)", index + 1)
        }

        /// Jump to the first match, and only when the term actually changes —
        /// re-running the search on every redraw would fight the reader as they
        /// scroll.
        func search(_ query: String) {
            guard query != lastQuery else { return }
            lastQuery = query

            guard let view, let document = view.document else { return }
            view.highlightedSelections = nil

            let trimmed = query.trimmingCharacters(in: .whitespacesAndNewlines)
            guard trimmed.count >= 2 else { return }

            let matches = document.findString(trimmed, withOptions: [.caseInsensitive])
            guard !matches.isEmpty else { return }
            for match in matches { match.color = UIColor(Theme.accent).withAlphaComponent(0.35) }
            view.highlightedSelections = matches
            view.go(to: matches[0])
        }
    }
}
