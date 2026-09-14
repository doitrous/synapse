import Foundation
import Observation

/// A resource a student can open: a book chapter, a lecture deck, a guideline.
///
/// Mirrors `LiveResource` in `src/lib/useLiveResources.ts`. Note `hasFile`:
/// a resource can be catalogued before its file is uploaded, and offering to
/// open one that has no bytes behind it is a dead end.
struct LibraryResource: Identifiable, Equatable, Sendable {
    let id: String
    let title: String
    let type: ResourceType
    let subjectId: String
    let source: String
    let meta: String
    let year: Int?
    let chapters: [String]
    /// Curriculum module ids this resource is tagged with (web `moduleIds`).
    let modules: [String]
    /// What the ledger claims. The authoritative answer is `file`.
    let hasFile: Bool
    /// The source document behind this, when one exists.
    var file: EvidenceStore.ResourceFile?

    var chapter: String? { chapters.first }
    /// Whether tapping this leads anywhere.
    var isOpenable: Bool { file != nil }
}

enum ResourceType: String, CaseIterable, Sendable {
    case book = "Book"
    case video = "Video"
    case guideline = "Guideline"
    case deck = "Deck"
    case article = "Article"

    /// Anything unrecognised reads as an article, as on the web.
    init(_ raw: String?) {
        self = ResourceType(rawValue: raw ?? "") ?? .article
    }

    var symbol: String {
        switch self {
        case .book: "book.closed"
        case .video: "play.rectangle"
        case .guideline: "checklist"
        case .deck: "rectangle.on.rectangle"
        case .article: "doc.text"
        }
    }
}

/// The resource catalogue, grouped for browsing.
@MainActor
@Observable
final class ResourceModel {

    /// A chapter grouping inside a folder. `key` is the chapter, or `noChapter`
    /// for the resources that name none — those show without a subheading.
    struct Subfolder: Identifiable, Equatable, Sendable {
        let key: String
        var items: [LibraryResource]
        var id: String { key }
        var chapter: String? { key == ResourceModel.noChapter ? nil : key }
    }

    struct Folder: Identifiable, Equatable, Sendable {
        let id: String
        let title: String
        /// The subject to colour the folder by; absent when nothing names one.
        let subjectId: String?
        var subfolders: [Subfolder]
        /// Everything in the folder, flattened — for the filters and counts.
        var resources: [LibraryResource] { subfolders.flatMap(\.items) }
    }

    /// A folder or chapter with no name — an absent subject/module, or chapter.
    /// `nonisolated` so the pure `group` (also nonisolated) can read them.
    nonisolated static let ungrouped = "__none__"
    nonisolated static let noChapter = "__general__"

    private(set) var folders: [Folder] = []
    /// How the shelf is arranged, remembered on this device.
    var grouping: Grouping = Grouping(
        rawValue: UserDefaults.standard.string(forKey: Grouping.key) ?? ""
    ) ?? .module {
        didSet {
            UserDefaults.standard.set(grouping.rawValue, forKey: Grouping.key)
            folders = Self.group(folders.flatMap(\.resources), by: grouping)
        }
    }
    private(set) var isLoading = true
    private(set) var emptyReason: String?
    /// Which resources this student has saved. Kept per-student on the server
    /// under the same key the web app uses.
    private(set) var bookmarks: Set<String> = []
    /// True once the student's saved list has actually been read back.
    ///
    /// Until then this set is empty because nothing has been fetched, not
    /// because nothing is saved — and those two are indistinguishable from the
    /// inside. Writing in that state replaces a student's whole saved list with
    /// whatever they just tapped.
    private(set) var bookmarksLoaded = false
    /// Set when saving is refused, so the row can say why rather than ignoring
    /// the tap.
    private(set) var bookmarkProblem: String?

    static let bookmarksKey = "nishany.bookmarks.resources.v1"

    private let store: LocalStore
    private let sync: SyncEngine
    private let api: SynapseAPI
    var audience: StudentAudience

    init(store: LocalStore, sync: SyncEngine, api: SynapseAPI, audience: StudentAudience = .unknown) {
        self.store = store
        self.sync = sync
        self.api = api
        self.audience = audience
    }

    func load() async {
        isLoading = true
        defer { isLoading = false }

        do {
            let items = try await store.items(kind: .resource, audience: audience)

            // Which resources actually have a file is recorded in the evidence
            // store, not on the ledger item: the ledger's `storageKey` is the
            // admin's intent, and only 15 of the 47 have bytes behind them.
            let evidence = await evidenceStore()
            let resources = items.compactMap(Self.project).map { resource in
                var updated = resource
                updated.file = evidence.resourceFiles[resource.id]
                return updated
            }
            folders = Self.group(resources, by: grouping)
            emptyReason = folders.isEmpty ? await describeEmptiness() : nil
        } catch {
            folders = []
            emptyReason = "The resource catalogue could not be opened on this device."
        }

        await loadBookmarks()
    }

    /// Read the saved list back before anything is allowed to write it.
    ///
    /// Marked loaded only on success: a failed fetch must leave writing
    /// disabled, because proceeding would treat "could not read" as "nothing
    /// saved" and overwrite the student's list on the next tap.
    func loadBookmarks() async {
        guard !bookmarksLoaded else { return }
        do {
            let remote = try await api.userState([String].self, key: Self.bookmarksKey)
            bookmarks = Set(remote.value ?? [])
            bookmarksLoaded = true
            bookmarkProblem = nil
        } catch {
            bookmarkProblem = "Your saved list could not be loaded, so saving is off until it can."
        }
    }

    func toggleBookmark(_ id: String) async {
        // One retry, in case the first load failed on a dropped connection.
        if !bookmarksLoaded { await loadBookmarks() }
        guard bookmarksLoaded else { return }

        if bookmarks.contains(id) { bookmarks.remove(id) } else { bookmarks.insert(id) }
        // Written through the sync engine, so it survives being offline and
        // lands under the same key the web app reads.
        await sync.write(key: Self.bookmarksKey, value: Array(bookmarks).sorted())
    }

    // MARK: - Projection

    /// `nonisolated` because these are pure: they read a ledger item and return
    /// a value. Inheriting the model's main-actor isolation would force every
    /// caller onto the main thread to do work that touches no state, and shred
    /// a large catalogue there rather than off it.
    nonisolated static func project(_ item: LedgerItem) -> LibraryResource? {
        guard item.kind == .resource else { return nil }
        guard let record = try? JSONSerialization.jsonObject(with: item.raw) as? [String: Any] else { return nil }

        let data = record["resourceData"] as? [String: Any]
        let fields = record["fields"] as? [String: String] ?? [:]

        let authored = data?["chapters"] as? [String] ?? []
        let chapters = authored.isEmpty
            ? (fields["Chapter"]?.trimmed.nilIfEmpty.map { [$0] } ?? [])
            : authored

        return LibraryResource(
            id: item.id,
            title: item.title,
            type: ResourceType(fields["Type"]),
            subjectId: item.subjectId,
            source: fields["Source"]?.trimmed.nilIfEmpty ?? "—",
            meta: fields["Location"]?.trimmed ?? "",
            year: Int(fields["Year"] ?? ""),
            chapters: chapters,
            modules: data?["moduleIds"] as? [String] ?? [],
            // A catalogued resource with no uploaded file cannot be opened.
            hasFile: (data?["storageKey"] as? String)?.isEmpty == false
        )
    }

    /// How the shelf is arranged.
    ///
    /// The web keeps this choice per device under `nishany.resources.groupBy`:
    /// it is about how a student likes to browse, not about the student. Two
    /// axes, matching the web — the primary folder is a **subject** or a
    /// **module**, and each folder is split into **chapter** subfolders.
    enum Grouping: String, CaseIterable, Sendable {
        case system, module

        var label: String {
            switch self {
            case .system: "System"
            case .module: "Module"
            }
        }

        static let key = "nishany.resources.groupBy"
    }

    /// "CVS 2" before "CVS 10", and the nameless bucket last — a port of the
    /// web's `byModuleId`, over `localizedStandard` so digits compare as numbers.
    nonisolated private static func byModuleId(_ a: String, _ b: String) -> Bool {
        if a == ungrouped { return false }
        if b == ungrouped { return true }
        return a.localizedStandardCompare(b) == .orderedAscending
    }

    /// Group the shelf into subject/module folders of chapter subfolders — a
    /// port of `src/data/resourceGrouping.ts:groupResources`. Nothing is ever
    /// dropped for carrying an off-catalogue subject or module; unknown keys
    /// keep catalogue subjects company at the end, and the nameless bucket last.
    nonisolated static func group(
        _ resources: [LibraryResource], by grouping: Grouping = .module
    ) -> [Folder] {
        // Primary buckets, in first-seen order.
        var primaries: [String: [LibraryResource]] = [:]
        var seen: [String] = []
        for resource in resources {
            let key = (grouping == .system ? resource.subjectId : resource.modules.first ?? "")
                .nilIfEmpty ?? ungrouped
            if primaries[key] == nil { seen.append(key) }
            primaries[key, default: []].append(resource)
        }

        let keys: [String]
        if grouping == .system {
            let known = SubjectCatalog.order.filter { primaries[$0] != nil }
            let rest = seen.filter { !SubjectCatalog.order.contains($0) }.sorted(by: byModuleId)
            keys = known + rest
        } else {
            keys = seen.sorted(by: byModuleId)
        }

        return keys.map { key in
            let items = primaries[key] ?? []
            // Chapter subfolders, in first-seen order; the chapterless bucket
            // sits wherever it first appears — matching the web's Map order.
            var subfolders: [Subfolder] = []
            var subIndex: [String: Int] = [:]
            for item in items {
                let chapter = item.chapter?.nilIfEmpty ?? noChapter
                if let i = subIndex[chapter] {
                    subfolders[i].items.append(item)
                } else {
                    subIndex[chapter] = subfolders.count
                    subfolders.append(Subfolder(key: chapter, items: [item]))
                }
            }
            let subjectId = grouping == .system
                ? (key == ungrouped ? nil : key)
                : items.first?.subjectId.nilIfEmpty
            let title = grouping == .system
                ? (key == ungrouped ? "Unfiled" : SubjectCatalog.name(key))
                : (key == ungrouped ? "No module" : key)
            return Folder(id: key, title: title, subjectId: subjectId, subfolders: subfolders)
        }
    }

    private func evidenceStore() async -> EvidenceStore {
        guard
            let document = try? await store.catalogue(key: SyncEngine.evidenceKey),
            let json = try? JSONSerialization.jsonObject(with: document)
        else { return .empty }
        return EvidenceStore.decode(json)
    }

    private func describeEmptiness() async -> String {
        let total = (try? await store.itemCount(kind: .resource)) ?? 0
        if total == 0 {
            let nothingSynced = (try? await store.catalogueVersions().isEmpty) ?? true
            return nothingSynced
                ? "Nothing has downloaded yet. Pull to refresh once you have a connection."
                : "No resources have been published yet."
        }
        return "No resources are published for your university and year yet."
    }
}
