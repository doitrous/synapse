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

    @State private var pageLabel = ""
    @State private var searching = false
    @State private var query = ""

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
        PDFReader(url: url, query: searching ? query : "") { label in
            pageLabel = label
        }
        .ignoresSafeArea(edges: .bottom)
        .searchable(
            text: $query, isPresented: $searching,
            placement: .navigationBarDrawer(displayMode: .always),
            prompt: "Search this document"
        )
        .overlay(alignment: .bottom) {
            if !pageLabel.isEmpty, !searching {
                Text(pageLabel)
                    .font(Theme.numeric(11))
                    .foregroundStyle(Theme.ink2)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 5)
                    .background(.ultraThinMaterial, in: Capsule())
                    .padding(.bottom, 10)
            }
        }
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
private struct PDFReader: UIViewRepresentable {
    let url: URL
    let query: String
    let onPageChange: (String) -> Void

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
        context.coordinator.report()
        return view
    }

    func updateUIView(_ view: PDFView, context: Context) {
        context.coordinator.onPageChange = onPageChange
        context.coordinator.search(query)
    }

    func makeCoordinator() -> Coordinator { Coordinator() }

    final class Coordinator: NSObject {
        weak var view: PDFView?
        var url: URL?
        var onPageChange: ((String) -> Void)?
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
            onPageChange?("\(index + 1) of \(document.pageCount)")
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
