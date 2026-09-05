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

    private let api: NishanyAPI
    /// Writes go through the sync engine, so a mark made on a ward with no
    /// signal is queued rather than lost.
    let sync: SyncEngine
    let scope: String
    /// Shards already fetched, so paging back does not refetch.
    private var loaded: Set<Int> = []
    private var inFlight: Set<Int> = []

    /// In memory only, as on the web: undo is for the session you are in, not
    /// a history of the document.
    var undoStack: [Op] = []
    var redoStack: [Op] = []

    init(api: NishanyAPI, sync: SyncEngine, kind: AnnotationKey.Kind, documentID: String) {
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
        record(Op(added: [object]))
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
        record(Op(removed: objects))

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

    // MARK: - Sections

    /// Name the page you are on, so you can get back to it.
    ///
    /// A marker lives only in the manifest, never in a shard. It has to be
    /// listable from page 1 while pointing at page 300, and only three shards
    /// are ever open — so it is kept where the whole document can see it.
    func addMarker(_ title: String, page: Int) async {
        let trimmed = title.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return }

        let marker = AnnotationObject.marker(
            title: trimmed, page: page, z: 0,
            stamp: AnnotationObject.nextStamp(after: lastStamp)
        )
        manifest.markers = (manifest.markers + [marker]).sorted { $0.page < $1.page }
        await sync.write(key: AnnotationKey.manifestKey(scope: scope), value: manifest)
    }

    func removeMarker(_ id: String) async {
        guard manifest.markers.contains(where: { $0.id == id }) else { return }
        manifest.markers.removeAll { $0.id == id }
        await sync.write(key: AnnotationKey.manifestKey(scope: scope), value: manifest)
    }

    // MARK: - Changing marks in place

    /// Move, retype or recolour marks that already exist.
    ///
    /// `coalesce` folds the change into the previous undo step, so a drag of
    /// forty touch moves is one Undo rather than forty. Without it, putting a
    /// note back where it was would mean holding Undo down.
    func update(
        ids: [String], coalesce: String? = nil,
        _ patch: (AnnotationObject) -> AnnotationObject
    ) async {
        guard !ids.isEmpty else { return }
        let wanted = Set(ids)
        let before = objectsByPage.values.flatMap { $0 }.filter { wanted.contains($0.id) }
        guard !before.isEmpty else { return }

        // Stamped here rather than in each caller: `t` is what tells the
        // renderer a mark changed, and a recolour that forgot to touch it would
        // not repaint. Forced to advance, because a drag emits several changes
        // inside one millisecond and two equal stamps would look like no change.
        let stamp = AnnotationObject.nextStamp(after: lastStamp)
        let after = before.map { object -> AnnotationObject in
            var patched = patch(object)
            patched.t = stamp
            return patched
        }

        let ids = Set(before.map(\.id))
        for page in Set(before.map(\.page)) {
            apply(on: page) { objects in objects.removeAll { ids.contains($0.id) } }
        }
        for object in after { apply(on: object.page) { $0.append(object) } }

        record(Op(added: after, removed: before, tag: coalesce))

        for page in Set(before.map(\.page) + after.map(\.page)) { await save(shardFor: page) }
        if (before + after).contains(where: \.entersManifest) { await saveManifest() }
    }

    // MARK: - Undo

    /// One reversible change: what appeared, and what went away.
    ///
    /// A pair rather than an enum, because an edit is both at once — the old
    /// note is removed and the new one added — and `tag` marks a run of them
    /// that undo together.
    struct Op {
        var added: [AnnotationObject] = []
        var removed: [AnnotationObject] = []
        /// Set for changes that fold into the one before, like a drag.
        var tag: String?
    }

    private func record(_ op: Op) {
        // A drag emits one of these per touch move. Folding them into the step
        // that started the drag is what makes Undo mean "put it back where it
        // was" rather than "move it two pixels".
        if let tag = op.tag, let last = undoStack.last, last.tag == tag {
            undoStack[undoStack.count - 1].added = op.added
            redoStack.removeAll()
            return
        }
        undoStack.append(op)
        // A hundred steps, as the web keeps. Past that the memory is worth more
        // than the regret.
        if undoStack.count > 100 { undoStack.removeFirst() }
        redoStack.removeAll()
    }

    var canUndo: Bool { !undoStack.isEmpty }
    var canRedo: Bool { !redoStack.isEmpty }

    func undo() async {
        guard let op = undoStack.popLast() else { return }
        // The inverse: whatever was added is removed, whatever was removed
        // comes back.
        await put(back: op.removed, takingAway: op.added)
        redoStack.append(op)
    }

    func redo() async {
        guard let op = redoStack.popLast() else { return }
        await put(back: op.added, takingAway: op.removed)
        undoStack.append(op)
    }

    private func put(back: [AnnotationObject], takingAway: [AnnotationObject]) async {
        let ids = Set(takingAway.map(\.id))
        for page in Set(takingAway.map(\.page)) {
            apply(on: page) { objects in objects.removeAll { ids.contains($0.id) } }
        }
        for object in back { apply(on: object.page) { $0.append(object) } }

        for page in Set(back.map(\.page) + takingAway.map(\.page)) { await save(shardFor: page) }
        if (back + takingAway).contains(where: \.entersManifest) { await saveManifest() }
    }
}

extension AnnotationObject {
    /// Whether this kind is mirrored into the manifest.
    var entersManifest: Bool { kind == .marker || kind == .note || kind == .textbox }
}
