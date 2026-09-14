import SwiftUI
import QuickLook

/// Opening a document from "My uploads".
///
/// The bytes live on the account, so a tap downloads the file to disk and hands
/// it to QuickLook — which pages a PDF, zooms an image, and offers share/print
/// for free, and handles both media types a student can upload. The download is
/// bearer-authed (see `downloadMyDocument`), so a plain URL will not do; the
/// file has to come down first.
struct MyDocumentPreviewView: View {
    @Environment(\.strings) private var strings
    let doc: MyDocument
    @State private var loader: DocumentPreviewLoader

    init(doc: MyDocument, store: MyDocumentStore) {
        self.doc = doc
        _loader = State(wrappedValue: DocumentPreviewLoader(store: store))
    }

    var body: some View {
        Group {
            switch loader.phase {
            case .loading(let fraction):
                VStack(spacing: 14) {
                    // A determinate bar once bytes are flowing; a plain spinner
                    // for the handshake before the server reports a length.
                    if fraction > 0 {
                        ProgressView(value: fraction).tint(Theme.primary).frame(maxWidth: 220)
                    } else {
                        ProgressView().tint(Theme.primary)
                    }
                    Text(strings("Opening…")).font(Theme.ui(13)).foregroundStyle(Theme.ink2)
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .background(Theme.paper)
            case .ready(let url):
                QuickLookPreview(url: url).ignoresSafeArea(edges: .bottom)
            case .failed(let message):
                EmptyStateView(symbol: "exclamationmark.triangle", title: "Could not open it", detail: message)
            }
        }
        .navigationTitle(doc.title)
        .navigationBarTitleDisplayMode(.inline)
        .task { await loader.load(doc) }
    }
}

/// Downloads a My-uploads document and tracks the progress of opening it.
///
/// A class rather than view state so the byte-progress callback — which arrives
/// off the main actor — has a stable `@MainActor` home to write into, the same
/// shape `ResourceFileStore` uses for catalogue downloads.
@MainActor
@Observable
final class DocumentPreviewLoader {
    enum Phase: Equatable {
        case loading(Double)
        case ready(URL)
        case failed(String)
    }

    private(set) var phase: Phase = .loading(0)
    private let store: MyDocumentStore

    init(store: MyDocumentStore) {
        self.store = store
    }

    func load(_ doc: MyDocument) async {
        // A file already fetched this session opens instantly — no second trip.
        if let cached = Self.cachedURL(for: doc),
           FileManager.default.fileExists(atPath: cached.path) {
            phase = .ready(cached)
            return
        }

        phase = .loading(0)
        do {
            let temporary = try await store.download(doc.id) { fraction in
                Task { @MainActor in self.note(fraction) }
            }
            phase = .ready(try Self.place(temporary, for: doc))
        } catch {
            phase = .failed("This document could not be opened. Check your connection and try again.")
        }
    }

    private func note(_ fraction: Double) {
        if case .loading = phase { phase = .loading(fraction) }
    }

    /// Where a downloaded document is parked for previewing — under the temp
    /// directory, keyed by id, and crucially carrying the right extension so
    /// QuickLook knows what it is looking at.
    nonisolated static func cachedURL(for doc: MyDocument) -> URL? {
        // The id came from the server, but it still ends up in a path, so refuse
        // anything that could climb out of the directory.
        let safe = doc.id.filter { $0.isLetter || $0.isNumber || $0 == "_" || $0 == "-" }
        guard safe == doc.id, !safe.isEmpty else { return nil }
        return FileManager.default.temporaryDirectory
            .appendingPathComponent("mydoc-\(safe).\(doc.previewExtension)")
    }

    /// Move the extensionless download to its extension-carrying home.
    nonisolated static func place(_ temporary: URL, for doc: MyDocument) throws -> URL {
        guard let destination = cachedURL(for: doc), destination != temporary else {
            return temporary
        }
        try? FileManager.default.removeItem(at: destination)
        try FileManager.default.moveItem(at: temporary, to: destination)
        return destination
    }
}

/// A thin SwiftUI wrapper over `QLPreviewController`.
struct QuickLookPreview: UIViewControllerRepresentable {
    let url: URL

    func makeUIViewController(context: Context) -> QLPreviewController {
        let controller = QLPreviewController()
        controller.dataSource = context.coordinator
        return controller
    }

    func updateUIViewController(_ controller: QLPreviewController, context: Context) {
        context.coordinator.url = url
        controller.reloadData()
    }

    func makeCoordinator() -> Coordinator { Coordinator(url: url) }

    final class Coordinator: NSObject, QLPreviewControllerDataSource {
        var url: URL
        init(url: URL) { self.url = url }

        func numberOfPreviewItems(in controller: QLPreviewController) -> Int { 1 }

        func previewController(_ controller: QLPreviewController, previewItemAt index: Int) -> QLPreviewItem {
            url as NSURL
        }
    }
}
