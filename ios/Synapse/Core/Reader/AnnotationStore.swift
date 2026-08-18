import Foundation
import Observation

/// A document's marks, loaded a few shards at a time.
///
/// Mirrors `src/components/reader/useAnnotations.ts`. One key is one JSON
/// document rewritten in full on every change, so marks are sharded by page
/// range and only the shards near the viewport are held open — a heavily
/// annotated book is several megabytes, and loading all of it to draw one page
/// would cost a student their whole data allowance to open a textbook.
@MainActor
@Observable
final class AnnotationStore {

    /// Shards either side of the current page. The web holds the same three.
    static let window = 1
    /// Over this, a shard is refused rather than silently dropped by the
    /// server's request limit.
    static let maxShardBytes = 1_500_000

    /// Objects by page, for whatever shards are currently open.
    private(set) var objectsByPage: [Int: [AnnotationObject]] = [:]
    private(set) var manifest = AnnotationManifest()
    private(set) var isLoading = false
    /// Set when a shard could not be read, so the reader can say the page's
    /// marks are missing rather than drawing a page that looks unannotated.
    private(set) var problem: String?

    private let api: SynapseAPI
    private let scope: String
    /// Shards already fetched, so paging back does not refetch.
    private var loaded: Set<Int> = []
    private var inFlight: Set<Int> = []

    init(api: SynapseAPI, kind: AnnotationKey.Kind, documentID: String) {
        self.api = api
        self.scope = AnnotationKey.scope(kind: kind, id: documentID)
    }

    /// The marks on one page, in paint order.
    func objects(onPage page: Int) -> [AnnotationObject] {
        (objectsByPage[page] ?? []).sorted { $0.z < $1.z }
    }

    /// Load the manifest — markers and the note index, which must be listable
    /// before the pages they live on have loaded.
    func loadManifest() async {
        guard let remote = try? await api.userState(
            AnnotationManifest.self, key: AnnotationKey.manifestKey(scope: scope)
        ) else { return }
        manifest = remote.value ?? AnnotationManifest()
    }

    /// Bring in whatever the given page needs, and its neighbours.
    ///
    /// Called as the reader scrolls. Already-loaded shards are skipped, so this
    /// is cheap to call on every page change.
    func load(around page: Int) async {
        let centre = AnnotationKey.shardIndex(forPage: page)
        let wanted = ((centre - Self.window)...(centre + Self.window))
            .filter { $0 >= 0 && !loaded.contains($0) && !inFlight.contains($0) }

        guard !wanted.isEmpty else { return }
        isLoading = true
        defer { isLoading = false }

        for index in wanted { await loadShard(index) }
    }

    private func loadShard(_ index: Int) async {
        inFlight.insert(index)
        defer { inFlight.remove(index) }

        do {
            let remote = try await api.userState(
                [AnnotationObject].self, key: AnnotationKey.shardKey(scope: scope, index: index)
            )
            merge(remote.value ?? [])
            loaded.insert(index)
            problem = nil
        } catch APIError.notFound {
            // Never written. An unannotated page range is the ordinary case.
            loaded.insert(index)
        } catch {
            // Deliberately not marked loaded: a page whose marks failed to
            // arrive must be retried, not silently shown blank forever.
            problem = "Some of your marks could not be loaded."
        }
    }

    private func merge(_ objects: [AnnotationObject]) {
        for object in objects {
            var page = objectsByPage[object.page] ?? []
            if let existing = page.firstIndex(where: { $0.id == object.id }) {
                page[existing] = object
            } else {
                page.append(object)
            }
            objectsByPage[object.page] = page
        }
    }

    /// The next paint order on a page. Fractional elsewhere, but a new mark
    /// always goes on top.
    func nextZ(onPage page: Int) -> Double {
        ((objectsByPage[page] ?? []).map(\.z).max() ?? 0) + 1
    }

    /// The most recent stamp anywhere, so a new one can be made strictly later.
    var lastStamp: Double? {
        objectsByPage.values.flatMap { $0 }.map(\.t).max()
    }
}
