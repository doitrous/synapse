import Foundation

/// Tutor explains as you go; timed explains at the end and runs a clock.
///
/// The difference is not cosmetic. In tutor mode a student is learning and the
/// explanation is the point; in timed mode they are rehearsing an exam, and
/// being shown the answer would defeat it.
enum SittingMode: String, Codable, CaseIterable, Sendable {
    case tutor, timed

    var label: String {
        switch self {
        case .tutor: "Tutor"
        case .timed: "Timed"
        }
    }

    var detail: String {
        switch self {
        case .tutor: "See why after each question."
        case .timed: "A clock runs; answers come at the end."
        }
    }

    /// Whether the answer is revealed as soon as it is committed.
    var explainsAsYouGo: Bool { self == .tutor }
}

/// Everything needed to put a half-finished sitting back on screen.
///
/// A port of `LiveSession` in `src/pages/student/QuestionBank.tsx`, field for
/// field — a sitting started on the website has to be resumable on the phone,
/// and the record is the only thing that carries it across.
struct LiveSession: Codable, Equatable, Sendable {
    var questionIds: [String]
    var idx: Int
    /// Question id → the index of the option chosen.
    var answers: [String: Int]
    /// Question id → whether the student has committed to it.
    var checked: [String: Bool]
    var mode: SittingMode
    var sessionId: String
    /// Seconds, for the timed clock.
    var elapsed: Int
    /// Indices the student has actually looked at, so the navigator can tell
    /// "skipped" from "not reached".
    var visited: [Int]
    var reviewing: Bool
    var name: String
    /// `running` or `results` — a sitting is never saved while being set up.
    var phase: String
    /// ISO 8601.
    var startedAt: String

    static let key = "nishany.qbank.activeSession.v1"
}

/// What the navigator shows for one question.
///
/// Five states, not four: `omitted` is a question the student reached, left,
/// and moved past. Folding it into "unanswered" would hide the thing they most
/// need to come back to.
///
/// Where the student *is* is deliberately not one of these. It is a different
/// fact about a different axis — you can be on a question that is answered,
/// omitted or untouched — and the web keeps it separate for that reason.
enum QuestionState: String, Sendable {
    case answered, correct, wrong, omitted, unseen

    /// Whether this one is worth returning to before finishing.
    var needsAttention: Bool { self == .omitted }
}

/// A sitting already taken, rebuilt from the attempt log.
///
/// A port of `bySession` in `src/data/attemptStats.ts`. Reconstructed rather
/// than stored twice: every record has always carried the `sessionId` of the
/// sitting that produced it, and nothing ever read it back — so a student had
/// no way to see what they had done.
struct SessionSummary: Identifiable, Equatable, Sendable {
    let sessionId: String
    let startedAt: String
    let endedAt: String
    let surface: String
    let answered: Int
    /// Attempts that were marked — the denominator for accuracy. An OSCE
    /// station nobody marked is neither right nor wrong.
    let marked: Int
    let correct: Int
    let accuracy: Double?
    /// Commonest subject first.
    let subjectIds: [String]
    let seconds: Int

    var id: String { sessionId }

    static func from(_ records: [AttemptRecord]) -> [SessionSummary] {
        var groups: [String: [AttemptRecord]] = [:]
        var order: [String] = []
        for record in records where !record.sessionId.isEmpty {
            if groups[record.sessionId] == nil { order.append(record.sessionId) }
            groups[record.sessionId, default: []].append(record)
        }

        let summaries = order.compactMap { sessionId -> SessionSummary? in
            guard let group = groups[sessionId], let first = group.first else { return nil }
            let times = group.map(\.at).sorted()
            let scored = group.filter { $0.correct != nil }
            let correct = scored.filter { $0.correct == true }.count

            var bySubject: [String: Int] = [:]
            for record in group { bySubject[record.subjectId, default: 0] += 1 }

            return SessionSummary(
                sessionId: sessionId,
                startedAt: times.first ?? "",
                endedAt: times.last ?? "",
                surface: first.surface,
                answered: group.count,
                marked: scored.count,
                correct: correct,
                accuracy: scored.isEmpty ? nil : Double(correct) / Double(scored.count),
                // Commonest first, with ties broken by id so the order does not
                // wander between reads of the same data.
                subjectIds: bySubject.sorted {
                    $0.value != $1.value ? $0.value > $1.value : $0.key < $1.key
                }.map(\.key),
                seconds: group.reduce(0) { $0 + ($1.seconds ?? 0) }
            )
        }

        // Newest first, because that is the one anyone wants.
        return summaries.sorted { $0.startedAt > $1.startedAt }
    }
}
