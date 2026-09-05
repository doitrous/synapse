import Foundation
import Observation

/// The concept mastery ledger, and what it says is worth revisiting.
///
/// The record has been modelled on this platform for some time and never
/// written — so a student answering on the phone built no evidence, and the
/// review queue had nothing to work from. This is what writes it.
@MainActor
@Observable
final class MasteryModel {

    private(set) var ledger: [String: ConceptMastery] = [:]
    private(set) var due: [ReviewQueue.Item] = []
    private(set) var upcoming: [ReviewQueue.Item] = []
    private(set) var summary = Mastery.Summary()

    /// False until the first read succeeds.
    ///
    /// The ledger is a whole-record rewrite, so writing before reading would
    /// replace months of evidence with whatever this device happened to know.
    private(set) var isLoaded = false

    private let api: NishanyAPI
    private let sync: SyncEngine

    init(api: NishanyAPI, sync: SyncEngine) {
        self.api = api
        self.sync = sync
    }

    func load() async {
        let remote = try? await api.userState([String: ConceptMastery].self, key: MasteryStore.key)
        ledger = remote?.value ?? [:]
        isLoaded = true
        refresh()
    }

    private func refresh() {
        due = ReviewQueue.due(ledger)
        upcoming = ReviewQueue.upcoming(ledger, withinDays: 7)
        summary = Mastery.summarise(ledger)
    }

    /// Record what a finished sitting demonstrated.
    ///
    /// Called with the whole sitting rather than per answer: the ledger is one
    /// document, and rewriting it once for ten questions rather than ten times
    /// is the difference between a sitting that syncs and one that hammers the
    /// server from a train.
    func record(_ answers: [(conceptIds: [String], correct: Bool)], at: Date = Date()) async {
        guard isLoaded, !answers.isEmpty else { return }
        let stamp = ISO8601DateFormatter.synapse.string(from: at)

        var next = ledger
        for answer in answers {
            next = Mastery.record(
                next, conceptIds: answer.conceptIds,
                source: .question, correct: answer.correct, at: stamp
            )
        }
        guard next != ledger else { return }

        ledger = next
        refresh()
        await sync.write(key: MasteryStore.key, value: ledger)
    }

    /// The concepts a review sitting should cover — the most overdue first.
    var reviewConcepts: [String] {
        Array(due.prefix(ReviewQueue.sittingSize).map(\.conceptId))
    }

    /// The weakest concepts with enough marked work to mean anything.
    ///
    /// Two answers is not evidence of a weakness, and listing it as one sends a
    /// student to revise something they may know perfectly well.
    var weakest: [(concept: String, accuracy: Double, attempts: Int)] {
        ledger.values
            .filter { $0.attempts >= Mastery.confidentAttempts }
            .compactMap { entry in
                Mastery.accuracy(entry).map { (entry.conceptId, $0, entry.attempts) }
            }
            .sorted { $0.1 != $1.1 ? $0.1 < $1.1 : $0.0 < $1.0 }
    }
}
