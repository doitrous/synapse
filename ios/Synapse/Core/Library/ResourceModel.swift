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

    struct Folder: Identifiable, Equatable, Sendable {
        let id: String
        let title: String
        var resources: [LibraryResource]
    }

    private(set) var folders: [Folder] = []
    /// How the shelf is arranged, remembered on this device.
    var grouping: Grouping = Grouping(
        rawValue: UserDefaults.standard.string(forKey: Grouping.key) ?? ""
    ) ?? .system {
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
            // A catalogued resource with no uploaded file cannot be opened.
            hasFile: (data?["storageKey"] as? String)?.isEmpty == false
        )
    }

    /// How the shelf is arranged.
    ///
    /// The web keeps this choice per device under `synapse.resources.groupBy`:
    /// it is about how a student likes to browse, not about the student.
    enum Grouping: String, CaseIterable, Sendable {
        case system, kind

        var label: String {
            switch self {
            case .system: "By chapter"
            case .kind: "By type"
            }
        }

        static let key = "nishany.resources.groupBy"
    }

    /// Group the shelf. Resources with nothing recorded collect at the end
    /// rather than vanishing.
    nonisolated static func group(
        _ resources: [LibraryResource], by grouping: Grouping = .system
    ) -> [Folder] {
        var folders: [String: Folder] = [:]
        var order: [String] = []

        for resource in resources {
            let title = switch grouping {
            case .system: resource.chapter ?? "Unfiled"
            case .kind: resource.type.rawValue
            }
            if folders[title] == nil {
                folders[title] = Folder(id: title, title: title, resources: [])
                order.append(title)
            }
            folders[title]?.resources.append(resource)
        }

        let unfiledLast = order.sorted { lhs, rhs in
            if lhs == "Unfiled" { return false }
            if rhs == "Unfiled" { return true }
            return lhs.localizedCaseInsensitiveCompare(rhs) == .orderedAscending
        }

        return unfiledLast.compactMap { folders[$0] }.map { folder in
            var sorted = folder
            sorted.resources.sort { $0.title.localizedCaseInsensitiveCompare($1.title) == .orderedAscending }
            return sorted
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
