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
    private(set) var isLoading = true
    private(set) var emptyReason: String?
    /// Which resources this student has saved. Kept per-student on the server
    /// under the same key the web app uses.
    private(set) var bookmarks: Set<String> = []

    static let bookmarksKey = "synapse.bookmarks.resources.v1"

    private let store: LocalStore
    private let sync: SyncEngine
    var audience: StudentAudience

    init(store: LocalStore, sync: SyncEngine, audience: StudentAudience = .unknown) {
        self.store = store
        self.sync = sync
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
            folders = Self.group(resources)
            emptyReason = folders.isEmpty ? await describeEmptiness() : nil
        } catch {
            folders = []
            emptyReason = "The resource catalogue could not be opened on this device."
        }
    }

    func toggleBookmark(_ id: String) async {
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

    /// Group by chapter, which is how the web app's folder tree reads.
    /// Resources with no chapter recorded collect at the end rather than
    /// vanishing.
    nonisolated static func group(_ resources: [LibraryResource]) -> [Folder] {
        var folders: [String: Folder] = [:]
        var order: [String] = []

        for resource in resources {
            let title = resource.chapter ?? "Unfiled"
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
