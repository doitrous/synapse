import Foundation

/// How much a concept was actually being tested by an item.
enum ConceptRole: String, Codable, Sendable {
    case main, secondary
}

/// What happened to the attempt.
enum AttemptOutcome: String, Codable, Sendable {
    case answered, blank, timeout
}

/// What the student said about how sure they were.
///
/// `unstated` rather than "unknown": the student was not asked, which is a
/// different thing from their having no idea.
enum Confidence: String, Codable, Sendable {
    case sure, unsure, unstated
}

enum PresentationMode: String, Codable, Sendable {
    case tutor, exam, readiness
}

/// Whether this student had already been shown the answer to this item.
enum ExposureState: String, Codable, Sendable {
    case first
    case repeatAfterReveal = "repeat-after-reveal"
}

/// One piece of evidence about one concept.
///
/// A port of `AdaptiveEvidenceEvent` in `src/data/adaptive/evidenceLedger.ts`.
/// The ledger is immutable and every estimate is rebuilt from it, so this type
/// is the whole input to the model — anything not recorded here cannot affect
/// what the app believes about a student.
struct AdaptiveEvidenceEvent: Codable, Identifiable, Equatable, Sendable {
    /// `<attemptId>:<conceptId>` — the idempotency key.
    var id: String
    /// ISO timestamp of when the answer was committed.
    var at: String
    /// Groups every event produced by one submitted response.
    var attemptId: String
    /// Groups the events made in one sitting.
    var blockId: String
    var questionId: String
    /// Which revision of the question was answered.
    ///
    /// A question edited after an answer was given is a different item. Without
    /// this, replaying the ledger would credit a student with evidence about a
    /// stem they never read.
    var questionVersion: String
    var conceptId: String
    var role: ConceptRole
    /// True only when marked against a key. Nil for a blank or a timeout.
    var correct: Bool?
    var outcome: AttemptOutcome
    var confidence: Confidence
    /// Nil when the item was untimed.
    var seconds: Double?
    /// Seconds the author expected this item to take, when they recorded one.
    var expectedSeconds: Double?
    var mode: PresentationMode
    var exposure: ExposureState
    /// The author's intended difficulty, carried so difficulty credit is
    /// replayable rather than looked up against a question that may have moved.
    var difficulty: String
    /// Which config produced this event, so a change of model can recompute
    /// history rather than quietly reinterpreting it.
    var configVersion: Int
}

extension Array where Element == AdaptiveEvidenceEvent {

    /// Raw wrong attempts, as the student experienced them.
    ///
    /// By attempt rather than by event: one submitted answer produces an event
    /// per concept, and counting those would tell a student they had made three
    /// mistakes when they made one.
    var rawWrongAttempts: Int {
        Set(filter { $0.correct == false }.map(\.attemptId)).count
    }

    /// Distinct questions that produced evidence for a concept.
    var distinctQuestions: Int {
        Set(map(\.questionId)).count
    }
}
