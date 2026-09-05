import Foundation
import Observation

/// What a student has done with the library: what they have read, and what they
/// call things.
///
/// Both records are account-scoped under the keys the website writes, so an
/// article marked read on a laptop is read on the phone, and a tag invented in
/// one place is offered in the other.
@MainActor
@Observable
final class UserLibrary {

    static let readKey = "synapse.library.read"
    static let tagsKey = "synapse.library.personalTags"
    static let marksKey = LibraryMarks.storageKey

    /// Article id → read. Stored as a map rather than a list because that is
    /// what the website writes.
    private(set) var read: [String: Bool] = [:]
    /// Article id → the tags this student put on it.
    private(set) var tags: [String: [String]] = [:]
    /// Article id → the student's highlights and notes on it. One document for
    /// the whole library, the shape the website writes.
    private(set) var marks: LibraryMarkStore = [:]

    /// False until the first read succeeds.
    ///
    /// Both are whole-record rewrites: writing before reading would wipe a
    /// term's reading history with whatever this device happened to know.
    private(set) var isLoaded = false

    /// Optional so this can be built and exercised without a network — which
    /// is what tests need, and an honest statement of what it depends on.
    private let api: NishanyAPI?
    private let sync: SyncEngine?

    init(api: NishanyAPI? = nil, sync: SyncEngine? = nil) {
        self.api = api
        self.sync = sync
    }

    func load() async {
        guard let api else {
            // Nothing to read from, so there is nothing to overwrite either.
            isLoaded = true
            return
        }

        async let remoteRead = try? api.userState([String: Bool].self, key: Self.readKey)
        async let remoteTags = try? api.userState([String: [String]].self, key: Self.tagsKey)
        // A malformed or absent marks document reads as no marks rather than
        // failing the whole load — the article should still open.
        async let remoteMarks = try? api.userState(LibraryMarkStore.self, key: Self.marksKey)

        read = (await remoteRead)?.value ?? [:]
        tags = (await remoteTags)?.value ?? [:]
        marks = (await remoteMarks)?.value ?? [:]
        isLoaded = true
    }

    // MARK: - Marks

    /// This student's highlights and notes on one article, in creation order.
    func marks(on articleID: String) -> [LibraryMark] {
        LibraryMarks.marks(marks, on: articleID)
    }

    /// Add a highlight (or, with a note, a sticky note) on a resolved range of a
    /// block's text. Returns the mark it made, or nil when the range could not
    /// be anchored — the same signal the web's `create` gives.
    @discardableResult
    func addMark(
        articleID: String,
        block: String,
        text: String,
        range: TextRange,
        tone: String,
        note: String = ""
    ) async -> LibraryMark? {
        guard isLoaded else { return nil }
        guard let anchor = LibraryMarks.makeAnchor(block: block, text: text, start: range.start, end: range.end)
        else { return nil }
        let mark = LibraryMark(
            id: LibraryMarks.newMarkId(),
            articleId: articleID,
            anchor: anchor,
            tone: tone,
            note: note,
            createdAt: ISO8601DateFormatter().string(from: Date())
        )
        marks = LibraryMarks.upsert(marks, mark)
        await sync?.write(key: Self.marksKey, value: marks)
        return mark
    }

    /// Replace a mark — its tone changed, or its note edited.
    func updateMark(_ mark: LibraryMark) async {
        guard isLoaded else { return }
        marks = LibraryMarks.upsert(marks, mark)
        await sync?.write(key: Self.marksKey, value: marks)
    }

    func removeMark(articleID: String, markID: String) async {
        guard isLoaded else { return }
        marks = LibraryMarks.remove(marks, articleId: articleID, markId: markID)
        await sync?.write(key: Self.marksKey, value: marks)
    }

    // MARK: - Read

    func hasRead(_ articleID: String) -> Bool { read[articleID] == true }

    var readCount: Int { read.values.filter { $0 }.count }

    func toggleRead(_ articleID: String) async {
        guard isLoaded else { return }
        // Removed rather than set false: the map is a set of what has been
        // read, and a false entry says the same thing as no entry while taking
        // up room in a record that is rewritten whole.
        if read[articleID] == true {
            read.removeValue(forKey: articleID)
        } else {
            read[articleID] = true
        }
        await sync?.write(key: Self.readKey, value: read)
    }

    // MARK: - Tags

    func tags(on articleID: String) -> [String] { tags[articleID] ?? [] }

    /// Every tag this student has used anywhere, for offering back.
    ///
    /// Someone who tagged one article "exam" wants to tag the next one "exam",
    /// not "Exam" or "exams" — offering what they already use is what keeps a
    /// personal vocabulary from splintering.
    var allTags: [String] {
        Array(Set(tags.values.flatMap { $0 })).sorted { $0.localizedCompare($1) == .orderedAscending }
    }

    func add(tag: String, to articleID: String) async {
        guard isLoaded else { return }
        let trimmed = tag.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !trimmed.isEmpty else { return }

        var current = tags[articleID] ?? []
        // Matched case-insensitively so "Exam" does not join "exam", but kept
        // as typed the first time it was used.
        guard !current.contains(where: { $0.caseInsensitiveCompare(trimmed) == .orderedSame })
        else { return }

        current.append(trimmed)
        tags[articleID] = current
        await sync?.write(key: Self.tagsKey, value: tags)
    }

    func remove(tag: String, from articleID: String) async {
        guard isLoaded, var current = tags[articleID] else { return }
        current.removeAll { $0 == tag }
        if current.isEmpty { tags.removeValue(forKey: articleID) } else { tags[articleID] = current }
        await sync?.write(key: Self.tagsKey, value: tags)
    }

    /// Articles carrying a tag, for filtering the shelf.
    func articles(taggedWith tag: String) -> Set<String> {
        Set(tags.compactMap { id, list in
            list.contains { $0.caseInsensitiveCompare(tag) == .orderedSame } ? id : nil
        })
    }
}
