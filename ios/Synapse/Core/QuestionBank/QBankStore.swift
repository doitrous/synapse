import Foundation
import Observation

/// What a student has flagged, written and half-finished in the question bank.
///
/// Four records, all account-scoped rather than device-scoped: a question
/// flagged on a laptop has to be flagged on the phone, and a sitting abandoned
/// on the bus has to be resumable at a desk. The keys are dotted, which is what
/// routes them to the student's own record rather than a shared one — the web
/// learnt that the hard way, when a hyphenated key sent every student's private
/// notes to a single admin document.
@MainActor
@Observable
final class QBankStore {

    static let markedKey = "nishany.qbank.marked.v1"
    static let notesKey = "nishany.qbank.questionNotes.v1"
    static let namesKey = "nishany.qbank.sessionNames.v1"

    /// Question ids the student has flagged to come back to.
    private(set) var marked: Set<String> = []
    /// Question id → what they wrote about it.
    private(set) var notes: [String: String] = [:]
    /// Session id → what they called it.
    private(set) var names: [String: String] = [:]
    /// The sitting still in progress, if there is one.
    private(set) var live: LiveSession?

    /// Set while a note is on its way to the server, so the student can see
    /// that what they typed is safe rather than guessing.
    private(set) var savingNote = false
    private(set) var savedNote = false

    /// False until the first read succeeds.
    ///
    /// Nothing may be written before then: an empty set written over a
    /// student's real flags would delete every one of them, and they would
    /// never know why. The reader is the same lesson bookmarks taught.
    private(set) var isLoaded = false

    /// Set when this read could not be a genuine "nothing saved yet" — the
    /// device was offline at the time. Flags, notes, session names and a
    /// sitting in progress all live only on the server, so failing quietly
    /// here would make real flags disappear rather than merely being unknown
    /// for a moment. Cleared on the next successful load.
    private(set) var loadError: String?

    private let api: SynapseAPI
    private let sync: SyncEngine
    private var savedCue: Task<Void, Never>?

    init(api: SynapseAPI, sync: SyncEngine) {
        self.api = api
        self.sync = sync
    }

    func load() async {
        async let remoteMarked = try? api.userState([String].self, key: Self.markedKey)
        async let remoteNotes = try? api.userState([String: String].self, key: Self.notesKey)
        async let remoteNames = try? api.userState([String: String].self, key: Self.namesKey)
        async let remoteLive = try? api.userState(LiveSession.self, key: LiveSession.key)

        marked = Set((await remoteMarked)?.value ?? [])
        notes = (await remoteNotes)?.value ?? [:]
        names = (await remoteNames)?.value ?? [:]
        live = (await remoteLive)?.value
        isLoaded = true
        loadError = Connectivity.shared.isOnline
            ? nil
            : "You're offline, so flagged questions, notes and a sitting in progress may not show."
    }

    // MARK: - Flagging

    var markedCount: Int { marked.count }

    func isMarked(_ questionID: String) -> Bool { marked.contains(questionID) }

    /// Flag a question, or take the flag off.
    ///
    /// Flags outlive the sitting that made them, which is the whole point: a
    /// student flags a question in March to come back to it in June.
    func toggleMark(_ questionID: String) async {
        guard isLoaded else { return }
        if marked.contains(questionID) { marked.remove(questionID) } else { marked.insert(questionID) }
        // Sorted, so two devices writing the same set produce the same bytes
        // and the sync engine does not see a change that is not one.
        await sync.write(key: Self.markedKey, value: marked.sorted())
    }

    // MARK: - Notes

    func note(_ questionID: String) -> String { notes[questionID] ?? "" }

    /// Keep what a student wrote about one question.
    ///
    /// Saved when they stop typing rather than per keystroke — every save is a
    /// whole-record rewrite, and a paragraph would otherwise cost a hundred.
    func saveNote(_ text: String, for questionID: String) async {
        guard isLoaded else { return }
        let trimmed = text.trimmingCharacters(in: .whitespacesAndNewlines)
        if trimmed.isEmpty { notes.removeValue(forKey: questionID) } else { notes[questionID] = trimmed }

        savingNote = true
        savedNote = false
        await sync.write(key: Self.notesKey, value: notes)
        savingNote = false
        savedNote = true

        // The cue is reassurance, not status: it says the words are safe and
        // then gets out of the way.
        savedCue?.cancel()
        savedCue = Task { [weak self] in
            try? await Task.sleep(for: .seconds(2))
            guard !Task.isCancelled else { return }
            self?.savedNote = false
        }
    }

    // MARK: - Session names

    func name(of sessionID: String) -> String? { names[sessionID] }

    func rename(_ sessionID: String, to name: String) async {
        guard isLoaded else { return }
        let trimmed = name.trimmingCharacters(in: .whitespacesAndNewlines)
        if trimmed.isEmpty { names.removeValue(forKey: sessionID) } else { names[sessionID] = trimmed }
        await sync.write(key: Self.namesKey, value: names)
    }

    // MARK: - The sitting in progress

    func keep(_ session: LiveSession) async {
        live = session
        await sync.write(key: LiveSession.key, value: session)
    }

    /// Put the half-finished sitting away.
    ///
    /// Written as an explicit empty record rather than deleted: the server has
    /// no delete, and leaving the old one there would offer to resume a sitting
    /// that has already been finished.
    func clearLive() async {
        live = nil
        await sync.write(key: LiveSession.key, value: LiveSession?.none)
    }

    /// A session id in the web's format, so ids made on either platform read
    /// the same in the log.
    nonisolated static func newSessionID() -> String {
        let stamp = String(Int(Date().timeIntervalSince1970 * 1000), radix: 36)
        let alphabet = Array("0123456789abcdefghijklmnopqrstuvwxyz")
        let tail = String((0..<5).map { _ in alphabet[Int.random(in: 0..<alphabet.count)] })
        return "qb-\(stamp)-\(tail)"
    }
}

/// A name for a sitting that nobody has named.
///
/// "Cardiovascular 3" rather than a timestamp: a student picking up where they
/// left off recognises the subject, not the hour they started.
enum SessionNaming {

    static func automatic(subject: String, existing: [String]) -> String {
        let base = subject.isEmpty ? "Mixed" : subject
        let used = existing.filter { $0.hasPrefix(base) }.count
        return "\(base) \(used + 1)"
    }
}
