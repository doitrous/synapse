import Foundation
import Testing
@testable import Synapse

/// Pinned to `bySession` in `src/data/attemptStats.ts`, run under Node against
/// the same records. Previous tests are rebuilt from the attempt log rather
/// than stored twice, so this is the only thing standing between a student and
/// a list of sittings that does not match what they actually did.
struct SessionSummaryTests {

    private func record(
        _ id: String, at: String, session: String, subject: String,
        correct: Bool?, seconds: Int
    ) -> AttemptRecord {
        AttemptRecord(
            id: id, at: at, surface: "qbank", itemId: id, subjectId: subject,
            topic: "t", difficulty: "Easy", conceptIds: [],
            correct: correct, seconds: seconds, sessionId: session
        )
    }

    private var log: [AttemptRecord] {
        [
            record("1", at: "2026-08-01T10:00:00Z", session: "s1", subject: "cvs", correct: true, seconds: 30),
            record("2", at: "2026-08-01T10:01:00Z", session: "s1", subject: "cvs", correct: false, seconds: 45),
            record("3", at: "2026-08-01T10:02:00Z", session: "s1", subject: "resp", correct: nil, seconds: 20),
            record("4", at: "2026-08-02T09:00:00Z", session: "s2", subject: "neuro", correct: true, seconds: 10),
            record("5", at: "2026-08-01T09:00:00Z", session: "", subject: "orphan", correct: true, seconds: 5),
        ]
    }

    @Test func sittingsAreRebuiltFromTheLog() {
        let summaries = SessionSummary.from(log)

        // Newest first, and the record with no sitting behind it is not one.
        #expect(summaries.map(\.sessionId) == ["s2", "s1"])

        let s1 = summaries[1]
        #expect(s1.startedAt == "2026-08-01T10:00:00Z")
        #expect(s1.endedAt == "2026-08-01T10:02:00Z")
        #expect(s1.answered == 3)
        #expect(s1.seconds == 95)
        #expect(s1.subjectIds == ["cvs", "resp"])
    }

    /// An unmarked attempt is neither right nor wrong. Counting it as wrong
    /// would quietly tell a student they are worse than they are.
    @Test func unmarkedWorkIsNotCountedEitherWay() {
        let s1 = SessionSummary.from(log)[1]
        #expect(s1.answered == 3)
        #expect(s1.marked == 2)
        #expect(s1.correct == 1)
        #expect(s1.accuracy == 0.5)
    }

    @Test func aSittingWithNothingMarkedHasNoAccuracy() {
        let unmarked = [record("x", at: "2026-08-03T09:00:00Z", session: "s3", subject: "cvs", correct: nil, seconds: 1)]
        #expect(SessionSummary.from(unmarked)[0].accuracy == nil)
    }

    @Test func anEmptyLogIsAnEmptyList() {
        #expect(SessionSummary.from([]).isEmpty)
    }
}

struct SessionNamingTests {

    /// "Cardiovascular 3", not a timestamp: a student picking up where they
    /// left off recognises the subject, not the hour.
    @Test func namesCountUpWithinASubject() {
        #expect(SessionNaming.automatic(subject: "Cardiovascular", existing: []) == "Cardiovascular 1")
        #expect(SessionNaming.automatic(
            subject: "Cardiovascular", existing: ["Cardiovascular 1", "Respiratory 1"]
        ) == "Cardiovascular 2")
    }

    @Test func aSittingAcrossSubjectsIsMixed() {
        #expect(SessionNaming.automatic(subject: "", existing: []) == "Mixed 1")
    }
}

struct SessionIDTests {

    /// The web's shape, so ids made on either platform read the same in the log.
    @Test func idsLookLikeTheWebs() {
        let id = QBankStore.newSessionID()
        let parts = id.split(separator: "-")
        #expect(parts.count == 3)
        #expect(parts[0] == "qb")
        #expect(parts[2].count == 5)
        #expect(id.allSatisfy { $0.isLowercase || $0.isNumber || $0 == "-" })
    }

    @Test func idsDoNotCollide() {
        let ids = Set((0..<200).map { _ in QBankStore.newSessionID() })
        #expect(ids.count == 200)
    }
}

struct LiveSessionTests {

    /// Field for field with the web's `LiveSession`, because a sitting started
    /// in a browser has to come back on the phone — the record is the only
    /// thing that carries it across.
    @Test func aSittingSurvivesARoundTrip() throws {
        let session = LiveSession(
            questionIds: ["q1", "q2"], idx: 1, answers: ["q1": 2], checked: ["q1": true],
            mode: .timed, sessionId: "qb-abc-12345", elapsed: 42, visited: [0, 1],
            reviewing: false, name: "Cardiovascular 1", phase: "running",
            startedAt: "2026-08-19T09:00:00Z"
        )
        let data = try JSONEncoder().encode(session)
        #expect(try JSONDecoder().decode(LiveSession.self, from: data) == session)

        // The names the web writes, not Swift's — a renamed field is a sitting
        // that silently fails to resume.
        let json = try #require(
            try JSONSerialization.jsonObject(with: data) as? [String: Any]
        )
        #expect(Set(json.keys) == [
            "questionIds", "idx", "answers", "checked", "mode", "sessionId",
            "elapsed", "visited", "reviewing", "name", "phase", "startedAt",
        ])
        #expect(json["mode"] as? String == "timed")
    }
}

/// The five states a question can be in, and the one thing that is not a state.
///
/// These are pure statements about the model, so they are asserted directly
/// rather than through a sitting: the navigator is the only place a student
/// sees which work is unfinished, and getting it wrong sends them back to
/// questions they already answered.
struct QuestionStateTests {

    /// Where the student is standing is not a state a question can be in — a
    /// question can be answered, omitted or untouched while being looked at.
    @Test func whereYouAreIsNotAState() {
        #expect(!QuestionState.allCasesForTest.contains { $0.rawValue == "current" })
    }

    /// Only omission asks to be gone back to. Right, wrong and untouched are
    /// all fine to leave.
    @Test func onlyOmissionNeedsAttention() {
        #expect(QuestionState.omitted.needsAttention)
        #expect(!QuestionState.answered.needsAttention)
        #expect(!QuestionState.correct.needsAttention)
        #expect(!QuestionState.wrong.needsAttention)
        #expect(!QuestionState.unseen.needsAttention)
    }
}

private extension QuestionState {
    static var allCasesForTest: [QuestionState] { [.answered, .correct, .wrong, .omitted, .unseen] }
}

struct SittingModeTests {

    /// The distinction the whole sitting turns on: a timed sitting must not
    /// reveal anything, or it is not rehearsing an exam.
    @Test func onlyTutorExplainsAsYouGo() {
        #expect(SittingMode.tutor.explainsAsYouGo)
        #expect(!SittingMode.timed.explainsAsYouGo)
    }

    /// The stored spelling, which a sitting resumed from the website depends on.
    @Test func modesSpellThemselvesAsTheWebDoes() {
        #expect(SittingMode.tutor.rawValue == "tutor")
        #expect(SittingMode.timed.rawValue == "timed")
    }
}
