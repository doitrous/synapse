import PDFKit
import SwiftUI

/// Reading a source document.
///
/// PDFKit rather than a web view: it pages, searches, remembers where you were,
/// and renders a 400-page textbook without loading all of it — none of which a
/// `WKWebView` pointed at a file gives you.
struct ResourceReaderView: View {
    @Environment(\.strings) private var strings
    let resource: LibraryResource
    let files: ResourceFileStore
    let api: SynapseAPI
    let sync: SyncEngine
    /// A page a citation asked for, so a fact can land on its exact source
    /// rather than on the first page of a four-hundred-page book.
    var openAt: Int?

    @State private var pageLabel = ""
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
    /// The contents/search panel, when it is up.
    @State private var panel: ReaderPanel.Tab?
    @State private var outline: [OutlineEntry] = []
    @State private var timer = StudyTimer()
    @State private var showingTimer = false
    /// Where the reader should jump to, set when a panel entry is tapped.
    @State private var jumpTo: Int?
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
                    Button { panel = .contents } label: {
                        Image(systemName: "list.bullet.indent")
                    }
                    .tint(Theme.primary)
                    .accessibilityLabel(strings("Contents"))
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button { panel = .search } label: {
                        Image(systemName: "magnifyingglass")
                    }
                    .tint(Theme.primary)
                    .accessibilityLabel(strings("Search this document"))
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Menu {
                        Button {
                            showingTimer.toggle()
                        } label: {
                            Label(
                                showingTimer ? "Hide the timer" : "Study timer",
                                systemImage: "timer"
                            )
                        }
                        Button(role: .destructive) {
                            files.delete(resource.id)
                        } label: {
                            Label(strings("Remove download"), systemImage: "trash")
                        }
                    } label: {
                        Image(systemName: "ellipsis.circle")
                    }
                    .tint(Theme.primary)
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
                    if !pageLabel.isEmpty, selection.isEmpty, !showingTimer {
                        Text(pageLabel)
                            .font(Theme.numeric(11))
                            .foregroundStyle(Theme.ink2)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 5)
                            .floatingChrome(in: Capsule())
                    }
                    if !selection.isEmpty { selectionBar }
                    // Reserved space too, and for the same reason: its buttons
                    // are useless if PDFKit takes their taps.
                    if showingTimer { timerChip }
                }
                .padding(.bottom, 6)
            }
    }

    private func page(_ url: URL) -> some View {
        PDFReader(
            url: url,
            marks: marks,
            settings: settings,
            selection: selectionBox,
            jumpTo: jumpTo,
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
        .sheet(item: $panel) { which in
            ReaderPanel(
                tab: Binding(get: { which }, set: { panel = $0 }),
                outline: outline,
                markers: annotations?.manifest.markers ?? [],
                noteIndex: annotations?.manifest.notes ?? [],
                currentPage: page,
                findInDocument: findInDocument,
                goTo: { target in
                    jumpTo = target
                    panel = nil
                },
                addSection: { title in
                    Task { await annotations?.addMarker(title, page: page) }
                },
                removeSection: { id in
                    Task { await annotations?.removeMarker(id) }
                },
                close: { panel = nil }
            )
            .localisedSheet()
        }
        .sheet(item: $editing) { object in
            WidgetTextSheet(object: object) { text in
                Task { await retype(object, text: text) }
            }
            .localisedSheet()
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
        .onChange(of: jumpTo) { _, target in
            // Cleared once the reader has taken it, so tapping the same entry
            // twice jumps twice rather than doing nothing the second time.
            if target != nil { DispatchQueue.main.async { jumpTo = nil } }
        }
        .task {
            // Before anything else, so the reader opens where it was asked to
            // rather than jumping there a moment after the student arrives.
            if let openAt { jumpTo = openAt }
            // Detached from the reader's own opening: a slow round trip must
            // not hold up the page the student came to read.
            Task { await noteOpened() }
            // Read off the main thread: a large book's outline is a tree of
            // several thousand nodes, and building it on the way in would show
            // the student a frozen page.
            let source = url
            outline = await Task.detached { PDFDocument(url: source)?.contents() ?? [] }.value
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

    /// Read the document's text, page by page.
    ///
    /// PDFKit's own `findString` returns selections but no surrounding text, and
    /// a list of hits a student cannot recognise is not worth showing — so the
    /// page string is matched here, through the same code that searches notes.
    ///
    /// `hasText` is not a detail. Much of this library is photocopied and
    /// scanned: 186 page images and no fonts, so there is nothing to search and
    /// never will be. Reporting that as "nothing found" would tell a student
    /// their search is broken, and they would stop using it. Reporting it as
    /// what it is lets them know to look with their eyes.
    private func findInDocument(_ query: String) -> (matches: [SearchIndex.Match], hasText: Bool) {
        guard case .ready(let url) = files.state(for: resource.id),
              let document = PDFDocument(url: url)
        else { return ([], true) }

        var found: [SearchIndex.Match] = []
        var sawText = false
        for index in 0..<document.pageCount {
            guard let text = document.page(at: index)?.string,
                  !text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
            else { continue }
            sawText = true
            found.append(contentsOf: SearchIndex.matches(in: text, page: index + 1, of: query))
            // A word appearing on every page of a textbook is not a useful
            // list, and building it costs a student their battery.
            if found.count >= 200 { break }
        }
        return (found, sawText)
    }

    /// Note that this document was opened, for the dashboard's "last used".
    ///
    /// Read from the server before it is written back. The key is dotted, so it
    /// is a record the student owns and carries between devices — writing only
    /// to this device would let a phone and a laptop each hold half a reading
    /// history and overwrite the other's half on the next open.
    private func noteOpened() async {
        let current = (try? await api.userState([RecentResource].self, key: RecentResource.key))?.value ?? []
        let opened = RecentResource(
            id: resource.id, title: resource.title, type: resource.type.rawValue,
            subjectId: resource.subjectId, meta: resource.meta,
            openedAt: ISO8601DateFormatter().string(from: Date())
        )
        await sync.write(key: RecentResource.key, value: RecentResource.noting(opened, in: current))
    }

    /// How long this sitting has been.
    private var timerChip: some View {
        HStack(spacing: 12) {
            Text(StudyTimer.clock(timer.elapsed))
                .font(Theme.numeric(15))
                .foregroundStyle(Theme.ink)
                .monospacedDigit()

            Button { timer.toggle() } label: {
                Image(systemName: timer.isRunning ? "pause.fill" : "play.fill")
            }
            Button { timer.reset() } label: {
                Image(systemName: "arrow.counterclockwise")
            }
            Button { showingTimer = false } label: {
                Image(systemName: "xmark")
            }
        }
        .font(Theme.ui(13, weight: 600))
        .tint(Theme.primary)
        .padding(.horizontal, 16)
        .padding(.vertical, 10)
        .floatingChrome(in: Capsule())
        .padding(.bottom, 16)
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
                    Label(strings("Edit"), systemImage: "character.cursor.ibeam")
                }
            }

            Button(role: .destructive) {
                Task { await removeSelection() }
            } label: {
                Label(strings("Delete"), systemImage: "trash")
            }

            Button(strings("Done")) { selection = [] }
        }
        .font(Theme.ui(13, weight: 600))
        .labelStyle(.titleOnly)
        .tint(Theme.primary)
        .padding(.horizontal, 16)
        .padding(.vertical, 10)
        .floatingChrome(in: Capsule())
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
                .tint(Theme.primary)
                .frame(maxWidth: 220)
            Text(fraction > 0 ? "\(Int(fraction * 100))%" : "Starting…")
                .font(Theme.numeric(13))
                .foregroundStyle(Theme.ink2)
            Button(strings("Cancel")) { files.cancel(resource.id) }
                .font(Theme.ui(14))
                .tint(Theme.primary)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }

    private var notDownloaded: some View {
        VStack(spacing: 12) {
            Image(systemName: "arrow.down.circle")
                .font(.system(size: 34))
                .foregroundStyle(Theme.primary)
            Text(resource.title)
                .font(Theme.display(20))
                .foregroundStyle(Theme.ink)
                .multilineTextAlignment(.center)
            Text(strings("Download it once and it stays on this phone, with or without a signal."))
                .font(Theme.ui(14))
                .foregroundStyle(Theme.ink2)
                .multilineTextAlignment(.center)

            Button {
                files.download(resource.id)
            } label: {
                Text(strings("Download"))
                    .font(Theme.ui(16, weight: 600))
                    .frame(maxWidth: 220)
                    .frame(height: 46)
                    .background(Theme.primary)
                    .foregroundStyle(Theme.onPrimary)
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
    /// A page the reader has been asked to go to, from the contents or a
    /// search hit.
    var jumpTo: Int?
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
        context.coordinator.jump(to: jumpTo)
    }

    func makeCoordinator() -> Coordinator { Coordinator() }

    final class Coordinator: NSObject {
        weak var view: PDFView?
        var url: URL?
        var onPageChange: ((String, Int) -> Void)?
        /// The single overlay the marks are painted into.
        weak var overlay: AnnotationOverlay?
        weak var capture: InkCaptureView?


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

        /// Go to a page the panel asked for.
        func jump(to page: Int?) {
            guard
                let page, let view, let document = view.document,
                page >= 1, page <= document.pageCount,
                let destination = document.page(at: page - 1)
            else { return }
            view.go(to: PDFDestination(page: destination, at: CGPoint(x: 0, y: destination.bounds(for: view.displayBox).height)))
        }

    }
}
