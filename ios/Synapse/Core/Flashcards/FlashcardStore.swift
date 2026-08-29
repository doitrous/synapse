import Foundation
import Observation

/// A student's whole flashcard collection and review log, synced under their own
/// account, plus the admin-authored ("provided") decks off the content ledger.
/// The one stateful seam over the pure data layer.
///
/// It follows `QBankStore`'s shape: the two user documents are account-scoped
/// user-state, loaded from the server and written back whole through
/// `SyncEngine.write` (which queues offline and drains later). `isLoaded` gates
/// every write so an empty collection can never be written over a student's real
/// decks before the first read has arrived.
///
/// Reads go through a **merged view** — the student's own collection plus the
/// provided decks synthesized from the catalogue (their content is never stored;
/// only the schedule a student earns on each card is, keyed by `providedNoteId`).
/// Writes only ever touch the student's own `collection`; the view is rebuilt
/// from it afterwards.
///
/// The keys are the web's exactly (`StateOwnership.swift` already routes the
/// `synapse.flashcards.` prefix), so a deck made on the website is the same deck
/// on the phone. v1 loads from the network; a local GRDB cache for cold, offline
/// study is the documented next step (see `docs/ios/audit/flashcards.md` §4.2).
@MainActor
@Observable
final class FlashcardStore {

    static let collectionKey = "synapse.flashcards.collection.v2"
    static let reviewLogKey = "synapse.flashcards.reviewlog.v2"
    /// The web's own ceiling on the log, applied on every write.
    static let reviewLogCap = 50_000

    /// The student's own decks/notes/schedules — the persisted, synced truth.
    private(set) var collection = FlashcardCollection.empty
    private(set) var events: [ReviewEvent] = []

    /// The studyable view: `collection` merged with the provided decks. Reads use
    /// this; it is never written to storage.
    private(set) var view = FlashcardCollection.empty

    /// False until the first read succeeds. Nothing may be written before then.
    private(set) var isLoaded = false

    private let store: LocalStore
    private let api: SynapseAPI
    private let sync: SyncEngine
    private let audience: StudentAudience
    private var providedDecks: [StudentDeck] = []

    init(store: LocalStore, api: SynapseAPI, sync: SyncEngine, audience: StudentAudience) {
        self.store = store
        self.api = api
        self.sync = sync
        self.audience = audience
    }

    func load() async {
        async let remoteCollection = try? api.userState(FlashcardCollection.self, key: Self.collectionKey)
        async let remoteEvents = try? api.userState([ReviewEvent].self, key: Self.reviewLogKey)

        if let stored = (await remoteCollection)?.value, stored.version == FlashcardCollection.currentVersion {
            collection = stored
        }
        events = (await remoteEvents)?.value ?? []
        // Provided decks come off the already-synced catalogue in the local cache,
        // so they are available offline like everything else.
        providedDecks = (try? await store.items(kind: .deck, audience: audience)).map(DeckProjection.providedDecks) ?? []
        rebuildView()
        isLoaded = true
    }

    /// Merge the provided decks into the student's collection to form the view.
    /// A provided deck the student has never touched shows synthesized notes and
    /// fresh "new" schedules; once they study a card, its real schedule in
    /// `collection.meta` takes over (we never overwrite an existing entry).
    private func rebuildView() {
        var v = collection
        for deck in providedDecks {
            if v.decks[deck.id] == nil { v.decks[deck.id] = DeckProjection.deckRecord(for: deck) }
            let scheduler: Scheduler = v.decks[deck.id]?.config?.scheduler == .fsrs ? FSRSScheduler() : SM2Scheduler()
            let now = Date()
            for note in DeckProjection.synthesizedNotes(for: deck) {
                if v.notes[note.id] == nil { v.notes[note.id] = note }
                for card in CardGen.cards(note) where v.meta[card.id] == nil {
                    v.meta[card.id] = newCardMeta(scheduler.newCard(now: now))
                }
            }
        }
        view = v
    }

    // MARK: - Reads (all through the merged view)

    /// Decks in a stable, name-sorted order.
    var decks: [DeckRecord] {
        view.decks.values.sorted { $0.name.localizedCaseInsensitiveCompare($1.name) == .orderedAscending }
    }

    func deck(_ id: String) -> DeckRecord? { view.decks[id] }
    func note(_ id: String) -> FlashcardNote? { view.notes[id] }
    func meta(_ cardId: String) -> CardMeta? { view.meta[cardId] }

    /// Whether a deck's content comes from the catalogue rather than the student.
    func isProvided(_ deckId: String) -> Bool { view.decks[deckId]?.sourceId != nil }

    /// The notes in one deck, in authoring (or catalogue) order.
    func notes(inDeck deckId: String) -> [FlashcardNote] {
        view.notes.values
            .filter { $0.deckId == deckId }
            .sorted { $0.createdAt < $1.createdAt }
    }

    /// The cards one deck currently generates.
    func cards(inDeck deckId: String) -> [Card] {
        notes(inDeck: deckId).flatMap { CardGen.cards($0) }
    }

    /// Resolve a `noteId::templateKey` id back to its card.
    func card(_ id: String) -> Card? {
        guard let sep = id.range(of: "::") else { return nil }
        let noteId = String(id[..<sep.lowerBound])
        guard let note = view.notes[noteId] else { return nil }
        return Card(id: id, noteId: noteId, deckId: note.deckId, templateKey: String(id[sep.upperBound...]))
    }

    /// The scheduler a deck studies with: FSRS only when it has opted in.
    func scheduler(forDeck deckId: String) -> Scheduler {
        view.decks[deckId]?.config?.scheduler == .fsrs ? FSRSScheduler() : SM2Scheduler()
    }

    /// The dashboard counts for a deck.
    func counts(forDeck deckId: String, now: Date = Date()) -> DeckCounts {
        deckCounts(cards(inDeck: deckId).compactMap { view.meta[$0.id] }, now: now)
    }

    /// The ordered card ids to study in a deck right now, under its caps.
    func studyQueue(forDeck deckId: String, now: Date = Date()) -> [String] {
        let cfg = view.decks[deckId]?.config
        let config = QueueConfig(
            newPerDay: cfg?.newPerDay ?? SrsConfig.anki.newPerDay,
            maxReviewsPerDay: cfg?.maxReviewsPerDay ?? SrsConfig.anki.maxReviewsPerDay
        )
        let seen = seenTodayFromEvents(events, deckId: deckId, now: now)
        return buildQueue(Self.entries(forDeck: deckId, in: view), now: now, config: config, seen: seen)
    }

    /// The study-queue entries for a deck. Pure and `nonisolated`, so it is
    /// testable without a store instance and usable off the main actor (a widget).
    nonisolated static func entries(forDeck deckId: String, in collection: FlashcardCollection) -> [QueueEntry] {
        collection.notes.values
            .filter { $0.deckId == deckId }
            .sorted { $0.createdAt < $1.createdAt }
            .flatMap { CardGen.cards($0) }
            .compactMap { card in collection.meta[card.id].map { QueueEntry(id: card.id, meta: $0) } }
    }

    // MARK: - Deck mutations

    @discardableResult
    func createDeck(name: String) async -> String {
        let id = Self.newId("deck")
        var next = collection
        next.decks[id] = DeckRecord(id: id, name: name, sourceId: nil, config: nil, createdAt: Self.nowISO())
        await commit(next)
        return id
    }

    func renameDeck(_ id: String, to name: String) async {
        guard isLoaded, var deck = collection.decks[id] else { return }
        deck.name = name
        var next = collection
        next.decks[id] = deck
        await commit(next)
    }

    /// Set a deck's scheduler/limits. A provided deck the student has not stored
    /// yet is materialized into their collection first (carrying its `sourceId`),
    /// so a scheduler override survives and the deck stays marked as provided.
    func setDeckConfig(_ id: String, _ config: DeckConfig) async {
        guard isLoaded else { return }
        var next = collection
        var deck = next.decks[id] ?? view.decks[id]
        guard deck != nil else { return }
        deck!.config = config
        next.decks[id] = deck
        await commit(next)
    }

    /// Remove a deck, its notes, and the meta of every card those notes made.
    /// (A provided deck's synthesized notes are not in `collection`, so only the
    /// student's stored override and any earned schedules are removed.)
    func removeDeck(_ id: String) async {
        guard isLoaded else { return }
        var next = collection
        next.decks.removeValue(forKey: id)
        let doomedNotes = next.notes.values.filter { $0.deckId == id }
        for note in doomedNotes {
            for card in CardGen.cards(note) { next.meta.removeValue(forKey: card.id) }
            next.notes.removeValue(forKey: note.id)
        }
        await commit(next)
    }

    // MARK: - Note mutations

    func saveNote(_ note: FlashcardNote, now: Date = Date()) async {
        guard isLoaded else { return }
        var next = collection
        next.notes[note.id] = note
        next.meta = CardGen.reconcileInMeta(note, allMeta: next.meta, scheduler: scheduler(forDeck: note.deckId), now: now)
        await commit(next)
    }

    func deleteNote(_ noteId: String) async {
        guard isLoaded, let note = collection.notes[noteId] else { return }
        var next = collection
        for card in CardGen.cards(note) { next.meta.removeValue(forKey: card.id) }
        next.notes.removeValue(forKey: noteId)
        await commit(next)
    }

    // MARK: - Study actions (each logs an event)

    func grade(_ cardId: String, answer: Grade, timeSpentMs: Int? = nil, now: Date = Date()) async {
        guard isLoaded, let card = card(cardId), let meta = view.meta[cardId] else { return }
        let sched = scheduler(forDeck: card.deckId)
        let t = gradeCard(meta, answer: answer, ctx: context(card, sched.type), scheduler: sched, now: now, timeSpentMs: timeSpentMs)
        await apply(cardId, t)
    }

    func reset(_ cardId: String, now: Date = Date()) async {
        guard isLoaded, let card = card(cardId), let meta = view.meta[cardId] else { return }
        let sched = scheduler(forDeck: card.deckId)
        await apply(cardId, resetCard(meta, ctx: context(card, sched.type), scheduler: sched, now: now))
    }

    func suspend(_ cardId: String, _ suspended: Bool, now: Date = Date()) async {
        guard isLoaded, let card = card(cardId), let meta = view.meta[cardId] else { return }
        let ctx = context(card, scheduler(forDeck: card.deckId).type)
        await apply(cardId, suspended ? suspendCard(meta, ctx: ctx, now: now) : unsuspendCard(meta, ctx: ctx, now: now))
    }

    func bury(_ cardId: String, now: Date = Date()) async {
        guard isLoaded, let card = card(cardId), let meta = view.meta[cardId] else { return }
        await apply(cardId, buryCard(meta, ctx: context(card, scheduler(forDeck: card.deckId).type), now: now))
    }

    func setDue(_ cardId: String, day: String, now: Date = Date()) async {
        guard isLoaded, let card = card(cardId), let meta = view.meta[cardId] else { return }
        await apply(cardId, setDueDate(meta, day: day, ctx: context(card, scheduler(forDeck: card.deckId).type), now: now))
    }

    // MARK: - Internals

    private func context(_ card: Card, _ scheduler: SchedulerType) -> CardEventContext {
        CardEventContext(cardId: card.id, noteId: card.noteId, deckId: card.deckId, scheduler: scheduler)
    }

    private func apply(_ cardId: String, _ transition: CardTransition) async {
        var next = collection
        next.meta[cardId] = transition.meta
        collection = next
        events.append(transition.event.withId(Self.newId("rev")))
        rebuildView()
        await commitCollection()
        await commitEvents()
    }

    /// Adopt a new collection, rebuild the view, and sync.
    private func commit(_ next: FlashcardCollection) async {
        collection = next
        rebuildView()
        await commitCollection()
    }

    private func commitCollection() async {
        await sync.write(key: Self.collectionKey, value: collection)
    }

    private func commitEvents() async {
        if events.count > Self.reviewLogCap { events = Array(events.suffix(Self.reviewLogCap)) }
        await sync.write(key: Self.reviewLogKey, value: events)
    }

    private static func nowISO() -> String { ISO8601DateFormatter.synapse.string(from: Date()) }

    /// A content id in the web's id shape, so ids made on either platform read
    /// the same. (mirrors `QBankStore.newSessionID`)
    nonisolated static func newId(_ prefix: String) -> String {
        let stamp = String(Int(Date().timeIntervalSince1970 * 1000), radix: 36)
        let alphabet = Array("0123456789abcdefghijklmnopqrstuvwxyz")
        let tail = String((0..<5).map { _ in alphabet[Int.random(in: 0..<alphabet.count)] })
        return "\(prefix)-\(stamp)-\(tail)"
    }
}
