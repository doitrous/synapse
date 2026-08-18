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
    /// Writes go through the sync engine, so a mark made on a ward with no
    /// signal is queued rather than lost.
    let sync: SyncEngine
    let scope: String
    /// Shards already fetched, so paging back does not refetch.
    private var loaded: Set<Int> = []
    private var inFlight: Set<Int> = []

    /// In memory only, as on the web: undo is for the session you are in, not
    /// a history of the document.
    var undoStack: [Change] = []
    var redoStack: [Change] = []

    init(api: SynapseAPI, sync: SyncEngine, kind: AnnotationKey.Kind, documentID: String) {
        self.api = api
        self.sync = sync
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

// MARK: - Writing

extension AnnotationStore {

    /// Add a mark and save the shard it belongs to.
    ///
    /// The shard is chosen from the object's own page, not the page being
    /// looked at: a stroke can be committed while the reader has already
    /// scrolled on, and writing it to the wrong shard loses it.
    func add(_ object: AnnotationObject) async {
        apply(on: object.page) { $0.append(object) }
        record(.added(object))
        await save(shardFor: object.page)
        await saveManifestIfNeeded(touching: object)
    }

    /// Remove marks, saving every shard they touched.
    func remove(_ objects: [AnnotationObject]) async {
        guard !objects.isEmpty else { return }
        let ids = Set(objects.map(\.id))

        for page in Set(objects.map(\.page)) {
            apply(on: page) { objects in objects.removeAll { ids.contains($0.id) } }
        }
        record(.removed(objects))

        for page in Set(objects.map(\.page)) { await save(shardFor: page) }
        if objects.contains(where: \.entersManifest) { await saveManifest() }
    }

    private func apply(on page: Int, _ change: (inout [AnnotationObject]) -> Void) {
        var objects = objectsByPage[page] ?? []
        change(&objects)
        objectsByPage[page] = objects
    }

    /// Write one shard.
    ///
    /// Every object whose page falls in the shard's range goes in, not just the
    /// page that changed — the shard is the unit the server stores, so writing
    /// a partial one would delete the other fifteen pages' marks.
    private func save(shardFor page: Int) async {
        let index = AnnotationKey.shardIndex(forPage: page)
        let range = AnnotationKey.pageRange(forShard: index)
        let objects = range.flatMap { objectsByPage[$0] ?? [] }

        // The server drops an over-large write without failing loudly, so it is
        // refused here where a student can be told.
        guard StrokeCodec.byteSize(objects) <= Self.maxShardBytes else {
            problem = "These pages hold as many marks as they can. Erase some before adding more."
            return
        }

        problem = nil
        await sync.write(key: AnnotationKey.shardKey(scope: scope, index: index), value: objects)
    }

    private func saveManifestIfNeeded(touching object: AnnotationObject) async {
        guard object.entersManifest else { return }
        await saveManifest()
    }

    /// Rebuild and write the manifest.
    ///
    /// Markers and note text have to be listable before the pages they live on
    /// are loaded — a bookmark on page 300 must appear in the contents from
    /// page 1 — so they are mirrored here rather than read out of the shards.
    private func saveManifest() async {
        let everything = objectsByPage.values.flatMap { $0 }
        manifest = AnnotationManifest(
            markers: everything.filter { $0.kind == .marker }.sorted { $0.page < $1.page },
            notes: AnnotationManifest.entries(from: everything)
        )
        await sync.write(key: AnnotationKey.manifestKey(scope: scope), value: manifest)
    }

    // MARK: - Undo

    /// One reversible change.
    enum Change {
        case added(AnnotationObject)
        case removed([AnnotationObject])
    }

    private func record(_ change: Change) {
        undoStack.append(change)
        // A hundred steps, as the web keeps. Past that the memory is worth more
        // than the regret.
        if undoStack.count > 100 { undoStack.removeFirst() }
        redoStack.removeAll()
    }

    var canUndo: Bool { !undoStack.isEmpty }
    var canRedo: Bool { !redoStack.isEmpty }

    func undo() async {
        guard let change = undoStack.popLast() else { return }
        await reverse(change)
        redoStack.append(change)
    }

    func redo() async {
        guard let change = redoStack.popLast() else { return }
        await reapply(change)
        undoStack.append(change)
    }

    private func reverse(_ change: Change) async {
        switch change {
        case .added(let object):
            apply(on: object.page) { objects in objects.removeAll { $0.id == object.id } }
            await save(shardFor: object.page)
            await saveManifestIfNeeded(touching: object)
        case .removed(let objects):
            for object in objects { apply(on: object.page) { $0.append(object) } }
            for page in Set(objects.map(\.page)) { await save(shardFor: page) }
            if objects.contains(where: \.entersManifest) { await saveManifest() }
        }
    }

    private func reapply(_ change: Change) async {
        switch change {
        case .added(let object):
            apply(on: object.page) { $0.append(object) }
            await save(shardFor: object.page)
            await saveManifestIfNeeded(touching: object)
        case .removed(let objects):
            let ids = Set(objects.map(\.id))
            for page in Set(objects.map(\.page)) {
                apply(on: page) { objects in objects.removeAll { ids.contains($0.id) } }
            }
            for page in Set(objects.map(\.page)) { await save(shardFor: page) }
            if objects.contains(where: \.entersManifest) { await saveManifest() }
        }
    }
}

extension AnnotationObject {
    /// Whether this kind is mirrored into the manifest.
    var entersManifest: Bool { kind == .marker || kind == .note || kind == .textbox }
}
